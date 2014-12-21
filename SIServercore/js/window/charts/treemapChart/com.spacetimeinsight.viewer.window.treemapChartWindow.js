define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'window/com.spacetimeinsight.viewer.window.baseWindow',
    'jtreemap',
],function($){

	$.widget('spacetimeinsight.siViewerTreemapWindow', $.spacetimeinsight.siViewerBaseWindow,{
		options : {
			windowAttributes:{
				width : "800px",
				height : "500px",

				position:{
					left		  : "300px",
					top           : "300px",
				},
			},
			toolBarOptions : ["TABLE","CHARTDATALABEL","CHARTTITLE"],
			tableTools :[""],
			dataProvider  	: 	"",
			configuration 	:	"",
			 windowIcon     : "",
			 id:"tableDashboard",
		},

		pluginName:"siViewerTreemapWindow",
	    TEMPLATE			:	kendo.template("<div id ='#= id #_outerContainer' class='chart-splitter' ><div id ='#= id #_chartContainer' class='custom-top-pane'><div id ='treemaptitle' style='text-align:center;'> </div><div id ='treemapsubtitle' style='text-align:center;'> </div><div id ='treemap' class = 'chart-area meter-chart-area' > </div>  <div id='mouseoverbox'  class='mouseoverbox' > </div><div style='clear:both'></div></div><div id='#= id #_tableContainer' style='position: relative' class = 'custom-bottom-pane'><div id='#= id #_gridContainer' class = 'grid-container'></div></div></div> "),

		_create : function(){
			this._super();
			var $this = this;
		},
		  _createControls : function(){
        	var $this = this;
        	var outerContainer = $(this.element).find("#" + this.options.id + "_outerContainer");
        	this._super();
			$(this.element).addClass("chart-window");
			$(this.element).width("100%");
			if(outerContainer && outerContainer.length == 0){

			$(this.element).append(this.TEMPLATE({id : this.options.id }));

			outerContainer = $(this.element).find("#" + this.options.id + "_outerContainer");
			this.options.chartContainer =  outerContainer.find("#" + this.options.id + "_chartContainer");
			this.options.hightChartContainer = this.options.chartContainer.find("#treemap");
			//this.options.legendContainer = this.options.chartContainer.find("#" + this.options.id + "_legendContainer");
			this.options.tableContainer = outerContainer.find("#" + this.options.id + "_tableContainer");
			//display at center
			$(this.element).data("kendoWindow").center();
        	this._divideChartTable();
          }
        },

        _divideChartTable : function(){
			var $this = this;
			var remainSize="";

			var tableSize=this.options.windowConfig.chartTable.tableSize;
			if( tableSize == -1 ){
			  tableSize="50%";
			  remainSize="50%";
			}else{
			  tableSize=this.options.windowConfig.chartTable.tableSize+"%";
			  remainSize = 100 - parseInt(tableSize);
			  remainSize =parseInt(remainSize)+"%";
	     	}
			$((this.element).find("#" + this.options.id + "_outerContainer")).kendoSplitter({
		        orientation: "vertical",
		        panes: [
		            { collapsible: false, resizable: true,size :remainSize},
		            { collapsible: false, resizable: true,size :tableSize}
		        ],
		        layoutChange: function(e){
					$this._contentChange();
			},
		    });
		},

			_contentChange: function(){
			var $this = this;
			var chartHeight = this.options.chartContainer.height();
			var outerHeight = $(this.element).find("#" + this.options.id + "_outerContainer").height();
			var tableHeight = outerHeight - chartHeight;

			if($this.options.windowConfig.chartTable.showTable){
				if($this.options.windowConfig.chartTable.tableSize > 0){
					 var tableHeight = (parseFloat(this.options.tableContainer[0].style.height) * $this.options.windowConfig.chartTable.tableSize)/100;
			         $(this.options.tableContainer).css("height",tableHeight);
				}else{
					this.options.tableContainer.height = tableHeight;
				}
			}
			if($this.options.dataProvider.children){
				this._createChart();
			}
			if($this.options.grid){
			$this.options.grid.reDraw();
			$this.options.grid.rebuild();
			}
		},

			_onDrawerCreationComplete : function(e,data){
    		var $this = this;
    		this._super();
   			this._applyDrawerConfigration();
			$this.options.drawer[$this.options.drawerWidget]().bind($this.options.drawerWidget.toLowerCase()+"_applydrawersettings",function(event,data){
				$this._applyDrawerSettings(data);
			});
    	},

    	_applyDrawerConfigration : function() {

    	},

    	_applyDrawerSettings : function(data){
    		//overridden method
    	},
		applyWindowData : function(windowData){
			//console.log(windowData);
			var $this = this;
			this.options.dataProvider = this.options.windowData;
			this._createChart();


			this._createTableWindow();

				if(this.options.windowConfig && this.options.windowConfig.chartTable){
				if(this.options.windowConfig.chartTable.showTable){
					this.showTable();
				} else{
					this.hideTable();
				}
			}

			if(this.options.windowConfig.chartSeries.defaultSeriesProperties.dataLabels.enabled){
				this.showHideDataLabelsTool(true);
			}else{
				this.showHideDataLabelsTool(false);
			}
		},
		showTable: function(){
			var $this = this;
			this.options.tableContainer.show();
			this.options.chartContainer.addClass("height-remove");
			this.options.chartContainer.removeClass("height-add");
			$(".k-splitbar").css("display","block");
			this.options.tableClass = "height-add";

			var tableTool = $(this.element).closest('.k-window').find("#tableTool");
			if(tableTool.hasClass("chart-table-off")){
				tableTool.removeClass("chart-table-off");
			}
			var title = $si.i18N.Window.tooltip.tableoff;
			if(!tableTool.hasClass("table-icon")){
				tableTool.addClass("table-icon");
			}
			tableTool.attr('title',title);

			//$.each($this.options.charts, function(index, chart){
				//chart.reflow();
			//});

			var gridContainer = $(this.options.tableContainer).find("#" + this.options.id + "_gridContainer");
			$((this.element).find("#" + this.options.id + "_outerContainer")).data("kendoSplitter").trigger("resize");
			var grid =gridContainer[0].component;
			if(grid){
				grid.reDraw();
				grid.rebuild();
			}
		},

		hideTable: function(){
			var $this = this;
			this.options.tableContainer.toggle();
			if(this.options.chartContainer.hasClass("height-remove")){
				this.options.chartContainer.removeClass("height-remove");
				this.options.chartContainer.css("border","none");
				$(".k-splitbar").css("display","block");
				this.options.tableClass = "height-remove";
			}
			this.options.chartContainer.addClass("height-add");
			$(".k-splitbar").css("display","none");
			if($this.options.toolBar){

				var tableTool =$this.options.toolBar[$this.options.toolBarWidget]().find("#tableTool");
				if(tableTool.hasClass("table-icon")){
					tableTool.removeClass("table-icon");
				}
				var title = $si.i18N.Window.tooltip.table;
				tableTool.addClass("chart-table-off");
				tableTool.attr('title',title);
				$((this.element).find("#" + this.options.id + "_outerContainer")).data("kendoSplitter").trigger("resize");
				//$this.options.chart.reflow();
			}
		},

		showHideDataLabelsTool: function(flag){
			var toolbar = this.options.toolBar;
			if(toolbar){
				var chartDataLabelTool = toolbar.find('#chartdatalabelTool');
				if(flag){
					chartDataLabelTool.removeClass('chart-data-label-off');
					chartDataLabelTool.addClass('chartdatalabel-icon');
					chartDataLabelTool.attr('title',$si.i18N.Window.tooltip.chartdatalabel);
				}
				else{
					chartDataLabelTool.addClass('chart-data-label-off');
					chartDataLabelTool.removeClass('chartdatalabel-icon');
					chartDataLabelTool.attr('title',$si.i18N.Window.tooltip.chartdatalabeloff);
				}
			}
		},
		toggleTable : function(){
			if(this.options.chartContainer.hasClass("height-add")){
				this.showTable();
			}else{
				this.hideTable();
			}
		},
		toggleDataLabels: function(){
			var $this = this;
			var chartDataLabelTool = this.element.parent().find("#chartdatalabelTool");
			if(chartDataLabelTool.hasClass("chartdatalabel-icon")){
				chartDataLabelTool.removeClass("chartdatalabel-icon");
				chartDataLabelTool.addClass("chart-data-label-off");

				chartDataLabelTool.attr('title',$si.i18N.Window.tooltip.chartdatalabeloff);
			}else{
				chartDataLabelTool.removeClass("chart-data-label-off");
				chartDataLabelTool.addClass("chartdatalabel-icon");

				chartDataLabelTool.attr('title',$si.i18N.Window.tooltip.chartdatalabel);
			}
		},
		toggleChartTitle: function(){
			var $this =this;
			var chartTitleTool = $(this.element).closest('.k-window').find("#charttitleTool");
			if(chartTitleTool.hasClass("chart-title-off") ){
			 	$this.showChartTitle();
			} else {
				$this.hideChartTitle();
			}
		},
		
		hideChartTitle: function(){
			var $this = this;
			var title,subTitle;
			var chartTitleTool = $(this.element).closest('.k-window').find("#charttitleTool");
			chartTitleTool.removeClass("charttitle-icon");
			 if(!chartTitleTool.hasClass("chart-title-off") ){
				 chartTitleTool.addClass("chart-title-off");
			 }
			title ="";
			subTitle= "";
			
			chartTitleTool.attr('title',$si.i18N.Window.tooltip.charttitleoff);
			if($this.options.windowConfig.chartDetails.title.text){
		     this.options.chartContainer.find('#treemaptitle').text(title);
			}
			if($this.options.windowConfig.chartDetails.subtitle.text){
		     this.options.chartContainer.find('#treemapsubtitle').text(subTitle);
			}
			
		},
		
		showChartTitle: function(){
			var $this = this;
			var chartTitleTool = $(this.element).closest('.k-window').find("#charttitleTool");
			var title = this.options.windowConfig.chartDetails.title;
			var subTitle = this.options.windowConfig.chartDetails.subtitle;
			if(chartTitleTool.hasClass("chart-title-off")){
				chartTitleTool.removeClass("chart-title-off");
			}
			if(!chartTitleTool.hasClass("charttitle-icon") ){
				 chartTitleTool.addClass("charttitle-icon");
			 }
			chartTitleTool.attr('title',$si.i18N.Window.tooltip.charttitle);	
			if($this.options.windowConfig.chartDetails.title.text){
		     this.options.chartContainer.find('#treemaptitle').text(title.text);
			}
			if($this.options.windowConfig.chartDetails.subtitle.text){
		     this.options.chartContainer.find('#treemapsubtitle').text(subTitle.text);
			}		
			
		},
		

		resizeWindow : function(event) {
			var $this = this;
			this._super();
			$((this.element).find("#" + this.options.id + "_outerContainer")).data("kendoSplitter").trigger("resize");
			if($this.options.dataProvider.children){
				this._createChart();
			}
			if($this.options.grid === null){
				var gridContainer = $(this.element).find("#" + this.options.id + "_gridContainer");
				$this.options.grid =gridContainer[0].component;
			}
			$this.options.grid.reDraw();
			$this.options.grid.rebuild();

		},
		onWindowToolControlClick : function(toolId){
			var $this = this;
			$si.viewer.windowParams = windowParams;

			if(toolId == "tableTool"){
				this.toggleTable();
			}else if(toolId == "chartdatalabelTool"){
				this.toggleDataLabels();
			}else if(toolId == "charttitleTool"){
				this.toggleChartTitle();
			}else	if(toolId == "saveasTool"){
				$this.options.exportToCSVWindow = $si.windowUtil.openExportCSVWindow('treemapChart','500','200');
			} else
			$this._super(toolId);
		}

	});
});