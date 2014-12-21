/**
 * This file opens the Export As CSV window for the Server Side Table.
 */
define([
    'jquery',
    'jquery-ui',
    'kendo',
    "viewer/com.spacetimeinsight.viewer.ui.exportViewer",
],function($){

	$.widget('spacetimeinsight.siServerSideTableExportAsCSV',$.spacetimeinsight.siViewerExportViewer,{
		options : {
						
		},
		pluginName:"siServerSideTableExportAsCSV",

		DIV : kendo.template("<div id ='#= id #'  > </div>"),
		CHECKBOX : kendo.template("<div><span><input type='checkbox' id = '#= id #' name = '#= id #' class ='c-d' checked /></span><span> #= text #</span></div>"),
		RADIO_BUTTON : kendo.template("<div class='t-row' style='display:inline-block'><span><input type='radio' style='#=style#' id = '#= id #' name = '#= id #' value=' #= value #' class='#= value #' /></span><span> #= text #</span></div>"),
		INPUT	: kendo.template("<input type = '#= type#' id = '#= id #' name = '#= id #'  value='#=value #' style='#=style#' size='#=size#' disabled='#=disabled#'/>"),
		INPUT_H	: kendo.template("<input type='hidden' id = '#= id #' name = '#= id #'  value='#=value #'  />"),
		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			this._super();
			
			this._initialize();
			/*this._bindControls();*/
		},
				
		
// function that gathers IDs of checked nodes
        _checkedNodeIds: function (nodes, checkedNodes) {
			var $this = this;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].checked && !nodes[i].hasChildren) {
                    checkedNodes.push(nodes[i].id);
                }

                if (nodes[i].hasChildren) {
					var kidNodes = [];
                    $this._checkedNodeIds(nodes[i].children.view(), kidNodes);
					checkedNodes[nodes[i].id] = kidNodes;
                }
            }
        },

		_handleRadioClicks: function(){
			var isfirstNChecked = $(".firstNRecords").prop("checked");
			if(isfirstNChecked){
				$('#firstNText')[0].disabled=false;					
			}else{
				$('#firstNText')[0].disabled=true;
				$('#firstNText')[0].value="";
			}

			var isPagesChecked = $(".pagesFromTo").prop("checked");
			if(isPagesChecked){
				$('#fromText')[0].disabled=false;	
				$('#toText')[0].disabled=false;
			}else{
				$('#fromText')[0].disabled= true;
				$('#toText')[0].disabled=true;
				$('#fromText')[0].value="";
				$('#toText')[0].value="";
				if($('#paginationDiv span.k-tooltip-validation')){
					$('#paginationDiv span.k-tooltip-validation').hide();
				}				
			}		
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
			columnDiv.append($this.DIV({id : "downloadColumnsDiv"}));

			var downloadSettingsDiv = containerDiv.find("#downloadSettingsDiv");
			downloadSettingsDiv.addClass("ev-inner-col2");
			downloadSettingsDiv.append($this.DIV({id : "recordsToDownloadDiv"}));

			var recordsToDownloadDiv = downloadSettingsDiv.find("#recordsToDownloadDiv");
			//recordsToDownloadDiv.css("margin-top","20px");
			recordsToDownloadDiv.append("<div style='padding-bottom:10px'><b>Data to download</b></div>");

			// first radiobutton
			recordsToDownloadDiv.append($this.RADIO_BUTTON({id:'dataToDownload', style: "display: inline-block!important", text:"All Records", value: "all"}));
			$('#dataToDownload').prop('checked', true);

			// second raddiobutton
			recordsToDownloadDiv.append($this.DIV({id : "firstNDiv"}));
			var firstNDiv = recordsToDownloadDiv.find("#firstNDiv");
			firstNDiv.append($this.RADIO_BUTTON({id:'dataToDownload', style: "display: inline-block!important", text:"The First", value: "firstNRecords", style: "display: inline-block"}));
			firstNDiv.append($this.INPUT({type:"textbox", id:"firstNText", value:"", size:"4", style: "display: inline-block", disabled: "true"}));
			firstNDiv.append(" records");
			
			//3rd radiobutton
			recordsToDownloadDiv.append($this.DIV({id : "paginationDiv"}));
			var paginationDiv = recordsToDownloadDiv.find("#paginationDiv");
			paginationDiv.append($this.RADIO_BUTTON({id:'dataToDownload', style: "display: inline-block", text:"First level pages from ", value: "pagesFromTo", style: "display: inline-block"}));
			paginationDiv.append($this.INPUT({type:"textbox", id:"fromText", value:"", size:"4", style: "display: inline-block", disabled: "true"}));
			paginationDiv.append(" to ");
			paginationDiv.append($this.INPUT({type:"textbox", id:"toText", value:"", size:"4", style: "display: inline-block", disabled: "true"}));

			var dataFilters = window.opener.parent.$si.viewer.selectedDataFilterDetails;;
			var timeFilters = window.opener.parent.$si.viewer.selectedTimeFilterDetails;
			var windowParams = window.opener.parent.$si.viewer.windowParams;
			var totalPages = window.opener.parent.$si.viewer.pages;
			
			$("#downloadColumnsDiv").kendoTreeView({
				checkboxes: {
					checkChildren: true
				},
				dataSource: JSON.parse(window.opener.parent.$si.viewer.serverSideTree)
			});
			$(".all").click(function() {
				$this._handleRadioClicks();
			});
			$(".pagesFromTo").click(function() {
				$this._handleRadioClicks();
			});
			$(".firstNRecords").click(function() {
				$this._handleRadioClicks();
			});
			$("#downloadColumnsDiv").data("kendoTreeView").dataSource.bind("change", function(e){
							var checkedNodes = new Object();
							var treeView = $("#downloadColumnsDiv").data("kendoTreeView");
							$this._checkedNodeIds(treeView.dataSource.view(), checkedNodes);
							var nodeKeys = Object.keys(checkedNodes);
							var downloadDisabled = true;
							for(var i=0; i<nodeKeys.length; i++){
								if(checkedNodes[nodeKeys[i]].length>0){
									downloadDisabled = false;
									break;
								}
							}		
							if(downloadDisabled){
								$("#downloadButton").attr("disabled", true);
							}else {
								$("#downloadButton").attr("disabled", false);
							}
						});
			$this.element.find("#footerDiv").find("#downloadButton").click(function(){
				var checkedNodes = new Object(),
                treeView = $("#downloadColumnsDiv").data("kendoTreeView");

				$this._checkedNodeIds(treeView.dataSource.view(), checkedNodes);
				var dataToDownload = $(".firstNRecords").prop("checked")?"some":"all";
				var firstN = "0";
				if($(".firstNRecords").prop("checked")){
					firstN = $("#firstNText").prop("value");
				}
				var pagesFrom = "0";
				var pagesTo = "0";
				var isPagination = $(".pagesFromTo").prop("checked");
				if($(".pagesFromTo").prop("checked")){
					pagesFrom = $("#fromText").prop("value");
					pagesTo = $("#toText").prop("value");
				}
				
				var selectedColumns = JSON.stringify(checkedNodes);
				containerDiv.find("#allOrSome").attr("value", dataToDownload);
				containerDiv.find("#firstN").attr("value", firstN);
				containerDiv.find("#isPagination").attr("value", isPagination);
				containerDiv.find("#pagesFrom").attr("value", pagesFrom);
				containerDiv.find("#pagesTo").attr("value", pagesTo);
				containerDiv.find("#selectedColumns").attr("value", selectedColumns);
			});
			
			$("#toText").kendoValidator({
				rules: {
					validPositiveInteger: function(element) {
						if(!$(".pagesFromTo").prop("checked")) {
							return true;
						}
						var valueTo = $("#toText").val();
						var valueFrom = $("#fromText").val();
						return valueTo >>> 0 === parseFloat(valueTo) && parseInt(valueTo)>0 && parseInt(valueTo)<=totalPages
							&& valueFrom >>> 0 === parseFloat(valueFrom) && parseInt(valueFrom)>0 && parseInt(valueFrom)<=totalPages
							&& parseInt(valueFrom)<=parseInt(valueTo);
					},
				},
				messages: {
					validPositiveInteger: "Please enter a valid page range (1 - "+totalPages+").",
				}
			});

				containerDiv.append($this.INPUT_H({id:"allOrSome", value:""}));
				containerDiv.append($this.INPUT_H({id:"firstN", value:""}));
				containerDiv.append($this.INPUT_H({id:"isPagination", value:""}));
				containerDiv.append($this.INPUT_H({id:"pagesFrom", value:""}));
				containerDiv.append($this.INPUT_H({id:"pagesTo", value:""}));
				containerDiv.append($this.INPUT_H({id:"selectedColumns", value:""}));

				containerDiv.append($this.INPUT_H({id:"filterCriteria", value:dataFilters}));
				containerDiv.append($this.INPUT_H({id:"isApplyFilterCriteria", value:true}));				
				containerDiv.append($this.INPUT_H({id:"timeFilterCriteria", value:timeFilters}));
				containerDiv.append($this.INPUT_H({id:"isApplyTimeFilter", value:true}));
				
				containerDiv.append($this.INPUT_H({id:"ecosid", value:windowParams.ecosid.trim()}));
				containerDiv.append($this.INPUT_H({id:"artefactname", value:windowParams.artefactname.trim()}));
				containerDiv.append($this.INPUT_H({id:"ecoexpmodel", value:windowParams.ecoexpmodel.trim()}));
				containerDiv.append($this.INPUT_H({id:"layerid", value:windowParams.layerid}));
				containerDiv.append($this.INPUT_H({id:"windowId", value:windowParams.windowId}));
		},
		validateForm : function(){
			var $this = this;
			var colArray =[];
			var toTextValidator = $("#toText").data("kendoValidator");
			if (!toTextValidator.validate()) {
         		return false;
         	}
			var date = new Date($.now());
			var fileName = this.options.exportNameConstant+'ServerSideTable_'+moment(date).format("YYYYMMDD_hhmmss");
			$("#fileName").val(fileName);
			return true;
		}
	});
});