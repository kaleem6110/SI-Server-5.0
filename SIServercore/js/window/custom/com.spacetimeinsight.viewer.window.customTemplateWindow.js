define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'custom/com.spacetimeinsight.i18N.customwindow',
    'custom/com.spacetimeinsight.i18N.customwindow.regional',
    'window/com.spacetimeinsight.viewer.window.baseWindow',
],function($){

	$.widget('spacetimeinsight.siViewerCustomTemplateWindow', $.spacetimeinsight.siViewerBaseWindow,{
		options : {
			//Change the options available on a tool bar
			footerRequired			: true,
		    tooltip 				: $si.i18N.Window.tooltip,
			shimRequired 			: true,
		},

		/* unique plugin name */
		pluginName:"siViewerCustomTemplateWindow",

		/* private methods - start */
		_create : function(){
			this._super();
			//create custom controls
		},

		_bindControls : function(){
			this._super();
			//Custom binding  to come here

		},

		applyWindowData : function(windowData) {
			//sub-classes should overwrite this function
		},

		getWindowContentFavoriteSettings: function(){
			//favorite configration
    	},


	    applyWindowContentFavoriteSettings: function(favorite){
	    	//apply favorite

	    }

	});
});