/**
 * @author kartik.raina
 */
define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.window',
    'map/com.spacetimeinsight.i18N.map',
    'map/com.spacetimeinsight.i18N.map.regional',
    'map/com.spacetimeinsight.viewer.ui.baseLassoListener',
],function($,$si){
	$.widget('spacetimeinsight.siViewerSaveLasso',$.spacetimeinsight.siViewerWindow,{
		options:{
			shimRequired : true,
			toolBarWidget: null,
			windowAttributes : {
				width 		: "235px",
				height 		: "178px",
				minWidth	: "235px",
				minHeight	: "178px",
				maxWidth	: "250px",
				maxHeight	: "200px",
				modal		: true,
				position: {
					top		: "250px",
					left	: "400px",
				},
				resizable: false,
			},
			windowIcon		: "css/images/lasso_window.png",
			counter : 1,
			actions 	  	: ["Close"],
			title		  	: $si.i18N.Map.saveLasso.title,
		},
		
		
			pluginName:"siViewerSaveLasso",
			
			LASSO_SAVE_DIV   :  kendo.template("<div class='lassosave-icon'>"+
					"<div class= 'lasso-wrapper'><div class'lassoname'>#= lassoname #: </div>" +
					"<div class='savelassotext'><input type='text' value='' id='savelassoname' name = 'savelassoname'/></div>" +
					"<div class='lassodesc' style='margin-top:10px;'>#= lassodescription #: </div>" +
					"<div class='lassodesctext'><textarea rows='3' type='textarea' value='' id='savelassodesc' style='resize:none' name = 'savelassod;6esc' placeholder='#= lassoplaceholder #' /></div></div>" +
					"<div class='saveandcancel-icons'><input type='button' value='#= saveLasso #' title='#= saveLasso #' id ='save' class='apply-button' style='margin-right: 10px; min-width: 50px; width:80px;'/><input type='button' value='#= cancelLasso #' title='#= cancelLasso #' id ='cancel' class='cancel-button' style='min-width: 50px; width:80px;'/></div>" +
					"</div>"),
					
			
			_create: function(){
				var $this = this;
				var $options = this.options;
				this._super();
				$(this.element).data("kendoWindow").center();
            	this.element.parent().css("z-index","9000002");
				$(".k-overlay").css("z-index","9000001");
				$(".sti-window-google-earth").hide();
				//$this.element.parent().find(".k-window-titlebar").remove();
				$(this.element).append($this.LASSO_SAVE_DIV({lassoname:$si.i18N.Map.saveLasso.lassoname, lassodescription:$si.i18N.Map.saveLasso.lassodescription, saveLasso:$si.i18N.Map.saveLasso.savelasso, cancelLasso:$si.i18N.Map.saveLasso.cancellasso, lassoplaceholder: $si.i18N.Map.saveLasso.lassoplaceholder}));
				$(this.element).parent().css("padding-top","0px");
				$($this.element).find("#cancel").click(function(event) {
					$si.events.triggerLassoEvent($si.events.LassoEvents.clearNewlyDrawnLasso, {});
					$this.closeWindow(event);
					$(".sti-window-google-earth").show();
					
				});
				var dialog = $("#savelassoWindow").data("kendoWindow");
				dialog.bind("close", $this.window_close);
				$("#savelassoname").kendoValidator({
				rules: {
					dataEmpty: function(element) {
						var lassoName =  $.trim($($this.element).find("#savelassoname").val());
						//var lassoDescription = $.trim($($this.element).find("textarea#savelassodesc").val());
						if(lassoName){
							return true;
						}	
						return false;
					},
					dataLength : function(){
						var lassoName =  $.trim($($this.element).find("#savelassoname").val());
						if(lassoName.length <= 30){
							return true;
						}	
						return false;
					},
					dataRegularExpression : function(){
						var lassoName =  $.trim($($this.element).find("#savelassoname").val());
						var regex = new RegExp('^[a-zA-Z0-9\_ ]+$');
						if(regex.test(lassoName)){
							return true;
						}
						return false;
					},
					dataDuplicateName : function(){
						var lassoName =  $.trim($($this.element).find("#savelassoname").val());
						if(!($si.mapUtils.isLassoNameAlreadyPresentForCurrentUser(lassoName))){
							return true;
						}
						return false;
					},
					
				},
				messages: {
					dataEmpty: $si.i18N.Map.saveLasso.lassonameemptyerror,
					dataLength : $si.i18N.Map.saveLasso.lassonameexceederror, 
					dataRegularExpression : $si.i18N.Map.lassomessages.specialcharactersvalidation,
					dataDuplicateName : $si.i18N.Map.saveLasso.lassonamealreadtexistserror,
					
				}
			});
			$("textarea#savelassodesc").kendoValidator({
				rules: {
					dataLength : function(){
						var lassoDescription = $.trim($($this.element).find("textarea#savelassodesc").val());
						if(lassoDescription.length <= 100){
							return true;
						}	
						return false;
					},
					dataRegularExpression : function(){
						var lassoDescription = $.trim($($this.element).find("textarea#savelassodesc").val());
						var regex = new RegExp('^[a-zA-Z0-9\_ ]+$');
						if(lassoDescription != "" && !regex.test(lassoDescription)){
							return false;
						}
						return true;
					},
				},
				messages: {
					dataLength : $si.i18N.Map.saveLasso.lassodescriptionexceederror, 
					dataRegularExpression : $si.i18N.Map.lassomessages.specialcharactersvalidation,
					dataDuplicateName : $si.i18N.Map.saveLasso.lassonamealreadtexistserror,
					
				}
			});
				
				$($this.element).find("#save").click(function(event) {
					var lassoName =  $($this.element).find("#savelassoname").data("kendoValidator");
					var regex = new RegExp('^[a-zA-Z0-9\_ ]+$');
					var lassoDescription = $($this.element).find("textarea#savelassodesc").data("kendoValidator");
					if ((!lassoName.validate())) {
		         		return false;
		         	}
		         	if((!lassoDescription.validate())){
		         		return false;
		         	}else{
		         		var lassoNameval =  $.trim($($this.element).find("#savelassoname").val());
		         		var lassoDescval =  $.trim($($this.element).find("#savelassodesc").val());
						$($si.viewer).trigger("setLassoData", [lassoNameval, lassoDescval]); 
						$this.closeWindow(event);	
						$(".sti-window-google-earth").show();
					}
				});
			},
			
			_showErrorOnSaveWindow : function(message) {
				var notification = new $si.notification.Notification({
					errorMessage	: message,
					sourceId		: $.spacetimeinsight.siViewerBaseLassoListener.LassoErrorCounter++,
					source			: $si.i18N.Map.saveLasso.title,
				});
				$si.viewer.notification.trigger("showMessage",notification);
			},
			
			_showInfoOnSaveWindow : function(message) {
				var notification = new $si.notification.Notification({
					errorMessage	: message,
					sourceId		: $.spacetimeinsight.siViewerBaseLassoListener.LassoErrorCounter++,
					source			: $si.i18N.Map.saveLasso.title,
				});

				$si.viewer.notification.trigger("showMessage", notification);
			},
			window_close : function(){
					$si.events.triggerLassoEvent($si.events.LassoEvents.clearNewlyDrawnLasso, {});
					$(".sti-window-google-earth").show();
			},
	});
});