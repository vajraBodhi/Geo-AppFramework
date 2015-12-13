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
  $.widget('bodhi.HomeButton', {
    baseClass: 'stem-bodhis-HomeButton',
    postCreate: function() {
      var config = this.options.causality;
      var map = this.options.map;
      var extent = config && config.extent;
      var zt = null;
      map.getControls().forEach(function(c) {
        if (c instanceof ol.control.ZoomToExtent) {
          zt = c;
        }
      });
      map.removeControl(zt);
      zt = new ol.control.ZoomToExtent({
        extent: extent
      });
      map.addControl(zt);
      this.element = $(zt.element);
    }
  });


  return $.bodhi.HomeButton;
});