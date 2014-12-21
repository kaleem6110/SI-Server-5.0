/**
 * Google earth plug-in .
 */
define([
    'jquery',
    'jquery-ui',
    'map/com.spacetimeinsight.viewer.ui.baseMap',
    'extensions',
    'geIntercept',
    $si.viewer.mapProperties['mapURL'],
    'window/tabbed/com.spacetimeinsight.viewer.window.tabbedViewWindow',
],function($){

		$.widget('spacetimeinsight.siViewerGoogleEarth', $.spacetimeinsight.siViewerBaseMap,{
			 options :{
					windowAttributes : {
						position: {
							top		: "0px",
							left	: "285px",
						},
					},
					title		  				: $si.i18N.Map.map,
//			        toolBarWidgetJS 			: "map/com.spacetimeinsight.viewer.ui.mapToolBar",
//			        toolBarWidget 				: "siViewerMapToolBar",
//			        tooltip 					: $si.i18N.Map.tooltip,
			        drawerWidgetJS				: "map/ge/com.spacetimeinsight.viewer.ui.geMapDrawer",
			        drawerWidget 				: "siViewerGeMapDrawer",
					showLegend  				: "siViewerMapLegend",
					showLegendJS  	    		: "map/com.spacetimeinsight.viewer.ui.mapLegend",
					gePluginInstance        	: null,
					mapLassoToolBar				: "siViewerMapLassoToolBar",
					mapLassoToolBarJS			: "map/com.spacetimeinsight.viewer.ui.mapLassoToolBar",
					group						: "Maps",
					businessViewNetworkLinks	: {},
					showHelpDropdown			: true,
			},

			// Ruler Variables
			unit_symbol         						: "",
	        measurement_symbol  						: "",
	        CONVERSION_FACTOR   						: "",
	        DEFAULT_CONVERSION_UNIT 					: "",
	        MILE_TO_FEET        						: 5280,
			KM_TO_METER         						: 1000,
			conversion_mile     						: 1609.344,
			conversion_km       						: 1000,

			gblPlacemarkArr     						: [],
			gblLineArr          						: [],
			distance            						: 0,
			gblArrCounter       						: 0,
			firstClick									: false,
			endPlacemark								: null,
			startPlacemark								: null,
			tempLineArr         						: [],
			gex											: null,
			gblLinestring       						: "",
			geClickEventHandeller						: null,
			geMouseUpEventHandeller     				: null,
			pluginName									: "siViewerGoogleEarth",
			geocoder       								: null,
			isRulerActive                               : false,

			//Lasso Variables
			currentLassoPolyPlacemark 					: null,
			initCircleCreation 							: false,
			radiusValuePlacemark 						: null,
			rbFeaturesArray 							: {},
			lastLassoRegionDrawn 						: null,
			screenOverlay 								: null,
			unit 										: null,
			measurement 								: null,
			measurentSys 								: null,
			isImperial 									: true,
			idCount                                     : 0,
			EARTH_RADIUS 								: 6371, //KM
			createNewCircleFlag							: false,
			geCircleMouseClickEventHandeler             : null,
			RUBBERBAND_MODE_EDIT 						: 'edit',
			RUBBERBAND_MODE_READONLY 					: 'readonly',
			rubberbandMode 								: this.RUBBERBAND_MODE_EDIT,
			selectedRubberBandPlacemark                 : null,
			currentRubberBandPolyPlacemark     			: null,
			isCompletedListener 						: false,
			beforeEditRubberbandRegionsArray 			: [],
			afterEditRubberbandRegionsArray 			: [],
			viewPortArray 								: [],
			centreDraggedFlag 							: false,
			circumferenceDraggedFlag 					: false,
			globalTargetID 								: '1',
			smallUnitConversion 						: 1000, //for KM to Meter
			kmToMilesFactor 							: 0.621371192, //multiply KM by kmToMilesFactor to get distance in miles
			milesToFeetFactor 							: 5280, //multiply miles by milesToFeetFactor to get distance in feet
			roundedRadiusSmallUnit                      : null,
			circleCenterDragPlacemarkUrl     			: $si.viewer.serverUrl+'images/circle.png',
			circleCircumDragPlacemarkUrl 				: $si.viewer.serverUrl+'images/circle.png',
			center										: null,
			circumference 								: null,
			circumLatitude 								: null,
			circumLongitude								: null,
			circleClickHandler							: null,
			circumferenceMouseUpHandler					: null,
			circumferenceMouseDownHandler  				: null,
			lastSelectedRegion 							: null,
			//for circle coords
			centerPm 									: null,
			circumPm 									: null,
			geMouseClickHandler                         : null,
			radiusChangeHandler                         : null,
			highlightLassoId							: 0,
			lastHighlightLassoId						: null,
			LISTENER_TYPE_DEFAULT_CLICK 				: 'DEFAULT_CLICK',
			LISTENER_TYPE_MARKER_PLACEMARK 				: 'MARKER_PLACEMARK',
			currentLineStringPlacemark					: null,
			currentPolyPlacemark                        : null,
			currentListenerType                         : null,
			markerPlacemarkClickListener                : null,
			geMouseUpEvent								: null,
			MARKER_MODE_EDIT							: 'edit',
			markerMode 									: this.MARKER_MODE_EDIT,
			MM_FEATURE 									: 'mm_',
			selectedMarkerPlacemark 					: null,
			rubberbandPolygonUpdated                    : null,
			dragFlag 									: true,
			drawBox										: null,
			startX										: null,
			startY										: null,

			DEFAULT_LOCATION : {
			    latitude     : 38.6,
				longitude  	 : -98,
				altitude     : 0.0,
				range        : 5400000,
			},

			searchLocation 	 : {
				latitude     : 0.0,
				longitude    : 0.0,
				altitude     : 925583.9946129787,
				range        : 5000.0,
			},


			_create : function(){
				$(this.element).addClass("sti-window-google-earth");
				
				//Segregation of code
				requirejs(['map/ge/com.spacetimeinsight.viewer.ui.geSearchOperations', 'map/ge/com.spacetimeinsight.viewer.ui.geLayerOperations', 'map/ge/com.spacetimeinsight.viewer.ui.geRulerOperations','map/ge/com.spacetimeinsight.viewer.ui.geLasso'],function(){
				});
				
				this._super();

				
			},
			
			/**
			 * This method will close the favorite menu on clicking on Google Earth.
			 * @param {} $
			 * @returns {} 
			 */
			geClickHandler : function(){
				this.element.parent().find('#favoriteTool').data('kendoMenu').close();
				this.element.parent().find('#favoriteTool').data('kendoMenu').clicked = false;
			},
			// Load ge plugin and create plugin instance
			loadPlugin : function(){
				var $this = this;

				google.load('earth', '1', {
			        callback: function () {
			            google.earth.createInstance($this.options.PLUGIN_DIV, function (pluginInstance) {
			            	// success callback
			                $this._successCallback(pluginInstance);
			            }, function (errorCode) {
			            	// failure callback
			                $this._failureCB(errorCode);
			            });
			        }
			    });
				google.load("maps", $si.viewer.mapProperties['googlemapsversion'], {other_params: "sensor=false", callback: function() {
					//	$si.Logger('googleEarth').error(" maps loaded");
					}
				});
			},
			_successCallback : function(pluginInstance){
				// Begin – 03/15/2014 - Kartik ----
				var $this = this;
			    // set navigation controls
			    pluginInstance.getNavigationControl().setVisibility(pluginInstance.VISIBILITY_SHOW);
				this.options.gePluginInstance = pluginInstance;
				this.setLookAt(this.DEFAULT_LOCATION);
				this.options.gePluginInstance.getWindow().setVisibility(true);
				$this.updateOptions("Scale Legend", false, $si.mapUtils.isImperial());
	          	$this.updateOptions("Atmosphere", true, $si.mapUtils.isImperial());
				$this.gex = new GEarthExtensions(this.options.gePluginInstance);

				$this.loadGELayers();
				$this._addGEListeners();
				// activate the tool bar when the GE is loaded.
		        $this._activateToolBar();
		        $this._addLogoOverLay();
		        google.earth.addEventListener($this.options.gePluginInstance.getWindow(), 'click', $this.geClickHandler.bind($this));
			},
			_addLogoOverLay:function(){
				var screenOverlay = this.options.gePluginInstance.createScreenOverlay('');

				// Specify a path to the image and set as the icon
				var icon = this.options.gePluginInstance.createIcon('');
				icon.setHref($si.viewer.serverUrl+'css/images/STI-embossed-logo-4map.png');
				screenOverlay.setIcon(icon);
				screenOverlay.getOverlayXY().setXUnits(this.options.gePluginInstance.UNITS_FRACTION);
				screenOverlay.getOverlayXY().setYUnits(this.options.gePluginInstance.UNITS_FRACTION);
				screenOverlay.getOverlayXY().setX(0.72);
				screenOverlay.getOverlayXY().setY(0.056);

				// Set the overlay's size in pixels
				screenOverlay.getSize().setXUnits(this.options.gePluginInstance.UNITS_PIXELS);
				screenOverlay.getSize().setYUnits(this.options.gePluginInstance.UNITS_PIXELS);
				screenOverlay.getSize().setX(150);
				screenOverlay.getSize().setY(28);


				this.options.gePluginInstance.getFeatures().appendChild(screenOverlay);
			},
			isShimRequired : function () {
				return true;
			},

			_activateToolBar : function(){
				this._super();

				this.setEnterpriseLayers(this._convertEnterpriseLayerToKendoTreeObject(this.loadGELayers()));
			},

			_openInfoBalloon:function(event){
				var $this = this;
				  var  target = event.getTarget();
					if(target != null) {
						var type = target.getType();

						if(type == 'KmlPlacemark') {
							var desc = target.getDescription();
							event.stopPropagation();
							event.preventDefault();
							if(!(desc == '' || desc == 'null')) {
								$this.openBusinessViewInfoWindow(JSON.parse(desc), desc,target.getName(),{top:event.getClientY(),left:event.getClientX()});
							}
						}
					}
			 },
			_synchupStreetViewAndMap:function(){
				 var $this=this;
				 if($("#"+$this.GOOGLE_MAP_VIEW_WINDOW_ID).length > 0){
					var latLonBox = $this.options.gePluginInstance.getView().getViewportGlobeBounds();
						$("#"+$this.GOOGLE_MAP_VIEW_WINDOW_ID).trigger("geMouseUpForMap", [latLonBox.getNorth(), latLonBox.getSouth(), latLonBox.getEast(), latLonBox.getWest()]);
					}
					if(($("#"+$this.GOOGLE_STREET_VIEW_WINDOW_ID).length > 0) && (!$this.isRulerActive)){
						 $si.Logger('geMap').info('inside streetview _synchupStreetViewAndMap');
						var lookAt = $this.options.gePluginInstance.getView().copyAsLookAt($this.options.gePluginInstance.ALTITUDE_RELATIVE_TO_GROUND);
						$("#"+$this.GOOGLE_STREET_VIEW_WINDOW_ID).trigger("geMouseUpForStreet", [lookAt.getLatitude(), lookAt.getLongitude()]);
					}

			 },
			_addGEListeners : function(){
				var $this = this;
				try {
						$this.geMouseUpEventHandeller = function(event) {
							$this._synchupStreetViewAndMap();
							$this._openInfoBalloon(event);
						};
					google.earth.addEventListener(this.options.gePluginInstance.getGlobe(), "mouseup", $this.geMouseUpEventHandeller);


					google.earth.addEventListener(this.options.gePluginInstance.getView(), 'viewchangeend', function(){
						$this._synchupStreetViewAndMap();
						$this.triggerCameraMoveEvent();
					});

				} catch (e) {
					$si.Logger('googleEarth').error("_addGEListeners"+e);
				}
				$this =  this;
			},

			_failureCB : function(errorCode){

			},

			// Begin – 03/15/2014 - Kartik
			_placemarkClick : function() {
					// For now its just a dynamic div but in real case there
					// will come unique value that will be coming from the
					// placemark.
				    $(this.element).append("<div id='TabbedViewDiv'></div>");
					$(this.element).find("#TabbedViewDiv").siViewerTabbedViewWindow();
			},
			// End---
			setLookAt : function(coord){
				if(coord){
					 var lookAt = this.options.gePluginInstance.createLookAt('');
					 lookAt.setLatitude(coord.latitude);
				     lookAt.setLongitude(coord.longitude);
				     lookAt.setAltitude(coord.altitude);
				     lookAt.setRange(coord.range);
	 			     this.options.gePluginInstance.getView().setAbstractView(lookAt);
				}
			},

			reset : function(){
				this._super();
				this.resetMap();
			},
			
			resetMapZoom : function() {
				this.setLookAt(this.DEFAULT_LOCATION);
			},
			
			setMapZoom : function(zoom){
				this.setLookAt(JSON.parse(zoom));
			},
			
			getMapZoom : function(){
				return JSON.stringify(this.getCurrentViewJson());
			},
			
			getCurrentView : function() {
		 		try {
		 			var $this = this;
		 			if($this.options.gePluginInstance != null){
			 			var lookAt = $this.options.gePluginInstance.getView().copyAsLookAt($this.options.gePluginInstance.ALTITUDE_RELATIVE_TO_GROUND);
				        var lookAtStr = lookAt.getLongitude()+","+lookAt.getLatitude()+","+lookAt.getRange()+","+
				            lookAt.getTilt()+","+lookAt.getHeading()+","+lookAt.getAltitude()+","+lookAt.getAltitudeMode();
				        return lookAtStr;
		 		}
				} catch (e) {
					$si.Logger('googleStreetView').error('Error ['+e.message+'] occurred in loading Google Earth Maps');
				}
		    },
		    
		    getCurrentViewJson : function(){
		    	try {
		    		if(this.options.gePluginInstance != null){
		    			var lookAt = this.options.gePluginInstance.getView().copyAsLookAt(this.options.gePluginInstance.ALTITUDE_RELATIVE_TO_GROUND);
		    			var lookAtJsonObject = {
		    				    latitude     : lookAt.getLatitude(),
		    					longitude  	 : lookAt.getLongitude(),
		    					altitude     : lookAt.getAltitude(),
		    					range        : lookAt.getRange(),		
		    			}
		    			
		    			return lookAtJsonObject;
		    		}

				} catch (e) {
					$si.Logger('googleStreetView').error('Error ['+e.message+'] occurred in loading Google Earth Maps');
				}
				
				return {};
		    },

		    loadGELayers: function(){
				var $this = this;
				var ge = $this.options.gePluginInstance;
				var rootGELayer = new Object();
				var rootLayer = ge.getLayerRoot();
		        rootGELayer.layerId = 'root';
		        return $this.loadGEChildLayers(rootGELayer, rootLayer);
			},
			loadGEChildLayers : function(parentLayerObject, geFeature){
				  var $this = this;
				  var features = geFeature.getFeatures();
			      var childLayers = features.getChildNodes();
			      var childLayersObjectArray = new Array();

			      for (var i = 0; i < childLayers.getLength(); i++) {
			        var feature = childLayers.item(i);

			        var layerObject = new Object();
			        layerObject.layerId = feature.getId();
			        layerObject.layerName = feature.getName();
			        var isSelected = "0";
			        if (feature.getVisibility()) {
			          isSelected = "1";
			        }
			        layerObject.isSelected = isSelected;
			        layerObject.lookAt = feature.getAbstractView();
			        childLayersObjectArray.push(layerObject);

			        var type = feature.getType();
			        if (type == 'KmlLayer') {
			        // Do nothing.
			        } else if (type == 'KmlFolder') {
			            $this.loadGEChildLayers(layerObject, feature);
			        }
			      }
			      parentLayerObject.childLayers = childLayersObjectArray;
			      return parentLayerObject.childLayers;
			      //$si.viewer.drawerData = parentLayerObject.childLayers;
			},
			updateOptions: function(option, switchOn, isMileFeet){
				var $this = this;

				   var ge = $this.options.gePluginInstance;
				   var options = ge.getOptions();
			       if(option == "Status Bar") {
						options.setUnitsFeetMiles(isMileFeet);
			            options.setStatusBarVisibility(switchOn);
				    } else if(option == "Grid") {
			            options.setGridVisibility(switchOn);
			       } else if(option == "Overview Map") {
			            options.setOverviewMapVisibility(switchOn);
			       } else if(option == "Scale Legend") {
			    	   	options.setUnitsFeetMiles(isMileFeet);
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
			       } else if(option == "Sun") {
			           // showSun(switchOn);
			           ge.getSun().setVisibility(switchOn);
			       } else if(option == "Street View") {
			            ge.getNavigationControl().setStreetViewEnabled (switchOn);
			       }

			},

			addKmlNetworkLink: function (urlLink, kmlId) {
			    var businessViewId = kmlId;
			    if(!this.options.businessViewNetworkLinks[businessViewId] && urlLink){

				    var networkLinksMap = {};
				    networkLinksMap[urlLink] = this._createMapNetworkLink(urlLink);
				    this.options.businessViewNetworkLinks[businessViewId] = networkLinksMap;
				 }

			},

			_createMapNetworkLink: function (businessViewLink) {
				if(businessViewLink){
				    var ge = this.options.gePluginInstance;
				    //create link
				    var link = ge.createLink("");
				    link.setHref(businessViewLink);

				    //create network link
				    var networkLink = ge.createNetworkLink("");
				    networkLink.set(link, true, true);

				    //add the network link to google earth
				    ge.getFeatures().appendChild(networkLink);
				    return networkLink;
				}
			},

			removeKMLNetworkLink: function (urlLink, kmlId) {
			    var networkLinksMap = this.options.businessViewNetworkLinks[kmlId];
			    //for (var businessViewName in networkLinksMap) {
			    if (networkLinksMap && networkLinksMap.hasOwnProperty(urlLink)) {
			        this.options.gePluginInstance.getFeatures().removeChild(networkLinksMap[urlLink]);
				}
  				delete this.options.businessViewNetworkLinks[kmlId];
			},

			loadBusinessView : function(businessViewMetadata) {
				this._addBusinessViewNetworkLinks(businessViewMetadata);
			},

			refreshBusinessView : function(businessViewMetadata, businessViewName, params) {
				this._refreshBusinessViewNetworkLink(businessViewMetadata.id, businessViewName, params);
			},

			removeBusinessView : function(businessViewMetadata) {
				this._removeBusinessViewNetworkLinks(businessViewMetadata.id);
			},
			
			updateHighLightColor : function(colorValue){
				this.options.highlightColor=colorValue;
			},
			
			_convertEnterpriseLayerToKendoTreeObject: function(layers){
				var $this = this;
				var layerArray = [];
				var layerObj = {};
				if(layers){
					$.each(layers,function(index,layer){
						layerObj = {};
						layerObj.text = $this._getEnterpriseLayerName(layer.layerName);
						layerObj.id   = layer.layerId;
						layerObj.spriteCssClass = "rootfolder";
						layerObj.items	= [];
						if(layer.childLayers){
							layerObj.items = $this._convertEnterpriseLayerToKendoTreeObject(layer.childLayers);
						}
						layerArray.push(layerObj);
					});
				}
				return layerArray;
			},
			
			_getEnterpriseLayerName : function(layerName){
				if(layerName){
					layerName = layerName.substring(layerName.indexOf(">")+1, layerName.length);
	   				//layerName = layerName.replace(" ","");
	   				layerName = layerName.replace("&#040;","(");
	   				layerName = layerName.replace("&#041;",")");
				}
				return layerName;
			},
			
			onEnterpriseLayerChecked : function(data){
				if(data){
					var ge = this.options.gePluginInstance;
					ge.getLayerRoot().enableLayerById(data.id, data.checked);
				}
    		},
    		
    		onMapOverLayFeatureChecked : function(data){
    			if(data){
    				this.updateOptions(data.id,data.checked,$si.mapUtils.isImperial());
    			}
    		},
    		
    		viewLassoOnMap : function (lasso){
    			$si.mapUtils.showLassoOnMapByLassoDBId(lasso.id, lasso.selected);
			},
    		
		});
});