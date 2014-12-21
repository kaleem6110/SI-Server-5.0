<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils" %>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
<%
    if(session == null || session.getAttribute(ServerUtils.USER_BEAN_NAME) == null){
        response.sendRedirect("/");
        return;
    }
    UserBean userBean = (UserBean) session.getAttribute(ServerUtils.USER_BEAN_NAME);
    String serverUrl = ServerUtils.getServerContextBaseUrl(request);
    //Changes made if the Dashboard Id contains #
    String url = request.getParameter("url")== null ?"":request.getParameter("url");
	if("".equalsIgnoreCase(url)){
	%>
	<script type="text/javascript">
		alert('Unsafe Characters for DashBoardId: !,(,),=,{,[,<,>,?,~,%,+,\,comma(,),#,&,",');
	</script>
	<%
	}
    String qString="";
    String swfObject = request.getParameter("swfobject");
    String width = request.getParameter("width");
    String height = request.getParameter("height");
    String ispercentage = request.getParameter("ispercentage");
    String isNewWindow = request.getParameter("isnewwindow");
    String jsParent = "true".equals(isNewWindow) ? "opener" : "parent";
    String title = request.getParameter("title");
    String defaultRange = AdminConfigUtils.getVisibleRange();
    String isHighlightPlacement = AdminConfigUtils.getHighlightPlacemark();
	String csvRowCount = AdminConfigUtils.getCSVNoOfRows();
	String csvColumnCount = AdminConfigUtils.getCSVNoOfColumns();
    String visibleRange = AdminConfigUtils.getVisibleRange();
    String languageCd = request.getParameter("languageCd");
    boolean isXcelsius =  url!=null && url.indexOf("?")>=0 && url.indexOf("xcelcius")>=0; 
    String dashboardJSUrl = request.getParameter(ServerUtils.PARAM_CUSTOM_JS_URL_DASHBOARD);
	boolean isLaunchInExternalWindow = "true".equals(request.getParameter("isLaunchInExternalWindow"))?true:false;
	 
	 int index = url.indexOf("?");
	 if(index > 0) {
		 qString =url.substring(index+1, url.length());
		 if(qString.indexOf("~") >= 0) {
			 qString=qString.replace("~","%26");
		 }
		 url = url.substring(0,index);
	 }
	 if(StringUtils.isNull(userBean.getUserUniqueId())){
		 //DB
	 	qString += "&userId=" + userBean.getUserId();
	 }else{
		 //LDAP
		 qString += "&userId=" + userBean.getUserUniqueId();
	 }
 
 	//this parameter used in dashboard control bar to hide popup button in pop up dashboard 
	if(isLaunchInExternalWindow)
	{
		qString += "&isLaunchInExternalWindow=true";
	}else{
		qString += "&isLaunchInExternalWindow=false";
	}
    
    if(title == null) {
        title = "Space-Time Insight SWF Plugin";
    }
    if(swfObject == null) {
        swfObject = "swfObject";
    }
    if(width == null) {
        width = "100";
    }

    if(height == null) {
        height = "100";
    }
    
    //Modified the following code for 11433,the value of width and height should not be more than 100 if ispercentage is true.
    //This is because scaling of SWF files is not in sync with scaling of JSP file.
    if(ispercentage == null || "true".equals(ispercentage)) {
        if(StringUtils.getInt(width) >= 100){
            width = "100%";
        }else{
            width+= "%";
        }
        if(StringUtils.getInt(height) >= 100){
            height = "100%";
        }else{
            height+= "%";
        }
    }

    if(swfObject != null) {
        swfObject = swfObject.trim();
        swfObject = swfObject.replace(" ", "_");
        if(isXcelsius) {
            swfObject = swfObject.replace(".", "_");
        }
        }
    

    if(StringUtils.isNull(languageCd)) {
        languageCd = userBean.getLanguageCd();
    }
    if(languageCd == null) {
        languageCd = "";
    }
    if(isHighlightPlacement!=null){
         qString = qString+"&isHighlightPlacemark="+isHighlightPlacement;
    }
	if(csvRowCount!=null){
         qString = qString+"&csvNoOfRows="+csvRowCount;
    } 
	 if(csvColumnCount!=null){
         qString = qString+"&csvNoOfColumns="+csvColumnCount;
    } 
    if(visibleRange!=null){
        qString = qString+"&visibleRange="+visibleRange;
    }
    if(isXcelsius) {
       url = url+"?localeChain="+languageCd; 
    } else {
       qString = qString+"&localeChain="+languageCd;
    }
 
%>
<HTML>
<HEAD>
<TITLE><%=ESAPI.encoder().encodeForHTML(title)%></TITLE>

<!-- <script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/swfobject.js"></script> -->
<script type="text/javascript">
var _jsParent = <%="opener".equals(jsParent)%>?opener : parent;
var isInternetExplorer = navigator.appName.indexOf("Microsoft") != -1;
var flashObjId = "swf_<%=ESAPI.encoder().encodeForHTML(swfObject)%>";

<%
    if(isXcelsius) {
%>
//commented out as there is an error, this will make the xcelsius-dashboard communication not work.
// Handle all the FSCommand messages in a Flash movie.
function swf_<%=ESAPI.encoder().encodeForHTML(swfObject)%>_DoFSCommand(command, args) {
    //alert(command);
    var fsc_FlashIDEObj = isInternetExplorer ? document.all["swf_<%=ESAPI.encoder().encodeForHTML(swfObject)%>"] : document["swf_<%=ESAPI.encoder().encodeForHTML(swfObject)%>"];
    var fargs = args.split(",");
    try {
        this[command].apply(null, fargs);
    }
    catch (e) {
        alert("function = ["+command+"] does not exist for the arguments ["+args+"]");
    }

}
// Hook for Internet Explorer.
if (navigator.appName && navigator.appName.indexOf("Microsoft") != -1 && navigator.userAgent.indexOf("Windows") != -1 && navigator.userAgent.indexOf("Windows 3.1") == -1) {
    document.write('<script language=\"VBScript\"\>\n');
    document.write('On Error Resume Next\n');
    document.write('Sub swf_<%=ESAPI.encoder().encodeForHTML(swfObject)%>_FSCommand(ByVal command, ByVal args)\n');
    document.write('    Call swf_<%=ESAPI.encoder().encodeForHTML(swfObject)%>_DoFSCommand(command, args)\n');
    document.write('End Sub\n');
    document.write('</script\>\n');
}

<%
    }
%>

function refreshDashboards(layerName, dashboardIdToExlcude) {
    try {
        <%=jsParent%>.refreshDashboards(layerName, dashboardIdToExlcude);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while refreshing dashboards for the layer ['+layerName+']');
    }
}

function refreshDashboard(layerName, dashboardId) {
    try {
        <%=jsParent%>.refreshDashboard(layerName, dashboardId) ;
    } catch (e) {
        alert('Error ['+e.message+'] occurred while refreshing the dashboard ['+ dashboardId+'] for the layer ['+layerName+']');
    }
}


function _refresh(){
    try {
        <%=jsParent%>._refresh();
    } catch (e) {
        alert('Error ['+e.message+'] occurred while refreshing');
    }
}

function _getSelectedSessionIdsStr(layerId,dashboardId,isPopOut) {
    try {
        return <%=jsParent%>._getSelectedSessionIdsStr(layerId,dashboardId,isPopOut);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while selecting the getting the selected session ids in loadswf');
    }
    return "";
 }

function _refreshLink(name){
    try {
        <%=jsParent%>._refreshLink(name);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while refreshing link ['+name+']');
    }
}


function _refreshLinkWithParameters(name, params) {
    try {
       <%=jsParent%>._refreshLinkWithParameters(name, params);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while refreshing link ['+name+'] with parameters ['+params+']');
    }
}

function _lookat(coordStr,rangeStr) {
    try {
       if(!rangeStr  || rangeStr =="" || rangeStr == 0 ){
               <%=jsParent%>._lookat(coordStr,<%=ESAPI.encoder().encodeForHTML(defaultRange) %>);
        }else{
               <%=jsParent%>._lookat(coordStr,rangeStr);
            }
    
    } catch (e) {
        alert('Error ['+e.message+'] occurred while calling lookingat');
    }
}

function getModuleId(){
	return <%=jsParent%>.getModuleId();
}

function _highlight(coordStr,dashboardId,layerId) {
    try {
        <%=jsParent%>._highlight(coordStr,dashboardId,layerId);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while calling highlight');
    }
}

function _setHighlightPlacemarkUrl(url) {
    try {
        <%=jsParent%>._setHighlightPlacemarkUrl(url);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while calling set highlight placemark url');
    }
}

function _setHighlightPlacemarkStyle(style) {
    try {
        <%=jsParent%>._setHighlightPlacemarkStyle(style);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while calling set highlight placemark style');
    }
}

function _refreshTimeLayers() {
    try {
        <%=jsParent%>._refreshTimeLayers();
    } catch (e) {
        alert('Error ['+e.message+'] occurred while refreshing the time layers');
    }
}

function _setTimeRange(timeStr){
    try {
        <%=jsParent%>._setTimeRange(timeStr);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while setting the time ['+timeStr+']');
    }
}

//Refresh dashboard on time basis
 function _setDashboardTime(timeRange,layerId,refreshDashboardIds,excludeDashboardId) {
	try {
        <%=jsParent%>._setDashboardTime(timeRange,layerId,refreshDashboardIds,excludeDashboardId);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while setting the Dashboard time');
    }
 }

function getLayerId(layerName) {
    try {
        return <%=jsParent%>.getLayerId(layerName);
    } catch (e) {
        alert('Error ['+e.message+'] occurred in getLayerId for ['+layerName+']');
    }

	return "";
}

function invokeDashboardMethod(layerId, dashboardId, methodName, methodParams) {
    try {
        return <%=jsParent%>.invokeDashboardMethod(layerId, dashboardId, methodName, methodParams);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while invoking dashboard method for ['+layerId+','+dashboardId+']');
    }

	return "";
}

function openInfoframe(urlToOpen){
     try {
        <%=jsParent%>.openInfoframe(urlToOpen);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while opening the info frame ['+urlToOpen+']');
    }
 }

function openInfoframeById(id, urlToOpen){
     try {
        <%=jsParent%>.openInfoframeById(id, urlToOpen);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while opening the info frame by id ['+urlToOpen+']');
    }
 }

 function openInfoframe(urlToOpen){
     try {
        <%=jsParent%>.openInfoframe(urlToOpen);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while opening the info frmae ['+urlToOpen+']');
    }
 }

function closeInfoFrame(){
     try {
        <%=jsParent%>.closeInfoFrame();
    } catch (e) {
        alert('Error ['+e.message+'] occurred while closing the infoframe');
    }
 }

 function closeInfoFrameById(id){
     try {
        <%=jsParent%>.closeInfoFrameById(id);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while closing the info frame by id');
    }
 }

function existsLayerDashboard(layerId, dashboardName) {
	  try {
		return <%=jsParent%>.existsLayerDashboard(layerId, dashboardName);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while opening the layer dashboard = ['+dashboardName+']');
    }
}
function openLayerDashboardByLayerNames(parentLayerName,layerName, dashboardName, title){
	   try {
        <%=jsParent%>.openLayerDashboardByLayerNames( parentLayerName,layerName, dashboardName,  title);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while opening the dashboard by openLayerDashboardByLayerNames = ['+dashboardName+']');
    }    
}
function openLayerDashboardByLayerName(layerName, dashboardName, title){
	   try {
        <%=jsParent%>.openLayerDashboardByLayerName( layerName, dashboardName,  title);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while opening the dashboard by openLayerDashboardByLayerName = ['+dashboardName+']');
    }    
}
function openLayerDashboardByLayerNameWithParams(layerName, dashboardName, params,title){
	   try {
        <%=jsParent%>.openLayerDashboardByLayerNameWithParams(layerName, dashboardName, params, title);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while opening the openLayerDashboardByLayerNameWithParams by = ['+dashboardName+']');
    }    
}
 function openLayerDashboard(layerId, layerName, dashboardName, params, title) {
     try {
        <%=jsParent%>.openLayerDashboard(layerId, layerName, dashboardName, params, title);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while opening the dashboard by id = ['+dashboardName+']');
    }     
}

function openOrRefreshLayerDashboard(layerId, layerName, dashboardName, params, title) {	
     try {
        <%=jsParent%>.openOrRefreshLayerDashboard(layerId, layerName, dashboardName, params, title)
    } catch (e) {
        alert('Error ['+e.message+'] occurred while opening or refreshing the dashboard by id = ['+dashboardName+']');
    }     
}

function maximizeLayerDashboard(layerId, layerName, dashboardName) {
     try {
        <%=jsParent%>.maximizeLayerDashboard(layerId, layerName, dashboardName);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while maximizing the dashboard by id = ['+dashboardName+']');
    }     
}

function minimizeLayerDashboard(layerId, layerName, dashboardName) {
     try {
        <%=jsParent%>.minimizeLayerDashboard(layerId, layerName, dashboardName);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while minimizing the dashboard by id = ['+dashboardName+']');
    }     
}

function restoreLayerDashboard(layerId, layerName, dashboardName) {
     try {
        <%=jsParent%>.restoreLayerDashboard(layerId, layerName, dashboardName);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while restoring the dashboard by id = ['+dashboardName+']');
    }     
}

function restoreLayerDashboardIfMaximized(layerId, layerName, dashboardName) {
     try {
        <%=jsParent%>.restoreLayerDashboardIfMaximized(layerId, layerName, dashboardName);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while restoring the dashboard if maximized by id = ['+dashboardName+']');
    }     
}

function changeLayerDashboardState(layerId, layerName, dashboardName, dashboardState) {
     try {
        <%=jsParent%>.changeLayerDashboardState(layerId, layerName, dashboardName, dashboardState);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while chnaging the dashboard state = ['+dashboardName+']');
    }     
}

function setLayerDashboardTitle(layerId, layerName, dashboardName, title) {
     try {
        <%=jsParent%>.setLayerDashboardTitle(layerId, layerName, dashboardName, title);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while setting the title of dashboard by id = ['+dashboardName+']');
    }     
}

function getLayerDashboardState(layerId, layerName, dashboardName) {
     try {
        return <%=jsParent%>.getLayerDashboardState(layerId, layerName, dashboardName);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while getting the state of the dashboard by id = ['+dashboardName+']');
    }     
}
	

 function closeLayerDashboard(layerId, layerName, dashboardName) {
     try {
        <%=jsParent%>.closeLayerDashboard(layerId, layerName, dashboardName);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while closing the dashboard by id = ['+dashboardName+']');
    }     
}

 function openDashboardFrameById(id, urlToOpen,layerId,layerName, windowId, iconUrl){
     try {
        <%=jsParent%>.openDashboardFrameById(id, urlToOpen,layerId,layerName, windowId, iconUrl);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while opening the dashboard frame ['+urlToOpen+'] by id = ['+id+']');
    }     
 }

 function _showRoute(wayPoints){
     try {
        <%=jsParent%>._showRoute(wayPoints);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while _showRoute loadwsf');
    }
}

function _clearRoute(){
     try {
        <%=jsParent%>._clearRoute();
    } catch (e) {
        alert('Error ['+e.message+'] occurred while _clearRoute in loadswf');
    }
}

function _selectLayers(layers) {
     try {
        <%=jsParent%>._selectLayers(layers);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while selecting the layers['+layers+'] in loadswf');
    }
}

function _deSelectLayers(layers) {
     try {
        <%=jsParent%>._deSelectLayers(layers);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while deselecting the layers['+layers+'] in loadswf');
    }
}

function _getCurrentBoundingBox() {
     try {
        return <%=jsParent%>._getCurrentBoundingBox();
    } catch (e) {
        alert('Error ['+e.message+'] occurred while selecting the getting the current boundingbox in loadswf');
    }
    return "";
}

function _getSelectedSessionIds() {
     try {
        return <%=jsParent%>._getSelectedSessionIds();
    } catch (e) {
        alert('Error ['+e.message+'] occurred while selecting the getting the selected session ids in loadswf');
    }
    return "";
}

function _getSelectedArtifactNames() {
     try {
        return <%=jsParent%>._getSelectedArtifactNames();
    } catch (e) {
        alert('Error ['+e.message+'] occurred while selecting the getting the selected artifact names in loadswf');
    }
    return "";
}

function getViewFormatParams() {
 try {
        return <%=jsParent%>.getViewFormatParams();
    } catch (e) {
        alert('Error ['+e.message+'] occurred while selecting the getting the view format params in loadswf');
    }
    return "";
}

function redirectToLoginPage(){
   <%=jsParent%>.<%=jsParent%>.refreshSessionInvalid();
}

 function sessionDetails(){
   <%=jsParent%>.sessionDetails();
 }
 function  showMessages(){
    var msg = <%=jsParent%>.getMessage();
    getFlexApp('swf_<%=ESAPI.encoder().encodeForHTML(swfObject)%>').showMsgs(msg);
 }

function ackAllEventMessages(_selectedEventId){
 <%=jsParent%>.ackAllEventMessages(_selectedEventId);
}
/*
            method to change view from java script 
            params :_selectedView :Object 
            0(GE View only)
            1(Dashboard View Only)
            2(both GE& dashboard View)
*/
function _changeView(_selectedView){
 <%=jsParent%>.changeView(_selectedView);
}

function getFlexApp(appName) {
  if (navigator.appName.indexOf ("Microsoft") !=-1) {
    return window[appName];
  } else {
    return document[appName];
  }
}

var dashboardId;
var ecosisId;

function setEcosysId(ecosid) {
    this.ecosisId = ecosid;
} 

function setDashboardId(dashbaordId) {
    this.dashboardId = dashbaordId;
} 

/**
@function is called when to perform search on dashboards 
@param: advancedSearchArgs is an object having:
advancedSearchArgs Properties - searchCriteria,fitlerConfiguration,filterMap,filterDashboards,layerId,dashboardId
searchCriteria - search to be performed on dashboards
*/

function onSearch(advancedSearchArgs){

    try {
	   	if(advancedSearchArgs.filterMap){
			advancedSearchArgs['swfObjectID'] = '<%=swfObject%>' ; 
	   		<%=jsParent%>.onSearchArtifacts(advancedSearchArgs);
		}
		if(advancedSearchArgs.filterDashboards){
			<%=jsParent%>.onSearchDashboards(advancedSearchArgs);
		}
    } catch (e) {
       	alert('Error ['+e.message+'] occurred while performing search');
    }  
}



function _registerDashboardRefreshEvents(ecodashbaordEvents){
    try{
        var params = [];
        params.push(ecodashbaordEvents);
        params.push(ecosisId);
        params.push(dashboardId);
        <%=jsParent%>.registerDashboardForEvents(params);
    } catch(err){
        //aletr(err);
    }
    
}
  
 
 /**
  @function is being used to call method in javascript.
  @param: methodData contains methodName,layerId,dashboardId,ecosid, and methodArgs, where as methodArgs will have attribute=value pair with '|' delimiter. use .split method e.g. str.split("|") to get attribute=value pair and use str.split("=") to get attribute and value.
  @return : "true" if method is found or error message.
  @ example :
     function displayDetails(methodData) {
           alert(methodData.layerId); // will show layerId
      } 
      
	for getting the key=value pair
   
	function getKeys(methodData) {
     var items=methodData.split("|");
     for(var index=0;index<items.length;index++) {
	       alert(items[index]);     
	 }
  } 
 */ 

  
 function invokeMethod(methodData){
            var methodName=methodData.methodName; 
		   	try {
				 	window[methodName](methodData);  
					return "true";
				} catch (e) { 
			       return e.message;		 
			} 
  }
  
/**
@function is called when some dashboard event takes place
@param: eventArgs is an object having:
@eventProperties - eventName,layerId,dashboardId,artifactName,ecosid,eventExtentedData
@eventName - name of fired event.
@eventData - having dashboard component data which fires the event.
*/   
 
function fireDashboardActionEvent(eventArgs){
    var obj = <%=jsParent%>.actionEvtMap();
	var keys;
	try {
	if(obj!= null){
		for (key in obj) {
		 if(key == eventArgs.layerId+"_"+eventArgs.dashboardId){
		 var eventFunctionArray = new Array();
		   eventFunctionsArray = obj[key];
			for(var i = 0;i<eventFunctionsArray.length;i++){
			 var eventFunctionArray = new Array();
				eventFunctionArray = eventFunctionsArray[i];
				if(eventArgs.eventName ==eventFunctionArray[0]){
				try {
					return window[eventFunctionArray[1]](eventArgs);  
					} catch (e) {
						alert('<bean:message key="geframe.message.jsfunction.mapped" bundle="admin" />'+' :['+ eventFunctionArray[1] +'] '+'<bean:message key="geframe.error.jsfunction.notfound" bundle="admin" />'+' :['+ eventFunctionArray[0] +']');
					}
				}
			   }
		      }
	         } 
		    }
	} catch (e) {
		alert('Error ['+ e.message +'] occurred while getting the eventArgs/firing the Dashboard Event in loadswf');
	}
}
/**
This method will called for add as an attribute link dashboard only.
@function receives a string carrying event & corresponding function's information.
@param: eventActionData :string of events & actions 
@param: eventActionKey : layerId_dashboardId
*/
function setDashboardActionEvents(eventActionData,eventActionKey){
	<%=jsParent%>.actionEvts(eventActionData,eventActionKey);
}

function showControls(dashboardDivId, flag){
	try {
        return <%=jsParent%>._showControls(dashboardDivId, flag);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while getting the show/hide the dashboardcontrolbar dashboardDivId/flag in loadswf');
    }
    return "";
}

function enableWindowControls(dashboardDivId, flag){
	try {
        return <%=jsParent%>._enableWindowControls(dashboardDivId, flag);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while enabling the window control buttons of the dashboardcontrolbar dashboardDivId/flag in loadswf');
    }
    return "";
}

function _getSelectedLayers() {
	try {
        return <%=jsParent%>._getSelectedLayers();
    } catch (e) {
        alert('Error ['+e.message+'] occurred while getting the selected layers in loadswf');
    }
    return "";
}

function _imageForPrint(data) {
	try {
        return <%=jsParent%>._imageForPrint(data);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while getting the print object in loadswf');
    }
    return "";
}
</script>
<%
 if(!StringUtils.isNull(dashboardJSUrl)) {
%>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl+dashboardJSUrl.trim()) %>" ></script>
<%
    }
%>
<style>
    body { margin: 0px; overflow:hidden }
</style>

</HEAD>
<BODY>
<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" WIDTH="<%=ESAPI.encoder().encodeForHTML(width)%>" HEIGHT="<%=ESAPI.encoder().encodeForHTML(height)%>" <% if(request.getHeader("User-Agent").contains("MSIE")){ %> id="swf_<%=ESAPI.encoder().encodeForHTML(swfObject)%>" <%} %>>
<PARAM NAME="movie" VALUE="<%=ESAPI.encoder().encodeForHTML(url)%>">
<PARAM NAME="quality" VALUE="high">
<PARAM NAME="play" VALUE="true">
<PARAM NAME="loop" VALUE="true">
<param name="wmode" value="transparent" />
<param name="FlashVars" value="<%=ESAPI.encoder().encodeForHTML(qString)%>">

<EMBED src="<%=ESAPI.encoder().encodeForHTML(url)%>" quality="high" wmode="transparent" bgcolor="#FFFFFF" WIDTH="<%=ESAPI.encoder().encodeForHTML(width)%>" HEIGHT="<%=ESAPI.encoder().encodeForHTML(height)%>" allowScriptAccess="sameDomain" NAME="swf_<%=ESAPI.encoder().encodeForHTML(swfObject)%>" <% if(!request.getHeader("User-Agent").contains("MSIE")){ %> id="swf_<%=ESAPI.encoder().encodeForHTML(swfObject)%>" <%} %> ALIGN="" TYPE="application/x-shockwave-flash" FlashVars="<%=ESAPI.encoder().encodeForHTML(qString)%>" pluginspage="http://www.adobe.com/go/getflashplayer" play="true" loop="true">
</EMBED>
</OBJECT>
<!--
<div id='swfdiv' style="z-index:1"></div>
-->
</BODY>

<script>
function openDashboardHelpWindow(ecoexpml,ecosid,artifactName,dashboardId,dashboardName){
    var url = '<%=ServerUtils.getContextName(request)%>/jsp/help/dashboardHelpContent.jsp?ecoexpml='+ecoexpml+'&ecosid='+ecosid+'&artifactName='+artifactName+'&dashboardId='+dashboardId+'&dashboardName='+dashboardName;
    window.open( url, '<bean:message key="dashboard.title.help" bundle="admin"/>', 'left='+screen.width/4+', top='+screen.height/4+', width='+screen.width/2+',height='+screen.height/2+',resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no,scrollbars=yes');
}

function setTitle(dashboardId){
	var title = <%=jsParent%>.getDashboardTitle(dashboardId);
	document.title = title;
}

function getTitle(){
	return document.title;
}

function popIn(layerId,dashboardName){
	var dashboardId = layerId + "_" + dashboardName;
	var url = "<%= StringEscapeUtils.escapeHtml(serverUrl) %>common/loadswf.jsp?swfobject=" + dashboardId + "&<%=request.getQueryString().replaceFirst("isnewwindow=true&isLaunchInExternalWindow=true&swfobject=" + swfObject + "&","")%>";
	try{
		<%=jsParent%>.popIn(layerId,dashboardName, url, getTitle());
	} catch (e) {
        alert('Error ['+e.message+'] occurred while pop-in, in loadswf');
    }
}

function popOut(dashboardId){
 	var url = "<%= StringEscapeUtils.escapeHtml(serverUrl) %>common/loadswf.jsp?isnewwindow=true&isLaunchInExternalWindow=true&swfobject=" + dashboardId + "&<%=request.getQueryString().replaceFirst("swfobject=" + swfObject + "&","")%>";
	try {
        <%=jsParent%>.loadDashboardInExternalWindow(url,dashboardId);
    } catch (e) {
        alert('Error ['+e.message+'] occurred while pop-out, in loadswf');
    }
}

//close the parent dashboard after launch
function closeDashboardById(dashboardId){
	if(dashboardId != null && dashboardId.indexOf("_popup") > 0){
		<%=jsParent%>.closeLaunchDashboardById(dashboardId);
	}else{
		<%=jsParent%>.closeDashboardById(dashboardId);
	}
}

window.onbeforeunload = function(event) {	
		var dashboardId = '<%=swfObject%>';
	if(dashboardId != null && dashboardId.indexOf("_popup") > 0){
		try{
			<%=jsParent%>.closeEvent(dashboardId);	
		}catch(e){
			if(e.message!="Permission denied"){
				alert('Error ['+e.message+'] occurred while unloading the pop-out window, in loadswf');
			}
		}	
	}
};
</script>

</HTML>