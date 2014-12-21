/**
 * This ComboBox is extended with kendo comboBox and it also provides shim feature
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($){

	$.widget('spacetimeinsight.siComboBox',{
		options : {
			 	shimRequired	: false,
		},
		pluginName:"siComboBox",
		
		IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),
		
		_create : function(){
			var $this = this;
			this.widgetEventPrefix = this.pluginName + "_";

			this.options.id = $(this.element).attr("id");
	
		    this.options.filter ='contains';
	//	    this.options.change = this._validate;
	//	    this.options.close = this._validate;

			$(this.element).kendoComboBox(this.options);
			
			if(this.options.shimRequired){
				var list = $(this.element).data("kendoComboBox").list;
				list.prepend(this.IFRAME_CONTAINER({id : this.options.id}));
			}
		},
		
		_validate : function(e) {
            if (this.value() && this.selectedIndex == -1) {    
                this._filterSource({
                    value: this.value(),
                    field: this.options.dataTextField,
                    operator: "contains"
                });
                this.select(0);
                if ( this.selectedIndex == -1 ) {                    

                    this.text("");
                }
            } 
       	},

	});

});