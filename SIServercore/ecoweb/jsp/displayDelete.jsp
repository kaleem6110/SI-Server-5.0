<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@ page import="com.enterprisehorizons.magma.ecoweb.multifileupload.bean.FileDetailBean,java.util.ArrayList" %>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%
       // ArrayList fileList = (ArrayList) request.getAttribute("fileList");
       
%>
<html:html locale="true">
<head>
<%@ include file="/common/dojo.jsp" %>

<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<title><bean:message key="delete.title" bundle="delete"/></title>

 <script>
function changeBtnState()
{
    var selectObj =  document.getElementById("selFile");   
    var deleteObj = dijit.byId('idDelete');

    if(selectObj[0].value == -2)
    {
        deleteObj.setAttribute('disabled', true);
    }
    else
    {
        deleteObj.setAttribute('disabled', false);
    }
}


var confirmVal ;	

function dodelete(){
	document.forms[0].flag.value = "Delete";
	confDtls.hide();
	document.forms[0].submit();   
}    

function changeBtnState()
{
	var selectObj =  document.getElementById("selFile");   
	var deleteObj = dijit.byId('idDelete');

	if(selectObj[0].value == -2)
	{
		deleteObj.setAttribute('disabled', true);
	}
	else
	{
		deleteObj.setAttribute('disabled', false);
	}
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
		showDialogBox("<bean:message key='delete.check.file.select' bundle='delete'/>");
	}else{
		// At least one file selected by user. So allow to delete files.
		confirmationDialog("<bean:message key='delete.file.confirmation' bundle='delete'/>");
	}	
}
 
function showDialogBox(date2Display){
	var  dialogTitle = '<bean:message key="delete.upload.files" bundle="delete"/>';
	// set the content of the dialog:
    if(confDtls != null){ 
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
<body onLoad='' class="tundra bodybg">
<html:form  action="deleteFileAction" method="POST" enctype="multipart/form-data">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">

<table width="101.2%"><tr><td width="100%">
<table width="101.2%" cellspacing="0" cellpadding="0" align="center"  border="0" >
            <tr>
                <td  class="pageTitle paddingTitle">      
                        <bean:message key="delete.deleteFiles" bundle="delete"/>
                </td>
            </tr>
            <tr>
               <td class="paddingTitleDesc bodytext">
                    <strong><bean:message key="delete.description" bundle="delete"/></strong>
               </td>  
            </tr>
          <tr><td>&nbsp;</td></tr>
            <tr>
                <td style="padding-left:67px; width:500px;">
                   <div style="display:block" style="" style="width: 500px; height: 25px; overflow-y: auto;     scrollbar-arrow-color:blue; scrollbar-face-color: #e7e7e7; scrollbar-3dlight-color: #a0a0a0; scrollbar-darkshadow-color:#888888" >
                   <label class="success"><b>
                       <logic:present name="fileName">
                            <bean:write name="fileName"/>   
                       </logic:present>
                        </b>
                       </label>
					    <span id="ctl00_mainbody_lblError" class="error"><html:errors bundle="delete"/></span><br/>
                    </div>   					    
                </td>  
            </tr>
            <tr>
                <td style="padding-top:30px;padding-left:30px;width="900px">
                    <table cellspacing="0" cellpadding="0" width="100%" >
                        <tr>
                                <td style="padding-left:30px;align:left;">
                                    <table cellspacing="0" cellpadding="0" border="0" align="left">
                                        <tr>
                                            <td>
                                                    <table cellpadding="10" cellspacing="" border="0" width="100%">
                                                        <tr>
                                                             <td height="27" align="right"  style="width:85px;" nowrap="nowrap" >
                                                                    <label class="label"><bean:message key="delete.selectFiles" bundle="delete"/></label>:
                                                            </td>
                                                            <td style="padding-left:10px; align:left;" width="90px">
                                                                            <select id="selFile" multiple="true" name="selFile" autocomplete="off"    style="height:100px; width:180px; border:5px solid #ededed;"> 
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
<tr><td width="100%">

<table border="0" width="101.2%" id="" cellspacing="0" cellpadding="0">
     <tr class="barColor">
            <td colspan="7"  align="left" style="padding-left:216px;"> 
                    <button dojoType="dijit.form.Button"  type="button" id="idBack" name="btnBack1" onClick="window.location= '<%=ServerUtils.getContextName(request)%>/adminMain.do' "><bean:message key="delete.home" bundle="delete"/></button>

                    <button dojoType="dijit.form.Button"  type="button" id="idDelete" name="btnDelete1" onClick="checkSelectAndDeleteFiles();" ><bean:message key="delete.delete" bundle="delete"/></button>                    </td>
    </tr>
</table>
</td>
</tr></table>
<html:hidden name="deleteUploadForm" property="flag" value="" />   
</html:form>
</body>
</html:html>