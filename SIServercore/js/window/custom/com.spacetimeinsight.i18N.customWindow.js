define(['siViewerData',],function($si) {
		$si.i18N.CustomWindow = $si.i18N.window;
		//Custom data to come here
		$si.i18N.CustomWindow.tooltip.customData :"CustomData";
		
		setDefaults : function(regionalData) {
			$si.i18N.window.setDefaults(regionalData);
			//Custom i18N configrations to come here
		},
	};

	$si.i18N.Window.regional = [];
});