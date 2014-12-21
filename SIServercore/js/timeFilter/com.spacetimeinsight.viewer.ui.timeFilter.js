define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'dateTimeFormat',
    'common/com.spacetimeinsight.viewer.ui.window',
    'timeFilter/com.spacetimeinsight.i18N.timeFilter.regional',
    'siDropDownList',
    'siDateTimePicker',
    'windowUtil',
],function($,$si) {

		var SubTimeRule = function(starttime,endtime){
			this.lowValue=starttime;
			this.highValue=endtime;
		}

		var TimeCompositeRule = function(type,fieldName,operator) {
			this.criteriaType = "TimeRangeCriteria";
			this.type = "TimeRange";
			this.fieldName = fieldName;
			this.operator = operator;
			this.value = {};
		}


		$.widget('spacetimeinsight.siViewerTimeFilter', $.spacetimeinsight.siViewerWindow,{
		    options : {
				title			: $si.i18N.TimeFilter.regionalData.timeFilter,
		        drawerWidget 	: "",
		        dashboards	  	: [],
		        group 			: "Time Filters",
		        windowIcon 		: "css/images/time_filter_window.png",
		        groupIcon		: "css/images/time_filter_window.png",
                showHelpDropdown	: false,
		        layerTimeProperties	  : "",
			},

			pluginName:"siViewerTimeFilter",
			defaultDay: "Yesterday",
			TIME_FILTER_CONTAINER : kendo.template("<div class='time-filter-container'></div>"),
			COMBO_BOX_TEMPLATE : kendo.template("<div><span>#= label #</span><div id='#= comboId #' class='#= comboClass #'></div></div>"),
			DATE_TIME_INPUT_FORMAT_TEMPLATE : kendo.template("<span id='dateTimeFormatId'>#= dateTimeFormat #</span>"),
			START_END_TIME_RANGE_TEMPLATE : kendo.template("<div><span>#= label #</span><span id='#= timeRange #'><input type='text' class='dateTimePicker'/></span></div>"),
			TIME_INTERVAL_TEMPLATE : kendo.template("<div><span>#= showLabel #</span><div id='#= showId #' class='#= showClass #'></div>"+
											"<span id='byLabel'>#= byLabel #</span><div id='#= byId #' class='#= byClass #'></div>"),
			CONTROL_BUTTONS_TEMPLATE : kendo.template("<div id='#= timeFilterId #_controlButtons' class='criteria-control-buttons'>" +
											"<button id='#= timeFilterId #_apply' type='button' class='criteria-apply-button apply-button '> #= controlButtons.applyFilters #</button>"+
											"<button id='#= timeFilterId #_close' type='button' class='criteria-close-button apply-button'> #= controlButtons.applyClose #</button>"+
											"<button id='#= timeFilterId #_clear' type='button' class='criteria-clear-button apply-button'> #= controlButtons.clearFilters #</button>"+
											"</div"),
            FILTER_APPLIED_TO_TEMPLATE : kendo.template("<div class='filter-applied-to'><span class='filter-affected-drop-down'></span><span> : </span><span class='filter-affected-text'></span></div>"),
            DASHBOARD_TEMPLATE : kendo.template("<div id='#= id #_filter_dashboard' class='filter-dashboard'><span><input type='checkbox' #= checked # class='filter-dashboard-checkbox'/></span> <span><img src='#= dashboardIcon #' class='filter-dashboard-img'></span><span class='filter-dashboard-text'> #= dashboardTitle # </span></div>"),

			_create : function(){
				// Favorites - only show if time filter window access from Business view
				if(this.options.isLayerRightClick) {
					this.options.windowTools = ["FAVORITE"];
				} else {
					this.options.windowTools = [];
				}
				if(this.options.windowConfig){
					this.options.windowConfig.viewerHelpUrl='#Defining_and_Applying_Time_Filters.htm';
				}else{
					this.options.windowConfig=[];
					this.options.windowConfig.viewerHelpUrl='#Defining_and_Applying_Time_Filters.htm';
				}

				//this will add window in timeFilter
				this._super();
			},

			_createControls : function(){
				this.options.windowAttributes = {
					minWidth: "430px",
					minHeight:"320px",
					//maxWidth: "680px",
					//maxHeight:"404px",
					position: {
						top		: "380px",
						left	: "280px"
					},
				},
				this._super();

				$(this.element).addClass("time-filter");
			 
				$(this.element).width("100%");
				$(this.element).css("overflow","hidden");

				this.options.currentWidth = this.options.windowAttributes.minWidth.replace("px","");

				//this.options.onResize = this._adjustFieldCBX.bind(this),

				$(this.element).append(this.TIME_FILTER_CONTAINER({}));

				this.options.filterContainer = $(this.element).find(".time-filter-container");

				//display at center
				$(this.element).data("kendoWindow").center();

				//prevent vertical resize
				this._preventVerticalResize();

				this._setTimeFilterAttributes();

				// adding time intervals
				if(this.options.layerTimeProperties.showTimeIntervals) {
					this._addTimeIntervalContent();
				}

				this._setContentToDateTimePickers();

				this._addControlButtons();

			},

			_setTimeFilterAttributes : function(){
				var $this = this;
				var timeProperties = this.options.layerTimeProperties;
				// setting inputdate format if not available
				if(!timeProperties.inputDateFormat) {
					timeProperties.inputDateFormat="MM/dd/yyyy hh:mm:ss tt";
				}
				// checking the input date format
				this._checkDateTimeFormat(timeProperties.inputDateFormat);

				// it will add the time range combo box
				this._addTimeRangeContent();
				this.options.filterContainer.append(this.DATE_TIME_INPUT_FORMAT_TEMPLATE({dateTimeFormat: timeProperties.inputDateFormat}));
				this.options.filterContainer.append(this.START_END_TIME_RANGE_TEMPLATE({label: $si.i18N.TimeFilter.regionalData.startTime, timeRange:"startTimeRange"}));
				this.options.filterContainer.find("#startTimeRange").parent("div").css("padding-top", "0px");
				this.options.filterContainer.append(this.START_END_TIME_RANGE_TEMPLATE({label: $si.i18N.TimeFilter.regionalData.endTime, timeRange:"endTimeRange"}));


				var inputDateFormat = timeProperties.inputDateFormat;
				if(this.options.inputDateTimeFormat.hours == false) {
					inputDateFormat =  inputDateFormat + " HH";
				}

				if(this.options.inputDateTimeFormat.minutes == false) {
					inputDateFormat = inputDateFormat + ":mm";
				}

				if(this.options.inputDateTimeFormat.seconds == false) {
					inputDateFormat = inputDateFormat + ":ss";
				}
				this.options.startTimePicker = this.options.filterContainer.find("#startTimeRange .dateTimePicker");
				this.options.endTimePicker = this.options.filterContainer.find("#endTimeRange .dateTimePicker");

				this.options.startTimePicker.siDateTimePicker({
					shimRequired: true,
					format: inputDateFormat,
					interval: 15,
					change : function(event){
								$this.options.preTimeRange.data("kendoDropDownList").select(timeProperties.timeRange.length-1);
								$this._enableDateTimeControls();
        					}
        		});
				this.options.endTimePicker.siDateTimePicker({
					shimRequired: true,
					format: inputDateFormat,
					interval: 15,
					change : function(event){
								$this.options.preTimeRange.data("kendoDropDownList").select(timeProperties.timeRange.length-1);
								$this._enableDateTimeControls();
							}
				});
				this.options.filterContainer.find(".k-i-calendar").attr("title",$si.i18N.TimeFilter.regionalData.tooltip.selectDate);
                this.options.filterContainer.find(".k-i-clock").attr("title",$si.i18N.TimeFilter.regionalData.tooltip.selectTime);
			},

			_enableDateTimeControls: function(){
				this.options.startTimePicker.prop("disabled", false);
				this.options.endTimePicker.prop("disabled", false);
			},

			_disableDateTimeControls: function(){
				this.options.startTimePicker.prop("disabled", true);
				this.options.endTimePicker.prop("disabled", true);
			},

			_setContentToDateTimePickers: function(values) {
				var $this = this;
				var timeRangeValues = [];
				if(values) {
					timeRangeValues = values;
					this._setTimeRangeValues(timeRangeValues);
				} else if(this.options.layerTimeProperties.defaultTimeRange) {
					if(this.options.layerTimeProperties.defaultTimeRange == "startendtime") {
						this.options.preTimeRange.data("kendoDropDownList").value(0);
						if(this.options.layerTimeProperties.defaultStartTime) {
							this.options.startTimePicker.data("kendoDateTimePicker").value(new Date(Date.parse(this.options.layerTimeProperties.defaultStartTime)));
						} else {
							this.options.startTimePicker.data("kendoDateTimePicker").value(new Date());
						}

						if(this.options.layerTimeProperties.defaultEndTime) {
							this.options.endTimePicker.data("kendoDateTimePicker").value(new Date(Date.parse(this.options.layerTimeProperties.defaultEndTime)));
						} else {
							this.options.endTimePicker.data("kendoDateTimePicker").value(new Date());
						}
					} else {
						timeRangeValues = $.grep($this.options.layerTimeProperties.timeRange, function(e){ return e.label == $this.options.layerTimeProperties.defaultTimeRange; });
						this.options.preTimeRange.data("kendoDropDownList").select(function(listItem) {
							if(timeRangeValues && timeRangeValues.length > 0) {
								return listItem.label == timeRangeValues[0].label;
							} else {
								return listItem.label == "Custom";
							}
						});
						this._setTimeRangeValues(timeRangeValues);
					}
				} else {
					timeRangeValues = $.grep($this.options.layerTimeProperties.timeRange, function(e){ return (e.time == 86400)&&(e.label == $this.defaultDay); });
						this.options.preTimeRange.data("kendoDropDownList").select(function(listItem) {
							if(timeRangeValues && timeRangeValues.length > 0) {
								return listItem.label == timeRangeValues[0].label;
							} else {
								return listItem.label == "Custom";
							}
						});
						this._setTimeRangeValues(timeRangeValues);

					/*if(this.options.isApplicationToolbar) {
						this.options.preTimeRange.data("kendoDropDownList").value(86400);
						var startDate = new Date();
						startDate.setSeconds(-86400 + startDate.getSeconds())
						this.options.startTimePicker.data("kendoDateTimePicker").value(startDate);
						this.options.endTimePicker.data("kendoDateTimePicker").value(new Date());
						this._disableDateTimeControls();
					} else {
						this._setTimeRangeValues(this.options.layerTimeProperties.timeRange);
					}*/
				}
			},

			_preventVerticalResize : function(){

				$(this.element).siblings("div[class^='k-resize-handle k-resize-']").remove();
				$(this.element).after("<div class='k-resize-handle k-resize-e'></div");
				$(this.element).after("<div class='k-resize-handle k-resize-w'></div");
			},

			_setTimeRangeValues : function(timeRangeValues){
				//this.options.preTimeRange.data("kendoDropDownList").value(timeRangeValues[0].time);
				var startDate = new Date();
				var endDate = new Date();
				if(timeRangeValues && timeRangeValues.length > 0 && timeRangeValues[0].timeUnit) {
					//this._disableDateTimeControls();
					if(timeRangeValues[0].future) {
						if(timeRangeValues[0].time >= 86400) {
							startDate.setSeconds(86400);
							startDate.setHours(0);
							startDate.setMinutes(0);
							startDate.setSeconds(0);

							endDate.setSeconds(timeRangeValues[0].time);
							endDate.setHours(23);
							endDate.setMinutes(59);
							endDate.setSeconds(59);
						} else {
							endDate.setSeconds(timeRangeValues[0].time + endDate.getSeconds());
						}
					} else {
						if(timeRangeValues[0].time >= 86400 && timeRangeValues[0].label == this.defaultDay) {
							startDate.setSeconds(-timeRangeValues[0].time);
							startDate.setHours(0);
							startDate.setMinutes(0);
							startDate.setSeconds(0);

							endDate.setSeconds(-86400);
							endDate.setHours(23);
							endDate.setMinutes(59);
							endDate.setSeconds(59);
						} else {
							startDate.setSeconds(-timeRangeValues[0].time + startDate.getSeconds());
						}
					}
					this.options.startTimePicker.data("kendoDateTimePicker").value(startDate);
					this.options.endTimePicker.data("kendoDateTimePicker").value(endDate);
				} else {
					this._enableDateTimeControls();
					//if(!this.options.inputDateTimeFormat.hours) {
							//startDate.setHours(0);
							//endDate.setHours(23);
					//}
					//if(!this.options.inputDateTimeFormat.minutes) {
						//startDate.setMinutes(0);
						//endDate.setMinutes(59);
					//}
					//if(!this.options.inputDateTimeFormat.seconds) {
						//startDate.setSeconds(0);
						//endDate.setSeconds(59);
					//}
					this.options.startTimePicker.data("kendoDateTimePicker").value(new Date());
					this.options.endTimePicker.data("kendoDateTimePicker").value(new Date());
				}
			},

			//Add timeRange combo
			_addTimeRangeContent : function(){
				var $this = this;
				var timeRangeValues = this.options.layerTimeProperties.timeRange;
				this.options.filterContainer.append(this.COMBO_BOX_TEMPLATE({label:$si.i18N.TimeFilter.regionalData.range, comboId:"preTimeRange",comboClass:"preTimeRange"}));
				this.options.preTimeRange = this.options.filterContainer.find("#preTimeRange");
				this.options.preTimeRange.siDropDownList({
					shimRequired: true,
					dataTextField: "label",
					dataValueField: "time",
					dataSource : timeRangeValues,
					change : function(event){
								var that = this;
								var result = $.grep(timeRangeValues, function(e){ return (e.time == that.value()) && (e.label == that.text()); });
								$this._setContentToDateTimePickers(result);
							 },
				});

			},

			_checkDateTimeFormat : function(dateTimeFormat) {
				this.options.inputDateTimeFormat = {};
				var arr = dateTimeFormat.split(' ');
				var hours = false;
				var minutes = false;
				var seconds = false;
				if(arr.length >= 2) {
				    var timeArr = arr[1].split(':');
				    if(($.inArray('hh', timeArr) !== -1) || ($.inArray('h', timeArr) !== -1) || ($.inArray('HH', timeArr) !== -1) || ($.inArray('H', timeArr) !== -1))
				        hours = true;
				    if(hours == true && (($.inArray('mm', timeArr) !== -1) || ($.inArray('m', timeArr) !== -1)))
				        minutes = true;
				    if(minutes == true && (($.inArray('ss', timeArr) !== -1) || ($.inArray('s', timeArr)!== -1)))
				        seconds = true;
				}
				this.options.inputDateTimeFormat.hours = hours;
				this.options.inputDateTimeFormat.minutes = minutes;
				this.options.inputDateTimeFormat.seconds = seconds;
			},

			_addTimeIntervalContent : function() {
				var aggregateTypes = this.options.layerTimeProperties.aggregateTypes;
				var aggregateByValues = this.options.layerTimeProperties.aggregateByValues;
				this.options.filterContainer.append(this.TIME_INTERVAL_TEMPLATE({
						showLabel:$si.i18N.TimeFilter.regionalData.show,
						showId:"showAggregation",
						showClass:"showAggregation",
						byLabel:$si.i18N.TimeFilter.regionalData.by,
						byId:"timeInterval",
						byClass:"timeInterval"
				}));
				this.options.showAggrList = this.options.filterContainer.find("#showAggregation");
				this.options.showAggrList.siDropDownList({
					shimRequired : true,
					dataSource : aggregateTypes,
				});

				this.options.timeIntervalList = this.options.filterContainer.find("#timeInterval");
				this.options.timeIntervalList.siDropDownList({
					shimRequired : true,
					dataSource : aggregateByValues,
				});
			},

			_addFilterAppliedToBox : function(){
				var $this = this;

				$(this.element).append(this.FILTER_APPLIED_TO_TEMPLATE({timeFilterId:this.options.id}));

				this.options.appliedFilterBox = $(this.element).find(".filter-affected-drop-down");
				this.options.appliedFilterBox.siDropDownList({

											dataSource : this.options.dashboards,
										    select : function(e){
										    	if(event && event.target && $(event.target).hasClass("filter-dashboard-checkbox")){
										    		//on check Box check
										    		$this._changeAppliedToText(e.item.text(),event.target.checked);
										    	}
			    		            	 		e.preventDefault();
			    		             		},
										    template : function(data){
										    	return $this.DASHBOARD_TEMPLATE({
										    								id 				: data.id,
										    								checked			: data.id == 'mapView' ? 'checked' : '',
										    								dashboardTitle	: data.title ? data.title : data.id,
										    								dashboardIcon 	: data.iconUrl,
										    						});
										    },
										});
				this.options.appliedFilterBox.data("kendoDropDownList").text($si.i18N.TimeFilter.regionalData.filtersAppliedTo);

				if(this.options.dashboards && this.options.dashboards.length > 0) {
					var mapViewExist = $.grep(this.options.dashboards, function(e){ return e.id == "mapView"; });
					if(mapViewExist && mapViewExist.length > 0) {
						this._changeAppliedToText("Map View",true);
					}
				}
			},


			_changeAppliedToText : function(text,isChecked){
	    		if(text){
	    			text = text.trim() + ", ";
	    		}
	    		var span = $(this.element).find("span.filter-affected-text");
	    		var spanText = span.text();
	    		if(isChecked){
	    			spanText += text;
	    		}else{
	    			spanText = spanText.replace(text,"");
	    		}
	    		span.text(spanText);
			},

			_addControlButtons : function(){
				var $this = this;
				var timeFilterId = this.options.id ;

				if(this.options.dashboards && this.options.dashboards.length > 0){
					this._addFilterAppliedToBox();
				}

				$(this.element).append(this.CONTROL_BUTTONS_TEMPLATE({
												timeFilterId:timeFilterId,
												controlButtons:$si.i18N.TimeFilter.regionalData.tooltip.controlButtons,
										}));

				var controlBox =$(this.element).find( "#" + timeFilterId + "_controlButtons");

				controlBox.find("#" + timeFilterId + "_apply").bind("click",function(event){

					$this._applyTimeFilter(event);
				});

				controlBox.find("#" + timeFilterId + "_close").bind("click",function(event){
					$this._applyTimeFilter(event);
					//this method is in parent class.
					$this.closeWindow(event);
				});

				this.options.ConfirmDialogButtonClickedFn = this.OnConfirmDialogButtonClicked.bind(this);

				controlBox.find("#" + timeFilterId + "_clear").bind("click",function(event){
					//use some third party component for confirmation box
					var windowAttributes = $.extend({},$this.getWindowStyles().windowAttributes);
					windowAttributes.modal = true;
					$si.DialogBox.confirm($this.options.title,$si.i18N.Global.filterResetConfirmMessage,"",$this.options.id,windowAttributes);
					$('#' + $this.options.id + '_dialog').bind("confirmdialogbuttonclicked",$this.options.ConfirmDialogButtonClickedFn);
					/*var result =confirm("Do you want to reset the filter conditions to default?");
					if (result){
						$this.clearTimeFilter(event);
					}*/
				});


			},

			getCheckedWindows : function(){
				var checkedWindowListIds= [];
				var windowId;
				if(this.options.appliedFilterBox){

					var windowList = this.options.appliedFilterBox.data("kendoDropDownList").list;
					$(windowList).find("input:checkbox:checked").each(function(index,window){
						windowId = $(window).closest(".filter-dashboard").attr("id");
						if(windowId){
							windowId = windowId.replace("_filter_dashboard","");
						}
						checkedWindowListIds.push(windowId);
					});

				}
				return checkedWindowListIds;
			},

			_applyTimeFilter : function(event) {
				var windowIds;
				if(this.checkDates()==true)
				{
				var filterCriteria = this._toJson(this.getFilterCriteria());
					if(this.options.appliedFilterBox){
					 windowIds = this.getCheckedWindows();
				 	}
				}
				if( windowIds && windowIds.length>0 ){
					this.setCriteria(filterCriteria,windowIds,null);
			    	this._enableTimeControlIcon();
			    	} else if(!this.options.appliedFilterBox) {
			    	this.setCriteria(filterCriteria,windowIds,null);
			    	this._enableTimeControlIcon();
				}
			},
			checkDates : function(){
		        var flag=true;
			    var starttime = this.options.startTimePicker.data("kendoDateTimePicker");
			    var endtime = this.options.endTimePicker.data("kendoDateTimePicker");
                if(starttime.value()!= '' && endtime.value() != '') {
                    if(starttime.value()== null ||endtime.value() ==null) {
                    	alert('Entered  value should be a format');
                        flag=false;
                    }

                    if(Date.parse(starttime.value()) > Date.parse(endtime.value())) {
	                    alert('End date should be after start date');
	                    flag=false;
                    }
               } else {
                   alert('Should be enter input values');
                   flag=false;
               }
               return flag;
            },

            _enableTimeControlIcon : function() {
             if (this.options.fromWindow==true)
             {
             $("#timecontrolTool").addClass("time-icon-applied");
             }
             if (this.options.fromGlobal==true)
             {
             $("#si-viewer-app-toolbar").children(".left-toolbar").find("#timeTool").removeClass("time-icon");
             $("#si-viewer-app-toolbar").children(".left-toolbar").find("#timeTool").addClass("time-icon-applied");
             }
            },

			setCriteria : function(filterCriteria,windowIds,clearflag){
				var params = {
						timeFilterCriteria	: filterCriteria,
						windowIds 		: windowIds,
						clearflag		:clearflag,
						businessViewId	: this.options.businessViewId,
						businessViewName: this.options.businessViewName,
					};
				this._trigger("onSetCriteria",null,params);
			},

			_toJson : function(filterCriteria){
				return JSON.stringify(filterCriteria);
			},

			getFilterCriteria : function(parentBoxId){
				var datefield = this.options.layerTimeProperties.dateField;
				var compositeRule = new TimeCompositeRule('TimeRange',datefield,null);
				var starttime = this.options.startTimePicker.data("kendoDateTimePicker");
				var endtime = this.options.endTimePicker.data("kendoDateTimePicker");
				var range = this.options.preTimeRange.data("kendoDropDownList").value();

				var timeRule= new SubTimeRule(starttime.dateView._value,endtime.dateView._value);
				compositeRule.value=timeRule;
				compositeRule.range=range;

				if(this.options.showAggrList) {
					compositeRule.showAggrValue = this.options.showAggrList.data("kendoDropDownList").text();
				}

				if(this.options.timeIntervalList) {
					compositeRule.timeIntervalValue = this.options.timeIntervalList.data("kendoDropDownList").text();
				}

				return compositeRule;
			},

			getWindowContentFavoriteSettings : function() {
				return this.getFilterCriteria();
			},

			applyWindowContentFavoriteSettings  : function(favorite) {
				if(favorite){
					this.resetTimeFilter();
					var startDate = new Date(favorite.value.lowValue);
					var endDate = new Date(favorite.value.highValue);
					this.options.startTimePicker.data('kendoDateTimePicker').value(startDate);
					this.options.endTimePicker.data('kendoDateTimePicker').value(endDate);
					this.options.preTimeRange.data("kendoDropDownList").value(favorite.range);
					if(!favorite.range) {
						this._enableDateTimeControls();
					}
					if(this.options.showAggrList && favorite.showAggrValue) {
						this.options.showAggrList.data("kendoDropDownList").value(favorite.showAggrValue);
					}
					if(this.options.timeIntervalList && favorite.timeIntervalValue) {
						this.options.timeIntervalList.data("kendoDropDownList").value(favorite.timeIntervalValue);
					}
				}
			},

			clearTimeFilter : function(event) {
				this.resetTimeFilter();
				this.setCriteria(null,null,'true');
				this._disableTimeControlIcon();
				/*this._createSuccessNotification($si.i18N.BusinessViewWindowErrors._clearTimerNotification);
				$("#noty_topCenter_layout_container").removeClass("layer-error-notification");
	            $("#noty_topCenter_layout_container").addClass("green-notification");
	            $("#4982-notification-icon").css("display","none");*/
	        },

           _disableTimeControlIcon : function() {
             if (this.options.fromWindow==true)
             {
             $("#timecontrolTool").removeClass("time-icon-applied");
             }
             if (this.options.fromGlobal==true)
             {
             $("#si-viewer-app-toolbar").children(".left-toolbar").find("#timeTool").removeClass("time-icon-applied");
             $("#si-viewer-app-toolbar").children(".left-toolbar").find("#timeTool").addClass("time-icon");
             }
            },
			//resetting all the values
			resetTimeFilter : function(){
				// setting time range dropdown value to the first one
				//this.options.preTimeRange.data("kendoDropDownList").select(0);
				this._setContentToDateTimePickers();
				if(this.options.layerTimeProperties.showTimeIntervals) {
					this.options.filterContainer.find("#showAggregation").data("kendoDropDownList").select(0);
					this.options.filterContainer.find("#timeInterval").data("kendoDropDownList").select(0);
				}
			},

			// called when clearing favorite
			reset: function () {
				this._super();
				//display at center
				$(this.element).data("kendoWindow").center();
				this.resetTimeFilter();
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
				var fieldCBXs = this.options.filterContainer.find(".df-field span.k-combobox");
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

			OnConfirmDialogButtonClicked: function(e,showDialog){
					var $this = this;
						if(showDialog){
							$this.clearTimeFilter(event);
						}
				}
	});

});