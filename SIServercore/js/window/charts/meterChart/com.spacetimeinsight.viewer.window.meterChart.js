define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'highchart',  
    'highchart-more', 
    'highcharts-solid-gauge',
    'siViewerNamespace',
    'window/charts/meterChart/com.spacetimeinsight.viewer.window.meterbaseChartWindow'
],function($){

	$.widget('spacetimeinsight.siViewerMeterChart',$.spacetimeinsight.siMeterBaseChartWindow,{
		options : {
			dataProvider  	: 	"",
			id              :undefined,
		},
		
		pluginName:"siViewerMeterChart",
		GENERIC_COMPONENT : kendo.template("<div id ='#= id #'  > </div>"),
		meterChart :'',
		showLabels :true,
		
		_create : function(){
			this._super();
			this.chartTypeDropDownData = [];
		},
		
		_bindControls: function () {
            this._super();
            //Any Specific drawer function to come here
        },
		
	
		_createChart :function(){
		
			var $this = this;
			$this._super();
			$this.options.charts = [];
			var chartData = $this.options.dataProvider;
			for(var i=0; i<chartData.meterChartSubData.length; i++) {
				if(chartData.meterChartSubData[i].chartType == "gauge") {
					$this._setChartOptions(i, chartData.meterChartSubData[i]);
					//console.log(JSON.stringify($this.optionsChart));
					$this.options.charts.push(new Highcharts.Chart($this.optionsChart));
				} else {
					$this._setSolidGaugeProperties(i, chartData.meterChartSubData[i]);
					$this.options.charts.push(new Highcharts.Chart(Highcharts.merge($this.solidGaugeCommonOptions, $this.optionsChart)));
				}
			}
		},
		
		_createTableWindow : function(){
			var $this = this;
			var parentId = $this.options.id;
			var gridColumn;
			var gridContainer = $(this.element).find("#" + parentId + "_gridContainer");
			this.options.chartInfoGrid = new flexiciousNmsp.FlexDataGrid(gridContainer[0], { id:'chartInfoGrid', });
			this.options.grid =gridContainer[0].component;
			
			this.options.grid.rollOverColor = 0x8dcbe4;
            this.options.grid.textRollOverColor = 0xFFFFFF;
            this.options.grid.selectionColor = 0x2c95d2;
            this.options.grid.activeCellColor = 0x2c95d2;
            this.options.grid.alternatingItemColors = [0xE4EFFF, 0xF9F9F9];
            this.options.grid.fixedColumnFillColors[0] = 0xE4EFFF;
            this.options.grid.columnGroupColors[0] = 0xE4EFFF;
            this.options.grid.imagesRoot = $si.tableGridUtils.IMAGE_PATH;
            $si.viewer.meterChartColumnDetails =[];
            if($this.options.dataProvider.tableHeaders){
		//	seriesConfiguration=$this.options.dataProvider.tableHeaders;
			$si.viewer.meterChartColumnDetails = $this.options.dataProvider.tableHeaders;
			}
            
			var seriesConfiguration = ["needleName","needleValue"];
			var nameField = "chartTitle";
			
			var gridDataProvider = [];
			var gridDataProviderObj;
			$.each($this.options.dataProvider.meterChartSubData, function(index, chartData){
				$.each(chartData.seriesData, function(index, needleData){
					gridDataProviderObj = new Object();
					gridDataProviderObj.chartTitle = chartData.title;
					gridDataProviderObj.needleValue = needleData.data[0];
					gridDataProviderObj.needleName = needleData.name;
					gridDataProvider.push(gridDataProviderObj);
				});
			});
			this.options.grid.setDataProvider(gridDataProvider);
			this.options.grid.setHorizontalScrollPolicy("auto");
			this.options.grid.setColumnLevel(new flexiciousNmsp.FlexDataGridColumnLevel($this.options.grid));
			gridColumn = $si.tableGridUtils.DynamicColumns_addColumn(nameField,"Title");
			gridColumn.setColumnWidthMode("fitToContent");
			gridColumn.columnWidthModeFitToContentExcludeHeader= true;
			this.options.grid.addColumn(gridColumn);
			$.each(seriesConfiguration,function(index,data){
				gridColumn = $si.tableGridUtils.DynamicColumns_addColumn(data,"Series" + (++index));
				gridColumn.setColumnWidthMode("fitToContent");
				gridColumn.columnWidthModeFitToContentExcludeHeader= true;
				$this.options.grid.addColumn(gridColumn);
			});
			this.options.grid.reDraw();
			this.options.grid.rebuild();
		},
		
		_setChartOptions: function (index, data) {
            var $this = this;
            $this.optionsChart = new Object();
            $this.optionsChart.title = new Object();
            $this.optionsChart.subtitle = new Object();
            $this.optionsChart.chart = new Object();
            $this.optionsChart.credits = new Object();
            $this.optionsChart.series = new Array();
            $this.optionsChart.pane = new Object();
            $this.optionsChart.pane.background = new Array();
            $this.optionsChart.plotOptions = new Object();
            $this.optionsChart.yAxis = new Object();
            $this.optionsChart.yAxis.labels = new Object();
            $this.optionsChart.yAxis.title = new Object();
            $this.optionsChart.yAxis.plotBands = new Object();
            $this.optionsChart.tooltip = new Object();
            $this._setChartProperties(index, data);
        },
		
        _setChartProperties: function (index, data) {
            //var chartProperties = this._getWindowConfigurationByProperty("chartProperties");
            var $this = this;
            
            $this.optionsChart.title.text = data.title;
            $this.optionsChart.subtitle.text = data.subtitle;
            
		    $this._setChartAttributes(index);
		    $this.optionsChart.credits.enabled = false;
		    $this._setBackgroundProperties();
            $this._setChartSeriesProperties(data);
            $this._setYAxisProperties(data);
        },
        
        _setChartAttributes: function(index) {
        	var $this = this;
        	$this.optionsChart.chart.type = 'gauge';
		    $this.optionsChart.chart.plotBackgroundColor = null;
		    $this.optionsChart.chart.plotBackgroundImage = null;
		    $this.optionsChart.chart.plotBorderWidth = 0;
		    $this.optionsChart.chart.plotShadow = false;
		    $this.optionsChart.chart.renderTo = $this.options.id + "_highchartContainer_"+index;
        },
        
        _setBackgroundProperties: function() {
        	var $this = this;
        	$this.optionsChart.pane.startAngle = -150;
		    $this.optionsChart.pane.endAngle = 150;
		    
		    var background1 = new Object();
		    background1.backgroundColor = new Object();
		    background1.backgroundColor.linearGradient = {x1: 0, y1: 0, x2: 0, y2: 1};
		    background1.backgroundColor.stops = [[0, '#FFF'],[1, '#333']];
		    
		    background1.borderWidth = 0;
		    background1.outerRadius = '109%';
		    
		    var background2 = new Object();
		    background2.backgroundColor = new Object();
		    background2.backgroundColor.linearGradient = {x1: 0, y1: 0, x2: 0, y2: 1};
		    background2.backgroundColor.stops = [[0, '#333'],[1, '#FFF']];
		    
		    background2.borderWidth = 1;
		    background2.outerRadius = '107%';
		    
		    var background3 = {};
		    
		    var background4 = new Object();
		    background4.backgroundColor = '#DDD';
		    background4.borderWidth = 0;
			background4.outerRadius = '105%';
			background4.innerRadius = '103%';
			
		    $this.optionsChart.pane.background.push(background1);
		    $this.optionsChart.pane.background.push(background2);
		    $this.optionsChart.pane.background.push(background3);
		    $this.optionsChart.pane.background.push(background4);
        },
        
        _setChartSeriesProperties: function(data){
        	var windowConfiguration = this.options.windowConfig;
        	this.optionsChart.series = data.seriesData;
        	this.optionsChart.plotOptions= {
												gauge: {
												    dataLabels: {
												    	borderWidth: 1,
												        enabled: windowConfiguration.chartSeries.defaultSeriesProperties.dataLabels.enabled ? true : false,
												        useHTML: true
												    }
												}
									       };
        },
        
        _setYAxisProperties: function(data){
        	var $this = this;
        	$this.optionsChart.yAxis.min = data.min;
            $this.optionsChart.yAxis.max = data.max;
            $this.optionsChart.yAxis.minorTickInterval = 'auto';
            $this.optionsChart.yAxis.minorTickWidth = 1;
            $this.optionsChart.yAxis.minorTickLength = 10;
            $this.optionsChart.yAxis.minorTickPosition = 'inside';
            $this.optionsChart.yAxis.minorTickColor = '#666';
            $this.optionsChart.yAxis.tickPixelInterval = 30;
            $this.optionsChart.yAxis.tickWidth = 2;
            $this.optionsChart.yAxis.tickPosition = 'inside';
            $this.optionsChart.yAxis.tickLength = 10;
            $this.optionsChart.yAxis.tickColor = '#666';
            $this.optionsChart.yAxis.labels.step = 2;
            $this.optionsChart.yAxis.labels.rotation = 'auto';
            $this.optionsChart.yAxis.title.text = data.units;
            $this.optionsChart.yAxis.plotBands = data.plotBands;
        },
        
        _setSolidGaugeProperties: function(index, data) {
        	var $this = this;
        	var windowConfiguration = this.options.windowConfig;
        	$this.solidGaugeCommonOptions = {};
        	$this.solidGaugeCommonOptions.chart = { type : 'solidgauge' };
        	$this.solidGaugeCommonOptions.chart.renderTo = $this.options.id + "_highchartContainer_"+index;
        	
        	$this.solidGaugeCommonOptions.pane = {
													center: ['50%', '85%'],
													size: '100%',
													startAngle: -90,
													endAngle: 90,
													background: {
														backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
														innerRadius: '60%',
														outerRadius: '100%',
														shape: 'arc'
													}
												};

			$this.solidGaugeCommonOptions.tooltip = { enabled: true };
			$this.solidGaugeCommonOptions.yAxis = {
													stops: [
														[0.1, '#55BF3B'], // green
														[0.5, '#DDDF0D'], // yellow
														[0.9, '#DF5353'] // red
													],
													lineWidth: 1,
													//minorTickInterval: 'auto',
													//tickPixelInterval: 50,
													tickWidth: 1,
													minorTickWidth: 1,
													title: {
														y: -70
													},
													labels: {
														y: 16
													}
												};

			$this.solidGaugeCommonOptions.credits= { enabled: false };

			$this.solidGaugeCommonOptions.plotOptions = {
															solidgauge: {
																dataLabels: {
																	enabled: windowConfiguration.chartSeries.defaultSeriesProperties.dataLabels.enabled ? true : false,
																	y: -10,
																	borderWidth: 1,
																	useHTML: true
																}
															}
														};
			$this.optionsChart = {};
			$this.optionsChart.title = {text : data.title};
			$this.optionsChart.subtitle = {text : data.subtitle};
			$this.optionsChart.yAxis = {};
			$this.optionsChart.yAxis.min = data.min;
			$this.optionsChart.yAxis.max = data.max;
			$this.optionsChart.series = data.seriesData;
		},
		
		getWindowContentFavoriteSettings: function () {
            var chartFavoriteConfig = {};
            var charts= this.options.charts;
        	var chartDataLabelTool = this.element.parent().find("#chartdatalabelTool");
        	var dataLabelState = chartDataLabelTool.hasClass("chart-data-label-on") ? true : false;
            chartFavoriteConfig.showDataLabels = charts[0].series[0].options.dataLabels.enabled;
            chartFavoriteConfig.showTable = this.options.chartContainer.hasClass("height-remove") ? true : (!this.options.chartContainer.hasClass("height-add") ? true : false);
            return chartFavoriteConfig;
        },
        
        applyWindowContentFavoriteSettings: function (favDataObj) {
        	/*if(favDataObj.showChartTitle){
				this.showChartTitle();
			} else {
				this.hideChartTitle();
			}*/
			this.options.windowConfig.chartSeries.defaultSeriesProperties.dataLabels.enabled = favDataObj.showDataLabels;
        	this.options.windowConfig.chartTable.showTable = favDataObj.showTable;
        },
		
		_applyDrawerConfigration: function () {
            var $this = this;
            var confData = $this.options.windowConfig;
            $this.options.drawer[$this.options.drawerWidget]("setHideColumnList", confData);
        },
        
		_applyDrawerSettings: function(settings) {
			var $this = this;
			var title,subtitle;
			$.each($this.options.charts, function(index, chart){
				title = '';
				subtitle = '';
				if(settings.data.plotTitlesCheckbox) {
					title = $this.options.dataProvider.meterChartSubData[index].title == undefined ? '' : $this.options.dataProvider.meterChartSubData[index].title;
					subtitle = $this.options.dataProvider.meterChartSubData[index].subtitle == undefined ? '' : $this.options.dataProvider.meterChartSubData[index].subtitle;
				}
				chart.setTitle({ text: ''+ title}, { text: ''+ subtitle});
				
				if(settings.data.plotMajorTicksCheckbox){
                	chart.yAxis[0].update({tickWidth: 2});
                	//chart.yAxis[0].options.tickWidth = 2;
                } else {
                	chart.yAxis[0].update({tickWidth: 0});
                	//chart.yAxis[0].options.tickWidth = 0;
                }
                
                if(settings.data.plotMinorTicksCheckbox){
                	//chart.yAxis[0].options.minorTickWidth = 1;
                	chart.yAxis[0].update({minorTickWidth: 1});
                } else {
                	//chart.yAxis[0].options.minorTickWidth = 0;
                	chart.yAxis[0].update({minorTickWidth: 0});
                }
                //chart.redraw();
			});
		},
		
		toggleDataLabels: function(){
			this._super();
			var charts = this.options.charts;
			var isEnabled;
			var chartOptions = charts[0].series[0].options;
			isEnabled = chartOptions.dataLabels.enabled;
			if(isEnabled){
				this.showHideDataLabels(false);
			} else {
				this.showHideDataLabels(true);
			}
		},

		showHideDataLabels: function(flag){
			var charts = this.options.charts;
			var chartOptions;
			if(flag != undefined) {
				$.each(charts, function(index, chartData){
					$.each(chartData.series, function(i, seriesData){
						chartOptions = seriesData.options;
						chartOptions.dataLabels.enabled = flag;
						chartData.series[i].setOptions(chartOptions);
						chartData.series[i].update();
					});
				});
			}
		},
		
		windowToolClicked : function(toolId){
			var $this = this;
			$this._super(toolId);
		}
	
	
});
});