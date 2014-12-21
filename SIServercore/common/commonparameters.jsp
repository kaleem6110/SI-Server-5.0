<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ page import="com.enterprisehorizons.util.StringUtils,com.enterprisehorizons.magma.server.util.ServerUtils" %>
<%@ page import="org.owasp.esapi.ESAPI" %>

<%

pageContext.setAttribute("componentjsp", request.getParameter("component"));
pageContext.setAttribute("parameterValue", request.getParameter("parameterValue"));

pageContext.setAttribute("status", request.getParameter("status"));

 
%>
<script type="text/javascript" src="js/commonparameter.js" valign="top">

</script>
<td>
<table width="100%" cellspacing="0" cellpadding="0"  border="0">
</tr>	
	<%if(!StringUtils.isNull(request.getParameter("parameterValue")) || !"true".equals(request.getParameter("status"))){%>
		<td  class="label" style="padding-top:0px; padding-left:8px;" align="left"><bean:message key="common.parameters" bundle="admin"/>&nbsp; </strong></td>
			<%if(!StringUtils.isNull(request.getParameter("status")) && !"true".equalsIgnoreCase(request.getParameter("status"))){%>
		<td  style="padding-top:0px; padding-left:13px;" align="right"><strong><span id='parameterminimizeLabel<bean:write name="componentjsp"/>' onClick='addhide("<bean:write name="componentjsp"/>")' style="display:none; cursor:pointer" ><u><bean:message key="datasource.minimizepanel" bundle="ds" /></u> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/downarrow.gif" width="7" height="11" align="absmiddle" /></span> <span id='parametermaximizeLabel<bean:write name="componentjsp"/>' onClick='addshow("<bean:write name="componentjsp"/>","false")' style="cursor:pointer"><u><bean:message key="datasource.maximizepanel" bundle="ds" /></u> <img src="<%=ServerUtils.getContextName(request)%>/images/portal/uparrow.gif" width="7" height="11" align="absmiddle" /> </span></strong></td>
		<%}}%>
</tr>



<tr>
<td colspan="2">&nbsp; </td>
</tr>
	 <tr><td align="left" colspan="2">
	  <table id='parameterDtls<bean:write name="componentjsp"/>' style="display: none;" border="0">
   <tr valign="bottom">
   <td colspan="2"><table  border="0" width="100%" ><tr><td style="padding-top:0px; padding-left:0x;" width="45%" align="center"> <strong><bean:message key="common.parameter" bundle="admin"/></strong></td>
   <td style="padding-top:0px; padding-left:0x;" align="center"> 
   <strong><bean:message key="common.value" bundle="admin"/></strong></td></table></td></tr>

	<tr>
	<td  align="left">

      <table width="100%" cellspacing="0" cellpadding="0"  id='parameterTable<bean:write name="componentjsp"/>' border="0" style="display: none;">
	 <tr><td style="padding-left:10px;align:left;"></td></tr>

	  
	  </table>

</td>
</tr>

</table>
</td>
</tr>
</table>

<input type="hidden" name='<bean:write name="componentjsp"/>parametercount' id='<bean:write name="componentjsp"/>parametercount' value="" />
<input type="hidden" name='<bean:write name="componentjsp"/>parametervalue' id='<bean:write name="componentjsp"/>parametervalue'
value='<bean:write name="parameterValue"/>' />

<input type="hidden" name='<bean:write name="componentjsp"/>status' id='<bean:write name="componentjsp"/>status' value='<bean:write name="status"/>' />






		<script>
		dojo.addOnLoad(null, function(){addParameterRow("<bean:write name="componentjsp"/>",true); });

<%if(!StringUtils.isNull(request.getParameter("parameterValue"))){%>
   addshow("<bean:write name="componentjsp"/>","<%=ESAPI.encoder().encodeForHTML(request.getParameter("status"))%>");
	
<%}%>
var CONTEXT_NAME ="<%=ServerUtils.getContextName(request)%>";
		</script>

	