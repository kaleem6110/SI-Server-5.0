/**
 * Google Earth layer operations are written in it.
 */
define([
    'jquery',
    'esri/map',
    'esri/toolbars/draw',
    'esri/toolbars/edit',
    'esri/layers/KMLLayer',
    'esri/toolbars/navigation',
    'esri/layers/GraphicsLayer',
    'esri/geometry/Point',
    'esri/geometry/Polyline',
    'esri/geometry/Polygon',
    'esri/geometry/Extent',
    'esri/graphic',
    'esri/symbols/Font',
    'esri/tasks/DistanceParameters',
    'esri/tasks/GeometryService',
    //'esri/dijit/OverviewMap',
    'esri/dijit/Scalebar',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/PictureMarkerSymbol',
    'esri/symbols/TextSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/CartographicLineSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/PictureFillSymbol',
    'esri/layers/ArcGISTiledMapServiceLayer',
    'esri/layers/MapImageLayer',
    'esri/layers/MapImage',
    'esri/geometry/webMercatorUtils',
    'esri/Color',
    'esri/tasks/locator',
    'dojo/_base/event',
    'dojo/domReady!',
    'jquery-ui',
    'map/esri/com.spacetimeinsight.viewer.ui.esriMap',
],function($, esriMap, esriDraw, esriEdit, esriKMLLayer, esriNavigation, esriGraphicsLayer, esriPoint, esriPolyline, esriPolygon, esriExtent, esriGraphic,
			esriFont, esriDistanceParameters, esriGeometryService, esriScalebar, esriSimpleMarkerSymbol, esriPictureMarkerSymbol, esriTextSymbol,
			esriSimpleLineSymbol, esriCartographicLineSymbol, esriSimpleFillSymbol,
			esriPictureFillSymbol, esriArcGISTiledMapServiceLayer, esriMapImageLayer, esriMapImage, esriUtis, esriColor, esriLocator, esriEvent){

	$.extend($.spacetimeinsight.siViewerEsri.prototype, {
		GEOMETRY_TYPES: {Placemark:1, LineString:2, Polygon:3, Image:4},
		GRAPHIC_TYPE_LASSO: "$lasso$",
		DEFAULT_HIGHLIGHT_THICKNESS : 2,
		DEFAULT_HIGHLIGHT_COLOR : "#42fdff",

		ZOOM_SCALEBAR : kendo.template("<div class='esri-zoom-slider'></div>"),

		_initializeMap : function() {
			var $this = this;
			this.options.map = new esriMap($this.options.id+"_map", {
					    center: [-77.39296875000893,45.45824359266886],
				        zoom: 4,
				        slider:false,
				        sliderPosition: "top-left",
				        sliderStyle: "large",
				        fadeOnZoom: true,
				        force3DTransforms: true,
				        autoResize: true,
				        wrapAround180: false,
				        navigationMode: "css-transforms"
				    }, "status");


			$($si.viewer).bind("resetEsriMap", function(){
				$this._resetMapLayer();
			});
			
			this._addBaseLayer(this.options.currentBaseLayer);
			
			this.options.defaultBaseLayer = JSON.parse(JSON.stringify(this.options.currentBaseLayer));
			
			/** map object is required for setting enterprise layers **/
			this.setEnterpriseLayers($si.viewer.esriMapLayerModel.esriLayerList);

			this.options.map.on("extent-change", this._onMapExtentChange.bind(this));

			this.options.map.on("load", function(evt) {
				$this.options.isMapInitialized = true;
				$this._createLassoTool();
			});

            this.options.map.on("click", function(evt){
            	if($this.options.isRulerActive){
            		$this._startRulerMeasurement(evt);
            	}
            	var graphicAttributes;
            	if(evt.graphic) {
            		graphicAttributes = evt.graphic.attributes;
            	}
            	//TODO:add code to check if its in lasso edit mode
          		if(graphicAttributes && graphicAttributes.type == $this.GRAPHIC_TYPE_LASSO && $this.options.isLassoDivOpened) {
		        	//esriEvent.stop(evt);
          			if($this.options.isLassoEditToolActive){
          				/** already Editing one lasso **/
						$this._createErrorNotification({}, $si.i18N.Map.lassomessages.updatecancelcurrentregionediting);
          			}else{
          				if(evt.graphic && evt.graphic.attributes){
          					if($this.isTheCurrentUserOwnerOfLasso(evt.graphic.attributes.id)){
          						$this.changeButtonsStateOnLassoEdit(false);
              					$this._activateEditLassoTool(evt.graphic);
              				}
          				}
          			}
		        } else {
		        	if(evt.graphic && evt.graphic.data && evt.graphic.data.attributes) {
		        		$this.openBusinessViewInfoWindow(evt.graphic.data.attributes,null,evt.graphic.data.name,{top:evt.layerY,left:evt.layerX});
		        	}
		        	/** commented for issue SI-2526 . Lasso editing gets deactivate only after save. Same as GE**/
		        	//$this._deActivateEditLassoTool();
		        }
          	});

            /** Binding zoom event for slider change **/
            this.options.map.on("zoom-end",function(evt){
            	if(evt && evt.level > $this.options.map.lods.length -1){
            		/** zoom till valid limit **/
            		 $this.options.map.setZoom($this.options.map.lods.length -1);
            	}else if(evt && $this.options.zoomSlider){
            		$($this.options.zoomSlider).data("kendoSlider").value(evt.level);
            	}
            });
/*
		 // loading icon on the bottom right corner
		    dojo.connect(this.options.map, "onUpdateStart", function() {
		        esri.show(dojo.byId("status"));
		    });
		    dojo.connect(this.options.map, "onUpdateEnd", function() {
		        esri.hide(dojo.byId("status"));
		    });
*/
		  this.options.locator = new esriLocator(this.ESRI_GEOCODE_SERVICE_URL);
		  this.options.locator.on("address-to-locations-complete", this.onLocationSearchComplete.bind(this));

		  console.log("...lcoator..");

		  /** variables for ruler **/
		  this.options.distanceParameter = new esriDistanceParameters();
		  this.options.distanceParameter.geodesic = true;
		  this.options.geometryService = new esriGeometryService(this.ESRI_GEOMETRY_SERVICE_URL);
        },

		_onMapExtentChange : function(evt) {
			this._updateMapAndStreeWindow();
			this.triggerCameraMoveEvent();
		},

		_updateMapAndStreeWindow : function(){
			var cameraEvent	=this._getCameraEventData();
			if(cameraEvent){
				var mapViewWindow = $("#"+this.GOOGLE_MAP_VIEW_WINDOW_ID + ".sti-window");
				var streetViewWindow = $("#"+this.GOOGLE_STREET_VIEW_WINDOW_ID +".sti-window" );

				if(mapViewWindow && mapViewWindow.length > 0){
					mapViewWindow.trigger("geMouseUpForMap", [cameraEvent.bboxNorth, cameraEvent.bboxSouth, cameraEvent.bboxEast, cameraEvent.bboxWest]);
				}
				if((streetViewWindow && streetViewWindow.length > 0) && (!this.options.isRulerActive)){
					streetViewWindow.trigger("geMouseUpForStreet", [cameraEvent.lookatLat, cameraEvent.lookatLon]);
				}
			}
		},

		resizeWindow : function(event) {
			this._resizeWindow();
			this.options.map.resize();
		    this.options.map.reposition();
		},

		_addBaseLayer : function(baseLayer){
			var $this = this;
	        if(baseLayer){
	            var layer = this._getArcGISTiledMapServiceLayer(baseLayer);
	            this._addMapLayer(layer);
	            layer.on("load",function(e){
	            	if(e && e.layer && e.layer.tileInfo){
	            		$this._updateZoomSlider(e.layer.tileInfo.lods);
	            	}
	            });
	        }
		},
		
		_resetMapLayer : function(){
			if(this.options.defaultBaseLayer){
				var layer = this._getArcGISTiledMapServiceLayer(this.options.currentBaseLayer);
				this._addMapLayer(layer);				
			}
		},

		_updateZoomSlider : function(lods){
			var $this = this;
			this.options.map.lods = lods;
			var currentLevel = 3;
			if(this.options.zoomSlider && this.options.zoomSlider.length > 0){
				var slider = $(this.options.zoomSlider).data("kendoSlider");
				currentLevel = slider.value();
				if(currentLevel > this.options.map.lods.length - 1){
					currentLevel = this.options.map.lods.length - 1;
				}
				slider.wrapper.remove();
				this.options.zoomSlider = null;
			}
			$(this.element).find("#"+this.options.id+"_map_root").append(this.ZOOM_SCALEBAR({}));
			this.options.zoomSlider = $(this.element).find(".esri-zoom-slider");
    		$(this.options.zoomSlider).kendoSlider({
                								min	:	0,
                								max	:	this.options.map.lods.length - 1,
                								orientation		: "vertical",
                								tickPlacement	:"bottomRight",
                								step		: 1,
                								value 		: currentLevel,
                								change: function(e) {
                										$this.options.map.setLevel(e.value);
                								}
                });

    		var sliderButton = $(this.options.zoomSlider).data("kendoSlider").wrapper.find(".k-draghandle");
    		sliderButton.attr("title", $si.i18N.Map.tooltip.zoomSlider);

    		this.options.map.setLevel(currentLevel);
		},

		_addBusinessViewLayer : function (businessViewDataResonse) {
			var businessViewId = businessViewDataResonse.id;
			var businessViewName = businessViewDataResonse.properties.artefactname;

			if(this.options.businessViewLayers[businessViewId] === undefined) {
				this.options.businessViewLayers[businessViewId] = {};
			}
			this.options.businessViewLayers[businessViewId][businessViewName] = this._createBusinessViewLayer(businessViewDataResonse);
		},

		_createBusinessViewLayer : function (layerData) {
			var models = layerData.models;
			var noOfModels = models == null ? 0 : models.length;

			var businessViewId = layerData.id;
			var businessViewName = layerData.properties.artefactname;
			var layerId = businessViewId+"_"+businessViewName;
			/** used for right click menu map select de-select **/
			//this._removeMapLayer(layerId);
			this._removeBusinessViewLayer(businessViewId, businessViewName, true);
			var globalStylesMap = {};
			var globalStyles = layerData.globalStyles;
			if(globalStyles) {
				for(var i = 0; i < globalStyles.length; i++){
					globalStylesMap[globalStyles[i].id] = globalStyles[i];
				}
			}
			var bbox;
			if(layerData.properties) {
				bbox = layerData.properties.bbox;
			}
			var isAutoZoom = layerData.autoZoom;

			if(noOfModels > 0){
				var attributes;
				var modelType;
				var geometry;
				var modelStyle;
				var modelSymbols;
				var noOfSymbols;
				var graphic;
				var modelLayers;
				var noOfModelLayers;
				var modelLayerId;
				var layerGraphicsLayers = {};
				var imageLayer;
				var image;

				//create a new graphic layer
				var graphicsLayer = new esriGraphicsLayer();
				//assign the layer id as id for graphics layer
				graphicsLayer.id = layerId;

				for(var i = 0; i < noOfModels; i++){
					attributes = models[i].attributes;
					modelType = models[i].type;
					if(modelType == this.GEOMETRY_TYPES.Image) {
						modelLayerId = businessViewId +"_image";

						if(layerGraphicsLayers[modelLayerId] === undefined) {
							this.options.businessViewLayers[businessViewId][modelLayerId] = modelLayerId;
							imageLayer = new esriMapImageLayer();
							imageLayer.id = modelLayerId;
							layerGraphicsLayers[modelLayerId] = imageLayer;
						}

						image = new esriMapImage({
						  'extent': { 'xmin': models[i].bbox.lowX, 'ymin': models[i].bbox.lowY, 'xmax': models[i].bbox.highX, 'ymax': models[i].bbox.highY},
						  'href': models[i].url
						});
						layerGraphicsLayers[modelLayerId].addImage(image);

						continue;
					}
					//switch(modelType){
						//case this.GEOMETRY_TYPES.Placemark: //placemark
					//get the geometry of type esri.geometry.Point
					geometry = this._getGeometry(models[i]);

					if(models[i].styleId && models[i].styleId != '') {
						modelStyle = $.extend(true, {},  globalStylesMap[models[i].styleId]);
					} else {
						modelStyle = models[i].style;
					}

					if(modelStyle != undefined) {
						modelLayers = modelStyle.layers;
						noOfModelLayers = modelLayers === undefined ? 0 : modelLayers.length;

						for(var j = 0; j < noOfModelLayers; j++) {
							modelLayerId = modelLayers[j].id;
							if(modelLayerId === undefined) {
								modelLayerId = businessViewId+"_"+j;
							}
							if(this.options.businessViewLayers[businessViewId][modelLayerId] === undefined) {
								this.options.businessViewLayers[businessViewId][modelLayerId] = modelLayerId;
								layerGraphicsLayers[modelLayerId] = new esriGraphicsLayer();
								layerGraphicsLayers[modelLayerId].id = modelLayerId;
								if(modelLayers[j].minScale > 0) {
									layerGraphicsLayers[modelLayerId].minScale = this.options.map.lods[modelLayers[j].minScale].scale;
								}
								if(modelLayers[j].maxScale > 0) {
									layerGraphicsLayers[modelLayerId].maxScale = this.options.map.lods[modelLayers[j].maxScale].scale;
								}
							}
							this._addSymbols(models[i], modelLayers[j], geometry, layerGraphicsLayers[modelLayerId]);
						}

						this._addSymbols(models[i], modelStyle, geometry, graphicsLayer);
					}
						//break;
					//}
				}

				this._addMapLayer(graphicsLayer);

				var $this = this;
				$.each(layerGraphicsLayers,function(layerId, layer){
					$this._addMapLayer(layer);
            	});

				if(isAutoZoom && bbox) {
					this.setMapExtent(bbox);
				}
				return graphicsLayer.id;
			}
		},

		_addSymbols : function(model, modelStyle, geometry, graphicsLayer) {
			var modelSymbols = modelStyle.symbols;
			var noOfSymbols = modelSymbols === undefined? 0 : modelSymbols.length;
			var textGraphic;
			for(var j = 0; j < noOfSymbols; j++) {
				//set the text as model name
				if(modelSymbols[j].properties.type == "esriTS") {
					if(model.showLabel == false) {
						continue;
					}
					if(modelSymbols[j].properties.text === undefined || modelSymbols[j].properties.text == '') {
						modelSymbols[j].properties.text = model.name;
					}
					var coordinates;
					if(model.attributes) {
					 coordinates = model.attributes.coordinates;
					} else {
						coordinates = model.coordinate;
					}
					if(coordinates){
						coordinates = coordinates.split(",");
						if(coordinates && coordinates.length > 1){
							var point = new esriPoint(coordinates[0],coordinates[1]);
							textGraphic = this._createGraphic(point, modelSymbols[j].properties);
							continue;
						}
					}
				}
				var graphic = this._createGraphic(geometry, modelSymbols[j].properties);
				this._addGraphic(graphicsLayer, graphic, model);
				graphic = this._createHighlightGraphic(geometry, modelSymbols[j].properties);
				graphic.id = "highlightSymbol";
				this._addGraphic(graphicsLayer, graphic, model);
			}
			if(textGraphic){
				this._addGraphic(graphicsLayer, textGraphic, model);
			}
		},
		
		_createHighlightGraphic : function (geometry, symbolProperties) {
			var symbol;
			var graphic;
			var symbolType = symbolProperties.type;
			var highLightColor = this.options.highlightColor ? this.options.highlightColor : this.DEFAULT_HIGHLIGHT_COLOR;
			highLightColor = new esriColor(highLightColor);
			highLightColor.a = 0;
			if(symbolType == "esriPMS"){
				/** getting circle radius **/
				symbolProperties.size =  Math.sqrt(symbolProperties.width * symbolProperties.width + symbolProperties.height * symbolProperties.height);
			}
			switch(symbolType){
				case "esriSMS":
				case "esriPMS":
					symbolProperties.size;
					symbol = new esriSimpleMarkerSymbol();
					symbol.setSize(symbolProperties.size);
					symbol.setColor(new esriColor([255,255,0,0]));
					
					var highLightSymbol = new esriSimpleLineSymbol();
					highLightSymbol.width = this.DEFAULT_HIGHLIGHT_THICKNESS;
					highLightSymbol.color = highLightColor;

					symbol.outline = highLightSymbol;
			}

			graphic = new esriGraphic(geometry, symbol);
			return graphic;
		},

		/**
		 * Based on the model type, either it creates  esri.geometry.Point or esri.geometry.Polyline Geometry
		 * @param model	stas/siserver  model object
		 * @param spatialReference 	The spatial reference of a map, layer, or inputs to and outputs from a task.
		 * 							Each projected and geographic coordinate system is defined by both a well-known ID (WKID)
		 * 							or a definition string (WKT).
		 * @returns {@link esri.geometry.Point}  or {@link esri.geometry.Polyline}
		 */
		_getGeometry : function(model, spatialReference) {
			var geometry;

			if(model) {
				var coordPropertiesArray;

				switch(model.type){
					case this.GEOMETRY_TYPES.Placemark: //placemark
						if(model.coordinate) {
							//creating the point geometry...
							coordPropertiesArray = model.coordinate.split(",");
							if (spatialReference) {
						        geometry = new esriPoint(coordPropertiesArray[0], coordPropertiesArray[1], spatialReference);
						    } else {
						        geometry = new esriPoint(coordPropertiesArray[0], coordPropertiesArray[1]);
						    }
			            }
						break;
					case this.GEOMETRY_TYPES.LineString: //linestring
					case this.GEOMETRY_TYPES.Polygon:
						   if(model.coordinates) {
					    	//creating the polyline geometry with An array of paths where each path is an array of points
					    	if(model.type == this.GEOMETRY_TYPES.LineString) {
								geometry = new esriPolyline();
							} else {
								geometry = new esriPolygon();
							}
							//get the coordinates for the polyline
							var pathCoordsArray = model.coordinates;
							//iterate
							for(var j = 0; j < pathCoordsArray.length; j++) {
								//coordinates are in the form of longitude, latitude, altitude longitude, latitude, altitude
								//so, split by " " coordinate properties
								coordPropertiesArray = pathCoordsArray[j].split(" ");
								var pointsArray = [];
								var noOfCoords = coordPropertiesArray.length;
								var coordsArray;
								//iterate over all coordinates
								for(var i = 0; i < noOfCoords; i++) {
									if(coordPropertiesArray[i] && coordPropertiesArray[i] != "") {
										//split by "," to get the actual latitude and longitude
										coordsArray = coordPropertiesArray[i].split(",");
										//create the point geometry and populate an array of paths where each path is an array of points
										if (spatialReference) {
									        pointsArray.push(new esriPoint(coordsArray[0], coordsArray[1], spatialReference));
									    } else {
									        pointsArray.push(new esriPoint(coordsArray[0], coordsArray[1]));
									    }
								    }
								}
								if(model.type == this.GEOMETRY_TYPES.LineString) {
									geometry.addPath(pointsArray);
								} else {
									geometry.addRing(pointsArray);
								}
							}
						}
						//geometry = esri.geometry.geodesicDensify(geometry,150000000000000000000000);
						break;
					default:
						break;
				}
			}

			return geometry;
		},

		_createGraphic : function (geometry, symbolProperties, model) {
			var symbol;
			var graphic;
			var symbolType = symbolProperties.type;

			if(symbolType == "esriSMS") {
				symbol = new esriSimpleMarkerSymbol(symbolProperties);
			} else if(symbolType == "esriTS") {
				symbol = new esriTextSymbol(symbolProperties);
			} else if(symbolType == "esriPMS") {
				symbol = new esriPictureMarkerSymbol(symbolProperties);
			} else if(symbolType == "esriSLS") {
				symbol = new esriSimpleLineSymbol(symbolProperties);
			} else if(symbolType == "esriCLS") {
				symbol = new esriCartographicLineSymbol(symbolProperties);
			} else if(symbolType == "esriSFS") {
				symbol = new esriSimpleFillSymbol(symbolProperties);
			} else if(symbolType == "esriPFS") {
				symbol = new esriPictureFillSymbol(symbolProperties);
			}

			if(symbol != null) {
				//esri api does not support all the properties in json, so resetting
				if(symbolType == "esriSLS" || symbolType == "esriCLS") {
					if(symbolProperties.style) {
						symbol.style = symbolProperties.style;
					}

					if(symbolType == "esriCLS") {
						if(symbolProperties.join) {
							symbol.join = symbolProperties.join;
						}
						if(symbolProperties.cap) {
							symbol.cap = symbolProperties.cap;
						}
					}
				}

				if(symbol.outline && symbolProperties.outline && symbolProperties.outline.style) {
					symbol.outline.style = symbolProperties.outline.style;
				}

				graphic = new esriGraphic(geometry, symbol);
			}

			return graphic;
		},

		_addGraphic : function(layer, graphic, model) {
			if(layer && graphic) {
				graphic.toolTip = model.name;
				graphic.coordinate = model.coordinate;
				graphic.data = model;
				layer.add(graphic);
			}
		},

		/**
		 * adding a layer onto esri.map.
		 * attaching event(s) to that layer
		 * 	a) onMouseOver
		 * 	b) onMouseOut
		 * @param layer
		 */
		_addMapLayer : function(layer) {
			if(layer) {
				//remove the layer if already exists
				this._removeMapLayer(layer.id);
				this.options.map.addLayer(layer);
				//dojo.connect(layer, "onMouseOver", this.layerMouseOverFn);
				//dojo.connect(layer, "onMouseOut", this.layerMouseOutFn);
			}
		},

		_hasMapLayer : function(layerId) {
			if(layerId) {
				var layer = this.options.map.getLayer(layerId);
				if(layer === undefined || layer == null) {
					return false;
				}
			}

			return false;
		},

		_showMapLayer : function(baseLayer, isShow) {
			if(baseLayer) {
				var layer = this.options.map.getLayer(baseLayer.id);
				if(layer) {
					if(isShow) {
						layer.show();
						this._updateZoomSlider(layer.tileInfo.lods);
					} else {
						layer.hide();
					}
				}else{
					this._addBaseLayer(baseLayer);
				}
			}
		},

		_getMapLayer : function(layerId) {
			if(layerId) {
				return this.options.map.getLayer(layerId);
			}
		},

		_removeMapLayer : function(layerId) {
			if(layerId) {
				var layer = this.options.map.getLayer(layerId);
				if(layer) {
					//removing the layer...
					this.options.map.removeLayer(layer);
				}
			}
		},

		/**
		 * remove the esri.layers.Layer from the map...
		 * @param layerId		ID assigned to the layer.
		 */
		_removeBusinessViewLayer : function(businessViewId, businessViewName, isKeepConfiguration) {
			if(businessViewId) {
				if(businessViewName) {
					var layerId = businessViewId+"_"+businessViewName;
					this._removeMapLayer(layerId);
				}

				var layerIdsMap = this.options.businessViewLayers[businessViewId];
				if(layerIdsMap) {
					var $this = this;
					$.each(layerIdsMap,function(businessViewName, layerId){
						var layer = $this.options.map.getLayer(layerId);
						if(layer) {
							//removing the layer...
							$this.options.map.removeLayer(layer);
						}
	            	});

					if(isKeepConfiguration === undefined || isKeepConfiguration == false) {
	            		delete this.options.businessViewLayers[businessViewId];
	            	}
            	}
			}
		},

		/**
		 * returns ArcGIS Tiled Map Service Layer
		 * @param params
		 * @returns {esri.layers.ArcGISTiledMapServiceLayer}
		 */
		_getArcGISTiledMapServiceLayer: function (params) {
			var properties = $.extend({
											id				: params.id,
									        visible			: true,
									        displayLevels	: params.displayLevels,
									        opacity			: params.opacity,
									},params.customParams);
		    return new esriArcGISTiledMapServiceLayer(params.tileServerUrl, properties);

		},

		getCurrentView : function() {
	 		try {
	 			if(this.options.map != null){
	 				var centerPoint = esriUtis.webMercatorToGeographic(this.options.map.extent.getCenter());
	 				return centerPoint.x+","+centerPoint.y+","+this.options.map.getLevel();
	 			}
			} catch (e) {
				$si.Logger('esriLayerOperations').error('Error ['+e.message+'] occurred while getting current view');
			}
	    },

	    /** zoom to placemark **/
		_setCurrentView : function(lookatStr) {
			if(lookatStr) {
				var lookAtArray = lookatStr.split(",");
				this.setCurrentView(parseFloat(lookAtArray[0]), parseFloat(lookAtArray[1]));
			}
		},

		_lookatRange : function(coordStr, range) {
			this._setCurrentView(coordStr);
		},

		setCurrentView : function(centerX, centerY, level) {
	 		try {
	 			if(level === undefined) {
	 				level = this.options.map.lods.length-1;
	 			}
	 			var centerPoint = esriUtis.geographicToWebMercator(new esriPoint(centerX,centerY));
	 			this.options.map.centerAndZoom(centerPoint, level);
			} catch (e) {
				$si.Logger('esriLayerOperations').error('Error ['+e.message+'] occurred while getting current view');
			}
	    },

	    setMapExtent : function(bbox) {
			if(bbox) {
				var arrBBox = bbox.split(",");
				var west = parseFloat(arrBBox[0]);
				var south = parseFloat(arrBBox[1]);
				var east = parseFloat(arrBBox[2]);
				var north =  parseFloat(arrBBox[3]);

				if(west == east && south == north) {
					this.options.map.setLevel(this.options.map.lods.length-1);
					this.options.map.centerAt(new esriPoint(west,south));
				} else {
					var extent = esriUtis.geographicToWebMercator(new esriExtent(west,south,east,north));
					this.options.map.setExtent(extent);
				}
			}
		},

		_getViewFormatParams : function() {
			if(this.options.map.extent) {
				var mapExtent = esriUtis.webMercatorToGeographic(this.options.map.extent);
		    	var centerPoint = mapExtent.getCenter();

		        return  "&bboxWest="+mapExtent.xmin+"&bboxSouth="+mapExtent.ymin+"&bboxEast="+mapExtent.xmax+"&bboxNorth="+mapExtent.ymax+
		            "&lookatLon="+centerPoint.x+"&lookatLat=="+centerPoint.y+"&lookatRange="+this.options.map.getLevel();
	        }

	        return "";
	    },

	    _getCameraEventData : function() {
			var cameraEvent = {};

			var mapExtent = esriUtis.webMercatorToGeographic(this.options.map.extent);
	    	var centerPoint = mapExtent.getCenter();

			cameraEvent.bboxWest = mapExtent.xmin;
			cameraEvent.bboxSouth = mapExtent.ymin;
			cameraEvent.bboxEast = mapExtent.xmax;
			cameraEvent.bboxNorth = mapExtent.ymax;
			cameraEvent.lookatLon = centerPoint.x;
			cameraEvent.lookatLat = centerPoint.y;
			cameraEvent.lookatRange = this.options.map.getLevel();

			return cameraEvent;
		},

	_toCoordinateString : function(geometry) {
			var coordinateString = "";
			if(geometry) {
				var geomType = geometry.type;
				if(geomType == "polygon") {
					$.each(geometry.rings,function(index,geomRings){
						$.each(geomRings,function(index1,geomRing){
							coordinateString += geomRing[0]+","+geomRing[1]+",0 ";
						});
					});
				}
			}

			return coordinateString;
		},


		/** Methods for kml kmz load **/
		addKmlNetworkLink: function (kmlUrl, kmlId) {
			//kmlUrl = "http://dl.dropbox.com/u/2654618/kml/Wyoming.kml";
			var kml = new esriKMLLayer(kmlUrl);
			kml.id = kmlId;
			this._addMapLayer(kml);
		    kml.on("load", function() {
		    	$si.Logger('esri').info("kml layer loaded");
		    });

		    kml.on("error",function(){
		    	$si.Logger('esri').error("Error on kml layer loading. Cause " + e.error.message);
		    });

		},

		/** Methods for kml kmz unload **/
		removeKMLNetworkLink: function (kmlUrl, kmlId) {
			this._removeMapLayer(kmlId);
		},

		/** Method to enable overlay feature **/
		onMapOverLayFeatureChecked : function(data){
			if(data && data.id){
				switch(data.id){
					case 3:
						this._addNavigationControls(data.checked);
					break;
				}
			}
		},

		_addNavigationControls : function(isChecked){
			if(isChecked){
				var  navToolbar = new esriNavigation(this.options.map);
			}
		},

		/* lasso functions - start */
		_createLassoTool : function() {
			var $this = this;
			this.options.lassoDrawTool = new esriDraw(this.options.map);
          	this.options.lassoDrawTool.on("draw-end", this._addLassoToMap.bind(this));

          	this.options.lassoEditTool = new esriEdit(this.options.map);

          	/** Refresh lasso Filter on lasso edit **/
          	this.options.lassoEditTool.on('graphic-move-stop',function(evt){
          		$this._triggerApplyLassoFilter();
          	});
          	this.options.lassoEditTool.on('scale-stop',function(evt){
          		$this._triggerApplyLassoFilter();
          	});
          	this.options.lassoEditTool.on('vertex-move-stop',function(evt){
          		$this._triggerApplyLassoFilter();
          	});
          	this.options.lassoEditTool.on('rotate-stop',function(evt){
          		$this._triggerApplyLassoFilter();
          	});

          	this.options.initialMapZoom = this.getMapZoom();
          	this.options.initialMapLocation = this.getMapLocation();
		},

		_triggerApplyLassoFilter : function(){
			$($si.viewer).trigger("applyLassoFilter", true);
		},

		_activateLassoTool : function(esriDrawToolId) {
          this.options.lassoDrawTool.activate(esriDrawToolId);
          //this.options.map.hideZoomSlider();
        },

		_activateEditLassoTool: function(graphic) {
          var tool = 0 | esriEdit.MOVE | esriEdit.SCALE | esriEdit.ROTATE;
		  if(graphic.attributes.shapeType == 1) {//use polygon constant
				tool = tool | esriEdit.EDIT_VERTICES;
		  }

          var options = {
            allowAddVertices: true,
            allowDeleteVertices: true,
            uniformScaling: true
          };
          this.options.lassoEditTool.activate(tool, graphic, options);
          this.options.isLassoEditToolActive = true;
          this.updateActivateLasso(graphic);
        },

		_deActivateEditLassoTool : function() {
			if(this.options.isLassoEditToolActive == true && this.options.lassoEditTool) {
            	this.options.lassoEditTool.deactivate();
            	this.options.isLassoEditToolActive = false;
            	this.options.currentLassoGraphic = null;
            }
		},

		_addLassoToMap : function(evt) {
	      var symbol = this._getLassoSymbol();
          var graphic = new esriGraphic(evt.geometry, symbol);

          var lassoGraphicsLayer = this._showLassoGraphicsLayer(true);
          lassoGraphicsLayer.add(graphic);

          this.options.currentLassoGraphic = graphic;
          this.options.isLassoEditToolActive = false;

          this.options.lassoDrawTool.deactivate();

          this._triggerApplyLassoFilter();
          //this.options.map.showZoomSlider();
		},

		_toEsriColor : function(hexColor,opacity){
			var color = new esriColor('#'+hexColor);
			color.a = parseInt(opacity)/100;

			return color;
		},

		_getLassoSymbol : function(){
			var lassoColor = this._toEsriColor(this.fillColor,this.opacity);

			var lassoSymbol = new esriSimpleFillSymbol();
			lassoSymbol.color = lassoColor;

			var outLineSymbol = new esriSimpleLineSymbol();
			outLineSymbol.width = this.lineThickness;
			outLineSymbol.color = lassoColor;

			lassoSymbol.outline = outLineSymbol;
			this.options.lassoSymbol =  lassoSymbol;

			return this.options.lassoSymbol;
		},

		_getLassoGraphicsLayer : function() {
			return this._getMapLayer(this.options.LASSO_GRAPHIC_LAYER_ID);
		},

		_createLassoGraphicsLayer : function() {
			if(!this._hasMapLayer(this.options.LASSO_GRAPHIC_LAYER_ID)) {
	          var lassoGraphicsLayer = new esriGraphicsLayer();
	          lassoGraphicsLayer.id = this.options.LASSO_GRAPHIC_LAYER_ID;
	          this._addMapLayer(lassoGraphicsLayer);
	          return lassoGraphicsLayer;
          	}
		},

		_showLassoGraphicsLayer : function(isShow) {
			var $this = this;
			var lassoGraphicsLayer = this._getLassoGraphicsLayer();

			if(isShow) {
				if(lassoGraphicsLayer === undefined) {
					lassoGraphicsLayer = this._createLassoGraphicsLayer();
				} else {
					lassoGraphicsLayer.show();
				}
			} else {
				if(lassoGraphicsLayer) {
					lassoGraphicsLayer.hide();
				}
			}

			return lassoGraphicsLayer;
		},

		drawLassoPolygon : function() {
			this._activateLassoTool(esriDraw.POLYGON);
		},

		drawLassoCircle : function() {
			this._activateLassoTool(esriDraw.CIRCLE);
		},

		drawLassoRectangle : function() {
			this._activateLassoTool(esriDraw.RECTANGLE);
		},

		/** reset the lasso graphic on lasso toolbar hide **/
		resetRubberBandFeatures:function() {
			if(this.options.currentLassoGraphic && this.options.currentLassoGraphicClone){
	    		var lassoId =  this.options.currentLassoGraphic.attributes.id
	    		//Remove edited lasso
	    		this.removeLassoFromMap(lassoId);
	    		//Add original lasso
	    		this.addLassoGraphicToMap(this.options.currentLassoGraphicClone);
	    		this.options.currentLassoGraphicClone = null;
	    		//deactivate editing mode
	    		this._deActivateEditLassoTool();
	    	}
		},


		setLassoData: function(){
			if(this.options.currentLassoGraphic){
				var lassoData = this.options.currentLassoGraphic.toJson();
				if(this.options.isLassoEditToolActive){
		    		$si.events.triggerLassoEvent($si.events.LassoEvents.saveNewlyEditedLassoOnDB, {id: lassoData.attributes.id, lassoData: lassoData});
		    	}else{
		    		$si.events.triggerLassoEvent($si.events.LassoEvents.saveNewlyCreatedLassoOnDB, {lassoData: lassoData});
		    	}
			}
		},

		drawSelectLasso: function(lassoEventData) {
			if(lassoEventData && lassoEventData.data){
				var lassoDataObj = lassoEventData.data;
				var lassoGraphic = this._getLassoGraphic(lassoDataObj.id);
				if(lassoGraphic) {
					lassoGraphic.show();
				} else {
					var lassoObj = JSON.parse(lassoDataObj.lassoData);
					var lassoGraphicsLayer = this._showLassoGraphicsLayer(true);
					var lassoGraphic = new esriGraphic(lassoObj);
					//id and name
					lassoGraphic.attributes = {id:lassoDataObj.id,name:lassoDataObj.name,type:this.GRAPHIC_TYPE_LASSO, shapeType:this.shapeType};
					lassoGraphicsLayer.add(lassoGraphic);
				}
			}
		},

		removeSelectLasso : function(lassoEventData) {
			if(lassoEventData && lassoEventData.data){
				var lassoDataObj = lassoEventData.data;
				var lassoGraphic = this._getLassoGraphic(lassoDataObj.id);
				if(lassoGraphic) {
					lassoGraphic.hide();
				}
			}
		},

		viewLassoOnMap : function (lasso){
			var lassoEventData = {
					data : lasso,
			}

			if(lasso.selected){
				this.drawSelectLasso(lassoEventData);
			}else{
				this.removeSelectLasso(lassoEventData);
			}
		},

		_getLassoGraphic : function(lassoId) {
			if(lassoId){
				var graphicsLayer = this._getLassoGraphicsLayer();
				var returnGraphic;
				if(graphicsLayer && graphicsLayer.graphics) {
					$.each(graphicsLayer.graphics,function(index,graphic){
						if(graphic.attributes && graphic.attributes.id == lassoId){
							returnGraphic = graphic;
							return false;
						}
					});
				}
				return returnGraphic;
			}
		},

		postNewLassoCreateAction: function(lassoDataObj){
			this.options.currentLassoGraphic.attributes = {id:lassoDataObj[0].id, name:lassoDataObj[0].name, type:this.GRAPHIC_TYPE_LASSO, shapeType:lassoDataObj[0].shapeType};
	    },

	    /** zoom to lasso **/
	    zoomToLassoOnMap : function(lassoInfo){
	    	if(this.options.map){
	    		var lassoObj = this._getLassoGraphic(lassoInfo.id);
	    		if(lassoObj && lassoObj.geometry){
	    			this.options.map.setExtent(lassoObj.geometry.getExtent(),true);
	    		}
	    	}
	    },

	    /** newly created lasso from esri map **/
	    clearNewDrawLasso : function(){
	    	var lassoGraphicsLayer = this._getLassoGraphicsLayer();
	    	if(this.options.currentLassoGraphic && lassoGraphicsLayer){
		        lassoGraphicsLayer.remove(this.options.currentLassoGraphic);
		        this.options.currentLassoGraphic = null;
	    	}
	    	this.options.lassoDrawTool.deactivate();
	    },

	    /** lasso is deleted from db. This method remove it from the view **/
	    removeLassoFromMap : function(lassoId){
	    	var graphic = this._getLassoGraphic(lassoId);
	    	var lassoGraphicsLayer = this._getLassoGraphicsLayer();
	    	if(graphic && lassoGraphicsLayer){
		        lassoGraphicsLayer.remove(graphic);
	    	}
	    },

	    /** Lasso color and thickness updation **/
	    updateLassoAppearance : function(){
	    	if(this.options.currentLassoGraphic){
	    		this.options.currentLassoGraphic.setSymbol(this._getLassoSymbol());
	    	}
	    },

	    /** update activate lasso **/
	    updateActivateLasso : function(graphic){
	    	if(graphic){
	    		//Events to enable save button
		    	$($si.viewer).trigger("activateButtons");
		    	$($si.viewer).trigger("deactivateClearButton");
		    	this.options.currentLassoGraphic = graphic;
		    	this.options.currentLassoGraphicClone = new esriGraphic(graphic.toJson());
	    	}
	    },

	    postLassoEditAction: function(lassoDataObj){
	    	this._deActivateEditLassoTool();
	    },

	    addLassoGraphicToMap : function(graphic){
	    	var lassoGraphicsLayer = this._showLassoGraphicsLayer(true);
            lassoGraphicsLayer.add(graphic);
	    },

		getLassoServerObject : function(lassoObj) {
			if(lassoObj) {
				var lasso = $.extend(true, {}, lassoObj);
				var lassoJson = lasso.lassoData;
				var lassoGraphic = new esriGraphic(JSON.parse(lassoJson));
				var lassoGraphicGeometry = esriUtis.webMercatorToGeographic(lassoGraphic.geometry);
				var lassoCoordinatesObj = {coordinates:this._toCoordinateString(lassoGraphicGeometry)};

				lasso.lassoData = JSON.stringify(lassoCoordinatesObj);

				return lasso;
			}
			return lassoObj;
		},

		getLassoJsonObjFromCurrentCreatedLasso : function() {
			var lassoJosnObj = {}

			if(this.options.currentLassoGraphic != null){
				lassoJosnObj.coordinates = this._toCoordinateString(this.options.currentLassoGraphic.geometry);
				return lassoJosnObj;
			}

			return null;
		},


		/* lasso functions - end */

		/* drawer/toolbar functions - start */
		 /** triggered from drawer on map type change **/
		    showBaseMapLayer : function(baseLayer){
		    	if(this.options.currentBaseLayer) {
	    			this._showMapLayer(this.options.currentBaseLayer, false);
	    		}
	    		this._showMapLayer(baseLayer, true);
	    		this.options.currentBaseLayer = baseLayer;
		    },

		    /** triggered from drawer on opacity change **/
		    setBaseMapOpacity : function(opacity){
		    	if(this.options.currentBaseLayer) {
	    			var layer = this._getMapLayer(this.options.currentBaseLayer.id);
	    			if(layer) {
	    				layer.setOpacity(opacity);
	    			}
	    		}
		    },

			_isCoordinate : function (location) {
				if(location) {
					//replace negative values
					location = location.replace(/-/g, '');
					var hasLetter = /^[a-zA-Z]+$/.test(location);
					if(!hasLetter) {
						var coordsArray = location.split(',');
		  				if(coordsArray != null && coordsArray.length >=2) {
		  					try {
		  						return parseFloat(coordsArray[0]) && parseFloat(coordsArray[1]);
		  					} catch(e) {
		  						//ignore
		  					}
		  				}
	  				}
				}
				return false;
			},

		    /** triggered from toolbar after location search */
		    _locateAddress : function(location) {
		    	//check if location is a coordinate
			  if(this._isCoordinate(location)) {
			  	var coordsArray = location.split(',');
			  	this._lookatRange(coordsArray[1]+","+coordsArray[0]);
			  	return;
			  }

		 	  this.options.locator.outSpatialReference = this.options.map.spatialReference;
		 	  var address = {
	            "SingleLine": location
	          };

	          var options = {
	            address: address,
	            outFields: ["Loc_name"]
	          }
	          this.options.locator.addressToLocations(options);
		    },

			onLocationSearchComplete : function(evt) {
            	var geom;
         	 	$.each(evt.addresses, function(index, candidate) {
		            console.log("location score -> "+candidate.score);
		            if (candidate.score > 80) {
		             geom = candidate.location;
		             return false; //break out of loop after one candidate with score greater  than 80 is found.
		            }
		         });

		         if ( geom !== undefined ) {
		            this.options.map.centerAndZoom(geom, this.options.map.getMaxZoom());
		         } else {
		         	//TODO: show error message
		          	console.log("location not found");
		         }
			},
		/* drawer/toolbarfunctions - end */

			/** Esri Ruler start **/
			_distanceCalculation : function(mode, measurementSystem, longDistance, shortDistance){
				this.options.distanceParameter.distanceUnit = esriGeometryService.UNIT_KILOMETER;
				if(measurementSystem == "imperial"){
					this.options.distanceParameter.distanceUnit = esriGeometryService.UNIT_STATUTE_MILE;
				}
				this.options.rulerMajorUnit = longDistance;
				this.options.rulerMinorUnit = shortDistance;
				this.options.rulerInputPoints = [];
				this.options.rulerDistance = 0;
				this.options.map.graphics.clear();
				this.options.isRulerActive = (mode == "active");
			},

			_startRulerMeasurement : function(evt){
				var $this = this;
				var inPoint = new esriPoint(evt.mapPoint.x, evt.mapPoint.y, this.options.map.spatialReference);
		        this.options.rulerInputPoints.push(inPoint);

		        //define the symbology for the graphics
		        var markerSymbol = new esriSimpleMarkerSymbol(esriSimpleMarkerSymbol.STYLE_CIRCLE, 5, new esriSimpleLineSymbol(esriSimpleMarkerSymbol.STYLE_SOLID, new esriColor([84, 84, 84]), 1), new esriColor([158, 184, 71, 0.65]));
		        var polylineSymbol = new esriSimpleLineSymbol(esriSimpleLineSymbol.STYLE_SOLID, new esriColor([255, 0, 0]), 4);
		        var font = new esriFont("18px", esriFont.STYLE_NORMAL, esriFont.VARIANT_NORMAL, esriFont.WEIGHT_BOLDER);

		        this.options.map.graphics.add(new esriGraphic(evt.mapPoint, markerSymbol));

		        var textSymbol;
		        var numberOfPoints = this.options.rulerInputPoints.length;
		        if(numberOfPoints > 1) {
		          /** distance calculation **/
		          this.options.distanceParameter.geometry1 = this.options.rulerInputPoints[numberOfPoints - 2];
		          this.options.distanceParameter.geometry2 = this.options.rulerInputPoints[numberOfPoints - 1];

		          //draw a polyline to connect the input points
		          var polyline = new esriPolyline(this.options.map.spatialReference);
		          polyline.addPath([this.options.distanceParameter.geometry1, this.options.distanceParameter.geometry2]);
		          this.options.map.graphics.add(new esriGraphic(polyline, polylineSymbol));

		          var distanceLabel;
//		          //Calculate the geodesic distance
		          this.options.geometryService.distance(this.options.distanceParameter, function(distance) {
		        	  $this.options.rulerDistance += parseFloat(distance);
		        	  if($this.options.rulerDistance >= 1){
		        		  distanceLabel = $this.options.rulerDistance.toFixed(2) + " " + $this.options.rulerMajorUnit;
		        	  }else{
		        		  distanceLabel = $this.options.rulerDistance.toFixed(2) * 100 + " " + $this.options.rulerMinorUnit;
		        	  }
		        	  textSymbol = new esriTextSymbol(distanceLabel, font, new esriColor([204, 102, 51]));
				      textSymbol.yoffset = 8;
				      $this.options.map.graphics.add(new esriGraphic(evt.mapPoint, textSymbol));
		        });
		    }
		},
		/** esri Ruler ends **/


		/** Esri Drawer Overlay Features start**/
		onMapOverLayFeatureChecked : function(data){
			if(data){
				switch(data.id){
					case 2:
						this._showNavigationControls(data.checked);
					break;
					case 3:
						this._showOverviewMap(data.checked);
					break;
					case 4:
						this._showScaleBar(data.checked);
					break;
				}
			}
		},

		_showOverviewMap : function(isVisible){
			if(!this.options.overviewMap){
				this.options.overviewMap = new esriOverviewMap({
			          map: this.options.map,
			          attachTo: "bottom-right",
			     });
				this.options.overviewMap.startup();
			}
			if(isVisible){
				this.options.overviewMap.show();
			}else{
				this.options.overviewMap.hide();
			}
		},

		_showScaleBar : function(isVisible){
			if(!this.options.scaleBar){
				this.options.scaleBar = new esriScalebar({
			          map: this.options.map,
			          scalebarUnit: $si.mapUtils.isImperial() ? "english" : "metric",
			          attachTo: "bottom-center",
			        });
			}
			if(isVisible){
				this.options.scaleBar.show();
			}else{
				this.options.scaleBar.hide();
			}
		},

		_showNavigationControls : function(isVisible){
			if(this.options.zoomSlider && this.options.zoomSlider.length > 0){
				if(isVisible){
					$(this.options.zoomSlider).data("kendoSlider").wrapper.show();
				}else{
					$(this.options.zoomSlider).data("kendoSlider").wrapper.hide();
				}
			}
		},

		/** Esri Drawer Overlay Features end**/

		/** Esri Drawer Layer select De-select start **/
		showEnterpriseLayer : function(layerData){
			var $this = this;
			
			if(layerData && !layerData.layerType){
				layerData = layerData.dataObj;
			}
			
			if(layerData && layerData.layerType){
				requirejs([layerData.layerType],function(esriLayer){
					var params = $.extend({},layerData.customParams,{
														id		 : layerData.id,
														opacity  : layerData.opacity,
														minScale : layerData.minScale,
														maxScale : layerData.maxScale,

													});
					var layer = new esriLayer(layerData.layerUrl,params);
					$this._addMapLayer(layer);
				});
			}
		},

		removeEnterpriseLayer : function(layerData){
			if(layerData && layerData.id){
				this._removeMapLayer(layerData.id);
			}
		},

		getMapZoom : function(){
			if(this.options.map){
				return this.options.map.getZoom();
			}
		},

		getMapLocation : function(){
			if(this.options.map){
				return this.options.map.extent;
	    	}
		},

		setMapZoom : function(scale){
			if(this.options.map){
	    		this.options.map.setScale(scale);
	    	}
		},

		setMapLocation : function(extent){
			if(this.options.map){
				this.options.map.setExtent(new esriExtent(extent));
	    	}
		},

		resetMapZoom : function() {
			if(this.options.initialMapZoom){
				this.setMapZoom(this.options.initialMapZoom);
			}
		},

		resetMapLocation : function() {
			if(this.options.initialMapLocation){
				this.setMapLocation(this.options.initialMapLocation);
			}
		},

		_highlight : function(coordsArray,dashboardId,businessViewId, hightLightProperties) {
			this.highlightGeoFeature(coordsArray, dashboardId, businessViewId, hightLightProperties);
		},

		/** Pass empty CoordsArray to remove all highLight **/
		highlightGeoFeature : function(coordsArray,dashboardId,businessViewId,hightLightProperties) {
			var highLightColor = this.options.highlightColor ? this.options.highlightColor : this.DEFAULT_HIGHLIGHT_COLOR;
			highLightColor = new esriColor(highLightColor);
			if(businessViewId && hightLightProperties.businessViewName && coordsArray){
				var layerId = businessViewId+"_"+hightLightProperties.businessViewName;
				/** highlight is window dependent **/
				//var highlightId = layerId +"_" + dashboardId;
				var graphicLayer = this._getMapLayer(layerId);
				if(graphicLayer){
					var graphics = graphicLayer.graphics;
					if(graphics){
						$.each(graphics,function(index,graphic){
							if(graphic && graphic.symbol && graphic.symbol.outline && graphic.id == "highlightSymbol"){
								if(coordsArray.indexOf(graphic.coordinate) != -1){
									highLightColor.a = 1;
								}else{
									highLightColor.a = 0;
								}
								graphic.symbol.outline.setColor(highLightColor);
								graphic.setSymbol(graphic.symbol);
							}
						});
					}
				}
			}
		},

		getActiveLassos : function(){
			var lassoArray = [];
			if(this.options.currentLassoGraphic){
				lassoArray.push(this.getLassoServerObject({
					name 	  : "NewLasso",
					lassoData : JSON.stringify(this.options.currentLassoGraphic.toJson())
				}));
			}
			return lassoArray;
		},

	});
});
