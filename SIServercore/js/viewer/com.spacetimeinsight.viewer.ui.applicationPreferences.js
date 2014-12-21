/**
 * Application Preferences Window Plug-in .
 */
define([
    'jquery',
    'jquery-ui',
    'common/com.spacetimeinsight.viewer.ui.window',
    'kendo',
    'siRouter',
],function($){
		$.widget('spacetimeinsight.siViewerApplicationPreferences', $.spacetimeinsight.siViewerWindow,{
			options : {
				windowAttributes : {
					height:"550px",
					width :"545px",
					top : "50px",
					modal: true,
				},
				id							: "applicationPreferencesWindow",
				windowTools 				: [],
				title 						: $si.i18N.Application.preferencesLabels.title,
				actions 					: ["Maximize","Close"],
				tooltip 					: $si.i18N.Application.preferencesLabels.title,
			    windowIcon 					: "css/images/settings.png",
			    footerRequired 				: true,
			    measurementTypes			: [{data: $si.i18N.Application.preferencesLabels.measurementTypes.imperial,val:"imperial"},{data: $si.i18N.Application.preferencesLabels.measurementTypes.metric,val:"metric"} ],
			    preferenceValues 			: {},
			    timeFormats					: [{text: $si.i18N.Application.alertWindow.timeFormats.seconds, value:"1"},{text: $si.i18N.Application.alertWindow.timeFormats.minutes, value:"60"},{text: $si.i18N.Application.alertWindow.timeFormats.hours, value:"3600"},{text: $si.i18N.Application.alertWindow.timeFormats.days, value:"86400"},{text: $si.i18N.Application.alertWindow.timeFormats.months, value:"2592000"}],
			    defaultValues				: {},
			},
			pluginName:"siViewerApplicationPreferences",
			DIV : kendo.template("<div id ='#= id #' class='#= cssName #' > </div>"),
			DIV_WITH_SPAN : kendo.template("<div><span class='#= cssLabel#'>#= text#</span><span class='#= cssField #'><input type='select' id='#= id#'/></span></div>"),
			DIV_WITH_CHECKBOX : kendo.template("<div><span class='field-label'>#= text#</span><span class='field-content'><input type='checkbox' id='#= id#' checked/></span></div>"),
			DIV_WITH_TEXTBOX : kendo.template("<div><span class='field-label'>#= text#</span><span class='field-content'><input type='text' id='#= id#'/></span><span> #= suffixText #</span></div>"),
			BUTTON : kendo.template("<input type='button' id ='#= id #' value='#= value#' class ='#= className #'/>"),
			RADIO_BUTTON : kendo.template("<div><span><input type='radio' id = '#= id #' name = '#= id #' value=' #= value #' class='#= value #' /></span><span> #= text #</span></div>"),
			HEADING_DIV : kendo.template("<div class='pref-section-header'><span class='section-image'></span><span class='section-heading'><div id ='#= id #' > #=text #</div></span></div>"),
			//Called on instance creation
			_create: function(){
				this._super();
				$(this.element).data("kendoWindow").center();
				this.element.parent().css("min-height","360px");
				this.element.parent().css("z-index","9000002");
				$(".k-overlay").css("z-index","9000001");
				$(".sti-window-google-earth").hide();
				this.options.onCloseWindow = function(e,data){
					$(".sti-window-google-earth").show();
				};
				
				this.options.onFooterCreationComplete = function(e,data){
					data.footer.text($si.i18N.Application.preferencesLabels.mandatoryFieldCondition);
				}
			},
			_createControls : function(){
				var $this = this;
				this._super();
				this.element.append(this.DIV({id : "containerDiv", cssName : "outer-container"}));
				this.element.append(this.DIV({id : "footerDiv", cssName : "footer-container"}));
				
				var containerDiv = this.element.find("#containerDiv");
				var footerDiv = this.element.find("#footerDiv");
				
				containerDiv.append(this.DIV({ id : "generalSettings", cssName : "section"}));
				containerDiv.append(this.DIV({ id : "errInfoSettings", cssName : "section"}));
				containerDiv.append(this.DIV({ id : "alertTickerSettings", cssName : "section"}));
				containerDiv.append(this.DIV({ id : "alertAckSettings", cssName : "section"}));
				
				var genSettings = containerDiv.find('#generalSettings');
				genSettings.append(this.HEADING_DIV({ id : "genSettInfo", text : $si.i18N.Application.preferencesLabels.genSettInfo}));
				genSettings.find('.section-image').addClass('pref-section-expand');
				//genSettings.find('#genSettInfo').append($si.i18N.Application.preferencesLabels.genSettInfo);
				genSettings.append(this.DIV({ id : "generalSettingsContent", cssName : "setting-content"}));
				var genSettingsContent = genSettings.find("#generalSettingsContent");
				genSettingsContent.append(this.DIV_WITH_SPAN({text : $si.i18N.Application.preferencesLabels.colorScheme, id : "themes", cssLabel : "field-label", cssField : "field-content"}));
				genSettingsContent.find('#themes').siDropDownList({
					dataSource : $si.viewer.userModel.get("themes"),
					shimRequired:true
				});
				genSettingsContent.append(this.DIV_WITH_SPAN({text : $si.i18N.Application.preferencesLabels.defaultApp, id : "defaultModule", cssLabel : "field-label", cssField : "field-content"}));
				genSettingsContent.find('#defaultModule').siDropDownList({
								dataTextField: "displayName",
								dataValueField: "id",
								dataSource : $si.viewer.userModel.get("modules"),
								shimRequired:true
				});
				//$si.viewer.userModel.get("modules")
				genSettingsContent.append(this.DIV_WITH_SPAN({text : $si.i18N.Application.preferencesLabels.measurementSystem, id : "measureSystem", cssLabel : "field-label", cssField : "field-content"}));
				genSettingsContent.find('#measureSystem').siDropDownList({
					dataTextField: "data",
					dataValueField: "val",
					dataSource : $this.options.measurementTypes,
					shimRequired:true
				});
				
				genSettingsContent.append(this.DIV_WITH_SPAN({text : $si.i18N.Application.preferencesLabels.language, id : "language", cssLabel : "field-label", cssField : "field-content"}));
				genSettingsContent.find('#language').siDropDownList({
					dataTextField: "langDesc",
					dataValueField: "languageId",
					dataSource : $si.viewer.userModel.get("locale"),
					shimRequired:true
				});
				var errInfoSettings = containerDiv.find('#errInfoSettings');
				//errInfoSettings.append(this.DIV({ id : "errorSettInfo", cssName : "errorSettInfo"}));
				errInfoSettings.append(this.HEADING_DIV({ id : "errorSettInfo", text : $si.i18N.Application.preferencesLabels.errorSettInfo}));
				errInfoSettings.find('.section-image').addClass('pref-section-expand');
				//errInfoSettings.find('#errorSettInfo').append($si.i18N.Application.preferencesLabels.errorSettInfo);
				errInfoSettings.append(this.DIV({ id : "errInfoSettingsContent", cssName : "setting-content"}));
				var errInfoSettingsContent = errInfoSettings.find('#errInfoSettingsContent');
				errInfoSettingsContent.append(this.DIV_WITH_CHECKBOX({ text : $si.i18N.Application.preferencesLabels.showMessages, id : "isShowMessage"}));
				errInfoSettingsContent.append('<div><span class="field-label">'+$si.i18N.Application.preferencesLabels.displayMax+'</span><span class="field-content"><input type="text" id = "noOfErrorMessages"/></span><span>'+$si.i18N.Application.preferencesLabels.displayMaxInfo+'</span></div>');
				errInfoSettingsContent.find('#noOfErrorMessages').val(10);
				errInfoSettingsContent.append('<div><span class="field-label">'+$si.i18N.Application.preferencesLabels.timeInfo+'</span><span class="field-content"><input type="text" id = "timeOfMessages"/></span><span>'+$si.i18N.Application.preferencesLabels.seconds+'</span></div>');
				errInfoSettingsContent.find('#timeOfMessages').val(5);
				
				var alertTickerSettings = containerDiv.find('#alertTickerSettings');
				//alertTickerSettings.append(this.DIV({ id : "alertTickerSettInfo", cssName : "alertTickerSettInfo"}));
				alertTickerSettings.append(this.HEADING_DIV({ id : "alertTickerSettInfo", text : $si.i18N.Application.preferencesLabels.alertTickerSettInfo}));
				alertTickerSettings.find('.section-image').addClass('pref-section-expand');
				//alertTickerSettings.find('#alertTickerSettInfo').append($si.i18N.Application.preferencesLabels.alertTickerSettInfo);
				alertTickerSettings.append(this.DIV({ id : "alertTickerSettingsContent", cssName : "setting-content"}));
				var alertTickerSettingsContent = alertTickerSettings.find('#alertTickerSettingsContent');
				alertTickerSettingsContent.append(this.DIV_WITH_TEXTBOX({ text : $si.i18N.Application.preferencesLabels.noOfAlerts, id : "messageScrollCount",suffixText:$si.i18N.Application.preferencesLabels.times}));
				alertTickerSettingsContent.append(this.DIV_WITH_TEXTBOX({ text : $si.i18N.Application.preferencesLabels.scrollSpeed, id : "messageScrollSpeed",suffixText:$si.i18N.Application.preferencesLabels.seconds}));
				alertTickerSettingsContent.find('#messageScrollSpeed').val($si.viewer.alertConfigData.messageScrollSpeed);
				alertTickerSettingsContent.append(this.DIV_WITH_TEXTBOX({ text : $si.i18N.Application.preferencesLabels.zoomLabel, id : "zoomRange",suffixText:$si.i18N.Application.preferencesLabels.onClick}));
				alertTickerSettingsContent.find('#zoomRange').val($si.viewer.alertConfigData.zoomRange);

				
				var alertAckSettings = containerDiv.find('#alertAckSettings');
				alertAckSettings.append(this.HEADING_DIV({ id : "alertAckSettingsInfo", text : $si.i18N.Application.preferencesLabels.ackAlerts}));
				alertAckSettings.find('.section-image').addClass('pref-section-expand');
				alertAckSettings.append(this.DIV({ id : "alertAckSettingsContent", cssName : "setting-content"}));
				
				var alertAckSettingsContent = alertAckSettings.find('#alertAckSettingsContent');
				alertAckSettingsContent.append('<div><span class="field-label">'+$si.i18N.Application.preferencesLabels.showLast+'</span><span class="field-content"><input type="text" id = "initGapTime"/></span><span><input type="select" id="initGapTimeFormat"/></span></div>');
				alertAckSettingsContent.find("#initGapTimeFormat").siDropDownList({
					dataTextField: "text",
					dataValueField: "value",
					dataSource : this.options.timeFormats,
					shimRequired:true
				});
				alertAckSettingsContent.find("#initGapTime").val($si.viewer.alertConfigData.initGap/$si.viewer.alertConfigData.initGapTimeFormat);
				alertAckSettingsContent.append('<div><span class="field-label">'+$si.i18N.Application.preferencesLabels.alertCount+'</span><span class="field-content"><input type="text" id = "noOfMessages"/></span><span>'+$si.i18N.Application.preferencesLabels.alertsLabel+'</span></div>');
				alertAckSettingsContent.find("#noOfMessages").val($si.viewer.alertConfigData.noOfMessages);

				footerDiv.append(this.RADIO_BUTTON({id : 'adminUserControl', text : "Apply to all users", value : "moduleLevel" }));
				$('#adminUserControl').prop('checked', true);
				footerDiv.append(this.RADIO_BUTTON({id : 'adminUserControl', text : "Apply to my profile", value : "userLevel" }));
				footerDiv.append(this.DIV({id:"footerButtons", cssName: "footer-buttons"}));
				footerDiv.find('#footerButtons').append(this.BUTTON({id : 'restore', value : $si.i18N.Application.preferencesLabels.restoreButton , className : "apply-button"}));
				footerDiv.find('#footerButtons').append(this.BUTTON({id : 'apply', value : $si.i18N.Application.preferencesLabels.applyButton , className : "apply-button"}));
				footerDiv.find('#footerButtons').append(this.BUTTON({id : 'close', value : $si.i18N.Application.preferencesLabels.closeButton , className : "cancel-button"}));
				this.option.defaultValues = this._getControlValues();
				this._setControlValues($si.viewer.preferenceValues);
			},
			
			_bindControls : function(){
				var $this = this;
				var containerDiv = this.element.find("#containerDiv");
				var footerDiv = this.element.find('#footerDiv');
				containerDiv.find(".section-image").click(function(){
					
					$(event.target).parent().parent().find(".setting-content").toggle();
					var iconContainer = $(event.target).parent().find(".section-image");
					if($(event.target).parent().find(".section-image").hasClass('pref-section-expand')){
						iconContainer.removeClass('pref-section-expand');
						iconContainer.addClass('pref-section-collapse');
					}else if($(event.target).parent().find(".section-image").hasClass('pref-section-collapse')){
						iconContainer.removeClass('pref-section-collapse');
						iconContainer.addClass('pref-section-expand');
					}
				});
				footerDiv.find(".moduleLevel").prop("disabled",true);
				footerDiv.find(".userLevel").prop("disabled",true);
				footerDiv.find(".moduleLevel").prop("checked",false);
				footerDiv.find('#restore').val($si.i18N.Application.preferencesLabels.restoreAppButton);
				//$si.userPrivileges.getPrivilege("HTMLVIEWER","HTML_APPLICATION_PREFERENCES");
				//As  per Srinivas's comment : Need to be refactored and to be fixed once the privileges framework validated for all the scenarios,
				//then we will remove it and use the privileges API.
				if($si.viewer.privilegeObservable.privileges){
					for(var i = 0; i< $si.viewer.privilegeObservable.privileges.length; i++){
						if($si.viewer.privilegeObservable.privileges[i].name == "HTMLVIEWER"){
							var htmlRights = $si.viewer.privilegeObservable.privileges[i];
							if(htmlRights.subRights){
								for(var j=0; j<htmlRights.subRights.length; j++){
									var subRight = htmlRights.subRights[j];
									if(subRight.name == "HTML_APPLICATION_PREFERENCES"){
										if(!subRight.hasRead){
											footerDiv.find(".moduleLevel").prop("disabled",true);
											footerDiv.find(".userLevel").prop("disabled",true);
											footerDiv.find(".moduleLevel").prop("checked",false);
											footerDiv.find('#restore').val($si.i18N.Application.preferencesLabels.restoreAppButton);
										}else{
											footerDiv.find(".moduleLevel").prop("disabled",false);
											footerDiv.find(".userLevel").prop("disabled",false);
											footerDiv.find(".moduleLevel").prop("checked",true);
											footerDiv.find('#restore').val($si.i18N.Application.preferencesLabels.restoreButton);
										}
									}
								}
							}
						}
					}
					
				}
				
				footerDiv.find('.moduleLevel').change(function(){
					footerDiv.find('#restore').val($si.i18N.Application.preferencesLabels.restoreButton);
				});
				footerDiv.find('.userLevel').change(function(){
					footerDiv.find('#restore').val($si.i18N.Application.preferencesLabels.restoreAppButton);
				});
				
				footerDiv.find('#restore').click( function(){
					if(footerDiv.find('#restore').val() == $si.i18N.Application.preferencesLabels.restoreAppButton ){
						$this._fetChModuleLevelPreferences();
					}else if( footerDiv.find('#restore').val() == $si.i18N.Application.preferencesLabels.restoreButton ){
						$this._applyDefaultValues();
					}
				});
				
				footerDiv.find('#apply').click( function(){
					var prefValues = $this._getControlValues();
					if(($.trim($this.element.find("#footerDiv").find("input[type='radio']:checked").val())== "userLevel") || ($.trim($this.element.find("#footerDiv").find("input[type='radio']:checked").val())== "")){
						if($si.viewer.userModel.userInfo.userId){
							prefValues.userId = $si.viewer.userModel.userInfo.userId;
						}else{
							prefValues.userId = $si.viewer.userModel.userInfo.userUniqueId;
						}
						
					}else{
						prefValues.userId = -1;
					}
					prefValues.moduleId = $si.viewer.selectedModuleModel.selectedModule.id;
					
					prefValues.categoryName = "HTMLViewer";
					prefValues.action = "save";
					$si.routes.saveAndFetchApplicationPreferences($this._onSavePreferencesSuccess.bind($this), $this._onSavePreferencesFailure, prefValues);
				});
				
				footerDiv.find('#close').click( function(){
					$this.closeWindow();
				});
			},
			
			_getControlValues : function(){
				var $this = this;
				var controlValues = {};
				var containerDiv = $this.element.find('#containerDiv');
				controlValues.themes = $this.element.find('#themes').val();
				controlValues.defaultModule = $this.element.find('#defaultModule').val();
				controlValues.measureSystem = $this.element.find('#measureSystem').val();
				controlValues.language = $this.element.find('#language').val();
				controlValues.isShowMessage = $this.element.find('#isShowMessage').is(":checked");
				controlValues.noOfErrorMessages = $this.element.find('#noOfErrorMessages').val();
				controlValues.timeOfMessages = $this.element.find('#timeOfMessages').val();
				controlValues.messageScrollCount = $this.element.find('#messageScrollCount').val();
				controlValues.messageScrollSpeed = $this.element.find('#messageScrollSpeed').val();
				controlValues.zoomRange = $this.element.find('#zoomRange').val();
				controlValues.initGapTime = $this.element.find('#initGapTime').val();
				controlValues.initGapTimeFormat = $this.element.find('#initGapTimeFormat').val();
				controlValues.noOfMessages = $this.element.find('#noOfMessages').val();
				$this.options.preferenceValues = controlValues;
				return controlValues;
			},
			
			_setControlValues : function(preferencesValues) {
				var $this = this;
				var containerDiv = $this.element.find('#containerDiv');
				$this.element.find('#themes').data("kendoDropDownList").value(preferencesValues.themes);
				if(preferencesValues.defaultModule){
					$this.element.find('#defaultModule').data("kendoDropDownList").value(preferencesValues.defaultModule);
				}
				
				$this.element.find('#measureSystem').data("kendoDropDownList").value(preferencesValues.measureSystem);
				$this.element.find('#language').data("kendoDropDownList").value(preferencesValues.language);
				if(preferencesValues.isShowMessage=="true" || preferencesValues.isShowMessage == null){
					$this.element.find('#isShowMessage').prop('checked', true);
				}else{
					$this.element.find('#isShowMessage').prop('checked', false);
				}
				if(preferencesValues.noOfErrorMessages){
					$this.element.find('#noOfErrorMessages').val(preferencesValues.noOfErrorMessages);
				}else{
					$this.element.find('#noOfErrorMessages').val($this.option.defaultValues.noOfErrorMessages);
				}
				if(preferencesValues.timeOfMessages){
					$this.element.find('#timeOfMessages').val(preferencesValues.timeOfMessages);
				}else{
					$this.element.find('#timeOfMessages').val($this.option.defaultValues.timeOfMessages);
				}
				if(preferencesValues.messageScrollCount){
					$this.element.find('#messageScrollCount').val(preferencesValues.messageScrollCount);
				}else{
					$this.element.find('#messageScrollCount').val($this.option.defaultValues.messageScrollCount);
				}
				if(preferencesValues.messageScrollSpeed){
					$this.element.find('#messageScrollSpeed').val(preferencesValues.messageScrollSpeed);
				}else{
					$this.element.find('#messageScrollSpeed').val($this.option.defaultValues.messageScrollSpeed);
				}
				if(preferencesValues.zoomRange){
					$this.element.find('#zoomRange').val(preferencesValues.zoomRange);
				}else{
					$this.element.find('#zoomRange').val($this.option.defaultValues.zoomRange);
				}
				if(preferencesValues.initGapTime){
					$this.element.find('#initGapTime').val(preferencesValues.initGapTime);
				}else{
					$this.element.find('#initGapTime').val($this.option.defaultValues.initGapTime);
				}
				if(preferencesValues.initGapTimeFormat){
					$this.element.find('#initGapTimeFormat').data("kendoDropDownList").value(preferencesValues.initGapTimeFormat);
				}else{
					$this.element.find('#initGapTimeFormat').data("kendoDropDownList").value($this.option.defaultValues.initGapTimeFormat);
				}
				if(preferencesValues.noOfMessages){
					$this.element.find('#noOfMessages').val(preferencesValues.noOfMessages);
				}else{
					$this.element.find('#noOfMessages').val($this.option.defaultValues.noOfMessages);
				}
				
				
			},
			
			_onSavePreferencesSuccess : function(data){
				$si.viewer.preferenceValues = this.options.preferenceValues;
				delete this.options.preferenceValues.action;
				delete this.options.preferenceValues.categoryName;
				delete this.options.preferenceValues.rendererType;
				delete this.options.preferenceValues.moduleId;
				delete this.options.preferenceValues.userId;
				this._setControlValues($si.viewer.preferenceValues);
				this.closeWindow();
			},
			
			_onSavePreferencesFailure : function(data){
				console.log(data);
			},
			
			_applyDefaultValues : function(){
				var $this = this;
				var containerDiv = $this.element.find('#containerDiv');
				$this.element.find('#themes').data("kendoDropDownList").value(this.option.defaultValues.themes);
				$this.element.find('#defaultModule').data("kendoDropDownList").value(this.option.defaultValues.defaultModule);
				$this.element.find('#measureSystem').data("kendoDropDownList").value(this.option.defaultValues.measureSystem);
				$this.element.find('#language').data("kendoDropDownList").value(this.option.defaultValues.language);
				if(this.option.defaultValues.isShowMessage){
					$this.element.find('#isShowMessage').prop('checked', true);
				}else{
					$this.element.find('#isShowMessage').prop('checked', false);
				}
				if(this.option.defaultValues.noOfErrorMessages){
					$this.element.find('#noOfErrorMessages').val(this.option.defaultValues.noOfErrorMessages);
				}
				if(this.option.defaultValues.timeOfMessages){
					$this.element.find('#timeOfMessages').val(this.option.defaultValues.timeOfMessages);
				}
				if(this.option.defaultValues.messageScrollCount){
					$this.element.find('#messageScrollCount').val(this.option.defaultValues.messageScrollCount);
				}
				if(this.option.defaultValues.messageScrollSpeed){
					$this.element.find('#messageScrollSpeed').val(this.option.defaultValues.messageScrollSpeed);
				}
				if(this.option.defaultValues.zoomRange){
					$this.element.find('#zoomRange').val(this.option.defaultValues.zoomRange);
				}
				if(this.option.defaultValues.initGapTime){
					$this.element.find('#initGapTime').val(this.option.defaultValues.initGapTime);
				}
				if(this.option.defaultValues.initGapTimeFormat){
					$this.element.find('#initGapTimeFormat').data("kendoDropDownList").value(this.option.defaultValues.initGapTimeFormat);
				}
				if(this.option.defaultValues.noOfMessages){
					$this.element.find('#noOfMessages').val(this.option.defaultValues.noOfMessages);
				}
				$this.element.find('#isShowMessage').prop('checked', true);
			},
			
			_fetchUserLevelPreferences : function(){
				
			},
			
			_fetChModuleLevelPreferences : function() {
				var prefParams = {
					action : "fetch",
					moduleId : $si.viewer.queryParams.moduleId,
					userId	 : "-1",
				};
				$si.routes.saveAndFetchApplicationPreferences(this._onModuleLevelPreferencesSuccess.bind(this),this._onModuleLevelPreferencesFailure.bind(this),prefParams);
			},
			_onModuleLevelPreferencesSuccess : function(data){
				this._setControlValues(data);
			},
			
			_onModuleLevelPreferencesFailure : function(data){
				console.log(data);
			},
		});
});