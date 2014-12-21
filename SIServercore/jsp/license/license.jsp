
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.LicenseUtils"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ include file="../../common/style.jsp"%>
<head>
	<title>Space-Time Insight</title>
	
	<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true">					 	</script>
	
</head>

<style type="text/css">
@import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
@import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
</style>
<link href="js/windowsjs/themes/default.css" rel="stylesheet"
    type="text/css" />
<link href="js/windowsjs/themes/alert.css" rel="stylesheet"
    type="text/css" />
<link href="js/windowsjs/themes/alert_lite.css" rel="stylesheet"
    type="text/css" />
<link href="js/windowsjs/themes/spread.css" rel="stylesheet"
    type="text/css">
</link>

<script type="text/javascript">
	function submitData(){
	        document.forms[0].submit();
			return true;		
    }
	
	function closeDialog() {
		parent.closeInfoFrame();
	}
	
</script>
	
	
	
<body class="tundra bodybg">
<script language="javascript" type="text/javascript">
	
</script>
<html:form action="/licenseInstallAction.do?csrf=${csrf}" method="post" enctype="multipart/form-data">
	<div id="machineIdentifierDiv" style="position:relative;padding-top:20px;">
    	<fieldset style="width:600px; border:1px solid #999">
        	<legend style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.machineidentification" bundle="security"/></strong></legend>
        		<table width="100%" cellpadding="0" cellspacing="10" border="0">
            		<tr>
                		<td align="right" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.identifier" bundle="security"/>:</strong></td>
                    	<td align="left"><textarea id="identifier" rows="5" cols="69"><%=LicenseUtils.generateMachineIdentifier()%></textarea></td>
                	</tr> 
                    <tr>
                    	<td colspan="2" style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#666"><b><bean:message key="license.wizard.label.descriptions" bundle="security"/>
						<a href="mailto:stisupport@spacetimeinsight.com?subject=License Required&body=Machine Identifier : <%=LicenseUtils.generateMachineIdentifier()%>%0A%0AOrganisation Name :%0A%0AType Of Use : ">stisupport@spacetimeinsight.com</a></b></td>
                    </tr> 
                 
            	</table>
        </fieldset>
	</div>
    <div id="selectLicenseCertificateDiv" style="position:relative;padding-top:20px; ">
    	<fieldset style="width:600px; border:1px solid #999">
        	<legend style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.licensecertificate" bundle="security"/></strong></legend>
        		<table cellpadding="0" cellspacing="10">
            		<tr>
                		<td align="right" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.licensefile" bundle="security"/>:</strong></td>
                    	<td align="left"><input type="file" id="filePath" name="filePath" width="300" value='<bean:write name="licenseForm" property="filePath"/>' ></td>
                	</tr> 
                    <tr>
                		<td align="right" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px">&nbsp;</td>
                    	<td align="left"><button type="submit" ><bean:message key="license.wizard.button.label.installlicense" bundle="security"/></button></td>
                	</tr> 
                    <tr>
                    	<td colspan="2" style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#666"><b><bean:message key="license.wizard.label.selectfileholdlicense" bundle="security"/></b></td>
                    </tr> 
                 
            	</table>
        </fieldset>
	</div>
     <div id="viewLicenseCertificateDiv" style="visibility:hidden;position:relative;top:20px">
    	<fieldset style="width:600px; border:1px solid #999">
        	<legend style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.licensecertificatedetails" bundle="security"/></strong></legend>
        		<table cellpadding="0" cellspacing="10" border="0">
            		<tr>
                		<td align="right" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.subject" bundle="security"/>:</strong></td>
                    	<td align="left" colspan="2"><textarea rows="2" cols="50" readonly="readonly"><bean:write name="licenseForm" property="subject"/></textarea></td>
                	</tr>
					<tr>
                		<td align="right" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.issuer" bundle="security"/>:</strong></td>
                    	<td align="left" colspan="2"><textarea rows="2" cols="50" readonly="readonly"><bean:write name="licenseForm" property="issuer"/></textarea></td>
                	</tr>
					<tr>
                		<td align="right" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.holder" bundle="security"/>:</strong></td>
                    	<td align="left" colspan="2"><textarea id ="hold" rows="2" cols="50" readonly="readonly"><bean:write name="licenseForm" property="holder"/></textarea></td>
                	</tr>
                    <tr>
                		<td align="right" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.deploymenttype" bundle="security"/>:</strong></td>
                    	<td align="left" colspan="2"><input type="text" style="width:340px" readonly="readonly" value="<bean:write name="licenseForm" property="deploymentType"/>"/></td>
                	</tr>
					<tr>
                		<td align="right" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.issued" bundle="security"/>:</strong></td>
                    	<td align="left" colspan="2"><input type="text"style="width:340px" readonly="readonly" value="<bean:write name="licenseForm" property="issued"/>" /></td>
                	</tr>
                    <tr>
                		<td align="right" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.notbefore" bundle="security"/>:</strong></td>
                    	<td align="left" colspan="2"><input type="text" style="width:340px" readonly="readonly" value="<bean:write name="licenseForm" property="notBefore"/>"/></td>
                	</tr>
                    <tr>
                		<td align="right" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px"><strong><bean:message key="license.wizard.label.notafter" bundle="security"/>:</strong></td>
                    	<td align="left" colspan="2"><input type="text" style="width:340px" readonly="readonly" value="<bean:write name="licenseForm" property="notAfter"/>" /></td>
                	</tr>
                    
					<input type="hidden" name="error" id="error" value="<html:errors bundle='security'/>"/>
               </table>
        </fieldset>
		<table align="center">
			<tr>
				<td align="center" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px;color:blue"><bean:message key="license.wizard.message.licensesuccessfull" bundle="security"/></td>
			</tr>
			<tr>
				<td align="center"><button type="button" onClick="closeDialog(); return false;"><bean:message key="license.wizard.button.label.close" bundle="security"/></button></td>
			</tr>			
		</table>
	</div>
	<div id="errorDiv" style="visibility:hidden;position:relative;padding-top:20px">
		<table align="center">
			<tr>
				<td align="center" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:12px;color:#FF0000"><html:errors bundle="security"/></td>
			</tr>			
		</table>
	</div>
	<script type="text/javascript" language="javascript">
	if(document.getElementById('hold').value != null && document.getElementById('hold').value != ""){
		document.getElementById('machineIdentifierDiv').style.display="none";
		document.getElementById('selectLicenseCertificateDiv').style.display="none";
		document.getElementById('errorDiv').style.display="none";
		document.getElementById('viewLicenseCertificateDiv').style.visibility="visible";
	}else if(document.getElementById('error').value != null && document.getElementById('error').value != ""){
		document.getElementById('viewLicenseCertificateDiv').style.display="none";
		document.getElementById('errorDiv').style.visibility="visible";
	}
	</script>
	</html:form>
</body>

