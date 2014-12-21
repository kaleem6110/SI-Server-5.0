define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.drawer',
    'window/com.spacetimeinsight.i18N.window',
    'window/com.spacetimeinsight.i18N.window.regional',
    'dialogBox',
],function($){

	$.widget('spacetimeinsight.siViewerCustomWindowDrawer',$.spacetimeinsight.siViewerDrawer,{
		options : {
			toggleDelay : 200,
			actionButtons	: ["Apply"],
			needTabStrip	: true,
			selected :  null,
		},
		pluginName:"siViewerCustomWindowDrawer",

		_create : function(){

			//this._trigger("onCreationComplete",{id:this.options.id,domElement:$(this.element)});

		},

	});