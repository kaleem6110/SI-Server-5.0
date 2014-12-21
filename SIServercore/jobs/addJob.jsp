<%@ page import="java.util.*,
com.spacetimeinsight.stas.config.GenericConfigurationManager,
com.enterprisehorizons.magma.config.dbadmin.ModelConfigConstants,
com.enterprisehorizons.magma.server.util.ServerUtils,
com.enterprisehorizons.util.StringUtils,
com.spacetimeinsight.magma.job.JobConstants,
com.spacetimeinsight.magma.job.bean.StiJobBean,
com.spacetimeinsight.stas.datasource.*,
com.spacetimeinsight.db.scheduler.model.ServerEnvMaster,
com.spacetimeinsight.db.model.util.DataModelsCache,
com.spacetimeinsight.db.scheduler.model.*,
com.enterprisehorizons.magma.server.admin.AdminConfigUtils,
com.enterprisehorizons.magma.jobs.forms.AddJobForm,
com.enterprisehorizons.magma.server.admin.AdminConfigUtils"
%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ include file="/common/dojo.jsp" %>
<%
	AddJobForm formObj = (AddJobForm) request.getAttribute("AddJobForm");;
	com.spacetimeinsight.db.config.model.Datasource[] datasourceArray =  GenericDatasourceManager.getInstance().getDatasourceNames(IDatasourceConstants.DATABASE_TYPES_PI);
	String showCommonJob = GenericConfigurationManager.getInstance().getProperty("admin","IS_CLUSTERED" );
%>
<%@ include file="jobsHelper.jsp" %>
<script type="text/javascript" src="js/ecoweb.js" ></script>
<script type="text/javascript" src="js/jobs.js"></script>

<html:html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Add Job</title>

<script type="">
var countrownumber = 0;
var addedRowsNumbers = "1,";
var addedURLRowsNumbers = "1,";
var addedDependentTasksNumbers = "1,";
var initial_count = new Array();
var rows_limit = 0;
var dbColumnsArray = [];
var rows_count = 0;
var isAddJob = true;
 
function chkDescriptionLen(){
    if(dijit.byId('description').attr('value').length > 500){
		showEmptyDialog("Length of text description should be less than 500", "Error");
		dijit.byId('description').focus();
		return false;
	}
	return true;
}

function chkubmit(obj){
	
	if(!chkDescriptionLen()){
		return false;
	}
	var startDateValue = dijit.byId('startDate').getValue();
	if(startDateValue === undefined){
		showEmptyDialog("Please provide correct format for Start Date", "Error");
		return  false;
	}else if(startDateValue != null && startDateValue != ""){
	var today = new Date();
	today.setHours(0,0,0,0);
		if (startDateValue<today)
		{
			showEmptyDialog("Start Date should be of today or of future", "Error");
			return  false;
		}
	}
	
	var selectedJobType = dijit.byId('jobType').value;
	if(selectedJobType == JOB_TYPE_CUSTOM){
			var ecoVarJob = dijit.byId('timerParameterValueMap').value;
			if(ecoVarJob.length != 0 ){
				var containSemicolon=ecoVarJob.charAt(ecoVarJob.length-1);
				if(containSemicolon==";"){
					ecoVarJob=ecoVarJob.substring(0,(ecoVarJob.length-1));
				}			
				var splitVar = ecoVarJob.split(";");
				if(splitVar.length != 0){
					for(i=0;i<splitVar.length;i++)
					{ 
						var tempVar = splitVar[i];
						var splitVar2 = tempVar.split("=");
						if(splitVar2.length-1 == 0){
							showEmptyDialog("Please Provide correct format for Parameters", "Custom Timer");
							return  false;
						}
						for(j=0;j<splitVar2.length;j++){
							if( splitVar2[j].length == 0){
								showEmptyDialog("Please Provide correct format for Parameters", "Custom Timer");
								return  false;
							}
						}
					}
				}
			}
		}
	if(selectedJobType == JOB_TYPE_ECOSYSTEM){
		
		if(!isValidUsernamePassword(dijit.byId('ecoUserId').value,dijit.byId('ecoPassword').value)){
			showEmptyDialog("User ID should not be blank on providing password", "Error");
			return false;
		}
		/*its for parameter validation started */
		var ecoVarJob = dijit.byId('parameterValueMap').value;
			if(ecoVarJob.length != 0 ){
			var containSemicolon=ecoVarJob.charAt(ecoVarJob.length-1);
			if(containSemicolon==";"){
				ecoVarJob=ecoVarJob.substring(0,(ecoVarJob.length-1));
			}			
			var splitVar = ecoVarJob.split(";");
			if(splitVar.length != 0){
				for(i=0;i<splitVar.length;i++)
			{ 
				var tempVar = splitVar[i];
				var splitVar2 = tempVar.split("=");
				if(splitVar2.length-1 == 0){
					showEmptyDialog("Please Provide correct format for Parameters", "KML / KMZ Generator");
 					return  false;
  				}
				for(j=0;j<splitVar2.length;j++){
					if( splitVar2[j].length == 0){
						showEmptyDialog("Please Provide correct format for Parameters", "KML / KMZ Generator");
		 				return  false;
 					}
				}
			}
			}
		}/* ended the vaildation */
	}else if(selectedJobType == JOB_TYPE_URLEXTRACTOR){
		if(!isValidUsernamePassword(dijit.byId('userId').value,dijit.byId('password').value)){
			showEmptyDialog("User ID should not be blank on providing password", "Error");
			return false;
		}
	}
	return checkStartTime(obj)
}

function clearTextArea(){
	dijit.byId('description').setValue('');
    dijit.byId('parameterValueMap').setValue('');
    dijit.byId('timerParameterValueMap').setValue('');
    dijit.byId('tagQuery').setValue('');
    dijit.byId('pilistener').setValue('');
	dijit.byId('startTimeType').setValue('');
	dijit.byId('startTimeType').reset();
    dijit.byId('jobType').setValue(dijit.byId('jobType').value);
	dijit.byId('ecoSystemName').setValue('');
	//dijit.byId('ecoSystem1').setValue('');
	//dijit.byId('selectedEcoSystem1').setValue('');
	dijit.byId('dataSource').setValue('');
    document.getElementById('result').innerHTML='';
	if(dijit.byId('jobType').attr('value') == JOB_TYPE_CLEAR_CACHE){
		if(document.getElementById('combobox2') != null && document.getElementById('combobox1') != null){
			MoveItems('L', 1);
			dijit.byId('jobType').setValue(JOB_TYPE_CLEAR_CACHE);
		}
	}
//Start
	var isTaskPreChkd = (dijit.byId('isTaskPresent').checked) ? "yes" : "no";
	var isTaskChkd 	  = (dijit.byId('isTask').checked) ? "yes" : "no";	
	if(isTaskPreChkd == "yes"){			
		dijit.byId('isTaskPresent').setAttribute('disabled', false);
		dijit.byId('startTimeType').setAttribute('disabled', false);
		dijit.byId('startDate').setAttribute('disabled', false);
		dijit.byId('startDate').setAttribute('class', 'clear_overlay_alphacube');
		dijit.byId('startTime').setAttribute('disabled', false);
		dijit.byId('startTime').setAttribute('class', 'clear_overlay_alphacube');
		dijit.byId('listener').setAttribute('disabled', false);
		dijit.byId('listener').setAttribute('class', 'clear_overlay_alphacube');
		if(document.AddJobForm.commonJobFlag!=null && !<%=checkboxstatus%>){
			document.AddJobForm.commonJobFlag.disabled = false;
		}
		document.getElementById('dependentTaskPanel').style.display = 'none';
		dijit.byId('isTask').setAttribute('disabled', false);		 
		dijit.byId('isTaskPresent').setAttribute('checked', false);	
	}
		if(isTaskChkd  == "yes"){
 		dijit.byId('startTimeType').setAttribute('disabled', false);
		dijit.byId('startDate').setAttribute('disabled', false);
		dijit.byId('startDate').setAttribute('class', 'clear_overlay_alphacube');
		dijit.byId('startTime').setAttribute('disabled', false);
		dijit.byId('startTime').setAttribute('class', 'clear_overlay_alphacube');
		dijit.byId('listener').setAttribute('disabled', false);
		dijit.byId('listener').setAttribute('class', 'clear_overlay_alphacube');
		if(document.AddJobForm.commonJobFlag!=null && !<%=checkboxstatus%>){
			document.AddJobForm.commonJobFlag.disabled = false;
		 }
		dijit.byId('isTask').setAttribute('checked', false);
		dijit.byId('isTaskPresent').setAttribute('disabled', false);
	  }
//End
  }

function checkStartTime(obj) {
	if(isAllCharactersSame(dijit.byId('password').value)){
		showEmptyDialog("Password should not contain same characters", "Error");
		return false;
	}
	return submitForm(obj);
}

function removeRow(tbl,row,prefix){
	var table = document.getElementById(tbl);
	var rownum = row.rowIndex;
	try{
		table.deleteRow(rownum);
        delAddedRowsNumbers(prefix);
		countrownumber--;
	} catch (ex) {
		alert(ex);
	}
}

function delAddedRowsNumbers(tmp){
    var rowNumbersArray = new Array();
    rowNumbersArray = addedRowsNumbers.split(',');
    for(countArr = 0;countArr < rowNumbersArray.length;countArr++){
        var tmp1 = rowNumbersArray[countArr];
        if(tmp == tmp1){
			rowNumbersArray[countArr] = 'n';
            break;
        }
    }
	addedRowsNumbers = rowNumbersArray.join(",");
}

function assignTotalNoOfEcos(){
    //var total = document.getElementById('mytable1').rows.length;
	if(document.getElementById('totalNoOfEcoSystems') != null){
		document.getElementById('totalNoOfEcoSystems').value = addedRowsNumbers.split(',');
	}
    return true;
}

function removeURLRow(tbl,row,prefix){
	var table = document.getElementById(tbl);
	var rownum = row.rowIndex;
	try{
		table.deleteRow(rownum);
        delAddedURLRowsNumbers(prefix);
	} catch (ex) {
		alert(ex);
	}
}

function delAddedURLRowsNumbers(tmp){
    var rowNumbersArray = new Array();
    rowNumbersArray = addedURLRowsNumbers.split(',');
    for(countArr = 0;countArr < rowNumbersArray.length;countArr++){
        var tmp1 = rowNumbersArray[countArr];
        if(tmp == tmp1){
			rowNumbersArray[countArr] = 'n';
            break;
        }
    }
	addedURLRowsNumbers = rowNumbersArray.join(",");
}

function assignTotalNoOfURLS(){
	if(document.getElementById('totalNoOfUrls') != null){
		document.getElementById('totalNoOfUrls').value = addedURLRowsNumbers.split(',');
	}
    return true;
}
function addDependentTasksPanelAddJob(cb){
	var isChkd = (cb.checked) ? "yes" : "no";	 
	if(isChkd == "yes"){
		document.getElementById('dependentTaskPanel').style.display = "";		 
		dijit.byId('isTask').setAttribute('checked', false);
		dijit.byId('isTask').setAttribute('disabled', true);		 
	}else{
		document.getElementById('dependentTaskPanel').style.display = 'none';
		 dijit.byId('isTask').setAttribute('checked', false);
		 dijit.byId('isTask').setAttribute('disabled', false);
	}
}

function handleFieldsForDependentTasks(cb){
	var isChkd = (cb.checked) ? "yes" : "no";
	if(isChkd=="yes"){
		dijit.byId('isTaskPresent').setAttribute('checked', false);
		dijit.byId('isTaskPresent').setAttribute('disabled', true);
		document.getElementById('dependentTaskPanel').style.display = 'none';
		
		dijit.byId('startTimeType').setValue('');
		dijit.byId('startTimeType').setAttribute('disabled', true);
		
		dijit.byId('startDate').setValue('');
		dijit.byId('startDate').setAttribute('disabled', true);
		dijit.byId('startDate').setAttribute('class', 'overlay_alphacube');
		
		dijit.byId('startTime').setValue('');
		dijit.byId('startTime').setAttribute('disabled', true);
		dijit.byId('startTime').setAttribute('class', 'overlay_alphacube');
		
		dijit.byId('listener').setValue('');
		dijit.byId('listener').setAttribute('disabled', true);
		dijit.byId('listener').setAttribute('class', 'overlay_alphacube');
		
		if(document.AddJobForm.commonJobFlag!=null && !<%=checkboxstatus%>){
			document.AddJobForm.commonJobFlag.checked = false;
			document.AddJobForm.commonJobFlag.disabled = true;
		}
	}else{
		dijit.byId('isTaskPresent').setAttribute('disabled', false);
		dijit.byId('startTimeType').setAttribute('disabled', false);
		dijit.byId('startDate').setAttribute('disabled', false);
		dijit.byId('startDate').setAttribute('class', 'clear_overlay_alphacube');
		dijit.byId('startTime').setAttribute('disabled', false);
		dijit.byId('startTime').setAttribute('class', 'clear_overlay_alphacube');
		dijit.byId('listener').setAttribute('disabled', false);
		dijit.byId('listener').setAttribute('class', 'clear_overlay_alphacube');
		if(document.AddJobForm.commonJobFlag!=null && !<%=checkboxstatus%>){
			document.AddJobForm.commonJobFlag.disabled = false;
		}
	}
}

function addRow(table_id){
	columnList = {identifier:"column",items:dbColumnsArray};
	columnStore = new dojo.data.ItemFileReadStore({data: columnList});
	var tbl = document.getElementById(table_id);
	// counting rows in table
	rows_count = tbl.rows.length;
	if (initial_count[table_id] == undefined){
		// if it is first adding in this table setting initial rows count
		initial_count[table_id] = rows_count;
	}
	// determining real count of added fields
	var text = 'Text field';
	var tFielsNum = rows_count - initial_count[table_id];
	if (rows_limit!=0 && tFielsNum >= rows_limit){
		return false;
	}
	var rowNumbersArray = new Array();
	rowNumbersArray = addedURLRowsNumbers.split(',');
	var prefix = rowNumbersArray.length;
	addedURLRowsNumbers = addedURLRowsNumbers + prefix + ",";
	var urlName = "url" +  +  prefix;
	try {
		var newRow = tbl.insertRow(rows_count);
		var newCell = newRow.insertCell(0);
		var input = '<input type="text"    id="'+ urlName +'" name="' + urlName + '" autocomplete="off" style="width:300px;height:1.7em;" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true"   />' +
			'<a href="#" onclick="javascript:removeURLRow(\'mytable2\',this.parentNode.parentNode,'+ prefix +');"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_dash_1.png"  / ></a>';
		newCell.innerHTML =input;
	} catch (ex) {
		alert(ex);
	}
	countrownumber++;
}

<logic:present name="ecoModelFileList" scope="request">
    <logic:iterate name="ecoModelFileList" id="ecoModelFileDtls">
        dbColumnsArray.push({column: '<bean:write name="ecoModelFileDtls" property="ecoSystemFilePath"/>' , label: '<bean:write name="ecoModelFileDtls" property="ecoSystemName"/>'});
    </logic:iterate>
</logic:present>

</script>
</head>
<body class="tundra bodybg" style="overflow-x:hidden;overflow-y:auto">
<html:form action="/addJobAction.do" method="post">
<table width="100%" border="0">
	<tr>	
    	<td>
			<table width="100%" cellspacing="0" cellpadding="0" border="0">
				<tr>
					<td  class="pageTitle paddingTitle">
						<bean:message key="jobs.addJob" bundle="jobs"/>
					</td>
				</tr>
				<tr>
					<td class="paddingTitleDesc">
						<strong><bean:message key="jobs.addJob.description" bundle="jobs"/></strong>
					</td>
				</tr>
				<tr>
					<td style="padding-left:67px; width:800px;" id="errorElement">
                        <font color="blue" style="font-family: Tahoma;font-size: 12px;" >
							<b><html:messages id="saveStatus" message="true" bundle="jobs"><bean:write name="saveStatus" /></html:messages></b>
						</font>
                        <font color="red" style="font-family: Tahoma;font-size: 12px;"><b><html:errors bundle="jobs"/></b>
						</font>
					</td>
				</tr>
				<tr height="30px">
					<td>&nbsp;</td>
				</tr>
			</table>
			<table width="100%" cellspacing="0" cellpadding="0" border="0">
				<tr>
					<td style="padding-left:67px;">
                    	<table cellspacing="0" cellpadding="0" border="0">
                        	<tr>
                            	<td align="right" style="padding-right:5px">&nbsp;</td>
                                <td align="left">&nbsp;</td>
                                <td width="30">&nbsp;</td>
                                <td align="right" style="padding-right:5px">&nbsp;</td>
                                <td align="left">&nbsp;</td>
                          	</tr>
                            <tr>
                            	<td align="right" style="padding-right:5px"><label class="label">Create As Task:</label></td>
                                <td align="left"><input dojotype='dijit.form.CheckBox' name="isTask" value="isTask" id="isTask" onClick="handleFieldsForDependentTasks(this)"></td>
                                <td>&nbsp;</td>
                                <td align="right" style="padding-right:5px"><label class="label">Add Dependent Task:</label></td>
                                <td align="left"><input dojotype='dijit.form.CheckBox' name="isTaskPresent" value="isTaskPresent" id="isTaskPresent" onClick="addDependentTasksPanelAddJob(this)"></td>
                          	</tr>
                            <tr>
                            	<td colspan="5" height="10">&nbsp;</td>
                            </tr>
                            <tr>
                            	<td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.jobName" bundle="jobs"/></label><label class="error">*</label><b>:</b></td>
                                <td align="left"><input type="text"  id="jobName" name="jobName"  class="medium1" style="height:1.7em;" maxlength="45" autocomplete="off" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true"  onblur="loadData('CheckTimerName',this, setCheckTimerNameStatus, 'insert');"/></td>
                                <td>&nbsp;</td>
                                <td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.startType" bundle="jobs"/></label><label class="error">*</label><b>:</b></td>
                                <td align="left">
                                <select id="startTimeType" dojoType="dijit.form.FilteringSelect"  name="startTimeType" autocomplete="off" onChange="showConcernDiv()">
									<option value="">
										<bean:message key="validation.msg.select" bundle="splchvalidation"/>
									</option>
									<logic:present name="allStartTimesList">
									<logic:iterate name="allStartTimesList" id="allStartTimesDtls">
									<option value='<bean:write name="allStartTimesDtls" property="key"/>'>
										<bean:message  bundle="jobs" name="allStartTimesDtls" property="value" />
									</option>
									</logic:iterate>
									</logic:present>
								</select></td>
                          	</tr>
                            <tr height="20">
                            	<td>&nbsp;</td>
                            	<td colspan="4" ><b><span id="result"></span></b></td>
                            </tr>
                            <tr>
                            	<td rowspan="3" align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.description" bundle="jobs"/></label><b>:</b></td>
                                <td rowspan="3 "align="left"><textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" id="description" class="medium1" style="height:5.7em;" name="description"  ></textarea></td>
                                <td>&nbsp;</td>
                                <td align="right" style="padding-right:5px">
                                	<label class="label"><bean:message key="jobs.startDate" bundle="jobs"/><span id="startDateMand">:</label>
                                </td>
                                <td>
                                	<div id="dateDiv" >
													<input id="startDate" type="text" name="startDate" style="width:194px;height:1.7em;" dojoType="dijit.form.DateTextBox" trim="true"  promptMessage="mm/dd/yyyy" autocomplete="off" onChange="dojo.byId('calendarDiv').innertHTML=arguments[0];" invalidMessage="Invalid date. Use mm/dd/yyyy format." /><br><font size="1"><label><bean:message key="jobs.startDateFormat" bundle="jobs"/></label></font>
												</div>
												<div id="calendarDiv"  style="position:absolute;z-index:100;display:none; top:176px; left:600px; width:200; height:200; border:2px solid #EAEAEA;background-color:blue;opacity:1;"></div>
                                </td>
                            </tr>
                            <tr>
                            	<td>&nbsp;</td>
                                <td align="right" style="padding-right:5px">&nbsp;</td>
                                <td align="left">&nbsp;</td>
                          	</tr>
                            <tr>
                            	<td>&nbsp;</td>
                                <td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.startTime" bundle="jobs"/><span id="startTimeMand"></span><label class="error">*</label><b>:</b></td>
                                <td align="left">
                                	<div id="startTimeDiv" style="width:194px;height:1.7em;">
									<input type="text" id="startTime" name="startTime" autocomplete="off" class="medium1" style="height:1.7em;" dojoType="dijit.form.ValidationTextBox" invalidMessage="Invalid time. Use HH:mm:ss where HH is 00 - 23 hours."/><br><font size="1"><label><bean:message key="jobs.startTimeFormat" bundle="jobs"/></label></font>
									</div>
                                </td>
                          	</tr>
                            <tr>
                            	<td colspan="5" height="20">&nbsp;</td>
                            </tr>
                            <tr>
                            	<td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.jobType" bundle="jobs"/></label><label class="error">*</label><b>:</b></td>
                                <td align="left">
                                	<select  id="jobType" dojoType="dijit.form.FilteringSelect"name="jobType" autocomplete="off" onChange="javascript:statusChange();document.getElementById('errorElement').innerHTML='';">
										<option value="-1"><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
										<logic:present name="allJobsTypesList">
										<logic:iterate name="allJobsTypesList" id="allJobsTypesDtls">
										<option value='<bean:write name="allJobsTypesDtls" property="key"/>'><bean:message  bundle="jobs" name="allJobsTypesDtls" property="value" /></option>
										</logic:iterate>
										</logic:present>
									</select></td>
                                <td>&nbsp;</td>
                                <td align="right" style="padding-right:5px"><label class="label">Listener:</label></td>
                                <td align="left"><input type="text"  id="listener" name="listener"  class="medium1" style="height:1.7em;" autocomplete="off" dojoType="dijit.form.ValidationTextBox" trim="true" ucfirst="true" /></td>
                          	</tr>
                            <tr>
                            	<td colspan="5" height="20">&nbsp;</td>
                            </tr>
                            <%if(AdminConfigUtils.isClustered()&& showCheckBox){%>
                            <tr>
                            	<td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.commonJob" bundle="jobs"/>:</label></td>
                                <td align="left"><html:checkbox name="AddJobForm" property="commonJobFlag" onclick="addJobCheckBoxAlert(this);" disabled="<%=checkboxdisable%>"></html:checkbox></td>
                                <td>&nbsp;</td>
                               	<td align="right" style="padding-right:5px">&nbsp;</td>
                                <td align="left">&nbsp;</td>
                            </tr>
                            <tr>
                            	<td colspan="5" height="20">&nbsp;</td>
                            </tr>
                            <%}%>
                            <tr>
                            	<td align="right" id="recurrenceLabelDtls" style="padding-right:5px; display:none"><label><b><bean:message key="jobs.recur.recurranceLabel" bundle="jobs"/><label class="error">*</label><b>:</b></td>
                                <td align="left"></td>
                                <td>&nbsp;</td>
                               	<td align="right" style="padding-right:5px">&nbsp;</td>
                                <td align="left">&nbsp;</td>
                            </tr>
                           
                            
                         </table>
                     
					</td>
				</tr>
				
				
				<!---   DIV Started for AFTER SERVER START JOB  -->
				<tr id="afterServerStartDivDtls" style="display:none">
					<td style="padding-left:67px;align:left;" >
						<table width="100%" cellpadding="0" cellspacing="0" align="left" border="0">
							<tr>
								<td>
									<table width="auto" cellpadding="0" cellspacing="0" align="left" border="0">
										<tr>
											<td height="27" align="left" width="100px">
												<input type="radio" dojoType="dijit.form.RadioButton" autocomplete="off" name="afterServerStartsPattern" id="afterServerStartsPatternEvery" value="selectedAfterServerStartsEvery" onClick="resetAfterServerStartsFormValues()"/><label><b><bean:message key="jobs.recur.everyLabel" bundle="jobs"/></b></label>
											</td>
											<td>
												<input type="text"   id="interval" name="interval" autocomplete="off" style="width:100px;height:1.7em" dojoType="dijit.form.ValidationTextBox" required="false" invalidMessage="Invalid Number" maxlength="10" onKeyUp="return setFocus();"/>
											</td>
											<td>
												<select  id="intervalType" dojoType="dijit.form.FilteringSelect"  name="intervalType" autocomplete="off"  value='' onChange="return setFocus();">
													<option value=''>
														<bean:message key="validation.msg.select" bundle="splchvalidation"/>
													</option>
													<logic:present name="allIntervalsSimpleList">
														<logic:iterate name="allIntervalsSimpleList" id="allIntervalsDtls">
															<option value='<bean:write name="allIntervalsDtls" property="key"/>'>
																<bean:message  bundle="jobs" name="allIntervalsDtls" property="value" />
															</option>
														</logic:iterate>
													</logic:present>
												</select>
											</td>
										</tr>
										<tr>
											<td>
												<input type="radio" dojoType="dijit.form.RadioButton" autocomplete="off" name="afterServerStartsPattern" id="afterServerStartsPatternOnce" value="selectedAfterServerStartsOnce" onClick="resetAfterServerStartsFormValues()"/><label><b><bean:message key="jobs.recur.onceLabel" bundle="jobs"/></b></label>
											</td>
										</tr>
									</table>
									<table width="auto" cellpadding="0" cellspacing="0" align="left" border="0">
										<tr>
											<td id="td_simpletriggernotestserverstart" name="td_simpletriggernotestserverstart" height="auto" width="450px"> 
												<font class="simpletriggernote">
													<bean:message key="job.dst.message" bundle="jobs"/>
												</font>	
											</td>
										</tr>
									</table>
								</td>			
							</tr>
						</table>
					</td>
				</tr>
				<!---   DIV Ended for AFTER SERVER START JOB  -->

				<!---   DIV Started for EXPRESSION JOB  -->
				<tr id="expressionDivDtls" style="display:none">
					<td style="padding-left:67px;align:left;" >
						<table cellspacing="0" cellpadding="0" border="0" align="left" width="100%">
							<tr>
								<td>
									<table cellpadding="0"  border="0">
										<tr>
											<td>
												<label class="label"><bean:message key="jobs.recur.expressionLabel" bundle="jobs"/></label>&nbsp;<label class="error">* </label><label class="label"><b>:</b></label>
											</td>
											<td>
												<input type="text"   id="expression" name="expression" autocomplete="off" style="height:1.7em" dojoType="dijit.form.ValidationTextBox" required="false" trim="true"  />
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<!---   DIV Ended for EXPRESSION JOB  -->

				<!---   DIV Started for ABSOLUTE JOB  -->
				<tr id="absoluteDivDtls" style="display:none">
					<td style="padding-left:67px;align:left;" >
						<table cellspacing="0" cellpadding="0" border="0" align="left" width="100%">
							<tr>
								<td>
									<table cellpadding="0"  border="0" width="auto">
										<tr>
											<td>
												<select  id="cronTypeId" dojoType="dijit.form.FilteringSelect"  name="cronTypeId" autocomplete="off"  onChange="resetAbsoluteFormValues()" value="">
													<option value=''>
														<bean:message key="validation.msg.select" bundle="splchvalidation"/>
													</option>
													<logic:present name="allIntervalsCronList">
														<logic:iterate name="allIntervalsCronList" id="cronTriggerMasterDtls">
															<option value="<bean:write name="cronTriggerMasterDtls" property="key"/>">
																<bean:message  bundle="jobs" name="cronTriggerMasterDtls" property="value"  />
															</option>
														</logic:iterate>
													</logic:present>
												</select>
											</td>
											<td width="13px">&nbsp;
											</td>
											
											<!--  SECONDS / MINUTES / HOURS  PATTERN -->
											<td id="absoluteIntervalSMHDIVLabelDtls" style="display:none">
												<label class="label"><b><bean:message key="jobs.recur.everyLabel" bundle="jobs"/></b></label>&nbsp;<label class="error">*</label><b>:</b>
											</td>
											<td id="absoluteIntervalSMHDIVComponentDtls" style="display:none">
												<input type="text"  id="absoluteInterval" name="absoluteInterval" autocomplete="off" style="height:1.7em;" dojoType="dijit.form.ValidationTextBox" maxlength="10"/>
											</td>
					
											<!--  DAILY PATTERN -->
											<td id="absoluteIntervalDailyDIVLabelDtls" style="display:none">
												<table border="0" width="auto">
													<tr>
														<td width="70px">
															<input type="radio" dojoType="dijit.form.RadioButton" autocomplete="off" name="absoluteDailyPattern" id="absoluteDailyPatternEveryDay" value="selectedAbsoluteDailyPatternEveryDay" onClick="resetAbsoluteDailyPatternFormValues()" /><label><b><bean:message key="jobs.recur.everyLabel" bundle="jobs"/></b></label>
														</td>
														<td>
															<input type="text"  id="absoluteDailyInterval" name="absoluteDailyInterval" autocomplete="off" style="height:1.7em;width:100px;" dojoType="dijit.form.ValidationTextBox" maxlength="2" onKeyUp="return setdailyFocus();"/> <label><b><bean:message key="jobs.recur.daysLabel" bundle="jobs"/></b></label>
														</td>
													</tr>
													<tr>
														<td colspan="2">
															<input onClick="resetAbsoluteDailyPatternFormValues()" type="radio" dojoType="dijit.form.RadioButton" autocomplete="off" name="absoluteDailyPattern" id="absoluteDailyPatternEveryWeekDay" value="selectedAbsoluteDailyPatternEveryWeekDay" /><label><b><bean:message key="jobs.recur.weekdaysLabel" bundle="jobs"/></b></label>
														</td>
													</tr>
												</table>
											</td>

											<!--  WEEKLY PATTERN -->
											<td id="absoluteIntervalWeeklyDIVLabelDtls" style="display:none">
												<table border="0" width="320px">
													<tr>
														<td  colspan="2">
															<b><label><bean:message key="jobs.recur.recureveryweekonLabel" bundle="jobs"/>:</label></b>
														</td>
													</tr>
													<tr>
														<td colspan="2">
															<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternSunday" autocomplete="off" id="absoluteWeeklyPatternSunday" value="absoluteWeeklyPatternSunday" /><label><bean:message key="job.cron.day.type.sunday" bundle="jobs"/></label>
															<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternMonday" autocomplete="off" id="absoluteWeeklyPatternMonday" value="absoluteWeeklyPatternMonday" /><label><bean:message key="job.cron.day.type.monday" bundle="jobs"/></label>
															<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternTuesday" autocomplete="off" id="absoluteWeeklyPatternTuesday" value="absoluteWeeklyPatternTuesday" /><label><bean:message key="job.cron.day.type.tuesday" bundle="jobs"/></label>
															<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternWednesday" autocomplete="off" id="absoluteWeeklyPatternWednesday" value="absoluteWeeklyPatternWednesday" /><label><bean:message key="job.cron.day.type.wednesday" bundle="jobs"/></label>
														</td>
													</tr>
													<tr>
														<td colspan="2">
															<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternThursday" id="absoluteWeeklyPatternThursday" autocomplete="off" value="absoluteWeeklyPatternThursday" /><label><bean:message key="job.cron.day.type.thursday" bundle="jobs"/></label>
															<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternFriday" id="absoluteWeeklyPatternFriday" autocomplete="off" value="absoluteWeeklyPatternFriday" /><label><bean:message key="job.cron.day.type.friday" bundle="jobs"/></label>
															<input type='checkbox'  dojotype='dijit.form.CheckBox' name="absoluteWeeklyPatternSaturday" id="absoluteWeeklyPatternSaturday" autocomplete="off" value="absoluteWeeklyPatternSaturday" /><label><bean:message key="job.cron.day.type.saturday" bundle="jobs"/></label>
														</td>
													</tr>

												</table>
											</td>

											<!--  MONTHLY PATTERN -->
											<td id="absoluteIntervalMonthlyDIVLabelDtls" style="display:none">
												<table border="0" width="720px">
													<tr>
														<td width="70px">
															<input type="radio" dojoType="dijit.form.RadioButton" autocomplete="off" name="absoluteMonthlyPattern" id="absoluteMonthlyPatternEveryDay" value="selectedAbsoluteMonthlyPatternEveryDay"  onClick="resetAbsoluteMonthlyPatternFormValues()" /><label><b><bean:message key="job.cron.day.type.day" bundle="jobs"/></b></label>
														</td>
														<td colspan="2" style="padding-left:5px">
															<input type="text"  id="absoluteMonthlyDayInterval" name="absoluteMonthlyDayInterval" autocomplete="off" style="height:1.7em;width:100px;" dojoType="dijit.form.ValidationTextBox" maxlength="2" onKeyUp="return setmonthFocus();"/> <label><b><bean:message key="jobs.recur.ofeverymonthLabel" bundle="jobs"/></b></label>
														</td>

													</tr>

													<tr>
														<td colspan="2">
															<input type="radio" dojoType="dijit.form.RadioButton" name="absoluteMonthlyPattern" id="absoluteMonthlyPatternEveryMonth" autocomplete="off" value="selectedAbsoluteMonthlyPatternEveryMonth" onClick="resetAbsoluteMonthlyPatternFormValues()"/><label><b><bean:message key="jobs.recur.theLabel" bundle="jobs"/></b></label>
														</td>
														<td>
															<select  id="absoluteMonthlyWeekType" dojoType="dijit.form.FilteringSelect"  name="absoluteMonthlyWeekType" autocomplete="off"  value=''  onChange="return setmonthFocus();">
																<option value=''>
																	<bean:message key="validation.msg.select" bundle="splchvalidation"/>
																</option>
																<logic:present name="allWeekTypeMasterList">
																	<logic:iterate name="allWeekTypeMasterList" id="allWeekDtls">
																		<option value='<bean:write name="allWeekDtls" property="id"/>'>
																			<bean:message  bundle="jobs" name="allWeekDtls" property="type" />
																		</option>
																	</logic:iterate>
																</logic:present>
															</select>
														</td>
														<td>
															<select  id="absoluteMonthlyDayType" dojoType="dijit.form.FilteringSelect"  name="absoluteMonthlyDayType" autocomplete="off"  value='' onChange="return setmonthFocus();">
																<option value=''>
																	<bean:message key="validation.msg.select" bundle="splchvalidation"/>
																</option>
																<logic:present name="allDayTypeMasterList">
																	<logic:iterate name="allDayTypeMasterList" id="allDayDtls">
																		<option value='<bean:write name="allDayDtls" property="id"/>'>
																			<bean:message  bundle="jobs" name="allDayDtls" property="type" />
																		</option>
																	</logic:iterate>
																</logic:present>
															</select><label><b><bean:message key="jobs.recur.ofeverymonthLabel" bundle="jobs"/></b></label>
														</td>
													</tr>
												</table>
											</td>

											<!--  YEARLY PATTERN -->
											<td id="absoluteIntervalYearlyDIVLabelDtls" style="display:none">
												<table border="0" width="720px">
													<tr>
														<td width="70px">
															<input type="radio" dojoType="dijit.form.RadioButton" name="absoluteYearlyPattern" id="absoluteYearlyPatternEveryMonth" autocomplete="off" value="selectedAbsoluteYearlyPattern" onClick="resetAbsoluteYearlyPatternFormValues()" /><label><b><bean:message key="jobs.recur.everyLabel" bundle="jobs"/></b></label>
														</td>
														<td colspan="2" style="padding-left:5px">
															 <select  id="absoluteYearlyMonthType" dojoType="dijit.form.FilteringSelect"  name="absoluteYearlyMonthType" autocomplete="off"  value='' onChange="return setyearFocus();">
																<option value=''>
																	<bean:message key="validation.msg.select" bundle="splchvalidation"/>
																</option>
																<logic:present name="allMonthTypeMasterList">
																	<logic:iterate name="allMonthTypeMasterList" id="allMonthDtls">
																		<option value='<bean:write name="allMonthDtls" property="id"/>'>
																			<bean:message  bundle="jobs" name="allMonthDtls" property="type" />
																		</option>
																	</logic:iterate>
																</logic:present>
															</select>
														</td>
														<td colspan="1" >
															<input type="text"  id="absoluteYearlyDayInterval" name="absoluteYearlyDayInterval" autocomplete="off" style="height:1.7em;width:100px;" dojoType="dijit.form.ValidationTextBox" maxlength="2" onKeyUp="return setyearFocus();"/>
														</td>
													</tr>
													<tr>
														<td colspan="2">
															<input type="radio" dojoType="dijit.form.RadioButton" name="absoluteYearlyPattern" id="absoluteYearlyPatternEveryMonthDay" autocomplete="off" value="selectedAbsoluteYearlyPatternEveryMonthDay" onClick="resetAbsoluteYearlyPatternFormValues()"/><label><b><bean:message key="jobs.recur.theLabel" bundle="jobs"/></b></label>
														</td>
														<td>
															<select  id="absoluteYearlyMonthlyWeekType" dojoType="dijit.form.FilteringSelect"  name="absoluteYearlyMonthlyWeekType" autocomplete="off"  value='' onChange="return setyearFocus();">
																<option value=''>
																	<bean:message key="validation.msg.select" bundle="splchvalidation"/>
																</option>
																<logic:present name="allWeekTypeMasterList">
																	<logic:iterate name="allWeekTypeMasterList" id="allWeekDtls">
																		<option value='<bean:write name="allWeekDtls" property="id"/>'>
																			<bean:message  bundle="jobs" name="allWeekDtls" property="type" />
																		</option>
																	</logic:iterate>
																</logic:present>
															</select>
														</td>
														<td>
															<select  id="absoluteYearlyMonthlyDayType" dojoType="dijit.form.FilteringSelect"  name="absoluteYearlyMonthlyDayType" autocomplete="off"  value='' onChange="return setyearFocus();">
																<option value=''>
																	<bean:message key="validation.msg.select" bundle="splchvalidation"/>
																</option>
																<logic:present name="allDayTypeMasterList">
																	<logic:iterate name="allDayTypeMasterList" id="allDayDtls">
																		<option value='<bean:write name="allDayDtls" property="id"/>'>
																			<bean:message  bundle="jobs" name="allDayDtls" property="type" />
																		</option>
																	</logic:iterate>
																</logic:present>
															</select> <b> of</b>
														</td>
														<td>
															<select  id="absoluteYearlyMonthlyMonthType" dojoType="dijit.form.FilteringSelect"  name="absoluteYearlyMonthlyMonthType" autocomplete="off"  value='' onChange="return setyearFocus();">
																<option value=''>
																	<bean:message key="validation.msg.select" bundle="splchvalidation"/>
																</option>
																<logic:present name="allMonthTypeMasterList">
																	<logic:iterate name="allMonthTypeMasterList" id="allMonthDtls">
																		<option value='<bean:write name="allMonthDtls" property="id"/>'>
																			<bean:message  bundle="jobs" name="allMonthDtls" property="type" />
																		</option>
																	</logic:iterate>
																</logic:present>
															</select>
														</td>
													</tr>
												</table>
											</td>
											<td id="td_simpletriggernote" name="td_simpletriggernote" height="auto" width="450px" style="display:none;" > 
												<font class="simpletriggernote">
													<bean:message key="job.dst.message" bundle="jobs"/>
												</font>	
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<!---   DIV Ended for ABSOLUTE JOB  -->
				
				<tr>
					<td style="padding-left:67px;">
						<!--  File Clean up Timer   -->
						<div id="div4" style="display:none;" >
							<table width="100%" class="tableBgColor" border="0">
								<tr>
									<td class="pageTitle " style="padding-left:30px; padding-top:10px;" align="left">
										<bean:message key="jobs.filecleanupFieldset" bundle="jobs"/>
									</td>
								</tr>
								<tr>
									<td class="paddingTitleDesc" style="padding-left:31px;" align="left">
										<strong><bean:message key="jobs.fileCleanup.description" bundle="jobs"/></strong>
									</td>
								</tr>
								
								<tr>
									<td style="padding-top:30px">
										<table cellspacing="0" cellpadding="1" style="padding-left:30px">
                                        	<tr>
                                                <td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.directory" bundle="jobs"/></label><label class="error">*</label><b>:</b></td>
                                                <td align="left"><input type="text"  id="directory" name="directory" class="medium" style="height:1.7em;" autocomplete="off" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true"  /></td>
                                                <td width="30">&nbsp;</td>
                                                <td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.fileTypes" bundle="jobs"/></label><label class="error">*</label><b>:</b></td>
                                                <td align="left"><input type="text"  id="selectedFileType" name="selectedFileType" style="height:1.7em;" autocomplete="off" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true"  /></td>
												<td style="align:left;padding-left:2px;" width="18%"><bean:message key="jobs.fileType" bundle="jobs"/>
                                            </tr>
                                           	<tr height="10">
                                            	<td colspan="5">&nbsp;</td>
                                            </tr>    
                                            <tr>
                                                <td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.includeSubDirectory" bundle="jobs"/></label><b>:</b></td>
                                                <td align="left"><html:checkbox  name="AddJobForm" property="includeSubdirectories"  ></html:checkbox></td>
                                                <td>&nbsp;</td>
                                                <td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.fileCleanip.noOfDaysOld" bundle="jobs"/></label><b>:</b></td>
                                                <td align="left"><input type="text"  id="noOfDaysOld" name="noOfDaysOld" style="height:1.7em;" autocomplete="off" dojoType="dijit.form.NumberTextBox" constraints="{min:0,max:365,places:0}"  invalidMessage="The value entered is invalid" required="false" trim="true" ucfirst="true"  /></td>
                                            </tr>
                                        </table>
                                	</td>
								</table>
						</div>

						<!--  Custom-->
						<div id="div5" style="display:none;">
							<table class="tableBgColor">
								<tr height="10px">
									<td>&nbsp;
									</td>
								</tr>
								<tr>
									<td class="pageTitle" style="padding-left:30px;align:left;">
										<bean:message key="jobs.customFieldset" bundle="jobs"/>
									</td>
								</tr>
								<tr>
									<td class="paddingTitleDesc;align:left;" style="padding-left:30px;align:left;">
										<strong><bean:message key="jobs.customJob.description" bundle="jobs"/></strong>
									</td>
								</tr>
								<tr>
									<td height="13" colspan="8" align="left" class=""></td>
								</tr>
								<tr>
									<td style="padding-left:10px;">
										<table cellspacing="0" cellpadding="1" width="100%" border ="0">
											<tr>
												<td style="padding-left:0px;align:left;">
													<table cellspacing="0" cellpadding="0" border="0" align="left" >
														<tr>
															<td>
																<table cellpadding="0" cellspacing="" border="0" width="100%">
																	<tr>
																		<td height="27" align="right"  style="padding-right:10px;width:100px;" nowrap="nowrap" >
																			<label class="label"><bean:message key="jobs.timerClass" bundle="jobs"/></label><label class="error">*</label><b>:</b>
																		</td>
																		<td style="align:left;" width="90px">
																			<input type="text"  id="timerTask" name="timerTask" style="height:1.7em;" autocomplete="off"
																				dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true"    />
																		</td>
																	</tr>
																</table>
															</td>
															<td style="width:40px;">&nbsp;
															</td>
															<td align="center">
																<table cellpadding="10" cellspacing="0" border="0">
																	<tr>
																		<td height="27" align="left" style="width:80;">
																			<label class="label"><bean:message key="jobs.parameters" bundle="jobs"/></label><b>:</b>
																		</td>
																		<td style="padding-left:5px; align:left;" width="200px">
																			<textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" style="width:210px;height:80px;" id="timerParameterValueMap"
																				name="timerParameterValueMap" trim="true"></textarea>
																			<sub><bean:message key="jobs.suggestParams" bundle="jobs"/></sub>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td style="padding-left:30">&nbsp;
									</td>
									<td style="padding-left:30">&nbsp;
									</td>
								</tr>
							</table>
						</div>

						<!-- Cache Ecosystem  -->
						<div id="div6" style="display:none;">
							<table width="70%" class="tableBgColor" border="0">
								<tr height="10px">
									<td>&nbsp;
									</td>
								</tr>
								<tr>
									<td class="pageTitle " style="padding-left:30px;align:left;">
										<bean:message key="jobs.cacheechosyslist" bundle="jobs"/>
									</td>
								</tr>
								<tr>
								   <td class="paddingTitleDesc;align:left;" style="padding-left:30px;align:left;">
										<strong><bean:message key="jobs.clearCache.description" bundle="jobs"/></strong>
									</td>
								</tr>
								<tr>
									<td height="13" colspan="8" align="left" class=""></td>
								</tr>
								<tr>
									<td style="padding-left:30px;">
										<table cellspacing="0" cellpadding="1"  border="0" >
											<tr>
												<td style="align:left;">
													<table cellspacing="0" cellpadding="0" border="0" align="left" >
														<tr>
															<td align="left" >
																<table cellpadding="0" cellspacing="" border="0" >
																	<tr>
																		<td height="27" align="left"  style="padding-left:2px;width:156px;" nowrap="nowrap" >
																			<label class="label"><bean:message key="jobs.cacheechosyslist" bundle="jobs"/></label><label class="error">*</label><font style="font-weight: normal;" ><b>:</b></font>
																		</td>
																		<td style="align:left;" width="110px">
																			<select id="combobox1"   dojoType="dijit.form.MultiSelect" multiple name="combobox1"  autocomplete="off" size="10" ondblclick="return MoveItems('R', 0);" style="width:240px;">
																				<logic:present name="cacheList" scope="request">
																					<logic:iterate name="cacheList" id="cacheListID">
																						<option value='<bean:write name="cacheListID" property="cacheechosystem"/>'>
																							<bean:write name="cacheListID" property="cacheechosystem"/>
																						</option>
																					</logic:iterate>
																				</logic:present>
																			</select>
																		</td>
																	</tr>
																</table>
															</td>
															<td style="width:30px" valign="middle">
																<table>
																	<tr>
																		<td>
																			<img alt="" src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_move_right_one.png"  onclick="return MoveItems('R', 0);"  id="shift2" style="display:block;cursor:pointer" />
																		</td>
																	</tr>
																	<tr>
																		<td>
																			<img alt="" src="<%=ServerUtils.getContextName(request)%>/images/portal/btn_move_left_one.png"  onclick="MoveItems('L', 0);"  id="shift2" style="display:block;cursor:pointer" />
																		</td>
																	</tr>
																</table>
															</td>
															<td>
																<select id="combobox2" autocomplete="off"  dojoType="dijit.form.MultiSelect" multiple name="combobox2" style="width:240px;" size="10" ondblclick="return MoveItems('L', 0);">
																</select>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td style="padding-left:30px;width:600px">
										<table cellspacing="0" cellpadding="1" width="100%" border="0" align="left">
											<tr>
												<td style="align:left;">
													<table cellspacing="0" cellpadding="0" border="0" align="left" >
														<tr>
															<td>
																<table cellpadding="0" cellspacing="" border="0" width="100%">
																	<logic:present name="isCacheListAvail" scope="session">
																		<tr>
																			<td height="27" align="right" style="width: 120px" >
																				<label class="label">
																					<tr>
																						<td height="27" align="right" style="width: 180px" >
																							<label class="error">&nbsp;<bean:message key="jobs.iscachedArtifactAvail" bundle="jobs"/></label>
																						</td>
																					</tr>
																				</label>
																			</td>
																		</tr>
																	</logic:present>
																</table>
															</td>
															<td style="width:60px;">
															</td>
															<td align="center">
																<table cellpadding="" cellspacing="0" border="0">
																	<tr>
																		<td height="27" align="right" style="width:110;">
																		</td>
																		<td style="padding-left:10px; align:left;" width="90px">
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td style="padding-left:30">&nbsp;
									</td>
									<td style="padding-left:30">&nbsp;
									</td>
								</tr>
							</table>
						</div>

						<!-- PI DATA EXTRACTOR  -->
						<div id="div1" style="display:none;" >
							<table width="70%" class="tableBgColor" style="align:left" >
								<tr height="10px">
									<td>&nbsp;
									</td>
								</tr>
								<tr>
									<td class="pageTitle paddingTitle" style="padding-left:30px;align:left;">
										<bean:message key="jobs.pidbFieldset" bundle="jobs"/>
									</td>
								</tr>
								<tr>
									<td class="paddingTitleDesc" style="padding-left:30;" align="left">
										<strong><bean:message key="jobs.piData.description" bundle="jobs"/></strong>
									</td>
								</tr>
								<tr>
									<td height="13" colspan="2" align="left" class=""></td>
								</tr>
								<tr>
									<td style="padding-left:0px;" width = "100%">
										<table cellspacing="0" style="align:left" cellpadding="0"  width = "100%" border = "0">
											<tr>
												<td style="padding-left:30px;" width = "24%">
													<label class="label"><bean:message key="jobs.datasourceName" bundle="jobs"/></label><label class="error">*</label><b>:</b>
												</td>
												<td style="padding-left:8px;align:left;" width="76%">
													<select  id="dataSource" dojoType="dijit.form.FilteringSelect" name="dataSource" autocomplete="off">
														<option value="-1">
															<bean:message key="validation.msg.select" bundle="splchvalidation"/>
														</option>
														<%
														int count = datasourceArray == null ? 0 : datasourceArray.length;
														for (int i = 0; i < count; i++) { %>
															<option value="<%=datasourceArray[i].getId()%>"><%=ESAPI.encoder().encodeForHTML(datasourceArray[i].getDatasourceName())%> </option>
														<%} %>
													</select>
												</td>
											</tr>
											<tr>
												<td height="13" colspan="2" align="left" class=""></td>
											</tr>
											<tr>
												<td>&nbsp;</td>
												<td>&nbsp;<html:radio  name="AddJobForm" property="tags" value="tags"></html:radio>&nbsp;<label class="label"><bean:message key="jobs.tags" bundle="jobs"/></label>     &nbsp;<html:radio  name="AddJobForm" property="tags" value="query"></html:radio>&nbsp; <label class="label"><bean:message key="jobs.query"			bundle="jobs"/></label> &nbsp; &nbsp;<html:radio  name="AddJobForm" property="tags" value="custom"></html:radio>&nbsp; <label class="label"><bean:message key="jobs.custom" bundle="jobs"/></label>&nbsp;
												</td>
											</tr>
											<tr>
												<td height="13" colspan="2" align="left" class=""></td>
											</tr>
											<tr>
												<td style="padding-left:0px"  align="right">
													<label class="label"><bean:message key="jobs.tagqryOption" bundle="jobs"/></label><label class="error">*</label><b>:</b>
												</td>	
												<td style="padding-left:10px;align:left;"><textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" id="tagQuery"  style="width:270;height:5.7em;" name="tagQuery" style="height:1.7em;" trim="true"></textarea>
												</td>
											</tr>
											<tr>
												<td height="13" colspan="2" align="left" class=""></td>
											</tr>
											<tr>
												<td height="27" align="right" style="padding-left:0px;"><label class="label"><bean:message key="jobs.pilistener" bundle="jobs"/></label><b>:</b></td>
												<td style="padding-left:10px;align:left;width:200;"><textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" trim="true" id="pilistener"  name="piListener" style="width:270;height:5.7em;"  ></textarea>
												</td>
											</tr>
											<tr>
												<td height="13" colspan="2" align="left" class=""></td>
											</tr>
											<tr>
												<td align="right"><label class="label"><bean:message key="jobs.metadata" bundle="jobs"/></label><b>:</b>
												</td>
												<td height="27" align="left"  style="width:200px;" nowrap="nowrap" >&nbsp;
													<html:checkbox  name="AddJobForm" property="loadMetaData" ></html:checkbox><label class="label">&nbsp;
												</td>
											</tr>
											<tr>
												<td height="13" colspan="2" align="left" class=""></td>
											</tr>
											<tr>
												<td align="right">
												   <label class="label"><bean:message key="jobs.cachekey" bundle="jobs"/></label><b>:</b>
												</td>
												<td height="27"  style="align:left;width:160;"">
													&nbsp; <input type="text"  id="cacheKey" name="cacheKey" class="medium" style="height:1.7em;" autocomplete="off"
																		dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true"    />
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</div>

						<!--  URL Extractor -->
						<div id="div2" style="display:none;">
							<table width="70%" class="tableBgColor">
								<tr height="10px">
									<td>&nbsp;
									</td>
								</tr>
								<tr>
									<td class="pageTitle " style="padding-left:30px;align:left;">
										<bean:message key="jobs.urlExtractorFieldset" bundle="jobs"/>
									</td>
								</tr>
								<tr>
									<td class="paddingTitleDesc" style="padding-left:30px;">
										<strong><bean:message key="jobs.urlExtractor.description" bundle="jobs"/></strong>
									</td>
								</tr>
								<tr>
									<td height="13" colspan="8" align="left" class=""></td>
								</tr>
								<tr>
									<td style="padding-left:0px;width:900px">
										<table cellspacing="0" cellpadding="0" width="100%" >
											<tr>
												<td style="padding-left:0px;align:left;">
													<table cellspacing="0" cellpadding="0" border="0" align="left" >
														<tr>
															<td>
																<table cellpadding="10" cellspacing="" border="0" width="100%">
																	<tr>
																		<td height="27" align="right"  style="width:172px;" nowrap="nowrap" >
																			<label class="label"><bean:message key="jobs.urls" bundle="jobs"/></label><label class="error">*</label><b>:</b>
																		</td>
																		<td style="padding-left:8px; align:left;" width="325px" nowrap="nowrap">
																			<table id="mytable2">
																				<tr>
																					<td>
																						<input type="text" id="url1" name="url1" style="width:300px;height:1.7em;" autocomplete="off"
																							dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true"   /><a href="#" onClick="javascript:addRow('mytable2');"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_plus_1.png"  / ></a>
																					</td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																</table>
															</td>
															<td style="width:30px;">
															</td>
															<td align="center">
																<table cellpadding="" cellspacing="0" border="0">
																	<tr>
																		<td height="27" align="right" style="width:100;">
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td height="13" colspan="8" align="left" class=""></td>
								</tr>
								<tr>
									<td style="padding-left:30px;">
										<table cellspacing="0" cellpadding="0" width="100%" >
											<tr>
												<td style="padding-left:0px;align:left;">
													<table cellspacing="0" cellpadding="0" border="0" align="left">
														<tr>
															<td>
																<table cellpadding="10" cellspacing="" border="0" width="100%">
																	<tr>
																		<td height="27" align="right"  style="width:140px;" nowrap="nowrap" >
																			<label class="label"><bean:message key="jobs.destination" bundle="jobs"/></label><label class="error">*</label><b>:</b>
																		</td>
																		<td style="padding-left:8px;align:left;width:325;">
																			<input type="text" id="destination" name="destination" style="width:300px;height:1.7em;" autocomplete="off"
																						dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true"  />
																		</td>
																	</tr>
																</table>
															</td>
															<td style="width:30px;">
															</td>
															<td align="center">
																<table cellpadding="" cellspacing="0" border="0">
																	<tr>
																		<td height="27" align="right" style="width:100;">
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td height="13" colspan="8" align="left" class=""></td>
								</tr>
								<tr>
									<td style="padding-left:30px;width:900px">
										<table cellspacing="0" cellpadding="0" width="100%" >
											<tr>
												<td style="padding-left:0px;align:left;">
													<table cellspacing="0" cellpadding="0" border="0" align="left">
														<tr>
															<td>
																<table cellpadding="10" cellspacing="" border="0" width="100%">
																	<tr>
																		<td height="27" align="right"  style="width:140px;" nowrap="nowrap" >
																			<label class="label"><bean:message key="jobs.urlsTimeOut" bundle="jobs"/></label>&nbsp;<b>:</b>
																		</td>
																		<td style="padding-left:14px;align:left;width:325;">
																			<input type="text" id="urlTimeOut" name="urlTimeOut" style="width:300px;height:1.7em;" autocomplete="off" value="<%=ESAPI.encoder().encodeForHTML(AdminConfigUtils.getURLTimeOut())%>"
																				dojoType="dijit.form.NumberTextBox" constraints="{min:0,max:86400,places:0}" invalidMessage="The value entered is invalid" />

																		</td>
																	</tr>
																</table>
															</td>
															<td style="width:30px;">
															</td>
															<td align="center">
																<table cellpadding="" cellspacing="0" border="0">
																	<tr>
																		<td height="27" align="right" style="width:100;">
																			</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td height="13" colspan="8" align="left" class="bodytext"></td>
								</tr>
								<tr>
									<td style="padding-left:30px;width:900px">
										<table cellspacing="0" cellpadding="0" width="100%" >
											<tr>
												<td style="padding-left:0px;align:left;">
													<table cellspacing="0" cellpadding="0" border="0" align="left">
														<tr>
															<td>
																<table cellpadding="10" cellspacing="" border="0" width="100%">
																	<tr>
																		<td height="27" align="right"  style="width:140px;" nowrap="nowrap" >
																			<label class="label"><bean:message key="jobs.userId" bundle="jobs"/></label>&nbsp;<b>:</b>
																		</td>
																		<td height="27" align="left"  style="width:130px;padding-left:8px" nowrap="nowrap">&nbsp;	
																			<input type="text"  id="userId" name="userId"  class="medium1" ucfirst="true" style="height:1.7em;" maxlength="255" autocomplete="off"
																				dojoType="dijit.form.ValidationTextBox" trim="true" />
																		</td>
																	</tr>                 
																</table>
															</td>
															<td style="width:30px;">
															</td>
															<td align="left">
																<table cellpadding="10" cellspacing="0" border="0">
																	<tr>
																		<td height="27" align="right" style="padding-right:12px;width:80;">
																			<label class="label"><bean:message key="jobs.password" bundle="jobs"/></label><b>:</b>
																		</td>
																		<td height="27"  style="align:left;width:30;">
																			<input type="password"   id="password" name="password" class="medium"style="height:1.7em;" autocomplete="off"
																				dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" maxlength="255" />
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td style="padding-left:30px;width:900px">
										<table cellspacing="0" cellpadding="0" width="100%" >
											<tr>
												<td style="padding-left:0px;align:left;">
													<table cellspacing="0" cellpadding="0" border="0" align="left">
														<tr>
															<td>
																<table cellpadding="10" cellspacing="" border="0" width="100%">
																	<tr>
																		<td height="27" align="left"  style="width:280px;" nowrap="nowrap" >
																			<html:checkbox  name="AddJobForm" property="overwrite" ></html:checkbox>
																			<label class="label"><bean:message key="jobs.overwrite" bundle="jobs"/></label>
																			<html:checkbox  name="AddJobForm" property="extract" ></html:checkbox>
																			<label class="label"><bean:message key="jobs.extract" bundle="jobs"/></label>
																		</td>
																	</tr>
																</table>
															</td>
															<td style="width:30px;">
															</td>
															<td align="left">
																<table cellpadding="10" cellspacing="0" border="0">
																	<tr>
																		<td height="27" align="left" style="padding-right:0px;width:400;" nowrap="nowrap">
																			<html:checkbox  name="AddJobForm" property="extractChildDirectory" ></html:checkbox>
																			<label class="label"><bean:message key="jobs.extractChildDir" bundle="jobs"/></label>
																			<html:checkbox  name="AddJobForm" property="deleteSourceFile" ></html:checkbox>
																			<label class="label"><bean:message key="jobs.delSrcFile" bundle="jobs"/></label>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td style="padding-left:30">&nbsp;</td><td style="padding-left:30">&nbsp;
									</td>
								</tr>
							</table>
						</div>
				
						<!--   ECO SYSTEM-->
						<div id="div3" style="display:none;" >
							<table class="tableBgColor" width="900">
								<tr>
									<td class="pageTitle paddingTitle" style="padding-left:30px;align:left;">
										<bean:message key="jobs.ecosystemLabel" bundle="jobs"/>
									</td>
								</tr>
								<tr>
								   <td class="paddingTitleDesc" style="padding-left:30px;">
										<strong><bean:message key="jobs.ecosystem.description" bundle="jobs"/></strong>
									</td>
								</tr>
								<tr>
									<td height="13" colspan="2" align="left" class=""></td>
								</tr>
								<tr>
									<td style="padding-left:30px;">
                                    	<table cellpadding="0" cellspacing="0" border="0">
                                        	<!-- row template 
                                            <tr>
                                            	<td align="right" style="padding-right:5px">&nbsp;</td>
                                                <td align="left">&nbsp;</td>
                                                <td width="20">&nbsp;</td>
                                                <td align="right" style="padding-right:5px">&nbsp;</td>
                                                <td align="left">&nbsp;</td>
                                            </tr> 
                                            <tr>
                                            	<td colspan="5" height="10">&nbsp;</td>
                                            </tr>
                                            --> 
                                            <tr>
                                            	<td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.ecosystemLabel" bundle="jobs"/></label><label class="error">*</label><b>:</b></td>
                                                <td align="left">
                                                	<select  id="ecoSystemName" dojoType="dijit.form.FilteringSelect"  name="ecoSystemName"   autocomplete="off"   >
														<option value="">
															<bean:message key="validation.msg.select" bundle="splchvalidation"/>
														</option>
														<logic:present name="ecoModelFileList" scope="request">
															<logic:iterate name="ecoModelFileList" id="ecoModelFileDtls">
																<option value='<bean:write name="ecoModelFileDtls" property="ecoSystemFilePath"/>'>
																	<bean:write name="ecoModelFileDtls" property="ecoSystemName"/>
																</option>
															</logic:iterate>
														</logic:present>
													 </select>
                                                </td>
                                                <td width="20">&nbsp;</td>
                                                <td align="right" style="padding-right:5px">&nbsp;</td>
                                                <td align="left">&nbsp;</td>
                                            </tr>
                                            <tr>
                                            	<td colspan="5" height="10">&nbsp;</td>
                                            </tr> 
                                            <tr>
                                            	<td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.userId" bundle="jobs"/></label><label class="error"></label><b>:</b></td>
                                                <td align="left">
                                                	<input type="text"  id="ecoUserId" name="ecoUserId" class="medium" style="height:1.7em;" maxlength="255" autocomplete="off" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" />
                                                </td>
                                                <td width="20">&nbsp;</td>
                                                <td align="right" style="padding-right:5px">&nbsp;</td>
                                                <td align="left">&nbsp;</td>
                                            </tr>
                                            <tr>
                                            	<td colspan="5" height="10">&nbsp;</td>
                                            </tr> 
                                            <tr>
                                            	<td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.password" bundle="jobs"/></label><label class="error"></label><b>:</b></td>
                                                <td align="left"><input type="password"  id="ecoPassword" name="ecoPassword" class="medium" style="height:1.7em;" maxlength="255" autocomplete="off" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true"  /></td>
                                                <td width="20">&nbsp;</td>
                                                <td align="right" style="padding-right:5px">&nbsp;</td>
                                                <td align="left">&nbsp;</td>
                                            </tr>
                                            <tr>
                                            	<td colspan="5" height="10">&nbsp;</td>
                                            </tr>  
                                            <tr>
                                            	<td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.GenerateKMLKMZ" bundle="jobs" /></label>&nbsp;<b>:</b></td>
                                                <td align="left">
                                                	<select id="generateKML" dojoType="dijit.form.FilteringSelect" name="generateKML" autocomplete="off" property="generateKML">
														<option value="">
															<bean:message key="validation.msg.select" bundle="splchvalidation"/>
														</option>
														<option value="generateKML"><bean:message key="jobs.KML" bundle="jobs" />
														</option>
														<option value="generateKMZ"><bean:message key="jobs.KMZ" bundle="jobs" />
														</option>
													</select>
                                                </td>
                                                <td width="20">&nbsp;</td>
                                                <td align="right" style="padding-right:5px">&nbsp;</td>
                                                <td align="left">&nbsp;</td>
                                            </tr>
                                            <tr>
                                            	<td colspan="5" height="10">&nbsp;</td>
                                            </tr> 
                                            <tr>
                                            	<td align="right" style="padding-right:5px"><label class="label"><bean:message key="jobs.parameters" bundle="jobs"/></label><label class="error"></label><b>:</b></td>
                                                <td align="left">
                                                	<textarea dojoType="dijit.form.SimpleTextarea" style="width: 192px;" rows="5" cols="30" id="parameterValueMap" style="width:65%;height:6.5em;" name="parameterValueMap"></textarea> <br>
													<sub><bean:message key="jobs.suggestParams" bundle="jobs"/></sub>
                                                </td>
                                                <td width="20">&nbsp;</td>
                                                <td align="right" style="padding-right:5px">&nbsp;</td>
                                                <td align="left">&nbsp;</td>
                                            </tr>   
                                        </table>
										
									</td>
								</tr>
								<tr>
									<td height="13" colspan="8" align="left" class="bodytext"></td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
				<tr height="10px">
					<td>&nbsp;</td>
				</tr>
				<tr id="dependentTaskPanel" style="display:none">
					<td style="padding-left:67px;">
						<table class="tableBgColor"  border="0">
							<tr>
								<td>
									<table>
										<tr height="10px">
											<td>&nbsp;
											</td>
										</tr>
										<tr>
											<td class="pageTitle " style="padding-left:30px;align:left;">
												Dependent Tasks
											</td>
										</tr>
										<tr>
											<td class="paddingTitleDesc" style="padding-left:30px;">
												<strong>Provides provision to add dependent tasks</strong>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr height="10px">
											<td>&nbsp;
											</td>
							</tr>
							<tr>
								<td style="padding-left:30px;">
									
												<table  id="dependentTaskTable"  >
													<tr id="header">
														<th></th>
														<th><label class="label" valign= "bottom" >Task</label><label class="error">*</label><b>:</b></th>
														<th><label class="label"><bean:message key="jobs.run" bundle="jobs"/></label><label class="error">*</label><b>:</b></th>
														<th><label class="label">Type</label><label class="error">*</label><b>:</b></th>
														<th><label class="label" ><bean:message key="jobs.parameters" bundle="jobs"/>&nbsp;(<bean:message key="jobs.suggestParamsinshort" bundle="jobs"/>)</label><b>:</b></th>
														<th></th>
													</tr>
													<tr id="hrow">
														<td id="jobOrder1">
															<input type="radio" autocomplete="off"  name="jobOrder" style="align:center" onclick="validate()" />
														</td>	
														<td>
															<select  id="availableTasks1" dojoType="dijit.form.FilteringSelect"  name="availableTasks1"    autocomplete="off"    >
																<option value=" ">
																	<bean:message key="validation.msg.select" bundle="splchvalidation"/>
																</option>
																<logic:notEmpty name="allTasksList">
																	<logic:iterate name="allTasksList" id="allTaskDtls">
																		<option value='<bean:write name="allTaskDtls" property="id"/>'>
																			<bean:write name="allTaskDtls" property="name"/>
																		</option>
																	</logic:iterate>
																</logic:notEmpty>
															</select>
														</td>
														<td>	
															<select  id="availableTaskRunType1"    dojoType="dijit.form.FilteringSelect"  name="availableTaskRunType1"    autocomplete="off"   value='<bean:write name="AddJobForm" property="availableTaskRunType1" />'>
																<option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
																<option value="1">Once</option>
																<option value="2">Everytime</option>
															</select>
														</td>
														<td>
															<select  id="availableTaskType1"    dojoType="dijit.form.FilteringSelect"  name="availableTaskType1"    autocomplete="off"   value='<bean:write name="AddJobForm" property="availableTaskType1" />'>
																<option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
																<option value="1">Pre</option>
																<option value="2">Post</option>
															</select>
														</td>
														<td>
															<textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" id="availableTaskParamMap1" style="height:1.7em;width:20em" name="availableTaskParamMap1"></textarea>
														</td>
														<td>
															<a href="#" onclick="javascript:removeDependentRow('dependentTaskTable',this.parentNode.parentNode,1)"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_dash_1.png"  / ></a>
														</td>
													</tr>
												</table>
								</td>
								<td style="padding-top:20; padding-left:15;">
									<table>
										<tr>
										   <td>
										  <button  onClick="javascript:addDependentTaskRow('dependentTaskTable'); validate();return false;" style="background:url(<%=ServerUtils.getContextName(request)%>/images/portal/icon_plus_1.png) no-repeat center center; width: 30px; height: 25px;" />
										  </td>
										</tr>
										<tr>
										  <td style="padding-top:3px;">
										  <button style='background:url(<%=ServerUtils.getContextName(request)%>/images/icon_arrow_up.png) no-repeat center center; display:none; width: 30px; height: 25px;'  id="up_on"  onClick="getSelected(1);return false;"/> 
										  <button style='background:url(<%=ServerUtils.getContextName(request)%>/images/icon_arrow_up_grey.png) no-repeat center center;width: 30px; height: 25px;'  id="up_off" onClick="return false;"/>
										  </td>
										</tr>
										<tr>
										  <td style="padding-top:3px;">
										<button style='background:url(<%=ServerUtils.getContextName(request)%>/images/icon_arrow_down.png) no-repeat center center; display:none; width: 30px; height: 25px;' id="down_on"  onClick="getSelected(2);return false;"/>
										<button style='background:url(<%=ServerUtils.getContextName(request)%>/images/icon_arrow_down_grey.png) no-repeat center center; width: 30px; height: 25px; '  id="down_off" onClick="return false;"/>
										 </td>
										</tr>
									</table>
								</td>
							</tr>							
						</table>
					</td>
				</tr>
				<tr height="10px">
					<td>&nbsp;</td>
				</tr>
			</table>
		</td>
	</tr>

</table>
<table width = "101.2%" border="0" id="" cellspacing="0" cellpadding="0">
    <tr class="barColor">
        <td colspan="6" align="center">
            <button dojoType="dijit.form.Button" type="button" id="idHome" name="btnHome" onClick="window.location= '<%=ServerUtils.getContextName(request)%>/adminMain.do' ">
            <bean:message key="jobs.home" bundle="jobs"/>
            </button>

            <button dojoType="dijit.form.Button" type="button" id="idBack" name="btnBack" onClick="window.location= 'configureJobSchdAction.do?operation=view'">
            <bean:message key="jobs.back" bundle="jobs"/>
            </button>

            <button  dojoType="dijit.form.Button" type="button" id="idCreate" name="btnAdd" onClick="assignTotalNoOfURLS();assignTotalNoOfEcos();assignTotalNoOfDependentTasks(); return chkubmit(this);">
            <bean:message key="jobs.save" bundle="jobs"/>
            </button>

            <button dojoType="dijit.form.Button" type="reset" id="idReset" name="btnReset" onClick="clearTextArea();" onMouseOut="loadDefaultValues()">
            <bean:message key="jobs.reset" bundle="jobs"/>
            </button>
		</td>
    </tr>
</table>
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
<input type="hidden" name="operation" id="operation" value="" />
<input type="hidden"  name="encryptedPassword" id="encryptedPassword" />
<input type="hidden"  name="virtualPassword" id="virtualPassword" />
<input type="hidden" name="totalNoOfEcoSystems"  id="totalNoOfEcoSystems" value=""   />
<input type="hidden" name="totalNoOfDependentTasks" id="totalNoOfDependentTasks" value="" />
<input type="hidden" name="totalNoOfUrls" id="totalNoOfUrls" value="" />
</html:form>
<script>
dojo.addOnLoad(loadFormValues);
function loadFormValues(){
	resetViewSimpleTriggerNote('none');  
	dijit.byId('startTimeType').setValue('');
	dijit.byId('ecoSystemName').setValue('');
	//dijit.byId('ecoSystem1').setValue('');
	dijit.byId('generateKML').setValue('');
	dijit.byId('availableTaskRunType1').setValue('');
	dijit.byId('availableTaskType1').setValue('');
	
	
	if(null != <%=request.getAttribute("jobTypeId") %>) {
		dijit.byId('jobType').setValue('<%=request.getAttribute("jobTypeId") %>');
	} else {
		dijit.byId('jobType').setValue('-1');
	}
    document.forms[0].tags[0].checked=true;
    if(dijit.byId('startTimeType').value == START_JOB_ABSOLUTE){
		var obj = document.getElementById("dateDiv");
		obj.style.display = "block";
    }
    if(dijit.byId('jobType').value == JOB_TYPE_CLEAR_CACHE){
		<% if (pageContext.getRequest().getAttribute("cacheList")== null || ((ArrayList)(pageContext.getRequest().getAttribute("cacheList"))).size() == 0){ %> 
			dijit.byId('idCreate').setAttribute('disabled', true);
			dijit.byId('idReset').setAttribute('disabled', true);
        <% } %>
    }
    statusChange();
}

function loadDefaultValues(){
    dijit.byId('startTimeType').setValue(dijit.byId('startTimeType').value);
    dijit.byId('jobType').setValue(dijit.byId('jobType').value);
	dijit.byId('ecoSystemName').setValue(dijit.byId('ecoSystemName').value);
	//dijit.byId('ecoSystem1').setValue(dijit.byId('ecoSystem1').value);
	//dijit.byId('selectedEcoSystem1').setValue(dijit.byId('selectedEcoSystem1').value);
	dijit.byId('dataSource').setValue(dijit.byId('dataSource').value);
	
    document.forms[0].tags[0].checked=true;
}

function resetAbsoluteDailyPatternFormValues(){
	if(dijit.byId('absoluteDailyPatternEveryDay').checked){
		resetViewSimpleTriggerNote('');
	}else{
		resetViewSimpleTriggerNote('none');
	}
}

function addJobCheckBoxAlert(boxName){
	if(boxName.checked == true)
		showEmptyDialog("<bean:message key='jobs.server.msg.all' bundle='jobs'/>", "Info");
	else
        showEmptyDialog("<bean:message key='jobs.server.msg.specific' bundle='jobs'/>", "Info");
}

</script>
</body>
</html:html>