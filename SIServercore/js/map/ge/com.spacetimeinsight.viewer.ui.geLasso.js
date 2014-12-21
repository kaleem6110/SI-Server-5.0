/**
 * Google Earth Lasso operations are written in this.
 */
define([
    'jquery',
    'jquery-ui',
    'map/ge/com.spacetimeinsight.viewer.ui.geMap',
],function($){
	$.extend($.spacetimeinsight.siViewerGoogleEarth.prototype, {

		onDrawLassoShape:function() {
			this.resetLassoFeatures();
			this._super();
		},

		resetLassoFeatures: function() {
			try {
				var $this = this;
				var ge = $this.options.gePluginInstance;
				
				if ($this.currentLassoPolyPlacemark) {
			            $this.gex.edit.endEditLineString($this.currentLassoPolyPlacemark.getGeometry().getOuterBoundary());
			            $this.currentLassoPolyPlacemark = null;
			            $this.lastSelectedRegion = null;
			            this.showPoints($si.viewer.LASSO_SHAPES.RECTANGLE,false);			    
			       }
				ge.getOptions().setMouseNavigationEnabled(true);
				$this.options.bypassEveryting = false;
				// if mouse click handler is still attached to ge then remove it.
				google.earth.removeEventListener(ge.getGlobe(), "click", $this.geMouseClickHandler);
				google.earth.removeEventListener(ge.getGlobe(), "mousedown",$this.geDownListener);
	        	google.earth.removeEventListener(ge.getGlobe(), "mouseup", $this.geUpListener);
	        	google.earth.removeEventListener(ge.getGlobe(), "mousemove", $this.rectangleMouseMoveListener);
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while creating calling resetLassoFeatures');
			}
		},
		
	    drawLassoPolygon: function() {
	    	var $this = this;
	    	var ge = $this.options.gePluginInstance;
	    	var opacityColor = $this.swapColors($this.fillColor, $this.opacity);
	        try {
	        	$this.idCount++;
	        	
	        	$this.currentLassoPolyPlacemark = $this.gex.dom.addPolygonPlacemark([], {
	                id: $si.viewer.LASSO_SHAPES.POLYGON+this.LASSO_ID_SEPERATOR + $this.idCount,
	                style: {
	                    poly: {color: opacityColor},
	                    line: {
	                        width: $this.lineThickness,
	                        color: $this.fillColor
	                    }
	                }
	            });
	        	//$this.currentLassoPolyPlacemark.setOpacity($this.opacity/100);
	            $this.lastLassoRegionDrawn = $si.viewer.LASSO_SHAPES.POLYGON+this.LASSO_ID_SEPERATOR + $this.idCount;
	            var optionsObj = new Object();
	            optionsObj.drawCallback = function(){
	            	/* Have commented out this code as on every click command for refreshing the layer is going.
	            	 * Instead the user should double click on the poly lasso or click on the first point of the poly lasso 
	            	 * and finalize and then the lasso filter should be applied.  
	            	 */
	            	//$($si.viewer).trigger("applyLassoFilter", true);

	            };
	            optionsObj.finishCallback = function(event){
	            	/* When the user double clicks the poly lasso or clicks at the starting point of the poly lasso.
	            	   This section will be initialized. 
	            	*/
	            	$($si.viewer).trigger("applyLassoFilter", true);
	            	$this.gex.edit.endEditLineString($this.currentLassoPolyPlacemark.getGeometry().getOuterBoundary());
		            $this.rbFeaturesArray[$this.currentLassoPolyPlacemark.getId()] = $this.currentLassoPolyPlacemark;
		            // Activate Editing of the lasso.
			    	var paramArray = [true, null];
			    	$this.changeLassoModeEditMode(paramArray);
			    	// set the bypass boolean as true so that while editing so that it appears as if lasso is in edit mode.
			    	$this.options.bypassEveryting = true;
	            }; 
	            
	            $this.gex.edit.drawLineString($this.currentLassoPolyPlacemark.getGeometry().getOuterBoundary(), optionsObj);
	        } catch (e) {
	        	$si.Logger('Lasso').error('Error ['+e.message+'] occurred while creating a Polygon');
	        }
	    },

	    
	    
	    swapColors: function(regionColor, opacity) {
	    	try {
	    		var redCode = regionColor.substr(0, 2);
		        var blueCode = regionColor.substr(4);
		        var greenCode = regionColor.substr(2, 2);
		        var opacityCode = this.calculateAlphaForGe(opacity)+blueCode + greenCode + redCode;
		        return opacityCode;
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling swapColors');
			}

	         return null;
	    },

	    /**This method is used to calculate the measurement units(miles,feet or KM , Meters) based measurement system*/
	     calculateMeasurementUnitForLassoCircle: function(measurementSystem, params) {
	    	try {
	    		var $this = this;
		        // calculating the units(miles,feet or KM , Meters) based measurement system
		    	$this.measurementSys = measurementSystem;
		        if (measurementSystem == "imperial") {
		        	$this.unit = params[0];//"miles";
		        	$this.measurement = params[1];//"feet";
		        	$this.isImperial = true;
		        } else {
		        	$this.unit = params[0];//"KM";
		        	$this.measurement = params[1];//"Meters";
		        	$this.isImperial = false;
		        }
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling calculateMeasurementUnitForLassoCircle');
			}
	    },

	    
	    drawLassoCircle: function(){
		    var params = new Array();
		    var paramArray = $si.mapUtils.getMeasurementParameters();
				params[0] = paramArray[1];
				params[1] = paramArray[2];
				// calling this method to calculate the units(miles,feet or KM , Meters) based measurement system
				this.calculateMeasurementUnitForLassoCircle(paramArray[0], params);
				this.options.lassoSides = 32;
				this.initCircleCreation = true;
				this.drawNewLassoCircle($si.viewer.LASSO_SHAPES.CIRCLE);
	    },
	    
	    drawLassoRectangle: function(){
	    	var paramArray = $si.mapUtils.getMeasurementParameters();
		    var params = new Array();
		    	params[0] = paramArray[1];
		    	params[1] = paramArray[2];
		    	// calling this method to calculate the units(miles,feet or KM , Meters) based measurement system
		    	//this.calculateMeasurementUnitForLassoCircle(paramArray[0], params);
		    	this.options.lassoSides = 4;
				this.initCircleCreation = true;
		    	this.drawNewLassoCircle($si.viewer.LASSO_SHAPES.RECTANGLE);
	    },
	     
	    /**Creation of circle. Registers the Click event Listener on Google window*/
		drawNewLassoCircle: function(shape) {
			try {
				var $this = this;
				var ge = $this.options.gePluginInstance;
				var options = ge.getOptions();

				if(shape == $si.viewer.LASSO_SHAPES.CIRCLE){
			    $this.geMouseClickHandler = function(kmlEvent) {
					$this.createNewCircleFlag = true;
			    	//loading the circle
					   $this.loadCircle($this.radius, kmlEvent.getLatitude(), kmlEvent.getLongitude(),null,null,shape);
				    //remove the listener after creating circle - success
				    google.earth.removeEventListener(ge.getGlobe(), 'click', $this.geMouseClickHandler);
			    };
			    google.earth.addEventListener(ge.getGlobe(), 'click', $this.geMouseClickHandler);
				}else if(shape == $si.viewer.LASSO_SHAPES.RECTANGLE){
					$this.createNewRectangleFlag = true;
					$this.options.bypassEveryting = false;
					
					$this.geUpListener = function(kmlEvent) {
						 google.earth.removeEventListener(ge.getGlobe(), "mousemove", $this.rectangleMouseMoveListener);
				    	  if($this.drawBox == true)
				    	  {
				    	    var endX = kmlEvent.getLatitude();
				    	    var endY = kmlEvent.getLongitude();

				    	   // $this.drawRectangle($this.startX, $this.startY, endX, endY);
				    	    if($this.currentLassoPolyPlacemark == null){
				    	    	// if the user clicks on ge this part will be executed
				    	    	$this.loadCircle($this.radius, $this.startX, $this.startY, endX, endY, shape);
				    	    	$this.recreateNewRectangle();
				    	    }else{
				    	    				    	    	// if the user drags on ge to create the lasso then this section is execuated. 
				    	    	$this.recreateNewRectangle();
				    	    }
				    	    
				    	   // geApp.geDrawEvent(startX, startY, endX, endY); //return values to   	C# App
				    	    $this.drawBox = false;
				    	    //google.earth.addEventListener(ge.getGlobe(), 'click', $this.geMouseClickHandler);
				    	    google.earth.removeEventListener(ge.getGlobe(), "mouseup", 	$this.geUpListener);
				    	    options.setMouseNavigationEnabled(true);

				    	  }
				    };
				    
				    
				   // google.earth.addEventListener(ge.getGlobe(), 'mouseup', $this.geUpListener);
				    $this.geDownListener = function(kmlEvent) {
				    	 if(kmlEvent.getButton() == 2)
				    	    {
				    		 $this.removeCurrentBox($this.currentLassoPolyPlacemark);  //routine that removes the box
				    	      $this.drawBox = false;
				    	    }
				    	    else
				    	    {

				    	    	$this.startX = kmlEvent.getLatitude();
				    	    	$this.startY = kmlEvent.getLongitude();
				    	    	
				    	      $this.drawBox = true;
				    	    }
				    	 //google.earth.removeEventListener(ge.getGlobe(), "mouseup", $this.geUpListener);
				    	 google.earth.removeEventListener(ge.getGlobe(), "mousedown",$this.geDownListener);
				    	 google.earth.addEventListener(ge.getGlobe(), "mousemove", $this.rectangleMouseMoveListener);
				    };
				    
				    
				    $this.rectangleMouseMoveListener = function(kmlEvent) {
				    	if($this.drawBox){
				    		var endX = kmlEvent.getLatitude();
					    	var endY = kmlEvent.getLongitude();
					    	
					    	if($this.currentLassoPolyPlacemark == null){
					    		$this.options.bypassEveryting = true;
					    		$this.loadCircle($this.radius, $this.startX, $this.startY, endX, endY,shape);
					    		$this.showPoints($si.viewer.LASSO_SHAPES.RECTANGLE,false);	
					    		
					    		
					    	}
					    	$this.currentLassoPolyPlacemark.getGeometry().setOuterBoundary($this.createRectangleRing($this.startX, $this.startY,endX,endY,null));
					    	 
				    	}
				    };
	
				    
			
				    options.setMouseNavigationEnabled(false);
				    //if(mouse == false)  {
				         google.earth.addEventListener(ge.getGlobe(), "mousedown", $this.geDownListener);
				         google.earth.addEventListener(ge.getGlobe(), "mouseup", $this.geUpListener);

				   /* }else {
			        	 google.earth.removeEventListener(ge.getGlobe(), "mousedown",$this.geDownListener);
			        	 google.earth.removeEventListener(ge.getGlobe(), "mouseup", $this.geUpListener);
			        }*/
					
				}

			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling drawNewLassoCircle');
			}
		},
		
		
		/*
        - Creates the circle with the defined radius after removing the circle existing
        - creates the center
        - creates the circumference
        */
		loadCircle: function(radius, sX, sY, eX, eY,shape) {
			try {
				var $this = this;
				var ge = $this.options.gePluginInstance;				
				$this.removeCircleChildren();
				$this.createNewCircle(radius, sX, sY,  eX, eY,'', $this.fillColor, $this.lineThickness, $this.opacity,shape);
				if(shape == $si.viewer.LASSO_SHAPES.RECTANGLE && !$this.options.bypassEveryting){
					$this.redrawPoints($si.viewer.LASSO_SHAPES.RECTANGLE,$this.getPolygonCoordinates($this.currentLassoPolyPlacemark));					
				}else{
					$($si.viewer).trigger("applyLassoFilter", true);
					$this.drawPoint("circle", sX, sY, 'centre');
				if ($this.radius < 0.10) {
					$this.roundedRadiusSmallUnit = $this.imperialOrMetricSmallUnit(radius);
						$this.drawPoint("circle", $this.circumLatitude, $this.circumLongitude, $this.roundedRadiusSmallUnit + " " + $this.measurement);
				} else {
					$this.roundedRadius = $this.imperialOrMetric(radius);
					//parent.updateRadius($this.roundedRadius);
						$this.drawPoint("circle", $this.circumLatitude, $this.circumLongitude, $this.roundedRadius + " " + $this.unit);
					}
				}
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling loadCircle');
			}

		},

		/*
        -creates the circle  with the defined radius
		*/
		createNewCircle: function(radius, latitude, longitude,eX, eY, predefinedId, regionColor, lineThickness, opacity,shape) {
			try {
				var $this = this;
			    var validRegioncolor = $this.validateRGBColor(regionColor);
			    var opacityColorCode = $this.swapColors(validRegioncolor, opacity);
			    var targetId = '';
			    var ge = $this.options.gePluginInstance;

			    $this.idCount++;
			    if (predefinedId == '') {
			        targetId = shape + this.LASSO_ID_SEPERATOR + $this.idCount;
			    } else {
			        targetId = predefinedId+this.LASSO_ID_SEPERATOR+$this.idCount;
			    }
			    $this.lastLassoRegionDrawn = targetId;
			    $this.currentLassoPolyPlacemark = $this.gex.dom.addPolygonPlacemark([], {
			        id: targetId,
			        style: {
			            poly: opacityColorCode,
			            line: {
			                width: lineThickness,
			                color: validRegioncolor
			            }
			        }
			    });

			    var lassoOpacity = null;

			    if(opacity > 1){
			    	lassoOpacity = (opacity/100);
			    }else{
			    	lassoOpacity = opacity;
			    }

	        	//$this.currentLassoPolyPlacemark.setOpacity(lassoOpacity);
			    if(shape == $si.viewer.LASSO_SHAPES.RECTANGLE){

			    	// This condition will check of the rectangle has to be via click on GE 
			    	if(latitude == eX && longitude == eY){
			    
				    	var length = $this.options.rectangleDefaultLength;
						var breadth = $this.options.rectangleDefaultBreadth;
	
						// Fetch the new center point
						var cX = latitude;
						var cY = longitude;
	
						// Calculate the new sX & sY
						var sX = cX + length/2;
						var sY = cY + breadth/2;
	
						// Calculate the new eX & eY
						eX = cX - length/2;
						eY = cY - breadth/2;
						
						$this.currentLassoPolyPlacemark.getGeometry().setOuterBoundary($this.createRectangleRing(sX, sY,eX,eY,null));
			    	}else{
			    		$this.currentLassoPolyPlacemark.getGeometry().setOuterBoundary($this.createRectangleRing(latitude, longitude,eX,eY,null))
			    	}
			    	
			    }else{
			    	$this.currentLassoPolyPlacemark.getGeometry().setOuterBoundary($this.makeCircle(radius, latitude, longitude))
			    }
			    ge.getFeatures().appendChild($this.currentLassoPolyPlacemark);

			    //registers the Listener for Circle placemark
			    $this.registerPMListener();
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling createNewCircle');
			}

		},

		makeCircle: function(radius, centerLat, centerLng) {
			try {
				var $this = this;
				var ge = $this.options.gePluginInstance;
			    var ring = ge.createLinearRing('');
			    var steps = 32;
			   // var steps = $this.options.lassoSides;
			    var pi2 = Math.PI * 2;
			    var arr = new Array();
			    for (var i = 0; i < steps; i++) {
			        var brng = i * 360 / steps;
			        var coordStr = $this.calculateCoord(centerLat, centerLng, brng, radius);
			        arr = coordStr.split(",");
			        var newlat = arr[0];
			        var newlng = arr[1];
			        ring.getCoordinates().pushLatLngAlt(parseFloat(newlat),parseFloat(newlng), parseFloat(0));
			        if (i == steps / 4) {
			            $this.circumLatitude = parseFloat(newlat);
			            $this.circumLongitude = parseFloat(newlng);
			        }
			    }
			    return ring;
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling makeCircle');
			}

			return null;
		},

		
		intToAlpha:function (int) {
			var asciiStart = 97,
			    alphaMax = 26,
			    asciiCode,
			    char,
			    alpha = "";
			    while(int > 0) {
			        char = String.fromCharCode(asciiStart + ((int-1) % alphaMax));
			        alpha = char + alpha;
			        int = Math.floor((int-1)/26);
			    }
			    return alpha;
		},
		
		/* Add the listeners
        1) mousedown - adds the click listener on the google earth (target object - circle )
        2) mousedown - adds the click listener on the google earth (target object - google window )*/
		registerPMListener: function() {
			try {
				var $this = this;
				var ge = $this.options.gePluginInstance;
				$this.circleClickHandler = function(kmlEvent) {
					google.earth.removeEventListener(ge.getWindow(), 'click', $this.geMouseClickHandler);
				};

			    google.earth.addEventListener($this.currentLassoPolyPlacemark, 'mousedown', $this.circleClickHandler);
			    google.earth.addEventListener(ge.getWindow(), 'mousedown', $this.circleClickHandler);
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling registerPMListener');
			}
		},

		validateRGBColor: function(regionColor) {
			try {
				var validRegioncolor = "";
			    var diff = 6 - regionColor.length;
			    if (diff > 0) {
			        for (var i = 0; i < diff; i++) {
			            validRegioncolor += "0";
			        }
			    }
			    validRegioncolor = validRegioncolor + regionColor.toUpperCase();
			    return validRegioncolor;
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling validateRGBColor');
			}
		    return null;
		},

		/*Creates the point on the google window*/
		drawPoint: function(shape, latitude, longitude, pointName){
			try {
				var $this = this;
				var id='lasso_' + Math.random();
				var ge = $this.options.gePluginInstance;
				
				if (shape == $si.viewer.LASSO_SHAPES.RECTANGLE && pointName != '') {
					id = pointName;
				}
			
				var pm = null;
				if(latitude != null && longitude != null){
					pm = $this.gex.dom.addPointPlacemark([latitude, longitude], {
			            id: id,
			            icon: $this.circleCenterDragPlacemarkUrl
			        });
					
					if($this.options.bypassEveryting){
						ge.getElementById(id).setVisibility(false);
					}
				}
			    
			    if (shape == 'circle' && pointName == 'centre') {
			        $this.center = pm;
			        google.earth.addEventListener(pm, 'mouseup', $this.geMouseClickHandler);
			        google.earth.addEventListener(pm, 'mouseup', $this.circleClickHandler);
			    } else  if (shape == 'circle' && pointName != '') {
			    	if(pm != null){
				    	pm.setName(pointName);
				    	$this.circumference = pm;
			    		$this.circumferenceMoveHandler = function (kmlEvent){
			    			 var radiusCircum = $this.getRadiusParameterised($this.center.getGeometry().getLatitude(), kmlEvent.getLatitude(), $this.center.getGeometry().getLongitude(), kmlEvent.getLongitude());
			    			 var roundedRadius = $this.imperialOrMetric(radiusCircum);
			    			 if (radiusCircum < 0.10) {
			    			     $this.roundedRadiusSmallUnit = $this.imperialOrMetricSmallUnit(radiusCircum);
			    			     kmlEvent.getTarget().setName($this.roundedRadiusSmallUnit + " " + $this.measurement);
			    			 } else {
			    			     kmlEvent.getTarget().setName(roundedRadius + " " + $this.unit); //unit
			    			 }
			    		};
	
				    	$this.circumferenceMouseUpHandler = function (kmlEvent){
				    		google.earth.removeEventListener($this.circumference, 'mousemove', $this.circumferenceMoveHandler);
				    	};
	
				    	$this.circumferenceMouseDownHandler =  function (kmlEvent){
				    		google.earth.addEventListener($this.circumference, 'mousemove', $this.circumferenceMoveHandler);
				    	};
				       		google.earth.addEventListener($this.circumference, 'mouseup', $this.circumferenceMouseUpHandler);
				       		google.earth.addEventListener($this.circumference, 'mousedown', $this.circumferenceMouseDownHandler);
			    	}
			    }
			    
			    if(pm != null){
			    	$this.registerDraggableObject(pm,shape);
			    	//google.earth.addEventListener(, 'mouseup', $this.circumferenceMouseDownHandler);
			    }
			    
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling drawPoint');
			}

		},

		/**
        registers some call back methods
        1) circlePointDropCallBackEvent - event handler - when drop the object
        2) dragCall BackEvent - event handler - when dragging the object
		 */
		registerDraggableObject: function(targetObj,shape) {
			try {
				var $this = this;
			    $this.gex.edit.makeDraggable(targetObj, {
			        dropCallback: function () {

			    		if(shape == $si.viewer.LASSO_SHAPES.RECTANGLE){
			    			$this.redrawRectangle(targetObj);
			    		}else{
			    			$this.circlePointDropCallBackEvent(targetObj);
			    		}
			        },
			        dragCallback: function () {
			        	if(shape == $si.viewer.LASSO_SHAPES.RECTANGLE){
			        		//$this.rectanglePointDragCallBackEvent(targetObj).bind($this);
			    		}else{
			    			$this.circlePointDragCallBackEvent(targetObj);
			    		}
			      }
			    });
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling registerDraggableObject');
			}

		},

		/*
		rectanglePointDragCallBackEvent: function(pointPlacemark) {
			try {
				var $this = this;
			    var ge = $this.options.gePluginInstance;
			    var pointId = pointPlacemark.getId();
			    
				if ($this.createNewRectangleFlag) {
					$this.lastSelectedRegion = null;
			        	//$this.radius = $this.getRadius();
				    	if($this.dragFlag && pointId != ''){
				    		$this.options.pointPlacemark = pointPlacemark;
				    		$this.dragFlag = false;
				            google.earth.addEventListener(ge.getWindow(), 'click', $this.rectangleChangeHandler.bind($this));
				    	}
			        
			    }
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling circlePointDragCallBackEvent');
			}
		},
		
		
		rectangleChangeHandler: function (kmlEvent) {
			try {
				var $this = this;
				var ge = $this.options.gePluginInstance;
				$this.options.editRectangle = true;
				if($this.createNewRectangleFlag){
					$this.redrawRectangle($this.options.pointPlacemark);
					//$this.redrawPoints($si.viewer.LASSO_SHAPES.RECTANGLE,$this.getPolygonCoordinates($this.currentLassoPolyPlacemark));
					var coordinateStr = $this.getPolygonCoordinates($this.currentLassoPolyPlacemark);
					//ge.getFeatures().removeChild($this.options.pointPlacemark);
					//$this.removePoints($si.viewer.LASSO_SHAPES.RECTANGLE);	
					$this.showPoints($si.viewer.LASSO_SHAPES.RECTANGLE, false);
					console.log(coordinateStr);
					$this.clearNewDrawLasso();
					//console.log(coordinateStr);
					//
					
					if(coordinateStr.split(" ").length==5){
						//coordinateStr = coordinateStr.split(" ");
						console.log("INNNNNNNNN22");
			    		// rectangle
				        var x1 = parseFloat(coordinateStr[0]);
				        console.log("INNNNNNNNN22");
				        var y1 = parseFloat(coordinateStr[1]);
				        console.log("INNNNNNNNN22");
				        var x2 = parseFloat(coordinateStr[2]);
				        console.log("INNNNNNNNN22");
				        var y2 = parseFloat(coordinateStr[3]);
				        console.log("INNNNNNNNN22");
				        //$this.loadCircle($this.radius, $this.startX, $this.startY, endX, endY, shape);
				        //$this.createNewCircle($this.radius, x1, y1, eX, eY, predefinedId, $this.fillColor,  $this.lineThickness, $this.opacity, $si.viewer.LASSO_SHAPES.RECTANGLE)
				        //$this.idCount++;
				        console.log(x1+"-----"+y1+"------"+x2+"------"+y2);
					    var targetId = $si.viewer.LASSO_SHAPES.RECTANGLE + $this.LASSO_ID_SEPERATOR + $this.idCount;
				        console.log("INNNNNNNNN22");
				        //$this.createNewCircle(radius, sX, sY,  eX, eY,'', $this.fillColor, $this.lineThickness, $this.opacity,shape);
				        $this.createNewCircleWithCoords(coordinateStr, x1, y1, '', $this.fillColor,  $this.lineThickness, $this.opacity, $si.viewer.LASSO_SHAPES.RECTANGLE);
				        console.log("INNNNNNNNN33");
				        $this.redrawPoints($si.viewer.LASSO_SHAPES.RECTANGLE,$this.getPolygonCoordinates($this.currentLassoPolyPlacemark));				
				        		
				      //$this.createNewCircleWithCoords(coords, latitude, longitude, predefinedId, regionColor, lineThickness, opacity, shape)  
			    	}
					//$this.redrawNewRectangle(coordinateStr, $this.options.pointPlacemark);
					//$this.redrawPoints($si.viewer.LASSO_SHAPES.RECTANGLE,$this.getPolygonCoordinates($this.currentLassoPolyPlacemark));
				}
				$this.dragFlag = true;
				
				google.earth.removeEventListener(ge.getWindow(), 'click', $this.rectangleChangeHandler.bind($this));
				$($si.viewer).trigger("applyLassoFilter", true);
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling rectangleChangeHandler');
			}
			
		},
		*/
		
		recreateNewRectangle : function() {
			try {
				var $this = this;
				var coordinateStr = $this.getPolygonCoordinates($this.currentLassoPolyPlacemark);
				$this.showPoints($si.viewer.LASSO_SHAPES.RECTANGLE, false);
				$this.clearNewDrawLasso();
				if(coordinateStr.split(" ").length==5){
			        var x1 = parseFloat(coordinateStr[0]);
			        var y1 = parseFloat(coordinateStr[1]);
			        $this.createNewCircleWithCoords(coordinateStr, x1, y1, '', $this.fillColor,  $this.lineThickness, $this.opacity, $si.viewer.LASSO_SHAPES.RECTANGLE);
			        $this.redrawPoints($si.viewer.LASSO_SHAPES.RECTANGLE,$this.getPolygonCoordinates($this.currentLassoPolyPlacemark));	
			       
			    	$this.createNewRectangleFlag = true;
			    	$si.viewer.isLassoCreate = true;
			    	//$this.changeLassoModeEditMode([false, $this.STATE_AFTER_SAVE_NEW]);
		    	}
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling recreateNewRectangle');
			}
			
		},
		
		/**
        Circumference point changes- so  calculate the updated
        radius
		 */
		circlePointDropCallBackEvent: function(pointPlacemark) {
			try {
				var $this = this;
					var pointName = pointPlacemark.getName();
					var ge = $this.options.gePluginInstance;
				    if (pointName != '') {
				    	$this.radius = $this.getRadius();
				    	$($si.viewer).trigger("applyLassoFilter", true);
				    }
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling circlePointDropCallBackEvent');
			}

		},

		/**Calculates the radius*/
		getRadius: function() {
			try {
				var $this = this;
			    return $this.getRadiusParameterised($this.center.getGeometry().getLatitude(), $this.circumference.getGeometry().getLatitude(), $this.center.getGeometry().getLongitude(), $this.circumference.getGeometry().getLongitude());
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling getRadius');
			}
			return null;
		},

		/**
        Drag Handler.
        1) adds the google window - click listener - if its an center change event
        2) adds the radius changes handler - if its an circumference change event */
		circlePointDragCallBackEvent: function(pointPlacemark) {
			try {
				var $this = this;
			    var ge = $this.options.gePluginInstance;
				if ($this.createNewCircleFlag) {
					$this.lastSelectedRegion = null;
			        var pointName = pointPlacemark.getName();

			        if (pointName == '') {
			        	// replace geMouseClickHandler with $this.geCircleMouseClickEventHandeler
			            google.earth.addEventListener(ge.getWindow(), 'click', $this.geMouseClickHandler);
			        }
			        else {
			        	$this.radius = $this.getRadius();
				    	if($this.dragFlag){
				    		$this.dragFlag = false;
				            google.earth.addEventListener(ge.getWindow(), 'click', $this.radiusChangeHandler.bind($this));
				    	}
			        }
			    }
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling circlePointDragCallBackEvent');
			}
		},

		radiusChangeHandler:function(kmlEvent){
			var $this = this;
			var ge = $this.options.gePluginInstance;
			if($this.createNewCircleFlag){
				$this.loadCircle($this.radius, $this.center.getGeometry().getLatitude(), $this.center.getGeometry().getLongitude());
			}
			
            $this.dragFlag = true;
            google.earth.removeEventListener(ge.getGlobe(), 'click', $this.radiusChangeHandler.bind($this));
            google.earth.removeEventListener(ge.getWindow(), 'click', $this.radiusChangeHandler.bind($this));
            $($si.viewer).trigger("applyLassoFilter", true);
		},
		  /**
			Function to calculate radius from center and circumference coordinates based on haversine formula
		 */
		getRadiusParameterised: function(lat1, lat2, lng1, lng2) {
			try {
				var $this = this;
			    return $this.haversineDistance(lat1, lat2, lng1, lng2);
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling getRadiusParameterised');
			}
			return null;
		},

		/**Radius calculation method based on center and circum latitude and longitude values*/
		haversineDistance: function(lat1, lat2, lng1, lng2) {
			try {
				var $this = this;
				var radlat1 = $this.degToRad(lat1);
			    var radlat2 = $this.degToRad(lat2);
			    var radlng1 = $this.degToRad(lng1);
			    var radlng2 = $this.degToRad(lng2);
			    var dLat = radlat2 - radlat1;
			    var dLon = radlng2 - radlng1;
			    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radlat1) * Math.cos(radlat2);
			    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			    return $this.EARTH_RADIUS * c;
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling haversineDistance');
			}

		},

		/**Removes the circle & its children*/
		removeCircleChildren: function() {
			try {
				var $this = this;
				var ge = $this.options.gePluginInstance;
				if ($this.currentLassoPolyPlacemark) ge.getFeatures().removeChild($this.currentLassoPolyPlacemark);
			    if ($this.center) ge.getFeatures().removeChild($this.center);
			    if ($this.circumference) ge.getFeatures().removeChild($this.circumference);
			    if ($this.initCircleCreation) {
			    	$this.initCircleCreation = false;
			    }
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling removeCircleChildren');
			}

		},

		/**Method to convert to smaller units for miles and KM based on measurement system selected*/
		imperialOrMetricSmallUnit: function(radiusParam) {
			try {
				var $this = this;
				if ($this.isImperial) return Math.round(radiusParam * $this.kmToMilesFactor * $this.milesToFeetFactor * Math.pow(10, 2)) / Math.pow(10, 2);
			    else return Math.round(radiusParam * $this.smallUnitConversion * Math.pow(10, 2)) / Math.pow(10, 2);
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling imperialOrMetricSmallUnit');
			}
			return null;
		},

		//method to convert to miles or KM based on measurement system selected
		imperialOrMetric: function(radiusParam) {
			try {
				var $this = this;
			    if ($this.isImperial) return Math.round(radiusParam * $this.kmToMilesFactor * Math.pow(10, 2)) / Math.pow(10, 2);
			    else return Math.round(radiusParam * Math.pow(10, 2)) / Math.pow(10, 2);
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling imperialOrMetric');
			}
			return null;
		},

		//calculation for the second set of coordinates along the circle based on center latitude and longitude
		calculateCoord: function(lat, lng, brng, arcLength) {
		    try {
		    	var $this = this;
				var lat1 = $this.degToRad(lat);
			    var lon1 = $this.degToRad(lng);
			    var centralAngle = arcLength / $this.EARTH_RADIUS;
			    var lat2 = Math.asin(Math.sin(lat1) * Math.cos(centralAngle) + Math.cos(lat1) * Math.sin(centralAngle) * Math.cos($this.degToRad(brng)));
			    var lon2 = lon1 + Math.atan2(Math.sin($this.degToRad(brng)) * Math.sin(centralAngle) * Math.cos(lat1), Math.cos(centralAngle) - Math.sin(lat1) * Math.sin(lat2));
			    return $this.radToDeg(lat2) + ',' + $this.radToDeg(lon2);
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling calculateCoord');
			}
			return null;
		},

		//Conversion method from degrees to Radians
		degToRad: function(x) {
		    return x * Math.PI / 180;
		},

		//Conversion method from radians to degrees
		radToDeg: function(x) {
		    return x * 180 / Math.PI;
		},

		drawLassoPolygonFinished: function() {
		    try {
		    	var $this = this;
		    	var ge = $this.options.gePluginInstance;
		        if ($this.currentLassoPolyPlacemark) {
		            var count = $this.currentLassoPolyPlacemark.getGeometry().getOuterBoundary().getCoordinates().getLength();
		            if (count <= 2) {
		            	//$this._polygonMouseListeners(false).bind($this);
		                $this.gex.edit.endEditLineString($this.currentLassoPolyPlacemark.getGeometry().getOuterBoundary());
		                ge.getFeatures().removeChild($this.currentLassoPolyPlacemark);
		                $this.currentLassoPolyPlacemark = null;
		                //$this.addFeature("", "", "", count + "","","")
		            	//$this.showErrorMessage($si.i18N.Map.lassomessages.polyincorrectdrawerror);
		                return;
		            }
		            if (count == 3) {
		                var coordString = $this.getPolygonCoordinates($this.currentLassoPolyPlacemark);
		                var arr = coordString.split(" ");
		                if (arr != null) {
		                    if (arr[0] == arr[2]) {
		                    	//$this._polygonMouseListeners(false).bind($this);
		                    	$this.gex.edit.endEditLineString($this.currentLassoPolyPlacemark.getGeometry().getOuterBoundary());
		                        ge.getFeatures().removeChild($this.currentLassoPolyPlacemark);
		                        $this.currentLassoPolyPlacemark = null;
		                        //$this.addFeature("", coordString, $this.options.currentLassoTypeId, count + "","","");
		                        //$this.showErrorMessage($si.i18N.Map.lassomessages.polyincorrectdrawerror);
		                        return;
		                    }
		                }
		            }
		            //add the placemark to the array
		            $this.rbFeaturesArray[$this.currentLassoPolyPlacemark.getId()] = $this.currentLassoPolyPlacemark;
		            $this.viewPortArray[$this.currentLassoPolyPlacemark.getId()] = $this.getSerializedViewPort();
		            $this.gex.edit.endEditLineString($this.currentLassoPolyPlacemark.getGeometry().getOuterBoundary());
		            //$this._polygonMouseListeners(false);
		            if ($this.currentLassoPolyPlacemark != null) {
		            	$this.addFeature($this.currentLassoPolyPlacemark.getId(), $this.getPolygonCoordinates($this.currentLassoPolyPlacemark), $this.options.currentLassoTypeId , count + "", $this.getSerializedViewPort(), $this.opacity);
		    		    $this.currentLassoPolyPlacemark = null;
		            }
		        }
		    } catch (e) {
		    	$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling drawLassoPolygonFinished');
		    }
		},

		drawLassoCircleFinished: function() {
			var $this = this;
			var ge = $this.options.gePluginInstance;
		    google.earth.removeEventListener(ge.getGlobe(), 'click', $this.geMouseClickHandler);
		    google.earth.removeEventListener(ge.getWindow(), 'click', $this.radiusChangeHandler.bind($this));
		    try {
		        if ($this.currentLassoPolyPlacemark) {
		            var count = $this.currentLassoPolyPlacemark.getGeometry().getOuterBoundary().getCoordinates().getLength();
		            if ($this.currentLassoPolyPlacemark != null) {
		                if ($this.center) {
		                    ge.getFeatures().removeChild($this.center);
		                }
		                if ($this.circumference) {
		                    ge.getFeatures().removeChild($this.circumference);
		                }
		                //add the placemark to the array
		                $this.rbFeaturesArray[$this.currentLassoPolyPlacemark.getId()] = $this.currentLassoPolyPlacemark;
		                $this.viewPortArray[$this.currentLassoPolyPlacemark.getId()] = $this.getSerializedViewPort();

		                $this.createNewCircleFlag = false;
		                $this.createNewRectangleFlag = false;
		                // for creation part these below listners are not required. Will implement it later.
		                //google.earth.addEventListener($this.rbFeaturesArray[$this.currentLassoPolyPlacemark.getId()], 'mouseover', $this.circleRegionMouseOverHandler);
		                //google.earth.addEventListener($this.rbFeaturesArray[$this.currentLassoPolyPlacemark.getId()], 'mouseout', $this.circleRegionMouseOutHandler);
		                $this.addFeature($this.currentLassoPolyPlacemark.getId(), $this.getPolygonCoordinates($this.currentLassoPolyPlacemark), $this.options.currentLassoTypeId, count + "", $this.getSerializedViewPort(), $this.opacity);
		            }
		            //parent.fireGEEvent('RB_CIRCLE', 'click', 'deactivate');

		        } else {
		        	//this.showErrorMessage($si.i18N.Map.lassomessages.createCircleError);
		        	this.resetLassoFeatures();
		        	//$this.currentLassoPolyPlacemark = null;
		        	//$this.addFeature("", "", "", count + "","","");
		            return;
		        }
		    } catch (e) {
		    	$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling drawLassoCircleFinished');
		    }
		    $this.currentLassoPolyPlacemark = null;

		},
		
		drawLassoRectangleFinished : function() {
			if(this.currentLassoPolyPlacemark){
				this.drawLassoCircleFinished();
			}else{
				//this.showErrorMessage($si.i18N.Map.lassomessages.createRectangleError);
				this.resetLassoFeatures();
			}
		},

		getLassoJsonObjFromCurrentCreatedLasso : function() {
			var lassoJosnObj = {}
			
			if(this.currentLassoPolyPlacemark != null){
				lassoJosnObj.coordinates = this.getPolygonCoordinates(this.currentLassoPolyPlacemark);
				return lassoJosnObj;
			}
			
			return null;
		},
		
		getPolygonCoordinates: function(polyPlacemark) {
			  var $this = this;
			  return $this.getCoordinateString(polyPlacemark.getGeometry().getOuterBoundary().getCoordinates());
	    },

	    getCoordinateString: function(coordsArray) {
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
	    },

	    getSerializedViewPort: function() {
	        var $this = this;
	    	return $this.gex.util.serializeView();
	    },
	    
	    preNewLassoCreateAction:function(param){
	    	//Deactivate Editing
	    	this.changeLassoModeEditMode([false, this.STATE_AFTER_SAVE_NEW]);
	    },
	    
	    /** To do post new lasso Creation action*/
	    postNewLassoCreateAction:function(data){
	    	this.removeLassoFeature(this.lastLassoRegionDrawn);
	    	$si.events.triggerLassoEvent($si.events.LassoEvents.drawSelectLasso, data[0]);
	    	if(this.options.bypassEveryting){
	    		this.changeLassoModeEditMode([false, $this.STATE_AFTER_SAVE_NEW]);
	    		this.options.bypassEveryting = false;
	    	}
	    	// then reactivate edit again. 
	    	this.changeLassoModeEditMode([true, null]);
	    },
	    
	    /** To do post lasso Edit action*/
	    postLassoEditAction: function(data){
	    	// first reset evrerything. 
	    	this.changeLassoModeEditMode([false, this.STATE_AFTER_SAVE_NEW]);
	    	
	    	this.showPoints(data[0].shapeType, false);
	    	// then reactivate edit again. 
	    	this.changeLassoModeEditMode([true, null]);
	    	this.options.isLassoEditToolActive = false;
	    	
	    },
	    
	    addFeature: function(id, coordsStr, featureType, count, serializedViewPort, lassoOpacity){
	    	var $this = this;
	    	var lassoData = {
	    		coordinates 	: coordsStr,
				type			: featureType,
				fillColor		: $this.fillColor,
				lineThickness	: $this.lineThickness,
				viewPort 		: serializedViewPort,
				opacity         : lassoOpacity,
	    	};

	    	
	    	// if the lasso to be saved the get the Id of the saving lasso
	    	if(this.options.isLassoEditToolActive){
	    		var lassoIdSplitArray = id.toString().split(this.LASSO_ID_SEPERATOR);
				if(lassoIdSplitArray.length == 3){
					$si.events.triggerLassoEvent($si.events.LassoEvents.saveNewlyEditedLassoOnDB, {id: lassoIdSplitArray[1], lassoData: lassoData});
				}
	    	}else{
	    		$si.events.triggerLassoEvent($si.events.LassoEvents.saveNewlyCreatedLassoOnDB, {lassoData: lassoData});
	    	}
	    },

		removeHighlightLassoFeature:function() {
		    try {
		    	var $this = this;
		    	var ge = $this.options.gePluginInstance;
		        if ($this.lastHighlightLassoId != null) {
		            ge.getFeatures().removeChild($this.lastHighlightLassoId);
		        }
		    } catch (e) {
		    	$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling removeHighlightLassoFeature');
		    }
		},

		/**Remove the lasso from the GE according to lasso id*/
		removeLassoFeature: function(id) {
			try {
				var $this = this;
				var ge = $this.options.gePluginInstance;
				$this.currentLassoPolyPlacemark = $this.rbFeaturesArray[id];

			    if ($this.centerPm) {
			        ge.getFeatures().removeChild($this.centerPm);
			    }
			    if ($this.circumPm) {
			        ge.getFeatures().removeChild($this.circumPm);
			    }
			    $this.resetLassoFeatures();
			    if ($this.rbFeaturesArray[id]) {
			    	$this.gex.dom.removeObject($this.rbFeaturesArray[id]);
			        ge.getFeatures().removeChild($this.rbFeaturesArray[id]);
			        delete $this.rbFeaturesArray[id];
			        //$this.rbFeaturesArray.remove(id);
			    }
			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling removeLassoFeature');
			}
		},

		removeLassoFromMap:function(lassoId){
			lassoId = this.lookUpForId(lassoId);
			if(lassoId != null){
				this.removeLassoFeature(lassoId);
			}
		},
		
		/**Remove the newly created lasso*/
		removeNewleyCreatedLasso: function(){
			try {
				var $this = this;
				if($this.options.newlyCreatedLassoId != null){
					$this.removeLassoFeature($this.options.newlyCreatedLassoId);
				}

			} catch (e) {
				$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling removeNewleyCreatedLasso');
			}
		},

		showLassoFeature: function(id, viewportStr, flag, measurementSystem, params) {
		    var $this = this;
		    var ge = $this.options.gePluginInstance;
		    //if(id.search(this.LASSO_ID_SEPERATOR) == -1){
		    	id = $this.lookUpForId(id);
		   // }
			if ($this.rbFeaturesArray[id]) {
				$this.rbFeaturesArray[id].setVisibility(flag);
		        // calling this method to calculate the units(miles,feet or KM , Meters) based measurement system
		        $this.calculateMeasurementUnitForLassoCircle(measurementSystem,params);
		        if ($this.radiusValuePlacemark) {
		            ge.getFeatures().removeChild($this.radiusValuePlacemark);
		        }
		    }
//		    if (flag) {
//		        $this.setSerializedViewPort(viewportStr);
//		    }
		},
		
		lookUpForId:function(id){
			var $this = this;
			var keyArray = null;
			var idArray = id.toString().split(this.LASSO_ID_SEPERATOR);
			if(Object.keys($this.rbFeaturesArray).length > 0){
				   for (var key in $this.rbFeaturesArray) {
					   keyArray = key.toString().split(this.LASSO_ID_SEPERATOR);
					   if(keyArray[1] == idArray[1] || keyArray[1] == id){
						   return key;
					   }
				   }
			}

			return 0;
		},

		zoomToLassoOnMap : function(lasso) {
			var lassoData = JSON.parse(lasso.lassoData);
			this.setSerializedViewPort(lassoData.viewPort);
		}, 
		
		resetPreviousLasso:function(){
			if(this.lastSelectedRegion){
				var lastSelectedRegionId = this.lastSelectedRegion.getId();
	        	var lassoIdArray = lastSelectedRegionId.toString().split("##");
	        	this.removeLassoFeature(lastSelectedRegionId);
	        	//$si.events.triggerLassoEvent($si.events.LassoEvents.clearNewlyDrawnLasso, {});
				
	        	$si.mapUtils.showLassoOnMapByLassoDBId(lassoIdArray[1]);
		    	// remove edit mode. 
		    	this.changeLassoModeEditMode([false, this.STATE_AFTER_SAVE_NEW]);
		    	$($si.viewer).trigger("applyLassoFilter", true);
			}
		},
		
		/**Zooming to the particulr viewporat containing the lasso*/
		setSerializedViewPort: function(viewPortStr) {
			$this = this;
		    if (viewPortStr && viewPortStr != '' && viewPortStr != 'undefined') {
		        $this.gex.util.deserializeView(viewPortStr);
		    }
		},

		/** If the Polygon does not exist then create the polygon when the user selects form the lasso list.
		 *  If already exists the just call the showLassoFeature function to show/hide the lasso.
		 */
		createLassoPolygon :function(lassoInfo) {
			var $this 			= this;
		    var ge 				= $this.options.gePluginInstance;
			var id 				= lassoInfo.id;
			var lassoData		= JSON.parse(lassoInfo.lassoData);
			var coordinates 	= lassoData.coordinates; 
			var type 			= lassoData.type;
			var viewPort 		= lassoData.viewPort;
			var fillColor 		= lassoData.fillColor;
			var lineThickness 	= lassoData.lineThickness;
			var opacity 		= lassoData.opacity;
		
			
			id = $si.viewer.LASSO_SHAPES.POLYGON+this.LASSO_ID_SEPERATOR+id;
			if($this.lookUpForId(id) == 0){
				$this.idCount++;
			    var validRegioncolor = $this.validateRGBColor(fillColor);
				var opacityColor = $this.swapColors(fillColor, opacity);
			    var rbPlacemark = $this.gex.dom.addPolygonPlacemark([], {
			        id: id+this.LASSO_ID_SEPERATOR+$this.idCount,
			        style: {
			            poly: {color: opacityColor},
			            line: {
			                width: lineThickness,
			                color: validRegioncolor,
			            }
			        }
			    });

	        	//rbPlacemark.setOpacity(opacity);
			    $this.viewPortArray[rbPlacemark.getId()] = viewPort;
			    $this.rbFeaturesArray[rbPlacemark.getId()] = rbPlacemark;
			    $this.setPolygonCoordinates(rbPlacemark, coordinates);
			    rbPlacemark.setVisibility(true);
			    //$this.setSerializedViewPort(viewPort);
			}else{
				// Temporary Solution until drawer is implemented
				 var params = new Array()
				 var paramArray = $si.mapUtils.getMeasurementParameters();
					params[0] = paramArray[1];
					params[1] = paramArray[2];
				$this.showLassoFeature(id, viewPort, true, paramArray[0], params);
			}
		},
		
		createLassoPolygonRectangle: function(lassoInfo){
			this.createLassoCircle(lassoInfo);
		},

		setPolygonCoordinates: function(polyPlacemark, coordStr) {
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
		    },
				//Testing pending
		    /**This function is called to load already existing circles into the list, this function executes when initializing Lasso regions.*/
		    createLassoCircle: function(lassoInfo) {
		    	
				var id 				= lassoInfo.id;
				var lassoData		= JSON.parse(lassoInfo.lassoData);
				var coordinates 	= lassoData.coordinates; 
				var type 			= lassoData.type;
				var viewPort 		= lassoData.viewPort;
				var fillColor 		= lassoData.fillColor;
				var lineThickness 	= lassoData.lineThickness;
				var opacity 		= lassoData.opacity;
		    	
	    	 	var x1 = null;
		        var y1 = null;
		        var x2 = null;
		        var y2 = null;
		        var centerCoordinates = null;
		        var circumCoordinates = null;
		        var pCcenterCoordinates = null;
		        var pCircumCoordinates = null;
		        var radius = null;
		        var operation = null;
		   
		        
		    	try {
		    		var $this = this;
		    		//var id = 'lassoCircle_'+id;
		    	var ge = $this.options.gePluginInstance;
		    	if(coordinates.split(" ").length==5){
		    		// rectangle
			        var x1 = parseFloat(coordinates[0]);
			        var y1 = parseFloat(coordinates[1]);
			        var x2 = parseFloat(coordinates[2]);
			        var y2 = parseFloat(coordinates[3]);
		    	}else{
		    		
		    	if(pCcenterCoordinates==null){
		    		var coordinatesArray = coordinates.split(" ");
					pCcenterCoordinates = $this.getCircleCenterCoordinates(coordinatesArray[0],coordinatesArray[coordinatesArray.length/2]);
		    	}

		    	if(pCircumCoordinates==null){
		    		var coordinatesArray = coordinates.split(" ");
		    		pCircumCoordinates = $this.getCircleCircumCoordinates(coordinatesArray[coordinatesArray.length/4]);
		    	}

			        centerCoordinates = pCcenterCoordinates.split(",");
			        circumCoordinates = pCircumCoordinates.split(",");

			         x1 = parseFloat(centerCoordinates[0]);
			         y1 = parseFloat(centerCoordinates[1]);
			         x2 = parseFloat(circumCoordinates[0]);
			         y2 = parseFloat(circumCoordinates[1]);
		    	}
		    	id = type+this.LASSO_ID_SEPERATOR+id;
		        if (operation != null && operation == "RADIUS_CHANGED") {
		            // if user has changed the radius through the text input
		            $this.lastSelectedRegion = $this.rbFeaturesArray[id];
		            if (coordinates == null) {
		            	$this.createNewCircle(radius, x1, y1,null,null, '', fillColor, lineThickness, opacity, type);
		            } else {
		            	$this.createNewCircleWithCoords(coordinates, x1, y1, id, fillColor, lineThickness, opacity, type);
		            }

		            var geometry = $this.currentLassoPolyPlacemark.getGeometry();

		            if ($this.rbFeaturesArray[id]) {
		            	$this.rbFeaturesArray[id].setGeometry($this.currentLassoPolyPlacemark.getGeometry());
		            	$this.rbFeaturesArray[id].setVisibility(true);
		            	// for creation part these below listners are not required. Will implement it later.
		            	//google.earth.addEventListener($this.rbFeaturesArray[id], 'mouseover', $this.circleRegionMouseOverHandler);
		                //google.earth.addEventListener($this.rbFeaturesArray[id], 'mouseout', $this.circleRegionMouseOutHandler);
		            }

		            $this.lastSelectedRegion.setGeometry(geometry);
		            var rubberBand = new $this.RubberBand(id, $this.getPolygonCoordinates($this.lastSelectedRegion), $this.viewPortArray[id]);
		            $this.afterEditRubberbandRegionsArray[id] = rubberBand;

		            ge.getFeatures().removeChild(currentLassoPolyPlacemark);

		        } else if($this.lookUpForId(id) == 0) {
		            radius = $this.haversineDistance(x1, x2, y1, y2);
		            
		            //If coord str is null, creates new circle
		            if (coordinates == null) {
		            	$this.createNewCircle(radius, x1, y1, null,null,'', fillColor, lineThickness, opacity, type);
		            } else {
		            	$this.createNewCircleWithCoords(coordinates, x1, y1, id, fillColor, lineThickness, opacity, type);
		            }
		            // loac the circle Lasso to the list
		            $this.viewPortArray[$this.currentLassoPolyPlacemark.getId()] = viewPort;
		            $this.currentLassoPolyPlacemark.setVisibility(true);
		            $this.rbFeaturesArray[$this.currentLassoPolyPlacemark.getId()] = $this.currentLassoPolyPlacemark;
		            // for creation part these below listners are not required. Will implement it later.
		            //google.earth.addEventListener($this.rbFeaturesArray[currentLassoPolyPlacemark.getId()], 'mouseover', $this.circleRegionMouseOverHandler);
		            //google.earth.addEventListener($this.rbFeaturesArray[currentLassoPolyPlacemark.getId()], 'mouseout', $this.circleRegionMouseOutHandler);
		            //$this.setSerializedViewPort(viewPort);
		        }else{
		        	var params = new Array();
		            var paramArray = $si.mapUtils.getMeasurementParameters();
						params[0] = paramArray[1];
						params[1] = paramArray[2];
		        	$this.showLassoFeature(id, viewPort, true, paramArray[0], params);
		        }
		        $this.currentLassoPolyPlacemark = null;
				} catch (e) {
					$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling createLassoCircle');
				}
		    },

		    getCircleCenterCoordinates: function(firstCoordinate, secondCoordinate) {
		        var firstCoordinateArray = firstCoordinate.split(",");
		        var secondCoordinateArray = secondCoordinate.split(",");
		        var paramCenterLatitude = ((parseFloat(firstCoordinateArray[0])) / 2 + (parseFloat(secondCoordinateArray[0])) / 2);
		        var paramCenterLongitude = ((parseFloat(firstCoordinateArray[1])) / 2 + (parseFloat(secondCoordinateArray[1])) / 2);
		        return paramCenterLongitude + "," + paramCenterLatitude;
		    },

		    getCircleCircumCoordinates: function(coordinate) {
		        var coordinateArray = coordinate.split(",");
		        return coordinateArray[1] + "," + coordinateArray[0];
		    },

		  //loads circle if the coords are already present.
		    createNewCircleWithCoords: function(coords, latitude, longitude, predefinedId, regionColor, lineThickness, opacity,shape) {
		    	try {
		    		var $this = this;
			    	var validRegioncolor = $this.validateRGBColor(regionColor);
			        var opacityColorCode = $this.swapColors(validRegioncolor, opacity);
			        var targetId = '';
			        var ge = $this.options.gePluginInstance;
			        $this.idCount++;
			        if (predefinedId == '') {
			            targetId = shape+this.LASSO_ID_SEPERATOR+$this.idCount;
			        } else {
			            targetId = predefinedId+this.LASSO_ID_SEPERATOR+$this.idCount;
			        }
			        $this.lastLassoRegionDrawn = targetId;
			        $this.currentLassoPolyPlacemark = $this.gex.dom.addPolygonPlacemark([], {
			            id: targetId,
			            style: {
			                poly: opacityColorCode,
			                line: {
			                    width: lineThickness,
			                    color: validRegioncolor
			                }
			            }
			        });
			        $this.setPolygonCoordinates($this.currentLassoPolyPlacemark, coords);
			        ge.getFeatures().appendChild($this.currentLassoPolyPlacemark);
			        //registers the Listener for Circle placemark
			        $this.registerPMListener();
				} catch (e) {
					$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling createNewCircleWithCoords');
				}
		    },


			initializeRubberBandMouseListeners: function(flag) {
				try {
				var $this = this;
				var ge = $this.options.gePluginInstance;
					if (flag) {
				        google.earth.addEventListener(ge.getWindow(), 'mouseup', $this.rubberbandMouseUpListener.bind($this));
				    } else {
				        google.earth.removeEventListener(ge.getWindow(), 'mouseup', $this.rubberbandMouseUpListener.bind($this));
				    }

				} catch (e) {
					$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling initializeRubberBandMouseListeners');
				}
			},

			rubberbandMouseUpListener:function(kmlEvent){
			try {
				var $this = this;
				var ge = $this.options.gePluginInstance;
				var lassoId = -1;
				var lassoIdSplitArray = null;
				var selectedRubberBandPlacemark = null;
				if (!$this.isRubberBandEditMode()) {
					kmlEvent.preventDefault();
					return;
			    }
				
				if($si.viewer.isLassoCreate && !$this.options.bypassEveryting){
					kmlEvent.preventDefault();
					return;
				}
				
				$this.removeHighlightLassoFeature();
			    var target = kmlEvent.getTarget();
			    if (!$this.options.bypassEveryting){
			    if ($this.rbFeaturesArray[target.getId()] == null) {
			        kmlEvent.preventDefault();
			        return;
			    }else {
			    	lassoIdSplitArray = target.getId().toString().split($.spacetimeinsight.siViewerBaseLassoListener.LASSO_ID_SEPERATOR);
			    	
			    	if(lassoIdSplitArray.length == 3){
			    		
			    		lassoId = lassoIdSplitArray[1];
			    		if(!$this.isTheCurrentUserOwnerOfLasso(lassoId)){
			    			kmlEvent.preventDefault();

			    			//$this.showErrorMessage($si.i18N.Map.lassomessages.nottheowneroflassocantedit , $si.i18N.Map.lassomessages.googleearth);
					        return;
			    		}
			    	}else{
			    		$si.Logger('Lasso').error('The Lasso ID: '+target.getId()+' genertated is incorrect');
			    		 kmlEvent.preventDefault();
			    		return;
			    	}
			    }

			    // If The circle is getting dragged in edit mode and yet nt saved or cancelled then do nothing and return back
			    if ($this.centreDraggedFlag || $this.circumferenceDraggedFlag) {
			    	 kmlEvent.preventDefault();
			        return;
			    }
			    
			    }
			    // Dont know the exact reason why the exception is coming for "kmlEvent.getTarget().getGeometry().getType()" sometimes but have put a return for now
			    try {
			    	kmlEvent.getTarget().getGeometry();
				} catch (e) {
					kmlEvent.preventDefault();
					$this.options.isLassoEditToolActive = false;
					return;					
				}
			
			    var targetType = kmlEvent.getTarget().getGeometry().getType();
			  
			    if (targetType == 'KmlPolygon') {
	
			    	selectedRubberBandPlacemark = kmlEvent.getTarget();
			        if ($this.lastSelectedRegion != null && selectedRubberBandPlacemark != null) {
			            if ($this.lastSelectedRegion.getId() != selectedRubberBandPlacemark.getId()) {
			            	var e = {
									message: "",
							};
							$this._createErrorNotification(e, $si.i18N.Map.lassomessages.updatecancelcurrentregionediting);
							 kmlEvent.preventDefault();
			            	//$this.showErrorMessage($si.i18N.Map.lassomessages.updatecancelcurrentregionediting, $si.i18N.Map.lassomessages.googleearth);
			                return;
			            }
			        }else if(($this.options.bypassEveryting) && ($this.currentLassoPolyPlacemark != null && selectedRubberBandPlacemark != null) && ($this.currentLassoPolyPlacemark.getId() != selectedRubberBandPlacemark.getId())){
			        	
			        	var e = {
								message: "",
						};
						$this._createErrorNotification(e, $si.i18N.Map.lassomessages.polylassocreationerror);
						 kmlEvent.preventDefault();
		            	//$this.showErrorMessage($si.i18N.Map.lassomessages.updatecancelcurrentregionediting, $si.i18N.Map.lassomessages.googleearth);
		                return;
			        }
			    }

			    if ($this.lastSelectedRegion == null) {
			    	$this.lastSelectedRegion = selectedRubberBandPlacemark;
			    	
			    	// This is bypass evreything and support th edit of newly created polygon lasso.
			    	if (!$this.options.bypassEveryting){
				    	$($si.viewer).trigger("activateButtons");
				    	$($si.viewer).trigger("deactivateClearButton");
				    	this.options.isLassoEditToolActive = true;
				    	// To deactivate lasso dropdown list and manage Lasso.
				    	this.changeButtonsStateOnLassoEdit(false);
				        var selectedId = selectedRubberBandPlacemark.getId();
				        var backuprubberBand = new $this.RubberBand(selectedId, $this.getPolygonCoordinates(selectedRubberBandPlacemark), $this.viewPortArray[selectedId]);
				        var rubberBand = new $this.RubberBand(selectedId, $this.getPolygonCoordinates(selectedRubberBandPlacemark), $this.viewPortArray[selectedId]);
	
				        $this.beforeEditRubberbandRegionsArray[selectedId] = backuprubberBand;
				        $this.afterEditRubberbandRegionsArray[selectedId] = rubberBand;
				        //$this.currentLassoPolyPlacemark = selectedRubberBandPlacemark;
				        $this.resetRubberBandFeatures();
			    	}
			    	
			        $this.currentLassoPolyPlacemark = kmlEvent.getTarget();
			        var id = $this.currentLassoPolyPlacemark.getId();
			       
			        var optionsObj = new Object();

			        optionsObj.editCallback = function(){
			        	if ($this.currentLassoPolyPlacemark) {
			        		// This is bypass evreything and support th edit of newly created polygon lasso.
			        		if (!$this.options.bypassEveryting){
				                var rubberBand = $this.afterEditRubberbandRegionsArray[$this.currentLassoPolyPlacemark.getId()];
				                rubberBand.coordinates = $this.getPolygonCoordinates($this.currentLassoPolyPlacemark);
				                rubberBand.viewPort = $this.getSerializedViewPort();
				                $this.afterEditRubberbandRegionsArray[$this.currentLassoPolyPlacemark.getId()] = rubberBand;
			        		 }
			        		$($si.viewer).trigger("applyLassoFilter", true);
			            }
			        
			        	
			        };
			        if($this.options.bypassEveryting){
			            $this.gex.edit.editLineString($this.currentLassoPolyPlacemark.getGeometry().getOuterBoundary(), optionsObj);
			        }else if (lassoIdSplitArray[0] == $si.viewer.LASSO_SHAPES.POLYGON) {
			        	$this.options.currentLassoTypeId = $si.viewer.LASSO_SHAPES.POLYGON;
			            $this.gex.edit.editLineString($this.currentLassoPolyPlacemark.getGeometry().getOuterBoundary(), optionsObj);
			        } else  if (lassoIdSplitArray[0] == $si.viewer.LASSO_SHAPES.CIRCLE) {
			        	$this.options.currentLassoTypeId = lassoIdSplitArray[0];
						// This else block will execute if the selected region is circle.
			            // hide the mouseover Icon in edit mode
			            if ($this.radiusValuePlacemark) {
			            	$this.radiusValuePlacemark.setVisibility(false);
			                //google.earth.removeEventListener(kmlEvent.getTarget(), 'mouseover', circleRegionMouseOverHandler);
			                //google.earth.removeEventListener(kmlEvent.getTarget(), 'mouseout', circleRegionMouseOutHandler);
			            	$this.radiusValuePlacemark = null;
			            }
			            var pCircleCoordinates = $this.getPolygonCoordinates(kmlEvent.getTarget());
			            var allCoords = pCircleCoordinates.toString().split(" ");
			            var numCoords = allCoords.length;
			            var centerCoordinates = $this.getCircleCenterCoordinates(allCoords[0], allCoords[16]);
			            var centerCords = centerCoordinates.toString().split(",");
			            var circumCoordinates = $this.getCircleCircumCoordinates(allCoords[8]);
			            var circumCords = circumCoordinates.toString().split(",");
			            $this.radius = $this.getRadiusParameterised(parseFloat(centerCords[0]), parseFloat(circumCords[0]), parseFloat(centerCords[1]), parseFloat(circumCords[1]));
			            $this.centerPm = $this.createPointPlacemark(parseFloat(centerCords[0]), parseFloat(centerCords[1]), '');
			            $this.circumPm = $this.createPointPlacemark(parseFloat(circumCords[0]), parseFloat(circumCords[1]), '');

			            // registers the event listeners for center and circumference
			            $this.registerCenterEditDraggableObject($this.centerPm, $this.circumPm);
			            $this.registerCircumEditDraggableObject($this.circumPm, $this.centerPm);
			        }else  if (lassoIdSplitArray[0] == $si.viewer.LASSO_SHAPES.RECTANGLE) {
			        	$this.options.currentLassoTypeId = lassoIdSplitArray[0];
			        	// This else block will execute if the selected region is Rectangle.			        	
						$this.redrawPoints($si.viewer.LASSO_SHAPES.RECTANGLE,$this.getPolygonCoordinates($this.currentLassoPolyPlacemark));							
			        }
			        //parent.setCurrentSelectedRegion(currentLassoPolyPlacemark.getId());
			    }
				} catch (e) {
					$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling rubberbandMouseUpListener');
				}

			},

			RubberBand: function(featureId, coordinates, viewport) {
			    var $this = this;
				$this.tagName = "rubberbandregion"
			    $this.coordinates = coordinates;
			    $this.featureId = featureId;
			    $this.viewPort = viewport;
			    $this.newId = -1;
			    $this.ecoexpmlIds = "";
			    $this.refreshInterval = "";
			    $this.print = function () {
			        return "<" + $this.tagName + " ecoexpmlIds='" + $this.ecoexpmlIds + "' refreshInterval='" + $this.refreshInterval + "' featureId='" + $this.featureId + "' coordinates='" + $this.coordinates + "' viewPort='" + $this.viewPort + "' newId='" + $this.newId + "'/>";
			    }
			},

			/**function to place the center placemark , also add event listeners for drag and drop for the palcemark*/
			registerCenterEditDraggableObject : function(targetObj, referObj) {
				var $this = this;
				$this.gex.edit.makeDraggable(targetObj, {
					dropCallback: function () {
						$this.circleCenterPMDropCallBackEvent(targetObj, referObj);
					},
					dragCallback: function () {
						$this.circleCenterPMDragCallBackEvent(targetObj);
					}
				});
			},

			/**CallBack Method to be triggered when circle center dragging stops.*/
			 circleCenterPMDropCallBackEvent: function(targetObj, referObj) {
				 try {
					 var $this = this;

					 $this.setPolygonPlacemarkCoords(targetObj.getGeometry().getLatitude(), targetObj.getGeometry().getLongitude(), $this.radius);
					 var coords = $this.lastSelectedRegion.getGeometry().getOuterBoundary().getCoordinates();

					 referObj.getGeometry().setLatitude(coords.get(8).getLatitude());
					 referObj.getGeometry().setLongitude(coords.get(8).getLongitude());
					 $this.rubberbandPolygonUpdated();
					 $this.centreDraggedFlag = false;
				} catch (e) {
					$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling circleCenterPMDropCallBackEvent');
				}

			},

			/**function to repalce the Polygon placemarks coordinates when dragging..*/
			setPolygonPlacemarkCoords: function(centerLat, centerLng, radius) {
				try {
					var $this = this;
					var ge = $this.options.gePluginInstance;
					$this.lastSelectedRegion.getGeometry().setOuterBoundary($this.makeCircle(radius, centerLat, centerLng));
				    ge.getFeatures().appendChild($this.lastSelectedRegion);
				} catch (e) {
					$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling setPolygonPlacemarkCoords');
				}
			},

			/**CallBack Method to be triggered for saving the updated regions back to server.*/
			rubberbandPolygonUpdated: function() {
				try {
					var $this = this;
					if ($this.currentLassoPolyPlacemark) {
		                var rubberBand = $this.afterEditRubberbandRegionsArray[$this.currentLassoPolyPlacemark.getId()];
		                rubberBand.coordinates = $this.getPolygonCoordinates($this.currentLassoPolyPlacemark);
		                rubberBand.viewPort = $this.getSerializedViewPort();
		                $this.afterEditRubberbandRegionsArray[$this.currentLassoPolyPlacemark.getId()] = rubberBand;
		            	$($si.viewer).trigger("applyLassoFilter", true);
		            }
				} catch (e) {
					$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling rubberbandPolygonUpdated');
				}
			},

			/**Function to create the point placemarks on the circle*/
			createPointPlacemark :function(latitude, longitude, pointName) {
				var $this = this;
				var pm = $this.gex.dom.addPointPlacemark([latitude, longitude], {
						id: pointName,
						icon: $this.circleCenterDragPlacemarkUrl
					});
				pm.setVisibility(true);
				return pm;
			},

			/**CallBack Method to be triggered when circle center dragging starts.*/
			circleCenterPMDragCallBackEvent: function(targetObj) {
				var $this = this;
				$this.centreDraggedFlag = true;
			},

			/**Function to place the circumference placemark by calculating radius and make it draggable. Also add event listeners for drag and drop for the palcemark*/
			registerCircumEditDraggableObject: function(targetObj, referObj) {
				try {
					var $this = this;
					$this.gex.edit.makeDraggable(targetObj, {
				        dropCallback: function () {
				            $this.radius = $this.getRadiusParameterised(referObj.getGeometry().getLatitude(), targetObj.getGeometry().getLatitude(), referObj.getGeometry().getLongitude(), targetObj.getGeometry().getLongitude())
				            $this.circleCircumPMDropCallBackEvent(referObj, $this.radius);
				        },
				        dragCallback: function () {
				            $this.circleCircumPMDragCallBackEvent(targetObj);
				        }
				    });
				} catch (e) {
					$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling registerCircumEditDraggableObject');
				}
			},


			/*Event Handler to update the circumference label while dragging.*/
			circumPMMoveHandler: function(kmlEvent) {
					try {
						var $this = this;
						var radius = $this.getRadiusParameterised($this.centerPm.getGeometry().getLatitude(), kmlEvent.getLatitude(), $this.centerPm.getGeometry().getLongitude(), kmlEvent.getLongitude());
						var roundedRadius = $this.imperialOrMetric(radius);
						//parent.updateRadius(roundedRadius);
						//if it is very small convert to smaller unit km becomes meters
						if (radius < 0.10) {
							$this.roundedRadiusSmallUnit = $this.imperialOrMetricSmallUnit(radius);
							kmlEvent.getTarget().setName($this.roundedRadiusSmallUnit + " " + $this.measurement);
						} else {
							// TODO: have to implement the Unit drawer pref is implemented, doing hard codaing for now
							var paramArray = $si.mapUtils.getMeasurementParameters();
							kmlEvent.getTarget().setName(roundedRadius + " " + paramArray[1]);
						}
					} catch (e) {
						$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling circumPMMoveHandler');
					}
			},

			/*CallBack Method to be triggered when circumference Placemark dragging starts.*/
			circleCircumPMDragCallBackEvent: function(targetObj) {
				var $this = this;
				$this.circumferenceDraggedFlag = true;
				if($this.dragFlag){
					$this.dragFlag = false;
					google.earth.addEventListener($this.circumPm, 'mousemove', $this.circumPMMoveHandler.bind($this));
				}
			},

			/*CallBack Method to be triggered when circumference Placemark dragging stops.*/
			circleCircumPMDropCallBackEvent: function(centerObj, radius) {
				try {
					var $this = this;
				    $this.setPolygonPlacemarkCoords(centerObj.getGeometry().getLatitude(), centerObj.getGeometry().getLongitude(), radius);
				    $this.rubberbandPolygonUpdated();
				    $this.circumferenceDraggedFlag = false;
				    $this.dragFlag = true;
				    google.earth.removeEventListener($this.circumPm, 'mousemove', $this.circumPMMoveHandler.bind($this));
				} catch (e) {
					$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling circleCircumPMDropCallBackEvent');
				}

			},

			/** Activates the listener*/
			activateListener: function(listenerType, eventType) {
				try {
					var $this = this;
					 var ge = $this.options.gePluginInstance;
				     $this.resetMarkerFeatures();
				     var listener =  $this.getListener(listenerType);

				     if(listener) {
				         google.earth.addEventListener(ge.getGlobe(), eventType, listener);
				     }
				     $this.currentListenerType = listenerType;
				} catch (e) {
					$si.Logger('googleEarth').error('Error ['+e.message+'] occurred while calling activateListener');
				}
			},

			deActivateListener: function(listenerType, eventType) {
				try {
					var $this = this;
					var ge = $this.options.gePluginInstance;
				    var listener =  $this.getListener(listenerType);
				    var isFireEvent = false;

				    if(listenerType == $this.LISTENER_TYPE_MARKER_PLACEMARK) {
				        isFireEvent = true;
				    }

				    if(listener) {
				       google.earth.removeEventListener(ge.getGlobe(), eventType, listener);
				    }
				    $this.currentListenerType = null;
				} catch (e) {
					$si.Logger('googleEarth').error('Error ['+e.message+'] occurred while calling deActivateListener');
				}
			 },

			 resetMarkerFeatures: function() {
				try {
					 var $this = this;
					 if($this.currentLineStringPlacemark) {
						 	$this.gex.edit.endEditLineString($this.currentLineStringPlacemark.getGeometry());
						 	$this.currentLineStringPlacemark = null;
				        }

				        if($this.currentPolyPlacemark) {
				        	$this.gex.edit.endEditLineString($this.currentPolyPlacemark.getGeometry().getOuterBoundary());
				        	$this.currentPolyPlacemark = null;
				        }
					} catch (e) {
						$si.Logger('googleEarth').error('Error ['+e.message+'] occurred while calling resetMarkerFeatures');
					}
			    },

			    getListener: function(listenerType) {
			    	try {
			    		var $this = this;
				        if(listenerType == $this.LISTENER_TYPE_MARKER_PLACEMARK) {

				        	$this.markerPlacemarkClickListener = function (event){
				        		 try{
				        	            if(!$this.isMarkerEditMode()) {
				        	                return;
				        	            }
				        	            event.preventDefault();
				        	            if($this.currentListenerType) {
				        	            	$this.idCount++;

				        	                var pm = $this.gex.dom.addPointPlacemark([event.getLatitude(), event.getLongitude()], {
				        	                  id: $this.MM_FEATURE+idCount,
				        	                  icon: {
				        	                    stockIcon: 'paddle/blu-circle',
				        	                    hotSpot: { left: '50%', bottom: 0 }
				        	                  }
				        	                });

				        	                $this.addFeature(pm.getId(), event.getLongitude()+","+event.getLatitude()+",0.0", "placemark",'');
				        	                $this.selectedMarkerPlacemark = pm;
				        	                //dragPlacemark(pm);
				        	            }
				        	        } catch (e) {
				        	        	$si.Logger('googleEarth').error('Error ['+e.message+'] occurred while calling markerPlacemarkClickListener');
				        	        }
				        	        $this.deActivateListener($this.LISTENER_TYPE_MARKER_PLACEMARK, 'click');

				        	};
				            return $this.markerPlacemarkClickListener;
				        } else if(listenerType == $this.LISTENER_TYPE_DEFAULT_CLICK) {
				        	/**
				        	 * mouse up event handler, Triggers an event when the user releases the mouse button over a location in Google Earth.
				        	  *call pre event and it returns true or false.. in case true implement the logic
				        	 */
//				        	$this.geMouseUpEvent = function(event){
//
//				        		if($this.preGEMouseUpEvent(event)){
//				        			$this.geMouseUpEventHandeller(event);
//				        		}else{
//				        			event.stopPropagation();
//				        			event.preventDefault();
//				        		}
//				        		  $this.postGEMouseUpEvent(event);
//				        	};
				        	return $this.geMouseUpEventHandeller;
				        }
					} catch (e) {
						$si.Logger('googleEarth').error('Error ['+e.message+'] occurred while calling getListener');
					}
			    },

			    isMarkerEditMode:function() {
			    	var $this = this;
			        return $this.markerMode == $this.MARKER_MODE_EDIT;
			    },

			    /* -----------------------directions & route ends ----------*/
			    hideBalloon: function() {
			    	var $this = this;
			    	$this.options.gePluginInstance.setBalloon(null);
			    },

			    updateLassoAppearance: function(){
			    	this.updateColorOnRegion();
			    },
			    
			    updateColorOnRegion:function() {
			    	try {
			    		var $this = this;
						var ge = $this.options.gePluginInstance;
				        var validRegioncolor = $this.validateRGBColor($this.fillColor);
				        var polygonPlacemark = null;
				        //fillColor = validRegioncolor;
				        var opacityColorCode = $this.swapColors($this.fillColor, $this.opacity);
				        if ($this.currentLassoPolyPlacemark != null) {
				        	polygonPlacemark = $this.currentLassoPolyPlacemark;
				        }else if($this.lastSelectedRegion != null){
				        	polygonPlacemark = $this.lastSelectedRegion;
				        }else{
				        	return;
				        }
//				        var length = ge.getFeatures().getChildNodes().getLength();
//				        for (var i = 0; i < length; i++) {
//				            var polygonPlacemark = ge.getFeatures().getChildNodes().item(i);
//				            if (polygonPlacemark.getId() == featureId) {
				                $this.idCount++;
				                var rbPolyPlacemark = $this.gex.dom.addPolygonPlacemark([], {
				                    //id: 'lasso_' + $this.idCount,
				                    style: {
				                        poly: {color: opacityColorCode},
				                        line: {
				                            width: $this.lineThickness,
				                            color: $this.fillColor
				                        }
				                    }
				                });
				               
				                var lassoOpacity = null;

							    if($this.opacity > 1){
							    	lassoOpacity = ($this.opacity/100);
							    }else{
							    	lassoOpacity = $this.opacity;
							    }

					        	//polygonPlacemark.setOpacity(lassoOpacity);
				                polygonPlacemark.setStyleSelector(rbPolyPlacemark.getStyleSelector());
				                ge.getFeatures().removeChild(rbPolyPlacemark);
				            //    break;
				            //}
				        //}
					} catch (e) {
						$si.Logger('googleEarth').error('Error ['+e.message+'] occurred while calling updateColorOnRegion');
					}
			    },

			    /**Get the information of all the lassos that are cueently visible on Map */
			    getActiveLassos : function() {
				var lassoArray = [];
				var polygonPlacemark = null;
				var lassoIdArray = null;
				var lassoId = null;
				
			    	if(this.currentLassoPolyPlacemark!= null){
			    		polygonPlacemark = this.currentLassoPolyPlacemark;	
			    	}else if(this.lastSelectedRegion != null){
			    		polygonPlacemark = this.lastSelectedRegion;	
			    	}
			    	
			    	if(polygonPlacemark != null){
			    		
			    		lassoIdArray = polygonPlacemark.getId().toString().split(this.LASSO_ID_SEPERATOR);
			    		
			    		if(lassoIdArray.length == 3){
			    			lassoId =  lassoIdArray[1];
			    		}else{
			    			lassoId = polygonPlacemark.getId();
			    		}
			    		var lasso = {
			        			name      : lassoId,
			        			lassoData : JSON.stringify({coordinates : this.getPolygonCoordinates(polygonPlacemark)})
			           		}
				    	
			           lassoArray.push(lasso);
			    	}
			    	
			    	return lassoArray;
				},
				
			    clearAllLassos: function(){
			    	var $this =  this;
			    	$this.removeHighlightLassoFeature();
			    	var lassoCloneArray = $this.rbFeaturesArray;
			    	for(var key in lassoCloneArray){
			    		$this.removeLassoFeature(key);
			    	}

			    	$this.gex.dom.clearFeatures();
			    	$this.viewPortArray = [];
			    	lassoCloneArray = {};
			    },
			    
			    clearNewDrawLasso: function(){
			    	var ge = this.options.gePluginInstance;
			    	this.createNewCircleFlag = false;
			    	this.createNewRectangleFlag = false;
			    	$si.viewer.isLassoCreate = false;
			    	if(this.currentLassoPolyPlacemark != null){
				    	if (this.center) {
			                ge.getFeatures().removeChild(this.center);
			            }
			            if (this.circumference) {
			                ge.getFeatures().removeChild(this.circumference);
			            }
				    	this.gex.dom.removeObject(this.currentLassoPolyPlacemark);
				    	ge.getFeatures().removeChild(this.currentLassoPolyPlacemark);
			    	}
			    	this.resetLassoFeatures();
			    	var paramArray = [true, null];
			    	this.changeLassoModeEditMode(paramArray);
			    	
			    },
			    
			    /*
		        on double click of the regions, its ends from editing mode of that particular region.
		*/
		resetRubberBandFeatures:function() {
			try {
				var ge = this.options.gePluginInstance;
				 if (this.currentLassoPolyPlacemark) {
				        this.gex.edit.endEditLineString(this.currentLassoPolyPlacemark.getGeometry().getOuterBoundary());
				    }
				 
					if (this.centerPm) {
				        ge.getFeatures().removeChild(this.centerPm);
				    }
				    if (this.circumPm) {
				        ge.getFeatures().removeChild(this.circumPm);
				    }
				    
			} catch (e) {
				$si.Logger('googleEarth').error('Error ['+e.message+'] occurred while calling resetRubberBandFeatures');
			}

		},

		createRectangleRing:function(sX, sY, eX,eY,coordArray) {
			try {
				 var $this = this;
				 var ge = $this.options.gePluginInstance;
				 var ring = ge.createLinearRing('');
				 var coords = ring.getCoordinates();
				 var latlonArray=null;
				 if(coordArray!=null && coordArray.length==5){
					 //draw rectangle from array
					 for(var i = 0; i < coordArray.length; i++) {
			               latlonArray = coordArray[i].split(",");
			            // var $this = this;
			              // kmlCoordArray.pushLatLngAlt(parseFloat(latlonArray[1]), parseFloat(latlonArray[0]), parseFloat(latlonArray[2]));
			               $this.addToLineString(coords, parseFloat(latlonArray[1]), parseFloat(latlonArray[0]), 0, 0);
			            }
				 }else{

					 $this.addToLineString(coords, sX, sY, 0, 0); // top left
					 $this.addToLineString(coords, sX, eY, 0, 0); // top right
					 $this.addToLineString(coords, eX, eY, 0, 0); // bottom right
					 $this.addToLineString(coords, eX, sY, 0, 0); // bottom left
					 $this.addToLineString(coords, sX, sY, 0, 0); // top left

				 }


				 return ring;
			} catch (e) {
				$si.Logger('googleEarth').error('Error ['+e.message+'] occurred while calling createRectangleRing');
			}
			 return null;
		},

		//Appends the new co-ordinates to the list of lines for the box
		addToLineString:function(coords, lat, lng, latOffset, lngOffset) {
			coords. pushLatLngAlt(lat + latOffset, lng + lngOffset, 0);
		},

	    redrawRectangle: function(targetObj){
		try {
		    	var $this = this;
				var ge = $this.options.gePluginInstance;
				var sX;
				var sY;
				var eX;
				var eY;
				var cX;
				var cY;
				var length;
				var breadth;

				var TOP_lEFT=parseInt(0);
				var TOP_RIGHT=parseInt(1);
				var BOTTOM_RIGHT=parseInt(2);
				var BOTTOM_LEFT=parseInt(3);
				var CLOSE_POINT=parseInt(4);


				var LATITUDE_IDX=parseInt(0);
				var LONGITUDE_IDX=parseInt(1);

		    	var coordString = $this.getPolygonCoordinates($this.currentLassoPolyPlacemark);
                var arr = coordString.split(" ");
                
				if(targetObj.getId()==$this.RECTANGLE_TOP){// For top Move

					sX = targetObj.getGeometry().getLatitude();

					// Change the row of Top Left
	    			var latlonArray = arr[TOP_lEFT].split(",");
	    			sY= latlonArray[LATITUDE_IDX];
	    			arr[TOP_lEFT] =sY+"," + sX +",0.0";

	    			// Change the row of Top right
	    			latlonArray = arr[TOP_RIGHT].split(",");
	    			eY= latlonArray[LATITUDE_IDX];
	    			arr[TOP_RIGHT] =eY+"," + sX +",0.0";

	    			arr[CLOSE_POINT]= arr[TOP_lEFT];
	    			$this.currentLassoPolyPlacemark.getGeometry().setOuterBoundary($this.createRectangleRing(null,null,null,null,arr));

				}else if(targetObj.getId()==$this.RECTANGLE_BOTTOM){// For Bottom Move
					eX = targetObj.getGeometry().getLatitude();

					// Change the row of Bottom Right
	    			var latlonArray = arr[BOTTOM_RIGHT].split(",");
	    			eY= latlonArray[LATITUDE_IDX];
	    			arr[BOTTOM_RIGHT] =eY+"," + eX +",0.0";

	    			// Change the row of Bottom Left
	    			latlonArray = arr[BOTTOM_LEFT].split(",");
	    			sY= latlonArray[LATITUDE_IDX];
	    			arr[BOTTOM_LEFT] =sY+"," + eX +",0.0";

	    			arr[CLOSE_POINT]= arr[TOP_lEFT];
	    			$this.currentLassoPolyPlacemark.getGeometry().setOuterBoundary($this.createRectangleRing(null,null,null,null,arr));

				}else if(targetObj.getId()==$this.RECTANGLE_LEFT){// For Left Move
					sY = targetObj.getGeometry().getLongitude();

					// Change the column of Top Left
	    			var latlonArray = arr[TOP_lEFT].split(",");
	    			sX= latlonArray[LONGITUDE_IDX];
	    			arr[TOP_lEFT] =sY+"," + sX +",0.0";

	    			// Change the Column of Bottom Left
	    			latlonArray = arr[BOTTOM_LEFT].split(",");
	    			eX= latlonArray[LONGITUDE_IDX];
	    			arr[BOTTOM_LEFT] =sY+"," + eX +",0.0";

	    			arr[CLOSE_POINT]= arr[TOP_lEFT];
	    			$this.currentLassoPolyPlacemark.getGeometry().setOuterBoundary($this.createRectangleRing(null,null,null,null,arr));

				}else if(targetObj.getId()==$this.RECTANGLE_RIGHT){// For Right Move
					eY = targetObj.getGeometry().getLongitude();

					// Change the column of Top Right
	    			var latlonArray = arr[TOP_RIGHT].split(",");
	    			sX= latlonArray[LONGITUDE_IDX];
	    			arr[TOP_RIGHT] =eY+"," + sX +",0.0";

	    			// Change the Column of Bottom Right
	    			latlonArray = arr[BOTTOM_RIGHT].split(",");
	    			eX= latlonArray[LONGITUDE_IDX];
	    			arr[BOTTOM_RIGHT] =eY+"," + eX +",0.0";

	    			arr[CLOSE_POINT]= arr[TOP_lEFT];
	    			$this.currentLassoPolyPlacemark.getGeometry().setOuterBoundary($this.createRectangleRing(null,null,null,null,arr));
				}else if(targetObj.getId()==$this.RECTANGLE_CENTRE){
					// For Centre Move

					// retain the old sX
					var latlonArray = arr[TOP_lEFT].split(",")
					sX = latlonArray[LONGITUDE_IDX];

					// retain the old sY
					sY = latlonArray[LATITUDE_IDX];

					// retain the old eX
					latlonArray = arr[BOTTOM_RIGHT].split(",")
					eX = latlonArray[LONGITUDE_IDX];

					// retain the old eY
					eY = latlonArray[LATITUDE_IDX];

					length = eX-sX;
					breadth = eY-sY;

					// Fetch the new centre point
					cX = targetObj.getGeometry().getLatitude();
					cY = targetObj.getGeometry().getLongitude();

					// Calculate the new sX & sY
					sX = cX - length/2;
					sY = cY - breadth/2;

					// Calculate the new eX & eY
					eX = cX + length/2;
					eY = cY + breadth/2;

					$this.currentLassoPolyPlacemark.getGeometry().setOuterBoundary($this.createRectangleRing(sX,sY,eX,eY,null));

				}
				
				$this.redrawPoints($si.viewer.LASSO_SHAPES.RECTANGLE,$this.getPolygonCoordinates($this.currentLassoPolyPlacemark));
				
			} catch (e) {
				$si.Logger('googleEarth').error('Error ['+e.message+'] occurred while calling redrawRectangle');
			}
	    },
	    
	    /*
	    redrawNewRectangle : function(coordString, targetObj) {
		try {
		    	var $this = this;
				var ge = $this.options.gePluginInstance;
				var sX;
				var sY;
				var eX;
				var eY;
				var cX;
				var cY;
				var length;
				var breadth;

				var TOP_lEFT=parseInt(0);
				var TOP_RIGHT=parseInt(1);
				var BOTTOM_RIGHT=parseInt(2);
				var BOTTOM_LEFT=parseInt(3);
				var CLOSE_POINT=parseInt(4);


				var LATITUDE_IDX=parseInt(0);
				var LONGITUDE_IDX=parseInt(1);
				console.log(coordString);
		    	//var coordString = $this.getPolygonCoordinates($this.currentLassoPolyPlacemark);
                var arr = coordString.split(" ");
	    			
	    			//if(targetObj.getId()==$this.RECTANGLE_CENTRE){
					// For Centre Move
                	console.log("1");
					// retain the old sX
					var latlonArray = arr[TOP_lEFT].split(",")
					sX = latlonArray[LONGITUDE_IDX];
					console.log("2");
					// retain the old sY
					sY = latlonArray[LATITUDE_IDX];
					console.log("3");
					// retain the old eX
					latlonArray = arr[BOTTOM_RIGHT].split(",")
					eX = latlonArray[LONGITUDE_IDX];
					console.log("4");
					// retain the old eY
					eY = latlonArray[LATITUDE_IDX];
					console.log("5");
					length = eX-sX;
					breadth = eY-sY;
					console.log("6");
					// Fetch the new centre point
					cX = targetObj.getGeometry().getLatitude();
					cY = targetObj.getGeometry().getLongitude();
					console.log("7");
					// Calculate the new sX & sY
					sX = cX - length/2;
					sY = cY - breadth/2;
					console.log("8");
					// Calculate the new eX & eY
					eX = cX + length/2;
					eY = cY + breadth/2;
					console.log("9");
					$this.loadCircle($this.radius, sX, sY, eX, eY, $si.viewer.LASSO_SHAPES.RECTANGLE);
					console.log("10");
					//$this.currentLassoPolyPlacemark.getGeometry().setOuterBoundary($this.createRectangleRing(sX,sY,eX,eY,null));

				//}
				
				//$this.redrawPoints($si.viewer.LASSO_SHAPES.RECTANGLE,$this.getPolygonCoordinates($this.currentLassoPolyPlacemark));
				
			} catch (e) {
				$si.Logger('googleEarth').error('Error ['+e.message+'] occurred while calling redrawNewRectangle');
			}
	    },
*/
	    redrawPoints: function(shape, coordString){
	    	var $this = this;
			var ge = $this.options.gePluginInstance;
			var targetObj;


			try{
				if(shape==$si.viewer.LASSO_SHAPES.RECTANGLE){					
					var arr = coordString.split(" ");
						var targetObject;
						var TOP_lEFT=parseInt(0);
						var BOTTOM_RIGHT=parseInt(2);
						var LATITUDE_IDX=parseInt(0);
						var LONGITUDE_IDX=parseInt(1);

						var latlonArray = arr[TOP_lEFT].split(",");
						var sX= parseFloat(latlonArray[LONGITUDE_IDX]);

						latlonArray = arr[TOP_lEFT].split(",");
						var sY= parseFloat(latlonArray[LATITUDE_IDX]);

						latlonArray = arr[BOTTOM_RIGHT].split(",");
		    			var eX= parseFloat(latlonArray[LONGITUDE_IDX]);

		    			var latlonArray = arr[BOTTOM_RIGHT].split(",");
		    			var eY= parseFloat(latlonArray[LATITUDE_IDX]);		    			
		    		
		    			// For top point
		    			var point=  ge.getElementByUrl($this.HASH + $this.RECTANGLE_TOP);
		    			if(point){
			    			point.getGeometry().setLatitude(parseFloat(sX));
			    			point.getGeometry().setLongitude((parseFloat(eY)+parseFloat(sY))/2);
			    			point.setVisibility(true);
		    			}else{		    				
		    				$this.drawPoint($si.viewer.LASSO_SHAPES.RECTANGLE, sX,(eY+sY)/2, $this.RECTANGLE_TOP);
		    			}

		    			// For Bottom point
		    			point=  ge.getElementByUrl($this.HASH + $this.RECTANGLE_BOTTOM);
		    			if(point){
			    			point.getGeometry().setLatitude(parseFloat(eX));
			    			point.getGeometry().setLongitude((parseFloat(eY)+parseFloat(sY))/2);
			    			point.setVisibility(true);
		    			}else{		    				
		    				$this.drawPoint($si.viewer.LASSO_SHAPES.RECTANGLE, eX, (eY+sY)/2, $this.RECTANGLE_BOTTOM);
		    			}
		    			
		    			// For Left point
		    			point=  ge.getElementByUrl($this.HASH + $this.RECTANGLE_LEFT);
		    			if(point){
			    			point.getGeometry().setLatitude((parseFloat(sX)+parseFloat(eX))/2);
			    			point.getGeometry().setLongitude(parseFloat(sY));
			    			point.setVisibility(true);
		    			}else{
		    				$this.drawPoint($si.viewer.LASSO_SHAPES.RECTANGLE, (eX+sX)/2, sY, $this.RECTANGLE_LEFT);
		    			}
		    			
		    			// For Right point
		    			point=  ge.getElementByUrl($this.HASH + $this.RECTANGLE_RIGHT);
		    			if(point){
			    			point.getGeometry().setLatitude((parseFloat(sX)+parseFloat(eX))/2);
			    			point.getGeometry().setLongitude(parseFloat(eY));
			    			point.setVisibility(true);
			    		}else{
			    			$this.drawPoint($si.viewer.LASSO_SHAPES.RECTANGLE, (eX+sX)/2, eY, $this.RECTANGLE_RIGHT);
			    		}

		    			// For Centre point
		    			point=  ge.getElementByUrl($this.HASH + $this.RECTANGLE_CENTRE);
		    			if(point){
			    			point.getGeometry().setLatitude((parseFloat(eX)+parseFloat(sX))/2);
			    			point.getGeometry().setLongitude((parseFloat(eY)+parseFloat(sY))/2);
			    			point.setVisibility(true);
		    			}else{
		    				$this.drawPoint($si.viewer.LASSO_SHAPES.RECTANGLE, (eX+sX)/2, (eY+sY)/2, $this.RECTANGLE_CENTRE);
		    			}
		    			 $($si.viewer).trigger("applyLassoFilter", true);
				}
			}catch(e){
				$si.Logger('Lasso').error("Error is redrawPoints() " + e.message);
			}
	    },
			    
	    showPoints: function(shape,flag){
	    	var $this = this;
	    	var ge = $this.options.gePluginInstance;
	    	
	    	if(shape == $si.viewer.LASSO_SHAPES.RECTANGLE){
	    		
	    		if(ge.getElementByUrl($this.HASH + $this.RECTANGLE_TOP)){
	    			ge.getElementByUrl($this.HASH + $this.RECTANGLE_TOP).setVisibility(flag);
	    		}
	    		if(ge.getElementByUrl($this.HASH + $this.RECTANGLE_BOTTOM)){
	    			ge.getElementByUrl($this.HASH + $this.RECTANGLE_BOTTOM).setVisibility(flag);
	    		}
	    		if(ge.getElementByUrl($this.HASH + $this.RECTANGLE_LEFT)){
	    			ge.getElementByUrl($this.HASH + $this.RECTANGLE_LEFT).setVisibility(flag);
	    		}
	    		if(ge.getElementByUrl($this.HASH + $this.RECTANGLE_RIGHT)){
	    			ge.getElementByUrl($this.HASH + $this.RECTANGLE_RIGHT).setVisibility(flag);
	    		}
	    		if(ge.getElementByUrl($this.HASH + $this.RECTANGLE_CENTRE)){
	    			ge.getElementByUrl($this.HASH + $this.RECTANGLE_CENTRE).setVisibility(flag);
	    		}			
				
	    	}
	    },
	    /*
	    removePoints : function(shape) {
	    	var $this = this;
	    	var ge = $this.options.gePluginInstance;
	    	
	    	if(shape == $si.viewer.LASSO_SHAPES.RECTANGLE){
	    		
	    		if(ge.getElementByUrl($this.HASH + $this.RECTANGLE_TOP)){
	    			ge.getFeatures().removeChild(ge.getElementByUrl($this.HASH + $this.RECTANGLE_TOP));
	    		}
	    		if(ge.getElementByUrl($this.HASH + $this.RECTANGLE_BOTTOM)){
	    			ge.getFeatures().removeChild(ge.getElementByUrl($this.HASH + $this.RECTANGLE_BOTTOM));
	    		}
	    		if(ge.getElementByUrl($this.HASH + $this.RECTANGLE_LEFT)){
	    			ge.getFeatures().removeChild(ge.getElementByUrl($this.HASH + $this.RECTANGLE_LEFT));
	    		}
	    		if(ge.getElementByUrl($this.HASH + $this.RECTANGLE_RIGHT)){
	    			ge.getFeatures().removeChild(ge.getElementByUrl($this.HASH + $this.RECTANGLE_RIGHT));
	    		}
	    		if(ge.getElementByUrl($this.HASH + $this.RECTANGLE_CENTRE)){
	    			ge.getFeatures().removeChild(ge.getElementByUrl($this.HASH + $this.RECTANGLE_CENTRE));
	    		}			
				
	    	}
		},
	    */
	    calculateAlphaForGe : function(opacity) {
			if(opacity == 0){
				return "00";
			}else if (opacity == 100){
				return "ff";
			}else if(opacity <= 9){
				return "20";
			}else if(opacity <= 19){
				return "40";
			}else if(opacity <= 29){
				return "60";
			}else if(opacity <= 39){
				return "80";
			}else if(opacity <= 49){
				return "99";
			}else if(opacity <= 59){
				if((""+opacity).split("")[1] < 5){
					return "ba";
				}else{
					return "bf";
				}
				
			}else if(opacity <= 69){
				if((""+opacity).split("")[1] < 5){
					return "ca";
				}else{
					return "cf";
				}
			}else if(opacity <= 79){
				if((""+opacity).split("")[1] < 5){
					return "da";
				}else{
					return "df";
				}
			}else if(opacity <= 89){
				if((""+opacity).split("")[1] < 5){
					return "ea";
				}else{
					return "ef";
				}
			}else if(opacity <= 99){
				if((""+opacity).split("")[1] < 5){
					return "fa";
				}else{
					return "ff";
				}
			}
			
		},
			    					
	});
});
