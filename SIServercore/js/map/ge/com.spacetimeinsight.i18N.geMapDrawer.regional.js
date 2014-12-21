define(['siViewerData'],function($si) {
	$si.i18N.GEDrawer = {
			
			regional :  {
							en : {
									geLayers 			: "Google Public or Enterprise Layers",
									geOverLayFeatures 	: "Google Earth OverLay Features",
									overlayfeatures 	: "Overlay Features",
									rootfolder 			: "rootfolder",
									atmosphere 			: "Atmosphere",
									grid 				: "Grid",
									navigationControl 	: "Navigation Control",
									overviewMap 		: "Overview Map",
									scaleLegend 		: "Scale Legend",
									statusBar 			: "Status Bar",
									streetView 			: "Street View",
									sun 				: "Sun",
									
							},
							fr : {
								geLayers 			: "Google Public or Enterprise Layers",
								geOverLayFeatures 	: "Google Earth OverLay Features",
								overlayfeatures 	: "Overlay Features",
								rootfolder 			: "rootfolder",
								atmosphere 			: "Atmosphere",
								grid 				: "Grid",
								navigationControl 	: "Navigation Control",
								overviewMap 		: "Overview Map",
								scaleLegend 		: "Scale Legend",
								statusBar 			: "Status Bar",
								streetView 			: "Street View",
								sun 				: "Sun",
							},
			},
			setDefaults : function(regionalData) {
				$si.i18N.GEDrawer.regionalData = regionalData;
			},
	};

	$si.i18N.GEDrawer.setDefaults($si.i18N.GEDrawer.regional[$si.viewer.locale]);

});