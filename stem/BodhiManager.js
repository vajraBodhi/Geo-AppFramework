define(["jquery", 'stem/utils'], function($, utils) {
  var instance = null;
  var clazz = function(params) {
    this.map = params.map;
    this.appCausality = params.appCausality;

    this.widgetsRepo = [];
  };

  clazz.prototype.loadBodhi = function(config) {
    var defs = [];
    var def = $.Deferred();
    var that = this;

    var parts = config.uri.split('/');
    parts.pop();
    var bodhiFolder = window.PATH + parts.join('/');

    defs.push(this.loadBodhiClass(config.uri));
    defs.push(this.loadBodhiManifest(bodhiFolder));

    $.when.apply($, defs).then(function() {
      var clazz = arguments[0];
      var manifest = arguments[1];

      that.loadResources(bodhiFolder, manifest).then(function(resources) {
        var setting = {
          nls: resources.nls,
          causality: resources.causality,
          templateString: resources.templateString,
          map: that.map,
          appCausality: that.appCausality
        };

        try{
          var bodhi = clazz.init(config.dom, setting);
          that.widgetsRepo.push(bodhi);
          def.resolve(bodhi);
        }catch(err) {
          console.error(err);
          def.resolve(null);
        }
      });
    }, function(err) {
      console.error(err, config.uri);
      def.resolve(null);
    });

    return def;
  };

  clazz.prototype.loadBodhiClass = function(bodhiUri) {
    var def = $.Deferred();
    require([bodhiUri], function(bodhiClass) {
      def.resolve(bodhiClass);
    });

    return def;
  };

  clazz.prototype.loadBodhiManifest = function(bodhiFolder) {
    var def = $.Deferred();

    return $.getJSON(bodhiFolder + '/manifest.json');
  };

  clazz.prototype.loadResources = function(bodhiFolder, manifest) {
    var defs = [];
    var that = this;

    defs.push(this.loadBodhiTemplate(bodhiFolder, manifest.hasUIFile));
    defs.push(this.loadBodhiNls(bodhiFolder, manifest.hasUIFile));
    defs.push(this.loadBodhiCausality(bodhiFolder, manifest.hasCausality));
    defs.push(this.loadBodhiStyle(bodhiFolder));

    return $.when.apply($, defs).then(function() {
      return {
        templateString: arguments[0],
        nls: arguments[1],
        causality: arguments[2]
      };
    });
  };

  clazz.prototype.loadBodhiTemplate = function(bodhiFolder, hasUIFile) {
    var def = $.Deferred();
    if (hasUIFile) {
      require(['text!' + bodhiFolder + 'templates/template.html'], function(template) {
        def.resolve(template);
      });
    } else {
      def.resolve(null);
    }

    return def;
  };

  clazz.prototype.loadBodhiNls = function(bodhiFolder, hasUIFile) {
    var def = $.Deferred();
    if (hasUIFile) {
      require(['is8n!' + bodhiFolder + 'nls/strings'], function(nls) {
        def.resolve(nls);
      });
    } else {
      def.resolve(null);
    }

    return def;
  };

  clazz.prototype.loadBodhiCausality = function(bodhiFolder, hasCausality) {
    var def = $.Deferred();
    if (hasCausality) {
      var url = bodhiFolder + '/causality.json';
      $.getJSON(url).then(function(causality) {
        def.resolve(causality);
      });
    } else {
      def.resolve(null);
    }

    return def;
  };

  clazz.prototype.loadBodhiStyle = function(bodhiFolder) {
    var def = $.Deferred();
    var url = bodhiFolder + '/css/style.css';
    utils.loadStylesheet(url);
    def.resolve()

    return def;
  };

  clazz.getInstance = function(params) {
    if (instance !== null) {
      instance = new clazz(params);
    }

    return instance;
  }

  return clazz;
});