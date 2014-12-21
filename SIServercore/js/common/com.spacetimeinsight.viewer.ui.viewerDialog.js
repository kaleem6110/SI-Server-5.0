define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($) {
	$.widget('spacetimeinsight.siViewerDialog',$.spacetimeinsight.siViewerBaseWidget,{
		
		options : {
			windowAttributes : {
				width	: 230,
				height  : 40,
			},
			dailogTitle : "",
			message     : "",
			dailogOptions : ["OK"],
		},
		
		pluginName : "siViewerDialog",
		
		_create : function(){
			this._super();
		},
		
		
		_createControls : function(){
			var $this = this;
			this._super();
			$(this.element).kendoWindow($.extend({},this.options.windowAttributes,{
				modal : true,
				actions : [],
				title : $this.options.dailogTitle,
				resizable : false,
				draggable: false,
			}));
			$(this.element).data("kendoWindow").center();
			
			//TODO Add Message
			//TODO Add Dialog Options
			
		},
		
		closeDialog : function(){
			$(this.element).data("kendoWindow").destroy();
		},
		
	});
});