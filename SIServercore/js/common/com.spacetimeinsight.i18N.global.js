define(['siViewerData',],function($si) {
	$si.i18N.Global = {
		businessViewsWindowTitle : "Business Views",
		tooltip : {
		  	   favorite :"Show favorites",
			   clear_filter : "Restore data filters to defaults",
			   drawer : "Show display settings",
			   showDrawer:"Show display settings",
			   hideDrawer:"Hide display settings",
			   showToolbar:'Show toolbar',
			   hideToolbar:'Hide toolbar',
			   minimizeWindow:'Minimize window',
			   maximizeWindow:'Maximize window',
			   restoreWindow:'Restore window',
			   closeWindow:'Close window',
			   autoRefreshOff:'Turn off automatic refresh',
			   autoRefreshOn:'Turn on automatic refresh',
			},

			setDefaults : function(regionalData) {
				$si.i18N.Global.businessViewsWindowTitle = regionalData.businessViewsWindowTitle;
				$si.i18N.Global.tooltip.favorite = regionalData.tooltip.favorite;
				$si.i18N.Global.tooltip.clear_filter = regionalData.tooltip.clear_filter;
				$si.i18N.Global.tooltip.drawer = regionalData.tooltip.drawer;
			},
		filterResetConfirmMessage :"Do you want to reset the filter conditions to default?",
	};

	$si.i18N.Global.regional = [];
});