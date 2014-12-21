/**
 * 
 */

define(['jquery'],function() {

	$si.windowUtil = {
			
			WINDOW_DIV : kendo.template("<div id='#= windowId #'></div>"),
			
			openWindow : function(windowParams,closeIfExists){
				if(windowParams && windowParams.pluginName && windowParams.pluginJS){
					if(windowParams.windowId){
						windowParams.windowId = windowParams.windowId.removeSpecialCharacter();
					}
					if($("#"+windowParams.windowId +".sti-window").length > 0){
						if(closeIfExists){
							this.closeWindow(windowParams.windowId, windowParams.pluginName);
						}else{
							this.bringWindowToFront(windowParams.windowId);
							return;
						}
					}
					requirejs([windowParams.pluginJS],function(){
						$(document.body).append($si.windowUtil.WINDOW_DIV({
														windowId : windowParams.windowId,
													}));
						
						$(document.body).find("#" + windowParams.windowId)[windowParams.pluginName](windowParams.parameters);
					});
				}
			},
			
			closeWindow : function(windowId,pluginName){
    	    	if(windowId && pluginName){
    	    		if(windowId){
    	    			windowId = windowId.removeSpecialCharacter();
					}
					$("#" + windowId +".sti-window")[pluginName]("closeWindow");
    	    	  }else if(windowId && $si.viewer.windowMetadataModel.arrWindowMetadata) {
						$.each($si.viewer.windowMetadataModel.arrWindowMetadata,function(index,siWindow){
							var windowMetaData = siWindow.id.split('_');
							var tWindowId=null;

							if(windowMetaData.length > 1){
								tWindowId = windowMetaData[2];
							}
							if(siWindow.id==windowId ||  tWindowId==windowId){
								$("#" + siWindow.id +".sti-window")[siWindow.type]("closeWindow");
							}


						});
				}


    	    },
    	    
    	    minimizeWindow : function(windowId,pluginName){
    	    	if(windowId && pluginName){
					$("#" + windowId +".sti-window")[pluginName]("minimizeWindow");
    	    	}
    	    },
    	    
    	    maximizeWindow : function(windowId,pluginName){
    	    	if(windowId && pluginName){
					$("#" + windowId +".sti-window")[pluginName]("maximizeWindow");
    	    	}
    	    },
    	    
    	    restoreWindow : function(windowId,pluginName){
    	    	if(windowId && pluginName){
					$("#" + windowId +".sti-window")[pluginName]("restoreWindow");
    	    	}
    	    },
    	    
    	    bringWindowToFront : function(windowId,pluginName){
    	    	if(windowId && pluginName){
					$("#" + windowId +".sti-window")[pluginName]("bringWindowToFront");
    	    	}
    	    },
			isWindowOpen:function(windowId){
				var isWindowOpen=false;
							$.each($si.viewer.windowMetadataModel.arrWindowMetadata,function(index,siWindow){
				                        windowMetaData = siWindow.id.split('_');
				                        var tWindowId=null;
				                              if(windowMetaData.length > 1){
				                                    tWindowId = windowMetaData[2];
				                              }
				                       if(siWindow.id==windowId ||  tWindowId==windowId){
										   isWindowOpen= true;
									   }

				                  });

				return isWindowOpen;
			},
			isInfoWindowOpen:function(){
							var isWindowOpen=false;
										$.each($si.viewer.windowMetadataModel.arrWindowMetadata,function(index,siWindow){
							                        if(siWindow.infoWindow){
													   isWindowOpen= true;
												   }

							                  });

							return isWindowOpen;
			},
			closeInfoWindow:function(){
				var $this=this;
				var toBeClosedWindows =[];
									$.each($si.viewer.windowMetadataModel.arrWindowMetadata,function(index,siWindow){
												if(siWindow.infoWindow){
													toBeClosedWindows.push({"id":siWindow.id,"pluginName":siWindow.type});
											   }

										  });
					for(var i=0;i<toBeClosedWindows.length;i++){
						this.closeWindow(toBeClosedWindows[i].id,toBeClosedWindows[i].pluginName);
					}

			},
			openExportCSVWindow:function(jsfileName,width,height){
				// In this we will pass the jsFileName as the argument in which we define module to download its content in CSV
				var top = parseInt((screen.availHeight / 2) - (500 / 2));
				 var left = parseInt((screen.availWidth / 2) - (500 / 2));
				 var applyWidth=600, applyHeight=400;
				/* if(width){
					 applyWidth = width; 
				 }else{
					 applyWidth = 600;
				 }
				 
				 if(height){
					 applyHeight = height;
				 }else{
					 applyHeight = 400;
				 }*/
				 
				var newWindow= window.open("exportAsCSV.html?jsFileName="+jsfileName, "Export As CSV", "width="+ applyWidth+", toolbar=no, scrollbars=no, location=no, height="+applyHeight+", top ="+top+", left = "+left+"");
				newWindow.focus();
				$si.viewer.exportWindow = newWindow;
				 return newWindow;
			},
			openBrowserWindow:function(url,title){
				var newWindow= window.open(url, title, 'width='+screen.width/2+',height='+screen.height+', resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no,scrollbars=no');
				 newWindow.focus();
				 return newWindow;
			},
			getWindows:function(windowType)	{
 				var windows =[];
 				$.each($si.viewer.windowMetadataModel.arrWindowMetadata,function(index,siWindow){
           			if( siWindow.type == windowType)  {
 					   windows.push(siWindow);
            		}
            	});
 				return windows;
 			},
 			
 			getWindowState : function(windowId) {
				var state = "closed" ;
				$.each($si.viewer.windowMetadataModel.arrWindowMetadata,function(index,siWindow){
					if(windowId == siWindow.id){
						state = "open";
/*						var windowElement =  $("#" + siWindow.id +".sti-window");
						
						if(windowElement){
							if( windowElement[0].hasClass(".k-i-maximized")) {
								state = "maximized";
							} else if(  $(windowElement[0].data("kendoWindow").wrapper).css("display") == "none"  ) {
								state = "minimized";
							}							
						} 
*/
					}
				});				return state;
			},

			getWindowById : function(windowId) {
				var win = null ;
				$.each($si.viewer.windowMetadataModel.arrWindowMetadata,function(index,siWindow){
					if( siWindow.id == windowId) {
						win = siWindow;
					}
				});
				return win;
			},
			
           getViewerPluginWindowId:function(){
				var windows = $si.windowUtil.getWindows($si.viewer.viewerPlugin);
				var windowId = null;
				if(windows.length === 1) {	
					windowId = windows[0].id;
				}	
				return windowId;
          }			
 			
	};
});