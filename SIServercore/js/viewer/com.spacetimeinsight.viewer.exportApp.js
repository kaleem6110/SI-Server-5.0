/**
 * 
 */
requirejs.config({
	baseUrl: "js/",
	paths: {
		'jquery'				: '../lib/jquery/js/jquery.min',
		'jquery-ui' 			: '../lib/jquery/js/jquery-ui',
		'kendo'					: '../lib/kendo/js/kendo.all.min',
		'logger'    		: '../lib/log4javascript/js/log4javascript',
		'atmosphere'		: '../lib/atmosphere/js/jquery.atmosphere',
		'jquery-xml2json'	: '../lib/jquery/js/jquery.xml2json',
		'siViewerNamespace'	: 'common/com.spacetimeinsight.viewer.namespace',
		'siViewerLogger'	: 'common/com.spacetimeinsight.viewer.logger',
		'siViewerData'		: 'common/com.spacetimeinsight.viewer.viewerData',
		'siSessionTimeOut'	: 'common/com.spacetimeinsight.viewer.sessionTimeOut',
		'siAjaxUtil'		: 'common/com.spacetimeinsight.viewer.ajaxutil',
		'siRouter'			: 'common/com.spacetimeinsight.viewer.router',
		'siWebSockets'		: 'common/com.spacetimeinsight.viewer.websocketsutil',
		'dateTimeFormat'	: '../lib/dateFormattingAPI/moment',

	},
	shim: {
		"jquery-ui": ["jquery"],	
		"kendo": ["jquery","jquery-ui"],
	},
	waitSeconds: 7
});
/*
 * Here we are fetching the parameters that we have passed while opening this window.
 * All the parameters will be present in the params object.
 */
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}
	
/*
 * Here we are checking the js file name and opening the corresponding window. We will also specify the rendererType for this window.
 */
if(params.jsFileName == "alerts"){
	requirejs(["jquery","jquery-ui","viewer/com.spacetimeinsight.viewer.alertExportAsCSV"],function(){
		$('form').append("<div id='exportViewer' class='exportViewer'></div>");
		$("#renderertype").val("com.spacetimeinsight.renderer.viewer.AlertExportAsCSVRenderer");
		$("#exportViewer").siAlertExportAsCSV({});
	});
}else if(params.jsFileName == "clientSideTable"){
	requirejs(["jquery","jquery-ui","window/tableWindow/com.spacetimeinsight.viewer.clientSideTableExportAsCSV"],function(){
		$('form').append("<div id='exportViewer' class='exportViewer'></div>");
		$("#renderertype").val("com.spacetimeinsight.renderer.window.impl.WindowRenderer");
		$("#exportViewer").siClientSideTableExportAsCSV({});
	}); 
}else if(params.jsFileName == "serverSideTable"){
	requirejs(["jquery","jquery-ui","window/tableWindow/com.spacetimeinsight.viewer.serverSideTableExportAsCSV"],function(){
		$('form').append("<div id='exportViewer' class='exportViewer'></div>");
		$("#renderertype").val("com.spacetimeinsight.renderer.window.impl.WindowRenderer");
		$("#exportViewer").siServerSideTableExportAsCSV({});
	}); 
}else if(params.jsFileName == "xyChart"){
	requirejs(["jquery","jquery-ui","window/charts/xyChart/com.spacetimeinsight.viewer.xyChartExportAsCSV"],function(){
		$('form').append("<div id='exportViewer' class='exportViewer'></div>");
		$("#renderertype").val("com.spacetimeinsight.renderer.window.impl.WindowRenderer");
		$("#exportViewer").siXYChartExportAsCSV({});
	}); 
}else if(params.jsFileName == "treemapChart"){
	requirejs(["jquery","jquery-ui","window/charts/treemapChart/com.spacetimeinsight.viewer.treemapChartExportAsCSV"],function(){
		$('form').append("<div id='exportViewer' class='exportViewer'></div>");
		$("#renderertype").val("com.spacetimeinsight.renderer.window.impl.WindowRenderer");
		$("#exportViewer").siTreemapChartExportAsCSV({});
	}); 
}else if(params.jsFileName == "radarChart"){
	requirejs(["jquery","jquery-ui","window/charts/radarChart/com.spacetimeinsight.viewer.radarChartExportAsCSV"],function(){
		$('form').append("<div id='exportViewer' class='exportViewer'></div>");
		$("#renderertype").val("com.spacetimeinsight.renderer.window.impl.WindowRenderer");
		$("#exportViewer").siRadarChartExportAsCSV({});
	}); 
}else if(params.jsFileName == "meterChart"){
	requirejs(["jquery","jquery-ui","window/charts/meterChart/com.spacetimeinsight.viewer.meterChartExportAsCSV"],function(){
		$('form').append("<div id='exportViewer' class='exportViewer'></div>");
		$("#renderertype").val("com.spacetimeinsight.renderer.window.impl.WindowRenderer");
		$("#exportViewer").siMeterChartExportAsCSV({});
	}); 
}else if(params.jsFileName == "pieChart"){
	requirejs(["jquery","jquery-ui","window/charts/pieChart/com.spacetimeinsight.viewer.pieChartExportAsCSV"],function(){
		$('form').append("<div id='exportViewer' class='exportViewer'></div>");
		$("#renderertype").val("com.spacetimeinsight.renderer.window.impl.WindowRenderer");
		$("#exportViewer").siPieChartExportAsCSV({});
	}); 
}else{
	requirejs(["jquery","jquery-ui","viewer/com.spacetimeinsight.viewer.ui.exportViewer"],function(){
		$('body').append("<div id='exportViewer' class='exportViewer'></div>");
		$("#exportViewer").siViewerExportViewer({});
	});
}
