/**
 * Google Earth layer operations are written in it.
 */
define([
    'jquery',
    'jquery-ui',
    'map/ge/com.spacetimeinsight.viewer.ui.geMap',
    'map/ge/com.spacetimeinsight.viewer.ui.geLayerWindowOperations',
    'windowUtil',
],function($){

	$.extend($.spacetimeinsight.siViewerGoogleEarth.prototype, {

		 _placemark : null,
		 _polyPlacemark : null,
		 _highlightPlacemarksArray : [],
		 _defaultHighlightPlacemarkUrl :  $si.viewer.serverUrl+'images/highlight.png',
		 _defaultHighlightPlacemarkScale :"1",
		 _lastHighlightKey : null,
		 VIEW_FORMAT : "bboxWest=[bboxWest]&bboxSouth=[bboxSouth]&bboxEast=[bboxEast]&bboxNorth=[bboxNorth]&lookatLon=[lookatLon]&lookatLat=[lookatLat]&lookatRange=[lookatRange]&lookatTilt=[lookatTilt]&lookatHeading=[lookatHeading]&horizFov=[horizFov]&vertFov=[vertFov]&horizPixels=[horizPixels]&vertPixels=[vertPixels]&terrainEnabled=[terrainEnabled]",

		_addBusinessViewNetworkLinks : function (businessViewMetadataEvent) {
			var businessViewId = businessViewMetadataEvent.id;
			var linksMap =  businessViewMetadataEvent.links;
			if(linksMap) {
				var networkLinksMap = {};
				for (var businessViewName in linksMap) {
				  if (linksMap.hasOwnProperty(businessViewName)) {
				  	//if(linksMap[businessViewName].data.properties['needsmap'] == true) {
					    networkLinksMap[businessViewName] = this._createBusinessViewNetworkLink(linksMap[businessViewName]);
				  	//}
				  }
				}

				this.options.businessViewNetworkLinks[businessViewId] = networkLinksMap;
			}
		},

		_createBusinessViewNetworkLink : function(businessViewLink) {
			var ge = this.options.gePluginInstance;

			//create link
	        var link = ge.createLink("");
	        link.setHref(businessViewLink.url+ this._getViewFormatParams());

			//create network link
	        var networkLink = ge.createNetworkLink("");
	        //networkLink.setDescription("NetworkLink open to fetched content");
	        //networkLink.setName("Open NetworkLink");
	        if(businessViewLink.autoZoom){
	            networkLink.setFlyToView(true);
	        }
	        networkLink.setLink(link);

			//add the network link to google earth
	        ge.getFeatures().appendChild(networkLink);

	        return networkLink;
		},

		_refreshBusinessViewNetworkLink : function (businessViewId, businessViewName, params) {
			var networkLink = this.options.businessViewNetworkLinks[businessViewId][businessViewName];
			var link = networkLink.getLink();

			var businessViewLinks = $si.businessViewUtil.getBusinessViewMetadata(businessViewId).links;
			var businessViewLink = businessViewLinks[businessViewName];
			var linkUrl = businessViewLink.url+ this._getViewFormatParams();

			linkUrl += "&temprandomvalue="+Math.random();
            if(params){
            	$.each(params,function(key,value){
            		linkUrl += "&" + key + "=" + value;
            	});
            }
            link.setHref(linkUrl);
            networkLink.setLink(link);
		},

		_removeBusinessViewNetworkLinks : function (businessViewId) {
			var networkLinksMap = this.options.businessViewNetworkLinks[businessViewId];
			for (var businessViewName in networkLinksMap) {
			  if (networkLinksMap.hasOwnProperty(businessViewName)) {
			    this.options.gePluginInstance.getFeatures().removeChild(networkLinksMap[businessViewName]);
			  }
			}

	        delete this.options.businessViewNetworkLinks[businessViewId];
		},

		/*
		//TODO: remove this method
		_onLayerLoadSuccess : function(layerId,xml){
			var links = this._extractLink(xml);
			var $this = this;
			$(links).each(function(index,link){
				$this._loadNetworkLink(layerId,link);
			});
			$si.Logger('geLayerOperations').info("Layer loaded successfully");
		},

		_onLayerLoadFailure : function(error){
			$si.Logger('geLayerOperations').error("Error while loading the layer");
		},

		//extracts the KML url from the network link KML sent by MAGMA
		_extractLink : function (xml){
				var $this = this;
				var links = [];
			    var link = {};

			    var flyToView = $(xml).find("flyToView");
			    if(flyToView && flyToView.length > 0){
			    	flyToView = $(flyToView[0]).text();
					if(flyToView == "1"){
							flyToView = "true";
					}
			    }

			    var nwLinks = $(xml).find("NetworkLink");
			    if(nwLinks){
				    $(nwLinks).each( function(index,networkLink){
				    	var linkNode = $(networkLink).find("Link");
				    	link = {};
				    	link["href"] = linkNode.find("href").text();
				    	link["refreshInterval"] = linkNode.find("refreshInterval").text() ? linkNode.find("refreshInterval").text() : 0;
				    	link["viewRefreshMode"] = $this._getViewRefreshMode(linkNode.find("viewRefreshMode").text());
				    	link["refreshMode"] = $this._getRefreshMode(linkNode.find("refreshMode").text());
				    	link["viewRefreshTime"] = linkNode.find("viewRefreshTime").text() ? linkNode.find("viewRefreshTime").text() : 0;
				    	link["flyToView"] = flyToView;
				    	links.push(link);
				    });
				}

			    return links;

		},

		//TODO: remove this method
		loadLayer : function(layerId,layerUrl){
			var $this = this;
			var params = {
							rendertype : "kml",
							languageId : $si.viewer.userModel.userInfo.languageId,
							languageCd : $si.viewer.userModel.userInfo.languageCd,
						};
			$si.xmlUtil(layerUrl,function(xml){
								$this._onLayerLoadSuccess(layerId,xml);
							},this._onLayerLoadFailure.bind(this),params);
		},

		unLoadLayer : function(layerId){
			this._removeNetworkLink(layerId);
		},


		_loadNetworkLink : function(layerId,linkParams) {
			var ge = this.options.gePluginInstance;

	        var networkLink = ge.createNetworkLink("");
	        networkLink.setDescription("NetworkLink open to fetched content");
	        networkLink.setName("Open NetworkLink");
	        if(linkParams.flyToView=="true"){
	            networkLink.setFlyToView(true);
	        }
	        var link = this._createLink(linkParams);

	        //Auto refresh is active or not
	        this._setLayerRefreshMode(layerId,linkParams);

	        var nLink = linkParams.href;
	        nLink = nLink.replace(/&rendertype=kml/g,"");
	        if(linkParams.viewRefreshMode != ge.VIEW_REFRESH_ON_STOP) {
	            nLink += this._getViewFormatParams();
	        }

	        this._setSessionId(layerId, nLink);

	        link.setHref(nLink);
	        networkLink.setLink(link);
	        this._addNetworkLink(layerId,networkLink,linkParams);
	    },

	    _setSessionId : function(layerId, nLink){
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

	         var currLayer = $si.businessViewUtil.getBusinessViewById(layerId);
			if(currLayer){
				currLayer.ecosid =  sessionId;
				currLayer.artefactName =  artefactName;
			}
	    },

	    _addNetworkLink : function(layerId,networkLink,linkParams) {
	        if(!this.options.networkLinks[layerId]) {
	        	this.options.networkLinks[layerId] = [];
	        }
	        this.options.networkLinks[layerId].push({networkLink : networkLink,linkParams : linkParams});
	        this.options.gePluginInstance.getFeatures().appendChild(networkLink);

	        var networkUrl = networkLink.getLink().getHref();
	        this.getLayerWindows(layerId,networkUrl);

	        this._trigger("onLayerLoadOnMap",null,{layerId:layerId,url: networkUrl});
	    },

	    _removeNetworkLink : function(layerId){
	    	var $this = this;
	        var networkLinks = this.options.networkLinks[layerId];
	        if(networkLinks) {
	        	$(networkLinks).each(function(index,networkLink){
	        		if(networkLink){
	        			$this.options.gePluginInstance.getFeatures().removeChild(networkLink.networkLink);
	        		}
	        	});
	        }
	        delete this.options.networkLinks[layerId];
	    },
		*/
	    _getViewFormatParams : function() {
	    	var ge = this.options.gePluginInstance;
	        var latLonBox = ge.getView().getViewportGlobeBounds();
	        var lookAt =  ge.getView().copyAsLookAt(ge.ALTITUDE_ABSOLUTE);
	        return  "&bboxWest="+latLonBox.getWest()+"&bboxSouth="+latLonBox.getSouth()+"&bboxEast="+latLonBox.getEast()+"&bboxNorth="+latLonBox.getNorth()+
	            "&lookatLon="+lookAt.getLongitude()+"&lookatLat=="+lookAt.getLatitude()+"&lookatRange="+lookAt.getRange()+"&lookatTilt="+lookAt.getTilt()+
	            "&lookatHeading="+lookAt.getHeading();
	    },

		_getCameraEventData : function() {
			var cameraEvent = {};

			var ge = this.options.gePluginInstance;
	        var latLonBox = ge.getView().getViewportGlobeBounds();
	        var lookAt =  ge.getView().copyAsLookAt(ge.ALTITUDE_ABSOLUTE);

			cameraEvent.bboxWest = latLonBox.getWest();
			cameraEvent.bboxSouth = latLonBox.getSouth();
			cameraEvent.bboxEast = latLonBox.getEast();
			cameraEvent.bboxNorth = latLonBox.getNorth();
			cameraEvent.lookatLon = lookAt.getLongitude();
			cameraEvent.lookatLat = lookAt.getLatitude();
			cameraEvent.lookatRange = lookAt.getRange();
			cameraEvent.lookatTilt = lookAt.getTilt();
			cameraEvent.lookatHeading = lookAt.getHeading();

			return cameraEvent;
		},
		/*
	    _getRefreshMode : function(refreshModeStr) {
			var ge = this.options.gePluginInstance;
	        var refreshMode = ge.REFRESH_ON_CHANGE;

	        if(refreshModeStr == "onInterval") {
	            refreshMode = ge.REFRESH_ON_INTERVAL;
	        } else if(refreshModeStr =="onExpire") {
	            refreshMode = ge.REFRESH_ON_EXPIRE;
	        }

	        return refreshMode;
	    },

	    _getViewRefreshMode : function(viewRefreshModeStr) {
	    	var ge = this.options.gePluginInstance;
	        var viewRefreshMode = ge.VIEW_REFRESH_NEVER;

	        if(viewRefreshModeStr =="onStop") {
	            viewRefreshMode = ge.VIEW_REFRESH_ON_STOP;
	        } else if(viewRefreshModeStr =="onRegion") {
	            viewRefreshMode = ge.VIEW_REFRESH_ON_REGION;
	        }
	        return viewRefreshMode;
	    },
		*/
	    _setCurrentView : function (lookatStr) {
	    	var ge = this.options.gePluginInstance;
	        var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
	        var lookAtArray = lookatStr.split(",");

	        if(lookAtArray[0]) {
	            lookAt.setLongitude(parseFloat(lookAtArray[0]));
	        }

	        if(lookAtArray[1]) {
	            lookAt.setLatitude(parseFloat(lookAtArray[1]));
	        }

	        if(lookAtArray[2]) {
	            lookAt.setRange(parseFloat(lookAtArray[2]));
	        }

	        if(lookAtArray[3]) {
	            lookAt.setTilt(parseFloat(lookAtArray[3]));
	        }

	        if(lookAtArray[4]) {
	            lookAt.setHeading(parseFloat(lookAtArray[4]));
	        }

	        if(lookAtArray[5]) {
	            lookAt.setAltitude(parseFloat(lookAtArray[5]));
	        }

	        if(lookAtArray[6]) {
	            if(lookAtArray[6] == 'relativeToGround') {
	                lookAt.setAltitudeMode(ge.ALTITUDE_RELATIVE_TO_GROUND);
	            } else if(lookAtArray[6] == 'clampToGround') {
	                lookAt.setAltitudeMode(ge.ALTITUDE_CLAMP_TO_GROUND);
	            } else if(lookAtArray[6] == 'absolute') {
	                lookAt.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
	            } else if(lookAtArray[6] == 'clampToSeaFloor') {
	                lookAt.setAltitudeMode(ge.ALTITUDE_CLAMP_TO_SEA_FLOOR);
	            } else if(lookAtArray[6] == 'relativeToSeaFloor') {
	                lookAt.setAltitudeMode(ge.ALTITUDE_RELATIVE_TO_SEA_FLOOR);
	            }
	        }
	        ge.getView().setAbstractView(lookAt);
	    },

	    _lookatRangeForPolyLine : function(coordStr) {
			gex.util.flyToObject(polyPlacemark, {boundsFallback: true, aspectRatio: 1});
		},

		_lookatRange : function(coordStr, range) {
			var ge = this.options.gePluginInstance;
			if(coordStr != null) {
				var coords = coordStr.split(",");
				if (coords != null){
					var noOfCoords = coords.length;
					if (noOfCoords > 4){
						//lookatRangeForPolyLine(coordStr);
					} else {
						var zoomLevel = 0;
						var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
						if(coords[1]) {
							lookAt.setLatitude(parseFloat(coords[1]));
						}
						if(coords[0]) {
							lookAt.setLongitude(parseFloat(coords[0]));
						}
						if(coords[2]) {
							lookAt.setAltitude(parseFloat(coords[2]));
						}
									if(coords.length == 4 && coords[3]) {
							zoomLevel = parseFloat(coords[3]);
						} else if(range != null) {
							zoomLevel = parseFloat(range);
						}
						lookAt.setRange(zoomLevel);
						ge.getView().setAbstractView(lookAt);
					}
				}
			}
		},

		_highlight : function(coordsArray,dashboardId,layerId, hightLightProperties) {
			var $this = this;
			$this.removeAllChildren(layerId+"_"+dashboardId);
			if(coordsArray != null && coordsArray.length > 0) {
				$this.highlightGeoFeature(coordsArray,dashboardId,layerId,hightLightProperties);
			}
		},

		removeAllChildren : function(hkey) {
			var ge = this.options.gePluginInstance;
			var $this = this;
			try {
				var pMark = new Array();
				pMark =  $this._highlightPlacemarksArray[hkey];
				if(pMark != undefined){
					for(var i = 0; i <pMark.length;i++){
						if(pMark[i]	!= null){
							ge.getFeatures().removeChild(pMark[i]);
						}
					}
					$this._highlightPlacemarksArray[hkey] = null;
				}
    		} catch (e) {
        		alert('Error ['+e.message+'] occurred while highlighting the coordinate in geplugin');
    		}
		},

		_toGEColor : function(hexColor) {
			if(hexColor) {
				if(hexColor.indexOf("#") == 0) {
					hexColor = hexColor.substring(1,7);
				}
				hexColor = "ff"+hexColor.substring(4,6) +  hexColor.substring(2,4) + hexColor.substring(0,2);
			}

			return hexColor;
		},

		 highlightGeoFeature : function(coordsArray,dashboardId,layerId,hightLightProperties) {
			 var $this = this;
			var isPlacemark=true;
			//color = $this.checkForValidColor(color);
			var noOfCoords = coordsArray == null ? 0 : coordsArray.length;
			var polyPlacemarksArray = new Array();
			var pointPlacemarkArray = new Array();
			var highLightColor=(this.options.highlightColor)?this.options.highlightColor:"#42fdff";

			for(var i = 0; i < noOfCoords; i++) {
				if(coordsArray[i] != null) {
					var coords = coordsArray[i].split(" ");
					if(coords != null && coords.length > 1) {
					isPlacemark=false;
						if(coords.length > 2 && coords[0] == coords[coords.length-1]) {
							$this._polyPlacemark = $this.gex.dom.addPolygonPlacemark([], {
									style: {
									poly: '0000ff00',
									line: { width: 3, color:highLightColor }
								}
							});
							$this.setPolygonCoordinates($this._polyPlacemark, coordsArray[i]);
						}else {
							$this._polyPlacemark = $this.gex.dom.addLineStringPlacemark([], {
									style: {
									poly: '0000ff00',
									line: { width: 3, color:highLightColor }
								}
							});
							$this.setLineStringCoordinates($this._polyPlacemark, coordsArray[i]);
						}
						$this._polyPlacemark.setVisibility(true);
						polyPlacemarksArray[i] = $this._polyPlacemark;
						pointPlacemarkArray = pointPlacemarkArray.concat(coords);
					}
				}
			}
			if(pointPlacemarkArray != null && pointPlacemarkArray.length > 0) {
				coordsArray = pointPlacemarkArray;
			}

			var placemarksArray = new Array();
			if(isPlacemark == true){
				 placemarksArray = $this.highLightPlacemark(coordsArray,hightLightProperties);
			 }

			if($this._lastHighlightKey!=null) {
				$this.removeAllChildren($this._lastHighlightKey);
				$this._lastHighlightKey=null;
			}

			$this._lastHighlightKey=layerId+"_"+dashboardId;
			$this._highlightPlacemarksArray[layerId+"_"+dashboardId] = placemarksArray.concat(polyPlacemarksArray);
		},
		convertHexTOGEHexFormat :function(hex,opecity){
			// regular hex color with alpha format 'AARRGGBB'  to kml hex color 'AABBGGRR'
			var hexColor=hex.replace("#","");
			return "cc"+hexColor;
			//AARRBBGG
			//return "cc"+hexColor.substring(0,2)+hexColor.substring(4,6)+hexColor.substring(2,4);

			//AARRGGBB
			//return "cc"+hexColor.substring(0,2)+hexColor.substring(2,6)+hexColor.substring(2,4);

			//AABBRRGG
			//return "cc"+hexColor.substring(4,6)+hexColor.substring(0,2)+hexColor.substring(2,4);

			//AABBGGRR
			//return "cc"+hexColor.substring(4,6)+hexColor.substring(2,4)+hexColor.substring(0,2);

			//AAGGRRBB
			//return "cc"+hexColor.substring(2,4)+hexColor.substring(0,2)+hexColor.substring(4,6);
			//AAGGBBRR
			//return "cc"+hexColor.substring(2,4)+hexColor.substring(4,6)+hexColor.substring(0,2);


			// aplha other end
			//AARRBBGG
			//return hexColor.substring(0,2)+hexColor.substring(4,6)+hexColor.substring(2,4) +"cc";

			//AARRGGBB
			//return hexColor.substring(0,2)+hexColor.substring(2,6)+hexColor.substring(2,4)+"cc";

			//AABBRRGG
			//return hexColor.substring(4,6)+hexColor.substring(0,2)+hexColor.substring(2,4)+"cc";

			//AABBGGRR
			//return hexColor.substring(4,6)+hexColor.substring(2,4)+hexColor.substring(0,2)+"cc";

			//AAGGRRBB
			//return hexColor.substring(2,4)+hexColor.substring(0,2)+hexColor.substring(4,6)+"cc";
			//AAGGBBRR
			//return hexColor.substring(2,4)+hexColor.substring(4,6)+hexColor.substring(0,2)+"cc";

		},
		highLightPlacemark :function(coordsArray,hightLightProperties) {
			var $this = this;
			var ge = this.options.gePluginInstance;
			var placemarksArray = new Array();
		    var point;
		    var latitude;
		    var longitude;
		    var altitude;
		    var noOfCoords = coordsArray == null ? 0 : coordsArray.length;
		    if(hightLightProperties && hightLightProperties.highlightFeatureCount){
		     	if(hightLightProperties.highlightFeatureCount <= noOfCoords){
		     	noOfCoords = hightLightProperties.highlightFeatureCount;
		     	}
		    }
		    var highLightColor=(this.options.highlightColor)?this.options.highlightColor:"#42fdff";
		    highLightColor = this._toGEColor(highLightColor);
		    var placemark;
		    if(noOfCoords  )
		    for(var i = 0; i < noOfCoords; i++) {
		    	if(coordsArray[i] != null) {
		            var coords = coordsArray[i].split(",");
		            if(coords[1]) {
		                latitude = parseFloat(coords[1]);
		            }
		            if(coords[0]) {
		                longitude = parseFloat(coords[0]);
		            }
		            if(coords[2]) {
		                altitude  = parseFloat(coords[2]);
		            }
		        }
				//if(placemark == null) {
		        placemark = ge.createPlacemark('');
		        placemark.setName('');
		        ge.getFeatures().appendChild(placemark);

		        //Create style map for placemark
		        var icon = ge.createIcon('');
		        var highlightIcon;
		        if(hightLightProperties && hightLightProperties.highlightIconUrl){
		        	highlightIcon = $si.viewer.serverUrl+hightLightProperties.highlightIconUrl;
		        }else{
		        	highlightIcon = $this._defaultHighlightPlacemarkUrl;
		        	highlightIcon = $si.viewer.serverUrl+"images/highlighter.png";
		        }
		        icon.setHref(highlightIcon);
		        var style = ge.createStyle('');
		        style.getIconStyle().setIcon(icon);

		        style.getIconStyle().getColor().set(highLightColor);
		        var scale;
		        if(hightLightProperties && hightLightProperties.highlightIconScale){
		        	scale = hightLightProperties.highlightIconScale;
		        }else{
		        	scale = parseInt($this._defaultHighlightPlacemarkScale);
		        }
		        style.getIconStyle().setScale(scale);



		        placemark.setStyleSelector(style);
		        point = ge.createPoint('');

		        point.setLatitude(latitude);
		        point.setLongitude(longitude);
		        placemark.setGeometry(point);
				placemarksArray[i] = placemark;
				//this.options.lastPlacemarkHighlightColor = placemark;
			}
			return placemarksArray;
		},

		checkForValidColor : function(color) {

			var reg=/^#[0-9a-fA-F]{3,6}$/i;
			if(reg.test(color)==true && (color.length == 4 || color.length == 7)){
				return color;
			}else{
				return "#2EFEF7";
			}
		},


		setPolygonCoordinates : function(polyPlacemark, coordStr) {
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

	  	setLineStringCoordinates : function(lineStringPlacemark, coordStr) {
	        if(lineStringPlacemark && coordStr) {
	            //setTimeout("alert('"+coordStr+"!')",1000);
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
	    },



		/*
	    refreshLinkWithParameters : function(layerId, params) {
	    	var $this = this;
	    	if(layerId){
	    		var networkLinks = this.options.networkLinks[layerId];
	    		var linkUrl;
	    		var index;
	    		var link;
	    		if(networkLinks) {
		        	$(networkLinks).each(function(index,networkLink){
		        		if(networkLink){
		        			networkLink = networkLink.networkLink;
		        		}
		        		link    = networkLink.getLink();
		        		linkUrl = link.getHref();
		        		index 	= linkUrl.indexOf('&temprandvalue=');
		                if(index > 0) {
		                    linkUrl = linkUrl.substring(0, index);
		                }
			            linkUrl += "&temprandvalue="+Math.random();
			            if(params){
			            	$.each(params,function(key,value){
			            		linkUrl += "&" + key + "=" + value;
			            	});
			            }
			            link.setHref(linkUrl);
			            networkLink.setLink(link);
		        	});
	    		}
	        }
	    },


	    _createLink : function(linkParams){
	    	var ge = this.options.gePluginInstance;
	    	var link = ge.createLink("");
	    	if(linkParams){
		    	if(linkParams.refreshMode != null) {
		            link.setRefreshMode(linkParams.refreshMode);
		            if(linkParams.refreshInterval != null && linkParams.refreshInterval != "null"){
		                link.setRefreshInterval(parseFloat(linkParams.refreshInterval));
		            }
		        }
		        if(linkParams.viewRefreshMode == ge.VIEW_REFRESH_ON_STOP){
		            link.setViewRefreshMode(linkParams.viewRefreshMode);
		            if(linkParams.viewRefreshTime != null && linkParams.viewRefreshTime != "null"){
		                link.setViewRefreshTime(parseFloat(linkParams.viewRefreshTime));
		            }
		            link.setViewFormat(this.VIEW_FORMAT);
		        }
	    	}
	        return link;
	    },

	    //If layer has periodic or after camera refresh then auto refresh is active
	    _setLayerRefreshMode : function(layerId,linkParams){
	    	 var layer = $si.businessViewUtil.getBusinessViewById(layerId);
	        if(layer){
		        if(linkParams.refreshMode == 0 && linkParams.viewRefreshMode == 0){
		        	//this will control the auto refresh button. Intialized only here.
	    			layer.enableAutoRefresh = false;
	    		}else{
	    			layer.enableAutoRefresh = true;
	    			//this property changes with the toggle of auto refresh button
	    			layer.isAutoRefresh = true;
	    		}
	        }
	    },

	    startStopAutoRefresh : function(layerId,isAutoRefresh){
	    	var $this = this;
	    	if(layerId){
	    		var networkLinks = this.options.networkLinks[layerId];
	    		if(networkLinks) {
	    			var link;
		        	$(networkLinks).each(function(index,networkLink){
		        		if(networkLink){
			        		if(isAutoRefresh){
			        			link = $this._createLink(networkLink.linkParams);
			        		}else{
			        			link = $this._createLink()
			        		}

			        		if(networkLink.networkLink){
			        			networkLink = networkLink.networkLink;
			        			link.setHref(networkLink.getLink().getHref());
				    	        networkLink.setLink(link);
			        		}
		        		}
		        	});
	    		}

	    	}
	    },
		*/
	});
});
