<%@page import="com.enterprisehorizons.magma.server.admin.CacheConfigUtils , com.enterprisehorizons.util.StringUtils,java.util.Arrays,com.spacetimeinsight.security.bean.UserBean,com.enterprisehorizons.magma.server.util.IServerConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
<%@page import="com.spacetimeinsight.preferences.PreferencesConstants"%>
<%@page import="com.spacetimeinsight.portal.preferences.PreferencesForm"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
 <%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<html>
<head>
<%@ include file="/common/dojo.jsp" %>
<% 
String csrfString =(String)request.getAttribute("csrf");
%>

 <style type="text/css">
        body .txtareamedium {
            width: 25em;
            height: 5em;
        }



div.clear {
    clear: both;
}  
#loadImg{position:absolute;z-index:999;}
 

</style> 
<script type="text/JavaScript"> 
setSessionTimer(false);
try{
parent.parent.updateCSRFToken('<%=request.getAttribute("csrf")%>');
}catch(e){
//as the parent.parent might be null or fuction might not be able to find
}

<%
    String userId = String.valueOf(request.getAttribute("userId").toString()); 
    Long moduleId = Long.valueOf(request.getAttribute("moduleId").toString());
    String preferencesLevel=request.getAttribute("preferencesLevel").toString();
    Long moduleUrlId=Long.valueOf(request.getAttribute("moduleUrlId").toString());
    Long srcModuleId = Long.valueOf(request.getAttribute("srcModuleId").toString());
    String importType = request.getAttribute("importType").toString();
	String selectedCategory = request.getAttribute("selectedCategory").toString();
    Boolean importModule = Boolean.parseBoolean(request.getAttribute("importModule").toString());
    String selectedUrl = null;
    if(request.getAttribute("selectedUrl") != null)
    {
        selectedUrl= request.getAttribute("selectedUrl").toString() + "?userId=" + userId + "&moduleId=" + moduleId + "&moduleUrlId=" + moduleUrlId + "&importModule=" + importModule + "&importType=" + importType + "&srcModuleId="+ srcModuleId+"&preferencesLevel="+ preferencesLevel;;
    } 
    
%>  
    
      function submitHdlr()
     {  
        if(dijit.byId("preferenceForm").validate()) {
            var validateCat=true;
            try {
                  validateCat=validateCategory();
                } catch(e) {              
                }
                if(validateCat) {         
				   document.forms[0].submit();
                }
        }           
    }
	
    function restoreProperties() {
	    parent.restoreProperties();
	}
	
	function doNothing() {
	    
	}
	    
	function restoreConfirmed() {
	  document.getElementById("operation").value="renderRestoreView";
	  document.forms[0].submit();
	}
	
	
    function importView()
    {
        window.location = "<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/prefAction.do?operation=renderImportModules&moduleUrlId=<%=moduleUrlId%>&csrf=<%=ESAPI.encoder().encodeForHTML(csrfString)%>&moduleId=<%=moduleId%>&preferencesLevel=<%=ESAPI.encoder().encodeForHTML(preferencesLevel)%>&categoryName="+'<%=selectedCategory%>'+"&selectedUrl="+selectedUrl;
    }
    
    // if user preference radio button is selected then selectedModuleId store module id else store -1.
    
    var selectedUrl= '<%=ESAPI.encoder().encodeForHTML((String)request.getAttribute("selectedUrl"))%>';

    function getPreferenceLevel(prefLevel)
    {
		
        //check for 2 calls
        if(prefLevel == "user")
        {
            return '<%=StringEscapeUtils.escapeHtml((String)ServerUtils.getContextName(request))%>/prefAction.do?operation=renderCategoryView&moduleUrlId=<%=moduleUrlId%>&moduleId=<%=moduleId%>&csrf=<%=ESAPI.encoder().encodeForHTML(csrfString)%>&preferencesLevel=<%=ESAPI.encoder().encodeForHTML(PreferencesConstants.PREFERENCE_LEVEL_USER)%>&selectedCategory=<%=ESAPI.encoder().encodeForHTML((String)request.getAttribute("selectedCategory").toString())%>';
        }
        else if(prefLevel == "module")
        {
            return '<%=StringEscapeUtils.escapeHtml((String)ServerUtils.getContextName(request))%>/prefAction.do?operation=renderCategoryView&moduleUrlId=<%=moduleUrlId%>&moduleId=<%=moduleId%>&csrf=<%=ESAPI.encoder().encodeForHTML(csrfString)%>&preferencesLevel=<%=ESAPI.encoder().encodeForHTML(PreferencesConstants.PREFERENCE_LEVEL_MODULE) %>&selectedCategory=<%=ESAPI.encoder().encodeForHTML((String)request.getAttribute("selectedCategory").toString())%>';
        }       
		return null;
    }
 
</script>

</head>

<body class="tundra bodybg" onLoad="hideImage()">
		<div id="loadImg" style="position:absolute;z-index:999; width:730px; text-align:center">
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
<form  name='preferenceForm' id='preferenceForm' action="<%=ServerUtils.getContextName(request)%>/prefAction.do" dojoType='dijit.form.Form' method="post"> 
<input type="hidden" id="csrf" name="csrf" value="<%=ESAPI.encoder().encodeForHTML(csrfString)%>">

              
             
            <input type="hidden" id="selectedCategory" name="selectedCategory" value="<%=ESAPI.encoder().encodeForHTML(request.getAttribute("selectedCategory").toString())%>"/>
            <input type="hidden" id="selectedUrl" name="selectedUrl" value="<%=ESAPI.encoder().encodeForHTML(request.getAttribute("selectedUrl").toString())%>"/>
            <input type="hidden" id="moduleUrlId" name="moduleUrlId" value="<%=moduleUrlId%>"/>
            <input type="hidden" id="userId" name="userId" value='<%=userId%>' />
            <input type="hidden" id="moduleId" name="moduleId" value="<%=moduleId%>" /> 
            <input type="hidden" id="operation" name="operation" value="saveUserPreferences"/>
            <input type="hidden" id="preferencesLevel" name="preferencesLevel" value="<%=ESAPI.encoder().encodeForHTML(preferencesLevel)%>"/>
        
            <table id="table2" cellpadding="0" cellspacing="0" width="100%" border="0">
                
              
                <tr>
                    <td height="18" >
                         <span id="ctl00_mainbody_lblError" class="error">
                               <label class="success">  
                                <html:messages id="msg" message="true" property="userpreferences.save.success"><bean:message key="userpreferences.save.success" bundle="admin"/></html:messages> 
                                <html:messages id="msg" message="true" property="modulepreferences.save.success"><bean:message key="modulepreferences.save.success" bundle="admin"/></html:messages>
                               </label>
                              <label class="error"></label>
                        </span>
                    </td>
                </tr>
                <logic:present name="catList">
                 <tr>
                       <td width='100%'>  
                        <div id="tabs_container_crystal" style="align:left; height:25px">
                        <ul style="padding-left:0px">
                            <logic:iterate name="catList" id="catListID">
                            
                                <logic:equal name="catListID"  property="categoryName" value='<%=request.getAttribute("selectedCategory").toString()%>'>
                                      <li class="active_t tabs_border"> 
                                </logic:equal>
                                
                                <logic:notEqual name="catListID"  property="categoryName" value='<%=request.getAttribute("selectedCategory").toString()%>'>
                                      <li class="panelColor tabs_border"> 
                                </logic:notEqual> 
                                            <a href="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/prefAction.do?operation=renderCategoryView&selectedCategory=<bean:write name="catListID" property="categoryName" filter="false"/>&selectedUrl=<bean:write name="catListID" property="url"/>&moduleUrlId=<%=moduleUrlId%>&moduleId=<%=moduleId%>&preferencesLevel=<%=ESAPI.encoder().encodeForHTML(preferencesLevel)%>">                                    
                                     <bean:write name="catListID" property="categoryName" filter="false"/>
                                 </a>   
                                 </li> 
                                 
                            </logic:iterate>
                             </ul>
                             </div>
                        <td>
                </tr>
                    </logic:present>
            
                
                <logic:present name="selectedUrl">
                <tr>
                     <td valign="top" > 
                        <div class="pref_contents_container"> 
                            <jsp:include page="<%=selectedUrl%>" />
							
                        </div>
						
                     </td>
                </tr>
                <tr>
				
				
                     <td>   
                        <div style="text-align:right" >
                         <button dojoType="dijit.form.Button" type="button" id="apply" name="apply" onClick="submitHdlr()"> <bean:message key="preferences.apply" bundle="admin"/> </button>
                         <button dojoType="dijit.form.Button"  type="button"    id="import" name="import" <%=!(Boolean)request.getAttribute("importAvailable")?"disabled='disabled'":""%> onClick="importView()" > <bean:message key="preferences.import" bundle="admin"/> </button>   
						  <button dojoType="dijit.form.Button" type="button"  id="restore" name="restore"  onclick="restoreProperties()"> <bean:message key="preferences.restore" bundle="admin"/> </button>
                         <button dojoType="dijit.form.Button" type="button"  id="cancel" name="cancel"  onclick="cancelDialog()"> <bean:message key="preferences.cancel" bundle="admin"/> </button>
						</div>
                        </td>
                         
                        
                    
                </tr>
                
                  </logic:present>
                
            </table>
           
</form>

 <script>  
		function hideImage(){
			document.getElementById('loadImg').style.display='none';
		}
     function cancelDialog() {
	   parent.closeDialog();
	 }
	 parent.updateSessionDetails();
 </script>
 <script>
	dojo.addOnLoad(function(){
    parent.processStatus=false;
			if(enableApplyBtn=='false') {
				dijit.byId('apply').setAttribute('disabled', true);
				dijit.byId('import').setAttribute('disabled', true);
				dijit.byId('restore').setAttribute('disabled', true);
			} else{
				dijit.byId('apply').setAttribute('disabled', false);
				dijit.byId('restore').setAttribute('disabled', false);
			}
});
</script>
</body>
</html>
 
