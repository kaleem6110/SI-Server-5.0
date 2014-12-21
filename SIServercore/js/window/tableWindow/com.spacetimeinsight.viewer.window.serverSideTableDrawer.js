define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.drawer',
    'window/com.spacetimeinsight.i18N.window',
    'window/com.spacetimeinsight.i18N.window.regional',
],function($){

	$.widget('spacetimeinsight.siViewerServerSideTableDrawer',$.spacetimeinsight.siViewerDrawer,{
		options : {
			toggleDelay : 200,
			actionButtons	: ["Apply"],
			needTabStrip	: true,
			selected :  null,
			configurationData :null,
			hasGeographicData : false,
		},

		pluginName:"siViewerServerSideTableDrawer",

		CONTENTS_DIV   :  kendo.template("<div id ='#= id #' class='#= className #' > </div>"),
		GENERIC_COMPONENT : kendo.template("<div id ='#= id #' class ='#= cssClass #'>#= content #</div>"),
		INPUT_BOX : kendo.template("<input type='#= type #' id ='#= id #' style ='#= style #' class ='#= className #'/>"),
		CHECKBOX_CONTROL : kendo.template("<input type='#= type #' id ='#= id #' style ='#= style #' checked='#= checked #' class ='#= className #'/>"), 
		SPAN_COMPONENT : kendo.template("<span style ='#= style #'>#= spanConent #</span>"),
		SPAN_CONTROL : kendo.template("<span class ='#= className #'>#= spanConent #</span>"),
		LIST_COMPONENT : kendo.template("<ul id ='#= id #' class ='#= className #'></ul>"),
		
		_create : function(){
			var $this = this;
			var $options = this.options;
			$this._super();
			$(this.element).addClass("server-table-drawer");
			this.options.contentDiv = $(this.element).find(".sti-window-drawer-content");
			this.options.contentDiv.find(".sti-window-drawer-tabstrip").append(this.SPAN_CONTROL({className:"tab-level",spanConent:$si.i18N.Window.tableLevel}) + this.SPAN_CONTROL({className:"v-h-tab",spanConent:$si.i18N.Window.displaySettings}))
			this.options.contentDiv.append(this.CONTENTS_DIV({id:"placemarkinfo",className:""}));
			this.options.contentDiv.find("#placemarkinfo").addClass("custom-vertical-tabstrip");
			this.options.actionButtonClicked = function(event,data){
				if(data.buttonId == "Apply"){
					$this.onApplyButtonClicked();
				}
			};
			this._trigger("onCreationComplete",{id:this.options.id,domElement:$(this.element)});
		},
		
		getDrawerSettings : function(favorite){
			var levelContent={};
			var $this = this;
			for(var i=0;i<$this.element.find('#placemarkinfo').data('kendoTabStrip').contentElements.length;i++){
				var levelValueContent ={};
				var items =null;
				var content = $this.element.find('#placemarkinfo').data('kendoTabStrip').contentElements[i];
				$.each($this.options.configurationData, function( key, val ) {
					var tabValue = val.description == undefined ? "Level"+val.tableLevel : val.description;
					if( tabValue == $this.element.find('#placemarkinfo').find("li")[i].textContent){
						tabValue = tabValue.replace(/[_\W]+/g, "-")+val.tableLevel;
						var selectedItems;
						if($this.element.find("#showHide"+tabValue).data("kendoListView")){
							if(favorite){
								items = $this.element.find("#showHide"+tabValue).data("kendoListView").element.children();
							}else{
								items = $this.element.find("#showHide"+tabValue).data("kendoListView").select();
								$.each(items, function(idx, elem) {
									var dataValue= elem.textContent;
									$.each(val.levelConfiguration.metadata , function(key, value ) {
										if(value.displayName == dataValue){
						        			value.hide =false;
						        		}
						        	});		        	
								});
							}	
						}
						
						if(items != undefined && items != null){
							selectedItems = $.map(items, function(item) {
						        return item.innerText;
					           });
							selectedItems.join(", ");
						}
			
						// remove of items from Kendo ListView
						if(items && items.length > 0) {
							$.each(items, function(idx, elem) {
								$this.element.find("#showHide"+tabValue).data("kendoListView").remove($(elem));
				        	});
						}
						
						if($this.element.find("#showHide"+tabValue).data("kendoListView") != undefined){	
							if($this.element.find("#showHide"+tabValue).data("kendoListView").dataSource.data().length == 0 ) {
								$this.element.find("#showHide"+tabValue).removeClass("k-widget k-listview k-selectable");
								$this.element.find("#showHide"+tabValue).html("<div style='text-align:center'>"+ $si.i18N.Window.noColumnsToDisplay +"</div>");
							}
						}
						
						levelValueContent["zoomAltitudeValue"] = $(content).find("#zoomNumericTextBox"+tabValue).val();
						levelValueContent["showItemMapValue"] = $(content).find("#selectMapItem"+tabValue)[0].checked;
						levelValueContent["panZoomMapValue"] = $(content).find("#zoomMap"+tabValue)[0].checked;
						levelValueContent["showHideList"] = selectedItems;
						levelValueContent["hasGeographicData"] = val.levelConfiguration.windowDatasource.hasGeographicData;
						levelContent[tabValue] = levelValueContent;
					}
				});			
			}
			return levelContent;
		},
		
		onApplyButtonClicked : function(){
			var $this = this;
			var levelContents = $this.getDrawerSettings();
			
			this._trigger("applytabledrawersettings", null, levelContents);
			this.toggle();
		},

		// Show/Hide toolbar
		toggle : function(delay){
			$(this.element).slideToggle(delay?delay:this.options.toggleDelay);
			if($(this.element).css("display") != "none"){
				$(this.element).css("display","inline-flex"); 
			}
			this._trigger("onToggle",{id:this.options.id,domElement:$(this.element)});
		},
			
		_compare : function(key,value){
			if (key.name < value.name){
				return -1;
			}
			if (key.name > value.name){
				return 1;
			}
	        return 0;
		},	
			
		hideColumnList : function(configData){
			var $this = this;
			$this.options.configurationData = configData.levels;
			$.each($this.options.configurationData, function( key, val ) {
				var hiddenColumnList = [];
				var tabValue = val.description == undefined ? "Level"+val.tableLevel : val.description;
				tabValue = tabValue.replace(/[_\W]+/g, "-")+val.tableLevel;
				if(val.levelConfiguration.metadata){
					$.each(val.levelConfiguration.metadata , function(key, value ) {
						if(value.hide==true){
							hiddenColumnList.push({name: value.displayName});
						}
					});
				}
				if(hiddenColumnList != undefined && hiddenColumnList.length > 0) {
					hiddenColumnList.sort($this._compare);
					$this.element.find("#showHide"+tabValue).kendoListView({dataSource: hiddenColumnList,template:"<li class='list-view-content'>#:name#</li>",selectable: "multiple",
						change : function(){
							var getHiddenColumns = $this.element.find("#showHide"+tabValue).data("kendoListView").dataSource;
							$this.options.selected = $.map(this.select(), function(item) {
					       		return getHiddenColumns._data[$(item).index()].name;
					    	});
						}
					});
				} else {
					$this.element.find("#showHide"+tabValue).html("<div style='text-align:center'>"+ $si.i18N.Window.noColumnsToDisplay +"</div>");
				}
			});
			
		},
			
		setHideColumnList : function(configData){
			var $this = this;
			var tabStrip =$this.options.contentDiv.find("#placemarkinfo").kendoTabStrip({
				animation: {
			    	open:{
			        	effects: "fadeIn"
			        }
			    },
			   	dataUrlField: "Url",
			    dataTextField : "text",
			    dataContentField: "content"
			}).data("kendoTabStrip");
					
			$this.options.configurationData = configData.levels;
			var hasGeographicData = false;;
			$.each($this.options.configurationData, function( key, val ) {
				var tabValue = val.description == undefined ? "Level"+val.tableLevel : val.description;
				var tabValueId = tabValue.replace(/[_\W]+/g, "-")+val.tableLevel;
				tabStrip.append({
	            	text: tabValue ,
	                content: $this.GENERIC_COMPONENT({id:"tabletomapSettings"+tabValueId,cssClass:"section-header",content:$si.i18N.Window.tableToMapCoordinateSettings}) 
                	+ $this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""})
                	+ $this.GENERIC_COMPONENT({id:"",cssClass:"section-content",content: $this.GENERIC_COMPONENT({id:"",cssClass:"",content: $this.GENERIC_COMPONENT({id:"",cssClass:"",content:$this.SPAN_COMPONENT({style :"display: table-cell;width: 110px; padding-left: 10px;white-space: normal;font-weight:normal;",spanConent: $this.SPAN_COMPONENT({style:"padding-left: 7px;white-space: normal;",spanConent:$si.i18N.Window.zoomtoThisAltitude}) 
                	+ $this.SPAN_COMPONENT({style:"white-space: normal;display: table-cell;",spanConent:$si.i18N.Window.whenzoomActive})   })  
                	+ $this.SPAN_COMPONENT({style :"display: table-cell;vertical-align: middle;",spanConent:$this.INPUT_BOX({type:"text",className:"zoom-width",style:"width: 70px;text-align:center;",id:"zoomNumericTextBox"+tabValueId})})}) 
                	+  $this.GENERIC_COMPONENT({id:"",cssClass:"div-space",content:   $this.SPAN_COMPONENT({style :"display: table-cell;vertical-align: middle;padding-right: 5px; float:left;",spanConent:$this.CHECKBOX_CONTROL({id:"selectMapItem"+tabValueId,className:"",type:"checkbox",checked:"checked",style:"width:15px;height:15px; float:left;"})})  
                	+ $this.SPAN_COMPONENT({style:"display: table-cell;width: 135px; float:left; margin-top:0; white-space: normal;font-weight:normal;", spanConent:$si.i18N.Window.showItemOnMap})}) 
                    + $this.GENERIC_COMPONENT({id:"",cssClass:"div-space",content:$this.SPAN_COMPONENT({style :"display: table-cell;vertical-align: middle;padding-right: 5px; clear:left; float:left;",spanConent:$this.CHECKBOX_CONTROL({type:"checkbox",style:"width:15px;height:15px; clear:left; float:left;",className:"",checked:"checked",id:"zoomMap"+tabValueId})}) 
                    + $this.SPAN_COMPONENT({style:"display: table-cell;width: 158px;white-space: normal;float:left; margin-top:0;font-weight:normal;",spanConent:$si.i18N.Window.panZoomOnMap})})   })})       
		                
                	+ $this.GENERIC_COMPONENT({id:"showHideColumns",cssClass:"section-header",content:$si.i18N.Window.showHideColumns})       
                	+ $this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""})
                	+ $this.GENERIC_COMPONENT({id:"",cssClass:"section-content",content: $this.SPAN_COMPONENT({style :"display: table;margin: auto;font-style: italic;font-weight:normal;margin-bottom: 5px;",spanConent:$si.i18N.Window.clickColumnToAddToTable})}) 
                	+ $this.GENERIC_COMPONENT({id:"showHideDiv",cssClass:"showHideSelect",content:$this.LIST_COMPONENT({id:"showHide"+tabValueId,className:"list-view"})}),
	            });
				$this.element.find("#zoomNumericTextBox"+ tabValueId).kendoNumericTextBox({value:$si.viewer.alertConfigData.zoomRange , min : -50000, max : 100000, format: "#"});
					
				$this.element.find("#selectMapItem"+tabValueId).click ( function() {
					if($this.element.find('input:checkbox[id=selectMapItem'+tabValueId+']').is ( ":checked" )){
						$this.element.find('input:checkbox[id=zoomMap'+tabValueId+']').attr('disabled',false);
					}else{
						$this.element.find('input:checkbox[id=zoomMap'+tabValueId+']').prop('checked', false);
						$this.element.find('input:checkbox[id=zoomMap'+tabValueId+']').attr('disabled',true);
					}
				});
					
				if (!val.levelConfiguration.windowDatasource.hasGeographicData) {
					$this.element.find("#tabletomapSettings"+tabValueId).attr("disabled", "disabled").off('click');
					$this.element.find("#selectMapItem"+tabValueId).attr("disabled", "disabled").off('click');
					$this.element.find("#zoomMap"+tabValueId).attr("disabled", "disabled").off('click');
					$this.element.find("#zoomNumericTextBox"+tabValueId).data("kendoNumericTextBox").enable(false);
		        }else{
		        	hasGeographicData = true;
		        }
		         //check for NoMap
		        if($si.viewer.viewerPlugin == 'siViewerNoMap'){
		        	$this.element.find("#tabletomapSettings"+tabValueId).attr("disabled", "disabled").off('click');
		        	$this.element.find("#selectMapItem"+tabValueId).attr("disabled", "disabled").off('click');
		        	$this.element.find("#zoomMap"+tabValueId).attr("disabled", "disabled").off('click');
		        	$this.element.find("#zoomNumericTextBox"+tabValueId).data("kendoNumericTextBox").enable(false);
				}
						
		        $this.element.find("#showHide"+ tabValueId).kendoTooltip({
					filter: "li",
					show: function(e){
						if(this.content.text() !=""){ 
							$('[role="tooltip"]').css("visibility", "visible");
						} 
					},
					hide: function(){
						$('[role="tooltip"]').css("visibility", "hidden");
					},
					content: function(e){
			    		var element = e.target[0];
			    		if(element.offsetWidth < element.scrollWidth){
			    			return e.target.text();
			    		}else{
			    			return "";
			    		}
			    	}
				});
		        $this.element.find(".k-tabstrip-items").kendoTooltip({
					filter: "span",
					show: function(e){
						if(this.content.text() !=""){ 
							$('[role="tooltip"]').css("visibility", "visible");
						} 
					},
					hide: function(){
						$('[role="tooltip"]').css("visibility", "hidden");
					},
					content: function(e){
			    		var element = e.target[0];
			    		if(element.offsetWidth < element.scrollWidth){
			    			return e.target.text();
			    		}else{
			    			return "";
			    		}
			    	}
				});
			});
			$this.hideColumnList(configData);
			$this.options.hasGeographicData = hasGeographicData;
			tabStrip.select(0);
			$(this.element).hide();
		},
		
		getDrawerFavoriteSettings: function () {
			var $this = this;
			var serverSideDrawerSettings = $this.getDrawerSettings(true);
	        $si.Logger('favorite').debug("client table drawer favorite ");
	        return serverSideDrawerSettings;
	    },

	   	applyDrawerFavoriteSettings: function (favorite) {
	   		var $this = this;
	   		for(var i=0;i<$this.element.find('#placemarkinfo').data('kendoTabStrip').contentElements.length;i++){
				var levelValueContent ={};
				var items =null;
				var content = $this.element.find('#placemarkinfo').data('kendoTabStrip').contentElements[i];
				$.each(favorite, function( key, val ) {
					var currentLevel = $('#placemarkinfo').find("li")[i].textContent;
					currentLevel = currentLevel.replace(/[_\W]+/g, "-")+(i+1);
					if(key == currentLevel){
						var hiddenColumnList = [];
						if(val.showHideList){
							$.each(val.showHideList , function(key, value) {
								hiddenColumnList.push({name: value});
							});
						}
						if(hiddenColumnList && hiddenColumnList.length > 0) {
							hiddenColumnList.sort($this._compare);
							$this.element.find("#showHide"+key).kendoListView({dataSource: hiddenColumnList,template:"<li class='list-view-content'>#:name#</li>",selectable: "multiple",
								change : function(){
								var getHiddenColumns = $this.element.find("#showHide"+key).data("kendoListView").dataSource;
								$this.options.selected = $.map(this.select(), function(item) {
									return getHiddenColumns._data[$(item).index()].name;
								});
							}
							});
						} else {
							if($this.element.find("#showHide"+key).data("kendoListView") != undefined){	
								if($this.element.find("#showHide"+key).data("kendoListView").dataSource.data().length == 0 ) {
									$this.element.find("#showHide"+key).removeClass("k-widget k-listview k-selectable");
								}
							}
							$this.element.find("#showHide"+key).html("<div style='text-align:center'>"+ $si.i18N.Window.noColumnsToDisplay +"</div>");
						}
						$(content).find("#zoomNumericTextBox"+key).data("kendoNumericTextBox").value(val.zoomAltitudeValue);
				    	if(val.hasGeographicData){
				    		if(val.showItemMapValue){
				    			$this.element.find('input:checkbox[id=selectMapItem'+key+']').prop('checked', true);
				    	 	}
				    	 	if(val.panZoomMapValue){
				    	 		$this.element.find('input:checkbox[id=zoomMap'+key+']').attr("disabled", false);
				    	 		$this.element.find('input:checkbox[id=zoomMap'+key+']').prop('checked', true);
				    	 	}
				    	}
					}
				});			
			}
	    	
	        $si.Logger('favorite').debug("applying drawer favorite ");
	    }
	});
});