define(['siViewerData'],function($si) {
	$si.i18N.favorite = {
			
			regional :  {
							en : {
									addFavoriteWindow: {
										favoriteNameLabel : "Favorite name",
										favoriteDescriptionLabel : "Description",
										shareWithAllLabel: "Share With All",
										saveButtonLabel : "Save",
										cancelButtonLabel: "Cancel",
										descriptionPlaceHolder : "of the following rules are true",
									},
									manageFavoriteWindow:{
										
									}
									
							},
							fr : {
								dataFilter : "Data Filter",
								tooltip : {
										controlButtons : {
													applyFilters : "Apply Filters",
													applyClose	 : "Apply and Close",
													clearFilters	 : "Clear Filters",
												}
										},
								ruleText : "of the following rules are true",
							},
			},
			setDefaults : function(regionalData) {
				$si.i18N.favorite.regionalData = regionalData;
			},
	};

	$si.i18N.favorite.setDefaults($si.i18N.favorite.regional[$si.viewer.locale]);

});