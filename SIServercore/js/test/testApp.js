requirejs.config({
	baseUrl: "js/core/",
	paths: {
		'jquery'	: '../../lib/jquery/jquery.min',
		'jquery-ui' : '../../lib/jquery/jquery-ui',
		'kendo'		: '../../lib/kendo/js/kendo.all.min',
		'config'    : 'si.config',
		'logger'    : '../../lib/log4javascript/log4javascript',

		"testData"  : '../testData'
	},
	shim: {
		"jquery-ui": ["jquery"],
		"kendo": ["jquery","jquery-ui"],
		"siViewer.htmlViewer" : ["kendo","logger"],
	//	"siViewer.dataFilter" : ["filterCriteria","siViewer.window"],
		"si.viewer" : ["config"],
		"si.logger":["si.viewer"],
		"logger" : ["config"]
	},
	waitSeconds: 7
});

// Load the main app module to start the app
requirejs(["../test/testMain"]);