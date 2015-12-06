define(["stem/CausalityManager", "stem/LayoutManager"],
  function(CausalityManager, LayoutManager) {
    var exports = {};
    exports.init = function() {
      var layoutManager = LayoutManager.getInstance();
      var causalityManager = CausalityManager.getInstance();
      causalityManager.loadCausality();
    };

    return exports;
});