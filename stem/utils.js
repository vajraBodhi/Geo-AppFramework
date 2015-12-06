define(["jquery"], function($) {
  var exports = {};
  exports.loadCausality = function() {
    return $.getJSON(window.PATH + 'causality.json', {
      url: window.PATH + 'causality.json'
    });
  };

  exports.loadStylesheet = function(url) {
    var link = document.createElement('link');
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    $('head').append(link);
  };

  // pub/sub
  exports.publish = function(eventName, params) {
    // $(document).trigger.apply($, arguments);
    $(document).trigger(eventName, params);
  };
  exports.subscribe = function(eventName, cb, scope) {
    $(document).on(eventName, function() {
      var params = Array.prototype.slice.call(arguments, 1);
      cb.apply(scope, params);
    });
  };

  return exports;
});