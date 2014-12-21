define([
	'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'highchart',
    'siViewerNamespace',
    'window/charts/com.spacetimeinsight.viewer.window.baseChartWindow',
	],function(){
	$.widget('spacetimeinsight.siViewerPieChart',$.spacetimeinsight.siViewerBaseChartWindow,{
		options:{

		},
		pluginName: "siViewerPieChart",
		_create: function(){
			//moving it above as in some cases, mostly when static this variable is not getting initialized
			this.chartTypeDropDownData = [
						{ chartDisplayType: "Circle", chartType: "0" },
	                    { chartDisplayType: "Semicircle", chartType: "1" },
				];

			this._super();


			var chartDetails = this.options.windowConfig.chartDetails
			if(chartDetails){
				if(chartDetails.title){
					this.options.windowConfig.showTitle = true;
				}else{
					this.options.windowConfig.showTitle = false;
				}
			}


		},


		_selectItemInChartTypeDropDown: function(chartStyle){
			if(chartStyle === undefined) {
				chartStyle = this.options.windowConfig.chartStyle;
			}
			var toolbar = this.options.toolBar;
			var chartTypeDropdown = toolbar.find("#chartselectorTool");
        	var selectIndex;
        	selectIndex = chartStyle == "circle" ? 0 : 1;
        	chartTypeDropdown.data('kendoDropDownList').select(selectIndex);
		},


		_addChartSeries:function() {
			var $this = this;
			var csvDataColumns = {};
			var labelField = this.options.windowConfig.labelField;
			var valueField = this.options.windowConfig.valueField;
			if(!labelField){
				labelField = this.options.windowConfig.groupField;
			}
			$this.options.chartObj.series = [{
					            				type: 'pie',
					            				name: this.options.windowConfig.valueField,
					            				data: this.options.dataProvider.chartData,
					        			  }];
			
            if($this.options.windowConfig.metadata){
            	$si.viewer.pieChartMetaData = $this.options.windowConfig.metadata;
				if(labelField){
					csvDataColumns[labelField] = $this.options.windowConfig.metadata[labelField];
				}
				if(valueField){
					csvDataColumns[valueField] = $this.options.windowConfig.metadata[valueField];
				}
            }
            
            if(csvDataColumns){
            
            	$si.viewer.pieChartMetaData = csvDataColumns;
            }
            
			 $this.options.totalDataPoints = this.options.dataProvider.chartData.length;
			 $this.options.totalSeries = 1;
		},

		_getLabelFormat: function(valueType){
			var labelFormat;
			if(valueType == "percent"){
				labelFormat = '<b>{point.name}</b>: {point.percentage:.1f} %'
			}else if(valueType == "actual"){
				labelFormat = '<b>{point.name}</b>: {point.y:.1f}'
			}
			return labelFormat;
		},

		_setChartDefaultSeriesColors : function() {
			try {
				if(this.options.chartObj) {
					if(this.options.windowConfig.colors) {
						this.options.chartObj.colors = this.options.windowConfig.colors;
					}
				}
			} catch(e) {
				$si.Logger('pieChart').error("Error ["+e.message+"] while setting the default chart series colors" );
			}
		},

		_setPlotOptions : function() {
			var $this = this;
			var windowConfiguration = this.options.windowConfig;
			var dataLabels;

			if(windowConfiguration.chartSeries && windowConfiguration.chartSeries.defaultSeriesProperties) {
				dataLabels = windowConfiguration.chartSeries.defaultSeriesProperties.dataLabels;
				if(dataLabels && windowConfiguration.chartSeries.defaultSeriesProperties.dataLabels.inside){
					dataLabels.distance = - 30;
				}
			}

			if(dataLabels === undefined) {
				dataLabels = {enabled:true};
			}

			dataLabels.format = $this._getLabelFormat(this.options.windowConfig.valueType);

			var startAngle = 0,endAngle = 360 ;

		if(windowConfiguration.chartStyle){
					if(windowConfiguration.chartStyle == "circle"){
						startAngle = 0;
						endAngle = 360;
						this.options.chartType = "circle";
					}else{
						startAngle = -90;
						endAngle = 90;
						this.options.chartType = "semicircle";
					}
			}


			this.options.chartObj.plotOptions = {
										        	pie:{
										        		allowPointSelect: true,
										        		dataLabels: dataLabels,
										        		showInLegend: this.options.chartObj.legend.enabled,
										        		startAngle: startAngle,
										        		endAngle: endAngle
										        	}
					        					};

		},
		onChangeDropDown : function(e){
			var $this = this;
			if(e.sender.selectedIndex == 0){
				$this.createPie();
			}else if(e.sender.selectedIndex == 1){
				$this.createHalfPie();
			}

		},

		createHalfPie: function(){
			var chart = this.options.chart;
			var options = chart.series[0].options;
			options.startAngle = -90;
			options.endAngle = 90;
			chart.series[0].setOptions(options);

			chart.series[0].redraw();
			//chart.series[0].update({options: options,isDirty: true},false);
			this.options.chartType = "semicircle";

		},

		createPie: function(){
			var chart = this.options.chart;
			var options = chart.series[0].options;
			options.startAngle = 0;
			options.endAngle = 360;
			chart.series[0].setOptions(options);
			chart.series[0].redraw();
			//chart.series[0].update({options: options,isDirty: true},false);
			this.options.chartType = "circle";
		},

		_addColumns: function(chartSeries,metaDataMap,headerColumnArray){
			var labelField = this.options.windowConfig.labelField;
			var type = this.options.windowConfig.type
			if(type == "groupeddata"){
				labelField = this.options.windowConfig.groupField;
			}
			if(!labelField){
				labelField = this.options.windowConfig.groupField;
			}
			var valueField = this.options.windowConfig.valueField;
			if(labelField === undefined) {
				metaDataMap["name"] = "Name";
				metaDataMap["value"] = "Value";
	            this._addColumnToGrid("name", "Name", metaDataMap);
	            this._addColumnToGrid("value", "Value", metaDataMap);
			} else {
            	this._addColumnToGrid(labelField, this.getDisplayName(labelField), metaDataMap);
            	this._addColumnToGrid(valueField, this.getDisplayName(valueField), metaDataMap);
            }
		},

		hideGrid: function(){
			var $this = this;
			this.options.tableContainer.hide();
			this.options.chartContainer.addClass("height-add");
			$(".k-splitbar").css("display","none");
			$this.options.chart.reflow();
		},

		_hideOrShowSeriesOnChart: function(data){
			var chart = this.options.chart;
			var selectedSegmentName = data.nodeName;
			var seriesData = chart.series[0].chart.series[0].data;

			$.each(seriesData,function(selectedIndex,element){
					if(selectedIndex == data.nodeIndex){
						var segment = seriesData[selectedIndex];
						if(segment.visible){
							segment.setVisible(false);
						}else{
							segment.setVisible(true);
						}
						chart.series[0].update();
						return false;
					}
				});
		},

		_applyChartLegendFavorites: function(legendData){
			var $this = this;
			var segment;
			var chart = this.options.chart;
			var seriesData = chart.series[0].chart.series[0].data;
        		if(legendData){
					$.each(seriesData,function(selectedIndex,element){
						segment = legendData[selectedIndex];
						if(segment){
							element.setVisible(segment.visible);
						}
					});

				$this.options.legendContainer.siViewerChartLegend("updateChartLegendState", {
               	 	series: seriesData,
            	});
            	chart.series[0].update();
			}
		},


		_applyDrawerConfigration: function () {
            var $this = this;
            var confData = $this.options.windowConfig;
            $this.options.drawer[$this.options.drawerWidget]("appendControlsToDrawer", confData);
        },

        _applyDrawerSettings: function(eventData){
       		var drawerSettings = eventData.data;
       		var windowConfig = this.options.windowConfig;
			var $this = this;
       		$this.options.drawerFavouriteObj = eventData;

      		if(drawerSettings.showChartTitle){
      			this.showChartTitle();
        		this.showHideChartTitleTool(true);
        	}else{
				this.hideChartTitle();
				this.showHideChartTitleTool(false);
	        }

        	if(drawerSettings.showDataLabels){
				this.showHideDataLabelsTool(true);
				this.showHideDataLabels(true);
			}else{
				this.showHideDataLabelsTool(false);
				this.showHideDataLabels(false);
			}
        	/*if(drawerSettings.showHalfPie){
        		windowConfig.chartStyle = 'semicircle';
        	}
        	else{
        		windowConfig.chartStyle = 'circle';
			}*/
			//this._selectItemInChartTypeDropDown();
 			if(drawerSettings.showValueAsPercent){
				this.showValueAsPercent(true);
			}else {
				this.showValueAsPercent(false);
			}

 			//TODO
 		/*
        	this.options.windowConfig.groupField = drawerSettings.labelField;
     	  	this.options.windowConfig.valueField = drawerSettings.valueField;
    	 	this.options.windowConfig._customDataParams['valueField'] = drawerSettings.valueField  ;
 			this.options.windowConfig._customDataParams['labelField'] = drawerSettings.labelField  ;

         	if(!windowConfig._customDataParams){
         		windowConfig._customDataParams = {};
         	}


        	this.options.windowConfig._customDataParams.valueField =  drawerSettings.valueField ;
 			this.options.windowConfig._customDataParams.labelField =  drawerSettings.labelField ;

        	this.refreshWindow();
        */
        },

        showValueAsPercent: function(flag){
        	var chart = this.options.chart;
			var chartOptions = chart.series[0].options,labelFormat;
			var valueType = flag ? "percent" : "actual";
			chartOptions.dataLabels.format = this._getLabelFormat(valueType);
			chart.series[0].setOptions(chartOptions);
			chart.series[0].update();
        },

        _getChartLegendsProperties: function () {
          	var $this = this;
          	var chart = this.options.chart;
			var seriesData = chart.series[0].chart.series[0].data;
            $this.options.chartLegendFavoriteData = seriesData;
           return $this._super();

         },

        _applyChartFavorite : function(){
        	var $this = this;
        	var chartType = $this.options.favouriteObj.chartType;
        	$this._super();
        	if(chartType == "circle"){
        		$this.createPie();
        	}else{
        		$this.createHalfPie();
        	}
        	$this._selectItemInChartTypeDropDown(chartType);
        	$this._getLabelFormat($this.options.favouriteObj.valueType);
        },

        _syncLegendData : function(){
        	var $this = this;
        	if($this.options.chart.series[0].chart.series[0].data){
        	$this._super($this.options.chart.series[0].chart.series[0].data);
        	}
        },
        _changeChartType : function(){
        	var $this = this;
        	if($this.options.chartType){
        		if($this.options.chartType == "semicircle"){
        			$this.createHalfPie();
        		}else{
        			$this.createPie();
        		}
        	}
        },
        
        onWindowToolControlClick : function(toolId){
			var $this = this;
			if(toolId == "saveasTool"){
				$si.viewer.windowParams = windowParams;
				$this.options.exportToCSVWindow = $si.windowUtil.openExportCSVWindow('pieChart','500','250');
			} else {
				$this._super(toolId);
			}
		},

	});
});