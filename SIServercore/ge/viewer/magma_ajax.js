//extracts the KML url from the network link KML sent by MAGMA
function extractLink(xmldoc){
    //debugger;
    var flyToViewArr = xmldoc.getElementsByTagName("flyToView");
    var flyToView = "false";
    if(flyToViewArr!=null && flyToViewArr.length>0){
        var flyToViewText = getNodeText(flyToViewArr[0]);
        if(flyToViewText=="1"){
            flyToView = "true";
        }
    }
    var nwLinkList = xmldoc.getElementsByTagName("NetworkLink");
    var links = [];
    if(nwLinkList && nwLinkList.length > 0) {
        for(i=0;i<nwLinkList.length;i++){
            //ignore any super network links
            if(nwLinkList[i].getElementsByTagName("NetworkLink").length>0)continue;
            linkNode = selectSingleNode(nwLinkList[i],"Link");
            link = getNodeText(selectSingleNode(linkNode,"href"));
            refreshInterval = getNodeText(selectSingleNode(linkNode,"refreshInterval"));
            viewRefreshMode = getNodeText(selectSingleNode(linkNode,"viewRefreshMode"));
            refreshMode = getNodeText(selectSingleNode(linkNode,"refreshMode"));
            viewRefreshTime = getNodeText(selectSingleNode(linkNode,"viewRefreshTime"));
            //alert(link+"&rendertype=kml"+","+refreshInterval+","+refreshMode+","+viewRefreshMode+","+flyToView+","+viewRefreshTime);
            if(link!=null)
                links.push(link+"&rendertype=kml"+","+refreshInterval+","+refreshMode+","+viewRefreshMode+","+flyToView+","+viewRefreshTime);
        }
    } else {
           var errorMessage = "Either Server is down or session is invalid. Please contact System Administrator.";
           var nwLinkControlList = xmldoc.getElementsByTagName("NetworkLinkControl");
	       if(nwLinkControlList.length > 0) {
	         var   errorMessagetmp =  getNodeText(selectSingleNode(nwLinkControlList[0],"message"));
			 if(errorMessagetmp){
			 	errorMessage ='Please contact System Administrator with this message  ['+ errorMessagetmp +']';
			 }
			 alert(errorMessage);
			return null;
	       }
	       if (parent.parent != null && parent != null)
	         {
				alert(errorMessage);
				parent.parent.window.location = '/SIServer/logout.do';
				return null;
	         }
    }
    return links;
    /*
    if(nwLinkList.length>1){
        return links;
    }else{
        return links[0];
    }
    */
}

//creates and returns placemarks
function createMarker(lat,lng,html,styleUrl) {
    var marker = null;
    if(styleUrl!=null && styleUrl!=""){
        var icon = new GIcon(baseIcon);
        icon.image = iconMap[styleUrl];
        scale = iconScaleMap[styleUrl];
        if(scale!=null){
            iconSize = icon.iconSize;
            icon.iconSize = new GSize(iconSize.width*scale,iconSize.height*scale);
        }
        marker = new google.maps.Marker(new google.maps.LatLng(lat,lng),icon);
    }else{
        marker = new google.maps.Marker(new google.maps.LatLng(lat,lng));
    }   
    google.maps.Event.addListener(marker, "click", function() {
      marker.openInfoWindowHtml(html);
    });
    return marker;
}

function init(xmldoc){
    initBaseIcon();
    initStyles(xmldoc);
}
var baseIcon = null;
function initBaseIcon(){
    if(baseIcon==null){
        baseIcon = new GIcon();
        //baseIcon.shadow = "shadow50.png";
        baseIcon.iconSize = new GSize(20, 20);
        //baseIcon.shadowSize = new GSize(37, 34);
        baseIcon.iconAnchor = new GPoint(0, 0);
        baseIcon.infoWindowAnchor = new GPoint(9, 2);
        baseIcon.infoShadowAnchor = new GPoint(18, 25);
    }
}

var colorMap = null;
var widthMap = null;
var iconMap = null;
var iconScaleMap = null;
var polyColorMap = null;
//gets the style objects and creates a map for color and width
function initStyles(xmldoc){
//  if(colorMap==null){
        stylesList = xmldoc.getElementsByTagName("Style");
        if(stylesList==null)return;
        if(colorMap==null){colorMap = new Object();}
        if(widthMap==null){widthMap = new Object();}
        if(iconMap==null){iconMap  = new Object();}
        if(iconScaleMap==null){iconScaleMap  = new Object();}
        if(polyColorMap==null){polyColorMap = new Object();}
        for(i=0;i<stylesList.length;i++){
            styleId = stylesList[i].getAttribute("id");
            if(styleId==null)return;
            var lineStyleNode = selectSingleNode(stylesList[i],"LineStyle");
            if(lineStyleNode!=null){
                var colorNode = selectSingleNode(lineStyleNode,"color");
                if(colorNode!=null){
                    color = getNodeText(colorNode);
                    colorMap[styleId]=getGEtoGMapColor(color);
                }
                var widthNode = selectSingleNode(lineStyleNode,"width");
                if(widthNode!=null){
                    width = getNodeText(widthNode);
                    widthMap[styleId] = width;
                }
            }
            var polyStyleNode = selectSingleNode(stylesList[i],"PolyStyle");
            if(polyStyleNode!=null){
                var polyColorNode = selectSingleNode(polyStyleNode,"color");
                if(polyColorNode!=null){
                    polyColor = getNodeText(polyColorNode);
                    polyColorMap[styleId]=getGEtoGMapColor(polyColor);
                    //alert(styleId+"style:"+polyColorMap[styleId]);
                }
            }       
            
            var iconStyleNode = selectSingleNode(stylesList[i],"IconStyle");
            if(iconStyleNode!=null){
                iconNode = selectSingleNode(stylesList[i],"Icon");
                if (iconNode!=null){
                    iconUrl = getNodeText(selectSingleNode(stylesList[i],"href"));
                    if(iconUrl!=null){
                        iconMap[styleId] = iconUrl;
                    }
                }
                iconScale = getNodeText(selectSingleNode(stylesList[i],"scale"));
                if(iconScale!=null){
                    iconScaleMap[styleId] = iconScale;
                }
            }
        }
//  }
}

//creates placemarks from the KML DOM object
function processPlacemarks(xmldoc,map){
    var placemarksList = xmldoc.getElementsByTagName("Placemark");
    for(i=0;i<placemarksList.length;i++){
        pDescNode = selectSingleNode(placemarksList[i],"description");
        if(pDescNode!=null){
            desc = getNodeText(pDescNode);
        }
        pPointNode = selectSingleNode(placemarksList[i],"Point");
        if(pPointNode==null) continue;
        pCoordinatesNode = selectSingleNode(pPointNode,"coordinates");
        if(pCoordinatesNode==null) continue;
        pCoordArray = getNodeText(pCoordinatesNode).split(",");
        
        var styleUrl = getNodeText(selectSingleNode(placemarksList[i],"styleUrl"));
        var iconUrl = null;
        if(styleUrl!=null){
            styleUrl = styleUrl.replace("#","");
            iconUrl = iconMap[styleUrl];
        }

        if(pCoordArray.length==3){
            pLng = pCoordArray[0];
            pLat = pCoordArray[1];
            map.addOverlay(createMarker(pLat,pLng,desc,styleUrl));
        }
    }       
}

function processLookAt(xmldoc,map){
    var lookAtList = xmldoc.getElementsByTagName("LookAt");
    for(i=0;i<lookAtList.length;i++){
        pLat = getNodeText(selectSingleNode(lookAtList[i],"latitude"));
        pLng = getNodeText(selectSingleNode(lookAtList[i],"longitude"));
        map.setCenter(new google.maps.LatLng(pLat,pLng), 13); 
    }       
}

function processPolygons(xmldoc,map){
    var placemarksList = xmldoc.getElementsByTagName("Placemark");
    for(i=0;i<placemarksList.length;i++){
        var styleUrl = getNodeText(selectSingleNode(placemarksList[i],"styleUrl"));
        if(styleUrl!=null){
            styleUrl = styleUrl.replace("#","");
            lineColor = colorMap[styleUrl];
            polyColor = polyColorMap[styleUrl];
//          alert(polyColorMap.length+":"+styleUrl+":"+polyColor);
        }else{
            lineColor = "#FFFFFF";
            polyColor = "#FFFFFF";
        }   
        polygonNode = selectSingleNode(placemarksList[i],"Polygon");
        outerBoundaryNode = selectSingleNode(polygonNode,"outerBoundaryIs");
        if(outerBoundaryNode==null)continue;
        linearRingNode = selectSingleNode(outerBoundaryNode,"LinearRing");
        if(linearRingNode==null)continue;
        pCoordinatesNode = selectSingleNode(linearRingNode,"coordinates");
        if(pCoordinatesNode==null)continue;
        var points = [];
        pCoordArray =splitCoordinates(getNodeText(pCoordinatesNode))
        for(j=0;j<pCoordArray.length;j+=3){
            pLng = pCoordArray[j];
            pLat = pCoordArray[j+1];
            points.push(new GLatLng(pLat,pLng));
        }       
        var polyg = new GPolygon(points,lineColor,4, 0.5, polyColor, 0.5, null);
        map.addOverlay(polyg);      
    }       
}

function processGroundOverlays(xmldoc,map){
    var overlayList = xmldoc.getElementsByTagName("GroundOverlay");
    for(i=0;i<overlayList.length;i++){
        iconNode = selectSingleNode(overlayList[i],"Icon");
        if(iconNode==null)continue;
        imageURL = getNodeText(selectSingleNode(iconNode,"href"));
        if(imageURL==null)continue;
        latLngBoxNode = selectSingleNode(overlayList[i],"LatLonBox");
        if(latLngBoxNode==null)continue;
        bNorth = getNodeText(selectSingleNode(latLngBoxNode,"north"));
        bSouth = getNodeText(selectSingleNode(latLngBoxNode,"south"));
        bEast = getNodeText(selectSingleNode(latLngBoxNode,"east"));
        bWest = getNodeText(selectSingleNode(latLngBoxNode,"west"));
        if(bNorth==null || bSouth==null || bEast==null || bWest==null ||
           bNorth==""   || bSouth==""   || bEast==""   || bWest=="")continue;
        bNE = new google.maps.LatLng(bNorth,bEast);
        bSW = new google.maps.LatLng(bSouth,bWest);
        bounds = new google.maps.LatLngBounds(bSW,bNE);
        imgOl = new google.maps.GroundOverlay(imageURL, bounds);
        map.addOverlay(imgOl);      
    }       
}

function processScreenOverlays(xmldoc,map){
    var overlayList = xmldoc.getElementsByTagName("ScreenOverlay");
    for(i=0;i<overlayList.length;i++){
        iconNode = selectSingleNode(overlayList[i],"Icon");
        if(iconNode==null)continue;
        imageURL = getNodeText(selectSingleNode(iconNode,"href"));
        if(imageURL==null)continue;
        screenXYNode = selectSingleNode(overlayList[i],"screenXY");
        if(screenXYNode==null)continue;
        var img = new Image();
        img.src = imageURL;
        xPoint = screenXYNode.getAttribute("x");
        yPoint = screenXYNode.getAttribute("y");
        screenPoint  = new GScreenPoint(xPoint, yPoint);
        screenPoint1  = new GScreenPoint(0, 0);
        imgOl = new google.maps.ScreenOverlay(imageURL, screenPoint,screenPoint1,new GScreenSize(img.width,img.height));
        map.addOverlay(imgOl);      
    }       
}

function processLines(xmldoc,map){
    var placemarksList = xmldoc.getElementsByTagName("Placemark");
    for(i=0;i<placemarksList.length;i++){
        var lineNode = selectSingleNode(placemarksList[i],"LineString");
        if(lineNode==null) return;
        pCoordinatesNode = selectSingleNode(lineNode,"coordinates");
        if(pCoordinatesNode==null)continue;
        var points = [];
        pCoordArray =splitCoordinates(getNodeText(pCoordinatesNode))
        for(j=0;j<pCoordArray.length;j+=3){
            pLng = pCoordArray[j];
            pLat = pCoordArray[j+1];
            points.push(new GLatLng(pLat,pLng));
        }
        var styleUrl = getNodeText(selectSingleNode(placemarksList[i],"styleUrl"));
        if(styleUrl!=null){
            styleUrl = styleUrl.replace("#","");
            color = colorMap[styleUrl];
            width = widthMap[styleUrl];
        }
        if(color==null) color = "#00ff00";
        if(width==null) width = 2
        var lines = new GPolyline(points,color,width, 1, null);
        map.addOverlay(lines);      
    }       
}

//circumventing GE bug of having colors as RBG instead of RGB
function getGEtoGMapColor(color){
    colorRed = color.substring(0,2);
    colorBlue = color.substring(2,4);
    colorGreen = color.substring(4,6);
    return "#"+colorRed+colorGreen+colorBlue;
}

// returns an array of coordinates lng, lat, alt 
function splitCoordinates(coordinates){
    tmpString = "";
    singleChar = "";
    points = [];
    var pattern = new RegExp(/[0-9\-\.]/);
    for(chrIdx=0;chrIdx<coordinates.length;chrIdx++){
        singleChar = coordinates.charAt(chrIdx);    
        if(pattern.test(singleChar)){
            tmpString = tmpString + singleChar;
        }else if(tmpString!=""){
            points.push(tmpString);
            tmpString="";
        }
    }
    if(tmpString!="") points.push(tmpString);
    return points;
}

//selects the first node that matches the tag and returns it
function selectSingleNode(nodeObj,tagName){
    if(nodeObj==null)return null;
    var nodeList = nodeObj.getElementsByTagName(tagName);
    if(nodeList!=null && nodeList.length>0){
        return nodeList[0];
    }else{
        return null;
    }
}

// returns the text of a node in a browser independent way
function getNodeText(nodeObj){
    if(nodeObj==null)return null;
    if(nodeObj.text==null){
        return nodeObj.textContent;
    }else{
        return nodeObj.text;
    }
}