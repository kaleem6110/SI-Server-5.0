define(['siViewerNamespace','jquery-maskedinput','jquery-toaster','jquery-ui-menu','jquery.ui-contextmenu'
        ,'table-bootstrap','table-theme','jquery.watermarkinput'],function($si) {

/*tableGridUtils.vrh_convertDate=function(item,col){
    var dt = flexiciousNmsp.UIUtils.resolveExpression(item,col.getDataField()).toString();
    var date =flexiciousNmsp.UIUtils.adapter.getDateValue(dt,flexiciousNmsp.Constants.YMD_MASK); //will need to change this for
    return date;
}
tableGridUtils.vrh_dataGridFormatDateLabelFunction=function(item, dgColumn)
{
    var num=flexiciousNmsp.UIUtils.resolveExpression(item,dgColumn.dataField);
    var date=tableGridUtils.vrh_convertDate(item,dgColumn);
    return flexiciousNmsp.UIUtils.formatDate(date);
}*/
 var tableGridUtils = $si.createNameSpace("spacetimeinsight.tableGridUtils");
tableGridUtils.IMAGE_PATH=$si.viewer.serverUrl+"images";
flexiciousNmsp.Constants.IMAGE_PATH = $si.viewer.serverUrl+"images";
flexiciousNmsp.FlexDataGrid.imagesRoot = $si.viewer.serverUrl+"images";
flexiciousNmsp.StyleDefaults.defaults.imagesRoot = $si.viewer.serverUrl+"images";
tableGridUtils.DynamicColumns_counter = 0;

/*flexiciousNmsp.FlexDataGrid.prototype.defaultExcelHandlerFunction = function (grid) {
        var a = grid.excelOptions;        
        a.exportOptionsRenderer = grid.popupFactoryExportOptions;
        flexiciousNmsp.ExtendedExportController.instance().doexport(grid, a);
 };*/
    
    
tableGridUtils.grid_itemRollOutHandler=function (evt){
	
   evt.grid.hideTooltip();

};
tableGridUtils.groupCol;
tableGridUtils.populatedArray ;
tableGridUtils.groupedData_getFooter=function (cell){
	tableGridUtils.populatedArray = [];
	var header = tableGridUtils.groupCol;
	
    var val=cell.getRowInfo().getData();
    if(cell.getColumn().getDataField()){
    return tableGridUtils.groupedData_getTotal(val,cell.getLevel().getNestDepth(),
        cell.getColumn().getDataField(),true,cell.getColumn().footerOperation ,header);
    }else{
    	return "";
    }

};
tableGridUtils.groupedData_getTotal=function (val,nestDepth,dataField,usePrefix,footerLabel,header){

    var arr=[];    
 
    if( val instanceof  Array){
    	arr =  tableGridUtils.getFooterObjects(val,dataField);
    	
    }
    
    var aggregateVal = flexiciousNmsp.UIUtils.sum(arr,"value");
    
    return (usePrefix?header+" "+footerLabel+":" : "")+aggregateVal;

};

tableGridUtils.getFooterObjects = function(objArray,dataField){	
	   

	   for(var index=0;index<=objArray.length;index++){
		   if(objArray[index]){
	        if (objArray[index].children) {
	        	tableGridUtils.getFooterObjects(objArray[index].children,dataField);
	        } else {
	            if (tableGridUtils.populatedArray.indexOf(objArray[index]) < 0) {
	            	if(dataField){
	            		  var  rep=objArray[index];
	            		tableGridUtils.populatedArray.push({"value":rep[dataField]});
	            	}
	            }
	        }
		   }

	    }

	    return tableGridUtils.populatedArray;

},


tableGridUtils.convertDate=function(item,col){
    var dt = flexiciousNmsp.UIUtils.resolveExpression(item,col.getDataField()).toString();
    var date =flexiciousNmsp.UIUtils.adapter.getDateValue(dt,flexiciousNmsp.Constants.SHORT_DATE_MASK); //will need to change this for
    return date;
};

tableGridUtils.dataGridFormatDateLabelFunction=function(item, dgColumn)
{
    var num=flexiciousNmsp.UIUtils.resolveExpression(item,dgColumn.dataField);
    var date=this.convertDate(item, dgColumn);
    return flexiciousNmsp.UIUtils.formatDate(date);
};

tableGridUtils.columnLabelFunction = function(item,Column){
var html = "<b>"+column.getHeaderText()+" : </b> " + item.type ;
          return html;

};


tableGridUtils.grid_itemRollOverHandler=function (evt){
	if(this.options.windowConfig.toolTipJSFunction && window[this.options.windowConfig.toolTipJSFunction]!=undefined){
		evt.cell.domElement.title = window[this.options.windowConfig.toolTipJSFunction](evt.cell);
	}
	else{
		evt.cell.domElement.title = $("<p>"+evt.cell._text+"</p>").text();
	}
};

flexiciousNmsp.FlexDataGridHeaderCell.prototype.createSortIcon = function (b) {
 var a, c = flexiciousNmsp.UIUtils,
        d = flexiciousNmsp.Constants;
        this.icon && this.destroySortIcon();
        if (!this.getColumn() || this.getColumn().sortable) {
            var a = this.level.grid;
            if (this.level.getEnableMultiColumnSort()) {
                var f = new flexiciousNmsp.Label;
                f.domElement.className = "sortLabel";             
                f.setText(this.level.getSortIndex(this.getColumn()).toString())
            }
            var e = this.getIsLocked() ? this.getIsLeftLocked() ? a.getLeftLockedHeader() : a.getRightLockedHeader() : b;
            b = this.sortAscending ? this.level.createAscendingSortIcon() : this.level.createDescendingSortIcon();
            b.parent != a && (c.addChild(e, b), this.level.getEnableMultiColumnSort() && c.addChild(e, f));
            this.icon =
                b;
            this.level.getEnableMultiColumnSort() && (this.sortLabel = f);
            this.placeSortIcon()
        }
    };
    
flexiciousNmsp.FlexDataGridHeaderCell.prototype.placeSortIcon=function(){
	

	 if (this.icon) {
		 var pt=new flexiciousNmsp.Point(this.getWidth()-19,(this.getHeight()-37)/2);
	        pt= this.icon.parent.globalToLocal(this.localToGlobal(pt));
	        //pt.x += this.level.grid.getHorizontalScrollPosition();
	        this.icon.move(pt.getX(),pt.getY());
	        if(this.sortLabel && this.level.getEnableMultiColumnSort()){
	            var right=this.level.grid.headerSortSeparatorRight;
	            this.sortLabel.setWidth(this.level.grid.getStyle("multiColumnSortNumberWidth"));
	            this.sortLabel.setHeight(this.level.grid.getStyle("multiColumnSortNumberHeight"));
	            //pt=new flexiciousNmsp.Point(this.getWidth() - right+2, Math.max(0,((this.getHeight()-this.sortLabel.getHeight)/2)-1));
	            //pt= this.icon.parent.globalToLocal(this.localToGlobal(pt));
	            this.sortLabel.move(pt.getX()+5,pt.getY()-6);
	        }
     }
	 
	
	        
	    
	       
    
};

flexiciousNmsp.FlexDataGridHeaderCell.prototype.placeIcon = function(){
 if(!this.colIcon)
     {
         this.createColumnIcon();
        // this.colIcon.setSource(this.getIconUrl());         
         this.colIcon.domElement.className = "cellIcon";
         
         var pt=new flexiciousNmsp.Point(1,(this.getHeight())/2);
	        pt= this.colIcon.parent.globalToLocal(this.localToGlobal(pt));
	        //pt.x += this.level.grid.getHorizontalScrollPosition();
	        this.colIcon.move(pt.getX()-1,pt.getY());
	        
	        
         //this.colIcon.addEventListener(this,flexiciousNmsp.Constants.EVENT_CLICK, this.onFilterIconMouseClick);
     }
};

flexiciousNmsp.FlexDataGridHeaderCell.prototype.onSortLabelClick = function (b) {
     
       
    };
flexiciousNmsp.FlexDataGridHeaderCell.prototype.drawSortSeparator=function (){
    var  uiUtil = flexiciousNmsp.UIUtils, flxConstants = flexiciousNmsp.Constants;
    if(this.icon)
    {
        uiUtil.attachClass(this.icon.domElement,'flexiciousUnSelectableText')
    }
    if(this.level&&this.level.grid.getEnableSplitHeader()&&this.getColumn()&&this.getColumn().sortable){
        var right=this.level.grid.getHeaderSortSeparatorRight();
        if(!this.sortSeparator){
            this.sortSeparator = new flexiciousNmsp.UIComponent("span");
            uiUtil.addChild(this,this.sortSeparator);
        }
        this.sortSeparator.setActualSize(1,this.getHeight()-6);
        this.sortSeparator.move(18,3);
        this.sortSeparator.domElement.className="sortSeparator";
    }
    this.placeSortIcon();

};

flexiciousNmsp.FlexDataGridHeaderCell.prototype.getIconUrl=function (over){   
        return this.getGrid().imagesRoot+"/blank_transparent.png";
};



tableGridUtils.DynamicColumns_addColumn=function(dataField,headerText){
    var dgCol = new flexiciousNmsp.FlexDataGridColumn();    
    
    dgCol.setDataField(dataField);
    dgCol.setHeaderText(headerText);
    //because columns are having the same header text, we need to provide unique identifiers.
    dgCol.setUniqueIdentifier(headerText+""+tableGridUtils.DynamicColumns_counter++);
  
    return dgCol;
};

tableGridUtils.DynamicColumns_addCheckBoxColumn=function(dataField,headerText){
    var dgCol = new flexiciousNmsp.FlexDataGridCheckBoxColumn();
    dgCol.setDataField(dataField);
    dgCol.setHeaderText(headerText);
    //because columns are having the same header text, we need to provide unique identifiers.
    dgCol.setUniqueIdentifier(headerText+""+tableGridUtils.DynamicColumns_counter++);
  
    return dgCol;
};

var count=0;
var prevCol ;
var defaultSort;
var currentColName ;
tableGridUtils.lastColumnSorted="";

flexiciousNmsp.FlexDataGridContainerBase.prototype.onHeaderCellClicked = function(a,e,d){
	"undefined" == typeof d && (d = !1);
	if (this.grid.allowInteractivity) {
		var k = a.level,
		f = a.rowInfo.getData(),
		h = new flexiciousNmsp.FlexDataGridEvent(flexiciousNmsp.FlexDataGridEvent.HEADER_CLICKED, k.grid, k, a.getColumn(), a, null, e, !1, !0);
		this.dispatchEvent(h);
		k.dispatchEvent(h);
	}
},
tableGridUtils.addColumnIcon = function(cell,state){
	
	
	if(cell.getRowInfo().getIsDataRow()){
        return  cell.getRowInfo().rowPositionInfo.getRowIndex()%2==0?'images/plus.png':'images/minus.png';
    }
};

/**
* this function is used to enable or disable the filter row on the grid and it will automatically add the filter-enabled or filter-disabled images.
* You have to pass the column level of the grid and the filter tool of your window.
*/
tableGridUtils.enableDisableFilters = function(colLevel,tool){
	if(colLevel._enableFilters) {
		colLevel._enableFilters = false;
		if(tool){
			if(tool.hasClass("filter-enabled")){
				tool.removeClass("filter-enabled");
			}
			tool.addClass("filter-disabled");
		}
	} else {
		colLevel._enableFilters = true;
		if(tool){
			if(tool.hasClass("filter-disabled")){
				tool.removeClass("filter-disabled");
			}
			tool.addClass("filter-enabled");
		}
	}
};

tableGridUtils.ProgrammaticCellFormatting_getColumnBackground=function (cell){
   if(cell.getLevel().getSelectedKeys().indexOf(flexiciousNmsp.UIUtils.resolveExpression(cell.getRowInfo().getData(),cell.level.selectedKeyField)) >-1) {
        return grid.getStyle("selectionColor");
    }
    var val=flexiciousNmsp.UIUtils.resolveExpression(cell.getRowInfo().getData(),cell.getColumn().dataField);
    if(val<10000){
        return 0xFF0000;
    }else if(val>50000){
        return 0x0000FF;
    }
    else {
        return null;
    }
};

tableGridUtils.lassoShapeType = function(cell){
		var imagesUrl = "";
		if(cell.shapeType==1){//polygon
		imagesUrl = imagesUrl + '<span><img src="css/images/polygon.png"></span>';
		}
		if(cell.shapeType==2){//circle
		imagesUrl = imagesUrl + '<span><img src="css/images/circle.png"></span>';
		}
		if(cell.shapeType==3){//rectangle
		imagesUrl = imagesUrl + '<span><img src="css/images/rectangle.png"></span>';
		}

	return imagesUrl;
};
tableGridUtils.lassoOwnerNameisShared = function(cell){
		var imagesUrl = "";
		var ownerName="me";
		
		if(cell.createdBy==$si.viewer.userModel.userInfo.loginId)
		{
			if(cell.isShared){
				return imagesUrl=ownerName+'&nbsp;<span class="s-icon-container"><img src="css/images/hand-right.png"></span>';
			}else{
				return imagesUrl=ownerName;	
			}
		}else 
		{
		
		if(cell.userName === undefined){
			ownerName = cell.userLoginId;
		}else{
			ownerName = cell.userName;
		}
		
			if(cell.isShared){
				return imagesUrl=ownerName+'&nbsp;<span class="s-icon-container"><img src="css/images/hand-left.png"></span>';
			}else{
				return imagesUrl=ownerName;	
			}}
		
};

/**
 * check box renderer
 */
 
 tableGridUtils.checkboxModel = kendo.observable();
(function(window)
{
    "use strict";
    var CheckBoxRenderer, uiUtil = flexiciousNmsp.UIUtils, flxConstants = flexiciousNmsp.Constants;
    /**
     * A CheckBoxRenderer is a custom item renderer, that defines how to use custom cells with logic that you can control
     * @constructor
     * @namespace com.flexicious.controls
     * @extends UIComponent
     */
    CheckBoxRenderer=function(){
        //make sure to call constructor
        flexiciousNmsp.UIComponent.apply(this,["input"]);//second parameter is the tag name for the dom element.
        this.domElement.type = "checkbox"; //so our input element becomes a checkbox;
         this.domElement.checked =false;
        /**
         * This is a getter/setter for the data property. When the cell is created, it belongs to a row
         * The data property points to the item in the grids dataprovider that is being rendered by this cell.
         * @type {*}
         */
        this.data=null;

        //the add evt listener will basically proxy all DomEvents to your code to handle.
        this.addEventListener(this,flxConstants.EVENT_CHANGE,this.onChange);
    };
    tableGridUtils.ItemRenderers_CheckBoxRenderer = CheckBoxRenderer; //add to name space
    CheckBoxRenderer.prototype = new flexiciousNmsp.UIComponent(); //setup hierarchy
    CheckBoxRenderer.prototype.typeName = CheckBoxRenderer.typeName = 'CheckBoxRenderer';//for quick inspection
    CheckBoxRenderer.prototype.getClassNames=function(){
        return ["CheckBoxRenderer","UIComponent"]; //this is a mechanism to replicate the "is" and "as" keywords of most other OO programming languages
    };

    
  

    /**
     * This is important, because the grid looks for a "setData" method on the renderer.
     * In here, we intercept the call to setData, and inject our logic to populate the text input.
     * @param val
     */
    CheckBoxRenderer.prototype.setData=function(val){
        flexiciousNmsp.UIComponent.prototype.setData.apply(this,[val]);
        var cell = this.parent; //this is an instance of FlexDataGridDataCell (For data rows)
        var column = cell.getColumn();//this is an instance of FlexDataGridColumn.
        this.domElement.checked=this.data[column.getDataField()];
    };
    /**
     * This event is dispatched when the user clicks on the icon. The event is actually a flexicious event, and has a trigger event
     * property that points back to the original domEvent.
     * @param event
     */
    CheckBoxRenderer.prototype.onChange=function(evt){

        //in the renderer, you have the handle to the cell that the renderer belongs to, via the this.parent property that you inherit from flexiciousNmsp.UIComponent.

        var cell = this.parent; //this is an instance of FlexDataGridDataCell (For data rows)
        var column = cell.getColumn();//this is an instance of FlexDataGridColumn.
		var $this= this;
        this.data[column.getDataField()]=this.domElement.checked;//we use the dom element to wire back the value to the data object.
       
     
      $($si.tableGridUtils.checkboxModel).trigger("checkboxChange",{data:$this});
								        
								             
        
    };
    //This sets  the inner html, and grid will try to set it. Since we are an input field, IE 8 will complain. So we ignore it since we dont need it anyway.
    CheckBoxRenderer.prototype.setText=function(val){

    };
}(window));




(function(window)
{
	
	var pageAction= [];
    var PagerControl=function(){
        flexiciousNmsp.UIComponent.apply(this,["span"]);
        this.addEventListener(this,flxConstants.EVENT_CLICK,
            function(e){
                if(e.triggerEvent.target.className.indexOf('toolbarButtonIconCell')>=0){
                    if(e.triggerEvent.target.className.indexOf('disabled')>=0)return;
                    var children = uiUtil.adapter.findElementsWithClassName(this.domElement,"toolbarButtonIconCell");
                    var actionIdx = children.indexOf(e.triggerEvent.target);
                    var action = this.grid.toolbarActions[actionIdx];
                    this.grid.runToolbarAction(action,e.triggerEvent.target,this);
                }
            }
        );
        uiUtil.attachClass(this.domElement,"flexiciousGridPager");

        this._pageIndex = 0;
        this._totalRecords=0;
        this._pageSize=10;

        this.level=null;
        this.rowInfo=null;
        this.grid=null;
    };
    var p = PagerControl.prototype= new flexiciousNmsp.UIComponent();
    p.typeName=PagerControl.typeName="PagerControl";
    var uiUtil=flexiciousNmsp.UIUtils;
    var flxConstants=flexiciousNmsp.Constants;
    p.getClassNames=function(){
        return ["PagerControl","UIComponent","IExtendedPager"];
    };
   
    p.doDispatchEvents=true;
   
    p.getPageSize=function()
    {
        return this._pageSize;
    };
    
    p.setPageSize=function (val)
    {
        this._pageSize=val;
    };

    p.getPageIndex=function()
    {
        return this._pageIndex;
    };
    
    p.setPageIndex=function (val){
        if(this._pageIndex != val){
            this._pageIndex = val;
            this.onPageChanged();
            this.dispatchEvent(new flexiciousNmsp.FlexDataGridEvent("pageIndexChanged"));
        }
    };
  
    p.setTotalRecords=function(val){
        this._totalRecords = val;
        this.setPageIndex(0);
        this.dispatchEvent( new flexiciousNmsp.FlexDataGridEvent("reset"));
        this.refresh();
    };
    
    p.getTotalRecords=function (){
        return this._totalRecords;
    };
    
    p.onImgPageNumberClick=function(evt){
    	if(evt){
    		var target = evt.currentTarget || evt.srcElement; 
			var topParent = target.parentNode.parentNode;
    		if(target.parentNode.parentNode){
				var childrenList = target.parentNode.parentNode.children;
				for(var i=0;i<childrenList.length;i++){
					if(childrenList[i].children.length > 0){
						childrenList[i].children[0].style.fontWeight = "";
					}
				}
			}
			target.style.fontWeight = "bold";          
			this._pageIndex = parseInt(target.innerHTML)-1;
    		this.onPageChanged();
			this.updateDisplayList(topParent.clientWidth,topParent.clientHeight);
    	}
    };

    /**
     * Default handler for the First Page Navigation Button
     */
    p.onImgFirstClick=function(evt){
    	if(evt){
    		var target = evt.currentTarget || evt.srcElement; 
			var topParent = target.parentNode.parentNode;
    		if(target.parentNode.parentNode){
				var childrenList = target.parentNode.parentNode.children;
				for(var i=0;i<childrenList.length;i++){
					if(childrenList[i].children.length > 0){
						childrenList[i].children[0].style.fontWeight = "";
					}
				}
			}
    	}
    	this._pageIndex = 0;
        this.onPageChanged();
    	this.updateDisplayList(topParent.clientWidth,topParent.clientHeight);
    };
    /**
     * Default handler for the Previous Page Navigation Button
     */
    p.onImgPreviousClick=function(evt){
    	if(evt){
			var target = evt.currentTarget || evt.srcElement; 
			var topParent = target.parentNode.parentNode;
			var pageIndex = this.getPageIndex() + 1;
			var nextPageIndex = pageIndex - 1;
    		if(topParent){
				var item = topParent.getElementsByClassName("myPage"+pageIndex);
				var nextItem = topParent.getElementsByClassName("myPage"+nextPageIndex);
				if(item && nextItem && item[0] && nextItem[0]){
					if(item[0].children && nextItem[0].children && item[0].children[0] && nextItem[0].children[0]){
						item[0].children[0].style.cssText = "margin: 3px; text-decoration: underline;";
						nextItem[0].children[0].style.cssText = "margin: 3px; text-decoration: underline;font-weight:bold";
					}
				}
			}
		}
        if(this._pageIndex > 0)
        {
            this._pageIndex--;
            this.onPageChanged();
        }
        this.updateDisplayList(topParent.clientWidth,topParent.clientHeight);

    };
    /**
     * Default handler for the Next Page Navigation Button
     */
    p.onImgNextClick=function(evt){
    	if(evt){
			var target = evt.currentTarget || evt.srcElement; 
			var topParent = target.parentNode.parentNode;
			var pageIndex = this.getPageIndex() + 1;
			var nextPageIndex = pageIndex + 1;
    		if(topParent){
				var item = topParent.getElementsByClassName("myPage"+pageIndex);
				var nextItem = topParent.getElementsByClassName("myPage"+nextPageIndex);
				if(item && nextItem && item[0] && nextItem[0]){
					if(item[0].children && nextItem[0].children && item[0].children[0] && nextItem[0].children[0]){
						item[0].children[0].style.cssText = "margin: 3px; text-decoration: underline;";
						nextItem[0].children[0].style.cssText = "margin: 3px; text-decoration: underline;font-weight:bold";
					}
				}
			}
		}
        if(this._pageIndex < this.getPageCount()-1)
        {
            this._pageIndex++;
            this.onPageChanged();
        }
        this.updateDisplayList(topParent.clientWidth,topParent.clientHeight);

    };
    /**
     * Default handler for the Last Page Navigation Button
     */
    p.onImgLastClick=function(evt){
    	if(evt){
			var target = evt.currentTarget || evt.srcElement; 
			var topParent = target.parentNode.parentNode;
			var count = this.getPageCount();
    		if(topParent){
    			for(var i=0;i<count;i++){
    				var item = topParent.getElementsByClassName("myPage"+i);
    				if(item && item[0]){
    					if(item[0].children && item[0].children[0]){
    						item[0].children[0].style.cssText = "margin: 3px; text-decoration: underline;";
    					}
    				}
    			}
				var item = topParent.getElementsByClassName("myPage"+count);
				if(item && item[0]){
					if(item[0].children && item[0].children[0]){
						item[0].children[0].style.cssText = "margin: 3px; text-decoration: underline;font-weight:bold";
					}
				}
			}
		}
        if(this._pageIndex < this.getPageCount()-1){
            this._pageIndex = this.getPageCount()-1;
            this.onPageChanged();
        }
        this.updateDisplayList(topParent.clientWidth,topParent.clientHeight);

    };
    /**
     * Default handler for the Page Change Combo Box
     */
    p.onPageCbxChange=function(evt){
    	
        this._pageIndex = parseInt(evt.target.value)-1;
       
        this.onPageChanged();

    };
    
    /**
     * Default handler for the Page Change Event
     */
    p.onPageChanged=function(){
        if(this.getPageDropdown() && (this.getPageDropdown().selectedIndex != (this._pageIndex)))
        {
            this.getPageDropdown().selectedIndex=this._pageIndex;
        }
        if(this.doDispatchEvents)
            this.dispatchEvent(new flexiciousNmsp.ExtendedFilterPageSortChangeEvent(flexiciousNmsp.ExtendedFilterPageSortChangeEvent.PAGE_CHANGE));
    };

    p.onCreationComplete=function(evt){
        //btnSettings.visible=btnSettings.includeInLayout=_grid.enablePreferencePersistence;
        if(this.grid.enableToolbarActions){
            //this.grid.toolbarActions.addEventListener(flexiciousNmsp.ArrayCollection.EVENT_COLLECTION_CHANGE,this.onToolbarActionsChanged);
            this.grid.addEventListener(flexiciousNmsp.FlexDataGridEvent.CHANGE,this.onGridSelectionChange);
            this.createToolbarActions();
        }
    };
    /**
     * Sets the page index to 1(0), dispatches the reset event.
     */
    p.reset=function(){
        this._pageIndex=0;
        this.getPageDropdown().selectedIndex=0;
        this.dispatchEvent(new flexiciousNmsp.FlexDataGridEvent("reset"));
    };
    
    p.getPageStart=function(){
        return this._totalRecords==0?0:((this._pageIndex)*this._pageSize)+1;

    };
    p.getPageEnd=function(){
    	//Return total Records in case Page size is 0
    	if(this._pageSize == 0){
			return this._totalRecords;
		}
        var val= (this._pageIndex+1)*this._pageSize;
        return (val>this._totalRecords)?this._totalRecords:val;

    };
    p.getPageCount=function(){
    	//Return page count as 1 in case Page size is 0
        return this.getPageSize()>0?Math.ceil(this.getTotalRecords()/this.getPageSize()):1;
    };

    
    /**
     * Default handler for the Word Export Button. Calls
     * ExtendedExportController.instance().doexport(this.grid,ExportOptions.create(ExportOptions.DOC_EXPORT))
     */
    p.onWordExport=function(){
        this.grid.toolbarWordHandlerFunction();

    };
    /**
     * Default handler for the Word Export Button. Calls
     * ExtendedExportController.instance().doexport(this.grid,ExportOptions.create())
     */
    p.onExcelExport=function(){
        this.grid.toolbarExcelHandlerFunction();

    };
    /**
     * Default handler for the Print Button. Calls
     * var po:PrintOptions=PrintOptions.create();
     * po.printOptionsViewrenderer = new ClassFactory(ExtendedPrintOptionsView);
     * ExtendedPrintController.instance().print(this.grid,po)
     */
    p.onPrint=function(){
        this.grid.toolbarPrintHandlerFunction();

    };
    /**
     * Default handler for the Print Button. Calls
     * var po:PrintOptions=PrintOptions.create(true);
     * po.printOptionsViewrenderer = new ClassFactory(ExtendedPrintOptionsView);
     * ExtendedPrintController.instance().print(this.grid,po)
     */
    p.onPdf=function(){
        this.grid.toolbarPdfHandlerFunction();

    };
    /**
     * Default handler for the Clear Filter Button.
     * Calls grid.clearFilter()
     */
    p.onClearFilter=function(){
        this.grid.clearFilter()

    };
    /**
     * Default handler for the Process Filter Button.
     * Calls grid.processFilter()
     */
    p.onProcessFilter=function(){
        this.grid.processFilter();

    };
    /**
     * Default handler for the Show Hide Filter Button.
     * Calls this.grid.filterVisible=!this.grid.filterVisible;nestedGrid.placeSections()
     */
    p.onShowHideFilter=function(){
        this.grid.setFilterVisible(!this.grid.getFilterVisible());
        this.grid.rebuild()
    };
    /**
     * Default handler for the Show Hide Filter Button.
     * Calls this.grid.filterVisible=!this.grid.filterVisible;nestedGrid.placeSections()
     */
    p.onShowHideFooter=function(){
        this.grid.footerVisible=!this.grid.footerVisible;this.grid.placeSections()
    };
    /**
     * Default handler for the Settings Popup
     * Calls var popup:SaveSettingsPopup=new SaveSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
     */
    p.onShowSettingsPopup=function(){
        var popup=this.grid.popupFactorySettingsPopup.newInstance();
        popup.setGrid(this.grid);
        uiUtil.addPopUp(popup,this.grid,false,null,"Settings");
    };

    /**
     * Default handler for the OPen Settings Popup
     * Calls var popup:OpenSettingsPopup=new OpenSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
     */
    p.onOpenSettingsPopup=function(){
        var popup=this.grid.popupFactoryOpenSettingsPopup.newInstance();
        popup.setGrid(this.grid);
        uiUtil.addPopUp(popup,this.grid,false,null,"Open Settings");
    };

    /**
     * Default handler for the Save Settings Popup
     * Calls var popup:SaveSettingsPopup=new SaveSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
     */
    p.onSaveSettingsPopup=function(){
        var popup=this.grid.popupFactorySaveSettingsPopup.newInstance();
        popup.setGrid(this.grid);
        uiUtil.addPopUp(popup,this.grid,false,null,"Save Settings");
    };
    p.createToolbarActions=function (){

    };

    p.onToolbarActionsChanged=function (event){
        this.createToolbarActions();
    };

    p.onGridSelectionChange=function (event){

    };

    p.toolbarActionFilterFunction=function (item){
        return item.level==this.level.getNestDepth() || item.level==-1;

    };

    p.getPageDropdown=function(){
        return uiUtil.adapter.findElementWithClassName(this.domElement,"pageDropdown");
    };
    p.destroy=function(){
        this.destroyButtons([
            PagerControl.ACTION_FIRST_PAGE,
            PagerControl.ACTION_PREV_PAGE,
            PagerControl.ACTION_NEXT_PAGE,
            PagerControl.ACTION_LAST_PAGE,
            PagerControl.ACTION_SORT,
            PagerControl.ACTION_SETTINGS,
            PagerControl.ACTION_SAVE_SETTINGS,
            PagerControl.ACTION_FILTER_SHOW_HIDE,
            PagerControl.ACTION_RUN_FILTER,
            PagerControl.ACTION_CLEAR_FILTER,
            PagerControl.ACTION_PRINT,
            PagerControl.ACTION_PDF,
            PagerControl.ACTION_WORD,
            PagerControl.ACTION_EXCEL
        ]);
        var pageDropDown=this.getPageDropdown();
        if(pageDropDown){
            pageDropDown.pagerControl=null;
            uiUtil.removeDomEventListener(this.getPageDropdown(),"change",onPageDropdownChange)
        }
    };


    p.addToolbarActionsHTML=function () {
        var html="";
        for (var i = 0; i < this.grid.toolbarActions.length; i++) {
            var tca = this.grid.toolbarActions[i];
            html+=(tca.seperatorBefore?"<span  class='pagerDiv separatorCell'>|</span>":"");
            html+=("<span valign='middle' class='pagerDiv iconCell toolbarButtonIconCell'  title='"+tca.tooltip+"'" + (tca.iconUrl?"style='background: transparent url(" + tca.iconUrl + ") no-repeat left center;padding-left:20px' >":">")+ tca.name +  "</span>");
            html+=(tca.seperatorAfter?"<span  class='pagerDiv separatorCell'>|</span>":"")
        }
        return html;
    };
    var count;
    var index;
    var paginationWidth;
    flexiciousNmsp.StyleDefaults.defaults.displayOrder="header,filter,body,footer,pager";
    p.updateDisplayList=function(w,h){
    	var startControls = false;
    	var endControls = false;
    	count = this.getPageCount();
    	index = this.getPageIndex()+1;
    	//initial size is equal to four buttons
    	paginationWidth = 102;
    	var linkStr = "";
		var pageInfo=uiUtil.adapter.findElementWithClassName(this.domElement,'pageInfo');
		if(pageInfo){
		    paginationWidth+=pageInfo.clientWidth;	
		}
		var itemsPossible = 0;
		for(var i=0;i<count;i++){
			if(paginationWidth < w-50){
				itemsPossible++;
			}
			if(i < 10){
				paginationWidth+=13;
			}else{
				paginationWidth+=20;
			}
		}
		itemsPossible = itemsPossible == 0 ? 1 : itemsPossible;
		var startIndex = 1;
		var endIndex = itemsPossible;
		if(itemsPossible < count){
			if(index > 0 && (index - (itemsPossible/2) > 0)){
				startIndex = Math.ceil(index - (itemsPossible/2));
				endIndex = Math.floor(index + (itemsPossible/2));
			}
		}
		if(endIndex > count){
			startIndex = startIndex - endIndex + count;
			endIndex = count;
		}
		if(startIndex > 1){
			if(itemsPossible > 1){
				var extraWidth;
				var extraElements;
				var extraElementsEachSide;
				if(startIndex < 10){
					extraWidth = startIndex * 7;
				}else if(startIndex >= 10 && startIndex <= 99){
					extraWidth = 80;
				}else{
					extraWidth = 100;
				}
				extraElements = Math.ceil(extraWidth/20);
				extraElementsEachSide = Math.ceil(extraElements/2);
				if(index == count || (count - index <= extraElementsEachSide)){
					startIndex = startIndex + extraElements;
				}else{
					startIndex = startIndex + extraElementsEachSide;
					endIndex = endIndex - extraElementsEachSide;
				}
			}
			startControls = true;
			linkStr=linkStr+". .";
			
		}
    	for(var ind=startIndex;ind<=endIndex;ind++){
    		if(ind == index){
    			linkStr=linkStr+"<span  class='pagerDiv iconCell myPage"+ind+"'><a class='imageButtonMyPage"+ind+"' id='imageButtonMyPage"+ind+"' style='margin: 3px;text-decoration: underline;font-weight: bold '>"+ind+"</a></span>";
    		}else{
    			linkStr=linkStr+"<span  class='pagerDiv iconCell myPage"+ind+"'><a class='imageButtonMyPage"+ind+"' id='imageButtonMyPage"+ind+"' style='margin: 3px;text-decoration: underline '>"+ind+"</a></span>";
    		}
    	}
    	if(endIndex < count){
    		linkStr=linkStr+". .";
    		endControls = true;
    	}
    	
        this.destroy();
        var html="<span class='pagerTable' style='float: left;height:"+this.getHeight()+"px;width:"+w+"px'>" +
            (this.level.enablePaging?"<span  class='pagerDiv pageInfo'></span>" :"")+
            //(this.level.enablePaging?"<span  class='pagerDiv toolbarButtonDiv'>|</span>":"")+
           		(this.level.enablePaging && startControls ?"<span  class='pagerDiv iconCell firstPage'><img alt='First Page' tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/firstPage.png' class='imageButtonFirstPage' alt='"+flxConstants.PGR_BTN_FIRST_PAGE_TOOLTIP+"' title='"+flxConstants.PGR_BTN_FIRST_PAGE_TOOLTIP+"'></span>":"")+
            	(this.level.enablePaging && startControls ?"<span  class='pagerDiv iconCell prevPage'><img alt='Previous Page' tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/prevPage.png' class='imageButtonPrevPage' alt='"+flxConstants.PGR_BTN_PREV_PAGE_TOOLTIP+"' title='"+flxConstants.PGR_BTN_PREV_PAGE_TOOLTIP+"'></span>":"")+
            linkStr+
            	(this.level.enablePaging && endControls ?"<span  class='pagerDiv iconCell nextPage'><img alt='Next Page' tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/nextPage.png' class='imageButtonNextPage' alt='"+flxConstants.PGR_BTN_NEXT_PAGE_TOOLTIP+"' title='"+flxConstants.PGR_BTN_NEXT_PAGE_TOOLTIP+"'></span>":"")+
            	(this.level.enablePaging && endControls ?"<span  class='pagerDiv iconCell lastPage' style='margin-right:30px'><img alt='Last Page' tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/lastPage.png' class='imageButtonLastPage' alt='"+flxConstants.PGR_BTN_LAST_PAGE_TOOLTIP+"' title='"+flxConstants.PGR_BTN_LAST_PAGE_TOOLTIP+"'></span>":"")+
           // (this.level.enablePaging?"<span  class='pagerDiv separatorCell'>|</span>":"")+
           /* (this.level.enablePaging?"<span  class='pagerDiv iconCell gotoPage'>"+flexiciousNmsp.Constants.PGR_LBL_GOTO_PAGE_TEXT+" <select class='pageDropdown'> </select> </span>":"")+
            (this.level.enablePaging?"<span  class='pagerDiv separatorCell'>|</span>":"")+*/
            "</span>";
        html+="<span class='pagerTable' style='float: right;height:"+this.getHeight()+"px'>" +
            this.addToolbarActionsHTML() ;

       if(this.level.getNestDepth()==1){
            html+=/*(this.grid.enableDrillDown?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/collapseOne.png' class='imageButtonExpandUp' alt='"+flxConstants.PGR_BTN_EXP_ONE_UP_TOOLTIP+"' title='"+flxConstants.PGR_BTN_EXP_ONE_UP_TOOLTIP+"'></span>":"")+
                (this.grid.enableDrillDown?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/expandOne.png' class='imageButtonExpandDown' alt='"+flxConstants.PGR_BTN_EXP_ONE_DOWN_TOOLTIP+"' title='"+flxConstants.PGR_BTN_EXP_ONE_DOWN_TOOLTIP+"'></span>":"")+
                (this.grid.enableDrillDown?"<span  class='pagerDiv  separatorCell'>|</span>":"")+
                (this.grid.enableDrillDown?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/collapseAll.png' class='imageButtonCollapseAll' alt='"+flxConstants.PGR_BTN_COLLAPSE_ALL_TOOLTIP+"' title='"+flxConstants.PGR_BTN_COLLAPSE_ALL_TOOLTIP+"'></span>":"")+
                (this.grid.enableDrillDown?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/expandAll.png' class='imageButtonExpandAll' alt='"+flxConstants.PGR_BTN_EXP_ALL_TOOLTIP+"' title='"+flxConstants.PGR_BTN_EXP_ALL_TOOLTIP+"'></span>":"")+
                (this.grid.enableDrillDown?"<span  class='pagerDiv  separatorCell'>|</span>":"")+

                (this.grid.enableMultiColumnSort?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/sort.png' class='imageButtonSort' alt='"+flxConstants.PGR_BTN_SORT_TOOLTIP+"' title='"+flxConstants.PGR_BTN_SORT_TOOLTIP+"'></span>":"")+
                (this.grid.enableMultiColumnSort?"<span  class='pagerDiv  separatorCell'>|</span>":"")+
                (this.grid.enablePreferencePersistence?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/settings.png' class='imageButtonSettings' alt='"+flxConstants.PGR_BTN_SETTINGS_TOOLTIP+"' title='"+flxConstants.PGR_BTN_SETTINGS_TOOLTIP+"'></span>":"")+
                (this.grid.enablePreferencePersistence?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/openSettings.png' class='imageButtonOpenSettings' alt='"+flxConstants.PGR_BTN_OPEN_SETTINGS_TOOLTIP+"' title='"+flxConstants.PGR_BTN_OPEN_SETTINGS_TOOLTIP+"'></span>":"")+
                (this.grid.enablePreferencePersistence?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/saveSettings.png' class='imageButtonSaveSettings' alt='"+flxConstants.PGR_BTN_SAVE_SETTINGS_TOOLTIP+"' title='"+flxConstants.PGR_BTN_SAVE_SETTINGS_TOOLTIP+"'></span>":"")+
                (this.grid.enablePreferencePersistence?"<span  class='pagerDiv  separatorCell'>|</span>":"")+
                (this.level.getEnableFilters()?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/filterShowHide.png' class='imageButtonFilterShowHide' alt='"+flxConstants.PGR_BTN_FILTER_TOOLTIP+"' title='"+flxConstants.PGR_BTN_FILTER_TOOLTIP+"r'></span>":"")+
                (this.level.getEnableFilters()?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/filter.png' class='imageButtonFilter' alt='"+flxConstants.PGR_BTN_RUN_FILTER_TOOLTIP+"' title='"+flxConstants.PGR_BTN_RUN_FILTER_TOOLTIP+"'></span>":"")+
                (this.level.getEnableFilters()?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/clearFilter.png' class='imageButtonClearFilter' alt='"+flxConstants.PGR_BTN_CLEAR_FILTER_TOOLTIP+"' title='"+flxConstants.PGR_BTN_CLEAR_FILTER_TOOLTIP+"'></span>":"")+
                (this.level.getEnableFilters()?"<span  class='pagerDiv  separatorCell'>|</span>":"")+
                (this.grid.enablePrint?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/print.png' class='imageButtonPrint' alt='"+flxConstants.PGR_BTN_PRINT_TOOLTIP+"' title='"+flxConstants.PGR_BTN_PRINT_TOOLTIP+"'></span>":"")+
                //(this.grid.enablePdf?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/pdf.png' class='imageButtonPdf' alt='"+flxConstants.PGR_BTN_PDF_TOOLTIP+"' title='"+flxConstants.PGR_BTN_PDF_TOOLTIP+"'></span>":"")+
                (this.grid.enablePrint||this.level.enablePdf?"<span  class='pagerDiv  separatorCell'>|</span>":"")+*/
              /*  (this.grid.enableExport?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/word.png' class='imageButtonWord' alt='"+flxConstants.PGR_BTN_WORD_TOOLTIP+"' title='"+flxConstants.PGR_BTN_WORD_TOOLTIP+"'></span>":"")+
                (this.grid.enableExport?"<span  class='pagerDiv  iconCell'><img tabindex='0' src='" + flexiciousNmsp.Constants.IMAGE_PATH + "/export.png' class='imageButtonExcel' alt='"+flxConstants.PGR_BTN_EXCEL_TOOLTIP+"' title='"+flxConstants.PGR_BTN_EXCEL_TOOLTIP+"'></span>":"")+
                (this.grid.enableExport?"<div class='pagerDiv  '>|</span>":"")+*/
                "</span>";

        };
        this.setInnerHTML(html);
        
        for(var i=1;i<=count;i++){
        	pageAction[i-1] = "myPage"+i;
        }
        
        this.initializeButtons(pageAction,[                                          
            PagerControl.ACTION_FIRST_PAGE,
            PagerControl.ACTION_PREV_PAGE,
            PagerControl.ACTION_NEXT_PAGE,
            PagerControl.ACTION_LAST_PAGE,
            PagerControl.ACTION_SORT,
            PagerControl.ACTION_SETTINGS,
            PagerControl.ACTION_OPEN_SETTINGS,
            PagerControl.ACTION_SAVE_SETTINGS,
            PagerControl.ACTION_OPEN_SETTINGS,
            PagerControl.ACTION_FILTER_SHOW_HIDE,
            PagerControl.ACTION_RUN_FILTER,
            PagerControl.ACTION_CLEAR_FILTER,
            PagerControl.ACTION_PRINT,
            PagerControl.ACTION_PDF,
            PagerControl.ACTION_WORD,
            PagerControl.ACTION_EXCEL,
            PagerControl.ACTION_EXPAND_UP,
            PagerControl.ACTION_EXPAND_ALL,
            PagerControl.ACTION_EXPAND_DOWN,
            PagerControl.ACTION_COLLAPSE_ALL
        ]);
       /* if(this.level.enablePaging){
            this.getPageDropdown().pagerControl=this;
            uiUtil.addDomEventListener(this,this.getPageDropdown(),"change",onPageDropdownChange)
        }*/
        this.refresh();
        flexiciousNmsp.UIComponent.prototype.updateDisplayList.apply(this,[w,h]);

    };
    p.enableDisableButton=function(button, enabled) {
        button.enabled = enabled;
        if (!button.enabled){
            uiUtil.attachClass(button, "disabled")
            var img = uiUtil.adapter.findFirstElementByTagName(button,"IMG");
            if(img){
                uiUtil.detachClass(img, "over");
                //this.grid.domElement.focus();
            }
        }
        else
            uiUtil.detachClass(button, "disabled")
    };
    p.rebuild=function(){
        this.invalidateDisplayList();
    };
    p.refresh=function(){
        var children = uiUtil.adapter.findElementsWithClassName(this.domElement,"toolbarButtonIconCell");
        for (var i = 0; i < children.length; i++) {
            var button = children[i];
            var action=this.grid.toolbarActions[i];
            this.enableDisableButton(button, this.grid.isToolbarActionValid(action, button, this));
            var iconUrl=action.iconUrl;
            if(!button.enabled && action.disabledIconUrl){
                iconUrl=action.disabledIconUrl;
            }
            button.style.background="background: transparent url(" + iconUrl + ") no-repeat left center";
        }

        var pageInfo=uiUtil.adapter.findElementWithClassName(this.domElement,'pageInfo');
        if(pageInfo){
        	pageInfo.style.width = "auto";
            pageInfo.innerHTML="Rows: "+this.getPageStart()+" - "+this.getPageEnd()+" out of "+this.getTotalRecords();
        }
        
        var gotoPage = uiUtil.adapter.findElementWithClassName(this.domElement,'myPage');
  
        /*if(gotoPage)
            this.enableDisableButton(gotoPage, this.getPageIndex()>0);*/
        /*var prevPage = uiUtil.adapter.findElementWithClassName(this.domElement,'prevPage');
        if(prevPage)
            this.enableDisableButton(prevPage, this.getPageIndex()>0);
        var nextPage = uiUtil.adapter.findElementWithClassName(this.domElement,'nextPage');
        if(nextPage)
            this.enableDisableButton(nextPage, this.getPageIndex() < (this.getPageCount()-1));
        var lastPage = uiUtil.adapter.findElementWithClassName(this.domElement,'lastPage');
        if(lastPage)
            this.enableDisableButton(lastPage, this.getPageIndex() < (this.getPageCount()-1));*/
        
        if(this.getPageDropdown()){
            var options="";
            for(var i=1;i<=this.getPageCount();i++){
                options+="<option value="+i+" " + ((this.getPageIndex()+1==i)?'selected':'') + ">"+i+"</option>"
            }
            this.getPageDropdown().innerHTML=options;
        }
    };
    
    //PagerControl.MY_PAGE = "myPage";   
    PagerControl.ACTION_FIRST_PAGE="firstPage";
    PagerControl.ACTION_PREV_PAGE="prevPage";
    PagerControl.ACTION_NEXT_PAGE="nextPage";
    PagerControl.ACTION_LAST_PAGE="lastPage";
    PagerControl.ACTION_SORT="sort";
    PagerControl.ACTION_SETTINGS="settings";
    PagerControl.ACTION_OPEN_SETTINGS="openSettings";
    PagerControl.ACTION_SAVE_SETTINGS="saveSettings";
    PagerControl.ACTION_FILTER_SHOW_HIDE="filterShowHide";
    PagerControl.ACTION_RUN_FILTER="filter";
    PagerControl.ACTION_CLEAR_FILTER="clearFilter";
    PagerControl.ACTION_PRINT="print";
    PagerControl.ACTION_PDF="pdf";
    PagerControl.ACTION_WORD="word";
    PagerControl.ACTION_EXCEL="excel";
    PagerControl.ACTION_EXPAND_DOWN="expandDown";
    PagerControl.ACTION_EXPAND_UP="expandUp";
    PagerControl.ACTION_EXPAND_ALL="expandAll";
    PagerControl.ACTION_COLLAPSE_ALL="collapseAll";

    var imageButtonMouseOver=function(evt){
        var target = evt.currentTarget || evt.srcElement;
        if(target.parentNode.className.indexOf("disabled")>=0)return;
        if(target.className.indexOf("over")==-1)target.className="over";
    }
    var imageButtonMouseOut=function(evt){
        var target = evt.currentTarget || evt.srcElement;
        if(target.parentNode.className.indexOf("disabled")>=0)return;
        if(target.className.indexOf("over")!=-1)target.className=target.className.replace("over","");
    };
    var imageButtonClick=function(evt){
    	//console.log('ggg '+evt.currentTarget);
        var target = evt.currentTarget || evt.srcElement;
        if(target.parentNode.className.indexOf("disabled")>=0)return;
        target.pagerControl.processAction(target.code,evt);
    };
    var onPageDropdownChange=function(evt){
        var target = evt.currentTarget || evt.srcElement;
        var pageIndex = target.value;
        var pagerControl= target.pagerControl;
        pagerControl.setPageIndex(parseInt(target.value)-1);
    };

    p.destroyButtons=function(arr){
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            var img=uiUtil.adapter.findElementWithClassName(this.domElement,"imageButton"+uiUtil.doCap(obj));
            
            if(img){
                img.code=obj;
                uiUtil.removeDomEventListener(img,"mouseover",imageButtonMouseOver)
                uiUtil.removeDomEventListener(img,"mouseout",imageButtonMouseOut)
                uiUtil.removeDomEventListener(img,"click",imageButtonClick);
                img.pagerControl=null;
            }
        }
    }
    
    p.initializeButtons=function(arr1,arr2){
    	var arr = arr1.concat(arr2);
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            var img=uiUtil.adapter.findElementWithClassName(this.domElement,"imageButton"+uiUtil.doCap(obj));
            if(img){
                img.code=obj;
                uiUtil.addDomEventListener(this,img,"mouseover",imageButtonMouseOver)
                uiUtil.addDomEventListener(this,img,"mouseout",imageButtonMouseOut)
                uiUtil.addDomEventListener(this,img,"click",imageButtonClick)
                img.pagerControl=this;
            }
        }
    }

    p.processAction=function(code,e){  
    	if(code==PagerControl.ACTION_FIRST_PAGE){
        	 this.onImgFirstClick(e);    		  
        }else if(code==PagerControl.ACTION_PREV_PAGE){
            this.onImgPreviousClick(e);
        }else if(code==PagerControl.ACTION_NEXT_PAGE){
            this.onImgNextClick(e);
        }else if(code==PagerControl.ACTION_LAST_PAGE){
            this.onImgLastClick(e);
        }else if(code==PagerControl.ACTION_SETTINGS){
            this.onShowSettingsPopup();
        }else if(code==PagerControl.ACTION_OPEN_SETTINGS){
            this.onOpenSettingsPopup();
        }else if(code==PagerControl.ACTION_SAVE_SETTINGS){
            this.onSaveSettingsPopup();
        }else if(code==PagerControl.ACTION_CLEAR_FILTER){
            this.onClearFilter();
        }else if(code==PagerControl.ACTION_EXCEL){
            this.onExcelExport();
        }else if(code==PagerControl.ACTION_FILTER_SHOW_HIDE){
            this.onShowHideFilter();
        }else if(code==PagerControl.ACTION_PDF){
            this.onPdf();
        }else if(code==PagerControl.ACTION_PRINT){
            this.onPrint();
        }else if(code==PagerControl.ACTION_RUN_FILTER){
            this.onProcessFilter();
        }else if(code==PagerControl.ACTION_SORT){
            this.grid.multiColumnSortShowPopup();
        }else if(code==PagerControl.ACTION_WORD){
            this.onWordExport();
        }else if(code==PagerControl.ACTION_EXPAND_ALL){
            this.grid.expandAll();
        }else if(code==PagerControl.ACTION_EXPAND_UP){
            this.grid.expandUp();
        }else if(code==PagerControl.ACTION_EXPAND_DOWN){
            this.grid.expandDown();
        }else if(code==PagerControl.ACTION_COLLAPSE_ALL){
            this.grid.collapseAll();
        }else{
        	this.onImgPageNumberClick(e);
        }

        this.refresh();
    };
    /**
     * Initializes the auto complete and watermark plugins
     */
    p.initialize=function(){
        flexiciousNmsp.UIComponent.prototype.initialize.apply(this);
        this.grid.addEventListener(this,flexiciousNmsp.FlexDataGrid.EVENT_CHANGE,this.refresh);
    };
    p.kill=function(){
        if(this.dead)return;
        this.destroy();

        flexiciousNmsp.UIComponent.prototype.kill.apply(this);
        this.level=null;
        this.rowInfo=null;
        this.grid=null;
    };
    tableGridUtils.PagerControl = PagerControl;
}(window));


(function () {
    var multiSelectComboBoxRenderer, c = flexiciousNmsp.UIUtils,
        d = flexiciousNmsp.Constants;
    multiSelectComboBoxRenderer = function (b) {
        flexiciousNmsp.TextInput.apply(this, [b]);
        this.registered = this.hasSearch = !1;
        this.filterComparisionType = "auto";
        this.filterOperation = this.searchField = null;
        this.filterTriggerEvent = "change";
        this.gridColumn = this.grid = null;
        this.selectedValues = [];
        this.highlightedRowIndex = -1;
        this.outsideIcon = d.IMAGE_PATH + "/downArrowIcon.png";
        this.iconHeight = 19;
        this.iconWidth = 16;
        this.dataField = "data";
        this.dropdownWidth = -1;
        this.labelField = "label";
        this.labelFunction = null;
        this.addAllItemText = d.DEFAULT_ALL_ITEM_TEXT;
        this.alwaysVisible = !1;
        this._addAllItem = !0;
        this.popup = this._previousValue = null;
        this.addEventListener(this, d.EVENT_CLICK, function (b) {
            b.triggerEvent.target == this.getTextBox() && this.dispatchEvent(
                new flexiciousNmsp.FlexDataGridEvent(flexiciousNmsp.TextInput
                    .OUTSIDE_ICON_CLICK))
        });
        this.addEventListener(this, d.EVENT_KEY_UP, function (b) {
            var a;
            if (b.triggerEvent.target == this.getTextBox())
                if (b.keyCode == d.KEYBOARD_SPACE) this.popup ? (a = c.adapter
                    .findElementsWithClassName(this.popup.domElement,
                        c.doLower(flexiciousNmsp.TriStateCheckBox.typeName)
                    ), 0 <= this.highlightedRowIndex && this.highlightedRowIndex <
                    this.getDataProvider().length && a[this.highlightedRowIndex]
                    .component.clickHandler(b)) : this.dispatchEvent(
                    new flexiciousNmsp.FlexDataGridEvent(
                        "outsideIconClick"));
                else if (b.keyCode == d.KEYBOARD_ENTER) {
                if (this.popup) this.onOkButton()
            } else b.keyCode == d.KEYBOARD_ESCAPE ? this.popup && this.destroyPopup() :
                b.keyCode == d.KEYBOARD_UP && 0 < this.getDataProvider()
                .length ? this.popup && (a = c.adapter.findElementsWithClassName(
                    this.popup.domElement,
                    c.doLower(flexiciousNmsp.TriStateCheckBox.typeName)
                ), 0 < this.highlightedRowIndex && this.highlightRow(
                    a[this.highlightedRowIndex - 1])) : b.keyCode == d.KEYBOARD_DOWN &&
                0 < this.getDataProvider().length && (this.popup &&
                    this.popup) && (a = c.adapter.findElementsWithClassName(
                        this.popup.domElement, c.doLower(flexiciousNmsp
                            .TriStateCheckBox.typeName)), this.highlightedRowIndex <
                    this.getDataProvider().length - 1 && this.highlightRow(
                        a[this.highlightedRowIndex + 1]))
        });
        this.addEventListener(this, flexiciousNmsp.TextInput.OUTSIDE_ICON_CLICK,
            function () {
                this.showPopup()
            })
    };
    flexiciousNmsp.MultiSelectComboBox = multiSelectComboBoxRenderer;
    multiSelectComboBoxRenderer.prototype = new flexiciousNmsp.TextInput;
    multiSelectComboBoxRenderer.prototype.typeName = multiSelectComboBoxRenderer.typeName = "MultiSelectComboBox";
    multiSelectComboBoxRenderer.prototype.getClassNames = function () {
        return ["MultiSelectComboBox", "UIComponent", "IFilterControl",
            "IMultiSelectFilterControl", "ISelectFilterControl",]
    };
    
    /*multiSelectComboBoxRenderer.prototype.isMatch=function(emp){
        /*var text=this.getText();
        if(emp && text.length>0){
            return emp.firstName.toLowerCase().indexOf(text.toLowerCase())>=0  ||emp.lastName.toLowerCase().indexOf(text.toLowerCase())>=0 ;
        }
        return true;*/
        //console.log(emp);
       /* var selectedItems = this.getSelectedItems();
		if(selectedItems.length){
			for(var i = 0; i< selectedItems.length ; i++){
				console.log(selectedItems[i].data);
				if(emp.mode.indexOf(selectedItems[i].data)>=0){
					return true;
				}
				return true;
			}
		}
    };*/
    multiSelectComboBoxRenderer.prototype.showPopup = function (b) {
        if (this.popup) this.destroyPopup();
        else {
            this._previousValue = this.getValue().slice();
            flexiciousNmsp.ComboBox.addAllItemToDataProvider(this);
            var a = new flexiciousNmsp.UIComponent("div");
            a.domElement.className = "multiSelectComboBoxPopup";
            var g = this.getDataProvider();
            if (g && 0 < g.length) {
                for (var e = 0; e < g.length; e++) {
                    var h = g[e],
                        j = new flexiciousNmsp.UIComponent("div");
                    j.domElement.className = "checkBoxRow";
                    var k = new flexiciousNmsp.TriStateCheckBox,
                        h = flexiciousNmsp.ComboBox.itemToLabel(this, h);
                    k.allowUserToSelectMiddle = !1;
                    k.delayDuration = 100;
                    k.domElement.innerHTML = h;
                    k.addEventListener(this, d.EVENT_MOUSE_OVER, function (
                        b) {
                        this.highlightRow(b.triggerEvent.currentTarget ||
                            b.triggerEvent.srcElement)
                    });
                    k.addEventListener(this, "delayedChange", function (b) {
                        var a = b.target;
                        b = c.adapter.findElementsWithClassName(this.popup
                            .domElement, c.doLower(flexiciousNmsp.TriStateCheckBox
                                .typeName)).indexOf(a.domElement);
                        b = this.getDataProvider()[b];
                        b = c.resolveExpression(b, this.dataField);
                        var d = this.allUnchecked;
                        this.allUnchecked = a.domElement.innerHTML ==
                            this.addAllItemText ? a.getSelectedState() ==
                            flexiciousNmsp.TriStateCheckBox.STATE_UNCHECKED : !
                            1;
                        if (0 == this.selectedValues.length && !d) {
                            if (a.domElement.innerHTML != this.addAllItemText)
                                for (a =
                                    this.getAddAllItem() ? 1 : 0; a <
                                    this.getDataProvider().length; a++)
                                    d = this.getDataProvider()[a], d =
                                        c.resolveExpression(d, this.dataField),
                            d != b && this.selectedValues.push(
                                d)
                        } else a.domElement.innerHTML == this.addAllItemText ?
                            this.selectedValues = [] : a.getSelectedState() ==
                            flexiciousNmsp.TriStateCheckBox.STATE_CHECKED && -
                            1 == this.selectedValues.indexOf(b) ? this.selectedValues
                            .push(b) : a.getSelectedState() ==
                            flexiciousNmsp.TriStateCheckBox.STATE_UNCHECKED && -
                            1 != this.selectedValues.indexOf(b) && this
                            .selectedValues.splice(this.selectedValues.indexOf(
                                    b),
                                1); if (b = c.adapter.findElementWithClassName(
                            this.popup.domElement, "okButton")) b.style
                            .display = this.allUnchecked ? "none" : "";
                        this.updateCheckBoxes()
                    });
                    j.addChild(k);
                    a.addChild(j)
                }
                a.addChild(j)
            }
            g = new flexiciousNmsp.UIComponent("div");
            g.domElement.className = "okCancelDiv";
            g.domElement.innerHTML =
                "<div class='okCancel'><span class='okButton'>Ok</span><span class='cancelButton'>Cancel</span></div>";
            this.alwaysVisible || a.addChild(g);
            g = new flexiciousNmsp.Point(0, 0);
            g = this.localToGlobal(g);
            b ? g = b.globalToLocal(g) :
                b = flexiciousNmsp.DisplayList.instance().documentComponent
                .domElement.body;
            g = new flexiciousNmsp.UIComponent("div");
            g.addChild(a);
            a = g;
            c.addChild(b, a);
            a.setWidth(-1 === this.dropdownWidth ? this.getWidth() : this.dropdownWidth);
            a.domElement.className = "flexiciousGrid";
            //a.domElement.addClass("test");
            $(".multiSelectComboBoxPopup").parent().addClass("ct-multi-select-combobox");
            c.positionComponent(this.domElement, a.domElement);
            this.popup = a;
            this.popup.addEventListener(this, d.EVENT_CLICK, function (b) {
                if ("okButton" == b.triggerEvent.target.className) this
                    .onOkButton();
                else "cancelButton" == b.triggerEvent.target.className ?
                    (this.setValue(this._previousValue),
                    this.destroyPopup()) : b.triggerEvent.target ==
                    this.getTextBox() && this.dispatchEvent(new flexiciousNmsp
                        .FlexDataGridEvent("outsideIconClick"))
            });
            this.updateCheckBoxes();
            this.alwaysVisible || flexiciousNmsp.DisplayList.instance().documentComponent
                .addEventListener(this, d.EVENT_MOUSE_DOWN, this.onDocumentMouseDown) || flexiciousNmsp.DisplayList.instance().documentComponent
                .addEventListener(this, d.EVENT_MOUSE_UP, this.onDocumentMouseUp)

        }
    };
    multiSelectComboBoxRenderer.prototype.clear = function () {
        this.setValue([])
    };
    multiSelectComboBoxRenderer.prototype.getValue = function () {
        return this.selectedValues
    };
    multiSelectComboBoxRenderer.prototype.setValue = function (b) {
        this.selectedValues = b;
        this.popup ? this.updateCheckBoxes() :
            this.setLabel()
    };
    multiSelectComboBoxRenderer.prototype.getAddAllItem = function () {
        return this._addAllItem
    };
    multiSelectComboBoxRenderer.prototype.setAddAllItem = function (b) {
        this._addAllItem = b;
        this._addAllItemDirty = !0;
        this.invalidateDisplayList()
    };
    multiSelectComboBoxRenderer.prototype.updateCheckBoxes = function () {
        for (var b = c.adapter.findElementsWithClassName(this.popup.domElement,
                c.doLower(flexiciousNmsp.TriStateCheckBox.typeName)), a = 0; a <
            b.length; a++) {
            var d = b[a],
                e = this.getDataProvider()[a];
            this.allUnchecked ? d.component.setSelectedState(flexiciousNmsp
                .TriStateCheckBox.STATE_UNCHECKED) :
                0 == this.selectedValues.length && this.getAddAllItem() ? d
                .component.setSelectedState(flexiciousNmsp.TriStateCheckBox
                    .STATE_CHECKED) : 0 == a && this.getAddAllItem() ? d.component
                .setSelectedState(this.selectedValues.length >= this.getDataProvider()
                    .length - 1 ? flexiciousNmsp.TriStateCheckBox.STATE_CHECKED :
                    0 < this.selectedValues.length ? flexiciousNmsp.TriStateCheckBox
                    .STATE_MIDDLE : flexiciousNmsp.TriStateCheckBox.STATE_UNCHECKED
            ) : d.component.setSelectedState(0 <= this.selectedValues.indexOf(
                    c.resolveExpression(e, this.dataField)) ?
                flexiciousNmsp.TriStateCheckBox.STATE_CHECKED :
                flexiciousNmsp.TriStateCheckBox.STATE_UNCHECKED)
        }
        this.setLabel()
    };
    multiSelectComboBoxRenderer.prototype.highlightRow = function (b) {
        var a = c.adapter.findElementsWithClassName(this.popup.domElement,
            "checkBoxRow"); - 1 !== this.highlightedRowIndex && c.detachClass(
            a[this.highlightedRowIndex], "hover");
        this.highlightedRowIndex = a.indexOf(b.parentNode);
        c.attachClass(a[this.highlightedRowIndex], "hover")
    };
    multiSelectComboBoxRenderer.prototype.onOkButton = function () {
        this.allUnchecked || (this.destroyPopup(), this.dispatchEvent(new flexiciousNmsp
                .FlexDataGridEvent(d.EVENT_CHANGE)),
            this.dispatchEvent(new flexiciousNmsp.FlexDataGridEvent(d.EVENT_VALUE_COMMIT))
        )
    };
    multiSelectComboBoxRenderer.prototype.destroyPopup = function (b) {
        if (!this.alwaysVisible || b) this.removeChild(this.popup), this.popup =
            null, flexiciousNmsp.DisplayList.instance().documentComponent.removeEventListener(
                d.EVENT_MOUSE_DOWN, this.onDocumentMouseDown), flexiciousNmsp.DisplayList.instance().documentComponent.removeEventListener(
                d.EVENT_MOUSE_UP, this.onDocumentMouseUp)
    };
    multiSelectComboBoxRenderer.prototype.onDocumentMouseUp = function (b) {
        this.owns(b.triggerEvent.target) || this.destroyPopup()
    };
    
    multiSelectComboBoxRenderer.prototype.onDocumentMouseDown = function (b) {
        this.owns(b.triggerEvent.target) || this.destroyPopup()
    };
    
    multiSelectComboBoxRenderer.prototype.getDataProvider = function () {
        return this._dataProvider
    };
    multiSelectComboBoxRenderer.prototype.setDataProvider = function (b) {
        this._dataProvider =
            b;
        this.getAddAllItem() && (this._addAllItemDirty = !0);
        this.invalidateDisplayList()
    };
    multiSelectComboBoxRenderer.prototype.itemToLabel = function (b) {
        return flexiciousNmsp.ComboBox.itemToLabel(this, b)
    };
    multiSelectComboBoxRenderer.prototype.updateDisplayList = function () {
        flexiciousNmsp.ComboBox.setSelectedItemFromValue(this);
        flexiciousNmsp.TextInput.prototype.updateDisplayList.apply(this);
        var b = this.getOutsideIcon();
        b.style.top = "1px";
        b.style.display = "none";
        b = this.getInsideIcon();
        b.style.top = "1px"
    };
    multiSelectComboBoxRenderer.prototype.setLabel = function () {
        var b = [];
        if (this.getAddAllItem() &&
            (0 == this.selectedValues.length || 1 == this.selectedValues.length &&
                this.selectedValues[0] == this.addAllItemText) || this.getDataProvider()
            .length == this.selectedValues.length + 1) this.getTextBox().value =
            this.addAllItemText;
        else if (this.getDataProvider() && 0 < this.getDataProvider().length) {
            for (var a = this.getAddAllItem() ? 1 : 0; a < this.getDataProvider()
                .length; a++) {
                var d = this.getDataProvider()[a];
                0 <= this.selectedValues.indexOf(c.resolveExpression(d,
                    this.dataField)) && b.push(this.itemToLabel(d))
            }
            b.sort();
            this.getTextBox().value =
                b.join(",");
            this.getTextBox().title = this.getTextBox().value
        }
    };
    multiSelectComboBoxRenderer.prototype.setSelectedItem = function () {};
    multiSelectComboBoxRenderer.prototype.owns = function (b) {
        return flexiciousNmsp.UIComponent.prototype.owns.apply(this, [b]) ||
            this.popup && this.popup.owns(b)
    };
    multiSelectComboBoxRenderer.prototype.kill = function () {
        flexiciousNmsp.TextInput.prototype.kill.apply(this);
        this.popup && (this.popup.kill(), this.popup = null)
    };
    multiSelectComboBoxRenderer.prototype.initialize = function () {
        flexiciousNmsp.TextInput.prototype.initialize.apply(this);
        this.getTextBox().readOnly = !0;
        this.getHeight() || this.setActualSize(100,
            19);
        this.setLabel()
    };
    multiSelectComboBoxRenderer.prototype.getIsAllSelected = function () {
        if (this.selectedValues && 1 == this.selectedValues.length && 0 <
            this.getDataProvider().length && this.selectedValues[0] == this
            .getDataProvider()[0][this.dataField] || 0 == this.selectedValues
            .length && this.getAddAllItem()) return !0;
        for (var b = 0; b < this.getDataProvider().length; b++) {
            var a = this.getDataProvider()[b];
            if (!this.isItemSelected(a) && 0 != this.getDataProvider().indexOf(
                a)) return !1
        }
        return !0
    };
    multiSelectComboBoxRenderer.prototype.isItemSelected = function (b) {
        b = c.resolveExpression(b,
            this.dataField);
        return -1 != this.selectedValues.indexOf(b)
    };
    multiSelectComboBoxRenderer.prototype.getSelectedItems = function (b) {
        for (var a = [], d = this.getDataProvider(), e = 0; e < d.length; e++)
            b = d[e], this.isItemSelected(b) && a.push(b);
        return a
    }
    tableGridUtils.MultiSelectComboBoxRenderer = multiSelectComboBoxRenderer;
})(window);

//date range picker
(function () {
    var dateRangePicker = function () {
            flexiciousNmsp.UIComponent.apply(this, ["div"]);
            this.setWidth(400);
            this.setHeight(150);
            this.invalidateDisplayList();
            this.endDate = this.startDate = null;
            this.dateFormatString = flexiciousNmsp.Constants.DEFAULT_DATE_FORMAT;
            this.combo = null
        },
        c = dateRangePicker.prototype = new flexiciousNmsp.UIComponent,
        d = flexiciousNmsp.UIUtils,
        b = flexiciousNmsp.Constants;
    c.getClassNames = function () {
        return ["DateRangePicker", "UIComponent"]
    };
    c.updateDisplayList = function (b, a) {
        flexiciousNmsp.UIComponent.prototype.updateDisplayList.apply(this, [b, a]);
        if (null != this.domElement.parentElement) {
            this.setInnerHTML('<div class="flexiciousGrid flexiciousDatePickerPopup" ><div class="datePickerBar"><div class="datePickerStartDate"><input class="datePickerStartDateInput"></div><div class="datePickerEndDate"><input class="datePickerEndDateInput"></div></div><div  class="datePickerButtonBar " ><span class="datePickerButton okBtn button" >Ok</span><span class="datePickerButton cancelBtn button" >Cancel</span></div></div>');
             this.domElement.parentElement.style.zIndex = 899999;
              
            var f = new Date,
                c = new Date;
            this.combo &&
                (c = new flexiciousNmsp.DateRange(this.combo.defaultDateRangeForDatePicker, null, null), f = this.combo.customDateRange.startDate ? this.combo.customDateRange.startDate : c.startDate, c = this.combo.customDateRange.endDate ? this.combo.customDateRange.endDate : c.endDate);
            this.startDate = f;
            this.endDate = c;
            var m = this;
            d.adapter.createDateTimePicker(d.adapter.getElementByClassName(this.domElement, "datePickerStartDateInput"), this.dateFormatString, f, function (b) {
                m.startDate = b
            }, !0);
            d.adapter.createDateTimePicker(d.adapter.getElementByClassName(this.domElement,
                "datePickerEndDateInput"), this.dateFormatString, c, function (b) {
                m.endDate = b
            }, !0);
            d.addDomEventListener(this, d.adapter.getElementByClassName(this.domElement, "cancelBtn"), "click", g);
            d.addDomEventListener(this, d.adapter.getElementByClassName(this.domElement, "okBtn"), "click", e)
        }
    };
    var g = function (b) {
            f(b)
        },
        f = function (b) {
            d.removePopUp(d.adapter.findAncestorByClassName(b.currentTarget || b.srcElement, "flexiciousDatePickerPopup").parentNode)
        },
        e = function (a) {
            var g = d.adapter.findAncestorByClassName(a.currentTarget ||
                a.srcElement, "flexiciousDatePickerPopup").parentNode;
            d.adapter.getElementByClassName(g, "datePickerStartDateInput") && (g.component.startDate = d.adapter.getDateValue(d.adapter.getElementByClassName(g, "datePickerStartDateInput").value, g.component.dateFormatString), g.component.endDate = d.adapter.getDateValue(d.adapter.getElementByClassName(g, "datePickerEndDateInput").value, g.component.dateFormatString));
            null != g.component.startDate && null != g.component.endDate && g.component.startDate < g.component.endDate ? (g.component.dispatchEvent(new flexiciousNmsp.FlexDataGridEvent(b.EVENT_CHANGE)),
                f(a)) : d.showMessage("Please select start date and end date, and ensure start date is before end date.")
        };
    	flexiciousNmsp.DateRangePicker = dateRangePicker;
        tableGridUtils.DateRangePicker = dateRangePicker;
})(window);




(function () {
    var dateRangeBox, c = flexiciousNmsp.UIUtils,
        d = flexiciousNmsp.Constants;
    dateRangeBox = function () {
        this._text = "";
        this.addAllItem = !0;
        this.customDateRange = new flexiciousNmsp.DateRange(flexiciousNmsp.DateRange
            .DATE_RANGE_CUSTOM, null, null);
        this._dateRangeOptions = this.dateRange = this.popup = null;
        this.dateFormatString = d.SHORT_DATE_MASK;       
        this.showTimePicker = 1;
        this.filterComparisionType = flexiciousNmsp.FilterExpression.FILTER_COMPARISION_TYPE_DATE;
        this.addEventListener(this, d.EVENT_MOUSE_CLICK, this.onClick);
        
        this.setInnerHTML(
                '<div><div class="dateFilterBar"><div class="dateFilterStartDate" style="float:left"><input class="dateInputStartDateInput" placeholder="mm/dd/yyyy"></div><div class="dateFilterEndDate"><input class="dateInputEndDateInput" placeholder="mm/dd/yyyy"></div></div></div>'
            );
    };
    
     var a = dateRangeBox.prototype = new flexiciousNmsp.UIComponent();
  
    a.getClassNames = function () {
        return "UIComponent IFilterControl IRangeFilterControl "
            .split(" ");
    };
   
    a.onClick = function (b) {
    	
        var f = b.triggerEvent.currentTarget || b.triggerEvent.srcElement;
         
            this.addEventListener(null, d.EVENT_CHANGE, this.onDatePicker);
            
    };
    a.onDatePicker = function (b) {
        this.customDateRange.startDate = this.startDate;
        this.customDateRange.endDate = this.endDate;
        this.dispatchEvent(b)
    };
    a.getValue = function () {
        
            var b = new flexiciousNmsp.DateRange(this.defaultDateRangeForDatePicker,
                null, null);
            return flexiciousNmsp.DateRange.DATE_RANGE_CUSTOM + "__" + (
                this.customDateRange.startDate ? this.customDateRange.startDate
                .toString() : b.startDate.toString()) + "__" + (this.customDateRange
                .endDate ? this.customDateRange.endDate.toString() : b.endDate
            )
       
       
    };
    a.setValue = function (b) {
      
            var a = b.toString().split("__");
            3 == a.length ? (flexiciousNmsp.ComboBox.prototype.setValue.apply(
                    this, [a[0]]), this.customDateRange.startDate = new Date(
                    Date.parse(a[1].toString())), this.customDateRange.endDate =
                new Date(Date.parse(a[2].toString()))) : flexiciousNmsp.ComboBox
                .prototype.setValue.apply(this, [b])
       
    };
    a.getSearchRangeStart =
        function () {
            return this.getDateRange() ? this.getDateRange().startDate :
                null
    };
    a.getSearchRangeEnd = function () {
        return this.getDateRange() ? this.getDateRange().endDate : null
    };
    a.getMaxValue = function () {
        return new Date(2099, 1, 1)
    };
    a.getMinValue = function () {
        return new Date(1970, 1, 1)
    };
    a.getDateRange = function () {
        
                return null !=
                    this.customDateRange.startDate && null != this.customDateRange
                    .endDate && this.customDateRange.startDate.getTime() !=
                    this.customDateRange.endDate.getTime() ? this.customDateRange :
                    null;
            this.customDateRange = new flexiciousNmsp.DateRange(
                flexiciousNmsp.DateRange.DATE_RANGE_CUSTOM, null, null);
            return new flexiciousNmsp.DateRange(b[this.dataField], null,
                null)
        
    };
    a.setDateRange = function (b) {
        if (null != b)
            for (var a = this.getDataProvider(), d = 0; d < a.length; d++) {
                var e = a[d];
                if (e.data == b.dateRangeType) {
                    this.setSelectedItem(e);
                    break
                }
            }
    };
    a.setDateRangeOptions = function (b) {
        this._dateRangeOptions = b;
        b = [];
        for (var a = 0; a < this._dateRangeOptions.length; a++) {
            var d = this._dateRangeOptions[a];
            b.push({
                label: d,
                data: d
            })
        }
        this.setDataProvider(b)
    };
    a.getDateRangeOptions = function () {
        return this._dateRangeOptions
    }
    
    tableGridUtils.DateRangeBoxRenderer = dateRangeBox;
})(window);

});