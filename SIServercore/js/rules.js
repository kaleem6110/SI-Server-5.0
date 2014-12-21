var addedRowsNumbers = "1,";
var addedURLRowsNumbers = "1,";
var initial_count = new Array(); 
var rows_limit = 0; // Set to 0 to disable limitation 
var dbColumnsArray = [];
var ecosystemName = "";
var selectedEcoSystemName = "";
 var rows_count = 0;
var allAlertViolationTextBox = [];
var allAlertViolationNameBox = [];
var allParamNameBox = [];

var alertCount = 1;
var violationCount = 1;

var  confDtls;

dojo.addOnLoad(function(){

	confDtls = new dijit.Dialog({
    	title: "Loading...",
    	style: "width: 300px;height:125px"
    });
     
});

function addAlertDtls(){
	try{

    var tmpAlertCount ;
    tmpAlertCount = alertCount -1;
	var nameObj = document.getElementById('alertName'+(tmpAlertCount));
	var qryObj = document.getElementById('alertQry'+(tmpAlertCount));		
	if(nameObj != null)	
	{
		if(nameObj.value.length == 0 || qryObj.value.length == 0)
		{
			showEmptyDialog( "You cannot add a blank alert" , "Alert");
			return false;
		}
	}


	
    var tbl = document.getElementById('alertDtls');
    rows_count = tbl.rows.length; 
    if (initial_count['alertDtls'] == undefined)    { 
        // if it is first adding in this table setting initial rows count 
        initial_count['alertDtls'] = rows_count; 
    }     
      var tFielsNum = rows_count - initial_count['alertDtls']; 
      if (rows_limit!=0 && tFielsNum >= rows_limit) return false; 
      var newRow = tbl.insertRow(rows_count); 
      var tmp = 'alertCount_'+alertCount;
      newRow.setAttribute("id",tmp);
      var newCell = newRow.insertCell(0); 
                                                                                          
      
      var input = '<table  width="100%"><tr><td><fieldset><table width="100%" border="0"><tr><td>&nbsp;</td></tr><tr><td colspan="3" width="100%"><table ><tr>  <td  width="15% colspan="2" align="right"  nowrap="nowrap"><strong>&nbsp;&nbsp;Name&nbsp;<label class="error">*</label>:</strong></td>   <td align="left"  width="25%"><input type="text"    id="alertName'+alertCount+'" name="alertName'+alertCount+'" class="medium" maxLength="45" dojoType="dijit.form.ValidationTextBox" required="false" trim="true" ucfirst="true"  onBlur="prepareTextBoxArray(this);validateUniqueness(this);" />	<span  id="alertName'+alertCount+'result"  align="center"><b>&nbsp;</b></span></td><td width="15%">&nbsp;</td> <td  width="20%" align="right"><strong>Query&nbsp;<label class="error">*</label>:</strong></td><td width="45%"><textarea  id="alertQry'+alertCount+'" style="width:40em;height:3em" name="alertQry'+alertCount+'"  required="true" trim="true"  ucfirst="true"  onkeyup="showAlertParamDtls(this,\'alertParamDtls'+alertCount+'\', \'alertParamMapTitle'+alertCount+'\', \'alertParamMapDtls'+alertCount+'\', '+alertCount+')" onblur="prepareAlertViolationNameArray(this);chkQueryDescriptionLen(this);" ></textarea></td></tr></table></td><td width="13px">&nbsp;</td></tr><tr id="alertParamMapTitle'+alertCount+'" style="display:none"><td class="redtitle1" colspan="2" style="padding-left:71px;">ParamsMap</td></tr><tr id="alertParamMapDtls'+alertCount+'" style="display:none"><td colspan="6" align="left" style="padding-left:70px" ><table><tbody id="alertParamDtls'+alertCount+'" > </tbody> </table></td></tr><tr><td coslpan="4"><br></td></tr><tr><td><table border="0"><tr>   <td width="6.5%" align="right"><strong>Listener&nbsp;:</strong></td><td width="22.5%" align="right"><select id="alertListener'+alertCount+'" dojoType="dijit.form.FilteringSelect"  name="alertListener'+alertCount+'"    autoComplete="false"     invalidMessage="Invalid Listener" ><option value=""></option> </select></td><td width="11%" align="right" >&nbsp;</td> <td width="12%" align="right" nowrap="nowrap"><strong>RAS Process :</strong></td><td width="49%" align="left" ><select id="alertRASProcess'+alertCount+'" dojoType="dijit.form.FilteringSelect"  name="alertRASProcess'+alertCount+'"    autoComplete="false"     invalidMessage="Invalid Listener" ></select> </td> </tr> </table></td></tr><tr><td coslpan="4"><br></td></tr> </table> </fieldset> </td><td valign="top" align="right"> <img src="/magma/images/icon_dash_1.png" height="9px" style="cursor : pointer" onclick="removeAlertDtls(\'alertCount_'+alertCount+'\', \'alertDtls\')" title="Remove Alert" / ></td></tr></table>'; 
       
    var tmpAlertCount ;
    tmpAlertCount = alertCount -1;
	var nameObj = document.getElementById('alertName'+(tmpAlertCount));
	var qryObj = document.getElementById('alertQry'+(tmpAlertCount));		
	if(nameObj != null)	
	{
		if(nameObj.value.length == 0 || qryObj.value.length == 0)
		{
			showEmptyDialog( "You cannot add a blank alert" , "Alert");
			return false;
		}
	}

       newCell.innerHTML =input;
	  
       newCell.colSpan="5";


       var alertQryName = 'alertQry'+alertCount;
       var listenerName = 'alertListener'+alertCount
      /* Converting the HTML Text Area to DOJO Text Area
      */
      /* programmaticTextarea = new dijit.form.Textarea({
                    id: alertQryName,
                    name: alertQryName,
                    cols: "60",
                    value: ""
                }, alertQryName);
        dijit.byId(alertQryName).setAttribute('style', 'height:3em'); */
		 // var func = enableRAS(this,"+alertCount+",alertRASProcess);

               var alertRASProcess = 'alertRASProcess'+alertCount;
       
			
        var listenerfilteringSelect = new dijit.form.FilteringSelect({
            id: listenerName,
            name:listenerName ,
				store:listenserstore,
				searchAttr:"label",
				onChange:function(){
				enableRAS(this,alertRASProcess)	}
        }, listenerName);
         var rasfilteringSelect = new dijit.form.FilteringSelect({
            id: alertRASProcess,
            name:alertRASProcess ,
				store:rasProcessStore,
				
				searchAttr:"label",disabled:true
		 }, alertRASProcess);
       alertCount++;

	}
	catch(ex){
		alert(ex);
	}

}



function addVioliationDtls(){
	try{
	
    var tmpViolationCount ;
    tmpViolationCount = violationCount -1;
	var nameObj = document.getElementById('violationName'+(tmpViolationCount));
	var qryObj = document.getElementById('violationQry'+(tmpViolationCount));		
	if(nameObj != null)	
	{
		if(nameObj.value.length == 0 || qryObj.value.length == 0)
		{
			showEmptyDialog( "You cannot add a blank violation" , "Violation");
			return false;
		}
	}

	
	
    var tbl = document.getElementById('violationDtls');
    rows_count = tbl.rows.length; 
    if (initial_count['violationDtls'] == undefined)    { 
        // if it is first adding in this table setting initial rows count 
        initial_count['violationDtls'] = rows_count; 
    }     
      var tFielsNum = rows_count - initial_count['violationDtls']; 
      if (rows_limit!=0 && tFielsNum >= rows_limit) return false; 
      var newRow = tbl.insertRow(rows_count); 
	  var tmp = 'violation_' +violationCount;	
      newRow.setAttribute("id",tmp);
      var newCell = newRow.insertCell(0); 
      var input = '<table  width="100%"><tr><td><fieldset><table width="100%" border="0"><tr><td>&nbsp;</td></tr><tr><td colspan="3" width="100%"><table ><tr>  <td  width="15% colspan="2" align="right"  nowrap="nowrap"><strong>&nbsp;&nbsp;Name<label class="error">*</label>:</strong>&nbsp;</td>   <td  width="25%" align="left"><input type="text"    id="violationName'+violationCount+'" name="violationName'+violationCount+'" class="medium" maxLength="45" dojoType="dijit.form.ValidationTextBox" required="false" trim="true" ucfirst="true"  onBlur="prepareTextBoxArray(this);validateUniqueness(this);" />	<span  id="violationName'+violationCount+'result"  align="center"><b>&nbsp;</b></span></td><td width="15%">&nbsp;</td> <td  width="20%" align="right"><strong>Query<label class="error">*</label>:</strong>&nbsp;</td><td width="100%">&nbsp;<textarea  id="violationQry'+violationCount+'" style="width:40em;height:3em" name="violationQry'+violationCount+'"  required="true" trim="true"  ucfirst="true"  onkeyup="showVioliationParamDtls(this,\'violationParamDtls'+violationCount+'\', \'violationParamMapTitle'+violationCount+'\', \'violationParamMapDtls'+violationCount+'\', '+violationCount+')" onblur="prepareAlertViolationNameArray(this);chkQueryDescriptionLen(this);" ></textarea></td></tr></table></td><td width="13px">&nbsp;</td></tr><tr id="violationParamMapTitle'+violationCount+'" style="display:none"><td class="redtitle1" colspan="2" style="padding-left:71px;">ParamsMap</td></tr><tr id="violationParamMapDtls'+violationCount+'" style="display:none"><td colspan="6" align="left" style="padding-left:70px" ><table><tbody id="violationParamDtls'+violationCount+'" > </tbody> </table></td></tr><tr><td coslpan="4"><br></td></tr>														<tr><td><table border="0"><tr><td width="6.5%" align="right"><strong>&nbsp;Listener:</strong>&nbsp;</td>																<td width="22.5%" align="left" style=""><select id="violationListener'+violationCount+'" dojoType="dijit.form.FilteringSelect"  name="violationListener'+violationCount+'"    autoComplete="false"     invalidMessage="Invalid Listener" ><option value=""></option> </select></td> <td width="12.25%" align="right" style="">&nbsp;</td><td width="11%" align="right" style="" nowrap="nowrap"><strong>RAS Process:</strong>&nbsp;</td><td width="49%" align="left" style=""><select id="violationRASProcess'+violationCount+'" dojoType="dijit.form.FilteringSelect"  name="violationRASProcess'+violationCount+'"    autoComplete="false"     invalidMessage="Invalid Listener" ></select> </td> </tr> </table></td></tr><tr><td coslpan="4"><br></td></tr> </table> </fieldset> </td><td valign="top" align="right"><img src="/magma/images/icon_dash_1.png" height="9px" style="cursor : pointer" onclick="removeVioliationDtls(\'violation_'+violationCount+'\', \'violationDtls\')" title="Remove Violation"/ ></td></tr></table>'; 
     
       newCell.innerHTML =input; 
       newCell.colSpan="5";


       var violationQryName = 'violationQry'+violationCount;
       var listenerName = 'violationListener'+violationCount
		     var alertRASProcess = 'violationRASProcess'+violationCount;

      /* Converting the HTML Text Area to DOJO Text Area
      */
       /*programmaticTextarea = new dijit.form.Textarea({
                    id: violationQryName,
                    name: violationQryName,
                    cols: "60",
                    value: ""
                }, violationQryName);
        dijit.byId(violationQryName).setAttribute('style', 'height:3em');*/
        var filteringSelect = new dijit.form.FilteringSelect({
            id: listenerName,
            name:listenerName,
				store:listenserstore,
				searchAttr:"label",
				onChange:function(){
				enableRAS(this,alertRASProcess)	}
        },
         listenerName);


        var rasfilteringSelect = new dijit.form.FilteringSelect({
            id: alertRASProcess,
            name:alertRASProcess ,
				store:rasProcessStore,
				searchAttr:"label",
				disabled:true
        }, alertRASProcess);
       violationCount++;
}
	catch(ex){
	}
}



function removeAlertDtls(rowNum, divId){

try{  
	var tbl ;
	var tbl_AlertDtls;
	var rows_CountAlertDtls;
	var tbl_IncidentTable;
	var rows_CountIncidentTable;
	if(divId == 'alertDtls')	
	{
		tbl_AlertDtls = document.getElementById('alertDtls');
	    rows_CountAlertDtls = tbl_AlertDtls.rows.length; 
	}
	if(divId == 'incidentTable')	
	{
		tbl_IncidentTable = document.getElementById('incidentTable');
	    rows_CountIncidentTable = tbl_IncidentTable.rows.length; 
	}


//	if((rows_CountAlertDtls + rows_CountIncidentTable) > 0)
//	{
		var row = document.getElementById(rowNum);
		var tbl = document.getElementById(divId);
		try{
		tbl.removeChild(row); 
		//alertCount = alertCount -1 ;	
		}catch(e){}

	//}
	var total_rows=0;
	if(divId == 'alertDtls')	
	{
		tbl_AlertDtls = document.getElementById('alertDtls');
	    rows_CountAlertDtls = tbl_AlertDtls.rows.length; 
	    total_rows = total_rows + rows_CountAlertDtls;
	}
	if(divId == 'incidentTable')	
	{
		tbl_IncidentTable = document.getElementById('incidentTable');
	    rows_CountIncidentTable = tbl_IncidentTable.rows.length; 
	    total_rows = total_rows + rows_CountIncidentTable;
	}

	if(total_rows == 0)
	{
	var tbl_IncidentTable1 = document.getElementById('incidentTable');
	    rows_CountIncidentTable = tbl_IncidentTable1.rows.length; 
	    
	var tbl_AlertDtls1 = document.getElementById('alertDtls');
	    rows_CountAlertDtls = tbl_AlertDtls1.rows.length; 
	    
	    if(rows_CountIncidentTable == 0 && rows_CountAlertDtls == 0){		
			addAlertDtls();
		}
	}
}
catch(e){alert(e)}
}

function removeVioliationDtls(rowNum, divId ){

	var tbl ;
	var tbl_AlertDtls;
	var rows_CountAlertDtls;
	var tbl_IncidentTable;
	var rows_CountIncidentTable;
	if(divId == 'violationDtls')	
	{
		tbl_AlertDtls = document.getElementById('violationDtls');
	    rows_CountAlertDtls = tbl_AlertDtls.rows.length; 
	}
	if(divId == 'incidentTable1')	
	{
		tbl_IncidentTable = document.getElementById('incidentTable1');
	    rows_CountIncidentTable = tbl_IncidentTable.rows.length; 
	}

try{  
		var tbl = document.getElementById(divId);
		var row = document.getElementById(rowNum);
		tbl.removeChild(row); 
		//violationCount = violationCount -1 ;	
}
catch(e){}

	var total_rows=0;
	if(divId == 'violationDtls')	
	{
		tbl_AlertDtls = document.getElementById('violationDtls');
	    rows_CountAlertDtls = tbl_AlertDtls.rows.length; 
	    total_rows = total_rows + rows_CountAlertDtls;
	}
	if(divId == 'incidentTable1')	
	{
		tbl_IncidentTable = document.getElementById('incidentTable1');
	    rows_CountIncidentTable = tbl_IncidentTable.rows.length; 
	    total_rows = total_rows + rows_CountIncidentTable;
	}

	if(total_rows == 0)
	{
		var tbl_IncidentTable1 = document.getElementById('incidentTable1');
	    rows_CountIncidentTable = tbl_IncidentTable1.rows.length; 
	    
   		var tbl_AlertDtls1 = document.getElementById('violationDtls');
	    rows_CountAlertDtls = tbl_AlertDtls1.rows.length; 

	    if(rows_CountIncidentTable == 0 && rows_CountAlertDtls == 0){		
			addVioliationDtls();
		}
	}
    
}

var alertParamCount = 1;
function addAlertParamDtls(alertNumber){
	
    //alert(alertNumber == '')
    if(alertNumber == undefined || alertNumber < 0  ){
        alertNumber ='';
    }
    //  alert(alertNumber)
    var tbl = document.getElementById('alertParamDtls'+alertNumber);
    rows_count = tbl.rows.length; 
    if (initial_count['alertParamDtls'+alertNumber] == undefined)   { 
        // if it is first adding in this table setting initial rows count 
        initial_count['alertParamDtls'+alertNumber] = rows_count; 
    }     
      var tFielsNum = rows_count - initial_count['alertParamDtls'+alertNumber]; 
      if (rows_limit!=0 && tFielsNum >= rows_limit) return false; 
      var newRow = tbl.insertRow(rows_count); 
      var rowId = alertNumber+'_'+alertParamCount;
      newRow.setAttribute("id", rowId);
      var newCell = newRow.insertCell(0); 
      var tem;
	   var input;
	      var alertParamName = 'alertParamName'+alertNumber+'_'+alertParamCount;
	  try{
	if(rows_count == 0 && alertTotalNoOfDollar > 1 || alertTotalNoOfDollar == 1){
 input = '<tr><td><strong>Name <label class="error">*</label>:</strong>&nbsp;</td><td><input type="text"    id="alertParamName'+alertNumber+'_'+alertParamCount+'" value="alertParamName'+alertNumber+'_'+alertParamCount+'" name="alertParamName'+alertNumber+'_'+alertParamCount+'" class="medium" maxLength="45"     /></td><td width="13px">&nbsp;&nbsp;&nbsp;&nbsp;</td><td><strong>Value <label class="error">*</label>:</strong>&nbsp;</td><td><input type="text"  id="alertParamValue'+alertNumber+'_'+alertParamCount+'" value="alertParamValue'+alertNumber+'_'+alertParamCount+'" name="alertParamValue'+alertNumber+'_'+alertParamCount+'" class="medium"  maxLength="45"  /></td> <td><strong>&nbsp;&nbsp;Type <label class="error">*</label>:</strong>&nbsp;<select id="alertParamType'+alertNumber+'_'+alertParamCount+'" name="alertParamType'+alertNumber+'_'+alertParamCount+'"    invalidMessage="Invalid Listener" style="width:10.5em;" ></select> </td> <td> <img src="/magma/images/icon_plus_1.png" width="9px" height="9px" style="cursor : pointer" onclick="validateNoOfParams('+alertNumber+',\'alertParamDtls'+ alertNumber +'\',\'alertQry' + alertNumber + '\',\'alert\');"/ ></td></tr>'; 
	alertTotalNoOfDollar = 0;
	
	}else{
    input = '<tr><td><strong>Name <label class="error">*</label>:</strong>&nbsp;</td><td><input type="text"    id="alertParamName'+alertNumber+'_'+alertParamCount+'" value="alertParamName'+alertNumber+'_'+alertParamCount+'" name="alertParamName'+alertNumber+'_'+alertParamCount+'" class="medium" maxLength="45"     /></td><td width="13px">&nbsp;&nbsp;&nbsp;&nbsp;</td><td><strong>Value <label class="error">*</label>:</strong>&nbsp;</td><td><input type="text"  id="alertParamValue'+alertNumber+'_'+alertParamCount+'" value="alertParamValue'+alertNumber+'_'+alertParamCount+'" name="alertParamValue'+alertNumber+'_'+alertParamCount+'" class="medium" maxLength="45"  /></td> <td><strong>&nbsp;&nbsp;Type <label class="error">*</label>:</strong>&nbsp;<select id="alertParamType'+alertNumber+'_'+alertParamCount+'" name="alertParamType'+alertNumber+'_'+alertParamCount+'"    invalidMessage="Invalid Listener" style="width:10.5em;" ></select> </td> <td> <img src="/magma/images/icon_dash_1.png" width="9px" height="9px" style="cursor : pointer" onclick="validateNoOfParamsForDel(\''+rowId+'\',\'alertParamDtls'+ alertNumber +'\',\'alert\');" / ></td></tr>'; 
    }
	  }
	  catch(err){
	  }

	   newCell.innerHTML =input; 
       newCell.colSpan="6";

    var alertParamValue= 'alertParamValue'+alertNumber+'_'+alertParamCount;
    var alertParamType= 'alertParamType'+alertNumber+'_'+alertParamCount;

        programmaticNameTextbox = new dijit.form.TextBox({
                    id: alertParamName,
                    name: alertParamName,
					onBlur:function(){
				validateName(alertParamName,"alertQry"+alertNumber);	}                    
                }, alertParamName);

        programmaticValueTextbox = new dijit.form.TextBox({
                    id: alertParamValue,
                    name: alertParamValue
                }, alertParamValue);
        var filteringSelect = new dijit.form.FilteringSelect({
            id: alertParamType,
            name:alertParamType, 
			store:attrStore,
				searchAttr:"label" 
        }, alertParamType);
        dijit.byId(alertParamType).setAttribute('style', 'width:100px');
	prepareParamArray(alertParamName);
    alertParamCount++;
}

var violationParamCount = 1;

function addVioliationParamDtls(violationNumber){

    if(violationNumber == undefined || violationNumber < 0  ){
        violationNumber ='';
    }

    var tbl = document.getElementById('violationParamDtls'+violationNumber);
    rows_count = tbl.rows.length; 
    if (initial_count['violationParamDtls'+violationNumber] == undefined)   { 
        // if it is first adding in this table setting initial rows count 
        initial_count['violationParamDtls'+violationNumber] = rows_count; 
    }     
      var tFielsNum = rows_count - initial_count['violationParamDtls'+violationNumber]; 
      if (rows_limit!=0 && tFielsNum >= rows_limit) return false; 
      var newRow = tbl.insertRow(rows_count); 
       var rowId = violationNumber+'_'+violationParamCount;
      newRow.setAttribute("id", rowId);
      var newCell = newRow.insertCell(0); 
	  var violationParamName = 'violationParamName'+violationNumber+'_'+violationParamCount;     

	if(rows_count == 0 && violTotallNoOfDollar > 1 || violTotallNoOfDollar == 1){
		var input = '<tr><td><strong>Name <label class="error">*</label>:</strong>&nbsp;</td><td align="left"><input type="text"  id="violationParamName'+violationNumber+'_'+violationParamCount+'"  name="violationParamName'+violationNumber+'_'+violationParamCount+'" class="medium" maxLength="45"      /></td><td width="13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><strong>Value <label class="error">*</label>:</strong>&nbsp;</td><td><input type="text"  id="violationParamValue'+violationNumber+'_'+violationParamCount+'" name="violationParamValue'+violationNumber+'_'+violationParamCount+'" class="medium" maxLength="45"     /></td><td>&nbsp;<strong>&nbsp;&nbsp;Type <label class="error">*</label>:</strong>&nbsp;<select id="violationParamType'+violationNumber+'_'+violationParamCount+'" style="width:10.5em;" name="violationParamType'+violationNumber+'_'+violationParamCount+'"    invalidMessage="Invalid Listener" ></select> </td><td> &nbsp;&nbsp;<img src="/magma/images/icon_plus_1.png" width="9px" height="9px" style="cursor : pointer" onclick="validateNoOfParams('+violationNumber+',\'violationParamDtls'+ violationNumber +'\',\'violationQry' + violationNumber + '\',\'violation\');"/ ></td></tr>'; 
		violTotallNoOfDollar = 0;
	}else{
		var input = '<tr><td><strong>Name <label class="error">*</label>:</strong>&nbsp;</td><td align="left"><input type="text"  id="violationParamName'+violationNumber+'_'+violationParamCount+'"  name="violationParamName'+violationNumber+'_'+violationParamCount+'" class="medium" maxLength="45"      /></td><td width="13px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><strong>Value <label class="error">*</label>:</strong>&nbsp;</td><td><input type="text"  id="violationParamValue'+violationNumber+'_'+violationParamCount+'" name="violationParamValue'+violationNumber+'_'+violationParamCount+'" class="medium" maxLength="45"     /></td><td>&nbsp;<strong>&nbsp;&nbsp;Type <label class="error">*</label>:</strong>&nbsp;<select id="violationParamType'+violationNumber+'_'+violationParamCount+'" style="width:10.5em;" name="violationParamType'+violationNumber+'_'+violationParamCount+'"    invalidMessage="Invalid Listener" ></select> </td><td> &nbsp;&nbsp;<img src="/magma/images/icon_dash_1.png" width="9px" height="9px" style="cursor : pointer" onclick="validateNoOfParamsForDel(\''+rowId+'\',\'violationParamDtls'+ violationNumber +'\', \'violation\');" / ></td></tr>'; 

	}

       newCell.innerHTML =input; 
       newCell.colSpan="6";

    var violationParamValue= 'violationParamValue'+violationNumber+'_'+violationParamCount;
    var violationParamType= 'violationParamType'+violationNumber+'_'+violationParamCount;
        programmaticNameTextbox = new dijit.form.TextBox({
                    id: violationParamName,
                    name: violationParamName,
					onBlur:function(){
				validateName(violationParamName,"violationQry"+violationNumber);	}                    
                }, violationParamName);

        programmaticValueTextbox = new dijit.form.TextBox({
                    id: violationParamValue,
                    name: violationParamValue
                }, violationParamValue);
    var filteringSelect = new dijit.form.FilteringSelect({
            id: violationParamType,
            name:violationParamType,
				store:attrStore,
				searchAttr:"label" 
        }, violationParamType);
        dijit.byId(violationParamType).setAttribute('style', 'width:100px');
	prepareParamArray(violationParamName);
    violationParamCount++;
}


function removeAlertParamDtls(rowNum, divId){
    var mainTable = document.getElementById(divId);
    var row = document.getElementById(rowNum);
    mainTable.removeChild(row); 
    if(confDtls){
    	confDtls.hide();
    }
}

function removeVioliationParamDtls(rowNum, divId){
    var mainTable = document.getElementById(divId);
    var row = document.getElementById(rowNum);
    mainTable.removeChild(row); 
    if(confDtls){
    	confDtls.hide();
    }
}



var divParamCount = 0;
var alertTotalNoOfDollar = 0;
function showAlertParamDtls(selectedObject, targetDivId, alertParamMapTitleId, alertParamMapDtlsId, alertCount){
    var numberOfDollars = selectedObject.value.split('$').length-1;
    //alert(numberOfDollars)
    if(numberOfDollars > 0){
        document.getElementById(alertParamMapTitleId).style.display='';
        document.getElementById(alertParamMapDtlsId).style.display='';
    }
	
alertTotalNoOfDollar = numberOfDollars;
    if(numberOfDollars == 0){
        document.getElementById(alertParamMapTitleId).style.display='none';
        document.getElementById(alertParamMapDtlsId).style.display='none';
    }
   
	 addAlertParamDtls(alertCount);
    divParamCount = numberOfDollars;

    var tbl = document.getElementById(targetDivId);
    rows_count = tbl.rows.length; 
    //alert(numberOfDollars)
    //alert(rows_count)
	
		numberOfDollars++;
    if(numberOfDollars <= rows_count){
        var extraRows = rows_count - numberOfDollars;
        var rowstodelete = rows_count-1;
        for(i=0; i<=extraRows;i++){
			try{
				document.getElementById(targetDivId).deleteRow(rowstodelete--);
			}catch(er){}
        }
    }
    var tmpStr = selectedObject.value;
    var dollarCount=0;
    rows_count = tbl.rows.length; 
    for(var count = 0;count < tmpStr.length;count++ )
    {
		if(tmpStr.charAt(count) == '$')
		{
			++dollarCount ;
		}
    }
    var rowsTobeInserted;
    if(dollarCount >= rows_count)
    {
		rowsTobeInserted = dollarCount - rows_count;
    }
		
    for(var count = 0; count < rowsTobeInserted ; count++)
    {
		 addAlertParamDtls(alertCount);
    }
    
}


var divVioliationParamCount = 0;
var violTotallNoOfDollar = 0;
function showVioliationParamDtls(selectedObject, targetDivId, violationParamMapTitleId, violationParamMapDtlsId, violationCount1){
    
    var numberOfDollars = selectedObject.value.split('$').length-1;
    //alert(numberOfDollars)
    if(numberOfDollars > 0){
        document.getElementById(violationParamMapTitleId).style.display='';
        document.getElementById(violationParamMapDtlsId).style.display='';
    }
   violTotallNoOfDollar = numberOfDollars;
    if(numberOfDollars == 0){
        document.getElementById(violationParamMapTitleId).style.display='none';
        document.getElementById(violationParamMapDtlsId).style.display='none';
    }
   
	  addVioliationParamDtls(violationCount1);
    divVioliationParamCount = numberOfDollars;

    var tbl = document.getElementById(targetDivId);
    rows_count = tbl.rows.length; 
    //alert(numberOfDollars)
    //alert(rows_count)
	numberOfDollars++;
    if(numberOfDollars <= rows_count){
        var extraRows = rows_count - numberOfDollars;
        var rowstodelete = rows_count-1;
        for(i=0; i<=extraRows;i++){
			try{
				document.getElementById(targetDivId).deleteRow(rowstodelete--);
			}catch(er){}
        }
    }
    
    var tmpStr = selectedObject.value;
    var dollarCount=0;
    rows_count = tbl.rows.length; 
    for(var count = 0;count < tmpStr.length;count++ )
    {
		if(tmpStr.charAt(count) == '$')
		{
			++dollarCount ;
		}
    }
    var rowsTobeInserted;
    if(dollarCount >= rows_count)
    {
		rowsTobeInserted = dollarCount - rows_count;
    }
		
    for(var count = 0; count < rowsTobeInserted ; count++)
    {
		addVioliationParamDtls(violationCount1);
    }

    
    
}

function validateTime(checkObject){
	startTime = dojo.byId(checkObject.name).value;
	objectName = checkObject.name; 
		if(startTime.length == 0 ){
		   // alert("Please Enter Hours:Minutes:Seconds");
			showEmptyDialog("Please Enter Hours:Minutes:Seconds", "Schedulers");
			checkObject.focus();
			return false;
		}
		
		if(startTime.length > 0){
			var startTimeArray = startTime.split(":");
			if(isNaN(startTimeArray[0]) || startTimeArray[0].indexOf('-') != -1 ){
				showEmptyDialog("Please Enter Valid Hours:Minutes:Seconds", "Schedulers");
				checkObject.focus();
				return false;
			}

			if(isNaN(startTimeArray[1]) || startTimeArray[1].indexOf('-') != -1){
				showEmptyDialog("Please Enter Valid Hours:Minutes:Seconds", "Schedulers");
				checkObject.focus();
				return false;
			}

			if(isNaN(startTimeArray[2]) || startTimeArray[2].indexOf('-') != -1){
				showEmptyDialog("Please Enter Valid Hours:Minutes:Seconds", "Schedulers");
				checkObject.focus();
				return false;
			}
			if((startTimeArray.length-1) != 3){
					try{
					if(startTimeArray[0] > 23 || startTimeArray[0] < 0){
						showEmptyDialog("Please Enter Hours(0 to 23)", "Schedulers");
						checkObject.focus();
						return false;
					}
					if(startTimeArray[1] > 59 || startTimeArray[1] < 0){
						showEmptyDialog("Please Enter Minutes(0 to 59)", "Schedulers");
						checkObject.focus();
						return false;
					}
					if(startTimeArray[2] > 59 || startTimeArray[2] < 0){
						showEmptyDialog("Please Enter Seconds(0 to 59)", "Schedulers");
						checkObject.focus();
						return false;
					}
				}catch(err){
					showEmptyDialog("Please Enter Hours:Minutes:Seconds", "Schedulers");
					checkObject.focus();
					return false;
				}
			}
				
		}
}

var  uniqueResult;
var allTextBox =[];
var isInserted = true;
function validateUniqueness(selectedObject){

	     if(selectedObject.value.length == 0){
			 document.getElementById(selectedObject.name+'result').innerHTML ='&nbsp;';
			try{		
					 dijit.byId(selectedObject.name).reset();
			} catch(er){
			}	
			return false;
		 }
		 else
		 {
			if(isSplChar(selectedObject.value))
			{
				return false;
			}
		 }
        url = "RulesValidationAjaxAction.do?operation=checkUniqueName"+"&uniqueName="+selectedObject.value+"&inputTypeName="+selectedObject.name;
    
       xmlhttpGetMsg = GetXmlHttpObject();
   uniqueResult = selectedObject.name+'result';

   document.getElementById(selectedObject.name+'result').innerHTML = 'Checking....';
     xmlhttpGetMsg.onreadystatechange = getUniqueResult;  

    xmlhttpGetMsg.open("POST",url,true);
    xmlhttpGetMsg.send(null); 
		
}


function getUniqueResult(){
	//  showProgressDialog('Checking');
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
		 
        
				var root = msgDOM.getElementsByTagName("searchDtls")[0];
				 var load = "";
				if(root != null)	
				{
					 load = root.getElementsByTagName("result");
                     if(load[0].firstChild.nodeValue == 'Available')
                    { 
                        document.getElementById(uniqueResult).innerHTML = '<b>'+load[0].firstChild.nodeValue+'</b>'
                    }    
					 else
					 {
						 document.getElementById(uniqueResult).innerHTML = '<b class="error">'+load[0].firstChild.nodeValue+'</b>';
					 }
					allTextBox.push({value: uniqueResult});
				}	
          // hideEmptyDialog();
            
        }   
}
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

function enableRAS(selValue,rasName){
	if(selValue != ''){	
		dijit.byId(rasName).setAttribute('disabled', false);
	}
	else{
		dijit.byId(rasName).reset();
		dijit.byId(rasName).setAttribute('disabled', true);
	}
}

var executed = false;

function validateName(tmpName,tmpQry)
{ 
var tmpNameObj = dijit.byId(tmpName);
var tmpNameTxt = tmpNameObj.getValue();
if(executed)
{
	executed = false;
	return;
}
var tmpQryTxt = document.getElementById(tmpQry).value;
var re=""+ tmpNameTxt+ "";
var check=tmpQryTxt.indexOf(re);
if(check == -1)
{
			showEmptyDialog("Please enter valid param name existing in query", "Rules");
			executed = true;
			tmpNameObj.focus();
}

}

function validateNoOfParams(alertNumber,tmpName,tmpQry,deleteAV)
{ 
	var tmpNameObj = document.getElementById(tmpName);
	var rows_count = tmpNameObj.rows.length; 
	
	var tmpQryTxt = document.getElementById(tmpQry).value;
	var numberOfDollars = tmpQryTxt.split('$').length-1;
	
	if(numberOfDollars <= rows_count)
	{
		showEmptyDialog("You cannot enter more number of parameters than those defined in the query", "Alert");
	}
	else
	{
		if(deleteAV == 'alert')
		{
			addAlertParamDtls(alertNumber);
		}
		else
		{
			addVioliationParamDtls(alertNumber);
		}
	}
}


function validateNoOfParamsForDel(rowId,tmpName,deleteAV)
{ 
	if(deleteAV == 'alert')
	{
		confirmationDialogToDeleteAlertParam(rowId, tmpName);	
	}
	else
	{
		confirmationDialogToDeleteViolationParam(rowId,tmpName);		
	}	
	
}

function prepareTextBoxArray(selectedObject){
	if(selectedObject.name != "incidentName"){
		isInserted = true;
		if(allAlertViolationTextBox.length == 0)
			allAlertViolationTextBox.push({name:selectedObject.name});

		for(i=0;i<allAlertViolationTextBox.length;i++){
			if(allAlertViolationTextBox[i].name == selectedObject.name){
			isInserted = false;
        	break;
			}
		}
		
	if(isInserted)
		allAlertViolationTextBox.push({name:selectedObject.name});

}

}




function prepareAlertViolationNameArray(selectedObject){
		var isInsertedVal = true;
		for(i=0;i<allAlertViolationNameBox.length;i++){
			if(allAlertViolationNameBox[i].name == selectedObject.name){
			isInsertedVal = false;
        	break;
			}
		}	
		
	if(isInsertedVal)
		allAlertViolationNameBox.push({name:selectedObject.name});

}





function IsNumeric(paramName,strString,numericTmp)
   //  check for valid numeric strings	
   {
	   var strStringVal = "";
	   if(strString != null)
		   strStringVal = trimAll(strString);
		else   
			return false;   

		var numericTmpVal = "";
	   if(numericTmp != null)		   
		   numericTmpVal = trimAll(numericTmp);	   
		else   
			return false;   
		   
	   var strValidChars = "0123456789.-";
	   var strChar;
	   var blnResult = true;
	
	   if (strStringVal.length == 0) {
		   showEmptyDialog("Value is mandatory, please enter a valid value for "+ paramName, "Alert");	
		   return false;	   
	   }

		
	   //  test strString consists of valid characters listed above
	   if(numericTmp !='' && numericTmp != '0')
	   if(numericTmpVal == 'java.lang.Integer'){
		   for (i = 0; i < strStringVal.length && blnResult == true; i++)
		   {
			  strChar = strStringVal.charAt(i);
			  if (strValidChars.indexOf(strChar) == -1)
			  {
				   showEmptyDialog("Please enter valid numeric value for "+ paramName, "Alert");			   				 
					return false;
			  }
		   }
		}
		else
		{
			if(isSplChar(strStringVal))
			{
			   return false;
			}
		}
	   return blnResult;
   }


 function chkDescriptionLen()
 {
     if(dijit.byId('incidentDesc').attr('value').length > 101)
     {
         showEmptyDialog("Length of Description text should not be more than 100 characters", "Compliance");
    
     }

  }

 function chkDescriptionLenIncidentRules()
 {
     if(dijit.byId('incidentDesc').attr('value').length > 101)
     {
         showEmptyDialog("Length of Description text should not be more than 100 characters", "Compliance");
         return false;
     }
	return true;
  }
  
var alrdyVisits = false;
 function chkQueryDescriptionLen(textAreaObj)
 {
 		if(alrdyVisits)	
		{
			alrdyVisits = false;
			return false;	
		}

	 var objName = textAreaObj.id;
	 var txt = document.getElementById(objName).value;
     if(txt.length > 255)
     {
		textAreaObj.focus();
        showEmptyDialog("Length of Query should not be more than 255 characters", "Compliance");
        alrdyVisits = true;
		return false;
     }
     return true;
}



function prepareParamArray(selectedParamName){//debugger;
		var isInsertedParam = true;
		if(allParamNameBox.length == 0)
			allParamNameBox.push(selectedParamName);

		for(i=0;i<allParamNameBox.length;i++){
			if(allParamNameBox[i] == selectedParamName){
			isInsertedParam = false;
        	break;
			}
		}
		
	if(isInsertedParam)
		allParamNameBox.push(selectedParamName);
}

function confirmationDialogToDeleteAlertParam(rowId,tmpName){
	var  dialogTitle = 'Alert';
	// set the content of the dialog:
    if(confDtls != null) { 
    	confDtls.attr("title",  dialogTitle);
		confDtls.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+"You should only delete duplicate parameter present in query. Are you sure to delete?"+"</td></tr><tr><td align='center'>  <button dojoType='dijit.form.Button' onClick=\"removeAlertParamDtls('"+rowId+"','"+tmpName+"')\" type='button'>Yes</button> <button dojoType='dijit.form.Button' onClick='confDtls.hide()' type='button'>No</button></td></td></tr></table></center>");
		confDtls.show();
    }
}
	
	
function confirmationDialogToDeleteViolationParam(rowId,tmpName){
	var  dialogTitle = 'Alert';
	// set the content of the dialog:
    if(confDtls != null) { 
    	confDtls.attr("title",  dialogTitle);
    	confDtls.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+" You should only delete duplicate parameter present in query. Are you sure to delete?"+"</td></tr><tr><td align='center'><button dojoType='dijit.form.Button' onClick=\"removeVioliationParamDtls('"+rowId+"','"+tmpName+"')\" type='button'>Yes</button><button dojoType='dijit.form.Button' onClick='confDtls.hide()'type='button'>No</button></td></td></tr></table></center>");
		confDtls.show();
    }
}