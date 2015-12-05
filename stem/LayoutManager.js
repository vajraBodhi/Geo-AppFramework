define(["jquery", "stem/MapManager", "stem/WidgetManager"],
  function($, MapManager, widgetManager) {
  var instance = null;

  var clazz = function() {
    this.mapManager = MapManager.getInstance();
    this.widgetManager = WidgetManager.getInstance();
    utils.subscribe('causalityLoaded', this.onCausalityLoaded.bind(this));
    utils.subscribe('mapLoaded', this.onMapLoaded.bind(this));
  };

  clazz.prototype.onCausalityLoaded = function(causality) {
    this.rawCausality = causality;
    this._loadSeasonStyles(causality.season);
    this.mapManager.loadMap(causality.map.domId);
  };

  clazz.prototype.onMapLoaded = function() {
    this.loadOnTouchBodhis();
  };

  clazz.prototype._loadSeasonStyles = function(season) {
    this._loadSeasonCommonStyle(season.name);
    this._loadSeasonSpecificStyle(season.name, season.style);
  };

  clazz.prototype._loadSeasonCommonStyle = function(name) {
    var url = window.PATH + "/seaons/" + name + "/style.css";
    utils.addStylesheet(url);
    $('body').addClass(name);
  };

  clazz.prototype._loadSeasonSpecificStyle = function(name, styleName) {
    var url = window.PATH + "/seaons/" + name + "/styles/" + styleName + ".css";
    utils.addStylesheet(url);
    $('body').addClass(name);
  };

  clazz.prototype.loadOnTouchBodhis = function() {
    var onTouchBodhis = this.rawCausality &&
      this.rawCausality.bodhiOnTouch && this.rawCausality.bodhiOnTouch.bodhis;
    if (onTouchBodhis && onTouchBodhis.length > 0) {
      var defs = [];
      for (var i = 0, len = onTouchBodhis.length; i < len; i++) {
        var b = onTouchBodhis[i];
        defs.push(this.widgetManager.loadWidget(b));
      }
      var that = this;
      $.when.apply($, defs).then(function(widgetResources) {
        // var ds = [];
        for (var j = 0, len = widgetResources.length; j < len; j++) {
          /*ds.push(*/that.widgetManager.createWidget(widgetResources[j]);//);
        }

        utils.publish('onTouchBodhisLoaded');

        // return $.Deferred(ds);// .promise?
      });
    }
  };
});