parcelRequire = function (e, r, t, n) { var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && require; function f(t, n) { if (!r[t]) { if (!e[t]) { var i = "function" == typeof parcelRequire && parcelRequire; if (!n && i) return i(t, !0); if (o) return o(t, !0); if (u && "string" == typeof t) return u(t); var c = new Error("Cannot find module '" + t + "'"); throw c.code = "MODULE_NOT_FOUND", c } p.resolve = function (r) { return e[t][1][r] || r }, p.cache = {}; var l = r[t] = new f.Module(t); e[t][0].call(l.exports, p, l, l.exports, this) } return r[t].exports; function p(e) { return f(p.resolve(e)) } } f.isParcelRequire = !0, f.Module = function (e) { this.id = e, this.bundle = f, this.exports = {} }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) { e[r] = [function (e, r) { r.exports = t }, {}] }; for (var c = 0; c < t.length; c++)try { f(t[c]) } catch (e) { i || (i = e) } if (t.length) { var l = f(t[t.length - 1]); "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () { return l }) : n && (this[n] = l) } if (parcelRequire = f, i) throw i; return f }({
    "P3wd": [function (require, module, exports) {
        function r(r, e) { var t = Object.keys(r); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(r); e && (n = n.filter(function (e) { return Object.getOwnPropertyDescriptor(r, e).enumerable })), t.push.apply(t, n) } return t } function e(e) { for (var n = 1; n < arguments.length; n++) { var o = null != arguments[n] ? arguments[n] : {}; n % 2 ? r(Object(o), !0).forEach(function (r) { t(e, r, o[r]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : r(Object(o)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(o, r)) }) } return e } function t(r, e, t) { return e in r ? Object.defineProperty(r, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : r[e] = t, r } function n(r, e) { return i(r) || a(r, e) || c(r, e) || o() } function o() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") } function a(r, e) { if ("undefined" != typeof Symbol && Symbol.iterator in Object(r)) { var t = [], n = !0, o = !1, a = void 0; try { for (var i, u = r[Symbol.iterator](); !(n = (i = u.next()).done) && (t.push(i.value), !e || t.length !== e); n = !0); } catch (c) { o = !0, a = c } finally { try { n || null == u.return || u.return() } finally { if (o) throw a } } return t } } function i(r) { if (Array.isArray(r)) return r } function u(r, e) { var t; if ("undefined" == typeof Symbol || null == r[Symbol.iterator]) { if (Array.isArray(r) || (t = c(r)) || e && r && "number" == typeof r.length) { t && (r = t); var n = 0, o = function () { }; return { s: o, n: function () { return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] } }, e: function (r) { throw r }, f: o } } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") } var a, i = !0, u = !1; return { s: function () { t = r[Symbol.iterator]() }, n: function () { var r = t.next(); return i = r.done, r }, e: function (r) { u = !0, a = r }, f: function () { try { i || null == t.return || t.return() } finally { if (u) throw a } } } } function c(r, e) { if (r) { if ("string" == typeof r) return l(r, e); var t = Object.prototype.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? l(r, e) : void 0 } } function l(r, e) { (null == e || e > r.length) && (e = r.length); for (var t = 0, n = new Array(e); t < e; t++)n[t] = r[t]; return n } var f = ["utm_source", "utm_medium", "utm_campaign", "custom_source", "custom_medium", "custom_campaign", "utm_content"], s = {}, m = new Date, y = window.location.search, b = new URLSearchParams(y), d = document.referrer ? new URL(document.referrer) : null; m.setDate(m.getDate() + 60); var p, h = u(b.entries()); try { for (h.s(); !(p = h.n()).done;) { var v = p.value; f.indexOf(v[0]) > -1 && (s[v[0]] = v[1]) } } catch (g) { h.e(g) } finally { h.f() } if (d) { var O = d.searchParams.toString().split("&").reduce(function (r, e) { var t = n(e.split("="), 2), o = t[0], a = t[1]; return r[o] = a, r }, {}); s = e(e(e({}, s), d.host && { referrer: d.host }), O.q && { query: O.q }) } document.cookie.match(/^(.*;)?\s*rollerads_utm\s*=\s*[^;]+(.*)?$/) || (document.cookie = "rollerads_utm=" + JSON.stringify(s) + "; path=/; expires=" + m + "; domain=.rollerads.com; Secure");
    }, {}]
}, {}, ["P3wd"], null)