/**
 * Google Earth Ruler operations are written in it.
 */
define([
    'jquery',
    'jquery-ui',
    'map/ge/com.spacetimeinsight.viewer.ui.geMap',
],function($){
			$.extend($.spacetimeinsight.siViewerGoogleEarth.prototype, {
				
				_distanceCalculation : function(mode, measurementSystem, longDistance, shortDistance){
					try {
					 var $this = this;
					 var options = this.options.gePluginInstance.getOptions();
					 	$this.distance = 0;
				        $this._calculateMeasurementUnit(measurementSystem, longDistance, shortDistance);
				        if(mode == 'active'){
				            options.setMouseNavigationEnabled(this.options.gePluginInstance.VISIBILITY_HIDE);
				            $this.isRulerActive = true;
				            $this._activateClickForDistanceCalc();
				        } else {
				        	$this.isRulerActive =  false;
				            options.setMouseNavigationEnabled(this.options.gePluginInstance.VISIBILITY_SHOW);
				            $this.startPlacemark  = null;
				            $this.endPlacemark = null;
				            for(remCntr=0;remCntr<$this.gblPlacemarkArr.length;remCntr++){
				                $this._removeAllChildrenArray($this.gblPlacemarkArr[remCntr]);
				                $this._removeAllChildrenArray($this.gblLineArr[remCntr]);
				            }
				            $this._deActivateListenersForDistanceCalc();
				            $this.gblLinestring = "";
				        }
					} catch (e) {
						$si.Logger('geRulerOperations').error("_distanceCalculation    "+e);
					}
				},
				
				// This method is used to calculate the measurement units(miles,feet
				// or KM , Meters) based measurement_symbol system
				_calculateMeasurementUnit: function (measurementSystem, longDistance, shortDistance){
					try{
						var $this = this;
						// calculating the units(miles,feet or KM , Meters) based
						// measurement system
						if(measurementSystem == "imperial"){
							// unit_symbol = "miles";
							$this.unit_symbol = longDistance;
							// measurement_symbol = "feet";
							$this.measurement_symbol = shortDistance;
							$this.DEFAULT_CONVERSION_UNIT = $this.MILE_TO_FEET;
							$this.CONVERSION_FACTOR = $this.conversion_mile;
						}else{
							// unit_symbol = "KM";
							$this.unit_symbol =  longDistance;
							// measurement_symbol = "Meters";
							$this.measurement_symbol = shortDistance;
							$this.DEFAULT_CONVERSION_UNIT = $this.KM_TO_METER;
							$this.CONVERSION_FACTOR = $this.conversion_km;
						}
					}catch (e) {
						$si.Logger('geRulerOperations').error("_calculateMeasurementUnit   "+e);
					}	
				},
				 _activateClickForDistanceCalc: function (){
					var $this = this;
			        $this.geClickEventHandeller = function(kmlEvent) { 
			
				        try{
				            var butClick = kmlEvent.getButton();
				            if(butClick == 2){
				            	$this._rightClickCleanUp();
				                return;
				            }
				            	
				            var latitude = kmlEvent.getLatitude();
				            var longitude = kmlEvent.getLongitude();
			
				            
				            var tempPlacemarkArr = $this.gblPlacemarkArr[$this.gblArrCounter];
				            
				            if(tempPlacemarkArr == null){
				                tempPlacemarkArr = new Array();
				                $this.gblPlacemarkArr[$this.gblArrCounter] = tempPlacemarkArr;
				            }
				            // very first click
				            if($this.startPlacemark == null){
				            	
				            	$this.startPlacemark = $this.gex.dom.addPointPlacemark([latitude,longitude], {});// click
																													// value
				                tempPlacemarkArr[tempPlacemarkArr.length] =  $this.startPlacemark;
				                $this.firstClick = true;
				                $this.endPlacemark = null;
				                
				            }
				            //
				            $this.gblLinestring += longitude+","+latitude +",0.0 ";
				            $this._setStyles($this.startPlacemark,$this.gblArrCounter);
				            if($this.firstClick){
				            	$this.firstClick = false;
				                return;
				            }
				            $this.endPlacemark = $this.gex.dom.addPointPlacemark([latitude,longitude], {});// new click value
			
				            $this.distance = $this.distance + parseFloat($this._getDistance($this.startPlacemark , $this.endPlacemark));
				            $this._setStyles($this.endPlacemark,$this.gblArrCounter);
			
				            $this._drawLine($this.gblLinestring);
				            $this.startPlacemark = $this.endPlacemark;
			
				            if($this.distance.toFixed(2) == 0.00)
				            {
				            	// converting mile to feet
				            	$this.endPlacemark.setName(($this.distance * CONVERSION_FACTOR ).toFixed(2) + measurement_symbol);
				            }
				            else
				            {
				            	// distance in mile
				            	$this.endPlacemark.setName($this.distance.toFixed(2) + $this.unit_symbol);
				            }
			
				            tempPlacemarkArr[tempPlacemarkArr.length] =  $this.endPlacemark;
				        } catch (e) {
				        	$si.Logger('geRulerOperations').error("clickEventHandeller   "+e.message);
				        }
				    
			        };
			        google.earth.addEventListener(this.options.gePluginInstance.getGlobe(), "click",  $this.geClickEventHandeller);
			    },
			    _deActivateListenersForDistanceCalc: function(){
			        try{
			        	var $this = this;
			            google.earth.removeEventListener(this.options.gePluginInstance.getGlobe(), "click", $this.geClickEventHandeller);
			        }
			        catch(e){
			        	$si.Logger('geRulerOperations').error("_deActivateListenersForDistanceCalc   "+e);
			        }
			    }, 
			    _rightClickCleanUp: function(){
			    	try{
			    	var $this = this;
			    	$this.distance = 0;
			
			        if($this.gblPlacemarkArr[$this.gblArrCounter].length == 1){
			            removeAllChildren($this.gblPlacemarkArr[$this.gblArrCounter]);
			        }
			
			        // gblArrCounter++;
			        $this.gblLinestring = '';
			        $this.startPlacemark = null;
			    	}catch(e){
			    		$si.Logger('geRulerOperations').error("_rightClickCleanUp   "+ e)
			    	}
			    },
			    _removeAllChildrenArray: function (featuresArray) {
			    	try{
				    	var $this = this;
				        var count = featuresArray == null ? 0 : featuresArray.length;
				        for(var i = 0; i < count; i++) {
				        	this.options.gePluginInstance.getFeatures().removeChild(featuresArray[i]);
				        }
			    	}catch(e){
			    		$si.Logger('geRulerOperations').error("_removeAllChildrenArray   "+ e);
			    	}
			     },
			     _drawLine: function (coordinates){
			    	 try {
			    	 var $this = this;
			         var polyLineStringPlacemark = $this.gex.dom.addLineStringPlacemark([], {
			           style: {
			             line: { width: 2.0, color: 'dd0000ff' },
			             poly: { color: '400000ff' }
			           }
			         });
			         $this._setLineStringCoordinates(polyLineStringPlacemark, coordinates);
			
			         // If from move donot store in the array.
			         $this.tempLineArr = $this.gblLineArr[$this.gblArrCounter];
			         if($this.tempLineArr == null){
			        	 $this.tempLineArr = new Array();
			        	 $this.gblLineArr[$this.gblArrCounter] =  $this.tempLineArr;
			         }
			
			         $this.tempLineArr[$this.tempLineArr.length] = polyLineStringPlacemark;
			    	 } catch (e) {
			    		 $si.Logger('geRulerOperations').error("_drawLine   "+ e);
					}
			    },
			     _setLineStringCoordinates: function (lineStringPlacemark, coordStr) {
			    	 try{
				         if(lineStringPlacemark && coordStr) {
				             var kmlCoordArray = lineStringPlacemark.getGeometry().getCoordinates();
				             var coordArray = coordStr.split(" ");
				             var count = coordArray == null ? 0 : coordArray.length;
				             var latlonArray = null;
				             for(var i = 0; i < count; i++) {
				                 latlonArray = coordArray[i].split(",");
				                 if(latlonArray.length == 3) {
				                     kmlCoordArray.pushLatLngAlt(parseFloat(latlonArray[1]), parseFloat(latlonArray[0]), parseFloat(latlonArray[2]));
				                 }
				             }
				         }
			    	 }catch (e) {
			    		 $si.Logger('geRulerOperations').error("_setLineStringCoordinates   "+ e);
					}
			     },
			     // Set the styles to the placemarks
			     _setStyles: function (placemark, sectionClearID){
			    	 var $this = this;
			    	 try {
				         if(placemark != null){
				             placemark.setStyleSelector($this._getIconStyle());
				         }
			    	 } catch (e) {
			    		 $si.Logger('geRulerOperations').error("_setStyles   "+e);
					 }
			     },
			     _getIconStyle: function (){
			    	 try {
			    		 var icon = this.options.gePluginInstance.createIcon('');
			    	        if($si.viewer.serverUrl != null){
			    	        	imgUrl = $si.viewer.serverUrl + "images/dot.png";
			    	        }else{
			    	        	imgUrl = "http://maps.google.com/mapfiles/kml/paddle/red-circle.png";
			    	        }	
			    	        icon.setHref(imgUrl);
			    	        var style = this.options.gePluginInstance.createStyle('');
			    	        style.getIconStyle().setIcon(icon);
			    	        style.getIconStyle().setScale(0.4);
			    	        style.getLabelStyle().setScale(0.6);
			    	        return style;
					} catch (e) {
						$si.Logger('geRulerOperations').error("_getIconStyle   "+e);
					}
			     },
			     // This is used to get the distance between 2 placemarks.
			     _getDistance: function (startPlacemark , endPlacemark ){
			    	try {		
					 var $this = this;
			         if(startPlacemark != null && endPlacemark != null){
			             // Currently it is for Miles. If needed for different
							// thing need to parameterized
			             return (new geo.Point(startPlacemark.getGeometry()).distance(new geo.Point(endPlacemark.getGeometry()))/ $this.CONVERSION_FACTOR).toFixed(5);
			         }
			    	}
			         catch (e) {
			        	 $si.Logger('geRulerOperations').error("_getDistance   "+e);
					 }
			     },
			   });
});