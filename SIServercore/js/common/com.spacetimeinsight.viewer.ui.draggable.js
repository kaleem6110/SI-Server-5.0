/**
 * This ComboBox is extended with jquery draggable.
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($){

	$.widget('spacetimeinsight.siDraggable',$.spacetimeinsight.siViewerBaseWidget,{
		options : {
			 	shimRequired	: false,
		},
		pluginName:"siDraggable",
		
		IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),
		
		_create : function(){
			this._super();
		},
		
		_createControls : function(){
			if(this.options.shimRequired){
				$(this.element).prepend(this.IFRAME_CONTAINER({id : this.options.id}));
			}
			$(this.element).draggable(this.options);
		},
		
		_bindControls : function(){
			//do nothing
		},

	});

});