/**
 * Dependent Component :-  uiComponent,operators
 *
 *  Generate a Criteria row with
 *  1. Field combo Box
 *  2. Operator combo Box
 *  3. Value type
 *  4. close, add and Nested buttons
 */

define([
    'jquery',
    'siViewerNamespace',
    'jquery-ui',
    'kendo',
    'dataFilter/com.spacetimeinsight.viewer.operator',
    'dataFilter/com.spacetimeinsight.viewer.operators.regional',
    'siDropDownList',
],function($,$si){
	
	$.widget('spacetimeinsight.siViewerCriteria',{
			options :{
						data :[],
						checkbox : true,
						actions : ["CLOSE","ADD","LEVEL"],
						rowcount : 0,
						fieldNameCBXAdjustingWidth : 0,
				},

//private static variable
				pluginName:"siViewerCriteria",
				FIELD_NAME : "_fieldName",
				OPERATORS : "_operators",
				ADD : "_add",
				CLOSE : "_close",
				LEVEL : "_level",
				VALUE : "_value",
				VALUE_DIV : "_value_div",
				CHECKBOX : "_checkbox",
				//ERROR : "errorDiv",
				//OPERATORS : $.operators(),
				ROW_TEMPLATE : kendo.template("<div id='#= rowId #' class='criteriaRow'>" +
						"<span class='df-checkbox'><input id ='#= rowId #_checkbox' type='checkbox'/></span> " +
						"<span class='df-field'><input id ='#= rowId #_fieldName'/></span>" +
						"<span class='df-is'>is</span>" +
						"<span class='df-operator'></span>" +
						"<div id ='#= rowId #_value_div' class='df-value-container'></div> " +
						"<span class='df-controlbox'>" +
						"<input id ='#= rowId #_close' type='button' class='df-close' title='#= closeTooltip #'/>"+
						"<input id ='#= rowId #_add' type='button' disabled class='df-add' title='#= addTooltip #' />"+
						"<input id ='#= rowId #_level' type='button' disabled class='df-level' title='#= levelTooltip #'/>"+
						"</span></div>"),
						
				OPERATOR_TEMPLATE : kendo.template("<input id ='#= rowId #_operators'/>"),

//private methods
		_create : function(){
				//used in event handling. Each event is prefix by plugin name
				this.widgetEventPrefix = this.pluginName + "_";
				this.options.id = $(this.element).attr("id");
				$(this.element).addClass("sti-component-criteria");
				
				var $this = this;
				//Segregation of code
				requirejs(['dataFilter/com.spacetimeinsight.viewer.ui.criteriaComponents'],function(){
					$this.addRow();
					$this._trigger("onCriteriaCreationComplete",null,{});
				});
		},

		_onFieldNameSelect : function(event,item){
				var searchField = item.dataItem();
				var criteriaRow = $(item.element).closest(".criteriaRow");
				var operatorBox = criteriaRow.find(".df-operator input[data-role='dropdownlist']").data("kendoDropDownList");
				
				//get operators on the basis of data type
				var operators = $si.Operators.getOperators(searchField.dataType,searchField.displayType);
				switch(searchField.displayType){
					case this.DISPLAY_TYPES.COMBOBOX :
					case this.DISPLAY_TYPES.TEXTBOX :
					case this.DISPLAY_TYPES.AUTOCOMPLETE :
					case this.DISPLAY_TYPES.NUMERIC_TEXTBOX:
						if(searchField.dataType == $si.Operators.DATA_TYPES.STRING){
							operators = $si.Operators.getStringSingleValueOperators();
						}else {
							operators = $si.Operators.getNumericSingleValueOperators();
						}
					break;
					case this.DISPLAY_TYPES.LISTBOX :
					case this.DISPLAY_TYPES.MULTI_SELECT_DROP_DOWN :
						operators = $si.Operators.getMultiSelectOperators();
					break;	
					case this.DISPLAY_TYPES.CHECK_BOX :
						operators = $si.Operators.getBooleanOperators();
					break;	
					case this.DISPLAY_TYPES.RADIO_BUTTON:
						operators = $si.Operators.getBooleanOperators();
					break;						
					case this.DISPLAY_TYPES.NUMERIC_SLIDER :
						operators = $si.Operators.getSliderOperators();
					break;
				}
				
				this._addOperatorCBX(criteriaRow.attr("id"),operators);
				
				this._destroyValueComponents(criteriaRow);
				
		},

		_onOperatorSelect : function(event,item){
			var dataItem = item.dataItem();
			if(dataItem){
				var operator = dataItem.value;
				var criteriaRow = $(item.element).closest(".criteriaRow");
				var selectedField = criteriaRow.find(".df-field input[data-role='dropdownlist']").data("kendoDropDownList").dataItem();

				//Clear the content div.
				this._destroyValueComponents(criteriaRow);
				
				this._createValueComponents(criteriaRow,selectedField,operator);

				this.disableAddButton(criteriaRow, false);
				this.disableNestButton(criteriaRow, false);
				
				/** one first time attribute selection mark corresponding row checkbox true **/
				if(item && item._oldIndex == -1){
					criteriaRow.find(".df-checkbox input[type='checkbox']").prop("checked",true);
					this._trigger("onRowChecked",null,{checked : true});
				}
			}
		},

		_addFieldNameCBX : function(fieldBox,data){
			var $this = this;
			fieldBox = $(fieldBox);
			fieldBox.siDropDownList({
			  dataSource: data,
			  dataTextField: "displayName",
			  dataValueField: "fieldName",
			  shimRequired	: true,
			  index			: -1,
			});

			fieldBox.data("kendoDropDownList").bind("cascade", function(event){
					$this._onFieldNameSelect(event,this);
				});
		},

		_addOperatorCBX : function(rowId,data){
			if(rowId){
				var currentRow = $(this.element).find("#" + rowId +".criteriaRow");
				var operatorBox = currentRow.find(".df-operator input");
				if(operatorBox && operatorBox.length > 0){
					/** check if there is any other way to Deselect the item in drop down **/
					operatorBox.data("kendoDropDownList").destroy();
					operatorBox.parents(".df-operator").empty();
				}
				
				currentRow.find(".df-operator").append(this.OPERATOR_TEMPLATE({
															rowId : rowId,
													}));
				operatorBox = currentRow.find(".df-operator input");
				
				var $this = this;
				operatorBox.siDropDownList({
					  dataSource: data,
					  dataTextField: "displayName",
					  dataValueField: "name",
					  shimRequired	: true,
					  index			: -1,
					  height		: "auto",
					});

				operatorBox.data("kendoDropDownList").bind("cascade", function(event){
					$this._onOperatorSelect(event,this);
				});
			}
		},

		_onClose : function(event){
			var criteriaRow = $(event.target).closest(".criteriaRow");
			this.deleteRow(criteriaRow);
		},

		_onAdd : function(event){
			var criteriaRow = $(event.target).closest(".criteriaRow");
			this.addRow(criteriaRow);
		},

		_onLevel : function(event){
//			var rowId = $(event.target).closest(".criteriaRow").attr("id");
//			$("#" + rowId + this.ADD).prop("disabled",true);
//			$("#" + rowId + this.LEVEL).prop("disabled",true);
		},

//public methods
		addRow : function(criteriaRow,data){
			if(!data){
				data = this.options.data;
			}
			var $this = this;  
			var parentDiv = $(this.element);
			var rowId = parentDiv.attr("id") +"_row" + this.options.rowcount++ ;

			var row = this.ROW_TEMPLATE({ rowId: rowId,levelTooltip: $si.i18N.DataFilter.regionalData.tooltip.actionButtons.level,addTooltip: $si.i18N.DataFilter.regionalData.tooltip.actionButtons.add,closeTooltip: $si.i18N.DataFilter.regionalData.tooltip.actionButtons.close});
			
			if(criteriaRow){
				criteriaRow.after(row);
			}else{
				parentDiv.append(row);
			}
					
			var currentRow = $(this.element).find("#" + rowId +".criteriaRow");
			currentRow.focus();
			var fieldBox = currentRow.find(".df-field input");
			
			//Adjusting the field name combo box width. This approach is working upto 3 level nest.
			var adjustedWidth = fieldBox.width() - this.options.fieldNameCBXAdjustingWidth;
			currentRow.css({paddingLeft:(this.options.fieldNameCBXAdjustingWidth + 15) +"px"});
			
			if(adjustedWidth <= 0 && criteriaRow){
				adjustedWidth = criteriaRow.find(".df-field span.k-dropdown").width() - 56;
			}
			
			fieldBox.css({width: (adjustedWidth + 56) + "px"});
			this._addFieldNameCBX(fieldBox, data);
			fieldBox.prev("span.k-dropdown-wrap.k-state-default").css("width",(adjustedWidth + 31) + "px");

			currentRow.find(".df-close").bind("click",function(event){
				$this._onClose(event);
				$this._trigger("onCloseButtonClick",null,{id:$(event.target).attr("id"),domElement:this,criteriaId:$this.options.id});
			});

			currentRow.find(".df-add").bind("click",function(event){
				$this._onAdd(event);
				$this._trigger("onAddButtonClick",null,{id:$(event.target).attr("id"),domElement:this,criteriaId:$this.options.id});
			});

			currentRow.find(".df-level").bind("click",function(event,criterias){
				$this._onLevel(event);

				$this._trigger("onLevelButtonClick",null,{id:$(event.target).attr("id"),domElement:this,criteriaId:$this.options.id,criterias : criterias});
			});
			
			currentRow.find(".df-checkbox input[type='checkbox']").bind("click",function(event,criterias){
				$this._trigger("onRowChecked",null,{checked : this.checked});
			});

			this._trigger("onRowAdded",null,{
										criteriaId : this.options.id,
										filterRowId : rowId,
										domElement : parentDiv.children("#"+rowId),
										});
		},

		deleteRow : function(criteriaRow){
			criteriaRow = $(criteriaRow); 
			var fieldDropDown = criteriaRow.find(".df-field input[data-role='dropdownlist']").data("kendoDropDownList");
			if(fieldDropDown){
				fieldDropDown.destroy();
			}
			var operatorDropDown = criteriaRow.find(".df-operator input[data-role='dropdownlist']").data("kendoDropDownList");
			if(operatorDropDown){
				operatorDropDown.destroy();
			}
			this._destroyValueComponents(criteriaRow);

			criteriaRow.remove();
		},

		destroy : function(){
			var $this = this;
			var rowId;
			$(this.element).children(".criteriaRow").each(function(index,row){
				$this.deleteRow(row);
			});
			$.Widget.prototype.destroy.call(this);

			this._trigger("onDestroy",null,{criteriaId:this.options.id});
		},

		disableCloseButton : function(buttonId,disabled){
			var button = $(this.element).find("#" + buttonId);
			if(disabled == button.attr("disabled")){
				return;
			}

			button.attr("disabled",disabled);
		},

		disableAddButton : function(criteriaRow,disabled){
			var button = criteriaRow.find(".df-add");
			if(disabled == button.attr("disabled")){
				return;
			}
			button.attr("disabled",disabled);
		},

		disableNestButton : function(criteriaRow,disabled){
			var button = criteriaRow.find(".df-level");
			if(disabled == button.attr("disabled")){
				return;
			}

			button.attr("disabled",disabled);
		},
		
		//if "getAllRows" is true then return all the rows else return only checked rows
		getFilterCriteria : function(getAllRows){
			var $this = this;
			var ruleId = this.options.id;
			var ruleList = [];

			var rowId;
			var criteriaRow;

			$(this.element).children(".criteriaRow").each(function(index,row){
				dataObject = {};
				rowId = $(row).attr("id");
				criteriaRow = $(row);

				var fieldChecked = criteriaRow.find("#" + rowId + $this.CHECKBOX).is(":checked");
				if(!getAllRows && !fieldChecked){
					//It will work as continue
					return;
				}
				var selectedField = criteriaRow.find("#" + rowId + $this.FIELD_NAME).data("kendoDropDownList").dataItem();
				var selectedOperator = criteriaRow.find("#" + rowId + $this.OPERATORS).data("kendoDropDownList").dataItem();

				if(selectedField && selectedOperator){
					var value = $this._getValueComponents(criteriaRow,selectedField,selectedOperator.value);
					ruleList.push($si.filterUtils.createCriterias(selectedField.fieldName,selectedOperator.value,value,selectedField.displayType,selectedField.dataType));
				}
			});
			return ruleList;
		},

		validate : function(){
			var $this = this;
			var validator = this.options.validator;
			validator.validate();
//			 if (validator.validate() === false) {
//			        $(validator.errors()).each(function() {
//			          $("#" + $this.ERROR).html(this);
//			        });
//			}
		},
		
		//TODO : range slider changes are pending
		
		/** Methods for apply favorite **/
		/** Data will be added in last created row **/
		populateLastRow : function(data){
			if(this.options.rowcount > 0){
				var rowId = this.getLastRowId();
				var criteriaRow = $(this.element).find("#" + rowId +".criteriaRow");
				
				/**populate checkbox **/
				var checkBox = criteriaRow.find("#" + rowId + "_checkbox");
				checkBox.prop('checked', true);
				
				/** populate fieldName **/
				var fieldBox = criteriaRow.find(".df-field input[data-role='dropdownlist']").data("kendoDropDownList")
				var list = fieldBox.dataSource.data();
				var selectedIndex = this._getIndexOf(list, "fieldName",data.fieldName);
				fieldBox.select(selectedIndex);
				
				/** populate Operator **/
				var operatorBox = criteriaRow.find(".df-operator input[data-role='dropdownlist']").data("kendoDropDownList");
				list = operatorBox.dataSource.data();
				selectedIndex = this._getIndexOf(list, "value",data.operator);
				if(selectedIndex > -1){
					operatorBox.select(selectedIndex);
					this._setValueComponents(criteriaRow,fieldBox.dataItem(),data.operator,data.value);
				}else{
					
					this._trigger("filterConfigError",null,{
																message : $si.i18N.DataFilter.regionalData.notifications.errorApplyConfig,
															});
				}
				
				
			}
		},
		
		_getIndexOf : function(list, compareField,compareValue){
			var returnIndex = -1; 
			if(list){
				$.each(list,function(index,item){
					if(item[compareField] == compareValue){
						returnIndex = index;
						return false;
					}
				});
			}
			return returnIndex;
		}, 
		
		triggerAddButton : function(){
			var rowId = this.getLastRowId();
			if(rowId){
				var criteriaRow = $(this.element).find("#" + rowId +".criteriaRow");
				
				var checkBox = criteriaRow.find("#" + rowId + "_checkbox");
				if(checkBox.prop("checked")){
					criteriaRow.find(".df-add").trigger("click");
				}
			}
		},
		
		triggerLevelButton : function(criterias){
			var rowId = this.getLastRowId() ;
			if(rowId){
				var criteriaRow = $(this.element).find("#" + rowId +".criteriaRow");
				
				var checkBox = criteriaRow.find("#" + rowId + "_checkbox");
				if(checkBox.prop("checked")){
					criteriaRow.find(".df-level").trigger("click",criterias);
				}
			}
		},
		
		getLastRowId : function(){
			if(this.options.rowcount > 0){
				return $(this.element).attr("id") +"_row" + (this.options.rowcount - 1) ;
			}
		},

	});

});