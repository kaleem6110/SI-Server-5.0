define(
		[ 'siViewerData', 'map/com.spacetimeinsight.i18N.map' ],
		function($si) {
			$si.i18N.Map.regional['en'] = {
				map : "Map",
				tooltip : {
					favorite : "Show favorites",
					filter : "filter",
					print : "Print map",
					exporttopg : "Save data to external file",
					lasso : "Edit lasso(es)",
					selectlassos : "Select lasso(es)",
					lassofilters : "Filter data based on lasso(es)",
					search : "Search location",
					ruler : "Measure distance between two or more points",
					streetview : "Open Google StreetView window",
					showgooglemap : "Open Google Maps window",
					acknowledgealert : "acknowledge alert",
					exception : "Show recent errors",
					exporttopng : "Save data to external file",
					legend : "Open map legend window",
					zoomSlider : "Change map zoom level",
				},

				lassotooltip : {
					rectangle : "Create rectangle lasso",
					polygon : "Create polygon lasso",
					circle : "Create circle lasso",
					color : "Edit lasso fill color",
					lassosicondropdown : "Edit lasso border thickness",
					save : "Save selected lasso",
					clear : "Clear selected lasso",
					managelassos : "Manage lasso(es)",
					lassosicon : "Zoom to location on map",	
				},

				saveLasso : {
					title : "Save Lasso",
					savelasso : "Save",
					cancellasso : "Cancel",
					lassoname : "Lasso Name",
					lassodescription : "Lasso Description",
					lassoplaceholder : "Maximum 100 characters",
					lassonameemptyerror : "Lasso Name cannot be empty",
					lassonameexceederror : "Lasso Name can't be more than 30 characters",
					lassodescriptionexceederror : "Lasso Description can't be more than 100 characters",
					lassonamealreadtexistserror : "The lasso already exists with the same name for the current logged in user. Please choose another name.",
				},

				lassomessages : {
					nottheowneroflassocantedit : "As you are not the owner of this lasso you can't edit it. Please edit a lasso that you own.",
					updatecancelcurrentregionediting : "Please update/cancel the current region editing",
					specialcharactersvalidation : "Special characters except '_' are not allowed in name and description of lasso",
					polygonlassoatleastthreesides : "The polygon lasso drawn is not correct, please make sure that the polygon should have atleast three straight sides and angles.",
					canceleditprompt : "Do you wish to discard the lasso changes",
					polyincorrectdrawerror : "The polygon lasso drawn is not correct, please make sure that the polygon should have atleast three straight sides and angles.",
					conformationtitle : "Confirmation Required",
					conformationmessage : "Are you sure about this?",
					applylassofiltererror : "Error while applying lasso filter",
					newlassonotsavederror : "Error occurred while saving newly created lasso on DB",
					editlassonotsavederror : "Error occurred while saving newly edited lasso on DB",
					googleearth : "Google Earth",
					lassofiltermessage : "To apply lasso filter at least one layer with 'Refresh on Lasso'  as true should be selected and at least one lasso should be selected from the lasso dropdown list.",
					createCircleError : "Draw the Circle on map first. Please try again.",
					createRectangleError : "Draw the Rectangle on map first. Please try again.",
					ok : "Ok",
					polylassocreationerror : "While creation of a polygon lasso you can't edit any other lasso except the one you have just created",
				},

				manageLasso : {
					title : "Manage Lassos",
					savebutton : "Save",
					cancelbuttton : "Cancel",
					sharelassobutton : "Share",
					unsharelassobutton : "UnShare",
					deletelassobutton : "Delete",
					moveuplassobutton : "Move",
					movedownlassobutton : "Move",
					gridcolumnlabeltype : "Type",
					gridcolumnlabelname : "Name",
					gridcolumnlabelowner : "Owner",
					gridcolumnlabeldescription : "Description",
					clickoncancelbutton : "No changes were made to lassos",
					clickonsavebutton : "Lasso changes have been successfully saved",
					failedclickonsavebutton : "Lasso changes have been not successfully saved",
				},

				lassofilterdata : {
					nofilterapplied : "No filter applied",
					showallintersections : "Show all intersections",
					showanyintersection : "Show any intersection",
					showallwithin : "Show all within",
					showalloutside : "Show all outside",
				},
				
				Google2dmapwindow : {
					title : "Google Map",
					seestreets : "Click her to see streets",
					seetraffic : "Click her to see traffic",
					streets : "Streets",
					traffic : "Traffic",
					loadingerror : "Error occurred in loading Google 2D Maps: ",
					viewchangeerror : "Error occurred in Google 2d Maps View change: ",
				},
				
				streetviewwindow : {
					title : "Google StreetView",
					loadingerror : "Error while loading street view: ",
					locationerror : "Error while setting the location in streeview: ",
				},
				
				tabbedwindow : {
					highlight : "Show highlight on map",
				},
				searchbox : {
					enterlocation : "Enter location..."
				},

			};

			$si.i18N.Map.regional['fr'] = {
				map : "Map",
				tooltip : {
					favorite : "Show favorites",
					filter : "filter",
					print : "Print map",
					exporttopg : "Save data to external file",
					lasso : "Edit lasso(es)",
					selectlassos : "Select lasso(es)",
					lassofilters : "Filter data based on lasso(es)",
					search : "Search location",
					ruler : "Measure distance between two or more points",
					streetview : "Open Google StreetView window",
					showgooglemap : "Open Google Maps window",
					acknowledgealert : "acknowledge alert",
					exception : "Show recent errors",
					exporttopng : "Save data to external file",
					legend : "Open map legend window",
				},

				lassotooltip : {
					rectangle : "Create rectangle lasso",
					polygon : "Create polygon lasso",
					circle : "Create circle lasso",
					color : "Edit lasso fill color",
					lassosicondropdown : "Edit lasso border thickness",
					save : "Save selected lasso",
					clear : "Clear selected lasso",
					managelassos : "Manage lasso(es)",
					lassosicon : "Zoom to location on map",	
				},

				saveLasso : {
					title : "Save Lasso",
					savelasso : "Save",
					cancellasso : "Cancel",
					lassoname : "Lasso Name: ",
					lassodescription : "Lasso Description: ",
					lassoplaceholder : "Maximum 100 characters",
					lassonameemptyerror : "Lasso Name cannot be empty",
					lassonameexceederror : "Lasso Name can't be more than 30 characters",
					lassodescriptionexceederror : "Lasso Description can't be more than 100 characters",
					lassonamealreadtexistserror : "The lasso already exists with the same name for the current logged in user. Please choose another name.",
				},

				manageLasso : {
					title : "Manage Lassos",
					savebutton : "Save",
					cancelbuttton : "Cancel",
					sharelassobutton : "Share",
					unsharelassobutton : "UnShare",
					deletelassobutton : "Delete",
					moveuplassobutton : "Move",
					movedownlassobutton : "Move",
					gridcolumnlabeltype : "Type",
					gridcolumnlabelname : "Name",
					gridcolumnlabelowner : "Owner",
					gridcolumnlabeldescription : "Description",
					clickoncancelbutton : "No changes were made to lassos",
					clickonsavebutton : "Lasso changes have been successfully saved",
					failedclickonsavebutton : "Lasso changes have been not successfully saved",
				},

				lassomessages : {
					nottheowneroflassocantedit : "As you are not the owner of this lasso you can't edit it. Please edit a lasso that you own.",
					updatecancelcurrentregionediting : "Please update/cancel the current region editing",
					specialcharactersvalidation : "Special characters except '_' and ' ' are not allowed in name and description of lasso",
					polygonlassoatleastthreesides : "The polygon lasso drawn is not correct, please make sure that the polygon should have atleast three straight sides and angles.",
					canceleditprompt : "Do you wish to discard the lasso changes",
					polyincorrectdrawerror : "The polygon lasso drawn is not correct, please make sure that the polygon should have atleast three straight sides and angles.",
					conformationtitle : "Confirmation Required",
					conformationmessage : "Are you sure about this?",
					applylassofiltererror : "Error while applying lasso filter",
					newlassonotsavederror : "Error occurred while saving newly created lasso on DB",
					editlassonotsavederror : "Error occurred while saving newly edited lasso on DB",
					googleearth : "Google Earth",
					lassofiltermessage : "To apply lasso filter at least one layer with 'Refresh on Lasso'  as true should be selected and at least one lasso should be selected from the lasso dropdown list.",
					createCircleError : "Draw the Circle on map first. Please try again.",
					createRectangleError : "Draw the Rectangle on map first. Please try again.",
					ok : "Ok",
					polylassocreationerror : "While creation of a polygon lasso you can't edit any other lasso except the one you have just created",
				},

				lassofilterdata : {
					nofilterapplied : "No filter applied",
					showallintersections : "Show all intersections",
					showanyintersection : "Show any intersection",
					showallwithin : "Show all within",
					showalloutside : "Show all outside",
				},
				
				Google2dmapwindow : {
					title : "Show Google 2D Map",
					seestreets : "Click her to see streets",
					seetraffic : "Click her to see traffic",
					streets : "Streets",
					traffic : "Traffic",
					loadingerror : "Error occurred in loading Google 2D Maps: ",
					viewchangeerror : "Error occurred in Google 2d Maps View change: ",
				},
				
				streetviewwindow : {
					title : "Show Street Map",
					loadingerror :"Error while loading street view: ",
					locationerror : "Error while setting the location in streeview: ",
				},
				
				tabbedwindow : {
					highlight : "Show highlight on map",
				},
				searchbox : {
					enterlocation : "Enter location..."
				},
				
			};

			$si.i18N.Map.setDefaults($si.i18N.Map.regional[$si.viewer.locale]);

		});