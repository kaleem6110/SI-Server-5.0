define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($) {
	$.widget('spacetimeinsight.siViewerShimWindow',$.spacetimeinsight.siViewerBaseWidget,{
		options : {
		},

		IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),
		pluginName:"siViewerShimWindow",

		_create : function(){
			this._super();
		},
		
		_createControls : function(){
			this._super();
			//making sure call is from window component
			if(this.options.shimRequired){
				var windowDiv = $(this.element).parent(".k-widget.k-window");
				if(windowDiv.length > 0){
					windowDiv.prepend(this.IFRAME_CONTAINER({"id":this.options.id}));
				}
			}
			this._trigger("onShimWindowCreationComplete",{id:this.options.id,domElement:$(this.element)});
		},
		
		_bindControls : function(){
			this._super();
		},

	});
});