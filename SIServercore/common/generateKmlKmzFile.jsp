<%@page import="com.enterprisehorizons.magma.server.admin.ConfigurationUtils , com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>

<%@ include file="/common/dojo.jsp" %>
 <%				
                String[] mdlFileNames = ConfigurationUtils.getDeployedModelFileNames();
				pageContext.setAttribute("mdlFileNames",mdlFileNames);
								
            %>
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
  RoleRightsMap roleRightsMap	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.Right.KMZ_GENERATOR,moduleId);  
  //Changes for applying Privileges -- End
  
%>
<html>
<head>

<style>
   

        body .txtareamedium {
            width: 25em;
            height: 5em;
        }

</style>
<script type="text/javascript" src="js/windows.js"></script>
<script type="text/JavaScript">

    function goToDBHomePage(){
            window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
    }
</script>
</head>

<body class="tundra bodybg">

<form name="frmKmlGenerate" method="post" action="<%=ServerUtils.getContextName(request)%>/processKMLFile.do"">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">


<table width="101.2%">

<tr>

	<td class="pageTitle paddingTitle">    
		
		<tr>
			
			<td  class="pageTitle paddingTitle">      
        		
        		<bean:message key="kmlGen.kmlkmggen" bundle="kmlGen"/>
       		
       		</td>
       		
    	</tr>
     	
    	<tr>
    		
    		<td class="paddingTitleDesc bodytext">
        		<strong>
        		<bean:message key="kml.mgs" bundle="kmlGen"/> </strong>
       		
       		</td> 
       		 
    	</tr>

		<tr>
			
			<td>
    			
    			<font color="blue" style="font-family: Tahoma;font-size: 12px;" >
    				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    				<b><html:messages id="saveStatus" message="true" bundle="kmlGen"><bean:write name="saveStatus" /></html:messages></b>
    			
    			</font> 
    		
    			<font color="red" style="font-family: Tahoma;font-size: 12px;">
    				
    				<b><html:errors bundle="kmlGen"/></b>
    			
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
										<td style="width:140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			   							<label class="label">
										<bean:message key="kmlGen.ecoexpml" bundle="kmlGen"/></label><label class="error">*</label><label class="label">:</label>
										</td>
			   					
			         					<td>
												
												<select name="cmbKmlKmz" dojoType="dijit.form.FilteringSelect" id="cmbKmlKmz" autocomplete="off" onchange = "onEcoSystemChange();">
													<option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
														
														<logic:present name="mdlFileNames" scope="page">
																<logic:iterate id="cmbKmlKmz" name="mdlFileNames" >
																	<option value="<bean:write  name="cmbKmlKmz" />"><bean:write  name="cmbKmlKmz" /></option>
																</logic:iterate>
														</logic:present>	
												</select>
											
										
								
                                        	

										</td>
									
									</tr>
						
									<tr>
								            <td height="27" style="padding-top:10px;width:140px;">
									            <label class="label"><bean:message key="kmlGen.generatedFileName" bundle="kmlGen"/></label><b>:</b>
											</td>
											<td style="padding-top:10px;width:120px;">
		                                    <input type="text"  id="outputfilename" name="outputfilename" class="medium" style="height:1.7em;width=195px;" 
				                            trim="true" ucfirst="true" autocomplete="off"/>   
						                     </td>
                        
									 </tr> 

									<tr>
								            <td height="27" style="padding-top:10px;padding-left:2px;width:140px;">&nbsp;&nbsp;&nbsp;
									            <label class="label"><bean:message key="kmlGen.outputDirectory" bundle="kmlGen"/></label>&nbsp;<b>:</b>
											</td>
											<td style="padding-top:10px;align:left;" width="120px"  >
		                                    <input type="text"  id="outputdirectory" name="outputdirectory" class="medium" style="height:1.7em;width=195px;" 
				                             trim="true" ucfirst="true" autocomplete="off"/>   
						                     </td>
                        
									 </tr> 


                        			<tr>
                        		
                                   		<td style="padding-top:10px;padding-left:5px;width:135px;" valign="top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="label"><bean:message key="kmlGen.parameters" bundle="kmlGen"/>&nbsp;:</label> </td>
                                   
                                   		<td style="padding-top:10px;padding-left:1px;width :135px;">            
                                        	<textarea dojoType="dijit.form.SimpleTextarea" rows="5" cols="30" name="kmlParams"    style="width:15em;height:4.5em" ></textarea>
                                   		</td>
                                    
                            		</tr>
                            
                            		<tr>
                            
                            			<td>&nbsp;</td>
                            	
                            				<td  align="left"> 
	                            				<sub><bean:message key="kmlGen.suggestParams" bundle="kmlGen"/></sub>
    	                        			</td>
                            		
        	                    		</tr>
     
            	                	<tr> 
                	            		<td>&nbsp;</td>
                    	            	<td align="left" style="padding-top:10px;">
                        	            	<input type="radio" name="btnKMLKMZRadio" id="idKMLRadio" value="kml" autocomplete="off">  <label class="label"><bean:message key="kmlGen.kml" bundle="kmlGen"/></label>  &nbsp;&nbsp;
                            	        	<input type="radio"  name="btnKMLKMZRadio" checked value="kmz" autocomplete="off"> <label class="label	"><bean:message key="kmlGen.kmz" bundle="kmlGen"/></label>
                                	    	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                		</td>
                            		</tr>

                                
                        		
                        
                    		</table>
                    	
                		</td>
                	
	             	</tr>
             	
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

					<tr colspan="2" class="barColor">
	
    					<td align="center">	
        					<button dojoType="dijit.form.Button"  id="idBack" name="btnBack" type="button" onClick="goToDBHomePage()"> <bean:message key="kmlGen.home" bundle="kmlGen"/> </button>
        					<button dojoType="dijit.form.Button"  <%if(!roleRightsMap.getHasCreateAccess()) { %> disabled="true" <%}%>  id="idGenerate" name="btnGenerate" type="submit" onClick="return performSubmit();"> <bean:message key="kmlGen.generate" bundle="kmlGen"/>  
							</button>
        					
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

var  confDtls;

dojo.addOnLoad(function(){
	dijit.byId('cmbKmlKmz').setValue('');
	confDtls = new dijit.Dialog({
    	title: "Loading...",
    	style: "width: 300px;height:125px"
    });
     
});

function setFocusComboBox(){
	dijit.byId('cmbKmlKmz').focus();
	confDtls.hide();
}

function showDialogBox(date2Display){
	var  dialogTitle = "<bean:message key='kmlGen.alert.title' bundle='kmlGen'/>";
	// set the content of the dialog:
    if(confDtls != null) { 
    	confDtls.attr("title",  dialogTitle);
		confDtls.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+date2Display+"</td></tr><tr><td align='center'>  <button dojoType='dijit.form.Button' onClick='setFocusComboBox()' type='button'>Ok</button> </td></td></tr></table></center>");
		confDtls.show();
    }
}


function performSubmit(){

         var cmbKmlKmzVar = dijit.byId('cmbKmlKmz'); 
	var kmlParamsVar = document.frmKmlGenerate.kmlParams;
	if(cmbKmlKmzVar.value == '')  { 
		showDialogBox("<bean:message key='kmlGen.ecoexml.check' bundle='kmlGen'/>");
		return  false; 
	}
	
	if(kmlParamsVar.value.length != 0 ){
		var splitVar = kmlParamsVar.value.split(";");
		if(splitVar.length != 0){
			for(i=0;i<splitVar.length;i++)
			{ 
				var tempVar = splitVar[i];
				var splitVar2 = tempVar.split("=");
				if(splitVar2.length-1 == 0){
					showEmptyDialog("<bean:message key='kmlGen.parameter.check' bundle='kmlGen'/>","<bean:message key='kmlGen.alert.title' bundle='kmlGen'/>");
 					return  false;
  				}
				for(j=0;j<splitVar2.length;j++){
					if( splitVar2[j].length == 0){
						showEmptyDialog("<bean:message key='kmlGen.parameter.check' bundle='kmlGen'/>","<bean:message key='kmlGen.alert.title' bundle='kmlGen'/>");
		 				return  false;
 					}
				}
			}
 		}else{
	  		showEmptyDialog("<bean:message key='kmlGen.parameter.check' bundle='kmlGen'/>","<bean:message key='kmlGen.alert.title' bundle='kmlGen'/>");
			return  false;
		}
	}

	return true;
}

function onEcoSystemChange(){
	document.getElementById('kmlParams').value='';
	document.getElementById('outputfilename').value='';
	document.getElementById('outputdirectory').value='';
}

</script>
</html>