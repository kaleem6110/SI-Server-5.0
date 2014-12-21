define(
		[ 'siViewerData', ],
		function($si) {
			$si.i18N.Map = {
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
					moveuplassobutton : "Move Up",
					movedownlassobutton : "Move Down",
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
								
				lassoTools : [ "RECTANGLE", "POLYGON", "CIRCLE",
						"COLOR", "LASSOSICONDROPDOWN", "SAVE",
						"CLEAR", "MANAGELASSOS" ],

				mapTools : [ "PRINT", "EXPORTTOPNG", "LASSO",
						"SELECTLASSOS", "LASSOFILTERS", "SEARCH",
						"RULER", "STREETVIEW", "SHOWGOOGLEMAP",
						"LEGEND", "EXCEPTION" ],
						
						

				setDefaults : function(regionalData) {
					$si.i18N.Map.map = regionalData.map;
					$si.i18N.Map.tooltip.favorite = regionalData.tooltip.favorite;
					$si.i18N.Map.tooltip.filter = regionalData.tooltip.filter;
					$si.i18N.Map.tooltip.exporttopg = regionalData.tooltip.exporttopg;
					$si.i18N.Map.tooltip.lasso = regionalData.tooltip.lasso;
					$si.i18N.Map.tooltip.selectlassos = regionalData.tooltip.selectlassos;
					$si.i18N.Map.tooltip.lassofilters = regionalData.tooltip.lassofilters;
					$si.i18N.Map.tooltip.search = regionalData.tooltip.search;
					$si.i18N.Map.tooltip.ruler = regionalData.tooltip.ruler;
					$si.i18N.Map.tooltip.streetview = regionalData.tooltip.streetview;
					$si.i18N.Map.tooltip.showgooglemap = regionalData.tooltip.showgooglemap;
					$si.i18N.Map.tooltip.acknowledgealert = regionalData.tooltip.acknowledgealert;
					$si.i18N.Map.tooltip.exception = regionalData.tooltip.exception;
					$si.i18N.Map.tooltip.print = regionalData.tooltip.print;
					$si.i18N.Map.tooltip.exporttopng = regionalData.tooltip.exporttopng;
					$si.i18N.Map.tooltip.legend = regionalData.tooltip.legend;
					$si.i18N.Map.lassotooltip.rectangle = regionalData.lassotooltip.rectangle;
					$si.i18N.Map.lassotooltip.polygon = regionalData.lassotooltip.polygon;
					$si.i18N.Map.lassotooltip.circle = regionalData.lassotooltip.circle;
					$si.i18N.Map.lassotooltip.color = regionalData.lassotooltip.color;
					$si.i18N.Map.lassotooltip.lassosicondropdown = regionalData.lassotooltip.lassosicondropdown;
					$si.i18N.Map.lassotooltip.save = regionalData.lassotooltip.save;
					$si.i18N.Map.lassotooltip.clear = regionalData.lassotooltip.clear;
					$si.i18N.Map.lassotooltip.managelassos = regionalData.lassotooltip.managelassos;
					$si.i18N.Map.lassotooltip.lassosicon = regionalData.lassotooltip.lassosicon;
					$si.i18N.Map.saveLasso.savelasso = regionalData.saveLasso.savelasso;
					$si.i18N.Map.saveLasso.cancellasso = regionalData.saveLasso.cancellasso;
					$si.i18N.Map.saveLasso.lassoname = regionalData.saveLasso.lassoname;
					$si.i18N.Map.saveLasso.lassodescription = regionalData.saveLasso.lassodescription;
					$si.i18N.Map.saveLasso.lassoplaceholder = regionalData.saveLasso.lassoplaceholder;
					$si.i18N.Map.saveLasso.title = regionalData.saveLasso.title;
					$si.i18N.Map.saveLasso.lassonameemptyerror = regionalData.saveLasso.lassonameemptyerror;
					$si.i18N.Map.saveLasso.lassonameexceederror = regionalData.saveLasso.lassonameexceederror;
					$si.i18N.Map.saveLasso.lassodescriptionexceederror = regionalData.saveLasso.lassodescriptionexceederror;
					$si.i18N.Map.saveLasso.lassonamealreadtexistserror = regionalData.saveLasso.lassonamealreadtexistserror;
					$si.i18N.Map.manageLasso.title = regionalData.manageLasso.title;
					$si.i18N.Map.manageLasso.gridcolumnlabeltype = regionalData.manageLasso.gridcolumnlabeltype;
					$si.i18N.Map.manageLasso.gridcolumnlabelname = regionalData.manageLasso.gridcolumnlabelname;
					$si.i18N.Map.manageLasso.gridcolumnlabelowner = regionalData.manageLasso.gridcolumnlabelowner;
					$si.i18N.Map.manageLasso.gridcolumnlabeldescription = regionalData.manageLasso.gridcolumnlabeldescription;
					$si.i18N.Map.manageLasso.savebutton = regionalData.manageLasso.savebutton;
					$si.i18N.Map.manageLasso.cancelbuttton = regionalData.manageLasso.cancelbuttton;
					$si.i18N.Map.manageLasso.sharelassobutton = regionalData.manageLasso.sharelassobutton;
					$si.i18N.Map.manageLasso.deletelassobutton = regionalData.manageLasso.deletelassobutton;
					$si.i18N.Map.manageLasso.unsharelassobutton = regionalData.manageLasso.unsharelassobutton;
					$si.i18N.Map.manageLasso.moveuplassobutton = regionalData.manageLasso.moveuplassobutton;
					$si.i18N.Map.manageLasso.movedownlassobutton = regionalData.manageLasso.movedownlassobutton;
					$si.i18N.Map.lassofilterdata.nofilterapplied = regionalData.lassofilterdata.nofilterapplied;
					$si.i18N.Map.lassofilterdata.showallintersections = regionalData.lassofilterdata.showallintersections;
					$si.i18N.Map.lassofilterdata.showanyintersection = regionalData.lassofilterdata.showanyintersection;
					$si.i18N.Map.lassofilterdata.showallwithin = regionalData.lassofilterdata.showallwithin;
					$si.i18N.Map.lassofilterdata.showalloutside = regionalData.lassofilterdata.showalloutside;
					$si.i18N.Map.lassomessages.nottheowneroflassocantedit = regionalData.lassomessages.nottheowneroflassocantedit;
					$si.i18N.Map.lassomessages.updatecancelcurrentregionediting = regionalData.lassomessages.updatecancelcurrentregionediting;
					$si.i18N.Map.lassomessages.specialcharactersvalidation = regionalData.lassomessages.specialcharactersvalidation;
					$si.i18N.Map.lassomessages.polygonlassoatleastthreesides = regionalData.lassomessages.polygonlassoatleastthreesides;
					$si.i18N.Map.lassomessages.canceleditprompt = regionalData.lassomessages.canceleditprompt;
					$si.i18N.Map.lassomessages.polyincorrectdrawerror = regionalData.lassomessages.polyincorrectdrawerror;
					$si.i18N.Map.lassomessages.conformationtitle = regionalData.lassomessages.conformationtitle;
					$si.i18N.Map.lassomessages.conformationmessage = regionalData.lassomessages.conformationtitle;
					$si.i18N.Map.lassomessages.applylassofiltererror = regionalData.lassomessages.applylassofiltererror;					
					$si.i18N.Map.lassomessages.newlassonotsavederror = regionalData.lassomessages.newlassonotsavederror;
					$si.i18N.Map.lassomessages.editlassonotsavederror = regionalData.lassomessages.editlassonotsavederror;	
					$si.i18N.Map.lassomessages.googleearth = regionalData.lassomessages.googleearth;	
					$si.i18N.Map.lassomessages.lassofiltermessage = regionalData.lassomessages.lassofiltermessage;
					$si.i18N.Map.lassomessages.createCircleError = regionalData.lassomessages.createCircleError;	
					$si.i18N.Map.lassomessages.createRectangleError = regionalData.lassomessages.createRectangleError;
					$si.i18N.Map.lassomessages.ok = regionalData.lassomessages.ok;
					$si.i18N.Map.lassomessages.polylassocreationerror = regionalData.lassomessages.polylassocreationerror;
					$si.i18N.Map.Google2dmapwindow.title = regionalData.Google2dmapwindow.title;
					$si.i18N.Map.Google2dmapwindow.seestreets = regionalData.Google2dmapwindow.seestreets;
					$si.i18N.Map.Google2dmapwindow.seetraffic = regionalData.Google2dmapwindow.seetraffic;
					$si.i18N.Map.Google2dmapwindow.street = regionalData.Google2dmapwindow.street;
					$si.i18N.Map.Google2dmapwindow.traffic = regionalData.Google2dmapwindow.traffic;
					$si.i18N.Map.streetviewwindow.title = regionalData.streetviewwindow.title;
					$si.i18N.Map.streetviewwindow.loadingerror = regionalData.streetviewwindow.loadingerror;
					$si.i18N.Map.streetviewwindow.viewchangeerror = regionalData.streetviewwindow.viewchangeerror;
					$si.i18N.Map.tabbedwindow.highlight = regionalData.tabbedwindow.highlight;
					$si.i18N.Map.searchbox.enterlocation = regionalData.searchbox.enterlocation;
				},
			};

			$si.i18N.Map.regional = [];		});