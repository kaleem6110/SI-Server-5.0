/**
 * If some component is made specially for google map view them shim need to be added explicitly
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($){

	$.widget('spacetimeinsight.siViewerDrawer',$.spacetimeinsight.siViewerBaseWidget,{
		options : {
			windowAttributes:{
				width :"250px",
			},
			toggleDelay : 300,
			actionButtons	: [],
			needTabStrip	: false,
			shimRequired	: false,
		},

		pluginName:"siViewerDrawer",
		
		CONTENT_DIV : kendo.template("<div class ='sti-window-drawer-content'></div>"),
		TAB_STRIP : kendo.template("<div class='sti-window-drawer-tabstrip'></div>"),
		BUTTON		: kendo.template("<input type='button' id='#= buttonText#_drawer_button' value='#= buttonText#' title='#= buttonText#' class='sti-window-drawer-button' />"),

		_create : function(){
			this._super();
		},
		
		_createControls : function(){
			this._super();
			
			$(this.element).css({
				width : this.options.windowAttributes.width,
			}).addClass(" drawer sti-common-drawer sti-drawer-" + this.pluginName);
			
			$(this.element).hide();
			$(this.element).append(this.CONTENT_DIV({}));
			if(this.options.needTabStrip){
				$(this.element).find(".sti-window-drawer-content").append(this.TAB_STRIP({}));
				this.options.tabStrip = $(this.element).find(".sti-window-drawer-tabstrip");
				this._addActionButtons();
			}
		},
		
		_bindControls : function(){
			this._super();
		},

		//Show/Hide toolbar
		toggle : function(delay){
			$(this.element).slideToggle(delay?delay:this.options.toggleDelay);
			this._trigger("onToggle",{id:this.options.id,domElement:$(this.element)});
		},
		
		_addActionButtons : function(){
			var $this = this;
			
			if(this.options.actionButtons.length > 0){
				var buttonText;
				for(var i =0 ;i < this.options.actionButtons.length; i++){
					buttonText = this.options.actionButtons[i];
					this.options.tabStrip.append($this.BUTTON({buttonText:buttonText}));
					this.options.tabStrip.find("#" + buttonText + "_drawer_button.sti-window-drawer-button").addClass("apply-button");
					this.options.tabStrip.find("#" + buttonText + "_drawer_button.sti-window-drawer-button").bind("click",function(e){
						var id = this.id.replace("_drawer_button","");
						$this._trigger("actionButtonClicked",null,{buttonId:id,domElement:this,event:e});
					});
				}
			}
		},
		

		getDrawerFavoriteSettings : function() {
			$si.Logger('favorite').debug("get drawer favorite "  );
			return {};
		},
		
		applyDrawerFavoriteSettings : function(favorite) {
			$si.Logger('favorite').debug("applying drawer favorite "  );	
		},
		
		reset:function(options) {
			$si.Logger('favorite').debug("reseting drawer "  );
		},

	});
});
