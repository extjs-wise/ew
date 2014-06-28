Ext.Boot = Ext.Boot || function() {
    function e(e) {
        var t = RegExp("[?&]" + e + "=([^&]*)"), r = t.exec(location.search) || t.exec(a);
        return r && decodeURIComponent(r[1]);
    }
    function t(e, t) {
        var r = t || location.search, o = new RegExp("(?:^|[&?])" + e + "(?:[=]([^&]*))?(?:$|[&])", "i"), a = o.exec(r);
        return a ? void 0 === a[1] || "" === a[1] ? !0 : a[1] : !1;
    }
    function r(e) {
        for (var t, r, o = document.cookie.split("; "), a = o.length; a--; ) t = o[a].split("="), 
        t[0] === e && (r = t[1]);
        return r;
    }
    var o = document.getElementsByTagName("script"), a = o[o.length - 1].src, s = e("rtl"), l = 3, n = a;
    for (s = s && "true" === s.toString(); l--; ) n = n.substring(0, n.lastIndexOf("/"));
    var x = {
        theme: e("theme") || "gray",
        includeCSS: !t("nocss", a),
        repoDevMode: r("ExtRepoDevMode"),
        rtl: s,
        baseUrl: n + "/"
    };
    return x;
}();

var appBaseUrl = baseUrl + "application/", extBaseUrl = baseUrl + ext_license + "/ext-" + ext_version + "/", extDeveMode = "ews";

Ext.log(baseUrl), Ext.log(appBaseUrl), Ext.Loader.setConfig({
    enabled: !0
}), Ext.Loader.setPath({
    "Ext.ux": extBaseUrl + "examples/ux" || appBaseUrl + "ux",
    "Ews.view": appBaseUrl + extDeveMode + "/view",
    "Ews.view.form.field": appBaseUrl + extDeveMode + "/view/form/field",
    "Ews.store": appBaseUrl + extDeveMode + "/store",
    "Ews.model": appBaseUrl + extDeveMode + "/model",
    "Ews.data": appBaseUrl + extDeveMode + "/data",
    "Ews.controller": appBaseUrl + extDeveMode + "/controller",
    Ews: appBaseUrl + extDeveMode + "/view",
    Ext: extBaseUrl + "src"
});