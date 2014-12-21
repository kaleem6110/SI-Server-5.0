/**
 *
 */

define(['jquery','siNotification','jquery-ui','kendo' ],function() {

	$si.businessViewUtil = {
			//Selected business Views are present in it
			businessViewMetadata : {},
			businessViewRuntimeWindows : {},
			businessViewStatus : {},
			businessViewMap : {},
			ENUM_BUSINESS_VIEW_STATUSES : {NOT_SELECTED:"NOT_SELECTED", LOADING:"LOADING", LOADED:"LOADED", ERROR:"ERROR"},
			tempWindowUIDCounter : 0,
			viewerPlugin : "",
			defaultSelectedBusinessViews : [],
			businessViewAutoRefreshStatusMap : {},

			getSelectedBusinessViewIds : function(){
				var selectedBusinessViews = [];
				$.each(this.businessViewMetadata,function(index,businessView){
					selectedBusinessViews.push(businessView.id);
				});
				return selectedBusinessViews;
			},

			getLassoableBusinessViewDetails : function() {
				var selectedLassoableBusinessViews = [];
				$.each(this.businessViewMetadata,function(businessViewId,businessViewMetaData){
					var linksMap = businessViewMetaData.links;
					$.each(linksMap,function(businessViewName, linkObj){
						if(linkObj.refreshProperties && linkObj.refreshProperties.refreshOnLasso == true) {
							var hideMapData=false;
							if(linkObj.isMapViewSelected === undefined) {
								hideMapData = linkObj.data.properties.needsmap != true;
							} else {
								hideMapData = !linkObj.isMapViewSelected;
							}
							if(!hideMapData){
							selectedLassoableBusinessViews.push(
									{businessViewId : businessViewId,
									ecosid		 : linkObj.data.properties.ecosid,
									artefactName : linkObj.data.properties.artefactname});
							}
						}
					});
				});
				return selectedLassoableBusinessViews;
			},
			getLassoableBusinessViewDetailsByBusinessViewId : function(paramBVId) {
					var selectedLassoableBusinessViews = [];
					$.each(this.businessViewMetadata,function(businessViewId,businessViewMetaData){
						var linksMap = businessViewMetaData.links;
						$.each(linksMap,function(businessViewName, linkObj){
							if(linkObj.refreshProperties && linkObj.refreshProperties.refreshOnLasso == true && paramBVId==businessViewId) {
								selectedLassoableBusinessViews.push(
										{businessViewId : businessViewId,
										ecosid		 : linkObj.data.properties.ecosid,
										artefactName : linkObj.data.properties.artefactname});
							}
						});
					});
					return selectedLassoableBusinessViews;
				},
			clearAllBusinessViewFilter : function(){
				var dataFilterWindow;
				var filterParam;
				$.each(this.businessViewMetadata,function(index,businessView){
					if(businessView){
						businessView =  $si.businessViewUtil.getBusinessViewRightclickData(businessView.id);
						if(businessView && businessView.dataFilterWindow){
							dataFilterWindow = businessView.dataFilterWindow;

							var defaultFilterCriteria = null;
							var isClearFilterCriteria = true;
							if(dataFilterWindow.filterProperties && dataFilterWindow.filterProperties.defaultCriteria){
								defaultFilterCriteria = dataFilterWindow.filterProperties.defaultCriteria;
								isClearFilterCriteria = false;
							}

							filterParam = {
									filterCriteria	: defaultFilterCriteria,
									windowIds 		: [],
									businessViewId	: dataFilterWindow.businessViewId,
									businessViewName: dataFilterWindow.businessViewName,
									isClearFilterCriteria : isClearFilterCriteria,
								};
							dataFilterWindow.filterCriteria = defaultFilterCriteria;
							$si.businessViewUtil.setBusinessViewDataFilterIcon(dataFilterWindow.businessViewId,false);
							$si.routes.setCriteria(filterParam);
						}
					}
				});
			},

			refreshLassoableBusinessViews : function() {
				var businessViewDetails = this.getLassoableBusinessViewDetails();
				if(businessViewDetails) {
					$.each(businessViewDetails,function(index, businessViewDetailsObj){
						$si.events.triggerRefreshBusinessViewEvent(businessViewDetailsObj.businessViewId, businessViewDetailsObj.artefactName);
					});
				}
			},
			refreshBusinessViewsAfterTimeFilter : function(data) {

				if(data) {
					$.each(data,function(index, businessViewDetailsObj){
						$si.events.triggerRefreshBusinessViewEvent(businessViewDetailsObj.layerid, businessViewDetailsObj.artefactname);
					});
				}
			},

			appplyTimeFilterOnWindows: function(data) {
				var $this = this;
				if(data) {
				$.each(data,function(index, businessViewDetailsObj){


					if(businessViewDetailsObj.layerid){
    	    		var linksMap = $si.businessViewUtil.businessViewMetadata[businessViewDetailsObj.layerid].links;
		   	    	for (var businessViewName in linksMap) {
	    	    		var layer = linksMap[businessViewName];
	    	    		if(layer){
	    	    			var windows = layer.data.windows;
	    	    			if(windows){
		    	    			$.each(windows,function(index,window){
		    	    				if(window && window.isClosed != undefined && !window.isClosed && window.timeAware===true){
		    	    					$this.invokeWindowMethodByWindowObject(window,"applyTimeFilter",businessViewDetailsObj);
		    	    				}
		    	    			});
	    	    			}


	    	    		}
	    	    	}

    	    	}
		});
    	    	} //end of if

		},



			/** method is also used for opening load by default windows **/
			addBusinessViewMetadata : function (businessViewId, businessViewMetaData) {
				businessViewMetaData.isDefaultLoaded = false;
				this.businessViewMetadata[businessViewId] = businessViewMetaData;
			},


			onBusinessViewLoadComplete:function(businessViewId,businessViewName){
				var $this = this;
				var businessViewMetaData = this.businessViewMetadata[businessViewId];
				if(businessViewMetaData && !businessViewMetaData.isDefaultLoaded){
					businessViewMetaData.isDefaultLoaded = true;
					var linksMap = businessViewMetaData.links;
					var linkObj;
					for (var name in linksMap) {

						if (name == businessViewName && linksMap.hasOwnProperty(businessViewName)) {
							linkObj = linksMap[businessViewName];
							var windows = $si.viewer.favoriteOpenBusinessViewWindows[businessViewId];
							//Do not open default windows when favorites are applied
							if($si.viewer.favoriteOpenBusinessViewWindows &&
									(($si.viewer.favoriteOpenBusinessViewWindows.length === undefined) ||
										$si.viewer.favoriteOpenBusinessViewWindows.length == 0)){
								windows = linkObj.data.windows;
							}
							if(windows) {
								$(windows).each(function(index,siWindow){
									if(siWindow != null) {
										siWindow.businessViewId = businessViewId;
										siWindow.businessViewName = businessViewName;
										if(siWindow.windowType == "DataFilter"){
											$this.setBusinessViewDefaultFilter(siWindow);
										}
										if(siWindow.loadByDefault == true){
											$this.openBusinessViewWindowByWindowObj(siWindow);
										}
									}
								});
							}
						}
						if(this.businessViewMap[businessViewId].onSelectEvent) {
		  	    			window[this.businessViewMap[businessViewId].onSelectEvent](businessViewId,businessViewName, businessViewMetaData,$si.businessViewUtil.getBreadCrum(businessViewId));
		    			}
					}
				}
			},


			raiseBusinessViewSelectError:function(error) {
				if(error){
					$si.businessViewUtil.markBusinessViewAsError(error.businessViewId, error.businessViewName);

					if(!error._errorDesc){
						error._errorDesc = error.extData;
					}

					$si.events.triggerError(
								{
									windowId:$si.windowUtil.getViewerPluginWindowId() ,
									message:error._errorDesc,
									sourceId: error.businessViewId,
									sourceTitle:$si.businessViewUtil.getBreadCrum(error.businessViewId)
								});
	    	    	var businessViewNode = this.businessViewMap[error.businessViewId];
	    	    	var eventData = {businessViewId: businessViewNode.id, businessViewName:error.businessViewName, businessViewUrl: businessViewNode.nodeUrl };
	 				$si.events.triggerBusinessViewEvent($si.events.BusinessViewEvents.onBusinessViewSelectError, eventData);
					$si.Logger('businessView').error("Error while fetching the ecosystem event :" +  error);
				}
			},

			removeBusinessViewMetadata : function (businessViewId) {
				if (this.businessViewMetadata.hasOwnProperty(businessViewId)) {

					var linksMap = this.businessViewMetadata[businessViewId].links;
					var linkObj;
					for (var businessViewName in linksMap) {
						if (linksMap.hasOwnProperty(businessViewName)) {
				            try {
							    if(this.businessViewMap[businessViewId].onDeSelectEvent) {
				  	    			window[this.businessViewMap[businessViewId].onDeSelectEvent](businessViewId,businessViewName,this.businessViewMetadata[businessViewId],$si.businessViewUtil.getBreadCrum(businessViewId));
				    			}
				            } catch(e) {

								$si.events.triggerError(
									{
										windowId:$si.windowUtil.getViewerPluginWindowId() ,
										message:e.message,
										sourceId: businessViewId,
										sourceTitle:$si.businessViewUtil.getBreadCrum(businessViewId)
									});

								$si.Logger('businessView').error("Error executing custom deselectevent :" +  e);
				            }
						}
					}


		            delete this.businessViewMetadata[businessViewId];


		        }
			},

			getBusinessViewMetadata : function(businessViewId){
	   	    	return this.businessViewMetadata[businessViewId];
	   	    },

			getBusinessViewLinkMetadata : function(businessViewId, businessViewName){
				if(businessViewId && businessViewName) {
	   	    		return this.businessViewMetadata[businessViewId].links[businessViewName];
	   	    	}
	   	    	return null;
	   	    },

			isBusinessViewLoading : function (businessViewId, businessViewName) {
				var businessViewStatus = this.businessViewStatus[businessViewId];

				if(businessViewStatus) {
					if(businessViewName) {
						if(businessViewStatus[businessViewName] == this.ENUM_BUSINESS_VIEW_STATUSES.LOADING) {
							return true;
						}
					} else {
						var isLoading = false;
						for(var businessViewName in businessViewStatus){
							if(businessViewStatus[businessViewName] == this.ENUM_BUSINESS_VIEW_STATUSES.LOADING){
								isLoading = true;
							}
						}
						return isLoading;
					}
				}
				return false;
			},

			isBusinessViewLoaded : function (businessViewId, businessViewName) {
				if(this.getBusinessViewMetadata(businessViewId)){
					return true;
				}
				return false;
			},

			markBusinessViewAsLoading : function (businessViewId, businessViewName) {
				this.updateBusinessViewStatus(businessViewId,businessViewName, this.ENUM_BUSINESS_VIEW_STATUSES.LOADING);
				console.log("mark business view as loading "+businessViewId+","+businessViewName);
    	    	var eventData = {businessViewId: businessViewId, businessViewName: businessViewName };
 				$si.events.triggerBusinessViewEvent($si.events.BusinessViewEvents.evtBusinessViewDataLoading, eventData);
			},

			markBusinessViewAsLoaded : function (businessViewId, businessViewName) {
				$($si.sessionTimeOut).trigger("validateAndExtendSession",["business View Loaded-"+businessViewName]);
				this.updateBusinessViewStatus(businessViewId,businessViewName, this.ENUM_BUSINESS_VIEW_STATUSES.LOADED);
				console.log("mark business view as loaded "+businessViewId+","+businessViewName);
				this.onBusinessViewLoadComplete(businessViewId,businessViewName);
    	    	var eventData = {businessViewId: businessViewId, businessViewName: businessViewName };
				 $si.events.triggerBusinessViewEvent($si.events.BusinessViewEvents.evtBusinessViewDataLoaded, eventData);
			},

			markBusinessViewAsError : function (businessViewId, businessViewName) {
				this.updateBusinessViewStatus(businessViewId,businessViewName, this.ENUM_BUSINESS_VIEW_STATUSES.ERROR);
				//console.log("mark business view as error "+businessViewId+","+businessViewName);
			},

			removeBusinessViewStatus : function (businessViewId) {
				delete this.businessViewStatus[businessViewId];
			},

			updateBusinessViewStatus : function (businessViewId, businessViewName, status) {
				if(!this.businessViewStatus[businessViewId]) {
					this.businessViewStatus[businessViewId] = {};
				}
				this.businessViewStatus[businessViewId][businessViewName] = status;
			},

			updateBusinessViewMapState : function (businessViewId, businessViewName,state) {
				var businessView = this.getBusinessViewById(businessViewId,businessViewName);
				if(businessView){
					 businessView.isMapViewSelected = state;
				}
			},

			getBusinessViewStatus : function (businessViewId, businessViewName) {
				if(this.businessViewStatus[businessViewId]) {
					return this.businessViewStatus[businessViewId][businessViewName];
				}

				return null;
			},

			getBusinessViewMapState: function(businessViewId, businessViewName){
				var businessView = this.getBusinessViewById(businessViewId,businessViewName);
				if(businessView){
					return businessView.isMapViewSelected;
				}
				return null;
			},

			getBusinessViewRightclickData : function(businessViewId){
				var returnObject = {};
				returnObject.businessViewId = businessViewId;
				returnObject.needsMap = false;
				returnObject.isTimeAware = false;
				returnObject.enableAutorefresh = false;
				returnObject.needsDataFilter = false;
				if(this.businessViewMetadata[businessViewId]) {
					var arrWindows = [];

					var linksMap = this.businessViewMetadata[businessViewId].links;
		   	    	var linkObj;
		   	    	for (var businessViewName in linksMap) {
					  if (linksMap.hasOwnProperty(businessViewName)) {
				    	linkObj = linksMap[businessViewName];

				    	if(linkObj.refreshProperties && linkObj.refreshProperties.refreshTypes) {
				    		returnObject.enableAutorefresh = true;
				    	}

						var linkProperties = linkObj.data.properties;
			    		if(linkProperties) {
			    			if(!returnObject.needsMap) {
			    		  		returnObject.needsMap = linkProperties.needsmap;
			    		  	}

			    		  	if(!returnObject.isTimeAware) {
			    		  		returnObject.isTimeAware = linkProperties.istimeaware;
			    		  	}
			    		  	returnObject.layerProperties=linkProperties;
						}

						var windows = linkObj.data.windows;
						$(windows).each(function(index,window){
			    			if(window && window.windowType == "DataFilter"){
			    				if(!returnObject.dataFilterWindow) {
			    					returnObject.dataFilterWindow = window;
				    				returnObject.needsDataFilter = true;
				    			}
			    			} else {
				    			arrWindows.push(window);
			    			}
			    		});
					  }
					}

					returnObject.windows = arrWindows;
					returnObject.description=this.businessViewMap[businessViewId].description;
					returnObject.lastUpdateTime = linkObj.lastUpdateTime;
				}
	   	    	return returnObject;
	   	    },

			getBusinessViewById : function(businessViewId, businessViewName){
				if(this.businessViewMetadata[businessViewId]){
					var linksMap = this.businessViewMetadata[businessViewId].links;
					//if business view name is passed return the corresponding link
					//if not return the first one
					if(businessViewName) {
						return linksMap[businessViewName];
					} else {
			   	    	for (var businessViewName in linksMap) {
						  if (linksMap.hasOwnProperty(businessViewName)) {
					    		return linksMap[businessViewName];
							}
						}
					}
				}
				return null;
			},

    	    openBusinessViewWindow : function(windowId, businessViewId, businessViewName, customWindowDataParams, uID,windowFavorite, uTitle){
    	    	var window = this.getBusinessViewWindow(windowId, businessViewId, businessViewName);
   	    		this.openBusinessViewWindowByWindowObj(window, customWindowDataParams, uID, windowFavorite, uTitle);
    	    },

    	    openBusinessViewWindowByWindowObj : function(window, customWindowDataParams, uID,windowFavorite, uTitle){
    	    	var notificationId =  window.businessViewId + "_" + window.businessViewName + "_"  + window.id;
   		    	try {
	    	    	if(window && customWindowDataParams){
	    	    		var _customDataParams = {_customDataParams : customWindowDataParams};
						window = $.extend({},window, _customDataParams);
					}
	    	    	if(window && window.windowComponentProperties){
	    	    		var windowConfig = $.extend({},window);
	    	    		var title = window.title ? window.title : window.id;

	    	    		if(windowConfig && windowConfig.showBreadCrumbsInTitle && windowConfig.showBreadCrumbsInTitle == true){
	    	    			var breadCrumTitle=this.getBreadCrum(window.businessViewId);
	    	    			title=title+ " > " +breadCrumTitle   ;
	    	    		}

	    	    		var windowDivId = window.id;
	    	    		if(uID) {
	    	    			windowDivId += "_"+uID;
	    	    			if(uTitle) {
	    	    				title =title+" > "+uTitle;
	    	    			} else {
	    	    				title =title+" > "+uID;
	    	    			}
	    	    		}

	    	    		var windowDivId = window.businessViewId + "_" + window.businessViewName + "_" + windowDivId;

	    	    		var windowAttributes ;
						if(windowFavorite) {
	    	    			windowAttributes =  windowFavorite.windowAttributes;
	    	    		} else {
	    	    			windowAttributes = $.extend({position : window.position},window.dimension);
	    	    		}

	    	    		var windowParams = {
	    	    							windowId : windowDivId,
	    	    							pluginName 	: window.windowComponentProperties.windowPluginName,
	    	    							pluginJS	: window.windowComponentProperties.windowPluginJSUrl,
	    	    							parameters	: {
															windowAttributes : windowAttributes,
															toolBarWidget    : window.windowComponentProperties.toolbarPluginName,
															toolBarWidgetJS  : window.windowComponentProperties.toolbarPluginJSUrl,
															drawerWidget     : window.windowComponentProperties.drawerPluginName,
															drawerWidgetJS   : window.windowComponentProperties.drawerPluginJSUrl,
															group			 : window.taskbarProperties.taskbarGroupName,
															groupIcon		 : window.taskbarProperties.taskbarGroupIconUrl,
															title 			 : title,
															windowIcon       : window.iconUrl,
															windowConfig	 : windowConfig,
														},
	    	    						};


						//Commented out on purpose as the js files need to be loaded from serverresources or a different path
	    	    		/** This will work in both scenarios with or without jsUrl. jsUrl should not have .js extension and present relative to js folder **/
	    	    		//if(windowConfig.jsurl){
	    	    			/** check if we can add this check on server side **/
	    	    			//windowConfig.jsurl = windowConfig.jsurl.replace(".js","");
	    	    		//}
			    		requirejs([windowConfig.jsurl],function(customJS){
			    			windowParams.parameters.customJS = customJS;
			    			if(windowFavorite) {
		    	    			windowParams.parameters.favorite = windowFavorite;
		    	    			//TODO: throw an error if the plugin properites are not set.
		    	    			$si.windowUtil.openWindow(windowParams,true);
		    	    		} else {
		    	    			//TODO: throw an error if the plugin properites are not set.
		    	    			$si.windowUtil.openWindow(windowParams);
		    	    		}
		    	    		window.isClosed = false;
			    		});
	    	    	}
   		    	} catch(e) {
					$si.events.triggerError({
								windowId:notificationId ,
								message:e.message,
								messageTemplate:"Error [#MESSAGE#] occurred while loading the business view window ["+window.name+"]",
								sourceId: window.businessViewId,
								sourceTitle:$si.businessViewUtil.getBreadCrum(window.businessViewId) + " > " + window.name
					});

   		    	}
    	    },



    	    closeBusinessViewWindow : function(windowId, businessViewId, businessViewName, uID){
    	    	this.closeBusinessViewWindowByWindowObj(this.getBusinessViewWindow(windowId, businessViewId, businessViewName), uID);

    	    },

    	    closeBusinessViewWindowByWindowObj : function(window, uID){
    	    	var windowId;
    	    	var notificationId =  window.businessViewId + "_" + window.businessViewName + "_"  + window.id;
    	    	try {
	    	    	if(window && window.windowComponentProperties){
	    	    		windowId =  window.businessViewId + "_" + window.businessViewName + "_" + window.id;
	    	    		if(uID) {
	    	    			windowId += "_"+uID;
	    	    		}
						var pluginName = window.windowComponentProperties.windowPluginName;
						$si.windowUtil.closeWindow(windowId,pluginName);
	    	    	}
    	    	} catch(e) {
   		    		window.inErrorState = true;
 					$si.events.triggerError({
								windowId:windowId ,
								message:e.message,
								messageTemplate:"Error [#MESSAGE#] occurred while loading the business view window ["+window.name+"]",
								sourceId: window.businessViewId,
								sourceTitle:$si.businessViewUtil.getBreadCrum(window.businessViewId) + " > " + window.name
					});


				}
    	    },

    	    closeAllBusinessViewWindows : function(businessViewId){
    	    	var $this = this;
    	    	if(businessViewId){

					try {
						//close export window
	    	    		if($si.viewer.exportWindow && $si.viewer.exportWindow != null) {
		    	    		if($si.viewer.windowParams && $si.viewer.windowParams.layerid){
		    	    			if(businessViewId == $si.viewer.windowParams.layerid){
									$si.viewer.exportWindow.close();
								}
		    	    		}
	    	    		}
    	    		} catch(e) {
    	    			//ignore
    	    		}

    	    		var linksMap = $si.businessViewUtil.businessViewMetadata[businessViewId].links;
		   	    	for (var businessViewName in linksMap) {
	    	    		var layer = linksMap[businessViewName];
	    	    		if(layer){
	    	    			var windows = layer.data.windows;
	    	    			if(windows){
		    	    			$.each(windows,function(index,window){
		    	    				if(window && window.isClosed != undefined && !window.isClosed){
		    	    					$this.closeBusinessViewWindowByWindowObj(window);
		    	    					window.isClosed = true;
		    	    				}
		    	    			});
	    	    			}

	    	    			/** if layer is time aware check for time filter window and close **/
	    	    			if(layer.data && layer.data.properties && layer.data.properties.istimeaware){
	    	    				this._closeTimeFilter(layer.data.id);
	    	    			}

	    	    			/** if layer has analytics params check for RParam window and close **/
	    	    			if(layer.data && layer.data.properties && layer.data.properties.hasAnalytics){
	    	    				this._closeRProcessWindow(layer.data.id);
	    	    			}
	    	    		}
	    	    	}
	    	    	this.closeAllRuntimeBusinessViewWindows(businessViewId);
    	    	}
    	    },

    	    _closeTimeFilter : function(id){
    	    	if(id){
    	    		var timeFilterWindow = $("#" + id +"_timefilter.time-filter.sti-window ");
    				if(timeFilterWindow && timeFilterWindow.length > 0){
    					/** this window opened from right click menu.**/
    					/**widget name and id need to update if any change made in right click menu **/
    					timeFilterWindow.siViewerTimeFilter("closeWindow");
    				}
    	    	}
    	    },

    	    _closeRProcessWindow : function(id){
    	    	if(id){
    	    		var rParamWindow = $("#" + id +"_rparamwindow.sti-window");
    				if(rParamWindow && rParamWindow.length > 0){
    					/** this window opened from right click menu.**/
    					/**widget name and id need to update if any change made in right click menu **/
    					rParamWindow.siViewerREditableParameters("closeWindow");
    				}
    	    	}
    	    },

			getAllBusinessViewWindows : function(businessViewId){
    	    	var $this = this;
    	    	var arrWindows = [];
    	    	if(businessViewId){
	    	    	var linksMap = $si.businessViewUtil.businessViewMetadata[businessViewId].links;
		   	    	for (var businessViewName in linksMap) {
	    	    		var layer = linksMap[businessViewName];
	    	    		if(layer){
	    	    			var windows = layer.data.windows;
	    	    			if(windows){
		    	    			$.each(windows,function(index,window){
		    	    				if(window && !window.isClosed){
		    	    					arrWindows.push(window);
		    	    				}
		    	    			});
	    	    			}
	    	    		}
	    	    	}
    	    	}

    	    	return arrWindows;
    	    },

			getBusinessViewWindow : function(windowId, businessViewId, businessViewName){
    	    	var returnWindow;
    	    	if(businessViewId){
    	    		var layer = $si.businessViewUtil.getBusinessViewById(businessViewId, businessViewName);
    	    		if(layer){
    	    			var windows = layer.data.windows;
    	    			if(windows){
	    	    			$.each(windows,function(index,window){
	    	    				if(window && window.id == windowId){
	    	    					returnWindow = window;
	    	    					return false;
	    	    				}
	    	    			});
    	    			}
    	    		}
    	    	}
    	    	return returnWindow;
    	    },

    	    minimizeBusinessViewWindow : function(windowId, businessViewId, businessViewName){
    	    	var window = this.getBusinessViewWindow(windowId, businessViewId, businessViewName);
    	    	if(window){
    	    		$si.windowUtil.minimizeWindow(windowId, window.pluginName);
    	    	}
    	    },

    	    maximizeBusinessViewWindow : function(windowId, businessViewId, businessViewName){
    	    	var window = this.getBusinessViewWindow(windowId, businessViewId, businessViewName);
    	    	if(window){
    	    		$si.windowUtil.maximizeWindow(windowId, window.pluginName);
    	    	}
    	    },

    	    restoreBusinessViewWindow : function(windowId, businessViewId, businessViewName){
    	    	var window = this.getBusinessViewWindow(windowId, businessViewId, businessViewName);
    	    	if(window){
    	    		$si.windowUtil.restoreWindow(windowId, window.pluginName);
    	    	}
    	    },

    	    bringBusinessViewWindowToFront : function(windowId, businessViewId, businessViewName){
    	    	var window = this.getBusinessViewWindow(windowId, businessViewId, businessViewName);
    	    	if(window){
    	    		$si.windowUtil.bringWindowToFront(windowId, window.pluginName);
    	    	}
    	    },

			openBusinessViewInfoWindow : function(windowId, businessViewId, businessViewName, jsonParamsString, uID, uTitle){
				var extParams = {extParams:jsonParamsString};
				$si.businessViewUtil.openRuntimeBusinessViewWindow(windowId, businessViewId, businessViewName, extParams, uID, uTitle);
			},

    	    openRuntimeBusinessViewWindow : function(windowId, businessViewId, businessViewName, customWindowDataParams, uID, uTitle){
    	    	if(uID === undefined) {
    	    		uID = this.tempWindowUIDCounter++;
    	    	}
				this.openBusinessViewWindow(windowId, businessViewId, businessViewName, customWindowDataParams, uID, null, uTitle);

				if(!this.businessViewRuntimeWindows[businessViewId]) {
					this.businessViewRuntimeWindows[businessViewId] = {};
					this.businessViewRuntimeWindows[businessViewId][businessViewName] = {};

				}
				if(!this.businessViewRuntimeWindows[businessViewId][businessViewName][uID]){
					this.businessViewRuntimeWindows[businessViewId][businessViewName][uID] = [];
				}
				this.businessViewRuntimeWindows[businessViewId][businessViewName][uID].push(windowId);
    	    },

    	    closeRuntimeBusinessViewWindow : function(windowId, businessViewId, businessViewName, uID){
    	    	this.closeBusinessViewWindow(windowId, businessViewId, businessViewName, uID);
				delete this.businessViewRuntimeWindows[businessViewId] [businessViewName][uID];
    	    },

    	    closeAllRuntimeBusinessViewWindows : function(businessViewId){
    	    	$this = this;
				if(this.businessViewRuntimeWindows[businessViewId]) {
					$.each(this.businessViewRuntimeWindows[businessViewId], function(businessViewName,arrUIDs) {
						$.each(arrUIDs,function(uID,runtimeWindowIdList){
							if(runtimeWindowIdList && runtimeWindowIdList.length > 0){
    	    					$.each(runtimeWindowIdList,function(index,windowId){
    	    						$this.closeBusinessViewWindow(windowId, businessViewId, businessViewName, uID);
    	    					});
    	    				}
						});
					});

					delete this.businessViewRuntimeWindows[businessViewId];
				}
    	    },

    	    getBusinessViewMetadataSize : function(){
    	    	var size = 0;
    	    	if($si.businessViewUtil.businessViewMetadata){
    	    		size = Object.keys($si.businessViewUtil.businessViewMetadata).length;
    	    	}
    	    	return size;
    	    },

    	    getBreadCrum : function(businessViewId) {
    	    	if( this.businessViewMap[businessViewId]) {
    	    		return this.businessViewMap[businessViewId].breadCrum;
    	    	} else {
    	    		return null;
    	    	}
    	    },

    	    getBusinessViewIdByName : function(businessViewName,seperator) {
    	    	if(!seperator){
    	    		seperator = "/";
    	    	}
    	    	var businessViewId = null;
   	    		$.each(this.businessViewMap,function(index,node){
   	    			if(node && node.breadCrum && node.breadCrum.replace(" > ",seperator) == businessViewName){
   	    				businessViewId = node.id;
   	    				return false;
   	    			}
   	    		});
   	    		return businessViewId;
    	    },


    	    loadDefaultSelections : function() {
    	    	var $this = this;
    	    	if(this.defaultSelectedBusinessViews && this.defaultSelectedBusinessViews.length > 0){
    	    		this.selectDeselectBusinessViewList(this.defaultSelectedBusinessViews);
    	    	}else{
    	    		this.defaultSelectedBusinessViews = [];
    	        	 if(this.businessViewMap){
    	        		 $.each(this.businessViewMap,function(key,businessView){
    	 					if(businessView && businessView.selected == true){
    	 						$this.defaultSelectedBusinessViews.push(businessView);
    	 						$this.selectBusinessView(businessView.id);
    	 					}else{
    	 						$this.deSelectBusinessView(businessView.id);
    	 					}
    	    	    	});
    	        	 }
    	    	}
           },

           /** Select Business views from list and de-select all other views **/
           /** pass empty list to deselect all **/
           selectDeselectBusinessViewList : function(selectedBusinessViewList){
        	   var $this = this;
        	   var isSelected = false;
        	   this._setNodesInMap($si.viewer.businessViewObserver.businessView.nodeList);
 	      	   if(this.businessViewMap){
        		   $.each(this.businessViewMap,function(key,businessView){
        			   isSelected = false;
        			   if(selectedBusinessViewList && selectedBusinessViewList.length > 0){
        				   $.each(selectedBusinessViewList,function(index,selectedBusinessView){
        					  if(selectedBusinessView && businessView && selectedBusinessView.id == businessView.id){
        						  $this.selectBusinessView(businessView.id);
        						  selectedBusinessViewList.splice(index,1);
        						  isSelected = true;
        						  return false;
        					  }
        				   });
        			   }
        			   if(!isSelected){
        				   $this.deSelectBusinessView(businessView.id);
        			   }
        		   });
        	   }
           },

           deselectAllBusinessViews : function(){
        	   this.selectDeselectBusinessViewsById(this.getSelectedBusinessViewIds(), false);
           },

           selectDeselectBusinessViewsById : function(businessViewIds,isSelect){
        	   try{
        		   	 var $this = this;
	              	 if(businessViewIds && businessViewIds.length > 0){
	              		 $.each(businessViewIds,function(index,businessViewId){
	              			 if(businessViewId){
	              				 if(isSelect){
	              					 $this.selectBusinessView(businessViewId);
	              				 }else{
	              					 $this.deSelectBusinessView(businessViewId);
	              				 }
	              			 }
	              		 });
	              	 }
        	   }catch(er){
        		   $si.Logger('businessViewUtil').error("Error in selectDeselectBusinessViewsById "+ er);
        	   }
           },


    	    /** below two methods are used to called for code select de-select **/
			selectBusinessView : function(businessViewId) {
				if(!this.businessViewMap[businessViewId]) {
					this._setNodesInMap($si.viewer.businessViewObserver.businessView.nodeList);
				}
				var eventData = {
									businessViewId: businessViewId,
									isSelected: true,
								};
				$si.events.triggerBusinessViewEvent($si.events.BusinessViewEvents.onBusinessViewSelect, eventData);
			},

			deSelectBusinessView : function(businessViewId) {
				var eventData = {
									businessViewId: businessViewId,
									isSelected: false,
								};
				$si.events.triggerBusinessViewEvent($si.events.BusinessViewEvents.onBusinessViewDeSelect, eventData);
			},

			_setNodesInMap : function(nodeList) {
	   	    	 var $this = this;
	   	    	 $.each(nodeList,function(index,node){
	               	if(node.items) {
	   	    			$this._setNodesInMap(node.items);
	               	} else {
	               		$this.businessViewMap[node.id] = node;
	               	}
	   	    	 });
	   	    },

    	    getWindowDivId : function(window){
    	    	if(window){
    	    		return (window.businessViewId + "_" + window.businessViewName + "_" + window.id).removeSpecialCharacter();
    	    	}
    	    },

    	    invokeWindowMethod : function(businessViewId,businessViewName,windowId,methodName,methodParam){
    	    	var window = this.getBusinessViewWindow(windowId, businessViewId, businessViewName);
    	    	this.invokeWindowMethodByWindowObject(window,methodName,methodParam);

    	    },

    	    invokeWindowMethodByWindowObject : function(window,methodName,methodParam){
    	    	if(window){
    	    		var windowDivId = this.getWindowDivId(window);
    	    		var siWindow = $si.windowUtil.getWindowById(windowDivId)
    	    		if(siWindow){
    	    			 $("#" + siWindow.id +".sti-window")[siWindow.type](methodName,methodParam);
    	    		}
    	    	}
    	    },

    	    getViewerPlugin : function(){
    	    	if(this.viewerPlugin) {
    				return $(".si-viewer-" + this.viewerPlugin.toLowerCase());
    	    	}
    	    },

           minimizeViewerPluginWindow : function(){
              var viewerPlugin = this.getViewerPlugin();
              if(viewerPlugin && viewerPlugin.length > 0){
                    viewerPlugin.data("kendoWindow").wrapper.hide();
              }
           },

           restoreViewerPluginWindow : function(){
              var viewerPlugin = this.getViewerPlugin();
              if(viewerPlugin && viewerPlugin.length > 0){
                    viewerPlugin.data("kendoWindow").wrapper.show();
              }
           },



           updateErrorState:function(businessViewId,windowId,inErrorState){
           		var businessViewLayerErrorState = inErrorState;
				var businessView = $si.businessViewUtil.getBusinessViewRightclickData(businessViewId);
				if(businessView) {
					if(windowId ==  $si.windowUtil.getViewerPluginWindowId()){
						businessView.mapViewInErrorState = inErrorState;
					}
					if(businessView.window) {
						$(businessView.windows).each(function(index,siWindow){
							if(siWindow) {
								if(siWindow.id == windowId){
									siWindow.inErrorState = inErrorState;
								}
								if(siWindow.inErrorState == true){
									businessViewLayerErrorState = true;
								}
							}
						});

						if(businessView.mapViewInErrorState && businessView.mapViewInErrorState == true){
							businessViewLayerErrorState = true;
						}
					}

				}

				return businessViewLayerErrorState;
			},

			setBusinessViewDefaultFilter : function(window){
				if(window && window.filterProperties && window.filterProperties.defaultCriteria){
					/** this filter criteria is already applied on business view by server **/
					window.filterCriteria = JSON.stringify(window.filterProperties.defaultCriteria);
				}
			},

			setShowDefaultFilterNotification : function(businessViewId,businessViewName,windowId,isShow){
				var siWindow = this.getBusinessViewWindow(windowId, businessViewId, businessViewName);
				siWindow.showDefaultFilterNotification = isShow;
			},

			setBusinessViewDataFilterIcon : function(businessViewId,isEnable){
				var dataFilterImg = $("#" + businessViewId + "-layer-datafilter-icon");
				if(dataFilterImg && dataFilterImg.length > 0){
					if(isEnable){
						dataFilterImg.addClass("layer-datafilter-icon");
					}else{
						dataFilterImg.removeClass("layer-datafilter-icon");
					}
				}
			},

			initBusinessViewAutoRefreshStatus : function (businessViewId, isAutoRefreshEnabled, isAutoRefreshOn) {
				this.businessViewAutoRefreshStatusMap[businessViewId] = {isAutoRefreshEnabled : isAutoRefreshEnabled, isAutoRefreshOn : true};
			},

			clearBusinessViewAutoRefreshStatus : function (businessViewId) {
				delete this.businessViewAutoRefreshStatusMap[businessViewId];
			},

			setBusinessViewAutoRefreshStatus : function (businessViewId, isAutoRefreshOn) {
				this.businessViewAutoRefreshStatusMap[businessViewId].isAutoRefreshOn = isAutoRefreshOn;
			},

			getBusinessViewAutoRefreshStatus : function (businessViewId) {
				return this.businessViewAutoRefreshStatusMap[businessViewId].isAutoRefreshOn;
			},

			isBusinessViewAutoRefreshOff : function(businessViewId) {
				var autoRefreshObj = this.businessViewAutoRefreshStatusMap[businessViewId];
				if(autoRefreshObj && autoRefreshObj.isAutoRefreshOn == true) {
					return false;
				}
				return true;
			},
			closeBusinessViewWindowsByWindowType : function(businessViewId,attrName){
					var closeableWindows = $("div[parent-layer='" + businessViewId + "'][window-type='" + windowType + "']");
				if(closeableWindows && closeableWindows.length > 0){
					$.each(closeableWindows,function(index,closeWindow){
					$(closeWindow)[$(closeWindow).attr("plugin")]("closeWindow");
					})
				}
			},
			closeInfoAndAttributeLinkWindows : function(businessViewId){
					var closeableWindows = $("div[parent-layer='" + businessViewId + "'][runtime-window='runtime-window']");
				if(closeableWindows && closeableWindows.length > 0){
					$.each(closeableWindows,function(index,closeWindow){
					$(closeWindow)[$(closeWindow).attr("plugin")]("closeWindow");
					})
				}
			},

	};
});