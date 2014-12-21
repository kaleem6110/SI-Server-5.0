<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.CommonConfigUtils" %>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils,com.spacetimeinsight.stas.config.*"%>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.spacetimeinsight.db.model.util.DataModelsCacheHelper"%>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<jsp:include page="/common/stiSession.jsp"/>

<%

    String groupId = request.getParameter(ServerUtils.PARAM_GROUP_ID);
    String domainId = request.getParameter(ServerUtils.PARAM_DOMAIN_ID);
    String userId = request.getParameter(ServerUtils.PARAM_USER_ID);
    String moduleId = request.getParameter(ServerUtils.PARAM_MODULE_ID);
    String languageId = request.getParameter(ServerUtils.PARAM_LANGUAGE_ID);
    String languageCd = request.getParameter(ServerUtils.PARAM_LANGUAGE_CODE);
    String serverUrl = ServerUtils.getServerContextBaseUrl(request);
    UserBean userBean = (UserBean) session.getAttribute(ServerUtils.USER_BEAN_NAME);
    String loginId = userBean.getLoginId();
	String userUniqueId = userBean.getUserUniqueId();
    //int SessionTimeInterval=AdminConfigUtils.getSessionAlertTime();
	//int SessionAlertTime=session.getMaxInactiveInterval();
	//boolean sessionAlert = AdminConfigUtils.getSessionAlert();
	String defaultRange = AdminConfigUtils.getVisibleRange();
    String isHighlightPlacement = AdminConfigUtils.getHighlightPlacemark();
    String selectFavorite = request.getParameter("selectFavorite");
	 if(selectFavorite == null) {
        selectFavorite = "";
    }
    
	String defaultMap = request.getParameter("defaultMap");
	 if(defaultMap == null) {
        defaultMap = "";
    }
	//String baseMapUrl = AdminConfigUtils.getBaseMapUrl();
			
    if(StringUtils.isNull(domainId)) {
        domainId = String.valueOf(userBean.getDomainId());
    }
    if(domainId == null) {
        domainId = "";
    }

    if(StringUtils.isNull(userId)) {
        userId = String.valueOf(userBean.getUserId());
    }
    if(userId == null) {
        userId = "";
    }

    if(StringUtils.isNull(groupId)) {
        groupId = StringUtils.tokenize(userBean.getGroupIds());
    }
     if(groupId == null) {
        groupId = "";
    }

    if(moduleId == null) {
        moduleId = "";
    }

    if(StringUtils.isNull(languageId)) {
        languageId = String.valueOf(userBean.getLanguageId());
    }
    if(languageId == null) {
        languageId = "";
    }

    if(StringUtils.isNull(languageCd)) {
        languageCd = userBean.getLanguageCd();
    }
    if(languageCd == null) {
        languageCd = "";
    }

	String bingMapCulture = languageCd;
	if(bingMapCulture.contains("_"))
		bingMapCulture=bingMapCulture.replace("_","-");

	String coreServerUrl = serverUrl;
    String adminServerUrl=serverUrl;

//Added for Alerts
	String disableTour = request.getParameter("disableTour");
    String disableSound = request.getParameter("disableSound");
    String alertOffset = request.getParameter("alertOffset");
	GenericConfigurationManager gcManager = GenericConfigurationManager.getInstance();
    String noOfMessages=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_MAX_MSGS);
    String alertFile=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_FILE);
    String defaultPriority=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_DEFAULT_PRIORITY);
    String zoomRange=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_ZOOM);
	
	String autoAckSnoozeInterval = AdminConfigUtils.getAutoAckSnoozeInterval();
	String messageScrollSpeed = AdminConfigUtils.getMessageScrollSpeed();
	String messageScrollCount = AdminConfigUtils.getMessageScrollCount();
	String tourRepeatCount = AdminConfigUtils.getTourRepeatCount();
	String maxTourAlerts = AdminConfigUtils.getMaxTourAlerts();
	
	if(disableTour==null)
        disableTour=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_DISABLE_TOUR);
    if(disableSound==null)
        disableSound=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_DISABLE_SOUND);
    if(alertOffset==null)
        alertOffset=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_OFFSET);
		
	String alarmModeId = "ALARM";
    String tickerModeId = "TICKER";
    String tourModeId = "TOUR";


%>
<% response.addHeader("P3P","CP='IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT'"); %>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>BingFrame</title>
    <style type="text/css">
        html, body
        {
            height: 100%;
            overflow: hidden;
        }
        body
        {
            padding: 0;
            margin: 0;
        }
        #silverlightControlHost
        {
            height: 100%;
            text-align: center;
            overflow: hidden;
        }
    </style>

    <script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>/jsp/offlineslviewer/silverlight.js"></script>
    <script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>/jsp/offlineslviewer/viewerfunctions.js"></script>
	<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>/jsp/offlineslviewer/DashboardPopUp.js"></script>
    <script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>/jsp/offlineslviewer/SilverlightSessionTimeOut.js"></script>
    <script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/swfobject.js"></script>
	<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>/js/ge/interceptOperations.js"></script>

    <script type="text/javascript">
    /*
  	add below lines of code to prevent passing situation room selected window situation details
  	to other module other than selected layer module
  	*/
    parent.currentSelectedModule='<%=ESAPI.encoder().encodeForHTML(request.getParameter("moduleId"))%>';
    if(parent.situationModuleId!="" && parent.situationModuleId !=parent.currentSelectedModule){
    parent.selectLayerIds="";
    parent.selectedRBRegion="";
    parent.selectedRBRegionModule="";
    
    }

         function onSilverlightError(sender, args) {
            var appSource = "";
            if (sender != null && sender != 0) {
                appSource = sender.getHost().Source;
            }

            var errorType = args.ErrorType;
            var iErrorCode = args.ErrorCode;

            if (errorType == "ImageError" || errorType == "MediaError") {
                return;
            }

            var errMsg = "Unhandled Error in Silverlight Application " + appSource + "\n";

            errMsg += "Code: " + iErrorCode + "    \n";
            errMsg += "Category: " + errorType + "       \n";
            errMsg += "Message: " + args.ErrorMessage + "     \n";

            if (errorType == "ParserError") {
                errMsg += "File: " + args.xamlFile + "     \n";
                errMsg += "Line: " + args.lineNumber + "     \n";
                errMsg += "Position: " + args.charPosition + "     \n";
            }
            else if (errorType == "RuntimeError") {
                if (args.lineNumber != 0) {
                    errMsg += "Line: " + args.lineNumber + "     \n";
                    errMsg += "Position: " + args.charPosition + "     \n";
                }
                errMsg += "MethodName: " + args.methodName + "     \n";
            }

            throw new Error(errMsg);
        }

        function ZoomToLocation(latitude,longitude,zoomLevel)
        {
			var pluginid = "appHostObject";
			if (document.getElementById(pluginid) != undefined && document.getElementById(pluginid) != null)
			{
				document.getElementById(pluginid).content.Page.ZoomInToLocation(latitude,longitude,zoomLevel);
			}
        }
        
        function addLayer(name, url, isSelect, id) {
        	var pluginid = "appHostObject";
			if (document.getElementById(pluginid) != undefined && document.getElementById(pluginid) != null)
			{
				document.getElementById(pluginid).content.Page.AddLayerToMap(name,url,isSelect,id);
			}
   		}
        
    </script>

</head>
<body>
    <form id="form1"  style="height: 100%" method="post">
	<input type="hidden" id="csrf" name="csrf" value="${csrf}">

    <div id="silverlightControlHost">
        <object data="data:application/x-silverlight-2," type="application/x-silverlight-2"
            width="100%" height="100%" id="appHostObject">
            <param name="source" value="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>/jsp/offlineslviewer/ClientBin/OfflineRadMap.xap" />
            <param name="onError" value="onSilverlightError" />
            <param name="background" value="transparent" />
            <param name="minRuntimeVersion" value="5.0.61118.0" />
            <param name="autoUpgrade" value="true" />
            <param name="InitParams" value="coreServerUrl=<%=ESAPI.encoder().encodeForHTML(coreServerUrl)%>,ServerUrl=<%=ESAPI.encoder().encodeForHTML(adminServerUrl)%>,bingMapCulture=<%=ESAPI.encoder().encodeForHTML(bingMapCulture)%>,GroupId=<%=ESAPI.encoder().encodeForHTML(groupId)%>,ModuleId=<%=ESAPI.encoder().encodeForHTML(moduleId)%>,DomainId=<%=ESAPI.encoder().encodeForHTML(domainId)%>,UserId=<%=ESAPI.encoder().encodeForHTML(userId)%>,LoginId=<%=ESAPI.encoder().encodeForHTML(loginId)%>,UserUniqueId=<%=ESAPI.encoder().encodeForHTML(userUniqueId)%>,LanguageId=<%=ESAPI.encoder().encodeForHTML(languageId)%>,DefaultMap=<%=ESAPI.encoder().encodeForHTML(defaultMap)%>,ISHighlightPlacement=<%=ESAPI.encoder().encodeForHTML(isHighlightPlacement)%>,DefaultRange=<%=ESAPI.encoder().encodeForHTML(defaultRange)%>,selectFavorite=<%=ESAPI.encoder().encodeForHTML(selectFavorite)%>,NoofMessages=<%=ESAPI.encoder().encodeForHTML(noOfMessages)%>,AlertFile=<%=ESAPI.encoder().encodeForHTML(alertFile)%>,DefaultPriority=<%=ESAPI.encoder().encodeForHTML(defaultPriority)%>,ZoomRange=<%=ESAPI.encoder().encodeForHTML(zoomRange)%>,AutoAckSnoozeInterval=<%=ESAPI.encoder().encodeForHTML(autoAckSnoozeInterval)%>,MessageScrollSpeed=<%=ESAPI.encoder().encodeForHTML(messageScrollSpeed)%>,MessageScrollCount=<%=ESAPI.encoder().encodeForHTML(messageScrollCount)%>,TourRepeatCount=<%=ESAPI.encoder().encodeForHTML(tourRepeatCount)%>,MaxTourAlerts=<%=ESAPI.encoder().encodeForHTML(maxTourAlerts)%>,DisableTour=<%=ESAPI.encoder().encodeForHTML(disableTour)%>,DisableSound=<%=ESAPI.encoder().encodeForHTML(disableSound)%>,AlertOffset=<%=ESAPI.encoder().encodeForHTML(alertOffset)%>,AlarmModeId=<%=ESAPI.encoder().encodeForHTML(alarmModeId)%>,TickerModeId=<%=ESAPI.encoder().encodeForHTML(tickerModeId)%>,TourModeId=<%=ESAPI.encoder().encodeForHTML(tourModeId)%>" />
            <param name="windowless" value="true" />
            <param name="EnableGPUAcceleration" value="true" />
            <param name="enableHtmlAccess" value="true" />
            <a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=5.0.61118.0" style="text-decoration: none">
                <img src="http://go.microsoft.com/fwlink/?LinkId=161376" alt="Get Microsoft Silverlight"
                    style="border-style: none" />
            </a>
        </object>
        <iframe id="_sl_historyFrame" style="visibility: hidden; height: 0px; width: 0px;
            border: 0px"></iframe>
    </div>
    </form>
</body>
</html>

