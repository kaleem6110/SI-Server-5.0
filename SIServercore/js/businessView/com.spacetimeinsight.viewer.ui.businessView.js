define([
    'common/com.spacetimeinsight.viewer.ui.tree',
    'common/com.spacetimeinsight.viewer.ui.floatingWindow',
    'common/com.spacetimeinsight.viewer.ui.window',
    'businessView/com.spacetimeinsight.viewer.ui.layerRightClickMenu',
    'siNotification',
    'uiUtils',
    'siDraggable',
    'siResizeable',
    'favorite/com.spacetimeinsight.viewer.applicationFavoriteUtil',
],
function(){
        $.widget('spacetimeinsight.siViewerBusinessView',$.spacetimeinsight.siViewerWindow,{
            //default options for business view window
            options:{
            	windowAttributes : {
                    width   : "270px",
                    height  : "auto",
                    position: {
                        top     : "0px",
                        left    : "5px"
                    },
                },
                title				: $si.i18N.Global.businessViewsWindowTitle,
 				windowTools 		: ["FAVORITE","SPACER","CLEAR_FILTER"],
				tooltip 			: $si.i18N.Global.tooltip,
                drawerWidgetJS 		: "businessView/com.spacetimeinsight.viewer.ui.businessViewDrawer",
                drawerWidget 		: "siViewerBusinessViewDrawer",
                windowIcon 			: "css/images/business_view.png",
                windowClass 		: "w-business-view",
                showHelpDropdown	: true,
                enableClose 		: false,
                lassoRefreshes      : {},
             },

            ECOSYSTEM_TYPE : {
				ON_LOAD_START 		: "onLoadStart",
				ON_LOAD_COMPLETE 	: "onLoadComplete",
				ON_LOAD_ERROR	 	: "onLoadError",
				ON_LASSO_APPLIED	: "onLassoFilterApply",
				ON_LASSO_CLEARED	: "onLassoFilterClear",


            },

            _categories : [],
            pluginName:"siViewerBusinessView",
            PARENT_CATEGORY_WINDOW : kendo.template("<div id='#=id #' class='parentCategoryWindow'></div>"),
            CATEGORY_DIV : kendo.template("<div id='#= id #' class='categoryWindow'></div>"),
            CHILD_LAYER_DIV : kendo.template("<div class='layer-container'><div id='#= id #' class='layers-tree'></div></div>"),
            RIGHT_CLICK_MENU : kendo.template("<div id='#= id #_rightClickMenu' class='right-click-menu'></div>"),
			isDrawerInitialized : false,
			isSetDefaultFavoriteOnDrawerInitialize : false,
 			_URL_PARAMS : {},

            //Called on instance creation
            _create: function(){
            	this._super();
            },

            _createControls : function(){
            	this._super();
            	this.createRightClickMenu();
            	this.setDefaultHeight();
            },


            _bindControls : function(){
            	var $this = this;
    			this._super();

    			 $si.viewer.businessViewObserver.bind("change", function (e) {
                     if(e.field == "businessView"){
                         $this.setData(this.businessView);
                     }
                 });

                 $si.init.getBusinessView($si.viewer.selectedModuleModel.selectedModule);

                 //Use to handle layer loading and check icon
                 $si.routes.initializeEcoSystemEventWS($this._ecosystemEventSuccess.bind($this), $this._ecosystemEventFailure.bind($this));
                 $si.eventSource.businessView.bind($si.events.BusinessViewEvents.evtBusinessViewMetadataError, this._ecosystemEventFailure.bind($this));
                 $si.eventSource.businessView.bind($si.events.BusinessViewEvents.evtBusinessViewDataLoaded, this._onBusinessViewLoaded.bind($this));
                 $si.eventSource.businessView.bind($si.events.BusinessViewEvents.evtBusinessViewDataLoading, this._onBusinessViewLoading.bind($this));
                 $si.eventSource.businessView.bind($si.events.BusinessViewEvents.onBusinessViewSelect, this._triggerLayerClick.bind(this));
                 $si.eventSource.businessView.bind($si.events.BusinessViewEvents.onBusinessViewDeSelect, this._triggerLayerClick.bind(this));
                 $si.eventSource.businessView.bind($si.events.BusinessViewEvents.onBusinessViewSelectError, this._onBusinessViewSelectError.bind(this));

                 this._bindNotifications();

                 $(this.element).data("kendoWindow").wrapper.bind("mousedown",function(evt){
                	$this.updateRightClickMenuZIndex();
                 });
    		},


			 _onToolBarCreationComplete : function(e,data){
			 	console.log("*************** business view toolbar creation complete ***************");
			 	var $this = this;
			 	this._super();
				var toolbar = this.options.toolBar[$this.options.toolBarWidget]();

				var helpDropDownData = $(toolbar).find("#win-help-dropdown").data("kendoDropDownList");
				var helplist = helpDropDownData.list;
				var helplistli = helplist.find("li");

				if( !$si.viewer.applicationBusinessViewHelpUrl){// no data disable the option
						helplistli[2].className = "win-help-dropdown-text-disabled k-item";
						helplistli[2].style.opacity = 0.5;
						helplistli[2].style.pointerEvents = "none";
				}
				$this._bindClearFilterButton();
			},

    		_bindClearFilterButton : function(){
    			var clearFilterButton = this.options.toolBar[this.options.toolBarWidget]("getToolBarItem","CLEAR_FILTER");
    			if(clearFilterButton && clearFilterButton.length > 0){
    				$(clearFilterButton).bind("click",function(){
    					$si.businessViewUtil.clearAllBusinessViewFilter();
    				});
    			}
    		},

			loadHelp : function(menuId){
				var $this = this;
				if(menuId == 1){
					$si.windowUtil.openBrowserWindow($si.viewer.viewerBusinessViewHelpUrl,'portalUserGuide');
				}
				else if(menuId == 2 && $si.viewer.applicationBusinessViewHelpUrl){
					$si.windowUtil.openBrowserWindow($si.viewer.applicationBusinessViewHelpUrl,'appUserGuide');

				}
			},

    		_onDrawerCreationComplete : function(e,data){
    			console.log("*************** business view drawer creation complete ***************");
                 	var $this = this;
                 	this._super();
                 	var drawer = $this.options.drawer[$this.options.drawerWidget]();

                 	drawer.bind("siviewerbusinessviewdrawer_onshowhidecategory",function(event,data){
                 		if(data){
                 			var categoryDiv = $($this.element).find("#" +data.id+".categoryWindow");
                     		categoryDiv.siFloatingWindow("showCategory",data.isChecked);
                 		}
                 	});

                 	drawer.bind("siviewerbusinessviewdrawer_onexpandcollapsecategory",function(event,data){
                 		if(data){
                 			var categoryDiv = $($this.element).find("#" +data.id+".categoryWindow");
                     		categoryDiv.siFloatingWindow("expandCategory",data.isChecked);
                 		}
                 	});
                 	this.isDrawerInitialized = true;
                 	if(this.isSetDefaultFavoriteOnDrawerInitialize) {
                 		this._setDefaultFavorite();
                 	}
    		},

    		_setExpandStateInDrawer : function(id,isExpand){
    			/** check for drawer exist **/
    			if(this.options.drawer[this.options.drawerWidget]){
    				this.options.drawer[this.options.drawerWidget]("setExpandState",id,isExpand);
    			}
    		},


            _showNotificationIcon : function(layerId){
            	var $this = this;

            	var notificationIcon = $(this.element).find("span#" + layerId +"-notification-icon");
            	if(notificationIcon){
            	   	notificationIcon.addClass("notification-icon");
            		notificationIcon.unbind("click");
            		notificationIcon.bind("click",function(e){
            			$si.notification.showNotificationBySource($this.options.viewerPluginId,layerId);
            		});
            	}

           		var layerImg = $(this.element).find("img#" + layerId + "_layer_status");
            	if(layerImg) {
		    		layerImg.removeClass("layer-status-unloaded");
		    		layerImg.removeClass("layer-status-loading");
            	}

            },

            _showSuccessNotificationIcon : function(layerId){
            	var $this = this;

            	var notificationIcon = $(this.element).find("span#" + layerId +"-notification-icon");
            	if(notificationIcon){

            		notificationIcon.addClass("green-notification.noty_bar");
            		notificationIcon.unbind("click");
            		notificationIcon.bind("click",function(e){
            		    $si.notification.showNotificationBySource($this.options.viewerPluginId,layerId);
            		});
            	}

           		var layerImg = $(this.element).find("img#" + layerId + "_layer_status");
            	if(layerImg) {
		    		layerImg.removeClass("layer-status-unloaded");
		    		layerImg.removeClass("layer-status-loading");
            	}

            },


           _hideNotificationIcon : function(businessViewId){
            	var $this = this;
            	var notificationIcon = $(this.element).find("span#" + businessViewId +"-notification-icon");
            	if(notificationIcon && notificationIcon.hasClass("notification-icon") ){
            		notificationIcon.removeClass("notification-icon");
            		notificationIcon.unbind("click");
            	}
            },

			getFavoriteDetails : function(){
				//Overriding base as this is an application level favorite
				return $si.applicationFavoriteUtil.getApplicationFavorite(false);

			},

			getBusinessViewFavoriteDetails : function() {
				return this._getFavoriteDetails();
			},

			setDefaultFavorite: function(){
				var $this = this;
				if($si.viewer.initialized == false){
					$si.eventSource.businessView.bind($si.events.Viewer.onViewerInitialized, function() {
						$this._setDefaultFavorite();
					});
					//fallback just in case there is a race condition
					if($si.viewer.initialized == true) {
						$this._setDefaultFavorite();
					}
				} else {
					$this._setDefaultFavorite();
				}

			},

			_setDefaultFavorite: function(){
				$si.businessViewUtil._setNodesInMap($si.viewer.businessViewObserver.businessView.nodeList);
				if(this.isDrawerInitialized == false) {
					this.isSetDefaultFavoriteOnDrawerInitialize = true;
					return;
				}
				console.log("******************************* set default favorite getting called ***************");
               	this.options.defaultCategoriesLayout = this._getDrawerFavoriteSettings();
				if($si.viewer.clonedApplicationSettings) {
					this.applyFavorite($si.viewer.clonedApplicationSettings,false,true);
				} else	if(this.options.defaultFavorite != null){
					this.applyFavorite(this.options.defaultFavorite,true,true);
				} else {
					$si.businessViewUtil.loadDefaultSelections();
				}
			},

            getWindowContentFavoriteSettings: function(){
            	var windowSpecificConfiguration = {
            			selectedBusinessViews : $si.applicationFavoriteUtil.getSelectedBusinessViews(),
            			categoryWindowsLayout : this._getCategoryWindowsLayout(),
            	};
            	return windowSpecificConfiguration;
            },

            _getCategoryWindowsLayout : function(){
            	var categoryWindowsLayout = [];
            	var layout;
            	var id;
            	if(this.options.parentCategoryWindow && this.options.parentCategoryWindow.length > 0){
            		this.options.parentCategoryWindow.find(".categoryWindow").each(function(index,categoryWindow){
            			categoryWindow = $(categoryWindow);
    					if(categoryWindow && categoryWindow.length > 0){
    						layout = categoryWindow.css(["top","left","width","height"]);
    						id = categoryWindow.attr("id")
    						categoryWindowsLayout.push({
    														id 	   : id,
    														layout : layout,
    												});
    					}
    				});
            	}
            	return categoryWindowsLayout;
            },

            _applyCategoryWindowsLayout : function(favorite){
            	if(favorite && favorite.categoryWindowsLayout){
            		var $this = this;
            		var categoryWindow;
            		$.each(favorite.categoryWindowsLayout,function(index,category){
            			if(category){
            				categoryWindow = $this.options.parentCategoryWindow.find("#" + category.id + ".categoryWindow");
            				categoryWindow.css(category.layout);
            			}
            		});
            	}
            },

			applyFavorite: function(favoriteObject,isDefault,isApplicationLevel){
				var favorite = $.parseJSON(favoriteObject.favoriteData);
				$si.applicationFavoriteUtil.applyApplicationFavorite(favorite,isDefault,isApplicationLevel);
			},

			applyBusinessViewFavoriteDetails:function(favorite,isDefault){
				this._applyFavorite(favorite,isDefault,true);
			},

		    applyWindowContentFavoriteSettings: function(favorite){
				var $this = this;
       			$si.eventSource.businessView.bind($si.events.BusinessViewEvents.evtBusinessViewMetadataLoaded, $si.applicationFavoriteUtil.openBusinessViewWindows);

       			/** viewer favorite either needs to be in at application level or viewer level **/
//				if(favorite.viewerPluginFavorite) {
//					$si.applicationFavoriteUtil.applyViewerPluginWindowFavorite(favorite.viewerPluginFavorite);
//				}

				$si.applicationFavoriteUtil.applySelectedBusinessViews(favorite.selectedBusinessViews);
       			//$si.businessViewUtil.selectDeselectBusinessViewList(favorite.selectedBusinessViews);
            	this._applyCategoryWindowsLayout(favorite);
		    },

			reset:function() {
				this._super();
				this.options.drawer[this.options.drawerWidget]('applyDrawerFavoriteSettings',this.options.defaultCategoriesLayout);
				$si.businessViewUtil.loadDefaultSelections();
			},

            _processData : function(categories,favoritedata){
                this._trigger("preLayerCreation",null,{id:this.options.id,categories:categories});
                this._categories = categories;
                this._createBusinessView(categories);
                this._trigger("preLayerCreation",null,{id:this.options.id,categories:categories});
            },

            //Create Layer tree
            _createBusinessView : function(categories){
                var $this = this;
                $(this.element).append($this.PARENT_CATEGORY_WINDOW({
					id : "parentCategoryWindow",
				}));
                this.options.parentCategoryWindow = $(this.element).find('#parentCategoryWindow');

//                this.options.parentCategoryWindow.click(function(e){
//             		e.preventDefault();
//             	});

                /** we can't use position relative. Issue on resize. setting the initial position **/
                var gap = 3;
                var top = 0;
                var categoryDiv;
                var layerDiv;
                $.each(categories,function(index,category){
                	if(category.items) {
                		if(category.hide == false){
	                		categoryDiv = $this._createCategoryWindow(category)
	                		layerDiv = $this._createLayers(categoryDiv,category);
	                		top = top + gap;
	                		categoryDiv.css("top",top + "px");
	                		top += categoryDiv.height();
	                		gap = 31;// padding 28 + 3px for space
                		}
                	}
                });

                if((top + gap) > this.options.parentCategoryWindow.height()){
                	this.options.parentCategoryWindow.css("height",(top + gap)+"px");
                }
            },

            _createCategoryWindow : function(category){
            	var $this = this;
            	if(this.options.parentCategoryWindow && this.options.parentCategoryWindow.length > 0){
            		this.options.parentCategoryWindow.append(this.CATEGORY_DIV({
    					id 		: category.id,
    				}));
            	}
                var categoryDiv =  $(this.element).find('#'+category.id +".categoryWindow");

                categoryDiv.siFloatingWindow({
                								category	  : category,
                								resizeOptions : {
        															containment : "parent",
        															start : function(event,ui){
        																	categoryDiv.trigger("mousedown");
        																},
                												},
                								dragOptions : {
        														cursor : "move",
        														containment : "parent",
        														start : function(event,ui){
																	categoryDiv.trigger("mousedown");
																},
																handle: ".business-view-category",
                											},
                								/** this event is triggered only on mouse click toggle **/
                								onCategoryExpand : function(event,data){
                													if(data){
                														$this._setExpandStateInDrawer(category.id,data.isExpand);
                													}
                												},
                							});
                return categoryDiv;
            },

            _createLayers : function(categoryDiv,category){
            	var $this = this;
            	categoryDiv.append(this.CHILD_LAYER_DIV({
                    					id : category.id + "_child",
            					  }));

                var layerDiv = categoryDiv.find("#" +category.id+"_child");
                //layerTree component is used to create tree structure.
                layerDiv.siViewerTree({
                    data : category.items,
                    onLayerRightClick : $this.openRightClickMenu.bind($this),
                    onDataLoaded : function(event,data){
                        $this._trigger("onNodeDataLoaded",null,data);
                    },
                    onSelectionComplete : function(event,data){
                    	if(data){
                    		$this._updateRootCategoryCheckbox(data.treeview);
                    	}
                        $this._trigger("onNodeSelectionComplete",null,data);
                    },
                    onNodeSelect : function(event,data){
                    	if(data){
                    		var event = {
                    						data : {
                    							businessViewId : data.nodeId,
                    						}
                    					};
                    		if(data.nodeSelected){
                    			$this._onBusinessViewLoading(event);
                    		}else{
                    			$this._onBusinessViewDeSelect(event);
                    		}
                    		$this._loadUnloadBusinessViewOnMap(data);
                    	}
                    },
                });
                /** removed category div auto height so that it can show scroll on expand of sub layer**/
                categoryDiv.css("height",categoryDiv.css("height"));

                return layerDiv;
            },

            _updateRootCategoryCheckbox : function(layerTree){
            	var categoryWindow = $(layerTree).closest(".categoryWindow");
            	if(categoryWindow && categoryWindow.length > 0){
            		var itemChecked = $(layerTree).find(":checkbox:checked").length > 0;
    				var itemUnChecked = $(layerTree).find(":checkbox:not(:checked)").length > 0;
    				categoryWindow.siFloatingWindow("setCategoryCheckBox",itemChecked,itemUnChecked);
            	}
            },

            //load data in business view component and create categories and layers
            setData : function(data,io){
            	var $this =this;
                    $(this.element).empty();
                    if(data.nodeList && data.nodeList.length > 0){
                        var categories = data.nodeList;
                        this.options.data = data;
                        //If UI window is not loaded this method is triggered from on Creation complete.
                        //this._trigger("preBusinessView",null,{id:this.options.id,data:categories});
                        this._processData(categories);
                        //this._trigger("preBusinessView",null,{id:this.options.id,data:categories});
                    }else{
                        //throw "Data is not in correct format.";
                        $si.Logger('init').debug("Either data is not in correct format or No Layer(s) map to Business Views.");
                    }
                    this._trigger("onWidgetCreationcomplete");
            },

            // Set the height of the window according the height of the screen
            setDefaultHeight : function() {
            	var screenHeight = $(window).height();
            	var appHeaderHeight = $('div.htmlViewer').children('.si-viewer-app-header').height();
            	var footerHeight = $('.si-viewer-app-header').children('.si-viewer-app-taskbar').height();
            	var addWhiteSpace = 55;
            	$(this.element).parent(".w-business-view").css("height",screenHeight-(appHeaderHeight + footerHeight + addWhiteSpace) + "px");
            },

            //Dispatch error event if some issue occur while setting data
            setError : function(data,io,error){
                console.log(error);
                this._trigger("onSetDataFailure",null,{id:this.options.id,data:data,io:io,error:error});
            },

            //return business view data
            getData : function(){
                return this.options.data;
            },

            //Return plugin Name
            getPluginName : function(){
                return this.pluginName;
            },

            openRightClickMenu : function(e,data){

            	if($si.businessViewUtil.isBusinessViewLoaded(data.layer.id)){
            		data.isSelected = true;
            //	if(data.isSelected){
            		var position = {
							top : data.event.clientY + 10,
							left : data.event.clientX + 10,
						};
            		this.options.rightClickMenu.siViewerLayerRightClickMenu("openMenu",{
            										layerId 			: data.layer.id,
            										position   			: position,
            										dataFilterTitle		: data.breadCrum,
            		});
            	}
            },

            updateRightClickMenuZIndex : function(){
            	var parentZIndex = $(this.element).data("kendoWindow").wrapper.zIndex();
            	this.options.rightClickMenu.zIndex(parentZIndex);
            },

            createRightClickMenu : function(){
            	var $this = this;
            	//disable default menu
            	$(document).bind("contextmenu",function(e){
            		e.preventDefault();
            	});
            	 $(document.body).append(this.RIGHT_CLICK_MENU({id: this.options.id}));
            	 this.options.rightClickMenu = $("#" + this.options.id + "_rightClickMenu");
            	 this.updateRightClickMenuZIndex();

            	 this.options.rightClickMenu.siViewerLayerRightClickMenu({
                	 									shimRequired 		: true,
                 								});
               //hide menu on click
             	$(document).bind("click",function(e){
             		if($this.options.rightClickMenu){
             			$this.options.rightClickMenu.siViewerLayerRightClickMenu("closeMenu");
             		}
             		//e.preventDefault();
             	});

             	var bindingObj = this.options.rightClickMenu.siViewerLayerRightClickMenu();
             	bindingObj.bind("siviewerlayerrightclickmenu_onwindowselectdeselect",function(event,data){
             		if(data && data.window && data.window.scriptFunction){
             			if(data.window.isSelected){
             				try{
	             				var businessMetadata=$si.businessViewUtil.getBusinessViewMetadata(data.window.businessViewId);
	             				var props=null;
	             				if(businessMetadata){
	             				props=businessMetadata.links[data.window.businessViewName].properties;
	             				}
	             				window[data.window.scriptFunction](data.window.id,props);
             				}catch(e){
             				$si.Logger('businessView').warn(" fail to execute script window function function name '"+data.window.scriptFunction +"' not found.");
             				}
             			}
             		}else if(data && data.window){
             			if(data.window.isSelected){
             				$si.businessViewUtil.openBusinessViewWindowByWindowObj(data.window);
             			}else{
             				$si.businessViewUtil.closeBusinessViewWindowByWindowObj(data.window);
             			}
             		}
             	});

             	//Show hide data on Map view
             	bindingObj.bind("siviewerlayerrightclickmenu_onmapviewselectdeselect",function(event,layerParams){
             		$this._refreshLayerWithParam(layerParams);
             	});

             	//Manual refresh
             	bindingObj.bind("siviewerlayerrightclickmenu_onmanualrefresh",function(event,layerParams){
             		$this._refreshLayerWithParam(layerParams);
             	});

            },

			_getBusinesViewEventData : function (nodeData) {
				var eventData = {businessViewId: nodeData.nodeId, businessViewUrl: nodeData.nodeUrl};
				return eventData;
			},
			_updateBusinessViewIconStyle : function (state) {
				var layerImg = $(this.element).find("img#" + data.nodeId + "_layer_status");
				//TODO: add code here to update the style
				/*
            	switch(state) {
            		case BUSINESS_VIEW_LOAD_STATUSES.NOT_SELECTED:
            		break;
            		case BUSINESS_VIEW_LOAD_STATUSES.SELECTED:
            		break;
            		case BUSINESS_VIEW_LOAD_STATUSES.LOADING:
            		break;
            		case BUSINESS_VIEW_LOAD_STATUSES.ERROR:
            		break;
            		default:
            		break;
            	}
            	*/
			},

			_updatedBusinessViewDynamicIcon : function(businessViewId){
				var businessViewNode = $si.businessViewUtil.businessViewMap[businessViewId];
				var icon = $(this.element).find("span#" + businessViewId + ".layer-text").prev("img");
				var iconUrl;
				if(icon && icon.length > 0 && !businessViewNode.staticIcon){
					iconUrl = icon.prop("src");
					if(iconUrl){
						var index = iconUrl.indexOf("rand=") - 1; //minus for either ? or &
						iconUrl = (index > -1) ? iconUrl.substr(0,index) : iconUrl;
						if(iconUrl.indexOf("?") == -1){
							iconUrl = iconUrl +"?rand=" + new Date().getTime();
						}else{
							iconUrl = iconUrl +"&rand=" + new Date().getTime();
						}
					}
					icon.prop("src",iconUrl);
				}
			},

			_onBusinessViewLoading : function(event) {
				var layerImg = $(this.element).find("img#" + event.data.businessViewId + "_layer_status");
        		layerImg.removeClass("layer-status-loaded");
        		layerImg.removeClass("layer-status-unloaded");
        		layerImg.addClass("layer-status-loading");
        		this._updatedBusinessViewDynamicIcon(event.data.businessViewId);
 			},

			_onBusinessViewDeSelect : function(event) {
				$si.businessViewUtil.setBusinessViewDataFilterIcon(event.data.businessViewId, false);
				var layerImg = $(this.element).find("img#" + event.data.businessViewId + "_layer_status");
        		layerImg.removeClass("layer-status-loaded");
        		layerImg.removeClass("layer-status-loading");
        		layerImg.addClass("layer-status-unloaded");
			},

			_onBusinessViewSelectError : function(event) {
				if(event && event.data){
					var businessViewId = event.data.businessViewId;
					//$si.businessViewUtil.setBusinessViewDataFilterIcon(businessViewId, false);
		    		//$si.businessViewUtil.removeBusinessViewMetadata(event.data.businessViewId);
					var layerImg = $(this.element).find("img#" + businessViewId+ "_layer_status");
	        		layerImg.removeClass("layer-status-loading");
	        		layerImg.removeClass("layer-status-unloaded");
	        		layerImg.addClass("layer-status-loaded");

//	        		var layerCheckBox = $(this.element).find("input#" + businessViewId+ "_node");
//	        		if(layerCheckBox && layerCheckBox.length > 0){
//	        			layerCheckBox.prop("checked",false);
//	        		}
	        		//$si.businessViewUtil.deSelectBusinessView(businessViewId);
				}


//        		$si.events.triggerError({
//							windowId:$si.windowUtil.getViewerPluginWindowId() ,
//							message:event.data.error,
//							sourceId: businessViewId,
//							sourceTitle:$si.businessViewUtil.getBreadCrum(businessViewId)
//						});
			},


            _onBusinessViewLoaded : function(event){
            	if($si.businessViewUtil.isBusinessViewLoaded(event.data.businessViewId,event.data.businessViewName)) {
	            	var layerImg = $(this.element).find("img#" + event.data.businessViewId + "_layer_status");
	 	    		layerImg.removeClass("layer-status-unloaded");
		    		layerImg.removeClass("layer-status-loading");
		    		layerImg.addClass("layer-status-loaded");
					this._getLegendConfiguration(event.data);
            	}
            },


            //Used to set layer icons
            _ecosystemEventSuccess : function(data){
            	data = JSON.parse(data);
            	$si.Logger('businessView').debug("EcoSystem Event :" +  data.name + data.businessViewId);

            	if(data.layerId){
            		data.businessViewId = data.layerId;
            		data.businessViewName = data.artifactName;
            	}


    	    	if(data.name == this.ECOSYSTEM_TYPE.ON_LOAD_COMPLETE){
    	    		$si.businessViewUtil.markBusinessViewAsLoaded(data.businessViewId, data.businessViewName);
    	    	 	if(this.options.lassoRefreshes && this.options.lassoRefreshes[data.businessViewId] == true) {
  	   	    			$si.events.triggerLassoEvent($si.events.LassoEvents.onLassoApplyAlgorithm,data);
  	   	    			this.options.lassoRefreshes[data.businessViewId] = false;
  	   	    			$si.Logger('businessView').debug("LassoEvents.onLassoApplyAlgorithm triggered :" + data.businessViewId);
    	    	 	}
    	    	 	var businessView = $si.businessViewUtil.getBusinessViewById(data.businessViewId,data.businessViewName);
    				if(businessView){
    					businessView.lastUpdateTime = new Date();
    					data.lastUpdateTime = businessView.lastUpdateTime;
    				}
    	    	//	this._onLayerLoad(data);
    	    	}else if(data.name == this.ECOSYSTEM_TYPE.ON_LOAD_ERROR){
    	    		this._ecosystemEventFailure({data:data});
     	    	}else if(data.name == this.ECOSYSTEM_TYPE.ON_LOAD_START){
    	    		//no requirement at this time
    	    	} else if(data.name == this.ECOSYSTEM_TYPE.ON_LASSO_APPLIED || data.name == this.ECOSYSTEM_TYPE.ON_LASSO_CLEARED){
	            	if(data.businessViewId){
	            		this.options.lassoRefreshes[data.businessViewId] = true;
  	   	    			$si.Logger('businessView').debug("Set LassoEvents.onLassoApplyAlgorithm as true :" + data.businessViewId);
	            	}
    	    	}

    	    	/*
    	    	 any custom event found will be triggered as global event ,
    	    	 .. which could refresh windows or layer or do something else when name data.name is
    	    	 matched with any of the defined or custom event matched.
    	    	 */

				$si.events.triggerGlobalEvent(data);

    	    },

    	    _ecosystemEventFailure : function(event){
				var error = event.data;
				if(!error._errorDesc){
					error._errorDesc = error.extData;
				}

				$si.businessViewUtil.raiseBusinessViewSelectError(error);
/*
  	    		$si.businessViewUtil.removeBusinessViewMetadata(error.businessViewId);
				if(!this.options.viewerPluginId) {
					this.options.viewerPluginId = $si.windowUtil.getViewerPluginWindowId();
				}
				$si.events.triggerError(
							{
								windowId:this.options.viewerPluginId ,
								message:error._errorDesc,
								sourceId: error.businessViewId,
								sourceTitle:$si.businessViewUtil.getBreadCrum(error.businessViewId)
							});


  	    		this._onBusinessViewDeSelect(event);
				$si.Logger('businessView').error("Error while fetching the ecosystem event :" +  error);
*/
    	    },
			_bindNotifications : function(){
				var $this = this;
				if(!this.options.viewerPluginId) {
					this.options.viewerPluginId = $si.windowUtil.getViewerPluginWindowId();
				}

			 	$si.eventSource.notifications.bind(	$si.events.Notifications.onErrorEvent,function(event) {

			 		var notification = event.data;
			 		if(notification && notification.sourceId) {
			 			$this._showNotificationIcon(notification.sourceId);
			 			$si.businessViewUtil.updateErrorState(notification.sourceId,notification.windowId,true);
			 		}
			 	});
/*			 	 //bind success notifications
			 	$si.eventSource.notifications.bind(	$si.events.Notifications.onSuccessEvent,function(event) {

			 		var notification = event.data;
			 		if(notification && notification.sourceId) {
			 			$this._showSuccessNotificationIcon(notification.sourceId);
			 			$si.businessViewUtil.updateErrorState(notification.sourceId,notification.windowId,false);
			 		}
			 	});
			 	*/
			 //bind clear notifications
			 	$si.eventSource.notifications.bind(	$si.events.Notifications.onNotificationClear,function(event) {
					if(event.data.sourceId){
						$this._hideNotificationIcon(event.data.sourceId);
						var businessViewLayerErrorState = $si.businessViewUtil.updateErrorState(event.data.sourceId,event.data.windowId,false);
						if(businessViewLayerErrorState  == false){
							$this._hideNotificationIcon(event.data.sourceId);
						}
					}
			 	});
	        },

    	    _refreshLayerWithParam : function(layerParams){
    	    	if(layerParams){
 					var businessViewMetaData = $si.businessViewUtil.getBusinessViewMetadata(layerParams.layerId);
    	    		//refresh all artifacts, thats why second param is null
    	    		$si.events.triggerRefreshBusinessViewEvent(layerParams.layerId,null,layerParams.params);
    	    	}
			},

			_getLegendConfiguration : function(businessViewEvent){
				$si.init.getLegendConfiguration();
			},

			_loadUnloadBusinessViewOnMap : function(businessViewNode){
				$si.events.triggerNotificationClear($si.windowUtil.getViewerPluginWindowId(),businessViewNode.nodeId);
    	    	if(businessViewNode) {
    	    		var eventData = {businessViewId: businessViewNode.nodeId, businessViewUrl: businessViewNode.nodeUrl};
    	    		if(businessViewNode.nodeSelected == true) {
    	    			$si.events.triggerBusinessViewEvent($si.events.BusinessViewEvents.onBusinessViewLoad, eventData);
    	    		} else {
	    	    		$si.events.triggerBusinessViewEvent($si.events.BusinessViewEvents.onBusinessViewUnLoad, eventData);
    	    		}
    	    	}
    	    },

    	    _triggerLayerClick : function(eventData){
    	    	if(eventData && eventData.data){
    	    		$(this.element).find("#" + eventData.data.businessViewId +".layer-text").trigger("click",{isSelected : eventData.data.isSelected ,disableNodeHideCheck : true});
    	    	}
    	    },


    });

});
