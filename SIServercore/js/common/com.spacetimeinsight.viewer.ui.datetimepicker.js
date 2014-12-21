define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($){

	$.widget('spacetimeinsight.siDateTimePicker',{
		options : {
			 	shimRequired	: false,
			 	dateTime    : null,
		},
		pluginName:"siDateTimePicker",
		
		IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),
		
		_create : function(){
			var $this = this;
			this.widgetEventPrefix = this.pluginName + "_";

			this.options.id = $(this.element).attr("id");
			
			$($this.element).kendoDateTimePicker($this.options);
			$this.options.dateTime = $(this.element).data("kendoDateTimePicker");
			
			if(this.options.shimRequired){
				var dateViewDiv = $(this.element).data("kendoDateTimePicker").dateView.div;
				var timeViewList = $(this.element).data("kendoDateTimePicker").timeView.list;
				if (dateViewDiv) {
					dateViewDiv.prepend(this.IFRAME_CONTAINER({id : this.options.id}));
				}
				if (timeViewList) {
					timeViewList.prepend(this.IFRAME_CONTAINER({id : this.options.id}));
				}
			}
		},
		
		activateDateTimePicker: function(){
			if($this.options.dateTime != null){
				$this.options.dateTime.enable(true);
			}
		},
		
		deactivateDateTimePicker: function(){
			if($this.options.dateTime != null){
				$this.options.dateTime.enable(false);
			}
		},

	});

});