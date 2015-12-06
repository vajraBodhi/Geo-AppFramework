define(["jquery", "stem/MapManager", "stem/BodhiManager", "stem/utils"],
  function($, MapManager, BodhiManager, utils) {
  var instance = null;

  var clazz = function() {
    utils.subscribe('causalityLoaded', this.onCausalityLoaded, this);
    utils.subscribe('mapLoaded', this.onMapLoaded, this);
  };

  clazz.prototype.onCausalityLoaded = function(causality) {
    this.appCausality = causality;
    this._loadSeasonStyles(causality.season);

    this.mapManager = MapManager.getInstance({
      'appCausality': this.appCausality
    });
    this.mapManager.loadMap(causality.map);
  };

  clazz.prototype.onMapLoaded = function(map) {
    this.map = map;
    this.widgetManager = BodhiManager.getInstance({
      'map': this.map,
      'appCausality': this.appCausality
    });
    this.loadOnTouchBodhis();
  };

  clazz.prototype._loadSeasonStyles = function(season) {
    this._loadSeasonCommonStyle(season.name);
    this._loadSeasonSpecificStyle(season.name, season.style);
  };

  clazz.prototype._loadSeasonCommonStyle = function(name) {
    var url = window.PATH + "/seaons/" + name + "/default.css";
    utils.loadStylesheet(url);
    $('body').addClass(name);
  };

  clazz.prototype._loadSeasonSpecificStyle = function(name, styleName) {
    var url = window.PATH + "/seaons/" + name + "/styles/" + styleName + ".css";
    utils.loadStylesheet(url);
    $('body').addClass(name);
  };

  clazz.prototype.loadOnTouchBodhis = function() {
    var onTouchBodhis = this.rawCausality &&
      this.rawCausality.bodhiOnTouch && this.rawCausality.bodhiOnTouch.bodhis;
    if (onTouchBodhis && onTouchBodhis.length > 0) {
      var defs = [];
      for (var i = 0, len = onTouchBodhis.length; i < len; i++) {
        var b = onTouchBodhis[i];
        defs.push(this.widgetManager.loadBodhi(b));
      }
      var that = this;
      $.when.apply($, defs).then(function(widgets) {
        // var ds = [];
        // for (var j = 0, len = widgetResources.length; j < len; j++) {
        //   ds.push(that.widgetManager.createWidget(widgetResources[j]);//);
        // }

        utils.publish('onTouchBodhisLoaded');

        // return $.Deferred(ds);// .promise?
      });
    }
  };

  clazz.getInstance = function() {
    if (instance === null) {
      instance = new clazz();
    }

    return instance;
  };

  return clazz;
});