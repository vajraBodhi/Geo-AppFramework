define(["jquery", "exports"], function($, exports) {
  exports.loadCausality = function() {
    return $.getJSON({
      url: window.PATH + 'causality.json'
    });
  };

  exports.loadStylesheet = function(url) {
    var link = document.createElement('link');
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    $('head').append(link);
  }
});