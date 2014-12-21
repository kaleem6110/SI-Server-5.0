/**
 * About Window.
 */
define([
	'jquery',
    'jquery-ui',
    'common/com.spacetimeinsight.viewer.ui.window',
	'kendo',
	'viewer/com.spacetimeinsight.i18N.application',
    'viewer/com.spacetimeinsight.i18N.application.regional',
],function($){
		$.widget('spacetimeinsight.siViewerAboutWindow', $.spacetimeinsight.siViewerWindow,{
			options : {
				windowAttributes : {
					height		: "150px",
					width 		: "412px",
					modal		: true,
					draggable	: false,
					minHeight	: "150px",
					minWidth 	: "412px",
					maxHeight	: "150px",
					maxWidth 	: "412px",
					resizable: false,
					
				},
				windowTools 			: [],
				title 					: "About",
				actions 	  		    : ["Close"],
				
				
				
				
			},
			
			pluginName					: 'siViewerAboutWindow',

		  INNER_DATA :  kendo.template("<div style='height:30px;border-bottom: 1px solid black'>"
										+"<div style='position:relative; top:5px; left:60px; width:300px; height:24px' class='logoAbout' /></div></div>"
										+"<div style='height:103px'>"
										+"<div style='position:relative;top:3px;left:14px; width:120px;display: inline-block' class='siServerLogo' />"
										+"<div align='left' style='font-family:arial; font-size:15px;color:black;display: inline-block;padding-top:12px'><b>" + $si.i18N.Application.aboutWindow.title + "</b><br><b>" + $si.i18N.Application.aboutWindow.version + "</b>&nbsp;" + $si.viewer.buildInfo.buildVersion + "<br><b>" + $si.i18N.Application.aboutWindow.buildid + "</b>&nbsp;" + $si.viewer.buildInfo.buildId + "<br></div></div>"
										+"<div style='font-family:arial; font-size:12px;color:black;padding-left:25px;border-top: 1px solid black'>© Copyright 2008-2014 Space-Time Insight ®. All rights reserved.</div>"),
			
			
			_create: function(){
				var $this = this;
				//used in event handling. Each event is prefix by plugin name
				this.widgetEventPrefix = this.pluginName + "_";
				this.options.id = $(this.element).attr("id");
				
				this._super();
				//$(this.element).data("kendoWindow").center();
				this.openAtCenter();
				this.element.parent().addClass("aboutHelp");
				this.element.css("border-radius","0px");	
				$(".k-overlay").css("z-index","9000001");
				this.element.parent().find(".k-window-titlebar").addClass("aboutHelp");
				this.element.parent().find(".k-window-title").css("left" , "5px");
				$(".sti-window-google-earth").hide();
				this.element.append(this.INNER_DATA);
				this.options.onCloseWindow = function(e,data){
					$(".sti-window-google-earth").show();
				};
				
			},
			
			openAtCenter : function() {
				  var aboutWindow = $(this.element).data("kendoWindow").wrapper; 
				  var width = aboutWindow.width();
				  var height = aboutWindow.height() + 30;
				  var left = (screen.width/2)-(width/2) + "px";
				  var top = (screen.height/2)- height + "px";
				  aboutWindow.css({left : left ,top : top});
			},
			
	});
});