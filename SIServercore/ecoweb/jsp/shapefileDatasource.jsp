<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>
<%@ taglib uri="/tags/fileupload" prefix="upload"%>
<%@ page import="com.spacetimeinsight.stas.utils.ResourceManager,com.enterprisehorizons.objects.ResourceItem,java.util.*" %>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<html:html locale="true">
<%@ include file="/common/dojo.jsp"%>
<script type="text/javascript">
            var filePathList = {identifier:"label",items:[{filePath:"",label:""}]};
            var filePathStore = new dojo.data.ItemFileReadStore({data: filePathList});
        
</script>
<script>


 function chkDescriptionLen()
 {
     if(dijit.byId('datasourceDesc').attr('value').length >499)
     {
		return false;
     }
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

			if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
				return false;
			}

		    if(dijit.byId('shapeFile').value == ''){
			   showEmptyDialog("<bean:message key="datasource.check.shapefile" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />"); 
			   return false;
			}

	        if(!chkDescriptionLen())
	        {
	            showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />", "<bean:message key="datasource.alert" bundle="ds" />");
                return false;
            } 


            return setparams('formData');
        }
        if((dijit.byId('datasourceName').attr('value'))==''){
            showEmptyDialog("<bean:message key="datasource.provide.ds.name" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />"); 
        return false;
        }
        else{   showEmptyDialog("<bean:message key="datasource.ds.name.not.available" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
        return false;
        }
    }

        function setparams(formName){
            document.getElementById('operation').value='shapeFile';
            document.getElementById("datasourceTypeId").value = '3';    
            return true;
    }

  function UpdateDS(){

	    if(dijit.byId('shapeFile').value == ''){
          showEmptyDialog("<bean:message key="datasource.check.shapefile" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />"); 
          return false;
        }

		if(!chkDescriptionLen())
		{
				 showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
				 return false;
		} 
  
  
//        if((document.getElementById('result').innerHTML.indexOf('Not') == -1) && (document.getElementById('result').innerHTML != '<b></b>')){       
		if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
				return false;
			}

		    return updateparams('formData');
 //       }
       showEmptyDialog("<bean:message key="datasource.provide.ds.name" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />"); 
        return false;
  }

  function updateparams(formName){
            document.getElementById('operation').value='updateShapefile';
            document.getElementById('action').value='action';
            document.getElementById("datasourceTypeId").value = '3';        
            return true;
    }
	



</script>
<body class="tundra bodybg">
<center>
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
                    SHAPEFILE MASHUP ---- Input Properties & parameters
                ***************************************************************************************
                 -->
         <table width="100%" cellspacing="0" cellpadding="0">
    <tr>
    
    <td align="left">
    <table width="1000" cellpadding="0" cellspacing="0"  align="left">
      <tr>
      
      <td  align="left" valign="top"  align="justify">
      <table width="1000" cellspacing="0" cellpadding="0">
		<tr>
			<td class="pageTitle paddingTitle">      
				<bean:message key="datasource.shapefileFieldset" bundle="ds"/>
			</td>
		</tr>
		
		<tr>
			<td  class="paddingTitleDesc bodytext">      
				<strong><bean:message key="datasource.shapefileDescription" bundle="ds"/></strong>
			</td>
		</tr>
		
		<tr>
			<td style="padding-left:67px;"class="error">
				<html:errors bundle="ecoweb"/> 
			</td>
		</tr>

        <tr>

		<td height="30" align="left" valign="top" class="redtitle">
        
        <table width="100%" cellspacing="0" cellpadding="0" >
			<tr>
				<td height="28" width="200" align="right" class="bodytext" style="padding-right:10px;padding-top:30px;"><strong>
					<bean:message key="datasource.datasourceName" bundle="ds" /><label class="error">*</label>:</strong> 
				</td>

	            <td  height="28" width="100" align="left" style="padding-top:30px"><table align="left" >
		            <tr>
			          <td><logic:notPresent name="ecoDatasourceListData">
							
					        <input type="text"  id="datasourceName" name="datasourceName" class="medium" maxlength="45" autocomplete="off"
				                        dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" onBlur="validateDataSourceName(this);"   />
							</logic:notPresent>
							<logic:present name="ecoDatasourceListData">
							<logic:notEqual name="modeType" value="insert"> <b>
			                <bean:write name="ecoDatasourceListData" property="datasourceName" />
				            </b>
					        <input type="hidden"    id="datasourceName" name="datasourceName" 
							value="<bean:write name="ecoDatasourceListData" property="datasourceName"/>" onblur="validateDataSourceName(this);"/> </logic:notEqual>
		                      <logic:equal name="modeType" value="insert">
				                <input type="text"  id="datasourceName" name="datasourceName" class="medium" autocomplete="off"
                                    dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" onBlur="validateDataSourceName(this);" 
									value="<bean:write name="ecoDatasourceListData" property="datasourceName" />"  /> </logic:equal>
		                    </logic:present>

			          </td>
					</tr>

	                <tr>
		              <td><span id="result"><B><logic:present name="ecoDatasourceListData"><logic:equal name="modeType" value="insert"><bean:message key="datasource.availabel" bundle="ds"/></logic:equal></logic:present></B></span> </td>
			        </tr>
			  </table>
			</td>
          	<td width="30" height="28">&nbsp;</td>	
            <td width="225" align="right"  style="padding-right:10px;padding-top:30px;" class="bodytext"><strong>
              <bean:message key="datasource.shapefilePath" bundle="ds" /><label class="error">*</label>: </strong></td>
            <td colspan="2" >
			<table border=0 >
				<tr>
					<td valign="top"  style="padding-top:30px"> 
		       <select name="shapeFile"  id="shapeFile"  dojoType="dijit.form.FilteringSelect" autocomplete="off"  store="filePathStore"     searchAttr="filePath" >
		<!--	<select name="shapeFile"  id="shapeFile"  dojoType="dijit.form.FilteringSelect" autocomplete="off"  store="filePathStore"     searchAttr="filePath" onChange="enableSelectFile(this)"> -->
                <option value=""></option>
              </select>
			  </td>
			  </tr>
			  </table>
			  </td>
          </tr>
          <tr>
            <td height="13" colspan="8" align="left" class="bodytext"></td>
          </tr>
          <tr>
            <td  height="28" align="right" class="bodytext" style="padding-right:10px;padding-top:30px;">
			<label class = "label"><bean:message key="datasource.description" bundle="ds" />&nbsp;:</label>
			</td>
            <td  height="28" width="200" align="left" style="padding-left:3px;">
                        <textarea  id="datasourceDesc"  name="datasourceDesc" dojoType="dijit.form.SimpleTextarea" rows="5" cols="30"   style="width:194px;resize:none"><logic:present name="ecoDatasourceListData"><bean:write name="ecoDatasourceListData" property="datasourceDesc" /></logic:present></textarea>            
            </td>
           <td width="30" height="28">&nbsp;</td>
            <td  align="right"  class="bodytext" style="padding-right:10px;"><strong>
              <bean:message key="datasource.dataRenderType" bundle="ds" />
              : </strong></td>
            <td style="padding-left:3px;"><select id="dataRenderTypeId" name="dataRenderTypeId" autocomplete="off" 
							dojoType="dijit.form.FilteringSelect" class="selectbox" value="">
							<option value="" selected><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>				
                <option value="1"><bean:message key='datasource.collection' bundle='ds'/></option>
				<option value="2"><bean:message key='datasource.enumeration' bundle='ds'/></option>
              </select></td>
          </tr>
          <tr>
            <td height="13" colspan="8" align="right" valign="top" class="bodytext" style="padding-right:5px;">&nbsp;</td>
          </tr>
          <tr>
          
          <td style = "padding-left : 67px;padding-top : 30px;" colspan="8">
			<%@ include file="/ecoweb/common/projections.jsp" %>
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
	<table width="101.2%"  border=0>
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
				loadData('LoadFilePaths', '.shp', setFilePaths, 'insert');
				dijit.byId('dataRenderTypeId').setValue('');
			}
	</script>
  </logic:notPresent>
  <logic:present name="ecoDatasourceListData">
    <logic:notEqual name="modeType" value="insert">
      <table width="101.2%"  border=0>
	  	<tr class="barColor">
        	<td align="center">
		  		<button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  "><bean:message key="datasource.home" bundle="ds" /></button>
		  		<button dojoType="dijit.form.Button"  type="button"  onClick="window.location = 'WizardHomeAction.do?operation=showAllDatasource&pageNo=1' "><bean:message key="datasource.back" bundle="ds" /></button>
            	<button dojoType="dijit.form.Button" id="save" type="submit"><bean:message key="datasource.save" bundle="ds" /></button>
            </td>
        </tr>
     </table>
    </logic:notEqual>
    <logic:equal name="modeType" value="insert">
     <table width="101.2%" border=0>
	 	<tr class="barColor">
        	<td align="center">
		  		<button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  "><bean:message key="datasource.home" bundle="ds" /></button>
		  		<button dojoType="dijit.form.Button"  type="button" onClick="window.location='WizardHomeAction.do?operation=configureDatasource'">	<bean:message key="datasource.back" bundle="ds" /></button>
            	<button dojoType="dijit.form.Button" id="save" type="submit"><bean:message key="datasource.save" bundle="ds" /></button>
           	</td>
        </tr>
   	</table>
    </logic:equal>
    <script>
    dojo.addOnLoad(loadFormValues); 
    var fileNameData ;
        function loadFormValues(){
            loadData('LoadFilePaths', '.shp', setFilePaths, 'update');
            //fileNameData = dijit.byId('shapeFile').domNode.innerHTML;
            document.getElementById('projectionData').innerHTML = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
			document.getElementById('srcPrjDefinition').value  = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
            dijit.byId('srcPrjUnits').setValue('<bean:write name="ecoDatasourceListData" property="srcPrjUnits" />');
            dijit.byId('dataRenderTypeId').setValue('<bean:write name="ecoDatasourceListData" property="dataRenderTypeId" />');
            //dijit.byId('shapeFile').domNode.innerHTML='<div id="filedata" onclick="showFileBrowser()" style="cursor:pointer">         <bean:write name="ecoDatasourceListData" property="fileName" /></div>';
            dijit.byId('shapeFile').setValue('<bean:write name="ecoDatasourceListData" property="fileName" />');
        }
        
        function populate(){
            dijit.byId('shapeFile').setValue('<bean:write name="ecoDatasourceListData" property="fileName" />');
        }
    /*  function showFileBrowser(){
                dijit.byId('shapeFile').domNode.innerHTML = fileNameData;
        } */

		function loadExcelValues(){
			dijit.byId('shapeFile').setValue('<bean:write name="ecoDatasourceListData" property="fileName" />');
		}
</script>
  </logic:present>

<script>
  dojo.addOnLoad(checkDisplayStatusForProjection);

			function checkDisplayStatusForProjection(){
				
				if(dijit.byId('projectionData').attr('value').length > 5){
					show();
				}

			}
</script>
</form>
</html:html>
