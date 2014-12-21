<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.CommonConfigUtils,com.enterprisehorizons.magma.server.admin.AdminConfigUtils" %>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.spacetimeinsight.security.bean.ModuleBean"%>
<%@page import="java.util.*"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%
	String serverRootUrl = ServerUtils.getServerRootUrl(request);
	String serverUrl = ServerUtils.getServerContextBaseUrl(request);
    String domainId = request.getParameter(ServerUtils.PARAM_DOMAIN_ID);
    String userId = request.getParameter(ServerUtils.PARAM_USER_ID);
    String languageId = request.getParameter(ServerUtils.PARAM_LANGUAGE_ID);
    String moduldeId =  request.getParameter(ServerUtils.PARAM_MODULE_ID);
    String appTheme = AdminConfigUtils.getApplicationTheme();
     
    //UserBean user = (UserBean)session.getAttribute(IWebSessionContants.SECURITY_USER_BEAN);
    //ModuleBean[] modules = (ModuleBean[])user.getModules().toArray(new ModuleBean[0]);
    int i=0;
%>
<html>
<head>
<%
	Object obj = request.getSession(false).getAttribute(ServerUtils.USER_BEAN_NAME);
	if(obj == null){ 
		response.sendRedirect(ServerUtils.getContextName(request)+"/");
		return;
	}   
 
%>

<!-- <script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/swfobject.js"></script> -->
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>js/flexSessionTimeOut.js"></script>
<script>
var modulesUrl = new Array();
<logic:iterate id="stiModulesList" name="stiUser"  property="modules" >
	<logic:notEmpty name="stiModulesList" property="url">
			modulesUrl.push({'id':<bean:write name="stiModulesList" property="id"/>,'url':'<bean:write name="stiModulesList" property="url"/>','index':<%=i%>});
	</logic:notEmpty>
	<% i++; %>		 
</logic:iterate>
/*
function createSituationRoom(){
        var flashvars = {wmode: "transparent"}; 
        var params = {serverUrl: "<%=ESAPI.encoder().encodeForHTML(serverUrl)%>",
                            domainId: "<%=ESAPI.encoder().encodeForHTML(domainId)%>",
                            userId: "<%=ESAPI.encoder().encodeForHTML(userId)%>",
                            languageId:"<%=ESAPI.encoder().encodeForHTML(languageId)%>",
                            moduleId:"<%=ESAPI.encoder().encodeForHTML(moduldeId)%>",
                            wmode: "transparent",
                            theme:"<%=ESAPI.encoder().encodeForHTML(appTheme)%>"
                            };
        var attributes = {
            id: "situationRoom",
            name: "situationRoom",
            style: "border: 1px solid silver; height: 100%; width: 100%; position:absolute; left:0px;top:0px;",
            wmode: "transparent",
            allowFullScreen: "true"
        };
    
        var geFrameUrl = "<%=ServerUtils.getContextName(request)%>/ge/viewer/SituationRoomCarousel.swf";
        swfobject.embedSWF(geFrameUrl, "situationRoomDiv", "100%", "100%", "9.0.0",flashvars, params, attributes);
}
*/
function gotoModuleTab(moduleId,selectLayerIds,selectedRBRegion,isModuleLevel){  
  for(i=0;i<modulesUrl.length;i++){
	if(modulesUrl[i].id==moduleId){
        var urlStr = modulesUrl[i].url;
		urlStr=urlStr.replace(/&amp;/g, '&');
		parent.situationModuleId=moduleId;// setting module id of the situation room window clicked layer in situationroom
		urlStr = urlStr + '&selectLayerIds='+selectLayerIds;
		if(isModuleLevel){
			urlStr = urlStr + '&selectedRBRegionModule='+selectedRBRegion;
		}else{
			urlStr = urlStr + '&selectedRBRegion='+selectedRBRegion;
		}
		return parent.loadGEFrame(urlStr,moduleId);
	}
  }
}

//createSituationRoom();
window.onload=function(){
    sessionDetails();
}

function getSessionMax()
{
	return "<%=session.getMaxInactiveInterval()%>";
}
var timer = 0;
function sessionDetails(){
	var sessionMax = "<%=session.getMaxInactiveInterval()%>";
	var sessionAlert = "<%=AdminConfigUtils.getSessionAlert()%>";
	var sessionAlertTime = "<%=AdminConfigUtils.getSessionAlertTime()%>";
	var sessionMaxDiff = (sessionMax- sessionAlertTime);
	if(sessionAlert == 'true'){
		clearTimeout(timer);
		timer = 0 ;
		timer =  setTimeout("promptUser("+sessionAlertTime+")",sessionMaxDiff*1000);
	}else{
		clearTimeout(timer);
		timer = 0 ;
		timer =  setTimeout("sessionExpire()",sessionMax*1000);
    }
    // Session should not get expired for Situation room if there is a situation present
	validateAndExtendSession();
	
}

function sessionExpire(){
	parent.invalidateSession();
	alert(parent.SESSION_EXPIRE_ALERT);
}

function promptUser(sessionAlertTime){
	var message = confirm('Your login session will expire in ' +sessionAlertTime+ ' seconds. Click Ok to extend the session with server');
	if (message){
		validateAndExtendSession();
        sessionDetails();
	}else{
		parent.invalidateSession();
	}
}

</script>
</head>
<body style="margin:0px" scroll="no">

<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="situationRoom">
	<param name="id" value="situationRoom" />
	<param name="name" value="situationRoom" />
	<param name="style" value="border: 1px solid silver; height: 100%; width: 100%; position:absolute; left:0px;top:0px;" />
	<param name="wmode" value="transparent" />
	<param name="allowFullScreen" value="true" />
	<param name="flashvars"	value="serverUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&userId=<%=ESAPI.encoder().encodeForHTML(userId)%>&domainId=<%=ESAPI.encoder().encodeForHTML(domainId)%>&moduleId=<%=ESAPI.encoder().encodeForHTML(moduldeId)%>&languageId=<%=ESAPI.encoder().encodeForHTML(languageId)%>&theme=<%=ESAPI.encoder().encodeForHTML(appTheme)%>&wmode=transparent" />
	<param name="movie" value="<%=ServerUtils.getContextName(request)%>/ge/viewer/SituationRoomCarousel.swf" />

	<embed src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/ge/viewer/SituationRoomCarousel.swf" quality="high" width="100%" height="100%" name="situationRoomDiv" align="" type="application/x-shockwave-flash" FlashVars="serverUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&userId=<%=ESAPI.encoder().encodeForHTML(userId)%>&domainId=<%=ESAPI.encoder().encodeForHTML(domainId)%>&moduleId=<%=ESAPI.encoder().encodeForHTML(moduldeId)%>&languageId=<%=ESAPI.encoder().encodeForHTML(languageId)%>&theme=<%=ESAPI.encoder().encodeForHTML(appTheme)%>&wmode=transparent" allowFullScreen="true"> 
</embed> 

</object>


<div id="situationRoomDiv" width="100%" height="100%">
</div>
</body>
</html>