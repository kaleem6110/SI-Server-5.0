define(['siViewerData',],function($si) {
	$si.i18N.Window = {
			tooltip :{
			   favorite :"Show favorites",
	 		   filter : "Edit data filters",
			   timecontrol : "Edit time filter",
			   refresh :"Refresh window",
			   autorefresh : "Turn on automatic refresh",
			   autorefreshoff : "Turn off automatic refresh",
			   autorefreshDisabled : "Autorefresh is not set",
			   saveas : "Save data to external file",
			   exception : "Show recent errors",
			   inlinefilter : "Show inline filter",
			   hideinlinefilter : "Hide inline filter",
			   disabledinlinefilter : "Inline filter not defined",
			   freeze : "Enable column freeze",
			   unfreeze : "Disable column freeze",
			   locate : "Zoom to location on map",
			   analysis : "Run data analysis",
			   chartselector : "Select chart type",
			   table :"Hide data table",
			   tableoff :"Show data table",
			   legend : "Hide chart legend",
			   legendoff : "Show chart legend",
			   chart : "Hide chart",
			   chartoff : "Show chart",
			   charttitle : "Show chart title",
			   charttitleoff : "Hide chart title",
			   charttitledisabled : "Chart title not set",
			   chartdatalabel : "Hide data labels",
			   chartdatalabeloff : "Show data labels",
			   chartdatalabeldisabled : "Chart data labels not set",
			   charttype:"Select chart type",
			   highlight : "Show highlight on map",
			   zoom : "Zoom to location on map",	
			  
			   },
			rightMenuTitles :{
				sortAscending :"Sort Ascending",
				sortDescending : "Sort Descending",
				cancelSort : "Cancel Sort",
				hideColumn : "Hide Column",
				aggregation : "Aggregation",
				cancelAllSorts :"Cancel All Sorts",
				clearFilter : "Clear Inline Filters",
				sum : "Sum",
				count : "Count",
				average : "Average",
				min : "Min",
				max : "Max",
				
			},
			displaySettings : "",
			tableSettings : "",
			numberOf : "",
			columnsToFreeze :"",
			zoomtoThisAltitude : "",
			whenzoomActive : "",
			tableToMapCoordinateSettings : "",
			showItemOnMap : "",
			panZoomOnMap : "",
			showHideColumns : "",
			clickColumnToAddToTable : "",
			noColumnsToDisplay : "",
			footerLastUpdatedDate :  "* Last update ",
			footerLabelSelectedChartSeries : "Data series selected:",
			footerLabelChartData : "Total data points:",
			dataSeriesSelected : "",
			totalDataPoints : "",
			footerLabelTotalRows : "Rows : ",
			tableLevel : "",
			displaySettings : "",
			
			grid : "",
			titles : "",
			title : "",
			guildlines : "",
			dataLabel : "",
			xaxis : "",
			yaxis : "",
			tickMarks : "",
			reverseOrder : "",
			revOrder : "",
			dtLabel : "",
			tckMarks : "",
		
		
		setDefaults : function(regionalData) {
				$si.i18N.Window.tooltip.favorite = regionalData.tooltip.favorite;
				$si.i18N.Window.tooltip.filter = regionalData.tooltip.filter;
				$si.i18N.Window.tooltip.timecontrol = regionalData.tooltip.timecontrol;
				$si.i18N.Window.tooltip.refresh = regionalData.tooltip.refresh;
				$si.i18N.Window.tooltip.autorefresh = regionalData.tooltip.autorefresh;
				$si.i18N.Window.tooltip.autorefreshon = regionalData.tooltip.autorefreshoff;
				$si.i18N.Window.tooltip.saveas = regionalData.tooltip.saveas;
				$si.i18N.Window.tooltip.exception = regionalData.tooltip.exception;
				$si.i18N.Window.tooltip.inlinefilter = regionalData.tooltip.inlinefilter;
				$si.i18N.Window.tooltip.hideinlinefilter = regionalData.tooltip.hideinlinefilter;
				$si.i18N.Window.tooltip.disabledinlinefilter = regionalData.tooltip.disabledinlinefilter;
				$si.i18N.Window.tooltip.freeze = regionalData.tooltip.freeze;
				$si.i18N.Window.tooltip.unfreeze = regionalData.tooltip.unfreeze;
				$si.i18N.Window.tooltip.locate = regionalData.tooltip.locate;
				$si.i18N.Window.tooltip.analysis =  regionalData.tooltip.analysis;
				$si.i18N.Window.tooltip.chartselector = regionalData.tooltip.chartselector;
				$si.i18N.Window.tooltip.table = regionalData.tooltip.table;
				$si.i18N.Window.tooltip.tableoff = regionalData.tooltip.tableoff;
				$si.i18N.Window.tooltip.legend = regionalData.tooltip.legend;
				$si.i18N.Window.tooltip.legendoff = regionalData.tooltip.legendoff;
				$si.i18N.Window.tooltip.chart = regionalData.tooltip.chart;
				$si.i18N.Window.tooltip.chartoff = regionalData.tooltip.chartoff;
				$si.i18N.Window.tooltip.charttitle = regionalData.tooltip.charttitle;
				$si.i18N.Window.tooltip.charttitleoff = regionalData.tooltip.charttitleoff;
				$si.i18N.Window.tooltip.charttitledisabled = regionalData.tooltip.charttitledisabled;
				
				$si.i18N.Window.tooltip.chartdatalabel = regionalData.tooltip.chartdatalabel;	
				$si.i18N.Window.tooltip.chartdatalabeloff = regionalData.tooltip.chartdatalabeloff;	
				$si.i18N.Window.tooltip.chartdatalabeldisabled = regionalData.tooltip.chartdatalabeldisabled;	
				
				$si.i18N.Window.rightMenuTitles.sortAscending 	 = regionalData.rightMenuTitles.sortAscending;
				$si.i18N.Window.rightMenuTitles.sortDescending 	= regionalData.rightMenuTitles.sortDescending;
				$si.i18N.Window.rightMenuTitles.cancelSort 		= regionalData.rightMenuTitles.cancelSort;
				$si.i18N.Window.rightMenuTitles.hideColumn 		= regionalData.rightMenuTitles.hideColumn;
				$si.i18N.Window.rightMenuTitles.aggregation 	= regionalData.rightMenuTitles.aggregation;
				$si.i18N.Window.rightMenuTitles.cancelAllSorts 	= regionalData.rightMenuTitles.cancelAllSorts;
				$si.i18N.Window.rightMenuTitles.clearFilter = regionalData.rightMenuTitles.clearFilter;
				$si.i18N.Window.rightMenuTitles.sum 		= regionalData.rightMenuTitles.sum;
				$si.i18N.Window.rightMenuTitles.count 		= regionalData.rightMenuTitles.count;	
				$si.i18N.Window.rightMenuTitles.average 	= regionalData.rightMenuTitles.average;	
				$si.i18N.Window.rightMenuTitles.min 		= regionalData.rightMenuTitles.min;
				$si.i18N.Window.rightMenuTitles.max		    = regionalData.rightMenuTitles.max;
				
				$si.i18N.Window.displaySettings = regionalData.displaySettings;
				$si.i18N.Window.tableSettings = regionalData.tableSettings;
				$si.i18N.Window.numberOf = regionalData.numberOf;
				$si.i18N.Window.columnToFreeze = regionalData.columnsToFreeze;
				$si.i18N.Window.tableToMapCoordinateSettings = regionalData.tableToMapCoordinateSettings ;
				$si.i18N.Window.zoomtoThisAltitude =  regionalData.zoomtoThisAltitude;
				$si.i18N.Window.whenzoomActive = regionalData.whenzoomActive;
				$si.i18N.Window.showItemOnMap = regionalData.showItemOnMap;
				$si.i18N.Window.panZoomOnMap = regionalData.panZoomOnMap;
				$si.i18N.Window.showHideColumns = regionalData.showHideColumns;
				$si.i18N.Window.clickColumnToAddToTable = regionalData.clickColumnToAddToTable;
				$si.i18N.Window.noColumnsToDisplay = regionalData.noColumnsToDisplay;
				$si.i18N.Window.footerLastUpdatedDate = regionalData.footerLastUpdatedDate;
				$si.i18N.Window.footerLabelSelectedChartSeries = regionalData.footerLabelSelectedChartSeries;
				$si.i18N.Window.footerLabelChartData = regionalData.footerLabelChartData;
				$si.i18N.Window.footerLabelTotalRows = regionalData.footerLabelTotalRows;
				$si.i18N.Window.displaySettings =  regionalData.displaySettings;
				$si.i18N.Window.tableLevel = regionalData.tableLevel;
				
				$si.i18N.Window.grid = regionalData.grid;
				$si.i18N.Window.titles = regionalData.titles;
				$si.i18N.Window.title = regionalData.title;
				$si.i18N.Window.guildlines = regionalData.guildlines;
				$si.i18N.Window.dataLabel = regionalData.dataLabel;
				$si.i18N.Window.xaxis = regionalData.xaxis;
				$si.i18N.Window.yaxis = regionalData.yaxis;
				$si.i18N.Window.tickMarks = regionalData.tickMarks;
				$si.i18N.Window.reverseOrder = regionalData.reverseOrder;
				
				$si.i18N.Window.revOrder = regionalData.revOrder;
				$si.i18N.Window.dtLabel = regionalData.dtLabel;
				$si.i18N.Window.tckMarks = regionalData.tckMarks;	
				$si.i18N.Window.dataSeriesSelected=regionalData.dataSeriesSelected;
				$si.i18N.Window.totalDataPoints=regionalData.totalDataPoints;
			},
	};

	$si.i18N.Window.regional = [];
});