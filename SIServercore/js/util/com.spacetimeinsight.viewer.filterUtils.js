define([
    'jquery',
    'jquery-ui',
    'dataFilter/com.spacetimeinsight.viewer.operator',
],function($) {
	
	$si.filterUtils = {
			
			CompositeRule : function(type) {
				this.criteriaType = type +"Criteria";
				this.type = type;
				this.criterias = [];
			},
			
			 Criteria : function(type,criteriaType,fieldName,operator,value) {
				this.criteriaType = criteriaType;
				this.type = type;
				this.fieldName = fieldName;
				this.operator = operator;
				this.value    = value;
			},
			
			CRITERIA_CONSTANTS : {
				SIMPLE_CRITERIA 	: "SimpleCriteria",
				DATE_CRITERIA		: "TimeRangeCriteria",
				IN_CRITERIA			: "InCriteria",
				BETWEEN_CRITERIA 	: "BetweenCriteria",
				TIME_CRITERIA		: "TimeCriteria",
				DATE_CRITERIA		: "DateCriteria",
				DATE_BETWEEN_CRITERIA  : "DateBetweenCriteria",
				TIME_BETWEEN_CRITERIA : "TimeBetweenCriteria",
				
			},
			
			/** Input is a list of objects having four values fieldName , value, dataType and Operator **/
			createAllCriteria : function(criteriaList){
				return this._createCriteria(new $si.filterUtils.CompositeRule("All"),criteriaList);
			},
			
			createAnyCriteria : function(criteriaList){
				return this._createCriteria(new $si.filterUtils.CompositeRule("Any"),criteriaList);
			},
			
			createAllCriteriaJSONString : function(criteriaList){
				var criteria = this.createAllCriteria(criteriaList);
				if(criteria){
					return JSON.stringify(criteria);
				}
			},
			
			createAnyCriteriaJSONString : function(criteriaList){
				var criteria = this.createAnyCriteria(criteriaList);
				if(criteria){
					return JSON.stringify(criteria);
				}
			},
			
			_createCriteria : function(compositeRule,criteriaList){
				var $this = this;
				var fieldName;
				var operator;
				var value;
				/** optional only required for Time Criteria**/
				var displayType;
				/** optional only  required for Date Criteria**/
				var dataType;
				
				if(criteriaList){
					$.each(criteriaList,function(index,criteria){
						fieldName = criteria.fieldName;
						operator = criteria.operator;
						value = criteria.value;
						displayType = criteria.displayType;
						dataType = criteria.dataType;
						compositeRule.criterias.push($this.createCriterias(fieldName,operator,value,displayType,dataType));
					});
				}
				return compositeRule;
			},
			
			/** list of criteria.  data type is only required in case of date and display type for time**/
			createCriterias : function(fieldName,operator,value,displayType,dataType){
				var type;
				var criteriaType;
				var fieldName;
				var operator;
				var value;
				if(fieldName && operator){
					switch(operator){
						case $si.Operators.between.value:
						case $si.Operators.betweenIncluding.value:
						case $si.Operators.notBetween.value:
						case $si.Operators.notBetweenIncluding.value:
							type 		 = "Between";
							criteriaType = this.CRITERIA_CONSTANTS.BETWEEN_CRITERIA;
							if(value instanceof Array && value.length > 1){
								value = {
												lowValue : value[0],
												highValue : value[1],
										};
							}	
						break;
						case $si.Operators.inList.value:
						case $si.Operators.notInList.value:
							if(typeof value == 'string' || value instanceof String){
								value = value.split(",");
							}
							type 		 = "In";
							criteriaType = this.CRITERIA_CONSTANTS.IN_CRITERIA;
							break;
						default:
							type 		 = "Simple";
							criteriaType = this.CRITERIA_CONSTANTS.SIMPLE_CRITERIA;
						break;
					}
					
					if(displayType == "Time"){
						type = "Time";
						if(criteriaType == $si.filterUtils.CRITERIA_CONSTANTS.BETWEEN_CRITERIA){ 
							criteriaType = this.CRITERIA_CONSTANTS.TIME_BETWEEN_CRITERIA;
						}else{
							criteriaType = this.CRITERIA_CONSTANTS.TIME_CRITERIA;
						}
					}
					else if(dataType == $si.Operators.DATA_TYPES.DATE && criteriaType == $si.filterUtils.CRITERIA_CONSTANTS.BETWEEN_CRITERIA){
						type = "DateBetween";
						criteriaType = this.CRITERIA_CONSTANTS.DATE_BETWEEN_CRITERIA;
					} 	else if(dataType == $si.Operators.DATA_TYPES.DATE){
						type = "Date";
						criteriaType = this.CRITERIA_CONSTANTS.DATE_CRITERIA;
					}
				
					return new $si.filterUtils.Criteria(type,criteriaType,fieldName,operator,value);
				}else{
					//throw notification
				}
			},
	}
});