define([
    'jquery',
    'jquery-ui',
    'kendo',
    'siDropDownList',
],function($){

  $.widget('spacetimeinsight.siViewerApplicationTaskBar',$.spacetimeinsight.siViewerBaseWidget,{
	  options:{
		  groups : {},  //format : [groupId] : ListofDashboard
	  },

	  pluginName : "siViewerApplicationTaskBar",

	  //this template creates a button, close icon and list.
	  GROUP 		: kendo.template("<div id='#= id#-taskbarItem' class='taskbar-group'></div>"),
	  GROUP_IMG 	: kendo.template("<span class='taskbar-group-img' style='background-image:url(#= groupIcon #)'></span>"),
	  GROUP_BUTTONS : kendo.template("<span class='taskbar-item-close'> <img id='#= id#_close' class='taskbar-item-close src='images/blank_transparent.png' #= closeClass #'/></span>"
			  							+"<span class='taskbar-item-notification'> <img id='#= id#_notification' src='images/blank_transparent.png' class='taskbar-item-notification disable'/></span>"
			  						),
	  //this template create item in list
	  GROUP_ITEM : kendo.template("<div id='#= id #-taskbarItem' class='taskbar-item'><span> <img src='#= windowIcon #' src='images/blank_transparent.png' class='taskbar-item-img'></span>"
			  					+"<span class='taskbar-item-text' title= '#= title #'> #= title # </span>"
			  					+"<span class='taskbar-item-close'> <img id='#= id#_close' src='images/blank_transparent.png' class='taskbar-item-close #= closeClass #'/></span>"
			  					+"<span class='taskbar-item-notification'> <img id='#= id#_notification' src='images/blank_transparent.png' class='taskbar-item-notification disable'/></span>"
			  					+ "</div>"),

	  _create: function(){
		  
			this._super();

			$(this.element).addClass("sti-application-taskbar");

			this._bindObservable();
     },


     _bindObservable : function(){
    	 	var $this = this;
			/** Binding with windowMetadataModel :- add/remove task-bar button on window open and close**/
			$si.viewer.windowMetadataModel.bind("change", function (e) {
				if(e && e.items && e.items.length > 0){
					var item = e.items[0];
			 		if(e.field == "arrWindowMetadata"){
			 			if(e.action == "add"){
			 				$this.appendItemToTaskBar(item);
			 			}else if(e.action == "remove"){
			 				$this.removeItemFromTaskBar(item);
			 			}
			 		}
				}
		 	});
			
			this._bindNotification();
     },
     
     _bindNotification : function(){
    	 var $this = this;
    	 /** Binding with notification :- enable/disable notification button on error **/
	 	$si.eventSource.notifications.bind(	$si.events.Notifications.onErrorEvent,function(event) {
	 		var notification = event.data;
    		if(notification){
    			var notificationImg = $("img#" + notification.windowId + "_notification.taskbar-item-notification");
    			var groupId = $this._getGroupforWindowId(notification.windowId);
    			var groupNotificationImg = $("img#" + groupId + "_notification.taskbar-item-notification");
				notificationImg.addClass("enable");
				notificationImg.removeClass("disable");
				groupNotificationImg.addClass("enable");
				groupNotificationImg.removeClass("disable");
    		} 
    	 });
    	 
    	//bind clear notifications
	 	$si.eventSource.notifications.bind(	$si.events.Notifications.onNotificationClear,function(event) {

			if(event.data.sourceId){
				var notificationList = $si.viewer.notification[event.data.windowId];
    			if(notificationList && notificationList.notification && notificationList.notification.length > 0 ){
    				//No need to remove the icon as there is still errors pending with the window
    				return;
    			}
 
			}
			var notificationImg = $("img#" + event.data.windowId + "_notification.taskbar-item-notification");
			var groupId = $this._getGroupforWindowId(event.data.windowId);
			var groupNotificationImg = $("img#" + groupId + "_notification.taskbar-item-notification");

			if(notificationImg){
				notificationImg.removeClass("enable");
				notificationImg.addClass("disable");
			}
			
			//TODO cannot do this. You can only remove only if all the windows in the group has no errors
			if(groupNotificationImg) {
				groupNotificationImg.removeClass("enable");
				groupNotificationImg.addClass("disable");
			}

	 	}); 
     },

     appendItemToTaskBar : function(item){
    	 if(!this.groupExist(item.groupId)){
    		 this._addGroup(item);
    	 }
    	 this._addItemInGroup(item);
     },

     groupExist : function(groupId){
    	 return this.options.groups[groupId];
     },

     removeItemFromTaskBar : function(item){
    	 if(this.groupExist(item.groupId)){
    		 var group = $(this.element).find("#" + item.groupId +"-taskbarItem");
    		 if(this.options.groups[item.groupId].length > 1){
    			 this._removeItemFromGroup(item);
    			 this._changeGroupLabelAndImage(item.groupId);
    		 }else{
    			 //remove group
    			 //remove kendo element
    			 group.data("kendoDropDownList").destroy();
    			 //remove wrapper and html element
    			 group.parent("span.taskbar-group").remove();
    			 //update map
    			 delete this.options.groups[item.groupId];
    		 }
    	 }
     },
     
     //If there is only one element in the group then dashboard title is used for task button title else group title is used.
     _changeGroupLabelAndImage : function(groupId){
    	 var list = this.options.groups[groupId];
    	 var title = "";
    	 var groupIcon = "";
    	 if(list){
	    	 if(list.length == 1){
	    		 title = list[0].title;
	    		 groupIcon = list[0].windowIcon;
			 }else if(list.length > 1){
				 title = list[0].groupTitle;
				 groupIcon = list[0].groupIcon;
			 }
    	 }
    	 
    	 var group = $(this.element).find("#" + groupId +"-taskbarItem");
    	 
    	 group.data("kendoDropDownList").text(title);
    	//Adding group Image. New .k-input is created with change of title. 
    	 group.parent().find(".k-input").prepend(this.GROUP_IMG({groupIcon:groupIcon}));
    	 
    	 this._bindItemsCloseEvent(groupId);
     },

     _removeItemFromGroup : function(item){
    	 var group = $(this.element).find("#" + item.groupId + "-taskbarItem").data("kendoDropDownList");
    	 group.close();
    	 var dataSource = group.dataSource;
    	 if(dataSource){
    		 //remove element from droup down list
    		 var removeItem = this._getItem(dataSource.data(),item.id);
    		 if(removeItem.item){
    			 dataSource.remove(removeItem.item);
    		 }

	    	 //update group list
	    	 var list = this.options.groups[item.groupId];
	    	 if(list){
	    		 removeItem = this._getItem(list,item.id);
  				if(removeItem.index > -1){
  					list.splice(removeItem.index,1);
  				}
	    	 }
    	 }
     },


     //search item in the list and return item and its index
     _getItem : function(list,id){
    	 var _item = null;
    	 var _index = -1;
    	 if(list){
    		 $(list).each(function(index,dataItem){
    			 if(dataItem.id == id){
    				 _item = dataItem;
 	    			_index = index;
 	    			return false;
 	    		}
    		 });
    	 }
    	 return {item : _item ,index :_index};
     },


     _removeItemGroupList : function(groupId){
    	 return this.options.groups[groupId];
     },

     _addGroup : function(item){
    	 var $this = this;

    	 $(this.element).append(this.GROUP(
						{
							 id: item.groupId,
						}));

    	 var group = $(this.element).find("#" + item.groupId + "-taskbarItem").siDropDownList({
						    		 dataSource: [],//this.options.groups[item.group],//try to bind this variable
			    		             index : -1,
			    		             autoBind: false,
			    		             shimRequired:true,
			    		             select : function(e){
			    		            	 		e.preventDefault();
			    		             		},
			    		             template : function(data){
			    		            	 var closeClass = "";
			    		            	 var title = data.title;
		    		            		 if(!data.enableClose){
		    		            			 closeClass = "w-close";
		    		            		 }
		    		            		 return  $this.GROUP_ITEM({
			    		            		 			id : data.id,
			    		            		 			title : title,
			    		            		 			windowIcon : data.windowIcon,
			    		            		 			closeClass : closeClass,
			    		            		 		});
			    		             },
			    		             open : function(e){
			    		            	 if(this.dataSource && this.dataSource.data().length == 1){
			    		            		 var target = event.target ? event.target : event.srcElement;
			    		            		 if(target && $(target).hasClass("k-input")){
			    		            			 $this._bringWindowToFront(this.dataSource.data()[0]);
			    		            		 }
			    		            		 e.preventDefault();
			    		            	 }
			    		             },
    		           		});
    	 
	 	this.options.addApplicationCSS_FN = this.addApplicationCSS.bind(this,group);
	 	group.data("kendoDropDownList").bind("open",this.options.addApplicationCSS_FN);
    	 
    	group.parent().find(".k-select").after(this.GROUP_BUTTONS({
    		 									id			:	item.groupId,
    		 									closeClass	:   item.enableClose ? "" :"w-close",
    		 								}));	
    	
    	var closeIcon = group.parent().find("span.taskbar-item-close");
    	 
//    	 if(item.enableClose){
//    		 closeIcon.removeClass("w-close");
//    	 }else{
//    		 closeIcon.addClass("w-close");
//    	 }
    	 
    	 closeIcon.bind("click",function(e){
 							var groupId = $(e.target).parents(".taskbar-group").children(".taskbar-group").attr("id").replace("-taskbarItem","");
 							$this._closeGroup(groupId);
				    		e.preventDefault();
				    		//e.stopPropagation();
    	 });
     },
     
     addApplicationCSS : function(group){
    	 var $this = this;
		/** default open animation time 200 **/
		setTimeout(function(){
								group.data("kendoDropDownList").list.parent().addClass("taskbar-group-dropdown");
								group.data("kendoDropDownList").unbind("open",$this.options.addApplicationCSS_FN);
							},300); 
     },
     
     _getGroupforWindowId : function(windowId){
    	var groupId;
    	if(windowId){
    		if(this.options.groups){
    			$.each(this.options.groups,function(key,items){
    				if(items){
    					$.each(items,function(index,item){
    						if(item.id == windowId){
    							groupId = item.groupId;
    							return false;
    						}
    					});
    				}
    				if(groupId){
    					return false;
    				}
    			});
    		}
    	}
    	return groupId;
     }, 

     _addItemInGroup : function(item){
    	 var $this = this;

    	 var group = $(this.element).find("#" + item.groupId +"-taskbarItem");

    	 group.data("kendoDropDownList").dataSource.add(item);

    	 if(! this.options.groups[item.groupId]){
    		 this.options.groups[item.groupId] = [];
    	 }
    	 this.options.groups[item.groupId].push(item);
    	 
    	 this._changeGroupLabelAndImage(item.groupId);
     },
     
     _bindItemsCloseEvent : function(groupId){
    	 var $this = this;
    	 var list = $("#" + groupId + "-taskbarItem" + "-list");
    	 var closeButton = list.find("span.taskbar-item-close");
    	 var dashboard = list.find("div.taskbar-item");
    		 
    	//Kendo drop down remove all elements and then re-create them.
    	 closeButton.unbind("click",$this._closeDashboard);
    	 closeButton.bind("click",$this._closeDashboard.bind($this));
    	 
    	 dashboard.unbind("click",$this._onWindowTitleClick);
    	 dashboard.bind("click",$this._onWindowTitleClick.bind($this));
     },
     
     _getWindowObject : function(e){
    	 try{
			 var windowId = $(e.target).closest("div.taskbar-item").attr("id").replace("-taskbarItem","");
			 var groupId = $(e.target).closest(".k-group").attr("id").replace("-taskbarItem-list","");
			 var window = this._getItem(this.options.groups[groupId], windowId).item;
			 return window;
    	 }catch(error){
    		 $si.logger.error("Error in application taskbar get window object method.");
    	 }
     },
     
     _onWindowTitleClick : function(e){
    	//don't hide on close button click
    	 if(!$(e.target).hasClass("taskbar-item-close")){
    		 var siWindow = this._getWindowObject(e);
    		 this._bringWindowToFront(siWindow);
    	 }
     },
     
     _bringWindowToFront : function(siWindow){
		 if(siWindow){
    		 $("#" + siWindow.id +".sti-window")[siWindow.type]("bringWindowToFront");
    	 }
     },
     
     _closeDashboard : function(e){
    	 var window = this._getWindowObject(e);
    	 //check for same id of application task bar and window
    	 if(window.enableClose){
    		 $("#" + window.id +".sti-window")[window.type]("closeWindow");
    	 }
     },
     
     _closeGroup : function(groupId){
    	 var windows = this.options.groups[groupId];
    	 if(windows){
    		 $(windows).each(function(index,window){
    			 if(window.enableClose){
    				 $("#" + window.id +".sti-window")[window.type]("closeWindow");
    			 }
    		 });
    	 }
    	 
     },

	  _destroy: function() {
          // Use the destroy method to reverse everything your plugin has applied
          return this._super();
      },

  });

});