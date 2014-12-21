define(['siViewerData',],function($si) {
	$si.i18N.BusinessViewWindowErrors = {
		_onWindowDataLoadSuccess : "Error [#MESSAGE#] occurred while loading the data into window",
		_invokeWindowDataService : "Error [#MESSAGE#] invoking data services",
		_initializeWindowConfigOptions : "Error [#MESSAGE#] initializing window config options",
		_unbindEvents: "Error [#MESSAGE#] unbinding events",
		_bindControls :"Error [#MESSAGE#] binding controls",
		_initializeRefreshTimer : "Error [#MESSAGE#] initializing refresh timer",
		_onWindowDataLoadFailure : "Error while getting the data. Cause :- [#MESSAGE#]",
		_openDataFilterWindow : "Error opening data filter window. Cause :- [#MESSAGE#]",
		_openTimeFilterWindow:"Error opening time filter window. Cause :- [#MESSAGE#]",
		_openRWindow:"Error opening R window. Cause :- [#MESSAGE#]",
		onAnalysisControlClick:"Error applying R Analysis. Cause :- [#MESSAGE#]",
		_onanalysisCompleted:"Analysis Name completed successfully",
		_applyFavorite:"Error applying window favorite. Cause :- [#MESSAGE#]",
		applyFilter:"Error applying data filter. Cause :- [#MESSAGE#]",
		_setTimeFilterCriteria:"Error applying time filter. Cause :- [#MESSAGE#]",
		_setRunAnalyticsParams:"Error applying R Analysis. Cause :- [#MESSAGE#]",
		_enableAutoRefresh:"Error enabling auto refresh. Cause :- [#MESSAGE#]",
		initializeWindow:"Error initializing windows. Cause :- [#MESSAGE#]",
		loadExternalResources:"Error loading external resources. Cause :- [#MESSAGE#]",
		onMapCameraMove : "Error applying camera move event. Cause :- [#MESSAGE#]",
		onGlobalEvent:"Error applying gobal events. Cause :- [#MESSAGE#]",
		onLassoApplyAlgorithm:"Error applying lasso filters. Cause :- [#MESSAGE#]",
		closeDataFilter:"Error closing data filter window. Cause :- [#MESSAGE#]",
		closeTimeFilter:"Error closing time filter window. Cause :- [#MESSAGE#]",
		_onPeriodicRefresh:"Error applying periodic refresh. Cause :- [#MESSAGE#]",
		_clearRefreshTimer:"Error clearing refresh timers. Cause :- [#MESSAGE#]",
		_clearTimerNotification:"Time Filter has been cleared",
		applyToolBarFavoriteSettings :"Error applying toolbar favorite settings. Cause :- [#MESSAGE#]",
		applyDrawerFavoriteSettings:"Error applying drawer favorite settings. Cause :- [#MESSAGE#]",
		applyWindowContentFavoriteSettings:"Error applying window favorite settings. Cause :- [#MESSAGE#]",
		_getFavoriteDetails:"Error getting favorite settings. Cause :- [#MESSAGE#]",
		clearFavorite:"Error clearning favorite settings. Cause :- [#MESSAGE#]",
		resetToolBar:"Error reseting toolbar. Cause :- [#MESSAGE#]",
		resetDrawer:"Error reseting drawer. Cause :- [#MESSAGE#]",
		reset:"Error reseting window. Cause :- [#MESSAGE#]",
		setDefaultFavorite:"Error applying default favorite. Cause :- [#MESSAGE#]",
		initializingWindow:"Window Initialization error :- [#MESSAGE#]",
		setDefaults : function(regionalData) {
/*				$si.i18N.BusinessViewWindowErrors._onWindowDataLoadSuccess = regionalData._onWindowDataLoadSuccess;
				$si.i18N.BusinessViewWindowErrors._invokeWindowDataService = regionalData._invokeWindowDataService;
				$si.i18N.BusinessViewWindowErrors._initializeWindowConfigOptions = regionalData._initializeWindowConfigOptions;
				$si.i18N.BusinessViewWindowErrors._unbindEvents = regionalData._unbindEvents;
				$si.i18N.BusinessViewWindowErrors._initializeRefreshTimer = regionalData._initializeRefreshTimer;
				$si.i18N.BusinessViewWindowErrors._onWindowDataLoadFailure = regionalData._onWindowDataLoadFailure;
				$si.i18N.BusinessViewWindowErrors._openDataFilterWindow = regionalData._openDataFilterWindow;
				*/
		},
	};
	$si.i18N.BusinessViewWindowErrors.regional = [];
});