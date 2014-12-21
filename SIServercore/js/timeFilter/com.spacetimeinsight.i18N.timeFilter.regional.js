define(['siViewerData'],function($si) {
	$si.i18N.TimeFilter = {
			
			regional :  {
							en : {
									timeFilter : "Time Filter",
									tooltip : {
												controlButtons : {
															applyFilters : "Apply Filters",
															applyClose	 : "Apply and Close",
															clearFilters : "Clear Filters",
														},
														
														selectDate : "Select date",
												        selectTime : "Select time"

												},
									range : "Range",
									startTime : "Start time",
									endTime : "End time",
									show : "Show",
									by : "by",
									filtersAppliedTo : "Filters Applied To"
							},
							fr : {
								timeFilter : "Time Filter",
								tooltip : {
										controlButtons : {
													applyFilters : "Apply Filters",
													applyClose	 : "Apply and Close",
													clearFilters : "Clear Filters",
												},	
												selectDate : "Select date",
												selectTime : "Select time"
												
										},
								range : "Range",
								startTime : "Start time",
								endTime : "End time",
								show : "Show",
								by : "by",
							},
			},
			setDefaults : function(regionalData) {
				$si.i18N.TimeFilter.regionalData = regionalData;
			},
	};

	$si.i18N.TimeFilter.setDefaults($si.i18N.TimeFilter.regional[$si.viewer.locale]);

});