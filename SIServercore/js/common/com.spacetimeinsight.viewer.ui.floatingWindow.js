/**
 * Floating window can be draggable and resizeable.
 * Class is specific for business view category window.
 */

define([
    'jquery',
    'jquery-ui',
    'kendo',
],function($){

	$.widget('spacetimeinsight.siFloatingWindow',$.spacetimeinsight.siViewerBaseWidget,{
		options : {
			 	draggable		: true,
			 	resizeable		: true,
			 	dragOptions		: {},
			 	resizeOptions	: {},
		},
		pluginName:"siFloatingWindow",
		
		CATEGORY_TEMPLATE : kendo.template("<div id='#= id #_category' class='business-view-category'>"
            						+"<span class='category-icon category-expand'></span>"
            						+"<span class='category-text'><input type='checkbox' class='root-category-checkbox' #= disabledState#><label class='category-label' title='#=description#' >#= label #</label></span>"
            						+"</div>"),
		
		_create : function(){
			this._super();
		},
		
		_createControls : function(){
			this._super();
			if(this.options.category){
				$(this.element).append(this.CATEGORY_TEMPLATE({
														id 			: this.options.category.id,
														label		: this.options.category.text,
														description : this.options.category.description ? this.options.category.description : this.options.category.text,
														disabledState  : !this.options.category.selectable ? "disabled" : "",
										}));									
			}
			/** making div draggable **/
			if(this.options.draggable){
				$(this.element).siDraggable(this.options.dragOptions);
			}
			/** making div resizeable **/
			if(this.options.resizeable){
				$(this.element).siResizeable(this.options.resizeOptions);
			}
		},
		
		_bindControls : function(){
			this._super();
			///**Event binding **/
			this._bindCategoryClick();
			this._bindCategoryToggle();
			this._bindCategoryChecked();
		},
		
		 _bindCategoryClick : function(){
			 var $this = this;
         	/** Binding category click to set its z-index max **/
				var parentContainer = $(this.element).closest(".parentCategoryWindow");
				$(this.element).mousedown(function(e){
					parentContainer.find(".categoryWindow").each(function(index,categoryWindow){
						$(categoryWindow).zIndex(0);
					});
					$($this.element).zIndex(1);
				});
         },
         
         _bindCategoryToggle : function(){
         	var $this = this;
         	var categoryIcon = $(this.element).find(".category-icon");
         	var isExpand;
         	if(categoryIcon && categoryIcon.length > 0){
         		categoryIcon.click(function(e){
         			/** if it is in expand state call is for collapse **/
         			isExpand = !(categoryIcon.hasClass("category-expand"));
         			$this.expandCategory(isExpand);
         			$this._trigger("onCategoryExpand",null,{isExpand : isExpand});
         		});
         	}
         },
         
         _bindCategoryChecked : function(){
        	 var $this = this;
        	 var categoryCheckBox = $(this.element).find(".root-category-checkbox");
        	 
        	 if(categoryCheckBox && categoryCheckBox.length > 0){
        		 categoryCheckBox.click(function(e){
        			 /** prevent click if it is in loading state **/
     				if($($this.element).find(".layer-status-loading").length > 0){
     					e.preventDefault();
     					return;
     				}
        			 /** select all childrens from tree **/
        			 $($this.element).find(".layer-text").trigger("click",{isSelected : this.checked});
        			 if(this.checked){
        				 categoryCheckBox.parent(".category-text").addClass("bold");
        			 }else{
        				 categoryCheckBox.parent(".category-text").removeClass("bold");
        			 }
        		 });
        	 }
         },
         
         expandCategory : function(isExpand){
         	var categoryIcon = $(this.element).find(".category-icon"); 
         	if(categoryIcon && categoryIcon.length > 0){
         		if(isExpand){
         			categoryIcon.removeClass("category-collapse");
         			categoryIcon.addClass("category-expand");
         			/** restore the last height **/
         			$(this.element).css({
											height :this.options.restoreHeight,
											"padding-bottom" :"28px",
										});
         			$(this.element).find(".ui-icon-gripsmall-diagonal-se").show();
         		}else{
         			categoryIcon.removeClass("category-expand");
         			categoryIcon.addClass("category-collapse");
         			this.options.restoreHeight = $(this.element).css("height");
         			/** hide to min height **/
         			$(this.element).css({
         									height :"0px",
         									"padding-bottom" :"0px",
         								});
         			$(this.element).find(".ui-icon-gripsmall-diagonal-se").hide();
         		}
         	}
         	this._toggleLayercontainer(isExpand);
          },
         
         _toggleLayercontainer : function(isVisible){
        	 var layerContainer = $(this.element).find(".layer-container");
        	 if(layerContainer && layerContainer.length > 0){
        		 if(isVisible){
        			 layerContainer.show();
              	 }else{
              		layerContainer.hide();
              	 }
        	 }
         },
         
         showCategory : function(isVisible){
        	if(isVisible){
        		$(this.element).show();
        	}else{
        		$(this.element).hide();
        	} 
         },
         
         setCategoryCheckBox : function(itemChecked,itemUnChecked){
        	 var categoryCheckBox = $(this.element).find(".root-category-checkbox");
        	$(categoryCheckBox).prop("indeterminate", itemChecked && itemUnChecked);
			$(categoryCheckBox).prop("checked", itemChecked || !itemUnChecked);
         },

	});

});