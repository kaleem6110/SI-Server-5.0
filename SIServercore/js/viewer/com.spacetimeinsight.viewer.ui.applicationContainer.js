/**
 * Application Container
 */

define([
    'viewerPlugin/com.spacetimeinsight.viewer.baseBusinessViewListener',
],function() {
	$.widget('spacetimeinsight.siViewerApplicationContainer',{
		options : {
			businessViewWidget		 : "siViewerBusinessView",
			businessViewWidgetJS	 : "businessView/com.spacetimeinsight.viewer.ui.businessView",

			viewerPlugin			 : "siViewerNoMap",
			viewerPluginJS			 : "map/com.spacetimeinsight.viewer.ui.noMap",

		},

		pluginName : "siViewerApplicationContainer",

		CONTENT_DIV : kendo.template("<div id='#=cssClass#' class='#=cssClass#'> </div>"),

		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");

			this._createBusinessView();
			//check for right place
			this._trigger("onApplicationContainerCreationComplete");
		},

		_createBusinessView : function(){
			var $this = this;
			$si.viewer.businessViewWidget = $this.options.businessViewWidget;

			if(this.options.businessViewWidget && this.options.businessViewWidgetJS){
				requirejs([this.options.businessViewWidgetJS],function(){
						$($this.element).append($this.CONTENT_DIV({cssClass : "si-viewer-business-view"}));
						$this.options.businessView = $($this.element).find(".si-viewer-business-view");
						$this.options.businessView[$this.options.businessViewWidget](
								{
									shimRequired : true,
								});
						$si.Logger('Application Container').info("Business View is created.");
						$this._initializeViewerPlugin();
						//Find right position for this event
						$this._trigger("onBusinessViewCreateComplete");
				});
			}
		},
		
		_loadCustomJS:function(){
			var $this = this;
			requirejs([this.options.customJS],function(){
						$si.Logger('Application Container').info(' custom JS -'+$this.options.customJS + '-loaded ');
				});
		},

		_createViewerPlugin : function(){
			var $this = this;
			if($si.viewer.viewerPlugin && this.options.viewerPluginJS){
				requirejs([this.options.viewerPluginJS],function(){
						var cssClass = "si-viewer-" + $si.viewer.viewerPlugin.toLowerCase();
						$($this.element).append($this.CONTENT_DIV({cssClass : cssClass}));
						$this.options.viewerPluginObj = $($this.element).find("." + cssClass);
						$this.options.viewerPluginObj[$si.viewer.viewerPlugin]({
									windowTools : ["FAVORITE","SPACER","PRINT"],
									enableClose : false,
							});
						$si.Logger('Application Container').info("Viewer plugin is created.");
						//Find right position for this event
						$this._trigger("onViewerPluginCreateComplete");
				});
			}
		},

		_createNoUIViewerPlugin : function() {
			var $this = this;
			if($si.viewer.viewerPlugin && this.options.viewerPluginJS){
				requirejs([this.options.viewerPluginJS],function(){
						$.spacetimeinsight.noMap.initialize();
						$si.Logger('Application Container').info("Viewer plugin is created.");
						//Find right position for this event
						$this._trigger("onViewerPluginCreateComplete");
				});
			}
		},

		_initializeViewerPlugin : function() {
			if($si.viewer.selectedModuleModel.selectedModule.moduleParams) {
				var params = $si.viewer.selectedModuleModel.selectedModule.moduleParams.split("&");

				for (var i = 0; i < params.length; i++)
				{
				 	var tmp = params[i].split("=");
				 	if(tmp[0] === "viewerPlugin") {
				 		$si.viewer.viewerPlugin =  unescape(tmp[1]);
				 	} else if (tmp[0] === "viewerJS") {
						this.options.viewerPluginJS = unescape(tmp[1]);
				 	} else if (tmp[0] === "isUIPlugin") {
						this.options.isUIPlugin = unescape(tmp[1]);
				 	}else if (tmp[0] === "customJS") {
						this.options.customJS = unescape(tmp[1]);
				 	}
				}
				if(!this.options.isUIPlugin || this.options.isUIPlugin == "true") {
					this._createViewerPlugin();
				} else {
					this._createNoUIViewerPlugin();
				}
				if(this.options.customJS) {
					this._loadCustomJS();
				}
			}
		},


	});
});