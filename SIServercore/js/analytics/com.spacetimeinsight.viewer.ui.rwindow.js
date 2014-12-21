define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'window/com.spacetimeinsight.viewer.window.baseWindow',
    'common/com.spacetimeinsight.viewer.ui.window',
    'siDropDownList',
    'windowUtil',
],function($) {
		$.widget('spacetimeinsight.siRWindow', $.spacetimeinsight.siViewerBaseWindow,{
		    options :{
				windowAttributes : {
					minWidth: "410px",
					minHeight:"320px",        //this is the content min height window minheight automatically set to 180
					maxWidth: "680px",
					maxHeight:"404px",
					position: {
						top		: "380px",
						left	: "280px"
					},
				},
		        data 			: [],
				windowTools 	: ["REFRESH","AUTOREFRESH"],
		        drawerWidget 	: "",
		        group 			: "R Window",
		        windowIcon 		: "css/images/timecontrol.png",
		        groupIcon		: "css/images/timecontrol.png",
		        filterInputRenderer   : "",
		        layerTimeProperties	  : "",
		        rParamWindowWidget : "siViewerREditableParameters",
		        rParamWindowWidgetJS : "analytics/com.spacetimeinsight.viewer.ui.reditableparameters",
			},
			pluginName:"siRWindow",

			REDITABLE_PARAMS_WINDOW_DIV : kendo.template("<div id='#= id #_rparamwindow'></div>"),
			TABBED_CONTAINER : kendo.template("<div class='tabbed-container'></div>"),
			REDITABLE_DIV_TAB : kendo.template("<div id='tabbed_div_id' class='tabbed_div_tab'></div>"),


			_create : function(){
			/*if(this.options.windowConfig.loadByDefault) {*/
				//used in event handling. Each event is prefix by plugin name
				this.widgetEventPrefix = this.pluginName + "_";
				this.options.id = $(this.element).attr("id");

				$(this.element).addClass("r-analysis-window");

				$(this.element).width("100%");
				this.options.windowAttributes.minWidth = "410px";
				this.options.windowAttributes.minHeight = "320px";
				this.options.windowAttributes.maxHeight = "404px";
				this.options.currentWidth = this.options.windowAttributes.minWidth.replace("px","");
				this.options.onResize = this._adjustFieldCBX.bind(this),

				$(this.element).append(this.TABBED_CONTAINER({}));

				this.options.tabbedViewContainer = $(this.element).find(".tabbed-container");
                //max height after which scroll appears.
                this.options.tabbedViewContainer.css({maxHeight : (this.options.windowAttributes.maxHeight.replace("px","") - 130) + "px"});


                this._super();

                //display at center
                $(this.element).data("kendoWindow").center();

                //prevent vertical resize
                this._preventVerticalResize();
                this.options.tabbedViewContainer.append(this.REDITABLE_DIV_TAB({}));
               /*} else {
                  this._openRWindow();
               }*/
            },

			/*_openRWindow : function(){
                var $this = this;
                if(this.options.rParamWindowWidget && this.options.rParamWindowWidget != ""){
                    requirejs([this.options.rParamWindowWidgetJS],function(){
                        var selectedWindows = [];
						//adding mapview dashboard only if mapView available in right click menu
						if($si.viewer.requiresMapViewInBusinessViewRightclickMenu) {
							selectedWindows.push({
								id       : "mapView",
								title    : "Map View",
								iconUrl  : "css/images/map_icon.png",
							});
						}
						if ($this.options.windowConfig.analyticsEditableParams != undefined
								&& $this.options.windowConfig.analyticsEditableParams != '') {
							if($this.options.windows){
								$.each($this.options.windows,function(index,window){
									if(window){
										selectedWindows.push(window);
									}
								});
							}
                        var id = $this.options.businessViewId;
                        var title = "Run Analysis -> " + $this.options.title;
                        $($this.element).append($this.REDITABLE_PARAMS_WINDOW_DIV({id: id}));
                        $this.options.timeFilter = $($this.element).find("#" + id +"_rparamwindow");

                        $this.options.timeFilter[$this.options.rParamWindowWidget]({
							title               : title,
                            defaultWidth        : 880,
                            shimRequired        : $this.options.shimRequired,
                            dashboards 	 		: selectedWindows,
                            businessViewId      : $this.options.windowConfig.businessViewId,
                            businessViewName    : $this.options.windowConfig.businessViewName,
                            windowConfig		: $this.options.windowConfig,
                            isLayerRightClick   : false,
                        });
						}
                    });
                }},*/

			applyWindowData: function () {

			this.options.old_div_tab = this.options.tabbedViewContainer.find(".tabbed_div_tab");

			if (this.options.old_div_tab.data("kendoTabStrip")) {
				this.options.old_div_tab.data("kendoTabStrip").destroy();
				this.options.old_div_tab.remove();
				this.options.tabbedViewContainer.append(this.REDITABLE_DIV_TAB({}));
			}

				//recreating..
            	this.options.div_tab = this.options.tabbedViewContainer.find(".tabbed_div_tab").kendoTabStrip
                ({
			        dataTextField: "name",
			        dataContentField: "imageURI",
			        dataSource: this.options.windowData.imagesData,
			    });

			     this.options.div_tab.data("kendoTabStrip").select(0);
            },

			_preventVerticalResize : function(){

				$(this.element).siblings("div[class^='k-resize-handle k-resize-']").remove();
				$(this.element).after("<div class='k-resize-handle k-resize-e'></div");
				$(this.element).after("<div class='k-resize-handle k-resize-w'></div");
			},

			getWindowContentFavoriteSettings : function() {
				return this.getFilterCriteria();
			},

			applyWindowContentFavoriteSettings  : function(favorite) {

			},
			_addToFavorite : function() {
				var filterJson = _toJson();
				this._trigger("favoriteChanged");
			},

			_adjustFieldCBX : function(event,data){
				var width = $(this.element).width();
				var delta = width - this.options.currentWidth;
				this.options.currentWidth = width;
				var minWidth = this.options.windowAttributes.minWidth.replace("px","");
				var fieldCBXs = this.options.tabbedViewContainer.find(".df-field span.k-combobox");
				var childSpan;
				var newWidth;
				var padding;
				$(fieldCBXs).each(function(index,fieldCBX){
					padding = $(fieldCBX).closest(".criteriaRow").css("paddingLeft").replace("px","") - 195;
					//condition added to fix the issue when level is nested above 4
					if(delta < 0 || (width - minWidth > padding)){
						childSpan = $(fieldCBX).children("span.k-dropdown-wrap");
						newWidth = childSpan.width() + delta;
						childSpan.width(newWidth +"px");
						$(fieldCBX).width((newWidth + 25) + "px");
					}
				});
			},
	});

});