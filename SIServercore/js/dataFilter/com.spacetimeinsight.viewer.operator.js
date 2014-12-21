define(['siViewerData',],function($si) {
	$si.Operators = {
			equalTo : {name:"equalTo",displayName:"",value:"Equals"},
			like : {name:"like",displayName:"",value:"Like"},
			inList : {name:"inList",displayName:"",value:"In"},
			isNull : {name:"null",displayName:"",value:"Null"},
			greaterThan : {name:"greaterThan",displayName:"",value:"GreaterThan"},
			lessThan : {name:"lessThan",displayName:"",value:"LesserThan"},
			greaterThanOrEqualTo : {name:"greaterThanEqualTo",displayName:"",value:"GreaterThanEquals"},
			lessThanOrEqualTo : {name:"lessThanEqualTo",displayName:"",value:"LesserThanEquals"},
			between : {name:"between",displayName:"",value:"Between"},
			betweenIncluding : {name:"betweenIncluding",displayName:"",value:"BetweenIncluding"},

			notEqualTo : {name:"notEqual",displayName:"",value:"NotEquals"},
			notLike : {name:"notLike",displayName:"",value:"NotLike"},
			notInList : {name:"notInList",displayName:"",value:"NotIn"},
			notNull : {name:"notNull",displayName:"",value:"NotNull"},
//			notGreaterThan : {name:"notGreaterThan",displayName:"",value:"NotGreaterThan"},
//			notLessThan : {name:"notLessThan",displayName:"",value:"NotLesserThan"},
//			notGreaterThanOrEqualTo : {name:"notGreaterThanEqualTo",displayName:"",value:"NotGreaterThanEquals"},
//			notLessThanOrEqualTo : {name:"notLessThanEqualTo",displayName:"",value:"NotLesserThanEquals"},
			notBetween : {name:"notBetween",displayName:"",value:"NotBetween"},
			notBetweenIncluding : {name:"notBetweenIncluding",displayName:"",value:"NotBetweenIncluding"},
			
			DATA_TYPES : {
				STRING : "java.lang.String",
				DOUBLE : "java.lang.Double",
				INTEGER : "java.lang.Integer",
				DATE	: "java.util.Date",
				BOOLEAN : "java.lang.Boolean",
			},

			//ToDo :- create constants for data types
			getOperators : function(dataType){
				var operators = [];
				//create constant for data types
				switch(dataType){
					case $si.Operators.DATA_TYPES.STRING :
						operators = $si.Operators.getStringOperators();
					break;
					case $si.Operators.DATA_TYPES.DOUBLE :
					case $si.Operators.DATA_TYPES.INTEGER :
						operators = $si.Operators.getNumericOperators();
					break;
					case $si.Operators.DATA_TYPES.DATE :
						operators = $si.Operators.getDateOperators();
					break;
					case $si.Operators.DATA_TYPES.BOOLEAN :
						operators = $si.Operators.getBooleanOperators();
					break;

				}
				return operators;
			},

			setDefaults : function(regionalData) {
				$si.Operators.equalTo.displayName = regionalData.equalTo;
				$si.Operators.like.displayName = regionalData.like;
				$si.Operators.inList.displayName = regionalData.inList;
				$si.Operators.isNull.displayName = regionalData.isNull;
				$si.Operators.notEqualTo.displayName = regionalData.notEqualTo;
				$si.Operators.notLike.displayName = regionalData.notLike;
				$si.Operators.notInList.displayName = regionalData.notInList;
				$si.Operators.notNull.displayName = regionalData.notNull;
				$si.Operators.greaterThan.displayName = regionalData.greaterThan;
				$si.Operators.lessThan.displayName = regionalData.lessThan;
				$si.Operators.greaterThanOrEqualTo.displayName = regionalData.greaterThanOrEqualTo;
				$si.Operators.lessThanOrEqualTo.displayName = regionalData.lessThanOrEqualTo;
				$si.Operators.between.displayName = regionalData.between;
				$si.Operators.betweenIncluding.displayName = regionalData.betweenIncluding;
				$si.Operators.notBetween.displayName = regionalData.notBetween;
				$si.Operators.notBetweenIncluding.displayName = regionalData.notBetweenIncluding;
			},
			getSliderOperators:function(){
				return [
	                        $si.Operators.equalTo,
	                        $si.Operators.greaterThan,
	                        $si.Operators.lessThan,
	                        $si.Operators.greaterThanOrEqualTo,
	                        $si.Operators.lessThanOrEqualTo,
	                        $si.Operators.between,
	                        $si.Operators.betweenIncluding,
	
	                        $si.Operators.notEqualTo,
	                        $si.Operators.notBetween,
	                        $si.Operators.notBetweenIncluding,
				        ];
			},			
			getMultiSelectOperators:function(){
				return [
	                        $si.Operators.equalTo,
	                        $si.Operators.isNull,
	                        $si.Operators.inList,
	
	                        $si.Operators.notEqualTo,
	                        $si.Operators.notNull,
	                        $si.Operators.notInList,
				        ];
			},
			getListOperators:function(){
				return [
                            $si.Operators.equalTo,
                            $si.Operators.isNull,
                            $si.Operators.inList,
                            $si.Operators.notEqualTo,
                            $si.Operators.notNull,
                            $si.Operators.notInList,
				        ];
			},



			getNumericSingleValueOperators : function(){
				return [
                            $si.Operators.equalTo,
                            $si.Operators.greaterThan,
                            $si.Operators.lessThan,
                            $si.Operators.greaterThanOrEqualTo,
                            $si.Operators.lessThanOrEqualTo,
                            $si.Operators.between,
                            $si.Operators.betweenIncluding,
                            $si.Operators.isNull,

                            $si.Operators.notEqualTo,
                            $si.Operators.notBetween,
                            $si.Operators.notBetweenIncluding,
                            $si.Operators.notNull,
						];
			},

			getStringSingleValueOperators : function(){
				return [
                            $si.Operators.equalTo,
                            $si.Operators.like,
                            $si.Operators.isNull,

                            $si.Operators.notEqualTo,
                            $si.Operators.notLike,
                            $si.Operators.notNull,

						];
			},

			getStringOperators : function(){
				return [
                            $si.Operators.equalTo,
                            $si.Operators.like,
                            $si.Operators.inList,
                            $si.Operators.isNull,

                            $si.Operators.notEqualTo,
                            $si.Operators.notLike,
                            $si.Operators.notInList,
                            $si.Operators.notNull,

						];
			},
			getTimeOperators:function(){
				return this.getNumericSingleValueOperators();
			},

			getNumericSingleValueOperators : function(){
				return [
                            $si.Operators.equalTo,
                            $si.Operators.greaterThan,
                            $si.Operators.lessThan,
                            $si.Operators.greaterThanOrEqualTo,
                            $si.Operators.lessThanOrEqualTo,
                            $si.Operators.between,
                            $si.Operators.betweenIncluding,
                            $si.Operators.isNull,

                            $si.Operators.notEqualTo,
                            $si.Operators.notBetween,
                            $si.Operators.notBetweenIncluding,
                            $si.Operators.notNull,
						];
			},

			getNumericOperators : function(){
				return [
                            $si.Operators.equalTo,
                            $si.Operators.greaterThan,
                            $si.Operators.lessThan,
                            $si.Operators.greaterThanOrEqualTo,
                            $si.Operators.lessThanOrEqualTo,
                            $si.Operators.between,
                            $si.Operators.betweenIncluding,
                            $si.Operators.inList,
                            $si.Operators.isNull,

                            $si.Operators.notEqualTo,
                            $si.Operators.notBetween,
                            $si.Operators.notBetweenIncluding,
                            $si.Operators.notInList,
                            $si.Operators.notNull,
						];
			},

			getDateOperators : function(){
				return [
                            $si.Operators.equalTo,
                            $si.Operators.greaterThan,
                            $si.Operators.lessThan,
                            $si.Operators.greaterThanOrEqualTo,
                            $si.Operators.lessThanOrEqualTo,
                            $si.Operators.between,
                            $si.Operators.betweenIncluding,
                            $si.Operators.isNull,

                            $si.Operators.notEqualTo,
                            $si.Operators.notBetween,
                            $si.Operators.notBetweenIncluding,
                            $si.Operators.notNull,
						];
			},

			getBooleanOperators : function(){
				return [
							$si.Operators.equalTo,
							$si.Operators.notEqualTo,
						];
			},
	};

	$si.CompositeRule = {
			ANY :{name : "any",displayName : "Any",value:"Any"},
			ALL :{name : "all",displayName : "All",value:"All"},

			getDataRule : function(){
				return [
				        	$si.CompositeRule.ANY,
				        	$si.CompositeRule.ALL,
				       ];
			},
	};

	$si.Operators.regional = [];
});