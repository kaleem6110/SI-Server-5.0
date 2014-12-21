<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>
<%@ taglib uri="/tags/fileupload" prefix="upload"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ include file="/common/dojo.jsp"%>
<script type="text/javascript">
        var modelList   = {identifier:"model",items:[{model:""}]};
        var modelStore  = new dojo.data.ItemFileReadStore({data: modelList});
        
        var columnList  = {identifier:"column",items:[{column:""}]};
        var columnStore = new dojo.data.ItemFileReadStore({data: columnList});
        
        var driverList  = {identifier:"driver",items:[{driver:"",label:""}]};
        var driverStore = new dojo.data.ItemFileReadStore({data: driverList});
        
</script>
<script>
    
      function enableRunBtns(){	
            /*  try {

			if(dijit.byId('hibernateQuery').attr('value').length > 0){
					dijit.byId('hibernateName').reset();
dijit.byId('hibernateName').setValue('');
                   dijit.byId('runQry').setAttribute('disabled', false);
				   dijit.byId('hibernateName').setAttribute('disabled', true);	
                //dijit.byId('runQry').setAttribute('disabled', false);
                dijit.byId('hibernateName').setAttribute('disabled', true);
                 dijit.byId('hibernateLatitude').setAttribute('disabled', true);
                dijit.byId('hibernateLongitude').setAttribute('disabled', true);
                dijit.byId('hibernateOrder').setAttribute('disabled', true);
                dijit.byId('hibernateCoordinates').setAttribute('disabled', true);
				dijit.byId("address").setAttribute('disabled', true);
				dijit.byId("addCity").setAttribute('disabled', true);
				dijit.byId("addCounty").setAttribute('disabled', true);
				dijit.byId("addState").setAttribute('disabled', true);
				dijit.byId("addCountry").setAttribute('disabled', true);
				dijit.byId("addZipCode").setAttribute('disabled', true);
              


            }
			  else{
		   dijit.byId('runQry').setAttribute('disabled', true);
		  // dijit.byId('hibernateQuery').setAttribute('disabled', true);
		   dijit.byId('hibernateName').setAttribute('disabled', false);
		 }

            } catch(err){}*/
        }
    function checkUniqueDS(){   
    	if((dijit.byId('datasourceName').attr('value'))==''){
            showEmptyDialog("<bean:message key="datasource.provide.ds.name" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />");      
            return false;
            }
        try{
      if((document.getElementById('result').innerHTML.indexOf('Not') == -1) && (document.getElementById('result').innerHTML != '<B></B>')){		
		if(!ajaxTxtBoxSplCh(dijit.byId('datasourceName').attr('value'))){
		return false;
		}
	
				 if(dijit.byId('datasourceDesc').attr('value').length > 499){
				 showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />", "<bean:message key="datasource.alert" bundle="ds" />");
					return false;
				  }

				  if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
				return false;
			}


            return setparams('formData');
        }
      showEmptyDialog("<bean:message key="datasource.ds.name.not.available" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />");  
      return false;
        } catch(err){}

		
    }
    function resetFilterBox(){
		
       
			
			
	 try{
			dijit.byId('hibernateLatitude').reset();
		
			dijit.byId('hibernateLongitude').reset();
		
			dijit.byId('hibernateOrder').reset();
		
			dijit.byId('hibernateCoordinates').reset();

			dijit.byId("address").reset();
				dijit.byId("addCity").reset();
				dijit.byId("addCounty").reset();
					dijit.byId("addState").reset();
				dijit.byId("addCountry").reset();
				dijit.byId("addZipCode").reset();




		}catch(err){
		}

}
        function setparams(formName){
            try{
            document.getElementById('operation').value='hibernate';
            document.getElementById("datasourceTypeId").value = '7';    
            //document.getElementById('dbDriverName').value = dijit.byId('driverName').attr('value');
            //handler parameter for Dispatch Action
            //document.forms[0].operation.value = 'Database';
            // dijit.byId('hibernateQuery').setAttribute('disabled', false);
            
            dijit.byId('hibernateOrder').setAttribute('disabled', false);
            dijit.byId('hibernateName').setAttribute('disabled', false);

			var disablearray = "hibernateLatitude,hibernateLongitude,hibernateCoordinates,address,addCity,addCountry,addCounty,addState,addZipCode,hibernateOrder";
			var	array = disablearray.split(",");
	for(var j=0; j<array.length;j++){
  dijit.byId(array[j]).setAttribute('disabled', false);

}
			if(dijit.byId('hibernateName').value  == null ||dijit.byId('hibernateName').value  == "" || dijit.byId('hibernateName').value == "-- select --"){
				showEmptyDialog("<bean:message key="datasource.check.hibernate.model" bundle="ds"/>", "<bean:message key="datasource.alert" bundle="ds" />");	
				loadFormValues();
				return false;
			}

            return true;
            } catch(err){}
    }


  function UpdateDS(){
	  
   	 if(dijit.byId('datasourceDesc').attr('value').length > 499){
				 showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />", "<bean:message key="datasource.alert" bundle="ds" />");
		return false;
	  }
	  if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
				return false;
		}
		if(dijit.byId('hibernateName').value  == null ||dijit.byId('hibernateName').value  == "" || dijit.byId('hibernateName').value == "-- select --"){
				showEmptyDialog("<bean:message key="datasource.check.hibernate.model" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />");
			loadFormValues();				
				return false;
		}
       // if((document.getElementById('result').innerHTML.indexOf('Not') == -1) && (document.getElementById('result').innerHTML != '<b></b>')){       
            return updateparams('formData');
    		showEmptyDialog("<bean:message key="datasource.ds.name.not.available" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />");	
        return false;
  }

  function updateparams(formName){
      try{
            document.getElementById('operation').value='updateHibernate';
            document.getElementById('action').value='action';
            document.getElementById("datasourceTypeId").value = '7';    
            //document.getElementById('dbDriverName').value = dijit.byId('driverName').attr('value');
            //  dijit.byId('hibernateQuery').setAttribute('disabled', false);
            
            dijit.byId('hibernateOrder').setAttribute('disabled', false);
			var disablearray = "hibernateLatitude,hibernateLongitude,hibernateCoordinates,address,addCity,addCountry,addCounty,addState,addZipCode,hibernateOrder";
			var	array = disablearray.split(",");
	for(var j=0; j<array.length;j++){
  dijit.byId(array[j]).setAttribute('disabled', false);

}
            dijit.byId('hibernateName').setAttribute('disabled', false);
            
            return true;
        } catch(err){}
    }


function testConnection(){
     // Split up bar into 5% segments
    try{
        loadData('TestDBConnectionStatus',this, setDBConnectionStatus , 'insert');
    } catch(err){}
}

function checkConnectionProps(selectedObject, operationType){
if(operationType == 'insert'){
    try{
        if(selectedObject.name=="dbUrl" && connectionPropsArray[3] != document.getElementById('dbUrl').value && !!connectionPropsArray[3]){
            resetAllValues();       
            disableEnableTableQry();
            
        }else if(selectedObject.name=="dbPwd" && connectionPropsArray[1] != document.getElementById('dbPwd').value && !!connectionPropsArray[1]){
            resetAllValues();
            disableEnableTableQry();
            
        }else if(selectedObject.name=="driverName" && connectionPropsArray[2] != dijit.byId('driverName').attr('value') && !!connectionPropsArray[2]){
            resetAllValues();
            disableEnableTableQry();
            
        }else if(selectedObject.name=="dbuserId" && connectionPropsArray[0] != document.getElementById('dbuserId').value && !!connectionPropsArray[0]){
            resetAllValues();
            disableEnableTableQry();
            
        }
        
        
    }catch(er){
    }
}else if(operationType == 'update'){
    try{
        if(selectedObject.name=="dbUrl" && connectionPropsArray[3] != document.getElementById('dbUrl').value ){
            resetAllValues();
            disableEnableTableQry();
            
        }else if(selectedObject.name=="dbPwd" && connectionPropsArray[1] != document.getElementById('dbPwd').value ){
            resetAllValues();
            disableEnableTableQry();
            
        }else if(selectedObject.name=="driverName" && connectionPropsArray[2] != dijit.byId('driverName').attr('value') ){
            resetAllValues();
            disableEnableTableQry();
            
        }else if(selectedObject.name=="dbuserId" && connectionPropsArray[0] != document.getElementById('dbuserId').value ){
            resetAllValues();
            disableEnableTableQry();
            
        }
            
        
    }catch(er){
    }
}
    //if(connectionPropsArray.selectedObject.name)
}

function disableEnableTableQry(){
/*	//if(document.getElementById('indicatorSuccess').style.display == '' ){             
        try{
                dijit.byId('hibernateQuery').setValue('');
                dijit.byId('hibernateQuery').setAttribute('disabled', true);
                dijit.byId('runQry').setAttribute('disabled', true);
                dijit.byId('hibernateName').setAttribute('disabled', true);     
        } catch(err){}
    //  }
        //document.getElementById('indicator').style.display='none';
        //document.getElementById('indicatorError').style.display='none';
        //document.getElementById('indicatorSuccess').style.display='none';
*/}

function resetByTableValue(tableNameArray,flag) {
	try{
var disablearray = "hibernateLatitude,hibernateLongitude,hibernateCoordinates,address,addCity,addCountry,addCounty,addState,addZipCode,hibernateOrder"
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


/*if(dijit.byId('hibernateName').attr('value') != ''){
dijit.byId('hibernateQuery').setAttribute('disabled', true);
  dijit.byId('runQry').setAttribute('disabled', true);
}
else{
	dijit.byId('hibernateQuery').setAttribute('disabled', false);
  dijit.byId('runQry').setAttribute('disabled', false);
}*/

 }catch(err){}

  }
    

    function enableDisableColumns(selectedObject){
			try{

				if(dijit.byId('hibernateLatitude').attr('value') == '' && dijit.byId('hibernateLongitude').attr('value') == '' && dijit.byId('hibernateCoordinates').attr('value') == '' && dijit.byId('address').attr('value') == '' && dijit.byId('addCity').attr('value') == '' && dijit.byId('addCountry').attr('value') == '' && dijit.byId('addCounty').attr('value') == '' && dijit.byId('addState').attr('value') == '' && dijit.byId('addZipCode').attr('value') == '' )  {
		   
	         resetByTableValue('',false);
	   }
			
				if((selectedObject.name == 'hibernateLongitude' || selectedObject.name == 'hibernateLatitude') && (document.getElementById('hibernateLatitude').value != '' || document.getElementById('hibernateLongitude').value != '' ) ){
					resetByTableValue("hibernateCoordinates,address,addCity,addCountry,addCounty,addState,addZipCode",true);

            }    if( selectedObject.name == 'hibernateCoordinates' && document.getElementById('hibernateCoordinates').value != ''){	
				resetByTableValue("hibernateLatitude,hibernateLongitude,address,addCity,addCountry,addCounty,addState,addZipCode",true);

}
if((document.forms[0].address.value != '' || document.forms[0].addCity.value != '' || document.forms[0].addCountry.value != '' || document.forms[0].addCounty.value != '' || document.forms[0].addState.value != '' || document.forms[0].addZipCode.value != '' )&& (selectedObject.name == 'address' || selectedObject.name == 'addCity' || selectedObject.name == 'addCountry'|| selectedObject.name == 'addCounty'|| selectedObject.name == 'addState'|| selectedObject.name == 'addZipCode') ){
	resetByTableValue("hibernateLatitude,hibernateLongitude,hibernateCoordinates",true);
       

}
        } catch(err){}
    }
    
     function enableDisable(){
        /*if(document.getElementById('datasourceName').value != '' && document.getElementById('hibernateName').value != ''){
               dijit.byId('save').setAttribute('disabled',false);
                          }
         else{
   
               dijit.byId('save').setAttribute('disabled',true);
              }*/
           
           }


 function resetAddressFields(tmpObj)
  {
    var disablearray = "hibernateLatitude,hibernateLongitude,hibernateCoordinates,address,addCity,addCountry,addCounty,addState,addZipCode";
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
<body class="tundra bodybg">
<logic:notPresent name="modeType">
  <bean:define id="modeType" value="insert" />
</logic:notPresent>
<logic:notPresent name="ecoDatasourceListData">
<form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/ConfigureDataSource.do"  onsubmit="return checkUniqueDS()">
</logic:notPresent>
<logic:present name="ecoDatasourceListData">
<logic:notEqual name="modeType" value="insert">
<form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/UpdateDataSource.do" onsubmit="return UpdateDS()">
</logic:notEqual>
<logic:equal name="modeType" value="insert">
<form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/ConfigureDataSource.do" onsubmit="return checkUniqueDS()">
  </logic:equal>
  </logic:present>
  
  <input type="hidden" id="csrf" name="csrf" value="${csrf}">
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
    <input type="hidden" name="id"  id="id" value="<bean:write name="ecoDatasourceListData" property="id" />"/> </logic:present>
  <!--  
                ***************************************************************************************
                    Database Mashup ---- Input Properties & parameters
                ***************************************************************************************
     -->
  <!--  
                ***************************************************************************************
                    Hidden Values for Combo 
                ***************************************************************************************
-->
  <input type="hidden" name="dbDriverName" />
  <input type="hidden" name="datasourceTypeId" id="datasourceTypeId"/>
 <!-- <input type="hidden" name="tableQry" id="tableQry"/>
  <input type="hidden" name="columnQry" id="columnQry"/>-->
  <input type="hidden" name="conType" id="conType"/>
  <input type="hidden" name="dbClass" id="dbClass"/>
  <html:hidden property="operation" value="hibernate" styleId="operation"/>
  <table width="100%" cellspacing="0" cellpadding="0">
	<tr>
		<td align="left">
			<table width="100%" cellpadding="0" cellspacing="0"  align="left">
				<tr>
      
					<td  align="left" valign="top"  align="justify">
						<table width="100%" cellspacing="0" cellpadding="0">
        

							<tr>
								<td width = "100%" class="pageTitle paddingTitle">      
									<bean:message key="datasource.hiberanteFieldset" bundle="ds"/>
								</td>
							</tr>
		
							<tr >
								<td width = "100%"  class="paddingTitleDesc bodytext">      
									<strong><bean:message key="datasource.projectionDescription" bundle="ds"/></strong>
								</td>
							</tr>
		
							<tr>
								<td width = "100%" style="padding-left:67px;"class="error">
									<html:errors bundle="ecoweb"/> 
								</td>
							</tr>
							<tr>
        
		

								<td style = "padding-left:47px;padding-top:20px;">
        
									<table width="900" cellspacing="0" cellpadding="0" border="0">
										<tr>
											<td align="right" class="bodytext" style="padding-right:5px;">
												<strong><bean:message key="datasource.datasourceName" bundle="ds"/><label class="error">*</label>:&nbsp;</strong>
											</td>
											<td  height="28"><table>
												<tr>
													<td>
														<logic:notPresent name="ecoDatasourceListData">
															<input type="text"  id="datasourceName" name="datasourceName" class="medium" maxLength="45" autocomplete="off"
															dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" onBlur="validateDataSourceName(this);" onKeyup="enableDisable();"   />
														</logic:notPresent>
														<logic:present name="ecoDatasourceListData">
														<logic:notEqual name="modeType" value="insert"> <b>
															<bean:write name="ecoDatasourceListData" property="datasourceName" />
															</b>
															<input type="hidden"    id="datasourceName" name="datasourceName"  value="<bean:write name="ecoDatasourceListData" property="datasourceName" />"/>
															</logic:notEqual>
														<logic:equal name="modeType" value="insert">
															<input type="text"  id="datasourceName" name="datasourceName" class="medium" maxLength="45" autocomplete="off"
															dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" onBlur="validateDataSourceName(this);" onKeyup="enableDisable();"  value="<bean:write name="ecoDatasourceListData" property="datasourceName" />"/>
														</logic:equal>
														</logic:present>
													</td>
												</tr>
												<tr>
												  <td><span id="result"><B><logic:present name="ecoDatasourceListData"><logic:equal name="modeType" value="insert"><bean:message key="datasource.availabel" bundle="ds"/></logic:equal></logic:present></B></span> </td>
												</tr>
											</table>
											</td>
											<td height="28">&nbsp;</td>
            <td  align="right" class="bodytext" style="padding-right:5px;"><strong><bean:message key='datasource.desc' bundle='ds'/>:&nbsp;</strong></td>
            <td colspan="4" width="200"><textarea  id="datasourceDesc" 
                            name="datasourceDesc" dojoType="dijit.form.SimpleTextarea"  rows="5" cols="30" style="width:200px;resize:none"><logic:present name="ecoDatasourceListData"><bean:write name="ecoDatasourceListData" property="datasourceDesc" /></logic:present></textarea>
            </td>
          </tr>
          <tr>
            <td height="30" colspan="8" align="right" class="bodytext"></td>
          </tr>
          <tr>
            <td align="right" style="padding-right:5px;"><strong>
              <bean:message bundle="ecoweb" key="ecomodel.datasources.frameset.hibernate.label.hibernatemodel" /><bean:message key='datasource.check.hibernate.name' bundle='ds'/><label class="error">*</label>:&nbsp;</strong></td>
            <td width="200" height="28" align="left" colspan="12">
			   
			   <select id="hibernateName" 
                            dojoType="dijit.form.FilteringSelect" name="hibernateName" autocomplete="off" invalidMessage="The value entered is not valid" onChange="if (this.value != '' && this.value!='-- select --') {resetByTableValue('',true);loadData('loadHibernateData',this, setHibernateColumns, 'insert'); }else{resetByTableValue('',true)}; enableDisable();" store="modelStore" searchAttr="model">
							<logic:present name="hibernateModels" scope="session">
								<option value="1"></option>
								<logic:iterate name="hibernateModels" id="hibernateModelDtls" >
									<option value="<bean:write name="hibernateModelDtls" />"><bean:write name="hibernateModelDtls" /></option>									
								</logic:iterate>
							</logic:present>
              </select>


            </td>
          </tr>
          <!-- <tr>
            <td height="13" colspan="8" align="left" class="bodytext"></td>
          </tr>
		  <tr>
            <td height="13" colspan="8" align="center" ><label class="success"> OR </label><sup><label class="error">*</label> </td>
          </tr>
          <tr>
            <td height="13" colspan="8" align="left" class="bodytext"></td>
          </tr>
          <tr>
            <td width="122" height="28" align="right" class="bodytext" style="padding-left:36px;padding-right:15px;"><strong>
              <bean:message bundle="ecoweb" key="ecomodel.datasources.frameset.database.label.dbquery" />
              : </strong></td>
            <td width="650" height="28" align="left" colspan="7">
			<textarea  id="hibernateQuery" style="width:45em;height:5em"
                            name="hibernateQuery" dojoType="dijit.form.SimpleTextarea"  onKeyUp="resetFilterBox();enableRunBtns();"><logic:present name="ecoDatasourceListData"><bean:write name="ecoDatasourceListData" property="hibernateQuery" /></logic:present></textarea>
                            
			<textarea dojoType="dijit.form.Textarea" id="hibernateQuery" style="width:45em;height:5em"
                    name="hibernateQuery" onKeyUp="resetFilterBox();enableRunBtns(this)"><logic:present name="ecoDatasourceListData"><bean:write name="ecoDatasourceListData" property="hibernateQuery" /></logic:present></textarea>
                            
              <button dojoType="dijit.form.Button"  type="button" id="runQry" onClick="resetByTableValue('',true);loadData('loadHibernateData', dijit.byId('hibernateQuery'), setHibernateColumns, 'insert');"><bean:message key="datasource.dbRunQry" bundle="ds" /></button>
              </td>                
           </tr>-->
		   <tr>
            <td height="13" colspan="8" align="left" class="bodytext"></td>
          </tr>
          <tr>
          <td width="0" height="28" align="right" class="bodytext" style="padding-top:10px;padding-left:35px;padding-right:5px;"><strong>
              <bean:message bundle="ecoweb" key="ecomodel.datasources.frameset.database.label.dblongitude" />:&nbsp;</strong></td>
            <td width="192" style="padding-top:10px;" height="28" align="left"><select id="hibernateLongitude" 
                            dojoType="dijit.form.FilteringSelect"  name="hibernateLongitude"    autocomplete="off"     invalidMessage="The value entered is not valid" store="columnStore" searchAttr="column" onChange="enableDisableColumns(this);resetAddressFields(this);">
              </select>
            </td>
            <td width="30" height="28">&nbsp;</td>
            <td align="right" class="bodytext" style="padding-top:10px;padding-right:5px;"><strong>
              <bean:message bundle="ecoweb" key="ecomodel.datasources.frameset.database.label.dblatitude" />:&nbsp;</strong></td>
            <td colspan="4" style="padding-top:10px;"><select id="hibernateLatitude" 
                            dojoType="dijit.form.FilteringSelect"  name="hibernateLatitude"    autocomplete="off"     invalidMessage="The value entered is not valid" store="columnStore" searchAttr="column" onChange="enableDisableColumns(this);resetAddressFields(this);">
                <option value=""><bean:message key="admin.common.dropdown.select" bundle="admin" /></option>
              </select></td>
          </tr>
          <tr>
            <td width="0" height="28" align="right" class="bodytext" style="padding-top:10px;padding-left:35px;padding-right:5px;"><strong><bean:message key="datasource.coordinates" bundle="ds" />:&nbsp;</strong></td>
            <td width="192" height="28" align="left" style="padding-top:10px;"><select id="hibernateCoordinates" 
                            dojoType="dijit.form.FilteringSelect"  name="hibernateCoordinates"    autocomplete="off"     invalidMessage="The value entered is not valid" store="columnStore" searchAttr="column" onChange="enableDisableColumns(this);resetAddressFields(this);">
              </select>
            </td>
            <td width="30" height="28">&nbsp;</td>
            <td  align="right" class="bodytext" style="padding-top:10px;padding-right:5px;"><strong>
              <bean:message bundle="ecoweb" key="ecomodel.datasources.frameset.database.label.dborder" />:&nbsp;</strong></td>
            <td colspan="4" style="padding-top:10px;"><select id="hibernateOrder" 
                            dojoType="dijit.form.FilteringSelect"  name="hibernateOrder"    autocomplete="off"     invalidMessage="The value entered is not valid" store="columnStore" searchAttr="column">
                <option value=""><bean:message key="admin.common.dropdown.select" bundle="admin" /></option>
              </select></td>
          </tr>
         
 <tr>
	   <td colspan="7"><table width="100%" border="0">
	   <tr>
           <td colspan="7" style="padding-top:20px;padding-left:22px;padding-right:00px;">
          
          <%@ include file="/ecoweb/common/addresscomponent.jsp" %>
                   
            </td>
            
            </tr>
			</table>
			</td>
			
			</tr>

      </table>

     </td>
          
          </tr>



		        <tr>
	   <td colspan="7"><table border="0">
	   <tr>
           <td colspan="7" style="padding-top:20px;padding-left:22px;padding-right:00px;">
          
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
  <!-- Button Panel -->
  <logic:notPresent name="ecoDatasourceListData">
    <table width="101.2%">
		<tr class="barColor">
        	<td align="center">
				<button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  "><bean:message key="datasource.home" bundle="ds" /></button>
				<button dojoType="dijit.form.Button"  type="button" onClick="window.location='WizardHomeAction.do?operation=configureDatasource'"> <bean:message key='admin.common.back' bundle='admin'/></button>
          		<button dojoType="dijit.form.Button" id="save" type="submit" > <bean:message key='admin.common.save' bundle='admin'/></button>
           	</td>
      	</tr>
    </table>
    <script>
    dojo.addOnLoad(loadFormValues); 
        function loadFormValues(){          
            try{
            loadData('loadHibernateModels','configure', setHibernateModels, 'insert');  
            dijit.byId('hibernateName').setAttribute('style', 'width:45em' );
            //dijit.byId('hibernateQuery').setAttribute('disabled', true);
            dijit.byId('hibernateLatitude').setAttribute('disabled', true);
            dijit.byId('hibernateLongitude').setAttribute('disabled', true);
            dijit.byId('hibernateOrder').setAttribute('disabled', true);
            dijit.byId('hibernateCoordinates').setAttribute('disabled', true);  
			dijit.byId("address").setAttribute('disabled', true);
			dijit.byId("addCity").setAttribute('disabled', true);
			dijit.byId("addCounty").setAttribute('disabled', true);
			dijit.byId("addState").setAttribute('disabled', true);
			dijit.byId("addCountry").setAttribute('disabled', true);
			dijit.byId("addZipCode").setAttribute('disabled', true);

			
            //dijit.byId('hibernateName').setAttribute('disabled', true);
          //  dijit.byId('runQry').setAttribute('disabled', true);
            dijit.byId('save').setAttribute('disabled', false);
            } catch(err){}
        }    
        
        function enableDisable(selectedObject){
            /*try{
				if ((dojo.byId('datasourceName').value != '' & (dijit.byId('hibernateName').value != '' || dijit.byId('hibernateQuery').attr('value') != "")) )  {
					dijit.byId('save').setAttribute('disabled', false);
				}else{
					dijit.byId('save').setAttribute('disabled', true);
				}


            } catch(err){} */
        }
        
		 
		
        

</script>
  </logic:notPresent>
  <logic:present name="ecoDatasourceListData">
    <logic:notEqual name="modeType" value="insert">
 	<table width="101.2%">
	  	<tr class="barColor">
        	<td align="center">
		  		<button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  "><bean:message key="datasource.home" bundle="ds" /></button>
		  		<button dojoType="dijit.form.Button"  type="button" onClick="window.location = 'WizardHomeAction.do?operation=showAllDatasource&pageNo=1' "> <bean:message key='admin.common.back' bundle='admin'/> </button>
            	<button dojoType="dijit.form.Button" id="save" type="submit"  ><bean:message key="datasource.save" bundle="ds" /></button>
          	</td>
     	</tr>
  	</table>
    </logic:notEqual>
    <logic:equal name="modeType" value="insert">
    <table width="101.2%">
		<tr class="barColor">
          	<td align="center">
		  		<button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  "><bean:message key="datasource.home" bundle="ds" /></button>
		  		<button dojoType="dijit.form.Button"  type="button" onClick="window.location='WizardHomeAction.do?operation=configureDatasource'"> <bean:message key="datasource.back" bundle="ds" /></button>
            	<button dojoType="dijit.form.Button" id="save" type="submit" ><bean:message key="datasource.save" bundle="ds" /></button>
            </td>
        </tr>
  	</table>
    </logic:equal>
    <script>
    dojo.addOnLoad(loadFormValues); 
        function loadFormValues(){
			dijit.byId('hibernateName').setAttribute('style', 'width:45em' );
			loadData('loadHibernateModels','configure', setHibernateModels, 'update'); 
			//if('<bean:write name="ecoDatasourceListData" property="hibernateQuery" />' != ''){
				//As discussed with jagadeesh, @Modifed On - July 2 PM - true to false
				//dijit.byId('hibernateName').setAttribute('disabled', false);
				//loadData('loadHibernateData', dijit.byId('hibernateQuery'), setHibernateColumns, 'update');
			//}
			/*else{ 
				loadData('loadHibernateData', document.getElementById('hibernateName'), setHibernateColumns, 'update');
				//As discussed with jagadeesh, @Modifed On - July 2 PM - true to false
				dijit.byId('hibernateQuery').setAttribute('disabled', false);
				dijit.byId('runQry').setAttribute('disabled', true);
			//} */
            
        }        


		function setHibernateModel(modeType){
			if(modeType != 'insert')
               dijit.byId('hibernateName').setValue('<bean:write name="ecoDatasourceListData" property="hibernateName" />');				
		}
        
        function setSavedDBColumnDtls(modeType){
            
            showProgressDialog("<bean:message key='admin.common.dialog.loading' bundle='admin'/>", "<bean:message key='datasource.alert.title' bundle='ds'/>");
            try{
            if(modeType == null){
                dijit.byId('hibernateLatitude').setValue('<bean:write name="ecoDatasourceListData" property="hibernateLatitude" />');
                dijit.byId('hibernateLongitude').setValue('<bean:write name="ecoDatasourceListData" property="hibernateLongitude" />');
                dijit.byId('hibernateCoordinates').setValue('<bean:write name="ecoDatasourceListData" property="hibernateCoordinates" />');
                dijit.byId('hibernateOrder').setValue('<bean:write name="ecoDatasourceListData" property="hibernateOrder" />');             
                dijit.byId('projectionData').setValue('<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />');
                dijit.byId('srcPrjUnits').setValue('<bean:write name="ecoDatasourceListData" property="srcPrjUnits" />');
                document.getElementById('srcPrjDefinition').value = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
    			dijit.byId("address").setValue('<bean:write name="ecoDatasourceListData" property="address" />');
				dijit.byId("addCity").setValue('<bean:write name="ecoDatasourceListData" property="addCity" />');
                dijit.byId("addCountry").setValue('<bean:write name="ecoDatasourceListData" property="addCountry" />');
                dijit.byId("addCounty").setValue('<bean:write name="ecoDatasourceListData" property="addCounty" />');
                dijit.byId("addState").setValue('<bean:write name="ecoDatasourceListData" property="addState" />');
				dijit.byId("addZipCode").setValue('<bean:write name="ecoDatasourceListData" property="addZipCode" />');

            }
            } catch(e){}
            hideProgressDialog();
        }

   

</script>
  </logic:present>
</form>
</body>
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
