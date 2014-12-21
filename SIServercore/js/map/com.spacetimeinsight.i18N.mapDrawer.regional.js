define(['siViewerData'],function($si) {
	$si.i18N.MapDrawer = {
			
			regional :  {
							en : {
									mapSettings 	: "Map Settings",
									importedKML_KMZ : "Imported kml kmz",
									generalSettings	: "General Settings",
									highlightColorPickerLabel : "Map object highlight color",
									singleInfoWindowLabel	  : "Show only one information window at a time",
							},
							fr : {
									mapSettings : "Map Settings",
									importedKML_KMZ : "Imported kml kmz",
									generalSettings	: "General Settings",
									highlightColorPickerLabel : "Map object highlight color",
									singleInfoWindowLabel	  : "Show only one information window at a time",
							},
			},
			setDefaults : function(regionalData) {
				$si.i18N.MapDrawer.regionalData = regionalData;
			},
	};

	$si.i18N.MapDrawer.setDefaults($si.i18N.MapDrawer.regional[$si.viewer.locale]);

});