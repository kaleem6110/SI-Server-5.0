/**
 * if you are using this component independently please use
 * requirejs shim and make sure kendo is included before shimWindow.
 * for eg. consider htmlViewer.html
 */

define([ 
    'jquery',
    'jquery-ui',
    'kendo', 
],function($) {
	
$si.DialogBox = {
		 CONTENT_DIV : 	kendo.template("<div id='#= id #_dialogContentDiv' style='margin-top:20px' align='center'><div id='#= id #_labelDiv' style='position: relative;top: 10px;'><label>#=message#</label><br></div></div>"),
		 BUTTONS_CONTAINER_DIV  : 	kendo.template("<div id='#= id #_controls' style='position: absolute;bottom: 0px;margin-bottom: 20px;width: 100%;'></div>"),
		 BUTTON			: kendo.template("<button id='#= id #' style='min-width: 80px;' class='apply-button #=className#'>#=buttons#</button>"),
		 WINDOW_DIV  : 	kendo.template('<div id="#= id #_dialog"></div>'),
		 show        : 	function(title1,message,icon,buttons,parentID,windowAttributes){
							var $this = this,top,left;
							$('#'+parentID).append(this.WINDOW_DIV({id:parentID}));
							var windowObject=$('#'+parentID).find('#' + parentID + "_dialog");
							var isModal = false;
							if(windowAttributes){
								top  = windowAttributes.height/2;
								left = windowAttributes.position.left + 10;
								if( windowAttributes.modal)
									isModal = windowAttributes.modal;
							}
							
							
							 windowObject.siViewerWindow({
									title:title1,
									windowIcon : icon,
									actions:[],
									windowAttributes: {
										width : "250px",
										height : "150px",
										modal : isModal,
										position : {
											top: top,
											left: left
										},
										resizable: false,
									},
									shimRequired:true,
									toolBarWidget:null
								});
				 
							 windowObject.append($this.CONTENT_DIV({id:parentID,message: message}));
							 windowObject.find("#"+parentID+"_labelDiv").css("padding-left","10px");
							 windowObject.find("#"+parentID+"_labelDiv").css("padding-right","10px");
							 if(isModal){
							 	windowObject.parent().css("z-index","9000002");
							 	$(".k-overlay").css("z-index","9000001");
							 	$(".sti-window-google-earth").hide();
							 }
							 $this.addButton(windowObject,buttons,parentID);
						},
						
				confirm : function(title1,message,icon,parentID,windowAttributes){
							var $this = this,top,left;
							$('#'+parentID).append(this.WINDOW_DIV({id:parentID}));
							var windowObject=$('#'+parentID).find('#' + parentID + "_dialog");
							var isModal = false;
							if(windowAttributes){
								top  = windowAttributes.height/2;
								left = windowAttributes.position.left + 10;
								if( windowAttributes.modal)
									isModal = windowAttributes.modal;
							}
							
							 windowObject.siViewerWindow({
									title:title1,
									windowIcon : icon,
									actions:[],
									windowAttributes: {
										width : "250px",
										height : "150px",
										modal : isModal,
										position : {
											top: top,
											left: left
										},
										resizable: false,
									},
									shimRequired:true,
									toolBarWidget:null
								});
				 
							 windowObject.append($this.CONTENT_DIV({id:parentID,message: message}));
							 windowObject.find("#"+parentID+"_labelDiv").css("padding-left","10px");
							 windowObject.find("#"+parentID+"_labelDiv").css("padding-right","10px");
							 if(isModal){
							 	windowObject.parent().css("z-index","9000002");
							 	$(".k-overlay").css("z-index","9000001");
							 	$(".sti-window-google-earth").hide();
							 }
							 $this.addButton(windowObject,"Yes",parentID,"confirm-ok");
							 $this.addButton(windowObject,"No",parentID,"confirm-cancel");
							 windowObject.find('#No_button').css('margin-left','10px');
						},
				addButton : function(windowObject,buttons,parentID,className){
					var $this = this;
					windowObject.find('#' + parentID + '_dialogContentDiv').append(this.BUTTONS_CONTAINER_DIV({id : parentID}));
					var buttonsContainer = windowObject.find('#' + parentID + '_dialogContentDiv').find('#' + parentID + '_controls')
					if(className){
						buttonsContainer.append(this.BUTTON({ id:buttons+'_button',buttons:buttons, className : className}));
					}else{
						buttonsContainer.append(this.BUTTON({ id:buttons+'_button',buttons:buttons, className : ""}));
					}
					
						windowObject.find('#'+buttons+'_button').click(function() {
								var okClicked;
								$($si.viewer).trigger("dialogbuttonclicked", windowObject);
								if($(this).hasClass("confirm-ok")){
									$(".sti-window-google-earth").show();
									okClicked = true;
								}
								if($(this).hasClass("confirm-cancel")){
									$(".sti-window-google-earth").show();
									okClicked = false;	
								}
								windowObject.trigger("confirmdialogbuttonclicked", okClicked);
								
								if(windowObject.data("kendoWindow")){
									windowObject.data("kendoWindow").destroy();
								}
									
						});
					
				}
	};
	
	


});
