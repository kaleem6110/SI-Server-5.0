define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.drawer',
    'window/com.spacetimeinsight.i18N.window',
    'window/com.spacetimeinsight.i18N.window.regional',
],function($){

	$.widget('spacetimeinsight.siViewerXYChartDrawer',$.spacetimeinsight.siViewerDrawer,{
		options : {
		toggleDelay : 200,
		actionButtons	: ["Apply"],
		needTabStrip	: true,
		configData      : null,
		plotItems: null,
		xAxisItems: null,
		yAxisItemsFirst:null,
		yAxisItemsSecondary:null,
		},
		pluginName:"siViewerXYChartDrawer",


		GENERIC_COMPONENT : kendo.template("<div id ='#= id #' class ='#= cssClass #'>#= content #</div>"),
		INPUT_BOX :  kendo.template("<input type='#= type #' value='#= value #' name='#= name #'  id ='#= id #' style ='#= style #' class ='#= className #' />"),
		INPUT_DISABLED_BOX :  kendo.template("<input type='#= type #' value='#= value #' title='#= title #' name='#= name #'  id ='#= id #' style ='#= style #' class ='#= className #' disabled/>"),
		SPAN_COMPONENT : kendo.template("<span style ='#= style #'>#= spanContent #</span>"),
		LIST_COMPONENT : kendo.template("<ul id ='#= id #' class ='#= className #'></ul>"),

		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			$(this.element).addClass("xy-chart-drawer");
			this._super();
			this.options.contentDiv = $(this.element).find(".sti-window-drawer-content");
			
			var tabStrip = $this.options.tabStrip;
			tabStrip.kendoTabStrip({
				dataTextField: "text",
    			dataContentField: "content",
    			dataSource:
    			[{
        			text: $si.i18N.Window.displaySettings,
        			content: this.GENERIC_COMPONENT({id:"contentDrawer",cssClass:"contentDrawer",content:""}),																			// optional.
    			 }]
			});	
			
			
			//this.options.contentDiv.append(this.GENERIC_COMPONENT({id:"contentDrawer",cssClass:"contentDrawer",content:""}));
			tabStrip.data("kendoTabStrip").select(0);
			$(this.element).hide();
			
			this.options.actionButtonClicked = function(event,data){
													if(data.buttonId == "Apply"){
														$this.onApplyButtonClicked();
													}
										};
			this._trigger("onCreationComplete",{id:this.options.id,domElement:$(this.element)});
		},

		onApplyButtonClicked : function(){
			var $this = this;
			var plotArea = {};
			var xAxisItems = {};
			var yAxisItemsFirst = {};
			var yAxisItemsSecondary =[];

			$($this.element).find('.plotCheckbox:checkbox').each(function(k,v){
				if( $(this).is(':checked') ){
					plotArea[v.id] = true;
				}else{
					plotArea[v.id] = false;
				}
			});

			$($this.element).find('.xAxisCheckbox:checkbox').each(function(k,v){
				if( $(this).is(':checked') ){
					xAxisItems[v.id] = true;
				}else{
					xAxisItems[v.id] = false;
				}
			});

			$($this.element).find('.yAxisCheckbox:checkbox').each(function(k,v){
				if( $(this).is(':checked') ){
					yAxisItemsFirst[v.id] = true;
				}else{
					yAxisItemsFirst[v.id] = false;
				}
			});

			if($this.options.configData.addMultipleYAxis){
				if($this.options.configData.yaxisList){
					$.each($this.options.configData.yaxisList, function(k,v){
				var yAxisItemsInnerData = [];
				
				if( $($this.element).find('input#yAxisTitle'+k+'.yAxisCheckbox2').is(':checked')) {
					yAxisItemsInnerData['yAxisTitle'] = true;
				}else{
					yAxisItemsInnerData['yAxisTitle'] = false;
				}
				
				if( $($this.element).find('input#yAxisTickMark'+k+'.yAxisCheckbox2').is(':checked')) {
					yAxisItemsInnerData['yAxisTickMark'] = true;
				}else{
					yAxisItemsInnerData['yAxisTickMark'] = false;
				}
				
				if( $($this.element).find('input#yAxisReverseOrder'+k+'.yAxisCheckbox2').is(':checked')){
					yAxisItemsInnerData['yAxisReverseOrder'] = true;
				}else{
					yAxisItemsInnerData['yAxisReverseOrder'] = false;
				}
				
				yAxisItemsSecondary.push(yAxisItemsInnerData);
			});
		}
	}
			
			$this.options.plotItems = plotArea;
			$this.options.xAxisItems = xAxisItems;
			$this.options.yAxisItemsFirst = yAxisItemsFirst;
			$this.options.yAxisItemsSecondary = yAxisItemsSecondary;
			
			var tableDrawerSettings = {
				"plotItems"   			: $this.options.plotItems,
				"xAxisItems"         	: $this.options.xAxisItems,
				"yAxisItemsFirst"		: $this.options.yAxisItemsFirst,
				"yAxisItemsSecondary"	: $this.options.yAxisItemsSecondary,
			}
			this._trigger("applydrawersettings",null,{data: tableDrawerSettings});
			this.toggle();
		},
			//Show/Hide toolbar
			toggle : function(delay){
				$(this.element).slideToggle(delay?delay:this.options.toggleDelay);
				if($(this.element).css("display") != "none"){
					$(this.element).css("display","inline-flex");
				}
				this._trigger("onToggle",{id:this.options.id,domElement:$(this.element)});
			},

			setHideColumnList : function(dataContent){
				var $this = this;
				$this.options.configData = dataContent;
				var drawer = $($this.element).find("#contentDrawer");
				drawer.append(this.GENERIC_COMPONENT({id:"plotArea",cssClass:"section-header",content:"Plot Area"})
						+ this.GENERIC_COMPONENT({id:"plotArea",cssClass:"section-content",	content:
						  this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:$si.i18N.Window.grid, id:"grid",className:"plotCheckbox",style:"",value:$si.i18N.Window.grid}) + $si.i18N.Window.grid})
						+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:$si.i18N.Window.titles, id:"plotAreaTitle",className:"plotCheckbox",style:"",value:$si.i18N.Window.titles}) + $si.i18N.Window.titles})
						+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:$si.i18N.Window.guildlines, id:"guildLines",className:"plotCheckbox",style:"",value:$si.i18N.Window.guildlines}) + $si.i18N.Window.guildlines})
						+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:$si.i18N.Window.dtLabel, id:"dataLabel",className:"plotCheckbox",style:"",value:$si.i18N.Window.dataLabel}) + $si.i18N.Window.dataLabel}) })
						+ this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""}));

				drawer.append( this.GENERIC_COMPONENT({id:"x-axis",cssClass:"section-header",content: this.SPAN_COMPONENT({ style:"word-break: break-word;display: block;width: 110px;",spanContent: $this.options.configData.xaxis.title.text }) + this.SPAN_COMPONENT({ style:"margin-left: 75px;display: table-cell;",spanContent: this.INPUT_DISABLED_BOX({type:"text",name:"", title:$this.options.configData.xaxis.title.text, value:$this.options.configData.xaxis.title.text, id:"",className:"",style:"width:85px"})})  })
						+ this.GENERIC_COMPONENT({id:"",cssClass:"section-content",	content:
						  this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"xAxisTitle",name:$si.i18N.Window.title,className:"xAxisCheckbox",style:"",value:$si.i18N.Window.title}) + $si.i18N.Window.title})
						+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"xAxisTickMark",name:$si.i18N.Window.tckMarks,className:"xAxisCheckbox",style:"",value:$si.i18N.Window.tickMarks}) + $si.i18N.Window.tickMarks})
						+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"xAxisReverseOrder",name:$si.i18N.Window.revOrder,className:"xAxisCheckbox",style:"",value:$si.i18N.Window.reverseOrder}) + $si.i18N.Window.reverseOrder}) })
						+ this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""}));

				if($this.options.configData.addMultipleYAxis){
					if($this.options.configData.yaxisList){
						$.each($this.options.configData.yaxisList, function(k,value){
							drawer.append( $this.GENERIC_COMPONENT({id:"",cssClass:"section-header",content: $this.SPAN_COMPONENT({ style:"word-break: break-word;display: block;width: 110px;",spanContent: value.title.text}) + $this.SPAN_COMPONENT({ style:"margin-left: 60px;display: table-cell;",spanContent: $this.INPUT_DISABLED_BOX({type:"text",name:"" , title:value.title.text , value:value.title.text, id:"",className:"",style:"width:85px"})})  })
									+ $this.GENERIC_COMPONENT({id:"y-axis"+k,cssClass:"section-content",	content:
									  $this.GENERIC_COMPONENT({id:"",cssClass:"",content: $this.INPUT_BOX({type:"checkbox", id:"yAxisTitle"+k,name:$si.i18N.Window.title,className:"yAxisCheckbox2",style:"",value:$si.i18N.Window.title}) + $si.i18N.Window.title})
									+ $this.GENERIC_COMPONENT({id:"",cssClass:"",content: $this.INPUT_BOX({type:"checkbox", id:"yAxisTickMark"+k,name:$si.i18N.Window.tckMarks,className:"yAxisCheckbox2",style:"",value:$si.i18N.Window.tickMarks}) + $si.i18N.Window.tickMarks})
									+ $this.GENERIC_COMPONENT({id:"",cssClass:"",content: $this.INPUT_BOX({type:"checkbox", id:"yAxisReverseOrder"+k,name:$si.i18N.Window.revOrder,className:"yAxisCheckbox2",style:"",value:$si.i18N.Window.reverseOrder}) + $si.i18N.Window.reverseOrder}) })
									+ $this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""}));	
						});
					}
				}else{
					drawer.append( this.GENERIC_COMPONENT({id:"y-axis",cssClass:"section-header",content: this.SPAN_COMPONENT({ style:"word-break: break-word;display: block;width: 110px;",spanContent: $this.options.configData.yaxis.title.text}) + this.SPAN_COMPONENT({ style:"margin-left: 60px;display: table-cell;",spanContent: this.INPUT_DISABLED_BOX({type:"text",name:"", title:$this.options.configData.yaxis.title.text , value:$this.options.configData.yaxis.title.text, id:"",className:"",style:"width:85px"})})  })
							+ this.GENERIC_COMPONENT({id:"",cssClass:"section-content",	content:
							  this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"yAxisTitle",name:$si.i18N.Window.title,className:"yAxisCheckbox",style:"",value:$si.i18N.Window.title}) + $si.i18N.Window.title})
							+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"yAxisTickMark",name:$si.i18N.Window.tckMarks,className:"yAxisCheckbox",style:"",value:$si.i18N.Window.tickMarks}) + $si.i18N.Window.tickMarks})
							+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"yAxisReverseOrder",name:$si.i18N.Window.revOrder,className:"yAxisCheckbox",style:"",value:$si.i18N.Window.reverseOrder}) + $si.i18N.Window.reverseOrder}) })
							+ this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""}));
				}

				drawer.find(".horizontal-splitter").last().remove();
				$(this.element).hide();
				
				// x-axis title check
				if($this.options.configData.xaxis.title.text){
					$($this.element).find('input:checkbox[id=xAxisTitle]').prop('checked', true);
				}else{
					$($this.element).find("#x-axis span:first-child").text($si.i18N.Window.xaxis);
					$($this.element).find("#x-axis :input").val($si.i18N.Window.xaxis);					
				}
				// x-axis reverse check				
				if($this.options.configData.xaxis.reversed){
					$($this.element).find('input:checkbox[id=xAxisReverseOrder]').prop('checked', true);
				}
				
				// x-axis Tick Mark check
				if($this.options.configData.xaxis.tickWidth || $this.options.configData.xaxis.minorTickWidth){
						$($this.element).find('input:checkbox[id=xAxisTickMark]').prop('checked', true);
					}else{
						$($this.element).find('input:checkbox[id=xAxisTickMark]').prop('checked', false);
					}
				// single and multiple y-axis Title, Tick Mark, Reverse Order check
				if($this.options.configData.addMultipleYAxis){
					if($this.options.configData.yaxisList){
						$.each($this.options.configData.yaxisList, function(key,value){
							// title check
							if(value.title.text){
								$($this.element).find('input:checkbox[id=yAxisTitle'+key+']').prop('checked', true);
								
							}else{
								$($this.element).find("#y-axis"+key+" span:first-child").text($si.i18N.Window.yaxis+ key++);
								$($this.element).find("#y-axis"+key+" :input").val($si.i18N.Window.yaxis+"-"+  key++);
							}
							//Tick Mark Check
							if(value.tickWidth || value.minorTickWidth){
									$($this.element).find('input:checkbox[id=yAxisTickMark'+key+']').prop('checked', true);
								}else{
									$($this.element).find('input:checkbox[id=yAxisTickMark'+key+']').prop('checked', false);
							}
							// Reverse Order Check
							if(value.reversed == "true"){
								$($this.element).find('input:checkbox[id=yAxisReverseOrder'+key+']').prop('checked', true);
							}
							if($this.options.configData.xaxis.gridLineWidth || value.gridLineWidth){
								$($this.element).find('input:checkbox[id=grid]').prop('checked', true);
							}else{
								$($this.element).find('input:checkbox[id=grid]').prop('checked', false);
							}
						
						});
					}			
				}else{
					if($this.options.configData.yaxis.title.text){
						$($this.element).find('input:checkbox[id=yAxisTitle]').prop('checked', true);
					}else{
						$($this.element).find("#y-axis span:first-child").text($si.i18N.Window.yaxis);
						$($this.element).find("#y-axis :input").val($si.i18N.Window.yaxis);
					}
					if($this.options.configData.yaxis.tickWidth || $this.options.configData.yaxis.minorTickWidth){
						$($this.element).find('input:checkbox[id=yAxisTickMark]').prop('checked', true);
					}else{
						$($this.element).find('input:checkbox[id=yAxisTickMark]').prop('checked', false);
					}
					if($this.options.configData.yaxis.reversed){
						$($this.element).find('input:checkbox[id=yAxisReverseOrder]').prop('checked', true);
					}
					
					if($this.options.configData.xaxis.gridLineWidth || $this.options.configData.yaxis.gridLineWidth){
						$($this.element).find('input:checkbox[id=grid]').prop('checked', true);
					}else{
						$($this.element).find('input:checkbox[id=grid]').prop('checked', false);
					}
				}
				
				
				if($this.options.configData.chartSeries.defaultSeriesProperties.dataLabels.enabled){
					$($this.element).find('input:checkbox[id=dataLabel]').prop('checked', true);
				}else{
					$($this.element).find('input:checkbox[id=dataLabel]').prop('checked', false);
				}
				
				if($this.options.configData.chartDetails.title || $this.options.configData.chartDetails.subtitle){
					$($this.element).find('input:checkbox[id=plotAreaTitle]').prop('checked', true);
				}else{
					$($this.element).find('input:checkbox[id=plotAreaTitle]').prop('disabled', true);
				}
			},
			
			updateChartTitleDrawerSettings : function(value){
				var $this = this;
				if(value){
					$($this.element).find('input:checkbox[id=plotAreaTitle]').prop('checked', true);
				}else{
					$($this.element).find('input:checkbox[id=plotAreaTitle]').prop('checked', false);
				}
			},
			
			updateChartDataLabelDrawerSettings : function(value){
				var $this = this;
				if(value){
					$($this.element).find('input:checkbox[id=dataLabel]').prop('checked', true);
				}else{
					$($this.element).find('input:checkbox[id=dataLabel]').prop('checked', false);
				}
			},

			getDrawerFavoriteSettings : function() {

				var $this = this;
				var xyChartDrawerFavorite = {
					"plotItems" : $this.options.plotItems,
					"xAxisItems" : $this.options.xAxisItems,
					"yAxisItemsFirst" : $this.options.yAxisItemsFirst,
					"yAxisItemsSecondary" : $this.options.yAxisItemsSecondary,
				};


			$si.Logger('favorite').debug("xy chart drawer favorite ");

					return xyChartDrawerFavorite;
			},

			applyDrawerFavoriteSettings : function(favoriteDrawer) {
				var $this = this;
				var flag= false;
				if(favoriteDrawer.plotItems){
					flag= true;
					$.map(favoriteDrawer.plotItems, function (value,item) {
						if(value){
							$($this.element).find('input:checkbox[id='+item+']').prop('checked', true);
						}else{
							$($this.element).find('input:checkbox[id='+item+']').prop('checked', false);
						}    
						});
				}
				if(favoriteDrawer.xAxisItems){
					flag= true;
					$.map(favoriteDrawer.xAxisItems, function (value,item) {
						if(value){
							$($this.element).find('input:checkbox[id='+item+']').prop('checked', true);
						}else{
							$($this.element).find('input:checkbox[id='+item+']').prop('checked', false);
						}    
						});
				}
				if(favoriteDrawer.yAxisItemsFirst){
					flag= true;
					$.map(favoriteDrawer.yAxisItemsFirst, function (value,item) {
						if(value){
							$($this.element).find('input:checkbox[id='+item+']').prop('checked', true);
						}else{
							$($this.element).find('input:checkbox[id='+item+']').prop('checked', false);
						}    
						});
				}
				if(favoriteDrawer.yAxisItemsFirst){
					flag= true;
					$.map(favoriteDrawer.yAxisItemsSecondary, function (value,item) {
						if(value){
							$($this.element).find('input:checkbox[id='+item+']').prop('checked', true);
						}else{
							$($this.element).find('input:checkbox[id='+item+']').prop('checked', false);
						}    
						});
				}
				if(flag){
					this._trigger("applydrawersettings",null,{data: favoriteDrawer});
				}
				$si.Logger('favorite').debug("applying xy chart drawer favorite "  );

			},
			//method for clear favorite
			clearDrawerSetting :function(){
				var $this = this;
				  if($($this.element).find("#contentDrawer")){
		         	   $($this.element).find("#contentDrawer").empty();
		            }
			}

		});
	});