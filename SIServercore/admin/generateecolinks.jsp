<%@page import="com.enterprisehorizons.magma.server.util.EcosystemLinkSimulator"%>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%
    String noOfLinks = request.getParameter("noofsessions");
    int count = StringUtils.getInt(noOfLinks);
    if(count <= 0) {
        count = 1;
    }
    
    String opFilePath =  request.getParameter("opfilepath");
    if(StringUtils.isNull(opFilePath)) {
        opFilePath = "c:/temp/ecosystemlinks_"+((int)(Math.random()*1000))+".xls";
    }
    
    String serverUrl = request.getParameter("serverurl");
    if(StringUtils.isNull(serverUrl)) {
        serverUrl = ServerUtils.getServerContextBaseUrl(request);
    }

    String ecoexpml = request.getParameter("ecoexpml");
    if(StringUtils.isNull(ecoexpml)) {
        out.write("ecoexpml parameter is not found");
        return;
    } else {
        EcosystemLinkSimulator.writeToExcel(serverUrl, count, ecoexpml, opFilePath);
    }
    
    out.write("The file ["+ESAPI.encoder().encodeForHTML(opFilePath)+"] has been generated with the links");
%>