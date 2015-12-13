define(['openlayers/ol', 'jquery'], function(ol, $) {
  var exports = {};
  exports.getMap = function(mapDiv) {
    var def = $.Deferred();
    try{
      var osmSource = new ol.source.OSM();
      var map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: osmSource
          })
        ],
        target: mapDiv,
        controls: ol.control.defaults({
          attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
          })
        }),
        view: new ol.View({
          center: [0, 0],
          zoom: 2
        })
      });
      def.resolve(map);
    }catch(err) {
      def.reject(err);
    }


    return def;
  };

  return exports;
});