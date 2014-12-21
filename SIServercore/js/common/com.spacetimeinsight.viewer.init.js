define(['siViewerData','siAjaxUtil','siWebSockets','jquery-xml2json','siSessionTimeOut'],function($si) {

	$si.init = {
		//TODO:move this function to a utility class
		_initializeQueryParams : function() {
			if (window.location.search)
			{
				// split up the query string and store in an associative array
				var params = window.location.search.slice(1).split("&");
				for (var i = 0; i < params.length; i++)
				{
				 	var tmp = params[i].split("=");
					$si.viewer.queryParams[tmp[0]] = unescape(tmp[1]);
				}
			}
		},

		initialize : function() {
			var $this =this;
			$si.init._initializeQueryParams();
			$si.init._loadApplicationConfiguration();
			$si.init._getAlertAckWS();
		},
			
		_loadApplicationConfiguration : function() {
			var $this = this;
			$si.routes.invokeApplicationConfigurationRenderer($this._onApplicationConfigurationLoadSuccess, $this._onApplicationConfigurationLoadFailure);
		},
		
		_onApplicationConfigurationLoadSuccess : function(data){
			var $this = this;
			$si.Logger('init').debug("Application Configration Received");	
			
			$si.viewer.buildInfo.buildVersion = data.buildVersion;
			$si.viewer.buildInfo.buildId = data.buildId;
			
			var userData = data.userbean;
			var highlightPlacemarksArray = new Array();
			
			var userInfo = userData;
			userInfo.username = userData.firstName +' '+userData.lastName;
			userInfo.isSSO	= data.sso;
			if(data && data.alertMasterData){
				$si.viewer.alertConfigData 	= data.alertMasterData.configurationDetails;
				$si.viewer.alertConfigData.defaultSupressTimeFormat = "1";
				$si.viewer.alertConfigData.initGapTimeFormat = "1";
				$si.viewer.alertDataModel.alertPriorityModeMasterData = data.alertMasterData.masterDataList;
			}

			if(data.clonedApplicationSettings) {
				$si.viewer.clonedApplicationSettings = data.clonedApplicationSettings;
			} 

			$si.viewer.userModel.set("userInfo",userInfo);
			$si.viewer.userModel.set("locale",userData.languageDetailList);
			$si.viewer.userModel.set("modules",userData.modules);
			$si.viewer.userModel.set("themes",data.supportedThemes);
			$si.viewer.userModel.set("portalPreferences",userData.portalPreferences);
			var rights= data.rights;
			if(rights.length>0){
				$si.viewer.privilegeObservable.set("privileges",data.rights);
			}
			$si.viewer.uploadDirectory = data.uploadDirectory;
			$si.viewer.serverUrl = data.serverUrl;
			var url = window.location.href;
			var arr = url.split("/");
			$si.viewer.rootViewerHelpUrl=arr[0] + "//" + arr[2]+'/SIViewerHelp/';

			$si.viewer.helpPath = data.helpPath;
			$si.viewer.viewerHelpUrl = $si.viewer.rootViewerHelpUrl+data.viewerHelpUrl;
			if(data.applicationHelpUrl){
				$si.viewer.applicationHelpUrl = $si.viewer.rootViewerHelpUrl+data.applicationHelpUrl;
			}
			$si.viewer.viewerBusinessViewHelpUrl =$si.viewer.viewerHelpUrl+data.viewerBusinessViewHelpUrl;
			$si.viewer.viewerViewerPluginHelpUrl=$si.viewer.viewerHelpUrl+data.viewerViewerPluginHelpUrl;
			if(data.applicationBusinessViewHelpUrl){
				$si.viewer.applicationBusinessViewHelpUrl =$si.viewer.rootViewerHelpUrl+data.applicationBusinessViewHelpUrl;
			}
			if(data.applicationViewerPluginHelpUrl){
				$si.viewer.applicationViewerPluginHelpUrl=$si.viewer.rootViewerHelpUrl+data.applicationViewerPluginHelpUrl;
			}
		
			$si.viewer.highlightPlacemarksArray = highlightPlacemarksArray; 
			$si.viewer.userModel.trigger("evtApplicationConfigurationDataLoaded");
			$si.viewer.preferenceValues = data.preferences;
			$si.viewer.customerLogoModel.customerLogo = data.customerLogoUrl;
			//esri properties
			$si.viewer.esriMapConfig=data.esriMapConfig;
			
			//map properties
			$si.viewer.mapProperties=data.mapProperties;

			if(data.mapProperties['geeserverurl']&& data.mapProperties['geeserverurl']!=''){
				//TODO - need to be tested with GEE to validate this url for the
				$si.viewer.mapProperties['mapURL']=$si.viewer.mapProperties['geeserverurl']+'/js/earth_plugin_loader.js';
			}
			
			if(!data.mapProperties['mapURL'] || data.mapProperties['mapURL']=='' ){
				//TODO http or https should made dynamic
				if($si.viewer.serverUrl.toString().indexOf("https://") != -1){
					$si.viewer.mapProperties['mapURL']='https://www.google.com/jsapi?key='+data.mapProperties['gekey'];
				}else{
					$si.viewer.mapProperties['mapURL']='http://www.google.com/jsapi?key='+data.mapProperties['gekey'];
				}
				
			}
			//map properties end here
			$si.viewer.globaltimerange=data.timeRange;
			$si.viewer.timeZoneOffset = data.timeZoneOffset;
			$si.Logger('init').debug("Application Config Set");
		},

		_onApplicationConfigurationLoadFailure : function(data){
			//FIXME.. enable error icon
			$si.Logger('init').fatal("Error to get Application Configrations :" +  data);
		},

		_onAppPreferencesSuccess : function(data){
			if(data != null){
				$si.viewer.preferenceValues = data;
			}
		},
		_onAppPreferencesFailure : function(data){
			console.log(data);
		},
		getBusinessView : function(selectedModule) {
			var $this = this;
			$si.routes.getBusinessView($this.onBusinessViewSuccess,$this.onBusinessViewError,selectedModule);
		},

		onBusinessViewSuccess : function(data) {
			$si.viewer.businessViewObserver.set("businessView",data);

		},

		onBusinessViewError : function(data) {
			//FIXME.. enable error icon
 			$si.Logger('init').fatal("Error receiving Business View Data. " +  data);
		},

		getLayerWindows : function(layerId,url,onLayerWindowsSuccess,onLayerWindowsFailure){
			var $this = this;
			//url is dynamic so no need to flow through routes
			$si.ajaxUtil(url,onLayerWindowsSuccess,onLayerWindowsFailure);

		},
		
		getLegendConfiguration : function(){
			var $this = this;
			$si.routes.getLegendConfiguration($this.onLegendConfigSuccess,$this.onLegendConfigFailure);
		},
		onLegendConfigSuccess : function(data){
			$si.viewer.legendDataModel.set("legendData",data);
					
		},
		onLegendConfigFailure : function(){
			alert("failure");
		},
		
//FIXME - Please move this to common/com.spacetimeinsight.viewer.favorite.js
	processFavoriteData : function(params){

			var $this = this;
			$si.routes.processFavoriteData($this.onFavoriteDataSuccess,$this.onFavoriteDataFailure,params);
		},
		onFavoriteDataSuccess : function(){
			
		},
		onFavoriteDataFailure : function(){
			alert("failure");
		},

		
		// Fetching the alert init data
		fetchActiveAndAckAlerts : function(){
			var $this = this;
			var initGapTime = 0;
			if($si.viewer.preferenceValues.initGapTime && $si.viewer.preferenceValues.initGapTimeFormat){
				initGapTime = $si.viewer.preferenceValues.initGapTime * $si.viewer.preferenceValues.initGapTimeFormat;
			}else{
				initGapTime = $si.viewer.alertConfigData.initGap * $si.viewer.alertConfigData.initGapTimeFormat;
			}
			
			var alertParams ={
				initGap : initGapTime,
				noOfMessages : $si.viewer.preferenceValues.noOfMessages,
				getDataFor : "Alert",
			}
			$si.routes.fetchActiveAndAckAlerts($this.onActiveAlertsDataSuccess,$this.onAlertAckInitDataFailure,alertParams);
			var ackParams = {
				initGap : initGapTime,
				noOfMessages : $si.viewer.preferenceValues.noOfMessages,
				getDataFor : "Acknowledgement",
			}
			$si.routes.fetchActiveAndAckAlerts($this.onAckAlertsDataSuccess,$this.onAckInitDataFailure,ackParams);
		},
		
		onActiveAlertsDataSuccess : function(data){
			var data1 = [];
			var noOfAlerts = 0;
			if(data.initGapData.length){
				$si.viewer.alertDataModel.set("isEnabled" , "true");
				$si.viewer.alertDataModel.set("noOfAlerts",data.initGapData.length);
				for( var i =0 ; i <data.initGapData.length; i++){
					data1.push(JSON.parse(data.initGapData[i]));
					$si.viewer.alertDataModel.alertMessage.push(JSON.parse(data.initGapData[i]));
				}
			}		
		},

		onAlertAckInitDataFailure : function(){
			$si.Logger('init').error('Failure in fetching the alert initial data');
		},
		onAckAlertsDataSuccess : function(data){
			for( var i =0 ; i <data.initGapData.length; i++){
				$si.viewer.alertDataModel.alertAckMessage.push(JSON.parse(data.initGapData[i]));
			}
		},

		onAckInitDataFailure : function(){
			$si.Logger('init').error('Failure in fetching the acknowledgement initial data');
		},
		
		// For the websockets alerts and acknowledgement handler
		initializeAlertWS:function(onMessageAlerts,onErrorAlerts) {
    		$si.routes.initializeAlertWS($si.init.onMessageAlert, $si.init.onErrorAlert);
	    },
		
		onMessageAlert : function(responseData) {
			var noOfAlerts = parseInt($si.viewer.alertDataModel.get("noOfAlerts"))+1 ;
			$si.viewer.alertDataModel.set("noOfAlerts",noOfAlerts);
			var obj = $.xml2json(responseData);
			$si.viewer.alertDataModel.alertMessage.push(obj);
			$si.viewer.alertDataModel.set("isEnabled" , "true");
        },
        onErrorAlert : function(responseData) {
            console.log(responseData );
        },
		
		_getAlertAckWS:function(onMessageAlerts,onErrorAlerts) {
	    	 $si.routes.getAlertAckWS($si.init._onMessageAck, $si.init._onErrorAck);
	    },
	    
		_onMessageAck : function(responseData){
			var noOfAlerts = parseInt($si.viewer.alertDataModel.get("noOfAlerts"));
			if(noOfAlerts <= 0){
				$si.viewer.alertDataModel.set("noOfAlerts",0);
			}else{
				$si.viewer.alertDataModel.set("noOfAlerts",noOfAlerts-1);
			}
			$si.viewer.alertDataModel.alertAckMessage.push($.xml2json(responseData));
		},
		
		_onErrorAck : function(responseData){
			console.log(responseData);
		},
		
	};
	
	

	$si.init.initialize();
});