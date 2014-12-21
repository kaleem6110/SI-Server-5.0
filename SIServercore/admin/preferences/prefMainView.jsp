<%@page import="com.enterprisehorizons.magma.server.admin.CacheConfigUtils , com.enterprisehorizons.util.StringUtils,java.util.Arrays"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@page import="com.spacetimeinsight.portal.preferences.PreferencesForm"%>
<%@page import="com.spacetimeinsight.preferences.PreferencesConstants"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@page import="org.owasp.esapi.ESAPI"%>
 <%@page pageEncoding="UTF-8"%>
<html>
<head>
<%@ include file="/common/dojo.jsp" %>
 
 <% 
int i=0;
%> 

<style type="text/css">
	body .txtareamedium {
    	width: 25em;
        height: 5em;
	}
	div.clear {
    	clear: both;
	}
		
</style> 


<title><bean:message key="cache.cache" bundle="cache"/></title>


<script type="text/JavaScript">
var processStatus=false;
	setSessionTimer(false);
	<%
		 String preferencesLevel=request.getAttribute("preferencesLevel").toString();
		 String selectedUrl = request.getAttribute("selectedUrl").toString();
		 String clickedModule=request.getAttribute("clickedModule").toString();
	%>
	//variable to denote if the selected key is present in the keys array or not
	
	var isPresent=false;
    var confDtls=null; 
	
    function restoreProperties()
    {     
	        confDtls = new dijit.Dialog({
            title:'Confirmation',
            style: "width: 350px;height:150px" }); 
			
			confDtls.attr("title",  '<bean:message key="preferences.label.confirmation" bundle="admin"/>');
            confDtls.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>'<bean:message key="preferences.confirmation.message" bundle="admin"/>'</td></tr><tr><td align='center'>  <button dojoType='dijit.form.Button' onClick='restoreYes();confDtls.hide()' type='button'><bean:message key="preferences.confirmation.label.yes" bundle="admin"/></button> <button dojoType='dijit.form.Button' onClick='confDtls.hide()' type='button'><bean:message key="preferences.confirmation.label.no" bundle="admin"/></button></td></td></tr></table></center>");
            confDtls.show();  
    } 
	
	function restoreYes() {
		var fraContent = getCategoryFrame('prefCatView');
	    fraContent.restoreConfirmed(); 
	} 
	
	function getCategoryFrame(frameId) {
	    var iframe = document.getElementById(frameId);
		var fraContent = iframe.contentWindow || iframe.contentDocument;
		return fraContent;
	} 
	
    function goToDBHomePage(){
          window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
    }
    
        function submitForm()
    {
      
    }
	function closeDialog() { 
        parent.closeInfoFrame();   	   
	}
	
</script>


</head> 

<body class="tundra bodybg" topmargin="0" leftmargin="0">
	<div id="loadImg" style="position:absolute; z-index:999; width:730px; text-align:center" class="tundra bodybg">
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
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
    	<tr>
        	<td align="left"> 
				<!-- Tabs -->
				<div id="tabs_container_crystal" style="align:left; height:24px;">
    				<ul style="width:100%; padding-left:0px; padding-top:0px;">
        			<!-- Use 'active' class style for selected Tab
            			Use 'Tab' class style for unselected Tab -->
						<logic:notEqual name="preferencesLevel"  value='user'>
                        <li class="panelColor"> 
                        </logic:notEqual>
                                
                        <logic:equal name="preferencesLevel" value='user'>
                        <li class="active"> 
                        </logic:equal> 
                        <a id="userLevel" style="cursor:pointer" onClick="javascript:prefLevelclicked('<%=PreferencesConstants.PREFERENCE_LEVEL_USER%>');" target="prefCatView"><bean:message key="preferences.user" bundle="admin"/></a>  
                        </li>
						<logic:equal name="preferencesLevel"  value='module'>
                        <li class="active"> 
                        </logic:equal>
                                
                        <logic:notEqual name="preferencesLevel" value='module'>
                        <li class="panelColor"> 
                        </logic:notEqual> 
                        <a id="moduleLevel" style="cursor:pointer" onClick="javascript:prefLevelclicked('<%=PreferencesConstants.PREFERENCE_LEVEL_MODULE%>');" target="prefCatView"><bean:message key="preferences.module" bundle="admin"/></a>
                        </li> 								 
					</ul>
    		</div>
   			<!-- End of Tabs -->
          	</td>
   		</tr>
        <tr>
        	<td>     
                <!-- Tab Contents Container -->
    			<div style="height:100%; width:100%;" class="tabcontainer"> 
    				<div style="width:100%;" class="tundra bodybg">
                        <table id="table2" cellspacing="0" cellpadding="0" width="100%" border="0">
                             <tr>
                                <td align="left" width="180">
                                	<div id="pref_module_container" style="position:relative; top:40px; width:180px; height:325px; text-align:left;">
                                    		<logic:equal name="preferencesLevel" value='user'>
                                            	<div style="position:relative; padding-top:5px">
                                                	<a id='<%=i%>' style=" display:block; width:100%; height:22px; " class="selecteditem" href="<%=ServerUtils.getContextName(request)%>/prefAction.do?operation=renderPortalPreferences" target="prefCatView" onClick="return moduleClicked('<%=i%>')" ><div style="padding-left:20px;"><bean:message key="preferences.portal" bundle="admin"/></div></a></div>
											</logic:equal> 
                                            
                                            <% i++ ; %>
                                                        
                                            <logic:present name="moduleList">
                                            <!--  List of modules map to user-->
                                                <logic:iterate name="moduleList" id="ModuleListID">
                                        			<div style="position:relative; padding-top:5px">
                                                		<a id='<%=i%>' style=" display:block; width:100%; height:22px;" class="unselectedlink" target="prefCatView" href = '<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/prefAction.do?operation=renderCategoryView&moduleUrlId=<bean:write name="ModuleListID" property="moduleUrlId"/>&moduleId=<bean:write name="ModuleListID" property="moduleId"/>&preferencesLevel=<%=ESAPI.encoder().encodeForHTML(preferencesLevel)%>'  onclick="return moduleClicked('<%=i%>')" > 
                                                               <div style="padding-left:20px;width:160px;text-overflow: ellipsis;overflow: hidden;" title='<bean:write name="ModuleListID" property="moduleName" filter="false"/>'> <bean:write name="ModuleListID" property="moduleName" filter="false"/></div>
                                                            </a>
                                            		</div>
											<% i++ ; %>
                                         		</logic:iterate>
                                                            
                                        	</logic:present>
                                        
                                        	
                                            
                                    	
                                    	
                                   	</div> 
                                </td>
                            	<td valign="top" width="550">
            						<!-- IFrame_Main -->
  									<iframe class="tundra bodybg" name="prefCatView" id="prefCatView" width="550" height="410" frameborder="0" marginheight="0" marginwidth="0" src='<%=ESAPI.encoder().encodeForHTML(selectedUrl)%>' onload="document.getElementById('loadImg').style.display='none';"> </iframe>
                 				</td>
                      	</tr>
                    </table>  
                 </div>
           	</div>
		</td>
	</tr>
</table>      
<!-- End of Tab Contents Container --> 
    <script>
	
	var clickedModuleId=<%=ESAPI.encoder().encodeForHTML(clickedModule)%>;
	moduleClicked(clickedModuleId);
	
	function prefLevelclicked(prefLevel){
	try {
		var fraContent = getCategoryFrame('prefCatView');
		var Url;
		if(fraContent != null)
		{
			Url=fraContent.getPreferenceLevel(prefLevel);
			if(Url == null )
			{
				if(prefLevel=="user")
				{
					Url='<%=ServerUtils.getContextName(request)%>/prefAction.do?operation=renderPortalPreferences';
				}
				else if(prefLevel=="module"){
					if(document.getElementById('1') != null){
					Url = document.getElementById('1').href;
					Url=Url+"&preferencesLevel="+prefLevel;
					clickedModuleId = '1';
					}else{
						showEmptyDialog('No module(s) mapped','Information');
						return;
					}
				}
			}
			Url=encodeURIComponent(Url);
		}
		
		window.location = '<%=ServerUtils.getContextName(request)%>/prefAction.do?operation=renderMainView&preferencesLevel='+ prefLevel + '&selectedUrl=' + Url + '&clickedModule=' + clickedModuleId ;
		 } catch(error) {
	  }
	}
    function moduleClicked(id) { 
	if(processStatus==false){
	processStatus=true;
		clickedModuleId = id;
		for(i=0; i < <%=i%>; i++){
			try{
			   document.getElementById(i).className = "pref_unselectedlink";	
                  				   
			}catch(er){}
		}  
		document.getElementById(id).className = "pref_selectedlink"; 
		return true;
		}
		else{
		return false;}
	}
	function updateSessionDetails() {
	//maintaining parent page session timer
		parent.updateSessionDetails();
	}

	</script> 
</body>
</html>
 
