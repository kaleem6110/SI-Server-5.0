/**
 * This file opens the Export As CSV window for the Client Side Table.
 */
define([
    'jquery',
    'jquery-ui',
    'kendo',
    "viewer/com.spacetimeinsight.viewer.ui.exportViewer",
],function($){

	$.widget('spacetimeinsight.siPieChartExportAsCSV',$.spacetimeinsight.siViewerExportViewer,{
		options : {
		downloadDisabledColumn : false,		
		},
		pluginName:"siPieChartExportAsCSV",

		DIV : kendo.template("<div id ='#= id #'  > </div>"),
		CHECKBOX : kendo.template("<div><span><input type='checkbox' id = '#= id #' name = 'columnData' class ='c-d' checked /></span><span> #= text #</span></div>"),
		RADIO_BUTTON : kendo.template("<div><span><input type='radio' id = '#= id #' name = '#= id #' value=' #= value #' class='#= value #' /></span><span> #= text #</span></div>"),
		INPUT	: kendo.template("<input type = '#= type#' id = '#= id #' name = '#= id #'  value='#=value #' />"),
		_create : function(){
			var $this = this;
			// used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			this._super();
			
			this._initialize();
			//this._bindControls();
		},
		
		_initialize : function(){
			var $this = this;
			var seriesName =[];
			var seriesItem =[];
			var columnName =[];
			var columnItem =[];
			var columnDetails =null;
			
			
			$this.element.addClass("ev-outer-container");
			var containerDiv = $this.element.find("#containerDiv");
				containerDiv.addClass("ev-inner-container");
				containerDiv.append($this.DIV({id : "columnDiv"}));
				containerDiv.append($this.DIV({id : "downloadSettingsDiv"}));
				containerDiv.height('250px');
				
			var columnDiv = containerDiv.find("#columnDiv");
			columnDiv.addClass("ev-inner-col1");
			columnDiv.width('50%');
			columnDiv.height('auto');
			
			var pieChartMetaData = window.opener.parent.$si.viewer.pieChartMetaData;

			if(pieChartMetaData){
				$.each( pieChartMetaData, function( key, value ) {
				    	columnItem.push({text:value.displayName,id:value.displayName, expanded:true});	
				});
			}
			
				columnName.push({text:"Columns to download", expanded:true,checked:true,items:columnItem});
				columnDiv.kendoTreeView({
					checkboxes: {checkChildren: true},
					dataSource: columnName
				});

			$this._checkBoxControls();
			$this.element.find("#footerDiv").find("#downloadButton").click(function(){
			var checkedNodesColumn = new Array();
			var checkedNodes = new Array();
            var treeViewColumn = $this.element.find("#containerDiv").find("#columnDiv").data("kendoTreeView") ;
			$this._checkedNodeIds(treeViewColumn.dataSource.view(), checkedNodesColumn);
			
			if(checkedNodesColumn.length>0){
				checkedNodes.push(checkedNodesColumn);
			}
			var windowParams = window.opener.parent.$si.viewer.windowParams;
			columnDiv.append($this.INPUT({type:"hidden", id:"selectedColumns", value:""}));
			columnDiv.append($this.INPUT({type:"hidden", id:"ecosid", value:windowParams.ecosid.trim()}));
			columnDiv.append($this.INPUT({type:"hidden", id:"artefactname", value:windowParams.artefactname.trim()}));
			columnDiv.append($this.INPUT({type:"hidden", id:"ecoexpmodel", value:windowParams.ecoexpmodel.trim()}));
			columnDiv.append($this.INPUT({type:"hidden", id:"layerid", value:windowParams.layerid}));
			columnDiv.append($this.INPUT({type:"hidden", id:"windowId", value:windowParams.windowId}));
			$this.element.find("#containerDiv").find("#selectedColumns").val(checkedNodes);
			});			
			
		},
		validateForm : function(){
			var $this = this;
			var date = new Date($.now());
			var fileName = this.options.exportNameConstant+'chart_'+moment(date).format("YYYYMMDD_hhmmss");
			$("#fileName").val(fileName);
			return true;
		},
		
		_checkBoxControls : function(){
			var $this = this;
			$this.element.find("#containerDiv").find("#columnDiv").data("kendoTreeView").dataSource.bind("change", function(e){
				var checkedNodes = [];
				var treeViewColumn = $this.element.find("#containerDiv").find("#columnDiv").data("kendoTreeView");
				$this._checkedNodeIds(treeViewColumn.dataSource.view(), checkedNodes);
					if(checkedNodes.length>0){
						$this.options.downloadDisabledColumn = false;
					}else{
						$this.options.downloadDisabledColumn = true;
					}
				if($this.options.downloadDisabledColumn){
					$("#downloadButton").attr("disabled", true);
				}else {
					$("#downloadButton").attr("disabled", false);
				}
				
			});
			
			},
		
        _checkedNodeIds: function (nodes, checkedNodes) {
			var $this = this;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].checked && !nodes[i].hasChildren) {
                    checkedNodes.push(nodes[i].id);
                }
                if (nodes[i].hasChildren) {
                	var kNodes=[];
                    $this._checkedNodeIds(nodes[i].children.view(), kNodes);
                    if(kNodes.length>0){
                    	checkedNodes.push(kNodes);
                    }
                }
            }
        },
	});
});