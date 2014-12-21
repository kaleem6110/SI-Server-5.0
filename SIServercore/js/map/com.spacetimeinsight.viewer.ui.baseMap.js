define([
    'jquery',
    'jquery-ui',
    'common/com.spacetimeinsight.viewer.ui.window',
    'map/com.spacetimeinsight.i18N.map',
    'map/com.spacetimeinsight.i18N.map.regional',
    'siNotification',
    'jquery-notify',
    'top-center',
    'jquery-noty-packaged-min',
    'map/com.spacetimeinsight.viewer.ui.baseLassoListener',
    'mapUtils',
],function($){

	$.widget('spacetimeinsight.siViewerBaseMap',$.spacetimeinsight.siViewerWindow,
		$.extend({},$.spacetimeinsight.siViewerBaseBusinessViewListener,
					$.spacetimeinsight.siViewerBaseLassoListener,
		{
			options : {
				windowAttributes : {

					position: {
						top		: "60px",
						left	: "285px",
					},
				},
				title		  				: "Map",
				group						: "Maps",
				googleMapView 				: "siViewerGoogleMapView",
		        googleMapViewJS 			: "map/com.spacetimeinsight.viewer.ui.googleMapView",
		        googleStreetView    		: "siViewerGoogleStreetView",
		        googleStreetViewJS  		: "map/com.spacetimeinsight.viewer.ui.googleStreetView",
				groupIcon					: "css/images/map_window.png",
				windowIcon 					: "css/images/map_window.png",
			 	toolBarWidgetJS 			: "map/com.spacetimeinsight.viewer.ui.mapToolBar",
		        toolBarWidget 				: "siViewerMapToolBar",
				mapLassoToolBarWidget		: "siViewerMapLassoToolBar",
				mapLassoToolBarJS			: "map/com.spacetimeinsight.viewer.ui.mapLassoToolBar",
		        tooltip 					: $si.i18N.Map.tooltip,
		        windowClass					: "w-map-view",
		        baseMapWindowId             : null,
		        lassoSides					: null,
		        currentLassoTypeId			: null,
		        newlyCreatedLassoId			: null,
		        CONFORMATION_DIALOG			: "<div id='dialog' title='"+$si.i18N.Map.lassomessages.conformationtitle+"'>"+$si.i18N.Map.lassomessages.conformationmessage+"</div>",
				cameraEventTimer 			: null,
				cameraEventTimerDelay 		: parseInt($si.viewer.mapProperties['refreshoncameramovedelay'])*1000, //2 seconds
				hasTriggeredCameraEvent 	: true,
				lastPlacemarkHighlightColor : null,
				isLassoEditToolActive		: false,
				allowSingleInfoWindow		: false,
				lastInfoWindowAttributes	: null,
				rectangleDefaultLength		: 0.1,
				rectangleDefaultBreadth     : 0.2,

		},
				GOOGLE_STREET_VIEW_WINDOW_ID: 'gStreetViewWinId',
				GOOGLE_MAP_VIEW_WINDOW_ID   : 'gMapViewWinId',
				radius						: 8.05,
				STATE_AFTER_SAVE_NEW		: 'STATE_AFTER_SAVE_NEW',
				PLUGIN_DIV 	  	   			: kendo.template("<div id='#= id #'   style='padding-bottom: 5px; height: 100%; width: #=windowAttributes.width#;'> </div>"),

				pluginName					: "siViewerBaseMap",
				PLUGIN_DIV 	  	   			: kendo.template("<div id='#= id #' style='padding-bottom: 5px; height: 100%; width: #=windowAttributes.width#;'> </div>"),
				LASSO_DIV 					: kendo.template("<div id='#= id #' style='padding-bottom: 5px;'> </div>"),
				FOOTER_DIV					: kendo.template("<iframe frameborder=0 style='z-index: 9 ;position: absolute;height: 28px; width: 150px;left:10px; bottom:10px; background-image:url(css/images/STI-embossed-logo-4map.png)' ></iframe>"),

		_create : function(){
			this._super();
			var $this = this;
			$si.eventSource.windowEvents.bind($si.events.WindowEvents.onDragEnd,function (windowDragEvent){

				if(windowDragEvent.isInfoWindow==true && $this.options.allowSingleInfoWindow==true){
					$si.viewer.lastInfoWindowAttributes=windowDragEvent.windowAttributes;
				}
			});

		},

		// Set the height of the window according the height of the screen
        setDefaultHeight : function() {
        	var screenHeight = $(window).height();
        	var screenWidth = $(window).width();
        	var businessViewWidth = $('.w-business-view').width();
        	var appHeaderHeight = $('div.htmlViewer').children('.si-viewer-app-header').height();
        	var footerHeight = $('.si-viewer-app-header').children('.si-viewer-app-taskbar').height();
        	var addHeightWhiteSpace = 55;
        	var addWidthWhiteSpace = 25;
        	$(this.element).parent(".w-map-view").css("height",screenHeight -(appHeaderHeight + footerHeight + addHeightWhiteSpace) + "px");
        	$(this.element).parent(".w-map-view").css("width",screenWidth -(businessViewWidth + addWidthWhiteSpace) + "px");
        },

		_createControls : function(){
			var $this = this;
			this._super();

			this.options.baseMapWindowId = $(this.element).attr("id");

			this.options.PLUGIN_DIV = this.options.id +"_map";
			$(this.element).append(this.PLUGIN_DIV({id : this.options.PLUGIN_DIV, windowAttributes : this.options.windowAttributes}));
			this.loadPlugin();

			$si.viewer.selectedLassos = {};
			$si.viewer.allLassos = {};
			$si.viewer.lassoFilterType = $.spacetimeinsight.siViewerBaseLassoListener.LASSO_NONE;
			this.setDefaultHeight();
			$si.viewer.notification.bind("showInfoMessage", function(message){
				var e = {
						message: "",
				};
				//TODO: Info messaging has yet to be implemented by Hari.
				$this._createErrorNotification(e, message[0]);
        	});
			$(".w-map-view").find(".k-window-actions").click(function(event) {
				if(event.target.textContent == "ExpandCollapse"){
					var dropdownlist = $("#lassosicondropdownTool").data('kendoDropDownList');
					if(dropdownlist){
						 dropdownlist.close();
					}

				}
			});

		},


		_bindControls : function(){
			var $this =this;
			this._super();

			this._bindLayerFailureNotification();
			this.initializeBusinessViewListener();
			this._bindMapEvents();
			this._bindLassoEvents();
			this._bindDrawerEvents();
			this._bindZIndexChangeEvent();
		/*	$(".k-window-actions").click(function(e){
        		if(this.previousSibling.id == "si-viewer-siviewergoogleearth_wnd_title" && e.target.textContent == "Restore"){
        			$(".w-map-view").removeClass("new_map_class");
        		}else if(this.previousSibling.id == "si-viewer-siviewergoogleearth_wnd_title" && e.target.textContent == "Maximize"){
        			$(".w-map-view").addClass("new_map_class");
        		}
        	}); */
		},
		
		_bindZIndexChangeEvent : function(){
			var map = $(this.element).data("kendoWindow").wrapper;
			map.find(".k-window-title").on("mousedown",function(e){
				map.trigger("mousedown");
			});
			map.on("mousedown", function(e){
		       var mapWindows = $("div[runtime-window='runtime-window']");
		       if(mapWindows && mapWindows.length > 0){
		    	   $(mapWindows).each(function(index,mapWindow){
		    		   mapWindow = $(mapWindow).data("kendoWindow").wrapper;
		    		   if(mapWindow){
		    			  mapWindow.zIndex(map.zIndex());
		    		   } 
		    	   });
		       }
		    });
		},

		 _onToolBarCreationComplete : function(e,data){
		 	var $this = this;
		 	this._super();
			var toolbar = this.options.toolBar[$this.options.toolBarWidget]();

			var helpDropDownData = $(toolbar).find("#win-help-dropdown").data("kendoDropDownList");
			var helplist = helpDropDownData.list;
			var helplistli = helplist.find("li");

			if( !$si.viewer.applicationViewerPluginHelpUrl){// no data disable the option
						helplistli[2].className = "win-help-text-disabled k-item";
						helplistli[2].style.opacity = 0.5;
						helplistli[2].style.pointerEvents = "none";

			}
		 },
		_bindDrawerEvents : function(){
			var $this = this;
			$(this.element)[this.pluginName]().bind(this.pluginName.toLowerCase() + "_drawercreationcomplete",function(e){
				if($this.options.drawer && $this.options.drawer.length > 0){
					var drawer = $($this.options.drawer)[$this.options.drawerWidget]();

					/** handler for kml kmz select deselect **/
					drawer.bind($this.options.drawerWidget.toLowerCase() + "_onkmlkmzselectdeselect",function(e,data){
						$this.onKmlKmzSelectDeselect(data);
					});

					/** handler for highlight color change **/
					drawer.bind($this.options.drawerWidget.toLowerCase() + "_onmaphighlightcolorchange",function(e,data){
						$this.onMapHighLightColorChange(data);
					});

					/** handler for single info window check un-check **/
					drawer.bind($this.options.drawerWidget.toLowerCase() + "_onsingleinfowindowcheck",function(e,data){
						$this.onSingleInfoWindowCheck(data);
					});


					/** handler for map layer selection  **/
					drawer.bind($this.options.drawerWidget.toLowerCase() + "_onenterpriselayerchecked",function(e,data){
						if(data){
							$this.onEnterpriseLayerChecked(data.dataItem);
						}
					});

					/** handler for map overlay feature selection  **/
					drawer.bind($this.options.drawerWidget.toLowerCase() + "_onmapoverlayfeaturechecked",function(e,data){
						if(data){
							$this.onMapOverLayFeatureChecked(data.dataItem);
						}
					});

				}
			});
		},
		loadHelp : function(menuId){
						var $this = this;
						if(menuId == 1){
							$si.windowUtil.openBrowserWindow($si.viewer.viewerViewerPluginHelpUrl,'portalUserGuide');
						}
						else if(menuId == 2 && $si.viewer.applicationViewerPluginHelpUrl){
							$si.windowUtil.openBrowserWindow($si.viewer.applicationViewerPluginHelpUrl,'appUserGuide');

						}
			},

		/** trigger an event to inform enterprise layers are available **/
		setEnterpriseLayers : function(layers){
			$si.viewer.mapLayerModel.layers = layers;
			$si.viewer.mapLayerModel.trigger("setLayers",{layers:layers});
		},
		_getMapWindowId: function(){
			var windowId;
			$.each($si.viewer.windowMetadataModel.arrWindowMetadata,function(index,siWindow){
				windowMetaData = siWindow.id.split('_');
				if(windowMetaData.length == 1 && ( siWindow.type === "siViewerGoogleEarth" || siWindow.type === "siViewerEsri") ) {
					windowId= siWindow.id ;
				}
			});
			return windowId;
		},
		onKmlKmzSelectDeselect : function(data){
			if(data){
				if(data.isChecked){
					/** need to override in esri and ge **/
					this.addKmlNetworkLink(data.kmlUrl,data.kmlId);
				}else{
					/** need to override in esri and ge **/
					this.removeKMLNetworkLink(data.kmlUrl,data.kmlId);
				}
			}
		},

		onMapHighLightColorChange : function(data){
			if(data && data.color){
				this.options.highlightColor = data.color;
				this.updateHighLightColor(this.options.highlightColor);
			}
		},

		/** override this method to apply highlight color **/
		updateHighLightColor : function(color){
			console.log("Need to override updateHighLightColor");
		},

		onSingleInfoWindowCheck : function(data){
			var $this = this;
			$this.options.allowSingleInfoWindow = data.isChecked;
		},

		onEnterpriseLayerChecked : function(data){
			console.log("Need to override onMapLayerSelectDeSelectEvent");
		},

		onMapOverLayFeatureChecked : function(data){
			console.log("Need to override onMapOverLayFeatureChecked");
		},

		_bindMapEvents:function() {
			//bind all map events
			$si.eventSource.map.bind($si.events.MapEvents.onCameraMove, this.onCameraMove.bind(this));
		},

		loadPlugin : function(){
			//need to override
		},

		_bindLayerFailureNotification : function(){
			var $this = this;
	        	$si.viewer.notification.bind("onLayerFailureNotification",function(notification){
	        		if(notification){
	        			notification["windowId"] = $this.options.id;
	        		}
	        		$si.notification.addError(notification);
					//$si.notification.showNotification($this.options.id,1);
	        		//$this._showNotificationIcon(notification.source);
	        	});
			},


			_showNotificationIcon : function(source){
            	var $this = this;
            	var notificationIcon = $("#"+source).find("#exceptionTool");
            	if(notificationIcon){
            		notificationIcon.show();
            		notificationIcon.unbind("click");
            		notificationIcon.bind("click",function(e){
            			$si.notification.showNotification($this.options.id,1);
            		});
            	}

            },

		 _showLassoTools : function(){
		     var $this = this;

		     $(this.element).before(this.LASSO_DIV({
					id:"lassoDiv"
		     }));

			var lassoDiv = $(this.element).prev("#lassoDiv");

				//$(this.element).prev("#lassoDiv").css("top:80px;");

			lassoDiv.siViewerNestedWindow({
					position:"absolute",
					shimRequired: true,
					windowAttributes : {
						width 		 : "300px",
						height 		 : "auto",
						minHeight 	 : "30px",
						position	 : {
								top	 : "49px",
								left : "0px"
						},
					},
				});
			lassoDiv.append($this.LASSO_DIV({css:'mainLassoDiv', id:'mainLassoDiv'}));
			this.options.mapLassoToolBar = lassoDiv.find("#mainLassoDiv");
			this.options.mapLassoToolBarObj = this.options.mapLassoToolBar[$this.options.mapLassoToolBarWidget]();
			this.options.mapLassoToolBar.bind($this.options.mapLassoToolBarWidget.toLowerCase() +"_ontoolbarbtnclick",function(e,toolData){
				if(toolData){
					if(toolData.id == "save"){
						if($this.isValidNewlyCreatedLasso($this.options.currentLassoTypeId)){
							$this.saveUpdateLasso();
						}else{
							$this.clearNewlyDrawnLasso(null);
						}	
					}
				}
			});
			$("#lassoDiv").css("display","block");
			$("#mainLassoDiv").css("display","block");
		},
			_activateToolBar : function(){
				var $this = this;
				$("#rulerTool").bind("distanceCalculation", function(e, mode, measurementSystem, longDistance, shortDistance){
					$this._distanceCalculation(mode, measurementSystem, longDistance, shortDistance);
				});
				$("#showgooglemapTool").bind("openGMapsCall", function(){
					$this.openGoogleMapViewWindow();
				});
				$("#streetviewTool").bind("openGoogleStreetView", function(){
					$this.openGoogleStreetViewWindow();
				});
				$("#executeSearch").bind("executeSearch", function(e, searchFieldText){
					$this._locateAddress(searchFieldText);
				});

				$("#legendTool").bind("_showLegend", function(){
					$this.showLegendWindow();
				});

				$("#lassoTool").bind("_showLassoTools", function(){
				 	$this.showLassoToolbar();

				});

				$($si.viewer).bind("drawLassoFeature", function(e, param){
					$this.deactivateLassoEdit();
					$si.viewer.isLassoCreate =  true;
					$this.drawLassoFeature(param.type);
				});

				$($si.viewer).bind("setCurrentView", function(e, lookatStr){
					$this._setCurrentView(lookatStr);
				});

				$($si.viewer).bind("lookAtRange", function(e, lookatStr,range){
					$this._lookatRange(lookatStr,range);
				});


				$($si.viewer).bind("setHighlight", function(e, coordsArray,dashboardId,layerId, hightLightProperties){
					$this._highlight(coordsArray,dashboardId,layerId, hightLightProperties);
				});


				$($si.viewer).bind("setLassoData", function(e, lassoName, lassoDescription){
					$this.lassoName = lassoName;
					$this.lassoDescription = lassoDescription;
					$this.setLassoData();
				});

				$($si.viewer).bind("applyLassoFilter", function(e, applyFilter,selectedBusinessViewArray){
					$this.applyLassoFilter(applyFilter, selectedBusinessViewArray);
				});

				$("#selectlassosTool").bind("drawSelectLassos", function(e){
					$this.drawSelectLassos();
				});

				$si.events.triggerViewerInitialized();
			},

			triggerCameraMoveEvent : function() {
				var $this = this;
				if(!$this.options.hasTriggeredCameraEvent) {
						//console.log("returning as the last camera event is not triggered");
						return;
				}
				$($si.sessionTimeOut).trigger("validateAndExtendSession" ,["map camera"]);
				$this.options.hasTriggeredCameraEvent = false;
				if($this.options.cameraEventTimer){
					clearTimeout($this.options.cameraEventTimer);
					//console.log("clearing timer "+$this.options.cameraEventTimer);
				}
			    $this.options.cameraEventTimer = setTimeout ($this.cameraTimerEvent.bind($this) , $this.options.cameraEventTimerDelay);
				//console.log("triggered map camera move event");

			},

			cameraTimerEvent : function() {
				var eventData = this._getCameraEventData();
				if(eventData){
    				$si.events.triggerMapCameraMoveEvent(eventData);
    				this.options.hasTriggeredCameraEvent = true;
				}
			},

			setLassoData: function(){
				var $this = this;
					if($this.options.currentLassoTypeId ==  $si.viewer.LASSO_SHAPES.POLYGON){
						$this.drawLassoPolygonFinished();
					}else if($this.options.currentLassoTypeId ==  $si.viewer.LASSO_SHAPES.CIRCLE){
						$this.drawLassoCircleFinished();
					}else if($this.options.currentLassoTypeId ==  $si.viewer.LASSO_SHAPES.RECTANGLE){
						$this.drawLassoRectangleFinished();
					}

			},


			applyLassoFilter: function(applyFilter,selectedBusinessViewArray){
				var $this=this;
				//Get lasso that are in creation or edit state on Map.
				var lassoArray = this.getActiveLassos();
				
				var businessViews = $si.businessViewUtil.getLassoableBusinessViewDetails();
				if(selectedBusinessViewArray!=null && selectedBusinessViewArray.length>0){
				businessViews =selectedBusinessViewArray;
				}
				var params = null;
				var oldFilterType  = JSON.parse(JSON.stringify($si.viewer.lassoFilterType));

				if(businessViews && businessViews.length > 0 && lassoArray != null){
					for (var i = 0; i < $si.viewer.selectedLassosData.selectedLassosArray.length; i++) {
						var lasso = $si.mapUtils.getCurrentLassoObjectByLassoDBId($si.viewer.selectedLassosData.selectedLassosArray[i]);
						if((lassoArray.length > 0) && (lasso != null) && (lassoArray[0]["name"] == lasso.id.toString())){
							continue;
						}

						if(lasso != null){
							lassoArray.push(this.getLassoServerObject(lasso));
						}

					}

					//Position of this call is important and should not be altered.
					//The application of the filter below can be changed on the basis of the call.
					$($si.viewer).trigger("updateLassoFilterDropDownState", [lassoArray]);
//					console.log("OLD LASSO: "+oldFilterType +" ---- "+$.spacetimeinsight.siViewerBaseLassoListener.LASSO_NONE);
//					// If the Old Lasso Filter is the same as LASSO_NONE so dont do any filter
//					if(oldFilterType == $.spacetimeinsight.siViewerBaseLassoListener.LASSO_NONE){
//						applyFilter = false;
//					}

					if(applyFilter){
						var selectedLayersArray  = JSON.stringify(businessViews);
						if(lassoArray.length > 0 && $si.viewer.lassoFilterType != $.spacetimeinsight.siViewerBaseLassoListener.LASSO_NONE){
							params = {
									operation       	: $.spacetimeinsight.siViewerBaseLassoListener.LASSO_APPLY_FILTER_OPERATION,
									lassoArray 			: JSON.stringify(lassoArray),
									selectedLayerArray  : selectedLayersArray,
									analysisType		: $si.viewer.lassoFilterType,
							};
						}else{
							params = {
									operation       	: $.spacetimeinsight.siViewerBaseLassoListener.LASSO_CLEAR_FILTER_OPERATION,
									selectedLayerArray  : selectedLayersArray,
							};
						}

						if(params != null){
							if(selectedBusinessViewArray){
								//when lassos are setting to to artifactlayer for a business view selected case we do not want the businessview to refresh
								$si.routes.serverCallForLassso(function(){}, $this.onLassoAlgoApplyFailure, params);
							}else{
								$si.routes.serverCallForLassso($this.onLassoAlgoApplySuccess, $this.onLassoAlgoApplyFailure, params);
							}
						}
				   }
				}else {
					$($si.viewer).trigger("updateLassoFilterDropDownState", [lassoArray]);
				}
			},

			getActiveLassos : function(){
				return [];
			},

			getLassoServerObject : function(lasso) {
				return lasso;
			},

			onLassoAlgoApplySuccess: function(data){
				//$si.mapUtils.refreshAllSelectedBusinessLayers();
				$si.businessViewUtil.refreshLassoableBusinessViews();
//				$si.events.triggerLassoEvent($si.events.LassoEvents.onLassoApplyAlgorithm);
			},

			/* call to edit lasso*/
		    changeLassoModeEditMode: function(paramArray) {
		    	var editModeFlag = paramArray[0];
		    	var state = paramArray[1];

		    	var $this = this;
		        if (state == "STATE_AFTER_SAVE_NEW") {
		            $this.lastSelectedRegion = null;
		        }
		        $this.setRBRegionsEditMode(editModeFlag);
		        //$this.setLassoRegionsEditMode(editModeFlag);
		        if (!editModeFlag) {
		            //$this.resetLassoFeatures();
		        	$this.resetRubberBandFeatures();
		            $this.currentLassoPolyPlacemark = null;
		        }
		    },

		    /*Call this method to enable the Rubberbanding EDIT Mode*/
			setRBRegionsEditMode: function(editModeFlag) {
				var $this = this;
			    if (editModeFlag) {
			        $this.setRubberbandEditMode($this.RUBBERBAND_MODE_EDIT);
			    } else {
			    	$this.setRubberbandEditMode($this.RUBBERBAND_MODE_READONLY);
			    }
			},

			setRubberbandEditMode: function(mode) {
				var $this =  this;
				try {
				    $this.rubberbandMode = mode;
				    if ($this.isRubberBandReadOnlyMode()) {
				    	$this.activateListener($this.LISTENER_TYPE_DEFAULT_CLICK, 'mouseup');
				    } else {
				    	$this.hideBalloon();
				        $this.deActivateListener($this.LISTENER_TYPE_DEFAULT_CLICK, 'mouseup');
				    }
				    $this.initializeRubberBandMouseListeners($this.isRubberBandEditMode());
				} catch (e) {
					$si.Logger('Lasso').error('Error ['+e.message+'] occurred while calling setRubberbandEditMode');
				}
			},

			resetRubberBandFeatures:function() {
				//sub-classes should overwrite
			},

			activateListener: function(listenerType, eventType) {
				//sub-classes should override
			},

			deActivateListener: function(listenerType, eventType) {
				//sub-classes should override
			},

			initializeRubberBandMouseListeners: function(flag) {
				//sub-classes should override
			},

			isRubberBandReadOnlyMode: function() {
				var $this = this;
			    return $this.rubberbandMode == $this.RUBBERBAND_MODE_READONLY;
			},

			isRubberBandEditMode: function() {
				var $this = this;
				return $this.rubberbandMode == $this.RUBBERBAND_MODE_EDIT;
			},

			onLassoAlgoApplyFailure: function() {
				$si.Logger('Lasso').error($si.i18N.Map.lassomessages.applylassofiltererror);
			},

			lookatRangeForPolyLine : function(coordStr) {

			},

			lookatRange : function(coordStr, range) {

			},

			onCameraMove : function() {
				this.refreshCameraBasedBusinessViews();
			},

			refreshCameraBasedBusinessViews : function() {
				for (var businessViewId in this.cameraRefreshBusinessViewsMap) {
					var businessViewNames = this.cameraRefreshBusinessViewsMap[businessViewId];
		   	    	for (var businessViewName in businessViewNames) {
					  if (businessViewNames.hasOwnProperty(businessViewName)) {
							if($si.businessViewUtil.isBusinessViewAutoRefreshOff(businessViewId)) {
								$si.Logger('BusinessViewListener').debug("Cannot refresh business view ["+businessViewId+"] = ["+businessViewName+"] on camera move as the auto refresh is off");
								continue;
							}
				    		this.refreshBusinessViewById(businessViewId, businessViewName);
				      }
				    }
			    }
			},

			showLassoToolbar : function(){
					var $this = this;
					if($this.options.mapLassoToolBarWidget && $this.options.mapLassoToolBarWidget!= ""){
						$this.options.lassoToolBarObj = requirejs([$this.options.mapLassoToolBarWidgetJS],function(){
							if($("#lassoDiv").length == 0){
								//create lasso tool bar
								$this._showLassoTools();
						    	var paramArray = [true, null];
						    	$this.changeLassoModeEditMode(paramArray);
						    	$this.options.isLassoDivOpened = true;
						    	$("#lassoTool").removeClass("lasso-icon");
						    	$("#lassoTool").addClass("lasso-icon-highlight");
						    	$("#lassoTool").parent(".toolbar-icon").addClass("parent-lasso");
							}else if($("#lassoDiv").css("display") == "none"){
								$("#lassoDiv").css("display","block");
								$("#mainLassoDiv").css("display","block");
								$("#lassoDiv").css("top","25px");
								$("#lassoDiv").css("left","0px");
								$("#lassoDiv").show();
						    	var paramArray = [true, null];
						    	$this.changeLassoModeEditMode(paramArray);
								$this.options.isLassoDivOpened = true;
						    	$("#lassoTool").removeClass("lasso-icon");
						    	$("#lassoTool").addClass("lasso-icon-highlight");
						    	$("#lassoTool").parent(".toolbar-icon").addClass("parent-lasso");
							}else{
								if($this.options.isLassoEditToolActive || $si.viewer.isLassoCreate){
									$this.conformationPrompt();
								}else{
						        	$("#lassoDiv").hide();
									$this.deactivateLassoEdit();
									$this.options.isLassoDivOpened = false;
							    	$("#lassoTool").removeClass("lasso-icon-highlight");
							    	$("#lassoTool").addClass("lasso-icon");
							    	$("#lassoTool").parent(".toolbar-icon").removeClass("parent-lasso");
							    	$("#lassosicondropdownTool").data('kendoDropDownList').close();
							    	$("#colorTool").data('kendoColorPicker').close();
								}

							}
						});
					}
				},

			conformationPrompt: function() {
				var $this = this;
				noty({
					text: $si.i18N.Map.lassomessages.canceleditprompt,
					layout 		: 'topCenter',
					type		: 'Confirmation',
					buttons: [
						{addClass: 'btn btn-primary', text: $si.i18N.Map.lassomessages.ok, onClick: function($noty) {

								$noty.close();
								$("#lassoDiv").hide();
					        	$this.options.isLassoDivOpened = false;
					        	if($si.viewer.isLassoCreate){
					        		$this.clearNewDrawLasso();
					        	}else{
					        		$this.resetPreviousLasso();
								}
					        	$this.deactivateLassoEdit();
						    	$("#lassoTool").removeClass("lasso-icon-highlight");
						    	$("#lassoTool").addClass("lasso-icon");
						    	$("#lassoTool").parent(".toolbar-icon").removeClass("parent-lasso");
						    	$("#lassosicondropdownTool").data('kendoDropDownList').close();
						    	$("#colorTool").data('kendoColorPicker').close();
						    	$this.changeButtonsStateOnLassoEdit(true);
							}
						},
						{addClass: 'btn btn-danger', text: $si.i18N.Map.saveLasso.cancellasso, onClick: function($noty) {
								$noty.close();
								return;
							}
						}
					]
				});
			},

			resetPreviousLasso:function(){

			},

			deactivateLassoEdit : function(){
				var $this = this;
				var paramArray = [false, $this.STATE_AFTER_SAVE_NEW];
				$this.changeLassoModeEditMode(paramArray);
				$this.options.newlyCreatedLassoId = null;
				this.options.isLassoEditToolActive = false;
				$($si.viewer).trigger("deactivateButtons");

			},

			activateLassoEdit : function(){
				var $this = this;
		    	var paramArray = [true, null];
		    	$this.changeLassoModeEditMode(paramArray);
			},

			//common functions to all maps
			showLegendWindow : function(){
				try {
		    		var $this = this;
					var params = {
							pluginName : $this.options.showLegend,
							pluginJS   : $this.options.showLegendJS,
							windowId   : $this.options.showLegend,
							parameters : {
										  shimRequired 	 		: $this.isShimRequired(),
										 }
					};
					$si.windowUtil.openWindow(params, true);

				} catch (e) {
					$si.Logger('basemaps').error("Error while creating map view"+e.message);
				}

			},

			openGoogleMapViewWindow : function (){
		    	 try {
		    		var $this = this;

					var params = {
							pluginName : $this.options.googleMapView,
							pluginJS   : $this.options.googleMapViewJS,
							windowId   : $this.GOOGLE_MAP_VIEW_WINDOW_ID,
							parameters : {
										  shimRequired 	 		: $this.isShimRequired(),
										  getCurrentView 		: $this.getCurrentView.bind($this),
										  geMapWindowWindowId 	: $this.GOOGLE_MAP_VIEW_WINDOW_ID
										 }

					};

					$si.windowUtil.openWindow(params, true);

				} catch (e) {
					$si.Logger('basemaps').error("Error while creating map view"+e.message);
				}
		     },

		     openGoogleStreetViewWindow : function() {
		    	 try {
		    		var $this = this;
		    		var params = {
							pluginName : $this.options.googleStreetView,
							pluginJS   : $this.options.googleStreetViewJS,
							windowId   : $this.GOOGLE_STREET_VIEW_WINDOW_ID,
							parameters : {
			    		 					shimRequired 	 	: $this.isShimRequired(),
			    		 					getCurrentView 		: $this.getCurrentView.bind($this),
			    		 					streetViewWindowId	: $this.GOOGLE_STREET_VIEW_WINDOW_ID,
										 }

					};

					$si.windowUtil.openWindow(params, true);
				} catch (e) {
					$si.Logger('basemaps').error("Error while creating map view"+e.message);
				}
			},

			openBusinessViewInfoWindow: function(dataParams, jsonParamsString,name,position){
				if(dataParams) {
				var $this = this;
					 var layerId = dataParams.layerid;
					 var businessViewName = dataParams.artefactname;
					 var windowId = dataParams.windowId;
					 var firstAttributeValue='';
					 for (var prop in dataParams) {
						 firstAttributeValue=dataParams[prop];
						 break;
					 }
					 var uID = dataParams.artifactid;
					 var uTitle = (name)?name:firstAttributeValue;
					 // please refer SI-2546 comments for a GE plugin error, this is the wrok around for now.
					if(uTitle.indexOf("Content-type: mhtml-die-die-die")>0){
						uTitle=firstAttributeValue;
					}
					var alreadyOpened =$si.windowUtil.isInfoWindowOpen();

 					if($this.options.allowSingleInfoWindow){
							if(alreadyOpened==true){
						 		$si.windowUtil.closeInfoWindow();
							}
					}else{
						var wId=(layerId+"_"+businessViewName+"_"+windowId+"_"+uID).removeSpecialCharacter();
						$si.windowUtil.closeWindow(wId);
					}
					if(dataParams && (jsonParamsString === undefined || jsonParamsString == null || jsonParamsString == "")) {
						jsonParamsString = JSON.stringify(dataParams);
					}
					if(position){
						$this._calculateInfoWindowPosition(position,windowId, layerId, businessViewName);
					}
					$si.businessViewUtil.openBusinessViewInfoWindow(windowId, layerId, businessViewName, jsonParamsString, uID, uTitle);
				} else {
					$si.Logger('basemaps').error("dataParams is null in openBusinessViewInfoWindow");
				}
			 },
			_calculateInfoWindowPosition:function(position,windowId, businessViewId, businessViewName){
				var win=$(this.element).data("kendoWindow");
				var mapWidth=$(this.element).parent(".w-map-view").width();
				var mapHeight=$(this.element).parent(".w-map-view").height();
				var mapPosition = win.wrapper.offset();
				var top=position.top+mapPosition.top; //height
				var left=position.left+mapPosition.left; //width
				/*
				 * default info window height and width , this will be used only when tabbed view window is not attached to a geofeature
				 * or attached not provided default height and width in this case infoWindow.dimension will come as undefined.
				 */
				var infoWindowDefaultHeight=300;
				var infoWindowDefaultWidth=350;
				// get defined window attributes
				var infoWindow=$si.businessViewUtil.getBusinessViewWindow(windowId, businessViewId, businessViewName);
				if(infoWindow.dimension) {
					infoWindowDefaultHeight=infoWindow.dimension.height;
					infoWindowDefaultWidth=infoWindow.dimension.width;
				}
				if(mapHeight-top<=infoWindowDefaultHeight/2 && mapWidth-left<=infoWindowDefaultWidth/2){
					top=infoWindowDefaultHeight-top;
					left=infoWindowDefaultWidth-left;

				}else if(mapWidth-left<=infoWindowDefaultWidth/2){
					left=left-infoWindowDefaultWidth;
				}else if(mapHeight-top<=infoWindowDefaultHeight/2){
					top=top-infoWindowDefaultHeight;
				}
				if(top<0){
				top=top*-1;
				}
				if(left<0){
				left=left*-1;
				}
				$si.viewer.lastInfoWindowAttributes={position:{top:top,left:left}};
			},
			isShimRequired : function () {
				return false;
			},

			showSaveLassoWindow : function() {
				var $this = this;
				$($this.element).append($this.GENERIC_DIV({id : "savelassoWindow"}));
				$($this.element).find("#savelassoWindow").siViewerSaveLasso();
			},
			applyWindowContentFavoriteSettings : function(favorite) {
				if(favorite){
					this.setMapZoom(favorite.mapZoom);
					this.setMapLocation(favorite.mapLocation);
					if(favorite.lassoSettings){
						var lassoSetting = favorite.lassoSettings;
						this.showLassoToolbarmap(lassoSetting.lassoDivDisplay);
						this.updateLassoData(lassoSetting.selectlassosTool);
						$si.viewer.lassoFilterType = lassoSetting.lassofiltersTool;
						$($si.viewer).trigger("applyLassoFilter", true);
					}
				}
			},
			
			resetMap : function(){
				this.resetMapZoom();
				this.resetMapLocation();
				this.resetMapToolbarSettings();
				this.resetLassoToolbarSettings();
				this.removeAllLassosFromMap();
			},

			getMapZoom : function(){
				$si.Logger('favorite setting').info('Override getMapZoom method');
			},

			getMapLocation : function(){
				$si.Logger('favorite setting').info('Override getMapLocation method');
			},

			setMapZoom : function(zoom){
				$si.Logger('favorite setting').info('Override setMapZoom method');
			},

			setMapLocation : function(extent){
				$si.Logger('favorite setting').info('Override setMapLocation method');
			},
			
			resetMapZoom : function() {
				$si.Logger('favorite setting').info('Override resetMapZoom method');
			},
			
			resetMapLocation : function() {
				$si.Logger('favorite setting').info('Override resetMapLocation method');
			},

			resetMapToolbarSettings : function() {
				// deactivate ruler Operations
				var paramArray = $si.mapUtils.getMeasurementParameters();
				$("#rulerTool").removeClass( "ruler-enabled");
				$("#rulerTool").addClass("ruler-disabled");
				$("#rulerTool").trigger("distanceCalculation", ["deactive", paramArray[0], " "+paramArray[1], " "+paramArray[2]]);
				$("#searchfield").val($si.i18N.Map.searchbox.enterlocation);
				//Close street view 
				$si.windowUtil.closeWindow(this.GOOGLE_STREET_VIEW_WINDOW_ID);
				//Close 2d map view
				$si.windowUtil.closeWindow(this.GOOGLE_MAP_VIEW_WINDOW_ID);
				//Close Legend Window
				$si.windowUtil.closeWindow(this.options.showLegend);
			},

			resetLassoToolbarSettings : function() {
				$("#lassoTool").removeClass("lasso-icon-highlight");
		    	$("#lassoTool").addClass("lasso-icon");
		    	$("#lassoTool").parent(".toolbar-icon").removeClass("parent-lasso");
		    	if($("#lassosicondropdownTool") && $("#lassosicondropdownTool").data('kendoDropDownList')){
		    		$("#lassosicondropdownTool").data('kendoDropDownList').close();
		    	}
		    	if($("#colorTool") && $("#colorTool").data('kendoColorPicker')){
		    		$("#colorTool").data('kendoColorPicker').close();
		    	}
				$("#lassoDiv").remove();
			},

			resetDrawerSettings : function() {
				$si.Logger('favorite setting').info('Override resetDrawerSettings method');
			},
			
			removeAllLassosFromMap : function() {
				try {
					var selectedLassoIds = JSON.parse(JSON.stringify($si.viewer.selectedLassosData.selectedLassosArray));
					$si.viewer.lassoFilterType = this.LASSO_NONE;
					
					this.changeLassoModeEditMode([false, this.STATE_AFTER_SAVE_NEW]);
					$.each(selectedLassoIds, function(i, item) {
						$si.mapUtils.showLassoOnMapByLassoDBId(selectedLassoIds[i], false);
						$si.mapUtils.removeLassoIdFromSelectedLassoArray(selectedLassoIds[i]);
						$si.mapUtils.updateLassoDataByLassoDBId(selectedLassoIds[i], "selected", false);
					});
					
					$("#selectlassosTool").data("kendoDropDownList").refresh();
					
					if($si.viewer.isLassoCreate){
		        		this.clearNewDrawLasso();
		        	}else if(this.options.isLassoEditToolActive){
		        		this.resetPreviousLasso();
					}else{
						$($si.viewer).trigger("applyLassoFilter", true);
					}
					
				} catch (e) {
					$this._createErrorNotification(e, e.message);
				}
			},


		/**
		 * This method is used to save the lasso settings in the favorite.
		 * @param {} $
		 * @returns {}
		 */
		getWindowContentFavoriteSettings : function(){
			var favoriteData = {
									mapZoom		 : this.getMapZoom(),
									mapLocation	 : this.getMapLocation(),
								};
			var lasso = this.options.toolBar;
			var lassoDiv = $(this.element).prev("#lassoDiv");
			var lassoSettings = {
									selectlassosTool 	: JSON.stringify($si.viewer.selectedLassosData.selectedLassosArray),
									bussinessviewlayer  : $si.businessViewUtil.getLassoableBusinessViewDetails(),
								};

			if(lasso && lasso.length > 0){
				lassoSettings.lassofiltersTool	= lasso.find("#lassofiltersTool").data('kendoDropDownList').value();
			}
			if(lassoDiv && lassoDiv.length > 0){
				lassoSettings.lassoDivDisplay	= lassoDiv.css("display");
			}

			favoriteData.lassoSettings = lassoSettings;

			return favoriteData;
		},

		showLassoToolbarmap : function(flag){
					var $this = this;
					if($this.options.mapLassoToolBarWidget && $this.options.mapLassoToolBarWidget!= ""){
						requirejs([$this.options.mapLassoToolBarWidgetJS],function(){
							if(flag == "block"){
								if($("#lassoDiv").length == 0){
									//create lasso tool bar
									$this._showLassoTools();
							    	var paramArray = [true, null];
							    	$this.changeLassoModeEditMode(paramArray);
							    	$this.options.isLassoDivOpened = true;
							    	$("#lassoTool").removeClass("lasso-icon");
							    	$("#lassoTool").addClass("lasso-icon-highlight");
							    	$("#lassoTool").parent(".toolbar-icon").addClass("parent-lasso");
							    	$("#lassoDiv").show();	
								}else{
									$("#lassoDiv").css("display","block");
									$("#mainLassoDiv").css("display","block");
									$("#lassoDiv").css("top","25px");
									$("#lassoDiv").css("left","0px");
									$("#lassoDiv").show();
							    	var paramArray = [true, null];
							    	$this.changeLassoModeEditMode(paramArray);
									$this.options.isLassoDivOpened = true;
							    	$("#lassoTool").removeClass("lasso-icon");
							    	$("#lassoTool").addClass("lasso-icon-highlight");
							    	$("#lassoTool").parent(".toolbar-icon").addClass("parent-lasso");
							    	$("#lassosicondropdownTool").data('kendoDropDownList').close();
							    	$("#colorTool").data('kendoColorPicker').close();
								}								
							}else if($("#lassoDiv").length > 0){
						        	$("#lassoDiv").hide();
						        	$("#lassoTool").removeClass("lasso-icon-highlight");
							    	$("#lassoTool").addClass("lasso-icon");
							    	$("#lassoTool").parent(".toolbar-icon").removeClass("parent-lasso");
							    	$("#lassosicondropdownTool").data('kendoDropDownList').close();
							    	$("#colorTool").data('kendoColorPicker').close();
									$this.deactivateLassoEdit();
									$this.options.isLassoDivOpened = false;

							}
						});
					}
				},

				/** select Lasso from favorite and de-select all other lassos */
				updateLassoData : function(selectedIds){
					var $this = this;
					var selectedIdsArray = JSON.parse(selectedIds);
					var lassoTools = $("#selectlassosTool").data("kendoDropDownList");
					var allLassos = $si.viewer.lassoShapesData.lassoData;
					if(allLassos && selectedIdsArray){
						$.each(allLassos,function(index,lasso){
							if(lasso){
								if(selectedIdsArray.indexOf(lasso.id) != -1){
									lasso.selected = true;
									$si.viewer.selectedLassosData.selectedLassosArray.push(lasso.id);
								}else{
									lasso.selected = false;
									$si.mapUtils.removeLassoIdFromSelectedLassoArray(lasso.id);
								}
								$this.viewLassoOnMap(lasso);
							}
						});
					}
					lassoTools.refresh();
				},

				viewLassoOnMap : function (lasso){
					$si.Logger('Base Map').info('Override viewLassoOnMap method to show lasso on map');
				},

				showErrorMessage : function(message) {
					var $this = this;
					var e = {
							message: "",
					};
					$this._createErrorNotification(e, message);
				},

				showMessage : function(notification, isErrorMessage) {
					var $this = this;
					if(notification){
	        			notification["windowId"] = $this.options.id;
	        		}

					if(isErrorMessage){
						$si.notification.addError(notification);
					}else{
						$si.notification.addInfo(notification);
					}
					$si.notification.showNotification($this.options.id,notification["sourceId"]);
	        		//$this._showNotificationIcon(notification.source);
				},

				/**
				 * Overriding the setDefaultFavorite method as we have to apply the default favorite
				 * after the plugin has been loaded. Refer the baseBusineeViewListener for applyMapDefaultFav.
				 * @param {} $
				 * @returns {}
				 */
				setDefaultFavorite : function(){

				},
	}));

});