/**
 * Map Utils
 */
define([
    'jquery',
    'jquery-ui',
    'map/com.spacetimeinsight.viewer.ui.baseLassoListener',
],function($) {
	$si.mapUtils = {

	/**Get the value of a particular key according to the DB id of a lasso*/
	getCurrentKeyValueByLassoDBId: function(lassoId, keyId){
		if(lassoId != null && keyId != null){
			for(var i=0; i<$si.viewer.lassoShapesData.lassoData.length; i++){
				if ($si.viewer.lassoShapesData.lassoData.hasOwnProperty(i)) {
					if($si.viewer.lassoShapesData.lassoData[i].id == lassoId){
						return $si.viewer.lassoShapesData.lassoData[i][keyId];
					}
				}
			}
		}
	},
	addLasso :function(data){
		if(jQuery.inArray(data.id, $si.viewer.selectedLassosData.selectedLassosArray) != -1){
		data.selected = true;
		}else{
		data.selected = false;
		}

		if(data.shapeType == $si.viewer.LASSO_SHAPES.POLYGON){
		data.shapeIcon = "css/images/polygon.png";
		}else if(data.shapeType == $si.viewer.LASSO_SHAPES.CIRCLE){
		data.shapeIcon = "css/images/circle.png";
		}else if(data.shapeType == $si.viewer.LASSO_SHAPES.RECTANGLE){
		data.shapeIcon = "css/images/rectangle.png";
		}
		if(data.createdBy!=$si.viewer.userModel.userInfo.loginId){
			data.showUserName=true;
		}else{
			data.showUserName=false;
		}
		$si.viewer.lassoShapesData.lassoData.push(data);
	},

	/**Update a particular lasso data information for a particular property*/
	updateLassoDataByLassoDBId: function(lassoId, propertyId, updatedData){
		if(lassoId != null){
			for(var i=0; i<$si.viewer.lassoShapesData.lassoData.length; i++){
				if ($si.viewer.lassoShapesData.lassoData.hasOwnProperty(i)) {
					if($si.viewer.lassoShapesData.lassoData[i].id == lassoId){
						$si.viewer.lassoShapesData.lassoData[i][propertyId] = updatedData;
					}
				}
			}
		}
	},

	/**Get the Lasso Object according to the DB id of a lasso*/
	getCurrentLassoObjectByLassoDBId: function(lassoId){
		if(lassoId != null){
			for(var i=0; i<$si.viewer.lassoShapesData.lassoData.length; i++){
				if ($si.viewer.lassoShapesData.lassoData.hasOwnProperty(i)) {
					if($si.viewer.lassoShapesData.lassoData[i].id == lassoId){
						return $si.viewer.lassoShapesData.lassoData[i];
					}
				}
			}
		}
		return null;
	},

	/**Removing of lasso id from the selected lasso array*/
	removeLassoIdFromSelectedLassoArray: function(lassoId){
		if(lassoId != null && $si.viewer.selectedLassosData.selectedLassosArray.length > 0){
			var index = -1;
			for (var i = 0; i < $si.viewer.selectedLassosData.selectedLassosArray.length; i++) {
					if($si.viewer.selectedLassosData.selectedLassosArray[i] == lassoId){
						index = i;
						break;
					}
			}

			if(index != -1){
				$si.viewer.selectedLassosData.selectedLassosArray.splice(index, 1);
			}
		}
	},

	/**Removing the data from lasso drop down list one by one*/
	clearAllDataFromLassoDropDownList: function(){
		while($si.viewer.lassoShapesData.lassoData.length > 0) {
			$si.viewer.lassoShapesData.lassoData.pop();
		}
	},

	/**Show lasso On Map */
	showLassoOnMapByLassoDBId: function(lassoId,flag){
		var lassoObj = this.getCurrentLassoObjectByLassoDBId(lassoId);
		if(lassoObj != null){
			if(flag === false){
				$si.events.triggerLassoEvent($si.events.LassoEvents.removeSelectLasso, lassoObj);
			}else{
				$si.events.triggerLassoEvent($si.events.LassoEvents.drawSelectLasso, lassoObj);
			}
			
		}
	},
	
	/**Get the measurement parameters according to preferences */
	getMeasurementParameters: function(){
		var paramArray = [];
		if($si.viewer.preferenceValues && $si.viewer.preferenceValues.measureSystem){
			if($si.viewer.preferenceValues.measureSystem == 'imperial'){
				paramArray.push('imperial');
				paramArray.push('Miles');
				paramArray.push('Feet');
			}else{
				paramArray.push('metric');
				paramArray.push('Kms');
				paramArray.push('Meters');
			}
			
		}else{
			paramArray.push('imperial');
			paramArray.push('Miles');
			paramArray.push('Feet');
		}
		
		return paramArray;
	},
	
	
	/**Check if the measurement is in imperial or not*/
	isImperial : function() {
		if($si.viewer.preferenceValues && $si.viewer.preferenceValues.measureSystem){
			if($si.viewer.preferenceValues.measureSystem == 'imperial'){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}
	},
	
	/**Lasso Name already exists for current user */
	isLassoNameAlreadyPresentForCurrentUser : function(lassoName) {
		if(lassoName != null && $.trim(lassoName) != ''){
			for(var i=0; i<$si.viewer.lassoShapesData.lassoData.length; i++){
				if ($si.viewer.lassoShapesData.lassoData.hasOwnProperty(i)) {
					// if lasso name is found and the user login Id is also same as the current user then return as true
					if($si.viewer.lassoShapesData.lassoData[i].name == lassoName && $si.viewer.lassoShapesData.lassoData[i].userLoginId == $si.viewer.userModel.userInfo.loginId){
						return true;
					}
				}
			}
		}
		
		return false;
	},
	
	isLassoObjAlreadyPresentForCurrentUser : function(lassoItem,lassoShapesData) {
		if(lassoItem != null && $.trim(lassoItem) != ''){
			//console.log($si.mapUtils.getLassoShapesDataClone());
			var lassoDataArr;
			if(lassoShapesData){
				lassoDataArr = lassoShapesData;
			}else{
				lassoDataArr = $si.viewer.lassoShapesData;
			}
			for(var i=0; i<lassoDataArr.lassoData.length; i++){
				if (lassoDataArr.lassoData.hasOwnProperty(i)) {
					// if lasso name is found and the user login Id is also same as the current user then return as true
					if(lassoItem.id == lassoDataArr.lassoData[i].id && lassoDataArr.lassoData[i].name == lassoItem.name && lassoDataArr.lassoData[i].userLoginId == $si.viewer.userModel.userInfo.loginId){
						return false;
					} else if(lassoDataArr.lassoData[i].name == lassoItem.name && lassoDataArr.lassoData[i].userLoginId == $si.viewer.userModel.userInfo.loginId){
						return true;
					}
				}
			}
		}
		
		return false;
	},
	
	/**
	 * 
	 *  
	 */
	getLassoShapesDataClone : function(){
		var lassoShapesCloneData = JSON.stringify($si.viewer.lassoShapesData);
		return JSON.parse(lassoShapesCloneData);
	},
	
	
	/**Refresh selected business layers
	refreshAllSelectedBusinessLayers: function(){
		var selectedBusinessViewIds =  $si.businessViewUtil.getSelectedBusinessViewIds();
		if(selectedBusinessViewIds){
			$.each(selectedBusinessViewIds,function(index, selectedBusinessViewId){
				$si.events.triggerRefreshBusinessViewEvent(selectedBusinessViewId);
			});
		}
	},*/
};
});