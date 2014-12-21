define([
    'jquery',
    'jquery-ui',
    'kendo',
    "table-bootstrap",
    "table-theme",
    'table-Grid-API'
],
(function($){
	$.widget('spacetimeinsight.siViewerManageFavoriteComponent',{
		
		NAMESPACE : "spacetimeinsight",
		pluginName:"siViewerManageFavoriteComponent",
		ADD_FAVORITE_MENU_ITEM: "Add to Favorites",
		DIV_CONTENT: kendo.template("<div id='manageButtonPanel' style='float:right; width: 30%'></div>"),
		BUTTON: kendo.template('<button id= "#= id #Panel" # if(disabled){ #  disabled= "#= disabled #" # } #  class="#= className #" style="width: 85px;">#= name #</button># if(!notBr){# <br/> # }#'),
		CONTAINER_TEMPLATE : kendo.template("<div style='' class='f-grid-wrapper'><div id='#= id #' style='width: 100%; height: 100%' class='f-custom-grid'></div></div><div id='manageButtonPanel' class='f-left-controls' style=''></div>"),
		FOOTER_DIV: kendo.template('<div id="footerPanel" class="f-bottom-controls" style="height: 40px"></div>'),
		CONTAINER_DIV: kendo.template('<div id="containerDiv"></div>'),
		options:{
			dataSource: [],
			deleteFavoriteNames: [],
			selectedIndex: -1,
		},
		
		_create: function(){
			var $this = this,grid,panel,contentDiv;
		 	var manageFavElement = this.element;
		 	var dataSource = this.options.dataSource;
		 	var parentId = this.options.parentElementId;
		 	var manageFavData = $si.viewer.manageFavoriteData[parentId],tempFavList = [];
		 	var defaultFavId,isDefault,outerContainer,deleteFavoriteId = [],shareFavoriteId=[],unshareFavoriteId=[];
		 	var windowAttributes = {
						width:"560px",
						height: "275px",
						position:{
							top: "100px",
							left: "120px",
						},
						modal:true,
					};
		 	//used in event handling. Each event is prefix by plugin name
		 	this.widgetEventPrefix = this.pluginName + "_";
		 	$(this.element).addClass('f-layout');
//UnComment	
		 	if(manageFavData != null){
		 		$.extend(tempFavList,$si.viewer.manageFavoriteData[parentId].list)
		 	}
		 	 this.options.tempFavData = kendo.observable({
		 		list: tempFavList
	//	 		list: $si.viewer.manageFavoriteData[parentId].list
		 	});
		 	 
		 	 tempFavData = this.options.tempFavData;
	//End UnComment	 	
 
		 	$(manageFavElement).siViewerWindow({
		 		windowAttributes: windowAttributes,
	 			shimRequired: true,
	 			toolBarWidget:null,
	 			actions: ["close"],
	 			title: "Manage " + $this.options.parentWindowTitle + " Favorites",
	 			windowIcon: "css/images/favorites_window.png"
			});
		 	
		 	this._createManageGrid();
		 	
		 	this.options.manageGrid.rollOverColor = 0x8dcbe4;
		 	this.options.manageGrid.textRollOverColor = 0xFFFFFF;
		 	this.options.manageGrid.selectionColor = 0x2c95d2;			
		 	this.options.manageGrid.activeCellColor = 0x2c95d2;
		 	this.options.manageGrid.alternatingItemColors = [0xE4EFFF, 0xF9F9F9];
	//	 	this._populateDataInGrid($si.viewer.manageFavoriteData[parentId]);
		 	this._populateDataInGrid(tempFavData);
		 	this._createButtonPanel();
		 	this._createFooterPanel();
		 	this.element.parent().css("z-index","9000002");
			$(".k-overlay").css("z-index","9000001");
			$(".sti-window-google-earth").hide();
			$(manageFavElement).find("#SavePanel").on("click",function(e){
		 		var eventData ={domElement: this,deleteFavoriteId: deleteFavoriteId,defaultFavId: defaultFavId,isDefault: isDefault,shareFavoriteId:shareFavoriteId,unshareFavoriteId:unshareFavoriteId};
		 		eventData.favoriteOrder =  $this.getFavoriteIdInOrder();
		 		$this._trigger("manageFavoriteSaveClicked",null,eventData);
		 		deleteFavoriteId = [];
		 		defaultFavId = -1;
		 		//$this.options.deleteFavoriteNames.splice(0,len);
		 		$this.closeWindow();
		 	});
		 	
		 	$(manageFavElement).find("#SharePanel").on("click",function(e){
		 		var favoriteId = $this.shareFavoritesFromGrid();
				shareFavoriteId.push(favoriteId);
				$this.enableSaveButton();
		 		var eventData ={domElement: this,shareFavoriteId: favoriteId};
		 		eventData.favoriteOrder =  $this.getFavoriteIdInOrder();
		  		
		 	});
		 	 
		 	$(manageFavElement).find("#UnSharePanel").on("click",function(e){
		 		var favoriteId = $this.UnshareFavoritesFromGrid();
		 		unshareFavoriteId.push(favoriteId);
				$this.enableSaveButton();
		 		var eventData ={domElement: this,unshareFavoriteId: favoriteId};
		 		eventData.favoriteOrder =  $this.getFavoriteIdInOrder();
		 		
		 	});
		 	 
	 	
		 	$(manageFavElement).find('#' + "CancelPanel").on("click",function(){
		 		$this.closeWindow();
		 	});
		 	
		 	$(manageFavElement).find('#' + "DeletePanel").on("click",function(){
		 		var favoriteId = $this.deleteFavoritesFromGrid();
		 		$this.enableSaveButton();
		 		deleteFavoriteId.push(favoriteId);
		 	});
		 	
		 	$(manageFavElement).on("click",'#MoveUpPanel',function(){
		 		$this.movingRowUp(true);
		 		$this.enableSaveButton();
		 	});
		 	
		 	$(manageFavElement).on("click",'#MoveDownPanel',function(){
		 		$this.movingRowUp(false);
		 		$this.enableSaveButton();
		 	});
		 	
		 	$(manageFavElement).on('click','#SetDefaultPanel',function(e){
		 		var favId;
		 		var selectedItem = $this.options.manageGrid.getSelectedItems();
		 		if(selectedItem != null && selectedItem[0] != null){
		 			favId= selectedItem[0].id;
		 		}
		 			defaultFavId = favId;
		 			isDefault = true;
		 		
		 		$this.enableSaveButton();
		 	});
		 	
		 	$(manageFavElement).on('click','#ClearDefaultPanel',function(e){
		 		var favId;
		 		var selectedItem = $this.options.manageGrid.getSelectedItems();
		 		if(selectedItem != null && selectedItem[0] != null){
		 			favId= selectedItem[0].id;
		 		}
		 			defaultFavId = favId;
		 			isDefault = false;
		 		
		 		$this.enableSaveButton();
		 	});
		 	
		 	$(manageFavElement).parent().find('.k-header').dblclick(function(e){
				e.stopPropagation();
			});
		 	$(manageFavElement).parent().find('.k-i-close').on('click',function(e){
		 		$this.closeWindow();
		 	});
	 },
	 
	 _createManageGrid: function(){
		 var grid,gridCell;
		 $(this.element).append(this.CONTAINER_TEMPLATE({id: "manageGrid"}));
		 grid = $(this.element).find('#manageGrid');
		 this.options.manageGrid  = new flexiciousNmsp.FlexDataGrid(grid[0],
								{
									id:'manageGridContent',
					});
		 this.options.manageGrid.imagesRoot = $si.tableGridUtils.IMAGE_PATH;
		 this.options.manageGrid.setColumnLevel(new flexiciousNmsp.FlexDataGridColumnLevel(grid));
		 this.options.manageGrid.getColumnLevel().pageSize = 4;
		 this.options.manageGrid.addEventListener(null,"selectAllCheckBoxChanged",this.manageHeaderClicked.bind(this));
		 this.options.manageGrid.addEventListener(null,"itemClick",this.validatingButtonPanel.bind(this));
	 },
	 
	 manageHeaderClicked : function(e){
		 	var $this = this;
			var selectedCheckBox = $('.flexDataGridHeaderCell .checkBoxSelected','#manageGrid');
			if(selectedCheckBox.length != 0){
				$($this.element).find('#MoveUpPanel').attr('disabled',true);
	 			$($this.element).find('#MoveDownPanel').attr('disabled',true);
	 			$($this.element).find('#SharePanel').attr('disabled',true);
	 			$($this.element).find('#UnSharePanel').attr('disabled',true);
	 			$($this.element).find('#SetDefaultPanel').attr('disabled',true);
	 			$($this.element).find('#ClearDefaultPanel').attr('disabled',true);
	 			$($this.element).find('#DeletePanel').attr('disabled',true);
			}else{
				$($this.element).find('#MoveUpPanel').attr('disabled',true);
	 			$($this.element).find('#MoveDownPanel').attr('disabled',true);
	 			$($this.element).find('#SharePanel').attr('disabled',true);
	 			$($this.element).find('#UnSharePanel').attr('disabled',true);
	 			$($this.element).find('#SetDefaultPanel').attr('disabled',true);
	 			$($this.element).find('#ClearDefaultPanel').attr('disabled',true);
	 			$($this.element).find('#DeletePanel').attr('disabled',false);
				
			}
		},
		
		
		
	 enableSaveButton: function(){
		 var saveButton = $(this.element).find('#SavePanel');
		 saveButton.attr('disabled',false);
	 },
	 
	 _createButtonPanel: function(){
		 	var panel = $(this.element).find('#manageButtonPanel');
		 	panel.append(this.BUTTON({id: "MoveUp", notBr:false,disabled:true,name: "Move","className": "action-button" }));
		 	panel.append(this.BUTTON({id: "MoveDown", notBr:false,disabled:true,name: "Move","className": "action-button"}));
		 	panel.find('#MoveDownPanel').css('margin-top','5px');
		 	panel.find('#MoveDownPanel').addClass('b-move-down');
		 	panel.find('#MoveUpPanel').addClass('b-move-up');
		 	panel.append(this.BUTTON({id: "Share", notBr:false,disabled:true,name: "Share","className": "action-button"}));
		 	panel.find('#SharePanel').css('margin-top','5px');
		 	panel.append(this.BUTTON({id: "UnShare", notBr:false,disabled:true,name: "Unshare","className": "action-button"}));
		 	panel.find('#UnSharePanel').css('margin-top','5px');
		 	panel.append(this.BUTTON({id: "SetDefault", notBr:false,disabled:true,name: "Set Default","className": "action-button"}));
		 	panel.find('#SetDefaultPanel').css('margin-top','5px');
		 	panel.append(this.BUTTON({id: "ClearDefault", notBr:false,disabled:true,name: "Clear Default","className": "action-button"}));
		 	panel.find('#ClearDefaultPanel').css('margin-top','5px');
		 	panel.append(this.BUTTON({id: "Delete", notBr:false,disabled:true,name: "Delete","className": "action-button"}));
		 	panel.find('#DeletePanel').css('margin-top','5px');
	 },
	 
	 _createFooterPanel: function(){
		 var contentDiv;	
		 $(this.element).append(this.FOOTER_DIV);
		 contentDiv = $(this.element).find('#footerPanel');
		 contentDiv.append(this.BUTTON({id:"Cancel", notBr:true,disabled:false,name:"Cancel","className": "cancel-button"}));
		 contentDiv.find('#CancelPanel').css({"float": "right","margin-right":"10px"});
		 contentDiv.append(this.BUTTON({id:"Save", notBr:true, disabled: true,name:"Save","className": "apply-button"}));
		 contentDiv.find('#SavePanel').css({"float":"right","margin-right":"10px"});
	 },
	 
	 _populateDataInGrid: function(tempFavData){
		var gridColumn;
		var gridData = [];
		var manageGrid = this.options.manageGrid;
		manageGrid.setHorizontalScrollPolicy("auto");
		if(tempFavData != null){
			gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("name","Name");
			gridColumn.headerAlign = 'left';
		 	gridColumn._width = 140;
		 	gridColumn.minWidth = 50;
		 	gridColumn.setLabelFunction(this.appendDefaultIconToColumn.bind(this));
		 	gridColumn.truncateToFit = true;
		 	manageGrid.addColumn(gridColumn);
		 	gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("owner","Owner");
		 	gridColumn._width = 100;
		 	gridColumn.minWidth = 50;
		 	gridColumn.headerAlign = 'left';
		 	gridColumn.setLabelFunction(this.appendShareIconToColumn.bind(this));
		 	//gridColumn.truncateToFit = true;
		 	gridColumn.setColumnWidthMode('fitToContent');
		 	manageGrid.addColumn(gridColumn);
		 	gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("description","Description");
		 	gridColumn._width = 150;
		 	gridColumn.minWidth = 50;
		 	gridColumn.headerAlign = 'left';
		 	gridColumn.truncateToFit = true;
		 	manageGrid.addColumn(gridColumn);
		 	manageGrid._selectionMode="singleRow";
		 	
		 	for( var i = 0; i < tempFavData.list.length ; i++){
		 		gridData.push(tempFavData.list[i]);
		 	}
		 		
		 	this.options.gridData = gridData;
		 	manageGrid.setDataProvider(gridData);
		 	manageGrid.reDraw();
		 	manageGrid.rebuild();
		}
	 },
	 appendDefaultIconToColumn : function(cell){
			var imagesUrl = "";
			var ownerName=cell.name;
			var parentId = this.options.parentElementId;
			if($si.viewer.manageFavoriteData[parentId].list != null){
					for(var i=0;i<$si.viewer.manageFavoriteData[parentId].list.length;i++){
						if($si.viewer.manageFavoriteData[parentId].list[i].isDefault== "Y"){
							var favId= $si.viewer.manageFavoriteData[parentId].list[i].id;
							if(favId && cell.id == favId){
								ownerName = ownerName + " * ";
								this.options.defaultFavoriteId = favId;
								$(this.element).find('#ClearDefaultPanel').attr('disabled',false);
							}
						}
					}
			}
			return ownerName;
	 },
	 
	 appendShareIconToColumn : function(cell){
	    	var imagesUrl = "";
			var ownerName=cell.owner;
			var parentId = this.options.parentElementId;
			
			if(cell.owner==$si.viewer.userModel.userInfo.loginId){
				ownerName = "me";
			}
			if(cell.isShared == "Y")
			{
				if(cell.isOwner == "Y"){
					//alert(ownerName+'<span><img src="css/images/hand_point.png"></span>');
					return imagesUrl=   ownerName + '&nbsp;<span><img src="css/images/hand-right.png"></span>'  ;
				}else{
					return imagesUrl=  cell.userName+ '&nbsp;<span><img src="css/images/hand-left.png"></span>'  ;
				}
			}else 
			{
				return 	ownerName;
			}
	 },
	 
	 getFavoriteIdInOrder: function(){
	 	var favoriteId= "";
	 	$.each(this.options.gridData,function(index,element){
	 		favoriteId = favoriteId + element.id + ",";
	 	});
	 	return favoriteId;
	 },
	 
	 deleteFavoritesFromGrid: function(){
	 		//$(manageFavElement).siViewerNestedWindow("destroy");
	 		var row,favId,itemIndex,manageGrid;
	 		var $this = this;
	 		itemIndex = this.options.manageGrid.getSelectedIndex();
	 		/*this.options.deleteFavoriteNames = [];
	 				itemIndex = -1;
	 				favName = $(element).text();
	 				$this.options.deleteFavoriteNames.push(favName);
	 				$.each($this.options.gridData,function(index,item){
	 					if(item.name == favName){
	 						itemIndex = index;
	 						return false;
	 					}
	 				});*/
	 		favId = this.options.manageGrid.getSelectedItems()[0].id;
	 		//$this.options.deleteFavoriteNames.push(favId);
	 				if(itemIndex != -1){
	 					$this.options.gridData.splice(itemIndex,1);
	 				}
	 			
	 			$this.setGridData();
	 			$this.validatingButtonPanel();
	 			return favId;
	 	},
	 	shareFavoritesFromGrid: function(){
	 		var row,favId,itemIndex,manageGrid;
	 		var $this = this;
	 		itemIndex = this.options.manageGrid.getSelectedIndex();
	 		
	 		favId = this.options.manageGrid.getSelectedItems()[0].id;
	 		return favId;
	 	},
		UnshareFavoritesFromGrid: function(){
	 		var row,favId,itemIndex,manageGrid;
	 		var $this = this;
	 		itemIndex = this.options.manageGrid.getSelectedIndex();
	 		
	 		favId = this.options.manageGrid.getSelectedItems()[0].id;
	 		return favId;
	 	},
	 	movingRowUp: function(moveUpFlag){
	 		var itemIndex = this.options.manageGrid.getSelectedIndex();
	 		var favName,item,newIndex;
	 		var gridData = this.options.gridData;
	 		newIndex = moveUpFlag ? itemIndex -1 : itemIndex + 1;	
	 		item = gridData[itemIndex];
	 		gridData.splice(itemIndex,1);
	 		gridData.splice(newIndex,0,item);
	 		this.setGridData();
	 		this.validatingButtonPanel();
	 	},
	 	
	 	
	 	setGridData: function(){
	 		var manageGrid;
	 		manageGrid = this.options.manageGrid;
	 		manageGrid.setDataProvider(this.options.gridData);
	 		manageGrid.getColumnLevel().pageSize = this.options.gridData.length;
	 		manageGrid.reDraw();
	 		manageGrid.rebuild();
	 	},
	 	
	 	validatingButtonPanel: function(e){
			var selectedIndices,itemIndex = -1;
			var selectedIndex;
			var isShare;
			var isDefault;
			selectedIndex  = this.options.manageGrid.getSelectedIndex();
			if(selectedIndex >=0){
				isDefault=this.options.manageGrid._dataProvider[selectedIndex].isDefault;
				itemIndex = this.options.selectedIndex;
				isShare = this.options.manageGrid._dataProvider[selectedIndex].isShared == 'Y' ? true: false;
				if(this.options.gridData.length==1){
					$(this.element).find('#SetDefaultPanel').attr('disabled',false);
					$(this.element).find('#MoveDownPanel').attr('disabled',true);
					$(this.element).find('#ClearDefaultPanel').attr('disabled',false);
					$(this.element).find('#MoveUpPanel').attr('disabled',true);
					
				}
				else if(selectedIndex == 0 && this.options.gridData.length>1){
					$(this.element).find('#MoveUpPanel').attr('disabled',true);
					$(this.element).find('#MoveDownPanel').attr('disabled',false);
				}else if(selectedIndex == this.options.gridData.length -1){
		 			$(this.element).find('#MoveDownPanel').attr('disabled',true);
		 			$(this.element).find('#MoveUpPanel').attr('disabled',false);
				}else{
					$(this.element).find('#MoveUpPanel').attr('disabled',false);
		 			$(this.element).find('#MoveDownPanel').attr('disabled',false);
				}
				if(this.options.manageGrid._dataProvider[selectedIndex].isOwner=="N"){
					$(this.element).find('#SharePanel').attr('disabled',true);
		 			$(this.element).find('#UnSharePanel').attr('disabled',true);
					$(this.element).find('#DeletePanel').attr('disabled',true);
					$(this.element).find('#SetDefaultPanel').attr('disabled',false);
				}else{
					$(this.element).find('#DeletePanel').attr('disabled',false);
					$(this.element).find('#SetDefaultPanel').attr('disabled',false);
					$(this.element).find('#SharePanel').attr('disabled',isShare);
		 			$(this.element).find('#UnSharePanel').attr('disabled',!isShare);
					
				}
				if(isDefault=="Y"){
					$(this.element).find('#ClearDefaultPanel').attr('disabled',false);
					$(this.element).find('#SetDefaultPanel').attr('disabled',true);
				}
				else{
					$(this.element).find('#ClearDefaultPanel').attr('disabled',true);
					$(this.element).find('#SetDefaultPanel').attr('disabled',false);	
				}
			}else{
				$(this.element).find('#MoveUpPanel').attr('disabled',true);
	 			$(this.element).find('#MoveDownPanel').attr('disabled',true);
	 			$(this.element).find('#SharePanel').attr('disabled',true);
	 			$(this.element).find('#UnSharePanel').attr('disabled',true);
	 			$(this.element).find('#DeletePanel').attr('disabled',true);
	 			$(this.element).find('#SetDefaultPanel').attr('disabled',true);
				$(this.element).find('#ClearDefaultPanel').attr('disabled',true);
			} 
			
		},
	 
	 closeWindow: function(){
		 var window  = $(this.element).data("kendoWindow");
		 if(window != null){
			 $(".sti-window-google-earth").show();
			 window.destroy();
		 }
	 }
	 	
	});
}));