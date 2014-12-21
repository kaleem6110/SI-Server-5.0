 <%@ page import="com.enterprisehorizons.magma.config.dbadmin.ModelConfigConstants" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ page import="java.util.*, com.spacetimeinsight.magma.job.JobConstants, com.enterprisehorizons.magma.job.bd.JobScheduleDelegator,com.spacetimeinsight.magma.job.bean.StiJobBean"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>

<%@ include file="/common/dojo.jsp" %>
<%@ page import="java.util.*, com.spacetimeinsight.magma.job.JobConstants" %>
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
  //Get the access permissions for the given right or subright and accessType
  RoleRightsMap roleRightsMap	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_CONFIG, moduleId); 
  RoleRightsMap roleRightsMapMan	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_MANAGE, moduleId); 
  
  RoleRightsMap roleRightsMapSchtask	    = AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.
  SCHEDULERS_TASK, moduleId);
  
  RoleRightsMap roleRightsMapLog	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.SCHEDULERS_LOG, moduleId);  
  //Changes for applying Privileges -- End
  
%>
<html:html locale="true">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>STI Admin Jobs Configuration</title>

    <script>

// JOB Constants
var JOB_TYPE_ECOSYSTEM = "<%= JobConstants.JOB_TYPE_ECOSYSTEM %>";
var JOB_TYPE_FILECLEANUP = "<%= JobConstants.JOB_TYPE_FILECLEANUP %>";
var JOB_TYPE_PIDATAEXTRACTOR = "<%= JobConstants.JOB_TYPE_PIDATAEXTRACTOR %>";
var JOB_TYPE_URLEXTRACTOR = "<%= JobConstants.JOB_TYPE_URLEXTRACTOR %>";
var JOB_TYPE_CUSTOM = "<%= JobConstants.JOB_TYPE_CUSTOM %>";
var JOB_TYPE_CLEAR_CACHE = "<%= JobConstants.JOB_TYPE_CLEAR_CACHE %>";

function getSelectName(val)
{
    dijit.byId('selEcoSystem1').setValue('-1');
    dijit.byId('selPIDataExtractor').setValue('-1');
    dijit.byId('selUrlExtractor').setValue('-1');
    dijit.byId('selFileCleanUpTimer').setValue('-1');
    dijit.byId('selCustomTimer').setValue('-1');
    dijit.byId('selClearCache').setValue('-1');

     if(dijit.byId(val).value == -2)
    dijit.byId(val).setValue(-2)
         else
    dijit.byId(val).setValue(-1)
    dijit.byId('selEcoSystem1').setAttribute('disabled', true);
    dijit.byId('selPIDataExtractor').setAttribute('disabled', true);
    dijit.byId('selUrlExtractor').setAttribute('disabled', true);
    dijit.byId('selFileCleanUpTimer').setAttribute('disabled', true);
    dijit.byId('selCustomTimer').setAttribute('disabled', true);
    dijit.byId('selClearCache').setAttribute('disabled', true);
    dijit.byId(val).setAttribute('disabled', false);

    <%if(roleRightsMap.getHasCreateAccess()) { %>
        dijit.byId('idCreate').setAttribute('disabled', false);
    <%}%>
    
    <%if(roleRightsMap.getHasUpdateAccess()) { %>
        dijit.byId('idEdit').setAttribute('disabled', false);
    <%}%>
    
    <%if(roleRightsMap.getHasDeleteAccess()) { %>
         dijit.byId('idDelete').setAttribute('disabled', false);
     <%}%>
         
     <%if(roleRightsMap.getHasReadAccess()) { %>
         dijit.byId('idView').setAttribute('disabled', false);
    <%}%>
 
}
function submitForm(btn) {
    var noJobSelected=true;
    if( btn.value.toLowerCase() == dijit.byId('idCreate').value.toLowerCase() ){
        for(var i=0;i<document.forms[0].jobsType.length;i++){
            if(document.forms[0].jobsType[i].checked==true){
                noJobSelected=false;
            }
        }
        if(noJobSelected){
        showEmptyDialog("<bean:message key='jobs.select.type' bundle='jobs'/>", "<bean:message key='jobs.schedulers.title' bundle='jobs'/>");
            return;
        }
    }
document.forms[0].operation.value = btn.value.toLowerCase();
var statusIn = true;
var noData = false;
var selectData = false;
	if( ( btn.value.toLowerCase() == dijit.byId('idView').value.toLowerCase() ) || ( btn.value.toLowerCase() == dijit.byId('idEdit').value.toLowerCase() ) || ( btn.value.toLowerCase() == dijit.byId('idDelete').value.toLowerCase() ) )   
    {
		var tmp = document.getElementsByName('jobsType');
        for(var count=0;count <tmp.length;count++)      
        {
        	if(tmp[count].checked)
           	{
                statusIn = false;
                if(tmp[count].value == JOB_TYPE_ECOSYSTEM){
                    if(dijit.byId('selEcoSystem1').attr('value') < -1)
                    {
                              noData = true;
                                break;
                    }
					else if(dijit.byId('selEcoSystem1').attr('value') == -1)
                    {
								selectData = true;
                                break;
                    }
					
					
                } else if(tmp[count].value == JOB_TYPE_PIDATAEXTRACTOR){
                    if(dijit.byId('selPIDataExtractor').attr('value') < -1)
                    {
                        
                            noData = true;
							break;
                    }
					else if(dijit.byId('selPIDataExtractor').attr('value') == -1)
                    {
								selectData = true;
                                break;
                    }
                }else if(tmp[count].value == JOB_TYPE_URLEXTRACTOR){
                    if(dijit.byId('selUrlExtractor').attr('value') < -1)
                    {
                            noData = true;  
                             break;
                    }
					else if(dijit.byId('selUrlExtractor').attr('value') == -1)
                    {
								selectData = true;
                                break;
                    }
                }else   if(tmp[count].value == JOB_TYPE_FILECLEANUP){
                    if(dijit.byId('selFileCleanUpTimer').attr('value') < -1)
                    {
                              noData = true;
								break;
                    } 
					else if(dijit.byId('selFileCleanUpTimer').attr('value') == -1)
                    {
							selectData = true;
							break;
                    } 
                }else   if(tmp[count].value == JOB_TYPE_CUSTOM){
                    if(dijit.byId('selCustomTimer').attr('value') < -1)
                    {
                              noData = true;
								break;
                    }
					else if(dijit.byId('selCustomTimer').attr('value') == -1)
                    {
								selectData = true;
							break;
                    }
                }else   if(tmp[count].value == JOB_TYPE_CLEAR_CACHE){
                    if(dijit.byId('selClearCache').attr('value') < -1)
                    {
                              noData = true;
                        break;
                    } 
					else if(dijit.byId('selClearCache').attr('value') == -1)
                    {
							  selectData = true;
                        break;
                    }
                }
            }
        }
	}
	else {
			noData = false;
			selectData = false;
			statusIn = false;
			}

	
	  if(statusIn)    
	    {
	        showEmptyDialog("<bean:message key='jobs.select.type' bundle='jobs'/>", "<bean:message key='jobs.schedulers.title' bundle='jobs'/>");
			return;
	    } 
		else if(noData){
			if(btn.value.toLowerCase() == dijit.byId('idView').value.toLowerCase()){
				showEmptyDialog("<bean:message key='jobs.check.no.data.view' bundle='jobs'/>", "<bean:message key='jobs.schedulers.title' bundle='jobs'/>");
				return;
			}
			else if(btn.value.toLowerCase() == dijit.byId('idEdit').value.toLowerCase()){
				showEmptyDialog("<bean:message key='jobs.check.no.data.update' bundle='jobs'/>", "<bean:message key='jobs.schedulers.title' bundle='jobs'/>");
				return;
			}
			else if(btn.value.toLowerCase() == dijit.byId('idDelete').value.toLowerCase()){
				showEmptyDialog("<bean:message key='jobs.check.no.data.delete' bundle='jobs'/>", "<bean:message key='jobs.schedulers.title' bundle='jobs'/>");
				return;
			}
	    }
		else if(selectData){
				if(btn.value.toLowerCase() == dijit.byId('idView').value.toLowerCase()){
					showEmptyDialog("<bean:message key='jobs.check.data.select' bundle='jobs'/>", "<bean:message key='jobs.schedulers.title' bundle='jobs'/>");
					return;
				}
				else if(btn.value.toLowerCase() == dijit.byId('idEdit').value.toLowerCase()){
					showEmptyDialog("<bean:message key='jobs.check.data.select' bundle='jobs'/>", "<bean:message key='jobs.schedulers.title' bundle='jobs'/>");
				return;
				}
				else if(btn.value.toLowerCase() == dijit.byId('idDelete').value.toLowerCase()){
					showEmptyDialog("<bean:message key='jobs.check.data.select' bundle='jobs'/>", "<bean:message key='jobs.schedulers.title' bundle='jobs'/>");
				return;
				}
			}
		 else if(!noData && !selectData){
    if(btn.value.toLowerCase() == dijit.byId('idView').value.toLowerCase()){
    	document.getElementById('operation').value='view'
    	document.getElementById('action').value='view'
    }else if(btn.value.toLowerCase() == dijit.byId('idEdit').value.toLowerCase()){
        document.getElementById('operation').value='view'
        document.getElementById('action').value='edit'
    }else if(btn.value.toLowerCase() == dijit.byId('idDelete').value.toLowerCase()){
    	document.getElementById('operation').value='delete'
        document.getElementById('action').value='view'
    }else if(btn.value.toLowerCase() == dijit.byId('idCreate').value.toLowerCase()){
    	document.getElementById('operation').value='add'
    	document.getElementById('action').value='view'
    } 
    document.forms[0].submit();
}
}

var tr_selected = '';
 function hover(obj){
        obj.className='class_hover';
    }

    function unHover(obj, row_num){
        if (tr_selected != row_num) obj.className = 'class_no_hover bgcolor';

    }


    </script>
<!--Commented By Harkamwaljeet-->
<!--
<style>
TR.class_hover{
    background-color: #B1CFF5;
    cursor: pointer; /* hand-shaped cursor */
    cursor: hand; /* for IE 5.x */

}
TR.class_no_hover{
    font-size: 12px;
    background-color: #ffffff
    text-align: center;

}
</style>

-->
 <style type="text/css">


div.clear {
    clear: both;
} 

</style>
</head>
<!----------------------------------------------------------------------------------------------------------------------------------------------------------------  -->
<%
    
    List ecosystemJobs = (List)  request.getSession(false).getAttribute("ecosystemJobs");
    List pidataJobs =  (List) request.getSession(false).getAttribute("pidataJobs");
    List urlExtractorJobs =  (List)  request.getSession(false).getAttribute("urlExtractorJobs");
    List fileCleanUpJobs =   (List)request.getSession(false).getAttribute("fileCleanUpJobs");
    List customJobs = (List)  request.getSession(false).getAttribute("customJobs"); 
    List clearCacheJobs = (List)  request.getSession(false).getAttribute("clearCacheJobs"); 
    
    String deleteStatus = (String) request.getAttribute("jobDeleteStatus");
    if(deleteStatus == null){
        deleteStatus = "";
    }
%>
<!----------------------------------------------------------------------------------------------------------------------------------------------------------------  -->
<body  class="tundra bodybg">
<html:form action="configureJobSchdAction"  method="POST">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">

	<table width="100%" cellspacing="0" cellpadding="0" align="center"  border="0" >
		<tr>
            <td  class="pageTitle paddingTitle">      
                 <bean:message key="jobs.configureJob" bundle="jobs"/>
            </td>
        </tr>
        <tr>
            <td class="paddingTitleDesc">
                <strong><bean:message key="jobs.configureJob.description" bundle="jobs"/></strong>
            </td>  
        </tr>
        <tr>
            <td style="padding-left:67px; width:800px;"> 
                <font color="blue" style="font-family: Tahoma;font-size: 12px;" >
					<b>
						<html:messages id="saveStatus" message="true" bundle="jobs"><bean:write name="saveStatus" /></html:messages>
                    </b>
				</font> 
                <font color="red" style="font-family: Tahoma;font-size: 12px;"><b><html:errors bundle="jobs"/></b></font> 
            </td>  
		</tr>
        <tr>
            <td style="padding-top:30px;padding-left:67px;width:900px">
                <table width="900px" cellspacing="0" cellpadding="0" style="align:left;" >
                    <tr>
                        <td>
                            <div id="tabs_container" style="text-align:left;">
                                <table width="922" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
										<td align="left" valign="middle">
                                            <div id="tabs_container_crystal" style="align:left; height:25px">
                                                <ul style="padding-left:0px">
                                                    <li class='active_t tabs_border'>
                                                       <a <%if(roleRightsMap.getHasReadAccess()) { %> style="color:#000000" href='<%=ServerUtils.getContextName(request)%>/configureJobSchdAction.do?operation=view' <%}else{%> style="color:#CCCCCC" class="tab" <%}%>><b><bean:message key="jobs.configureSchedulers" bundle="jobs"/></b></a>
                                                    </li>
                                                    <li class='panelColor tabs_border'>
                                                         <a  <%if(roleRightsMapMan.getHasReadAccess()) { %> style="color:#000000" href="<%=ServerUtils.getContextName(request)%>/startStopAction.do?operation=refresh&jobName=" <%}else{%> style="color:#CCCCCC" href="#" disabled="true" <%}%> ><b><bean:message key="jobs.monitorSchedulers" bundle="jobs"/></b></a>
                                                    </li>
												<li class='panelColor tabs_border''>
                                                    <a <%if(roleRightsMapSchtask.getHasReadAccess()){%>href="<%=ServerUtils.getContextName(request)%>/manageTaskAction.do?operation=view"  style="color:#000000" <%} else {%> style="color:#CCCCCC" href="#" disable="true" <%}%> ><b><bean:message key="jobs.monitorTask" bundle="jobs"/></b></a>
                                                </li>
                                                    <li class='panelColor tabs_border'>
                                                        <a <%if(roleRightsMapLog.getHasReadAccess()) { %> href="<%=ServerUtils.getContextName(request)%>/jobLogsAction.do?" style="color:#000000" <%}else{%> href="#" disabled="true" style="color:#CCCCCC" <%}%> ><b>Logs</b></a>
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
				<table border="0" width="900px"  height="54" cellspacing="0" cellpadding="0" >
					<tr>
						<td>
							<table border="1" cellspacing="0" cellpadding="0"  width="900px" class="tableBgColor ">
								<tr  class="panelColor"  >
									<td class="tab panelColor" style="width:10px"  align="left" valign="middle"><font size="2" >&nbsp;&nbsp;&nbsp;<label class="label"><bean:message key="jobs.actionLabel" bundle="jobs"/></label>&nbsp;&nbsp;</font></td>
									<td class="tab panelColor" height="27" align="left" style="width: 160px"  valign="middle">&nbsp;&nbsp;&nbsp;<label class="label"><bean:message key="jobs.jobTypeLabel" bundle="jobs"/></label></td>
									<td class="tab panelColor" height="27" align="left" style="width: 490px" valign="middle" >&nbsp;&nbsp;&nbsp;<label class="label"><bean:message key="jobs.jobNameLabel" bundle="jobs"/></label></td>
								</tr>
								<tr class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);">
									<td height="10px" align="center" valign="middle" >
										<% String ECOSYSTEM =  JobConstants.JOB_TYPE_ECOSYSTEM+""; %>
											<html:radio property="jobsType" value="<%=ECOSYSTEM %>"  name="configureJobsForm" onclick="getSelectName('selEcoSystem1');" /> 
									</td>
									<td height="27" align="left" style="width: 160px" valign="middle"  >&nbsp;&nbsp;&nbsp;<label class="label"><bean:message key="jobs.ecosystemLabel" bundle="jobs"/></label></td>
									<td height="27" align="left" style="width: 490px" valign="middle"  >&nbsp;&nbsp;
										<select  id="selEcoSystem1" dojoType="dijit.form.FilteringSelect"  name="selEcoSystem1"    autocomplete="off"   >
											<% 
												if(ecosystemJobs != null && ecosystemJobs.size() > 0){
											%>
												<option value="-1"><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
												<%  for(int i = 0; i < ecosystemJobs.size() ; i++){
															StiJobBean stiJobBean = (StiJobBean) ecosystemJobs.get(i); %>
															<option value="<%=stiJobBean.getId()%>"><%=ESAPI.encoder().encodeForHTML(stiJobBean.getName())%> </option>
												<%      }
													}else{ %>
															<option value="-2">-- <bean:message key="jobs.noDataFound" bundle="jobs"/> --</option>
												
												<%      }
												%>
										</select>
									</td>   
								</tr>
								<tr class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);">
									<td height="10px" align="center" valign="middle"  >
										<% String FILECLEANUP =   JobConstants.JOB_TYPE_FILECLEANUP+""; %>
										<html:radio property="jobsType" value="<%= FILECLEANUP %>" name="configureJobsForm" 
										onclick="getSelectName('selFileCleanUpTimer');"/> 
									</td>
									<td height="27" align="left" style="width: 160px"  valign="middle"  nowrap="nowrap">&nbsp;&nbsp;
										<label class="label"><bean:message key="jobs.fileCleanupLabel" bundle="jobs"/></label>
									</td>
									<td height="27" align="left" style="width: 490px"   valign="middle" >&nbsp;&nbsp;
										<select  id="selFileCleanUpTimer" dojoType="dijit.form.FilteringSelect"  name="selFileCleanUpTimer"    autocomplete="off" class="body">
										<% 
											if(fileCleanUpJobs != null && fileCleanUpJobs.size() > 0){
										%>						
											<option value="-1"><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
											<%  for(int i = 0; i < fileCleanUpJobs.size() ; i++){
														StiJobBean stiJobBean = (StiJobBean) fileCleanUpJobs.get(i); %>
														<option value="<%=stiJobBean.getId()%>"><%=ESAPI.encoder().encodeForHTML(stiJobBean.getName())%> </option>
											<%      }
												}else{ %>
														<option value="-2">-- <bean:message key="jobs.noDataFound" bundle="jobs"/> --</option>
											
											<%      }
											%>
										</select>                                                                                   
									</td>
					   <!--         <td height="27" align="Center" style="width: 250px" >
									&nbsp;
									</td>                                                 -->
								</tr>
								<tr class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);">
									<td height="10px" align="center" valign="middle" >
										<% String PIDATAEXTRACTOR =   JobConstants.JOB_TYPE_PIDATAEXTRACTOR+""; %>
										<html:radio property="jobsType" value="<%= PIDATAEXTRACTOR %>" name="configureJobsForm"  
										onclick="getSelectName('selPIDataExtractor');"/>
									</td>
									<td height="27" align="left" style="width: 160px"  valign="middle">&nbsp;&nbsp;&nbsp;<label class="label"><bean:message key="jobs.pidbExtractorLabel" bundle="jobs"/></label></td>
									<td height="27" align="left"  valign="middle" style="width: 490px" >&nbsp;&nbsp;
										<select  id="selPIDataExtractor" dojoType="dijit.form.FilteringSelect"  name="selPIDataExtractor"    autocomplete="off" class="body"   >
										<% 
											if(pidataJobs != null && pidataJobs.size() > 0){
										%>
											<option value="-1"><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
											<%  for(int i = 0; i < pidataJobs.size() ; i++){
														StiJobBean stiJobBean = (StiJobBean) pidataJobs.get(i); %>
														<option value="<%=stiJobBean.getId()%>"><%=ESAPI.encoder().encodeForHTML(stiJobBean.getName())%> </option>
											<%      }
												}else{ %>
														<option value="-2">-- <bean:message key="jobs.noDataFound" bundle="jobs"/> --</option>
											
											<%      }
											%>
										</select>
									</td>
						 <!--       <td height="27" align="Center" style="width: 250px" > 
									&nbsp;
									</td>                                                 -->
								</tr>
								<tr class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);">
									<td height="10px" align="center" valign="middle" >
										<%String URLEXTRACTOR =  JobConstants.JOB_TYPE_URLEXTRACTOR+""; %>
										<html:radio property="jobsType" value="<%=URLEXTRACTOR %>" name="configureJobsForm"          
										onclick="getSelectName('selUrlExtractor');"/> 
									</td>
										<td height="27" align="left" style="width: 160px" valign="middle"  >&nbsp;&nbsp;&nbsp;<label class="label"><bean:message key="jobs.urlExtractorLabel" bundle="jobs"/></label></td>
										<td height="27" align="left" style="width: 490px"  valign="middle" >&nbsp;&nbsp;
											<select  id="selUrlExtractor" dojoType="dijit.form.FilteringSelect"  name="selUrlExtractor"    autocomplete="off" class="body"  >
											<% 
												if(urlExtractorJobs != null && urlExtractorJobs.size() > 0){
											%>
							
												<option value="-1"><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
												<%  for(int i = 0; i < urlExtractorJobs.size() ; i++){
															StiJobBean stiJobBean = (StiJobBean) urlExtractorJobs.get(i); %>
															<option value="<%=stiJobBean.getId()%>"><%=ESAPI.encoder().encodeForHTML(stiJobBean.getName())%> </option>
												<%      }
													}else{ %>
															<option value="-2">-- <bean:message key="jobs.noDataFound" bundle="jobs"/> --</option>
												
												<%      }
												%>

											</select>
										</td>                                                           
						   <!--         <td height="27" align="Center" style="width: 250px" >
										&nbsp;
										</td>                                                 -->
								</tr>
								<tr class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);">
									<td height="10px" align="center" valign="middle"  >
										<%String CUSTOM =  JobConstants.JOB_TYPE_CUSTOM+""; %>
										<html:radio property="jobsType" value="<%= CUSTOM %>" name="configureJobsForm" 
										onclick="getSelectName('selCustomTimer');"/> 
									</td>
									<td height="27" align="left" style="width: 160px"  valign="middle">&nbsp;
										<label class="label"> &nbsp;<bean:message key="jobs.customLabel" bundle="jobs"/></label>
									</td>
									<td height="27" align="left" style="width: 490px"   valign="middle" >&nbsp;&nbsp;
										<select  id="selCustomTimer" dojoType="dijit.form.FilteringSelect"  name="selCustomTimer" autocomplete="off"  class="body"  >
										<% 
											if(customJobs != null && customJobs.size() > 0){
										%>
												<option value="-1"><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>

												<%  
													for(int i = 0; i < customJobs.size() ; i++){
														StiJobBean stiJobBean = (StiJobBean) customJobs.get(i); %>
														<option value="<%=stiJobBean.getId()%>"><%=ESAPI.encoder().encodeForHTML(stiJobBean.getName())%> </option>
											<%      }
												}else{ %>
														<option value="-2">-- <bean:message key="jobs.noDataFound" bundle="jobs"/> --</option>
											
											<%      }
											%>
										</select>										
									</td>
						 <!--       <td height="27" align="Center" style="width: 250px" >
									&nbsp;
									</td>                                                 -->
								</tr>
								<!--ASHUTOSH-->
								<tr class="bgcolor" onMouseOver="hover(this);" onMouseOut="unHover(this, 1);">
									<td height="10px" align="center" valign="middle"  >
									<%String CLEAR_CACHE =  JobConstants.JOB_TYPE_CLEAR_CACHE+""; %>
										<html:radio property="jobsType" value="<%=CLEAR_CACHE %>" name="configureJobsForm"          
										onclick="getSelectName('selClearCache');"/> 
									</td>
									<td height="27" align="left" style="width: 160px"  valign="middle">&nbsp;&nbsp;
									<label class="label"><bean:message key="jobs.clearcachejob" bundle="jobs"/></label></td>
									<td height="27" align="left" style="width: 490px"   valign="middle" >&nbsp;&nbsp;
										<select  id="selClearCache" dojoType="dijit.form.FilteringSelect"  name="selClearCache"    autocomplete="off" class="class="body""   >
										<% 
											if(clearCacheJobs != null && clearCacheJobs.size() > 0){
										%>
						
											<option value="-1"><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
											<%  for(int i = 0; i < clearCacheJobs.size() ; i++){
														StiJobBean stiJobBean = (StiJobBean) clearCacheJobs.get(i); %>
														<option value="<%=stiJobBean.getId()%>"><%=ESAPI.encoder().encodeForHTML(stiJobBean.getName())%> </option>
											<%      }
												}else{ %>
														<option value="-2">-- No Data Found --</option>
											
											<%      }
											%>
										</select>
									</td>                                                           
						<!--        <td height="27" align="Center" style="width: 250px" >
									&nbsp;
									</td>                                                 -->
								</tr>
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
		<button dojoType="dijit.form.Button"  type="button" id="idHome" name="btnHome" value="<bean:message key="jobs.home" bundle="jobs"/>" onClick="return submitForm(this);">
							<bean:message key="jobs.home" bundle="jobs"/>
		</button>
		<button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasReadAccess()) { %> disabled="true" <%}%> type="button" id="idView" name="btnView" value="<bean:message key="jobs.view" bundle="jobs"/>" onClick="return submitForm(this);">
							<bean:message key="jobs.view" bundle="jobs"/>
		</button>
		<button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasCreateAccess()) { %> disabled="true" <%}%> type="button"  id="idCreate" name="btnAdd" value="<bean:message key="jobs.create" bundle="jobs"/>" onClick="return submitForm(this);">
							<bean:message key="jobs.create" bundle="jobs"/>
		</button>
		<button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasUpdateAccess()) { %> disabled="true" <%}%> type="button"  id="idEdit" name="btnEdit" value="<bean:message key="jobs.update" bundle="jobs"/>" onClick="return submitForm(this);">
							<bean:message key="jobs.update" bundle="jobs"/>
		</button>
		<button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasDeleteAccess()) { %> disabled="true" <%}%> type="button"  id="idDelete" value="<bean:message key="jobs.delete" bundle="jobs"/>" name="btnDelete" onClick="return submitForm(this);">
							<bean:message key="jobs.delete" bundle="jobs"/>
		</button>
		</td>
    </tr>
</table>
<input type="hidden" name="operation" id="operation" value="view" />
<input type="hidden" name="action" id="action" value="view" /> 
</html:form>

<script>
dojo.addOnLoad(loadFormValues); 
	function loadFormValues(){
		dijit.byId('selEcoSystem1').setAttribute('disabled', true);
		dijit.byId('selPIDataExtractor').setAttribute('disabled', true);
		dijit.byId('selUrlExtractor').setAttribute('disabled', true);
		dijit.byId('selFileCleanUpTimer').setAttribute('disabled', true);
		dijit.byId('selCustomTimer').setAttribute('disabled', true);
		<!--ASHUTOSH-->
		dijit.byId('selClearCache').setAttribute('disabled', true);
		   //dijit.byId('idCreate').setAttribute('disabled', true);
		   //dijit.byId('idEdit').setAttribute('disabled', true);
		   //dijit.byId('idDelete').setAttribute('disabled', true);
		   //dijit.byId('idView').setAttribute('disabled', true);
		   //dijit.byId('idDelete').setAttribute('disabled', true);
			document.forms[0].jobsType[0].checked = false;
			document.forms[0].jobsType[1].checked = false;
			document.forms[0].jobsType[2].checked = false;
			document.forms[0].jobsType[3].checked = false;
			document.forms[0].jobsType[4].checked = false;
			document.forms[0].jobsType[5].checked = false;
		}
</script>
</body>
</html:html>