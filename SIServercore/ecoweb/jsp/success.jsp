<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>   
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>
     
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
</head>
<body> 
parent.document.getElementById("uploadFileStatus").innerHTML = '<%=session.getAttribute("fileStatus")%>';
parent.popTextArea('<%=session.getAttribute("fileStatus")%>');
<%System.out.println("session.getAttribute(fileStatus)" + session.getAttribute("fileStatus")); 
%>


</script>   
</body>
</html>