//executeUntilExtLoaded();
//function executeUntilExtLoaded() {
//	if (Ext === undefined) {
//		window.tempSetTimeoutOfExtLoader = setTimeout(executeUntilExtLoaded, 10);
//	} else {
//		initExtLoader();
//
//	}
//}

//function initExtLoader() {
Ext.Boot = Ext.Boot || (function() {
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
			i = 3,
			baseUrl = path;
		rtl = rtl && rtl.toString() === 'true';
		while (i--) {
			baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/'));
		}
		var Ext_Boot = {
			theme: getQueryParam('theme') || 'gray',
			includeCSS: !hasOption('nocss', path),
			repoDevMode: getCookieValue('ExtRepoDevMode'),
			rtl: rtl,
			baseUrl: (baseUrl + '/')
		};
		return Ext_Boot;
	})();

var appBaseUrl = baseUrl + 'application/';
var extBaseUrl = baseUrl + ext_license + '/ext-' + ext_version + '/';
var extDeveMode = 'ews';
Ext.log(baseUrl);
Ext.log(appBaseUrl);
Ext.Loader.setConfig({
		enabled: true
	});
Ext.Loader.setPath({
		'Ext.ux': (extBaseUrl + 'examples/ux') || (appBaseUrl + 'ux'),
		'Ews.view': appBaseUrl + extDeveMode +'/view',
		'Ews.view.form.field': appBaseUrl + extDeveMode +'/view/form/field',
		'Ews.store': appBaseUrl + extDeveMode +'/store',
		'Ews.model': appBaseUrl + extDeveMode +'/model',
		'Ews.data': appBaseUrl + extDeveMode +'/data',
		'Ews.controller': appBaseUrl +extDeveMode +'/controller',
		'Ews': appBaseUrl + extDeveMode +'/view',
		'Ext': extBaseUrl + 'src'
	});
//}
