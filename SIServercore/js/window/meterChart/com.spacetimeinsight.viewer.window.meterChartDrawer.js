define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.drawer',
    'window/com.spacetimeinsight.i18N.window',
    'window/com.spacetimeinsight.i18N.window.regional',
],function($){

	$.widget('spacetimeinsight.siViewerMeterChartDrawer',$.spacetimeinsight.siViewerDrawer,{
		options : {
		toggleDelay : 200,
		actionButtons	: ["Apply"],
		needTabStrip	: true,
		},
		pluginName:"siViewerMeterChartDrawer",
		
		
		GENERIC_COMPONENT : kendo.template("<div id ='#= id #' class ='#= cssClass #'>#= content #</div>"),
		INPUT_BOX :  kendo.template("<input type='#= type #' value='#= value #' name='#= name #'  id ='#= id #' style ='#= style #' class ='#= className #'/>"),
		SPAN_COMPONENT : kendo.template("<span style ='#= style #'>#= spanContent #</span>"),
		LIST_COMPONENT : kendo.template("<ul id ='#= id #' class ='#= className #'></ul>"),
		plotItems: null,
		xAxisItems: null,
		yAxisItemsFirst:null,
		yAxisItemsSecondary:null,
		
		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			$(this.element).addClass("xy-chart-drawer");
			this._super();
			this.options.contentDiv = $(this.element).find(".sti-window-drawer-content");
			this.options.contentDiv.append(this.GENERIC_COMPONENT({id:"contentDrawer",cssClass:"contentDrawer",content:""}));
			
			var drawer = $(this.element).find("#contentDrawer");
			drawer.append(this.GENERIC_COMPONENT({id:"plotArea",cssClass:"section-header",content:"Plot Area"}) 
					+ this.GENERIC_COMPONENT({id:"plotArea",cssClass:"section-content",	content: 
					  this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:$si.i18N.Window.grid, id:"",className:"plotCheckbox",style:"",value:$si.i18N.Window.grid}) + $si.i18N.Window.grid})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:$si.i18N.Window.titles, id:"",className:"plotCheckbox",style:"",value:$si.i18N.Window.titles}) + $si.i18N.Window.titles})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:$si.i18N.Window.guildlines, id:"",className:"plotCheckbox",style:"",value:$si.i18N.Window.guildlines}) + $si.i18N.Window.guildlines})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:$si.i18N.Window.dtLabel, id:"",className:"plotCheckbox",style:"",value:$si.i18N.Window.dataLabel}) + $si.i18N.Window.dataLabel}) })
					+ this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""}));
			
			drawer.append( this.GENERIC_COMPONENT({id:"x-axis",cssClass:"section-header",content: this.SPAN_COMPONENT({ style:"",spanContent: $si.i18N.Window.xaxis}) + this.SPAN_COMPONENT({ style:"margin-left: 75px;",spanContent: this.INPUT_BOX({type:"text",name:"",value:"", id:"",className:"",style:"width:85px"})})  })
					+ this.GENERIC_COMPONENT({id:"x-axis",cssClass:"section-content",	content:
					  this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"",name:$si.i18N.Window.title,className:"xAxisCheckbox",style:"",value:$si.i18N.Window.title}) + $si.i18N.Window.title})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"",name:$si.i18N.Window.tckMarks,className:"xAxisCheckbox",style:"",value:$si.i18N.Window.tickMarks}) + $si.i18N.Window.tickMarks})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"",name:$si.i18N.Window.revOrder,className:"xAxisCheckbox",style:"",value:$si.i18N.Window.reverseOrder}) + $si.i18N.Window.reverseOrder}) })
					+ this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""}));
			
			for(var i=1;i<3;i++){
			drawer.append( this.GENERIC_COMPONENT({id:"y-axis",cssClass:"section-header",content: this.SPAN_COMPONENT({ style:"",spanContent: $si.i18N.Window.yaxis+ " " + "#"+ i}) + this.SPAN_COMPONENT({ style:"margin-left: 60px;",spanContent: this.INPUT_BOX({type:"text",name:"", value:"", id:"",className:"",style:"width:85px"})})  })
					+ this.GENERIC_COMPONENT({id:"y-axis",cssClass:"section-content",	content:
					  this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"",name:$si.i18N.Window.title,className:"yAxisCheckbox"+i,style:"",value:$si.i18N.Window.title}) + $si.i18N.Window.title})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"",name:$si.i18N.Window.tckMarks,className:"yAxisCheckbox"+i,style:"",value:$si.i18N.Window.tickMarks}) + $si.i18N.Window.tickMarks})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"",name:$si.i18N.Window.revOrder,className:"yAxisCheckbox"+i,style:"",value:$si.i18N.Window.reverseOrder}) + $si.i18N.Window.reverseOrder}) })
					+ this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""}));
			}
			
			drawer.find(".horizontal-splitter").last().remove();
			/*drawer.append( this.GENERIC_COMPONENT({id:"x-axis",cssClass:"section-header",content: this.SPAN_COMPONENT({ style:"",spanContent: $si.i18N.Window.yaxis}) + this.SPAN_COMPONENT({ style:"margin-left: 75px;",spanContent: this.INPUT_BOX({type:"text", id:"",className:"",style:"width:85px"})})  })
					+ this.GENERIC_COMPONENT({id:"x-axis",cssClass:"section-content",	content:
					  this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"",className:"",style:""}) + $si.i18N.Window.title})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"",className:"",style:""}) + $si.i18N.Window.tickMarks})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox", id:"",className:"",style:""}) + $si.i18N.Window.reverseOrder})
					}));
			*/
			
			 	
			$(this.element).hide();
			this.options.actionButtonClicked = function(event,data){
													if(data.buttonId == "Apply"){
														$this.onApplyButtonClicked(drawer);
													}
										};
			
			this._trigger("onCreationComplete",{id:this.options.id,domElement:$(this.element)});
			
			
		},
		
		onApplyButtonClicked : function(drawer){
			var $this = this;
			$this.plotItems =  $('.plotCheckbox:checked').map(function() {return this.value;}).get();
			$this.xAxisItems = $('.xAxisCheckbox:checked').map(function() {return this.value;}).get();
			
			$this.yAxisItemsFirst = $('.yAxisCheckbox1:checked').map(function() {return this.value;}).get();
			$this.yAxisItemsSecondary = $('.yAxisCheckbox2:checked').map(function() {return this.value;}).get();
			

		/*	var tableDrawerSettings = {
				"numberColumnFreezeValue"   : drawer.find("#columnFreezeNumericTextBox").val(), 
				"zoomAltitudeValue"         : drawer.find("#zoomNumericTextBox").val(),
				"showItemMapValue"			: drawer.find("#selectMapItem").val(),
				"panZoomMapValue"			: drawer.find("#zoomMap").val(),
				"showHideColumnValue"		: $this.selected,
			}
			this._trigger("applytabledrawersettings",null,{data: tableDrawerSettings});*/


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

		});
	});