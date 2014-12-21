/**
 * Google earth plug-in .
 */
define([
    'jquery',
    'jquery-ui',
    'common/com.spacetimeinsight.viewer.ui.window',
    'kendo',
],function($){
		$.widget('spacetimeinsight.siViewerAcknowledgementWindow', $.spacetimeinsight.siViewerWindow,{
			options : {
				windowAttributes : {
					height:"200px",
					width :"400px",
					modal: true,
				},
				title 						: $si.i18N.Application.alertWindow.acknowledgementWindow.title,
				actions 					: ["Close"],
				toolBarWidget 				: "",
				windowIcon 					: "css/images/alert_enabled.png",
				group						: "Alerts",
			    groupIcon					: "css/images/alert_enabled.png",
			    remainingCharacters			: 1000,
			},
			pluginName:"siViewerAcknowledgementWindow",
			DIV : kendo.template("<div id ='#= id #'  > </div>"),
			GENERIC_COMPONENT_CHECKBOX : kendo.template("<input type='checkbox' id ='#= id #' />"),
			GENERIC_COMPONENT_COMBO  : kendo.template("<select id='#= id #' class='#= id #'></select>"),
			GENERIC_COMPONENT_BUTTON : kendo.template("<input type='button' id ='#= id #' value='#= value#' class ='#= className #'/>"),
			//Called on instance creation
			_create: function(){
			this._super();
			$(this.element).data("kendoWindow").center();
			this.element.parent().css("z-index","9000002");
			this.element.parent().css("min-width","261px");
			$(".k-overlay").css("z-index","9000001");
			this._createAcknowledgeWindow();
			},

			_createAcknowledgeWindow:function(){
			var $this = this;
			var data = [
						{text: "None", value:"0"},
						{text: "Default", value:$si.viewer.alertConfigData.autoAckSnoozeInterval},
                        {text: "10 Minutes", value:"600"},
                        {text: "20 Minutes", value:"1200"},
                        {text: "30 Minutes", value:"1800"},
                        {text: "1 Hour", value:"3600"}
                    ];
					var selectedValue = "10"
				$(this.element).append(this.DIV({id:"acknowledmentBox"}));
				var ackBox = $(this.element).find("#acknowledmentBox");
				ackBox.append(this.DIV({id:"ackOuter"}));
				ackBox.append(this.DIV({id:"footerDiv"}));
				var outerContainer = ackBox.find("#ackOuter");
				var footerDiv = ackBox.find("#footerDiv");
				outerContainer.addClass("ack-outer");
				outerContainer.append('<label for="ackComments">'+$si.i18N.Application.alertWindow.acknowledgementWindow.ackCommentsLabel+'</label><textarea id="ackComments" rows="4" cols="30" placeholder="'+$si.i18N.Application.alertWindow.acknowledgementWindow.ackCommentsPlaceholder+'" maxlength="1000"/>');
				outerContainer.append(this.DIV({id:"ackCondition"}));
				//outerContainer.append(this.DIV({id:"noCharactersLeft"}));
				outerContainer.find("#ackComments").keyup(function(event) {
					var textLen = event.currentTarget.value.length;
					outerContainer.find("#noCharactersLeft").text($si.i18N.Application.alertWindow.acknowledgementWindow.remainingCharacters +($this.options.remainingCharacters-textLen));
					if(textLen){
						footerDiv.find("#okButton").prop('disabled', false);
					}else{
						footerDiv.find("#okButton").prop('disabled', true);
					}
				});
				outerContainer.find("#ackCondition").append("<span id = 'maxCharacters' style='float:left;' </span>");//+$si.i18N.Application.alertWindow.acknowledgementWindow.ackCommentsMaxWords);
				outerContainer.find("#ackCondition").append("<span id = 'noCharactersLeft' style='float:right;' </span>");//+$this.options.remainingCharacters);
				outerContainer.find("#maxCharacters")[0].innerHTML = $si.i18N.Application.alertWindow.acknowledgementWindow.ackCommentsMaxWords;
				outerContainer.find("#noCharactersLeft")[0].innerHTML = $si.i18N.Application.alertWindow.acknowledgementWindow.remainingCharacters + $this.options.remainingCharacters;
				outerContainer.find("#ackCondition").addClass("ack-condition")
				outerContainer.append(this.DIV({id:"suppressBlock"}));
				var suppressBlock = outerContainer.find("#suppressBlock");
				suppressBlock.css("padding-top","5px");
				suppressBlock.css("margin-top","20px");
				suppressBlock.append('<label for="ackComments" style="margin-right:5px;">'+$si.i18N.Application.alertWindow.acknowledgementWindow.suppressLabel+'</label>' +this.GENERIC_COMPONENT_COMBO({id:"snoozeTime"}));
				(suppressBlock.find("#snoozeTime")).kendoDropDownList({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: data,
					height: "20px"
                });
                
				footerDiv.append(this.GENERIC_COMPONENT_BUTTON({id : 'okButton', value : $si.i18N.Application.alertWindow.acknowledgementWindow.okButton , className : "apply-button"}));
				footerDiv.append(this.GENERIC_COMPONENT_BUTTON({id : 'cancelButton', value : $si.i18N.Application.alertWindow.acknowledgementWindow.cancelButton, className : "apply-button"}));
				footerDiv.find("#okButton").prop('disabled', true);
				(footerDiv.find('#cancelButton')).click(function(){
					$this.closeWindow();
				});
				(footerDiv.find('#okButton')).click(function(){
					var comments = ($this.element).find("#ackComments").val();
					if($.trim(comments).length == 0){
						alert('Comment is mandatory field. Please provide a valid input.');
						return;
					}
					var snoozeTime = (($this.element).find("#snoozeTime")).data("kendoDropDownList").value();
					var ackData = {
									"comment" : comments ,
									"snoozeTime" : snoozeTime ,
								};
					$this._trigger("alertsacknowledged",null,{data: ackData});
					$this.closeWindow();
				});
			}
		});
});