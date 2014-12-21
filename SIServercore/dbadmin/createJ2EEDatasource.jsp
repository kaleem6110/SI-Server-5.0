<%@page import="com.spacetimeinsight.db.model.util.DataModelsCache"%>
<%@page import="com.spacetimeinsight.db.config.model.DatabaseTypesMaster"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="java.util.List"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>

<html:html locale="true">

<%
	List databaseTypesMasterList = DataModelsCache.getInstance().retrieve(
			DatabaseTypesMaster.class.getName());
	pageContext.setAttribute("databaseTypesMasterList", databaseTypesMasterList);
%>

<head>
<%@ include file="/common/dojo.jsp" %>
<script type="text/javascript" src="js/ecoweb.js" ></script>
<title>Create J2ee Datasource</title>        
<!-- SCRIPT SECTION -->   
<script>
var dbConnectionMasterArray = [];
<logic:present name="databaseTypesMasterList" scope="page">
<logic:iterate name="databaseTypesMasterList" id="databaseTypesMasterDtls">
	dbConnectionMasterArray.push({dClass: '<bean:write name="databaseTypesMasterDtls" property="driverClass" />', dUrl: '<bean:write name="databaseTypesMasterDtls" property="connectionUrl" filter="false"/>', conType: '<bean:write name="databaseTypesMasterDtls" property="dbConnectionType" />', id: '<bean:write name="databaseTypesMasterDtls" property="id" />', connPoolProp: '<bean:write name="databaseTypesMasterDtls" property="connectionPoolProperties" />'});	
</logic:iterate>
</logic:present>

function resetHandler(){
	dijit.byId("newEcoDataSourceForm").reset();            
}
</script>
<!-- END SCRIPT SECTION -->
</head>

<body class="tundra bodybg">
<form name="newEcoDataSourceForm"  id="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/ConfigureDataSource.do?operation=configureJ2EEDsource&action=insert" dojoType='dijit.form.Form'>
<input type="hidden" name="csrf" id="csrf" value="${csrf}">

<table width="100%">
	<tr>
		<td class="pageTitle paddingTitle">
    		<table width="100%">    
    			<tr>
					<td class="redtitle" height="60px" align="left" valign="top">
						<strong class="pageTitle paddingTitle" style="padding-left:0px"><bean:message key="j2eeDS.create.datasource" bundle="j2eeDS" /><br/>
            			<span class="paddingTitleDesc bodytext" style="padding-left:0px"><bean:message key="j2eeDS.create.datasourceDesc" bundle="j2eeDS" /></span></strong>
	    			</td>
 	    		</tr>
    			<tr>
    				<td>
						<span><html:errors/></span><br/>
                    </td>
                </tr>
                <tr>
                	 <td align="left" valign="top">
                     <!-- Form -->
                     	 <table border="0">
                         	<tr>   
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="j2eeDS.datasourceName" bundle="j2eeDS" /><span style='color:red;font-size:12px'>*</span> : </label>
								</td>
								<td align="left" >
									<input type="text" name='datasourceName' maxlength='30' id='datasourceName' dojoType='dijit.form.ValidationTextBox' maxLength="0"   trim='true' required='true' invalidMessage='Please provide value' autocomplete="off" value='' onBlur="validatej2eeDataSourceName(this);"/>
								</td>
								<td width="30px"></td>						
								<td align="right" style="padding-right:5px">
									<label class="label">
										<bean:message key="j2eeDS.providerType" bundle="j2eeDS" /><span style='color:red;font-size:12px'>*</span> : </label>
								</td>
								<td align="left" >
                                    <select dojoType="dijit.form.FilteringSelect"  name='databaseConnectionTypeId' id='databaseConnectionTypeId' autocomplete="off" value='' onChange="resetFormValuesOnProviderType()"> 
                                        <Option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></Option>	
                                        <Option value="2">DBCP</Option>
                                        <Option value="1">RAW</Option>				
                                        <Option value="3">Proxol</Option>
                                    </select>
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
							<tr><td colspan="5" height="13px"></td></tr>
							<tr>
                                <td rowspan="3" align="right" style="padding-right:5px">
                                    <label class="label"><bean:message key="j2eeDS.description" bundle="j2eeDS" /> : </label>
                                </td>  
                                <td rowspan="3" align="left" >
                                    <textarea dojoType="dijit.form.SimpleTextarea" id="description" class="txtareamedium" name="description" dojoType="dijit.form.ValidationTextBox" required="false" trim="true" ucfirst="true" style="width:200px" ></textarea>
                                </td>
                                <td width="30px"></td>
                                <td align="right" style="padding-right:5px">
                                                <label class="label"><bean:message key="j2eeDS.initialSize" bundle="j2eeDS" /> : </label>
                                </td>
                                <td align="left" >
                                                <input type="text" name='initialSize' maxlength='30' id='initialSize' dojoType='dijit.form.ValidationTextBox' autocomplete="off" value='0'/> 
                                 </td>
                           	</tr>
                            <tr><td colspan="3" height="13px"></td></tr>
                            <tr>
								<td width="30px"></td>
								<td align="right" style="padding-right:5px">
                                   <label class="label"><bean:message key="j2eeDS.maxActive" bundle="j2eeDS" /> : </label>
                                 </td>
                                 <td align="left" >
                                    <input type="text" name='maxActive' maxlength='30' id='maxActive' dojoType='dijit.form.ValidationTextBox' autocomplete="off" value='8'/>
                                 </td>
                            </tr>
							<tr><td colspan="5" height="13px"></td></tr>
							<tr>  
                                <td align="right" style="padding-right:5px">
                                    <label class="label"><bean:message key="j2eeDS.driverName" bundle="j2eeDS" /><span style='color:red;font-size:12px'>*</span> : </label>
                                </td>  
                                <td align="left" >
                                    <select dojoType="dijit.form.FilteringSelect"  name='databaseTypeId' id='databaseTypeId' autocomplete="off" value='' onChange="loadDatabaseConnectionValues(this);" > 
                                        <Option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></Option>	
                                        <logic:present name="databaseTypesMasterList" scope="page">
                                        <logic:iterate name="databaseTypesMasterList" id="databaseTypesMasterDtls">
                                            <option value="<bean:write name="databaseTypesMasterDtls" property="id" />">
                                                <bean:write name="databaseTypesMasterDtls" property="driverName" />
                                            </option>
                                        </logic:iterate>
                                        </logic:present>			
                                    </select>
                                </td>		
								<td width="30px"></td>
								<td align="right" style="padding-right:5px">
                                    <label class="label"><bean:message key="j2eeDS.maxIdle" bundle="j2eeDS" /> : </label>
                                </td>
                                <td align="left" >
                                    <input type="text" name='maxIdle' maxlength='30' id='maxIdle' dojoType='dijit.form.ValidationTextBox' autocomplete="off" value='8'/>
                                </td>		
							</tr>
							<tr><td colspan="5" height="13px"></td></tr>
							<tr> 
                                <td align="right" style="padding-right:5px">
                                    <label class="label"><bean:message key="j2eeDS.url" bundle="j2eeDS" /><span style='color:red;font-size:12px'>*</span> : </label>
                                </td>
                                <td align="left" >
                                    <input type="text" name='url' maxlength='500' id='url' dojoType='dijit.form.ValidationTextBox' maxLength="0"   trim='true' required='true' invalidMessage='Please provide value' autocomplete="off" value=''/>
                                </td>
                                <td width="30px"></td>
                                <td align="right" style="padding-right:5px">
                                    <label class="label"><bean:message key="j2eeDS.minIdle" bundle="j2eeDS" /> : </label>
                                </td>
                                <td align="left" >
                                    <input type="text" name='minIdle' maxlength='30' id='minIdle' dojoType='dijit.form.ValidationTextBox' autocomplete="off" value='0'/>
                                </td>
                            </tr>
							<tr><td colspan="5" height="13px"></td></tr>
							<tr>
                                <td align="right" style="padding-right:5px">
                                    <label class="label"><bean:message key="j2eeDS.username" bundle="j2eeDS" />  : </label>
                                </td>
                                <td align="left" >
                                    <input type="text" name='userName' maxlength='30' id='userName' dojoType='dijit.form.ValidationTextBox' trim='true' autocomplete="off"  value=''/>
                                </td>
                        		<td width="30px"></td>
                                <td align="right" style="padding-right:5px">
                                    <label class="label"><bean:message key="j2eeDS.maxWait" bundle="j2eeDS" /> : </label>
                                </td>
                                <td align="left" >
                                    <input type="text" name='maxWait' maxlength='30' id='maxWait' dojoType='dijit.form.ValidationTextBox' autocomplete="off" value='60000'/> 
                                </td>
                          	</tr>
							<tr><td colspan="5" height="13px"></td></tr>
							<tr>
                                <td align="right" style="padding-right:5px">
                                    <label class="label"><bean:message key="j2eeDS.password" bundle="j2eeDS" /> : </label>
                                </td>
                                <td>
                                    <input type='password' name='dbPwd' dojoType='dijit.form.ValidationTextBox' maxLength="30"   trim='true'  invalidMessage='Please provide value' id='dbPwd' autocomplete='off'  value=''/>
                                </td>	
                                <td width="30px"></td>
                                <td align="right" style="padding-right:5px">
                                    <label class="label"><bean:message key="j2eeDS.testWhileIdle" bundle="j2eeDS" /> : </label>
                                    
                                </td>
                                <td align="left" >
                                    <select dojoType="dijit.form.FilteringSelect" name='testWhileIdle' id='testWhileIdle' autocomplete="off" value=''> 									<Option value="false" selected>false</Option>
                                        <Option value="true">true</Option>
                                    </select>
                                </td>
                          	</tr>
							<tr><td colspan="5" height="13px"></td></tr>
							<tr>
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="j2eeDS.defaultAutoCommit" bundle="j2eeDS" /> : </label>
								</td>
								<td align="left" >
                                    <select dojoType="dijit.form.FilteringSelect"   name='defaultAutoCommit' id='defaultAutoCommit' autocomplete="off" value=''>
                                        <Option value="false" selected>false</Option>
                                        <Option value="true">true</Option>								
                                    </select>
								</td>
                                <td width="30px"></td>
                                <td rowspan="3" align="right" style="padding-right:5px">
                                	<label class="label"><bean:message key="j2eeDS.customProps" bundle="j2eeDS" /> : </label>
                                </td>
								<td rowspan="3" align="left" >
                                	<textarea dojoType="dijit.form.SimpleTextarea" id="connectionProperties" class="txtareamedium" name="connectionProperties" dojoType="dijit.form.ValidationTextBox" required="false" trim="true" ucfirst="true" style="width:200px" ></textarea>
                                </td>
							</tr>
                            
							<tr><td colspan="3" height="13px"></td></tr>
                            <tr>
								<td align="right" style="padding-right:5px">
									<label class="label"><bean:message key="j2eeDS.validationQuery" bundle="j2eeDS" /> : </label>
								</td>
								<td align="left" >
                                    <input type="text" name='validationQuery' id='validationQuery' dojoType='dijit.form.ValidationTextBox' autocomplete='off' trim='true'   value=''/>
								</td>
                                <td width="30px"></td>
                            </tr>
                            <tr><td colspan="5" height="13px"></td></tr>
	
							<!--<input type="hidden" name="testOnBorrow" id="testOnBorrow" value="false"> -->
                            <tr>
                                <td align="right" style="padding-right:5px">
                                    <label class="label"><bean:message key="j2eeDS.testOnBorrow" bundle="j2eeDS" /> : </label>
                                </td>
                                <td align="left" >
                                    <select dojoType="dijit.form.FilteringSelect"   name='testOnBorrow' id='testOnBorrow' autocomplete="off" value=''>
                                        <Option value="false" selected>false</Option>
                                        <Option value="true">true</Option>								
                                    </select>
                                </td>
                            </tr>	
                            	<input type="hidden" name="encryptedPassword" id="encryptedPassword" value=""/><input type="hidden" name="virtualPassword" id="virtualPassword" value=""/> <input type="hidden" name="id" id="id" value=""/>
                            
            		</table>
              	</td>
      		</tr>
       </table>      
    </tr>
</table>

            
<table border="0" width="100%" style="padding-top:30px">

<tr class="barColor">
	<td width="100%" align="center">
		<button dojoType="dijit.form.Button" type="button" onClick="window.location ='<%=ServerUtils.getContextName(request)%>/adminMain.do'"> <bean:message key="dbconfig.home" /> </button>
		
		<button dojoType="dijit.form.Button" type="button" id='backBtn'  onclick="window.location ='<%=ServerUtils.getContextName(request)%>/WizardHomeAction.do?operation=showAllJ2EEDatasource&pageNo=1'">  <bean:message key="dbconfig.back" /> </button>
        <button dojoType="dijit.form.Button" type="button" id='submitBtn' onClick="submitHandler()" > <bean:message key="dbconfig.save" /> </button>
        <button dojoType="dijit.form.Button" type="reset" id='resetBtn' onClick="resetHandler()" > <bean:message key="dbconfig.reset" /> </button>
	</td>
</tr>
</table>
</form>

<!-- SCRIPT SECTION-->
<script>
function submitHandler(){
	if(dijit.byId("newEcoDataSourceForm").validate() && validateHandler()){
		
		testDatabaseConnection();
	}
}


function validateHandler(){
	if(dijit.byId('databaseTypeId').value == ""){
		showEmptyDialog("<bean:message key="j2eeDS.selectDriverName" bundle="j2eeDS" />", "Alert");
		return false;
	}

	if(dijit.byId('databaseConnectionTypeId').value == ""){
		showEmptyDialog("<bean:message key="j2eeDS.selectProviderType" bundle="j2eeDS" />", "Alert");
		return false;
	}

	if(!validateIntervalValue(dojo.byId('initialSize').value, 'Initial Size',true)){
		return false;
	}

	if(!validateIntervalValue(dojo.byId('maxActive').value, 'Max Active',true)){
		return false;
	}

	if(!validateIntervalValue(dojo.byId('maxIdle').value, 'Max Idle',true)){
		return false;
	}
if(dijit.byId('description').attr('value').length > 499){
 showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />", "Datasource");
return false;
	  }
    if(dijit.byId('connectionProperties').attr('value').length > 255){
        showEmptyDialog("<bean:message key="j2eeDS.additionalProvidorProperties.check" bundle="j2eeDS" />", "Datasource");
        return false;
    }
	if(!validateIntervalValue(dojo.byId('minIdle').value, 'Min Idle',true)){
		return false;
	}

	if(!validateIntervalValue(dojo.byId('maxWait').value, 'Max Wait',true)){
		return false;
	}

	 
	  
	if( (dijit.byId('testOnBorrow').value == "true" || dijit.byId('testWhileIdle').value == "true" ) &&  dijit.byId('validationQuery').value ==  ""  ) {	    
		showEmptyDialog("<bean:message key="j2eeDS.fillValidQuery" bundle="j2eeDS" />", "Alert");		
		return false;
	}

	return true;
}

function testDatabaseConnection(){
	var databaseType = dijit.byId('databaseConnectionTypeId').value;
	var databaseConfigName = dijit.byId('datasourceName').value;
	var driverClassName = getDatabaseClassDtls(dijit.byId('databaseTypeId').value);
	var userName = dijit.byId('userName').value;
	var dbPwd = dijit.byId('dbPwd').value;
	var dbUrl = dijit.byId('url').value;
	var connectionProperties = dijit.byId('connectionProperties').value;
	var defaultAutoCommit = dijit.byId('defaultAutoCommit').value;
	var initialSize = dijit.byId('initialSize').value;
	var maxActive = dijit.byId('maxActive').value;
	var maxIdle = dijit.byId('maxIdle').value;
	var minIdle = dijit.byId('minIdle').value;
	var maxWait = dijit.byId('maxWait').value;
	var validationQuery = dijit.byId('validationQuery').value;
	var testOnBorrow = dijit.byId('testOnBorrow').value;
	//var testOnBorrow = 'false';
	var testWhileIdle= dijit.byId('testWhileIdle').value;
	 
	if ((dbPwd.indexOf("%") > -1) == true) {
		 var res = dbPwd.replace(/%/g, "%25");
		 dbPwd = res;
	}
	if ((dbPwd.indexOf("&") > -1) == true) {
		 var res = dbPwd.replace(/&/g, "%26");
		 dbPwd = res;
	}
	

	var uriDtls = 'databaseType='+databaseType+'&driverClassName='+driverClassName+'&userName='+userName+'&dbPwd='+dbPwd+'&dbUrl='+dbUrl+'&connectionProperties='+connectionProperties+'&defaultAutoCommit='+defaultAutoCommit+'&initialSize='+initialSize+'&maxActive='+maxActive+'&maxIdle='+maxIdle+'&minIdle='+minIdle+'&maxWait='+maxWait+'&validationQuery='+validationQuery+'&testOnBorrow='+testOnBorrow+'&encryptedPassword=&mode=insert&databaseConfigName='+databaseConfigName+'&testWhileIdle='+testWhileIdle;

	loadData('TestDatabaseConnectionStatus', uriDtls, returnConnectionStatus, 'modify');
}



function loadDatabaseConnectionValues(obj){	 
	var i=0; for(i=0;i<dbConnectionMasterArray.length; i++){
		if(dbConnectionMasterArray[i].id == dijit.byId('databaseTypeId').attr('value')){
			dijit.byId('url').setValue(dbConnectionMasterArray[i].dUrl);	
			dijit.byId('databaseConnectionTypeId').setValue(dbConnectionMasterArray[i].conType);
			dijit.byId('connectionProperties').setValue(dbConnectionMasterArray[i].connPoolProp);
			//dijit.byId('databaseConnectionTypeId').setAttribute('disabled', true);
		}
	}
	if(dijit.byId('databaseTypeId').attr('value') == ''){
		dijit.byId('url').setValue(''); 
		dijit.byId('databaseConnectionTypeId').setValue('');
		//dijit.byId('databaseConnectionTypeId').setAttribute('disabled', false);	
	}
}

function getDatabaseClassDtls(objReference){
	var i=0; for(i=0;i<dbConnectionMasterArray.length; i++){
		if(dbConnectionMasterArray[i].id == objReference ){
			return dbConnectionMasterArray[i].dClass;
		}
	}
	
}


function resetFormValuesOnProviderType(){
	var providerTypeId = dijit.byId('databaseConnectionTypeId').value;
	if(providerTypeId == 1){
		dijit.byId('validationQuery').setValue('');
		dijit.byId('testWhileIdle').setValue('false');
		dijit.byId('testOnBorrow').setValue('false');
		dijit.byId('defaultAutoCommit').setValue('false');
		resetFormValues(true);
	}else{
		resetFormValues(false);
	}
	dijit.byId('validationQuery').setValue('');
	dijit.byId('connectionProperties').setValue('');
}

function resetFormValues(status){
	// dijit.byId('connectionProperties').setAttribute('disabled', status );
	dijit.byId('defaultAutoCommit').setAttribute('disabled', status );
	dijit.byId('initialSize').setAttribute('disabled', status );
	dijit.byId('maxActive').setAttribute('disabled', status );
	dijit.byId('maxIdle').setAttribute('disabled', status );
	dijit.byId('minIdle').setAttribute('disabled', status );
	dijit.byId('maxWait').setAttribute('disabled', status );
	dijit.byId('validationQuery').setAttribute('disabled', status );
	dijit.byId('testOnBorrow').setAttribute('disabled', status );	
	dijit.byId('testWhileIdle').setAttribute('disabled', status );
}

</script>
<!-- END SECTION -->
</body>
</html:html>