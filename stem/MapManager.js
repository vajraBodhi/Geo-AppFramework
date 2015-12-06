define(['jquery', 'stem/utils'], function($, utils) {
	var instance = null;
	var clazz = function(params) {
    this.appCausality = params.appCausality;
	};
	clazz.prototype.loadMap = function(mapOptions) {
		if (mapOptions.position) {
			$('#' + mapOptions.domId).css(mapOptions.position);
		}

    var that = this;
		require([mapOptions.uri], function(map) {
			// map is an object with getMap method to get an instance of Map Class
			map.getMap(mapOptions.domId).then(function(mapObj) {
				that.map = mapObj;
				console.log('map loaded');
				utils.publish('mapLoaded', mapObj);
			});
		});
	};

	clazz.getInstance = function(params) {
		if (instance === null) {
			instance = new clazz(params);
		}

		return instance;
	};

	return clazz;
});