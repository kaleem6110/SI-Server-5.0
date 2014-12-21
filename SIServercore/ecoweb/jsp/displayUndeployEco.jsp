<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@ page import="com.spacetimeinsight.admin.undeploy.bean.FileDetailBean , java.util.ArrayList" %>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
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
  RoleRightsMap roleRightsMap	= AccessHelper.getRoleRightsMap(userBean,PrivilegesConstants.Right.UNDEPLOY_ECOSYSTEM_FILES,moduleId);  
  //Changes for applying Privileges -- End
  
%>
<html:html locale="true">
<head>
<%@ include file="/common/dojo.jsp"%>
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<title> <bean:message key="undeploy.title" bundle="undeploy"/></title>

<script>



function deleteDS(){
    document.forms[0].submit();   
}

function dodelete(){
	document.forms[0].submit();
}
    
function isAnyFileSelected(){
 
 	var files = document.getElementById('selFile');
 	
 	if(files != null){
 		
 		for(var count=0;count <files.length;count++)      
    	{
			if(files[count].selected){
				return true;
			}	
		}
		
	}
	
	return false;
}
 
function checkSelectAndDeleteFiles(){

	if(!isAnyFileSelected()){
		// No file Selected
		showDialogBox("<bean:message key="updeploy.check.select.ecosystem" bundle="delete" />");
	}else{
		// At least one file selected by user.
		confirmationDialog("<bean:message key="updeploy.check.ecosystem" bundle="delete" />");
	}	
 		
}
 
function showDialogBox(date2Display){
	var  dialogTitle = '<bean:message key="updeploy.ecofiles" bundle="delete" />';
	// set the content of the dialog:
    if(confDtls != null) { 
    	confDtls.attr("title",  dialogTitle);
		confDtls.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+date2Display+"</td></tr><tr><td align='center'>  <button dojoType='dijit.form.Button' type='button' onClick = 'confDtls.hide();'><bean:message key="admin.common.dialog.ok" bundle="admin"/></button> </td></td></tr></table></center>");
		confDtls.show();
    }
}

var  confDtls;

dojo.addOnLoad(function(){

	confDtls = new dijit.Dialog({
    	title: "Loading...",
    	style: "width: 300px;height:125px"
    });
     
});
</script> 

    <style type="text/css">
     #select {
        width:255px;
        height:300px;
        overflow:auto;
    }
     </style>


    <script type="text/javascript">
        dojo.require("dijit.dijit"); // optimize: load dijit layer
        dojo.require("dijit.form.MultiSelect");
    </script>


</head>     
<body onload='validateAndExtendSession()' class="tundra bodybg">
<html:form  action="unDeployEcoAction.do?csrf=${csrf}" method="POST" enctype="multipart/form-data">

<table width="101.2%"><tr><td width="100%">
<table width="100%" cellspacing="0" cellpadding="0" align="center"  border="0" >
            <tr>
                <td  class="pageTitle paddingTitle">      
                        <bean:message key="undeploy.undeployEco" bundle="undeploy"/>
                </td>
            </tr>
            <tr>
               <td class="paddingTitleDesc bodytext">
                     <strong><bean:message key="undeploy.description" bundle="undeploy"/></strong>
               </td>  
            </tr>

            <tr>
                <td style="padding-left:67px; width:500px;" height="25">
               
					   <label class="success"><b>
						   <logic:present name="fileName">
								<bean:write name="fileName"/></br>    
						   </logic:present>						  
							</b>
					   </label>
					   <label class="error"><b>
						   <logic:present name="errorMessage">
								<bean:write name="errorMessage"/>   
						   </logic:present>
							</b>
					   </label>
					    
                  
                </td>  
            </tr>
            <tr>
                <td style="width="900px">
                    <table cellspacing="0" cellpadding="0" width="100%" >
                        <tr>
                                <td style="padding-top:20px; padding-left:67px;align:left;">
                                    <table cellspacing="0" cellpadding="0" border="0" align="left">
                                        <tr>
                                            <td>
                                                    <table cellpadding="10" cellspacing="" border="0" width="100%">
                                                        <tr>
                                                             <td height="20" align="left" nowrap="nowrap" >
                                                               	<label class="label"><bean:message key="undeploy.selectFiles" bundle="undeploy"/></label>:
                                                            </td>
                                                        </tr>
                                                        <tr>    
                                                            <td align="left">
                                                                    <select id="selFile" multiple="true" name="selFile"  autocomplete="off" style="height:200px; width:400px; border:1px solid #ededed;" > 
                                                                            <logic:present name="fileList">
                                                                                <logic:notEqual name="fileList"  value="null">
                                                                                    <logic:iterate id="fileList1" name="fileList" >
                                                                            <option title='<bean:write name="fileList1" property="fileName" />' value='<bean:write name="fileList1" property="fileId" />'><bean:write name="fileList1" property="fileName" />
                                                                            </option>
                                                                                    </logic:iterate>
                                                                                </logic:notEqual>   
                                                                            </logic:present>
                                                                            <logic:notPresent name="fileList">
                                                                            <option value="-2">
                                                                                --<bean:message key="delete.nofileFound" bundle="delete"/>--
                                                                            </option>
                                                                            </logic:notPresent>
                                                                    </select>                               
                                                            </td>
                                                        </tr>       
                                                        <tr>                                        
                                                            <td><b><span id="result"></b></span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                            </td> 
                                        </tr>
                                    </table>
                                </td>   
                            </tr>
                    </table>    
                </td>
            </tr>

        <TR><td height="10px">&nbsp;</td></TR>
</table>
<table border="0" width="100%" cellspacing="0" cellpadding="0">
     <tr class="barColor">
            <td align="center"> 
                    <button dojoType="dijit.form.Button"  type="button" id="idBack" name="btnBack1" onClick="window.location= '<%=ServerUtils.getContextName(request)%>/adminMain.do'">
                    <bean:message key="undeploy.home" bundle="undeploy"/>
                    </button>
                    <button dojoType="dijit.form.Button"   <%if(!roleRightsMap.getHasDeleteAccess()) { %> disabled="true" <%}%> type="button" id="idUnDeploy" name="btnUnDeploy" onClick="checkSelectAndDeleteFiles();" >
                    <bean:message key="undeploy.undeploy" bundle="undeploy"/>
                    </button>
            </td>
    </tr>
</table>
<html:hidden name="deleteUploadForm" property="flag" value="" />   
</html:form>
</body>
</html:html>
                                            
