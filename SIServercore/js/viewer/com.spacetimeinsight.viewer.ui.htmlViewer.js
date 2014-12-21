define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'baseWidget',
    'siEventSource',
    'siEvents',
    'dialogBox',
    'siViewerLogger',
    'siRouter',
    'stringUtil',
    'windowUtil',
    'filterUtils',
    'businessViewUtil',
    'uiUtils',
    'viewer/com.spacetimeinsight.i18N.application',
    'viewer/com.spacetimeinsight.i18N.application.regional',
    'dateTimeFormat',
    'favorite/com.spacetimeinsight.viewer.favoriteUtil',
],function($,$si){
	$.widget('spacetimeinsight.siViewerHtmlViewer',$.spacetimeinsight.siViewerBaseWidget,{
		options : {
			title:"Application",
			applicationHeaderWidget   : "siViewerApplicationHeader",
			applicationHeaderWidgetJS : "viewer/com.spacetimeinsight.viewer.ui.applicationHeader",

			applicationContainerWidget   : "siViewerApplicationContainer",
			applicationContainerWidgetJS : "viewer/com.spacetimeinsight.viewer.ui.applicationContainer",

			applicationFooterWidget   : "siViewerApplicationFooter",
			applicationFooterWidgetJS : "viewer/com.spacetimeinsight.viewer.ui.applicationFooter",

		},

		pluginName:"siViewerHtmlViewer",

		CONTENT_DIV : kendo.template("<div id='#= cssClass #' class ='#= cssClass #'></div>"),

		_create : function(){
			var $this = this;
			$si.viewer.applicationHeaderWidget = $this.options.applicationHeaderWidget;
			this._super();

			$si.viewer.userModel.bind("evtApplicationConfigurationDataLoaded",function(event){
				$this._createApplicationHeader();
				$this._createApplicationContainer();
				$this._createApplicationFooter();
			});

			//Load Application configuration
			requirejs(["siInit"]);
		},

		_bindControls:function(){
			var $this =this;
			this.bindClose();
			$si.eventSource.businessView.bind($si.events.Viewer.onViewerInitialized, function() {
				try {
					$this.options.toolBar = $si.viewer.applicationToolBar;
					$si.favoriteUtil.bindFavoriteMenu($this,$si.viewer.applicationToolBarWidget);
					if($si.viewer.manageFavoriteData[$this.options.id]) {
						$this.options.defaultFavorite = $si.viewer.manageFavoriteData[$this.options.id].defaultFavorite;
						$this._setDefaultFavorite();
					}
				} catch(e) {
					$si.Logger('htmlViewer').error("Error = ["+e.message+"] occurred while applying default favorite");
				}
			});
		},

		_createApplicationHeader : function(){
			var $this = this;
			$(this.element).append(this.CONTENT_DIV({cssClass : "si-viewer-app-header"}));
			this.options.appHeader = $(this.element).find(".si-viewer-app-header");

			requirejs([this.options.applicationHeaderWidgetJS],function(){
			   $si.viewer.header = $this.options.appHeader[$this.options.applicationHeaderWidget]();
			});
		},

		_createApplicationContainer : function(){
			var $this = this;
			$(this.element).append(this.CONTENT_DIV({cssClass : "si-viewer-app-container"}));
			this.options.appContainer = $(this.element).find(".si-viewer-app-container");
			requirejs([this.options.applicationContainerWidgetJS],function(){
				$this.options.appContainer[$this.options.applicationContainerWidget]();
			});
		},

		_createApplicationFooter : function(){
			var $this = this;
			$(this.element).append(this.CONTENT_DIV({cssClass : "si-viewer-app-footer"}));
			this.options.appFooter = $(this.element).find(".si-viewer-app-footer");

			requirejs([this.options.applicationFooterWidgetJS],function(){
				$this.options.appHeader[$this.options.applicationFooterWidget]();
			});
		},

		bindClose : function(){
			window.onbeforeunload = function(e){
				$si.routes.closeAllWebsockets();
			}
		},

		getFavoriteDetails : function(){
			//Overriding base as this is an application level favorite
			return $si.applicationFavoriteUtil.getApplicationFavorite(true);

		},

		applyFavorite: function(favoriteObject,isDefault){
			var favorite = $.parseJSON(favoriteObject.favoriteData);

			//Overriding base as this is an application level favorite
			return $si.applicationFavoriteUtil.applyApplicationFavorite(favorite,isDefault);

		},

		_setDefaultFavorite: function(){
			var $this = this;
			if($this.options.defaultFavorite != null){
				$this.applyFavorite($this.options.defaultFavorite);
			} else if($this.options.favorite != null){
				$this.applyFavorite($this.options.favorite,false,true);
			}
		},

		clearFavorite :function(){
			return $si.applicationFavoriteUtil.clearApplicationFavorite(this.options.defaultFavorite);
		},

		//TODO move to favorite util
		getWindowStyles :function(){
 			return {
 					windowAttributes:{
   							width   : "270px",
                  			height  : "auto",
                    		position: {
                      		  top     : "0px",
                      		  left    : "5px"
                		    },
 						}
 					};
 		},

	});
});