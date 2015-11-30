(function(global){
	global.loadResources = function(resources, cb) {
		var len = resources.length;
		var count = 0;
		for (var i = 0; i < len; i++) {
			var resource = resources[i];
			addResource(resource);
		}

		function addResource(resource) {
			var loadedResource = function() {
				count++;
				resource.complete();
				if (count === len) {
					cb();
				}
			};
			if (resource.type === 'script') {
				addScript(resource.url, loadedResource);
			} else if (resource.type === 'styleSheet') {
				addLink(resource.url, loadedResource)
			}
		};

		function addScript(url, complete) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if ('readystatechange' in script) {
				script.onreadystatechange = function() {
					if (script.readystate === 'loaded' || script.readystate === 'complete') {
						complete();
					}
				}
			} else {
				script.onload = function() {
					complete();
				}
			}
			script.src = url;
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(script);
		};

		function addLink(url, complete) {
			var link = document.createElement('link');
			link.type = 'css/text';
			link.rel = 'styleSheet';
			if ('readystatechange' in link) {
				link.onreadystatechange = function() {
					if (link.readystate === 'loaded' || link.readystate === 'complete') {
						complete();
					}
				}
			} else {
				link.onload = function() {
					complete();
				}
			}

			link.href = url;
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(link);
		}
	}
})(window);

(function(global){
	var mapApi = "";
	var ap = Array.prototype;
	var polyfills = [{
		test: window.console && window.console.log,
		nope: './stem/libs/polyfills/console.js',
		complete: null
	}, {
		test: Date.now && typeof Date.now === 'function',
		nope: './stem/libs/polyfills/now.js',
		complete: null
	}, {
		test: Function.prototype.bind,
		nope: './stem/libs/polyfills/bind.js',
		complete: null
	}, {
		test: String.prototype.trim,
		nope: './stem/libs/polyfills/trim.js',
		complete: null
	}, {
		test: ap.indexOf && ap.lastIndexOf && ap.forEach && ap.every && ap.some &&
          ap.filter && ap.map && ap.reduce && ap.reduceRight,
    nope: './stem/libs/polyfills/array.generics.js',
    complete: null
	}];

	global.loadPolyfills = function(tests, cb) {
		var resources = [];
		for (var i = 0, len = tests.length; i < len; i++) {
			var polyfill = tests[i];
			if (polyfill.test) {
				resources.push({
					type: 'script',
					url: polyfill.nope,
					loaded: polyfill.complete
				});
			}
		}

		loadResources(resources, cb);
	}
})(window);

