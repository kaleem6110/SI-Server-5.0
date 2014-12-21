define([
    'jquery',
    'jquery-ui',
    'kendo',
    'si.ui.windowToolBar',
],function($){

	$.widget('siUi.mapToolBar',$.siUi.windowToolBar,{
		options : {
			toggleDelay : 500,
			
			mapTools : ["FAVORITE","TIMECONTROL","SPLITTER","EXPORTTOPNG","PRINT","SPLITTER","LASSO","RULER","STREETMAP","SPLITTER","SEARCH","SPLITTER","MESUREMENT","STREETVIEW","SHOWGOOGLEMAP","ACKNOWLEDGEALERT","SPLITTER"],
		},
		pluginName:"mapToolBar",
		
		
		//GENERIC_SPLITTER : kendo.template("<button id='spliter' disabled  style='float: left; background-image: url(images/spliter.png); width:30px;height:30px;'></button>");
		_create : function(){
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";

			//toolbar id
			this.options.id = $(this.element).attr("id");

			//this will call create method of super.
			this._super();

			//Need to add proper vertical splitter
			//this.addCustomTool("<button id='spliter' disabled  style='float: left; background-image: url(images/spliter.png); width:30px;height:30px;'></button>");
			this._addTools(this.options.mapTools);
			
			this._trigger("onCreationComplete",{id:this.options.id,domElement:$(this.element)});
		},

	});

});