<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.util.StringUtils" %>
<%@page import="com.enterprisehorizons.magma.server.admin.CommonConfigUtils" %>
<%@page import="org.owasp.esapi.ESAPI"%>

<%
	double lookAtLat = StringUtils.getDouble(request.getParameter("lookAtLat"));
	double lookAtLon =  StringUtils.getDouble(request.getParameter("lookAtLon"));
	double lookAtAlt =  StringUtils.getDouble(request.getParameter("lookAtAlt"));
	double lookAtRange =  StringUtils.getDouble(request.getParameter("lookAtRange"));
	double lookAtTilt =  StringUtils.getDouble(request.getParameter("lookAtTilt"));
	double lookAtHeading =  StringUtils.getDouble(request.getParameter("lookAtHeading"));
	int geWidth =  StringUtils.getInt(request.getParameter("gewidth"));
	int geHeight =  StringUtils.getInt(request.getParameter("geheight"));
	String isPercentage = request.getParameter("isPercentage");

	String units = null;
	if(geWidth <= 0) {
		geWidth = 800;
	}

	if(geHeight <= 0) {
		geHeight = 500;
	}

	if(StringUtils.getBoolean(isPercentage)) {
		units = "%";
	} else {
		units = "px;";
	}
	geWidth=100;
	geHeight = 100;
	units = "%";
	
	String gekey = request.getParameter("gekey");
	String serverUrl = request.getParameter("serverUrl");
	String ecoFiles = request.getParameter("ecoFiles");
	String ecoFileParams = request.getParameter("ecoFileParams");
	String[] ecoFilesList = ecoFiles.split(",");
	String[] ecoFileParamsList = null;
	if(ecoFileParams != null) {
		ecoFileParamsList = ecoFileParams.split(",");
	}
	if(StringUtils.isNull(gekey)) {
		gekey = CommonConfigUtils.getConfigValue("gekey");
	}

	if(StringUtils.isNull(serverUrl)) {
		serverUrl = CommonConfigUtils.getConfigValue("serverurl");
		if(!StringUtils.isNull(serverUrl)) {
			serverUrl += ServerUtils.getContextName(request)+"/";
		}
	}

	if(StringUtils.isNull(serverUrl)) {
		serverUrl = ServerUtils.getServerContextBaseUrl(request);
	}
	

	//return "http://"+serverName+"<%=ServerUtils.getContextName(request)%>/MAGMARequestHandler?ecoexpmodel="+ecofilename+"&rendertype=kml";
%>
<html>
  <head>
	<title>Google Earth Browser Plugin</title>
     
    <script src="http://www.google.com/jsapi?key=<%=ESAPI.encoder().encodeForHTML(gekey)%>"></script>
    <script type="text/javascript" src="magma_ajax.js"></script>

    <script>
    var kmlUrlList = new Array();
    var staticKmlUrlList = new Array();
    
<%
	int staticKmlIndex = 0;
	for (int i = 0; i< ecoFilesList.length; i++) {
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
	  kmlUrlList[<%=i%>] = "<%=ESAPI.encoder().encodeForHTML(kmlUrl)%>";
<%			
		} else if((ecoFilesList[i].indexOf(".kml") != -1) || (ecoFilesList[i].indexOf(".kmz") != -1)) {
			String kmlUrl = serverUrl+""+ServerUtils.getContextName(request)+"/"+ecoFilesList[i];
%>
	  	staticKmlUrlList[<%=staticKmlIndex%>] = "<%=ESAPI.encoder().encodeForHTML(kmlUrl)%>";
<%			
		staticKmlIndex++;
		}
	}
%>    
	  google.load("earth", "1");
	  google.load("maps", "2");
	  var ge = null;
	  var networkLinksArray = new Array();
	  var viewFormat = "bboxWest=[bboxWest]&bboxSouth=[bboxSouth]&bboxEast=[bboxEast]&bboxNorth=[bboxNorth]&lookatLon=[lookatLon]&lookatLat=[lookatLat]&lookatRange=[lookatRange]&lookatTilt=[lookatTilt]&lookatHeading=[lookatHeading]&horizFov=[horizFov]&vertFov=[vertFov]&horizPixels=[horizPixels]&vertPixels=[vertPixels]&terrainEnabled=[terrainEnabled]";
		
	  function init() {
	    google.earth.createInstance("map3d", initCallback, failureCallback);
	    geocoder = new GClientGeocoder();
	  }
	
	  function initCallback(object) {
	    ge = object;
	    ge.getWindow().setVisibility(true);
	    ge.getNavigationControl().setVisibility(ge.VISIBILITY_HIDE);
	    //ge.getOptions().setMouseNavigationEnabled(false);

	    var layerRoot = ge.getLayerRoot();
	    var terrainLayer = layerRoot.getLayerById(ge.LAYER_TERRAIN);
	    if (terrainLayer.getVisibility()) {
	      layerRoot.enableLayerById(ge.LAYER_TERRAIN, false);
	    }
   		google.earth.addEventListener(ge.getGlobe(), "mouseup", globeWindowEventListener);

		for(i=0;i<kmlUrlList.length;i++){
	    	setTimeout("initAjax('"+kmlUrlList[i]+"','test"+i+"')",2000*(i+1));
	    }

	    
	    for(i=0;i<staticKmlUrlList.length;i++){
	    	setTimeout("openKml('"+staticKmlUrlList[i]+"','static"+i+"')",2000*(i+1));
	    }

		<%
			if(lookAtLat > 0)  {
		%>
				lookAt(<%=lookAtLat%>,<%=lookAtLon%>,<%=lookAtAlt%>,<%=lookAtRange%>,<%=lookAtTilt%>,<%=lookAtHeading%>);
		<%
			}
		%>
	  }
	  
  	  function failureCallback(object) {
	  }

	  function submitLocation( address ) {
	    geocoder.getLatLng( address, 
	      function(point){
	        if (point && ge != null) {
	          var la = ge.createLookAt('');     
	          la.set(point.y, point.x, 100, ge.ALTITUDE_RELATIVE_TO_GROUND,0, 0, 400);
	          ge.getView().setAbstractView(la);
	        }
	      }
	    )
	  }
	  
	  function lookAt(lat,lon,altitude,range,tilt,heading) {
		 var la = ge.createLookAt('');     
	      la.set(lat,lon, altitude, ge.ALTITUDE_RELATIVE_TO_GROUND,heading, tilt, range);
	          ge.getView().setAbstractView(la);
	  }


	function globeWindowEventListener(event) {
		var  target = event.getTarget();
		if(target != null) {
			var type = target.getType();
			if(type == 'KmlPlacemark') {
				var desc = target.getDescription();
				event.stopPropagation(); 
				event.preventDefault(); 
				openFlashBalloon(event.getTarget()); 
			}
		}
	}

	function openFlashBalloon(currentPlaceMark) { 
		 var b = ge.createHtmlDivBalloon(''); 
		 b.setMaxWidth(800); 
		 b.setFeature(currentPlaceMark); 
		 var div = document.createElement('DIV'); 
		 div.innerHTML ='<div>'+currentPlaceMark.getDescription()+'</div>';
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

	function loadNetworkLink(name, nLink,refreshMode,viewRefreshMode,refreshInterval,flyToView) {

		var networkLink = ge.createNetworkLink("");
		networkLink.setDescription("NetworkLink open to fetched content");
		networkLink.setName("Open NetworkLink");
		if(flyToView=="true"){
			networkLink.setFlyToView(true);
		}
		var link = ge.createLink("");
		if(viewRefreshMode == ge.VIEW_REFRESH_ON_STOP){
			link.setViewRefreshMode(viewRefreshMode);
			link.setViewRefreshTime(refreshInterval);
			link.setViewFormat(viewFormat);
		} else {
			link.setRefreshMode(refreshMode);
			 if(refreshInterval != null && refreshInterval != "null"){
				link.setRefreshInterval(refreshInterval);
			}
		}
		sessionidPos = nLink.indexOf("ecosid=");
		sessionId = "0";
		if(sessionidPos!=-1){
			sessionId = nLink.substring(sessionidPos+7,nLink.indexOf("&",sessionidPos)); 
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


function initAjax(startKmlUrl, name){
	//alert(name);
		var ajaxRequest = google.maps.XmlHttp.create();
		removeNetworkLink(name);
		ajaxRequest.onreadystatechange = function(){
			if(ajaxRequest.readyState == 4){
				var xmldoc = google.maps.Xml.parse(ajaxRequest.responseText);
				//alert(xmldoc.all.getElementsByTagName("NetworkLink").length);
				var kmlUrl = extractLink(xmldoc);
				if(!kmlUrl) {
					alert('The KML could not be parsed, Please check the link.');
					return;
				}
				
				//alert(kmlUrl);
				for(i = 0; i < kmlUrl.length; i++) {
					//alert(kmlUrl[i]);
					linkParams = kmlUrl[i].split(",");
					refreshMode = getRefreshMode(linkParams[2]);
					viewRefreshMode = getViewRefreshMode(linkParams[3]);
									
					loadNetworkLink(name, linkParams[0],refreshMode,viewRefreshMode,linkParams[1],linkParams[4]);
				}
			}
		}
		
		ajaxRequest.open("POST", startKmlUrl, true);
		ajaxRequest.send(null);
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
		try{
			clearButtons();
		}catch(err){
		}
		if(!networkLinksArray[name]) {
			var networkLink = ge.createNetworkLink("");
			networkLink.setDescription("NetworkLink open to fetched content");
			networkLink.setName("Open NetworkLink");
			networkLink.setFlyToView(true);
			var link = ge.createLink("");
			link.setHref(url);
			networkLink.setLink(link);
			addNetworkLink(networkLink, name);
			//networkLinksArray[name] = networkLink;
			//ge.getFeatures().appendChild(networkLink);
		} else {
			networkLinksArray[name].setFlyToView(true);
		}
	}

	function removeNetworkLink(name)  {
		var networkLinks = networkLinksArray[name];
		if(networkLinks) {
			for(i = 0; i < networkLinks.length; i++) {
				ge.getFeatures().removeChild(networkLinks[i]);
			}
			networkLinksArray[name] = null;
		}
	}
    </script>
  </head>
  <body onload='init()' style='margin:0;padding:0;overflow:hidden'>
	<div id='map3d' style='height:<%=geHeight%><%=units%>;width:<%=geWidth%><%=units%>'> 
	</div>
</body>

</html>