define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'table-Grid-API',
    'window/tableWindow/com.spacetimeinsight.viewer.window.baseTableWindow',
    'dataFilter/com.spacetimeinsight.viewer.operator',
	'dataFilter/com.spacetimeinsight.viewer.operators.regional',
],function($){
	$.widget('spacetimeinsight.siViewerServerSideTable', $.spacetimeinsight.siViewerBaseTableWindow,{
		options : {
			toolBarOptions 	: 	["INLINEFILTER"],
			windowAttributes:{
				width 	: "800px",
				height 	: "500px",

				position:{
					left : "300px",
					top  : "200px"
				}
			},

			title		  		: "Table",
			configuration 		: "",
			dashboardParams 	: "",
			dashboardData 		: "",
			autorefreshFlag 	: false,
			autorefreshInterval : null,
			grid 				: undefined,
			id					: undefined,
			enableMultiColumnSort		: true,
			enableDefaultDisclosureIcon	: true,
			horizontalScrollPolicy		: "auto",
			showHelpDropdown : true,
			windowConfigCopy : null,
			hasGeographicData : false,
			zoomAltitude : 50000,
            showItemOnMap : true,
            zoomOnMap : true,
            inlineFilterDefined : false,
            selectedRows : [],
			firstLevelTotalRecords : 0,
		},

		pluginName:"siViewerServerSideTable",

		CONTAINER_TEMPLATE : kendo.template("<div id='#= id #_parent_grid_container' class='ct-wrapper' style='width:99%;height: 99%'><div id='#= id #_grid' class='ct-grid' style='position: relative;  left: 10px;right: 10px;top: 0px;height: 90%' tabindex='0'></div></div>"),
        POPUP_IFRAME_CONTAINER : kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),

		rebuild : false,
	    footerCols : [],
	    defaultWidth :70,
	    selectedRowData : null,
	    inlineFilterControls : ["TextInput","NumericRangeBox","DateComboBox"],
	    dataTypes : ["java.util.Date","java.lang.String","java.lang.Character","java.lang.Boolean"],
	    parentFilterObject : null,
	    currentLevelIndex : 1,
	    currentLevel : null,
		currentParentLevel : null,

		_create : function(){
			var $this = this;
			this._super();

			this._initializeOptions();

			this.element.parent().css("min-width","300px");
			//Make a copy of windowConfig to keep the original metadata configuration
			this.options.windowConfigCopy = JSON.parse(JSON.stringify($this.options.windowConfig));

			if(this._getOptionValue("grid") == undefined){
				this._addHtmlDataGrid();
				this._initializeGridProperties();
			}

			//creation complete event - no change
			$(this.element)[this.pluginName]().bind(this.pluginName.toLowerCase() + "_oncreationcomplete",function(){
				if($si.viewer.viewerPlugin != 'siViewerNoMap'){
					if($this.options.hasGeographicData){
						if($this.options.toolBar){
							$this.options.toolBar[$this.options.toolBarWidget]("createToolBarItem","locate",$si.i18N.Window.tooltip.locate,true);
							var tool = $this.element.parent().find("#locateTool");
							if(tool){
								if(tool.hasClass("locate-icon")){
									tool.removeClass("locate-icon");
								}
								tool.addClass("locate-disabled");
								tool.attr("disabled",true);
							}
						}
					}
				}

				var inlineFilterTool = $this.element.parent().find("#inlinefilterTool");
				var title = $si.i18N.Window.tooltip.inlinefilter;
				if(!$this.options.inlineFilterDefined){
					if (inlineFilterTool.hasClass("inlinefilter-icon")) {
                		inlineFilterTool.removeClass("inlinefilter-icon");
                	}
                	inlineFilterTool.addClass("inlinefilter-off");
	            	title = $si.i18N.Window.tooltip.disabledinlinefilter;
		        	inlineFilterTool.attr("disabled","disabled");
		        }
	            inlineFilterTool.attr('title', title);
			});

			$this._addDataGridColumns();

			//Capture grid resize event
			this.options.onResize = function(e, data){
				$this._refreshDataGrid();
			};

			$si.eventSource.windowEvents.bind($si.events.WindowEvents.onResizeWindow,function (windowResizeEvent){
				if(windowResizeEvent.windowId == $this.options.id ){
					 $this._refreshDataGrid();
				}
			});

			var gridContainterRightClick = $("#"+this.options.id+"_grid");
			var selectedMenu;
			var setSelectedMenu;
			gridContainterRightClick.contextmenu({
	            delegate: ".flexDataGridHeaderCell",
	            preventContextMenuForPopup: true,
				preventSelect: true,
	            menu: [
	            	{title: "Cancel sort", cmd: "cancelSort"},
	                {title: "Sort ascending", cmd: "sortAsc"},
	                {title: "Sort descending", cmd: "sortDesc"},
	                {title: "Hide column", cmd: "hideColumn"},
	                {title: "Cancel All Sorts", cmd: "removeAllSort"},
	                {title: "Clear Inline Filters", cmd: "removeInlineFilter",disabled : true},
	            ],
	            beforeOpen: function(event, ui) {
	            	if (ui.target[0].component._text == "") {
                        event.preventDefault();
                    }
	           		var grid =event.target.component;
	                if(!grid.currentCell){
	                	grid.currentCell = grid.getBodyContainer().getCellFromMouseEventTarget(ui.target[0].component);
	                }

					if(event.target.component.getFilterArguments()[0] != undefined){
						if(event.target.component.getFilterArguments()[0].filterControlValue != null){
							gridContainterRightClick.contextmenu("enableEntry", "removeInlineFilter", true);
						}
					}else{
						gridContainterRightClick.contextmenu("enableEntry", "removeInlineFilter", false);
					}

					var flag = false;
					if(grid.currentCell.level.currentSorts.length > 0  ){
						gridContainterRightClick.contextmenu("enableEntry", "removeAllSort", true);
						for(var i=0;i < grid.currentCell.level.currentSorts.length; i++){
							if(	grid.currentCell.level.currentSorts[i].sortColumn == grid.currentCell.getColumn().dataField){
								flag = true;
								if(grid.currentCell.level.currentSorts[i].isAscending) {
									gridContainterRightClick.contextmenu("showEntry", "cancelSort", true);
									gridContainterRightClick.contextmenu("showEntry", "sortAsc", false);
									gridContainterRightClick.contextmenu("showEntry", "sortDesc", true);
								} else {
									gridContainterRightClick.contextmenu("showEntry", "cancelSort", true);
									gridContainterRightClick.contextmenu("showEntry", "sortDesc", false);
									gridContainterRightClick.contextmenu("showEntry", "sortAsc", true);
								}
							}
						}
					} else {
						gridContainterRightClick.contextmenu("enableEntry", "removeAllSort", false);
					}
					if(!flag){
						gridContainterRightClick.contextmenu("showEntry", "cancelSort", false);
						gridContainterRightClick.contextmenu("showEntry", "sortDesc", true);
						gridContainterRightClick.contextmenu("showEntry", "sortAsc", true);
					}

					var remainingCols = grid.currentCell.level.getVisibleColumns();
                    var minCount = 1;

                    if (remainingCols.length <= minCount) {
                    	gridContainterRightClick.contextmenu("enableEntry", "hideColumn", false);
                    }else{
	                    gridContainterRightClick.contextmenu("enableEntry", "hideColumn", true);
                    }

                    if(grid.currentCell.level.getNestDepth() > 1){
						gridContainterRightClick.contextmenu("showEntry", "removeInlineFilter", false);
				 	}else{
						gridContainterRightClick.contextmenu("showEntry", "removeInlineFilter", true);
					}
				},

		        select: function(event, ui) {
		            selectedMenu = ui.cmd;
		            var grid = event.target.component;
		            if(!grid.currentCell)
		            grid.currentCell = grid.getBodyContainer().getCellFromMouseEventTarget(ui.target[0].component);

		            if(ui.cmd == 'sortAsc'){
		              	setSelectedMenu = ui.cmd;
		               	$this._handleRightMenuWithSort(grid.currentCell,true);
		            }else if(ui.cmd == 'sortRepAsc'){
		               	setSelectedMenu = ui.cmd;
		               $this._handleRightMenuWithSort(grid.currentCell,true);
		            }else if(ui.cmd == 'sortDesc'){
		              	setSelectedMenu = ui.cmd;
		               $this._handleRightMenuWithSort(grid.currentCell,false);
		            }else if(ui.cmd == 'cancelSort'){
		            	$this._removeColumnSort(grid.currentCell);
		               	$this._handleRightMenuWithSort(grid.currentCell,null);
		            }else if(ui.cmd == 'hideColumn'){
		            	var levels = $this.options.windowConfig.levels;
		            	var levelConfig;
		            	if(levels){
		            		for(var i=0;i<levels.length;i++){
		            			if(levels[i].tableLevel == grid.currentCell.getColumn().level.getNestDepth()){
		            				levelConfig = levels[i].levelConfiguration;
		            				break;
		            			}
		            		}
		            	}
		            	var colsArray = levelConfig.metadata;

		            	if(colsArray &&  Object.keys(colsArray).length){
		            		$.each(colsArray,function(key,value){
								if(grid.currentCell.getColumn().dataField == value.name) {
									value.hide = true;
							 	}
							});
		            	}
		            	grid.currentCell.getColumn().setVisible(false);
		            	grid.currentCell.getColumn().level.adjustColumnWidths();

                        if (grid.currentCell.getColumn().level.hasSort(grid.currentCell.getColumn())) {
                            $this._removeColumnSort(grid.currentCell);
                        }
		            	grid.rebuild();
		            	$this.options.drawer[$this.options.drawerWidget]("hideColumnList",$this.options.windowConfig);
		            }else if(ui.cmd == 'removeAllSort'){
		            	grid.currentCell.level.currentSorts.removeAll();
		            	$this._handleRightMenuWithSort(grid.currentCell,null);
		            }else if(ui.cmd == 'removeInlineFilter'){
		            	grid.clearFilter();
						grid.rebuild();
		            }
		        }
			});
		},

   		_onDrawerCreationComplete : function(e,data){
    		var $this = this;
			var listdata = $this.options.windowConfig;
			$this.options.drawer[$this.options.drawerWidget]("setHideColumnList",listdata);
			$this.options.drawer[$this.options.drawerWidget]().bind($this.options.drawerWidget.toLowerCase()+"_applytabledrawersettings",function(event,drawerConfig){
				$this._applyDrawerSettings(drawerConfig);
			});
			this._super();
		},

    	_applyDrawerSettings : function(drawerConfig){
			var $this = this;
			//$this._applyDrawerSettings(data);
			var levels = $this.options.windowConfig.levels;
			var levelConfig;
			var showHiddenColumns;
			var htmlGrid = $this._getOptionValue("grid");
			var level;
			var columns;
			if(drawerConfig){
				for(var i=0;i<levels.length;i++){
					var levelDescription = (levels[i].description==undefined)?"Level"+levels[i].tableLevel:levels[i].description;
					levelConfig = levels[i];
					var tabValue = levelDescription.replace(/[_\W]+/g, "-")+levels[i].tableLevel;
					var currentLevelConfig = drawerConfig[tabValue];
					if(currentLevelConfig){
						showHiddenColumns = currentLevelConfig.showHideList;
						level = htmlGrid.getColumnLevel();
						while(level.getNestDepth() != levelConfig.tableLevel){
							level = level.nextLevel;
						}
						if (currentLevelConfig.zoomAltitudeValue) {
							$this.options.zoomAltitude = currentLevelConfig.zoomAltitudeValue;
						}

						$this.options.showItemOnMap = currentLevelConfig.showItemMapValue;
						$this.options.zoomOnMap = currentLevelConfig.panZoomMapValue;
						var tool = $this.element.parent().find("#locateTool");
						if (tool) {
							if(!$this.options.zoomOnMap){
								if (tool.hasClass("locate-enabled")) {
									tool.removeClass("locate-enabled");
								}
								tool.addClass("locate-disabled");
								tool.attr("disabled",true);
							}
						}
						columns = level.getColumns();
						if(showHiddenColumns){
							var showColumns = [];
							for(var x=0;x<showHiddenColumns.length;x++){
								var dataValue = showHiddenColumns[x];
								$.each(levelConfig.levelConfiguration.metadata , function(key, value ) {
									if(value.displayName == dataValue){
										showColumns.push(value.name);
									}
								 });
							}
							$.each(showColumns,function(index,showColumn){
								var columnObj = level.getColumnByDataField(showColumn);
								columnObj.setVisible(true);
							});
						}
					}
				}
			}
			htmlGrid.reDraw();
			htmlGrid.rebuild();
		},

		_removeColumnSort: function (cell) {
			var $this = this;
			var column = cell.getColumn();
			var sortArray = cell.level.currentSorts;
		    var currentColumn;
		    var idx;
		    for(var i =0; i < sortArray.length; i++){
		    	currentColumn = sortArray[i];
		        if(currentColumn.sortColumn == column.dataField){
		        	idx = i;
		        	break;
		        }
		     }
		     cell.level.currentSorts.splice(idx,1);
        },

		applyWindowData: function () {
            this.operateData(this.options.windowData);
        },

	    _initializeOptions: function(){
	    	this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = this._getDataGridId();

			//Set disclosure icon option
			if(this._getOptionValue("enableDefaultDisclosureIcon") == undefined){
				this._setOptionValue("enableDefaultDisclosureIcon", true);
			}

			//set MultiColumn Sort option
			if(this._getOptionValue("enableMultiColumnSort") == undefined){
				this._setOptionValue("enableMultiColumnSort", true);
			}

			//set horizontal scroll policy option
			if(this._getOptionValue("horizontalScrollPolicy") == undefined){
				this._setOptionValue("horizontalScrollPolicy", "auto");
			}
	    },

	    _getDataGridId: function(){
	    	if(this.element != undefined){
	    		return $(this.element).attr("id");
	    	}
	    },

	    _getWindowConfigurationByProperty: function(name){
	    	var windowConfiguration;
	    	if(name != undefined){
	    		windowConfiguration = this.options.windowConfig;
	    		if(windowConfiguration != undefined){
	    			return windowConfiguration[name];
	    		}
	    	}
	    },

	    _getOptionValue: function(propertyName){
	    	if(this.options != undefined){
	    		if(this.options[propertyName] != undefined){
	    			return this.options[propertyName];
	    		}
	    	}
	    },

	    _setOptionValue: function(propertyName, value){
	    	if(this.options != undefined){
	    		this.options[propertyName] = value;
	    	}
	    },

	    _initializeGridProperties: function(){
	    	var htmlDataGrid = this._getOptionValue("grid");
	    	if(htmlDataGrid!= undefined){

	    		htmlDataGrid.setPagerRenderer(new flexiciousNmsp.ClassFactory($si.tableGridUtils.PagerControl));
	    		htmlDataGrid.displayOrder = "header,filter,body,footer,pager";
	    		htmlDataGrid.enableDefaultDisclosureIcon = this._getOptionValue("enableDefaultDisclosureIcon");
	    		htmlDataGrid.setHorizontalScrollPolicy(this._getOptionValue("horizontalScrollPolicy"));
	    		htmlDataGrid.enableStickyControlKeySelection  = false;
	    		htmlDataGrid.rollOverColor = 0x8dcbe4;
                htmlDataGrid.textRollOverColor = 0xFFFFFF;
                htmlDataGrid.selectionColor = 0x2c95d2;
				htmlDataGrid.enableKeyboardNavigation = true;
                htmlDataGrid.activeCellColor = 0x2c95d2;
                htmlDataGrid.alternatingItemColors = [0xE4EFFF, 0xF9F9F9];
				htmlDataGrid.imagesRoot = $si.tableGridUtils.IMAGE_PATH;

				htmlDataGrid.showSpinnerOnFilterPageSort = true;
	    	}

	    	this._initializeGridTopLevel();
	    	this._addDataGridEventListener();
	    },

	    _initializeGridTopLevel: function(){
	    	var htmlDataGrid = this._getOptionValue("grid");
	    	var topLevel;
	    	if(htmlDataGrid != undefined){
	    		topLevel = htmlDataGrid.getColumnLevel();
	    	}
	    	this._setDataGridLevelProperties(topLevel);
	    },

	    _addDataGridEventListener: function(){
	    	this._addEventListener(null, "itemRollOver", $si.tableGridUtils.grid_itemRollOverHandler.bind(this));
	    	this._addEventListener(null, "itemRollOut", $si.tableGridUtils.grid_itemRollOutHandler);
	    	this._addEventListener(null, "itemDoubleClick", this._zoomRow.bind(this));
			this._addEventListener(null, "itemClick", this._highlightRow.bind(this));
			this._addEventListener(null, "filterPageSortChange", this._onFilterPageSortChange.bind(this));
			this._addEventListener(null, "itemLoad", this._loadNextLevel.bind(this));
	    },

	    _addEventListener: function(target, event, callbackHandler){
	    	var htmlDataGrid = this._getOptionValue("grid");
	    	if(htmlDataGrid != undefined){
	    		htmlDataGrid.addEventListener(target, event, callbackHandler);
	    	}
	    },

	    _onFilterPageSortChange:function(event){
	    	//maintain the parentObject to be used later for setting the data
	    	this.parentFilterObject = event.filter.parentObject;
	    	this.currentLevel = event.filter.level;
	    	this.currentLevelIndex = event.filter.level.getNestDepth();
	    	this.currentParentLevel = event.filter.level.getParentLevel();
	    	//prevent the sorting on header click
			if(event.cause == "sortChange"){
				this.currentLevel.currentSorts = this.currentLevel.currentSorts.slice(-1,-1);
				this.currentLevel.grid.rebuild();
				return;
	    	}
	    	//create params object
			var windowParams = this._getWindowParams(event);
			//for filtering
			//if(event.cause == "filterChange"){
				var filterItems = [];
				if(event.filter.filterExpressions){
					var filterExpression;
					var item;
					for(var i=0;i<event.filter.filterExpressions.length;i++){
						filterExpression = event.filter.filterExpressions[i];
						var filterControlValue = filterExpression.filterControlValue;
						if(filterExpression.filterComparisionType == "date"){
							filterControlValue = [];
							for(var j=0;j<filterExpression.expression.length;j++){
								filterControlValue[j] = moment(filterExpression.expression[j],"ddd MMM DD yyyy HH:mm:ss Z").format(this.DATE_FORMAT);
							}
						}
						var valueParam;
						if(filterExpression.filterOperation == "Between"){
							valueParam = {
								lowValue : filterControlValue[0],
								highValue : filterControlValue[1]
							}
						}else{
							valueParam = filterControlValue;
						}
						item = {
							fieldName : filterExpression.columnName,
							value : valueParam,
							operator : filterExpression.filterOperation == "Contains" ? "Like" : filterExpression.filterOperation,
							dataType : null,
						}
						if(item.value){
							filterItems.push(item);
						}
					}
					var inlineFilterTool = this.element.parent().find("#inlinefilterTool");
					var title;
					if(filterItems.length > 0){
						windowParams["criteria"] = $si.filterUtils.createAllCriteriaJSONString(filterItems);
						title = $si.i18N.Window.tooltip.inlinefilter;
						inlineFilterTool.attr('title',title);
						if(inlineFilterTool.hasClass("inlinefilter-icon")){
							inlineFilterTool.removeClass("inlinefilter-icon");
						}
						inlineFilterTool.addClass("inlinefilter-applied");
					}else{
						windowParams["criteria"] = null;
						title = $si.i18N.Window.tooltip.hideinlinefilter;
						if(inlineFilterTool.hasClass("inlinefilter-applied")){
							inlineFilterTool.removeClass("inlinefilter-applied");
						}
						inlineFilterTool.addClass("inlinefilter-icon");
					}
					inlineFilterTool.attr('title',title);
				}
			//}else
			if(event.cause == "pageChange"){
				windowParams["pageIndex"] = event.filter.pageIndex;
				//set the pageIndex in level, as it's not getting updated automatically
				this.currentLevel._pageIndex = event.filter.pageIndex;
				windowParams["pageSize"] = event.filter.pageSize;
			}
			if(windowParams){
				$si.routes.invokeWindowDataService(this._onWindowDataLoadSuccess.bind(this),this.dataFailure,windowParams);
			}
	    },

	    _invokeWindowDataService : function(){
	    	var grid = this.options.grid;
	    	grid.collapseAll();
			$si.routes.invokeWindowDataService(this._onWindowDataLoadSuccess.bind(this), this._onWindowDataLoadFailure.bind(this), this._getCommonParams());
		},

		_setTimeFilterCriteria : function(event,data) {
			try{
				if(data){
					//setting page index to 0 on time filter event
					this.options.windowConfig.windowDatasource.parameters.pageIndex = 0;
					this._super(event,data);
				}
			} catch(e){
				$si.Logger('baseWindow -> ').error("Error ["+e.message+"] occurred in _setTimeFilterCriteria ["+this.options.title+"]");
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._setTimeFilterCriteria);
			}
		},

	    _getCommonParams : function(){
	    	var windowConfig = this.options.windowConfig;
			var grid = this._getOptionValue("grid");
			if(windowConfig){
				var refreshProperties = windowConfig.refreshProperties;
				var windowParams = windowConfig.windowDatasource.parameters;
				windowParams.windowId = windowConfig.id;

				windowParams.isApplyFilterCriteria = windowConfig.enableFilter;
				if(windowParams.isApplyFilterCriteria == true) {
					windowParams.filterCriteria = this.options.filterCriteria;
				}

				windowParams.isApplyTimeFilter  = windowConfig.timeAware;
				if(windowParams.isApplyTimeFilter == true) {
					windowParams.timeFilterCriteria = this.options.timeFilterCriteria;
				}

				windowParams.isApplyBoundingBox  = this.isCameraSensitive();
				if(windowParams.isApplyBoundingBox) {
					windowParams.bbox = this.options.boundingBox;
				}
				if(refreshProperties && refreshProperties.refreshOnLasso) {
					windowParams.isApplyLassoRegions = (refreshProperties.refreshOnLasso == true);
				}
				//add the custom data params
				if(windowConfig._customDataParams) {
					$.each(windowConfig._customDataParams,function(paramName, paramValue){
   	    				windowParams[paramName] = paramValue;
   	    			});
				}
				if(this.options.windowConfig.levels && this.options.windowConfig.levels.length > 0){
					windowParams.pageSize = this.options.windowConfig.levels[0].levelConfiguration.levelDetails.levelRows;
				}else{
					windowParams.pageSize = 5;
				}
				windowParams.level = 1;
				var sortParam = "";
				var colLevel = grid.getColumnLevel();
				if(colLevel.currentSorts){
					for(var i=0;i<colLevel.currentSorts.length;i++){
						sortParam +=colLevel.currentSorts[i].sortColumn + ":" + colLevel.currentSorts[i].isAscending + ",";
					}
					windowParams["sortParam"] = sortParam;
				}
				return windowParams;
			}
			return null;
	    },

	    _getWindowParams : function(e){
	    	var windowConfig = this.options.windowConfig;
	    	var sortParam = "";

			if(windowConfig){
				var windowParams = this._getCommonParams();
				if(this.currentLevel){
					var criteria = null;
					var parentLevel = this.currentLevel.getParentLevel();
					if(parentLevel){
						var keyField = parentLevel.selectedKeyField;
						var filterItems = new Object();
						filterItems.fieldName = keyField;
						filterItems.value =  e.filter.parentObject[keyField];
						filterItems.operator = $si.Operators.equalTo.value;
						filterItems.dataType = null;
						criteria = $si.filterUtils.createAllCriteriaJSONString([filterItems]);
					}
					windowParams["levelCriteria"] = criteria;
					if(this.currentLevel.currentSorts){
			        	for(var i=0;i<this.currentLevel.currentSorts.length;i++){
			        		sortParam += this.currentLevel.currentSorts[i].sortColumn + ":" + this.currentLevel.currentSorts[i].isAscending + ",";
			        	}
			        	windowParams["sortParam"] = sortParam;
			        }
				}
				windowParams["level"] = this.currentLevelIndex;
				return windowParams;
			}
			return null;
	    },

	    _loadNextLevel : function(event){
	    	//maintain the parentObject and currentLevelIndex to be used later for setting the data
	    	this.parentFilterObject = event.filter.parentObject;
	    	this.currentLevelIndex = event.filter.level.getNestDepth();
	    	this.currentLevel = event.filter.level;
	    	this.currentParentLevel = event.filter.level.getParentLevel();
	    	//create params object
			var windowParams = this._getWindowParams(event);
			//set page index to 0 and page size to designer default for loading next level
			windowParams.pageIndex = 0;
			windowParams.pageSize = this.options.windowConfig.levels[this.currentLevelIndex -1].levelConfiguration.levelDetails.levelRows;
			if(windowParams){
				$si.routes.invokeWindowDataService(this._onWindowDataLoadSuccess.bind(this),this.dataFailure,windowParams);
			}
		},

	    _setDataGridLevelProperties: function(columnLevel){
	    	if(columnLevel != undefined){
	    		columnLevel.setEnableFooters(true);
	    		//set the itemLoadMode and filterPageSortMode to server
				columnLevel.itemLoadMode = "server";
				columnLevel.filterPageSortMode = "server";
	    		columnLevel.setHeaderHeight(30);
	    		columnLevel.enableFilters = true;
	    		columnLevel.enablePaging = true;
	    		if(this.options.windowConfig.levels && this.options.windowConfig.levels.length > 0){
	    			columnLevel.pageSize=this.options.windowConfig.levels[0].levelConfiguration.levelDetails.levelRows;
	    		}else{
	    			columnLevel.pageSize=5;
	    		}
	    	}
	    },

		_addDataGridColumns : function(){
			var $this = this;

			var levels = $this._getWindowConfigurationByProperty("levels");

			var htmlDataGrid = $this._getOptionValue("grid");

			var gridColumns = [];
			var currentLevel;
			var columnDetail;
			var	columnDetails;
			var currentLevelConfig;
			var	metaDataMap;

			for(var levelIndex=0;levelIndex<levels.length;levelIndex++){
				gridColumns = [];
				currentLevelConfig = levels[levelIndex].levelConfiguration;
				metaDataMap = currentLevelConfig.metadata;
				columnDetails = currentLevelConfig.columnDetails;
				if(htmlDataGrid && metaDataMap &&  Object.keys(metaDataMap).length){
		    		var dataGridColumn;

					if(levelIndex==0){
						htmlDataGrid.variableRowHeight = true;
						//Column Text and Background Color functions
						htmlDataGrid.cellBackgroundColorFunction = $this._getColumnBackground.bind($this);
						htmlDataGrid.cellTextColorFunction = $this._getColumnTextColor.bind($this);;
						currentLevel = htmlDataGrid.getColumnLevel();
					}else{
						$this._addDataGridLevel(currentLevelConfig,currentLevel);
						currentLevel = currentLevel.nextLevel;
					}
		    		$.each(metaDataMap,function(key,metadata){
	    				columnDetail =  columnDetails != undefined? columnDetails[metadata.name]: undefined;
	    				dataGridColumn = $this._createDataGridColumn(currentLevel, metadata, columnDetail, levelIndex);
						dataGridColumn.setStyle("headerPaddingLeft",14);
						dataGridColumn.setStyle("headerPaddingRight",14);
						dataGridColumn.setStyle("headerPaddingTop",8);
						dataGridColumn.minWidth = 53;
						if(metadata.type == $this.dataTypes[0] || metadata.type == $this.dataTypes[1] || metadata.type == $this.dataTypes[2] || metadata.type == $this.dataTypes[3]){
	    					dataGridColumn.setStyle("textAlign","center");
	    				}else{
	    					dataGridColumn.setStyle("textAlign","right");
	    					dataGridColumn.setStyle("paddingRight",4);
	    				}
	    				//add Summary Fields to column, if any
	    				$this._addDataGridColumnSummaryFields(dataGridColumn, currentLevelConfig.summaryFields);
	    				gridColumns.push(dataGridColumn);
					});
				}
				if(gridColumns && currentLevel){
		    		currentLevel.setColumns(gridColumns);
				}
				//If last level, set the hasGeographicData
				if(levelIndex == (levels.length -1)){
					$this.options.hasGeographicData = currentLevelConfig.windowDatasource ? currentLevelConfig.windowDatasource.hasGeographicData : false;
				}
			}
			$this._refreshDataGrid();
		},

		_addDataGridColumnSummaryFields: function(dataGridColumn, summaryFields){
			if(dataGridColumn && summaryFields){
				var summaryProperty = summaryFields[dataGridColumn.dataField];
				if(summaryProperty){
					switch (summaryProperty.summaryType.toLowerCase()){
					case flexiciousNmsp.FlexDataGridFooterCell.SUM:
                        dataGridColumn.footerLabel = "Sum: ";
						dataGridColumn.footerOperation = "sum";
						dataGridColumn.footerOperationPrecision = 2;
                        break;
                    case flexiciousNmsp.FlexDataGridFooterCell.AVERAGE:
                       	dataGridColumn.footerLabel = "Avg: ";
						dataGridColumn.footerOperation = "average";
						dataGridColumn.footerOperationPrecision = 2;
                        break;
                    case flexiciousNmsp.FlexDataGridFooterCell.MIN:
                        dataGridColumn.footerLabel = "Min: ";
						dataGridColumn.footerOperation = "min";
						dataGridColumn.footerOperationPrecision = 2;
                        break;
                    case flexiciousNmsp.FlexDataGridFooterCell.MAX:
                    	dataGridColumn.footerLabel = "Max: ";
                       	dataGridColumn.footerOperation = "max";
						dataGridColumn.footerOperationPrecision = 2;
                        break;
                    case flexiciousNmsp.FlexDataGridFooterCell.COUNT:
                    	dataGridColumn.footerLabel = "Count: ";
						dataGridColumn.footerOperation = "count";
						dataGridColumn.footerOperationPrecision = 0;
                        break;
                    }
				}
			}
		},

		_getColumnBackground: function (cell){
			if(!cell.getColumn()){
				return null;
			}
			if (cell.parent.lastSelectedRowIndex == cell.rowInfo.getRowIndex()) {
                return;
            }
			var val=flexiciousNmsp.UIUtils.resolveExpression(cell.getRowInfo().getData(),cell.getColumn().dataField);
			if(!val){
				return null;
			}
			var gridLevels = this.options.windowConfig.levels;
			var nestLevel = cell.level.getNestDepth();
			var metadata = gridLevels[nestLevel-1].levelConfiguration.metadata[cell.getColumn().dataField];
			var dataType = metadata.type;
			var gridLevel;
			var levelConfig;
			var cellColors;
			var colorConfig;
			var colors;
			var color;
			var tempColorValue;
			if(gridLevels){
				for(var i=0;i<gridLevels.length;i++){
					gridLevel = gridLevels[i];
					if(gridLevel && gridLevel.tableLevel && gridLevel.tableLevel == nestLevel){
						levelConfig = gridLevel.levelConfiguration;
						if(levelConfig){
							cellColors = levelConfig.cellColors;
							if(cellColors){
								colorConfig =  cellColors[cell.getColumn().dataField];
								if(colorConfig){
									colors = colorConfig.colors;
									if(colors && colors.length > 0){
										for(var j=0;j<colors.length;j++){
											color = colors[j];
											var operator = color.operator;
											if(operator){
												if (dataType=="java.util.Date"){
					                        		var displayFormat = metadata.displayFormat;
													if(!displayFormat){
														displayFormat = this.DATE_FORMAT;
													}else{
														displayFormat = displayFormat.replace("dd","DD");
													}
													val = moment(val, this.DATE_FORMAT).toDate().getTime();
													tempColorValue = moment(color.value, displayFormat).toDate().getTime();
												}
												else{
													tempColorValue = color.value;
												}
												if(operator == "LesserThan"){
													if(val < tempColorValue){
														return color.backgroundColor.replace("#","0x");
													}
												}else if(operator == "GreaterThan"){
													if(val > tempColorValue){
														return color.backgroundColor.replace("#","0x");
													}
												}else if(operator == "LesserThanEquals"){
													if(val <= tempColorValue){
														return color.backgroundColor.replace("#","0x");
													}
												}else if(operator == "GreaterThanEquals"){
													if(val >= tempColorValue){
														return color.backgroundColor.replace("#","0x");
													}
												}else if(operator == "Equals"){
													if(val == tempColorValue){
														return color.backgroundColor.replace("#","0x");
													}
												}else if(operator == "NotEquals"){
													if(val != tempColorValue){
														return color.backgroundColor.replace("#","0x");
													}
												}else if(operator == "Like"){
													if(typeof val.toLowerCase === 'function' && val.toLowerCase().indexOf(tempColorValue.toLowerCase()) >= 0){
														return color.backgroundColor.replace("#","0x");
													}
												}else if(operator == "Contains"){
													if(typeof val.toLowerCase === 'function' && val.toLowerCase().indexOf(tempColorValue.toLowerCase()) >= 0){
														return color.backgroundColor.replace("#","0x");
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		    return null;
		},

		_getColumnTextColor: function (cell){
			if(!cell.getColumn()){
				return null;
			}
			if (cell.parent.lastSelectedRowIndex == cell.rowInfo.getRowIndex()) {
                return;
            }
			var val=flexiciousNmsp.UIUtils.resolveExpression(cell.getRowInfo().getData(),cell.getColumn().dataField);
			if(!val){
				return null;
			}
			var gridLevels = this.options.windowConfig.levels;
			var nestLevel = cell.level.getNestDepth();
			var metadata = gridLevels[nestLevel-1].levelConfiguration.metadata[cell.getColumn().dataField];
			var dataType = metadata.type;
			var gridLevel;
			var levelConfig;
			var cellColors;
			var colorConfig;
			var colors;
			var color;
			var tempColorValue;
			if(gridLevels){
				for(var i=0;i<gridLevels.length;i++){
					gridLevel = gridLevels[i];
					if(gridLevel && gridLevel.tableLevel && gridLevel.tableLevel == nestLevel){
						levelConfig = gridLevel.levelConfiguration;
						if(levelConfig){
							cellColors = levelConfig.cellColors;
							if(cellColors){
								colorConfig =  cellColors[cell.getColumn().dataField];
								if(colorConfig){
									colors = colorConfig.colors;
									if(colors && colors.length > 0){
										for(var j=0;j<colors.length;j++){
											color = colors[j];
											var operator = color.operator;
											if(operator){
												if (dataType=="java.util.Date"){
					                        		var displayFormat = metadata.displayFormat;
													if(!displayFormat){
														displayFormat = this.DATE_FORMAT;
													}else{
														displayFormat = displayFormat.replace("dd","DD");
													}
													val = moment(val, this.DATE_FORMAT).toDate().getTime();
													tempColorValue = moment(color.value, displayFormat).toDate().getTime();
												}
												else{
													tempColorValue = color.value;
												}
												if(operator == "LesserThan"){
													if(val < tempColorValue){
														return color.foregroundColor.replace("#","0x");
													}
												}else if(operator == "GreaterThan"){
													if(val > tempColorValue){
														return color.foregroundColor.replace("#","0x");
													}
												}else if(operator == "LesserThanEquals"){
													if(val <= tempColorValue){
														return color.foregroundColor.replace("#","0x");
													}
												}else if(operator == "GreaterThanEquals"){
													if(val >= tempColorValue){
														return color.foregroundColor.replace("#","0x");
													}
												}else if(operator == "Equals"){
													if(val == tempColorValue){
														return color.foregroundColor.replace("#","0x");
													}
												}else if(operator == "NotEquals"){
													if(val != tempColorValue){
														return color.foregroundColor.replace("#","0x");
													}
												}else if(operator == "Like"){
													if(typeof val.toLowerCase === 'function' && val.toLowerCase().indexOf(tempColorValue.toLowerCase()) >= 0){
														return color.foregroundColor.replace("#","0x");
													}
												}else if(operator == "Contains"){
													if(typeof val.toLowerCase === 'function' && val.toLowerCase().indexOf(tempColorValue.toLowerCase()) >= 0){
														return color.foregroundColor.replace("#","0x");
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		    return null;
		},

		_createDataGridColumn: function(currentLevel, metadata, columnDetail, levelIndex){
			var dataGridColumn;
			if(metadata != undefined){
				var headerText = metadata.displayName ? metadata.displayName : metadata.name;
				dataGridColumn = $si.tableGridUtils.DynamicColumns_addColumn(metadata.name, headerText);
				if(dataGridColumn != undefined && currentLevel != undefined){
					//visible flag for grid column
					if (metadata.hide != undefined) {
						dataGridColumn.setVisible(!metadata.hide);
					}
					this._setDataGridColumnProperties(currentLevel, dataGridColumn, columnDetail, metadata);
					this._setDataGridColumnSortProps(currentLevel, dataGridColumn, columnDetail);
					//set action button and html links for columns
					this._setDataGridColumnLinksAndImages(dataGridColumn, levelIndex+1);
					return dataGridColumn;
				}
			}
		},

		_setDataGridColumnSortProps: function(currentLevel, dataGridColumn, columnDetail){
			if(columnDetail && columnDetail.sortType!="None"){
				var filterSort = new flexiciousNmsp.FilterSort;
				filterSort.column = dataGridColumn;
				filterSort.column.sortable = true;
				filterSort.sortColumn = dataGridColumn.dataField;
				filterSort.isAscending = columnDetail.sortType == "Ascending";
				currentLevel.addSort(filterSort);
			}
		},

		_setDataGridColumnProperties: function(currentLevel, dataGridColumn, columnDetail, metadata){
			if(dataGridColumn != undefined && columnDetail != undefined){
				//Set the initial sorting to false, so that user cannot left click and sort.
				dataGridColumn.sortable = false;

				if (columnDetail.columnWidth != undefined && columnDetail.columnWidth > 0) {
					dataGridColumn.setWidth(columnDetail.columnWidth);
					dataGridColumn.setColumnWidthMode("fixed");
				}else {
					dataGridColumn.setColumnWidthMode("fitToContent");
				}

		        if(columnDetail["displayType"] != undefined) {
			 		var displayType = columnDetail["displayType"];
			 		if(displayType == "html"){
			 			dataGridColumn.setLabelFunction(this._addCellTypeHyperlink.bind(this));
			 		}else if(displayType == "image"){
			 			dataGridColumn.setLabelFunction(this._addCellTypeImage.bind(this));
			 		}
			 	}

		        if(columnDetail["wrapText"] != undefined && columnDetail["wrapText"] == true){
		        	dataGridColumn.wordWrap = true;
		        }

		        if(columnDetail["key"] != undefined && columnDetail["key"] == true){
					if(currentLevel.selectedKeyField == ""){
						currentLevel.selectedKeyField = columnDetail["columnName"];
					}
		        }

		        dataGridColumn.truncateToFit = false;

		        //Set the column filter control types
		        if(columnDetail.inlineFilterType != undefined && dataGridColumn != undefined){
		        	if(currentLevel.getNestDepth() == 1 && !this.options.inlineFilterDefined){
		        		this.options.inlineFilterDefined = true;
		        	}
					switch(columnDetail.inlineFilterType){
					case "Range":
						dataGridColumn.setFilterControl(this.inlineFilterControls[1]);
						dataGridColumn.filterTriggerEvent = "enterKeyUp";
						break;
					case "Text":
						dataGridColumn.setFilterControl(this.inlineFilterControls[0]);
						dataGridColumn.filterTriggerEvent = "enterKeyUp";
						if(metadata && metadata.type === "java.lang.String"){
							dataGridColumn.filterOperation = "Contains";
						}else{
							dataGridColumn.filterOperation = "Equals";
						}
						break;
					case "Date":
						dataGridColumn.setFilterControl(this.inlineFilterControls[2]);
						dataGridColumn.filterComparisionType = "date";
						dataGridColumn.setFilterControl("DateComboBox");
						break;
					}
				}
		    }
		},

		_addDataGridLevel: function(currentLevelConfig,currentLevel){
	    	if(currentLevel != undefined){
	    		var level = this._createDataGridLevel();
	    		level.setEnableFooters(true);
	    		level.enableFilters = true;
	    		level.enablePaging = true;
				level.pageSize = currentLevelConfig.levelDetails.levelRows;
	    		level.setPagerRenderer(new flexiciousNmsp.ClassFactory($si.tableGridUtils.PagerControl));
	    		level.itemLoadMode = "server";
				level.filterPageSortMode = "server";
				level.displayOrder = "header,filter,body,footer,pager";
		    	currentLevel.nextLevel = level;
	    	}
  		},

	    _createDataGridLevel: function(){
	    	return new flexiciousNmsp.FlexDataGridColumnLevel(this._getOptionValue("grid"));
	    },

	    /*
	    _setDataGridColumnLinksAndImages : function (dataGridColumn, levelIndex) {
	    	var levels = this.options.windowConfig.levels;
	    	var levelConfig;
	    	if(levels){
	    		for(var i=0;i<levels.length;i++){
	    			if(levels[i].tableLevel == levelIndex){
	    				levelConfig = levels[i].levelConfiguration;
	    				break;
	    			}
	    		}
	    	}
			var hyperLinkColumnsDetails = levelConfig.hyperLinkColumns;
			var actionButtonDetail = levelConfig.actionButtonColumns;
			if(hyperLinkColumnsDetails && hyperLinkColumnsDetails[dataGridColumn.dataField]){
				dataGridColumn.setLabelFunction(this._renderCellWithLinksAndActionButtons.bind(this));
			}
			if(actionButtonDetail && actionButtonDetail[dataGridColumn.dataField]){
				dataGridColumn.setLabelFunction(this._renderCellWithLinksAndActionButtons.bind(this));
			}
		},
		*/

		_setDataGridColumnLinksAndImages : function (dataGridColumn, levelIndex) {
	    	dataGridColumn.setLabelFunction(this._renderCellWithFormatDataANDLinksAndActionButtons.bind(this));
		},

		_renderCellWithFormatDataANDLinksAndActionButtons : function (cell, state) {
			var actionAndLinkDetails = "";
			var columnName = state.dataField;
		    var columnValue = cell[columnName];
			var hyperLinkInfo = this._buildHyperLinks(columnName, columnValue, state.level.getNestDepth());
			var actionButtonInfo = this._buildActionButtons(columnName, columnValue, state.level.getNestDepth());
			if(hyperLinkInfo && hyperLinkInfo.length > 0 ) {
				actionAndLinkDetails= actionAndLinkDetails.concat(hyperLinkInfo);
			} else {
				actionAndLinkDetails = this._buildColumnDisplayTypeData(columnName, this._formatColumnData(columnName, columnValue,state.level.getNestDepth()),state.level.getNestDepth());
			}
			if(actionButtonInfo && actionButtonInfo.length > 0){
				actionAndLinkDetails = actionAndLinkDetails.concat(actionButtonInfo);
			}
			return actionAndLinkDetails;
		},

		//Build the Links / Images / return text based on the displayType provided as part of the Column Details
		_buildColumnDisplayTypeData : function (columnName, columnValue, levelIndex) {
			var $this = this;
			var levels = $this.options.windowConfig.levels;
			var levelConfig;
	    	if(levels){
	    		for(var i=0;i<levels.length;i++){
	    			if(levels[i].tableLevel == levelIndex){
	    				levelConfig = levels[i].levelConfiguration;
	    				break;
	    			}
	    		}
	    	}
	    	if(levelConfig){
				var columnDetails = levelConfig.columnDetails;
				var displayType;
				if (columnDetails && columnDetails[columnName]) {
					displayType = columnDetails[columnName].displayType;
					if(displayType && displayType == 'Image'){
						return "<img src=" + columnValue + "></img>";
					}  else if(displayType && displayType == 'Html'){
						return "<a href= " + columnValue + " id = ID_" + columnName + " class = 'ct-link' target='_blank'>" + columnValue + "</a>";
					}
				}
				return columnValue;
	    	}
		},

		//to add display type as hyperlink
		_buildHyperLinks: function (columnName, columnValue, levelIndex) {
		    var $this = this;
		    var hyperLinkUrl ;
		    var levels = this.options.windowConfig.levels;
	    	var levelConfig;
			var windowParams = this.options.windowConfig.windowDatasource.parameters;
	    	if(levels){
	    		for(var i=0;i<levels.length;i++){
	    			if(levels[i].tableLevel == levelIndex){
	    				levelConfig = levels[i].levelConfiguration;
	    				break;
	    			}
	    		}
	    	}
	    	if(levelConfig){
				var hyperLinkColumns = levelConfig.hyperLinkColumns;
			    if(hyperLinkColumns && hyperLinkColumns[columnName]){
			    	var hyperLinkDetail = hyperLinkColumns[columnName];
			    	var onClickFunctionName = hyperLinkDetail.onClickFunction;
			    	var onClickMethod = "window['" + onClickFunctionName + "']('" + columnName +"','"+escape(columnValue) + "','" + windowParams.ecosid + "','" + windowParams.artefactname +"')";
			    	hyperLinkUrl = "<a href='#' onclick = " + onClickMethod + " id = ID_" + columnName + "_" + escape(columnValue)  + " class = 'ct-link'>" + columnValue + "</a>";
			    }
			    return hyperLinkUrl;
	    	}
		},

		//to add display type as action button
		_buildActionButtons : function (columnName, columnValue, levelIndex) {
		    var $this = this;
			var actionButtonURL="";
		    var buttonName;
		    var imageURL ;
		    var onClickFunctionName;
		    var showFunctionName;
		    var tooltipLabel;
		    var levels = this.options.windowConfig.levels;
	    	var levelConfig;
	    	if(levels){
	    		for(var i=0;i<levels.length;i++){
	    			if(levels[i].tableLevel == levelIndex){
	    				levelConfig = levels[i].levelConfiguration;
	    				break;
	    			}
	    		}
	    	}
	    	if(levelConfig){
				var actionButtonDetail = levelConfig.actionButtonColumns;
			    if(actionButtonDetail){
		            if (actionButtonDetail[columnName]) {
		                actionButtonList = actionButtonDetail[columnName];
		                for (var i = 0; i < actionButtonList.length; i++) {
		                    buttonName = actionButtonList[i].buttonName;
		                    imageURL = actionButtonList[i].imageURL;
		                    onClickFunctionName = actionButtonList[i].onClickFunction;
		                    showFunctionName = actionButtonList[i].showFunction;
		                    tooltipLabel = actionButtonList[i].tooltip;
		                    var onClickMethod = "window['" + onClickFunctionName + "']('" + columnName +"','"+escape(columnValue) + "','" + this.options.windowConfig.windowDatasource.parameters.ecosid + "','" + this.options.windowConfig.windowDatasource.parameters.artefactname +"')";
		                    actionButtonURL = actionButtonURL.concat('<span class="ct-action-button"><img style="float:right;" src="' + imageURL + '" onclick = "' + onClickMethod + '" id = "' + onClickFunctionName + '" class = "' + onClickFunctionName + '" title=" ' + tooltipLabel + '"></span>');
		                }
		                return actionButtonURL;
		            }
	            }
			    return;
	    	}
		},

	    _formatColumnData : function (columnName, columnValue, levelIndex) {
			var $this = this;
			var levels = this.options.windowConfig.levels;
			var levelConfig;
			if(levels){
	    		for(var i=0;i<levels.length;i++){
	    			if(levels[i].tableLevel == levelIndex){
	    				levelConfig = levels[i].levelConfiguration;
	    				break;
	    			}
	    		}
	    	}

			var metaDataMap = levelConfig.metadata;
			if(metaDataMap != undefined && metaDataMap[columnName] != undefined && metaDataMap[columnName].type != this.options.dataTypes[1]) {
				columnValue = $si.formattingUtil.formatData(metaDataMap[columnName].type, metaDataMap[columnName].displayFormat, columnValue);
			}
			return columnValue;
		},

		_refreshDataGrid: function(){
			var htmlDataGrid = this._getOptionValue("grid");
	    	if(htmlDataGrid != undefined){
	    		htmlDataGrid.reDraw();
	    	}
		},

		_addHtmlDataGrid :  function() {
			if(this.element != undefined){
				this.element.prepend(this.CONTAINER_TEMPLATE({
					id:this.options.id
				}));
			}
			this._createHtmlDataGrid();
        },

        _createHtmlDataGrid: function(){
        	var gridContainer;
        	if(this.options.id != undefined){
        		gridContainer = document.getElementById(this.options.id+"_grid");
        		if(gridContainer != undefined){
        			gridContainer.parentNode.style.overflow = "hidden";
        			this.options.grid = new flexiciousNmsp.FlexDataGrid(gridContainer,{
						id:this.options.id+'ServerSideTable'
					});
        		}
        	}
        	delete gridContainer; //free memory
        },

		onWindowToolControlClick : function(toolId){
			var $this = this;
			var grid = this.options.grid;
			var title = null;
			if(toolId == 'inlinefilterTool'){
				// for enabling or disabling filter tool
				var inlinefilterTool = $this.element.parent().find("#inlinefilterTool");
				var gridLevel = grid.getColumnLevel();
				var enableFilter = gridLevel.getEnableFilters();
				gridLevel.setEnableFilters(!enableFilter);
				grid.reDraw();
			}else if(toolId == 'locateTool'){
				$this._zoomRow($this.selectedRowData);
			}else if (toolId == 'saveasTool') {
                $si.viewer.serverSideColumnDetails = $this._getWindowConfigurationByProperty("metadata");
				$si.viewer.windowParams = this.options.windowConfig.windowDatasource.parameters;
				// Create server side table tree for level and columns
				var levels = $this._getWindowConfigurationByProperty("levels");
				var serverSideTree = new Array();
				var sortString = "";
				for(var i=0; i<levels.length; i++){
					var levelObject = new Object();
					levelObject.text = (levels[i].description==undefined)?"Level"+levels[i].tableLevel:levels[i].description;
					levelObject.id = (levels[i].description==undefined)?"Level"+levels[i].tableLevel:levels[i].description;
					levelObject.items = new Array();
					levelObject.expanded = true;
					levelObject.checked = true;
					var columnsObject =  levels[i].levelConfiguration.columnDetails;
					var metadata =  levels[i].levelConfiguration.metadata;
					var columns = Object.keys(columnsObject);
					var metadataKeys = Object.keys(metadata);
					for(var j=0; j<columns.length; j++){
						levelObject.items[j] = new Object();
						levelObject.items[j].id = columnsObject[columns[j]].columnName;
						for(var k=0; k<metadataKeys.length; k++){
							if(levelObject.items[j].id==metadata[metadataKeys[k]].name){
								levelObject.items[j].text = metadata[metadataKeys[k]].displayName;
							}
						}
						levelObject.items[j].expanded = true;
						levelObject.checked = true;
					}
					serverSideTree.push(levelObject);
					var levelIndex = i+1;
					var sorts = grid.getLevel(levelIndex).currentSorts;
					if(sorts && sorts.length>0){
						sortString = sortString+levelIndex+"~";
						for(var j=0; j<sorts.length; j++){
							sortString = sortString + sorts[j].sortColumn + ":" + sorts[j].isAscending;
							if(j==sorts.length-1){
								break;
							}
							sortString=sortString+",";
						}
						sortString=sortString+"`";
					}

				}
				$si.viewer.serverSideTree = JSON.stringify(serverSideTree);
				$si.viewer.sortString = sortString;
				var rows = levels[0].levelConfiguration.levelDetails.levelRows;
				var total = this.options.firstLevelTotalRecords;
				$si.viewer.pages = Math.ceil(total/rows);

				// Merge the inlinefilter and datafilters
                var grid = this._getOptionValue("grid");
                var expressions = grid.itemFilters.TOP_LEVEL_FILTER==undefined?false:grid.itemFilters.TOP_LEVEL_FILTER.filterExpressions;
				var inlineFilter = null;
                if (expressions && expressions.length > 0) {
					var filterItems = [];
					var filterExpression;
					var item;
                    for (var i = 0; i < expressions.length; i++) {
                        filterExpression = expressions[i];
						item = {
							fieldName : filterExpression.columnName,
							value :  filterExpression.filterControlValue,
							operator : filterExpression.filterOperation,
							dataType : null,
						}
						filterItems.push(item);
                    }
                    inlineFilter = $si.filterUtils.createAllCriteria(filterItems);
                }
				var outerFilter = this.options.filterCriteria;
				$si.viewer.selectedDataFilterDetails = "";
				if(inlineFilter && outerFilter){
					var outerFilterObj = JSON.parse(outerFilter);
					var compositeRule =	new $si.filterUtils.CompositeRule("All");
					compositeRule.criterias.push(inlineFilter);
					compositeRule.criterias.push(outerFilterObj);
					$si.viewer.selectedDataFilterDetails = JSON.stringify(compositeRule);
				} else if(!inlineFilter && outerFilter){
					$si.viewer.selectedDataFilterDetails = this.options.filterCriteria;
				} else if (inlineFilter && !outerFilter){
					$si.viewer.selectedDataFilterDetails = JSON.stringify(inlineFilter);
				}

                $si.viewer.selectedTimeFilterDetails = this.options.timeFilterCriteria;
                $this.options.exportToCSVWindow = $si.windowUtil.openExportCSVWindow('serverSideTable', '500', '500');
            }
			$this._super(toolId);
		},

		closeWindow : function(){
			this.footerCols = [];
			this.selectedRowData = null;

			//Reinstate the original metadata configuration
			var copyLevels = this.options.windowConfigCopy.levels;
			var levels = this.options.windowConfig.levels;
			if(copyLevels && levels){
				for(var i=0; i<copyLevels.length; i++){
					var copyMetadata = copyLevels[i].levelConfiguration.metadata;
					if(copyMetadata){
						var copyMetaKeys = Object.keys(copyMetadata);
						if(copyMetaKeys){
							for(var j=0; j<copyMetaKeys.length; j++){
								levels[i].levelConfiguration.metadata[copyMetaKeys[j]].hide = copyMetadata[copyMetaKeys[j]].hide;
							}
						}
					}
				}
			}
			clearInterval(this.options.autorefreshInterval);
			var coordsArray = [];
			var dashboardId = this.options.windowConfig.id;
			var layerId = this.options.windowConfig.layerId;
			var hightLightProperties ={};
            hightLightProperties.highlightFeatureCount = this.options.windowConfig.highlightFeatureCount;
            hightLightProperties.highlightIconScale = this.options.windowConfig.highlightIconScale;
            hightLightProperties.highlightIconUrl = this.options.windowConfig.highlightIconUrl;
            hightLightProperties.businessViewName = this.options.windowConfig.windowDatasource.parameters.artefactname;
            $($si.viewer).trigger("setHighlight", [coordsArray, dashboardId, layerId,hightLightProperties]);
			this._super();
			this._destroy();
		},

		_zoomRow : function(row){
			var $this = this;
			if($this.options.hasGeographicData && $this.options.zoomOnMap){
				if(row.item.coordinates) {
					var lookatStr = row.item.coordinates;
					if(lookatStr) {
						var range = $this.options.zoomAltitude;
						$($si.viewer).trigger("lookAtRange", [lookatStr,range]);
					}
				}
			}
		},

		_highlightRow : function(row){
			var $this = this;
			$this.options.selectedRows = this.options.grid.getSelectedIndices();
			if ($this.options.hasGeographicData && $this.options.showItemOnMap) {
				$this.selectedRowData = row;
				var selectedRows = this.options.grid.getSelectedItems();
				var coordsArray = [];
				for(var i =0  ; i<selectedRows.length ;i++){
					if(selectedRows[i].coordinates){
						coordsArray.push(selectedRows[i].coordinates);
					}
				}
				var dashboardId = $this.options.windowConfig.id;
				var layerId = $this.options.windowConfig.layerId;
				var hightLightProperties ={};
	            hightLightProperties.highlightFeatureCount = this.options.windowConfig.highlightFeatureCount;
	            hightLightProperties.highlightIconScale = this.options.windowConfig.highlightIconScale;
	            hightLightProperties.highlightIconUrl = this.options.windowConfig.highlightIconUrl;
	            hightLightProperties.businessViewName = this.options.windowConfig.windowDatasource.parameters.artefactname;
				$($si.viewer).trigger("setHighlight", [coordsArray,dashboardId,layerId,hightLightProperties]);

				var tool = $this.element.parent().find("#locateTool");
				if(tool){
					if(this.options.grid.getSelectedItems().length > 0 && $this.options.zoomOnMap){
						if(tool.hasClass("locate-disabled")){
							tool.removeClass("locate-disabled");
						}
						tool.addClass("locate-enabled");
						tool.attr("disabled",false);
					} else {
						if(tool.hasClass("locate-enabled")){
							tool.removeClass("locate-enabled");
						}
						tool.addClass("locate-disabled");
						tool.attr("disabled",true);
					}
				}
			}
		},

		_handleRightMenuWithSort : function (cell , isAscending){
			this.currentLevel = cell.getColumn().level;
			this.currentLevelIndex = this.currentLevel.getNestDepth();
			this.parentFilterObject = cell.rowInfo.getData();
			this.currentParentLevel = this.currentLevel.getParentLevel();
			var grid = this.options.grid;
			//show the spinner while sorting
			grid.showSpinner();
			var sortParam = "";
			if(isAscending != null){
				var filterSort = new flexiciousNmsp.FilterSort;
	        	filterSort.column = cell.getColumn();
				filterSort.column.sortable = true;
				filterSort.sortColumn = cell.getColumn().dataField;
				filterSort.isAscending = isAscending;
           		this.currentLevel.addSort(filterSort);
			}
			if(this.currentLevel.currentSorts){
	        	for(var i=0;i<this.currentLevel.currentSorts.length;i++){
	        		sortParam += this.currentLevel.currentSorts[i].sortColumn + ":" + this.currentLevel.currentSorts[i].isAscending + ",";
	        	}
	        }
	        var windowParams = this._getCommonParams();
	        if(this.currentLevel.getParentLevel() && cell.rowInfo.getData()){
	        	var filterItems = [];
				var	item = {
					fieldName : this.currentLevel.getParentLevel().selectedKeyField,
					value :  cell.rowInfo.getData()[this.currentLevel.getParentLevel().selectedKeyField],
					operator : $si.Operators.equalTo.value,
					dataType : null,
				};
				filterItems.push(item);
				windowParams["levelCriteria"] = $si.filterUtils.createAllCriteriaJSONString(filterItems);
	        }else{
	        	windowParams["levelCriteria"] = null;
	        }
			windowParams["pageIndex"] = this.currentLevel._pageIndex;
			windowParams["pageSize"] = this.currentLevel.pageSize;
			windowParams["sortParam"] = sortParam;
			windowParams["level"] = this.currentLevelIndex;
	        grid.rebuildBody();
	        grid.rebuildHeader();
			$si.routes.invokeWindowDataService(this._onWindowDataLoadSuccess.bind(this),this.dataFailure,windowParams);
		},

		//to add display type as hyperlink
		_addCellTypeHyperlink :function(cell,state){
			var click = this._hyperLinkMethod;
			var $this = this;
			var hyperLinkUrl = "";
			var column = state.dataField;
			var hyperlinkDetail = $this.options.windowConfig.hyperLinkColumns;
			var onClickFunctionName = hyperlinkDetail[column].onClickFunction;
			var id =$this.counter++;
			var onClickMethod = "window['"+onClickFunctionName+"']()";
			hyperLinkUrl = "<a href='#' onclick = "+onClickMethod+" id = 'id1' class = 'id1'>click me</a>";
			return hyperLinkUrl;
		},

		//to add display type as image
		_addCellTypeImage : function(cell,state){
			var $this = this;
			var imageUrl = "";
			var column = state.dataField;
			var actionButtonDetail = $this.options.windowConfig.actionButtonColumns;
			var image = actionButtonDetail[column].imageURL;
			var onClickFunctionName = actionButtonDetail[column].onClickFunction;
			var onClickMethod = "window['"+onClickFunctionName+"']()";
			imageUrl = '<span style="padding-right: 5px;"><img src="'+image+'" onclick = "+onClickMethod+" id = "'+onClickFunctionName+'" class = "'+onClickFunctionName+'"></span>';

			return imageUrl;
		},

		operateData : function(windowData){
			var $this = this;
			var grid = this.element.find("#"+this.options.id+"_grid")[0].component;
			grid.enableDynamicLevels = true;
			if($this.currentLevelIndex == 1){
				grid.setDataProvider(windowData.attributeDataList);
				grid.setTotalRecords(windowData.totalRecords);
				//used for export, maintaing the total number of records of first level
				$this.options.firstLevelTotalRecords = windowData.totalRecords;
				//preserve the pager state
				grid.setPreservePager(true);
				if(grid.getPager()){
					//refresh the pager
					grid.getPager().refresh();
					//update the pager displayList
					grid.getPager().updateDisplayList(grid.getPager().width, grid.getPager().height);
				}
			}else{
				grid.setChildData($this.parentFilterObject, windowData.attributeDataList, $this.currentParentLevel, windowData.totalRecords);
			}
			grid.rebuild();
			//to show selecteditems after refresh
            if($this.options.selectedRows){
	        	var selectedIndices = $this.options.selectedRows;
	        	$.each(selectedIndices, function (index, rowNum) {
	            	var item = grid.getDataProvider();
	            	grid.addSelectedItem(item[rowNum]);
	            });
            }
		},

		//Favorites implementation
		getWindowContentFavoriteSettings: function () {
		    var displayOptions = {};
		    var grid = this._getOptionValue("grid");
		    displayOptions.columnProperties = this._createColumnPropertiesFavorite(grid);
		    displayOptions.aggregationProperties = this._createColumnFooterPropertiesFavorite(grid);
		    displayOptions.sortProperties = this._createColumnsSortPropertiesFavorite(grid);
		    displayOptions.filterProperties = this._createFilterPropertiesFavorite(grid);
		    return displayOptions;
		},

		_createColumnPropertiesFavorite: function (grid) {
			var levels = this.options.windowConfig.levels;
			var levelCount = levels ? levels.length : 0;
			var currentLevel;
			var columns;
			var columnProperties = {};
			if(grid && levelCount > 0){
				for(var i=1; i<=levelCount; i++){
					currentLevel = grid.getLevel(i);
					if(currentLevel){
						columns = currentLevel.getColumns();
					    var columnProps = [];
					    for (var j = 0; j < columns.length; j++) {
					        var column = columns[j];
					        if (column.getHeaderText() != "") {
					            columnProps.push({
					                "columnName": column.dataField,
					                "width": column.getWidth(),
					                "displayOrder": column.getColIndex(),
					                "visible" : column.getVisible(),
					            });
					        }
					    }
					}
					columnProperties[i] = columnProps;
				}
			}
		    return columnProperties;
		},

		_createColumnFooterPropertiesFavorite: function (grid) {
			var levels = this.options.windowConfig.levels;
			var levelCount = levels ? levels.length : 0;
			var currentLevel;
			var columns;
			var footerProperties = {};
			if(grid && levelCount > 0){
				for(var i=1; i<=levelCount; i++){
					currentLevel = grid.getLevel(i);
					if(currentLevel){
						columns = currentLevel.getColumns();
					    var footerProps = [];
					    for (var j = 0; j < columns.length; j++) {
					        var column = columns[j];
					        if (column.getHeaderText() != "" && column.footerOperation != null && column.footerOperation != "") {
					            footerProps.push({
					                "columnName": column.dataField,
					                "footerLabel": column.footerLabel,
					                "footerOperation": column.footerOperation
					            });
					        }
					    }
					}
					footerProperties[i] = footerProps;
		   		}
			}
		    return footerProperties;
		},

		_createColumnsSortPropertiesFavorite: function (grid) {
			var levels = this.options.windowConfig.levels;
			var levelCount = levels ? levels.length : 0;
			var currentLevel;
			var columns;
			var sortProperties = {};
			if(grid && levelCount > 0){
				for(var i=1; i<=levelCount; i++){
					currentLevel = grid.getLevel(i);
					if(currentLevel){
						columns = currentLevel.getColumns();
					    var sortProps = [];
					    for (var j = 0; j < columns.length; j++) {
					        var column = columns[j];
							var sort = column.level.hasSort(column);
					        if (sort) {
					            sortProps.push({
					                "sortColumn": sort.sortColumn,
					                "isAscending": sort.isAscending,
					                "sortIndex": column.level.getSortIndex(column)
					            });
					        }
					    }
					}
					sortProperties[i] = sortProps;
		   		}
			}
		    return sortProperties;
		},

		_createFilterPropertiesFavorite : function (grid){
			var filterSettings = [];
	        var filterArguments = grid.getFilterArguments();
			for(var i=0; i<filterArguments.length; i++){
				var filter = {};
				filter.columnName = filterArguments[i].columnName;
				filter.expression = filterArguments[i].expression;
				filter.filterOperation = filterArguments[i].filterOperation;
				filterSettings.push(filter);
			}
			return filterSettings;

		},

		applyWindowContentFavoriteSettings: function (favDataObj) {
		    var $this = this;
		    var htmlDataGrid = this._getOptionValue("grid");
			var inlineFilterTool = $this.element.parent().find("#inlinefilterTool");
            if (inlineFilterTool.hasClass("inlinefilter-applied")) {
 				$this.onWindowToolControlClick("inlinefilterTool");
 			}
 			$this.refreshWindow();
 			var autorefrshTool = $this.element.parent().find("#autorefreshTool");
            if (autorefrshTool.hasClass("autorefresh-icon")){
 				$this._enableAutoRefresh(true);
 			}else{
 				$this._enableAutoRefresh(false);
 			}
		    // apply column properties
		    this._applyColumnProperties(favDataObj.columnProperties);

		    // apply aggregation properties
		    if (favDataObj.aggregationProperties) {
		        this._applyColumnFooterProperties(favDataObj.aggregationProperties);
		    }

		    // apply sort properties
		    if (favDataObj.sortProperties) {
		        this._applySortProperties(favDataObj.sortProperties);
		    }
		    //apply inline filter properties
		    if(favDataObj.filterProperties && favDataObj.filterProperties.length>0){
				this._applyFilterDetails(favDataObj.filterProperties);
			}

		    //Need to close all levels, otherwise sorting won't take effect as its server side
			htmlDataGrid.collapseAll();
		    htmlDataGrid.rebuild();
		},

		_applyColumnProperties: function (columnProperties) {
			var $this = this;
		    var grid = this._getOptionValue("grid");
			var levels = this.options.windowConfig.levels;
			var levelCount = levels ? levels.length : 0;
			var currentLevel;
			var columns;
			var columnProps = [];
			if(grid && levelCount > 0){
				for(var i=1; i<=levelCount; i++){
					currentLevel = grid.getLevel(i);
					if(currentLevel){
						columns = currentLevel.getColumns();
						columnProps = columnProperties[i];
		    			// sorting columns on the basis of colIndex
					    columnProps.sort(function (a, b) {
					        var a1 = a.displayOrder,
					            b1 = b.displayOrder;
					        if (a1 == b1) return 0;
					        return a1 > b1 ? 1 : -1;
					    });
		    			var columnsToAdd = [];
					    for (var j = 0; j < columnProps.length; j++) {
					        var column = currentLevel.getColumnByDataField(columnProps[j].columnName);
					        if (column != null) {
					            columnsToAdd.push(column);
					            var width = parseInt(columnProps[j].width);
								column.setColumnWidthMode("fixed");
					            column.setWidth(width);
					            column.setVisible(columnProps[j].visible);
					        }
					    }
		    			currentLevel.setColumns(columnsToAdd);
		    			currentLevel.adjustColumnWidths();
					}
				}
			}
		},

		_applyColumnFooterProperties: function (footerProperties) {
		    var grid = this._getOptionValue("grid");
			var levels = this.options.windowConfig.levels;
			var levelCount = levels ? levels.length : 0;
			var currentLevel;
			var footerProps = [];
			if(grid && levelCount > 0){
				for(var i=1; i<=levelCount; i++){
					currentLevel = grid.getLevel(i);
					if(currentLevel){
						footerProps = footerProperties[i];
		    			for (var j = 0; j < footerProperties.length; j++) {
						  	var column = currentLevel.getColumnByDataField(footerProperties[j].columnName);
						    column.footerLabel = footerProperties[j].footerLabel;
						    column.footerOperation = footerProperties[j].footerOperation
						}
					}
				}
			}
		},

		_applySortProperties: function (sortProperties) {
			var grid = this._getOptionValue("grid");
			var levels = this.options.windowConfig.levels;
			var levelCount = levels ? levels.length : 0;
			var currentLevel;
			var sortProps = [];
			if(grid && levelCount > 0){
				for(var i=1; i<=levelCount; i++){
					currentLevel = grid.getLevel(i);
					if(currentLevel){
						sortProps = sortProperties[i];
		    			currentLevel.currentSorts.removeAll();
					    for (var j = 0; j < sortProps.length; j++) {
					        var column = currentLevel.getColumnByDataField(sortProps[j].sortColumn);
					        if (column != null) {
					            var filterSort = new flexiciousNmsp.FilterSort;
					            filterSort.column = column;
					            filterSort.column.sortable = true;
					            filterSort.sortColumn = sortProps[j].sortColumn;
					            filterSort.isAscending = sortProps[j].isAscending;
					            currentLevel.addSort(filterSort);
					        }
					    }
					}
				}
			}
		},

		_applyFilterDetails : function(filterSettings){
    		 var $this = this;
        	 var grid = this._getOptionValue("grid");
        	 var levels = this.options.windowConfig.levels;
        	 var level = levels[0];
        	 var columnDetails = level.levelConfiguration.columnDetails;
        	 if(columnDetails){
        		for(var i=0; i<filterSettings.length;i++){
	       			if(columnDetails[filterSettings[i].columnName] && columnDetails[filterSettings[i].columnName].inlineFilterType){
						grid.setFilterValue(filterSettings[i].columnName,filterSettings[i].expression);
					}
				}
			}
		},

		_clearGridChanges: function () {
		    var $this = this;
		    var grid = this._getOptionValue("grid");
			var levels = this.options.windowConfig.levels;
			if(grid && levels){
				var levelCount = levels.length;
				if(levelCount > 0){
					for(var i=1; i<=levelCount; i++){
	           			currentLevel = grid.getLevel(i);
	           			if(currentLevel){
		           			// removing all columns
		           			currentLevel.clearColumns();
		           			// removing sorts
				    		currentLevel.currentSorts.removeAll();
	           			}
					}
				}
			}
		    // adding columns to grid
		    this._addDataGridColumns();
		    //Need to close all levels, otherwise sorting won't take effect as its server side
		   	grid.collapseAll();
		    grid.rebuild();
		    return {};
		},

		reset: function () {
            this._clearGridChanges();
            this._super();

        },

        addFilterIcons : function(filterCols){
        	var $this = this;
        	var grid =  $this._getOptionValue("grid");
        	var columns = grid.getColumnLevel().getColumns();
        	var filterColumns = [];
        	$.each(filterCols,function(indx,filterCol){
        		filterColumns.push(grid.getColumnLevel().getColumnByDataField(filterCol));
        	});

        	$.each(columns,function(index,col){
        	if(grid.getHeaderContainer().rows.length > 0){
        		 	var headerCell = grid.getHeaderContainer().getCellForRowColumn(grid.getHeaderContainer().rows[0].getData(),col);
        		 	if(headerCell){
        		 		if(filterColumns.indexOf(col) > -1){
        		 			headerCell.colIcon.setSource($si.tableGridUtils.IMAGE_PATH+"/custom/inlinefilter.png");
        		 			headerCell.colIcon.setVisible(!0);
        		 		}else{
        		 			headerCell.colIcon.setSource($si.tableGridUtils.IMAGE_PATH+"/blank_transparent.png");
        		 			headerCell.colIcon.setVisible(!0);
        		 		}
        		 	}
        		 }
        	});
        },

        bringWindowToFront : function(){
        	this._refreshDataGrid();
        	this._super();
 	 	},
	});
});