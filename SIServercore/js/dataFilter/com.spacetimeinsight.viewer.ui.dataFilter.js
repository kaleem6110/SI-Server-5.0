//need to update data Filter component with iframe true.

define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.window',
    'dataFilter/com.spacetimeinsight.viewer.ui.criteria',
    'dataFilter/com.spacetimeinsight.i18N.dataFilter.regional',
    'siDropDownList',
    'siCheckBoxList',
    'windowUtil',
    'filterUtils',
],function($,$si) {
	
		$.widget('spacetimeinsight.siViewerDataFilter', $.spacetimeinsight.siViewerWindow,{
		    options :{
				title			: $si.i18N.DataFilter.regionalData.dataFilter,
		        drawerWidget 	: "",
		        _ruleIndex	  	: 0,
		        group 			: "Data Filters",
		        windowTools 	: ["FAVORITE"],
		        windowIcon 		: "css/images/data_filter_window.png",
		        groupIcon		: "css/images/data_filter_window.png",
		        shimRequired	: true,//$si.viewer.isShimRequiredForWindows,
		        filterAttributes : [],
		        filterCriteria   : null,
                showHelpDropdown : false,
                isCloseAfterFilter: false,
			},

			pluginName:"siViewerDataFilter",
			
			MAP_VIEW_ID : "mapView",

			DATA_FILTER_CONTAINER : kendo.template("<div class='data-filter-container'></div>"),
			DATA_FILTER_RULE_TEMPLATE : kendo.template("<div id='#= ruleId #' class='criteria' style='margin-left:#= marginLeft #px;'></div>"),
			DROPDOWN_TEMPLATE : kendo.template("<div id ='#= ruleId #_type_div' class='df-rules'>" +
												"<input id ='#= ruleId #_type'/>  #= ruleText #</div>"),
			CONTROL_BUTTONS_TEMPLATE : kendo.template("<div class='df-footer'>"+
											"<div id='#= dataFilterId #_controlButtons' class='criteria-control-buttons'>" +
											"<button id='#= dataFilterId #_apply' type='button' class='criteria-apply-button apply-button ' disabled> #= controlButtons.applyFilters #</button>"+
											"<button id='#= dataFilterId #_close' type='button' class='criteria-close-button apply-button'  disabled> #= controlButtons.applyClose #</button>"+
											"<button id='#= dataFilterId #_clear' type='button' class='criteria-clear-button apply-button'  > #= controlButtons.clearFilters #</button>"+
											"</div></div"),
            FILTER_APPLIED_TO_TEMPLATE : kendo.template("<div class='filter-applied-to'>" +
            										"<div class='filter-applied-to-label'>" +
            											"<b><a class='filter-applied-to-link'>Filter Applied to </a></b>" +
            											"<span class='colon-spacer'> : </span>" +
            											"<span class='filter-affected-text'></span>" +
            										"</div>" +
            										"<div id='filter-dashboard-container' class='filter-dashboard-container' style='display:none;'></div></div>"),
			PARENT_NESTED_BUTTON : kendo.template("<input id ='#= id #' type='button' class='df-level df-top-level' title='#= levelTooltip #'/>"),

			_create : function(){
				
				this._super();

			},
			
			_createControls : function(){
					this.options.windowAttributes = {
						minWidth: "680px",
						minHeight:"156px",        //this is the content min height window minheight automatically set to 180
						//maxWidth: "680px",
						maxHeight:"404px",
						position: {
							top		: "380px",
							left	: "280px"
						},
					};
				
					this._super();

					$(this.element).addClass("data-filter");

					$(this.element).width("100%");

					this.options.currentWidth = this.options.windowAttributes.minWidth.replace("px","");

					$(this.element).append(this.DATA_FILTER_CONTAINER({}));

					this.options.filterContainer = $(this.element).find(".data-filter-container");

					//max height after which scroll appears.
					this.options.filterContainer.css({maxHeight : (this.options.windowAttributes.maxHeight.replace("px","") - 130) + "px"});
					
					//display at center
					$(this.element).data("kendoWindow").center();

					//prevent vertical resize
					this._preventVerticalResize();
					
					this._setDataFilterAttributes();

					this.getFilterOptions();
			},

			_preventVerticalResize : function(){

				$(this.element).siblings("div[class^='k-resize-handle k-resize-']").remove();
				$(this.element).after("<div class='k-resize-handle k-resize-e'></div");
				$(this.element).after("<div class='k-resize-handle k-resize-w'></div");
			},

			_addCriteriaRuleComboBox : function(ruleId,marginLeft){
				var ruleBox = $(this.element).find("#" + ruleId);
				ruleBox.before(this.DROPDOWN_TEMPLATE({ruleId:ruleId,ruleText:$si.i18N.DataFilter.regionalData.ruleText}));
				var $this = this;
				var ruleDropDown = ruleBox.prevAll("#" + ruleId +"_type_div:first").children("#" + ruleId +"_type").siDropDownList({
					  dataSource: $si.CompositeRule.getDataRule(),
					  dataTextField: "displayName",
					  dataValueField: "name",
					  index : 1,
					});

				if(marginLeft < 0){
					marginLeft = 0;
				}
				ruleDropDown.data("kendoDropDownList").wrapper.css("margin-Left",marginLeft + "px");
				ruleDropDown.data("kendoDropDownList").bind("select", function(event){
						$this._trigger("onRuleSelect");
					});

			},

		//Add base content in beginning of parent Box
			_onParentNestedButtonClick : function(event){
				var ruleId = "compositeRule" + this.options._ruleIndex;
				if(this.options.DEFAULT_BOX_ID){
					var defaultBox = $(this.element).find("#" + this.options.DEFAULT_BOX_ID);
					var children = defaultBox.children(".criteriaRow");
					//enable the close button of row.
					if(children.length == 1){
						defaultBox.siViewerCriteria("disableCloseButton",$(children[0]).attr("id")+"_close",false);
					}

					defaultBox.prepend(this.DATA_FILTER_RULE_TEMPLATE({ruleId : ruleId,marginLeft : 0}));
				}
				this._convertBaseContentToKendoComponents(ruleId, 50,false);

				this.options._ruleIndex++;
			},


			//Add rule combo and a box.
			//event and data is null when this method is called for parent box.
			_addBaseContent : function(event,data){
				var ruleId = "compositeRule" + this.options._ruleIndex;
				var $this = this;
				var disableCloseButton = false;
				var marginLeft = 20;
				var filterContainer = this.options.filterContainer;
				if(data){
					//Adding box below the nested button row.
					//var rowId = $("#" + data.id).closest(".criteriaRow").attr("id");
					var currentRow = filterContainer.find("#" + data.id).closest(".criteriaRow");
					currentRow.after(this.DATA_FILTER_RULE_TEMPLATE({ruleId : ruleId,marginLeft : 0}));
				}else{
					//Adding first box.
					this._enableControlBox(false);
					marginLeft -= 10;
					disableCloseButton = true;
					this.options.DEFAULT_BOX_ID = ruleId;
					filterContainer.append(this.DATA_FILTER_RULE_TEMPLATE({ruleId : ruleId,marginLeft : 0}));
					var rule = filterContainer.find("#" + ruleId);

					//Adding parent nesting button
					rule.before(this.PARENT_NESTED_BUTTON({id:"parentNestedButton",levelTooltip: $si.i18N.DataFilter.regionalData.tooltip.actionButtons.level}));
					rule.prev("#parentNestedButton").bind("click", function(event){
						$this._onParentNestedButtonClick(event);
						$this._trigger("_onParentNestedButtonClick",null,{});
					});
				}

				this._convertBaseContentToKendoComponents(ruleId, marginLeft,disableCloseButton);

				this.options._ruleIndex++;
				
				return ruleId;
			},

			_convertBaseContentToKendoComponents : function(ruleId,marginLeft,disableCloseButton){
				var ruleBox = $(this.element).find("#" + ruleId);
				var $this = this;
				//This will tell the nested depth
				var fieldNameCBXAdjustingWidth = 50 * ruleBox.parents(".criteria").length;

				this._addCriteriaRuleComboBox(ruleId,fieldNameCBXAdjustingWidth - 10);

//				if(fieldNameCBXAdjustingWidth >= 200){
//					var dataFilter = $(this.element).data("kendoWindow");
//					dataFilter.wrapper.width((parseInt(this.options.currentWidth) + 50) + "px");
//					dataFilter.trigger("resize");
//				}

				var filterBox =  ruleBox.siViewerCriteria({
											data : this.options.filterAttributes,
											fieldNameCBXAdjustingWidth : fieldNameCBXAdjustingWidth,
											filterOptions : this.options.filterOptions,
											onRowChecked  : function(event,data){
																if(data && data.checked){
																	$this._enableControlBox(true);
																}else if($($this.element).find(".df-checkbox input[type='checkbox']:checked").length > 0){
																	$this._enableControlBox(true);
																}else{
																	$this._enableControlBox(false);
																}
															},
											onRowAdded : function(event,data){
															if($this.options.filterContainer && $this.options.filterContainer.length > 0){
																var scrollHeight = $this.options.filterContainer.prop("scrollHeight");
																$this.options.filterContainer.scrollTop(scrollHeight);
															}
														},
											filterConfigError : function(event,data){
																	$this._createErrorNotification(data);
														},
										});

				////"CLOSE BUTTON" of first row of default box is disabled.
				if(disableCloseButton){
					var children = filterBox.children("div");
					if(children.length == 1){
						var firstRowId = $(children).attr("id");
						filterBox.siViewerCriteria("disableCloseButton",firstRowId + "_close", disableCloseButton);
					}
				}

				//Filter Box events
				filterBox.siViewerCriteria().bind("siviewercriteria_onlevelbuttonclick",function(event,data){
					var criteriaId = $this._addBaseContent(event,data);
					
					if(data && data.criterias){
						/** call is from apply favorite **/
						var criteriaBox = $($this.element).find("#" + criteriaId);
						criteriaBox.siViewerCriteria().bind("siviewercriteria_oncriteriacreationcomplete",function(e){
								$this._createDataFilterWithFilterCriteria(data.criterias, criteriaId);
								criteriaBox.siViewerCriteria().unbind("siviewercriteria_oncriteriacreationcomplete");
						});
					}

					//Enable close button of first row of default box
					$this._disableFirstRowOfParentBox(data.criteriaId,false);

					//propagate event
					$this._trigger("onLevelButtonClick",null,data);

					//cause problem with nested filter Box.
					event.stopPropagation();
				});

				filterBox.siViewerCriteria().bind("siviewercriteria_onclosebuttonclick",function(event,data){
					$this._onCloseButtonClick(event,data);
					//propagate event
					$this._trigger("onCloseButtonClick",null,data);

					//cause problem with nested filter Box.
					event.stopPropagation();
				});

				filterBox.siViewerCriteria().bind("siviewercriteria_onaddbuttonclick",function(event,data){
					//Enable close button of first row of default box
					$this._disableFirstRowOfParentBox(data.criteriaId,false);
					//propagate event
					$this._trigger("onAddButtonClick",null,data);

					//cause problem with nested filter Box.
					event.stopPropagation();
				});

				filterBox.siViewerCriteria().bind("siviewercriteria_ondestroy",function(event,data){
					//remove rule combo box
					var ruleId = data.criteriaId;
					var ruleComboDiv = $($this.element).find("#" + ruleId + "_type_div");
					if(ruleComboDiv.length > 0){
						ruleComboDiv.find("#" + ruleId + "_type").data("kendoDropDownList").destroy();
						ruleComboDiv.remove();
					}
				});
			},

			//Enable/Disable close button of first row of default box
			_disableFirstRowOfParentBox :function(ruleId,disabled){
				if(ruleId == this.options.DEFAULT_BOX_ID){
					var children = $(this.element).find("#" + ruleId).find(".criteriaRow");
					//this will restrict the code to run only
					if(children.length == 2){
						var rowId = $(children[0]).attr("id");
						$("#" + ruleId).siViewerCriteria("disableCloseButton",rowId+"_close",disabled);
					}
				}
			},


			_onCloseButtonClick : function(event,data){
				var ruleId = data.criteriaId;
				var ruleBox =  $(this.element).find("#" + ruleId);
				var children = ruleBox.find(".criteriaRow");
				var immediateChildren = ruleBox.children(".criteriaRow");

				if(children.length == 0){
					if(ruleId == this.options.DEFAULT_BOX_ID){
						this.resetDataFilter();
					}else{
						//remove the level if no child present in level.
						this.removeLevel(ruleId);
					}
				}else if(immediateChildren.length == 1 && children.length == 1 && ruleId == this.options.DEFAULT_BOX_ID){
					//Disable close button of only existing row
					var firstRowId = $(immediateChildren).attr("id");
					ruleBox.siViewerCriteria("disableCloseButton",firstRowId + "_close", true);
				}

			},

			_addFilterAppliedToBox : function(){
				var $this = this;

				$(this.element).find(".df-footer").prepend(this.FILTER_APPLIED_TO_TEMPLATE({dataFilterId:this.options.id}));
				this.options.appliedFilterBox = $(this.element).find(".df-footer").find(".filter-dashboard-container");
				this.options.appliedFilterBox.siCheckBoxList({
														visible      : false,
														data 		 : this.options.windowConfig.filterableWindows,
														onCheck      : function(event,data){
																			if(data){
																				var selectedWindow = $this._getFilterableWindowById(data.id);
																				selectedWindow.checked = data.checked;
																				$this._changeAppliedToText(data.text,data.checked);
																			}
																		},
													});
				
				var filterLink = $(this.element).find(".df-footer").find(".filter-applied-to-link");
				filterLink.click(function(e){
					$this.options.appliedFilterBox.siCheckBoxList("showHideList",true);
				});			
				//Refresh Filterable Windows after layer get refreshed
				this.options._triggerApplyFilterToFilterableWindowsFn = this._triggerApplyFilterToFilterableWindows.bind(this);
				$si.eventSource.globalEvents.bind($si.events.GlobalEvents.onGlobalEvent,this.options._triggerApplyFilterToFilterableWindowsFn);
			},
			
			_triggerApplyFilterToFilterableWindows : function(event){
				if(event && event.data && event.data.name == "onLoadComplete" && event.data.layerId == this.options.windowConfig.businessViewId){
					this.applyFilterToFilterableWindows(this.options.windowConfig.filterCriteria);
				}
			},
			
			_getFilterableWindowById : function(id){
				var returnWindow;
				if(this.options.windowConfig.filterableWindows && id){
					$.each(this.options.windowConfig.filterableWindows,function(index,filterWindow){
						if(filterWindow.id == id){
							returnWindow = filterWindow;
							return false;
						}
					});
				}
				return returnWindow;
			},


			_changeAppliedToText : function(text,isChecked){
	    		var span = $(this.element).find("span.filter-affected-text");
	    		if(span && span.length > 0){
	    			span.empty();
	    			var spanText = "";
	    			var windowList = this.options.windowConfig.filterableWindows;
					if(windowList){
						$(windowList).each(function(index,window){
							if(window.checked){
	   	    					if(spanText){
	   	    						spanText += ", ";
	   	    					}
	   	    					spanText += window.title ? window.title : window.id;
							} 
						});
					}
	    			
	    			span.text(spanText);
	    		}
			},

			_addControlButtons : function(){
				var $this = this;
				var dataFilterId = this.options.id ;

				$(this.element).append(this.CONTROL_BUTTONS_TEMPLATE({
												dataFilterId:dataFilterId,
												controlButtons:$si.i18N.DataFilter.regionalData.tooltip.controlButtons,
										}));
				
				if(this.options.windowConfig.filterableWindows && this.options.windowConfig.filterableWindows.length > 0){
					this._addFilterAppliedToBox();
				}

				var controlBox =$(this.element).find( "#" + dataFilterId + "_controlButtons");

				controlBox.find("#" + dataFilterId + "_apply").bind("click",function(event){
					$this._applyDataFilter(event);
				});

				controlBox.find("#" + dataFilterId + "_close").bind("click",function(event){
					if(!($this.options.windowConfig.filterableWindows && $this.options.windowConfig.filterableWindows.length > 0)){
						$this._applyDataFilter(event);
						$this.closeWindow(event);
					}else{
						$this.options.isCloseAfterFilter = true; 
						$this._applyDataFilter(event);
					}
				});
				
				this.options.ConfirmDialogButtonClickedFn = this.OnConfirmDialogButtonClicked.bind(this);
				
					
				controlBox.find("#" + dataFilterId + "_clear").bind("click",function(event){
					//use some third party component for confirmation box
				var windowAttributes = $.extend({},$this.getWindowStyles().windowAttributes);
					windowAttributes.modal = true;
					 $si.DialogBox.confirm($this.options.title,$si.i18N.Global.filterResetConfirmMessage,"",$this.options.id,windowAttributes);
					$('#' + $this.options.id + '_dialog').bind("confirmdialogbuttonclicked",$this.options.ConfirmDialogButtonClickedFn);
				});


			},
			
			_unBindGlobalEvents : function(){
				if(this.options._triggerApplyFilterToFilterableWindowsFn){
					$si.eventSource.globalEvents.unbind($si.events.GlobalEvents.onGlobalEvent,this.options._triggerApplyFilterToFilterableWindowsFn);
				}
			},
			
			closeWindow : function(){
				this._unBindGlobalEvents();
				this._unBindDialogBoxEvent();
				this._super();
			},

			applyFilterToFilterableWindows : function(filterCriteria){
				var $this = this;
				var windowList = this.options.windowConfig.filterableWindows;
				if(windowList){
					$(windowList).each(function(index,window){
						if(window.checked){
   	    					$si.businessViewUtil.invokeWindowMethodByWindowObject(window,"applyFilter",filterCriteria);
						} 
					});
				}
				if(this.options.isCloseAfterFilter){
					this.closeWindow();
				}
			},
			
			_unBindDialogBoxEvent: function(){
				$($si.viewer).unbind("confirmdialogbuttonclicked",this.options.ConfirmDialogButtonClickedFn);
			},

			_applyDataFilter : function(event) {
				var filterCriteria = this.getFilterCriteria();
				/** Validation check that filter criteria is not empty **/ 
				if(filterCriteria && filterCriteria.criterias && filterCriteria.criterias.length > 0){
					this.setCriteria(this._toJson(filterCriteria),false);
				}
			},

			setCriteria : function(filterCriteria,isClearFilterCriteria){
				this.options.windowConfig.filterCriteria = filterCriteria;
				var params = {
						filterCriteria	: filterCriteria,
						windowIds 		: [],
						businessViewId	: this.options.windowConfig.businessViewId,
						businessViewName: this.options.windowConfig.businessViewName,
						isClearFilterCriteria : isClearFilterCriteria,
					};
				/** only in case of layer data filter check map condition **/
				if(this.options.windowConfig.filterableWindows && this.options.windowConfig.filterableWindows.length > 0){
					var mapViewWindow = this._getFilterableWindowById(this.MAP_VIEW_ID);
					if(mapViewWindow && mapViewWindow.checked){
						this._trigger("onSetCriteria",null,params);
					}else{
						this.applyFilterToFilterableWindows(this.options.windowConfig.filterCriteria);
					}
				}else{
					this._trigger("onSetCriteria",null,params);
				}
				
			},

		    _enableControlBox:function(toggleValue) {
		    	this._enableButton($(this.element).find(".criteria-apply-button"),toggleValue);
		    	this._enableButton($(this.element).find(".criteria-close-button"),toggleValue);
		    },

			_enableButton :  function(button,isEnabled){
				if(button && $(button).length > 0){
					if(isEnabled) {
			    		button.removeAttr("disabled");
			    	} else {
			    		button.attr("disabled",true);
			    	}
				}
			},
					    
			_toJson : function(filterCriteria){
				return JSON.stringify(filterCriteria);
			},

			setMetaData : function(data,defaultTemplate) {
				this.options.data = data;
				this.resetDataFilter();
			},

			//Recursively iterate the box and fetch filter criteria for all nested boxes.
			getFilterCriteria : function(parentBoxId){
				if(!parentBoxId){
					parentBoxId = this.options.DEFAULT_BOX_ID;
				}

				//get the selected rule
				var rule = $(this.element).find("#" + parentBoxId + "_type").data("kendoDropDownList").dataItem().value;

				var compositeRule = new $si.filterUtils.CompositeRule(rule);

				var parentBox = $(this.element).find("#" + parentBoxId);

				var $this = this;
				compositeRule.criterias = parentBox.siViewerCriteria("getFilterCriteria");
				//recursively get all children
				parentBox.children(".criteria").each(function(index,filterRule){
					var ruleId = $(filterRule).attr("id");
					compositeRule.criterias.push($this.getFilterCriteria(ruleId));
				});

				return compositeRule;
			},


			clearDataFilter : function(event) {
				var $this = this;
				this.resetDataFilter();
				var dataFilter = $("#" +$this.options.id).data("kendoWindow");
				dataFilter.wrapper.css({width : this.options.windowAttributes.minWidth});
				dataFilter.trigger("resize");

				this.setCriteria(null,true);
				this._trigger("onClearDataFilter",null,{id:this.options.id,domElement:event.target});
			},

			//destroy all data and recreate base content
			resetDataFilter : function(){
				this.options._ruleIndex = 0;
				//check the issue filter container is not removing
				var $this = this;
				//destroy data filter box to release all handlers
				this.options.filterContainer.children(".criteria").each(function(index,filterRule){
					$this.removeLevel($(filterRule).attr("id"));

				});

				this.options.filterContainer.empty();
				//this will add a combo box and criteria with single row
				this._addBaseContent();
				//Add control buttons
				//this._addControlButtons();
			},

			//remove filter box and its rule combo box
			removeLevel : function(ruleId){
				var ruleBox = this.options.filterContainer.find("#" + ruleId);
				var parentBox = ruleBox.parent(".criteria");

				//Box is created using Widget component therefore "remove" method internally called "destroy" method for all nested Boxes.
				ruleBox.remove();

				//rule combobox related to each filter box is destroyed on callback of box destroy.

				//In case of nested boxes need to check whether upper level is empty or not.
				if(parentBox.length == 1){
					this._onCloseButtonClick(null, {criteriaId : parentBox.attr("id")});
				}

			},

			_addToFavorite : function() {
				var filterJson = _toJson();
				this._trigger("favoriteChanged");
			},

			resizeWindow : function(event){
				var width = $(this.element).width();
				var delta = width - this.options.currentWidth;
				this.options.currentWidth = width;
				var minWidth = this.options.windowAttributes.minWidth.replace("px","");
				var fieldCBXs = this.options.filterContainer.find(".df-field span.k-dropdown");
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

			//this method call the input renderer to get options
			getFilterOptions : function(){
				if(this.options.filterInputRenderer){
					var businessView = $si.businessViewUtil.getBusinessViewById(this.options.windowConfig.businessViewId,this.options.windowConfig.businessViewName);
					if(businessView && businessView.data && businessView.data.properties){
						var viewProperties = businessView.data.properties;
						var params = {
								renderertype  : this.options.filterInputRenderer,
								layerid		  : businessView.data.id,
								ecosid		  : viewProperties.ecosid,
								artefactname  : viewProperties.artefactname,
								ecoexpmodel   : viewProperties.ecoexpmodel,
								windowId	  : this.options.windowConfig.windowId,
						};
						$si.routes.getFilterOptions(this.filterOptionSuccess.bind(this),this.filterOptionfailure.bind(this),params)
					}
				}
			},

			filterOptionSuccess : function(data){
				this.options.filterOptions = data;
				if(this.options.windowConfig.filterCriteria){
					/** Create populated data filter **/
					this._buildDataFilterWithFilterCriteria(JSON.parse(this.options.windowConfig.filterCriteria));
				}else{
					/** create empty data filter with base content **/
					//this will add a combo box and criteria with single row
					this._addBaseContent();
				}

				//Add control buttons
				this._addControlButtons();
			},
			
			getWindowContentFavoriteSettings : function() {
				return this.getFilterCriteria();
			},
			

			filterOptionfailure : function(error){
				this.options.error = error._errorDesc ;

				$si.Logger('Data Filter').error("Error while getting the filter options. " + error);
			},
			
			_setDataFilterAttributes : function(){
				this.options.filterAttributes = [];
				var $this = this;
				var dataFilterWindow = this.options.windowConfig;
	    		if(dataFilterWindow){
	    			if(!this.options.onSetCriteria){
	    				this.options.onSetCriteria = dataFilterWindow.onSetCriteria;
	    			}
	    			var metaData = dataFilterWindow.metadata;
	    			if(metaData && dataFilterWindow.filterProperties && dataFilterWindow.filterProperties.fields && dataFilterWindow.filterProperties.fields.length >0){
	    				if(dataFilterWindow.filterProperties.inputDatasource){
	    					this.options.filterInputRenderer = dataFilterWindow.filterProperties.inputDatasource.dataFetcherClass;
	    					this.options.filterDataSourceType = dataFilterWindow.filterProperties.inputDatasource.datasourceType;
	    				}
						var fields = dataFilterWindow.filterProperties.fields;
						var fieldName;
						var displayName;
						var dataType;
						$.each(fields,function(index,attribute){
							fieldName = metaData[attribute.name].name;
							displayName = metaData[attribute.name].displayName;
							dataType = metaData[attribute.name].type;
							$this.options.filterAttributes.push({
																fieldName   : fieldName,
																displayName : displayName,
																dataType    : dataType,
																displayType : attribute.type,
																options		: attribute.options,
																
																
														});
						});
						if(dataFilterWindow.showDefaultFilterNotification){
							/** set flag false in actual object. dataFilterWindow is a clone of actual**/
							$si.businessViewUtil.setShowDefaultFilterNotification(dataFilterWindow.businessViewId,dataFilterWindow.businessViewName,dataFilterWindow.id,false);
							this._createErrorNotification({
															message : $si.i18N.DataFilter.regionalData.notifications.errorApplyDefault,
														});
						}
					}
				}
			},
			
			applyWindowContentFavoriteSettings  : function(favorite) {
				this._buildDataFilterWithFilterCriteria(favorite);
			},
			
			_buildDataFilterWithFilterCriteria : function(filterCriteria){
				if(filterCriteria){
					this.resetDataFilter();
					
					var $this = this;
					var criteriaBox = $(this.element).find("#" + this.options.DEFAULT_BOX_ID);
					criteriaBox.siViewerCriteria().bind("siviewercriteria_oncriteriacreationcomplete",function(e,data){
							$this._createDataFilterWithFilterCriteria(filterCriteria, $this.options.DEFAULT_BOX_ID);
							criteriaBox.siViewerCriteria().unbind("siviewercriteria_oncriteriacreationcomplete");
					});
				}
			},
			
			_createDataFilterWithFilterCriteria : function(criteriaObject,criteriaBoxId){
				var $this = this;
				if(criteriaObject && criteriaBoxId){
					var criteriaBox = $(this.element).find("#" + criteriaBoxId);
					var ruleDropDown = criteriaBox.prevAll("#" + criteriaBoxId +"_type_div:first").find("#" + criteriaBoxId +"_type");
					if(criteriaObject.type == "Any"){
						ruleDropDown.data("kendoDropDownList").select(0);
					}
					if(criteriaObject.criterias){
						$.each(criteriaObject.criterias,function(index,criteria){
							//get these values from rule constant array
							if(criteria.type != "All" &&  criteria.type != "Any"){
								criteriaBox.siViewerCriteria("triggerAddButton");
								criteriaBox.siViewerCriteria("populateLastRow",criteria);
							}else{
								criteriaBox.siViewerCriteria("triggerLevelButton",criteria);
							}
							
							/** TODO : delete default row if it is not populate **/
						});
					}
				}
			},
			
			OnConfirmDialogButtonClicked: function(e,showDialog){
					var $this = this;
						if(showDialog){
							$this.clearDataFilter(event);
						}
				}
	});

});