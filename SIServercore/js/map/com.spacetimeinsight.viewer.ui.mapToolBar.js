define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.windowToolBar',
    'map/com.spacetimeinsight.viewer.ui.mapLassoToolBar',
    'map/com.spacetimeinsight.i18N.map',
    'map/com.spacetimeinsight.i18N.map.regional',
    'siDropDownList',
    'mapUtils',
],function($){

	$.widget('spacetimeinsight.siViewerMapToolBar',$.spacetimeinsight.siViewerWindowToolBar,{
		options : {
			toggleDelay 	: 500,
			currentInstance	: null,
			mapTools : ["LASSO","SELECTLASSOS","LASSOFILTERS","SPACER","SEARCH","RULER","STREETVIEW","SHOWGOOGLEMAP","SPACER","LEGEND"],
		},
		pluginName:"siViewerMapToolBar",
		mode : "deactive",

		closeLassoListDropDown : true,
		lassodata :  [],
		lassofilterdata : [

		                    { text: $si.i18N.Map.lassofilterdata.nofilterapplied, value: $.spacetimeinsight.siViewerBaseLassoListener.LASSO_NONE, selected: true , icon : ""},
		                    { text: $si.i18N.Map.lassofilterdata.showallintersections, value: $.spacetimeinsight.siViewerBaseLassoListener.LASSO_INTERSECTIONALL, selected: false ,icon : ""},
		                    { text: $si.i18N.Map.lassofilterdata.showanyintersection, value: $.spacetimeinsight.siViewerBaseLassoListener.LASSO_INTERSECTIONANY, selected: false ,icon : ""},
		                    { text: $si.i18N.Map.lassofilterdata.showallwithin, value: $.spacetimeinsight.siViewerBaseLassoListener.LASSO_UNION, selected: false, icon : ""},
		                    { text: $si.i18N.Map.lassofilterdata.showalloutside, value: $.spacetimeinsight.siViewerBaseLassoListener.LASSO_UNIONCOMPLEMENT, selected: false,icon : ""},
		                  ],
		GENERIC_COMBO : kendo.template("<div id='CheckboxTemplate' class='toolbar-icon' style='width:100%;' title='#= name# #if(isShared && (userLoginId != $si.viewer.userModel.userInfo.loginId)){#(#=userName#)#}##if(description){#-#}##= description #'><div class='k-item check-item' ><span class='lasso-checkbox'><input id = '#=id #'type='checkbox' value='#= lassoData #' class='check-input' #= selected ? 'checked' : '' #/></span><span class='lasso-shape'><img src='#= shapeIcon#'></span><span class='lasso-name' style='overflow: hidden;text-overflow: ellipsis; width: auto; min-width: 65px; max-width: 90px; white-space: nowrap; display: inline-block'>#= name # #if(showUserName){#(#=userName#)#}#</span><span class='lasso-btn' style='display-inline-block'><button id ='lassoszoomicon'  class=#= selected ?'lassosicon-on':'lassosicon-off'# title='"+$si.i18N.Map.lassotooltip.lassosicon+"'/></span></div></div>"),
		COMBO_WITH_ICON : kendo.template("<span width='20px' style='float: left; width: 16px; height: 16px;'><img src='#= icon #'/></span><span style='float: left'>#= text #</span>"),
		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";

			//toolbar id
			this.options.id = $(this.element).attr("id");
			//this will call create method of super.
			this.options.windowTools = ["FAVORITE","SPACER"];
			this._super();
		
			var lassoParams = {
				operation 	: $.spacetimeinsight.siViewerBaseLassoListener.LASSO_GET_ALL_OPERATION,
				userLoginId  : $si.viewer.userModel.userInfo.loginId,
				moduleId	 : $si.viewer.selectedModuleModel.selectedModule.id,
			};

		    $si.routes.serverCallForLassso($this.getAllLassosSuccessForMapToolbar.bind($this), $this.getAllLassosFailForMapToolbar.bind($this), lassoParams);

			$($si.viewer).bind("updateLassoFilterDropDownState", function(e, lassoArray){
				$this._updateLassoFilterDropDownState(lassoArray);
			});
			this._trigger("onCreationComplete",{id:this.options.id,domElement:$(this.element)});

			// change event for updating the lasso drop down data
			$si.viewer.lassoShapesData.bind("change",function(e){
				var lassoDropDownObj = $("#selectlassosTool").data("kendoDropDownList");
				lassoDropDownObj.setDataSource($si.viewer.lassoShapesData.lassoData);
				lassoDropDownObj.refresh();
			});

			$si.viewer.selectedLassosData.bind("change", function(e){
				// If some thing has to be done while inserting or deleting the selected lasso list, please implement it here.
			});

		},

		//Overridden method
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
						case "SEARCH":
							leftToolbarDiv.append($this.SEARCH({ tool:toolId, title: $si.i18N.Map.tooltip.search, defaultText : $si.i18N.Map.searchbox.enterlocation}));
							$this._bindClickEvent(toolId);
						break;
						case "SELECTLASSOS":
						leftToolbarDiv.append($this.COMBO({"tool":toolId}));
						$($this.element).find("#" + toolId +"Tool").parent().prop('title',$si.i18N.Map.tooltip.selectlassos);
						$($this.element).find("#" + toolId +"Tool").addClass("icon-dropdown select-lasso-on");
							$($this.element).find("#" + toolId +"Tool").siDropDownList({
								dataTextField: "name",
						        dataValueField: "lassoData",
						        index: 0,
								//dataSource : $this.lassodata,
								shimRequired:true,
								close: function(e) {
									if(!$this.closeLassoListDropDown){
										 e.preventDefault();
									}

									$this.closeLassoListDropDown = true;
								 },
								 open:function(e){
								 	if($(".dropdown-footer-btn").length < 1){
								 		$("#selectlassosTool_listbox").append("<div class = 'dropdown-footer-btn'></div>");
								 	}
								 },
								 select: function(e){
									 $this.closeLassoListDropDown = false;
								 },
								template: $this.GENERIC_COMBO,
							});
							$this._bindClickEvent(toolId);
					//		$($this.element).find(".select-lasso-on").parent(".toolbar-icon").css("margin-left","5px");
						break;
						case "LASSOFILTERS":
						leftToolbarDiv.append($this.COMBO({"tool":toolId}));
						$($this.element).find("#" + toolId +"Tool").parent().prop('title',$si.i18N.Map.tooltip.lassofilters);
						$($this.element).find("#" + toolId +"Tool").addClass("icon-dropdown lasso-filters-on");
							$($this.element).find("#" + toolId +"Tool").siDropDownList({
								dataTextField: "text",
						        dataValueField: "value",
								dataSource : $this.lassofilterdata,
								shimRequired:true,
								template : $this.COMBO_WITH_ICON,
								change: function(e) {
									$si.viewer.lassoFilterType = $("#lassofiltersTool").data("kendoDropDownList").value();
									$($si.viewer).trigger("applyLassoFilter", true);
								  }
							});
							$this._bindClickEvent(toolId);
							$($this.element).find(".lasso-filters-on").parent(".toolbar-icon").css("margin-left","20px");
						break;
						case "EXCEPTION":
							rightToolbarDiv.prepend($this.EXCEPTION({
								"tool":toolId,
								"tooltip" :$this.options.tooltip[toolId]
							}));
							$this._bindClickEvent(toolId);
							break;
						default :
							$this._super(tool);
					}
				});


				$("#searchfield,#executeSearch").on("click keyup", function(e){
				    if(e.keyCode == 13 || e.type == "click"){
				    	var searchFieldText = $.trim($($this.element).find("#searchfield").val());
						if(searchFieldText != null && searchFieldText != ""){
							$("#executeSearch").trigger("executeSearch", [searchFieldText]);
						}
				    }       
				});
				$('#searchfield').on('focusout', function(){
			        if($.trim($($this.element).find("#searchfield").val()) == ''){
			            $($this.element).find("#searchfield").val($si.i18N.Map.searchbox.enterlocation);
			         }
			    });
			    $('#searchfield').on('focus', function(){
			        if($.trim($($this.element).find("#searchfield").val()) == $si.i18N.Map.searchbox.enterlocation){
			            $($this.element).find("#searchfield").val("");
			         }
			    });

				$("#legendTool").click(function() {
					$("#legendTool").trigger("_showLegend");
				});

				$("#lassoTool").click(function() {
					$("#lassoTool").trigger("_showLassoTools");
				});

				$("#lassoszoomicon").click(function(event){
					var value = event.target.parentElement.childNodes[0].value;
					var isChecked =  event.target.parentElement.childNodes[0].checked;
				});
				$("#rulerTool").click(function() {
					var paramArray = $si.mapUtils.getMeasurementParameters();
					if($this.mode ==  "deactive"){
						$this.mode = "active";
						$($this.element).find("#"+this.id).removeClass( "ruler-disabled");
						$($this.element).find("#"+this.id).addClass("ruler-enabled");
					}else{
						$this.mode = "deactive";
						$($this.element).find("#"+this.id).removeClass( "ruler-enabled");
						$($this.element).find("#"+this.id).addClass("ruler-disabled");
					}
					
					$("#rulerTool").trigger("distanceCalculation", [$this.mode, paramArray[0], " "+paramArray[1], " "+paramArray[2]]);
				});

				// Show Google Map View
				$($this.element).find("#showgooglemapTool").click(function() {
					$("#showgooglemapTool").trigger("openGMapsCall");
				});

				// Show Google Street View
				$($this.element).find("#streetviewTool").click(function() {
					$("#streetviewTool").trigger("openGoogleStreetView");
				});

				// Show Legend Data
				$($this.element).find("#exceptionTool").click(function() {
					$("#exceptionTool").trigger("exceptionTool");
				});
				
				$(".lassofiltersIcon").click(function(event) {
					if(event.target.className.indexOf("disabled") > -1){
						$si.viewer.notification.trigger("showInfoMessage", [$si.i18N.Map.lassomessages.lassofiltermessage]);
					}
				});
				$($this.element).find("#drawerTool").click(function(){
					if($(".highlight-color-picker").length){
						$(".highlight-color-picker").data("kendoColorPicker").close();
					}
				});
				//$(this.element).find("#lassoTool").parent(".toolbar-icon").addClass("parent-lasso");
			}
		},

		getAllLassosSuccessForMapToolbar: function(data){
			var $this = this;
				$this._createToolBarButtons($this.options.mapTools);
				$("#rulerTool").addClass("ruler-disabled");
				$si.events.triggerLassoEvent($si.events.LassoEvents.populateLatestLassoData, {lassoDataFromDB: data});
				$("#lassofiltersTool").data("kendoDropDownList").enable(false);
				$(".lassofiltersIcon").find(".k-i-arrow-s").addClass("k-state-disabled");
				$($this.element).find("#searchParentId").css({width:"auto"});
				// Draw/Remove the lasso
				$(document).on("click", ".check-input", function(event){
					if(event && event.target){
						var lassoData = $("#selectlassosTool").data("kendoDropDownList").dataItem();
	
						// if checked then give the call to draw and the add it in the selected lasso list.
						if(event.target.checked){
							$(event.target).closest("li").find(".lassosicon-off").addClass("lassosicon-on");
							$si.viewer.selectedLassosData.selectedLassosArray.push(lassoData.id);
							$si.mapUtils.updateLassoDataByLassoDBId(lassoData.id, "selected", true);
							$si.events.triggerLassoEvent($si.events.LassoEvents.drawSelectLasso, lassoData);
							$($si.viewer).trigger("applyLassoFilter", true);
						}else{
							$si.events.triggerLassoEvent($si.events.LassoEvents.removeSelectLasso,  lassoData);
							$si.mapUtils.removeLassoIdFromSelectedLassoArray(lassoData.id);
							$si.mapUtils.updateLassoDataByLassoDBId(lassoData.id, "selected", false);
							$($si.viewer).trigger("applyLassoFilter", true);
							if($(event.target).closest("li").find(".lassosicon-off").length == 0){
								$(event.target).closest("li").find(".lassosicon-on").addClass("lassosicon-off");	
								$(event.target).closest("li").find(".lassosicon-off").removeClass("lassosicon-on");
							}else{
								$(event.target).closest("li").find(".lassosicon-off").removeClass("lassosicon-on");	
							}
						}
					}
				});
				$(document).on("click", ".dropdown-footer-btn", function(event){
					var dropdownlist = $("#selectlassosTool").data("kendoDropDownList");
					dropdownlist.close();
				});

				$(document).on("click", "#lassoszoomicon", function(event){
					var lassoData = $("#selectlassosTool").data("kendoDropDownList").dataItem();
					if(lassoData.selected){
						$si.events.triggerLassoEvent($si.events.LassoEvents.zoomToLasso,  {lassoInfo : lassoData});
					}
				});
				if($si.viewer.privilegeObservable.privileges){
					for(var i = 0; i< $si.viewer.privilegeObservable.privileges.length; i++){
						if($si.viewer.privilegeObservable.privileges[i].name == "HTMLVIEWER"){
							var htmlRights = $si.viewer.privilegeObservable.privileges[i];
							if(htmlRights.subRights){
								for(var j=0; j<htmlRights.subRights.length; j++){
									var subRight = htmlRights.subRights[j];
									if(subRight.name == "HTMLVIEWER_LASSO"){
										if(!subRight.hasRead){
											$($this.element).find("#lassoTool").attr('disabled',true);
										}
									}
									if(subRight.name == "HTMLVIEWER_SELECT_LASSO"){
										if(!subRight.hasRead){
											var dropdownlist = $($this.element).find("#selectlassosTool").data("kendoDropDownList");
											dropdownlist.enable(false);
										}
									}
									if(subRight.name == "HTMLVIEWER_FILTER_LASSO"){
										if(!subRight.hasRead){
											var dropdownlist = $($this.element).find("#lassofiltersTool").data("kendoDropDownList");
											dropdownlist.enable(false);
										}
									}
									if(subRight.name == "HTMLVIEWER_STREETVIEW"){
										if(!subRight.hasRead){
											$($this.element).find("#streetviewTool").attr('disabled',true);
										}
									}
									if(subRight.name == "HTMLVIEWER_GOOGLEMAP"){
										if(!subRight.hasRead){
											$($this.element).find("#showgooglemapTool").attr('disabled',true);
										}
									}
									if(subRight.name == "HTMLVIEWER_LEGEND"){
										if(!subRight.hasRead){
											$($this.element).find("#legendTool").attr('disabled',true);
										}
									}
									if(subRight.name == "HTMLVIEWER_RULER"){
										if(!subRight.hasRead){
											$($this.element).find("#rulerTool").attr('disabled',true);
										}
									}
								    if(subRight.name == "HTMLVIEWER_EXPORT"){
										if(!subRight.hasRead){
											$($this.element).find("#exporttopngTool").attr('disabled',true);
										}
									} 
									if(subRight.name == "HTMLVIEWER_FAVORITES"){
										if(!subRight.hasRead){
											var menudropdown = $($this.element).find("#favoriteTool").kendoMenu().data("kendoMenu");    
											menudropdown.enable("li", false);
											
										}
									}
								}
							}
						}
					}
					
				}
		},

		getAllLassosFailForMapToolbar: function(error){
			$si.Logger("Map Tool Bar").error("Lasso Failure");
		},

		_updateLassoFilterDropDownState : function(lassoArray){

			var lassoFilterDropDownObj = $("#lassofiltersTool").data("kendoDropDownList");
			var lassoFilterDropDownData = lassoFilterDropDownObj.dataItem();
			var businessViews = $si.businessViewUtil.getLassoableBusinessViewDetails();

			if($si.viewer.lassoFilterType == null || $si.viewer.lassoFilterType == ''){
				$si.viewer.lassoFilterType = $.spacetimeinsight.siViewerBaseLassoListener.LASSO_NONE;
			}

			if(lassoArray.length == 0){
				lassoFilterDropDownObj.enable(false);
				$si.viewer.lassoFilterType =  $.spacetimeinsight.siViewerBaseLassoListener.LASSO_NONE;
				lassoFilterDropDownObj.select(0);
				$(".lassofiltersIcon").removeClass("lassofiltersIcon-applied");
				if(!($(".lassofiltersIcon").find(".k-i-arrow-s").hasClass("k-state-disabled"))){
					$(".lassofiltersIcon").find(".k-i-arrow-s").addClass("k-state-disabled");
				}
			}else if(lassoArray.length >= 2 && businessViews.length > 0){
				$(".lassofiltersIcon").addClass("lassofiltersIcon-applied");
				lassoFilterDropDownObj.enable(true);
				if($(".lassofiltersIcon").find(".k-i-arrow-s").hasClass("k-state-disabled")){
					$(".lassofiltersIcon").find(".k-i-arrow-s").removeClass("k-state-disabled");
				}
			}else if(lassoArray.length < 2 && businessViews.length > 0){
				$(".lassofiltersIcon").addClass("lassofiltersIcon-applied");
				lassoFilterDropDownObj.enable(true);
				if($(".lassofiltersIcon").find(".k-i-arrow-s").hasClass("k-state-disabled")){
					$(".lassofiltersIcon").find(".k-i-arrow-s").removeClass("k-state-disabled");
				}
				if((lassoFilterDropDownData.text == $si.i18N.Map.lassofilterdata.showallintersections) || (lassoFilterDropDownData.text == $si.i18N.Map.lassofilterdata.showanyintersection)){
					$si.viewer.lassoFilterType =  $.spacetimeinsight.siViewerBaseLassoListener.LASSO_NONE;
					lassoFilterDropDownObj.select(0);
				}
			}else {
				lassoFilterDropDownObj.enable(false);
				$si.viewer.lassoFilterType =  $.spacetimeinsight.siViewerBaseLassoListener.LASSO_NONE;
				lassoFilterDropDownObj.select(0);
			}

			// Update the dropdown with the icon according to the selected algo
			var data = $("#lassofiltersTool").data("kendoDropDownList").dataSource._data;
			for(var i = 0; i< data.length ; i++){
				
				//first deselect the old value
				if(data[i].selected){
					data[i].selected = false;
					data[i].icon = "";
				}
				
				//if the current selected filter type is not NONE and some other also the select and put icon.
				//else set the first also i.e. NONE selected.
				if(($si.viewer.lassoFilterType !=  $.spacetimeinsight.siViewerBaseLassoListener.LASSO_NONE) && (data[i].value == $si.viewer.lassoFilterType)){
					data[i].selected = true;
					data[i].icon = "/SIServer/css/images/layerLoaded.png";
				}else if($si.viewer.lassoFilterType ==  $.spacetimeinsight.siViewerBaseLassoListener.LASSO_NONE){
					data[0].selected = true;
					data[0].icon = "/SIServer/css/images/layerLoaded.png";
				}
				
			}
			$("#lassofiltersTool").data("kendoDropDownList").dataSource.data(data);
			
			// Then change the styling
			if(lassoFilterDropDownObj.enable){

				if(lassoArray.length >= 2){
					$("#lassofiltersTool_listbox .k-item")[1].style.opacity = 1;
					$("#lassofiltersTool_listbox .k-item")[2].style.opacity = 1;
					$("#lassofiltersTool_listbox .k-item")[1].style.pointerEvents = "";
					$("#lassofiltersTool_listbox .k-item")[2].style.pointerEvents = "";
				}else if(lassoArray.length < 2){
					
					$("#lassofiltersTool_listbox .k-item")[1].style.opacity = 0.5;
					$("#lassofiltersTool_listbox .k-item")[2].style.opacity = 0.5;
					$("#lassofiltersTool_listbox .k-item")[1].style.pointerEvents = "none";
					$("#lassofiltersTool_listbox .k-item")[2].style.pointerEvents = "none";
				}
			}
		},
	});
});