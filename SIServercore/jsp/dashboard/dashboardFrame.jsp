<%@page import="com.spacetimeinsight.stas.config.ConfigurationConstants"%>
<%@page import="com.spacetimeinsight.stas.config.GenericConfigurationManager"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean" %>
<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.CommonConfigUtils" %>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils"%>
<%@page import="java.util.Map" %>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.spacetimeinsight.preferences.PreferenceHelper"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
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
    String expandTree = request.getParameter("expandtree");
    String selectedLayers = request.getParameter("selectedLayers");
    String swfName = request.getParameter("swf");
    String userName = request.getParameter("userName");
    String disableSound = request.getParameter("disableSound");
    String alertOffset = request.getParameter("alertOffset");
    String alarmModeId = null;
    String tickerModeId = null;
    String tourModeId = null;
    String mmTickerModeId = null;
    String autoAckSnoozeInterval = null;
    String messageScrollSpeed = null;
    String messageScrollCount = null; 
	String dashboardsLayout = request.getParameter("dashboardsLayout");
	String loginId = userBean.getLoginId();
	String userUniqueId = userBean.getUserUniqueId();
	 if(StringUtils.isNull(dashboardsLayout)) {
       dashboardsLayout = "";
   }
    String dashboardHelpPath = AdminConfigUtils.getDashboardFrameManual();
		if(!dashboardHelpPath.startsWith("http")){
			dashboardHelpPath = "serverresources/"+dashboardHelpPath;
		}   
     GenericConfigurationManager gcManager = GenericConfigurationManager.getInstance();
        String noOfMessages=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_MAX_MSGS);
        String alertFile=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_FILE);
        if(disableSound==null)
            disableSound=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_DISABLE_SOUND);
        if(alertOffset==null)
            alertOffset=gcManager.getProperty(ConfigurationConstants.CONFIGURATION_NOTIFICATIONS, ServerUtils.PARAM_ALERT_OFFSET);

	String dashboardsLayoutNumCols = request.getParameter("dashboardsLayoutNumCols");
	 if(StringUtils.isNull(dashboardsLayoutNumCols)) {
        dashboardsLayoutNumCols = "";
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

    String appTheme = AdminConfigUtils.getApplicationTheme();
    if (appTheme == null || appTheme.equals("null")) {
        appTheme = "default";
    }

    String jsessionId = "";
    if(request.getSession(false) != null) {
        jsessionId = request.getSession(false).getId();
    }

    if(expandTree == null) {
        expandTree = "";
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

    if(StringUtils.isNull(swfName)) {
        swfName = "DashboardsFrame.swf";
    }
     
    if(StringUtils.isNull(userName)) {
        userName = String.valueOf(userBean.getFirstName())+" "+String.valueOf(userBean.getLastName());
    }
    if(userName == null) {
        userName = "";
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
    if(autoAckSnoozeInterval==null){
        autoAckSnoozeInterval = AdminConfigUtils.getAutoAckSnoozeInterval();
    }

      Map map=PreferenceHelper.getCategoryPreference(userId,moduleId,"Viewer:moduleJSUrl,layerEventHandlerJSFunction");
      
   String moduleJSUrl = (String)map.get("viewer.modulejsurl"); //request.getParameter(ServerUtils.PARAM_CUSTOM_JS_URL_MODULE);
   String layerEventHandlerJSFunction = (String)map.get("viewer.layereventhandlerjsfunction");//request.getParameter(ServerUtils.PARAM_LAYER_EVENT_HANDLER_JS_FUNCTION);
  

%>
<jsp:include page="/common/commonheader.jsp"/>

<jsp:include page="/common/stiSession.jsp"/>

<html lang="en">


<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>Dashboard Frame</title>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/flash_detect.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>js/dashboard/dashboardpopup.js"></script> 
<script type="text/javascript">
	if(!FlashDetect.installed || !FlashDetect.versionAtLeast(10)){
        parent.flashRequired("<bean:message key="flash.required" bundle="admin" />","<bean:message key="flash.url" bundle="admin" />");
    }
</script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>ge/viewer/magma_ajax.js"></script>
<!-- <script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/swfobject.js"></script> -->
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>ge/viewer/motionpack.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>ge/viewer/AC_OETags.js" ></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/flexSessionTimeOut.js" ></script>
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

function hideIFrame(divId){
    document.getElementById(divId).style.visibility="hidden";
}

 function openInfoframe(urlToOpen){
     sendToFlash("dashboardFrame", "_loadInfoframe", urlToOpen);
 }

function openInfoframeById(id, urlToOpen){
     sendToFlash("dashboardFrame", "_loadInfoframeById", id+","+urlToOpen);
 }

function closeInfoFrame(){
     sendToFlash("dashboardFrame", "_closeInfoFrame", '');
 }

 function closeInfoFrameById(id){
     sendToFlash("dashboardFrame", "_closeInfoFrameById", id);
 }
 
 //get the title for the specific dashboard.
function getDashboardTitle(dashboardId){
	return sendToFlash("dashboardFrame", "_getDashboardTitle", dashboardId);
}

//close the launcher dashboard
function closeDashboardById(dashboardId){
	sendToFlash("dashboardFrame", "_closeDashboardById", dashboardId);
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
        //swfObjectsArr.push("swf_"+iframeId);
        swfObjectsArr.push(iframeId);
        //set the zindex for the div id
        bringDivToBack(divId, iframeId);
    }
    if(url.indexOf('?') >= 0) {
        url += "&"+Math.random();
    } else {
        url += "?"+Math.random();
    }
    divObj.innerHTML = "<iframe id='"+iframeId+"' name='"+iframeId+"' src='" + url + "'frameborder='0'></iframe>";

}

/**
* This method builds a call to java script function with params which can be sent to js function.
* @param functionName name of the javascript function name
* @param params a string with key=value and colon delimiter for multiple key value pairs.params could also be a javascript object
* invoke callScriptDashboardFunction("testJSMethod","layerId=1:artifactName=test:ecoexmpl=test.ecoxpml")
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

function _enableWindowControls(dashboardDivId, flag) {
	try {
        return sendToFlash("dashboardFrame", "_enableWindowControls", dashboardDivId + "," + flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while data loading on the dashboardcontrolbar dashboardDivI/flag');
    }

    return "";
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

function bringDivToFront(divId,iframeId){
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

function removeIFrame(divId,iframeId){
    var divObj = document.getElementById(divId);
    //var index = swfObjectsArr.indexOf("swf_"+iframeId);
    var index = swfObjectsArr.indexOf(iframeId);
    sendToFlash(getSWFId(iframeId), "_closeWindow", "");
    swfObjectsArr.remove(index);
    divObj.parentNode.removeChild(divObj);
}

function getModuleId(){
	return <%=ESAPI.encoder().encodeForHTML(moduleId)%>;
}
function getSWFId(iframeId) {
    return "swf_"+iframeId.replaceAll(" ","_");
}

function closeInfoFrame(){
     invokeFlashMethod("_closeInfoFrame", '');
 }

 function closeInfoFrameById(id){
     invokeFlashMethod("_closeInfoFrameById", id);
 }
 
  	//Method is used to internalize the external dashboard.
 	function popIn(layerId,dashboardName, url, title){
		var params = {};
		params["layerId"] = layerId;
		params["dashboardName"] = dashboardName;
		params["title"] = title;
		params["url"] = url;
		sendToFlash("dashboardFrame", "_popIn", params);
	 }

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
function closeDependentDashboards(layerID){
	if(dependentDashboards.hasOwnProperty(layerID)){
		closeDashboardById(dependentDashboards[layerID]);
		var launchDashboardIds = getLaunchDashboardIds(dependentDashboards[layerID]);
		closeLaunchDashboardById(launchDashboardIds);
		delete dependentDashboards[layerID];
	}
}
function getLaunchDashboardIds(dashboardIds){
	return sendToFlash("dashboardFrame", "_getLaunchDashboardIds", dashboardIds);
}
function openLayerDashboardByLayerName(layerName, dashboardName, title){
	var layerId = getLayerId(layerName);
	openOrRefreshLayerDashboard(layerId,layerName,dashboardName,'',title);
}
function openLayerDashboardByLayerNameWithParams(layerName, dashboardName, params,title){
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
	var layerId = getLayerId(layerName);
	openOrRefreshLayerDashboard(layerId,layerName,dashboardName,finalParams,title);
}

 function getSwfObjectsPopup(){
	try {
		var data = getSwfObjectsPopupCollection();
		if(data != null){
				sendToFlash("dashboardFrame", "_getSwfObjectsPopup",data);
			} 
		}catch (e) {
			alert('Error ['+e.message+'] occurred while getting the SWF Objects Popup in loadswf');
		}
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

	invokeFlashMethod("_openLayerDashboard", dashboardObj);
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

	invokeFlashMethod("_changeLayerDashboardState", dashboardObj);
}
 
function setLayerDashboardTitle(layerId, layerName, dashboardName, title) {
	var dashboardObj = new Object();
	dashboardObj.layerId = layerId;
	dashboardObj.layerName = layerName;
	dashboardObj.dashboardName = dashboardName;
	dashboardObj.title = title;

	invokeFlashMethod("_setLayerDashboardTitle", dashboardObj);
}

function getLayerDashboardState(layerId, layerName, dashboardName) {
	var dashboardObj = new Object();
	dashboardObj.layerId = layerId;
	dashboardObj.layerName = layerName;
	dashboardObj.dashboardName = dashboardName;

	return invokeFlashMethod("_getLayerDashboardState", dashboardObj);	
}

function closeLayerDashboard(layerId, layerName, dashboardName) {
	var dashboardObj = new Object();
	dashboardObj.layerId = layerId;
	dashboardObj.layerName = layerName;
	dashboardObj.dashboardName = dashboardName;

	invokeFlashMethod("_closeLayerDashboard", dashboardObj);
}

function getLayerId(layerName) {
	return sendToFlash("dashboardFrame","_getLayerId", layerName);
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


function refreshWindows() {
    refreshDashboards('');
}

function openHelpWindow(){
	var helpWindow = window.open('','dashboardFrameManual', 'width='+screen.width/2+',height='+screen.height+', resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no,scrollbars=no');
	helpWindow.document.write('<html><head><title>Dashboard Frame User Guide</title></head><body topmargin="0" leftmargin="0"><iframe src="<%=ESAPI.encoder().encodeForHTML(dashboardHelpPath) %>" id="ifrm" name="ifrm" width="100%" height="100%"></iframe></body></html>');
	helpWindow.document.close();
}
function refreshDashboards(layerName) {
    try{
        for(i=0;i<swfObjectsArr.length;i++){
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



/**
 * @param params:Array - holds
 *  params[0] = All event details semicolan & space seperated
 *  params[1] = ecosystem session Id
 *  params[2] = dashbaord id
 */
function registerDashboardForEvents(params) {
    invokeFlashMethod("_registerDashboardRefreshOnEvents", params);
}

function enableAutoRefresh(flag) {
    try {
        window.frames["geIFrame"].enableAutoRefresh(flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while enabling autorefresh');
    }
}

function enableMouseListeners(flag) {
    try {
        window.frames["geIFrame"].enableMouseListeners(flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while enabling mouselisteners');
    }
}

function invokeFlashMethod(methodName, methodArgs) {
    sendToFlash("dashboardFrame", methodName, methodArgs);
}

function _selectLayers(layers) {
    invokeFlashMethod("_selectLayers", layers);
}

function _selectLayersById(layerIds) {
    invokeFlashMethod("_selectLayersById", layerIds);
}

function _deSelectLayers(layers) {
    invokeFlashMethod("_deSelectLayers", layers);
}

function enableFrame(flag){
    invokeFlashMethod("_enableFrame", flag);
}

function _refreshTimeLayers(){
    invokeFlashMethod("_refreshTimeLayers");
}

function selectRow(id){
    invokeFlashMethod("_selectRow", id);
}

function addFeature(id, coordsStr, featuretype){
    invokeFlashMethod("_addFeature", featuretype+":"+id+":"+coordsStr);
}

function _setTimeRange(timeStr){
    invokeFlashMethod("_setTimeRange", timeStr);
}

//Refresh dashboard, on basis of time
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

function addLayer(name, url, isSelect, id) {
    invokeFlashMethod("_addLayer", name+","+url+","+isSelect+","+id);
}

/* empty stub methods - start*/
function _getCurrentBoundingBox() {
    return '';
}

function _highlight(coordStr) {
}

function _setHighlightPlacemarkUrl(url) {
}

function _setHighlightPlacemarkStyle(style) {
}

function _lookat(coordStr) {
}

function getViewFormatParams() {
    return '';
}

function _refreshLink(name){
    invokeFlashMethod("_refreshLayer", name);
}

function _showControls(dashboardDivId, flag) {
	try {
        return sendToFlash("dashboardFrame", "_showControls", dashboardDivId + "," + flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while getting the show/hide the dashboardcontrolbar flag');
    }

    return "";
}

var msgs="";
function showMessages(messages){
   msgs = messages;
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
            sendToFlash(getSWFId(swfObjectsArr[i]), "_refreshDataGrid", _headers);
        }
     }
}
function ackAllEventMessages(_selectedEventId){
    invokeFlashMethod("_ackAllEventMessages", _selectedEventId);
}
//disable/enable periodic refresh on drag drop of dashboards
function callOffPeriodicRefresh(message){
    //alert(message);
	var i;
	for(i=0;i<swfObjectsArr.length;i++){
		sendToFlash(getSWFId(swfObjectsArr[i]), "_disablePeriodicRefresh", message);
	}
}
//Google_Print_Preview 
function _getDashboardImage(iframeId) {
	var swfId = getSWFId(iframeId);
	sendToFlash(swfId,"_getDashboardImage");
} 

function _getSelectedSessionIdsStr(layerId,dashboardId,isPopOut) {
    try {
       var selectedSessIdsStr = sendToFlash("dashboardFrame", "_getSelectedSessIdsStrForPriPrev");
       if(isPopOut)	{   
           sendToFlashFromPopUp(layerId +"_" + dashboardId + "_popup", "_getSelSessIdsStrForPrintPrev", selectedSessIdsStr);
       }else {
  	      sendToFlash(getDashboardSWFId(layerId,dashboardId), "_getSelSessIdsStrForPrintPrev", selectedSessIdsStr);
  	   }
   } catch (e) {
       alert('Error ['+e.message+'] occurred while selecting the getting the selected sessionIds ids in loadswf');
   }
   return "";
}

window.onbeforeunload = function(event) {
	//method written in dashboardpop.js
	closeAllLaunchDashboards();
}

function _imageForPrint(data) {
	sendToFlash("dashboardFrame","_imageForPrint",data);
}
/* empty stub methods - end*/
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

// duplicate method
/*
function bringDivToFront(divId, iframeId){
    try {
        var div = document.getElementById(divId);
        if(div) {
            div.style.zIndex = 4;
            //to send the callback to dashboard on maximize the dashboard for dashboard action events
            sendToFlash(getSWFId(iframeId), "_closeWindow", "");
        }
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while bringing the div to front');
    }
}
*/

// duplicate method
/* 
	function bringDivToBack(divId, iframeId){
    try {
        var div = document.getElementById(divId);
        if(div) {
            div.style.zIndex = 3;
            //to send the callback to dashboard on minimize the dashboard for dashboard action events
            sendToFlash(getSWFId(iframeId), "_closeWindow", "");
        }
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while bringing the div to front');
    }
}
*/

function sendToFlash(swfObjectName, method, data) {
    try {
        var flashMovie = getFlashMovieObject(swfObjectName);
        return flashMovie.callFlashFromJS(method, data);
    }
    catch (e) {
        //alert('Error ['+e.message+'] occurred while calling a function on the flash object');
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

function redirectToLoginPage() {
    parent.refreshSessionInvalid();
}

function deselectLayers(layer){	
	deselectLayersByName(layer);
}
/*
function createFrameObject(){
	var tmpSelectLayerIds = "";
	var tmpSelectedRBRegion = "";
	var tmpSelectedRBRegionModule = "";
	if(parent.selectLayerIds){
	    tmpSelectLayerIds = parent.selectLayerIds;
	}
	
	if(parent.selectedRBRegion){
	    tmpSelectedRBRegion = parent.selectedRBRegion;
	}
	
	if(parent.selectedRBRegionModule){
	    tmpSelectedRBRegionModule = parent.selectedRBRegionModule;
	}
	
	var flashvars = {};
    var params = {serverUrl: "<%=ESAPI.encoder().encodeForHTML(serverUrl)%>",
                            coreServerUrl: "<%=ESAPI.encoder().encodeForHTML(serverUrl)%>",
                            adminServerUrl: "<%=ESAPI.encoder().encodeForHTML(serverUrl)%>",
                            jsessionId: "<%=ESAPI.encoder().encodeForHTML(jsessionId)%>",
                            userId: "<%=ESAPI.encoder().encodeForHTML(userId)%>",
                            groupId: "<%=ESAPI.encoder().encodeForHTML(groupId)%>",
                            domainId: "<%=ESAPI.encoder().encodeForHTML(domainId)%>",
                            moduleId: "<%=ESAPI.encoder().encodeForHTML(moduleId)%>",
                            languageId: "<%=ESAPI.encoder().encodeForHTML(languageId)%>",
                            languageCd: "<%=ESAPI.encoder().encodeForHTML(languageCd)%>",
                            localeChain: "<%=ESAPI.encoder().encodeForHTML(languageCd)%>",
                            expandtree: "<%=ESAPI.encoder().encodeForHTML(expandTree)%>",
                            selectedLayers: "<%=ESAPI.encoder().encodeForHTML(selectedLayers)%>",
                            selectLayerIds: tmpSelectLayerIds,
                            theme: "<%=ESAPI.encoder().encodeForHTML(appTheme)%>",
							dashboardsLayout:"<%=ESAPI.encoder().encodeForHTML(dashboardsLayout)%>",
							dashboardsLayoutNumCols:"<%=ESAPI.encoder().encodeForHTML(dashboardsLayoutNumCols)%>",
							dashboardsLayoutNumRows:"<%=ESAPI.encoder().encodeForHTML(dashboardsLayoutNumRows)%>",
							dashboardWidth:"<%=ESAPI.encoder().encodeForHTML(dashboardWidth)%>",
							dashboardHeight:"<%=ESAPI.encoder().encodeForHTML(dashboardHeight)%>",
							<%if(!StringUtils.isNull(layerEventHandlerJSFunction)) {%>layerEventHandlerJSFunction:"<%=ESAPI.encoder().encodeForHTML(layerEventHandlerJSFunction)%>",<%}%>
                            userName: "<%=ESAPI.encoder().encodeForHTML(userName)%>",
                            alertFile:"<%=ESAPI.encoder().encodeForHTML(alertFile)%>",
                            disableSound:"<%=ESAPI.encoder().encodeForHTML(disableSound)%>",
                            alertOffset:"<%=ESAPI.encoder().encodeForHTML(alertOffset)%>",
                            noOfMessages:"<%=ESAPI.encoder().encodeForHTML(noOfMessages)%>",
                            tickerModeId:"<%=ESAPI.encoder().encodeForHTML(tickerModeId)%>",
                            mmTickerModeId:"<%=ESAPI.encoder().encodeForHTML(mmTickerModeId)%>",
                            alarmModeId:"<%=ESAPI.encoder().encodeForHTML(alarmModeId)%>",
                            tourModeId:"<%=ESAPI.encoder().encodeForHTML(tourModeId)%>",
                            messageScrollSpeed:"<%=ESAPI.encoder().encodeForHTML(messageScrollSpeed)%>",
                            messageScrollCount:"<%=ESAPI.encoder().encodeForHTML(messageScrollCount)%>",
                            autoAckSnoozeInterval:"<%=ESAPI.encoder().encodeForHTML(autoAckSnoozeInterval)%>",
							loginId:"<%=ESAPI.encoder().encodeForHTML(loginId)%>",
							userUniqueId:"<%=ESAPI.encoder().encodeForHTML(userUniqueId)%>",		
                            wmode:"transparent"};
    var attributes = {
    			id: "DashboardsFrame",
    			name: "DashboardsFrame",
    			style: "z-index:1;border: 1px solid silver; height: 100%; width: 100%; position:absolute; left:0px;top:0px;",
    			wmode:"transparent"
    };
    var geFrameUrl = "<%=ESAPI.encoder().encodeForHTML(ESAPI.encoder().encodeForHTML(serverUrl))%>swf/<%=ESAPI.encoder().encodeForHTML(swfName)%>";
    swfobject.embedSWF(geFrameUrl, "dashboardFrame", "100%", "100%", "9.0.0",flashvars, params, attributes);
}
createFrameObject();
*/

/*
 * Called when the layer is selected/deselected in dashboard frame
 */
function layerSelected(layerName, isSelected) {
	try {
		if(!isSelected){
			clearDashboardActionEventMap(layerName);
        	closeDependentDashboards(layerName);
		}
	}catch (e) {
        showAlert('Error ['+e.message+'] occurred while in calling select layer for '+layername);
    }
}

/*
 * called when layer is unselected to clear the dashboardactioneventmap cache 
 */
function clearDashboardActionEventMap(layerId) {
	var eventMap = actionEvtMap();
	var key;
	if(layerId != null && eventMap != null){
		for (key in eventMap) {
			var keys = key.split("_");
			if(keys != null && keys[0] == layerId){
				delete  actionEvtMap()[key];
			}
		}
	}
}

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
			if((swfObjectsArr[i] == advancedSearchArgs.layerId+"_"+advancedSearchArgs.dashboardId)  || (swfObjectsArr[i] == advancedSearchArgs['swfObjectID'])){
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
		//alert(err);
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
function _enableWindowControls(dashboardDivId, flag) {
	try {
        return sendToFlash("dashboardFrame", "_enableWindowControls", dashboardDivId + "," + flag);
    } catch (e) {
        showAlert('Error ['+e.message+'] occurred while data loading on the dashboardcontrolbar dashboardDivI/flag');
    }

    return "";
}
</script>


<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"  width="100%" height="100%" id="DashboardFrame"> 
<param name="id" value="DashboardFrame" /> 
<param name="name" value="DashboardFrame" /> 
<param name="movie"   value="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>swf/<%=ESAPI.encoder().encodeForHTML(swfName)%>" /> 
<param name="quality" value="high" /> 
<param name="wmode" value="transparent" />
<param name="flashvars" value= "serverUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&coreServerUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&adminServerUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&jsessionId=<%=ESAPI.encoder().encodeForHTML(jsessionId)%>&userId=<%=ESAPI.encoder().encodeForHTML(userId)%>&groupId=<%=ESAPI.encoder().encodeForHTML(groupId)%>&domainId=<%=ESAPI.encoder().encodeForHTML(domainId)%>&moduleId=<%=ESAPI.encoder().encodeForHTML(moduleId)%>&languageId=<%=ESAPI.encoder().encodeForHTML(languageId)%>&languageCd=<%=ESAPI.encoder().encodeForHTML(languageCd)%>&localeChain=<%=ESAPI.encoder().encodeForHTML(languageCd)%>&expandtree=<%=ESAPI.encoder().encodeForHTML(expandTree)%>&selectedLayers=<%=ESAPI.encoder().encodeForHTML(selectedLayers)%>&theme=<%=ESAPI.encoder().encodeForHTML(appTheme)%>&dashboardsLayout=<%=ESAPI.encoder().encodeForHTML(dashboardsLayout)%>&dashboardsLayoutNumCols=<%=ESAPI.encoder().encodeForHTML(dashboardsLayoutNumCols)%>&dashboardsLayoutNumRows=<%=ESAPI.encoder().encodeForHTML(dashboardsLayoutNumRows)%>&dashboardWidth=<%=ESAPI.encoder().encodeForHTML(dashboardWidth)%>&dashboardHeight=<%=ESAPI.encoder().encodeForHTML(dashboardHeight)%>&<%if(!StringUtils.isNull(layerEventHandlerJSFunction)) {%>layerEventHandlerJSFunction=<%=ESAPI.encoder().encodeForHTML(layerEventHandlerJSFunction)%>&<%}%>userName=<%=ESAPI.encoder().encodeForHTML(userName)%>&alertFile=<%=ESAPI.encoder().encodeForHTML(alertFile)%>&disableSound=<%=ESAPI.encoder().encodeForHTML(disableSound)%>&alertOffset=<%=ESAPI.encoder().encodeForHTML(alertOffset)%>&noOfMessages=<%=ESAPI.encoder().encodeForHTML(noOfMessages)%>&tickerModeId=<%=ESAPI.encoder().encodeForHTML(tickerModeId)%>&mmTickerModeId=<%=ESAPI.encoder().encodeForHTML(mmTickerModeId)%>&alarmModeId=<%=ESAPI.encoder().encodeForHTML(alarmModeId)%>&tourModeId=<%=ESAPI.encoder().encodeForHTML(tourModeId)%>&messageScrollSpeed=<%=ESAPI.encoder().encodeForHTML(messageScrollSpeed)%>&messageScrollCount=<%=ESAPI.encoder().encodeForHTML(messageScrollCount)%>&autoAckSnoozeInterval=<%=ESAPI.encoder().encodeForHTML(autoAckSnoozeInterval)%>&loginId=<%=ESAPI.encoder().encodeForHTML(loginId)%>&userUniqueId=<%=ESAPI.encoder().encodeForHTML(userUniqueId)%>&wmode=transparent" />


<embed src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>swf/<%=ESAPI.encoder().encodeForHTML(swfName)%>" wmode="transparent" quality="high" width="100%" height="100%" name="dashboardFrame" align="" type="application/x-shockwave-flash" FlashVars="serverUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&coreServerUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&adminServerUrl=<%=ESAPI.encoder().encodeForHTML(serverUrl)%>&jsessionId=<%=ESAPI.encoder().encodeForHTML(jsessionId)%>&userId=<%=ESAPI.encoder().encodeForHTML(userId)%>&groupId=<%=ESAPI.encoder().encodeForHTML(groupId)%>&domainId=<%=ESAPI.encoder().encodeForHTML(domainId)%>&moduleId=<%=ESAPI.encoder().encodeForHTML(moduleId)%>&languageId=<%=ESAPI.encoder().encodeForHTML(languageId)%>&languageCd=<%=ESAPI.encoder().encodeForHTML(languageCd)%>&localeChain=<%=ESAPI.encoder().encodeForHTML(languageCd)%>&expandtree=<%=ESAPI.encoder().encodeForHTML(expandTree)%>&selectedLayers=<%=ESAPI.encoder().encodeForHTML(selectedLayers)%>&theme=<%=ESAPI.encoder().encodeForHTML(appTheme)%>&dashboardsLayout=<%=ESAPI.encoder().encodeForHTML(dashboardsLayout)%>&dashboardsLayoutNumCols=<%=ESAPI.encoder().encodeForHTML(dashboardsLayoutNumCols)%>&dashboardsLayoutNumRows=<%=ESAPI.encoder().encodeForHTML(dashboardsLayoutNumRows)%>&dashboardWidth=<%=ESAPI.encoder().encodeForHTML(dashboardWidth)%>&dashboardHeight=<%=ESAPI.encoder().encodeForHTML(dashboardHeight)%>&<%if(!StringUtils.isNull(layerEventHandlerJSFunction)) {%>layerEventHandlerJSFunction=<%=ESAPI.encoder().encodeForHTML(layerEventHandlerJSFunction)%>&<%}%>userName=<%=ESAPI.encoder().encodeForHTML(userName)%>&alertFile=<%=ESAPI.encoder().encodeForHTML(alertFile)%>&disableSound=<%=ESAPI.encoder().encodeForHTML(disableSound)%>&alertOffset=<%=ESAPI.encoder().encodeForHTML(alertOffset)%>&noOfMessages=<%=ESAPI.encoder().encodeForHTML(noOfMessages)%>&tickerModeId=<%=ESAPI.encoder().encodeForHTML(tickerModeId)%>&mmTickerModeId=<%=ESAPI.encoder().encodeForHTML(mmTickerModeId)%>&alarmModeId=<%=ESAPI.encoder().encodeForHTML(alarmModeId)%>&tourModeId=<%=ESAPI.encoder().encodeForHTML(tourModeId)%>&messageScrollSpeed=<%=ESAPI.encoder().encodeForHTML(messageScrollSpeed)%>&messageScrollCount=<%=ESAPI.encoder().encodeForHTML(messageScrollCount)%>&autoAckSnoozeInterval=<%=ESAPI.encoder().encodeForHTML(autoAckSnoozeInterval)%>&loginId=<%=ESAPI.encoder().encodeForHTML(loginId)%>&userUniqueId=<%=ESAPI.encoder().encodeForHTML(userUniqueId)%>&wmode=transparent"> 
</embed> 

</object>

<div id='dashboardFrame' style="z-index:1"></div>
<div id="dashboardFrameDiv" style="position:absolute;background-color:transparent;border:0px;visibility:hidden;z-index:1"></div>
</body>
</html>