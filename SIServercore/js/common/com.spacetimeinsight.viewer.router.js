define(['siViewerData','siAjaxUtil','siWebSockets','siViewerLogger'],function($si) {
	$si.routes = {

	   BASE_URL             		 : 'dataRenderer.do',
	   FILTER_ACTION				 : 'filterAction.do',
	   APPLICATION_CONFIG_RENDERER	 : 'com.spacetimeinsight.renderer.viewer.ApplicationConfigurationRenderer',
	   BUSINESS_VIEW_DATA_RENDERER   : 'com.spacetimeinsight.renderer.viewer.BusinessViewRenderer',
	   FAVORITE_DATA_RENDERER  		 : 'com.spacetimeinsight.renderer.viewer.FavoritesRenderer',
	   EVENTS_ECOSYSTEM_WS	    	 : 'ws/userevents',
	   EVENTS_GLOBAL_WS				 : 'ws/globalevents',
	   EVENTS_MODULE_LEVEL_WS		 : '/ws/moduleevents',
	   ALERT_CONFIG_DATA_RENDERER 	 : 'com.spacetimeinsight.server.renderer.AlertDataRenderer',
	   VALIDATE_SESSION_ACTION       : 'EcoWebAjaxAction.do?operation=getSessionDtls&num='+new Date().getTime(),
	   ALERT_ACK_INIT_DATA_RENDERER  : 'com.spacetimeinsight.server.renderer.AlertAcknowledgeDataRenderer',
	   DATA_FILTER_ATTRIBUTE_RENDERER: 'com.spacetimeinsight.renderer.viewer.DataFilterAttributeRenderer',
	   LASSO_RENDERER				 : 'com.spacetimeinsight.renderer.viewer.LassoRenderer',
	   LEGEND_CONFIGURATIONS		 : 'com.spacetimeinsight.renderer.viewer.LegendRenderer',
	   WINDOW_DATA_RENDERER		 	 : 'com.spacetimeinsight.renderer.window.impl.WindowRenderer',
	   PREFERENCE_RENDERER		 	 : 'com.spacetimeinsight.renderer.viewer.PreferencesRenderer',
	   ESRI_CONFIGURATION_RENDERER   : 'com.spacetimeinsight.renderer.viewer.EsriConfigurationRenderer',
	   SESSION_SERVICE_URL 			 : 'noContentServlet/SessionHandler',



	    invokeService : function (serviceUrl, params, successCallBack, failureCallBack){
			var userAjax = new $si.ajaxUtil(serviceUrl, successCallBack, failureCallBack, params);
			return userAjax;
		},

		invokeApplicationConfigurationRenderer:function(successCallBack,failureCallBack){
			var params = {
							moduleId 	 : $si.viewer.queryParams.moduleId,
							renderertype : 	$si.routes.APPLICATION_CONFIG_RENDERER,
						};
			var userAjax = new $si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,params);
		},


	    getBusinessView:function(successCallBack,failureCallBack,selectedModule) {
			var params = {
							renderertype 	: $si.routes.BUSINESS_VIEW_DATA_RENDERER,
							userId			: $si.viewer.userModel.userInfo.userId,
							groupId			: selectedModule.groupId,
							domainId		: selectedModule.domainId,
							languageId		: selectedModule.languageId,
							language		: selectedModule.languageCd,
							moduleId		: selectedModule.id,
						};

			var businessViewAjax = new $si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,params,$si.viewer.pollInterval);

	    },

	    initializeAlertWS : function(onMessageAlerts,onErrorAlerts) {
	    	 var modeSpecificQueryStr = $si.viewer.selectedModuleModel.selectedModule.groupId+"~"+$si.viewer.selectedModuleModel.selectedModule.id;
	    	 var wsAlerts = new $si.WebSocketService("ws/alerts",onMessageAlerts, onErrorAlerts, modeSpecificQueryStr);
	    	 $si.viewer.websockets.alertsWS = wsAlerts;
	    	 return wsAlerts;
	    },

		getAlertAckWS:function(onMessageAck,onErrorAck) {
	    	 var wsAlertsAck = new $si.WebSocketService("ws/ack",onMessageAck, onErrorAck,"");
	    	 $si.viewer.websockets.alertAckWS = wsAlertsAck;
			 return wsAlertsAck;
	    },

	    initializeEcoSystemEventWS : function(onMessageAlerts,onErrorAlerts) {
	    	 var ecoSystemEvents = new $si.WebSocketService($si.routes.EVENTS_ECOSYSTEM_WS,onMessageAlerts, onErrorAlerts,"");
	    	  $si.viewer.websockets.ecoSystemEventsWS = ecoSystemEvents;
	    },

		initializeGlobalEventsWS : function (onGlobalEventSuccess, onGloablEventFailure) {
			var globalEvents = new $si.WebSocketService($si.routes.EVENTS_GLOBAL_WS,onGlobalEventSuccess, onGloablEventFailure,"");
			$si.viewer.websockets.globalEventsWS = globalEvents;
		},
		getModuleLevelEventsWS : function (onModuleLevelEventSuccess, onModuleLevelEventFailure) {
			var moduleLevelEvents = new $si.WebSocketService($si.routes.EVENTS_MODULE_LEVEL_WS,onModuleLevelEventSuccess, onModuleLevelEventFailure,$si.viewer.selectedModuleModel.selectedModule.id);
			$si.viewer.websockets.moduleLevelEventsWS = moduleLevelEvents;
			return moduleLevelEvents;
		},
	    processFavoriteData : function(successCallBack,failureCallBack,params){
	    	params.renderertype = $si.routes.FAVORITE_DATA_RENDERER;
	    	var userAjax = new $si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,params);
	    },

		getAlertConfigData : function(successCallBack,failureCallBack){
			var params = {
							renderertype : 	$si.routes.ALERT_CONFIG_DATA_RENDERER,
						};
			var userAjax = new $si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,params);
		},

		fetchActiveAndAckAlerts : function(successCallBack,failureCallBack,params){
			params.renderertype = $si.routes.ALERT_ACK_INIT_DATA_RENDERER;
			var userAjax = new $si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,params);
		},
		getSessionDetails :function(successCallBack,failureCallBack){
			var sessionAjax = new $si.xmlUtil($si.routes.VALIDATE_SESSION_ACTION,successCallBack,failureCallBack,"");
		},

		getLegendConfiguration :function(successCallBack,failureCallBack){
			var data=[];
			var layerData;
			var selectedBusinessViewIds = $si.businessViewUtil.getSelectedBusinessViewIds();
			var selectedBusinessView;
			if(selectedBusinessViewIds && selectedBusinessViewIds.length > 0){
				$.each(selectedBusinessViewIds,function(index,businessViewId){
					selectedBusinessView = $si.businessViewUtil.getBusinessViewMetadata(businessViewId);
					//We can have more then one artifact in layer
					if(selectedBusinessView.links){
						$.each(selectedBusinessView.links,function(index,artifact){
							if(artifact && artifact.data && artifact.data.properties){
									data.push({
													layerId     : artifact.data.id,
													artefactName: artifact.data.properties.artefactname,
													ecosessionId: artifact.data.properties.ecosid,
											});
							}
						});
					}
				});
			}

			if(data.length>=0){
				var params = {
								renderertype : 	$si.routes.LEGEND_CONFIGURATIONS,
								selectedLayerArray : JSON.stringify(data),

						};
				var userAjax = new $si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,params);
			}

		},



		serverCallForLassso :function(successCallBack,failureCallBack, lassoParams){
			if(!lassoParams){
				lassoParams = {};
			}
			lassoParams.renderertype = $si.routes.LASSO_RENDERER;
			var userAjax = new $si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,lassoParams);
		},
		
		invokeWindowDataService : function(successCallBack, failureCallBack, windowParams){
			if(!windowParams){
				windowParams = {};
			}
			windowParams.renderertype = $si.routes.WINDOW_DATA_RENDERER;

			$si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,windowParams);
		},

		invokeWindowDataUrl : function(windowUrl, successCallBack, failureCallBack, windowParams){
			if(!windowParams){
				windowParams = {};
			}			
			$si.ajaxUtil(windowUrl,successCallBack,failureCallBack,windowParams);
		},
		
		setCriteria : function(data){
			if(data){
				var businessView = $si.businessViewUtil.getBusinessViewById(data.businessViewId,data.businessViewName);
				if(businessView && businessView.data && businessView.data.properties){
					businessView.filterCriteria = data.filterCriteria;
					businessView.timeFilterCriteria = data.timeFilterCriteria;
					
					var viewProperties = businessView.data.properties;
					var params = {
					        businessViewId:	data.businessViewId,
					        title		  : data.title,	
					        windowId      : data.windowId, 
					        rprocessName  : data.rprocessName,  
							layerid		  : businessView.data.id,
							ecosid		  : viewProperties.ecosid,
							artefactname  : viewProperties.artefactname,
							ecoexpmodel   : viewProperties.ecoexpmodel,
							filterCriteria	: data.filterCriteria,
							timeFilterCriteria	: data.timeFilterCriteria,
							windowIds		: JSON.stringify(data.windowIds),
							isClearTimeFilterCriteria :data.clearflag,
							isClearFilterCriteria	: data.isClearFilterCriteria,
							hasAnalytics : data.hasAnalytics,
							analyticsParams : JSON.stringify(data.analyticsParams),
					};
					$si.ajaxUtil($si.routes.FILTER_ACTION,this.setCriteriaSuccess.bind(this,params),this.setCriteriaFailure,params);
				}
			}
		},

		setCriteriaSuccess : function(data){
			if(data){
				$si.events.triggerRefreshBusinessViewEvent(data.layerid, data.artefactname);
				this._disableRProcessDialog(data);
			}
		},

		setCriteriaFailure : function(error){
			$si.Logger('routes').error("Error while setting the filter criteria. " + error);
		},

		_disableRProcessDialog : function(data){
			var loadingDialog = $("#process_dialog");
			if(loadingDialog && loadingDialog.length > 0){
				loadingDialog.hide();
			    var messageTemplate = $si.i18N.BusinessViewWindowErrors._onanalysisCompleted;
			   $si.events.triggerConfirmation(
							{
								windowId:data.windowId,
								messageTemplate:messageTemplate.replace("Name",data.rprocessName),
								sourceId: data.businessViewId,
								sourceTitle:data.title
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
		
		
		setGlobalTimeCriteria : function(data){
			//var $this=this;
			if(data){
				var filteredLayers=[];
				var jsOject;
				var dateFieldValue;
				var dateField;
				var timeFilter;
				var selectedBusinessViews = $si.businessViewUtil.getSelectedBusinessViewIds();
				
				$.each(selectedBusinessViews,function(index,selectedBusinessViewID){
						
				
					var businessView = $si.businessViewUtil.getBusinessViewById(selectedBusinessViewID,data.businessViewName);
					if(businessView && businessView.data && businessView.data.properties ){
						if(businessView.data.properties.istimeaware==true){
							var viewProperties = businessView.data.properties;
							
							dateField = businessView.data.properties.timeProperties.dateField;
							if(data.timeFilterCriteria){
								 jsOject = JSON.parse(data.timeFilterCriteria);
								 dateFieldValue = businessView.data.properties.timeProperties.dateField;
									if(dateFieldValue){
										jsOject.fieldName=dateFieldValue
									}
						 		timeFilter = JSON.stringify(jsOject);
							}
							var params = {
									layerid		  : businessView.data.id,
									ecosid		  : viewProperties.ecosid,
									artefactname  : viewProperties.artefactname,
									ecoexpmodel   : viewProperties.ecoexpmodel,
									filterCriteria	: data.filterCriteria,
									timeFilterCriteria	: timeFilter,
									windowIds		: JSON.stringify(data.windowIds),
									isClearTimeFilterCriteria :data.clearflag,
									isClearFilterCriteria	: data.isClearFilterCriteria,
							};
							$si.ajaxUtil($si.routes.FILTER_ACTION,null,null,params);
							filteredLayers.push(params);
							
						}
					}
				});
					
				//refreshing layers
				$si.businessViewUtil.refreshBusinessViewsAfterTimeFilter(filteredLayers);
				
				//Appl on windows
				$si.businessViewUtil.appplyTimeFilterOnWindows(filteredLayers);
			}
		},
		
		runAnalysis : function(data,onRunAnalyticsSuccess, onRunAnalyticsFailure ){
			if(data){
				var businessView = $si.businessViewUtil.getBusinessViewById(data.businessViewId,data.businessViewName);
				if(businessView && businessView.data && businessView.data.properties){
					var viewProperties = businessView.data.properties;

					var params = {
							layerid		  					: businessView.data.id,
							ecosid		  					: viewProperties.ecosid,
							artefactname  					: viewProperties.artefactname,
							ecoexpmodel   					: viewProperties.ecoexpmodel,
							windowId						: data.windowId,
							analyticsParams 				: JSON.stringify(data.analyticsParams),
							hasAnalytics 					: data.hasAnalytics,
							artifactRScript					: data.artifactRScript,
							artifactRFile					: data.artifactRFile,
							artifactRWorkspaces				: data.artifactRWorkspaces,
							artifactROutputParameter		: data.artifactROutputParameter,
							renderertype 					: $si.routes.WINDOW_DATA_RENDERER
					};
					$si.ajaxUtil($si.routes.BASE_URL, onRunAnalyticsSuccess, onRunAnalyticsFailure, params);
				}
			}
		},

		/*
		setRunAnalyticsSuccess : function(data){
			if(data){
				$si.events.triggerRefreshBusinessViewEvent(data.layerid, data.artefactname);
			}
		},

		setRunAnalyticsFailure : function(error){
			$si.Logger('routes').error("Error while executing analytics. " + error);
		},
		*/
		getFilterOptions : function(successCallBack,failureCallBack,params){
			$si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,params);
		},

		getColumnDetails : function(successCallBack,failureCallBack,params){
			var userAjax = new $si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,params);
		},

		saveAndFetchApplicationPreferences : function(successCallBack, failureCallBack, params){
			params.renderertype = $si.routes.PREFERENCE_RENDERER;
			var userAjax = new $si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,params);
		},

		getEsriConfiguration : function(successCallBack,failureCallBack){
			var params = {
					renderertype : 	$si.routes.ESRI_CONFIGURATION_RENDERER,
				};
			$si.ajaxUtil($si.routes.BASE_URL,successCallBack,failureCallBack,params);
		},
		closeAllWebsockets :function(){
			if($si.viewer.websockets){
				$si.viewer.websockets.alertsWS.disconnect();
				$si.viewer.websockets.alertAckWS.disconnect();
				$si.viewer.websockets.ecoSystemEventsWS.disconnect();
				$si.viewer.websockets.globalEventsWS.disconnect();
				$si.viewer.websockets.moduleLevelEventsWS.disconnect();
				}
		},
		
		removeEcosystemSession : function(params,successCallBack,failureCallBack){
			this.invokeService(this.SESSION_SERVICE_URL, params, successCallBack, failureCallBack);
		},

	};
});