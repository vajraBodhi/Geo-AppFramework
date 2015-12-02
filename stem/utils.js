define(["jquery", "exports"], function($, exports) {
  exports.loadCausality = function() {
    return $.getJSON({
      url: window.PATH + 'causality.json'
    });
  }
});