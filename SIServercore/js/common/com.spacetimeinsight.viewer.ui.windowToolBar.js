define([
    'jquery',
    'jquery-ui',
    'kendo',
    'baseWidget',
    'siNotification',
],function($) {
	$.widget('spacetimeinsight.siViewerWindowToolBar',$.spacetimeinsight.siViewerBaseWidget,{
		options : {
			toggleDelay 	: 500,
			windowTools 	: ["FILTER","FAVORITE"],
			tooltip 		: {filter :'Edit data filters',favorite : 'Show favorites',time:'Edit time filter',clear_filter:"Return all filters to system settings" ,analysis:'Run data analysis',manual_refreshicon:'Refresh',businessviewinfo:'Information', showDrawer : 'Show display settings',hideDrawer : 'Hide display settings'},
			enableDrawer	: false,
			showToolbar  	: false,
			showHelpDropdown : false,
			hasFavorites    : false,
		},

		pluginName:"siViewerWindowToolBar",
		toolbarState:false,
		
		HELP_MENU_DATA :  [
		                   	{ text: "", value: "0", selected: false },
				            { text: $si.i18N.Application.HELP_MENU_DATA.siViewerHelp, value: "1", selected: false },
				            { text: $si.i18N.Application.HELP_MENU_DATA.applicationHelp, value: "2", selected: false },
				            ],
		
		//TODO :- Following list needs to be cleaned.

		GENERIC_TOOL   :  kendo.template("<div class='toolbar-icon'><button id='#= tool #Tool' class='#= tool #-icon' title='#= tooltip #'></button></div>"),
		SPLITTER  	   : kendo.template("<div id='#= tool #Tool' class='toolbar-icon'></div>"),
		SPACER  	   : kendo.template("<div id='#= tool #Tool' class='toolbar-icon'></div>"),
		SEARCH         :  kendo.template("<div id='searchParentId' class='toolbar-icon'><div class='#= tool #-icon search-div'><input type='text' value='#= defaultText #' id='searchfield' name = 'searchfield' class='k-input map-search-input'/>" +
				"<button id ='executeSearch' class='map-search' title='#= title #'></button></div></div>"),
		LEFT_TOOLBAR_DIV : kendo.template("<div id='#= id #' class='left-toolbar' ></div>"),
		RIGHT_TOOLBAR_DIV : kendo.template("<div id='#= id #'  class='right-toolbar'></div>"),
		
		EXCEPTION    :  kendo.template("<div id='#= tool #Tool' class='toolbar-icon' title='#= tooltip #'></div>"),
		IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),
		COMBO  : kendo.template("<div class='toolbar-icon'><select id='#= tool #Tool' class='#= tool #Icon'  title='#= tool #'></select></div>"),
		COMBODROPDOWN  : kendo.template("<div id='dropdownId' class='toolbar-icon'><button id ='lassosicon' class='lassosicon'></button><div class='#= tool #-icon'><select id='#= tool #Tool' class='#= tool #Icon'  title='#= tool #'></select></div></div>"),
		HELP_DROPDOWN  : kendo.template("<div class='toolbar-icon win-help-dropdown' title='"+$si.i18N.Application.tooltip.help+"'><select id='win-help-dropdown' class='icon-dropdown'></select></div>"),
		
		LIST:    kendo.template("" +
				"" +
				"" +
				"" +
				"" +
				"" +
				"" +
				"" +
				"" +
				"" +
				"" +
				"" +
				"" +
				"<ul id='#= tool #Tool' class='#= tool #Icon toolbar-icon' title='#= tooltip #'></ul>"),    
		_create : function(){
			this.options.windowTools = this.applyUserPrivilege(this.options.windowTools);
			
			this._super();
		},
		
		_createControls : function(){
			var $this = this;
			$(this.element).addClass("sti-toolbar " + this.pluginName);
			$(this.element).append(this.LEFT_TOOLBAR_DIV({
				id:'leftToolbarDiv',
			}));
			$(this.element).append(this.RIGHT_TOOLBAR_DIV({
				id:'rightToolbarDiv',
			}));
			
			if(!this.options.showToolbar){
				$(this.element).hide();
			}else{
				$this._triggerToggleToolBarEvent();
			}
			
			this._createToolBarButtons(this.options.windowTools);
			this._createExceptionIcon();
			if(this.options.showHelpDropdown){
				this._addHelpDropdown();
			}
			
			if(this.options.enableDrawer){
				this._addDrawerButton();
			}
		},
		
		_bindControls : function(){
			var $this = this;
			$this.element.parent().find(".k-i-expandcollapse").addClass("toolbar-close");
			this.options.evtToggleAllToolbarsFn = this._onevtToggleAllToolbars.bind(this);
			$(document).bind("evtToggleAllToolbars",this.options.evtToggleAllToolbarsFn);
		},

		//Show/Hide toolbar
		toggleToolBar : function(delay){   
			var $this = this;
			var expandCollapseIcon = $this.element.parent().find(".k-i-expandcollapse");
			if(expandCollapseIcon.hasClass('toolbar-close')){
				expandCollapseIcon.removeClass('toolbar-close');
				expandCollapseIcon.addClass('toolbar-open');
			}else{
				expandCollapseIcon.removeClass('toolbar-open');
				expandCollapseIcon.addClass('toolbar-close');
			}
			delay = delay ? delay : this.options.toggleDelay;
			$(this.element).slideToggle(delay);
			$this._triggerToggleToolBarEvent(delay);

		},
		
		_triggerToggleToolBarEvent : function(delay){
			var $this = this;
			setTimeout(function(){	
				//trigger the event after toggle complete
				$this._trigger("onToggleToolBar",null,{
										id:$this.options.id,
										domElement:$($this.element),
										isVisible : $($this.element).css("display") != "none",
										toolbarHeight : $($this.element).height(),
									});
			},delay + 100);	
		},


		showToolBar : function(isShow, delay){
			var $this = this;
			delay = delay?delay:this.options.toggleDelay;
			var expandCollapseIcon = $this.element.parent().find(".k-i-expandcollapse");
			if(isShow) {
				$(this.element).slideDown(delay);
				if(expandCollapseIcon.hasClass('toolbar-close')){
					expandCollapseIcon.removeClass('toolbar-close');
				}
				expandCollapseIcon.addClass('toolbar-open');
			} else {
				$(this.element).slideUp(delay);
				if(expandCollapseIcon.hasClass('toolbar-open')){
					expandCollapseIcon.removeClass('toolbar-open');
				}
				expandCollapseIcon.addClass('toolbar-close');
			}			
			this._triggerToggleToolBarEvent(delay);
		},

		//we will support some predefine set of tools.
		_createToolBarButtons : function(tools){
			var $this = this;
			var domElement;
			if(tools){
				if(!(tools instanceof Array)){
					tools = [tools];
				}
				$(tools).each(function(index,tool){
					var toolId = tool.toLowerCase();
					var toolElement;
					switch (tool){
						case "SPLITTER":
							$($this.element).find("#leftToolbarDiv").append($this.SPLITTER({"tool":toolId}));
						break;
						case "SPACER":
							$($this.element).find("#leftToolbarDiv").append($this.SPACER({"tool":toolId}));
						break;
						//FIXME Can’t you implement some generic even handling. If we follow this approach we have to bind each and every tool.
						case "FAVORITE":
							$($this.element).find("#leftToolbarDiv").append($this.LIST({"tool":toolId,"tooltip":$this.options.tooltip[toolId] ,}));
							toolElement = $($this.element).find('#' + toolId + "Tool");
							$this.options.favoritesMenu =	$(toolElement).siViewerFavoriteMenu({
								dataSource: [],
								parentId: $this.options.parentId,
								loadDefaultFavorite: function(e,data){
									$this._trigger("loaddefaultfavorite",null,data);
								},
								cleardefaultfavorite: function(e){
									$this._trigger("cleardefaultfavorite",null,{});
								},
								onFavoriteMenuCreate: function(e,data){
									$this._trigger("onfavoritemenucreate",null,data);
								}
								
							});
							$(toolElement).siViewerFavoriteMenu().bind("siviewerfavoritemenu" + "_menuitemclicked", function(e,data){
								domElement  = $(data.domElement).children('.k-link').children('.fav-id-container');
								if(domElement.length != 0){
									$this._trigger("favoritemenuclicked",null,{domElement: data.domElement});
								}
							});
							$this.options.hasFavorites = true;
							break;
						case "EXCEPTION":
							break;
						default :
							$this.createToolBarItem(toolId,$this.options.tooltip[toolId],false);
							break;
					}
					$this._bindClickEvent(toolId);
				});
			}
		},
		
		_createExceptionIcon : function() {
			var $this = this;
			var toolId = "exception";
			$($this.element).find("#rightToolbarDiv").prepend($this.EXCEPTION({
				"tool":toolId,
				"tooltip" :$this.options.tooltip[toolId],
			}));
			$this._bindClickEvent(toolId);
		},
		
		createToolBarItem : function(toolId,toolTip,bindEvent){
			var $this = this;
			$($this.element).find("#leftToolbarDiv").append($this.GENERIC_TOOL({
							"tool":toolId,
							"tooltip":toolTip ,
			}));
			if(bindEvent) {
				$this._bindClickEvent(toolId);
			}
		},

		getFavoriteMenuComponent: function(){
			//$(this.options.favoritesMenu).siViewerFavoriteMenu("")
			return this.options.favoritesMenu;
		},
		
		_bindClickEvent : function(toolId){
			var $this = this;
			var dataSource = [{text: "item1",items: [{text: "sub-item1"},{text: "sub-item2"}]},{text:"item2"}];
			//Bind click event
			$($this.element).find("#" + toolId + "Tool").bind("click",function(event){

				//FIXME - what is done here. This seems wrong
				if(toolId == "print"){
					$($this.element).find("#leftToolbarDiv").append($this.LIST({"tool": "demoList"}));
					$($this.element).find('#' +"demoListTool").siViewerToolBarMenu({
						dataSource: dataSource,
						menuItemClicked: function(e,data){
							alert("Item Clicked:" + $(data.org_event.item).text());
						}
					});
				}
				

				if(toolId == "exception"){
					//TODO :- Discuss with manan and refactor.
					$this._trigger("onNotificationClick",null,{id:this.id,domElement:event.target,event:event});
				}
				
				$this._trigger("onToolBarBtnClick",null,{id : toolId, event:event});
			});
		},

		_addDrawerButton : function() {
			var $this = this;
			$(this.element).find("#rightToolbarDiv").append($this.GENERIC_TOOL({tool : "drawer",tooltip:$this.options.tooltip['showDrawer']}));
			$(this.element).find("#drawerTool").css({
										"float" : "right",
										height : "20px",
										width : "27px",
										"vertical-align" : "middle",
									})
								.bind("click",function(event){
										$this._trigger("onDrawerClick",null,{id:this.id,domElement:event.target,event:event});
								})
								.addClass("drawerclassup");
	    },
	    
	    _addHelpDropdown : function() {
	    	var $this = this;
	    	$(this.element).find("#rightToolbarDiv").append($this.HELP_DROPDOWN);
	    	var helpDropdown = $(this.element).find("#win-help-dropdown").siDropDownList({
				dataTextField: "text",
		        dataValueField: "value",
				dataSource : $this.HELP_MENU_DATA,
				shimRequired:true,
			});
	    	var helpDropDownData = helpDropdown.data("kendoDropDownList");
	    	var helplist = helpDropDownData.list;
			var helplistli = helplist.find("li");
			helplistli[0].style.display = 'none';
	    	helpDropDownData.bind("change",function(e){
				var dataItem = this.dataItem();

				$this._loadHelp(dataItem.value,'true');
				helpDropDownData.value("");
			});
	    },

		//Input is a html tag
		addCustomTool : function(tool){
			$(this.element).append(tool);
		},

		getToolBarItem : function(toolId){
            if(toolId){
                toolId = toolId.toLowerCase();
                return $(this.element).find("#" + toolId +"Tool");
            }
        },

		getAllToolBarItems : function(){
			return $(this.element).children();
		},
		
		//TODO :- move all favorite code to separate class
		enableUpdateOption: function(disable){
			$(this.options.favoritesMenu).siViewerFavoriteMenu("enableUpdateOption",disable);
		},
		enableClearOption: function(disable){
			$(this.options.favoritesMenu).siViewerFavoriteMenu("enableClearOption",disable);
		},
		
		addIconToSelectedItem: function(selectedItem){
			$(this.options.favoritesMenu).siViewerFavoriteMenu("addIconToSelectedItem",selectedItem);
		},
		
		removeIconFromSelectedItem: function(selectedItem){
			$(this.options.favoritesMenu).siViewerFavoriteMenu("removeIconFromSelectedItem",selectedItem);
		},
		reCreateMenu: function(appliedFavoriteName){
			$(this.options.favoritesMenu).siViewerFavoriteMenu("reCreateMenu",appliedFavoriteName);
		},
		
		applyUserPrivilege : function(tools) {
			var $this = this;
			var returnTools = [];
           	$.each(tools,function(index,tool){
        		if(tool != null){
					if($si.userPrivileges.getPrivilege($this.options.rightName,tool)) {
						returnTools.push(tool);
					}
        		}
            });
 			return returnTools;
		},

		getToolBarFavoriteSettings : function() {
			$si.Logger('favorite').debug("get toolbar favorite "  );	
			return {};
		},
		
		applyToolBarFavoriteSettings : function(favorite) {
			$si.Logger('favorite').debug("applying toolbar favorite "  );	
		},
		
		_loadHelp : function(menuId,isMenuClicked){
			this._trigger("onHelpItemSelect",null,{menuId:menuId});
		},
		
		reset:function(options) {
			$si.Logger('favorite').debug("reseting toolbar "  );
		},
		
		_onevtToggleAllToolbars: function(event,isShow){
			this.showToolBar(isShow);
		},
		
		unBindGlobalEvents: function(){
			$(document).unbind("evtToggleAllToolbars",this.options.evtToggleAllToolbarsFn);
		}
		

	});

});