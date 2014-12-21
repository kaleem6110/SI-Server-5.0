/**
 * If some component is made specially for google map view them shim need to be added explicitly
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.drawer',
],function($){

	$.widget('spacetimeinsight.siViewerAlertDrawer',$.spacetimeinsight.siViewerDrawer,{

		pluginName:"siViewerAlertDrawer",
		options : {
			toggleDelay : 200,
			actionButtons	: ["Apply"],
			needTabStrip	: true,
			
			windowAttributes:{
				width :"380px",
			},
		},
		GENERIC_COMPONENT : kendo.template("<div id ='#= id #'> </div>"),
		GENERIC_COMPONENT_COMBO  : kendo.template("<select id='#= id #' class='#= id #'></select>"),
		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			this._super();
			var tabStrip = this.options.tabStrip;
			tabStrip.kendoTabStrip({
				dataTextField: "text",
    			dataContentField: "content",
    			dataSource:
    			[{
        			text: "Settings",
        			content: this.GENERIC_COMPONENT({id:"alertDrawer"}),																			// optional.
    			 }]
			}).data("kendoTabStrip").select(0);	
			var drawer = $(this.element).find("#alertDrawer");
			drawer.append('<table id = "alertDrawerTable"><tr><td align="right" class="alert-drawer-left-col rp5"><label for "defaultSuppressTime">'+$si.i18N.Application.alertWindow.drawerLabels.defaultSuppressTime+'</label></td><td><input type="text" id="defaultSuppressTime" style="width:25px;" value = "'+$si.viewer.alertConfigData.autoAckSnoozeInterval+'"/>&nbsp;&nbsp;'+this.GENERIC_COMPONENT_COMBO({id:"supressTime"})+"</td></tr>");
			var data = [
                        {text: "Seconds", value:"1"},
                        {text: "Minutes", value:"60"},
                        {text: "Hours", value:"3600"},
                        {text: "Days", value:"86400"},
						{text: "Months", value:"2592000"}
                    ];
			(drawer.find("#supressTime")).kendoDropDownList({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: data,
					index:3
            });
            this.options.actionButtonClicked = function(event,data){
				if(data.buttonId == "Apply"){
					$this.onApplyButtonClicked(drawer);
				}
			};
			
			/*
			Setting the number of characters to 3 and allowing only numeric value in the textbox.
			*/
			this.element.find("#defaultSuppressTime").attr('maxLength','3');
			this.element.find("#defaultSuppressTime").keydown(function (e) {
				if (e.shiftKey || e.ctrlKey || e.altKey) {
					e.preventDefault();
				} else {
					var key = e.keyCode;
					if (!((key == 8) || (key == 46) || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105))) {
						e.preventDefault();
					}
				}
			});
		},
		onApplyButtonClicked : function(drawer){
			var $this = this;
			var drawerSettings = {
					"defaultSupressTime" : drawer.find("#defaultSuppressTime").val(),
					"defaultSupressTimeFormat" : drawer.find("#supressTime").val(),
				}
				$this._trigger("applyalertdrawersettings",null,{data: drawerSettings});
			$this.toggle();
		},
			// Show/Hide toolbar
		toggle : function(delay){
			$(this.element).slideToggle(delay?delay:this.options.toggleDelay);
			if($(this.element).css("display") != "none"){
				$(this.element).css("display","inline-flex"); 
			}
			this._trigger("onToggle",{id:this.options.id,domElement:$(this.element)});
		},
			
		/**
		 * This method is used to set the drawer settings according to the favorite.
		 */	
		applyDrawerFavoriteSettings : function(favorite) {
			var $this = this;
			var drawer = $($this.element).find("#alertDrawer");
			drawer.find("#defaultSuppressTime").val(favorite.defaultSupressTime);
			drawer.find("#supressTime").data("kendoDropDownList").value(favorite.defaultSupressTimeFormat);
		},

		/**
		 * This method is used to save the drawer settings in the favorite.
		 * @param {} $
		 * @returns {} 
		 */
		getDrawerFavoriteSettings : function(){
			var $this = this;
			var drawer = $($this.element).find("#alertDrawer");
			var drawerSettings = {
            		defaultSupressTime : drawer.find("#defaultSuppressTime").val(),
            		defaultSupressTimeFormat : drawer.find("#supressTime").val(),
            };
			return drawerSettings;
		},
	});
});