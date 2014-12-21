define([
],function(){

	$.spacetimeinsight.siViewerBaseLassoListener = {

		//TODO:prefix lasso to all lasso variables
		lineThickness 					: 2,
		fillColor 						: "00FF00",
		lineColor 						: "00FF00",
		opacity 						: 60,
        lassoName						: null,
        lassoDescription				: null,
        LASSO_CREATE_OPERATION      	: 'create',
        LASSO_UPDATE_OPERATION			: 'update',
        LASSO_GET_ALL_OPERATION			: 'getAll',
        LASSO_APPLY_FILTER_OPERATION	: 'apply',
        LASSO_CLEAR_FILTER_OPERATION	: 'clear',
        LASSO_SAVE_OPERATION			: 'save',
        LASSO_ID_SEPERATOR				: '##',
        selectedLassos					: [],
        RECTANGLE_TOP					: "RectangleTop",
        RECTANGLE_BOTTOM				: "RectangleBottom",
        RECTANGLE_LEFT					: "RectangleLeft",
        RECTANGLE_RIGHT					: "RectangleRight",
        RECTANGLE_CENTRE				: "RectangleCentre",
        HASH							: '#',
        LASSO_NONE						: 'NONE',
		LASSO_INTERSECTIONALL			: 'INTERSECTIONALL',
		LASSO_INTERSECTIONANY			: 'INTERSECTIONANY',
		LASSO_UNION						: 'UNION',
		LASSO_UNIONCOMPLEMENT			: 'UNIONCOMPLEMENT',
		LassoErrorCounter				: 0,
        

        /**bind all lasso events*/
		_bindLassoEvents : function() {
			
			var $this = this;
			
			//event bind for lasso Creation 
			$si.eventSource.lasso.bind($si.events.LassoEvents.onDrawLassoShape, this.onDrawLassoShape.bind(this));
			
			//event bind for populating lasso dropdown with latest data  
			$si.eventSource.lasso.bind($si.events.LassoEvents.populateLatestLassoData, this.populateLatestLassoData.bind(this));
			
			//event bind for saving newly created lasso on DB 
			$si.eventSource.lasso.bind($si.events.LassoEvents.saveNewlyCreatedLassoOnDB, this.saveNewlyCreatedLassoOnDB.bind(this));
			
			//event bind for selecting the lasso from the lasso dropdown list
			$si.eventSource.lasso.bind($si.events.LassoEvents.drawSelectLasso, function(event){
				$this.drawSelectLasso(event);
			});
			
			//event bind for de-selecting the lasso from the lasso dropdown list
			$si.eventSource.lasso.bind($si.events.LassoEvents.removeSelectLasso,function(event){
				$this.removeSelectLasso(event);
			});
			
			//event bind for clearing the newly drawn lasso
			$si.eventSource.lasso.bind($si.events.LassoEvents.clearNewlyDrawnLasso, this.clearNewlyDrawnLasso.bind(this));
			
			//event bind for saving newly edited lasso on DB
			$si.eventSource.lasso.bind($si.events.LassoEvents.saveNewlyEditedLassoOnDB, this.saveNewlyEditedLassoOnDB.bind(this));
			
			//event bind for updating lasso color and Transparency
			$si.eventSource.lasso.bind($si.events.LassoEvents.setColorAndTransparency, this.setColorAndTransparency.bind(this));
			
			//event bind for updating lasso color and Transparency
			$si.eventSource.lasso.bind($si.events.LassoEvents.setLineThickness, this.setLineThickness.bind(this));
			
			//event bind for removing lasso from map
			$si.eventSource.lasso.bind($si.events.LassoEvents.removeLassoFromMapById, this.removeLassoFromMapById.bind(this));
			
			//event bind for zooming to lasso
			$si.eventSource.lasso.bind($si.events.LassoEvents.zoomToLasso, this.zoomToLasso.bind(this));
			//event bind for lasso shared update
			$si.eventSource.lasso.bind($si.events.LassoEvents.onSharedLassoUpdate, this.onLassoSharedUpdate.bind(this));
		},
		
		onLassoSharedUpdate :function(lsasoEventData){
			var lasso = lsasoEventData.data.lasso;
			$si.mapUtils.updateLassoDataByLassoDBId(lasso.id, "lassoData", lasso.lassoData);
			this.removeLassoFromMap(lasso.id);
			var lassoWrapObject = {data:lasso};
			this.drawSelectLasso(lassoWrapObject);
			$($si.viewer).trigger("applyLassoFilter", true);
		},
		onDrawLassoShape : function (lassoEventData) {
			this.drawLassoShape(lassoEventData.data.lassoShapeType);
		},

		drawLassoShape: function (shapeType) {

			this.options.currentLassoTypeId = shapeType;
			this.deactivateLassoEdit();
			$si.viewer.isLassoCreate =  true;
			this.preNewLassoCreateAction(null);
			switch(shapeType) {
				case $si.viewer.LASSO_SHAPES.POLYGON:
					this.drawLassoPolygon();
				break;
				case $si.viewer.LASSO_SHAPES.CIRCLE:
					this.drawLassoCircle();
				break;
				case $si.viewer.LASSO_SHAPES.RECTANGLE:
					this.drawLassoRectangle();
				break;
				default:
				break;
			}
		},
		
		/** Populating the latest lasso data to the observable object*/
		populateLatestLassoData:function(lassoEventData){
			var isSelected  = false;
			var data 		= lassoEventData.data.lassoDataFromDB;
			if(data && data.length == 0){
				$(".managelassos-icon").attr('disabled',true);
			}else{
				$(".managelassos-icon").attr('disabled',false);
			}
			for(var i=0 ; i<data.length; i++){
				if(!data[i].hasOwnProperty("description")){
					data[i].description = "";
				}
				$si.mapUtils.addLasso(data[i]);
			}
		},
		
		/**Server Call for saving the newly created lasso on DB.*/
		saveNewlyCreatedLassoOnDB: function(lassoEventData){
			var lassoDateString = JSON.stringify(lassoEventData.data.lassoData);
//			var loginId = null;
//			if($si.viewer.userModel.userInfo.userId == 0){
//				loginId = $si.viewer.userModel.userInfo.userUniqueId;
//			}else{
//				loginId = $si.viewer.userModel.userInfo.userId;
//			}
			var lassoParams = {
					operation	 : this.LASSO_CREATE_OPERATION,
					name 		 : this.lassoName,
					description  : this.lassoDescription,
					isShared 	 : false,
					lassoData	 : lassoDateString,
					displayOrder : -1,
					shapeType    : this.options.currentLassoTypeId,
					createdBy    : $si.viewer.userModel.userInfo.loginId,
					languageId   : $si.viewer.userModel.userInfo.languageId,
					userLoginId  : $si.viewer.userModel.userInfo.loginId,
					moduleId	 : $si.viewer.selectedModuleModel.selectedModule.id,
			};
			$si.routes.serverCallForLassso(this.newLassoCreateSavedSuccess.bind(this), this.newLassoCreateSavedFailure.bind(this), lassoParams);
		},
		
		/**Result when newly created lasso is saved in DB*/
		newLassoCreateSavedSuccess: function(data){
			$si.viewer.selectedLassosData.selectedLassosArray.push(data[0].id);
			$si.events.triggerLassoEvent($si.events.LassoEvents.populateLatestLassoData, {lassoDataFromDB: data});
			$si.viewer.isLassoCreate = false;
			this.postNewLassoCreateAction(data);
		},
		
		/**Result when newly created lasso is not saved in DB*/
		newLassoCreateSavedFailure: function() {
			$si.Logger('siViewerBaseLassoListener').error($si.i18N.Map.lassomessages.newlassonotsavederror);
		},
		
		/** To save the edited lasso*/
		saveNewlyEditedLassoOnDB : function(lassoEventData){
			var $this = this;
			var lassoDataString = JSON.stringify(lassoEventData.data.lassoData);
			var lassoId = lassoEventData.data.id;
			var lassoParams = {
					operation	 : this.LASSO_UPDATE_OPERATION,
					lassoId 	 : lassoId,
					lassoData	 : lassoDataString,
			};

			$si.routes.serverCallForLassso($this.onLassoEditDataSuccess.bind($this), $this.onLassoEditDataFailure.bind($this), lassoParams);
		},

		onLassoEditDataSuccess: function(data){
			$si.mapUtils.updateLassoDataByLassoDBId(data[0].id, "lassoData", data[0].lassoData);
			$($si.viewer).trigger("deactivateButtons");
			this.postLassoEditAction(data);
			this.changeButtonsStateOnLassoEdit(true);
			if(data[0].isShared==true){
				var eventObj=new $si.events.ModuleLevelEvent($si.events.ModuleLevelEvents.onLassoSharedUpdateEvent,$si.viewer.selectedModuleModel.selectedModule.id,this._getMapWindowId(),data);
				$si.eventSource.moduleLevelEvents.trigger($si.events.ModuleLevelEvents.onLassoSharedUpdateEvent,eventObj);

			}
		},

		onLassoEditDataFailure: function() {
			$si.Logger('siViewerBaseLassoListener').error($si.i18N.Map.lassomessages.editlassonotsavederror);
		},
		
		
		/**Draw the lasso when the user selects the lasso from the lasso dropdown list */
		drawSelectLasso: function(lassoData){
			if(lassoData.data.shapeType == $si.viewer.LASSO_SHAPES.POLYGON){
				this.createLassoPolygon(lassoData.data);
			}else if(lassoData.data.shapeType == $si.viewer.LASSO_SHAPES.CIRCLE){
					this.createLassoCircle(lassoData.data);
			}else if(lassoData.data.shapeType == $si.viewer.LASSO_SHAPES.RECTANGLE){
				this.createLassoPolygonRectangle(lassoData.data);
			}
			
		},
		
		/**Hide the lasso when the user de-selects the lasso from the lasso dropdown list*/
		removeSelectLasso: function(lassoEventData){
			var id 			= lassoEventData.data.id;
			var viewPort	= lassoEventData.data.viewPort;
			var type 		= lassoEventData.data.type;
			
			// Temporary solution until drawer settings are implemented.
			var params = new Array();
			
			var paramArray = $si.mapUtils.getMeasurementParameters();
			params[0] = paramArray[1];
			params[1] = paramArray[2];

			if(type == $si.viewer.LASSO_SHAPES.POLYGON){
				id = $si.viewer.LASSO_SHAPES.POLYGON+this.LASSO_ID_SEPERATOR+id;
			}else if(type == $si.viewer.LASSO_SHAPES.CIRCLE){
				id = $si.viewer.LASSO_SHAPES.CIRCLE+this.LASSO_ID_SEPERATOR+id;
			}else if(type == $si.viewer.LASSO_SHAPES.RECTANGLE){
				id = $si.viewer.LASSO_SHAPES.CIRCLE+this.LASSO_ID_SEPERATOR+id;
			}

			this.showLassoFeature(id, viewPort, false, paramArray[0], params);
		},
		
		/**Clear the newly drawn lasso to discard it*/
		clearNewlyDrawnLasso: function(lassoEventData){
			this.clearNewDrawLasso();
			$($si.viewer).trigger("applyLassoFilter", true);
			$($si.viewer).trigger("deactivateButtons");
		},
		
		preNewLassoCreateAction:function(param){
			
	    },
		
		postNewLassoCreateAction: function(param){
			
	    },
	    
	    postLassoEditAction: function(param){
	    	
	    },
	    
	    /**Set the Color and Transparency of the lasso*/
	    setColorAndTransparency : function(lassoEventData){
			this.fillColor = lassoEventData.data.lassoFillColor.replace("#", "");
			this.opacity = lassoEventData.data.lassoTransparency;
			this.updateLassoAppearance();
		},

		/**Set the line thickness of the lasso*/
		setLineThickness : function(lassoEventData){
			this.lineThickness = lassoEventData.data.lassoLineThickness;
			this.updateLassoAppearance();
		},
		
		/**Removing of lasso from the map by the lasso Id */
		removeLassoFromMapById: function(lassoEventData){
			var lassoId = lassoEventData.data.lassoId;
			this.removeLassoFromMap(lassoId);
			$($si.viewer).trigger("applyLassoFilter", true);
		},
		
		/**Use to save and update lasso **/
		saveUpdateLasso : function(){
			if(this.options.isLassoEditToolActive){
				this.setLassoData();
			}else{
				this.showSaveLassoWindow();
			}
		},
		
		/**Used for zooming to a particular lasso when zoom icon is clicked*/
		zoomToLasso : function(lassoEventData){
			this.zoomToLassoOnMap(lassoEventData.data.lassoInfo);
		},
		
		getAllLassosInformationCurrentlyVisibleCallToBaseMap : function() {
			this.getAllLassosInfoCurrentlyVisibleOnMap();
		},
		
		getAllLassosInfoCurrentlyVisibleOnMap : function() {
			
		},
		 applyWindowContentFavoriteSettings : function(favorite) {
			var $this = this;
			var lasso = $("#lassoDiv");
			 
			lasso.find("#colorTool").data('kendoColorPicker').value(favorite.colorpickervalue);
			lasso.find("#lassosicondropdownTool").data('kendoDropDownList').value(favorite.lassosicondropdownvalue);
			
		},

		/**
		 * This method is used to save the lasso settings in the favorite.
		 * @param {} $
		 * @returns {} 
		 */
		getWindowContentFavoriteSettings : function(){
			var $this = this;
			var lasso = $("#lassoDiv");
			var lassoSettings = {
					 
					colorpickervalue		: lasso.find("#colorTool").data('kendoColorPicker').value(),
					lassosicondropdownvalue : lasso.find("#lassosicondropdownTool").data('kendoDropDownList').value(),
			};
			return lassoSettings;
		},
		
		/**This method checks for the owner of the lasos that the user has selected on the map to edit */
		isTheCurrentUserOwnerOfLasso : function(lassoId){
			
			if($si.mapUtils.getCurrentKeyValueByLassoDBId(lassoId, "userLoginId") != $si.viewer.userModel.userInfo.loginId){
    			var e = {
						message: "",
				};
    			//this.deactivateLassoEdit();
				//TODO: Info messaging has yet to be implemented by Hari.
				this._createErrorNotification(e, $si.i18N.Map.lassomessages.nottheowneroflassocantedit);
				return false;
			}
			
			return true;
		},
		
		/**This function changes the state of the lasso select drop down, manage lasso and manage lasso save button.*/
		changeButtonsStateOnLassoEdit : function(flag) {
			if($("#selectlassosTool").data("kendoDropDownList")){
				$("#selectlassosTool").data("kendoDropDownList").enable(flag);
			}
			
			$($si.viewer).trigger("changeManageLassoSaveButtonState", flag);
			if(flag){
				this.options.mapLassoToolBar[this.options.mapLassoToolBarWidget]("activateManageLassoIcon");
			}else{
				this.options.mapLassoToolBar[this.options.mapLassoToolBarWidget]("deactivateManageLassoIcon");
			}
		},
		
		getLassoJsonObjFromCurrentCreatedLasso : function() {
			$si.Logger('Lasso').info('Override this on native map');
			return null;
		},
		
		isValidNewlyCreatedLasso : function(type) {
			var lassoObj = this.getLassoJsonObjFromCurrentCreatedLasso();
			if(lassoObj != null){
				if(lassoObj.coordinates != null && $.trim(lassoObj.coordinates) != "" && (lassoObj.coordinates).split(" ").length > 2){
					return true;	
				}
			}
			
			this.showLassoNewCreateErrorMessage(type);			
			return false;
		},
		
		showLassoNewCreateErrorMessage : function(type) {
			if(type == $si.viewer.LASSO_SHAPES.POLYGON){
				this.showErrorMessage($si.i18N.Map.lassomessages.polyincorrectdrawerror);
			}else if(type == $si.viewer.LASSO_SHAPES.CIRCLE){
				this.showErrorMessage($si.i18N.Map.lassomessages.createCircleError);
			}else if(type == $si.viewer.LASSO_SHAPES.RECTANGLE){
				this.showErrorMessage($si.i18N.Map.lassomessages.createRectangleError);
			}
		},
	};
});