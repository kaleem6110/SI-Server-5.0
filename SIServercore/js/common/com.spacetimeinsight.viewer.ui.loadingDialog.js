define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($) {
	$.widget('spacetimeinsight.siViewerLoadingDialog',$.spacetimeinsight.siViewerBaseWidget,{
		
		options : {
			windowAttributes : {
				width	: 200,
				height  : 130,
			},
			dailogTitle : "",
		},
		
		pluginName : "siViewerLoadingDialog",
		
		_create : function(){
			this._super();
			this.element.parent().css("z-index","9000002");
			$(".k-overlay").css("z-index","9000001");
		},
		
		LOADING_IMG : kendo.template("<div class='viewer-loading'><span class='viewer-loading-img'>"
				+"<img class='viewer-loading-icon' src='images/sti_viewer_preloader.gif'></img> </span>"
				+"<span class='viewer-loading-text'></span></div>"),

	
		_createControls : function(){
			var $this = this;
			this._super();
			$(this.element).append(this.LOADING_IMG({}));
			
			$(this.element).addClass("loading-dialog")
			
			$(this.element).kendoWindow($.extend({},this.options.windowAttributes,{
				modal : true,
				actions : [],
				title : $this.options.dailogTitle,
				resizable : false,
				draggable: false,
			}));
			$(this.element).data("kendoWindow").title(false);
			$(this.element).data("kendoWindow").center();
			$(this.element).parent(".k-window").addClass("w-loading")
		},
		
		closeDialog : function(){
			$(this.element).data("kendoWindow").destroy();
		},
		
	});
});