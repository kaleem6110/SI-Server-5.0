
define([
	'jquery',
	'jquery-ui',
	'kendo',
    'favorite/com.spacetimeinsight.viewer.ui.favoriteMenu',
    'favorite/com.spacetimeinsight.viewer.ui.addFavoriteComponent',
    'favorite/com.spacetimeinsight.viewer.ui.manageFavoriteComponent',
	],function() {

	$si.favoriteUtil = {
		GENERIC_DIV 		 : kendo.template("<div id ='#= id #'></div>"),
		
		bindFavoriteMenu: function (window,toolBarWidget) {
			var $this = this;
			$(window.options.toolBar)[toolBarWidget]().bind(toolBarWidget.toLowerCase() +"_favoritemenuclicked",function(event,data){
				var targetElement = data.domElement;
				var targetElementId;
				var operation,favObj;
				var manageFavData =$si.viewer.manageFavoriteData;
				var parentElementId = $(window.element).attr("id");
				if(!parentElementId) parentElementId = window.id;
				var favMenuComponent,params,selectedFavorite,dataObj,favoriteData;
				if(targetElement != null){
					targetElementId = $(targetElement).find('.fav-id-container').prop("id");
					if(targetElementId == "saveOption"){
						operation= "addFavorite";
						$(window.element).append($this.GENERIC_DIV({id:"saveWindowDiv_" + parentElementId}));
						window.options.addFavoriteComponent = window.element.find('#' + "saveWindowDiv_" + parentElementId);
						window.options.addFavoriteComponent.siViewerAddFavoriteComponent({
							favoriteSaveClicked : function(e,data){
								dataObj = window.getFavoriteDetails();
								favoriteData = JSON.stringify(dataObj);
								params = {};
								params.favoriteJson = JSON.stringify({ windowId : parentElementId,moduleId: $si.viewer.selectedModuleModel.selectedModule.id,name:data.favoriteName ,description: data.favoriteDescription,isShared:data.isShareAllChecked,favoriteData: favoriteData});
								params.operation = operation;
								params.moduleId = $si.viewer.selectedModuleModel.selectedModule.id;
								params.favoriteData = favoriteData;
								$si.routes.processFavoriteData($this.onFavoriteDataSuccess.bind(window),$this.onFavoriteDataFailure.bind(window),params);
							},
							parentElementId: parentElementId,
							parentWindowTitle: window.options.title
						});
					}else if(targetElementId == "manageOption"){
						$(window.element).append($this.GENERIC_DIV({id: "manageWindowDiv_" + parentElementId}));
						$(window.element).find('#' + 'manageWindowDiv_' + parentElementId).siViewerManageFavoriteComponent({dataSource: manageFavData,parentElementId: parentElementId,parentWindowTitle: window.options.title}).bind("siviewermanagefavoritecomponent_managefavoritesaveclicked",function(e,data){
							var deletedFavoriteIds = data.deleteFavoriteId;
							var sharedFavoriteIds = data.shareFavoriteId;
							var unsharedFavoriteIds = data.unshareFavoriteId;
							params = {};
							params.operation = "saveAll";
							params.moduleId = $si.viewer.selectedModuleModel.selectedModule.id;
							params.deletedFavoriteId = data.deleteFavoriteId.join();
							params.defaultFavoriteId = data.defaultFavId;
							params.windowId = parentElementId;
							params.isDefault = data.isDefault;
							params.favoriteOrder = data.favoriteOrder;
							//params.sharedFavorites=data.shareFavoriteId.join();
							params.sharedFavorites=data.shareFavoriteId.join();
							params.unsharedFavorites=data.unshareFavoriteId.join();
							window.options.isDefaultFavorite = data.isDefault;
							window.options.deleteFavoriteId = data.deleteFavoriteId;
							$si.routes.processFavoriteData($this.onFavoriteDataSuccess.bind(window),$this.onFavoriteDataFailure,params);
						});

					}else if(targetElementId == "clearOption"){
						window.clearFavorite();
						window.options.appliedFavoriteName = null;
					}else if(targetElementId == "updateOption"){
						selectedFavorite = window.options.appliedFavoriteName;
						if(selectedFavorite != null){
							params = {};
							params.operation = "updateFavorite";
							params.windowId = parentElementId;
							params.moduleId = $si.viewer.selectedModuleModel.selectedModule.id;
							params.favoriteName = selectedFavorite;
							dataObj = {};
							dataObj = window.getFavoriteDetails();
							params.favoriteData = JSON.stringify(dataObj);
							$si.routes.processFavoriteData($this.onFavoriteDataSuccess.bind(window),$this.onFavoriteDataFailure.bind(window),params);
						}
					}
					else {
						favObj = $this.getFavoriteDetailById(window.options.id,targetElementId);
						window.applyFavorite(favObj);
						window.options.appliedFavoriteName = favObj.name;
						var flag=favObj.isOwner;
						if(flag=="N"){
							flag=false;
						$(window.options.toolBar)[toolBarWidget]("enableClearOption",true);
						$(window.options.toolBar)[toolBarWidget]("enableUpdateOption",flag);
						}
						else{
							flag=true;
							$(window.options.toolBar)[toolBarWidget]("enableClearOption",flag);
						$(window.options.toolBar)[toolBarWidget]("enableUpdateOption",flag);
						}

						$(window.options.toolBar)[toolBarWidget]("addIconToSelectedItem",targetElement);
					}
				}

			});

		},
		
		onFavoriteDataSuccess : function(data,deleteFavoriteId,sharedFavoriteIds,unsharedFavoriteIds){
			var windowId= data.windowId;
			var retrivedFavList;
			var windowFavoriteList;
			var $this = this;
			if(data._errorCd){
				$si.DialogBox.show("Error Adding "+this.options.title+" Favorite",data._errorDesc,"","OK",this.options.id,this.getWindowStyles().windowAttributes);
			}
			if(data.operation == "addFavorite"){
				if(data.favorites != null){
					retrivedFavList = data.favorites;
					if(retrivedFavList.length != 0){
						windowFavoriteList = $si.viewer.manageFavoriteData[windowId].list;
						if(windowFavoriteList != null){
							windowFavoriteList.push(retrivedFavList[0]);
						}
					}
				}
				var shared=retrivedFavList[0].isShared;
				if(shared=="Y"){
					$si.DialogBox.show("Add "+this.options.title+" Favorite",data.favorites[0].name+ " has been saved and shared","","OK",this.options.id,this.getWindowStyles().windowAttributes);
				}else{
					$si.DialogBox.show("Add "+this.options.title+" Favorite",data.favorites[0].name+ " has been saved","","OK",this.options.id,this.getWindowStyles().windowAttributes);
				}
				$(this.options.toolBar)[this.options.toolBarWidget]("reCreateMenu",this.options.appliedFavoriteName);
			}else if(data.operation == "saveAll"){
//				$si.viewer.manageFavoriteData[this.options.id] = data.favorites;
				$(this.options.toolBar)[this.options.toolBarWidget]("reCreateMenu",this.options.appliedFavoriteName);
			}else if(data.operation == "updateFavorite"){
				$si.favoriteUtil.updateFavoriteInCache(data,this.options,$this);
			}

		},

		onFavoriteDataFailure : function(data){
			if(data._errorCd){
				$si.DialogBox.show("Error Adding "+this.options.title+" Favorite",data._errorDesc,"","OK",this.options.id,this.getWindowStyles().windowAttributes);
			}
		},
	
	
		getFavoriteDetailById: function(windowId,favoriteId){
			var windowFavoriteData = $si.viewer.manageFavoriteData[windowId];
			var favList,favObj;
			if(windowFavoriteData != null){
				favList = windowFavoriteData.list;
			}
			$.each(favList,function(index,element){
				if(element.id == favoriteId){
					favObj = element;
					return false;
				}
			});
			//console.log(favObj);
			return favObj;
		},	
		
		updateDefaultFavoriteInCache: function(defaultFavoriteId){
			var parentId = this.options.id;
			$si.viewer.manageFavoriteData[parentId].set("defaultFavorite", {defaultFavoriteId:""});
			if(this.options.isDefaultFavorite){
				$si.viewer.manageFavoriteData[parentId].set("defaultFavorite", {defaultFavoriteId:defaultFavoriteId});
			}
		},
		
		updateFavoriteInCache: function(data,options,$this){
			//var $this = this;
			if(data.success){
				var parentId = data.favorites[0].windowId;
				var favoriteData = data.favoriteData;
				var updatedFavorite = data.favorites != null ? data.favorites[0] : null;
				var favList = $si.viewer.manageFavoriteData[parentId].list;
				var elementIndex = -1;
				if(updatedFavorite != null){
					$.each(favList,function(index,element){
						if(element.id == updatedFavorite.id){
							element.favoriteData = updatedFavorite.favoriteData;
							return false;
						}
					});
				}
				$si.DialogBox.show(options.title+" Favorite",data.favorites[0].name+ " has been updated","","OK",options.id,$this.getWindowAttributes().windowAttributes);
			}
			else{
				$si.DialogBox.show("Error Adding "+options.title+" Favorite","Error Occured while updating " + data.favorites[0].name + "Favorite","","OK",options.id,$this.getWindowAttributes().windowAttributes);
			}

		},
		

		deleteFavoritesFromCache: function(deletedFavoriteIds){
			var windowId = this.options.id;
			var favoriteData = $si.viewer.manageFavoriteData[windowId];
			var itemIndex,favoriteId;
			$.each(deletedFavoriteIds,function(index,element){
				$.each(favoriteData.list,function(i,e){
					if(e.id == element){
						itemIndex = i;
						return false;
					}
				});
				favoriteData.list.splice(itemIndex,1);
			});
		},				
		
	}
});