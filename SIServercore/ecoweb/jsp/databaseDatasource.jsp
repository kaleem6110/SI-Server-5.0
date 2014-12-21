<%@ taglib uri="/tags/struts-bean" prefix="bean" %>
<%@ taglib uri="/tags/struts-logic" prefix="logic" %>
<%@ taglib uri="/tags/struts-html" prefix="html" %>
<%@ taglib uri="/tags/struts-nested" prefix="nested" %>
<%@ taglib uri="/tags/fileupload" prefix="upload" %>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>

<%@page import="com.enterprisehorizons.magma.config.utils.MagmaDBUtils"%>
<%@page import="java.util.List"%>

<%@page import="com.spacetimeinsight.db.model.util.DBDatasourceUtils"%><html:html locale="true">
  <%@ include file="/common/dojo.jsp" %>
<%
	String[] allDatabaseConfigurationsArray = DBDatasourceUtils.getAllDatasourceNames();
	pageContext.setAttribute("allDatabaseConfigurationsArray",allDatabaseConfigurationsArray);
%>
<head>
<script>

var tableList = {identifier:"table",items:[{table:"",label:""}]};
var tableStore = new dojo.data.ItemFileReadStore({data: tableList});
var columnList = {identifier:"column",items:[{column:"",label:""}]};
var columnStore = new dojo.data.ItemFileReadStore({data: columnList});

function UpdateDS(){
	if(dijit.byId('datasourceDesc').attr('value').length > 499){
		showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
		return false;
	}
	
	if(dijit.byId('primaryDatasourceName').value == ''){
		showEmptyDialog("<bean:message key="datasource.choose.primary.ds" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
		return false;
	}

	if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
		return false;
	}
	
    var pDatasourceName = dijit.byId('primaryDatasourceName').value
	var fDatasourceName = dijit.byId('secondaryDatasourceName').value
	if((pDatasourceName != '' && fDatasourceName!= '') && (pDatasourceName == fDatasourceName)){
		showEmptyDialog("<bean:message key="datasource.choose.different.ds" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
		return false;
	}
	if(trimAll(dijit.byId('query').attr('value')).length >= 1 && trimAll(dijit.byId('query').attr('value')).toUpperCase().indexOf('SELECT') != 0){
		showEmptyDialog("<bean:message key="datasource.provide.valid.query" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
		return false;
	}


	if(!updateparams('formData') ){
		showEmptyDialog("<bean:message key="datasource.ds.name.not.available" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
		return false;
	}else{
		return true;
	}
		
}
 function enableDisableColumns(selectedObject){
			try{

				if(dijit.byId('latitude').attr('value') == '' && dijit.byId('longitude').attr('value') == '' && dijit.byId('coordinates').attr('value') == '' && dijit.byId('address').attr('value') == '' && dijit.byId('addCity').attr('value') == '' && dijit.byId('addCountry').attr('value') == '' && dijit.byId('addCounty').attr('value') == '' && dijit.byId('addState').attr('value') == '' && dijit.byId('addZipCode').attr('value') == '' )  {
		   
	         resetColumnsFilterBoxes('',false);
	   }
			
				if((selectedObject.name == 'longitude' || selectedObject.name == 'latitude') && (document.getElementById('latitude').value  != '') || (document.getElementById('longitude').value  != '' ) ){
					resetColumnsFilterBoxes("coordinates,address,addCity,addCountry,addCounty,addState,addZipCode",true);

            }    if( selectedObject.name == 'coordinates' && document.getElementById('coordinates').value != ''){	
				resetColumnsFilterBoxes("latitude,longitude,address,addCity,addCountry,addCounty,addState,addZipCode",true);

}
if((document.forms[0].address.value != '' || document.forms[0].addCity.value != '' || document.forms[0].addCountry.value != '' || document.forms[0].addCounty.value != '' || document.forms[0].addState.value != '' || document.forms[0].addZipCode.value != '' )&& (selectedObject.name == 'address' || selectedObject.name == 'addCity' || selectedObject.name == 'addCountry'|| selectedObject.name == 'addCounty'|| selectedObject.name == 'addState'|| selectedObject.name == 'addZipCode') ){
	resetColumnsFilterBoxes("latitude,longitude,coordinates",true);
       

}
        } catch(err){}
    }
function updateparams(formName){
	document.getElementById('operation').value='updateDatabase';
	document.getElementById('action').value='action';
	document.getElementById("datasourceTypeId").value = '1';
	enabledAllFieldsBeforeSubmit(false);	
	return true;
}

function checkUniqueDS(){	
	if((dijit.byId('datasourceName').attr('value'))==''){
            showEmptyDialog("<bean:message key="datasource.provide.ds.name" bundle='ds'/>","<bean:message key="datasource.alert" bundle="ds" />");      
            return false;
            }
	if((document.getElementById('result').innerHTML.indexOf('Not') == -1) && (document.getElementById('result').innerHTML != '<B></B>')){		

		if(!ajaxTxtBoxSplCh(dijit.byId('datasourceName').attr('value'))){
		return false;
		}
	
if(dijit.byId('primaryDatasourceName').value == ''){
			showEmptyDialog("<bean:message key="datasource.choose.primary.ds" bundle="ds" />", "<bean:message key="datasource.alert" bundle="ds" />");
			return false;
		}

		if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
			return false;
		}
					
		if(dijit.byId('datasourceDesc').attr('value').length > 499){
			showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
			return false;
		}
		var pDatasourceName = dijit.byId('primaryDatasourceName').value
		var fDatasourceName = dijit.byId('secondaryDatasourceName').value
		if((pDatasourceName != '' && fDatasourceName!= '') && (pDatasourceName == fDatasourceName)){
			showEmptyDialog("<bean:message key="datasource.choose.different.ds" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
			return false;
		}
		if(trimAll(dijit.byId('query').attr('value')).length >= 1 && trimAll(dijit.byId('query').attr('value')).toUpperCase().indexOf('SELECT') != 0){
			showEmptyDialog("<bean:message key="datasource.provide.valid.query" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
			return false;
		}



			return setparams('formData');
		}
	if((dijit.byId('datasourceName').attr('value'))==''){
        showEmptyDialog("<bean:message key="datasource.provide.ds.name" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
        return false;
        }
        else{   showEmptyDialog("<bean:message key="datasource.ds.name.not.available" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
            return false;
        }
}

function setparams(formName){
	document.getElementById('operation').value='database';
	document.getElementById("datasourceTypeId").value = '1';	
	document.forms[0].operation.value = 'database';
	enabledAllFieldsBeforeSubmit(false);
	return true;
}

function enabledAllFieldsBeforeSubmit(status){
	dijit.byId('query').setAttribute('disabled', status);
	dijit.byId('latitude').setAttribute('disabled', status);
	dijit.byId('longitude').setAttribute('disabled', status);
	dijit.byId('order').setAttribute('disabled', status);
	dijit.byId('coordinates').setAttribute('disabled', status);
	dijit.byId('tableName').setAttribute('disabled', status);
}

function resetColumnsFilterBoxes(tableNameArray,flag) {
	try{
var disablearray = "latitude,longitude,coordinates,address,addCity,addCountry,addCounty,addState,addZipCode,order"
var array;
if(tableNameArray != null && tableNameArray != ''){
array = tableNameArray.split(",");
}
else{
	array = disablearray.split(",");
}
 for(var j=0; j<array.length;j++){
	dijit.byId(array[j]).setAttribute('displayedValue', "");
    dijit.byId(array[j]).setAttribute('disabled', flag);

}



 }catch(err){}

  }

function validateQueryExecution(){

	var queryDtls = dijit.byId('query').attr('value');
	if(checkUniqueDS()){ 
		if(queryDtls != null && queryDtls != ""){
			return  loadData('validateQuery', this, showQueryStatus, 'insert');
		}else{
			document.forms[0].submit();			
		}
	}
}

function validateQueryExecutionUpdate(){

	var queryDtls = dijit.byId('query').attr('value');
	if(UpdateDS()){ 
		if(queryDtls != null && queryDtls != ""){
			return  loadData('validateQuery', this, showQueryStatus, 'insert');
		}else{
			document.forms[0].submit();			
		}
	}
}
    
    function resetAddressFields(tmpObj)
  {
    var disablearray = "latitude,longitude,coordinates,address,addCity,addCountry,addCounty,addState,addZipCode";
    var array = disablearray.split(",");
    var selectedVal = "Blank";
	if(dijit.byId(tmpObj.id) != null)
		selectedVal = dijit.byId(tmpObj.id).getValue();

    if(selectedVal == "")
    {
        try{

             for(var j=0; j<array.length;j++){
                if(dijit.byId(array[j]) != null)
				{
				dijit.byId(array[j]).attr('displayedValue', "");
                dijit.byId(array[j]).setAttribute('disabled', false);
				}
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

	</script>
</head>
    <body class="tundra bodybg">
      <!--  
				***************************************************************************************
					Database Mashup ---- Input Properties & parameters
				***************************************************************************************
	 -->
      <center>
        <logic:notPresent name="modeType">
          <bean:define id="modeType" value="insert"/>
        </logic:notPresent>
        
		<logic:notPresent name="ecoDatasourceListData">
        	<form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/ConfigureDataSource.do">
        </logic:notPresent>
        
		<logic:present name="ecoDatasourceListData">
			<logic:notEqual name="modeType" value="insert">
                <form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/UpdateDataSource.do">
                  <input type="hidden" name="action" id="action"/>
                  <input type="hidden" name="id" id="id" value="<bean:write name="ecoDatasourceListData" property="id"/>"/>
            </logic:notEqual>
			<logic:equal name="modeType" value="insert">
				<form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/ConfigureDataSource.do">
			</logic:equal>
        </logic:present>
			<input type="hidden" id="csrf" name="csrf" value="${csrf}">
				<logic:present name="ecoDatasourceListData">
				<input type="hidden" name="ctdDate" id="ctdDate" value="<bean:write name="ecoDatasourceListData" property="createdDate" />" />
				</logic:present>
				<logic:present name="ecoDatasourceListData">
				<input type="hidden" name="ctdBy" id="ctdBy" value="<bean:write name="ecoDatasourceListData" property="createdBy" /> " />
				</logic:present>
	            <input type="hidden" name="dbDriverName" id="dbDriverName"/>
                <input type="hidden" name="datasourceTypeId" id="datasourceTypeId" value="1"/>
                <input type="hidden" name="tableQry" id="tableQry"/>
                <input type="hidden" name="columnQry" id="columnQry" value="<logic:present name="ecoDatasourceListData"><bean:write name="ecoDatasourceListData" property="query" /></logic:present>"/>
                <input type="hidden" name="conType" id="conType"/>
                <input type="hidden" name="dbClass" id="dbClass"/>
				<input type="hidden" name="datasourceDatabaseTypeId" id="datasourceDatabaseTypeId"/>                                
                <html:hidden property="operation" value="database" styleId="operation"/>


          	<table width="100%" cellspacing="0" cellpadding="0" border="0">
				<tr>
					<td align="left">
                       <table width="100%" cellpadding="0" cellspacing="0" align="left" border="0">
                          <tr>

                            <td align="left" valign="top" align="justify">

                              <table width="100%" cellspacing="0" cellpadding="0" border="0">

                                <tr>
                                  <td class="pageTitle paddingTitle">      
                                    <bean:message key="datasource.databaseFieldset" bundle="ds"/>
                                  </td>
                                </tr>

                                <tr>
                                  <td class="paddingTitleDesc bodytext">      
                                    <strong><bean:message key="datasource.databaseDescription" bundle="ds"/></strong>
                                  </td>
                                </tr>

                                <tr>
                                  <td style="padding-left:67px;" class="error">
                                    <html:errors bundle="ecoweb"/> 
                                  </td>
                                </tr>

								<tr>
                                <td style="padding-left:67px;padding-top:30px;" align="left" valign="top" class="redtitle">

                                 <table cellspacing="0" cellpadding="0" border="0" class="bodytext" style="width:922px;">
                                 	<!-- rows template
                                    <tr>
                                    	<td align="right" style="padding-right:5px;">&nbsp;</td>
                                        <td align="left">&nbsp;</td>
                                        <td width="20">&nbsp;</td>
                                        <td align="right" style="padding-right:5px;">&nbsp;</td>
                                        <td align="left">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td height="13" colspan="5">&nbsp;</td>
                                    </tr>
                                    
                                    -->
                                    <tr>
                                    	<td align="right" style="padding-right:5px;">
                                        	<strong><bean:message key="datasource.datasourceName" bundle="ds"/>&nbsp;<font color="red" size="1">*</font>:</strong> 
                                        </td>
                                        <td align="left">
                                        	<logic:notPresent name="ecoDatasourceListData">
                                                <input type="text" id="datasourceName" name="datasourceName" class="medium" maxLength="45" dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" autocomplete="off" onBlur="validateDataSourceName(this);"/>
                                            </logic:notPresent>  
                                            <logic:present name="ecoDatasourceListData">
                                            	<logic:notEqual name="modeType" value="insert"> 
                                                  <b>
                                                    <bean:write name="ecoDatasourceListData" property="datasourceName"/>
                                                  </b>
                                                    <input type="hidden" id="datasourceName" name="datasourceName" value="<bean:write name="ecoDatasourceListData" property="datasourceName"/>" /> 
                                                </logic:notEqual>
                                                <logic:equal name="modeType" value="insert">
                                                    <input type="text" id="datasourceName" name="datasourceName" class="medium" maxLength="45" dojoType="dijit.form.ValidationTextBox" autocomplete="off" required="true" trim="true" ucfirst="true" value="<bean:write name='ecoDatasourceListData' property='datasourceName'  />"  />
                                            	</logic:equal>
                                         	</logic:present>
                                        </td>
                                        <td width="20">&nbsp;</td>
                                        <td width="140px" align="right" style="padding-right:5px;">
                                        	<strong>
                                        		<bean:message key="datasource.primaryDS" bundle="ds"/>&nbsp;<font color="red" size="1">*</font>:
                                        	</strong> 
                                        </td>
                                        <td width="230px" align="left">
                                        	<logic:notPresent name="ecoDatasourceListData">
												<select style="float:left;" id="primaryDatasourceName" name="primaryDatasourceName" dojoType="dijit.form.FilteringSelect" autocomplete="off" onChange="loadData('getAllTableNames', this, setTableNamesDtls, 'insert')">
													<option value=""></option>
													<logic:present name="allDatabaseConfigurationsArray" scope="page">
														<logic:iterate id="databaseConfigurationsDtls" name="allDatabaseConfigurationsArray">
															<option value="<bean:write name="databaseConfigurationsDtls" />">
																<bean:write name="databaseConfigurationsDtls" />
															</option>
												  	</logic:iterate>
													</logic:present>												  		
							 					</select><img src="<%=ServerUtils.getContextName(request)%>/images/portal/checked.png" style="display:none; float:left; margin-left:5px;"  id="primaryIndicatorSuccess"/>
                                        	</logic:notPresent>

                                        	<logic:present name="ecoDatasourceListData">
												<select style="float:left;" id="primaryDatasourceName" name="primaryDatasourceName" dojoType="dijit.form.FilteringSelect" autocomplete="off" onChange="loadData('getAllTableNames', this, setTableNamesDtls, 'insert')" value="<bean:write name="ecoDatasourceListData" property="primaryDatasourceId" />">
												  <option value=""></option>
												  <logic:present name="allDatabaseConfigurationsArray" scope="page">
												  	<logic:iterate id="databaseConfigurationsDtls" name="allDatabaseConfigurationsArray">
												  		<option value="<bean:write name="databaseConfigurationsDtls" />">
												  			<bean:write name="databaseConfigurationsDtls" />
												  		</option>
												  	</logic:iterate>
											</logic:present>										  		
							 					</select><img src="<%=ServerUtils.getContextName(request)%>/images/portal/checked.png" style="display:none; float:left; margin-left:5px;"  id="primaryIndicatorSuccess"/>
												
                                       		</logic:present>
                                        </td>
                                    </tr>
                                    <tr>
                                      <td height="13">&nbsp;</td>
                                      <td height="13" align="left">
                                      	 <span id="result">
                                                <B>
                                                  <logic:present name="ecoDatasourceListData">
                                                    <logic:equal name="modeType" value="insert">
                                                      <bean:message key="datasource.availabel" bundle="ds"/>
                                                      </logic:equal>
                                                    </logic:present>
                                                  </B>
                                         </span> 
                                      </td>
                                    </tr>
                                    <tr>
                                    	<td rowspan="3" align="right" style="padding-right:5px;">
                                        	<strong>
                                          		<bean:message key="datasource.description" bundle="ds"/>&nbsp;:
                                          	</strong>
                                        </td>
                                        <td rowspan="3" align="left">
                                        	<textarea dojoType="dijit.form.SimpleTextarea" id="datasourceDesc" class="txtareamedium" name="datasourceDesc" dojoType="dijit.form.ValidationTextBox" required="false" trim="true" ucfirst="true" style="width:200px;resize:none" >
                                          		<logic:present name="ecoDatasourceListData">
                                            		<bean:write name="ecoDatasourceListData" property="datasourceDesc"/>
                                            	</logic:present>
                                          	</textarea>
                                        </td>
                                        <td>&nbsp;</td>
                                        <td align="right" style="padding-right:5px;">
                                        	<strong>
												<bean:message key="datasource.failoverDS" bundle="ds"/> :
											</strong>
                                        </td>
                                        <td align="left">
                                        	<logic:notPresent name="ecoDatasourceListData">
                                     		 	<select id="secondaryDatasourceName" name="secondaryDatasourceName" dojoType="dijit.form.FilteringSelect" autocomplete="off" onChange="loadData('getAllTableNames', this, setTableNamesDtls, 'insert')">
												  	<option value=""></option>
												  <logic:present name="allDatabaseConfigurationsArray" scope="page">
												  	<logic:iterate id="databaseConfigurationsDtls" name="allDatabaseConfigurationsArray">
												  	<option value="<bean:write name="databaseConfigurationsDtls" />">
												  			<bean:write name="databaseConfigurationsDtls" />
												  	</option>
												  	</logic:iterate>
												   </logic:present>													  		
							 					</select><img src="<%=ServerUtils.getContextName(request)%>/images/portal/checked.png" style="display:none"  id="secondaryIndicatorSuccess"/>
												</logic:notPresent>
												 <logic:present name="ecoDatasourceListData">
												<select id="secondaryDatasourceName" name="secondaryDatasourceName" dojoType="dijit.form.FilteringSelect" autocomplete="off" onChange="loadData('getAllTableNames', this, setTableNamesDtls, 'insert')" value="<bean:write name="ecoDatasourceListData" property="secondaryDatasourceId" />">
												  	<option value=""></option>
												  <logic:present name="allDatabaseConfigurationsArray" scope="page">
												  	<logic:iterate id="databaseConfigurationsDtls" name="allDatabaseConfigurationsArray">
												  	<option value="<bean:write name="databaseConfigurationsDtls" />">
												  			<bean:write name="databaseConfigurationsDtls" />
												  	</option>
												  	</logic:iterate>
												   </logic:present>													  		
							 					</select><img src="<%=ServerUtils.getContextName(request)%>/images/portal/checked.png" style="display:none"  id="secondaryIndicatorSuccess"/>
											</logic:present>
                                        </td>
                                    </tr>
                                    <tr>
                                    	<td colspan="3">&nbsp;</td>
                                    </tr>
                                    <tr>
                                    	<td>&nbsp;</td>
                                        <td align="right" style="padding-right:5px;">
                                        	<strong>
											  	<bean:message key="datasource.dataRenderType" bundle="ds"/>&nbsp;: 
											</strong>
                                        </td>
                                        <td align="left">
                                        	<select id="dataRenderTypeId" name="dataRenderTypeId" dojoType="dijit.form.FilteringSelect" autocomplete="off" class="selectbox">
											  <option value="">
											  </option>
											  <option value="1">
												<bean:message key="datasource.collection" bundle="ds"/>
											  </option>            
											  <option value="2">
												<bean:message key="datasource.enumeration" bundle="ds"/>
											  </option>		
											</select>
                                        </td>
                                    </tr>
                                    <tr>
                                      <td height="13" colspan="5">&nbsp;</td>
                                    </tr>
                                    <tr>
                                    	<td align="right" style="padding-right:5px;">
                                        	<strong>
                                          		<bean:message key="datasource.dbTableName" bundle="ds"/>&nbsp;: 
                                          	</strong>
                                        </td>
                                        <td align="left">
                                        	<select id="tableName" dojoType="dijit.form.FilteringSelect" name="tableName" autocomplete="off"  store="tableStore" searchAttr="table" onChange="loadData('getAllColumnNames', this, setColumnDtls, 'insert')">
                                        	</select>
                                        	<img src="<%=ServerUtils.getContextName(request)%>/images/portal/indicator.gif" style="display:none" id="indicatorTable"/>
                                        	<img src="<%=ServerUtils.getContextName(request)%>/images/portal/error.png" style="display:none" id="indicatorTableError"/>
                                        </td>
                                        <td>&nbsp;</td>
                                        <td align="right" style="padding-right:5px;">
                                        	<strong>
                                          		<bean:message key="datasource.longitude" bundle="ds"/>&nbsp;:  
                                         	</strong>
                                        </td>
                                        <td align="left">
                                        	<select id="longitude" dojoType="dijit.form.FilteringSelect" name="longitude" autocomplete="off"  store="columnStore" searchAttr="label" onChange="enableDisableColumns(this);resetAddressFields(this);">
                                        	</select>
                                        	<img src="<%=ServerUtils.getContextName(request)%>/images/portal/indicator.gif" style="display:none" id="indicatorLongitude"/>
                                       		<img src="<%=ServerUtils.getContextName(request)%>/images/portal/error.png" style="display:none" id="indicatorLongError"/>
                                        </td>
                                    </tr>
                                    <tr>
                                      <td height="13" colspan="5">&nbsp;</td>
                                    </tr>
                                    <tr>
                                    	<td rowspan="5" align="right" style="padding-right:5px;">
                                        	<strong>
                                          		<bean:message key="datasource.dbQry" bundle="ds"/>&nbsp;: 
                                          </strong>
                                        </td>
                                        <td rowspan="5 "align="left">
                                        	<textarea  dojoType="dijit.form.SimpleTextarea" id="query" style="width:30em;height:7em;resize:none" name="query" onkeyUp="activateExecuteQuery(this)"><logic:present name="ecoDatasourceListData"><bean:write name="ecoDatasourceListData" property="query"/></logic:present></textarea>
                                          		<button dojoType="dijit.form.Button" type="button" id="runQry" onClick="loadData('getAllColumnNames', dijit.byId('query'), setColumnDtls, 'insert')">
                                            		<bean:message key="datasource.dbRunQry" bundle="ds"/>
                                            	</button>
                                            <img src="<%=ServerUtils.getContextName(request)%>/images/portal/indicator.gif" style="display:none" id="indicatorQry"/>
                                            <img src="<%=ServerUtils.getContextName(request)%>/images/portal/error.png" style="display:none" id="indicatorQryError"/> 
                                        </td>
                                        <td width="20">&nbsp;</td>
                                        <td align="right" style="padding-right:5px;">
                                        	<strong>
                                         		 <bean:message key="datasource.latitude" bundle="ds"/>&nbsp;:
                                          </strong>
                                        </td>
                                        <td align="left">
                                        	<select id="latitude" dojoType="dijit.form.FilteringSelect" name="latitude" autocomplete="off" invalidMessage="The value entered is not valid"  store="columnStore" searchAttr="label" onChange="enableDisableColumns(this);resetAddressFields(this);">
                                          
                                        	</select>
                                        	<img src="<%=ServerUtils.getContextName(request)%>/images/portal/indicator.gif" style="display:none" id="indicatorLatitude"/>
                                        	<img src="<%=ServerUtils.getContextName(request)%>/images/portal/error.png" style="display:none" id="indicatorLatError"/>
                                        </td>
                                    </tr>
                                    <tr>
                                      <td height="13" colspan="3">&nbsp;</td>
                                    </tr>
                                    <tr>
                                    		<td>&nbsp;</td>
                                        	<td align="right" style="padding-right:5px;">
                                        		 <strong>
                                          			<bean:message key="datasource.coordinates" bundle="ds"/>&nbsp;:
                                          		</strong>
                                        	</td>
                                        	<td align="left">
                                            	<select id="coordinates" dojoType="dijit.form.FilteringSelect" name="coordinates" autocomplete="off"  store="columnStore" searchAttr="label" onChange="enableDisableColumns(this);resetAddressFields(this);" >
                                        </select>
                                        <img src="<%=ServerUtils.getContextName(request)%>/images/portal/indicator.gif" style="display:none" id="indicatorCord"/>
                                        <img src="<%=ServerUtils.getContextName(request)%>/images/portal/error.png" style="display:none" id="indicatorCordError"/>
                                    		</td>
                                    </tr>
                                    <tr>
                                      <td height="13" colspan="3">&nbsp;</td>
                                    </tr>
                                    <tr>
                                    		<td>&nbsp;</td>
                                        	<td align="right" style="padding-right:5px;">
                                        		 <strong>
                                          			<bean:message key="datasource.dbOrder" bundle="ds"/>&nbsp;: 
                                         		 </strong>
                                        	</td>
                                        	<td align="left">
                                            	<select id="order" dojoType="dijit.form.FilteringSelect" name="order" autocomplete="off" store="columnStore" searchAttr="label" >
                                          
                                        </select>
                                        <img src="<%=ServerUtils.getContextName(request)%>/images/portal/indicator.gif" style="display:none" id="indicatorOrder"/>
                                        <img src="<%=ServerUtils.getContextName(request)%>/images/portal/error.png" style="display:none" id="indicatorOrderError"/>
                                    		</td>
                                    </tr>
                                    <tr>
                                      <td height="13" colspan="5">&nbsp;</td>
                                    </tr>
                                    
                                 </table>
                                 
                                 <table width="100%" cellspacing="0" cellpadding="0" border="0" >
                                 	<tr>
	   									<td align="left">
                                        	<table border="0">
	   											<tr>
           											<td style="padding-top:20px;">
          
          												<%@ include file="/ecoweb/common/addresscomponent.jsp" %>
                   
            										</td>
            
            									</tr>
											</table>
										</td>
			
									</tr>

									<tr>
										<td align="left">
											<table border="0">
												<tr>
													<td style="padding-top:20px;">
          
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
                  </table>
                  </td>
</tr>
</table>

<!-- Button Panel -->
<logic:notPresent name="ecoDatasourceListData">
  <table width="100%" border=0>
  	<tr class="barColor" >
    	<td align="center">
        	<button dojoType="dijit.form.Button" type="button" onClick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  ">
          		<bean:message key="datasource.home" bundle="ds"/>
          	</button>
          	<button dojoType="dijit.form.Button" type="button" onClick="window.location='WizardHomeAction.do?operation=configureDatasource'">
            	<bean:message key="datasource.back" bundle="ds"/>
            </button>
            <button dojoType="dijit.form.Button" id="save" type="button" onClick="validateQueryExecution();">
            	<bean:message key="datasource.save" bundle="ds"/>
            </button>
      	</td>
    </tr>
  </table>
</logic:notPresent>
<logic:present name="ecoDatasourceListData">
  <logic:notEqual name="modeType" value="insert">
	<table width="100%" border=0>
    	<tr class="barColor">
        	<td align="center">
          		<button dojoType="dijit.form.Button" type="button" onClick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  ">
            		<bean:message key="datasource.home" bundle="ds"/>
            	</button>
            	<button dojoType="dijit.form.Button" type="button" onClick="window.location = 'WizardHomeAction.do?operation=showAllDatasource&pageNo=1' ">
              		<bean:message key="datasource.back" bundle="ds"/>
              	</button>
              	<button dojoType="dijit.form.Button" id="save" type="button" onClick="validateQueryExecutionUpdate();">
                	<bean:message key="datasource.save" bundle="ds"/>
                </button>
        	</td>
      	</tr>
	</table>
  </logic:notEqual>
  <logic:equal name="modeType" value="insert">
    <table width="100%" border=0>
    	<tr class="barColor">
        	<td align="center">
          		<button dojoType="dijit.form.Button" type="button" onClick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  ">
            		<bean:message key="datasource.home" bundle="ds"/>
            	</button>
            	<button dojoType="dijit.form.Button" type="button" onClick="window.location='WizardHomeAction.do?operation=configureDatasource'">
              		<bean:message key="datasource.back" bundle="ds"/>
              	</button>
              	<button dojoType="dijit.form.Button" id="save" type="button" onClick="validateQueryExecution();">
              		<bean:message key="datasource.save" bundle="ds"/>
              	</button>
        	</td>
      	</tr>
     </table>

  </logic:equal>
</logic:present>
<logic:notPresent name="ecoDatasourceListData">
</form>
</logic:notPresent>
<logic:present name="ecoDatasourceListData">
</form>
</logic:present>
<logic:notPresent name="ecoDatasourceListData">
<script>
dojo.addOnLoad(loadFormValues);	
function loadFormValues(){
	dijit.byId('dataRenderTypeId').setValue(' ');
	dijit.byId('tableName').setAttribute('style', 'width:30em' );
	dijit.byId('query').setAttribute('disabled', true);
	dijit.byId('tableName').setAttribute('disabled', true);
	dijit.byId('latitude').setAttribute('disabled', true);
	dijit.byId('longitude').setAttribute('disabled', true);
	dijit.byId('order').setAttribute('disabled', true);
	dijit.byId('coordinates').setAttribute('disabled', true);
	dijit.byId('runQry').setAttribute('disabled', true);
	dijit.byId("address").setAttribute('disabled', true);
	dijit.byId("addCity").setAttribute('disabled', true);
	dijit.byId("addCounty").setAttribute('disabled', true);
	dijit.byId("addState").setAttribute('disabled', true);
	dijit.byId("addCountry").setAttribute('disabled', true);
	dijit.byId("addZipCode").setAttribute('disabled', true);
	}
</script>
</logic:notPresent>

<logic:present name="ecoDatasourceListData">
<script>
dojo.addOnLoad(loadFormValues);	
function loadFormValues(){
	dijit.byId('dataRenderTypeId').setValue(' ');
	dijit.byId('query').setAttribute('disabled', true);
	dijit.byId('tableName').setAttribute('disabled', true);
	dijit.byId('latitude').setAttribute('disabled', true);
	dijit.byId('longitude').setAttribute('disabled', true);
	dijit.byId('order').setAttribute('disabled', true);
	dijit.byId('coordinates').setAttribute('disabled', true);
	dijit.byId('runQry').setAttribute('disabled', true);

	dijit.byId('tableName').setAttribute('style', 'width:30em' );
	loadData('getAllTableNames', dijit.byId('primaryDatasourceName'), setTableNamesDtls, 'update');
	loadData('getAllTableNames', dijit.byId('secondaryDatasourceName'), setTableNamesDtls, 'update');	
	dojo.byId('projectionData').innerHTML = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
	document.getElementById('srcPrjDefinition').value = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
	dijit.byId('srcPrjUnits').setValue('<bean:write name="ecoDatasourceListData" property="srcPrjUnits" />');
	dijit.byId('dataRenderTypeId').setValue('<bean:write name="ecoDatasourceListData" property="dataRenderTypeId" />');

}

function setTableFormValue(){
	var tableIdDtls = '<bean:write name="ecoDatasourceListData" property="tableName" />';
	var queryIdDtls = document.getElementById('columnQry').value;
	if(tableIdDtls != ""){
		dijit.byId('tableName').setDisplayedValue(tableIdDtls);	
		//dijit.byId('query').setValue('');		
	}

	if(queryIdDtls != ""){
		dijit.byId('query').setValue(queryIdDtls);
		//dijit.byId('tableName').setValue('');
		loadData('getAllColumnNames', dijit.byId('query'), setColumnDtls, 'insert');		
	}
	
	modeType="update";	
}




function setColumnFormValue(){	
	dijit.byId('latitude').setDisplayedValue('<bean:write name="ecoDatasourceListData" property="latitude" />');
	dijit.byId('longitude').setDisplayedValue('<bean:write name="ecoDatasourceListData" property="longitude" />');
	dijit.byId('order').setDisplayedValue('<bean:write name="ecoDatasourceListData" property="order" />');
	dijit.byId('coordinates').setDisplayedValue('<bean:write name="ecoDatasourceListData" property="coordinates" />');
		dijit.byId("address").setDisplayedValue('<bean:write name="ecoDatasourceListData" property="address" />');
				dijit.byId("addCity").setDisplayedValue('<bean:write name="ecoDatasourceListData" property="addCity" />');
                dijit.byId("addCountry").setDisplayedValue('<bean:write name="ecoDatasourceListData" property="addCountry" />');
                dijit.byId("addCounty").setDisplayedValue('<bean:write name="ecoDatasourceListData" property="addCounty" />');
                dijit.byId("addState").setDisplayedValue('<bean:write name="ecoDatasourceListData" property="addState" />');
				dijit.byId("addZipCode").setDisplayedValue('<bean:write name="ecoDatasourceListData" property="addZipCode" />');
	modeType="insert";	
}
</script>
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

</logic:present>
</body>
</html:html>
