//need to update data Filter component with iframe true.

define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.window',
    'analytics/com.spacetimeinsight.i18N.analytics.reditableparams.regional',
    'siDropDownList',
    'siDateTimePicker',
    'windowUtil',
],function($,$si) {

		var AnalyticsParam = function(Name, Value, Type) {
		this.name = Name;
		this.value = Value;
		this.type = Type;
		}
		
		var AnalyticsParams = function(value) {
		this.value = [];
		}
		
		$.widget('spacetimeinsight.siViewerREditableParameters', $.spacetimeinsight.siViewerWindow,{
		    options :{
				windowAttributes : {
					minWidth: "410px",
					minHeight:"180px",        //this is the content min height window minheight automatically set to 180
					//maxWidth: "680px",
					//maxHeight:"404px",
					position: {
						top		: "380px",
						left	: "280px"
					},
				},
		        data 			: [],
				windowTools 	: ["FAVORITE"],
		        drawerWidget 	: "",
		        _ruleIndex	  	: 0,
		        shimRequired	: true,
		        dashboards	  	: [],
		        //group 			: "Time Filters",
		        windowIcon 		: "css/images/runanalysis_window.png",
		        groupIcon		: "css/images/runanalysis_window.png",
		        filterInputRenderer   : "",
		        layerTimeProperties	  : "",
		        showHelpDropdown	: true,
		        
			},

			pluginName:"siViewerREditableParameters",
			
			REDITABLE_PARAMS_CONTAINER : kendo.template("<div class='reditable-params-container'></div>"),
            REDITABLE_PARAMS_PROCESES : kendo.template("<div id='process_dialog' style='display:none' class='process_dialog'><div class='process_dialog_container'><span class='p-img'></span><span class='p-label'>"+$si.i18N.REditableParams.regionalData.processRunning+"</span></div></div>"),
            REDITABLE_PARAMS_LABEL : kendo.template("<div id='#= id #' data-varname= '#= varname #' data-type='#= vartype #'><span class='label_text' title='#= labelTitle #'><lable>#= label #</lable></span></div>"),
            REDITABLE_PARAMS_LABEL_VALIDIATION :kendo.template("<span class='error_label'></span>"),
            REDITABLE_PARAMS_TEXT : kendo.template("<span><input type='#= text #' id='#= id #'id='#= id #' data-type='#= datatypeinput #' /></span>"),
            CONTROL_BUTTONS_TEMPLATE : kendo.template("<div id='#= rparamwindow #_controlButtons' class='analyticsparams-control-buttons'>" +
            									"<button id='#= rparamwindow #_close' type='button' class='cancel-button' style='float: right; margin-right: 10px; margin-top: 10px;'> #= controlButtons.close #</button>"+
												"<button id='#= rparamwindow #_run' type='button' class='apply-button' style='float: right; margin-right: 10px; margin-top: 10px;'> #= controlButtons.run #</button>"+
												"<button id='#= rparamwindow #_reset' type='button' class='action-button' style='float: right; margin-right: 10px; margin-top: 10px;'> #= controlButtons.reset #</button>"+
												"</div"),
			ANALYSIS_APPLIED_TO_TEMPLATE : kendo.template("<div class='analysis-applied-to'><span class='analysis-affected-lable'>"+$si.i18N.REditableParams.regionalData.analysisWillUpdate+"</span><span>: </span><div class='analysis-affected-text'><span></span></div></div>"),

			_create : function(){
				/*var that = this;
				//used in event handling. Each event is prefix by plugin name
				this.widgetEventPrefix = this.pluginName + "_";
				//Analysis window id
				this.options.id = $(this.element).attr("id");
	*/
				//this will add window
				this._super();
				
				
							
			},
			
			
			_createControls : function(){
				var that = this;
				this._super();
				var height = 0;
			    var labelCnt =0;  
				//$(this.element).data("kendoWindow").wrapper.show();
				this.bringWindowToFront();
				$(this.element).width("100%");
				
				//display at center
				$(this.element).data("kendoWindow").center();
				//console.log("config ->");
				//console.log(this.options.windowConfig);
				var varAnalyticsEditableParams = [];
				if(this.options.runAnalyticsParams) {
					varAnalyticsEditableParams = this.options.runAnalyticsParams;
				} else {
					if (this.options.windowConfig.analyticsEditableParams) {
						varAnalyticsEditableParams = this.options.windowConfig.analyticsEditableParams;
					} else {
						varAnalyticsEditableParams = this.options.windowConfig.analyticsEditableParameters;
					}
				}
				$(this.element).append(this.REDITABLE_PARAMS_CONTAINER({}));
				
				this.options.rEditableContainer = $(this.element).find(".reditable-params-container");
				
				var parentDivContainer = $(this.element).find(".reditable-params-container");
				parentDivContainer.parent().prepend(that.REDITABLE_PARAMS_PROCESES({}));

				this.options.processDialog = $(this.element).find("#process_dialog");
                height = $(this.element).height();
				labelCnt=1;
				$.each(varAnalyticsEditableParams, function( index, value ) {
					
					//label render
					labelCnt = labelCnt + 1;
					height = height + 35;
					var lblVal = value.label.replace(/\ /g, '_');
					var title = (value.description == undefined || value.description == '' ) ? value.name : value.description;
					//required asterisk.
					if (value.mandatory) {
						value.label=value.label+'*';
					}
					parentDivContainer.append(that.REDITABLE_PARAMS_LABEL({id: "paramName_"+that.options._ruleIndex, label:value.label, varname:value.name, vartype:value.type,labelTitle:title}));
                	
                	//error label render
                	parentDivContainer.append(that.REDITABLE_PARAMS_LABEL_VALIDIATION({}));
					
					//html control render
					var lableDivContainer = parentDivContainer.find("#paramName_"+that.options._ruleIndex);
						
					if(value.type == "java.util.Date") {
						lableDivContainer.append(that.REDITABLE_PARAMS_TEXT({text: "Date", id: "paramVal_"+that.options._ruleIndex, datatypeinput: "Date"}));
						var htmlDateControl = parentDivContainer.find("#paramVal_"+that.options._ruleIndex);
						htmlDateControl.siDateTimePicker({format: "yyyy-MM-dd HH:mm:ss", shimRequired:true});
						htmlDateControl.attr("placeholder", "yyyy-MM-dd HH:mm:ss");
					} else if (value.type == "java.lang.Integer") {
					    lableDivContainer.append(that.REDITABLE_PARAMS_TEXT({text: "number", id: "paramVal_"+that.options._ruleIndex, datatypeinput: "Number"}));
					} else  {
						lableDivContainer.append(that.REDITABLE_PARAMS_TEXT({text: "text", id: "paramVal_"+that.options._ruleIndex, datatypeinput: "everything-else"}));
					}
					
					var htmlControl = parentDivContainer.find("#paramVal_"+that.options._ruleIndex);
					
					if (value.mandatory) {
						htmlControl.attr("required", "required");
					}
					//adding value to the existing html control.
					if (value.value) {
						htmlControl.val(value.value);
					}
					
					//adding hints to the existing html control, if any..
					htmlControl.attr('title', title);
					
					//adding length to the existing html control, if any..
					if (value.lenght) {
						if (value.type == "java.util.Date" && value.lenght < 20) {
							value.lenght = 20;
						} 
						//htmlControl.attr('maxlength', value.lenght);
						if(value.lenght > 100) {
							value.lenght = 100;
						}
						htmlControl.css("width", 8*(value.lenght)+"px");
					}
					that.options._ruleIndex++;
				});
				
				if(this.options.dashboards && this.options.dashboards.length > 0){
					this._addAnalysisAppliedToText();
				}
										
				$(this.element).append(this.CONTROL_BUTTONS_TEMPLATE({
						rparamwindow:that.options.id,
						controlButtons:$si.i18N.REditableParams.regionalData.controlButtons
					}));
				var controlBox =$(this.element).find( "#" + that.options.id + "_controlButtons");
				//default values button 
				controlBox.find("#" + that.options.id + "_reset").bind("click",function(event){
                    var parentDivContainer = $(that.element).find(".reditable-params-container");
                    var editableParams = [];
                    if(that.options.isLayerRightClick) {
                    	editableParams = that.options.windowConfig.analyticsEditableParameters;
                    } else {
                    	editableParams = that.options.windowConfig.analyticsEditableParams;
                    }
                	$.each(editableParams, function( index, value ) {
					var htmlControl = parentDivContainer.find("#paramVal_"+index);
					//adding value to the existing html control.
					if(value.value != undefined && value.value != '') {
						htmlControl.val(value.value);
						}
					}); 
                 });

				//validation.
				controlBox.find("#" + that.options.id + "_run").bind("click",function(event){
				var anyError = false;
				$("input[id^='paramVal_']").each(function(input){
    			var value = $(this).val();
    			var dataType = $(this).attr("data-type");
    			var id = $(this).attr('id');
    			
					if ((value == null || value == "") && this.required) {
      					$("#"+id).closest('div').next(".error_label").text('value must be entered');
      						anyError = true;
      						 $(this).css("border-color","red");
      						//break;
      						} else if (dataType === "Number" && value.match(/[a-z -()+]+$/)){
      							$("#"+id).closest('div').next(".error_label").text('Number format is not correct');
      							anyError = true;
      						} else if (dataType === "Date" && isNaN(Date.parse(value))) {
      							$("#"+id).closest('div').next(".error_label").text('Date format is not valid');
      							anyError = true;
      						} else{
      						$(this).css("border-color","");
					     	$("#"+id).closest('div').next(".error_label").text('');	     
    				  	}
    				});
    				if (!anyError){
    				     
    					that._runAnalytics(event);
    				}		  
				});
				
				//close button.									
				controlBox.find("#" + that.options.id + "_close").bind("click",function(event){
					var newValues = that._getAnalyticsParams().value;
					$.each(varAnalyticsEditableParams, function(index, oldData) {
						$.each(newValues, function(index, newData) {
							if(newData.name == oldData.name) {
								newData.inputFieldLength = oldData.inputFieldLength;
								newData.label = oldData.label;
								newData.lenght = oldData.lenght;
								newData.mandatory = oldData.mandatory;
							}
						});
					});
					that._trigger("onRwindowClose", null, {'values' : newValues});
                    that.closeWindow(event);
                 });
				
				//prevent vertical resize
				this._preventVerticalResize();
				//adjusting height
				if (labelCnt>8) 
				 {				   
				   height=500;
				 } 
				$(this.element).height(height);
				
			},		
			_preventVerticalResize : function(){
				$(this.element).siblings("div[class^='k-resize-handle k-resize-']").remove();
				$(this.element).after("<div class='k-resize-handle k-resize-e'></div");
				$(this.element).after("<div class='k-resize-handle k-resize-w'></div");
			},
			
			_addAnalysisAppliedToText: function(){
				var $this = this;
				var parent = $(this.element).find(".reditable-params-container");
				parent.append(this.ANALYSIS_APPLIED_TO_TEMPLATE({}));
				
				var span = $(this.element).find("div.analysis-affected-text span");
				var spanText = '';
				$.each(this.options.dashboards, function(index, data){
					spanText = span.text();
					if(spanText){
		    			spanText = spanText.trim() + ", ";
		    		}
					spanText += data.title ? data.title : data.id;
					span.text(spanText);
					span.attr('title', spanText);
				});
			},
			
			getWindowContentFavoriteSettings : function() {
				return this._getAnalyticsParams();
			},
			
			applyWindowContentFavoriteSettings  : function(favorite) {
				var parentDivContainer = $(this.element).find(".reditable-params-container");
				if(favorite){
					var favData = favorite.value;
					$.each(favData, function( index, data ) {
						var htmlControl = parentDivContainer.find("div").attr("data-varname", data.name);
						
						//adding favorite content to the existing html control.
						if(data.value != undefined && data.value != '') {
							if(data.type == "java.util.Date") {
								htmlControl.find("input#paramVal_" + index).data('kendoDateTimePicker').value(data.value);
							} else {
								htmlControl.find("input#paramVal_" + index).val(data.value);
							}
						}
					}); 
				}
			},
			
			_getAnalyticsParams: function(){
				var parent = $(this.element).find(".reditable-params-container");
				var analyticParams = new AnalyticsParams();
				var analyticParam;
				parent.children('div[id ^= paramName]').each(function(index, value){
					analyticParam = new AnalyticsParam($(this).attr("data-varname"), $(this).find("#paramVal_" + index).val(),$(this).attr("data-type") );
					analyticParams.value.push(analyticParam);
				});
				
				return analyticParams;
			},
			
			_runAnalytics : function(event) {
				var analyticParams = this._getAnalyticsParams();
				
				var params = {
						title							: this.options.title, 
				        rprocessName					: this.options.windowConfig.analyticsReRunName,
				      	windowId 						: this.options.windowId,
						layerId		  					: this.options.layerId,
						businessViewId					: this.options.windowConfig.businessViewId,
						businessViewName				: this.options.windowConfig.businessViewName,
						analyticsParams					: analyticParams,
						hasAnalytics					: this.options.windowConfig.hasAnalytics,
						artifactRFile					: this.options.windowConfig.artifactRFile,
						artifactRScript					: this.options.windowConfig.artifactRScript,
						artifactRWorkspaces				: this.options.windowConfig.artifactRWorkspaces,
						artifactROutputParameter		: this.options.windowConfig.artifactROutputParameter
					};
					//this._trigger("onRunAnalysis", null, params);
					this.onRunAnalysis(params);
					
					
				},
				
			onRunAnalysis : function(data){
			
				this._enableRProcessDialog();
				if (this.options.isLayerRightClick) {
	         		$si.routes.setCriteria(data);
	         		//this._trigger("onRunAnalysis", null, data);
				} else {
					this._trigger("onWindowRunAnalysis", null, data);
					//$si.routes.runAnalysis(data, this._setRunAnalyticsParams.bind(this), this.dataFailure);
				}
            },
            
          
            _setRunAnalyticsParams : function(event) {
				try{
					if(event){
						this.options.windowData = event.data;
						this.applyWindowData();
						$('#proceses_dialog').hide();
						$(".reditable-params-container :input").removeAttr('disabled');
					 }
				} catch(e){
					$si.Logger('redittableparameters -> ').error("Error ["+e.message+"] occurred while setting _setRunAnalyticsParams");
					
					this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._setRunAnalyticsParams);
				}
			},
           
            _enableRProcessDialog : function(){
	        	if(this.options.rEditableContainer && this.options.rEditableContainer.length > 0) {
	        		this.options.rEditableContainer.find('input').attr('disabled', 'disabled');
	        	}
	        	var controlBox = $(this.element).find( '#' + this.options.id + '_controlButtons');
	        	controlBox.find('button').attr('disabled', 'disabled');
	        	if(!this.options.processDialog.is(':visible')) {
	        		this.options.processDialog.show();
	        	}
			},
			
		/*	_adjustContentHeight : function(){
				// TODO: using id to get app taskbar (need to look without using id)
				this._super();
				var newHeight = $(this.element).height() - ($("#si-viewer-app-taskbar").height() + 20);
				$(this.element).height(newHeight);
			},*/
			
			
	});

});