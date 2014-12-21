/*
Copyright 2009 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
 * The geo namespace contains generic classes and namespaces for processing
 * geographic data in JavaScript. Where possible, an effort was made to keep
 * the library compatible with the Google Geo APIs (Maps, Earth, KML, etc.)
 * @namespace
 */
var geo = {isnamespace_:true};
/*
see https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference:Objects:Array:map
*/
//#JSCOVERAGE_IF !('map' in Array.prototype)
if (!('map' in Array.prototype)) {
  Array.prototype.map = function(mapFn) {
    var len = this.length;
    if (typeof mapFn != 'function') {
      throw new TypeError('map() requires a mapping function.');
    }

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this) {
        res[i] = mapFn.call(thisp, this[i], i, this);
      }
    }

    return res;
  };
}
//#JSCOVERAGE_ENDIF
/**
 * Create a new bounds object from the given parameters.
 * @param {geo.Bounds|geo.Point} [swOrBounds] Either an existing bounds object
 *     to copy, or the southwest, bottom coordinate of the new bounds object.
 * @param {geo.Point} [ne] The northeast, top coordinate of the new bounds
 *     object.
 * @constructor
 */
geo.Bounds = function() {
  // TODO: accept instances of GLatLngBounds

  // 1 argument constructor
  if (arguments.length == 1) {
    // copy constructor
    if (arguments[0].constructor === geo.Bounds) {
      var bounds = arguments[0];
      this.sw_ = new geo.Point(bounds.southWestBottom());
      this.ne_ = new geo.Point(bounds.northEastTop());

    // anything else, treated as the lone coordinate
    } else {
      this.sw_ = this.ne_ = new geo.Point(arguments[0]);

    }

  // Two argument constructor -- a northwest and southeast coordinate
  } else if (arguments.length == 2) {
    var sw = new geo.Point(arguments[0]);
    var ne = new geo.Point(arguments[1]);

    // handle degenerate cases
    if (!sw && !ne) {
      return;
    } else if (!sw) {
      sw = ne;
    } else if (!ne) {
      ne = sw;
    }

    if (sw.lat() > ne.lat()) {
      throw new RangeError('Bounds southwest coordinate cannot be north of ' +
                           'the northeast coordinate');
    }

    if (sw.altitude() > ne.altitude()) {
      throw new RangeError('Bounds southwest coordinate cannot be north of ' +
                           'the northeast coordinate');
    }

    // TODO: check for incompatible altitude modes

    this.sw_ = sw;
    this.ne_ = ne;
  }
};

/**
 * The bounds' southwest, bottom coordinate.
 * @type geo.Point
 */
geo.Bounds.prototype.southWestBottom = function() {
  return this.sw_;
};
geo.Bounds.prototype.sw_ = null;

/**
 * The bounds' northeast, top coordinate.
 * @type geo.Point
 */
geo.Bounds.prototype.northEastTop = function() {
  return this.ne_;
};
geo.Bounds.prototype.ne_ = null;

/**
 * Returns whether or not the bounds intersect the antimeridian.
 * @type Boolean
 */
geo.Bounds.prototype.crossesAntimeridian = function() {
  return (this.sw_.lng() > this.ne_.lng());
};

/**
 * Returns whether or not the bounds have an altitude component.
 * @type Boolean
 */
geo.Bounds.prototype.is3D = function() {
  return !this.isEmpty() && (this.sw_.is3D() || this.ne_.is3D());
};

/**
 * Returns whether or not the given point is inside the bounds.
 * @param {geo.Point} point The point to test.
 * @type Boolean
 */
geo.Bounds.prototype.containsPoint = function(point) {
  if (this.isEmpty())
    return false;

  // check latitude
  if (!(this.sw_.lat() <= point.lat() && point.lat() <= this.ne_.lat())) {
    return false;
  }

  // check altitude
  if (this.is3D() && !(this.sw_.altitude() <= point.altitude() &&
                       point.altitude() <= this.ne_.altitude())) {
    return false;
  }

  // check longitude
  if (this.crossesAntimeridian()) {
    return (point.lng() <= this.ne_.lng() || point.lng() >= this.sw_.lng());
  } else {
    return (this.sw_.lng() <= point.lng() && point.lng() <= this.ne_.lng());
  }
};

/**
 * Gets the longitudinal span of the given west and east coordinates.
 * @private
 * @param {Number} west
 * @param {Number} east
 */
geo.Bounds.lngSpan_ = function(west, east) {
  return (west > east) ? (east + 360 - west) : (east - west);
};

/**
 * Extends the bounds object by the given point, if the bounds don't already
 * contain the point. Longitudinally, the bounds will be extended either east
 * or west, whichever results in a smaller longitudinal span.
 * @param {geo.Point} point The point to extend the bounds by.
 */
geo.Bounds.prototype.extend = function(point) {
  if (this.containsPoint(point)) {
    return;
  }

  if (this.isEmpty()) {
    this.sw_ = this.ne_ = point;
    return;
  }

  // extend up or down
  var newBottom = this.sw_.altitude();
  var newTop = this.ne_.altitude();

  if (this.is3D()) {
    newBottom = Math.min(this.sw_.altitude(), point.altitude());
    newTop = Math.min(this.ne_.altitude(), point.altitude());
  }

  // extend north or south
  var newSouth = Math.min(this.sw_.lat(), point.lat());
  var newNorth = Math.max(this.ne_.lat(), point.lat());

  // try extending east and try extending west, and use the one that
  // has the smaller longitudinal span
  var extendEastLngSpan = geo.Bounds.lngSpan_(this.sw_.lng(), point.lng());
  var extendWestLngSpan = geo.Bounds.lngSpan_(point.lng(), this.ne_.lng());

  var newWest = this.sw_.lng();
  var newEast = this.ne_.lng();

  if (extendEastLngSpan <= extendWestLngSpan) {
    newEast = point.lng();
  } else {
    newWest = point.lng();
  }

  // update the bounds' coordinates
  this.sw_ = new geo.Point(newSouth, newWest, newBottom);
  this.ne_ = new geo.Point(newNorth, newEast, newTop);
};

/**
 * Returns the bounds' latitude, longitude, and altitude span as an object
 * literal.
 * @return {Object} Returns an object literal containing `lat`, `lng`, and
 *     `altitude` properties. Altitude will be null in the case that the bounds
 *     aren't 3D.
 */
geo.Bounds.prototype.span = function() {
  return {
    lat: (this.ne_.lat() - this.sw_.lat()),
    lng: geo.Bounds.lngSpan_(this.sw_.lng(), this.ne_.lng()),
    altitude: this.is3D() ? (this.ne_.altitude() - this.sw_.altitude()) : null
  };
};

/**
 * Determines whether or not the bounds object is empty, i.e. whether or not it
 * has no known associated points.
 * @type Boolean
 */
geo.Bounds.prototype.isEmpty = function() {
  return (this.sw_ == null && this.sw_ == null);
};

/**
 * Gets the center of the bounds.
 * @type geo.Point
 */
geo.Bounds.prototype.getCenter = function() {
  if (this.isEmpty())
    return null;

  return new geo.Point(
    (this.sw_.lat() + this.ne_.lat()) / 2,
    this.crossesAntimeridian() ?
        geo.math.normalizeLng(
            this.sw_.lng() +
            geo.Bounds.lngSpan_(this.sw_.lng(), this.ne_.lng()) / 2) :
        (this.sw_.lng() + this.ne_.lng()) / 2,
    (this.sw_.altitude() + this.ne_.altitude()) / 2);
};

/**
 * Determines whether or not the bounds occupy the entire latitudinal range.
 * @type Boolean
 */
geo.Bounds.prototype.isFullLat = function() {
  return (this.sw_.lat() == -90 && this.ne_.lng() == 90);
};

/**
 * Determines whether or not the bounds occupy the entire longitudinal range.
 * @type Boolean
 */
geo.Bounds.prototype.isFullLng = function() {
  return (this.sw_.lng() == -180 && this.ne_.lng() == 180);
};

// TODO: equals(other)
// TODO: intersects(other)
// TODO: containsBounds(other)
// TODO: geo.ALTITUDE_NONE to differentiate 2D/3D coordinates
geo.ALTITUDE_CLAMP_TO_GROUND = 0;
geo.ALTITUDE_RELATIVE_TO_GROUND = 1;
geo.ALTITUDE_ABSOLUTE = 2;
/**
 * @namespace
 */
geo.math = {isnamespace_:true};
/**
 * Converts an angle from radians to degrees.
 * @type Number
 * @return Returns the angle, converted to degrees.
 */
if (!('toDegrees' in Number.prototype)) {
  Number.prototype.toDegrees = function() {
    return this * 180 / Math.PI;
  };
}

/**
 * Converts an angle from degrees to radians.
 * @type Number
 * @return Returns the angle, converted to radians.
 */
if (!('toRadians' in Number.prototype)) {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  };
}
/**
 * Normalizes an angle to the [0,2pi) range.
 * @param {Number} angleRad The angle to normalize, in radians.
 * @type Number
 * @return Returns the angle, fit within the [0,2pi) range, in radians.
 */
geo.math.normalizeAngle = function(angleRad) {
  angleRad = angleRad % (2 * Math.PI);
  return angleRad >= 0 ? angleRad : angleRad + 2 * Math.PI;
};

/**
 * Normalizes a latitude to the [-90,90] range. Latitudes above 90 or
 * below -90 are capped, not wrapped.
 * @param {Number} lat The latitude to normalize, in degrees.
 * @type Number
 * @return Returns the latitude, fit within the [-90,90] range.
 */
geo.math.normalizeLat = function(lat) {
  return Math.max(-90, Math.min(90, lat));
};

/**
 * Normalizes a longitude to the [-180,180] range. Longitudes above 180
 * or below -180 are wrapped.
 * @param {Number} lng The longitude to normalize, in degrees.
 * @type Number
 * @return Returns the latitude, fit within the [-90,90] range.
 */
geo.math.normalizeLng = function(lng) {
  if (lng % 360 == 180) {
    return 180;
  }

  lng = lng % 360;
  return lng < -180 ? lng + 360 : lng > 180 ? lng - 360 : lng;
};

/**
 * Reverses an angle.
 * @param {Number} angleRad The angle to reverse, in radians.
 * @type Number
 * @return Returns the reverse angle, in radians.
 */
geo.math.reverseAngle = function(angleRad) {
  return geo.math.normalizeAngle(angleRad + Math.PI);
};
/**
 * The radius of the Earth, in meters, assuming the Earth is a perfect sphere.
 * @see http://en.wikipedia.org/wiki/Earth_radius
 * @type Number
 */
geo.math.EARTH_RADIUS = 6378135;

/**
 * The average radius-of-curvature of the Earth, in meters.
 * @see http://en.wikipedia.org/wiki/Radius_of_curvature_(applications)
 * @type Number
 * @ignore
 */
geo.math.EARTH_RADIUS_CURVATURE_AVG = 6372795;
/**
 * Returns the approximate sea level great circle (Earth) distance between
 * two points using the Haversine formula and assuming an Earth radius of
 * geo.math.EARTH_RADIUS.
 * @param {geo.Point} point1 The first point.
 * @param {geo.Point} point2 The second point.
 * @return {Number} The Earth distance between the two points, in meters.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 */
geo.math.distance = function(point1, point2) {
  return geo.math.EARTH_RADIUS * geo.math.angularDistance(point1, point2);
};

/*
Vincenty formula:
geo.math.angularDistance = function(point1, point2) {
  point1 = new geo.Point(point1);
  point2 = new geo.Point(point2);
  
  var phi1 = point1.lat.toRadians();
  var phi2 = point2.lat.toRadians();
  
  var sin_phi1 = Math.sin(phi1);
  var cos_phi1 = Math.cos(phi1);
  
  var sin_phi2 = Math.sin(phi2);
  var cos_phi2 = Math.cos(phi2);
  
  var sin_d_lmd = Math.sin(
      point2.lng.toRadians() - point1.lng.toRadians());
  var cos_d_lmd = Math.cos(
      point2.lng.toRadians() - point1.lng.toRadians());
  
  // TODO: options to specify formula
  // TODO: compute radius of curvature at given point for more precision
  
  // Vincenty formula (may replace with Haversine for performance?)
  return Math.atan2(
      Math.sqrt(
        Math.pow(cos_phi2 * sin_d_lmd, 2) +
        Math.pow(cos_phi1 * sin_phi2 - sin_phi1 * cos_phi2 * cos_d_lmd, 2)
      ), sin_phi1 * sin_phi2 + cos_phi1 * cos_phi2 * cos_d_lmd);
}
*/
/**
 * Returns the angular distance between two points using the Haversine
 * formula.
 * @see geo.math.distance
 * @ignore
 */
geo.math.angularDistance = function(point1, point2) {
  var phi1 = point1.lat().toRadians();
  var phi2 = point2.lat().toRadians();
  
  var d_phi = (point2.lat() - point1.lat()).toRadians();
  var d_lmd = (point2.lng() - point1.lng()).toRadians();
  
  var A = Math.pow(Math.sin(d_phi / 2), 2) +
          Math.cos(phi1) * Math.cos(phi2) *
            Math.pow(Math.sin(d_lmd / 2), 2);
  
  return 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));
};
// TODO: add non-sea level distance using Earth API's math3d.js or Sylvester
/*
    p1 = V3.latLonAltToCartesian([loc1.lat(), loc1.lng(),
      this.ge.getGlobe().getGroundAltitude(loc1.lat(), loc1.lng())]);
    p2 = V3.latLonAltToCartesian([loc2.lat(), loc2.lng(),
      this.ge.getGlobe().getGroundAltitude(loc2.lat(), loc2.lng())]);
    return V3.earthDistance(p1, p2);
*/

/**
 * Calculates the initial heading/bearing at which an object at the start
 * point will need to travel to get to the destination point.
 * @param {geo.Point} start The start point.
 * @param {geo.Point} dest The destination point.
 * @return {Number} The initial heading required to get to the destination
 *     point, in the [0,360) degree range.
 * @see http://mathforum.org/library/drmath/view/55417.html
 */
geo.math.heading = function(start, dest) {
  var phi1 = start.lat().toRadians();
  var phi2 = dest.lat().toRadians();
  var cos_phi2 = Math.cos(phi2);
  
  var d_lmd = (dest.lng() - start.lng()).toRadians();
  
  return geo.math.normalizeAngle(Math.atan2(
      Math.sin(d_lmd) * cos_phi2,
      Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * cos_phi2 *
        Math.cos(d_lmd))).toDegrees();
};

/**
 * @function
 * @param {geo.Point} start
 * @param {geo.Point} dest
 * @return {Number}
 * @see geo.math.heading
 */
geo.math.bearing = geo.math.heading;

/**
 * Calculates an intermediate point on the geodesic between the two given
 * points.
 * @param {geo.Point} point1 The first point.
 * @param {geo.Point} point2 The second point.
 * @param {Number} [fraction] The fraction of distance between the first
 *     and second points.
 * @return {geo.Point}
 * @see http://williams.best.vwh.net/avform.htm#Intermediate
 */
geo.math.midpoint = function(point1, point2, fraction) {
  // TODO: check for antipodality and fail w/ exception in that case
  if (geo.util.isUndefined(fraction) || fraction === null) {
    fraction = 0.5;
  }
  
  var phi1 = point1.lat().toRadians();
  var phi2 = point2.lat().toRadians();
  var lmd1 = point1.lng().toRadians();
  var lmd2 = point2.lng().toRadians();
  
  var cos_phi1 = Math.cos(phi1);
  var cos_phi2 = Math.cos(phi2);
  
  var angularDistance = geo.math.angularDistance(point1, point2);
  var sin_angularDistance = Math.sin(angularDistance);
  
  var A = Math.sin((1 - fraction) * angularDistance) / sin_angularDistance;
  var B = Math.sin(fraction * angularDistance) / sin_angularDistance;
  
  var x = A * cos_phi1 * Math.cos(lmd1) +
          B * cos_phi2 * Math.cos(lmd2);
  
  var y = A * cos_phi1 * Math.sin(lmd1) +
          B * cos_phi2 * Math.sin(lmd2);
  
  var z = A * Math.sin(phi1) +
          B * Math.sin(phi2);
  
  return new geo.Point(
      Math.atan2(z, Math.sqrt(Math.pow(x, 2) +
                              Math.pow(y, 2))).toDegrees(),
      Math.atan2(y, x).toDegrees());
};

/**
 * Calculates the destination point along a geodesic, given an initial heading
 * and distance, from the given start point.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 * @param {geo.Point} start The start point.
 * @param {Object} options The heading and distance object literal.
 * @param {Number} options.heading The initial heading, in degrees.
 * @param {Number} options.distance The distance along the geodesic, in meters.
 * @return {geo.Point}
 */
geo.math.destination = function(start, options) {
  if (!('heading' in options && 'distance' in options)) {
    throw new TypeError('destination() requres both heading and ' +
                        'distance options.');
  }
  
  var phi1 = start.lat().toRadians();
  
  var sin_phi1 = Math.sin(phi1);
  
  var angularDistance = options.distance / geo.math.EARTH_RADIUS;
  var heading_rad = options.heading.toRadians();
  
  var sin_angularDistance = Math.sin(angularDistance);
  var cos_angularDistance = Math.cos(angularDistance);
  
  var phi2 = Math.asin(
               sin_phi1 * cos_angularDistance + 
               Math.cos(phi1) * sin_angularDistance *
                 Math.cos(heading_rad));
  
  return new geo.Point(
      phi2.toDegrees(),
      Math.atan2(
        Math.sin(heading_rad) *
          sin_angularDistance * Math.cos(phi2),
        cos_angularDistance - sin_phi1 * Math.sin(phi2)).toDegrees() +
        start.lng());
};
/**
 * Creates a new path from the given parameters.
 * @param {geo.Path|geo.Point[]|PointSrc[]|KmlLineString} path The path data.
 * @constructor
 */
geo.Path = function() {
  // TODO: accept instances of GPolyline
  this.coords_ = []; // don't use mutable objects in global defs
  var coordArraySrc = null;
  var i;
  
  // 1 argument constructor
  if (arguments.length == 1) {
    var path = arguments[0];
    
    // copy constructor
    if (path.constructor === geo.Path) {
      for (i = 0; i < path.numCoords(); i++) {
        this.coords_.push(new geo.Point(path.coord(i)));
      }
    
    // array constructor
    } else if (geo.util.isArray(path)) {
      // check if it's an array of numbers (not array of arrays)
      if (!path.length || geo.util.isArray(path[0])) {
        // an array of arrays (i.e. an array of points)
        coordArraySrc = path;
      } else {
        // a single-coord array
        coordArraySrc = [path];
      }
    
    // construct from Earth API object
    } else if (geo.util.isEarthAPIObject_(path)) {
      var type = path.getType();
      
      // contruct from KmlLineString
      if (type == 'KmlLineString' ||
          type == 'KmlLinearRing') {
        var n = path.getCoordinates().getLength();
        for (i = 0; i < n; i++) {
          this.coords_.push(new geo.Point(path.getCoordinates().get(i)));
        }
      
      // can't construct from the passed-in Earth object
      } else {
        throw new TypeError(
            'Could not create a path from the given arguments');
      }
    
    // can't construct from the given argument
    } else {
      throw new TypeError('Could not create a path from the given arguments');
    }
  
  // Assume each argument is a PointSrc, i.e.
  // new Path(p1, p2, p3) ==>
  //    new Path([new Point(p1), new Point(p2), new Point(p3)])
  } else {
    coordArraySrc = arguments;
  }
  
  // construct from an array (presumably of PointSrcs)
  if (coordArraySrc) {
    for (i = 0; i < coordArraySrc.length; i++) {
      this.coords_.push(new geo.Point(coordArraySrc[i]));
    }
  }
};

/**#@+
  @field
*/

/**
 * The path's coordinates array.
 * @type Number
 * @private
 */
geo.Path.prototype.coords_ = null; // don't use mutable objects here

/**#@-*/

/**
 * Returns the string representation of the path.
 * @type String
 */
geo.Path.prototype.toString = function() {
  return '[' + this.coords_.map(function(p) {
                                  return p.toString();
                                }).join(', ') + ']';
};

/**
 * Determines whether or not the given path is the same as this one.
 * @param {geo.Path} otherPath The other path.
 * @type Boolean
 */
geo.Path.prototype.equals = function(p2) {
  for (var i = 0; i < p2.numCoords(); i++) {
    if (!this.coord(i).equals(p2.coord(i))) {
      return false;
    }
  }
  
  return true;
};

/**
 * Returns the number of coords in the path.
 */
geo.Path.prototype.numCoords = function() {
  return this.coords_.length;
};

/**
 * Returns the coordinate at the given index in the path.
 * @param {Number} index The index of the coordinate.
 * @type geo.Point
 */
geo.Path.prototype.coord = function(i) {
  // TODO: bounds check
  return this.coords_[i];
};

/**
 * Prepends the given coordinate to the path.
 * @param {geo.Point|PointSrc} coord The coordinate to prepend.
 */
geo.Path.prototype.prepend = function(coord) {
  this.coords_.unshift(new geo.Point(coord));
};

/**
 * Appends the given coordinate to the path.
 * @param {geo.Point|PointSrc} coord The coordinate to append.
 */
geo.Path.prototype.append = function(coord) {
  this.coords_.push(new geo.Point(coord));
};

/**
 * Inserts the given coordinate at the i'th index in the path.
 * @param {Number} index The index to insert into.
 * @param {geo.Point|PointSrc} coord The coordinate to insert.
 */
geo.Path.prototype.insert = function(i, coord) {
  // TODO: bounds check
  this.coords_.splice(i, 0, new geo.Point(coord));
};

/**
 * Removes the coordinate at the i'th index from the path.
 * @param {Number} index The index of the coordinate to remove.
 */
geo.Path.prototype.remove = function(i) {
  // TODO: bounds check
  this.coords_.splice(i, 1);
};

/**
 * Returns a sub path, containing coordinates starting from the
 * startIndex position, and up to but not including the endIndex
 * position.
 * @type geo.Path
 */
geo.Path.prototype.subPath = function(startIndex, endIndex) {
  return this.coords_.slice(startIndex, endIndex);
};


///////////////
// non-trivial stuff

/**
 * Calculates the total length of the path using great circle distance
 * calculations.
 * @return {Number} The total length of the path, in meters.
 */
geo.Path.prototype.distance = function() {
  var dist = 0;
  for (var i = 0; i < this.coords_.length - 1; i++) {
    dist += this.coords_[i].distance(this.coords_[i + 1]);
  }
  
  return dist;
};

/**
 * Returns whether or not the path, when closed, contains the given point.
 * Thanks to Mike Williams of http://econym.googlepages.com/epoly.htm and
 * http://alienryderflex.com/polygon/ for this code.
 * @param {geo.Point} point The point to test.
 */
geo.Path.prototype.containsPoint = function(point) {
  var oddNodes = false;
  var y = point.lat();
  var x = point.lng();
  for (var i = 0; i < this.coords_.length; i++) {
    var j = (i + 1) % this.coords_.length;
    if (((this.coords_[i].lat() < y && this.coords_[j].lat() >= y) ||
         (this.coords_[j].lat() < y && this.coords_[i].lat() >= y)) &&
        (this.coords_[i].lng() + (y - this.coords_[i].lat()) /
                               (this.coords_[j].lat() - this.coords_[i].lat()) *
                               (this.coords_[j].lng() - this.coords_[i].lng())
         < x)) {
      oddNodes = !oddNodes;
    }
  }
  
  return oddNodes;
};

/**
 * Returns the latitude/longitude bounds wholly containing this path.
 * @type geo.Bounds
 */
geo.Path.prototype.bounds = function() {
  if (!this.numCoords()) {
    return new geo.Bounds();
  }

  var bounds = new geo.Bounds(this.coord(0));

  // TODO: optimize
  var numCoords = this.numCoords();
  for (var i = 1; i < numCoords; i++) {
    bounds.extend(this.coord(i));
  }

  return bounds;
};
// TODO: unit test

/**
 * Returns the approximate area of the polygon formed by the path when the path
 * is closed.
 * @return {Number} The approximate area, in square meters.
 * @see http://econym.googlepages.com/epoly.htm
 * @note This method only works with non-intersecting polygons.
 */
geo.Path.prototype.area = function() {
  var a = 0;
  var b = this.bounds();
  var x0 = b.southWestBottom().lng();
  var y0 = b.southWestBottom().lat();

  var numCoords = this.numCoords();
  for (var i = 0; i < numCoords; i++) {
    var j = (i + 1) % numCoords;
    var x1 = this.coord(i).distance(new geo.Point(this.coord(i).lat(), x0));
    var x2 = this.coord(j).distance(new geo.Point(this.coord(j).lat(), x0));
    var y1 = this.coord(i).distance(new geo.Point(y0, this.coord(i).lng()));
    var y2 = this.coord(j).distance(new geo.Point(y0, this.coord(j).lng()));
    a += x1 * y2 - x2 * y1;
  }

  return Math.abs(a * 0.5);
};
// TODO: unit test
/**
 * Creates a new point from the given parameters.
 * @param {geo.Point|Number[]|KmlPoint|KmlLookAt|KmlCoord|KmlLocation} src
 *     The point data.
 * @constructor
 */
geo.Point = function() {
  // TODO: accept instances of GLatLng and accept point object literals
  var pointArraySrc = null;
  
  // 1 argument constructor
  if (arguments.length == 1) {
    var point = arguments[0];
    
    // copy constructor
    if (point.constructor === geo.Point) {
      this.lat_ = point.lat();
      this.lng_ = point.lng();
      this.altitude_ = point.altitude();
      this.altitudeMode_ = point.altitudeMode();
      
    // array constructor
    } else if (geo.util.isArray(point)) {
      pointArraySrc = point;
    
    // constructor from an Earth API object
    } else if (geo.util.isEarthAPIObject_(point)) {
      var type = point.getType();
      
      // KmlPoint and KmlLookAt constructor
      if (type == 'KmlPoint' ||
          type == 'KmlLookAt') {
        this.lat_ = point.getLatitude();
        this.lng_ = point.getLongitude();
        this.altitude_ = point.getAltitude();
        this.altitudeMode_ = point.getAltitudeMode();
      
      // KmlCoord and KmlLocation constructor
      } else if (type == 'KmlCoord' ||
                 type == 'KmlLocation') {
        this.lat_ = point.getLatitude();
        this.lng_ = point.getLongitude();
        this.altitude_ = point.getAltitude();
      
      // Error, can't create a Point from any other Earth object
      } else {
        throw new TypeError(
            'Could not create a point from the given Earth object');
      }
    
    // Error, can't create a Point from the single argument
    } else {
      throw new TypeError('Could not create a point from the given arguments');
    }
  
  // Assume each argument is a point coordinate, i.e.
  // new Point(0, 1, 2) ==> new Point([0, 1, 2])
  } else {
    pointArraySrc = arguments;
  }
  
  // construct from an array
  if (pointArraySrc) {
    // TODO: type check
    this.lat_ = pointArraySrc[0];
    this.lng_ = pointArraySrc[1];
    if (pointArraySrc.length >= 3) {
      this.altitude_ = pointArraySrc[2];
      if (pointArraySrc.length >= 4) {
        this.altitudeMode_ = pointArraySrc[3];
      }
    }
  }

  // normalize
  this.lat_ = geo.math.normalizeLat(this.lat_);
  this.lng_ = geo.math.normalizeLng(this.lng_);
};

/**
 * The point's latitude, in degrees.
 * @type Number
 */
geo.Point.prototype.lat = function() {
  return this.lat_;
};
geo.Point.prototype.lat_ = 0;

/**
 * The point's longitude, in degrees.
 * @type Number
 */
geo.Point.prototype.lng = function() {
  return this.lng_;
};
geo.Point.prototype.lng_ = 0;

/**
 * The point's altitude, in meters.
 * @type Number
 */
geo.Point.prototype.altitude = function() {
  return this.altitude_;
};
geo.Point.prototype.altitude_ = 0;

/**
 * The point's altitude mode.
 * @type KmlAltitudeModeEnum
 */
geo.Point.prototype.altitudeMode = function() {
  return this.altitudeMode_;
};
geo.Point.prototype.altitudeMode_ = geo.ALTITUDE_RELATIVE_TO_GROUND;

/**
 * Returns the string representation of the point.
 * @type String
 */
geo.Point.prototype.toString = function() {
  return '(' + this.lat().toString() + ', ' + this.lng().toString() + ', ' +
      this.altitude().toString() + ')';
};

/**
 * Returns the 2D (no altitude) version of this point.
 * @type geo.Point
 */
geo.Point.prototype.flatten = function() {
  return new geo.Point(this.lat(), this.lng());
};

/**
 * Determines whether or not this point has an altitude component.
 * @type Boolean
 */
geo.Point.prototype.is3D = function() {
  return this.altitude_ != 0;
};

/**
 * Determines whether or not the given point is the same as this one.
 * @param {geo.Point} otherPoint The other point.
 * @type Boolean
 */
geo.Point.prototype.equals = function(p2) {
  return this.lat() == p2.lat() &&
         this.lng() == p2.lng() &&
         this.altitude() == p2.altitude() &&
         this.altitudeMode() == p2.altitudeMode();
};

/**
 * Returns the angular distance between this point and the destination point.
 * @param {geo.Point} dest The destination point.
 * @see geo.math.angularDistance
 * @ignore
 */
geo.Point.prototype.angularDistance = function(dest) {
  return geo.math.angularDistance(this, dest);
};

/**
 * Returns the approximate sea level great circle (Earth) distance between
 * this point and the destination point using the Haversine formula and
 * assuming an Earth radius of geo.math.EARTH_RADIUS.
 * @param {geo.Point} dest The destination point.
 * @return {Number} The distance, in meters, to the destination point.
 * @see geo.math.distance
 */
geo.Point.prototype.distance = function(dest) {
  return geo.math.distance(this, dest);
};

/**
 * Calculates the initial heading/bearing at which an object at the start
 * point will need to travel to get to the destination point.
 * @param {geo.Point} dest The destination point.
 * @return {Number} The initial heading required to get to the destination
 *     point, in the [0,360) degree range.
 * @see geo.math.heading
 */
geo.Point.prototype.heading = function(dest) {
  return geo.math.heading(this, dest);
};

/**
 * Calculates an intermediate point on the geodesic between this point and the
 * given destination point.
 * @param {geo.Point} dest The destination point.
 * @param {Number} [fraction] The fraction of distance between the first
 *     and second points.
 * @return {geo.Point}
 * @see geo.math.midpoint
 */
geo.Point.prototype.midpoint = function(dest, fraction) {
  return geo.math.midpoint(this, dest, fraction);
};

/**
 * Calculates the destination point along a geodesic, given an initial heading
 * and distance, starting at this point.
 * @param {Object} options The heading and distance object literal.
 * @param {Number} options.heading The initial heading, in degrees.
 * @param {Number} options.distance The distance along the geodesic, in meters.
 * @return {geo.Point}
 * @see geo.math.destination
 */
geo.Point.prototype.destination = function(options) {
  return geo.math.destination(this, options);
};
/**
 * Creates a new polygon from the given parameters.
 * @param {geo.Polygon|geo.Path} outerBoundary
 *     The polygon's outer boundary.
 * @param {geo.Path[]} [innerBoundaries]
 *     The polygon's inner boundaries, if any.
 * @constructor
 */
geo.Polygon = function() {
  // TODO: accept instances of GPolygon, GPolyline
  this.innerBoundaries_ = [];
  var i;
  
  // 0 argument constructor
  if (arguments.length === 0) {
    this.outerBoundary_ = new geo.Path();
  
  // 1 argument constructor
  } else if (arguments.length == 1) {
    var poly = arguments[0];
    
    // copy constructor
    if (poly.constructor === geo.Polygon) {
      this.outerBoundary_ = new geo.Path(poly.outerBoundary());
      for (i = 0; i < poly.innerBoundaries().length; i++) {
        this.innerBoundaries_.push(new geo.Path(poly.innerBoundaries()[i]));
      }
    
    // construct from Earth API object
    } else if (geo.util.isEarthAPIObject_(poly)) {
      var type = poly.getType();

      // construct from KmlLineString
      if (type == 'KmlLineString' ||
          type == 'KmlLinearRing') {
        this.outerBoundary_ = new geo.Path(poly);
      
      // construct from KmlPolygon
      } else if (type == 'KmlPolygon') {
        this.outerBoundary_ = new geo.Path(poly.getOuterBoundary());
        
        var ibChildNodes = poly.getInnerBoundaries().getChildNodes();
        var n = ibChildNodes.getLength();
        for (i = 0; i < n; i++) {
          this.innerBoundaries_.push(new geo.Path(ibChildNodes.item(i)));
        }
      
      // can't construct from the passed-in Earth object
      } else {
        throw new TypeError(
            'Could not create a polygon from the given arguments');
      }
    
    // treat first argument as an outer boundary path
    } else {
      this.outerBoundary_ = new geo.Path(arguments[0]);
    }
  
  // multiple argument constructor, either:
  // - arrays of numbers (outer boundary coords)
  // - a path (outer boundary) and an array of paths (inner boundaries)
  } else {
    if (arguments[0].length && typeof arguments[0][0] == 'number') {
      // ...new geo.Polygon([0,0], [1,1], [2,2]...
      this.outerBoundary_ = new geo.Path(arguments);
    } else if (arguments[1]) {
      // ...new geo.Polygon([ [0,0] ... ], [ [ [0,0], ...
      this.outerBoundary_ = new geo.Path(arguments[0]);
      if (!geo.util.isArray(arguments[1])) {
        throw new TypeError('Second argument to geo.Polygon constructor ' +
                            'must be an array of paths.');
      }
      
      for (i = 0; i < arguments[1].length; i++) {
        this.innerBoundaries_.push(new geo.Path(arguments[1][i]));
      }
    } else {
      throw new Error('Cannot create a path from the given arguments.');
    }
  }
};

/**#@+
  @field
*/

/**
 * The polygon's outer boundary (path).
 * @type {geo.Path}
 * @private
 */
geo.Polygon.prototype.outerBoundary_ = null;

/**
 * The polygon's inner boundaries.
 * @type {geo.Path[]}
 * @private
 */
geo.Polygon.prototype.innerBoundaries_ = null; // don't use mutable objects

/**#@-*/

/**
 * Returns the string representation of the polygon, useful primarily for
 * debugging purposes.
 * @type String
 */
geo.Polygon.prototype.toString = function() {
  return 'Polygon: ' + this.outerBoundary().toString() +
      (this.innerBoundaries().length ?
        ', (' + this.innerBoundaries().length + ' inner boundaries)' : '');
};


/**
 * Returns the polygon's outer boundary path.
 * @type geo.Path
 */
geo.Polygon.prototype.outerBoundary = function() {
  return this.outerBoundary_;
};

/**
 * Returns an array containing the polygon's inner boundaries.
 * You may freely add or remove geo.Path objects to this array.
 * @type geo.Path[]
 */
geo.Polygon.prototype.innerBoundaries = function() {
  return this.innerBoundaries_;
};
// TODO: deprecate writability to this in favor of addInnerBoundary and
// removeInnerBoundary

/**
 * Returns whether or not the polygon contains the given point.
 * @see geo.Path.containsPoint
 * @see http://econym.googlepages.com/epoly.htm
 */
geo.Polygon.prototype.containsPoint = function(point) {
  // outer boundary should contain the point
  if (!this.outerBoundary_.containsPoint(point)) {
    return false;
  }
  
  // none of the inner boundaries should contain the point
  for (var i = 0; i < this.innerBoundaries_.length; i++) {
    if (this.innerBoundaries_[i].containsPoint(point)) {
      return false;
    }
  }
  
  return true;
};

/**
 * Returns the approximate area of the polygon.
 * @return {Number} The approximate area, in square meters.
 * @see geo.Path.area
 */
geo.Polygon.prototype.area = function() {
  // start with outer boundary area
  var area = this.outerBoundary_.area();
  
  // subtract inner boundary areas
  // TODO: handle double counting of intersections
  for (var i = 0; i < this.innerBoundaries_.length; i++) {
    area -= this.innerBoundaries_[i].area();
  }
  
  return area;
};

/**
 * The geo.util namespace contains generic JavaScript and JS/Geo utility
 * functions.
 * @namespace
 */
geo.util = {isnamespace_:true};

/**
 * Determines whether or not the object is `undefined`.
 * @param {Object} object The object to test.
 * @note Taken from Prototype JS library
 */
geo.util.isUndefined = function(object) {
  return typeof object == 'undefined';
};

/**
 * Determines whether or not the object is a JavaScript array.
 * @param {Object} object The object to test.
 * @note Taken from Prototype JS library
 */
geo.util.isArray = function(object) {
  return object !== null && typeof object == 'object' &&
      'splice' in object && 'join' in object;
};

/**
 * Determines whether or not the object is a JavaScript function.
 * @param {Object} object The object to test.
 * @note Taken from Prototype JS library
 */
geo.util.isFunction = function(object) {
  return object !== null && typeof object == 'function' &&
      'call' in object && 'apply' in object;
};

/**
 * Determines whether or not the object is an object literal (a.k.a. hash).
 * @param {Object} object The object to test.
 */
geo.util.isObjectLiteral = function(object) {
  return object !== null && typeof object == 'object' &&
      object.constructor === Object &&
      !geo.util.isEarthAPIObject_(object);
};

/**
 * Determines whether or not the given object is an Earth API object.
 * @param {Object} object The object to test.
 * @private
 */
geo.util.isEarthAPIObject_ = function(object) {
  return object !== null &&
      (typeof object == 'function' || typeof object == 'object') &&
      'getType' in object;
};

/*
Copyright 2009 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
 * @class The root class/namespace hybrid for the Earth API extensions library.
 * This class groups functionality into namespaces such as
 * {@link GEarthExtensions#dom } and {@link GEarthExtensions#fx }.
 * @param {GEPlugin} pluginInstance The Google Earth Plugin instance to
 *     associate this GEarthExtensions instance with.
 * @example
 * var gex = new GEarthExtensions(ge); // ge is an instance of GEPlugin
 * gex.dom.clearFeatures(); // gex is an instance of a class, and gex.dom
 *                          // is effectively a namespace grouping
 *                          // functionality
 */
var GEarthExtensions = function(pluginInstance) {
  // create class
  var me = this;
  this.pluginInstance = pluginInstance;
  
  // bind all functions in namespaces to this GEarthExtensions instance
  /** @private */
  function bindFunction(fn_, this_) {
    return function() {
      return fn_.apply(this_, arguments);
    };
  }

  /** @private */
  function bindNamespaceMembers(nsParent, context) {
    for (var mstr in nsParent) {
      var member = nsParent[mstr];
      
      // bind this namespace's functions to the given context
      if (geo.util.isFunction(member)) {
        if (member.isclass_) {
          // if it's a class constructor, give it access to this
          // GEarthExtensions instance
          member.extInstance_ = me;
        } else {
          // function's not a constructor, just bind it to this
          // GEarthExtensions instance
          nsParent[mstr] = bindFunction(member, context);
        }
      }
      
      // bind functions of all sub-namespaces
      if (GEarthExtensions.isExtensionsNamespace_(member)) {
        bindNamespaceMembers(member, context);
      }
    }
  }
  
  bindNamespaceMembers(this, this);
};
/** @private */
GEarthExtensions.AUTO = Infinity; // for dom builder (auto property setters)

/** @private */
GEarthExtensions.ALLOWED = null;

/** @private */
GEarthExtensions.REQUIRED = undefined;

/**
 * Checks a given parameters object against an parameter spec,
 * throwing exceptions as necessary, and returning the resulting options object
 * with defaults filled in.
 * @param {Object} explicitParams The parameters object to check.
 * @param {Boolean} allowAll Whether or not to allow all parameters, or limit
 *     allowed parameters to those listed in the parameter spec.
 * @param {Object} paramSpec The parameter spec, which should be an object whose
 *     properties are the properties expected in the given parameters object and
 *     whose property values are GEarthExtensions.REQUIRED if the property is
 *     required or some other value to set a default value.
 * @return Returns a shallow copy of the given parameters object, cleaned up
 *     according to the parameters spec and with default values filled in.
 * @ignore
 */
GEarthExtensions.checkParameters = function(explicitParams,
                                            allowAll, paramSpec) {
  // shallow copy explicitParameters
  var finalParams = {};
  
  explicitParams = explicitParams || {};
  paramSpec = paramSpec || {};
  
  for (var member in explicitParams) {
    // if not allowing all, check that it's in the param spec
    if (!allowAll && !(member in paramSpec)) {
      var allowed = [];
      for (var m in paramSpec) {
        allowed.push(m);
      }
      
      throw new Error(
        'Unexpected parameter \'' + member + '\'. ' +
        'Allowed parameters are: ' + allowed.join(', ') + '.');
    }
    
    finalParams[member] = explicitParams[member];
  }
  
  // copy in defaults
  for (member in paramSpec) {
    if (!(member in finalParams)) {
      // if member was required, throw an exception
      if (paramSpec[member] === GEarthExtensions.REQUIRED) {
        throw new Error(
            'Required parameter \'' + member + '\' was not passed.');
      }
      
      if (paramSpec[member] != GEarthExtensions.ALLOWED &&
          paramSpec[member] != GEarthExtensions.AUTO) {
        // GEarthExtensions.ALLOWED and GEarthExtensions.AUTO are placeholders,
        // not default values
        finalParams[member] = paramSpec[member];
      }
    }
  }
  
  return finalParams;
};

/**
 * Creates a new 'class' from the provided constructor function and mixes in
 * members of provided mixin classes.
 * @private
 */
GEarthExtensions.createClass_ = function() {
  var mixins = [];
  var constructorFn = null;
  
  if (geo.util.isArray(arguments[0])) {
    mixins = arguments[0];
    constructorFn = arguments[1];
  } else {
    constructorFn = arguments[0];
  }
  
  constructorFn.isclass_ = true;
  
  for (var i = 0; i < mixins.length; i++) {
    for (var k in mixins[i].prototype) {
      constructorFn.prototype[k] = mixins[i].prototype[k];
    }
  }
  
  return constructorFn;
};

/**
 * Determines whether or not the object is a GEarthExtensions namespace.
 * @param {Object} object The object to test.
 * @private
 */
GEarthExtensions.isExtensionsNamespace_ = function(object) {
  return object !== null && typeof object == 'object' &&
      'isnamespace_' in object && object.isnamespace_;
};

/**
 * Determines whether or not the given object is directly an instance
 * of the specified Earth API type.
 * @param {Object} object The object to test.
 * @param {String} type The Earth API type string, i.e. 'KmlPlacemark'
 */
GEarthExtensions.isInstanceOfEarthInterface = function(object, type) {
  // TODO: double check that all earth interfaces are typeof 'function'
  return object !== null &&
      (typeof object == 'object' || typeof object == 'function') &&
      'getType' in object && object.getType() == type;
};
/**
 * Contains DOM builder functions (buildXX) and DOM
 * manipulation/traversal functions.
 * @namespace
 */
GEarthExtensions.prototype.dom = {isnamespace_:true};

/**
 * This is a sort of parametrized decorator around a fundamental constructor
 * DOM builder function,
 * it calls GEPlugin's buildXX factory functions, allows for a type of
 * inheritance, provides extra functionality such as automatic property setters,
 * default arguments (i.e. fn('bar', {cat:'dog'}) == fn({foo:'bar', cat:'dog'}))
 * and checking if the parameter is an instance of the object we're constructing
 * @private
 */
GEarthExtensions.domBuilder_ = function(params) {
  if (params.apiInterface && !geo.util.isArray(params.apiInterface)) {
    params.apiInterface = [params.apiInterface];
  }
  
  // merge in base builder params
  // TODO: detect circular base builders
  var base = params.base;
  while (base) {
    // merge in propertyspec
    if ('propertySpec' in base.builderParams) {
      if (!('propertySpec' in params)) {
        params.propertySpec = [];
      }
      
      for (var member in base.builderParams.propertySpec) {
        if (!(member in params.propertySpec)) {
          params.propertySpec[member] =
              base.builderParams.propertySpec[member];
        }
      }
    }
    
    // set Earth API interface if none was set for this builder
    if (!params.apiInterface) {
      params.apiInterface = base.builderParams.apiInterface;
    }
    
    // set Earth API factory fn if none was set for this builder
    if (!params.apiFactoryFn) {
      params.apiFactoryFn = base.builderParams.apiFactoryFn;
    }
    
    base = base.builderParams.base;
  }
  
  // merge in root dom builder property spec (only id is universal to
  // all DOM objects)
  var rootPropertySpec = {
    id: ''
  };
  
  for (member in rootPropertySpec) {
    if (!(member in params.propertySpec)) {
      params.propertySpec[member] = rootPropertySpec[member];
    }
  }
  
  /** @ignore */
  var builderFn = function() {
    var options = {};
    var i;
    
    // construct options literal to pass to constructor function
    // from arguments
    if (arguments.length === 0) {
      throw new TypeError('Cannot create object without any arguments!');
    } else if (arguments.length == 1) {
      // the argument to the function may already be an instance of the
      // interface we're trying to create... if so, then simply return the
      // instance
      
      // TODO: maybe clone the object instead of just returning it
      for (i = 0; i < params.apiInterface.length; i++) {
        if (GEarthExtensions.isInstanceOfEarthInterface(
            arguments[0], params.apiInterface[i])) {
          return arguments[0];
        }
      }
      
      // find out if the first argument is the default property or the
      // options literal and construct the final options literal to
      // pass to the constructor function
      var arg = arguments[0];
      if (geo.util.isObjectLiteral(arg)) {
        // passed in only the options literal
        options = arg;
      } else if ('defaultProperty' in params) {
        // passed in default property and no options literal
        options[params.defaultProperty] = arg;
      } else {
        throw new TypeError('Expected options object');
      }
    } else if (arguments.length == 2) {
      if ('defaultProperty' in params) {
        // first parameter is the value of the default property, and the
        // other is the options literal
        options = arguments[1];
        options[params.defaultProperty] = arguments[0];
      } else {
        throw new Error('No default property for the DOM builder');
      }
    }
    
    // check passed in options against property spec
    options = GEarthExtensions.checkParameters(options,
        false, params.propertySpec);
    
    // call Earth API factory function, i.e. createXX(...)
    var newObj = this.util.callMethod(
                     this.pluginInstance, params.apiFactoryFn, options.id);

    // call constructor fn with factory-created object and options literal
    if (!geo.util.isUndefined(params.constructor)) {
      params.constructor.call(this, newObj, options);
    }
    
    // call base builder constructor functions
    base = params.base;
    while (base) {
      // call ancestor constructor functions
      if ('constructor' in base.builderParams) {
        base.builderParams.constructor.call(this, newObj, options);
      }
      
      base = base.builderParams.base;
    }
    
    // run automatic property setters as defined in property spec
    for (var property in params.propertySpec) {
      // TODO: abstract away into isAuto()
      if (params.propertySpec[property] === GEarthExtensions.AUTO &&
          property in options) {
        // auto setters calls newObj.setXx(options[xx]) if xx is in options
        this.util.callMethod(newObj,
            'set' + property.charAt(0).toUpperCase() + property.substr(1),
            options[property]);
      }
    }
    
    return newObj;
  };
  
  builderFn.builderParams = params;
  return builderFn;
};
/** @ignore */
GEarthExtensions.prototype.dom.buildFeature_ = GEarthExtensions.domBuilder_({
  propertySpec: {
    name: GEarthExtensions.AUTO,
    visibility: GEarthExtensions.AUTO,
    description: GEarthExtensions.AUTO,
    snippet: GEarthExtensions.AUTO,
    
    // allowed properties
    region: GEarthExtensions.ALLOWED
  },
  constructor: function(featureObj, options) {
    if (options.region) {
      featureObj.setRegion(this.dom.buildRegion(options.region));
    }
  }
});

/**
 * Creates a new placemark with the given parameters.
 * @function
 * @param {Object} options The parameters of the placemark to create.
 * @param {String} [options.name] The name of the feature.
 * @param {Boolean} [options.visibility] Whether or not the feature should
 *     be visible.
 * @param {String} [options.description] An HTML description for the feature;
 *     may be used as balloon text.
 * @param {PointOptions|KmlPoint} [options.point] A point geometry to use in the
 *     placemark.
 * @param {LineStringOptions|KmlLineString} [options.lineString] A line string
 *     geometry to usein the placemark.
 * @param {LinearRingOptions|KmlLinearRing} [options.linearRing] A linear ring
 *     geometry to use in the placemark.
 * @param {PolygonOptions|KmlPolygon} [options.polygon] A polygon geometry to
 *     use in the placemark.
 * @param {ModelOptions|KmlModel} [options.model] A model geometry to use
 *     in the placemark.
 * @param {MultiGeometryOptions|KmlMultiGeometry} [options.multiGeometry] A
 *     multi-geometry to use in the placemark.
 * @param {KmlGeometry[]} [options.geometries] An array of geometries to add
 *     to the placemark.
 * @type KmlPlacemark
 */
GEarthExtensions.prototype.dom.buildPlacemark = GEarthExtensions.domBuilder_({
  apiInterface: 'KmlPlacemark',
  base: GEarthExtensions.prototype.dom.buildFeature_,
  apiFactoryFn: 'createPlacemark',
  propertySpec: {
    // allowed geometries
    point: GEarthExtensions.ALLOWED,
    lineString: GEarthExtensions.ALLOWED,
    linearRing: GEarthExtensions.ALLOWED,
    polygon: GEarthExtensions.ALLOWED,
    model: GEarthExtensions.ALLOWED,
    geometries: GEarthExtensions.ALLOWED,
    
    // convenience (pass through to geometry)
    altitudeMode: GEarthExtensions.ALLOWED,
    
    // styling
    stockIcon: GEarthExtensions.ALLOWED,
    icon: GEarthExtensions.ALLOWED,
    style: GEarthExtensions.ALLOWED,
    highlightStyle: GEarthExtensions.ALLOWED
  },
  constructor: function(placemarkObj, options) {
    // geometries
    var geometries = [];
    if (options.point) {
      geometries.push(this.dom.buildPoint(options.point));
    }
    if (options.lineString) {
      geometries.push(this.dom.buildLineString(options.lineString));
    }
    if (options.linearRing) {
      geometries.push(this.dom.buildLinearRing(options.linearRing));
    }
    if (options.polygon) {
      geometries.push(this.dom.buildPolygon(options.polygon));
    }
    if (options.model) {
      geometries.push(this.dom.buildModel(options.model));
    }
    if (options.multiGeometry) {
      geometries.push(this.dom.buildMultiGeometry(options.multiGeometry));
    }
    if (options.geometries) {
      geometries = geometries.concat(options.geometries);
    }
  
    if (geometries.length > 1) {
      placemarkObj.setGeometry(this.dom.buildMultiGeometry(geometries));
    } else if (geometries.length == 1) {
      placemarkObj.setGeometry(geometries[0]);
    }
  
    // set styles
    if (options.stockIcon) {
      options.icon = options.icon || {};
      options.icon.stockIcon = options.stockIcon;
    }
  
    if (options.icon) {
      if (!options.style) {
        options.style = {};
      }
    
      options.style.icon = options.icon;
    }
    
    // convenience
    if ('altitudeMode' in options) {
      placemarkObj.getGeometry().setAltitudeMode(options.altitudeMode);
    }
  
    // NOTE: for this library, allow EITHER a style or a styleUrl, not both..
    // if you want both, you'll have to do it manually
    if (options.style) {
      if (options.highlightStyle) {
        // style map
        var styleMap = this.pluginInstance.createStyleMap(options.id);
      
        // set normal style
        if (typeof options.style == 'string') {
          styleMap.setNormalStyleUrl(options.style);
        } else {
          styleMap.setNormalStyle(this.dom.buildStyle(options.style));
        }
      
        // set highlight style
        if (typeof options.highlightStyle == 'string') {
          styleMap.setHighlightStyleUrl(options.highlightStyle);
        } else {
          styleMap.setHighlightStyle(this.dom.buildStyle(
              options.highlightStyle));
        }
      
        // assign style map
        placemarkObj.setStyleSelector(styleMap);
      } else {
        // single style
        if (typeof options.style == 'string') {
          placemarkObj.setStyleUrl(options.style);
        } else {
          placemarkObj.setStyleSelector(this.dom.buildStyle(options.style));
        }
      }
    }
  }
});

/**
 * Convenience method to build a point placemark.
 * @param {PointOptions|KmlPoint} point The point geometry.
 * @param {Object} options The parameters of the placemark to create.
 * @see GEarthExtensions#dom.buildPlacemark
 * @function
 */
GEarthExtensions.prototype.dom.buildPointPlacemark =
GEarthExtensions.domBuilder_({
  base: GEarthExtensions.prototype.dom.buildPlacemark,
  defaultProperty: 'point'
});

/**
 * Convenience method to build a linestring placemark.
 * @param {LineStringOptions|KmlLineString} lineString The line string geometry.
 * @param {Object} options The parameters of the placemark to create.
 * @see GEarthExtensions#dom.buildPlacemark
 * @function
 */
GEarthExtensions.prototype.dom.buildLineStringPlacemark =
GEarthExtensions.domBuilder_({
  base: GEarthExtensions.prototype.dom.buildPlacemark,
  defaultProperty: 'lineString'
});

/**
 * Convenience method to build a polygon placemark.
 * @param {PolygonOptions|KmlPolygon} polygon The polygon geometry.
 * @param {Object} options The parameters of the placemark to create.
 * @see GEarthExtensions#dom.buildPlacemark
 * @function
 */
GEarthExtensions.prototype.dom.buildPolygonPlacemark =
GEarthExtensions.domBuilder_({
  base: GEarthExtensions.prototype.dom.buildPlacemark,
  defaultProperty: 'polygon'
});


/**
 * Creates a new network link with the given parameters.
 * @function
 * @param {LinkOptions} [link] An object describing the link to use for this
 *     network link.
 * @param {Object} options The parameters of the network link to create.
 * @param {String} [options.name] The name of the feature.
 * @param {Boolean} [options.visibility] Whether or not the feature should
 *     be visible.
 * @param {String} [options.description] An HTML description for the feature;
 *     may be used as balloon text.
 * @param {LinkOptions} [options.link] The link to use.
 * @type KmlNetworkLink
 */
GEarthExtensions.prototype.dom.buildNetworkLink =
GEarthExtensions.domBuilder_({
  apiInterface: 'KmlNetworkLink',
  base: GEarthExtensions.prototype.dom.buildFeature_,
  apiFactoryFn: 'createNetworkLink',
  defaultProperty: 'link',
  propertySpec: {
    link: GEarthExtensions.ALLOWED,
    
    // auto properties
    flyToView: GEarthExtensions.AUTO,
    refreshVisibility: GEarthExtensions.AUTO
  },
  constructor: function(networkLinkObj, options) {
    if (options.link) {
      networkLinkObj.setLink(this.dom.buildLink(options.link));
    }
  }
});
// TODO: unit tests

/** @ignore */
GEarthExtensions.prototype.dom.buildContainer_ = GEarthExtensions.domBuilder_({
  base: GEarthExtensions.prototype.dom.buildFeature_,
  propertySpec: {
    children: GEarthExtensions.ALLOWED
  },
  constructor: function(containerObj, options) {
    // children
    if (options.children) {
      for (var i = 0; i < options.children.length; i++) {
        containerObj.getFeatures().appendChild(options.children[i]);
      }
    }  
  }
});

/**
 * Creates a new folder with the given parameters.
 * @function
 * @param {KmlFeature[]} [children] The children of this folder.
 * @param {Object} options The parameters of the folder to create.
 * @param {String} [options.name] The name of the feature.
 * @param {Boolean} [options.visibility] Whether or not the feature should
 *     be visible.
 * @param {String} [options.description] An HTML description for the feature;
 *     may be used as balloon text.
 * @param {KmlFeature[]} [options.children] The children of this folder.
 * @type KmlFolder
 */
GEarthExtensions.prototype.dom.buildFolder = GEarthExtensions.domBuilder_({
  apiInterface: 'KmlFolder',
  base: GEarthExtensions.prototype.dom.buildContainer_,
  apiFactoryFn: 'createFolder',
  defaultProperty: 'children'
});
// TODO: unit tests

/**
 * Creates a new document with the given parameters.
 * @function
 * @param {KmlFeature[]} [children] The children of this document.
 * @param {Object} options The parameters of the document to create.
 * @param {String} [options.name] The name of the feature.
 * @param {Boolean} [options.visibility] Whether or not the feature should
 *     be visible.
 * @param {String} [options.description] An HTML description for the feature;
 *     may be used as balloon text.
 * @param {KmlFeature[]} [options.children] The children of this document.
 * @type KmlDocument
 */
GEarthExtensions.prototype.dom.buildDocument = GEarthExtensions.domBuilder_({
  apiInterface: 'KmlDocument',
  base: GEarthExtensions.prototype.dom.buildContainer_,
  apiFactoryFn: 'createDocument',
  defaultProperty: 'children'
});
// TODO: unit tests

/** @ignore */
GEarthExtensions.prototype.dom.buildOverlay_ = GEarthExtensions.domBuilder_({
  base: GEarthExtensions.prototype.dom.buildFeature_,
  propertySpec: {
    color: GEarthExtensions.ALLOWED,
    icon: GEarthExtensions.ALLOWED,
    
    // auto properties
    drawOrder: GEarthExtensions.AUTO
  },
  constructor: function(overlayObj, options) {
    // color
    if (options.color) {
      overlayObj.getColor().set(this.util.parseColor(options.color));
    }
  
    // icon
    if (options.icon) {
      var icon = this.pluginInstance.createIcon('');
      overlayObj.setIcon(icon);
    
      if (typeof options.icon == 'string') {
        // default just icon href
        icon.setHref(options.icon);
      }
    }
  }
});

/**
 * Creates a new ground overlay with the given parameters.
 * @function
 * @param {String} [icon] The URL of the overlay image.
 * @param {Object} options The parameters of the ground overlay to create.
 * @param {String} [options.name] The name of the feature.
 * @param {Boolean} [options.visibility] Whether or not the feature should
 *     be visible.
 * @param {String} [options.description] An HTML description for the feature.
 * @param {String} [options.color] A color to apply on the overlay.
 * @param {String} [options.icon] The URL of the overlay image.
 * @param {Number} [options.drawOrder] The drawing order of the overlay;
 *     overlays with higher draw orders appear on top of those with lower
 *     draw orders.
 * @param {Number} [options.altitude] The altitude of the ground overlay, in
 *     meters.
 * @param {KmlAltitudeModeEnum} [options.altitudeMode] The altitude mode of the
 *     ground overlay.
 * @param {Object} [options.box] The bounding box for the overlay.
 * @param {Number} [options.box.north] The north latitude for the overlay.
 * @param {Number} [options.box.east] The east longitude for the overlay.
 * @param {Number} [options.box.south] The south latitude for the overlay.
 * @param {Number} [options.box.west] The west longitude for the overlay.
 * @param {Number} [options.box.rotation] The rotation, in degrees, of the
 *     overlay.
 * @type KmlGroundOverlay
 */
GEarthExtensions.prototype.dom.buildGroundOverlay =
GEarthExtensions.domBuilder_({
  apiInterface: 'KmlGroundOverlay',
  base: GEarthExtensions.prototype.dom.buildOverlay_,
  apiFactoryFn: 'createGroundOverlay',
  defaultProperty: 'icon',
  propertySpec: {
    // required properties
    box: GEarthExtensions.REQUIRED,
    
    // auto properties
    altitude: GEarthExtensions.AUTO,
    altitudeMode: GEarthExtensions.AUTO
  },
  constructor: function(groundOverlayObj, options) {
    if (options.box) {
      // TODO: exception if any of the options are missing
      var box = this.pluginInstance.createLatLonBox('');
      box.setBox(options.box.north, options.box.south,
                 options.box.east, options.box.west,
                 options.box.rotation ? options.box.rotation : 0);
      groundOverlayObj.setLatLonBox(box);
    }
  }
});



/**
 * Creates a new screen overlay with the given parameters.
 * @function
 * @param {String} [icon] The URL of the overlay image.
 * @param {Object} options The parameters of the screen overlay to create.
 * @param {String} [options.name] The name of the feature.
 * @param {Boolean} [options.visibility] Whether or not the feature should
 *     be visible.
 * @param {String} [options.description] An HTML description for the feature.
 * @param {String} [options.color] A color to apply on the overlay.
 * @param {String} [options.icon] The URL of the overlay image.
 * @param {Number} [options.drawOrder] The drawing order of the overlay;
 *     overlays with higher draw orders appear on top of those with lower
 *     draw orders.
 * @param {Vec2Src} [options.overlayXY] The registration point in the overlay
 *     that will be placed at the given screenXY point and potentially
 *     rotated about. This object will be passed to
 *     GEarthExtensions#dom.setVec2. The default is the top left of the overlay.
 * @param {Vec2Src} [options.screenXY] The position in the plugin window
 *     that the screen overlay should appear at. This object will
 *     be passed to GEarthExtensions#dom.setVec2
 * @param {Vec2Src} [options.size] The size of the overlay. This object will
 *     be passed to GEarthExtensions#dom.setVec2
 * @param {KmlAltitudeModeEnum} [options.altitudeMode] The altitude mode of the
 *     ground overlay.
 * @param {Number} [options.rotation] The rotation of the overlay, in degrees.
 * @type KmlScreenOverlay
 */
GEarthExtensions.prototype.dom.buildScreenOverlay =
GEarthExtensions.domBuilder_({
  apiInterface: 'KmlScreenOverlay',
  base: GEarthExtensions.prototype.dom.buildOverlay_,
  apiFactoryFn: 'createScreenOverlay',
  defaultProperty: 'icon',
  propertySpec: {
    // required properties
    screenXY: GEarthExtensions.REQUIRED,
    size: GEarthExtensions.REQUIRED,

    // auto properties
    rotation: GEarthExtensions.AUTO,

    // optional properties
    overlayXY: { left: 0, top: 0 },
    rotationXY: GEarthExtensions.ALLOWED
  },
  constructor: function(screenOverlayObj, options) {
    if (this.util.areScreenOverlayXYSwapped_()) { // Earth API bug
      this.dom.setVec2(screenOverlayObj.getScreenXY(), options.overlayXY);
      this.dom.setVec2(screenOverlayObj.getOverlayXY(), options.screenXY);
    } else {
      this.dom.setVec2(screenOverlayObj.getOverlayXY(), options.overlayXY);
      this.dom.setVec2(screenOverlayObj.getScreenXY(), options.screenXY);
    }
    
    this.dom.setVec2(screenOverlayObj.getSize(), options.size);

    if ('rotationXY' in options) {
      this.dom.setVec2(screenOverlayObj.getRotationXY(), options.rotationXY);
    }
  }
});
// TODO: unit tests

//////////////////////////////
// GEarthExtensions#dom shortcut functions

/**
 * @name GEarthExtensions#dom.addPlacemark
 * Convenience method that calls GEarthExtensions#dom.buildPlacemark and adds
 * the created placemark to the Google Earth Plugin DOM.
 * @function
 */
(function(){
  var autoShortcut = ['Placemark',
                      'PointPlacemark', 'LineStringPlacemark',
                      'PolygonPlacemark',
                      'Folder', 'NetworkLink', 'GroundOverlay', 'Style'];
  for (var i = 0; i < autoShortcut.length; i++) {
    GEarthExtensions.prototype.dom['add' + autoShortcut[i]] =
      function(shortcutBase) {
        return function() {
          var obj = this.dom['build' + shortcutBase].apply(null, arguments);
          this.pluginInstance.getFeatures().appendChild(obj);
          return obj;
        };
    }(autoShortcut[i]); // escape closure
  }
})();
/** @ignore */
GEarthExtensions.prototype.dom.buildExtrudableGeometry_ =
GEarthExtensions.domBuilder_({
  propertySpec: {
    altitudeMode: GEarthExtensions.AUTO,
    extrude: GEarthExtensions.AUTO,
    tessellate: GEarthExtensions.AUTO
  }
});

/**
 * Creates a new point geometry with the given parameters.
 * @function
 * @param {PointOptions|geo.Point|KmlPoint} [point] The point data. Anything
 *     that can be passed to the geo.Point constructor.
 * @param {Object} options The parameters of the point object to create.
 * @param {PointOptions|geo.Point|KmlPoint} [options.point] The point data.
 *     Anything that can be passed to the geo.Point constructor.
 * @param {KmlAltitudeModeEnum} [options.altitudeMode] The altitude mode of the
 *     geometry.
 * @param {Boolean} [options.extrude] Whether or not the geometry should
 *     extrude down to the Earth's surface.
 * @type KmlPoint
 */
GEarthExtensions.prototype.dom.buildPoint = GEarthExtensions.domBuilder_({
  apiInterface: 'KmlPoint',
  base: GEarthExtensions.prototype.dom.buildExtrudableGeometry_,
  apiFactoryFn: 'createPoint',
  defaultProperty: 'point',
  propertySpec: {
    point: GEarthExtensions.REQUIRED
  },
  constructor: function(pointObj, options) {
    var point = new geo.Point(options.point);
    pointObj.set(
        point.lat(),
        point.lng(),
        point.altitude(),
        ('altitudeMode' in options) ? options.altitudeMode :
                                      point.altitudeMode(),
        false,
        false);
  }
});
// TODO: unit tests

/**
 * Creates a new line string geometry with the given parameters.
 * @function
 * @param {PathOptions|geo.Path|KmlLineString} [path] The path data.
 *     Anything that can be passed to the geo.Path constructor.
 * @param {Object} options The parameters of the line string to create.
 * @param {PathOptions|geo.Path|KmlLineString} [options.path] The path data.
 *     Anything that can be passed to the geo.Path constructor.
 * @param {KmlAltitudeModeEnum} [options.altitudeMode] The altitude mode of the
 *     geometry.
 * @param {Boolean} [options.extrude] Whether or not the geometry should
 *     extrude down to the Earth's surface.
 * @param {Boolean} [options.tessellate] Whether or not the geometry should
 *     be tessellated (i.e. contour to the terrain).
 * @type KmlLineString
 */
GEarthExtensions.prototype.dom.buildLineString = GEarthExtensions.domBuilder_({
  apiInterface: 'KmlLineString',
  base: GEarthExtensions.prototype.dom.buildExtrudableGeometry_,
  apiFactoryFn: 'createLineString',
  defaultProperty: 'path',
  propertySpec: {
    path: GEarthExtensions.REQUIRED
  },
  constructor: function(lineStringObj, options) {
    // TODO: maybe use parseKml instead of pushLatLngAlt for performance
    // purposes
    var coordsObj = lineStringObj.getCoordinates();
  
    var path = new geo.Path(options.path);
    var numCoords = path.numCoords();
    for (var i = 0; i < numCoords; i++) {
      coordsObj.pushLatLngAlt(path.coord(i).lat(), path.coord(i).lng(),
          path.coord(i).altitude());
    }
  }
});
// TODO: unit tests

/**
 * Creates a new linear ring geometry with the given parameters.
 * @function
 * @param {PathOptions|geo.Path|KmlLinearRing} [path] The path data.
 *     Anything that can be passed to the geo.Path constructor.
 *     The first coordinate doesn't need to be repeated at the end.
 * @param {Object} options The parameters of the linear ring to create.
 * @param {PathOptions|geo.Path|KmlLinearRing} [options.path] The path data.
 *     Anything that can be passed to the geo.Path constructor.
 *     The first coordinate doesn't need to be repeated at the end.
 * @param {KmlAltitudeModeEnum} [options.altitudeMode] The altitude mode of the
 *     geometry.
 * @param {Boolean} [options.extrude] Whether or not the geometry should
 *     extrude down to the Earth's surface.
 * @param {Boolean} [options.tessellate] Whether or not the geometry should
 *     be tessellated (i.e. contour to the terrain).
 * @type KmlLinearRing
 */
GEarthExtensions.prototype.dom.buildLinearRing = GEarthExtensions.domBuilder_({
  apiInterface: 'KmlLinearRing',
  base: GEarthExtensions.prototype.dom.buildLineString,
  apiFactoryFn: 'createLinearRing',
  defaultProperty: 'path',
  constructor: function(linearRingObj, options) {
    /*
    Earth API automatically dups first coordinate at the end to complete
    the ring when using createLinearRing, but parseKml won't do that...
    so if we switch to parseKml, make sure to duplicate the last point
    */
  }
});
// TODO: unit tests

/**
 * Creates a new polygon geometry with the given parameters.
 * @function
 * @param {PolygonOptions|geo.Polygon|KmlPolygon} [polygon] The polygon data.
 *     Anything that can be passed to the geo.Polygon constructor.
 * @param {Object} options The parameters of the polygon to create.
 * @param {PolygonOptions|geo.Polygon|KmlPolygon} [options.polygon] The polygon
 *     data. Anything that can be passed to the geo.Polygon constructor.
 * @param {KmlAltitudeModeEnum} [options.altitudeMode] The altitude mode of the
 *     geometry.
 * @param {Boolean} [options.extrude] Whether or not the geometry should
 *     extrude down to the Earth's surface.
 * @param {Boolean} [options.tessellate] Whether or not the geometry should
 *     be tessellated (i.e. contour to the terrain).
 * @type KmlPolygon
 */
GEarthExtensions.prototype.dom.buildPolygon = GEarthExtensions.domBuilder_({
  apiInterface: 'KmlPolygon',
  base: GEarthExtensions.prototype.dom.buildExtrudableGeometry_,
  apiFactoryFn: 'createPolygon',
  defaultProperty: 'polygon',
  propertySpec: {
    polygon: GEarthExtensions.REQUIRED
  },
  constructor: function(polygonObj, options) {
    var polygon = new geo.Polygon(options.polygon);
  
    polygonObj.setOuterBoundary(
        this.dom.buildLinearRing(polygon.outerBoundary()));
    if (polygon.innerBoundaries().length) {
      var innerBoundaries = polygon.innerBoundaries();
      for (var i = 0; i < innerBoundaries.length; i++) {
        polygonObj.getInnerBoundaries().appendChild(
            this.dom.buildLinearRing(innerBoundaries[i]));
      }
    }
  }
});
// TODO: unit tests

/**
 * Creates a new model geometry with the given parameters.
 * @function
 * @param {LinkOptions|KmlLink} [link] The remote link this model should use.
 * @param {Object} options The parameters of the model to create.
 * @param {LinkOptions|KmlLink} [options.link] The remote link this model
 *     should use.
 * @param {KmlAltitudeModeEnum} [options.altitudeMode] The altitude mode of the
 *     geometry.
 * @param {PointOptions|geo.Point} [options.location] The location of the model.
 * @param {Number|Number[]} [options.scale] The scale factor of the model,
 *     either as a constant scale, or a 3-item array for x, y, and z scale.
 * @param {Object} [options.orientation] The orientation of the model.
 * @param {Number} [options.orientation.heading] The model heading.
 * @param {Number} [options.orientation.tilt] The model tilt.
 * @param {Number} [options.orientation.roll] The model roll.
 * @type KmlModel
 */
GEarthExtensions.prototype.dom.buildModel = GEarthExtensions.domBuilder_({
  apiInterface: 'KmlModel',
  apiFactoryFn: 'createModel',
  defaultProperty: 'link',
  propertySpec: {
    link: GEarthExtensions.ALLOWED,
    location: GEarthExtensions.ALLOWED,
    scale: GEarthExtensions.ALLOWED,
    orientation: GEarthExtensions.ALLOWED
  },
  constructor: function(modelObj, options) {
    if (options.link) {
      modelObj.setLink(this.dom.buildLink(options.link));
    }
  
    if (options.location) {
      var pointObj = new geo.Point(options.location);
      var locationObj = this.pluginInstance.createLocation('');
      locationObj.setLatLngAlt(pointObj.lat(), pointObj.lng(),
          pointObj.altitude());
      modelObj.setLocation(locationObj);
      modelObj.setAltitudeMode(pointObj.altitudeMode());
    }
  
    if (options.scale) {
      var scaleObj = this.pluginInstance.createScale('');
      if (typeof options.scale == 'number') {
        scaleObj.set(options.scale, options.scale, options.scale);
      } else if (geo.util.isArray(options.scale)) {
        scaleObj.set(options.scale[0], options.scale[1], options.scale[2]);
      }
    
      modelObj.setScale(scaleObj);
    }
  
    if (options.orientation) {
      var orientationObj = this.pluginInstance.createOrientation('');
      if ('heading' in options.orientation &&
          'tilt' in options.orientation &&
          'roll' in options.orientation) {
        orientationObj.set(options.orientation.heading,
                           options.orientation.tilt,
                           options.orientation.roll);
      }
    
      modelObj.setOrientation(orientationObj);
    }
  }
});

/**
 * Creates a new multi-geometry with the given parameters.
 * @function
 * @param {KmlGeometry[]} [geometries] The child geometries.
 * @param {Object} options The parameters of the multi-geometry to create.
 * @param {KmlGeometry[]} [options.geometries] The child geometries.
 * @type KmlMultiGeometry
 */
GEarthExtensions.prototype.dom.buildMultiGeometry =
GEarthExtensions.domBuilder_({
  apiInterface: 'KmlMultiGeometry',
  apiFactoryFn: 'createMultiGeometry',
  defaultProperty: 'geometries',
  propertySpec: {
    geometries: GEarthExtensions.ALLOWED
  },
  constructor: function(multiGeometryObj, options) {
    var geometriesObj = multiGeometryObj.getGeometries();
  
    if (geo.util.isArray(options.geometries)) {
      for (var i = 0; i < options.geometries.length; i++) {
        geometriesObj.appendChild(options.geometries[i]);
      }
    }
  }
});
// TODO: unit tests
/**
 * Creates a new link object with the given parameters.
 * @function
 * @param {String} [href] The link href.
 * @param {Object} options The link parameters.
 * @param {String} [options.href] The link href.
 * @param {KmlRefreshModeEnum} [options.refreshMode] The link refresh mode.
 * @param {Number} [options.refreshInterval] The link refresh interval,
 *     in seconds.
 * @param {KmlViewRefreshModeEnum} [options.viewRefreshMode] The view-based
 *     refresh mode.
 * @type KmlLink
 */
GEarthExtensions.prototype.dom.buildLink = GEarthExtensions.domBuilder_({
  apiInterface: 'KmlLink',
  apiFactoryFn: 'createLink',
  defaultProperty: 'href',
  propertySpec: {
    // auto properties
    href: GEarthExtensions.AUTO,
    refreshMode: GEarthExtensions.AUTO,
    refreshInterval: GEarthExtensions.AUTO,
    viewRefreshMode: GEarthExtensions.AUTO,
    viewBoundScale: GEarthExtensions.AUTO
  }
});

/**
 * Creates a new region with the given parameters.
 * @function
 * @param {Object} options The parameters of the region to create.
 * @param {String} [options.box] The bounding box of the region, defined by
 *     either N/E/S/W, or center+span, and optional altitudes.
 * @param {Number} [options.box.north] The north latitude for the region.
 * @param {Number} [options.box.east] The east longitude for the region.
 * @param {Number} [options.box.south] The south latitude for the region.
 * @param {Number} [options.box.west] The west longitude for the region.
 * @param {PointOptions|geo.Point} [options.box.center] The center point
 *     for the region's bounding box.
 * @param {Number|Number[]} [options.box.span] If using center+span region box
 *     definition, this is either a number indicating both latitude and
 *     longitude span, or a 2-item array defining [latSpan, lngSpan].
 * @param {Number} [options.box.minAltitude] The low altitude for the region.
 * @param {Number} [options.box.maxAltitude] The high altitude for the region.
 * @param {KmlAltitudeModeEnum} [options.box.altitudeMode] The altitude mode
 *     of the region, pertaining to min and max altitude.
 * @type KmlRegion
 */
GEarthExtensions.prototype.dom.buildRegion =
GEarthExtensions.domBuilder_({
  apiInterface: 'KmlRegion',
  apiFactoryFn: 'createRegion',
  propertySpec: {
    // required properties
    box: GEarthExtensions.REQUIRED,
    
    // allowed properties
    lod: GEarthExtensions.ALLOWED
  },
  constructor: function(regionObj, options) {
    // TODO: exception if any of the options are missing
    var box = this.pluginInstance.createLatLonAltBox('');
    
    // center +/- span to calculate n/e/s/w
    if (options.box.center && options.box.span) {
      if (!geo.util.isArray(options.box.span) &&
          typeof options.box.span === 'number') {
        // use this one number as both the lat and long span
        options.box.span = [options.box.span, options.box.span];
      }
      
      var center = new geo.Point(options.box.center);
      options.box.north = center.lat() + options.box.span[0] / 2;
      options.box.south = center.lat() - options.box.span[0] / 2;
      options.box.east = center.lng() + options.box.span[1] / 2;
      options.box.west = center.lng() - options.box.span[1] / 2;
    }
    
    box.setAltBox(options.box.north, options.box.south,
                  options.box.east, options.box.west,
                  options.box.rotation || 0,
                  options.box.minAltitude || 0,
                  options.box.maxAltitude || 0,
                  options.box.altitudeMode ||
                      this.pluginInstance.ALTITUDE_CLAMP_TO_GROUND);
    
    // NOTE: regions MUST be given an Lod due to
    // http://code.google.com/p/earth-api-samples/issues/detail?id=190
    var lod = this.pluginInstance.createLod('');
    lod.set(-1, -1, 0, 0); // default Lod
    
    if (options.lod && geo.util.isArray(options.lod)) {
      // TODO: exception if it's not an array
      if (options.lod.length == 2) {
        // minpix, maxpix
        lod.set(options.lod[0], options.lod[1], 0, 0);
      } else if (options.lod.length == 4) {
        // minpix, minfade, maxfade, maxpix
        lod.set(options.lod[0], options.lod[3],
                options.lod[1], options.lod[2]);
      } else {
        // TODO: exception
      }
    }
    
    regionObj.setLatLonAltBox(box);
    regionObj.setLod(lod);
  }
});
/**
 * Creates a new style with the given parameters.
 * @function
 * @param {Object} options The style parameters.

 * @param {String|Object} [options.icon] The icon href or an icon
 *     object literal.
 * @param {String} [options.icon.href] The icon href.
 * @param {Number} [options.icon.scale] The icon scaling factor.
 * @param {ColorSpec} [options.icon.color] The color of the icon.
 * @param {ColorSpec} [options.icon.opacity] The opacity of the icon,
 *     between 0.0 and 1.0. This is a convenience property, since opacity can
 *     be defined in the color.

 * @param {ColorSpec|Object} [options.label] The label color or a label
 *     object literal.
 * @param {Number} [options.label.scale] The label scaling factor.
 * @param {ColorSpec} [options.label.color] The color of the label.
 * @param {ColorSpec} [options.icon.opacity] The opacity of the label,
 *     between 0.0 and 1.0. This is a convenience property, since opacity can
 *     be defined in the color.

 * @param {ColorSpec|Object} [options.line] The line color or a line
 *     object literal.
 * @param {Number} [options.line.width] The line width.
 * @param {ColorSpec} [options.line.color] The line color.
 * @param {ColorSpec} [options.icon.opacity] The opacity of the line,
 *     between 0.0 and 1.0. This is a convenience property, since opacity can
 *     be defined in the color.

 * @param {ColorSpec|Object} [options.poly] The polygon color or a polygon style
 *     object literal.
 * @param {Boolean} [options.poly.fill] Whether or not the polygon will be
 *     filled.
 * @param {Boolean} [options.poly.outline] Whether or not the polygon will have
 *     an outline.
 * @param {ColorSpec} [options.poly.color] The color of the polygon fill.
 * @param {ColorSpec} [options.icon.opacity] The opacity of the polygon,
 *     between 0.0 and 1.0. This is a convenience property, since opacity can
 *     be defined in the color.

 * @type KmlStyle
 */
GEarthExtensions.prototype.dom.buildStyle = GEarthExtensions.domBuilder_({
  apiInterface: ['KmlStyle', 'KmlStyleMap'],
  apiFactoryFn: 'createStyle',
  propertySpec: {
    icon: GEarthExtensions.ALLOWED,
    label: GEarthExtensions.ALLOWED,
    line: GEarthExtensions.ALLOWED,
    poly: GEarthExtensions.ALLOWED
  },
  constructor: function(styleObj, options) {
    // set icon style
    var pad2 = function(s) {
      return ((s.length < 2) ? '0' : '') + s;
    };
    
    var me = this;
    
    var mergeColorOpacity = function(color, opacity) {
      color = color ? me.util.parseColor(color) : 'ffffffff';
      if (!geo.util.isUndefined(opacity)) {
        color = pad2(Math.floor(255 * opacity).toString(16)) +
            color.substring(2);
      }
      
      return color;
    };
    
    if (options.icon) {
      var iconStyle = styleObj.getIconStyle();

      if (typeof options.icon == 'string') {
        options.icon = { href: options.icon };
      }
    
      var icon = this.pluginInstance.createIcon('');
      iconStyle.setIcon(icon);
    
      // more options
      if ('href' in options.icon) {
        icon.setHref(options.icon.href);
      } else if ('stockIcon' in options.icon) {
        icon.setHref('http://maps.google.com/mapfiles/kml/' +
            options.icon.stockIcon + '.png');
      } else {
        // use default icon href
        icon.setHref('http://maps.google.com/mapfiles/kml/' +
            'paddle/wht-blank.png');
        iconStyle.getHotSpot().set(0.5, this.pluginInstance.UNITS_FRACTION,
            0, this.pluginInstance.UNITS_FRACTION);
      }
      if ('scale' in options.icon) {
        iconStyle.setScale(options.icon.scale);
      }
      if ('heading' in options.icon) {
        iconStyle.setHeading(options.icon.heading);
      }
      if ('color' in options.icon || 'opacity' in options.icon) {
        options.icon.color = mergeColorOpacity(options.icon.color,
                                               options.icon.opacity);
        iconStyle.getColor().set(options.icon.color);
      }
      if ('opacity' in options.icon) {
        if (!('color' in options.icon)) {
          options.icon.color = 'ffffffff';
        }
        
        options.icon.color = pad2(options.icon.opacity.toString(16)) +
            options.icon.color.substring(2);
      }
      if ('hotSpot' in options.icon) {
        this.dom.setVec2(iconStyle.getHotSpot(), options.icon.hotSpot);
      }
      // TODO: colormode
    }
  
    // set label style
    if (options.label) {
      var labelStyle = styleObj.getLabelStyle();
    
      if (typeof options.label == 'string') {
        options.label = { color: options.label };
      }
    
      // more options
      if ('scale' in options.label) {
        labelStyle.setScale(options.label.scale);
      }
      if ('color' in options.label || 'opacity' in options.label) {
        options.label.color = mergeColorOpacity(options.label.color,
                                                options.label.opacity);
        labelStyle.getColor().set(options.label.color);
      }
      // TODO: add colormode
    }
  
    // set line style
    if (options.line) {
      var lineStyle = styleObj.getLineStyle();
    
      if (typeof options.line == 'string') {
        options.line = { color: options.line };
      }
  
      // more options
      if ('width' in options.line) {
        lineStyle.setWidth(options.line.width);
      }
      if ('color' in options.line || 'opacity' in options.line) {
        options.line.color = mergeColorOpacity(options.line.color,
                                               options.line.opacity);
        lineStyle.getColor().set(options.line.color);
      }
      // TODO: add colormode
    }
  
    // set poly style
    if (options.poly) {
      var polyStyle = styleObj.getPolyStyle();
    
      if (typeof options.poly == 'string') {
        options.poly = { color: options.poly };
      }
    
      // more options
      if ('fill' in options.poly) {
        polyStyle.setFill(options.poly.fill);
      }
      if ('outline' in options.poly) {
        polyStyle.setOutline(options.poly.outline);
      }
      if ('color' in options.poly || 'opacity' in options.poly) {
        options.poly.color = mergeColorOpacity(options.poly.color,
                                               options.poly.opacity);
        polyStyle.getColor().set(options.poly.color);
      }
      // TODO: add colormode
    }
  }
});
// TODO: unit tests
/**
 * Removes all top-level features from the Earth object's DOM.
 */
GEarthExtensions.prototype.dom.clearFeatures = function() {
  var featureContainer = this.pluginInstance.getFeatures();
  var c;
  while ((c = featureContainer.getLastChild()) !== null) {
    featureContainer.removeChild(c);
  }
};

/**
 * Walks a KML object, calling a given visit function for each object in
 * the KML DOM. The lone argument must be either a visit function or an
 * options literal.
 * 
 * NOTE: walking the DOM can have pretty poor performance on very large
 * hierarchies, as first time accesses to KML objects from JavaScript
 * incur some overhead in the API.
 * 
 * @param {Object} [options] The walk options:
 * @param {Function} [options.visitCallback] The function to call upon visiting
 *     a node in the DOM. The 'this' variable in the callback function will be
 *     bound to the object being visited. The lone argument passed to this
 *     function will be an object literal for the call context. To get the
 *     current application-specific call context, use the 'current' property
 *     of the context object. To set the context for all child calls, set the
 *     'child' property of the context object.To prevent walking the children
 *     of the current object, set the 'walkChildren' property of the context
 *     object to false. To stop the walking process altogether,
 *     return false in the function.
 * @param {KmlObject} [options.rootObject] The root of the KML object hierarchy
 *     to walk.
 * @param {Boolean} [options.features] Descend into feature containers?
 *     Default true.
 * @param {Boolean} [options.geometries] Descend into geometry containers?
 *     Default false.
 * @param {Object} [options.rootContext] The application-specific context to
 *     pass to the root item.
 */
GEarthExtensions.prototype.dom.walk = function() {
  var options;
  
  // figure out the arguments
  if (arguments.length == 1) {
    if (geo.util.isObjectLiteral(arguments[0])) {
      // object literal only
      options = arguments[0];
    } else if (geo.util.isFunction(arguments[0])) {
      // callback function only
      options = { visitCallback: arguments[0] };
    } else {
      throw new TypeError('walk requires a visit callback function or ' +
                          'options literal as a first parameter');
    }
  } else {
    throw new Error('walk takes at most 1 arguments');
  }
  
  if (!('visitCallback' in options)) {
    throw new Error('walk requires a visit callback function');
  }
  
  if (!('features' in options)) {
    options.features = true;
  }
  
  if (!('geometries' in options)) {
    options.geometries = false;
  }
  
  if (!('rootObject' in options)) {
    options.rootObject = this.pluginInstance;
  }
  
  var recurse_ = function(object, currentContext) {
    var contextArgument = {
      current: currentContext,
      child: currentContext,
      walkChildren: true
    };
    
    // walk object
    var retValue = options.visitCallback.call(object, contextArgument);
    if (!retValue && !geo.util.isUndefined(retValue)) {
      return false;
    }
    
    if (!contextArgument.walkChildren) {
      return true;
    }
    
    var objectContainer = null; // GESchemaObjectContainer
    
    // check if object is a parent
    if ('getFeatures' in object) { // GEFeatureContainer
      if (options.features) {
        objectContainer = object.getFeatures();
      }
    } else if ('getGeometry' in object) { // KmlFeature - descend into geoms.
      if (options.geometries && object.getGeometry()) {
        recurse_(object.getGeometry(), contextArgument.child);
      }
    } else if ('getGeometries' in object) { // GEGeometryContainer
      if (options.geometries) {
        objectContainer = object.getGeometries();
      }
    } else if ('getInnerBoundaries' in object) { // GELinearRingContainer
      if (options.geometries) {
        objectContainer = object.getInnerBoundaries();
      }
    }
    
    // iterate through children if object is a parent and recurse so they
    // can be walked
    if (objectContainer && objectContainer.hasChildNodes()) {
      var childNodes = objectContainer.getChildNodes();
      var numChildNodes = childNodes.getLength();
      
      for (var i = 0; i < numChildNodes; i++) {
        var child = childNodes.item(i);
        
        if (!recurse_(child, contextArgument.child)) {
          return false;
        }
      }
    }
    
    return true;
  };
  
  if (options.rootObject) {
    recurse_(options.rootObject, options.rootContext);
  }
};

/**
 * Gets the object in the Earth DOM with the given id.
 * @param {String} id The id of the object to retrieve.
 * @return Returns the object with the given id, or null if it was not found.
 */
GEarthExtensions.prototype.dom.getObjectById = function(id, options) {
  options = GEarthExtensions.checkParameters(options, false, {
    recursive: true,
    root: this.pluginInstance
  });
  
  // check self
  if ('getId' in options.root && options.root.getId() == id) {
    return options.root;
  }
  
  var returnObject = null;
  
  this.dom.walk({
    rootObject: options.root,
    features: true,
    geometries: true,
    visitCallback: function() {
      if (this.getId() == id) {
        returnObject = this;
        return false; // stop walk
      }
    }
  });

  return returnObject;
};
// TODO: unit test

/**
 * Removes the given object from the Earth object's DOM.
 * @param {KmlObject} object The object to remove.
 */
GEarthExtensions.prototype.dom.removeObject = function(object) {
  // TODO: make sure this removes the feature from its parent, which may not
  // necessarily be the root feature container
  var parent = object.getParentNode();
  var objectContainer = null; // GESchemaObjectContainer
  
  if ('getFeatures' in parent) { // GEFeatureContainer
    objectContainer = parent.getFeatures();
  } else if ('getGeometries' in parent) { // GEGeometryContainer
    objectContainer = parent.getGeometries();
  } else if ('getInnerBoundaries' in parent) { // GELinearRingContainer
    objectContainer = parent.getInnerBoundaries();
  }
  
  objectContainer.removeChild(object);
};
// TODO: unit test (heavily)

/**
 * Sets the given KmlVec2 object to the point defined in the options.
 * @param {KmlVec2} vec2 The object to set, for example a screen overlay's
 *     screenXY.
 * @param {Object} options The options literal defining the point.
 * @param {Number|String} [options.left] The left offset, in pixels (i.e. 5),
 *     or as a percentage (i.e. '25%').
 * @param {Number|String} [options.top] The top offset, in pixels or a string
 *     percentage.
 * @param {Number|String} [options.right] The right offset, in pixels or a
 *     string percentage.
 * @param {Number|String} [options.bottom] The bottom offset, in pixels or a
 *     string percentage.
 * @param {Number|String} [options.width] A convenience parameter specifying
 *     width, only useful for screen overlays, in pixels or a string percentage.
 * @param {Number|String} [options.height] A convenience parameter specifying
 *     height, only useful for screen overlays, in pixels or a string
 *     percentage.
 */
GEarthExtensions.prototype.dom.setVec2 = function(vec2, options) {
  options = GEarthExtensions.checkParameters(options, false, {
    left: GEarthExtensions.ALLOWED,
    top: GEarthExtensions.ALLOWED,
    right: GEarthExtensions.ALLOWED,
    bottom: GEarthExtensions.ALLOWED,
    width: GEarthExtensions.ALLOWED, // for screen overlay size
    height: GEarthExtensions.ALLOWED // for screen overlay size
  });
  
  if ('width' in options) {
    options.left = options.width;
  }
  
  if ('height' in options) {
    options.bottom = options.height;
  }
  
  var x = 0.0;
  var xUnits = this.pluginInstance.UNITS_PIXELS;
  var y = 0.0;
  var yUnits = this.pluginInstance.UNITS_PIXELS;
  
  // set X (origin = left)
  if ('left' in options) {
    if (typeof options.left == 'number') {
      x = options.left;
    } else if (typeof options.left == 'string' &&
               options.left.charAt(options.left.length - 1) == '%') {
      x = parseFloat(options.left) / 100;
      xUnits = this.pluginInstance.UNITS_FRACTION;
    } else {
      throw new TypeError('left must be a number or string indicating a ' +
                          'percentage');
    }
  } else if ('right' in options) {
    if (typeof options.right == 'number') {
      x = options.right;
      xUnits = this.pluginInstance.UNITS_INSET_PIXELS;
    } else if (typeof options.right == 'string' &&
               options.right.charAt(options.right.length - 1) == '%') {
      x = 1.0 - parseFloat(options.right) / 100;
      xUnits = this.pluginInstance.UNITS_FRACTION;
    } else {
      throw new TypeError('right must be a number or string indicating a ' +
                          'percentage');
    }
  }
  
  // set Y (origin = bottom)
  if ('bottom' in options) {
    if (typeof options.bottom == 'number') {
      y = options.bottom;
    } else if (typeof options.bottom == 'string' &&
               options.bottom.charAt(options.bottom.length - 1) == '%') {
      y = parseFloat(options.bottom) / 100;
      yUnits = this.pluginInstance.UNITS_FRACTION;
    } else {
      throw new TypeError('bottom must be a number or string indicating a ' +
                          'percentage');
    }
  } else if ('top' in options) {
    if (typeof options.top == 'number') {
      y = options.top;
      yUnits = this.pluginInstance.UNITS_INSET_PIXELS;
    } else if (typeof options.top == 'string' &&
               options.top.charAt(options.top.length - 1) == '%') {
      y = 1.0 - parseFloat(options.top) / 100;
      yUnits = this.pluginInstance.UNITS_FRACTION;
    } else {
      throw new TypeError('top must be a number or string indicating a ' +
                          'percentage');
    }
  }
  
  vec2.set(x, xUnits, y, yUnits);
};
/**
 * Creates a new lookat object with the given parameters.
 * @function
 * @param {PointSpec} [point] The point to look at.
 * @param {Object} options The parameters of the lookat object to create.
 * @param {PointSpec} [options.point] The point to look at.
 * @param {Boolean} [options.copy] Whether or not to copy parameters from the
 *     existing view if they aren't explicitly specified in the options.
 * @param {Number} [options.heading] The lookat heading/direction.
 * @param {Number} [options.tilt] The lookat tilt.
 * @param {Number} [options.range] The range of the camera (distance from the
 *     lookat point).
 * @type KmlLookAt
 */
GEarthExtensions.prototype.dom.buildLookAt = GEarthExtensions.domBuilder_({
  apiInterface: 'KmlLookAt',
  apiFactoryFn: 'createLookAt',
  defaultProperty: 'point',
  propertySpec: {
    copy: GEarthExtensions.ALLOWED,
    point: GEarthExtensions.REQUIRED,
    heading: GEarthExtensions.ALLOWED,
    tilt: GEarthExtensions.ALLOWED,
    range: GEarthExtensions.ALLOWED
  },
  constructor: function(lookAtObj, options) {
    var point = new geo.Point(options.point);
  
    var defaults = {
      heading: 0,
      tilt: 0,
      range: 1000
    };
  
    if (options.copy) {
      var currentLookAt = this.util.getLookAt(defaults.altitudeMode);
      defaults.heading = currentLookAt.getHeading();
      defaults.tilt = currentLookAt.getTilt();
      defaults.range = currentLookAt.getRange();
    }
  
    options = GEarthExtensions.checkParameters(options, true, defaults);
  
    lookAtObj.set(
        point.lat(),
        point.lng(),
        point.altitude(),
        point.altitudeMode(),
        options.heading,
        options.tilt,
        options.range);
  }
});
// TODO: incrementLookAt

/**
 * Creates a new camera object with the given parameters.
 * @function
 * @param {PointSpec} [point] The point at which to place the camera.
 * @param {Object} options The parameters of the camera object to create.
 * @param {PointSpec} [options.point] The point at which to place the camera.
 * @param {Boolean} [options.copy] Whether or not to copy parameters from the
 *     existing view if they aren't explicitly specified in the options.
 * @param {Number} [options.heading] The camera heading/direction.
 * @param {Number} [options.tilt] The camera tilt.
 * @param {Number} [options.range] The camera roll.
 * @type KmlCamera
 */
GEarthExtensions.prototype.dom.buildCamera = GEarthExtensions.domBuilder_({
  apiInterface: 'KmlCamera',
  apiFactoryFn: 'createCamera',
  defaultProperty: 'point',
  propertySpec: {
    copy: GEarthExtensions.ALLOWED,
    point: GEarthExtensions.REQUIRED,
    heading: GEarthExtensions.ALLOWED,
    tilt: GEarthExtensions.ALLOWED,
    roll: GEarthExtensions.ALLOWED
  },
  constructor: function(cameraObj, options) {
    var point = new geo.Point(options.point);
  
    var defaults = {
      heading: 0,
      tilt: 0,
      roll: 0
    };
  
    if (options.copy) {
      var currentCamera = this.util.getCamera(defaults.altitudeMode);
      defaults.heading = currentCamera.getHeading();
      defaults.tilt = currentCamera.getTilt();
      defaults.roll = currentCamera.getRoll();
    }
  
    options = GEarthExtensions.checkParameters(options, true, defaults);
  
    cameraObj.set(
        point.lat(),
        point.lng(),
        point.altitude(),
        point.altitudeMode(),
        options.heading,
        options.tilt,
        options.roll);
  }
});
// TODO: incrementLookAt
/**
 * Contains methods for allowing user-interactive editing of features inside
 * the Google Earth Plugin.
 * @namespace
 */
GEarthExtensions.prototype.edit = {isnamespace_:true};
/**
 * Make a placemark draggable.
 * TODO: make this work with multi-geometries
 */
(function() {
  // NOTE: this is shared across all GEarthExtensions instances
  var currentDragContext_ = null;

  var DRAGDATA_JSDATA_KEY = '_GEarthExtensions_dragData';

  function beginDragging_(extInstance, placemark, x, y) {
    // get placemark's drag data
    var placemarkDragData = extInstance.util.getJsDataValue(
        placemark, DRAGDATA_JSDATA_KEY) || {};

    currentDragContext_ = {
      placemark: placemark,
      draggableOptions: placemarkDragData.draggableOptions,
      dragged: false
    };
  }

  function makeMouseMoveListener_(extInstance) {
    return function(event) {
      if (currentDragContext_) {
        event.preventDefault();

        if (!event.getDidHitGlobe()) {
          return;
        }
        
        if (!currentDragContext_.dragged) {
          currentDragContext_.dragged = true;
          
          // animate
          if (currentDragContext_.draggableOptions.bounce) {
            extInstance.fx.cancel(currentDragContext_.placemark);
            extInstance.fx.bounce(currentDragContext_.placemark, {
              phase: 1
            });
          }

          // set dragging style
          if (currentDragContext_.draggableOptions.draggingStyle) {
            currentDragContext_.oldStyle =
                currentDragContext_.placemark.getStyleSelector();
            currentDragContext_.placemark.setStyleSelector(
                extInstance.dom.buildStyle(
                currentDragContext_.draggableOptions.draggingStyle));
          }

          // show 'target' screen overlay (will be correctly positioned
          // later)
          if (currentDragContext_.draggableOptions.targetScreenOverlay) {
            var overlay = extInstance.dom.buildScreenOverlay(
                currentDragContext_.draggableOptions.targetScreenOverlay);
            extInstance.pluginInstance.getFeatures().appendChild(overlay);
            currentDragContext_.activeTargetScreenOverlay = overlay;
          }
        }

        // move 'target' screen overlay
        if (currentDragContext_.activeTargetScreenOverlay) {
          extInstance.dom.setVec2(
              extInstance.util.areScreenOverlayXYSwapped_() ?
                currentDragContext_.activeTargetScreenOverlay.getOverlayXY() :
                currentDragContext_.activeTargetScreenOverlay.getScreenXY(),
              { left: event.getClientX(), top: event.getClientY() });
        }

        // TODO: allow for non-point dragging (models?)
        var point = currentDragContext_.placemark.getGeometry();
        point.setLatitude(event.getLatitude());
        point.setLongitude(event.getLongitude());

        if (currentDragContext_.draggableOptions.dragCallback) {
          currentDragContext_.draggableOptions.dragCallback.call(
              currentDragContext_.placemark);
        }
      }
    };
  }

  function stopDragging_(extInstance, abort) {
    if (currentDragContext_) {
      if (currentDragContext_.dragged) {
        // unset dragging style
        if (currentDragContext_.oldStyle) {
          currentDragContext_.placemark.setStyleSelector(
              currentDragContext_.oldStyle);
          delete currentDragContext_.oldStyle;
        }

        // remove 'target' screen overlay
        if (currentDragContext_.activeTargetScreenOverlay) {
          extInstance.pluginInstance.getFeatures().removeChild(
              currentDragContext_.activeTargetScreenOverlay);
          delete currentDragContext_.activeTargetScreenOverlay;
        }

        // animate
        if (currentDragContext_.draggableOptions.bounce) {
          extInstance.fx.cancel(currentDragContext_.placemark);
          extInstance.fx.bounce(currentDragContext_.placemark, {
            startAltitude: 0,
            phase: 2,
            repeat: 1,
            dampen: 0.3
          });
        }
      }

      if (currentDragContext_.dragged &&
          currentDragContext_.draggableOptions.dropCallback && !abort) {
        currentDragContext_.draggableOptions.dropCallback.call(
            currentDragContext_.placemark);
      }

      currentDragContext_ = null;
    }
  }

  /**
   * Turns on draggability for the given point placemark.
   * @param {KmlPlacemark} placemark The point placemark to enable dragging on.
   * @param {Object} [options] The draggable options.
   * @param {Boolean} [options.bounce] Whether or not to bounce up upon dragging
   *     and bounce back down upon dropping.
   * @param {Function} [options.dragCallback] A callback function to fire
   *     continuously while dragging occurs.
   * @param {Function} [options.dropCallback] A callback function to fire
   *     once the placemark is successfully dropped.
   * @param {StyleOptions|KmlStyle} [options.draggingStyle] The style options
   *     to apply to the placemark while dragging.
   * @param {ScreenOverlayOptions|KmlScreenOverlay} [options.targetScreenOverlay]
   *     A screen overlay to use as a drop target indicator (i.e. a bullseye)
   *     while dragging.
   */
  GEarthExtensions.prototype.edit.makeDraggable = function(placemark, options) {
    this.edit.endDraggable(placemark);

    // TODO: assert this is a point placemark
    options = GEarthExtensions.checkParameters(options, false, {
      bounce: true,
      dragCallback: GEarthExtensions.ALLOWED,
      dropCallback: GEarthExtensions.ALLOWED,
      draggingStyle: GEarthExtensions.ALLOWED,
      targetScreenOverlay: GEarthExtensions.ALLOWED
    });

    var me = this;

    // create a mouse move listener for use once dragging has begun
    var mouseMoveListener = makeMouseMoveListener_(me);

    // create a mouse up listener for use once dragging has begun
    var mouseUpListener;
    mouseUpListener = function(event) {
      if (currentDragContext_ && event.getButton() === 0) {
        // remove listener for mousemove on the globe
        google.earth.removeEventListener(me.pluginInstance.getWindow(),
            'mousemove', mouseMoveListener);

        // remove listener for mouseup on the window
        google.earth.removeEventListener(me.pluginInstance.getWindow(),
            'mouseup', mouseUpListener);

        if (currentDragContext_.dragged) {
          // if the placemark was dragged, prevent balloons from popping up
          event.preventDefault();
        }

        stopDragging_(me);
      }
    };

    // create a mouse down listener
    var mouseDownListener = function(event) {
      if (event.getButton() === 0) {
        // TODO: check if getTarget() is draggable and is a placemark
        beginDragging_(me, event.getTarget(),
            event.getClientX(), event.getClientY());

        // listen for mousemove on the globe
        google.earth.addEventListener(me.pluginInstance.getWindow(),
            'mousemove', mouseMoveListener);

        // listen for mouseup on the window
        google.earth.addEventListener(me.pluginInstance.getWindow(),
            'mouseup', mouseUpListener);
      }
    };

    // persist drag options for use in listeners
    this.util.setJsDataValue(placemark, DRAGDATA_JSDATA_KEY, {
      draggableOptions: options,
      abortAndEndFn: function() {
        if (currentDragContext_ &&
            currentDragContext_.placemark.equals(placemark)) {
          // remove listener for mousemove on the globe
          google.earth.removeEventListener(me.pluginInstance.getWindow(),
              'mousemove', mouseMoveListener);

          // remove listener for mouseup on the window
          google.earth.removeEventListener(me.pluginInstance.getWindow(),
              'mouseup', mouseUpListener);

          stopDragging_(me, true); // abort
        }

        google.earth.removeEventListener(placemark, 'mousedown',
            mouseDownListener);
      }
    });

    // listen for mousedown on the placemark
    google.earth.addEventListener(placemark, 'mousedown', mouseDownListener);
  };

  /**
   * Ceases the draggability of the given placemark. If the placemark is in the
   * process of being placed via GEarthExtensions#edit.place, the placement
   * is cancelled.
   */
  GEarthExtensions.prototype.edit.endDraggable = function(placemark) {
    // get placemark's drag data
    var placemarkDragData = this.util.getJsDataValue(
        placemark, DRAGDATA_JSDATA_KEY);

    // stop listening for mousedown on the window
    if (placemarkDragData) {
      placemarkDragData.abortAndEndFn.call(null);

      this.util.clearJsDataValue(placemark, DRAGDATA_JSDATA_KEY);
    }
  };

  /**
   * Enters a mode in which the user can place the given point placemark onto
   * the globe by clicking on the globe. To cancel the placement, use
   * GEarthExtensions#edit.endDraggable.
   * @param {KmlPlacemark} placemark The point placemark for the user to place
   *     onto the globe.
   * @param {Object} [options] The draggable options. See
   *     GEarthExtensions#edit.makeDraggable.
   */
  GEarthExtensions.prototype.edit.place = function(placemark, options) {
    // TODO: assert this is a point placemark
    options = GEarthExtensions.checkParameters(options, false, {
      bounce: true,
      dragCallback: GEarthExtensions.ALLOWED,
      dropCallback: GEarthExtensions.ALLOWED,
      draggingStyle: GEarthExtensions.ALLOWED,
      targetScreenOverlay: GEarthExtensions.ALLOWED
    });

    var me = this;

    // create a mouse move listener
    var mouseMoveListener = makeMouseMoveListener_(me);

    // create a mouse down listener
    var mouseDownListener;
    mouseDownListener = function(event) {
      if (currentDragContext_ && event.getButton() === 0) {
        event.preventDefault();
        event.stopPropagation();
        
        // remove listener for mousemove on the globe
        google.earth.removeEventListener(me.pluginInstance.getWindow(),
            'mousemove', mouseMoveListener);

        // remove listener for mousedown on the window
        google.earth.removeEventListener(me.pluginInstance.getWindow(),
            'mousedown', mouseDownListener);

        stopDragging_(me);
      }
    };

    // persist drag options for use in listeners
    this.util.setJsDataValue(placemark, DRAGDATA_JSDATA_KEY, {
      draggableOptions: options,
      abortAndEndFn: function() {
        if (currentDragContext_ &&
            currentDragContext_.placemark.equals(placemark)) {
          // remove listener for mousemove on the globe
          google.earth.removeEventListener(me.pluginInstance.getWindow(),
              'mousemove', mouseMoveListener);

          // remove listener for mousedown on the window
          google.earth.removeEventListener(me.pluginInstance.getWindow(),
              'mousedown', mouseDownListener);

          stopDragging_(me, true); // abort
        }
      }
    });

    // enter dragging mode right away to 'place' the placemark on the globe
    beginDragging_(me, placemark, -999, -999);

    // listen for mousemove on the window
    google.earth.addEventListener(me.pluginInstance.getWindow(),
        'mousemove', mouseMoveListener);

    // listen for mousedown on the window
    google.earth.addEventListener(me.pluginInstance.getWindow(),
        'mousedown', mouseDownListener);
  };
}());
(function() {

  var LINESTRINGEDITDATA_JSDATA_KEY = '_GEarthExtensions_lineStringEditData';

  /**
   * Enters a mode in which the user can draw the given line string geometry
   * on the globe by clicking on the globe to create coordinates.
   * To cancel the placement, use GEarthExtensions#edit.endEditLineString.
   * This is similar in intended usage to GEarthExtensions#edit.place.
   * @param {KmlLineString|KmlLinearRing} lineString The line string geometry
   *     to allow the user to draw (or append points to).
   * @param {Object} [options] The edit options.
   * @param {Boolean} [options.bounce] Whether or not to enable bounce effects
   *     while drawing coordinates.
   * @param {Function} finishCallback A callback to fire when drawing is
   *     successfully completed (via double click or by clicking on the first
   *     coordinate again).
   */
  GEarthExtensions.prototype.edit.drawLineString = function(lineString,
                                                            options) {
    options = GEarthExtensions.checkParameters(options, false, {
      bounce: true,
      finishCallback: GEarthExtensions.ALLOWED
    });
    
    var lineStringEditData = this.util.getJsDataValue(
        lineString, LINESTRINGEDITDATA_JSDATA_KEY) || {};
    if (lineStringEditData) {
      this.edit.endEditLineString(lineString);
    }
    
    var me = this;

    // TODO: options: icon for placemarks

    var done = false;
    var placemarks = [];
    var altitudeMode = lineString.getAltitudeMode();
    var headPlacemark = null;
    var isRing = (lineString.getType() == 'KmlLinearRing');
    var coords = lineString.getCoordinates();
    var innerDoc = this.pluginInstance.parseKml(
        '<Document>' +
        '<Style id="_GEarthExtensions_regularCoordinate"><IconStyle>' +
        '<Icon><href>http://maps.google.com/mapfiles/kml/' +
        'shapes/placemark_circle.png</href></Icon>' +
        '</IconStyle></Style>' +
        '<Style id="_GEarthExtensions_firstCoordinateHighlight"><IconStyle>' +
        '<Icon><href>http://maps.google.com/mapfiles/kml/' +
        'shapes/placemark_circle.png</href></Icon>' +
        '<scale>1.3</scale><color>ff00ff00</color>' +
        '</IconStyle></Style>' +
        '<StyleMap id="_GEarthExtensions_firstCoordinate">' +
        '<Pair><key>normal</key>' +
        '<styleUrl>#_GEarthExtensions_regularCoordinate</styleUrl>' +
        '</Pair><Pair><key>highlight</key>' +
        '<styleUrl>#_GEarthExtensions_firstCoordinateHighlight</styleUrl>' +
        '</Pair></StyleMap>' +
        '</Document>');

    var endFunction = function(abort) {
      // duplicate the first coordinate to the end if necessary
      var numCoords = coords.getLength();
      if (numCoords) {
        var tempFirstCoord_ = coords.get(0);
        var tempLastCoord_ = coords.get(numCoords - 1);
        if (isRing && (
            tempFirstCoord_.getLatitude() != tempLastCoord_.getLatitude() ||
            tempFirstCoord_.getLongitude() != tempLastCoord_.getLongitude())) {
          coords.pushLatLngAlt(tempFirstCoord_.getLatitude(),
                               tempFirstCoord_.getLongitude(),
                               tempFirstCoord_.getAltitude());
        }
      }

      me.edit.endDraggable(headPlacemark);
      me.dom.removeObject(innerDoc);
      me.util.clearJsDataValue(lineString, LINESTRINGEDITDATA_JSDATA_KEY);
      placemarks = [];
      done = true;

      if (options.finishCallback && !abort) {
        options.finishCallback.call(null);
      }
    };
    
    var finishListener = function(event) {
      event.preventDefault();
      endFunction.call(null);
    };
    
    var drawNext;
    drawNext = function() {
      headPlacemark = me.dom.buildPointPlacemark([0, 0], {
        altitudeMode: altitudeMode,
        style: '#_GEarthExtensions_regularCoordinate'
      });
      innerDoc.getFeatures().appendChild(headPlacemark);
      placemarks.push(headPlacemark);

      me.edit.place(headPlacemark, {
        bounce: options.bounce,
        dropCallback: function() {
          if (!done) {
            coords.pushLatLngAlt(
                headPlacemark.getGeometry().getLatitude(),
                headPlacemark.getGeometry().getLongitude(), 0);

            if (placemarks.length == 1) {
              // set up a click listener on the first placemark -- if it gets
              // clicked, stop drawing the linestring
              placemarks[0].setStyleUrl('#_GEarthExtensions_firstCoordinate');
              google.earth.addEventListener(placemarks[0], 'mousedown',
                  finishListener);
            }

            setTimeout(drawNext, 0);
          }
        }
      });
    };

    drawNext.call(null);
    
    google.earth.addEventListener(me.pluginInstance.getWindow(), 'dblclick',
        finishListener);

    // display the editing UI
    this.pluginInstance.getFeatures().appendChild(innerDoc);

    // set up an abort function for use in endEditLineString
    this.util.setJsDataValue(lineString, LINESTRINGEDITDATA_JSDATA_KEY, {
      abortAndEndFn: function() {
        endFunction.call(null, true); // abort
        google.earth.removeEventListener(me.pluginInstance.getWindow(),
            'dblclick', finishListener);
      }
    });
  };
  // TODO: interactive test

  /**
   * Allows the user to edit the coordinates of the given line string by
   * dragging existing points, splitting path segments/creating new points or
   * deleting existing points.
   * @param {KmlLineString|KmlLinearRing} lineString The line string or lienar
   *     ring geometry to edit. For KmlPolygon geometries, pass in an outer
   *     or inner boundary.
   * @param {Object} [options] The line string edit options.
   * @param {Function} [options.editCallback] A callback function to fire
   *     when the line string coordinates have changed due to user interaction.
   */
  GEarthExtensions.prototype.edit.editLineString = function(lineString,
                                                            options) {
    options = GEarthExtensions.checkParameters(options, false, {
      editCallback: GEarthExtensions.ALLOWED
    });
    
    var lineStringEditData = this.util.getJsDataValue(
        lineString, LINESTRINGEDITDATA_JSDATA_KEY) || {};
    if (lineStringEditData) {
      this.edit.endEditLineString(lineString);
    }

    var me = this;
    
    var isRing = (lineString.getType() == 'KmlLinearRing');
    var altitudeMode = lineString.getAltitudeMode();
    var coords = lineString.getCoordinates();
    var numCoords = coords.getLength();

    var innerDoc = this.pluginInstance.parseKml(
        '<Document>' +
        '<Style id="_GEarthExtensions_regularCoordinate"><IconStyle>' +
        '<Icon><href>http://maps.google.com/mapfiles/kml/' +
        'shapes/placemark_circle.png</href></Icon>' +
        '</IconStyle></Style>' +
        '<StyleMap id="_GEarthExtensions_midCoordinate">' +
        '<Pair><key>normal</key>' +
        '<Style><IconStyle>' +
        '<Icon><href>http://maps.google.com/mapfiles/kml/' +
        'shapes/placemark_circle.png</href></Icon>' +
        '<color>60ffffff</color><scale>0.75</scale>' +
        '</IconStyle></Style></Pair>' +
        '<Pair><key>highlight</key>' +
        '<styleUrl>#_GEarthExtensions_regularCoordinate</styleUrl>' +
        '</Pair></StyleMap>' +
        '</Document>');

    // TODO: options: icon for placemarks
    // TODO: it may be easier to use a linked list for all this
    
    // remove the last coordinate temporarily if it's the same as the first
    // coord, for editing convenience
    if (numCoords >= 2) {
      var tempFirstCoord_ = coords.get(0);
      var tempLastCoord_ = coords.get(numCoords - 1);
      if (isRing &&
          tempFirstCoord_.getLatitude() == tempLastCoord_.getLatitude() &&
          tempFirstCoord_.getLongitude() == tempLastCoord_.getLongitude() &&
          tempFirstCoord_.getAltitude() == tempLastCoord_.getAltitude()) {
        coords.pop();
        numCoords--;
      }
    }

    var coordDataArr = [];

    var makeRegularDeleteEventListener_ = function(coordData) {
      return function(event) {
        event.preventDefault();

        // shift coordinates in the KmlCoordArray up
        // TODO: speed this up
        for (i = coordData.index; i < numCoords - 1; i++) {
          coords.set(i, coords.get(i + 1));
        }

        coords.pop();

        var leftCoordData = null;
        if (coordData.index > 0 || isRing) {
          var leftIndex = coordData.index - 1;
          if (leftIndex < 0) {
            leftIndex += numCoords; // wrap
          }

          leftCoordData = coordDataArr[leftIndex];
        }

        numCoords--;

        // at the end of the line and there's no right-mid placemark.
        // the previous-to-last point's mid point should be removed too.
        if (coordData.rightMidPlacemark === null && leftCoordData) {
          me.edit.endDraggable(leftCoordData.rightMidPlacemark);
          me.dom.removeObject(leftCoordData.rightMidPlacemark);
          leftCoordData.rightMidPlacemark = null;
        }

        // teardown mid placemark
        if (coordData.rightMidPlacemark) {
          me.edit.endDraggable(coordData.rightMidPlacemark);
          me.dom.removeObject(coordData.rightMidPlacemark);
        }

        // tear down this placemark
        me.edit.endDraggable(coordData.regularPlacemark);
        google.earth.removeEventListener(coordData.regularPlacemark,
            'dblclick', coordData.deleteEventListener);
        me.dom.removeObject(coordData.regularPlacemark);

        coordDataArr.splice(coordData.index, 1);

        // update all coord data indices after this removed
        // coordinate, because indices have changed
        for (i = 0; i < numCoords; i++) {
          coordDataArr[i].index = i;
        }

        // call the drag listener for the previous coordinate
        // to update the midpoint location
        if (leftCoordData) {
          leftCoordData.regularDragCallback.call(
              leftCoordData.regularPlacemark, leftCoordData);
        }
        
        if (options.editCallback) {
          options.editCallback(null);
        }
      };
    };

    var makeRegularDragCallback_ = function(coordData) {
      return function() {
        // update this coordinate
        coords.setLatLngAlt(coordData.index,
            this.getGeometry().getLatitude(),
            this.getGeometry().getLongitude(), 0);

        // update midpoint placemarks
        var curCoord = coords.get(coordData.index);

        if (coordData.index > 0 || isRing) {
          var leftIndex = coordData.index - 1;
          if (leftIndex < 0) {
            leftIndex += numCoords; // wrap
          }
          
          var leftMidPt = new geo.Point(coords.get(leftIndex)).midpoint(
              new geo.Point(curCoord));
          coordDataArr[leftIndex].rightMidPlacemark.getGeometry().setLatitude(
              leftMidPt.lat());
          coordDataArr[leftIndex].rightMidPlacemark.getGeometry().setLongitude(
              leftMidPt.lng());
        }

        if (coordData.index < numCoords - 1 || isRing) {
          var rightMidPt = new geo.Point(curCoord).midpoint(
              new geo.Point(coords.get((coordData.index + 1) % numCoords)));
          coordData.rightMidPlacemark.getGeometry().setLatitude(
              rightMidPt.lat());
          coordData.rightMidPlacemark.getGeometry().setLongitude(
              rightMidPt.lng());
        }
        
        if (options.editCallback) {
          options.editCallback(null);
        }
      };
    };

    var makeMidDragCallback_ = function(coordData) {
      // vars for the closure
      var convertedToRegular = false;
      var newCoordData = null;

      return function() {
        if (!convertedToRegular) {
          // first time drag... convert this midpoint into a regular point

          convertedToRegular = true;
          var i;

          // change style to regular placemark style
          this.setStyleUrl('#_GEarthExtensions_regularCoordinate');

          // shift coordinates in the KmlCoordArray down
          // TODO: speed this up
          coords.push(coords.get(numCoords - 1));
          for (i = numCoords - 1; i > coordData.index + 1; i--) {
            coords.set(i, coords.get(i - 1));
          }

          numCoords++;

          // create a new coordData object for the newly created
          // coordinate
          newCoordData = {};
          newCoordData.index = coordData.index + 1;
          newCoordData.regularPlacemark = this; // the converted midpoint

          // replace this to-be-converted midpoint with a new midpoint
          // placemark (will be to the left of the new coord)
          coordData.rightMidPlacemark = me.dom.buildPointPlacemark({
            point: coords.get(coordData.index),
            altitudeMode: altitudeMode,
            style: '#_GEarthExtensions_midCoordinate'
          });
          innerDoc.getFeatures().appendChild(coordData.rightMidPlacemark);

          me.edit.makeDraggable(coordData.rightMidPlacemark, {
            bounce: false,
            dragCallback: makeMidDragCallback_(coordData) // previous coord
          });

          // create a new right midpoint
          newCoordData.rightMidPlacemark = me.dom.buildPointPlacemark({
            point: coords.get(coordData.index),
            altitudeMode: altitudeMode,
            style: '#_GEarthExtensions_midCoordinate'
          });
          innerDoc.getFeatures().appendChild(newCoordData.rightMidPlacemark);

          me.edit.makeDraggable(newCoordData.rightMidPlacemark, {
            bounce: false,
            dragCallback: makeMidDragCallback_(newCoordData)
          });

          // create a delete listener
          newCoordData.deleteEventListener = makeRegularDeleteEventListener_(
              newCoordData);
          google.earth.addEventListener(this, 'dblclick',
              newCoordData.deleteEventListener);

          newCoordData.regularDragCallback =
              makeRegularDragCallback_(newCoordData);

          // insert the new coordData
          coordDataArr.splice(newCoordData.index, 0, newCoordData);

          // update all placemark drag callbacks after this newly inserted
          // coordinate, because indices have changed
          // NOTE: the old draggable callbacks are replaced with these
          // calls to makeDraggable
          for (i = 0; i < numCoords; i++) {
            coordDataArr[i].index = i;
          }
        }

        // do regular dragging stuff
        newCoordData.regularDragCallback.call(this, newCoordData);
        
        // the regular drag callback calls options.editCallback
      };
    };

    me.util.batchExecute(function() {
      // create the edit placemarks
      for (var i = 0; i < numCoords; i++) {
        var curCoord = coords.get(i);
        var nextCoord = coords.get((i + 1) % numCoords);

        var coordData = {};
        coordDataArr.push(coordData);
        coordData.index = i;

        // create the regular placemark on the point
        coordData.regularPlacemark = me.dom.buildPointPlacemark(curCoord, {
          altitudeMode: altitudeMode,
          style: '#_GEarthExtensions_regularCoordinate'
        });
        innerDoc.getFeatures().appendChild(coordData.regularPlacemark);

        coordData.regularDragCallback = makeRegularDragCallback_(coordData);

        // set up drag handlers for main placemarks
        me.edit.makeDraggable(coordData.regularPlacemark, {
          bounce: false,
          dragCallback: coordData.regularDragCallback
        });

        coordData.deleteEventListener =
            makeRegularDeleteEventListener_(coordData);
        google.earth.addEventListener(coordData.regularPlacemark, 'dblclick',
            coordData.deleteEventListener);

        // create the next midpoint placemark
        if (i < numCoords - 1 || isRing) {
          coordData.rightMidPlacemark = me.dom.buildPointPlacemark({
            point: new geo.Point(curCoord).midpoint(
                new geo.Point(nextCoord)),
            altitudeMode: altitudeMode,
            style: '#_GEarthExtensions_midCoordinate'
          });
          innerDoc.getFeatures().appendChild(coordData.rightMidPlacemark);

          // set up drag handlers for mid placemarks
          me.edit.makeDraggable(coordData.rightMidPlacemark, {
            bounce: false,
            dragCallback: makeMidDragCallback_(coordData)
          });
        }
      }

      // display the editing UI
      me.pluginInstance.getFeatures().appendChild(innerDoc);
    });

    // set up an abort function for use in endEditLineString
    me.util.setJsDataValue(lineString, LINESTRINGEDITDATA_JSDATA_KEY, {
      innerDoc: innerDoc,
      abortAndEndFn: function() {
        me.util.batchExecute(function() {
          // duplicate the first coordinate to the end if necessary
          var numCoords = coords.getLength();
          if (numCoords) {
            var tempFirstCoord_ = coords.get(0);
            var tempLastCoord_ = coords.get(numCoords - 1);
            if (isRing && (
                tempFirstCoord_.getLatitude() != tempLastCoord_.getLatitude() ||
                tempFirstCoord_.getLongitude() != tempLastCoord_.getLongitude()
                )) {
              coords.pushLatLngAlt(tempFirstCoord_.getLatitude(),
                                   tempFirstCoord_.getLongitude(),
                                   tempFirstCoord_.getAltitude());
            }
          }
          
          for (var i = 0; i < coordDataArr.length; i++) {
            // teardown for regular placemark, its delete event listener
            // and its right-mid placemark
            google.earth.removeEventListener(coordDataArr[i].regularPlacemark,
                'dblclick', coordDataArr[i].deleteEventListener);

            me.edit.endDraggable(coordDataArr[i].regularPlacemark);
          
            if (coordDataArr[i].rightMidPlacemark) {
              me.edit.endDraggable(coordDataArr[i].rightMidPlacemark);
            }
          }

          me.dom.removeObject(innerDoc);
        });
      }
    });
  };

  /**
   * Ceases the ability for the user to edit or draw the given line string.
   */
  GEarthExtensions.prototype.edit.endEditLineString = function(lineString) {
    // get placemark's drag data
    var lineStringEditData = this.util.getJsDataValue(
        lineString, LINESTRINGEDITDATA_JSDATA_KEY);

    // stop listening for mousedown on the window
    if (lineStringEditData) {
      lineStringEditData.abortAndEndFn.call(null);

      this.util.clearJsDataValue(lineString, LINESTRINGEDITDATA_JSDATA_KEY);
    }
  };
})();
/**
 * Contains various animation/effects tools for use in the Google Earth API.
 * @namespace
 */
GEarthExtensions.prototype.fx = {isnamespace_:true};
/**
 * Returns the singleton animation manager for the plugin instance.
 * @private
 */
GEarthExtensions.prototype.fx.getAnimationManager_ = function() {
  if (!this.animationManager_) {
    this.animationManager_ = new this.fx.AnimationManager_();
  }
  
  return this.animationManager_;
};

/**
 * @class Private singleton class for managing GEarthExtensions#fx animations
 * in a plugin instance.
 * @private
 */
GEarthExtensions.prototype.fx.AnimationManager_ = GEarthExtensions.createClass_(
function() {
  this.extInstance = arguments.callee.extInstance_;
  this.animations_ = [];

  this.running_ = false;
  this.globalTime_ = 0.0;
});

/**
 * Start an animation (deriving from GEarthExtensions#fx.Animation).
 * @ignore
 */
GEarthExtensions.prototype.fx.AnimationManager_.prototype.startAnimation =
function(anim) {
  this.animations_.push({
    obj: anim,
    startGlobalTime: this.globalTime_
  });
  
  this.start_();
};

/**
 * Stop an animation (deriving from GEarthExtensions#fx.Animation).
 * @ignore
 */
GEarthExtensions.prototype.fx.AnimationManager_.prototype.stopAnimation =
function(anim) {
  for (var i = 0; i < this.animations_.length; i++) {
    if (this.animations_[i].obj == anim) {
      // remove the animation from the array
      this.animations_.splice(i, 1);
      return;
    }
  }
};

/**
 * Private, internal function to start animating
 * @ignore
 */
GEarthExtensions.prototype.fx.AnimationManager_.prototype.start_ = function() {
  if (this.running_) {
    return;
  }
  
  this.startTimeStamp_ = Number(new Date());
  this.tick_();
  
  for (var i = 0; i < this.animations_.length; i++) {
    this.animations_[i].obj.renderFrame(0);
  }
  
  var me = this;
  this.frameendListener_ = function(){ me.tick_(); };
  this.tickInterval_ = window.setInterval(this.frameendListener_, 100);
  google.earth.addEventListener(this.extInstance.pluginInstance,
      'frameend', this.frameendListener_);
  this.running_ = true;
};

/**
 * Private, internal function to stop animating
 * @ignore
 */
GEarthExtensions.prototype.fx.AnimationManager_.prototype.stop_ = function() {
  if (!this.running_) {
    return;
  }
  
  google.earth.removeEventListener(this.extInstance.pluginInstance,
      'frameend', this.frameendListener_);
  this.frameendListener_ = null;
  window.clearInterval(this.tickInterval_);
  this.tickInterval_ = null;
  this.running_ = false;
  this.globalTime_ = 0.0;
};

/**
 * Internal tick handler (frameend)
 * @ignore
 */
GEarthExtensions.prototype.fx.AnimationManager_.prototype.tick_ = function() {
  if (!this.running_) {
    return;
  }
  
  this.globalTime_ = Number(new Date()) - this.startTimeStamp_;
  this.renderCurrentFrame_();
};

/**
 * Private function to render current animation frame state (by calling
 * registered Animations' individual frame renderers.
 * @ignore
 */
GEarthExtensions.prototype.fx.AnimationManager_.prototype.renderCurrentFrame_ =
function() {
  for (var i = this.animations_.length - 1; i >= 0; i--) {
    var animation = this.animations_[i];
    animation.obj.renderFrame(this.globalTime_ - animation.startGlobalTime);
  }
  
  if (this.animations_.length === 0) {
    this.stop_();
  }
};

/**
 * @class Base class for all GEarthExtensions#fx animations. Animations of this
 * base class are not bounded by a given time duration and must manually be
 * stopped when they are 'complete'.
 * @param {Function} renderCallback A method that will be called to render
 *     a frame of the animation. Its sole parameter will be the time, in
 *     seconds, of the frame to render.
 * @param {Function} [completionCallback] A callback method to fire when the
 *     animation is completed/stopped.
 */
GEarthExtensions.prototype.fx.Animation =
GEarthExtensions.createClass_(function(renderFn, completionFn) {
  this.extInstance = arguments.callee.extInstance_;
  this.renderFn = renderFn;
  this.completionFn = completionFn; // optional
});

/**
 * Start this animation.
 */
GEarthExtensions.prototype.fx.Animation.prototype.start = function() {
  this.extInstance.fx.getAnimationManager_().startAnimation(this);
};

/**
 * Stop this animation.
 * @param {Boolean} [completed=true] Whether or not to call the completion
 *     callback.
 */
GEarthExtensions.prototype.fx.Animation.prototype.stop = function(completed) {
  this.extInstance.fx.getAnimationManager_().stopAnimation(this);
  
  if (this.completionFn && (completed || geo.util.isUndefined(completed))) {
    this.completionFn.call(this); // clean exit
  }
};

/**
 * Stop and rewind the animation to the frame at time t=0.
 */
GEarthExtensions.prototype.fx.Animation.prototype.rewind = function() {
  this.renderFrame(0);
  this.stop(false);
};

/**
 * Render the frame at the given time after the animation was started.
 * @param {Number} time The time in seconds of the frame to render.
 */
GEarthExtensions.prototype.fx.Animation.prototype.renderFrame = function(t) {
  this.renderFn.call(this, t);
};

/**
 * @class Generic class for animations of a fixed duration.
 * @param {Number} duration The length of time for which this animation should
 *     run, in seconds.
 * @param {Function} renderCallback A method that will be called to render
 *     a frame of the animation. Its sole parameter will be the time, in
 *     seconds, of the frame to render.
 * @param {Function} [completionCallback] A callback method to fire when the
 *     animation is completed/stopped.
 * @extends GEarthExtensions#fx.Animation
 */
GEarthExtensions.prototype.fx.TimedAnimation =
GEarthExtensions.createClass_(
  [GEarthExtensions.prototype.fx.Animation],
function(duration, renderFn, completionFn) {
  this.extInstance = arguments.callee.extInstance_;
  this.duration = duration;
  this.renderFn = renderFn;
  this.completionFn = completionFn; // optional
});

/**
 * Render the frame at the given time after the animation was started.
 * @param {Number} time The time of the frame to render, in seconds.
 */
GEarthExtensions.prototype.fx.TimedAnimation.prototype.renderFrame =
function(t) {
  if (t > this.duration) {
    this.renderFn.call(this, this.duration);
    this.stop();
    return;
  }
  
  this.renderFn.call(this, t);
};
/**
 * Bounce a placemark once.
 */
GEarthExtensions.prototype.fx.bounce = function(placemark, options) {
  this.fx.rewind(placemark);
  
  options = GEarthExtensions.checkParameters(options, false, {
    duration: 250,
    startAltitude: GEarthExtensions.ALLOWED,
    altitude: this.util.getCamera().getAltitude() / 5,
    phase: GEarthExtensions.ALLOWED,
    repeat: 0,
    dampen: 1.0,
    callback: GEarthExtensions.ALLOWED
  });
  
  // double check that we're given a placemark with a point geometry
  if (!'getGeometry' in placemark ||
      !placemark.getGeometry() ||
      placemark.getGeometry().getType() != 'KmlPoint') {
    throw new Error('Placemark must be a KmlPoint geometry');
  }
  
  var point = placemark.getGeometry();
  var origAltitudeMode = point.getAltitudeMode();
  
  // changing altitude if the mode is clamp to ground does nothing, so switch
  // to relative to ground
  if (origAltitudeMode == this.pluginInstance.ALTITUDE_CLAMP_TO_GROUND) {
    point.setAltitude(0);
    point.setAltitudeMode(this.pluginInstance.ALTITUDE_RELATIVE_TO_GROUND);
  }
  
  if (origAltitudeMode == this.pluginInstance.ALTITUDE_CLAMP_TO_SEA_FLOOR) {
    point.setAltitude(0);
    point.setAltitudeMode(this.pluginInstance.ALTITUDE_RELATIVE_TO_SEA_FLOOR);
  }
  
  var startAltitude = point.getAltitude();
  if ('startAltitude' in options) {
    startAltitude = options.startAltitude;
  }
  
  // setup the animation phases
  var phase1, phase2;
  var me = this;
  
  // up
  phase1 = function() {
    me.fx.animateProperty(point, 'altitude', {
      duration: options.duration / 2,
      end: startAltitude + options.altitude,
      easing: 'out',
      callback: phase2
    });
  };
  
  // down and repeats
  phase2 = function() {
    me.fx.animateProperty(point, 'altitude', {
      duration: options.duration / 2,
      end: startAltitude,
      easing: 'in',
      callback: function() {
        point.setAltitudeMode(origAltitudeMode);
        
        // done with this bounce, should we bounce again?
        if (options.repeat >= 1) {
          --options.repeat;
          options.altitude *= options.dampen;
          options.phase = 0; // do all phases
          me.fx.bounce(placemark, options);
        } else if (options.callback) {
          options.callback.call(placemark);
        }
      }
    });
  };
  
  // animate the bounce
  if (options.phase === 1) {
    phase2 = null;
    phase1.call();
  } else if (options.phase === 2) {
    phase2.call();
  } else {
    phase1.call();
  }
};
/**
 * Cancel all animations on a given feature, potentially leaving them in an
 * intermediate visual state.
 */
GEarthExtensions.prototype.fx.cancel = function(feature) {
  // TODO: verify that feature is a KmlFeature
  var animations = this.util.getJsDataValue(feature,
                       '_GEarthExtensions_anim') || [];
  for (var i = 0; i < animations.length; i++) {
    animations[i].stop();
  }
};

/**
 * Cancel all animations on a given feature and revert them to their t = 0
 * state.
 */
GEarthExtensions.prototype.fx.rewind = function(feature) {
  // TODO: verify that feature is a KmlFeature
  var animations = this.util.getJsDataValue(feature,
                       '_GEarthExtensions_anim') || [];
  for (var i = 0; i < animations.length; i++) {
    animations[i].rewind();
  }
};

/**
 * Animate a numeric property on a plugin object.
 * @param {KmlObject} object The plugin object whose property to animate.
 * @param {String} property The property to animate. This should match 1:1 to
 *     the getter/setter methods on the plugin object. For example, to animate
 *     a KmlPoint latitude, pass in `latitude`, since the getter/setters are
 *     `getLatitude` and `setLatitude`.
 * @param {Object} options The property animation options.
 * @param {Number} [options.duration=500] The duration, in milliseconds, of the
 *     animation.
 * @param {Number} [options.start] The value of the property to set at the
 *     start of the animation.
 * @param {Number} [options.end] The desired end value of the property.
 * @param {Number} [options.delta] If end is not specified, you may set this
 *     to the desired change in the property value.
 * @param {String|Function} [options.easing='none'] The easing function to use
 *     during the animation. Valid values are 'none', 'in', 'out', or 'both'.
 *     Alternatively, an easy function mapping `[0.0, 1.0] -> [0.0, 1.0]` can
 *     be specified. No easing is `f(x) = x`.
 */
GEarthExtensions.prototype.fx.animateProperty =
function(obj, property, options) {
  options = GEarthExtensions.checkParameters(options, false, {
    duration: 500,
    start: GEarthExtensions.ALLOWED,
    end: GEarthExtensions.ALLOWED,
    delta: GEarthExtensions.ALLOWED,
    easing: 'none',
    callback: GEarthExtensions.ALLOWED
  });
  
  // http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm
  // TODO: ensure easing function exists
  // get the easing function
  if (typeof options.easing == 'string') {
    options.easing = {
      'none': function(t) {
        return t;
      },
      'in': function(t) { // cubic in
        return t*t*t;
      },
      'out': function(t) { // cubic out
        var ts = t*t;
        var tc = ts*t;
        return tc - 3*ts + 3*t;
      },
      'both': function(t) { // quintic in-out
        var ts = t*t;
        var tc = ts*t;
        return 6*tc*ts - 15*ts*ts + 10*tc;
      }
    }[options.easing];
  }

  var propertyTitleCase = property.charAt(0).toUpperCase() +
                          property.substr(1);

  var me = this;
  
  // TODO: custom support for KmlColor -- gex.util.blendColors
  
  var getter = function() {
    return me.util.callMethod(obj, 'get' + propertyTitleCase);
  };
  
  var setter = function(val) {
    return me.util.callMethod(obj, 'set' + propertyTitleCase, val);
  };
    
  // use EITHER start/end or delta
  if (!isFinite(options.start) && !isFinite(options.end)) {
    // use delta
    if (!isFinite(options.delta)) {
      options.delta = 0.0;
    }
    
    options.start = getter();
    options.end = getter() + options.delta;
  } else {
    // use start/end
    if (!isFinite(options.start)) {
      options.start = getter();
    }

    if (!isFinite(options.end)) {
      options.end = getter();
    }
  }
  
  var anim = new this.fx.TimedAnimation(options.duration,
    function(t) {
      // render callback
      setter(options.start +
             options.easing.call(null, 1.0 * t / options.duration) *
               (options.end - options.start));
    },
    function() {
      // completion callback
      
      // remove this animation from the list of animations on the object
      var animations = me.util.getJsDataValue(obj, '_GEarthExtensions_anim');
      if (animations) {
        for (var i = 0; i < animations.length; i++) {
          if (animations[i] == this) {
            animations.splice(i, 1);
            break;
          }
        }
        
        if (!animations.length) {
          me.util.clearJsDataValue(obj, '_GEarthExtensions_anim');
        }
      }

      if (options.callback) {
        options.callback.call(obj);
      }
    });
  
  // add this animation to the list of animations on the object
  var animations = this.util.getJsDataValue(obj, '_GEarthExtensions_anim');
  if (animations) {
    animations.push(anim);
  } else {
    this.util.setJsDataValue(obj, '_GEarthExtensions_anim', [anim]);
  }
  
  anim.start();
  return anim;
};
/**
 * This class/namespace hybrid contains miscellaneous
 * utility functions and shortcuts for the Earth API.
 * @namespace
 */
GEarthExtensions.prototype.util = {isnamespace_:true};

GEarthExtensions.prototype.util.areScreenOverlayXYSwapped_ = function() {
  return this.pluginInstance.getApiVersion() < '1.003';
};
GEarthExtensions.NAMED_COLORS = {
  'aqua': 'ffffff00',
  'black': 'ff000000',
  'blue': 'ffff0000',
  'fuchsia': 'ffff00ff',
  'gray': 'ff808080',
  'green': 'ff008000',
  'lime': 'ff00ff00',
  'maroon': 'ff000080',
  'navy': 'ff800000',
  'olive': 'ff008080',
  'purple': 'ff800080',
  'red': 'ff0000ff',
  'silver': 'ffc0c0c0',
  'teal': 'ff808000',
  'white': 'ffffffff',
  'yellow': 'ff00ffff'
};

/**
 * Converts between various color formats, i.e. `#rrggbb`, to the KML color
 * format (`aabbggrr`)
 * @param {String|Number[]} color The source color value.
 * @param {Number} [opacity] An optional opacity to go along with CSS/HTML style
 *     colors, from 0.0 to 1.0.
 * @return {String} A string in KML color format (`aabbggrr`), or null if
 *     the color could not be parsed.
 */
GEarthExtensions.prototype.util.parseColor = function(arg, opacity) {
  // detect #rrggbb and convert to kml color aabbggrr
  // TODO: also accept 'rgb(0,0,0)' format using regex, maybe even hsl?
  var pad2_ = function(s) {
    return ((s.length < 2) ? '0' : '') + s;
  };
  
  if (geo.util.isArray(arg)) {
    // expected array as [r,g,b] or [r,g,b,a]

    return pad2_(((arg.length >= 4) ? arg[3].toString(16) : 'ff')) +
           pad2_(arg[2].toString(16)) +
           pad2_(arg[1].toString(16)) +
           pad2_(arg[0].toString());
  } else if (typeof arg == 'string') {
    // parsing a string
    if (arg.toLowerCase() in GEarthExtensions.NAMED_COLORS) {
      return GEarthExtensions.NAMED_COLORS[arg.toLowerCase()];
    } if (arg.length > 7) {
      // large than a possible CSS/HTML-style color, maybe it's already a KML
      // color
      return arg.match(/^[0-9a-f]{8}$/i) ? arg : null;
    } else {
      // assume it's given as an HTML color
      var kmlColor = null;
      if (arg.length > 4) {
        // try full HTML color
        kmlColor = arg.replace(
            /#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i,
            'ff$3$2$1').toLowerCase();
      } else {
        // try shorthand HTML/CSS color (#fff)
        kmlColor = arg.replace(
            /#?([0-9a-f])([0-9a-f])([0-9a-f])/i,
            'ff$3$3$2$2$1$1').toLowerCase();
      }
      
      if (kmlColor == arg) {
        return null; // no replacement done, so can't parse
      }
      
      if (!geo.util.isUndefined(opacity)) {
        kmlColor = pad2_(Math.floor(255 * opacity).toString(16)) +
            kmlColor.substring(2);
      }
      
      return kmlColor;
    }
  }
  
  return null; // couldn't parse, not a string or array
};


/**
 * Calculates a simple composite of the two given colors.
 * @param {String|Number[]} color1 The first ('source') color. Anthing that can
 *     be parsed with GEarthExtensions#util.parseColor.
 * @param {String|Number[]} color2 The second ('destination') color. Anything
 *     that can be parsed with GEarthExtensions#util.parseColor.
 * @param {Number} [fraction=0.5] The amount of color2 to composite onto/blend
 *     with color1, as a fraction from 0.0 to 1.0.
 * @type {String}
 */
GEarthExtensions.prototype.util.blendColors = function(color1, color2,
                                                       fraction) {
  if (geo.util.isUndefined(fraction) || fraction === null) {
    fraction = 0.5;
  }
  
  color1 = this.util.parseColor(color1);
  color2 = this.util.parseColor(color2);

  var pad2_ = function(s) {
    return ((s.length < 2) ? '0' : '') + s;
  };

  var blendHexComponent_ = function(c1, c2) {
    c1 = parseInt(c1, 16);
    c2 = parseInt(c2, 16);

    return pad2_(Math.floor((c2 - c1) * fraction + c1).toString(16));
  };

  return blendHexComponent_(color1.substr(0,2), color2.substr(0,2)) +
         blendHexComponent_(color1.substr(2,2), color2.substr(2,2)) +
         blendHexComponent_(color1.substr(4,2), color2.substr(4,2)) +
         blendHexComponent_(color1.substr(6,2), color2.substr(6,2));
};
// TODO: unit test
(function() {
  // NOTE: this is shared across all GEarthExtensions instances
  // dictionary mapping objects's jstag (uuid) to an object literal
  // { object: <object>, data: <object's js data dictionary> }
  var jsData_ = {};

  /* randomUUID.js - Version 1.0
  *
  * Copyright 2008, Robert Kieffer
  *
  * This software is made available under the terms of the Open Software License
  * v3.0 (available here: http://www.opensource.org/licenses/osl-3.0.php )
  *
  * The latest version of this file can be found at:
  * http://www.broofa.com/Tools/randomUUID.js
  *
  * For more information, or to comment on this, please go to:
  * http://www.broofa.com/blog/?p=151
  */

  /**
  * Create and return a "version 4" RFC-4122 UUID string.
  * @private
  */
  function randomUUID() {
    var s = [], itoh = '0123456789ABCDEF', i = 0;

    // Make array of random hex digits. The UUID only has 32 digits in it, but we
    // allocate an extra items to make room for the '-'s we'll be inserting.
    for (i = 0; i < 36; i++) {
      s[i] = Math.floor(Math.random()*0x10);
    }

    // Conform to RFC-4122, section 4.4
    s[14] = 4;  // Set 4 high bits of time_high field to version
    s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence

    // Convert to hex chars
    for (i = 0; i < 36; i++) {
      s[i] = itoh.charAt(s[i]);
    }

    // Insert '-'s
    s[8] = s[13] = s[18] = s[23] = '-';

    return s.join('');
  }

  /** @private */
  function getJsTag_(object) {
    // TODO: use unique id from Earth API
    for (var tag in jsData_) {
      if (jsData_[tag].object.equals(object)) {
        return tag;
      }
    }

    return null;
  }

  /**
   * Returns whether or not the KmlObject has any JS-side data.
   * @param {KmlObject} object The plugin object to inquire about.
   * @public
   */
  GEarthExtensions.prototype.util.hasJsData = function(object) {
    return getJsTag_(object) ? true : false;
  };

  /**
   * Clears all JS-side data for the given KmlObject.
   * @param {KmlObject} object The plugin object to clear data on.
   */
  GEarthExtensions.prototype.util.clearAllJsData = function(object) {
    var jsTag = getJsTag_(object);
    if (jsTag) {
      delete jsData_[jsTag];
    }
  };

  /**
   * Gets the JS-side data for the given KmlObject associated with the given
   * key.
   * @param {KmlObject} object The plugin object to get data for.
   * @param {String} key The JS data key to request.
   * @public
   */
  GEarthExtensions.prototype.util.getJsDataValue = function(object, key) {
    var jsTag = getJsTag_(object);
    if (jsTag && key in jsData_[jsTag].data) {
      return jsData_[jsTag].data[key];
    }

    // TODO: null or undefined?
    return undefined;
  };

  /**
   * Sets the JS-side data for the given KmlObject associated with the given
   * key to the passed in value.
   * @param {KmlObject} object The object to get data for.
   * @param {String} key The JS data key to set.
   * @param {*} value The value to store for this key.
   * @public
   */
  GEarthExtensions.prototype.util.setJsDataValue =
  function(object, key, value) {
    var jsTag = getJsTag_(object);
    if (!jsTag) {
      // no current data dictionary, create a jstag for this object
      jsTag = null;
      while (!jsTag || jsTag in jsData_) {
        jsTag = randomUUID();
      }

      // create an empty data dict
      jsData_[jsTag] = { object: object, data: {} };
    }

    // set the data
    jsData_[jsTag].data[key] = value;
  };

  /**
   * Clears the JS-side data for the given KmlObject associated with the given
   * key.
   * @param {KmlObject} object The plugin object to clear data on.
   * @param {String} key The JS data key whose value should be cleared.
   */
  GEarthExtensions.prototype.util.clearJsDataValue = function(object, key) {
    var jsTag = getJsTag_(object);
    if (jsTag &&
        key in jsData_[jsTag].data) {
      delete jsData_[jsTag].data[key];

      // check if the data dict is empty... if so, cleanly remove it
      for (var k in jsData_[jsTag].data) {
        return; // not empty
      }

      // data dict is empty
      this.util.clearAllJsData(object);
    }
  };

}());
(function() {
  /**
   * Serializes the current plugin viewport into a modified base64 alphabet
   * string. This method is platform and browser agnostic, and is safe to
   * store and distribute to others.
   * @return {String} A string representing the current viewport.
   * @see http://code.google.com/apis/maps/documentation/include/polyline.js
   *     for inspiration.
   */
  GEarthExtensions.prototype.util.serializeView = function() {
    var camera = this.pluginInstance.getView().copyAsCamera(
        this.pluginInstance.ALTITUDE_ABSOLUTE);
    return this.util.encodeCamera_({
      lat: camera.getLatitude(),
      lng: camera.getLongitude(),
      altitude: camera.getAltitude(),
      heading: camera.getHeading(),
      tilt: camera.getTilt(),
      roll: camera.getRoll() });
  };

  /**
   * Sets the current plugin viewport to the view represented by the given
   * string.
   * @param {String} viewString The modified base64 alphabet string representing
   *     the view to fly to. This string should've previously been calculated
   *     using GEarthExtensions#util.serializeView.
   */
  GEarthExtensions.prototype.util.deserializeView = function(s) {
    var cameraProps = this.util.decodeCamera_(s);
    var camera = this.pluginInstance.createCamera('');
    
    // TODO: isFinite checks
    camera.set(cameraProps.lat, cameraProps.lng, cameraProps.altitude,
        this.pluginInstance.ALTITUDE_ABSOLUTE, cameraProps.heading,
        cameraProps.tilt, cameraProps.roll);
    this.pluginInstance.getView().setAbstractView(camera);
  };
  
  // helper functions, most of which are from
  // http://code.google.com/apis/maps/documentation/include/polyline.js

  GEarthExtensions.prototype.util.encodeCamera_ = function(cam) {
    var encOverflow = 1073741824;
    var alt = Math.floor(cam.altitude * 1e5);
    return encodeArray_([
      Math.floor(fit180_(cam.lat) * 1e5),
      Math.floor(fit180_(cam.lng) * 1e5),
      Math.floor(alt / encOverflow),
      (alt >= 0) ? alt % encOverflow :
                   (encOverflow - Math.abs(alt) % encOverflow),
      Math.floor(fit360_(cam.heading) * 1e5),
      Math.floor(fit360_(cam.tilt) * 1e5),
      Math.floor(fit360_(cam.roll) * 1e5)
    ]);
  };

  GEarthExtensions.prototype.util.decodeCamera_ = function(s) {
    var encOverflow = 1073741824;
    var arr = decodeArray_(s);
    return {
      lat: arr[0] * 1e-5,
      lng: arr[1] * 1e-5,
      altitude: (encOverflow * arr[2] + arr[3]) * 1e-5,
      heading: arr[4] * 1e-5,
      tilt: arr[5] * 1e-5,
      roll: arr[6] * 1e-5
    };
  };
  
  // modified base64 for url
  // http://en.wikipedia.org/wiki/Base64
  var ALPHABET_ =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  
  function encodeArray_(a) {
    var s = '';
    for (var i = 0; i < a.length; i++) {
      s += encodeSignedNumber_(a[i]);
    }

    return s;
  }

  function fit360_(a) {
    while (a < 0) {
      a += 360;
    }

    return a % 360;
  }

  function fit180_(a) {
    a = fit360_(a);
    return (a > 180) ? a - 360 : a;
  }
  
  // Encode a signed number in the encode format.
  function encodeSignedNumber_(num) {
    var sgn_num = num << 1;

    if (num < 0) {
      sgn_num = ~(sgn_num);
    }

    var encodeString = "";

    while (sgn_num >= 0x20) {
      encodeString += ALPHABET_.charAt(0x20 | (sgn_num & 0x1f));
      sgn_num >>= 5;
    }

    encodeString += ALPHABET_.charAt(sgn_num);
    return encodeString;
  }
  
  function decodeArray_(encoded) {
    var len = encoded.length;
    var index = 0;
    var array = [];

    while (index < len) {
      var b;
      var shift = 0;
      var result = 0;
      do {
        b = ALPHABET_.indexOf(encoded.charAt(index++));
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      array.push(((result & 1) ? ~(result >> 1) : (result >> 1)));
    }

    return array;
  }

}());
/**
 * Creates a KmlLookAt and sets it as the Earth plugin's view. This function
 * takes the same parameters as GEarthExtensions#dom.buildLookAt.
 */
GEarthExtensions.prototype.util.lookAt = function() {
  //this.pluginInstance.getView().setAbstractView(this.dom.LookAt(...));
  this.pluginInstance.getView().setAbstractView(
      this.dom.buildLookAt.apply(null, arguments));
};

/**
 * Gets the current view as a KmlLookAt.
 * @param {Number} [altitudeMode=ALTITUDE_ABSOLUTE] The altitude mode
 *     that the resulting LookAt should be in.
 * @type KmlLookAt
 * @return Returns the current view as a KmlLookAt.
 */
GEarthExtensions.prototype.util.getLookAt = function(altitudeMode) {
  if (geo.util.isUndefined(altitudeMode)) {
    altitudeMode = this.pluginInstance.ALTITUDE_ABSOLUTE;
  }
  
  return this.pluginInstance.getView().copyAsLookAt(altitudeMode);
};

/**
 * Gets the current view as a KmlCamera.
 * @param {Number} [altitudeMode=ALTITUDE_ABSOLUTE] The altitude mode
 *     that the resulting camera should be in.
 * @type KmlCamera
 * @return Returns the current view as a KmlCamera.
 */
GEarthExtensions.prototype.util.getCamera = function(altitudeMode) {
  if (geo.util.isUndefined(altitudeMode)) {
    altitudeMode = this.pluginInstance.ALTITUDE_ABSOLUTE;
  }
  
  return this.pluginInstance.getView().copyAsCamera(altitudeMode);
};

/**
 * Simply loads and shows the given KML URL in the Google Earth Plugin instance.
 * @param {String} url The URL of the KML content to show.
 * @param {Object} [options] KML display options.
 * @param {Boolean} [options.cacheBuster] Enforce freshly downloading the KML
 *     by introducing a cache-busting query parameter.
 */
GEarthExtensions.prototype.util.displayKml = function(url, options) {
  options = options || {};
  if (options.cacheBuster) {
    url += (url.match(/\?/) ? '&' : '?') + '_cacheBuster=' +
        Number(new Date()).toString();
  }

  // TODO: option to choose network link or fetchKml
  
  google.earth.fetchKml(this.pluginInstance, url, function(kmlObject) {
    if (kmlObject) {
      this.pluginInstance.getFeatures().appendChild(kmlObject);
    }
  });
};

/**
 * Simply loads and shows the given KML string in the Google Earth Plugin
 * instance.
 * @param {String} str The KML blob string to show.
 * @param {Object} [options] KML display options. There are currently no
 *     options.
 */
GEarthExtensions.prototype.util.displayKmlString = function(str, options) {
  var kmlObject = this.pluginInstance.parseKml(str);
  this.pluginInstance.getFeatures().appendChild(kmlObject);
};

/**
 * Executes the given function quickly using a Google Earth API callback
 * hack. Future versions of this method may use other methods for batch
 * execution.
 * @param {Function} batchFn The function containing batch code to execute.
 * @param {Object} [context] Optional context parameter to pass to the
 *     function.
 */
GEarthExtensions.prototype.util.batchExecute = function(batchFn, context) {
  // TODO: find a cleaner method besides fetchKml
  var me = this;
  google.earth.fetchKml(this.pluginInstance, '', function() {
    batchFn.call(me, context);
  });
};

/**
 * Calls method on object with optional arguments. Arguments to pass to the
 * method should be given in order after the 'method' argument.
 * @param {Object} object The object to call the method on.
 * @param {String} method The method to call.
 */
GEarthExtensions.prototype.util.callMethod = function(object, method) {
  var i;

  // strip out 'object' and 'method' arguments
  var args = [];
  for (i = 2; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  if (typeof object[method] == 'function') {
    // most browsers, most object/method pairs
    return object[method].apply(object, args);
  } else {
    // In the Earth API in Internet Explorer, typeof returns 'unknown'
    var reprArgs = [];
    for (i = 0; i < args.length; i++) {
      reprArgs.push('args[' + i + ']');
    }

    return eval('object.' + method + '(' + reprArgs.join(',') + ')');
  }
};

/**
 * Enables or disables full camera ownership mode, which sets fly to speed
 * to teleport, disables user mouse interaction, and hides the navigation
 * controls.
 * @param {Boolean} enable Whether to enable or disable full camera ownership.
 */
GEarthExtensions.prototype.util.takeOverCamera = function(enable) {
  if (enable || geo.util.isUndefined(enable)) {
    if (this.cameraControlOldProps_) {
      return;
    }
    
    this.cameraControlOldProps_ = {
      flyToSpeed: this.pluginInstance.getOptions().getFlyToSpeed(),
      mouseNavEnabled:
          this.pluginInstance.getOptions().getMouseNavigationEnabled(),
      navControlVis: this.pluginInstance.getNavigationControl().getVisibility()
    };
    
    this.pluginInstance.getOptions().setFlyToSpeed(
        this.pluginInstance.SPEED_TELEPORT);
    this.pluginInstance.getOptions().setMouseNavigationEnabled(false);
    this.pluginInstance.getNavigationControl().setVisibility(
        this.pluginInstance.VISIBILITY_HIDE);
  } else {
    if (!this.cameraControlOldProps_) {
      return;
    }
    
    this.pluginInstance.getOptions().setFlyToSpeed(
        this.cameraControlOldProps_.flyToSpeed);
    this.pluginInstance.getOptions().setMouseNavigationEnabled(
        this.cameraControlOldProps_.mouseNavEnabled);
    this.pluginInstance.getNavigationControl().setVisibility(
        this.cameraControlOldProps_.navControlVis);
    
    delete this.cameraControlOldProps_;
  }
};
