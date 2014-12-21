	
	/**
	 * The list of driving steps loaded from google.maps.Directions
	 * @type {Array.<Object>}
	 */
	var r_steps = [];
	
	/**
	 * The list of path vertices and their metadata for the driving directions
	 * @type {Array.<Object>}
	 */
	var r_path = []; // entire driving path
	
	/**
	 * Instead of using the plugin's built-in ID system, which doesn't like when
	 * IDs are reused, we will use a separate dictionary mapping ID to placemark
	 * object
	 * @type {Object}
	 */
	
	var r_placemarks = {};
	
	var r_pmArrays=[];
	
	var dragInfo=null;
	
	 var  directions;
	var r_geHelpers;
	var displayMode="";

	var routeLatLongs=null;
	var dragSourceLatLong=null;
	var lastRouteTime=null;
	var lastRouteDistance=null;
	function clearRoute(){
	//removeIFrame('','_Directions');
	if(r_geHelpers!=null)
	  r_geHelpers.clearFeatures(r_pmArrays);

	}
	
	function mapsDirectionsInitializer(wayPointsStr,displayType){
	  var map=null;
	 routeLatLongs=wayPointsStr;
	 // alert(" directions initializer :ge:"+ge);
	   displayMode =displayType;
	 // alert(" directions initializer :"+wayPointsStr);
	  directions = new google.maps.Directions(map, null);
	   r_geHelpers  = new GEHelpers(ge);
	 
	  google.maps.Event.addListener(directions, 'load', directionsLoaded);
	
	   //alert(" directions initializer1 :"+wayPointsStr);
	  var wayPoints = wayPointsStr.split(";");
	  directions.loadFromWaypoints(wayPoints,
	      {getSteps: true, getPolyline: true});
	//  alert(" directions initializer end");
	    
	  }
	var	dirText;
	/**
	 * Initialization after directions are loaded
	 */
	function directionsLoaded() {
	//  alert(" entered into directions loaded ");
	 
	
	 // build the path and step arrays from the google.maps.Directions route
	  buildPathStepArrays();
	//   if(displayMode=="map"){ 
	  r_geHelpers.clearFeatures(r_pmArrays);
	  r_placemarks = {};
	  r_pmArrays =[];
	  var cnt=0;
	  var numOfSteps;
     
	    dirText= '<h1>Summary :'+directions.getSummaryHtml()+'</h1>' ;
	var numOfRoutes =directions.getNumRoutes();
	  for (var r=0;r<numOfRoutes ;r++ )	{
	   var route = directions.getRoute(r);
	  var start = route.getStartGeocode();
	  var end = route.getEndGeocode();
	//  alert(" entered into directions loaded1 ");
	  // create the starting point placemark

	  r_placemarks['start'+r] = r_geHelpers.createPointPlacemark(
	      new google.maps.LatLng(start.Point.coordinates[1],
	                             start.Point.coordinates[0]),
	      { name:start.address,standardIcon: 'dd-start'});
		  if(cnt>0){
		  r_pmArrays[++cnt]=r_placemarks['start'+r];
		  }else{
			  r_pmArrays[cnt]=r_placemarks['start'+r];
		  }
	  registerMouseListeners(r_placemarks['start'+r]);
	   dirText=dirText+'<div id="dir-start">' + start.address + "</div>";
	   numOfSteps = route.getNumSteps();
	    dirText=dirText+"<ol>";
	  // create the point placemarks for each step in the driving directions
	  for (var i = 0; i < numOfSteps; i++) {
	    var step = route.getStep(i);
	 
		dirText=dirText+
						'<li class="dir-step" id="dir-step-' + i + '">' +
						step.getDescriptionHtml() +
						'<div class="note">' +step.getDistance().html + '</div>' + 
						'</li>';
	  }
	  dirText =dirText+'</ol>';
	//  alert(" entered into directions loaded2 ");
	  // create the ending point placemark
	  r_placemarks['end'+r] = r_geHelpers.createPointPlacemark(
	      new google.maps.LatLng(end.Point.coordinates[1],
	                             end.Point.coordinates[0]),
	      {name: end.address, standardIcon: 'dd-end'});
	   r_pmArrays[++cnt]=r_placemarks['end'+r];
	    registerMouseListeners(r_placemarks['end'+r]);
	    dirText=dirText+
					  '<div id="dir-end">' + end.address + '</div>';
	
	 
//	 alert(" entered into directions loaded 6");
	  
	
	  }

	    // build the route LineString; instead of creating a LineString using
	  // pushLatLngAlt, which has some performance issues, we will construct a
	  // KML blob and use parseKml() 
	  var lineStringKml = '<LineString><coordinates>\n';
	 // alert(" entered into directions loaded3 ");
	  var polyline = directions.getPolyline();
	  var numPolylineVertices = polyline.getVertexCount();
	  for (var i = 0; i < numPolylineVertices; i++){
		   var loc = polyline.getVertex(i);
	    lineStringKml +=
	        loc.lng().toString() + ',' +
	        loc.lat().toString() +
	        ',10\n';
	  }
	  lineStringKml += '</coordinates></LineString>';
	
	  // create the route placemark from the LineString KML blob
	  var routeLineString = ge.parseKml(lineStringKml);
	  routeLineString.setTessellate(true);
	//  alert(" entered into directions loaded 4");
	  var routePlacemark = ge.createPlacemark('');
	  routePlacemark.setGeometry(routeLineString);
	  r_placemarks['route'] = routePlacemark;
	  
//	  alert(" entered into directions loaded 5");
	  routePlacemark.setStyleSelector(
	      r_geHelpers.createLineStyle({width: 5, color: '88ff0000'}));
	  
	  ge.getFeatures().appendChild(routePlacemark);
	  r_pmArrays[++cnt]=routePlacemark;
		var currRouteTime	=directions.getDuration().seconds; 
		var	currRouteDistance=directions.getDistance().meters;
			  //directions_text
	  if(lastRouteTime!=null &&  lastRouteDistance!=null){
		  var inMiles =roundNumber(((currRouteDistance-lastRouteDistance)*0.000621371192),2);
		  var inSeconds =(currRouteTime-lastRouteTime);
		
		var diffText="<h2> Result of Re-Routing is "+inMiles +" Miles in distance";
		var hours = parseInt( inSeconds / 3600 ) % 24;
		var minutes = parseInt( inSeconds / 60 ) % 60;
		var seconds = inSeconds % 60;

var result = ", about "+ ((hours>=0 && hours < 10) ? "0" + hours : hours) + " hour(s) " + ((minutes>=0 && minutes < 10) ? "0" + minutes : minutes) + " Minutes " + ((seconds>=0 && seconds  < 10) ? "0" + seconds : seconds) +" Seconds";
			diffText=diffText+result +" in Time.</h2>";
			dirText=diffText+dirText ;
			lastRouteTime=currRouteTime;
			lastRouteDistance=currRouteDistance;
	  }	else{
		  lastRouteTime=currRouteTime;
			lastRouteDistance=currRouteDistance;
	  }
			  openInfoframeById("Directions","/magmage/viewer/directions.html");
	//openInfoframe("/magma/common/directions.html");

	
	setTimeout("timerSetDirections()",1000);
		//  alert(" entered into directions loaded 7");
			   // fly to the start of the route
	  flyToLatLng(new google.maps.LatLng(
	                 directions.getRoute(0).getStartGeocode().Point.coordinates[1], directions.getRoute(0).getEndGeocode().Point.coordinates[0]));

	  
	}

	function registerMouseListeners(placemark){
		  // listen for mousedown on the window (look specifically for point placemarks)
   google.earth.addEventListener(placemark, 'mousedown',mouseDownForDrag );
    
    // listen for mousemove on the globe
    google.earth.addEventListener(placemark, 'mousemove',mouseMoveForDrag);
    
    // listen for mouseup on the window
    google.earth.addEventListener(placemark, 'mouseup',mouseUpForDrag );
	}
	 function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
	}
function mouseDownForDrag(event) {
	  
      if (event.getTarget().getType() == 'KmlPlacemark' &&
          event.getTarget().getGeometry().getType() == 'KmlPoint') {
		//   alert(" mousedown event.getTarget().getType() :"+event.getTarget().getType());
		//alert(" mousedown event.getTarget().getGeometry().getType() :"+event.getTarget().getGeometry().getType());
       // event.preventDefault();
        var placemark = event.getTarget();
        dragSourceLatLong=placemark.getGeometry().getLatitude()+","+placemark.getGeometry().getLongitude();
        dragInfo = {
          placemark: event.getTarget(),
          dragged: false
        };
      } 
    }
 function mouseMoveForDrag(event) {
		
      if (dragInfo) {
        event.preventDefault();
        var point = dragInfo.placemark.getGeometry();
        point.setLatitude(event.getLatitude());
        point.setLongitude(event.getLongitude());
        dragInfo.dragged = true;
      }
    }
function mouseUpForDrag(event) {
		//	alert(" mouse up :"+ dragInfo);
      if (dragInfo) {
		  //alert(" mouse up inside if1:"+ dragInfo.draged);
        if (dragInfo.dragged) {
			// alert(" mouse up inside if2:"+ dragInfo.draged);
			var dragTargetLatLong =roundNumber(dragInfo.placemark.getGeometry().getLatitude(),6)+","+roundNumber(dragInfo.placemark.getGeometry().getLongitude(),6);
			//alert(" before replace :"+routeLatLongs +"\n dragSourceLatLong :"+dragSourceLatLong +"\n dragTargetLatLong:"+dragTargetLatLong);
			routeLatLongs=routeLatLongs.replace(dragSourceLatLong,dragTargetLatLong);
				//		alert(" after replace :"+routeLatLongs);
			clearRoute();
			mapsDirectionsInitializer(routeLatLongs,'');
          // if the placemark was dragged, prevent balloons from popping up
          event.preventDefault();
        }
        
        dragInfo = null;
      }
    }
	function timerSetDirections() {
		//parent.setDirections(dirText);
		parent.window.frames['_Directions'].document.getElementById('route-details').innerHTML=dirText;
	}
	/**
 * Fly the camera to the given step index in the route, and highlight it in
 * the directions list. Also show the placemark description balloon.
 * @param {number} stepNum The 0-based step index to fly to
 */
function flyToStep(stepNum) {
  var step = r_steps[stepNum];
  // alert(" ---flyToStep :"+step);
  var la = ge.createLookAt('');
  la.set(step.loc.lat(), step.loc.lng(),
      0, // altitude
      ge.ALTITUDE_RELATIVE_TO_GROUND,
      r_geHelpers.getHeading(step.loc, r_path[step.pathIndex + 1].loc),
      60, // tilt
      50 // range (inverse of zoom)
      );
  ge.getView().setAbstractView(la);

  // show the description balloon.
  var balloon = ge.createFeatureBalloon('');
  balloon.setFeature(r_placemarks['step-' + stepNum]);
  ge.setBalloon(balloon); 

 
}



/**
 * Move the camera to the given location, staring straight down, and unhighlight
 * all items in the left directions list
 * @param {google.maps.LatLng} loc The location to fly the camera to
 */
function flyToLatLng(loc) {
  var la = ge.createLookAt('');
  la.set(loc.lat(), loc.lng(),
      0, // altitude
      ge.ALTITUDE_RELATIVE_TO_GROUND,
      0, // heading
      0, // tilt
      5000 // range (inverse of zoom)
      );
  ge.getView().setAbstractView(la);
  

}
/**
 * Generates the DS_path and DS_step arrays from the global DS_directions
 * instance
 * 
 * NOTE: only the first route is used
 */
function buildPathStepArrays() {
  // begin processing the directions' steps and path
  r_steps = [];
  r_path = [];
  var numOfRoutes =directions.getNumRoutes();
  var polyline = directions.getPolyline();

 
  var numPolylineVertices = polyline.getVertexCount();

  for(r =0;r<numOfRoutes;r++){
	   var route = directions.getRoute(r);
	     var numSteps = route.getNumSteps();
  for (var i = 0; i < numSteps; i++) {
    var step = route.getStep(i);
    
    var firstPolylineIndex = step.getPolylineIndex();
    
    var lastPolylineIndex = -1;
    if (i == numSteps - 1)
      lastPolylineIndex = numPolylineVertices - 1;
    else {
      // subtract 2 because the last vertex of a step is duplicated
      // as the first vertex of the next step in google.maps.Directions results
      lastPolylineIndex = route.getStep(i + 1).getPolylineIndex() - 2;
    }
    
    r_steps.push({
      loc: step.getLatLng(),
      desc: step.getDescriptionHtml(),
      distanceHtml: step.getDistance().html,
      pathIndex: r_path.length
    });
     }
  }

}