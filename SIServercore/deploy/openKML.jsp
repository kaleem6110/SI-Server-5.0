<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%
  String kmlFile = request.getParameter("KMLFile");
  String layerName = request.getParameter("layername");
  if(layerName == null) {
	  layerName = "";
  }
%>
<%@ include file="/common/style.jsp"%>
<html>
<head>
<title>MAGMA - Run KML</title>
<script>
function loadPage(){
    window.location = "<%=ESAPI.encoder().encodeForHTML(kmlFile)%>";
}
</script>
</head>
<body class="bodybg bodyText" onload="loadPage()">
<br/><br/><br/>
<h2><bean:message key='admin.kml.loading' bundle='admin'/>&nbsp;<i><%=ESAPI.encoder().encodeForHTML(layerName)%>.ecosystem</i></h2>
</body>
</html>