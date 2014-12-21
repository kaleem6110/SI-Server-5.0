define(['siViewerNamespace', 'siNotification',],function($si) {
    var events = $si.createNameSpace("spacetimeinsight.events");

	events.EventTypesEnum = {GLOBAL_EVENT:"GLOBAL_EVENT",
							 BUSINESS_VIEW:"BUSINESS_VIEW",
							 BUSINESS_VIEW_METADATA:"BUSINESS_VIEW_METADATA",
							 MAP:"MAP",
							 LASSO:"LASSO",
							 MODULE_LEVEL_EVENT:"MODULE_LEVEL_EVENT",
							 NOTIFICATION:"NOTIFICATION",
							  };

	//base event
	events.BaseEvent = function (name, type, data) {
		this.name = name;
		this.type = type;
		this.data = data;
	};

	events.Notifications = { onErrorEvent:"onErrorEvent",onConfirmationEvent:"onConfirmationEvent",onWarningEvent:"onWarningEvent",onNotificationClear:"onNotificationClear" };
	events.GlobalEvents = { onGlobalEvent:"onGlobalEvent"};
	events.Viewer =  { onViewerInitialized:"onViewerInitialized"};
	events.WindowEvents =  { onDragEnd:"onDragEnd", onResizeWindow:"onResizeWindow"};
	
	events.ModuleLevelEvents = { onLassoShareEvent:"onLassoShareEvent",
							 	onLassoUnShareEvent:"onLassoUnShareEvent",
								onLassoSharedDeletedEvent:"onLassoSharedDeletedEvent",
								onLassoSharedUpdateEvent:"onLassoSharedUpdateEvent",
								onFavoriteShareEvent:"onFavoriteShareEvent",
								onFavoriteUnShareEvent:"onFavoriteUnShareEvent",
								onFavoriteSharedDeletedEvent:"onFavoriteSharedDeletedEvent",
								onFavoriteSharedUpdateEvent:"onFavoriteSharedUpdateEvent",
								};
	events.BusinessViewEvents = { 
								 /** select de-select events are triggered when we programatically click the business view **/
								  onBusinessViewSelect:"onBusinessViewSelect",
								  onBusinessViewDeSelect:"onBusinessViewDeSelect",
								  /** load unload events are triggered for loading the business view on map **/
								  onBusinessViewLoad:"onBusinessViewLoad",
								  onBusinessViewUnLoad:"onBusinessViewUnLoad",
								  onBusinessViewSelectError:"onBusinessViewSelectError",
								  evtBusinessViewMetadataLoaded:"evtBusinessViewMetadataLoaded",
								  evtBusinessViewDataLoaded:"evtBusinessViewDataLoaded",
								  evtBusinessViewDataLoading:"evtBusinessViewDataLoading",
								  evtBusinessViewDataNotSelected:"evtBusinessViewDataNotSelected",
								  evtBusinessViewMetadataError:"evtBusinessViewMetadataError",
								  evtRefreshBusinessView : "evtRefreshBusinessView",
								 };

	events.MapEvents = { onCameraMove:"onCameraMove"};

	events.LassoEvents = { onDrawLassoShape				: "onDrawLassoShape",
						   populateLatestLassoData		: "populateLatestLassoData",
						   saveNewlyCreatedLassoOnDB 	: "saveNewlyCreatedLassoOnDB",
						   drawSelectLasso				: "drawSelectLasso",
						   removeSelectLasso			: "removeSelectLasso",
						   clearNewlyDrawnLasso			: "clearNewlyDrawnLasso",
						   saveNewlyEditedLassoOnDB		: "saveNewlyEditedLassoOnDB",
						   setColorAndTransparency		: "setColorAndTransparency",
						   setLineThickness				: "setLineThickness",
						   removeLassoFromMapById		: "removeLassoFromMapById",
						   zoomToLasso					: "zoomToLasso",
						   onLassoApplyAlgorithm		: "onLassoApplyAlgorithm",
						   onSharedLassoUpdate		: "onSharedLassoUpdate",
						 };

	//Start - Business View event
	events.BusinessViewEvent = function(name, data){
	  	this.name = name;
	  	this.type = events.EventTypesEnum.BUSINESS_VIEW;
	  	this.data = data;
	};

	events.BusinessViewEvent.prototype = new events.BaseEvent();
	events.BusinessViewEvent.prototype.constructor = events.BusinessViewEvent;


	events.BusinessViewMetadataEvent = function(name, data){
	  	this.name = name;
	  	this.type = events.EventTypesEnum.BUSINESS_VIEW_METADATA;
	  	this.data = data;
	};

	events.BusinessViewMetadataEvent.prototype = new events.BaseEvent();
	events.BusinessViewMetadataEvent.prototype.constructor = events.BusinessViewMetadataEvent;
	//Stop - Business View event
	//Start - window drag event
	events.WindowEvent = function(type, windowId,windowAttributes,isInfoWindow){
		this.windowId=windowId;
		this.windowAttributes=windowAttributes;
		this.isInfoWindow=isInfoWindow;

	};

	events.WindowEvent.prototype = new events.BaseEvent();
	events.WindowEvent.prototype.constructor = events.WindowEvent;

	//Stop - drag event
	//Start - Module Level event
	events.ModuleLevelEvent = function(name, moduleId,windowId,data){
		this.name = name;
		this.windowId=windowId;
		this.moduleId=moduleId;
		this.type = events.EventTypesEnum.MODULE_LEVEL_EVENT;
		this.data = data;
	};

	events.ModuleLevelEvent.prototype = new events.BaseEvent();
	events.ModuleLevelEvent.prototype.constructor = events.ModuleLevelEvent;
	//Stop - Module level event
	
	//Start - Business View event
	events.MapEvent = function(name, data){
	  	this.name = name;
	  	this.type = events.EventTypesEnum.MAP;
	  	this.data = data;
	};

	events.MapEvent.prototype = new events.BaseEvent();
	events.MapEvent.prototype.constructor = events.MapEvent;
	//Stop - Business View event

	//Start - Business View event
	events.LassoEvent = function(name, data){
	  	this.name = name;
	  	this.type = events.EventTypesEnum.LASSO;
	  	this.data = data;
	};

	events.LassoEvent.prototype = new events.BaseEvent();
	events.LassoEvent.prototype.constructor = events.LassoEvent;
	//Stop - Business View event

	//Start - Global event
	events.GlobalEvent = function(name, data){
	  	this.name = name;
	  	this.type = events.EventTypesEnum.GLOBAL_EVENT;
	  	this.data = data;
	};

	events.GlobalEvent.prototype = new events.BaseEvent();
	events.GlobalEvent.prototype.constructor = events.GlobalEvent;
	//Stop - Global event

	events.triggerBusinessViewEvent = function(eventName, eventData) {
		var event = new $si.events.BusinessViewEvent(eventName, eventData);
		$si.eventSource.businessView.trigger(eventName, event);
	};
	
	

	events.triggerRefreshBusinessViewEvent = function(businessViewId, businessViewName,refreshParams) {
		var eventName = $si.events.BusinessViewEvents.evtRefreshBusinessView;
		var eventData = {businessViewId: businessViewId, businessViewName: businessViewName, refreshParams : refreshParams};

		var event = new $si.events.BusinessViewEvent(eventName, eventData);
		$si.eventSource.businessView.trigger(eventName, event);
	};

	events.triggerBusinessViewMetadataEvent = function(businessViewMetadata) {
		var eventName = this.BusinessViewEvents.evtBusinessViewMetadataLoaded;
		var event = new $si.events.BusinessViewMetadataEvent(eventName, businessViewMetadata);
		$si.eventSource.businessView.trigger(eventName, event);
	};

	events.triggerBusinessViewMetadataError = function(businessViewMetadata) {
		var eventName = this.BusinessViewEvents.evtBusinessViewMetadataError;
		var event = new $si.events.BusinessViewMetadataEvent(eventName, businessViewMetadata);
		$si.eventSource.businessView.trigger(eventName, event);
	};


	events.triggerMapEvent = function(eventName, eventData) {
		var event;
		if(eventData) {
			event = new $si.events.MapEvent(eventName, eventData);
		}
		$si.eventSource.map.trigger(eventName, event);
	};

	events.triggerMapCameraMoveEvent = function(cameraEventData) {
		$si.eventSource.map.trigger(events.MapEvents.onCameraMove,
										new $si.events.MapEvent(events.MapEvents.onCameraMove, cameraEventData));
	};

	events.triggerLassoEvent = function(eventName, eventData) {
		var event;
		if(eventData) {
			event = new $si.events.LassoEvent(eventName, eventData);
		}
		$si.eventSource.lasso.trigger(eventName, event);
	};

	events.triggerGlobalEvent = function(eventData) {
		var eventName = this.GlobalEvents.onGlobalEvent;
		var event = new $si.events.GlobalEvent(eventName, eventData);

		$si.eventSource.globalEvents.trigger(eventName, event);
	};
	
 	events.triggerViewerInitialized = function(eventData) {
 		$si.viewer.pluginIntialized = true;
		var event = new $si.events.BusinessViewEvent($si.events.Viewer.onViewerInitialized , eventData);
		$si.eventSource.businessView.trigger($si.events.Viewer.onViewerInitialized, event);
		$si.sessionTimeOut.initialize();
	};
	
	
	events.NotificationEvent = function(name, data){
	  	this.name = name;
	  	this.type = events.EventTypesEnum.NOTIFICATION;
	  	this.data = data;
	};	
	
	events.NotificationEvent.prototype = new events.BaseEvent();
	events.NotificationEvent.prototype.constructor = events.NotificationEvent;
	
	events.triggerError = function(eventData) {
		var notification = $si.notification.createNotificationMessage(eventData)
		$si.notification.addErrorNotification(notification);
		var event = new $si.events.NotificationEvent($si.events.Notifications.onErrorEvent , notification);
		$si.eventSource.notifications.trigger($si.events.Notifications.onErrorEvent, event);
	};

	events.triggerConfirmation = function(eventData) {
		var notification = $si.notification.createNotificationMessage(eventData)
		$si.notification.addConfirmation(notification);
		var event = new $si.events.NotificationEvent($si.events.Notifications.onConfirmationEvent , notification);
		$si.eventSource.notifications.trigger($si.events.Notifications.onConfirmationEvent, event);
		$si.notification.showNotification(notification);
		
	};

	events.triggerWarning = function(eventData) {
		var notification = $si.notification.createNotificationMessage(eventData)
		$si.notification.addWarning(notification);
		var event = new $si.events.NotificationEvent($si.events.Notifications.onWarningEvent , notification);
		$si.eventSource.notifications.trigger($si.events.Notifications.onWarningEvent, event);
		
	};
	
	events.triggerNotificationClear = function(windowId,sourceId) {
		var notification = $si.notification.clearNotifications(windowId,sourceId);
		var event = new $si.events.NotificationEvent($si.events.Notifications.onNotificationClear , {windowId:windowId,sourceId:sourceId});
		$si.eventSource.notifications.trigger($si.events.Notifications.onNotificationClear, event);
	};
	

    return $si;
});