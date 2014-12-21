<%@page import="com.enterprisehorizons.magma.server.admin.Shp2DBMappingUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<html>
<head>

<%@ include file="/common/dojo.jsp" %>

<%      
        String[] mappedFiles = Shp2DBMappingUtils.getMappedShapeFiles();
        int noOfMappedFiles = mappedFiles == null ? 0 : mappedFiles.length;
%>


<style>
        body .txtareamedium {
            width: 25em;
            height: 5em;
        }

</style>

<title><bean:message key="shpDbMap.shpDbMap" bundle="shpDbMap"/> </title>

<link href="../css/style.css" rel="stylesheet" type="text/css" />

<script type="text/JavaScript">

	
    function submitForm(btn) {
        var id = btn.id;
		var flag = "";
		try{
        if(id == "Add") {
			
			if(frm.cmbMappedDefinitions != null && dijit.byId('cmbMappedDefinitions').value != ''){
				showEmptyDialog("<bean:message key='shpDbMap.files.select' bundle='shpDbMap'/>","<bean:message key='admin.common.alert.title' bundle='admin'/>");
				return false;
			}
			frm.action = "<%=ServerUtils.getContextName(request)%>/shp2DBMappingAddSelect.do";
        } else {
            if(dijit.byId('cmbMappedDefinitions') != null && frm.cmbMappedDefinitions.selectedIndex == 0) {
                showEmptyDialog("<bean:message key='shpDbMap.list.select' bundle='shpDbMap'/>","<bean:message key='admin.common.alert.title' bundle='admin' />");
                return false;
            } else {
                //set the shapefilename
                if(dijit.byId('cmbMappedDefinitions') != null)
					frm.shapeFileName.value = frm.cmbMappedDefinitions.value;
                 if(id == "View") {
					 
				 if(dijit.byId('cmbMappedDefinitions') != null && dijit.byId('cmbMappedDefinitions').value != ''){
                    frm.action = "<%=ServerUtils.getContextName(request)%>/shp2DBMappingView.do";
					 frm.submit();
			       }
                   else{
			        showEmptyDialog("<bean:message key='shpDbMap.check.correct.value' bundle='shpDbMap'/>","<bean:message key='admin.common.alert.title' bundle='admin'/>");
                    return false;
				   }

                } else if(id == "Update") {
					if(dijit.byId('cmbMappedDefinitions') != null && dijit.byId('cmbMappedDefinitions').value != ''){
						if(!validateShapeFiles()){
							showEmptyDialog('<bean:message key='shpDbMap.supportfiles.missing' bundle='shpDbMap'/>',"<bean:message key='admin.common.alert.title' bundle='admin'/>");
							return false;
						}
						 frm.action = "<%=ServerUtils.getContextName(request)%>/shp2DBMappingUpdate.do";
						  frm.submit();
					}
					else{
                         showEmptyDialog("<bean:message key='shpDbMap.check.correct.value' bundle='shpDbMap'/>","<bean:message key='admin.common.alert.title' bundle='admin'/>");
                         return false;
					}

                   
                } else {
                    if(dijit.byId('cmbMappedDefinitions') != null && dijit.byId('cmbMappedDefinitions').value != ''){
                    	var agree=openConfirmDialog("<bean:message key='shpDbMap.delete.confirm' bundle='shpDbMap'/>", "<bean:message key='admin.delete.title' bundle='admin'/>");
                    	if (agree){
                    		frm.operation.value = "delete";
                    		frm.action = "<%=ServerUtils.getContextName(request)%>/shptodb.do";
                    	}
                    	else{
                    		return false ;
                    	}
					}
					else{
						showEmptyDialog("<bean:message key='shpDbMap.check.correct.value' bundle='shpDbMap'/>","<bean:message key='admin.common.alert.title' bundle='admin'/>");
						return false;
					}
                    
                }
            }
        }
        frm.submit();
		}catch(er){
	}
    }
    


function dodelete(){
if(dijit.byId('cmbMappedDefinitions') != null && dijit.byId('cmbMappedDefinitions').value != ''){  
	       frm.shapeFileName.value = dijit.byId('cmbMappedDefinitions').value;

	frm.operation.value = "delete";
	frm.action = "<%=ServerUtils.getContextName(request)%>/shptodb.do";   
	frm.submit();
}
else{
	 confDtls.hide();
	showEmptyDialog("<bean:message key='shpDbMap.check.correct.value' bundle='shpDbMap'/>","<bean:message key='admin.common.alert.title' bundle='admin'/>");
    return false;
}
}

var invalidShapeFileArray = new Array(); 
    function goToDBHomePage(){
            window.location = "<%=ServerUtils.getContextName(request)%>/adminMain.do";
    }

</script>
</head>

<body class="tundra bodybg">



<form name="frm" method="post" action="<%=ServerUtils.getContextName(request)%>/shp2DBMappingAddSelect.do">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">

<table width="101.2%" cellspacing="0" cellpadding="0" align="center" border="0" >

	<tr>
		<td class = "pageTitle paddingTitle">
		<bean:message key="shpDbMap.shpDbMap" bundle="shpDbMap"/>
		</td>
	</tr>		  

	<tr>
		<td class = "pageTitle paddingTitleDesc">
		<bean:message key="shpDbMap.shpDbMapDescription" bundle="shpDbMap"/>
		</td>
	</tr>		  

	<tr>

		<td style = "padding-left:67px;">
			<label class = "success">
				<html:messages id="saveStatus" message="true" bundle="shptoDb">
					<logic:present name="saveStatus"> <bean:write name="saveStatus" />    
					</logic:present>
				</html:messages>
			</label>

			<label class = "error">
				<html:errors bundle="shptoDb"/>
			</label>


		</td>

	</tr>
	
	<tr>
		<td>&nbsp;</td>
	</tr>

	<tr>
	
		<%
	    if(noOfMappedFiles == 0) { 
        %>

			<table id= "noMappingFiles">
				<tr>
					<td style = "padding-left: 67px;padding-top: 20px;"><label class = "label"><bean:message key="shpDbMap.nomapdefexist" bundle="shpDbMap"/></label>
				    </td>
				</tr>
			</table>

		<%
        } else { 
        %>
			<table id= "mappingFiles">
			<tr>
				<td style = "padding-left: 67px;padding-top: 20px;"> 
					<label class="label"><bean:message key="shpDbMap.mapdefinition" bundle="shpDbMap"/>:</label>
				</td>
			
	            <td style = "padding-left: 10px;padding-top: 20px;">  

			        <select id = "cmbMappedDefinitions" name="cmbMappedDefinitions" dojoType="dijit.form.FilteringSelect" autocomplete="off">
			    
					<option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>

					<%
						for(int i = 0; i < noOfMappedFiles; i++) {
					%>  
						<option value="<%=ESAPI.encoder().encodeForHTML(mappedFiles[i])%>"><%=ESAPI.encoder().encodeForHTML(mappedFiles[i])%></option>
						<%	if(!Shp2DBMappingUtils.isSupportedShapeFilesPresent(mappedFiles[i])){
								%>	
									<script>
										invalidShapeFileArray[<%=i%>] = '<%=ESAPI.encoder().encodeForHTML(mappedFiles[i]) %>';
									</script>	
						<%		
							}
						%>	
					<%
						}
			        %> 

					</select>

				</td>
			</table>
		<%
		}
		%>

	</tr>
		
</table>

<table width="101.2%">
	<tr>
		<td>&nbsp;</td>
    </tr>

	<tr>
		<td>
			<jsp:include page="../common/buttons_shp2dbmappinghome.jsp"/>
        </td>
	</tr>
</table>

    <input type="hidden" name="shapeFileName"/>
    <input type="hidden" name="operation"/>

</form>
<script>
dojo.addOnLoad(addSel);
function addSel(){if(dijit.byId('cmbMappedDefinitions') != null){
	dijit.byId('cmbMappedDefinitions').setValue('');
	}
}
function validateShapeFiles(){
	var i=0;
	for(i=0;i<invalidShapeFileArray.length;i++){
		if(document.getElementById('cmbMappedDefinitions').value == invalidShapeFileArray[i]){
			return false;
		}
	}

	return true;
	
}
</script>
</body>
</html>