<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@ page import="org.owasp.esapi.ESAPI" %>  
<%
    String isSuccessStr = request.getParameter("success");
    if(isSuccessStr != null) {
        boolean flag = StringUtils.getBoolean(isSuccessStr);
        String errorMessage = request.getParameter("errorMessage");
%>
<%
    if(flag) {
%>
        <label class="success">The request was processed successfully</label>
<%
    } else {
%>
        <label class="error">Error occurred while processing the request (<%=ESAPI.encoder().encodeForHTML(errorMessage)%>)</label> 
<%
    }
%>


<%
    }
%>
