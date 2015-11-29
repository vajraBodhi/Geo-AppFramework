define(['jquery'], function($) {
	var instance = null;
	var clazz = function(params) {
		this.seedConfig = params.seedConfig;
	};
	clazz.prototype.loadMap = function() {
		var mapFileUrl = this.seedConfig.map.map.url;
		// map is an object with getMap method to get an instance of Map Class
		require([mapFileUrl], function(map) {
			map.getMap().then(function(mapObj) {
				console.log('map loaded');
				$.pub('mapLoaded', mapObj);
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