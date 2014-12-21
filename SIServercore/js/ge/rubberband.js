/* ++++++++++++++++++++++++++++++++++++++++++++++
* Rubberbanding Code -- Space-Time Insight
*
* Created On : 24th May 2011
*++++++++++++++++++++++++++++++++++++++++++++++++
/*
Code for Draw Mode
*/
/* Rubberbanding draw code - start */
var currentRBPolyPlacemark;
var initCircleCreation = false;
var radiusValuePlacemark = null;
var rbFeaturesArray = new Array();
var lastRBRegionDrawn = null;
var screenOverlay = null;
var unit = null;
var measurement = null;
var measurentSys = null;
var isImperial = false;
var lineThickness = parent.baseLineThickness;
var fillColor = "0000ff";

function drawRBFeature(type) {
    resetRBFeatures();
    if (type[0] == 'rbpolygon') {
        drawRBPolygon();
    } else if (type[0] == 'rbcircle') {
	    var params = new Array()
		params[0] = type[2];
		params[1] = type[3];
	    // calling this method to calculate the units(miles,feet or KM , Meters) based measurement system 
        calculateMeasurementUnitForRBCircle(type[1],params);
        initCircleCreation = true;
        drawRBCircle();
    }
}

//This function applies Algo Status on GE View
function showSelectedAlgoStatus(url, algoApplied,languageCd) {
    var imageDirPath = 'images/algos/';
    var imageExt = '.png';
    if (screenOverlay != null) {
        ge.getFeatures().removeChild(screenOverlay);
        screenOverlay = null;
    }
    // Create the ScreenOverlay.
    screenOverlay = ge.createScreenOverlay('');

    // Specify a path to the image and set as the icon.
    var icon = ge.createIcon('');
	if(languageCd!=null && languageCd!=''){
			icon.setHref(url + imageDirPath + algoApplied +"_"+languageCd+ imageExt);  // appending languageCd based locale except english 
		}else{
			icon.setHref(url + imageDirPath + algoApplied + imageExt);  
		}
	
	screenOverlay.setIcon(icon);
 
	/*
	* Setting the overlayXY and the screenXY of the ScreenOverlay to avoid the distortion of the feature while changing the layout
	*/
    screenOverlay.getOverlayXY().setXUnits(ge.UNITS_FRACTION);
    screenOverlay.getOverlayXY().setYUnits(ge.UNITS_FRACTION);
    screenOverlay.getOverlayXY().setX(0);
    screenOverlay.getOverlayXY().setY(1);
    screenOverlay.getScreenXY().setXUnits(ge.UNITS_FRACTION);
    screenOverlay.getScreenXY().setYUnits(ge.UNITS_FRACTION);
    screenOverlay.getScreenXY().setX(0);
    screenOverlay.getScreenXY().setY(1);
    screenOverlay.getSize().setXUnits(ge.UNITS_FRACTION);
    screenOverlay.getSize().setYUnits(ge.UNITS_FRACTION);
    screenOverlay.getSize().setX(0);
    screenOverlay.getSize().setY(0);
 
    if (algoApplied != 'None') {
        // Add the ScreenOverlay to Earth.
        ge.getFeatures().appendChild(screenOverlay);
    } else if (screenOverlay != null) {
        screenOverlay = null;
    }
}

// This function removes Algo Status on GE View
function hideSelectedAlgoStatus() {

    if (screenOverlay != null) {
        ge.getFeatures().removeChild(screenOverlay);
        screenOverlay = null;
    }
}

function removeRBFeature(id) {
    currentRBPolyPlacemark = rbFeaturesArray[id];
    if (centerPm) {
        ge.getFeatures().removeChild(centerPm);
    }
    if (circumPm) {
        ge.getFeatures().removeChild(circumPm);
    }
    resetRBFeatures();
    if (rbFeaturesArray[id]) {
        ge.getFeatures().removeChild(rbFeaturesArray[id]);
        rbFeaturesArray.remove(id);
    }
}

function showRBFeature(id, viewportStr, flag, measurementSystem,params) {
    if (rbFeaturesArray[id]) {
        rbFeaturesArray[id].setVisibility(flag);
        // calling this method to calculate the units(miles,feet or KM , Meters) based measurement system 
        calculateMeasurementUnitForRBCircle(measurementSystem,params);
        if (radiusValuePlacemark) {
            ge.getFeatures().removeChild(radiusValuePlacemark);
        }
    }
    if (flag) {
        setSerializedViewPort(viewportStr);
    }
}

function resetRBFeatures() {
    if (currentRBPolyPlacemark) {
        gex.edit.endEditLineString(currentRBPolyPlacemark.getGeometry().getOuterBoundary());
        currentRBPolyPlacemark = null;
        lastSelectedRegion = null;
    }
}

function createRBPolygon(id, coordStr, flag, viewPort, regionColor) {
    var validRegioncolor = validateRGBColor(regionColor);
    var opacityColorCode = swapColors(validRegioncolor);
    idCount++;
    var rbPlacemark = gex.dom.addPolygonPlacemark([], {
        id: 'rb_' + id,
        style: {
            poly: '80' + opacityColorCode,
            line: {
                width: lineThickness,
                color: validRegioncolor
            }
        }
    });
    viewPortArray[rbPlacemark.getId()] = viewPort;
    setPolygonCoordinates(rbPlacemark, coordStr);
    rbPlacemark.setVisibility(flag);
    rbFeaturesArray[rbPlacemark.getId()] = rbPlacemark;
}

function updateRBPolygon(id, coordStr, flag, viewPort) {
    var polygonId = 'rb_' + id;
    rbPlacemark = rbFeaturesArray[polygonId]
    viewPortArray[rbPlacemark.getId()] = viewPort;
    lastSelectedRegion = rbFeaturesArray[rbPlacemark.getId()];
    
	var geometry = rbPlacemark.getGeometry();
    lastSelectedRegion.setGeometry(geometry);

    var rubberBand = new RubberBand(rbPlacemark.getId(), getPolygonCoordinates(lastSelectedRegion), viewPortArray[rbPlacemark.getId()]);
    afterEditRubberbandRegionsArray[rbPlacemark.getId()] = rubberBand;
}

function drawRBPolygon() {
    try {
    var opacityColorCode = swapColors(fillColor);
        idCount++;
        currentRBPolyPlacemark = gex.dom.addPolygonPlacemark([], {
            id: 'rbpolygon_' + idCount,
            style: {
                poly: '80' + opacityColorCode,
                line: {
                    width: lineThickness,
                    color: fillColor
                }
            }
        });
        lastRBRegionDrawn = "rbpolygon_" + idCount;
        var optionsObj = new Object();
        gex.edit.drawLineString(currentRBPolyPlacemark.getGeometry().getOuterBoundary(), optionsObj);

    } catch (e) {
        alert('drawRBPolygon' + e.message);
    }
}
var highlightRBId = 0;
var lastHighlightRBId = null;

function removeHighlightRBFeature() {
    try {
        if (lastHighlightRBId != null) {
            ge.getFeatures().removeChild(lastHighlightRBId);
        }
    } catch (e) {
        alert("Error occured while removing the highlight of RB region: " + e.message);
    }
}

function checkForValidColor(color) {
    var reg = /^#[0-9a-fA-F]{3,6}$/i;
    if (reg.test(color) == true && (color.length == 4 || color.length == 7)) {
        return color;
    } else {
        return "#00FF00"; // setting default to Green,if color is not valid
    }
}

function highlightRBFeature(regionCord, color, typeId) {
    try {
        removeHighlightRBFeature();
        color = checkForValidColor(color);
        var rbPolyPlacemark = gex.dom.addPolygonPlacemark([], {
            id: 'high_' + highlightRBId,
            style: {
                poly: '0000ff00',
                line: {
                    width: lineThickness,
                    color: color
                }
            }
        });

        lastHighlightRBId = rbPolyPlacemark;
        setPolygonCoordinates(rbPolyPlacemark, regionCord);
        rbPolyPlacemark.setVisibility(true);
        highlightRBId++;
        if (typeId == 1) {
            google.earth.addEventListener(rbPolyPlacemark, 'mouseover', circleRegionMouseOverHandler);
            google.earth.addEventListener(rbPolyPlacemark, 'mouseout', circleRegionMouseOutHandler);
        }
    } catch (e) {
        alert("Error occured while highlighting of RB region: " + e.message);
    }
}

function drawRBPolygonFinished() {
    try {
        if (currentRBPolyPlacemark) {
            var count = currentRBPolyPlacemark.getGeometry().getOuterBoundary().getCoordinates().getLength();
            if (count <= 2) {
                gex.edit.endEditLineString(currentRBPolyPlacemark.getGeometry().getOuterBoundary());
                ge.getFeatures().removeChild(currentRBPolyPlacemark);
                currentRBPolyPlacemark = null;
                parent.addFeature("", "", "", count + "");
                return;
            }
            if (count == 3) {
                var coordString = getPolygonCoordinates(currentRBPolyPlacemark);
                var arr = coordString.split(" ");
                if (arr != null) {
                    if (arr[0] == arr[2]) {
                        gex.edit.endEditLineString(currentRBPolyPlacemark.getGeometry().getOuterBoundary());
                        ge.getFeatures().removeChild(currentRBPolyPlacemark);
                        currentRBPolyPlacemark = null;
                        parent.addFeature("", coordString, "rbpolygon", count + "");
                        return;
                    }
                }
            }
            //add the placemark to the array
            rbFeaturesArray[currentRBPolyPlacemark.getId()] = currentRBPolyPlacemark;
            viewPortArray[currentRBPolyPlacemark.getId()] = getSerializedViewPort();
            gex.edit.endEditLineString(currentRBPolyPlacemark.getGeometry().getOuterBoundary());

            if (currentRBPolyPlacemark != null) {
                parent.addFeature(currentRBPolyPlacemark.getId(), getPolygonCoordinates(currentRBPolyPlacemark), "rbpolygon", count + "");
            }
            parent.fireGEEvent('RB_POLYGON', 'click', 'deactivate');
        }
    } catch (e) {
        alert('Error in drawing the polygon ' + e.message);
    }
    currentRBPolyPlacemark = null;
    lastSelectedRegion = null;
}

function getSerializedViewPort() {
    return gex.util.serializeView();
}

function setSerializedViewPort(viewPortStr) {
    if (viewPortStr && viewPortStr != '' && viewPortStr != 'undefined') {
        gex.util.deserializeView(viewPortStr);
    }
}

/* Rubberbanding Circle code - start */

// This function is called to load already existing circles into the list, this function executes when initializing RB regions.
function createRBCircle(id, coordStr, flag, viewPort, pCcenterCoordinates, pCircumCoordinates, radius, operation, regionColor) {

    var centerCoordinates = pCcenterCoordinates.split(",");
    var circumCoordinates = pCircumCoordinates.split(",");

    var x1 = parseFloat(centerCoordinates[0]);
    var y1 = parseFloat(centerCoordinates[1]);
    var x2 = parseFloat(circumCoordinates[0]);
    var y2 = parseFloat(circumCoordinates[1]);

    if (operation != null && operation == "RADIUS_CHANGED") {
        // if user has changed the radius through the text input
        lastSelectedRegion = rbFeaturesArray[id];
        if (coordStr == null) {
            createNewCircle(radius, x1, y1, '', regionColor);
        } else {
            createNewCircleWithCoords(coordStr, x1, y1, id, regionColor);
        }

        var geometry = currentRBPolyPlacemark.getGeometry();

        if (rbFeaturesArray[id]) {
            rbFeaturesArray[id].setGeometry(currentRBPolyPlacemark.getGeometry());
            rbFeaturesArray[id].setVisibility(true);
            google.earth.addEventListener(rbFeaturesArray[id], 'mouseover', circleRegionMouseOverHandler);
            google.earth.addEventListener(rbFeaturesArray[id], 'mouseout', circleRegionMouseOutHandler);
        }

        lastSelectedRegion.setGeometry(geometry);
        var rubberBand = new RubberBand(id, getPolygonCoordinates(lastSelectedRegion), viewPortArray[id]);
        afterEditRubberbandRegionsArray[id] = rubberBand;

        ge.getFeatures().removeChild(currentRBPolyPlacemark);

    } else {
        radius = haversineDistance(x1, x2, y1, y2);
        //If coord str is null, creates new circle
        if (coordStr == null) {
            createNewCircle(radius, x1, y1, '', regionColor);
        } else {
            createNewCircleWithCoords(coordStr, x1, y1, id, regionColor);
        }
        // loac the circle RB to the list
        viewPortArray[currentRBPolyPlacemark.getId()] = viewPort;
        currentRBPolyPlacemark.setVisibility(flag);
        rbFeaturesArray[currentRBPolyPlacemark.getId()] = currentRBPolyPlacemark;
        google.earth.addEventListener(rbFeaturesArray[currentRBPolyPlacemark.getId()], 'mouseover', circleRegionMouseOverHandler);
        google.earth.addEventListener(rbFeaturesArray[currentRBPolyPlacemark.getId()], 'mouseout', circleRegionMouseOutHandler);
    }
    currentRBPolyPlacemark = null;
}

//loads circle if the coords are already present.
function createNewCircleWithCoords(coords, latitude, longitude, predefinedId, regionColor) {
    var validRegioncolor = validateRGBColor(regionColor);
    var opacityColorCode = swapColors(validRegioncolor);
    var targetId = '';
    idCount++;
    if (predefinedId == '') {
        targetId = 'rbcircle_' + idCount;
    } else {
        targetId = 'rbcircle_' + predefinedId;
    }
    lastRBRegionDrawn = "rbcircle_" + idCount;
    currentRBPolyPlacemark = gex.dom.addPolygonPlacemark([], {
        id: targetId,
        style: {
            poly: '80' + opacityColorCode,
            line: {
                width: lineThickness,
                color: validRegioncolor
            }
        }
    });

    setPolygonCoordinates(currentRBPolyPlacemark, coords);
    ge.getFeatures().appendChild(currentRBPolyPlacemark);

    //registers the Listener for Circle placemark
    registerPMListener();
}


/*
        Creation of circle   
        Registers the Click event Listener on Google window
*/

function drawRBCircle() {
    createNewCircleFlag = true;
    radius = radiusConst;
    google.earth.addEventListener(ge.getGlobe(), 'click', geMouseClickHandler);
}

/*      
        It creates a circle with 32 coordinates having defined radius & center
*/
var EARTH_RADIUS = 6371; //KM

function makeCircle(radius, centerLat, centerLng) {
    var ring = ge.createLinearRing('');
    var steps = 32;
    var pi2 = Math.PI * 2;
    var arr = new Array();
    for (var i = 0; i < steps; i++) {
        var brng = i * 360 / steps;
        var coordStr = calculateCoord(centerLat, centerLng, brng, radius);
        arr = coordStr.split(",");
        var newlat = arr[0];
        var newlng = arr[1];
        ring.getCoordinates().pushLatLngAlt(parseFloat(newlat),parseFloat(newlng), parseFloat(0));
        if (i == steps / 4) {
            circumLatitude = parseFloat(newlat);
            circumLongitude = parseFloat(newlng);
        }
    }
    return ring;
}

//Radius calculation method based on center and circum latitude and longitude values
function haversineDistance(lat1, lat2, lng1, lng2) {
    var radlat1 = degToRad(lat1);
    var radlat2 = degToRad(lat2);
    var radlng1 = degToRad(lng1);
    var radlng2 = degToRad(lng2);
    var dLat = radlat2 - radlat1;
    var dLon = radlng2 - radlng1;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radlat1) * Math.cos(radlat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c;
}
//calculation for the second set of coordinates along the circle based on center latitude and longitude
function calculateCoord(lat, lng, brng, arcLength) {
    var lat1 = degToRad(lat);
    var lon1 = degToRad(lng);
    var centralAngle = arcLength / EARTH_RADIUS;
    var lat2 = Math.asin(Math.sin(lat1) * Math.cos(centralAngle) + Math.cos(lat1) * Math.sin(centralAngle) * Math.cos(degToRad(brng)));
    var lon2 = lon1 + Math.atan2(Math.sin(degToRad(brng)) * Math.sin(centralAngle) * Math.cos(lat1), Math.cos(centralAngle) - Math.sin(lat1) * Math.sin(lat2));
    return radToDeg(lat2) + ',' + radToDeg(lon2);
}

//Conversion method from degrees to Radians
function degToRad(x) {
    return x * Math.PI / 180;
}

//Conversion method from radians to degrees
function radToDeg(x) {
    return x * 180 / Math.PI;
}

//method to convert to smaller units for miles and KM based on measurement system selected
function imperialOrMetricSmallUnit(radiusParam) {
    if (isImperial) return Math.round(radiusParam * kmToMilesFactor * milesToFeetFactor * Math.pow(10, 2)) / Math.pow(10, 2);
    else return Math.round(radiusParam * smallUnitConversion * Math.pow(10, 2)) / Math.pow(10, 2);
}

//method to convert to miles or KM based on measurement system selected
function imperialOrMetric(radiusParam) {
    if (isImperial) return Math.round(radiusParam * kmToMilesFactor * Math.pow(10, 2)) / Math.pow(10, 2);
    else return Math.round(radiusParam * Math.pow(10, 2)) / Math.pow(10, 2);

}

/*
        Mouse event Handler on GE Window, 
        @param: kmlEvent 
 */
function geMouseClickHandler(kmlEvent) {
    //loading the circle
    loadCircle(radius, kmlEvent.getLatitude(), kmlEvent.getLongitude());
    //remove the listener after creating circle - success
    google.earth.removeEventListener(ge.getGlobe(), 'click', geMouseClickHandler);
}

/*
        -Creates the circle with the defined radius
        after removing the circle existing
        - creates the center 
        - creates the circumference
 */

function loadCircle(radius, latitude, longitude) {
    removeCircleChildren();
    createNewCircle(radius, latitude, longitude, '', fillColor);
    drawPoint(center, latitude, longitude, '');
    if (radius < 0.10) {
        roundedRadiusSmallUnit = imperialOrMetricSmallUnit(radius);
        drawPoint(circumference, circumLatitude, circumLongitude, roundedRadiusSmallUnit + " " + measurement);
    } else {
        roundedRadius = imperialOrMetric(radius);
		parent.updateRadius(roundedRadius);
        drawPoint(circumference, circumLatitude, circumLongitude, roundedRadius + " " + unit);
    }
}

/*
        removes the circle & its children
*/
function removeCircleChildren() {
    if (currentRBPolyPlacemark) ge.getFeatures().removeChild(currentRBPolyPlacemark);
    if (center) ge.getFeatures().removeChild(center);
    if (circumference) ge.getFeatures().removeChild(circumference);
    if (initCircleCreation) {
        initCircleCreation = false;
        radius = radiusConst;
    }
}


/*
        -creates the circle  with the defined radius 
*/
function createNewCircle(radius, latitude, longitude, predefinedId, regionColor) {
    var validRegioncolor = validateRGBColor(regionColor);
    var opacityColorCode = swapColors(validRegioncolor);

    var targetId = '';
    idCount++;
    if (predefinedId == '') {
        targetId = 'rbcircle_' + idCount;
    } else {
        targetId = 'rbcircle_' + predefinedId;
    }
    lastRBRegionDrawn = "rbcircle_" + idCount;
    currentRBPolyPlacemark = gex.dom.addPolygonPlacemark([], {
        id: targetId,
        style: {
            poly: '80' + opacityColorCode,
            line: {
                width: lineThickness,
                color: validRegioncolor
            }
        }
    });

    currentRBPolyPlacemark.getGeometry().setOuterBoundary(makeCircle(radius, latitude, longitude));
    ge.getFeatures().appendChild(currentRBPolyPlacemark);

    //registers the Listener for Circle placemark
    registerPMListener();
}

/*
        Add the listeners
        1) mousedown - adds the click listener on the google earth (target object - circle )
        2) mousedown - adds the click listener on the google earth (target object - google window )
*/
function registerPMListener() {
    google.earth.addEventListener(currentRBPolyPlacemark, 'mousedown', circleClickHandler);
    google.earth.addEventListener(ge.getWindow(), 'mousedown', circleClickHandler);
}

/*
        removes the click listener on google window
        
*/
function circleClickHandler(kmlEvent) {
    google.earth.removeEventListener(ge.getWindow(), 'click', geMouseClickHandler);
}

function circumferenceMoveHandler(kmlEvent) {
    var radiusCircum = getRadiusParameterised(center.getGeometry().getLatitude(), kmlEvent.getLatitude(), center.getGeometry().getLongitude(), kmlEvent.getLongitude());
    var roundedRadius = imperialOrMetric(radiusCircum);
    parent.updateRadius(roundedRadius);
    if (radiusCircum < 0.10) {
        roundedRadiusSmallUnit = imperialOrMetricSmallUnit(radiusCircum); 
        kmlEvent.getTarget().setName(roundedRadiusSmallUnit + " " + measurement);
    } else {
        kmlEvent.getTarget().setName(roundedRadius + " " + unit); //unit
    }
}

/*
        registers some call back methods
        1) circlePointDropCallBackEvent - event handler - when drop the object
        2) dragCall BackEvent - event handler - when dragging the object
 */
function registerDraggableObject(targetObj) {
    gex.edit.makeDraggable(targetObj, {
        dropCallback: function () {
            circlePointDropCallBackEvent(targetObj);
        },
        dragCallback: function () {
            circlePointDragCallBackEvent(targetObj);
        }
    });
}

/*
        Drag Handler.
        1) adds the google window - click listener - if its an center change event
        2) adds the radius changes handler - if its an circumference change event
 */
function circlePointDragCallBackEvent(pointPlacemark) {
    if (createNewCircleFlag) {
        lastSelectedRegion = null;
        var pointName = pointPlacemark.getName();

        if (pointName == '') {
            google.earth.addEventListener(ge.getWindow(), 'click', geMouseClickHandler);
        } else {
            radius = getRadius();
            google.earth.addEventListener(ge.getWindow(), 'click', radiusChangeHandler);
        }
    }
}

/*
        Radius changes , calculates the updated radius & pass the same to laodcircle method
        - remove the click listener on the radius change 
*/
function radiusChangeHandler(kmlEvent) {
    loadCircle(radius, center.getGeometry().getLatitude(), center.getGeometry().getLongitude());
    google.earth.removeEventListener(ge.getWindow(), 'click', radiusChangeHandler);
}

/*
        Circumference point changes- so  calculate the updated 
        radius
*/
function circlePointDropCallBackEvent(pointPlacemark) {
    var pointName = pointPlacemark.getName();

    if (pointName != '') {
        radius = getRadius();
    }
}

/*
        Creates the point on the google window
*/
function drawPoint(pointPlacemark, latitude, longitude, pointName) {
    var pm = null;
    try {
        pm = gex.dom.addPointPlacemark([latitude, longitude], {
            id: 'RB_' + Math.random(),
            name: pointName,
            icon: circleCenterDragPlacemarkUrl
        });
    } catch (e) {
        alert(e.message);
    }
    if (pointName == '') {
        center = pm;
        google.earth.addEventListener(pm, 'mouseup', geMouseClickHandler);
        google.earth.addEventListener(pm, 'mouseup', circleClickHandler);
    } else {
        circumference = pm;
        google.earth.addEventListener(circumference, 'mouseup', circumferenceMouseUpHandler);
        google.earth.addEventListener(circumference, 'mousedown', circumferenceMouseDownHandler);
    }
    registerDraggableObject(pm);
}

function circumferenceMouseDownHandler(kmlEvent) {
    google.earth.addEventListener(circumference, 'mousemove', circumferenceMoveHandler);
}

function circumferenceMouseUpHandler(kmlEvent) {
    google.earth.removeEventListener(circumference, 'mousemove', circumferenceMoveHandler);
}

/*
        calculates the radius
*/
function getRadius() {
    return getRadiusParameterised(center.getGeometry().getLatitude(), circumference.getGeometry().getLatitude(), center.getGeometry().getLongitude(), circumference.getGeometry().getLongitude());
}

/*
        This function is used to show the mouseover radius icon on RBCircle
*/
function circleRegionMouseOverHandler(kmlEvent) {
    if (!createNewCircleFlag && radiusValuePlacemark == null) {
        var pCircleCoordinates = getPolygonCoordinates(kmlEvent.getTarget());
        var coordinateCircle = pCircleCoordinates.split(" ");
        var count = coordinateCircle.length;
        var pCenterCoordinates = getCircleCenterCoordinates(coordinateCircle[0], coordinateCircle[(count / 2)]);
        var pCircumCoordinates = getCircleCircumCoordinates(coordinateCircle[count / 4]);

        var centerCoordinates = pCenterCoordinates.split(",");
        var circumCoordinates = pCircumCoordinates.split(",");
        var radius = getRadiusParameterised(parseFloat(centerCoordinates[0]), parseFloat(circumCoordinates[0]), parseFloat(centerCoordinates[1]), parseFloat(circumCoordinates[1]));

        var roundedRadius = null;
        roundedRadius = imperialOrMetric(radius);

        if (radius < 0.10) {
            roundedRadiusSmallUnit = imperialOrMetricSmallUnit(radius);
            radiusValuePlacemark = gex.dom.addPointPlacemark([parseFloat(circumCoordinates[0]), parseFloat(circumCoordinates[1])], {
                icon: circleCircumDragPlacemarkUrl,
                name: (roundedRadiusSmallUnit + " " + measurement)
            });
        } else {
            radiusValuePlacemark = gex.dom.addPointPlacemark([parseFloat(circumCoordinates[0]), parseFloat(circumCoordinates[1])], {
                icon: circleCircumDragPlacemarkUrl,
                name: (roundedRadius + " " + unit)
            });
        }
    }
}

/*
        This function is called when the user mouseout the RBCircle Region, it will make the radius palcemark as null
    */
function circleRegionMouseOutHandler(kmlEvent) {
    ge.getFeatures().removeChild(radiusValuePlacemark);
    radiusValuePlacemark = null;
}

function drawRBCircleFinished() {
    google.earth.removeEventListener(ge.getGlobe(), 'click', geMouseClickHandler);
    google.earth.removeEventListener(ge.getWindow(), 'click', radiusChangeHandler);
    radius = radiusConst;
    try {
        if (currentRBPolyPlacemark) {
            var count = currentRBPolyPlacemark.getGeometry().getOuterBoundary().getCoordinates().getLength();
            if (currentRBPolyPlacemark != null) {
                if (center) {
                    ge.getFeatures().removeChild(center);
                }
                if (circumference) {
                    ge.getFeatures().removeChild(circumference);
                }
                //add the placemark to the array
                rbFeaturesArray[currentRBPolyPlacemark.getId()] = currentRBPolyPlacemark;
                viewPortArray[currentRBPolyPlacemark.getId()] = getSerializedViewPort();

                createNewCircleFlag = false;
                google.earth.addEventListener(rbFeaturesArray[currentRBPolyPlacemark.getId()], 'mouseover', circleRegionMouseOverHandler);
                google.earth.addEventListener(rbFeaturesArray[currentRBPolyPlacemark.getId()], 'mouseout', circleRegionMouseOutHandler);
                parent.addFeature(currentRBPolyPlacemark.getId(), getPolygonCoordinates(currentRBPolyPlacemark), "rbcircle", count + "");
            }
            parent.fireGEEvent('RB_CIRCLE', 'click', 'deactivate');

        } else {
            currentRBPolyPlacemark = null;
            parent.addFeature("", "", "", count + "");
            return;
        }
    } catch (e) {
        alert('Error in drawing the polygon ' + e.message);
    }
    currentRBPolyPlacemark = null;
    lastSelectedRegion = null;
}

/* Rubberbanding Circle code - end */

/* Rubberbanding draw code - end */

/* Rubberbanding edit code - start */

var RUBBERBAND_MODE_EDIT = 'edit'
var RUBBERBAND_MODE_READONLY = 'readonly';
var rubberbandMode = RUBBERBAND_MODE_EDIT;
var selectedRubberBandPlacemark;
var currentRubberBandPolyPlacemark;
var isCompletedListener = false;
var beforeEditRubberbandRegionsArray = new Array();
var afterEditRubberbandRegionsArray = new Array();
var viewPortArray = new Array();
var centreDraggedFlag = false;
var circumferenceDraggedFlag = false;
var radius = 8.05;
var radiusConst = 5; //5 KM
var globalTargetID = '1';
var smallUnitConversion = 1000; //for KM to Meter
var kmToMilesFactor = 0.621371192; //multiply KM by kmToMilesFactor to get distance in miles
var milesToFeetFactor = 5280; //multiply miles by milesToFeetFactor to get distance in feet

function RubberBand(featureId, coordinates, viewport) {
    this.tagName = "rubberbandregion"
    this.coordinates = coordinates;
    this.featureId = featureId;
    this.viewPort = viewport;
    this.newId = -1;
    this.ecoexpmlIds = "";
    this.refreshInterval = "";
    this.print = function () {
        return "<" + this.tagName + " ecoexpmlIds='" + this.ecoexpmlIds + "' refreshInterval='" + this.refreshInterval + "' featureId='" + this.featureId + "' coordinates='" + this.coordinates + "' viewPort='" + this.viewPort + "' newId='" + this.newId + "'/>";
    }
}

/*
		Call this method to enable the Rubberbanding EDIT Mode
    */
function setRBRegionsEditMode(editModeFlag) {

    if (editModeFlag) {
        setRubberbandEditMode(RUBBERBAND_MODE_EDIT);
    } else {
        setRubberbandEditMode(RUBBERBAND_MODE_READONLY);
    }
}

function setRubberbandEditMode(mode) {
    this.rubberbandMode = mode;
    if (isRubberBandReadOnlyMode()) {
        activateListener(LISTENER_TYPE_DEFAULT_CLICK, 'mouseup');
    } else {
        hideBalloon(null);
        deActivateListener(LISTENER_TYPE_DEFAULT_CLICK, 'mouseup');
    }
    initializeRubberBandMouseListeners(isRubberBandEditMode());
}

function saveRBRegionsEditMode() {
    var xmlData = "<?xml version='1.0' encoding='UTF-8'?><rubberbandregions>";
    var closeRubberbands = "</rubberbandregions>";
    var rubberBand;

    var count = lastSelectedRegion.getGeometry().getOuterBoundary().getCoordinates().getLength();

    if (count <= 3) {
        cancelSaveRubberbanding("");
        parent.updateFeatureAll("");
        return;
    }

    rubberBand = afterEditRubberbandRegionsArray[lastSelectedRegion.getId()];

    rubberBand.viewPort = getSerializedViewPort();

    if (lastSelectedRegion.getId().search("rbcircle_") != -1) {
        // If the selected region is circle, then show the mouse over Icon after saving.
        google.earth.addEventListener(lastSelectedRegion, 'mouseover', circleRegionMouseOverHandler);
        google.earth.addEventListener(lastSelectedRegion, 'mouseout', circleRegionMouseOutHandler);
    }

    if (rubberBand != null && rubberBand != 'undefined') {
        xmlData = xmlData + rubberBand.print();
    }
    xmlData = xmlData + closeRubberbands;

    changeRubberBandModeEditMode(false);
    parent.updateFeatureAll(xmlData);
    lastSelectedRegion = null;
}

function getCurrentRubberBandEditingDetails() {
    changeRubberBandModeEditMode(false);
    if (centerPm) {
        ge.getFeatures().removeChild(centerPm);
    }
    if (circumPm) {
        ge.getFeatures().removeChild(circumPm);
    }
    if (lastSelectedRegion != null) {
        var rubberBand = afterEditRubberbandRegionsArray[lastSelectedRegion.getId()];
        parent.showEditConfirmation(rubberBand.print());
    } else {
        parent.showEditConfirmation("");
    }
}

function resetContentEditing() {
    lastSelectedRegion = null;
}

function cancelSaveRubberbanding(regionColor) {
    var xmlData = "<?xml version='1.0' encoding='UTF-8'?><rubberbandregions>";
    var closeRubberbands = "</rubberbandregions>";
    var rubberBand = beforeEditRubberbandRegionsArray[lastSelectedRegion.getId()];

    if (rubberBand != null && rubberBand != 'undefined') {
        var featureId = rubberBand.featureId;
        var newId = -1;
        var tempId = lastSelectedRegion.getId();
        if (rbFeaturesArray[featureId]) {
            newId = resetDeselectedRubberBandFeatures(featureId, getRegionTypeId(tempId), regionColor);
        }
        if (tempId.search("rbcircle_") != -1) {
            rubberBand.newId = "rbcircle_" + newId;
        } else {
            rubberBand.newId = "rb_" + newId;
        }
        xmlData = xmlData + rubberBand.print();

    }
    xmlData = xmlData + closeRubberbands;
    resetContentEditing();
    parent.renamePolygonId(xmlData);
}

var regionTypeId;

function getRegionTypeId(regionId) {
    regionTypeId = 1 //POLYGON
    if (regionId.search("circle") > -1) {
        regionTypeId = 2; // CIRCLE					
    }

    return regionTypeId;
}

function isRubberBandEditMode() {
    return rubberbandMode == RUBBERBAND_MODE_EDIT;
}

function isRubberBandReadOnlyMode() {
    return rubberbandMode == RUBBERBAND_MODE_READONLY;
}


function initializeRubberBandMouseListeners(flag) {
    if (flag) {
        google.earth.addEventListener(ge.getWindow(), 'mouseup', rubberbandMouseUpListener);
    } else {
        google.earth.removeEventListener(ge.getWindow(), 'mouseup', rubberbandMouseUpListener);
    }
}


/*  @Method Triggered upon choosing the Placemark.
        Identify the target as KmlPolygon, place the kmlPolygon in @paramArray: editRubberbandRegionsArray[].
        Role of @paramArray: editRubberbandRegionsArray[]
               - It binds the coordinates of the original region, so that when the user deselects the region, it gets the original
               coordinates from the array & create the regions once again after removed / released from the google earth.
*/

var lastSelectedRegion = null;
//for circle coords
var centerPm = null;
var circumPm = null;

function rubberbandMouseUpListener(kmlEvent) {
    if (!isRubberBandEditMode()) { 
        return;
    }
    removeHighlightRBFeature();
    var target = kmlEvent.getTarget();
    if (rbFeaturesArray[target.getId()] == null) {
        kmlEvent.preventDefault();
        return;
    }

    // If The circle is getting dragged in edit mode and yet nt saved or cancelled then do nothing and return back
    if (centreDraggedFlag || circumferenceDraggedFlag) {
        return;
    }

    var targetType = kmlEvent.getTarget().getGeometry().getType();
    if (targetType == 'KmlPolygon') {

        selectedRubberBandPlacemark = kmlEvent.getTarget();
        if (lastSelectedRegion != null) {
            if (lastSelectedRegion.getId() != selectedRubberBandPlacemark.getId()) {           
                alert("Please update/cancel the current region editing");
                return;
            }
        }
    }
    if (lastSelectedRegion == null) {

        lastSelectedRegion = selectedRubberBandPlacemark;

        var selectedId = selectedRubberBandPlacemark.getId();
        var backuprubberBand = new RubberBand(selectedId, getPolygonCoordinates(selectedRubberBandPlacemark), viewPortArray[selectedId]);
        var rubberBand = new RubberBand(selectedId, getPolygonCoordinates(selectedRubberBandPlacemark), viewPortArray[selectedId]);

        beforeEditRubberbandRegionsArray[selectedId] = backuprubberBand;
        afterEditRubberbandRegionsArray[selectedId] = rubberBand;
        currentRubberBandPolyPlacemark = selectedRubberBandPlacemark;

        resetRubberBandFeatures();

        currentRubberBandPolyPlacemark = kmlEvent.getTarget();
        var id = currentRubberBandPolyPlacemark.getId();

        var optionsObj = new Object();
        optionsObj.editCallback = rubberbandPolygonUpdated;

        if (selectedRubberBandPlacemark.getId().search("rbcircle_") == -1) {
            gex.edit.editLineString(currentRubberBandPolyPlacemark.getGeometry().getOuterBoundary(), optionsObj);
        } else { 
			// This else block will execute if the selected region is circle.
            // hide the mouseover Icon in edit mode
            if (radiusValuePlacemark) {
                radiusValuePlacemark.setVisibility(false);
                google.earth.removeEventListener(kmlEvent.getTarget(), 'mouseover', circleRegionMouseOverHandler);
                google.earth.removeEventListener(kmlEvent.getTarget(), 'mouseout', circleRegionMouseOutHandler);
                radiusValuePlacemark = null;
            }
            var pCircleCoordinates = getPolygonCoordinates(kmlEvent.getTarget());
            var allCoords = pCircleCoordinates.split(" ");
            var numCoords = allCoords.length;
            var centerCoordinates = getCircleCenterCoordinates(allCoords[0], allCoords[16]);
            var centerCords = centerCoordinates.split(",");
            var circumCoordinates = getCircleCircumCoordinates(allCoords[8]);
            var circumCords = circumCoordinates.split(",");
            radius = getRadiusParameterised(parseFloat(centerCords[0]), parseFloat(circumCords[0]), parseFloat(centerCords[1]), parseFloat(circumCords[1]));
            centerPm = createPointPlacemark(parseFloat(centerCords[0]), parseFloat(centerCords[1]), '');
            circumPm = createPointPlacemark(parseFloat(circumCords[0]), parseFloat(circumCords[1]), '');

            // registers the event listeners for center and circumference
            registerCenterEditDraggableObject(centerPm, circumPm);
            registerCircumEditDraggableObject(circumPm, centerPm);
        }
        parent.setCurrentSelectedRegion(currentRubberBandPolyPlacemark.getId());
    }
}

/*
		function to calculate radius from center and circumference coordinates based on haversine formula
*/
function getRadiusParameterised(lat1, lat2, lng1, lng2) {
    return haversineDistance(lat1, lat2, lng1, lng2);
}

/*
		function to create the point placemarks on the circle
*/
function createPointPlacemark(latitude, longitude, pointName) {

    var pm = gex.dom.addPointPlacemark([latitude, longitude], {
        id: pointName,
        icon: circleCenterDragPlacemarkUrl
    });
    pm.setVisibility(true);
    return pm;
}


/*
		function to place the center placemark , also add event listeners for drag and drop for the palcemark
*/
function registerCenterEditDraggableObject(targetObj, referObj) {
    gex.edit.makeDraggable(targetObj, {
        dropCallback: function () {
            circleCenterPMDropCallBackEvent(targetObj, referObj);
        },
        dragCallback: function () {
            circleCenterPMDragCallBackEvent(targetObj);
        }
    });
}

/*
		function to place the circumference placemark by calculating radius and make it draggable. Also add event listeners for drag and drop for the palcemark
*/
function registerCircumEditDraggableObject(targetObj, referObj) {
    gex.edit.makeDraggable(targetObj, {
        dropCallback: function () {
            radius = getRadiusParameterised(referObj.getGeometry().getLatitude(), targetObj.getGeometry().getLatitude(), referObj.getGeometry().getLongitude(), targetObj.getGeometry().getLongitude())
            circleCircumPMDropCallBackEvent(referObj, radius);
        },
        dragCallback: function () {
            circleCircumPMDragCallBackEvent(targetObj);
        }
    });
}

/*
		CallBack Method to be triggered when circumference Placemark dragging stops.
*/
function circleCircumPMDropCallBackEvent(centerObj, radius) {
    setPolygonPlacemarkCoords(centerObj.getGeometry().getLatitude(), centerObj.getGeometry().getLongitude(), radius);
    rubberbandPolygonUpdated();
    circumferenceDraggedFlag = false;
    google.earth.removeEventListener(circumPm, 'mousemove', circumPMMoveHandler);
}

/*
		CallBack Method to be triggered when circumference Placemark dragging starts.
*/
function circleCircumPMDragCallBackEvent(targetObj) {
    circumferenceDraggedFlag = true;
    google.earth.addEventListener(circumPm, 'mousemove', circumPMMoveHandler);

}

/*
		Event Handler to update the circumference label while dragging.
*/
function circumPMMoveHandler(kmlEvent) {
    var radius = getRadiusParameterised(centerPm.getGeometry().getLatitude(), kmlEvent.getLatitude(), centerPm.getGeometry().getLongitude(), kmlEvent.getLongitude());
    var roundedRadius = imperialOrMetric(radius);
    parent.updateRadius(roundedRadius);
    //if it is very small convert to smaller unit km becomes meters
    if (radius < 0.10) {
        roundedRadiusSmallUnit = imperialOrMetricSmallUnit(radius);
        kmlEvent.getTarget().setName(roundedRadiusSmallUnit + " " + measurement);
    } else {
        kmlEvent.getTarget().setName(roundedRadius + " " + unit);
    }
}

/*
		CallBack Method to be triggered when circle center dragging stops.
*/
function circleCenterPMDropCallBackEvent(targetObj, referObj) {
    setPolygonPlacemarkCoords(targetObj.getGeometry().getLatitude(), targetObj.getGeometry().getLongitude(), radius);
    var coords = lastSelectedRegion.getGeometry().getOuterBoundary().getCoordinates();

    referObj.getGeometry().setLatitude(coords.get(8).getLatitude());
    referObj.getGeometry().setLongitude(coords.get(8).getLongitude());
    rubberbandPolygonUpdated();
    centreDraggedFlag = false;
}

/*
		CallBack Method to be triggered when circle center dragging starts.
*/
function circleCenterPMDragCallBackEvent(targetObj) {
    centreDraggedFlag = true;
}


/*
		function to repalce the Polygon placemarks coordinates when dragging..
*/
function setPolygonPlacemarkCoords(centerLat, centerLng, radius) {
    lastSelectedRegion.getGeometry().setOuterBoundary(makeCircle(radius, centerLat, centerLng));
    ge.getFeatures().appendChild(lastSelectedRegion);
}

function getCircleCircumCoordinates(coordinate) {
    var coordinateArray = coordinate.split(",");
    return coordinateArray[1] + "," + coordinateArray[0];
}

function getCircleCenterCoordinates(firstCoordinate, secondCoordinate) {
    var firstCoordinateArray = firstCoordinate.split(",");
    var secondCoordinateArray = secondCoordinate.split(",");
    var paramCenterLatitude = ((parseFloat(firstCoordinateArray[0])) / 2 + (parseFloat(secondCoordinateArray[0])) / 2);
    var paramCenterLongitude = ((parseFloat(firstCoordinateArray[1])) / 2 + (parseFloat(secondCoordinateArray[1])) / 2);
    return paramCenterLongitude + "," + paramCenterLatitude;
}


/*
		CallBack Method to be triggered for saving the updated regions back to server.
*/
function rubberbandPolygonUpdated() {

    if (currentRubberBandPolyPlacemark) {
        var rubberBand = afterEditRubberbandRegionsArray[currentRubberBandPolyPlacemark.getId()];
        rubberBand.coordinates = getPolygonCoordinates(currentRubberBandPolyPlacemark);
        rubberBand.viewPort = getSerializedViewPort();
        afterEditRubberbandRegionsArray[currentRubberBandPolyPlacemark.getId()] = rubberBand;
    }
}

/*
        on double click of the regions, its ends from editing mode of that particular region.
*/
function resetRubberBandFeatures() {
    if (currentRubberBandPolyPlacemark) {
        gex.edit.endEditLineString(currentRubberBandPolyPlacemark.getGeometry().getOuterBoundary());
    }
}

/*
        Called when a region is deselected.
*/
function resetDeselectedRubberBandFeatures(deSelectedId, regionTypeId, regionColor) {

    if (currentRubberBandPolyPlacemark) {
        gex.edit.endEditLineString(currentRubberBandPolyPlacemark.getGeometry().getOuterBoundary());
        currentRubberBandPolyPlacemark = null;
    }
    /*
            Check whether the region is deselected in editMode or not?
    */
    ge.getFeatures().removeChild(rbFeaturesArray[deSelectedId]);
    // @Releases the kmlObject from Google Earth. So that, the Id, can be reused
    rbFeaturesArray[deSelectedId].release();
    var kmlId = ++idCount;
    regainRBPolygon(kmlId, beforeEditRubberbandRegionsArray[deSelectedId].coordinates, true, deSelectedId, regionTypeId, regionColor);
    if (regionTypeId == 1) {
        viewPortArray["rb_" + kmlId] = viewPortArray[deSelectedId];
    } else {
        viewPortArray["rbcircle_" + kmlId] = viewPortArray[deSelectedId];
    }
    return kmlId;
}

function regainRBPolygon(id, coordStr, flag, oldId, regionTypeId, regionColor) {
    var validRegioncolor = validateRGBColor(regionColor);
    var opacityColorCode = swapColors(validRegioncolor);

    if (regionTypeId == 1) {
        var rbPlacemark = gex.dom.addPolygonPlacemark([], {
            id: 'rb_' + id,
            style: {
                poly: '80' + opacityColorCode,
                line: {
                    width: lineThickness,
                    color: validRegioncolor
                }
            }
        });
    } else {
        var rbPlacemark = gex.dom.addPolygonPlacemark([], {
            id: 'rbcircle_' + id,
            style: {
                poly: '80' + opacityColorCode,
                line: {
                    width: lineThickness,
                    color: validRegioncolor
                }
            }
        });
    }

    setPolygonCoordinates(rbPlacemark, coordStr);
    rbPlacemark.setVisibility(flag);
    rbFeaturesArray[rbPlacemark.getId()] = rbPlacemark;

    // show the mouse over Icon after saving	
    if (rbPlacemark.getId().search("rbcircle_") != -1) {
        google.earth.addEventListener(rbFeaturesArray[rbPlacemark.getId()], 'mouseover', circleRegionMouseOverHandler);
        google.earth.addEventListener(rbFeaturesArray[rbPlacemark.getId()], 'mouseout', circleRegionMouseOutHandler);
    }

    beforeEditRubberbandRegionsArray[oldId] = null;
    afterEditRubberbandRegionsArray[oldId] = null;
}

function rubberbandCompleteListener(event) {
    try {
        event.preventDefault();
        if (currentRubberBandPolyPlacemark) {
            gex.edit.endEditLineString(currentRubberBandPolyPlacemark.getGeometry().getOuterBoundary());
        }
    } catch (e) {
        //alert(e.message);
    }
    removeRubberBandCompleteListener();
}

function removeRubberBandCompleteListener() {
    if (isCompletedListener) {
        google.earth.removeEventListener(ge.getWindow(), 'dblclick', rubberbandCompleteListener);
        isCompletedListener = false;
    }
}

function resetEditModeRBFeature() {
    if (currentRubberBandPolyPlacemark) {
        ge.getFeatures().removeChild(currentRubberBandPolyPlacemark);
    }

    resetEditModeRBFeatures();
    parent.fireGEEvent('RB_POLYGON', 'click', 'deactivate');
}

function changeRubberBandModeEditMode(editModeFlag, state) {
    if (state == "STATE_AFTER_SAVE_NEW") {
        lastSelectedRegion = null;
    }
    setRBRegionsEditMode(editModeFlag);
    if (!editModeFlag) {
        resetRubberBandFeatures();
        currentRubberBandPolyPlacemark = null;
    }
}

function updateColorOnRegion(featureId, regionColor) {
    var validRegioncolor = validateRGBColor(regionColor);
    fillColor = validRegioncolor;
    var opacityColorCode = swapColors(validRegioncolor);
    if (featureId == null) {
        featureId = lastRBRegionDrawn;
    }
    var length = ge.getFeatures().getChildNodes().getLength();
    for (var i = 0; i < length; i++) {
        var polygonPlacemark = ge.getFeatures().getChildNodes().item(i);
        if (polygonPlacemark.getId() == featureId) {
            idCount++;
            var rbPolyPlacemark = gex.dom.addPolygonPlacemark([], {
                id: 'rb_' + idCount,
                style: {
                    poly: '80' + opacityColorCode,
                    line: {
                        width: lineThickness,
                        color: validRegioncolor
                    }
                }
            });
            polygonPlacemark.setStyleSelector(rbPolyPlacemark.getStyleSelector());
            ge.getFeatures().removeChild(rbPolyPlacemark);
            break;
        }
    }
}

function validateRGBColor(regionColor) {
    var validRegioncolor = "";
    var diff = 6 - regionColor.length;
    if (diff > 0) {
        for (var i = 0; i < diff; i++) {
            validRegioncolor += "0";
        }
    }
    validRegioncolor = validRegioncolor + regionColor.toUpperCase();
    return validRegioncolor;
}

function swapColors(regionColor) {
    var redCode = regionColor.substr(0, 2);
    var blueCode = regionColor.substr(4);
    var greenCode = regionColor.substr(2, 2);
    var opacityCode = blueCode + greenCode + redCode;
    return opacityCode;
}

function detailsClicked(rubberbandXML) {
    alert(rubberbandXML);
}
// This method is used to calculate the measurement units(miles,feet or KM , Meters) based measurement system 
function calculateMeasurementUnitForRBCircle(measurementSystem,params) {
    // calculating the units(miles,feet or KM , Meters) based measurement system 
    measurementSys = measurementSystem;
    if (measurementSystem == "imperial") {
        unit = params[0];//"miles";
        measurement = params[1];//"feet";
        isImperial = true;
    } else {
        unit = params[0];//"KM";
        measurement = params[1];//"Meters";
        isImperial = false;
    }
	
}

/* Rubberbanding edit code - start */

/* Rubberbanding Code - End */