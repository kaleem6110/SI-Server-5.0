define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.drawer',
    'window/com.spacetimeinsight.i18N.window',
    'window/com.spacetimeinsight.i18N.window.regional',
],function($){

	$.widget('spacetimeinsight.siViewertreemapChartDrawer',$.spacetimeinsight.siViewerDrawer,{
		options : {
		toggleDelay : 200,
		actionButtons	: ["Apply"],
		needTabStrip	: true,
		},
		pluginName:"siViewertreemapChartDrawer",
		
		
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
			$(this.element).addClass("xy-chart-drawer").css({"height":"30%"});
			this._super();
			this.options.contentDiv = $(this.element).find(".sti-window-drawer-content");
			this.options.contentDiv.append(this.GENERIC_COMPONENT({id:"contentDrawer",cssClass:"contentDrawer",content:""}));
			this.options.actionButtonClicked = function(event,data){
													if(data.buttonId == "Apply"){
														$this.onApplyButtonClicked();
													}
										};
			
			this._trigger("onCreationComplete",{id:this.options.id,domElement:$(this.element)});
			
			
		},
		setHideColumnList : function(configData){
			var drawer = $(this.element).find("#contentDrawer");
			drawer.append(this.GENERIC_COMPONENT({id:"plotArea",cssClass:"section-header",content:"Plot Area"}) 
					+ this.GENERIC_COMPONENT({id:"plotArea",cssClass:"section-content",	content: 
					  this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:"Titles", id:"",className:"plotCheckbox",style:"",value:"Titles"}) + "Titles"})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:"MajorTicks", id:"",className:"plotCheckbox",style:"",value:"Major Ticks"}) + "Major Ticks"})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:"MinorTicks", id:"",className:"plotCheckbox",style:"",value:"Minor Ticks"}) + "Minor Ticks"})})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""}));
			
			//if(configData.chartDetails){
				//if(configData.chartDetails.title || configData.chartDetails.subtitle)
					drawer.find("input[name=Titles]").prop('checked', true);
			//}
			//if(configData.verticalAxis.minorTicks){
				drawer.find("input[name=MinorTicks]").prop('checked', true);
			//}
			//if(configData.verticalAxis.majorTicks){
				drawer.find("input[name=MajorTicks]").prop('checked', true);
			//}
			
			$(this.element).hide();
		},
		applyDrawerSettings: function(configData) {
			if(configData.chartDetails.title || configData.chartDetails.subtitle){
				$('input:checkbox[id=chartTitle]',this.element).prop('checked', true);
			} else {
				$('input:checkbox[id=chartTitle]',this.element).prop('disabled', true);
			}
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