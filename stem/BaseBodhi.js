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

define(['jquery', 'jquery-ui'], function($) {
  $.extend($.Widget.prototype, {
    options: {
      bodhiId: "",
      label: "",
      icon: "",
      position: null,
      config: null,
      appConfig: null,
      map: null,
      templateString: null,
      nls: null,
      desabled: true
    },
    baseClass: null,

    _create: function() {
      debugger;
      this.element.addClass(this.baseClass);
      this.postMixInProperties();
      this.element.addClass(this.baseClass).append($(this.options.templateString));
      this.postCreate();

      if (this.options.position && this.options.position.relativeTo === 'map') {
        this.element.appendTo($(this.options.map.getViewport()));
      } else {
        this.element.appendTo('#' + stemConfig.layoutId);
      }
    },
    postMixInProperties: function() {
      // process self properties
    },
    startup: function() {

    },
    postCreate: function() {

    },
    setPosition: function(position, container) {
      this._setOption('position', position);
      if (position.relativeTo === 'map') {
        this.element.appendTo($(this.options.map.getViewport()));
      } else {
        this.element.appendTo('#' + stemConfig.layoutId);
      }

      this.element.css(position);
    },
    _destroy: function() {
      $.empty(this.element);
    }
  });
});