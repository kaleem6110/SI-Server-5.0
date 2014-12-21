define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'siViewerNamespace',
    'table-Grid-API',
    'window/tableWindow/com.spacetimeinsight.viewer.window.baseTableWindow',
    'dialogBox',
    'window/com.spacetimeinsight.i18N.window',
    'window/com.spacetimeinsight.i18N.window.regional',
], function ($) {
    $.widget('spacetimeinsight.siViewerClientSideTable', $.spacetimeinsight.siViewerBaseTableWindow, {

        options: {
            dataProvider: [],
            configuration: "",
            dashboardParams: "",
            dashboardData: "",
            autorefreshFlag: false,
            autorefreshInterval: null,
            grid: undefined,
            id: undefined,
            enableMultiColumnSort: true,
            enableDefaultDisclosureIcon: false,
            horizontalScrollPolicy: "auto",
            rebuild: false,
            groupcol: "",
            groupByColumns: null,
            footerCols: [],
            enableOrDisableColumnFreeze: undefined,
            gridExpanded: false,
            noOfColumnsToFreeze: -1,
            selectedRowData: "",
            gridColumns: [],
            showHelpDropdown: true,
            exportToCSVWindow: 0,
            zoomAltitude : 50000,
            showItemOnMap : true,
            zoomOnMap : true,
            selectedRows : [],
            hiddenColList : [],
            windowWidth :"",
            lastDummyCol:{},
            defaultConfigApplied : false,
        },

        pluginName: "siViewerClientSideTable",
		NUMBER_TYPES : ["java.lang.Integer","java.lang.Long","java.lang.Short","java.math.BigInteger","java.lang.Float","java.lang.Double","java.math.BigDecimal"],
		CONTAINER_TEMPLATE: kendo.template("<div id='#= id #_parent_grid_container' class='ct-wrapper' style='width:99%;height: 99%'> "+
         "<div id='#= id #_groupbar_container' class='groupbar-container'>"+
        "<div id='#= id #_groupBar' class='ct-groupbar droppable'  style='left: 30px;top:10px;height: 20px; border: solid 1px rgb(1,1,1); padding: 6px;' >"+
        "<span style='height:100%;padding:5px;padding-left:5px;display:block;'> Drag columns here to group data </span></div>  "+
        " </div>"+
        "<div id='#= id #_grid' class='ct-grid' style='position: relative;  left: 2px;right: 10px;height: 90%' tabindex='0'></div>"+
        "</div>"),

        GROUP_BAR_ELEMENT: kendo.template("<div class='group-bar-button' id='outer_#= itemId #' draggable='true' style='display:inline-block; left:20px !important;margin-left:5px;'><a  id='#= itemId #'  style='margin: 3px;display: inline-block'>" +
            "#= itemText #</a><div id='del_#= itemId #' style='display: inline-block'><img src='images/close.png' alt='delete' id='del_#= itemId #'></div></div>"),
        POPUP_IFRAME_CONTAINER: kendo.template("<iframe id='#= id #_shim' src='about:blank' frameborder='0' scrolling='no' style='z-index: -100000;top: 0px;position: absolute;height: 100%;width: 100%;left:0px;'></iframe>"),
		GROUP_BAR_TEXT : "<span style='height:100%;padding:5px;display:block;'> Drag columns here to group data </span>",
		SCROLL_ARROW :  "<div id='next_nav'>></div><div id='prev_nav'><</div>",
        inlineFilterControls: ["TextInput", "NumericRangeBox", "MultiSelectComboBox", "DateComboBox", "DateRangePicker"],
		TABLE_FOOTER_DIV	: kendo.template("<div id='#= id #_table_footer_label' style='float:right;margin-right: 10px;'>#= content #</div>"),
        TABLE_GRID: {
            ROLL_OVER_COLOR: "#b5d4ed",
            ACTIVE_CELL_COLOR: "#b5d4ed",
            GRID_IMAGES_PATHS: $si.tableGridUtils.IMAGE_PATH,
            ALTERNATE_ITEM_COLORS: [0xE4EFFF, 0xF9F9F9],
            DEFAULT_HEADER_HEIGHT: 30,
            DEFAULT_MIN_WIDTH : 53,
        },

        initialize: function () {
            this.widgetEventPrefix = this.pluginName + "_";
            this.options.id = this._getDataGridId();

            // default
            if (this._getGlobalOptionValue("enableDefaultDisclosureIcon") == undefined) {
                this._setGlobalOptionValue("enableDefaultDisclosureIcon", false);
            }

            // default
            if (this._getGlobalOptionValue("enableMultiColumnSort") == undefined) {
                this._setGlobalOptionValue("enableMultiColumnSort", true);
            }

            // default
            if (this._getGlobalOptionValue("horizontalScrollPolicy") == undefined) {
                this._setGlobalOptionValue("horizontalScrollPolicy", "auto");
            }
        },

        _getDataGridId: function () {
            if (this.element != undefined) {
                return $(this.element).attr("id");
            }
        },

        _getGlobalOptionValue: function (propertyName) {
            if (this.options != undefined) {
                if (this.options[propertyName] != undefined) {
                    return this.options[propertyName];
                }
            }
        },

        _setGlobalOptionValue: function (propertyName, value) {
            if (this.options != undefined) {
                this.options[propertyName] = value;
            }
        },

        _setEnableOrDisableColumnFreeze: function (noOfColumnsToFreeze) {
            if (noOfColumnsToFreeze > 0) {
                this.options.enableOrDisableColumnFreeze = true;
            } else {
                this.options.enableOrDisableColumnFreeze = false;
            }
        },

        _initializeGridConfiguration: function () {
            var htmlDataGrid = this._getGlobalOptionValue("grid");
            if (htmlDataGrid) {
                htmlDataGrid.enableDefaultDisclosureIcon = this._getGlobalOptionValue("enableDefaultDisclosureIcon");
                htmlDataGrid.setHorizontalScrollPolicy(this._getGlobalOptionValue("horizontalScrollPolicy"));
                htmlDataGrid.enableStickyControlKeySelection = false;
                htmlDataGrid.rollOverColor = 0x8dcbe4;
                htmlDataGrid.textRollOverColor = 0xFFFFFF;
                htmlDataGrid.selectionColor = 0x2c95d2;
				htmlDataGrid.enableKeyboardNavigation = true;
                htmlDataGrid.activeCellColor = 0x2c95d2;
                htmlDataGrid.alternatingItemColors = [0xE4EFFF, 0xF9F9F9];
                htmlDataGrid.imagesRoot = this.TABLE_GRID.GRID_IMAGES_PATHS;
                htmlDataGrid.showSpinnerOnFilterPageSort = true;
               this._setDataGridLevelProperties(htmlDataGrid.getColumnLevel());

            }
            this._addDataGridEventListener();
        },

        _setDataGridLevelProperties: function (columnLevel) {
            if (columnLevel) {
                columnLevel.setEnableFooters(true);
                columnLevel.setHeaderHeight(this.TABLE_GRID.DEFAULT_HEADER_HEIGHT);
            }
        },


        _addDataGridEventListener: function () {

            this._addEventListener(null, "itemRollOver", $si.tableGridUtils.grid_itemRollOverHandler.bind(this));
            this._addEventListener(null, "itemRollOut", $si.tableGridUtils.grid_itemRollOutHandler);
            this._addEventListener(null, "itemDoubleClick", this._zoomRow.bind(this));
            this._addEventListener(null, "itemClick", this._highlightRow.bind(this, true));

        },

		_tableScroll : function(scrollEvent){
			var htmlDataGrid = this._getGlobalOptionValue("grid");
			$si.Logger('clientSideTable[').info(htmlDataGrid.getIsScrolling() + "]");
			htmlDataGrid.reDraw();
		},

        _addEventListener: function (target, event, callbackHandler) {
            var htmlDataGrid = this._getGlobalOptionValue("grid");
            if (htmlDataGrid) {
                htmlDataGrid.addEventListener(target, event, callbackHandler);
            }
        },


		_onDrawerCreationComplete : function(e,data){
    		var $this = this;
          	var listdata = $this.options.windowConfig;
			$this.options.drawer[$this.options.drawerWidget]("setHideColumnList", listdata);
			$this.options.drawer[$this.options.drawerWidget]().bind($this.options.drawerWidget.toLowerCase() + "_applytabledrawersettings", function (event, data) {
				$this._applyDrawerSettings(data);
			});
			this._super();
		},

    	_applyDrawerSettings : function(data){
			var $this = this;
			$this.options.noOfColumnsToFreeze = -1;
			if (data.data.numberColumnFreezeValue) {
				$this.options.noOfColumnsToFreeze = data.data.numberColumnFreezeValue;
			}
			if (data.data.zoomAltitudeValue) {
				$this.options.zoomAltitude = data.data.zoomAltitudeValue;
			}

			$this.options.showItemOnMap = data.data.showItemMapValue;
			$this.options.zoomOnMap = data.data.panZoomMapValue;

			  var tool = $this.element.parent().find("#locateTool");
                 if (tool) {
                 	if (!$this.options.zoomOnMap) {
	                      if (tool.hasClass("locate-enabled")) {
	                           tool.removeClass("locate-enabled");
	                       }
	                       tool.addClass("locate-disabled");
	                       tool.attr("disabled",true);
	                  }
	               }

			// set the freeze status
			$this._setEnableOrDisableColumnFreeze($this.options.noOfColumnsToFreeze);
			var htmlGrid = $this._getGlobalOptionValue("grid");
			var showHiddenColumns = data.data.showHideColumnValue;
			if (showHiddenColumns) {
				var allColumns = htmlGrid.getColumnLevel().getColumns();
				$this.options.hiddenColList = data.data.hiddenColumns;
				$.each(allColumns, function (colIdx, singlColumn) {
					$.each(showHiddenColumns, function (hiddenIdx, hiddencol) {
						var columnObj = allColumns[colIdx];
						if(columnObj != null && columnObj.dataField == hiddencol){
							$this.options.hiddenColList = jQuery.grep($this.options.hiddenColList, function(value) {
								if(value.actual_name != hiddencol){
								  return value;
								}
							});
							columnObj.setVisible(true);
						}
					});
				});
			}
			htmlGrid.rebuild();
			var freezerTool = $this.element.parent().find("#freezeTool");
			if (freezerTool.hasClass("freeze-icon")) {
				$this._freezeColumns($this.options.noOfColumnsToFreeze);
				htmlGrid.reDraw();
			}
    	},

        _addLocateToolToToolBar: function () {
            var $this = this;
            $(this.element)[this.pluginName]().bind(this.pluginName.toLowerCase() + "_oncreationcomplete", function () {
	            	if($si.viewer.viewerPlugin != 'siViewerNoMap'){
		                if ($this.options.windowConfig.windowDatasource.hasGeographicData ) {
		                    if ($this.options.toolBar) {
		                        $this.options.toolBar[$this.options.toolBarWidget]("createToolBarItem", "locate", $si.i18N.Window.tooltip.locate, true);
		                        var tool = $this.element.parent().find("#locateTool");
		                        if (tool) {
		                            if (tool.hasClass("locate-icon")) {
		                                tool.removeClass("locate-icon");
		                            }
		                            tool.addClass("locate-disabled");
		                            tool.attr("disabled",true);
		                        }
		                    }
		                }
	            	}

                var inlineFilterTool = $this.element.parent().find("#inlinefilterTool");
                title = $si.i18N.Window.tooltip.inlinefilter;
                $this._getGlobalOptionValue("grid").getColumnLevel()._enableFilters = false;
                if(!$this.getWindowConfigurationByProperty("inlineFilterColumns")){
                	 if (inlineFilterTool.hasClass("inlinefilter-icon")) {
                         inlineFilterTool.removeClass("inlinefilter-icon");
                	 }
                	 inlineFilterTool.addClass("inlinefilter-off");
                 title = $si.i18N.Window.tooltip.disabledinlinefilter;
	             inlineFilterTool.attr("disabled","disabled");
	             }
                 inlineFilterTool.attr('title', title);
               var freezerTool = $this.element.parent().find("#freezeTool");
                 if (freezerTool.hasClass("freeze-icon")) {
                                freezerTool.removeClass("freeze-icon");
                            }
                  freezerTool.addClass("unfreeze-icon");

            });
        },


        _create: function () {
            var $this = this;
            this._super();
			this.options.footerCols=[];
            this.initialize();
            this.options.noOfColumnsToFreeze = this.getWindowConfigurationByProperty("noOfColumnsToFreeze");
            this._setEnableOrDisableColumnFreeze(this.options.noOfColumnsToFreeze);
            this.element.addClass("w-client-table");
            this.options.windowWidth =$(this.element).data("kendoWindow").wrapper.width();
            this._addLocateToolToToolBar();
            if (this._getGlobalOptionValue("grid") == undefined) {
                this.addHtmlGrid();
            }
            this._initializeGridConfiguration();
            $this._addColumnstoGrid();
            // Capture grid resize event
            this.options.onResize = function (e, data) {
                $this.refreshDataGrid();
                this.options.windowWidth =$(this.element).data("kendoWindow").wrapper.width();
            };

            // add handler for grouping
            var groupBarDiv = $this.element.find("#" + this.options.id + "_groupBar");


            groupBarDiv.bind("mouseover", function (event, data) {
                 if ($this._getGlobalOptionValue("grid").getHeaderContainer().columnDraggingDragCell) {
                    var remainingCols = $this._getGlobalOptionValue("grid").getColumnLevel().getVisibleColumns();
					var isAllowed = false;
                    if (remainingCols.length == 3) {
                    	$.each(remainingCols, function (index, tmpColumn) {
                    		if(tmpColumn.dataField == 'select'){
								  isAllowed = true;
                    		}
		            	});
                    }
                    if (remainingCols.length >= 3  && !isAllowed) {
                     	var checkIconClass = $this._getGlobalOptionValue("grid").getStyle("checkIconClass");
                    	$this._getGlobalOptionValue("grid").getHeaderContainer().columnResizingCellGlyph.colIcon.setSource($this._getGlobalOptionValue("grid").imagesRoot + checkIconClass);
                    }else{
                     	var crossIconClass = $this._getGlobalOptionValue("grid").getStyle("crossIconClass");
                    	$this._getGlobalOptionValue("grid").getHeaderContainer().columnResizingCellGlyph.colIcon.setSource($this._getGlobalOptionValue("grid").imagesRoot + crossIconClass);
                    }
                }
            });
            groupBarDiv.bind("mouseout", function (event, data) {
                if ($this._getGlobalOptionValue("grid").getHeaderContainer().columnDraggingDragCell) {
                    var crossIconClass = $this._getGlobalOptionValue("grid").getStyle("crossIconClass");
                    $this._getGlobalOptionValue("grid").getHeaderContainer().columnResizingCellGlyph.colIcon.setSource($this._getGlobalOptionValue("grid").imagesRoot + crossIconClass);
                }
            });


            var groupBarHTML = "";
            $this._bindMouseUp(groupBarDiv);

            groupBarDiv.bind("dragover", function (event) {
                event.preventDefault();
            });

            $this._bindDrop(groupBarDiv);
            $this._handleRightClickOnHeaderRow();
            if ($this.options.windowConfig.expandAll) {
                $this._expandTableGrid();
            }
            $this._getGlobalOptionValue("grid").rebuild();
			$si.eventSource.windowEvents.bind($si.events.WindowEvents.onResizeWindow,function (windowResizeEvent){
				if(windowResizeEvent.windowId == $this.options.id ){
					 $this.refreshDataGrid();
				}
			});
			$this._getGlobalOptionValue("grid").onRootFilterChange = function (event) {
					if(event.triggerEvent && event.triggerEvent.triggerEvent && event.triggerEvent.triggerEvent.triggerEvent
						&& event.triggerEvent.triggerEvent.triggerEvent.target.parentElement.nextElementSibling.innerText=="to"){
							event.preventDefault();
							event.stopPropagation();
							return;
					}
					var $this = this;
					if ($this._getGlobalOptionValue("grid").clearSelectionOnFilter) {
						$this._getGlobalOptionValue("grid").clearSelection();
					}
					if (!$this._getGlobalOptionValue("grid")._triggerEvent)return;
					$this._getGlobalOptionValue("grid").processRootFilter(event.triggerEvent);
					$($this.options.footer).children().text($si.i18N.Window.footerLabelTotalRows +
					$this.options.grid.getBodyContainer().itemVerticalPositions.length);
					if($this.options.groupByColumns){
						$this.setTableData($this.options.windowData);
					}
					$this._getGlobalOptionValue("grid").rebuild();
					$this._rebuildInlineFilter();


				}.bind(this);
			$this._setFooterRowHeight();

        },

        applyWindowData: function () {
            this.setTableData(this.options.windowData);

        },

        _addDefaultProperties: function () {

            var $this = this;
            $this.options.defaultConfigApplied = true;
            var grid = this._getGlobalOptionValue("grid");
			if ($this.options.windowConfig.summaryFileds) {
                $this._addSummaryFields($this.options.windowConfig.summaryFileds);
            }
            if ($this.options.windowConfig.groupByFields) {
                $this._addColumnGrouping($this.options.windowConfig.groupByFields);
            }
            if ($this.options.windowConfig.columnDetails) {
                $this._addGridSort($this.options.windowConfig.columnDetails);
            }


            if ($this.options.windowConfig.expandAll) {


                 $this._expandTableGrid();
            }
        },

        _setFooterRowHeight: function () {
            var $this = this;
            if ($this.options.footerCols.length > 0) {
                 $this.options.grid.getColumnLevel()._footerRowHeight = 25;

                 $this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.className = " flexDataGridVirtualBodyContainer grid-virtual-body custom-f-VirtualBodyContainer";
                 $this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.nextSibling.className = " flexDataGridHeaderContainer grid-aggregate-row";

                 // for freeze columns to set container height
                 var footerContainer = $this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.nextSibling;
                 if(footerContainer.nextSibling.children[0].classList[1] == "backgroundForFillerRows" ){
                 	footerContainer.nextSibling.className = " elasticContainer grid-virtual-body";
                 }else{
                 	footerContainer.nextSibling.className = " elasticContainer";
                 }

                 var allDivs = $this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.parentElement.children;
                 for (var i = 0; i < allDivs.length; i++) {
    				if (allDivs[i].className == " lockedContent") {
    					if(allDivs[i].children.length > 0){
    						if(allDivs[i].children[0].classList[0] ==  "flexDataGridFooterCell"){
    							allDivs[i].className = " lockedContent grid-aggregate-row";
    							break;
    						}
    					}
    				 }
				 }

                 $this.element.find("#bottomBar").css("display","");
                 if($this.element.find("#bottomBar").hasClass("grid-aggregate-row")){
                 	$this.element.find("#bottomBar").removeClass("grid-aggregate-row");
                 }
                 	$this.element.find("#bottomBar").addClass("grid-bottom-bar");
            } else {
             	$this.options.grid.getColumnLevel()._footerRowHeight = 1;

            	$this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.className = " flexDataGridVirtualBodyContainer custom-f-VirtualBodyContainer";
            	if($this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.nextSibling){
            		$this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.nextSibling.className = " flexDataGridHeaderContainer";
            	}
               // for freeze columns to set container height
                 if($this.element.find("#bottomBar").hasClass("grid-bottom-bar")){
                 	$this.element.find("#bottomBar").removeClass("grid-bottom-bar");
                 }
                 	$this.element.find("#bottomBar").addClass("grid-aggregate-row");
               	if($this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.parentElement) {
                 var allDivs = $this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.parentElement.children;
                 for (var i = 0; i < allDivs.length; i++) {
    				if (allDivs[i].className == " lockedContent") {
    				if(allDivs[i].children.length > 0){
    					if(allDivs[i].children[0].classList[0] ==  "flexDataGridFooterCell"){
    					allDivs[i].className = " lockedContent grid-aggregate-row";
    					break;
    					}
    					}
    				 }
					}
            	}
                 var footerContainer = $this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.nextSibling;
                 if(footerContainer){
                 if(footerContainer.nextSibling.children[0].classList[1] == "backgroundForFillerRows" ){
                 	footerContainer.nextSibling.className = " elasticContainer grid-bottombar-row";
                 }else{
                 	footerContainer.nextSibling.className = " elasticContainer";
                 }
                 }
            }
            $this._getGlobalOptionValue("grid").rebuild();
        },

        _createGroupByColumn: function () {

            if (this._getGlobalOptionValue("grid").getColumnLevel().getColumnByDataField("select") == null) {
                var groupcol = $si.tableGridUtils.DynamicColumns_addColumn("select", "");
                groupcol.enableHierarchicalNestIndent = true;
                groupcol.enableExpandCollapseIcon = true;
                groupcol.expandCollapseIconLeft = 2;
                groupcol.draggable = false;
                groupcol.setColumnWidthMode("fitToContent");

                groupcol.paddingLeft = 25;
                this._getGlobalOptionValue("grid").addColumn(groupcol);
                this._getGlobalOptionValue("grid").enableDynamicLevels = true;
              //  groupcol.setLabelFunction($si.tableGridUtils.columnLabelFunction);
                this.options.groupcol = groupcol;


            }
        },

        _createGroupBarElements: function (groupByColumns) {
            var $this = this;
            groupBarHTML = "";
            var groupBarDiv = $this.element.find("#" + this.options.id + "_groupBar");
			var groupColWidth = 0;
            $(groupByColumns).each(function (index, item) {
           		groupColWidth = groupColWidth + item._width;
            	//rebuild sort order of columns
            	$this._removeColumnSort(item);

                groupBarHTML += $this.GROUP_BAR_ELEMENT({
                    itemId: item.getDataField(),
                    itemText: item.getHeaderText()
                });
            });
            $("#" + $this.options.id + "_groupBar").html(groupBarHTML);
            var barChildArray = groupBarDiv.children();
            for (var ind = 0; ind < barChildArray.length; ind++) {
                $(barChildArray[ind]).draggable = true;
                $(barChildArray[ind]).bind('dragstart', function (e) {
                    dragElement = this;
                    e.originalEvent.dataTransfer.setData('Text', e.target.id);
                });

            }
            // adding scroll arrows
       /*     if(groupColWidth > $this.options.windowWidth-30){
            	if($this.element.find("#next_nav").length ==0){
            		$this.element.find("#" + $this.options.id + "_groupbar_container").append($this.SCROLL_ARROW);
            		var groupBarDivId  = "#" + $this.options.id + "_groupBar";
            		$('#next_nav').click(function () {
        				$(groupBarDivId).animate({
        					scrollLeft: '+=156px'
        				});
            		});
            		$('#prev_nav').click(function () {
            			$(groupBarDivId).animate({
            					scrollLeft: '-=156px'
        				});
            		});
            	}
            }else{
            	if($this.element.find("#next_nav").length >0){
            		$this.element.find("#next_nav").remove();
            		$this.element.find("#prev_nav").remove();
            	}

            }*/

            this._getGlobalOptionValue("grid").getColumnLevel().getColumnByDataField("select").setColumnWidthMode("fixed");
            if(groupColWidth >200){

            	this._getGlobalOptionValue("grid").getColumnLevel().getColumnByDataField("select").setWidth(200);
			   }else{
				this._getGlobalOptionValue("grid").getColumnLevel().getColumnByDataField("select").setWidth(groupColWidth);
			   }
            $this.options.groupByColumns = groupByColumns;



        },

        createDataGridColumn: function (metadata, columnDetails, inlineFilterProperties) {
        	var $this = this;
            var dataGridColumn;
            if (metadata != undefined) {
            //var headerStr = '<span title="'+metadata.displayName+'" style ="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;">'+metadata.displayName+'</span>';

                dataGridColumn = $si.tableGridUtils.DynamicColumns_addColumn(metadata.name, metadata.displayName);
                if (dataGridColumn != undefined) {
					dataGridColumn.paddingTop=5;
                    this._setDataGridHeaderProperties(dataGridColumn);
                    this.setDataGridColumnProps(dataGridColumn, metadata);
                    this.setDataGridColumnProperties(dataGridColumn, columnDetails);
                    this.setDataGridColumnFormattingLinksAndImages(dataGridColumn);

                 return dataGridColumn;
                }
            }
        },

        setDataGridColumnFormattingLinksAndImages: function (dataGridColumn) {

            var hyperLinkColumnsDetails = this.options.windowConfig.hyperLinkColumns;
            var actionButtonDetail = this.options.windowConfig.actionButtonColumns;
            //if(hyperLinkColumnsDetails || actionButtonDetail ) {
            	dataGridColumn.setLabelFunction(this._renderCellWithFormatDataANDLinksAndActionButtons.bind(this));
            //}

            if(actionButtonDetail){
            	if(actionButtonDetail[dataGridColumn.dataField]){
	            	dataGridColumn.paddingTop=0;
            	}
            }
        },

        setDataGridColumnProps: function (dataGridColumn, metadata) {
            if (dataGridColumn != undefined && metadata != undefined) {
                // visible flag for grid column
                if (metadata.hide != undefined) {
                    dataGridColumn.setVisible(!metadata.hide);
                }
            }
        },

        setDataGridColumnProperties: function (dataGridColumn, columnDetails) {
            if (dataGridColumn != undefined  ) {
                if (columnDetails != undefined && columnDetails.columnWidth != undefined && columnDetails.columnWidth > 0) {
                    dataGridColumn.setWidth(columnDetails.columnWidth);
                    dataGridColumn.setColumnWidthMode("fixed");
                    dataGridColumn.truncateToFit = true;
                } else {
                    dataGridColumn.setColumnWidthMode("fitToContent");
                }

                if (columnDetails != undefined &&  columnDetails["wrapText"] != undefined && columnDetails["wrapText"] == true) {
                    dataGridColumn.wordWrap = true;
                }
            }
        },

        _setDataGridHeaderProperties: function (dataGridColumn) {
            if (dataGridColumn != undefined) {
                dataGridColumn.setStyle("headerPaddingLeft", 14);
                dataGridColumn.setStyle("headerPaddingRight", 14);
                dataGridColumn.setStyle("headerPaddingTop", 8);
                dataGridColumn.cellBackgroundColorFunction = this._getColumnBackgroundColor.bind(this);
                dataGridColumn.cellTextColorFunction = this._getColumnForegroundColor.bind(this);;

            }
        },

        setDataGridFilterProperties: function (dataGridColumn, inlineFilterProperties) {
        	var $this = this;
            if (inlineFilterProperties != undefined && dataGridColumn != undefined) {
                switch (inlineFilterProperties.filterType) {
                case "Range":
                    dataGridColumn.setFilterControl(this.inlineFilterControls[1]);
                    break;
                case "Text":
                    dataGridColumn.setFilterControl(this.inlineFilterControls[0]);
                    dataGridColumn.filterOperation = "Contains";
                    break;
                case "Contains":
                    dataGridColumn.setFilterControl(this.inlineFilterControls[0]);
                    dataGridColumn.filterOperation = "Contains";
                    break;
                case "Date":
                    dataGridColumn.setFilterControl(this.inlineFilterControls[3]);
                    dataGridColumn.filterComparisionType = "date";
                    dataGridColumn.setFilterControl("DateComboBox");
                    break;
                case "List":
                    dataGridColumn.setFilterControl(this.inlineFilterControls[2]);
                    dataGridColumn.filterComboBoxBuildFromGrid = false;
                    var filterDataProvider = dataGridColumn.getDistinctValues($this.options.dataProvider);
                    var colType = $this._getColumnType(dataGridColumn);

                    for(var i = 0 ;i<filterDataProvider.length;i++){
                    	if($this.options.dataTypes.indexOf(colType) < 0 ){
	                    	var data = filterDataProvider[i].data;
	                    	filterDataProvider[i].data = parseFloat(data.replace(/,/g,""));
                    	}
                    }
                    dataGridColumn.filterComboBoxDataProvider= filterDataProvider;

                    break;
                }

            }
        },

        _getColumnType : function(dataGridColumn){
        	var $this = this;
        	var type;
        	var metaDataMap = $this.getWindowConfigurationByProperty("metadata");
        	var columnName = dataGridColumn.dataField;
        	  $.each(metaDataMap, function (key, metadata) {
        		 if(metadata.name == columnName){
        			type=  metadata.type;

        		 }
        	 });
        	return type;

        },

        _addColumnstoGrid: function () {
            var $this = this;
            var columnDetail;
            var columnDetails = $this.getWindowConfigurationByProperty("columnDetails");
            var metaDataMap = $this.getWindowConfigurationByProperty("metadata");
            var inlineFilterList = $this.getWindowConfigurationByProperty("inlineFilterColumns");
            var htmlDataGrid = $this._getGlobalOptionValue("grid");
            $this.options.gridColumns = [];

            if (htmlDataGrid && metaDataMap && Object.keys(metaDataMap).length) {
                var inlineFilter;
                var dataGridColumn;

                $.each(metaDataMap, function (key, metadata) {
                    inlineFilter = inlineFilterList != undefined ? inlineFilterList[metadata.name] : undefined;
                    columnDetail = columnDetails != undefined ? columnDetails[metadata.name] : undefined;
                    dataGridColumn = $this.createDataGridColumn(metadata, columnDetail, inlineFilter);
                    dataGridColumn.footerStyleName = "aggregate-footer";
                    dataGridColumn.minWidth = $this.TABLE_GRID.DEFAULT_MIN_WIDTH;
                    if (metadata.type == $this.options.dataTypes[0] || metadata.type == $this.options.dataTypes[1] || metadata.type == $this.options.dataTypes[2] || metadata.type == $this.options.dataTypes[3]) {
                        dataGridColumn.setStyle("textAlign", "center");
                    } else {
                        dataGridColumn.setStyle("textAlign", "right");
                        dataGridColumn.sortNumeric = "true";
                    }
                    if (dataGridColumn != undefined) {
                        htmlDataGrid.addColumn(dataGridColumn);

                        $this.options.gridColumns.push(dataGridColumn);
                    }

                });

                var lastColumn = $si.tableGridUtils.DynamicColumns_addColumn("lastDummy", "");
                lastColumn.setColumnWidthMode("fitToContent");
                lastColumn.draggable = false;
                $this.options.lastDummyCol = lastColumn;
				$this.options.gridColumns.push(lastColumn);
				htmlDataGrid.addColumn(lastColumn);
                htmlDataGrid.variableRowHeight = true;
                this.refreshDataGrid();
            }
        },

        refreshDataGrid: function () {
            var htmlDataGrid = this._getGlobalOptionValue("grid");
            if (htmlDataGrid != undefined) {
                htmlDataGrid.reDraw();
            }
        },

        addHtmlGrid: function () {
            if (this.element != undefined) {
                this.element.prepend(this.CONTAINER_TEMPLATE({
                    id: this.options.id
                }));
            }
            this.createFlexDataGrid();
        },

        createFlexDataGrid: function () {
            var gridContainer;
            if (this.options.id != undefined) {
                gridContainer = document.getElementById(this.options.id + "_grid");
                if (gridContainer != undefined) {
                    gridContainer.parentNode.style.overflow = "hidden";
                    this.options.grid = new flexiciousNmsp.FlexDataGrid(gridContainer, {
                        id: this.options.id + 'ClientSideTable'
                    });
                }
            }
            delete gridContainer; // free memory
        },

        _freezeColumns: function (freezeCols) {

            var $this = this;
            var grid = this.options.grid;
            var visibleCols = 0;
            var freezeTool = $this.element.parent().find("#freezeTool");
            var columns = grid.getColumnLevel().getColumns();
            $.each(columns, function (index, col) {
                col.setColumnLockMode(flexiciousNmsp.FlexDataGridColumn.LOCK_MODE_NONE);
                if (col.getVisible() == true) {
                    visibleCols++;
                }
            });

            var groupCol = grid.getColumnLevel().getColumnByDataField("select");

            if (groupCol) {

                var index = columns.indexOf(groupCol);
                columns.splice(index, 1);
                columns.splice(0, 0, groupCol);
                freezeCols++;
            }

            if ($this.options.enableOrDisableColumnFreeze == true && visibleCols > freezeCols) {

                title = $si.i18N.Window.tooltip.unfreeze;
                for (var i = 0; i < freezeCols; i++) {
                    if (columns[i]) {
                        if (columns[i].getVisible() == true) {
                            columns[i].setColumnLockMode(flexiciousNmsp.FlexDataGridColumn.LOCK_MODE_LEFT);

                        } else {
                            freezeCols++;
                        }
                    }
                }

                grid.setColumns(columns);

                if (freezeTool.hasClass("unfreeze-icon")) {
                    freezeTool.removeClass("unfreeze-icon");
                }
                freezeTool.addClass("freeze-icon");
                freezeTool.attr('title', title);
                $this.options.enableOrDisableColumnFreeze = false;
                //added to align grid rows in case of freeze
				$this.element.find("#bottomBar").css("display","");
				$this.element.find("#bottomBar").addClass("grid-aggregate-row");

            } else {
                title = $si.i18N.Window.tooltip.freeze;

                if (freezeTool.hasClass("freeze-icon")) {
                    freezeTool.removeClass("freeze-icon");
                }
                freezeTool.addClass("unfreeze-icon");
                freezeTool.attr('title', title);

                $this.element.find("#bottomBar").css("display","none");
                $this.options.enableOrDisableColumnFreeze = true;
            }
            this.options.grid.reDraw();
             // for freeze columns to set container height
               var allDivs = $this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.parentElement.children;

                 for (var i = 0; i < allDivs.length; i++) {
    				if (allDivs[i].className == " lockedContent") {
    					if(allDivs[i].children.length > 0){
    						if(allDivs[i].children[0].classList[0] ==  "flexDataGridFooterCell"){
    							allDivs[i].className = " lockedContent grid-aggregate-row";
    							break;
    						}
    					}
    				 }
				}

			this.options.grid = grid;

			var footerContainer = $this._getGlobalOptionValue("grid").getVirtualBodyContainer().domElement.nextSibling;
                 if(footerContainer.nextSibling.children[0].classList[1] == "backgroundForFillerRows" ){
                 	footerContainer.nextSibling.className = " elasticContainer grid-bottombar-row";
                 }else{
                 	footerContainer.nextSibling.className = " elasticContainer";
                 }

        },

        onWindowToolControlClick: function (toolId) {
            var $this = this;
            $this._super(toolId);
            var grid = this.options.grid;
            var title = null;
            if (toolId == 'freezeTool') {
                // enabling or disabling freezetool and locking columns based on
                // freezecolumns value
                var freezeColumns = $this.options.noOfColumnsToFreeze;
                $this._freezeColumns(freezeColumns);
            } else if (toolId == 'inlinefilterTool') {
                // for enabling or disabling filter tool
                var inlinefilterTool = $this.element.parent().find("#inlinefilterTool");
                var columnLevel = grid.getColumnLevel();
                if (columnLevel._enableFilters) {
                    title = $si.i18N.Window.tooltip.inlinefilter;
                    columnLevel._enableFilters = false;
                    if (inlinefilterTool.hasClass("inlinefilter-applied")) {
                        inlinefilterTool.removeClass("inlinefilter-applied");
                    }
                    inlinefilterTool.addClass("inlinefilter-icon");
                    inlinefilterTool.attr('title', title);
                  //  grid.clearFilter();
                } else {
                    title = $si.i18N.Window.tooltip.hideinlinefilter;
                    columnLevel._enableFilters = true;
                    if (inlinefilterTool.hasClass("inlinefilter-icon")) {
                        inlinefilterTool.removeClass("inlinefilter-icon");
                    }
                    inlinefilterTool.addClass("inlinefilter-applied");
                    inlinefilterTool.attr('title', title);
                }
               // grid.rebuild();

               grid.rebuild();
               grid.checkNoDataMessage();
            } else if (toolId == 'locateTool') {
                $this._zoomRow();
            } else if (toolId == 'saveasTool') {
                $si.viewer.clientSideColumnDetails = $this.getWindowConfigurationByProperty("metadata");
                var grid = this._getGlobalOptionValue("grid");
                $si.viewer.windowParams = windowParams;
                var expressions = grid.itemFilters.TOP_LEVEL_FILTER ? grid.itemFilters.TOP_LEVEL_FILTER.filterExpressions:null;
				var inlineFilter = null;
                if (expressions && expressions.length > 0) {
					var fitlerItems = [];
					var filterExpression;
					var item;
                    for (var i = 0; i < expressions.length; i++) {
                        filterExpression = expressions[i];
						var valueParam, operation;
						if(filterExpression.filterOperation == "Between"){
							valueParam = {
								lowValue : filterControlValue[0],
								highValue : filterControlValue[1]
							};
							operation = filterExpression.filterOperation;

						}else if(filterExpression.filterOperation == "InList"){
							operation = "In";
							valueParam = filterExpression.filterControlValue;
						}else if(filterExpression.filterOperation == "Contains"){
							operation = "Like";
							valueParam = filterExpression.filterControlValue;
						}else{
							valueParam = filterExpression.filterControlValue;
							operation = filterExpression.filterOperation ;
						}
						item = {
							fieldName : filterExpression.columnName,
							value :  valueParam,
							operator : operation,
							dataType : null,
						}
						fitlerItems.push(item);
                    }
                    inlineFilter = $si.filterUtils.createAllCriteria(fitlerItems);
                }
				var outerFilter = this.options.filterCriteria;
				$si.viewer.selectedDataFilterDetails = null;
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
                $this.options.exportToCSVWindow = $si.windowUtil.openExportCSVWindow('clientSideTable', '500', '250');
            }
        },


        dynamicMultipleGroupBy: function (dp, props, headers, nullValue, filterfunction, additionalProperties, useOtherBucket, nameProperty) {
            var $this = this;
            var prop = props.shift();
            var header = headers.shift();

            var grouped = $this.dynamicGroupBy(dp, prop, header, nullValue, filterfunction, additionalProperties, useOtherBucket, nameProperty

            );
            if (props.length > 0) {
                for (var i = 0; i < grouped.length; i++) {
                    var item = grouped[i];
                    item.children = $this.dynamicMultipleGroupBy(item.children, props.slice(), headers.slice(), nullValue, filterfunction, additionalProperties,
                        useOtherBucket, nameProperty);
                }
            }
			var uiUtil = flexiciousNmsp.UIUtils;
			for(var i=0;i<grouped.length;i++){
                var obj=grouped[i];
                $($this.options.footerCols).each(function(index,col){
                    var value;
                    switch(col.footerOperation)
                    {
                        case flexiciousNmsp.FlexDataGridFooterCell.SUM:
                            value = uiUtil.sum(obj.children,col.getDataField());

                            break;
                        case flexiciousNmsp.FlexDataGridFooterCell.AVERAGE:
                            value = uiUtil.average(obj.children,col.getDataField());

                            break;
                        case flexiciousNmsp.FlexDataGridFooterCell.MIN:
                            value = uiUtil.min(obj.children,col.getDataField());
                            break;
                        case flexiciousNmsp.FlexDataGridFooterCell.MAX:
                            value = uiUtil.max(obj.children,col.getDataField());

                            break;
                        case flexiciousNmsp.FlexDataGridFooterCell.COUNT:
                            value = uiUtil.getLength(obj.children);
                            break;
                    }

                    obj[col.getDataField()] =  value;
                })
            }

            return grouped;
        },

		dynamicGroupBy: function (dp, prop, header, nullValue, filterfunction, additionalProperties,
            useOtherBucket, nameProperty) {
            var $this = this;
            var metaDataMap = $this.getWindowConfigurationByProperty("metadata");
            if (!additionalProperties) additionalProperties = [];
            var buckets = {};
            var key
            var result = [];
			var filters = $this._getGlobalOptionValue("grid").getRootFilter().getFilterExpressions();//[0].isMatch(item)
            if (useOtherBucket) {
                buckets["other"] = [];
            }

            for (var i = 0; i < dp.length; i++) {
                var item = dp[i];

                if(item[prop]!="" && item[prop] == 0){
					key = 0;
				} else {
					key = flexiciousNmsp.UIUtils.resolveExpression(item, prop); // the
				}

                // parent
                if (key == null) key = "";
                key = key.toString().trim();
                if(metaDataMap != undefined && metaDataMap[prop] != undefined && metaDataMap[prop].type != this.options.dataTypes[1]) {
                	if($.inArray(metaDataMap[prop].type, this.NUMBER_TYPES) >=0) {
                		key = Number(key)
                	}
					key = $si.formattingUtil.formatData(metaDataMap[prop].type, metaDataMap[prop].displayFormat, key);
                }
                if (!buckets[key]) {
                    buckets[key] = []; // the children
                }
                if (filterfunction == null || filterfunction(item)){
					var gatePass = false;
					for(var z=0; z<filters.length; z++){
						gatePass = filters[z].isMatch(item);
						if(gatePass==false) {
							break;
						}
					}
					if(filters.length==0 || gatePass==true){
						buckets[key].push(item); // add to the parents child list
					}
				}
                else if (useOtherBucket) {
                    buckets["other"].push(item);
                }
            }
			var bucketsFiltered = new Object();
			var tempKeys = Object.keys(buckets);
			for(var z=0; z<tempKeys.length; z++){
				if(buckets[tempKeys[z]].length>0){
					bucketsFiltered[tempKeys[z]]=buckets[tempKeys[z]];
				}
			}
			buckets = bucketsFiltered;
            for (key in buckets) {
                var obj = {};
                obj[prop] = key == "null" || key == null || (key.toString().trim()) == "" ? nullValue : key;
                obj['children'] = buckets[key];
                if (buckets[key].length > 0) {
                    for (var i = 0; i < additionalProperties.length; i++) {
                        var addProp = additionalProperties[i];
                        obj[addProp] = buckets[key][0][addProp];
                    }
                }
                if (nameProperty) {
                    obj[nameProperty] = key;
                }
                result.push(obj); // create the final structure
            }
            return result; // this will refresh the grid...
        },

        closeWindow: function () {
        	try {
	            this.options.groupcol = "";
	            this.options.groupByColumns = null;
	            this.options.footerCols = [];
	            this.options.enableOrDisableColumnFreeze = "";
	            this.options.noOfColumnsToFreeze = -1;
	            this._highlightRow(false);
           } catch(e) {
           		$si.Logger('ClientSideTable').error("Error ["+e.message+"] occurred while closing the window");
           }
            this._super();
        },

        _zoomRow: function (row) {
            var $this = this;
            var lookatStr;
            if ($this.options.windowConfig.windowDatasource.hasGeographicData && $this.options.zoomOnMap) {
              if ($this.options.grid.getSelectedItems().length>0 && $this.options.grid.getSelectedItems().length  == 1) {
                    lookatStr = $this.options.grid.getSelectedItems()[0].coordinates;
                    if (lookatStr) {
                   		 var range = $this.options.zoomAltitude;
                    	 $($si.viewer).trigger("lookAtRange", [lookatStr, range]);
                	 }
                }

            }
        },

        _returnObjectArray: function (objArray) {
            var $this = this;
            var populatedArray = [];

            $.each(objArray, function (index, item) {
                if (item.children) {

                    $this._returnObjectArray(item.children);
                } else {
                    if (populatedArray.indexOf(item) < 0) {
                        populatedArray.push(item);
                    }
                }

            });

            return populatedArray;

        },

        _highlightRow: function (highlight) {
            var $this = this;
            if(!$this.options.showItemOnMap){
            	highlight = false;
            }
		 if(this.options.grid){
			$this.options.selectedRows = this.options.grid.getSelectedIndices();


            if ($this.options.windowConfig.windowDatasource && $this.options.windowConfig.windowDatasource.hasGeographicData && $this.options.showItemOnMap) {

                var selectedRows = [];
                var coordsArray = [];
                if (highlight) {
                    var rows = this.options.grid.getSelectedItems();

                    selectedRows = $this._returnObjectArray(rows);
                    $this.options.selectedRowData = selectedRows[0];
                    for (var i = 0; i < selectedRows.length; i++) {
                        coordsArray.push(selectedRows[i].coordinates);
                    }
                }
                var dashboardId = $this.options.windowConfig.id;
                var layerId = $this.options.windowConfig.layerId;
                var hightLightProperties ={};
                hightLightProperties.highlightFeatureCount = $this.options.windowConfig.highlightFeatureCount;
                hightLightProperties.highlightIconScale    = $this.options.windowConfig.highlightIconScale;
                hightLightProperties.highlightIconUrl      = $this.options.windowConfig.highlightIconUrl;
                hightLightProperties.businessViewName      = $this.options.windowConfig.windowDatasource.parameters.artefactname;

                $($si.viewer).trigger("setHighlight", [coordsArray, dashboardId, layerId,hightLightProperties]);

                 var tool = $this.element.parent().find("#locateTool");
                 if (tool) {
                 	if ($this.options.grid.getSelectedItems().length>1 || $this.options.grid.getSelectedItems().length<1 || !$this.options.zoomOnMap) {
	                      if (tool.hasClass("locate-enabled")) {
	                           tool.removeClass("locate-enabled");
	                       }
	                       tool.addClass("locate-disabled");
	                       tool.attr("disabled",true);

                	}else{
                 		if (tool.hasClass("locate-disabled")) {
                            tool.removeClass("locate-disabled");
                        }
                        tool.addClass("locate-enabled");
                        tool.attr("disabled",false);
                	}
                }

            }
            }
        },
		setHighlight : function(evt) {
			//TODO: implement the functionality
		},
		_rebuildInlineFilter : function(){
			var $this = this;
			var inlineFilter;
			var grid = this.element.find("#" + this.options.id + "_grid")[0].component;
            var inlineFilterList = $this.getWindowConfigurationByProperty("inlineFilterColumns");
            var columns = grid.getColumnLevel().getColumns();
            $.each(columns, function (index, dataGridColumn) {
            	inlineFilter = inlineFilterList != undefined ? inlineFilterList[dataGridColumn.dataField] : undefined;
            	$this.setDataGridFilterProperties(dataGridColumn, inlineFilter);
            });
            grid.rebuildFilter();
		},

		_updateFooter : function() {
       	 var $this = this;
       	 $this._super();
       	 var footerElement = $(this.options.footer);
       	 footerElement.append(this.TABLE_FOOTER_DIV({
       		 id:$this.element.id,
       		 content : $si.i18N.Window.footerLabelTotalRows + $this._getGlobalOptionValue("grid").getDataProvider().length ,
       	 }));
       },
        setTableData: function (windowData) {
            var $this = this;
            var grid = this.element.find("#" + this.options.id + "_grid")[0].component;
            var inlineFilterList = $this.getWindowConfigurationByProperty("inlineFilterColumns");
            this.options.dataProvider = windowData.attributeDataList;
            grid.getColumnLevel().nextLevel = null;
            if ($this.options.groupByColumns && $this.options.groupByColumns.length > 0) {
                grid.setDataProvider(
                    $this.dynamicMultipleGroupBy($this.options.dataProvider, flexiciousNmsp.UIUtils.extractPropertyValues($this.options.groupByColumns, "dataField"), flexiciousNmsp.UIUtils.extractPropertyValues($this.options.groupByColumns, "headerText"), "None", null, [], false, 'select')
                );
               if ($this.options.windowConfig.expandAll || $this.options.gridExpanded) {
                $this._expandTableGrid();
            	}

            } else {
                grid.setDataProvider(this.options.dataProvider);
            }

            /*var metaDataMap = $this.getWindowConfigurationByProperty("metadata");
            $.each(grid.getDataProvider(),function(index,row){
	            $.each(row,function(colname,value){
		            if( metaDataMap[colname] != undefined ){
			            if(metaDataMap[colname].type == $this.options.dataTypes[3]){
			             	if(value){
			             		value = "True";
			            	}else{
			             		value = "False";
			             	}

			             	row[colname] = value;
			            }
			          }

	            });

            });
            */

            grid.rebuild();
            var inlineFilter;
            $this._rebuildInlineFilter();
            //to show selecteditems before refresh
            if($this.options.selectedRows){
            var selectedIndices = $this.options.selectedRows;
            $.each(selectedIndices, function (index, rowNum) {
            	var item = grid.getDataProvider();
            	grid.addSelectedItem(item[rowNum]);
            });
            }
            if(!$this.options.defaultConfigApplied){
            	$this._addDefaultProperties();
            }

             $this._setFooterRowHeight();
        },

        _addSummaryFields: function (summaryFields) {
            var $this = this;
            $this.options.footerCols = [];
            var grid = this._getGlobalOptionValue("grid");
            var columns = grid.getColumnLevel().getColumns();

            $.each(summaryFields, function (index, summaryDtl) {
                var column = grid.getColumnLevel().getColumnByDataField(summaryDtl.columnName);
                $this.options.footerCols.push(column);



                switch (summaryDtl.summaryType.toLowerCase()) {
                case "avg":
                    column.footerOperation = "average";
                    column.footerLabel = $si.i18N.Window.rightMenuTitles.average+" : ";
                    break;
                case "sum":
                    column.footerOperation = "sum";
                    column.footerLabel = $si.i18N.Window.rightMenuTitles.sum +" : ";
                    break;
                case "count":
                    column.footerOperation = "count";
                    column.footerLabel =  $si.i18N.Window.rightMenuTitles.count +" : ";
                    break;
                case "min":
                    column.footerOperation = "min";
                    column.footerLabel = $si.i18N.Window.rightMenuTitles.min +" : ";
                    break;
                case "max":
                    column.footerOperation = "max";
                    column.footerLabel = $si.i18N.Window.rightMenuTitles.max +" : ";
                    break;
                }


            });


        },

        _addGridSort: function (columns) {
            var htmlDataGrid = this._getGlobalOptionValue("grid");
            $.each(columns, function (index, column) {
                if (column.sortType != "None") {
                    var l = new flexiciousNmsp.FilterSort;
                    l.column = htmlDataGrid.getColumnLevel().getColumnByDataField(column.columnName);
                    if (l.column.getVisible() == true) {
                        l.sortColumn = column.columnName;
                        if (column.sortType == "Descending") {
                            l.isAscending = false;
                        } else {
                            l.isAscending = true;
                        }
                        l.column.getLevel().addSort(l);
                    }
                }
            });
            htmlDataGrid.rebuild();
        },

        _addColumnGrouping: function (groupColumns) {
            var $this = this;
            var grid = this._getGlobalOptionValue("grid");
            $this._createGroupByColumn();
            var groupByColumns = [];
            for (var i = 0; i < groupColumns.length; i++) {
                var columnToGroupBy = grid.getColumnLevel().getColumnByDataField(groupColumns[i]);
                columnToGroupBy.setVisible(false);
                grid.getColumnLevel().nextLevel = null;
                groupByColumns.push(columnToGroupBy);
            }
            var datasource = $this.dynamicMultipleGroupBy($this.options.dataProvider, flexiciousNmsp.UIUtils.extractPropertyValues(groupByColumns, "dataField"), flexiciousNmsp.UIUtils.extractPropertyValues(groupByColumns, "headerText"), "None", null, [], false, 'select');
            grid.setDataProvider(datasource);
            $this._addGroupColumnAtFirst();
            $this._createGroupBarElements(groupByColumns);
        },

        handleRightMenuWithSort: function (cell, isAscending) {

            var htmlDataGrid = this._getGlobalOptionValue("grid");

            var l = new flexiciousNmsp.FilterSort;
            l.column = cell._column;
            l.sortColumn = cell._column.dataField;
            l.isAscending = isAscending;
            l.column.getLevel().addSort(l);

            htmlDataGrid.rebuildBody();
            htmlDataGrid.rebuildHeader();
            htmlDataGrid.showSpinner();
        },

		_renderCellWithFormatDataANDLinksAndActionButtons: function (cell, state) {
        	var $this = this;
            var actionAndLinkDetails = "";
            var hyperLinkInfo = "";
            var columnName = state.dataField;
            var columnValue = cell[columnName];
			if(columnValue == 'undefined'){
				return "";
			}

			hyperLinkInfo = this._buildHyperLinks(columnName, $this._formatColumnData(columnName, columnValue), actionAndLinkDetails);
			var actionButtonInfo = this._buildActionButtons(columnName, columnValue);

			if (hyperLinkInfo && hyperLinkInfo.length > 0) {
                actionAndLinkDetails = actionAndLinkDetails.concat(hyperLinkInfo);
            } else {
            	actionAndLinkDetails = $this._buildColumnDisplayTypData(columnName, $this._formatColumnData(columnName, columnValue));
            }

			if (actionButtonInfo && actionButtonInfo.length > 0) {
				if(!isNaN(columnValue)|| ( columnValue != undefined && columnValue.indexOf('NaN') <0 )){
                	actionAndLinkDetails = actionAndLinkDetails.concat(actionButtonInfo);
				}
            }
			return actionAndLinkDetails;
		},

		//Build the Links / Images / return text based on the displayType provided as part of the Column Details
		_buildColumnDisplayTypData : function (columnName, columnValue) {
			var $this = this;
			var columnDetails = $this.options.windowConfig.columnDetails;
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
		},

        _renderCellWithFormatDataANDLinksAndActionButtonsOLD: function (cell, state) {
        	var $this = this;
            var actionAndLinkDetails = "";

            var columnName = state.dataField;
            var columnValue = cell[columnName];
            var hyperLinkInfo = this._buildHyperLinks(columnName, columnValue);
            var actionButtonInfo = this._buildActionButtons(columnName, columnValue);

			if(columnValue == 'undefined'){
				return "";
			}

            if (hyperLinkInfo && hyperLinkInfo.length > 0) {
                actionAndLinkDetails = actionAndLinkDetails.concat(hyperLinkInfo);
            } else {
            	actionAndLinkDetails = actionAndLinkDetails.concat($this._formatColumnData(columnName, columnValue));
            }
             if (actionButtonInfo && actionButtonInfo.length > 0) {
				if(!isNaN(columnValue)|| ( columnValue != undefined && columnValue.indexOf('NaN') <0 )){
                	actionAndLinkDetails = actionAndLinkDetails.concat(actionButtonInfo);
				}
            }

            return actionAndLinkDetails;
        },

		_formatColumnData : function (columnName, columnValue) {
			try {
				var $this = this;
				var metaDataMap = $this.getWindowConfigurationByProperty("metadata");
				if(metaDataMap != undefined && metaDataMap[columnName] != undefined && metaDataMap[columnName].type != this.options.dataTypes[1]) {
					columnValue = $si.formattingUtil.formatData(metaDataMap[columnName].type, metaDataMap[columnName].displayFormat, columnValue);
				}
				if(!isNaN(columnValue)|| ( columnValue != undefined && columnValue.indexOf('NaN') <0 )){
					return columnValue;
				} else{
					return "";
				}
			} catch(e) {
				return "";
			}
		},


        // to add display type as hyperlink
        _buildHyperLinks: function (columnName, columnValue) {
            var $this = this;
            var hyperLinkUrl;
            // This below line need to move to global. since it is one time
            // operation
            var hyperLinkColumnsDetails = $this.options.windowConfig.hyperLinkColumns;
            if(hyperLinkColumnsDetails){
	            if (hyperLinkColumnsDetails[columnName]) {
	                var onClickFunctionName = hyperLinkColumnsDetails[columnName].onClickFunction;
	                var onClickMethod = "window['" + onClickFunctionName + "']('" + columnName +"','"+escape(columnValue) + "','" + windowParams.ecosid + "','" + windowParams.artefactname +"')";
	                hyperLinkUrl = "<a href='#' onclick = " + onClickMethod + " id = ID_" + columnName + "_" + escape(columnValue) + " class = 'ct-link'>" + columnValue + "</a>";
	            }
            }
            return hyperLinkUrl;
        },

        _buildActionButtons: function (columnName, columnValue) {
            var $this = this;
            var actionButtonURL = "";
            var buttonName;
            var imageURL;
            var onClickFunctionName;
            var showFunctionName;
            var tooltipLabel;
            var actionButtonList;
            var actionButtonDetail = $this.options.windowConfig.actionButtonColumns;
            if(actionButtonDetail){
	            if (actionButtonDetail[columnName]) {
	                actionButtonList = actionButtonDetail[columnName];
	                for (var i = 0; i < actionButtonList.length; i++) {
	                    buttonName = actionButtonList[i].buttonName;
	                    imageURL = actionButtonList[i].imageURL;
	                    onClickFunctionName = actionButtonList[i].onClickFunction;
	                    showFunctionName = actionButtonList[i].showFunction;
	                    tooltipLabel = actionButtonList[i].tooltip;
	                    var onClickMethod = "window['" + onClickFunctionName + "']('" + columnName +"','"+escape(columnValue) + "','" + windowParams.ecosid + "','" + windowParams.artefactname +"')";
	                    actionButtonURL = actionButtonURL.concat('<span class="ct-action-button"><img style="float:right;" src="' + imageURL + '" onclick = "' + onClickMethod + '" id = "' + onClickFunctionName + '" class = "' + onClickFunctionName + '" title=" ' + tooltipLabel + '"></span>');
	                }
	                return actionButtonURL;
	            }
            }
            return;
        },

        getWindowContentFavoriteSettings: function () {
            var displayOptions = {};
            displayOptions.columnProperties = this._createColumnPropertiesFavorite(this._getGlobalOptionValue("grid"));
            displayOptions.aggregationProperties = this._createColumnFooterPropertiesFavorite(this._getGlobalOptionValue("grid"));
            displayOptions.sortProperties = this._createColumnsSortPropertiesFavorite(this._getGlobalOptionValue("grid"));
            if (this.options.groupByColumns) {
                displayOptions.groupProperties = this._createGroupColsPropertiesFavorite(this.options.groupByColumns);
                displayOptions.expandGroups = this.options.gridExpanded;
            }
            if (this.options.noOfColumnsToFreeze > 0) {
                displayOptions.columnFreeze = {
                    "freezeCols": this.options.noOfColumnsToFreeze
                };
            }

            displayOptions.filterProperties = this._createFilterPropertiesFavorite(this._getGlobalOptionValue("grid"));


            return displayOptions;
        },

        _createColumnPropertiesFavorite: function (grid) {
            var columns = grid.getColumnLevel().getColumns();
            var columnProperties = [];
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                if (column._headerText != "") {
                    columnProperties.push({
                        "columnName": column.dataField,
                        "width": column.getWidth(),
                        "displayOrder": column.getColIndex(),
                        "visible": column.getVisible(),
                    });
                }
            }
            return columnProperties;
        },

        _createColumnFooterPropertiesFavorite: function (grid) {
            var columns = grid.getColumnLevel().getColumns();
            var footerProperties = [];
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                if (column._headerText != "" && column.footerOperation != null && column.footerOperation != "") {
                    footerProperties.push({
                        "columnName": column.dataField,
                        "footerLabel": column.footerLabel,
                        "footerOperation": column.footerOperation
                    });

                }
            }

            return footerProperties;
        },

        _createColumnsSortPropertiesFavorite: function (grid) {
            var columns = grid.getColumnLevel().getColumns();
            var sortProperties = [];
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                var sort = column.level.hasSort(column);
                if (sort) {
                    sortProperties.push({
                        "sortColumn": sort.sortColumn,
                        "isAscending": sort.isAscending,
                        "sortIndex": column.level.getSortIndex(column)
                    });
                }
            }
            return sortProperties;
        },

        _createGroupColsPropertiesFavorite: function (groupedCols) {
            var groupedColsProperties = [];
            for (var i = 0; i < groupedCols.length; i++) {
                groupedColsProperties.push({
                    "column": groupedCols[i].dataField,
                    "groupIndex": i
                });
            }
            return groupedColsProperties;

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
            this.options.groupByColumns = null;
            $this._clearGrid();
            //$this.setTableData($this.options.windowData);
            var inlineFilterTool = $this.element.parent().find("#inlinefilterTool");
            if (inlineFilterTool.hasClass("inlinefilter-applied")) {
 				$this.onWindowToolControlClick("inlinefilterTool");
 			}

 			var autorefrshTool = $this.element.parent().find("#autorefreshTool");
            if (autorefrshTool.hasClass("autorefresh-icon")){
 				$this._enableAutoRefresh(true);
 			}else{
 				$this._enableAutoRefresh(false);
 			}
            this.tableFavoriteData = favDataObj;
            var htmlDataGrid = this._getGlobalOptionValue("grid");
            var freezeCols = 0;
            // apply freeze properties
            if (favDataObj.columnFreeze) {
                freezeCols = parseInt(favDataObj.columnFreeze.freezeCols);
                $this.options.noOfColumnsToFreeze = freezeCols;
                this._setEnableOrDisableColumnFreeze(freezeCols);
            }
            // apply column properties
            this._applyColumnProperties(favDataObj.columnProperties);

            // apply aggregation properties
            if (favDataObj.aggregationProperties && favDataObj.aggregationProperties.length > 0) {
                this._applyColumnFooterProperties(favDataObj.aggregationProperties);
            }

            // apply sort properties
            if (favDataObj.sortProperties && favDataObj.sortProperties.length > 0) {
                this._applySortProperties(favDataObj.sortProperties);
            }
            if(favDataObj.filterProperties && favDataObj.filterProperties.length>0){
				this._applyFilterDetails(favDataObj.filterProperties);
			}
            // apply group properties
            if (favDataObj.groupProperties && favDataObj.groupProperties.length > 0) {
                this._applyGroupProperties(favDataObj.groupProperties);

                if (favDataObj.expandGroups) {
                	this.options.gridExpanded = true;

                }
            }


            if (favDataObj.columnFreeze) {
              var freezeTool = $this.element.parent().find("#freezeTool");
              if(freezeTool.hasClass("freeze-icon")){
               $this._freezeColumns(freezeCols);
              }

            }
             $this._setFooterRowHeight();
            htmlDataGrid.rebuild();
        },

        _applyColumnProperties: function (columnProperties) {
        	var $this = this;
            var grid = this._getGlobalOptionValue("grid");
            var columns = grid.getColumnLevel().getColumns();
            var hiddenColumns = [];
            // sorting columns on the basis of colIndex
            columnProperties.sort(function (a, b) {
                var a1 = a.displayOrder,
                    b1 = b.displayOrder;
                if (a1 == b1) return 0;
                return a1 > b1 ? 1 : -1;
            });
            var columnsToAdd = [];
            for (var i = 0; i < columnProperties.length; i++) {
                var column = grid.getColumnLevel().getColumnByDataField(columnProperties[i].columnName);
                if (column != null) {
                    columnsToAdd.push(column);
                    var width = parseInt(columnProperties[i].width);
                    column.setColumnWidthMode("fixed");
                    column.setWidth(width);
                    column.setVisible(columnProperties[i].visible);
                    if(!columnProperties[i].visible){
                    	var hiddenCol ={};
                    	hiddenCol.display_name=grid.getColumnLevel().getColumnByDataField(columnProperties[i].columnName)._headerText;
                    	hiddenCol.actual_name = columnProperties[i].columnName;
                    	hiddenColumns.push(hiddenCol);
                    }
                }

            }

            if(hiddenColumns){
            	$this.options.drawer[$this.options.drawerWidget]("setHiddenColumnsFavorite",hiddenColumns );
            }
           	columnsToAdd.push($this.options.lastDummyCol);
            grid.setColumns(columnsToAdd);
        },

        _applyColumnFooterProperties: function (footerProperties) {
            var grid = this._getGlobalOptionValue("grid");
            var columns = grid.getColumnLevel().getColumns();

            for (var i = 0; i < footerProperties.length; i++) {
                var column = grid.getColumnLevel().getColumnByDataField(footerProperties[i].columnName);
                column.footerLabel = footerProperties[i].footerLabel;
                column.footerOperation = footerProperties[i].footerOperation
            }
        },

        _applySortProperties: function (sortProperties) {
            var grid = this._getGlobalOptionValue("grid");
            grid.getColumnLevel().currentSorts.removeAll();

            sortProperties.sort(function (a, b) {
                var a1 = a.sortIndex,
                    b1 = b.sortIndex;
                if (a1 == b1) return 0;
                return a1 > b1 ? 1 : -1;
            });

            for (var i = 0; i < sortProperties.length; i++) {
                var column = grid.getColumnLevel().getColumnByDataField(sortProperties[i].sortColumn);
                if (column != null) {
                    var l = new flexiciousNmsp.FilterSort;
                    l.column = column;
                    l.sortColumn = sortProperties[i].sortColumn;
                    l.isAscending = sortProperties[i].isAscending;
                    l.column.getLevel().addSort(l);
                }
            }
        },

        _applyGroupProperties: function (groupProperties) {
            var $this = this;
            var grid = this._getGlobalOptionValue("grid");
            $this._createGroupByColumn();
            var groupByColumns = [];

            for (var i = 0; i < groupProperties.length; i++) {
                var columnToGroupBy = grid.getColumnLevel().getColumnByDataField(groupProperties[i].column);
                columnToGroupBy.setVisible(false);
                grid.getColumnLevel().nextLevel = null;
                groupByColumns.push(columnToGroupBy);
            }

            var datasource = $this.dynamicMultipleGroupBy($this.options.dataProvider, flexiciousNmsp.UIUtils.extractPropertyValues(groupByColumns, "dataField"), flexiciousNmsp.UIUtils.extractPropertyValues(groupByColumns, "headerText"), "None", null, [], false, 'select');

            grid.setDataProvider(datasource);
            $this._createGroupBarElements(groupByColumns);
            $this._addGroupColumnAtFirst();
            $this._expandTableGrid();

        },

        _applyFilterDetails : function(filterSettings){
        		 var $this = this;
            	 var grid = this._getGlobalOptionValue("grid");
            	 if($this.getWindowConfigurationByProperty("inlineFilterColumns")){
            	 	var inlineFilterList = $this.getWindowConfigurationByProperty("inlineFilterColumns");
            		for(var i=0; i<filterSettings.length;i++){
            			if(inlineFilterList[filterSettings[i].columnName]){
            				if(filterSettings[i].expression){
								grid.setFilterValue(filterSettings[i].columnName,filterSettings[i].expression);
							}
						}

					}
				}

            },

        _removeColumnSort : function (sortColumn) {
            var $this = this;
            var grid = this._getGlobalOptionValue("grid");
            var currentSorts = grid.getColumnLevel().currentSorts;
            var sortIndex = -1;
            for (var i = 0; i < currentSorts.length; i++) {
                if (currentSorts[i].sortColumn == sortColumn.dataField) {
                    grid.getColumnLevel().currentSorts.splice(i, 1);
                    break;
                }
            }

            grid.showSpinner();

        },

        _bindDrop: function (groupBarDiv) {
  			var $this= this;
  			var grid = $this._getGlobalOptionValue("grid");
            groupBarDiv.bind("drop", function (ev) {

                ev.preventDefault();
                var data = ev.originalEvent.dataTransfer.getData("Text");

                if($(ev.target).hasClass( "droppable" ))    {

		                // creating temporary clone of the group bar div
		                var tempTarget = groupBarDiv.clone();
		                // remove all the children from the temporary div
		                while (tempTarget[0].hasChildNodes()) {
		                    tempTarget[0].removeChild(tempTarget[0].lastChild);
		                }
		                // drop item name
		                var dropItemName = data.substring(6);
		                // drop item position
		                var dropPosition = ev.originalEvent.clientX;
		                // current cursor position, taken from the location of window
		                var cursorPosition = ev.target.parentNode.parentNode.parentNode.parentNode.offsetLeft;
		                var childLength = ev.target.children.length;
		                for (var i = 0; i < childLength; i++) {
		                    if (groupBarDiv.children()[i].innerText == dropItemName) {
		                        // If the current item is the same as drop item then
		                        // just adjust the cursor position and continue to next
		                        // item
		                        cursorPosition += groupBarDiv.children()[i].clientWidth + 2;
		                        // continue to the next item
		                        continue;
		                    }
		                    cursorPosition += groupBarDiv.children()[i].clientWidth + 2;
		                    if (cursorPosition > dropPosition) {
		                        // add the element to the temp target if cursor position
		                        // is greater the item drop position
		                        tempTarget.append(document.getElementById(data));
		                        // Set the child length to 1 as to break from the loop.
		                        childLength = i;
		                    } else {
		                        for (var j = 0; j < groupBarDiv.children().length; j++) {
		                            if (groupBarDiv.children()[j].innerText != dropItemName) {
		                                tempTarget.append(groupBarDiv.children()[j]);
		                                // Move the cursor to one position back and
		                                // also decrease the total child counter by one
		                                // postion as item would have been removed from
		                                // groupBarDiv
		                                i--;
		                                childLength--;
		                                // Break from the logic after adding one item
		                                break;
		                            }
		                        }
		                    }
		                }
		                // Add all the remaining elements to the temp target div.
		                while (ev.target.hasChildNodes()) {
		                    tempTarget.append(ev.target.firstChild);
		                }
		                var tempGroupByColumns = [];
		                // Adding columns to the temporary groupbycolumns array, in the
		                // order of the new items of tempTarget div
		                if (ev.target.tagName == "DIV") {
		                    for (i = 0; i < tempTarget[0].children.length; i++) {
		                        if ($this.options.groupByColumns) {
		                            for (var j = 0; j < $this.options.groupByColumns.length; j++) {
		                                if (tempTarget[0].children[i].innerText == $this.options.groupByColumns[j].dataField) {
		                                    tempGroupByColumns.push($this.options.groupByColumns[j]);
		                                }
		                            }
		                        }
		                    }
		                    $this.options.groupByColumns = tempGroupByColumns.slice(0);
		                    $this.options.rebuild = true;
		                }


		                if ($this.options.rebuild) {

		                    grid.getColumnLevel().nextLevel = null;
		                    grid.setDataProvider(
		                        $this.dynamicMultipleGroupBy($this.options.dataProvider, flexiciousNmsp.UIUtils.extractPropertyValues($this.options.groupByColumns, "dataField"), flexiciousNmsp.UIUtils.extractPropertyValues($this.options.groupByColumns, "headerText"), "None", null, [], false, 'select'));
		                    grid.rebuild();
		                    $this._expandTableGrid();
		                }
		                $this._createGroupBarElements($this.options.groupByColumns);
		        }
            });
        },

        _bindMouseUp: function (groupBarDiv) {
            var $this = this;
            groupBarDiv.bind("mouseup", function (event, data) {

                if (event.which == 1) {


                   // $this._getGlobalOptionValue("grid").clearFilter();
                    $($this._getGlobalOptionValue("grid").getColumns()).each(function (index, col) {
                        if (col.footerOperation) {
                            if ($this.options.footerCols != null) {

                                if ($this.options.footerCols.length > 0 && $this.options.footerCols.indexOf(col) == -1) {
                                    $this.options.footerCols.push(col);
                                } else if ($this.options.footerCols.length <= 0) {
                                    $this.options.footerCols.push(col);
                                }

                            }
                        }
                    });
                    if (event.target.tagName == "IMG") {
                        for (var i = 0; i < $this.options.groupByColumns.length; i++) {
                            if (event.target.tagName == 'IMG') {
                                if (event.target.id == "del_" + $this.options.groupByColumns[i].dataField) {
                                    $this.options.groupByColumns[i].setVisible(true);
                                }
                            }
                        }
                        var itemName = event.target.id.substring(4);
                        for (var i = 0; i < $this.options.groupByColumns.length; i++) {
                            if ($this.options.groupByColumns[i].dataField == itemName) {
                                $this.options.groupByColumns.splice(i, 1);
                            }
                        }

                        if ($this.options.groupByColumns.length == 0) {
                            if ($this.options.groupcol != 'undefined') {
                                $this._getGlobalOptionValue("grid").getColumnLevel().removeColumn($this.options.groupcol);
                                groupBarHTML = $this.GROUP_BAR_TEXT;
                                $("#" + $this.options.id + "_groupBar").html(groupBarHTML);
                            }
                        }
                        $this.options.rebuild = true;
                        $this._getGlobalOptionValue("grid").validateNow();
                    } else if ($this._getGlobalOptionValue("grid").getHeaderContainer().columnDraggingDragCell) {
                        var remainingCols = $this._getGlobalOptionValue("grid").getColumnLevel().getVisibleColumns();
                        var columnToGroupBy = $this._getGlobalOptionValue("grid").getHeaderContainer().columnDraggingDragCell.getColumn();
						var isAllowed = false;
	                    if (remainingCols.length == 3) {
	                    	$.each(remainingCols, function (index, tmpColumn) {
	                    		if(tmpColumn.dataField == 'select'){
									  isAllowed = true;
	                    		}
			            	});
	                    }
	                    if (remainingCols.length >= 3  && !isAllowed) {
                            if (columnToGroupBy.dataField == "select") {
                                return;
                            }
                            if ($this.options.groupByColumns == null) {
                                $this.options.groupByColumns = [];
                                $this.options.groupcol = "";
                            }
                            if ($this.options.groupByColumns.indexOf(columnToGroupBy) == -1) {
                                $this.options.groupByColumns.push(columnToGroupBy);
                            }
                            columnToGroupBy.setVisible(false);
                            if ($this.options.footerCols.length > 0) {
                                var index = $this.options.footerCols.indexOf(columnToGroupBy);
                                if (index >= 0) {
                                    $this.options.footerCols.splice(index, 1);
                                }
                            }
                            $this._getGlobalOptionValue("grid").enableDynamicLevels = true;
                            $this.options.rebuild = true;
                        }
                     }

                    if ($this.options.rebuild) {

                        $this._getGlobalOptionValue("grid").getColumnLevel().nextLevel = null;
                        if ($this.options.groupByColumns.length == 0) {
                            $this.options.groupcol = "";
                            $this._getGlobalOptionValue("grid").setDataProvider($this.options.dataProvider);
                        } else {
                            if ($this.options.groupcol == "") {
                                $this._createGroupByColumn();
                                $this._addGroupColumnAtFirst();
                            }
                            var datasource = $this.dynamicMultipleGroupBy($this.options.dataProvider, flexiciousNmsp.UIUtils.extractPropertyValues($this.options.groupByColumns, "dataField"), flexiciousNmsp.UIUtils.extractPropertyValues($this.options.groupByColumns, "headerText"), "None", null, [], false, 'select');
                            $this._getGlobalOptionValue("grid").setDataProvider(datasource);
                            $this._expandTableGrid();
                            $this._createGroupBarElements($this.options.groupByColumns);



                        }


                         if ($this.options.noOfColumnsToFreeze > 0) {
                               var freezeTool = $this.element.parent().find("#freezeTool");
                               if(freezeTool.hasClass("unfreeze-icon")){
                               		$this.options.enableOrDisableColumnFreeze = false;
                               	}else{
                               		$this.options.enableOrDisableColumnFreeze = true;
                               	}
                                $this._freezeColumns($this.options.noOfColumnsToFreeze);

                            }
                        $this._addGroupColumnAtFirst();
                        $this._getGlobalOptionValue("grid").rebuild();
                        }
                    $this.options.rebuild = false;
                }
            });
        },

		_addGroupColumnAtFirst : function(){
				var $this = this;
				var groupCol = $this._getGlobalOptionValue("grid").getColumnLevel().getColumnByDataField("select");
				var gridCols = $this._getGlobalOptionValue("grid").getColumnLevel().getColumns();
				     if (groupCol) {
				                var index = gridCols.indexOf(groupCol);
				                gridCols.splice(index, 1);
				                gridCols.splice(0, 0, groupCol);
				                $this._getGlobalOptionValue("grid").setColumns(gridCols);


				       }

				 $this._getGlobalOptionValue("grid").reDraw();
                 $this._getGlobalOptionValue("grid").rebuild();
				},

		 _expandTableGrid: function () {
            var $this = this;
            $this._getGlobalOptionValue("grid").validateNow();
            $this._getGlobalOptionValue("grid").expandAll();
            $this.options.gridExpanded = true;
        },

        _handleRightClickOnHeaderRow: function () {
            var $this = this;
            var gridContainterRightClick = $("#" + this.options.id + "_grid");
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
	                {title: $si.i18N.Window.rightMenuTitles.hideColumn, cmd: "hideColumn", uiIcon:"empty-icon"},
	                {title: $si.i18N.Window.rightMenuTitles.aggregation, cmd:"aggregation", children: [
	                           				{title: $si.i18N.Window.rightMenuTitles.sum, cmd: "sum"},
	                           				{title: $si.i18N.Window.rightMenuTitles.count, cmd: "count"},
	                           				{title: $si.i18N.Window.rightMenuTitles.average, cmd: "average"},
	                           				{title: $si.i18N.Window.rightMenuTitles.min, cmd: "min"},
	                           				{title: $si.i18N.Window.rightMenuTitles.max , cmd: "max"},
	                           				]},
	                {title: $si.i18N.Window.rightMenuTitles.cancelAllSorts, cmd: "removeAllSort"},
	                {title: $si.i18N.Window.rightMenuTitles.clearFilter, cmd: "removeInlineFilter",disabled : true},
	            ],

                // Implement the beforeOpen callback to dynamically change the
                // entries
                beforeOpen: function (event, ui) {
                    if (ui.target[0].component._text == "") {
                        event.preventDefault();
                    }
                    var grid = event.target.component;
                    var metadataMap = $this.getWindowConfigurationByProperty("metadata");
                   if(metadataMap != undefined){
                    var dataType = metadataMap[grid.currentCell.getColumn().dataField].type;
                    if (dataType == "java.lang.String" || dataType == "java.lang.Character") {
                        gridContainterRightClick.contextmenu("enableEntry", "sum", false);
                        gridContainterRightClick.contextmenu("enableEntry", "average", false);
                        gridContainterRightClick.contextmenu("enableEntry", "max", false);
                        gridContainterRightClick.contextmenu("enableEntry", "min", false);
                        gridContainterRightClick.contextmenu("enableEntry", "count", true);
                    } else if (dataType == "java.util.Date") {
                        gridContainterRightClick.contextmenu("enableEntry", "sum", false);
                        gridContainterRightClick.contextmenu("enableEntry", "average", false);
                        gridContainterRightClick.contextmenu("enableEntry", "max", true);
                        gridContainterRightClick.contextmenu("enableEntry", "min", true);
                        gridContainterRightClick.contextmenu("enableEntry", "count", true);
                    } else {
                        gridContainterRightClick.contextmenu("enableEntry", "sum", true);
                        gridContainterRightClick.contextmenu("enableEntry", "average", true);
                        gridContainterRightClick.contextmenu("enableEntry", "max", true);
                        gridContainterRightClick.contextmenu("enableEntry", "min", true);
                        gridContainterRightClick.contextmenu("enableEntry", "count", true);

                    }
                    }else{
                        gridContainterRightClick.contextmenu("enableEntry", "sum", false);
                        gridContainterRightClick.contextmenu("enableEntry", "average", false);
                        gridContainterRightClick.contextmenu("enableEntry", "max", false);
                        gridContainterRightClick.contextmenu("enableEntry", "min", false);
                        gridContainterRightClick.contextmenu("enableEntry", "count", true);

                    }
                    if (!grid.currentCell) {
                        grid.currentCell = grid.getBodyContainer().getCellFromMouseEventTarget(ui.target[0].component);
                    }

                    if (event.target.component.getFilterArguments()[0] != undefined) {
                        if (event.target.component.getFilterArguments()[0].filterControlValue != null) {
                            gridContainterRightClick.contextmenu("enableEntry", "removeInlineFilter", true);
                        }
                    } else {
                        gridContainterRightClick.contextmenu("enableEntry", "removeInlineFilter", false);
                    }

                    var flag = false;
                    if (grid.getColumnLevel().currentSorts.length > 0) {
                        gridContainterRightClick.contextmenu("enableEntry", "removeAllSort", true);
                        for (var i = 0; i < grid.getColumnLevel().currentSorts.length; i++) {
                            if (grid.getColumnLevel().currentSorts[i].sortColumn == grid.currentCell._column.dataField) {
                                flag = true;
                                if (grid.getColumnLevel().currentSorts[i].isAscending) {
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
                    if (!flag) {
                        gridContainterRightClick.contextmenu("showEntry", "cancelSort", false);
                        gridContainterRightClick.contextmenu("showEntry", "sortDesc", true);
                        gridContainterRightClick.contextmenu("showEntry", "sortAsc", true);
                    }
                    var columnArray = grid.getColumnLevel().getColumns();
                    var currentColName = grid.currentCell._column.dataField;
                    var currentColFooterOperation = grid.currentCell._column.footerOperation;

					gridContainterRightClick.contextmenu("setEntry", "sum", { title: $si.i18N.Window.rightMenuTitles.sum, cmd: "sum", uiIcon: "empty-icon" });
					gridContainterRightClick.contextmenu("setEntry", "count", { title: $si.i18N.Window.rightMenuTitles.count, cmd: "count", uiIcon: "empty-icon" });
					gridContainterRightClick.contextmenu("setEntry", "average", { title: $si.i18N.Window.rightMenuTitles.average, cmd: "average", uiIcon: "empty-icon" });
					gridContainterRightClick.contextmenu("setEntry", "max", { title: $si.i18N.Window.rightMenuTitles.max, cmd: "max", uiIcon: "empty-icon" });
					gridContainterRightClick.contextmenu("setEntry", "min", { title: $si.i18N.Window.rightMenuTitles.min, cmd: "min", uiIcon: "empty-icon" });
					gridContainterRightClick.contextmenu("setEntry", "cancelSum", { title: $si.i18N.Window.rightMenuTitles.sum, cmd: "sum", uiIcon: "empty-icon" });
					gridContainterRightClick.contextmenu("setEntry", "cancelCount", { title: $si.i18N.Window.rightMenuTitles.count, cmd: "count", uiIcon: "empty-icon" });
					gridContainterRightClick.contextmenu("setEntry", "cancelAverage", {title: $si.i18N.Window.rightMenuTitles.average, cmd: "average", uiIcon: "empty-icon"});
					gridContainterRightClick.contextmenu("setEntry", "cancelMax", { title: $si.i18N.Window.rightMenuTitles.max, cmd: "max", uiIcon: "empty-icon" });
					gridContainterRightClick.contextmenu("setEntry", "cancelMin", {title: $si.i18N.Window.rightMenuTitles.min, cmd: "min", uiIcon: "empty-icon" });

                    // NEED TO CHECK WITH null, cmd and target....
                    for (var i = 0; i < columnArray.length; i++) {
                        if (currentColName == columnArray[i].dataField && currentColFooterOperation) {
                            var tCase = currentColFooterOperation.charAt(0).toUpperCase() + currentColFooterOperation.slice(1)
                            var tmpCmd = "cancel" + tCase;
                            if (currentColFooterOperation == 'sum' || currentColFooterOperation == 'count' || currentColFooterOperation == 'average' || currentColFooterOperation == 'min' || currentColFooterOperation == 'max') {
                                gridContainterRightClick.contextmenu("setEntry", currentColFooterOperation, {
                                    title: tCase,
                                    cmd: tmpCmd,
                                    uiIcon: "k-checkbox"
                                });
                            }
                        }
                    }

                     var remainingCols = $this._getGlobalOptionValue("grid").getColumnLevel().getVisibleColumns();
                     var minCount = 2;

                     if ($this.options.groupcol) {
                            minCount = 3;
                        }
                    if (remainingCols.length <= minCount) {
                        gridContainterRightClick.contextmenu("enableEntry", "hideColumn", false);
                    }else {
                    	gridContainterRightClick.contextmenu("enableEntry", "hideColumn", true);
                    }
                },

                select: function (event, ui) {
                    selectedMenu = ui.cmd;
                    var grid = $this._getGlobalOptionValue("grid");
                    var footerGrid = null;
                    if (!grid.currentCell)
                        grid.currentCell = grid.getBodyContainer().getCellFromMouseEventTarget(ui.target[0].component);

                    if (ui.cmd == 'sortAsc') {
                        setSelectedMenu = ui.cmd;
                        $this.handleRightMenuWithSort(grid.currentCell, true);
                    } else if (ui.cmd == 'sortRepAsc') {
                        setSelectedMenu = ui.cmd;
                        $this.handleRightMenuWithSort(grid.currentCell, true);
                    } else if (ui.cmd == 'sortDesc') {
                        setSelectedMenu = ui.cmd;
                        $this.handleRightMenuWithSort(grid.currentCell, false);
                    } else if (ui.cmd == 'cancelSort') {

                        $this._removeColumnSort(grid.currentCell._column);
                        grid.rebuild();
                    } else if (ui.cmd == 'hideColumn') {

                    		var htmlGrid = $this._getGlobalOptionValue("grid");
                            htmlGrid.currentCell.getColumn().setVisible(false);
                            var hiddenCol = {};
                            hiddenCol.actual_name = htmlGrid.currentCell.getColumn().dataField;
                            hiddenCol.display_name = htmlGrid.currentCell.getColumn()._headerText;
                            $this.options.hiddenColList.push(hiddenCol);

                            if ($this.options.noOfColumnsToFreeze > 0) {
                               var freezeTool = $this.element.parent().find("#freezeTool");
                               if(freezeTool.hasClass("unfreeze-icon")){
                               		$this.options.enableOrDisableColumnFreeze = false;
                               	}else{
                               		$this.options.enableOrDisableColumnFreeze = true;

                               	}
                               $this._freezeColumns($this.options.noOfColumnsToFreeze);

                            }

                            if (htmlGrid.currentCell.getColumn().level.hasSort(htmlGrid.currentCell.getColumn())) {
                                $this._removeColumnSort(htmlGrid.currentCell.getColumn());
                            }

                            htmlGrid.reDraw();
                            $this.options.drawer[$this.options.drawerWidget]("setHiddenColumnsFavorite", $this.options.hiddenColList);


                    }  else if (ui.cmd == 'sum') {
                        var previous = grid.currentCell._column.footerOperation;
                        if (previous) {
                            var uCase = previous.charAt(0).toUpperCase() + previous.slice(1);
                            gridContainterRightClick.contextmenu("setEntry", "cancel" + uCase, {
                                title: uCase,
                                cmd: previous
                            });
                        }
                        grid.currentCell.getColumn().footerLabelFunction2 = $this._aggregateFooter.bind($this);
						grid.currentCell.getColumn().footerOperation = "sum";
                        $this.options.footerCols.push(grid.currentCell.getColumn());
                    } else if (ui.cmd == 'count') {

                        var previous = grid.currentCell._column.footerOperation;
                        if (previous) {
                            var uCase = previous.charAt(0).toUpperCase() + previous.slice(1);
                            gridContainterRightClick.contextmenu("setEntry", "cancel" + uCase, {
                                title: uCase,
                                cmd: previous
                            });
                        }
                        grid.currentCell.getColumn().footerLabelFunction2 = $this._aggregateFooter.bind($this);
                        grid.currentCell.getColumn().footerOperation = "count";
                        grid.currentCell.getColumn().footerOperationPrecision = 0;
                        $this.options.footerCols.push(grid.currentCell.getColumn());
                    } else if (ui.cmd == 'average') {
                        var previous = grid.currentCell._column.footerOperation;
                        if (previous) {
                            var uCase = previous.charAt(0).toUpperCase() + previous.slice(1);
                            gridContainterRightClick.contextmenu("setEntry", "cancel" + uCase, {
                                title: uCase,
                                cmd: previous
                            });
                        }
                        grid.currentCell.getColumn().footerLabelFunction2 = $this._aggregateFooter.bind($this);
                        grid.currentCell.getColumn().footerOperation = "average";
                        $this.options.footerCols.push(grid.currentCell.getColumn());
                    } else if (ui.cmd == 'min') {
                        var previous = grid.currentCell._column.footerOperation;
                        if (previous) {
                            var uCase = previous.charAt(0).toUpperCase() + previous.slice(1);
                            gridContainterRightClick.contextmenu("setEntry", "cancel" + uCase, {
                                title: uCase,
                                cmd: previous
                            });
                        }
                        grid.currentCell.getColumn().footerLabelFunction2 = $this._aggregateFooter.bind($this);
                        grid.currentCell.getColumn().footerOperation = "min";
                        $this.options.footerCols.push(grid.currentCell.getColumn());

                    } else if (ui.cmd == 'max') {
                        var previous = grid.currentCell._column.footerOperation;
                        if (previous) {
                            var uCase = previous.charAt(0).toUpperCase() + previous.slice(1);
                            gridContainterRightClick.contextmenu("setEntry", "cancel" + uCase, {
                                title: uCase,
                                cmd: previous
                            });
                        }
                        grid.currentCell.getColumn().footerLabelFunction2 = $this._aggregateFooter.bind($this);
                        grid.currentCell.getColumn().footerOperation = "max";
                        $this.options.footerCols.push(grid.currentCell.getColumn());

                    } else if (ui.cmd == 'cancelSum') {
                        gridContainterRightClick.contextmenu("setEntry", "cancelSum", {
                            title: $si.i18N.Window.rightMenuTitles.sum+ " :",
                            cmd: "sum"
                        });
                        grid.currentCell.getColumn().footerLabelFunction2 = null;
                        grid.currentCell.getColumn().footerOperation = "";
                        var index = $this.options.footerCols.indexOf(grid.currentCell.getColumn());
                        $this.options.footerCols.splice(index,1);
                    } else if (ui.cmd == 'cancelCount') {
                        gridContainterRightClick.contextmenu("setEntry", "cancelCount", {
                            title: $si.i18N.Window.rightMenuTitles.count + " :",
                            cmd: "count"
                        });
                        grid.currentCell.getColumn().footerLabelFunction2 = null;
                        grid.currentCell.getColumn().footerOperation = "";
                        var index = $this.options.footerCols.indexOf(grid.currentCell.getColumn());
                        $this.options.footerCols.splice(index,1);
                    } else if (ui.cmd == 'cancelAverage') {
                        gridContainterRightClick.contextmenu("setEntry", "cancelAverage", {
                            title: $si.i18N.Window.rightMenuTitles.average + " :",
                            cmd: "average"
                        });
                        grid.currentCell.getColumn().footerLabelFunction2 = null;
                        grid.currentCell.getColumn().footerOperation = "";
                        var index = $this.options.footerCols.indexOf(grid.currentCell.getColumn());
                        $this.options.footerCols.splice(index,1);
                    } else if (ui.cmd == 'cancelMin') {
                        gridContainterRightClick.contextmenu("setEntry", "cancelMin", {
                            title: $si.i18N.Window.rightMenuTitles.min + " :",
                            cmd: "min"
                        });
                        grid.currentCell.getColumn().footerLabelFunction2 = null;
                        grid.currentCell.getColumn().footerOperation = "";
                        var index = $this.options.footerCols.indexOf(grid.currentCell.getColumn());
                        $this.options.footerCols.splice(index,1);
                    } else if (ui.cmd == 'cancelMax') {
                        gridContainterRightClick.contextmenu("setEntry", "cancelMax", {
                            title: $si.i18N.Window.rightMenuTitles.max + " :",
                            cmd: "max"
                        });
                        grid.currentCell.getColumn().footerLabelFunction2 = null;
                        grid.currentCell.getColumn().footerOperation = "";
                        var index = $this.options.footerCols.indexOf(grid.currentCell.getColumn());
                        $this.options.footerCols.splice(index,1);
                    }  else if (ui.cmd == 'removeAllSort') {
                        grid.getColumnLevel().currentSorts.removeAll();

                    } else if (ui.cmd == 'removeInlineFilter') {
                        grid.clearFilter();

                    }

                    $this._setFooterRowHeight();
					$this.setTableData($this.options.windowData);
                    grid.rebuild();

                }
            });
        },

		_clearGrid : function(){
			var $this = this;
			var grid = this._getGlobalOptionValue("grid");
            var groupBarDiv = $this.element.find("#" + this.options.id + "_groupBar");
            groupBarDiv.children().remove();
            $this._getGlobalOptionValue("grid").getColumnLevel().removeColumn($this.options.groupcol);
            $this._getGlobalOptionValue("grid").clearFilter();
            $("#" + $this.options.id + "_groupBar").html($this.GROUP_BAR_TEXT);
            var grid = this._getGlobalOptionValue("grid");
            // removing all columns
            grid.getColumnLevel().clearColumns();
            this._addColumnstoGrid();
            // removing sorts
            grid.getColumnLevel().currentSorts.removeAll();
            grid.setDataProvider(this.options.dataProvider);
            grid.rebuild();
		},
        _clearGridChanges: function () {
            var $this = this;
            $this.options.defaultConfigApplied = false;
            var groupBarDiv = $this.element.find("#" + this.options.id + "_groupBar");
            groupBarDiv.children().remove();
            $this._getGlobalOptionValue("grid").getColumnLevel().removeColumn($this.options.groupcol);
            $this._getGlobalOptionValue("grid").clearFilter();
            $("#" + $this.options.id + "_groupBar").html($this.GROUP_BAR_TEXT);
            var grid = this._getGlobalOptionValue("grid");

            // removing all columns
            grid.getColumnLevel().clearColumns();
            // adding columns to grid
            this._addColumnstoGrid();
            // removing sorts
            grid.getColumnLevel().currentSorts.removeAll();
           	$this.setTableData($this.options.windowData);

            if(!$this.options.defaultConfigApplied){
            	$this._addDefaultProperties();
            }
             grid.rebuild();
            return {};
        },

        reset: function () {
            this._clearGridChanges();
            this._super();
        },

        _getColumnBackgroundColor: function (cell, state) {
            var $this = this;
            if (cell.parent.lastSelectedRowIndex == cell.rowInfo.getRowIndex()) {
                return;
            }
            var operator;
            var cellColor;
            var colorConfiguration;
            if (!cell.getColumn()) {
                return null;
            }
            var val = flexiciousNmsp.UIUtils.resolveExpression(cell.getRowInfo().getData(), cell.getColumn().dataField);
            if (!val) {
                return null;
            }
            var metaDataMap = $this.getWindowConfigurationByProperty("metadata");
            var metadata = metaDataMap[cell.getColumn().dataField];
			var dataType = metadata.type;
			var tempColorValue;
            var columnDetails = $this.options.windowConfig.columnDetails;
            if (columnDetails && cell.getColumn().dataField && columnDetails[cell.getColumn().dataField]) {
                colorConfiguration = columnDetails[cell.getColumn().dataField].cellColor;
                if (colorConfiguration) {
                    for (var i = 0; i < colorConfiguration.length; i++) {
                        cellColor = colorConfiguration[i];
                        operator = cellColor.operator;
                        if (operator && cellColor.value) {
                            if (dataType=="java.util.Date"){
                        		var displayFormat = metadata.displayFormat;
								if(!displayFormat){
									displayFormat = this.DATE_FORMAT;
								}else{
									displayFormat = displayFormat.replace("dd","DD");
								}
								val = moment(val, this.DATE_FORMAT).toDate().getTime();
								tempColorValue = moment(cellColor.value, displayFormat).toDate().getTime();
							}
							else{
								tempColorValue = cellColor.value;
							}
							if(operator == "LesserThan"){
								if(val < tempColorValue){
									return cellColor.backgroundColor.replace("#","0x");
								}
							}else if(operator == "GreaterThan"){
								if(val > tempColorValue){
									return cellColor.backgroundColor.replace("#","0x");
								}
							}else if(operator == "LesserThanEquals"){
								if(val <= tempColorValue){
									return cellColor.backgroundColor.replace("#","0x");
								}
							}else if(operator == "GreaterThanEquals"){
								if(val >= tempColorValue){
									return cellColor.backgroundColor.replace("#","0x");
								}
							}else if(operator == "Equals"){
								if(val == tempColorValue){
									return cellColor.backgroundColor.replace("#","0x");
								}
							}else if(operator == "NotEquals"){
								if(val != tempColorValue){
									return cellColor.backgroundColor.replace("#","0x");
								}
							}else if(operator == "Like"){
								if(typeof val.toLowerCase === 'function' && val.toLowerCase().indexOf(tempColorValue.toLowerCase()) >= 0){
									return cellColor.backgroundColor.replace("#","0x");
								}
							}else if(operator == "Contains"){
								if(typeof val.toLowerCase === 'function' && val.toLowerCase().indexOf(tempColorValue.toLowerCase()) >= 0){
									return cellColor.backgroundColor.replace("#","0x");
								}
							}
                        }
                    }
                }
            }
            return null;
        },

        _getColumnForegroundColor: function (cell, state) {
            var $this = this;
            if (cell.parent.lastSelectedRowIndex == cell.rowInfo.getRowIndex()) {
                return;
            }

			var operator;
            var cellColor;
            var colorConfiguration;
            if (!cell.getColumn()) {
                return null;
            }
            var val = flexiciousNmsp.UIUtils.resolveExpression(cell.getRowInfo().getData(), cell.getColumn().dataField);
            if (!val) {
                return null;
            }
            var metaDataMap = $this.getWindowConfigurationByProperty("metadata");
            var metadata = metaDataMap[cell.getColumn().dataField];
			var dataType = metadata.type;
			var tempColorValue;
            var columnDetails = $this.options.windowConfig.columnDetails;
            if (columnDetails && cell.getColumn().dataField && columnDetails[cell.getColumn().dataField]) {
                colorConfiguration = columnDetails[cell.getColumn().dataField].cellColor;
                if (colorConfiguration) {
                    for (var i = 0; i < colorConfiguration.length; i++) {
                        cellColor = colorConfiguration[i];
                        operator = cellColor.operator;
                        if (operator && cellColor.value) {
                        	if (dataType=="java.util.Date"){
                        		var displayFormat = metadata.displayFormat;
								if(!displayFormat){
									displayFormat = this.DATE_FORMAT;
								}else{
									displayFormat = displayFormat.replace("dd","DD");
								}
								val = moment(val, this.DATE_FORMAT).toDate().getTime();
								tempColorValue = moment(cellColor.value, displayFormat).toDate().getTime();
							}
							else{
								tempColorValue = cellColor.value;
							}
							if(operator == "LesserThan"){
								if(val < tempColorValue){
									return cellColor.foregroundColor.replace("#","0x");
								}
							}else if(operator == "GreaterThan"){
								if(val > tempColorValue){
									return cellColor.foregroundColor.replace("#","0x");
								}
							}else if(operator == "LesserThanEquals"){
								if(val <= tempColorValue){
									return cellColor.foregroundColor.replace("#","0x");
								}
							}else if(operator == "GreaterThanEquals"){
								if(val >= tempColorValue){
									return cellColor.foregroundColor.replace("#","0x");
								}
							}else if(operator == "Equals"){
								if(val == tempColorValue){
									return cellColor.foregroundColor.replace("#","0x");
								}
							}else if(operator == "NotEquals"){
								if(val != tempColorValue){
									return cellColor.foregroundColor.replace("#","0x");
								}
							}else if(operator == "Like"){
								if(typeof val.toLowerCase === 'function' && val.toLowerCase().indexOf(tempColorValue.toLowerCase()) >= 0){
									return cellColor.foregroundColor.replace("#","0x");
								}
							}else if(operator == "Contains"){
								if(typeof val.toLowerCase === 'function' && val.toLowerCase().indexOf(tempColorValue.toLowerCase()) >= 0){
									return cellColor.foregroundColor.replace("#","0x");
								}
							}
                        }
                    }
                }
            }
            return null;
        },

		_aggregateFooter : function (cell){
			var metaDataMap = this.getWindowConfigurationByProperty("metadata");

			var val=cell.getRowInfo().getData();
			var nestDepth = cell.getLevel().getNestDepth();
			var dataField = cell.getColumn().getDataField();
			var operation = cell.getColumn().footerOperation;
			cell.getColumn().wrapText = true;
			//cell.getColumn().footerWordWrap=true;
			var arr=[];

			var items,items2;
			if(val instanceof  Array){
				if(val[0].children==undefined){
					for(var i=0;i<val.length;i++){
						arr.push({"value":val[i][dataField]});
					}
				}else{
					for(var i=0;i<val.length;i++){
						items=val[i].children;
						for(var j=0;j<items.length;j++){
							arr.push({"value":items[j][dataField]});
						}
					}
				}
				switch (operation){
					case "sum":
						return "Total "+"Sum: "+flexiciousNmsp.UIUtils.sum(arr,"value");
					case "average":
						return "Total "+"Average: "+flexiciousNmsp.UIUtils.average(arr,"value").toFixed(2);
					case "max":
						return "Total "+"Max: "+ this._getFormattedValue(flexiciousNmsp.UIUtils.max(arr,"value"), metaDataMap, dataField);
					case "min":
						return "Total "+"Min: "+ this._getFormattedValue(flexiciousNmsp.UIUtils.min(arr,"value"), metaDataMap, dataField);
					case "count":
						return "Total "+"Count: "+flexiciousNmsp.UIUtils.getLength(arr);
				}
			}
			else {
				var valKeys = Object.keys(val);
				var groupLevelLabel = "";
				for(var i=0; i<valKeys.length; i++){
					if(valKeys[i]!=dataField && valKeys[i]!="select" && valKeys[i]!="children" && val["select"]==val[valKeys[i]]){
						groupLevelLabel = valKeys[i];
					}
				}
				switch (operation){
					case "sum":
						return groupLevelLabel+"-"+val[groupLevelLabel]+", Sum : "+ val[dataField];
					case "average":
						return groupLevelLabel+"-"+val[groupLevelLabel]+", Average : "+val[dataField];
					case "max":
						return groupLevelLabel+"-"+val[groupLevelLabel]+", Max : "+ this._getFormattedValue(val[dataField], metaDataMap, dataField);
					case "min":
						return groupLevelLabel+"-"+val[groupLevelLabel]+", Min : "+ this._getFormattedValue(val[dataField], metaDataMap, dataField);
					case "count":
						return groupLevelLabel+"-"+val[groupLevelLabel]+", Count : "+val[dataField];
				}
			}

		},
		_getFormattedValue : function(value, metaDataMap, dataField){
			if(metaDataMap != undefined && metaDataMap[dataField] != undefined && metaDataMap[dataField].type != this.options.dataTypes[1]) {
				return $si.formattingUtil.formatData(metaDataMap[dataField].type, metaDataMap[dataField].displayFormat, value);
			} else {
				return value;
			}

		},
        addFilterIcons : function(filterCols){
        	var $this = this;
        	var columns =  this.options.grid.getColumnLevel().getColumns();
        	var filterColumns = [];
        	$.each(filterCols,function(indx,filterCol){
        		filterColumns.push($this.options.grid.getColumnLevel().getColumnByDataField(filterCol));
        	});

        	$.each(columns,function(index,col){
        	if($this.options.grid.getHeaderContainer().rows[0]){
        		 	var headerCell = $this.options.grid.getHeaderContainer().getCellForRowColumn($this.options.grid.getHeaderContainer().rows[0].getData(),col);
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
        	if($this.options.windowData){
        	$($this.options.footer).children().text($si.i18N.Window.footerLabelTotalRows +
					$this.options.windowData.attributeDataList.length);
					}
        },

        bringWindowToFront : function(){
        	this.refreshDataGrid();
        	this._super();
 	 	},

    });
});