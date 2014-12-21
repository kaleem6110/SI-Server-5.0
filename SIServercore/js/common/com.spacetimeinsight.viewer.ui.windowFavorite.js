/**
 * Google Earth Lasso operations are written in this.
 */
define([
    'jquery',
    'jquery-ui',
    'siViewerLogger',
    'common/com.spacetimeinsight.viewer.ui.window'
 ],function($){
	$.extend($.spacetimeinsight.siViewerWindow.prototype, {


		bindLoadOfDefaultFavorite : function(toolBarWidget) {
			var $this = this;
			$($this.options.toolBar)[$this.options.toolBarWidget]().bind(toolBarWidget.toLowerCase() + "_loaddefaultfavorite",function(e,data){
				var defaultFavorite = data.defaultFavorite;
				var favDataStr;
				if(defaultFavorite != null){
					$this.options.defaultFavorite = defaultFavorite;
				}
			});
		},



		getFavoriteDetails : function(){
			try {
			//The public getFavoriteDetails will be overriden in businessview as business view favorite is application level favorite.
				return this._getFavoriteDetails();
			} catch(e){
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._getFavoriteDetails);
			}
		},

		_getFavoriteDetails:function() {
			try {
				var $this = this;
				var favorite = {};
				favorite.windowAttributes = this.getWindowAttributes();
				favorite.toolBar  = {
										state : this.options.toolBarState,
										details : this._getToolBarFavoriteSettings(),
									};
	
				if(this.options.drawer) {
					favorite.drawer = {
											state : this.options.drawerState,
											details : this._getDrawerFavoriteSettings(),
									   };
				}
	
				if(this.options.filterCriteria) {
					favorite.filterCriteria = this.options.filterCriteria;
				}
	
				if(this.options.timeFilterCriteria ) {
					favorite.timeFilterCriteria = this.options.timeFilterCriteria;
				}
				favorite.content = this.getWindowContentFavoriteSettings();
				return favorite;	
			} catch(e){
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._getFavoriteDetails);
			}
		},

		_getToolBarFavoriteSettings:function() {
				try {
					return this.options.toolBar[this.options.toolBarWidget]('getToolBarFavoriteSettings');
				} catch(e) {
					$si.Logger('favorite').error("Error ["+e.message+"] occurred while getting the toolbar favorite"  );
					return {};
				}
		},

		_getDrawerFavoriteSettings:function() {
			try {
				return this.options.drawer[this.options.drawerWidget]('getDrawerFavoriteSettings');
			} catch(e) {
				$si.Logger('favorite').error("Error ["+e.message+"] occurred while getting the drawer favorite"  );
				return {};
			}
		},

		getWindowContentFavoriteSettings: function(){
			return {};
		},

		setDefaultFavorite: function(){
			try {
				var $this = this;
				if($this.options.defaultFavorite != null){
					$this.applyFavorite($this.options.defaultFavorite);
				} else if($this.options.favorite != null){
					$this.applyFavorite($this.options.favorite,false,true);
				}		
			} catch(e){
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.setDefaultFavorite);
			}
		},

		applyFavorite: function(favoriteObject,isDefault,isApplicationLevel){
			this._applyFavorite(favoriteObject,isDefault,isApplicationLevel);
		},
		
		_applyFavorite: function(favoriteObject,isDefault,isApplicationLevel){
			try {
				var $this = this;
				if(favoriteObject != null){
					var favorite;
					if(!isApplicationLevel) {
						 favorite = $.parseJSON(favoriteObject.favoriteData);
					} else {
						favorite = favoriteObject;
					}
	
					//apply Window Styles
					if(isApplicationLevel == true) {
			            $($this.element).data("kendoWindow").wrapper.css({
			            			width : favorite.windowAttributes.width + "px",
			            			height : favorite.windowAttributes.height + "px",
			            			top:favorite.windowAttributes.position.top + "px",
			            			left:favorite.windowAttributes.position.left + "px",
			             });
					 }
	
	   				 //apply window toolbarFavorite
	   				try {
	   					if(favorite.toolBar.details) {
		             		$this.options.toolBar[$this.options.toolBarWidget]('applyToolBarFavoriteSettings',favorite.toolBar.details);
	   					}
					 } catch(e) {
					 	this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.applyToolBarFavoriteSettings);
					 }
	
					try {
			             if(this.options.drawer && favorite.drawer.details) {
			  			 	$this.options.drawer[$this.options.drawerWidget]('applyDrawerFavoriteSettings',favorite.drawer.details);
			             }
					 } catch(e) {
					 	this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.applyDrawerFavoriteSettings);
					 }
	
					 //apply drawer favorite
		        	 if(favorite.filterCriteria) {
						this.options.filterCriteria = favorite.filterCriteria;
					 } else {
					 	this.options.filterCriteria = null;
					 }
	
					 //apply time filter favorite
					 if(favorite.timeFilterCriteria ) {
						this.options.timeFilterCriteria = favorite.timeFilterCriteria ;
					 } else {
					 	this.options.timeFilterCriteria = null;
					 }
	
	
					 $this.options.windowContentFavorite = favorite.content;
					 try {
					 	$this.applyWindowContentFavoriteSettings(favorite.content);
					 } catch(e) {
					 	this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.applyWindowContentFavoriteSettings);
					 }
	
					 if(!isDefault) {
					 	$this.refreshWindow();
					 }
				}
			} catch(e){
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors._applyFavorite);
			}			
		},

     	clearFavorite: function(isApplicationLevel){
     		try{
				var $this = this;
	  			if($this.options.defaultFavorite != null) {
	  				$this.applyFavorite($this.options.defaultFavorite);
	  			} else {
	  			 	this.options.timeFilterCriteria = null;
	  			 	this.options.filterCriteria = null;
	  			 	$this.reset(isApplicationLevel);
					$($this.options.toolBar)[$this.options.toolBarWidget]("removeIconFromSelectedItem");
					$($this.options.toolBar)[$this.options.toolBarWidget]("enableClearOption",false);
					$($this.options.toolBar)[$this.options.toolBarWidget]("enableUpdateOption",false);			 	
	  			}
  			} catch(e){
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.clearFavorite);
			}	
        },


		applyWindowContentFavoriteSettings: function(favorite){
			$si.Logger('favorite').debug("applying window content favorite "  );
		},
		
		reset: function (isApplicationLevel) {
			try {
				var $this = this;

				if(isApplicationLevel == true){
					$($this.element).data("kendoWinow").wrapper.css({
						width 	: $this.options.windowAttributes.width ,
						height 	: $this.options.windowAttributes.height ,
						top		: $this.options.windowAttributes.position.top ,
						left	: $this.options.windowAttributes.position.left,
					});	
				}
									
				try {
		             if($this.options.drawer) {
		  			 	$this.options.drawer[$this.options.drawerWidget]('reset',this.options);
		             }
				} catch(e) {
					this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.resetDrawer);
				}				
	
				try {
					if($this.options.toolBar) {
	             		$this.options.toolBar[$this.options.toolBarWidget]('reset',this.options);
					}
				} catch(e) {
					this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.resetToolBar);
				}
			} catch(e){
				this._createErrorNotification(e,$si.i18N.BusinessViewWindowErrors.reset);
			}
		},
		
	});
});
