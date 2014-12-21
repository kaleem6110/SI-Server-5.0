<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@page import="java.util.List" %>
<%@page import="java.util.Map" %>
<%@page import="com.spacetimeinsight.portal.preferences.PreferencesForm"%>
<%@page import="com.spacetimeinsight.db.preferences.UserPreferencesData"%>
<%@page import="com.spacetimeinsight.preferences.PreferenceDAO"%>
<%@page import="com.spacetimeinsight.preferences.PreferenceHelper"%> 
<%@page import="com.spacetimeinsight.preferences.PreferencesConstants"%>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.spacetimeinsight.db.model.util.DataModelsCacheHelper"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@page pageEncoding="UTF-8"%>
<html> 
<head>
   <%@ include file="/common/dojo.jsp" %>
<script type="text/JavaScript">
setSessionTimer(false);
try{
parent.parent.updateCSRFToken('<%=request.getAttribute("csrf")%>');
}catch(e){
//as the parent.parent might be null or fuction might not be able to find
}


 function submitHdlr()
     {  
        if(dijit.byId("portalForm").validate()) { 
             document.forms[0].submit(); 
        }           
    }
	
  function restoreProperties() {
	    parent.restoreProperties();
 }
function processComplete(){
 	if(parent != null && parent.parent != null){
 		parent.processStatus=false;
 		parent.parent.document.getElementById('infoFrameWin_close').style.display="";
	}
}	
</script>

</head>

<body class="tundra bodybg" onLoad="processComplete();document.getElementById('loadImg').style.display='none';">
<div id="loadImg" style="position:absolute;z-index:999; width:730px; text-align:center" class="tundra bodybg">
            <table width="100%" height="400" cellpadding="0" cellspacing="0" align="center">
                <tr>
                    <td align="center" valign="middle">
                        <div style="height:100px; width:100px; text-align:center; vertical-align:middle">
                            <img src="<%=ServerUtils.getContextName(request)%>/images/portal/loadinganim.gif"><br>
                            <h4><bean:message key="preferences.loading" bundle="admin"/></h4>
                        </div>
                    </td>
                </tr>
            </table>            
      </div>
    <form  action="<%=ServerUtils.getContextName(request)%>/prefAction.do" id="portalForm" name="portalForm" dojoType='dijit.form.Form'>
    <input type="hidden" id="csrf" name="csrf" value="${csrf}">
<%
   PreferenceDAO preferenceDAO=new PreferenceDAO();
   String userId=request.getAttribute("userId").toString();
   	HttpSession _session = request.getSession(false);
	UserBean userBean = (UserBean) _session.getAttribute(ServerUtils.USER_BEAN_NAME);
   long moduleId=-1;
   long moduleUrlId=-1;
  
   String configNameList="defaultModule,defaultTheme,hideDelay,showDelay,language"; 
   String  categoryName="Portal"; 
   List<UserPreferencesData> useList = null;  
   
      String[] configNames =  configNameList.split(",");
            Map map=null;
            //map is only return for dynamic data.
            for(String configName:configNames) {
               if(PreferencesConstants.DEFAULT_MODULE.equals(configName) ) {
            		map = PreferenceHelper.getModuleList(userBean);
            	}
            	else
            	{
            		map=preferenceDAO.getConfigOptions(userId,moduleId,categoryName,configName,(List<Long>)request.getAttribute("userGroups"),userBean.getUserUniqueId(),PreferencesConstants.PREFERENCE_LEVEL_USER);
            	}
                if(map != null && map.size() > 0)
                {
                    request.setAttribute(configName+"Options", map);
                }
            
   }
   
   useList = preferenceDAO.getConfigValue(configNameList, userId, moduleId,categoryName);       
    
   for(UserPreferencesData userPreferencesData : useList)
    {
         out.write("<input type='hidden' name='"+ESAPI.encoder().encodeForHTML(userPreferencesData.getConfigName())+"Id"+"' value='"+userPreferencesData.getId()+"'>");
		 out.write("<input type='hidden' name='"+ESAPI.encoder().encodeForHTML(userPreferencesData.getConfigName())+"CT' value='"+(userPreferencesData.getCreatedDate()!=null?userPreferencesData.getCreatedDate().getTime():PreferencesConstants.MINUS_ONE)+"'>");
         request.setAttribute(userPreferencesData.getConfigName(), (userPreferencesData.getConfigValue()==null)?"":userPreferencesData.getConfigValue());
   }  
   if(request.getAttribute("showDelay")==null){
   		request.setAttribute("showDelay","0");
   }
   if(request.getAttribute("hideDelay")==null){
   		request.setAttribute("hideDelay","15");
   }
   Map langList = DataModelsCacheHelper.getAllLanguages();
   request.setAttribute("languageList", langList);
%>  
	<input type="hidden" name="subCsrf" value="" /> 

        <input type="hidden" name="userId" value="<%=userId%>" /> 
        <input type="hidden" name="categoryName" value="<%=categoryName%>" />   
        <input type="hidden" name="moduleUrlId" value="<%=moduleUrlId%>"/>
        <input type="hidden" name="operation" value="savePortalPreferences"/>
        <input type="hidden" name="configName" value="<%=configNameList%>"/>
        <input type="hidden" name="moduleId" value="<%=moduleId%>" />
        
        <div class="pref_portal_container" >

        <table cellspacing="5" style="margin-left:20px" >
             
             <tr>
                    <td  colspan="2" height="8">
                         <span id="ctl00_mainbody_lblError" class="error">
                               <label class="success">  
                                <html:messages id="msg" message="true" property="portalpreferences.save.success"><bean:message key="portalpreferences.save.success" bundle="admin"/></html:messages> 
                               </label>
                              <label class="error"></label>
                        </span>
                    </td>
                </tr>   
            <tr>
                <td align="right" >
                    <strong> <bean:message key="preferences.portal.theme" bundle="admin"/> </strong> :
                </td>
                
                <td align="left" title='<bean:message key="preferences.portal.defaulttheme.tooltip" bundle="admin"/>'>
                    <select name="defaultTheme" id="defaultTheme"  dojoType="dijit.form.FilteringSelect" invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />" >
                        <option value="default"  <logic:equal name="defaultTheme" value='default'> selected </logic:equal>  ><bean:message key="preferences.portal.theme.default" bundle="admin"/></option>
                        <option value="blue"  <logic:equal name="defaultTheme" value='blue'> selected </logic:equal>  ><bean:message key="preferences.portal.theme.blue" bundle="admin"/></option>
                    </select>
                </td>    
            </tr> 
        
            <tr>
                <td align="right" >
                    <strong><bean:message key="preferences.portal.default.module" bundle="admin"/></strong>:
                </td>
                <td title='<bean:message key="preferences.portal.defaultmodule.tooltip" bundle="admin"/>'>
                   <%
                      String defaultModule=PreferenceHelper.getDefaultModule((UserBean) request.getSession().getAttribute(ServerUtils.USER_BEAN_NAME));
                   %> 
                   
                    <select name="defaultModule" id ="defaultModule" value=""  dojoType="dijit.form.FilteringSelect" invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />"  > <logic:iterate id="module" name="defaultModuleOptions">
                        <option value="<bean:write name='module' property='key'/>"  <logic:equal name="module" property="key" value='<%=defaultModule%>'>    selected </logic:equal>  >  
                                <bean:write name='module' property='value' filter="false"/> 
                        </option>
                            </logic:iterate>
                    </select> 
                </td>    
            </tr>
            <tr>
                <td align="right" >
                    <strong>Language</strong>:
                </td>
                <td title='<bean:message key="preferences.portal.defaultmodule.tooltip" bundle="admin"/>'>
                   <%
                      String dafaultLang = (String)request.getAttribute("language");
                   %> 

                    <select name="language" id ="language" value=""  dojoType="dijit.form.FilteringSelect" invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />"  > <logic:iterate id="nameObj" name="languageList">
                        <option value="<bean:write name='nameObj' property='value'/>"  <logic:equal name="nameObj" property="value" value="<%=dafaultLang%>">    selected </logic:equal> >
                                <bean:write name='nameObj' property='key' filter="false"/> 
                        </option>
                            </logic:iterate>
                    </select> 
                </td>    
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
            </tr> 
             </table>
            <table cellspacing="5" >
            <tr>
                <td colspan="2">
                    <fieldset class="fieldsetpref" style="width:459px">
                        <legend class="fieldsetlegend"><strong><bean:message key="preferences.portal.flex.tool.tip.properties" bundle="admin"/></strong></legend>
                            <table cellspacing="5">
                                <tr>
                                    <td align="right">&nbsp;&nbsp;&nbsp;<strong><bean:message key="preferences.portal.show.delay" bundle="admin"/></strong>:</td>
                                    <td title='<bean:message key="preferences.portal.showdelay.tooltip" bundle="admin"/>'><input type="text" id="showDelay" name="showDelay" dojoType="dijit.form.NumberSpinner" required='true' invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />" style="width:70px;" 
            value='<%=ESAPI.encoder().encodeForHTML("".equals(request.getAttribute("showDelay"))?"0":(String)request.getAttribute("showDelay"))%>' constraints="{min:0,max:100,places:0}" invalidMessage="The value entered is invalid" maxlength="5" size="2"/></td>
                                    <td align="left"><b><bean:message key="preferences.portal.secs" bundle="admin"/></b></td>
                                                                                 
                                    
                                <td width="20">&nbsp;</td>
                                    <td align="right"><strong><bean:message key="preferences.portal.hide.delay" bundle="admin"/></strong>:</td>
                                    <td title='<bean:message key="preferences.portal.hidedelay.tooltip" bundle="admin"/>'><input type="text" id="hideDelay" name="hideDelay" dojoType="dijit.form.NumberSpinner" required='true' invalidMessage="<bean:message key="admin.invalid.error" bundle="admin" />" style="width:70px;"
            value='<%=ESAPI.encoder().encodeForHTML("".equals(request.getAttribute("hideDelay"))?"15":(String)request.getAttribute("hideDelay"))%>' constraints="{min:0,max:100,places:0}"  invalidMessage="The value entered is invalid" maxlength="5" size="2"/>
                                    </td>
                                    <td align="left"><b><bean:message key="preferences.portal.secs" bundle="admin"/></b></td>
                                </tr>
                            </table>
                    </fieldset>   
                </td>
            </tr>
   
       </table>        
</div>
<div class="buttoncontainer" style=" text-align:right; padding-top:18px ">
	   
                
 
                         <button dojoType="dijit.form.Button" type="button"  id="apply" name="apply"  onclick="submitHdlr"><bean:message key="preferences.portal.button.apply" bundle="admin"/> </button>
                         <button dojoType="dijit.form.Button" type="button"  id="restore" name="restore"  onclick="restoreProperties"> <bean:message key="preferences.portal.button.restore" bundle="admin"/>  </button>
                         <button dojoType="dijit.form.Button" type="button"  id="cancel" name="cancel"  onclick="cancelDialog"> <bean:message key="preferences.portal.button.cancel" bundle="admin"/> </button>
           
			</div>
    </form>
 <script>  
     function closeDialog() {
	   parent.closeDialog();
	 }
	 function restoreConfirmed(){
		window.location = "<%=ServerUtils.getContextName(request)%>/prefAction.do?operation=renderPortalRestoreView&csrf=${csrf}";
	 }
	 function getPreferenceLevel(prefLevel)
    {
        return null;       
		
    }
     function cancelDialog() {
       parent.closeDialog();
    }
    parent.updateSessionDetails();
 </script>
</body>
</html>

