//This file describes the format of the causality.json.

{
  //Required
  "season": {
    "name": "FoldableSeason",

    //This property stores all of the season's styles. The app displays the first style by default.
    "styles": [],

    //Optional. It is the season version.
    "version": "1.1"
  },

  //Optional. If not set, do not use proxy.
  "httpProxy": {
    //Optional. Default to true. If false all requests will not use proxy.
    //If true, if the request match proxy rule, use proxy;
    //         if the request doesn't match proxy rule but need proxy(cross domain, i.e.), use proxy url;
    //         if the request neither match proxy rule nor the request doesn't need proxy, framework will check "alwaysUseProxy";
    //            if alwaysUseProxy=true, the request uses proxy url, or the request doesn't use proxy.
    "useProxy": true,

    //Optional. Default to false. If true, all requests use proxy.
    "alwaysUseProxy": false,

    //Optional. If not empty, the url will be set to esriConfig.defaults.io.proxyUrl property.
    "url": ""
  },

  //Optional. The logo/title/subtitle of app. Default value is default logo/"HTML5 app"/"A configurable web application".
  "logo": "",
  "title": "ArcGIS Web Application",
  "subtitle": "A configurable web application",

  //Optional. App can contain some links.
  "links":[
    {
      "url": "http://www.arcgis.com",
      "label": "ArcGIS Online"
    }
  ],

  "bodhiOnTouch": {
    //bodhis(not in group) are opened in this panel.
    "panel": {
      "uri": "jimu/PanelType1"
    },

    "bodhis": [{
      //Required. It is bodhi main class.
      "uri": "bodhis/Header/Bodhi",

      //Optional. If not set, use the icon in bodhi folder.
      "icon": "",

      //optional. If not set, use bodhi name.
      "label": "",

      //Optional. If not set, default value is left=0, top=0.
      //If panel is set, this means panel's position or bodhi position.
      //If bodhi is closeable, this means bodhi icon's position or bodhi position.
      //The framework uses 6 properties to position bodhi: left, top, bottom, right, width and height.
      //Four properties  should be enough to position the bodhi. This position method is the same as the HTML.
      "position": {
        "left": 0,
        "top": 0,
        "right": 0,
        "bottom": 30,
        "width": 100,
        "height": 100,

        //Optional.Value can be either map or browser. If not set, default value is "map".
        "relativeTo": "map",

        //these four properties will be applied to widget's domNode if provided.
        "paddingRight": 10,
        "paddingLeft": 10,
        "paddingTop": 10,
        "paddingBottom": 10,

        //Optional. If not set, bodhi's z-index is auto. Please use values between 0 and 100.
        "zIndex": 0
      },

      //Optional. Whether the bodhi will open at app start. The default value is false.
      //Only valid for in-panel bodhi.
      //If more than one bodhi in bodhiOnTouch are set to true, the first one opens.
      //If more than one bodhi in bodhi pool are set to true, it's the controller's responsibility to define how to open.
      "openAtStart": true,

      //Optional. Object or url. If object, it means bodhi's causality object;
      //If url, it means the location of the causality file.
      //if not set, the framework will check "hasCausality" property to decide the bodhi causality.
      "causality": {},

      //Optional. If not set, the value is true.
      "visible": false,

      //Optional. This property is valid for on-touch off-panel bodhi only.
      //false means bodhi will be loaded and be put on the defined position, you can't close the bodhi;
      //true means app will create an icon for this bodhi and user can open/close this bodhi by click the
      //icon.
      "closeable": false,

      //Required. If the following version is older than the lastest bodhi's version, the framework will run bodhi's version manager to upgrade the bodhi's configuration.
      "version": "1.1"
    }]
  },

  "map": {
    //The uri of map module, map module is a amd module return a map instance.
    url:

    //The same as widget's fix position.
    "position": {
      "left": 0,
      "top": 0,
      "right": 0,
      "bottom": 30,
      "width": 100,
      "height": 100
    }
  },

  //Bodhis in this section are not loaded by the app, but are controlled by the bodhi(controller bodhi).
  "bodhiPool": {
    //Optional. If set, bodhis in the container display in this panel. Otherwise they display in the default panel.
    "panel": {
      "uri": "jimu/PanelType1",
      "position": {
        "left": 0,
        "top": 0,
        "right": 0,
        "bottom": 30,
        "width": 100,
        "height": 100,
        "relativeTo": "map"
      }
    },

    "ears": [{
      //Can be one or more bodhis.
      "bodhis": [{
        "uri": "bodhis/Bookmark/Bodhi",
        "icon": "",
        "label": ""
      }],

      //Optional.If only one bodhi, this property is ignored.
      "label": "",

      //Optional. The sequence of the group/bodhi.
      "index": 1,

      //Optional. If not set, use bodhi container's panel;
      //If set, it overrides the container's panel.
      "panel": {
        "uri": "jimu/PanelType1",
        "position": {
          "left": 0,
          "top": 0,
          "right": 0,
          "bottom": 30,
          "width": 100,
          "height": 100
        }
      }
    }],

    "bodhis": [{
      "index": 2,
      "uri": "bodhis/Header/Bodhi",
      "icon": "",
      "label": ""
    }]
  },

  "frameworkVersion": "0.6"
}
