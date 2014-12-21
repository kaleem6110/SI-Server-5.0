/**
 * This file opens the Export As CSV window for the alerts.
 */
define([
    'jquery',
    'jquery-ui',
    'kendo',
    "viewer/com.spacetimeinsight.viewer.ui.exportViewer",
],function($){

	$.widget('spacetimeinsight.siAlertExportAsCSV',$.spacetimeinsight.siViewerExportViewer,{
		options : {
			dateTimeFormat : "yyyy-MM-dd HH:mm:ss",
			timeFormat : "HH:mm",
		},
		pluginName:"siAlertExportAsCSV",

		DIV : kendo.template("<div id ='#= id #'  > </div>"),
		CHECKBOX : kendo.template("<div class='t-row'><span><input type='checkbox' id = '#= id #' name = '#= id #'checked /></span><span> #= text #</span></div>"),
		RADIO_BUTTON : kendo.template("<div class='t-row'><span><input type='radio' id = '#= id #' name = '#= id #' value=' #= value #' class='#= value #' /></span><span> #= text #</span></div>"),
		DATEPICKER_INPUT	: kendo.template("<div style='padding-left: 25px;margin-top:5px'><span style='width:30px;display: inline-block;text-align: right;padding-right: 5px;'>#= fromTo #</span><span style='width:50px;display: inline-block;text-align: right;padding-right: 5px;'><input id = '#= id #' name = '#= id #' /></span></div>"),
		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			this._super();
			
			this._initialize();
			this._bindControls();
		},
		
		_initialize : function(){
			var $this = this;
			$this.element.addClass("ev-outer-container");
			
			var containerDiv = $this.element.find("#containerDiv");
			containerDiv.addClass("ev-inner-container");
			containerDiv.append($this.DIV({id : "columnDiv"}));
			containerDiv.append($this.DIV({id : "downloadSettingsDiv"}));
			
			var columnDiv = containerDiv.find("#columnDiv");
			columnDiv.addClass("ev-inner-col1");
			columnDiv.append("<div style='padding-bottom:10px'><b>Columns to download</b></div>");
			columnDiv.append($this.CHECKBOX({id:'messageId', text:$si.i18N.Application.alertWindow.messageIdColumn}));
			columnDiv.append($this.CHECKBOX({id:'message', text:$si.i18N.Application.alertWindow.messageColumn}));
			columnDiv.append($this.CHECKBOX({id:'priority', text:$si.i18N.Application.alertWindow.priorityColumn}));
			columnDiv.append($this.CHECKBOX({id:'alertTime', text:$si.i18N.Application.exportLabels.alertExport.alertTime}));
			columnDiv.append($this.CHECKBOX({id:'ackBy', text:$si.i18N.Application.alertWindow.ackByColumn}));
			columnDiv.append($this.CHECKBOX({id:'ackOn', text:$si.i18N.Application.alertWindow.ackOnColumn}));
			columnDiv.append($this.CHECKBOX({id:'alertTypes', text:$si.i18N.Application.exportLabels.alertExport.alertTypes}));
			
			containerDiv.find("#downloadSettingsDiv").append($this.DIV({id : "alertTypesDiv"}));
			containerDiv.find("#downloadSettingsDiv").append($this.DIV({id : "alertsToDownloadDiv"}));
			
			var alertTypesDiv = containerDiv.find("#downloadSettingsDiv").find("#alertTypesDiv");
			containerDiv.find("#downloadSettingsDiv").addClass("ev-inner-col2");
			alertTypesDiv.append("<div style='padding-bottom:10px'><b>"+$si.i18N.Application.exportLabels.alertExport.alertTypes+"</b></div>");
			alertTypesDiv.append($this.CHECKBOX({id:'alertData', text:$si.i18N.Application.exportLabels.alertExport.activeAlerts}));
			alertTypesDiv.append($this.CHECKBOX({id:'alertAckData', text:$si.i18N.Application.exportLabels.alertExport.ackAlerts}));
			
			var alertsToDownloadDiv = containerDiv.find("#downloadSettingsDiv").find("#alertsToDownloadDiv");
			alertsToDownloadDiv.css("margin-top","10px");
			alertsToDownloadDiv.append("<div style='padding-bottom:10px'><b>"+$si.i18N.Application.exportLabels.alertExport.alertToDownload+"</b></div>");
			alertsToDownloadDiv.append($this.RADIO_BUTTON({id:'alertsToDownload', text:$si.i18N.Application.exportLabels.alertExport.allAlerts, value: "allAlerts"}));
			$('#alertsToDownload').prop('checked', true);
			alertsToDownloadDiv.append($this.RADIO_BUTTON({id:'alertsToDownload', text:$si.i18N.Application.exportLabels.alertExport.allAlertsBetween, value: "allAlertsBetween"}));
			alertsToDownloadDiv.append($this.DATEPICKER_INPUT({id:'datePickerFrom', fromTo : "from"}));
			alertsToDownloadDiv.append($this.DATEPICKER_INPUT({id:'datePickerTo', fromTo : "to"}));
			
			var fromDate = alertsToDownloadDiv.find("#datePickerFrom");
			var toDate = alertsToDownloadDiv.find("#datePickerTo");
			fromDate.kendoDateTimePicker({
				 timeFormat: this.options.timeFormat,
				 format: $this.options.dateTimeFormat,
				 value:new Date(),
			});
			
			toDate.kendoDateTimePicker({
			 	 timeFormat : this.options.timeFormat,
				 format: this.options.dateTimeFormat,
				 value:new Date(),
			});
			fromDate.data("kendoDateTimePicker").enable(false);
			toDate.data("kendoDateTimePicker").enable(false);
		},
		
		_bindControls : function(){
			var $this = this;
			$('#alertAckData').change(function() {
				var isAlertChecked = $('#alertData').is(":checked");
				var isAlertAckChecked = $('#alertAckData').is(":checked");
				if(!isAlertChecked && isAlertAckChecked){
					$this._enableDisableControls(true);
					$this.element.find("#footerDiv").find("#downloadButton").prop('disabled', false);
				}else if(!isAlertChecked && !isAlertAckChecked){
					$this._enableDisableControls(false);
					$this.element.find("#footerDiv").find("#downloadButton").prop('disabled', true);
				}
				if(!$(this).is(":checked")) {
					$("#ackBy").prop('checked', false);
					$("#ackOn").prop('checked', false);
					$("#ackBy").prop('disabled', true);
					$("#ackOn").prop('disabled', true);
				}else{
					$("#ackBy").prop('checked', true);
					$("#ackOn").prop('checked', true);
					$("#ackBy").prop('disabled', false);
					$("#ackOn").prop('disabled', false);
				}
			});
			
			$('#alertData').change(function() {
				var isAlertChecked = $('#alertData').is(":checked");
				var isAlertAckChecked = $('#alertAckData').is(":checked");
				if( !isAlertAckChecked && !isAlertChecked){
					$this._enableDisableControls(false);
					$this.element.find("#footerDiv").find("#downloadButton").prop('disabled', true);
				}else{
					$this.element.find("#footerDiv").find("#downloadButton").prop('disabled', false);
					$this._enableDisableControls(true);
				}
			});
			
			$('.allAlertsBetween').change(function() {
				$(this).parent().parent().parent().find("#datePickerFrom").data("kendoDateTimePicker").enable(true);
				$(this).parent().parent().parent().find("#datePickerTo").data("kendoDateTimePicker").enable(true);
			});
			
			$('.allAlerts').change(function() {
				$(this).parent().parent().parent().find("#datePickerFrom").data("kendoDateTimePicker").enable(false);
				$(this).parent().parent().parent().find("#datePickerTo").data("kendoDateTimePicker").enable(false);
			});
			
			$("#datePickerFrom").kendoValidator({
				rules: {
					dataEmpty: function(element) {
						var value = $("#datePickerFrom").val();
						if(value){
							return true;
						}			      
						return false;
					},
					dateValidation: function(element) {
						var value = $("#datePickerFrom").val();
						var date = kendo.parseDate(value,$this.options.dateTimeFormat);
						if (!date) {
							return false;
						}
						return true;
					}
				},
				messages: {
					dataEmpty: $si.i18N.Application.exportLabels.alertExport.emptyDateError,
					dateValidation: $si.i18N.Application.exportLabels.alertExport.validDateTimeError
				}
			});

			$("#datePickerTo").kendoValidator({
				rules: {
					dataEmpty: function(element) {
						var value = $("#datePickerTo").val();
						if(value){
							return true;
						}			      
						return false;
					},
					dateValidation: function(element) {
						var value = $("#datePickerTo").val();
						var date = kendo.parseDate(value,$this.options.dateTimeFormat);
						if (!date) {
							return false;
						}
						return true;
					},
					dateCompare : function(element) {
						var fromDate = kendo.parseDate($("#datePickerFrom").val(),$this.options.dateTimeFormat);
						var toDate = kendo.parseDate($("#datePickerTo").val(),$this.options.dateTimeFormat);
						if(fromDate && toDate){
							if(toDate <= fromDate){
								return false;
							}
							return true;
						}
						
					}
				},
				messages: {
					dataEmpty: $si.i18N.Application.exportLabels.alertExport.emptyDateError,
					dateValidation: $si.i18N.Application.exportLabels.alertExport.validDateTimeError,
					dateCompare : $si.i18N.Application.exportLabels.alertExport.cmpError
				}
			});
			
		},
		
		_enableDisableControls : function(isEnabled){
			if(!isEnabled){
				$("#messageId").prop('checked', false);
				$('#message').prop('checked', false);
				$('#priority').prop('checked', false);
				$('#alertTime').prop('checked', false);
				$('#alertTypes').prop('checked', false);
				$("#messageId").prop('disabled', true);
				$('#message').prop('disabled', true);
				$('#priority').prop('disabled', true);
				$('#alertTime').prop('disabled', true);
				$('#alertTypes').prop('disabled', true);
			}else if(isEnabled){
				$("#messageId").prop('checked', true);
				$('#message').prop('checked', true);
				$('#priority').prop('checked', true);
				$('#alertTime').prop('checked', true);
				$('#alertTypes').prop('checked', true);
				$("#messageId").prop('disabled', false);
				$('#message').prop('disabled', false);
				$('#priority').prop('disabled', false);
				$('#alertTime').prop('disabled', false);
				$('#alertTypes').prop('disabled', false);
				
			}
		},
		validateForm : function(){
			var fromDateValidator = $("#datePickerFrom").data("kendoValidator");
			var toDateValidator = $("#datePickerTo").data("kendoValidator");
			if ((!fromDateValidator.validate()) || (!toDateValidator.validate())) {
         		return false;
         	}
         	var date = new Date($.now());
			var fileName = this.options.exportNameConstant+'alerts_'+moment(date).format("YYYYMMDD_hhmmss");
			$("#fileName").val(fileName);
			return true;
		}
	});
});