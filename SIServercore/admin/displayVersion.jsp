<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ include file="/common/liferay.jsp" %>
<html:html locale="true">

	<title>Version</title>

	<link href="css/style.css" rel="stylesheet" type="text/css" />

<form name="frmCache" method="post" action="">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">

<table width="50%" border="0" cellpadding="2" align='center' cellspacing="2">
<tr valign="top">
	<td>&nbsp;</td>
</tr>
	<tr valign="top">
	<td>&nbsp;</td>
</tr>
<tr>
 <td>
	<fieldset>
			<legend class="bigtext"><strong>Version</strong></legend>

		<table width="80%" border="0" cellpadding="2" align='center' cellspacing="2">

			<tr valign="top">
				<td><br>You are currently running Version Number:
				</td>
				<td><br>&nbsp;
				</td>
			</tr>
			<tr valign="top">
				<td><bean:message key="version"/>
				</td>
				<td align="center">
				</td>
			</tr>
			<tr><td>&nbsp;</td><td>&nbsp;</td></tr>
			<tr><td></td><td align="right">&nbsp;&nbsp;&nbsp</td></tr>
		</table>
		</fieldset>
</td></tr>
</table>
</form>
</html:html>