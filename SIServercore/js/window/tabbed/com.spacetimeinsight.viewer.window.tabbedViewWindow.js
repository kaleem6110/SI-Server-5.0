/**
 * @author kartik.raina
 */
define([
    'jquery',
    'siViewerData',
    'jquery-ui',
    'kendo',
    'window/com.spacetimeinsight.viewer.window.baseWindow',
    'map/ge/com.spacetimeinsight.viewer.ui.geMap'
],function($,$si){
	$.widget('spacetimeinsight.siViewerTabbedViewWindow',$.spacetimeinsight.siViewerBaseWindow,{
		options:{
			title:"Tabbed Info Balloon",
			windowTools:[],
		
			shimRequired : true,
			 showHelpDropdown: true,
			windowAttributes : {
				width 		: "350px",
				height 		: "278px",
				minWidth	: "350px",
				minHeight	: "100px",
				maxWidth	: "550px",
				maxHeight	: "400px",
				position: {
					top		: "250px",
					left	: "400px",
				},
				//appendTo: ".k-window.w-map-view",
			},
			actionObject	:{},
		},
		
		pluginName:"siViewerTabbedViewWindow",
		GENERIC_TOOL   :  kendo.template("<div class='toolbar-icon'><button id='#= tool #Tool' class='#= tool #-icon' title='#= tooltip #'></button></div>"),
		PLACE_SAVE_DIV   :  kendo.template("<div id ='#= id #'  > </div>"),
		CONTENT_DIV   :  kendo.template("<div id ='#= id #'  > </div>"),
		_create: function(){


			var $this = this;
			var $options = this.options;

			$this._super();
			this.element.parent().css("min-height","350px");
			this.element.parent().css("min-width","150px");
			$this.options.artefactname=$this.options.windowConfig.windowDatasource.parameters.artefactname;
			$this.options.ecosid=$this.options.windowConfig.windowDatasource.parameters.ecosid;
		
			$($this.element).append(this.PLACE_SAVE_DIV({id:"placemarkinfo"}));
			$($this.element).find("#placemarkinfo").addClass("custom-vertical-tabstrip");
			$($this.element).append(this.CONTENT_DIV({id:"tabbedcontentdiv"}));
			$($this.element).find("#tabbedcontentdiv").addClass("custom-content-tabstrip");
			$($this.element).find("#placemarkinfo").parent(".sti-window.k-window-content.k-content").addClass("info-placemark");
			this.options.updateFooterfN = this._updateFooterOnRefresh.bind(this);
			$si.eventSource.globalEvents.bind($si.events.GlobalEvents.onGlobalEvent,this.options.updateFooterfN);
			
		},
		
		applyWindowData:function() {
			var $this = this;
			$(this.element).find("#placemarkinfo").empty();
			var tabStrip = $(this.element).find("#placemarkinfo").kendoTabStrip({
				animation: {
                         open:{
                      		effects: "fadeIn"
                        }
                    },
       				dataUrlField: "Url",
                    dataTextField : "text",
                    dataContentField: "content"
            }).data("kendoTabStrip");
            
            if(!$this.options.windowData || $this.isEmpty($this.options.windowData.data)){
            	$($this.element).find("#placemarkinfo").append("<div class = 'tabstrip-empty'><span class='error-img' ></span><span class='tabstrip-nodata'>No Data Available</span> </div>");
            }else{
				jQuery.each( $this.options.windowData.data, function( i, val ) {
						 var tabbedcontentkeyarray = "";
					if(i != "NOCATEGORY"){
					  jQuery.each(val, function( j, value ) {
						  var tempStr='';
							var displayType=$this.getCategoryFieldDisplayType(i,j);
							var actionJs = $this.getCategoryFieldActionFunction(i,j);
							var formatJs = $this.getCategoryFieldFormatFunction(i,j);
							if( displayType==undefined ||displayType=='' || displayType=='Text'){
								tempStr = "<div id='tabbedcontentdiv'><div id='attrName'><div class='attrname-field'>"+$this.getDisplayName(j)+"</div></div><div id='attrValue'>";
	
										if (formatJs != null) {
											tempStr = tempStr+window[formatJs](j,value,{ecosid:$this.options.ecosid,artefactName:$this.options.artefactname})+"</div></div>";
										}else{
											tempStr = tempStr+$this.formatColumnData(j,value)+"</div></div>";
										}
								tabbedcontentkeyarray=tabbedcontentkeyarray+(tempStr);
							}
							if(displayType=='Button'){
								tempStr = "<div id='tabbedcontentdiv'><div id='attrName'><div class='attrname-field'>"+$this.getDisplayName(j)+"</div></div><div id='attrValue'><input class= 'button-image' type='button'";
								if(actionJs!=null){
									tempStr = tempStr+" onclick='(function(j,value,ecosid,artefactName){window[\""+actionJs+"\"](j,value,ecosid,artefactName);})(\""+j+"\",\""+value+"\",\""+$this.options.ecosid+"\",\""+$this.options.artefactname+"\")'";
								}
								if (formatJs != null) {
									tempStr = tempStr+" value='"+window[formatJs](j,value,{ecosid:$this.options.ecosid,artefactName:$this.options.artefactname})+"'></div></div>";
								}else{
									tempStr = tempStr+" value='"+$this.formatColumnData(j,value)+"'></div></div>";
								}
								tabbedcontentkeyarray=tabbedcontentkeyarray+(tempStr);
							}
							if(displayType=='Image'){
	
	
								tempStr = "<div id='tabbedcontentdiv'><div id='attrName'><div class='attrname-field'>"+$this.getDisplayName(j)+"</div></div><div id='attrValue'><img class= 'button-image' ";
								if(actionJs!=null){
									tempStr = tempStr+" onclick='(function(j,value,ecosid,artefactName){window[\""+actionJs+"\"](j,value,ecosid,artefactName);})(\""+j+"\",\""+value+"\",\""+$this.options.ecosid+"\",\""+$this.options.artefactname+"\")'";
								}
								if (formatJs != null) {
									tempStr = tempStr+" src='"+window[formatJs](j,value,{ecosid:$this.options.ecosid,artefactName:$this.options.artefactname})+"' alt='"+value+"' width='100%' height='100%'/></div></div>";
								}else{
									tempStr = tempStr+" src='"+value+"' alt='"+$this.formatColumnData(j,value)+"' width='100%' height='100%'/></div></div>";
								}
								tabbedcontentkeyarray=tabbedcontentkeyarray+(tempStr);
							}
						});
					}else{
						 for (var k in val) {
						        if (val.hasOwnProperty(k)) {
						         tabbedcontentkeyarray = tabbedcontentkeyarray+("<div id='tabbedcontentdiv'><div id='attrName'><div class='attrname-field'>"+$this.getDisplayName(k)+"</div></div><div id='attrValue'>"+$this.formatColumnData(k,val[k])+"</div></div>");
						        }
						    }
	
					}
					if(i == "NOCATEGORY"){
						$($this.element).find("#placemarkinfo").append(tabbedcontentkeyarray);
						$($this.element).find("#placemarkinfo").addClass("placemarkinfo-div");
					}else{
	
						tabStrip.append({
	                    	text: i,
	                        content: tabbedcontentkeyarray
	                    });
	
				}
	
				});
				tabStrip.select(0);
			}
		},
		
		
		getCategoryFieldDisplayType:function(catName,attrName){
			var returnVal;
					var categories=this.options.windowConfig.categories;
				if(categories){	
					jQuery.each( categories, function( cName, cFieldArray ) {
								if(catName==cName){
										  jQuery.each(cFieldArray, function( i, cField ) {
											  if(cField.attributeName==attrName ||cField.attributeDisplayName==attrName ){
												returnVal= cField.displayType;

												}
											});
								}

						});
				 }
						return returnVal;

		},
	getCategoryFieldActionFunction:function(catName,attrName){
			var returnVal;
					var categories=this.options.windowConfig.categories;
			if(categories){
					jQuery.each( categories, function( cName, cFieldArray ) {
								if(catName==cName){
										  jQuery.each(cFieldArray, function( i, cField ) {
											  if(cField.attributeName==attrName ||cField.attributeDisplayName==attrName){
												returnVal= cField.actionJSFunction;

												}
											});
								}

						});
			}
						return returnVal;

		},
		getCategoryFieldFormatFunction:function(catName,attrName){
					var returnVal;
							var categories=this.options.windowConfig.categories;
					if(categories){
							jQuery.each( categories, function( cName, cFieldArray ) {
										if(catName==cName){
												  jQuery.each(cFieldArray, function( i, cField ) {
													  if(cField.attributeName==attrName ||cField.attributeDisplayName==attrName){
														returnVal= cField.fomratJSFunction;

														}
													});
										}

								});
					}
								return returnVal;

		},
		
		isEmpty : function(obj) {
		    return Object.keys(obj).length === 0;
		},
		
		_updateFooterOnRefresh : function(event){
			if(event && event.data && event.data.name == "onLoadComplete" && event.data.businessViewId == this.options.windowConfig.businessViewId){
				this.options.windowData.lastUpdateFormattedTime = $si.uiUtils.getFooterDate(event.data.lastUpdateTime);
				this._updateFooter();
			}
		},
		
		closeWindow : function(){
			this._unBindGlobalEvents();
			this._super();
		},
		
		
		_unBindGlobalEvents : function(){
			if(this.options.updateFooterfN){
				$si.eventSource.globalEvents.unbind($si.events.GlobalEvents.onGlobalEvent,this.options.updateFooterfN);
			}
		},

	

	});
});