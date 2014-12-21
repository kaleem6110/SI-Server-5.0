/**
 * Alert Acknowledge Window Plug-in .
 */
define([
    'jquery',
    'jquery-ui',
    'common/com.spacetimeinsight.viewer.ui.window',
    'kendo',
    'siRouter',
	'jquery-xml2json',
	'viewer/com.spacetimeinsight.i18N.application',
    'viewer/com.spacetimeinsight.i18N.application.regional',
    'window/com.spacetimeinsight.i18N.window.regional',
    "table-bootstrap",
    "table-theme",
    'table-Grid-API',
],function($){
		$.widget('spacetimeinsight.siViewerAlertAcknowledge', $.spacetimeinsight.siViewerWindow,{
			options : {
				windowAttributes : {
					width :"730px",
				},
				windowTools 				: ["FAVORITE","EXPORTTOCSV","ACKNOWLEDGE","FILTERALERTS"],
				title 						: $si.i18N.Application.alertWindow.title,
				actions 					: ["ExpandCollapse", "Minimize" , "Maximize","Close"],
				acknowledgeWindow	 		: "siViewerAcknowledgementWindow",
				acknowledgeWindowJS   		: "viewer/com.spacetimeinsight.viewer.ui.acknowledgementWindow",
				drawerWidgetJS				: "viewer/com.spacetimeinsight.viewer.ui.alertDrawerWidget",
			    drawerWidget 				: "siViewerAlertDrawer",
			    tooltip 					: $si.i18N.Application.tooltip,
			    windowIcon 					: "css/images/manage_alerts_window.png",
			    group						: "Alerts",
			    groupIcon					: "css/images/manage_alerts_window.png",
			    selectedAlerts				: 0,
			    isFilterEnabled				: false,
			    priorityFilterComboProvider	: [],
			    alertTypeFilterComboProvider: [],
			    exportToCSVWindow			: 0,
			    defaultSupressTime			: $si.viewer.alertConfigData.autoAckSnoozeInterval,
			    defaultSupressTimeFormat	: "60",
			    lastAlertsTime				: $si.viewer.alertConfigData.initGap,
			    lastAlertsTimeFormat		: "60",
			    noOfMessages 				: $si.viewer.alertConfigData.noOfMessages,
			    _activeAlertDataGrid		: null,
				_ackAlertDataGrid			: null,
				_activeAlertFilterData		: [],
				_ackAlertFilterData		: [],
				dateTimeFormat			: 'MM/DD/YYYY - hh:mm:ss a',
			},
			pluginName:"siViewerAlertAcknowledge",
			_alertCount : 6,
			_snoozeTime : 0,
			DIV : kendo.template("<div id ='#= id #'  > </div>"),
			//Called on instance creation
			_create: function(){
				this._super();
				$(this.element).data("kendoWindow").center();
				this.element.parent().css("min-height","360px");
				this.element.parent().css("min-width","400px");
				var $this = this;
				$this._createTabs();
				$this._handleRightClickOnHeaderRow($($this.element).find("#alertAckWindow").find("#alertGridContainer"));
				$this._handleRightClickOnHeaderRow($($this.element).find("#alertAckWindow").find("#ackGridContainer"));

				this._snoozeTime = $si.viewer.alertConfigData.autoAckSnoozeInterval;
				this.options.onCloseWindow = function(e,data){
					//$si.viewer.alertDataModel.alertMessage.splice(0,$si.viewer.alertDataModel.alertMessage.length);
				};
				this.options.onResize = function(e, data){
					if($this.element.find("#alertAckWindow").data("kendoTabStrip").select().find("> .k-link").text()  == "Active"){
						$this.element.parent().css("min-height","360px");
						$this.element.find("#alertGridContainer")[0].component.reDraw();
					}

					if($this.element.find("#alertAckWindow").data("kendoTabStrip").select().find("> .k-link").text() == "Acknowledged"){
						$this.element.parent().css("min-height","360px");
						$this.element.find("#ackGridContainer")[0].component.reDraw();
					}
				};
				$si.viewer.alertDataModel.bind("change",function(e){
					$this._enableDisableAcknowledge();
					if(e.action == "add" && e.field == "alertMessage"){
						var newItem = e.items;
						$this.options._activeAlertDataGrid._dataProvider.push(newItem[0]);
						$this._populatePriorityFilter(newItem[0]);
						$this.options._activeAlertDataGrid.rebuild();
					}

					if(e.action == "add" && e.field == "alertAckMessage"){
						var newItem = e.items[0];
						var activeAlerts = $this.options._activeAlertDataGrid._dataProvider;
						for(var i=0; i<activeAlerts.length;i++){
							if(newItem.alertTranId == activeAlerts[i].alertTranId){
								$this.options._activeAlertDataGrid._dataProvider.splice($this.options._activeAlertDataGrid._dataProvider.indexOf(activeAlerts[i]),1);
								$si.viewer.alertDataModel.alertMessage.splice($si.viewer.alertDataModel.alertMessage.indexOf(activeAlerts[i]),1);
								//$si.viewer.alertDataModel.set("noOfAlerts",parseInt($si.viewer.alertDataModel.get("noOfAlerts"))-1);
							}
						}
						$this.options._activeAlertDataGrid.rebuild();
						if($this.options._ackAlertDataGrid._dataProvider){
							$this.options._ackAlertDataGrid._dataProvider.push(newItem);
							$this.options._ackAlertDataGrid.rebuild();
						}

					}
				});

				//Added the code to disable the keyboard navigation on the alert window.
				var windows = this.element.parent().find(".k-window").add(".k-window-content");
				if(windows){
					for(var i = 0; i < windows.length; i++){
						var win = windows[i];
						if($(win).attr('id') == this.options.id){
							$(win).attr("tabindex", "");
						}
					}
				}
			},

			 _onToolBarCreationComplete : function(e,data){
				var $this = this;
				this._super();
				var toolBar = $this.options.toolBar;
				toolBar.find("#filteralertsTool").addClass("filter-disabled");
				toolBar.find("#acknowledgeTool").addClass("acknowledge-icon-disabled");
				toolBar.bind($this.options.toolBarWidget.toLowerCase() +"_ontoolbarbtnclick",function(e1,data1){
					var tool = data1.event.target.id;
					if(tool == "acknowledgeTool"){
						if($this.options._activeAlertDataGrid.getSelectedItems().length){
							requirejs([$this.options.acknowledgeWindowJS],function(){
								$this._acknowledgeAlert();
							});
						}
					}
					if(tool == "exporttocsvTool"){
						$this.options.exportToCSVWindow = $si.windowUtil.openExportCSVWindow('alerts',500,500);
					}
					if(tool == "filteralertsTool"){
						var activeAlertGrid = $this.element.find("#alertGridContainer")[0].component;
						if(activeAlertGrid){
							var colLevel = activeAlertGrid.getColumnLevel();
							$si.tableGridUtils.enableDisableFilters(colLevel,$this.element.parent().find("#filteralertsTool"));
							$this.options.isFilterEnabled = colLevel._enableFilters;
							activeAlertGrid.reDraw();
						}
						var ackAlertGrid = $this.element.find("#ackGridContainer")[0].component;
						if(ackAlertGrid){
							colLevel = ackAlertGrid.getColumnLevel();
							$si.tableGridUtils.enableDisableFilters(colLevel,$this.element.parent().find("#filteralertsTool"));
							$this.options.isFilterEnabled = colLevel._enableFilters;
							ackAlertGrid.reDraw();
						}
					}
				});

			 },

			_onDrawerCreationComplete : function(e,data){
				var $this = this;
				this._super();
				$this.options.drawer[$this.options.drawerWidget]().bind($this.options.drawerWidget.toLowerCase()+"_applyalertdrawersettings",function(event,data){
					$this._applyDrawerSettings(data);
				});
			},

			_applyDrawerSettings : function(data){
				var $this = this;
				this._snoozeTime = data.data.defaultSupressTime * data.data.defaultSupressTimeFormat;
				$this.options.defaultSupressTime = data.data.defaultSupressTime;
				$this.options.defaultSupressTimeFormat = data.data.defaultSupressTimeFormat;
				$si.viewer.alertConfigData.autoAckSnoozeInterval = this._snoozeTime;
				$si.viewer.alertConfigData.initGap = data.data.lastAlertsTime * data.data.lastAlertTimeFormat;
				$this.options.lastAlertsTime = data.data.lastAlertsTime;
				$this.options.lastAlertsTimeFormat = data.data.lastAlertsTimeFormat;
				$si.viewer.alertConfigData.noOfMessages = data.data.alertCount;
			},
			// This method creates the Active and the Acknowledged Tabs
			_createTabs:function(){
				var $this = this;

				$(this.element).append(this.DIV({id:"alertAckWindow"}));
				($(this.element).find("#alertAckWindow")).kendoTabStrip({
					animation:  {
                        open: {
                            effects: "fadeIn"
                        }
                    },
                    activate:  $this._onActivate.bind($this),
                    dataTextField : "text",
                    dataContentField: "content",
                    dataSource: [
								{
								text: $si.i18N.Application.alertWindow.activeTab,
								content: "<div id='alertGridContainer' style='width: 100%; height: 100%;' ></div>",
								},
								{
								text: $si.i18N.Application.alertWindow.acknowledgedTab,
								content: "<div id='ackGridContainer' style='width: 100%; height: 100%;'></div>",
								}
                             ]
                }).data("kendoTabStrip").select(1);
                ($(this.element).find("#alertAckWindow")).data("kendoTabStrip").select(0);
			},

			// This method is to open the Acknowledgement window when we click on the acknowledge button on the toolbar
			_acknowledgeAlert: function(){
				var $this = this;
				var acknowledgementBox;

				$($this.element).append($this.DIV({id : "acknowledgementWindow"}));
				acknowledgementBox = $($this.element).find("#acknowledgementWindow");
				acknowledgementBox.addClass("acknowledgementWindow");
				acknowledgementBox[$this.options.acknowledgeWindow]({
					shimRequired : true,
				});
				acknowledgementBox[$this.options.acknowledgeWindow]().bind($this.options.acknowledgeWindow.toLowerCase() +"_alertsacknowledged",function(e,data){
					var comment = data.data.comment;

					if(data.data.snoozeTime){
						$this._snoozeTime = data.data.snoozeTime;
					}else{
						$this._snoozeTime = $si.viewer.alertConfigData.autoAckSnoozeInterval
					}
					var arr = $this.options._activeAlertDataGrid._dataProvider;
					var len = arr.length;
					var selectedItems = $this.options._activeAlertDataGrid.getSelectedItems();
					var selectedItemsLength = $this.options._activeAlertDataGrid.getSelectedItems().length;
					for(var i = 0; i < selectedItemsLength; i++ ){
						for(var j = 0; j< len; j++){
							if(arr[j].alertTranId == selectedItems[i].alertTranId){
								arr[j].acknowledgment.snoozeInterval = $this._snoozeTime;
								arr[j].acknowledgment.ackComments = comment;
								arr[j].acknowledgment.ackBy = $si.viewer.userModel.userInfo.loginId;
								arr[j].acknowledgment.userId = $si.viewer.userModel.userInfo.userId;
								arr[j].acknowledgment.userUniqueId = $si.viewer.userModel.userInfo.loginId;
								arr[j].acknowledgment.isAckd = true;
								var milliseconds  = moment(new Date($.now())).format("MM/DD/YYYY HH:mm:ss");
								arr[j].acknowledgment.ackTime = milliseconds;
								delete arr[j].acknowledgment.valid;
								delete arr[j].priority.valid;
								delete arr[j].valid;
								$si.viewer.websockets.alertAckWS.sendMessage(JSON.stringify(arr[j]));// catch and notify this as an error.
								//$si.viewer.alertDataModel.set("noOfAlerts",parseInt($si.viewer.alertDataModel.get("noOfAlerts"))-1);
								$si.viewer.alertDataModel.alertMessage.splice($si.viewer.alertDataModel.alertMessage.indexOf(arr[j]),1);
								$this.options._activeAlertDataGrid._dataProvider.splice($this.options._activeAlertDataGrid._dataProvider.indexOf(arr[j]),1);
								$this.options.selectedAlerts--;
								if($this.options._activeAlertDataGrid.getDataProvider().length == 0)
									$this.options._activeAlertDataGrid.noDataMessage = "";
								$this.options._activeAlertDataGrid.rebuild();
								break;
							}
						}

					}
					selectedItems.splice(0,selectedItems.length);
					$this._enableDisableAcknowledge();
				});
			},


			itemClicked: function(gridSelectedItem){
				var isItemSelected = gridSelectedItem.isItemSelected;
				if(isItemSelected){
					this.options.selectedAlerts = this.options.selectedAlerts + 1;
				}else{
					this.options.selectedAlerts = this.options.selectedAlerts - 1;
				}
				if(this.options.selectedAlerts > 0){
					this.element.parent().find("#acknowledgeTool").removeClass("acknowledge-icon-disabled");
					this.element.parent().find("#acknowledgeTool").addClass("acknowledge-icon-enabled");
				}else{
					this.element.parent().find("#acknowledgeTool").removeClass("acknowledge-icon-enabled");
					this.element.parent().find("#acknowledgeTool").addClass("acknowledge-icon-disabled");
				}

			},
			_enableDisableAcknowledge : function(){
				if(this.options.selectedAlerts > 0){
					this.element.parent().find("#acknowledgeTool").removeClass("acknowledge-icon-disabled");
					this.element.parent().find("#acknowledgeTool").addClass("acknowledge-icon-enabled");
				}else{
					this.element.parent().find("#acknowledgeTool").removeClass("acknowledge-icon-enabled");
					this.element.parent().find("#acknowledgeTool").addClass("acknowledge-icon-disabled");
				}
			},

			_onCheckBoxHeaderClick : function(b){
				if(b.cell._column._headerText == "" && b.grid.getSelectAllState() == "checked"){
					this.options.selectedAlerts = b.grid._dataProvider.length;
					this._enableDisableAcknowledge();
				}else if( b.grid.getFilterArguments().length > 0 && b.grid.getSelectAllState() == "middle"){
					this.options.selectedAlerts = b.grid.getSelectedItems().length;
					this._enableDisableAcknowledge();
				}else{
					this.options.selectedAlerts = 0;
					this._enableDisableAcknowledge();
				}
			},
			// This method is called when you switch between tabs
			_onActivate : function(e) {
				var $this = this;
				var activeAlertData = [];
				this.options.priorityFilterComboProvider = [];
				this.options.alertTypeFilterComboProvider = [];
				var ackData = [];
				var obj = {};
				var alertGridContainer = $($this.element).find("#alertAckWindow").find("#alertGridContainer");
				var ackGridContainer = $($this.element).find("#alertAckWindow").find("#ackGridContainer");
				if($(e.item).find("> .k-link").text() == "Active"){
						for( var i = 0; i < $si.viewer.alertDataModel.alertMessage.length ; i++){
							activeAlertData.push($si.viewer.alertDataModel.alertMessage[i]);
							$this._populatePriorityFilter($si.viewer.alertDataModel.alertMessage[i]);
							$this._populateAlertTypeFilter($si.viewer.alertDataModel.alertMessage[i]);
						}
						$this.options._activeAlertFilterData = $this.getFilterDetails($this.options._activeAlertDataGrid);
						alertGridContainer[0].innerHTML = "";
						alertGridContainer.addClass("f-custom-grid");
						$this.options._activeAlertDataGrid = new flexiciousNmsp.FlexDataGrid(alertGridContainer[0],
													{
														id:'activeAlertsGrid',
						});
						var grid = this.element.find("#alertGridContainer")[0].component;
						var width = this.element.find("#alertGridContainer").width();
						grid.setDataProvider(activeAlertData);
						grid.addEventListener(null,"itemClick",this.itemClicked.bind(this));
						grid.enableMultiColumnSort = true;
						grid.setRowDisabledFunction(function(cell,data){
							// check anyone can acknowledge or not
							var temp="::true && 0 && 0::";
							if(data.ackProp.indexOf(temp)>=0){
								return false;
							}
							//check if module owners can acknowledge or not
							temp="::true && "+$si.viewer.selectedModuleModel.selectedModule.id+" && "+0+"::";
							if(data.ackProp.indexOf(temp)>=0){
									return false;
							}
							//check if any group members can acknowledge
							var userAllowedGroups=$si.viewer.userModel.userInfo.groups;
							for(var g=0 ;g<userAllowedGroups.length;g++){
							 temp="::true && 0 && "+userAllowedGroups[g]+"::";
								if(data.ackProp.indexOf(temp)>=0){
										return false;
								}
							}
							//check if any group and module combination allowed to acknowledge or not.
							for(var g=0 ;g<userAllowedGroups.length;g++){
							 temp="::true && "+$si.viewer.selectedModuleModel.selectedModule.id+" && "+userAllowedGroups[g]+"::";
								if(data.ackProp.indexOf(temp)>=0){
										return false;
								}
							}
						return true;
						});
						grid.setHorizontalScrollPolicy("auto");
						grid.setColumnLevel(new flexiciousNmsp.FlexDataGridColumnLevel(grid));
						grid.addEventListener(null,"headerClicked", $this._onCheckBoxHeaderClick.bind($this));
						grid.variableRowHeight = true;
						grid.imagesRoot = $si.tableGridUtils.IMAGE_PATH;
						var colLevel = grid.getColumnLevel();
						colLevel.enablePaging = false;
						colLevel._enableFilters = $this.options.isFilterEnabled;
						colLevel._enableFooters = false;
						colLevel.initialSortField = "alertTime";
						colLevel.initialSortAscending = false;
						var gridColumn = $si.tableGridUtils.DynamicColumns_addCheckBoxColumn("","");
						gridColumn.sortable = false;
						gridColumn.setWidth(30);
						grid.addColumn(gridColumn);
						gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("",$si.i18N.Application.alertWindow.alertTypeColumn);
						gridColumn.sortable = false;
						gridColumn.setWidth(100);
						gridColumn.setLabelFunction($this._addAlertTypeIcon);
						grid.addColumn(gridColumn);
						gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("message",$si.i18N.Application.alertWindow.messageColumn);
						gridColumn.setFilterControl("TextInput");
						gridColumn.filterOperation = "Contains";
						gridColumn.wordWrap = true;
						gridColumn.setWidth(370);
						gridColumn.filterTriggerEvent = "enterKeyUp";
						grid.addColumn(gridColumn);
						gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("priority.name",$si.i18N.Application.alertWindow.priorityColumn);
						gridColumn.setLabelFunction($this._formatPriorityLabel);
						gridColumn.setWidth(70);
						gridColumn.setFilterControl("MultiSelectComboBox");
						gridColumn.filterComboBoxBuildFromGrid=false;
						gridColumn.filterComboBoxDataProvider = this.options.priorityFilterComboProvider;
						grid.addColumn(gridColumn);
						gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("alertTime",$si.i18N.Application.alertWindow.alertTimeColumn);
						gridColumn.setFilterControl("TextInput");
						gridColumn.setWidth(73);
						gridColumn.filterCompareFunction = $this._filterAlertTime.bind($this);
						gridColumn.wordWrap = true;
						gridColumn.setLabelFunction($this._formatAlertDateTimeLabel.bind($this));
						gridColumn.filterOperation = "Contains";
						gridColumn.filterTriggerEvent = "enterKeyUp";
						grid.addColumn(gridColumn);
						grid.setPagerVisible(false);
						if(grid.getDataProvider().length == 0)
							grid.noDataMessage = "";
						if(!(jQuery.isEmptyObject($this.options._activeAlertFilterData))){
							$this.applyFilterDetails($this.options._activeAlertFilterData,$this.options._activeAlertDataGrid);
						}
						grid.reDraw();
				}else if($(e.item).find("> .k-link").text() == "Acknowledged"){
					for( var i = 0; i < $si.viewer.alertDataModel.alertAckMessage.length ; i++){
							ackData.push($si.viewer.alertDataModel.alertAckMessage[i]);
							$this._populatePriorityFilter($si.viewer.alertDataModel.alertAckMessage[i]);
						}
						$this.options._ackAlertFilterData = $this.getFilterDetails($this.options._ackAlertDataGrid);
						ackGridContainer[0].innerHTML = "";
						ackGridContainer.addClass("f-custom-grid");
						$this.options._ackAlertDataGrid = new flexiciousNmsp.FlexDataGrid(ackGridContainer[0],
												{
													id:'ackAlertsGrid',
						});
						var grid = this.element.find("#ackGridContainer")[0].component;
						grid.setDataProvider(ackData);
						grid.enableMultiColumnSort = true;
						grid.setHorizontalScrollPolicy("auto");
						grid.setColumnLevel(new flexiciousNmsp.FlexDataGridColumnLevel(grid));
						grid.variableRowHeight = true;
						grid.imagesRoot = $si.tableGridUtils.IMAGE_PATH;
						var colLevel = grid.getColumnLevel();
						colLevel.enablePaging = false;
						colLevel._enableFooters = false;
						colLevel._enableFilters = $this.options.isFilterEnabled;
						colLevel.initialSortField = "alertTime";
						colLevel.initialSortAscending = false;
						var gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("",$si.i18N.Application.alertWindow.alertTypeColumn);
						gridColumn.sortable = false;
						gridColumn.setLabelFunction($this._addAlertTypeIcon);
						gridColumn.setWidth(100);
						grid.addColumn(gridColumn);
						gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("message",$si.i18N.Application.alertWindow.messageColumn);
						gridColumn.setFilterControl("TextInput");
						gridColumn.filterOperation = "Contains";
						gridColumn.truncateToFit=true;
						gridColumn.wordWrap = true;
						gridColumn.setWidth(180);
						gridColumn.filterTriggerEvent = "enterKeyUp";
						grid.addColumn(gridColumn);
						gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("priority.name",$si.i18N.Application.alertWindow.priorityColumn);
						gridColumn.setFilterControl("MultiSelectComboBox");
						gridColumn.filterComboBoxBuildFromGrid=false;
						gridColumn.filterComboBoxDataProvider = this.options.priorityFilterComboProvider;
						gridColumn.setWidth(70);
						gridColumn.setLabelFunction($this._formatPriorityLabel);
						grid.addColumn(gridColumn);
						gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("alertTime",$si.i18N.Application.alertWindow.alertTimeColumn);
						gridColumn.setFilterControl("TextInput");
						gridColumn.filterOperation = "Contains";
						gridColumn.filterCompareFunction = $this._filterAlertTime.bind($this);
						gridColumn.truncateToFit=true;
						gridColumn.wordWrap = true;
						gridColumn.setLabelFunction($this._formatAlertDateTimeLabel.bind($this));
						gridColumn.setWidth(94);
						gridColumn.filterTriggerEvent = "enterKeyUp";
						grid.addColumn(gridColumn);
						gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("acknowledgment.ackBy",$si.i18N.Application.alertWindow.ackByColumn);
						gridColumn.setFilterControl("TextInput");
						gridColumn.filterOperation = "Contains";
						gridColumn.setWidth(130);
						gridColumn.filterTriggerEvent = "enterKeyUp";
						grid.addColumn(gridColumn);
						gridColumn = $si.tableGridUtils.DynamicColumns_addColumn("acknowledgment.ackTime",$si.i18N.Application.alertWindow.ackOnColumn);
						gridColumn.setFilterControl("TextInput");
						gridColumn.filterOperation = "Contains";
						gridColumn.filterCompareFunction = $this._filterAckAlertTime.bind($this);
						gridColumn.truncateToFit=true;
						gridColumn.wordWrap = true;
						gridColumn.setWidth(94);
						gridColumn.setLabelFunction($this._formatAlertAckDateTimeLabel.bind($this));
						gridColumn.filterTriggerEvent = "enterKeyUp";
						grid.addColumn(gridColumn);
						grid.setPagerVisible(false);
						if(grid.getDataProvider().length == 0)
							grid.noDataMessage = "";

						if(!(jQuery.isEmptyObject($this.options._ackAlertFilterData))){
							$this.applyFilterDetails($this.options._ackAlertFilterData,$this.options._ackAlertDataGrid);
						}
						grid.reDraw();
				}
			},

			_populatePriorityFilter : function(newItem){
				var $this = this;
				var obj = {};
				var flag = false;
				obj.label = newItem.priority.name;
				obj.data = newItem.priority.name;
				var j = 0;
				if($this.options.priorityFilterComboProvider.length == 0){
					$this.options.priorityFilterComboProvider.push(obj);
				}
				for( j = 0; j<$this.options.priorityFilterComboProvider.length; j++){
					if($this.options.priorityFilterComboProvider[j].data == obj.data){
						flag = false;
					}else{
						flag = true;
					}
					if(!flag){
						break;
					}
				}
				if(flag){
					$this.options.priorityFilterComboProvider.push(obj);
				}
			},

			_populateAlertTypeFilter : function(newItem){
				var $this = this;

				var flag = false;
				var alertId = newItem.alertId;
				if(alertId){
					var priorityId = newItem.priority.id;
					var imagesUrl = "";
					for(var i = 0; i< $si.viewer.alertDataModel.alertPriorityModeMasterData.length ; i++){
						if(alertId == $si.viewer.alertDataModel.alertPriorityModeMasterData[i].id){
							alertMasterData = $si.viewer.alertDataModel.alertPriorityModeMasterData[i];
							for( var j = 0; j < alertMasterData.priorities.length ; j++){
								if( priorityId == alertMasterData.priorities[j].id){
									var alertModes = alertMasterData.priorities[j].alertModes;
									for( var k =0; k < alertModes.length ; k++ ){
										var obj = {};
										imagesUrl = '<span style="padding-right: 5px;"><img src="'+alertModes[k].iconURL+'"></span>';
										obj.label = imagesUrl + alertModes[k].name;
										obj.data = alertModes[k].name;
										var l = 0;
										if($this.options.alertTypeFilterComboProvider.length == 0){
											$this.options.alertTypeFilterComboProvider.push(obj);
										}
										for( l = 0; l<$this.options.alertTypeFilterComboProvider.length; l++){
											if($this.options.alertTypeFilterComboProvider[l].data == obj.data){
												flag = false;
											}else{
												flag = true;
											}
											if(!flag){
												break;
											}
										}
										if(flag){
											$this.options.alertTypeFilterComboProvider.push(obj);
										}
									}
								}
							}
						}
					}
				}
			},

			/**
			 * This method is used to save the window specific information in the favorite.
			 * @param {} $
			 * @returns {}
			 */
            getWindowContentFavoriteSettings: function(){
            	var $this = this;
            	var windowSpecificConfiguration = {};
            	windowSpecificConfiguration.isFilterEnabled = $this.options.isFilterEnabled;
            	windowSpecificConfiguration.alertSortColumnFavoriteDetails = $this.getSortColumnFavoriteDetails($this.options._activeAlertDataGrid.getColumnLevel());
            	windowSpecificConfiguration.ackSortColumnFavoriteDetails = $this.getSortColumnFavoriteDetails($this.options._ackAlertDataGrid.getColumnLevel());
            	windowSpecificConfiguration.activeAlertsFilterDetails = $this.getFilterDetails($this.options._activeAlertDataGrid);
            	windowSpecificConfiguration.ackAlertsFilterDetails = $this.getFilterDetails($this.options._ackAlertDataGrid);
            	return windowSpecificConfiguration;
            },

            /**
             * This method is used to apply the window specific configuration present in the favorite.
             * @param {} $
             * @returns {}
             */
            applyWindowContentFavoriteSettings : function (content){
            	var $this = this;
            	$this.options.isFilterEnabled = content.isFilterEnabled;
            	$this.applySortColumnFavoriteDetails($this.options._activeAlertDataGrid,content.alertSortColumnFavoriteDetails);
            	$this.applySortColumnFavoriteDetails($this.options._ackAlertDataGrid,content.ackSortColumnFavoriteDetails);
            	$this.applyFilterDetails(content.activeAlertsFilterDetails,$this.options._activeAlertDataGrid);
            	$this.applyFilterDetails(content.ackAlertsFilterDetails,$this.options._ackAlertDataGrid);
            	this.options._activeAlertFilterData = content.activeAlertsFilterDetails;
            	this.options._ackAlertFilterData = content.ackAlertsFilterDetails;
            	var alertGrid  = $this.options._activeAlertDataGrid;
            	var ackGrid = $this.options._ackAlertDataGrid;
            	if($this.options.isFilterEnabled){
	            	if(alertGrid){
	            		colLevel = alertGrid.getColumnLevel();
	            		if(!colLevel._enableFilters){
	         				$si.tableGridUtils.enableDisableFilters(colLevel,$this.element.parent().find("#filteralertsTool"));
	            		}
	            	}
            	

            	}else{
					if(alertGrid){
	            		colLevel = alertGrid.getColumnLevel();
	            		if(colLevel._enableFilters){
	         				$si.tableGridUtils.enableDisableFilters(colLevel,$this.element.parent().find("#filteralertsTool"));
	            			alertGrid.reDraw();
	            			ackGrid.reDraw();
	           	 		}
            		}
				}
				ackGrid.getColumnLevel()._enableFilters = $this.options.isFilterEnabled;
				alertGrid.getColumnLevel()._enableFilters = $this.options.isFilterEnabled;
				alertGrid.reDraw();
				ackGrid.reDraw();
            },

            /**
             * This method will return the sortproperties which contains the details of the column on which sorting is being applied.
             * @param {} $
             * @returns {}
             */
            getSortColumnFavoriteDetails : function(colLevel){
            	var columns = colLevel._columns;
            	var sortProperties =[];
            	for(var i=0;i<columns.length ; i++){
					var column = columns[i];
					var sort = column.level.hasSort(column);
					if(sort){
						sortProperties.push({"sortColumn":sort.sortColumn,"isAscending":sort.isAscending,"sortIndex":column.level.getSortIndex(column)});
					}
				}
				return sortProperties;
            },

            /**
             * This method will apply the sorting accoding to the favorites data
             * @param {} $
             * @returns {}
             */
            applySortColumnFavoriteDetails : function(grid,sortProperties){
            	var $this = this;
            	grid.getColumnLevel().currentSorts.removeAll();
            	for(var i=0;i<sortProperties.length ; i++){
					var column = grid.getColumnLevel().getColumnByDataField(sortProperties[i].sortColumn);
					if(column != null){
						var l = new flexiciousNmsp.FilterSort;
						l.column = column;
						l.sortColumn = sortProperties[i].sortColumn;
						l.isAscending = sortProperties[i].isAscending;
						l.column.getLevel().addSort(l);

					}
				}
            },

            /**
             * This method will save all filter values in the favorite along with the column name.
             * @param {} $
             * @returns {}
             */
            getFilterDetails : function(grid){
	            var filterSettings = [];
	            if(!(jQuery.isEmptyObject(grid))){
	            	var filterArguments = grid.getFilterArguments();
					for(var i=0; i<filterArguments.length; i++){
						var filter = {};
						filter.columnName = filterArguments[i].columnName;
						filter.expression = filterArguments[i].expression;
						filter.filterOperation = filterArguments[i].filterOperation;
						filter.gridName = grid.__id;
						filterSettings.push(filter);
					}
	            }
	            return filterSettings;
            },

            /**
             * This method will apply the filter values that are saved as favorites.
             * @param {} $
             * @returns {}
             */
            applyFilterDetails : function(filterSettings,grid){
            	if(!grid){
            		grid = this.options._activeAlertDataGrid;
            	}
            	this._resetFilters(grid);
            	if(filterSettings){
            		for(var i=0; i<filterSettings.length;i++){
						grid.setFilterValue(filterSettings[i].columnName,filterSettings[i].expression);
					}
            	}
            },

            /**
             * This method is used to open a context menu for the sorting on the right click on header and to
             * perform the action accordingly.
             * @param {} $
             * @returns {}
             */
            _handleRightClickOnHeaderRow: function (gridContainterRightClick) {
            var $this = this;
            var selectedMenu;
            var setSelectedMenu;
            gridContainterRightClick.contextmenu({
                delegate: ".flexDataGridHeaderCell",
                preventContextMenuForPopup: true,
                preventSelect: true,

                menu: [
	            	{title: $si.i18N.Window.rightMenuTitles.cancelSort, cmd: "cancelSort"},
	                {title: $si.i18N.Window.rightMenuTitles.sortAscending, cmd: "sortAsc"},
	                {title: $si.i18N.Window.rightMenuTitles.sortDescending, cmd: "sortDesc"},
	                {title: $si.i18N.Window.rightMenuTitles.cancelAllSorts, cmd: "removeAllSort"},
	            ],

                // Implement the beforeOpen callback to dynamically change the
                // entries
                beforeOpen: function (event, ui) {
                	// Preventing the context menu to open on the alert types and on the check box column.
                    if (ui.target[0].component._text == "" || ui.target[0].component._text == "Alert Types") {
                        event.preventDefault();
                    }

                    var grid = event.target.component;

                    if (!grid.currentCell) {
                        grid.currentCell = grid.getBodyContainer().getCellFromMouseEventTarget(ui.target[0].component);
                    }

                    var flag = false;

                    if (grid.getColumnLevel().currentSorts.length > 0) {
                        gridContainterRightClick.contextmenu("enableEntry", "removeAllSort", true);
                        for (var i = 0; i < grid.getColumnLevel().currentSorts.length; i++) {
                            if (grid.getColumnLevel().currentSorts[i].sortColumn == grid.currentCell._column.dataField) {
                                flag = true;

                                if (grid.getColumnLevel().currentSorts[i].isAscending) {
                                    gridContainterRightClick.contextmenu("showEntry", "cancelSort", true);
                                    if(grid.currentCell._column.dataField == 'alertTime'){
										gridContainterRightClick.contextmenu("enableEntry", "cancelSort", false);
									}else{
										gridContainterRightClick.contextmenu("enableEntry", "cancelSort", true);
									}
                                    gridContainterRightClick.contextmenu("showEntry", "sortAsc", false);
                                    gridContainterRightClick.contextmenu("showEntry", "sortDesc", true);
                                } else {
                                    gridContainterRightClick.contextmenu("showEntry", "cancelSort", true);
                                    if(grid.currentCell._column.dataField == 'alertTime'){
										gridContainterRightClick.contextmenu("enableEntry", "cancelSort", false);
									}else{
										gridContainterRightClick.contextmenu("enableEntry", "cancelSort", true);
									}
                                    gridContainterRightClick.contextmenu("showEntry", "sortDesc", false);
                                    gridContainterRightClick.contextmenu("showEntry", "sortAsc", true);
                                }
                            }
                        }
                    } else {
                        gridContainterRightClick.contextmenu("enableEntry", "removeAllSort", false);
                    }
                    if (!flag) {
                        gridContainterRightClick.contextmenu("showEntry", "cancelSort", false);
                        gridContainterRightClick.contextmenu("showEntry", "sortDesc", true);
                        gridContainterRightClick.contextmenu("showEntry", "sortAsc", true);
                    }
                },

                select: function (event, ui) {
                    selectedMenu = ui.cmd;
                    var grid = $(event.target)[0].component;
                    var footerGrid = null;

                    if (!grid.currentCell)
                        grid.currentCell = grid.getBodyContainer().getCellFromMouseEventTarget(ui.target[0].component);

                    if (ui.cmd == 'sortAsc') {
                        setSelectedMenu = ui.cmd;
                        $this.handleRightMenuWithSort(grid, true);
                    } else if (ui.cmd == 'sortDesc') {
                        setSelectedMenu = ui.cmd;
                        $this.handleRightMenuWithSort(grid, false);
                    } else if (ui.cmd == 'cancelSort') {

                        $this._removeColumnSort(grid);
                        grid.rebuild();
                    } else if (ui.cmd == 'removeAllSort') {
                        grid.getColumnLevel().currentSorts.removeAll();
                    }
                    grid.rebuild();
                }
            });
        },

        /**
         * This method will add the sorting to the current cell of the grid.
         * @param {} $
         * @returns {}
         */
        handleRightMenuWithSort: function (grid, isAscending) {
			var cell = grid.currentCell;
            var htmlDataGrid = grid;
            var l = new flexiciousNmsp.FilterSort;
            l.column = cell._column;
            l.sortColumn = cell._column.dataField;
            l.isAscending = isAscending;
            l.column.getLevel().addSort(l);

            htmlDataGrid.rebuildBody();
            htmlDataGrid.rebuildHeader();
        },

        /**
         * This method will remove the sorting from the grid current cell.
         * @param {} $
         * @returns {}
         */
         _removeColumnSort: function (grid) {
            var $this = this;
            var currentSorts = grid.getColumnLevel().currentSorts;
            var sortIndex = -1;
            for (var i = 0; i < currentSorts.length; i++) {
                if (currentSorts[i].sortColumn == grid.currentCell._column.dataField) {
                    sortIndex = i;
                    break;
                }
            }
            grid.getColumnLevel().currentSorts.splice(sortIndex, 1);
        },

        /**
         * This method is used to add the icons in the alert type column for the
         * modes specified in the alert.
         * @param {} $
         * @returns {}
         */
        _addAlertTypeIcon : function(cell,state){
			var alertId = cell.alertId;
			if(alertId){
				var priorityId = cell.priority.id;
				var imagesUrl = "";
				for(var i = 0; i< $si.viewer.alertDataModel.alertPriorityModeMasterData.length ; i++){
					if(alertId == $si.viewer.alertDataModel.alertPriorityModeMasterData[i].id){
						alertMasterData = $si.viewer.alertDataModel.alertPriorityModeMasterData[i];
						for( var j = 0; j < alertMasterData.priorities.length ; j++){
							if( priorityId == alertMasterData.priorities[j].id){
								var alertModes = alertMasterData.priorities[j].alertModes;
								for( var k =0; k < alertModes.length ; k++ ){
									imagesUrl = imagesUrl + '<span style="padding-right: 5px;"><img src="'+alertModes[k].iconURL+'"></span>';
								}
							}
						}
					}
				}
			}
			return imagesUrl;
		},

		/**
		 * This function returns the Priority Text with the color specified for it.
		 * @param {} $
		 * @returns {}
		 */
		_formatPriorityLabel : function(cell){
			if(cell.priority){
				while(cell.priority.color.length<6){
					cell.priority.color = "0" + cell.priority.color;
				}
				return "<span style='color : #"	+ cell.priority.color + "'>" + cell.priority.name + "</span>";
			}
			return "";
		},

		/**
		 * This function returns the Date field in the Date Format.
		 * @param {} $
		 * @returns {}
		 */
		_formatAlertDateTimeLabel : function(cell){
			if(cell.alertTime){
				var date = new Date(parseInt(cell.alertTime));
				var formattedDate = moment(date).format(this.options.dateTimeFormat);
				return formattedDate;
			}
			return "";
		},

		/**
		 * This method is to format the acknowledged on date.
		 * @param {} $
		 * @returns {}
		 */
		_formatAlertAckDateTimeLabel : function(cell){
			if(cell.acknowledgment){
				return moment(new Date(cell.acknowledgment.ackTime)).format(this.options.dateTimeFormat);
			}
			return "";
		},
		
		/**
		 * This method is to handle the filtering on the alert time column.
		 * @param {} $
		 * @returns {} 
		 */
		_filterAlertTime : function(cell,state){
			var date = new Date(parseInt(cell.alertTime));
			var formattedDate = moment(date).format(this.options.dateTimeFormat);
			if(formattedDate.indexOf(state.expression) >=0){
				return true;
			}else{
				return false;
			}
		},
		
		/**
		 * This method is to handle the filtering on the alert acknowledgement time column.
		 * @param {} $
		 * @returns {} 
		 */
		_filterAckAlertTime : function(cell,state){
			var date = new Date(cell.acknowledgment.ackTime);
			var formattedDate = moment(date).format(this.options.dateTimeFormat);
			if(formattedDate.indexOf(state.expression) >=0){
				return true;
			}else{
				return false;
			}
		},
		
		/**
		 * This method will clear the favorite that is being applied to the manage alert window and drawer.
		 */
		reset : function(){
			this.options.isFilterEnabled = false;
			this._resetFilters(this.options._activeAlertDataGrid);
			this._resetFilters(this.options._ackAlertDataGrid);
			this._resetSorting(this.options._activeAlertDataGrid);
			this._resetSorting(this.options._ackAlertDataGrid);
			var colLevel = this.options._activeAlertDataGrid.getColumnLevel();
			if(colLevel._enableFilters){
				$si.tableGridUtils.enableDisableFilters(colLevel,this.element.parent().find("#filteralertsTool"));
			}
			colLevel = this.options._ackAlertDataGrid.getColumnLevel();
			if(colLevel._enableFilters){
				$si.tableGridUtils.enableDisableFilters(colLevel,this.element.parent().find("#filteralertsTool"));
			}
			this.options.drawer.find("#defaultSuppressTime").val($si.viewer.alertConfigData.autoAckSnoozeInterval);
			this.options.drawer.find("#supressTime").data("kendoDropDownList").value(0);
			this.options._activeAlertDataGrid.reDraw();
			this.options._ackAlertDataGrid.reDraw();
		},
		
		/**
		 * This method will reset all the filter applied to the alert and the acknowledged grid.
		 */
		_resetFilters : function(grid){
			if(!jQuery.isEmptyObject(grid)){
				var filters = grid.getFilterArguments();
				var filterLength = filters.length;
				if(filters.length > 0){
					for(var j=0; j<filters.length;j++){
						grid.setFilterValue(filters[j].columnName,"");
					}
				}
			}
		},
		
		/**
		 * This method will reset the sorting of the alert and the acknowledged grid.
		 */
		_resetSorting : function(grid){
			if(!jQuery.isEmptyObject(grid)){
				grid.getColumnLevel().currentSorts.removeAll();
			}
		},
		
		setDefaultFavorite: function(){
			($(this.element).find("#alertAckWindow")).data("kendoTabStrip").select(0);
			try {
				var $this = this;
				if($this.options.defaultFavorite != null){
					$this.applyFavorite($this.options.defaultFavorite);
				} else if($this.options.favorite != null){
					$this.applyFavorite($this.options.favorite,false,true);
				}		
			} catch(e){
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.setDefaultFavorite);
			}
		},
	});
});