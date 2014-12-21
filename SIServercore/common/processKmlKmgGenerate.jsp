<%@page import="com.enterprisehorizons.util.Logger"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.EcosystemUtils"%>
<%@page import="com.enterprisehorizons.util.StringUtils"%>


<%
    boolean flag = false;
    String errorMessage = null;
    String radioBtnValue = null;
    String ecoFileName = null;
    String kmlParams = null;
    String[] kmlArray = null;
    StringBuffer buff = null;
    String paramStr = null;
    try {
        radioBtnValue = request.getParameter("btnKMLKMZRadio");
        ecoFileName = request.getParameter("cmbKmlKmz");
        kmlParams = request.getParameter("kmlParams");
        ServerUtils.initializeBaseUrls(request , getServletContext());
        if(!StringUtils.isNull(kmlParams)){
            kmlArray = StringUtils.split(kmlParams , ";");
            buff = new StringBuffer();

            for(int i = 0; i < kmlArray.length; i++) {
                buff.append("&");
                buff.append(kmlArray[i]);
            }
        }
        if(!StringUtils.isNull(buff)){
            paramStr = buff.toString();
        }
        EcosystemUtils.renderEcosystem(ecoFileName, null, null, radioBtnValue , paramStr);
        flag = true;
    } catch(Exception e) {
        Logger.error("Error occurred while Generating KML / KMZ ", "processKmlKmgGenerate.jsp", e);
        errorMessage = e.getLocalizedMessage();
    }
    
    response.sendRedirect("generateKmlKmzFile.jsp?success="+flag +"&errorMessage" + errorMessage);
%>