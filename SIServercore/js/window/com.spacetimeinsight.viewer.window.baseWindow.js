define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'common/com.spacetimeinsight.viewer.ui.window',
    'common/com.spacetimeinsight.viewer.formattingUtil',
    'window/com.spacetimeinsight.i18N.window',
    'window/com.spacetimeinsight.i18N.window.regional',
    'window/com.spacetimeinsight.i18N.businessViewWindowErrors',
    'window/com.spacetimeinsight.i18N.businessViewWindowErrors.regional',
    'common/com.spacetimeinsight.viewer.ui.loadingDialog',
],function($){

	$.widget('spacetimeinsight.siViewerBaseWindow', $.spacetimeinsight.siViewerWindow,{
		options : {
			/* common variables */
			windowTools 			: ["FAVORITE","SPACER","FILTER","TIMECONTROL","SPACER","REFRESH","AUTOREFRESH","SPACER","SAVEAS","SPACER","EXCEPTION"],
		    footerRequired			: true,
		    tooltip 				: $si.i18N.Window.tooltip,
			shimRequired 			: true,
			filterCriteria			: null,
			timeFilterCriteria		: null,
			dataFilterWidget  		: "siViewerDataFilter",
			dataFilterWidgetJS  	: "dataFilter/com.spacetimeinsight.viewer.ui.dataFilter",
			timeFilterWidget  		: "siViewerTimeFilter",
			timeFilterWidgetJS  	: "timeFilter/com.spacetimeinsight.viewer.ui.timeFilter",
			/* window specific variables */
			isLoadingData			: false,
			isAutoRefreshEnabled	: false,
			isAutoRefreshOn			: true,
			peridoicRefreshTimer	: null,
			isApplyBoundingBox		: false,
			boundingBox				: null,

			/* event handler functions*/
			onCameraMoveHandlerFn 	: null,
			onGlobalEventFn			: null,
			onLassoApplyAlgorithmFn : null,
			dataTypes: ["java.util.Date", "java.lang.String", "java.lang.Character", "java.lang.Boolean"],
			/* info window */
			coordinates:[],
			showHelpDropdown	: true,

			/* r window plugin details*/
			rParamWindowWidget : "siViewerREditableParameters",
			rParamWindowWidgetJS : "analytics/com.spacetimeinsight.viewer.ui.reditableparameters",


		},
		/* unique plugin name */
		pluginName:"siViewerBaseWindow",

		/* html controls to be listed here */
		FOOTER_IFRAME : kendo.template("<iframe id='#= id #_footer_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: relative;height:100%;width: 100%;left:0px;'></iframe>"),
		FOOTER_DIV :kendo.template("<div id ='footer_#= dashboardId #_footer' class='dashboard-footer' ></div>"),
		DATA_FILTER_DIV : kendo.template("<div id='#= id #_datafilter'></div>"),
		TIME_FILTER_DIV : kendo.template("<div id='#= id #_timefilter'></div>"),
		REDITABLE_PARAMS_WINDOW_DIV : kendo.template("<div id='#= id #_rparamwindow'></div>"),
		/* all events to be listed here */
		//EVENT_WINDOW_DATA_LOAD_SUCCESS : "onWindowDataLoadSuccess",

		/* tools to be listed here */
		TOOL_ID_REFRESH : "refreshTool",
		TOOL_ID_AUTO_REFRESH : "autorefreshTool",
		TOOL_ID_DATA_FILTER	: "filterTool",
		TOOL_ID_TIME_FILTER	: 'timecontrolTool',
        TOOL_ID_R_FILTER : 'analysisTool',
		/* private methods - start */
		_create : function(){
			if(this.options.windowConfig.errorMessage){
				var e = {
					message : this.options.windowConfig.errorMessage,
				}
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._initializeWindowConfigOptions);
				return;
			}

			this._addExtraToolBarOptions();
			if(this.options.windowConfig && this.options.windowConfig.infoWindow === true ) {
				this._setInfoWindowPosition();
		  	}
			this._super();
			this._createInfoWindow();
		},

		_setInfoWindowPosition:function() {
			if ($si.viewer.lastInfoWindowAttributes && $si.viewer.lastInfoWindowAttributes !=null) {
				if($si.viewer.lastInfoWindowAttributes.width && $si.viewer.lastInfoWindowAttributes.height){
					this.options.windowAttributes=$si.viewer.lastInfoWindowAttributes;
				}else{
					 this.options.windowAttributes={width:this.options.windowAttributes.width,
													height :this.options.windowAttributes.height,
													position:$si.viewer.lastInfoWindowAttributes.position,
													};
				}
				//this.options.windowAttributes.appendTo = ".k-window.w-map-view";
			}
		},

		_addExtraToolBarOptions:function(){
			var additionalTools = [];

			//check if datasource is R and has editable parameters
			if(this.options.windowConfig && this.options.windowConfig.analyticsAware == true && this.options.windowConfig.windowDatasource) {
				var editableParameters = this.options.windowConfig.windowDatasource.editableParameters;
				if(editableParameters && editableParameters.length > 0) {
					additionalTools = additionalTools.concat(["ANALYSIS"]);
				}
			}

			if( this.options.toolBarOptions){
				additionalTools = additionalTools.concat(this.options.toolBarOptions);
			}

			if(this.options.windowConfig && this.options.windowConfig.infoWindow === true) {
				var found = $.inArray('HIGHLIGHT', this.options.windowTools) > -1;
				if (!found) {
					additionalTools.push("HIGHLIGHT");
					additionalTools.push("ZOOM");
				}

			}

			this.options.windowTools = this.options.windowTools.concat(additionalTools);
		},

		_bindControls : function(){
		  	try {
				var $this = this;
				this._super();
			} catch(e){

				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _bindControls ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._bindControls);
			}

			//open r-analysis window if load by default is true
			this._launchAnalyticsWindow();
		},

		_launchAnalyticsWindow : function() {
			if(this.options.windowConfig && this.options.windowConfig.analyticsAware == true
				&& this.options.windowConfig.analysisDoNotLoadByDefault == true && this.options.windowConfig.windowDatasource) {
				var editableParameters = this.options.windowConfig.windowDatasource.editableParameters;
				if(editableParameters && editableParameters.length > 0) {
					this.onAnalysisControlClick();
				}
			}
		},

		_onToolBarCreationComplete :  function(e,data){
			var $this = this;
			this._super();
			$this._initializeWindowConfigOptions();
			var toolbar = $this.options.toolBar[$this.options.toolBarWidget]();
			toolbar.bind($this.options.toolBarWidget.toLowerCase() +"_ontoolbarbtnclick",function(e,toolData){
				var toolId = toolData.event.target.id;
				$this.onWindowToolControlClick(toolId);
			});
			var helpDropDownData = $(toolbar).find("#win-help-dropdown").data("kendoDropDownList");


		},

		_createInfoWindow:function(){
			var $this=this;
			$(this.element)[this.pluginName]().bind(this.pluginName.toLowerCase() + "_oncreationcomplete",function(event,data){
					 $($this.options.toolBar)[$this.options.toolBarWidget]().bind($this.options.toolBarWidget.toLowerCase() +"_ontoggletoolbar",function(event,data){
						$this._disableAutoZoomButton();
					});
			});
			this.options.onCloseWindow = function(e){
				var coordStr=[];
				var dashboardId = $this.options.windowConfig.id;
				if($this.options.windowConfig.windowDatasource && $this.options.windowConfig.windowDatasource.parameters) {
					var layerId = $this.options.windowConfig.windowDatasource.parameters.layerid;
					if(layerId) {
						$($si.viewer).trigger("setHighlight", [coordStr,dashboardId,layerId,{businessViewName:$this.options.windowConfig.windowDatasource.parameters.artefactname}]);
					}
				}
			};

			$this.options.coordinates = [];
			if($this.options.windowConfig._customDataParams){
				var extParams = $this.options.windowConfig._customDataParams.extParams;
				try{
					if(extParams) {
						$this.options.coordinates.push(JSON.parse(extParams).coordinates);

					}
				}catch(e){
					$si.Logger('baseWindow').error(" ext params not parsed by json parser:"+$this.options.windowConfig._customDataParams.extParams);

				}
			}

		},
		_disableAutoZoomButton:function(){
			var $this = this;
			if($this.options.coordinates.length<=0){
				$("#zoomTool" ).attr("disabled", true).off("click");
				$("#highlightTool" ).attr("disabled", true).off("click");
			}
		},
		_onInfoWindowToolControlClick : function(toolId){
			var $this = this;
			if(toolId == 'zoomTool'){
				if($this.options.coordinates.length>0){
			 		var range =$this.options.coordinates[0].split(",")[2];
				 	var coordStr=$this.options.coordinates[0];
				 	if(range=='0.0'){
						//FIXME - to be replaced with preference auto zoom range value with present hardcoded 250.
					coordStr=$this.options.coordinates[0].split(",")[0]+","+$this.options.coordinates[0].split(",")[1]+",250";
					}
					$($si.viewer).trigger("setCurrentView", coordStr);
				}
			}else if(toolId == 'highlightTool' && $this.options.coordinates.length>0){
				var coordStr=[];
				coordStr.push($this.options.coordinates[0]);
				var dashboardId = $this.options.windowConfig.id;
				if($this.options.windowConfig.windowDatasource && $this.options.windowConfig.windowDatasource.parameters) {
					var businessViewId = $this.options.windowConfig.windowDatasource.parameters.layerid;
					var businessViewName = $this.options.windowConfig.windowDatasource.parameters.artefactname;
					if(businessViewId) {
						$($si.viewer).trigger("setHighlight", [coordStr,dashboardId,businessViewId,{businessViewName : businessViewName}]);
					}
				}
			}
		},

		_unbindEvents : function() {
			try {
				//unbind events
				if(this.options.onCameraMoveHandlerFn != null) {
					$si.eventSource.map.unbind($si.events.MapEvents.onCameraMove, this.options.onCameraMoveHandlerFn);
				}

				if(this.options.onGlobalEventFn != null) {
					$si.eventSource.globalEvents.unbind($si.events.GlobalEvents.onGlobalEvent, this.options.onGlobalEventFn);
				}

				if(this.options.onLassoApplyAlgorithmFn != null) {
					$si.eventSource.lasso.unbind($si.events.LassoEvents.onLassoApplyAlgorithm, this.options.onLassoApplyAlgorithmFn);
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _unbindEvents ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._unbindEvents);
			}
		},

		/*
			initialize any option variables that need to be set based on window config data
		*/
		_initializeWindowConfigOptions : function() {
			try {
				var windowConfig = this.options.windowConfig;
				var $this = this;
				//set the flag to show or hide auto refresh icon
				if(windowConfig) {
				   var refreshProperties = windowConfig.refreshProperties;
				     if(refreshProperties) {
						if(refreshProperties.refreshTypes) {
							this.options.isAutoRefreshEnabled = refreshProperties.refreshTypes.length > 0;
						}

						if(refreshProperties.periodicRefreshInterval > 0 || refreshProperties.refreshOnCameraMove){
							$this._enableAutoRefresh(true);
						}else{
							var autorefreshTool = $this.options.toolBar[$this.options.toolBarWidget]().find("#autorefreshTool");
							autorefreshTool.addClass("autorefreshOff-icon");
							autorefreshTool.attr("disabled",true);
							autorefreshTool.attr('title', $si.i18N.Window.tooltip.autorefreshDisabled);
						}

						if(refreshProperties.refreshOnCameraMove == true) {
							//bind camera event
							this.options.onCameraMoveHandlerFn = this.onMapCameraMove.bind(this);
							$si.eventSource.map.bind($si.events.MapEvents.onCameraMove, this.options.onCameraMoveHandlerFn );

						}

						if(refreshProperties.refreshEvents) {
							if(refreshProperties.refreshEvents != null && refreshProperties.refreshEvents.length > 0) {

								//bind global event
								this.options.onGlobalEventFn = this.onGlobalEvent.bind(this);
								$si.eventSource.globalEvents.bind($si.events.GlobalEvents.onGlobalEvent, this.options.onGlobalEventFn);
							}
						}

						if(refreshProperties.refreshOnLasso == true) {
							//bind lasso event
							this.options.onLassoApplyAlgorithmFn = this.onLassoApplyAlgorithm.bind(this);
							$si.eventSource.lasso.bind($si.events.LassoEvents.onLassoApplyAlgorithm, this.options.onLassoApplyAlgorithmFn);

						}
					}

					 var timeControlBarButton=windowConfig.timeAware;
				     if(timeControlBarButton==false) {
				         var timecontrolTool = $this.options.toolBar[$this.options.toolBarWidget]().find("#timecontrolTool");
					     timecontrolTool.attr("disabled","disabled");
					 }

					 var rProcessButton = windowConfig.analyticsAware;
				     if(rProcessButton==false) {
				         var analysisTool = $this.options.toolBar[$this.options.toolBarWidget]().find("#analysisTool");
					     analysisTool.attr("disabled","disabled");
					 }

					 var enableFilterBarButton=windowConfig.enableFilter;
				     if(enableFilterBarButton==false) {
				         var filterToolButtton = $this.options.toolBar[$this.options.toolBarWidget]().find("#filterTool");
					     filterToolButtton.attr("disabled","disabled");
					 } else if(windowConfig.filterProperties && windowConfig.filterProperties.applyDefaultFilter == true){
					 	/** set default filter **/
						this.options.filterCriteria = JSON.stringify(windowConfig.filterProperties.defaultCriteria);
					}
				}

				this._initializeRefreshTimer();
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _initializeWindowConfigOptions ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._initializeWindowConfigOptions);
			}
		},

		/*
			Invoke the service that loads the data for window
		*/
		_invokeWindowDataService : function(){
			try {
				var windowConfig = this.options.windowConfig;
				if(windowConfig){
					var refreshProperties = windowConfig.refreshProperties;
					windowParams = windowConfig.windowDatasource.parameters;
					windowParams.windowId = windowConfig.id;

					windowParams.isApplyFilterCriteria = windowConfig.enableFilter;
					if(windowParams.isApplyFilterCriteria == true) {
						windowParams.filterCriteria = this.options.filterCriteria;
					}

					windowParams.isApplyTimeFilter  = windowConfig.timeAware;
					if(windowParams.isApplyTimeFilter == true) {
						windowParams.timeFilterCriteria = this.options.timeFilterCriteria;
					}

					windowParams.isApplyBoundingBox  = this.isCameraSensitive();
					if(windowParams.isApplyBoundingBox) {
						windowParams.bbox = this.options.boundingBox;
					}
					if(refreshProperties && refreshProperties.refreshOnLasso) {
						windowParams.isApplyLassoRegions = (refreshProperties.refreshOnLasso == true);
					}
					//add the custom data params
					if(windowConfig._customDataParams) {
						$.each(windowConfig._customDataParams,function(paramName, paramValue){
	   	    				windowParams[paramName] = paramValue;
	   	    			});
					}

					//add run analytics data
					if(windowConfig.analyticsEditableParams) {
						windowParams.analyticsEditableParams = this.options.analyticsData;
					}
					if(windowConfig.windowDatasource && windowConfig.windowDatasource.datasourceType == "URL")  {
						var url = windowConfig.windowDatasource.url;
						$si.routes.invokeWindowDataUrl(url, this._onWindowDataLoadSuccess.bind(this), this._onWindowDataLoadFailure.bind(this), windowParams);
					} else {
						$si.routes.invokeWindowDataService(this._onWindowDataLoadSuccess.bind(this), this._onWindowDataLoadFailure.bind(this), windowParams);
					}
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _invokeWindowDataService ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._invokeWindowDataService);
			}
		},


		/*
			Method called on a successful call from the data service
		*/
		_onWindowDataLoadSuccess : function(windowData){
			try {
				//TODO:replace the actual metadata in busines view util
				if(this.options.windowConfig && windowData.configuration
						&& this.options.windowConfig.reloadConfiguration && this.options.windowConfig.reloadConfiguration == true) {
					this.options.windowConfig = windowData.configuration;
				}
				this.options.windowData = windowData.data;
				//this._trigger(this.EVENT_WINDOW_DATA_LOAD_SUCCESS, null, windowData.data);
				this.applyWindowData(this.options.windowData);
				//check if the periodic refresh timer has been initialized, if not initialize
				//this._initializeRefreshTimer();
				//update the footer
				this._updateFooter();
			} catch(e) {
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _onWindowDataLoadSuccess ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._onWindowDataLoadSuccess);
			}
			this.options.isLoadingData = false;
		},

		_onWindowDataLoadFailure : function(error){
			var e = {message:error};

			this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._onWindowDataLoadFailure);
			$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _onWindowDataLoadFailure ["+this.options.title+"]");
	//		$si.Logger('baseWindow -> ').debug("Error while getting the data. Cause :- " + error);
			this.options.isLoadingData = false;
		},

		_updateFooter : function() {
			var footerElement = $(this.options.footer);
			if(footerElement && this.options.windowData.lastUpdateFormattedTime) {
				footerElement.text($si.i18N.Window.footerLastUpdatedDate + this.options.windowData.lastUpdateFormattedTime);
			}
		},

		_initializeRefreshTimer : function() {
			try {
				if(this.options.peridoicRefreshTimer){
					clearTimeout(this.options.peridoicRefreshTimer);
				}

				if(this.options.isAutoRefreshOn == true) {
					var refreshProperties = this.options.windowConfig.refreshProperties;
					if(refreshProperties) {
						if(refreshProperties.refreshPeriodically == true && this.options.peridoicRefreshTimer == null
							&& refreshProperties.periodicRefreshInterval > 0) {

							//console.log("************ before creating the timer = " + this.options.peridoicRefreshTimer);
							this.options.peridoicRefreshTimer = setInterval(this._onPeriodicRefresh,
																	refreshProperties.periodicRefreshInterval * 1000, this);
							//console.log("************ after creating the timer = "+this.options.peridoicRefreshTimer);
						}
					}
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _initializeRefreshTimer ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._initializeRefreshTimer);
			}
		},

		_onPeriodicRefresh : function($this) {
			try {
				//console.log("************ on periodic refresh = "+this.options.peridoicRefreshTimer);
				if($this.options.isAutoRefreshOn == true) {
					$this.refreshWindow();

				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _onPeriodicRefresh ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._onPeriodicRefresh);
			}
		},

		_clearRefreshTimer : function() {
			//cancel the periodic refresh timer if exists
			try{
				//console.log("*************clearing the timer............."+this.options.peridoicRefreshTimer);
				if(this.options.peridoicRefreshTimer) {
					clearTimeout(this.options.peridoicRefreshTimer);
					this.options.peridoicRefreshTimer = null;
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _clearRefreshTimer ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._clearRefreshTimer);
			}

		},


		_openDataFilterWindow : function(){
			try {
				var $this = this;
		    	if(this.options.dataFilterWidget && this.options.dataFilterWidget != ""){
					requirejs([this.options.dataFilterWidgetJS],function(){
						var title = "Data Filter > " + $this.options.title;
						$($this.element).append($this.DATA_FILTER_DIV({id: $this.options.id}));
						$this.options.dataFilter = $($this.element).find("#" + $this.options.id +"_datafilter");
						var windowConfig = $.extend({}, $this.options.windowConfig, {
																			windowId 		: $this.options.windowConfig.id,
																			/** Filter Criteria is used to rebuild the data filter window with applied criteria **/
																			filterCriteria  : $this.options.filterCriteria,
																			});
						$this.options.dataFilter[$this.options.dataFilterWidget]({
											title		 		: title,
											windowConfig		: windowConfig,
											onSetCriteria		: $this._setDataFilterCriteria.bind($this),
						});
					});
		    	}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _openDataFilterWindow ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._openDataFilterWindow);
			}
		},

		_openTimeFilterWindow : function(){
			try {
				var $this = this;
				if($("#"+$this.options.id+'_timefilter').length > 0){
						return;
					}
		    	if(this.options.timeFilterWidget && this.options.timeFilterWidget != ""){
					requirejs([this.options.timeFilterWidgetJS],function(){
						var title = "Time Filter > " + $this.options.title;
						$($this.element).append($this.TIME_FILTER_DIV({id: $this.options.id}));
						$this.options.timeFilter = $($this.element).find("#" + $this.options.id +"_timefilter");
						$this.options.timeFilter[$this.options.timeFilterWidget]({
											title		 		: title,
											fromWindow          : true,
											defaultWidth 		: 880,
											shimRequired 		: $this.options.shimRequired,
											layerId		 		: $this.options.windowConfig.layerId,
											layerTimeProperties	: $this.options.windowConfig.timeProperties,
											onSetCriteria		: $this._setTimeFilterCriteria.bind($this),
											windowId			: $this.options.windowConfig.id,
						});
					});
		    	}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _openTimeFilterWindow ["+this.options.title+"]");

				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._openTimeFilterWindow);
			}
		},
		_openRWindow : function(toolId){
			try{
				var $this=this;
				var windowConfig = $this.options.windowConfig;

	            if(windowConfig.analyticsEditableParams != undefined
	                && windowConfig.analyticsEditableParams != '') {
	                     $this.onAnalysisControlClick();
	                }
	            else {
	            /*$("#"+toolId).attr("disabled", "disabled");
	            console.log("no editable parameters are available");*/
	            }
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _openRWindow ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._openRWindow);
			}

        },

        onAnalysisControlClick : function(){
        	try{
	            var $this = this;
	            if(this.options.rParamWindowWidget && this.options.rParamWindowWidget != ""){
	                requirejs([this.options.rParamWindowWidgetJS],function(){
	                    var selectedWindows = [];
	                    var id = $this.options.windowConfig.businessViewId;
	                    var title = "Run Analysis -> " + $this.options.title;
	                    $($this.element).append($this.REDITABLE_PARAMS_WINDOW_DIV({id: id}));
	                    $this.options.rAnalyticsParams = $($this.element).find("#" + id +"_rparamwindow");
	                    var bussinessViewObj = $si.businessViewUtil.getBusinessViewById(id,
	                    																$this.options.windowConfig.businessViewName);
	                    $this.options.rAnalyticsParams[$this.options.rParamWindowWidget]({
	                        title               : title,
	                        //data              : $this.options.businessView.filterAttributes,
	                        defaultWidth        : 880,
	                        shimRequired        : $this.options.shimRequired,
	                        businessViewId      : $this.options.businessViewId,
	                        windowId            : $this.options.windowConfig.id,
	                        windowConfig        : $this.options.windowConfig,
	                        runAnalyticsParams	: bussinessViewObj.runAnalyticsParams,
	                        onWindowRunAnalysis : function(event,data){
	                                              	 $si.routes.runAnalysis(data, $this._setRunAnalyticsParams.bind($this), $this.dataFailure);
	                                                },
	                        onRwindowClose		: function(event, data) {
                            						bussinessViewObj.runAnalyticsParams = data.values;
                            					}
	                    });
	                });
	            }
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in onAnalysisControlClick ["+this.options.title+"]");

				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.onAnalysisControlClick);
			}
        },

       _setDataFilterCriteria : function(event,data) {
			if(data){
				this.applyFilter(data.filterCriteria);
			}
		},

		applyTimeFilter : function(businessViewDetailsObj){
			try{
				this.options.timeFilterCriteria = businessViewDetailsObj.timeFilterCriteria;
				this._invokeWindowDataService();
				this.refreshWindow()

			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in applyTimeFilter ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.applyFilter);
			}
		},

		/** Dashboard Filter is also triggered from right click menu **/
		applyFilter : function(filterCriteria){
			try{
				this.options.filterCriteria = filterCriteria;
				if(this.isMinimized() == true){
					this.options.refreshOnRestore = true;
				} else {
					this.refreshWindow();
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in applyFilter ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.applyFilter);
			}
		},

		_setTimeFilterCriteria : function(event,data) {
			try{
				if(data){
					this.options.timeFilterCriteria = data.timeFilterCriteria;
					this.refreshWindow();
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _setTimeFilterCriteria ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._setTimeFilterCriteria);
			}
		},

		_setRunAnalyticsParams : function(event) {
			try{
				if(event){
					this.options.windowData = event.data;
					this.applyWindowData();
					this._disableRProcessDialog(this.options.windowConfig);
				}

			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _setRunAnalyticsParams ["+this.options.title+"]");

				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._setRunAnalyticsParams);
			}
		},

		_disableRProcessDialog : function(windowConfig){
			var loadingDialog = $("#process_dialog");
			if(loadingDialog && loadingDialog.length > 0){
				loadingDialog.hide();
				var messageTemplate = $si.i18N.BusinessViewWindowErrors._onanalysisCompleted;
			    $si.events.triggerConfirmation(
							{
								windowId:windowConfig.id,
								messageTemplate:messageTemplate.replace("Name",windowConfig.id),
								sourceId: windowConfig.businessViewId,
								sourceTitle:windowConfig.id
							});

			}
			var rEditableContainer = $(".reditable-params-container");
			if(rEditableContainer && rEditableContainer.length > 0) {
        		rEditableContainer.find('input').removeAttr('disabled');
        	}
			var analyticsControlBox = $('.analyticsparams-control-buttons');
			if(analyticsControlBox && analyticsControlBox.length > 0) {
				analyticsControlBox.find('button').removeAttr('disabled');
			}
		},

		_enableAutoRefresh: function(isEnable) {
			try {
				var $this = this;
				this.options.isAutoRefreshOn = isEnable;


				var autorefreshTool = $this.options.toolBar[$this.options.toolBarWidget]().find("#autorefreshTool");
				var btnTooltip;

				if(this.options.isAutoRefreshOn == true) {
					//this._initializeRefreshTimer();
					btnTooltip = $si.i18N.Window.tooltip.autorefreshoff;
					if(autorefreshTool.hasClass("autorefreshOff-icon")){
						autorefreshTool.removeClass("autorefreshOff-icon");
					}
					autorefreshTool.addClass("autorefresh-icon");



				} else {
					//this._clearRefreshTimer();
					btnTooltip = $si.i18N.Window.tooltip.autorefresh;
					if(autorefreshTool.hasClass("autorefresh-icon")){
						autorefreshTool.removeClass("autorefresh-icon");
					}
					autorefreshTool.addClass("autorefreshOff-icon")
					 $this.options.isAutoRefreshOn = false;
				}

				autorefreshTool.attr('title', btnTooltip);
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _enableAutoRefresh ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._enableAutoRefresh);
			}

		},
		/* private methods - end */


		/* public methods - start */
		//overwritten method
		initializeWindow: function() {
         	//subclasses should overwrite
         	try {
	         	this.refreshWindow();
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in initializeWindow ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.initializeWindow);
			}

         },

		//overwritten method
		loadExternalResources : function() {
         	try {
				var $this = this;
				if($this.options.windowConfig && $this.options.windowConfig.jsurl){
					requirejs([$this.options.windowConfig.jsurl],function(){
								$si.Logger('baseWindow -> ').info(' Window JS -'+$this.options.windowConfig.jsurl + '-loaded ');
						});
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in loadExternalResources ["+this.options.title+"]");

				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.loadExternalResources);
			}
		},

		applyWindowData : function(windowData) {
			//sub-classes should overwrite this function
		},

		refreshWindow : function() {
			if(this.options.isLoadingData == true) {
				console.log("Cannot refresh window ["+this.options.title+"] as its already loading");
				return;
			}
            $si.events.triggerNotificationClear(this.options.id,this.options.businessViewId);

			console.log("refreshing window ["+this.options.title+"]")
			this.options.isLoadingData = true;
			this._invokeWindowDataService();
		},

		onWindowToolControlClick : function(toolId){
			var $this = this;
			if(toolId == $this.TOOL_ID_REFRESH){
				this.refreshWindow();
			} else if(toolId == $this.TOOL_ID_AUTO_REFRESH){
				this._enableAutoRefresh(!this.options.isAutoRefreshOn);
			} else if(toolId == $this.TOOL_ID_DATA_FILTER){
				this._openDataFilterWindow();
			} else if(toolId == $this.TOOL_ID_TIME_FILTER){
				this._openTimeFilterWindow();
			} else if(toolId == $this.TOOL_ID_R_FILTER){
                this._openRWindow(toolId);
            }
            this._onInfoWindowToolControlClick(toolId);
		},

		isCameraSensitive : function() {
			var windowConfig = this.options.windowConfig;

			//set the flag to show or hide auto refresh icon
			if(windowConfig) {
				var refreshProperties = windowConfig.refreshProperties;
				if(refreshProperties && refreshProperties.refreshOnCameraMove == true && refreshProperties.cameraSensitive == true) {
					return true;
				}
			}

			return false;
		},

		onMapCameraMove : function(cameraEvent) {
			try{
				var cameraEventData = cameraEvent.data;
				if(this.options.isAutoRefreshOn == true && cameraEventData) {
					this.options.boundingBox = cameraEventData.bboxWest+","+cameraEventData.bboxSouth+","+cameraEventData.bboxEast+","+cameraEventData.bboxNorth;
					this.refreshWindow();
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in onMapCameraMove ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.onMapCameraMove);
			}

		},

		onGlobalEvent : function (globalEvent) {
			try{
				if(this.options.isAutoRefreshOn == true && globalEvent.data) {
					var globalEventName = globalEvent.data.name;
					if(globalEventName) {
						//set the flag to show or hide auto refresh icon
						if(this.options.windowConfig) {
							var refreshProperties = this.options.windowConfig.refreshProperties;
							if(refreshProperties && refreshProperties.refreshEvents) {
								$this = this;
								$.each(refreshProperties.refreshEvents,function(index, eventName){
									if(globalEventName == eventName) {
										$this.refreshWindow();
									}
								});
							}
						}
					}
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in onGlobalEvent ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.onGlobalEvent);
			}

		},

		onLassoApplyAlgorithm : function(event) {
			try{
				if(this.options.isAutoRefreshOn == true) {
					if(event.data && event.data.businessViewId && event.data.businessViewId == this.options.windowConfig.businessViewId) {
						this.refreshWindow();
					}
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in onLassoApplyAlgorithm ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.onLassoApplyAlgorithm);
			}

		},

		closeDataFilter : function(){
			try{
				if(this.options.dataFilter && this.options.dataFilter.length > 0){
					var dataFilterId = $(this.options.dataFilter).attr("id");
					var dataFilterWindow = $("#" + dataFilterId +".sti-window");
					this.options.dataFilter = null;
					if(dataFilterWindow && dataFilterWindow.length > 0){
						dataFilterWindow[this.options.dataFilterWidget]("closeWindow");
					}
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in closeDataFilter ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.closeDataFilter);
			}

		},

		closeTimeFilter : function(){
			try{
				if(this.options.timeFilter && this.options.timeFilter.length > 0){
					var timeFilterId = $(this.options.timeFilter).attr("id");
					var timeFilterWindow = $("#" + timeFilterId +".sti-window");
					this.options.timeFilter = null;
					if(timeFilterWindow && timeFilterWindow.length > 0){
						timeFilterWindow[this.options.timeFilterWidget]("closeWindow");
					}
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in closeTimeFilter ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.closeTimeFilter);
			}
		},

		closeRParamsWindow: function(){
			try{
				if(this.options.rAnalyticsParams && this.options.rAnalyticsParams.length > 0){
					var rAnalyticsParamsId = $(this.options.rAnalyticsParams).attr("id");
					var rAnalyticsParamsWindow = $("#" + rAnalyticsParamsId +".sti-window");
					this.options.rAnalyticsParams = null;
					if(rAnalyticsParamsWindow && rAnalyticsParamsWindow.length > 0){
						rAnalyticsParamsWindow[this.options.rParamWindowWidget]("closeWindow");
					}
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in closeRParamsWindow ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.closeRParamsWindow);
			}
		},

		closeDependentWindows : function(){
			this.closeDataFilter();
			this.closeTimeFilter();
			this.closeRParamsWindow();
		},

		closeWindow : function(){
			try {
				var window = $si.businessViewUtil.getBusinessViewWindow(this.options.windowConfig.id,this.options.windowConfig.businessViewId,this.options.windowConfig.businessViewName);
				if(window){
					window.isClosed = true;
				}
				this._clearRefreshTimer();
				this._unbindEvents();
				this.closeDependentWindows();
				this._super();
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in closeWindow ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.closeWindow);
			}

		},

		reset :function() {
			try {
				this._super();
				this.options.timeFilterCriteria = null;
				//TODO reset datafilter from stad
				this.options.dataFilterCriteria = null;
				this.refreshWindow();
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in reset ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.reset);
			}
		},

		/**
		 * Get the Display name for the given attribute name.
		 */
		getDisplayName : function(attributeName) {
			if(this.options.windowConfig && this.options.windowConfig.metadata) {
				var metaDataMap = this.options.windowConfig.metadata;
				if(metaDataMap[attributeName] != undefined){
					return metaDataMap[attributeName].displayName;
				}
			}
			return attributeName;
		},
		/*
		  * formats the attribute value for given attribute name and value
		 */
		formatColumnData : function (columnName, columnValue) {
			var $this = this;
			var metaDataMap = $this.getWindowConfigurationByProperty("metadata");
			if(metaDataMap != undefined && metaDataMap[columnName] != undefined && metaDataMap[columnName].type != this.options.dataTypes[1]) {
				columnValue = $si.formattingUtil.formatData(metaDataMap[columnName].type, metaDataMap[columnName].displayFormat, columnValue);
			}
			return columnValue;
		},
		/*
		 * return metdata property value for given name of the property in window metadata
		 */
		getWindowConfigurationByProperty: function (name) {
            var windowConfiguration;
            if (name != undefined) {
                windowConfiguration = this.options.windowConfig;
                if (windowConfiguration != undefined) {
                    return windowConfiguration[name];
                }
            }
        },
		/* public methods - end */
	});
});