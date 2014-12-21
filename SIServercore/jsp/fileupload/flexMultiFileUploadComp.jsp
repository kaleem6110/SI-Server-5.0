<%@ taglib uri="/tags/struts-bean" prefix="bean" %>
<%@ page import="com.enterprisehorizons.magma.config.beans.SecurityRoleBean" %>
<%@ page import="com.enterprisehorizons.magma.ecoweb.constants.IWebSessionContants"%>
<%@ page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@ include file="/common/style.jsp" %>
<%@ page import="org.owasp.esapi.ESAPI" %>
<script type="text/javascript" src="js/flexSessionTimeOut.js"></script>
<%
String showHomeButton = request.getParameter("showHomeButton");
String filetypes = request.getParameter("filetypes");
String filetypeslabel = request.getParameter("filetypeslabel");

if(StringUtils.isNull(showHomeButton))
showHomeButton = "true";

if(StringUtils.isNull(filetypes))
filetypes = "*.*";

if(StringUtils.isNull(filetypeslabel))
filetypeslabel = "All(*.*)";

	Object obj = request.getSession(false).getAttribute("stiUser");
	if(obj == null){ 
		response.sendRedirect(ServerUtils.getContextName(request)+"/");
		return;
	}   
	String serverUrl = ServerUtils.getServerContextBaseUrl(request);
	UserBean user = (UserBean)session.getAttribute(ServerUtils.USER_BEAN_NAME);
	String moduleId =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
	String swfParams = "?serverUrl="+serverUrl+"&domainId="+user.getDomainId()+"&languageId="+user.getLanguageId()+"&moduleId="+moduleId+"&theme="+appTheme+
	"&showHomeButton="+showHomeButton+"&filetypes="+filetypes+"&filetypeslabel="+filetypeslabel+"&userId="+user.getUserId();
%>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/flash_detect.js"></script>
<script language="javascript">
	if(!FlashDetect.installed || !FlashDetect.versionAtLeast(10)){
        parent.flashRequired("<bean:message key="flash.required" bundle="admin" />","<bean:message key="flash.url" bundle="admin" />");       
    }
	function goBack(){
		window.location='<%=ServerUtils.getContextName(request)%>/dbaAdminSecurity.do';
	}
	function goHome(){
		window.location ='<%=ServerUtils.getContextName(request)%>/adminMain.do'
	}
</script>
<jsp:include page="/common/stiSession.jsp"/>
<div> 
	<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"  scrolling='yes' id="flexupload" width="101.2%" height="100%">
		<param name="movie" value="swf/MultiFileUpload.swf<%=ESAPI.encoder().encodeForHTML(swfParams)%>" />
		<param name="quality" value="high" />
		<param name="bgcolor" value="#FFFFFF" />
		<param name="wmode" value="transparent" />
		<param name="allowScriptAccess" value="sameDomain" />
		<embed src="swf/MultiFileUpload.swf<%=ESAPI.encoder().encodeForHTML(swfParams)%>" quality="high" bgcolor="#FFFFFF"
			width="100%" height="100%" name="ecogroupmapping" align="middle"
			play="true"
			loop="false"
            wmode="transparent"
			quality="high"
			allowScriptAccess="sameDomain"
			type="application/x-shockwave-flash"
			pluginspage="http://www.adobe.com/go/getflashplayer">
		</embed>
	</object>
</div>

 