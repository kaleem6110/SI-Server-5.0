/**
 * This file opens the Export As CSV window for the Client Side Table.
 */
define([
    'jquery',
    'jquery-ui',
    'kendo',
    "viewer/com.spacetimeinsight.viewer.ui.exportViewer",
],function($){

	$.widget('spacetimeinsight.siClientSideTableExportAsCSV',$.spacetimeinsight.siViewerExportViewer,{
		options : {
						
		},
		pluginName:"siClientSideTableExportAsCSV",

		DIV : kendo.template("<div id ='#= id #'  > </div>"),
		CHECKBOX : kendo.template("<div><span><input type='checkbox' id = '#= id #' name = '#= id #' class ='c-d' checked /></span><span> #= text #</span></div>"),
		INPUT	: kendo.template("<input type = '#= type#' id = '#= id #' name = '#= id #'  value='#=value #' />"),
		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			this._super();
			
			this._initialize();
			/*this._bindControls();*/
		},
		
		_initialize : function(){
			var colArray =[];
			var $this = this;
			$this.element.addClass("ev-outer-container");
			
			var containerDiv = $this.element.find("#containerDiv");
			containerDiv.addClass("ev-inner-container");
			containerDiv.append($this.DIV({id : "columnDiv"}));
			containerDiv.append($this.DIV({id : "downloadSettingsDiv"}));
			
			var columnDiv = containerDiv.find("#columnDiv");
			columnDiv.addClass("ev-inner-col1");
			columnDiv.append("<b>Columns to download</b>");
			var columnDetails = window.opener.parent.$si.viewer.clientSideColumnDetails;
			var dataFilters = window.opener.parent.$si.viewer.selectedDataFilterDetails;;
			var timeFilters = window.opener.parent.$si.viewer.selectedTimeFilterDetails;
			var windowParams = window.opener.parent.$si.viewer.windowParams;
			if(columnDetails){
				$.each(columnDetails, function(key,value){
					columnDiv.append($this.CHECKBOX({id:key, text:value.displayName}));
				});
			}
			$(":checkbox").change(function(){
				var n = $( "input:checked" ).length;
				if(n>0){
					$("#downloadButton").attr("disabled", false);
				}else {
					$("#downloadButton").attr("disabled", true);
				}
			});
			
			$this.element.find("#footerDiv").find("#downloadButton").click(function(){
				var colArray = [];
				$('.c-d:checkbox').each(function(k,v){
					if( $(this).is(':checked') ){
						colArray.push(v.name);
					}
				});
				$this.element.find("#selectedColumns").attr("value", colArray);			
				
			});
				
				columnDiv.append($this.INPUT({type:"hidden", id:"selectedColumns", value:""}));
				columnDiv.append($this.INPUT({type:"hidden", id:"filterCriteria", value:dataFilters}));
				columnDiv.append($this.INPUT({type:"hidden", id:"isApplyFilterCriteria", value:true}));
				
				columnDiv.append($this.INPUT({type:"hidden", id:"timeFilterCriteria", value:timeFilters}));
				columnDiv.append($this.INPUT({type:"hidden", id:"isApplyTimeFilter", value:true}));

				columnDiv.append($this.INPUT({type:"hidden", id:"ecosid", value:windowParams.ecosid.trim()}));
				columnDiv.append($this.INPUT({type:"hidden", id:"artefactname", value:windowParams.artefactname.trim()}));
				columnDiv.append($this.INPUT({type:"hidden", id:"ecoexpmodel", value:windowParams.ecoexpmodel.trim()}));
				columnDiv.append($this.INPUT({type:"hidden", id:"layerid", value:windowParams.layerid}));
				columnDiv.append($this.INPUT({type:"hidden", id:"windowId", value:windowParams.windowId}));
		},
		validateForm : function(){
			var $this = this;
			var colArray =[];

			var date = new Date($.now());
			var fileName = this.options.exportNameConstant+'ClientSideTable_'+moment(date).format("YYYYMMDD_hhmmss");
			$("#fileName").val(fileName);
			return true;
		}
	});
});