var baseUrl = "http://localhost:8081/com.wisesoft.egovernment.web/static/js/extjs/", ext_license = "commercial", ext_version = "4.2.1.883", ext_relative_path = ext_license + "/ext-" + ext_version + "/", app_relative_path = "application/", ews_relative_path = app_relative_path + "ews/", default_theme = "gray", current_theme = default_theme, lang = "zh_CN", charset = "utf-8", ext_mode = {
    css: {
        all: "-all",
        debug: "-debug"
    },
    js: {
        all: "-all",
        debug: "-debug-w-comments"
    }
}, ews_mode = {
    css: {},
    js: {
        debug: "-debug"
    }
};

!function() {
    function e(e) {
        var t = RegExp("[?&]" + e + "=([^&]*)"), s = t.exec(location.search) || t.exec(c);
        return s && decodeURIComponent(s[1]);
    }
    function t(e, t) {
        var s = t || location.search, a = new RegExp("(?:^|[&?])" + e + "(?:[=]([^&]*))?(?:$|[&])", "i"), r = a.exec(s);
        return r ? void 0 === r[1] || "" === r[1] ? !0 : r[1] : !1;
    }
    function s(e) {
        for (var t, s, a = document.cookie.split("; "), r = a.length; r--; ) t = a[r].split("="), 
        t[0] === e && (s = t[1]);
        return s;
    }
    var a, r = document.getElementsByTagName("script"), c = r[r.length - 1].src, l = e("rtl"), n = e("theme") || "classic", i = n, o = !t("nocss", c), p = "neptune" === n, h = s("ExtRepoDevMode"), d = [], u = 3;
    for (lang = e("lang") || lang || "zh_CN", charset = e("charset") || charset || "utf-8", 
    l = l && "true" === l.toString(); u--; ) c = c.substring(0, c.lastIndexOf("/"));
    baseUrl = c + "/", void 0 !== ext_relative_path && (c = c + "/" + ext_relative_path, 
    c = c.substring(0, c.lastIndexOf("/"))), n && "classic" !== n && d.push(n), l && d.push("rtl"), 
    d = d.length ? "-" + d.join("-") : "", o && document.write('<link rel="stylesheet" type="text/css" href="' + c + "/resources/css/ext" + ext_mode.css.all + d + ext_mode.css.debug + '.css"/>'), 
    document.write('<script type="text/javascript" src="' + c + "/ext" + ext_mode.js.all + (l ? "-rtl" : "") + ext_mode.js.debug + '.js"></script>'), 
    p && (a = (h ? c + "/.." : c) + "/packages/ext-theme-neptune/build/ext-theme-neptune" + (h ? "-dev" : "") + ".js", 
    h && window.ActiveXObject ? Ext = {
        _beforereadyhandler: function() {
            Ext.Loader.loadScript({
                url: a
            });
        }
    } : document.write('<script type="text/javascript" src="' + a + '" defer></script>'));
    var m = baseUrl + app_relative_path, g = baseUrl + ext_relative_path, x = baseUrl + ews_relative_path;
    document.write('<link rel="stylesheet" type="text/css" href="' + m + 'shared/font-awesome-4.1.0/css/font-awesome.css"/>'), 
    document.write('<link rel="stylesheet" type="text/css" href="' + m + 'shared/patch.css"/>'), 
    document.write('<link rel="stylesheet" type="text/css" href="' + m + "shared/patch-" + i + '.css"/>'), 
    document.write('<script type="text/javascript" src="' + m + "shared/gb-config.js?theme=" + (i || default_theme || "gray") + "&lang=" + lang + "&charset=" + charset + '"></script>'), 
    document.write('<script type="text/javascript" src="' + x + "ews" + ews_mode.js.debug + '.js"></script>'), 
    document.write('<script type="text/javascript" src="' + g + "locale/ext-lang-" + lang + ".js?theme=" + (i || default_theme || "gray") + "&lang=" + lang + "&charset=" + charset + '"></script>'), 
    document.write('<script type="text/javascript" src="' + x + "locale/ews-lang-" + lang + ".js?theme=" + (i || default_theme || "gray") + "&lang=" + lang + "&charset=" + charset + '"></script>');
}();