<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>
<%@ taglib uri="/tags/fileupload" prefix="upload"%>
<%@ page import="com.spacetimeinsight.stas.utils.ResourceManager,com.enterprisehorizons.objects.ResourceItem,java.util.*" %>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ include file="/common/dojo.jsp"%>
<%@page import="org.owasp.esapi.ESAPI"%>
<%@page import="com.enterprisehorizons.magma.ecoweb.form.NewEcoDataSourceForm"%>
<%@page import="com.enterprisehorizons.magma.ecoweb.bean.NewEcoDataSourceBean"%><script type="text/javascript">
            var firstAttrList = {identifier:"label",items:[{attr:"",label:""}]};
            var firstAttrStore = new dojo.data.ItemFileReadStore({data: firstAttrList});

			 var secondAttrList = {identifier:"label",items:[{attr:"",label:""}]};
            var secondAttrStore = new dojo.data.ItemFileReadStore({data: secondAttrList});
        
</script>
 <%
   List firstAttList=null;
 %>

<logic:present name="ecoDatasourceListData">
 <% 
    firstAttList=((NewEcoDataSourceBean)request.getAttribute("ecoDatasourceListData")).getMapFirstList();
 %>
</logic:present> 

<script>
function removeRow(row) 
{ 
	var dsn1 = dojo.byId('mapFirstDSN').value;
		var dsn2 = dojo.byId('mapWithSecondDSN').value;
	
	if(dsn1 == '' || dsn2=='' || dsn1=='-- select --' || dsn2=='-- select --'){
			      showEmptyDialog('<bean:message key="datasource.check.select" bundle="ds"/>', '<bean:message key="datasource.alert.title" bundle="ds"/>');
		          return false;
		}
  var table = document.getElementById("dynaTable"); 
  var rownum = row.rowIndex;
 
  try
  { 
        sortrows(rownum);
		table.deleteRow(rownum);
		decreaseFieldValue(); 
  } catch (ex) { 
    alert(ex); 
  }   
}
function sortrows(rownum)
{
	
	 var tbody = document.getElementById("dynaTable").getElementsByTagName("TBODY")[0];  
	var temp;
	var id;
	var num,cell;

	for(temp=rownum+1;temp < tbody.rows.length;temp++)
	{
		cell=tbody.rows[temp].cells[0];
		cell.innerHTML="<strong><span class='bodytext' id='firstLabel"+(temp)+"'> <bean:message key='datasource.attribute.label' bundle='ds'/> "+(temp)+" </span></strong>";
	}

}
<logic:present name="ecoDatasourceListData">
   var  count=<%=firstAttList.size()%>;
</logic:present> 
   
<logic:notPresent name="ecoDatasourceListData">
   var  count=1;
</logic:notPresent> 

function addNewRow() {
		var mc=parseInt(getMappingCountFieldValue());
		var dsn1 = dojo.byId('mapFirstDSN').value;
		var dsn2 = dojo.byId('mapWithSecondDSN').value;
		if(dsn1 == '' || dsn2=='' || dsn1=='-- select --' || dsn2=='-- select --'){
			      showEmptyDialog('<bean:message key="datasource.check.select" bundle="ds"/>', '<bean:message key="datasource.alert.title" bundle="ds"/>');
		          return false;
		}
		      
	    var tbody = document.getElementById("dynaTable").getElementsByTagName("TBODY")[0];   
		count=count+1;	    
	    var row = document.createElement("TR");     
   		var tmpRowId = 'newPropertyRow' + count; 
	    row.setAttribute("id",tmpRowId);
	    
	    var td0 = document.createElement("TD");
   	    td0.setAttribute("align","left");
   	    td0.setAttribute("nowrap","nowrap");
   	    td0.setAttribute("height","28");
   	    td0.setAttribute("class","bodytext"); 
   	    td0.innerHTML = "<strong><span class='bodytext' id='firstLabel"+count+"'> <bean:message key='datasource.attribute.label' bundle='ds'/> "+(mc+1)+" </span></strong>";
   	       	       	       	       	       	       	    
	    var td1 = document.createElement("TD");
   	    td1.setAttribute("align","right");
   	    td1.setAttribute("nowrap","nowrap");   	  

   	    var td11 = document.createElement("TD");
	    td11.setAttribute("align","right");
	    td11.setAttribute("nowrap","nowrap");
	    td11.innerHTML = "&nbsp;";

	    var td12 = document.createElement("TD");
	    td12.setAttribute("align","right");
	    td12.setAttribute("nowrap","nowrap");
	    td12.innerHTML = "&nbsp;";
	    
	       	     
   	    var td2 = document.createElement("TD");
   	    td2.setAttribute("align","left");   	 
   	    td2.setAttribute("nowrap","nowrap");

   	    var td21 = document.createElement("TD");
	    td21.setAttribute("align","left");   	 
	    td21.setAttribute("nowrap","nowrap");
    
   	    var removeHTML="<img src='<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/icon_dash_1.png'    style='cursor: hand;'  onclick='javascript:removeRow(this.parentNode.parentNode)' />";
   	    td21.innerHTML=removeHTML;
   	    
   	    var tmpFirstDSNAttr="mapFirstDSNAttr"+count;
   	    var tmpWithSecondDSNAttr="mapWithSecondDSNAttr"+count 	 

		var strHtml = "<select name='"+tmpFirstDSNAttr+"'  id='"+tmpFirstDSNAttr+"'  dojoType='dijit.form.FilteringSelect' autocomplete='off' trim='value' class='selectbox'  store='firstAttrStore' searchAttr='attr'> <option value=''></option> </select>";
		
		td1.innerHTML = strHtml;

		 
	    // append data to row 
	    
	    var strHtml1 = "<select name='"+tmpWithSecondDSNAttr+"'  id='"+tmpWithSecondDSNAttr+"'  autocomplete='off'  trim='value' dojoType='dijit.form.FilteringSelect' class='selectbox' store='secondAttrStore'  searchAttr='attr'> <option value=''></option> </select>";
		td2.innerHTML = strHtml1; 	
		row.appendChild(td0);
	    row.appendChild(td1);	   
	    row.appendChild(td11);
	    row.appendChild(td12);
	   
	    
	    row.appendChild(td2);
	    row.appendChild(td21);
	    	   	    
	    // append row to table
	     tbody.appendChild(row);
	     
	    var tempFirstDSNAttrFS = new dijit.form.FilteringSelect({id: tmpFirstDSNAttr,
		    name:tmpFirstDSNAttr,
		    store: firstAttrStore,
		    searchAttr: "attr"
			}, tmpFirstDSNAttr);


	    var tempSecondDSNAttrFS = new dijit.form.FilteringSelect({id: tmpWithSecondDSNAttr,
		    name:tmpWithSecondDSNAttr,
		    store: secondAttrStore,
		    searchAttr: "attr"
			}, tmpWithSecondDSNAttr);
	    increaseFieldValue();
	     
}
/*
function refreshAttributeNames() {
	
     var firstLabels=document.getElementsByName("firstLabel");  
     //var secondLabels=document.getElementsByName("secondLabel");
      alert(firstLabels.length);
     for(index=0;index<firstLabels.length;index++) {
        
    	 firstLabels[index].innerHTML="Attribute : "+index;
    	 
    	 //secondLabels[index].innerHTML="Attribute : "+index;  
     }     
}
*/

function getMappingCountFieldValue() {
  return document.getElementById("mappingCount").value;
}

function setMappingCountFieldValue(value){
	document.getElementById("mappingCount").value=value;
}

function increaseFieldValue() {
	setMappingCountFieldValue(parseInt(getMappingCountFieldValue())+1);
}

function decreaseFieldValue() {
	setMappingCountFieldValue(parseInt(getMappingCountFieldValue())-1);
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
	
			 if(dijit.byId('datasourceDesc').attr('value').length > 499){
				 showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
				return false;
			 }

			 if(dijit.byId('mapFirstDSN').value == ""){
				showEmptyDialog("<bean:message key="datasource.check.select.first" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />");	
				return false;
			 }

			 if(dijit.byId('mapWithSecondDSN').value == ""){
				showEmptyDialog("<bean:message key="datasource.check.select.second" bundle="ds"/>","<bean:message key="datasource.alert" bundle="ds" />");	
				return false;
			 }

			 if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
				return false;
			}
            return setparams('formData');
        }
    showEmptyDialog("<bean:message key="datasource.ds.name.not.available" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
        return false;
    }

        function setparams(formName){
            document.getElementById('operation').value='joinDatasource';
            document.getElementById("datasourceTypeId").value = '8';   
			if(validateDSN()){
				if(!checkAttributesISEmpty())
					return false; 
				var status1 =  validateFirstDSNAttributes();
				var status2 = validateSecondDSNAttributes();
				if(status1 && status2){
					return true;	
				}
				return false; 
				//return true;
			}

			return false;
            
    }

  function UpdateDS(){
	  if(dijit.byId('datasourceDesc').attr('value').length > 499){
				 showEmptyDialog("<bean:message key="datasource.descriptionChkAlert" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
		return false;
	  }
		
	  if(!validateSplOnTxtBox(dijit.byId('datasourceDesc').attr('value'))){
				return false;
			}
		
		 if(dijit.byId('mapFirstDSN').value == ""){
				showEmptyDialog("<bean:message key="datasource.check.select.first" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");	
				return false;
			 }

			 if(dijit.byId('mapWithSecondDSN').value == ""){
				showEmptyDialog("<bean:message key="datasource.check.select.second" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");	
				return false;
			 }
//        if((document.getElementById('result').innerHTML.indexOf('Not') == -1) && (document.getElementById('result').innerHTML != '<b></b>')){       
		    return updateparams('formData');
 //       }
        //		showEmptyDialog("Datasource Name is not available.","Alert");	
 
		showEmptyDialog("<bean:message key="datasource.ds.name.not.available" bundle="ds" />","<bean:message key="datasource.alert" bundle="ds" />");
        return false;
  }

  function updateparams(formName){
            document.getElementById('operation').value='updateJoinDatasource';
            document.getElementById('action').value='action';
            document.getElementById("datasourceTypeId").value = '8';   
			
			if(validateDSN()){
                  if(!checkAttributesISEmpty())
					return false; 
				var status1 =  validateFirstDSNAttributes();				
				if(!status1){
					return false;
				}
				var status2 = validateSecondDSNAttributes();
				if(!status2){
					return false;
				}

				if(status1 && status2){
					return true;	
				} 
				return false; 
				//return true;
			}

            return false;
    }

    




</script>
<body class="tundra bodybg">
<logic:notPresent name="modeType">
  <bean:define id="modeType" value="insert" />
</logic:notPresent>
<logic:notPresent name="ecoDatasourceListData">
<form name="newEcoDataSourceForm" method="post" action="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/ConfigureDataSource.do" onsubmit="return checkUniqueDS()">
</logic:notPresent>
<logic:present name="ecoDatasourceListData">
<form name="newEcoDataSourceForm" method="post" action="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/UpdateDataSource.do" onsubmit="return UpdateDS()">
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
    <input type="hidden" name="id"  id="id" value="<bean:write name="ecoDatasourceListData" property="id" />"/> 
    </logic:present>
  <!--  
                ***************************************************************************************
                    JOIN MASHUP ---- Input Properties & parameters
                ***************************************************************************************
                 -->
    <logic:present name="ecoDatasourceListData">                              
       <input type="hidden" name="mappingCount" id="mappingCount" value="<%=firstAttList.size()%>"/>
    </logic:present>
        
    <logic:notPresent name="ecoDatasourceListData">                              
       <input type="hidden" name="mappingCount" id="mappingCount" value="1"/>
    </logic:notPresent>
                          
	<table width="100%" cellspacing="0" cellpadding="0">
    <tr>
		
	    
		<table  cellspacing="0" cellpadding="0" border="0" >
	
       
			<tr>
				<td width = "100%" class="pageTitle paddingTitle">      
					<bean:message key="datasource.joinDSFieldset" bundle="ds"/>
				</td>
			</tr>
		
			<tr >
				<td width = "100%"  class="paddingTitleDesc bodytext">      
					<strong><bean:message key="datasource.joinDSDescription" bundle="ds"/></strong>
				</td>
			</tr>

		
		<tr>

			<td width = "100%" style="padding-left:280px; width:500px;">

				<label class = "error">	                                   
					<html:messages id="saveStatus" message="true" bundle="ds"><bean:write name="saveStatus" /></html:messages>
				</label>

				<label class = "label"><html:errors bundle="ecoweb"/></label>

		    </td>  


		</tr>

		<tr>
			<td>&nbsp;
				
			</td>
		</tr>

		<tr>
			<td>&nbsp;
				
			</td>
		</tr>
		
                <tr>
                
				  <td style="PADDING-LEFT: 65px! important" height="30" align="left" valign="center" class="redtitle" >                                    
				  <table width="60%" cellspacing="0" cellpadding="0" border="0" align="left">
				  
                  <tr>
                        <td height="28"  align="right" class="bodytext" style="padding-right:12px;"><strong>
                          <bean:message key="datasource.datasourceName" bundle="ds" /><label class="error">*</label>: </strong> </td>
                        <td  height="28" align="left"><table align="left">
                            <tr>
                              <td ><logic:notPresent name="ecoDatasourceListData">
                                  <input type="text"  id="datasourceName" name="datasourceName" class="medium" maxLength="45" autocomplete="off"
                                    dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" onBlur="validateDataSourceName(this);"   />
                                </logic:notPresent>
                                <logic:present name="ecoDatasourceListData">
                                  <logic:notEqual name="modeType" value="insert"> <b>
                                    <bean:write name="ecoDatasourceListData" property="datasourceName" />
                                    </b>
                                    <input type="hidden"    id="datasourceName" name="datasourceName"  value="<bean:write name="ecoDatasourceListData" property="datasourceName" />
                                    "/> </logic:notEqual>
                                  <logic:equal name="modeType" value="insert">
                                  <logic:empty name="ecoDatasourceListData" property="datasourceName"  >
                                    <input type="text"  id="datasourceName" name="datasourceName" class="medium" maxLength="45" autocomplete="off"
                                    dojoType="dijit.form.ValidationTextBox" required="true" trim="true" ucfirst="true" onBlur="validateDataSourceName(this);" value="<bean:write name="ecoDatasourceListData" property="datasourceName" />
                                    "  />
                                    </logic:empty>
                                    <logic:notEmpty name="ecoDatasourceListData" property="datasourceName"  >
				                                   <b>
				                    <bean:write name="ecoDatasourceListData" property="datasourceName" />
				                    </b>
				                    <input type="hidden"	id="datasourceName" name="datasourceName"  
									value="<bean:write name="ecoDatasourceListData" property="datasourceName"/>"/> 
                                    </logic:notEmpty>
                                     </logic:equal>
                                </logic:present>
                              </td>
                            </tr>
                            <tr>
                              <td><span id="result"><b></b></span> </td>
                            </tr>
                          </table></td>
                        <td height="28" width="30px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td  align="right" class="bodytext" style="padding-right:15px;"><strong>
                          <bean:message key="datasource.description" bundle="ds" />
                          :</strong></td>
                        <td colspan="4"><textarea  id="datasourceDesc" 
                            name="datasourceDesc" dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" style="width:200px"><logic:present name="ecoDatasourceListData"><bean:write name="ecoDatasourceListData" property="datasourceDesc" /></logic:present></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td height="13" colspan="8" align="left" class="bodytext"></td>
                      </tr>
                      <tr>
                        <td width="122" height="28" align="right" class="bodytext" style="padding-right:15px;"><strong>
                          <bean:message key="datasource.firstDatasource" bundle="ds" /><label class="error">*</label>: </strong></td>
                        <td width="192" height="28" align="left">
						<select name="mapFirstDSN"  id="mapFirstDSN"   dojoType="dijit.form.FilteringSelect" autocomplete="off" class="selectbox" trim="true"  onChange="if (this.value != '' ){enableFirstAttributes();loadData('getAttributeNames',this, setFirstDatasourceAttributes, 'insert')} else {disableFirstAttributes()}" value="">
                            <option value="" selected><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
							<logic:iterate id="datasourceName" name="allDatasources" >
                              <option value="<bean:write name='datasourceName' />">
                              <bean:write name="datasourceName" />
                              </option>
                            </logic:iterate>
                          </select>
                        </td>
                        <td width="30" height="28">&nbsp;</td>
                        <td width="150" align="right" class="bodytext" style="padding-right:5px;"><strong>
                          <bean:message key="datasource.secondDatasource" bundle="ds" /><label class="error">*</label>: </strong></td>
                        <td colspan="4"><select name="mapWithSecondDSN"  id="mapWithSecondDSN"  dojoType="dijit.form.FilteringSelect" autocomplete="off" class="selectbox" trim="true" onChange="if (this.value != ''){enableSecondAttributes();loadData('getAttributeNames',this, setSecondDatasourceAttributes, 'insert')} else {disableSecondAttributes()}" value="">
                            <option value="" selected><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
                            <logic:iterate id="datasourceName" name="allDatasources" >
                              <option value="<bean:write name='datasourceName' />">
                              <bean:write name="datasourceName" />
                              </option>
                            </logic:iterate>
                          </select></td>
                      </tr>
                      <tr>
                        <td height="13" colspan="8" align="left" class="bodytext"></td>
                      </tr>
                      <tr>
                      <tr>
                        <td height="13" colspan="8" align="left" class="pageTitle paddingTitle" style="padding-left:0px"><small><bean:message key="datasource.mappingAttributes" bundle="ds" /></small></td>
                      </tr>
                      <tr>
                      <tr>
                        <td height="13" colspan="8" align="left" class="bodytext"></td>
                      </tr>
					  <tr>
                        <td>&nbsp;</td><td height="13"  align="left" style="padding-left:2px" class="redTitle1"><strong class="bodytext1"><bean:message key="datasource.firstDatasource" bundle="ds" /></strong></td>
						<td>&nbsp;</td><td height="13"  style="padding-left:22px" class="redTitle1" ><strong class="bodytext1"><bean:message key="datasource.secondDatasource" bundle="ds" /></strong></td>
                      </tr>
					  <tr>
                        <td height="13" colspan="8" align="left" class="bodytext"></td>
                      </tr>
                      <tr>
                        <td colspan="8">
                        <table id="dynaTable" border="0">
                        <logic:notPresent name="ecoDatasourceListData">  
		                         <tr>
		                         <td width="122" height="28" align="left" class="bodytext"  ><strong>
		                          <span name='firstLabel'> <bean:message key="datasource.attribute.label" bundle="ds"/> 1</span></strong></td>
		                        <td width="192" height="28" align="left"><select name="mapFirstDSNAttr1"  id="mapFirstDSNAttr1"  autocomplete="off" dojoType="dijit.form.FilteringSelect" class="selectbox" store="firstAttrStore"  searchAttr="attr">
		                            <option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
		                          </select>
		                        </td>
		                        <td width="30" height="28">&nbsp;</td>
		                        <td  align="right" class="bodytext" style="padding-right:5px;">&nbsp;  </td>
		                        <td ><select name="mapWithSecondDSNAttr1"  id="mapWithSecondDSNAttr1"  dojoType="dijit.form.FilteringSelect" class="selectbox" trim="true" store="secondAttrStore"  searchAttr="attr" >
		                            <option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
		                          </select></td>
		                           <td><a href="#"	onclick="javascript:addNewRow();return false;"><img src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/icon_plus_1.png"   /></a></td>
		                          </tr>
                          </logic:notPresent>
                          <logic:present name="ecoDatasourceListData">                       
                              <%
                                  
                                  for(int index=0;index<firstAttList.size();index++) 
                                  {
                              %>                                 
                                    <tr>
			                        <td width="122" height="28" align="left" class="bodytext"  ><strong>
			                        <span name='firstLabel'> <bean:message key="datasource.attribute.label" bundle="ds"/> <%=index+1%></span></strong></td>
			                        <td width="192" height="28" align="left"><select name='mapFirstDSNAttr<%=index+1%>'  id="mapFirstDSNAttr<%=index+1%>"  autocomplete="off" dojoType="dijit.form.FilteringSelect" class="selectbox" store="firstAttrStore"  searchAttr="attr">
			                            <option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
			                          </select>
			                        </td>
			                        <td width="30" height="28">&nbsp;</td>
			                        <td  align="right" class="bodytext" style="padding-right:5px;"><strong>			                           
			                         <td><select name="mapWithSecondDSNAttr<%=index+1%>"  id="mapWithSecondDSNAttr<%=index+1%>"  trim="true" autocomplete="off" dojoType="dijit.form.FilteringSelect" class="selectbox" store="secondAttrStore"  searchAttr="attr" >
			                            <option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
			                          </select></td>
			                          <%
			                          if(index==0) {
			                        	  %>
			                          <td><a href="#"	onclick="javascript:addNewRow();return false;"><img src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/icon_plus_1.png"  /></a></td>
			                          <% } else { %>
			                          <td><img src='<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/images/portal/icon_dash_1.png'    style='cursor: hand;'  onclick='javascript:removeRow(this.parentNode.parentNode)'/></td>
			                          <% } %>
			                          			                          
			                          </tr>                             
                             <% 
                                  }
                             %>
                          </logic:present>                                                   
                        </table>                        
                       </td>
                     </tr>
                      
                    </table></td>
                </tr>
				</table></td></tr>
                <!-- Button Panel -->
                <logic:notPresent name="ecoDatasourceListData">
   
	<table width="101.2%">
		<tr class="barColor">
        	<td align="center">
				<button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/adminMain.do'  "><bean:message key="datasource.home" bundle="ds" /></button>
				<button dojoType="dijit.form.Button"  type="button" onClick="window.location='WizardHomeAction.do?operation=configureDatasource'">
          				<bean:message key="datasource.back" bundle="ds" /></button>
          		<button dojoType="dijit.form.Button" id="save" type="submit" ><bean:message key="datasource.save" bundle="ds" /></button>
          	</td>
      	</tr>
    </table>
    <script>
		dojo.addOnLoad(loadFormValues); 
			function loadFormValues(){
				
				disableFirstAttributes();
				disableSecondAttributes();
			}

	</script>
  </logic:notPresent>
  <logic:present name="ecoDatasourceListData">
    <table width="101.2%">
		<tr class="barColor">
        	<td align="center">
				<button dojoType="dijit.form.Button"  type="button"  onclick="window.location =  '<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/adminMain.do'  "><bean:message key="datasource.home" bundle="ds" /></button>
				<button dojoType="dijit.form.Button"  type="button"  onClick="window.location = 'WizardHomeAction.do?operation=showAllDatasource&pageNo=1' "><bean:message key="datasource.back" bundle="ds" /></button>
          		<button dojoType="dijit.form.Button" id="save" type="submit" ><bean:message key="datasource.save" bundle="ds" /></button>
          	</td>
      </tr>
	</table>
    <script>
    dojo.addOnLoad(loadFormValues);
     
        function loadFormValues(){
            dijit.byId('mapFirstDSN').setValue('');
            dijit.byId('mapWithSecondDSN').setValue('');
			dijit.byId('mapFirstDSN').setValue('<bean:write name="ecoDatasourceListData" property="mapFirstDSN" />');
        dijit.byId('mapFirstDSNAttr1').setValue('');
            dijit.byId('mapWithSecondDSNAttr1').setValue('');
		}
		
		function loadFirstDSAttributes(){
			 <%
             List list=((NewEcoDataSourceBean)request.getAttribute("ecoDatasourceListData")).getMapFirstList();
             for(int index=0;index<firstAttList.size();index++) 
             {
             %>  
               dijit.byId('mapFirstDSNAttr<%=index+1%>').setValue('<%=firstAttList.get(index)%>');
             <%  			
              }
             %>
 		    dijit.byId('mapWithSecondDSN').setValue('<bean:write name="ecoDatasourceListData" property="mapWithSecondDSN" />');
		}

		function loadSecondDSAttributes(){
			<%
            List secondList=((NewEcoDataSourceBean)request.getAttribute("ecoDatasourceListData")).getMapSecondList();
            for(int index=0;index<secondList.size();index++) 
            {
            %>  
              dijit.byId('mapWithSecondDSNAttr<%=index+1%>').setValue('<%=secondList.get(index)%>');
            <%  			
             }
            %>
		}
		
</script>
  </logic:present>

<script>
//Common Methods for Update as well as Insersion

   
                
	function disableFirstAttributes(){
		        var indexes=getIndexList();
		        for(index=0;index<indexes.length;index++) {
		        	dijit.byId('mapFirstDSNAttr'+indexes[index]).setAttribute('disabled', true);    
		        }
	}								
	
	function disableSecondAttributes(){
				var indexes=getIndexList();
		        for(index=0;index<indexes.length;index++) {
		        	dijit.byId('mapWithSecondDSNAttr'+indexes[index]).setAttribute('disabled', true);    
		        } 
	}

	function enableFirstAttributes(){
				var indexes=getIndexList();
		        for(index=0;index<indexes.length;index++) {
		        	dijit.byId('mapFirstDSNAttr'+indexes[index]).setAttribute('disabled', false);    
		        }
	}

	function enableSecondAttributes(){
				var indexes=getIndexList();
		        for(index=0;index<indexes.length;index++) {
		        	dijit.byId('mapWithSecondDSNAttr'+indexes[index]).setAttribute('disabled', false);    
		        } 
	}
	
</script>
</form>