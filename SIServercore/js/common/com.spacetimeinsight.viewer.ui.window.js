/**
 * if you are using this component independently please use
 * requirejs shim and make sure kendo is included before shimWindow.
 * for eg. consider htmlViewer.html
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.shimWindow',
    'favorite/com.spacetimeinsight.viewer.favoriteUtil',
    'common/com.spacetimeinsight.viewer.ui.toolBarMenu',
    'common/com.spacetimeinsight.viewer.ui.drawer' ,
    'common/com.spacetimeinsight.viewer.userPrivileges',
    'window/com.spacetimeinsight.i18N.businessViewWindowErrors',
    'window/com.spacetimeinsight.i18N.businessViewWindowErrors.regional',
    'common/com.spacetimeinsight.i18N.global',
    'common/com.spacetimeinsight.i18N.global.regional',
    'siNotification',
    'uiUtils',
],function($) {
	$.widget('spacetimeinsight.siViewerWindow', $.spacetimeinsight.siViewerShimWindow,{
		options : {
			title         : "ShimWindow",
			windowAttributes : {
					position: {
						top: "100px",
						left: "100px"
						} ,
					modal : false,
					//maxHeight:"100%",
				},
			iframe				: false,
			enableClose 		: true,
			actions 	  		: ["ExpandCollapse", "Minimize" , "Maximize","Close"],
			toolBarWidgetJS 	: "common/com.spacetimeinsight.viewer.ui.windowToolBar",
			toolBarWidget   	: "siViewerWindowToolBar",
			drawerWidgetJS		: "",
			drawerWidget  		: "",
			drawerState			: 0,
			shimRequired 		: false,
			windowIcon 			: "",
			windowClass			: "",
			footerRequired		: false,
			footerWidget		: "siViewerFooter",
			footerWidgetJS 		: "common/com.spacetimeinsight.viewer.ui.footer",
			showHelpDropdown	: false,
			refreshOnRestore 	: false,

			tooltip 			: $si.i18N.Global.tooltip,

		},

		pluginName:"siViewerWindow",
		//Favorite Code
		toolBarState:0,
		drawerState:0,

		GENERIC_DIV 		 : kendo.template("<div id ='#= id #'></div>"),
		WINDOW_ICON_SPAN	 : kendo.template("<span class='win-title-icon'><img src='#= imageUrl #' ></img></span> "),
		_create : function(){
			var $this = this;
			requirejs(['common/com.spacetimeinsight.viewer.ui.windowFavorite'],function(){
			});

			$(this.element).addClass("sti-window");
			if(this.options.windowConfig && this.options.windowConfig.errorMessage){
				this.options.error = this.options.windowConfig.errorMessage;
			}	
			this._super();
		},

		_createwindowControl: function(){

		},

		_createControls : function(){
			$si.events.triggerNotificationClear(this.options.id,this.options.businessViewId);
			this._setDefaultValues();

			var $this = this;
			var windowOptions = {};
			if(this.options.iframe === true ) {
				windowOptions.iframe = true;
			}
			$(this.element).kendoWindow($.extend(windowOptions,this.options.windowAttributes,{
				actions : this.options.actions,
				title : this.options.title,
				resize : function(event){
					$this.resizeWindow(event);
				},
				close : function(event){
				//modified to fix JIRA#2161
					if($this.options.windowClass!='w-business-view' && $this.options.windowClass!='w-map-view'){
						$this.closeWindow(event);
					}else{
						event.preventDefault();
					}
				},
				dragend:function(event){
					$this.dragEnd();
				},
         	}));
			
			this._preventHeaderDoubleClick();

			if($si.viewer.isAppToolBarEnabled){
				$(this.element.parent()).css("margin-top","60px");
			}
         	this._super();

         	$(this.element).parent().addClass(this.options.windowClass);
			this.enableControlButton("Close",this.options.enableClose);

			var header = $this.element.prev();
			if(this.options.windowIcon != null && this.options.windowIcon != ""){
				header.children('.k-window-title').before($this.WINDOW_ICON_SPAN({
					imageUrl : this.options.windowIcon ,
				}));
			}

			if(this.options.title){
			 header.children('.k-window-title').attr("title",this.options.title);
			 header.children('.win-title-icon').attr("title",this.options.title);
			}


			this._createToolbarAndDrawer();
			if(this.options.footerRequired){
				this._createFooter();
			}
			this.options.onWidgetCreationcomplete = function(){
				//$($this.element).customScrollbar(false, false);
			};

			 var siWindow = $(this.element).data("kendoWindow").wrapper;

			 siWindow.find(".k-i-expandcollapse").attr('title', $si.i18N.Global.tooltip.showToolbar);
			 siWindow.find(".k-i-minimize").attr('title', $si.i18N.Global.tooltip.minimizeWindow);
			 siWindow.find(".k-i-maximize").attr('title', $si.i18N.Global.tooltip.maximizeWindow);
			 siWindow.find(".k-i-close").attr('title', $si.i18N.Global.tooltip.closeWindow);

			 siWindow.find(".k-window-actions").bind("click",function(){
				 if($(event.target).hasClass("k-i-maximize")){
					 $this.maximize();
					 event.stopPropagation();
				 }else if($(event.target).hasClass("k-i-restore")){
					$this.restore();
					event.stopPropagation();
				 }
			 });

			 /** adjust z-index **/
//			 siWindow.bind("click",function(){
//				 siWindow.css("z-index",$si.uiUtils.maxZindex() + 1);
//			 });
         },

         maximize : function(){
        	 var siWindow = $(this.element).data("kendoWindow");
        	 var maximizeIcon = siWindow.wrapper.find(".k-i-maximize");
        	 maximizeIcon.attr("title",$si.i18N.Global.tooltip.restoreWindow);
        	 if(siWindow){
        		 this.options.restoreState = siWindow.wrapper.css(["top","left","width","height"]);
    			 siWindow.wrapper.css({
    				 			top : "0px",
    				 			left : "0px",
    				 			height : ($(window).height() - 80) +"px",
    				 			width : ($(window).width() - 10) + "px",
    			 });
    			 this._setWindowHeight(siWindow.wrapper);
    			 maximizeIcon.removeClass("k-i-maximize");
    			 maximizeIcon.addClass("k-i-restore");
    			 siWindow.trigger("resize");
        	 }
         },
         
         _setWindowHeight : function(siWindow){
        	 if(siWindow && siWindow.length > 0){
        		 var appContainer = $(".si-viewer-app-container");
            	 var appHeight;
            	 var siWindowHeight = siWindow.outerHeight();
            	 if(appContainer && appContainer.length > 0){
            		 appHeight = appContainer.height();
            		 if(siWindowHeight > appHeight){
            			 siWindow.height(appHeight - 30);
            		 }
            	 }
        	 }
         },

         restore : function(){
        	 var siWindow = $(this.element).data("kendoWindow");
        	 var restoreIcon = siWindow.wrapper.find(".k-i-restore");
        	 restoreIcon.attr("title",$si.i18N.Global.tooltip.maximizeWindow);
        	 if(siWindow && this.options.restoreState){
        		 siWindow.wrapper.css(this.options.restoreState);
        		 this._setWindowHeight(siWindow.wrapper);
        		 restoreIcon.addClass("k-i-maximize");
        		 restoreIcon.removeClass("k-i-restore");
    			 siWindow.trigger("resize");
        	 }
         },
         
         _preventHeaderDoubleClick : function(){
        	 var $this = this;
        	 var siWindow = $(this.element).data("kendoWindow").wrapper;
        	 var titleBar = siWindow.find(".k-window-titlebar");
        	 if(titleBar && titleBar.length > 0){
        		 titleBar.bind("dblclick", function(e){
        			var maximizeButton = siWindow.find(".k-i-maximize");
                	var restoreButton = siWindow.find(".k-i-restore");
         	    	if(maximizeButton && maximizeButton.length > 0){
         	    		$this.maximize();
         	    	}else if(restoreButton && restoreButton.length > 0){
         	    		$this.restore();
         	    	}
         	    	e.stopPropagation();
        		 }); 
        	   }
         },

		_createErrorNotification:function(e,messageTemplate){
			try{

				if(e && e.message && e.message._errorDesc) {
					e.message = e.message._errorDesc;
				}
				$si.events.triggerError(
							{
								windowId:this.options.id ,
								message:e.message,
								messageTemplate:messageTemplate,
								sourceId: this.options.windowConfig ? this.options.windowConfig.businessViewId : "",
								sourceTitle:this.options.title
							});
			} catch(e){
				$si.Logger('window -> ').error("Error ["+e.message+"] occurred while raising notification ["+this.options.title+"]");
			}
		},
      _createSuccessNotification:function(messageTemplate,sourceId){
     
			try{
				$si.events.triggerSuccess(
							{
								windowId:this.options.id,
								messageTemplate:messageTemplate,
								sourceId: this.options.windowConfig? this.options.windowConfig.businessViewId:sourceId,
								sourceTitle:this.options.title
							});
				
			} catch(e){
				$si.Logger('window -> ').error("Error ["+e.message+"] occurred while raising notification ["+this.options.title+"]");
			}
		},
         _bindControls : function(){
        	 var $this = this;
 			 this._super();

 			//Fix for input box problem
			this.options.onCreationComplete = function(){
				//Stop maximization on tool bar click
				$this._bindNotifications();
				//To Capture any notifications before error binding
				if($this.options.error ) {
					$this._createErrorNotification({message :$this.options.error},$si.i18N.BusinessViewWindowErrors.initializingWindow);
					$this.options.error = null;
				}
				$this._stopMaximization();
				$this._bindTextBoxEvents();
				$this._bindHoverEvent();
				$this._bindMinimizeHandler();
				$this._addWindowMetadata();
				$this._bindToolBar();
				$this.setDefaultFavorite();
				$this.initializeWindow();
				$this.loadExternalResources();
			};

         },

		_bindToolBar :function() {
			var $this = this;
			$(this.options.toolBar)[$this.options.toolBarWidget]().bind(this.options.toolBarWidget.toLowerCase() + "_loaddefaultfavorite",function(e,data){
				var defaultFavorite = data.defaultFavorite;
				var favDataStr;
				if(defaultFavorite != null){
					$this.options.defaultFavorite = defaultFavorite;
				}
			});
		},

		_bindNotifications : function(){
			$si.notification.clearNotifications(this.options.id,this.options.businessViewId);
			var $this = this;
		 	$si.eventSource.notifications.bind(	$si.events.Notifications.onErrorEvent,function(event) {
		 		var notification = event.data;
		 		if(notification.windowId == $this.options.id){
	        		var exceptionTool =	$this.element.parent().find("#exceptionTool");
					if(exceptionTool) {
						exceptionTool.addClass("w-error-icon");
						exceptionTool.show();
					}
					$si.notification.showNotification(notification);
		 		}
		 	});

		   	//bind clear notifications
	 		$si.eventSource.notifications.bind(	$si.events.Notifications.onNotificationClear,function(event) {
	 			if(event.data.windowId == $this.options.id){
	 				if(!$si.viewer.notification[event.data.windowId] ){
		        		var exceptionTool =	$this.element.parent().find("#exceptionTool");
						if(exceptionTool) {
							exceptionTool.removeClass("w-error-icon");
							exceptionTool.hide();
						}
	 				}
	 			}
	 		});
        },

         initializeWindow: function() {
         	//subclasses should overwrite
         },

		 loadExternalResources : function() {
		 	//subclasses should overwrite
		 },

		 _cleanUpGroupTitle : function() {
        	 if(this.options.group ){
 				this.options.groupId = this.options.group.replace(" ","");
 				this.options.groupTitle = this.options.group;
 			}else{
 				this.options.groupId = this.options.id;
 				this.options.groupTitle = this.options.title;
 			}
		 },

         _setDefaultValues : function(){
			//if content is less then window min- width height then white space appears. fix for this
 			if(this.options.windowAttributes.minWidth){
 				$(this.element).css({minWidth:this.options.windowAttributes.minWidth});
 			}

 			if(this.options.windowAttributes.minHeight){
 				$(this.element).css({minHeight:this.options.windowAttributes.minHeight});
 			}

 			if(this.options.windowAttributes.maxWidth == 0 ){
 				delete this.options.windowAttributes.maxWidth;
 			}

 			if(this.options.windowAttributes.maxHeight == 0){
 				delete this.options.windowAttributes.maxHeight;
 			}
         },

        _createToolbarAndDrawer : function() {
        	var $this = this;
       		this.options.toolBarCreationComplete = this._onToolBarCreationComplete.bind(this);
       		this.options.drawerCreationComplete = this._onDrawerCreationComplete.bind(this);

        	var enableDrawer = this.options.drawerWidget ? true : false;
			if(this.options.toolBarWidget && this.options.toolBarWidget != ""){
				//dynamically include toolbar plugin
				requirejs([this.options.toolBarWidgetJS],function(){
						//This will add the tool bar in window.
						$this._createToolBar(enableDrawer);

	/*					if(enableDrawer){
							//dynamically add drawer plugin
							requirejs([$this.options.drawerWidgetJS],function(){
									$this._createDrawer();
							});
						}else{
							$this.options.isDrawerCreated = true;
							$this._onDrawerCreationComplete();
						}
						*/
				});
			}else{
				this._trigger("onCreationComplete",null,{id:this.options.id,domElement:$(this.element)});
			}
        },
	loadHelp : function(menuId){
						var $this = this;
						if(menuId == 1){
							$si.windowUtil.openBrowserWindow($si.viewer.viewerHelpUrl+$this.options.windowConfig.viewerHelpUrl,'portalUserGuide');
						}
						else if(menuId == 2 && $this.options.windowConfig && $this.options.windowConfig.helpUrl){
							$si.windowUtil.openBrowserWindow($si.viewer.rootViewerHelpUrl+$this.options.windowConfig.helpUrl,'appUserGuide');

						}
			},
		 _onToolBarCreationComplete : function(e,data){
		 	var $this = this;
			this.options.isToolBarCreated = true;
       		var enableDrawer = this.options.drawerWidget ? true : false;

			if(enableDrawer){
				//dynamically add drawer plugin
				requirejs([$this.options.drawerWidgetJS],function(){
						$this._createDrawer();
				});
			}else{
				$this.options.isDrawerCreated = true;
				$this._onDrawerCreationComplete();
			}
			
			//commented to fix duplicate window references in application status bar.
			/*if(this.options.isToolBarCreated == true && this.options.isDrawerCreated == true) {
				this._trigger("onCreationComplete",null,{id:this.options.id,domElement:$(this.element)});
			}*/
			var toolbar = this.options.toolBar[this.options.toolBarWidget]();
			var helpDropDownData = $(toolbar).find("#win-help-dropdown").data("kendoDropDownList");
			if(helpDropDownData){
				var helplist = helpDropDownData.list;
				var helplistli = helplist.find("li");
				if(this.options.windowConfig && !this.options.windowConfig.helpUrl){// no data disable the option
					helplistli[2].className = "help-dropdown-text-disabled k-item";
					helplistli[2].style.opacity = 0.5;
					helplistli[2].style.pointerEvents = "none";
				}
			}
        	 if(toolbar && toolbar.length > 0){
        		 toolbar.bind("dblclick", function(e){
         	    	e.stopPropagation();
        		 });
        	 }
		},

      	_onDrawerCreationComplete : function(e,data){
			this.options.isDrawerCreated = true;
			if(this.options.isToolBarCreated == true && this.options.isDrawerCreated == true) {
				this._trigger("onCreationComplete",null,{id:this.options.id,domElement:$(this.element)});
			}
      	},

      	_onDrawerApplyClicked : function(e,data){
      		console.log("DrawerApplyClicked");
      	},

		_createToolBar : function(enableDrawer){
			var $this = this;
			var toolBarWidget = this.options.toolBarWidget;
			var id = this.options.id + "_" + toolBarWidget;
			var windowId = $(this.element).attr("id");
			var windowHeader =  $(this.element).prevUntil('k-header');

			windowHeader.append(this.GENERIC_DIV({
						id:id
					}));

			//store element instead of id
			this.options.toolBar = $(this.element).prev(".k-header").children('#'+id);

			//you can customize base toolbar only.
			var toolBarOptions = {
									showHelpDropdown : this.options.showHelpDropdown,
									enableDrawer : enableDrawer ? true : false ,
									parentId	 : this.options.id,
									showToolbar  : this.options.windowConfig ? this.options.windowConfig.showToolbar : false,
									rightName	 : $si.userPrivileges.getRightName($this.pluginName),
								};

			//TODO: id is not defined in some cases, needs to be fixed
			try {
				$this._checkUserPrivliges(this.options.id);
			} catch(e) {
				$si.Logger(this.options.pluginName).error('Error occurred while checking user privileges '+e.message);
			}
			if(this.options.windowTools){
				toolBarOptions.windowTools = this.options.windowTools;
				toolBarOptions.tooltip = this.options.tooltip;
			}

			$(this.options.toolBar)[toolBarWidget](toolBarOptions);

			//Binding toggle click event
			$(this.options.toolBar)[toolBarWidget]().bind(toolBarWidget.toLowerCase() +"_ontoggletoolbar",function(event,data){
				//FAVORITE CODE
				if($this.options.toolBarState === 0) {
					$($this.element).data("kendoWindow").wrapper.find(".k-window-actions").find(".k-i-expandcollapse.toolbar-close").attr('title',$si.i18N.Global.tooltip.showToolbar);
					$this.options.toolBarState = 1;
					  if($($this.options.drawer).is(":visible")&&!$si.viewer.isAppToolBarEnabled){
						$($this.options.drawer).hide();
					  }
				} else {
					$($this.element).data("kendoWindow").wrapper.find(".k-window-actions").find(".k-i-expandcollapse.toolbar-open").attr('title',$si.i18N.Global.tooltip.hideToolbar);
					$this.options.toolBarState = 0;
					  if($($this.options.drawer).is(":visible") &&!$si.viewer.isAppToolBarEnabled ){
						$($this.options.drawer).hide();
					  }
				}

				//$this._adjustContentHeight();
				$($this.element).data("kendoWindow").trigger("resize");
			});

			//Binding drawer click event
			$(this.options.toolBar)[toolBarWidget]().bind(toolBarWidget.toLowerCase() +"_ondrawerclick",function(event,data){
				//toggle drawer
				if($this.options.drawer){
					//FAVORITE CODE
					if($this.options.drawerState === 0) {
						$this.options.drawerState = 1;
						// Added for icon change on Toggle
						if($this.options.toolBar.find("#drawerTool").hasClass("drawerclassup")){
							$this.options.toolBar.find("#drawerTool").removeClass("drawerclassup");
							$this.options.toolBar.find("#drawerTool").addClass("drawerclassdown");
							$this.options.toolBar.find("#drawerTool").prop("title",$this.options.tooltip['hideDrawer']);
							$($this.element).parent().find('.k-animation-container').is(':visible');
							$($this.element).parent().find('.k-animation-container').hide();
						}
					} else {
						$this.options.drawerState = 0;
						// Added for icon change on Toggle
						if($this.options.toolBar.find("#drawerTool").hasClass("drawerclassdown")){
							$this.options.toolBar.find("#drawerTool").removeClass("drawerclassdown");
							$this.options.toolBar.find("#drawerTool").addClass("drawerclassup");
							$this.options.toolBar.find("#drawerTool").prop("title",$this.options.tooltip['showDrawer']);
						}
					}

					if($($this.options.drawer)[$this.options.drawerWidget]){
						$($this.options.drawer)[$this.options.drawerWidget]("toggle");
					}
				}

			});

			$(this.options.toolBar)[$this.options.toolBarWidget]().bind(toolBarWidget.toLowerCase() + "_loaddefaultfavorite",function(e,data){
				var defaultFavorite = data.defaultFavorite;
				var appliedFavoriteName=data.appliedFavoriteName;
				var favDataStr;
				if(defaultFavorite != null){
					$this.options.defaultFavorite = defaultFavorite;
				}
				if(appliedFavoriteName != null){
					$this.options.appliedFavoriteName = appliedFavoriteName;
				}
			});
			
			$($this.options.toolBar)[$this.options.toolBarWidget]().bind(this.options.toolBarWidget.toLowerCase() + "_cleardefaultfavorite",function(e,data){
					$this.options.defaultFavorite = null;
			});

			$(this.options.toolBar)[$this.options.toolBarWidget]().bind(toolBarWidget.toLowerCase() + "_onfavoritemenucreate",function(e,data){
				$this.options.favoriteMenuComplete = true;
				$this._trigger("toolBarCreationComplete",null,{});
			});

			$si.favoriteUtil.bindFavoriteMenu($this,toolBarWidget);

			//Binding notification click event
			$(this.options.toolBar)[toolBarWidget]().bind(toolBarWidget.toLowerCase() +"_onnotificationclick",function(event,data){
				$si.notification.showAllNotification($this.options.id);
			});
			//bind help select event
			$(this.options.toolBar)[toolBarWidget]().bind(toolBarWidget.toLowerCase() +"_onhelpitemselect",function(event,data){
				$this.loadHelp(data.menuId);
			});



			var siWindow = $(this.element);
			//max height adjustment for toolbar
			var maxHeight = this.options.maxHeight + $(this.options.toolBar).height();
			siWindow.closest(".k-window").css({"maxHeight": maxHeight +"px"});

			siWindow.data("kendoWindow").wrapper.css({"top": this.options.top});
			siWindow.data("kendoWindow").wrapper.find(".k-i-expandcollapse").click(function(e){
				if($this.options.toolBar){
					$($this.options.toolBar)[$this.options.toolBarWidget]("toggleToolBar");
					if($($this.options.drawer).is(":visible")){
						$($this.options.drawer).hide();
						if($($this.element).find(".highlight-color-picker").length){
							$($this.element).find(".highlight-color-picker").data("kendoColorPicker").close();
						}
					}

					if($("#lassoDiv").length != 0 && $("#lassoDiv").css("display") == "block"){
						$("#lassoDiv").hide();
				    	$("#lassoTool").removeClass("lasso-icon-highlight");
				    	$("#lassoTool").addClass("lasso-icon");
				    	$("#lassoTool").parent(".toolbar-icon").removeClass("parent-lasso");
				    	$("#lassosicondropdownTool").data('kendoDropDownList').close();
				    	$("#colorTool").data('kendoColorPicker').close();
					}
					var favoriteTool = $this.options.toolBar.find('#favoriteTool');
					var animationContainerState = favoriteTool.find('.k-animation-container').css('display');
					if(animationContainerState == "block"){
						favoriteTool.data('kendoMenu').close();
					}
				//	siWindow.data("kendoWindow").wrapper.find('.k-window-titlebar').css("position","absolute");
				}
			});

			if(this.options.windowTools  && this.options.windowTools.indexOf("FAVORITE") == -1) {
				this.options.hasFavorites = false;
			} else {
				this.options.hasFavorites = true;
			}

			if($this.options.hasFavorites == false ) {
				this._onToolBarCreationComplete();
			}
		},

		_checkUserPrivliges : function(windowId) {
			var  $this =this;
			var windowTools=[];
           	$.each(this.options.windowTools,function(index,tool){
        		if(tool != null){
					if($si.userPrivileges.getPrivilege( $si.userPrivileges.getRightName($this.pluginName),tool)) {
						windowTools.push(tool);
					}
        		}
            });
 			this.options.windowTools = windowTools;
		},
		_adjustContentHeight : function(){
			var $this = this;
			var toolbar = this.options.toolBar;
			if(toolbar){
				var toolBarHeight = toolbar.height();
				var wrapper = $($this.element).data("kendoWindow").wrapper;
				var windowHeight = wrapper.height();
				var minHeight = wrapper.css("minHeight").replace("px","");
				if(windowHeight == minHeight){
					wrapper.height((windowHeight + toolBarHeight)+"px");
				}
				var newHeight = "100%"
				if(toolbar.css("display") != "none"){
					newHeight = (100 - (toolBarHeight/windowHeight)*100) +"%";
				}
				$($this.element).height(newHeight);
			}
		},

		_setMinMaxWidthHeight: function(){
			var $this = this;
			var wrapper = $($this.element).data("kendoWindow").wrapper;
			var titleWidth = wrapper.find(".k-window-title").width();
			var winControlBtnWidth = wrapper.find(".k-window-actions").width();
			var winMinWidth = titleWidth + winControlBtnWidth + 40;
			wrapper.css("minWidth", winMinWidth + "px");

		},

		getFavoriteDetailById: function(favoriteId){
			var dashboardId = this.options.id;
			var dashboardFavoriteData = $si.viewer.manageFavoriteData[dashboardId];
			var favList,favObj;
			if(dashboardFavoriteData != null){
				favList = dashboardFavoriteData.list;
			}
			$.each(favList,function(index,element){
				if(element.id == favoriteId){
					favObj = element;
					return false;
				}
			});
			//console.log(favObj);
			return favObj;
		},



		getFavoriteConfiguration : function(){
			var favConfig = {};
			favConfig.windowOptions = this.getWindowStyles();
			favConfig.windowSpecificConfiguration = this.getWindowSpecificConfiguration();
			return favConfig;
		},

		getWindowSpecificConfiguration: function(){
			return {};
		},


		_createDrawer : function(){
			var $this =this;
			var drawerWidget = this.options.drawerWidget;
			var id = this.options.id + "_" + drawerWidget;
			var rightToolbarDiv = $(this.options.toolBar).find("#rightToolbarDiv");
			//add drawer in toolbar
			$(this.element).prepend(this.GENERIC_DIV({
						id:id,
					}));

			//this.options.drawer = $(this.options.toolBar).children("#" + id);
			this.options.drawer = $(this.element).children("#" + id);
			$(this.options.drawer)[drawerWidget]({
				shimRequired : this.options.shimRequired ? this.options.shimRequired : false,
				rightName	 : $si.userPrivileges.getRightName($this.pluginName),
			});

			// Added by vinod to bind with click event of drwaer button and also change the name
			$(this.options.toolBar).find("#toggledrawerbutton").bind("click",function(e){
				if($($this.options.drawer)[drawerWidget]){
					$($this.options.drawer)[drawerWidget]("toggle");
				}
				$("#"+this.id).toggleClass("drawerclassdown");
			});
			
			// ended by vinod
			this._trigger("drawerCreationComplete",null,{toolBar : this.options.drawer});
		},


		getToolBar : function(){
			return this.options.toolBar;
		},

		closeWindow : function(event) {
			var toolBar = this.getToolBar();
			if(toolBar){
            	toolBar[this.options.toolBarWidget]("unBindGlobalEvents");
            }
            $(this.element).data("kendoWindow").destroy();
            this._removeWindowMetadata();
            $si.events.triggerNotificationClear(this.options.id,this.options.businessViewId);
            this._trigger("onCloseWindow",null,{id:this.options.id,event:event});
            this.closeAddFavoriteWindow();
		},
		
		closeAddFavoriteWindow: function(){
			var windowId = this.options.id;
			var addFavoriteWindow = this.options.addFavoriteComponent;
			try{
					if(addFavoriteWindow){
						addFavoriteWindow.siViewerAddFavoriteComponent("closeWindow");
					}
			}catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in closeAddFavoriteWindow ["+this.options.title+"]");
			}
			
		},
		

		resizeWindow : function(event) {
			this._resizeWindow(event);
		},

		_resizeWindow : function(event) {
			 this._adjustContentHeight();
		//	this._setMinMaxWidthHeight();
			$si.eventSource.windowEvents.trigger($si.events.WindowEvents.onResizeWindow,
							new $si.events.WindowEvent($si.events.WindowEvents.onResizeWindow, this.options.id,null,false));
		},

		dragEnd:function(event){
			var isInfoWindow=false;
			if(this.options.windowConfig && this.options.windowConfig.infoWindow==true){
				isInfoWindow=true;
			}
			var win=$(this.element).data("kendoWindow");
			var position = win.wrapper.offset();
			 var dragWindowTop=position.top;
		     var dragWindowLeft=position.left;
		     var windoHeight=$(window).innerHeight();
		     var windoWidth=$(window).width();
			 //condition for the height of the window drag and scroll
		     if(dragWindowTop>=windoHeight-30){
				 var newTop=	(windoHeight+$(window).scrollTop())-50;
				 win.wrapper.css("top",newTop +"px");
				$(window).scrollTop($(window).scrollTop()+30);

		     }
		     if(dragWindowLeft>=windoWidth-30){
					var newLeft=	(windoWidth+$(window).scrollLeft())-50;
					 win.wrapper.css("left",newLeft +"px");
				}

			  var windowAttributes={width : win.wrapper.width()+"px" ,
			 		            				height :win.wrapper.height()+"px",
				 		            			position:position,
												};
			$si.eventSource.windowEvents.trigger($si.events.WindowEvents.onDragEnd,
									new $si.events.WindowEvent($si.events.WindowEvents.onDragEnd, this.options.id,windowAttributes,isInfoWindow));


		},
		refreshWindow : function() {

		},
		_bindHoverEvent : function(){
			//hover event for control box hide/show
			var windowDiv = $(this.element).parent(".k-widget.k-window");
			windowDiv.hover(
				function () {
				    $(this).addClass("hover");
				    $(this).find(".k-window-actions").fadeIn(20);
				  },
				  function () {
				    $(this).removeClass("hover");
				    $(this).find(".k-window-actions").fadeOut(20);
				  }
			);
			windowDiv.find(".k-window-actions").hide();
		},


		//Component model is an observable which store the default or default favorite configuration
		_addWindowMetadata : function(){

			this._cleanUpGroupTitle();
			var businessViewId = null;
			var businessViewName = null;
			var windowId = this.options.id;
			if(this.options.windowConfig){
				businessViewId = this.options.windowConfig.businessViewId;
				businessViewName = this.options.windowConfig.businessViewName;
				windowId = this.options.windowConfig.id;
			}
			$si.viewer.windowMetadataModel.arrWindowMetadata.push({
													id : this.options.id,
													type : this.pluginName,
													businessViewId : businessViewId,
													businessViewName: businessViewName,
													windowId: windowId,
													groupId : this.options.groupId,
													groupTitle : this.options.groupTitle,
													title : this.options.title,
													windowIcon : this.options.windowIcon,
													groupIcon : this.options.groupIcon,
													windowAttributes : this.options.windowAttributes,
													enableClose : this.options.enableClose,
													infoWindow: (this.options.windowConfig)?this.options.windowConfig.infoWindow:false,
										});
			if(this.options.windowConfig){							
				$(this.element).attr("parent-layer",this.options.windowConfig.businessViewId);
				$(this.element).attr("window-type",this.options.windowConfig.windowType);
				if((this.options.windowConfig.infoWindow==true || this.options.windowConfig.addAsAttributeLink==true)){ 
					$(this.element).attr("runtime-window","runtime-window");
					this.element.parent().find('.k-icon.k-i-close').attr('style','opacity:1 !important');
				}
			}
			$(this.element).attr("plugin",this.pluginName);								
										
 		},

 		_removeWindowMetadata : function(){
 			for(var i = 0 ; i < $si.viewer.windowMetadataModel.arrWindowMetadata.length ; i++){
 				if($si.viewer.windowMetadataModel.arrWindowMetadata[i].id == this.options.id){
 					$si.viewer.windowMetadataModel.arrWindowMetadata.splice(i,1);
 				}
 			}

 		},

 		getWindowStyles :function(){
 			var siWindow = $(this.element).data("kendoWindow").wrapper;
 			return {
 					windowAttributes:{
 										width:siWindow.width(),
 										height:siWindow.height(),
 										position:siWindow.position(),
 									}
 					};
 		},

 		 enableControlButton : function(buttonId,flag){
 			var windowDiv = $(this.element).parent(".k-widget.k-window");
 			if(buttonId){
 				buttonId = buttonId.toLowerCase();
 			}

 			var button = windowDiv.find(".k-icon.k-i-" + buttonId).parent(".k-window-action.k-link");
 			if(flag){
 				button.removeClass("w-close");
 		 	}else{
 		 		button.addClass("w-close");
 		 	}

 			button.bind("click",function(e) {
 				if(!flag){
					e.stopPropagation();
					e.preventDefault();
 				}
			});
         },

         _stopMaximization : function(){
        	//Stop maximization on tool bar click
 			$(this.element).parent(".k-widget.k-window").find(".k-window-titlebar.k-header").on("dblclick", function(e){
 				//kendo title bar is not clicked
 				if(!($(e.target).is("span") && $(e.target).hasClass("k-window-title"))){
 					e.stopImmediatePropagation();
 				}
 			});
         },

         _bindMinimizeHandler : function(){
        	 var $this = this;
        	 $(this.element).data("kendoWindow").wrapper.find(".k-i-minimize").click(function(e){
        		 $this.minimizeWindow();
        		 e.stopPropagation();
 			});
         },


         _bindTextBoxEvents : function(){
        	 var textFieldElement = $(this.element).parent(".k-widget.k-window").find(".k-window-titlebar.k-header input:text");
        	 textFieldElement.hover(
						function() {
							$(this).addClass("i-hover-in");
							$(this).removeClass("i-hover-out");
						 },
						function() {
							$(this).addClass("i-hover-out");
							$(this).removeClass("i-hover-in");
						}
				);

				textFieldElement.bind("mousedown",function(e){
				   $(this).focus();
				   e.stopPropagation();
				});
         },

         _createFooter : function(){
        	 var $this = this;
        	 if(this.options.footerWidget && this.options.footerWidgetJS){
        		 requirejs([this.options.footerWidgetJS],function(){
        			 $($this.element).after($this.GENERIC_DIV({id:$this.options.id+"_footer"}));
        			 $this.options.footer = $($this.element).next("#" + $this.options.id+"_footer");
        			 $this.options.footer[$this.options.footerWidget]();

        			 $this._trigger("onFooterCreationComplete",null,{footer:$this.options.footer});
        		 });
        	 }
         },
         updateShareFavoriteInCache: function(FavoriteIds,flag){
 			var windowId = this.options.id;
 			var favoriteData = $si.viewer.manageFavoriteData[windowId];
 			var itemIndex,favoriteId;
 			var isShare =  flag ? 'Y' : 'N';
 			$.each(FavoriteIds,function(index,element){
 				$.each(favoriteData.list,function(i,e){
 					if(e.id == element){
 						itemIndex = i;
 						return false;
 					}
 				});
 				favoriteData.list[itemIndex].isShared = isShare;
 			});
 		},

		getWindowAttributes :function(){
			var siWindow = $(this.element).data("kendoWindow").wrapper;
			return {

					width:siWindow.width(),
					height:siWindow.height(),
					position:siWindow.position(),

				};
		},


 		isMaximized : function(){
 	       	 var restoreIcon = $($(this.element).data("kendoWindow").wrapper).find(".k-icon.k-i-restore");
 	       	 if(restoreIcon && restoreIcon.length > 0){
 	       		 return true;
 	       	 }
 	          	return false;
 	 		},

 	 		isMinimized : function(){
 	          	return $($(this.element).data("kendoWindow").wrapper).css("display") == "none";
 	 		},

 	 		isRestored : function(){
 	 			 var maxIcon = $(this.element).data("kendoWindow").wrapper.find(".k-icon.k-i-maximize");
 	       	 if(maxIcon && maxIcon.length > 0){
 	       		 return true;
 	       	 }
 	          	return false;
 	 		},

 	 		isOpened : function(){
 	          	return $($(this.element).data("kendoWindow").wrapper).css("display") != "none";
 	 		},

 	 		//for us close mean window doesn't exist. This object is not there.

 	 		bringWindowToFront : function(){
 	 			var siWindow = $(this.element).data("kendoWindow");
 	 			siWindow.wrapper.fadeIn(300);
 	 			siWindow.toFront();
 	 			if(this.options.refreshOnRestore == true){
 	 				this.refreshWindow();
 	 				this.options.refreshOnRestore = false;
 	 			}
 	 		},

 	 		minimizeWindow : function(){
 	 			var siWindow = $(this.element).data("kendoWindow");
 	        	 siWindow.wrapper.fadeOut(300);
 	 		},
 	 		refreshWindow : function() {


 	 		},

	});

});