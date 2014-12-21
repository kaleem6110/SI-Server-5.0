<%@page import="com.spacetimeinsight.db.model.util.DataModelsCache"%>
<%@page import="com.spacetimeinsight.db.config.model.DatabaseTypesMaster"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="java.util.List"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ page import=" com.enterprisehorizons.magma.config.dbadmin.*" %>
<%@page import="java.util.Locale"%>
<%@page import="com.spacetimeinsight.db.config.model.LanguageMaster"%>
<%@page import="com.enterprisehorizons.magma.server.util.CommonUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils"%>
<%@page import="com.spacetimeinsight.web.common.constants.WebConstants,com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.spacetimeinsight.db.config.model.LanguageDetails"%>
<%@page import="com.enterprisehorizons.magma.usrgrppermission.form.UserForm"%>
<%@page import="com.enterprisehorizons.magma.server.util.IServerConstants"%>
<%@page import="java.util.*"%>
<html:html locale="true">

<%
	String buttonState = request.getAttribute(IServerConstants.BUTTON_STATE)!=null ? (String)request.getAttribute(IServerConstants.BUTTON_STATE):IServerConstants.BUTTON_STATE_SAVE;
%>

<head>
<%@ include file="/common/dojo.jsp" %>
<script type="text/javascript" src="js/ecoweb.js" ></script>
<script type="text/javascript" src="js/windowsjs/javascripts/window.js"> </script>
<title>Create User</title>        
<!-- SCRIPT SECTION -->   
<script>
	var cntFName = 0;
	var cntLName = 0;
	var langFirstNameArr = new Array();
	var langLastNameArr = new Array();
function resetHandler(){
//Resetting the values one by one in case reset button is pressed.
//It will work only in case of new entry, in case of update the one by one resetting will not work.
var formels = document.getElementById("userForm");
var id = document.getElementById("id");
if(formels != null && id != null && (id.value == "" || id.value=="0")){
	for (var i = 0, len = formels.length; i < len; ++i) {
		if (formels[i].type == "text" || formels[i].type == "password") {
			formels[i].value = "";
		}else if(formels[i].type == "checkbox"){
			formels[i].checked = true;
		}
	}
}else{
	document.forms[0].action = "<%=ServerUtils.getContextName(request)%>/userAction.do?operation=reset";
	document.forms[0].submit();
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
	if(document.getElementById("languageDivFirstName").style.display != "none" || document.getElementById("languageDivLastName").style.display != "none"){
		openLangConfirmationDialog(data2Show);
	}else{
		submitHandler();
	}
}
</script>
<!-- END SCRIPT SECTION -->
</head>

<body class="tundra bodybg">

<html:form action="/userAction" styleId="userForm">
<input type="hidden" name="csrf" id="csrf" value="${csrf}">
<input type="hidden" name="langList" id="langList" value="">
<table width="100%">
	<tr>
		<td class="pageTitle paddingTitle">
    		<table width="100%">    
    			<tr>
					<td class="redtitle" height="60px" align="left" valign="top">
						<%if(buttonState.equalsIgnoreCase(IServerConstants.BUTTON_STATE_SAVE)){%>
							<strong class="pageTitle paddingTitle" style="padding-left:0px"><bean:message key="admin.usrgrppermission.user.createtitle" bundle="admin" /><br/>
							<span class="paddingTitleDesc bodytext" style="padding-left:0px"><bean:message key="admin.usrgrppermission.user.createdesc" bundle="admin" /></span></strong>
						<%}else{%>
							<strong class="pageTitle paddingTitle" style="padding-left:0px"><bean:message key="admin.usrgrppermission.user.updatetitle" bundle="admin" /><br/>
							<span class="paddingTitleDesc bodytext" style="padding-left:0px"><bean:message key="admin.usrgrppermission.user.updatedesc" bundle="admin" /></span></strong>
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
							<td colspan="2">
								<html:hidden name='userForm' property="id" styleId="id"/>
							</td>
						 </tr>
                         	<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.loginid" bundle="admin" /><span style='color:red;font-size:12px'>*</span> : </label>
								</td>
								<td align="left" >
									<html:text name='userForm' property="loginId" maxlength="30"/>
								</td>
								
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.password" bundle="admin" /><span style='color:red;font-size:12px'>*</span> : </label>
								</td>
								<td align="left" >
									<html:password name='userForm' property="password" styleId="password"/>
								</td>
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.confirmpassword" bundle="admin" /><span style='color:red;font-size:12px'>*</span> : </label>
								</td>
								<td align="left" >
									<html:password name='userForm' property="confirmPassword"  styleId="confirmPassword"/>
								</td>
							</tr>
							<tr><td colspan="4" height="15px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.firstname" bundle="admin" /><span style='color:red;font-size:12px'>*</span> : </label>
								</td>
								<td align="left" >
									<table>
										<tr>
											<td>
												<html:text name='userForm' property="firstName" maxlength="30" />
											</td>
											<td>
												<input id="firstlangBtn" type="button" class="langBtn" onclick="openLanguagePopUp('languageDivFirstName')" />
											</td>
										</tr>
									</table>			
								</td>
							</tr>
							<tr><td colspan="4" height="12px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.lastname" bundle="admin" /><span style='color:red;font-size:12px'>*</span> : </label>
								</td>
								<td align="left" >
									<table>
										<tr>
											<td>
												<html:text name='userForm' property="lastName" maxlength="30" />
											</td>
											<td>
												<input id="lastlangBtn" type="button" class="langBtn" onclick="openLanguagePopUp('languageDivLastName')" />
											</td>
										</tr>
									</table>
									
								</td>
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.email" bundle="admin" /> : </label>
								</td>
								<td align="left" >
									<html:text name='userForm' property="email" />
								</td>
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.phoneno" bundle="admin" /> : </label>
								</td>
								<td align="left" >
								<html:text name='userForm' property="phoneNo" />
								</td>
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.forceuserchange" bundle="admin" /> : </label>
								</td>
								<td align="left" >
								<html:checkbox name='userForm' property="changePassword" />
								</td>
							</tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.active" bundle="admin" /> : </label>
								</td>
								<td align="left" >
								<html:checkbox name='userForm' property="active" />
								</td>
							</tr>
								<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.organization" bundle="admin" /> : </label>
								</td>
								<td align="left" >
									<html:text name='userForm' property="organization" />
								</td>
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.firststreet" bundle="admin" /> : </label>
								</td>
								<td align="left" >
									<html:text name='userForm' property="firstStreet" />
								</td>
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.secondstreet" bundle="admin" /> : </label>
								</td>
								<td align="left" >
									<html:text name='userForm' property="secondStreet" />
								</td>
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.city" bundle="admin" /> : </label>
								</td>
								<td align="left" >
									<html:text name='userForm' property="city" />
								</td>
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.state" bundle="admin" /> : </label>
								</td>
								<td align="left" >
									<html:text name='userForm' property="state" />
								</td>
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.country" bundle="admin" /> : </label>
								</td>
								<td align="left" >
									<html:text name='userForm' property="country" />
								</td>
							</tr>
							<tr><td colspan="4" height="13px"></td></tr>
							<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="admin.usrgrppermission.user.label.zipcode" bundle="admin" /> : </label>
								</td>
								<td align="left" >
									<html:text name='userForm' property="zipCode" />
								</td>
							</tr>
							<tr>   
								<td align="right" style="padding-right:5px">
								</td>
								<td align="left" >
									<html:hidden name='userForm' property="createdDate" />
								</td>
							</tr>
					</table>
					</td>
					<td>
						<table>	
							<tr>	
								
								<td>
									<div id="languageDivFirstName" style="display: none; " class="languageSelectionDiv langSelection-userFirstNameDiv" >
										<table border="0" cellpadding="0" cellspacing="0">
											<tr class="barColor">
												<td>
													<div>
														<label class="label textcolor" style="font-size:12px;float:left; padding-left:5px">
															<bean:message key="admin.usrgrppermission.langpopup.label.localizedname" bundle="admin" /> 
														</label>
													</div>
													<div style="float:right">
														<img src="<%=ServerUtils.getContextName(request)%>/images/popup_closebtn_blue.png" onClick="closeLanguagePopupForFName('languageDivFirstName')"/>
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
																			<bean:message key="admin.usrgrppermission.user.label.firstname" bundle="admin" />
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
																		<logic:iterate id="obj" property="firstNameLangDetailList" name="userForm"   >
																			<tr>
																			<script>
																				langFirstNameArr[cntFName] = '<bean:write name='obj' property='nameInLang' filter ="false"/>';
																				cntFName++;
																			</script>
																				<td style="padding-right:5px; text-align:right">
																					<label class="label"><bean:write name="obj" property="langDesc"  /> : </label>
																				</td>
																				<td>
																					<input type="text" value='<bean:write name='obj' property='nameInLang' filter ="false"/>'maxlength="30" name='<bean:write name='obj' property='languageId' />' id='<bean:write name='obj' property='languageId' />' style="height:22px;" />
																				</td>
																			</tr>
																			<tr><td colspan="2" ></td></tr>
																		</logic:iterate>
																	</table>
																</div>
															</td>
														</tr>
														<tr>
														<td colspan="2" align='right'><input type='button' onclick='applyLanguageChangesForFName()' value='<bean:message key="admin.usrgrppermission.langpopup.label.apply" bundle="admin" />' />&nbsp;&nbsp;<input type='button' onclick='clearLanguagePopupForFirstName()' value='<bean:message key="admin.usrgrppermission.langpopup.label.clear" bundle="admin" />' /></td>
													</tr>
													</table>
												</td>
											</td>
										</table>
									</div>
									<div id="languageDivLastName" style="display: none; " class="languageSelectionDiv langSelection-userLastNameDiv" >
										<table border="0" cellpadding="0" cellspacing="0">
											<tr class="barColor">
												<td>
													<div>
														<label class="label textcolor" style="font-size:12px;float:left; padding-left:5px">
															<bean:message key="admin.usrgrppermission.langpopup.label.localizedname" bundle="admin" /> 
														</label>
													</div>
													<div style="float:right">
														<img src="<%=ServerUtils.getContextName(request)%>/images/popup_closebtn_blue.png" onClick="closeLanguagePopupForLName('languageDivLastName')"/>
													</div>
												</td>
											</tr>	
											<tr>
												<td>
													<table>
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
																			<bean:message key="admin.usrgrppermission.user.label.lastname" bundle="admin" />
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
																		<logic:iterate id="obj" property="lastNameLangDetailList" name="userForm">
																		<tr>
																			<script>
																				
																				langLastNameArr[cntLName] = '<bean:write name='obj' property='nameInLang' filter ="false"/>';
																				cntLName++;
																			</script>
																			<td style="padding-right:5px; text-align:right">
																				<label class="label"><bean:write name="obj" property="langDesc"  /> : </label>
																			</td>
																			<td>
																				<input type="text" value='<bean:write name='obj' property='nameInLang' filter ="false"/>'maxlength="30" name='<bean:write name='obj' property='languageId' /><bean:write name="obj" property="langDesc" />' id='<bean:write name='obj' property='languageId' /><bean:write name="obj" property="langDesc" />' style="height:22px;" />
																			</td>
																		</tr>
																		<tr>
																			<td colspan="2"></td>
																		</tr>
																		</logic:iterate>
																	</table>
																</div>
															</td>
														</tr>
														<tr>
															<td colspan="2" align='right'><input type='button' onclick='applyLanguageChangesForLName()' value='<bean:message key="admin.usrgrppermission.langpopup.label.apply" bundle="admin" />' />&nbsp;&nbsp;<input type='button' onclick='clearLanguagePopupForLastName()' value='<bean:message key="admin.usrgrppermission.langpopup.label.clear" bundle="admin" />' /></td>
														</tr>
													</table>
												</td>
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
		
		<button dojoType="dijit.form.Button" type="button" id='backBtn'  onclick="window.location ='<%=ServerUtils.getContextName(request)%>/userAction.do?operation=showAllUsers&pageNo=1'">  <bean:message key="dbconfig.back" /> </button>
        <button dojoType="dijit.form.Button" type="button" id='submitBtn' onClick="confirmLangDialog('<bean:message key="admin.usrgrppermission.langpopup.confirm.message" bundle="admin" />')" value='<%=buttonState%>' ><%=buttonState%></button>
        <button dojoType="dijit.form.Button" type="button" id='resetBtn' onClick="resetHandler()" > <bean:message key="dbconfig.reset" /> </button>
		<% if(!IServerConstants.BUTTON_STATE_SAVE.equalsIgnoreCase(buttonState)){%>	
		<button dojoType="dijit.form.Button" type="button" id='changePassword' onClick="resetPassFields()"> <bean:message key="dbconfig.update.changepassword" /> </button>
		<%} %>
	</td>
</tr>
</table>
</html:form>

<!-- SCRIPT SECTION-->
<script>
function openLanguagePopUp(divId){
	document.getElementById(divId).style.display = "block";
}
function clearLanguagePopupForFirstName(){
	<logic:iterate id="obj" property="firstNameLangDetailList" name="userForm" >
		document.getElementById('<bean:write name='obj' property='languageId' />').value = '';
	</logic:iterate>
}
function clearLanguagePopupForLastName(){
	<logic:iterate id="obj" property="lastNameLangDetailList" name="userForm" >
		document.getElementById('<bean:write name='obj' property='languageId' /><bean:write name="obj" property="langDesc" />').value = '';
	</logic:iterate>
}
function closeLanguagePopupForFName(langdiv){
	var cnt = 0;
	<logic:iterate id="obj" property="firstNameLangDetailList" name="userForm"   >
		document.getElementById('<bean:write name='obj' property='languageId' />').value = langFirstNameArr[cnt];
		cnt++;
	</logic:iterate>
	document.getElementById(langdiv).style.display = "none";
}

function closeLanguagePopupForLName(langdiv){
	var cnt = 0;
	<logic:iterate id="obj" property="lastNameLangDetailList" name="userForm"   >
		document.getElementById('<bean:write name='obj' property='languageId' /><bean:write name="obj" property="langDesc" />').value = langLastNameArr[cnt];
		cnt++;
	</logic:iterate>
	document.getElementById(langdiv).style.display = "none";
}

function applyLanguageChangesForFName(){
	cntFName=0;
	<logic:iterate id="obj" property="firstNameLangDetailList" name="userForm"   >
		langFirstNameArr[cntFName]=document.getElementById('<bean:write name='obj' property='languageId' />').value;
		cntFName++;
	</logic:iterate>
   document.getElementById('languageDivFirstName').style.display = 'none';
}
function applyLanguageChangesForLName(){
	cntLName = 0;
	<logic:iterate id="obj" property="lastNameLangDetailList" name="userForm"   >
		langLastNameArr[cntLName]=document.getElementById('<bean:write name='obj' property='languageId' /><bean:write name="obj" property="langDesc" />').value;
		cntLName++;
	</logic:iterate>
  document.getElementById('languageDivLastName').style.display = "none";
}
function submitHandler(){
	if(dijit.byId('submitBtn').value=="Save"){
		document.forms[0].action = "<%=ServerUtils.getContextName(request)%>/userAction.do?operation=create";
	}else{
		document.forms[0].action = "<%=ServerUtils.getContextName(request)%>/userAction.do?operation=update";
	}
	document.forms[0].submit();
}

function resetPassFields()
{
	document.getElementById('password').setAttribute('value','');
	document.getElementById('confirmPassword').setAttribute('value','');
}
</script>
<script>
var showDiv = false;
<logic:iterate id="obj" property="firstNameLangDetailList" name="userForm" >
		showDiv = true;
	</logic:iterate>
	if(showDiv){
		document.getElementById('firstlangBtn').style.display = "block";
		document.getElementById('lastlangBtn').style.display = "block";
	}else{
		document.getElementById('firstlangBtn').style.display = "none";
		document.getElementById('lastlangBtn').style.display = "none";
	}
</script>
<!-- END SECTION -->
</body>
</html:html>