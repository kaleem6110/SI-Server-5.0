/**
 * Google map plug-in .
 */
define([
    'jquery',
    'jquery-ui',
    'common/com.spacetimeinsight.viewer.ui.window',
    'kendo',
     'extensions',
    $si.viewer.mapProperties['mapURL'],

],function($){
		$.widget('spacetimeinsight.siViewerGoogleMapView', $.spacetimeinsight.siViewerWindow,{
			options : {
				windowAttributes : {
					height			:"350px",
					width 			:"700px",
					position		: {
								top		: "130px",
								left	: "355px",
					},
				},
				actions 	  		: ["Minimize" , "Maximize","Close"],
				toolBarWidgetJS		: null,
				toolBarWidget		: null,
				windowTools 		: [],
				title 				: $si.i18N.Map.Google2dmapwindow.title,
				windowIcon 			: "css/images/google_map.png",
				group				: "Maps",
				groupIcon			: "css/images/google_map.png",
				map    				: null,
			},
			pluginName		      			: "siViewerGoogleMapView",
			trafficOverlayVisible 			: false,
			trafficOverlay	      			: null,
			streetOverlayVisible  			: false,
			streetsOverlay         			: null,
			streetsVisible     				: false,
			eventHandler          			: null,
			longitute             			: -122.1419,
			latitude 			  			: 37.4419,
			zoomLevel 			  			: 13,
			geMapWindowWindowId  			: null,
			GOOGLE_MAP_VIEW_ID				: "googleMapViewId",
			GOOGLE_MAP_DIV					: kendo.template("<div id='#= id #' style='width: 100%; height: 100%;float:left;z-index: 0'>&nbsp;</div>"),
			CONTROL_DIV 					: kendo.template("<div id='#= id #' class='gm-custom-button' style='background-color: white;border-style: solid; border-width:1px; cursor:pointer;text-align: center;' title ='#= title#'> <div style='fontFamily:Arial,sans-serif;fontSize:12px;paddingLeft:4px;paddingRight:4px; margin-right:5px; margin-left:5px; margin-top:1px' >#=control#</div> </div>"),

			// Called on instance creation
			_create: function(){
				var $this=this;
				this._super();
				$(this.element).append(this.GOOGLE_MAP_DIV({id: this.GOOGLE_MAP_VIEW_ID}));

				$(this.element).addClass("sti-window-google-map-view");

				this.geMapWindowWindowId = this.options.geMapWindowWindowId;

				this._initialize();

				$("#"+this.geMapWindowWindowId).bind("geMouseUpForMap", function(e, north, south, east, west){
					$this._setMapView(north, south, east, west);
				});
				
				$this._addWindowMetadata();
	        	$(this.element).data("kendoWindow").wrapper.find(".k-i-minimize").click(function(e){
	        		 $this.minimizeWindow();
	        		 e.stopPropagation();
				});
			},
			
			resizeWindow : function(event) {
				if(this.options.map != null){
					google.maps.event.trigger(this.options.map, 'resize');
				}
			},
			_initialize: function() {
			var $this = this;
		 		try{

		 			this._getCurrentMapView();
		 			/*
					 * default map , will be in map mode (roadmap) and
					 * streetview control turned off
					 */
		 			var others='&sensor=false';
					if($si.viewer.mapProperties.hasOwnProperty('geclientid') && $si.viewer.mapProperties['geclientid'] != null && $si.viewer.mapProperties['geclientid'].length>0){
						others='client='+$si.viewer.mapProperties['geclientid']+'&sensor=false';
					}
					google.load("maps", $si.viewer.mapProperties['googlemapsversion'], {other_params: others, callback: function() {
						$this._initializeMap();
					}
					});

				}catch(e){
					$si.Logger('googleMapView').error($si.i18N.Map.Google2dmapwindow.loadingerror + e.message);
				}
		    },
			_initializeMap:function(){
				var $this = this;
				var mapOptions = {
										center: new google.maps.LatLng(this.latitude, this.longitute),
										zoom: this.zoomLevel,
										mapTypeId: google.maps.MapTypeId.ROADMAP,
										streetViewControl: false
						        	};

						 			this.options.map = new google.maps.Map(document.getElementById(this.GOOGLE_MAP_VIEW_ID),mapOptions);
						 			$this._addCustomControls({
										id : 'streets' , title : $si.i18N.Map.Google2dmapwindow.seestreets, control : $si.i18N.Map.Google2dmapwindow.streets,
								 	});
						 			
						 			$this._addCustomControls ({
										id : 'traffic' , title : $si.i18N.Map.Google2dmapwindow.seetraffic , control : $si.i18N.Map.Google2dmapwindow.traffic,
						 			});
			},
			
		    _addCustomControls: function(control) {
				var $this = this;
				var controlDiv = document.createElement('div');
				controlDiv.index = 1;
				controlDiv.style.paddingTop = '6px';
				var controlUI = $this.CONTROL_DIV (control);
				controlDiv.innerHTML = controlUI;
				if(control.id === "streets"){
					$this._addStreetOverlay(controlDiv);
				} else if(control.id === "traffic"){
					$this._addTrafficOverlay(controlDiv);
				}
			$this.options.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
		    },

		    _addTrafficOverlay : function(controlDiv){
		    	var $this = this;
				var trafficDiv = controlDiv.childNodes[0];
				google.maps.event.addDomListener(trafficDiv, 'click', function() {
				  	if($this.trafficOverlay==null){
				   		$this.trafficOverlay = new google.maps.TrafficLayer();

				  	}
				  	if($this.trafficOverlay!=null && $this.trafficOverlayVisible ){
				  		$this.trafficOverlay.setMap(null);
				  		$this.trafficOverlayVisible=false;
				  	}else{
				  		$this.trafficOverlay.setMap($this.options.map);
				  		$this.trafficOverlayVisible=true;
				  	}
				});
		    },
			_addStreetOverlay : function(controlDiv) {
				var $this = this;
				var streetDiv = controlDiv.childNodes[0];
				google.maps.event.addDomListener(streetDiv, 'click', function() {
					if($this.streetsOverlay==null){
						$this.streetsOverlay=new google.maps.StreetViewCoverageLayer();

					}
					if($this.streetsOverlay!=null && $this.streetsVisible ){
						$this.streetsOverlay.setMap(null);
						$this.streetsVisible=false;
					}else{
						$this.streetsOverlay.setMap($this.options.map);
						$this.streetsVisible=true;
					}
				});
			},
		    _getCurrentMapView: function(){
		    	var $this = this;
				try {
						var currentView = $this.options.getCurrentView();
						var currentViewTokens = currentView.split( "," );
						if(currentViewTokens != null){

							if(currentViewTokens.length > 1) {
								$this.longitute = parseFloat(currentViewTokens[0]);
								$this.latitude = parseFloat(currentViewTokens[1]);
							}

							if(currentViewTokens.length > 2) {
								var range = parseFloat(currentViewTokens[2]);
								if(range > 26) {
									$this.zoomLevel = Math.round(26-(Math.log(range)/Math.log(2)));
								} else {
									$this.zoomLevel = range;
								}
							}
						}
				}catch (e) {
					$si.Logger('googleMapView').error(e.message);
				}
		 	},
		 	// set the map view when GE is moved
		    _setMapView: function (north, south, east, west){
				try{
					var $this = this;
					// Define the two corners of the bounding box
					var sw = new google.maps.LatLng(south, west);
					var ne = new google.maps.LatLng(north, east);

					// Create a bounding box
					var bounds = new google.maps.LatLngBounds(sw, ne);
					// Center map in the center of the bounding box
					// and calculate the appropriate zoom level
					$this.options.map.setCenter(bounds.getCenter());
					$this.options.map.fitBounds(bounds);
				}catch(e){
					$si.Logger('googleMapView').error($si.i18N.Map.Google2dmapwindow.viewchangeerror + e.message);
				}
			},
			
			minimizeWindow : function(){
 	 			var siWindow = $(this.element).data("kendoWindow");
 	        	 siWindow.wrapper.fadeOut(300);
 	 		},

		});
});