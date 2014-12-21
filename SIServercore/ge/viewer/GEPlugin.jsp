<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils" %>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@page pageEncoding="UTF-8"%>
<%
    String serverUrl = ServerUtils.getServerContextBaseUrl(request);
    String serverRootUrl = ServerUtils.getServerRootUrl(request);
    String geKey = request.getParameter(ServerUtils.PARAM_GE_KEY);
    String geClientId = request.getParameter(ServerUtils.PARAM_GE_CLIENT_ID);
    String groupId = request.getParameter(ServerUtils.PARAM_GROUP_ID);
    String domainId = request.getParameter(ServerUtils.PARAM_DOMAIN_ID);
    String moduleId = request.getParameter(ServerUtils.PARAM_MODULE_ID);
    String languageId = request.getParameter(ServerUtils.PARAM_LANGUAGE_ID);
    String languageCd = request.getParameter(ServerUtils.PARAM_LANGUAGE_CODE);
    String viewmode = request.getParameter("viewmode");

    String geeServerUrl = AdminConfigUtils.getGEEServerUrl();
    String geeServerUserId = AdminConfigUtils.getGEEServerUserId();
    String geeServerPassword = AdminConfigUtils.getGEEServerPassword();
    String pluginJSUrl = request.getParameter(ServerUtils.PARAM_CUSTOM_JS_URL_MAP_PLUGIN);

    //System.out.println("geKey = "+geKey);

    if(domainId == null) {
        domainId = "";
    }

    if(moduleId == null) {
        moduleId = "";
    }

    if(languageId == null) {
        languageId = "";
    }

    if(languageCd == null) {
        languageCd = "";
    }

    String coreServerUrl = serverUrl;//serverRootUrl+CommonConstants.FORWARD_SLASH + CommonConfigUtils.getConfigValue("coreservercontext")+CommonConstants.FORWARD_SLASH;
    String adminServerUrl = serverUrl;//serverRootUrl+CommonConstants.FORWARD_SLASH + CommonConfigUtils.getConfigValue("adminservercontext")+CommonConstants.FORWARD_SLASH;

    if(StringUtils.isNull(geKey)) {
        geKey = AdminConfigUtils.getGEKey();
    }
	if(geKey==null) {
        geKey = "";
    }

    if(StringUtils.isNull(geClientId)) {
        geClientId = AdminConfigUtils.getGEClientId();
    }

    if(geeServerUrl == null) {
        geeServerUrl = "";
    }

    if(geeServerUserId == null) {
        geeServerUserId = "";
    }

    if(geeServerPassword == null) {
        geeServerPassword = "";
    }

    //for stand-alone - start
    String ecoFiles = request.getParameter("ecoFiles");
    String ecoFileParams = request.getParameter("ecoFileParams");
    String[] ecoFilesList = null;
    String[] ecoFileParamsList = null;
    if(ecoFiles != null) {
        ecoFilesList =  ecoFiles.split(",");
    }
    if(ecoFileParams != null) {
        ecoFileParamsList = ecoFileParams.split(",");
    }
    //for stand-alone - end
%>
<jsp:include page="/common/commonheader.jsp"/>
<html>
<head>
<script>
// taking error message based on locale to display from javascript
var error_KmlNotFound = "<bean:message key="admin.manualmapping.error.kmlcouldnotgenerate" bundle="admin" />";

</script>
<%
 String sensorStr = "";
 String mapVersion = AdminConfigUtils.getGoogleMapsVersion();
 if(!StringUtils.isNull(geClientId)) {
    sensorStr = "&sensor=false";
 
 }
%>
<title>STI Google Earth Plugin</title>

<%
if(StringUtils.isNull(geeServerUrl)) {
%>
<script src="<%=(request.isSecure())?"https":"http"%>://www.google.com/jsapi?key=<%=ESAPI.encoder().encodeForHTML(geKey)%>"></script>
<%
} else {
String[] strArray = StringUtils.split(geeServerUrl, "/");
String earthServerRootUrl = strArray[0]+"//"+strArray[1]+"/";
%>
<script>

</script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(earthServerRootUrl)%>/js/earth_plugin_loader.js"></script>
<%
}
%>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/extensions.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>ge/viewer/magma_ajax.js"></script>
<!-- <script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(ServerUtils.getContextName(request))%>/js/swfobject.js"></script> -->
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>ge/viewer/motionpack.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)	%>ge/viewer/AC_OETags.js" ></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/geplugin.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/geplugin-helpers.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/kmldomwalk.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/math3d.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/route.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/rubberband.js"></script>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl) %>js/ge/AlertTourFunctions.js"></script>
<%
 if(!StringUtils.isNull(pluginJSUrl)) {
%>
<script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl+pluginJSUrl.trim()) %>" ></script>
<%
    }
%>
<script>
 
    //move this to a common js later - start
    String.prototype.trim = function(){return
    (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))}

    String.prototype.startsWith = function(str)
    {return (this.match("^"+str)==str)}

    String.prototype.endsWith = function(str)
    {return (this.match(str+"$")==str)}

    Array.prototype.remove=function(s){
        for (var i in this) {
            if(s==this[i]) this.splice(i, 1);
        }
    }
    //move this to a common js later - end

    var locale = "<%=StringEscapeUtils.escapeHtml(languageCd)%>".replace("_","-");
    var GEE_KEY = "<%=StringEscapeUtils.escapeHtml(geKey)%>";
    var GEE_SERVER_URL = "<%=StringEscapeUtils.escapeHtml(geeServerUrl)%>";
    var GEE_SERVER_USERID = "<%=StringEscapeUtils.escapeHtml(geeServerUserId)%>";
    var GEE_SERVER_PASSWORD = "<%=StringEscapeUtils.escapeHtml(geeServerPassword)%>";
    var MM_FEATURE = 'mm_';

  <%
  if(StringUtils.isNull(geeServerUrl)) {
    if(StringUtils.isNull(geClientId)) {
  %>
    google.load("earth", "1", {"other_params":"sensor=false"});
    if(locale != 'en-US') {
        google.load("maps", "<%=ESAPI.encoder().encodeForHTML(mapVersion)%>", {"language":locale,"other_params":"sensor=false"});
    } else {
        google.load("maps", "<%=ESAPI.encoder().encodeForHTML(mapVersion)%>", {"other_params":"sensor=false"});
    }
  <%
    } else {
  %>
    google.load("earth", "1", {"other_params":"client=<%=ESAPI.encoder().encodeForHTML(geClientId)%><%=ESAPI.encoder().encodeForHTML(sensorStr)%>"});
    google.load("maps", "<%=ESAPI.encoder().encodeForHTML(mapVersion)%>", {"other_params":"client=<%=ESAPI.encoder().encodeForHTML(geClientId)%><%=ESAPI.encoder().encodeForHTML(sensorStr)%>"});
  <%
    }
   }
  %>


// stand alone - start
<%
    int noOfEcoFiles = ecoFilesList == null ? 0 : ecoFilesList.length;
    for (int i = 0; i< noOfEcoFiles; i++) {
        if(ecoFilesList[i].indexOf(".ecoexpml")!=-1){
            String kmlUrl = serverUrl+"MAGMARequestHandler?ecoexpmodel="+ecoFilesList[i]+"&rendertype=kml";
            if(ecoFileParamsList != null) {
                for(int j = 0; j < ecoFileParamsList.length; j++) {
                    String paramValue = request.getParameter(ecoFileParamsList[j]);
                    if(paramValue != null) {
                        kmlUrl += "&"+ecoFileParamsList[j]+"="+paramValue;
                    }
                }
            }
%>
      defaultKmlUrlList.push("<%=ESAPI.encoder().encodeForHTML(kmlUrl)%>");
<%
        } else if((ecoFilesList[i].indexOf(".kml") != -1) || (ecoFilesList[i].indexOf(".kmz") != -1)) {
            String kmlUrl = serverUrl+""+ServerUtils.getContextName(request)+"/"+ecoFilesList[i];
%>
        defaultStaticKmlUrlList.push("<%=ESAPI.encoder().encodeForHTML(kmlUrl)%>");
<%
        }
    }
%>
// stand alone - end

 var placemark = null;
 var polyPlacemark = null;
 var highlightPlacemarksArray = new Array();
 var serverUrl = "<%=StringEscapeUtils.escapeHtml(serverUrl)%>";
 var coreServerUrl = '<%=StringEscapeUtils.escapeHtml(coreServerUrl)%>';
 var defaultHighlightPlacemarkUrl = serverUrl+'images/highlight.png';
 var highlightPlacemarkUrl;
 var highlightPlacemarkScale;
// global variables for RBCircle Start

 var circleCenterDragPlacemarkUrl = serverUrl+'images/circle.png';
 var circleCircumDragPlacemarkUrl = serverUrl+'images/circle.png';
 var center;
 var circumference;
 var createNewCircleFlag=false;
 var circumLatitude;
 var circumLongitude;
// global variables for RBCircle End

function _selectLayers(layers) {
    parent._selectLayers(layers);
}

function _deSelectLayers(layers) {
    parent._deSelectLayers(layers);
}
function _stopAlertTour(){
    ge.getTourPlayer().setTour(null);
}
function _startAlertTour(){
    /*Commented for bug-13301
     * var alertKmlUrl = serverUrl + "XMLDataRenderer?xmldatatype=com.enterprisehorizons.magma.renderer.component.AlertTourKMLRenderer&groupId=<%=ESAPI.encoder().encodeForHTML(groupId)%>&domainId=<%=ESAPI.encoder().encodeForHTML(domainId)%>&moduleId=<%=ESAPI.encoder().encodeForHTML(moduleId)%>&rand="+Math.random();
    google.earth.fetchKml(ge, alertKmlUrl, alertkmlFinishedLoading);

    //Store the current View State of the viewer
    parent.callCurrentState("store");*/
}

var tour;
var tourKml;
function alertkmlFinishedLoading(fetchedKml) {
   if(tourKml==null){
    tourKml = fetchedKml;
   }else{
     ge.getFeatures().removeChild(tourKml);
     ge.getFeatures().appendChild(fetchedKml);
     tourKml = fetchedKml;
   }
   // Walk through the KML to find the tour object; assign to variable 'tour.'
   walkKmlDom(fetchedKml, function() {
      if (this.getType() == 'KmlTour') {
         tour = this;
         return false;
      }
   });
   setTimeout("startTour()",2000);

}

function startTour(){
   ge.getTourPlayer().setTour(tour);
   ge.getTourPlayer().play();
   var duration = ge.getTourPlayer().getDuration();
   setTimeout("loadCurrentState()",(duration+4)*1000);
}

function loadCurrentState(){
    parent.callCurrentState("load");
}

function getGEPluginInstance() {
	return ge;
}

/*
* Returns the current viewport bounding box.
*/
function _getCurrentBoundingBox() {
    var latLonBox = ge.getView().getViewportGlobeBounds();
    return latLonBox.getWest()+","+latLonBox.getSouth()+","+latLonBox.getEast()+","+latLonBox.getNorth();
}

function _setHighlightPlacemarkStyle(style) {
    var styleOptions = style.split(',');
    _setHighlightPlacemarkUrl(styleOptions[0]);
    _setHighlightPlacemarkScale(styleOptions[1]);
}

function _setHighlightPlacemarkUrl(url) {
     if(url == undefined || url == null || url == '') {
         url = defaultHighlightPlacemarkUrl;
     } else if(url != null && (!url.startsWith('http') || !url.startsWith('https'))) {
         url = coreServerUrl+url;
     }
     highlightPlacemarkUrl = url;
 }

 function isDefined( variable) {
    return (typeof(window[variable]) == "undefined")?  false: true;
}

  function _setHighlightPlacemarkScale(scaleStr) {
     try{
         if(scaleStr != null && scaleStr != 'null' && scaleStr != '') {
            highlightPlacemarkScale = parseFloat(scaleStr);
         } else {
             highlightPlacemarkScale = 1;
         }
     } catch (e) {
         highlightPlacemarkScale = 1;
     }
 }
 
 var lastHighlightKey=null;

 function removeAllChildren(hkey) {

	try {
       	 var pMark = new Array();
		 pMark =  highlightPlacemarksArray[hkey]; 
		 if(pMark != undefined){
		  for(var i = 0; i <pMark.length;i++){
		 	 if(pMark[i] != null){
					ge.getFeatures().removeChild(pMark[i]);
					}
		      }
		highlightPlacemarksArray[hkey] = null;
		 }

    } catch (e) {
        alert('Error ['+e.message+'] occurred while highlighting the coordinate in geplugin');
    }

 }
function checkForValidColor(color) {
	var reg=/^#[0-9a-fA-F]{3,6}$/i;
	if(reg.test(color)==true && (color.length == 4 || color.length == 7)){
		return color;
	}else{
		return "#2EFEF7";
	}
}

function highlightGeoFeature(coordsArray,dashboardId,layerId,color) {  
	var isPlacemark=true;
	color = checkForValidColor(color);
	var noOfCoords = coordsArray == null ? 0 : coordsArray.length;
	var polyPlacemarksArray = new Array();
	var pointPlacemarkArray = new Array();
	for(var i = 0; i < noOfCoords; i++) {
		if(coordsArray[i] != null) {
			var coords = coordsArray[i].split(" ");
			if(coords != null && coords.length > 1) {
			isPlacemark=false;
				if(coords.length > 2 && coords[0] == coords[coords.length-1]) {
					polyPlacemark = gex.dom.addPolygonPlacemark([], {
							style: {
							poly: '0000ff00',
							line: { width: 3, color:color }
						}
					});
					setPolygonCoordinates(polyPlacemark, coordsArray[i]);
				}else {
					polyPlacemark = gex.dom.addLineStringPlacemark([], {
							style: {
							poly: '0000ff00',
							line: { width: 3, color:color }
						}
					});
					setLineStringCoordinates(polyPlacemark, coordsArray[i]);
				}
				polyPlacemark.setVisibility(true);
				polyPlacemarksArray[i] = polyPlacemark;
				pointPlacemarkArray = pointPlacemarkArray.concat(coords);
			}
		}
	}
	if(pointPlacemarkArray != null && pointPlacemarkArray.length > 0) {
		coordsArray = pointPlacemarkArray;
	}
	
	var placemarksArray = new Array();
	if(isPlacemark == true){
		 placemarksArray = highLightPlacemark(coordsArray);
	 }
	
	if(lastHighlightKey!=null) {
	   removeAllChildren(lastHighlightKey);
	   lastHighlightKey=null;
	}
	
	lastHighlightKey=layerId+"_"+dashboardId;
	highlightPlacemarksArray[layerId+"_"+dashboardId] = placemarksArray.concat(polyPlacemarksArray);
}

function _highlight(coordsArray,dashboardId,layerId, hightLightColor) {
	removeAllChildren(layerId+"_"+dashboardId);
	if(coordsArray != null && coordsArray.length > 0) {
		highlightGeoFeature(coordsArray,dashboardId,layerId,hightLightColor);
	}
}

function highLightPlacemark(coordsArray) {
	var placemarksArray = new Array();
    var point;
    var latitude;
    var longitude;
    var altitude;
    var noOfCoords = coordsArray == null ? 0 : coordsArray.length;
    var placemark;
    for(var i = 0; i < noOfCoords; i++) {
    	if(coordsArray[i] != null) {
            var coords = coordsArray[i].split(",");
            if(coords[1]) {
                latitude = parseFloat(coords[1]);
            }
            if(coords[0]) {
                longitude = parseFloat(coords[0]);
            }
            if(coords[3]) {
                altitude  = parseFloat(coords[3]);
            }
        }
		//if(placemark == null) {
        placemark = ge.createPlacemark('');
        placemark.setName('');
        ge.getFeatures().appendChild(placemark);

        //Create style map for placemark
        var icon = ge.createIcon('');
        icon.setHref(highlightPlacemarkUrl);
        var style = ge.createStyle('');
        style.getIconStyle().setIcon(icon);
        style.getIconStyle().setScale(highlightPlacemarkScale);
        placemark.setStyleSelector(style);

        point = ge.createPoint('');

        point.setLatitude(latitude);
        point.setLongitude(longitude);
        placemark.setGeometry(point);
		placemarksArray[i] = placemark;
	}
	return placemarksArray;
}

/* Ruler code - start */
    var startPlacemark;
    var endPlacemark;
    var firstClick;

    var gblLinestring = "";
    var gblPlacemarkArr = new Array();
    var gblLineArr = new Array();
    var gblArrCounter = 0;

    var distance = 0;
    var MILE_TO_FEET = 5280;
	var KM_TO_METER = 1000;
   	var unit_symbol="";
	var measurement_symbol = "";
	var conversion_mile = 1609.344;
	var conversion_km = 1000;
	var CONVERSION_FACTOR = "";
	var DEFAULT_CONVERSION_UNIT = "";

    function distnaceCalculation(mode,measurementSystem){
        var options = ge.getOptions();
        distance = 0;
		calculateMeasurementUnit(measurementSystem);
        if(mode == 'active'){
            options.setMouseNavigationEnabled(false);
            activateClickForDistanceCalc();

            //activateMouseMoveForDistanceCalc();


        } else {
            options.setMouseNavigationEnabled(true);
            //rightClickCleanUp();
            startPlacemark  = null;
            endPlacemark = null;
            for(remCntr=0;remCntr<gblPlacemarkArr.length;remCntr++){
                removeAllChildrenArray(gblPlacemarkArr[remCntr]);
                removeAllChildrenArray(gblLineArr[remCntr]);
            }
            deActivateListenersForDistanceCalc();
        }
        // commented by Jakkam: replaced with String; gblLinestring =   ''; document.getElementById('coordinates').value = ''
         gblLinestring  =   '';
    }

 function removeAllChildrenArray(featuresArray) {
    var count = featuresArray == null ? 0 : featuresArray.length;
    for(var i = 0; i < count; i++) {
        ge.getFeatures().removeChild(featuresArray[i]);
    }
 }

    function geDistanceClickListener(kmlEvent){
        try{

            var butClick = kmlEvent.getButton();
            if(butClick == 2){
                rightClickCleanUp();
                return;
            }

            var latitude = kmlEvent.getLatitude();
            var longitude = kmlEvent.getLongitude();


            tempPlacemarkArr = gblPlacemarkArr[gblArrCounter];
            if(tempPlacemarkArr == null){
                tempPlacemarkArr = new Array();
                gblPlacemarkArr[gblArrCounter] = tempPlacemarkArr;
            }
            // very first click
            if(startPlacemark == null){
                startPlacemark = gex.dom.addPointPlacemark([latitude,longitude], {});//click value
                tempPlacemarkArr[tempPlacemarkArr.length] =  startPlacemark;
                firstClick = true;
                endPlacemark = null;
            }
            //
            gblLinestring += longitude+","+latitude +",0.0 ";
            setStyles(startPlacemark,gblArrCounter);
            if(firstClick){
                firstClick = false;
                return;
            }
            endPlacemark = gex.dom.addPointPlacemark([latitude,longitude], {});// new click value

            distance = distance + parseFloat(getDistance(startPlacemark , endPlacemark));
            setStyles(endPlacemark,gblArrCounter);

            drawLine(gblLinestring);
            startPlacemark = endPlacemark;

            if(distance.toFixed(2) == 0.00)
            {
            	//converting mile to feet
            	endPlacemark.setName((distance * CONVERSION_FACTOR ).toFixed(2) + measurement_symbol);
            }
            else
            {
            	//distance in mile
            	endPlacemark.setName(distance.toFixed(2) + unit_symbol);
            }

            tempPlacemarkArr[tempPlacemarkArr.length] =  endPlacemark;
        } catch (e) {
            alert(e.message);
        }

    }

    function rightClickCleanUp(){
        distance = 0;

        if(gblPlacemarkArr[gblArrCounter].length == 1){
            removeAllChildren(gblPlacemarkArr[gblArrCounter]);
        }

        //gblArrCounter++;
        gblLinestring = '';
        startPlacemark = null;

    }


/*
    //Draw the line for the given coordinates.
    function drawLineORIG(coordinates){
        var polyLineStringPlacemark = gex.dom.addLineStringPlacemark([], {
          style: {
            line: { width: 2.0, color: 'dd0000ff' },
            poly: { color: '400000ff' }
          }
        });
        setLineStringCoordinates(polyLineStringPlacemark, coordinates);


        // If from move donot store in the array.

        tempLineArr = gblLineArr[gblArrCounter];
        if(tempLineArr == null){
            tempLineArr = new Array();
            gblLineArr[gblArrCounter] =  tempLineArr;
        }

        tempLineArr[tempLineArr.length] = polyLineStringPlacemark;
    }
*/
    function drawLine(coordinates){
        //var pointsArray = getCordLatLongArray(coordinates, " ");

        var polyLineStringPlacemark = gex.dom.addLineStringPlacemark([], {
          style: {
            line: { width: 2.0, color: 'dd0000ff' },
            poly: { color: '400000ff' }
          }
        });
        setLineStringCoordinates(polyLineStringPlacemark, coordinates);

        // If from move donot store in the array.
        tempLineArr = gblLineArr[gblArrCounter];
        if(tempLineArr == null){
            tempLineArr = new Array();
            gblLineArr[gblArrCounter] =  tempLineArr;
        }

        tempLineArr[tempLineArr.length] = polyLineStringPlacemark;
    }
/*
    function getCordLatLongArray(cordLatLongArray, delimiterString){
        var points =  [];
        var coordinatesArray = cordLatLongArray.split(';');
        for(i=0; i<coordinatesArray.length-1;i++){
            var cordLatLongArray = coordinatesArray[i].split(delimiterString);
            points[i] = new Array();
            points[i][0] = cordLatLongArray[0];
            points[i][1] = cordLatLongArray[1];
        }
        return points;
    }
*/
    function getLineStyle(){
        var style = ge.createStyle('');
        var lineStyle = style.getLineStyle();

        lineStyle.setWidth(100);
        lineStyle.getColor().set('8000ffff');

        return lineStyle;
    }
    //This is used to get the distance between 2 placemarks.
    function getDistance(startPlacemark , endPlacemark ){
        if(startPlacemark != null && endPlacemark != null){
            //Currently it is for Miles. If needed for different thing need to parameterized
            return (new geo.Point(startPlacemark.getGeometry()).distance(new geo.Point(endPlacemark.getGeometry()))/ CONVERSION_FACTOR).toFixed(5);
        }
    }

    //Set the styles to the placemarks
    function setStyles(placemark,sectionClearID){
        if(placemark != null){
            placemark.setStyleSelector(getIcnoStyle());
        }
    }

    //Usage for this is  placemark.setStyleSelector(getIcnoStyle());
    function getIcnoStyle(){
        var icon = ge.createIcon('');
        //imgUrl = coreServerUrl + "images/dot.png";
        imgUrl = '<%=StringEscapeUtils.escapeHtml(serverUrl)%>' + "images/dot.png";

        icon.setHref(imgUrl);
        var style = ge.createStyle('');
        style.getIconStyle().setIcon(icon);
        style.getIconStyle().setScale(0.4);
        //style.getIconStyle().getColor().set('8000ffff');
        style.getLabelStyle().setScale(0.6);
        return style;
    }

    function activateClickForDistanceCalc(){
        google.earth.addEventListener(ge.getGlobe(), "click",geDistanceClickListener);
    }

    function activateMouseMoveForDistanceCalc(){
        google.earth.addEventListener(ge.getGlobe(), "mousemove",geDistanceMoveListener);
    }


    function deActivateListenersForDistanceCalc(){
        try{
            google.earth.removeEventListener(ge.getGlobe(), "click",geDistanceClickListener);
            google.earth.removeEventListener(ge.getGlobe(), "mousemove",geDistanceMoveListener);
        }
        catch(e1){

        }
    }

/* Ruler code - end */

/* Marker code - start */
    var MARKER_MODE_EDIT = 'edit';
    var MARKER_MODE_READONLY = 'readonly';

    var LISTENER_TYPE_DEFAULT_CLICK = 'DEFAULT_CLICK';
    var LISTENER_TYPE_MARKER_PLACEMARK = 'MARKER_PLACEMARK';

    var markerMode = MARKER_MODE_EDIT;
    var currentListenerType;
    var markerDragInfo;
    var idCount = 0;
    var currentPolyPlacemark;
    var currentLineStringPlacemark;
    var hasZoomListener = false;
    var selectedMarkerPlacemark;
    //var isDrawing = false;
    //var linestringCoordsArray = null;
    //var placemarkDraggingStyle;

    //var activeListenersArray = new Array();

    function setMarkerMode(mode) {
        this.markerMode = mode;
        if(isMarkerReadOnlyMode()) {
            activateListener(LISTENER_TYPE_DEFAULT_CLICK, 'mouseup');
            //activateListener('DEFAULT_CLICK', 'click', null);
        } else {
            hideBalloon(null);
            deActivateListener(LISTENER_TYPE_DEFAULT_CLICK, 'mouseup');
            //deActivateListener('DEFAULT_CLICK', 'click', null);
        }
        initializeMarkerMouseListeners(isMarkerEditMode());
    }

    function isMarkerEditMode() {
        return markerMode == MARKER_MODE_EDIT;
    }

    function isMarkerReadOnlyMode() {
        return markerMode == MARKER_MODE_READONLY;
    }

    function initializeMarkerData() {
        /*
        placemarkDraggingStyle = gex.dom.buildStyle({
          icon: {
            stockIcon: 'paddle/red-circle',
            hotSpot: { left: '50%', bottom: 0 }
          }
        });
        */
        deActivateListener(LISTENER_TYPE_DEFAULT_CLICK, 'mouseup');
        initializeMarkerMouseListeners(true);
    }

    function initializeMarkerMouseListeners(flag) {
        if(flag) {
            google.earth.addEventListener(ge.getWindow(), 'mousedown', markerMouseDownListener);
            google.earth.addEventListener(ge.getGlobe(), 'mousemove', markerMouseMoveListener);
            google.earth.addEventListener(ge.getWindow(), 'mouseup', markerMouseUpListener);
        } else {
            google.earth.removeEventListener(ge.getWindow(), 'mousedown', markerMouseDownListener);
            google.earth.removeEventListener(ge.getGlobe(), 'mousemove', markerMouseMoveListener);
            google.earth.removeEventListener(ge.getWindow(), 'mouseup', markerMouseUpListener);
        }
    }

    function markerMouseDownListener(event) {
        if(!isMarkerEditMode()) {
            return;
        }


        //alert(event.getTarget().getType()+":"+event.getTarget().getGeometry().getType());
        if (event.getTarget().getType() == 'KmlPlacemark') {
            event.preventDefault();
            //var parentNode = event.getTarget().getParentNode();
            //alert(parentNode.getType());
            var targetType = event.getTarget().getGeometry().getType();
            if(targetType == 'KmlPoint') {
                var placemark = event.getTarget();
                var id = placemark.getId();
                if(!id || id == null || id == '') {
                    return;
                }
                markerDragInfo = {
                    placemark: event.getTarget(),
                    dragged: false
                };
            }
        }
    }


    function markerMouseMoveListener(event) {
        if(!isMarkerEditMode()) {
            return;
        }
        if (markerDragInfo) {
            event.preventDefault();
            var point = markerDragInfo.placemark.getGeometry();
            point.setLatitude(event.getLatitude());
            point.setLongitude(event.getLongitude());
            markerDragInfo.dragged = true;
        }
    }

    function markerMouseUpListener(event) {
        if(!isMarkerEditMode()) { //|| isDrawing
            return;
        }
		try{
			var targetType = event.getTarget().getGeometry().getType();
			if(targetType == 'KmlPolygon') {
				selectedMarkerPlacemark = event.getTarget();

				resetMarkerFeatures();

				currentPolyPlacemark = event.getTarget();
				var id = currentPolyPlacemark.getId();
				parent.selectRow(id);

				hasZoomListener = true;
				google.earth.addEventListener(ge.getWindow(), 'dblclick', markerZoomListener);

				var optionsObj = new Object();
				optionsObj.editCallback = polygonUpdated;

				gex.edit.editLineString(currentPolyPlacemark.getGeometry().getOuterBoundary(), optionsObj);
			} else if(targetType == 'KmlLineString') {
				selectedMarkerPlacemark = event.getTarget();

				resetMarkerFeatures();

				currentLineStringPlacemark = event.getTarget();
				var id = currentLineStringPlacemark.getId();
				parent.selectRow(id);

				hasZoomListener = true;
				google.earth.addEventListener(ge.getWindow(), 'dblclick', markerZoomListener);

				var optionsObj = new Object();
				optionsObj.editCallback = lineStringUpdated;

				gex.edit.editLineString(currentLineStringPlacemark.getGeometry(), optionsObj);
			} else if(targetType == 'KmlPoint') {
				selectedMarkerPlacemark = event.getTarget();

				if (markerDragInfo) {
					markerPlacemarkDragged(event);
				}
			}
		}catch(err){
			if (markerDragInfo) {
				markerPlacemarkDragged(event);
			}
		}
    }

	/**
	* Received information that placemark is dragged.
	*/
	function markerPlacemarkDragged(event){
		if(markerDragInfo){
			var point = markerDragInfo.placemark.getGeometry();
			var id = markerDragInfo.placemark.getId();
			if(!id || id == null || id == '') {
				return;
			}
			if (markerDragInfo.dragged) {
				// if the placemark was dragged, prevent balloons from popping up
				event.preventDefault();

				var coordsStr = event.getLongitude()+","+event.getLatitude()+",0.0";
				//update the coordinates
				parent.updateCoordinates(id, coordsStr);
			} else {
				parent.selectRow(id);
			}
			markerDragInfo = null;
		}

	}

    function deleteSelectedMarkerFeature() {
        deleteMarkerFeature(selectedMarkerPlacemark);
        selectedMarkerPlacemark = null;
    }

    function deleteMarkerFeature(markerFeature) {
        if(markerFeature) {
            if(currentLineStringPlacemark && currentLineStringPlacemark.getId() == markerFeature.getId()) {
                resetMarkerFeatures();
            }

            if(currentPolyPlacemark && currentPolyPlacemark.getId() == markerFeature.getId()) {
                resetMarkerFeatures();
            }

            var removedObj = ge.getFeatures().removeChild(markerFeature);
            if(currentKmlObject) {
                currentKmlObject.getFeatures().removeChild(markerFeature);
            }
        }
    }

    function setSelectedMarkerFeatureById(id) {
        var optionsObj = new Object();
        optionsObj.rootObject = currentKmlObject;
        optionsObj.recursive = true;

        selectedMarkerPlacemark = gex.dom.getObjectById(id, optionsObj);

        if(!selectedMarkerPlacemark) {
            var defaultOptionsObj = new Object();
            defaultOptionsObj.rootObject = ge.getGlobe();
            defaultOptionsObj.recursive = true;

            selectedMarkerPlacemark = gex.dom.getObjectById(id, defaultOptionsObj);
        }
    }

    function resetMarkerFeatures() {
        if(currentLineStringPlacemark) {
            gex.edit.endEditLineString(currentLineStringPlacemark.getGeometry());
            currentLineStringPlacemark = null;
        }

        if(currentPolyPlacemark) {
            gex.edit.endEditLineString(currentPolyPlacemark.getGeometry().getOuterBoundary());
            currentPolyPlacemark = null;
        }
    }

    function markerZoomListener(event) {
        try {
            event.preventDefault();
            if(currentPolyPlacemark) {
                gex.edit.endEditLineString(currentPolyPlacemark.getGeometry().getOuterBoundary());
                //currentPolyPlacemark = null;
            } else if(currentLineStringPlacemark) {
                gex.edit.endEditLineString(currentLineStringPlacemark.getGeometry());
                //currentLineStringPlacemark = null;
            }
        }
        catch (e) {
            //alert(e.message);
        }
        removeMarkerZoomListener();
    }

    function removeMarkerZoomListener() {
        if(hasZoomListener) {
            google.earth.removeEventListener(ge.getWindow(), 'dblclick', markerZoomListener);
            hasZoomListener = false;
        }
    }
    function getListener(listenerType) {
        if(listenerType == LISTENER_TYPE_MARKER_PLACEMARK) {
            return markerPlacemarkClickListener;
        } else if(listenerType == LISTENER_TYPE_DEFAULT_CLICK) {
            return geMouseUpEvent;
        }
    }
    /**
    * Activates the listener
    */
    function activateListener(listenerType, eventType) {
        resetMarkerFeatures();
        var listener =  getListener(listenerType);

        if(listener) {
            google.earth.addEventListener(ge.getGlobe(), eventType, listener);
        }
        currentListenerType = listenerType;
    }

    function deActivateListener(listenerType, eventType) {
        var listener =  getListener(listenerType);
        var isFireEvent = false;

        if(listenerType == LISTENER_TYPE_MARKER_PLACEMARK) {
            isFireEvent = true;
        }

        if(listener) {
            google.earth.removeEventListener(ge.getGlobe(), eventType, listener);

            if(isFireEvent) {
                parent.fireGEEvent(listenerType, eventType, 'deactivate');
            }
        }
        currentListenerType = null;
    }

    function markerPlacemarkClickListener(event) {
        try{
            if(!isMarkerEditMode()) {
                return;
            }
            event.preventDefault();
            if(currentListenerType) {
                idCount++;

                var pm = gex.dom.addPointPlacemark([event.getLatitude(), event.getLongitude()], {
                  id: MM_FEATURE+idCount,
                  icon: {
                    stockIcon: 'paddle/blu-circle',
                    hotSpot: { left: '50%', bottom: 0 }
                  }
                });

                parent.addFeature(pm.getId(), event.getLongitude()+","+event.getLatitude()+",0.0", "placemark",'');
                selectedMarkerPlacemark = pm;
                //dragPlacemark(pm);
            }
        } catch (e) {
            alert('Error ['+e.message+'] occurred while moving the placemark');
        }
        deActivateListener(LISTENER_TYPE_MARKER_PLACEMARK, 'click');
    }

    function _clearDOMFeatures() {
        gex.dom.clearFeatures();
		ge.setBalloon(null);
    }

    function drawMarkerFeature(type) {
        resetMarkerFeatures();
        if(type == 'polygon') {
            drawMarkerPolygon();
        } else if(type == 'linestring') {
            drawMarkerLinestring();
        }
    }

    function resetMarkerFeature(type) {
        if(type == 'polygon' || type == 'linestring') {
            if(currentLineStringPlacemark) {
                ge.getFeatures().removeChild(currentLineStringPlacemark);
            }

            if(currentPolyPlacemark) {
                ge.getFeatures().removeChild(currentPolyPlacemark);
            }

            resetMarkerFeatures();
            parent.fireGEEvent(type == 'linestring' ? 'MARKER_LINESTRING' : 'MARKER_POLYGON', 'click', 'deactivate');
            initializeMarkerMouseListeners(true);

        }
    }

    function drawMarkerPolygon() {
        removeMarkerZoomListener();
        //isDrawing = true;
        initializeMarkerMouseListeners(false);

        idCount++;
        currentPolyPlacemark = gex.dom.addPolygonPlacemark([], {
         id: MM_FEATURE+idCount,
         style: {
          poly: '8000ff00',
          line: { width: 3, color: '#0f0' }
        }
      });
      var optionsObj = new Object();
      optionsObj.finishCallback = drawPolygonFinished;
      gex.edit.drawLineString(currentPolyPlacemark.getGeometry().getOuterBoundary(), optionsObj);
    }

    function drawMarkerLinestring() {
        removeMarkerZoomListener();
        //isDrawing = true;
        initializeMarkerMouseListeners(false);

        idCount++;
        currentLineStringPlacemark = gex.dom.addLineStringPlacemark([], {
         id: MM_FEATURE+idCount,
         style: {
          poly: '8000ff00',
          line: { width: 3, color: '#0f0' }
        }
      });
      var optionsObj = new Object();
      optionsObj.finishCallback = drawLineStringFinished;
      gex.edit.drawLineString(currentLineStringPlacemark.getGeometry(), optionsObj);
    }

    function drawPolygonFinished() {
        try{
            if(currentPolyPlacemark) {
                parent.addFeature(currentPolyPlacemark.getId(), getPolygonCoordinates(currentPolyPlacemark), "polygon",'');
                parent.fireGEEvent('MARKER_POLYGON', 'click', 'deactivate');
                selectedMarkerPlacemark = currentPolyPlacemark;
            }
            initializeMarkerMouseListeners(true);
        }
        catch (e) {
            //alert('Error in drawing the polygon '+e.message);
        }
        currentPolyPlacemark = null;
        //isDrawing = false;
    }

    function drawLineStringFinished() {
        if(currentLineStringPlacemark) {
            parent.addFeature(currentLineStringPlacemark.getId(), getCoordinateString(currentLineStringPlacemark.getGeometry().getCoordinates()), "linestring",'');
            parent.fireGEEvent('MARKER_LINESTRING', 'click', 'deactivate');
            selectedMarkerPlacemark = currentLineStringPlacemark;
        }
        initializeMarkerMouseListeners(true);
        currentLineStringPlacemark = null;
        //isDrawing = false;
    }
    function updateRadius(roundedRadius) {
        parent.updateRadius(roundedRadius);
	}

    function polygonUpdated() {
        //try {
            if(currentPolyPlacemark) {
                parent.updateCoordinates(currentPolyPlacemark.getId(), getPolygonCoordinates(currentPolyPlacemark));
            }
        //} catch (e) {
            //alert('Error in updating the polygon '+e.message);
        //}
        //currentPolyPlacemark = null;
        //alert('updated');
    }

    function lineStringUpdated() {
        //try {
            if(currentLineStringPlacemark) {
                parent.updateCoordinates(currentLineStringPlacemark.getId(), getCoordinateString(currentLineStringPlacemark.getGeometry().getCoordinates()));
            }
        //} catch (e) {
            //alert('Error in updating the polygon '+e.message);
        //}
        //currentLineStringPlacemark = null;
    }

    function setPolygonCoordinates(polyPlacemark, coordStr) {
        if(polyPlacemark && coordStr) {
            var kmlCoordArray = polyPlacemark.getGeometry().getOuterBoundary().getCoordinates();
            var coordArray = coordStr.split(" ");
            var count = coordArray == null ? 0 : coordArray.length;
            var latlonArray = null;
            for(var i = 0; i < count; i++) {
                latlonArray = coordArray[i].split(",");
                kmlCoordArray.pushLatLngAlt(parseFloat(latlonArray[1]), parseFloat(latlonArray[0]), parseFloat(latlonArray[2]));
            }
        }
    }

    function setLineStringCoordinates(lineStringPlacemark, coordStr) {
        if(lineStringPlacemark && coordStr) {
            //setTimeout("alert('"+coordStr+"!')",1000);
            var kmlCoordArray = lineStringPlacemark.getGeometry().getCoordinates();
            var coordArray = coordStr.split(" ");
            var count = coordArray == null ? 0 : coordArray.length;
            var latlonArray = null;
            for(var i = 0; i < count; i++) {
                latlonArray = coordArray[i].split(",");
                if(latlonArray.length == 3) {
                    kmlCoordArray.pushLatLngAlt(parseFloat(latlonArray[1]), parseFloat(latlonArray[0]), parseFloat(latlonArray[2]));
                }
            }

        }
    }

    function getPolygonCoordinates(polyPlacemark) {
        return getCoordinateString(polyPlacemark.getGeometry().getOuterBoundary().getCoordinates());
    }

    function getCoordinateString(coordsArray) {
        var coordinatesString = '';
        if(coordsArray) {
            var count = coordsArray.getLength();
            for (var i = 0; i < count; i++) {
                 var coord = coordsArray.get(i);
                 coordinatesString += coord.getLongitude() +","+ coord.getLatitude()+",0.0";
                 if(i != count -1) {
                     coordinatesString += " ";
                 }
             }
        }

        return coordinatesString;
    }


//********* Smart Art code   *********//
    var xmlDoc;
    var smartDrawOverlayArr = new Array();
    var currentLayer;
    var mouseEventRegistered = false;
    var smartArtDataArr = new Array();

    /*
    * Called from Flex to add smart overlay
    */
    function addSmartArtOverlay(layerName,smartArtName,url,ecosid,xPos,yPos,xUnits,yUnits){
        for(i=0;i<smartArtDataArr.length;i++){
            if(smartArtDataArr[i].name==layerName && smartArtDataArr[i].url==url){
                smartArtDataArr.splice(i,1);
                break;
            }
        }
        var randomnumber=Math.floor(Math.random()*1001);
        var uName = layerName+"_"+smartArtName+"_"+randomnumber;
        smartArtDataArr.push({name:layerName,smartArtName:smartArtName,url:url,ecosid:ecosid,x:xPos,y:yPos,xUnits:xUnits,yUnits:xUnits,uid:uName});
    }

    /*
    * Called when the layer is selected in GEFrame
    */
    function layerSelected(layerName, isSelected) {
        if(isSelected){
            if(!mouseEventRegistered){
                registerSmartArtWindowClick();
                registerSmartArtHighlightOver();
                mouseEventRegistered = true;
            }
            currentLayer = layerName;
            loadSmartArt(layerName);
        }else{
            removeAllSmartDrawLayer(layerName);
            clearDashboardActionEventMap(layerName);
        }
    }

    /*
     * clear the dashboardactioneventmap cache on deselecting the layer.
     */
    function clearDashboardActionEventMap(layerId) {
		var eventMap = parent.actionEvtMap();
		var key;
		if(layerId != null && eventMap != null){
			for (key in eventMap) {
				var keys = key.split("_");
				if(keys != null && keys[0] == layerId){
					delete  parent.actionEvtMap()[key];
				}
			}
		}
	}

    /*
    * Loads all the smart art in a layer onto the map
    */
    function loadSmartArt(layerName){
        var idx = 0;
        for(idx=0;idx<smartArtDataArr.length;idx++){
            if(smartArtDataArr[idx].name==layerName){
                var baseUrl = serverUrl+"noContentServlet/smartart?package="+smartArtDataArr[idx].url+
                                                "&ecosid="+smartArtDataArr[idx].ecosid +
                                                "&layerName="+smartArtDataArr[idx].name +
                                                "&smartArtName="+smartArtDataArr[idx].smartArtName;
                var renditionUrl = baseUrl+"&datatype=rendition";
                var renditionUrl = baseUrl+"&datatype=rendition";
                var smartartUrl = baseUrl+"&datatype=image";
                var x = parseFloat(smartArtDataArr[idx].x);
                var y = parseFloat(smartArtDataArr[idx].y);
                var xUnits = smartArtDataArr[idx].xUnits;
                var yUnits = smartArtDataArr[idx].yUnits;
                var smartArtName = smartArtDataArr[idx].smartArtName;
                var uid = smartArtDataArr[idx].uid;
                loadRendition(renditionUrl);
                loadScreenOverlay(uid,smartartUrl,x,y,xUnits,yUnits);
            }
        }
    }

    /*
    * adds the smart art image to the map as screen overlay
    */
    function loadScreenOverlay(name,url,x,y,xUnits,yUnits){
        var screenOverlay = ge.createScreenOverlay(name);

        //add the image
        var icon = ge.createIcon('');
        icon.setHref(url);
        screenOverlay.setIcon(icon);

        //set the position
        screenOverlay.getOverlayXY().setXUnits((xUnits=="fraction")?ge.UNITS_FRACTION:ge.UNITS_PIXELS);
        screenOverlay.getOverlayXY().setYUnits((yUnits=="fraction")?ge.UNITS_FRACTION:ge.UNITS_PIXELS);
        screenOverlay.getOverlayXY().setX(x);
        screenOverlay.getOverlayXY().setY(y);
        ge.getFeatures().appendChild(screenOverlay);
    }

    /*
    * call method with url to the rendition xml to load the href to the Smart Draw Overlays
    */
    function loadRendition(renditionUrl){
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.onreadystatechange = readXML;
        xmlDoc.load(renditionUrl);
    }

    /*
    * call back method that parses the rendition XML that is returned
    */
    function readXML(){
        if(xmlDoc.readyState == 4){
            var renditionElement = xmlDoc.documentElement;
            var rAttributes = renditionElement.attributes;
            var imageHeight = parseFloat(rAttributes.getNamedItem("imageHeight").nodeValue);
            var imageWidth = parseFloat(rAttributes.getNamedItem("imageWidth").nodeValue)
            var renditionAtomArr = renditionElement.childNodes;
            for(i=0;i<renditionAtomArr.length;i++){
                var safunction   = renditionAtomArr[i].selectSingleNode("function").text;
                var x1  = renditionAtomArr[i].selectSingleNode("x").text;
                var y1  = renditionAtomArr[i].selectSingleNode("y").text;
                var width  = renditionAtomArr[i].selectSingleNode("width").text;
                var height = renditionAtomArr[i].selectSingleNode("height").text;
                var highlightImage = renditionAtomArr[i].selectSingleNode("highlightImage").text;

                var x2 = parseFloat(x1) + parseFloat(width);
                var y2 = parseFloat(y1) + parseFloat(height);

                smartDrawOverlayArr.push({'layer':currentLayer,'safunction':safunction,'x1':parseFloat(x1),'y1':parseFloat(y1),'x2':x2,'y2':y2,'height':parseFloat(height),'width':parseFloat(width),'imageHeight':imageHeight,'imageWidth':imageWidth,'highlightImage':highlightImage});
            }
        }
    }

    /*
    * Helper function which removes the first item with the layer name
    */
    function removeSingleSmartDrawLayer(layerName){
        for(i=0;i<smartDrawOverlayArr.length;i++){
            if(smartDrawOverlayArr[i].layer==layerName){
                smartDrawOverlayArr.splice(i,1);
                return false;
            }
        }
        return true;
    }

    function removeSingleSmartArtData(layerName){
        for(i=0;i<smartArtDataArr.length;i++){
            if(smartArtDataArr[i].name==layerName){
                smartArtDataArr.splice(i,1);
                return false;
            }
        }
        return true;
    }

    function removeAllSmartDrawLayer(layerName){
        while(!removeSingleSmartDrawLayer(layerName)){
            //do nothing
        }
        while(!removeSingleSmartArtData(layerName)){
            //do nothing
        }
        var childNodes = ge.getFeatures().getChildNodes();
        for(i2=0;i2<childNodes.getLength();i2++){
            var kmlObj = childNodes.item(i2);
            if(kmlObj.getId().indexOf(layerName+"_")==0){
                ge.getFeatures().removeChild(kmlObj);
                kmlObj.release();
            }
        }
    }

    /*
    * Checks whether the XY coord falls into any of the smart draw Overlays bounding box
    */
    function getFunction(x,y){
        var mDiv = document.getElementById('map3d');
        var mWidth = mDiv.clientWidth;
        var mHeight = mDiv.clientHeight;

        for(i=0;i<smartDrawOverlayArr.length;i++){
            var smartArtData = getSmartArtData(smartDrawOverlayArr[i].layer);
            var ox = smartArtData.x;
            var oy = smartArtData.y;
            if(smartArtData.xUnits=="fraction"){ox = ox*mWidth;}
            if(smartArtData.yUnits=="fraction"){oy = oy*mHeight;}
            var iHeight = smartDrawOverlayArr[i].imageHeight;
            var iWidth  = smartDrawOverlayArr[i].imageWidth;
            var newX1 = (ox -iWidth/2)  + smartDrawOverlayArr[i].x1;
            var newX2 = (ox -iWidth/2)  + smartDrawOverlayArr[i].x2;
            var newY1 = (mHeight-(oy +iHeight/2)) + smartDrawOverlayArr[i].y1;
            var newY2 = (mHeight-(oy +iHeight/2)) + smartDrawOverlayArr[i].y2;
            if(x >= newX1 && x <= newX2 &&
                y >= newY1 && y <= newY2 ){
                return smartDrawOverlayArr[i].safunction;
            }
        }
    }

    function smartArtWindowClicked(mouseEvent){
        var safunction = getFunction(mouseEvent.getClientX(),mouseEvent.getClientY())
        if(safunction!=null)
            eval(safunction);
    }


    function getSmartArtData(layerName){
        var idx = 0;
        for(idx=0;idx<smartArtDataArr.length;idx++){
            if(smartArtDataArr[idx].name==layerName){
                return smartArtDataArr[idx];
            }
        }
    }
    function smartArtHighlight(mouseEvent){ 
        var magmaVSUrl = "<%=StringEscapeUtils.escapeHtml(serverUrl)%>noContentServlet/PNGStreamer";
        var x = mouseEvent.getClientX();
        var y = mouseEvent.getClientY();
        var mDiv = document.getElementById('map3d');
        var mWidth = mDiv.clientWidth;
        var mHeight = mDiv.clientHeight;
        removeHighlight();

        for(i=0;i<smartDrawOverlayArr.length;i++){
            var smartArtData = getSmartArtData(smartDrawOverlayArr[i].layer);
            var ox = smartArtData.x;
            var oy = smartArtData.y;
            if(smartArtData.xUnits=="fraction"){ox = ox*mWidth;}
            if(smartArtData.yUnits=="fraction"){oy = oy*mHeight;}
            var iHeight = smartDrawOverlayArr[i].imageHeight;
            var iWidth  = smartDrawOverlayArr[i].imageWidth;
            var newX1 = (ox -iWidth/2)  + smartDrawOverlayArr[i].x1;
            var newX2 = (ox -iWidth/2)  + smartDrawOverlayArr[i].x2;
            var newY1 = (mHeight-(oy +iHeight/2)) + smartDrawOverlayArr[i].y1;
            var newY2 = (mHeight-(oy +iHeight/2)) + smartDrawOverlayArr[i].y2;
            if(x >= newX1 && x <= newX2 &&
                y >= newY1 && y <= newY2 ){
                var glowUrl = serverUrl+"noContentServlet/smartart?package="+smartArtData.url+"&datatype=highlight&resource="+smartDrawOverlayArr[i].highlightImage;
                var randomnumber=Math.floor(Math.random()*1001);
                var glowOverlay = ge.createScreenOverlay("highlight_"+randomnumber);
                var icon = ge.createIcon('');
                icon.setHref(glowUrl);
                glowOverlay.setIcon(icon);
                glowOverlay.getOverlayXY().setXUnits(ge.UNITS_PIXELS);
                glowOverlay.getOverlayXY().setYUnits(ge.UNITS_PIXELS);
                glowOverlay.getOverlayXY().setX((ox -iWidth/2)  + smartDrawOverlayArr[i].width/2  + smartDrawOverlayArr[i].x1);
                glowOverlay.getOverlayXY().setY((oy +iHeight/2) - smartDrawOverlayArr[i].height/2 - smartDrawOverlayArr[i].y1);
                ge.getFeatures().appendChild(glowOverlay);
            }
        }
    }

    function removeHighlight(){
        var childNodes = ge.getFeatures().getChildNodes();
        var i2=0;
        for(i2=0;i2<childNodes.getLength();i2++){
            var kmlObj = childNodes.item(i2);
            if(kmlObj.getId().indexOf("highlight_")==0){
                ge.getFeatures().removeChild(kmlObj);
                kmlObj.release();
            }
        } 
    }

    function registerSmartArtHighlightOver(){
        google.earth.addEventListener(ge.getWindow(), 'mousemove', smartArtHighlight);
    }
    function registerSmartArtWindowClick(){
        google.earth.addEventListener(ge.getWindow(), 'mousedown', smartArtWindowClicked);
    }

    function setLocale() {
        //var locale = "<%=ESAPI.encoder().encodeForHTML(languageCd)%>";
        try {
            //locale = locale.replace("_","-");
            if(locale != 'en-US') {
                google.earth.setLanguage(locale);
            }
            //alert(locale);
        } catch (e) {
            alert('Error '+e.message+' occurred while setting the locale to Google Earth Plugin');
        }
    }
	// This method is used to calculate the measurement units(miles,feet or KM , Meters) based measurement_symbol system 
	function calculateMeasurementUnit(measurementSystem){
		// calculating the units(miles,feet or KM , Meters) based measurement system 
			if(measurementSystem[0] == "imperial"){
				//unit_symbol = "miles";
				unit_symbol = measurementSystem[1];
				//measurement_symbol = "feet";
				measurement_symbol = measurementSystem[2];
				DEFAULT_CONVERSION_UNIT = MILE_TO_FEET;
				CONVERSION_FACTOR = conversion_mile;
			}else{
				//unit_symbol = "KM";
				unit_symbol =  measurementSystem[1];
				//measurement_symbol = "Meters";
				measurement_symbol = measurementSystem[2];
				DEFAULT_CONVERSION_UNIT = KM_TO_METER;
				CONVERSION_FACTOR = conversion_km;
			}
	}

/* Marker code - end*/

</script>
<style>
body {
  background: #000000;
  margin:0;
}
</style>

<%
    if("public".equalsIgnoreCase(viewmode)) {
%>
<base target="_blank">
<%
    }
%>
</head>
<body  onload='setLocale();init();initializeGlobalVariable();' scroll=no>
<!--
<div id="dock" style="border: 1px solid silver;">
</div>

<div id="container"  style='height: 500%;' ></div>
-->
<!--
<script>
//geTreeWin();
//map3dWin();
//analysisWin();
/analysisBasketWin();
</script>
-->
<div id='map3d' style='width:100%; height: 100%;'></div>
<input type="hidden" id="coordinates" name="coordinates"/>
<input type="hidden" id="viewPort" name="viewPort" />

</body>
<script>

//Re-Initialize the global variable. for support issue 5500 and 5890
function initializeGlobalVariable(){
 	highlightPlacemarksArray = new Array();
 	serverUrl = "<%=StringEscapeUtils.escapeHtml(serverUrl)%>";
 	coreServerUrl = '<%=StringEscapeUtils.escapeHtml(coreServerUrl)%>';
 	defaultHighlightPlacemarkUrl = serverUrl+'images/highlight.png';
 
	gblLinestring = "";
    gblPlacemarkArr = new Array();
    gblLineArr = new Array();
    gblArrCounter = 0;

    distance = 0;
    MILE_TO_FEET = 5280;
    MILE_SYMBOL = " mi";
    FEET_SYMBOL = " ft";
}

/* pass the module name to open the same
*/
function openModule(moduleName){
	try{
		//parent.parent refers to main page i.,e
		//STILayout.jsp --> stiMenu.jsp. refer the same for more info.
		parent.parent.openModule(moduleName);
	}catch(err){
		//alert("No Layout definition found..try by reloading page");
	}
}

//window.onbeforeunload = closeIt;

</script>

</html>