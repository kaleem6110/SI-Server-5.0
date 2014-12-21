/**
 * Application Footer
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($) {
	$.widget('spacetimeinsight.siViewerApplicationFooter',$.spacetimeinsight.siViewerBaseWidget,{
		options : {
			applicationTaskBarWidget   : "siViewerApplicationTaskBar",
			applicationTaskBarWidgetJS : "viewer/com.spacetimeinsight.viewer.ui.applicationTaskBar",
		},

		pluginName : "siViewerApplicationFooter",

		CONTENT_DIV : kendo.template("<div id='#=cssClass#' class='#=cssClass#'> </div>"),

		_create : function(){
			this._super();
		},
		_createControls : function(){
			this._super();
			this._createTaskBar();
		},
		_createTaskBar : function(){
			var $this = this;

			if(this.options.applicationTaskBarWidget && this.options.applicationTaskBarWidgetJS){
				requirejs([this.options.applicationTaskBarWidgetJS],function(){
						$($this.element).append($this.CONTENT_DIV({cssClass : "si-viewer-app-taskbar"}));
						$this.options.applicationTaskBar = $($this.element).find(".si-viewer-app-taskbar");
						$this.options.applicationTaskBar[$this.options.applicationTaskBarWidget]();
						$si.Logger('Application Footer').info("Application Task Bar is created.");
						//$this._trigger("onApplicationTaskBarCreationComplete");
						$this._trigger("onApplicationFooterCreationComplete");
				});
			}
		},

	});
});