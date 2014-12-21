<%@page import="com.enterprisehorizons.magma.config.utils.MagmaDBUtils"%>
<%@page import="java.util.Map"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>

<%@ include file="/common/dojo.jsp" %>
 <%				
			Map activeUsersList = MagmaDBUtils.getAllAeactivatedUsers();
			pageContext.setAttribute("activeUsersList",activeUsersList);
			
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
	
	function updateFields(){
	
		if('<%=request.getParameter("fav")%>' != 'null' && '<%=request.getParameter("fav")%>' != "")
			document.getElementsByName('fav')[0].checked = true;
		if('<%=request.getParameter("lasso")%>' != 'null' && '<%=request.getParameter("lasso")%>' != "")
			document.getElementsByName('lasso')[0].checked = true;
		if('<%=request.getParameter("deleteuserpersonal")%>' != 'null' && '<%=request.getParameter("deleteuserpersonal")%>' != "")
			document.getElementsByName('deleteuserpersonal')[0].checked = true;
		if('<%=request.getParameter("reassignusershared")%>' != 'null' && '<%=request.getParameter("reassignusershared")%>' != "")
			document.getElementsByName('reassignusershared')[0].checked = true;
	}
</script>
</head>

<body class="tundra bodybg" onload="updateFields()">
<% 
	String activeUsers = (String)request.getParameter("cobmoActiveUsersLisOld");
	String targetUsers = (String)request.getParameter("cobmoActiveUsersListTarget");
	if(activeUsers == null){
		activeUsers = "";
	}
	if(targetUsers == null){
		targetUsers = "";
	}
 %>
<form name="processLassoandFav" method="post" action="<%=ServerUtils.getContextName(request)%>/processreassigndelfavnlassos.do"">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">


<table width="101.2%">

<tr>

	<td class="pageTitle paddingTitle">    
		
		<tr>
			
			<td  class="pageTitle paddingTitle">      
        		
        		<bean:message key="lassoFav.title" bundle="lassoandfavorite"/>
       		
       		</td>
       		
    	</tr>
     	
    	<tr>
    		
    		<td class="paddingTitleDesc bodytext">
        		<strong>
        		<bean:message key="lassoFav.msg" bundle="lassoandfavorite"/> </strong>
       		
       		</td> 
       		 
    	</tr>







		<tr>	<td>
		    			
		    			<font color="blue" style="font-family: Tahoma;font-size: 12px;" >
		    				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		    				<b><html:messages id="msg"  message="true" name="lassoFav.saveStatus"  bundle="lassoandfavorite"><bean:write name="msg" /></html:messages></b>
		    			
		    			</font> 
		    		
		    			<font color="red" style="font-family: Tahoma;font-size: 12px;">
		    				
		    				<b><html:errors bundle="lassoandfavorite"/></b>
		    			
		    			</font>
		    		 
		    		</td>
		    		
    	</tr>
    	
    	
    	
		<tr>
	
			<td style="padding-left:65px;padding-top:15px">
	
 				<table id="table2" class="lasso-action" height="54" cellspacing="0" cellpadding="0">
 	
					<tr>
        			
        				<td>
            		
            				<table  border="0">
            			
            					
							
									<tr>
										<td >
			   							<label class="label">
										<bean:message key="lassoFav.selectuser" bundle="lassoandfavorite"/></label>
										
												
												<select name="cobmoActiveUsersLisOld" dojoType="dijit.form.FilteringSelect" id="cobmoActiveUsersLisOld"  onchange="showTip(this)" >
													<option value="-1"><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
														
														<logic:present name="activeUsersList" scope="page">
																<logic:iterate name="activeUsersList" id="nameObj" scope="page">
																	<option value="<bean:write name="nameObj" property="key"/>" <logic:equal name="nameObj" property="key" value='<%=activeUsers%>'> selected </logic:equal>><bean:write name="nameObj" property="value"/></option>
																</logic:iterate>
														</logic:present>	
												</select> 
											
										
								
                                        	

										</td>
										
									
									</tr>
						
									

                            <tr><td>&nbsp;</td></tr>
                            
                            	<tr>
					<td >
					<label class="label">
					<bean:message key="lassoFav.performAction" bundle="lassoandfavorite"/></label>
					</td>

				
				</tr>	
     			
            	               	<tr> 
                	            	
                    	            	<td align="left" style="padding-top:5px">
                    	            		<input type="checkbox" name="fav" id="idfav" value="favourites" >  <label class="label-lasso"><bean:message key="lassoFav.fav" bundle="lassoandfavorite"/></label>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="lasso" id="idlasso" value="lassos" >  <label class="label-lasso"><bean:message key="lassoFav.lassos" bundle="lassoandfavorite"/></label></td>
				</tr>
				
				<tr><td>&nbsp;</td></tr>
				<tr>
				
				<td >
				<label class="label">
				<bean:message key="lassoFav.action" bundle="lassoandfavorite"/></label>
				</td>

				
				</tr>
				
				<tr> 
                	            	
                    	            	<td align="left" style="padding-top:5px">
                        	            	<input type="checkbox" name="deleteuserpersonal" id="deleteuserpersonal" value="deleteuserpersonal" autocomplete="off">  <label class="label-lasso"><bean:message key="lassoFav.deleteuserpersonal" bundle="lassoandfavorite"/></label>  
					</td>
				</tr>
				<tr><td height="8px"></td></tr>
				<tr>
                    	            	<td align="left" >
                        	            	<input type="checkbox" name="reassignusershared" id="idreassignusershared" value="reassignusershared" autocomplete="off">  <label class="label-lasso"><bean:message key="lassoFav.reassignusershared" bundle="lassoandfavorite"/></label>&nbsp;
											<select name="cobmoActiveUsersListTarget" dojoType="dijit.form.FilteringSelect" id="cobmoActiveUsersListTarget" autocomplete="off" onchange="showTip(this)" >
									<option value="-1"><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>

										<logic:present name="activeUsersList" scope="page">
												<logic:iterate name="activeUsersList" id="nameObj" scope="page">
													<option value="<bean:write name="nameObj" property="key"/>" <logic:equal name="nameObj" property="key" value='<%=targetUsers%>'> selected </logic:equal>><bean:write name="nameObj" property="value"/></option>
												</logic:iterate>
										</logic:present>	
							</select> 





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
        					<button dojoType="dijit.form.Button"  id="idBack" name="btnBack" type="button" onClick="goToDBHomePage()"> <bean:message key="lassoFav.home" bundle="lassoandfavorite"/> </button>
        					<button dojoType="dijit.form.Button"   id="idGenerate" name="btnGenerate" type="submit" onClick="return performSubmit();"> <bean:message key="lassoFav.submit" bundle="lassoandfavorite"/>  
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
	
	confDtls = new dijit.Dialog({
    	title: "Loading...",
    	style: "width: 300px;height:125px"
    });
     
});


function performSubmit(){
	
		var optValTargetUser = dijit.byId('cobmoActiveUsersListTarget'); 
		var optValOldUser = dijit.byId('cobmoActiveUsersLisOld'); 
		
		
		if(optValOldUser.value=="-1"){
			
			showDialogBox("<bean:message key='lassoFav.olduser.select' bundle='lassoandfavorite'/>");
			 return false; 
		}
       
		if(!document.getElementById("idlasso").checked && !document.getElementById("idfav").checked){
			
			showDialogBox("<bean:message key='lassoFav.lassofavvalidation' bundle='lassoandfavorite'/>");
			 return false;
		}
		if(!document.getElementById("deleteuserpersonal").checked && !document.getElementById("idreassignusershared").checked){
			
			showDialogBox("<bean:message key='lassoFav.sharedelpersonalvalidation' bundle='lassoandfavorite'/>");
			 return false;
		}	
		
		if(optValTargetUser.value=="-1" && document.getElementById("idreassignusershared").checked){
			
			showDialogBox("<bean:message key='lassoFav.targetuser.select' bundle='lassoandfavorite'/>");
			 return false; 
		}
		 if(document.getElementById("idreassignusershared").checked && optValTargetUser.value==optValOldUser.value){
			showDialogBox("<bean:message key='lassoFav.sameuser' bundle='lassoandfavorite'/>");
			 return false; 
		}
		
	}
	
	function hideMessaageBox(){
	
	confDtls.hide();
}

function showTip(loginId) {
            
			if(loginId.value!=-1){
			document.getElementById(loginId.id).title = loginId;
			}else{
					document.getElementById(loginId.id).title = "";
			}
		}	

function showDialogBox(msg2Display){
	var  dialogTitle = "<bean:message key='lassoFav.alert.title' bundle='lassoandfavorite'/>";
	// set the content of the dialog:
    if(confDtls != null) { 
    	confDtls.attr("title",  dialogTitle);
		confDtls.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+msg2Display+"</td></tr><tr><td align='center'><button dojoType='dijit.form.Button' onClick='hideMessaageBox()'  type='button'>Ok</button> </td></td></tr></table></center>");
		confDtls.show();
    }
}

</script>

</html>