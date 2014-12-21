/**
 * Google earth plug-in .
 */
define([
    'jquery',
    'jquery-ui',
    'map/com.spacetimeinsight.viewer.ui.baseMap',
],function($){

		$.widget('spacetimeinsight.siViewerEsri', $.spacetimeinsight.siViewerBaseMap,{
			 options :{
					windowAttributes : {
            		position: {
                	top     : "0px",
            		},
        			},
			        title						: "Map",
			        drawerWidgetJS				: "map/esri/com.spacetimeinsight.viewer.ui.esriMapDrawer",
			        drawerWidget 				: "siViewerEsriMapDrawer",
					showLegend  				: "siViewerMapLegend",
					showLegendJS  	    		: "map/com.spacetimeinsight.viewer.ui.mapLegend",
					mapLassoToolBar				: "siViewerMapLassoToolBar",
					mapLassoToolBarJS			: "map/com.spacetimeinsight.viewer.ui.mapLassoToolBar",
					group						: "Maps",
					showHelpDropdown			: true,
					businessViewLayers : {},
			        mapLods : [],
			        allBaseMaps : [],
			        LASSO_GRAPHIC_LAYER_ID 		: "lassoGraphicsLayer",
			},

			pluginName    			: "siViewerEsri",

			_create : function(){
				this._super();
			},

			_createControls : function(){
				this._super();

				this._loadEsriCSS("//js.arcgis.com/3.9/js/dojo/dijit/themes/claro/claro.css");
				this._loadEsriCSS("//js.arcgis.com/3.9/js/esri/css/esri.css");
				$(this.element).append(this.FOOTER_DIV);
			},

			_loadEsriCSS : function(cssPath){
				if(cssPath){
					$("head").append("<link>");

				    var css = $("head").children(":last");
				    css.attr({
				      rel:  "stylesheet",
				      type: "text/css",
				      href: location.protocol + cssPath,
				    });
				}
			},

			_bindControls :function(){
				var $this = this;
				this._super();
				requirejs(['map/esri/com.spacetimeinsight.viewer.ui.esriLayerOperations'],function(){
					$si.routes.getEsriConfiguration($this.esriDataSuccess.bind($this),$this.esriDataFailure.bind($this));
				});

				$(this.element)[this.pluginName]().bind(this.pluginName.toLowerCase() + "_drawercreationcomplete",function(e){
					if($this.options.drawer){
						var drawer = $this.options.drawer[$this.options.drawerWidget]();
						drawer.bind($this.options.drawerWidget.toLowerCase() + "_onbasemaptypechangeevent",$this.onBaseMapTypeChange.bind($this));
						drawer.bind($this.options.drawerWidget.toLowerCase() + "_onbasemapopacitychangeevent",$this.onBaseMapOpacityChange.bind($this));
					}
				});
			},

			esriDataSuccess : function(data){
				var $this = this;
				if(data && data.baseMapList){
					if(data.esriGeocodeServerUrl){
						this.ESRI_GEOCODE_SERVICE_URL = data.esriGeocodeServerUrl.replace("http:",location.protocol);
					}
					if(data.esriGeometryServerUrl){
						this.ESRI_GEOMETRY_SERVICE_URL = data.esriGeometryServerUrl.replace("http:",location.protocol);
					}
					$.each(data.baseMapList,function(index,map){
						if(map){
							if(map.tileServerUrl){
								map.tileServerUrl = map.tileServerUrl.replace("http:",location.protocol);
							}
							$si.viewer.esriMapLayerModel.allMapLayers.push(map);
							if(map.visible == true){
								$si.viewer.esriMapLayerModel.set("defaultMapLayer",map);
								$si.viewer.esriMapLayerModel.set("defaultOpacity",map.opacity * 100);
								$si.viewer.esriMapLayerModel.set("defaultEsriMapLayer",map);
								$si.viewer.esriMapLayerModel.set("defaultEsriOpacity",map.opacity * 100);
								$this.options.currentBaseLayer = map;
							}
						}
					});
					this.options.allMapLayers = data.baseMapList;
					$si.viewer.esriMapLayerModel.esriLayerList = data.esriLayerList;
					this._initializeMap();
					$this._activateToolBar();
				}
			},

			updateHighLightColor : function(color){
				console.log("Write a method to update highlight color ");
			},

			esriDataFailure : function(data){

			},

			loadPlugin : function(){
				//this._initializeBaseMaps();
			},

			reset : function(){
				this._super();
				this.resetMap();
			},
			
			loadBusinessView : function(businessViewMetadata) {
				//console.log('No Map - loadBusinessView');
				var businessViewLinks = businessViewMetadata.links;
				for (var businessViewName in businessViewLinks) {
				  if (businessViewLinks.hasOwnProperty(businessViewName)) {
				  		this.refreshBusinessView(businessViewMetadata, businessViewName);
				  }
				}
			},

			refreshBusinessView : function(businessViewMetadata, businessViewName, params) {
				//console.log('No Map - refreshBusinessView');
				var businessView = $si.businessViewUtil.getBusinessViewById(businessViewMetadata.id, businessViewName);
				if(params === undefined) {
					params = {};
				}
				params.rendertype = "json";
				params.viewertype = "Esri";
				params.temprandomvalue = Math.random();

				var linkUrl = businessView.url;
				if(params){
	            	$.each(params,function(key,value){
	            		linkUrl += "&" + key + "=" + value;
	            	});
	            }
				linkUrl += this._getViewFormatParams();

				$si.routes.invokeService(linkUrl, null,
							this.onBusinessViewDataLoadSuccess.bind(this), this.onBusinessViewDataLoadFailure.bind(this));
			},

			removeBusinessView : function(businessViewMetadata) {
				console.log('Esri Map - removeBusinessView');
				this._removeBusinessViewLayer(businessViewMetadata.id);
			},

			onBusinessViewDataLoadSuccess : function(dataResponse) {
				console.log("Esri Map - onBusinessViewDataLoadSuccess");
				var businessView = $si.businessViewUtil.getBusinessViewById(dataResponse.id, dataResponse.properties.artefactname);
				dataResponse.autoZoom = businessView.autoZoom;
				this._addBusinessViewLayer(dataResponse);
	 	    	$si.events.triggerBusinessViewEvent($si.events.BusinessViewEvents.evtBusinessViewDataLoaded, dataResponse);

			},

			onBusinessViewDataLoadFailure : function(error) {


			},

			onBusinessViewDataLoadError: function(errorResponse) {
				if(errorResponse && errorResponse.data) {
					this._removeBusinessViewLayer(errorResponse.data.businessViewId, errorResponse.data.businessViewName, true);
				}
			},

			/** triggered from drawer on map type change **/
		    onBaseMapTypeChange : function(event,data){
		    	if(data){
		    		this.showBaseMapLayer(data.selectedItem);
		    	}
		    },

		    /** triggered from drawer on opacity change **/
		    onBaseMapOpacityChange : function(event,data){
		    	if(data){
		    		this.setBaseMapOpacity(data.newValue/100);
		    	}
		    },

		    /** triggered from drawer on layer select de-select **/
		    onEnterpriseLayerChecked : function(data){
		    	if(data){
		    		if(data.checked){
		    			this.showEnterpriseLayer(data);
		    		}else{
		    			this.removeEnterpriseLayer(data);
		    		}
		    	}
		    },
		});
});