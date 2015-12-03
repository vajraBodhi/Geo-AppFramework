define(["jquery", "MapManager"], function($, MapManager) {
  var instance = null;

  var clazz = function() {
    this.mapManager = MapManager.getInstance();
    $(document).on('causalityLoaded', this.onCausalityLoaded.bind(this));
    $(document).on('mapLoaded', this.onMapLoaded.bind(this));
  };

  clazz.prototype.onCausalityLoaded = function(causality) {
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
});