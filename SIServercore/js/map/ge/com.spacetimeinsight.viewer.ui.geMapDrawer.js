/**
 * If some component is made specially for google map view them shim need to be added explicitly
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
    'map/com.spacetimeinsight.viewer.ui.baseMapDrawer',
    'map/ge/com.spacetimeinsight.i18N.geMapDrawer.regional',
],function($){

	$.widget('spacetimeinsight.siViewerGeMapDrawer',$.spacetimeinsight.siViewerBaseMapDrawer,{
		options : {
		},

		pluginName:"siViewerGeMapDrawer",
	
       	TEMP_OVERLAY_FEATURES : [
									{id : "Atmosphere", text: $si.i18N.GEDrawer.regionalData.atmosphere, spriteCssClass: $si.i18N.GEDrawer.regionalData.rootfolder},
									{id : "Grid", text: $si.i18N.GEDrawer.regionalData.grid, spriteCssClass: $si.i18N.GEDrawer.regionalData.rootfolder},
									{id : "Navigation Control", text: $si.i18N.GEDrawer.regionalData.navigationControl, spriteCssClass: $si.i18N.GEDrawer.regionalData.rootfolder,"checked": true},
									{id : "Overview Map", text: $si.i18N.GEDrawer.regionalData.overviewMap, spriteCssClass: $si.i18N.GEDrawer.regionalData.rootfolder},
									{id : "Scale Legend", text: $si.i18N.GEDrawer.regionalData.scaleLegend, spriteCssClass: $si.i18N.GEDrawer.regionalData.rootfolder},
									{id : "Status Bar", text: $si.i18N.GEDrawer.regionalData.statusBar, spriteCssClass: $si.i18N.GEDrawer.regionalData.rootfolder},
									{id : "Street View", text: $si.i18N.GEDrawer.regionalData.streetView, spriteCssClass: $si.i18N.GEDrawer.regionalData.rootfolder},
									{id : "Sun", text: $si.i18N.GEDrawer.regionalData.sun, spriteCssClass: $si.i18N.GEDrawer.regionalData.rootfolder}, 
							],
         
         IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),

		_create : function(){
			this._super();
			
			$(this.element).addClass("sti-drawer-" + this.pluginName);
		},
		
		_createControls : function(){
			this._super();
		},
		createTabsControls : function(){
			if(this.options.mapSettingTab && this.options.mapSettingTab.length > 0){
				$(this.options.mapSettingTab).prepend(this.IFRAME_CONTAINER({id:this.options.id}));
			}
			this._createEnterpriseLayers($si.i18N.GEDrawer.regionalData.geLayers);
			this._createMapOverLayFeatures($si.i18N.GEDrawer.regionalData.geOverLayFeatures,this.TEMP_OVERLAY_FEATURES);
			this.createKmlKmzTreeView();
			this.createGeneralSettings();
		},
		
		_bindControls : function(){
			this._super();
		},
		applyDrawerFavoriteSettings : function(favorite) {
			this._super(favorite);
		},
		getDrawerFavoriteSettings : function(){
			var supersetting = this._super();
			return supersetting;
		},
		
        reset : function(){
        	var $this = this;
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
	        $(".highlight-color-picker").data('kendoColorPicker').value(this.DEFAULT_HIGHLIGHT_COLOR);
	        $(".single-info-window-checkbox").prop("checked",false);
        },
	});
});