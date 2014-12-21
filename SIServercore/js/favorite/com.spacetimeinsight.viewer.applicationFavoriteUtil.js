/**
 *
 */

define(['jquery','jquery-ui','kendo', 'favorite/com.spacetimeinsight.viewer.favoriteUtil',],function() {

	$si.applicationFavoriteUtil = {


	     	clearApplicationFavorite: function(defaultFavorite){
	  			if(defaultFavorite != null) {
	  				this.applyApplicationFavorite(defaultFavorite);
	  			} else {
	  			 	this.resetBusinessView();
	  			 	this.resetViewerPlugin();
	  			}
	        },

			resetBusinessView : function() {
				var windows = $si.windowUtil.getWindows($si.viewer.businessViewWidget);
				if(windows.length === 1) {
					$("#" + windows[0].id +".sti-window")[windows[0].type]("reset",true);
				}
			},

			applyApplicationFavorite : function(favorite,isDefault) {

				if(favorite.favoriteData){
					favorite = $.parseJSON(favorite.favoriteData);
				}
				//If application header is not there then it is from business view
				if(favorite.applicationHeader){
					this.applyApplicationHeaderFavorite(favorite.applicationHeader);
				} else {
					//Reset application favorite icon as a business view favorite is applied
					$si.viewer.header[$si.viewer.applicationHeaderWidget]('resetHeaderFavorite');
				}

				if(favorite.businessView){
					this.applyBusinessViewFavorite(favorite.businessView,isDefault);
				}
				if(favorite.viewerPlugin){
					this.applyViewerPluginWindowFavorite(favorite.viewerPlugin,isDefault);
				}

			},

			getApplicationFavorite :function(isApplicationLevel) {
				var favorite = {};
				if(isApplicationLevel === true) {
					favorite.applicationHeader = this.getApplicationHeaderFavoriteDetails();
				}
				favorite.businessView = this.getBusinessViewFavorite();
				favorite.viewerPlugin = this.getViewerPluginWindowFavorite();
				return favorite;

			},


			//Applicaton Header
			getApplicationHeaderFavoriteDetails : function() {
				$si.Logger('favorite').debug("get application toolbar favorite "  );
				return $si.viewer.header[$si.viewer.applicationHeaderWidget]('getHeaderFavoriteDetails');
			},

			applyApplicationHeaderFavorite : function(favorite) {
				$si.Logger('favorite').debug("get application toolbar favorite "  );
				return $si.viewer.header[$si.viewer.applicationHeaderWidget]('applyHeaderFavorite',favorite);
			},


			// Businessview Favorites
			getBusinessViewFavorite : function() {
				return this._getWindowFavoriteByWindowType($si.viewer.businessViewWidget,"getBusinessViewFavoriteDetails");
			},

			applyBusinessViewFavorite : function(favorite,isDefault) {
				var windows = $si.windowUtil.getWindows($si.viewer.businessViewWidget);
				if(windows.length === 1) {
					$("#" + windows[0].id +".sti-window")[windows[0].type]("applyBusinessViewFavoriteDetails",favorite.windowFavorite,isDefault,true);
				}
			},




			getSelectedBusinessViews : function() {
 	          	var selectedBusinessViews = [];
 	          	var $this = this;
            	var businessViewIds = $si.businessViewUtil.getSelectedBusinessViewIds();
            	$.each(businessViewIds,function(i,businessViewId){
            		var windows=[];
            		//TODO get open window and not all windows.
            		$.each($si.businessViewUtil.getAllBusinessViewWindows(businessViewId),function(i,window){
            			 var favorite =  $this._getBusinessViewWindowFavorite(window.id);
            			 if(favorite != null) {
            			 	windows.push(favorite);
            			 }
            		});
           			var businessView = $si.businessViewUtil.getBusinessViewMetadata(businessViewId);
           			var filters = [];
       	    	    var linksMap = $si.businessViewUtil.businessViewMetadata[businessViewId].links;
		   	    	for (var businessViewName in linksMap) {
		   	    		var layer = linksMap[businessViewName];
	    	    		if(layer){
	    	    			if(layer.filterCriteria || layer.timeFilterCriteria){
	    	    				filters.push( {
	    	    					businessViewId : businessViewId ,
	    	    					businessViewName:businessViewName,
   	 			   					filterCriteria:layer.filterCriteria,
	 	    	   					timeFilterCriteria:layer.timeFilterCriteria
	    	    				});
	    	    			}
	    	    		}

		   	    	}
            		var businessViewFavorite = {
        				id :   businessViewId,
        				openWindows :windows,
        				filters:filters,
            		};
            		selectedBusinessViews.push(businessViewFavorite);
            	});
            	return selectedBusinessViews;

			},


			_getBusinessViewWindowFavorite: function(businessViewWindowId){
				var favorite = null;
				var $this = this;
				var windowId,windowMetaData;
           		$.each($si.viewer.windowMetadataModel.arrWindowMetadata,function(index,siWindow){

           			var windowId = siWindow.windowId;

           			if(siWindow.type != "siviewerbusinessview" && siWindow.type != "siviewergoogleearth" && windowId && windowId === businessViewWindowId ) {
           				var windowFavorite =   $("#" + siWindow.id +".sti-window")[siWindow.type]("getFavoriteDetails");
           				var windowState = $si.windowUtil.getWindowState(siWindow.id);
						favorite= {id : siWindow.windowId, businessViewName:siWindow.businessViewName, businessViewId:siWindow.businessViewId,windowFavorite : windowFavorite,windowState:windowState,type: siWindow.type};
           			}
            	});
 				return favorite;
			},


			// Plugin  Favorites
			getViewerPluginWindowFavorite: function(){
				return this._getWindowFavoriteByWindowType($si.viewer.viewerPlugin);
			},

			applyViewerPluginWindowFavorite: function(favorite){
				var windowElement = $("#"+ favorite.id + ".sti-window");
				if(windowElement.length != 0) {
//					windowElement[favorite.type]("applyFavorite",favorite.windowFavorite,false,true);
				}
 			},

 			resetViewerPlugin:function() {
 				var windowElement = $("#"+ $si.viewer.viewerPlugin + ".sti-window");
				if(windowElement.length != 0) {
					windowElement[favorite.type]("reset",true);
				}
 			},

 			// Business view Selections and Open Windows

 			applySelectedBusinessViews : function(selectedBusinessViews) {
				var favSelectedBusinessViewIds = [];
				$si.Logger('favorite').debug("applying window content favorite "  );
            	var clientSelectedBusinessViewIds = $si.businessViewUtil.getSelectedBusinessViewIds();
            	if(selectedBusinessViews != null){
	            	$.each(selectedBusinessViews,function(i,businessView){
	            		var businessViewId = businessView.id;
	            		var isBusinssViewSelected = false;
            			$si.viewer.favoriteOpenBusinessViewWindows[businessViewId] = businessView.openWindows;
            			$si.businessViewUtil.selectBusinessView(businessViewId);
	            		favSelectedBusinessViewIds.push(businessViewId);

	            	});
	            	var businessViewToUnSelect = $.grep(clientSelectedBusinessViewIds,function(layer){
	            		return $.inArray(layer,favSelectedBusinessViewIds) == -1;
	            	});
	            	$.each(businessViewToUnSelect,function(index,unSelectedBusinessViewId){
	            		$si.businessViewUtil.deSelectBusinessView(unSelectedBusinessViewId);
	            	});
            	}

 			},

			openBusinessViewWindows:function(event){
				var businessViewId = event.data.id;
				var windows = $si.viewer.favoriteOpenBusinessViewWindows[event.data.id];

				if(windows != null){
					//Create favorite window map
					var favoriteWindows = [];
			        $.each(windows,function(i,window){
			        	favoriteWindows[window.id] = window.windowFavorite;
			        });

					var linksMap = event.data.links;
					var linkObj;
					for (var businessViewName in linksMap) {
						if (linksMap.hasOwnProperty(businessViewName)) {
							linkObj = linksMap[businessViewName];
							var allWindows = linkObj.data.windows;
							if(allWindows) {
								$(allWindows).each(function(index,bWindow){
									if(bWindow != null ) {
										bWindow.businessViewId = businessViewId;
										bWindow.businessViewName = businessViewName;
										var windowFavorite = favoriteWindows[bWindow.id];
										if(windowFavorite) {
											$si.businessViewUtil.openBusinessViewWindowByWindowObj(bWindow,null,null,windowFavorite);
										} else{
											if( $si.windowUtil.isWindowOpen(bWindow.id)) {
													$si.businessViewUtil.closeBusinessViewWindowByWindowObj(bWindow);
											}
										}
									}
								});
							}
						}
					}
				}
				delete $si.viewer.favoriteOpenBusinessViewWindows[event.data.id] ;

				$si.Logger('favorite').debug("MetaDataLoaded for businessview id " + event.data.id  );
			},


 			_getWindowFavoriteByWindowType : function(windowType,favoriteMethod) {
 				var favorite = null;
				var windows = $si.windowUtil.getWindows(windowType);
				if(windows.length === 1) {
					var windowFavorite;
					if(favoriteMethod){
						windowFavorite =   $("#" + windows[0].id +".sti-window")[windows[0].type](favoriteMethod);
					} else {
        				windowFavorite =   $("#" + windows[0].id +".sti-window")[windows[0].type]("getFavoriteDetails");
					}
          			var windowState = $si.windowUtil.getWindowState(windows[0].id);
					favorite= {id : windows[0].id, windowFavorite : windowFavorite,windowState:windowState,type: windows[0].type};
				}
				return favorite;
 			},



	}
});