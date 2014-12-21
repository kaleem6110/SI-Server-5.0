define(['siViewerData'],function($si) {
	$si.i18N.EsriDrawer = {
			
			regional :  {
							en : {
									baseMaps			: "Base Maps",
									esriLayers 			: "Esri Layers",
									esriOverLayFeatures : "Esri OverLay Features",
									zoomSlider			 : "Change map zoom level",
							},
							fr : {
								baseMaps			: "Base Maps",
								esriLayers 			: "Esri Layers",
								esriOverLayFeatures : "Esri OverLay Features",
								zoomSlider : "Change map zoom level",
							},
			},
			setDefaults : function(regionalData) {
				$si.i18N.EsriDrawer.regionalData = regionalData;
			},
	};

	$si.i18N.EsriDrawer.setDefaults($si.i18N.EsriDrawer.regional[$si.viewer.locale]);

});