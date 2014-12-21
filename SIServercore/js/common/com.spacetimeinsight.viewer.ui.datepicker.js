define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($){

	$.widget('spacetimeinsight.siDatePicker',$.spacetimeinsight.siViewerBaseWidget,{
		options : {
			 	shimRequired	: false,
		},
		pluginName:"siDatePicker",
		
		IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),
		
		_create : function(){
			this._super();
		},
		
		_createControls : function(){
			this._super();
			$(this.element).kendoDatePicker(this.options);
			if(this.options.shimRequired){
				var dateViewDiv = $(this.element).data("kendoDatePicker").dateView.div;
				dateViewDiv.prepend(this.IFRAME_CONTAINER({id : this.options.id}));
			}
		},
		
		_bindControls : function(){
			this._super();
			//do nothing
		},

	});

});