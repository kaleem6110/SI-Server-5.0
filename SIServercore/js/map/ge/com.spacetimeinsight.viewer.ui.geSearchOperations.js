/**
 * Google Earth search operations are written in it.
 */
define([
    'jquery',
    'jquery-ui',
    'map/ge/com.spacetimeinsight.viewer.ui.geMap',
],function($){

	$.extend($.spacetimeinsight.siViewerGoogleEarth.prototype, {

		_locateAddress : function(address){
			var $this = this;
			try {
					 if($this._isCoordiante(address)) {
						 $this._setLookAtSearch(address);
					 } else {
						 $this._getGecodeFor(address);
					 }
			    } catch (error) {
			    	$si.Logger('geSearchOperations').error("Error while submit location: "+error);
			    }
		},
		_setLookAtSearch : function(coordStr){
			var $this = this;
			if(coordStr != null) {
				var coords = coordStr.split(",");
				if (coords != null){
					var noOfCoords = coords.length;

						var lookAt = this.options.gePluginInstance.createLookAt('');
						if(coords[0]) {
							$this.searchLocation.latitude = parseFloat(coords[0]);
						}
						if(coords[1]) {
							$this.searchLocation.longitude = parseFloat(coords[1]);
						}

						if(coords[2]) {
							$this.searchLocation.altitude = parseFloat(coords[2]);
						}
						if(coords[3]) {
							$this.searchLocation.range = parseFloat(coords[3]);
						}

						$this.setLookAt($this.searchLocation);
					}
				}
		},
		_isCoordiante: function(address) {
			if(address != null) {
	  			 address = address.trim();
	  			if(address != '') {
	  				//replace negative values
	  				address = address.replace('-','');
	  				var coordsArray = address.split(',');
	  				var regexLetter = /[a-zA-z]/;
	  				if(coordsArray != null && coordsArray.length >=2) {
	  					try {
	  						return parseFloat(coordsArray[0]) && parseFloat(coordsArray[1]) && parseFloat(coordsArray[2]) && parseFloat(coordsArray[3]) && !regexLetter.test(address);
	  					} catch(error) {
	  						$si.Logger('geSearchOperations').error("Error while validating Coordiante: "+error);

	  					}
	  				}
	  			}
	  		}
		},
		_getGecodeFor: function(address) {
			var $this = this;
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({ 'address': address},
		    function (results, status) {
		        if (status == google.maps.GeocoderStatus.OK)
		        {
		            var point = results[0].geometry.location;
		            var longitude =  $this.options.gePluginInstance.createLookAt('');

		            longitude.set(point.lat(), point.lng(), 100, $this.options.gePluginInstance.ALTITUDE_RELATIVE_TO_GROUND,0, 0, 400);
		            $this.options.gePluginInstance.getView().setAbstractView(longitude);
		            }
		    });
		},
	   });
});
