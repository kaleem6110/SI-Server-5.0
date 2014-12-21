/**
 * If some component is made specially for google map view them shim need to be added explicitly
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.drawer',
    'map/com.spacetimeinsight.i18N.mapDrawer.regional',
    'siColorPicker',
],function($){

	$.widget('spacetimeinsight.siViewerBaseMapDrawer',$.spacetimeinsight.siViewerDrawer,{
		options : {
			toggleDelay : 200,
			needTabStrip	: true,
			windowAttributes : {
				width		: "360px",
			},
			mapOverLaysArray :[],
			publicLayerArray :[],
			kmlkmzLayerArray :[],
			nodeIcon:{},
		},

		pluginName:"siViewerBaseMapDrawer",

		GENERIC_DIV 	   : kendo.template("<div class='#= cssClass #' ></div>"),

		HEADER_SECTION_DIV : kendo.template("<div class='#= cssClass # section'><div class='pref-section-header'>"
									+ "<span class='section-image pref-section-expand'></span>"
									+ "<span class='section-heading'>"
									+ "<div class='#= cssClass #-header' > #=label #</div>"
									+"</span></div></div>"),

		GENERIC_LABEL		: kendo.template("<label class='#= cssClass #'> #= text # </label>"),

		GENERIC_CHECKBOX	: kendo.template("<input class='#= cssClass #' type='checkbox' />"),

		DEFAULT_HIGHLIGHT_COLOR : "#42fdff",

		_create : function(){
			this._super();
		},

		_createControls : function(){
			this._super();

			this._createMapSettingTab();
		},

		_bindControls : function(){
			this._super();
		},

		_createMapSettingTab : function(){
			if(this.options.needTabStrip && this.options.tabStrip){
				this.options.tabStrip.kendoTabStrip({
														dataTextField: "text",
									        			dataContentField: "content",
									        			dataSource:
									        			[{
									            			text: $si.i18N.MapDrawer.regionalData.mapSettings,
									            			content: this.GENERIC_DIV({cssClass : "sti-map-drawer-map-setting-tab"}),
									        			 }]
    												});
				this.options.mapSettingTab = $(this.element).find(".sti-map-drawer-map-setting-tab");
				this.options.tabStrip.data("kendoTabStrip").select(0);
				this.options.mapSettingTab.parent(".k-content.k-state-active").addClass("sti-panelbar");
			}
		},

		/** create toggle sections in drawer **/
		addDrawerSection : function(cssClass,label){
			var $this = this;
			if(this.options.mapSettingTab && this.options.mapSettingTab.length > 0){
				this.options.mapSettingTab.append(this.HEADER_SECTION_DIV({cssClass : cssClass,label : label}));
				this.options.mapSettingTab.find("." + cssClass).find(".section-image").click(function(){
					$this._toggleDrawerSection(this);
				});

				return this.options.mapSettingTab.find("." + cssClass);
			}
		},

		_toggleDrawerSection : function(sectionImage){
			if($(sectionImage).hasClass("pref-section-expand")){
				$(sectionImage).removeClass("pref-section-expand");
				$(sectionImage).addClass("pref-section-collapse");
			}else if($(sectionImage).hasClass("pref-section-collapse")){
				$(sectionImage).removeClass("pref-section-collapse");
				$(sectionImage).addClass("pref-section-expand");
			}

			var contentDiv = $(sectionImage).parents(".section").find(".content-div");
			if(contentDiv && contentDiv.length > 0){
				contentDiv.slideToggle();
			}
		},

		/** add Kml Kmz tree view in map setting tab **/
		createKmlKmzTreeView : function(){
			var $this = this;
			var kmlKmzSection = this.addDrawerSection("sti-map-drawer-kmlkmz" , $si.i18N.MapDrawer.regionalData.importedKML_KMZ);
			if(kmlKmzSection &&  kmlKmzSection.length > 0){
				kmlKmzSection.append(this.GENERIC_DIV({cssClass : "sti-map-drawer-kmlkmz-content content-div"}));
				this.options.kmlKmzTreeView = kmlKmzSection.find(".sti-map-drawer-kmlkmz-content");
				this.options.kmlKmzTreeView.kendoTreeView({
		            checkboxes: {
		                checkChildren: true,
		                template: function(data){
		                	var returnString = "<input type='checkbox' />"
		                	if(data && data.item && data.item.selected){
		                		data.item.checked = data.item.selected;
		                		$this._triggerKmlKmzSelectDeSelectEvent(data.item);
		                		returnString = "<input type='checkbox' checked/>"
		                	}
		                	return returnString;
		                },
		            },
		            loadOnDemand: false, /** if this will set to true then tree will create on expand **/
		            dataSource:  $si.viewer.businessViewObserver.businessView.kmlkmzList,
		        });

				this._bindKmlKmzCheckedEvent();
			}
		},

		_bindKmlKmzCheckedEvent : function(){
			var $this = this;
			if(this.options.kmlKmzTreeView  && this.options.kmlKmzTreeView.length > 0){
				this.options.kmlKmzTreeView.bind("click", function (e) {
					/** trigger an event on checkbox check and uncheck **/
					if($(e.target).is(":checkbox")){
						var tree = $(e.currentTarget).data("kendoTreeView");
						var item = $(e.target).closest('.k-item');
						if(tree && item){
							$this._triggerKmlKmzSelectDeSelectEvent(tree.dataItem(item));
						}
						var checkedNodes = [];
						var treeLength = $this.checkedNodeNames(tree.dataSource.view(), checkedNodes);
						if(treeLength.length>0){
							$(".sti-map-drawer-kmlkmz-header").addClass("s-selected");
						}else{
							$(".sti-map-drawer-kmlkmz-header").removeClass("s-selected");
						}
					}

			    });
			}
		},

		_triggerKmlKmzSelectDeSelectEvent : function(dataItem){
			var $this = this;
			$this._iconChangeForKMLKMZLayer(dataItem);
			if(dataItem){
				if(dataItem.items && dataItem.items.length > 0){
					/** recursion in case of category checked **/
					$.each(dataItem.items,function(index,item){
						$this._triggerKmlKmzSelectDeSelectEvent(item);
					});
				}
				if(dataItem.id && dataItem.nodeUrl){
					$this._trigger("onKmlKmzSelectDeselect",null,{
														kmlId 		: dataItem.id,
														kmlUrl 		: dataItem.nodeUrl,
														isChecked 	: dataItem.checked,
												});
				}
			}
		},

		_iconChangeForKMLKMZLayer : function(dataItem){
			var $this = this;
			//if(!dataItem.items){
				var nodeLabel = $(".sti-map-drawer-kmlkmz-content").data("kendoTreeView").findByUid(dataItem.uid).find('.k-in');
				var nodeImage = nodeLabel.children('.k-image');
				var imgUrl = "";
				if(nodeImage.length > 0){
					imgUrl =nodeImage.prop("src");
				}
				if(dataItem.checked){
					nodeLabel.addClass("cl-selected");
					if(!dataItem.items && dataItem.selectedIconUrl && dataItem.deselectedIconUrl){
						nodeLabel.addClass("node-selected");
						nodeLabel.removeClass("node-unselected");
						imgUrl=	imgUrl.replace(dataItem.deselectedIconUrl, dataItem.selectedIconUrl);
						nodeImage.prop("src",imgUrl);
						$this.options.nodeIcon[dataItem.id] = imgUrl;
					}

				}else{
					nodeLabel.removeClass("cl-selected");
					if(!dataItem.items && dataItem.selectedIconUrl && dataItem.deselectedIconUrl){
						nodeLabel.removeClass("node-selected");
						nodeLabel.addClass("node-unselected");
						imgUrl=	imgUrl.replace(dataItem.selectedIconUrl, dataItem.deselectedIconUrl);
						nodeImage.prop("src",imgUrl);
						$this.options.nodeIcon[dataItem.id] = imgUrl;
					}
				}
			//}
		},
		/** add General Settings in map setting tab **/
		createGeneralSettings : function(){
			var generalSettingsSection = this.addDrawerSection("sti-map-drawer-generalsettings" , $si.i18N.MapDrawer.regionalData.generalSettings);
			if(generalSettingsSection &&  generalSettingsSection.length > 0){
				generalSettingsSection.append(this.GENERIC_DIV({cssClass : "sti-map-drawer-generalsettings-content content-div"}));
				this.options.generalSettings = generalSettingsSection.find(".sti-map-drawer-generalsettings-content");
				this._addColorPickerForMapObjects();
				this._addInfoWindowCheckBox();
			}
		},

		/** Map object highlight color **/
		_addColorPickerForMapObjects : function(){
			var $this = this;
			if(this.options.generalSettings && this.options.generalSettings.length > 0){
				this.options.generalSettings.append(this.GENERIC_DIV({cssClass : "highlight-color-picker-container"}));
				var highLightColorPickerContainer = this.options.generalSettings.find(".highlight-color-picker-container");

				highLightColorPickerContainer.append(this.GENERIC_DIV({cssClass : "highlight-color-picker"}));
				highLightColorPickerContainer.append(this.GENERIC_LABEL({cssClass : "highlight-color-picker-label",text: $si.i18N.MapDrawer.regionalData.highlightColorPickerLabel}));
				this.options.highLightColorPicker = highLightColorPickerContainer.find(".highlight-color-picker");

				this.options.highLightColorPicker.siColorPicker({
			        	palette: [
	                        "#7C7C7C","#0000FC","#0000BC","#4428BC","#940084","#A80020","#A81000","#881400","#503000","#007800","#006800","#005800","#004058","#000000",
							"#BCBCBC","#0078F8","#0058F8","#6844FC","#D800CC","#E40058","#F83800","#E45C10","#AC7C00","#00B800","#00A800","#00A844","#008888","#000000",
							"#F8F8F8","#3CBCFC","#6888FC","#9878F8","#F878F8","#F85898","#F87858","#FCA044","#F8B800","#B8F818","#58D854","#58F898","#00E8D8","#787878",
							"#FCFCFC","#A4E4FC","#B8B8F8","#D8B8F8","#F8B8F8","#F8A4C0","#F0D0B0","#FCE0A8","#F8D878","#D8F878","#B8F8B8","#B8F8D8","#00FCFC","#F8D8F8",
                   		 ],
			        	value	: kendo.parseColor(this.DEFAULT_HIGHLIGHT_COLOR),
			        	change	: function(e){
			        					if(e.value){
			        						$this._trigger("onMapHighLightColorChange",null,{color:e.value});
			        					}
			        			},
			        	shimRequired : true,
			        	needSlider	 : false,
			        });
			}
		},

		/** single or multiple info Window **/
		_addInfoWindowCheckBox : function(){
			var $this = this;
			if(this.options.generalSettings && this.options.generalSettings.length > 0){
				this.options.generalSettings.append(this.GENERIC_DIV({cssClass : "single-info-window-container"}));
				var infoWindowContainer = this.options.generalSettings.find(".single-info-window-container");

				infoWindowContainer.append(this.GENERIC_CHECKBOX({cssClass : "single-info-window-checkbox"}));
				infoWindowContainer.append(this.GENERIC_LABEL({cssClass : "single-info-window-label",text: $si.i18N.MapDrawer.regionalData.singleInfoWindowLabel}));
				this.options.singleInfoWindowCheckBox = infoWindowContainer.find(".single-info-window-checkbox");
				this.options.singleInfoWindowCheckBox.bind("click",function(e){
											if(this.checked){
												$(".sti-map-drawer-generalsettings-header").addClass("s-selected");
												$(".single-info-window-checkbox").addClass("cl-selected");
											}else{
												$(".sti-map-drawer-generalsettings-header").removeClass("s-selected");
												$(".single-info-window-checkbox").removeClass("cl-selected");
											}
											$this._trigger("onSingleInfoWindowCheck",null,{isChecked:this.checked});
									});
			}
		},




		/** add Map Layers. Input is header text and data **/
		_createEnterpriseLayers : function(headerText,layers){
			if(!layers){
				layers = [];
			}
			var $this = this;
			var mapLayersSection = this.addDrawerSection("sti-map-drawer-layers" , headerText);
			if(mapLayersSection &&  mapLayersSection.length > 0){
				mapLayersSection.append(this.GENERIC_DIV({cssClass : "sti-map-drawer-layers-content content-div"}));
				this.options.mapLayers = mapLayersSection.find(".sti-map-drawer-layers-content");
				this.options.mapLayers.kendoTreeView({
		            checkboxes: {
		                checkChildren: true,
		                template: function(data){
		                	var returnString = "<input type='checkbox' />"
		                	if(data && data.item && data.item.checked){
		                		$this._triggerEnterpriseLayerChecked(data.item);
		                		returnString = "<input type='checkbox' checked/>"
		                	}
		                	return returnString;
		                },
		            },
		            loadOnDemand: false,
		            dataSource:  layers,
		        });

				$si.viewer.mapLayerModel.bind("setLayers",function(e){
					if(e.layers){
						$this.options.mapLayers.data("kendoTreeView").setDataSource(e.layers);
						$($this.element).find(".sti-map-drawer-layers-content").data("kendoTreeView").element.find(".k-item:last").find(".k-bot").addClass('k-lastClass');
					}
				});

				this._bindEnterpriseLayerCheckedEvent();
			}
		},

		_bindEnterpriseLayerCheckedEvent : function(){
			var $this = this;
			if(this.options.mapLayers  && this.options.mapLayers.length > 0){
				this.options.mapLayers.bind("click", function (e) {
					/** trigger an event on checkbox check and uncheck **/
					if($(e.target).is(":checkbox")){
						var tree = $(e.currentTarget).data("kendoTreeView");
						var item = $(e.target).closest('.k-item');
						if(tree && item){
							$this._triggerEnterpriseLayerChecked(tree.dataItem(item));
						}
						var checkedNodes = [];
						var treeLength = $this.checkedNodeNames(tree.dataSource.view(), checkedNodes);
						if(treeLength.length>0){
							$(".sti-map-drawer-layers-header").addClass("s-selected");
						}else{
							$(".sti-map-drawer-layers-header").removeClass("s-selected");
						}
					}

			    });
			}
		},

		_triggerEnterpriseLayerChecked : function(dataItem){
			var $this = this;
			var nodeLabel = $(".sti-map-drawer-layers-content").data("kendoTreeView").findByUid(dataItem.uid).find('.k-in');
			if(dataItem.checked){
				nodeLabel.addClass("cl-selected");
			}else{
				nodeLabel.removeClass("cl-selected");
			}
			if(dataItem){
				if(dataItem.items && dataItem.items.length > 0){
					/** recursion in case of category checked **/
					$.each(dataItem.items,function(index,item){
						$this._triggerEnterpriseLayerChecked(item);
					});
				}else{
					$this._trigger("onEnterpriseLayerChecked",null,{dataItem : dataItem});
				}
			}
		},



		/** add Map Overlay Features. Input is header text and data **/
		_createMapOverLayFeatures : function(headerText,overLayFeatures){
			var mapOverLayFeaturesSection = this.addDrawerSection("sti-map-drawer-overlay-features" , headerText);
			if(mapOverLayFeaturesSection &&  mapOverLayFeaturesSection.length > 0){
				mapOverLayFeaturesSection.append(this.GENERIC_DIV({cssClass : "sti-map-drawer-overlay-features-content content-div"}));
				this.options.mapOverLayFeatures = mapOverLayFeaturesSection.find(".sti-map-drawer-overlay-features-content");
				this.options.mapOverLayFeatures.kendoTreeView({
		            checkboxes: {
		                checkChildren: true
		            },
		            loadOnDemand: false,
		            dataSource:  overLayFeatures,
		        });
				var treeView = $(".sti-map-drawer-overlay-features-content").data("kendoTreeView");
				if(treeView.dataSource._data[2]) {
					var getNode = treeView.findByUid(treeView.dataSource._data[2].uid);
					$(getNode).find(".k-in").addClass("cl-selected");
					$(".sti-map-drawer-overlay-features-header").addClass("s-selected");
				}
				this._bindMapOverLayFeaturesCheckedEvent();
			}
		},

		_bindMapOverLayFeaturesCheckedEvent : function(){
			var $this = this;
			if(this.options.mapOverLayFeatures  && this.options.mapOverLayFeatures.length > 0){
				this.options.mapOverLayFeatures.bind("click", function (e) {
					/** trigger an event on checkbox check and uncheck **/
					if($(e.target).is(":checkbox")){
						var tree = $(e.currentTarget).data("kendoTreeView");
						var item = $(e.target).closest('.k-item');
						if(tree && item){
							$this._triggerMapOverLayFeatureCheckedEvent(tree.dataItem(item));
						}
						var checkedNodes = [];
						var treeLength = $this.checkedNodeNames(tree.dataSource.view(), checkedNodes);
						if(treeLength.length>0){
							$(".sti-map-drawer-overlay-features-header").addClass("s-selected");
						}else{
							$(".sti-map-drawer-overlay-features-header").removeClass("s-selected");
						}
					}

			    });
			}
		},

		_triggerMapOverLayFeatureCheckedEvent : function(dataItem){
			var $this = this;
			var nodeLabel = $(".sti-map-drawer-overlay-features-content").data("kendoTreeView").findByUid(dataItem.uid).find('.k-in');
			if(dataItem.checked){
				nodeLabel.addClass("cl-selected");
			}else{
				nodeLabel.removeClass("cl-selected");
			}
			if(dataItem){
				if(dataItem.items && dataItem.items.length > 0){
					/** recursion in case of category checked **/
					$.each(dataItem.items,function(index,item){
						$this._triggerMapOverLayFeatureCheckedEvent(item);
					});
				}else{
					$this._trigger("onMapOverLayFeatureChecked",null,{dataItem : dataItem});
				}
			}
		},
		getDrawerFavoriteSettings : function(){
			var $this = this;
			var demon = [];
			var drawer = $($this.element).find(".sti-map-drawer-map-setting-tab");
			var drawerSettings = {
					kmlkmzLayerArray 		: $this.onKMLKMZGettingFav($this.options.kmlKmzTreeView.data("kendoTreeView").dataSource.data(),$this.options.kmlkmzLayerArray),
					singleInfoWindow 		: $this.options.singleInfoWindowCheckBox[0].checked,
					colorPickerValue		: $this.options.highLightColorPicker.val(),
					overlayCheckedArray     : $this.onMapOverLayFeatureGettingFav($this.options.mapOverLayFeatures.data("kendoTreeView").dataSource.data(),$this.options.mapOverLaysArray),
					publicLayerArray		: $this.onMapOverLayFeatureGettingFav($this.options.mapLayers.data("kendoTreeView").dataSource.data(),$this.options.publicLayerArray),
					mapSpecficDrawerData    : $this.getMapSpecficDrawerData(),
			};
			return drawerSettings;
		},
		
		getMapSpecficDrawerData :function (){
			$si.Logger('favorite setting').info('Override getMapSpecficDrawerData method');
			return [];
		},
		
		applyMapSpecficDrawerData :function (favoriteData){
			$si.Logger('favorite setting').info('Override applyMapSpecficDrawerData method');
		},
		
		applyDrawerFavoriteSettings : function(favorite) {
			var $this = this;
			var drawer = $($this.element).find(".sti-map-drawer-map-setting-tab");
			$this.options.singleInfoWindowCheckBox.prop("checked",favorite.singleInfoWindow);
			$this.onMapOverLayFeatureApplyOnFav(favorite.overlayCheckedArray);
			$this.onKMLKMZApplyOnFav(favorite.kmlkmzLayerArray);
			$this.onPublicLayersApplyOnFav(favorite.publicLayerArray);
			$this.options.highLightColorPicker.data("kendoColorPicker").value(favorite.colorPickerValue);
			$this.applyMapSpecficDrawerData(favorite.mapSpecficDrawerData);
		},
		
		onMapOverLayFeatureApplyOnFav : function(overlayData){
			var $this = this;
			for (var i = 0; i < overlayData.length; i++) {

				$(":checkbox").filter(function () {
		            var text = $(this).parent().next().text();
		            return text == overlayData[i].text;
		        }).prop("checked", true);
				$this._trigger("onMapOverLayFeatureChecked",null,{dataItem : overlayData[i]});
				}
		},
		onPublicLayersApplyOnFav : function(overlayData){
			var $this = this;
        	for (var i = 0; i < overlayData.length; i++) {
				var treeview = $this.options.mapLayers.data("kendoTreeView");
				var dataSource = treeview.dataSource;
				var node = treeview.findByText(overlayData[i].text);
				//treeview.expand(node);
				treeview.expand(node.parents());

				$(":checkbox").filter(function () {
		            var text = $(this).parent().next().text();
		            return text == overlayData[i].text;
		        }).prop("checked", true);

                $this._trigger("onEnterpriseLayerChecked",null,{dataItem : overlayData[i]});
                }
		},
		onKMLKMZApplyOnFav : function(overlayData){
			var $this = this;
			for (var i = 0; i < overlayData.length; i++) {
				var treeview = $this.options.kmlKmzTreeView.data("kendoTreeView");
				var dataSource = treeview.dataSource;
				var node = treeview.findByText(overlayData[i].text);
				treeview.expand(node.parents());
				$(":checkbox").filter(function () {
		            var text = $(this).parent().next().text();
		            return text == overlayData[i].text;
		        }).prop("checked", true);
		        $this._trigger("onKmlKmzSelectDeselect",null,overlayData[i]);
			}
		},
		onMapOverLayFeatureGettingFav : function(overlayData,checkedNodesArray){
			var $this = this;
        	for (var i = 0; i < overlayData.length; i++) {
                if (overlayData[i].checked) {
                	checkedNodesArray.push({
                							 id :overlayData[i].id ,
                							 text :overlayData[i].text,
                							 checked:JSON.parse(overlayData[i].checked),
                							 dataObj:overlayData[i],
                							});
                }
                if (overlayData[i].items) {
                    $this.onMapOverLayFeatureGettingFav(overlayData[i].items,checkedNodesArray);
                }
            }
        	return checkedNodesArray;
		},
		onKMLKMZGettingFav : function(overlayData,checkedNodesArray){
			var $this = this;
        	for (var i = 0; i < overlayData.length; i++) {
                if (overlayData[i].checked) {
                	checkedNodesArray.push({
                							 kmlId :overlayData[i].id ,
                							 kmlUrl : overlayData[i].nodeUrl,
                							 text :overlayData[i].text,
                							 isChecked:overlayData[i].checked
                							});
                }
                if (overlayData[i].items) {
                    $this.onKMLKMZGettingFav(overlayData[i].items,checkedNodesArray);
                }
            }
        	return checkedNodesArray;
		},
		checkedNodeNames:function(nodes, checkedNodes){
			var $this = this;
        	for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].checked) {
                    checkedNodes.push(nodes[i].text);
                }
                if (nodes[i].hasChildren) {
                    $this.checkedNodeNames(nodes[i].children.view(), checkedNodes);
                }
            }
			return checkedNodes;
        },
        
        resetEnterpriseLayers : function(dataItem){
        	var $this = this;
        	if(dataItem){
				if(dataItem.items && dataItem.items.length > 0){
					$.each(dataItem.items,function(index,item){
						$this.resetEnterpriseLayers(item);
					});
				}else{
					 dataItem.checked = false;
					$this._trigger("onEnterpriseLayerChecked",null,{dataItem : dataItem});
				}
			}
        },
        resetKMLKMZLayers : function(dataItem){
        	var $this = this;
        	if(dataItem){
				if(dataItem.items && dataItem.items.length > 0){
					$.each(dataItem.items,function(index,item){
						$this.resetKMLKMZLayers(item);
					});
				}
				if(dataItem.nodeUrl && dataItem.id){
					 dataItem.checked = false;
					$this._trigger("onKmlKmzSelectDeselect",null,{
														kmlId 		: dataItem.id,
														kmlUrl 		: dataItem.nodeUrl,
														isChecked 	: dataItem.checked,
												});
				}
			}
        },
       
        
	});
});