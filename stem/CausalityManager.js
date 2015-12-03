define(["jquery", "./utils"], function($, utils) {
  var instance = null;
  var clazz = function() {

  };
  clazz.prototype.loadCausality = function() {
      $(document).trigger('causalityLoaded', causality);
    return utils.loadCausality().then(function(causality) {
      return causality;
    });
  }

  clazz.getInstance = function() {
    if (instance === null) {
      instance = new clazz();
    }

    return instance;
  };

  return clazz;
});