define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.drawer',
    'siDropDownList',
    'window/com.spacetimeinsight.i18N.window',
    'window/com.spacetimeinsight.i18N.window.regional',
],function($){

	$.widget('spacetimeinsight.siViewerPieChartDrawer',$.spacetimeinsight.siViewerDrawer,{
		options : {
		toggleDelay : 200,
		actionButtons	: ["Apply"],
		needTabStrip	: true,
		},
		pluginName:"siViewerPieChartDrawer",
		
		
		GENERIC_COMPONENT : kendo.template("<div id ='#= id #' class ='#= cssClass #'>#= content #</div>"),
		INPUT_BOX :  kendo.template("<input type='#= type #' value='#= value #' name='#= name #'  id ='#= id #' style ='#= style #' class ='#= className #'/>"),
		SPAN_COMPONENT : kendo.template("<span style ='#= style #'>#= spanContent #</span>"),
		LIST_COMPONENT : kendo.template("<ul id ='#= id #' class ='#= className #'></ul>"),
		DROPDOWN_COMPONENT: kendo.template("<div id='#= id #' style='padding-top:10px;'><label style='padding-right: 5px;'>#= displayName #:</label><select id='#= fieldName #'></select></div>"),
		
		_create : function(){
			var $this = this;
			//used in event handling. Each event is prefix by plugin name
			this.widgetEventPrefix = this.pluginName + "_";
			this.options.id = $(this.element).attr("id");
			$(this.element).addClass("pie-chart-drawer");
			$(this.element).css("z-index","99999");
			//$(this.element).css("height","200px");
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
			this.options.contentDiv.css('padding','5px');
			this.options.contentDiv.css('width','240px');
			this.options.contentDiv.append(this.GENERIC_COMPONENT({id:"contentDrawer",cssClass:"contentDrawer",content:""}));
			tabStrip.data("kendoTabStrip").select(0);

			this.options.actionButtonClicked = function(event,data){
													if(data.buttonId == "Apply"){
														$this.onApplyButtonClicked();
													}
										};
			
			this._trigger("onCreationComplete",{id:this.options.id,domElement:$(this.element)});
			
			
		},
		
		
		onApplyButtonClicked : function(){
			var $this = this;
			var pieChartDrawerSettings = {};
			var checkbox,combo;
			pieChartDrawerSettings = this.getCurrentDrawerSettingsObject();
			//checkbox = $(this.element).find('input:checkbox[id=halfPie]');
			//pieChartDrawerSettings.showHalfPie = checkbox.is(':checked');
			//combo = $(this.element).find('#labelCombo').data('kendoDropDownList');
			//pieChartDrawerSettings.labelField = combo.dataItem().text;
			//combo = $(this.element).find('#valueCombo').data('kendoDropDownList');
			//pieChartDrawerSettings.valueField = combo.dataItem().text;
			this._trigger("applydrawersettings",null,{data: pieChartDrawerSettings});
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
			
		appendControlsToDrawer : function(configData){
				var $this = this;
				var drawer = $(this.element).find("#contentDrawer");
				var attributes = configData.metadata;
				var dropdownData = [];
				var attributeNames = Object.keys(attributes),labelFieldIndex,valueFieldIndex,labelCombo,valueCombo;
				drawer.append( this.GENERIC_COMPONENT({id:"drawerContent",cssClass:"section-header",content:"Settings"}) 
						+ this.GENERIC_COMPONENT({id:"plotArea",cssClass:"section-content",	content: 
						  this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:"Chart Title", id:"chartTitle",className:"plotCheckbox",style:"",value:"Chart Title"}) + "Chart Title"})
						+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:"Data Labels", id:"dataLabel",className:"plotCheckbox",style:"",value:"Data Labels"}) + "Data Labels"})
						+ this.GENERIC_COMPONENT({id:"",cssClass:"",content: this.INPUT_BOX({type:"checkbox",name:"Show Value As percent?", id:"percent",className:"plotCheckbox",style:"",value:$si.i18N.Window.guildlines}) + "Show Value As percent?"}) })  );
				
				/*$.each(attributeNames,function(index,element){
						if(element == configData.labelField){
							labelFieldIndex = index;
						}
						if(element == configData.valueField){
							valueFieldIndex = index;
						}
					 dropdownData.push({text: element});
					});
				 drawer.append(this.DROPDOWN_COMPONENT({id:'labelContainer',fieldName:'labelCombo',displayName: 'Label Field'}));
					labelCombo = drawer.find("#labelCombo");
					labelCombo.siDropDownList({
						dataSource : dropdownData,
						shimRequired:true,
						change: function(){
						},
						dataTextField: "text"
					});
				labelCombo.data('kendoDropDownList').select(labelFieldIndex);
				drawer.append(this.DROPDOWN_COMPONENT({id:'valueContainer',fieldName:'valueCombo',displayName: 'Value Field'}));
				valueCombo = drawer.find("#valueCombo");
				valueCombo.siDropDownList({
						dataSource : dropdownData,
						shimRequired:true,
						change: function(){
						},
						dataTextField: "text"
					});
				valueCombo.data('kendoDropDownList').select(valueFieldIndex);*/
				this.applyDrawerSettings(configData);	
				$(this.element).hide();		
			},
			
		applyDrawerSettings: function(configData){
				//var showHalfPie = configData.chartStyle == "semicircle" ? true : false;
				var valueType   = configData.valueType && configData.valueType == 'percent' ? true: false;
				var showTitle   = configData.showTitle ? true : false;
				if(!configData.chartDetails.title){
					$('input:checkbox[id=chartTitle]',this.element).prop('disabled', true);
				}else{
					$('input:checkbox[id=chartTitle]',this.element).prop('checked', showTitle);
				}
				
				$('input:checkbox[id=percent]',this.element).prop('checked', valueType);
				$('input:checkbox[id=dataLabel]',this.element).prop('checked', 
				configData.chartSeries.defaultSeriesProperties.dataLabels.enabled)
				;
				//$('input:checkbox[id=halfPie]',this.element).prop('checked', showHalfPie);
			},
			getDrawerFavoriteSettings : function() {
				var pieChartDrawerFavorite = this.getCurrentDrawerSettingsObject();
				return pieChartDrawerFavorite;
			},

			applyDrawerFavoriteSettings : function(favoriteDrawer) {
				var flag= false;
				var $this = this;
				$('input:checkbox[id=percent]',this.element).prop('checked', favoriteDrawer.showValueAsPercent);
				$('input:checkbox[id=dataLabel]',this.element).prop('checked', favoriteDrawer.showDataLabels);
				$('input:checkbox[id=chartTitle]',this.element).prop('checked', favoriteDrawer.showChartTitle);
				this._trigger("applydrawersettings",null,{data: favoriteDrawer});
			},
			getCurrentDrawerSettingsObject: function(){
				var checkbox;
				var pieChartDrawerSettings = {};
				checkbox = $(this.element).find('input:checkbox[id=chartTitle]');
				pieChartDrawerSettings.showChartTitle = checkbox.is(':checked');
				checkbox = $(this.element).find('input:checkbox[id=dataLabel]');
				pieChartDrawerSettings.showDataLabels = checkbox.is(':checked');
				checkbox = $(this.element).find('input:checkbox[id=percent]');
				pieChartDrawerSettings.showValueAsPercent = checkbox.is(':checked');
				return pieChartDrawerSettings;
			},
			updateChartTitleDrawerSettings : function(value){
				var $this = this;
				$($this.element).find('input:checkbox[id=chartTitle]').prop('checked', value);
				
			},
			
			updateChartDataLabelDrawerSettings : function(value){
				var $this = this;
				$($this.element).find('input:checkbox[id=dataLabel]').prop('checked', value);
			},
			
			clearDrawerSetting :function(){
				var $this = this;
				  if($($this.element).find("#contentDrawer")){
		         	   $($this.element).find("#contentDrawer").empty();
		            }
			}

		});
	});