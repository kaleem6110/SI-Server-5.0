 
define([
        'jquery',
        'jquery-ui',
        'kendo'
 ],function($){
	$.widget('spacetimeinsight.siViewerToolBarMenu',{
		NAMESPACE : "spacetimeinsight",
		pluginName:"siViewerToolBarMenu",

		options:{
			dataSource: []
		},
		
		_create: function(){
			var $this = this;
			var maxZ=-1;
			var menuElement = $(this.element);
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			$(menuElement).kendoMenu({
				dataSource:  this.options.dataSource,
				select: function(e){
				var baseItem = $(e.item).hasClass('k-first k-last');
					 if(e != null && $(e.item).text() != "" && !baseItem){
						 $this._trigger("menuItemClicked",null,{org_event: e,domElement: e.item});
					 }
				 },
				 openOnClick: true,
				 closeOnClick: true,
		
			});	
	 },
	 getLastItem: function(){
    	 var menu = $(this.element).data("kendoMenu").element,item=null;
    	 if(menu != null){
    		 item = menu.children("li:last");
    	 }
    	 return item;
     },
	 
	});
});