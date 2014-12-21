define([
  'jquery',
  'siViewerData',
  'jquery-ui',
  'kendo',
  'siViewerNamespace',
  'common/com.spacetimeinsight.viewer.ui.tree',
  'common/com.spacetimeinsight.viewer.ui.nestedWindow',
  'common/com.spacetimeinsight.viewer.ui.window',
  'businessView/com.spacetimeinsight.viewer.ui.layerRightClickMenu',
  'test/com.spacetimeinsight.i18N.favorite.regional'
],function($){
	$.widget('spacetimeinsight.siViewerFavoriteMenu',$.spacetimeinsight.siViewerToolBarMenu,{

		NAMESPACE : "spacetimeinsight",
		pluginName:"siViewerFavoriteMenu",

	//FIXME - This is internalization content, please check com.spacetimeinsight.viewer.operators.regional.js implementation
		ADD_FAVORITE_MENU_ITEM: "Add to Favorites ...",
		UPDATE_FAVORITE_MENU_ITEM: "Update",
		MANAGE_FAVORITE_MENU_ITEM: "Manage ...",
		CLEAR_FAVORITE_MENU_ITEM: "Clear Favorite",
		MENU_ITEM: kendo.template("<span id='#= id #' name='#= description #' class='fav-id-container'>#= name #</span>"),
		LINE: kendo.template('<hr id="#= id #" style="margin-top:15px;position:relative;">'),
		IFRAME_SHIM: kendo.template('<iframe id="favoriteMenu_shim" src="about:blank" frameborder="0" scrolling="no" style="z-index: -100000;top: 0px;position: absolute;width: 100%;height: 100%;left:0px;">&amp;lt;div id="favoriteMenuDiv"&amp;gt;&amp;lt;/div&amp;gt;</iframe>'),
		options:{
			dataSource: []
		},

		_create: function(){
			var $this = this;
		 	var favElement = this.element;
		 	var items = [
					        { text: this.MENU_ITEM({id:"saveOption",name:this.ADD_FAVORITE_MENU_ITEM,description: ""}),encoded: false,imageUrl :'css/images/blank_transparent.png'},
					        { text: this.MENU_ITEM({id:"updateOption",name:this.UPDATE_FAVORITE_MENU_ITEM,description: ""}),encoded: false,imageUrl :'css/images/blank_transparent.png'},
					        { text: this.MENU_ITEM({id:"manageOption",name:this.MANAGE_FAVORITE_MENU_ITEM,description: ""}),encoded: false,imageUrl :'css/images/blank_transparent.png'},
					        { text: this.MENU_ITEM({id:"clearOption",name:this.CLEAR_FAVORITE_MENU_ITEM,description: ""}),encoded: false,imageUrl :'css/images/blank_transparent.png'},
					];


		 	//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.dataSource = [{ text:"", spriteCssClass: "icon-favorites",
				items: items
			}];
			this._super();
			$(this.element).addClass('favorite-not-applied');
			this.createFavoriteDataCache();
			this.enableUpdateOption(false);
			this.enableClearOption(false);
			$(this.element).find('ul').prepend(this.IFRAME_SHIM);
			this.addToolTipToMenu();
	 },

	 appendItemToFavoriteMenu: function(item){
		 var favItem = {};
		 var noOfItems,clearOption;
		 var windowId = this.options.parentId;
		 if(item != null){
			 if(item.isOwner=="N" && item.duplicate!=null && item.duplicate){
			 favItem = {text: this.MENU_ITEM({id: item.id,name: item.name+'('+item.userName+')',description: item.description}),encoded: false,imageUrl :'css/images/blank_transparent.png'};
			 }
			 else{
			favItem = {text: this.MENU_ITEM({id: item.id,name: item.name,description: item.description}),encoded: false,imageUrl :'css/images/blank_transparent.png'};
			 }
		 }
		 var menu = $(this.element).data("kendoMenu");
		 if(menu != null){
			 noOfItems = $si.viewer.manageFavoriteData[windowId].list.length;
			 if(noOfItems == 1){
				clearOption = this.getItemById("clearOption");
				clearOption.addClass('favorite-menu-separator');
			 }
			 menu.append(favItem,this.getLastItem());
		 }
		 
		 if(item.isDefault=="Y"){
			 this.enableClearOption(true);
			// Check added for update option in case of shared favorite as default if user is owner only than update option should be enabled
			 if(item.isOwner=="Y"){
			 this.enableUpdateOption(true);
			 }
			 this.options.appliedFavoriteName=$(this.element).find('#'+item.id).text();
			
		 }
		 this.addToolTipToMenu();
	 },

	 createFavoriteDataCache : function(){
			var params = {};
			params.operation ="retrieveFavorites";
			params.windowId = this.options.parentId;
			params.moduleId = $si.viewer.selectedModuleModel.selectedModule.id;

			if(params.windowId != null){
				$si.routes.processFavoriteData(this.onFavoriteDataSuccess.bind(this),this.onFavoriteDataFault.bind(this),params);
			}
		},

		onFavoriteDataSuccess: function(data){
			var windowId= data.windowId;
			var favList;
			var  $this = this;
			var defaultFavorite;
			if(data.favorites != null){
				favList = data.favorites;
			}
			$si.viewer.manageFavoriteData[windowId] = kendo.observable({
        		list: [],
        		defaultFavorite:null,
			});

			var hasDefaultFavorite = false;
			var defaultFavorite= null;
			var appliedFavoriteName=null;
			if(favList != null){
		 		$.each(favList,function(index,data){
		 			$si.viewer.manageFavoriteData[windowId].list.push(data);
		 			$this.appendItemToFavoriteMenu(data);
		 			if(data.isDefault == "Y"){
		 				hasDefaultFavorite = true;
		 				$si.viewer.manageFavoriteData[windowId].defaultFavorite  = data;
		 				defaultFavorite =data;
		 				$this.appendSelectedStyleToDefaultFavorite(data.id);
		 				appliedFavoriteName=data.name;
		 			}
		 		});
		 		$this.updateDefaultFavoriteInMenu(data.defaultFavoriteId);
				
		 	}
		 	
	 		$this._trigger('loadDefaultFavorite',null,{defaultFavorite: defaultFavorite,appliedFavoriteName:appliedFavoriteName});
		 	
		 	//if(!hasDefaultFavorite) {
		 		//$this._trigger('initializeWindow',null,null);
		 	//}
	 		$si.viewer.manageFavoriteData[windowId].bind("change", function (e) {
			 		if(e.field == "list"){
			 			if(e.items.length > 0){
							var item = e.items[0];
				 			if(e.action == "add"){
				 				$this.appendItemToFavoriteMenu(item);
				 			}else if(e.action == "remove"){
				 				$this.removeItemFromFavoriteMenu(item.id);
				 			}
			 		}
			 	}else if(e.field == "defaultFavorite"){
			 			var sender = e.sender;
			 			var defaultFavorite = sender.defaultFavorite.defaultFavoriteId;
			 			if(defaultFavorite != null && defaultFavorite == ""){
			 				$this.clearDefaultFavorite();
			 			}else{
			 				$this.updateDefaultFavoriteInMenu(defaultFavorite);
			 			}
			 		}
		 	});
		 	
		 	$this._trigger('onFavoriteMenuCreate',null,{defaultFavorite:defaultFavorite});
		},

		onFavoriteDataFault: function(error){
			var $this =this;
			$this._trigger('onFavoriteMenuCreate',null,{defaultFavorite:null});
			if(error._errorCd){
				$si.events.triggerError(
				{
					windowId:this.options.id ,
					message:error._errorDesc,
					sourceId: error.businessViewId,
					sourceTitle:this.options.title
				});
			}
		},

		removeItemFromFavoriteMenu: function(id){
			var item = this.getItemById(id);
			 var noOfItems,clearOption;
		 var windowId = this.options.parentId;
				if(item != null){
					noOfItems = $si.viewer.manageFavoriteData[windowId].list.length;
					if(noOfItems == 0){
				clearOption = this.getItemById("clearOption");
				clearOption.removeClass('favorite-menu-separator');
				 }
					$(this.element).data("kendoMenu").remove(item);
				}
			},

		getItemById: function(id){
	     	var menu = $(this.element).data("kendoMenu").element;
	     	var menuItems = menu.find("li");
	     	var itemToBeRemoved;
	     	$.each(menuItems,function(index,item){
	     		var idContainer = $(item).find('#' + id);
	     		if(idContainer != null){
	     		itemToBeRemoved = idContainer.closest("li");
	     		return false;
	     		}
	     	});
	     	return itemToBeRemoved;
	     },

	     getItemByName: function(name){

	     	return itemToBeRemoved;
	     },

	     updateDefaultFavoriteInMenu: function(defaultFavoriteId){
	     		var menu = $(this.element).data("kendoMenu").element;
	     	var menuItems = menu.find("li");
	     	var dataSourceItem;
	     	$.each(menuItems,function(index,item){
	     		var idContainer = $(item).find('#' + defaultFavoriteId);
	     		if(idContainer.length != 0){
	     			idContainer.append(' *');
	     			return false;
	     		}
	     	});
	     	 //this.reCreateMenu();
	     },

	     clearDefaultFavorite: function(){
			var parentId = this.options.id;
			var menu = $(this.element).data("kendoMenu").element;
	     	var menuItems = menu.find("li");
				$.each(menuItems,function(index,item){
	     		var idContainer = $(item).find('.fav-id-container:contains("*")');
	     		var itemText;
	     		if(idContainer.length != 0){
	     			itemText = idContainer.text();
	     			itemText = itemText.substring(0,itemText.indexOf('*'));
	     			idContainer.text(itemText);
	     			return false;
	     		}
	     	});
		},

		setDefaultFavoriteInCache: function(windowId,name){
			var item;
			$.each($si.viewer.manageFavoriteData[windowId].list,function(index,item){
				if(item.name == name){
					item.name.append('*');
				}
			});
		},

		enableUpdateOption: function(flag){
			var menu = $(this.element).data("kendoMenu");
			menu.enable(this.getItemById('updateOption'),flag);

		},
		enableClearOption: function(flag){
			var menu = $(this.element).data("kendoMenu");
			menu.enable(this.getItemById('clearOption'),flag);
		},

		addIconToSelectedItem: function(selectedItem){
			 this.removeIconFromSelectedItem();
			 $(selectedItem).find('img').addClass('layer-status-loaded');
			 $('.fav-id-container',selectedItem).addClass('fav-selected');
			 $(this.element).addClass('favorite-applied');
			 $(this.element).removeClass('favorite-not-applied');
		},

		removeIconFromSelectedItem: function(){
			$('.layer-status-loaded',this.element).removeClass('layer-status-loaded');
			$('.fav-selected',this.element).removeClass('fav-selected');
			$(this.element).removeClass('favorite-applied');
			$(this.element).addClass('favorite-not-applied');
		},

		addToolTipToMenu: function(){
			var menuItems = $(this.element).data("kendoMenu").element.find('li');
			var idContainer,favId,text;
			$.each(menuItems,function(index,element){
				text= "";
				if(index != 0){
					idContainer = $(element).find('.fav-id-container');
						if(idContainer){
							favId = idContainer.prop('id');
							if(favId == "saveOption" || favId == "updateOption" || favId == "clearOption" || favId == "manageOption"){
								text = $(element).text();
							}else{
								text = idContainer.attr('name') ? idContainer.attr('name') : $(element).text() ;
							}
							$(element).attr('title',text);
						}

				}
			});
		},

		reCreateMenu: function(appliedFavoriteName){
			var params = {},$this = this;
			params.operation ="retrieveFavorites";
			params.windowId = this.options.parentId;
			params.moduleId = $si.viewer.selectedModuleModel.selectedModule.id;
			if(params.windowId != null){
				$si.routes.processFavoriteData(function(data){
						$this.reCreateSuccess(data,appliedFavoriteName)
				}
				,this.onFavoriteDataFault,params);
			}
		},
		reCreateSuccess: function(data,appliedFavoriteName){
			var favList;
			var $this = this;
			var windowId = this.options.parentId;
			var items = [
					        { text: this.MENU_ITEM({id:"saveOption",name:this.ADD_FAVORITE_MENU_ITEM,description: ""}),encoded: false,imageUrl :'css/images/blank_transparent.png'},
					        { text: this.MENU_ITEM({id:"updateOption",name:this.UPDATE_FAVORITE_MENU_ITEM,description: ""}),encoded: false,imageUrl :'css/images/blank_transparent.png'},
					        { text: this.MENU_ITEM({id:"manageOption",name:this.MANAGE_FAVORITE_MENU_ITEM,description: ""}),encoded: false,imageUrl :'css/images/blank_transparent.png'},
					        { text: this.MENU_ITEM({id:"clearOption",name:this.CLEAR_FAVORITE_MENU_ITEM,description: ""}),encoded: false,imageUrl :'css/images/blank_transparent.png'},
					];
			this.removeAllItemsFromMenu();
			if(data.favorites != null){
				favList = data.favorites;
			}
			$.each(items,function(index,item){
				var menu = $($this.element).data('kendoMenu');
				menu.append(item,$this.getLastItem());
			});
		
			if(this.options.appliedFavoriteName){
				this.enableUpdateOption(false);
				this.enableClearOption(false);
			}
			
			if(this.options.parentId == "si-viewer-siviewergoogleearth"){
				$(this.element).find('ul').prepend(this.IFRAME_SHIM);
			}
			$si.viewer.manageFavoriteData[windowId].list = [];
			if(favList != null){
		 		$.each(favList,function(index,data){

		 			$si.viewer.manageFavoriteData[windowId].list.push(data);
		 			if(data.displayUserName){
		 					//data.name = data.name + "(" + data.userName + ")";
		 					//flag to display
		 				}
		 			$this.appendItemToFavoriteMenu(data);
		 			if(data.isDefault == 'Y'){
						$this.updateDefaultFavoriteInMenu(data.id);
						$this._trigger('loadDefaultFavorite',null,{defaultFavorite: data,appliedFavoriteName:data.name});
						
					}
					if(data.name == appliedFavoriteName){
						$this.appendSelectedStyleToDefaultFavorite(data.id);
					}
		 		});
		 		if(data.defaultFavoriteId == 0){
					$this._trigger("cleardefaultfavorite");
				}
		 	}
		},
		removeAllItemsFromMenu: function(){
			var menu = $(this.element).data("kendoMenu");
	     	var menuItems = menu.element.find("li");
	     	var itemToBeRemoved;
	     	$.each(menuItems,function(index,item){
	     			if(index != 0)
	     			menu.remove(item);
	     		});
		},
		
		appendSelectedStyleToDefaultFavorite: function(defaultFavoriteId){
			 $(this.element).find('#'+ defaultFavoriteId).prev().addClass('layer-status-loaded');
			$(this.element).find('#'+ defaultFavoriteId).addClass('fav-id-container fav-selected');
			 $(this.element).addClass('favorite-applied');
		}

	});
});