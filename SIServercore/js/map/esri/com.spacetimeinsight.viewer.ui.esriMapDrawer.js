/**
 * If some component is made specially for google map view them shim need to be added explicitly
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
    'map/com.spacetimeinsight.viewer.ui.baseMapDrawer',
    'map/esri/com.spacetimeinsight.i18N.esriMapDrawer.regional',
],function($){

	$.widget('spacetimeinsight.siViewerEsriMapDrawer',$.spacetimeinsight.siViewerBaseMapDrawer,{
		options : {
		},
		pluginName:"siViewerEsriMapDrawer",

		 TEMP_OVERLAY_FEATURES : [
				           // {id: 1, text: "Grid", spriteCssClass: "rootfolder"},
				            {id: 2, text: "Navigation Control", spriteCssClass: "folder", checked: true},
				            //{id: 3, text: "Overview Map", spriteCssClass: "rootfolder"},
				            {id: 4, text: "Scale Legend", spriteCssClass: "rootfolder"},
				         ],

		BASE_MAP_CONTENT : kendo.template("<div class='esri-basemap-maptype-container'>"
				+ "<label class='map-type-label'> Map Type </label>"
				+ "<span class='map-type-span'> <input id='map-type-dropdown' class ='map-type-dropdown' data-role='dropdownlist' data-text-field= 'id' data-value-field= 'id'"
				+ " data-bind='source: allMapLayers, value: defaultMapLayer'  class='sti-base-map-drop-down'/></span>"
				+ "</div> <div class='esri-basemap-opacity-container'>"
				+ "<label class='opacity'> Opacity </label>"
				+ "<input id='opacity-slider' class='opacity-slider' data-bind='value: defaultOpacity' data-role='slider' data-min='0' data-max='100' data-small-step='10' data-large-step='20' />"
				+ "</div>"),

		_create : function(){
			this._super();

			$(this.element).addClass("sti-drawer-" + this.pluginName);
		},

		_createControls : function(){
			this._super();
		},
		createTabsControls : function(){

			this._createBaseMap();
			this._createEnterpriseLayers($si.i18N.EsriDrawer.regionalData.esriLayers,$si.viewer.esriMapLayerModel.esriLayerList);
			this._createMapOverLayFeatures($si.i18N.EsriDrawer.regionalData.esriOverLayFeatures,this.TEMP_OVERLAY_FEATURES);
			this.createKmlKmzTreeView();
			this.createGeneralSettings();
			this._bindBaseMap();
		},

		_bindControls : function(){
			this._super();
		},

		_createBaseMap : function(){
			var baseMapSection = this.addDrawerSection("sti-map-drawer-basemap" , $si.i18N.EsriDrawer.regionalData.baseMaps);
			if(baseMapSection &&  baseMapSection.length > 0){
				baseMapSection.append(this.GENERIC_DIV({cssClass : "sti-map-drawer-basemap-content content-div"}));
				this.options.baseMap = baseMapSection.find(".sti-map-drawer-basemap-content");
				if(this.options.baseMap && this.options.baseMap.length > 0){
					this.options.baseMap.append(this.BASE_MAP_CONTENT({}));
				}
			}
		},

		_bindBaseMap : function(){
			var $this = this;
			kendo.bind(this.options.baseMap, $si.viewer.esriMapLayerModel);

			/** binding map type drop down change **/
			this.options.mapTypeDropDown = $(this.element).find("#map-type-dropdown");
			this.options.mapTypeDropDown.data("kendoDropDownList").bind("change",function(e){
				var selectedItem = this.dataItem();
				if(selectedItem){
					$this.setOpacity(selectedItem.opacity * 100);
				}
				$this._trigger("onBaseMapTypeChangeEvent",null,{selectedItem : selectedItem});
				//$this._trigger("onBaseMapOpacityChangeEvent",null,{newValue : $("#opacity-slider").data("kendoSlider").value()});
			});

			/** binding opacity slider change **/
			this.options.opacitySlider = $(this.element).find("#opacity-slider");
			this.options.opacitySlider.data("kendoSlider").bind("change",function(e){
				var value = e.value;
				$this._trigger("onBaseMapOpacityChangeEvent",null,{newValue : value});
			});

		},

		setOpacity : function(opacity){
			if(this.options.opacitySlider){
				this.options.opacitySlider.data("kendoSlider").value(opacity);
			}
		},
		
		reset : function() {
			var $this = this;
			//this._super();
			//$si.viewer.esriMapLayerModel.defaultMapLayer = $si.viewer.esriMapLayerModel.defaultEsriMapLayer;
			//$si.viewer.esriMapLayerModel.defaultOpacity = $si.viewer.esriMapLayerModel.defaultEsriOpacity;
			
			var EnterPriseTreeView =$(".sti-map-drawer-layers-content").data("kendoTreeView");
			$(".sti-map-drawer-layers-content").find('input:checkbox:checked').each(function(){
				$(this).prop("checked",false);
	            var dataItem = EnterPriseTreeView.dataItem($(this).closest(".k-item"));
	            $this.resetEnterpriseLayers(dataItem);
	        });
			
	        var overLayTreeView = $(".sti-map-drawer-overlay-features-content").data("kendoTreeView");
	        $(".sti-map-drawer-overlay-features-content").find('input:checkbox:checked').each(function(){
				
	            var dataItem = overLayTreeView.dataItem($(this).closest(".k-item"));
	            if(dataItem.text == 'Navigation Control'){
	            	$(this).prop("checked",true);
	            	dataItem.checked = true;
	            }else{
	            	$(this).prop("checked",false);
	            	dataItem.checked = false;
	            }	
	            $this._triggerMapOverLayFeatureCheckedEvent(dataItem);
	        });
	      	  
	      	var kmlkmzTreeView = $(".sti-map-drawer-kmlkmz-content").data("kendoTreeView");
	        $(".sti-map-drawer-kmlkmz-content").find('input:checkbox:checked').each(function(){
				$(this).prop("checked",false);
	            var dataItem = kmlkmzTreeView.dataItem($(this).closest(".k-item"));
	             $this.resetKMLKMZLayers(dataItem);
	        });
	        
	        $("#map-type-dropdown").data("kendoDropDownList").value(JSON.parse(JSON.stringify($si.viewer.esriMapLayerModel.defaultEsriMapLayer.id)));
			$("#opacity-slider").data("kendoSlider").value(JSON.parse(JSON.stringify($si.viewer.esriMapLayerModel.defaultEsriOpacity)));
			this._trigger("onBaseMapTypeChangeEvent",null,{selectedItem : $si.viewer.esriMapLayerModel.defaultEsriMapLayer});
			this._trigger("onBaseMapOpacityChangeEvent",null,{newValue :$si.viewer.esriMapLayerModel.defaultEsriOpacity});
	        $(".highlight-color-picker").data('kendoColorPicker').value(this.DEFAULT_HIGHLIGHT_COLOR);
	        $(".single-info-window-checkbox").prop("checked",false);
	        $($si.viewer).trigger("resetEsriMap");
		},
		
		getMapSpecficDrawerData : function() {
			var esriDrawerData = {};
			esriDrawerData.mapType = $("#map-type-dropdown").data("kendoDropDownList").dataItem();
			esriDrawerData.mapOpacity = $("#opacity-slider").data("kendoSlider").value();
			return esriDrawerData;
		},

		applyMapSpecficDrawerData :function (favoriteData){
			//$si.viewer.esriMapLayerModel.defaultMapLayer = favoriteData.mapType;
			//$si.viewer.esriMapLayerModel.defaultOpacity = favoriteData.mapOpacity;
			$("#map-type-dropdown").data("kendoDropDownList").value(favoriteData.mapType.id);
			$("#opacity-slider").data("kendoSlider").value(favoriteData.mapOpacity);
			this._trigger("onBaseMapTypeChangeEvent",null,{selectedItem : favoriteData.mapType});
			this._trigger("onBaseMapOpacityChangeEvent",null,{newValue : favoriteData.mapOpacity});
		},
	});
});
