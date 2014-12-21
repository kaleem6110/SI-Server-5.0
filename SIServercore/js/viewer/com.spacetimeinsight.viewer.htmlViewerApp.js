requirejs.config({
	urlArgs: "bust=V5" ,
	baseUrl: "js/",
	paths: {
		'jquery'				: '../lib/jquery/js/jquery.min',
		'jquery-ui' 			: '../lib/jquery/js/jquery-ui',
		'jquery-xml2json'		: '../lib/jquery/js/jquery.xml2json',
		'jquery.jscrollpane.min': '../lib/jquery/js/jquery.jscrollpane.min',
		'jquery.mousewheel'		: '../lib/jquery/js/jquery.mousewheel',
		'kendo'					: '../lib/kendo/js/kendo.all.min',
		'jquery-maskedinput' 	: '../lib/htmltreegrid/js/jquery.maskedinput',
		'jquery-mb-browser'		: '../lib/htmltreegrid/js/jquery.mb.browser',
		'jquery-mb-browser-min'	: '../lib/htmltreegrid/js/jquery.mb.browser.min',
		'jquery-toaster'		:	'../lib/htmltreegrid/js/jquery.toaster',
		'jquery-ui-menu'		:	'../lib/htmltreegrid/js/jquery.ui.menu',
		'jquery.ui-contextmenu'	:'../lib/htmltreegrid/js/jquery.ui-contextmenu',
		'jquery.ui-contextmenu.min'	:'../lib/htmltreegrid/js/jquery.ui-contextmenu.min',
		'table-bootstrap'		:'../lib/htmltreegrid/js/CustomBootstrap',
		'table-theme'			:'../lib/htmltreegrid/js/themes',
		'table-Grid-API'	:	'common/com.spacetimeinsight.viewer.tableGridUtils',
		'table-compiled-jquery'	:'../lib/htmltreegrid/js/minified-compiled-jquery',
		'jquery.watermarkinput'	: '../lib/htmltreegrid/js/jquery.watermarkinput',
		'logger'    		: '../lib/log4javascript/js/log4javascript',
		'atmosphere'		: '../lib/atmosphere/js/jquery.atmosphere',
		'extensions'        : '../lib/ge/js/extensions',
		'geIntercept'       : 'viewer/com.spacetimeinsight.viewer.interceptOperations',
		'jquery-notify'		: '../lib/jquery/js/jquery.noty',
		'jquery-noty-packaged-min' : '../lib/jquery/js/jquery.noty.packaged.min',
		'inline'		: '../lib/jquery/js/inline',	
		'top-center'		: '../lib/jquery/js/topCenter',		//noty dependent file
		'jquery-default'	: '../lib/jquery/js/default',			//noty dependent file
		'dateTimeFormat'	: '../lib/dateFormattingAPI/moment',	//api for date time formatting
		'components'		: '../lib',
	    'dojo'				: '../lib/dojo',
	    'dijit'				: '../lib/dijit',
	    'dojox'				: '../lib/dojox',
	    'esri'				:  location.protocol + '//js.arcgis.com/3.9amd/js/esri',
		'siViewerNamespace'	: 'common/com.spacetimeinsight.viewer.namespace',
		'siViewerLogger'	: 'common/com.spacetimeinsight.viewer.logger',
		'siViewerData'		: 'common/com.spacetimeinsight.viewer.viewerData',
		'siEventSource'		: 'event/com.spacetimeinsight.viewer.eventSource',
		'siEvents'			: 'event/com.spacetimeinsight.viewer.events',
		'siWebSockets'		: 'common/com.spacetimeinsight.viewer.websocketsutil',
		'siAjaxUtil'		: 'common/com.spacetimeinsight.viewer.ajaxutil',
		'siRouter'			: 'common/com.spacetimeinsight.viewer.router',
		'siSessionTimeOut'	: 'common/com.spacetimeinsight.viewer.sessionTimeOut',
		'siInit'			: 'common/com.spacetimeinsight.viewer.init',
		'siNotification'	: 'common/com.spacetimeinsight.viewer.notification',
		'siDropDownList'	: 'common/com.spacetimeinsight.viewer.ui.dropdown',
		'siDateTimePicker'	: 'common/com.spacetimeinsight.viewer.ui.datetimepicker',
		'siResizeable'		: 'common/com.spacetimeinsight.viewer.ui.resizeable',
		'siDraggable'		: 'common/com.spacetimeinsight.viewer.ui.draggable',
		'siColorPicker'	    : 'common/com.spacetimeinsight.viewer.ui.colorpicker',
		'siCheckBoxList'	: 'common/com.spacetimeinsight.viewer.ui.checkboxList',
		'siComboBox'		: 'common/com.spacetimeinsight.viewer.ui.comboBox',
		'siDatePicker'      : 'common/com.spacetimeinsight.viewer.ui.datepicker',
		'windowUtil'		: 'common/com.spacetimeinsight.viewer.windowUtil',
		'businessViewUtil'	: 'businessView/com.spacetimeinsight.viewer.businessViewUtil',
		'stringUtil'		: 'common/com.spacetimeinsight.viewer.stringUtil',
		'dialogBox'         : 'common/com.spacetimeinsight.viewer.ui.DialogBox',
		'uiUtils'			: 'util/com.spacetimeinsight.viewer.uiUtils',
		'mapUtils'			: 'util/com.spacetimeinsight.viewer.mapUtils',
		'filterUtils'		: 'util/com.spacetimeinsight.viewer.filterUtils',
		'baseWidget'		: 'common/com.spacetimeinsight.viewer.ui.baseWidget',
		'highchart'         :  '../lib/highsoft/js/highcharts/highcharts',
		'heatmap'         	:  '../lib/highsoft/js/modules/heatmap',
		'highchart-more'    :  '../lib/highsoft/js/highcharts/highcharts-more',
		'highcharts-solid-gauge' :  '../lib/highsoft/js/highcharts/highcharts-solid-gauge',
		'highstock'      	:  '../lib/highsoft/js/highstock/highstock',
		'jtreemap'          :  '../lib/jquery/js/jquery.ui.treemap',
		'jquery-format' 	:  '../lib/jquery/js/jquery.format-1.3',
	},
	/*
	packages: [
        {
            name: 'dojo',
            location: "http://js.arcgis.com/3.9/js/dojo/dojo/"
        },
        {
            name: 'dojox',
            location: "http://js.arcgis.com/3.9/js/dojo/dojox"
        },
        {
            name: 'dijit',
            location: "http://js.arcgis.com/3.9/js/dojo/dijit"
        },
        {
            name: 'esri',
            location: "http://js.arcgis.com/3.9/"
        }
    ], */
	shim: {
		"jquery-ui": ["jquery"],
		"kendo": ["jquery","jquery-ui"],
//		"table-compiled-jquery" :["jquery","jquery-ui"],
		"table-theme" :["table-compiled-jquery"],
//		"table-bootstrap" :["table-compiled-jquery","jquery","jquery-ui"],
		"viewer/com.spacetimeinsight.viewer.ui.htmlViewer" : ["kendo","logger","siViewerData","siRouter", 'viewer/com.spacetimeinsight.i18N.application','viewer/com.spacetimeinsight.i18N.application.regional'],
		"top-center"									   : ['jquery-notify'],
		"jquery-default"								   : ['jquery-notify'],
		"highchart"                                        : ['jquery'],
		"heatmap"										   : ['highchart'],
		"highchart-more"								   : ['highchart'],
		"highcharts-solid-gauge"						   : ['highchart'],
		"highchart"								   		   : ['highstock'],

	},
	waitSeconds: 60
});

//requirejs.onError = function (err) {
//	if(err.requireType === 'timeout' || err.requireType === 'scripterror'){
//		alert(err.message);
//	} else {
//		throw err;
//	}
//};

requirejs(["jquery","table-compiled-jquery","table-theme",
           "viewer/com.spacetimeinsight.viewer.ui.htmlViewer"],function(){
			$('body').append("<div id='htmlViewer' class='htmlViewer'></div>");
			$("#htmlViewer").siViewerHtmlViewer({});
			
			$(window).unload(function() {
				 $si.businessViewUtil.selectDeselectBusinessViewList([]);
			});
		});