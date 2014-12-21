/**
 * This is the base class for the Export as CSV module.
 * In this we have added the containerDiv and the footerDiv.
 * In the container div we will add all the contents related to the module which we are using to download as CSV.
 * In the footer div we have the download and the cancel button. Download button will submit the form and cancel button
 * will close the window.
 */
define([
    'jquery',
    'jquery-ui',
    'kendo',
    'siSessionTimeOut',
    'common/com.spacetimeinsight.viewer.namespace',
    'viewer/com.spacetimeinsight.i18N.application',
    'viewer/com.spacetimeinsight.i18N.application.regional',
    'dateTimeFormat',
],function($){

	$.widget('spacetimeinsight.siViewerExportViewer',{
		options : {
			alertExportJS : "viewer/com.spacetimeinsight.viewer.alertExportAsCSV",
			alertExportPluginName 	: "siAlertExportAsCSV",
			clientSideTableExportJS : "window/tableWindow/com.spacetimeinsight.viewer.clientSideTableExportAsCSV",
			clientSideTableExportPluginName : "siClientSideTableExportAsCSV" ,
			serverSideTableExportJS : "window/tableWindow/com.spacetimeinsight.viewer.serverSideTableExportAsCSV",
			serverSideTableExportPluginName : "siServerSideTableExportAsCSV" ,
			xyChartExportJS : "window/charts/xyChart/com.spacetimeinsight.viewer.xyChartExportAsCSV",
			xyChartExportPluginName : "siXYChartExportAsCSV" ,
			treemapChartExportJS : "window/charts/treemapChart/com.spacetimeinsight.viewer.treemapChartExportAsCSV",
			treemapChartExportPluginName : "siTreemapChartExportAsCSV" ,
			radarChartExportJS : "window/charts/radarChart/com.spacetimeinsight.viewer.radarChartExportAsCSV",
			radarChartExportPluginName : "siRadarChartExportAsCSV" ,
			meterChartExportJS : "window/charts/meterChart/com.spacetimeinsight.viewer.meterChartExportAsCSV",
			meterChartExportPluginName : "siMeterChartExportAsCSV" ,
			pieChartExportJS: "window/charts/pieChart/com.spacetimeinsight.viewer.pieChartExportAsCSV",
			pieChartExportPluginName: "siPieChartExportAsCSV",
			exportNameConstant		: "si_export_"
		},

		NAMESPACE : "com.spacetimeinsight",
		pluginName:"siViewerExportViewer",

		DIV : kendo.template("<div id ='#= id #'  > </div>"),
		BUTTON : kendo.template("<button id ='#= id #' class = '#= cssName#' >#= text #</button>"),

		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			this._initializeBaseComponents();
			this._bindBaseControls();
			//Session Tracking
			$si.sessionTimeOut.initialize();
		},
		
		_initializeBaseComponents : function(){
			var $this = this;
			$this.element.append($this.DIV({id : "saveInfo"}));
			var saveInfoDiv = $this.element.find("#saveInfo");
			saveInfoDiv.addClass("ev-info");
			saveInfoDiv.append($si.i18N.Application.exportLabels.saveInfo);
			$this.element.append($this.DIV({id : "containerDiv"}));
			$this.element.append($this.DIV({id : "footerDiv"}));
			var footer = $this.element.find("#footerDiv");
			footer.append($this.BUTTON({id : "downloadButton",cssName : "apply-button", text : $si.i18N.Application.exportLabels.downloadButton}));
			footer.append($this.BUTTON({id : "closeButton",cssName : "cancel-button", text : $si.i18N.Application.exportLabels.closeButton}));
			footer.addClass("ev-footer-container");
		},
		
		_bindBaseControls : function(){
			var $this = this;
			var footer = $this.element.find("#footerDiv");
			footer.find("#closeButton").click(function(){
				$("#exportAsCsv").get(0).action="";
				window.close();
			});
			footer.find("#downloadButton").click(function(){
				var isValidated = true;
				isValidated = $this.validateForm();
				if(isValidated){
					try {
					//Submitting the form to download the CSV file.
						$("#exportAsCsv").get(0).submit();
	    			} catch (err) {
	        			console.log(err.description || err);
	    			}
				}else{
					return false;
				}
				
			});
		},
		
		validateForm : function(){},
	});
});