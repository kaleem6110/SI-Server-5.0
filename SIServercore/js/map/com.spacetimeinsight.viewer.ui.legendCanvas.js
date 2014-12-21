define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.window',
],function($){
	$.widget('spacetimeinsight.siViewerLegendCanvas',$.spacetimeinsight.siViewerWindow,{
		options:{
				title:"Map Legend",
				shimRequired : true,
				windowAttributes : {
					width 		: "300px",
					height 		: "200px",
					
					position: {
						top			: "150px",
						left		: "200px",
					},
				},
				windowTools 	: [],
				actions 	  	: ["Help", "Minimize" , "Maximize","Close"],
			},
			
			//FIXME -- Use si.viewer.data as place holders for this. Not inside the widget. How are you going to databind.
			data : [{

                "text" : "Grid",
                "imageUrl" : "images//layers/green_rectangle_disable.png",
                "id" : "4",
                "nodeUrl" : "",
                "items" : [
                        {
                            "text" : "345Kv",
                            "imageUrl" : "images//layers/green_rectangle_disable.png",
                        },
                        {
                            "text" : "138Kv",
                            "imageUrl" : "images//layers/green_rectangle_disable.png",
                          
                          
                        },
                        {
                            "text" : "69Kv",
                            "imageUrl" : "images//layers/green_rectangle_disable.png",
                          
                        }]
			},{

                "text" : "Transformers",
                "imageUrl" : "images//layers/transformer.png",
                "id" : "4",
                "nodeUrl" : "",
                "items" : [
                        {
                            "text" : "Good",
                            "imageUrl" : "images//layers/transformer.png",
                          
                        },
                        {
                            "text" : "Fair",
                            "imageUrl" : "images//layers/transformer.png",
                          
                        },
                        {
                            "text" : "Poor",
                            "imageUrl" : "images//layers/transformer.png",
                            
                        }]
			},
			{

                "text" : "Outages",
                "imageUrl" : "images//layers/candle_disable.png",
                "id" : "4",
                "nodeUrl" : "",
                "items" : [
                        {
                            "text" : "Large Scale",
                            "imageUrl" : "images//layers/candle_disable.png",
                        },
                        {
                        	 "text" : "Serious",
                             "imageUrl" : "images//layers/candle_disable.png",
                        },
                        {
                        	 "text" : "Minor",
                             "imageUrl" : "images//layers/candle_disable.png",
                          }]
			},{

                "text" : "lightning",
                "imageUrl" : "images//layers/lightening_1_disable.png",
			},{

                "text" : "Maintanance repair",
                "imageUrl" : "images//layers/caution_light_disable.png",          
                "items" : [{
                		  }]
                
			}],


			pluginName:"siViewerLegendCanvas",
			IFRAME_SHIM : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000; float:right; top: 0px; position: absolute;width: 100%;left:0px;' height='#= height #px'></iframe"),
			
			GENERIC_COMPONENT : kendo.template("<div id ='#= id #'> </div>"),

			_create: function(){
				var $this = this;
				var $options = this.options;
				this._super();
				this.options.id = $(this.element).attr("id");
				//FIXME - Remove CSS  from code
				//check how to move div above the content. Check how to use panel
				$(this.element).css({
						width : "100%",
						height : "100%",
						"background-color" : "lavendor",
						position: "absolute",
						
						top: "70px",
						float:"right",
					});
				$(this.element).append(this.GENERIC_COMPONENT({id: "treeview"}));
					 $("#treeview").kendoTreeView({
				           
				            dataSource: $this.data,
				       });
  				       
			$(this.element).append(this.IFRAME_SHIM({id: this.options.id, height: 200}));

        
			//this._trigger("onCreationComplete",{id:this.options.id,domElement:$(this.element)});
		},

	});
});