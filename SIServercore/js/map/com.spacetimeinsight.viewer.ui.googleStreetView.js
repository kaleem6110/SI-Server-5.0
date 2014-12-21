/**
 * Google street view .
 */
define([
	'jquery',
    'jquery-ui',
    'common/com.spacetimeinsight.viewer.ui.window',
    'kendo',
    'extensions',
	$si.viewer.mapProperties['mapURL'],

],function($){
		$.widget('spacetimeinsight.siViewerGoogleStreetView', $.spacetimeinsight.siViewerWindow,{
			options : {
				windowAttributes : {
					height		: "350px",
					width 		: "700px",
					position: {
						top		: "130px",
						left		: "255px",
					},
				},
				windowTools 	: [],
				title 					: $si.i18N.Map.streetviewwindow.title,
				windowIcon 				: "css/images/streetmap.png",
				actions 	  		    : ["Minimize" , "Maximize","Close"],
				toolBarWidgetJS			: null,
				toolBarWidget			: null,
				group					: "Maps",
				groupIcon				: "css/images/google_map.png",
				myPano        			: null,
			},
			pluginName							: 'siViewerGoogleStreetView',
		    streetViewWindowId			: null,
			GOOGLE_STREET_VIEW_ID   	: 'googleStreetViewId',
			GOOGLE_STREET_DIV			   	: kendo.template("<div id='#= id #' style='width: 100%; height: 100%;float:left;z-index: 0;display: block'></div>"),
			DESCRIPTOR_ID          				: 'disclaimer',
			DESCRIPTOR_DIV          			: kendo.template("<div id='#= id #' style= 'width: 100%; height: 100%; float:center; z-index: 0; background-color: black; display: none'><center><br/><br/><font color='white' size='5'>Google Street-View does not have image data for the clicked location</font><br><br></center></div>"),

			_create: function(){
				var $this = this;
				this._super();

				// used in event handling. Each event is prefix by plugin name
				this.widgetEventPrefix = this.pluginName + "_";

				$(this.element).append(this.DESCRIPTOR_DIV({id: this.DESCRIPTOR_ID}));
				$(this.element).append(this.GOOGLE_STREET_DIV({id: this.GOOGLE_STREET_VIEW_ID}));

				$(this.element).addClass("sti-window-google-street-view");

				this.streetViewWindowId  = this.options.streetViewWindowId;

				this._initialize();

				$("#"+this.streetViewWindowId).bind("geMouseUpForStreet", function(e, lat, lon){
					$this._setMapView(lat, lon);
				});
				var $this = this;
				$this._addWindowMetadata();
	        	$(this.element).data("kendoWindow").wrapper.find(".k-i-minimize").click(function(e){
	        		 $this.minimizeWindow();
	        		 e.stopPropagation();
				});
			},

			resizeWindow : function(event) {
				if(this.options.myPano != null){
					google.maps.event.trigger(this.options.myPano, 'resize');
				}
			},
			
			_initialize: function () {
		 		try {

		 			var $this = this;
		 			var others='&sensor=false';
		 			if($si.viewer.mapProperties.hasOwnProperty('geclientid') && $si.viewer.mapProperties['geclientid'] != null && $si.viewer.mapProperties['geclientid'].length>0){
						others='client='+$si.viewer.mapProperties['geclientid']+'&sensor=false';
					}
					google.load("maps", $si.viewer.mapProperties['googlemapsversion'], {other_params: others, callback: function() {
								var lookAtStr = $this.options.getCurrentView();
										  	var lat = 37.4419;
										  	var lon = -122.1419;
										  	if(lookAtStr && lookAtStr != '') {
											  	lookAtArray = lookAtStr.split(",");
												lon = parseFloat(lookAtArray[0]);
												lat = parseFloat(lookAtArray[1]);
												$this._setMapView(lat,lon);
				  					}
						}
					});

				} catch (e) {
					$si.Logger('googleStreetView').error($si.i18N.Map.streetviewwindow.loadingerror + e.message);
				}
		 	},
		    _setMapView : function (lat, lon) {
		    	try {
		    		var $this = this;
		    		new google.maps.StreetViewService().getPanoramaByLocation(new google.maps.LatLng(parseFloat(lat), parseFloat(lon)),50,function(pnaoData,status){
						if(status == 'OK'){
							$this._showStreet();
							var defaultPosition = new google.maps.LatLng(lat, lon);
							var panoramaOptions = {
				    			position: defaultPosition,
				    			pov:{
				      				heading: 165,
				      				pitch: 0
				    			},
				    			zoom: 1
				  			};
							$this.options.myPano = new google.maps.StreetViewPanorama(document.getElementById($this.GOOGLE_STREET_VIEW_ID),panoramaOptions);
				  		}else{
				  			$this._showError();
				    	}
			    	});
		    	} catch(e) {
		    	 	$si.Logger('googleStreetView').error($si.i18N.Map.streetviewwindow.locationerror + e.message);
		    	}
			},

		    _showError : function() {
		    	var $this = this;
		    	var window = $($this.element);
				if(window.find("#"+$this.DESCRIPTOR_ID).css("display") == "none") {
					window.find("#"+$this.DESCRIPTOR_ID).css("display", "block");
					window.find("#"+$this.GOOGLE_STREET_VIEW_ID).css("display", "none");
					}
		    	},

			_showStreet : function() {
				var $this = this;
				var window = $($this.element);
				if(window.find("#"+$this.GOOGLE_STREET_VIEW_ID).css("display") == "none") {
					window.find("#"+$this.GOOGLE_STREET_VIEW_ID).css("display", "block");
					window.find("#"+$this.DESCRIPTOR_ID).css("display", "none");
		   		}
		    },
		    
		    minimizeWindow : function(){
 	 			var siWindow = $(this.element).data("kendoWindow");
 	        	 siWindow.wrapper.fadeOut(300);
 	 		},
		    

		});
});