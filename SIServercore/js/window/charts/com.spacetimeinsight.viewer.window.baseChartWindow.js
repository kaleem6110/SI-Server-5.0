define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'common/com.spacetimeinsight.viewer.ui.nestedWindow',
    'window/com.spacetimeinsight.viewer.window.baseWindow',
    'window/charts/com.spacetimeinsight.viewer.window.chartLegend',
    "table-bootstrap",
    "table-theme",
    'table-Grid-API',
],function($){

	$.widget('spacetimeinsight.siViewerBaseChartWindow', $.spacetimeinsight.siViewerBaseWindow,{
		options : {
			windowAttributes:{
				width 	: "800px",
				height 	: "300px",

				position:{
					left : "300px",
					top  : "100px"
				},

			},
			toolBarOptions 	: 	["TABLE","SPACER","CHARTSELECTOR","SPACER","SPACER","LEGEND","CHARTDATALABEL","CHARTTITLE"],
			dataProvider  	: 	{},
			id				:	"baseChartWindow",
			grid: null,
			exportToCSVWindow	: 0,
			chartType             :"",
			showLegendDiv : false,
			showHelpDropdown	: true,
			favouriteObj : null,
			chartObj		: {},
			DEFAULT_MIN_WIDTH : 80,
			tableContainer : null,
			chartLegendFavoriteData : [],
			drawerFavouriteObj : null,
			totalDataPoints : 0,
			totalSeries : 0,
			toolClicked : null,
		},

		pluginName			:	"siViewerBaseChartWindow",
		TEMPLATE			:	kendo.template("<div id ='#= id #_outerContainer' class='chart-splitter' ><div id ='#= id #_chartContainer' class='custom-top-pane'><div id ='#= id #_legendContainer' class = 'chart-legend' > </div><div id ='#= id #_highchartContainer' class = 'chart-area' > </div><div style='clear:both'></div></div><div id='#= id #_tableContainer' style='position: relative' class = 'custom-bottom-pane'><div id='#= id #_gridContainer' class = 'grid-container'></div></div></div>"),
		GENERIC_COMPONENT 	: 	kendo.template("<div id ='#= id #'  > </div>"),
		CHART_FOOTER_DIV	: kendo.template("<div id='#= id #_chart_footer_label' style='float:right;margin-right: 10px;'>#= content #</div>"),
        //Called on instance creation
        _create: function(){
        	var $this = this;
        	this._super();
			//set the highcharts globa options if not set
			this._setChartGlobalOptions();
        	this._createChart();
        	this._createTableWindow();
        },

        _createControls : function(){
        	var $this = this;
        	var outerContainer = $(this.element).find("#" + this.options.id + "_outerContainer");
        	this._super();
			$(this.element).addClass("chart-window");
			$(this.element).width("100%");
			if(outerContainer.length == 0){
				$(this.element).append(this.TEMPLATE({id : this.options.id }));
				outerContainer = $(this.element).find("#" + this.options.id + "_outerContainer");
				this.options.chartContainer =  outerContainer.find("#" + this.options.id + "_chartContainer");
				this.options.hightChartContainer = this.options.chartContainer.find("#" + this.options.id + "_highchartContainer");
				this.options.legendContainer = this.options.chartContainer.find("#" + this.options.id + "_legendContainer");
				this.options.tableContainer = outerContainer.find("#" + this.options.id + "_tableContainer");

				$(this.element).find('.k-window-content').css('overflow','hidden');
				this._divideChartTable();
          }
        },


    	_bindControls : function() {
        	var $this = this;
    		this._super();

    	},

		_setChartGlobalOptions : function() {
			if(!$si.viewer.hasSetGlobalChartOptions) {
				Highcharts.setOptions({
			        global: {
			            timezoneOffset: -($si.viewer.timeZoneOffset/60000),
			        }
			    });
				$si.viewer.hasSetGlobalChartOptions= true;
			}
		},

    	_updateFooter : function() {
       	 var $this = this;
       	 $this._super();
       	 var footerElement = $(this.options.footer);
       	 footerElement.append(this.CHART_FOOTER_DIV({
       		 id:$this.element.id,
       		 content : $si.i18N.Window.footerLabelSelectedChartSeries +  $this.options.totalSeries
       		 			+" "+$si.i18N.Window.footerLabelChartData + $this.options.totalDataPoints,
       	 }));
       },

		_onToolBarCreationComplete :  function(e,data){
			var $this = this;
			this._super();
			var toolbar = $this.options.toolBar;
			if(toolbar){
				var parent = toolbar.find("#chartselectorTool").parent();
				toolbar.find("#chartselectorTool").remove();
			    parent.append("<select id='chartselectorTool' class='icon-dropdown chartselector-icon'></select>");
				var chartType = toolbar.find("#chartselectorTool");
				chartType.siDropDownList({
					dataTextField: "chartDisplayType",
			        dataValueField: "chartType",
					dataSource : $this.chartTypeDropDownData,
					animation: false,
					shimRequired:true,
					change: $this.onChangeDropDown.bind($this),

				});
				this._selectItemInChartTypeDropDown();
				var chartTypeParent = chartType.parent();
				if(chartTypeParent){
					chartTypeParent.attr('title',$si.i18N.Window.tooltip.charttype);
				}

				// adding tools default state based on config
				$this._addInitialToolState();
				$this._setChartTitleTool();
				toolbar.bind($this.options.toolBarWidget.toLowerCase() +"_ontoolbarbtnclick",function(e1,data1){
						$this.options.toolClicked = data1.event.target.id;
					});
			}


		},
		_selectItemInChartTypeDropDown: function(){

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

    	_createLegendWindow : function() {
			var $this = this;
			var tmpLegendList = $this.options.dataProvider.chartLegendData;
			var tmpSeriesList = $this.options.chart.series;
			var legendList = new Array();
			var seriesList = [];
			var tmpConfig;

            if(tmpLegendList && tmpSeriesList){
                $.each(tmpLegendList, function (legendIdx, tmpLegend) {
                	$.each(tmpSeriesList, function (seriesIdx, tmpSeries) {
                		tmpConfig = $this.getDisplayName(tmpLegend.seriesName);
						if(tmpSeries.options.type != 'errorbar' && ((tmpSeries.name == tmpLegend.seriesName) ||
							(tmpSeries.name == tmpConfig))){
							tmpLegend.color = tmpSeries.color;
							legendList.push(tmpLegend);
						}
                	});

                });
            }

			$(this.options.legendContainer).css({
				minWidth : "50px",
				minHeight : "110px",
			}).addClass("ui-widget-content");

		  	/* if(legendList === undefined) {
				legendList = [];
			}
			*/
			if($(this.options.legendContainer).children().data("kendoTreeView")){
				$this.options.legendContainer.siViewerChartLegend("setLegendData",legendList.length > 0 ? legendList : tmpLegendList);
			}else{
				$("#" + this.options.id + "_legendContainer").siViewerChartLegend({
					chartLegendData: legendList.length > 0 ? legendList : tmpLegendList,
					onHideOrShowSeriesOnChart : function(event,data){
	                	$this._hideOrShowSeriesOnChart(data);
					},
				});
			}

    	},

    	 _createChart: function () {
             var $this = this;
             $this._createChartObjects();
             $this._setDefaultChartOptions();
             $this._setChartOptions();
             $this._setChartTitles();

         },



        _setChartOptions: function () {
            var $this = this;
            $this.options.chartObj.chart.renderTo = $this.options.id + "_highchartContainer";
            $this._setSimpleChartProperties();
            $this._enableChartSelectorTool();
        },

        _setSimpleChartProperties : function(){

        },

        _enableChartSelectorTool : function(){

        },


       _createTableWindow: function () {
            var headerColumnArray = new Array();
            var gridColumn;
            var gridData = [];
            var $this = this;
            var parentId = $this.options.id;

            var metaDataMap = $this.getWindowConfigurationByProperty("metadata");
            var gridContainer = $(this.element).find("#" + parentId + "_gridContainer");
            $this.options.chartInfoGrid = new flexiciousNmsp.FlexDataGrid(gridContainer[0], {
                id: 'chartInfoGrid',
            });
            $this.options.grid = gridContainer[0].component;
            var chartSeries = this._getWindowConfigurationByProperty("chartSeries");

            if (chartSeries != undefined) {
                //headerColumnArray.push(chartSeries.xfield);

                var seriesFields = chartSeries["chartSeriesFields"];
                if(seriesFields){
	                $.each(seriesFields, function (index, seriesField) {
	                    if (seriesField) {
	                        headerColumnArray.push(seriesField);
	                    }
	                });
                }
                this.options.grid.rollOverColor = 0x8dcbe4;
                this.options.grid.textRollOverColor = 0xFFFFFF;
                this.options.grid.selectionColor = 0x2c95d2;
                this.options.grid.activeCellColor = 0x2c95d2;
                this.options.grid.alternatingItemColors = [0xE4EFFF, 0xF9F9F9];
                this.options.grid.fixedColumnFillColors[0] = 0xE4EFFF;
                this.options.grid.columnGroupColors[0] = 0xE4EFFF;
                this.options.grid.imagesRoot = $si.tableGridUtils.IMAGE_PATH
                $this.options.grid.setHorizontalScrollPolicy("auto");
                $this.options.grid.setColumnLevel(new flexiciousNmsp.FlexDataGridColumnLevel($this.options.grid));

                $this._addColumns(chartSeries,metaDataMap,headerColumnArray);
                $this._addColumnToGrid( "", "", metaDataMap); // added blank column at the end
            }
            $((this.element).find("#" + this.options.id + "_outerContainer")).data("kendoSplitter").trigger("resize");
            if ($this.options.chart) {
                $this.options.chart.reflow();
            }
            $this.options.grid.reDraw();
            $this.options.grid.rebuild();

        },
        _addColumnToGrid: function (columnName, displayName, metaDataMap) {
            var $this = this;
            var headerStr = '<span title="'+displayName+'" style ="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;">'+displayName+'</span>';
			gridColumn = $si.tableGridUtils.DynamicColumns_addColumn(columnName, headerStr);
            gridColumn.setColumnWidthMode("fitToContent");
            gridColumn.columnWidthModeFitToContentExcludeHeader = true;
            gridColumn.minWidth = $this.options.DEFAULT_MIN_WIDTH;
            gridColumn.setStyle("headerPaddingLeft",14);
            gridColumn.setStyle("headerPaddingRight",14);
            gridColumn.setStyle("headerPaddingTop",8);
            gridColumn.setLabelFunction($this._gridColumnDataLabels.bind(this));
            if(columnName != undefined && columnName != ""){
            	var seriesMetaData = metaDataMap[columnName];
  	        	if(seriesMetaData.type == $this.options.dataTypes[0] || seriesMetaData.type == $this.options.dataTypes[1] || seriesMetaData.type == $this.options.dataTypes[2] || seriesMetaData.type == $this.options.dataTypes[3]){
					gridColumn.setStyle("textAlign","center");
				}else{
					gridColumn.setStyle("textAlign","right");
				}
            }
            $this.options.grid.addColumn(gridColumn);
        },

		_gridColumnDataLabels : function(cell, state){
			var $this = this;
		 	var columnName = state.dataField;
         	var columnValue = cell[columnName];
         	if(columnValue == 'undefined'){
				return "";
			}else{
				return $this._formatColumnData(columnName, columnValue);
			}

		},

		_formatColumnData : function (columnName, columnValue) {
			try {
				var $this = this;
				var metaDataMap = $this.getWindowConfigurationByProperty("metadata");
				if(metaDataMap != undefined && metaDataMap[columnName] != undefined && metaDataMap[columnName].type != this.options.dataTypes[1]) {
					columnValue = $si.formattingUtil.formatData(metaDataMap[columnName].type, metaDataMap[columnName].displayFormat, columnValue);
				}
				if(!isNaN(columnValue)|| ( columnValue != undefined && columnValue.indexOf('NaN') <0 )){
					return columnValue;
				} else{
					return "";
				}
			} catch(e) {
				return "";
			}
		},
		_addColumns: function(chartSeries,metaDataMap,headerColumnArray){
			    var $this = this;
			    //Adding xField to the Grid
                $this._addColumnToGrid(chartSeries.xfield, $this.getDisplayName(chartSeries.xfield),metaDataMap);
                //Adding Series details to the Grid
                $.each(headerColumnArray, function (index, data) {
                	//check for if x-axis name and series field name are equal,then will not add that column
                	if(data.seriesName != chartSeries.xfield){
                		$this._addColumnToGrid(data.seriesName, $this.getDisplayName(data.seriesName),metaDataMap);
                	}
                });

                var chartDetails = this.options.windowConfig.chartDetails;
				if(chartDetails.tooltip) {
					if(chartDetails.tooltipAttributes && chartDetails.tooltipAttributes.length > 0) {
						$.each(chartDetails.tooltipAttributes, function (index, name) {
		                	$this._addColumnToGrid(name, $this.getDisplayName(name),metaDataMap);
		                });
					}
				}
		}	,

		_setPlotOptions : function() {
			//overridden method
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



		_addEventListener: function(target, event, callbackHandler){
	    	var htmlDataGrid = $this.options.grid;
	    	if(htmlDataGrid){
	    		htmlDataGrid.addEventListener(target, event, callbackHandler);
	    	}
	    },

	    _setTableDataProvider : function() {
	    	 this.options.grid.setDataProvider(this.options.dataProvider.chartTableData);
	    },

		_divideChartTable : function(){
			var $this = this;
			$((this.element).find("#" + this.options.id + "_outerContainer")).kendoSplitter({
		        orientation: "vertical",
		        panes: [
		            { collapsible: false, resizable: true,size : '50%' },
		            { collapsible: false, resizable: true,size : '50%'}
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

			if($this.options.chart){
				$this.options.chart.reflow();
				$this.options.chart.redraw();
			}
			if($this.options.grid){
			$this.options.grid.reDraw();
			$this.options.grid.rebuild();
			}
		},

		onWindowToolControlClick : function(toolId){
			var $this = this;
			if(toolId == "tableTool"){
				this.toggleTable();
			} else if(toolId == "legendTool"){
				this.toggleLegend();
			}else if(toolId == "chartdatalabelTool"){
				this.toggleDataLabels();
			}else if(toolId == "charttitleTool"){
				this.toggleChartTitle();
			}
			$this.options.grid.rebuild();
			$this.options.chart.reflow();
			$this._super(toolId);
		},
		_addInitialToolState : function(){
			var $this = this;

			if($this.options.windowConfig && $this.options.windowConfig.chartDetails && !$this.options.windowConfig.chartDetails.showLegend){
				if($this.options.showLegendDiv == false){
					this.hideLegend();
				}
			}
			if($this.options.windowConfig && $this.options.windowConfig.chartTable && !$this.options.windowConfig.chartTable.showTable){
				this.hideTable();
			}

			this._setDefaultDataLabels();

			this._setPlotOptions();
		},

		_setDefaultDataLabels: function(){
			var $this = this;
			var dataLabels = this._getWindowConfigurationByProperty("chartSeries").defaultSeriesProperties.dataLabels;
            if ($this.options.chart) {
                if (dataLabels) {
                    if (dataLabels.enabled) {
                        	$this.showHideDataLabels(true);
                    } else {
                        	$this.showHideDataLabels(false);

                     }
                  }
             }
             if($this.options.toolBar){
              if (dataLabels) {
                    if (dataLabels.enabled) {
             			$this.showHideDataLabelsTool(true);
             		}else{
             			$this.showHideDataLabelsTool(false);
             		}
             	}
             }
		},

		showHideChartTitleTool: function(flag){
			var toolbar = this.options.toolBar;
			if(toolbar){
				var chartTitleTool = toolbar.find('#charttitleTool');
					if(flag){
						chartTitleTool.removeClass('chart-title-off');
						chartTitleTool.addClass('charttitle-icon');
						if(this.options.windowConfig.chartDetails.title){
							chartTitleTool.attr('title',$si.i18N.Window.tooltip.charttitle);
						}
					}
					else{
						chartTitleTool.addClass('chart-title-off');
						chartTitleTool.removeClass('charttitle-icon');
						if(this.options.windowConfig.chartDetails.title){
							chartTitleTool.attr('title',$si.i18N.Window.tooltip.charttitleoff);
						 }
					}
			}
		},

		showHideDataLabelsTool: function(flag){
			var toolbar = this.options.toolBar;
			if(toolbar){
				var chartDataLabelTool = toolbar.find('#chartdatalabelTool');
				if(flag){
					if(chartDataLabelTool.hasClass('chart-data-label-off')){
						chartDataLabelTool.removeClass('chart-data-label-off');
					}
					if(!chartDataLabelTool.hasClass('chartdatalabel-icon')){
						chartDataLabelTool.addClass('chartdatalabel-icon');
					}
					chartDataLabelTool.attr('title',$si.i18N.Window.tooltip.chartdatalabel);
				}
				else{
					if(!chartDataLabelTool.hasClass('chart-data-label-off')){
						chartDataLabelTool.addClass('chart-data-label-off');
					}
					if(chartDataLabelTool.hasClass('chartdatalabel-icon')){
						chartDataLabelTool.removeClass('chartdatalabel-icon');
					}
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
				if ($this.options.chart) {
					$this.options.chart.reflow();
				   }
				var gridContainer = $(this.options.tableContainer).find("#" + this.options.id + "_gridContainer");

				$((this.element).find("#" + this.options.id + "_outerContainer")).data("kendoSplitter").trigger("resize");
			    var grid =gridContainer[0].component;
			    grid.reDraw();
				grid.rebuild();
		},
		hideTable: function(){
			var $this = this;
			this.options.tableContainer.toggle();
			if(this.options.chartContainer.hasClass("height-remove")){
						this.options.chartContainer.removeClass("height-remove");
						this.options.chartContainer.css("border","none");
						$(".k-splitbar").css("display","block");
						this.options.tableClass = "height-remove";
						$((this.element).find("#" + this.options.id + "_outerContainer")).data("kendoSplitter").trigger("resize");
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

				if ($this.options.chart) {
					$this.options.chart.reflow();
				}
			}
		},

		toggleChartTitle: function(){
			var $this =this;
			var chartTitleTool = $(this.element).closest('.k-window').find("#charttitleTool");
			if(chartTitleTool.hasClass("chart-title-off") ){
			 	$this.showChartTitle();
			 	$this.options.drawer[$this.options.drawerWidget]("updateChartTitleDrawerSettings",true );
			} else {
				$this.hideChartTitle();
				$this.options.drawer[$this.options.drawerWidget]("updateChartTitleDrawerSettings",false );
			}
		},

		hideChartTitle: function(){
			var $this = this;
			var title ="";
			var subTitle= "";
			this.showHideChartTitleTool(false);
			if(this.options.chart){
				this.options.chart.setTitle({ text: title},{ text: subTitle});
				this.options.chart.reflow();
			}
		},

		showChartTitle: function(){
			var $this = this;

			var title = this.options.windowConfig.chartDetails.title;
			var subTitle = this.options.windowConfig.chartDetails.subtitle;
			if(!(title != null && title != undefined)){
				title ="";
			}
			if(!(subTitle != null && subTitle != undefined)){
				subTitle ="";
			}
			this.showHideChartTitleTool(true);
			this.options.chart.setTitle(title, subTitle);
			this.options.chart.reflow();
		},

		toggleDataLabels: function(){
			var $this = this;
			var chartDataLabelTool = this.element.parent().find("#chartdatalabelTool");
			if(chartDataLabelTool.hasClass("chart-data-label-off")){
				this.showHideDataLabelsTool(true);
				this.showHideDataLabels(true);
				$this.options.drawer[$this.options.drawerWidget]("updateChartDataLabelDrawerSettings",true );
			}else{
				 this.showHideDataLabelsTool(false);
				 this.showHideDataLabels(false);
				 $this.options.drawer[$this.options.drawerWidget]("updateChartDataLabelDrawerSettings",false );
			}


		},

		 showHideDataLabels: function (show) {
            var $this = this;
            if ($this.options.chart) {
            	for (var i = 0; i < $this.options.chart.series.length; i++) {
                    var opts = $this.options.chart.series[i].options;
                    opts.dataLabels.enabled = show;
                    $this.options.chart.series[i].update(opts);
                }
            	$this.options.chart.reflow();


            }


        },

		toggleLegend: function(){
			if(this.options.hightChartContainer.hasClass("width-add")){
				this.showLegend();
			}else{
				this.hideLegend();
			}
		},


		showLegend: function(){
			var $this = this;
			$this.options.legendContainer.show();
			if(this.options.hightChartContainer.hasClass("width-add")){
				//this.options.hightChartContainer.addClass("width-remove");
				this.options.hightChartContainer.removeClass("width-add");
				this.options.legendClass = "width-add";
			}
			var legendTool = $this.element.parent().find("#legendTool");
			if(legendTool.hasClass("legend-icon")){
				legendTool.removeClass("legend-icon");
			}
			if(legendTool.hasClass("legend-off")){
            	var title = $si.i18N.Window.tooltip.legend;
            	legendTool.removeClass("legend-off");
            if (!legendTool.hasClass("legend-on")){
            	legendTool.addClass("legend-on");
            }
	            legendTool.attr('title',title);
			}
			if($this.options.chart){
				$this.options.chart.reflow();
			}
		},

		hideLegend: function(){
			var $this = this;
			$this.options.legendContainer.hide();
			if(this.options.hightChartContainer.hasClass("width-remove")){
				this.options.hightChartContainer.removeClass("width-remove");
			}
			this.options.hightChartContainer.addClass("width-add");
			this.options.legendClass = "width-remove";
			var title = $si.i18N.Window.tooltip.legendoff;
			var legendTool = $this.element.parent().find("#legendTool");
			if(legendTool.hasClass("legend-icon")){
				legendTool.removeClass("legend-icon");
			}
            if(legendTool.hasClass("legend-on")){
            	legendTool.removeClass("legend-on");
			}
	            legendTool.addClass("legend-off");
	            legendTool.attr('title',title);

	            $this.options.showLegendDiv = true;
		},

		_setChartDefaultSeriesColors : function() {
			var $this = this;
			try {
				if(this.options.chartObj) {
					var chartDetails = this.options.windowConfig.chartDetails;
					if(chartDetails.defaultSeriesColors) {
						this.options.chartObj.colors = chartDetails.defaultSeriesColors;
					}
				}
			} catch(e) {
				$si.Logger('baseChartWindow').error("Error ["+e.message+"] while setting the default chart series colors" );
			}
		},

		_setChartCustomProperties : function() {
			var $this = this;
			try {
				if(this.options.chartObj) {
					var chartCustomProperties = this.options.windowConfig.customProperties;
					if(chartCustomProperties) {
						$this = this;
						$.each(chartCustomProperties,function(name, value) {
							if(name == "events") {
								try {
									$.each(value, function (index, jsFunction) {
										if($this.options.chartObj.chart.events === undefined) {
											$this.options.chartObj.chart.events = {};
										}
										$this.options.chartObj.chart.events[index] = window[jsFunction];
									});
					           	} catch(e) {
					           		$si.Logger('xyChart').error("Error = ["+e.message+"] occurred while setting chart events");
					           	}
							} else {
								$this.options.chartObj.chart[name] = value;
							}
						});
					}
				}
			} catch(e) {
				$si.Logger('baseChartWindow').error("Error ["+e.message+"] while setting the chart custom properties" );
			}
		},

		_setChartEmbeddedLegendProperties : function() {
			var $this = this;
			try {
				if(this.options.chartObj) {
					var chartDetails = this.options.windowConfig.chartDetails;
					if(chartDetails) {
						if(chartDetails.showEmbeddedLegend == false) {
							this.options.chartObj.legend = {enabled: false};
						} else {
							this.options.chartObj.legend = chartDetails.embeddedLegendProperties;
						}
					}
				}
			} catch(e) {
				$si.Logger('baseChartWindow').error("Error ["+e.message+"] while setting the embedded chart legend properties" );
			}
		},

		_setChartTitles : function() {
			var $this = this;
			try {
				if(this.options.chartObj) {
					var chartDetails = this.options.windowConfig.chartDetails;
					if(chartDetails) {
						//check if title exists, if yes, set the title
						if(chartDetails.title) {
							this.options.chartObj.title = chartDetails.title;
						} else {
							this.options.chartObj.title = null;
						}
						//check if sub-title exists, if yes, set the title
						if(chartDetails.subtitle) {
							this.options.chartObj.subtitle = chartDetails.subtitle;
						} else {
							this.options.chartObj.subtitle = null;
						}


					}
				}

			} catch(e) {
				$si.Logger('baseChartWindow').error("Error ["+e.message+"] while setting the chart titles" );
			}
		},

		_setChartTitleTool : function(){
			var $this = this;
			var chartDetails = this.options.windowConfig.chartDetails;
			var toolbar = $this.options.toolBar;
			if(toolbar){
				var chartTitleTool = $(this.element).closest('.k-window').find("#charttitleTool");
				if(chartDetails.title){
					if(chartTitleTool.hasClass("chart-title-off")){
						chartTitleTool.removeClass("chart-title-off");
					}
					chartTitleTool.addClass("charttitle-icon");
					chartTitleTool.attr('title',$si.i18N.Window.tooltip.charttitle);

				} else {
					chartTitleTool.attr("disabled",true);
					chartTitleTool.addClass("chart-title-off");
					chartTitleTool.attr('title',$si.i18N.Window.tooltip.charttitledisabled);
				}
			}



		},

		_setChartTooltipProperties : function() {
			var $this = this;
			try {
				if(this.options.chartObj) {
					var chartDetails = this.options.windowConfig.chartDetails;
					if(chartDetails.tooltip) {
						if(chartDetails.tooltip.formatter) {
							chartDetails.tooltip.formatter = window[chartDetails.tooltip.formatter];
						} else if(chartDetails.tooltipAttributes && chartDetails.tooltipAttributes.length > 0) {
							chartDetails.tooltip.formatter = function() {
								var toolTip = '<b>'+ this.x +'</b>';
								if(this.points) {
							        toolTip += '<br/>' + this.series.name +': <b>'+ this.y +'</b>';
									$.each(this.points, function(i, data) {
								        $.each(data.point.additionalProperties, function(name, value) {
								            toolTip += '<br/>' + name+': <b>'+ value +'</b>';
								        });
								    });
							    } else {
							    	toolTip += '<br/>' + this.series.name +': <b>'+ this.y +'</b>';
							    	$.each(this.point.additionalProperties, function(name, value) {
							            toolTip += '<br/>' + name+': <b>'+ value +'</b>';
							        });
							    }

							    return toolTip;
							};
						}
						this.options.chartObj.tooltip = chartDetails.tooltip;
					}
				}
			} catch(e) {
				$si.Logger('baseChartWindow').error("Error ["+e.message+"] while setting the embedded chart legend properties" );
			}
		},

		resizeWindow : function(event) {
			var $this = this;
			this._super();
			$((this.element).find("#" + this.options.id + "_outerContainer")).data("kendoSplitter").trigger("resize");
			if($this.options.chart){
				$this.options.chart.reflow();
			}
			if($this.options.grid === null){
				var gridContainer = $(this.element).find("#" + this.options.id + "_gridContainer");
				$this.options.grid =gridContainer[0].component;
			}
			$this.options.grid.reDraw();
			$this.options.grid.rebuild();

		},

		onChangeDropDown : function(e){
			//work in this method or override this method on change event of chart selector
			console.log("change event of chart selector dropdownlist");
		},
		_getWindowConfigurationByProperty : function(name){
			var $this = this;
			var windowConfiguration;
			if(name != undefined){
				windowConfiguration = this.options.windowConfig;
				if(windowConfiguration != undefined){
					return windowConfiguration[name];
				}
			}
    	},


    	_createChartObjects: function () {
    	    var $this = this;
            $this.options.chartObj = new Object();
            $this.options.chartObj.credits = new Object();
            $this.options.chartObj.chart = new Object();
            $this.options.chartObj.series = new Array();
            $this.options.chartObj.plotOptions = new Object();
        },

       _setDefaultChartOptions: function () {
    	    var $this = this;
            $this.options.chartObj.credits.enabled = false;
            $this.options.chartObj.chart.borderRadius = 5;
			$this._setChartDefaultSeriesColors();
            $this._setChartCustomProperties();
            $this._setChartEmbeddedLegendProperties();
            $this._setChartTooltipProperties();
            $this._setChartTitles();
        },

     // Favorite implementation - start
        getWindowContentFavoriteSettings: function () {
            var $this = this;
            var chartFavoriteConfig = {};
            var windowConfig = this.options.windowConfig;
            chartFavoriteConfig.chartLegendsData = this._getChartLegendsProperties();
            chartFavoriteConfig.chartType = this.options.chartType;
            chartFavoriteConfig.valueType = windowConfig.valueType;
            chartFavoriteConfig.dataLabelsInside = windowConfig.chartSeries.defaultSeriesProperties.dataLabels.inside;
            chartFavoriteConfig.showEmbeddedLegend = this.options.chartObj.legend.enabled;
            return chartFavoriteConfig;
        },

        _getChartLegendsProperties: function () {
            var $this = this;
            var chartSeriesProperties = [];
            var series = $this.options.chartLegendFavoriteData;
                if (series && series.length > 0) {
                    for (var i = 0; i < series.length; i++) {
                        chartSeriesProperties.push({
                            "name": series[i].name,
                            "index": i,
                            "visible": series[i].visible,
                        });
                    }
                }


                return chartSeriesProperties;

        },



        _applyChartLegendFavorites: function (chartLegendProperties) {

        },




        applyWindowContentFavoriteSettings: function (favDataObj) {

            var $this = this;
            $this.options.favouriteObj = favDataObj;
            var autorefrshTool = $this.element.parent().find("#autorefreshTool");
            if (autorefrshTool.hasClass("autorefresh-icon")){
 				$this._enableAutoRefresh(true);
 			}else{
 				$this._enableAutoRefresh(false);
 			}
            var tableTool = $this.element.parent().find("#tableTool");
            if (tableTool.hasClass("table-icon")) {
                $this.showTable();
            }else{
            	$this.hideTable();
            }
            var legendTool = $this.element.parent().find("#legendTool");
            if (legendTool.hasClass("legend-on")) {
                $this.showLegend();
            }else{
            	$this.hideLegend();
            }
            if($this.options.grid){
            	$this.options.grid.rebuild();
            }
            if($this.options.chart){
            	$this.options.chart.reflow();
            }

        },

        reset: function () {
        	var $this = this;

            $this.options.favouriteObj=null;
            $this.options.drawerFavouriteObj = null;

            $this._setDefaultToolState();
            $this._setDefaultDrawerSetting();

           	this._super();
        },

		   //method for clear favorite
        _setDefaultDrawerSetting : function(){
           var $this = this;
        	  $this.options.drawer[$this.options.drawerWidget]("clearDrawerSetting", "");
        	  $this._applyDrawerConfigration();

        },

        _applyChartFavorite : function(){
        	var $this= this;
            var chartTitleTool = $(this.element).closest('.k-window').find("#charttitleTool");
            if(chartTitleTool.hasClass("chart-title-off") ){
                 	$this.hideChartTitle();
     		} else {
     				$this.showChartTitle();
     		}

     		var datalabelTool = $this.element.parent().find("#chartdatalabelTool");
            if (datalabelTool.hasClass("chartdatalabel-icon")) {
                datalabelTool.attr('title', $si.i18N.Window.tooltip.chartdatalabel);
                $this.showHideDataLabels(true);
            }else{
             	$this.showHideDataLabels(false);
            }

            $this._applyChartLegendFavorites($this.options.favouriteObj.chartLegendsData);

            if($this.options.drawerFavouriteObj){
                	 $this._applyDrawerSettings($this.options.drawerFavouriteObj);
            }

        },

        //method for clear favorite
        _setDefaultToolState : function(){
        	var $this = this;

			if($this.options.windowConfig && $this.options.windowConfig.chartDetails && !$this.options.windowConfig.chartDetails.showLegend){
				$this.hideLegend();
			}else{

				$this.showLegend();
			}
			if($this.options.windowConfig && $this.options.windowConfig.chartTable && !$this.options.windowConfig.chartTable.showTable){
				$this.hideTable();
			}else{

				$this.showTable();
			}
			$this._setDefaultDataLabels();
			$this._setChartTitleTool();

        },

        //overridden method to sync footer with legend
        updateSeriesDataPointsFooter : function(selectedNode){

        },

        //overridden method for sync between embedded legends and legend window
        _syncLegendData : function(seriesData){
        	var $this = this;
            if(seriesData){
                $.each(seriesData, function (index, value) {
                	$($this.element.find('.highcharts-legend-item')[index]).bind("click",function(e){

                			 $this.options.legendContainer.siViewerChartLegend("updateChartLegendState", {
                	                series: seriesData,
                	            });
                			 $this.updateSeriesDataPointsFooter(e.currentTarget.textContent);
        	});
         });


            }
        },

     // overriden method to retain chart type on chart dropdown selection
        _changeChartType  : function () {

        },

	});
});