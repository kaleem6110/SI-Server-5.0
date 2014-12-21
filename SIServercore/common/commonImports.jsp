<%@page import="com.spacetimeinsight.security.bean.JAASAuthenticationTypeInitializer"%>
<%@page import="com.spacetimeinsight.security.bean.JAASConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%
	String protocol = (request.isSecure() || JAASAuthenticationTypeInitializer.getInstance().isSSO())?"https":"http";
	String contextName = ServerUtils.getContextName(request);
	String serverUrl = ServerUtils.getServerContextBaseUrl(request);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF8">
<!--  Kendo UI Framework -->
<link href="<%=contextName%>/lib/kendo/css/kendo.common.min.css" rel="stylesheet" type="text/css" />
<link href="<%=contextName%>/lib/kendo/css/kendo.default.min.css" rel="stylesheet" type="text/css" />
<link href="<%=contextName%>/lib/jquery/css/jquery-ui.css" rel="stylesheet" type="text/css" />
<script src="<%=contextName%>/lib/jquery/js/jquery.min.js"></script>
<script src="<%=contextName%>/lib/kendo/js/kendo.all.min.js" ></script>
<script src="<%=contextName%>/lib/jquery/js/jquery-ui.js"></script>
<script src="<%=contextName%>/lib/jquery/js/jquery.js"></script>
</head> 