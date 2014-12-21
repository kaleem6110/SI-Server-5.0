 <%@ page import="com.enterprisehorizons.magma.config.dbadmin.ModelConfigConstants" %>
 <%@ page import="java.util.List" %>
<%@ page import="com.spacetimeinsight.magma.job.bean.JobMonitorBean" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ page import="java.util.*, com.spacetimeinsight.magma.job.JobConstants, com.enterprisehorizons.magma.job.bd.JobScheduleDelegator,com.spacetimeinsight.magma.job.bean.StiJobBean"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>

<%@ include file="/common/dojo.jsp" %>
<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>
<%@page import="com.spacetimeinsight.data.initializers.LoggerHelper"%>
<%@page import="org.apache.log4j.Logger"%>
<%@page import="com.enterprisehorizons.magma.jobs.forms.StartStopJobForm"%>
<%
  // Changes for applying Privileges -- Start
  UserBean userBean          = (UserBean)session.getAttribute(ServerUtils.USER_BEAN_NAME);
   String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
   RoleRightsMap roleRightsSchConfiMap	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_CONFIG, moduleId); 
  //Get the access permissions for the given right or subright and accessType
  RoleRightsMap roleRightsMap	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_MANAGE, moduleId);  
  
  RoleRightsMap roleRightsMapSchtask	    = AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.
  SCHEDULERS_TASK, moduleId); 
  
  RoleRightsMap roleRightsMapLog	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_LOG, moduleId);  
  
  
  
  //Changes for applying Privileges -- End
 StartStopJobForm startStopJobForm = (StartStopJobForm)request.getAttribute("startStopJobForm");
	String[] logLevelForrunningJobs = startStopJobForm.getLogLevelForrunningJobs();
	String[] logLevelForDisableJobs = startStopJobForm.getLogLevelForDisableJobs();
	String[] logLevelForMisfireJobs = startStopJobForm.getLogLevelForMisfireJobs();    
	String[] logLevelForUnderProcessJobs = startStopJobForm.getLogLevelForUnderProcessJobs();
	String[] logLevelForstoppedJobs = startStopJobForm.getLogLevelForstoppedJobs();
	int counter= 0;
  
%>
<%
    int jobsCount = 0;
%>

<html:html locale="true">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title><bean:message key="jobs.label.title.monitorschedulers" bundle="jobs"/></title>


<style type="text/css">

div.clear {
    clear: both;
} 
.text-container{
 font-size:12px;	
 word-wrap: break-word;
 padding-left:5px; 
 padding-right:5px;
}

</style>
<script type="text/javascript">

    function startJob(jbName){
		refreshJobs();
        document.getElementById('operation').value='processJobStart';
        document.startStopJobForm.jobName.value=jbName;
		document.forms[0].action = "startStopAction.do";
        document.forms[0].submit();
        
    }


    function stopJob(jbName){
		refreshJobs();
        document.getElementById('operation').value='processJobStop';
        document.startStopJobForm.jobName.value=jbName;
		document.forms[0].action = "startStopAction.do";
		document.forms[0].submit();
        
    }

    function disableJob(jbName){
		refreshJobs();
        document.getElementById('operation').value='processDisableJob';
        document.startStopJobForm.jobName.value=jbName;
		document.forms[0].action = "startStopAction.do";
        document.forms[0].submit();
    }

    function enableJob(jbName){
		refreshJobs();
        document.getElementById('operation').value='processEnableJob';
        document.startStopJobForm.jobName.value=jbName;
		document.forms[0].action = "startStopAction.do";
        document.forms[0].submit();
    }

    
    function refreshJobs(){
        document.getElementById('operation').value='refresh';
        document.startStopJobForm.submit();
    }
    
    function back(){
        document.getElementById('operation').value='back';
        document.startStopJobForm.submit();
    }
    
     function hover(obj){
        obj.className='class_hover';
    }

    function unHover(obj, row_num){      
            obj.className = 'class_no_hover_job';

    }


 function submitToHome() 
 {
        document.forms[0].action = "<%=ServerUtils.getContextName(request)%>/";
        document.forms[0].submit();
 }
 function changedropDownLevel(jbName,obj){ 
     document.getElementById('logLevelChange').value = document.getElementById(obj.id).value;
	 document.startStopJobForm.jobName.value=jbName;
     document.forms[0].submit(); 
 } 


    </script>
    
    
</head>

<body class="tundra bodybg" style="overflow-x:hidden;overflow-y:auto">
<html:form action="startStopAction.do"  method="POST">
<input type="hidden" name="csrf" value="${csrf}" >

<table width="100%" cellspacing="0" cellpadding="0" align="center"  border="0" >
	<tr>
		<td  class="pageTitle paddingTitle">      
		 <bean:message key="jobs.manageJobs" bundle="jobs"/>
		</td>
	</tr>
	<tr>
	   <td class="paddingTitleDesc">
		 <strong><bean:message key="jobs.manageJobs.description" bundle="jobs"/></strong>
		</td>  
	</tr>
	<tr>
		<td style="padding-left:280px; width:500px;">
		  <b> <label class="success">
			
			</label> </b>
		</td>  
	</tr>
	<tr>
		<td style="padding-left:67px; width:900px;">
			<b> <label class="error">
					<%if(request.getAttribute(JobConstants.EXP_TRIGGER_STI_JOB_NOW)!= null){
					out.println(request.getAttribute(JobConstants.EXP_TRIGGER_STI_JOB_NOW));
					}%>					
				</label> </b>
		</td>  
	</tr>
	<tr>
		<td style="padding-top:30px;padding-left:67px;width:900px">
			<table width="100%" cellspacing="0" cellpadding="0" style="align:left;" >
				<tr>
					<td align="left">
						<div id="tabs_container" style="text-align:left;">
							<table width="100%" cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td style="text-align:left;" valign="middle">
										<div id="tabs_container_crystal" style="align:left; height:25px">
                                            <ul style="padding-left:0px">
                                                <li class='panelColor tabs_border'>
                                                   <a  <%if(roleRightsSchConfiMap.getHasReadAccess()) { %> href="<%=ServerUtils.getContextName(request)%>/configureJobSchdAction.do?operation=view" style="color:#000000"<%}else {%> href="#" disabled="true" style="color:#CCCCCC"<%}%> ><b><bean:message key="jobs.configureSchedulers" bundle="jobs"/> </b></a>  
                                                </li>
                                                <li class='active_t tabs_border'>
                                                    <a href="#" <%if(roleRightsMap.getHasReadAccess()) { %> style="color:#000000" onClick="refreshJobs()"  <%} else {%> style="color:#000000" <%}%> ><b><b><bean:message key="jobs.monitorSchedulers" bundle="jobs"/></b></b></a>
                                                </li>
												<li class='panelColor tabs_border''>
                                                    <a <%if(roleRightsMapSchtask.getHasReadAccess()){%>href="<%=ServerUtils.getContextName(request)%>/manageTaskAction.do?operation=view"  style="color:#000000" <%} else {%> style="color:#CCCCCC" href="#" disable="true" <%}%> ><b><bean:message key="jobs.monitorTask" bundle="jobs"/></b></a>
                                                </li>
                                                <li class='panelColor tabs_border'>
                                                     <a <%if(roleRightsMapLog.getHasReadAccess()) { %> href="<%=ServerUtils.getContextName(request)%>/jobLogsAction.do?" style="color:#000000" <%}else {%> href="#" disabled="true" style="color:#CCCCCC" <%}%> ><b>Logs</b></a>
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
			<div class="tabsContentsContainer" style="width=900px" <%if(roleRightsMap!=null && !roleRightsMap.getHasReadAccess() && !roleRightsMap.getHasCreateAccess() && !roleRightsMap.getHasUpdateAccess() && !roleRightsMap.getHasDeleteAccess()) { %> disabled="true" <%}%>>
			<table border="0" width="100%"   height="54" cellspacing="0" cellpadding="0" >
				<tr>
					<td>
						<table border="1" align="centre" style="margin-top:7;" cellspacing="0" cellpadding="0"  width="100%" class="bgcolorReports ">
							<tr>
								<td width="24%" align="left" valign="middle" class="tab panelColor" style="padding-left:0px"><label style= "padding-left:5px"class="label"><bean:message key="jobs.manageJobsName" bundle="jobs"/></label></td>
								<td height="27" align="left" width="6%"  valign="middle" class="tab panelColor" style="padding-left:0px"><label align="center" style="padding-left:5px" class="label"><bean:message key="jobs.manageJobsStatus" bundle="jobs"/></label></td> 
								<td class="tab panelColor" height="27" align="left" width="20%" valign="middle" style="padding-left:0px" ><label align="center" style="padding-left:45px" class="label"><bean:message key="jobs.lastRuntime" bundle="jobs"/></label></td>
								<td class="tab panelColor" height="27" align="left" width="20%" valign="middle" style="padding-left:0px"><label align="center" style="padding-left:45px"class="label"><bean:message key="jobs.nextRuntime" bundle="jobs"/></label></td>
								<td class="tab panelColor" height="27" align="left" width="18%" valign="middle" style="padding-left:0px"><label align="center" style="padding-left:50px" class="label"><bean:message key="jobs.actionLabel" bundle="jobs"/></label></td>
								<td class="tab panelColor" height="27" align="left" width="12%"	valign="middle" style="padding-left:0px"><label align="center" style="padding-left:30px"class="label"><bean:message key="jobs.logLevel" bundle="jobs"/></label></td>
							</tr>
	<!--  displaying the inprocess jobs.. -->
					<logic:present scope="request" name="inProcessJobs">
							<tr class="bgcolor">
								<td height="27" colspan="6" align="left" width="100%" colspan="1"><br></td>
							</tr>
							<tr>
							<% counter=0; %>  
								<td height="27" colspan="6" align="left" style="width: 140px; padding-left:0px;padding-right:0px;" colspan="1" class="panelColor" nowrap="nowrap" ><label class="label">  <b><bean:message key="jobs.jobsInProcess" bundle="jobs"/></b> </label></td>
							</tr>
			
						<%! int p=0; %>  
						<%try{%>
						<logic:iterate property="inProcessJobs" id="jobs" name="startStopJobForm" type="JobMonitorBean">
							<tr class="tableBgColor" <%if(roleRightsMap!=null && !roleRightsMap.getHasReadAccess()) { %> readonly disabled="true" <%}else {%> onMouseOver="hover(this);" onMouseOut="unHover(this, 1);" <%}%>>
								<td height="27" align="left" valign="middle" ><div class="text-container">
									<bean:write name="jobs" property="jobName"/></div></td>
								<td height="27" align="center" valign="middle"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_tick.png" width="16" height="16"/></td>
								<td height="27" align="center" valign="middle">
									<div class="text-container" valign="middle"><bean:write name="jobs" property="currentExecutionTime" /></div>
								</td>
								<td height="27" align="center" valign="middle">
									<div class="text-container"><bean:write name="jobs" property="nextExecutionTime" /></div>
								</td>      
								<td height="27" align="left">&nbsp; 
								</td>  
									<% 
										String jobLevel= "OFF";
										jobLevel = startStopJobForm.LogLevelForJobs(logLevelForUnderProcessJobs,jobLevel,counter++);
																				 
									%>
									<td height="27" align="center" valign="middle">
										<select id="dropdownLevel<%=p%>" <%if(!roleRightsMap.getHasUpdateAccess()){%>disabled="true"<%}%> name="logLevelForUnderProcessJobs" onchange="changedropDownLevel('<bean:write name="jobs" property="jobName"/>',this)">	
										<option <%if(jobLevel.equals("ALL") ) { %> selected <%}%>value="ALL">All</option>
										<option <%if(jobLevel.equals("TRACE")) { %> selected <%}%>value="TRACE">Trace</option>
										<option <%if(jobLevel.equals("DEBUG")) { %> selected <%}%>value="DEBUG">Debug</option>
										<option <%if(jobLevel.equals("INFO")) { %> selected <%}%>value="INFO">Information</option>
										<option <%if(jobLevel.equals("PERF")) { %> selected <%}%>value="PERF">Performance</option>
										<option <%if(jobLevel.equals("WARN")) { %> selected <%}%>value="WARN">Warning</option>
										<option <%if(jobLevel.equals("ERROR")) { %> selected <%}%>value="ERROR">Error</option>
										<option <%if(jobLevel.equals("FATAL")) { %> selected <%}%>value="FATAL">Fatal</option>
										<option <%if(jobLevel.equals("OFF")) { %> selected <%}%>value="OFF">Off</option>
										</select>
									</td>							</tr>
						<%
							jobsCount = 1; p++;
						%>
						</logic:iterate>     
						<%}catch(Exception ex){%>
							<tr class="tableBgColor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);">
								<td height="27" align="left"  colspan="7" style="padding-left:5px;padding-right:5px;" valign="middle">
									<label class="body"> <bean:message key="jobs.err.unexpectederrmsg" bundle="jobs"/>
									</label>
								</td>
							</tr>
						<%}%>
					</logic:present>
					 
	<!--  displaying the running jobs.. -->       
					<logic:present scope="request" name="runningJobs">
							<tr class="bgcolor">
								<td height="27" colspan="6" align="left" style="width: 100px" colspan="1"><br></td>
							</tr>
							<tr>
							<%counter =0; %>
								<td height="27" colspan="6" align="left" style="width: 100px ;padding-left:5px;padding-right:5px; padding-top:4px" colspan="1" class="panelColor"  ><label class="label">  <b> <bean:message key="jobs.jobsRunning" bundle="jobs"/></b> </label></td>
							</tr>
						<%! int i=0; %>
						<logic:iterate property="runningJobs" id="jobs" name="startStopJobForm" type="JobMonitorBean">
							<tr class="tableBgColor" <%if(roleRightsMap!=null && !roleRightsMap.getHasReadAccess()) { %> readonly disabled="true" <%}else {%> onMouseOver="hover(this);" onMouseOut="unHover(this, 1);" <%}%>>
								<td  align="left"  valign="middle"><div  class="text-container"><bean:write name="jobs" property="jobName"/></div></td>
								<td  align="center" valign="middle"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_tick.png" width="16" height="16"/></td>
								<td  align="center" valign="middle">
									<div class="text-container" > <bean:write name="jobs" property="currentExecutionTime" /></div>
								</td>
								<td  align="center" valign="middle">
									<div class="text-container" valign="middle"><bean:write name="jobs" property="nextExecutionTime" /></div>
								</td>      
								<td height="27" align="center">
									<button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasUpdateAccess()) { %> disabled="true" <%}%>  type="button"  id="idStop<%=i%>" name="idStop<%=i%>"  onClick="stopJob('<bean:write name="jobs" property="jobName"/>'); dijit.byId('idStop<%=i%>').setAttribute('disabled',true);">
									<bean:message key="jobs.status.label.stop" bundle="jobs"/>
									</button>
									<button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasDeleteAccess()) { %> disabled="true" <%}%> type="button"  id="idStart<%=i%>" name="idStart<%=i%>" onClick="disableJob('<bean:write name="jobs" property="jobName"/>'); dijit.byId('idStart<%=i%>').setAttribute('disabled',true);">
									<bean:message key="jobs.status.label.disable" bundle="jobs"/>
									</button>   
								</td> 
								
									<% 
										 String jobLevel= "OFF";
										jobLevel = startStopJobForm.LogLevelForJobs(logLevelForrunningJobs,jobLevel,counter++);
									%>
									<td height="27" align="center" valign="middle">
										<select id="dropdownLevel<%=i%>" <%if(!roleRightsMap.getHasUpdateAccess()){%>disabled="true"<%}%>name="logLevelForrunningJobs" onchange="changedropDownLevel('<bean:write name="jobs" property="jobName"/>',this)">	
										<option <%if(jobLevel.equals("ALL") ) { %> selected <%}%>value="ALL">All</option>
										<option <%if(jobLevel.equals("TRACE")) { %> selected <%}%>value="TRACE">Trace</option>
										<option <%if(jobLevel.equals("DEBUG")) { %> selected <%}%>value="DEBUG">Debug</option>
										<option <%if(jobLevel.equals("INFO")) { %> selected <%}%>value="INFO">Information</option>
										<option <%if(jobLevel.equals("PERF")) { %> selected <%}%>value="PERF">Performance</option>
										<option <%if(jobLevel.equals("WARN")) { %> selected <%}%>value="WARN">Warning</option>
										<option <%if(jobLevel.equals("ERROR")) { %> selected <%}%>value="ERROR">Error</option>
										<option <%if(jobLevel.equals("FATAL")) { %> selected <%}%>value="FATAL">Fatal</option>
										<option <%if(jobLevel.equals("OFF")) { %> selected <%}%>value="OFF">Off</option>
										</select>
									</td>
								</tr>
								<%
									jobsCount = 1;
									i++;
								%>
						</logic:iterate>               
					</logic:present>

	<!--  displaying the misfired jobs.. -->
					<logic:present scope="request" name="misFiredJobs">
							<tr class="bgcolor">
								<td height="27" colspan="6" align="left" style="width: 100px" colspan="1"><br></td>
							</tr>
							<tr>
							<% counter = 0;%>
								<td height="27" colspan="6" align="left" style="width: 100px;padding-left:5px;padding-right:5px;padding-top:4px" colspan="1" class="panelColor" ><label class="label"> <b> <bean:message key="jobs.jobsMisfired" bundle="jobs"/></b></label></td>
							</tr>    
						<%! int k=0;%>
						<logic:iterate property="misFiredJobs" id="jobs" name="startStopJobForm" type="JobMonitorBean">
							<tr class="tableBgColor" <%if(roleRightsMap!=null && !roleRightsMap.getHasReadAccess()) { %> readonly disabled="true" <%}else {%> onMouseOver="hover(this);" onMouseOut="unHover(this, 1);" <%}%>>
								<td height="27" align="left"  valign="middle"><div class="text-container">
									<bean:write name="jobs" property="jobName"/></div></td>
								<td height="27" align="center" valign="middle"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_error.png" width="16" height="16"/></td>
								<td height="27" align="left" valign="middle">
									<div class="text-container"><bean:write name="jobs" property="currentExecutionTime" /></div>
								</td>
								<td height="27" align="center" valign="middle"><div class="text-container">
									
									<div dojoType="dijit.form.DropDownButton">
										<span><label class="body"> <bean:message key="jobs.status.label.jobmisfired" bundle="jobs"/></label></span>
									<div dojoType="dijit.TooltipDialog" id="tooltipDlg<%=k%>" >
										<table width="50%" border="0">
											<tr>
												<td align="center" ><label  align="center" style="padding-left:5px" class="body"> <bean:write name="jobs" property="failedReason" /></div></td>
											</tr>
										</table>
									</div>
									</div>
								</td>
								<td height="27" align="center">
									<button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasUpdateAccess()) { %> disabled="true" <%}%> type="button"  id="missstoptId<%=k%>" name="missstopId<%=k%>" onClick="stopJob('<bean:write name="jobs" property="jobName"/>'); dijit.byId('missstoptId<%=k%>').setAttribute('disabled',true);">
									<bean:message key="jobs.status.label.stop" bundle="jobs"/>
									</button>
									<button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasDeleteAccess()) { %> disabled="true" <%}%> type="button"  id="idMissStart<%=k%>" name="idMissStart<%=k%>" onClick="disableJob('<bean:write name="jobs" property="jobName"/>'); dijit.byId('idMissStart<%=k%>').setAttribute('disabled',true);">
									<bean:message key="jobs.status.label.disable" bundle="jobs"/>
									</button>   
								</td> 
									<% 
										String jobLevel= "OFF";
										jobLevel = startStopJobForm.LogLevelForJobs(logLevelForMisfireJobs,jobLevel,counter++);
										 
									%>
								 
									<td height="27" align="center" valign="middle">
										<select id="dropdownLevel<%=k%>" <%if(!roleRightsMap.getHasUpdateAccess()){%>disabled="true"<%}%> name="logLevelForMisfireJobs" onchange="changedropDownLevel('<bean:write name="jobs" property="jobName"/>',this)">	
										<option <%if(jobLevel.equals("ALL") ) { %> selected <%}%>value="ALL">All</option>
										<option <%if(jobLevel.equals("TRACE")) { %> selected <%}%>value="TRACE">Trace</option>
										<option <%if(jobLevel.equals("DEBUG")) { %> selected <%}%>value="DEBUG">Debug</option>
										<option <%if(jobLevel.equals("INFO")) { %> selected <%}%>value="INFO">Information</option>
										<option <%if(jobLevel.equals("PERF")) { %> selected <%}%>value="PERF">Performance</option>
										<option <%if(jobLevel.equals("WARN")) { %> selected <%}%>value="WARN">Warning</option>
										<option <%if(jobLevel.equals("ERROR")) { %> selected <%}%>value="ERROR">Error</option>
										<option <%if(jobLevel.equals("FATAL")) { %> selected <%}%>value="FATAL">Fatal</option>
										<option <%if(jobLevel.equals("OFF")) { %> selected <%}%>value="OFF">Off</option>
										</select>
									</td>
								
							</tr>
						<%
							jobsCount = 1; k++;
						%>
						</logic:iterate>             
					</logic:present>     
			  
	<!--  displaying the stopped jobs.. -->       
					<logic:present scope="request" name="stoppedJobs">
							<tr class="bgcolor">
								<td height="27" colspan='6' align="left" width= "100%" colspan="1"><br></td>
							</tr>
							<tr>
								<td height="27" colspan="6" class="panelColor" style="padding-left:5px;padding-right:0px;"><label class="label">  <b><bean:message key="jobs.jobsStopped" bundle="jobs"/></b> </label>
								</td>
							</tr>
						<%! int j=0;%>
						<% counter = 0; %>
						<logic:iterate property="stoppedJobs" id="jobs" name="startStopJobForm" type="JobMonitorBean">
							<tr class="tableBgColor" <%if(roleRightsMap!=null && !roleRightsMap.getHasReadAccess()) { %> readonly disabled="true" <%}else {%> onMouseOver="hover(this);" onMouseOut="unHover(this, 1);" <%}%>>
								<td height="27" align="left" valign="middle"> 
								<div class="text-container"><bean:write name="jobs" property="jobName"/>
							 	</div></td>
								<td height="27" align="center" valign="middle"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_warning.png" width="16" height="16"/></td>
								<td height="27" align="center" valign="middle">
									<div class="text-container"><bean:write name="jobs" property="prevExecutionTime" /></div>
								</td>
								<td height="27" align="center" valign="middle">
									<div class="text-container">
									<label class="body"> 
									<logic:present name="jobs" property="nextExecutionTime">
									<bean:write name="jobs" property="nextExecutionTime" />
									</logic:present>
									
									<logic:notPresent name="jobs" property="nextExecutionTime">
									<bean:message key="jobs.notScheduled" bundle="jobs"/>
									</logic:notPresent> 
									</label></div>
								</td>
								<td height="27" align="Center">
									<button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasCreateAccess()) { %> disabled="true" <%}%> type="button"  id="startId<%=j%>" name="startId<%=j%>"   onClick="startJob('<bean:write name="jobs" property="jobName"/>'); dijit.byId('startId<%=j%>').setAttribute('disabled',true);">
									<bean:message key="jobs.resume" bundle="jobs"/>
									</button>       
									<button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasDeleteAccess()) { %> disabled="true" <%}%>  type="button"  id="idstopStart<%=j%>" name="idstopStart<%=j%>" onClick="disableJob('<bean:write name="jobs" property="jobName"/>'); dijit.byId('idstopStart<%=j%>').setAttribute('disabled',true);">
									<bean:message key="jobs.disable" bundle="jobs"/>
									</button>   
								</td>  
									<% 
										String jobLevel= "OFF";
										jobLevel = startStopJobForm.LogLevelForJobs(logLevelForstoppedJobs,jobLevel,counter++);
										 
									%>
									 
									<td height="27" align="center" valign="middle">
										<select id="dropdownLevel<%=j%>" <%if(!roleRightsMap.getHasUpdateAccess()){%>disabled="true"<%}%> name="logLevelForstoppedJobs" onchange="changedropDownLevel('<bean:write name="jobs" property="jobName"/>',this)">	
										<option <%if(jobLevel.equals("ALL") ) { %> selected <%}%>value="ALL">All</option>
										<option <%if(jobLevel.equals("TRACE")) { %> selected <%}%>value="TRACE">Trace</option>
										<option <%if(jobLevel.equals("DEBUG")) { %> selected <%}%>value="DEBUG">Debug</option>
										<option <%if(jobLevel.equals("INFO")) { %> selected <%}%>value="INFO">Information</option>
										<option <%if(jobLevel.equals("PERF")) { %> selected <%}%>value="PERF">Performance</option>
										<option <%if(jobLevel.equals("WARN")) { %> selected <%}%>value="WARN">Warning</option>
										<option <%if(jobLevel.equals("ERROR")) { %> selected <%}%>value="ERROR">Error</option>
										<option <%if(jobLevel.equals("FATAL")) { %> selected <%}%>value="FATAL">Fatal</option>
										<option <%if(jobLevel.equals("OFF")) { %> selected <%}%>value="OFF">Off</option> 
										</select>
									</td>
							</tr>
						<%
							jobsCount = 1; j++;
						%>
						</logic:iterate>             
					</logic:present>
			  
	<!--  displaying the disabled jobs.. -->
					<logic:present scope="request" name="disabledJobs">
						<%! int l=0;%>
							<tr class="bgcolor">
								<td height="27" colspan='6' align="left"  colspan="1"><br></td>
							</tr>
							<tr>
								<td height="27" colspan='6' align="left"  colspan="1" class="panelColor" style="padding-left:5px;padding-right:5px; padding-top:4px" >
									<label class="label">  <b><bean:message key="jobs.jobsDisabled" bundle="jobs"/> </b></label>
								</td>
							</tr>
							
							<% counter=0;%>
						<logic:iterate property="disabledJobs" id="jobs" name="startStopJobForm" type="JobMonitorBean">
							<tr class="tableBgColor" <%if(roleRightsMap!=null && !roleRightsMap.getHasReadAccess()) { %> readonly disabled="true" <%}else {%> onMouseOver="hover(this);" onMouseOut="unHover(this, 1);" <%}%>>
								<td height="27" align="left"  valign="middle"><div class="text-container">
									<bean:write name="jobs" property="jobName"/></div></td>
								<td height="27" align="center" valign="middle"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/delete_disable.png" width="16" height="16"/></td>
								<td height="27" align="center" valign="middle">
									<div class="text-container"> <bean:write name="jobs" property="currentExecutionTime" /></div>
								</td>
								<td height="27" align="center" valign="middle">
									<div class="text-container"> <bean:write name="jobs" property="nextExecutionTime" /></div> 
								</td>
								<td height="27" align="center" >
									<button dojoType="dijit.form.Button" <%if(!roleRightsMap.getHasCreateAccess()) { %> disabled="true" <%}%> type="button"  id="idDisabledStart<%=l%>" name="idDisabledStart<%=l%>" onClick="enableJob('<bean:write name="jobs" property="jobName"/>'); dijit.byId('idDisabledStart<%=l%>').setAttribute('disabled',true);">
									<bean:message key="jobs.enable" bundle="jobs"/>
									</button>   
								</td> 
									<% 
										String jobLevel= "OFF";
										jobLevel = startStopJobForm.LogLevelForJobs(logLevelForDisableJobs,jobLevel,counter++);
										 
									%>
									<td height="27" align="center" valign="middle">
										<select id="dropdownLevel<%=l%>" <%if(!roleRightsMap.getHasUpdateAccess()){%>disabled="true"<%}%> name="logLevelForDisableJobs" onchange="changedropDownLevel('<bean:write name="jobs" property="jobName"/>',this)">	
										<option <%if(jobLevel.equals("ALL") ) { %> selected <%}%>value="ALL">All</option>
										<option <%if(jobLevel.equals("TRACE")) { %> selected <%}%>value="TRACE">Trace</option>
										<option <%if(jobLevel.equals("DEBUG")) { %> selected <%}%>value="DEBUG">Debug</option>
										<option <%if(jobLevel.equals("INFO")) { %> selected <%}%>value="INFO">Information</option>
										<option <%if(jobLevel.equals("PERF")) { %> selected <%}%>value="PERF">Performance</option>
										<option <%if(jobLevel.equals("WARN")) { %> selected <%}%>value="WARN">Warning</option>
										<option <%if(jobLevel.equals("ERROR")) { %> selected <%}%>value="ERROR">Error</option>
										<option <%if(jobLevel.equals("FATAL")) { %> selected <%}%>value="FATAL">Fatal</option>
										<option <%if(jobLevel.equals("OFF")) { %> selected <%}%>value="OFF">Off</option> 
										</select>
									</td>	
							</tr>
						<%
							jobsCount = 1; l++;
						%>
						</logic:iterate>             
					</logic:present>
                        </table>
                    </td>
                </tr>
            </table>
            <table  width="900">
                <tr>
					<td colspan='6' align='center'>
						<%
						if(jobsCount==0){
						%>
							<bean:message key="jobs.noJobsFound" bundle="jobs"/>
						<%
						}
						%>
					</td>
				</tr>
			</table> 
            </div>
        </td>
	</tr>
</table>
    <input type="hidden" name="operation" id="operation" value="onLoad" />
    <input type="hidden" name="jobName" id="jobName" value="" />
	 <input type="hidden" name="logLevelChange" id="logLevelChange" value="" />
  
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
            <button dojoType="dijit.form.Button"  type="button"  id="refresh" name="refresh" <%if(!roleRightsMap.getHasReadAccess()) { %> disabled="true"  <%}%> onClick="refreshJobs()" >
                <bean:message key="jobs.refreshJobs" bundle="jobs"/>
			</button>
        </td>         
    </tr>
</table>
</html:form>        
</body>
</html:html>