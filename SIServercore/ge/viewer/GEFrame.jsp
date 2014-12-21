<%@ taglib uri="/tags/struts-bean" prefix="bean" %>
<%@page import="com.enterprisehorizons.constants.CommonConstants"%>    
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.CommonConfigUtils" %>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils"%>
<%@page import="com.spacetimeinsight.stas.config.ConfigurationConstants"%>
<%@page import="com.spacetimeinsight.stas.config.GenericConfigurationManager"%>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.magma.artifact.search.GlobalSearchController"%>
<%@page import="java.util.Map" %>
<%@page import="com.spacetimeinsight.preferences.PreferenceHelper"%>
<%@page import="org.owasp.esapi.ESAPI"%>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
 <%@page pageEncoding="UTF-8"%>
 
<%
    if(session == null || session.getAttribute(ServerUtils.USER_BEAN_NAME) == null){
        response.sendRedirect("/");
        return;
    }
    UserBean userBean = (UserBean) session.getAttribute(ServerUtils.USER_BEAN_NAME);

    String serverUrl = ServerUtils.getServerContextBaseUrl(request);
    String serverRootUrl = ServerUtils.getServerRootUrl(request);
    String groupId = request.getParameter(ServerUtils.PARAM_GROUP_ID);
    String domainId = request.getParameter(ServerUtils.PARAM_DOMAIN_ID);
    String userId = request.getParameter(ServerUtils.PARAM_USER_ID);
    String moduleId = request.getParameter(ServerUtils.PARAM_MODULE_ID);
    String languageId = request.getParameter(ServerUtils.PARAM_LANGUAGE_ID);
    String languageCd = request.getParameter(ServerUtils.PARAM_LANGUAGE_CODE);
    String geKey = request.getParameter(ServerUtils.PARAM_GE_KEY);
    String geClientId = request.getParameter(ServerUtils.PARAM_GE_CLIENT_ID);
    String rasEnabled = request.getParameter(ServerUtils.PARAM_RAS_ENABLED);
    String rasInobxUrl = request.getParameter(ServerUtils.PARAM_RAS_INBOX_URL);
    String selectLayerIds = request.getParameter(ServerUtils.PARAM_SELECTE_LAYER_IDS);
    String selectedRBRegion = request.getParameter(ServerUtils.PARAM_SELECTED_RB_REGION);
    String selectedRBRegionModule = request.getParameter(ServerUtils.PARAM_SELECTED_RB_REGION_MODULE);
	String userName = request.getParameter("userName");
    String viewMode = request.getParameter("viewmode");
    String clientName = request.getParameter("clientname");
    String title = request.getParameter("title");
    String expandTree = request.getParameter("expandtree");
    String defaultLat = request.getParameter("defaultlat");
    String defaultLon = request.getParameter("defaultlon");
    String defaultRange = request.getParameter("defaultrange");
    //longitude,latitude,range,tilt,heading,altitude,altitudemode
    String defaultView = request.getParameter("defaultview");
    String selectedLayers = request.getParameter("selectedLayers");
	if(StringUtils.isNull(selectedLayers)) {
		 selectedLayers = "";
    }
    String selectFavorite = request.getParameter("selectFavorite");
    String swfName = request.getParameter("swf");
    String ecoexpml = request.getParameter("ecoexpml");
    int sessionStatusTimerInterval = AdminConfigUtils.getSessionStatusUpdateTimerInterval();
    String disableTour = request.getParameter("disableTour");
    String disableSound = request.getParameter("disableSound");
    String alertOffset = request.getParameter("alertOffset");
	String alarmModeId = null;
	String tickerModeId = null;
	String tourModeId = null;
	String mmTickerModeId = null;
	String autoAckSnoozeInterval = null;
	String messageScrollSpeed = null;
	String messageScrollCount = null;
	String tourRepeatCount = null;
	String maxTourAlerts = null;
    String appTheme = AdminConfigUtils.getApplicationTheme();
	String rubberBandHighlightColor = AdminConfigUtils.getRubberBandHighlightColor();
	String isHighlightPlacemark = AdminConfigUtils.getHighlightPlacemark();
	String idColumn = request.getParameter("idColumn");
	String autoFitColumns = request.getParameter("autoFitColumns");
	String helpUrl = request.getParameter("helpUrl");
	String mappingType = request.getParameter("mappingType");
	String rbServerEventsListener = request.getParameter("rbServerEventsListener");
	String applyRegionDefault = request.getParameter("applyRegionDefault");
	String loginId = userBean.getLoginId();
	String userUniqueId = userBean.getUserUniqueId();
	String helpPath = AdminConfigUtils.getPortalUserGuide();
	
	if(!helpPath.startsWith("http")){
		helpPath = "serverresources/"+helpPath;
	}

    if(appTheme == null || appTheme.equals("null")) {
        appTheme = "default";
    }
    String jsessionId = "";
    if(request.getSession(false) != null) {
        jsessionId = request.getSession(false).getId();
    }

    String gsComponentUrl = AdminConfigUtils.getGSSearchComponentUrl();
    boolean enableGS = GlobalSearchController.getInstance().isEnableGlobalSearch();
    if(gsComponentUrl == null) {
        gsComponentUrl = "";
    }
    boolean gsLaunchInWindow = AdminConfigUtils.getGSLaunchInExternalWindow();

	String dashboardsLayout = request.getParameter("dashboardsLayout");
	 if(StringUtils.isNull(dashboardsLayout)) {
        dashboardsLayout = "";
    }
	String dashboardsLayoutNumCols = request.getParameter("dashboardsLayoutNumCols");
	 if(StringUtils.isNull(dashboardsLayoutNumCols)) {
        dashboardsLayoutNumCols = "";
    }

	 String rbHideSituationRoom = request.getParameter("rbHideSituationRoom");
	 if(StringUtils.isNull(rbHideSituationRoom)) {
		 rbHideSituationRoom = "false";
    }

	String rbHideNameEntry = request.getParameter("rbHideNameEntry");
	 if(StringUtils.isNull(rbHideNameEntry)) {
		 rbHideNameEntry = "false";
    }

	String rbShowDetailsButton = request.getParameter("rbShowDetailsButton");
	 if(StringUtils.isNull(rbShowDetailsButton)) {
		 rbShowDetailsButton = "false";
    }

	String rbCustomRubberbandRenderer = request.getParameter("rbCustomRubberbandRenderer");
	 if(StringUtils.isNull(rbCustomRubberbandRenderer)) {
		 rbCustomRubberbandRenderer = "";
    }

	String dashboardsLayoutNumRows = request.getParameter("dashboardsLayoutNumRows");
	 if(StringUtils.isNull(dashboardsLayoutNumRows)) {
        dashboardsLayoutNumRows = "";
    }

	String dashboardWidth = request.getParameter("dashboardWidth");
	 if(StringUtils.isNull(dashboardWidth)) {
        dashboardWidth = "";
    }

	String dashboardHeight = request.getParameter("dashboardHeight");
	 if(StringUtils.isNull(dashboardHeight)) {
        dashboardHeight = "";
    }
	String measurementSystem = request.getParameter("measurementSystem");
	 if(StringUtils.isNull(measurementSystem)) {
        measurementSystem = "imperial";
    }

	if(StringUtils.isNull(geKey)) {
        geKey = AdminConfigUtils.getGEKey();
    }

    if(geKey == null) {
        geKey = "";
    }

    if(expandTree == null) {
        expandTree = "";
    }

    if(defaultLat == null) {
        defaultLat = "";
    }

    if(defaultLon == null) {
        defaultLon = "";
    }

    if(defaultRange == null) {
        defaultRange = "";
    }

    if(defaultView == null) {
        defaultView = "";
    }

    if(title == null) {
        title = "";
    }

    if(StringUtils.isNull(geClientId)) {
        geClientId = AdminConfigUtils.getGEClientId();
    }
    if(geClientId == null) {
        geClientId = "";
    }

	if(selectLayerIds == null) {
        selectLayerIds = "";
    }

	if(selectedRBRegion == null) {
        selectedRBRegion = "";
    }

	if(selectedRBRegionModule == null) {
        selectedRBRegionModule = "";
    }



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
	if(StringUtils.isNull(userName)) {
        userName = String.valueOf(userBean.getFirstName())+" "+String.valueOf(userBean.getLastName());
	}
    if(userName == null) {
        userName = "";
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

    if(rasEnabled == null) {
        rasEnabled = "false";
        rasInobxUrl="";
    }

    if(rasInobxUrl!=null){
        rasInobxUrl=serverRootUrl+rasInobxUrl;
    } else{
        rasInobxUrl="";
    }

    if(clientName == null) {
        clientName = "";
    }

    if(alarmModeId == null){
    	alarmModeId = "ALARM";
    }

    if(tickerModeId == null){
    	tickerModeId = "TICKER";
    }

	if(tourModeId == null){
    	tourModeId = "TOUR";
    }
	if(mmTickerModeId == null){
    	mmTickerModeId = "MMTicker";
    }

	if(messageScrollSpeed == null){
		messageScrollSpeed = AdminConfigUtils.getMessageScrollSpeed();
    }
	if(messageScrollCount == null){
		messageScrollCount = AdminConfigUtils.getMessageScrollCount();
    }
	if(tourRepeatCount == null) {
		tourRepeatCount = AdminConfigUtils.getTourRepeatCount();
	}
	if(maxTourAlerts == null) {
		maxTourAlerts = AdminConfigUtils.getMaxTourAlerts();
	}

	if(autoAckSnoozeInterval==null){
		autoAckSnoozeInterval = AdminConfigUtils.getAutoAckSnoozeInterval();
	}

	if(mappingType == null) {
		mappingType = "";
	}

    // events or notifications properties
    GenericConfigurationManager gcManager = GenericConfigurationManager.getInstance();
    String noOfMessages=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_MAX_MSGS);
    String alertFile=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_FILE);
    String defaultPriority=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_DEFAULT_PRIORITY);
    String zoomRange=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_ZOOM);

    if(disableTour==null)
        disableTour=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_DISABLE_TOUR);
    if(disableSound==null)
        disableSound=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_DISABLE_SOUND);
    if(alertOffset==null)
        alertOffset=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_OFFSET);
    if(StringUtils.isNull(swfName)) {
        swfName = "GEFrame.swf";
    }

      Map map=PreferenceHelper.getCategoryPreference(userId,moduleId,"Viewer:moduleJSUrl,pluginJSUrl,layerEventHandlerJSFunction,geoFeatureHighlightColor");
      
  


   String moduleJSUrl = (String)map.get("viewer.modulejsurl"); //request.getParameter(ServerUtils.PARAM_CUSTOM_JS_URL_MODULE);
   String pluginJSUrl = (String)map.get("viewer.pluginjsurl"); //request.getParameter(ServerUtils.PARAM_CUSTOM_JS_URL_MAP_PLUGIN);
   String layerEventHandlerJSFunction = (String)map.get("viewer.layereventhandlerjsfunction"); //request.getParameter(ServerUtils.PARAM_LAYER_EVENT_HANDLER_JS_FUNCTION);
   String geoFeatureHighlightColor=(String)map.get("viewer.geofeaturehighlightcolor");
%>
<jsp:include page="/common/commonheader.jsp"/>

<jsp:include page="/common/stiSession.jsp"/>


<%@page import="com.spacetimeinsight.alerts.util.IAlertConstants"%><html lang="en">


<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title><%=ESAPI.encoder().encodeForHTML(title)%></title>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/flash_detect.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>js/flexSessionTimeOut.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>js/dashboard/dashboardpopup.js"></script> 
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

	if(!FlashDetect.installed || !FlashDetect.versionAtLeast(10)){
        parent.flashRequired("<bean:message key="flash.required" bundle="admin" />","<bean:message key="flash.url" bundle="admin" />");
    }

var msgs="";
function showMessages(messages){
   msgs = messages;
}

function deselectLayers(layer){	
	deselectLayersByName(layer);
}
function getMessage(){
   return msgs;
}
function clearAckMessages(_headers){
    for(i=0;i<swfObjectsArr.length;i++){
        if("_AlertMessagingEvents" == swfObjectsArr[i]){
            var iframeObj = document.getElementById(swfObjectsArr[i]);
             if(iframeObj.src.indexOf("xcelcius")!=-1){
                iframeObj.src=iframeObj.src;
            }
            sendJSObjectToFlash(getSWFId(swfObjectsArr[i]), "_refreshDataGrid", _headers);
        }

     }

}
//disable/enable periodic refresh on drag drop of dashboards
function callOffPeriodicRefresh(message){
    //alert(message);
	var i;
	for(i=0;i<swfObjectsArr.length;i++){
		sendToFlash(getSWFId(swfObjectsArr[i]), "_disablePeriodicRefresh", message);
	}
}
// if any user add/update artifact then it will display alert to other user for updating artifact.
function callMMMessagebox(message){
	alert(message);
}
// for refreshing acknowledge message for Manual mapping.
function clearAckMessagesMM(_headers){

   sendJSObjectToFlash("geFrame", "_refreshDataGrid", _headers);
}
function ackAllEventMessages(_selectedEventId){
 	sendJSObjectToFlash("geFrame", "_ackAllEventMessages", _selectedEventId);
}
/*
			method to change view from java script
			params :viewMode :Object
			0(GE View only)
			1(Dashboard View Only)
			2(both GE& dashboard View)
*/
function changeView(_selectedView){
 	sendJSObjectToFlash("geFrame", "_changeView", _selectedView);
}
</script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>ge/viewer/magma_ajax.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>ge/viewer/motionpack.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>ge/viewer/AC_OETags.js" ></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/AlertTourFunctions.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/interceptOperations.js"></script>
<%
 if(!StringUtils.isNull(moduleJSUrl)) {
%>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl+moduleJSUrl.trim()) %>" ></script>
<%
    }
%>
<script language="JavaScript" type="text/javascript">
String.prototype.replaceAll = function(stringToFind,stringToReplace){
    var temp = this;
    var index = temp.indexOf(stringToFind);
        while(index != -1){
            temp = temp.replace(stringToFind,stringToReplace);
            index = temp.indexOf(stringToFind);
        }
        return temp;
    }

// Array Remove support on JS Array
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}

//Array indexof support on JS Array
if(!Array.indexOf){
  Array.prototype.indexOf = function(obj){
   for(var i=0; i<this.length; i++){
    if(this[i]==obj){
     return i;
    }
   }
   return -1;
  }
}

// ends here for the indexof support on JS Array.

function moveIFrame(divId, iframeId, x,y,w,h) {
    var frameRef=document.getElementById(divId);
    frameRef.style.left=x;
    frameRef.style.top=y;
    var iFrameRef=document.getElementById(iframeId);
    iFrameRef.width=w;
    iFrameRef.height=h;
}

function alertMe(test) {
    alert('alert me'+test);
}

function hideIFrame(divId){
    document.getElementById(divId).style.visibility="hidden";
}

function showIFrame(divId){
    document.getElementById(divId).style.visibility="visible";
}
var swfObjectsArr = new Array();
function loadIFrame(divId, iframeId, url){
    if(url == null || url.indexOf("null") == 0) {
        //alert('loading.. '+url);
        return;
    }
    //alert(divId+':'+iframeId+'loading.. '+url);
    var divObj = document.getElementById(divId);
    if(!divObj){
        divObj = document.createElement('div');
        divObj.setAttribute('id', divId);
        divObj.style.position = "absolute";
        divObj.style.border = "0px";
        divObj.style.visibility="hidden";
        divObj.style.backgroundColor = "transparent";
        document.body.appendChild(divObj);
        //swfObjectsArr.push(iframeId+"_swf");
        swfObjectsArr.push(iframeId);
        //set the zindex for the div id
        bringDivToBack(divId,iframeId);
    }
    divObj.innerHTML = "<iframe id='"+iframeId+"' name='"+iframeId+"' src='" + url + "'frameborder='0'></iframe>";

}
//get the title for the specific dashboard.
function getDashboardTitle(dashboardId){
	return sendToFlash("geFrame", "_getDashboardTitle", dashboardId);
}

// For getting event log message
function getEventLogMessage(messages){
			sendToFlash("geFrame", "_refreshDataGrid", messages);
}
//var childWindowsArr = new Array();

function openWindow(title, iframeId, url) {
    //swfObjectsArr.push(iframeId);
    var childWindow = open(url,iframeId, 'resizable=yes,width=500,height=400');
    if (childWindow.opener == null) {
        childWindow.opener = self;
    }

    //childWindowsArr.push(childWindow);
}

function existsIFrame(iframeId) {
    return swfObjectsArr.indexOf(iframeId) >= 0;
}
function serverDown(message)
{
	alert(message);
	parent.invalidateSession();
}

function removeIFrame(divId,iframeId){
    var divObj = document.getElementById(divId);
    //var index = swfObjectsArr.indexOf(iframeId+"_swf");
    var index = swfObjectsArr.indexOf(iframeId);
    sendToFlash(getSWFId(iframeId), "_closeWindow", "");
    swfObjectsArr.remove(index);
    divObj.parentNode.removeChild(divObj);
}

function getSWFId(iframeId) {
    return "swf_"+iframeId.replaceAll(" ","_");
}

function _getDashboardImage(iframeId) {
	var swfId = getSWFId(iframeId);
	sendToFlash(swfId,"_getDashboardImage");
} 

function _imageForPrint(data) {
	sendToFlash("geFrame","_imageForPrint",data);
}

function refreshWindows() {
    refreshDashboards('');
}

function refreshDashboards(layerName, dashboardIdToExlcude) {
    try{
        for(i=0;i<swfObjectsArr.length;i++){
			if(dashboardIdToExlcude && dashboardIdToExlcude == swfObjectsArr[i]) {
				continue;
			}
			 refreshDashboard(layerName, swfObjectsArr[i]);
        }
		refreshDashboardsPopUp("_refresh","");
    } catch (e){
        //alert('Error ['+e.message+'] occurred while refreshing the windows');
    }
}

function refreshDashboard(layerName, dashboardId) {
	try {
		//alert(layerName+":"+dashboardId);
		var iframeObj = document.getElementById(dashboardId);
		if(iframeObj == null) {
		   //prefix the layerid to the dashboard if the dashboardid does not start with layer id
			dashboardId = layerName+"_"+dashboardId;
			iframeObj = document.getElementById(dashboardId);
		}
		if(iframeObj != null) {
			// check for xcelsius type in the dashboard url for xmldatatype property
			//if its xcelsius referesh frame otherwise skip.
			if(iframeObj.src.indexOf("xcelcius")!=-1) {
				var url = iframeObj.src;
				var index = url.indexOf("random");
				if(index > 0) {
					url = url.substring(0,(index+6))+"%3D"+Math.random();

				}
			  iframeObj.src=url;
			} else if(layerName == '' || dashboardId.indexOf(layerName+"_") == 0) {
				sendToFlash(getSWFId(dashboardId), "_refresh", "");
			}
		}
	} catch (e) {
	}
} 

function getLayerId(layerName) {
	return sendToFlash("geFrame", "_getLayerId",layerName);
}

function invokeDashboardMethod(layerId, dashboardId, methodName, methodParams) {
	var swfId = getDashboardSWFId(layerId, dashboardId);
	if(swfId != null && swfId != "") {
		if(!methodParams || methodParams == null) {
			methodParams = "";
		}
		return sendToFlash(swfId, methodName, methodParams);
	} else {
		alert('dashboard not found for ['+layerId+'], ['+dashboardId+']');
	}

	return "";
}

function getSwfObjectsPopup(){
	try {
		var data = getSwfObjectsPopupCollection();
		if(data != null){
				sendToFlash("geFrame", "_getSwfObjectsPopup",data);
			} 
		}catch (e) {
			alert('Error ['+e.message+'] occurred while getting the SWF Objects Popup in loadswf');
		}
	}
function existsLayerDashboard(layerId, dashboardId) {
	var iframeObj = document.getElementById(dashboardId);
	if(iframeObj == null) {
	   //prefix the layerid to the dashboard if the dashboardid does not start with layer id
		dashboardId = layerId+"_"+dashboardId;
		iframeObj = document.getElementById(dashboardId);
	}
	return iframeObj != null;
}

function getDashboardSWFId(layerId, dashboardId) {
	var iframeObj = document.getElementById(dashboardId);
	if(iframeObj == null) {
	   //prefix the layerid to the dashboard if the dashboardid does not start with layer id
		dashboardId = layerId+"_"+dashboardId;
		iframeObj = document.getElementById(dashboardId);
	}

	if(iframeObj != null) {
		return getSWFId(dashboardId);
	}

	return "";
}

function fireViewChanged() {
    try{
        for(i=0;i<swfObjectsArr.length;i++){
            //var iframeId=swfObjectsArr[i].substring(0,(swfObjectsArr[i].length-4));
            var iframeObj = document.getElementById(swfObjectsArr[i]);
            // check for xcelsius type in the dashboard url for xmldatatype property
            //if its xcelsius referesh frame otherwise skip.
            if(iframeObj.src.indexOf("xcelcius")!=-1){
                var url = iframeObj.src;
				var index = url.indexOf("random");
				if(index > 0) {
					url = url.substring(0,(index+6))+"%3D"+Math.random();

				}
              iframeObj.src=url;
            }

            sendToFlash(getSWFId(swfObjectsArr[i]), "_viewchanged", "");
        }
		fireViewChangedPopUp("_viewchanged","");
    } catch (e){
        //alert('Error ['+e.message+'] occurred while refreshing the windows');
    }
    //sendToFlash("swfObject", "_refresh", "");
}

function getSTViewerIFrame() {
	return window.frames["geIFrame"];
}

function getGEPluginInstance() {
	return getSTViewerIFrame().getGEPluginInstance();
}

function isNetworkLinkOfViewRefreshType(name) {
    try {
		return getSTViewerIFrame().isNetworkLinkOfViewRefreshType(name);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred in isNetworkLinkOfViewRefreshType');
    }

	return false;
}
/**
* This method builds a call to java script function with params which can be sent to js function.
* @param functionName name of the javascript function name
* @param params a string with key=value and colon delimiter for multiple key value pairs.params could also be a javascript object
* below is the method call to testJSMethod(obj) 
* callScriptDashboardFunction("testJSMethod","layerId=1:artifactName=test:ecoexmpl=test.ecoxpml")
* function testJSMethod(obj){
	alert("dashboard button to execute js "+obj.layerId)
}
*/
function callScriptDashboardFunction(functionName,params){
	// js object parsing params from key=value 
	var finalParams={};
	var paramKeyVal=null;
	if(params.toString().indexOf(":")>0){
		var param=null;
		var paramsSplit = params.split(":");
	
		for( i=0;i<paramsSplit.length;i++){
			param = paramsSplit[i];
			paramKeyVal= param.split("=");
			finalParams[paramKeyVal[0]]=paramKeyVal[1];
		}
	}else if(params.toString().indexOf("=")>0){
		paramKeyVal= params.split("=");
		finalParams[paramKeyVal[0]]=paramKeyVal[1];
	}else{
		finalParams=params;
	}
    window[functionName](finalParams);

}
function updateColorOnRegion(featureId,regionColor){
    try {
        getSTViewerIFrame().updateColorOnRegion(featureId,regionColor);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while updating the options');
    }
}

function enableAutoRefresh(flag) {
    try {
        getSTViewerIFrame().enableAutoRefresh(flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while enabling autorefresh');
    }
}

function enableMouseListeners(flag) {
    try {
        getSTViewerIFrame().enableMouseListeners(flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while enabling mouselisteners');
    }
}

function openKml(url, name){
    try {
        getSTViewerIFrame().openKml(url,name);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while opening kml ['+url+']');
    }
}

function _startAlertTour(){
    try {
        getSTViewerIFrame()._startAlertTour();
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while Starting tour ');
    }

}
function _stopAlertTour(){
    try {
        getSTViewerIFrame()._stopAlertTour();
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while Stopping tour ');
    }

}


function _selectLayers(layers) {
    sendToFlash("geFrame", "_selectLayers", layers);
}

function _selectLayersById(layerIds) {
    sendToFlash("geFrame", "_selectLayersById", layerIds);
}
function _deSelectLayersById(layerIds) {
    sendToFlash("geFrame", "_deSelectLayersById", layerIds);
}
function _deSelectLayers(layers) {
    sendToFlash("geFrame", "_deSelectLayers", layers);
}

function submitLocation( address ) {
    try {
        getSTViewerIFrame().submitLocation(address);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while submitting the location');
    }
}

function toggleLayer(layer,switchOn){
    try {
        getSTViewerIFrame().toggleLayer(layer,switchOn);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while loading Google Earth, Please refresh the browser and try again.');
    }
}

function updateOptions(option,switchOn,isMileFeet){
    try {
        getSTViewerIFrame().updateOptions(option,switchOn,isMileFeet);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while updating the options');
    }
}

function getCurrentView() {
    try {
        return getSTViewerIFrame().getCurrentView();
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while getting the view');
    }
}

function setCurrentView(lookatStr) {
    try {
        //alert(lookatStr);
        return getSTViewerIFrame().setCurrentView(lookatStr);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while setting the current view');
    }
}

function _refresh(){
    try {
        getSTViewerIFrame()._refresh();
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while refreshing');
    }
}

function _refreshLink(name){
    try {
        getSTViewerIFrame()._refreshLink(name);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while refreshing link ['+name+']');
    }
}

function _refreshLinkWithParameters(name, params, artifactName){
    try {
        getSTViewerIFrame()._refreshLinkWithParameters(name, params, artifactName);
    } catch (e) {
       showAlert('Error ['+e.message+'] occurred while refreshing link ['+name+'] with parameters ['+params+']');
    }
}

function getLinkUrl(name){
    try {
		return getSTViewerIFrame().getLinkUrl(name);
    } catch (e) {
       showAlert('Error ['+e.message+'] occurred while refreshing link ['+name+'] with parameters ['+params+']');
    }
}

/*
function _lookat(coordStr) {
    try {
        getSTViewerIFrame()._lookat(coordStr);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while calling look at');
    }
}
*/

function _lookat(coordStr,rangeStr) {
    try {

        getSTViewerIFrame()._lookat(coordStr,rangeStr);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while calling look at');
    }
}

function _highlight(coordStr,dashboardId,layerId) {
    try {
        getSTViewerIFrame()._highlight(coordStr,dashboardId,layerId,"<%=StringEscapeUtils.escapeHtml(geoFeatureHighlightColor)%>");
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while highlighting the coordinate');
    }
}

function _setHighlightPlacemarkUrl(url) {
    try {
        getSTViewerIFrame()._setHighlightPlacemarkUrl(url);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while setting the  highlight placemark url');
    }
}

function _setHighlightPlacemarkScale(size) {
    try {
        getSTViewerIFrame()._setHighlightPlacemarkScale(size);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while setting the  highlight placemark scale');
    }
}

function _setHighlightPlacemarkStyle(style) {
    try {
        getSTViewerIFrame()._setHighlightPlacemarkStyle(style);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while setting the  highlight placemark style');
    }
}

function initAjax(startKmlUrl, name){
    try {
        getSTViewerIFrame().initAjax(startKmlUrl, name);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while in opening kml ['+startKmlUrl+']');
    }
}

function fetchKml(startKmlUrl, name){
    try {
        getSTViewerIFrame().fetchKml(startKmlUrl, name);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while in fetching kml ['+startKmlUrl+']');
    }
}

 function distanceCalculation(mode,measurementSystem){
    try {
        getSTViewerIFrame().distnaceCalculation(mode,measurementSystem);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while calculating the distance ');
    }
}

function removeNetworkLink(name)  {
    try {
        getSTViewerIFrame().removeNetworkLink(name);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while removing networklink ['+name+']');
    }
}

function addSmartArtOverlay(layerName,smartArtName,url,xPos,yPos,xUnit,yUnit){
    try {
        getSTViewerIFrame().addSmartArtOverlay(layerName,smartArtName,url,xPos,yPos,xUnit,yUnit)
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while adding extended data ['+name+','+dataName+','+dataValue+']');
    }
}

function getViewFormatParams(){
    try {
        return getSTViewerIFrame().getViewFormatParams();
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while getting the view format parameters');
    }
    return "";
}

function showOnlyPrimaryControls(iframeId, show){
	try {
		sendToFlash(getSWFId(iframeId), "_showOnlyPrimaryControls", show);
	} catch (e) {
		//ignore
	}
}

function bringGEDivToFront() {
    document.getElementById('geFrameDiv').style.zIndex = 2;
}

function bringGEDivToBack() {
    document.getElementById('geFrameDiv').style.zIndex = -1;
}

function leftClipDiv(divId, len) {
    try {
        var div = document.getElementById(divId);
        if(div) {
			div.style.clip = "rect(auto auto auto "+len+"px)";
        }
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while bringing the div to front');
    }
}

function topClipDiv(divId, len) {
    try {
        var div = document.getElementById(divId);
        if(div) {
			div.style.clip = "rect("+len+"px auto auto auto)";
        }
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while bringing the div to front');
    }
}

function bringDivToFront(divId, iframeId){
    try {
        var div = document.getElementById(divId);
        if(div) {
            div.style.zIndex = 4;
            //to send the callback to dashboard on maximize the dashboard for dashboard action events
            sendToFlash(getSWFId(iframeId), "_bringDivToFront", "");
        }
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while bringing the div to front');
    }
}

function bringDivToBack(divId, iframeId, paramThree){
    try {
        var div = document.getElementById(divId);
        if(div) {
            div.style.zIndex = 3;
            //to send the callback to dashboard on minimize the dashboard for dashboard action events
            sendToFlash(getSWFId(iframeId), "_bringDivToBack");
		
        }
		
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while bringing the div to front');
    }
}

function setZIndextoThree(divId, iframeId, paramThree){
    try {
        var div = document.getElementById(divId);
        if(div) {
          			 div.style.zIndex = 3; 
        		}
		
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while bringing the div to front');
    }
}

function hidePodURL(divId, iframeId, paramThree){
    try {
        var div = document.getElementById(divId);
        if(div) {
          			div.style.visibility = "hidden"; 
        		}
		
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while bringing the div to front');
    }
}

function showPodURL(divId, iframeId, paramThree){
    try {
        var div = document.getElementById(divId);
        if(div) {
          			div.style.visibility = "visible"; 
        		}
		
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while bringing the div to front');
    }
}


function hideBalloon() {
    try {
        getSTViewerIFrame().hideBalloon();
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while hiding the balloon');
    }
}

function _clearDOMFeatures(){
    try {
        getSTViewerIFrame()._clearDOMFeatures();
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while refreshing');
    }
}

/* google maps specific functions - start */
function showTrafficLayer(flag) {
    try {
        getSTViewerIFrame().showTrafficLayer(flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while showing the traffic layer');
    }
}

function showStreetViewLayer(flag) {
    try {
        getSTViewerIFrame().showStreetViewLayer(flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while showing the street view layer');
    }
}

function showLocalSearchControl(flag) {
      try {
        getSTViewerIFrame().showLocalSearchControl(flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while showing the Local Search Control');
    }
}
function _showRoute(wayPoints){
    //alert("geframe jsp :_showRoute :"+wayPoints);
     try {
        getSTViewerIFrame()._showRoute(wayPoints);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while _showRoute');
    }
}

// This function applies Algo Status on GE View
function showSelectedAlgoStatus(algoApplied,languageCd) {
	try {
    	    getSTViewerIFrame().showSelectedAlgoStatus("<%=StringEscapeUtils.escapeHtml(serverUrl)%>", algoApplied,languageCd);
    	} catch (e) {
        	showAlert('Error ['+e.message+'] occurred while showing the RB region algo status');
    	}
}

// This function removes Algo Status on GE View
function hideSelectedAlgoStatus(){
	try {
        	getSTViewerIFrame().hideSelectedAlgoStatus();
    	} catch (e) {
        	showAlert('Error ['+e.message+'] occurred while removing the RB region algo status');
    	}
}

function _clearRoute(){
    //alert("geframe jsp :_clearRoute :");
     try {
        getSTViewerIFrame()._clearRoute();
       // alert("geframe jsp :_clearRoute1 :");
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while _clearRoute geframe');
    }
}
/* google maps specific functions - end*/

function redirectToLoginPage()
{
    parent.refreshSessionInvalid();
}

function saveRubberbandingInEditMode(){
   getSTViewerIFrame().saveRBRegionsEditMode();
}

function getSelectedRubberBandDetails() {
    getSTViewerIFrame().getCurrentRubberBandEditingDetails();
}
function getSelectedCircleRubberBandDetails() {
    getSTViewerIFrame().getSelectedCircleRubberBandDetails();
}

function drawRBPolygonFinished() {
    getSTViewerIFrame().drawRBPolygonFinished();
}

function confirmToSaveRB(){
	sendToFlash("geFrame", "_allowRbToSave",confirm("Do you want to save rubberband region?"));
}

function drawRBCircleFinished() {
    getSTViewerIFrame().drawRBCircleFinished();
}

function showEditConfirmation(rubberBandXML) {
    sendToFlash("geFrame", "_showEditConfirmation",rubberBandXML);
}

function renamePolygonId(xmlData) {
    sendToFlash("geFrame", "_renamePolygonId",xmlData);
}

function updateRadius(roundedRadius) {
    sendToFlash("geFrame", "updateCircleRadius", roundedRadius);
}

function setCurrentSelectedRegion(featureId) {
     sendToFlash("geFrame", "_setCurrentSelectedRegion", featureId);
}

function cancelSaveRubberbandingInEditMode(regionColor){
    getSTViewerIFrame().cancelSaveRubberbanding(regionColor);
}

function addLayer(name, url, isSelect, id) {
    sendToFlash("geFrame", "_addLayer", name+","+url+","+isSelect+","+id);
}
</script>
<!--- ===================================================================================================================== -->
<script>
function showGE(){
    sendToFlash("geFrame", "_showGE", "true");
}

function enableFrame(flag){
    sendToFlash("geFrame", "_enableFrame", flag);
    //this is not called from geframe for a reason,
    //as this needs to be only done for Google Earth Enterprise Server
    //and can be commented out if there are any issues by calling this method.
    showGE();
}

function _refreshTimeLayers(){
    sendToFlash("geFrame", "_refreshTimeLayers");
}

function setRubberbandingEditMode(editModeFlag,state){

    getSTViewerIFrame().changeRubberBandModeEditMode(editModeFlag,state);
 }


 function setCircleRubberbandingEditMode(editModeFlag){
    getSTViewerIFrame().setCircleRubberbandingEditMode(editModeFlag);
 }

function drawRBFeature(type) {

    try {
        getSTViewerIFrame().drawRBFeature(type);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while drawing ['+type+'] for rubberbanding');
    }
}

function highlightRBFeature(regionCord, color, typeId) {
   try {
        getSTViewerIFrame().highlightRBFeature(regionCord, color, typeId);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while highlighting the RB region');
    }
}

function removeHighlightRBFeature() {
   try {
        getSTViewerIFrame().removeHighlightRBFeature();
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while removing the highlight of the RB region');
    }
}


function detailsClicked(rubberbandXML) {

    try {
        getSTViewerIFrame().detailsClicked(rubberbandXML);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while getting details ['+rubberbandXML+'] for rubberband');
    }
}

function createRBPolygon(id, coordStr, flag,viewPort,regionColor) {
    try {
      getSTViewerIFrame().createRBPolygon(id, coordStr, flag,viewPort,regionColor);
    } catch (e) {
        //do not show the error
       //alert('Error ['+e.message+'] occurred while creating polygon feature by id = ['+id+'] for rubberbanding');
    }
}

function updateRBPolygon(id, coordStr, flag) {
    try {
    	getSTViewerIFrame().updateRBPolygon(id, coordStr, flag);
    } catch (e) {
        //do not show the error
       //alert('Error ['+e.message+'] occurred while creating polygon feature by id = ['+id+'] for rubberbanding');
    }
}

function createRBCircle(id, coordStr, flag, viewPort,centerCoordinates, circumCoordinates, radius, operation,regionColor) {
    try {
        getSTViewerIFrame().createRBCircle(id, coordStr, flag,viewPort, centerCoordinates, circumCoordinates, radius, operation,regionColor);
    } catch (e) {
        //do not show the error
       // alert('Error ['+e.message+'] occurred while creating polygon feature by id = ['+id+'] for rubberbanding');
    }
}

function removeRBFeature(id) {
    try {
        getSTViewerIFrame().removeRBFeature(id);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while removing feature by id = ['+id+'] for rubberbanding');
    }
}

function showRBFeature(id, viewportStr, flag,measurementSystem,params) {

    try {
        getSTViewerIFrame().showRBFeature(id, viewportStr, flag,measurementSystem,params);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while showing/hiding feature id = ['+id+'] for rubberbanding');
    }
}

function getSerializedViewPort() {
    return getSTViewerIFrame().getSerializedViewPort();
}

function setSerializedViewPort(viewPortStr) {
    return getSTViewerIFrame().setSerializedViewPort(viewPortStr);
}

function activateListener(eventType, listenerType) {
    try {
        getSTViewerIFrame().activateListener(eventType, listenerType);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while activating the ['+eventType+'] listener for ['+listenerType+']');
    }
}

function deActivateListener(eventType, listenerType) {
    try {
        getSTViewerIFrame().deActivateListener(eventType, listenerType);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while deActivating the ['+eventType+'] listener for ['+listenerType+']');
    }
}

function setMarkerMode(markerMode) {
    try {
        getSTViewerIFrame().setMarkerMode(markerMode);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while setting the marker mode ['+markerMode+']');
    }
}

function initializeMarkerData() {
    try {
        getSTViewerIFrame().initializeMarkerData();
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while initializing the marker data');
    }
}


function drawMarkerFeature(type) {
    try {
        getSTViewerIFrame().drawMarkerFeature(type);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while drawing ['+type+'] for marker');
    }
}

function deleteSelectedMarkerFeature() {
    try {
        getSTViewerIFrame().deleteSelectedMarkerFeature();
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while deleting feature for marker');
    }
}

function setSelectedMarkerFeatureById(id) {
    try {
        getSTViewerIFrame().setSelectedMarkerFeatureById(''+id);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while setting selected marker feature by id = ['+id+']');
    }
}

function resetMarkerFeature(type) {
    try {
        getSTViewerIFrame().resetMarkerFeature(type);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while drawing ['+type+'] for marker');
    }
}

function updateCoordinates(id, coordsStr){
    sendToFlash("geFrame", "_updateCoordinates", id+":"+coordsStr);
}

function selectRow(id){
    sendToFlash("geFrame", "_selectRow", id);
}

function addFeature(id, coordsStr, featuretype,count){
    sendToFlash("geFrame", "_addFeature", featuretype+":"+id+":"+coordsStr+":"+count);
}

function updateFeature(id, coordsStr, featuretype){
    sendToFlash("geFrame", "_updateFeature", featuretype+":"+id+":"+coordsStr);
}

function updateFeatureAll(xmlData){
    sendToFlash("geFrame", "_updateFeatureAll",xmlData);
}

function _getSelectedSessionIds() {
    try {
        return sendToFlash("geFrame", "_getSelectedSessionIds");
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while getting the selected session ids');
    }

    return "";
}

function _getSelectedLayers() {
	try {
        return sendToFlash("geFrame", "_getSelectedLayers");
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while getting the selected layers');
    }

    return "";
}

function _getSelectedArtifactNames() {
    try {
        return sendToFlash("geFrame", "_getSelectedArtifactNames");
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while getting the selected artifact names');
    }

    return "";
}


function _showControls(dashboardDivId, flag) {
	try {
        return sendToFlash("geFrame", "_showControls", dashboardDivId + "," + flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while getting the show/hide the dashboardcontrolbar dashboardDivI/flag');
    }

    return "";
}

function _enableWindowControls(dashboardDivId, flag) {
	try {
        return sendToFlash("geFrame", "_enableWindowControls", dashboardDivId + "," + flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while data loading on the dashboardcontrolbar dashboardDivI/flag');
    }

    return "";
}

</script>
<!--- ===================================================================================================================== -->

<style>
body { margin: 0px; overflow:hidden; bgcolor:#000000; width:100%; height:100%}
</style>
</head>

<body scroll="no">
<script language="JavaScript" type="text/javascript">

function getFlashMovieObject(movieName){
    if (window.document[movieName]){
        return window.document[movieName];
    }
    if (navigator.appName.indexOf("Microsoft Internet")==-1){
      if (document.embeds && document.embeds[movieName])
        return document.embeds[movieName];
    } 

	var obj = document.getElementById(movieName);
	
      if(!obj) {
        var frames = window.frames; // or // var frames = window.parent.frames;
        for (var i = 0; i < frames.length; i++) {
           obj = frames[i].document.getElementById(movieName);
           if(obj) {
               return obj;
           }
        }
      }
      return obj;
}

function sendToFlash(swfObjectName, method, data) {
    try {
        var flashMovie = getFlashMovieObject(swfObjectName);
        //alert(method+":"+flashMovie+":"+swfObjectName+":"+data);
        return flashMovie.callFlashFromJS(method, data);
    }
    catch (e) {
        //alert('Error ['+e.message+'] occurred while calling a function on the flash object');
    }
}

function sendJSObjectToFlash(swfObjectName, method, data) {
    try {
        var flashMovie = getFlashMovieObject(swfObjectName);
        //alert(method+":"+flashMovie+":"+swfObjectName+":"+data);
        return flashMovie.sendJSObjectToFlash(method, data);
    }
    catch (e) {
        //alert('Error ['+e.message+'] occurred while calling a function on the flash object');
    }
}

function setSessionId(name, sessionId, artifactName) {
    sendToFlash("geFrame", "_setSessionId", name+","+sessionId+","+artifactName);
}


function viewChanged(viewStr) {
    sendToFlash("geFrame", "_viewChanged", viewStr);
}

function loadDashboards(name, nLink) {
    sendToFlash("geFrame", "_loadDashboards", name+","+nLink);
}

/**
 * @param params:Array - holds
 *  params[0] = All event details comma seperated
 *  params[1] = ecosystem session Id
 */
function registerEcosessionEvents(params) {
    sendJSObjectToFlash("geFrame", "_registerRefreshEcosessionOnEvents", params);
}

/**
 * @param params:Array - holds
 *  params[0] = All event details semicolan & space seperated
 *  params[1] = ecosystem session Id
 *  params[2] = dashbaord id
 */
function registerDashboardForEvents(params) {
    sendJSObjectToFlash("geFrame", "_registerDashboardRefreshOnEvents", params);
}

function fetchKmlLoaded(ecoexpml) {
    sendToFlash("geFrame", "_fetchKmlLoaded", ecoexpml);
}

function _getCurrentBoundingBox() {
    try {
        return getSTViewerIFrame()._getCurrentBoundingBox();
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while getting the current boundingbox');
    }

    return "";
}
//Google_Print_Preview 
function _getSelectedSessionIdsStr(layerId,dashboardId,isPopOut) {
    try {
       var selectedSessIdsStr = sendToFlash("geFrame", "_getSelectedSessIdsStrForPriPrev");
       if(isPopOut)	{   
    	   if(layerId < 0){
   			layerId = layerId.replace("-","_"); 
              sendToFlashFromPopUp( layerId +"_" + dashboardId + "_popup", "_getSelSessIdsStrForPrintPrev", selectedSessIdsStr);
   		   }
           sendToFlashFromPopUp(layerId +"_" + dashboardId + "_popup", "_getSelSessIdsStrForPrintPrev", selectedSessIdsStr);
       }else {
  	      sendToFlash(getDashboardSWFId(layerId,dashboardId), "_getSelSessIdsStrForPrintPrev", selectedSessIdsStr);
  	   }
   } catch (e) {
       alert('Error ['+e.message+'] occurred while selecting the getting the selected sessionIds ids in loadswf');
   }
   return "";
}

/**
* type: user,module,system
* name: name of the favorite
*/
function loadFavorite(type, name) {
	sendToFlash("geFrame", "_loadFavorite", type+","+name);
}

function loadUserFavorite(name) {
	loadFavorite("user",name);
}

function loadModuleFavorite(name) {
	loadFavorite("module",name);
}

function loadSystemFavorite(name) {
	loadFavorite("system",name);
}

/**
* expandState: 0, 1 or 2
*/
function setExpandState(expandState) {
	sendToFlash("geFrame", "_setExpandState", expandState);
}

function closeInfoFrame(){
     sendToFlash("geFrame", "_closeInfoFrame", '');
 }

 function closeInfoFrameById(id){
     sendToFlash("geFrame", "_closeInfoFrameById", id);
 }


 function openInfoframe(urlToOpen){
     sendToFlash("geFrame", "_loadInfoframe", urlToOpen);
 }

 function openInfoframeById(id, urlToOpen){
     sendToFlash("geFrame", "_loadInfoframeById", id+","+urlToOpen);
 }
 
  function openInfoframeByIdAndTitle(id, urlToOpen,title){
     sendToFlash("geFrame", "_loadInfoframeByIdAndTitle", id+","+urlToOpen+","+title);
 }

 function openDashboardFrameById(id, urlToOpen,layerId,layerName, windowId){
     sendToFlash("geFrame", "_loadDashboardFrameById", id+","+urlToOpen+","+layerId+","+layerName+","+windowId);
 }
 
 //Method is used to internalize the external dashboard.
 function popIn(layerId,dashboardName, url, title){
	var params = {};
	params["layerId"] = layerId;
	params["dashboardName"] = dashboardName;
	params["title"] = title;
	params["url"] = url;
	sendToFlash("geFrame", "_popIn", params);
 }
 
 function openDashboardFrameById(id, urlToOpen,layerId,layerName, windowId, iconUrl){
     sendToFlash("geFrame", "_loadDashboardFrameById", id+","+urlToOpen+","+layerId+","+layerName+","+windowId+","+iconUrl);
 }
 
//this is an associative array which store the list of child dashboards
//which are open under the parent layer id.
var dependentDashboards = new Array();
function openLayerDashboardByLayerNames(parentLayerName,layerName, dashboardName, title){
	var parentLayerID = getLayerId(parentLayerName);
	var layerID = getLayerId(layerName);
	var dashboardID = layerID + "_" + dashboardName;
	if(dependentDashboards.hasOwnProperty(parentLayerID) ){
		if(!existsLayerDashboard(layerID,dashboardName)){
			dependentDashboards[parentLayerID] += "," + dashboardID;
		}
	}else{
		dependentDashboards[parentLayerID] = dashboardID;
	}
	openLayerDashboardByLayerName(layerName, dashboardName, title);
}

function openLayerDashboardByLayerName(layerName, dashboardName, title){
	var layerId = getLayerId(layerName);
	openOrRefreshLayerDashboard(layerId,layerName,dashboardName,'',title);
}
function openLayerDashboardByLayerNameWithParams(layerName, dashboardName, params,title){
	var layerId = getLayerId(layerName);
	openOrRefreshLayerDashboard(layerId,layerName,dashboardName,params,title);
}
 function openLayerDashboard(layerId, layerName, dashboardName, params, title) {
	 if(!params || params == null) {
		params = "";
	}

	var dashboardObj = new Object();
	dashboardObj.layerId = layerId;
	dashboardObj.layerName = layerName;
	dashboardObj.dashboardName = dashboardName;
	dashboardObj.params = params;
	if(title) {
		dashboardObj.title =  title;
	}

	sendToFlash("geFrame", "_openLayerDashboard", dashboardObj);
}

function openOrRefreshLayerDashboard(layerId, layerName, dashboardName, params, title) {
	if(!layerId || layerId == '' && layerName && layerName != '') {
		layerId = getLayerId(layerName);
	}
	if(!existsLayerDashboard(layerId,dashboardName)) {
		openLayerDashboard(layerId, layerName, dashboardName, params, title);
	} else {
		invokeDashboardMethod(layerId, dashboardName, "_refreshWithParams", params);
		if(title) {
			setLayerDashboardTitle(layerId, layerName, dashboardName, title);
		}
	}
}

function maximizeLayerDashboard(layerId, layerName, dashboardName) {
	changeLayerDashboardState(layerId, layerName, dashboardName, "maximize");
}

function minimizeLayerDashboard(layerId, layerName, dashboardName) {
	changeLayerDashboardState(layerId, layerName, dashboardName, "minimize");
}

function restoreLayerDashboard(layerId, layerName, dashboardName) {
	changeLayerDashboardState(layerId, layerName, dashboardName, "restore");
}

function restoreLayerDashboardIfMaximized(layerId, layerName, dashboardName) {
	changeLayerDashboardState(layerId, layerName, dashboardName, "restoreIfMaximized");
}

function changeLayerDashboardState(layerId, layerName, dashboardName, dashboardState) {
	var dashboardObj = new Object();
	dashboardObj.layerId = layerId;
	dashboardObj.layerName = layerName;
	dashboardObj.dashboardName = dashboardName;
	dashboardObj.dashboardState = dashboardState;

	sendToFlash("geFrame", "_changeLayerDashboardState", dashboardObj);
}

function setLayerDashboardTitle(layerId, layerName, dashboardName, title) {
	var dashboardObj = new Object();
	dashboardObj.layerId = layerId;
	dashboardObj.layerName = layerName;
	dashboardObj.dashboardName = dashboardName;
	dashboardObj.title = title;

	sendToFlash("geFrame", "_setLayerDashboardTitle", dashboardObj);
}

function getLayerDashboardState(layerId, layerName, dashboardName) {
	var dashboardObj = new Object();
	dashboardObj.layerId = layerId;
	dashboardObj.layerName = layerName;
	dashboardObj.dashboardName = dashboardName;

	return sendToFlash("geFrame", "_getLayerDashboardState", dashboardObj);
}


function closeLayerDashboard(layerId, layerName, dashboardName) {
	var dashboardObj = new Object();
	dashboardObj.layerId = layerId;
	dashboardObj.layerName = layerName;
	dashboardObj.dashboardName = dashboardName;

	sendToFlash("geFrame", "_closeLayerDashboard", dashboardObj);
}

//close the launcher dashboard
function closeDashboardById(dashboardId){
	sendToFlash("geFrame", "_closeDashboardById", dashboardId);
}

 function openGMaps(){
   openInfoframeByIdAndTitle('GMaps','<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/ge/viewer/GMaps.jsp?key=<%=ESAPI.encoder().encodeForHTML(geKey)%>','<bean:message key="geframe.title.message.gmaps" bundle="admin"/>');
 }

 function openGoogleStreetview(){
    openInfoframeByIdAndTitle('StreetView','<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/ge/viewer/GMapsStreetView.jsp?key=<%=ESAPI.encoder().encodeForHTML(geKey)%>','<bean:message key="geframe.title.message.streetview" bundle="admin"/>');
 }

 function _setTimeRange(timeStr) {
    sendToFlash("geFrame", "_setTimeRange", timeStr);
 }

  function _setTime(startTime, endTime) {
	var timeRange = [];
	timeRange.push(startTime);
	timeRange.push(endTime);
    sendToFlash("geFrame", "_setTime", timeRange);
 }
 
 function getSwfObjectsPopup(){
	try {
		var data = getSwfObjectsPopupCollection();
		if(data != null){
				sendToFlash("geFrame", "_getSwfObjectsPopup",data);
			} 
		}catch (e) {
			alert('Error ['+e.message+'] occurred while getting the SWF Objects Popup in loadswf');
		}
	}
 
 //Refresh dashboard, on time basis
 //refreshDashboardId is a comma separeted list of dashboard ids without layer id attach to it
 
 function _setDashboardTime(timeRange,layerId,refreshDashboardIds,excludeDashboardId) {
	excludeDashboardId = layerId + "_"  + excludeDashboardId;
	var refreshDashboardIdList = null;
	if(refreshDashboardIds == null || refreshDashboardIds == ""){
		//refresh all dashboards
		for(i=0;i<swfObjectsArr.length;i++){
			if(swfObjectsArr[i] != excludeDashboardId){
				sendToFlash(getSWFId(swfObjectsArr[i]), "_setTime", timeRange);
			}
		}
	}else{
		refreshDashboardIdList = refreshDashboardIds.split(',');
		for(i=0;i<refreshDashboardIdList.length;i++){
			refreshDashboardIdList[i] = layerId + "_"  + refreshDashboardIdList[i];
			sendToFlash(getSWFId(refreshDashboardIdList[i]), "_setTime", timeRange);
		}
	}
	_setDashboardTimePopUp(timeRange,layerId,refreshDashboardIdList,excludeDashboardId);
 }

 function gotoHome(){
    document.geLinkForm.action = '/magmage/wfts/stihomepage.jsp';
    document.geLinkForm.submit();
}

function openHelpWindow(){
	var helpWindow = window.open('','portalUserGuide', 'width='+screen.width/2+',height='+screen.height+', resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no,scrollbars=no');
	helpWindow.document.write('<html><head><title>SI Server Portal User Guide</title></head><body topmargin="0" leftmargin="0"><iframe src="<%=ESAPI.encoder().encodeForHTML(helpPath) %>" id="ifrm" name="ifrm" width="100%" height="100%"></iframe></body></html>');
	helpWindow.document.close();
}
function showFileInHelpWindow(fileName){
	window.open('serverresources/'+fileName, 'portalUserGuide', 'width='+screen.width/2+',height='+screen.height+', resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no,scrollbars=yes');
}
function changeGEDivStyle(flag) {
    geFrameDiv.style.zIndex = flag ? "100" : -1;
}


function fireGEEvent(listenerType, eventType, eventMode) {
    sendToFlash("geFrame", "_fireGEEvent", listenerType+","+eventType+","+eventMode);
}

function getModuleId(){
	return <%=ESAPI.encoder().encodeForHTML(moduleId)%>;
}

function closeDependentDashboards(layerID){
	if(dependentDashboards.hasOwnProperty(layerID)){
		//closing the pod dashboards
		closeDashboardById(dependentDashboards[layerID]);
		var launchDashboardIds = getLaunchDashboardIds(dependentDashboards[layerID]);
		//closing the lunch dashboards if present.
		closeLaunchDashboardById(launchDashboardIds);
		delete dependentDashboards[layerID];
	}
}

function getLaunchDashboardIds(dashboardIds){
	return sendToFlash("geFrame", "_getLaunchDashboardIds", dashboardIds);
}

function layerSelected(layerName, isSelected) {
    try {
        getSTViewerIFrame().layerSelected(layerName, isSelected);
        if(!isSelected){           
        	closeDependentDashboards(layerName);
        }
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while in calling select layer for '+layername);
    }
}

function callCurrentState(param){
    sendToFlash("geFrame", "_currentState", param);
}

/**
 * incase there is a change in naming convention for SWF id for dashbaords, need to change accordingly
 * ecosystem event handler
 * eventName - name of the event triggered from ecosystem
 * layerId - source of event
 * data - any extended data
 */
function handleEvent(eventName, layerId, data){
	try{
		var extData = [];
		extData[0] = eventName;
		extData[1] = data;
		for(i=0;i<swfObjectsArr.length;i++){
			// check whether this dashboard is related to this layer or not
			if(swfObjectsArr[i].indexOf(layerId) == 0){
	            sendToFlash(getSWFId(swfObjectsArr[i]), "_handleEvent", extData);
	        }
	     }
		 handleEventInExternalWindow("_handleEvent",layerId,extData);
	}catch(err){
		//alert(err);
	}


}

window.onload=function(){
    sessionDetails();
}

window.onbeforeunload = function(event) {
	//method written in dashboardpop.js
	closeAllLaunchDashboards();
}

function createGEFrameObject(){
        var tmpSelectLayerIds = "";
        var tmpSelectedRBRegion = "";
        var tmpSelectedRBRegionModule = "";
        if(parent.selectLayerIds){
            tmpSelectLayerIds = parent.selectLayerIds;
            parent.selectLayerIds="";
        }

        if(parent.selectedRBRegion){
            tmpSelectedRBRegion = parent.selectedRBRegion;
            parent.selectedRBRegion="";
        }

        if(parent.selectedRBRegionModule){
            tmpSelectedRBRegionModule = parent.selectedRBRegionModule;
            parent.selectedRBRegionModule="";
        }
    }

    createGEFrameObject();

	/**
	@function :to perform search on dashboards 
	@param: advancedSearchArgs is an object having:
	advancedSearchArgs Properties - searchCriteria,filterConfiguration,filterMap,filterDashboards,layerId,dashboardId
	searchCriteria - search to be performed on dashboards
    */
    function onSearch(advancedSearchArgs){
		  //do nothing .left  for further senario specific  implementation
	}

	function onSearchArtifacts(advancedSearchArgs){
		try{
			for(i=0;i<swfObjectsArr.length;i++){
				if( (swfObjectsArr[i] == advancedSearchArgs.layerId+"_"+advancedSearchArgs.dashboardId)  || (swfObjectsArr[i] == advancedSearchArgs['swfObjectID'])){
						sendToFlash(getSWFId(swfObjectsArr[i]), "_searchArtifacts", advancedSearchArgs);
						break;
					}
				}
				onSearchDashboardsPopUp(advancedSearchArgs,"_searchArtifacts");
		}catch(err){
				alert("Error :"+err);
		}
	}
		 

	 
	/**
	@function :to perform search on dashboards 
	@param: advancedSearchArgs is an object having:
	advancedSearchArgs Properties - searchCriteria,isApplyToArtifact,isApplyToDashboard,layerId,dashboardId
	searchCriteria - search to be performed on dashboards
    */
	function onSearchDashboards(advancedSearchArgs){
		try{
			for(i=0;i<swfObjectsArr.length;i++){
				if(swfObjectsArr[i].indexOf(advancedSearchArgs.layerId) == 0){
					sendToFlash(getSWFId(swfObjectsArr[i]), "_searchDashboardData", advancedSearchArgs);
				}
			 }
			 onSearchDashboardsPopUp(advancedSearchArgs,"_searchDashboardData");
		}catch(err){
			alert("Error :"+err);
		}
	
	 }
   
	var eventActonsMap = new Array();

/**
@function receives a string carrying event & corresponding function's information & returns a Map
@param: eventActionData :string of events & actions
@param: eventActionKey : layerId_dashboardId
*/
function actionEvts(eventActionData,eventActionKey){
  if(eventActionData != null){
     var eventArray = eventActionData.split(",");
	 var evtActionArray = new Array();
	 if(eventArray.length >0){
	  for(var i = 0;i< eventArray.length;i++){
	     if (eventArray[i] != ";"){
			var eventAction = eventArray[i];
			var localArray = eventAction.split(":");
			evtActionArray[i]=localArray;
			}
		}
		if(!eventActonsMap.hasOwnProperty(eventActionKey) ){
		  eventActonsMap[eventActionKey] = evtActionArray;
		}

	 }
  }
 }

  function actionEvtMap(){
		return eventActonsMap;
    }

function firePreCRUDInterceptOperations(crudOperationObj){
	var operation = crudOperationObj.crudInterceptOperation;
  	if(operation != null){
	 	try{
			return window[operation](crudOperationObj);
		}catch(e){
			showAlert('Error ['+e.message+'] occurred in firePreCRUDInterceptOperations');
		}
	}
}

function firePostCRUDInterceptOperations(crudOperationObj){
	var operation = crudOperationObj.crudInterceptOperation;
	if(operation != null){
		try{
			window[operation](crudOperationObj);
		}catch(e){
			showAlert('Error ['+e.message+'] occurred in firePostCRUDInterceptOperations');
		}

   }
}

 var baseLineThickness=3;
 
 function setLineThickness(numLineThickness) { 
	   baseLineThickness=numLineThickness; 
 }
 
 function onLoadComplete(){
		try {
			getSTViewerIFrame().onLoadComplete();
	    } catch (e) {
	    	//do nothing
	    }
  }

	 
 

</script>

<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="geFrame">
	<param name="id" value="GEFrame" />
	<param name="name" value="GEFrame" />
	<param name="style" value="z-index:1;border: 1px solid silver; height: 100%; width: 100%; position:absolute; left:0px;top:0px;" />
	<param name="wmode" value="transparent" />
	<param name="flashvars"	value="serverUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&coreServerUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&adminServerUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&jsessionId=<%=ESAPI.encoder().encodeForHTML(jsessionId)%>&gekey=<%=ESAPI.encoder().encodeForHTML(geKey)%>&viewmode=<%=ESAPI.encoder().encodeForHTML(viewMode)%>&clientname=<%=ESAPI.encoder().encodeForHTML(clientName)%>&geclientid=<%=ESAPI.encoder().encodeForHTML(geClientId)%>&userId=<%=ESAPI.encoder().encodeForHTML(userId)%>&userName=<%=ESAPI.encoder().encodeForHTML(userName)%>&groupId=<%=ESAPI.encoder().encodeForHTML(groupId)%>&domainId=<%=ESAPI.encoder().encodeForHTML(domainId)%>&moduleId=<%=ESAPI.encoder().encodeForHTML(moduleId)%>&languageId=<%=ESAPI.encoder().encodeForHTML(languageId)%>&languageCd=<%=ESAPI.encoder().encodeForHTML(languageCd)%>&localeChain=<%=ESAPI.encoder().encodeForHTML(languageCd)%>&expandtree=<%=ESAPI.encoder().encodeForHTML(expandTree)%>&selectedLayers=<%=ESAPI.encoder().encodeForHTML(selectedLayers)%>&selectFavorite=<%=ESAPI.encoder().encodeForHTML(selectFavorite)%>&defaultlat=<%=ESAPI.encoder().encodeForHTML(defaultLat)%>&defaultlon=<%=ESAPI.encoder().encodeForHTML(defaultLon)%>&defaultrange=<%=ESAPI.encoder().encodeForHTML(defaultRange)%>&isHighlightPlacemark=<%=ESAPI.encoder().encodeForHTML(isHighlightPlacemark) %>&defaultview=<%=ESAPI.encoder().encodeForHTML(defaultView)%>&rasEnabled=<%=ESAPI.encoder().encodeForHTML(rasEnabled)%>&rasInobxUrl=<%=ESAPI.encoder().encodeForHTML(rasInobxUrl)%>&sessionStatusTimerInterval=<%=sessionStatusTimerInterval%>&apptheme=<%=ESAPI.encoder().encodeForHTML(appTheme)%>&rbHighlightColor=<%=ESAPI.encoder().encodeForHTML(rubberBandHighlightColor)%>&<%if(!StringUtils.isNull(ecoexpml)) {%>ecoexpml=<%=ESAPI.encoder().encodeForHTML(ecoexpml)%>&<%}%>wmode=transparent&noOfMessages=<%=ESAPI.encoder().encodeForHTML(noOfMessages)%>&zoomRange=<%=ESAPI.encoder().encodeForHTML(zoomRange)%>&disableTour=<%=ESAPI.encoder().encodeForHTML(disableTour)%>&disableSound=<%=ESAPI.encoder().encodeForHTML(disableSound)%>&alertOffset=<%=ESAPI.encoder().encodeForHTML(alertOffset)%>&defaultPriority=<%=ESAPI.encoder().encodeForHTML(defaultPriority)%>&enablegs=<%=enableGS%>&<%if(enableGS) {%>gscomponenturl=<%=ESAPI.encoder().encodeForHTML(gsComponentUrl)%>&<%}%><%if(gsLaunchInWindow) {%>gslaunchinwindow=<%=gsLaunchInWindow%>&<%}%><%if(!StringUtils.isNull(pluginJSUrl)) {%>customJSUrlMapPlugin=<%=ESAPI.encoder().encodeForHTML(pluginJSUrl)%>&<%}%><%if(!StringUtils.isNull(layerEventHandlerJSFunction)) {%>layerEventHandlerJSFunction=<%=ESAPI.encoder().encodeForHTML(layerEventHandlerJSFunction)%>&<%}%>alertFile=<%=ESAPI.encoder().encodeForHTML(alertFile)%>&tickerModeId=<%=ESAPI.encoder().encodeForHTML(tickerModeId)%>&mmTickerModeId=<%=ESAPI.encoder().encodeForHTML(mmTickerModeId)%>&alarmModeId=<%=ESAPI.encoder().encodeForHTML(alarmModeId)%>&tourModeId=<%=ESAPI.encoder().encodeForHTML(tourModeId)%>&messageScrollSpeed=<%=ESAPI.encoder().encodeForHTML(messageScrollSpeed)%>&messageScrollCount=<%=ESAPI.encoder().encodeForHTML(messageScrollCount)%>&tourRepeatCount=<%=ESAPI.encoder().encodeForHTML(tourRepeatCount)%>&maxTourAlerts=<%=ESAPI.encoder().encodeForHTML(maxTourAlerts)%>&dashboardsLayout=<%=ESAPI.encoder().encodeForHTML(dashboardsLayout)%>&dashboardsLayoutNumCols=<%=ESAPI.encoder().encodeForHTML(dashboardsLayoutNumCols)%>&dashboardsLayoutNumRows=<%=ESAPI.encoder().encodeForHTML(dashboardsLayoutNumRows)%>&dashboardWidth=<%=ESAPI.encoder().encodeForHTML(dashboardWidth)%>&dashboardHeight=<%=ESAPI.encoder().encodeForHTML(dashboardHeight)%>&autoAckSnoozeInterval=<%=ESAPI.encoder().encodeForHTML(autoAckSnoozeInterval)%>&idColumn=<%=ESAPI.encoder().encodeForHTML(idColumn)%>&autoFitColumns=<%=ESAPI.encoder().encodeForHTML(autoFitColumns)%>&helpUrl=<%=ESAPI.encoder().encodeForHTML(helpUrl)%>&mappingType=<%=ESAPI.encoder().encodeForHTML(mappingType)%>&rbHideSituationRoom=<%=ESAPI.encoder().encodeForHTML(rbHideSituationRoom)%>&rbHideNameEntry=<%=ESAPI.encoder().encodeForHTML(rbHideNameEntry)%>&rbCustomRubberbandRenderer=<%=ESAPI.encoder().encodeForHTML(rbCustomRubberbandRenderer)%>&rbShowDetailsButton=<%=ESAPI.encoder().encodeForHTML(rbShowDetailsButton)%>&rbServerEventsListener=<%=ESAPI.encoder().encodeForHTML(rbServerEventsListener)%>&applyRegionDefault=<%=ESAPI.encoder().encodeForHTML(applyRegionDefault)%>&loginId=<%=ESAPI.encoder().encodeForHTML(loginId)%>&userUniqueId=<%=ESAPI.encoder().encodeForHTML(userUniqueId)%>&measurementSystem=<%=ESAPI.encoder().encodeForHTML(measurementSystem)%>&selectLayerIds=<%=ESAPI.encoder().encodeForHTML(selectLayerIds)%>&selectedRBRegion=<%=ESAPI.encoder().encodeForHTML(selectedRBRegion)%>&selectedRBRegionModule=<%=ESAPI.encoder().encodeForHTML(selectedRBRegionModule)%>" />
	<param name="movie" value="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>ge/viewer/<%=ESAPI.encoder().encodeForHTML((swfName))%>" />

<embed src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>ge/viewer/<%=ESAPI.encoder().encodeForHTML(swfName)%>" quality="high" wmode="transparent" width="100%" height="100%" name="geFrame" align="" type="application/x-shockwave-flash" FlashVars="serverUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&coreServerUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&adminServerUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&jsessionId=<%=ESAPI.encoder().encodeForHTML(jsessionId)%>&gekey=<%=ESAPI.encoder().encodeForHTML(geKey)%>&viewmode=<%=ESAPI.encoder().encodeForHTML(viewMode)%>&clientname=<%=ESAPI.encoder().encodeForHTML(clientName)%>&geclientid=<%=ESAPI.encoder().encodeForHTML(geClientId)%>&userId=<%=ESAPI.encoder().encodeForHTML(userId)%>&userName=<%=ESAPI.encoder().encodeForHTML(userName)%>&groupId=<%=ESAPI.encoder().encodeForHTML(groupId)%>&domainId=<%=ESAPI.encoder().encodeForHTML(domainId)%>&moduleId=<%=ESAPI.encoder().encodeForHTML(moduleId)%>&languageId=<%=ESAPI.encoder().encodeForHTML(languageId)%>&languageCd=<%=ESAPI.encoder().encodeForHTML(languageCd)%>&localeChain=<%=ESAPI.encoder().encodeForHTML(languageCd)%>&expandtree=<%=ESAPI.encoder().encodeForHTML(expandTree)%>&selectedLayers=<%=ESAPI.encoder().encodeForHTML(selectedLayers)%>&selectFavorite=<%=ESAPI.encoder().encodeForHTML(selectFavorite)%>&defaultlat=<%=ESAPI.encoder().encodeForHTML(defaultLat)%>&defaultlon=<%=ESAPI.encoder().encodeForHTML(defaultLon)%>&defaultrange=<%=ESAPI.encoder().encodeForHTML(defaultRange)%>&isHighlightPlacemark=<%=ESAPI.encoder().encodeForHTML(isHighlightPlacemark) %>&defaultview=<%=ESAPI.encoder().encodeForHTML(defaultView)%>&rasEnabled=<%=ESAPI.encoder().encodeForHTML(rasEnabled)%>&rasInobxUrl=<%=ESAPI.encoder().encodeForHTML(rasInobxUrl)%>&sessionStatusTimerInterval=<%=sessionStatusTimerInterval%>&apptheme=<%=ESAPI.encoder().encodeForHTML(appTheme)%>&rbHighlightColor=<%=ESAPI.encoder().encodeForHTML(rubberBandHighlightColor)%>&<%if(!StringUtils.isNull(ecoexpml)) {%>ecoexpml=<%=ESAPI.encoder().encodeForHTML(ecoexpml)%>&<%}%>wmode=transparent&noOfMessages=<%=ESAPI.encoder().encodeForHTML(noOfMessages)%>&zoomRange=<%=ESAPI.encoder().encodeForHTML(zoomRange)%>&disableTour=<%=ESAPI.encoder().encodeForHTML(disableTour)%>&disableSound=<%=ESAPI.encoder().encodeForHTML(disableSound)%>&alertOffset=<%=ESAPI.encoder().encodeForHTML(alertOffset)%>&defaultPriority=<%=ESAPI.encoder().encodeForHTML(defaultPriority)%>&enablegs=<%=enableGS%>&<%if(enableGS) {%>gscomponenturl=<%=ESAPI.encoder().encodeForHTML(gsComponentUrl)%>&<%}%><%if(gsLaunchInWindow) {%>gslaunchinwindow=<%=gsLaunchInWindow%>&<%}%><%if(!StringUtils.isNull(pluginJSUrl)) {%>customJSUrlMapPlugin=<%=ESAPI.encoder().encodeForHTML(pluginJSUrl)%>&<%}%><%if(!StringUtils.isNull(layerEventHandlerJSFunction)) {%>layerEventHandlerJSFunction=<%=ESAPI.encoder().encodeForHTML(layerEventHandlerJSFunction)%>&<%}%>alertFile=<%=ESAPI.encoder().encodeForHTML(alertFile)%>&tickerModeId=<%=ESAPI.encoder().encodeForHTML(tickerModeId)%>&mmTickerModeId=<%=ESAPI.encoder().encodeForHTML(mmTickerModeId)%>&alarmModeId=<%=ESAPI.encoder().encodeForHTML(alarmModeId)%>&tourModeId=<%=ESAPI.encoder().encodeForHTML(tourModeId)%>&messageScrollSpeed=<%=ESAPI.encoder().encodeForHTML(messageScrollSpeed)%>&messageScrollCount=<%=ESAPI.encoder().encodeForHTML(messageScrollCount)%>&tourRepeatCount=<%=ESAPI.encoder().encodeForHTML(tourRepeatCount)%>&maxTourAlerts=<%=ESAPI.encoder().encodeForHTML(maxTourAlerts)%>&dashboardsLayout=<%=ESAPI.encoder().encodeForHTML(dashboardsLayout)%>&dashboardsLayoutNumCols=<%=ESAPI.encoder().encodeForHTML(dashboardsLayoutNumCols)%>&dashboardsLayoutNumRows=<%=ESAPI.encoder().encodeForHTML(dashboardsLayoutNumRows)%>&dashboardWidth=<%=ESAPI.encoder().encodeForHTML(dashboardWidth)%>&dashboardHeight=<%=ESAPI.encoder().encodeForHTML(dashboardHeight)%>&autoAckSnoozeInterval=<%=ESAPI.encoder().encodeForHTML(autoAckSnoozeInterval)%>&idColumn=<%=ESAPI.encoder().encodeForHTML(idColumn)%>&autoFitColumns=<%=ESAPI.encoder().encodeForHTML(autoFitColumns)%>&helpUrl=<%=ESAPI.encoder().encodeForHTML(helpUrl)%>&mappingType=<%=ESAPI.encoder().encodeForHTML(mappingType)%>&rbHideSituationRoom=<%=ESAPI.encoder().encodeForHTML(rbHideSituationRoom)%>&rbHideNameEntry=<%=ESAPI.encoder().encodeForHTML(rbHideNameEntry)%>&rbCustomRubberbandRenderer=<%=ESAPI.encoder().encodeForHTML(rbCustomRubberbandRenderer)%>&rbShowDetailsButton=<%=ESAPI.encoder().encodeForHTML(rbShowDetailsButton)%>&rbServerEventsListener=<%=ESAPI.encoder().encodeForHTML(rbServerEventsListener)%>&applyRegionDefault=<%=ESAPI.encoder().encodeForHTML(applyRegionDefault)%>&loginId=<%=ESAPI.encoder().encodeForHTML(loginId)%>&userUniqueId=<%=ESAPI.encoder().encodeForHTML(userUniqueId)%>&measurementSystem=<%=ESAPI.encoder().encodeForHTML(measurementSystem)%>&selectLayerIds=<%=ESAPI.encoder().encodeForHTML(selectLayerIds)%>&selectedRBRegion=<%=ESAPI.encoder().encodeForHTML(selectedRBRegion)%>&selectedRBRegionModule=<%=ESAPI.encoder().encodeForHTML(selectedRBRegionModule)%>"	>  
</embed> 

</object>




<div id='geFrame' style="z-index:1;"></div>
<div id="geFrameDiv" style="position:absolute;background-color:transparent;border:0px;visibility:hidden"></div>
<div id="dashboardFrameDiv" style="position:absolute;background-color:transparent;border:0px;visibility:hidden;z-index:1"></div>
</body>
</html>