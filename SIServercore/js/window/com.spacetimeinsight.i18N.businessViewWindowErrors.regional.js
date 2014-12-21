define(['siViewerNamespace','siViewerData','window/com.spacetimeinsight.i18N.businessViewWindowErrors'],function($si) {
	$si.i18N.BusinessViewWindowErrors.regional['en'] =  {
		_onWindowDataLoadSuccess : "Error [#MESSAGE#] occurred while loading the data into window",
	};

	$si.i18N.BusinessViewWindowErrors.setDefaults($si.i18N.BusinessViewWindowErrors.regional[$si.viewer.locale]);
});

