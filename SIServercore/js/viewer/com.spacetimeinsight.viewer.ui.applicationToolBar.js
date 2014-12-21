
define([
    'jquery',
    'jquery-ui',
    'siViewerData',
    'common/com.spacetimeinsight.viewer.ui.windowToolBar',
    'viewer/com.spacetimeinsight.viewer.cloneUtil',
],function($){

	$.widget('spacetimeinsight.siViewerApplicationToolBar',$.spacetimeinsight.siViewerWindowToolBar,{
		options : {
			alertAcknowledgeWidget	   : "siViewerAlertAcknowledge",
			alertAcknowledgeWidgetJS   : "viewer/com.spacetimeinsight.viewer.ui.alertAcknowledge",
			
			applicationPreferencesWidget : "siViewerApplicationPreferences",
			applicationPreferencesWidgetJS : "viewer/com.spacetimeinsight.viewer.ui.applicationPreferences",
			
			timeFilterWidget : "siViewerTimeFilter",
			timeFilterWidgetJS : "timeFilter/com.spacetimeinsight.viewer.ui.timeFilter",

			toggleDelay : 500,
			showToolbar	: false,
			messageScrollSpeed : 0,
			messageScrollCount : 0,
			zoomRange : 0,
			locationMap : {},
		},
		pluginName:"siViewerApplicationToolBar",

		TICKER_DIV : kendo.template("<div class='h-divider'></div><div id='#= id #' class='#= css #'></div>"),
		
		ALERT_COUNTER : kendo.template("<span id ='#= id #' class = '#= className#' ></span>"),

		_create : function(){		
			this._super();
		},
		
		
		_createControls : function(){
			this._super();
			this._createTickerControl();
			this._updateAlertControls();
		},
		
		_updateAlertControls : function(){
			var alertTool = $(this.element).find("#alertTool");
			alertTool.attr("disabled","disabled");
			alertTool.addClass("alert-icon-disabled");
			alertTool.parent().append(this.ALERT_COUNTER({ id : "alertTextSpan" , className : "alert-textbox"}));
			alertTool.parent().addClass("p-alertbox");
			alertTool.parent().find(".alert-textbox").css("display", "none");
			
			var speakerTool = $(this.element).find("#speakerTool");
			speakerTool.addClass("alarm-enabled");
			this._enableDisableAlerts();
		},
		
		_bindControls : function(){
			
			this._super();
			
			$si.viewer.alertDataModel.bind("change", this._alertModelChangeListener.bind(this));
			
			this.options.onToolBarBtnClick = this._toolBarBtnClickListener.bind(this);
			
			$si.init.fetchActiveAndAckAlerts();
			
			$si.init.initializeAlertWS();

		},
		
		_enableDisableAlerts : function(){
			var $this = this;
			var alertTool = this.element.find("#toolBar").find("#leftToolbarDiv").find("#alertTool");
			if(parseInt($si.viewer.alertDataModel.get("noOfAlerts")) == 0){
				alertTool.parent().find(".alert-textbox").css("display", "none");
				//alertTool.parent().find(".alert-textbox")[0].innerHTML = "";
				alertTool.removeClass("alert-icon-enabled");
				alertTool.addClass("alert-icon-disabled");	
				$si.viewer.alertDataModel.set("isEnabled" , "false");
			}else{
				alertTool.parent().find(".alert-textbox").css("display", "block");
				alertTool.parent().find(".alert-textbox")[0].innerHTML = $si.viewer.alertDataModel.get("noOfAlerts");
				alertTool.removeAttr('disabled');
				alertTool.removeClass("alert-icon-disabled");
				alertTool.addClass("alert-icon-enabled");
			}
		},
		
		
		_createTickerControl : function(){
			var $this = this;
			
			$(this.element).append(this.TICKER_DIV({css:'draggableDiv', id:'draggableDiv'}));
			
			var marqueeDiv = $(this.element).find("#draggableDiv");
			marqueeDiv.append(this.TICKER_DIV({css:'mainMarqueeDiv', id:'mainMarqueeDiv'}));
			marqueeDiv.append('<audio id="alarm" src="'+$si.viewer.serverUrl+$si.viewer.alertConfigData.alertFile+'" type="text/mpeg" style="display:inline-block;" ></audio>');
			var mainMarqueeDiv = $(this.element).find("#mainMarqueeDiv");
			var alarm = document.getElementById("alarm");
			
			marqueeDiv.draggable({
				handle: '#marqueediv'
			}).resizable({
			    handles: 'e,w',
				minWidth: 250,
            	resize: function(e, ui) {
               		var offsetmdiv = $("#draggableDiv").offset();
					var divLength = $('#leftToolbarDiv').width() + 10;
					var parentWidth = $("#draggableDiv").parent().width();
					var width = $("#draggableDiv").width() - (divLength - offsetmdiv.left);
					var defaultRight = parentWidth - 5;
					if( (offsetmdiv.left)  < divLength){
						$("#draggableDiv").css({left:divLength});
						$("#draggableDiv").css("width",width);
					}
					if((offsetmdiv.left + $("#draggableDiv").width()) > parentWidth){
						
						$("#draggableDiv").css("width",defaultRight - offsetmdiv.left);
					}
				},
			});	
			marqueeDiv.draggable( "disable" );
			
		},
		
		_toolBarBtnClickListener : function(event,data){
			var toolId = data.event.target.id;
			if(toolId == 'alertTool'){
				this.openAlertsWindow();
			}
			else if(toolId == 'speakerTool'){
				var speakerTool = $(this.element).find("#speakerTool");
				var isEnable = speakerTool.hasClass("alarm-disabled");
				this.enableAudioAlarm(isEnable);
			}else if(toolId == "settingsTool"){
				this.openApplicationPreferences();
			}else if(toolId == "cloneTool"){
				this.cloneApplication();
			}else if(toolId == "timeTool"){
				this.openTimeFilter();
			}
		},
		
		cloneApplication: function(){
			$si.cloneUtil.cloneApplication();
		},
		
		openAlertsWindow : function(){
			var params = {
					pluginName : this.options.alertAcknowledgeWidget,
					pluginJS   : this.options.alertAcknowledgeWidgetJS,
					windowId   : "alertAcknowledgeWindow",
					parameters : {shimRequired : true,},
			};
			
			$si.windowUtil.openWindow(params);
		},
		
		openApplicationPreferences : function(){
			var params = {
					pluginName : this.options.applicationPreferencesWidget,
					pluginJS   : this.options.applicationPreferencesWidgetJS,
					windowId   : "applicationPreferencesWindow",
					parameters : {shimRequired : true,},
			};
			
			$si.windowUtil.openWindow(params);
		},
		enableAudioAlarm : function(isEnable) {
			var speakerTool = $(this.element).find("#speakerTool");
			var alarmTool = document.getElementById("alarm");
			if(isEnable) {
				$si.viewer.alertDataModel.set("isAlarmEnabled",true);
				speakerTool.addClass("alarm-enabled");
				speakerTool.removeClass("alarm-disabled");
			} else {
				$si.viewer.alertDataModel.set("isAlarmEnabled",false);
				alarmTool.pause();
				alarmTool.currentTime=0;
				speakerTool.removeClass("alarm-enabled");
				speakerTool.addClass("alarm-disabled")
			}
		},
		
		_alertModelChangeListener : function(e){
			var $this = this;
			var mainMarqueeDiv = $(this.element).find("#mainMarqueeDiv");
			var alertTool = $(this.element).find("#alertTool");
			if(e.action == "add" && e.field == "alertMessage"){
				var toggleButton = $this.element.parent().find("#si-viewer-app-title_toggle_button");
				if(toggleButton.hasClass("off")){
					toggleButton.removeClass("off");
					toggleButton.trigger("click");
				}
				this.showAlertMessagesOnTicker(e.items);
			}else if(e.action == "remove" && e.field == "alertMessage"){
				if(e.items){
					mainMarqueeDiv.find("marquee").find("#"+e.items[0].alertTranId).remove();
				}
			}
			
			if(e.action == "add" && e.field == "alertAckMessage"){
				if(e.items){
					mainMarqueeDiv.find("marquee").find("#"+e.items[0].alertTranId).remove();
				}
				if(parseInt($si.viewer.alertDataModel.get("noOfAlerts")) == 0){
					alertTool.parent().find(".alert-textbox").css("display", "none");
					alertTool.parent().find(".alert-textbox")[0].innerHTML = "";
					alertTool.removeClass("alert-icon-enabled");
					alertTool.addClass("alert-icon-disabled");	
					$si.viewer.alertDataModel.set("isEnabled" , "false");
				}else{
					alertTool.parent().find(".alert-textbox")[0].innerHTML = $si.viewer.alertDataModel.get("noOfAlerts");
				}
			}
			
			
			if($si.viewer.alertDataModel.get("isEnabled") == "false"){
					alertTool.attr("disabled","disabled");				
			}else if($si.viewer.alertDataModel.get("isEnabled") == "true"){
				alertTool.parent().find(".alert-textbox").css("display", "block");
				alertTool.parent().find(".alert-textbox")[0].innerHTML = $si.viewer.alertDataModel.get("noOfAlerts");
				alertTool.removeAttr('disabled');
				alertTool.removeClass("alert-icon-disabled");
				alertTool.addClass("alert-icon-enabled");
			}
		},
		
		showAlertMessagesOnTicker : function(items){
			if(items && items.length > 0){
				var $this = this;
				var msg;
				var color;
				var message;
				var lastMessage;
				var mainMarqueeDiv = $(this.element).find("#mainMarqueeDiv");
				var alarm = document.getElementById("alarm");
				$.each(items,function(index,item){
					if(item && (item.mode.indexOf("::ticker::")>=0) || (item.mode.indexOf("::Ticker::")>=0)){
						msg = item.message;
						color = item.priority.color;
						$this.options.locationMap[item.alertTranId] = item.location;
						message = null;
						while(color.length < 6) {
							color = "0"+color;
						}
						lastMessage = mainMarqueeDiv.find("marquee").html() ? mainMarqueeDiv.find("marquee").html() : "";
						if(lastMessage){
							message = "<span class='marqueeSpan' id = '" + item.alertTranId + "'><font color='"+color+"'>" + msg +"<span class='alertDelimiter'>&nbsp;&nbsp;|&nbsp;&nbsp;<span></font></span>" + lastMessage+"";
						}else{
							message = "<span class='marqueeSpan' id = '" + item.alertTranId + "'><font color='"+color+"'>" +msg +"</font></span>";
						}
						$("#alertMarquee").remove();
						if($si.viewer.preferenceValues.messageScrollSpeed && $si.viewer.preferenceValues.messageScrollCount){
							$this.options.messageScrollSpeed = $si.viewer.preferenceValues.messageScrollSpeed;
							$this.options.messageScrollCount = $si.viewer.preferenceValues.messageScrollCount;
						}else{
							$this.options.messageScrollSpeed = $si.viewer.alertConfigData.messageScrollSpeed;
							$this.options.messageScrollCount = $si.viewer.alertConfigData.messageScrollCount;
						}
						mainMarqueeDiv.append('<marquee  scrollamount='+$this.options.messageScrollSpeed+' id="alertMarquee" loop="'+$this.options.messageScrollCount+'" onmouseover="this.stop();" onmouseout="this.start();" class="marqueeDivStyle">' + message + '</marquee>');
						$(".marqueeSpan").on('dblclick',function(event,ui){
							var location = $this.options.locationMap[$(event.currentTarget).attr('id')];
							if(location){
								var locationArray = location.split(',');
								var lat = locationArray[1];
								var lng = locationArray[0];
								if($si.viewer.preferenceValues.zoomRange){
									$this.options.zoomRange = $si.viewer.preferenceValues.zoomRange;
								}else{
									$this.options.zoomRange = $si.viewer.alertConfigData.zoomRange;
								}
								var lookatStr = lng+","+lat+","+$this.options.zoomRange+",0,0,0,Absolute";
								$($si.viewer).trigger("setCurrentView", [lookatStr]);
							}
						});
					}
					if((item.mode.indexOf("::alarm::")>=0) || (item.mode.indexOf("::Alarm::")>=0)){
						alarm.load();
						if($si.viewer.alertDataModel.isAlarmEnabled)
							alarm.play();
					}
				});
			}
		},
		
		openTimeFilter : function(){
			var timeRangeParams =$si.viewer.globaltimerange;
			var params = {
				pluginName : this.options.timeFilterWidget,
				pluginJS : this.options.timeFilterWidgetJS,
				windowId : "timeFilterWindow",
				parameters : {	title : "Global time filter",
				                fromGlobal   :true,
				                shimRequired : true,
								layerTimeProperties: {"timeRange":timeRangeParams},
								onSetCriteria : function(event,data){
														$si.routes.setGlobalTimeCriteria(data);
														},
							}			
				
						};
			
			$si.windowUtil.openWindow(params);
			},
		
		

	});

});