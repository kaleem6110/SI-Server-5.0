define([
    'jquery',
    'jquery-format',
], function () {

    $si.formattingUtil = {

    DEFAULT_NUMBER_PETTERN: '#,###',
    DEFAULT_DECIMAL_PATTERN: '#,###.##',
    DEFAULT_CURRNECY_SYMBOL: '$',
    DEFAULT_PERCENT_SYMBOL: '%',
    DEFAULT_PERCENT_PETTERN: '',
    DEFAULT_DATE_PETTERN: 'MM/dd/yyyy',
    DEFAULT_INTEGER_PETTERN:'####',

    INT_TYPES	 : ["java.lang.Integer","java.lang.Long","java.lang.Short","java.math.BigInteger"],
    DOUBLE_TYPES : ["java.lang.Float","java.lang.Double","java.math.BigDecimal"],
    DATE_TYPES	 : ["java.util.Date"],
    NUMBER_TYPES : ["java.lang.Integer","java.lang.Long","java.lang.Short","java.math.BigInteger","java.lang.Float","java.lang.Double","java.math.BigDecimal"],
	STRING_TYPES : ["java.lang.String","java.lang.Character"],
	BOOLEAN_TYPES: ["java.lang.Boolean"],
    	
        _getIntegerFormatter: function () {
            return $si.formattingUtil.DEFAULT_INTEGER_PETTERN;
        },

        _getDoubleFormatter: function () {
            return $si.formattingUtil.DEFAULT_DECIMAL_PATTERN;
        },

        _getPercentageFormatter: function () {
            return $si.formattingUtil.DEFAULT_PERCENT_SYMBOL;
        },

        _getCurrencyFormatter: function () {
            return $si.formattingUtil.DEFAULT_CURRNECY_SYMBOL;
        },

        _getDateFormatter: function (displayFormat) {
			if(displayFormat) {
				return displayFormat;
			} else {
            	return $si.formattingUtil.DEFAULT_DATE_PETTERN;
			}
        },
		
	 	_toTitleCase : function (str) {
			if(str) {
    			return str.toString().replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			} else {
				return "False";
			} 
		},

        _getFormatter: function (dataType, displayFormat) {
        	if(!displayFormat) { 
        		if($.inArray(dataType, $si.formattingUtil.INT_TYPES) >=0) { 
        			return this._getIntegerFormatter();
				} else if($.inArray( dataType, $si.formattingUtil.DOUBLE_TYPES) >= 0){
					return this._getDoubleFormatter();
				}
        	} else if (displayFormat == 'Currency' && $si.formattingUtil.NUMBER_TYPES.indexOf(dataType) > 0 ){
        		return this._getCurrencyFormatter();
        	} else if (displayFormat == 'Number' && $si.formattingUtil.NUMBER_TYPES.indexOf(dataType) >= 0 ){
        		return this._getDoubleFormatter();
        	} else if (displayFormat == 'Percentage' && $si.formattingUtil.NUMBER_TYPES.indexOf(dataType) >0) {
        		return this._getPercentageFormatter();
        	} else if ((displayFormat == 'Integer') && $si.formattingUtil.NUMBER_TYPES.indexOf(dataType) >=  0) {
        		return this._getIntegerFormatter();
        	} else {
        		return displayFormat;
        	}
        },
        
        formatData : function(dataType, displayFormat, value) {
			if ($si.formattingUtil.DATE_TYPES.indexOf(dataType) >= 0) {
				return $.format.date(new Date(value), this._getDateFormatter(displayFormat));	
			} else if ($si.formattingUtil.BOOLEAN_TYPES.indexOf(dataType) >= 0) {
				return this._toTitleCase(value);
			} else if (displayFormat == 'Currency' && $si.formattingUtil.NUMBER_TYPES.indexOf(dataType) > 0 ){
				return this._getCurrencyFormatter() + "" + $.format.number(value , this._getDoubleFormatter());
			} else if (displayFormat == 'Percentage' && $si.formattingUtil.NUMBER_TYPES.indexOf(dataType) > 0 ){
				return  $.format.number(value / 100 , this._getDoubleFormatter()) + ""+ this._getPercentageFormatter();
			} else {
				return $.format.number(value , this._getFormatter(dataType, displayFormat));
			}
        },
    };
});