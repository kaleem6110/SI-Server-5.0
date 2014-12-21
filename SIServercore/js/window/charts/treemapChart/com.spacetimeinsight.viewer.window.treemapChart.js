define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',   
    'siViewerNamespace',
    'jtreemap',
     'window/charts/treemapChart/com.spacetimeinsight.viewer.window.treemapChartWindow',
    
],function($){

	$.widget('spacetimeinsight.siViewertreemapChart', $.spacetimeinsight.siViewerTreemapWindow,{
		options : {
			dataProvider  	: 	"",
			id              :undefined,
		},
		
		
		
		pluginName:"siViewertreemapChart",
		//GENERIC_COMPONENT : kendo.template("<div id ='#= id #' class = 'chart-area' > </div><div id='debug-info'></div> <div id='breadCrumb-info'></div> <div id='mouseoverbox'  class='mouseoverbox' > </div>"),
		meterChart :'',
		showLabels :true,
		stac:[],
		_create : function(){
			this._super();
		},
		
		_createControls : function(){
			this._super();
			//$(this.element).append(this.TEMPLATE({id : this.options.id}));
			//this._createChart();
		},
		
			_bindControls: function () {
            this._super();
            //Any Specific drawer function to come here
        },
		
		
		render:function(){
		var $this = this;
		 	var breadCrumb; 
		
		 
		 	if($this.options.windowConfig.chartDetails && $this.options.windowConfig.chartDetails.title){
		     this.options.chartContainer.find('#treemaptitle').text($this.options.windowConfig.chartDetails.title.text);
		     this.options.chartContainer.find('#treemap').css("top","20px");
			}
			if($this.options.windowConfig.chartDetails && $this.options.windowConfig.chartDetails.subtitle){
		     this.options.chartContainer.find('#treemapsubtitle').text($this.options.windowConfig.chartDetails.subtitle.text);
		     if($this.options.windowConfig.chartDetails.title){
		      this.options.chartContainer.find('#treemap').css("top","40px");}
		      else
		      {
		      this.options.chartContainer.find('#treemap').css("top","20px");		      
		      }
			}
			
			
			this.stac.push($this.options.dataProvider.children);
			
			
			
			
			var highlighterFadeTimeout;
            var triggerHighlighterFade = function() {
                $("#highlighter").fadeOut(400,"linear");
            };
            var clearHighlighterFade = function() {
                clearTimeout(highlighterFadeTimeout);
            };
            var initHighlighterFade = function(duration) {
                highlighterFadeTimeout = setTimeout('triggerHighlighterFade()',duration);
            };
            var mouseoverboxFadeTimeout;
            var triggerMouseoverboxFade = function() {
                $("#mouseoverbox").fadeOut(400,"linear");
            };
            var clearMouseoverboxFade = function() {
                clearTimeout(mouseoverboxFadeTimeout);
            };
            var initMouseoverboxFade = function(duration) {
                mouseoverboxFadeTimeout = setTimeout('triggerMouseoverboxFade()',duration);
            };
			 var mouseclickHandler = function(e,data) {
			 
                var nodes = data.nodes;
                var ids = data.ids;
               
               
                if(nodes[0].children){
              	  createTreemap(nodes[0].children);
              	  $this.stac.push(nodes[0]);
              	  
                } //else{
                 //$this.stac.push($this.options.dataProvider.children);
               // }
               
            };
            var mouseRightclickHandler= function(e,data) {
			 
              var  lastObject = $this.stac.pop();
              if(lastObject){
               createTreemap(lastObject);
              }
              
               
            };
            
		      
            var myInnerNodeHeaderLabeller=  function(ctx,rect,rgb,id) {
              ctx.rect(rect[0],rect[1],rect[2],rect[3]);
              ctx.clip();
              ctx.fillStyle = '#555';
              ctx.font = '0.625em Verdana, Geneva, sans-serif';
              ctx.fillText(id);
            };
            var myLeafNodeBodyLabeller = function(ctx,rect,rgb,id) {
                ctx.rect(rect[0],rect[1],rect[2],rect[3]);
                ctx.clip();
                if (TreemapUtils.avgRgb(rgb) <= 200) {
                    ctx.fillStyle = '#fff';
                } else {
                    ctx.fillStyle = '#888';
                }
                ctx.font = '0.625em Verdana, Geneva, sans-serif';
                ctx.fillText(id);
            };
            
            
            	var mousemoveHandler = function(e,data) {
					if (data.nodes[0] == undefined) return;
					updateMouseoverbox(e,data);
				};
            var mouseleaveHandler = function() {
               
                clearMouseoverboxFade();
                triggerMouseoverboxFade();
                clearHighlighterFade();
                triggerHighlighterFade();
            };
          
            var updateMouseoverbox = function(e,data) {
                $(".mouseoverbox").hide();
                if (data.nodes[0].hasOwnProperty('children') === false) {
                    $("#mouseoverbox").css({"background-color":"rgba(255,255,255,0.85)"});
                } else {
                    $("#mouseoverbox").css({"background-color":"rgba(255,255,200,0.85)"});
                }
                $("#mouseoverbox").html("<span>"
                    + "<p><b> Data ID:" + data.nodes[0].dataId + "</b></p>"   
                     + "<p><b> Data Value:" + data.nodes[0].dataValue + "</b></p>"                   
                    + "</span>");
               var mouseoverboxWidth = $("#mouseoverbox").width();
                var mouseoverboxHeight = $("#mouseoverbox").height();
             
                var treemapWidth = $("#treemap").width();
                var treemapHeight = $("#treemap").height();
                var treemapOffset = $("#treemap").offset();
                if (e.pageX + mouseoverboxWidth + 16 > treemapOffset.left + treemapWidth) {
                   $("#mouseoverbox").css({ "left":e.pageX-mouseoverboxWidth-8 });
                  
                } else {
                    $("#mouseoverbox").css({ "left":e.pageX+16 });
                }
                if (e.pageY + mouseoverboxHeight > treemapOffset.top + treemapHeight) {
                    $("#mouseoverbox").css({ "top":e.pageY-mouseoverboxHeight });
                } else {
                    $("#mouseoverbox").css({ "top":e.pageY });
                }
                if (mouseoverboxFadeTimeout != undefined) clearMouseoverboxFade();
                initMouseoverboxFade(30000);
                $("#mouseoverbox").show();
            };
            
            var createTreemap = function(data) {
                    $("#treemap").treemap({
                     "nodeBorderWidth":1,
                     "dimensions":[$this.options.chartContainer.width(),$this.options.chartContainer.height()],
		   			 "labelsEnabled":true,
		    		// "animationEnabled":true,
             		 //"animationDurationMs":2000,
             		 "colorStops" : [
                      //  {"val":0,  "color":"#aa0000"},//#aa0000  //#a00
                        {"val":.4,"color":"#f00"},
                       // {"val":.5, "color":"#FF0000"},
                      //  {"val":.5,"color":"#ff8700"},
                        //{"val":.8,"color":"#fbff00"},
                        {"val":.5,"color":"#00FF00"},
                       // {"val":1,  "color":"#070"}
                    ],
             		  "nodeData": {
                        "id":"2fc414e2", 
                        "children": data
                  			  }
                    
                   	 }).bind('treemapmousemove',mousemoveHandler)
             .bind('treemapclick',mouseclickHandler)
             .bind("contextmenu",mouseRightclickHandler)
             .mouseleave(function(){mouseleaveHandler()});
             
             
                    }; 
                    
			createTreemap($this.options.dataProvider.children);
		
		},
		_createChart :function(){
			var $this=this;
			if($this.options.dataProvider.children){
            this.render();
             }
      },
      
      	_createTableWindow : function(){
			var $this = this;
			var parentId = $this.options.id;
			var gridColumn;
			var gridContainer = $(this.element).find("#" + parentId + "_gridContainer");
			this.options.chartInfoGrid = new flexiciousNmsp.FlexDataGrid(gridContainer[0], { id:'chartInfoGrid', });
			this.options.grid =gridContainer[0].component;
			
			this.options.grid.rollOverColor = 0x8dcbe4;
            this.options.grid.textRollOverColor = 0xFFFFFF;
            this.options.grid.selectionColor = 0x2c95d2;
            this.options.grid.activeCellColor = 0x2c95d2;
            this.options.grid.alternatingItemColors = [0xE4EFFF, 0xF9F9F9];
            this.options.grid.fixedColumnFillColors[0] = 0xE4EFFF;
            this.options.grid.columnGroupColors[0] = 0xE4EFFF;
            this.options.grid.imagesRoot = $si.tableGridUtils.IMAGE_PATH;
            
			var seriesConfiguration = [];
			if($this.options.dataProvider.tableHeaders){
			seriesConfiguration=$this.options.dataProvider.tableHeaders;
			$si.viewer.treemapChartColumnDetails = $this.options.dataProvider.tableHeaders;
			}
			
			var gridDataProvider = [];
			var gridDataProviderObj;
			if($this.options.dataProvider.chartTableData && $this.options.dataProvider.chartTableData.attributeDataList){
			this.options.grid.setDataProvider($this.options.dataProvider.chartTableData.attributeDataList);
			}
			this.options.grid.setHorizontalScrollPolicy("auto");
			this.options.grid.setColumnLevel(new flexiciousNmsp.FlexDataGridColumnLevel($this.options.grid));
			
			$.each(seriesConfiguration,function(index,data){
				gridColumn = $si.tableGridUtils.DynamicColumns_addColumn(data,data);
				gridColumn.setColumnWidthMode("fitToContent");
				gridColumn.columnWidthModeFitToContentExcludeHeader= true;
				$this.options.grid.addColumn(gridColumn);
			});
			this.options.grid.reDraw();
			this.options.grid.rebuild();
		},
		
		_applyDrawerConfigration: function () {
            var $this = this;
            var confData = $this.options.windowConfig;
            $this.options.drawer[$this.options.drawerWidget]("setHideColumnList", confData);
        },
        toggleDataLabels: function(){
 			this._super();
			var	isEnabled = $("#treemap").treemap("option","labelsEnabled");
			if(isEnabled){
				this.showHideDataLabels(false);
			} else {
				this.showHideDataLabels(true);
			}
		},

		showHideDataLabels: function(flag){
			if(flag != undefined) {
				$("#treemap").treemap("option","labelsEnabled",flag);;
			}
		},
	
	
});
});