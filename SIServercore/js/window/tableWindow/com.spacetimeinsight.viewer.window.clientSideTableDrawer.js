define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.drawer',
    'window/com.spacetimeinsight.i18N.window',
    'window/com.spacetimeinsight.i18N.window.regional',
    'dialogBox',
],function($){

	$.widget('spacetimeinsight.siViewerClientSideTableDrawer',$.spacetimeinsight.siViewerDrawer,{
		options : {
			toggleDelay : 200,
			actionButtons	: ["Apply"],
			needTabStrip	: true,
			selected :  null,
			metadataConfig : null,
			hasGeographic : false,
			hiddenCols :[],
		},
		pluginName:"siViewerClientSideTableDrawer",
		
		GENERIC_COMPONENT : kendo.template("<div id ='#= id #' class ='#= cssClass #'>#= content #</div>"),
		INPUT_BOX :  kendo.template("<input type='#= type #' id ='#= id #' style ='#= style #' class ='#= className #'/>"),
		CHECKBOX_CONTROL : kendo.template("<input type='#= type #' id ='#= id #' style ='#= style #' checked='#= checked #' class ='#= className #'/>"), 
		SPAN_COMPONENT : kendo.template("<span style ='#= style #'>#= spanConent #</span>"),
		SPAN_CLASS_COMPONENT : kendo.template("<span style ='#= style #' id ='#=id #'>#= spanConent #</span>"),
		LIST_COMPONENT : kendo.template("<ul id ='#= id #' class ='#= className #'></ul>"),
		
		_create : function(){
			var $this = this;
			//var selected =null;
			
			// used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			$(this.element).addClass("sti-drawer-" + this.pluginName);
			$(this.element).addClass("client-table-drawer");
			this._super();
			var tabStrip = this.options.tabStrip;
			tabStrip.kendoTabStrip({
				dataTextField: "text",
    			dataContentField: "content",
    			dataSource:
    			[{
        			text: $si.i18N.Window.displaySettings,
        			content: this.GENERIC_COMPONENT({id:"contentDrawer",cssClass:"",content:""}),																			// optional.
    			 }]
			});	
			// Table Settings div
			var drawer = $(this.element).find("#contentDrawer");
			drawer.append(this.GENERIC_COMPONENT({id:"tableSettings",cssClass:"section-header",content:$si.i18N.Window.tableSettings}));
			drawer.find("#tableSettings").append(this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""}) + this.GENERIC_COMPONENT({id:"",cssClass:"section-content",content:this.SPAN_COMPONENT({style :"display: table-cell;width: 112px;font-weight:normal;",spanConent: this.SPAN_COMPONENT({style:"padding-left: 50px;white-space: normal;",spanConent:$si.i18N.Window.numberOf}) + this.SPAN_COMPONENT({style:"padding-left: 15px;white-space: normal;display: table-cell;",spanConent:$si.i18N.Window.columnToFreeze})   }) + this.SPAN_COMPONENT({style :"display: table-cell;vertical-align: middle;",spanConent:this.INPUT_BOX({type:"text", id:"columnFreezeNumericTextBox",className:"freeze-width",style:"width: 55px;text-align:center;"})})}));
			
			// Table - to - map div
			drawer.append(this.GENERIC_COMPONENT({id:"tabletomapSettings",cssClass:"section-header",content:$si.i18N.Window.tableToMapCoordinateSettings}));
			drawer.find("#tabletomapSettings").append(this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""})	+ this.GENERIC_COMPONENT({id:"",cssClass:"section-content",content: this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.GENERIC_COMPONENT({id:"",cssClass:"",content:this.SPAN_COMPONENT({style :"display: table-cell;width: 110px; padding-left: 10px;white-space: normal;font-weight:normal;",spanConent: this.SPAN_COMPONENT({style:"padding-left: 7px;white-space: normal;",spanConent:$si.i18N.Window.zoomtoThisAltitude}) + this.SPAN_COMPONENT({style:"white-space: normal;display: table-cell;",spanConent:$si.i18N.Window.whenzoomActive})   })  + this.SPAN_COMPONENT({style :"display: table-cell;vertical-align: middle;",spanConent:this.INPUT_BOX({type:"text",className:"zoom-width",style:"width: 70px;text-align:center;",id:"zoomNumericTextBox"})})}) +  this.GENERIC_COMPONENT({id:"",cssClass:"div-space",content:   this.SPAN_COMPONENT({style :"display: table-cell;vertical-align: middle;padding-right: 5px; float: left;",spanConent:this.CHECKBOX_CONTROL({id:"selectMapItem",checked:"checked",className:"",type:"checkbox",style:"width:15px;height:15px;"})})  + this.SPAN_COMPONENT({style:"display: table-cell; width: 135px; white-space: normal;font-weight:normal; margin-top: 0;float: left;", spanConent:$si.i18N.Window.showItemOnMap})}) + this.GENERIC_COMPONENT({id:"",cssClass:"div-space",content:this.SPAN_COMPONENT({style :"display: table-cell;vertical-align: middle;padding-right: 5px; clear:left; float:left;",spanConent:this.CHECKBOX_CONTROL({type:"checkbox",checked:"checked",style:"width:15px;height:15px;",className:"",id:"zoomMap"})}) + this.SPAN_COMPONENT({style:"display: table-cell;width: 158px;white-space: normal;font-weight:normal; margin-top: 0;float: left;",spanConent:$si.i18N.Window.panZoomOnMap})})   })}));
				
			// Show/Hide div
			drawer.append(this.GENERIC_COMPONENT({id:"showHideColumns",cssClass:"section-header drawer-fix",content:$si.i18N.Window.showHideColumns}));
			drawer.find("#showHideColumns").append(this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""}) + this.GENERIC_COMPONENT({id:"",cssClass:"section-content",content:this.SPAN_CLASS_COMPONENT({id:"column-display-header" , style :"display: table;margin: auto;font-style: italic;font-weight:normal;margin-bottom: 5px;",spanConent:$si.i18N.Window.clickColumnToAddToTable})}) + this.GENERIC_COMPONENT({id:"showHideDiv",cssClass:"showHideSelect",content:this.LIST_COMPONENT({id:"showHide",className:"list-view"})}));

			$this.element.find("#selectMapItem").click ( function() {
			if($this.element.find('input:checkbox[id=selectMapItem]').is ( ":checked" )){
				$this.element.find('input:checkbox[id=zoomMap]').attr('disabled',false);
				
			}else{
				$this.element.find('input:checkbox[id=zoomMap]').prop('checked', false);
				$this.element.find('input:checkbox[id=zoomMap]').attr('disabled',true);
			}
			});
			
			$this.element.find("#showHide").kendoTooltip({
			    filter: "li",
			    show: function (e) {
			        if (this.content.text() != "") {
			            $('[role="tooltip"]').css("visibility", "visible");
			        }
			    },
			    hide: function () {
			        $('[role="tooltip"]').css("visibility", "hidden");
			    },
			    content: function (e) {
			        var element = e.target[0];
			        if (element.offsetWidth < element.scrollWidth) {
			            return e.target.text();
			        } else {
			            return "";
			        }
			    }
			});
			
			
			tabStrip.data("kendoTabStrip").select(0);
			$(this.element).hide();
			this.options.actionButtonClicked = function (event, data) {
			    if (data.buttonId == "Apply") {
			        $this.onApplyButtonClicked(drawer);
			    }
			};
			
			this._trigger("onCreationComplete", {
			    id: this.options.id,
			    domElement: $(this.element)
			});

		},
		
		onApplyButtonClicked: function (drawer) {
		    var $this = this;
		    var items;
		    if ($this.element.find("#showHide").data("kendoListView")) {
		        items = $this.element.find("#showHide").data("kendoListView").select();
		        $.each(items, function (idx, elem) {
		            var dataValue = elem.textContent;
		            $.each($this.options.metadataConfig, function (key, value) {
		                if (value.displayName == dataValue) {
		                    value.hide = false;
		                }
		            });
		        });
		    }
		    var newColumnFreezeValue = 0;
		    $.each($this.options.metadataConfig, function (key, value) {
		        if (value.hide == false) {
		            newColumnFreezeValue++;
		        }
		    });
		    if (newColumnFreezeValue != undefined) {
		        var newColumnValue = newColumnFreezeValue - 1;
		        if ($this.element.find("#columnFreezeNumericTextBox").data("kendoNumericTextBox").value() > newColumnValue) {
		        	$this.element.find("#columnFreezeNumericTextBox").data("kendoNumericTextBox").value(newColumnValue);
		        }
		    }
		    if ($this.options.selected != undefined && $this.options.selected != null) {
		        $this.options.selected.join(", ");
		    }
			
		    var tableDrawerSettings = {
		        "numberColumnFreezeValue": drawer.find("#columnFreezeNumericTextBox").val(),
		        "zoomAltitudeValue": drawer.find("#zoomNumericTextBox").val(),
		        "showItemMapValue": drawer.find("#selectMapItem")[0].checked,
		        "panZoomMapValue": drawer.find("#zoomMap")[0].checked,
		        "showHideColumnValue": $this.options.selected,
		        "hiddenColumns" : $this.options.hiddenCols,
		    }
		    this._trigger("applytabledrawersettings", null, {
		        data: tableDrawerSettings
		    });

		    // remove of items from Kendo ListView
		    if (items && items.length > 0) {
		        $.each(items, function (idx, elem) {
		        	$this.element.find("#showHide").data("kendoListView").remove($(elem));
		        });
		    }
		    if ($this.element.find("#showHide").data("kendoListView") != undefined) {
		        if ($this.element.find("#showHide").data("kendoListView").dataSource.data().length == 0) {
		        	$this.element.find("#showHide").removeClass("k-widget k-listview k-selectable");
		        	$this.element.find("#column-display-header").html("");
		        	$this.element.find("#showHide").html("<div style='text-align:center'>" + $si.i18N.Window.noColumnsToDisplay + "</div>");
		        }
		    }
		    this.toggle();
		},

		 // Show/Hide toolbar
		toggle: function (delay) {
		        $(this.element).slideToggle(delay ? delay : this.options.toggleDelay);
		        if ($(this.element).css("display") != "none") {
		            $(this.element).css("display", "inline-flex");
		        }
		        this._trigger("onToggle", {
		            id: this.options.id,
		            domElement: $(this.element)
		        });
		    },

		    _compare: function (key, value) {
		        if (key.display_name < value.display_name)
		            return -1;
		        if (key.display_name > value.display_name)
		            return 1;
		        return 0;
		    },
		    
		    setHiddenColumnsFavorite : function(columns){
		    	   var $this = this;
			        var hiddenColumnList = [];
			        $.each(columns, function (key, value) {			            
			                hiddenColumnList.push({
			                    display_name: value.display_name,
			                    actual_name : value.actual_name
			                });
			            
			        });
			        $this.options.hiddenCols = hiddenColumnList;
			        if (hiddenColumnList != undefined && hiddenColumnList.length > 0) {
			            hiddenColumnList.sort($this._compare);
			            $this.element.find("#showHide").kendoListView({
			                dataSource: hiddenColumnList,
			                template: "<li class='list-view-content'>#:display_name#</li>",
			                selectable: "multiple",
			                change: function () {
			                    var getHiddenColumns = $this.element.find("#showHide").data("kendoListView").dataSource;
			                    $this.options.selected = $.map(this.select(), function (item) {
			                        return getHiddenColumns._data[$(item).index()].actual_name;
			                    });
			                }
			            });
			        } else {
			        	$this.element.find("#showHide").html("<div style='text-align:center'>" + $si.i18N.Window.noColumnsToDisplay + "</div>");
			        }
		    },

		    setHideColumnList: function (configData) {
		     var $this = this;
		        $this.options.metadataConfig = configData.metadata;
		        $this.options.hasGeographic = configData.windowDatasource.hasGeographicData;
		        var $this = this;
		        var hiddenColumnList = [];
		        var hiddenCol;
		        $.each($this.options.metadataConfig, function (key, value) {
		            if (value.hide == true) {
		                hiddenColumnList.push({
		                    display_name: value.displayName,
		                    actual_name : value.name
		                });
		                
		            }
		        });
		        
		        $this.options.hiddenCols = hiddenColumnList;
		        if (hiddenColumnList != undefined && hiddenColumnList.length > 0) {
		            hiddenColumnList.sort($this._compare);
		            $this.element.find("#showHide").kendoListView({
		                dataSource: hiddenColumnList,
		                template: "<li class='list-view-content'>#:display_name#</li>",
		                selectable: "multiple",
		                change: function () {
		                    var getHiddenColumns = $this.element.find("#showHide").data("kendoListView").dataSource;
		                    $this.options.selected = $.map(this.select(), function (item) {
		                        return getHiddenColumns._data[$(item).index()].actual_name;
		                    });
		                }
		            });
		        } else {
		        	$this.element.find("#showHide").html("<div style='text-align:center'>" + $si.i18N.Window.noColumnsToDisplay + "</div>");
		        }
		        $this.element.find("#zoomNumericTextBox").kendoNumericTextBox({ value: $si.viewer.alertConfigData.zoomRange,min: -50000, max: 100000, format: "#"});

		        if (configData.noOfColumnsToFreeze <= 0) {
		        	$this.element.find("#columnFreezeNumericTextBox").kendoNumericTextBox({ value: 0, min: 0, max: 99, format: "#" });
		        } else {
		        	$this.element.find("#columnFreezeNumericTextBox").kendoNumericTextBox({ value: configData.noOfColumnsToFreeze, min: 0, max: 99, format: "#" });
		        }

		        if (!configData.windowDatasource.hasGeographicData) {
		        	$this.element.find("#tabletomapSettings *").attr("disabled", "disabled").off('click');
		        	$this.element.find("#zoomNumericTextBox").data("kendoNumericTextBox").enable(false);
		        }
		        
		        //check for NoMap
				if($si.viewer.viewerPlugin == 'siViewerNoMap'){
					$this.element.find("#tabletomapSettings *").attr("disabled", "disabled").off('click');
					$this.element.find("#zoomNumericTextBox").data("kendoNumericTextBox").enable(false);
				}
			  },

		    getDrawerFavoriteSettings: function () {
		         var $this = this;
		        var drawer = $(this.element).find("#contentDrawer");
		        var clientsideTableDrawer = {		        	
		        	freezeColNo 	: $this.element.find("#columnFreezeNumericTextBox").data("kendoNumericTextBox").value(),
		        	zoomValue   	: $this.element.find("#zoomNumericTextBox").data("kendoNumericTextBox").value(),
		        	hasGeospatialData : $this.options.hasGeographic,
		        	showItemMapValue: drawer.find("#selectMapItem")[0].checked,
		        	panZoomMapValue : drawer.find("#zoomMap")[0].checked,
		        	panZoomMapDisabled : drawer.find("#zoomMap")[0].disabled,
		        };
		        $si.Logger('favorite').debug("client table drawer favorite ");
		        return clientsideTableDrawer;
		    },

		    applyDrawerFavoriteSettings: function (favorite) {
		    	 var $this = this;
		    	 if($this.element.find("#columnFreezeNumericTextBox").data("kendoNumericTextBox")){
		    		 $this.element.find("#columnFreezeNumericTextBox").data("kendoNumericTextBox").value(favorite.freezeColNo);
		    	 }
		    	 if($this.element.find("#zoomNumericTextBox").data("kendoNumericTextBox")){
		    		 $this.element.find("#zoomNumericTextBox").data("kendoNumericTextBox").value(favorite.zoomValue);
		    	 }
		    	
		    		if(favorite.hasGeospatialData){
		    		
		    		if(favorite.showItemMapValue){
		    			$this.element.find('input:checkbox[id=selectMapItem]').prop('checked', true);
		    	 	}else{
		    	 		$this.element.find('input:checkbox[id=selectMapItem]').prop('checked', false);
		    	 	}
		    		
		    	 	if(favorite.panZoomMapValue){
		    	 		$this.element.find('input:checkbox[id=zoomMap]').attr("disabled", false);
		    	 		$this.element.find('input:checkbox[id=zoomMap]').prop('checked', true);
		    	 	}else if(favorite.panZoomMapDisabled){
		    	 		$this.element.find('input:checkbox[id=zoomMap]').attr("disabled", true);
		    	 		$this.element.find('input:checkbox[id=zoomMap]').prop('checked', false);
		    	 	}else{
		    	 		$this.element.find('input:checkbox[id=zoomMap]').attr("disabled", false);
		    	 		$this.element.find('input:checkbox[id=zoomMap]').prop('checked', false);
		    	 	}
		    	 	
		    	}
		        $si.Logger('favorite').debug("applying drawer favorite ");
		    },

		    setFreezeValue: function (freezeVal) {
		    	var $this = this;
		    	$this.element.find("#columnFreezeNumericTextBox").kendoNumericTextBox({ value: freezeVal, min: 1, max: 99, format: "#" });
		    },
		});
	});