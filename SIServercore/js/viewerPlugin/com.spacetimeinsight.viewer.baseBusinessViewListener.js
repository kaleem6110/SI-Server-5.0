/**
 * Common methods for business view selection, De-Selection and refresh
 *
 */


define([
'siNotification',
'common/com.spacetimeinsight.viewer.ui.loadingDialog',
],function(){

	$.spacetimeinsight.siViewerBaseBusinessViewListener = {

		businesViewRefreshIntervalsMap : {},
		cameraRefreshBusinessViewsMap : {},
		businessViewEventsMap : {},
		moduleLevelWS :null,
		initializeBusinessViewListener : function(){
			$si.routes.initializeGlobalEventsWS(this.onGlobalEventWSSuccess, this.onGlobalEventWSFailure);
			this.initModuleLevelWS(this.onModuleLevelEventSucess,this.onModuleLevelError);
			this._bindEvents();

			this._enableLoadingDialog();
		},

		_bindEvents:function() {
			//bind all business view Events
			$si.eventSource.businessView.bind($si.events.BusinessViewEvents.onBusinessViewLoad, this.onBusinessViewSelect.bind(this));
			$si.eventSource.businessView.bind($si.events.BusinessViewEvents.onBusinessViewUnLoad, this.onBusinessViewDeSelect.bind(this));
			$si.eventSource.businessView.bind($si.events.BusinessViewEvents.evtBusinessViewMetadataLoaded, this.onBusinessViewMetadataLoaded.bind(this));
			$si.eventSource.businessView.bind($si.events.BusinessViewEvents.evtBusinessViewDataLoaded, this._onBusinessViewDataLoadSuccess.bind(this));
			$si.eventSource.businessView.bind($si.events.BusinessViewEvents.onBusinessViewSelectError, this._onBusinessViewDataLoadError.bind(this));
			$si.eventSource.businessView.bind($si.events.BusinessViewEvents.evtRefreshBusinessView, this.onEvtRefreshBusinessView.bind(this));
			$si.eventSource.globalEvents.bind($si.events.GlobalEvents.onGlobalEvent, this.onGlobalEvent.bind(this));
			$si.eventSource.moduleLevelEvents.bind($si.events.ModuleLevelEvents.onLassoShareEvent, this.onModuleLevelEvent.bind(this));
			$si.eventSource.moduleLevelEvents.bind($si.events.ModuleLevelEvents.onLassoUnShareEvent, this.onModuleLevelEvent.bind(this));
			$si.eventSource.moduleLevelEvents.bind($si.events.ModuleLevelEvents.onLassoSharedDeletedEvent, this.onModuleLevelEvent.bind(this));
			$si.eventSource.moduleLevelEvents.bind($si.events.ModuleLevelEvents.onLassoSharedUpdateEvent, this.onModuleLevelEvent.bind(this));
			$si.eventSource.moduleLevelEvents.bind($si.events.ModuleLevelEvents.onFavoriteShareEvent, this.onModuleLevelEvent.bind(this));
			$si.eventSource.moduleLevelEvents.bind($si.events.ModuleLevelEvents.onFavoriteUnShareEvent, this.onModuleLevelEvent.bind(this));
			$si.eventSource.moduleLevelEvents.bind($si.events.ModuleLevelEvents.onFavoriteSharedDeletedEvent, this.onModuleLevelEvent.bind(this));
			$si.eventSource.moduleLevelEvents.bind($si.events.ModuleLevelEvents.onFavoriteSharedUpdateEvent, this.onModuleLevelEvent.bind(this));

			//viewer initialized event
			$si.eventSource.businessView.bind($si.events.Viewer.onViewerInitialized, this.onViewerInitialized.bind(this));
		},

		_enableLoadingDialog : function(){
			$(this.element).append(this.GENERIC_DIV({id : "loading_dialog"}));
			$(this.element).find("#loading_dialog").siViewerLoadingDialog();
		},

		disableLoadingDialog : function(){
			var loadingDialog = $("#loading_dialog[data-role='window']");
			if(loadingDialog && loadingDialog.length > 0){
				loadingDialog.siViewerLoadingDialog("closeDialog");
			}
		},

		onViewerInitialized : function(){
			var $this = this;
			this.disableLoadingDialog();
			// Please move this code to baseMap. Capture the event there and call this method.
			if($this.options && $this.options.drawer) {
				$($this.options.drawer)[$this.options.drawerWidget]("createTabsControls");
				this.applyMapDefaultFav();
			}
		},

		/**
		 * This method will apply the default favorite to the map after the plugin has been initailized.
		 * @returns {}
		 */
		applyMapDefaultFav : function(){
			if(this.options.defaultFavorite)
				this.applyFavorite(this.options.defaultFavorite);
		},

		onGlobalEventWSSuccess : function(evtDataString) {
			var evtData = JSON.parse(evtDataString);
			console.log("globalEvent recieved..."+evtData.name);
			$si.events.triggerGlobalEvent(evtData);
		},

		onGlobalEventWSFailure : function(evtData) {
			$si.Logger('businessviewlistener').fatal("Error while getting the global event :" +  evtData);
		},
		/* initializing module level event websocket service */
		initModuleLevelWS:function(onModuleLevelEventSucess,onModuleLevelError) {
	    	 this.moduleLevelWS = $si.routes.getModuleLevelEventsWS(onModuleLevelEventSucess, onModuleLevelError);
	    },
     /* this function gets called when there is a module level event trigger by different component
		 captures and push to websocket for broadcasting to other users
     */
	 onModuleLevelEvent : function(event){
	    	var $this = this;
		 if($si.Logger('businessviewlistener').isDebugEnabled()){
		 			$si.Logger('businessviewlistener').debug("onModuleLevelEvent triggered :"+event);
		}
		 var eventAsObj=JSON.stringify(event);

		if($this.moduleLevelWS!=null){
			$this.moduleLevelWS.sendMessage(eventAsObj);
		}
		 },

	    /* this function gets called when there is a module level event push to web socket by other user*/
	   onModuleLevelEventSucess :function(responseData){
		    	if($si.Logger('businessviewlistener').isDebugEnabled()){
		   			$si.Logger('businessviewlistener').debug("onModuleLevelEventSucess  :"+responseData);
			}
			var eventData =JSON.parse(responseData);
			var message="";
			if(eventData && eventData.data){
				var id;

				for(var i=0;i<eventData.data.length;i++){
					var d = new Date();
					id=eventData.windowId+"_"+eventData.name+"_"+eventData.data[i].name+"_"+d.getMilliseconds();
					var notification = new $si.notification.Notification({
											id:id,
											windowId 		: eventData.windowId,
											errorMessage	: eventData.data[i].name,
											sourceId		: eventData.name,
											source			: eventData.name,
										});
					try{
					$si.notification.addInfo(notification);
					$si.notification.showNotificationById(eventData.windowId,id);
					}catch(e){
					$si.Logger('businessviewlistener').warn('notification reference error '+e.message);
					}


					if(eventData.data[i].userLoginId!=$si.viewer.userModel.userInfo.loginId){

						//in case if its lasso unshare or shareddelete remove from lassos data
						if(eventData.name===$si.events.ModuleLevelEvents.onLassoUnShareEvent || eventData.name===$si.events.ModuleLevelEvents.onLassoSharedDeletedEvent){
							if($si.viewer.lassoShapesData && $si.viewer.lassoShapesData.lassoData){
								for(var j=0; j<$si.viewer.lassoShapesData.lassoData.length; j++){
									if($si.viewer.lassoShapesData.lassoData[j].id===eventData.data[i].id){
										$si.mapUtils.removeLassoIdFromSelectedLassoArray(eventData.data[i].id);
										$si.viewer.lassoShapesData.lassoData.splice(j,1);
										$si.events.triggerLassoEvent($si.events.LassoEvents.removeLassoFromMapById, {lassoId:eventData.data[i].id});
									}
								}
							 }
						 }
						 if(eventData.name===$si.events.ModuleLevelEvents.onLassoShareEvent){
							 $si.mapUtils.addLasso(eventData.data[i]);
						 }
						 if(eventData.name===$si.events.ModuleLevelEvents.onLassoSharedUpdateEvent){
						  	$si.events.triggerLassoEvent($si.events.LassoEvents.onSharedLassoUpdate, {lasso:eventData.data[0]});
						 }
					}
    			}
		    }
		},
		/* this function gets called when there is a module level event push to web socket by other user failure or dropout etc */
		onModuleLevelError : function(responseData){
			$si.Logger('businessviewlistener').fatal(" error in module level ws "+responseData);
		},
		onBusinessViewSelect : function(businessViewEvent) {
			var $this = this;
			var params = {
				rendertype : "json",
				renderpolicy : "businessViewMetaData",
				languageId : $si.viewer.userModel.userInfo.languageId,
				languageCd : $si.viewer.userModel.userInfo.languageCd,
			};

			$si.routes.invokeService(businessViewEvent.data.businessViewUrl, params, this.onBusinessViewMetadataSuccess, function(e){
				 $this.onBusinessViewMetadataFailure(e,businessViewEvent.data.businessViewId);
			});
		},

		onBusinessViewDeSelect : function(businessViewEvent) {
			var businessViewId = businessViewEvent.data.businessViewId;
			//close all open windows
			$si.businessViewUtil.closeAllBusinessViewWindows(businessViewId);
			//delete metadata
			this._clearRefreshData(businessViewId);
			
			try {
				this.removeEcosystemSession(businessViewId);
			} catch(e) {
				//TODO:log the same error to UI
				$si.Logger(this.pluginName).error("Error ["+e.message+"] onBusinessViewDeSelect");
			}
			
			$si.businessViewUtil.removeBusinessViewMetadata(businessViewId);
			$si.businessViewUtil.removeBusinessViewStatus(businessViewId);
			// Have Applied this for just activating the apply lasso filter dropdown and not the refreshing the layer
			$($si.viewer).trigger("applyLassoFilter", false);
		},

		onBusinessViewMetadataSuccess : function(responseData) {
			$si.businessViewUtil.addBusinessViewMetadata(responseData.id, responseData);
			//added for JIRA#3355, please do not change order first above addbusinessviewmetata should be called
			$($si.viewer).trigger("applyLassoFilter", [true,$si.businessViewUtil.getLassoableBusinessViewDetailsByBusinessViewId(responseData.id)]);
			$si.events.triggerBusinessViewMetadataEvent(responseData);
		},

		onBusinessViewMetadataFailure : function(responseData,businessViewId) {
			responseData.businessViewId = businessViewId
			$si.events.triggerBusinessViewMetadataError(responseData);
		},

		onBusinessViewMetadataLoaded : function(businessViewMetadata) {

			this._initRefreshMetadata(businessViewMetadata);
			try {
				this.loadBusinessView(businessViewMetadata.data);
				this._showAnalyticsInputWindow(businessViewMetadata.data);
			} catch(e) {
				//TODO:log the same error to UI
				$si.Logger("baeslistener").error("Error ["+e.message+"] onBusinessViewMetadataLoaded");
			}
		},

		_initRefreshMetadata : function (businessViewMetadata) {
			try {
				$this = this;
				var businessViewId = businessViewMetadata.data.id;
				var linksMap = businessViewMetadata.data.links;
				var isAutoRefreshEnabled = false;

				for (var businessViewName in linksMap) {
					$si.businessViewUtil.markBusinessViewAsLoading(businessViewId, businessViewName);
					var refreshProperties = linksMap[businessViewName].refreshProperties;
					if(refreshProperties) {
						if(refreshProperties.refreshPeriodically == true) {
							var periodicRefreshMetaData = {timerObject: null, interval: refreshProperties.periodicRefreshInterval};
							if(!this.businesViewRefreshIntervalsMap[businessViewId]) {
								this.businesViewRefreshIntervalsMap[businessViewId] = {};
							}
							this.businesViewRefreshIntervalsMap[businessViewId][businessViewName] = periodicRefreshMetaData;
						}
						if(refreshProperties.refreshOnCameraMove == true) {
							if(!this.cameraRefreshBusinessViewsMap[businessViewId]) {
								this.cameraRefreshBusinessViewsMap[businessViewId] = {};
							}
							this.cameraRefreshBusinessViewsMap[businessViewId][businessViewName] = true;
						}

						if(refreshProperties.refreshEvents) {
							$.each(refreshProperties.refreshEvents,function(index, eventName){
								if(!$this.businessViewEventsMap[businessViewId]) {
									$this.businessViewEventsMap[businessViewId] = {};
								}
								$this.businessViewEventsMap[businessViewId][businessViewName] = eventName;
							});
						}

						if(!isAutoRefreshEnabled) {
							if(refreshProperties.refreshTypes === undefined) {
								isAutoRefreshEnabled = false;
							} else {
								isAutoRefreshEnabled = refreshProperties.refreshTypes.length > 0;
							}
						}
					}

				}

				$si.businessViewUtil.initBusinessViewAutoRefreshStatus(businessViewId, isAutoRefreshEnabled, true);
			} catch(e) {
				//TODO:log the same error to UI
				$si.Logger(this.pluginName).error("Error ["+e.message+"] _initRefreshMetadata");
			}
		},

		_onBusinessViewDataLoadSuccess : function(responseData) {
			try {
				this.onBusinessViewDataLoad(responseData);
			} catch(e) {
				//TODO:log the same error to UI
				$si.Logger(this.pluginName).error("Error ["+e.message+"] _onBusinessViewDataLoadSuccess");
			}
			this._initializeTimer(responseData.data.businessViewId, responseData.data.businessViewName);
		},

		_showAnalyticsInputWindow : function(responseData) {
			try {
				if(responseData) {
					var linksMap = responseData.links;
					if(linksMap) {
						$.each(linksMap,function(businessViewName, linkObj){
							var doNotRunAnalyticsByDefault = linkObj.data.properties.doNotRunAnalyticsByDefault;
							if(doNotRunAnalyticsByDefault && doNotRunAnalyticsByDefault == true) {
								//show the analytics input window here
								$($si.viewer).trigger("openAnalyticsRunWindow", linkObj);
							}
						});
					}
				}
			} catch(e) {
				$si.Logger(this.pluginName).error("Error ["+e.message+"] _showAnalyticsInputWindow");
			}
		},

		_onBusinessViewDataLoadError : function(errorData) {
			try {
				this.onBusinessViewDataLoadError(errorData);
			} catch(e) {
				//TODO:log the same error to UI
				$si.Logger(this.pluginName).error("Error ["+e.message+"] _onBusinessViewDataLoadError");
			}
		},

		_initializeTimer : function(businessViewId, businessViewName) {
			try {
			//check if there is peridoic refresh data
				if(this.businesViewRefreshIntervalsMap[businessViewId]) {
					var periodicRefreshMetaData = this.businesViewRefreshIntervalsMap[businessViewId][businessViewName];
					if(periodicRefreshMetaData && periodicRefreshMetaData.timerObject == null && periodicRefreshMetaData.interval > 0) {
						periodicRefreshMetaData.timerObject =
								setInterval(this.onBusinessViewPeriodicRefresh, periodicRefreshMetaData.interval*1000, businessViewId, businessViewName, {}, this);
					}
				}
			} catch(e) {
				//TODO:log the same error to UI
				$si.Logger(this.pluginName).error("Error ["+e.message+"] _initializeTimer");
			}
		},

		_clearRefreshData : function(businessViewId) {
			this._clearTimer(businessViewId);

			if(this.cameraRefreshBusinessViewsMap[businessViewId]) {
				delete this.cameraRefreshBusinessViewsMap[businessViewId];
			}

			$si.businessViewUtil.clearBusinessViewAutoRefreshStatus(businessViewId);

			if(this.businessViewEventsMap[businessViewId]) {
				delete this.businessViewEventsMap[businessViewId];
			}
		},

		_clearTimer : function(businessViewId) {
			try {
				if(this.businesViewRefreshIntervalsMap[businessViewId]) {
					for (var businessViewName in this.businesViewRefreshIntervalsMap[businessViewId]) {
						var timerObj = this.businesViewRefreshIntervalsMap[businessViewId][businessViewName].timerObject;
						if(timerObj) {
							clearTimeout(timerObj);
						}
					}
					delete this.businesViewRefreshIntervalsMap[businessViewId];
				}
			} catch(e) {
				//TODO:log the same error to UI
				$si.Logger(this.pluginName).error("Error ["+e.message+"] _clearTimer");
			}
		},

		onBusinessViewDataLoad : function(responseData) {
			// Have Applied this for just activating the apply lasso filter dropdown and not the refreshing the layer
			$($si.viewer).trigger("applyLassoFilter", false);
		},

		onBusinessViewDataLoadError  : function(errorData) {
		},

		loadBusinessView : function(businessViewMetadata) {
			//do nothing, sub-classes will override the required functionality
		},

		refreshBusinessView : function(businessViewMetadata, businessViewName) {
			//do nothing, sub-classes will override the required functionality
			console.log('refreshBusinessView');
		},

		removeBusinessView : function(businessViewMetadata) {
			//do nothing, sub-classes will override the required functionality
		},

		loadBusinessViewById : function(businessViewId) {
			this.loadBusinessView($si.businessViewUtil.getBusinessViewMetadata(businessViewId));
		},

		onBusinessViewPeriodicRefresh : function (businessViewId, businessViewName, params, $this) {
			if($si.businessViewUtil.isBusinessViewAutoRefreshOff(businessViewId)) {
				$si.Logger('BusinessViewListener').debug("Cannot refresh business view ["+businessViewId+"] = ["+businessViewName+"] on periodic refresh as the auto refresh is off");
				return;
			}
			$this.refreshBusinessViewById(businessViewId, businessViewName, params, $this);
		},

		refreshBusinessViewById : function(businessViewId, businessViewName, params, $this) {
			console.log("refreshing business view  "+businessViewId+","+businessViewName);
			if(!$this) {
				$this = this;
			}
			$si.events.triggerNotificationClear($si.windowUtil.getViewerPluginWindowId(),businessViewId);
			//if there is no business view name, referesh all
			if(!businessViewName) {
				var businessViewLinks = $si.businessViewUtil.businessViewMetadata[businessViewId].links;
				for (businessViewName in businessViewLinks) {
				  if (businessViewLinks.hasOwnProperty(businessViewName)) {
					 var businessView = $si.businessViewUtil.getBusinessViewById(businessViewId,businessViewName);
					if(!params) params = {};
				  	 if(!params.hasOwnProperty("hideMapData")) {
				  	 	if(businessView.isMapViewSelected === undefined) {
				  	 		params.hideMapData = businessView.data.properties.needsmap != true;
				  	 	} else {
				  			params.hideMapData = !businessView.isMapViewSelected;
				  	 	}
				  	 }
				  	 this.refreshBusinessViewById(businessViewId, businessViewName, params, $this);
				  	 /* when map data is hidden or cleared for a layer we need to close the info window and attribute links windows
				  	  as the map data is not available
				  	  refer JIRA#SI-3405
				  	  */
				  	 if(params.hideMapData && params.hideMapData==true){
				  		$si.businessViewUtil.closeInfoAndAttributeLinkWindows(businessViewId);
				  	 }
				  }
				}
				return;
			}

			if($si.businessViewUtil.isBusinessViewLoading(businessViewId, businessViewName)) {
				//$si.Logger(this.pluginName).info("Cannot refresh business view ["+businessViewId+"] = ["+businessViewName+"] as its already loading");
  	    		$si.Logger('BusinessViewListener').debug("Cannot refresh business view ["+businessViewId+"] = ["+businessViewName+"] as its already loading");
				return;
			}
			$si.businessViewUtil.markBusinessViewAsLoading(businessViewId, businessViewName);
			$this.refreshBusinessView($si.businessViewUtil.getBusinessViewMetadata(businessViewId), businessViewName, params);
		},

		removeEcosystemSession : function(businessViewId) {
			if(businessViewId){
				var $this = this;
				var businessView = $si.businessViewUtil.getBusinessViewMetadata(businessViewId);
				var ecosystemSessionParam;
				if(businessView && businessView.links){
					$.each(businessView.links,function(index,link){
						if(link && link.properties){
							ecosystemSessionParam = {
														operation : "removesession",
														ecosid    : link.properties.ecosid,
													};
							$si.routes.removeEcosystemSession(ecosystemSessionParam,$this.onRemoveSessionSuccess,$this.onRemoveSessionFailure);
						}
					})
				}
				this.removeBusinessView(businessView);
			}
		},

		onRemoveSessionSuccess : function(evt){
			$si.Logger('Business View').debug("Ecosytem Session removed");
		},

		onRemoveSessionFailure : function(error){
			$si.Logger('Business View').error("Error while removing ecosystem session. " + error);
		},

		onEvtRefreshBusinessView : function (businessViewEvent) {
			this.refreshBusinessViewById(businessViewEvent.data.businessViewId, businessViewEvent.data.businessViewName, businessViewEvent.data.refreshParams);
		},

		refreshBusinessViewsRegisteredForEvent : function (eventName) {
			$this = this;
			$.each(this.businessViewEventsMap,function(businessViewId, eventsMap){
				$.each(eventsMap,function(businessViewName, registeredEventName){
					if(eventName == registeredEventName) {
						if($si.businessViewUtil.isBusinessViewAutoRefreshOff(businessViewId)) {
							$si.Logger('BusinessViewListener').debug("Cannot refresh business view ["+businessViewId+"] = ["+businessViewName+"] on event = ["+eventName+"] as the auto refresh is off");
							return;
						}
						$this.refreshBusinessViewById(businessViewId, businessViewName);
					}
				});
			});
		},

		onGlobalEvent : function (globalEvent) {
			if(globalEvent.data) {
				var eventName = globalEvent.data.name;
				if(eventName) {
					this.refreshBusinessViewsRegisteredForEvent(eventName);
				}
			}
		},
	};
});