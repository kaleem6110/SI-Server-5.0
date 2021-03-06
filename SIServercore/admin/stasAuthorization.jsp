<%@ taglib uri="/tags/struts-bean" prefix="bean" %>
<%@ page import="com.enterprisehorizons.magma.config.beans.SecurityRoleBean" %>
<%@ page import="com.enterprisehorizons.magma.ecoweb.constants.IWebSessionContants"%>
<%@ page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@ page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="org.owasp.esapi.ESAPI"%>
<%@ include file="/common/style.jsp" %> 
<script type="text/javascript" src="js/flexSessionTimeOut.js"></script>
<%--<%

    String appTheme = AdminConfigUtils.getApplicationTheme();
    if (appTheme == null || appTheme.equals("null")) {
        appTheme = "default";
    }
%>--%>

<html>
<jsp:include page="/common/stiSession.jsp"/>
<head>
<%

    Object obj = request.getSession(false).getAttribute("stiUser");
    if(obj == null){ 
        response.sendRedirect(ServerUtils.getContextName(request)+"/");
        return;
    }   
    String serverUrl = ServerUtils.getServerContextBaseUrl(request);
    UserBean user = (UserBean)session.getAttribute(ServerUtils.USER_BEAN_NAME);
	String moduleId =(String) session.getAttribute(ServerUtils.PARAM_MODULE_ID);
    String swfParams = "?serverUrl="+serverUrl+"&domainId="+user.getDomainId()+"&languageId="+user.getLanguageId()+"&moduleId="+moduleId+"&theme="+appTheme+"&userId="+user.getUserId();
%>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/flash_detect.js"></script>

<script language="javascript">
 var timer = 0;
 if(!FlashDetect.installed){
        parent.flashRequired("<bean:message key="flash.required" bundle="admin" />","<bean:message key="flash.url" bundle="admin" />");       
    }
    function goBack(){
        clearTimer();
        window.location='<%=ServerUtils.getContextName(request)%>/dbaAdminSecurity.do';
    }
    function goHome(){
        clearTimer();
        window.location ='<%=ServerUtils.getContextName(request)%>/adminMain.do'
    }

         
</script>
</head>
<body style="margin:0px">
    <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            id="LdapUserGroupMapping" width="101.2%" height="100%">
            <!-- Pass the information whether request is from LDAP or DB -->
            <% 
            	if(AdminConfigUtils.isLDAPDatasource() || AdminConfigUtils.isKRBLDAPDatasource() || AdminConfigUtils.isOpenLDAPDatasource())
            	{
            		swfParams += "&userSearchSource=LDAP";		
            	}
	            else
	            {
	            	swfParams += "&userSearchSource=DB";
	            }
            %>
            <param name="movie" value="swf/admin/LdapUserGroupMapping.swf<%=ESAPI.encoder().encodeForHTML(swfParams)%>" />
            <param name="quality" value="high" />
            <param name="bgcolor" value="#FFFFFF" />
            <param name="wmode" value="transparent" />
            <param name="allowScriptAccess" value="sameDomain" />
            <embed src="swf/admin/LdapUserGroupMapping.swf<%=ESAPI.encoder().encodeForHTML(swfParams)%>" quality="high" bgcolor="#FFFFFF"
                width="100%" height="100%" name="LdapUserGroupMapping" align="middle"
                play="true"
                loop="false"
                wmode="transparent"
                quality="high"
                allowScriptAccess="sameDomain"
                type="application/x-shockwave-flash"
                pluginspage="http://www.adobe.com/go/getflashplayer">
            </embed>
    </object>
</body>
</html>