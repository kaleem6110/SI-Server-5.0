 <%@ page import="com.enterprisehorizons.magma.config.dbadmin.ModelConfigConstants" %>
 <%@ page import="java.util.List" %>
<%@ page import="com.spacetimeinsight.magma.job.bean.JobMonitorBean" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ page import="java.util.*, com.spacetimeinsight.magma.job.JobConstants, com.enterprisehorizons.magma.job.bd.JobScheduleDelegator,com.spacetimeinsight.magma.job.bean.StiJobBean"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@page import="com.enterprisehorizons.magma.jobs.forms.JobLogsForm"%>
<%@ include file="/common/dojo.jsp" %>
<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%
  // Changes for applying Privileges -- Start
  UserBean userBean          = (UserBean)session.getAttribute(ServerUtils.USER_BEAN_NAME); 
  String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
  RoleRightsMap roleRightsMapCon	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_CONFIG, moduleId); 
  //Get the access permissions for the given right or subright and accessType
  RoleRightsMap roleRightsMapMan	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_MANAGE, moduleId); 
  
  RoleRightsMap roleRightsMapSchtask	    = AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.
  SCHEDULERS_TASK, moduleId);
  
  //Get the access permissions for the given right or subright and accessType
  RoleRightsMap roleRightsMapLog	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_LOG, moduleId);  
  //Changes for applying Privileges -- End
  
%>
<%
    int jobsCount = 0;
	List allJobLogRecords = (List)  request.getAttribute("allJobLogRecords");
	List listOfFileNames = (List)  request.getAttribute("listOfFileNames");   
%>

<html:html locale="true">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Scheduler Logs</title>


<style type="text/css">

div.clear {
    clear: both;
} 
</style>
    
</head>

<body class="tundra bodybg" style="overflow-x:hidden;overflow-y:auto">
<html:form method="post" action="/jobLogsAction.do"  >
<table width="100%" cellspacing="0" cellpadding="0" align="center"  border="0" >
	<tr>
		<td  class="pageTitle paddingTitle">      
			Schedulers Logs
		</td>
	</tr>
	<tr>
	   <td class="paddingTitleDesc">
		 <strong>Provides provision to display Scheduler Logs </strong>
		</td>  
	</tr>
	<tr>
		<td style="padding-left:280px; width:500px;">
		   
		</td>  
	</tr>
	<tr>
		<td style="padding-top:30px;padding-left:67px;width:900px">
			<table width="100%" cellspacing="0" cellpadding="0" style="align:left;" >
				<tr>
					<td>
						<div id="tabs_container" style="text-align:left;">
							<table width="100%" cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td style="text-align:left;" valign="middle">
                                    	<div id="tabs_container_crystal" style="align:left; height:25px; width:922px">
                                            <ul style="padding-left:0px">
                                            	<li class='panelColor tabs_border'>
                                               		<a <%if(roleRightsMapCon.getHasReadAccess()) { %> href="<%=ServerUtils.getContextName(request)%>/configureJobSchdAction.do?operation=view" style="color:#000000" <%}else{%> href="#"  disabled="true" style="color:#CCCCCC" <%}%> ><b><bean:message key="jobs.configureSchedulers" bundle="jobs"/> </b></a>  
                                                </li>
                                            	<li class='panelColor tabs_border'>
                                               		<a <%if(roleRightsMapMan.getHasReadAccess()) { %> href="<%=ServerUtils.getContextName(request)%>/startStopAction.do?operation=refresh&jobName=" style="color:#000000" <%}else{%> href="#" disabled="true" style="color:#CCCCCC" <%}%> ><b><bean:message key="jobs.monitorSchedulers" bundle="jobs"/></b></a> 
                                                </li>
												<li class='panelColor tabs_border''>
                                                    <a <%if(roleRightsMapSchtask.getHasReadAccess()){%>href="<%=ServerUtils.getContextName(request)%>/manageTaskAction.do?operation=view"  style="color:#000000" <%} else {%> style="color:#CCCCCC" href="#" disable="true" <%}%> ><b><bean:message key="jobs.monitorTask" bundle="jobs"/></b></a>
                                                </li>
                                                <li class='active_t tabs_border'>
                                                	<a <%if(roleRightsMapLog.getHasReadAccess()) { %> href="#"  style="color:#000000" onClick="refreshJobs()" <%}else{%> style="color:#CCCCCC" <%}%> ><b>Logs</b></a>
                                                </li>  
                                            </ul>
                                        </div>
                                      </td>   
								</tr>
							</table>
						</div>  
					</td>
				</tr>   
			</table>
			<div class="clear"></div>
			<div class="tabsContentsContainer" style="width:900px">
			<div style="height:290px; overflow:auto"> 
			<table border="0" width="100%"   height="54" cellspacing="0" cellpadding="0" >
				<tr>
					<td>
						<table border="0" cellspacing="0" cellpadding="0"  width="100%">
							<tr class="tableBgColor">
								<td style="padding-top:10px;padding-left:5px"  width="10%" align="left"><label class="label"><bean:message key="jobs.label.select.date" bundle="jobs"/></label></td>
								<td style="padding-top:10px;padding-left:5px" width="12%" align="left">
									<div id="dateDiv">
										<input id="runTime" value="<%=request.getAttribute("runTime")%>" type="text" name="runTime" style="width:100px;height:1.7em;" dojoType="dijit.form.DateTextBox" trim="true"  promptMessage="MM/dd/yyyy" autocomplete="off" onChange="dojo.byId('calendarDiv').innertHTML=arguments[0];" invalidMessage="Invalid date. Use MM/dd/yyyy format." /><br><font size="1"><label><bean:message key="jobs.startDateFormat" bundle="jobs"/></label></font>
									</div>
									<div id="calendarDiv"  style="position:absolute;z-index:100;display:none; top:176px; left:600px; width:200; height:200; border:2px solid #EAEAEA;background-color:blue;opacity:1;">
									</div>
								</td>
								<td style="padding-left:5px;padding-top:5px;" align="left">
									<button dojoType="dijit.form.Button" type="button" id="idSearch" name="btnSearch" onClick="searchLogs()"><bean:message key="jobs.button.search" bundle="jobs"/></button>
									<button dojoType="dijit.form.Button" type="button" id="idReset" name="btnReset" onClick="resetLogs()"><bean:message key="jobs.reset" bundle="jobs"/></button>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table border="1" cellspacing="0" cellpadding="0"  width="100%" class="bgcolorReports ">
							<tr>
								<td class="tab panelColor" height="27" align="left" width="25%" valign="middle"><label style="padding-left:5px" class="label"><bean:message key="jobs.logJobName" bundle="jobs"/></label></td>
								<td class="tab panelColor" height="27" align="left" width="15%"  valign="middle"><label style="padding-left:5px" class="label"><bean:message key="jobs.logServerName" bundle="jobs"/></label></td>
								<td class="tab panelColor" height="27" align="center" width="10%"  valign="middle"><label  align="center" class="label"><bean:message key="jobs.logStatus" bundle="jobs"/></label></td>
								<td class="tab panelColor" height="27" align="center" width="25%"  valign="middle" ><label align="center" class="label"><bean:message key="jobs.logRunTime" bundle="jobs"/></label></td>
								<td class="tab panelColor" height="27" align="center" width="10%"  valign="middle" ><label style="padding-left:5px"align="center"class="label"><bean:message key="jobs.logDuration" bundle="jobs"/></label></td>
								<td class="tab panelColor" height="27" align="center" width="15%"  valign="middle" ><label  align="center"class="label"><bean:message key="jobs.logAction" bundle="jobs"/></label></td>							</tr>
	      
					<logic:present scope="request" name="allJobLogRecords">							
						<%! int j=0;%>
						<logic:iterate name="allJobLogRecords" id="jobDetails">
							<tr class="tableBgColor">
								<td height="27" align="left" valign="middle"  style="width: 150px;word-wrap: break-word;padding-left:5px; padding-top:15px" > 
								<span><label class="body"><bean:write name="jobDetails" property="jobName"/>
							 	</label><p></span></td>
							 	<td height="27" align="left" valign="middle"  style="width: 75px;padding-left:5px;"><bean:write name="jobDetails" property="serverName"/></td>
								<td height="27" align="center" valign="middle"  style="width: 75px"><logic:equal name="jobDetails" property="status" value="Successful"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_tick.png" width="16" height="16"/></logic:equal><logic:equal name="jobDetails" property="status" value="Failed"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_error.png" width="16" height="16"/></logic:equal></td>
								<td height="27" align="center" valign="middle"  style="width: 250px">
									<label class="body"> <bean:write name="jobDetails" property="startTime"/></label>
								</td>
								<td height="27" align="center" valign="middle" style="width: 250px;">
									<label class="body"> <bean:write name="jobDetails" property="duration"/> </label>
								</td>
								<td height="27" align="Center" valign="middle"  >
									<button dojoType="dijit.form.Button"  type="button"  id="startId<%=j%>" name="startId<%=j%>" onClick="submitForm('<bean:write name='jobDetails' property='logFile'/>');">
									<bean:message key="jobs.button.open.logs" bundle="jobs"/>
									</button>       
								</td>                                                
							</tr>
						<%
							jobsCount = 1; j++;
						%>
						</logic:iterate>             
					</logic:present>
				        </table>
                    </td>
                </tr>
				<tr>
					<td colspan='6' align='center'>
						<%
						if(jobsCount==0){
						%>
							<bean:message key="jobs.no.log.files.found" bundle="jobs"/>
						<%
						}
						%>
					</td>
				</tr>
            </table>
			</div>
            <table  width="900">
                
			</table> 
            </div>
        </td>
	</tr>
</table>
    <input type="hidden" name="operation" id="operation" value="onLoad" />
    <input type="hidden" name="jobName" id="jobName" value="" />
	<input type="hidden" name="fileName" id="fileName" value="" />
	<input type="hidden" name="csrf" value="${csrf}" >
  
<!-- Button Panel -->
<table width="101.2%"  border="0">
	<tr>
    	<td height="18"></td>
    </tr>    
    <tr align="center" class="barColor">
		<td  align="center">
            <button dojoType="dijit.form.Button"  type="button"  id="btnBack" name="btnBack" onClick="window.location= '<%=ServerUtils.getContextName(request)%>/adminMain.do'">
                <bean:message key="jobs.home" bundle="jobs"/>
            </button>
			<button dojoType="dijit.form.Button"  type="button"  id="refresh" name="refresh" <%if(!roleRightsMapLog.getHasReadAccess()) { %>  disabled="true"  <%}%>  onClick="refreshJobs()">
                <bean:message key="jobs.refreshLogs" bundle="jobs"/>
            </button>
        </td>         
    </tr>
</table>
<script>
function submitForm(fileName){
	var flag = false;
	<%
	for (int i = 0; i < listOfFileNames.size(); i++) {
	%>
		var name = '<%=(String)listOfFileNames.get(i)%>';
		if (name == fileName ) {
			flag = true;
			window.location= '<%=ServerUtils.getContextName(request)%>/downloadLogFile.do?fileName='+fileName;
		} 
	<%
	}
	%>
	if(!flag){
	showEmptyDialog("Log file not available", "<bean:message key='jobs.schedulers.title' bundle='jobs'/>");
	}
	//var filePath= '<%=ESAPI.encoder().encodeForHTML(ServerUtils.getServerRootUrl(request))%>'+"/"+'<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>'+"/serverresources/jobLogs/";
}

function currentDate(){
	var currentDate = new Date();
  	var day = currentDate.getDate();
  	var month = currentDate.getMonth() + 1;
 	var year = currentDate.getFullYear();
	var dt=month+"/"+day+"/"+year;
	if(dt==document.getElementById('runTime').value){
 		return true;
 	}else{
 		return false;
 	}
} 

function refreshJobs(){
	if(currentDate() ==true){
    	document.getElementById('operation').value='refresh';
      	document.forms[0].submit();
	}else{
	   return;
	}
}

function searchLogs(){
	if(currentDate() != true){
 		document.getElementById('operation').value='refresh';
		document.forms[0].submit();   
	}else{
		return;
	}
}

function resetLogs(){
	if(currentDate() != true){
		dijit.byId('runTime').setValue('');
 		document.getElementById('operation').value='refresh';
    	document.forms[0].submit();  
	}else{
		return;
	}
}

</script>
</html:form>        
</body>
</html:html>