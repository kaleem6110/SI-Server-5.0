/**
 * Provide ui components like input box,radio button etc
 */
define([
    'jquery',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'dataFilter/com.spacetimeinsight.viewer.operator',
    'dataFilter/com.spacetimeinsight.viewer.ui.criteria',
    'siComboBox',
    'siDatePicker',
],function($){
	
	$.extend($.spacetimeinsight.siViewerCriteria.prototype, {
		
			INPUT_BOX :  kendo.template("<input type='text' id='#=cssClass#' class='df-component #=cssClass#'/>"),
			LIST_BOX : kendo.template("<div id='#=cssClass#' class='df-component #=cssClass#'></div>"),
			MULTI_SELECT_DROP_DOWN : kendo.template("<select id='#=cssClass#'  multiple='multiple' class='df-component #=cssClass#' data-placeholder='Select multiple values.....'></select>"),
			//Check for label for and get radio button value scenario
			RADIO_BUTTON : kendo.template("<input type='radio' id='#= groupName #' name='#= groupName #' value='#= value#' class='df-component #=cssClass#'><label for='#= value #'>#= displayName #</label>"),
			CHECK_BOX : kendo.template("<input type='checkbox' id='#= groupName #' name='#= groupName #' value='#= value#' class='df-component #=cssClass#'><label for='#= value #'> #= displayName #</label>"),
			RANGE_SLIDER: kendo.template("<div id='#=cssClass#' class='df-component #=cssClass#' style='width:130px'><input style='width:130px'/><input style='width:130px'/></div>"),

			
			TO_SPAN : kendo.template("<span class='df-to'> to </span>"),

			//Data Role Mapping use to destroy the kendo component
			DATA_ROLE :{autocomplete:"kendoAutoComplete",listview:"kendoListView",combobox:"kendoComboBox",multiselect:"kendoMultiSelect",
						numerictextbox:"kendoNumericTextBox",slider:"kendoSlider",datepicker:"kendoDatePicker",datetimepicker:"kendoDateTimePicker",
						timepicker:"kendoTimePicker",rangeslider:"kendoRangeSlider"},

			DISPLAY_TYPES :{AUTOCOMPLETE:"AutoComplete",TEXTBOX:"Text",MULTI_SELECT_DROP_DOWN:"MultiSelect",
						MULTI_SELECT_LISTBOX:"multiSelectListBox",LISTBOX:"List",COMBOBOX:"Combo",
						NUMERIC_TEXTBOX:"numericTextBox",NUMERIC_SLIDER:"Slider",DATE_PICKER:"Date",TIME:"Time",
						DATE_TIME_PICKER:"dateTimePicker",RADIO_BUTTON:"RadioButton",CHECK_BOX:"CheckBox"},
						
			DATE_FORMAT : "YYYY-MM-DDTHH:mm:ss.SSSZ",
			TIME_FORMAT : "HH:mm:ss",


			_addAutoCompleteBox : function(component,options){
				if(options && options.values){
					options = options.values.split(",");
				}
				component.kendoAutoComplete({
				      dataSource : options,
				      filter: "contains",
				      placeholder : "Enter the text....",
				    });
			},

			_addTextBox : function(component,options){
				component.kendoAutoComplete({
					placeholder : "Enter the text....",
				});
			},

			_addMultiSelectDropDownBox : function(component,options,selectedOperator){
				var maxSelectedItems = null;
				switch(selectedOperator){
					case $si.Operators.equalTo.value:
					case $si.Operators.notEqualTo.value:
						maxSelectedItems = 1;
					break;
				}
				
				if(options && options.values){
					options = options.values.split(",");
				}
				component.kendoMultiSelect({
				    dataSource 		 : options,
				    filter			 : "contains",
				    maxSelectedItems : maxSelectedItems,
				});
			},

			_addMultiSelectListBox : function(component,options,selectedOperator){
				var selectable = "multiple";
				switch(selectedOperator){
					case $si.Operators.equalTo.value:
					case $si.Operators.notEqualTo.value:
						selectable = "single";
					break;
				}
				
				if(options && options.values){
					options = options.values.split(",");
				}
				component.kendoListView({
				    dataSource : options,
				    selectable: selectable,
				    template: "<div>#:displayName#</div>"
				});
			},

			_addListBox : function(component,options,selectedOperator){
				var selectable = "multiple";
				switch(selectedOperator){
					case $si.Operators.equalTo.value:
					case $si.Operators.notEqualTo.value:
						selectable = "single";
					break;
				}
				
				if(options && options.values){
					options = options.values.split(",");
				}
				component.kendoListView({
				    dataSource : options,
				    selectable: selectable,
				    template: function(data){
				    	return "<div>" + data + "</div>";
				    },
				});
			},

			_addComboBox : function(component,options){
				if(options && options.values){
					options = options.values.split(",");
				}
				component.siComboBox({
					  dataSource   : options,
					  shimRequired : true,
					});
			},

			_addNumericTextBox : function(component,options){
				component.kendoNumericTextBox({
					 placeholder: "Enter numeric value b/w 0 to 100",
					 min : options.min,
					 max : options.max,
					 step : options.step ? options.step : 1,
					 format: options.format ? options.format : "#" ,
				});
			},

			_addNumericSlider : function(valueContainer,cssClass,options,selectedOperator){
				var sliderType;
				switch(selectedOperator){
					case $si.Operators.between.value:
					case $si.Operators.betweenIncluding.value:
					case $si.Operators.notBetween.value:
					case $si.Operators.notBetweenIncluding.value:
						sliderType = "kendoRangeSlider";
						valueContainer.append(this.RANGE_SLIDER({cssClass:cssClass}));
					break;
					default :
						sliderType = "kendoSlider";
						valueContainer.append(this.INPUT_BOX({cssClass:cssClass}));
					break;
				}
				
				var component = valueContainer.find("."+cssClass);  
				if(component && component.length > 0){
					var max = parseInt(options.max);
					var min = parseInt(options.min);
					component[sliderType]({
		                increaseButtonTitle: "Right",
		                decreaseButtonTitle: "Left",
		                min: min,
		                max: max,
		                smallStep: options.interval ? parseInt(options.interval) : (max - min)/10,
		                largeStep: options.interval ? parseInt(options.interval) : (max - min)/20,
		            });
				}
			},

			_addDatePicker : function(component,options){
				component.siDatePicker({
					format : options && options.format ? options.format : "MM/dd/yyyy",
					shimRequired : true,
				});
			},
			
			_addTimePicker: function(component,options){
				
				component.kendoTimePicker({
					format : options && options.format ? options.format : this.TIME_FORMAT,
				});
			},
			_addDateTimePicker : function(component,options){
				component.kendoDateTimePicker({
					format : options.format ? options.format : "yyyy/MM/dd hh:mm:ss tt",
				});
			},


//get Component values
			getAutoCompleteBoxValue : function(component){
				var value = component.data("kendoAutoComplete").value();
				var options = component.data("kendoAutoComplete").dataSource.data();
				var dataItem = value;
				if(options){
					$(options).each(function(index,item){
						if(item.displayName == value){
							dataItem = item;
							return false;  // break the loop
						}
					});
				}
				return dataItem;
			},

			getTextBoxValue : function(component){
				return {value :component.data("kendoAutoComplete").value()};
			},

			getMultiSelectDropDownBoxValue : function(component){
				var dataItems = component.data("kendoMultiSelect").dataItems();
				var data ="";
				if(dataItems){
					$.each(dataItems,function(index,value){
						data += "," + value; 
					});
					data = data.substring(1,data.length);
				}
				return data;
			},

			getListBoxValue : function(component){
				var dataItem = [];
				var list = component.data("kendoListView");
				$(list.select()).each(function(index,item){
					dataItem.push(list.dataSource.at($(item).index()));
				});
				if(!dataItem){
					dataItem = component.data("kendoListView").text();
				}
				return dataItem;
			},

			getComboBoxValue : function(component){
				var dataItem = component.data("kendoComboBox").dataItem();
				if(!dataItem){
					dataItem = component.data("kendoComboBox").text()
				}
				return dataItem;
			},

			getNumericTextBoxValue : function(component){
				return {value : component.data("kendoNumericTextBox").value()};
			},

			getNumericSliderValue : function(component){
				var returnValue;
				if(component.data("kendoSlider")){
					returnValue = component.data("kendoSlider").value();
				}else if(component.data("kendoRangeSlider")){
					returnValue = component.data("kendoRangeSlider").value();
				}
				return returnValue;
			},

			getDatePickerValue : function(component){
				var dataItem ={};
				var datePicker = component.data("kendoDatePicker");
				dataItem["value"] =	moment(datePicker.value()).format(this.DATE_FORMAT);
				dataItem["format"] = datePicker.options.format;
				return dataItem;
			},

			getDateTimePickerValue : function(component){
				var dataItem ={};
				var dateTimePicker = component.data("kendoDateTimePicker");
				dataItem["value"] =	moment(dateTimePicker.value()).format(this.DATE_FORMAT);
				dataItem["format"] = dateTimePicker.options.format;
				return dataItem;
			},
			
			getTimePickervalue : function(component){
				var dataItem ={};
				var timePicker = component.data("kendoTimePicker");
				dataItem["value"] =	moment(timePicker.value()).format(this.TIME_FORMAT);
				dataItem["format"] = timePicker.options.format;
				return dataItem;
			},
			
			
			_getValueComponents : function(criteriaRow,selectedField,selectedOperator){
				var value;
				if(criteriaRow && criteriaRow.length > 0 && selectedField && selectedOperator){
					switch(selectedOperator){
						case $si.Operators.between.value:
						case $si.Operators.betweenIncluding.value:
						case $si.Operators.notBetween.value:
						case $si.Operators.notBetweenIncluding.value:
							if(selectedField.displayType == this.DISPLAY_TYPES.NUMERIC_SLIDER){
								value = this._getValue(this.getDataItem(criteriaRow.find("#df-value.df-value"),selectedField.displayType));
							}else{
								value = {};
								value.lowValue = this._getValue(this.getDataItem(criteriaRow.find("#df-value-from.df-value-from"),selectedField.displayType));
								value.highValue = this._getValue(this.getDataItem(criteriaRow.find("#df-value-to.df-value-to"),selectedField.displayType));
							}
						break;
						default:
							value = this._getValue(this.getDataItem(criteriaRow.find("#df-value.df-value"),selectedField.displayType));
						break;
					}
					
					if(value instanceof Array && (selectedOperator == $si.Operators.equalTo.value || selectedOperator == $si.Operators.notEqualTo.value )){
						value = value[0];
					}
				}
				return value;
			},
			
			_getValue : function(dataValue) {
				if(dataValue instanceof Array) {
					var dataValues = [];

					$.each(dataValue, function( index, data ) {
						if(data.value){
							dataValues.push(data.value);
						} else {
							dataValues.push(data);
						}
					});
					return dataValues;
				} else if(dataValue instanceof Object) {
					return dataValue.value;
				} else {
					return dataValue;
				}
			},
			
			_createValueComponents : function(criteriaRow,selectedField,selectedOperator){
				if(criteriaRow && criteriaRow.length > 0 && selectedField && selectedOperator){
					switch(selectedOperator){
						case $si.Operators.between.value:
						case $si.Operators.betweenIncluding.value:
						case $si.Operators.notBetween.value:
						case $si.Operators.notBetweenIncluding.value:
							if(selectedField.displayType == this.DISPLAY_TYPES.NUMERIC_SLIDER){
								/** special case :- In case of numeric slider and b/w operator component become range slider **/
								this._addComponent(criteriaRow,"df-value",selectedField,selectedOperator);
							}else{
								this._addComponent(criteriaRow,"df-value-from",selectedField,selectedOperator);
								criteriaRow.find(".df-value-container").append(this.TO_SPAN({}));
								this._addComponent(criteriaRow,"df-value-to",selectedField,selectedOperator);
							}
						break;
						case $si.Operators.isNull.value:
						case $si.Operators.notNull.value:
						break;
						default:
							this._addComponent(criteriaRow,"df-value",selectedField,selectedOperator);
						break;
					}
				}
			},
			
			//this method is called using value div
			_addComponent : function(criteriaRow,cssClass,selectedField,selectedOperator){
				if(selectedField){
					var options;
					if(selectedField.options){
						options = selectedField.options;
					}else{
						options = this.options.filterOptions[selectedField.fieldName];
					}
					var valueContainer = criteriaRow.find(".df-value-container");
					switch(selectedField.displayType){
						case this.DISPLAY_TYPES.AUTOCOMPLETE :
							valueContainer.append(this.INPUT_BOX({cssClass:cssClass}));
							this._addAutoCompleteBox(valueContainer.find("."+cssClass), options);
						break;
						case this.DISPLAY_TYPES.TEXTBOX :
							valueContainer.append(this.INPUT_BOX({cssClass:cssClass}));
							this._addTextBox(valueContainer.find("."+cssClass), options);
						break;
						case this.DISPLAY_TYPES.MULTI_SELECT_DROP_DOWN :
							valueContainer.append(this.MULTI_SELECT_DROP_DOWN({cssClass:cssClass}));
							this._addMultiSelectDropDownBox(valueContainer.find("."+cssClass), options,selectedOperator);
						break;
						case this.DISPLAY_TYPES.MULTI_SELECT_LISTBOX :
							valueContainer.append(this.LIST_BOX({cssClass:cssClass}));
							this._addMultiSelectListBox(valueContainer.find("."+cssClass), options,selectedOperator);
						break;
						case this.DISPLAY_TYPES.LISTBOX :
							valueContainer.append(this.LIST_BOX({cssClass:cssClass}));
							this._addListBox(valueContainer.find("."+cssClass), options,selectedOperator);
						break;
						case this.DISPLAY_TYPES.COMBOBOX :
							valueContainer.append(this.INPUT_BOX({cssClass:cssClass}));
							this._addComboBox(valueContainer.find("."+cssClass), options);
						break;
						case this.DISPLAY_TYPES.NUMERIC_TEXTBOX :
							valueContainer.append(this.INPUT_BOX({cssClass:cssClass}));
							this._addNumericTextBox(valueContainer.find("."+cssClass), options);
						break;
						case this.DISPLAY_TYPES.NUMERIC_SLIDER :
							this._addNumericSlider(valueContainer,cssClass, options,selectedOperator);
						break;
						case this.DISPLAY_TYPES.DATE_PICKER :
							valueContainer.append(this.INPUT_BOX({cssClass:cssClass}));
							this._addDatePicker(valueContainer.find("."+cssClass), options);
						break;
						case this.DISPLAY_TYPES.DATE_TIME_PICKER :
							valueContainer.append(this.INPUT_BOX({cssClass:cssClass}));
							this._addDateTimePicker(valueContainer.find("."+cssClass), options);
						break;
						case this.DISPLAY_TYPES.RADIO_BUTTON :
							$(options).each(function(index, button){
								valueContainer.append(this.RADIO_BUTTON({groupName:"needGroupName",
														displayName:button.displayName,value:button.value,cssClass:cssClass}));
								//valueContainer.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
							});
						break;
						case this.DISPLAY_TYPES.CHECK_BOX :
							valueContainer.append(this.CHECK_BOX({groupName:selectedField.fieldName,
														displayName:selectedField.options.checked,value:true, unselectedValue:false,cssClass:cssClass}));
														
						break;					
						case this.DISPLAY_TYPES.TIME:
							valueContainer.append(this.INPUT_BOX({cssClass:cssClass}));
							this._addTimePicker(valueContainer.find("."+cssClass), options);
						break;
					}
				}
			},


			//clear value container
			_destroyValueComponents : function(criteriaRow){		
				if(criteriaRow){
					var $this = this;
					var valueContainer = criteriaRow.find(".df-value-container");
					var components = valueContainer.find('.df-component');
					components.each(function(){
						if($(this).attr("data-role")){
							//destroy kendo component
							$(this).data($this.DATA_ROLE[$(this).attr("data-role")]).destroy();
						}
					});
					valueContainer.empty();
				}
			},

			getDataItem : function(component,displayType){
				var dataItem = null;
				//validation check : method is called by filter component
				if($(component).hasClass("df-component")){
		
					switch(displayType){
						case this.DISPLAY_TYPES.AUTOCOMPLETE :
							dataItem = this.getAutoCompleteBoxValue(component);
						break;
		
						case this.DISPLAY_TYPES.TEXTBOX :
							dataItem = this.getTextBoxValue(component);
						break;
		
						case this.DISPLAY_TYPES.MULTI_SELECT_DROP_DOWN :
							dataItem = this.getMultiSelectDropDownBoxValue(component);
						break;
		
						case this.DISPLAY_TYPES.MULTI_SELECT_LISTBOX :
						case this.DISPLAY_TYPES.LISTBOX :
							dataItem = this.getListBoxValue(component);
						break;
		
						case this.DISPLAY_TYPES.COMBOBOX :
							dataItem = this.getComboBoxValue(component);
						break;
		
						case this.DISPLAY_TYPES.NUMERIC_TEXTBOX :
							dataItem = this.getNumericTextBoxValue(component);
						break;
		
						case this.DISPLAY_TYPES.NUMERIC_SLIDER :
							dataItem = this.getNumericSliderValue(component);
						break;
		
						case this.DISPLAY_TYPES.DATE_PICKER :
							dataItem = this.getDatePickerValue(component);
						break;
						case this.DISPLAY_TYPES.DATE_TIME_PICKER :
							dataItem = this.getDateTimePickerValue(component);
						break;
						case this.DISPLAY_TYPES.RADIO_BUTTON :
							dataItem = {value : $("input[name=" + id + "]:checked").val()};
						break;
						case this.DISPLAY_TYPES.TIME:
							dataItem = this.getTimePickervalue(component);
							break;
					}
				}
				return dataItem;
			},
			
			_setValueComponents : function(criteriaRow,selectedField,selectedOperator,value){
				if(selectedField && selectedOperator){
					switch(selectedOperator){
						case $si.Operators.between.value:
						case $si.Operators.betweenIncluding.value:
						case $si.Operators.notBetween.value:
						case $si.Operators.notBetweenIncluding.value:
							if(selectedField.displayType == this.DISPLAY_TYPES.NUMERIC_SLIDER){
								this.setDataItem(criteriaRow.find("#df-value.df-value"),selectedField,value);
							}else{
								this.setDataItem(criteriaRow.find("#df-value-from.df-value-from"),selectedField,value);
								this.setDataItem(criteriaRow.find("#df-value-to.df-value-to"),selectedField,value);
							}
						break;
						default:
							this.setDataItem(criteriaRow.find("#df-value.df-value"),selectedField,value);
						break;
					}
				}else{
					this._createErrorNotification({
													message : "Filter Configuration is invalid",
												});
				}
				
			},
			
			/** methods for data filter favorite **/
			
			/** TODO :- List Box pending Date testing pending **/
			setDataItem : function(component,selectedField,dataItem){
				if($(component).hasClass("df-component") && dataItem){
		
					switch(selectedField.displayType){
						case this.DISPLAY_TYPES.AUTOCOMPLETE :
						case this.DISPLAY_TYPES.TEXTBOX :
							component.data("kendoAutoComplete").value(dataItem);
						break;
		
						case this.DISPLAY_TYPES.MULTI_SELECT_DROP_DOWN :
							if(typeof dataItem === "string"){
								dataItem = dataItem.split(",");
							}
							component.data("kendoMultiSelect").value(dataItem);
						break;
		
						case this.DISPLAY_TYPES.MULTI_SELECT_LISTBOX :
							this.setListBoxValue(component,dataItem);
						break;
						
						case this.DISPLAY_TYPES.LISTBOX :
						break;
		
						case this.DISPLAY_TYPES.COMBOBOX :
							component.data("kendoComboBox").value(dataItem);
						break;
		
						case this.DISPLAY_TYPES.NUMERIC_TEXTBOX :
							component.data("kendoNumericTextBox").value(dataItem);
						break;
		
						case this.DISPLAY_TYPES.NUMERIC_SLIDER :
							if(component.data("kendoSlider")){
								component.data("kendoSlider").value(dataItem);
							}else if(component.data("kendoRangeSlider")){
								if(dataItem){
									component.data("kendoRangeSlider").value([dataItem.lowValue,dataItem.highValue]);
								}
							}
						break;
		
						case this.DISPLAY_TYPES.DATE_PICKER :
							var date = new Date(moment(dataItem).format());
							component.data("kendoDatePicker").value(date);
						break;
						case this.DISPLAY_TYPES.DATE_TIME_PICKER :
							var date = new Date(moment(dataItem).format());
							component.data("kendoDateTimePicker").value(date);
						break;
					
						case this.DISPLAY_TYPES.TIME:
							component.data("kendoTimePicker").value(dataItem);
						break;
					}
				}
			},
			
	});
});