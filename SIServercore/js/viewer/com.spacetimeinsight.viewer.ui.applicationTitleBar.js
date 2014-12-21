define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'viewer/com.spacetimeinsight.i18N.application',
    'viewer/com.spacetimeinsight.i18N.application.regional',
    'siDropDownList',
],function($,$si){

	$.widget('spacetimeinsight.siViewerApplicationTitleBar',$.spacetimeinsight.siViewerBaseWidget,{
		options : {
				aboutWindowWidget			: "siViewerAboutWindow",
				aboutWindowWidgetJS 		: "viewer/com.spacetimeinsight.viewer.ui.aboutWindow",
		},

		pluginName:"siViewerApplicationTitleBar",

		APPLICATION_HEIGHT : 25,
		HELP_MENU_DATA :  [
		                   	{ text: "", value: "0", selected: false },
		                   	{ text: $si.i18N.Application.HELP_MENU_DATA.siViewerHelp, value: "1", selected: false },
		                   	{ text: $si.i18N.Application.HELP_MENU_DATA.applicationHelp, value: "2", selected: false },
		                   	{ text: $si.i18N.Application.HELP_MENU_DATA.about, value: "3", selected: false },
		                 ],

		LOGO_DIV : kendo.template("<div class='#= cssClass #'><img class='#= cssClass #'></img></div>"),
		CONTROLS_RIGHT_DIV : kendo.template("<div class='control-box' id='#= id #_contolbox'>"
										+ "<span class='app-help-dropdown'><select id='app-help-dropdownid' class='icon-dropdown'></select></span>"
										+ "<span style='margin-right: 8px; float:left;'><button id='#= id #_toggle_button' class='toolBarIcon toolBarToggle'></button></span>"
										+ "<span id='module-selection'> <input id ='application' data-role='combobox' data-text-field= 'displayName' data-value-field= 'id'"
										+ " data-bind='source:modules'  data-placeholder='Select Module...' class='applicationCombo'/></span>"
										+ "<span class='username'><label id='label-name' data-bind='text: userInfo.username'></label></span>"
				 						+ "<span class='splitter'></span>"
										+ "</div>"),
		LOG_OUT_DIV : kendo.template("<div class='logout-div'><span title='Logout'><label id='logout'> #= application.logout # </label></span></div>"),
		APP_COMBOBOX_IFRAME : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),

		 APP_COMBOBOX_IMG : kendo.template("<span class='module-icon'></span>"),
		 ABOUT_DIV : kendo.template("<div id ='#= id #'></div>"),

		_create : function(){
			this._super();
		},

		_createControls : function(){
			//Add logo's
			this._addLogos();

			//Add Control Box
			$(this.element).append(this.CONTROLS_RIGHT_DIV({id:this.options.id}));

			this._createHelpMenu();
		},

		_bindControls : function(){
			this._bindRightControls();
			this._bindToolBarToggleButton();

			this._addAppComboBoxImage();
		},

		_bindRightControls : function(){
			var $this = this;
			kendo.bind($(this.element).find("#" +this.options.id +"_contolbox"), $si.viewer.userModel);
			//$(this.element).find("#application.applicationCombo").kendoComboBox();
			$(this.element).find(".applicationCombo").hover(function(){
				var appCombo = $($this.element).find("#application.applicationCombo");
				var selectedIdx = appCombo.data("kendoComboBox").select();
				var dataSrc =  appCombo.data("kendoComboBox").dataSource._data;
				appCombo[0].title = dataSrc[selectedIdx].displayName;
				$($this.element).find(".k-header.applicationCombo")[0].title = dataSrc[selectedIdx].displayName;
			});
			$(this.element).find('.username').find('#label-name').attr('title',$(this.element).find('#label-name').text());
			var applicationComboBox = $(this.element).find("#application.applicationCombo").data("kendoComboBox");
			applicationComboBox.bind("open",function(e){
				/** default open animation time 200 **/
				setTimeout(function(){
										applicationComboBox.list.parent().addClass("app-modulelist-container");
										applicationComboBox.list.parent().prepend($this.APP_COMBOBOX_IFRAME({id:"application"}));
										$(".app-modulelist-container iframe").css("left","2px");
										$(".app-modulelist-container iframe").css("width" , applicationComboBox.list.parent().width() + "px");
										$(".app-modulelist-container iframe").css("height" , applicationComboBox.list.parent().height() + "px");
										applicationComboBox.unbind("open");
									},300);
			});
			applicationComboBox.bind("change",function(e){
				var dataItem = this.dataItem();
				if(dataItem.html){
					window.location = $si.viewer.serverUrl + dataItem.url;
				}else{
					$this.loadApplication(dataItem.id);
				}
			});

			//select the application
			var selectedApplicationId = $si.viewer.queryParams["moduleId"];
			for (var i = 0; i < $si.viewer.userModel.modules.length; i++)
			{
				if($si.viewer.userModel.modules[i].id == selectedApplicationId){
					applicationComboBox.select(i);
					$si.viewer.selectedModuleModel.set("selectedModule",$si.viewer.userModel.modules[i]);
					//Set Title
					document.title = "SI Suite | " + $si.viewer.selectedModuleModel.selectedModule.name;
				}
			}

			//set the titles for the drop down
			var list = applicationComboBox.list;
			var modlist = list.find("li");
			for(var i=0; i< modlist.length ; i++)
			{
				modlist[i].title = modlist[i].innerText;
			}

			$si.uiUtils.reSizeComboBoxToFitData($("#application.applicationCombo"));

			//User model is populated till this call.
			if($si.viewer.userModel){
				var controlboxDiv=$($this.element).find('#'+$this.options.id+'_contolbox');
				if(!$si.viewer.userModel.isSSO){
					controlboxDiv.append($this.LOG_OUT_DIV({application:$si.i18N.Application}));
					$this._bindLogout();
				}
			}
		},


		_addLogos : function(){
			$(this.element).append(this.LOGO_DIV({
				cssClass : "stiLogo",
			}));
			if($si.viewer.customerLogoModel.customerLogo != null && $si.viewer.customerLogoModel.customerLogo != ""){
				$(this.element).append(this.LOGO_DIV({
					cssClass : "customerLogo",
				}));
	
				var customerLogo = $(this.element).find(".customerLogo");
				if(customerLogo && $si.viewer.customerLogoModel.customerLogo){
					customerLogo.attr("src",$si.viewer.customerLogoModel.customerLogo);
				}
			}
		},

		_createHelpMenu : function(){
			var $this = this;
			var helpMenu = $(this.element).find("#app-help-dropdownid").siDropDownList({
								dataTextField: "text",
						        dataValueField: "value",
								dataSource : $this.HELP_MENU_DATA,
								shimRequired:true,
							});

			var helpDropDown = helpMenu.data("kendoDropDownList");
			helpDropDown.wrapper.attr('title','Access help system');
			var helplist = helpDropDown.list;
			var helplistli = helplist.find("li");
			helplistli[0].style.display = 'none';
			if(!$si.viewer.applicationHelpUrl){// no data disable the option
				helplistli[2].className = "app-help-dropdown-text-disabled k-item";
				helplistli[2].style.opacity = 0.5;
				helplistli[2].style.pointerEvents = "none"
			}

			helpDropDown.bind("change",function(e){
				var dataItem = this.dataItem();

				$this._loadHelp(dataItem.value,'true');
				helpDropDown.value("");
			});

		},

		_addAppComboBoxImage :function(){
			$(this.element).find('#'+this.options.id+'_contolbox').find('.k-dropdown-wrap').prepend(this.APP_COMBOBOX_IMG({}));
		},

		_bindLogout : function() {
			var $this = this;
			var logoutElement = $(this.element).find("#logout");
			logoutElement.bind("click",function(event){
				window.location.replace($si.viewer.serverUrl +'logout.do')
			});
		},

		_bindToolBarToggleButton : function(){
			var $this = this;
			var toggleButton = $(this.element).find("#" + this.options.id +"_toggle_button");
			toggleButton.find("img").addClass("toggleButton");
			toggleButton.addClass("on");
			toggleButton.addClass('toolbar-open');
			var applicationHeight;
			var isShow;
			var siViewerAppContainerPosition = $(".si-viewer-app-container").position();
			toggleButton.bind("click",function(event){
				if(toggleButton.hasClass("on")){
					$(".si-viewer-app-container").css("top",(siViewerAppContainerPosition.top - 10 + "px"));
					toggleButton.removeClass("on");
					toggleButton.attr('title','Show all toolbars');
					toggleButton.removeClass("toolbar-open");
					toggleButton.addClass("off");
					toggleButton.addClass('toolbar-close');
					applicationHeight = - $this.APPLICATION_HEIGHT;
					isShow = false;
					$si.viewer.isAppToolBarEnabled = false;
					$(".k-window").css("margin-top","30px");
					if($("#lassoDiv").length != 0 && $("#lassoDiv").css("display") == "block"){
						$("#lassoDiv").hide();
				    	$("#lassoTool").removeClass("lasso-icon-highlight"); 
				    	$("#lassoTool").addClass("lasso-icon");
				    	$("#lassoTool").parent(".toolbar-icon").removeClass("parent-lasso");
					}
				}else{
					$(".si-viewer-app-container").css("top",(15 + siViewerAppContainerPosition.top + "px"));
					toggleButton.removeClass("off");
					toggleButton.attr('title','Hide all toolbars');
					toggleButton.removeClass("toolbar-close");
					toggleButton.addClass("on");
					toggleButton.addClass('toolbar-open');
					$si.viewer.isAppToolBarEnabled = true;
					applicationHeight = $this.APPLICATION_HEIGHT;
					isShow = true;
					$(".k-window").css("margin-top","60px");
				}
				var windowList = $(".k-window");
				if(windowList && windowList.length){
					$(windowList).each(function(index,siWindow){
						siWindow = $(siWindow);
						if(siWindow && siWindow.length > 0){
							siWindow.height(siWindow.height() - applicationHeight);
						}
					});
				}
				$(document).trigger("evtToggleAllToolbars",isShow);
				//$this._adjustWindowTop(applicationHeight);
				$this._trigger("onToggle",null,{domElement:event.target});
			});
			
			toggleButton.trigger("click");
		},
//
//		_adjustWindowTop : function(applicationHeight){
//			var openWindows = $(".sti-window");
//			if(openWindows){
//				var windowTop;
//				var wrapper;
//				$(openWindows).each(function(index,window){
//					if(window){
//						wrapper = $(window).data("kendoWindow").wrapper;
//						windowTop = wrapper.css("top").replace("px","");
//						wrapper.css("top", (parseInt(windowTop) + parseInt(applicationHeight)) + "px");
//					}
//				});
//			}
//		},


		_loadHelp : function(menuId,isMenuClicked){
			var $this = this;
			if(menuId == 1){
				$si.windowUtil.openBrowserWindow($si.viewer.viewerHelpUrl,'portalUserGuide');
			}else if(menuId == 2 && $si.viewer.applicationHelpUrl){
				$si.windowUtil.openBrowserWindow($si.viewer.applicationHelpUrl,'appUserGuide');
			}
			else if(menuId == 3){
				$this._showAbout();

				}
		},
		_showAbout : function () {
			var $this = this;
	        	 if(this.options.aboutWindowWidget && this.options.aboutWindowWidgetJS){
	        		 requirejs([this.options.aboutWindowWidgetJS],function(){
	        			 $($this.element).append($this.ABOUT_DIV({id:$this.options.id+"_about"}));
	        			 $($this.element).find("#" + $this.options.id+"_about")[$this.options.aboutWindowWidget]();
	        		 });
	        	 }
			},

		loadApplication : function(applicationId){
			window.location = $si.viewer.serverUrl + "htmlViewerRedirect.do?menu2load="+ applicationId;
		},

	});

});