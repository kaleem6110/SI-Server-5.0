define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.windowToolBar',
    
],function($){

	$.widget('spacetimeinsight.siViewerBaseWindowToolBar',$.spacetimeinsight.siViewerWindowToolBar,{
		pluginName:"siViewerBaseWindowToolBar",

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
			this._super();
		},

		onWindowToolControlClick : function(toolId){
			this._super();
			//Any Custom specific binding to come here
		},

		getToolBarFavoriteSettings : function() {
		
		
		var commonTools = {		
			filterTool : this._getToolClass("filterTool"),
			timecontrolTool : this._getToolClass("timecontrolTool"),
			autorefreshTool : this._getToolClass("autorefreshTool"),
		};
			
		
			
		
			$si.Logger('favorite').debug("get toolbar favorite "  );
			return commonTools;
		},

		applyToolBarFavoriteSettings : function(favorite) {
			var $this = this;
			if(favorite.commonTools) {
				$.map(favorite.commonTools, function (toolClass,toolId) {
					if(toolClass){
						if(toolClass.length>0 && $this.element.find("#"+toolId).length >0 ){
			            	$this.element.find("#"+toolId)[0].className = toolClass;
			      		}
			      	}
				});
			}
			$si.Logger('favorite').debug("applying toolbar favorite "  );
		},

		_getToolClass :function(toolId){
		
		 var $this = this;		
		 var tool = $this.element.find("#"+toolId);
		 if(tool && tool.length>0){
			return tool[0].className;
		 }
		 return false;
		 
		 
		},


	});
});