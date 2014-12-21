

function addParameterRow(componentname,firsttimeload) 

{                                                                                                                                                                                                                                                                                                                 
	var count ;
       if(firsttimeload)
		count = getnoofrows(componentname);

		if(!firsttimeload || count == 0)
		count =1;

  for(var i=0;i<count;i++){
preparenextrow(componentname,rowNumber(componentname))
  }
}

		function rowNumber(componentname) {

		var componentRowNumber = document.getElementById(componentname+"parametercount").value;
		var rowNumbersArray = new Array();          
		rowNumbersArray = componentRowNumber.split(',');
		var prefix ;
		
		prefix = rowNumbersArray.length;
		componentRowNumber = componentRowNumber + prefix + ",";
     

  document.getElementById(componentname+"parametercount").value =  componentRowNumber;
return prefix;
}


function preparenextrow(componentname,prefix) 
{ 

	                                                                                                                                                                                                                                                                                                             
var  rows_count = 0;
var rows_limit = 0; 

initial_count = new Array(); 

var table_id = "parameterTable"+componentname;

 var tbl = document.getElementById(table_id);



 rows_count = tbl.rows.length; 
 
  if (initial_count[table_id] == undefined) 
  { 
    initial_count[table_id] = rows_count; 
  } 

  var tFielsNum = rows_count - initial_count[table_id]; 
  if (rows_limit!=0 && tFielsNum >= rows_limit) return false; 

     var  newRow = tbl.insertRow(rows_count);


    var newCell = newRow.insertCell(0); 

var parametername = componentname+"parametername" + prefix;
  var parametervalue = componentname+"parametervalue" + prefix;
renderTextField(newCell,parametername,componentname,prefix,parametervalue)
	 
  }

function getnoofrows(componentname){
                                                                                                                                                                                                                                                                                                             
		var noofrows = document.getElementById(componentname+"parametervalue").value;
		var counter =0;
		if(noofrows.length == 0)
			return 0;
		if(noofrows != null && noofrows != ""){
		var splitVar = 	noofrows.split(";");
	    if(splitVar.length != 0){
		  for(var i=0;i<splitVar.length;i++)
		{ 
          var tempVar = splitVar[i];
		  if(tempVar != null && tempVar!= ""){
           var splitVar2 = tempVar.split("=");
          if(splitVar2[0] != "" && splitVar2[1] != ""){
			  counter ++;
		  }
		}
		}
		}
return counter;
}
}


function renderTextField(newCell,parametername,componentname,prefix,parametervalue){
  try { 
                                                                                                                                                                                                                                                                                                             
var    parametertxtvalue ="";
     var  parameternametxtvalue =" ";
	   if(prefix <= getnoofrows(componentname)){
  parametertxtvalue = getParameterNameValue(componentname,prefix,0);
 parameternametxtvalue  = getParameterNameValue(componentname,prefix,1);
	   } 


	

	var fieldDisbale = document.getElementById(componentname+"status").value;


  if(fieldDisbale == "true"){
	  hideicon = "none";
	  isdisabled = "disabled";
  }
  else{
	  hideicon ="block"
	 isdisabled = "";

  }

  

var iconshtml=    icons = '<a style="width:2px;" href= "#" onclick=\'removeParameterRow(this.parentNode.parentNode,"'+ prefix +'","'+componentname+'");\' ><img   src="'+CONTEXT_NAME+'/images/portal/icon_dash_1.png" style="display:'+hideicon+';"  /></a>';

if(prefix == 1 ){
     iconshtml = '<a style="width:2px;" href= "#" onclick=\'addParameterRow("'+componentname+'",'+false+');\' ><img   src="'+CONTEXT_NAME+'/images/portal/icon_plus_1.png"  style="display:'+hideicon+';"  /></a>';

}
    var input = '&nbsp;<input type="text"    id="'+ parametername +'" name="' + parametername + '" " dojoType="dijit.form.ValidationTextBox" required="false"  value="'+ parametertxtvalue +'"    '+isdisabled+'/> <input type="text"    id="'+ parametervalue +'" name="' + parametervalue + '"   dojoType="dijit.form.ValidationTextBox" required="false"  value="'+ parameternametxtvalue +'"   '+isdisabled+' /> '  +iconshtml;
     

	newCell.innerHTML =input; 

  } catch (ex) { 
    alert(ex); 
  } 
}

function getParameterNameValue(componentname,prefix,position){
			var noofrows = document.getElementById(componentname+"parametervalue").value;
		var counter = 0;
		if(noofrows != null && noofrows != ""){
		var splitVar = 	noofrows.split(";");
	    if(splitVar.length != 0){
		  for(var i=0;i<splitVar.length;i++)
		{ 
          var tempVar = splitVar[prefix-1];
		  if(tempVar != null && tempVar!= ""){
           var splitVar2 = tempVar.split("=");
          if(splitVar2[0] != ""){
			 return splitVar2[position];
		  }
		}
		}
		}
return "";
}
}



function removeParameterRow(row,prefix,componentname) 
{   	
	var tbl = "parameterTable"+componentname;

  var table = document.getElementById(tbl); 
  var rownum = row.sectionRowIndex;
  

  try
  { 			        table.deleteRow(rownum); 

	  delAddedParameterRowsNumbers(table,prefix,componentname) ;
	
  } catch (ex) { 
    //alert(ex); 
  } 

} 


function delAddedParameterRowsNumbers(table,tmp,componentname)
{  
	var componentRowNumber = document.getElementById(componentname+"parametercount").value;

    var rowNumbersArray = new Array(); 
    rowNumbersArray = componentRowNumber.split(',');
    for(countArr = 0;countArr < rowNumbersArray.length;countArr++)
    {
        var tmp1 = rowNumbersArray[countArr];
        if(tmp == tmp1)
        { 
            rowNumbersArray[countArr] = 'n';

            break;
        }
    }
    componentRowNumber = rowNumbersArray.join(",");
    document.getElementById(componentname+"parametercount").value =  componentRowNumber;
}





		function addhide(componentname){
				document.getElementById("parameterTable"+componentname).style.display='none';
		document.getElementById("parameterDtls"+componentname).style.display='none';
		document.getElementById("parameterminimizeLabel"+componentname).style.display='none';
		document.getElementById("parametermaximizeLabel"+componentname).style.display='';
	}
	

	function addshow(componentname,readonly){

				document.getElementById("parameterTable"+componentname).style.display='';
						document.getElementById("parameterDtls"+componentname).style.display='';
 if(readonly == "false"){

		document.getElementById("parameterminimizeLabel"+componentname).style.display='';
				document.getElementById("parametermaximizeLabel"+componentname).style.display='none';

 }
	}


	function validateRow(componentname){
    var componentRowNumber = document.getElementById(componentname+"parametercount").value;
    var rowNumbersArray = new Array(); 
    rowNumbersArray = componentRowNumber.split(',');

    for(countArr = 0;countArr < rowNumbersArray.length-1;countArr++)
    { 
		
        var tmp = rowNumbersArray[countArr];

        if(rowNumbersArray[countArr] != 'n')
        { 
			componentnameparametername = document.getElementById(componentname+"parametername"+rowNumbersArray[countArr] );
			componentarametevalue=document.getElementById(componentname+"parametervalue"+rowNumbersArray[countArr] );

            if(componentnameparametername.value != 0 || componentarametevalue.value != 0){

             if(componentnameparametername.value != 0 && componentarametevalue.value == 0){
  			  showEmptyDialog("Parameter value missing for "+componentnameparametername.value , "Error");
			   return false;
               }
            if(componentnameparametername.value == 0 && componentarametevalue.value!==0){
			  showEmptyDialog("Parameter name is  missing for value"+componentarametevalue.value, "Error");

               componentnameparametername.focus();

  return false;
}
        }
    }
	}
	  return true;
	}

	
	