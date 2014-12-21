define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.nestedWindow'
],
(function($){
	$.widget('spacetimeinsight.siViewerAddFavoriteComponent',{
		
		NAMESPACE : "spacetimeinsight",
		pluginName:"siViewerAddFavoriteComponent",
		ADD_FAVORITE_MENU_ITEM: "Add to Favorites",
		DIV_CONTENT: kendo.template('<div id="contentDiv" style="padding-top: 20px;padding-left: 25px;">' 
									+ '<div style="padding-bottom: 5px;"><label style="font-weight: bold">Favorite name</label></div>'               
									+ '<div style="padding-bottom: 10px;"><input type="text" id="favoriteName" style="width: 210px;height: 15px;" maxLength="30"/></div>'	
									+ '<div style="padding-bottom: 5px;"><label style="font-weight: bold">Description</label></div>'
									+ '<div style="padding-bottom: 5px;"><textarea id="favoriteDescription" style="width: 210px;resize:none" rows="3" placeholder="Maximum 100 characters..." maxLength="100"></textarea></div>'
									+ '<div class="shareall-div"><input type="checkbox" id="shareAll" /><label>Share With All</label></div>'
									+ '<div style="padding-top: 10px;"><div style="padding-left:10px; position:absolute;"><button id="saveBtn" style="width:80px;min-width: 80px;" class="apply-button" disabled="true">Save</button></div><div style="padding-right:50px; float:right;" ><button id="cancelBtn" class="cancel-button" style="width:80px;min-width: 80px;">Cancel</button></div></div>'
									+ '</div>'),
		_create: function(){
			var $this = this;
		 	var addFavElement = this.element,txtFavoriteName;
		 	var windowAttributes = {
		 								width:"265px",
		 								height: "235px",
		 				         	position:{
		 									top: "100px",
		 									left: "120px",
		 								},
		 								resizable: false,
		 								modal: true
		 							};
		 	//used in event handling. Each event is prefix by plugin name
		 	this.widgetEventPrefix = this.pluginName + "_";
		 	$(addFavElement).siViewerWindow({
					windowAttributes: windowAttributes,
		 			shimRequired: true,
		 			toolBarWidget:null,
		 			actions: ["close"],
		 			title: "Add " + $this.options.parentWindowTitle + " Favorites",
		 			windowIcon: "css/images/favorites_window.png",
		 			
			});
		 	this.element.parent().css("z-index","9000002");
			$(".k-overlay").css("z-index","9000001");
			$(".sti-window-google-earth").hide();
		 	$(addFavElement).append(this.DIV_CONTENT);
		 	txtFavoriteName = $(addFavElement).find('#favoriteName');
		 	txtFavoriteName.focus();
		 	txtFavoriteName.keyup(function(e){
		 		var disabled = false;
		 		var btnSave = $(addFavElement).find('#saveBtn');
		 		if($(this).val() == ''){
		 			disabled = true;
		 		}
		 		btnSave.attr('disabled',disabled);
		 	});
		 	$(addFavElement).find('#' + "saveBtn").on("click",function(){
		 		var contentDiv = addFavElement.find('#' + 'contentDiv');
		 		var favoriteName = contentDiv.find('#' + 'favoriteName').val();
		 		var favoriteDescription = contentDiv.find('#' + 'favoriteDescription').val();
		 		var isShareAllChecked = contentDiv.find('#' + 'shareAll').prop('checked');
		 		var eventData = {favoriteName: favoriteName,favoriteDescription: favoriteDescription,isShareAllChecked: isShareAllChecked };
		 		$this._trigger("favoriteSaveClicked",null,eventData);
		 		$this.closeWindow();
		 	});
		 	
		 	$(addFavElement).find('#' + "cancelBtn").on("click",function(){
		 		$this.closeWindow("closeWindow");
		 	});
		 	
		 	$(addFavElement).parent().find('.k-i-close').on('click',function(e){
		 		$this.closeWindow();
		 	});
	 },
	 
	 closeWindow: function(){
	 	$(this.element).siViewerWindow("closeWindow");
	 	$(".sti-window-google-earth").show();
	 }
	 
	});
}));