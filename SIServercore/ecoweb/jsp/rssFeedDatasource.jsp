<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>
<%@ taglib uri="/tags/fileupload" prefix="upload"%>
<%@ page import="com.spacetimeinsight.stas.utils.ResourceManager,com.enterprisehorizons.objects.ResourceItem,java.util.*" %>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ include file="/common/dojo.jsp"%>
<script>
function checkUniqueDS(){

	if((dijit.byId('datasourceName').attr('value'))==''){
        showEmptyDialog("<bean:message key="datasource.provide.ds.name" bundle='ds'/>","<bean:message key="datasource.alert" bundle="ds" />");      
        return false;
        }

        if((document.getElementById('result').innerHTML.indexOf('Not') == -1) && (document.getElementById('result').innerHTML != '<b></b>')){       
            if(!ajaxTxtBoxSplCh(dijit.byId('datasourceName').attr('value'))){
                return false;
        	}
	
			 if(document.getElementById('rssfeedUrl').value == '' ){
                showEmptyDialog("<bean:message key="datasource.check.rssfeed.url" bundle='ds'/>","<bean:message key="datasource.alert" bundle="ds" />");  
					return false;
			  }
		    else if(dijit.byId('datasourceDesc').attr('value').length > 499){
                showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
                return false;
			  }

			  /*if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
				return false;
			}*/

            return setparams('formData');
        }
        
        showEmptyDialog("<bean:message key="datasource.ds.name.not.available" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
        return false;
       
    }

        function setparams(formName){
            document.getElementById('operation').value='rssFeed';
            document.getElementById("datasourceTypeId").value = '4';    
            return true;
    }

  function UpdateDS(){
	  if(document.getElementById('rssfeedUrl').value == '' ){
          showEmptyDialog("<bean:message key="datasource.check.rssfeed.url" bundle='ds'/>","<bean:message key="datasource.alert" bundle="ds" />");  
            return false;
        }
  	  if(dijit.byId('datasourceDesc').attr('value').length > 499){
				 showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
		return false;
	  }

	  /*if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
				return false;
			}*/

      return updateparams('formData');
      
  }

  function updateparams(formName){
            document.getElementById('operation').value='updateRssFeed';
            document.getElementById('action').value='action';
            document.getElementById("datasourceTypeId").value = '4';        
            return true;
    }
 function toggleErrors(){
         document.getElementById('toggleError').innerHTML = "";
   }
 
</script>
<body class="tundra bodybg">
<logic:notPresent name="modeType">
  <bean:define id="modeType" value="insert" />
</logic:notPresent>
<logic:notPresent name="ecoDatasourceListData">
<form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/ConfigureDataSource.do" onsubmit="return checkUniqueDS()">
    <input type="hidden" id="csrf" name="csrf" value="${csrf}">
</logic:notPresent>
<logic:present name="ecoDatasourceListData">
<logic:notEqual name="modeType" value="insert">
<form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/UpdateDataSource.do" onsubmit="return UpdateDS()">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
</logic:notEqual>

<logic:present name="ecoDatasourceListData">
<input type="hidden" name="ctdDate" id="ctdDate" value="<bean:write name="ecoDatasourceListData" property="createdDate" />" />
</logic:present>
<logic:present name="ecoDatasourceListData">
<input type="hidden" name="ctdBy" id="ctdBy" value="<bean:write name="ecoDatasourceListData" property="createdBy" /> " />
</logic:present>

<logic:equal name="modeType" value="insert">
<form name="newEcoDataSourceForm" method="post" action="<%=ServerUtils.getContextName(request)%>/ConfigureDataSource.do" onsubmit="return checkUniqueDS()">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
  </logic:equal>
  </logic:present>
  <logic:present name="ecoDatasourceListData">
    <input type="hidden" name="id"  id="id" value="<bean:write name="ecoDatasourceListData" property="id" />"/> </logic:present>
  <center>
  <%      //List  allPaths = new ArrayList();
            //ResourceItem.getRecursiveChildren(ResourceManager.getResources(".xls").getChildren(), allPaths);                      
%>
	<table width="100%" cellspacing="0" cellpadding="0">
    	<tr>
            <td align="left">
                <table width="100%" cellpadding="0" cellspacing="0"  align="left">
                    <tr>
                        <td>
                            <table width="100%" cellspacing="0" cellpadding="0" border = "0">
                                <tr>
                                   	<td class="pageTitle paddingTitle">      
                                       <bean:message key="datasource.rssFeedFieldset" bundle="ds"/>
                                    </td>
							    </tr>
                                <tr>
                                	<td  class="paddingTitleDesc bodytext">      
                                    <strong><bean:message key="datasource.rssFeedDescription" bundle="ds"/></strong>
                                	</td>
                            	</tr>
                                <tr>
                                    <td style="padding-left:67px;"class="error">
                                        <span id = "toggleError"><html:errors bundle="ecoweb"/> </span>
                                    </td>
								</tr>
                                <tr>
        							<td style = "padding-left:67px; padding-top:20px">
        								<table border="0">
                                       		<input type="hidden" name="datasourceTypeId" id="datasourceTypeId"/>
                                        	<input type="hidden" name="operation"  id="operation"/>
                                        	<input type="hidden" name="action"  id="action"/>
                                        	<!--  
                                                ***************************************************************************************
                                                    RSS MASHUP ---- Input Properties & parameters
                                                ***************************************************************************************
                                             -->
                                           <tr>
											<td style="padding-right:5px" align="right">
                                            	<strong><bean:message key="datasource.datasourceName" bundle="ds" /><label class="error">*</label>:					</strong> 
                                            </td>
			
          									<td align="left">
												<table>
													<tr>
														<td>
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

             											 <tr>
				
                                                            <td style = "padding-left:5px" >
                                                                <span id="result">
                                                                    <B>
                                                                        <logic:present name="ecoDatasourceListData">
                                                                        <logic:equal name="modeType" value="insert">
                                                                        <bean:message key="admin.common.available" bundle="admin"/>
                                                                        </logic:equal>
                                                                        </logic:present>
                                                                    </B>
                                                                    </span> 
                                                            </td>

              											</tr>

            										</table>
                                                </td>
                                                <td width="20">&nbsp;
                                                </td>
                                                <td style = "padding-top:8px" align = "right">
                                                    <strong><bean:message key="datasource.rssFeedUrl" bundle="ds" /><label class="error">*</label>:</strong></td>
                                                <td>
                                              		<table border = "0">
                                              			<tr>
                                                            <td style = "padding-left:6px;padding-top:3px;">
                                                                <input type="text"  id="rssfeedUrl" name="rssfeedUrl" autocomplete="off"
                                                                             class = "medium"   required="true" trim="true" ucfirst="true"  value="<logic:present name="ecoDatasourceListData"><bean:write name="ecoDatasourceListData" property="rssfeedUrl" /></logic:present>"/>
                                                             </td>
                                            
                                                            <td>
                                                                 <button dojoType="dijit.form.Button" type="button" id="testUrl" 
                                                                                onclick="toggleErrors();loadData('rssFeedLoad',this, rssFeedCallback, 'insert');">
                                                                    <bean:message key="datasource.test" bundle="ds" />
                                                                    </button>
                                                            </td>
                                              			</tr>
                                              		</table>
		  										</td>
                                            </tr>
                                            <tr>
                                            	<td colspan="5" height="13">&nbsp;</td>
                                            <tr>
                                            <tr>
			
                                                  <td align = "right">
                                                    <label class = "label"><bean:message key="datasource.description" bundle="ds" />:</label>
                                                  </td>
            
                                                  <td align = "left" style = "pedding-left : 0px;" colspan="4">
                                                  <textarea  id="datasourceDesc" 
                                                                    name="datasourceDesc" dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" style="width:195px;resize:none"><logic:present name="ecoDatasourceListData"><bean:write name="ecoDatasourceListData" property="datasourceDesc" /></logic:present></textarea>
                                                  </td>
          
        									</tr>
                                            
                                                    
                                        </table>
                                    </td>
                                </tr>
                                <tr>
        
                                        <td style = "padding-top:20px;padding-left:67px;padding-right:30px;" colspan="4">
                                        
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
     
     
                   
 
 

  <!-- Button Panel -->
  <logic:notPresent name="ecoDatasourceListData">
    <table width="101.2%" >
	<tr>
		<td>&nbsp;</td>
	</tr>
      <tr class="barColor" align="center">
        <td class="barColor" align="center" width="100%">
        <button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  ">
        <bean:message key="datasource.home" bundle="ds" />
        </button>
		<button dojoType="dijit.form.Button"  type="button" onClick="window.location='WizardHomeAction.do?operation=configureDatasource'">
          <bean:message key="datasource.back" bundle="ds" />
          </button>
          <button dojoType="dijit.form.Button" id="save" type="submit" >
          <bean:message key="datasource.save" bundle="ds" />
          </button></td>
      </tr>
    </table>
    <script>
    

</script>
  </logic:notPresent>
  <!-- Button Panel -->
  <logic:present name="ecoDatasourceListData">
    <logic:notEqual name="modeType" value="insert">
      <table width="101.2%" >
	  <tr>
		<td>&nbsp;</td>
	</tr>
        <tr class="barColor" align="center">
          <td colspan="4" class="barColor" align="center" width="100%">
		  <button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  ">
        <bean:message key="datasource.home" bundle="ds" />
        </button>
		  <button dojoType="dijit.form.Button"  type="button" onClick="window.location = 'WizardHomeAction.do?operation=showAllDatasource&pageNo=1' ">
            <bean:message key="datasource.back" bundle="ds" />
            </button>
            <button dojoType="dijit.form.Button" id="save" type="submit">
            <bean:message key="datasource.save" bundle="ds" />
            </button></td>
        </tr>
      </table>
      <script>
    dojo.addOnLoad(loadFormValues); 
    var fileNameData ;
        function loadFormValues(){
			document.getElementById('srcPrjDefinition').value = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
			document.getElementById('projectionData').innerHTML = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
            dijit.byId('srcPrjUnits').setValue('<bean:write name="ecoDatasourceListData" property="srcPrjUnits" />');
             
        }

</script>
    </logic:notEqual>
    <logic:equal name="modeType" value="insert">
      <table width="101.2%" >
	  <tr>
		<td>&nbsp;</td>
	</tr>
        <tr class="barColor" align="right">
          <td colspan="7" class="barColor" align="center" width="100%">
		  <button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ServerUtils.getContextName(request)%>/adminMain.do'  ">
        <bean:message key="datasource.home" bundle="ds" />
        </button>
		  <button dojoType="dijit.form.Button"  type="button" onClick="window.location='WizardHomeAction.do?operation=configureDatasource'">
            <bean:message key="datasource.back" bundle="ds" />
            </button>
            <button dojoType="dijit.form.Button" id="save" type="submit" >
            <bean:message key="datasource.save" bundle="ds" />
            </button></td>
        </tr>
      </table>
      <script>
    dojo.addOnLoad(loadFormValues); 
        function loadFormValues(){
            
			document.getElementById('srcPrjDefinition').value = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
			document.getElementById('projectionData').innerHTML = '<bean:write name="ecoDatasourceListData" property="srcPrjDefinition" />';
            
        }

</script>
    </logic:equal>
  </logic:present>
</form>
<script>

</script>

<script>
  dojo.addOnLoad(checkDisplayStatusForProjection);

			function checkDisplayStatusForProjection(){
				
				if(dijit.byId('projectionData').attr('value').length > 5){
					show();
				}

			}
</script>
