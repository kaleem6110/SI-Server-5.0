/**
 *
 */

define([
    'jquery',
    'jquery-ui',
   	'viewerPlugin/com.spacetimeinsight.viewer.baseBusinessViewListener',
],function($){
	$.spacetimeinsight.noMap = $.extend({},$.spacetimeinsight.siViewerBaseBusinessViewListener,{
		GENERIC_DIV 		 : kendo.template("<div id ='#= id #'></div>"),
		initialize : function(){
			this._bindNotifications();
			$si.viewer.requiresMapViewInBusinessViewRightclickMenu = false;
			this.initializeBusinessViewListener();
			$si.viewer.initialized =true;
			$si.events.triggerViewerInitialized();
			
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

		refreshBusinessView : function(businessViewMetadata, businessViewName) {
			//console.log('No Map - refreshBusinessView');
			var businessView = $si.businessViewUtil.getBusinessViewById(businessViewMetadata.id, businessViewName);
			var params = {
				rendertype : "json",
				hideMapData : true,
				temprandvalue : Math.random(),
			};

			$si.routes.invokeService(businessView.url, params,this.onBusinessViewDataLoadSuccess.bind(this), this.onBusinessViewDataLoadFailure.bind(this));
			
			//    	    	 	$si.events.triggerBusinessViewEvent($si.events.BusinessViewEvents.evtBusinessViewDataLoaded, data);
			
		},

		removeBusinessView : function(businessViewMetadata) {
			//do nothing
			//console.log('No Map - removeBusinessView');
		},

		onBusinessViewDataLoadSuccess : function(dataResponse) {
  	    	$si.events.triggerBusinessViewEvent($si.events.BusinessViewEvents.evtBusinessViewDataLoaded, dataResponse);			
			 $si.Logger('init').debug("No Map - onBusinessViewDataLoadSuccess");
		},

		onBusinessViewDataLoadFailure : function(error) {
				if(error.data) error = error.data;			
				var error = errorResponse.data;
				if(!this.options.viewerPluginId) {
					this.options.viewerPluginId = $si.windowUtil.getViewerPluginWindowId();
				}		

				$si.events.triggerError(
							{
								windowId:'nomap' , 
								message:error._errorDesc,
								sourceId: error.businessViewId,
								sourceTitle:$si.businessViewUtil.getBreadCrum(error.businessViewId)
							});		
			 $si.Logger('init').error("No Map - onBusinessViewDataLoadFailure " + errorResponse);
		},		
		
		_bindNotifications : function(){
			var $this = this;
		 	$si.eventSource.notifications.bind(	$si.events.Notifications.onErrorEvent,function(event) {
		 		var notification = event.data;
				$si.notification.showNotification(notification);
		 	});

        },		
		
	});
});