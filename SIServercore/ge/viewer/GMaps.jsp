<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" style="height:100%">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>

<script src="<%=(request.isSecure())?"https":"http"%>://maps.googleapis.com/maps/api/js?v=<%=ESAPI.encoder().encodeForHTML(AdminConfigUtils.getGoogleMapsVersion())%>&amp;sensor=false&amp;key=<%=ESAPI.encoder().encodeForHTML(request.getParameter("key"))%>" type="text/javascript"></script>
<style>
	html, body {
		margin: 0;
		padding: 0;
	} 
	
	input.small {
		font-size: 50%
	}
</style>

<style type="text/css"> 
	div.container {
		position:relative;
	}

	div.map {
		position:absolute;
		z-index:1;
	}
	
	div.over_map {
		position:relative;
		top:25px;
		right:10px;
		background: url(../images/1x1pixel.gif) repeat;
		z-index:2;
	}
</style>

<script type="text/javascript">
var map=null;
var trafficOverlayVisible=false;
var  trafficOverlay=null;
var streetOverlayVisible=false;
var  streetOverlay=null;
var streetViewVisible=false;
var  streetView=null;
var eventHandler=null;
var longitute = -122.1419;
var latitude = 37.4419;
var zoomLevel = 13;

//done changes to support google maps v3 - as the v2 support is deprecated from google
	function getCurrentMapView(){
		try {
			if(parent != null && parent.getSTViewerIFrame() != null){
				var currentView = parent.getSTViewerIFrame().getCurrentView();
				var currentViewTokens = currentView.split( "," );
				if(currentViewTokens != null && currentViewTokens.length > 3){
					longitute = parseFloat(currentViewTokens[0]);
					latitude = parseFloat(currentViewTokens[1]);
					var range = parseFloat(currentViewTokens[2]);
					zoomLevel = Math.round(26-(Math.log(range)/Math.log(2)));
				}
			}
		}catch (e) {
			showAlert('Error ['+e.message+'] occurred in loading Google Maps');
		}
 	}

 	function initialize() {
 		try{
 			getCurrentMapView();
 			var mapOptions = {
				center: new google.maps.LatLng(latitude, longitute),
				zoom: zoomLevel,
				mapTypeId: google.maps.MapTypeId.HYBRID
        	};
			map = new  google.maps.Map(document.getElementById("map_canvas"),mapOptions);
			trafficOverlay = new google.maps.TrafficLayer();
  			trafficOverlay.setMap(map);
			trafficOverlayVisible=true;
			streetOverlay=new google.maps.StreetViewCoverageLayer();
		}catch(e){
			showAlert("Error while loading gmaps API could be an issue with key or try reloading the page again - "+e.message);
		}
    }

	function enableTraffic(){
		if(!trafficOverlayVisible){
			trafficOverlayVisible=true;
			trafficOverlay.setMap(map);
		}else{
			trafficOverlayVisible=false;
			trafficOverlay.setMap(null);
		}
	}
	
	function enableStreets(){
		if(!streetOverlayVisible){
			streetOverlayVisible=true;
			streetOverlay.setMap(map);
		}else{
			streetOverlayVisible=false;
			streetOverlay.setMap(null);
		}
	}
	
	function enableStreetView(){
		if(!streetViewVisible){
			streetViewVisible=true;
			document.getElementById("map_stview_canvas").style.display="";
			eventHandler=google.maps.Event.addListener(map,"click", streetViewOnClick);
			// set some default streetview instead of displaying blank
			var loc = new google.maps.LatLng(latitude, longitute); 
			streetView.setLocationAndPOV(loc);
		}else{
			streetViewVisible=false;
			google.maps.Event.removeListener(eventHandler);
		 	document.getElementById("map_stview_canvas").style.display="none";
		}
	}
	
	function streetViewOnClick(verlay,latlng){
		streetView.setLocationAndPOV(latlng);
	}
	
	function setMapView(north,south,east,west){
		try{
			// Define the two corners of the bounding box
			var sw = new google.maps.LatLng(south, west);
			var ne = new google.maps.LatLng(north, east);

			// Create a bounding box
			var bounds = new google.maps.LatLngBounds(sw, ne);

			// Center map in the center of the bounding box
			// and calculate the appropriate zoom level
			map.setCenter(bounds.getCenter());
			map.fitBounds(bounds);
		}catch(e){
			showAlert(" err setmap view :"+e.message);
		}
	}
</script>
</head>

<body onload="initialize()" bgcolor="black" style="height:100%;margin:0">
	<div id="map_stview_canvas" style="width: 100%; height: 100%;float:left;display: none">
	</div>
				
	<div id="map_canvas" class="map" style="width: 100%; height: 100%;float:left;z-index: 0">&nbsp;
	</div>
	
	<div id="over_map" class="over_map" style="float:right;height: 20px">
		<button onclick="enableTraffic();" name="traffic" style="color: #000000; backgroundColor: white; font: small Arial; border: 1px solid black; padding: 0px; margin: 0px; textAlign: center; fontSize: 12px; cursor: pointer;">Traffic</button>
		<button onclick="enableStreets();" name="streets" style="color: #000000; backgroundColor: white; font: small Arial; border: 1px solid black; padding: 0px; margin: 0px; textAlign: center; fontSize: 12px; cursor: pointer;">Streets</button>
	</div>
</body>
</html>
