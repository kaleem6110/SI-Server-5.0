/**
 *
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($) {
	$.widget('spacetimeinsight.siViewerBaseWidget',{

		pluginName : "siViewerBaseWidget",

		_create : function(){
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");

			var $this = this;
			$.each(this.options,function(key,value){
				if($.isArray(value)){
					$this.options[key] = $.merge([],value);
				}else if($.isPlainObject(value)){
					$this.options[key] = $.extend({},value);
				}
			});

			this._createControls();

			this._bindControls();
		},

		_createControls : function(){
			//do nothing
		},

		_bindControls : function(){
			//do nothing
		},

		refresh : function() {
			// do nothing
		},
	});
});