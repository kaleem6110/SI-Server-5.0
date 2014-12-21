<%@page import="com.enterprisehorizons.magma.server.admin.Shp2DBMappingUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>

<%   
	String[][] dbModels = null;
	String[] shapeFiles = null;
	try{
        dbModels = Shp2DBMappingUtils.getShape2DBModels();
        shapeFiles = Shp2DBMappingUtils.getUnMappedShapeFiles();
	}catch(Exception e){

	}

%>
<html>
<head>
<!-- Importing the Styles -->
<jsp:include page="/common/charsetmeta.jsp"/>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/sessionTimeOut.js"></script>
<%@ include file="/common/style.jsp"%>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true"></script>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dijit/form/_testCommon.js"></script>

<script type="text/javascript">
         dojo.require("dojo.parser");
         dojo.require("dijit.form.Form");
         dojo.require("dijit.form.Button");
         dojo.require("dijit.form.ComboBox");
         dojo.require("dijit.form.FilteringSelect");
		 dojo.require("dijit.Dialog");
</script>

<style>
    @import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
	@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
	@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra_rtl.css";
	@import "<%=ServerUtils.getContextName(request)%>/js/dijit/tests/css/dijitTests.css";
	@import "<%=ServerUtils.getContextName(request)%>/js/dojox/form/resources/FileInput.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/dijit.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/dijit_rtl.css";
  
  

        body .txtareamedium {
            width: 25em;
            height: 5em;
        }

</style>
<script type="text/javascript" src="js/windows.js"></script>
<title><bean:message key="shpDbMap.shpToDataMapAdd" bundle="shpDbMap"/> </title>


<script type="text/JavaScript">
var invalidShapeFileArray = new Array(); 
    function goToDBHomePage(){
            window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
    }
</script>

</head>

<body class="tundra bodybg">

<form name="frmShp2DBMapping" method="post" action="<%=ServerUtils.getContextName(request)%>/shp2DBMappingAdd.do">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">

<table id = "headingTbl" width="101.2%" cellspacing="0" cellpadding="0">
	
	<tr>
	
		<td class = "pageTitle paddingTitle">    
			<bean:message key="shpDbMap.shpToDataMapAdd" bundle="shpDbMap"/>
		</td>

	</tr>

	<tr>
	
		<td class = "pageTitle paddingTitleDesc">    
			<bean:message key="shpDbMap.shpToDataMapAddDescription" bundle="shpDbMap"/>
		</td>

	</tr>

	<tr>

		<label class="success">
	    <html:messages id="msg" message="true" ><bean:write name="msg"/></html:messages>
		</label>
		

		<td>&nbsp;
			<jsp:include page="../common/message.jsp"/>
		</td>

    </tr>

</table>

<table id = "selectionPanel"  style = "padding-left : 67px;" width="40%" cellspacing="0" cellpadding="0" border = "0">

	<tr>

		<td align = "right" width = "25%" style = "padding-left : 67px;padding-top:20px;padding-right:10px;">
			<label class="label"><bean:message key="shpDbMap.addLabel" bundle="shpDbMap"/></label>&nbsp;<label class="error">*</label><label class="label">:</label>
						
		</td>

		<td align = "left" style = "padding-top:20px;">
							<select name="cmbDBModels" id="cmbDBModels" dojoType="dijit.form.FilteringSelect" autocomplete="off">
						    <option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
							<%
								int noOfModels = ( ( dbModels == null ) ? ( 0 ) : ( dbModels.length ) );
								for(int i = 0; i < noOfModels; i++) {
		                        %>  
				                    <option value="<%=dbModels[i][1]%>"><%=dbModels[i][0]%></option>
					            <%
						        }
								%>          
							</select>
		</td>
	</tr>

	<tr>
		<td align = "right"  width = "30%" style = "padding-left : 67px;padding-top:10px;padding-right:10px;"> 
			<label class="label">
			<bean:message key="shpDbMap.shapeFile" bundle="shpDbMap"/></label><label class="error">&nbsp;*</label><label class="label">:</label>
		</td>

		<td style = "padding-top:10px;">
	
							<select name="cmbShapeFile" id="cmbShapeFile" dojoType="dijit.form.FilteringSelect" autocomplete="off">
								<option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
								<%
									int noOfShapeFiles = shapeFiles == null ? 0 : shapeFiles.length;
					                for(int i = 0; i < noOfShapeFiles; i++) {
						        %>  
									<option value="<%=shapeFiles[i]%>"><%=shapeFiles[i]%></option>
								<%	if(!Shp2DBMappingUtils.isSupportedShapeFilesPresent(shapeFiles[i])){
								%>	
									<script>
										invalidShapeFileArray[<%=i%>] = '<%=shapeFiles[i] %>';
									</script>	
								<%		
									}
								%>	
				                <%
						        }%>

								<%if(noOfShapeFiles == 0){%>
			                        <option value=""><bean:message key="shpDbMap.shapeFileNotExist" bundle="shpDbMap"/></option>
								<%}
							    %>    
							</select>
		</td>
	</tr>

	<tr>
		<td>&nbsp;
			
		</td>
	</tr>


</table>

<table id = "buttonPanel" width="101.2%" height="30" colspan="2" class="barColor">
	
	<tr>

		<td  align = "center">	 
			<button dojoType="dijit.form.Button"  type="button" onClick="window.location ='<%=ServerUtils.getContextName(request)%>/adminMain.do'"><bean:message key="shpDbMap.home" bundle="shpDbMap"/> </button>

            <button dojoType="dijit.form.Button"  type="button" onClick="window.location= '<%=ServerUtils.getContextName(request)%>/shapedbMapping.do'"><bean:message key="shpDbMap.back" bundle="shpDbMap"/> </button>

            <button dojoType="dijit.form.Button"  id="idSubmit" name="idSubmit" type="button"  onclick="return performSubmit();"> <bean:message key="shpDbMap.submit" bundle="shpDbMap"/>  </button>

            <button dojoType="dijit.form.Button"  id="idSReset" name="idSReset" type="reset" onClick="performReset();"/> <bean:message key="shpDbMap.reset" bundle="shpDbMap"/> </button>

        </td>

    </tr>
	
</table>




</form>

</body>

</html>

<script>

	
	
function performSubmit(){
	
if(dijit.byId('cmbDBModels').getValue() != '' && dijit.byId('cmbShapeFile').getValue() != ''){
	if(!validateShapeFiles()){
		promptDlg = new dijit.Dialog({
            title: "<bean:message key='admin.common.dialog.loading' bundle='admin'/>",
              style: "width: 300px;height:125px"
        }); 
	   if(promptDlg != null) {         
          promptDlg.attr("title",  "Alert");
          promptDlg.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+"Supported files are missing"+"</td></tr><tr><td align='center'>    <button dojoType=dijit.form.Button type='submit'>OK</button></td></td></tr></table></center>");
            promptDlg.show();
        }
		return false;
	}
	    document.forms[0].submit();
}
else{
	 promptDlg = new dijit.Dialog({
            title: "<bean:message key='admin.common.dialog.loading' bundle='admin'/>",
              style: "width: 300px;height:125px"
        }); 
	   if(promptDlg != null) {         
          promptDlg.attr("title",  "<bean:message key='admin.common.alert.title' bundle='admin'/>");
          promptDlg.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+"<bean:message key='shpDbMap.value.select' bundle='shpDbMap'/>"+"</td></tr><tr><td align='center'>    <button dojoType=dijit.form.Button type='submit'><bean:message key='admin.common.dialog.ok' bundle='admin'/></button></td></td></tr></table></center>");
            promptDlg.show();
        }
return false;
}
}
function performReset(){
setTimeout(function(){
dijit.byId('cmbShapeFile').reset();
dijit.byId('cmbDBModels').reset();
},300);
}



function validateShapeFiles(){
	var i=0;
	for(i=0;i<invalidShapeFileArray.length;i++){
		if(document.getElementById('cmbShapeFile').value == invalidShapeFileArray[i]){
			return false;
		}
	}

	return true;
	
}
    dojo.addOnLoad(addSel);
function addSel(){
    dijit.byId('cmbDBModels').setValue('');
    dijit.byId('cmbShapeFile').setValue('');
}
</script>