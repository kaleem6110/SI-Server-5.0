<%
	boolean  showCheckBox = false;
	List <ServerEnvMaster> allServerEnvList = (List) DataModelsCache.getInstance().retrieve(ServerEnvMaster.class.getName());
	if(allServerEnvList != null && allServerEnvList.size() > 1)
	showCheckBox = true;
	
	boolean  checkboxstatus = false;
	boolean checkboxdisable = false;
	String checkboxstatusStr = (String)request.getAttribute("checkboxstatus");
	if(checkboxstatusStr != null && "true".equals(checkboxstatusStr))
	checkboxstatus = true;
	if(checkboxstatusStr == null){
		checkboxdisable = false;
	}
	if(checkboxstatusStr != null && "true".equals(checkboxstatusStr)){
		checkboxdisable = true;
	}
	boolean  readOnly = false;
	String tmp = (String)request.getAttribute("mode");
	if(tmp != null && (tmp.equals("readonly") || tmp.equals("delete")))
		readOnly = true;
	else 
		readOnly = false;  

	boolean  checkBoxFlag = false;
	
	if(!checkboxstatus && formObj != null && StringUtils.isNull(formObj.getCommonJobFlag()) || (tmp != null && (tmp.equals("readonly")) ))
		checkboxstatus = true;

	List  allWeekTypeMasterList = (List) DataModelsCache.getInstance().retrieve(StiTriggerWeekTypeMaster.class.getName());

	if(allWeekTypeMasterList == null){
		StiTriggerWeekTypeMaster weekMasterDtls = new StiTriggerWeekTypeMaster();
		allWeekTypeMasterList = weekMasterDtls.retrieveAll();
	}
	pageContext.setAttribute("allWeekTypeMasterList", allWeekTypeMasterList);

	List  allDayTypeMasterList = (List) DataModelsCache.getInstance().retrieve(StiTriggerDayTypeMaster.class.getName());

	if(allDayTypeMasterList == null){
		StiTriggerDayTypeMaster dayMasterDtls = new StiTriggerDayTypeMaster();
		allDayTypeMasterList = dayMasterDtls.retrieveAll();
	}
	pageContext.setAttribute("allDayTypeMasterList", allDayTypeMasterList);
	 
	List  allMonthTypeMasterList = (List) DataModelsCache.getInstance().retrieve(StiTriggerMonthTypeMaster.class.getName());

	pageContext.setAttribute("allMonthTypeMasterList", allMonthTypeMasterList);

	com.spacetimeinsight.config.scheduler.Dependenttasks dependenttasks = formObj.getDependenttasks();
	int taskCount = -1;
	if (dependenttasks != null) {
		taskCount = dependenttasks.getDependenttaskCount();
	}
%>

<script>
// JOB Constants
var JOB_TYPE_ECOSYSTEM = "<%= JobConstants.JOB_TYPE_ECOSYSTEM+"" %>";
var JOB_TYPE_FILECLEANUP = "<%= JobConstants.JOB_TYPE_FILECLEANUP %>";
var JOB_TYPE_PIDATAEXTRACTOR = "<%= JobConstants.JOB_TYPE_PIDATAEXTRACTOR %>";
var JOB_TYPE_URLEXTRACTOR = "<%= JobConstants.JOB_TYPE_URLEXTRACTOR %>";
var JOB_TYPE_CUSTOM = "<%= JobConstants.JOB_TYPE_CUSTOM %>";
var JOB_TYPE_CLEAR_CACHE = "<%= JobConstants.JOB_TYPE_CLEAR_CACHE %>";

var START_JOB_ABSOLUTE = "<%= JobConstants.START_JOB_ABSOLUTE+"" %>"; //1
var START_JOB_AFTER_SERVER_START = "<%= JobConstants.START_JOB_AFTER_SERVER_START+"" %>"; //2
var START_JOB_EXPRESSION = "<%= JobConstants.START_JOB_EXPRESSION+"" %>"; //3

var REPEAT_TRIGGER_IN_SECONDS = "<%= JobConstants.REPEAT_TRIGGER_IN_SECONDS +"" %>"; 
var REPEAT_TRIGGER_IN_MINUTES = "<%= JobConstants.REPEAT_TRIGGER_IN_MINUTES +"" %>"; 
var REPEAT_TRIGGER_IN_HOURS = "<%= JobConstants.REPEAT_TRIGGER_IN_HOURS +"" %>"; 
var REPEAT_TRIGGER_IN_DAILY = "<%= JobConstants.REPEAT_TRIGGER_IN_DAILY +"" %>"; 
var REPEAT_TRIGGER_IN_WEEKLY = "<%= JobConstants.REPEAT_TRIGGER_IN_WEEKLY +"" %>"; 
var REPEAT_TRIGGER_IN_MONTHLY = "<%= JobConstants.REPEAT_TRIGGER_IN_MONTHLY +"" %>"; 
var REPEAT_TRIGGER_IN_YEARLY= "<%= JobConstants.REPEAT_TRIGGER_IN_YEARLY +"" %>"; 
var REPEAT_TRIGGER_IN_EXECUTEONCE = "<%= JobConstants.REPEAT_TRIGGER_IN_EXECUTEONCE +"" %>";

var	CRON_WEEK_TYPE_FIRST = "<%= JobConstants.CRON_WEEK_TYPE_FIRST +"" %>";
var	CRON_WEEK_TYPE_SECOND = "<%= JobConstants.CRON_WEEK_TYPE_SECOND +"" %>";
var	CRON_WEEK_TYPE_THIRD ="<%= JobConstants.CRON_WEEK_TYPE_THIRD +"" %>";
var	CRON_WEEK_TYPE_FOURTH ="<%= JobConstants.CRON_WEEK_TYPE_FOURTH +"" %>";
var	CRON_WEEK_TYPE_LAST = "<%= JobConstants.CRON_WEEK_TYPE_LAST +"" %>";

var addedURLRowsNumbers = "";
var addedDependentTasksNumbers = "";
var initial_task_count = new Array(); 
var rows_task_limit = 0;
var dbTaskColumnsArray = [];
var dependentTaskName = "";
var row_task_count = 0;
var isAddJob = false;

try{
	var countrownumber ;
	if(<%=taskCount%> == -1)
		countrownumber = 0;
	else
		countrownumber = <%=taskCount%>-1 ;
}
catch (ex) {
	alert(ex); 
}

function checkIntervalValue(){
	return isFraction(dijit.byId('interval').value,"Interval must be integer");
}

function  dodelete(){
	document.getElementById('operation').value = 'deleteJob';
	document.forms[0].action='configureJobSchdAction.do';
	document.forms[0].submit();
}

function checkBoxAlert(boxName){
	var msg ='<%=tmp%>';
	if(msg != null  && msg == 'delete') {
		if(boxName.checked == true) 
			showEmptyDialog("<bean:message key='jobs.delete.all' bundle='jobs'/>", "Error");
		else
			showEmptyDialog("<bean:message key='jobs.delete.this' bundle='jobs'/>", "Error");
	} else {
		if(boxName.checked == true) 
			showEmptyDialog("<bean:message key='jobs.update.all' bundle='jobs' />", "Error");
		else
			showEmptyDialog("<bean:message key='jobs.udpate.this' bundle='jobs' />", "Error");
	}
}

function showConcernDiv(){
	if(dijit.byId('startTimeType').value == START_JOB_ABSOLUTE){
		resetViewSimpleTriggerNote('none');
		document.getElementById('afterServerStartDivDtls').style.display = 'none';
		document.getElementById('expressionDivDtls').style.display = 'none';
		document.getElementById('absoluteDivDtls').style.display = '';
		resetSchedulerFormValues(START_JOB_ABSOLUTE);
		document.getElementById('recurrenceLabelDtls').style.display = '';
	}else if(dijit.byId('startTimeType').value == START_JOB_AFTER_SERVER_START){
		document.getElementById('afterServerStartDivDtls').style.display = '';
		document.getElementById('expressionDivDtls').style.display = 'none';
		document.getElementById('absoluteDivDtls').style.display = 'none';
		resetSchedulerFormValues(START_JOB_AFTER_SERVER_START);
		document.getElementById('recurrenceLabelDtls').style.display = '';
	}else if(dijit.byId('startTimeType').value == START_JOB_EXPRESSION){
		resetViewSimpleTriggerNote('none');
		document.getElementById('afterServerStartDivDtls').style.display = 'none';
		document.getElementById('expressionDivDtls').style.display = '';
		document.getElementById('absoluteDivDtls').style.display = 'none';
		resetSchedulerFormValues(START_JOB_EXPRESSION);
		document.getElementById('recurrenceLabelDtls').style.display = 'none';
	}else{
		resetViewSimpleTriggerNote('none');
		document.getElementById('afterServerStartDivDtls').style.display = 'none';
		document.getElementById('expressionDivDtls').style.display = 'none';
		document.getElementById('absoluteDivDtls').style.display = 'none';
		resetSchedulerFormValues('');
		document.getElementById('recurrenceLabelDtls').style.display = 'none';
	}
}

function updateDIVStyles(status){
	document.getElementById('afterServerStartDivDtls').style.display = '';
	document.getElementById('expressionDivDtls').style.display = '';
	document.getElementById('absoluteDivDtls').style.display = '';
}

function resetSchedulerFormValues(typeOfStartType){
	if(typeOfStartType != START_JOB_EXPRESSION){
		resetAbsoluteFormValues();
	}
	if(typeOfStartType == START_JOB_AFTER_SERVER_START){
		dijit.byId('startDate').setAttribute('disabled', true);
		dijit.byId('startTime').setAttribute('disabled', false);
		dijit.byId('startDate').setValue('');
	}else if(typeOfStartType == START_JOB_ABSOLUTE){
		resetTimestampComponent(false);
	}else if(typeOfStartType == START_JOB_EXPRESSION){
		resetTimestampComponent(false);	
	}else{
		resetTimestampComponent(false);
	}
}

function resetTimestampComponent(status){
	var isTaskFlag = document.getElementById('isTaskFlag');
	if(isTaskFlag != null && isTaskFlag.value == "Y"){
		dijit.byId('startDate').setAttribute('disabled', true);
		dijit.byId('startTime').setAttribute('disabled', true);
	}else{
		dijit.byId('startDate').setAttribute('disabled', status);
		dijit.byId('startTime').setAttribute('disabled', status);
	}

}

function resetAfterServerStartsFormValues(){
    if(dijit.byId('afterServerStartsPatternEvery').checked == true){
        resetDisableFlag(false);
    }else if(dijit.byId('afterServerStartsPatternOnce').checked == true){
        resetDisableFlag(true);
    }
}

function resetDisableFlag(status){
    if(status){
        dojo.byId('interval').value = ''; 
        dijit.byId('intervalType').setValue('');
    }
    dijit.byId('interval').setAttribute('disabled', status); 
    dijit.byId('intervalType').setAttribute('disabled', status);
}

function resetAbsoluteFormValues(){
    if(dijit.byId('cronTypeId').value  == REPEAT_TRIGGER_IN_SECONDS){
		resetViewSimpleTriggerNote('');
        resetViewAbsoluteSMHDIVDtls('');
        resetViewAbsoluteDailyDIVDtls('none');
        resetViewAbsoluteWeeklyDIVDtls('none');
        resetViewAbsoluteMonthlyDIVDtls('none');
        resetViewAbsoluteYearlyDIVDtls('none');
    }else if(dijit.byId('cronTypeId').value  == REPEAT_TRIGGER_IN_MINUTES){
		resetViewSimpleTriggerNote('');
        resetViewAbsoluteSMHDIVDtls('');
        resetViewAbsoluteDailyDIVDtls('none');
        resetViewAbsoluteWeeklyDIVDtls('none');
        resetViewAbsoluteMonthlyDIVDtls('none');
        resetViewAbsoluteYearlyDIVDtls('none');
    }else if(dijit.byId('cronTypeId').value  == REPEAT_TRIGGER_IN_HOURS){
		resetViewSimpleTriggerNote('');
        resetViewAbsoluteSMHDIVDtls('');
        resetViewAbsoluteDailyDIVDtls('none');
        resetViewAbsoluteWeeklyDIVDtls('none');
        resetViewAbsoluteMonthlyDIVDtls('none');
        resetViewAbsoluteYearlyDIVDtls('none');
    }else if(dijit.byId('cronTypeId').value  == REPEAT_TRIGGER_IN_DAILY){
		if(dijit.byId('absoluteDailyPatternEveryDay').checked){
			resetViewSimpleTriggerNote('');
		}else{
			resetViewSimpleTriggerNote('none');
		}
        resetViewAbsoluteSMHDIVDtls('none');
        resetViewAbsoluteDailyDIVDtls('');
        resetViewAbsoluteWeeklyDIVDtls('none');
        resetViewAbsoluteMonthlyDIVDtls('none');
        resetViewAbsoluteYearlyDIVDtls('none');
    }else if(dijit.byId('cronTypeId').value  == REPEAT_TRIGGER_IN_WEEKLY){
		resetViewSimpleTriggerNote('none');
        resetViewAbsoluteSMHDIVDtls('none');
        resetViewAbsoluteDailyDIVDtls('none');
        resetViewAbsoluteWeeklyDIVDtls('');
        resetViewAbsoluteMonthlyDIVDtls('none');
        resetViewAbsoluteYearlyDIVDtls('none');
    }else if(dijit.byId('cronTypeId').value  == REPEAT_TRIGGER_IN_MONTHLY){
		resetViewSimpleTriggerNote('none');
        resetViewAbsoluteSMHDIVDtls('none');
        resetViewAbsoluteDailyDIVDtls('none');
        resetViewAbsoluteWeeklyDIVDtls('none');
        resetViewAbsoluteMonthlyDIVDtls('');
        resetViewAbsoluteYearlyDIVDtls('none');
    }else if(dijit.byId('cronTypeId').value  == REPEAT_TRIGGER_IN_YEARLY){
		resetViewSimpleTriggerNote('none');
        resetViewAbsoluteSMHDIVDtls('none');
        resetViewAbsoluteDailyDIVDtls('none');
        resetViewAbsoluteWeeklyDIVDtls('none');
        resetViewAbsoluteMonthlyDIVDtls('none');
        resetViewAbsoluteYearlyDIVDtls('');
    }else if(dijit.byId('cronTypeId').value  == REPEAT_TRIGGER_IN_EXECUTEONCE){
		resetViewSimpleTriggerNote('none');
        resetViewAbsoluteSMHDIVDtls('none');
        resetViewAbsoluteDailyDIVDtls('none');
        resetViewAbsoluteWeeklyDIVDtls('none');
        resetViewAbsoluteMonthlyDIVDtls('none');
        resetViewAbsoluteYearlyDIVDtls('none');
    }else {
		resetViewSimpleTriggerNote('none');
        resetViewAbsoluteSMHDIVDtls('none');
        resetViewAbsoluteDailyDIVDtls('none');
        resetViewAbsoluteWeeklyDIVDtls('none');
        resetViewAbsoluteMonthlyDIVDtls('none');
        resetViewAbsoluteYearlyDIVDtls('none');
    }
}

function resetViewSimpleTriggerNote(status){
	if(document.getElementById('td_simpletriggernote') != null){
		document.getElementById('td_simpletriggernote').style.display = status;
	}
}

function resetViewAbsoluteSMHDIVDtls(status){
    document.getElementById('absoluteIntervalSMHDIVLabelDtls').style.display = status;
    document.getElementById('absoluteIntervalSMHDIVComponentDtls').style.display = status;
}

function resetViewAbsoluteDailyDIVDtls(status){
    document.getElementById('absoluteIntervalDailyDIVLabelDtls').style.display = status;
}

function resetViewAbsoluteWeeklyDIVDtls(status){
    document.getElementById('absoluteIntervalWeeklyDIVLabelDtls').style.display = status;
}

function resetViewAbsoluteMonthlyDIVDtls(status){
    document.getElementById('absoluteIntervalMonthlyDIVLabelDtls').style.display = status;
}

function resetViewAbsoluteYearlyDIVDtls(status){
    document.getElementById('absoluteIntervalYearlyDIVLabelDtls').style.display = status;
}

function setFocus(){
    if(dijit.byId('interval').attr('value').length > 0 || dijit.byId('intervalType').attr('value').length > 0){
        dijit.byId('afterServerStartsPatternEvery').setChecked(true);
    }
    return true;
}

function setdailyFocus(){
    if(dijit.byId('absoluteDailyInterval').attr('value').length > 0){
        dijit.byId('absoluteDailyPatternEveryDay').setChecked(true);
    }
    return true;
}

function setmonthFocus(){
    if(dijit.byId('absoluteMonthlyDayInterval').attr('value').length > 0){
        dijit.byId('absoluteMonthlyWeekType').setAttribute('disabled', true);
        dijit.byId('absoluteMonthlyDayType').setAttribute('disabled', true);
        dijit.byId('absoluteMonthlyPatternEveryDay').setChecked(true);
    }
    else if(dijit.byId('absoluteMonthlyWeekType').attr('value').length > 0 || dijit.byId('absoluteMonthlyDayType').attr('value').length > 0){
        dijit.byId('absoluteMonthlyDayInterval').setAttribute('disabled', true);
        dijit.byId('absoluteMonthlyPatternEveryMonth').setChecked(true);
    }
    return true;
}

function setyearFocus(){
    if(dijit.byId('absoluteYearlyMonthType').attr('value').length > 0 ||dijit.byId('absoluteYearlyDayInterval').attr('value').length > 0){
        dijit.byId('absoluteYearlyMonthlyWeekType').setAttribute('disabled', true);
        dijit.byId('absoluteYearlyMonthlyDayType').setAttribute('disabled', true);
        dijit.byId('absoluteYearlyMonthlyMonthType').setAttribute('disabled', true);
        dijit.byId('absoluteYearlyPatternEveryMonth').setChecked(true);
    }
    else if(dijit.byId('absoluteYearlyMonthlyWeekType').attr('value').length > 0 || dijit.byId('absoluteYearlyMonthlyDayType').attr('value').length > 0 || dijit.byId('absoluteYearlyMonthlyMonthType').attr('value').length > 0){
        dijit.byId('absoluteYearlyMonthType').setAttribute('disabled', true);
        dijit.byId('absoluteYearlyDayInterval').setAttribute('disabled', true);
        dijit.byId('absoluteYearlyPatternEveryMonthDay').setChecked(true);
    }
    return true;
}
	
function delAddedDependentTasksNumbers(tmp){
	var addedDependentTasks = new Array();
    addedDependentTasks = addedDependentTasksNumbers.split(',');
    for(countArr = 0;countArr < addedDependentTasks.length;countArr++){
        var tmp1 = addedDependentTasks[countArr];
        if(tmp == tmp1){
			addedDependentTasks[countArr] = 'n';
            break;
        }
    }
	addedDependentTasksNumbers = addedDependentTasks.join(",");
}

function removeDependentRow(tbl,row,prefix){
	var table=document.getElementById(tbl);
	if(table.rows.length==2)
	{
			showEmptyDialog('<bean:message key="jobs.thistask.cantbe.deleted" bundle="jobs"/>',POPUP_ALERT);
			return;
	}
	else
	{
	var table = document.getElementById(tbl);
	var rownum = row.rowIndex;
	 try	{
		table.deleteRow(rownum);
        delAddedDependentTasksNumbers(prefix);
		countrownumber--;
		validate();
		} catch (ex) {
		alert(ex);
		}
	}
}

var confDtls = null;
// modified to show confirmation before unchecking the dependent task 
function addDependentTasksPanel(cb, isClicked){
	var isChkd = (cb.checked) ? "yes" : "no";
	if(isChkd=="yes"){
		document.getElementById('dependentTaskPanel').style.display = "";
		if(dijit.byId('isTask').disabled != true) { 
		  dijit.byId('isTask').setAttribute('checked', false);
		  dijit.byId('isTask').setAttribute('disabled', true);
		}
	}else{
		if(addedDependentTasksNumbers!="" && !isAddJob && isClicked){    
	        confDtls = new dijit.Dialog({
            title:'Confirmation',
            style: "width: 350px;height:125px" }); 
			
			confDtls.attr("title",  'Confirmation');
            confDtls.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>Unchecking the checkbox will delete all the dependent tasks do you want to procced?</td></tr><tr><td align='center'>  <button dojoType='dijit.form.Button' onClick='confirmYes();confDtls.hide()' type='button'>Yes</button> <button dojoType='dijit.form.Button' onClick='confirmNo();confDtls.hide()' type='button'>No</button></td></td></tr></table></center>");
            confDtls.show();  
		}else {
			document.getElementById('dependentTaskPanel').style.display = 'none';
			if(dijit.byId('isTask').disabled != true) { 
				dijit.byId('isTask').setAttribute('checked', false);
				dijit.byId('isTask').setAttribute('disabled', false);
			}
		}
	}
}
function confirmNo(){
	dijit.byId('isTaskPresent').setAttribute('checked', true);
	return;
}

function confirmYes(){
		var cellId;
		if(document.getElementById("dependentTaskTable").rows != null ) {
			for(var i=document.getElementById("dependentTaskTable").rows.length-1;i>1;i--) {
				removeDependentRow("dependentTaskTable", document.getElementById("dependentTaskTable").rows[i], addedDependentTasksNumbers.split(',').length)
			}
			if(document.getElementById("dependentTaskTable").rows.length > 0) {
				cellId=document.getElementById("dependentTaskTable").rows[1].cells[0].id;
				index=cellId.substring(cellId.lastIndexOf("r")+1);
				dijit.byId("availableTasks"+index)._setValue('-- select --');
				dijit.byId("availableTaskRunType"+index)._setValue('-- select --');
				dijit.byId("availableTaskType"+index)._setValue('-- select --');
				document.getElementById("availableTaskParamMap"+index).value=" ";
			}
		}
	document.getElementById('dependentTaskPanel').style.display = 'none';
 }

function assignTotalNoOfDependentTasks(){
    if(document.getElementById('totalNoOfDependentTasks') != null){
	
		var table=document.getElementById('dependentTaskTable');
		var dtemp=new Array();
		var temp;
		var strt;
		var count=0;
		for(var i=0;i<table.rows.length;i++)
		{	
			strt=table.rows[i].cells[0].id;
			if(strt!='')
			{
			dtemp[count]=strt.substring(strt.lastIndexOf("r")+1);
			count++;
			}
		}
		document.getElementById('totalNoOfDependentTasks').value = dtemp;
	}
    return true;
}

function addDependentTaskRow(table_id){
	if(table_id == 'dependentTaskTable'){
		columnList = {identifier:"column",items:dbTaskColumnsArray};
		columnStore = new dojo.data.ItemFileReadStore({data: columnList});
		var tbl = document.getElementById(table_id);
		// counting rows in table
		row_task_count = tbl.rows.length;
		var dependentRowNumbersArray = new Array();
		dependentRowNumbersArray = addedDependentTasksNumbers.split(',');
		var prefix = dependentRowNumbersArray.length;
		var jobOrder="jobOrder"+prefix;
		var availableTaskParamMap="availableTaskParamMap"+prefix;
		availableTasks = "availableTasks" +  prefix;
		availableTaskRunType = "availableTaskRunType" + prefix;
		availableTaskType = "availableTaskType"+ prefix;
		addedDependentTasksNumbers = addedDependentTasksNumbers + prefix + ",";
		if (initial_task_count[table_id] == undefined){
			// if it is first adding in this table setting initial rows count
			initial_task_count[table_id] = row_task_count;
		}
		// determining real count of added fields
		var tFielsNum = row_task_count - initial_task_count[table_id];
		if (rows_task_limit!=0 && tFielsNum >= rows_task_limit){
			return false;
		}
		var text = 'Text field';
		try { 
			var newRow = tbl.insertRow(row_task_count);
			var newCell = newRow.insertCell(0);
			newCell.setAttribute("id",jobOrder);
			var input = '<input type="radio" autocomplete="off" name="jobOrder" style="align:center" onclick="validate()"/>';
			newCell.innerHTML=input;
			newCell=newRow.insertCell(1);
			input='<select  id="'+ availableTasks+'"  name="' + availableTasks + '"    autocomplete="off"><option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>' +
			<logic:notEmpty name="allTasksList">
				<logic:iterate name="allTasksList" id="allTaskDtls">
					'<option value="<bean:write name="allTaskDtls" property="id"/>"><bean:write name="allTaskDtls" property="name"/></option>'+
				</logic:iterate>
			</logic:notEmpty>
			'</select>';
			newCell.innerHTML=input;
			newCell=newRow.insertCell(2);
			input='<select id="'+availableTaskRunType+'"  name="'+availableTaskRunType +'" autocomplete="off"><option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option><option value="1">Once</option><option value="2">Everytime</option></select>';
			newCell.innerHTML=input;
			newCell=newRow.insertCell(3);
			input='<select id="'+availableTaskType+'"  name="'+availableTaskType +'" autocomplete="off"><option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option><option value="1">Pre</option><option value="2">Post</option></select>';
			newCell.innerHTML=input;
			newCell=newRow.insertCell(4);
			input='<textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" style="height:1.7em;width:20em" id="'+availableTaskParamMap+'" name="'+availableTaskParamMap+'"></textarea>';
			newCell.innerHTML=input;
			newCell=newRow.insertCell(5);
			input='<a href="#" onclick="javascript:removeDependentRow(\'dependentTaskTable\',this.parentNode.parentNode,'+ prefix +');"><img src="<%=ServerUtils.getContextName(request)%>/images/portal/icon_dash_1.png"  / ></a>';
			newCell.innerHTML =input;
			document.getElementById(availableTasks).value="";
			var taskNamefilteringSelectAsDependentTask = new dijit.form.FilteringSelect({
					id: availableTasks,
					name:availableTasks
				}, availableTasks);
			dijit.byId(taskNamefilteringSelectAsDependentTask).setValue('');

			var selectedTaskNamefilteringSelectAsRun = new dijit.form.FilteringSelect({
					id: availableTaskRunType,
					name:availableTaskRunType
				}, availableTaskRunType);

			dijit.byId(selectedTaskNamefilteringSelectAsRun).setValue('');
			
			var selectedTaskNamefilteringSelectAsType = new dijit.form.FilteringSelect({
					id: availableTaskType,
					name:availableTaskType
				}, availableTaskType);

			dijit.byId(selectedTaskNamefilteringSelectAsType).setValue('');
		} catch (ex) {
			alert(ex);
		}
	}
	countrownumber++;
}

function validate()
{
	var radio_group=document.forms[0].jobOrder;
	var sel_row=getCheckedRadio(radio_group)!= null ? getCheckedRadio(radio_group).parentNode.parentNode:null;
	var table=document.getElementById("dependentTaskTable");
if(sel_row != null)
 {	
     //Checking if there is only one row
	if(table.rows.length == 2)
	{
			enableUpButton(false);
			enableDownButton(false);
			return;
	}
	//checking if first row is selected,then disable up button
	if(table.rows[1]==sel_row)
	{
			enableUpButton(false);
			enableDownButton(true);
	}
	// if  last row is selected,then disable down button
	else if(table.rows[table.rows.length-1]==sel_row)
	{
			enableUpButton(true);
			enableDownButton(false);
	}
	else//otherwise enable both buttons
	{
			enableUpButton(true);
			enableDownButton(true);
	}
  }
  else
  {
			enableUpButton(false);
			enableDownButton(false);
	}
}
function enableUpButton(val)
{
	if(val){
		document.getElementById("up_on").style.display='';
		document.getElementById("up_off").style.display='none';
	}else{
		document.getElementById("up_on").style.display='none';
		document.getElementById("up_off").style.display='';
		
	}
}
function enableDownButton(val)
{
	if(val){
		document.getElementById("down_on").style.display='';
		document.getElementById("down_off").style.display='none';
	}
	else
	{
		document.getElementById("down_on").style.display='none';
		document.getElementById("down_off").style.display='';
	}
}
function  getSelected(type)
{
var fm=document.forms[0];
var checkedButton = getCheckedRadio(fm.jobOrder);
if(type==1)//up
swapRows(checkedButton.parentNode.parentNode,checkedButton.parentNode.parentNode.previousSibling);
else //down
swapRows(checkedButton.parentNode.parentNode, checkedButton.parentNode.parentNode.nextSibling);
validate();
}
function swapRows(obj1, obj2) {
    // create marker element and insert it where obj1 is
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);

    // move obj1 to right before obj2
    obj2.parentNode.insertBefore(obj1, obj2);

    // move obj2 to right before where obj1 used to be
    temp.parentNode.insertBefore(obj2, temp);

    // remove temporary marker node
    temp.parentNode.removeChild(temp);
}

function getCheckedRadio(radio_group) {
    
for (var i = 0; i < radio_group.length; i++) {
        var button = radio_group[i];
        if (button.checked) {
            return button;
        }
    }
//alert('returning null');
    return null;
}

</script>