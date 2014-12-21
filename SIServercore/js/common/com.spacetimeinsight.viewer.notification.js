define([
        'jquery',
        'jquery-ui',
        'kendo',
        'jquery-noty-packaged-min',
        'top-center',
        'jquery-default',
        'siViewerData',
        'dateTimeFormat',
],function() {
	$si.notification = {
			
		NOTIFICATION_TEMPLATE	: kendo.template("<div class='notification'><div class='notification-text'> #=errorMessage# </div><div class='bottom-info-notification'><span class='notification-date-time'> #=dateTime#</span><span class='notification-source'> #=source#</span></div></div>"),
		DATE_TIME_FORMAT		: "MMM DD - hh:mm a",
		
		Notification : function(data) {
			this.windowId 		= data.windowId;
			this.errorMessage 	= data.errorMessage;
			this.dateTime 	 	= new Date();
			this.sourceId		= data.sourceId;
			this.source			= data.source;
			this.id				=data.id;
		},
		
		clearNotifications :function(windowId,sourceId){
			$.noty.clearQueue();
			$.noty.closeAll();
			if(sourceId){
				this._deleteNotificationsWithSourceId(windowId,sourceId);
			} else if(windowId != null) {
	    		if($si.viewer.notification[windowId] ){
					delete $si.viewer.notification[windowId];
	    		}
			}
		},
		
		_deleteNotificationsWithSourceId:function(windowId,sourceId){
		    var notificationList = $si.viewer.notification[windowId];
        	if(notificationList && notificationList.notification && notificationList.notification.length > 0 ){
        		$.each(notificationList.notification,function(index,notify){
					if(notify && notify.sourceId == sourceId){
						notificationList.notification.splice(index,1);
						if(notificationList.notification.length ==0){
							delete $si.viewer.notification[windowId];
						}
					}
        		});
        	}
		},
			
		showAllNotification : function(windowId){
			var $this = this;
			if($si.viewer.notification[windowId]){
				var notifications = $si.viewer.notification[windowId].notification;
				if(notifications){
					$(notifications).each(function(index,notification){
						$this._displayNotification(notification);
					});
				}
			}
		},
		
		showNotification:function(notification) {
		 	this._displayNotification(notification);
		},
				
		showNotificationBySource : function(windowId,sourceId){
			this._displayNotification(this._getNotification(windowId, sourceId));
		},
		showNotificationById : function(windowId,id){
			this._displayNotification(this._getNotificationById(windowId,id));
		},
		_getNotificationById : function(windowId,id){
			var returnNotification;
						if($si.viewer.notification[windowId]){
							var notifications = $si.viewer.notification[windowId].notification;
							if(notifications){
					        	$(notifications).each(function(index,notification){
					        		if(notification.id == id){
					        			returnNotification = notification;
					        			return false;
					        		}
					        	});
							}
						}
	        return returnNotification;
        },
		_getNotification : function(windowId,sourceId){
			var returnNotification;
			if($si.viewer.notification[windowId]){
				var notifications = $si.viewer.notification[windowId].notification;
				if(notifications){
		        	$(notifications).each(function(index,notification){
		        		if(notification.sourceId == sourceId){
		        			returnNotification = notification;
		        			return false;
		        		}
		        	});
				}
			}
	        return returnNotification;
        },
		
		_displayNotification : function(notification){
			if(notification){
				$.noty.closeAll();
				
				var dateTime = moment(notification.dateTime).format(this.DATE_TIME_FORMAT);
				if(!$si.viewer.preferenceValues.timeOfMessages) $si.viewer.preferenceValues.timeOfMessages =10;
				
				var n = noty({
						type		: notification.messageType,
						dismissQueue: false,
						timeout: $si.viewer.preferenceValues.timeOfMessages * 1000,
						maxVisible: $si.viewer.preferenceValues.noOfErrorMessages,
						layout 		: 'topCenter',
						closeWith	: ['button'], 
						text		: this.NOTIFICATION_TEMPLATE(
													{
														errorMessage : notification.errorMessage,
														dateTime	 : dateTime,
														source		 : notification.source,
													}),
				});
				$.noty.clearQueue();
			}		
		},
		
		createNotificationMessage:function(eventData) {
			var message = eventData.message;
			if(eventData.messageTemplate){
				message = eventData.messageTemplate.replace("#MESSAGE#",message);
			}
			
			var notification = new $si.notification.Notification({
										windowId 		: eventData.windowId,
										errorMessage	: message,
										sourceId		: eventData.sourceId,
										source			: eventData.sourceTitle,
			});		
			return notification;		
		},

		createNotificationMessage1:function(windowId,message,sourceId,source){
				var notification = new $si.notification.Notification({
									windowId 		: windowId,
									errorMessage	: message,
									sourceId		: sourceId,
									source			:  source,
				});	
				return notification;
		},
		
	  	addError : function(windowId,message,sourceId,source) {
			var notification = this.createNotificationMessage(windowId,message,sourceId,source);
			if(notification){
				notification["messageType"] = "error";
			}
			this._addNotification(notification);
			this._displayNotification(notification);
			return notification;
		},	
		
	  	addErrorNotification : function(notification) {
			if(notification){
				notification["messageType"] = "error";
			}
			this._addNotification(notification);
			return notification;
		},			
	  	addAlert : function(notification) {
			if(notification){
				notification["messageType"] = "alert";
			}
			this._addNotification(notification);
		},
/*		addSuccess : function(notification) {
			if(notification){
				notification["messageType"] = "success";
			}
			this._addNotification(notification);
		},*/
		addWarning : function(notification) {
			if(notification){
				notification["messageType"] = "warning";
			}
			this._addNotification(notification);
		},
		addInfo : function(notification) {
			if(notification){
				notification["messageType"] = "information";
			}
			this._addNotification(notification);
		},
		addConfirmation : function(notification) {
			if(notification){
				notification["messageType"] = "success";
			}
			this._addNotification(notification);
		},
		
		_addNotification : function(notification) {
			if(notification){
				if(!$si.viewer.notification[notification.windowId]) {
					$si.viewer.notification[notification.windowId] = kendo.observable({
																		notification : [],
																	});
				}
				$si.viewer.notification[notification.windowId].notification.push(notification); 
				$si.viewer.notification.trigger("NOTIFICATION",notification);
			}
		}, 

	};
});