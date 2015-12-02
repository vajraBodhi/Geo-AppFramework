define(["./utils"], function(utils) {
  var instance = null;
  var clazz = function() {

  };
  clazz.prototype.loadCausality = function() {
    return utils.loadCausality();
  }

  clazz.getInstance = function() {
    if (instance === null) {
      instance = new clazz();
    }

    return instance;
  };

  return clazz;
});