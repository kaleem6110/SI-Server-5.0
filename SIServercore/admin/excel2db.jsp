<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<jsp:include page="../common/header.jsp">
	<jsp:param name="title" value="Excel2DB" />
</jsp:include>
<jsp:include page="../common/message.jsp"/>

<%
	String dbModelName = request.getParameter("dbModelName");
%>
<script language="javascript">

	function checkIfExcel() {
	  var ext = document.frm.filePath.value;
	  ext = ext.substring(ext.length-3,ext.length);
	  ext = ext.toLowerCase();
	  if(ext != 'xls') {
	    alert(ext+"<bean:message key='dbcofig.check.phone' bundle='admin'/>");
	    return false; 
	  } else {
		return true; 
	  }		
	}

</script>

<form name="frm" method="post" action="processmaintaindata.jsp" enctype="multipart/form-data" onsubmit="return checkIfExcel();">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">
	<table width="100%" border="0" cellpadding="2" cellspacing="2">
			<tr valign="top">
			<td> <br><bean:message key='excel2db.header' bundle='admin'/>
			</td>
			<td> <br><%=ESAPI.encoder().encodeForHTML(dbModelName)%>
			</td>
		</tr>
		<tr valign="top">
			<td><bean:message key='excel2db.file.select' bundle='admin'/></td>
			<td><input type="file" name="filePath" autocomplete="off">
			</td>
		</tr>	
	</table>
<jsp:include page="../common/buttons_submit.jsp"/>

<input type="hidden" name="dbModelName" value="<%=ESAPI.encoder().encodeForHTML(dbModelName)%>"/>
<input type="hidden" name="operation" value="export"/>

</form>
<jsp:include page="../common/adminnavigation.jsp"/>
<jsp:include page="../common/footer.jsp"/>
