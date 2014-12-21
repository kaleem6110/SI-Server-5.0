/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*  Google Earth 3D Map Plugin Initialization - Space Time Insight
*
* Created On : 29th July 2009
*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
var ge = null;
	var gex = null;
	var placemark = null;
    var geocoder;
    var doc = null;
    //define your server name and port here
    //var magmaServerName = <%=serverUrl%>;
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
        
    function init() {
      google.earth.createInstance("map3d", successCallback);
	  //google.earth.createInstance(successCallback);
      geocoder = new GClientGeocoder();
    }

    function refresh() {
        parent.refresh
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
		  google.earth.addEventListener(ge.getGlobe(), "mouseup", globeWindowEventListener);
       } catch(e) {
       }      
      
      parent.enableFrame(true);
    }
    
	function setDefaults() {
	// add a navigation control
          ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);
		  //updateOptions("Navigation Control", true);
		  updateOptions("Atmosphere", true);
		  toggleLayer("Terrain", false);
		  toggleLayer("Border", true);
	}

   

    function globeWindowEventListener(event) {
        //alert("mouse clicked");
        var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
        var range = lookAt.getRange();
       
        if(autoRefresh) { 
            parent.refreshWindows();
        }
        if(!enableMouseListenersFlag) {
            event.stopPropagation(); 
            event.preventDefault(); 
            return;
        }
        lastClickedRange = range;
        lastClickedLookAt = lookAt;
        
        var  target = event.getTarget();
        if(target != null) {
            var type = target.getType();
            if(type == 'KmlPlacemark') {
            var desc = target.getDescription();
                event.stopPropagation(); 
                event.preventDefault(); 
                if(!(desc == '' || desc == 'null')) {
                    openFlashBalloon(event.getTarget()); 
                }

        
        }
		
    }
        
    function openFlashBalloon(currentPlaceMark) { 
         var b = ge.createHtmlDivBalloon(''); 
         b.setMaxWidth(800); 
         //b.setFeature(currentPlaceMark); 
         var div = document.createElement('DIV'); 
         div.innerHTML = '<b><font size="2" face="Verdana">'+currentPlaceMark.getName()+'</font></b>' 
                                +'<div>'+currentPlaceMark.getDescription()+'</div>';
         b.setContentDiv(div); 
         ge.setBalloon(b); 
    } 

    function openBalloon(content) {
         var b = ge.createHtmlDivBalloon(''); 
         b.setMaxWidth(800); 
         var div = document.createElement('DIV'); 
         div.innerHTML ='<div>'+content+'</div>';
         b.setContentDiv(div); 
         ge.setBalloon(b); 
    }


       
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

   
    

   

    function toggleLayer(layer,switchOn){
		if(layer=="Terrain"){
            ge.getLayerRoot().enableLayerById(ge.LAYER_TERRAIN, switchOn);
        }else if(layer=="Road"){
            ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, switchOn);
        }else if(layer=="Buildings"){
            ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, switchOn);
        }else if(layer=="Gray Buildings"){
            ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS_LOW_RESOLUTION, switchOn);
        }else if(layer=="Border"){
            ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, switchOn);
        }else if(layer=="Sun"){
            showSun(switchOn);
        }
    }   
    
    function updateOptions(option, switchOn) {
       var options = ge.getOptions();
      
       if(option == "Status Bar") {
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




/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
* Rubber Banding Scrit - Space Time Insight
*
*
* Created On: 29th July 2009
*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
var polygonPlacemark;
var allRubberBandedPm = new Array();
var polygonPm = new Array();
var rectangleCount = 0;
var tdData='' ;
var tableData = '';
var removeTDData = new Array();
var rubberBandedRectangles = new Array();
var lookAtView = new Array();
var coords = null;
var isMouseDown = false;
var lineStringPlacemark = null;
var isMouseDown = false;
var polygonType = null;
var polygonLineStringArray = new Array();
var polygonLineStringCount = 0;
var tempCount = 0;
var tempPointArray = new Array();
var finalLineStringPlacemark = null;
var dragInfo = null;
var draggablePlacemark = null;
var coordinatesString = null;
var dragMode = false;
var  globalPlacemarkObject = null;
var isEditEnabled = false;

 function activate(val){
        var options = ge.getOptions();
		//gex.dom.clearFeatures();
		try{
			removeBox(null);			
           // gex.dom.clearFeatures();
        }catch(err){
        }
		
		isEditEnabled = false;
        if(val == 'activate'){
            options.setMouseNavigationEnabled(true);
            polygonType = '';
            deActivateRectangle();
            deActivatePolygon();
			if(parent.designerMode != 'GEFRAME'){
				deActivateDragPlacemark();
				deActivateLineString();
			}
			activateGoogleEarth();
			/*
                To reset the Check Boxes & Button Panel
            */
            try{
				//parent.resetGoogleEarth(rectangleCount);     				
            }catch(err){}
        }
        else if(val == "deActivate"){
            options.setMouseNavigationEnabled(false);
            deActivatePolygon();
            polygonType = 'rectangle';
            deActivateGoogleEarth();
			deActivateDragPlacemark();
			deActivateLineString();
			activateRectangle();
       }else if(val == "draggable"){
            options.setMouseNavigationEnabled(true);
            deActivateRectangle();
            deActivatePolygon();
            deActivateGoogleEarth();
			polygonType = 'dragPlacemark';
            dragMode = false;
            deActivateLineString();
			activateDragPlacemark();
			alert(polygonType);
       }

	   try{
			parent.removeAllPlacemarks("deleteAll")
		}catch(er){
		}

	   
    }

function drawPolygon(){
        var options = ge.getOptions();
        options.setMouseNavigationEnabled(false);
        deActivateRectangle();
        deActivateGoogleEarth();
		deActivateDragPlacemark();
		deActivateLineString();		
		polygonType = 'polygon';
        try{
			removeBox(null);
           // gex.dom.clearFeatures();
        }catch(err){
        }

		try{
			parent.removeAllPlacemarks("deleteAll")
		}catch(er){
		}
		
		activatePolygon();
		
		document.getElementById('coordinates').value = ''
}

function drawLineStringPlacemark(){
	document.getElementById('coordinates').value = ''
	try{
           // gex.dom.clearFeatures();
		   removeBox(null);
    }catch(err){
    }
	try{
		parent.removeAllPlacemarks("deleteAll")
	}catch(er){
	}
	deActivateRectangle();
    deActivatePolygon();
    deActivateGoogleEarth();
	deActivateDragPlacemark();
	activateLineString();
    polygonType = 'lineString';
	options.setMouseNavigationEnabled(true);
}



function activateGoogleEarth(){
	try{
		google.earth.addEventListener(ge.getGlobe(), "mouseup", globeWindowEventListener);
	}catch(e1){
		//alert(e1 + "GE ACT")
	}

	try{
		google.earth.addEventListener(ge.getGlobe(), "click", globeWindowEventListener);
	}catch(e1){
		//alert(e1 + "GE ACT - click")
	}
	
	try{
		google.earth.addEventListener(ge.getGlobe(), "mousedown", globeWindowEventListener);
	}catch(e1){
		//alert(e1 + "GE ACT")
	}
}

function deActivateGoogleEarth(){
	try{
		google.earth.removeEventListener(ge.getGlobe(), "mouseup",globeWindowEventListener);
	}catch(e1){
		//alert(e1 + "GE DEACT")
	}

	try{
		google.earth.removeEventListener(ge.getGlobe(), "mousedown",globeWindowEventListener);
	}catch(e1){
		//alert(e1 + "GE DEACT")
	}
	
	try{
		google.earth.removeEventListener(ge.getGlobe(), "click",globeWindowEventListener);
	}catch(e1){
		//alert(e1 + "GE DEACT")
	}
	
}

function activateRectangle(){
	try{
		google.earth.addEventListener(ge.getGlobe(), "mousedown",geDownListener);
	}catch(e1){
		//alert(e1 + "REC ACT")
	}

	try{
		google.earth.addEventListener(ge.getGlobe(), "mouseup",geUpListener);
	}catch(e1){
		//alert(e1 + "REC ACT")
	}
	
	try{
		google.earth.addEventListener(ge.getGlobe(), "mousemove",geMoveListener);           
	}catch(e1){
		//alert(e1 + "REC ACT")
	}
}

function deActivateRectangle(){
	try{
		google.earth.removeEventListener(ge.getGlobe(), "mousedown",geDownListener);
	}catch(e1){
		//alert(e1 + "REC DEACT")
	}

	try{
		google.earth.removeEventListener(ge.getGlobe(), "mouseup",geUpListener);
	}catch(e1){
		//alert(e1 + "REC DEACT")
	}
	
	try{
		google.earth.removeEventListener(ge.getGlobe(), "mousemove",geMoveListener);            
	}catch(e1){
		//alert(e1 + "REC DEACT")
	}

}

function activatePolygon(){
     try{
		google.earth.addEventListener(ge.getGlobe(), "click", gePolygonClickListener);
		drawGEXPolygon();
	 }catch(p1){//alert(p1+"Polygon Act")
	 }
}

function deActivatePolygon(){
     try{
        google.earth.removeEventListener(ge.getGlobe(), "click",gePolygonClickListener);
		google.earth.addEventListener(ge.getGlobe(), "dblclick", globeZoomEventListener);
     }catch(err){//alert(err+"dePolygon Act")
	 }
}

function activateDragPlacemark(){
    google.earth.addEventListener(ge.getGlobe(), "click",geDragClickListener);  
}
 
function deActivateDragPlacemark(){
    try{		
        google.earth.removeEventListener(ge.getGlobe(), "click",geDragClickListener); 
    }catch(er){
    }
}

function activateLineString(){
	google.earth.addEventListener(ge.getGlobe(), "click",geLineStringClickListener); 
	
}
 
function deActivateLineString(){
    try{
		google.earth.removeEventListener(ge.getGlobe(), "click",geLineStringClickListener); 
    }catch(er){
    }
}

	
function globeZoomEventListener(kmlEvent){
	var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
	
	// Zoom out to twice the current range
	lookAt.setRange(lookAt.getRange() / 2);

	// Update the view in Google Earth
	ge.getView().setAbstractView(lookAt);

	// Get the current view
	/*var camera = ge.getView().copyAsCamera(ge.ALTITUDE_RELATIVE_TO_GROUND);

	// Zoom out to twice the current distance
	camera.setAltitude(camera.getAltitude() + 5000);

	// Update the view in Google Earth
	ge.getView().setAbstractView(camera); */
}


    function geDownListener(kmlEvent) {
        if(kmlEvent.getButton() == 2) {
         // removeCurrentBox(polygonPlacemark);  //routine that removes the box
          drawBox = false;
        }
        else {
            try{
             removeCurrentBox(polygonPlacemark);
            }catch(err){    
            }
          startX = kmlEvent.getLatitude();
          startY = kmlEvent.getLongitude();
          drawBox = true;
        }       
    }

    function geUpListener(kmlEvent) {
        if(drawBox == true){
            var endX = kmlEvent.getLatitude();
            var endY = kmlEvent.getLongitude();
			removeBox(null);
            DrawBox(startX, startY, endX, endY);
            drawBox = false;
            fillBox(polygonPlacemark);
            polygonType = 'rectangle';                        
        } 
         parent.changeButtonState("save", "true");
    }

    function populateAnalysisBasket(type){
        polygonType = type; 
        parent.invokeDialogBox();                       
    }

    function geMoveListener(kmlEvent) {
      if(drawBox == true){
        var endX = kmlEvent.getLatitude();
        var endY = kmlEvent.getLongitude();
        var startCount = allRubberBandedPm.length;
        removeBox(DrawBox(startX, startY, endX, endY));
        if(parent.designerMode == "GEFRAME"){
            deleteRubberbandedFeatures(0);
        }else if(parent.designerMode == "GEMODELER"){
            deleteRubberbandedFeatures(startCount);
        }
      }
    } 

   

    function DrawBox(sX, sY, eX, eY) {
	  var lookAt =  ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
	  //var lookAt =  gex.lookAt();	
      var lat = lookAt.getLatitude();
      var lng = lookAt.getLongitude();
	  
	 
	  polygonPlacemark = gex.dom.addPolygonPlacemark([[sX, sY], [eX, sY], [eX, eY], [sX, eY]], {
		  style: {
			poly: {
			  color: '#ff0',
			  opacity: 0.5	
			},
			line: {
			  color: '#f00',
			  width: 1,
              opacity: 0.5 
			}
		  }
		});	
	 fillBox(polygonPlacemark);	
	 document.getElementById('coordinates').value = sX+" "+sY+";"+eX+" "+sY+";"+eX+" "+eY+";"+sX+" "+eY+";"; 
	 document.getElementById('viewPort').value = gex.util.serializeView();	
	 globalPlacemarkObject = polygonPlacemark;
	 return polygonPlacemark;
	 
    }
    
	function fillBox(placemark){
        if (!placemark.getStyleSelector()) {
          placemark.setStyleSelector(ge.createStyle(''));
        }
        var lineStyle = placemark.getStyleSelector().getLineStyle();
        lineStyle.setWidth(lineStyle.getWidth() *  4 );
        lineStyle.getColor().set('dd0000ff');
        var polyColor =   placemark.getStyleSelector().getPolyStyle().getColor();
        polyColor.set('400000ff');
        
    }

	/*function removeBox(pm){
		try{
		  gex.dom.removeObject(pm);	 
		}catch(e1){}
	} */

    function removeBox(pm){
		var totalRegions = ge.getFeatures().getChildNodes().getLength();
		
		for(kmlPm=0;kmlPm<totalRegions;kmlPm++){
			var region = null;
			try{
			 region = ge.getFeatures().getChildNodes().item(kmlPm);
			}catch(er1){
				removeBox(pm);
			}
			if(region.getName() == null || region.getName() == ""){
				try{
					ge.getFeatures().removeChild(region);			
				}catch(er){					
					alert(er)
				}
			}
			//alert(ge.getFeatures().getChildNodes().getLength());
		}	
	}


    function createTable(selectedObjectValue, startDateValue, endDateValue, coordinatesValue){
        var placemarkName = selectedObjectValue;
        var tdEmptyData='';
        if( placemarkName != null){
            if(polygonType == 'rectangle'){                         
				parent.addGEPlacemark(rectangleCount, placemarkName, polygonType, startDateValue, endDateValue, document.getElementById('coordinates').value, document.getElementById('viewPort').value);
            }else if( polygonType == 'polygon'){
				setFinalCoordinatesString(globalPlacemarkObject.getGeometry().getOuterBoundary().getCoordinates());
				parent.addGEPlacemark(rectangleCount, placemarkName, polygonType, startDateValue, endDateValue, document.getElementById('coordinates').value, document.getElementById('viewPort').value);
				google.earth.removeEventListener(ge.getGlobe(), "dblclick", globeZoomEventListener);
				//globalPlacemarkObject = null; 
            } else if( polygonType == 'dragPlacemark'){   
				parent.addGEPlacemark(rectangleCount, placemarkName, polygonType, startDateValue, endDateValue, document.getElementById('coordinates').value, document.getElementById('viewPort').value);                				
            } else if( polygonType == 'lineString'){  			
				setFinalCoordinatesString(globalPlacemarkObject.getGeometry().getCoordinates());
				parent.addGEPlacemark(rectangleCount, placemarkName, polygonType, startDateValue, endDateValue, document.getElementById('coordinates').value, document.getElementById('viewPort').value);
				globalPlacemarkObject = null;
            }                
        }

        rectangleCount++;      
		try{
			removeBox(null);
           // gex.dom.clearFeatures();
        }catch(err){
        }
        //deleteRubberbandedFeatures(0);
		//gex.dom.clearFeatures();
        //parent.updatePlacemarksOnGE(rectangleCount);
    }

	/* 
		Returns the Coordinates of the Polygon / Line String / Simple Placemark. 
	*/
	function setFinalCoordinatesString(polygonCoordinatesArray){
		var coordinatesString = '';
		try{
			for (var j = 0; j < polygonCoordinatesArray.getLength(); j++) { 
				 var coord = polygonCoordinatesArray.get(j); 
				 coordinatesString += coord.getLatitude() +" "+ coord.getLongitude()+";";      
			 }  
			 document.getElementById('coordinates').value = coordinatesString;		
		}catch(er){
		}
	}

    function getPolygonCoordinatesString(placemarkId){
         for(k=0; k<rubberBandedRectangles.length; k++){
                if(placemarkId == k){
                    polyLineArray = polygonPm[k];
                    var coordinatesPolygonFinal = '';
                    for( i=0; i < polyLineArray.length;i++  ){
                        var polygonLineString = polyLineArray[i].getGeometry(); 
                        var coordinatesPolygon = ''; 
                        for (var j = 0; j < polygonLineString.getCoordinates().getLength(); j++) { 
                            var coord = polygonLineString.getCoordinates().get(j); 
                            coordinatesPolygon += coord.getLatitude() +":"+ coord.getLongitude()+":"+ coord.getAltitude()+";";                          
                         }  
                         coordinatesPolygonFinal = coordinatesPolygonFinal+"&"+coordinatesPolygon;
                    }
                     return coordinatesPolygonFinal ;
                }
        }
    }

  
	/* Edit Placemark Trigger Event
	*/
	function activatePolygonPlacemarkEditMode(kmlEvent){
		var name = kmlEvent.getTarget().getName();
		/*isEditEnabled = true;
		//gex.edit.editLineString(kmlEvent.getTarget().getGeometry());
		var cord = getSelectedPlacemarkCoordinatesString(kmlEvent.getTarget().getGeometry().getCoordinates());
		
		activateLineString();
		editPolyLineString(cord, name); */		
		parent.editRegionOnDblClick(name, 'editMode');

	}

	function activateJSPolygonPlacemarkEditMode(kmlEvent){
		gex.edit.editLineString(kmlEvent.getTarget().getGeometry().getOuterBoundary());
	}

	
    function gePolygonDownListener(kmlEvent){
        parent.changeButtonState("save", "false");
    }

    function gePolygonUpListener(kmlEvent){
        
    }
    
    function gePolygonClickListener(kmlEvent){
        parent.changeButtonState("save", "true");  		
		document.getElementById('coordinates').value += kmlEvent.getLatitude()+" "+ kmlEvent.getLongitude()+";";
		document.getElementById('viewPort').value = gex.util.serializeView();		
    }
    
	function drawGEXPolygon(){
		var polyPlacemark = new gex.dom.addPlacemark({
		  polygon: [],
		  style: {
			line: { width: 2, color: 'dd0000ff' },
			poly: { color: '400000ff' }
		  }
		});
		
		gex.edit.drawLineString(polyPlacemark.getGeometry().getOuterBoundary());	
		globalPlacemarkObject = polyPlacemark;
		google.earth.addEventListener(globalPlacemarkObject, 'dblclick', activateJSPolygonPlacemarkEditMode);
	}
    

    function save2AnalysisBasket(){
        if(polygonType == 'polygon'){
            populateAnalysisBasket('polygon');
        }else if(polygonType == 'rectangle'){
            populateAnalysisBasket('rectangle');
        }else if(polygonType == "dragPlacemark" ){
            populateAnalysisBasket('dragPlacemark');
        }else if(polygonType == 'lineString'){
            populateAnalysisBasket('lineString');
        }
        //deleteRubberbandedFeatures();
    }
    
    function resetPolygonGlobalValues(){
          polygonLineStringArray = null;
          polygonLineStringArray =  new Array();          
          polygonLineStringCount = 0;
          tempPointArray = null;
          tempPointArray = new Array();
          isMouseDown = false;
    }
    
    
    function showPolygon(coordinates, regionId){
		var pointsArray = getCordLatLongArray(coordinates, ",");
		var placemarkFromServer = gex.dom.addPlacemark({
								polygon: pointsArray,
								   name:regionId,			  
								style: {
									line: { width: 2, color: 'dd0000ff' },
									poly: { color: '400000ff' }
								}
							});
		
		google.earth.addEventListener(placemarkFromServer, 'dblclick', activatePolygonPlacemarkEditMode);
    }
	
	/*
		returns the Coordinates Point Array<latitude, longitude>
	*/
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

	function removePolygon(regionIdToRemove){
		//gex.dom.clearFeatures();
		try{
			ge.getFeatures().removeChild(getPlacemarkObjectById(regionIdToRemove));
		}catch(er){
		}

		//parent.updatePlacemarksOnGE(1);
	}

	/*
		Return the Placemark Object based on the regionId
	*/

	function getPlacemarkObjectById(placemarkId){
		var totalRegions = ge.getFeatures().getChildNodes().getLength();
		for(k=0;k<totalRegions;k++){
			var placemarkObject = ge.getFeatures().getChildNodes().item(k);
			if(placemarkObject.getName() == placemarkId){
				return ge.getFeatures().getChildNodes().item(k);
			}
		}
	}
	
	function editPolygon(coordinates, regionId){
		//gex.dom.clearFeatures();
		isEditEnabled = true;
		var pointsArray = getCordLatLongArray(coordinates, ",");
		var polyPlacemark = gex.dom.addPlacemark({
								polygon: pointsArray,
								style: {
									line: { width: 2, color: '8000ffff' },
									poly: { color: '400000ff' }
								}
							});

		gex.edit.editLineString(polyPlacemark.getGeometry().getOuterBoundary());
		globalPlacemarkObject = polyPlacemark;
	}

// Draggable Placemark 
     
     function geDragClickListener(kmlEvent){
        if(!dragMode && parent.operation != "update"){
			document.getElementById('coordinates').value = kmlEvent.getLatitude()+" "+ kmlEvent.getLongitude()+";";
			document.getElementById('viewPort').value = gex.util.serializeView();
			var pm = gex.dom.addPointPlacemark([kmlEvent.getLatitude(), kmlEvent.getLongitude()], {
			  icon: {
				stockIcon: 'paddle/blu-circle',
				hotSpot: { left: '50%', bottom: 0 }
			  }
			});

			var draggingStyle = gex.dom.buildStyle({
			  icon: {
				stockIcon: 'paddle/red-circle',
				hotSpot: { left: '50%', bottom: 0 }
			  }
			});

			gex.edit.makeDraggable(pm, {
			  dropCallback: function() {
				gex.edit.endDraggable(pm);
				dragMode= true;
			  },
			  draggingStyle: draggingStyle,
			  targetScreenOverlay: {
				icon: 'http://maps.google.com/mapfiles/kml/shapes/cross-hairs.png',
				overlayXY: { left: '50%', top: '50%' },
				screenXY: { left: 0, top: 0 },
				size: { width: 32, height: 32 }
			  }
			});	
			
			if(dragMode){
				gex.dom.removeObject(pm);
			}
			dragMode = true;
			//google.earth.addEventListener(pm, 'dblclick', activateSimplePlacemarkEditMode);
		}else{
			try{
				var placemark = kmlEvent.getTarget();
				var draggingStyle = gex.dom.buildStyle({
					  icon: {
						stockIcon: 'paddle/red-circle',
						hotSpot: { left: '50%', bottom: 0 }
					  }
					});

					gex.edit.makeDraggable(placemark, {
					  dropCallback: function() {
						gex.edit.endDraggable(placemark);	
						document.getElementById('coordinates').value = kmlEvent.getLatitude()+" "+ kmlEvent.getLongitude()+";";
						globalPlacemarkObject = placemark;
					  },
					  draggingStyle: draggingStyle,
					  targetScreenOverlay: {
						icon: 'http://maps.google.com/mapfiles/kml/shapes/cross-hairs.png',
						overlayXY: { left: '50%', top: '50%' },
						screenXY: { left: 0, top: 0 },
						size: { width: 32, height: 32 }
					  }
					});	
				//google.earth.addEventListener(placemark, 'dblclick', activateSimplePlacemarkEditMode);	
			}catch(er){
			}
		}

		
		
		parent.changeButtonState("save", "true");
     }

	function showDragPlacemark(coordinates, regionId){
		var pointsArray = getCordLatLongArray(coordinates, ",");
		var x0 = pointsArray[0][0];
		var y0 = pointsArray[0][1];
		var pointPlacemark = gex.dom.addPointPlacemark([x0, y0], {
								  name: regionId,	
								  icon: {
									stockIcon: 'paddle/blu-circle',
									hotSpot: { left: '50%', bottom: 0 }
								  }
								});		
		google.earth.addEventListener(pointPlacemark, 'dblclick', activateSimplePlacemarkEditMode);	
		return 	pointPlacemark;

	}

function editDraggablePlacemark(coordinates, regionId){
	var pointPlacemark = showDragPlacemark(coordinates, regionId);
	var draggingStyle = gex.dom.buildStyle({
			  icon: {
				stockIcon: 'paddle/red-circle',
				hotSpot: { left: '50%', bottom: 0 }
			  }
			});

			gex.edit.makeDraggable(pointPlacemark, {
			  dropCallback: function() {
				document.getElementById('coordinates').value = pointPlacemark.getLatitude()+" "+ pointPlacemark.getLongitude()+";";
				gex.edit.endDraggable(pointPlacemark);				
			  },
			  draggingStyle: draggingStyle,
			  targetScreenOverlay: {
				icon: 'http://maps.google.com/mapfiles/kml/shapes/cross-hairs.png',
				overlayXY: { left: '50%', top: '50%' },
				screenXY: { left: 0, top: 0 },
				size: { width: 32, height: 32 }
			  }
			});		
}

function activateSimplePlacemarkEditMode(kmlEvent){
	var name = kmlEvent.getTarget().getName();
	/*isEditEnabled = true;
	//gex.edit.editLineString(kmlEvent.getTarget().getGeometry());
	var cord = getSelectedPlacemarkCoordinatesString(kmlEvent.getTarget().getGeometry().getCoordinates());
	
	activateLineString();
	editPolyLineString(cord, name); */
	//alert(polygonType);

	//if(polygonType == "dragPlacemark"){
		parent.editRegionOnDblClick(name, 'editMode');
	//}	
}
//-------------- Line String ---  USING GEX API

function geLineStringClickListener(kmlEvent){
	parent.changeButtonState("save", "true");  		
	document.getElementById('coordinates').value += kmlEvent.getLatitude()+" "+ kmlEvent.getLongitude()+";";
	document.getElementById('viewPort').value = gex.util.serializeView();
	if(document.getElementById('coordinates').value.split(";").length - 1 == 2 && !isEditEnabled){
		parent.changeButtonState("save", "true");
		var pointsArray = getCordLatLongArray(document.getElementById('coordinates').value, " ");
		drawGEXLineString(pointsArray);
	} 
	
}


function drawGEXLineString(pointsArray){
	polyLineStringPlacemark = gex.dom.addPlacemark({
	  lineString: pointsArray,
	  style: {
		line: { width: 10, color: 'dd0000ff' },
		poly: { color: '400000ff' }
	  }
	});

	gex.edit.editLineString(polyLineStringPlacemark.getGeometry());
	globalPlacemarkObject = polyLineStringPlacemark;
	//google.earth.addEventListener(polyLineStringPlacemark, 'dblclick', activateJSLSPlacemarkEditMode);
}

function showLineString(coordinates, regionId){
	var pointsArray = getCordLatLongArray(coordinates, ",");	
	var polyLineStringPlacemark = gex.dom.addPlacemark({
	  lineString: pointsArray,
		  name:regionId,
	  style: {
		line: { width: 10, color: 'dd0000ff' },
		poly: { color: '400000ff' }
	  }
	});
	google.earth.addEventListener(polyLineStringPlacemark, 'dblclick', activateLSPlacemarkEditMode);
}

function editPolyLineString(coordinates, regionId){
	gex.dom.clearFeatures();
	isEditEnabled = true;
	var pointsArray = getCordLatLongArray(coordinates, ",");
	var polyLineStringPlacemark = gex.dom.addPlacemark({
	  lineString: pointsArray,
		  name:regionId,
	  style: {
		line: { width: 10, color: 'dd0000ff' },
		poly: { color: '400000ff' }
	  }
	});

	gex.edit.editLineString(polyLineStringPlacemark.getGeometry());
	globalPlacemarkObject = polyLineStringPlacemark;
}

function activateLSPlacemarkEditMode(kmlEvent){
	var name = kmlEvent.getTarget().getName();
	/*isEditEnabled = true;
	//gex.edit.editLineString(kmlEvent.getTarget().getGeometry());
	var cord = getSelectedPlacemarkCoordinatesString(kmlEvent.getTarget().getGeometry().getCoordinates());
	
	activateLineString();
	editPolyLineString(cord, name); */
	//alert(name);
	parent.editRegionOnDblClick(name, 'editMode');
}

/*function activateJSLSPlacemarkEditMode(kmlEvent){
	gex.edit.editLineString(kmlEvent.getTarget().getGeometry());
}*/

/*function activateLSPlacemarkEditMode(kmlEvent){
	var cord = getSelectedPlacemarkCoordinatesString(kmlEvent.getTarget().getGeometry().getCoordinates());
	alert(cord);
	var name = kmlEvent.getTarget().getName();
	editPolyLineString(cord, name);
} */


	function getSelectedPlacemarkCoordinatesString(polygonCoordinatesArray){
		var coordinatesString = '';
		try{
			for (var j = 0; j < polygonCoordinatesArray.getLength(); j++) { 
				 var coord = polygonCoordinatesArray.get(j); 
				 coordinatesString += coord.getLatitude() +","+ coord.getLongitude()+";";      
			 }  
			return 	coordinatesString;
		}catch(er){
		}
	}
