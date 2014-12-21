<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    
<!--THIS IS THE CODE WITH THE DESIRED FUNCTIONALITY-->
<%@ page import="org.owasp.esapi.ESAPI" %>
<%@page import="com.enterprisehorizons.magma.server.admin.AdminConfigUtils" %>
<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@page pageEncoding="UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>            
<style type="text/css">
	html, body, #map-canvas {
	    height: 100%;
	   	width: 100%;
	    margin: 0px;
	    padding: 0px
	}
  	
  	#map-canvas object {
		width:100% !important;
	}
	
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

<script src="<%=(request.isSecure())?"https":"http"%>://maps.googleapis.com/maps/api/js?v=<%=ESAPI.encoder().encodeForHTML(AdminConfigUtils.getGoogleMapsVersion())%>&amp;sensor=false&amp;key=<%=ESAPI.encoder().encodeForHTML(request.getParameter("key"))%>" type="text/javascript"></script>

<script>
    //done changes to support google maps v3 - as the v2 support is deprecated from google
 	var myPano =null;
    var sv = new google.maps.StreetViewService();
    
	function initialize() {
 		var lookAtStr = parent.getCurrentView();
	  	var lat = 37.4419;
	  	var lon = -122.1419;
	  	if(lookAtStr && lookAtStr != '') {
		  	lookAtArray = lookAtStr.split(",");
		 	try {			  
				lon = parseFloat(lookAtArray[0]);
				lat = parseFloat(lookAtArray[1]);
		  	} catch (e) {
			  //ignore
		  	}
	  	}
	  	setMapView(lat,lon);
 	}

	google.maps.event.addDomListener(window, 'load', initialize);

	function setMapView(lat, lon) {	  
    	try {
	    	sv.getPanoramaByLocation(new google.maps.LatLng(parseFloat(lat), parseFloat(lon)),50,function(pnaoData,status){
				if(status == 'OK'){
		    		showStreet();
					var defaultPosition = new google.maps.LatLng(lat, lon);
					var panoramaOptions = {
		    			position: defaultPosition,
		    			pov:{
		      				heading: 165,
		      				pitch: 0
		    			},
		    			zoom: 1
		  			};
		   			myPano = new google.maps.StreetViewPanorama(document.getElementById('map-canvas'),panoramaOptions);
		  		}else{
		    		showError();
		    	}
	    	});
    	} catch(e) {
    	 	alert('Error ['+e.message+'] while setting the location in streeview');	
    	}
	}
    
    function showError() {   	
		if(document.getElementById("disclaimer").style.display == "none") {
			document.getElementById("disclaimer").style.display = "block";
			document.getElementById("map-canvas").style.display = "none";
   		}
    }  
	function showStreet() {   	
		if(document.getElementById("map-canvas").style.display == "none") {
			document.getElementById("map-canvas").style.display = "block";
			document.getElementById("disclaimer").style.display = "none";
   		}
    }  
</script>

</head>
<body bgcolor="black">
    <div name="disclaimer" id="disclaimer" style= "width: 100%; height: 100%; float:center; z-index: 0; background-color: black; display: none">
    	<center>
			<br/><br/>
     		<font color="white" size="5"><bean:message key="geframe.error.message.streetview" bundle="admin"/></font><br><br>	
     	</center>
   	</div>	
    <div name="map-canvas" id="map-canvas" style="width: 100%; height: 100%;float:left;z-index: 0;display: block">
    </div>
</body>
</html>