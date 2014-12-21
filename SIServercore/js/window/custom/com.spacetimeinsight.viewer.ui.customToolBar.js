define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.windowToolBar',
    'siDropDownList'
],function($){

	$.widget('spacetimeinsight.siViewerCustomToolBar',$.spacetimeinsight.siViewerWindowToolBar,{
		pluginName:"siViewerCustomToolBar",

		_create : function(){
			//this will call create method of super.
			this._super();
			//Custom code to come here
		},
		_createControls : function(){
			this._super();
			//Custom code to come here

			//addCustomTool to add custom tools

		},

		_bindControls : function(){
			//Custom bindings to come here

		},

		onWindowToolControlClick : function(toolId){
			this._super();
			//Any Custom specific binding to come here
		},

		getToolBarFavoriteSettings : function() {
			$si.Logger('favorite').debug("get toolbar favorite "  );
			return {};
		},

		applyToolBarFavoriteSettings : function(favorite) {
			$si.Logger('favorite').debug("applying toolbar favorite "  );
		},



	});
});