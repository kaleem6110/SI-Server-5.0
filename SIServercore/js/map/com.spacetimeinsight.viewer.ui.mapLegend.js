define([
    'jquery',
    'jquery-ui',
    'kendo',
    'map/ge/com.spacetimeinsight.viewer.ui.geMap',
    'common/com.spacetimeinsight.viewer.ui.window',
],function($){
	$.widget('spacetimeinsight.siViewerMapLegend',$.spacetimeinsight.siViewerWindow,{
		options:{
				title			 :"Map Legend",
				shimRequired 	 : true,
				windowAttributes : {
						width 	 : "300px",
						height 	 : "300px",

						position : {
							top	 : "150px",
							left : "200px",
						},
				},
				windowTools      : [],
				toolBarWidgetJS	 : null,
				toolBarWidget	 : null,
				actions 	  	 : ["Minimize" , "Maximize","Close"],
				toolBarWidgetJS			: null,
				toolBarWidget			: null,
				data 			 : [],
				windowIcon 		 : "css/images/legend.png",
				group			 : "Maps",
				groupIcon	 	 : "css/images/map_window.png",
			},

			pluginName : "siViewerMapLegend",

			_create: function(){
				this._super();
				var $this = this;
				$this._addWindowMetadata();
		        $(this.element).data("kendoWindow").wrapper.find(".k-i-minimize").click(function(e){
		        	 $this.minimizeWindow();
		        	 e.stopPropagation();
				});
			},
			
			
			_createControls : function(){
				this._super();
			
				//Ask satpal for css
				$(this.element).css({
					width : "100%",
					height : "300px",
					"background-color" : "lavendor",
					position: "absolute",
				});
	
				template = "# if(item.imageURIData){# <img src='data:image/png;base64,#: item.imageURIData #' alt='   #: item.displayName #' />#}else{# #if(item.color){#<span class='legend-color-box' style='background-color:#: item.color #; 'alt='   #: item.displayName #'></span>#}##}#<span class='legend-image-label'>#if(item.displayName){ #<span>#: item.displayName #</span># }#</span>";
	
				$(this.element).append(this.GENERIC_DIV({id: "legendTreeView"}));
				if($si.businessViewUtil.getBusinessViewMetadataSize() > 0){
					$si.init.getLegendConfiguration();
				}
				
				this._buildTree();
				
			},
			
			_bindControls : function(){
				this._super();
				this._bindlegendDataModel();
			},
			
			_buildTree : function(){
				$("#legendTreeView").kendoTreeView({
					   template: template,
			           dataSource: { data:$si.viewer.legendDataModel.legendData},
			     });
				 if($("#legendTreeView").data("kendoTreeView") != null){
					$("#legendTreeView").data("kendoTreeView").expand(".k-item");
				 }
			},
			
			_bindlegendDataModel : function(){
				var $this = this;
				
				$si.eventSource.businessView.bind($si.events.BusinessViewEvents.onBusinessViewUnLoad, this.removeLegendData.bind(this));
				
				$si.viewer.legendDataModel.bind("change",function(e){
					if(e.action == undefined){
						$this._buildTree();
					}
				});
			},
				
			removeLegendData : function(businessViewEvent){
				if(businessViewEvent && businessViewEvent.data){
					var businessViewId = businessViewEvent.data.businessViewId;
					if($si.viewer.legendDataModel.legendData){
						var tLegendData=[];
						$.each($si.viewer.legendDataModel.legendData,function(index,legendData){
							if(legendData && legendData.layerId != businessViewId){
								tLegendData.push($si.viewer.legendDataModel.legendData[index]);
							}
						});
						$si.viewer.legendDataModel.set("legendData",tLegendData);
					}
				}
			},
			
			
			minimizeWindow : function(){
 	 			var siWindow = $(this.element).data("kendoWindow");
 	        	 siWindow.wrapper.fadeOut(300);
 	 		},
			
		});
});