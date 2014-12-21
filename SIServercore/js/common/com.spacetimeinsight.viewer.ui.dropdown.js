/**
 * This Drop down is extended with kendo drop down and it also provides shim feature
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($){

	$.widget('spacetimeinsight.siDropDownList',{
		options : {
			 	shimRequired	: false,
			 	dropDownList    : null,
		},
		pluginName:"siDropDownList",
		
		IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),
		
		_create : function(){
			var $this = this;
			this.widgetEventPrefix = this.pluginName + "_";

			this.options.id = $(this.element).attr("id");
			
			$($this.element).kendoDropDownList($this.options);
			 $this.options.dropDownList = $(this.element).data("kendoDropDownList")
			
			if(this.options.shimRequired){
				var list = $(this.element).data("kendoDropDownList").list;
				list.prepend(this.IFRAME_CONTAINER({id : this.options.id}));
			}
		},
		
		activateDropDownList: function(){
			if($this.options.dropDownList != null){
				$this.options.dropDownList.enable(true);
			}
		},
		
		deactivateDropDownList: function(){
			if($this.options.dropDownList != null){
				$this.options.dropDownList.enable(false);
			}
		},

	});

});