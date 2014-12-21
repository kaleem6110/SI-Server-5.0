<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.enterprisehorizons.magma.server.util.ArtifactUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<html:html locale="true">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<%
    String apptheme = AdminConfigUtils.getApplicationTheme();
    if (apptheme == null || apptheme.equals("null")) {
        apptheme = "default";
    }
%>
<%@ include file="/common/style.jsp"%>
<%
	String ecoexpml = request.getParameter("ecoexpml");
	String ecosid = request.getParameter("ecosid");
	String artifactName = request.getParameter("artifactName");
	String dashboardId = request.getParameter("dashboardId");
	String dashboardName = request.getParameter("dashboardName");
%>
<script type="text/javascript">
	var helpContent = "<%=ArtifactUtils.getDashboardHelp(ecosid,artifactName,dashboardId)%>";
	function showContent(){
		if(helpContent=='null' || helpContent==''){
            helpContent ="<table><tr><td><b><bean:message key="dashboard.unavailable.help" bundle="admin"/></b></td></tr></table>";
		}
		if(helpContent.toLowerCase().indexOf("http")==0){
            window.location = helpContent;
		}else{
			document.getElementById('helpBox').innerHTML= helpContent;
		}
		
	}

</script>
<title><%=ESAPI.encoder().encodeForHTML(dashboardName)%>--<bean:message key="dashboard.title.help" bundle="admin"/></title>
</head>
<body class="bodybg bodyText">
	<table width = "100%" cellpadding="0" cellspacing = "0">
		<tr>
			<td>
				<table width = "100%" cellpadding="0" cellspacing = "0">
					<tr>
						<td width="100%">
							<% if(apptheme.equals("blue"))
							   {
								  out.print("<table height=\"55\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"bgTiling\">");
							   } else
							   {
								  out.print("<table height=\"55\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"bgHeaderImage\">");
							   }
							%>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td class="bodytext" height="100%" width="100%">
				<div id="helpBox" style="width:auto; height:auto; padding-top:10px; padding-left:10px; padding-right:10px;"></div>
			</td>
		</tr>
	</table>
</body>
<script>
	showContent();
</script>
</html:html>