define([
   'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'window/com.spacetimeinsight.viewer.window.baseWindow',
 ],
 function() {
	
        $.widget('spacetimeinsight.siViewerUrlWindow', $.spacetimeinsight.siViewerBaseWindow,{
            //default options for business view window
            options:{
            	windowAttributes : {
                    width   : "500px",
                    height  : "500px",
                    position: {
                        top     : "0px",
                        left    : "5px"
                    },
                },
                 url					: 'http://localhost:8080/docs/apr.html',
                title				: 'URL Window',
				windowTools 		: ["REFRESH","AUTOREFRESH"],
                windowIcon 			: "css/images/url_window.png",
                windowClass 		: "w-urlwindow-view",
                showHelpDropdown	: true,
                enableClose 		: true,
                iframe      : true,
             },

            pluginName:"siViewerUrlWindow",
 
	 		applyWindowData : function(windowData) {
                $(this.element).data("kendoWindow").refresh(this.options.windowConfig.windowURL);
 			},

 			_invokeWindowDataService : function(){	
				this.options.windowData ={};
				this._updateFooter();
				this.applyWindowData();
				
			},
			
    });

});
