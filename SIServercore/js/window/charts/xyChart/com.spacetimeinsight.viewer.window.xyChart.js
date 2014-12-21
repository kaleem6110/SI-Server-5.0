define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'heatmap',
    'highchart-more',
    'highstock',
    'siViewerNamespace',
    'window/charts/com.spacetimeinsight.viewer.window.baseChartWindow',
    "table-bootstrap",
    "table-theme",
    'table-Grid-API',
    'siDropDownList',
], function ($) {

    $.widget('spacetimeinsight.siViewerXYChart', $.spacetimeinsight.siViewerBaseChartWindow, {
        options: {
            id: undefined,
            showHelpDropdown: true,
            simpleChartProperties: "",
            chartSeriesDetails: "",
            chartProperties: "",
            chartSelectorFlag: false,

        },

        pluginName: "siViewerXYChart",
        GENERIC_COMPONENT: kendo.template("<div id ='#= id #'  > </div>"),
        chartTypeDropDownData: [],

        _create: function () {

            this._super();
            var $this = this;

            if (this.options.windowConfig) {
                this.chartTypeDropDownData = this.options.windowConfig.chartTypeDetails;
            }
        },

        _bindControls: function () {
            this._super();
            // Any Specific drawer function to come here
        },

        _setTimeseriesChartOptions: function () {
            var $this = this;
            var timeSeriesDetails = this.options.windowConfig.timeseriesChartDetails;

            if (timeSeriesDetails) {
                //in-line time filters
                if (timeSeriesDetails.inlineTimeFilterProperties) {
                    this.options.chartObj.rangeSelector = timeSeriesDetails.inlineTimeFilterProperties;
                }

                //navigator
                if (timeSeriesDetails.showTimeLineNavigator && timeSeriesDetails.showTimeLineNavigator == true) {
                    if (timeSeriesDetails.timeLineNavigatorProperties) {
                        this.options.chartObj.navigator = timeSeriesDetails.timeLineNavigatorProperties;
                    }
                } else {
                    this.options.chartObj.navigator = {
                        enabled: false
                    };
                }

                //scrollbar
                if (timeSeriesDetails.showTimeLineNavigatorScrollbar && timeSeriesDetails.showTimeLineNavigatorScrollbar == true) {
                    if (timeSeriesDetails.timeLineNavigatorScrollbarProperties) {
                        this.options.chartObj.scrollbar = timeSeriesDetails.timeLineNavigatorScrollbarProperties;
                    }
                } else {
                    this.options.chartObj.scrollbar = {
                        enabled: false
                    };
                }
            }
        },

		//overridden method
		_onToolBarCreationComplete :  function(e,data){
			var $this = this;
			$this._super();
			var tool = $this.options.toolBar.find("#chartselectorTool");
			 if ($this.options.toolBar) {
                var chartSelectorTool = $this.options.toolBar.find("#chartselectorTool").parent();
                var legendTool = $this.element.parent().find("#legendTool");
                if(chartSelectorTool){
	                if ($this.options.simpleChartProperties.chartType == "Heatmap") {
	                    $(chartSelectorTool).unbind('click');
	                } else {
	                    $(chartSelectorTool).bind('click');
	                }
                }
                if(legendTool){
           			 if ($this.options.simpleChartProperties.chartType == "Heatmap") {
						$this.hideLegend();
						legendTool.attr("disabled","true");
					 }
                }
            }
		},

        _applyDrawerConfigration: function () {
            var $this = this;
            var confData = $this.options.windowConfig;
            $this.options.drawer[$this.options.drawerWidget]("setHideColumnList", confData);
        },

        _applyDrawerSettings: function (data) {
            var $this = this;
            $this.options.drawerFavouriteObj = data;
            var title = "";
            var subTitle = "";
            var xyChartObj = JSON.parse(JSON.stringify($this.options.chartObj.yAxis));

                if (data.data.plotItems.dataLabel) {
                	this.showHideDataLabels(true);
                	this.showHideDataLabelsTool(true);
                }else{
                	this.showHideDataLabels(false);
                	this.showHideDataLabelsTool(false);
                }


            if (data.data.plotItems.plotAreaTitle) {
                $this.showChartTitle();
            } else {
                $this.hideChartTitle();

            }

            if (data.data.plotItems.grid) {
                if ($this.options.chart) {
                        $this.options.chart.xAxis[0].update({
                            gridLineWidth: $this.options.chartObj.xAxis.gridLineWidth,
                            minorGridLineWidth: $this.options.chartObj.xAxis.minorGridLineWidth
                        });

                        if(data.data.yAxisItemsSecondary && data.data.yAxisItemsSecondary.length){
                        	if($this.options.chartObj.yAxis){
     	                  	   $.each($this.options.chartObj.yAxis, function(key,value){
     	                  		   if(value.gridLineWidth){
     		                     		  $this.options.chart.yAxis[key].update({
     		                                  gridLineWidth: $this.options.chartObj.yAxis[key].gridLineWidth,
     		                                 minorGridLineWidth: $this.options.chartObj.yAxis[key].minorGridLineWidth
     		                              });
     	                  		   }
     	                  	   });
                         	}
                        }else{
                        	$this.options.chart.yAxis[0].update({
                                gridLineWidth: $this.options.chartObj.yAxis.gridLineWidth
                            });
                        }
                    $this.options.chartObj.yAxis = xyChartObj;
                }
            } else {
                if ($this.options.chart) {
                    $this.options.chart.xAxis[0].update({
                        gridLineWidth: 0,
                        minorGridLineWidth: 0
                    });
                    if(data.data.yAxisItemsSecondary && data.data.yAxisItemsSecondary.length){
                    	if($this.options.chartObj.yAxis){
	                  	   $.each($this.options.chartObj.yAxis, function(key,value){
	                  		   if(value.gridLineWidth){
		                     		  $this.options.chart.yAxis[key].update({
		                                  gridLineWidth: 0,
		                                  minorGridLineWidth: 0
		                              });
	                  		   }
	                  	   });
                    	}
                     }else{
                     	$this.options.chart.yAxis[0].update({
                             gridLineWidth: 0,
                             minorGridLineWidth: 0
                         });
                     }
                    $this.options.chartObj.yAxis = xyChartObj;
                    $this.options.chart.reflow();
                }
            }

            if (data.data.plotItems.guildLines) {
                $this.options.chart.tooltip.options.crosshairs = [true, true];
            } else {
                $this.options.chart.tooltip.options.crosshairs = [false, false];
            }

            // x-axis drawer changes
            if (data.data.xAxisItems.xAxisTitle) {
                $this.options.chart.xAxis[0].setTitle({
                    text: $this.options.chartObj.xAxis.title.text
                });
            } else {
                $this.options.chart.xAxis[0].setTitle({
                    text: ""
                });
            }

            if (data.data.xAxisItems.xAxisTickMark) {
            	if( $this.options.chartObj.xAxis.tickWidth){
                    $this.options.chart.xAxis[0].update({
                        tickWidth: $this.options.chartObj.xAxis.tickWidth,
                        minorTickWidth : $this.options.chartObj.xAxis.minorTickWidth
                    });
                }
            } else {
                $this.options.chart.xAxis[0].update({
                    tickWidth: 0,
                    minorTickWidth :0,
                });
            }

            if (data.data.xAxisItems.xAxisReverseOrder) {
                $this.options.chart.xAxis[0].update({
                    reversed: true
                });
            } else {
                $this.options.chart.xAxis[0].update({
                    reversed: false
                });
            }

			// multiple y axis
           if(data.data.yAxisItemsSecondary && data.data.yAxisItemsSecondary.length){
        	   $.each(data.data.yAxisItemsSecondary, function(key,value){
            	if (value.yAxisTitle) {
                    $this.options.chart.yAxis[key].setTitle({
                        text: $this.options.chartObj.yAxis[key].title.text
                    });
                } else {
                    $this.options.chart.yAxis[key].setTitle({
                        text: ""
                    });
                }
                if (value.yAxisTickMark) {
                	if( $this.options.chartObj.yAxis[key].tickWidth){
                    $this.options.chart.yAxis[key].update({
                        tickWidth: $this.options.chartObj.yAxis[key].tickWidth,
                        minorTickWidth :$this.options.chartObj.yAxis[key].minorTickWidth
                    });
                }
                } else {
                    $this.options.chart.yAxis[key].update({
                        tickWidth: 0,
                        minorTickWidth : 0
                    });
                }
                if (value.yAxisReverseOrder) {
                    $this.options.chart.yAxis[key].update({
                        reversed: true
                    });
                } else {
                    $this.options.chart.yAxis[key].update({
                        reversed: false
                    });
                }
                $this.options.chartObj.yAxis = xyChartObj;
            });
           }else{
        	   if (data.data.yAxisItemsFirst.yAxisTitle) {
                   $this.options.chart.yAxis[0].setTitle({
                       text: $this.options.chartObj.yAxis.title.text
                   });
               } else {
                   $this.options.chart.yAxis[0].setTitle({
                       text: ""
                   });
               }
               if (data.data.yAxisItemsFirst.yAxisTickMark) {
                   if($this.options.chartObj.yAxis.tickWidth){
	            	   $this.options.chart.yAxis[0].update({
	                       tickWidth: $this.options.chartObj.yAxis.tickWidth,
	                       minorTickWidth : $this.options.chartObj.yAxis.minorTickWidth
	                   });
                   }
               } else {
                   $this.options.chart.yAxis[0].update({
                       tickWidth: 0,
                       minorTickWidth :0
                   });
               }
               if (data.data.yAxisItemsFirst.yAxisReverseOrder) {
                   $this.options.chart.yAxis[0].update({
                       reversed: true
                   });
               } else {
                   $this.options.chart.yAxis[0].update({
                       reversed: false
                   });
               }
           }
           $this.options.chart.reflow();
        },

        _setSimpleChartProperties: function () {
            var $this = this;
            this.options.simpleChartProperties = this._getWindowConfigurationByProperty("chartDetails");
            if (this.options.simpleChartProperties) {
                this.options.chartObj.chart.type = $this._getChartAndSeriesType($this.options.simpleChartProperties.chartType);
            }

            if(this.options.windowConfig.colorAxis) {
            	this.options.chartObj.colorAxis = this.options.windowConfig.colorAxis;
            }
            // set axis
            this.options.chartObj.xAxis = this.options.windowConfig.xaxis;
          //for tickPositioner setting value
            if($this.options.windowConfig.xaxis.tickPositioner){
            	$this.options.windowConfig.xaxis.tickPositioner = $this._setTickPositioner($this.options.windowConfig.xaxis);
            }
            try {
                if (this.options.chartObj.xAxis.events) {
                    $.each(this.options.chartObj.xAxis.events, function (index, jsFunction) {
                        $this.options.chartObj.xAxis.events[index] = window[jsFunction];
                    });
                }
            } catch (e) {
                $si.Logger('xyChart').error("Error = [" + e.message + "] occurred while setting events on x-axis");
            }

            if (this.options.windowConfig.yaxisList === undefined) {
                this.options.chartObj.yAxis = this.options.windowConfig.yaxis;
                if($this.options.windowConfig.yaxis.tickPositioner){
                	$this.options.windowConfig.yaxis.tickPositioner = $this._setTickPositioner($this.options.windowConfig.yaxis);
                }
                try {
                    if (this.options.chartObj.yAxis && this.options.chartObj.yAxis.events) {
                        $.each(this.options.chartObj.yAxis.events, function (index, jsFunction) {
                            $this.options.chartObj.yAxis.events[index] = window[jsFunction];
                        });
                    }
                } catch (e) {
                    $si.Logger('xyChart').error("Error = [" + e.message + "] occurred while setting events on y-axis");
                }
            } else {
                this.options.chartObj.yAxis = this.options.windowConfig.yaxisList;
                if($this.options.chartObj.yAxis){
                	$.each($this.options.chartObj.yAxis, function(key,value){
	                if(value.tickPositioner){
	                	$this.options.chartObj.yAxis[key].tickPositioner = $this._setTickPositioner($this.options.chartObj.yAxis[key]);
	                }
                });
            }
                try {
                    if (this.options.chartObj.yAxis && this.options.chartObj.yAxis.events) {
                        $.each(this.options.chartObj.yAxis.events, function (index, jsFunction) {
                            $this.options.chartObj.yAxis.events[index] = window[jsFunction];
                        });
                    }
                } catch (e) {
                    $si.Logger('xyChart').error("Error = [" + e.message + "] occurred while setting events on multiple y-axis");
                }
            }
        },

        _addChartSeries: function () {
            var $this = this;
            var i = 0;
            $this.options.chartSelectorFlag = true;
            this.options.chartSeriesDetails = this._getWindowConfigurationByProperty("chartSeries");

            if (this.options.chartSeriesDetails.defaultSeriesProperties) {
                var chartSeries = this.options.chartSeriesDetails.defaultSeriesProperties;
                try {
                    if (chartSeries.events) {
                        $.each(chartSeries.events, function (index, jsFunction) {
                            chartSeries.events[index] = window[jsFunction];
                        });
                    }
                } catch (e) {
                    $si.Logger('xyChart').error("Error = [" + e.message + "] occurred while setting series events");
                }

                this.options.chartObj.plotOptions.series = chartSeries;
            } else {
                this.options.chartObj.plotOptions.series = new Object();
                this.options.chartObj.plotOptions.series.dataLabels = new Object();
            }

            var seriesList = $this.options.dataProvider.chartSeriesList;
            var chartSeriesFields = this.options.chartSeriesDetails["chartSeriesFields"];
            // Start - Using in Export to CSV open popup functionality.
            $si.viewer.xyChartSeriesData = chartSeriesFields;
            if($this.options.windowConfig.metadata){
            	$si.viewer.xyChartMetaData = $this.options.windowConfig.metadata;
            }
            // End - Using in Export to CSV open popup functionality.
            var isSeriesInRow = this.options.windowConfig.chartSeries.seriesIn == "Row";
            if (seriesList) {
                $.each(seriesList, function (index, seriesField) {
                    if (seriesField) {
                        chartSeriesField = chartSeriesFields[seriesField.id];

                        $this.options.chartObj.series[i] = new Object();
                        $this.options.chartObj.series[i].id = isSeriesInRow ? (seriesField.id + "_" + seriesField.name) : seriesField.id;
                        $this.options.chartObj.series[i].name = seriesField.name;

                        if (seriesField.useRawData === undefined || seriesField.useRawData == false) {
                            $this.options.chartObj.series[i].data = seriesField.data;
                        } else {
                            $this.options.chartObj.series[i].data = seriesField.rawData;
                        }
                        if(chartSeriesField.seriesEnabled){
                        	$this.options.totalSeries++;
                        	$this.options.totalDataPoints = $this.options.chartObj.series[i].data.length +  $this.options.totalDataPoints;
                        }


						//to hide/unhide series based on SI Designer properties
                        $this.options.chartObj.series[i].visible = chartSeriesField.seriesEnabled ;

                        if (chartSeriesField && chartSeriesField.seriesProperties) {
                            $.each(chartSeriesField.seriesProperties, function (name, value) {
                                try {
                                    if (name == "events") {
                                        $.each(value, function (index, jsFunction) {
                                            value[index] = window[jsFunction];
                                        });
                                    }
                                } catch (e) {
                                    $si.Logger('xyChart').error("Error = [" + e.message + "] occurred while setting series events");
                                }

                                $this.options.chartObj.series[i][name] = (value == "false") ? false : (value == "true" ? true : value);
                            });
                        }

                        if (chartSeriesField && $this.options.simpleChartProperties.chartType != "Heatmap") {
                            if (chartSeriesField.seriesColor) {
                                $this.options.chartObj.series[i].color = chartSeriesField.seriesColor;
                            }
                            $this.options.chartObj.series[i].yAxis = chartSeriesField.verticalAxis;
                           	if (chartSeriesField.seriesChartType != undefined) {
                            	$this.options.chartSelectorFlag = false;
                                $this.options.chartObj.series[i].type = $this._getChartAndSeriesType(chartSeriesField.seriesChartType);
                            } else {
                                $this.options.chartObj.series[i].type = $this._getChartAndSeriesType($this.options.simpleChartProperties.chartType);
                            }

                        }
                    }
                    i = i + 1;
                });
            } else {
                $this.options.chartObj.series = [];
            }

        },

        toggleChartTitle: function () {
            var $this = this;
            this._super();
        },

        _enableChartSelectorTool: function () {
            var $this = this;
            if ($this.options.toolBar) {
                var chartSelectorTool = $this.options.toolBar.find("#chartselectorTool").parent();
                if ($this.options.chartSelectorFlag == true) {
                    $(chartSelectorTool).bind('click');
                } else {
                    $(chartSelectorTool).unbind('click');
                }
            }

        },

        _getChartAndSeriesType: function (type) {
            switch (type) {
            case 'AreaChart':
                return 'area';
            case 'AreaRangeChart':
                return 'arearange';
            case 'AreaSplineChart':
                return 'areaspline';
            case 'AreaSplineRangeChart':
                return 'areasplinerange';
            case 'BarChart':
                return 'bar';
            case 'BoxplotChart':
                return 'boxplot';
            case 'BubbleChart':
                return 'bubble';
            case 'ColumnChart':
                return 'column';
            case 'ColumnRangeChart':
                return 'columnrange';
            case 'ErrorbarChart':
                return 'errorbar';
            case 'LineChart':
                return 'line';
            case 'ScatterChart':
                return 'scatter';
            case 'Heatmap':
                return 'heatmap';
            case 'OHLCChart':
            	return 'ohlc';
            case 'CandlestickChart':
            	return 'candlestick';
            default:
                return 'line';
            }
        },

        _setChartAndSeriesType: function (type) {
            switch (type) {
            case 'area':
                return 'AreaChart';
            case 'arearange':
                return 'AreaRangeChart';
            case 'areaspline':
                return 'AreaSplineChart';
            case 'areasplinerange':
                return 'AreaSplineRangeChart';
            case 'bar':
                return 'BarChart';
            case 'boxplot':
                return 'BoxplotChart';
            case 'bubble':
                return 'BubbleChart';
            case 'column':
                return 'ColumnChart';
            case 'columnrange':
                return 'ColumnRangeChart';
            case 'errorbar':
                return 'ErrorbarChart';
            case 'line':
                return 'LineChart';
            case 'scatter':
                return 'ScatterChart';
            case 'heatmap':
                return 'Heatmap';
            default:
                return 'line';
            }
        },

        onChangeDropDown: function (e) {
            var $this = this;
            $this.options.chartType = e.sender._selectedValue;
            var seriesType = $this._getChartAndSeriesType($this.options.chartType);
            $this.options.chartType = seriesType;
            $this._changeChartType();
        },

        // to change series type based on which chart will be changed
        _changeChartType: function (chartType) {
        	if(chartType === undefined || chartType == "") {
        		chartType = this.options.chartType;
        	}
        	if(chartType === undefined || chartType == "") {
        		return;
        	}
            var $this = this;
            var series = $this.options.chart.series;
            // adding for creating bar chart
            if ($this.options.chartType == 'bar') {
                $this.options.chart.inverted = true;
                $this.options.chart.xAxis[0].update({}, false);
                $this.options.chart.yAxis[0].update({}, false);
            } else {
                $this.options.chart.inverted = false;
                $this.options.chart.xAxis[0].update({}, false);
                $this.options.chart.yAxis[0].update({}, false);
            }
            for (var i = 0; i < series.length; i++) {
                $this.options.chart.series[i].update({type:chartType});
            }
            //$this.options.chart.reflow();
        },
        // To show or hide the series on the chart
        _hideOrShowSeriesOnChart: function (selectedNode) {
            var $this = this;
            var seriesCount = 0;
            var datapoints = 0;

            var series = $this.options.chart.series;
            if (series && series.length > 0 && selectedNode) {
                for (var i = 0; i < series.length; i++) {
                    if (series[i].name == selectedNode.nodeName) {
                        if ($this.options.chart.series[i].visible) {
                            $this.options.chart.series[i].hide();
                            datapoints = datapoints + $this.options.chart.series[i].data.length;
                            seriesCount++;
                        } else {
                            $this.options.chart.series[i].show();
                            seriesCount --;
                            datapoints = datapoints - $this.options.chart.series[i].data.length;
                        }

                    }
                }

                $this.options.totalSeries = $this.options.totalSeries - seriesCount;
                $this.options.totalDataPoints = $this.options.totalDataPoints - datapoints;
                $($this.options.footer).children().text( $si.i18N.Window.footerLabelSelectedChartSeries +  $this.options.totalSeries
       		 			+" "+$si.i18N.Window.footerLabelChartData + $this.options.totalDataPoints);


            }
        },

         _getChartLegendsProperties: function () {
          	var $this = this;
            $this.options.chartLegendFavoriteData = $this.options.chart.series;
            return $this._super();
         },

        _applyChartFavorite : function(){
        	var $this = this;
        	$this._super();

            if ($this.options.favouriteObj.chartType && $this.options.favouriteObj.chartType != "") {
                 // var seriesType = $this._getChartAndSeriesType($this.options.favouriteObj.chartType);
                  $this._changeChartType($this.options.favouriteObj.chartType);
                  
            }


        },

         _applyChartLegendFavorites: function (chartLegendProperties) {
            var $this = this;
            var series = $this.options.chart.series;
            var seriesCount = 0;
            var datapoints = 0;
            var j = 0;
            for (var i = 0; i < series.length; i++) {
                if (j < chartLegendProperties.length) {
                    if (series[i].name == chartLegendProperties[j].name) {
                        if (!chartLegendProperties[j].visible) {
                            $this.options.chart.series[i].hide();
                            datapoints = datapoints + $this.options.chart.series[i].data.length;
                            seriesCount++;
                        } else {
                            $this.options.chart.series[i].show();
                            seriesCount --;
                            datapoints = datapoints - $this.options.chart.series[i].data.length;

                        }
                        j++;
                    }
                }
            }
            $this.options.totalSeries = $this.options.totalSeries - seriesCount;
            $this.options.totalDataPoints = $this.options.totalDataPoints - datapoints;
            $($this.options.footer).children().text( $si.i18N.Window.footerLabelSelectedChartSeries +  $this.options.totalSeries
       		 			+" "+$si.i18N.Window.footerLabelChartData + $this.options.totalDataPoints);
            $this.options.legendContainer.siViewerChartLegend("updateChartLegendState", {
                series: $this.options.chart.series,
            });
        },


        _syncLegendData : function(){
        	var $this = this;
        	if($this.options.chart.series){
        		$this._super($this.options.chart.series);
        	}



        },

        updateSeriesDataPointsFooter : function(selectedNode){
        	 var $this = this;
        	 var seriesCount = 0;
             var datapoints = 0;
             if($this.options.chart){
             var series = $this.options.chart.series;
             if (series && series.length > 0) {
                 for (var i = 0; i < series.length; i++) {
                	 if (series[i].name == selectedNode) {
                         if (!$this.options.chart.series[i].visible) {
                             datapoints = datapoints + $this.options.chart.series[i].data.length;
                             seriesCount++;
                         } else {
                             seriesCount --;
                             datapoints = datapoints - $this.options.chart.series[i].data.length;
                         }
                	 }

                 }

                 $this.options.totalSeries = $this.options.totalSeries - seriesCount;
                 $this.options.totalDataPoints = $this.options.totalDataPoints - datapoints;
                 $($this.options.footer).children().text( $si.i18N.Window.footerLabelSelectedChartSeries +  $this.options.totalSeries
        		 			+" "+$si.i18N.Window.footerLabelChartData + $this.options.totalDataPoints);

             }

             }
        },

        _selectItemInChartTypeDropDown : function(){
        	var $this = this;
        	var toolbar = $this.options.toolBar;
			var chartTypeDropdown = toolbar.find("#chartselectorTool");
        	var dropdownlist = chartTypeDropdown.data("kendoDropDownList");
            $this.options.chartType = $this.options.chartObj.chart.type;
            var setChartType = $this._setChartAndSeriesType($this.options.chartType);
            if(dropdownlist){
            	$.each(dropdownlist.dataSource.data(), function(key,value){
            		if(value.chartType == setChartType){
            			dropdownlist.select(key);
            		}
            	});

            }
        },

        _setDefaultDataLabels: function(){
			var $this = this;
            if ($this.options.chart) {
                if (this.options.chartSeriesDetails.defaultSeriesProperties.dataLabels) {
                    var dataLabels = this.options.chartSeriesDetails.defaultSeriesProperties.dataLabels;
                    if (dataLabels.enabled) {
                        	$this.showHideDataLabels(true);
                    } else {
                        	$this.showHideDataLabels(false);
                     }
                  }
             }

            var toolbar = $this.options.toolBar;
            if (toolbar) {

                var dataLabels = this._getWindowConfigurationByProperty("chartSeries").defaultSeriesProperties.dataLabels;
                var chartDataLabelTool = $this.element.parent().find("#chartdatalabelTool");
                if (dataLabels.enabled) {
                	$this.showHideDataLabelsTool(true);
                } else {
                	$this.showHideDataLabelsTool(false);
                }
            }
		},

		_setTickPositioner : function(data){
        	var $this = this;
        	if(data.tickPositioner && window[data.tickPositioner]!=undefined){
        		return window[data.tickPositioner];
            	}
        },
        onWindowToolControlClick : function(toolId){
			var $this = this;
			if(toolId == "saveasTool"){
				$si.viewer.windowParams = windowParams;
				$this.options.exportToCSVWindow = $si.windowUtil.openExportCSVWindow('xyChart','500','250');
			} else {
				$this._super(toolId);
			}
		},

    });
});