define(['siViewerData'],function($si) {
	$si.i18N.DataFilter = {
			
			regional :  {
							en : {
									dataFilter : "Data Filter",
									tooltip : {
											controlButtons : {
														applyFilters : "Apply Filters",
														applyClose	 : "Apply and Close",
														clearFilters	 : "Clear Filters",
													},
											actionButtons:{
														level:	"Add group of filter criteria",
														close: "Delete filter criteria",
														add: "Add filter criteria"
												}
											},
									ruleText : "of the following rules are true",
									notifications : {
										errorApplyConfig : "Filter Configuration is invalid",
										errorApplyDefault: "Default Filter is not applied. Apply Default Filter property is false.",
											
									},
							},
							fr : {
								dataFilter : "Data Filter",
								tooltip : {
										controlButtons : {
													applyFilters : "Apply Filters",
													applyClose	 : "Apply and Close",
													clearFilters	 : "Clear Filters",
												},
										actionButtons:{
														level:	"Add group of filter criteria",
														close: "Delete filter criteria",
														add: "Add filter criteria"
												},
										},
								
								ruleText : "of the following rules are true",
								notifications : {
										errorApplyConfig : "Filter Configuration is invalid",
										errorApplyDefault: "Default Filter is not applied. Apply Default Filter property is false.",
											
									},
							},
			},
			setDefaults : function(regionalData) {
				$si.i18N.DataFilter.regionalData = regionalData;
			},
	};

	$si.i18N.DataFilter.setDefaults($si.i18N.DataFilter.regional[$si.viewer.locale]);

});