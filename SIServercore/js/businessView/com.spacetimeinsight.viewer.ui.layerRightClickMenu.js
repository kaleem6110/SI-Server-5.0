define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'windowUtil',
    'common/com.spacetimeinsight.i18N.global',
    'common/com.spacetimeinsight.viewer.ui.loadingDialog',
],function($,$si){
	$.widget('siUi.siViewerLayerRightClickMenu',{
			options :{
						toolBarWidgetJS 	: "common/com.spacetimeinsight.viewer.ui.windowToolBar",
						toolBarWidget   	: "siViewerWindowToolBar",
						dataFilterWidget  	: "siViewerDataFilter",
						dataFilterWidgetJS  : "dataFilter/com.spacetimeinsight.viewer.ui.dataFilter",
						timeFilterWidget  	: "siViewerTimeFilter",
						timeFilterWidgetJS  : "timeFilter/com.spacetimeinsight.viewer.ui.timeFilter",
						rParamWindowWidget  : "siViewerREditableParameters",
						rParamWindowWidgetJS : "analytics/com.spacetimeinsight.viewer.ui.reditableparameters",
						shimRequired		: false,
						dataFilterTitle		: "Data Filter",
						timeFilterTitle		: "Time Filter",
						dashboards			: {},
						mapViewSelected     : true
					},
			DEFAULTINFO: "No information specified",
			pluginName:"siViewerLayerRightClickMenu",
	        TOOLBAR : kendo.template("<div id='#= id #_toolbar'></div>"),
	        IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),
	        CONTENT_DIV : kendo.template("<div id='#= id #_content'></div>"),
	        DASHBOARD : kendo.template("<div id='#= dashboardId #' class='dashboard-button'>"
					+ "<span class='dashboard-status'><img src='images/blank_transparent.png' class='#= cssClass #'/></span>"
					+ "<span class='dashboard-icon'><img src='#=dashboardIcon#'/></span>"
					+ "<span class='dashboard-title' title='#= dashboardTitle#'>#= dashboardTitle#</span>"
					+ "<span class='dashboard-notification'><img src='images/blank_transparent.png' id='#= dashboardId #-notification-icon'  ></img></span>"
					+ "</div>"),
	        DATA_FILTER : kendo.template("<div id='#= id #_datafilter'></div>"),
	        TIME_FILTER : kendo.template("<div id='#= id #_timefilter'></div>"),
			REDITABLE_PARAMS_WINDOW_DIV : kendo.template("<div id='#= id #_rparamwindow'></div>"),
			GENERIC_DIV : kendo.template("<div id='#= id #'></div>"),
			FOOTER: kendo.template('<div id="layerMenuFooter" class="layer-rightclick-menu-footer"></div>'),
			_create : function(){
				var $this = this;
				//used in event handling. Each event is prefix by plugin name
				this.widgetEventPrefix = this.pluginName + "_";

				this.options.id = $(this.element).attr("id");

				if(this.options.shimRequired){
					$(this.element).prepend(this.IFRAME_CONTAINER({id:this.options.id}));
				}

				var $this = this;
				if(this.options.toolBarWidget){
					requirejs([this.options.toolBarWidgetJS],function(){
						$this._addToolbar();
					});
				}
				$(this.element).append(this.CONTENT_DIV({id:this.options.id}));
				this.options.contentDiv = $(this.element).find("#" + this.options.id + "_content");
				$(this.element).append(this.FOOTER);
				//stop menu close on menu click
				$(this.element).bind("click",function(e){
					e.stopPropagation();
				});	

				$si.eventSource.globalEvents.bind($si.events.GlobalEvents.onGlobalEvent,function(event){
					if(event && event.data && event.data.name == "onLoadComplete" && event.data.businessViewId == $this.options.businessViewId){
						$this.updateFooter(event.data.lastUpdateTime);
					}
				});

				$($si.viewer).bind("openAnalyticsRunWindow", function(e, data){
					var businessView = $si.businessViewUtil.getBusinessViewRightclickData(data.data.id);
					$this.options.businessView = businessView;
					$this.options.businessViewId = data.data.id;
					$this.options.windows = data.data.windows;
					$this.options.rWindowTitle = data.properties.layername;
					$this._openRWindow();
				});

			},

			_addToolbar : function(){
				var $this = this;
				$(this.element).prepend(this.TOOLBAR({id:this.options.id}));

				this.options.toolBar = $(this.element).find("#" + this.options.id + "_toolbar");

				this.options.toolBar[this.options.toolBarWidget]({
					windowTools : ["FILTER","TIME","SPACER", "MANUAL_REFRESHICON","AUTOMATIC_REFRESHICON","SPACER", "ANALYSIS","SPACER", "BUSINESSVIEWINFO"],
					enableDrawer: false,
					showToolbar : true,
				});

				this.options.toolBar[this.options.toolBarWidget]("unBindGlobalEvents");

				this.options.toolBar[this.options.toolBarWidget]("getToolBarItem","MANUAL_REFRESHICON").bind("click",function(e){
					var businessViewParams = {
											layerId : $this.options.businessViewId,
									};
					$this._trigger("onManualRefresh",null,businessViewParams);
				}).addClass("refresh-icon");

				this.options.toolBar[this.options.toolBarWidget]("getToolBarItem","AUTOMATIC_REFRESHICON").bind("click",function(e){
					if($this.options.businessView && $this.options.businessView.enableAutorefresh){
							var isAutoRefresh = !$si.businessViewUtil.getBusinessViewAutoRefreshStatus($this.options.businessViewId);
							$this._changeAutoRefreshCSS(isAutoRefresh);
							$si.businessViewUtil.setBusinessViewAutoRefreshStatus( $this.options.businessViewId, isAutoRefresh);
					}
				});


				 this.options.toolBar[this.options.toolBarWidget]("getToolBarItem","FILTER").bind("click",function(e){
					 if($this.options.businessView && $this.options.businessView.needsDataFilter){
						$this._openDataFilter();
					 }
				 });

				 this.options.toolBar[this.options.toolBarWidget]("getToolBarItem","ANALYSIS").bind("click",function(e){
					 if($this.options.businessView && $this.options.businessView.layerProperties.hasAnalytics){
						$this._openRWindow();
					 }
				 });

				 var timeFilter = this.options.toolBar[this.options.toolBarWidget]("getToolBarItem","TIME");
				 timeFilter.bind("click",function(e){
				 	$this._openTimeFilter();
				 });


			},

			_addMapView : function(){
				var mapViewInfo = {
									id 		: "mapView",
									title	: "Map",
									iconUrl : "css/images/map_icon.png",
									checked : true,
								  };
				this.options.contentDiv.append(this.DASHBOARD({
									dashboardId    : mapViewInfo.id,
									dashboardTitle : mapViewInfo.title,
									dashboardIcon  : mapViewInfo.iconUrl,
									cssClass	   : this.options.mapViewSelected === false ? 'dashboard-unselected'  : 'dashboard-selected',
									notificationClass : '',
								}));
				this.options.mapViewInfo = mapViewInfo;
			},



			_createWindows : function(windows){
				var $this = this;
				if(windows){
					$this.options.windows = {};
					var  isScriptWindowPresent = false;
					$(windows).each(function(index,siWindow){
						if(siWindow && !(siWindow.addAsAttributeLink == true ||siWindow.windowType == "DataFilter" || siWindow.windowType =="Legend" || siWindow.hideFromBusinessViewMenu == true || siWindow.scriptFunction)){
							$this.options.windows[siWindow.id] = siWindow;
							$this.options.contentDiv.append($this.DASHBOARD({
													dashboardId : siWindow.id,
													dashboardTitle : siWindow.title ? siWindow.title : siWindow.id,
													dashboardIcon : siWindow.iconUrl,
													cssClass	  : $this.options.windows[siWindow.id].isClosed == false ? 'dashboard-selected' : 'dashboard-unselected',
													notificationClass : $this.options.windows[siWindow.id].inErrorState == true ? 'notification-icon':'',
											}));

						} else if(siWindow && siWindow.scriptFunction){
							isScriptWindowPresent = true;
						}
					});

					if(isScriptWindowPresent) {
						$this.options.contentDiv.append("<hr/>");
						//TODO create seperator

						$(windows).each(function(index,siWindow){
							if(siWindow &&  siWindow.scriptFunction){
								$this.options.windows[siWindow.id] = siWindow;
								$this.options.contentDiv.append($this.DASHBOARD({
														dashboardId : siWindow.id,
														dashboardTitle : siWindow.title ? siWindow.title : siWindow.id,
														dashboardIcon : siWindow.iconUrl,
														cssClass	  : $this.options.windows[siWindow.id].isClosed == false ? 'dashboard-selected' : 'dashboard-unselected',
														notificationClass : $this.options.windows[siWindow.id].inErrorState == true ? 'notification-icon':'',
												}));
							}

						});
					}

					$(this.element).find("span.dashboard-title").bind("click",function(e){
						$this._onWindowSelectDeselect(this);
					});

					this._bindNotifications();

				}

			},

			_bindNotifications : function(){
				var $this = this;
				if(!this.options.viewerPluginId) {
					this.options.viewerPluginId = $si.windowUtil.getViewerPluginWindowId();
				}
			 	$si.eventSource.notifications.bind(	$si.events.Notifications.onErrorEvent,function(event) {
			 		var notification = event.data;
			 		if(notification.sourceId && notification.sourceId == $this.options.businessViewId){
			 			var exceptionTool;
				 		if(notification.windowId == $this.options.viewerPluginId  ){
				 			exceptionTool =	$this.element.parent().find("#mapView-notification-icon" );
				 		} else {
				 			exceptionTool =	$this.element.parent().find("#" + notification.windowId+"-notification-icon" );
				 		}
						if(exceptionTool) {
							exceptionTool.addClass("notification-icon");
						}

			 		}
			 	});

/*			 	$si.eventSource.notifications.bind(	$si.events.Notifications.onSuccessEvent,function(event) {

			 		var notification = event.data;
			 		if(notification.sourceId && notification.sourceId == $this.options.businessViewId){
			 		 	var exceptionTool;
				 		if(notification.windowId == $this.options.viewerPluginId  ){
				 			exceptionTool =	$this.element.parent().find("#mapView-notification-icon" );
				 		} else {
				 		 exceptionTool =	$this.element.parent().find("#" + notification.windowId+"-notification-icon" );
				 		}
						if(exceptionTool) {
						  exceptionTool.addClass("notification-icon");

						}

			 		}
			 	});
*/
			 	//bind clear notifications
			 	$si.eventSource.notifications.bind(	$si.events.Notifications.onNotificationClear,function(event) {
			 		if(event.data.sourceId && event.data.sourceId == $this.options.businessViewId){
			 			var exceptionTool;
				 		if(event.data.windowId == $this.options.viewerPluginId  ){
				 			exceptionTool =	$this.element.parent().find("#mapView-notification-icon" );
				 		} else {
				 			exceptionTool =	$this.element.parent().find("#" + event.data.windowId+"-notification-icon" );
				 		}
						if(exceptionTool) {
							exceptionTool.removeClass("notification-icon");
						}
			 		}
			 	});

			},

			_onWindowSelectDeselect : function(element){
				var windowContainer = $(element).parent("div.dashboard-button");
				var businessViewId = this.options.businessViewId;
				var businessViewName = this.options.businessViewName;
				if(windowContainer){
					var windowId = windowContainer.attr("id");
					var window = this.options.windows[windowId];
					var windowImg = windowContainer.find("span.dashboard-status img");
					//var isSelected = $si.businessViewUtils.getBusinessViewMapState(businessViewId,businessViewName);

					if(windowImg.hasClass("dashboard-unselected")){
						windowImg.removeClass("dashboard-unselected");
						windowImg.addClass("dashboard-selected");
						isSelected = true;
					}else{
						windowImg.removeClass("dashboard-selected");
						windowImg.addClass("dashboard-unselected");
						isSelected = false;
					}
					if(windowId == "mapView"){
						$si.businessViewUtil.updateBusinessViewMapState(businessViewId,businessViewName,isSelected);
						var businessViewParams = {
											layerId : businessViewId,
											params  : {hideMapData:!isSelected},
										};
						this._trigger("onMapViewSelectDeselect",null,businessViewParams);
					}else{
						window["isSelected"] = isSelected;
						window["layerId"] = businessViewId;
						if(this.options.dataFilterTitle){
							window["breadCrumTitle"] = this.options.dataFilterTitle.replace(/,/g, " > ");
						}
						this._trigger("onWindowSelectDeselect",null,{
																			window : window,
																			domElement : element,
																		});
					}
				}
			},

          openMenu : function(data){
	    	  if(data){
	    		  var businessView = $si.businessViewUtil.getBusinessViewRightclickData(data.layerId);
	    		  this.options.dataFilterTitle = data.dataFilterTitle;
	    		  this.options.timeFilterTitle = data.dataFilterTitle;
	    		  this.options.rWindowTitle = data.dataFilterTitle;
	    		  $(this.options.contentDiv).empty();
		    	  $(this.element).show();
		    	  $(this.element).css({
		    		  					top : data.position.top,
		    		  					left: data.position.left,
		    	  					});
	    		  if(businessView){
		    		  this.options.businessView    = businessView;
		    		  this.options.businessViewId	= businessView.businessViewId;
		    		  this.showHideToolBarButton("FILTER",businessView.needsDataFilter);
		    		  this.showHideToolBarButton("TIME",businessView.isTimeAware);
		    		  this.showHideToolBarButton("ANALYSIS",businessView.layerProperties.hasAnalytics);
		    		  if(businessView.needsMap && $si.viewer.requiresMapViewInBusinessViewRightclickMenu){
		    		  		this.options.mapViewSelected = $si.businessViewUtil.getBusinessViewMapState(data.layerId,data.layerName);
							this._addMapView();
					 }
		    		  this.showHideToolBarButton("AUTOMATIC_REFRESHICON",businessView.enableAutorefresh);
		    		  this.addBusinessViewInfo(businessView.description);
		    		  if(businessView.enableAutorefresh){
		    			  this._changeAutoRefreshCSS($si.businessViewUtil.getBusinessViewAutoRefreshStatus(data.layerId));
		    		  }else{
		    			  //need disable icon here.
		    			  this._changeAutoRefreshCSS(false);
		    		  }
		    		  this._createWindows(businessView.windows);
		    		  this.updateFooter(businessView.lastUpdateTime);
	    		  }
	    	  }
	      },

	      addBusinessViewInfo: function(info){
	      	var buttonId = "businessviewinfo";
	      	var button = $(this.element).find("#" + buttonId  +"Tool");
			if(info){
				button.prop('title',info);
				button.attr("disabled", false);
			} else{
				button.prop('title',"");
				button.attr("disabled",true);
				//info = this.DEFAULTINFO;
			}
	      },

	      showHideToolBarButton : function(buttonId,isShow){
	    	  if(buttonId){
	    		  var button = $(this.element).find("#" + buttonId.toLowerCase() +"Tool");
	    		  if(isShow){
	    			  button.removeAttr("disabled");
	    		  }else{
	    			  button.attr("disabled","disabled");
	    		  }
	    	  }
	      },

	      closeMenu : function(){
	    	  $(this.element).hide();
	      },

	      _changeAutoRefreshCSS : function(isAutoRefresh){
	    	  	var autoRefreshButton = this.options.toolBar[this.options.toolBarWidget]("getToolBarItem","AUTOMATIC_REFRESHICON");
				if(isAutoRefresh){
					$(autoRefreshButton).addClass("auto-refresh-on");
					$(autoRefreshButton).removeClass("auto-refresh-off");
					autoRefreshButton.attr('title',$si.i18N.Global.tooltip.autoRefreshOff);
				}else {
					$(autoRefreshButton).addClass("auto-refresh-off");
					$(autoRefreshButton).removeClass("auto-refresh-on");
					autoRefreshButton.attr('title',$si.i18N.Global.tooltip.autoRefreshOn);
				}
	      },

	      _openDataFilter : function(){
	      	  var $this = this;
	    	  if(this.options.businessView && this.options.businessView.dataFilterWindow){
	    		  var dataFilterWindow = this.options.businessView.dataFilterWindow;
	    		  var title=this.options.dataFilterTitle;
	    		  if(title) title = this.options.dataFilterTitle;

	    		  dataFilterWindow.breadCrumTitle = "Data Filter > " + title;
	    		  dataFilterWindow.windowId = dataFilterWindow.id;
	    		  dataFilterWindow.onSetCriteria = function(event,data){
										    			  if(data){
																dataFilterWindow.filterCriteria = data.filterCriteria;
																$si.businessViewUtil.setBusinessViewDataFilterIcon(data.businessViewId,!data.isClearFilterCriteria);
																$si.routes.setCriteria(data);
															}
													};
				  var filterableWindows = [];
				  if(this.options.mapViewInfo){
					  filterableWindows.push(this.options.mapViewInfo); 
				  }
				  if(this.options.windows){
					$.each(this.options.windows,function(index,window){
						if(window && window.filterProperties && window.filterProperties.showInDatafilter){
							/** By Default all windows appear as checked for filter **/
							window.checked = true;
							filterableWindows.push(window);
						}
					});
				  }
				  dataFilterWindow.filterableWindows = filterableWindows;
	    		  $si.businessViewUtil.openBusinessViewWindowByWindowObj(dataFilterWindow);
	    	  }
			},

			_openTimeFilter : function(){
				var $this = this;
				var id = $this.options.businessViewId;
				if($("#"+id +"_timefilter.sti-window").length > 0){
						return;
					}
				if(this.options.timeFilterWidget && this.options.timeFilterWidget != ""){
					requirejs([this.options.timeFilterWidgetJS],function(){
						var selectedWindows = [];
						//adding mapview dashboard only if mapView available in right click menu
						if($si.viewer.requiresMapViewInBusinessViewRightclickMenu) {
							selectedWindows.push({
								id       : "mapView",
								title    : "Map View",
								iconUrl  : "css/images/map_icon.png",
							});
						}

						if($this.options.windows){
								$.each($this.options.windows,function(index,window){
									if(window && window.timeAware){
										selectedWindows.push(window);
									}
								});
							}

						var title = $this.options.timeFilterTitle;
						if(title){
							title = "Time Filter > " + title.replace(/,/g, " > ");
						}
						$($this.element).append($this.TIME_FILTER({id: id}));
						$this.options.timeFilter = $($this.element).find("#" + id +"_timefilter");
						$this.options.timeFilter[$this.options.timeFilterWidget]({
							title		 		: title,
							shimRequired 		: true,
							dashboards 	 		: selectedWindows,
							businessViewId		: $this.options.businessViewId,
							layerTimeProperties	: $this.options.businessView.layerProperties.timeProperties,
							isLayerRightClick   : true,
							onSetCriteria		: function(event,data){
													$si.routes.setCriteria(data);
												  },
						});
					});
				}
			},

			_openRWindow : function(){
                var $this = this;
                if(this.options.rParamWindowWidget && this.options.rParamWindowWidget != ""){
                    requirejs([this.options.rParamWindowWidgetJS],function(){
                        var selectedWindows = [];
						//adding mapview dashboard only if mapView available in right click menu
						if($si.viewer.requiresMapViewInBusinessViewRightclickMenu) {
							selectedWindows.push({
								id       : "mapView",
								title    : "Map View",
								iconUrl  : "css/images/map_icon.png",
							});
						}

						if($this.options.windows){
								$.each($this.options.windows,function(index,window){
									if(window){
										selectedWindows.push(window);
									}
								});
							}
                        var title = "Run Analysis -> " + $this.options.rWindowTitle.replace(/,/g, " > ");
                        $($this.element).append($this.REDITABLE_PARAMS_WINDOW_DIV({id: $this.options.businessViewId}));
                        $this.options.timeFilter = $($this.element).find("#" + $this.options.businessViewId +"_rparamwindow");
                        $this.options.businessView.layerProperties.businessViewName = $this.options.businessView.windows[0].businessViewName;
                        $this.options.businessView.layerProperties.businessViewId  = $this.options.businessViewId;
						var bussinessViewObj = $si.businessViewUtil.getBusinessViewById($this.options.businessViewId, $this.options.businessView.windows[0].businessViewName);
                        $this.options.timeFilter[$this.options.rParamWindowWidget]({
							title               : title,
                            //data              : $this.options.businessView.filterAttributes,
                            defaultWidth        : 880,
                            shimRequired        : $this.options.shimRequired,
                            dashboards 	 		: selectedWindows,
                            businessViewId      : $this.options.businessViewId,
                            //windowId            : $this.options.windowConfig.id,
                            businessViewName    : $this.options.businessView.windows[0].businessViewName,
                            windowConfig		: $this.options.businessView.layerProperties,
                            runAnalyticsParams	: bussinessViewObj.runAnalyticsParams,
                            isLayerRightClick   : true,
                            /*onRunAnalysis       : function(event,data){
        											//$this._enableRProcessDialog();
        											bussinessViewObj.runAnalyticsParams = data.analyticsParams;
                            						$si.routes.setCriteria(data);
                                                    },*/
                            onRwindowClose		: function(event, data) {
                            						bussinessViewObj.runAnalyticsParams = data.values;
                            					}
                        });
                    });
                }},
           _setRunAnalyticsParams : function(event) {
			if(event){
				//this.options.analyticsData = event.data.attributeDataList;
				this.options.windowData = event.data;
				//this.refreshWindow();
				this.applyWindowData();
			}
		},

		updateFooter: function(date){
			var footer = $(this.element).find('#layerMenuFooter');
			if(date){
				footer.text('*Last Update ' + $si.uiUtils.getFooterDate(date));
			}
		}
		});
});
