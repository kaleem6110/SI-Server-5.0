define(['siViewerData','common/com.spacetimeinsight.i18N.global'],function($si) {
	$si.i18N.Global.regional['en'] =  {
		businessViewsWindowTitle : "Business Views",
		tooltip : {
		  	   favorite :"Show favorites",
			   clear_filter : "Return all filters to system settings",
			},
	};
	
	$si.i18N.Global.regional['fr'] =  {
		businessViewsWindowTitle : "Business Views",
		tooltip : {
		  	   favorite :"Show favorites",
			   clear_filter : "Return all filters to system settings",
		},
	};	

	$si.i18N.Global.setDefaults($si.i18N.Global.regional[$si.viewer.locale]);

});