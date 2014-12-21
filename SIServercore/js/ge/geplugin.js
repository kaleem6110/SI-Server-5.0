/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*  Google Earth 3D Map Plugin Initialization - Space Time Insight
*
*  Created On : 29th July 2009
*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

/**
 * Constants defined.
 */

var PARAM_ALL_EVENTS = "allEvents";
var KML_EXT_DATA = "ExtendedData";
var KML_DATA = "Data";


var ge = null;
    var gex = null;
    var placemark = null;
    var geocoder;
    var doc = null;
    //define your server name and port here
    var sessionId;
    var auxObjects = [];
    var lastClickedAuxWindow = null;
    var lastClickedRange = 0;
    var lastClickedLookAt = null;
    var currentNetworkLinkName = null;
    var lastClickedBtn = null;
    var autoRefresh = false;
    var enableMouseListenersFlag = true;

    var ge = null;
    var networkLinksArray = new Array();
    var viewFormat = "bboxWest=[bboxWest]&bboxSouth=[bboxSouth]&bboxEast=[bboxEast]&bboxNorth=[bboxNorth]&lookatLon=[lookatLon]&lookatLat=[lookatLat]&lookatRange=[lookatRange]&lookatTilt=[lookatTilt]&lookatHeading=[lookatHeading]&horizFov=[horizFov]&vertFov=[vertFov]&horizPixels=[horizPixels]&vertPixels=[vertPixels]&terrainEnabled=[terrainEnabled]";
    var currentKmlObject = null;
    var rootGELayer = new Object();

    var defaultKmlUrlList = new Array();
    var defaultStaticKmlUrlList = new Array();
    var isStandAlone = typeof(parent.sendJSObjectToFlash) == 'undefined';
	var autoZoom = "";


    function init() {
      var earthOptions = [];
      if(GEE_SERVER_URL != '') {
		if (!('google' in window)) { window.google = {}; }
		if (!('loader' in window.google)) { window.google.loader = {}; }
		if (!('earth' in window.google)) { window.google.earth = {}; }
		// Enterprise Earth Plugin Key
		if(GEE_KEY == '') {
			GEE_KEY = 'ABCDEFGHIJKLMNOPgoogle.earth.ec.key';
		}
		window.google.loader.ApiKey = GEE_KEY;
		window.google.loader.KeyVerified = true;
		window.google.earth.allowUsageLogging = false;
		earthOptions = { 'database' : GEE_SERVER_URL };
            if (GEE_SERVER_USERID != '') {
                // Pop up auth dialog if desired.
                earthOptions['username'] = GEE_SERVER_USERID;
                earthOptions['password'] = GEE_SERVER_PASSWORD;
           }
      }

      try {
	      google.earth.createInstance("map3d", successCallback, failureCB, earthOptions);
	      if(GEE_SERVER_URL == '') {
		      try {
			  	geocoder = new google.maps.Geocoder(); 
		      } catch (e) {
				alert("The address search won't be available as the Google Maps API can not be loaded,please check your internet connection or firewall rules and refresh the page again");
		      }
	      }
      } catch (e) {
		if(e.message.indexOf("undefined")){
			alert("Google earth plug-in failed to initialize, please check your internet connection and refresh the page again.");
		}
	  }
    }

    function loadGELayers() {
      var rootLayer = ge.getLayerRoot();
      rootGELayer.layerId = 'root';
      loadGEChildLayers(rootGELayer, rootLayer);
    }

    function loadGEChildLayers(parentLayerObject, geFeature) {
      var features = geFeature.getFeatures();
      var childLayers = features.getChildNodes();
      var childLayersObjectArray = new Array();

      for (var i = 0; i < childLayers.getLength(); i++) {
        var feature = childLayers.item(i);

        var layerObject = new Object();
        layerObject.layerId = feature.getId();
        layerObject.layerName = feature.getName();
        var isSelected = "0";
        if (feature.getVisibility()) {
          isSelected = "1";
        }
        layerObject.isSelected = isSelected;
        layerObject.lookAt = feature.getAbstractView();
        childLayersObjectArray.push(layerObject);

        var type = feature.getType();
        if (type == 'KmlLayer') {
        // Do nothing.
        } else if (type == 'KmlFolder') {
            loadGEChildLayers(layerObject, feature);
        }
      }
      parentLayerObject.childLayers = childLayersObjectArray;
    }

    function failureCB(errorCode) {
        alert('Unable to load the Google Earth Plugin, Errorcode = ['+errorCode+"]");//ERR_CREATE_PLUGIN
    }

    function refresh() {
        parent.refresh();
    }
    function showControl(){
        //don;t do anything
    }

    function successCallback(pluginInstance) {
      try {
          ge = pluginInstance;
          ge.getWindow().setVisibility(true);
          gex = new GEarthExtensions(pluginInstance);;
          setDefaults();
        //  google.earth.addEventListener(ge.getGlobe(), "mouseup", globeWindowEventListener);
	     //retains the session on zooming.
        //  google.earth.addEventListener(ge.getView(), "viewchange", parent.sessionDetails);
        addGEListeners();
          if(!isStandAlone) {
              loadGELayers();
              parent.sendJSObjectToFlash("geFrame", "gelayers", rootGELayer);
          }
         
	
       } catch(e) {
           alert('Error ocucrred while initializing, = ['+e.message+"]");
       }

      if(!isStandAlone) {
       parent.enableFrame(true);
      }

      //load any default kml files
      for(i=0;i<defaultKmlUrlList.length;i++){
        setTimeout("initAjax('"+defaultKmlUrlList[i]+"','defaultecosystem"+i+"')",2000*(i+1));
      }

      for(i=0;i<defaultStaticKmlUrlList.length;i++){
        setTimeout("openKml('"+defaultStaticKmlUrlList[i]+"','statickml"+i+"')",2000*(i+1));
      }
    }
    function addGEListeners(){
	    //view events
		google.earth.addEventListener(ge.getView(), "viewchangebegin", geViewChangeBeginEvent);
		google.earth.addEventListener(ge.getView(), "viewchangeend", geViewChangeEndEvent);
		google.earth.addEventListener(ge.getView(), "viewchange",geViewChangeEvent);
	
		//mouse events
		google.earth.addEventListener(ge.getGlobe(), "click", geMouseClickEvent);
		google.earth.addEventListener(ge.getGlobe(), "dblclick", geMouseDblClickEvent);
		google.earth.addEventListener(ge.getGlobe(), "mouseover",geMouseOverEvent );
		google.earth.addEventListener(ge.getGlobe(), "mousedown", geMouseDownEvent);
		google.earth.addEventListener(ge.getGlobe(), "mouseup", geMouseUpEvent);
		google.earth.addEventListener(ge.getGlobe(), "mouseout", geMouseOutEvent);
		google.earth.addEventListener(ge.getGlobe(), "mousemove", geMouseMoveEvent);
		//frameend events
		//google.earth.addEventListener(ge, 'frameend', geFrameEndEvent);
	
		//balloon events
		google.earth.addEventListener(ge, 'balloonclose', geBalloonCloseEvent);
		google.earth.addEventListener(ge, 'balloonopening', geBalloonOpeningEvent);
          
    }
     function removeGEListeners(){
	    //view events
		google.earth.removeEventListener(ge.getView(), "viewchangebegin", geViewChangeBeignEvent);
		google.earth.removeEventListener(ge.getView(), "viewchangeend", geViewChangeEndEvent);
		google.earth.removeEventListener(ge.getView(), "viewchange",geViewChangeEvent);
	
		//mouse events
		google.earth.removeEventListener(ge.getGlobe(), "click", geMouseClickEvent);
		google.earth.removeEventListener(ge.getGlobe(), "dblclick", geMouseDblClickEvent);
		google.earth.removeEventListener(ge.getGlobe(), "mouseover",geMouseOverEvent );
		google.earth.removeEventListener(ge.getGlobe(), "mousedown", geMouseDownEvent);
		google.earth.removeEventListener(ge.getGlobe(), "mouseup", geMouseUpEvent);
		google.earth.removeEventListener(ge.getGlobe(), "mouseout", geMouseOutEvent);
		google.earth.removeEventListener(ge.getGlobe(), "mousemove", geMouseMoveEvent);
		//frameend events  
		//google.earth.removeEventListener(ge, 'frameend', geFrameEndEvent);
	
		//balloon events
		google.earth.removeEventListener(ge, 'balloonclose', geBalloonCloseEvent);
		google.earth.removeEventListener(ge, 'balloonopening', geBalloonOpeningEvent);
          
    }
/**
* frame end event handler.. A frameend event is fired when Earth has finished rendering the viewport. 
* This event will be called many times in succession when the viewport is changing
* call pre event and it returns true or false.. in case true implement the logic
*/
function geFrameEndEvent(){


	if(parent.preGEFrameEndEvent()){
	//do here

	}
	parent.postGEFrameEndEvent();
}
/**
 * view change begin event handler,Event fired when the view begins changing in Earth. This event will be fired once, 
 * followed by successive viewchange events, and ending with a viewchangeend event. 
 * call pre event and it returns true or false.. in case true implement the logic
 */
function geViewChangeBeginEvent(){

	parent.validateAndExtendSession();
	if(parent.preGEViewChangeBeginEvent()){
	//do here
	  
	}
	parent.postGEViewChangeBeginEvent();
}
/**
 * view change end event handler,Event fired when the view stops changing in Earth. 
 * call pre event and it returns true or false.. in case true implement the logic
 */
function geViewChangeEndEvent(){
	if(parent.preGEViewChangeEndEvent()){
	//do here
	 
	}
	parent.postGEViewChangeEndEvent();
}
/**
 * view change begin event handler,Event fired while the view is changing in Earth. 
 * This event will be triggered in rapid succession while the camera is in motion. 
  *call pre event and it returns true or false.. in case true implement the logic
 */
function geViewChangeEvent(){
 //retains the session on zooming.
 parent.sessionDetails();
	if(parent.preGEViewChangeEvent()){
	
	}
	  parent.postGEViewChangeEvent();
}

/**
 * mouse click  event handler,Triggers an event when the user clicks a location in Google Earth with the mouse
  *call pre event and it returns true or false.. in case true implement the logic
 */
function geMouseClickEvent(event){
	if(parent.preGEMouseClickEvent(event)){
	//do here
	
	}else{
	
	 event.stopPropagation();
         event.preventDefault();
	}
	  parent.postGEMouseClickEvent(event);
}
/**
 * mouse double click  event handler, Triggers an event when the user double clicks a location in Google Earth with the mouse. 
  *call pre event and it returns true or false.. in case true implement the logic
 */
function geMouseDblClickEvent(){
	if(parent.preGEMouseDblClickEvent(event)){
	//do here
	
	}else{
	
	 event.stopPropagation();
         event.preventDefault();
	 
	}
	  parent.postGEMouseDblClickEvent(event);
}
/**
 * mouse over  event handler,Triggers an event when the user moves the mouse pointer over a location in Google Earth. 
  *call pre event and it returns true or false.. in case true implement the logic
 */
function geMouseOverEvent(event){
	if(parent.preGEMouseOverEvent(event)){
	//do here
	
	}else{
	
	 event.stopPropagation();
         event.preventDefault();
	 
	}
	  parent.postGEMouseOverEvent(event);
}
/**
 * mouse down event handler,Triggers an event when the user presses the mouse button over a location in Google Earth. 
  *call pre event and it returns true or false.. in case true implement the logic
 */
function geMouseDownEvent(event){
	if(parent.preGEMouseDownEvent(event)){
	//do here
	
	}else{
	
	 event.stopPropagation();
         event.preventDefault();
	 
	}
	  parent.postGEMouseDownEvent();
}
/**
 * mouse up event handler, Triggers an event when the user releases the mouse button over a location in Google Earth. 
  *call pre event and it returns true or false.. in case true implement the logic
 */
function geMouseUpEvent(event){
	if(parent.preGEMouseUpEvent(event)){
		globeWindowEventListener(event);
	}else{
	
	 event.stopPropagation();
         event.preventDefault();
	 
	}
	  parent.postGEMouseUpEvent(event);
}
/**
 * mouse out event handler,Triggers an event when the user moves the mouse off of the object in Google Earth. 
  *call pre event and it returns true or false.. in case true implement the logic
 */
function geMouseOutEvent(event){
	if(parent.preGEMouseOutEvent(event)){
	//do here
	
	}else{
	
	 event.stopPropagation();
         event.preventDefault();
	 
	}
	  parent.postGEMouseOutEvent(event);
}
/**
 * mouse out event handler,Triggers an event when the user moves the mouse inside Google Earth. 
  *call pre event and it returns true or false.. in case true implement the logic
 */
function geMouseMoveEvent(event){
	if(parent.preGEMouseMoveEvent(event)){
	//do here
	
	}else{
	
	 event.stopPropagation();
         event.preventDefault();
	 
	}
	  parent.postGEMouseMoveEvent(event);
}
	    
/**
 * balloon close event handler..,Event fired when the current balloon is closed. 
  *call pre event and it returns true or false.. in case true implement the logic
 */
function geBalloonCloseEvent(){
	if(parent.preGEBalloonCloseEvent()){
	//do here
	
	}
	  parent.postGEBalloonCloseEvent();
}

/**
 * balloon close event handler,Event fired when the current balloon is opening. 
  *call pre event and it returns true or false.. in case true implement the logic
 */
function geBalloonOpeningEvent(event){
	if(parent.preGEBalloonOpeningEvent(event)){
	//do here
	
	}else{
	
	 event.stopPropagation();
         event.preventDefault();
	 
	}
	  parent.postGEBalloonOpeningEvent(event);
}
    function setDefaults() {
    // add a navigation control
          ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);
          updateOptions("Scale Legend", false,true);
          updateOptions("Atmosphere", true,true);
    }

    function getCurrentView() {
        var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
        var lookAtStr = lookAt.getLongitude()+","+lookAt.getLatitude()+","+lookAt.getRange()+","+
            lookAt.getTilt()+","+lookAt.getHeading()+","+lookAt.getAltitude()+","+lookAt.getAltitudeMode();
        return lookAtStr;
    }

    function setCurrentView(lookatStr) {
        var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
        var lookAtArray = lookatStr.split(",");

        if(lookAtArray[0]) {
            lookAt.setLongitude(parseFloat(lookAtArray[0]));
        }

        if(lookAtArray[1]) {
            lookAt.setLatitude(parseFloat(lookAtArray[1]));
        }

        if(lookAtArray[2]) {
            lookAt.setRange(parseFloat(lookAtArray[2]));
        }

        if(lookAtArray[3]) {
            lookAt.setTilt(parseFloat(lookAtArray[3]));
        }

        if(lookAtArray[4]) {
            lookAt.setHeading(parseFloat(lookAtArray[4]));
        }

        if(lookAtArray[5]) {
            lookAt.setAltitude(parseFloat(lookAtArray[5]));
        }

        if(lookAtArray[6]) {
            if(lookAtArray[6] == 'relativeToGround') {
                lookAt.setAltitudeMode(ge.ALTITUDE_RELATIVE_TO_GROUND);
            } else if(lookAtArray[6] == 'clampToGround') {
                lookAt.setAltitudeMode(ge.ALTITUDE_CLAMP_TO_GROUND);
            } else if(lookAtArray[6] == 'absolute') {
                lookAt.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
            } else if(lookAtArray[6] == 'clampToSeaFloor') {
                lookAt.setAltitudeMode(ge.ALTITUDE_CLAMP_TO_SEA_FLOOR);
            } else if(lookAtArray[6] == 'relativeToSeaFloor') {
                lookAt.setAltitudeMode(ge.ALTITUDE_RELATIVE_TO_SEA_FLOOR);
            }
        }
        ge.getView().setAbstractView(lookAt);
    }

    function _lookatRange(coordStr, range) {
		if(coordStr != null) {
			var coords = coordStr.split(",");
			if (coords != null){
				var noOfCoords = coords.length;
				if (noOfCoords > 4){
					_lookatRangeForPolyLine(coordStr);
				}
				else{
					var zoomLevel = 0;
					var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
					if(coords[1]) {
						lookAt.setLatitude(parseFloat(coords[1]));
					}
					if(coords[0]) {
						lookAt.setLongitude(parseFloat(coords[0]));
					}
					if(coords[2]) {
						lookAt.setAltitude(parseFloat(coords[2]));
					}

					if(coords.length == 4 && coords[3]) {
						zoomLevel = parseFloat(coords[3]);
					} else if(range != null) {
						zoomLevel = parseFloat(range);
					}
					lookAt.setRange(zoomLevel);
					ge.getView().setAbstractView(lookAt);
				}
			}
		}
     }
	// Support ticket 5799 function added to zoom to line and polygon
	function _lookatRangeForPolyLine(coordStr) {
		gex.util.flyToObject(polyPlacemark, {boundsFallback: true, aspectRatio: 1});
	}
	
	function _lookat(coordStr,rangeStr) {
       _lookatRange(coordStr,rangeStr);
    }

    function _refresh() {
        if(currentNetworkLinkName && networkLinksArray[currentNetworkLinkName]) {
            var link = networkLinksArray[currentNetworkLinkName].getLink();
            var linkUrl = link.getHref();
            var index = linkUrl.indexOf('&temprandvalue=');
            if(index > 0) {
                linkUrl = linkUrl.substring(0, index);
            }
            linkUrl += "&temprandvalue="+Math.random();
            link.setHref(linkUrl);
            networkLinksArray[currentNetworkLinkName].setLink(link);
        }
    }

    function _refreshLink(linkName) {
		_refreshLinkWithParameters(linkName, '');

    }
    /**--------------------- Directions and Route starts here----------------*/

    function _showRoute(wayPoints){
     mapsDirectionsInitializer(wayPoints,"map");

    }
    function _clearRoute(){
    clearRoute();
    }

    /* -----------------------directions & route ends ----------*/
    function hideBalloon() {
        ge.setBalloon(null);
    }

    function _refreshLinkWithParameters(linkName, params, artifactName) {
        if(linkName && networkLinksArray[linkName]) {
            var noOfLinks = networkLinksArray[linkName].length;
            for(var i = 0; i < noOfLinks; i++) {
                var link = networkLinksArray[linkName][i].getLink();
                var linkUrl = link.getHref();
                if(artifactName && artifactName != null && artifactName != '' && getArtifactName(linkUrl) != artifactName) {
					continue;
				}
                var index = linkUrl.indexOf('&temprandvalue=');
                if(index > 0) {
                    linkUrl = linkUrl.substring(0, index);
                }
                linkUrl += "&temprandvalue="+Math.random();
                if(params != null && params != '') {
                    linkUrl += params;
                }
                link.setHref(linkUrl);
                networkLinksArray[linkName][i].setLink(link);
            }
        }
    }

	function getLinkUrl(linkName) {
		if(linkName && networkLinksArray[linkName]) {
            var noOfLinks = networkLinksArray[linkName].length;
            for(var i = 0; i < noOfLinks; i++) {
                var link = networkLinksArray[linkName][i].getLink();
				return link.getHref();
			}
		}

		return '';
	}
	function openLayerDashboardByLayerName(layerName, dashboardName, title){
		parent.openLayerDashboardByLayerName(layerName, dashboardName, title);
	}
	function openLayerDashboard(layerId, layerName, dashboardName, params, title) {
		parent.openLayerDashboard(layerId, layerName, dashboardName, params, title);
	}

	function closeLayerDashboard(layerId, layerName, dashboardName) {
		parent.closeLayerDashboard(layerId, layerName, dashboardName);
	}

    function openInfoframe(urlToOpen){
        parent.openInfoframe(urlToOpen);
    }

    function openInfoframeById(id, urlToOpen){
         parent.openInfoframeById(id, urlToOpen);
    }

    function openDashboardFrameById(id,urlToOpen,layerId,layerName,windowId){
         parent.openDashboardFrameById(id,urlToOpen,layerId,layerName,windowId);
   }

	function openDashboardFrameById(id,urlToOpen,layerId,layerName,windowId, iconUrl){
         parent.openDashboardFrameById(id,urlToOpen,layerId,layerName,windowId, iconUrl);
   }
   
    function enableAutoRefresh(flag) {
        autoRefresh = flag;
    }

    function enableMouseListeners(flag) {
        enableMouseListenersFlag = flag;
    }

    function geViewChangedEventListener(event) {
        //refresh windows when the view changes
        setTimeout("parent.refreshWindows();",1000);
    }

    function enterPhotoOverlay(photoOverlay) {
      if (!photoOverlay) {
        alert('No photo overlay found!');
        return;
      }

      ge.getPhotoOverlayViewer().setPhotoOverlay(photoOverlay);
    }

    function exitPhotoOverlay() {
      // just like setBalloon(null)
      ge.getPhotoOverlayViewer().setPhotoOverlay(null);
    }

    function globeWindowEventListener(event) {
        var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
        var latLonBox = ge.getView().getViewportGlobeBounds();

        var range = lookAt.getRange();

        if(autoRefresh) {
            parent.fireViewChanged();
        }
        parent.viewChanged(getViewFormatParams());

        lastClickedRange = range;
        lastClickedLookAt = lookAt;

        if(enableMouseListenersFlag) {
            var  target = event.getTarget();
            if(target != null) {
                var type = target.getType();
                if(type == 'KmlPhotoOverlay') {
                    event.stopPropagation();
                    event.preventDefault();
                    enterPhotoOverlay(target);
                } else if(type == 'KmlPlacemark') {
                    var desc = target.getDescription();
                    event.stopPropagation();
                    event.preventDefault();
                    if(!(desc == '' || desc == 'null')) {
                        openFlashBalloon(event.getTarget());
                    }
                }
            }
        }else{
            event.stopPropagation();
            event.preventDefault();
            return;
        }

        if(parent.window.frames['_GMaps']){
            parent.window.frames['_GMaps'].setMapView(latLonBox.getNorth(),latLonBox.getSouth(), latLonBox.getEast(), latLonBox.getWest());
        }

        if(parent.window.frames['_StreetView']){
          parent.window.frames['_StreetView'].setMapView(lookAt.getLatitude(), lookAt.getLongitude());
        }

    }

    function openFlashBalloon(currentPlaceMark) {
         var b = ge.createHtmlDivBalloon('');
         b.setMaxWidth(800);
         var div = document.createElement('DIV');
		 div.style.padding = "13px";
         var description = currentPlaceMark.getDescription();
         //temporary solution
         if(description.indexOf('http') == 0 && description.indexOf("loadswf.jsp") > 0) {
             var widthStr = '100';
             var index = description.indexOf('width=');
             if(index >= 0) {
                widthStr = description.substring(index+6);
                index = widthStr.indexOf('&');
                if(index > 0) {
                    widthStr = widthStr.substring(0,index);
                } else {
                    widthStr = '100';
                }
             }

             var heightStr = '100';
             index = description.indexOf('height=');
             if(index >= 0) {
                heightStr = description.substring(index+7);
                index = heightStr.indexOf('&');
                if(index > 0) {
                    heightStr = heightStr.substring(0,index);
                } else {
                    heightStr = '100';
                }
             }

             if(description.indexOf('ispercentage=true') >= 0) {
                widthStr += '%';
                heightStr += '%';
             }

            description = '<br><iframe src="'+description+'" width="'+widthStr+'" height="'+heightStr+'"/>';
         } else {
             description = rebuildDescription(description);
             description = '<div>'+description+'</div>';
         }

         div.innerHTML = '<b><font size="2" face="Verdana">'+currentPlaceMark.getName()+'</font></b>'+description;
         b.setContentDiv(div);
         b.setFeature(currentPlaceMark); //For Info balloon position on GE with respect to specific placemark
         ge.setBalloon(b);
    }

    function rebuildDescription(input_content){
        var matches = [];  // All Anchor TAGS Array
        var tempMatches = [];   // temp backup of all Anchor Tags
        input_content.replace(/[^<]*(<a [^<]*href[^<]*=[^<]*"([^"]+)[^<]*"[^<]*>([^<]+)<\/a>)/g, function () {
            matches.push(Array.prototype.slice.call(arguments, 1, 2));
            tempMatches.push(Array.prototype.slice.call(arguments, 1, 2));
        });  // taking all the anchor tags into the array(s)
        var i=0;
        while(i<matches.length)
        {
            var str2="\ target=\"_blank\"";
            if(matches[i][0].indexOf('openInfoframe') == -1 && matches[i][0].indexOf('openDashboardFrameById') == -1
                     && matches[i][0].indexOf('openInfoframeById') == -1 ){  //checking if we want the anchor to be shown in infoframe.
                matches[i][0]= matches[i][0].substring(0,2) + str2 + matches[i][0].substring(2);
            }

            i++;
        }
        var j=0;
        while(j<matches.length) {
            input_content = input_content.replace(tempMatches[j], matches[j]);  //replacing the string back to original description
            j++;
        }
        return input_content; //returning the updated description.
    }

    function openBalloon(content) {
         var b = ge.createHtmlDivBalloon('');
         b.setMaxWidth(800);
         var div = document.createElement('DIV');
         div.innerHTML ='<div>'+content+'</div>';
         b.setContentDiv(div);
         ge.setBalloon(b);
    }


    function loadLink(){
        var nLink = txtNetworkLink.value;
        initAjax(nLink);
    }

    function loadFetchKml(name, nLink) {
        if(currentKmlObject) {
            ge.getFeatures().removeChild(currentKmlObject);
        }
        nLink = nLink.replace(/&rendertype=kml/g,"");
        google.earth.fetchKml(ge, nLink, finishFetchKml);
        setSessionId(name, nLink);
    }

    function finishFetchKml(kmlObject) {
      // check if the KML was fetched properly
      if (kmlObject) {
        // add the fetched KML to Earth
        currentKmlObject = kmlObject;
        ge.getFeatures().appendChild(currentKmlObject);
        parent.fetchKmlLoaded(currentKmlObject.getName());
        var lookAt = currentKmlObject.getAbstractView();
        if(lookAt) {
            ge.getView().setAbstractView(lookAt);
        }
      } else {
        // wrap alerts in API callbacks and event handlers
        // in a setTimeout to prevent deadlock in some browsers
        setTimeout(function() {
		// error_KmlNotFound variable declared in GEPlugin.jsp for fetching from resource bundle based on locale
         alert(error_KmlNotFound);
        }, 0);
      }
    }

    function setSessionId(name, nLink) {
        var sessionidPos = nLink.indexOf("ecosid=");
        var sessionId = "0";
        if(sessionidPos!=-1){
            sessionId = nLink.substring(sessionidPos+7, nLink.indexOf("&",sessionidPos));
        }

        var artefactNamePos = nLink.indexOf("artefactname=");
        var artefactName = "";
        if(artefactNamePos != -1){
            artefactName = nLink.substring(artefactNamePos+13,nLink.indexOf("&",artefactNamePos));
        }
        parent.setSessionId(name, sessionId, artefactName);

        parent.loadDashboards(name,nLink);
    }
    
    function getArtifactName(nLinkUrl) {
        var artefactNamePos = nLinkUrl.indexOf("artefactname=");
        var artefactName = "";
        if(artefactNamePos != -1){
            artefactName = nLinkUrl.substring(artefactNamePos+13,nLinkUrl.indexOf("&",artefactNamePos));
        }

		return artefactName;
	}

    function getViewFormatParams() {
        var latLonBox = ge.getView().getViewportGlobeBounds();
        var lookAt =  ge.getView().copyAsLookAt(ge.ALTITUDE_ABSOLUTE);
        return  "&bboxWest="+latLonBox.getWest()+"&bboxSouth="+latLonBox.getSouth()+"&bboxEast="+latLonBox.getEast()+"&bboxNorth="+latLonBox.getNorth()+
            "&lookatLon="+lookAt.getLongitude()+"&lookatLat=="+lookAt.getLatitude()+"&lookatRange="+lookAt.getRange()+"&lookatTilt="+lookAt.getTilt()+
            "&lookatHeading="+lookAt.getHeading();
    }

    function loadNetworkLink(name, nLink,refreshMode,viewRefreshMode,refreshInterval,flyToView,viewRefreshTime) {

        var networkLink = ge.createNetworkLink("");
        networkLink.setDescription("NetworkLink open to fetched content");
        networkLink.setName("Open NetworkLink");
        if(flyToView=="true"){
            networkLink.setFlyToView(true);
        }
        var link = ge.createLink("");
        if(refreshMode != null) {
            link.setRefreshMode(refreshMode);
            if(refreshInterval != null && refreshInterval != "null"){
                link.setRefreshInterval(parseFloat(refreshInterval));
            }
        }
        if(viewRefreshMode == ge.VIEW_REFRESH_ON_STOP){
            link.setViewRefreshMode(viewRefreshMode);
            if(viewRefreshTime != null && viewRefreshTime != "null"){
                link.setViewRefreshTime(parseFloat(viewRefreshTime));
            }
            link.setViewFormat(viewFormat);
        }
        nLink = nLink.replace(/&rendertype=kml/g,"");
        if(viewRefreshMode != ge.VIEW_REFRESH_ON_STOP) {
            nLink += getViewFormatParams();
        }
        if(!isStandAlone) {
            setSessionId(name, nLink);
        }
        link.setHref(nLink);
        networkLink.setLink(link);
        addNetworkLink(networkLink, name);
    }

    function addNetworkLink(networkLink, name) {
        var networkLinks = networkLinksArray[name];
        if(!networkLinks) {
            networkLinks = new Array();
        }
        networkLinks.push(networkLink);
        networkLinksArray[name] = networkLinks;

        ge.getFeatures().appendChild(networkLink);
    }

    function loadExperienceFile(name) {
        var kmlUrl = '<%=serverUrl%>MAGMARequestHandler?ecoexpmodel='+name+'.ecoexpml&rendertype=kml';
        createAjax(kmlUrl, name, false);
    }

    function loadKmlFile(name) {
        var kmlUrl = '<%=serverUrl%>'+name+'.kml';
        loadKml(kmlUrl, name);
    }

    function loadKmZFile(name) {
        var kmlUrl = '<%=serverUrl%>'+name+'.kmz';
        loadKml(kmlUrl, name);
    }

    function initAjax(startKmlUrl, name){
            createAjax(startKmlUrl, name, false);
    }

     function fetchKml(startKmlUrl, name){
            createAjax(startKmlUrl, name, true);
    }


    function createXMLHttpRequest() {
       if (window.XMLHttpRequest) {
          return new XMLHttpRequest();
       } else if (window.ActiveXObject) {
         return new ActiveXObject('Microsoft.XMLHTTP')
       } else {
         alert("Could not create XMLHttpRequest on this browser");
         return null;
       }
     }

    function parseXmlString(txt) {
        var xmlDoc;

        if (window.DOMParser) {
          var parser=new DOMParser();
          xmlDoc=parser.parseFromString(txt,"text/xml");
        } else {
          // Internet Explorer
          xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async="false";
          xmlDoc.loadXML(txt);
        }
        return xmlDoc;
    }

    function createAjax(startKmlUrl, name, isFetchKml){

        removeLink(name);
        var ajaxRequest = createXMLHttpRequest();
        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4){
                var xmldoc = parseXmlString(ajaxRequest.responseText);
                var kmlUrl = extractLink(xmldoc);
                if(!kmlUrl) {
                    return;
                }
                for(i = 0; i < kmlUrl.length; i++) {
                    linkParams = kmlUrl[i].split(",");
					autoZoom = linkParams[4];
                    refreshMode = getRefreshMode(linkParams[2]);
                    viewRefreshMode = getViewRefreshMode(linkParams[3]);
                    if(isFetchKml) {
                        loadFetchKml(name, linkParams[0]);
                    } else {
                    	loadNetworkLink(name, linkParams[0],refreshMode,viewRefreshMode,linkParams[1],linkParams[4],linkParams[5]);
                    	extractEcosessionEvents(xmldoc, linkParams[0]);
                    }
                }
            }
        }

        ajaxRequest.open("GET", startKmlUrl, true);
        ajaxRequest.send(null);
    }

    /**
     *
     * @param xmldoc - KML received
     * @param nLink - network link
     * @return
     */
	function extractEcosessionEvents(xmldoc, nLink){
		try{
			var extendedData = xmldoc.getElementsByTagName(KML_EXT_DATA);
			if(extendedData != null && extendedData.length > 0){
			  for(var e=0;e<extendedData.length;e++){
				var dataArray = extendedData[e].getElementsByTagName(KML_DATA);
				if(dataArray != null){
					var datalength = dataArray.length;
					var sessionId = getSessionId(nLink);

					for(var i=0; i< datalength; i++){
						if(dataArray[i].attributes[0].text == PARAM_ALL_EVENTS) {
							var params = [];
							params.push( dataArray[i].text);
							params.push( sessionId);
							parent.registerEcosessionEvents( params);
							break;
						}
					}
				}
			  }
			}
		}catch(err){
			//alert(err);
		}
	}

	function getSessionId(nLink){
		try{
			var sessionidPos = nLink.indexOf("ecosid=");
			if(sessionidPos!=-1){
				return nLink.substring(sessionidPos+7, nLink.indexOf("&",sessionidPos));
			}
		}catch(err){
			//alert(err);
		}

		return "0";
	}

    function getRefreshMode(refreshModeStr) {
        var refreshMode = ge.REFRESH_ON_CHANGE;

        if(refreshModeStr == "onInterval") {
            refreshMode = ge.REFRESH_ON_INTERVAL;
        } else if(refreshModeStr =="onExpire") {
            refreshMode = ge.REFRESH_ON_EXPIRE;
        }

        return refreshMode;
    }

    function getViewRefreshMode(viewRefreshModeStr) {
        var viewRefreshMode = ge.VIEW_REFRESH_NEVER;

        if(viewRefreshModeStr =="onStop") {
            viewRefreshMode = ge.VIEW_REFRESH_ON_STOP;
        } else if(viewRefreshModeStr =="onRegion") {
            viewRefreshMode = ge.VIEW_REFRESH_ON_REGION;
        }

        return viewRefreshMode;
    }


    function openKml(url, name){
    	setKMLSessionId(name,url);
        loadKml(url,name);
    }
    
    //added as fix  for 18730
    function setKMLSessionId(name, nLink) {
        var sessionidPos = nLink.indexOf("ecosid=");
        var sessionId = "0";
        if(sessionidPos!=-1){
            sessionId = nLink.substring(sessionidPos+7, nLink.indexOf("&",sessionidPos));
        }

        var artefactNamePos = nLink.indexOf("artefactname=");
        var artefactName = "";
        if(artefactNamePos != -1){
            artefactName = nLink.substring(artefactNamePos+13,nLink.indexOf("&",artefactNamePos));
        }
        parent.setSessionId(name, sessionId, artefactName);
    }

    
    function loadKml(url, name){
        if(!networkLinksArray[name]) {
            var networkLink = ge.createNetworkLink("");
            networkLink.setDescription("NetworkLink open to fetched content");
            networkLink.setName("Open NetworkLink");
            networkLink.setFlyToView(true);
            var link = ge.createLink("");
            link.setHref(url);
            networkLink.setLink(link);
            addNetworkLink(networkLink, name);
        } else {
            // A temp fix, but need to be relooked.. Shreekanth.V
            try{
                networkLinksArray[name].setFlyToView(true);
            }catch(e){

            }
        }
    }


	function isNetworkLinkOfViewRefreshType(name) {
		var networkLinks = networkLinksArray[name];
        if(networkLinks) {
			for(i = 0; i < networkLinks.length; i++) {
                if(networkLinks[i].getLink().getViewRefreshMode() == ge.VIEW_REFRESH_ON_STOP) {
					return true;
				}
            }
		}

		return false;
	}

    function removeLink(name)  {
        var networkLinks = networkLinksArray[name];
        if(networkLinks) {
            for(i = 0; i < networkLinks.length; i++) {
                ge.getFeatures().removeChild(networkLinks[i]);
            }
            networkLinksArray[name] = null;
        }
    }


    function removeNetworkLink(name)  {
        removeLink(name);
    }

    function finished(object) {
      if (!object) {
        return;
      }
      ge.getFeatures().appendChild(object);
    }

    function failureCallback(object) {
    }

   function submitLocation( address ) {
      if(!geocoder || geocoder == null) {
        alert('This service is not available');
        return;
      }
	geocoder.geocode({ 'address': address }, 
	function(results, status) {   
		if (status == google.maps.GeocoderStatus.OK) {   
			var point = results[0].geometry.location;     
			var la = ge.createLookAt('');
            		la.set(point.lat(), point.lng(), 100, ge.ALTITUDE_RELATIVE_TO_GROUND,0, 0, 400);
            		ge.getView().setAbstractView(la);
		}
	}
	);
      
    }

    var win1;
    function addAuxObject(kmlName,name,url){
        try {
            for(i=0;i<auxObjects.length;i++){
                if(auxObjects[i].kmlName!=kmlName){
                    auxObjects.pop();
                }else if((auxObjects[i].kmlName==kmlName) && (auxObjects[i].name==name)){
                    return;
                }
            }
            auxObjects.push({kmlName:kmlName,name:name,url:url});
            refreshButtons();

        } catch(e) {
            alert("[addAuxObject], ["+e.name+"]:["+e.message+"]");
        }
    }

    function refreshButtons(){
        buttonDiv = document.getElementById('buttonWin');
        innerHtmlCode = "<table width='100%'><tr>";
        for(i=0;i<auxObjects.length;i++){
        var convertUrl = auxObjects[i].url.replace(/"/g,"");
        convertUrl = convertUrl.replace(/'/g,'');
        innerHtmlCode+= "<td align='left'><input type='button' class='btnGray' onmouseover=\"hov(this,'btnGray btnhov')\" onmouseout=\"hov(this,'btnGray')\" onclick=\"outsideWindow( this, '" + auxObjects[i].name + "','"+auxObjects[i].name +"','"+convertUrl+"' );\"  name='button"+auxObjects[i].name+"' id='button"+auxObjects[i].name+"'  value='"+auxObjects[i].name+"'/></td>";

        if((i+1) % 1 == 0){
            innerHtmlCode +="</tr><tr>";
        }

        }
        innerHtmlCode+="</tr></table>"
        buttonDiv.innerHTML = innerHtmlCode;
    }

    function clearButtons(){
        try {
            auxObjects = new Array();
            buttonDiv = document.getElementById('buttonWin');
            buttonDiv.innerHTML = "";
            swfobject.removeSWF('AuxWin');
            refreshButtons();


            try{
                for(l=0;l< windowObjects.length;l++){
                    windowObjects[l].destroy();
                }
            }catch(err1){
            }

            try{
                infoFrame.destroy();
            }catch(e1r1){
            }

        try{
                document.getElementById('dock').innerHTML='';
            }catch(err1){
            }
        } catch(e) {
            alert("[clearButtons], ["+e.name+"]:["+e.message+"]");
        }
    }

    function highlightButton(loc, flag) {
        var btn = document.getElementsByTagName("INPUT");
        for (var i = 0; i < btn.length; i++) {
            if(loc != null && btn[i] == loc) {
                if(flag) {
                    changeButtonStyle(loc,'btnhov btnGray');
                } else {
                    changeButtonStyle(loc,'btnGray');
                }
                lastClickedBtn = loc;
            } else if (btn[i].type == "button") {
                changeButtonStyle(btn[i],'btnGray');
            }
        }

    }

    function slideAuxWindow(loc, winName){
            refreshAuxWindow(winName, true);
            showHideAux(loc, winName);

    }

    function refreshAuxWindow(winName, alwaysrefresh) {
        setProperSessionId();
        for(i=0;i<auxObjects.length;i++){
            if(auxObjects[i].name==winName){
                if(alwaysrefresh || (!alwaysrefresh && auxObjects[i].url.indexOf("autorefresh=true") > 0)) {
                    swfobject.removeSWF(winName+'AuxWin');
                    currentNetworkLinkName = auxObjects[i].kmlName;
                    createAuxObject(winName+'auxWindow1',winName,auxObjects[i].url);
                }
            }
        }
    }

    function showHideAux(loc, winName){
      var auxWindowObj = document.getElementById(winName);
      if(auxWindowObj.style.display == "none"){
        slidedown(winName);
        lastClickedAuxWindow = winName;
        highlightButton(loc,true);
      }else if(auxWindowObj.style.display != "none" && lastClickedAuxWindow == winName){
        slideup(winName);
        lastClickedAuxWindow = null;
        highlightButton(loc,false);
      }else{
        lastClickedAuxWindow = winName;
      }
    }

    function createAuxObject(window,name,url){
        var flashvars = {};
        var params = {};
        var attributes = {
            id: name+"AuxWin",
            name: name+"AuxWin",
            quality: "high",
            bgcolor: "#FFFFFFFF"
        };
        swfobject.embedSWF(url, window, "100%", "500", "9.0.0",flashvars, params, attributes);
    }


    function setProperSessionId(){
        for(i=0;i<auxObjects.length;i++){
            tmpUrl = auxObjects[i].url;
            if(tmpUrl.indexOf(sessionId)!= -1)continue;
            sessionidPos = tmpUrl.indexOf("ecosid=");
            if(sessionidPos!=-1){
                firstPart = tmpUrl.substring(0,sessionidPos+11);
                secondPart = tmpUrl.substring(tmpUrl.indexOf("&",sessionidPos));
                auxObjects[i].url = firstPart+sessionId+secondPart
            }
        }
    }

    function toggleLayer(layerId,switchOn){
        ge.getLayerRoot().enableLayerById(layerId, switchOn);
    }

    function updateOptions(option, switchOn,isMileFeet) {
       var options = ge.getOptions();
       if(option == "Status Bar") {
			options.setUnitsFeetMiles(isMileFeet);
            options.setStatusBarVisibility(switchOn);
	    } else if(option == "Grid") {
            options.setGridVisibility(switchOn);
       } else if(option == "Overview Map") {
            options.setOverviewMapVisibility(switchOn);
       } else if(option == "Scale Legend") {
            options.setScaleLegendVisibility(switchOn);
       } else if(option == "Atmosphere") {
            options.setAtmosphereVisibility(switchOn);
       } else if(option == "Mouse Navigation") {
            options.setMouseNavigationEnabled(switchOn);
       } else if(option == "Navigation Control") {
          if (switchOn) {
            ge.getNavigationControl().setVisibility(ge.VISIBILITY_SHOW);
          } else {
            ge.getNavigationControl().setVisibility(ge.VISIBILITY_HIDE);
          }
       } else if(option == "Sun") {
            showSun(switchOn);
       } else if(option == "Street View") {
            ge.getNavigationControl().setStreetViewEnabled (switchOn);
       }
    }

    function showSun(switchOn) {
      ge.getSun().setVisibility(switchOn);
    }


    function changeButtonStyle(loc,cls){
        if(loc.className) {
              loc.className=cls;
        }
    }

    function hov(loc,cls){
        if(lastClickedBtn != null && lastClickedBtn == loc) {
            return;
        }
        changeButtonStyle(loc,cls);
     }

var windowCount=0;
var windowRow=new Array();
var windowNames = new Array();
var windowObjects = new Array();
var objCount = 0;
function outsideWindow(obj, windowName, windowTitle, urlToVisit) {
    //document.getElementById('button'+windowName).disabled=true;

    try{
        var windowLeft=0;
        var windowTop=0;
        if(windowNames.length == 0){
            windowNames[windowCount] = windowName;
            windowRow[windowCount] = 0;
            windowLeft = 0;
            windowCount++;
        }

        for(i=0; i< windowNames.length; i++){
            if(windowNames[i] == windowName){
                windowLeft = (i % 2 )* 550;
                windowTop =windowRow[i]
            }
        }

        var windowPresentStatus =false;
        for(i=0; i< windowNames.length; i++){
            if(windowNames[i] == windowName){
                windowPresentStatus = true;
                break;
            }
        }

        if(!windowPresentStatus){
            windowNames[windowCount] = windowName;
            if((windowCount-1) % 2 == 1){
                windowRow[windowCount] =  (windowCount/2) * 550;
                windowTop = windowRow[windowCount];
            }else{
                    windowRow[windowCount]=windowRow[windowCount-1];
                    windowTop = windowRow[windowCount];
            }

            windowLeft = (windowCount % 2)*550;
            windowCount++;
        }



        //alert(urlToVisit.indexOf("http://") )
        if((urlToVisit.indexOf(".swf") == -1) && (urlToVisit.indexOf("http://") == 0)){
             win = new Window({id: windowName, className: "alphacube",  title:windowTitle,  width:500, height:500, top:windowTop, left: windowLeft, url: urlToVisit, parent:$('container')});
                //win.getContent().innerHTML = urlToVisit;
         }else if((urlToVisit.indexOf(".swf") == -1) && (urlToVisit.indexOf("<iframe") != -1)){
                win = new Window({id: windowName, className: "alphacube",  title:windowTitle,  width:500, height:500, top:windowTop, left: windowLeft, parent:$('container')});
                win.getContent().innerHTML = urlToVisit;
         }else{
             win = new Window({id: windowName, className: "alphacube",  title:windowTitle,  width:500, height:500, top:windowTop, left: windowLeft, parent:$('container')});
            win.getContent().innerHTML = '<div id="'+windowName+'" >    <div id="'+windowName+'auxWindow1" style="display:none; overflow:hidden;"></div></div>';
         }
        //win.getContent().innerHTML = '<div id="'+windowName+'" >  <div id="'+windowName+'auxWindow1" style="display:none; overflow:hidden;"></div></div>';
        win.setDestroyOnClose();
        win.show();
        win.setConstraint(true, {})
        win.toFront();
        windowObjects[objCount++] = win;
    }catch(Er){
    }
    slideAuxWindow(obj, windowName);
}

/**
 * this method get called once KML is generated and sent out to GE
 *  Extended data contains KML document level extended data
 * like created by , creation time .. starttime , endtime , timeformat , time slic , begin & end etc
 */
	
function onLoadComplete(){
	if(ge!=null){   	
		var extents = ge.getTime().getControl().getExtents();
		var begin = extents.getBegin().get();    
		var end = extents.getEnd().get(); 

			if(autoZoom!='true' && begin!='' && end!=''){
			extents.getBegin().set(begin);
			extents.getEnd().set(end);
			ge.getTime().setTimePrimitive(extents);
	    }
 	}	
}


function closeIt()
    {
    	ge.kill_();
    }