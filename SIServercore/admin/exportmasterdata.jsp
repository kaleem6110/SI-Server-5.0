<%@page import="com.enterprisehorizons.magma.server.admin.ConfigurationUtils , com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>

<%@ include file="/common/dojo.jsp" %>
<!-- Privileges imports  -->
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.security.util.AccessHelper"%>
<%@page import="com.spacetimeinsight.db.privileges.model.RoleRightsMap"%>
<%@page import="com.spacetimeinsight.stas.privileges.services.PrivilegesConstants"%>

<%
  // Changes for applying Privileges -- Start
  UserBean userBean          = (UserBean)session.getAttribute(ServerUtils.USER_BEAN_NAME);  
  String moduleId      =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
  //Get the access permissions for the given right or subright and accessType                         
  RoleRightsMap roleRightsMap	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.SubRight.MODEL_MAIN_EXPORT_MASTER_DATA,moduleId);  
  //Changes for applying Privileges -- End
  
%>
<html>
<head>
<%
String value =request.getParameter("btnExportData");
if(value==null) value="0";

%>
<script type="text/javascript" src="js/windows.js"></script>
<script type="text/JavaScript">

    function goToDBHomePage(){
            window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
    }
    
</script>
</head>
<body class="tundra bodybg" >

<form name="exportForm" method="post" action="<%=ServerUtils.getContextName(request)%>/export.do" onSubmit="return performSubmit();">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">


<table width="101.2%">
<tr>

	<td class="pageTitle paddingTitle">    
		
		<tr>
			
			<td  class="pageTitle paddingTitle"> 
			     
        		<bean:message key="export.exportdata" bundle="export"/>
        		       		
       		</td>
       		
    	</tr>
     	
    	<tr>
    		
    		<td class="paddingTitleDesc bodytext">
        		<strong>
        		<bean:message key="export.mgs" bundle="export"/></strong>
       		
       		</td> 
       		 
    	</tr>

		 <tr>
			
			<td style="padding-left:67px;padding-top:5px">
    			
    			<font color="red" style="font-family: Tahoma;font-size: 12px;">
    				
    				<div id="errorpage"><b><html:errors bundle="export"/></b></div>

    			</font>
    		 
    		</td>
    		
    	</tr>  	
		<tr>
	
			<td style="padding-left:65px;padding-top:15px">
	
 				<table id="table2" height="54" cellspacing="0" cellpadding="0">
 	
					<tr>
        			
        				<td>
            		
            				<table  border="0">
            			
            					
						       	<tr> 
                	            		<td>&nbsp;</td>
                    	            	<td align="left" style="padding-top:10px;">
                        	            	<input type="radio" name="btnExportData" id="idExportData" value="0" <% if(value.equals("0")){%>checked<%}%> autocomplete="off" onClick="deactivateTextBox(this.form)">  <label class="label"><bean:message key="export.securitylabel" bundle="export"/></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                		</td>
                            		</tr>
								<tr> 
                	            		<td>&nbsp;</td>
                    	            	<td align="left" style="padding-top:10px;">
                        	            	
                            	        	<input type="radio" autocomplete="off"  name="btnExportData" value="1" <% if(value.equals("1")){%>checked<%}%> onClick="deactivateTextBox(this.form)"> <label class="label"><bean:message key="export.jobslabel" bundle="export"/></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                		</td>
                            		</tr>
                                <tr> 
                	            		<td>&nbsp;</td>
                    	            	<td align="left" style="padding-top:10px;">
                        	            	<input type="radio" autocomplete="off"  name="btnExportData" value="2" <% if(value.equals("2")){%>checked<%}%> onClick="deactivateTextBox(this.form)"> <label class="label"><bean:message key="export.datasourceslabel" bundle="export"/></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                		</td>
                            		</tr>
								<tr> 
                	            		<td>&nbsp;</td>
                    	            	<td align="left" style="padding-top:10px;">
                    	            	<input type="radio" autocomplete="off"  name="btnExportData" value="4" <% if(value.equals("4")){%>checked<%}%> onClick="deactivateTextBox(this.form)"> <label class="label"><bean:message key="export.ecogroupmapping" bundle="export"/></label>
                                		</td>
                           		</tr> 					
								<tr> 
									<tr> 
                	            		<td>&nbsp;</td>
                    	            	<td align="left" style="padding-top:10px;">
                        	            	<input type="radio" autocomplete="off"  name="btnExportData" value="3" <% if(value.equals("3")){%>checked<%}%> onClick="activateTextBox(this.form)"> <label class="label"><bean:message key="export.custom" bundle="export"/></label>
                                		</td>
                           		</tr> 					
								<tr>
										<td>&nbsp;</td>
                    	            	<td align="left">
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<div style="padding-left:25px;" >		                                
												<!--textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" name="customModel" id="idCustomModel" style="width:15em;height:4.5em" ></textarea-->
												<input type="text"  id="idCustomModel" name="customModel" class="medium" style="height:1.7em;width=300px;" dojoType="dijit.form.ValidationTextBox" disabled="disabled" autocomplete="off"/>   
												<div>
													<sub><bean:message key="export.helptext" bundle="export"/></sub>
												</div>
											</div>
										</td>
                            	</tr>                            							
						</table>
                		</td>
                	
	             	</tr><tr><td>
             <table>	<tr> 
                        		
                                   		<td style="padding-top:10px;padding-left:5px;width:135px;" valign="top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="label"><bean:message key="export.filter" bundle="export"/>:</label> </td>
                                   
                                   		
                            		</tr>
									<tr> 
                        		    
                                   
                                   		<td style="padding-top:10px;padding-left:28px;width :35px;">            
                                        	<textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" name="whereClause" id="idWhereClause" style="width:15em;height:4.5em" ></textarea>
                                   		</td>
                                    
                            		</tr>
									</table></td></tr>
				</table>
				
			</td>
			
		</tr>
		
		<tr>
    		<td>&nbsp;
    		
    		</td>
    	</tr>
    	
    	
		<tr>
		
			<td>
			
				<table width="101.2%">

					<tr class="barColor">
	
    					<td align="center">	
        					<button dojoType="dijit.form.Button"  id="idHome" name="btnHome" type="button" onClick="goToDBHomePage()"> <bean:message key="export.home" bundle="export"/> </button>
							<button dojoType="dijit.form.Button"  id="idBack" name="btnBack" type="button" onClick="window.location = '<%=ServerUtils.getContextName(request)%>/dbadmin.do'"> <bean:message key="export.back" bundle="export"/> </button>
        					<button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasCreateAccess()) { %> disabled="true" <%}%> id="idExport" name="btnExport" type="submit" ><bean:message key="export.export" bundle="export"/></button>
        	        		<button dojoType="dijit.form.Button"  id="idReset" name="btnReset" type="reset" onClick="resetValues();" ><bean:message key="export.reset" bundle="export"/></button>	
        					
    					</td>
    					
    									
    	
    				</tr>
    	
				</table>
				
			</td>
			
		</tr>
						
	</td>
		
</tr>

	
</table>
    
    
    
</form>

</body>
<script>
dojo.addOnLoad(loadFormValues);

function loadFormValues(){
<% if(value.equals("3")){%>
	dijit.byId('idCustomModel').setAttribute('disabled', false); 
<%}%>
}

function activateTextBox(frm)
  {
    frm.customModel.disabled=false;
    document.getElementById("idCustomModel").className = "enable_text_field";
  }
 
 function deactivateTextBox(frm)
  {
  
    frm.customModel.disabled=true;
    document.getElementById('errorpage').innerHTML ='';
	document.getElementById("idCustomModel").className = "disable_text_field";
  }

function performSubmit()
{
   var btnExportDataVar;
   var customModelVar = document.exportForm.customModel;
   for (var i=0; i < document.exportForm.btnExportData.length; i++)
   {
   		if (document.exportForm.btnExportData[i].checked)
      	{
     		btnExportDataVar= document.exportForm.btnExportData[i].value;
      	}
   }
  if(btnExportDataVar == '3' && customModelVar.value == '')
    { 
		showEmptyDialog("<bean:message key='export.alert.message' bundle='export'/>", "<bean:message key='export.alert.title' bundle='export'/>");
		return  false; 
	}
  //setting the error message as blank
  document.getElementById('errorpage').innerHTML ='';
	return true;
}

function resetValues(){
document.getElementById('errorpage').innerHTML ='';
<% if(value.equals("3")){%>
	dijit.byId('idCustomModel').setAttribute('disabled', false); 
<%}else{%>
	dijit.byId('idCustomModel').setAttribute('disabled', true); 
<% }%>
	
}

</script>
</html>