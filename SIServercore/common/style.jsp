<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.spacetimeinsight.preferences.PreferenceHelper"%>
<%@page import="org.owasp.esapi.ESAPI"%>

<%
    String appTheme=PreferenceHelper.getUserTheme((UserBean) request.getSession().getAttribute(ServerUtils.USER_BEAN_NAME));
	if (appTheme == null || appTheme.equals("null")) {
        appTheme = "default";
    }
%>
<link href="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/themes/<%=ESAPI.encoder().encodeForHTML(appTheme) %>/style.css" rel="stylesheet" type="text/css" />