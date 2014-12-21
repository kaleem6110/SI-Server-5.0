/**
 * If some component is made specially for google map view them shim need to be added explicitly
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
    'common/com.spacetimeinsight.viewer.ui.drawer',
],function($){
	$.widget('spacetimeinsight.siViewerBusinessViewDrawer',$.spacetimeinsight.siViewerDrawer,{
	
		options:{
			windowAttributes:{
				width :"230px",
			},
		},
		pluginName:"siViewerBusinessViewDrawer",
		CHECK_BOX_LABEL : kendo.template("<div class='display-section'>Display Sections </div> <div><div class='v-divider'></div><span>Show</span> <span class='expand-header'>Expand</span></div"),
		DRAWER_ROW : kendo.template("<div> <span><input type='checkbox' checked id='#=id#_show' class='show-category-checkbox'/></span> <span class='expand-chk'><input type='checkbox' checked id='#=id#_expand' class='expand-category-checkbox' /></span> <span class='layer-text layer-lable-style'> #= displayName # </span> </div>"),


		_create : function(){
			this._super();
		},
		
		_createControls : function(){
			this._super();
			this.options.contentDiv = $(this.element).find(".sti-window-drawer-content");
		},
		
		_bindControls : function(){
			this._super();
			var $this = this;
			try{
				//Binding with observable
				this._createChecBox($si.viewer.businessViewObserver.businessView);
				
				$si.viewer.businessViewObserver.bind("change", function (e) {
					if(e.field == "businessView"){
						$this._createChecBox($si.viewer.businessViewObserver.businessView);
					}
			 	});
			}catch(er){
				$si.Logger('Business View').debug("Error in business view creation :- " + er  );
			}
		},

		_createChecBox: function(businessView) {
			var $this = this;
			$this.options.contentDiv.empty();
			if(businessView && businessView.nodeList){
				$this.options.contentDiv.append(this.CHECK_BOX_LABEL({}));
				
				$(businessView.nodeList).each(function(index,category){
					if(category.hide == false) {
						$this.options.contentDiv.append($this.DRAWER_ROW(
																	{
																		id : category.id,
																		displayName : category.text,
																	}));
					}
				});
				
				$this.options.contentDiv.find(":checkbox").bind("click",function(e){
					var data = {
									isChecked : this.checked,
								};
					if($(this).hasClass("show-category-checkbox")){
						data["id"] = this.id.replace("_show","");
						$this._trigger("onShowHideCategory",null,data);
						var expandbutton =$($this.element).find("#"+data.id+"_expand");
						if(this.checked){
							expandbutton.removeAttr("disabled");
						}
						else{
							expandbutton.attr("disabled","disabled");
						}
					}else if($(this).hasClass("expand-category-checkbox")){
						data["id"] = this.id.replace("_expand","");
						$this._trigger("onExpandCollapseCategory",null,data);
					}
				});
			}
		},

		/* following method is to set synch state of drawer with Businessview */
		setExpandState : function(id,flag){
			this.options.contentDiv.find("#"+id+"_expand.expand-category-checkbox").prop('checked', flag);
		},

		getDrawerFavoriteSettings : function() {
        	var $this = this;
        	var drawerSettings=[];
        	var showCheckbox;
        	var expandCheckBox;
           	$.each($si.viewer.businessViewObserver.businessView.nodeList,function(index,category){
           		if(category){
           			showCheckBox = $($this.element).find("#" + category.id +"_show.show-category-checkbox");
               		expandCheckBox = $($this.element).find("#" + category.id +"_expand.expand-category-checkbox");
               		drawerSettings.push({
           										id     	 : category.id,
           										isVisible: (showCheckBox && showCheckBox.length > 0) ? showCheckBox.is(':checked') : false ,
           										isExpand : (expandCheckBox && expandCheckBox.length > 0) ? expandCheckBox.is(':checked') : false ,
           									});
           		}
           	});
			return {drawerSettings :drawerSettings};
		},
		
		applyDrawerFavoriteSettings : function(favorite) {
			if(favorite && favorite.drawerSettings){
				var $this = this;
				$.each(favorite.drawerSettings,function(index,category){
					if(category){
						$this._setShowCheckBox(category.id,category.isVisible);
						$this._setExpandCheckBox(category.id,category.isExpand);
	               		
					}
				});
			}
		},
		
		_setShowCheckBox :function(categoryId,isVisible){
			var showCheckBox = $(this.element).find("#" + categoryId +"_show.show-category-checkbox");
			if(showCheckBox && showCheckBox.length > 0 && showCheckBox.prop("checked") !== isVisible){
				showCheckBox.trigger("click");
       		}
		},
		
		_setExpandCheckBox :function(categoryId,isExpand){
			var expandCheckBox = $(this.element).find("#" + categoryId +"_expand.expand-category-checkbox");
       		if(expandCheckBox && expandCheckBox.length > 0 && expandCheckBox.prop("checked") !== isExpand){
       			expandCheckBox.trigger("click");
       		}
		},
		
		reset : function(options) {
			$si.Logger('favorite').debug("resetting business view drawer favorite "  );	
			var $this = this;
			$.each($si.viewer.businessViewObserver.businessView.nodeList,function(index,category){
				if(category){
					$this._setShowCheckBox(category.id,true);
					$this._setExpandCheckBox(category.id,true);
               		
				}
        	});
		},		

	});
});