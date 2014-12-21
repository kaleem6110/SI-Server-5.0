/**
 * Application Header
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($) {
	$.widget('spacetimeinsight.siViewerApplicationHeader',$.spacetimeinsight.siViewerBaseWidget,{
		options : {
			applicationToolBarWidget   : "siViewerApplicationToolBar",
			applicationToolBarWidgetJS : "viewer/com.spacetimeinsight.viewer.ui.applicationToolBar",
			applicationTools			: ["FAVORITE","SPACER","SETTINGS","SPACER","ALERT","SPEAKER","TIME"],
		},

		//Application is not extensible.
		APPLICATION_TITLE_WIDGET 	   : "siViewerApplicationTitleBar",
		APPLICATION_TITLE_WIDGET_JS   : "viewer/com.spacetimeinsight.viewer.ui.applicationTitleBar",

		pluginName : "siViewerApplicationHeader",

		CONTENT_DIV : kendo.template("<div id='#=cssClass#' class='#=cssClass#'> </div>"),

		_create : function(){
			var $this = this;
			this._super();
			$(this.element).addClass("app-header");

		},
		_createControls : function(){
			this._super();
			this._createTitleBar();
			this._createToolBar();
		},
		_createTitleBar : function(){
			var $this = this;

			if(this.APPLICATION_TITLE_WIDGET && this.APPLICATION_TITLE_WIDGET_JS){
				requirejs([this.APPLICATION_TITLE_WIDGET_JS],function(){
						$($this.element).append($this.CONTENT_DIV({cssClass : "si-viewer-app-title"}));
						$this.options.applicationTitle = $($this.element).find(".si-viewer-app-title");
						$this.options.applicationTitle.addClass("app-header-titlebar");
						$this.options.applicationTitle[$this.APPLICATION_TITLE_WIDGET]();
						$si.Logger('Application Header').info("Application Title Bar is created.");
						$this._trigger("onApplicationTitleBarCreateComplete");
				});
			}
		},


		_createToolBar : function(){
			var $this = this;

			if(this.options.applicationToolBarWidget && this.options.applicationToolBarWidgetJS){
				requirejs([this.options.applicationToolBarWidgetJS],function(){
						$($this.element).append($this.CONTENT_DIV({cssClass : "si-viewer-app-toolbar"}));
						$si.viewer.applicationToolBar = $($this.element).find(".si-viewer-app-toolbar");
						$si.viewer.applicationToolBar[$this.options.applicationToolBarWidget]({
												tooltip 	: $si.i18N.Application.tooltip,
												parentId	: 'htmlViewer',
												windowTools : $this.options.applicationTools,
										});
						$si.viewer.applicationToolBarWidget= $this.options.applicationToolBarWidget;
						$si.Logger('Application Header').info("Application Tool Bar is created.");
						$this._trigger("onApplicationToolBarCreateComplete");
						//$this._trigger("onApplicationHeaderCreateComplete");
				});
			}
		},

		getHeaderFavoriteDetails : function() {
			var $this = this;
			$si.Logger('favorite').debug("get application header favorite "  );	
			var speakerTool = $(this.element).find("#speakerTool");
			var isEnable = speakerTool.hasClass("alarm-disabled");
			var toolBarState = true;
			var toolbar = $this.element.parent().find("#si-viewer-app-toolbar");
			if(toolbar.css("display") == "none"){			
				toolBarState = false;
			}
			
			var toolBarFavorite = {
									toolBar:toolBarState,
									speaker:isEnable
								  };
			return toolBarFavorite;
		},
		
		
		applyHeaderFavorite : function(favorite) {
			$si.Logger('favorite').debug("applying application header favorite "  );	
			$si.viewer.applicationToolBar[this.options.applicationToolBarWidget]('enableAudioAlarm',favorite.speaker)
			var toolbar = this.element.parent().find("#si-viewer-app-toolbar");
			if(favorite.toolBar === true){
				toolbar.css("display","block");
			} else {
				toolbar.css("display","none");
			}
		},
		
		resetHeaderFavorite : function() {
				$($si.viewer.applicationToolBar)[this.options.applicationToolBarWidget]("removeIconFromSelectedItem");
				$($si.viewer.applicationToolBar)[this.options.applicationToolBarWidget]("enableClearOption",false);
				$($si.viewer.applicationToolBar)[this.options.applicationToolBarWidget]("enableUpdateOption",false);	
		},

	});
});