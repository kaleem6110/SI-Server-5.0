/**
 * 
 */

define([
	'jquery',
	'jquery-ui',
	'kendo',
	'common/com.spacetimeinsight.viewer.ui.window',
],function(){
	$.widget('spacetimeinsight.siViewerFooter',{
		options :{},
		pluginName:"siViewerFooter",
		
		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			
			$(this.element).addClass("sti-window-footer");
			this._trigger("onFooterCreationComplete",null,{element:this});
		},
		
	});
});