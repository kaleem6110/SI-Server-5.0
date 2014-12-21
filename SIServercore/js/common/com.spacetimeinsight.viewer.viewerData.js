define(['siViewerNamespace','kendo'],function($si) {
    var viewer = $si.createNameSpace("spacetimeinsight.viewer");
    viewer.serverUrl = "";
    viewer.initialized = false;
    viewer.locale ='en';
	viewer.queryParams = {};
	viewer.customerLogoModel="";
    viewer.alertConfigData = {},
    viewer.alertAckInitData = {},
    viewer.drawerdata = [],
	viewer.favoriteOpenBusinessViewWindows = {};
	viewer.pluginIntialized =false;
	//set to true if shim is required in windows
	viewer.isShimRequiredForWindows = false;
	//set to true or false depending on whether its required to show Map View in right click menu
    viewer.requiresMapViewInBusinessViewRightclickMenu = true;
	viewer.hasSetGlobalChartOptions = false;
	viewer.timeZoneOffset = 0;
	//constants for lassob
	viewer.LASSO_SHAPES = {POLYGON:1, CIRCLE:2, RECTANGLE:3};
	viewer.lassoShapesData = kendo.observable({
		lassoData : [],
    });
	viewer.selectedLassosData = kendo.observable({
		selectedLassosArray : [],
    });
	viewer.favoritesData = [];
	viewer.favoritesData["businessView"] = [];
    viewer.businessView = {};
 	viewer.isSSO = "";
 	viewer.customerLogoModel = kendo.observable({
 									customerLogo : "",
 								});
    viewer.businessViewObserver = kendo.observable({
                                businessView : viewer.businessView,
                            });


    viewer.components = {};
    viewer.windowMetadataModel = kendo.observable({
                                    arrWindowMetadata : [],
                                });

	viewer.alertDataModel = kendo.observable({
									isEnabled : "false",
									isAlarmEnabled : true,
									alertMessage : [],
									alertAckMessage : [],
									alertPriorityModeMasterData : [],
									noOfAlerts : "0",
								});

	viewer.summaryDashboardDataModel = kendo.observable({
		dataProvider : [],
	});

	viewer.dashboardConfigModel = kendo.observable({
		dashboardConfig : [],
	});

	viewer.legendDataModel = kendo.observable({
				legendData :[],

	});
    //Added exportTypes
    viewer.exportTypes = ["KML","KMZ","GeoRSS"];



    viewer.businessViewFavoriteDataMyFav={};

    viewer.manageFavoriteData = kendo.observable({
    	});

    viewer.userModel = kendo.observable({
							userInfo : {},
							modules : [],
							locale : [],
							themes : [],
							portalPreferences : {},
			});

	viewer.privilegeObservable =  kendo.observable({
		privileges : null,
	});



    viewer.selectedModuleModel = kendo.observable({
    						selectedModule : {},
			});

	viewer.preferenceValues = {};

	//For client side exporttoCSV
	viewer.clientSideColumnDetails = {};

	//For Treemap chart exporttoCSV
	viewer.treemapChartColumnDetails = {};
	//For radar chart exporttoCSV
	//viewer.radarChartColumnDetails = [];


	/*Added the websockets object. In this we have added all the websockets references which
	we will use to disconnect when the htmlViewer is unloaded.
	*/
	viewer.websockets = {
		ecoSystemEventsWS : {},
		globalEventsWS : {},
		alertsWS : {},
		alertAckWS : {},
		moduleLevelEventsWS : {},
	};

/*
  //Use to store selected layers and made server call to load data on GE and get dashboard Data
    // format each item is { layerId,layerUrl,isSelected,windows,artifactname,ecosid,attribute}
	viewer.businessViewModel = kendo.observable({
							selectedBusinessViews : [],
						});
*/

	//Format for notification :  businessView : kendo.observable({
										//	notification : []
										//	});
	viewer.notification = kendo.observable({
						});

	viewer.esriMapLayerModel = kendo.observable({
								defaultMapLayer : null,
								defaultOpacity 	: 0,
								allMapLayers : [],
						});

	/** use to publish enterprise map layers **/
	viewer.mapLayerModel = kendo.observable({
								layers : [],
							});

	viewer.isAppToolBarEnabled = false;

	viewer.globaltimerange=[];

	//Object for saving the build info that will be used in the about window.
	viewer.buildInfo = {
		buildVersion : "",
		buildId : "",
	};
	viewer.exportWindow = null;
    return $si;
});