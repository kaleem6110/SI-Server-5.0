<%@page import="com.enterprisehorizons.constants.CommonConstants"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.enterprisehorizons.magma.server.admin.CommonConfigUtils" %>
<%@page import="com.enterprisehorizons.util.StringUtils"%>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@ page import="org.owasp.esapi.ESAPI" %>
<%

    if(session == null || session.getAttribute(ServerUtils.USER_BEAN_NAME) == null){
        response.sendRedirect("/");
        return;
    }
    UserBean userBean = (UserBean) session.getAttribute(ServerUtils.USER_BEAN_NAME);

    String serverUrl = ServerUtils.getServerContextBaseUrl(request);
    String serverRootUrl = ServerUtils.getServerRootUrl(request);
    String geKey = request.getParameter(ServerUtils.PARAM_GE_KEY);
    String geClientId = request.getParameter(ServerUtils.PARAM_GE_CLIENT_ID);
    String groupId = request.getParameter(ServerUtils.PARAM_GROUP_ID);
    String domainId = request.getParameter(ServerUtils.PARAM_DOMAIN_ID);
    String moduleId = request.getParameter(ServerUtils.PARAM_MODULE_ID);
    String languageId = request.getParameter(ServerUtils.PARAM_LANGUAGE_ID);
    String languageCd = request.getParameter(ServerUtils.PARAM_LANGUAGE_CODE);
    String coreServerUrl = serverUrl;//serverRootUrl+CommonConstants.FORWARD_SLASH + CommonConfigUtils.getConfigValue("coreservercontext")+CommonConstants.FORWARD_SLASH;
    String adminServerUrl = serverUrl;//serverRootUrl+CommonConstants.FORWARD_SLASH + CommonConfigUtils.getConfigValue("adminservercontext")+CommonConstants.FORWARD_SLASH;

    //System.out.println("geKey = "+geKey);

    if(StringUtils.isNull(domainId)) {
        domainId = String.valueOf(userBean.getDomainId());
    }
    if(domainId == null) {
        domainId = "";
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


    if(StringUtils.isNull(geKey)) {
        geKey = CommonConfigUtils.getConfigValue(ServerUtils.PARAM_GE_KEY);
    }

    if(StringUtils.isNull(geClientId)) {
        geClientId = CommonConfigUtils.getConfigValue(ServerUtils.PARAM_GE_CLIENT_ID);
    }

%>
<jsp:include page="/common/commonheader.jsp"/>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <style type="text/css">
          html { height: 100% }
          body { height: 100%; margin: 0px; padding: 0px }
          #content { height: 100% }
        </style>
        <script type="text/javascript" src="<%=ESAPI.encoder().encodeForHTML(serverUrl)%>js/ge/xmlhttputils.js"></script>
        <script type="text/javascript" src="magma_ajax.js"></script>
        <script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/swfobject.js"></script>
        <script type="text/javascript" src="motionpack.js"></script>
        <script type="text/javascript" src="http://www.google.com/jsapi?key=<%=ESAPI.encoder().encodeForHTML(geKey)%>"></script>
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
        <!--
        <script src="http://maps.google.com/maps?file=api&amp;v=2.x&amp;key=<%=ESAPI.encoder().encodeForHTML(geKey)%>" type="text/javascript"></script>
        <script type="text/javascript" src="popupmarker.js"></script>
        <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=<%=ESAPI.encoder().encodeForHTML(geKey)%>" type="text/javascript"></script>
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
        <script src="http://www.google.com/jsapi?key=<%=ESAPI.encoder().encodeForHTML(geKey)%>"></script>
        <script src="http://earth-api-utility-library.googlecode.com/svn/tags/extensions-0.1.2/dist/extensions.pack.js"> </script>
        -->
        <script type="text/javascript">

            var networkLinksArray = new Array();
            var map;
            var geocoder;
            var localSearch;
            var trafficInfo;
            var streetviewInfo;
            var streetViewOn = false;
            //var svc = new GStreetviewClient();

            /*
            google.load("maps", "2.x");
            google.load("elements", "1", {
              packages : ["localsearch"]
            });
            */

            var layer;
            function initialize() {
                var latlng = new google.maps.LatLng(35.80137497329432, -117.3298855823043);
                var mapOptions = {
                  zoom: 6,
                  center: latlng,
                  mapTypeId: google.maps.MapTypeId.HYBRID
                }
                map = new google.maps.Map(document.getElementById("content"), mapOptions);

                //var content = document.getElementById("content");
                //content.style.border = "1px solid #979797";
                //content.style.height = "350px";

                //map = new google.maps.Map2(content);
                //map.setCenter(new GLatLng(38.6, -98), 4);
                //map.setUIToDefault();

                //var topRight = new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(10,10));
                //map.addControl(new GLargeMapControl3D(), topRight);
                //map.setMapType(G_HYBRID_MAP);

                // map.setCenter(new google.maps.LatLng(46.688681, 7.686800), 11);
                //map2.addControl(lsc2, new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(-282, -2)));
                //showLocalSearchControl(true);
                //geocoder = new GClientGeocoder();

                //enable parent frame
                parent.enableFrame(true);



                var url = 'http://stiapp.spacetimeinsight.com:9090/magma/SCE_Districts_Color.kmz';
                layer = new google.maps.KmlLayer(url);

                // This is the new created object not the url property of kml
                layer.setMap(map);

              // Trying the store the viewport of every displayed layer
              google.maps.event.addListenerOnce(layer, "defaultviewport_changed", function() {
                // Best results using this listener and getDefaultViewport
                layer = this.getDefaultViewport();
              });

                /*
                GEvent.addListener(map,"click", function(overlay,p) { if (streetViewOn && p) { svc.getNearestPanorama(p, function(reply) { if (reply.code = 200) { if (reply.Location) { var html = "<div class=\"header\"><b>"+reply.Location.description+"</div></b>" + "<div class=\"bubble\"><embed src=\"http://maps.google.com/mapfiles/cb/googlepano.040.swf\" quality=\"high\" bgcolor=\"#EFEFEF\" style=\"width: 100%; height: 270px;\" wmode=\"opaque\" swliveconnect=\"false\" id=\"googlepano\" allowscriptaccess=\"always\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" scale=\"noscale\" salign=\"lt\" flashvars=\"panoId="+reply.Location.panoId+"&amp;directionMap=N:N,W:W,S:S,E:E,NW:NW,NE:NE,SW:SW,SE:SE&amp;yaw=350.08435065836153&amp;zoom=0&amp;browser=3&amp;serverURLPrefix=http://cbk0.google.com/cbk&amp;pitch=10.983050525042998&amp;viewHeight=0.616426117417295\" align=\"middle\"></embed></div>" + "<div class=\"footer\">Copyright: "+reply.Data.copyright+"<br></div>" ; var pp = new GLatLng(parseFloat(reply.Location.lat),parseFloat(reply.Location.lng));  map.openInfoWindowHtml(pp,html); } else { } } else {  GLog.write("Error : "+reply.code); } } );}});
                */
            }

            //google.setOnLoadCallback(OnLoad);

            function showTrafficLayer(flag) {
                if(flag) {
                    if(!trafficInfo) {
                        //add traffic overlay
                        var trafficOptions = {incidents:true};
                        trafficInfo = new GTrafficOverlay(trafficOptions);
                    }
                    map.addOverlay(trafficInfo);
                } else if(trafficInfo) {
                    map.removeOverlay(trafficInfo);
                }
            }

            function showStreetViewLayer(flag) {
                if(flag) {
                    if(!streetviewInfo) {
                        streetviewInfo = new GStreetviewOverlay();
                    }
                    map.addOverlay(streetviewInfo);
                    streetViewOn = true;
                } else if(streetviewInfo) {
                    map.removeOverlay(streetviewInfo);
                    streetViewOn = false;
                }
            }

            function showLocalSearchControl(flag) {
                if(flag) {
                    if(!localSearch) {
                        localSearch = new google.elements.LocalSearch();
                    }
                    map.addControl(localSearch, new GControlPosition(G_ANCHOR_BOTTOM_RIGHT, new GSize(0, 17)));
                } else  if(localSearch) {
                    map.removeControl(localSearch);
                }
            }


            function initAjax(startKmlUrl, name){
                createAjax(startKmlUrl, name);
            }

             function submitLocation( address ) {
              geocoder.getLatLng( address,
                function(point){
                  if (point && map != null) {
                    _lookat(point.x+','+point.y+',0');
                  }
                }
              )
            }


            function createAjax(startKmlUrl, name){
                removeLink(name);
                var ajaxRequest = createXMLHttpRequest();//google.maps.XmlHttp.create();
                ajaxRequest.onreadystatechange = function(){
                    if(ajaxRequest.readyState == 4){
                        var xmldoc = parseXmlString(ajaxRequest.responseText);//google.maps.Xml.parse(ajaxRequest.responseText);
                        //alert(xmldoc.all.getElementsByTagName("NetworkLink").length);
                        var kmlUrl = extractLink(xmldoc);
                        if(!kmlUrl) {
                            alert('The KML could not be parsed, Please check the link.');
                            return;
                        }

                        for(i = 0; i < kmlUrl.length; i++) {
                            linkParams = kmlUrl[i].split(",");
                            //loadNetworkLink(name, linkParams[0],linkParams[2],linkParams[3],linkParams[1],linkParams[4]);
                            //alert(linkParams.length);
                            refreshMode = "";//getRefreshMode(linkParams[2]);
                            viewRefreshMode = "";//getViewRefreshMode(linkParams[3]);
                            //if(isFetchKml) {
                            //  loadFetchKml(name, linkParams[0]);
                            //} else {
                            loadNetworkLink(name, linkParams[0],refreshMode,viewRefreshMode,linkParams[1],linkParams[4],linkParams[5]);
                            //}
                        }
                    }
                }

                ajaxRequest.open("GET", startKmlUrl, true);
                ajaxRequest.send(null);
            }
            /*
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
            */

            function loadNetworkLink(name, nLink,refreshMode,viewRefreshMode,refreshInterval,flyToView,viewRefreshTime) {
/*
                    var networkLink = ge.createNetworkLink("");
                    networkLink.setDescription("NetworkLink open to fetched content");
                    networkLink.setName("Open NetworkLink");
                    if(flyToView=="true"){
                        networkLink.setFlyToView(true);
                    }
                    var link = ge.createLink("");
                    //alert(refreshMode+":"+viewRefreshMode+":"+refreshInterval+":"+viewRefreshTime);
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
                    setSessionId(name, nLink);

                    link.setHref(nLink);
                    networkLink.setLink(link);
                    addNetworkLink(networkLink, name);
                }
            function loadNetworkLink(name, nLink,refreshMode,viewRefreshMode,refreshInterval,flyToView) {
                */
                try {



                //parent.setSessionId(name, sessionId, artefactName);
                //for test - delete later
                nLink = nLink.replace(/&rendertype=kml/g,"");
                //nLink += "&rendertype=kml";
                //alert(nLink);
                //var geoXml = new GGeoXml(nLink);
                //nLink = "http://localhost:8080/magma/ServiceOrders.kml";
                //var layer = new google.maps.KmlLayer(nLink+"&rendertype=kml");
                //var layer = new google.maps.KmlLayer('http://localhost:8080/magma/newyork.kml');
                //layer.setMap(map);
                /*
                var layer = new google.maps.KmlLayer(
                  'http://sites.google.com/site/mxamples/germany-shape.kmz',
                  {  suppressInfoWindows: false,
                     map: map});
                    */
                layer = new google.maps.KmlLayer('http://sites.google.com/site/mxamples/germany-shape.kmz');

                // This is the new created object not the url property of kml
                layer.setMap(map);

              // Trying the store the viewport of every displayed layer
              google.maps.event.addListenerOnce(layer, "defaultviewport_changed", function() {
                // Best results using this listener and getDefaultViewport
                layer = this.getDefaultViewport();
              });

                //alert(nLink);
                //link.setHref(nLink);
                //networkLink.setLink(link);
                addNetworkLink(layer, name);
                setSessionId(name, nLink);
                } catch (e) {
                    alert('Error ['+e.message+'] occurred while loading the link'+nLink);
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

            function addNetworkLink(networkLink, name) {
                var networkLinks = networkLinksArray[name];
                if(!networkLinks) {
                    networkLinks = new Array();
                }
                networkLinks.push(networkLink);
                networkLinksArray[name] = networkLinks;
                //map.addOverlay(networkLink);

                //alert('after adding '+name);

                //ge.getFeatures().appendChild(networkLink);
            }

            function removeLink(name)  {
                //alert(name);
                var networkLinks = networkLinksArray[name];
                if(networkLinks) {
                    for(i = 0; i < networkLinks.length; i++) {
                        //ge.getFeatures().removeChild(networkLinks[i]);
                        //map.removeOverlay(networkLinks[i]);
                        //alert(networkLinks[i]);
                        networkLinks[i].setMap(null);
                        //alert(networkLinks[i]);
                    }
                    networkLinksArray[name] = null;
                }
            }


            function removeNetworkLink(name)  {
                removeLink(name);
            }
            function _lookatRange(coordStr, range) {
                if(coordStr != null) {
                    var coords = coordStr.split(",");
                    var latitude;
                    var longitude;
                    var altitude;
                    var zoomLevel = 0;

                    //var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
                    //alert(coords[1]+":"+coords[0]+":"+coords[3]);
                    if(coords[1]) {
                        latitude = parseFloat(coords[1]);
                    }
                    if(coords[0]) {
                        longitude = parseFloat(coords[0]);
                    }
                    if(coords[2]) {
                        altitude = parseFloat(coords[2]);
                    }

                    if(coords.length == 4 && coords[3]) {
                        zoomLevel = parseFloat(coords[3]);
                    } else if(range != null) {
                        zoomLevel = parseFloat(range);
                    }

                    if(zoomLevel > 17) {
                        zoomLevel = 0;
                    }
                    //alert(zoomLevel);
                    map.setCenter(new google.maps.LatLng(latitude,longitude));
                    map.setZoom(zoomLevel);
                }
            }

            function _lookat(coordStr) {
                _lookatRange(coordStr,16);
            }

             function hideBalloon() {
             }

             function _highlight(coordStr) {
             }

             function _setHighlightPlacemarkStyle(style) {
             }

/* ****************************Ruler Code  START ********************************

    var routePoints = new Array();
    var routeMarkers = new Array();
    var routeOverlays = new Array();
    //var map;
    var totalDistance = 0.0;
    var lineIx = 0;
    var coreServerUrl = '<%=ESAPI.encoder().encodeForHTML(coreServerUrl)%>';
    var isClosed = false;
    var baseIcon = new GIcon();
    baseIcon.iconSize=new GSize(16,16);
    baseIcon.iconAnchor=new GPoint(8,8);
    baseIcon.infoWindowAnchor=new GPoint(10,0);


    var greenIcon = (new GIcon(baseIcon, coreServerUrl + "images/dot.png", null, ""));


    function distnaceCalculation(mode){
        if(mode == 'active'){
            map.disableDoubleClickZoom();
            GEvent.addListener(map, "click", mapClick);
            GEvent.addListener(map, "singlerightclick", mapSingleRightClick);
        } else {
            if(!isClosed){
                addClosing();
            }
            isClosed = false;
            clearAll();
            GEvent.clearListeners(map, "click");
            GEvent.clearListeners(map, "singlerightclick");
            map.enableDoubleClickZoom();
        }
    }

    function mapClick(marker, point) {
        if (!marker) {
            addRoutePoint(point);
        }
    }

    function mapSingleRightClick(marker, point){
        addClosing();
    }


    function addRoutePoint(point) {
        var dist = 0;

        if (!routePoints[lineIx]) {
            routePoints[lineIx] = Array();
            routeMarkers[lineIx] = Array();
        }

        routePoints[lineIx].push(point);

        if (routePoints[lineIx].length > 1) {
            plotRoute();
            dist = routePoints[lineIx][routePoints[lineIx].length-2].distanceFrom(point) / 1609.344;
            totalDistance += dist;
            routeMarkers[lineIx][routePoints[lineIx].length-1] = new GMarker(point,{icon:greenIcon,title:totalDistance.toFixed(2)+ " mi"});

            map.addOverlay(routeMarkers[lineIx][routePoints[lineIx].length-1]);
        }
        else {
            routeMarkers[lineIx][routePoints[lineIx].length-1] = new GMarker(point,{icon:greenIcon,title:''});
            map.addOverlay(routeMarkers[lineIx][routePoints[lineIx].length-1]);
        }
    }

    function plotRoute() {
        if (routeOverlays[lineIx]) {
            map.removeOverlay(routeOverlays[lineIx]);
        }
        routeOverlays[lineIx] = new GPolyline(routePoints[lineIx],'#FF0000',2,1);
        map.addOverlay(routeOverlays[lineIx]);
    }

    function addClosing() {
        if (routePoints[lineIx].length > 1) {
            if (routeMarkers[lineIx][routePoints[lineIx].length-1]) {
                map.removeOverlay(routeMarkers[lineIx][routePoints[lineIx].length-1]);
            }
            routeMarkers[lineIx][routePoints[lineIx].length-1] = new PopupMarker(routePoints[lineIx][routePoints[lineIx].length-1], { icon:greenIcon, color : "000000", bgColor : "FFFFFF", text:totalDistance.toFixed(2)+" mi"});
            map.addOverlay(routeMarkers[lineIx][routePoints[lineIx].length-1]);
            lineIx++;
        }
        totalDistance = 0;
        isClosed = true;
    }

    function clearAll() {
        while (lineIx > 0) {
            resetRoute();
        }
        totalDistance = 0;
    }

    function resetRoute() {
        if (!routePoints[lineIx] || routePoints[lineIx].length == 0) {
            lineIx--;
        }

        routePoints[lineIx] = null;
        if (routeOverlays[lineIx]) {
            map.removeOverlay(routeOverlays[lineIx]);
        }

        for (var n = 0 ; n < routeMarkers[lineIx].length ; n++ ) {
            var marker = routeMarkers[lineIx][n];
            if (marker) {
                map.removeOverlay(marker);
            }
        }
        routeMarkers[lineIx] = null;


    }
 ****************************Ruler Code  END  ********************************/
        </script>
        <style>
            body {
              background: #000000;
            }
        </style>
    </head>
    <body onload="initialize()">
        <div id="content" style="width:100%; height:100%"></div>
    </body>
</html>