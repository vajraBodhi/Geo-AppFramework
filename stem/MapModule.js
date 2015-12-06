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
          }),
          new ol.layer.Tile({
            source: new ol.source.TileDebug({
              projection: 'EPSG:3857',
              tileGrid: osmSource.getTileGrid()
            })
          })
        ],
        target: mapDiv,
        controls: ol.control.defaults({
          attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
          })
        }),
        view: new ol.View({
          center: ol.proj.transform(
              [-0.1275, 51.507222], 'EPSG:4326', 'EPSG:3857'),
          zoom: 10
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