
 <%@ page import="java.util.List" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ page import="java.util.*"%>
<%@ page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>

<%@ include file="/common/dojo.jsp" %>
<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>
<%@page import="com.spacetimeinsight.magma.job.bean.TaskMonitorBean"%>
<%
  // Changes for applying Privileges -- Start
  UserBean userBean        			= (UserBean)session.getAttribute(ServerUtils.USER_BEAN_NAME);
  String moduleId      	 			=(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
  RoleRightsMap roleRightsSchConfiMap= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_CONFIG, moduleId); 
  //Get the access permissions for the given right or subright and accessType
  RoleRightsMap  roleRightsMapMan    = AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_MANAGE, moduleId);  
  
   RoleRightsMap roleRightsMap	    = AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.
  SCHEDULERS_TASK, moduleId);  
  
  RoleRightsMap roleRightsMapLog	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_LOG, moduleId);  
  //Changes for applying Privileges -- End
  
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

    function startTask(jbName){
        document.manageTaskForm.taskName.value=jbName;
		document.manageTaskForm.action="<%=ServerUtils.getContextName(request)%>/"+"manageTaskAction.do?operation=executeTask";
        document.manageTaskForm.submit();
		
    }

 
    function refreshTasks(){
        document.manageTaskForm.action="<%=ServerUtils.getContextName(request)%>/"+"manageTaskAction.do?operation=view";
        document.manageTaskForm.submit();
    }
    
    
     function hover(obj){
        obj.className='class_hover';
    }

    function unHover(obj, row_num){      
            obj.className = 'class_no_hover_job';

	}
    </script>
    
    
</head>

<body class="tundra bodybg" style="overflow-x:hidden;overflow-y:auto">
<html:form action="manageTaskAction.do"  method="POST">
<table width="100%" cellspacing="0" cellpadding="0" align="center"  border="0" >
	<tr>
		<td  class="pageTitle paddingTitle">      
		 <bean:message key="jobs.monitorTask" bundle="jobs"/>
		</td>
	</tr>
	<tr>
	   <td class="paddingTitleDesc">
		 <strong><bean:message key="jobs.manageTasks.description" bundle="jobs"/></strong>
		</td>  
	</tr>
	<tr>
		<td style="padding-top:30px;padding-left:67px;width:900px">
			<table width="900px" cellspacing="0" cellpadding="0" style="align:left;" >
				<tr>
					<td align="left">
						<div id="tabs_container" style="text-align:left;">
							<table width="922" cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td style="text-align:left;" valign="middle">
										<div id="tabs_container_crystal" style="align:left; height:25px">
                                            <ul style="padding-left:0px">
                                                <li class='panelColor tabs_border'>
                                                   <a  <%if(roleRightsSchConfiMap.getHasReadAccess()) { %> href="<%=ServerUtils.getContextName(request)%>/configureJobSchdAction.do?operation=view" style="color:#000000"<%}else {%> href="#" disabled="true" style="color:#CCCCCC"<%}%> ><b><bean:message key="jobs.configureSchedulers" bundle="jobs"/> </b></a>  
                                                </li>
                                                <li class='panelColor tabs_border'>
                                                    <a href="<%=ServerUtils.getContextName(request)%>/startStopAction.do?operation=refresh&jobName=" <%if(roleRightsMapMan.getHasReadAccess()) { %> style="color:#000000"   <%} else {%> style="color:#000000" <%}%> ><b><bean:message key="jobs.monitorSchedulers" bundle="jobs"/></b></a>
                                                </li>
												<li class='active_t tabs_border'>
                                                    <a href="#" <%if(roleRightsMap.getHasReadAccess()) { %> style="color:#000000"   <%} else {%> style="color:#CCCCCC" <%}%> ><b><bean:message key="jobs.monitorTask" bundle="jobs"/></b></a>
                                                </li>
                                                <li class='panelColor tabs_border'>
                                                     <a <%if(roleRightsMapLog.getHasReadAccess()) { %> href="<%=ServerUtils.getContextName(request)%>/jobLogsAction.do?" style="color:#000000" <%}else {%> href="#" disabled="true" style="color:#CCCCCC" <%}%> ><b><bean:message key="jobs.Logs" bundle="jobs"/></b></a>
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
			<div class="tabsContentsContainer" style="width:900px" <%if(roleRightsMap!=null && !roleRightsMap.getHasReadAccess() && !roleRightsMap.getHasCreateAccess() && !roleRightsMap.getHasUpdateAccess() && !roleRightsMap.getHasDeleteAccess()) { %> disabled="true" <%}%>>
			<table border="0" width="100%"   height="54" cellspacing="0" cellpadding="0" >
				<tr>
					<td>
						<table border="1" cellspacing="0" cellpadding="0"  width="100%" class="bgcolorReports ">
							<tr>
								<td width="25%" align="left" valign="middle" class="tab panelColor" style="padding-left:5px"><label class="label"><bean:message key="jobs.manageJobsName" bundle="jobs"/></label></td>
								<td height="27" align="center" width="5%"  valign="middle" class="tab panelColor" style="padding-left:5px"><label align="center" class="label"><bean:message key="jobs.manageJobsStatus" bundle="jobs"/></label></td>
								<td class="tab panelColor" height="27" align="center" width="25%" valign="middle" style="padding-left:5px" ><label align="center"class="label"><bean:message key="jobs.lastRuntime" bundle="jobs"/></label></td>
								<td class="tab panelColor" height="27" align="center" width="13%" valign="middle" style="padding-left:5px"><label align="center"class="label"><bean:message key="jobs.actionLabel" bundle="jobs"/></label></td>
							</tr>
					
	<!--  displaying the tasks -->
	
						<logic:empty property="allTasksList" name="manageTaskForm">
						<tr><td><bean:message key="jobs.noTaskFound" bundle="jobs"/></td></tr>
						</logic:empty>
						<logic:notEmpty property="allTasksList" name="manageTaskForm" > 
						<logic:iterate property="allTasksList" id="task" name="manageTaskForm" type="com.spacetimeinsight.magma.job.bean.TaskMonitorBean">
						<logic:notEmpty  name="task"> 
						<%! int j=0;%>
							<tr class="tableBgColor" <%if(roleRightsMap!=null && !roleRightsMap.getHasReadAccess()) { %> readonly disabled="true" <%}else {%> onMouseOver="hover(this);" onMouseOut="unHover(this, 1);" <%}%>>
								<td height="27" align="left" valign="middle"> 
								<div class="text-container"><bean:write name="task" property="taskName" />
							 	</div></td>
								<td height="27" align="center" valign="middle">
								<logic:equal name="task" property="status" value="success" >
								<img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_tick.png" width="16" height="16" id="taskStatus<%=j%>" title="<bean:message key='tasks.status.success' bundle='jobs'/>"/>
								</logic:equal>
								<logic:equal name="task" property="status" value="failure">
								<img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_error.png" width="16" height="16" id="taskStatus<%=j%>"  title="<bean:write name='task' property='failedReason'/>"/>
								</logic:equal>
								<logic:equal name="task" property="status" value="" >
								<img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_warning.png" width="16" height="16" id="taskStatus<%=j%>" title="<bean:message key='tasks.status.notStarted' bundle='jobs'/>"/>
								</logic:equal>
								<logic:equal name="task" property="status" value="Running" >
								<img src="<%=ServerUtils.getContextName(request)%>/images/indicator.gif" width="16" height="16" id="taskStatus<%=j%>" title="<bean:message key='tasks.status.running' bundle='jobs'/>"/>
								</logic:equal>
								</td>
								<td height="27" align="center" valign="middle">
								<bean:write name="task" property="lastRuntime"/>&nbsp;
								</td>
								<td height="27" align="Center" valign="middle">
									<logic:equal name="task" property="status" value="Running">
									<button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasCreateAccess()) { %> disabled="true" <%}%> disabled="true" type="button"  id="startId<%=j%>" name="startId<%=j%>"   onClick="startTask('<bean:write name="task" property="taskName" />');dijit.byId('startId<%=j%>').setAttribute('disabled',true);document.getElementById('taskStatus<%=j%>').setAttribute('src','<%=ServerUtils.getContextName(request)%>/images/indicator.gif');document.getElementById('taskStatus<%=j%>').setAttribute('title','Running');"> 
									<bean:message key="jobs.start" bundle="jobs"/>
									</button> 
									</logic:equal>
									<logic:notEqual name="task" property="status" value="Running">
									<button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasCreateAccess()) { %> disabled="true"  <%}%> type="button"  id="startId<%=j%>" name="startId<%=j%>"   onClick="startTask('<bean:write name="task" property="taskName" />');dijit.byId('startId<%=j%>').setAttribute('disabled',true);document.getElementById('taskStatus<%=j%>').setAttribute('src','<%=ServerUtils.getContextName(request)%>/images/indicator.gif'); document.getElementById('taskStatus<%=j%>').setAttribute('title','Running');">
									<bean:message key="jobs.start" bundle="jobs"/>
									</button> 
									</logic:notEqual> 
								</td>                                                
							</tr>
						<%
						 j++;
						%>
						</logic:notEmpty>
						</logic:iterate>             
					</logic:notEmpty>
	
						</table>
					</td>
				</tr>
			</table>
		</div>
	 </td>
  </tr>
</table> 
			
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
            <button dojoType="dijit.form.Button"  type="button"  id="refresh" name="refresh" <%if(!roleRightsMap.getHasReadAccess()) { %> disabled="true"  <%}%> onClick="refreshTasks()" >
                <bean:message key="jobs.refreshTasks" bundle="jobs"/>
			</button>
        </td>         
    </tr>
</table>
<input type="hidden" name="taskName" id="taskName" value="" />
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
</html:form>        
</body>
</html:html>