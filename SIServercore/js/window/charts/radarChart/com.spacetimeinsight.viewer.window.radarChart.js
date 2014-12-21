define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'highchart',
    'highchart-more',
    'siViewerNamespace',
    'window/charts/com.spacetimeinsight.viewer.window.baseChartWindow',
],function($){

	$.widget('spacetimeinsight.siViewerRadarChart', $.spacetimeinsight.siViewerBaseChartWindow,{
		options : {
			chartType		: "line",
		},
		pluginName:"siViewerRadarChart",
		_create : function(){

			this._super();

			this.chartTypeDropDownData = [
					{ chartDisplayType: "Polar", chartType: "0" },
					//{ chartDisplayType: "Wind Rose", chartType: "1" },
			];
			var windowConfig = this.options.windowConfig
			if(windowConfig.chartDetails){
				this.options.windowConfig.showTitle = windowConfig.chartDetails.title ? true : false;
			}

			if(windowConfig.xaxis || windowConfig.yaxis) {
				windowConfig.showAxisTitle = true;
			} else {
				windowConfig.showAxisTitle = false;
			}
		},

		_createChart: function () {
            this._createChartObjects();
            this._setDefaultChartOptions();
            this._setChartOptions();
        },

        _setSimpleChartProperties: function() {
		    this.options.chartObj.chart.polar = true;
		    this.options.chartObj.chart.type = 'line';

            this._setYAxisProperties();
            this._setTooltipProperties();
        },

        _addChartSeries: function() {
			var seriesData = this.options.dataProvider.seriesData;
			if(seriesData) {
				this.options.chartObj.series = this.options.dataProvider.seriesData;
			} else {
				this.options.chartObj.series = [];
			}

			this.options.totalDataPoints = this.options.dataProvider.dataCount;
			this.options.totalSeries = 1;
			this._setXAxisProperties();
			this._setYAxisProperties();
		},

		_setPlotOptions : function() {
			var $this = this;
			var windowConfiguration = this.options.windowConfig;
			if(windowConfiguration.chartSeries && windowConfiguration.chartSeries.defaultSeriesProperties) {
				dataLabels = windowConfiguration.chartSeries.defaultSeriesProperties.dataLabels;
				if(dataLabels && windowConfiguration.chartSeries.defaultSeriesProperties.dataLabels.inside){
					dataLabels.distance = - 30;
				}
			}
			if(dataLabels === undefined) {
				dataLabels = {enabled:true};
			}

			this.options.chartObj.plotOptions = {
													line : {
															allowPointSelect: true,
															dataLabels: dataLabels,
														   }
												};
		},

		_setXAxisProperties: function() {
			var windowConfiguration = this.options.windowConfig;
			this.options.chartObj.xAxis = new Object();
			if(this.options.dataProvider.axis && this.options.dataProvider.axis.categories) {
				this.options.chartObj.xAxis.categories = this.options.dataProvider.axis.categories;
				this.options.chartObj.xAxis.tickmarkPlacement = 'on';
				this.options.chartObj.xAxis.lineWidth = 0;
				if(windowConfiguration.xaxis && windowConfiguration.xaxis.title) {
					if(windowConfiguration.showAxisTitle) {
						this.options.chartObj.xAxis.title = windowConfiguration.xaxis.title;
					} else {
						this.options.chartObj.xAxis.title = {};
					}
				}
			}
		},

		_setYAxisProperties: function() {
			var windowConfiguration = this.options.windowConfig;
			this.options.chartObj.yAxis = new Object();
			this.options.chartObj.yAxis.gridLineInterpolation = 'polygon';
            this.options.chartObj.yAxis.lineWidth = 0;
			this.options.chartObj.yAxis.min = 0;
			if(windowConfiguration.yaxis && windowConfiguration.yaxis.title) {
				if(windowConfiguration.showAxisTitle) {
						this.options.chartObj.yAxis.title = windowConfiguration.yaxis.title;
					} else {
						this.options.chartObj.yAxis.title = {};
					}
			}
		},

		_setTooltipProperties: function() {
			this.options.chartObj.tooltip = {
									    	shared: true,
									        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
									    };
		},

		_addColumns: function(chartSeries,metaDataMap,headerColumnArray){
			var axisAttribute = this.options.windowConfig.axisAttribute;
			var dataAttribute = this.options.windowConfig.dataAttribute;
			var groupByAttribute = this.options.windowConfig.groupBy;

            this._addColumnToGrid(groupByAttribute, this.getDisplayName(groupByAttribute), metaDataMap);
            this._addColumnToGrid(axisAttribute, this.getDisplayName(axisAttribute), metaDataMap);
            this._addColumnToGrid(dataAttribute, this.getDisplayName(dataAttribute), metaDataMap);
			$si.viewer.radarChartColumnDetails = [];
			
            // adding to global array
            if(axisAttribute){
            	$si.viewer.radarChartColumnDetails.push(axisAttribute);
            }
            if(dataAttribute){
            	$si.viewer.radarChartColumnDetails.push(dataAttribute);
            }
            if(groupByAttribute){
            	$si.viewer.radarChartColumnDetails.push(groupByAttribute);
            }
		},

		hideGrid: function(){
			var $this = this;
			this.options.tableContainer.hide();
			this.options.chartContainer.addClass("height-add");
			$(".k-splitbar").css("display","none");
			$this.options.chart.reflow();
		},

		_applyDrawerConfigration: function () {
            var confData = this.options.windowConfig;
            this.options.drawer[this.options.drawerWidget]("setHideColumnList", confData);
        },

		_applyDrawerSettings: function(drawerSettings) {
			this.options.radarDrawerSettings = drawerSettings.data;
			if(this.options.radarDrawerSettings) {
				var data = this.options.radarDrawerSettings;
				if(this.options.windowConfig._customDataParams == undefined) {
					this.options.windowConfig._customDataParams = {};
				}
				this.options.windowConfig._customDataParams["axisAttribute"] = data.axisAttrObj.name;
				this.options.windowConfig._customDataParams["dataAttribute"] = data.dataAttrObj.name;
				this.options.windowConfig._customDataParams["groupBy"] = data.groupByObj.name;
				this.options.windowConfig._customDataParams["aggregateType"] = data.aggrTypeObj.name;
				
				this.options.windowConfig.axisAttribute = data.axisAttrObj.name;
	     	  	this.options.windowConfig.dataAttribute = data.dataAttrObj.name;
	     	  	this.options.windowConfig.groupBy = data.groupByObj.name;
	     	  	this.options.windowConfig.aggregateType = data.aggrTypeObj.name;
				
				if(this.options.windowConfig._customDataParams) {
						$.each(this.options.windowConfig._customDataParams,function(paramName, paramValue){
	   	    				windowParams[paramName] = paramValue;
	   	    			});
					}
				$si.routes.invokeWindowDataService(this.onSuccess.bind(this), this.onFail.bind(this), windowParams);
			}
		},

		onSuccess:function(windowData)
		{
			this._onWindowDataLoadSuccess(windowData);
			if(this.options.radarDrawerSettings.showChartTitle) {
				this.showChartTitle();
			} else {
				this.hideChartTitle();
			}
			this.showHideChartTitleTool(this.options.radarDrawerSettings.showChartTitle);

			this.showHideDataLabelsTool(this.options.radarDrawerSettings.showDataLabels);
			this.showHideDataLabels(this.options.radarDrawerSettings.showDataLabels);

			this.options.windowConfig.showAxisTitle = this.options.radarDrawerSettings.showAxisTitle;
			this._showHideAxisTitles(this.options.radarDrawerSettings.showAxisTitle);
		
		},
		onFail:function(error)
		{
			this._onWindowDataLoadFailure(error);
		},
		
		_showHideAxisTitles: function(flag){
			var windowConfig = this.options.windowConfig;
			var chart = this.options.chart;
			var xAxisTitle = null;
			var yAxisTitle = null;
			if(flag) {
				if(windowConfig.xaxis && windowConfig.xaxis.title) {
					xAxisTitle = windowConfig.xaxis.title.text;
				}
				if(windowConfig.yaxis && windowConfig.yaxis.title) {
					yAxisTitle = windowConfig.yaxis.title.text;
				}
			}
			if(chart) {
				chart.xAxis[0].setTitle({ text: xAxisTitle });
		        chart.yAxis[0].setTitle({ text: yAxisTitle });
			}
		},

		 //To show or hide the series on the chart
        _hideOrShowSeriesOnChart: function (selectedNode) {
            var $this = this;
            var series = $this.options.chart.series;
            if (series && series.length > 0 && selectedNode) {
                for (var i = 0; i < series.length; i++) {
                    if (series[i].name == selectedNode.nodeName) {
                        if ($this.options.chart.series[i].visible) {
                            $this.options.chart.series[i].hide();
                        } else {
                            $this.options.chart.series[i].show();
                        }
                    }
                }
            }
        },

		getWindowContentFavoriteSettings: function () {
            var chartFavoriteConfig = {};
            var chart = this.options.chart;
           	var windowConfig = this.options.windowConfig
            chartFavoriteConfig.chartType = this.options.chartType;
            chartFavoriteConfig.chartLegendsData = this.getLegendFavoriteData();
            chartFavoriteConfig.showEmbeddedLegend = this.options.chartObj.legend.enabled;
            return chartFavoriteConfig;
        },

        _applyChartLegendFavorites: function(legendData){
        	if(legendData){
        		this.applyLegendConfiguration(legendData);
        		this.options.legendContainer.siViewerChartLegend("updateChartLegendState", {
                			series: legendData
            	});
        	}
        },

        getLegendFavoriteData: function(){
        	var $this = this;
            var legendFavData = [];
            var series = $this.options.chart.series;
            if (this.options.chart && $this.options.chart.series) {
                if (series && series.length > 0) {
                    for (var i = 0; i < series.length; i++) {
                        legendFavData.push({
                            "name": series[i].name,
                            "visible": series[i].visible,
                        });
                    }
                }
                return legendFavData;
            }
		},

		applyLegendConfiguration: function(chartLegendProperties){
            var $this = this;
            var series = this.options.chart.series;
            var j = 0;
            for (var i = 0; i < series.length; i++) {
                if (j < chartLegendProperties.length) {
                    if (series[i].name == chartLegendProperties[j].name) {
                        if (!chartLegendProperties[j].visible) {
                            this.options.chart.series[i].hide();
                        } else {
                            this.options.chart.series[i].show();

                        }
                        this.options.chart.series[i].update();
                        j++;
                    }
                }
            }
		},

		_setDefaultToolState : function(){
			this._super();
			var windowConfig = this.options.windowConfig;
			if(windowConfig.xaxis || windowConfig.yaxis) {
				windowConfig.showAxisTitle = true;
				this._showHideAxisTitles(true);
			} else {
				windowConfig.showAxisTitle = false;
				this._showHideAxisTitles(false);
			}
		},

		_syncLegendData : function(){
        	if(this.options.chart.series){
        		this._super(this.options.chart.series);
        	}
        },
        
        applyWindowData: function () {
            var $this = this;
            this.options.dataProvider = this.options.windowData;
            this.options.totalDataPoints = 0;
            this.options.totalSeries = 0;
            this._addChartSeries();

           // this._setPlotOptions();
            if ($this.options.windowConfig && $this.options.windowConfig.timeSeriesChart) {
            	var chartObj = JSON.parse(JSON.stringify($this.options.chartObj));
                $this._setTimeseriesChartOptions();
                $this.options.chart = new Highcharts.StockChart($this.options.chartObj);
                $this.options.chartObj =chartObj;
            } else {
                $this.options.chart = new Highcharts.Chart($this.options.chartObj);
            }
            // to retain chart type on chart dropdown selection
            $this._changeChartType();
			this._createTableWindow();
			this._setTableDataProvider();
            this._createLegendWindow();
            //method to sync embedded legends and legend window
            this._syncLegendData();

            if($this.options.favouriteObj){
            	this._applyChartFavorite();
            }

            // to sync legend window with series enable/disable based on SI Designer properties
            $this.options.legendContainer.siViewerChartLegend("updateChartLegendState", {
                series: $this.options.chart.series,
            });
            if($this.options.grid){
            	$this.options.grid.rebuild();
            }
            if($this.options.chart){
            	$this.options.chart.reflow();
            }



        },

		onWindowToolControlClick : function(toolId){
			var $this = this;
			if(toolId == "saveasTool"){
				$si.viewer.windowParams = windowParams;
				$this.options.exportToCSVWindow = $si.windowUtil.openExportCSVWindow('radarChart','500','250');
			} else {
				$this._super(toolId);
			}
		},
	});
});