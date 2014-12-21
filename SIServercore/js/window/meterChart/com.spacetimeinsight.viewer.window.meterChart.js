define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'highchart',  
    'highchart-more', 
    'siViewerNamespace',
    'window/meterChart/com.spacetimeinsight.viewer.window.meterChartWindow'
],function($){

	$.widget('spacetimeinsight.siViewerMeterChart', $.spacetimeinsight.siViewerMeterChartWindow,{
		options : {
				windowAttributes:{
				width 	: "800px",
				height 	: "500px",
				
				position:{
					left : "300px",
					top  : "200px"
				}
			},
			
			title		  	: 	"",
			dataProvider  	: 	"",
			configuration 	:	"",
			windowIcon      : "",
			id              :undefined,

		},
		
		pluginName:"siViewerMeterChart",
		GENERIC_COMPONENT : kendo.template("<div id ='#= id #'  > </div>"),
		meterChart :'',
		showLabels :true,
		_create : function(){
			this._super();
			//$this.options.drawer[$this.options.drawerWidget]().bind($this.options.drawerWidget.toLowerCase()+"_applyalertdrawersettings",function(event,data){
		},
		
		_createControls : function(){
			this._super();
			$(this.element).append(this.GENERIC_COMPONENT({id : "MeterHighChart"}));
			this._createChart();
		},
		
		_bindControls : function(){
			this._super();
			var $this = this;
			this.options.onFooterCreationComplete = function(event,data){
				$($this.options.footer).text($si.i18N.Window.footerLastUpdatedDate	 + new Date());
			};
			$(this.element)[this.pluginName]().bind(this.pluginName.toLowerCase() +"_toolbarcreationcomplete",function(e,data){

				//var legendButton = $this.options.toolBar[$this.options.toolBarWidget]("getTool","LEGEND"); 
				var toolbar = $this.options.toolBar;
				var legendTool = toolbar.find("#legendTool");
				if($this.showLabels){
					$(legendTool).removeClass("legend-icon");
					$(legendTool).addClass("legend-off");
					$this.showLabels = false;
				}else {
					$(legendTool).removeClass("legend-icon");
					$(legendTool).addClass("legend-on");
					$this.showLabels = true;
				}
				var chartdatalabelTool = toolbar.find("#chartdatalabelTool");
					$(chartdatalabelTool).removeClass("chartdatalabel-icon");
					$(chartdatalabelTool).addClass("chart-data-label-off");
				var chartdatalabelTool = toolbar.find("#charttitleTool");
					$(chartdatalabelTool).removeClass("charttitle-icon");
					$(chartdatalabelTool).addClass("chart-title-off");
				var chartdatalabelTool = toolbar.find("#tableTool");
					$(chartdatalabelTool).removeClass("table-icon");
					$(chartdatalabelTool).addClass("table-on");	
				
			});
		},
		
		_createChart :function(){
			$this = this;
		    $('#MeterHighChart').highcharts({
	              chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Speedometer'
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 200,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'km/h'
            },
            plotBands: [{
                from: 0,
                to: 120,
                color: '#55BF3B' // green
            }, {
                from: 120,
                to: 160,
                color: '#DDDF0D' // yellow
            }, {
                from: 160,
                to: 200,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Speed',
            data: [80]
        },{
            name: 'Speed',
            data: [30]
        },{
            name: 'Speed',
            data: [10]
        },
                {
            name: 'Speed',
            data: [100]
        }]
	        });
	      $this.meterChart = $("#MeterHighChart").highcharts();
			
		},
		windowToolClicked : function(toolId){
			var $this = this;
			var title="";
			$this._super(toolId);
			if(toolId == 'tableTool'){
				var tableTool = $this.element.parent().find("#tableTool");
				if(tableTool.hasClass("table-off")){
					title = $si.i18N.Window.tooltip.tableoff;
					tableTool.removeClass("table-off");
					tableTool.addClass("table-on");
					tableTool.attr('title',title);
				}else{
					title = $si.i18N.Window.tooltip.table;
					tableTool.removeClass("table-on");
					tableTool.addClass("table-off");
					tableTool.attr('title',title);
				}
				
			}
			if(toolId == 'legendTool'){
				var legendTool = $this.element.parent().find("#legendTool");
				
				var legend = $this.meterChart.legend;
					if(legend.display) {
						title = $si.i18N.Window.tooltip.legendoff;
			            legend.group.hide();
			            legend.display = false;
			            if(legendTool.hasClass("legend-icon")){
			            	legendTool.removeClass("legend-icon");
						}
			            legendTool.removeClass("legend-on")
			            legendTool.addClass("legend-off");
			            legendTool.attr('title',title);
			        } else {
			        	title = $si.i18N.Window.tooltip.legend;
			        	 legend.display = true;
			            legend.group.show();
			            if(legendTool.hasClass("legend-icon")){
			            	legendTool.removeClass("legend-icon");
						}
			            legendTool.removeClass("legend-off");
			            legendTool.addClass("legend-on");
			            legendTool.attr('title',title);
			           
			        }
			}
			if(toolId == 'charttitleTool'){
				var chartTitleTool = $this.element.parent().find("#charttitleTool");
				var title = $this.meterChart.title;
				if(title == null){
					title = $si.i18N.Window.tooltip.charttitle;
					 if(chartTitleTool.hasClass("charttitle-icon")){
						 chartTitleTool.removeClass("charttitle-icon");
						}
					 chartTitleTool.removeClass("chart-title-off");
					 chartTitleTool.addClass("chart-title-on");
					 chartTitleTool.attr('title',title);
					$this.meterChart.setTitle({ text: ''+ $this.options.title});
					
				}else{
					title = $si.i18N.Window.tooltip.charttitleoff;
					chartTitleTool.removeClass("chart-title-on");
					chartTitleTool.addClass("chart-title-off");
					chartTitleTool.attr('title',title);
					$this.meterChart.setTitle({ text: ''});
				}
				
			}
			if(toolId == 'chartdatalabelTool'){
				var chartDataLabelTool = $this.element.parent().find("#chartdatalabelTool");
				var dataLabelEnabled = null;
				for( var i=0;i<$this.meterChart.series.length;i++){
					var opts = $this.meterChart.series[i].options;
					dataLabelEnabled  = opts.dataLabels.enabled;
					opts.dataLabels.enabled = !opts.dataLabels.enabled;
					$this.meterChart.series[i].update(opts);
					
				}
				if(dataLabelEnabled){
					title = $si.i18N.Window.tooltip.chartdatalabeloff;
					 if(chartDataLabelTool.hasClass("chartdatalabel-icon")){
						 chartDataLabelTool.removeClass("chartdatalabel-icon");
						}
					 chartDataLabelTool.removeClass("chart-data-label-off");
					 chartDataLabelTool.addClass("chart-data-label-on");
					 chartDataLabelTool.attr('title',title);
				}else{
					title = $si.i18N.Window.tooltip.chartdatalabel;
					if(chartDataLabelTool.hasClass("chartdatalabel-icon")){
						 chartDataLabelTool.removeClass("chartdatalabel-icon");
					}
					chartDataLabelTool.removeClass("chart-data-label-on");
					chartDataLabelTool.addClass("chart-data-label-off");
					chartDataLabelTool.attr('title',title);
				}
				
			}

	}
});
});