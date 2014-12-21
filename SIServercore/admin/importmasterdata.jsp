<%@page import="com.enterprisehorizons.magma.server.admin.ConfigurationUtils , com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>

<%@ include file="/common/dojo.jsp" %>

<html>
<head>

<script type="text/javascript" src="js/windows.js"></script>
<script type="text/JavaScript">

    function goToDBHomePage(){
            window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
    }
</script>
</head>

<body class="tundra bodybg">

<form name="importForm" method="post" action="<%=ServerUtils.getContextName(request)%>/import.do" enctype="multipart/form-data" onSubmit="return performSubmit();">
<<input type="hidden" id="csrf" name="csrf" value="${csrf}">
table width="100%" cellspacing="0" cellpadding="0" align="left"  border="0">

<tr>

	<td class="pageTitle paddingTitle">    
		
		<tr>
			
			<td  class="pageTitle paddingTitle"> 
			     
        		<bean:message key="import.importdata" bundle="import"/>
        		       		
       		</td>
       		
    	</tr>
     	
    	<tr>
    		
    		<td class="paddingTitleDesc bodytext">
        		<strong>
        		<bean:message key="import.mgs" bundle="import"/></strong>
       		
       		</td> 
       		 
    	</tr>

		 <tr>
			
			<td style="padding-left:67px;padding-top:5px">
    			<font color="blue" style="font-family: Tahoma;font-size: 12px;" >
    				
    				<b><html:messages id="saveStatus" message="true" bundle="import"><bean:write name="saveStatus" /></html:messages></b>
    			
    			</font> 
    			<font color="red" style="font-family: Tahoma;font-size: 12px;">
    				
    				<b><html:errors bundle="import"/></b>
    			
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
                        	          <label class="label"><bean:message key="import.selectlabel" bundle="import"/>:</label>
                                	</td>
                            	</tr>
								<tr> 
                	              <td>&nbsp;</td>
                    	          <td align="left" style="padding-top:10px;">
                        	        <input type="file" id="idMyFile" name="myFile" dojoType="dojox.form.FileInput" style="width:30em;height:20px" autocomplete="off"> 				                            	  
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
			
				<table width="100%">

					<tr colspan="2" class="barColor">
	
    					<td  colspan="2"  align="center">	
        					<button dojoType="dijit.form.Button"  id="idHome" name="btnHome" type="button" onClick="goToDBHomePage()"> <bean:message key="import.home" bundle="import"/> </button>
							<button dojoType="dijit.form.Button"  id="idBack" name="btnBack" type="button" onClick="window.location = '<%=ServerUtils.getContextName(request)%>/dbadmin.do'"> <bean:message key="import.back" bundle="import"/> </button>
        					<button dojoType="dijit.form.Button"  id="idImport" name="btnImport" type="submit" ><bean:message key="import.import" bundle="import"/></button>
        	        		<button dojoType="dijit.form.Button"  id="idReset" name="btnReset" type="reset" ><bean:message key="import.reset" bundle="import"/></button>		
        					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        					
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

function performSubmit()
{

   var btnImportDataVar=document.importForm.myFile.value;
   var fileFormat=btnImportDataVar.substr(btnImportDataVar.lastIndexOf(".")+1,3);
   
   if(btnImportDataVar == '' || fileFormat.toLowerCase() != 'xml')
    { 
		showEmptyDialog("<bean:message key='import.alert.message' bundle='import'/>", "<bean:message key='import.alert.title' bundle='import'/>");
		return  false; 
	}
	
	return true;
}

</script>
</html>