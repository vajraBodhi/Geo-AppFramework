define(["jquery"], function($) {
  var instance = null;
  var clazz = function() {

  };

  clazz.getInstance = function(params) {
    if (instance !== null) {
      instance = new clazz(params);
    }

    return instance;
  }

  return clazz;
});