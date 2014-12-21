define([
    'jquery',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'common/com.spacetimeinsight.viewer.ui.window',
    'table-bootstrap',
    'table-theme',
    'table-Grid-API',
    'jquery-notify',
    'top-center',
    'inline',
    'jquery-noty-packaged-min',
],
(function($){
	$.widget('spacetimeinsight.siManageLassos',$.spacetimeinsight.siViewerWindow,{
		
		NAMESPACE : "spacetimeinsight",
		pluginName:"siManageLassos",
		DIV_CONTENT: kendo.template("<div id='manageButtonPanel''></div>"),
		BUTTON: kendo.template('<button id= "#= id #Panel"  class="action-button"  disabled  style="width: 85px;">#= labelVal #</button>'),
		CONTAINER_TEMPLATE : kendo.template(" <div id='parent' class='f-layout' ><div id='manageLassoNotificationDiv' style='z-index:999999; position: absolute'></div><div class='f-grid-wrapper'><div id='#= id #' class= 'f-custom-grid' style='width:100%;hieght:100%' ></div></div><div id='footerPanel' class='f-bottom-controls' ></div><div id='manageButtonPanel' class='f-left-controls' ></div></div>"),
		FOOTER_DIV: kendo.template(''),
		CONTAINER_DIV: kendo.template('<div class="f-grid-wrapper"><div id="containerDiv" class="f-custom-grid"></div></div>'),
		options:{
		windowAttributes : {
					height		: "300px",
					width 		: "600px",
					minHeight   : "300px",
					minWidth	: "600px",
					position: {
						top		: "130px",
						left	: "255px",
					},
				},
								
				windowTools 	: [],
				group			: $si.i18N.Map.manageLasso.title,
				groupIcon		: "css/images/lasso_window.png",
				shimRequired	: true,
	 			actions			: ["MINIMIZE","MAXIMIZE","CLOSE"],
	 			title			: $si.i18N.Map.manageLasso.title,
	 			windowIcon		: "css/images/lasso_window.png",
	 			toolBarWidgetJS			: null,
				toolBarWidget			: null,
				
				
			dataSource: [],
			deltedLassosNames: [],
			sharedLassosNames:[],
			unSharedLassosNames:[],
			sharedDeletedLassosNames:[],
			changedLassos : [],
			gridSelectedRowIndex:-1,
			lassoShapesDataClone : [],
			MINIMUM_WIDTH : 50,
			isNameValidated : true,
			isDescValidated : true,
		},
		
		_create: function(){
			this._super();
			var $this = this,grid,panel,contentDiv;
		 	var manageLassosElement = this.element;
		 	var dataSource = this.options.dataSource;
		 	var parentId = this.options.parentElementId;
		 	//used in event handling. Each event is prefix by plugin name
		 	this.widgetEventPrefix = this.pluginName + "_";
		 	
		 	
		 	$(this.element).append(this.CONTAINER_TEMPLATE({id: "manageGrid"}));
		 	var $this=this;		
		 	$(manageLassosElement).append(this.FOOTER_DIV);
		 	panel = $(manageLassosElement).find('#manageButtonPanel');
		 	panel.append(this.BUTTON({id: "MoveUp",labelVal:$si.i18N.Map.manageLasso.moveuplassobutton}));
		 	panel.append(this.BUTTON({id: "MoveDown",labelVal:$si.i18N.Map.manageLasso.movedownlassobutton}));
		 	panel.find('#MoveUpPanel').addClass('b-move-up');
		 	panel.find('#MoveDownPanel').addClass('b-move-down');
		 	panel.append(this.BUTTON({id: "Share",labelVal:$si.i18N.Map.manageLasso.sharelassobutton}));
		 	panel.append(this.BUTTON({id: "UnShare",labelVal:$si.i18N.Map.manageLasso.unsharelassobutton}));
		 	
		 	panel.append(this.BUTTON({id: "Delete",labelVal:$si.i18N.Map.manageLasso.deletelassobutton}));
		 	
		 	contentDiv = $(manageLassosElement).find('#footerPanel');
		 	contentDiv.find('#MoveDown').css({"margin-top":"10px"});
		 	contentDiv.append(this.BUTTON({id:"Cancel",labelVal:$si.i18N.Map.manageLasso.cancelbuttton}));
		 	contentDiv.find('#CancelPanel').css({"float": "right","margin-right":"10px"});
		 	contentDiv.find('#CancelPanel').addClass("cancel-button");
		 	contentDiv.find('#CancelPanel').prop('disabled', false);
		 	//attr('disabled',true);
		 	contentDiv.append(this.BUTTON({id:"Save",labelVal:$si.i18N.Map.manageLasso.savebutton}));
		 	contentDiv.find('#SavePanel').css({"float":"right","margin-right":"10px"});
		 	contentDiv.find('#SavePanel').addClass("apply-button");
		 	contentDiv.find('#SavePanel').prop('disabled', true);
		 	$(manageLassosElement).find("#SavePanel").on("click",function(e){
	 		
		 		$this.saveAllLassos();
		 		
		 	});
		 	$(manageLassosElement).find('#MoveDownPanel').css({"margin-top":"15px"});
		 	$(manageLassosElement).find('#SharePanel').css({"margin-top":"15px"});
		 	$(manageLassosElement).find('#UnSharePanel').css({"margin-top":"15px"});
		 	$(manageLassosElement).find('#DeletePanel').css({"margin-top":"15px"});
		 	$(manageLassosElement).find('#' + "CancelPanel").bind("click",function(){
		 		//resetting the lassos data and setting the isDeleted to false.
		 		for(var i = 0; i<$si.viewer.lassoShapesData.lassoData.length;i++){
		 			$si.viewer.lassoShapesData.lassoData[i].isDeleted = false;
		 			for(var a = 0; a< $this.options.lassoShapesDataClone.lassoData.length ; a++){
						$si.viewer.lassoShapesData.lassoData[a] = $this.options.lassoShapesDataClone.lassoData[a];
					}
		 		}
		 		
		 		$this.closeWindow();
		 		$this.showNotificationOnSaveAndCancel($si.i18N.Map.manageLasso.clickoncancelbutton);
		 	});
		 	
		 	$(manageLassosElement).find('#' + "DeletePanel").on("click",this.deleteLassosFromGrid.bind($this));
		 	
		 	$(manageLassosElement).on("click",'#MoveUpPanel',this.movingRowUp.bind($this,true));
		 	
		 	$(manageLassosElement).on("click",'#MoveDownPanel',this.movingRowUp.bind($this,false));
		 	$(manageLassosElement).on("click",'#SharePanel',this.shareAndUnshareLasso.bind($this,true));
		 	$(manageLassosElement).on("click",'#UnSharePanel',this.shareAndUnshareLasso.bind($this,false));
		 	
		 	$this.options.dataSource = [];
		 	$this.options.deltedLassosNames = [];
		 	$this.options.sharedDeletedLassosNames=[];
			$this.options.sharedLassosNames=[];
			$this.options.unSharedLassosNames=[];
			
		 	for(var i=0; i<$si.viewer.lassoShapesData.lassoData.length ;i++){
				if ($si.viewer.lassoShapesData.lassoData.hasOwnProperty(i)) {
					var item = $si.viewer.lassoShapesData.lassoData[i];
		             $this.options.dataSource[i] = item;
				}
			}
		 	
		 	$si.viewer.lassoShapesData.bind("change",function(e){
			 	if(e.action==='add'){
			 		for(var i=0; i<e.items.length; i++){
			 			$this.options.dataSource.push(e.items[i]);
					}
				}
				if(e.action==='remove'){
			 		for(var i=0; i<e.items.length; i++){
			 			$this.options.dataSource.splice($this.options.dataSource.indexOf(e.items[i]),1);
					}
				}
				$this.options.lassoShapesDataClone = $si.mapUtils.getLassoShapesDataClone();
				$this.options.manageGrid.reDraw();
			 	$this.options.manageGrid.rebuild();
			});
		 	
		 	$this._createManageGrid(); 
		 	$("#manageLassosWindow").parent(".k-widget.k-window").addClass("w-manage-lasso");
		 	$(".w-manage-lasso").find(".k-i-maximize").click(function(e){
		 		//$(".w-manage-lasso").
		 	});
		 	this.options.lassoShapesDataClone = $si.mapUtils.getLassoShapesDataClone();
		 	
		 	$($si.viewer).bind("changeManageLassoSaveButtonState", function(e, boolean){
		 		if(boolean){
		 			$this._updateSaveButtonState(false);
		 		}else{
		 			$this._updateSaveButtonState(true);
		 		}
				
			});
			
			$this._addWindowMetadata();
	        $(this.element).data("kendoWindow").wrapper.find(".k-i-minimize").click(function(e){
	        	 $this.minimizeWindow();
	        	 e.stopPropagation();
			});
	 },
		 saveAllLassos: function(){
		 	var $this 			= this;
		 	var deletedLassoIds = [];
		 	var loginId 		= null;
		 	
		 	var onLassoSaveAllSuccess = function(data) {
		 		var mapWindowId=$this._getMapWindowId();
		 	//trigger all deleted,shared,unshared lassos events to other users
				if($this.options.sharedDeletedLassosNames.length>0){
					var eventObj=new $si.events.ModuleLevelEvent($si.events.ModuleLevelEvents.onLassoSharedDeletedEvent,$si.viewer.selectedModuleModel.selectedModule.id,mapWindowId,$this.options.sharedDeletedLassosNames);
					$si.eventSource.moduleLevelEvents.trigger($si.events.ModuleLevelEvents.onLassoSharedDeletedEvent,eventObj);
				}

				if($this.options.sharedLassosNames.length>0){
					var eventObj=new $si.events.ModuleLevelEvent($si.events.ModuleLevelEvents.onLassoShareEvent,$si.viewer.selectedModuleModel.selectedModule.id,mapWindowId,$this.options.sharedLassosNames);
					$si.eventSource.moduleLevelEvents.trigger($si.events.ModuleLevelEvents.onLassoShareEvent,eventObj)
				}

				if($this.options.unSharedLassosNames.length>0){
					var eventObj=new $si.events.ModuleLevelEvent($si.events.ModuleLevelEvents.onLassoUnShareEvent,$si.viewer.selectedModuleModel.selectedModule.id,mapWindowId,$this.options.unSharedLassosNames);
					$si.eventSource.moduleLevelEvents.trigger($si.events.ModuleLevelEvents.onLassoUnShareEvent,eventObj);
				}
		 	$this.options.deltedLassosNames = [];
		 	$this.options.sharedLassosNames = [];
		 	$this.options.unSharedLassosNames = [];
		 	$this.options.sharedDeletedLassosNames =[];
		 	
		 	$si.mapUtils.clearAllDataFromLassoDropDownList();
			$si.events.triggerLassoEvent($si.events.LassoEvents.populateLatestLassoData, {lassoDataFromDB: data});
			
			for (var i = 0; i < $si.viewer.selectedLassosData.selectedLassosArray.length; i++) {
				if($si.mapUtils.getCurrentLassoObjectByLassoDBId($si.viewer.selectedLassosData.selectedLassosArray[i]) == null){
					deletedLassoIds.push($si.viewer.selectedLassosData.selectedLassosArray[i]);
				}
			}
			
			for (var j = 0; j < deletedLassoIds.length; j++) {
				$si.mapUtils.removeLassoIdFromSelectedLassoArray(deletedLassoIds[j]);
				$si.events.triggerLassoEvent($si.events.LassoEvents.removeLassoFromMapById, {lassoId:deletedLassoIds[j]});
			}
			$($si.viewer).trigger("applyLassoFilter", true);
		 	$this.closeWindow();
		 	$this.showNotificationOnSaveAndCancel($si.i18N.Map.manageLasso.clickonsavebutton);
			};
		 	
		 	var onLassoSaveAllFail = function() {
		 		var $this = this;
		 		$si.Logger('Manage Lasso').error('Failed to save lasso on server side');
		 		$this.showNotificationOnSaveAndCancel($si.i18N.Map.manageLasso.failedclickonsavebutton);
		 	};
		 	var gridDataJsonArray = $this.options.manageGrid.getDataProvider();
		 	var finalDataJsonArray =gridDataJsonArray.concat($this.options.deltedLassosNames);
		 	
			var lassoParams = {
					operation  	 : $.spacetimeinsight.siViewerBaseLassoListener.LASSO_SAVE_OPERATION,
					userLoginId  : $si.viewer.userModel.userInfo.loginId,
					moduleId	 : $si.viewer.selectedModuleModel.selectedModule.id,
					lassoArray   : JSON.stringify(finalDataJsonArray),
					modifiedBy   : $si.viewer.userModel.userInfo.loginId,
			};
			
			$si.routes.serverCallForLassso(onLassoSaveAllSuccess, onLassoSaveAllFail, lassoParams);
	 },
	 _getMapWindowId: function(){
		var windowId;
		$.each($si.viewer.windowMetadataModel.arrWindowMetadata,function(index,siWindow){
			windowMetaData = siWindow.id.split('_');
			if(windowMetaData.length == 1 && ( siWindow.type === "siViewerGoogleEarth" || siWindow.type === "siViewerEsri") ) {
				windowId= siWindow.id ;
			}
		});
		return windowId;
	},
	 _createManageGrid: function(){
		
		 	 var grid,gridCell;
		 	 var $this=this;
		 
		
		 grid = $(this.element).find('#manageGrid');
		 this.options.manageGrid  = new flexiciousNmsp.FlexDataGrid(grid[0],
								{	
									id:'manageGridContent',	
								});
			/* Selected, Rollover properties for the flexicious grid */			
			this.options.manageGrid._selectionMode="singleRow";	
			this.options.manageGrid.rollOverColor = 0x8dcbe4;
			this.options.manageGrid.textRollOverColor = 0xFFFFFF;
			this.options.manageGrid.selectionColor = 0x2c95d2;
			this.options.manageGrid.activeCellColor = 0x2c95d2;
					
		//this.options.manageGrid._selectionMode="singleRow";	
		
		 this.options.manageGrid.getColumnLevel().pageSize = 4;
		 this.options.manageGrid.addEventListener(null,"itemClick",this._itemClicked.bind(this));
		 this.options.manageGrid.addEventListener(null,"itemDoubleClick", this._itemDoubleClick.bind(this));
		 this.options.manageGrid.addEventListener(null,"itemEditBegin", this._itemEditBegin.bind(this));
		 //this.options.manageGrid.addEventListener(null,"itemEditValueCommit",this._itemEditEnd.bind(this));
		 this.options.manageGrid.addEventListener(null,"itemEditEnd",this._itemEditEnd.bind(this));	
		 
		 	var grid = this.element.find("#manageGrid")[0].component;
		 	grid.setColumnLevel(new flexiciousNmsp.FlexDataGridColumnLevel(grid));
		 	var gridData = [];
		 	var manageGrid = $this.options.manageGrid;
		 	manageGrid.setHorizontalScrollPolicy("auto");
		 	
		 	var ct=-1;
		 			 	
		 	var column = $si.tableGridUtils.DynamicColumns_addColumn("shapeType",$si.i18N.Map.manageLasso.gridcolumnlabeltype);
		 		
	 		column.headerAlign="left";
	 		column.sortable=false;
	 		column.setLabelFunction($si.tableGridUtils.lassoShapeType);
	 		column._width = 60;
	 		column._editable=false;
	 		column.setStyle("textAlign","center");
	 		column.minWidth = $this.options.MINIMUM_WIDTH;
	 		manageGrid.addColumn(column);
	 		
	 		
	 		var column = $si.tableGridUtils.DynamicColumns_addColumn("name",$si.i18N.Map.manageLasso.gridcolumnlabelname);
	 		column._width = 120;
	 		column.headerAlign="left";
	 		column.sortable=false;
	 		column.wordWrap=true;
	 		column._editable=true;
	 		column.truncateToFit= true;
	 		column.minWidth = $this.options.MINIMUM_WIDTH;
	 		manageGrid.addColumn(column);
	 		
	 		var column = $si.tableGridUtils.DynamicColumns_addColumn("createdBy",$si.i18N.Map.manageLasso.gridcolumnlabelowner);
	 		column._width = 150;
	 		column.headerAlign="left";
	 		column.sortable=false;
	 		column.setLabelFunction($si.tableGridUtils.lassoOwnerNameisShared);
	 		column._editable=false;
	 		column.minWidth = $this.options.MINIMUM_WIDTH;
	 		//column.truncateToFit= true;
	 		manageGrid.addColumn(column);

	 		column = $si.tableGridUtils.DynamicColumns_addColumn("description",$si.i18N.Map.manageLasso.gridcolumnlabeldescription);
	 		column.headerAlign="left";
	 		column.sortable=false;
	 		column._setwidth=170;
	 		column.wordWrap=true;
	 		column._editable=true;
	 		column.truncateToFit= true;
	 		column.minWidth = $this.options.MINIMUM_WIDTH;
	 		manageGrid.addColumn(column);
	 		column = $si.tableGridUtils.DynamicColumns_addColumn("createdDate","createdDate");
	 		
	 		column._visible=false;
	 		manageGrid.addColumn(column);
	 		
	 		column = $si.tableGridUtils.DynamicColumns_addColumn("displayOrder","DisplayOrder");
	 		
	 		column._visible=false;
	 		manageGrid.setInitialSortField("dispalyOrder");
	 		manageGrid.addColumn(column);
	 		column = $si.tableGridUtils.DynamicColumns_addColumn("id","LassoID");
	 		
	 		column._visible=false;
	 		manageGrid.addColumn(column);
	 		column = $si.tableGridUtils.DynamicColumns_addColumn("isDeleted","IsDeleted");
	 		
	 		column._visible=false;
	 		manageGrid.addColumn(column);
	 		column = $si.tableGridUtils.DynamicColumns_addColumn("isShared","Shared");
	 		
	 		column._visible=false;
	 		manageGrid.addColumn(column);
	 		column = $si.tableGridUtils.DynamicColumns_addColumn("lassoData","lassoData");
	 		
	 		column._visible=false;
	 		manageGrid.addColumn(column);
	 		
	 		column = $si.tableGridUtils.DynamicColumns_addColumn("modelName","ModelName");
	 		
	 		column._visible=false;
	 		manageGrid.addColumn(column);
	 		
	 		column._visible=false;
	 		manageGrid.addColumn(column);
	 			column = $si.tableGridUtils.DynamicColumns_addColumn("userLoginId","UserID");
	 		
	 		column._visible=false;
	 		manageGrid.addColumn(column); 
	 		manageGrid._selectionMode="singleRow";
	 		manageGrid.setDataProvider($this.options.dataSource);
	 		manageGrid.variableRowHeight = true;
	 		manageGrid.reDraw();
	 		manageGrid.rebuild();
	 		
	 },
	 
	 getLassosNamesInOrederinGrid: function(){
	 	return this.options.gridData;
	 },
	 
	  deleteLassosFromGrid: function(){
	 		
	 		//alert("deleteing");
	 		var itemIndex = this.options.manageGrid.getSelectedIndex();
	 		var manageGrid,item;
	 		var $this = this;
	 		var gridData = $this.options.dataSource;
	 		item = gridData[itemIndex];
			item.isDeleted=true;
	 		$this.options.deltedLassosNames.push(item);	
			if(item.isShared==true){
				$this.options.sharedDeletedLassosNames.push(item);
				$this.options.unSharedLassosNames.splice($this.options.unSharedLassosNames.indexOf(item),1);
				$this.options.sharedLassosNames.splice($this.options.sharedLassosNames.indexOf(item),1);
			}
			gridData.splice(itemIndex,1);
	 		$this.setGridData();
	 		$this.validatingButtonPanel();
	 	},
	 	
	 	_itemDoubleClick: function(gridSelectedItem){
		 		var $this=this;
			 	if(gridSelectedItem.grid.getSelectedIndex()>=0){
			 		this.setEnableDisableButton(true,gridSelectedItem);
			 	if(gridSelectedItem.grid.getSelectedItems()[0].createdBy==$si.viewer.userModel.userInfo.loginId){
			 		gridSelectedItem.grid.enableDoubleClickEdit=true;
			 		gridSelectedItem.grid.editable=true;
			 	}else{
			 		gridSelectedItem.grid.enableDoubleClickEdit=false;
			 		gridSelectedItem.grid.editable=false;
			 	}
			 }	
	 	},
	 	
	 	
	 	_itemClicked: function(gridSelectedItem){
	 		this.setEnableDisableButton(!gridSelectedItem.isItemSelected,gridSelectedItem);
	 	},
	 	
	 	_itemEditEnd : function(event){
	 		var regex = new RegExp('^[a-zA-Z0-9\_ ]+$');
			var cell = event.cell;
			var manageGrid = event.grid; 
			
	 		if(cell._column.dataField == "name"){
		 		if($(cell.domElement).hasClass('grid-validation-error-box')){
						$(cell.domElement).removeClass('grid-validation-error-box')
				}
	 			var lassoName = $.trim($(event.itemEditor.domElement).find('.textBox').val());
				this.options.isNameValidated = false;
	 			if(lassoName == ""){
					this._showErrorMessage($si.i18N.Map.saveLasso.lassonameemptyerror);
					event.preventDefault();
					event.stopPropagation();
				}else if(lassoName.length > 30){
					this._showErrorMessage($si.i18N.Map.saveLasso.lassonameexceederror);
					event.preventDefault();
					event.stopPropagation();
				}else if(!regex.test(lassoName)){
					this._showErrorMessage($si.i18N.Map.lassomessages.specialcharactersvalidation);
					event.preventDefault();
					event.stopPropagation();
				}else if ($si.mapUtils.isLassoObjAlreadyPresentForCurrentUser(event.item,this.options.lassoShapesDataClone)){
					this._showErrorMessage($si.i18N.Map.saveLasso.lassonamealreadtexistserror);
					event.preventDefault();
					event.stopPropagation();
				}else{
					this.options.isNameValidated = true;
				}
				if(!this.options.isNameValidated){
					$(cell.domElement).addClass('grid-validation-error-box');
				}
				
	 			
	 		} else if (cell._column.dataField == "description"){
	 			if($(cell.domElement).hasClass('grid-validation-error-box')){
					$(cell.domElement).removeClass('grid-validation-error-box')
				}
	 			this.options.isDescValidated = false;
	 			var lassoDescription = $.trim($(event.itemEditor.domElement).find('.textBox').val());
	 			if(lassoDescription.length > 0){
	 				if(lassoDescription.length > 100){
						this._showErrorMessage($si.i18N.Map.saveLasso.lassodescriptionexceederror);
						event.preventDefault();
					}else if(lassoDescription.match('^[a-zA-Z0-9\_ ]+$') == null){
						this._showErrorMessage($si.i18N.Map.lassomessages.specialcharactersvalidation);
						event.preventDefault();
					}else{
						this.options.isDescValidated = true;
					}
	 			}else{
						this.options.isDescValidated = true;
				}
				if(!this.options.isDescValidated){
					$(cell.domElement).addClass('grid-validation-error-box');
				}
	 		}
			event.grid.editable = false;
			if(this.options.isDescValidated && this.options.isNameValidated){
				this.element.find('#SavePanel').prop('disabled',false);
			}else{
				this.element.find('#SavePanel').prop('disabled',true);
			}
			event.grid.reDraw();
			event.grid.rebuild();
	 	},
	 	
	 	_updateSaveButtonState : function(boolean) {
	 		this.element.find('#SavePanel').prop('disabled', boolean);
		},
		
	 	_itemEditBegin : function(event) {
//	 		this.options.manageGrid.setEnabled(false);
//	 		this.options.manageGrid.reDraw();
//	 		this.options.manageGrid.rebuild();
	 		this.setEnableDisableButton(true, event);
		},
	 	
	 	movingRowUp: function(moveUpFlag){
	
	 		var itemIndex = this.options.manageGrid.getSelectedIndex();
	 		var item,newIndex;
	 		var $this=this;
	 		var gridData = $this.options.dataSource;
	 		newIndex = moveUpFlag ?  itemIndex -1 :  itemIndex + 1;	
	 		item = gridData[itemIndex];
	 		gridData.splice(itemIndex,1);
	 		gridData.splice(newIndex,0,item);
	 		this.setGridData();
	 		this.validatingButtonPanel();
	 	},
	 	
	 	_showInfoMessage : function(message) {
	 		this._notifyMessageOnManageLasso("information", message);
		},
	 	
	 	_showErrorMessage : function(message) {
			this._notifyMessageOnManageLasso("error", message);
		},
	 	
	 	_notifyMessageOnManageLasso : function(type, message) {
	 		$("#manageLassoNotificationDiv").noty({
				type		 : type,
				dismissQueue : true,
				layout 		 : 'topCenter',
				closeWith	 : ['button'], 
				text		 : message,
	 		});
		},
	 	
	 	shareAndUnshareLasso: function(isShared){
	 		
	 		var $this=this;
	 		var toRemoveIndex = null;
	 		var item,itemIndex;
	 		itemIndex=this.options.manageGrid.getSelectedIndex();
	 		var gridData = $this.options.dataSource;
	 		item = gridData[itemIndex];
	 		// Add the original copy of the lasso object;
	 		$this._addToChangeList(item.id);
	 		item.isShared=isShared;
	 		gridData.splice(itemIndex,1);
	 		gridData.splice(itemIndex,0,item);
	 		if(isShared==true){
	 			for(var i = 0; i < $this.options.unSharedLassosNames.length;i++){
	 				if(item.id == $this.options.unSharedLassosNames[i].id){
	 					toRemoveIndex = i;
	 					break;
	 				}
		 		}
	 			
	 			if(toRemoveIndex != null){
	 				$this.options.unSharedLassosNames.splice(toRemoveIndex,1);
	 			}
	 			
				if($this.options.sharedLassosNames.indexOf(item)<0){
					$this.options.sharedLassosNames.push(item);
				}
				
				(this.element.find("#manageButtonPanel").find("#SharePanel")).prop('disabled', true);
				(this.element.find("#manageButtonPanel").find("#UnSharePanel")).prop('disabled', false);
				
				
			}else{
				for(var i = 0; i < $this.options.sharedLassosNames.length;i++){
	 				if(item.id == $this.options.sharedLassosNames[i].id){
	 					toRemoveIndex = i;
	 					break;
	 				}
		 		}
	 			
	 			if(toRemoveIndex != null){
	 				$this.options.sharedLassosNames.splice(toRemoveIndex,1);
	 			}
				if($this.options.unSharedLassosNames.indexOf(item) < 0){
					$this.options.unSharedLassosNames.push(item);
				}
				(this.element.find("#manageButtonPanel").find("#SharePanel")).prop('disabled', false);
				(this.element.find("#manageButtonPanel").find("#UnSharePanel")).prop('disabled', true);
				
			}
	 		this.setGridData();
	 		this.element.find('#SavePanel').prop('disabled', false);
	 	},
	 	
	 	_addToChangeList : function(lassoId) {
	 		var lassoObject = null;
	 		var index = null;
	 		
	 		lassoObject = $si.mapUtils.getCurrentLassoObjectByLassoDBId(lassoId);
	 		if(lassoObject != null){
	 			
	 			for(var i = 0; i < this.options.changedLassos.length;i++){
	 				if(lassoObject.id == this.options.changedLassos[i].id){
	 					index = i;
	 					break;
	 				}
		 		}
	 			
	 			if(index == null){
	 				this.options.changedLassos.push(JSON.parse(JSON.stringify(lassoObject)));
	 			}
	 			
	 		}
		},
	 			
	 	validatingButtonPanel: function(e){
	 		this.element.find('#SavePanel').prop('disabled', false);
			var selectedIndices,itemIndex = -1;
			var selectedIndex;
			manageGrid = this.options.manageGrid;
			selectedIndex  = this.options.manageGrid.getSelectedIndex();
			if(selectedIndex >=0){
				itemIndex = this.options.selectedIndex;
				if(selectedIndex == 0){
					$(this.element).find('#MoveUpPanel').attr('disabled',true);
					$(this.element).find('#MoveDownPanel').attr('disabled',false);
				}else if(selectedIndex == manageGrid._dataProvider.length-1){
		 			$(this.element).find('#MoveDownPanel').attr('disabled',true);
		 			$(this.element).find('#MoveUpPanel').attr('disabled',false);
				}else{
					$(this.element).find('#MoveUpPanel').attr('disabled',false);
		 			$(this.element).find('#MoveDownPanel').attr('disabled',false);
				}
				
				// Fixed for SI-1531
				//$(this.element).find('#DeletePanel').attr('disabled',false);
			}else{
				$(this.element).find('#MoveUpPanel').attr('disabled',true);
	 			$(this.element).find('#MoveDownPanel').attr('disabled',true);
	 			$(this.element).find('#SharePanel').attr('disabled',true);
	 			$(this.element).find('#UnSharePanel').attr('disabled',true);
	 			$(this.element).find('#DeletePanel').attr('disabled',true);
				
			} 
			
		},		
	 	
	 	setGridData: function(){
	 		var manageGrid;
	 		manageGrid = this.options.manageGrid;
	 		manageGrid.setDataProvider( this.options.dataSource);
	 		manageGrid.getColumnLevel().pageSize = this.options.dataSource.length;
	 		manageGrid.reDraw();
	 		manageGrid.rebuild();
	 	},
	 	setEnableDisableButton: function(flag,gridSelectedItem){
	 		if(flag){
	 			this.element.find("#manageButtonPanel").find('#CancelPanel').prop('disabled', false);
	 			(this.element.find("#manageButtonPanel").find("#MoveUpPanel")).prop('disabled', true);
	 			(this.element.find("#manageButtonPanel").find("#MoveDownPanel")).prop('disabled', true);
	 			(this.element.find("#manageButtonPanel").find("#SharePanel")).prop('disabled', true);
				(this.element.find("#manageButtonPanel").find("#UnSharePanel")).prop('disabled', true);
				(this.element.find("#manageButtonPanel").find("#DeletePanel")).prop('disabled', true);

	 		}else{
	 		this.element.find("#manageButtonPanel").find('#CancelPanel').prop('disabled', false);
 			this.options.gridSelectedRowIndex=gridSelectedItem.grid.getSelectedIndex();
 			if((this.options.gridSelectedRowIndex)>=0){
 				if(gridSelectedItem.grid.getSelectedItems()[0].createdBy!=$si.viewer.userModel.userInfo.loginId){
 					gridSelectedItem.grid.enableDoubleClickEdit=false;
 	 		 		gridSelectedItem.grid.editable=false;
 				}else{
 					gridSelectedItem.grid.enableDoubleClickEdit=true;
 	 		 		gridSelectedItem.grid.editable=true;
 				}
 				
 			if(this.options.gridSelectedRowIndex!=0  ){
 				(this.element.find("#manageButtonPanel").find("#MoveUpPanel")).prop('disabled', false);
 			}else{
 				(this.element.find("#manageButtonPanel").find("#MoveUpPanel")).prop('disabled', true);
 			}	
 				if(this.options.gridSelectedRowIndex!=(gridSelectedItem.grid._dataProvider.length-1)){
 					(this.element.find("#manageButtonPanel").find("#MoveDownPanel")).prop('disabled', false);
 				}else{
 				 (this.element.find("#manageButtonPanel").find("#MoveDownPanel")).prop('disabled', true);	
 				}
 				
 				if(gridSelectedItem.item.createdBy==$si.viewer.userModel.userInfo.loginId){
 				
 					if(gridSelectedItem.item.isShared){
 						(this.element.find("#manageButtonPanel").find("#SharePanel")).prop('disabled', true);
 						(this.element.find("#manageButtonPanel").find("#UnSharePanel")).prop('disabled', false);
 					}else{
 						(this.element.find("#manageButtonPanel").find("#SharePanel")).prop('disabled', false);
 						(this.element.find("#manageButtonPanel").find("#UnSharePanel")).prop('disabled', true);
 					}
 						
 						
 						(this.element.find("#manageButtonPanel").find("#DeletePanel")).prop('disabled', false);
 						
 				}else{
 						(this.element.find("#manageButtonPanel").find("#SharePanel")).prop('disabled', true);
 						(this.element.find("#manageButtonPanel").find("#UnSharePanel")).prop('disabled', true);
 						(this.element.find("#manageButtonPanel").find("#DeletePanel")).prop('disabled', true);
 				}
 	}
	 		}		
	 	},
	 	showNotificationOnSaveAndCancel : function(message){
	 			var $this = this;
	 			var date = new Date();
				var id=$this._getMapWindowId()+"_"+$this.options.id+"_"+date.getMilliseconds();
			 	var notification = new $si.notification.Notification({
											id:id,
											windowId 		: $this._getMapWindowId(),
											errorMessage	: message,
											sourceId		: $this.options.id,
											source			: $this.options.id,
										});
					try{
					$si.notification.addInfo(notification);
					$si.notification.showNotificationById($this._getMapWindowId(),id);
					}catch(e){
					$si.Logger('businessviewlistener').warn('notification reference error '+e.message);
					}
	 	},
	 	_resizeWindow : function(event){
		 	this.setGridData();
		 },
		 
		 minimizeWindow : function(){
 	 			var siWindow = $(this.element).data("kendoWindow");
 	        	 siWindow.wrapper.fadeOut(300);
 	 	},

	 });
}));