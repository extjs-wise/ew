var baseUrl = 'http://localhost:8081/com.wisesoft.egovernment.web/static/js/extjs/',
	ext_license = "" || 'commercial' ,
	ext_version = '4.2.1.883',
	ext_relative_path = ext_license + "/ext-" + ext_version + "/",
	app_relative_path = "application/",
	ews_relative_path = app_relative_path + "ews/",
	default_theme = "gray" || 'gray',
	current_theme = default_theme,
	lang = 'zh_CN',
	charset = 'utf-8',
	ext_mode = {
		css: {
			all: '-all', // '-all'
			debug: '-debug' //'-debug'
		},
		js: {
			all: '-all' ,//'-all'
			debug: '-debug-w-comments',//'-debug-w-comments'//'-debug-w-comments'
		}
	},
	ews_mode ={
		css: {
		},
		js:{
			debug: '-debug' //'-min', //'-debug'
		}
	};

(function() {
		function getQueryParam(name) {
			var regex = RegExp('[?&]' + name + '=([^&]*)');

			var match = regex.exec(location.search) || regex.exec(path);
			return match && decodeURIComponent(match[1]);
		}

		function hasOption(opt, queryString) {
			var s = queryString || location.search;
			var re = new RegExp('(?:^|[&?])' + opt + '(?:[=]([^&]*))?(?:$|[&])', 'i');
			var m = re.exec(s);

			return m ? (m[1] === undefined || m[1] === '' ? true : m[1]) : false;
		}

		function getCookieValue(name) {
			var cookies = document.cookie.split('; '),
				i = cookies.length,
				cookie, value;

			while (i--) {
				cookie = cookies[i].split('=');
				if (cookie[0] === name) {
					value = cookie[1];
				}
			}

			return value;
		}

		var scriptEls = document.getElementsByTagName('script'),
			path = scriptEls[scriptEls.length - 1].src,
			rtl = getQueryParam('rtl'),
			theme = getQueryParam('theme') || 'classic',
			current_theme = theme,
			/**BEGIN include-ext*/
			includeCSS = !hasOption('nocss', path),
			neptune = (theme === 'neptune'),
			repoDevMode = getCookieValue('ExtRepoDevMode'),
			suffix = [],
			i = 3,
			neptunePath;
		/**END include-ext*/
		lang = getQueryParam('lang') || lang || 'zh_CN';
		charset = getQueryParam('charset') || charset || 'utf-8';
		rtl = rtl && rtl.toString() === 'true';
		while (i--) {
			path = path.substring(0, path.lastIndexOf('/'));
		}
		baseUrl = path + '/';
		if (undefined !== ext_relative_path) {
			path = path + '/' + ext_relative_path;
			path = path.substring(0, path.lastIndexOf('/'));
		}
		/**BEGIN include-ext*/
		if (theme && theme !== 'classic') {
			suffix.push(theme);
		}
		if (rtl) {
			suffix.push('rtl');
		}

		suffix = (suffix.length) ? ('-' + suffix.join('-')) : '';

		if (includeCSS) {
			document.write('<link rel="stylesheet" type="text/css" href="' + path + '/resources/css/ext' + ext_mode.css.all  + suffix  + ext_mode.css.debug  + '.css"/>');
		}
		document.write('<script type="text/javascript" src="' + path + '/ext' + ext_mode.js.all + (rtl ? '-rtl' : '') + ext_mode.js.debug + '.js"></script>');

		if (neptune) {
			// since document.write('<script>') does not block execution in IE, we need to 
			// makes sure we prevent ext-theme-neptune.js from executing before ext-all.js
			// normally this can be done using the defer attribute on the script tag, however
			// this method does not work in IE when in repoDevMode.  It seems the reason for
			// this is because in repoDevMode ext-all.js is simply a script that loads other
			// scripts and so Ext is still undefined when the neptune overrides are executed.
			// To work around this we use the _beforereadyhandler hook to load the neptune
			// overrides dynamically after Ext has been defined.
			neptunePath = (repoDevMode ? path + '/..' : path) +
				'/packages/ext-theme-neptune/build/ext-theme-neptune' +
			(repoDevMode ? '-dev' : '') + '.js';

			if (repoDevMode && window.ActiveXObject) {
				Ext = {
					_beforereadyhandler: function() {
						Ext.Loader.loadScript({
								url: neptunePath
							});
					}
				};
			} else {
				document.write('<script type="text/javascript" src="' + neptunePath + '" defer></script>');
			}
		}
		/**END include-ext*/

		var app_path = baseUrl + app_relative_path,
			ext_path = baseUrl + ext_relative_path,
			ews_path = baseUrl + ews_relative_path;
		//console && console.log('app_path: ' + app_path);
		//document.write('<script type="text/javascript" src="' + app_path + 'shared/include-ext.js?theme=' + (current_theme||'gray') + '&lang='+lang+'&charset='+charset+'"></script>');
		//document.write('<script type="text/javascript" src="' + app_path + 'shared/options-toolbar.js?theme=' + (default_theme||'gray') + '"></script>');
		document.write('<link rel="stylesheet" type="text/css" href="' + app_path + 'shared/font-awesome-4.1.0/css/font-awesome.css"/>');
		document.write('<link rel="stylesheet" type="text/css" href="' + app_path + 'shared/patch.css"/>');
		document.write('<link rel="stylesheet" type="text/css" href="' + app_path + 'shared/patch-' + current_theme + '.css"/>');
		document.write('<script type="text/javascript" src="' + app_path + 'shared/gb-config-debug.js?theme=' + (current_theme || default_theme || 'gray') + '&lang=' + lang + '&charset=' + charset + '"></script>');
		document.write('<script type="text/javascript" src="' + ews_path + 'ews' + ews_mode.js.debug + '.js"></script>');
		document.write('<script type="text/javascript" src="' + ext_path + 'locale/ext-lang-' + lang + '.js?theme=' + (current_theme || default_theme || 'gray') + '&lang=' + lang + '&charset=' + charset + '"></script>');
		document.write('<script type="text/javascript" src="' + ews_path + 'locale/ews-lang-' + lang + '.js?theme=' + (current_theme || default_theme || 'gray') + '&lang=' + lang + '&charset=' + charset + '"></script>');

	})();
