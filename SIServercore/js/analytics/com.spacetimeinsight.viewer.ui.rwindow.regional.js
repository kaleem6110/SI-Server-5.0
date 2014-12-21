define(['siViewerData'],function($si) {
	$si.i18N.REditableParams = {
			
			regional :  {
							en : {
									 controlButtons : {
										reset : "Default Values",
										run : "Run",
										close : "Close",
										}
							},
							fr : {
								
							},
			},
			setDefaults : function(regionalData) {
				$si.i18N.REditableParams.regionalData = regionalData;
			},
	};

	$si.i18N.REditableParams.setDefaults($si.i18N.REditableParams.regional[$si.viewer.locale]);

});