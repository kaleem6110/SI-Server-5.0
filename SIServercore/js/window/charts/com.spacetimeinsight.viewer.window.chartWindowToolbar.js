define([
    'jquery',
    'jquery-ui',
    'kendo',
    'window/com.spacetimeinsight.viewer.window.baseWindowToolbar',
    
],function($){

	$.widget('spacetimeinsight.siViewerChartWindowToolBar',$.spacetimeinsight.siViewerBaseWindowToolBar,{
		pluginName:"siViewerChartWindowToolBar",

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
		var $this = this;
		var commonTools =$this._super();
		
		var chartTools = {
			chartdatalabelTool  : this._getToolClass("chartdatalabelTool"),
			charttitleTool 		: this._getToolClass("charttitleTool"),
			chartselectorTool  	: this._getToolClass("chartselectorTool"),	
			tableTool      		: this._getToolClass("tableTool"),
			legendTool      	: this._getToolClass("legendTool"),			
		};
			
		var	windowToolbar = {				
				"chartTools":chartTools,
				"commonTools" : commonTools,
			};
			
			$si.Logger('favorite').debug("get toolbar favorite "  );
				
			return windowToolbar;
		},

		applyToolBarFavoriteSettings : function(favorite) {
			var $this = this;			
			$this._super(favorite);
			$.map(favorite.chartTools, function (toolClass,toolId) {
			if(toolClass){
				if(toolClass.length>0 && $this.element.find("#"+toolId).length >0 ){
			            $this.element.find("#"+toolId)[0].className = toolClass;
			      }
			      
		     }       
			});		
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