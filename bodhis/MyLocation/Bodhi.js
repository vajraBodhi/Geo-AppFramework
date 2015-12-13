///////////////////////////////////////////////////////////////////////////
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define(['jquery', 'openlayers/ol', 'stem/BaseBodhi', 'jquery-ui'],
  function($, ol) {
    $.widget('bodhi.MyLocation', {
      baseClass: 'stem-bodhi-mylocation',
      handleKeys: [],

      postMixInProperties: function() {
        this.handleKeys = [];
      },

      postCreate: function() {
        this.placeholder = $('<div class="placeholder"></div>');
        this.placeholder.appendTo(this.element)
        .attr('title', this.options.nls.title);
        var that = this;

        this.placeholder.on('click', function() {
          if (that.geolocator) {
            that.placeholder.removeClass('locating');
            that.placeholder.removeClass('tracking');
            that.placeholder.removeClass('onLocate');
            that._destroyGeoLocate();
          } else {
            that.placeholder.addClass('locating');
            that._createGeoLocate();
          }
        })
      },

      _destroyGeoLocate: function() {
        this.geolocator.setTracking(false);
        for (var i = 0, len = this.handleKeys.length; i < len; i++) {
          this.geolocator.unByKey(this.handleKeys[i]);
        }
        this.handleKeys = [];

        this.featuresOverlay.setMap(null);
        this.positionFeature = null;
        this.geolocator = null;
      },

      _createGeoLocate: function() {
        var view = this.options.map.getView();
        var causality = this.options.causality;
        this.geolocator = new ol.Geolocation({
          projection: view.getProjection(),
          tracking: true, //causality.useTracking,
          trackingOptions: {
            maximumAge: causality.maximumAge,
            enableHighAccuracy: causality.enableHighAccuracy,
            timeout: causality.timeout
          }
        });
        var that = this;

        var markerSrc = this.options.folderUrl + '/css/images/' +
          (this.geolocator.getTracking() ? 'heading.png' : 'marker.png');

        this.positionFeature = new ol.Feature();
        this.positionFeature.setStyle(new ol.style.Style({
          image: new ol.style.Icon(({
            src: markerSrc
          }))
        }));
        this.featuresOverlay = new ol.layer.Vector({
          map: this.options.map,
          source: new ol.source.Vector({
            features: [this.positionFeature]
          })
        });

        this.handleKeys.push(
          this.geolocator.on('change', this.onPositionChange.bind(this))
        );

        this.handleKeys.push(
          this.geolocator.on('change:heading', this.onHeadingChange.bind(this))
        );

        this.handleKeys.push(
          this.geolocator.on('error', this.onLocateError.bind(this))
        );
      },

      onPositionChange: function() {
        this.placeholder.removeClass('locating').addClass('tracking onLocate');
        var position = this.geolocator.getPosition();
        this.positionFeature.setGeometry(position ? new ol.geom.Point(position) : null);
      },

      onHeadingChange: function() {
        this.placeholder.removeClass('locating').addClass('tracking onLocate');
        console.log(this.geolocator.getHeading());
        this.positionFeature.getStyle().getImage().setRotation(this.geolocator.getHeading());
      },

      onLocateError: function() {
        console.error(this.options.nls.failureFinding);
      },

      _destroy: function() {
        this._destroyGeoLocate();
        this._supperApply(arguments);
      }
    });
    return $.bodhi.MyLocation;
  });