<%@ taglib uri="/tags/struts-bean" prefix="bean" %>
<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.CommonConfigUtils" %>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils,com.spacetimeinsight.stas.config.*"%>
<%@page import="org.owasp.esapi.ESAPI"%>

<%
    String serverUrl = ServerUtils.getServerContextBaseUrl(request);
    String editMode = request.getParameter("editMode");
    String swfName = request.getParameter("swf");
    String appTheme = AdminConfigUtils.getApplicationTheme();
    if (appTheme == null || appTheme.equals("null")) {
        appTheme = "default";
    }

%>
<jsp:include page="/common/commonheader.jsp"/>
<html lang="en">


<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/flash_detect.js"></script>
<script type="text/javascript"> 
	if(!FlashDetect.installed || !FlashDetect.versionAtLeast(10)){
        parent.flashRequired("<bean:message key="flash.required" bundle="admin" />","<bean:message key="flash.url" bundle="admin" />");       
    }
</script>
<!-- <script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/swfobject.js"></script> -->



<style>
body { margin: 0px; overflow:hidden; bgcolor:#000000; width:100%; height:100%}
</style>
</head>

<body scroll="no">
<script language="JavaScript" type="text/javascript">


/*function createGEFrameObject(){
	var flashvars = {};
	var params = {serverUrl: "<%=ESAPI.encoder().encodeForHTML(serverUrl)%>",
				coreServerUrl: <%=ESAPI.encoder().encodeForHTML(serverUrl)%>",
				adminServerUrl: <%=ESAPI.encoder().encodeForHTML(serverUrl)%>",
				editMode: <%=ESAPI.encoder().encodeForHTML(editMode)%>,
				theme: "<%=ESAPI.encoder().encodeForHTML(appTheme)%>",
				wmode:"transparent"
				};
   var attributes = {
	id: "swfLoader",
	name: "swfLoader",
	style: "z-index:1;border: 1px solid silver; height: 100%; width: 100%; position:absolute; left:0px;top:0px;",
	wmode:"transparent"
   };
   

    var swfLocationUrl = "<%=ESAPI.encoder().encodeForHTML(serverUrl)%><%=ESAPI.encoder().encodeForHTML(swfName)%>";
    swfobject.embedSWF(swfLocationUrl, "swfLocationDivId", "100%", "100%", "9.0.0",flashvars, params, attributes);
}
createGEFrameObject();
*/
</script>


<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="swfLoader">
	<param name="id" value="swfLoader" />
	<param name="name" value="swfLoader" />
	<param name="style" value="z-index:1;border: 1px solid silver; height: 100%; width: 100%; position:absolute; left:0px;top:0px;" />
	<param name="wmode" value="transparent" />
	<param name="flashvars"	value="serverUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&coreServerUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&adminServerUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&editMode=<%=ESAPI.encoder().encodeForHTML(editMode)%>&theme=<%=ESAPI.encoder().encodeForHTML(appTheme)%>&wmode=transparent" />
	<param name="movie" value="<%=ESAPI.encoder().encodeForHTML(serverUrl)%><%=ESAPI.encoder().encodeForHTML(swfName)%>" />

	<embed src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%><%=ESAPI.encoder().encodeForHTML(swfName)%>" quality="high" width="100%" height="100%" name="swfLocationDivId" align="" type="application/x-shockwave-flash"	> 
	</embed> 

</object>


<div id='swfLocationDivId' style="z-index:1">

</body>
</html>