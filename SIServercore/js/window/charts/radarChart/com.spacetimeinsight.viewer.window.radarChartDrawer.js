define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.drawer',
    'window/com.spacetimeinsight.i18N.window',
    'window/com.spacetimeinsight.i18N.window.regional',
],function($){

	$.widget('spacetimeinsight.siViewerRadarChartDrawer',$.spacetimeinsight.siViewerDrawer,{
		options : {
			toggleDelay : 200,
			actionButtons	: ["Apply"],
			needTabStrip	: true,
			axisAttrIndex	: 0,
			dataAttrIndex	: 0,
			groupByIndex	: 0,
			aggrTypeIndex	: 0,
		},
		pluginName:"siViewerRadarChartDrawer",

		GENERIC_COMPONENT : kendo.template("<div id ='#= id #' class ='#= cssClass #'>#= content #</div>"),
		INPUT_BOX :  kendo.template("<input type='#= type #' value='#= value #' name='#= name #'  id ='#= id #' style ='#= style #' class ='#= className #'/>"),
		DROPDOWN_COMPONENT: kendo.template("<div id='#= id #' style='padding-top:10px;'><label style='padding-right: 5px;'>#= displayName #:</label><select id='#= fieldName #'></select></div>"),

		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			$(this.element).addClass("radar-chart-drawer");
			$(this.element).css("height", "335px");
			$(this.element).css("z-index","99999");
			this._super();
			var tabStrip = this.options.tabStrip;
			tabStrip.kendoTabStrip({
				dataTextField: "text",
				dataContentField: "content",
				dataSource:
				[{
				text: $si.i18N.Window.displaySettings,
				content: this.GENERIC_COMPONENT({id:"contentDrawer",cssClass:"",content:""}),
				}]
			});
			this.options.contentDiv = $(this.element).find(".sti-window-drawer-content");
			this.options.contentDiv.css("padding","7px");
			tabStrip.data("kendoTabStrip").select(0);
			this.options.actionButtonClicked = function(event,data){
													if(data.buttonId == "Apply"){
														$this.onApplyButtonClicked();
													}
										};
			
			this._trigger("onCreationComplete",{id:this.options.id,domElement:$(this.element)});
		},

		setHideColumnList : function(configData){
			var $this = this;
			var drawer = $(this.element).find("#contentDrawer");
			var attributes = configData.metadata;
			var dropdownData = [];
			var groupByDropDownData = [];
			var attributeNames = Object.keys(attributes);
			drawer.append(this.GENERIC_COMPONENT({id:"plotArea",cssClass:"section-header",content:"Plot Area"}) 
					+ this.GENERIC_COMPONENT({id:"plotArea",cssClass:"section-content",	content: 
					  this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:$si.i18N.Window.titles, id:"chartTitle",className:"plotCheckbox",style:"",value:$si.i18N.Window.titles}) + $si.i18N.Window.titles})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:"Axis Titles", id:"axisTitle",className:"plotCheckbox",style:"",value:"Axis Titles"}) + "Axis Titles"})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:"Data Labels", id:"dataLabel",className:"plotCheckbox",style:"",value:"Data Labels"}) + "Data Labels"})
					+ this.GENERIC_COMPONENT({id:"",cssClass:"horizontal-splitter",content:""})}));
			
			/*$.each(attributes,function(index,element){
				if(element.type == 'java.lang.String') {
					groupByDropDownData.push({text: element.name});
				}
			});*/
			$.each(attributeNames,function(index,element){
				if(element == configData.axisAttribute){
					$this.options.axisAttrIndex = index;
				}
				if(element == configData.dataAttribute){
					$this.options.dataAttrIndex = index;
				}
				if(element == configData.groupBy){
					$this.options.groupByIndex = index;
				}
				dropdownData.push({text: element});
			});
			
			drawer.append(this.DROPDOWN_COMPONENT({id:'axisAttrContainer',fieldName:'axisAttrCombo',displayName: 'Axis Attribute'}));
			this.options.axisAttrCombo = drawer.find("#axisAttrCombo");
			this.options.axisAttrCombo.siDropDownList({
				dataSource : dropdownData,
				shimRequired:true,
				change: function(){
					$this.options.axisAttrIndex = this.selectedIndex;
				},
				dataTextField: "text"
			});

			drawer.append(this.DROPDOWN_COMPONENT({id:'dataAttrContainer',fieldName:'dataAttrCombo',displayName: 'Data Attribute'}));
			this.options.dataAttrCombo = drawer.find("#dataAttrCombo");
			this.options.dataAttrCombo.siDropDownList({
				dataSource : dropdownData,
				shimRequired:true,
				change: function(){
					$this.options.dataAttrIndex = this.selectedIndex;
				},
				dataTextField: "text"
			});

			drawer.append(this.DROPDOWN_COMPONENT({id:'groupByContainer',fieldName:'groupByCombo',displayName: 'Group By'}));
			this.options.groupByCombo = drawer.find("#groupByCombo");
			this.options.groupByCombo.siDropDownList({
				dataSource : dropdownData,
				shimRequired:true,
				change: function(){
					$this.options.groupByIndex = this.selectedIndex;
				},
				dataTextField: "text"
			});

			drawer.append(this.DROPDOWN_COMPONENT({id:'aggrTypeContainer',fieldName:'aggrTypeCombo',displayName: 'Aggregate Type'}));
			this.options.aggrTypeCombo = drawer.find("#aggrTypeCombo");
			this.options.aggrTypeCombo.siDropDownList({
				dataSource : [{text: "Total"}, {text: "Average"}],
				shimRequired:true,
				change: function(){
					$this.options.aggrTypeIndex = this.selectedIndex;
				},
				dataTextField: "text"
			});

			this.applyDrawerSettings(configData);
			$(this.element).hide();
		},
		
		onApplyButtonClicked : function(){
			this._trigger("applydrawersettings",null,{data: this._getCurrentDrawerSettingsObject()});
			this.toggle();
		},

		_getCurrentDrawerSettingsObject: function(){
			var radarChartDrawerSettings = {};
			var checkbox;
			var comboText;
			checkbox = $(this.element).find('input:checkbox[id=chartTitle]');
			radarChartDrawerSettings.showChartTitle = checkbox.is(':checked');

			checkbox = $(this.element).find('input:checkbox[id=axisTitle]');
			radarChartDrawerSettings.showAxisTitle = checkbox.is(':checked');

			checkbox = $(this.element).find('input:checkbox[id=dataLabel]');
			radarChartDrawerSettings.showDataLabels = checkbox.is(':checked');

			comboText = this.options.axisAttrCombo.data('kendoDropDownList').dataItem().text;
			radarChartDrawerSettings.axisAttrObj = {index: this.options.axisAttrIndex, name: comboText};

			comboText = this.options.dataAttrCombo.data('kendoDropDownList').dataItem().text;
			radarChartDrawerSettings.dataAttrObj = {index: this.options.dataAttrIndex, name: comboText};

			comboText = this.options.groupByCombo.data('kendoDropDownList').dataItem().text;
			radarChartDrawerSettings.groupByObj = {index: this.options.groupByIndex, name: comboText};

			comboText = this.options.aggrTypeCombo.data('kendoDropDownList').dataItem().text;
			radarChartDrawerSettings.aggrTypeObj = {index: this.options.aggrTypeIndex, name: comboText};

			return radarChartDrawerSettings;
		},

		getDrawerFavoriteSettings: function(){
			return this._getCurrentDrawerSettingsObject();
		},

		applyDrawerSettings: function(configData) {
			var showTitle   = configData.showTitle ? true : false;
			if(configData.chartDetails.title){
				$('input:checkbox[id=chartTitle]',this.element).prop('checked', showTitle);
			}else{
				$('input:checkbox[id=chartTitle]',this.element).prop('disabled', true);
			}
			
			var showAxisTitle = false;
			if(configData.xaxis || configData.yaxis) {
				showAxisTitle = configData.xaxis.title || configData.yaxis.title;
				$(this.element).find('input:checkbox[id=axisTitle]').prop('checked', showAxisTitle);
			} else {
				$(this.element).find('input:checkbox[id=axisTitle]').prop('disabled', true);
			}
			$(this.element).find('input:checkbox[id=dataLabel]').prop('checked', configData.chartSeries.defaultSeriesProperties.dataLabels.enabled);

			this.options.axisAttrCombo.data('kendoDropDownList').select(this.options.axisAttrIndex);
			this.options.dataAttrCombo.data('kendoDropDownList').select(this.options.dataAttrIndex);
			this.options.groupByCombo.data('kendoDropDownList').select(this.options.groupByIndex);

			this.options.aggrTypeIndex = (configData.aggregateType == "Total") ? 0 : 1;
			this.options.aggrTypeCombo.data('kendoDropDownList').select(this.options.aggrTypeIndex);
		},

		applyDrawerFavoriteSettings: function(favoriteDrawer) {
			this.options.drawerFavouriteObj = favoriteDrawer;
			$(this.element).find('input:checkbox[id=chartTitle]').prop('checked', favoriteDrawer.showChartTitle);
			$(this.element).find('input:checkbox[id=axisTitle]').prop('checked', favoriteDrawer.showAxisTitle);
			$(this.element).find('input:checkbox[id=dataLabel]').prop('checked', favoriteDrawer.showDataLabels);

			if(this.options.axisAttrCombo) {
				this.options.axisAttrCombo.data('kendoDropDownList').select(favoriteDrawer.axisAttrObj.index);
			}
			if(this.options.dataAttrCombo) {
				this.options.dataAttrCombo.data('kendoDropDownList').select(favoriteDrawer.dataAttrObj.index);
			}
			if(this.options.groupByCombo) {
				this.options.groupByCombo.data('kendoDropDownList').select(favoriteDrawer.groupByObj.index);
			}
			if(this.options.axisAttrCombo) {
				this.options.aggrTypeCombo.data('kendoDropDownList').select(favoriteDrawer.aggrTypeObj.index);
			}

			this._trigger("applydrawersettings",null,{data: favoriteDrawer});
		},

		updateChartTitleDrawerSettings : function(value){
			$(this.element).find('input:checkbox[id=chartTitle]').prop('checked', value);
			
		},

		updateChartDataLabelDrawerSettings : function(value){
			$(this.element).find('input:checkbox[id=dataLabel]').prop('checked', value);
		},

		//method for clear favorite
		clearDrawerSetting :function(){
			if($(this.element).find("#contentDrawer")){
        		$(this.element).find("#contentDrawer").empty();
        	}
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