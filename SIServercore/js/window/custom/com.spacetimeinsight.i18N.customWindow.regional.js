define(['siViewerNamespace','siViewerData','window/com.spacetimeinsight.i18N.window'],function($si) {
	$si.i18N.customWindow.regional['en'] =  $si.i18N.window.regional['en'];
	//Set Custom  properties
	$si.i18N.customWindow.setDefaults($si.i18N.window.regional[$si.viewer.locale]);
});

