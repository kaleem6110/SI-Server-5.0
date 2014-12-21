define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'window/charts/com.spacetimeinsight.viewer.window.baseChartWindow',
],function($){

	$.widget('spacetimeinsight.siViewerRadarChartWindow', $.spacetimeinsight.siViewerBaseChartWindow,{
		options : {
			windowAttributes:{
				width : "800px",
				height : "500px",

				position:{
					left		  : "300px",
					top           : "300px",
				},
			},
			tableTools :[""],
			dataProvider  	: 	"",
			configuration 	:	"",
			 windowIcon     : "",
			 id:"tableDashboard",
		},

		pluginName:"siViewerRadarChartWindow",

		_create : function(){
			this._super();
			var $this = this;





		},

		windowToolClicked : function(toolId){
			var $this = this;
			$this._super(toolId);
		}

	});
});