/* global L */
'use strict';

var HazDevLayers = require('leaflet/control/HazDevLayers'),
    Util = require('util/Util');


var _DEFAULTS = {
  icon: L.icon({
    iconUrl: 'images/flame.png',
    iconRetinaUrl: 'my-icon@2x.png',
    iconSize: [15, 20],
    iconAnchor: [10, 18],
    popupAnchor: [-3, -16]
  })
};

/**
 * A leaflet layer that displays fires (grouped by year) with a layer control
 * that allows the user to select which year to display.
 *
 * @param options {Object}
 *        - options.data {Object} arrays of fire features keyed by year
 *        - (optional) optionsicon {L.icon} a marker icon
 */
var SummaryFireLayer = function (options) {
  var _this,
      _initialize;


  _this = {};

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _this.data = options.data || {};
    _this.icon = options.icon;
    _this.map = null;
  };

  /**
   * Add fire markers to the map for all fires in _this.data
   *
   * @return {DOMElement}
   *     marker element, positioned and styled.
   */
  _this.addMarkers = function () {
    var data,
        fire,
        fires,
        layer,
        layers,
        marker,
        markers,
        year,
        years;

    fires = {};
    years = Object.keys(_this.data);
    years = years.sort(function (a,b) { return b-a; });
    layers = HazDevLayers();
    layers.addTo(_this.map);

    // Loop through each year in the fires object
    for (var x = 0; x < years.length; x++) {
      year = years[x];
      data = _this.data[year];
      markers = [];

      // loop through all fires for each year, and create markers
      for (var i = 0; i < data.length; i++) {
        fire = data[i];

        marker = L.marker([
          fire.attributes.lat,
          fire.attributes.lon,
        ], {
          title: fire.attributes.fire,
          icon: _this.icon
        });
        marker.bindPopup(
            '<a href="detail.php?id=' + fire.attributes.objectid + '">' +
              '<h3>' + fire.attributes.fire + '</h3>' +
            '</a>');
        markers.push(marker);
      }

      // create a separate layer for each year
      layer = L.layerGroup(markers);
      layers.addBaseLayer(layer, year);

      // show data from most recent year by default
      if (x === 0) {
        layer.addTo(_this.map);
      }
    }

    return fires;
  };

  /**
   * Leaflet ILayer API method.
   *
   * Called when layer is added to map.
   */
  _this.onAdd = function (map) {
    _this.map = map;
    _this.addMarkers();
  };

  /**
   * Leaflet ILayer API method.
   *
   * Called when layer is removed from map.
   */
  _this.onRemove = function () {
    _this.map = null;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = SummaryFireLayer;