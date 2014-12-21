define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'window/com.spacetimeinsight.viewer.window.baseWindow',
],function($){

	$.widget('spacetimeinsight.siViewerMeterChartWindow', $.spacetimeinsight.siViewerBaseWindow,{
		options : {
			windowAttributes:{
				width : "800px",
				height : "500px",

				position:{
					left		  : "300px",
					top           : "300px",
				},
			},
			toolBarOptions : ["TABLE","CHARTSELECTOR","LEGEND","CHARTDATALABEL","CHARTTITLE"],
			tableTools :[""],
			dataProvider  	: 	"",
			configuration 	:	"",
			 windowIcon     : "",
			 id:"tableDashboard",
		},

		pluginName:"siViewerMeterChartWindow",

		_create : function(){
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			this._super();
			var $this = this;

			/*$(this.element)[this.pluginName]().bind(this.pluginName.toLowerCase() + "_oncreationcomplete",function(){
				if($this.options.toolBar){
					$this.options.toolBar[$this.options.toolBarWidget]("addTools",["TABLE","CHARTSELECTOR","LEGEND","CHARTDATALABEL","CHARTTITLE"]);
				}
			});*/


		},

		windowToolClicked : function(toolId){
			var $this = this;
			$this._super(toolId);
		},

		_bindDrawerEvents:function(e,data){
    		var $this = this;
    		this._super();
			$this.options.drawer[$this.options.drawerWidget]().bind($this.options.drawerWidget.toLowerCase()+"_applytabledrawersettings",function(event,data){
			});
		}

	});
});