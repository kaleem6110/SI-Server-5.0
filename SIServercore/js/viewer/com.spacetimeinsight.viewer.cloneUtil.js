
define(['jquery'],function() {

	$si.cloneUtil = {
		
		
		cloneApplication : function() {
			var businessView = $(".si-viewer-business-view");
			var applicationLevelFavorite = businessView[$si.viewer.businessViewWidget]("getFavoriteDetails");
			//var applicationLevelFavorite = $si.viewer.businessView[$si.viewer.businessViewWidget]("getFavoriteDetails");
			var favoriteJSON =  JSON.stringify(applicationLevelFavorite);
			
			this._saveApplication(favoriteJSON);
			
		},
		
		_saveApplication : function(favoriteJSON) {
			var params = {};
			params.favoriteJson = JSON.stringify({ windowId : "CLONE",moduleId: $si.viewer.selectedModuleModel.selectedModule.id,name:"CLONE",description: "CLONE",isShared:false,favoriteData: favoriteJSON});
			params.operation = "addFavorite";
			params.moduleId = $si.viewer.selectedModuleModel.selectedModule.id;
			params.favoriteData = favoriteJSON;
			$si.routes.processFavoriteData(this._onCloneSettingsSaveSuccess,this._onCloneSettingsSaveFailure,params);
		},
		
		_onCloneSettingsSaveSuccess : function(){
			window.open($si.viewer.serverUrl + "htmlViewer.do?moduleId=" + $si.viewer.selectedModuleModel.selectedModule.id +"&bust="+ (new Date()).getTime());
		},
		
		_onCloneSettingsSaveFailure : function(){
			//TODO -i18N
			$si.DialogBox.show("Error cloning application.");
		},
		
	};
});