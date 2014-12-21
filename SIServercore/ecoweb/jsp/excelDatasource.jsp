<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>
<%@ taglib uri="/tags/fileupload" prefix="upload"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ page import=   "com.spacetimeinsight.stas.utils.ResourceManager,
                    com.enterprisehorizons.objects.ResourceItem,java.util.*, 
                    java.io.*, 
                    com.enterprisehorizons.magma.ecoweb.constants.IWebSessionContants,
                    com.enterprisehorizons.magma.server.admin.AdminConfigUtils" %>
<%@ include file="/common/dojo.jsp"%>
<script type="text/javascript">
            var filePathList = {identifier:"label",items:[{filePath:"",label:""}]};
            var filePathStore = new dojo.data.ItemFileReadStore({data: filePathList});

            var columnList = {identifier:"column",items:[{column:"",label:""}]};
            var columnStore = new dojo.data.ItemFileReadStore({data: columnList});
    </script>
<script>
    function checkUniqueDS(){
    	if((dijit.byId('datasourceName').attr('value'))==''){
            showEmptyDialog("<bean:message key="datasource.provide.ds.name" bundle='ds'/>","<bean:message key="datasource.alert" bundle="ds" />");      
            return false;
            }
			
       if((document.getElementById('result').innerHTML.indexOf('Not') == -1) && (document.getElementById('result').innerHTML != '<B></B>')){		
		if(!ajaxTxtBoxSplCh(dijit.byId('datasourceName').attr('value'))){
		return false;
		}
	
		 if(dijit.byId('datasourceDesc').attr('value').length > 499){
				 showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
			return false;
		  }
		  if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
				return false;
			}
		  	
		
		if(dijit.byId('excelName').attr('value') == ""){
			showEmptyDialog("<bean:message key="datasource.check.excel.select" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />");	
			return false;
		  }
	
            return setparams('formData');
        }
		showEmptyDialog("<bean:message key="datasource.ds.name.not.available" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />");	
        return false;
	
    }

    function setparams(formName){
        
            document.getElementById('operation').value='excelFile';
            document.getElementById("datasourceTypeId").value = '6';   
            var disablearray = "excelLatitude,excelLongitude,excelCoordinates,address,addCity,addCountry,addCounty,addState,addZipCode";
            var array = disablearray.split(",");
    for(var j=0; j<array.length;j++){
  dijit.byId(array[j]).setAttribute('disabled', false);

}
            return true;
    }

    function UpdateDS(){
          
        //if((document.getElementById('result').innerHTML.indexOf('Not') == -1) && (document.getElementById('result').innerHTML != '<b></b>')){       
	 if(dijit.byId('datasourceDesc').attr('value').length > 499){
				 showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
		return false;
	  }
	if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
				return false;
			}	
		  
	

	  if(dijit.byId('excelName').attr('value') == ""){
			showEmptyDialog("<bean:message key="datasource.check.excel.select" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");	
			return false;
	  }
            return updateparams('formData');
    }

    function updateparams(formName){
            document.getElementById('operation').value='updateExcelFile';
            document.getElementById('action').value='action';
            document.getElementById("datasourceTypeId").value = '6';        
            document.getElementById("excelName").value = dijit.byId("excelName").value;
                    var disablearray = "excelLatitude,excelLongitude,excelCoordinates,address,addCity,addCountry,addCounty,addState,addZipCode";
            var array = disablearray.split(",");
    for(var j=0; j<array.length;j++){
  dijit.byId(array[j]).setAttribute('disabled', false);

}
            return true;
    }

   

    function enableDisableColumns(selectedObject){
            try{

                if(dijit.byId('excelLatitude').attr('value') == '' && dijit.byId('excelLongitude').attr('value') == '' && dijit.byId('excelCoordinates').attr('value') == '' && dijit.byId('address').attr('value') == '' && dijit.byId('addCity').attr('value') == '' && dijit.byId('addCountry').attr('value') == '' && dijit.byId('addCounty').attr('value') == '' && dijit.byId('addState').attr('value') == '' && dijit.byId('addZipCode').attr('value') == '' )  {
           
             resetExcelValues('',false);
       }
            
                if((selectedObject.name == 'excelLongitude' || selectedObject.name == 'excelLatitude') && (document.getElementById('excelLongitude').value  != '' || document.getElementById('excelLatitude').value  != '' ) ){
                    resetExcelValues("excelCoordinates,address,addCity,addCountry,addCounty,addState,addZipCode",true);
					
            } 
			if( selectedObject.name == 'excelCoordinates' && document.getElementById('excelCoordinates').value != ''){  
                resetExcelValues("excelLatitude,excelLongitude,address,addCity,addCountry,addCounty,addState,addZipCode",true);

}
if((document.forms[0].address.value != '' || document.forms[0].addCity.value != '' || document.forms[0].addCountry.value != '' || document.forms[0].addCounty.value != '' || document.forms[0].addState.value != '' || document.forms[0].addZipCode.value != '' )&& (selectedObject.name == 'address' || selectedObject.name == 'addCity' || selectedObject.name == 'addCountry'|| selectedObject.name == 'addCounty'|| selectedObject.name == 'addState'|| selectedObject.name == 'addZipCode') ){
    resetExcelValues("excelLatitude,excelLongitude,excelCoordinates",true);
       

}

        } catch(err){}
    }
    

    function populate(){
        //window.location.reload();'
    }
    
    function resetExcelValues(tableNameArray,flag) {
        try{
var disablearray = "excelLatitude,excelLongitude,excelCoordinates,address,addCity,addCountry,addCounty,addState,addZipCode"
var array;
if(tableNameArray != null && tableNameArray != ''){
array = tableNameArray.split(",");
}
else{
    array = disablearray.split(",");
}
 for(var j=0; j<array.length;j++){
    dijit.byId(array[j]).setValue("");
  dijit.byId(array[j]).setAttribute('disabled', flag);

}
 }catch(err){}

  }


    function resetAddressFields(tmpObj)
  {
    var disablearray = "excelLatitude,excelLongitude,excelCoordinates,address,addCity,addCountry,addCounty,addState,addZipCode";
    var array = disablearray.split(",");
    var selectedVal = dijit.byId(tmpObj.id).getValue();
    if(selectedVal == "")
    {
    
        try{

             for(var j=0; j<array.length;j++){
                dijit.byId(array[j]).attr('displayedValue', "");
                dijit.byId(array[j]).setAttribute('disabled', false);
            }
         }catch(err){}

    }
    /*
    else{

        try{

            for(var j=0; j<array.length;j++){
                //dijit.byId(array[j]).attr('displayedValue', SELECT_TEXT);
              if(tmpObj.id != array[j])
                  dijit.byId(array[j]).setAttribute('disabled', true);
              else
                dijit.byId(array[j]).setAttribute('disabled', false);
            }
         }catch(err){}

    
    }*/
  }


   function resetNonAddressFields(tmpObj)
  {
    var nonAddressString = "address,addCity,addCounty,addState,addCountry,addZipCode";
    var nonAddressArray = nonAddressString.split(",");
    var addressFieldSelectStatus = true;
    var disablearray = "excelLatitude,excelLongitude,excelCoordinates";
    var array = disablearray.split(",");
    var selectedVal = dijit.byId(tmpObj.id).getValue();
    try{

        for(var count=0;count < nonAddressArray;count++ ){
            
            if(dijit.byId(nonAddressArray[count]).getValue() != "")
            {
                addressFieldSelectStatus = false;
                break;
            }
        }   
     }catch(err){}


        
    if(addressFieldSelectStatus &&  selectedVal == "")
    {


        try{
            
             for(var j=0; j<array.length;j++){
                dijit.byId(array[j]).setAttribute('displayedValue', "");
                dijit.byId(array[j]).setAttribute('disabled', false);
            }
         }catch(err){}

    }else{

        try{
            
            for(var j=0; j<array.length;j++){
                //dijit.byId(array[j]).attr('value', SELECT_TEXT);
              dijit.byId(array[j]).setAttribute('disabled', true);
            }
         }catch(err){}

    
    }
  }


    
</script>
<body class="tundra bodybg">
<logic:notPresent name="modeType">
  <bean:define id="modeType" value="insert" />
</logic:notPresent>
<logic:notPresent name="ecoDatasourceListData">
<form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/ConfigureDataSource.do" onsubmit="return checkUniqueDS()">
</logic:notPresent>
<logic:present name="ecoDatasourceListData">
<logic:notEqual name="modeType" value="insert">
<form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/UpdateDataSource.do" onsubmit="return UpdateDS()">
</logic:notEqual>
<logic:equal name="modeType" value="insert">
<form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/ConfigureDataSource.do" onsubmit="return checkUniqueDS()">
</logic:equal>
</logic:present>
<input type="hidden" name="csrf" id="csrf" value="${csrf}">
<logic:present name="ecoDatasourceListData">
<input type="hidden" name="ctdDate" id="ctdDate" value="<bean:write name="ecoDatasourceListData" property="createdDate" />" />
</logic:present>
<logic:present name="ecoDatasourceListData">
<input type="hidden" name="ctdBy" id="ctdBy" value="<bean:write name="ecoDatasourceListData" property="createdBy" /> " />
</logic:present>
<input type="hidden" name="datasourceTypeId" id="datasourceTypeId"/>
<input type="hidden" name="operation"  id="operation"/>
<input type="hidden" name="action"  id="action"/>
<logic:present name="ecoDatasourceListData">
<input type="hidden" name="id"  id="id" value="<bean:write name="ecoDatasourceListData" property="id" />"/>
</logic:present>

<input type="hidden" name="datasourceTypeId" id="datasourceTypeId"/>
<input type="hidden" name="operation"  id="operation"/>
<input type="hidden" name="action"  id="action"/>
<!--  
                ***************************************************************************************
                    EXCELFILE MASHUP ---- Input Properties & parameters
                ***************************************************************************************
            -->
<table width="100%" border = "0" cellspacing="0" cellpadding="0">
	<tr>
		<td align="left">
			<table width="100%"  border = "0" cellpadding="0" cellspacing="0"  >
				<tr>
					<td  valign="top"  align="justify">
						<table width="100%" border = "0"  cellspacing="0" cellpadding="0" >
							<tr>
								<td class="pageTitle paddingTitle">      
									<bean:message key="datasource.excelFieldset" bundle="ds"/>
								</td>
							</tr>
        
							<tr>
								<td  class="paddingTitleDesc bodytext">      
									<strong><bean:message key="datasource.excelDescription" bundle="ds"/></strong>
								</td>
							</tr>
        
							<tr>
								<td style="padding-left:67px;"class="error">
									<html:errors bundle="ecoweb"/> 
								</td>
							</tr>

							<tr>
								<td>&nbsp;
								
								</td>
							</tr>

							<tr>
								<td style="padding-top:20px;" height="30" align="right" valign="top" class="redtitle">
									<table width="100%" cellspacing="0" cellpadding="0" border="0" style="padding-left: 18px" >
    
    <tr >
    <td>
    <table border ="0" width="70%">
		<tr>
                    <td height="28" width ="20%" style="padding-right:10px;" align="right">
                        <strong><bean:message key="datasource.datasourceName" bundle="ds" /><label class="error">*</label>:</strong>
                    </td>

        
        <td  height="28" align="left" width="20%"> 
            <table border="0">
			<tr><td>
              <logic:notPresent name="ecoDatasourceListData">
                  <input type="text"  id="datasourceName" name="datasourceName" class="medium" maxLength="45" autocomplete="off"
                                    dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" onBlur="validateDataSourceName(this);"/>
                </logic:notPresent>
                <logic:present name="ecoDatasourceListData">
                  <logic:notEqual name="modeType" value="insert"> <b>
                    <bean:write name="ecoDatasourceListData" property="datasourceName" />
                    </b>
                    <input type="hidden"    id="datasourceName" name="datasourceName"  value="<bean:write name="ecoDatasourceListData" property="datasourceName" />
                    "/> </logic:notEqual>
                  <logic:equal name="modeType" value="insert">
                    <input type="text"  id="datasourceName" name="datasourceName" class="medium" maxLength="45" autocomplete="off"
                                    dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" onBlur="validateDataSourceName(this);"  value="<bean:write name="ecoDatasourceListData" property="datasourceName" />
                    "  /> </logic:equal>
                </logic:present>
				
				</td>
				</tr>
				<tr><td>
              <span id="result" style="font-weight:bold" ><logic:present name="ecoDatasourceListData"><logic:equal name="modeType" value="insert"><B><bean:message key="datasource.availabel" bundle="ds"/></B></logic:equal></logic:present></span> </td>
          </tr></table>
         </td>
        <td  width ="20%" align="right" class="bodytext" style="padding-right:12px;"><strong>
          <bean:message key="datasource.description" bundle="ds" />
          :</strong></td>
      <td  style="padding-right:1px;"><textarea  id="datasourceDesc"
                            name="datasourceDesc"  dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" style="width:200px;resize:none"><logic:present name="ecoDatasourceListData"><bean:write name="ecoDatasourceListData" property="datasourceDesc" /></logic:present></textarea>
        
          </td>
      </tr>
      <tr>
        <td height="13" colspan="0" align="left" class="bodytext"></td>
      </tr>
      <tr>
    
        <td  height="28" align="right" class="bodytext" style="padding-right:10px;" valign="center"><strong>
          <bean:message key="datasource.excelName" bundle="ds" /><label class="error">*</label>:</strong></td> 
        
            <td  height="28">
                            <select id="excelName" autocomplete="off"  
                            dojoType="dijit.form.FilteringSelect"  name="excelName"  invalidMessage="The value entered is not valid" onChange="if (this.value != ''){resetExcelValues('',true);loadData('loadExcelValues', this, setExcelFileValues, 'insert');resetAddressFields(this);

} else{resetExcelValues('',true);}" store="filePathStore"     searchAttr="filePath" >
          
          </select>
                
            </td>
        
            <td valign="top">
                              <img src="ecoweb/images/ecoweb/indicator.gif" style="display:none"  id="indicatorExcelName"/><img src="ecoweb/images/ecoweb/error.png" style="display:none"  id="indicatorExcelNameError"/>        
            </td>
            <td>&nbsp;</td>
        
      </tr>
      <tr>
        <td height="13" colspan="8" align="left" class="bodytext"></td>
      </tr>
      <tr>
        <td  height="28" align="right" class="bodytext" style="padding-right:10px;"><strong>
          <bean:message key="datasource.longitude" bundle="ds" />
          : </strong></td>
        <td  height="28" align="left"><select id="excelLongitude" 
                            dojoType="dijit.form.FilteringSelect"  name="excelLongitude"    autocomplete="off"     invalidMessage="The value entered is not valid" onChange="enableDisableColumns(this);resetAddressFields(this);" store="columnStore" searchAttr="label">
          </select>
          <img src="ecoweb/images/ecoweb/indicator.gif" style="display:none"  id="indicatorExcelLongitude"/><img src="ecoweb/images/ecoweb/error.png" style="display:none"  id="indicatorExcelLongitudeError"/> </td>
        
        <td  align="right" class="bodytext" style="padding-right:10px;"><strong>
          <bean:message key="datasource.latitude" bundle="ds" />
          : </strong></td>
        <td colspan="4"><select id="excelLatitude" 
                            dojoType="dijit.form.FilteringSelect"  name="excelLatitude"    autocomplete="off"     invalidMessage="The value entered is not valid" onChange="enableDisableColumns(this);resetAddressFields(this);" store="columnStore" searchAttr="label">
          </select>
          <img src="ecoweb/images/ecoweb/indicator.gif" style="display:none"  id="indicatorExcelLatitude"/><img src="ecoweb/images/ecoweb/error.png" style="display:none"  id="indicatorExcelLatitudeError"/></td>
      </tr>
      <tr>
        <td height="13" colspan="8" align="left" class="bodytext"></td>
      </tr>
      <tr>
       <td  height="28" align="right" class="bodytext" style="padding-right:10px;"><strong>
          <bean:message key="datasource.coordinates" bundle="ds" />
          : </strong></td>
        <td  height="28" align="left"><select id="excelCoordinates" 
                            dojoType="dijit.form.FilteringSelect"  name="excelCoordinates"    autocomplete="off"     invalidMessage="The value entered is not valid" onChange="enableDisableColumns(this);resetAddressFields(this);" store="columnStore" searchAttr="label">
          </select>
          <img src="ecoweb/images/ecoweb/indicator.gif" style="display:none"  id="indicatorCord"/><img src="ecoweb/images/ecoweb/error.png" style="display:none"  id="indicatorCordError"/> </td>
        
        <td align="right" class="bodytext" style="padding-right:10px;"><strong><bean:message key="datasource.datarendertype" bundle="ds"/></strong></td>
        <td colspan="4"><%@ include file="/ecoweb/common/dataRender.jsp" %></td>
      </tr>
      <tr>
        <td height="13" colspan="8" align="left" class="bodytext"></td>
      </tr>




      </table>

     </td>
          
          </tr>

       <tr>
       <td colspan="7"><table border="0">
       <tr>
           <td colspan="7" style="padding-top:20px;padding-left:22px;padding-right:20px;">
          
          <%@ include file="/ecoweb/common/addresscomponent.jsp" %>
                   
            </td>
            
            </tr>
            </table>
            </td>
            
            </tr>

                <tr>
       <td colspan="7"><table border="0">
       <tr>
           <td colspan="7" style="padding-top:20px;padding-left:22px;padding-right:20px;">
          
            <%@ include file="/ecoweb/common/projections.jsp" %>
                   
            </td>
            
            </tr>
            </table>
            </td>
            
            </tr>

      </table>

     </td>
          
          </tr>
          
        </table>
      </table>
      </td>
      
      </tr>
      
    </table>
  </table>
  </td>
  </tr>
  </table>
    </td>
  </tr>
  </table>
<!-- Button Panel -->
<logic:notPresent name="ecoDatasourceListData">
  <table width="101.2%" >
  	<tr class="barColor">
    	<td align="center">
        	<button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  "><bean:message key="datasource.home" bundle="ds" /></button>
        	<button dojoType="dijit.form.Button"  type="button" onClick="window.location='WizardHomeAction.do?operation=configureDatasource'"><bean:message key="datasource.back" bundle="ds" /></button>
        	<button dojoType="dijit.form.Button" id="save" type="submit" ><bean:message key="datasource.save" bundle="ds" /></button>
        </td>
    </tr>
  </table>
  <script>
                dojo.addOnLoad(loadFormValues); 
                    function loadFormValues(){
                        
                        loadData('LoadFilePaths', '.xls,.xlsx', setFilePaths, 'insert');
                        dijit.byId('dataRenderTypeId').setValue('');
                        <logic:equal name="modeType" value="insert">
                         resetExcelValues('',true);
                         </logic:equal>

                    }
            </script>
</logic:notPresent>
<logic:present name="ecoDatasourceListData">
  <logic:notEqual name="modeType" value="insert">
    <table width="101.2%">
    	<tr class="barColor">
        	<td align="center">
            	<button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  "><bean:message key="datasource.home" bundle="ds" /></button>
        		<button dojoType="dijit.form.Button"  type="button" onClick="window.location = 'WizardHomeAction.do?operation=showAllDatasource&pageNo=1' "><bean:message key="datasource.back" bundle="ds" /></button>
          		<button dojoType="dijit.form.Button" id="save" type="submit" ><bean:message key="datasource.save" bundle="ds" /></button>
         	</td>
      	</tr>
    </table>
  </logic:notEqual>
  <logic:equal name="modeType" value="insert">
  	<table width="101.2%">
    	<tr class="barColor">
        	<td align="center">
        		<button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  "><bean:message key="datasource.home" bundle="ds" /></button>
        		<button dojoType="dijit.form.Button"  type="button"  onClick="window.location='WizardHomeAction.do?operation=configureDatasource'"><bean:message key="datasource.back" bundle="ds" /></button>
          		<button dojoType="dijit.form.Button" id="save" type="submit" ><bean:message key="datasource.save" bundle="ds" /></button>
           	</td>
      	</tr>
    </table>
  </logic:equal>
  <script>
    dojo.addOnLoad(loadFormValues); 
    var fileNameData ;
    function loadFormValues(){
        
        loadData('LoadFilePaths', '.xls,.xlsx', setFilePaths, 'update');
        //fileNameData = dijit.byId('excelName').domNode.innerHTML;
        
       document.getElementById('srcPrjDefinition').value = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
       document.getElementById('projectionData').innerHTML = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />'; 
       dijit.byId('dataRenderTypeId').setValue('<bean:write name="ecoDatasourceListData" property="dataRenderTypeId" />');
   
       /*  
        setSavedExcelDtls();
        //dijit.byId('excelLongitude').setValue('<bean:write name="ecoDatasourceListData" property="excelLongitude" />');
        //dijit.byId('excelLatitude').setValue('<bean:write name="ecoDatasourceListData" property="excelLatitude" />'); 
        //dijit.byId('excelCoordinates').setValue('<bean:write name="ecoDatasourceListData" property="excelCoordinates" />');       
        //dijit.byId('inputExcelFile').domNode.innerHTML='<div id="filedata" onclick="showFileBrowser()" style="cursor:pointer">            <bean:write name="ecoDatasourceListData" property="fileName" /></div>';*/
    }
    
    function loadExcelValues(){
        dijit.byId('excelName').setValue('<bean:write name="ecoDatasourceListData" property="excelName" />');
         document.getElementById('projectionData').innerHTML = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
         dijit.byId('srcPrjUnits').setValue('<bean:write name="ecoDatasourceListData" property="srcPrjUnits" />');
        if(dijit.byId('excelName').value != "")
            loadData('loadExcelValues', dijit.byId('excelName'), setExcelFileValues, 'update');

    }

    function showFileBrowser(){
            dijit.byId('inputExcelFile').domNode.innerHTML = fileNameData;
    }

    function setSavedExcelDtls() {

        dijit.byId('excelName').setValue('<bean:write name="ecoDatasourceListData" property="excelName" />');

        dijit.byId('excelLongitude').setValue('<bean:write name="ecoDatasourceListData" property="excelLongitude" />');

        dijit.byId('excelLatitude').setValue('<bean:write name="ecoDatasourceListData" property="excelLatitude" />'); 

        dijit.byId('excelCoordinates').setValue('<bean:write name="ecoDatasourceListData" property="excelCoordinates" />');
        

        //document.getElementById('projectionData').innerHTML = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
        //dijit.byId('srcPrjUnits').setValue('<bean:write name="ecoDatasourceListData" property="srcPrjUnits" />');       
        //document.getElementById('srcPrjDefinition').value = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';


    }
    
    function setSavedDBColumnDtls(modeType){
            if(modeType !== 'insert'){
                try{
                    dijit.byId('excelName').setValue('<bean:write name="ecoDatasourceListData" property="excelName" />');
                }catch(err){}
                document.getElementById('indicatorExcelName').style.display='none';
                try{
                    dijit.byId('excelLongitude').setValue('<bean:write name="ecoDatasourceListData" property="excelLongitude" />');
                }catch(err){}
                
                document.getElementById('indicatorExcelLongitude').style.display='none';
                try{
                    dijit.byId('excelLatitude').setValue('<bean:write name="ecoDatasourceListData" property="excelLatitude" />');

                }catch(err){}           
                document.getElementById('indicatorExcelLatitude').style.display='none'; 
                try{
                    dijit.byId('excelCoordinates').setValue('<bean:write name="ecoDatasourceListData" property="excelCoordinates" />'); 
                    
                   dijit.byId("address").setValue('<bean:write name="ecoDatasourceListData" property="address" />');
                        dijit.byId("addCity").setValue('<bean:write name="ecoDatasourceListData" property="addCity" />');
                        dijit.byId("addCountry").setValue('<bean:write name="ecoDatasourceListData" property="addCountry" />');
                        dijit.byId("addCounty").setValue('<bean:write name="ecoDatasourceListData" property="addCounty" />');
                        dijit.byId("addState").setValue('<bean:write name="ecoDatasourceListData" property="addState" />');
                     dijit.byId("addZipCode").setValue('<bean:write name="ecoDatasourceListData" property="addZipCode" />');

                }catch(err){}
                
                document.getElementById('indicatorCord').style.display='none';
            }
        }

        function setFocus() {
            document.getElementById('result').innerHTML = "<bean:message key='datasource.reloaded' bundle='ds'/>";
            document.getElementById('result').focus();
            
        }
        
</script>
</logic:present>
<input type="hidden" name="action"  id="action"/>
<input type="hidden" name="excelName"  id="excelName"/>
</form>

<script>

  dojo.addOnLoad(checkDisplayStatusForProjection);
  var address = "";
  var addCity = "";
  var addCountry = "";
  var addCounty  = "";
  var addState = "";
  var addZipCode = "";

  <logic:present name="ecoDatasourceListData">
  address = '<bean:write name="ecoDatasourceListData" property="address" />'
 addCity = '<bean:write name="ecoDatasourceListData" property="addCity" />'
 addCountry = '<bean:write name="ecoDatasourceListData" property="addCountry" />'
 addCounty = '<bean:write name="ecoDatasourceListData" property="addCounty" />'
 addState ='<bean:write name="ecoDatasourceListData" property="addState" />'
 addZipCode =  '<bean:write name="ecoDatasourceListData" property="addZipCode" />'
</logic:present>
            function checkDisplayStatusForProjection(){
                if(dijit.byId('projectionData').attr('value').length > 5){
                    show();
                }
                  if(addZipCode.length > 0 || addState.length > 0 || addCounty.length > 0 || addCountry.length > 0 || address.length > 0 || addCity.length > 0){
                    addshow();
                }


            }
</script>
