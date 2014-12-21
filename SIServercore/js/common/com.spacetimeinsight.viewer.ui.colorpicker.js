/**
 * This Drop down is extended with kendo drop down and it also provides shim feature
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($){

	$.widget('spacetimeinsight.siColorPicker',{
		options : {
			 	shimRequired	: false,
			 	colorpicker 	: null,
			 	needSlider		: true,
		},
		pluginName:"siColorPicker",
		
		IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),
		SLIDER_DIV       : kendo.template("<div id='sliderCtrl'><div class='slider123'><input id='slider' class='slider'/></div><div class='color-textbox'><span><input type='text' id='slidertext' class='slidertext' value='60'/></span><span>%</span></div><div id='textandbox' class='textandbox'><span><b>Transparency</b></span></div ><div class='mark-0'><span>0</span></div><div class='mark-100'><span>100</span></div></div>"),
		
		_create : function(){
			var $this = this;
			this.widgetEventPrefix = this.pluginName + "_";

			this.options.id = $(this.element).attr("id");
			$(this.element).kendoColorPicker(this.options);
			$this.options.colorpicker = $(this.element).data("kendoColorPicker");
			$this.options.colorpicker.close();
			this.options.colorPickerDiv = $('.k-colorpalette :last');
			if(this.options.shimRequired){
				
				
				this.options.colorPickerDiv.prepend($this.IFRAME_CONTAINER({id:this.options.id}));
				
				if(this.options.needSlider){
					this.options.colorPickerDiv.append($this.SLIDER_DIV);
					this.options.slider = this.options.colorPickerDiv.find("#slider");
					this.options.slider.kendoSlider({
                        change: function(e){
                        	$this.options.colorPickerDiv.find('#slidertext').val(e.value);
                        },
                        
                        min: 0,
                        max: 100,
                        smallStep: 1,
                        largeStep: 10,
                        value: 60
                    });
                 
					this.options.colorPickerDiv.find('#slidertext').keyup(function(event) {
                    	var term = $this.options.colorPickerDiv.find('#slidertext').val();
                    	$this.options.slider.data("kendoSlider").value(term);
					});
				}
			}
		},
		
		activateColorPicker:function(){
			if($this.options.colorpicker != null){
				$this.options.colorpicker.enable(true);
			}
		},
		
		deactivateColorPicker:function(){
			if($this.options.colorpicker != null){
				$this.options.colorpicker.enable(false);
			}
		},
	});

});