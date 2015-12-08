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

define(['jquery'], function($) {
  var original = function() {
    this.options = {
      bodhiId: "",
      label: "",
      icon: "",
      position: null,
      config: null,
      appConfig: null,
      map: null,
      templateString: null,
      nls: null
    };
    this.baseClass = null;
  };

  original.prototype._create = function() {
    this.postMixInProperties();
    this.postCreate();
  };

  original.prototype.postMixInProperties = function() {
    // process self properties
  };

  original.prototype.startup = function() {
    if (this.options.position.relativeTo === 'map') {
      this.element.appendTo('#' + this.options.appConfig.map.domId);
    } else {
      this.element.appendTo('#' + stemConfig.layoutId);
    }
  };

  original.prototype.postCreate = function() {
    this.element.addClass(this.baseClass).append($(this.options.templateString));
  };

  original.prototype.setPosition = function(position, container) {
    this._setOption('position', position);
    if (container) {
      this.element.appendTo(container);
    }

    this.element.css(position);
  };

  original.prototype._destroy = function() {
    $.empty(this.element);
  };

  return original;
});