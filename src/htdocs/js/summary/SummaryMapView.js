/* global L */
'use strict';


var Terrain = require('leaflet/layer/Terrain'),
    Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS;

_DEFAULTS = {};


/**
 * Creates map of fires for the summary view.
 *
 */
var SummaryMapView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  /**
   * Constructor for this view.
   *
   * @param options {Object}
   *     Configuration options for this view.
   */
  _initialize = function (options) {
    _this.el.classList.add('summary-map-view');
    _this.data = options.data || {};

    _this.map = L.map(_this.el, {
      center: [41.5, -112.0],
      maxBounds: [
        [-90, -Infinity],
        [90, Infinity]
      ],
      zoom: 5,
      zoomAnimation: false
    });

    Terrain().addTo(_this.map);

    // Add Map Controls
    if (!Util.isMobile()) {
      _this.map.addControl(L.control.scale({position: 'bottomleft'}));
    }

  };

  /**
   * Destroy all the things.
   *
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.render = function () {

  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = SummaryMapView;
