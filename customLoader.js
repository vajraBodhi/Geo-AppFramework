(function(global){
	global.loadResources = function(resources, cb) {
		var len = resources.length;
		var count = 0;
		if (len === 0) {
			cb();
			return;
		}
		for (var i = 0; i < len; i++) {
			var resource = resources[i];
			addResource(resource);
		}

		function addResource(resource) {
			var loadedResource = function() {
				count++;
				resource.complete && resource.complete();
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