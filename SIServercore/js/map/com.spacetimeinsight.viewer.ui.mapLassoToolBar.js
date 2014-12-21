define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.windowToolBar',
    'siDropDownList',
    'siColorPicker',
    'map/com.spacetimeinsight.viewer.ui.saveLasso',
],function($){

	$.widget('spacetimeinsight.siViewerMapLassoToolBar',$.spacetimeinsight.siViewerWindowToolBar,{
		options : {
			toggleDelay : 500,
			windowTools : [],
			lassoTools : ["RECTANGLE","POLYGON","CIRCLE","SPACER","COLOR","LASSOSICONDROPDOWN","SPACER","SAVE","CLEAR","SPACER","MANAGELASSOS"],
			manageLassoJS:"map/com.spacetimeinsight.viewer.ui.manageLasso",
			manageLasso:"siManageLassos",
			tooltip : $si.i18N.Map.lassotooltip,
			closeColorPicker : true,
		},
		pluginName:"siViewerMapLassoToolBar",

		GENERIC_COMPONENT : kendo.template("<div id ='#= id #'  > </div>"),
		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";

			//toolbar id
			this.options.id = $(this.element).attr("id");

			//this will call create method of super.
			this._super();
			this.element.parent().css('top','25px');
			this.element.parent().css('margin-top','24px');
			
			this._createToolBarButtons(this.options.lassoTools);
			$("#colorTool").siColorPicker({
				palette: [
	                        "#7C7C7C","#0000FC","#0000BC","#4428BC","#940084","#A80020","#A81000","#881400","#503000","#007800","#006800","#005800","#004058","#000000",
							"#BCBCBC","#0078F8","#0058F8","#6844FC","#D800CC","#E40058","#F83800","#E45C10","#AC7C00","#00B800","#00A800","#00A844","#008888","#000000",
							"#F8F8F8","#3CBCFC","#6888FC","#9878F8","#F878F8","#F85898","#F87858","#FCA044","#F8B800","#B8F818","#58D854","#58F898","#00E8D8","#787878",
							"#FCFCFC","#A4E4FC","#B8B8F8","#D8B8F8","#F8B8F8","#F8A4C0","#F0D0B0","#FCE0A8","#F8D878","#D8F878","#B8F8B8","#B8F8D8","#00FCFC","#F8D8F8",
                   		 ],
				value: kendo.parseColor("#00FF00"),
				shimRequired :	true,
				close: function (event) {
					if($this.options.closeColorPicker){
						var colorValue = $("#colorTool").data('kendoColorPicker').value();
						$si.events.triggerLassoEvent($si.events.LassoEvents.setColorAndTransparency, {lassoFillColor: colorValue, lassoTransparency: $('#slidertext').val()});
					}else{
						$this.options.closeColorPicker = true;
						event.preventDefault();
					}
		        },
		        change : function (event){
		        	$this.options.closeColorPicker = false;
		        	// If the user selects only the color the color picker should not close. 
		        	// It will only close when user selects the color and then clicks on color picker button 
		        },
			});

			$($si.viewer).bind("deactivateButtons", function(){
				$this.deactivateButtons();
			});

			$($si.viewer).bind("deactivateClearButton", function(){
				$this.deactivateClearButton();
			});
			
			$($si.viewer).bind("activateButtons", function(){
				$this.activateButtons();
			});
			$this.deactivateButtons();

			this._trigger("onCreationComplete",{id:this.options.id,domElement:$(this.element)});
			if($si.viewer.privilegeObservable.privileges){
					for(var i = 0; i< $si.viewer.privilegeObservable.privileges.length; i++){
						if($si.viewer.privilegeObservable.privileges[i].name == "HTMLVIEWER"){
							var htmlRights = $si.viewer.privilegeObservable.privileges[i];
							if(htmlRights.subRights){
								for(var j=0; j<htmlRights.subRights.length; j++){
									var subRight = htmlRights.subRights[j];
									if(subRight.name == "HTMLVIEWER_RECTANGLE"){
										if(!subRight.hasCreate){
											$($this.element).find("#rectangleTool").attr('disabled',true);
										}
									}
									if(subRight.name == "HTMLVIEWER_POLYGON"){
										if(!subRight.hasCreate){
											$($this.element).find("#polygonTool").attr('disabled',true);
										}
									}
									if(subRight.name == "HTMLVIEWER_CIRCLE"){
										if(!subRight.hasCreate){
											$($this.element).find("#circleTool").attr('disabled',true);
										}
									}
									if(subRight.name == "HTMLVIEWER_LINETHICKNESS"){
										if(!subRight.hasRead){
										$($this.element).find("#lassosicon").attr('disabled',true);
											var dropdownlist = $("#lassosicondropdownTool").data("kendoDropDownList");
											dropdownlist.enable(false);
										}
									}
									if(subRight.name == "HTMLVIEWER_MANAGELASSO"){
										if(!subRight.hasRead){
											$($this.element).find("#managelassosTool").attr('disabled',true);
										}
									}
									if(subRight.name == "HTMLVIEWER_CLEAR"){
										if(!subRight.hasRead){
											$($this.element).find("#clearTool").attr('disabled',true);
										}
									}
									if(subRight.name == "HTMLVIEWER_LASSO_SAVE"){
										if(!subRight.hasRead){
											$($this.element).find("#saveTool").attr('disabled',true);
										}
									}
									if(subRight.name == "HTMLVIEWER_COLORPICKER"){
										if(!subRight.hasRead){
											var colorValue = $("#colorTool").data('kendoColorPicker');
											colorValue.enable(false);
										}
									}
								}
							}
						}
					}
					
				}

		},

		_triggerDrawLassoShapeEvent : function(shapeType) {
			$si.events.triggerLassoEvent($si.events.LassoEvents.onDrawLassoShape, {lassoShapeType:shapeType});
			this.activateButtons();
		},

		_createToolBarButtons : function(tools){
			var $this = this;
			var leftToolbarDiv = $($this.element).find("#leftToolbarDiv");
			var rightToolbarDiv = $($this.element).find("#rightToolbarDiv");
			if(tools){
				if(!(tools instanceof Array)){
					tools = [tools];
				}
				$(tools).each(function(index,tool){
					var toolId = tool.toLowerCase();
					switch (tool){
						 case "LASSOSICONDROPDOWN":
							leftToolbarDiv.append($this.COMBODROPDOWN({"tool":toolId}));
							$($this.element).find("#" + toolId +"Tool").parent().prop('title',$si.i18N.Map.lassotooltip.lassosicondropdown);
							$($this.element).find("#" + toolId +"Tool").siDropDownList({
								dataTextField: "text",
						        dataValueField: "value",
						        shimRequired :	true,
								dataSource : [
								              { text: "1 px", value: 1 },
								              { text: "2 px", value: 2 },
								              { text: "3 px", value: 3 },
								              { text: "4 px", value: 4 },
								              { text: "5 px", value: 5 },
								              { text: "6 px", value: 6 },
								              { text: "7 px", value: 7 },
								              { text: "8 px", value: 8 },
								              { text: "9 px", value: 9 },
								              { text: "10 px", value: 10 }
								             ],
								 open: function(e) {
								 	$("#lassosicondropdownTool-list").closest('.k-animation-container').children().prepend($this.IFRAME_CONTAINER({id:"lassosicondropdownTool"}));
								 },
								 select: function(e) {
									 var dataItem = this.dataItem(e.item.index());
									 $si.events.triggerLassoEvent($si.events.LassoEvents.setLineThickness, {lassoLineThickness: dataItem.value});
								 },
							});
							$("#lassosicondropdownTool").data('kendoDropDownList').value("2");

							$this._bindClickEvent(toolId);
						break;
						 case "COLOR":
							 $this._super(tool);
							 $($this.element).find("#" + toolId +"Tool").parent().prop('title',$si.i18N.Map.lassotooltip.color);
							 break;
						default :
							$this._super(tool);
					}

				});
				$($this.element).find("#polygonTool").click(function() {
					$this._triggerDrawLassoShapeEvent($si.viewer.LASSO_SHAPES.POLYGON);
				});

				$($this.element).find("#circleTool").click(function() {
					$this._triggerDrawLassoShapeEvent($si.viewer.LASSO_SHAPES.CIRCLE);
				});

				$($this.element).find("#rectangleTool").click(function() {
					$this._triggerDrawLassoShapeEvent($si.viewer.LASSO_SHAPES.RECTANGLE);
				});

				$($this.element).find("#managelassosTool").click(function() {
					
					var params = {
							pluginName : $this.options.manageLasso,
							pluginJS   : $this.options.manageLassoJS,
							windowId   : "manageLassosWindow",
							parameters : {shimRequired : true,},
					};
					
					$si.windowUtil.openWindow(params, true);
				});

				$($this.element).find("#clearTool").click(function() {
					$si.events.triggerLassoEvent($si.events.LassoEvents.clearNewlyDrawnLasso, {});
				});

				$($si.viewer).bind("cancelLasso", function(){
					$this.deactivateButtons();
				});

				$($si.viewer).bind("setLassoData", function(e, lassoName, lassoDescription){
					$this.deactivateButtons();
				});

				$($si.viewer).bind("lassosSaved", function(e){
					$this.deactivateButtons();
				});
				
				$($this.element).find("#lassosicon").attr("title", $si.i18N.Map.lassotooltip.lassosicondropdown);
				
				$($this.element).find("#lassosicon").click(function() {
					var dropdownlist = $("#lassosicondropdownTool").data('kendoDropDownList');
                    dropdownlist.open();
                });

			}
		},

		updateIcons : function(toolId) {
			var tool = $("#"+toolId);
			if(tool.prop("disabled")){
				tool.removeClass("lasso-"+toolId.toLowerCase()+"-enabled");
				tool.addClass("lasso-"+toolId.toLowerCase()+"-disabled");

			}else{
				tool.removeClass("lasso-"+toolId.toLowerCase()+"-disabled");
				tool.addClass("lasso-"+toolId.toLowerCase()+"-enabled");
			}
		},
		
		deactivateButtons:function(){
			$("#clearTool").attr("disabled", true);
			$("#saveTool").attr("disabled", true);
			this.updateIcons("clearTool");
			this.updateIcons("saveTool");

			$("#polygonTool").attr("disabled", false);
			$("#circleTool").attr("disabled", false);
			$("#rectangleTool").attr("disabled", false);
			if($si.viewer.lassoShapesData.lassoData.length == 0){
				$(".managelassos-icon").attr('disabled',true);
			}else{
				$(".managelassos-icon").attr('disabled',false);
			}
			this.updateIcons("polygonTool");
			this.updateIcons("circleTool");
			this.updateIcons("rectangleTool");
			this.updateIcons("managelassosTool");
		},

		deactivateClearButton:function(){
			$("#clearTool").attr("disabled", true);
			this.updateIcons("clearTool");
		},
		
		deactivateManageLassoIcon : function(){
			$(".managelassos-icon").attr('disabled',true);
			this.updateIcons("managelassosTool");
		},
		
		activateManageLassoIcon : function(){
			if($si.viewer.lassoShapesData.lassoData.length == 0){
				$(".managelassos-icon").attr('disabled',true);
			}else{
				$(".managelassos-icon").attr('disabled',false);
			}
			this.updateIcons("managelassosTool");
		},
		
		activateButtons:function(){
			$("#rectangleTool").attr("disabled", true);
			$("#polygonTool").attr("disabled", true);
			$("#circleTool").attr("disabled", true);
			if($si.viewer.lassoShapesData.lassoData.length == 0){
				$(".managelassos-icon").attr('disabled',true);
			}else{
				$(".managelassos-icon").attr('disabled',false);
			}

			this.updateIcons("polygonTool");
			this.updateIcons("circleTool");
			this.updateIcons("rectangleTool");
			this.updateIcons("managelassosTool");

			$("#clearTool").attr("disabled", false);
			$("#saveTool").attr("disabled", false);
			this.updateIcons("clearTool");
			this.updateIcons("saveTool");
		},
	});
});