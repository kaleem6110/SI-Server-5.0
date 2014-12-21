
<%@page import="com.spacetimeinsight.db.model.util.DataModelsCache"%>
<%@page import="com.spacetimeinsight.db.config.model.DatabaseTypesMaster"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.spacetimeinsight.db.config.model.ModuleUrlMaster"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ page import=" com.enterprisehorizons.magma.config.dbadmin.*" %>
<%@page import="java.util.Locale"%>
<%@page import="java.util.*"%>
<%@page import="com.spacetimeinsight.db.config.model.LanguageMaster"%>
<%@page import="com.enterprisehorizons.magma.server.util.CommonUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils"%>
<%@page import="com.spacetimeinsight.web.common.constants.WebConstants,com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.usrgrppermission.form.ModuleForm"%>
<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%@page import="com.spacetimeinsight.db.config.model.LanguageDetails"%>
<%@page import="com.enterprisehorizons.magma.server.util.IServerConstants"%>
<html:html locale="true">
<%
	String operation = (String)request.getAttribute(IServerConstants.OPERATION);
	String buttonState = request.getAttribute(IServerConstants.BUTTON_STATE)!=null ? (String)request.getAttribute(IServerConstants.BUTTON_STATE):IServerConstants.BUTTON_STATE_SAVE;

%>

<head>
<%@ include file="/common/dojo.jsp" %>
<script type="text/javascript" src="js/ecoweb.js" ></script>
<script type="text/javascript" src="js/windowsjs/javascripts/window.js"> </script>
<title>Create Module</title>    
<script>
	var cntModule = 0;
	var langModuleArr = new Array();
	function resetHandler(){
	//Resetting the values one by one in case reset button is pressed.
	//It will work only in case of new entry, in case of update the one by one resetting will not work.
	var formels = document.getElementById("moduleForm");
	var id = document.getElementById("id");
	if(formels != null && id != null && (id.value == "" || id.value == "0")){
	for (var i = 0, len = formels.length; i < len; ++i) {
		if (formels[i].type == "text" || formels[i].type == "textarea") {
			formels[i].value = "";
		}
		else if(formels[i].type == "select-one"){
			document.getElementById("urlId").options[0].selected = true;
		}else if(formels[i].type == "checkbox"){
			formels[i].checked = false;
		}
	}
	}else{
		document.forms["moduleForm"].action = "<%=ServerUtils.getContextName(request)%>/moduleAction.do?operation=reset";
		document.forms["moduleForm"].submit();
	}
	
	//Removing the error messages when the user has clicked reset button.
	var errorels = document.getElementById("errors");
		if(errorels != null){
			while (errorels.firstChild) {
				errorels.removeChild(errorels.firstChild);
			}            
		}
	}
	
	// Checks whether the language div is open or closed. If the language Div is open then it will ask whether you want to save the changes or not
	function confirmLangDialog(data2Show) {
		if(document.getElementById("languageDiv").style.display != "none"){
			openLangConfirmationDialog(data2Show);
		}else{
			submitHandler();
		}
	}
     function imposeMaxLength(Object, MaxLen){
    	 	return (Object.value.length <= MaxLen);
        }
</script>    
</head>
<body class="tundra bodybg">
<html:form action = "/moduleAction" styleId="moduleForm">
<input type="hidden" name="csrf" id="csrf" value="${csrf}">

<table width="100%">
	<tr>
		<td class="pageTitle paddingTitle">
    		<table width="100%">    
    			<tr>
					<td class="redtitle" height="60px" align="left" valign="top">
					<%if(buttonState.equalsIgnoreCase(IServerConstants.BUTTON_STATE_SAVE)){%>
						<strong class="pageTitle paddingTitle" style="padding-left:0px"><bean:message key="admin.usrgrppermission.module.createtitle" bundle="admin" /><br/>
            			<span class="paddingTitleDesc bodytext" style="padding-left:0px"><bean:message key="admin.usrgrppermission.module.createdesc" bundle="admin" /></span></strong>
	    			<%}else{%>
						<strong class="pageTitle paddingTitle" style="padding-left:0px"><bean:message key="admin.usrgrppermission.module.updatetitle" bundle="admin" /><br/>
            			<span class="paddingTitleDesc bodytext" style="padding-left:0px"><bean:message key="admin.usrgrppermission.module.updatedesc" bundle="admin" /></span></strong>
					<%}%>
					</td>
 	    		</tr>
    			<tr>
					<td>
						<font color="red"><ul id="errors"><html:errors bundle="admin"/></ul></font>
					</td>
				</tr>
                <tr>
                	 <td align="left" valign="top">
					 <table>
					 <tr>
					 <td>
                     <!-- Form -->
                     	 <table border="0">
						 <tr>
								 <td>
									<html:hidden name = "moduleForm" property="id" styleId="id"/>
								 </td>
						 </tr>
							<tr>
								<td align="right" style="padding-right:5px">
									<label class="label">
									<bean:message key="admin.usrgrppermission.module.label.name" bundle="admin" />
									<span style='color:red;font-size:12px'>*</span> :
									</label>
								</td>
								<td align="left" >
									<table>
										<tr>
											<td>
												<html:text name='moduleForm' property="name" size="22" maxlength="40" style="width:230px"/>
											</td>
											<td>
												<input id="langGlobBtn" type="button" class="langBtn" onclick="openLanguagePopUp('languageDiv')"/>
											</td>
										</tr>
									</table>
									
								</td>
							</tr>
								<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.module.label.description" bundle="admin" />:</label>
								</td>
								<td>
									<html:textarea name='moduleForm' property="description" rows="3" cols="25" onkeypress="return imposeMaxLength(this, 99);" style="width:230px"/>
								</td>
							</tr>
								<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.module.label.moduletype" bundle="admin" /><span style='color:red;font-size:12px'>*</span> : </label>
								</td>
								<td align="left" >
									<html:select name="moduleForm" property="urlId"  style="width:230px" styleId="urlId">
										<html:option value="0"><bean:message key="admin.usrgrppermission.select.default" bundle="admin" /></html:option>
									<%List modelsList = DataModelsCache.getInstance().retrieve(ModuleUrlMaster.class.getName());
										int count = modelsList == null ? 0 : modelsList.size();
										ModuleUrlMaster model = null;
										for (int i = 0; i < count; i++) {
											model = (ModuleUrlMaster) modelsList.get(i);
										
										
									%>
										<html:option value="<%=model.getId().toString()%>"><%=model.getName()%></html:option>
									<%}%>
									</html:select>
								</td>
							</tr>
								<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.module.label.parameters" bundle="admin" />:</label>
								</td>
								<td>
									<html:textarea name='moduleForm' property="parameters" rows="3" cols="25" style="width:230px"/>
								</td>
							</tr>
								<tr><td colspan="4" height="13px"></td></tr>

							<tr>
								<td align="right" style="padding-right:5px">
									<label class="label">
									<bean:message key="admin.usrgrppermission.module.app.help.url" bundle="admin" />									
									</label>
								</td>
								<td align="left" >
									<html:text name='moduleForm' property="applicationHelpUrl" size="250" maxlength="250" style="width:230px"/>									
								</td>								
							</tr>
							<tr>
								<td align="right" style="padding-right:5px">
									<label class="label">
									<bean:message key="admin.usrgrppermission.module.businessview.help.url" bundle="admin" />									
									</label>
								</td>
								<td align="left" >
									<html:text name='moduleForm' property="businessViewHelpUrl" size="250" maxlength="250" style="width:230px"/>									
								</td>								
							</tr>
							<tr>
								<td align="right" style="padding-right:5px">
									<label class="label">
									<bean:message key="admin.usrgrppermission.module.viewerplugin.help.url" bundle="admin" />									
									</label>
								</td>
								<td align="left" >
									<html:text name='moduleForm' property="viewerPluginHelpUrl" size="250" maxlength="250" style="width:230px"/>									
								</td>								
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.module.label.ismobilemodule" bundle="admin" />:</label>
								</td>
								<td align="left" >
									<html:checkbox name='moduleForm' property="mobileSpecific" />
								</td>
							</tr>
							<tr>   
								<td align="right" style="padding-right:5px">
								</td>
								<td align="left" >
									<html:hidden name='moduleForm' property="createdDate" />
								</td>
							</tr>
					</table>
					</td>
					<td>
					<table>	
							<tr>	
								<td>
									<div id="languageDiv" style="display: none;" class="languageSelectionDiv languageSelectionDiv-module" >
										<table border="0" cellpadding="0" cellspacing="0">
											<tr class="barColor">
												<td>
													<div>
														<label class="label textcolor" style="font-size:12px;float:left; padding-left:5px">
															<bean:message key="admin.usrgrppermission.langpopup.label.localizedname" bundle="admin" /> 
														</label>
													</div>
													<div style="float:right">
														<img src="<%=ServerUtils.getContextName(request)%>/images/popup_closebtn_blue.png" onClick="closeLanguagePopup('languageDiv')"/>
													</div>
												</td>
											</tr>	
											<tr>
												<td>
													<table border="0">
														<tr>
															<td>
																<table>
																	<tr>
																		<td style="padding-right:5px; text-align:right; width:80px;">
																			<label class="label">
																				<bean:message key="admin.usrgrppermission.langpopup.label.language"  bundle="admin" /> :
																			</label>
																		</td>
																		<td align="left">
																			<bean:message key="admin.usrgrppermission.module.label.name" bundle="admin" />
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
														<tr><td> </td></tr>
														<tr>
															<td>
																<div class="languageDivInnerContainer">
																	<table>
																		<logic:iterate id="obj" property="listLanguageDetails" name="moduleForm">
																		<tr>
																		<script>
																			langModuleArr[cntModule] = '<bean:write name='obj' property='nameInLang' filter ="false"/>';
																			cntModule++;
																		</script>
																			<td style="padding-right:5px; text-align:right">
																					<label class="label"><bean:write name="obj" property="langDesc"  /> :</label>
																			</td>
																			<td>
																				<input type="text" value='<bean:write name='obj' property='nameInLang' filter ="false"/>'maxlength="30" name='<bean:write name='obj' property='languageId' />' id='<bean:write name='obj' property='languageId' />' style="height:22px;" />
																			</td>
																		</tr>
																		<tr>
																			<td colspan="2" ></td>
																		</tr>
																		</logic:iterate>
																	</table>
																</div>
															</td>
														</tr>
														<tr>
															<td align='right'><input type='button' onclick='applyLanguageChanges()' value='<bean:message key="admin.usrgrppermission.langpopup.label.apply" bundle="admin" />' />&nbsp;&nbsp;<input type='button' onclick='clearLanguagePopup()' value='<bean:message key="admin.usrgrppermission.langpopup.label.clear" bundle="admin" />' /></td>
														</tr>
													</table>
												</td>
											</tr>
											</td>
										</table>
									</div>
								</td>	
							</tr>
						</table>
					</td>
					</tr>
					</table>
              	</td>
      		</tr>
       </table>      
    </tr>
</table>

            
<table border="0" width="100%" style="padding-top:30px">

<tr class="barColor">
	<td width="100%" align="center">
		<button dojoType="dijit.form.Button" type="button" onClick="window.location ='<%=ServerUtils.getContextName(request)%>/adminMain.do'"> <bean:message key="dbconfig.home" /> </button>
		
		<button dojoType="dijit.form.Button" type="button" id='backBtn'  onclick="window.location ='<%=ServerUtils.getContextName(request)%>/moduleAction.do?operation=showAllModules&pageNo=1'">  <bean:message key="dbconfig.back" /> </button>
        <button dojoType="dijit.form.Button" type="button" id='submitBtn' onClick="confirmLangDialog('<bean:message key="admin.usrgrppermission.langpopup.confirm.message" bundle="admin" />')" value="<%=buttonState %>" ><%=buttonState %></button>
        <button dojoType="dijit.form.Button" type="button" id='resetBtn' onClick="resetHandler()" > <bean:message key="dbconfig.reset" /> </button>
	</td>
</tr>
</table>
</html:form>

<!-- SCRIPT SECTION-->
<script>

function openLanguagePopUp(divId){
	document.getElementById(divId).style.display = "block";
}

function closeLanguagePopup(){
	cntModule = 0;
	<logic:iterate id="obj" property="listLanguageDetails" name="moduleForm">
		document.getElementById('<bean:write name='obj' property='languageId' />').value = langModuleArr[cntModule];
		cntModule++;
	</logic:iterate>
	document.getElementById("languageDiv").style.display = "none";

}

function clearLanguagePopup(){
	<logic:iterate id="obj" property="listLanguageDetails" name="moduleForm" >
		document.getElementById('<bean:write name='obj' property='languageId' />').value = '';
	</logic:iterate>
}
function submitHandler(){
	if(dijit.byId('submitBtn').value=="Save"){
		document.forms["moduleForm"].action = "<%=ServerUtils.getContextName(request)%>/moduleAction.do?operation=create";
		}else{
		document.forms["moduleForm"].action = "<%=ServerUtils.getContextName(request)%>/moduleAction.do?operation=update";
		}
	document.forms["moduleForm"].submit();
}

function applyLanguageChanges(){
	cntModule=0;
	<logic:iterate id="obj" property="listLanguageDetails" name="moduleForm">
		langModuleArr[cntModule] = document.getElementById('<bean:write name='obj' property='languageId' />').value;
		cntModule++;
	</logic:iterate>
	document.getElementById('languageDiv').style.display = "none";
}
</script>
<script>
var showDiv = false;
<logic:iterate id="obj" property="listLanguageDetails" name="moduleForm" >
		showDiv = true;
	</logic:iterate>
	if(showDiv){
		document.getElementById('langGlobBtn').style.display = "block";
	}else{
		document.getElementById('langGlobBtn').style.display = "none";
	}
</script>


<!-- END SECTION -->
</body>
</html:html>