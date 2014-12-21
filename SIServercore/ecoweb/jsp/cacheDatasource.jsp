<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>
<%@ taglib uri="/tags/fileupload" prefix="upload"%>



<script type="text/javascript"
	src="js/windowsjs/javascripts/prototype.js"> </script>
<script type="text/javascript" src="js/windowsjs/javascripts/effects.js"> </script>
<script type="text/javascript" src="js/windowsjs/javascripts/window.js"> </script>
<script type="text/javascript"
	src="js/windowsjs/javascripts/window_effects.js"> </script>
<script type="text/javascript" src="js/windowsjs/javascripts/debug.js"> </script>
<link href="js/windowsjs/themes/default.css" rel="stylesheet"
	type="text/css" />
<link href="js/windowsjs/themes/alert.css" rel="stylesheet"
	type="text/css" />
<link href="js/windowsjs/themes/alert_lite.css" rel="stylesheet"
	type="text/css" />
<link href="js/windowsjs/themes/spread.css" rel="stylesheet"
	type="text/css">
</link>



<style>
{
cursor


:wait


}
</style>
<style type="text/css">
@import "js/dojo/resources/dojo.css";

@import "js/dijit/themes/tundra/tundra.css";

@import "js/dijit/themes/tundra/tundra_rtl.css";

@import "js/dijit/tests/css/dijitTests.css";

@import "js/dojox/form/resources/FileInput.css";

@import "css/style.css";

body .medium {
	width: 15em;
	height: 2 em
}

body .urlTxt {
	width: 25em;
	height: 2 em
}

body .txtareamedium {
	width: 25em;
	height: 5em;
}

.formQuestion {
	background-color: #d0e3f5;
	padding: 0.3em;
	font-weight: 900;
	font-family: Verdana, Arial, sans-serif;
	font-size: 0.8em;
	color: #5a5a5a;
}

.formAnswer {
	background-color: #f5eede;
	padding: 0.3em;
	margin-bottom: 1em;
	width: 100%;
}
</style>
<!--   Vertical Align Top for labels-->
<style>
.td,tr {
	vertical-align: top;
}
</style>



<script type="text/javascript" src="js/dojo/dojo.js"
	djConfig="isDebug: false, parseOnLoad: true"></script>

<script type="text/javascript" src="js/dojox/form/FileInput.js"></script>
<script type="text/javascript" src="js/dojox/form/FileInputAuto.js"></script>
<script type="text/javascript" src="js/ecoweb.js"></script>
<script type="text/javascript">
			dojo.require("dijit.form.Form");
			dojo.require("dijit.form.CheckBox");
			dojo.require("dijit.form.Button");
			dojo.require("dijit.form.ValidationTextBox");
			dojo.require("dijit.form.ComboBox");
			dojo.require("dojox.form.DropDownSelect");
			dojo.require("dojo.parser");	// scan page for widgets and instantiate them
			dojo.require("dijit.form.Textarea");
			dojo.require("dojox.form.FileInput"); 
			dojo.require("dijit.form._FormWidget");
			dojo.require("dijit.Dialog");
			dojo.require("dijit.form.ComboBox");
			dojo.require("dojox.data.XmlStore");
			dojo.require("dijit.form.FilteringSelect");
			dojo.require("dojo.data.ItemFileReadStore");
			dojo.require("dijit.ProgressBar");
			dojo.require("dijit.Tree");
			dojo.require("dojox.data.OpmlStore");
			dojo.require("dijit.Dialog");

		var bookStore2 = new dojox.data.XmlStore({url: "EcoWebAjaxAction.do?operation=LoadDrivers", rootItem: "driver"});
		var tableList = {identifier:"table",items:[{table:"",label:""}]};
		var tableStore = new dojo.data.ItemFileReadStore({data: tableList});
		var columnList = {identifier:"column",items:[{column:"",label:""}]};
		var columnStore = new dojo.data.ItemFileReadStore({data: columnList});
		var driverList = {identifier:"driver",items:[{driver:"",label:""}]};
		var driverStore = new dojo.data.ItemFileReadStore({data: driverList});
</script>
<script type="text/javascript" src="js/windows.js"></script>
<script>
	function checkUniqueDS(){	
		if((document.getElementById('result').innerHTML.indexOf('Not') == -1) && (document.getElementById('result').innerHTML != '<B></B>')){		
			return setparams('formData');
		}
		alert('<bean:message key="ecoweb.datasource.notavailable" bundle="ecoweb"/>');	
		return false;
	}

		function setparams(formName){
			document.getElementById('operation').value='Database';
			document.getElementById("datasourceTypeId").value = '1';	
			document.getElementById('dbDriverName').value = dijit.byId('driverName').attr('value');
			//handler parameter for Dispatch Action
			document.forms[0].operation.value = 'Database';
			dijit.byId('query').setAttribute('disabled', false);
			 dijit.byId('latitude').setAttribute('disabled', false);
			dijit.byId('longitude').setAttribute('disabled', false);
			dijit.byId('order').setAttribute('disabled', false);
			dijit.byId('coordinates').setAttribute('disabled', false);
			dijit.byId('tableName').setAttribute('disabled', false);
			return true;
	}


  function UpdateDS(){
		if((document.getElementById('result').innerHTML.indexOf('Not') == -1) && (document.getElementById('result').innerHTML != '<b></b>')){		
			return updateparams('formData');
		}
		alert('<bean:message key="ecoweb.datasource.notavailable" bundle="ecoweb"/>');	
		return false;
  }

  function updateparams(formName){
			document.getElementById('operation').value='UpdateDatabase';
			document.getElementById('action').value='action';
			document.getElementById("datasourceTypeId").value = '1';	
			document.getElementById('dbDriverName').value = dijit.byId('driverName').attr('value');
			dijit.byId('query').setAttribute('disabled', false);
			 dijit.byId('latitude').setAttribute('disabled', false);
			dijit.byId('longitude').setAttribute('disabled', false);
			dijit.byId('order').setAttribute('disabled', false);
			dijit.byId('coordinates').setAttribute('disabled', false);
			dijit.byId('tableName').setAttribute('disabled', false);
			return true;
	}


function testConnection(){
	 // Split up bar into 5% segments
	loadData('TestDBConnectionStatus',this, setDBConnectionStatus , 'insert');
}

function checkConnectionProps(selectedObject, operationType){
if(operationType == 'insert'){
	try{
		//alert(!!connectionPropsArray[2]);
		if(selectedObject.name=="dbUrl" && connectionPropsArray[3] != document.getElementById('dbUrl').value && !!connectionPropsArray[3]){
			resetAllValues();		
			disableEnableTableQry();
			dijit.byId('save').setAttribute('disabled', true);
		}else if(selectedObject.name=="dbPwd" && connectionPropsArray[1] != document.getElementById('dbPwd').value && !!connectionPropsArray[1]){
			resetAllValues();
			disableEnableTableQry();
			dijit.byId('save').setAttribute('disabled', true);
		}else if(selectedObject.name=="driverName" && connectionPropsArray[2] != dijit.byId('driverName').attr('value') && !!connectionPropsArray[2]){
			resetAllValues();
			disableEnableTableQry();
			dijit.byId('save').setAttribute('disabled', true);
		}else if(selectedObject.name=="dbuserId" && connectionPropsArray[0] != document.getElementById('dbuserId').value && !!connectionPropsArray[0]){
			resetAllValues();
			disableEnableTableQry();
			dijit.byId('save').setAttribute('disabled', true);
		}
		
		
	}catch(er){
	}
}else if(operationType == 'update'){
	try{
		//alert(!!connectionPropsArray[2]);
		if(selectedObject.name=="dbUrl" && connectionPropsArray[3] != document.getElementById('dbUrl').value ){
			resetAllValues();
			disableEnableTableQry();
			dijit.byId('save').setAttribute('disabled', true);
		}else if(selectedObject.name=="dbPwd" && connectionPropsArray[1] != document.getElementById('dbPwd').value ){
			resetAllValues();
			disableEnableTableQry();
			dijit.byId('save').setAttribute('disabled', true);
		}else if(selectedObject.name=="driverName" && connectionPropsArray[2] != dijit.byId('driverName').attr('value') ){
			resetAllValues();
			disableEnableTableQry();
			dijit.byId('save').setAttribute('disabled', true);
		}else if(selectedObject.name=="dbuserId" && connectionPropsArray[0] != document.getElementById('dbuserId').value ){
			resetAllValues();
			disableEnableTableQry();
			dijit.byId('save').setAttribute('disabled', true);
		}
		
	
		
		
	}catch(er){
	}
}
	//if(connectionPropsArray.selectedObject.name)
}

function disableEnableTableQry(){
	if(document.getElementById('indicatorSuccess').style.display == '' ){				
				dijit.byId('query').setValue('');
				dijit.byId('query').setAttribute('disabled', true);
				dijit.byId('runQry').setAttribute('disabled', true);
				dijit.byId('tableName').setAttribute('disabled', true);		
		}
		document.getElementById('indicator').style.display='none';
		document.getElementById('indicatorError').style.display='none';
		document.getElementById('indicatorSuccess').style.display='none';
}

function resetByTableValue(selectedObject){
	var dbColumnsArray = [];
        dbColumnsArray.push({column: "" , label: ""});   
		columnList = {identifier:"column",items:dbColumnsArray};
		columnStore = new dojo.data.ItemFileReadStore({data: columnList});
         dijit.byId("latitude").store = columnStore;
		 dijit.byId("longitude").store = columnStore;
		 dijit.byId("order").store = columnStore;
		 dijit.byId("coordinates").store = columnStore;

		 try{
			dijit.byId('latitude').setValue('');
		}catch(err){
		}
		try{
			dijit.byId('longitude').setValue('');
		}catch(err){
		}
		try{
			dijit.byId('order').setValue('');
		}catch(err){
		}
		try{
			dijit.byId('coordinates').setValue('');
		}catch(err){
		}

		 if(selectedObject.value == '' && selectedObject.name == 'tableName'){
			dijit.byId('query').setAttribute('disabled', false);
			 dijit.byId('latitude').setAttribute('disabled', true);
			dijit.byId('longitude').setAttribute('disabled', true);
			dijit.byId('order').setAttribute('disabled', true);
			dijit.byId('coordinates').setAttribute('disabled', true);
		 }else if(selectedObject.value == '' && selectedObject.name == 'query'){
			 dijit.byId('tableName').setAttribute('disabled', false);
		 }
/*		 dijit.byId('latitude').setAttribute('disabled', false);
		 dijit.byId('longitude').setAttribute('disabled', false);
		 dijit.byId('order').setAttribute('disabled', false);
		 dijit.byId('coordinates').setAttribute('disabled', false);

			 dijit.byId('latitude').setAttribute('disabled', true);
			dijit.byId('longitude').setAttribute('disabled', true);
			dijit.byId('order').setAttribute('disabled', true);
			dijit.byId('coordinates').setAttribute('disabled', true);

*/		
	
		
}

	function enableDisableColumns(selectedObject){
			if(selectedObject.name == 'latitude' && selectedObject.value != '' ){
				dijit.byId('coordinates').setAttribute('disabled', true);			
			}else  if(selectedObject.name == 'longitude' && selectedObject.value != '' ){
				dijit.byId('coordinates').setAttribute('disabled', true);			
			}else if(selectedObject.name == 'coordinates' && selectedObject.value != '' ){
				dijit.byId('latitude').setAttribute('disabled', true);
				dijit.byId('longitude').setAttribute('disabled', true);
			}else if(selectedObject.name == 'coordinates' && selectedObject.value == '' ){
				dijit.byId('latitude').setAttribute('disabled', false);
				dijit.byId('longitude').setAttribute('disabled', false);
			}
			
			if(document.forms[0].latitude.value == '' && document.forms[0].longitude.value == '' ){
				dijit.byId('coordinates').setAttribute('disabled', false);			
			}
		}
</script>
<body class="tundra">


<table width="100%">
	<tr class="bgcolor">
		<td colspan="7" align="right">&nbsp;</td>
	</tr>
	<tr class="bgcolor">
		<td colspan="7" align="right">&nbsp;</td>
	</tr>
</table>


<!--  
				***************************************************************************************
					Database Mashup ---- Input Properties & parameters
				***************************************************************************************
	 -->
<center><logic:notPresent name="ecoDatasourceListData">
	<html:form action="ConfigureDataSource" method="post">
		<!--  
				***************************************************************************************
					Hidden Values for Combo 
				***************************************************************************************
-->
		<input type="hidden" name="dbDriverName" />
		<input type="hidden" name="datasourceTypeId" id="datasourceTypeId" />
		<input type="hidden" name="tableQry" id="tableQry" />
		<input type="hidden" name="columnQry" id="columnQry" />
		<input type="hidden" name="conType" id="conType" />
		<input type="hidden" name="dbClass" id="dbClass" />
		<html:hidden property="operation" value="Database" styleId="operation" />
		<fieldset
			style="width: 65%; margin-left: 3px; margin-right: 3px; height: 350">
		<legend class="bigtext"><strong>Database Properties</strong></legend>
		<table width="95%" style="margin-left: 3px; margin-right: 3px">
			<tr align="center">
				<td width="100%">

				<table width="100%">
					<tr>
						<th><bean:message key="ecoweb.cachedatasource.name"
							bundle="ecoweb" /><font color="red" size="3">*</font>:</th>
						<td>
						<table>
							<tr>
								<td><input type="text" id="datasourceName"
									name="datasourceName" class="medium"
									dojoType="dijit.form.ValidationTextBox" required="true"
									trim="true" ucfirst="true"
									onblur="loadData('CheckDatasourceName',this, setCheckDatasourceNameStatus, 'insert');"
									onkeypress="enableDisable(this)" autocomplete="off"/></td>
							</tr>
							<tr>
								<td><span id="result"><b></b></span></td>
							</tr>
						</table>
						</td>
						<th><bean:message key="ecoweb.cachedatasource.desc"
							bundle="ecoweb" /></th>
						<td><textarea dojoType="dijit.form.Textarea"
							id="datasourceDesc" class="txtareamedium" name="datasourceDesc"
							dojoType="dijit.form.ValidationTextBox" required="false"
							trim="true" ucfirst="true">
												</textarea></td>
					</tr>
					<tr>
						<th colspan="4">&nbsp;</th>
					</tr>
					<tr>
						<th><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dbdrivername" /><font
							color="red" size="3">*</font></th>
						<td><select id="driverName"
							dojoType="dijit.form.FilteringSelect" name="driverName"
							autocomplete="off" invalidMessage="Invalid driverName"
							store="driverStore" searchAttr="driver"
							onchange="setDBUrl();enableDisable(this); checkConnectionProps(this, 'insert')">
						</select></td>
						<th><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dburl" /><font
							color="red" size="3">*</font>:</th>
						<td><input type="text" id="dbUrl" name="dbUrl" class="urlTxt"
							dojoType="dijit.form.ValidationTextBox" required="true"
							trim="true" ucfirst="true" onkeypress="enableDisable(this)"
							onkeyup=" checkConnectionProps(this, 'insert')" autocomplete="off"/></td>
					</tr>
					<tr>
						<th><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dbuserid" /><font
							color="red" size="3">*</font>:</th>
						<td><input type="text" id="dbuserId" name="dbuserId"
							class="medium" dojoType="dijit.form.ValidationTextBox"
							required="true" trim="true" ucfirst="true"
							onkeypress="enableDisable(this)"
							onkeyup=" checkConnectionProps(this, 'insert')" autocomplete="off"/></td>
						<th><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dbpassword" />:</th>
						<td><input type="password" id="dbPwd" name="dbPwd" autocomplete="off"
							style="width: 17.5em" dojoType="dijit.form.ValidationTextBox"
							required="false" trim="true" ucfirst="true"
							onkeyup=" checkConnectionProps(this, 'insert')" />
						<button dojoType="dijit.form.Button" onClick="testConnection()">
						<img src="ecoweb/images/ecoweb/checked.png" style="display: none"
							id="indicatorSuccess" /> <bean:message
							key="ecoweb.cachedatasource.connect" bundle="ecoweb" /> <img
							src="ecoweb/images/ecoweb/indicator.gif" style="display: none"
							id="indicator" /><img src="ecoweb/images/ecoweb/error.png"
							style="display: none" id="indicatorError" /></button>
						</td>
					</tr>
					
					<tr>
						<td colspan="4">&nbsp;</td>
					</tr>

					<tr>
						<td><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dbtablename" />:</td>
						<td colspan="3"><select id="tableName"
							dojoType="dijit.form.FilteringSelect" name="tableName"
							autocomplete="off" invalidMessage="Invalid tableName"
							onchange="loadData('LoadDBColumns',this, setDBColumns, 'insert');resetByTableValue(this)"
							store="tableStore" searchAttr="table">
						</select></td>
					</tr>
					<tr>
						<th><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dbquery" />:</th>
						<td colspan="3"><textarea dojoType="dijit.form.Textarea"
							id="query" style="width: 40em; height: 5em" name="query"
							onkeyup="resetByTableValue(this);enableDisable(this); enableRunBtn(this)"></textarea>
						<button dojoType="dijit.form.Button" type="button" id="runQry"
							onclick="loadData('LoadDBColumnsQry',document.forms[0].query,setDBColumns, 'insert');">
						<bean:message key="ecoweb.cachedatasource.runqry"
							bundle="ecoweb" /></button>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
					</tr>

					<tr>
						<td><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dblongitude" />:</td>
						<td><select id="longitude"
							dojoType="dijit.form.FilteringSelect" name="longitude"
							autocomplete="off" invalidMessage="Invalid Longitude"
							store="columnStore" searchAttr="column"
							onchange="enableDisableColumns(this)">
						</select></td>
						<td><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dblatitude" />:</td>
						<td><select id="latitude"
							dojoType="dijit.form.FilteringSelect" name="latitude"
							autocomplete="off" invalidMessage="Invalid latitude"
							store="columnStore" searchAttr="column"
							onchange="enableDisableColumns(this)">
							<option value=""><bean:message
								key="ecoweb.cachedatasource.select" bundle="ecoweb" /></option>
						</select></td>
					</tr>
					<tr>
						<td>Coordinates:</td>
						<td><select id="coordinates"
							dojoType="dijit.form.FilteringSelect" name="coordinates"
							autocomplete="off" invalidMessage="Invalid order"
							store="columnStore" searchAttr="column"
							onchange="enableDisableColumns(this)">
						</select></td>
						<td><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dborder" />:</td>
						<td><select id="order" dojoType="dijit.form.FilteringSelect"
							name="order" autocomplete="off" invalidMessage="Invalid order"
							store="columnStore" searchAttr="column">
							<option value=""><bean:message
								key="ecoweb.cachedatasource.select" bundle="ecoweb" /></option>
						</select></td>
					</tr>
					<tr>
						<td colspan="4" align="right">

						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</td>
					</tr>
				</table>
				</td>
			</tr>
		</table>
		</fieldset>
		<table width="100%">
			<tr align="center">
				<td width="100%"><%@ include
					file="/ecoweb/common/projections.jsp"%>
				<td>
			</tr>
		</table>
		<!-- Button Panel -->
		<table width="65%">
			<tr class="bgcolor" align="right">
				<td colspan="7" class="bgcolor" align="right">
				<button dojoType="dijit.form.Button" type="button"
					onclick="window.location='WizardHomeAction.do?operation=ConfigureDatasource'">
				Back</button>
				<button dojoType="dijit.form.Button" id="save" type="submit"
					onclick="return checkUniqueDS()"><bean:message key="admin.common.save" bundle="admin"/></button>
				</td>
			</tr>
		</table>
	</html:form>

	<script>
	dojo.addOnLoad(loadFormValues);	
		function loadFormValues(){			
			//dijit.byId('dialog1').show();
		///Loading Drivers from Drivers.xml.
			loadData('LoadDrivers','configure', setDrivers, 'insert');	
			dijit.byId('tableName').setAttribute('style', 'width:45em' );
			dijit.byId('query').setAttribute('disabled', true);
			//dijit.byId('query').setAttribute('style', 'height:2em' );
			dijit.byId('latitude').setAttribute('disabled', true);
			dijit.byId('longitude').setAttribute('disabled', true);
			dijit.byId('order').setAttribute('disabled', true);
			dijit.byId('coordinates').setAttribute('disabled', true);			
			//dijit.byId('query').setAttribute('disabled', true);
			dijit.byId('tableName').setAttribute('disabled', true);
			dijit.byId('runQry').setAttribute('disabled', true);
			dijit.byId('save').setAttribute('disabled', true);
			//dijit.byId('dialog1').show();
			
		}
	
		function enableDisable(selectedObject){
			if ((dojo.byId('datasourceName').value != '') && (dojo.byId('driverName').value != '') && (dojo.byId('dbUrl').value != '') && (dojo.byId('dbuserId').value != ''))  {
				//dijit.byId('save').setAttribute('disabled', false);
			}else{
				//dijit.byId('save').setAttribute('disabled', true);
			}
		}
		
		function enableRunBtn(selectedObject){
			if(selectedObject.value.length > 0){
				dijit.byId('runQry').setAttribute('disabled', false);
				dijit.byId('tableName').setAttribute('disabled', true);
				 dijit.byId('latitude').setAttribute('disabled', true);
				dijit.byId('longitude').setAttribute('disabled', true);
				dijit.byId('order').setAttribute('disabled', true);
				dijit.byId('coordinates').setAttribute('disabled', true);
			}else if(document.getElementById('indicatorSuccess').style.display != 'none' && selectedObject.value.length == 0){
				dijit.byId('runQry').setAttribute('disabled', true);
				dijit.byId('tableName').setAttribute('disabled', false);
			}
		}

		

</script>
	<script type="text/javascript">
  
</script>
</logic:notPresent> <logic:present name="ecoDatasourceListData">
	<html:form action="UpdateDataSource" method="post">
	<input type="hidden" name="csrf" id="csrf" value="${csrf}">

		<!--  
				***************************************************************************************
					Hidden Values for Combo  for Updation
				***************************************************************************************
-->
		<input type="hidden" name="dbDriverName" />
		<input type="hidden" name="datasourceTypeId" id="datasourceTypeId" />
		<input type="hidden" name="tableQry" id="tableQry" />
		<input type="hidden" name="columnQry" id="columnQry" />
		<input type="hidden" name="conType" id="conType" />
		<input type="hidden" name="dbClass" id="dbClass" />
		<input type="hidden" name="action" id="action" />
		<input type="hidden" name="id" id="id"
			value="<bean:write name="ecoDatasourceListData" property="id" />" />
		<html:hidden property="operation" value="Database" styleId="operation" />
		<fieldset
			style="width: 65%; margin-left: 3px; margin-right: 3px; height: 350">
		<legend class="bigtext"><strong>Database Properties</strong></legend>
		<table width="95%" style="margin-left: 3px; margin-right: 3px">
			<tr align="center">
				<td width="100%">

				<table width="100%">
					<tr>
						<th><bean:message key="ecoweb.cachedatasource.name"
							bundle="ecoweb" /><font color="red" size="3">*</font>:</th>
						<td>
						<table>
							<tr>
								<td><b><bean:write name="ecoDatasourceListData"
									property="datasourceName" /> </b> <input type="hidden"
									id="datasourceName" name="datasourceName"
									value="<bean:write name="ecoDatasourceListData" property="datasourceName" />" />
								</td>
							</tr>
							<tr>
								<td><span id="result"><b></b></span></td>
							</tr>
						</table>
						</td>
						<th><bean:message key="ecoweb.cachedatasource.name"
							bundle="ecoweb" /></th>
						<td><textarea dojoType="dijit.form.Textarea"
							id="datasourceDesc" class="txtareamedium" name="datasourceDesc"
							dojoType="dijit.form.ValidationTextBox" required="false"
							trim="true" ucfirst="true">
										<bean:write name="ecoDatasourceListData"
							property="datasourceDesc" />
									</textarea></td>
					</tr>
					<tr>
						<th><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dbdrivername" /><font
							color="red" size="3">*</font></th>
						<td><select id="driverName"
							dojoType="dijit.form.FilteringSelect" name="driverName"
							autocomplete="off" invalidMessage="Invalid driverName"
							store="driverStore" searchAttr="driver"
							onchange="setDBUrl();enableDisable(this);checkConnectionProps(this, 'update')">
							<option
								value="<bean:write name="ecoDatasourceListData" property="dbDriverName" />">
							<bean:write name="ecoDatasourceListData" property="dbDriverName" />
							</option>
						</select></td>
						<th><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dburl" /><font
							color="red" size="3">*</font>:</th>
						<td><input type="text" id="dbUrl" name="dbUrl" class="urlTxt"
							dojoType="dijit.form.ValidationTextBox" required="true"
							onkeypress="enableDisable(this)"
							onkeyup="checkConnectionProps(this, 'update')" trim="true"
							ucfirst="true" autocomplete="off"
							value="<bean:write name="ecoDatasourceListData" property="dbUrl" />" /></td>
					</tr>
					<tr>
						<th><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dbuserid" /><font
							color="red" size="3">*</font>:</th>
						<td><input type="text" id="dbuserId" name="dbuserId"
							class="medium" dojoType="dijit.form.ValidationTextBox"
							onkeypress="enableDisable(this)"
							onkeyup="checkConnectionProps(this, 'update')" required="true"
							trim="true" ucfirst="true" autocomplete="off"
							value="<bean:write name="ecoDatasourceListData" property="dbuserId" />" /></td>
						<th><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dbpassword" />:</th>
						<td><input type="password" id="dbPwd" name="dbPwd"
							style="width: 17.5em" dojoType="dijit.form.ValidationTextBox"
							required="false" onkeyup=" checkConnectionProps(this, 'update')"
							trim="true" ucfirst="true" autocomplete="off"
							value="<bean:write name="ecoDatasourceListData" property="dbPwd" />" />
						<button dojoType="dijit.form.Button"
							onClick="setDBUrl(dijit.byId('driverName').attr('value'));loadData('TestDBConnectionStatus',this, setDBConnectionStatus, 'insert');"
							onkeyup="checkConnectionProps(this, 'update')"><img
							src="ecoweb/images/ecoweb/checked.png" style="display: none"
							id="indicatorSuccess" /> Connect <img
							src="ecoweb/images/ecoweb/indicator.gif" style="display: none"
							id="indicator" /><img src="ecoweb/images/ecoweb/error.png"
							style="display: none" id="indicatorError" /></button>
						</td>
					</tr>
					
					<tr>
						<td colspan="4">&nbsp;</td>
					</tr>
					<tr>
						<td><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dbtablename" />:</td>
						<td colspan="3"><select id="tableName"
							dojoType="dijit.form.FilteringSelect" name="tableName"
							autocomplete="off" invalidMessage="Invalid tableName"
							onchange="loadData('LoadDBColumns',this, setDBColumns, 'insert');resetByTableValue(this)"
							store="tableStore" searchAttr="table">
						</select> <img src="ecoweb/images/ecoweb/indicator.gif"
							style="display: none" id="indicatorTable" /><img
							src="ecoweb/images/ecoweb/error.png" style="display: none"
							id="indicatorTableError" /></td>
					</tr>
					<tr>
						<th><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dbquery" />:</th>
						<td colspan="3"><textarea dojoType="dijit.form.Textarea"
							id="query" style="width: 44 em; height: 5em"
							onkeyup="resetByTableValue(this);enableDisable(this); enableRunBtn(this)"
							name="query"><bean:write name="ecoDatasourceListData"
							property="query" /></textarea>
						<button dojoType="dijit.form.Button" type="button" id="runQry"
							onclick="loadData('LoadDBColumnsQry',document.forms[0].query, setDBColumns, 'insert');">
						Run Qry</button>
						<img src="ecoweb/images/ecoweb/indicator.gif"
							style="display: none" id="indicatorQry" /><img
							src="ecoweb/images/ecoweb/error.png" style="display: none"
							id="indicatorQryError" /></td>
					</tr>
					
					<tr>
						<td><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dblongitude" />:</td>
						<td width="300px"><select id="longitude"
							dojoType="dijit.form.FilteringSelect" name="longitude"
							autocomplete="off" invalidMessage="Invalid Longitude"
							store="columnStore" searchAttr="column"
							onchange="enableDisableColumns(this)">
							<option
								value="<bean:write name="ecoDatasourceListData" property="longitude" />">
							<bean:write name="ecoDatasourceListData" property="longitude" />
							</option>
						</select><img src="ecoweb/images/ecoweb/indicator.gif"
							style="display: none" id="indicatorLongitude" /><img
							src="ecoweb/images/ecoweb/error.png" style="display: none"
							id="indicatorLongError" /></td>
						<td><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dblatitude" />:</td>
						<td><select id="latitude"
							dojoType="dijit.form.FilteringSelect" name="latitude"
							autocomplete="off" invalidMessage="Invalid latitude"
							store="columnStore" searchAttr="column"
							onchange="enableDisableColumns(this)">
							<option
								value="<bean:write name="ecoDatasourceListData" property="latitude" />">
							<bean:write name="ecoDatasourceListData" property="latitude" /></option>
						</select><img src="ecoweb/images/ecoweb/indicator.gif"
							style="display: none" id="indicatorLatitude" /><img
							src="ecoweb/images/ecoweb/error.png" style="display: none"
							id="indicatorLatError" /></td>
					</tr>
					<tr>
						<td>Coordinates:</td>
						<td><select id="coordinates"
							dojoType="dijit.form.FilteringSelect" name="coordinates"
							autocomplete="off" invalidMessage="Invalid order"
							store="columnStore" searchAttr="column"
							onchange="enableDisableColumns(this)">
						</select><img src="ecoweb/images/ecoweb/indicator.gif"
							style="display: none" id="indicatorCord" /><img
							src="ecoweb/images/ecoweb/error.png" style="display: none"
							id="indicatorCordError" /></td>
						<td><bean:message bundle="ecoweb"
							key="ecomodel.datasources.frameset.database.label.dborder" />:</td>
						<td><select id="order" dojoType="dijit.form.FilteringSelect"
							name="order" autocomplete="off" invalidMessage="Invalid order"
							store="columnStore" searchAttr="column">
							<option
								value="<bean:write name="ecoDatasourceListData" property="order" />">
							<bean:write name="ecoDatasourceListData" property="order" /></option>
						</select><img src="ecoweb/images/ecoweb/indicator.gif"
							style="display: none" id="indicatorOrder" /><img
							src="ecoweb/images/ecoweb/error.png" style="display: none"
							id="indicatorOrderError" /></td>
					</tr>
					<tr>

					</tr>
				</table>

				</td>
			</tr>
		</table>
		</fieldset>
		<table width="100%">
			<tr align="center">
				<td width="100%"><%@ include
					file="/ecoweb/common/projections.jsp"%>
				<td>
			</tr>
		</table>
		<!-- Button Panel -->
		<table width="65%">
			<tr class="bgcolor" align="right">
				<td colspan="4" class="bgcolor" align="right">
				<button dojoType="dijit.form.Button" type="button"
					onclick="window.location ='WizardHomeAction.do?operation=ShowAllDatasource&pageNo=1'">
				Back</button>
				<button dojoType="dijit.form.Button" id="save" type="submit"
					onclick="return UpdateDS()">Update</button>
				</td>
			</tr>
		</table>
	</html:form>

	<script>
	dojo.addOnLoad(loadFormValues);	
		function loadFormValues(){
		///Loading Drivers from Drivers.xml.
			loadData('LoadDrivers','configure', setDrivers, 'update');	
			dijit.byId('tableName').setAttribute('style', 'width:50em' );
			dijit.byId('latitude').setAttribute('disabled', true);
			dijit.byId('longitude').setAttribute('disabled', true);
			dijit.byId('order').setAttribute('disabled', true);
			dijit.byId('coordinates').setAttribute('disabled', true);
			dijit.byId('query').setAttribute('disabled', true);
			dijit.byId('tableName').setAttribute('disabled', true);
			dijit.byId('runQry').setAttribute('disabled', true);
			dijit.byId('save').setAttribute('disabled', true);
		//	setTimeout ( setSavedData, 300 );
			//setTimeout(setSavedDBDtls, 900);
			//setTimeout(setSavedDBInputDtls, 1700);
			//setTimeout(setSavedDBColumnDtls, 2000);
			document.getElementById('indicatorTable').style.display='';
			document.getElementById('indicatorQry').style.display='';
			document.getElementById('indicatorLongitude').style.display='';
			document.getElementById('indicatorLatitude').style.display='';
			document.getElementById('indicatorCord').style.display='';
			document.getElementById('indicatorOrder').style.display='';

			dojo.byId('projectionData').innerHTML = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
			document.getElementById('srcPrjDefinition').value = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
			dijit.byId('srcPrjUnits').setValue('<bean:write name="ecoDatasourceListData" property="srcPrjUnits" />');

		}
		
		function setSavedData(){
			try{
				dijit.byId('driverName').setValue('<bean:write name="ecoDatasourceListData" property="dbDriverName" />');
				setDBUrl('<bean:write name="ecoDatasourceListData" property="dbDriverName" />');
			}catch(er){
			}

			setSavedDBDtls();
			
		}

		function setSavedDBDtls(){
			loadData('TestDBConnectionStatus',this, setDBConnectionStatus, 'update');			
		}

		function setSavedDBInputDtls(){
			dijit.byId('tableName').setValue('<bean:write name="ecoDatasourceListData" property="tableName" />');
			if('<bean:write name="ecoDatasourceListData" property="query" />' != ''){
				loadData('LoadDBColumnsQry',document.forms[0].query, setDBColumns, 'update');
			}else{
				loadData('LoadDBColumns',document.forms[0].tableName, setDBColumns, 'update');
			}

			//setTimeout(setSavedDBColumnDtls, 2000);
			document.getElementById('indicatorTable').style.display='none';
			document.getElementById('indicatorQry').style.display='none';
		}
		
		function setSavedDBColumnDtls(modeType){
			//alert(modeType)
			if(modeType !== 'insert'){
				try{
					dijit.byId('latitude').setValue('<bean:write name="ecoDatasourceListData" property="latitude" />');
				}catch(err){}
				document.getElementById('indicatorLatitude').style.display='none';
				try{
					dijit.byId('longitude').setValue('<bean:write name="ecoDatasourceListData" property="longitude" />');
				}catch(err){}
				
				document.getElementById('indicatorLongitude').style.display='none';
				try{
					dijit.byId('order').setValue('<bean:write name="ecoDatasourceListData" property="order" />');
				}catch(err){}			
				document.getElementById('indicatorOrder').style.display='none';
				try{
					dijit.byId('coordinates').setValue('<bean:write name="ecoDatasourceListData" property="coordinates" />');			
				}catch(err){}
				
				document.getElementById('indicatorCord').style.display='none';
			}
		}

		function setDBUrl(selectedDriver){
			if(selectedDriver == null || selectedDriver == undefined || selectedDriver == ''){
					selectedDriver = '<bean:write name="ecoDatasourceListData" property="dbDriverName" />';
			}			
			for(i=0;i<dbDriversDtlsArray.length;i++){
				if(dbDriversDtlsArray[i].dClass == selectedDriver){
					//dojo.byId('dbUrl').value = dbDriversDtlsArray[i].dUrl;
					dojo.byId('tableQry').value = dbDriversDtlsArray[i].tblQry;
					dojo.byId('columnQry').value = dbDriversDtlsArray[i].colQry;
					dojo.byId('conType').value = dbDriversDtlsArray[i].conType;
					dojo.byId('dbClass').value = dbDriversDtlsArray[i].dClass;
				}
			}    
		}

		function enableDisable(selectedObject){
			if ( (dojo.byId('driverName').value != '') && (dojo.byId('dbUrl').value != '') && (dojo.byId('dbuserId').value != ''))  {
				//dijit.byId('save').setAttribute('disabled', false);
			}else{
				//dijit.byId('save').setAttribute('disabled', true);
			}
		}
		
		function enableRunBtn(selectedObject){
			if(selectedObject.value != ''){
				dijit.byId('runQry').setAttribute('disabled', false);
				dijit.byId('tableName').setAttribute('disabled', true);
				 dijit.byId('latitude').setAttribute('disabled', true);
				dijit.byId('longitude').setAttribute('disabled', true);
				dijit.byId('order').setAttribute('disabled', true);
				dijit.byId('coordinates').setAttribute('disabled', true);
			}else{
				dijit.byId('runQry').setAttribute('disabled', true);
				dijit.byId('tableName').setAttribute('disabled', false);
			}
		}
</script>

</logic:present> <script>
	var timeDiff  =  {
		setStartTime:function (){
			d = new Date();
			time  = d.getTime();
		},

		getDiff:function (){
			d = new Date();
			return (d.getTime()-time);
		}
	}

</script>
</body>