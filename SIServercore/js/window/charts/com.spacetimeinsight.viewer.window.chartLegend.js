define([
    'jquery',
    'jquery-ui',
    'kendo',
], function ($) {
    $.widget('spacetimeinsight.siViewerChartLegend', $.spacetimeinsight.siViewerBaseWidget, {
        options: {
        	chartLegendDataObj :"",

        },
        //chartLegendData: "",
        pluginName: "siViewerChartLegend",
        GENERIC_DIV: kendo.template("<div id ='#= id #' style = 'width : 100%; height : 100%' > </div>"),
        _create: function () {
        	 this.options.chartLegendDataObj = this.options.chartLegendData;

            this._super();
        },

        _createControls: function () {
            this._super();
            template = "<span class='legend-color-box' style='background-color:#: item.color #; 'alt=' #: item.seriesName #'></span><span class='legend-color-label'><span>#: item.displayName #</span></span>"
            $(this.element).append(this.GENERIC_DIV({
                id: "chartLegendTreeview"
            }));

            this._buildTree();
        },

        _bindControls: function () {
            this._super();
        },

        _buildTree: function () {
            var $this = this;
            var treeview = this.element.find("#chartLegendTreeview");
            treeview.kendoTreeView({
                template: template,
                dataSource: {
                    data:  this.options.chartLegendDataObj
                },
                select: function (e) {
                	e.preventDefault();
                    var item = $(e.node);
                    $this._changeLegendState(item,null);
                    var itemIndex = $this.getSelectedLegendIndex(item);
                    $this._trigger("onHideOrShowSeriesOnChart", null, {
	                       nodeName: item[0].textContent,
	                       nodeIndex: itemIndex,
	                   });

                },
            });
            if (treeview.data("kendoTreeView") != null) {
                treeview.data("kendoTreeView").expand(".k-item");
            }


        },

        updateChartLegendState : function(data){
        	var $this = this;
        	var treeView = $($this.element).find("#chartLegendTreeview").data("kendoTreeView");

        	 for (var i = 0; i < data.series.length; i++) {

        		var node = treeView.findByText(data.series[i].name);
             	$this._changeLegendState(node,data.series[i].visible);



        	 }



        },

        _changeLegendState : function(item,visible){

        	var node = $(item).find('.k-in');

        	if(visible == null){
        	 if(node.hasClass("chartlegend-selected")){
        		 node.removeClass("chartlegend-selected");
        		 node.addClass("chartlegend-unselected");

             }else if(node.hasClass("chartlegend-unselected")){
            	 node.removeClass("chartlegend-unselected");
            	 node.addClass("chartlegend-selected");
             }else{
            	 node.addClass("chartlegend-selected");
             }

        	}else if(visible){
        		node.removeClass("chartlegend-selected");
        		node.addClass("chartlegend-unselected");
        	}else if(!visible){
        		node.removeClass("chartlegend-unselected");
        		node.addClass("chartlegend-selected");
        	}


        },
        getSelectedLegendIndex: function (item){
             var legendContainer = item.parent();
             var legendItems,itemIndex = -1  ;
             if(legendContainer){
                 legendItems = legendContainer.children();
                 itemIndex = $.inArray(item[0],legendItems);
             }
              return  itemIndex;
        },

        setLegendData : function(chartLegendData){
        	if(chartLegendData === undefined || chartLegendData == null) {
        		chartLegendData = [];
        	}
        	this.options.chartLegendDataObj = chartLegendData;
        	$("#chartLegendTreeview").data("kendoTreeView").setDataSource(chartLegendData);



        },

    });
});