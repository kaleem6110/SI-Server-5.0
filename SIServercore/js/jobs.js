var xmlhttpGetMsg;
function GetXmlHttpObject(){
    var objXMLHttp = null;
    if (window.XMLHttpRequest){
        objXMLHttp=new XMLHttpRequest();
    }else if (window.ActiveXObject){
        objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    return objXMLHttp;
}

function getShowHideCal()
{
    document.getElementById('div1').style.display = 'block';
    var obj = document.getElementById('startTimeType');
    for (var i=0; i<obj.options.length; i++){
     if (obj.options[i].selected==true){
          if(obj.options[i].value == '2')
          {
            var objDateDiv = document.getElementById('dateDiv');                
            objDateDiv.style.display = "block"; 
            var objTxt = document.getElementById('startTime');
            objTxt.style.display = "none";  
          }
          else
          {
            //var objDateTimeDiv = document.getElementById('dateTimeDiv');  
            var objDateDiv = document.getElementById('dateDiv');                
            //objDateTimeDiv.style = "display:block";
            objDateDiv.style.display = "none";          
            var objTxt = document.getElementById('startTime');
            objTxt.style.display = "block"; 

          }
     }
     }

}
     /*
	This method move the data from one multiselect box to Another Multiselect Box
	*/
	function MoveItems(Direction, All)
        {     var LstLeft;
            var LstRight;
            var Removed = '';
            var i;
            
            if (Direction == 'R')
            {
                var LstLeft = document.getElementById("combobox1");
                var LstRight = document.getElementById("combobox2");                
            }
            else
            {
                var LstLeft = document.getElementById("combobox2");
                var LstRight = document.getElementById("combobox1");                
            }   
            
               for (i=0; i<LstLeft.length; i++)
            {
                if (LstLeft.options[i].selected || All == 1) 
                    if(ItemExists(LstRight, LstLeft.options[i].value) == 0)
                    {
                        LstRight[LstRight.length] = new Option(LstLeft.options[i].text, LstLeft.options[i].value, true);
                        Removed = Removed + LstLeft.options[i].value + ',';
                    }
            }
            RemoveFromList(LstLeft, Removed);
            return false;            
        }
function RemoveFromList (Lst, Items)
        {
            var Removed = Items.split(',');
            var j;
            var x;
            for (j=0; j<Removed.length; j++)
            {
                for (x=0; x<Lst.length; x++)
                {
                    if (Lst.options[x] != null && Lst.options[x].value == Removed[j])
                    {
                        Lst.options[x] = null;
                    }
                }
            }
        }

		function ItemExists(Lst, value)
        {
            var Flag = 0;
            var i = 0;
            for (i=0; i<Lst.length; i++)
            {
                if (Lst.options[i].value == value)
                {
                    Flag = 1;
                    break;
                }
            }
            return Flag;
        }
    
       
 function statusChange() {
		
            if (dijit.byId('jobType').attr('value') == JOB_TYPE_ECOSYSTEM) {
                document.getElementById('div1').style.display = 'none';
                document.getElementById('div2').style.display = 'none';
                document.getElementById('div3').style.display = '';
                document.getElementById('div4').style.display = 'none';
                document.getElementById('div5').style.display = 'none';
				document.getElementById('div6').style.display = 'none';				
            }
            else if (dijit.byId('jobType').attr('value') == JOB_TYPE_FILECLEANUP) {
                document.getElementById('div1').style.display = 'none';
                document.getElementById('div2').style.display = 'none';
                document.getElementById('div3').style.display = 'none';
                document.getElementById('div4').style.display = '';
                document.getElementById('div5').style.display = 'none'; 
				document.getElementById('div6').style.display = 'none';

            }
            else if (dijit.byId('jobType').attr('value')== JOB_TYPE_PIDATAEXTRACTOR) {
                document.getElementById('div1').style.display = '';
                document.getElementById('div2').style.display = 'none';
                document.getElementById('div3').style.display = 'none';
                document.getElementById('div4').style.display = 'none';
                document.getElementById('div5').style.display = 'none';
				document.getElementById('div6').style.display = 'none';

            }
            else if (dijit.byId('jobType').attr('value') == JOB_TYPE_URLEXTRACTOR) {
                document.getElementById('div1').style.display = 'none';
                document.getElementById('div2').style.display = '';
                document.getElementById('div3').style.display = 'none';
                document.getElementById('div4').style.display = 'none';
                document.getElementById('div5').style.display = 'none'; 
				document.getElementById('div6').style.display = 'none';

                                             
            }
            else if (dijit.byId('jobType').attr('value')== JOB_TYPE_CUSTOM) {
                document.getElementById('div1').style.display = 'none';
                document.getElementById('div2').style.display = 'none';
                document.getElementById('div3').style.display = 'none';
                document.getElementById('div4').style.display = 'none';
                document.getElementById('div5').style.display = '';
			    document.getElementById('div6').style.display = 'none';

            }
            else if (dijit.byId('jobType').attr('value')== JOB_TYPE_CLEAR_CACHE) {
				document.getElementById('div1').style.display = 'none';
                document.getElementById('div2').style.display = 'none';
                document.getElementById('div3').style.display = 'none';
                document.getElementById('div4').style.display = 'none';
                document.getElementById('div5').style.display = 'none';
                document.getElementById('div6').style.display = '';

            }
            else{
                document.getElementById('div1').style.display = 'none';
                document.getElementById('div2').style.display = 'none';
                document.getElementById('div3').style.display = 'none';
                document.getElementById('div4').style.display = 'none';
                document.getElementById('div5').style.display = 'none';
                document.getElementById('div6').style.display = 'none';
            }
        }
       
       
function submitForm(btn) {
try{
      
	  if(btn.value =='Back'){
			window.location='configureJobSchdAction.do?operation=view';
		}else if(btn.value == 'Home'){
			window.location='displayPageAction.do';
		}else{
	       /* if(!validateSplOnTxtBox())
            {
                return false;
            }*/
			
			 if(!validateDependentTasks() || !chkForSpecialChars())
             {
                  return false;
             }
			
			if(!validateCommonFields())
				return false;

			var isValidForSubmit;
			var jobType = dijit.byId('jobType').value;
			
			
            if(jobType == JOB_TYPE_ECOSYSTEM){
				document.forms[0].operation.value =  "processEcoSystemJob";
				isValidForSubmit = validateEcoSystem('fromAddJob');
			} else if(jobType == JOB_TYPE_FILECLEANUP){
				document.forms[0].operation.value =  "processFileCleanupJob";
				isValidForSubmit = validateFileCleanup();
			} else if(jobType == JOB_TYPE_PIDATAEXTRACTOR){
				document.forms[0].operation.value =  "processPIDataExtractorJob";
				isValidForSubmit = validatePIDataExtractor();
			} else if(jobType == JOB_TYPE_URLEXTRACTOR){
				document.forms[0].operation.value =  "processURLExtractorJob";
				isValidForSubmit = validateURLExtractorJob('fromAddJob');
			} else if(jobType == JOB_TYPE_CUSTOM){
				document.forms[0].operation.value =  "processCustomJob";
				isValidForSubmit = validateCustomJob();
			}else if(jobType == JOB_TYPE_CLEAR_CACHE){
				document.forms[0].operation.value =  "processClearCacheJob";
				isValidForSubmit = validateClearCacheJob();
				callselectAll('combobox2');
			}

		if( !((document.getElementById('result').innerHTML.indexOf('Not') == -1) && (document.getElementById('result').innerHTML != '<B></B>'))){		
			showEmptyDialog(MSG_JOB_NOT_AVAIL,POPUP_ALERT);	
			return false;
		}
		

			if(!isValidForSubmit)
				return false;

		}
		
		dijit.byId('idCreate').setAttribute('disabled',true);
		
		}catch(er){alert(er);}
		 performSubmit() ;
	            
    }

function performSubmit() 
{
	
    if( dijit.byId('startTimeType').value == START_JOB_EXPRESSION){
	
        validateexpression();
        
	    } else{
			 dijit.byId('jobName').setAttribute('disabled', false);
			 dijit.byId('startTimeType').setAttribute('disabled', false);
			 dijit.byId('jobType').setAttribute('disabled', false);
		 document.forms[0].submit();
}
		
}
function callselectAll(selectName) 
{ var i; 
for(i=0;i<document.getElementById(selectName).length;i++) 
{ document.getElementById(selectName).options[i].selected = true;
}
}
	function validateCommonFields(){
		var jobName;
		var startTimerType;
		var startTime;
		var intervalType;
		var interval;
		var absoluteInterval;
		var jobType;
		var cronTypeId;
		var afterServerStartsSelectedValue;
		var isTask;
		
		jobName = trimAll(document.forms[0].jobName.value);
		if(jobName.length == 0){		    
			//alert("Please enter Job Name");	
			showEmptyDialog(MSG_PLS_ENTER_JOB,POPUP_ALERT);
			document.forms[0].jobName.focus();
			return false;
		}
		
         if(dijit.byId('description').attr('value').length > 500)
     {
       
         showEmptyDialog( MSG_LEN_LESS,POPUP_ALERT);
		 	dijit.byId('description').focus();	
			return false;
		 
     }
     isTask = dijit.byId('isTask').getValue();
     if(isTask == false){
		var startTimeType = dijit.byId('startTimeType').value;

		   if( startTimeType != null && startTimeType.length  == 0)     
            {
                showEmptyDialog(MSG_PLS_START_TYPE,POPUP_ALERT);
                return false;
            }

		var startDateTmp = document.getElementById('startDate').value;
		
        if(startDateTmp.length  == 0  && (startTimeType == START_JOB_ABSOLUTE)){
            if(!(startTimeType == START_JOB_ABSOLUTE && startTimeType.length  != 0) )    
            {
                showEmptyDialog(MSG_PLS_ENTER_APPR_DATE,POPUP_ALERT);
                return false;
            }
        }
		
		
	
		startTime = trimAll(dojo.byId('startTime').value);
		if(startTime.length == 0 ){
		   // alert(MSG_PLS_ENTER_HRMINSEC);
            if(startTimeType != START_JOB_EXPRESSION )   
            {
                showEmptyDialog(MSG_PLS_ENTER_HRMINSEC,POPUP_ALERT);
                document.forms[0].startTime.focus();
                return false;
            }
		}
		
		if(startTime.length > 0 ){
			var startTimeArray = startTime.split(":");
			if(isNaN(startTimeArray[0]) || startTimeArray[0].indexOf('-') != -1 ){
				showEmptyDialog(MSG_PLS_ENTER_VALID_HRMINSEC,POPUP_ALERT);
				document.forms[0].startTime.focus();
				return false;
			}

			if(isNaN(startTimeArray[1]) || startTimeArray[1].indexOf('-') != -1){
				showEmptyDialog(MSG_PLS_ENTER_VALID_HRMINSEC,POPUP_ALERT);
				document.forms[0].startTime.focus();
				return false;
			}

			if(isNaN(startTimeArray[2]) || startTimeArray[2].indexOf('-') != -1){
				showEmptyDialog(MSG_PLS_ENTER_VALID_HRMINSEC,POPUP_ALERT);
				document.forms[0].startTime.focus();
				return false;
			}
			if((startTimeArray.length-1) != 3){
					try{
					if(startTimeArray[0] > 23 || startTimeArray[0] < 0){
						showEmptyDialog( MSG_PLS_ENTER_HRS,POPUP_ALERT);
						document.forms[0].startTime.focus();
						return false;
					}
					if(startTimeArray[1] > 59 || startTimeArray[1] < 0){
						showEmptyDialog(MSG_PLS_ENTER_MINS,POPUP_ALERT);
						document.forms[0].startTime.focus();
						return false;
					}
					if(startTimeArray[2] > 59 || startTimeArray[2] < 0){
						showEmptyDialog(MSG_PLS_ENTER_SECS,POPUP_ALERT);
						document.forms[0].startTime.focus();
						return false;
					}
				}catch(err){
					showEmptyDialog(MSG_PLS_ENTER_HRMINSEC,POPUP_ALERT);
					document.forms[0].startTime.focus();
					return false;
				}
			}
			
				/*showEmptyDialog(MSG_PLS_ENTER_HRMINSEC, "Schedulers");
				document.forms[0].startTime.focus();
				return false; */
		}

		

		
		startDate = trimAll(dojo.byId('startDate').value);
		if(startDate.length == 0 && (startTimeType == START_JOB_ABSOLUTE || startTimeType != START_JOB_EXPRESSION) && startTime.length == 0){
		   // alert(MSG_PLS_ENTER_HRMINSEC);
		   showEmptyDialog(MSG_PLS_ENTER_DATE_TIME,POPUP_ALERT);
			document.forms[0].startTime.focus();
			return false;
		}


		cronTypeId = dijit.byId('cronTypeId').value;
		if(startTimeType == START_JOB_ABSOLUTE){
			if(cronTypeId == ''){
				showEmptyDialog(MSG_PLS_SEL_INTERVAL,POPUP_ALERT);
				return false
			}
            absoluteInterval = trimAll(dojo.byId('absoluteInterval').value);
			var validateStatus = validateAbsoluteJob(cronTypeId, absoluteInterval);
			if(!validateStatus){
				return false;
			}
        }
        else if(startTimeType == START_JOB_AFTER_SERVER_START){
			var checkedEvery = dijit.byId('afterServerStartsPatternEvery').checked;
			var checkedOnce = dijit.byId('afterServerStartsPatternOnce').checked;
			interval = trimAll(dojo.byId('interval').value);
			intervalTypeId = trimAll(dijit.byId('intervalType').value);
			var validateStatus;
			if(checkedEvery && !checkedOnce){
				validateStatus = validateAfterServerStart(interval);
			}else if( checkedOnce && !checkedEvery){
				validateStatus = true;
			}else if(!checkedOnce && !checkedEvery){
				showEmptyDialog(MSG_PLS_SEL_REC_TYPE,POPUP_ALERT);
				return false
			}
			if(!validateStatus){
				return false;
			}

			if(intervalTypeId == "" && !checkedOnce){
				showEmptyDialog(MSG_PLS_SEL_INTERVAL_TYPE,POPUP_ALERT);
				return false
			}	
        }else if(startTimeType == START_JOB_EXPRESSION && trimAll(dojo.byId('expression').value) == '') {
			showEmptyDialog(MSG_PLS_ENTER_VALID_EXP,POPUP_ALERT);
			return false
		}else{
			absoluteInterval = 0;
			interval = 0;
		}
	}

		jobType = trimAll(dijit.byId('jobType').value);
        if(jobType.length == 0 || jobType < 1){           
            showEmptyDialog(MSG_PLS_SEL_JOB,POPUP_ALERT);
			try{
		   document.forms[0].jobType.focus();
		   }catch(e){
		   
		   }
            return false;
        }
		
        return true;
    }

function validateAbsoluteJob(cronTypeId, absoluteInterval){
	if((cronTypeId == REPEAT_TRIGGER_IN_SECONDS) ||
		(cronTypeId == REPEAT_TRIGGER_IN_MINUTES) ||
		(cronTypeId == REPEAT_TRIGGER_IN_HOURS) ){
		return validateJobIntervalValue(absoluteInterval, '');
	}

	if(cronTypeId == REPEAT_TRIGGER_IN_DAILY && dijit.byId('absoluteDailyPatternEveryDay').checked){
		return validateJobIntervalValue(dojo.byId('absoluteDailyInterval').value, '');
	}

	if(cronTypeId == REPEAT_TRIGGER_IN_DAILY && !(dijit.byId('absoluteDailyPatternEveryWeekDay').checked || dijit.byId('absoluteDailyPatternEveryDay').checked)  ){
		 showEmptyDialog(MSG_PLS_CH_AVAIL_OPTION,POPUP_ALERT);
		 return false;
	}

	if(cronTypeId == REPEAT_TRIGGER_IN_WEEKLY ){
		if(!(dojo.byId('absoluteWeeklyPatternSunday').checked || dojo.byId('absoluteWeeklyPatternMonday').checked || dojo.byId('absoluteWeeklyPatternTuesday').checked ||  dojo.byId('absoluteWeeklyPatternWednesday').checked || dojo.byId('absoluteWeeklyPatternThursday').checked || dojo.byId('absoluteWeeklyPatternFriday').checked || dojo.byId('absoluteWeeklyPatternSaturday').checked )){
			showEmptyDialog(MSG_PLS_CH_AVAIL_OPTION,POPUP_ALERT);
			return false;
		}
		
	}
	
	

	if(cronTypeId == REPEAT_TRIGGER_IN_MONTHLY && 
		!(dijit.byId('absoluteMonthlyPatternEveryDay').checked || dijit.byId('absoluteMonthlyPatternEveryMonth').checked)){
		showEmptyDialog(MSG_PLS_CH_AVAIL_OPTION,POPUP_ALERT);
		return false;
	}
	
	if(cronTypeId == REPEAT_TRIGGER_IN_MONTHLY && dijit.byId('absoluteMonthlyPatternEveryDay').checked){
		if(!validateJobIntervalValue(dojo.byId('absoluteMonthlyDayInterval').value, 31)){
			return false;	
		}
	}
	
	
	
	if(cronTypeId == REPEAT_TRIGGER_IN_MONTHLY && dijit.byId('absoluteMonthlyPatternEveryMonth').checked){
		if(dijit.byId('absoluteMonthlyWeekType').value == ''){
			showEmptyDialog(MSG_PLS_CHK_WEEK,POPUP_ALERT);
			return false;
		}

		if(dijit.byId('absoluteMonthlyDayType').value == ''){
			showEmptyDialog(MSG_PLS_CHK_DAY,POPUP_ALERT);
			return false;
		}

				
	}

	
	

	if(cronTypeId == REPEAT_TRIGGER_IN_YEARLY && 
		!(dijit.byId('absoluteYearlyPatternEveryMonth').checked || dijit.byId('absoluteYearlyPatternEveryMonthDay').checked)){
		showEmptyDialog(MSG_PLS_CH_AVAIL_OPTION,POPUP_ALERT);
		return false;
	}


	if(cronTypeId == REPEAT_TRIGGER_IN_YEARLY && dijit.byId('absoluteYearlyPatternEveryMonth').checked){
		if(dijit.byId('absoluteYearlyMonthType').value == ''){
			showEmptyDialog(MSG_PLS_CHK_MONTH,POPUP_ALERT);
			return false;
		}		
		
		if(!validateJobIntervalValue(dojo.byId('absoluteYearlyDayInterval').value, 31)){
			return false;	
		}
		
	}

	if(cronTypeId == REPEAT_TRIGGER_IN_YEARLY && dijit.byId('absoluteYearlyPatternEveryMonthDay').checked){
		if(dijit.byId('absoluteYearlyMonthlyWeekType').value == ''){
			showEmptyDialog(MSG_PLS_CHK_WEEK,POPUP_ALERT);
			return false;
		}	

		if(dijit.byId('absoluteYearlyMonthlyDayType').value == ''){
			showEmptyDialog(MSG_PLS_CHK_DAY,POPUP_ALERT);
			return false;
		}	

		if(dijit.byId('absoluteYearlyMonthlyMonthType').value == ''){
			showEmptyDialog(MSG_PLS_CHK_MONTH,POPUP_ALERT);
			return false;
		}	

		
	}

	

	return true;
}

function validateAfterServerStart(intervalValue){
	return validateJobIntervalValue(intervalValue, '');
}

function validateJobIntervalValue(intervalValue, limitValue ){
	
	if(intervalValue.length == 0){
		showEmptyDialog(MSG_PLS_ENTER_INTERVAL,POPUP_ALERT);
		return false;
	}

	if(intervalValue < 1){
		showEmptyDialog(MSG_INTERVAL_INT_GRT_ZERO,POPUP_ALERT);   
        return false;
    }
	
	if(isNaN(intervalValue)==true){	
		showEmptyDialog(MSG_INTERVAL_INT,POPUP_ALERT);
        return false;
	}
	
	if(intervalValue.indexOf('.') > -1){
		showEmptyDialog(MSG_INTERVAL_INT,POPUP_ALERT);
        return false;
	}

	if(limitValue  != '' && intervalValue > limitValue){
		showEmptyDialog(MSG_INTERVAL_NOT_VALID_BE_LESS+limitValue,POPUP_ALERT);
        return false;
	}
	return true;
}

function validateEcoSystem(eventFrom){
    var ecosystemName;
    var ecoUserId;
    var ecoPassword;
    
    ecosystemName = trimAll(dijit.byId('ecoSystemName').value);
    if(ecosystemName.length == 0){
        //alert("Please select EcoSystem ");
        showEmptyDialog( MSG_PLS_SEL_ECOSYS,POPUP_ALERT);
		try{
        document.forms[0].ecoSystemName.focus();
		}catch(e){
		}
        return false;
    }
    ecoPassword = trimAll(dijit.byId('ecoPassword').value);
   if(eventFrom == 'fromAddJob'){
	if(!checkValidPassword(ecoPassword,dojo.byId('virtualPassword').value,true, false)){
		return false;
	}
   }
  
   //return validateDependentEcosystems();
   return true;
}

 


	function validateFileCleanup(){
		var directory;
		var fileTypes;
		
		directory = trimAll(dojo.byId('directory').value);
		if(directory.length == 0){
			//alert("Please enter Directory for Cleanup");
			showEmptyDialog(MSG_PLS_ENTER_DIR,POPUP_ALERT);
			document.forms[0].directory.focus();
			return false;
		}
		
		fileTypes = trimAll(dijit.byId('selectedFileType').attr('value'));
		//alert(fileTypes);
		if(fileTypes.length == 0){
				//alert("Please select Filetypes to delete");
				showEmptyDialog(MSG_PLS_ENTER_FILE,POPUP_ALERT);
			return false;
		}

		var noOfOldDays = trimAll(dojo.byId('noOfDaysOld').value);
		
		if(dojo.byId('noOfDaysOld') != null && (noOfOldDays < 0 || noOfOldDays > 365 || noOfOldDays.indexOf('.') != -1))
		{
			dojo.byId('noOfDaysOld').focus();
			showEmptyDialog(MSG_PLS_ENTER_VALID_RANGE,POPUP_ALERT);
			return false;
		}
		if( isNaN(noOfOldDays)==true)
		{
			showEmptyDialog(MSG_PLS_ENTER_VALID_NUM,POPUP_ALERT);
			return false;
		}
		
		return true;
	}

	function validatePIDataExtractor(){
		var dataSource;
		var tagQuery;
		
		dataSource = trimAll(dijit.byId('dataSource').attr('value'));
		if(dataSource.length == 0 || dataSource < 1){
			//alert("Please select PI DataSource");
			showEmptyDialog(MSG_PLS_SEL_PI_DS,POPUP_ALERT);
			try{
				document.forms[0].dataSource.focus();
			}catch(e){
			}
			return false;
		}
		
		tagQuery = trimAll(dijit.byId('tagQuery').attr('value'));
		if(tagQuery.length == 0){
			//alert("Please enter Tag/Query");
			showEmptyDialog(MSG_PLS_ENTER_TAG_QUERY,POPUP_ALERT);
			//document.forms[0].tagQuery.focus();
			return false;
		}

		/*piListener = trimAll(dijit.byId('pilistener').attr('value'));
		
		if(piListener.length == 0){
			//alert("Please enter Tag/Query");
			showEmptyDialog("Please enter Listener", "Schedulers");
			//document.forms[0].tagQuery.focus();
			return false;
		}*/
		return true;
	}
	
	function validateURLExtractorJob(eventFrom){
		var url1;
		var destDirectory;
		var user;
		var pwd;
		
		url1 = trimAll(dojo.byId('url1').value);
		if(url1.length == 0){
			//alert("Please enter Url");
			showEmptyDialog(MSG_PLS_ENTER_URL,POPUP_ALERT);
			document.forms[0].url1.focus();
			return false;
		}
		
		destDirectory = trimAll(dojo.byId('destination').value);
		if(destDirectory.length == 0){
			//alert("Please enter Destination Directory");
			showEmptyDialog(MSG_PLS_ENTER_DEST_DIR,POPUP_ALERT);
			document.forms[0].destination.focus();
			return false;
		}
		
		if(eventFrom == 'fromAddJob'){
			if(!checkValidPassword(dijit.byId('password').value,dojo.byId('virtualPassword').value,true, false)){
				return false;
			}
		}

		/*user = trimAll(dojo.byId('userId').value);
		if(user.length == 0){
			//alert("Please enter UserId");
			showEmptyDialog("Please enter UserId", "Schedulers");
			document.forms[0].userId.focus();
			return false;
		}
	
		pwd = trimAll(dojo.byId('password').value);
		if(pwd.length == 0){
			//alert("Please enter Password");
			showEmptyDialog("Please Enter Interval", "Schedulers");
			document.forms[0].password.focus();
			return false;
		} */
		return true;
	}

	function validateCustomJob(){
		var customTimerTask;
		customTimerTask = trimAll(dojo.byId('timerTask').value);
		if(customTimerTask.length == 0){
			//alert("Please enter Timer Task Class Name");
			showEmptyDialog(MSG_PLS_ENTER_TIMER,POPUP_ALERT);
			document.forms[0].timerTask.focus();
			return false;
		}
	   

		 return true;
	}

function validateClearCacheJob(){
        var filledComboBox2;
       filledComboBox2 = document.getElementById('combobox2');
        if(filledComboBox2.length == 0){
            //alert("Please enter Timer Task Class Name");
            showEmptyDialog(MSG_PLS_SEL_CACHED_ECOSYS ,POPUP_ALERT);
            return false;
        }
        return true;
    }

	function validateParameters(){
	
		var parameter;
		var value;
		
		parameter = trimAll(dojo.byId('parameter1').value);
		if(parameter.length == 0){
			//alert("Please enter Parameter");
			showEmptyDialog(MSG_PLS_ENTER_PARAM,POPUP_ALERT);
			document.forms[0].parameter1.focus();
			return false;
		}
		
		value = trimAll(dojo.byId('value1').value);
		if(value.length == 0){
			//alert("Please enter value for First Parameter");
			showEmptyDialog(MSG_PLS_ENTER_I_PARAM,POPUP_ALERT);
			document.forms[0].value1.focus();
			return false;
		}
	
		parameter = trimAll(dojo.byId('parameter2').value);
		value = trimAll(dojo.byId('value2').value);
		if(parameter.length > 0){
			if(value.length == 0){
				//alert("Please enter Value for Second  Parameter");
				showEmptyDialog(MSG_PLS_ENTER_II_PARAM,POPUP_ALERT);
					document.forms[0].value2.focus();
				return false;
			}
		}

		parameter = trimAll(dojo.byId('parameter3').value);
		value = trimAll(dojo.byId('value3').value);
		if(parameter.length > 0){
			if(value.length == 0){
				//alert("Please enter Value for Third  Parameter");
				showEmptyDialog(MSG_PLS_ENTER_III_PARAM,POPUP_ALERT);
				document.forms[0].value3.focus();
				return false;
			}
		}
	
		parameter = trimAll(dojo.byId('parameter4').value);
		value = trimAll(dojo.byId('value4').value);
		if(parameter.length > 0){
			if(value.length == 0){
				//alert("Please enter Value for Fourth  Parameter");
				showEmptyDialog(MSG_PLS_ENTER_IV_PARAM,POPUP_ALERT);
				document.forms[0].value4.focus();
				return false;
			}
		}

		
		parameter = trimAll(dojo.byId('parameter5').value);
		value = trimAll(dojo.byId('value5').value);
		if(parameter.length > 0){
			if(value.length == 0){
				//alert("Please enter Value for Fifth  Parameter");
				showEmptyDialog(MSG_PLS_ENTER_V_PARAM,POPUP_ALERT);
				document.forms[0].value5.focus();
				return false;
			}
		}
		return true;
	}
      
	function validateDependentEcosystems()
    { 
        var ecosystem;
        var selEcosystemValue;
        var tbl = document.getElementById("mytable1");
        // counting rows in table 
         rows_count = tbl.rows.length; 
        var rowNumbersArray = new Array();          
        rowNumbersArray = addedRowsNumbers.split(',');

       
       
        for(countArr = 0;countArr < rowNumbersArray.length;countArr++)
        {
            if(trimAll(rowNumbersArray[countArr]).length != 0 && trimAll(rowNumbersArray[countArr]) != "n" )    
            {   
                var ecosystemName = "ecoSystem" + rowNumbersArray[countArr] ;   
                var ecosystemNameObj = document.getElementById(ecosystemName);
                
               
                var ecosystemNameObjValue = "";
				if(ecosystemNameObj != null)		
					ecosystemNameObjValue =  dijit.byId(ecosystemName).attr('value');
                var selectedEcoSystem = "selectedEcoSystem" + rowNumbersArray[countArr] ;
				
				

                    var tmpSelectedEcoSystem = document.getElementById(selectedEcoSystem);
                    selEcosystemValue = tmpSelectedEcoSystem.value; 
					/*if(document.getElementById("ecoSystem1").value != '' && document.getElementById("ecoSystem1").value.length != 0){ 		
						
                     if(document.getElementById("selectedEcoSystem1").value == '' && document.getElementById("selectedEcoSystem1").value.length == 0){
                        showEmptyDialog("Please select run type value for dependent ecosystem ", "Schedulers");
	                       tmpSelectedEcoSystem.focus();
	                       return false;
					}
	                       
					}*/
				if(ecosystemNameObjValue != '' && ecosystemNameObjValue.length != 0){ 
	                     if(selEcosystemValue == '' && selEcosystemValue.length  == 0){
                        showEmptyDialog(MSG_PLS_SEL_VAL_ECOSYS,POPUP_ALERT);
	                     //  tmpSelectedEcoSystem.focus();
	                       return false;
					}
	                       
					}
					
				
           }              
        }
       return validateUniqueInEcosystems()
        return true;
    }
	
    var rows_count = "";
    function validateUniqueInEcosystems()
    { 
          var ecosystemString = "";
          var tbl = document.getElementById("mytable1"); 
          // counting rows in table 
            var rowNumbersArray = new Array();          
            rowNumbersArray = addedRowsNumbers.split(',');
            for(countArr = 0;countArr < rowNumbersArray.length;countArr++)
            {
                if(trimAll(rowNumbersArray[countArr]).length != 0 && trimAll(rowNumbersArray[countArr]) != "n" )    
                    {   
                    var ecosystemName = "ecoSystem" + rowNumbersArray[countArr] + "";   
                    var selectedEcoSystem = "selectedEcoSystem" + rowNumbersArray[countArr] + ""; 
                    var ecosystemObj = document.getElementById(ecosystemName);//alert("first loopeco" + ecosystemObj.value);
                    var ecosystemObjValue = trimAll(ecosystemObj.value);
                    ecosystemString = ecosystemString + " " + ecosystemObjValue;//alert("first loopseleco" + ecosystemObj.value);
                    //alert("ecosystemString"+ecosystemString);
                    }
            }   
        

        for(count = 0;count <  rowNumbersArray.length ; count++  ) 
        {
            if(rowNumbersArray[count] != "n" && rowNumbersArray[count].length != 0)     
            {   
                var ecosystemName = "ecoSystem" + rowNumbersArray[count] + "";  
                 var ecosystemObj = document.getElementById(ecosystemName);
                var occur = ecosystemString.split(ecosystemObj.value).length-1;
                var selectedEcoSystem = "selectedEcoSystem" + rowNumbersArray[count] + ""; 
                var selectedEcosystemObj = document.getElementById(selectedEcoSystem);
                var selectedEcosystemObjValue = trimAll(selectedEcosystemObj.value);
                var ecosystemObjVal = "";
                if(ecosystemObj != null)
                {
                    ecosystemObjVal = ecosystemObj.value;
                }
                if(occur > 1 ){
                if(ecosystemObjVal == "" )
                {
                  if(addedRowsNumbers == '1,')    
                  {
                      return true;
                  }
                  else
                  {
                      //showEmptyDialog("Please select valid value for dependent ecosystem", "Schedulers");
                       // return false;
                  }
                
                }
                /*else
                {
                    showEmptyDialog(ecosystemObj.value + MSG_IS_ALREADY_SEL,POPUP_ALERT);
                    return false;
                }*/
                }
            }
            
        }

        return validateUniqueInParamsEcosystem(trimAll(dijit.byId('parameterValueMap').attr('value')));
        return true;
    }
    
    
        function validateUniqueInParamsEcosystem(paramValueMap)
   { 
         //var paramValueMap = dijit.byId('parameterValueMap').attr('value');
        
         if(paramValueMap != "")
         {
            var paramValueMapArray= new Array();
            paramValueMapArray = paramValueMap.split(";");
            var parametersArray = new Array();
            for (var i=0; i<paramValueMapArray.length; i++){
                parametersArray[i]=paramValueMapArray[i].split("=")[0];
            }
            var paramString = "";
            for(j=0; j<parametersArray.length;j++){
                paramString += parametersArray[j] +" ";
            }
            var uniqueStatus = false;
            for(j=0; j<parametersArray.length-1;j++){
                uniqueStatus = false;       
                //alert(paramString +" -- > "+parametersArray[j]) ;
                var uniqueCount = 0;
                if(j == 0 ){
                    uniqueCount = paramString.split(parametersArray[j]+" ").length-1;
                }
                
                if(j == (parametersArray.length-2) ){
                    uniqueCount = paramString.split(" "+parametersArray[j]).length-1;
                }else{
                    uniqueCount = paramString.split(" "+parametersArray[j]+" ").length-1;
                }

                if(uniqueCount > 1){
                    uniqueStatus = true;                    
                    break;
                }
                if(uniqueStatus){
                    break;
                }               
            }
                
            if(uniqueStatus){
                showEmptyDialog(MSG_PARAMS_UNIQUE,POPUP_ALERT); 
                return false;
            }


            
         }
         
         return true;
    }

    

	function validateCustomParameters(){
		var parameter;
		var value;
		
		parameter = trimAll(dijit.byId('timerParameterValueMap').attr('value'));
		
		if(parameter.length == 0){
			//alert("Please enter Parameter");
			showEmptyDialog(MSG_PLS_ENTER_PARAM_PV,POPUP_ALERT);
            //Commented due to error message
			//document.forms[0].timerParameterValueMap.focus();
			return false;
		}
		
	
		return true;	
	}

	function trimAll(sString)
	{
	
	   /*
	   
	    if(sString=='undefined' || sString==null)
	        return "";
	        
	        */
	        	        	     	      	      	      
		while (sString.substring(0,1) == ' ')
		{
			sString = sString.substring(1, sString.length);
		}
		while (sString.substring(sString.length-1,  sString.length) == ' ')
		{
			sString = sString.substring(0,sString.length-1);
		}
		return sString;
	}

	
var paramDivs = 1;
var urlDivs = 1;
var ecoDivs = 1;
var timerParamDivs = 1;

function addRows1(divName) 
{
    
if(divName == 'paramDiv')
    {   
        if(paramDivs < 5)
        {
            ++paramDivs;
            var destinationTableObj = document.getElementById("paramDiv" + eval(paramDivs));
            if(destinationTableObj.style.display == "block")
            {
                for(count=2;count <= 5;count++)
                {
                    var destinationTableObj1 = document.getElementById("paramDiv" + count);
                    if(destinationTableObj1.style.display == "none")
                    {
                        destinationTableObj1.style.display = "block";   
                        break;
                    }
                }   
            }   
            else
            {
                destinationTableObj.style.display = "block";
            }

        }
        else
        {
            //alert("You are not permitted to add more than 5 parameters");
			showEmptyDialog(MSG_NO_MORE_PARAMS,POPUP_ALERT);
        }
    }
else if(divName == 'timerParamDiv')
    {   
        if(timerParamDivs < 5)
        {
            ++timerParamDivs;
            var destinationTableObj = document.getElementById("timerParamDiv" + eval(timerParamDivs));
            if(destinationTableObj.style.display == "block")
            {
                for(count=2;count <= 5;count++)
                {
                    var destinationTableObj1 = document.getElementById("timerParamDiv" + count);
                    if(destinationTableObj1.style.display == "none")
                    {
                        destinationTableObj1.style.display = "block";   
                        break;
                    }
                }   
            }   
            else
            {
                destinationTableObj.style.display = "block";
            }

        }
        else
        {
            //alert("You are not permitted to add more than 5 parameters");
			showEmptyDialog(MSG_NO_MORE_PARAMS,POPUP_ALERT);

        }
	}
    else if(divName == 'ecoDiv')
    {
        if(ecoDivs < 5)
        {
            ++ecoDivs;
            var destinationTableObj = document.getElementById("ecoDiv" + eval(ecoDivs));
            if(destinationTableObj.style.display == "block")
            {
                for(count=2;count <= 5;count++)
                {
                    var destinationTableObj1 = document.getElementById("ecoDiv" + count);
                    if(destinationTableObj1.style.display == "none")
                    {
                        destinationTableObj1.style.display = "block";   
                        break;
                    }
                }   
            }   
            else
            {
                destinationTableObj.style.display = "block";
            }
        }
        else
        {
            //alert("You are not permitted to add more than 5 ecosytems");
			showEmptyDialog(MSG_NO_MORE_ECOSYS,POPUP_ALERT);
        }
    }
    else if(divName == 'urlDiv')
    {
             if(urlDivs < 3)
        {
            ++urlDivs;
            var destinationTableObj = document.getElementById("urlDiv" + eval(urlDivs));
            if(destinationTableObj.style.display == "block")
            {
                for(count=2;count <= 3;count++)
                {
                    var destinationTableObj1 = document.getElementById("urlDiv" + count);
                    if(destinationTableObj1.style.display == "none")
                    {
                        destinationTableObj1.style.display = "block";   
                        break;
                    }
                }   
            }   
            else
            {
                destinationTableObj.style.display = "block";
            }

        }
        else
        {
            //alert("You are not permitted to add more than 3 URLs");
			showEmptyDialog(MSG_NO_MORE_URL,POPUP_ALERT);

        }
    }
    
    return ;
}
function deleteRows1(tmp,divName) {

 if(divName == 'paramDiv')
    {
        var destinationTableObj = document.getElementById("paramDiv" + eval(tmp));
        destinationTableObj.style.display = "none";
        --paramDivs;
    }

   else  if(divName == 'timerParamDiv')
   {
        var destinationTableObj = document.getElementById("timerParamDiv" + eval(tmp));
        destinationTableObj.style.display = "none";
        --timerParamDivs;
    }
    else if(divName == 'ecoDiv')
    {
        var destinationTableObj = document.getElementById("ecoDiv" + eval(tmp));
        destinationTableObj.style.display = "none";
        --ecoDivs;
    }
    else if(divName == 'urlDiv')    
    {
        var destinationTableObj = document.getElementById("urlDiv" + eval(tmp));
        destinationTableObj.style.display = "none";
        --urlDivs;
    }
        return;
}

function showAbsoluteDate(selectedObject)
    {
            if(selectedObject.value == START_JOB_ABSOLUTE)
            {  // document.getElementById('startTimeMand').innerHTML='<label class="error">*</label>';
               // document.getElementById('dateDiv').style.display='';
             //   document.getElementById('startTimeDiv').style.display='';
                //document.getElementById('startDate').value = '';
                document.getElementById('intervalDivId').style.display='block';
                //document.getElementById('startTime').value = '';
				dijit.byId('startDate').setAttribute('disabled', false);
            }
           
            else
            {  // document.getElementById('startTimeMand').innerHTML='<label class="error">*</label>';
               // document.getElementById('dateDiv').style.display='none';
               // document.getElementById('startTimeDiv').style.display='';
                //document.getElementById('startDate').value = '';
				if(document.getElementById('startDate').value != ''){
					document.getElementById('startDate').value = '';
				}
				dijit.byId('startDate').setAttribute('disabled', true);
                document.getElementById('intervalDivId').style.display='block';
                //document.getElementById('startTime').value = '';
			
            }
    }

var showAlert = 1;
function resetCredentials(obj, alertCount){

	if(obj.value !="" && (showAlert >= alertCount)){
		if(dijit.byId('ecoUserId').getValue() != '' )	
		showEmptyDialog(MSG_PLS_CHK_USERID_PWD,POPUP_ALERT);
	}
	showAlert++;
}

function chkForSpecialChars()
{

var jobType = dijit.byId('jobType').value;


var jobNameObj = document.forms[0].jobName; 
    if(jobNameObj != null)
    {
        if(jobNameObj.value != null && jobNameObj.value !='' ){
            if( checkSplCharJobName(jobNameObj.value))
            {
                return false;
            }
                
        }
    }
var userIdObj = dojo.byId('ecoUserId');

if(jobType == JOB_TYPE_ECOSYSTEM && userIdObj != null && userIdObj.value != null && userIdObj.value != '' ){
if(!validateSplOnTxtBox(userIdObj.value)){
            return false;
         }
 }
         
var pwdObj = dojo.byId('ecoPassword');

if( jobType == JOB_TYPE_ECOSYSTEM && pwdObj != null && pwdObj.value != null && pwdObj.value != '' ){
/*if(isSplChar(pwdObj.value)){
            return false;
         }*/
}         



var parameterValueMapObj = dijit.byId('parameterValueMap');

if( jobType == JOB_TYPE_CUSTOM && parameterValueMapObj != null &&  parameterValueMapObj.attr('value') != null && parameterValueMapObj.attr('value') != '' ){
  			
}

var directoryObj = dojo.byId('directory');
/*
if(jobType == JOB_TYPE_FILECLEANUP && directoryObj != null && directoryObj.value != null && directoryObj.value != '' ){
		if ( !directoryTxtBoxSplCh(directoryObj.value) ) {
			return false;
		}
 }
*/
var selectedFileTypeObj = dojo.byId('selectedFileType');

if(jobType == JOB_TYPE_FILECLEANUP && selectedFileTypeObj != null && selectedFileTypeObj.value != null && selectedFileTypeObj.value != '' ){
 if(!fileTypeSplCh(selectedFileTypeObj.value)){
            return false;
         }
 }


if(addedURLRowsNumbers != null && addedURLRowsNumbers.length != 0)
{
    var rowNumbersArray = new Array();          
    rowNumbersArray = addedURLRowsNumbers.split(',');
    for(count = 0;count < rowNumbersArray.length; count++)
    {
        var urlName = "url" + count;    
        var urlObj = dojo.byId(urlName);
      
			if(jobType == JOB_TYPE_URLEXTRACTOR && urlObj != null && urlObj.value != null && urlObj.value != '' ) {
			if ( !urlTxtBoxSplCh(urlObj.value) ) {
                return false;
            }
         }
    }

}

var destinationObj = dojo.byId('destination');
if(destinationObj != null) {
	if(jobType == JOB_TYPE_URLEXTRACTOR && destinationObj.value != null && destinationObj.value != '' ){
			if ( !directoryTxtBoxSplCh(destinationObj.value) ) {
				return false;
			}
	 }
}
 var userId1Obj = dojo.byId('userId');

if( jobType == JOB_TYPE_URLEXTRACTOR && userId1Obj != null && userId1Obj.value != null && userId1Obj.value != '' ){
if(!validateSplOnTxtBox(userId1Obj.value)){
            return false;
         }
 }
 
/*
var password1Obj = dojo.byId('password');
if(password1Obj != null)
if(password1Obj.value != null && password1Obj.value != '' ){
if(isSplChar(password1Obj.value)){
            return false;
         }
 }
*/

var tagQueryObj = dijit.byId('tagQuery');
if(jobType == JOB_TYPE_PIDATAEXTRACTOR && tagQueryObj != null){
    if(  tagQueryObj.attr('value') != null && tagQueryObj.attr('value') != '' ){
				// removed special character restrictions for pi tag query
                //if(isSplChar(tagQueryObj.attr('value')))    
                //{
                    //return false;               
                //}

    }
}

var pilistenerObj = dijit.byId('pilistener');
if(jobType == JOB_TYPE_PIDATAEXTRACTOR && pilistenerObj != null){
    if(pilistenerObj.attr('value') != null && pilistenerObj.attr('value') != '' ){
                if(!validateSplOnTxtBox(pilistenerObj.attr('value')))  
                {
                    return false;               
                }

    }
}


var cacheKeyObj = dijit.byId('cacheKey');
if(jobType == JOB_TYPE_CLEAR_CACHE && cacheKeyObj != null){
    if(cacheKeyObj.attr('value') != null && cacheKeyObj.attr('value') != '' ){
                if(!validateSplOnTxtBox(cacheKeyObj.attr('value')))    
                {
                    return false;               
                }

    }
}



var timerTaskObj = dijit.byId('timerTask');
if(jobType == JOB_TYPE_CUSTOM && timerTaskObj != null){
    if(timerTaskObj.attr('value') != null && timerTaskObj.attr('value') != '' ){
               if(!validateSplOnTxtBox(timerTaskObj.attr('value')))    
                {   timerTaskObj.focus();
					return false;               
                }  
				
    }
}


var timerParameterValueMapObj = dijit.byId('timerParameterValueMap');
if(jobType == JOB_TYPE_CUSTOM && timerParameterValueMapObj != null){
    if(timerParameterValueMapObj.attr('value') != null && timerParameterValueMapObj.attr('value') != ""){
		  return isValidParameters(timerParameterValueMapObj.attr('value') ,'true');
		          
		          /*      if(isSpecialCharInValue(timerParameterValueMapObj.attr('value'),"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz =;_\/:-,.\\()"))    
                {   timerParameterValueMapObj.focus();
					showEmptyDialog("Special characters other than =;_/:-,.\() are not allowed in Parameters field", "Schedulers");	
					return false;               
                }
*/
    }
}
return true; 
}

function isValidParameters(paramteres,paramteresAllowNull){
	
	
	if(paramteres.length < 1){
	
			if(paramteresAllowNull != null && paramteresAllowNull != 'true'){

				showEmptyDialog(MSG_PARAMS_NOT_EMPTY,POPUP_ALERT); 

				return false;
					
			}else{
			
				return true;
				
			}
			
	}
	
	var splitVar = paramteres.split(";");
	if(splitVar.length != 0){
		for(var i=0;i<splitVar.length;i++)
		{ 
			var tempVar = splitVar[i];
			if(tempVar.length > 0){
				var splitVar2 = tempVar.split("=");
				
				if((splitVar2.length-1) == 0){
					showEmptyDialog(MSG_PARAMS_NOT_EMPTY,POPUP_ALERT);
					return  false;
				}
				for(var j=0;j<splitVar2.length;j++){
					if((splitVar2[j].length) == 0){
						showEmptyDialog(MSG_PLS_CORRECT_PARAMS,POPUP_ALERT);
						return  false;
					}
				}
			}
		}
 	}else{
		showEmptyDialog(MSG_PLS_CORRECT_PARAMS,POPUP_ALERT);
		return  false;
	}
	
	return true;
}
function isFraction(str,messageToDisplay){

	if(str != null && str.length > 0){
		
		var dotIndex = str.indexOf(".");		
		if(dotIndex != -1){
			showEmptyDialog(messageToDisplay,POPUP_ALERT);
			return true;
		}
	}
	
	return false;

}

	
	function checkSplCharJobName(str) {                
	
			if (!ajaxTxtBoxSplCh(str)) {                                           
				return true;
			} else {
				return false;
			}
		}

function isValidUsernamePassword(userName,password){
	if(userName == null || trimAll(userName).length == 0){
		if(password != null && trimAll(password).length > 0){
			return false;
		}
	}
	
	return true;
}
  var isSubmit =false;
    function validateexpression(){
	var startTimeType = dijit.byId('startTimeType').value;
          if(startTimeType == START_JOB_EXPRESSION )
         {		
			  xmlhttpGetMsg = GetXmlHttpObject();
	              xmlhttpGetMsg.onreadystatechange = performvalidateexpression;  
                  var  url = "JobBaseAction.do?operation=validateExpression&expression="+dijit.byId('expression').attr('value')+ '&csrf=' + document.getElementById('csrf').value;
                  xmlhttpGetMsg.open("POST",url,true);
                  xmlhttpGetMsg.send(null);
	
				
            }
}

function performvalidateexpression(){

    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
	
		   var msgDOM = xmlhttpGetMsg.responseXML;
			
        try{
						
                var root = msgDOM.getElementsByTagName("expression")[0];
                var load = root.getElementsByTagName("result");
              
				if(load[0].firstChild.nodeValue == 'fail')
				   {
			     	showEmptyDialog(MSG_CRON_NOTT_VALID, POPUP_ALERT);  
			     	dijit.byId('idCreate').setAttribute('disabled', false);
				}
				else{
                   dijit.byId('jobName').setAttribute('disabled', false);
				   dijit.byId('startTimeType').setAttribute('disabled', false);
				   dijit.byId('jobType').setAttribute('disabled', false);
				   document.forms[0].submit();
				}
                
            }catch(er1){
                
            }
            
	}
	//hideProgressDialog();
}



function resetAbsoluteYearlyPatternFormValues(){
	if(dijit.byId('absoluteYearlyPatternEveryMonth').checked == true){
		resetAbsoluteYearlyState(true, 'everymonth');
		dijit.byId('absoluteYearlyPatternEveryMonth').setChecked(true);	
		dijit.byId('absoluteYearlyPatternEveryMonthDay').setChecked(false);
		dijit.byId('absoluteYearlyMonthType').setAttribute('disabled', false);
		dijit.byId('absoluteYearlyDayInterval').setAttribute('disabled', false);
	}else if(dijit.byId('absoluteYearlyPatternEveryMonthDay').checked == true){
		resetAbsoluteYearlyState(true, 'yearly');
	}
}

function resetAbsoluteYearlyState(status, selectedState){
	if(selectedState == 'everymonth'){
		dijit.byId('absoluteYearlyDayInterval').setAttribute('disabled', false); 	
		dijit.byId('absoluteYearlyMonthType').setAttribute('disabled', false);
		dijit.byId('absoluteYearlyMonthlyWeekType').setAttribute('disabled', true);
		dijit.byId('absoluteYearlyMonthlyDayType').setAttribute('disabled', true);
		dijit.byId('absoluteYearlyMonthlyMonthType').setAttribute('disabled', true);		
	}else if(selectedState == 'yearly'){
		dijit.byId('absoluteYearlyDayInterval').setAttribute('disabled', true); 	
		dijit.byId('absoluteYearlyMonthType').setAttribute('disabled', true);
		dijit.byId('absoluteYearlyMonthlyWeekType').setAttribute('disabled', false);
		dijit.byId('absoluteYearlyMonthlyDayType').setAttribute('disabled', false);
		dijit.byId('absoluteYearlyMonthlyMonthType').setAttribute('disabled', false); 	
	}

	dojo.byId('absoluteYearlyDayInterval').value = ''; 	
	dijit.byId('absoluteYearlyMonthType').setValue('');
	dijit.byId('absoluteYearlyMonthlyWeekType').setValue('');
	dijit.byId('absoluteYearlyMonthlyDayType').setValue('');
	dijit.byId('absoluteYearlyMonthlyMonthType').setValue('');
	
	
}



function resetAbsoluteMonthlyPatternFormValues(){
	if(dijit.byId('absoluteMonthlyPatternEveryDay').checked == true){
		resetAbsoluteMonthlyState(true, 'everyday');
		dijit.byId('absoluteMonthlyPatternEveryDay').setChecked(true);	
		dijit.byId('absoluteMonthlyPatternEveryMonth').setChecked(false);
		dijit.byId('absoluteMonthlyDayInterval').setAttribute('disabled', false);
	}else if(dijit.byId('absoluteMonthlyPatternEveryMonth').checked == true){
			resetAbsoluteMonthlyState(true, 'everymonth');
		}
}

function resetAbsoluteMonthlyState(status, selectedState){
	if(selectedState == 'everyday'){
		dijit.byId('absoluteMonthlyDayInterval').setAttribute('disabled', false); 	
		dijit.byId('absoluteMonthlyDayType').setAttribute('disabled', true);
		dijit.byId('absoluteMonthlyWeekType').setAttribute('disabled', true);
	}else if(selectedState == 'everymonth'){
		dijit.byId('absoluteMonthlyWeekType').setAttribute('disabled', false);
		dijit.byId('absoluteMonthlyDayType').setAttribute('disabled', false);	
		dijit.byId('absoluteMonthlyDayInterval').setAttribute('disabled', true); 	
	}

	dojo.byId('absoluteMonthlyDayInterval').value = ''; 	
	dijit.byId('absoluteMonthlyWeekType').setValue('');
	dijit.byId('absoluteMonthlyDayType').setValue('');
	
	
}


function resetAbsoluteDailyPatternFormValues(){
	if(dijit.byId('absoluteDailyPatternEveryDay').checked == true){
		resetAbsoluteDailyState(false);
	}else if(dijit.byId('absoluteDailyPatternEveryWeekDay').checked == true){
		resetAbsoluteDailyState(true);
	}
}

function resetAbsoluteDailyState(status){
	if(status){
		dojo.byId('absoluteDailyInterval').value = ''; 		
	}
	dijit.byId('absoluteDailyInterval').setAttribute('disabled', status); 	
}
function validateDependentTasks(){
     var table = document.getElementById('dependentTaskTable');
	 var cellId;
	 var availableTasks;
	 var availableTaskType;
	 var availableTaskRunType;
	 var availableTaskParams;
	 var index;
	 var isValid=true;
	if(dijit.byId('isTaskPresent').checked){
		for(var i=1;i<table.rows.length;i++)
		{	
			 cellId= table.rows[i].cells[0].id;
			if(cellId != ''){
			index = cellId.substring(cellId.lastIndexOf("r")+1);
			availableTasks=dijit.byId('availableTasks'+index);
			availableTaskRunType=dijit.byId('availableTaskRunType'+index);
			availableTaskType=dijit.byId('availableTaskType'+index);
			availableTaskParams=dijit.byId('availableTaskParamMap'+index);
			
			/*availableTasks=document.getElementById('availableTasks'+index);
			availableTaskRunType=document.getElementById('availableTaskRunType'+index);
			availableTaskType=document.getElementById('availableTaskType'+index);
			availableTaskParams=document.getElementById('availableTaskParamMap'+index);
			*/
				if(availableTasks.value == '' || availableTasks.value == MSG_SELECT  ||  availableTaskRunType.value=='' || availableTaskRunType.value == MSG_SELECT || availableTaskType.value == '' || availableTaskType.value == MSG_SELECT){
					isValid=false;
					showEmptyDialog(VALIDATE_DEPENDENT_TASKS,POPUP_ALERT);
					break;
					}
			}
		}
		if(isValid){
			isValid=validateDuplicateTasks();
			if(!isValid)
			showEmptyDialog(VALIDATE_DUPLICATE_DEPENDENT_TASKS,POPUP_ALERT);
		}
	}
	return isValid;
}
function  validateDuplicateTasks()
{
	var dep_table=document.getElementById('dependentTaskTable');
	var isValid=true;
	var  cellId,cellIdTemp;
	var   index,indexTemp;
	var tasks,availableTasks;
	var taskRunType,availableTaskRunType;
	var taskType,availableTaskType;
	var taskParams,availableTaskParams;
	
	for(var i=1; i<dep_table.rows.length; i++)
	{
		cellId               = dep_table.rows[i].cells[0].id;
		index                = cellId.substring(cellId.lastIndexOf("r")+1);
		availableTasks       = document.getElementById('availableTasks'+index);
		availableTaskRunType = document.getElementById('availableTaskRunType'+index);
		availableTaskType    = document.getElementById('availableTaskType'+index);
		availableTaskParams  = document.getElementById('availableTaskParamMap'+index).value.toString().trim();
		for(var j=i+1; j<dep_table.rows.length; j++)
		{
			cellIdTemp      = dep_table.rows[j].cells[0].id;
			indexTemp       = cellIdTemp.substring(cellId.lastIndexOf("r")+1);
			tasks           = document.getElementById('availableTasks'+indexTemp).value;
			taskRunType     = document.getElementById('availableTaskRunType'+indexTemp).value;
			taskType        = document.getElementById('availableTaskType'+indexTemp).value;
			taskParams      = document.getElementById('availableTaskParamMap'+indexTemp).value.toString().trim();
		  //  taskParams=dijit.byId('availableTaskParamMap'+index).textbox.value;
			if( tasks==availableTasks.value && taskRunType ==availableTaskRunType.value && taskType==availableTaskType.value && taskParams==availableTaskParams){
				isValid=false;
				break;
			}
		}
	}
		return isValid;
}
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};