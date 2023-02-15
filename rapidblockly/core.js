//rewrite by 白篮&SUDA&CODEWYX
//是改过的
var Blockly = { constants: {}, LINE_MODE_MULTIPLIER: 40, PAGE_MODE_MULTIPLIER: 125, DRAG_RADIUS: 5, FLYOUT_DRAG_RADIUS: 10, SNAP_RADIUS: 28 };
Blockly.CONNECTING_SNAP_RADIUS = Blockly.SNAP_RADIUS;
Blockly.CURRENT_CONNECTION_PREFERENCE = 8;
Blockly.BUMP_DELAY = 250;
Blockly.BUMP_RANDOMNESS = 10;
Blockly.COLLAPSE_CHARS = 30;
Blockly.LONGPRESS = 750;
Blockly.SOUND_LIMIT = 100;
Blockly.DRAG_STACK = !0;
Blockly.HSV_SATURATION = .45;
Blockly.HSV_VALUE = .65;
Blockly.SPRITE = { width: 192, height: 248, url: "" };
Blockly.INPUT_VALUE = 1;
Blockly.OUTPUT_VALUE = 2;
Blockly.NEXT_STATEMENT = 3;
Blockly.PREVIOUS_STATEMENT = 4;
Blockly.DUMMY_INPUT = 5;
Blockly.ALIGN_LEFT = -1;
Blockly.ALIGN_CENTRE = 0;
Blockly.ALIGN_RIGHT = 1;
Blockly.DRAG_NONE = 0;
Blockly.DRAG_STICKY = 1;
Blockly.DRAG_BEGIN = 1;
Blockly.DRAG_FREE = 2;
Blockly.OPPOSITE_TYPE = [];
Blockly.OPPOSITE_TYPE[Blockly.INPUT_VALUE] = Blockly.OUTPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.OUTPUT_VALUE] = Blockly.INPUT_VALUE;
Blockly.OPPOSITE_TYPE[Blockly.NEXT_STATEMENT] = Blockly.PREVIOUS_STATEMENT;
Blockly.OPPOSITE_TYPE[Blockly.PREVIOUS_STATEMENT] = Blockly.NEXT_STATEMENT;
Blockly.TOOLBOX_AT_TOP = 0;
Blockly.TOOLBOX_AT_BOTTOM = 1;
Blockly.TOOLBOX_AT_LEFT = 2;
Blockly.TOOLBOX_AT_RIGHT = 3;
Blockly.DELETE_AREA_NONE = null;
Blockly.DELETE_AREA_TRASH = 1;
Blockly.DELETE_AREA_TOOLBOX = 2;
Blockly.VARIABLE_CATEGORY_NAME = "VARIABLE";
Blockly.VARIABLE_DYNAMIC_CATEGORY_NAME = "VARIABLE_DYNAMIC";
Blockly.PROCEDURE_CATEGORY_NAME = "PROCEDURE";
Blockly.RENAME_VARIABLE_ID = "RENAME_VARIABLE_ID";
Blockly.DELETE_VARIABLE_ID = "DELETE_VARIABLE_ID";
Blockly.utils = {};
Blockly.utils.global = function() { return "object" === typeof self ? self : "object" === typeof window ? window : "object" === typeof global ? global : this }();
Blockly.Msg = {};
Blockly.utils.global.Blockly || (Blockly.utils.global.Blockly = {});
Blockly.utils.global.Blockly.Msg || (Blockly.utils.global.Blockly.Msg = Blockly.Msg);
Blockly.utils.colour = {};
Blockly.utils.colour.parse = function(a) {
    a = String(a).toLowerCase().trim();
    var b = Blockly.utils.colour.names[a];
    if (b) return b;
    b = "0x" == a.substring(0, 2) ? "#" + a.substring(2) : a;
    b = "#" == b[0] ? b : "#" + b;
    if (/^#[0-9a-f]{6}$/.test(b)) return b;
    if (/^#[0-9a-f]{3}$/.test(b)) return ["#", b[1], b[1], b[2], b[2], b[3], b[3]].join("");
    var c = a.match(/^(?:rgb)?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
    return c && (a = Number(c[1]), b = Number(c[2]), c = Number(c[3]), 0 <= a && 256 > a && 0 <= b && 256 > b && 0 <= c && 256 > c) ? Blockly.utils.colour.rgbToHex(a, b,
        c) : null
};
Blockly.utils.colour.rgbToHex = function(a, b, c) { b = a << 16 | b << 8 | c; return 16 > a ? "#" + (16777216 | b).toString(16).substr(1) : "#" + b.toString(16) };
Blockly.utils.colour.hexToRgb = function(a) {
    a = Blockly.utils.colour.parse(a);
    if (!a) return [0, 0, 0];
    a = parseInt(a.substr(1), 16);
    return [a >> 16, a >> 8 & 255, a & 255]
};
Blockly.utils.colour.hsvToHex = function(a, b, c) {
    var d = 0,
        e = 0,
        f = 0;
    if (0 == b) f = e = d = c;
    else {
        var g = Math.floor(a / 60),
            h = a / 60 - g;
        a = c * (1 - b);
        var k = c * (1 - b * h);
        b = c * (1 - b * (1 - h));
        switch (g) {
            case 1:
                d = k;
                e = c;
                f = a;
                break;
            case 2:
                d = a;
                e = c;
                f = b;
                break;
            case 3:
                d = a;
                e = k;
                f = c;
                break;
            case 4:
                d = b;
                e = a;
                f = c;
                break;
            case 5:
                d = c;
                e = a;
                f = k;
                break;
            case 6:
            case 0:
                d = c, e = b, f = a
        }
    }
    return Blockly.utils.colour.rgbToHex(Math.floor(d), Math.floor(e), Math.floor(f))
};
Blockly.utils.colour.blend = function(a, b, c) {
    a = Blockly.utils.colour.parse(a);
    if (!a) return null;
    b = Blockly.utils.colour.parse(b);
    if (!b) return null;
    a = Blockly.utils.colour.hexToRgb(a);
    b = Blockly.utils.colour.hexToRgb(b);
    return Blockly.utils.colour.rgbToHex(Math.round(b[0] + c * (a[0] - b[0])), Math.round(b[1] + c * (a[1] - b[1])), Math.round(b[2] + c * (a[2] - b[2])))
};
Blockly.utils.colour.names = { aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00" };
Blockly.utils.Coordinate = function(a, b) {
    this.x = a;
    this.y = b
};
Blockly.utils.Coordinate.equals = function(a, b) { return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1 };
Blockly.utils.Coordinate.distance = function(a, b) {
    var c = a.x - b.x;
    a = a.y - b.y;
    return Math.sqrt(c * c + a * a)
};
Blockly.utils.Coordinate.magnitude = function(a) { return Math.sqrt(a.x * a.x + a.y * a.y) };
Blockly.utils.Coordinate.difference = function(a, b) { return new Blockly.utils.Coordinate(a.x - b.x, a.y - b.y) };
Blockly.utils.Coordinate.sum = function(a, b) { return new Blockly.utils.Coordinate(a.x + b.x, a.y + b.y) };
Blockly.utils.Coordinate.prototype.scale = function(a) {
    this.x *= a;
    this.y *= a;
    return this
};
Blockly.utils.Coordinate.prototype.translate = function(a, b) {
    this.x += a;
    this.y += b;
    return this
};
Blockly.utils.string = {};
Blockly.utils.string.startsWith = function(a, b) { return 0 == a.lastIndexOf(b, 0) };
Blockly.utils.string.shortestStringLength = function(a) { return a.length ? a.reduce(function(a, c) { return a.length < c.length ? a : c }).length : 0 };
Blockly.utils.string.commonWordPrefix = function(a, b) {
    if (!a.length) return 0;
    if (1 == a.length) return a[0].length;
    var c = 0;
    b = b || Blockly.utils.string.shortestStringLength(a);
    for (var d = 0; d < b; d++) {
        for (var e = a[0][d], f = 1; f < a.length; f++)
            if (e != a[f][d]) return c;
            " " == e && (c = d + 1)
    }
    for (f = 1; f < a.length; f++)
        if ((e = a[f][d]) && " " != e) return c;
    return b
};
Blockly.utils.string.commonWordSuffix = function(a, b) {
    if (!a.length) return 0;
    if (1 == a.length) return a[0].length;
    var c = 0;
    b = b || Blockly.utils.string.shortestStringLength(a);
    for (var d = 0; d < b; d++) {
        for (var e = a[0].substr(-d - 1, 1), f = 1; f < a.length; f++)
            if (e != a[f].substr(-d - 1, 1)) return c;
            " " == e && (c = d + 1)
    }
    for (f = 1; f < a.length; f++)
        if ((e = a[f].charAt(a[f].length - d - 1)) && " " != e) return c;
    return b
};
Blockly.utils.string.wrap = function(a, b) { a = a.split("\n"); for (var c = 0; c < a.length; c++) a[c] = Blockly.utils.string.wrapLine_(a[c], b); return a.join("\n") };
Blockly.utils.string.wrapLine_ = function(a, b) {
    if (a.length <= b) return a;
    for (var c = a.trim().split(/\s+/), d = 0; d < c.length; d++) c[d].length > b && (b = c[d].length);
    d = -Infinity;
    var e = 1;
    do {
        var f = d;
        var g = a;
        a = [];
        var h = c.length / e,
            k = 1;
        for (d = 0; d < c.length - 1; d++) k < (d + 1.5) / h ? (k++, a[d] = !0) : a[d] = !1;
        a = Blockly.utils.string.wrapMutate_(c, a, b);
        d = Blockly.utils.string.wrapScore_(c, a, b);
        a = Blockly.utils.string.wrapToText_(c, a);
        e++
    } while (d > f);
    return g
};
Blockly.utils.string.wrapScore_ = function(a, b, c) {
    for (var d = [0], e = [], f = 0; f < a.length; f++) d[d.length - 1] += a[f].length, !0 === b[f] ? (d.push(0), e.push(a[f].charAt(a[f].length - 1))) : !1 === b[f] && d[d.length - 1]++;
    a = Math.max.apply(Math, d);
    for (f = b = 0; f < d.length; f++) b -= 2 * Math.pow(Math.abs(c - d[f]), 1.5), b -= Math.pow(a - d[f], 1.5), -1 != ".?!".indexOf(e[f]) ? b += c / 3 : -1 != ",;)]}".indexOf(e[f]) && (b += c / 4);
    1 < d.length && d[d.length - 1] <= d[d.length - 2] && (b += .5);
    return b
};
Blockly.utils.string.wrapMutate_ = function(a, b, c) {
    for (var d = Blockly.utils.string.wrapScore_(a, b, c), e, f = 0; f < b.length - 1; f++)
        if (b[f] != b[f + 1]) {
            var g = [].concat(b);
            g[f] = !g[f];
            g[f + 1] = !g[f + 1];
            var h = Blockly.utils.string.wrapScore_(a, g, c);
            h > d && (d = h, e = g)
        }
    return e ? Blockly.utils.string.wrapMutate_(a, e, c) : b
};
Blockly.utils.string.wrapToText_ = function(a, b) { for (var c = [], d = 0; d < a.length; d++) c.push(a[d]), void 0 !== b[d] && c.push(b[d] ? "\n" : " "); return c.join("") };
Blockly.utils.Size = function(a, b) {
    this.width = a;
    this.height = b
};
Blockly.utils.Size.equals = function(a, b) { return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1 };
Blockly.utils.style = {};
Blockly.utils.style.getSize = function(a) {
    if ("none" != Blockly.utils.style.getStyle_(a, "display")) return Blockly.utils.style.getSizeWithDisplay_(a);
    var b = a.style,
        c = b.display,
        d = b.visibility,
        e = b.position;
    b.visibility = "hidden";
    b.position = "absolute";
    b.display = "inline";
    var f = a.offsetWidth;
    a = a.offsetHeight;
    b.display = c;
    b.position = e;
    b.visibility = d;
    return new Blockly.utils.Size(f, a)
};
Blockly.utils.style.getSizeWithDisplay_ = function(a) { return new Blockly.utils.Size(a.offsetWidth, a.offsetHeight) };
Blockly.utils.style.getStyle_ = function(a, b) { return Blockly.utils.style.getComputedStyle(a, b) || Blockly.utils.style.getCascadedStyle(a, b) || a.style && a.style[b] };
Blockly.utils.style.getComputedStyle = function(a, b) { return document.defaultView && document.defaultView.getComputedStyle && (a = document.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : "" };
Blockly.utils.style.getCascadedStyle = function(a, b) { return a.currentStyle ? a.currentStyle[b] : null };
Blockly.utils.style.getPageOffset = function(a) {
    var b = new Blockly.utils.Coordinate(0, 0);
    a = a.getBoundingClientRect();
    var c = document.documentElement;
    c = new Blockly.utils.Coordinate(window.pageXOffset || c.scrollLeft, window.pageYOffset || c.scrollTop);
    b.x = a.left + c.x;
    b.y = a.top + c.y;
    return b
};
Blockly.utils.style.getViewportPageOffset = function() {
    var a = document.body,
        b = document.documentElement;
    return new Blockly.utils.Coordinate(a.scrollLeft || b.scrollLeft, a.scrollTop || b.scrollTop)
};
Blockly.utils.style.setElementShown = function(a, b) { a.style.display = b ? "" : "none" };
Blockly.utils.style.isRightToLeft = function(a) { return "rtl" == Blockly.utils.style.getStyle_(a, "direction") };
Blockly.utils.style.getBorderBox = function(a) {
    var b = Blockly.utils.style.getComputedStyle(a, "borderLeftWidth"),
        c = Blockly.utils.style.getComputedStyle(a, "borderRightWidth"),
        d = Blockly.utils.style.getComputedStyle(a, "borderTopWidth");
    a = Blockly.utils.style.getComputedStyle(a, "borderBottomWidth");
    return { top: parseFloat(d), right: parseFloat(c), bottom: parseFloat(a), left: parseFloat(b) }
};
Blockly.utils.style.scrollIntoContainerView = function(a, b, c) {
    a = Blockly.utils.style.getContainerOffsetToScrollInto(a, b, c);
    b.scrollLeft = a.x;
    b.scrollTop = a.y
};
Blockly.utils.style.getContainerOffsetToScrollInto = function(a, b, c) {
    var d = Blockly.utils.style.getPageOffset(a),
        e = Blockly.utils.style.getPageOffset(b),
        f = Blockly.utils.style.getBorderBox(b),
        g = d.x - e.x - f.left;
    d = d.y - e.y - f.top;
    e = Blockly.utils.style.getSizeWithDisplay_(a);
    a = b.clientWidth - e.width;
    e = b.clientHeight - e.height;
    f = b.scrollLeft;
    b = b.scrollTop;
    c ? (f += g - a / 2, b += d - e / 2) : (f += Math.min(g, Math.max(g - a, 0)), b += Math.min(d, Math.max(d - e, 0)));
    return new Blockly.utils.Coordinate(f, b)
};
Blockly.utils.userAgent = {};
(function(a) {
    function b(a) { return -1 != c.indexOf(a.toUpperCase()) }
    Blockly.utils.userAgent.raw = a;
    var c = Blockly.utils.userAgent.raw.toUpperCase();
    Blockly.utils.userAgent.IE = b("Trident") || b("MSIE");
    Blockly.utils.userAgent.EDGE = b("Edge");
    Blockly.utils.userAgent.JAVA_FX = b("JavaFX");
    Blockly.utils.userAgent.CHROME = (b("Chrome") || b("CriOS")) && !Blockly.utils.userAgent.EDGE;
    Blockly.utils.userAgent.WEBKIT = b("WebKit") && !Blockly.utils.userAgent.EDGE;
    Blockly.utils.userAgent.GECKO = b("Gecko") && !Blockly.utils.userAgent.WEBKIT &&
        !Blockly.utils.userAgent.IE && !Blockly.utils.userAgent.EDGE;
    Blockly.utils.userAgent.ANDROID = b("Android");
    Blockly.utils.userAgent.IPAD = b("iPad");
    Blockly.utils.userAgent.IPOD = b("iPod");
    Blockly.utils.userAgent.IPHONE = b("iPhone") && !Blockly.utils.userAgent.IPAD && !Blockly.utils.userAgent.IPOD;
    Blockly.utils.userAgent.MAC = b("Macintosh");
    Blockly.utils.userAgent.TABLET = Blockly.utils.userAgent.IPAD || Blockly.utils.userAgent.ANDROID && !b("Mobile") || b("Silk");
    Blockly.utils.userAgent.MOBILE = !Blockly.utils.userAgent.TABLET &&
        (Blockly.utils.userAgent.IPOD || Blockly.utils.userAgent.IPHONE || Blockly.utils.userAgent.ANDROID || b("IEMobile"))
})(Blockly.utils.global.navigator && Blockly.utils.global.navigator.userAgent || "");
Blockly.utils.noEvent = function(a) {
    a.preventDefault();
    a.stopPropagation()
};
Blockly.utils.isTargetInput = function(a) { return "textarea" == a.target.type || "text" == a.target.type || "number" == a.target.type || "email" == a.target.type || "password" == a.target.type || "search" == a.target.type || "tel" == a.target.type || "url" == a.target.type || a.target.isContentEditable };
Blockly.utils.getRelativeXY = function(a) {
    var b = new Blockly.utils.Coordinate(0, 0),
        c = a.getAttribute("x");
    c && (b.x = parseInt(c, 10));
    if (c = a.getAttribute("y")) b.y = parseInt(c, 10);
    if (c = (c = a.getAttribute("transform")) && c.match(Blockly.utils.getRelativeXY.XY_REGEX_)) b.x += Number(c[1]), c[3] && (b.y += Number(c[3]));
    (a = a.getAttribute("style")) && -1 < a.indexOf("translate") && (a = a.match(Blockly.utils.getRelativeXY.XY_STYLE_REGEX_)) && (b.x += Number(a[1]), a[3] && (b.y += Number(a[3])));
    return b
};
Blockly.utils.getInjectionDivXY_ = function(a) {
    for (var b = 0, c = 0; a;) {
        var d = Blockly.utils.getRelativeXY(a);
        b += d.x;
        c += d.y;
        if (-1 != (" " + (a.getAttribute("class") || "") + " ").indexOf(" injectionDiv ")) break;
        a = a.parentNode
    }
    return new Blockly.utils.Coordinate(b, c)
};
Blockly.utils.getRelativeXY.XY_REGEX_ = /translate\(\s*([-+\d.e]+)([ ,]\s*([-+\d.e]+)\s*)?/;
Blockly.utils.getRelativeXY.XY_STYLE_REGEX_ = /transform:\s*translate(?:3d)?\(\s*([-+\d.e]+)\s*px([ ,]\s*([-+\d.e]+)\s*px)?/;
Blockly.utils.isRightButton = function(a) { return a.ctrlKey && Blockly.utils.userAgent.MAC ? !0 : 2 == a.button };
Blockly.utils.mouseToSvg = function(a, b, c) {
    var d = b.createSVGPoint();
    d.x = a.clientX;
    d.y = a.clientY;
    c || (c = b.getScreenCTM().inverse());
    return d.matrixTransform(c)
};
Blockly.utils.getScrollDeltaPixels = function(a) {
    switch (a.deltaMode) {
        default: return { x: a.deltaX, y: a.deltaY };
        case 1:
                return { x: a.deltaX * Blockly.LINE_MODE_MULTIPLIER, y: a.deltaY * Blockly.LINE_MODE_MULTIPLIER };
        case 2:
                return { x: a.deltaX * Blockly.PAGE_MODE_MULTIPLIER, y: a.deltaY * Blockly.PAGE_MODE_MULTIPLIER }
    }
};
Blockly.utils.tokenizeInterpolation = function(a) { return Blockly.utils.tokenizeInterpolation_(a, !0) };
Blockly.utils.replaceMessageReferences = function(a) {
    if ("string" != typeof a) return a;
    a = Blockly.utils.tokenizeInterpolation_(a, !1);
    return a.length ? String(a[0]) : ""
};
Blockly.utils.checkMessageReferences = function(a) {
    for (var b = !0, c = Blockly.Msg, d = a.match(/%{BKY_[A-Z]\w*}/ig), e = 0; e < d.length; e++) {
        var f = d[e].toUpperCase();
        void 0 == c[f.slice(6, -1)] && (console.log("WARNING: No message string for " + d[e] + " in " + a), b = !1)
    }
    return b
};
Blockly.utils.tokenizeInterpolation_ = function(a, b) {
    var c = [],
        d = a.split("");
    d.push("");
    var e = 0;
    a = [];
    for (var f = null, g = 0; g < d.length; g++) {
        var h = d[g];
        0 == e ? "%" == h ? ((h = a.join("")) && c.push(h), a.length = 0, e = 1) : a.push(h) : 1 == e ? "%" == h ? (a.push(h), e = 0) : b && "0" <= h && "9" >= h ? (e = 2, f = h, (h = a.join("")) && c.push(h), a.length = 0) : "{" == h ? e = 3 : (a.push("%", h), e = 0) : 2 == e ? "0" <= h && "9" >= h ? f += h : (c.push(parseInt(f, 10)), g--, e = 0) : 3 == e && ("" == h ? (a.splice(0, 0, "%{"), g--, e = 0) : "}" != h ? a.push(h) : (e = a.join(""), /[A-Z]\w*/i.test(e) ? (h = e.toUpperCase(),
            (h = Blockly.utils.string.startsWith(h, "BKY_") ? h.substring(4) : null) && h in Blockly.Msg ? (e = Blockly.Msg[h], "string" == typeof e ? Array.prototype.push.apply(c, Blockly.utils.tokenizeInterpolation_(e, b)) : b ? c.push(String(e)) : c.push(e)) : c.push("%{" + e + "}")) : c.push("%{" + e + "}"), e = a.length = 0))
    }(h = a.join("")) && c.push(h);
    b = [];
    for (g = a.length = 0; g < c.length; ++g) "string" == typeof c[g] ? a.push(c[g]) : ((h = a.join("")) && b.push(h), a.length = 0, b.push(c[g]));
    (h = a.join("")) && b.push(h);
    a.length = 0;
    return b
};
Blockly.utils.genUid = function() { for (var a = Blockly.utils.genUid.soup_.length, b = [], c = 0; 20 > c; c++) b[c] = Blockly.utils.genUid.soup_.charAt(Math.random() * a); return b.join("") };
Blockly.utils.genUid.soup_ = "!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
Blockly.utils.is3dSupported = function() {
    if (void 0 !== Blockly.utils.is3dSupported.cached_) return Blockly.utils.is3dSupported.cached_;
    if (!Blockly.utils.global.getComputedStyle) return !1;
    var a = document.createElement("p"),
        b = "none",
        c = { webkitTransform: "-webkit-transform", OTransform: "-o-transform", msTransform: "-ms-transform", MozTransform: "-moz-transform", transform: "transform" };
    document.body.insertBefore(a, null);
    for (var d in c)
        if (void 0 !== a.style[d]) {
            a.style[d] = "translate3d(1px,1px,1px)";
            b = Blockly.utils.global.getComputedStyle(a);
            if (!b) return document.body.removeChild(a), !1;
            b = b.getPropertyValue(c[d])
        }
    document.body.removeChild(a);
    Blockly.utils.is3dSupported.cached_ = "none" !== b;
    return Blockly.utils.is3dSupported.cached_
};
Blockly.utils.runAfterPageLoad = function(a) {
    if ("object" != typeof document) throw Error("Blockly.utils.runAfterPageLoad() requires browser document.");
    if ("complete" == document.readyState) a();
    else var b = setInterval(function() { "complete" == document.readyState && (clearInterval(b), a()) }, 10)
};
Blockly.utils.getViewportBBox = function() { var a = Blockly.utils.style.getViewportPageOffset(); return { right: document.documentElement.clientWidth + a.x, bottom: document.documentElement.clientHeight + a.y, top: a.y, left: a.x } };
Blockly.utils.arrayRemove = function(a, b) {
    b = a.indexOf(b);
    if (-1 == b) return !1;
    a.splice(b, 1);
    return !0
};
Blockly.utils.getDocumentScroll = function() {
    var a = document.documentElement,
        b = window;
    return Blockly.utils.userAgent.IE && b.pageYOffset != a.scrollTop ? new Blockly.utils.Coordinate(a.scrollLeft, a.scrollTop) : new Blockly.utils.Coordinate(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop)
};
Blockly.utils.getBlockTypeCounts = function(a, b) {
    var c = Object.create(null),
        d = a.getDescendants(!0);
    b && (a = a.getNextBlock()) && (a = d.indexOf(a), d.splice(a, d.length - a));
    for (a = 0; b = d[a]; a++) c[b.type] ? c[b.type]++ : c[b.type] = 1;
    return c
};
Blockly.utils.screenToWsCoordinates = function(a, b) {
    var c = b.x;
    b = b.y;
    var d = a.getInjectionDiv().getBoundingClientRect();
    c = new Blockly.utils.Coordinate(c - d.left, b - d.top);
    b = a.getOriginOffsetInPixels();
    return Blockly.utils.Coordinate.difference(c, b).scale(1 / a.scale)
};
Blockly.utils.parseBlockColour = function(a) {
    var b = "string" == typeof a ? Blockly.utils.replaceMessageReferences(a) : a,
        c = Number(b);
    if (!isNaN(c) && 0 <= c && 360 >= c) return { hue: c, hex: Blockly.utils.colour.hsvToHex(c, Blockly.HSV_SATURATION, 355 * Blockly.HSV_VALUE) };
    if (c = Blockly.utils.colour.parse(b)) return { hue: null, hex: c };
    c = 'Invalid colour: "' + b + '"';
    a != b && (c += ' (from "' + a + '")');
    throw Error(c);
};
Blockly.Events = {};
Blockly.Events.group_ = "";
Blockly.Events.recordUndo = !0;
Blockly.Events.disabled_ = 0;
Blockly.Events.CREATE = "create";
Blockly.Events.BLOCK_CREATE = Blockly.Events.CREATE;
Blockly.Events.DELETE = "delete";
Blockly.Events.BLOCK_DELETE = Blockly.Events.DELETE;
Blockly.Events.CHANGE = "change";
Blockly.Events.BLOCK_CHANGE = Blockly.Events.CHANGE;
Blockly.Events.MOVE = "move";
Blockly.Events.BLOCK_MOVE = Blockly.Events.MOVE;
Blockly.Events.VAR_CREATE = "var_create";
Blockly.Events.VAR_DELETE = "var_delete";
Blockly.Events.VAR_RENAME = "var_rename";
Blockly.Events.UI = "ui";
Blockly.Events.COMMENT_CREATE = "comment_create";
Blockly.Events.COMMENT_DELETE = "comment_delete";
Blockly.Events.COMMENT_CHANGE = "comment_change";
Blockly.Events.COMMENT_MOVE = "comment_move";
Blockly.Events.FINISHED_LOADING = "finished_loading";
Blockly.Events.BUMP_EVENTS = [Blockly.Events.BLOCK_CREATE, Blockly.Events.BLOCK_MOVE, Blockly.Events.COMMENT_CREATE, Blockly.Events.COMMENT_MOVE];
Blockly.Events.FIRE_QUEUE_ = [];
Blockly.Events.fire = function(a) { Blockly.Events.isEnabled() && (Blockly.Events.FIRE_QUEUE_.length || setTimeout(Blockly.Events.fireNow_, 0), Blockly.Events.FIRE_QUEUE_.push(a)) };
Blockly.Events.fireNow_ = function() {
    for (var a = Blockly.Events.filter(Blockly.Events.FIRE_QUEUE_, !0), b = Blockly.Events.FIRE_QUEUE_.length = 0, c; c = a[b]; b++)
        if (c.workspaceId) {
            var d = Blockly.Workspace.getById(c.workspaceId);
            d && d.fireChangeListener(c)
        }
};
Blockly.Events.filter = function(a, b) {
    a = a.slice();
    b || a.reverse();
    for (var c = [], d = Object.create(null), e = 0, f; f = a[e]; e++)
        if (!f.isNull()) {
            var g = [f.type, f.blockId, f.workspaceId].join(" "),
                h = d[g],
                k = h ? h.event : null;
            if (!h) d[g] = { event: f, index: e }, c.push(f);
            else if (f.type == Blockly.Events.MOVE && h.index == e - 1) k.newParentId = f.newParentId, k.newInputName = f.newInputName, k.newCoordinate = f.newCoordinate, h.index = e;
            else if (f.type == Blockly.Events.CHANGE && f.element == k.element && f.name == k.name) k.newValue = f.newValue;
            else if (f.type !=
                Blockly.Events.UI || "click" != f.element || "commentOpen" != k.element && "mutatorOpen" != k.element && "warningOpen" != k.element) d[g] = { event: f, index: 1 }, c.push(f)
        }
    a = c.filter(function(a) { return !a.isNull() });
    b || a.reverse();
    for (e = 1; f = a[e]; e++) f.type == Blockly.Events.CHANGE && "mutation" == f.element && a.unshift(a.splice(e, 1)[0]);
    return a
};
Blockly.Events.clearPendingUndo = function() { for (var a = 0, b; b = Blockly.Events.FIRE_QUEUE_[a]; a++) b.recordUndo = !1 };
Blockly.Events.disable = function() { Blockly.Events.disabled_++ };
Blockly.Events.enable = function() { Blockly.Events.disabled_-- };
Blockly.Events.isEnabled = function() { return 0 == Blockly.Events.disabled_ };
Blockly.Events.getGroup = function() { return Blockly.Events.group_ };
Blockly.Events.setGroup = function(a) { Blockly.Events.group_ = "boolean" == typeof a ? a ? Blockly.utils.genUid() : "" : a };
Blockly.Events.getDescendantIds = function(a) {
    var b = [];
    a = a.getDescendants(!1);
    for (var c = 0, d; d = a[c]; c++) b[c] = d.id;
    return b
};
Blockly.Events.fromJson = function(a, b) {
    switch (a.type) {
        case Blockly.Events.CREATE:
            var c = new Blockly.Events.Create(null);
            break;
        case Blockly.Events.DELETE:
            c = new Blockly.Events.Delete(null);
            break;
        case Blockly.Events.CHANGE:
            c = new Blockly.Events.Change(null, "", "", "", "");
            break;
        case Blockly.Events.MOVE:
            c = new Blockly.Events.Move(null);
            break;
        case Blockly.Events.VAR_CREATE:
            c = new Blockly.Events.VarCreate(null);
            break;
        case Blockly.Events.VAR_DELETE:
            c = new Blockly.Events.VarDelete(null);
            break;
        case Blockly.Events.VAR_RENAME:
            c =
                new Blockly.Events.VarRename(null, "");
            break;
        case Blockly.Events.UI:
            c = new Blockly.Events.Ui(null, "", "", "");
            break;
        case Blockly.Events.COMMENT_CREATE:
            c = new Blockly.Events.CommentCreate(null);
            break;
        case Blockly.Events.COMMENT_CHANGE:
            c = new Blockly.Events.CommentChange(null, "", "");
            break;
        case Blockly.Events.COMMENT_MOVE:
            c = new Blockly.Events.CommentMove(null);
            break;
        case Blockly.Events.COMMENT_DELETE:
            c = new Blockly.Events.CommentDelete(null);
            break;
        case Blockly.Events.FINISHED_LOADING:
            c = new Blockly.Events.FinishedLoading(b);
            break;
        default:
            throw Error("Unknown event type.");
    }
    c.fromJson(a);
    c.workspaceId = b.id;
    return c
};
Blockly.Events.disableOrphans = function(a) {
    if ((a.type == Blockly.Events.MOVE || a.type == Blockly.Events.CREATE) && a.workspaceId) {
        var b = Blockly.Workspace.getById(a.workspaceId);
        if (a = b.getBlockById(a.blockId)) {
            var c = a.getParent();
            if (c && c.isEnabled())
                for (b = a.getDescendants(!1), a = 0; c = b[a]; a++) c.setEnabled(!0);
            else if ((a.outputConnection || a.previousConnection) && !b.isDragging()) { do a.setEnabled(!1), a = a.getNextBlock(); while (a) }
        }
    }
};
Blockly.Events.Abstract = function() {
    this.workspaceId = void 0;
    this.group = Blockly.Events.getGroup();
    this.recordUndo = Blockly.Events.recordUndo
};
Blockly.Events.Abstract.prototype.toJson = function() {
    var a = { type: this.type };
    this.group && (a.group = this.group);
    return a
};
Blockly.Events.Abstract.prototype.fromJson = function(a) { this.group = a.group };
Blockly.Events.Abstract.prototype.isNull = function() { return !1 };
Blockly.Events.Abstract.prototype.run = function(a) {};
Blockly.Events.Abstract.prototype.getEventWorkspace_ = function() { if (this.workspaceId) var a = Blockly.Workspace.getById(this.workspaceId); if (!a) throw Error("Workspace is null. Event must have been generated from real Blockly events."); return a };
Blockly.utils.object = {};
Blockly.utils.object.inherits = function(a, b) {
    a.superClass_ = b.prototype;
    a.prototype = Object.create(b.prototype);
    a.prototype.constructor = a
};
Blockly.utils.object.mixin = function(a, b) { for (var c in b) a[c] = b[c] };
Blockly.utils.object.deepMerge = function(a, b) { for (var c in b) a[c] = "object" === typeof b[c] ? Blockly.utils.object.deepMerge(a[c] || Object.create(null), b[c]) : b[c]; return a };
Blockly.utils.object.values = function(a) { return Object.values ? Object.values(a) : Object.keys(a).map(function(b) { return a[b] }) };
Blockly.Events.Ui = function(a, b, c, d) {
    Blockly.Events.Ui.superClass_.constructor.call(this);
    this.blockId = a ? a.id : null;
    this.workspaceId = a ? a.workspace.id : void 0;
    this.element = b;
    this.oldValue = c;
    this.newValue = d;
    this.recordUndo = !1
};
Blockly.utils.object.inherits(Blockly.Events.Ui, Blockly.Events.Abstract);
Blockly.Events.Ui.prototype.type = Blockly.Events.UI;
Blockly.Events.Ui.prototype.toJson = function() {
    var a = Blockly.Events.Ui.superClass_.toJson.call(this);
    a.element = this.element;
    void 0 !== this.newValue && (a.newValue = this.newValue);
    this.blockId && (a.blockId = this.blockId);
    return a
};
Blockly.Events.Ui.prototype.fromJson = function(a) {
    Blockly.Events.Ui.superClass_.fromJson.call(this, a);
    this.element = a.element;
    this.newValue = a.newValue;
    this.blockId = a.blockId
};
Blockly.utils.dom = {};
Blockly.utils.dom.SVG_NS = "http://www.w3.org/2000/svg";
Blockly.utils.dom.HTML_NS = "http://www.w3.org/1999/xhtml";
Blockly.utils.dom.XLINK_NS = "http://www.w3.org/1999/xlink";
Blockly.utils.dom.Node = { ELEMENT_NODE: 1, TEXT_NODE: 3, COMMENT_NODE: 8, DOCUMENT_POSITION_CONTAINED_BY: 16 };
Blockly.utils.dom.cacheWidths_ = null;
Blockly.utils.dom.cacheReference_ = 0;
Blockly.utils.dom.canvasContext_ = null;
Blockly.utils.dom.createSvgElement = function(a, b, c) {
    a = document.createElementNS(Blockly.utils.dom.SVG_NS, a);
    for (var d in b) a.setAttribute(d, b[d]);
    document.body.runtimeStyle && (a.runtimeStyle = a.currentStyle = a.style);
    c && c.appendChild(a);
    return a
};
Blockly.utils.dom.addClass = function(a, b) {
    var c = a.getAttribute("class") || "";
    if (-1 != (" " + c + " ").indexOf(" " + b + " ")) return !1;
    c && (c += " ");
    a.setAttribute("class", c + b);
    return !0
};
Blockly.utils.dom.removeClass = function(a, b) {
    var c = a.getAttribute("class");
    if (-1 == (" " + c + " ").indexOf(" " + b + " ")) return !1;
    c = c.split(/\s+/);
    for (var d = 0; d < c.length; d++) c[d] && c[d] != b || (c.splice(d, 1), d--);
    c.length ? a.setAttribute("class", c.join(" ")) : a.removeAttribute("class");
    return !0
};
Blockly.utils.dom.hasClass = function(a, b) { return -1 != (" " + a.getAttribute("class") + " ").indexOf(" " + b + " ") };
Blockly.utils.dom.removeNode = function(a) { return a && a.parentNode ? a.parentNode.removeChild(a) : null };
Blockly.utils.dom.insertAfter = function(a, b) {
    var c = b.nextSibling;
    b = b.parentNode;
    if (!b) throw Error("Reference node has no parent.");
    c ? b.insertBefore(a, c) : b.appendChild(a)
};
Blockly.utils.dom.containsNode = function(a, b) { return !!(a.compareDocumentPosition(b) & Blockly.utils.dom.Node.DOCUMENT_POSITION_CONTAINED_BY) };
Blockly.utils.dom.setCssTransform = function(a, b) {
    a.style.transform = b;
    a.style["-webkit-transform"] = b
};
Blockly.utils.dom.startTextWidthCache = function() {
    Blockly.utils.dom.cacheReference_++;
    Blockly.utils.dom.cacheWidths_ || (Blockly.utils.dom.cacheWidths_ = {})
};
Blockly.utils.dom.stopTextWidthCache = function() {
    Blockly.utils.dom.cacheReference_--;
    Blockly.utils.dom.cacheReference_ || (Blockly.utils.dom.cacheWidths_ = null)
};
Blockly.utils.dom.getTextWidth = function(a) {
    var b = a.textContent + "\n" + a.className.baseVal,
        c;
    if (Blockly.utils.dom.cacheWidths_ && (c = Blockly.utils.dom.cacheWidths_[b])) return c;
    try { c = Blockly.utils.userAgent.IE || Blockly.utils.userAgent.EDGE ? a.getBBox().width : a.getComputedTextLength() } catch (d) { return 8 * a.textContent.length }
    Blockly.utils.dom.cacheWidths_ && (Blockly.utils.dom.cacheWidths_[b] = c);
    return c
};
Blockly.utils.dom.getFastTextWidth = function(a, b, c, d) { return Blockly.utils.dom.getFastTextWidthWithSizeString(a, b + "pt", c, d) };
Blockly.utils.dom.getFastTextWidthWithSizeString = function(a, b, c, d) {
    var e = a.textContent;
    a = e + "\n" + a.className.baseVal;
    var f;
    if (Blockly.utils.dom.cacheWidths_ && (f = Blockly.utils.dom.cacheWidths_[a])) return f;
    Blockly.utils.dom.canvasContext_ || (f = document.createElement("canvas"), f.className = "blocklyComputeCanvas", document.body.appendChild(f), Blockly.utils.dom.canvasContext_ = f.getContext("2d"));
    Blockly.utils.dom.canvasContext_.font = c + " " + b + " " + d;
    f = Blockly.utils.dom.canvasContext_.measureText(e).width;
    Blockly.utils.dom.cacheWidths_ &&
        (Blockly.utils.dom.cacheWidths_[a] = f);
    return f
};
Blockly.utils.dom.measureFontMetrics = function(a, b, c, d) {
    var e = document.createElement("span");
    e.style.font = c + " " + b + " " + d;
    e.textContent = a;
    a = document.createElement("div");
    a.style.width = "1px";
    a.style.height = "0px";
    b = document.createElement("div");
    b.setAttribute("style", "position: fixed; top: 0; left: 0; display: flex;");
    b.appendChild(e);
    b.appendChild(a);
    document.body.appendChild(b);
    try {
        c = {}, b.style.alignItems = "baseline", c.baseline = a.offsetTop - e.offsetTop, b.style.alignItems = "flex-end", c.height = a.offsetTop -
            e.offsetTop
    } finally { document.body.removeChild(b) }
    return c
};
Blockly.BlockDragSurfaceSvg = function(a) {
    this.container_ = a;
    this.createDom()
};
Blockly.BlockDragSurfaceSvg.prototype.SVG_ = null;
Blockly.BlockDragSurfaceSvg.prototype.dragGroup_ = null;
Blockly.BlockDragSurfaceSvg.prototype.container_ = null;
Blockly.BlockDragSurfaceSvg.prototype.scale_ = 1;
Blockly.BlockDragSurfaceSvg.prototype.surfaceXY_ = null;
Blockly.BlockDragSurfaceSvg.prototype.createDom = function() { this.SVG_ || (this.SVG_ = Blockly.utils.dom.createSvgElement("svg", { xmlns: Blockly.utils.dom.SVG_NS, "xmlns:html": Blockly.utils.dom.HTML_NS, "xmlns:xlink": Blockly.utils.dom.XLINK_NS, version: "1.1", "class": "blocklyBlockDragSurface" }, this.container_), this.dragGroup_ = Blockly.utils.dom.createSvgElement("g", {}, this.SVG_)) };
Blockly.BlockDragSurfaceSvg.prototype.setBlocksAndShow = function(a) {
    if (this.dragGroup_.childNodes.length) throw Error("Already dragging a block.");
    this.dragGroup_.appendChild(a);
    this.SVG_.style.display = "block";
    this.surfaceXY_ = new Blockly.utils.Coordinate(0, 0)
};
Blockly.BlockDragSurfaceSvg.prototype.translateAndScaleGroup = function(a, b, c) {
    this.scale_ = c;
    a = a.toFixed(0);
    b = b.toFixed(0);
    this.dragGroup_.setAttribute("transform", "translate(" + a + "," + b + ") scale(" + c + ")")
};
Blockly.BlockDragSurfaceSvg.prototype.translateSurfaceInternal_ = function() {
    var a = this.surfaceXY_.x,
        b = this.surfaceXY_.y;
    a = a.toFixed(0);
    b = b.toFixed(0);
    this.SVG_.style.display = "block";
    Blockly.utils.dom.setCssTransform(this.SVG_, "translate3d(" + a + "px, " + b + "px, 0px)")
};
Blockly.BlockDragSurfaceSvg.prototype.translateSurface = function(a, b) {
    this.surfaceXY_ = new Blockly.utils.Coordinate(a * this.scale_, b * this.scale_);
    this.translateSurfaceInternal_()
};
Blockly.BlockDragSurfaceSvg.prototype.getSurfaceTranslation = function() { var a = Blockly.utils.getRelativeXY(this.SVG_); return new Blockly.utils.Coordinate(a.x / this.scale_, a.y / this.scale_) };
Blockly.BlockDragSurfaceSvg.prototype.getGroup = function() { return this.dragGroup_ };
Blockly.BlockDragSurfaceSvg.prototype.getCurrentBlock = function() { return this.dragGroup_.firstChild };
Blockly.BlockDragSurfaceSvg.prototype.clearAndHide = function(a) {
    a ? a.appendChild(this.getCurrentBlock()) : this.dragGroup_.removeChild(this.getCurrentBlock());
    this.SVG_.style.display = "none";
    if (this.dragGroup_.childNodes.length) throw Error("Drag group was not cleared.");
    this.surfaceXY_ = null
};
Blockly.utils.IdGenerator = {};
Blockly.utils.IdGenerator.nextId_ = 0;
Blockly.utils.IdGenerator.getNextUniqueId = function() { return "blockly:" + (Blockly.utils.IdGenerator.nextId_++).toString(36) };
Blockly.Component = function() {
    this.rightToLeft_ = Blockly.Component.defaultRightToLeft;
    this.id_ = null;
    this.inDocument_ = !1;
    this.parent_ = this.element_ = null;
    this.children_ = [];
    this.childIndex_ = {}
};
Blockly.Component.defaultRightToLeft = !1;
Blockly.Component.Error = { ALREADY_RENDERED: "Component already rendered", PARENT_UNABLE_TO_BE_SET: "Unable to set parent component", CHILD_INDEX_OUT_OF_BOUNDS: "Child component index out of bounds" };
Blockly.Component.prototype.getId = function() { return this.id_ || (this.id_ = Blockly.utils.IdGenerator.getNextUniqueId()) };
Blockly.Component.prototype.getElement = function() { return this.element_ };
Blockly.Component.prototype.setElementInternal = function(a) { this.element_ = a };
Blockly.Component.prototype.setParent = function(a) {
    if (this == a) throw Error(Blockly.Component.Error.PARENT_UNABLE_TO_BE_SET);
    if (a && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != a) throw Error(Blockly.Component.Error.PARENT_UNABLE_TO_BE_SET);
    this.parent_ = a
};
Blockly.Component.prototype.getParent = function() { return this.parent_ };
Blockly.Component.prototype.isInDocument = function() { return this.inDocument_ };
Blockly.Component.prototype.createDom = function() { this.element_ = document.createElement("div") };
Blockly.Component.prototype.render = function(a) { this.render_(a) };
Blockly.Component.prototype.renderBefore = function(a) { this.render_(a.parentNode, a) };
Blockly.Component.prototype.render_ = function(a, b) {
    if (this.inDocument_) throw Error(Blockly.Component.Error.ALREADY_RENDERED);
    this.element_ || this.createDom();
    a ? a.insertBefore(this.element_, b || null) : document.body.appendChild(this.element_);
    this.parent_ && !this.parent_.isInDocument() || this.enterDocument()
};
Blockly.Component.prototype.enterDocument = function() {
    this.inDocument_ = !0;
    this.forEachChild(function(a) {!a.isInDocument() && a.getElement() && a.enterDocument() })
};
Blockly.Component.prototype.exitDocument = function() {
    this.forEachChild(function(a) { a.isInDocument() && a.exitDocument() });
    this.inDocument_ = !1
};
Blockly.Component.prototype.dispose = function() { this.disposed_ || (this.disposed_ = !0, this.disposeInternal()) };
Blockly.Component.prototype.disposeInternal = function() {
    this.inDocument_ && this.exitDocument();
    this.forEachChild(function(a) { a.dispose() });
    this.element_ && Blockly.utils.dom.removeNode(this.element_);
    this.parent_ = this.element_ = this.childIndex_ = this.children_ = null
};
Blockly.Component.prototype.addChild = function(a, b) { this.addChildAt(a, this.getChildCount(), b) };
Blockly.Component.prototype.addChildAt = function(a, b, c) {
    if (a.inDocument_ && (c || !this.inDocument_)) throw Error(Blockly.Component.Error.ALREADY_RENDERED);
    if (0 > b || b > this.getChildCount()) throw Error(Blockly.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);
    this.childIndex_[a.getId()] = a;
    if (a.getParent() == this) { var d = this.children_.indexOf(a); - 1 < d && this.children_.splice(d, 1) }
    a.setParent(this);
    this.children_.splice(b, 0, a);
    a.inDocument_ && this.inDocument_ && a.getParent() == this ? (c = this.getContentElement(), b = c.childNodes[b] ||
        null, b != a.getElement() && c.insertBefore(a.getElement(), b)) : c ? (this.element_ || this.createDom(), b = this.getChildAt(b + 1), a.render_(this.getContentElement(), b ? b.element_ : null)) : this.inDocument_ && !a.inDocument_ && a.element_ && a.element_.parentNode && a.element_.parentNode.nodeType == Blockly.utils.dom.Node.ELEMENT_NODE && a.enterDocument()
};
Blockly.Component.prototype.getContentElement = function() { return this.element_ };
Blockly.Component.prototype.setRightToLeft = function(a) {
    if (this.inDocument_) throw Error(Blockly.Component.Error.ALREADY_RENDERED);
    this.rightToLeft_ = a
};
Blockly.Component.prototype.hasChildren = function() { return 0 != this.children_.length };
Blockly.Component.prototype.getChildCount = function() { return this.children_.length };
Blockly.Component.prototype.getChild = function(a) { return a ? this.childIndex_[a] || null : null };
Blockly.Component.prototype.getChildAt = function(a) { return this.children_[a] || null };
Blockly.Component.prototype.forEachChild = function(a, b) { for (var c = 0; c < this.children_.length; c++) a.call(b, this.children_[c], c) };
Blockly.Component.prototype.indexOfChild = function(a) { return this.children_.indexOf(a) };
Blockly.Css = {};
Blockly.Css.injected_ = !1;
Blockly.Css.register = function(a) {
    if (Blockly.Css.injected_) throw Error("CSS already injected");
    Array.prototype.push.apply(Blockly.Css.CONTENT, a);
    a.length = 0
};
Blockly.Css.inject = function(a, b) {
    if (!Blockly.Css.injected_) {
        Blockly.Css.injected_ = !0;
        var c = Blockly.Css.CONTENT.join("\n");
        Blockly.Css.CONTENT.length = 0;
        a && (a = b.replace(/[\\/]$/, ""), c = c.replace(/<<<PATH>>>/g, a), a = document.createElement("style"), a.id = "blockly-common-style", c = document.createTextNode(c), a.appendChild(c), document.head.insertBefore(a, document.head.firstChild))
    }
};
Blockly.Css.setCursor = function(a) { console.warn("Deprecated call to Blockly.Css.setCursor.") };
Blockly.Css.CONTENT = [".blocklySvg {", "background-color: #fff;", "outline: none;", "overflow: hidden;", "position: absolute;", "display: block;", "}", ".blocklyWidgetDiv {", "display: none;", "position: absolute;", "z-index: 99999;", "}", ".injectionDiv {", "height: 100%;", "position: relative;", "overflow: hidden;", "touch-action: none;", "}", ".blocklyNonSelectable {", "user-select: none;", "-ms-user-select: none;", "-webkit-user-select: none;", "}", ".blocklyWsDragSurface {", "display: none;", "position: absolute;", "top: 0;",
    "left: 0;", "}", ".blocklyWsDragSurface.blocklyOverflowVisible {", "overflow: visible;", "}", ".blocklyBlockDragSurface {", "display: none;", "position: absolute;", "top: 0;", "left: 0;", "right: 0;", "bottom: 0;", "overflow: visible !important;", "z-index: 50;", "}", ".blocklyBlockCanvas.blocklyCanvasTransitioning,", ".blocklyBubbleCanvas.blocklyCanvasTransitioning {", "transition: transform .5s;", "}", ".blocklyTooltipDiv {", "background-color: #fff;", "border: 1px solid #ddc;", "box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);",
    "color: #000;", "display: none;", "font-family: sans-serif;", "font-size: 9pt;", "opacity: .9;", "padding: 2px;", "position: absolute;", "z-index: 100000;", "}", ".blocklyDropDownDiv {", "position: absolute;", "left: 0;", "top: 0;", "z-index: 1000;", "display: none;", "border: 1px solid;", "border-color: #dadce0;", "background-color: #fff;", "border-radius: 2px;", "padding: 4px;", "box-shadow: 0px 0px 3px 1px rgba(0,0,0,.3);", "}", ".blocklyDropDownDiv.focused {", "box-shadow: 0px 0px 6px 1px rgba(0,0,0,.3);", "}", ".blocklyDropDownContent {",
    "max-height: 300px;", "overflow: auto;", "overflow-x: hidden;", "}", ".blocklyDropDownArrow {", "position: absolute;", "left: 0;", "top: 0;", "width: 16px;", "height: 16px;", "z-index: -1;", "background-color: #fff;", "border-color: inherit;", "}", ".blocklyDropDownButton {", "display: inline-block;", "float: left;", "padding: 0;", "margin: 4px;", "border-radius: 4px;", "outline: none;", "border: 1px solid;", "transition: box-shadow .1s;", "cursor: pointer;", "}", ".blocklyArrowTop {", "border-top: 1px solid;", "border-left: 1px solid;",
    "border-top-left-radius: 4px;", "border-color: inherit;", "}", ".blocklyArrowBottom {", "border-bottom: 1px solid;", "border-right: 1px solid;", "border-bottom-right-radius: 4px;", "border-color: inherit;", "}", ".blocklyResizeSE {", "cursor: se-resize;", "fill: #aaa;", "}", ".blocklyResizeSW {", "cursor: sw-resize;", "fill: #aaa;", "}", ".blocklyResizeLine {", "stroke: #515A5A;", "stroke-width: 1;", "}", ".blocklyHighlightedConnectionPath {", "fill: none;", "stroke: #fc3;", "stroke-width: 4px;", "}", ".blocklyPathLight {",
    "fill: none;", "stroke-linecap: round;", "stroke-width: 1;", "}", ".blocklySelected>.blocklyPathLight {", "display: none;", "}", ".blocklyDraggable {", 'cursor: url("<<<PATH>>>/handopen.cur"), auto;', "cursor: grab;", "cursor: -webkit-grab;", "}", ".blocklyDragging {", 'cursor: url("<<<PATH>>>/handclosed.cur"), auto;', "cursor: grabbing;", "cursor: -webkit-grabbing;", "}", ".blocklyDraggable:active {", 'cursor: url("<<<PATH>>>/handclosed.cur"), auto;', "cursor: grabbing;", "cursor: -webkit-grabbing;", "}", ".blocklyBlockDragSurface .blocklyDraggable {",
    'cursor: url("<<<PATH>>>/handclosed.cur"), auto;', "cursor: grabbing;", "cursor: -webkit-grabbing;", "}", ".blocklyDragging.blocklyDraggingDelete {", 'cursor: url("<<<PATH>>>/handdelete.cur"), auto;', "}", ".blocklyDragging>.blocklyPath,", ".blocklyDragging>.blocklyPathLight {", "fill-opacity: .8;", "stroke-opacity: .8;", "}", ".blocklyDragging>.blocklyPathDark {", "display: none;", "}", ".blocklyDisabled>.blocklyPath {", "fill-opacity: .5;", "stroke-opacity: .5;", "}", ".blocklyDisabled>.blocklyPathLight,", ".blocklyDisabled>.blocklyPathDark {",
    "display: none;", "}", ".blocklyInsertionMarker>.blocklyPath,", ".blocklyInsertionMarker>.blocklyPathLight,", ".blocklyInsertionMarker>.blocklyPathDark {", "fill-opacity: .2;", "stroke: none", "}", ".blocklyMultilineText {", "font-family: monospace;", "}", ".blocklyNonEditableText>text {", "pointer-events: none;", "}", ".blocklyFlyout {", "position: absolute;", "z-index: 20;", "}", ".blocklyText text {", "cursor: default;", "}", ".blocklySvg text, .blocklyBlockDragSurface text {", "user-select: none;", "-ms-user-select: none;",
    "-webkit-user-select: none;", "cursor: inherit;", "}", ".blocklyHidden {", "display: none;", "background: #fff", "}", ".blocklyFieldDropdown:not(.blocklyHidden) {", "display: block;", "}", ".blocklyIconGroup {", "cursor: default;", "}", ".blocklyIconGroup:not(:hover),", ".blocklyIconGroupReadonly {", "opacity: .6;", "}", ".blocklyIconShape {", "fill: #00f;", "stroke: #fff;", "stroke-width: 1px;", "}", ".blocklyIconSymbol {", "fill: #fff;", "}", ".blocklyMinimalBody {", "margin: 0;", "padding: 0;", "}", ".blocklyHtmlInput {", "border: none;", "border-radius: 4px;",
    "height: 100%;", "margin: 0;", "outline: none;", "padding: 0;", "width: 100%;", "text-align: center;", "display: block;", "box-sizing: border-box;", "}", ".blocklyHtmlInput::-ms-clear {", "display: none;", "}", ".blocklyMainBackground {", "stroke-width: 1;", "stroke: #fff;", "}", ".blocklyMutatorBackground {", "fill: #fff;", "stroke: #ddd;", "stroke-width: 1;", "}", ".blocklyFlyoutBackground {", "fill: #fff;", "fill-opacity: .8;", "}", ".blocklyMainWorkspaceScrollbar {", "z-index: 20;", "}", ".blocklyFlyoutScrollbar {", "z-index: 30;",
    "}", ".blocklyScrollbarHorizontal, .blocklyScrollbarVertical {", "position: absolute;", "outline: none;", "}", ".blocklyScrollbarBackground {", "opacity: 0;", "}", ".blocklyScrollbarHandle {", "fill: #ccc;", "}", ".blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,", ".blocklyScrollbarHandle:hover {", "fill: #bbb;", "}", ".blocklyFlyout .blocklyScrollbarHandle {", "fill: #bbb;", "}", ".blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,", ".blocklyFlyout .blocklyScrollbarHandle:hover {",
    "fill: #aaa;", "}", ".blocklyInvalidInput {", "background: #fff;", "}", ".blocklyContextMenu {", "border-radius: 4px;", "max-height: 100%;", "}", ".blocklyDropdownMenu {", "border-radius: 2px;", "padding: 0 !important;", "}", ".blocklyWidgetDiv .blocklyDropdownMenu .goog-menuitem,", ".blocklyDropDownDiv .blocklyDropdownMenu .goog-menuitem {", "padding-left: 28px;", "}", ".blocklyWidgetDiv .blocklyDropdownMenu .goog-menuitem.goog-menuitem-rtl,", ".blocklyDropDownDiv .blocklyDropdownMenu .goog-menuitem.goog-menuitem-rtl {",
    "padding-left: 5px;", "padding-right: 28px;", "}", ".blocklyVerticalMarker {", "stroke-width: 3px;", "fill: rgba(255,255,255,.5);", "pointer-events: none", "}", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon,", ".blocklyDropDownDiv .goog-option-selected .goog-menuitem-checkbox,", ".blocklyDropDownDiv .goog-option-selected .goog-menuitem-icon {", "background: url() no-repeat -48px -16px;", "}", ".blocklyWidgetDiv .goog-menu {",
    "background: #fff;", "border-color: transparent;", "border-style: solid;", "border-width: 1px;", "cursor: default;", "font: normal 13px Arial, sans-serif;", "margin: 0;", "outline: none;", "padding: 4px 0;", "position: absolute;", "overflow-y: auto;", "overflow-x: hidden;", "max-height: 100%;", "z-index: 20000;", "box-shadow: 0px 0px 3px 1px rgba(0,0,0,.3);", "}", ".blocklyWidgetDiv .goog-menu.focused {", "box-shadow: 0px 0px 6px 1px rgba(0,0,0,.3);", "}", ".blocklyDropDownDiv .goog-menu {", "cursor: default;", 'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
    "outline: none;", "z-index: 20000;", "}", ".blocklyWidgetDiv .goog-menuitem,", ".blocklyDropDownDiv .goog-menuitem {", "color: #000;", "font: normal 13px Arial, sans-serif;", "list-style: none;", "margin: 0;", "min-width: 7em;", "border: none;", "padding: 6px 15px;", "white-space: nowrap;", "cursor: pointer;", "}", ".blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,", ".blocklyWidgetDiv .goog-menu-noicon .goog-menuitem,", ".blocklyDropDownDiv .goog-menu-nocheckbox .goog-menuitem,", ".blocklyDropDownDiv .goog-menu-noicon .goog-menuitem {",
    "padding-left: 12px;", "}", ".blocklyWidgetDiv .goog-menuitem-content,", ".blocklyDropDownDiv .goog-menuitem-content {", "font-family: Arial, sans-serif;", "font-size: 13px;", "}", ".blocklyWidgetDiv .goog-menuitem-content {", "color: #000;", "}", ".blocklyDropDownDiv .goog-menuitem-content {", "color: #000;", "}", ".blocklyWidgetDiv .goog-menuitem-disabled,", ".blocklyDropDownDiv .goog-menuitem-disabled {", "cursor: inherit;", "}", ".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content,", ".blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-content {",
    "color: #ccc !important;", "}", ".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon,", ".blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-icon {", "opacity: .3;", "filter: alpha(opacity=30);", "}", ".blocklyWidgetDiv .goog-menuitem-highlight ,", ".blocklyDropDownDiv .goog-menuitem-highlight {", "background-color: #fff;", "}", ".blocklyWidgetDiv .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-menuitem-icon,", ".blocklyDropDownDiv .goog-menuitem-checkbox,", ".blocklyDropDownDiv .goog-menuitem-icon {",
    "background-repeat: no-repeat;", "height: 16px;", "left: 6px;", "position: absolute;", "right: auto;", "vertical-align: middle;", "width: 16px;", "}", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon,", ".blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-checkbox,", ".blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-icon {", "left: auto;", "right: 6px;", "}", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon,",
    ".blocklyDropDownDiv .goog-option-selected .goog-menuitem-checkbox,", ".blocklyDropDownDiv .goog-option-selected .goog-menuitem-icon {", "position: static;", "float: left;", "margin-left: -24px;", "}", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,", ".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon,", ".blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-checkbox,", ".blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-icon {", "float: right;", "margin-right: -24px;", "}", ".blocklyComputeCanvas {",
    "position: absolute;", "width: 0;", "height: 0;", "}", ".blocklyNoPointerEvents {", "pointer-events: none;", "}"
];
Blockly.utils.math = {};
Blockly.utils.math.toRadians = function(a) { return a * Math.PI / 180 };
Blockly.utils.math.toDegrees = function(a) { return 180 * a / Math.PI };
Blockly.utils.math.clamp = function(a, b, c) {
    if (c < a) {
        var d = c;
        c = a;
        a = d
    }
    return Math.max(a, Math.min(b, c))
};
Blockly.DropDownDiv = function() {};
Blockly.DropDownDiv.boundsElement_ = null;
Blockly.DropDownDiv.owner_ = null;
Blockly.DropDownDiv.positionToField_ = null;
Blockly.DropDownDiv.ARROW_SIZE = 16;
Blockly.DropDownDiv.BORDER_SIZE = 1;
Blockly.DropDownDiv.ARROW_HORIZONTAL_PADDING = 12;
Blockly.DropDownDiv.PADDING_Y = 16;
Blockly.DropDownDiv.ANIMATION_TIME = .25;
Blockly.DropDownDiv.animateOutTimer_ = null;
Blockly.DropDownDiv.onHide_ = null;
Blockly.DropDownDiv.rendererClassName_ = "";
Blockly.DropDownDiv.themeClassName_ = "";
Blockly.DropDownDiv.createDom = function() {
    if (!Blockly.DropDownDiv.DIV_) {
        var a = document.createElement("div");
        a.className = "blocklyDropDownDiv";
        (Blockly.parentContainer || document.body).appendChild(a);
        Blockly.DropDownDiv.DIV_ = a;
        var b = document.createElement("div");
        b.className = "blocklyDropDownContent";
        a.appendChild(b);
        Blockly.DropDownDiv.content_ = b;
        b = document.createElement("div");
        b.className = "blocklyDropDownArrow";
        a.appendChild(b);
        Blockly.DropDownDiv.arrow_ = b;
        Blockly.DropDownDiv.DIV_.style.opacity = 0;
        Blockly.DropDownDiv.DIV_.style.transition =
            "transform " + Blockly.DropDownDiv.ANIMATION_TIME + "s, opacity " + Blockly.DropDownDiv.ANIMATION_TIME + "s";
        a.addEventListener("focusin", function() { Blockly.utils.dom.addClass(a, "focused") });
        a.addEventListener("focusout", function() { Blockly.utils.dom.removeClass(a, "focused") })
    }
};
Blockly.DropDownDiv.setBoundsElement = function(a) { Blockly.DropDownDiv.boundsElement_ = a };
Blockly.DropDownDiv.getContentDiv = function() { return Blockly.DropDownDiv.content_ };
Blockly.DropDownDiv.clearContent = function() {
    Blockly.DropDownDiv.content_.textContent = "";
    Blockly.DropDownDiv.content_.style.width = ""
};
Blockly.DropDownDiv.setColour = function(a, b) {
    Blockly.DropDownDiv.DIV_.style.backgroundColor = a;
    Blockly.DropDownDiv.DIV_.style.borderColor = b
};
Blockly.DropDownDiv.showPositionedByBlock = function(a, b, c, d) { return Blockly.DropDownDiv.showPositionedByRect_(Blockly.DropDownDiv.getScaledBboxOfBlock_(b), a, c, d) };
Blockly.DropDownDiv.showPositionedByField = function(a, b, c) { Blockly.DropDownDiv.positionToField_ = !0; return Blockly.DropDownDiv.showPositionedByRect_(Blockly.DropDownDiv.getScaledBboxOfField_(a), a, b, c) };
Blockly.DropDownDiv.getScaledBboxOfBlock_ = function(a) {
    var b = a.getSvgRoot(),
        c = b.getBBox(),
        d = a.workspace.scale;
    a = c.height * d;
    c = c.width * d;
    b = Blockly.utils.style.getPageOffset(b);
    return new Blockly.utils.Rect(b.y, b.y + a, b.x, b.x + c)
};
Blockly.DropDownDiv.getScaledBboxOfField_ = function(a) { a = a.getScaledBBox(); return new Blockly.utils.Rect(a.top, a.bottom, a.left, a.right) };
Blockly.DropDownDiv.showPositionedByRect_ = function(a, b, c, d) {
    var e = a.left + (a.right - a.left) / 2,
        f = a.bottom;
    a = a.top;
    d && (a += d);
    d = b.getSourceBlock();
    Blockly.DropDownDiv.setBoundsElement(d.workspace.getParentSvg().parentNode);
    return Blockly.DropDownDiv.show(b, d.RTL, e, f, e, a, c)
};
Blockly.DropDownDiv.show = function(a, b, c, d, e, f, g) {
    Blockly.DropDownDiv.owner_ = a;
    Blockly.DropDownDiv.onHide_ = g || null;
    a = Blockly.DropDownDiv.DIV_;
    a.style.direction = b ? "rtl" : "ltr";
    Blockly.DropDownDiv.rendererClassName_ = Blockly.getMainWorkspace().getRenderer().getClassName();
    Blockly.DropDownDiv.themeClassName_ = Blockly.getMainWorkspace().getTheme().getClassName();
    Blockly.utils.dom.addClass(a, Blockly.DropDownDiv.rendererClassName_);
    Blockly.utils.dom.addClass(a, Blockly.DropDownDiv.themeClassName_);
    return Blockly.DropDownDiv.positionInternal_(c,
        d, e, f)
};
Blockly.DropDownDiv.getBoundsInfo_ = function() {
    var a = Blockly.utils.style.getPageOffset(Blockly.DropDownDiv.boundsElement_),
        b = Blockly.utils.style.getSize(Blockly.DropDownDiv.boundsElement_);
    return { left: a.x, right: a.x + b.width, top: a.y, bottom: a.y + b.height, width: b.width, height: b.height }
};
Blockly.DropDownDiv.getPositionMetrics_ = function(a, b, c, d) {
    var e = Blockly.DropDownDiv.getBoundsInfo_(),
        f = Blockly.utils.style.getSize(Blockly.DropDownDiv.DIV_);
    return b + f.height < e.bottom ? Blockly.DropDownDiv.getPositionBelowMetrics_(a, b, e, f) : d - f.height > e.top ? Blockly.DropDownDiv.getPositionAboveMetrics_(c, d, e, f) : b + f.height < document.documentElement.clientHeight ? Blockly.DropDownDiv.getPositionBelowMetrics_(a, b, e, f) : d - f.height > document.documentElement.clientTop ? Blockly.DropDownDiv.getPositionAboveMetrics_(c,
        d, e, f) : Blockly.DropDownDiv.getPositionTopOfPageMetrics_(a, e, f)
};
Blockly.DropDownDiv.getPositionBelowMetrics_ = function(a, b, c, d) { a = Blockly.DropDownDiv.getPositionX(a, c.left, c.right, d.width); return { initialX: a.divX, initialY: b, finalX: a.divX, finalY: b + Blockly.DropDownDiv.PADDING_Y, arrowX: a.arrowX, arrowY: -(Blockly.DropDownDiv.ARROW_SIZE / 2 + Blockly.DropDownDiv.BORDER_SIZE), arrowAtTop: !0, arrowVisible: !0 } };
Blockly.DropDownDiv.getPositionAboveMetrics_ = function(a, b, c, d) { a = Blockly.DropDownDiv.getPositionX(a, c.left, c.right, d.width); return { initialX: a.divX, initialY: b - d.height, finalX: a.divX, finalY: b - d.height - Blockly.DropDownDiv.PADDING_Y, arrowX: a.arrowX, arrowY: d.height - 2 * Blockly.DropDownDiv.BORDER_SIZE - Blockly.DropDownDiv.ARROW_SIZE / 2, arrowAtTop: !1, arrowVisible: !0 } };
Blockly.DropDownDiv.getPositionTopOfPageMetrics_ = function(a, b, c) { a = Blockly.DropDownDiv.getPositionX(a, b.left, b.right, c.width); return { initialX: a.divX, initialY: 0, finalX: a.divX, finalY: 0, arrowVisible: !1 } };
Blockly.DropDownDiv.getPositionX = function(a, b, c, d) {
    var e = a;
    a = Blockly.utils.math.clamp(b, a - d / 2, c - d);
    e -= Blockly.DropDownDiv.ARROW_SIZE / 2;
    b = Blockly.DropDownDiv.ARROW_HORIZONTAL_PADDING;
    d = Blockly.utils.math.clamp(b, e - a, d - b - Blockly.DropDownDiv.ARROW_SIZE);
    return { arrowX: d, divX: a }
};
Blockly.DropDownDiv.isVisible = function() { return !!Blockly.DropDownDiv.owner_ };
Blockly.DropDownDiv.hideIfOwner = function(a, b) { return Blockly.DropDownDiv.owner_ === a ? (b ? Blockly.DropDownDiv.hideWithoutAnimation() : Blockly.DropDownDiv.hide(), !0) : !1 };
Blockly.DropDownDiv.hide = function() {
    var a = Blockly.DropDownDiv.DIV_;
    a.style.transform = "translate(0, 0)";
    a.style.opacity = 0;
    Blockly.DropDownDiv.animateOutTimer_ = setTimeout(function() { Blockly.DropDownDiv.hideWithoutAnimation() }, 1E3 * Blockly.DropDownDiv.ANIMATION_TIME);
    Blockly.DropDownDiv.onHide_ && (Blockly.DropDownDiv.onHide_(), Blockly.DropDownDiv.onHide_ = null)
};
Blockly.DropDownDiv.hideWithoutAnimation = function() {
    if (Blockly.DropDownDiv.isVisible()) {
        Blockly.DropDownDiv.animateOutTimer_ && clearTimeout(Blockly.DropDownDiv.animateOutTimer_);
        var a = Blockly.DropDownDiv.DIV_;
        a.style.transform = "";
        a.style.left = "";
        a.style.top = "";
        a.style.opacity = 0;
        a.style.display = "none";
        a.style.backgroundColor = "#fff;";
        a.style.borderColor = "";
        Blockly.DropDownDiv.onHide_ && (Blockly.DropDownDiv.onHide_(), Blockly.DropDownDiv.onHide_ = null);
        Blockly.DropDownDiv.clearContent();
        Blockly.DropDownDiv.owner_ =
            null;
        Blockly.DropDownDiv.rendererClassName_ && (Blockly.utils.dom.removeClass(a, Blockly.DropDownDiv.rendererClassName_), Blockly.DropDownDiv.rendererClassName_ = "");
        Blockly.DropDownDiv.themeClassName_ && (Blockly.utils.dom.removeClass(a, Blockly.DropDownDiv.themeClassName_), Blockly.DropDownDiv.themeClassName_ = "");
        Blockly.getMainWorkspace().markFocused()
    }
};
Blockly.DropDownDiv.positionInternal_ = function(a, b, c, d) {
    a = Blockly.DropDownDiv.getPositionMetrics_(a, b, c, d);
    a.arrowVisible ? (Blockly.DropDownDiv.arrow_.style.display = "", Blockly.DropDownDiv.arrow_.style.transform = "translate(" + a.arrowX + "px," + a.arrowY + "px) rotate(45deg)", Blockly.DropDownDiv.arrow_.setAttribute("class", a.arrowAtTop ? "blocklyDropDownArrow blocklyArrowTop" : "blocklyDropDownArrow blocklyArrowBottom")) : Blockly.DropDownDiv.arrow_.style.display = "none";
    b = Math.floor(a.initialX);
    c = Math.floor(a.initialY);
    d = Math.floor(a.finalX);
    var e = Math.floor(a.finalY),
        f = Blockly.DropDownDiv.DIV_;
    f.style.left = b + "px";
    f.style.top = c + "px";
    f.style.display = "block";
    f.style.opacity = 1;
    f.style.transform = "translate(" + (d - b) + "px," + (e - c) + "px)";
    return a.arrowAtTop
};
Blockly.DropDownDiv.repositionForWindowResize = function() {
    if (Blockly.DropDownDiv.owner_) {
        var a = Blockly.DropDownDiv.owner_,
            b = Blockly.DropDownDiv.owner_.getSourceBlock();
        a = Blockly.DropDownDiv.positionToField_ ? Blockly.DropDownDiv.getScaledBboxOfField_(a) : Blockly.DropDownDiv.getScaledBboxOfBlock_(b);
        b = a.left + (a.right - a.left) / 2;
        Blockly.DropDownDiv.positionInternal_(b, a.bottom, b, a.top)
    } else Blockly.DropDownDiv.hide()
};
Blockly.Grid = function(a, b) {
    this.gridPattern_ = a;
    this.spacing_ = b.spacing;
    this.length_ = b.length;
    this.line2_ = (this.line1_ = a.firstChild) && this.line1_.nextSibling;
    this.snapToGrid_ = b.snap
};
Blockly.Grid.prototype.scale_ = 1;
Blockly.Grid.prototype.dispose = function() { this.gridPattern_ = null };
Blockly.Grid.prototype.shouldSnap = function() { return this.snapToGrid_ };
Blockly.Grid.prototype.getSpacing = function() { return this.spacing_ };
Blockly.Grid.prototype.getPatternId = function() { return this.gridPattern_.id };
Blockly.Grid.prototype.update = function(a) {
    this.scale_ = a;
    var b = this.spacing_ * a || 100;
    this.gridPattern_.setAttribute("width", b);
    this.gridPattern_.setAttribute("height", b);
    b = Math.floor(this.spacing_ / 2) + .5;
    var c = b - this.length_ / 2,
        d = b + this.length_ / 2;
    b *= a;
    c *= a;
    d *= a;
    this.setLineAttributes_(this.line1_, a, c, d, b, b);
    this.setLineAttributes_(this.line2_, a, b, b, c, d)
};
Blockly.Grid.prototype.setLineAttributes_ = function(a, b, c, d, e, f) { a && (a.setAttribute("stroke-width", b), a.setAttribute("x1", c), a.setAttribute("y1", e), a.setAttribute("x2", d), a.setAttribute("y2", f)) };
Blockly.Grid.prototype.moveTo = function(a, b) {
    this.gridPattern_.setAttribute("x", a);
    this.gridPattern_.setAttribute("y", b);
    (Blockly.utils.userAgent.IE || Blockly.utils.userAgent.EDGE) && this.update(this.scale_)
};
Blockly.Grid.createDom = function(a, b, c) {
    a = Blockly.utils.dom.createSvgElement("pattern", { id: "blocklyGridPattern" + a, patternUnits: "userSpaceOnUse" }, c);
    0 < b.length && 0 < b.spacing ? (Blockly.utils.dom.createSvgElement("line", { stroke: b.colour }, a), 1 < b.length && Blockly.utils.dom.createSvgElement("line", { stroke: b.colour }, a)) : Blockly.utils.dom.createSvgElement("line", {}, a);
    return a
};
Blockly.Theme = function(a, b, c, d) {
    this.name = a;
    this.blockStyles = b || Object.create(null);
    this.categoryStyles = c || Object.create(null);
    this.componentStyles = d || Object.create(null);
    this.fontStyle = Object.create(null);
    this.startHats = null
};
Blockly.Theme.prototype.getClassName = function() { return this.name + "-theme" };
Blockly.Theme.prototype.setBlockStyle = function(a, b) { this.blockStyles[a] = b };
Blockly.Theme.prototype.setCategoryStyle = function(a, b) { this.categoryStyles[a] = b };
Blockly.Theme.prototype.getComponentStyle = function(a) { return (a = this.componentStyles[a]) && "string" == typeof propertyValue && this.getComponentStyle(a) ? this.getComponentStyle(a) : a ? String(a) : null };
Blockly.Theme.prototype.setComponentStyle = function(a, b) { this.componentStyles[a] = b };
Blockly.Theme.prototype.setFontStyle = function(a) { this.fontStyle = a };
Blockly.Theme.prototype.setStartHats = function(a) { this.startHats = a };
Blockly.Theme.defineTheme = function(a, b) {
    var c = new Blockly.Theme(a),
        d = b.base;
    d && d instanceof Blockly.Theme && (Blockly.utils.object.deepMerge(c, d), c.name = a);
    Blockly.utils.object.deepMerge(c.blockStyles, b.blockStyles);
    Blockly.utils.object.deepMerge(c.categoryStyles, b.categoryStyles);
    Blockly.utils.object.deepMerge(c.componentStyles, b.componentStyles);
    Blockly.utils.object.deepMerge(c.fontStyle, b.fontStyle);
    null != b.startHats && (c.startHats = b.startHats);
    return c
};
Blockly.Themes = {};
Blockly.Themes.Classic = {};
Blockly.Themes.Classic.defaultBlockStyles = { colour_blocks: { colourPrimary: "20" }, list_blocks: { colourPrimary: "260" }, logic_blocks: { colourPrimary: "210" }, loop_blocks: { colourPrimary: "120" }, math_blocks: { colourPrimary: "230" }, procedure_blocks: { colourPrimary: "290" }, text_blocks: { colourPrimary: "160" }, variable_blocks: { colourPrimary: "330" }, variable_dynamic_blocks: { colourPrimary: "310" }, hat_blocks: { colourPrimary: "330", hat: "cap" } };
Blockly.Themes.Classic.categoryStyles = { colour_category: { colour: "20" }, list_category: { colour: "260" }, logic_category: { colour: "210" }, loop_category: { colour: "120" }, math_category: { colour: "230" }, procedure_category: { colour: "290" }, text_category: { colour: "160" }, variable_category: { colour: "330" }, variable_dynamic_category: { colour: "310" } };
Blockly.Themes.Classic = new Blockly.Theme("classic", Blockly.Themes.Classic.defaultBlockStyles, Blockly.Themes.Classic.categoryStyles);
Blockly.utils.KeyCodes = {
    WIN_KEY_FF_LINUX: 0,
    MAC_ENTER: 3,
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PLUS_SIGN: 43,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    FF_SEMICOLON: 59,
    FF_EQUALS: 61,
    FF_DASH: 173,
    FF_HASH: 163,
    QUESTION_MARK: 63,
    AT_SIGN: 64,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    META: 91,
    WIN_KEY_RIGHT: 92,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SCROLL_LOCK: 145,
    FIRST_MEDIA_KEY: 166,
    LAST_MEDIA_KEY: 183,
    SEMICOLON: 186,
    DASH: 189,
    EQUALS: 187,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    APOSTROPHE: 192,
    TILDE: 192,
    SINGLE_QUOTE: 222,
    OPEN_SQUARE_BRACKET: 219,
    BACKSLASH: 220,
    CLOSE_SQUARE_BRACKET: 221,
    WIN_KEY: 224,
    MAC_FF_META: 224,
    MAC_WK_CMD_LEFT: 91,
    MAC_WK_CMD_RIGHT: 93,
    WIN_IME: 229,
    VK_NONAME: 252,
    PHANTOM: 255
};
Blockly.user = {};
Blockly.user.keyMap = {};
Blockly.user.keyMap.map_ = {};
Blockly.user.keyMap.modifierKeys = { SHIFT: "Shift", CONTROL: "Control", ALT: "Alt", META: "Meta" };
Blockly.user.keyMap.setActionForKey = function(a, b) {
    var c = Blockly.user.keyMap.getKeyByAction(b);
    c && delete Blockly.user.keyMap.map_[c];
    Blockly.user.keyMap.map_[a] = b
};
Blockly.user.keyMap.setKeyMap = function(a) { Blockly.user.keyMap.map_ = a };
Blockly.user.keyMap.getKeyMap = function() {
    var a = {};
    Blockly.utils.object.mixin(a, Blockly.user.keyMap.map_);
    return a
};
Blockly.user.keyMap.getActionByKeyCode = function(a) { return Blockly.user.keyMap.map_[a] };
Blockly.user.keyMap.getKeyByAction = function(a) {
    for (var b = Object.keys(Blockly.user.keyMap.map_), c = 0, d; d = b[c]; c++)
        if (Blockly.user.keyMap.map_[d].name === a.name) return d;
    return null
};
Blockly.user.keyMap.serializeKeyEvent = function(a) { for (var b = Blockly.utils.object.values(Blockly.user.keyMap.modifierKeys), c = "", d = 0, e; e = b[d]; d++) a.getModifierState(e) && (c += e); return c += a.keyCode };
Blockly.user.keyMap.checkModifiers_ = function(a, b) {
    for (var c = 0, d; d = a[c]; c++)
        if (0 > b.indexOf(d)) throw Error(d + " is not a valid modifier key.");
};
Blockly.user.keyMap.createSerializedKey = function(a, b) {
    var c = "",
        d = Blockly.utils.object.values(Blockly.user.keyMap.modifierKeys);
    Blockly.user.keyMap.checkModifiers_(b, d);
    for (var e = 0, f; f = d[e]; e++) - 1 < b.indexOf(f) && (c += f);
    return c + a
};
Blockly.user.keyMap.createDefaultKeyMap = function() {
    var a = {},
        b = Blockly.user.keyMap.createSerializedKey(Blockly.utils.KeyCodes.K, [Blockly.user.keyMap.modifierKeys.CONTROL, Blockly.user.keyMap.modifierKeys.SHIFT]),
        c = Blockly.user.keyMap.createSerializedKey(Blockly.utils.KeyCodes.W, [Blockly.user.keyMap.modifierKeys.SHIFT]),
        d = Blockly.user.keyMap.createSerializedKey(Blockly.utils.KeyCodes.A, [Blockly.user.keyMap.modifierKeys.SHIFT]),
        e = Blockly.user.keyMap.createSerializedKey(Blockly.utils.KeyCodes.S, [Blockly.user.keyMap.modifierKeys.SHIFT]),
        f = Blockly.user.keyMap.createSerializedKey(Blockly.utils.KeyCodes.D, [Blockly.user.keyMap.modifierKeys.SHIFT]);
    a[Blockly.utils.KeyCodes.W] = Blockly.navigation.ACTION_PREVIOUS;
    a[Blockly.utils.KeyCodes.A] = Blockly.navigation.ACTION_OUT;
    a[Blockly.utils.KeyCodes.S] = Blockly.navigation.ACTION_NEXT;
    a[Blockly.utils.KeyCodes.D] = Blockly.navigation.ACTION_IN;
    a[Blockly.utils.KeyCodes.I] = Blockly.navigation.ACTION_INSERT;
    a[Blockly.utils.KeyCodes.ENTER] = Blockly.navigation.ACTION_MARK;
    a[Blockly.utils.KeyCodes.X] = Blockly.navigation.ACTION_DISCONNECT;
    a[Blockly.utils.KeyCodes.T] = Blockly.navigation.ACTION_TOOLBOX;
    a[Blockly.utils.KeyCodes.E] = Blockly.navigation.ACTION_EXIT;
    a[Blockly.utils.KeyCodes.ESC] = Blockly.navigation.ACTION_EXIT;
    a[b] = Blockly.navigation.ACTION_TOGGLE_KEYBOARD_NAV;
    a[c] = Blockly.navigation.ACTION_MOVE_WS_CURSOR_UP;
    a[d] = Blockly.navigation.ACTION_MOVE_WS_CURSOR_LEFT;
    a[e] = Blockly.navigation.ACTION_MOVE_WS_CURSOR_DOWN;
    a[f] = Blockly.navigation.ACTION_MOVE_WS_CURSOR_RIGHT;
    return a
};
Blockly.utils.xml = {};
Blockly.utils.xml.NAME_SPACE = "https://developers.google.com/blockly/xml";
Blockly.utils.xml.document = function() { return document };
Blockly.utils.xml.createElement = function(a) { return Blockly.utils.xml.document().createElementNS(Blockly.utils.xml.NAME_SPACE, a) };
Blockly.utils.xml.createTextNode = function(a) { return Blockly.utils.xml.document().createTextNode(a) };
Blockly.utils.xml.textToDomDocument = function(a) { return (new DOMParser).parseFromString(a, "text/xml") };
Blockly.utils.xml.domToText = function(a) { return (new XMLSerializer).serializeToString(a) };
Blockly.Events.BlockBase = function(a) {
    Blockly.Events.BlockBase.superClass_.constructor.call(this);
    this.blockId = a.id;
    this.workspaceId = a.workspace.id
};
Blockly.utils.object.inherits(Blockly.Events.BlockBase, Blockly.Events.Abstract);
Blockly.Events.BlockBase.prototype.toJson = function() {
    var a = Blockly.Events.BlockBase.superClass_.toJson.call(this);
    a.blockId = this.blockId;
    return a
};
Blockly.Events.BlockBase.prototype.fromJson = function(a) {
    Blockly.Events.BlockBase.superClass_.fromJson.call(this, a);
    this.blockId = a.blockId
};
Blockly.Events.Change = function(a, b, c, d, e) { a && (Blockly.Events.Change.superClass_.constructor.call(this, a), this.element = b, this.name = c, this.oldValue = d, this.newValue = e) };
Blockly.utils.object.inherits(Blockly.Events.Change, Blockly.Events.BlockBase);
Blockly.Events.BlockChange = Blockly.Events.Change;
Blockly.Events.Change.prototype.type = Blockly.Events.CHANGE;
Blockly.Events.Change.prototype.toJson = function() {
    var a = Blockly.Events.Change.superClass_.toJson.call(this);
    a.element = this.element;
    this.name && (a.name = this.name);
    a.newValue = this.newValue;
    return a
};
Blockly.Events.Change.prototype.fromJson = function(a) {
    Blockly.Events.Change.superClass_.fromJson.call(this, a);
    this.element = a.element;
    this.name = a.name;
    this.newValue = a.newValue
};
Blockly.Events.Change.prototype.isNull = function() { return this.oldValue == this.newValue };
Blockly.Events.Change.prototype.run = function(a) {
    var b = this.getEventWorkspace_().getBlockById(this.blockId);
    if (b) switch (b.mutator && b.mutator.setVisible(!1), a = a ? this.newValue : this.oldValue, this.element) {
        case "field":
            (b = b.getField(this.name)) ? b.setValue(a): console.warn("Can't set non-existent field: " + this.name);
            break;
        case "comment":
            b.setCommentText(a || null);
            break;
        case "collapsed":
            b.setCollapsed(!!a);
            break;
        case "disabled":
            b.setEnabled(!a);
            break;
        case "inline":
            b.setInputsInline(!!a);
            break;
        case "mutation":
            var c =
                "";
            b.mutationToDom && (c = (c = b.mutationToDom()) && Blockly.Xml.domToText(c));
            if (b.domToMutation) {
                var d = Blockly.Xml.textToDom(a || "<mutation/>");
                b.domToMutation(d)
            }
            Blockly.Events.fire(new Blockly.Events.Change(b, "mutation", null, c, a));
            break;
        default:
            console.warn("Unknown change type: " + this.element)
    } else console.warn("Can't change non-existent block: " + this.blockId)
};
Blockly.Events.Create = function(a) { a && (Blockly.Events.Create.superClass_.constructor.call(this, a), this.xml = a.workspace.rendered ? Blockly.Xml.blockToDomWithXY(a) : Blockly.Xml.blockToDom(a), this.ids = Blockly.Events.getDescendantIds(a)) };
Blockly.utils.object.inherits(Blockly.Events.Create, Blockly.Events.BlockBase);
Blockly.Events.BlockCreate = Blockly.Events.Create;
Blockly.Events.Create.prototype.type = Blockly.Events.CREATE;
Blockly.Events.Create.prototype.toJson = function() {
    var a = Blockly.Events.Create.superClass_.toJson.call(this);
    a.xml = Blockly.Xml.domToText(this.xml);
    a.ids = this.ids;
    return a
};
Blockly.Events.Create.prototype.fromJson = function(a) {
    Blockly.Events.Create.superClass_.fromJson.call(this, a);
    this.xml = Blockly.Xml.textToDom(a.xml);
    this.ids = a.ids
};
Blockly.Events.Create.prototype.run = function(a) {
    var b = this.getEventWorkspace_();
    if (a) a = Blockly.utils.xml.createElement("xml"), a.appendChild(this.xml), Blockly.Xml.domToWorkspace(a, b);
    else {
        a = 0;
        for (var c; c = this.ids[a]; a++) {
            var d = b.getBlockById(c);
            d ? d.dispose(!1) : c == this.blockId && console.warn("Can't uncreate non-existent block: " + c)
        }
    }
};
Blockly.Events.Delete = function(a) {
    if (a) {
        if (a.getParent()) throw Error("Connected blocks cannot be deleted.");
        Blockly.Events.Delete.superClass_.constructor.call(this, a);
        this.oldXml = a.workspace.rendered ? Blockly.Xml.blockToDomWithXY(a) : Blockly.Xml.blockToDom(a);
        this.ids = Blockly.Events.getDescendantIds(a)
    }
};
Blockly.utils.object.inherits(Blockly.Events.Delete, Blockly.Events.BlockBase);
Blockly.Events.BlockDelete = Blockly.Events.Delete;
Blockly.Events.Delete.prototype.type = Blockly.Events.DELETE;
Blockly.Events.Delete.prototype.toJson = function() {
    var a = Blockly.Events.Delete.superClass_.toJson.call(this);
    a.ids = this.ids;
    return a
};
Blockly.Events.Delete.prototype.fromJson = function(a) {
    Blockly.Events.Delete.superClass_.fromJson.call(this, a);
    this.ids = a.ids
};
Blockly.Events.Delete.prototype.run = function(a) {
    var b = this.getEventWorkspace_();
    if (a) {
        a = 0;
        for (var c; c = this.ids[a]; a++) {
            var d = b.getBlockById(c);
            d ? d.dispose(!1) : c == this.blockId && console.warn("Can't delete non-existent block: " + c)
        }
    } else a = Blockly.utils.xml.createElement("xml"), a.appendChild(this.oldXml), Blockly.Xml.domToWorkspace(a, b)
};
Blockly.Events.Move = function(a) { a && (Blockly.Events.Move.superClass_.constructor.call(this, a), a = this.currentLocation_(), this.oldParentId = a.parentId, this.oldInputName = a.inputName, this.oldCoordinate = a.coordinate) };
Blockly.utils.object.inherits(Blockly.Events.Move, Blockly.Events.BlockBase);
Blockly.Events.BlockMove = Blockly.Events.Move;
Blockly.Events.Move.prototype.type = Blockly.Events.MOVE;
Blockly.Events.Move.prototype.toJson = function() {
    var a = Blockly.Events.Move.superClass_.toJson.call(this);
    this.newParentId && (a.newParentId = this.newParentId);
    this.newInputName && (a.newInputName = this.newInputName);
    this.newCoordinate && (a.newCoordinate = Math.round(this.newCoordinate.x) + "," + Math.round(this.newCoordinate.y));
    return a
};
Blockly.Events.Move.prototype.fromJson = function(a) {
    Blockly.Events.Move.superClass_.fromJson.call(this, a);
    this.newParentId = a.newParentId;
    this.newInputName = a.newInputName;
    a.newCoordinate && (a = a.newCoordinate.split(","), this.newCoordinate = new Blockly.utils.Coordinate(Number(a[0]), Number(a[1])))
};
Blockly.Events.Move.prototype.recordNew = function() {
    var a = this.currentLocation_();
    this.newParentId = a.parentId;
    this.newInputName = a.inputName;
    this.newCoordinate = a.coordinate
};
Blockly.Events.Move.prototype.currentLocation_ = function() {
    var a = this.getEventWorkspace_().getBlockById(this.blockId),
        b = {},
        c = a.getParent();
    if (c) { if (b.parentId = c.id, a = c.getInputWithBlock(a)) b.inputName = a.name } else b.coordinate = a.getRelativeToSurfaceXY();
    return b
};
Blockly.Events.Move.prototype.isNull = function() { return this.oldParentId == this.newParentId && this.oldInputName == this.newInputName && Blockly.utils.Coordinate.equals(this.oldCoordinate, this.newCoordinate) };
Blockly.Events.Move.prototype.run = function(a) {
    var b = this.getEventWorkspace_(),
        c = b.getBlockById(this.blockId);
    if (c) {
        var d = a ? this.newParentId : this.oldParentId,
            e = a ? this.newInputName : this.oldInputName;
        a = a ? this.newCoordinate : this.oldCoordinate;
        var f = null;
        if (d && (f = b.getBlockById(d), !f)) { console.warn("Can't connect to non-existent block: " + d); return }
        c.getParent() && c.unplug();
        if (a) e = c.getRelativeToSurfaceXY(), c.moveBy(a.x - e.x, a.y - e.y);
        else {
            c = c.outputConnection || c.previousConnection;
            if (e) {
                if (b = f.getInput(e)) var g =
                    b.connection
            } else c.type == Blockly.PREVIOUS_STATEMENT && (g = f.nextConnection);
            g ? c.connect(g) : console.warn("Can't connect to non-existent input: " + e)
        }
    } else console.warn("Can't move non-existent block: " + this.blockId)
};
Blockly.Events.FinishedLoading = function(a) {
    this.workspaceId = a.id;
    this.group = Blockly.Events.getGroup();
    this.recordUndo = !1
};
Blockly.utils.object.inherits(Blockly.Events.FinishedLoading, Blockly.Events.Ui);
Blockly.Events.FinishedLoading.prototype.type = Blockly.Events.FINISHED_LOADING;
Blockly.Events.FinishedLoading.prototype.toJson = function() {
    var a = { type: this.type };
    this.group && (a.group = this.group);
    this.workspaceId && (a.workspaceId = this.workspaceId);
    return a
};
Blockly.Events.FinishedLoading.prototype.fromJson = function(a) {
    this.workspaceId = a.workspaceId;
    this.group = a.group
};
Blockly.Events.VarBase = function(a) {
    Blockly.Events.VarBase.superClass_.constructor.call(this);
    this.varId = a.getId();
    this.workspaceId = a.workspace.id
};
Blockly.utils.object.inherits(Blockly.Events.VarBase, Blockly.Events.Abstract);
Blockly.Events.VarBase.prototype.toJson = function() {
    var a = Blockly.Events.VarBase.superClass_.toJson.call(this);
    a.varId = this.varId;
    return a
};
Blockly.Events.VarBase.prototype.fromJson = function(a) {
    Blockly.Events.VarBase.superClass_.toJson.call(this);
    this.varId = a.varId
};
Blockly.Events.VarCreate = function(a) { a && (Blockly.Events.VarCreate.superClass_.constructor.call(this, a), this.varType = a.type, this.varName = a.name) };
Blockly.utils.object.inherits(Blockly.Events.VarCreate, Blockly.Events.VarBase);
Blockly.Events.VarCreate.prototype.type = Blockly.Events.VAR_CREATE;
Blockly.Events.VarCreate.prototype.toJson = function() {
    var a = Blockly.Events.VarCreate.superClass_.toJson.call(this);
    a.varType = this.varType;
    a.varName = this.varName;
    return a
};
Blockly.Events.VarCreate.prototype.fromJson = function(a) {
    Blockly.Events.VarCreate.superClass_.fromJson.call(this, a);
    this.varType = a.varType;
    this.varName = a.varName
};
Blockly.Events.VarCreate.prototype.run = function(a) {
    var b = this.getEventWorkspace_();
    a ? b.createVariable(this.varName, this.varType, this.varId) : b.deleteVariableById(this.varId)
};
Blockly.Events.VarDelete = function(a) { a && (Blockly.Events.VarDelete.superClass_.constructor.call(this, a), this.varType = a.type, this.varName = a.name) };
Blockly.utils.object.inherits(Blockly.Events.VarDelete, Blockly.Events.VarBase);
Blockly.Events.VarDelete.prototype.type = Blockly.Events.VAR_DELETE;
Blockly.Events.VarDelete.prototype.toJson = function() {
    var a = Blockly.Events.VarDelete.superClass_.toJson.call(this);
    a.varType = this.varType;
    a.varName = this.varName;
    return a
};
Blockly.Events.VarDelete.prototype.fromJson = function(a) {
    Blockly.Events.VarDelete.superClass_.fromJson.call(this, a);
    this.varType = a.varType;
    this.varName = a.varName
};
Blockly.Events.VarDelete.prototype.run = function(a) {
    var b = this.getEventWorkspace_();
    a ? b.deleteVariableById(this.varId) : b.createVariable(this.varName, this.varType, this.varId)
};
Blockly.Events.VarRename = function(a, b) { a && (Blockly.Events.VarRename.superClass_.constructor.call(this, a), this.oldName = a.name, this.newName = b) };
Blockly.utils.object.inherits(Blockly.Events.VarRename, Blockly.Events.VarBase);
Blockly.Events.VarRename.prototype.type = Blockly.Events.VAR_RENAME;
Blockly.Events.VarRename.prototype.toJson = function() {
    var a = Blockly.Events.VarRename.superClass_.toJson.call(this);
    a.oldName = this.oldName;
    a.newName = this.newName;
    return a
};
Blockly.Events.VarRename.prototype.fromJson = function(a) {
    Blockly.Events.VarRename.superClass_.fromJson.call(this, a);
    this.oldName = a.oldName;
    this.newName = a.newName
};
Blockly.Events.VarRename.prototype.run = function(a) {
    var b = this.getEventWorkspace_();
    a ? b.renameVariableById(this.varId, this.newName) : b.renameVariableById(this.varId, this.oldName)
};
Blockly.Xml = {};
Blockly.Xml.workspaceToDom = function(a, b) {
    var c = Blockly.utils.xml.createElement("xml"),
        d = Blockly.Xml.variablesToDom(Blockly.Variables.allUsedVarModels(a));
    d.hasChildNodes() && c.appendChild(d);
    var e = a.getTopComments(!0);
    d = 0;
    for (var f; f = e[d]; d++) c.appendChild(f.toXmlWithXY(b));
    a = a.getTopBlocks(!0);
    for (d = 0; e = a[d]; d++) c.appendChild(Blockly.Xml.blockToDomWithXY(e, b));
    return c
};
Blockly.Xml.variablesToDom = function(a) {
    for (var b = Blockly.utils.xml.createElement("variables"), c = 0, d; d = a[c]; c++) {
        var e = Blockly.utils.xml.createElement("variable");
        e.appendChild(Blockly.utils.xml.createTextNode(d.name));
        d.type && e.setAttribute("type", d.type);
        e.id = d.getId();
        b.appendChild(e)
    }
    return b
};
Blockly.Xml.blockToDomWithXY = function(a, b) {
    var c;
    a.workspace.RTL && (c = a.workspace.getWidth());
    b = Blockly.Xml.blockToDom(a, b);
    var d = a.getRelativeToSurfaceXY();
    b.setAttribute("x", Math.round(a.workspace.RTL ? c - d.x : d.x));
    b.setAttribute("y", Math.round(d.y));
    return b
};
Blockly.Xml.fieldToDom_ = function(a) {
    if (a.isSerializable()) {
        var b = Blockly.utils.xml.createElement("field");
        b.setAttribute("name", a.name || "");
        return a.toXml(b)
    }
    return null
};
Blockly.Xml.allFieldsToDom_ = function(a, b) {
    for (var c = 0, d; d = a.inputList[c]; c++)
        for (var e = 0, f; f = d.fieldRow[e]; e++)(f = Blockly.Xml.fieldToDom_(f)) && b.appendChild(f)
};
Blockly.Xml.blockToDom = function(a, b) {
    var c = Blockly.utils.xml.createElement(a.isShadow() ? "shadow" : "block");
    c.setAttribute("type", a.type);
    b || c.setAttribute("id", a.id);
    if (a.mutationToDom) {
        var d = a.mutationToDom();
        d && (d.hasChildNodes() || d.hasAttributes()) && c.appendChild(d)
    }
    Blockly.Xml.allFieldsToDom_(a, c);
    if (d = a.getCommentText()) {
        var e = a.commentModel.size,
            f = a.commentModel.pinned,
            g = Blockly.utils.xml.createElement("comment");
        g.appendChild(Blockly.utils.xml.createTextNode(d));
        g.setAttribute("pinned", f);
        g.setAttribute("h",
            e.height);
        g.setAttribute("w", e.width);
        c.appendChild(g)
    }
    a.data && (d = Blockly.utils.xml.createElement("data"), d.appendChild(Blockly.utils.xml.createTextNode(a.data)), c.appendChild(d));
    for (e = 0; f = a.inputList[e]; e++) {
        var h;
        g = !0;
        if (f.type != Blockly.DUMMY_INPUT) {
            var k = f.connection.targetBlock();
            f.type == Blockly.INPUT_VALUE ? h = Blockly.utils.xml.createElement("value") : f.type == Blockly.NEXT_STATEMENT && (h = Blockly.utils.xml.createElement("statement"));
            d = f.connection.getShadowDom();
            !d || k && k.isShadow() || h.appendChild(Blockly.Xml.cloneShadow_(d,
                b));
            k && (h.appendChild(Blockly.Xml.blockToDom(k, b)), g = !1);
            h.setAttribute("name", f.name);
            g || c.appendChild(h)
        }
    }
    void 0 != a.inputsInline && a.inputsInline != a.inputsInlineDefault && c.setAttribute("inline", a.inputsInline);
    a.isCollapsed() && c.setAttribute("collapsed", !0);
    a.isEnabled() || c.setAttribute("disabled", !0);
    a.isDeletable() || a.isShadow() || c.setAttribute("deletable", !1);
    a.isMovable() || a.isShadow() || c.setAttribute("movable", !1);
    a.isEditable() || c.setAttribute("editable", !1);
    if (e = a.getNextBlock()) h = Blockly.utils.xml.createElement("next"),
        h.appendChild(Blockly.Xml.blockToDom(e, b)), c.appendChild(h);
    d = a.nextConnection && a.nextConnection.getShadowDom();
    !d || e && e.isShadow() || h.appendChild(Blockly.Xml.cloneShadow_(d, b));
    return c
};
Blockly.Xml.cloneShadow_ = function(a, b) {
    for (var c = a = a.cloneNode(!0), d; c;)
        if (b && "shadow" == c.nodeName && c.removeAttribute("id"), c.firstChild) c = c.firstChild;
        else {
            for (; c && !c.nextSibling;) d = c, c = c.parentNode, d.nodeType == Blockly.utils.dom.Node.TEXT_NODE && "" == d.data.trim() && c.firstChild != d && Blockly.utils.dom.removeNode(d);
            c && (d = c, c = c.nextSibling, d.nodeType == Blockly.utils.dom.Node.TEXT_NODE && "" == d.data.trim() && Blockly.utils.dom.removeNode(d))
        }
    return a
};
Blockly.Xml.domToText = function(a) {
    a = Blockly.utils.xml.domToText(a);
    var b = /(<[^/](?:[^>]*[^/])?>[^<]*)\n([^<]*<\/)/;
    do {
        var c = a;
        a = a.replace(b, "$1&#10;$2")
    } while (a != c);
    return a.replace(/<(\w+)([^<]*)\/>/g, "<$1$2></$1>")
};
Blockly.Xml.domToPrettyText = function(a) {
    a = Blockly.Xml.domToText(a).split("<");
    for (var b = "", c = 1; c < a.length; c++) {
        var d = a[c];
        "/" == d[0] && (b = b.substring(2));
        a[c] = b + "<" + d;
        "/" != d[0] && "/>" != d.slice(-2) && (b += "  ")
    }
    a = a.join("\n");
    a = a.replace(/(<(\w+)\b[^>]*>[^\n]*)\n *<\/\2>/g, "$1</$2>");
    return a.replace(/^\n/, "")
};
Blockly.Xml.textToDom = function(a) { var b = Blockly.utils.xml.textToDomDocument(a); if (!b || !b.documentElement || b.getElementsByTagName("parsererror").length) throw Error("textToDom was unable to parse: " + a); return b.documentElement };
Blockly.Xml.clearWorkspaceAndLoadFromXml = function(a, b) {
    b.setResizesEnabled(!1);
    b.clear();
    a = Blockly.Xml.domToWorkspace(a, b);
    b.setResizesEnabled(!0);
    return a
};
Blockly.Xml.domToWorkspace = function(a, b) {
    if (a instanceof Blockly.Workspace) {
        var c = a;
        a = b;
        b = c;
        console.warn("Deprecated call to Blockly.Xml.domToWorkspace, swap the arguments.")
    }
    var d;
    b.RTL && (d = b.getWidth());
    c = [];
    Blockly.utils.dom.startTextWidthCache();
    var e = Blockly.Events.getGroup();
    e || Blockly.Events.setGroup(!0);
    b.setResizesEnabled && b.setResizesEnabled(!1);
    var f = !0;
    try {
        for (var g = 0, h; h = a.childNodes[g]; g++) {
            var k = h.nodeName.toLowerCase(),
                l = h;
            if ("block" == k || "shadow" == k && !Blockly.Events.recordUndo) {
                var m =
                    Blockly.Xml.domToBlock(l, b);
                c.push(m.id);
                var n = l.hasAttribute("x") ? parseInt(l.getAttribute("x"), 10) : 10,
                    p = l.hasAttribute("y") ? parseInt(l.getAttribute("y"), 10) : 10;
                isNaN(n) || isNaN(p) || m.moveBy(b.RTL ? d - n : n, p);
                f = !1
            } else {
                if ("shadow" == k) throw TypeError("Shadow block cannot be a top-level block.");
                if ("comment" == k) b.rendered ? Blockly.WorkspaceCommentSvg ? Blockly.WorkspaceCommentSvg.fromXml(l, b, d) : console.warn("Missing require for Blockly.WorkspaceCommentSvg, ignoring workspace comment.") : Blockly.WorkspaceComment ?
                    Blockly.WorkspaceComment.fromXml(l, b) : console.warn("Missing require for Blockly.WorkspaceComment, ignoring workspace comment.");
                else if ("variables" == k) {
                    if (f) Blockly.Xml.domToVariables(l, b);
                    else throw Error("'variables' tag must exist once before block and shadow tag elements in the workspace XML, but it was found in another location.");
                    f = !1
                }
            }
        }
    } finally { e || Blockly.Events.setGroup(!1), Blockly.utils.dom.stopTextWidthCache() }
    b.setResizesEnabled && b.setResizesEnabled(!0);
    Blockly.Events.fire(new Blockly.Events.FinishedLoading(b));
    return c
};
Blockly.Xml.appendDomToWorkspace = function(a, b) {
    var c;
    b.hasOwnProperty("scale") && (c = b.getBlocksBoundingBox());
    a = Blockly.Xml.domToWorkspace(a, b);
    if (c && c.top != c.bottom) {
        var d = c.bottom;
        var e = b.RTL ? c.right : c.left;
        var f = Infinity,
            g = -Infinity,
            h = Infinity;
        for (c = 0; c < a.length; c++) {
            var k = b.getBlockById(a[c]).getRelativeToSurfaceXY();
            k.y < h && (h = k.y);
            k.x < f && (f = k.x);
            k.x > g && (g = k.x)
        }
        d = d - h + 10;
        e = b.RTL ? e - g : e - f;
        for (c = 0; c < a.length; c++) b.getBlockById(a[c]).moveBy(e, d)
    }
    return a
};
Blockly.Xml.domToBlock = function(a, b) {
    if (a instanceof Blockly.Workspace) {
        var c = a;
        a = b;
        b = c;
        console.warn("Deprecated call to Blockly.Xml.domToBlock, swap the arguments.")
    }
    Blockly.Events.disable();
    c = b.getAllVariables();
    try {
        var d = Blockly.Xml.domToBlockHeadless_(a, b),
            e = d.getDescendants(!1);
        if (b.rendered) {
            d.setConnectionTracking(!1);
            for (var f = e.length - 1; 0 <= f; f--) e[f].initSvg();
            for (f = e.length - 1; 0 <= f; f--) e[f].render(!1);
            setTimeout(function() { d.disposed || d.setConnectionTracking(!0) }, 1);
            d.updateDisabled();
            b.resizeContents()
        } else
            for (f =
                e.length - 1; 0 <= f; f--) e[f].initModel()
    } finally { Blockly.Events.enable() }
    if (Blockly.Events.isEnabled()) {
        a = Blockly.Variables.getAddedVariables(b, c);
        for (f = 0; f < a.length; f++) Blockly.Events.fire(new Blockly.Events.VarCreate(a[f]));
        Blockly.Events.fire(new Blockly.Events.BlockCreate(d))
    }
    return d
};
Blockly.Xml.domToVariables = function(a, b) {
    for (var c = 0, d; d = a.childNodes[c]; c++)
        if (d.nodeType == Blockly.utils.dom.Node.ELEMENT_NODE) {
            var e = d.getAttribute("type"),
                f = d.getAttribute("id");
            b.createVariable(d.textContent, e, f)
        }
};
Blockly.Xml.domToBlockHeadless_ = function(a, b) {
    var c = null,
        d = a.getAttribute("type");
    if (!d) throw TypeError("Block type unspecified: " + a.outerHTML);
    var e = a.getAttribute("id");
    c = b.newBlock(d, e);
    var f = null;
    e = 0;
    for (var g; g = a.childNodes[e]; e++)
        if (g.nodeType != Blockly.utils.dom.Node.TEXT_NODE) {
            var h = f = null;
            var k = 0;
            for (var l; l = g.childNodes[k]; k++) l.nodeType == Blockly.utils.dom.Node.ELEMENT_NODE && ("block" == l.nodeName.toLowerCase() ? f = l : "shadow" == l.nodeName.toLowerCase() && (h = l));
            !f && h && (f = h);
            l = g.getAttribute("name");
            k = g;
            switch (g.nodeName.toLowerCase()) {
                case "mutation":
                    c.domToMutation && (c.domToMutation(k), c.initSvg && c.initSvg());
                    break;
                case "comment":
                    if (!Blockly.Comment) { console.warn("Missing require for Blockly.Comment, ignoring block comment."); break }
                    f = k.textContent;
                    h = "true" == k.getAttribute("pinned");
                    g = parseInt(k.getAttribute("w"), 10);
                    k = parseInt(k.getAttribute("h"), 10);
                    c.setCommentText(f);
                    c.commentModel.pinned = h;
                    isNaN(g) || isNaN(k) || (c.commentModel.size = new Blockly.utils.Size(g, k));
                    h && c.getCommentIcon && !c.isInFlyout &&
                        setTimeout(function() { c.getCommentIcon().setVisible(!0) }, 1);
                    break;
                case "data":
                    c.data = g.textContent;
                    break;
                case "title":
                case "field":
                    Blockly.Xml.domToField_(c, l, k);
                    break;
                case "value":
                case "statement":
                    k = c.getInput(l);
                    if (!k) { console.warn("Ignoring non-existent input " + l + " in block " + d); break }
                    h && k.connection.setShadowDom(h);
                    if (f)
                        if (f = Blockly.Xml.domToBlockHeadless_(f, b), f.outputConnection) k.connection.connect(f.outputConnection);
                        else if (f.previousConnection) k.connection.connect(f.previousConnection);
                    else throw TypeError("Child block does not have output or previous statement.");
                    break;
                case "next":
                    h && c.nextConnection && c.nextConnection.setShadowDom(h);
                    if (f) {
                        if (!c.nextConnection) throw TypeError("Next statement does not exist.");
                        if (c.nextConnection.isConnected()) throw TypeError("Next statement is already connected.");
                        f = Blockly.Xml.domToBlockHeadless_(f, b);
                        if (!f.previousConnection) throw TypeError("Next block does not have previous statement.");
                        c.nextConnection.connect(f.previousConnection)
                    }
                    break;
                default:
                    console.warn("Ignoring unknown tag: " + g.nodeName)
            }
        }(e = a.getAttribute("inline")) &&
    c.setInputsInline("true" == e);
    (e = a.getAttribute("disabled")) && c.setEnabled("true" != e && "disabled" != e);
    (e = a.getAttribute("deletable")) && c.setDeletable("true" == e);
    (e = a.getAttribute("movable")) && c.setMovable("true" == e);
    (e = a.getAttribute("editable")) && c.setEditable("true" == e);
    (e = a.getAttribute("collapsed")) && c.setCollapsed("true" == e);
    if ("shadow" == a.nodeName.toLowerCase()) {
        a = c.getChildren(!1);
        for (e = 0; b = a[e]; e++)
            if (!b.isShadow()) throw TypeError("Shadow block not allowed non-shadow child.");
        if (c.getVarModels().length) throw TypeError("Shadow blocks cannot have variable references.");
        c.setShadow(!0)
    }
    return c
};
Blockly.Xml.domToField_ = function(a, b, c) {
    var d = a.getField(b);
    d ? d.fromXml(c) : console.warn("Ignoring non-existent field " + b + " in block " + a.type)
};
Blockly.Xml.deleteNext = function(a) {
    for (var b = 0, c; c = a.childNodes[b]; b++)
        if ("next" == c.nodeName.toLowerCase()) { a.removeChild(c); break }
};
Blockly.Options = function(a) {
    var b = !!a.readOnly;
    if (b) var c = null,
        d = !1,
        e = !1,
        f = !1,
        g = !1,
        h = !1,
        k = !1;
    else {
        c = Blockly.Options.parseToolboxTree(a.toolbox || null);
        d = !(!c || !c.getElementsByTagName("category").length);
        e = a.trashcan;
        void 0 === e && (e = d);
        var l = a.maxTrashcanContents;
        e ? void 0 === l && (l = 32) : l = 0;
        f = a.collapse;
        void 0 === f && (f = d);
        g = a.comments;
        void 0 === g && (g = d);
        h = a.disable;
        void 0 === h && (h = d);
        k = a.sounds;
        void 0 === k && (k = !0)
    }
    var m = !!a.rtl,
        n = a.horizontalLayout;
    void 0 === n && (n = !1);
    var p = a.toolboxPosition;
    p = "end" !== p;
    p = n ?
        p ? Blockly.TOOLBOX_AT_TOP : Blockly.TOOLBOX_AT_BOTTOM : p == m ? Blockly.TOOLBOX_AT_RIGHT : Blockly.TOOLBOX_AT_LEFT;
    var q = a.css;
    void 0 === q && (q = !0);
    var r = "./media/sprites.png";
    a.media ? r = a.media : a.path && (r = "./media/sprites.png");
    var t = void 0 === a.oneBasedIndex ? !0 : !!a.oneBasedIndex,
        u = a.keyMap || Blockly.user.keyMap.createDefaultKeyMap(),
        v = a.renderer || "geras";
    this.RTL = m;
    this.oneBasedIndex = t;
    this.collapse = f;
    this.comments = g;
    this.disable = h;
    this.readOnly = b;
    this.maxBlocks = a.maxBlocks || Infinity;
    this.maxInstances =
        a.maxInstances;
    this.pathToMedia = r;
    this.hasCategories = d;
    this.moveOptions = Blockly.Options.parseMoveOptions(a, d);
    this.hasScrollbars = this.moveOptions.scrollbars;
    this.hasTrashcan = e;
    this.maxTrashcanContents = l;
    this.hasSounds = k;
    this.hasCss = q;
    this.horizontalLayout = n;
    this.languageTree = c;
    this.gridOptions = Blockly.Options.parseGridOptions_(a);
    this.zoomOptions = Blockly.Options.parseZoomOptions_(a);
    this.toolboxPosition = p;
    this.theme = Blockly.Options.parseThemeOptions_(a);
    this.keyMap = u;
    this.renderer = 'zelos';
    this.rendererOverrides =
        a.rendererOverrides;
    this.gridPattern = void 0;
    this.parentWorkspace = a.parentWorkspace
};
Blockly.BlocklyOptions = function() {};
Blockly.Options.parseMoveOptions = function(a, b) {
    var c = a.move || {},
        d = {};
    d.scrollbars = void 0 === c.scrollbars && void 0 === a.scrollbars ? b : !!c.scrollbars || !!a.scrollbars;
    d.wheel = d.scrollbars && void 0 !== c.wheel ? !!c.wheel : !1;
    d.drag = d.scrollbars ? void 0 === c.drag ? !0 : !!c.drag : !1;
    return d
};
Blockly.Options.parseZoomOptions_ = function(a) {
    a = a.zoom || {};
    var b = {};
    b.controls = void 0 === a.controls ? !1 : !!a.controls;
    b.wheel = void 0 === a.wheel ? !1 : !!a.wheel;
    b.startScale = void 0 === a.startScale ? 1 : Number(a.startScale);
    b.maxScale = void 0 === a.maxScale ? 3 : Number(a.maxScale);
    b.minScale = void 0 === a.minScale ? .3 : Number(a.minScale);
    b.scaleSpeed = void 0 === a.scaleSpeed ? 1.2 : Number(a.scaleSpeed);
    b.pinch = void 0 === a.pinch ? b.wheel || b.controls : !!a.pinch;
    return b
};
Blockly.Options.parseGridOptions_ = function(a) {
    a = a.grid || {};
    var b = {};
    b.spacing = Number(a.spacing) || 0;
    b.colour = a.colour || "#888";
    b.length = void 0 === a.length ? 1 : Number(a.length);
    b.snap = 0 < b.spacing && !!a.snap;
    return b
};
Blockly.Options.parseThemeOptions_ = function(a) { a = a.theme || Blockly.Themes.Classic; return a instanceof Blockly.Theme ? a : Blockly.Theme.defineTheme("builtin", a) };
Blockly.Options.parseToolboxTree = function(a) { if (a) { if ("string" != typeof a && (Blockly.utils.userAgent.IE && a.outerHTML ? a = a.outerHTML : a instanceof Element || (a = null)), "string" == typeof a && (a = Blockly.Xml.textToDom(a), "xml" != a.nodeName.toLowerCase())) throw TypeError("Toolbox should be an <xml> document."); } else a = null; return a };
Blockly.Touch = {};
Blockly.Touch.TOUCH_ENABLED = "ontouchstart" in Blockly.utils.global || !!(Blockly.utils.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!Blockly.utils.global.navigator || !Blockly.utils.global.navigator.maxTouchPoints && !Blockly.utils.global.navigator.msMaxTouchPoints);
Blockly.Touch.touchIdentifier_ = null;
Blockly.Touch.TOUCH_MAP = {};
Blockly.utils.global.PointerEvent ? Blockly.Touch.TOUCH_MAP = { mousedown: ["pointerdown"], mouseenter: ["pointerenter"], mouseleave: ["pointerleave"], mousemove: ["pointermove"], mouseout: ["pointerout"], mouseover: ["pointerover"], mouseup: ["pointerup", "pointercancel"], touchend: ["pointerup"], touchcancel: ["pointercancel"] } : Blockly.Touch.TOUCH_ENABLED && (Blockly.Touch.TOUCH_MAP = { mousedown: ["touchstart"], mousemove: ["touchmove"], mouseup: ["touchend", "touchcancel"] });
Blockly.longPid_ = 0;
Blockly.longStart = function(a, b) {
    Blockly.longStop_();
    a.changedTouches && 1 != a.changedTouches.length || (Blockly.longPid_ = setTimeout(function() {
        a.changedTouches && (a.button = 2, a.clientX = a.changedTouches[0].clientX, a.clientY = a.changedTouches[0].clientY);
        b && b.handleRightClick(a)
    }, Blockly.LONGPRESS))
};
Blockly.longStop_ = function() { Blockly.longPid_ && (clearTimeout(Blockly.longPid_), Blockly.longPid_ = 0) };
Blockly.Touch.clearTouchIdentifier = function() { Blockly.Touch.touchIdentifier_ = null };
Blockly.Touch.shouldHandleEvent = function(a) { return !Blockly.Touch.isMouseOrTouchEvent(a) || Blockly.Touch.checkTouchIdentifier(a) };
Blockly.Touch.getTouchIdentifierFromEvent = function(a) { return void 0 != a.pointerId ? a.pointerId : a.changedTouches && a.changedTouches[0] && void 0 !== a.changedTouches[0].identifier && null !== a.changedTouches[0].identifier ? a.changedTouches[0].identifier : "mouse" };
Blockly.Touch.checkTouchIdentifier = function(a) { var b = Blockly.Touch.getTouchIdentifierFromEvent(a); return void 0 !== Blockly.Touch.touchIdentifier_ && null !== Blockly.Touch.touchIdentifier_ ? Blockly.Touch.touchIdentifier_ == b : "mousedown" == a.type || "touchstart" == a.type || "pointerdown" == a.type ? (Blockly.Touch.touchIdentifier_ = b, !0) : !1 };
Blockly.Touch.setClientFromTouch = function(a) {
    if (Blockly.utils.string.startsWith(a.type, "touch")) {
        var b = a.changedTouches[0];
        a.clientX = b.clientX;
        a.clientY = b.clientY
    }
};
Blockly.Touch.isMouseOrTouchEvent = function(a) { return Blockly.utils.string.startsWith(a.type, "touch") || Blockly.utils.string.startsWith(a.type, "mouse") || Blockly.utils.string.startsWith(a.type, "pointer") };
Blockly.Touch.isTouchEvent = function(a) { return Blockly.utils.string.startsWith(a.type, "touch") || Blockly.utils.string.startsWith(a.type, "pointer") };
Blockly.Touch.splitEventByTouches = function(a) {
    var b = [];
    if (a.changedTouches)
        for (var c = 0; c < a.changedTouches.length; c++) b[c] = { type: a.type, changedTouches: [a.changedTouches[c]], target: a.target, stopPropagation: function() { a.stopPropagation() }, preventDefault: function() { a.preventDefault() } };
    else b.push(a);
    return b
};
Blockly.ScrollbarPair = function(a) {
    this.workspace_ = a;
    this.hScroll = new Blockly.Scrollbar(a, !0, !0, "blocklyMainWorkspaceScrollbar");
    this.vScroll = new Blockly.Scrollbar(a, !1, !0, "blocklyMainWorkspaceScrollbar");
    this.corner_ = Blockly.utils.dom.createSvgElement("rect", { height: Blockly.Scrollbar.scrollbarThickness, width: Blockly.Scrollbar.scrollbarThickness, "class": "blocklyScrollbarBackground" }, null);
    Blockly.utils.dom.insertAfter(this.corner_, a.getBubbleCanvas())
};
Blockly.ScrollbarPair.prototype.oldHostMetrics_ = null;
Blockly.ScrollbarPair.prototype.dispose = function() {
    Blockly.utils.dom.removeNode(this.corner_);
    this.oldHostMetrics_ = this.workspace_ = this.corner_ = null;
    this.hScroll.dispose();
    this.hScroll = null;
    this.vScroll.dispose();
    this.vScroll = null
};
Blockly.ScrollbarPair.prototype.resize = function() {
    var a = this.workspace_.getMetrics();
    if (a) {
        var b = !1,
            c = !1;
        this.oldHostMetrics_ && this.oldHostMetrics_.viewWidth == a.viewWidth && this.oldHostMetrics_.viewHeight == a.viewHeight && this.oldHostMetrics_.absoluteTop == a.absoluteTop && this.oldHostMetrics_.absoluteLeft == a.absoluteLeft ? (this.oldHostMetrics_ && this.oldHostMetrics_.contentWidth == a.contentWidth && this.oldHostMetrics_.viewLeft == a.viewLeft && this.oldHostMetrics_.contentLeft == a.contentLeft || (b = !0), this.oldHostMetrics_ &&
            this.oldHostMetrics_.contentHeight == a.contentHeight && this.oldHostMetrics_.viewTop == a.viewTop && this.oldHostMetrics_.contentTop == a.contentTop || (c = !0)) : c = b = !0;
        b && this.hScroll.resize(a);
        c && this.vScroll.resize(a);
        this.oldHostMetrics_ && this.oldHostMetrics_.viewWidth == a.viewWidth && this.oldHostMetrics_.absoluteLeft == a.absoluteLeft || this.corner_.setAttribute("x", this.vScroll.position_.x);
        this.oldHostMetrics_ && this.oldHostMetrics_.viewHeight == a.viewHeight && this.oldHostMetrics_.absoluteTop == a.absoluteTop || this.corner_.setAttribute("y",
            this.hScroll.position_.y);
        this.oldHostMetrics_ = a
    }
};
Blockly.ScrollbarPair.prototype.set = function(a, b) {
    var c = {};
    a *= this.hScroll.ratio_;
    b *= this.vScroll.ratio_;
    var d = this.vScroll.scrollViewSize_;
    c.x = this.getRatio_(a, this.hScroll.scrollViewSize_);
    c.y = this.getRatio_(b, d);
    this.workspace_.setMetrics(c);
    this.hScroll.setHandlePosition(a);
    this.vScroll.setHandlePosition(b)
};
Blockly.ScrollbarPair.prototype.getRatio_ = function(a, b) { a /= b; return isNaN(a) ? 0 : a };
Blockly.Scrollbar = function(a, b, c, d) {
    this.workspace_ = a;
    this.pair_ = c || !1;
    this.horizontal_ = b;
    this.oldHostMetrics_ = null;
    this.createDom_(d);
    this.position_ = new Blockly.utils.Coordinate(0, 0);
    a = Blockly.Scrollbar.scrollbarThickness;
    b ? (this.svgBackground_.setAttribute("height", a), this.outerSvg_.setAttribute("height", a), this.svgHandle_.setAttribute("height", a - 5), this.svgHandle_.setAttribute("y", 2.5), this.lengthAttribute_ = "width", this.positionAttribute_ = "x") : (this.svgBackground_.setAttribute("width", a), this.outerSvg_.setAttribute("width",
        a), this.svgHandle_.setAttribute("width", a - 5), this.svgHandle_.setAttribute("x", 2.5), this.lengthAttribute_ = "height", this.positionAttribute_ = "y");
    this.onMouseDownBarWrapper_ = Blockly.bindEventWithChecks_(this.svgBackground_, "mousedown", this, this.onMouseDownBar_);
    this.onMouseDownHandleWrapper_ = Blockly.bindEventWithChecks_(this.svgHandle_, "mousedown", this, this.onMouseDownHandle_)
};
Blockly.Scrollbar.prototype.origin_ = new Blockly.utils.Coordinate(0, 0);
Blockly.Scrollbar.prototype.startDragMouse_ = 0;
Blockly.Scrollbar.prototype.scrollViewSize_ = 0;
Blockly.Scrollbar.prototype.handleLength_ = 0;
Blockly.Scrollbar.prototype.handlePosition_ = 0;
Blockly.Scrollbar.prototype.isVisible_ = !0;
Blockly.Scrollbar.prototype.containerVisible_ = !0;
Blockly.Scrollbar.scrollbarThickness = 15;
Blockly.Touch.TOUCH_ENABLED && (Blockly.Scrollbar.scrollbarThickness = 25);
Blockly.Scrollbar.metricsAreEquivalent_ = function(a, b) { return a && b && a.viewWidth == b.viewWidth && a.viewHeight == b.viewHeight && a.viewLeft == b.viewLeft && a.viewTop == b.viewTop && a.absoluteTop == b.absoluteTop && a.absoluteLeft == b.absoluteLeft && a.contentWidth == b.contentWidth && a.contentHeight == b.contentHeight && a.contentLeft == b.contentLeft && a.contentTop == b.contentTop ? !0 : !1 };
Blockly.Scrollbar.prototype.dispose = function() {
    this.cleanUp_();
    Blockly.unbindEvent_(this.onMouseDownBarWrapper_);
    this.onMouseDownBarWrapper_ = null;
    Blockly.unbindEvent_(this.onMouseDownHandleWrapper_);
    this.onMouseDownHandleWrapper_ = null;
    Blockly.utils.dom.removeNode(this.outerSvg_);
    this.svgBackground_ = this.svgGroup_ = this.outerSvg_ = null;
    this.svgHandle_ && (this.workspace_.getThemeManager().unsubscribe(this.svgHandle_), this.svgHandle_ = null);
    this.workspace_ = null
};
Blockly.Scrollbar.prototype.setHandleLength_ = function(a) {
    this.handleLength_ = a;
    this.svgHandle_.setAttribute(this.lengthAttribute_, this.handleLength_)
};
Blockly.Scrollbar.prototype.setHandlePosition = function(a) {
    this.handlePosition_ = a;
    this.svgHandle_.setAttribute(this.positionAttribute_, this.handlePosition_)
};
Blockly.Scrollbar.prototype.setScrollViewSize_ = function(a) {
    this.scrollViewSize_ = a;
    this.outerSvg_.setAttribute(this.lengthAttribute_, this.scrollViewSize_);
    this.svgBackground_.setAttribute(this.lengthAttribute_, this.scrollViewSize_)
};
Blockly.ScrollbarPair.prototype.setContainerVisible = function(a) {
    this.hScroll.setContainerVisible(a);
    this.vScroll.setContainerVisible(a)
};
Blockly.Scrollbar.prototype.setPosition_ = function(a, b) {
    this.position_.x = a;
    this.position_.y = b;
    Blockly.utils.dom.setCssTransform(this.outerSvg_, "translate(" + (this.position_.x + this.origin_.x) + "px," + (this.position_.y + this.origin_.y) + "px)")
};
Blockly.Scrollbar.prototype.resize = function(a) {
    if (!a && (a = this.workspace_.getMetrics(), !a)) return;
    Blockly.Scrollbar.metricsAreEquivalent_(a, this.oldHostMetrics_) || (this.oldHostMetrics_ = a, this.horizontal_ ? this.resizeHorizontal_(a) : this.resizeVertical_(a), this.onScroll_())
};
Blockly.Scrollbar.prototype.resizeHorizontal_ = function(a) { this.resizeViewHorizontal(a) };
Blockly.Scrollbar.prototype.resizeViewHorizontal = function(a) {
    var b = a.viewWidth - 1;
    this.pair_ && (b -= Blockly.Scrollbar.scrollbarThickness);
    this.setScrollViewSize_(Math.max(0, b));
    b = a.absoluteLeft + .5;
    this.pair_ && this.workspace_.RTL && (b += Blockly.Scrollbar.scrollbarThickness);
    this.setPosition_(b, a.absoluteTop + a.viewHeight - Blockly.Scrollbar.scrollbarThickness - .5);
    this.resizeContentHorizontal(a)
};
Blockly.Scrollbar.prototype.resizeContentHorizontal = function(a) {
    this.pair_ || this.setVisible(this.scrollViewSize_ < a.contentWidth);
    this.ratio_ = this.scrollViewSize_ / a.contentWidth;
    if (-Infinity == this.ratio_ || Infinity == this.ratio_ || isNaN(this.ratio_)) this.ratio_ = 0;
    this.setHandleLength_(Math.max(0, a.viewWidth * this.ratio_));
    this.setHandlePosition(this.constrainHandle_((a.viewLeft - a.contentLeft) * this.ratio_))
};
Blockly.Scrollbar.prototype.resizeVertical_ = function(a) { this.resizeViewVertical(a) };
Blockly.Scrollbar.prototype.resizeViewVertical = function(a) {
    var b = a.viewHeight - 1;
    this.pair_ && (b -= Blockly.Scrollbar.scrollbarThickness);
    this.setScrollViewSize_(Math.max(0, b));
    b = a.absoluteLeft + .5;
    this.workspace_.RTL || (b += a.viewWidth - Blockly.Scrollbar.scrollbarThickness - 1);
    this.setPosition_(b, a.absoluteTop + .5);
    this.resizeContentVertical(a)
};
Blockly.Scrollbar.prototype.resizeContentVertical = function(a) {
    this.pair_ || this.setVisible(this.scrollViewSize_ < a.contentHeight);
    this.ratio_ = this.scrollViewSize_ / a.contentHeight;
    if (-Infinity == this.ratio_ || Infinity == this.ratio_ || isNaN(this.ratio_)) this.ratio_ = 0;
    this.setHandleLength_(Math.max(0, a.viewHeight * this.ratio_));
    this.setHandlePosition(this.constrainHandle_((a.viewTop - a.contentTop) * this.ratio_))
};
Blockly.Scrollbar.prototype.createDom_ = function(a) {
    var b = "blocklyScrollbar" + (this.horizontal_ ? "Horizontal" : "Vertical");
    a && (b += " " + a);
    this.outerSvg_ = Blockly.utils.dom.createSvgElement("svg", { "class": b }, null);
    this.svgGroup_ = Blockly.utils.dom.createSvgElement("g", {}, this.outerSvg_);
    this.svgBackground_ = Blockly.utils.dom.createSvgElement("rect", { "class": "blocklyScrollbarBackground" }, this.svgGroup_);
    a = Math.floor((Blockly.Scrollbar.scrollbarThickness - 5) / 2);
    this.svgHandle_ = Blockly.utils.dom.createSvgElement("rect", { "class": "blocklyScrollbarHandle", rx: a, ry: a }, this.svgGroup_);
    this.workspace_.getThemeManager().subscribe(this.svgHandle_, "scrollbarColour", "fill");
    this.workspace_.getThemeManager().subscribe(this.svgHandle_, "scrollbarOpacity", "fill-opacity");
    Blockly.utils.dom.insertAfter(this.outerSvg_, this.workspace_.getParentSvg())
};
Blockly.Scrollbar.prototype.isVisible = function() { return this.isVisible_ };
Blockly.Scrollbar.prototype.setContainerVisible = function(a) {
    var b = a != this.containerVisible_;
    this.containerVisible_ = a;
    b && this.updateDisplay_()
};
Blockly.Scrollbar.prototype.setVisible = function(a) {
    var b = a != this.isVisible();
    if (this.pair_) throw Error("Unable to toggle visibility of paired scrollbars.");
    this.isVisible_ = a;
    b && this.updateDisplay_()
};
Blockly.Scrollbar.prototype.updateDisplay_ = function() { this.containerVisible_ && this.isVisible() ? this.outerSvg_.setAttribute("display", "block") : this.outerSvg_.setAttribute("display", "none") };
Blockly.Scrollbar.prototype.onMouseDownBar_ = function(a) {
    this.workspace_.markFocused();
    Blockly.Touch.clearTouchIdentifier();
    this.cleanUp_();
    if (Blockly.utils.isRightButton(a)) a.stopPropagation();
    else {
        var b = Blockly.utils.mouseToSvg(a, this.workspace_.getParentSvg(), this.workspace_.getInverseScreenCTM());
        b = this.horizontal_ ? b.x : b.y;
        var c = Blockly.utils.getInjectionDivXY_(this.svgHandle_);
        c = this.horizontal_ ? c.x : c.y;
        var d = this.handlePosition_,
            e = .95 * this.handleLength_;
        b <= c ? d -= e : b >= c + this.handleLength_ && (d +=
            e);
        this.setHandlePosition(this.constrainHandle_(d));
        this.onScroll_();
        a.stopPropagation();
        a.preventDefault()
    }
};
Blockly.Scrollbar.prototype.onMouseDownHandle_ = function(a) {
    this.workspace_.markFocused();
    this.cleanUp_();
    Blockly.utils.isRightButton(a) ? a.stopPropagation() : (this.startDragHandle = this.handlePosition_, this.workspace_.setupDragSurface(), this.startDragMouse_ = this.horizontal_ ? a.clientX : a.clientY, Blockly.Scrollbar.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(document, "mouseup", this, this.onMouseUpHandle_), Blockly.Scrollbar.onMouseMoveWrapper_ = Blockly.bindEventWithChecks_(document, "mousemove", this, this.onMouseMoveHandle_),
        a.stopPropagation(), a.preventDefault())
};
Blockly.Scrollbar.prototype.onMouseMoveHandle_ = function(a) {
    this.setHandlePosition(this.constrainHandle_(this.startDragHandle + ((this.horizontal_ ? a.clientX : a.clientY) - this.startDragMouse_)));
    this.onScroll_()
};
Blockly.Scrollbar.prototype.onMouseUpHandle_ = function() {
    this.workspace_.resetDragSurface();
    Blockly.Touch.clearTouchIdentifier();
    this.cleanUp_()
};
Blockly.Scrollbar.prototype.cleanUp_ = function() {
    Blockly.hideChaff(!0);
    Blockly.Scrollbar.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Scrollbar.onMouseUpWrapper_), Blockly.Scrollbar.onMouseUpWrapper_ = null);
    Blockly.Scrollbar.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Scrollbar.onMouseMoveWrapper_), Blockly.Scrollbar.onMouseMoveWrapper_ = null)
};
Blockly.Scrollbar.prototype.constrainHandle_ = function(a) { return a = 0 >= a || isNaN(a) || this.scrollViewSize_ < this.handleLength_ ? 0 : Math.min(a, this.scrollViewSize_ - this.handleLength_) };
Blockly.Scrollbar.prototype.onScroll_ = function() {
    var a = this.handlePosition_ / this.scrollViewSize_;
    isNaN(a) && (a = 0);
    var b = {};
    this.horizontal_ ? b.x = a : b.y = a;
    this.workspace_.setMetrics(b)
};
Blockly.Scrollbar.prototype.set = function(a) {
    this.setHandlePosition(this.constrainHandle_(a * this.ratio_));
    this.onScroll_()
};
Blockly.Scrollbar.prototype.setOrigin = function(a, b) { this.origin_ = new Blockly.utils.Coordinate(a, b) };
Blockly.Tooltip = {};
Blockly.Tooltip.visible = !1;
Blockly.Tooltip.blocked_ = !1;
Blockly.Tooltip.LIMIT = 50;
Blockly.Tooltip.mouseOutPid_ = 0;
Blockly.Tooltip.showPid_ = 0;
Blockly.Tooltip.lastX_ = 0;
Blockly.Tooltip.lastY_ = 0;
Blockly.Tooltip.element_ = null;
Blockly.Tooltip.poisonedElement_ = null;
Blockly.Tooltip.OFFSET_X = 0;
Blockly.Tooltip.OFFSET_Y = 10;
Blockly.Tooltip.RADIUS_OK = 10;
Blockly.Tooltip.HOVER_MS = 750;
Blockly.Tooltip.MARGINS = 5;
Blockly.Tooltip.DIV = null;
Blockly.Tooltip.createDom = function() { Blockly.Tooltip.DIV || (Blockly.Tooltip.DIV = document.createElement("div"), Blockly.Tooltip.DIV.className = "blocklyTooltipDiv", (Blockly.parentContainer || document.body).appendChild(Blockly.Tooltip.DIV)) };
Blockly.Tooltip.bindMouseEvents = function(a) {
    a.mouseOverWrapper_ = Blockly.bindEvent_(a, "mouseover", null, Blockly.Tooltip.onMouseOver_);
    a.mouseOutWrapper_ = Blockly.bindEvent_(a, "mouseout", null, Blockly.Tooltip.onMouseOut_);
    a.addEventListener("mousemove", Blockly.Tooltip.onMouseMove_, !1)
};
Blockly.Tooltip.unbindMouseEvents = function(a) { a && (Blockly.unbindEvent_(a.mouseOverWrapper_), Blockly.unbindEvent_(a.mouseOutWrapper_), a.removeEventListener("mousemove", Blockly.Tooltip.onMouseMove_)) };
Blockly.Tooltip.onMouseOver_ = function(a) {
    if (!Blockly.Tooltip.blocked_) {
        for (a = a.currentTarget;
            "string" != typeof a.tooltip && "function" != typeof a.tooltip;) a = a.tooltip;
        Blockly.Tooltip.element_ != a && (Blockly.Tooltip.hide(), Blockly.Tooltip.poisonedElement_ = null, Blockly.Tooltip.element_ = a);
        clearTimeout(Blockly.Tooltip.mouseOutPid_)
    }
};
Blockly.Tooltip.onMouseOut_ = function(a) {
    Blockly.Tooltip.blocked_ || (Blockly.Tooltip.mouseOutPid_ = setTimeout(function() {
        Blockly.Tooltip.element_ = null;
        Blockly.Tooltip.poisonedElement_ = null;
        Blockly.Tooltip.hide()
    }, 1), clearTimeout(Blockly.Tooltip.showPid_))
};
Blockly.Tooltip.onMouseMove_ = function(a) {
    if (Blockly.Tooltip.element_ && Blockly.Tooltip.element_.tooltip && !Blockly.Tooltip.blocked_)
        if (Blockly.Tooltip.visible) {
            var b = Blockly.Tooltip.lastX_ - a.pageX;
            a = Blockly.Tooltip.lastY_ - a.pageY;
            Math.sqrt(b * b + a * a) > Blockly.Tooltip.RADIUS_OK && Blockly.Tooltip.hide()
        } else Blockly.Tooltip.poisonedElement_ != Blockly.Tooltip.element_ && (clearTimeout(Blockly.Tooltip.showPid_), Blockly.Tooltip.lastX_ = a.pageX, Blockly.Tooltip.lastY_ = a.pageY, Blockly.Tooltip.showPid_ = setTimeout(Blockly.Tooltip.show_,
            Blockly.Tooltip.HOVER_MS))
};
Blockly.Tooltip.dispose = function() {
    Blockly.Tooltip.element_ = null;
    Blockly.Tooltip.poisonedElement_ = null;
    Blockly.Tooltip.hide()
};
Blockly.Tooltip.hide = function() {
    Blockly.Tooltip.visible && (Blockly.Tooltip.visible = !1, Blockly.Tooltip.DIV && (Blockly.Tooltip.DIV.style.display = "none"));
    Blockly.Tooltip.showPid_ && clearTimeout(Blockly.Tooltip.showPid_)
};
Blockly.Tooltip.block = function() {
    Blockly.Tooltip.hide();
    Blockly.Tooltip.blocked_ = !0
};
Blockly.Tooltip.unblock = function() { Blockly.Tooltip.blocked_ = !1 };
Blockly.Tooltip.show_ = function() {
    if (!Blockly.Tooltip.blocked_ && (Blockly.Tooltip.poisonedElement_ = Blockly.Tooltip.element_, Blockly.Tooltip.DIV)) {
        Blockly.Tooltip.DIV.textContent = "";
        for (var a = Blockly.Tooltip.element_.tooltip;
            "function" == typeof a;) a = a();
        a = Blockly.utils.string.wrap(a, Blockly.Tooltip.LIMIT);
        a = a.split("\n");
        for (var b = 0; b < a.length; b++) {
            var c = document.createElement("div");
            c.appendChild(document.createTextNode(a[b]));
            Blockly.Tooltip.DIV.appendChild(c)
        }
        a = Blockly.Tooltip.element_.RTL;
        b = document.documentElement.clientWidth;
        c = document.documentElement.clientHeight;
        Blockly.Tooltip.DIV.style.direction = a ? "rtl" : "ltr";
        Blockly.Tooltip.DIV.style.display = "block";
        Blockly.Tooltip.visible = !0;
        var d = Blockly.Tooltip.lastX_;
        d = a ? d - (Blockly.Tooltip.OFFSET_X + Blockly.Tooltip.DIV.offsetWidth) : d + Blockly.Tooltip.OFFSET_X;
        var e = Blockly.Tooltip.lastY_ + Blockly.Tooltip.OFFSET_Y;
        e + Blockly.Tooltip.DIV.offsetHeight > c + window.scrollY && (e -= Blockly.Tooltip.DIV.offsetHeight + 2 * Blockly.Tooltip.OFFSET_Y);
        a ? d = Math.max(Blockly.Tooltip.MARGINS - window.scrollX,
            d) : d + Blockly.Tooltip.DIV.offsetWidth > b + window.scrollX - 2 * Blockly.Tooltip.MARGINS && (d = b - Blockly.Tooltip.DIV.offsetWidth - 2 * Blockly.Tooltip.MARGINS);
        Blockly.Tooltip.DIV.style.top = e + "px";
        Blockly.Tooltip.DIV.style.left = d + "px"
    }
};
Blockly.WorkspaceDragSurfaceSvg = function(a) {
    this.container_ = a;
    this.createDom()
};
Blockly.WorkspaceDragSurfaceSvg.prototype.SVG_ = null;
Blockly.WorkspaceDragSurfaceSvg.prototype.dragGroup_ = null;
Blockly.WorkspaceDragSurfaceSvg.prototype.container_ = null;
Blockly.WorkspaceDragSurfaceSvg.prototype.createDom = function() { this.SVG_ || (this.SVG_ = Blockly.utils.dom.createSvgElement("svg", { xmlns: Blockly.utils.dom.SVG_NS, "xmlns:html": Blockly.utils.dom.HTML_NS, "xmlns:xlink": Blockly.utils.dom.XLINK_NS, version: "1.1", "class": "blocklyWsDragSurface blocklyOverflowVisible" }, null), this.container_.appendChild(this.SVG_)) };
Blockly.WorkspaceDragSurfaceSvg.prototype.translateSurface = function(a, b) {
    a = a.toFixed(0);
    b = b.toFixed(0);
    this.SVG_.style.display = "block";
    Blockly.utils.dom.setCssTransform(this.SVG_, "translate3d(" + a + "px, " + b + "px, 0px)")
};
Blockly.WorkspaceDragSurfaceSvg.prototype.getSurfaceTranslation = function() { return Blockly.utils.getRelativeXY(this.SVG_) };
Blockly.WorkspaceDragSurfaceSvg.prototype.clearAndHide = function(a) {
    if (!a) throw Error("Couldn't clear and hide the drag surface: missing new surface.");
    var b = this.SVG_.childNodes[0],
        c = this.SVG_.childNodes[1];
    if (!(b && c && Blockly.utils.dom.hasClass(b, "blocklyBlockCanvas") && Blockly.utils.dom.hasClass(c, "blocklyBubbleCanvas"))) throw Error("Couldn't clear and hide the drag surface. A node was missing.");
    null != this.previousSibling_ ? Blockly.utils.dom.insertAfter(b, this.previousSibling_) : a.insertBefore(b, a.firstChild);
    Blockly.utils.dom.insertAfter(c, b);
    this.SVG_.style.display = "none";
    if (this.SVG_.childNodes.length) throw Error("Drag surface was not cleared.");
    Blockly.utils.dom.setCssTransform(this.SVG_, "");
    this.previousSibling_ = null
};
Blockly.WorkspaceDragSurfaceSvg.prototype.setContentsAndShow = function(a, b, c, d, e, f) {
    if (this.SVG_.childNodes.length) throw Error("Already dragging a block.");
    this.previousSibling_ = c;
    a.setAttribute("transform", "translate(0, 0) scale(" + f + ")");
    b.setAttribute("transform", "translate(0, 0) scale(" + f + ")");
    this.SVG_.setAttribute("width", d);
    this.SVG_.setAttribute("height", e);
    this.SVG_.appendChild(a);
    this.SVG_.appendChild(b);
    this.SVG_.style.display = "block"
};
Blockly.ASTNode = function(a, b, c) {
    if (!b) throw Error("Cannot create a node without a location.");
    this.type_ = a;
    this.isConnection_ = Blockly.ASTNode.isConnectionType_(a);
    this.location_ = b;
    this.processParams_(c || null)
};
Blockly.ASTNode.types = { FIELD: "field", BLOCK: "block", INPUT: "input", OUTPUT: "output", NEXT: "next", PREVIOUS: "previous", STACK: "stack", WORKSPACE: "workspace" };
Blockly.ASTNode.NAVIGATE_ALL_FIELDS = !1;
Blockly.ASTNode.DEFAULT_OFFSET_Y = -20;
Blockly.ASTNode.isConnectionType_ = function(a) {
    switch (a) {
        case Blockly.ASTNode.types.PREVIOUS:
        case Blockly.ASTNode.types.NEXT:
        case Blockly.ASTNode.types.INPUT:
        case Blockly.ASTNode.types.OUTPUT:
            return !0
    }
    return !1
};
Blockly.ASTNode.createFieldNode = function(a) { return a ? new Blockly.ASTNode(Blockly.ASTNode.types.FIELD, a) : null };
Blockly.ASTNode.createConnectionNode = function(a) { return a ? a.type == Blockly.INPUT_VALUE || a.type == Blockly.NEXT_STATEMENT && a.getParentInput() ? Blockly.ASTNode.createInputNode(a.getParentInput()) : a.type == Blockly.NEXT_STATEMENT ? new Blockly.ASTNode(Blockly.ASTNode.types.NEXT, a) : a.type == Blockly.OUTPUT_VALUE ? new Blockly.ASTNode(Blockly.ASTNode.types.OUTPUT, a) : a.type == Blockly.PREVIOUS_STATEMENT ? new Blockly.ASTNode(Blockly.ASTNode.types.PREVIOUS, a) : null : null };
Blockly.ASTNode.createInputNode = function(a) { return a && a.connection ? new Blockly.ASTNode(Blockly.ASTNode.types.INPUT, a.connection) : null };
Blockly.ASTNode.createBlockNode = function(a) { return a ? new Blockly.ASTNode(Blockly.ASTNode.types.BLOCK, a) : null };
Blockly.ASTNode.createStackNode = function(a) { return a ? new Blockly.ASTNode(Blockly.ASTNode.types.STACK, a) : null };
Blockly.ASTNode.createWorkspaceNode = function(a, b) { return b && a ? new Blockly.ASTNode(Blockly.ASTNode.types.WORKSPACE, a, { wsCoordinate: b }) : null };
Blockly.ASTNode.prototype.processParams_ = function(a) { a && a.wsCoordinate && (this.wsCoordinate_ = a.wsCoordinate) };
Blockly.ASTNode.prototype.getLocation = function() { return this.location_ };
Blockly.ASTNode.prototype.getType = function() { return this.type_ };
Blockly.ASTNode.prototype.getWsCoordinate = function() { return this.wsCoordinate_ };
Blockly.ASTNode.prototype.isConnection = function() { return this.isConnection_ };
Blockly.ASTNode.prototype.findNextForInput_ = function() {
    var a = this.location_.getParentInput(),
        b = a.getSourceBlock();
    a = b.inputList.indexOf(a) + 1;
    for (var c; c = b.inputList[a]; a++) {
        for (var d = c.fieldRow, e = 0, f; f = d[e]; e++)
            if (f.isClickable() || Blockly.ASTNode.NAVIGATE_ALL_FIELDS) return Blockly.ASTNode.createFieldNode(f);
        if (c.connection) return Blockly.ASTNode.createInputNode(c)
    }
    return null
};
Blockly.ASTNode.prototype.findNextForField_ = function() {
    var a = this.location_,
        b = a.getParentInput(),
        c = a.getSourceBlock(),
        d = c.inputList.indexOf(b);
    for (a = b.fieldRow.indexOf(a) + 1; b = c.inputList[d]; d++) {
        for (var e = b.fieldRow; a < e.length;) {
            if (e[a].isClickable() || Blockly.ASTNode.NAVIGATE_ALL_FIELDS) return Blockly.ASTNode.createFieldNode(e[a]);
            a++
        }
        a = 0;
        if (b.connection) return Blockly.ASTNode.createInputNode(b)
    }
    return null
};
Blockly.ASTNode.prototype.findPrevForInput_ = function() {
    for (var a = this.location_.getParentInput(), b = a.getSourceBlock(), c = b.inputList.indexOf(a), d; d = b.inputList[c]; c--) {
        if (d.connection && d !== a) return Blockly.ASTNode.createInputNode(d);
        d = d.fieldRow;
        for (var e = d.length - 1, f; f = d[e]; e--)
            if (f.isClickable() || Blockly.ASTNode.NAVIGATE_ALL_FIELDS) return Blockly.ASTNode.createFieldNode(f)
    }
    return null
};
Blockly.ASTNode.prototype.findPrevForField_ = function() {
    var a = this.location_,
        b = a.getParentInput(),
        c = a.getSourceBlock(),
        d = c.inputList.indexOf(b);
    a = b.fieldRow.indexOf(a) - 1;
    for (var e; e = c.inputList[d]; d--) {
        if (e.connection && e !== b) return Blockly.ASTNode.createInputNode(e);
        for (e = e.fieldRow; - 1 < a;) {
            if (e[a].isClickable() || Blockly.ASTNode.NAVIGATE_ALL_FIELDS) return Blockly.ASTNode.createFieldNode(e[a]);
            a--
        }
        0 <= d - 1 && (a = c.inputList[d - 1].fieldRow.length - 1)
    }
    return null
};
Blockly.ASTNode.prototype.navigateBetweenStacks_ = function(a) {
    var b = this.getLocation();
    b instanceof Blockly.Block || (b = b.getSourceBlock());
    if (!b || !b.workspace) return null;
    var c = b.getRootBlock();
    b = c.workspace.getTopBlocks(!0);
    for (var d = 0, e; e = b[d]; d++)
        if (c.id == e.id) return a = d + (a ? 1 : -1), -1 == a || a == b.length ? null : Blockly.ASTNode.createStackNode(b[a]);
    throw Error("Couldn't find " + (a ? "next" : "previous") + " stack?!");
};
Blockly.ASTNode.prototype.findTopASTNodeForBlock_ = function(a) { var b = a.previousConnection || a.outputConnection; return b ? Blockly.ASTNode.createConnectionNode(b) : Blockly.ASTNode.createBlockNode(a) };
Blockly.ASTNode.prototype.getOutAstNodeForBlock_ = function(a) {
    if (!a) return null;
    a = a.getTopStackBlock();
    var b = a.previousConnection || a.outputConnection;
    return b && b.targetConnection && b.targetConnection.getParentInput() ? Blockly.ASTNode.createInputNode(b.targetConnection.getParentInput()) : Blockly.ASTNode.createStackNode(a)
};
Blockly.ASTNode.prototype.findFirstFieldOrInput_ = function(a) {
    a = a.inputList;
    for (var b = 0, c; c = a[b]; b++) {
        for (var d = c.fieldRow, e = 0, f; f = d[e]; e++)
            if (f.isClickable() || Blockly.ASTNode.NAVIGATE_ALL_FIELDS) return Blockly.ASTNode.createFieldNode(f);
        if (c.connection) return Blockly.ASTNode.createInputNode(c)
    }
    return null
};
Blockly.ASTNode.prototype.getSourceBlock = function() { return this.getType() === Blockly.ASTNode.types.BLOCK ? this.getLocation() : this.getType() === Blockly.ASTNode.types.STACK ? this.getLocation() : this.getType() === Blockly.ASTNode.types.WORKSPACE ? null : this.getLocation().getSourceBlock() };
Blockly.ASTNode.prototype.next = function() {
    switch (this.type_) {
        case Blockly.ASTNode.types.STACK:
            return this.navigateBetweenStacks_(!0);
        case Blockly.ASTNode.types.OUTPUT:
            return Blockly.ASTNode.createBlockNode(this.location_.getSourceBlock());
        case Blockly.ASTNode.types.FIELD:
            return this.findNextForField_();
        case Blockly.ASTNode.types.INPUT:
            return this.findNextForInput_();
        case Blockly.ASTNode.types.BLOCK:
            return Blockly.ASTNode.createConnectionNode(this.location_.nextConnection);
        case Blockly.ASTNode.types.PREVIOUS:
            return Blockly.ASTNode.createBlockNode(this.location_.getSourceBlock());
        case Blockly.ASTNode.types.NEXT:
            return Blockly.ASTNode.createConnectionNode(this.location_.targetConnection)
    }
    return null
};
Blockly.ASTNode.prototype.in = function() {
    switch (this.type_) {
        case Blockly.ASTNode.types.WORKSPACE:
            var a = this.location_.getTopBlocks(!0);
            if (0 < a.length) return Blockly.ASTNode.createStackNode(a[0]);
            break;
        case Blockly.ASTNode.types.STACK:
            return a = this.location_, this.findTopASTNodeForBlock_(a);
        case Blockly.ASTNode.types.BLOCK:
            return a = this.location_, this.findFirstFieldOrInput_(a);
        case Blockly.ASTNode.types.INPUT:
            return Blockly.ASTNode.createConnectionNode(this.location_.targetConnection)
    }
    return null
};
Blockly.ASTNode.prototype.prev = function() {
    switch (this.type_) {
        case Blockly.ASTNode.types.STACK:
            return this.navigateBetweenStacks_(!1);
        case Blockly.ASTNode.types.FIELD:
            return this.findPrevForField_();
        case Blockly.ASTNode.types.INPUT:
            return this.findPrevForInput_();
        case Blockly.ASTNode.types.BLOCK:
            var a = this.location_;
            return Blockly.ASTNode.createConnectionNode(a.previousConnection || a.outputConnection);
        case Blockly.ASTNode.types.PREVIOUS:
            if ((a = this.location_.targetConnection) && !a.getParentInput()) return Blockly.ASTNode.createConnectionNode(a);
            break;
        case Blockly.ASTNode.types.NEXT:
            return Blockly.ASTNode.createBlockNode(this.location_.getSourceBlock())
    }
    return null
};
Blockly.ASTNode.prototype.out = function() {
    switch (this.type_) {
        case Blockly.ASTNode.types.STACK:
            var a = this.location_.getRelativeToSurfaceXY();
            a = new Blockly.utils.Coordinate(a.x, a.y + Blockly.ASTNode.DEFAULT_OFFSET_Y);
            return Blockly.ASTNode.createWorkspaceNode(this.location_.workspace, a);
        case Blockly.ASTNode.types.OUTPUT:
            return (a = this.location_.targetConnection) ? Blockly.ASTNode.createConnectionNode(a) : Blockly.ASTNode.createStackNode(this.location_.getSourceBlock());
        case Blockly.ASTNode.types.FIELD:
            return Blockly.ASTNode.createBlockNode(this.location_.getSourceBlock());
        case Blockly.ASTNode.types.INPUT:
            return Blockly.ASTNode.createBlockNode(this.location_.getSourceBlock());
        case Blockly.ASTNode.types.BLOCK:
            return this.getOutAstNodeForBlock_(this.location_);
        case Blockly.ASTNode.types.PREVIOUS:
            return this.getOutAstNodeForBlock_(this.location_.getSourceBlock());
        case Blockly.ASTNode.types.NEXT:
            return this.getOutAstNodeForBlock_(this.location_.getSourceBlock())
    }
    return null
};
Blockly.Blocks = Object.create(null);
Blockly.Connection = function(a, b) {
    this.sourceBlock_ = a;
    this.type = b
};
Blockly.Connection.CAN_CONNECT = 0;
Blockly.Connection.REASON_SELF_CONNECTION = 1;
Blockly.Connection.REASON_WRONG_TYPE = 2;
Blockly.Connection.REASON_TARGET_NULL = 3;
Blockly.Connection.REASON_CHECKS_FAILED = 4;
Blockly.Connection.REASON_DIFFERENT_WORKSPACES = 5;
Blockly.Connection.REASON_SHADOW_PARENT = 6;
Blockly.Connection.prototype.targetConnection = null;
Blockly.Connection.prototype.disposed = !1;
Blockly.Connection.prototype.check_ = null;
Blockly.Connection.prototype.shadowDom_ = null;
Blockly.Connection.prototype.x = 0;
Blockly.Connection.prototype.y = 0;
Blockly.Connection.prototype.connect_ = function(a) {
    var b = this,
        c = b.getSourceBlock(),
        d = a.getSourceBlock();
    a.isConnected() && a.disconnect();
    if (b.isConnected()) {
        var e = b.targetBlock(),
            f = b.getShadowDom();
        b.setShadowDom(null);
        if (e.isShadow()) f = Blockly.Xml.blockToDom(e), e.dispose(!1), e = null;
        else if (b.type == Blockly.INPUT_VALUE) {
            if (!e.outputConnection) throw Error("Orphan block does not have an output connection.");
            var g = Blockly.Connection.lastConnectionInRow(d, e);
            g && (e.outputConnection.connect(g), e = null)
        } else if (b.type ==
            Blockly.NEXT_STATEMENT) {
            if (!e.previousConnection) throw Error("Orphan block does not have a previous connection.");
            for (g = d; g.nextConnection;) {
                var h = g.getNextBlock();
                if (h && !h.isShadow()) g = h;
                else { e.previousConnection.checkType(g.nextConnection) && (g.nextConnection.connect(e.previousConnection), e = null); break }
            }
        }
        if (e && (b.disconnect(), Blockly.Events.recordUndo)) {
            var k = Blockly.Events.getGroup();
            setTimeout(function() {
                if (e.workspace && !e.getParent()) {
                    Blockly.Events.setGroup(k);
                    if (e.outputConnection) e.outputConnection.onFailedConnect(b);
                    else if (e.previousConnection) e.previousConnection.onFailedConnect(b);
                    Blockly.Events.setGroup(!1)
                }
            }, Blockly.BUMP_DELAY)
        }
        b.setShadowDom(f)
    }
    var l;
    Blockly.Events.isEnabled() && (l = new Blockly.Events.BlockMove(d));
    Blockly.Connection.connectReciprocally_(b, a);
    d.setParent(c);
    l && (l.recordNew(), Blockly.Events.fire(l))
};
Blockly.Connection.prototype.dispose = function() {
    if (this.isConnected()) {
        this.setShadowDom(null);
        var a = this.targetBlock();
        a.isShadow() ? a.dispose(!1) : a.unplug()
    }
    this.disposed = !0
};
Blockly.Connection.prototype.getSourceBlock = function() { return this.sourceBlock_ };
Blockly.Connection.prototype.isSuperior = function() { return this.type == Blockly.INPUT_VALUE || this.type == Blockly.NEXT_STATEMENT };
Blockly.Connection.prototype.isConnected = function() { return !!this.targetConnection };
Blockly.Connection.prototype.canConnectWithReason = function(a) {
    if (!a) return Blockly.Connection.REASON_TARGET_NULL;
    if (this.isSuperior()) var b = this.sourceBlock_,
        c = a.getSourceBlock();
    else c = this.sourceBlock_, b = a.getSourceBlock();
    return b && b == c ? Blockly.Connection.REASON_SELF_CONNECTION : a.type != Blockly.OPPOSITE_TYPE[this.type] ? Blockly.Connection.REASON_WRONG_TYPE : b && c && b.workspace !== c.workspace ? Blockly.Connection.REASON_DIFFERENT_WORKSPACES : this.checkType(a) ? b.isShadow() && !c.isShadow() ? Blockly.Connection.REASON_SHADOW_PARENT :
        Blockly.Connection.CAN_CONNECT : Blockly.Connection.REASON_CHECKS_FAILED
};
Blockly.Connection.prototype.checkConnection = function(a) {
    switch (this.canConnectWithReason(a)) {
        case Blockly.Connection.CAN_CONNECT:
            break;
        case Blockly.Connection.REASON_SELF_CONNECTION:
            throw Error("Attempted to connect a block to itself.");
        case Blockly.Connection.REASON_DIFFERENT_WORKSPACES:
            throw Error("Blocks not on same workspace.");
        case Blockly.Connection.REASON_WRONG_TYPE:
            throw Error("Attempt to connect incompatible types.");
        case Blockly.Connection.REASON_TARGET_NULL:
            throw Error("Target connection is null.");
        case Blockly.Connection.REASON_CHECKS_FAILED:
            throw Error("Connection checks failed. " + (this + " expected " + this.check_ + ", found " + a.check_));
        case Blockly.Connection.REASON_SHADOW_PARENT:
            throw Error("Connecting non-shadow to shadow block.");
        default:
            throw Error("Unknown connection failure: this should never happen!");
    }
};
Blockly.Connection.prototype.canConnectToPrevious_ = function(a) {
    if (this.targetConnection || -1 != Blockly.draggingConnections.indexOf(a)) return !1;
    if (!a.targetConnection) return !0;
    a = a.targetBlock();
    return a.isInsertionMarker() ? !a.getPreviousBlock() : !1
};
Blockly.Connection.prototype.isConnectionAllowed = function(a) {
    if (a.sourceBlock_.isInsertionMarker() || this.canConnectWithReason(a) != Blockly.Connection.CAN_CONNECT) return !1;
    switch (a.type) {
        case Blockly.PREVIOUS_STATEMENT:
            return this.canConnectToPrevious_(a);
        case Blockly.OUTPUT_VALUE:
            if (a.isConnected() && !a.targetBlock().isInsertionMarker() || this.isConnected()) return !1;
            break;
        case Blockly.INPUT_VALUE:
            if (a.isConnected() && !a.targetBlock().isMovable() && !a.targetBlock().isShadow()) return !1;
            break;
        case Blockly.NEXT_STATEMENT:
            if (a.isConnected() &&
                !this.sourceBlock_.nextConnection && !a.targetBlock().isShadow() && a.targetBlock().nextConnection) return !1;
            break;
        default:
            throw Error("Unknown connection type in isConnectionAllowed");
    }
    return -1 != Blockly.draggingConnections.indexOf(a) ? !1 : !0
};
Blockly.Connection.prototype.onFailedConnect = function(a) {};
Blockly.Connection.prototype.connect = function(a) {
    if (this.targetConnection != a) {
        this.checkConnection(a);
        var b = Blockly.Events.getGroup();
        b || Blockly.Events.setGroup(!0);
        this.isSuperior() ? this.connect_(a) : a.connect_(this);
        b || Blockly.Events.setGroup(!1)
    }
};
Blockly.Connection.connectReciprocally_ = function(a, b) {
    if (!a || !b) throw Error("Cannot connect null connections.");
    a.targetConnection = b;
    b.targetConnection = a
};
Blockly.Connection.singleConnection_ = function(a, b) {
    for (var c = null, d = 0; d < a.inputList.length; d++) {
        var e = a.inputList[d].connection;
        if (e && e.type == Blockly.INPUT_VALUE && b.outputConnection.checkType(e)) {
            if (c) return null;
            c = e
        }
    }
    return c
};
Blockly.Connection.lastConnectionInRow = function(a, b) {
    for (var c; c = Blockly.Connection.singleConnection_(a, b);)
        if (a = c.targetBlock(), !a || a.isShadow()) return c;
    return null
};
Blockly.Connection.prototype.disconnect = function() {
    var a = this.targetConnection;
    if (!a) throw Error("Source connection not connected.");
    if (a.targetConnection != this) throw Error("Target connection not connected to source connection.");
    if (this.isSuperior()) {
        var b = this.sourceBlock_;
        var c = a.getSourceBlock();
        a = this
    } else b = a.getSourceBlock(), c = this.sourceBlock_;
    var d = Blockly.Events.getGroup();
    d || Blockly.Events.setGroup(!0);
    this.disconnectInternal_(b, c);
    a.respawnShadow_();
    d || Blockly.Events.setGroup(!1)
};
Blockly.Connection.prototype.disconnectInternal_ = function(a, b) {
    var c;
    Blockly.Events.isEnabled() && (c = new Blockly.Events.BlockMove(b));
    this.targetConnection = this.targetConnection.targetConnection = null;
    b.setParent(null);
    c && (c.recordNew(), Blockly.Events.fire(c))
};
Blockly.Connection.prototype.respawnShadow_ = function() {
    var a = this.getSourceBlock(),
        b = this.getShadowDom();
    if (a.workspace && b && Blockly.Events.recordUndo)
        if (a = Blockly.Xml.domToBlock(b, a.workspace), a.outputConnection) this.connect(a.outputConnection);
        else if (a.previousConnection) this.connect(a.previousConnection);
    else throw Error("Child block does not have output or previous statement.");
};
Blockly.Connection.prototype.targetBlock = function() { return this.isConnected() ? this.targetConnection.getSourceBlock() : null };
Blockly.Connection.prototype.checkType = function(a) {
    if (!this.check_ || !a.check_) return !0;
    for (var b = 0; b < this.check_.length; b++)
        if (-1 != a.check_.indexOf(this.check_[b])) return !0;
    return !1
};
Blockly.Connection.prototype.checkType_ = function(a) { console.warn("Deprecated call to Blockly.Connection.prototype.checkType_, use Blockly.Connection.prototype.checkType instead."); return this.checkType(a) };
Blockly.Connection.prototype.onCheckChanged_ = function() {!this.isConnected() || this.targetConnection && this.checkType(this.targetConnection) || (this.isSuperior() ? this.targetBlock() : this.sourceBlock_).unplug() };
Blockly.Connection.prototype.setCheck = function(a) { a ? (Array.isArray(a) || (a = [a]), this.check_ = a, this.onCheckChanged_()) : this.check_ = null; return this };
Blockly.Connection.prototype.getCheck = function() { return this.check_ };
Blockly.Connection.prototype.setShadowDom = function(a) { this.shadowDom_ = a };
Blockly.Connection.prototype.getShadowDom = function() { return this.shadowDom_ };
Blockly.Connection.prototype.neighbours = function(a) { return [] };
Blockly.Connection.prototype.getParentInput = function() {
    for (var a = null, b = this.sourceBlock_, c = b.inputList, d = 0; d < b.inputList.length; d++)
        if (c[d].connection === this) { a = c[d]; break }
    return a
};
Blockly.Connection.prototype.toString = function() {
    var a = this.sourceBlock_;
    if (a)
        if (a.outputConnection == this) var b = "Output Connection of ";
        else if (a.previousConnection == this) b = "Previous Connection of ";
    else if (a.nextConnection == this) b = "Next Connection of ";
    else {
        b = null;
        for (var c = 0, d; d = a.inputList[c]; c++)
            if (d.connection == this) { b = d; break }
        if (b) b = 'Input "' + b.name + '" connection on ';
        else return console.warn("Connection not actually connected to sourceBlock_"), "Orphan Connection"
    } else return "Orphan Connection";
    return b + a.toDevString()
};
Blockly.Extensions = {};
Blockly.Extensions.ALL_ = {};
Blockly.Extensions.register = function(a, b) {
    if ("string" != typeof a || "" == a.trim()) throw Error('Error: Invalid extension name "' + a + '"');
    if (Blockly.Extensions.ALL_[a]) throw Error('Error: Extension "' + a + '" is already registered.');
    if ("function" != typeof b) throw Error('Error: Extension "' + a + '" must be a function');
    Blockly.Extensions.ALL_[a] = b
};
Blockly.Extensions.registerMixin = function(a, b) {
    if (!b || "object" != typeof b) throw Error('Error: Mixin "' + a + '" must be a object');
    Blockly.Extensions.register(a, function() { this.mixin(b) })
};
Blockly.Extensions.registerMutator = function(a, b, c, d) {
    var e = 'Error when registering mutator "' + a + '": ';
    Blockly.Extensions.checkHasFunction_(e, b.domToMutation, "domToMutation");
    Blockly.Extensions.checkHasFunction_(e, b.mutationToDom, "mutationToDom");
    var f = Blockly.Extensions.checkMutatorDialog_(b, e);
    if (c && "function" != typeof c) throw Error('Extension "' + a + '" is not a function');
    Blockly.Extensions.register(a, function() {
        if (f) {
            if (!Blockly.Mutator) throw Error(e + "Missing require for Blockly.Mutator");
            this.setMutator(new Blockly.Mutator(d || []))
        }
        this.mixin(b);
        c && c.apply(this)
    })
};
Blockly.Extensions.unregister = function(a) { Blockly.Extensions.ALL_[a] ? delete Blockly.Extensions.ALL_[a] : console.warn('No extension mapping for name "' + a + '" found to unregister') };
Blockly.Extensions.apply = function(a, b, c) {
    var d = Blockly.Extensions.ALL_[a];
    if ("function" != typeof d) throw Error('Error: Extension "' + a + '" not found.');
    if (c) Blockly.Extensions.checkNoMutatorProperties_(a, b);
    else var e = Blockly.Extensions.getMutatorProperties_(b);
    d.apply(b);
    if (c) Blockly.Extensions.checkBlockHasMutatorProperties_('Error after applying mutator "' + a + '": ', b);
    else if (!Blockly.Extensions.mutatorPropertiesMatch_(e, b)) throw Error('Error when applying extension "' + a + '": mutation properties changed when applying a non-mutator extension.');
};
Blockly.Extensions.checkHasFunction_ = function(a, b, c) { if (!b) throw Error(a + 'missing required property "' + c + '"'); if ("function" != typeof b) throw Error(a + '" required property "' + c + '" must be a function'); };
Blockly.Extensions.checkNoMutatorProperties_ = function(a, b) { if (Blockly.Extensions.getMutatorProperties_(b).length) throw Error('Error: tried to apply mutation "' + a + '" to a block that already has mutator functions.  Block id: ' + b.id); };
Blockly.Extensions.checkMutatorDialog_ = function(a, b) {
    var c = void 0 !== a.compose,
        d = void 0 !== a.decompose;
    if (c && d) { if ("function" != typeof a.compose) throw Error(b + "compose must be a function."); if ("function" != typeof a.decompose) throw Error(b + "decompose must be a function."); return !0 }
    if (c || d) throw Error(b + 'Must have both or neither of "compose" and "decompose"');
    return !1
};
Blockly.Extensions.checkBlockHasMutatorProperties_ = function(a, b) {
    if ("function" != typeof b.domToMutation) throw Error(a + 'Applying a mutator didn\'t add "domToMutation"');
    if ("function" != typeof b.mutationToDom) throw Error(a + 'Applying a mutator didn\'t add "mutationToDom"');
    Blockly.Extensions.checkMutatorDialog_(b, a)
};
Blockly.Extensions.getMutatorProperties_ = function(a) {
    var b = [];
    void 0 !== a.domToMutation && b.push(a.domToMutation);
    void 0 !== a.mutationToDom && b.push(a.mutationToDom);
    void 0 !== a.compose && b.push(a.compose);
    void 0 !== a.decompose && b.push(a.decompose);
    return b
};
Blockly.Extensions.mutatorPropertiesMatch_ = function(a, b) {
    b = Blockly.Extensions.getMutatorProperties_(b);
    if (b.length != a.length) return !1;
    for (var c = 0; c < b.length; c++)
        if (a[c] != b[c]) return !1;
    return !0
};
Blockly.Extensions.buildTooltipForDropdown = function(a, b) {
    var c = [];
    "object" == typeof document && Blockly.utils.runAfterPageLoad(function() { for (var a in b) Blockly.utils.checkMessageReferences(b[a]) });
    return function() {
        this.type && -1 == c.indexOf(this.type) && (Blockly.Extensions.checkDropdownOptionsInTable_(this, a, b), c.push(this.type));
        this.setTooltip(function() {
            var d = String(this.getFieldValue(a)),
                e = b[d];
            null == e ? -1 == c.indexOf(this.type) && (d = "No tooltip mapping for value " + d + " of field " + a, null != this.type &&
                (d += " of block type " + this.type), console.warn(d + ".")) : e = Blockly.utils.replaceMessageReferences(e);
            return e
        }.bind(this))
    }
};
Blockly.Extensions.checkDropdownOptionsInTable_ = function(a, b, c) {
    var d = a.getField(b);
    if (!d.isOptionListDynamic()) {
        d = d.getOptions();
        for (var e = 0; e < d.length; ++e) {
            var f = d[e][1];
            null == c[f] && console.warn("No tooltip mapping for value " + f + " of field " + b + " of block type " + a.type)
        }
    }
};
Blockly.Extensions.buildTooltipWithFieldText = function(a, b) { "object" == typeof document && Blockly.utils.runAfterPageLoad(function() { Blockly.utils.checkMessageReferences(a) }); return function() { this.setTooltip(function() { var c = this.getField(b); return Blockly.utils.replaceMessageReferences(a).replace("%1", c ? c.getText() : "") }.bind(this)) } };
Blockly.Extensions.extensionParentTooltip_ = function() {
    this.tooltipWhenNotConnected_ = this.tooltip;
    this.setTooltip(function() { var a = this.getParent(); return a && a.getInputsInline() && a.tooltip || this.tooltipWhenNotConnected_ }.bind(this))
};
Blockly.Extensions.register("parent_tooltip_when_inline", Blockly.Extensions.extensionParentTooltip_);
Blockly.fieldRegistry = {};
Blockly.fieldRegistry.typeMap_ = {};
Blockly.fieldRegistry.register = function(a, b) {
    if ("string" != typeof a || "" == a.trim()) throw Error('Invalid field type "' + a + '". The type must be a non-empty string.');
    if (Blockly.fieldRegistry.typeMap_[a]) throw Error('Error: Field "' + a + '" is already registered.');
    if (!b || "function" != typeof b.fromJson) throw Error('Field "' + b + '" must have a fromJson function');
    a = a.toLowerCase();
    Blockly.fieldRegistry.typeMap_[a] = b
};
Blockly.fieldRegistry.unregister = function(a) { Blockly.fieldRegistry.typeMap_[a] ? delete Blockly.fieldRegistry.typeMap_[a] : console.warn('No field mapping for type "' + a + '" found to unregister') };
Blockly.fieldRegistry.fromJson = function(a) {
    var b = a.type.toLowerCase();
    b = Blockly.fieldRegistry.typeMap_[b];
    return b ? b.fromJson(a) : (console.warn("Blockly could not create a field of type " + a.type + ". The field is probably not being registered. This could be because the file is not loaded, the field does not register itself (Issue #1584), or the registration is not being reached."), null)
};
Blockly.blockAnimations = {};
Blockly.blockAnimations.disconnectPid_ = 0;
Blockly.blockAnimations.disconnectGroup_ = null;
Blockly.blockAnimations.disposeUiEffect = function(a) {
    var b = a.workspace,
        c = a.getSvgRoot();
    b.getAudioManager().play("delete");
    a = b.getSvgXY(c);
    c = c.cloneNode(!0);
    c.translateX_ = a.x;
    c.translateY_ = a.y;
    c.setAttribute("transform", "translate(" + a.x + "," + a.y + ")");
    b.getParentSvg().appendChild(c);
    c.bBox_ = c.getBBox();
    Blockly.blockAnimations.disposeUiStep_(c, b.RTL, new Date, b.scale)
};
Blockly.blockAnimations.disposeUiStep_ = function(a, b, c, d) {
    var e = (new Date - c) / 150;
    1 < e ? Blockly.utils.dom.removeNode(a) : (a.setAttribute("transform", "translate(" + (a.translateX_ + (b ? -1 : 1) * a.bBox_.width * d / 2 * e) + "," + (a.translateY_ + a.bBox_.height * d * e) + ") scale(" + (1 - e) * d + ")"), setTimeout(Blockly.blockAnimations.disposeUiStep_, 10, a, b, c, d))
};
Blockly.blockAnimations.connectionUiEffect = function(a) {
    var b = a.workspace,
        c = b.scale;
    b.getAudioManager().play("click");
    if (!(1 > c)) {
        var d = b.getSvgXY(a.getSvgRoot());
        a.outputConnection ? (d.x += (a.RTL ? 3 : -3) * c, d.y += 13 * c) : a.previousConnection && (d.x += (a.RTL ? -23 : 23) * c, d.y += 3 * c);
        a = Blockly.utils.dom.createSvgElement("circle", { cx: d.x, cy: d.y, r: 0, fill: "none", stroke: "#888", "stroke-width": 10 }, b.getParentSvg());
        Blockly.blockAnimations.connectionUiStep_(a, new Date, c)
    }
};
Blockly.blockAnimations.connectionUiStep_ = function(a, b, c) {
    var d = (new Date - b) / 150;
    1 < d ? Blockly.utils.dom.removeNode(a) : (a.setAttribute("r", 25 * d * c), a.style.opacity = 1 - d, Blockly.blockAnimations.disconnectPid_ = setTimeout(Blockly.blockAnimations.connectionUiStep_, 10, a, b, c))
};
Blockly.blockAnimations.disconnectUiEffect = function(a) {
    a.workspace.getAudioManager().play("disconnect");
    if (!(1 > a.workspace.scale)) {
        var b = a.getHeightWidth().height;
        b = Math.atan(10 / b) / Math.PI * 180;
        a.RTL || (b *= -1);
        Blockly.blockAnimations.disconnectUiStep_(a.getSvgRoot(), b, new Date)
    }
};
Blockly.blockAnimations.disconnectUiStep_ = function(a, b, c) {
    var d = (new Date - c) / 200;
    1 < d ? a.skew_ = "" : (a.skew_ = "skewX(" + Math.round(Math.sin(d * Math.PI * 3) * (1 - d) * b) + ")", Blockly.blockAnimations.disconnectGroup_ = a, Blockly.blockAnimations.disconnectPid_ = setTimeout(Blockly.blockAnimations.disconnectUiStep_, 10, a, b, c));
    a.setAttribute("transform", a.translate_ + a.skew_)
};
Blockly.blockAnimations.disconnectUiStop = function() {
    if (Blockly.blockAnimations.disconnectGroup_) {
        clearTimeout(Blockly.blockAnimations.disconnectPid_);
        var a = Blockly.blockAnimations.disconnectGroup_;
        a.skew_ = "";
        a.setAttribute("transform", a.translate_);
        Blockly.blockAnimations.disconnectGroup_ = null
    }
};
Blockly.InsertionMarkerManager = function(a) {
    this.topBlock_ = Blockly.selected = a;
    this.workspace_ = a.workspace;
    this.lastMarker_ = this.lastOnStack_ = null;
    this.firstMarker_ = this.createMarkerBlock_(this.topBlock_);
    this.localConnection_ = this.closestConnection_ = null;
    this.wouldDeleteBlock_ = !1;
    this.fadedBlock_ = this.highlightedBlock_ = this.markerConnection_ = null;
    this.availableConnections_ = this.initAvailableConnections_()
};
Blockly.InsertionMarkerManager.PREVIEW_TYPE = { INSERTION_MARKER: 0, INPUT_OUTLINE: 1, REPLACEMENT_FADE: 2 };
Blockly.InsertionMarkerManager.prototype.dispose = function() {
    this.availableConnections_.length = 0;
    Blockly.Events.disable();
    try { this.firstMarker_ && this.firstMarker_.dispose(), this.lastMarker_ && this.lastMarker_.dispose() } finally { Blockly.Events.enable() }
};
Blockly.InsertionMarkerManager.prototype.wouldDeleteBlock = function() { return this.wouldDeleteBlock_ };
Blockly.InsertionMarkerManager.prototype.wouldConnectBlock = function() { return !!this.closestConnection_ };
Blockly.InsertionMarkerManager.prototype.applyConnections = function() {
    if (this.closestConnection_ && (Blockly.Events.disable(), this.hidePreview_(), Blockly.Events.enable(), this.localConnection_.connect(this.closestConnection_), this.topBlock_.rendered)) {
        var a = this.localConnection_.isSuperior() ? this.closestConnection_ : this.localConnection_;
        Blockly.blockAnimations.connectionUiEffect(a.getSourceBlock());
        this.topBlock_.getRootBlock().bringToFront()
    }
};
Blockly.InsertionMarkerManager.prototype.update = function(a, b) { var c = this.getCandidate_(a); if ((this.wouldDeleteBlock_ = this.shouldDelete_(c, b)) || this.shouldUpdatePreviews_(c, a)) Blockly.Events.disable(), this.maybeHidePreview_(c), this.maybeShowPreview_(c), Blockly.Events.enable() };
Blockly.InsertionMarkerManager.prototype.createMarkerBlock_ = function(a) {
    var b = a.type;
    Blockly.Events.disable();
    try {
        var c = this.workspace_.newBlock(b);
        c.setInsertionMarker(!0);
        if (a.mutationToDom) {
            var d = a.mutationToDom();
            d && c.domToMutation(d)
        }
        c.setCollapsed(a.isCollapsed());
        c.setInputsInline(a.getInputsInline());
        for (b = 0; b < a.inputList.length; b++) { var e = a.inputList[b]; if (e.isVisible()) { var f = c.inputList[b]; for (d = 0; d < e.fieldRow.length; d++) f.fieldRow[d].setValue(e.fieldRow[d].getValue()) } }
        c.initSvg();
        c.getSvgRoot().setAttribute("visibility",
            "hidden")
    } finally { Blockly.Events.enable() }
    return c
};
Blockly.InsertionMarkerManager.prototype.initAvailableConnections_ = function() {
    var a = this.topBlock_.getConnections_(!1),
        b = this.topBlock_.lastConnectionInStack();
    b && b != this.topBlock_.nextConnection && (a.push(b), this.lastOnStack_ = b, this.lastMarker_ = this.createMarkerBlock_(b.getSourceBlock()));
    return a
};
Blockly.InsertionMarkerManager.prototype.shouldUpdatePreviews_ = function(a, b) {
    var c = a.local,
        d = a.closest;
    a = a.radius;
    if (c && d) {
        if (this.localConnection_ && this.closestConnection_) {
            if (this.closestConnection_ == d && this.localConnection_ == c) return !1;
            c = this.localConnection_.x + b.x - this.closestConnection_.x;
            b = this.localConnection_.y + b.y - this.closestConnection_.y;
            b = Math.sqrt(c * c + b * b);
            return !(d && a > b - Blockly.CURRENT_CONNECTION_PREFERENCE)
        }
        if (this.localConnection_ || this.closestConnection_) console.error("Only one of localConnection_ and closestConnection_ was set.");
        else return !0
    } else return !(!this.localConnection_ || !this.closestConnection_);
    console.error("Returning true from shouldUpdatePreviews, but it's not clear why.");
    return !0
};
Blockly.InsertionMarkerManager.prototype.getCandidate_ = function(a) {
    for (var b = this.getStartRadius_(), c = null, d = null, e = 0; e < this.availableConnections_.length; e++) {
        var f = this.availableConnections_[e],
            g = f.closest(b, a);
        g.connection && (c = g.connection, d = f, b = g.radius)
    }
    return { closest: c, local: d, radius: b }
};
Blockly.InsertionMarkerManager.prototype.getStartRadius_ = function() { return this.closestConnection_ && this.localConnection_ ? Blockly.CONNECTING_SNAP_RADIUS : Blockly.SNAP_RADIUS };
Blockly.InsertionMarkerManager.prototype.shouldDelete_ = function(a, b) { a = a && !!a.closest && b != Blockly.DELETE_AREA_TOOLBOX; return !!b && !this.topBlock_.getParent() && this.topBlock_.isDeletable() && !a };
Blockly.InsertionMarkerManager.prototype.maybeShowPreview_ = function(a) {
    if (!this.wouldDeleteBlock_) {
        var b = a.closest;
        a = a.local;
        b && (b == this.closestConnection_ || b.getSourceBlock().isInsertionMarker() ? console.log("Trying to connect to an insertion marker") : (this.closestConnection_ = b, this.localConnection_ = a, this.showPreview_()))
    }
};
Blockly.InsertionMarkerManager.prototype.showPreview_ = function() {
    var a = this.closestConnection_,
        b = this.workspace_.getRenderer();
    switch (b.getConnectionPreviewMethod(a, this.localConnection_, this.topBlock_)) {
        case Blockly.InsertionMarkerManager.PREVIEW_TYPE.INPUT_OUTLINE:
            this.showInsertionInputOutline_();
            break;
        case Blockly.InsertionMarkerManager.PREVIEW_TYPE.INSERTION_MARKER:
            this.showInsertionMarker_();
            break;
        case Blockly.InsertionMarkerManager.PREVIEW_TYPE.REPLACEMENT_FADE:
            this.showReplacementFade_()
    }
    a &&
        b.shouldHighlightConnection(a) && a.highlight()
};
Blockly.InsertionMarkerManager.prototype.maybeHidePreview_ = function(a) {
    if (a.closest) {
        var b = this.closestConnection_ != a.closest;
        a = this.localConnection_ != a.local;
        this.closestConnection_ && this.localConnection_ && (b || a || this.wouldDeleteBlock_) && this.hidePreview_()
    } else this.hidePreview_();
    this.localConnection_ = this.closestConnection_ = this.markerConnection_ = null
};
Blockly.InsertionMarkerManager.prototype.hidePreview_ = function() {
    this.closestConnection_ && this.closestConnection_.targetBlock() && this.workspace_.getRenderer().shouldHighlightConnection(this.closestConnection_) && this.closestConnection_.unhighlight();
    this.fadedBlock_ ? this.hideReplacementFade_() : this.highlightedBlock_ ? this.hideInsertionInputOutline_() : this.markerConnection_ && this.hideInsertionMarker_()
};
Blockly.InsertionMarkerManager.prototype.showInsertionMarker_ = function() {
    var a = this.localConnection_,
        b = this.closestConnection_,
        c = this.lastOnStack_ && a == this.lastOnStack_ ? this.lastMarker_ : this.firstMarker_;
    a = c.getMatchingConnection(a.getSourceBlock(), a);
    if (a == this.markerConnection_) throw Error("Made it to showInsertionMarker_ even though the marker isn't changing");
    c.render();
    c.rendered = !0;
    c.getSvgRoot().setAttribute("visibility", "visible");
    a && b && c.positionNearConnection(a, b);
    b && a.connect(b);
    this.markerConnection_ =
        a
};
Blockly.InsertionMarkerManager.prototype.hideInsertionMarker_ = function() {
    if (this.markerConnection_) {
        var a = this.markerConnection_,
            b = a.getSourceBlock(),
            c = b.nextConnection,
            d = b.previousConnection,
            e = b.outputConnection;
        e = a.type == Blockly.INPUT_VALUE && !(e && e.targetConnection);
        !(a != c || d && d.targetConnection) || e ? a.targetBlock().unplug(!1) : a.type == Blockly.NEXT_STATEMENT && a != c ? (c = a.targetConnection, c.getSourceBlock().unplug(!1), d = d ? d.targetConnection : null, b.unplug(!0), d && d.connect(c)) : b.unplug(!0);
        if (a.targetConnection) throw Error("markerConnection_ still connected at the end of disconnectInsertionMarker");
        this.markerConnection_ =
            null;
        b.getSvgRoot().setAttribute("visibility", "hidden")
    } else console.log("No insertion marker connection to disconnect")
};
Blockly.InsertionMarkerManager.prototype.showInsertionInputOutline_ = function() {
    var a = this.closestConnection_;
    this.highlightedBlock_ = a.getSourceBlock();
    this.highlightedBlock_.highlightShapeForInput(a, !0)
};
Blockly.InsertionMarkerManager.prototype.hideInsertionInputOutline_ = function() {
    this.highlightedBlock_.highlightShapeForInput(this.closestConnection_, !1);
    this.highlightedBlock_ = null
};
Blockly.InsertionMarkerManager.prototype.showReplacementFade_ = function() {
    this.fadedBlock_ = this.closestConnection_.targetBlock();
    this.fadedBlock_.fadeForReplacement(!0)
};
Blockly.InsertionMarkerManager.prototype.hideReplacementFade_ = function() {
    this.fadedBlock_.fadeForReplacement(!1);
    this.fadedBlock_ = null
};
Blockly.InsertionMarkerManager.prototype.getInsertionMarkers = function() {
    var a = [];
    this.firstMarker_ && a.push(this.firstMarker_);
    this.lastMarker_ && a.push(this.lastMarker_);
    return a
};
Blockly.BlockDragger = function(a, b) {
    this.draggingBlock_ = a;
    this.workspace_ = b;
    this.draggedConnectionManager_ = new Blockly.InsertionMarkerManager(this.draggingBlock_);
    this.deleteArea_ = null;
    this.wouldDeleteBlock_ = !1;
    this.startXY_ = this.draggingBlock_.getRelativeToSurfaceXY();
    this.dragIconData_ = Blockly.BlockDragger.initIconData_(a)
};
Blockly.BlockDragger.prototype.dispose = function() {
    this.dragIconData_.length = 0;
    this.draggedConnectionManager_ && this.draggedConnectionManager_.dispose()
};
Blockly.BlockDragger.initIconData_ = function(a) {
    var b = [];
    a = a.getDescendants(!1);
    for (var c = 0, d; d = a[c]; c++) {
        d = d.getIcons();
        for (var e = 0; e < d.length; e++) {
            var f = { location: d[e].getIconLocation(), icon: d[e] };
            b.push(f)
        }
    }
    return b
};
Blockly.BlockDragger.prototype.startBlockDrag = function(a, b) {
    Blockly.Events.getGroup() || Blockly.Events.setGroup(!0);
    this.fireDragStartEvent_();
    this.workspace_.isMutator && this.draggingBlock_.bringToFront();
    Blockly.utils.dom.startTextWidthCache();
    this.workspace_.setResizesEnabled(!1);
    Blockly.blockAnimations.disconnectUiStop();
    if (this.draggingBlock_.getParent() || b && this.draggingBlock_.nextConnection && this.draggingBlock_.nextConnection.targetBlock()) this.draggingBlock_.unplug(b), a = this.pixelsToWorkspaceUnits_(a),
        a = Blockly.utils.Coordinate.sum(this.startXY_, a), this.draggingBlock_.translate(a.x, a.y), Blockly.blockAnimations.disconnectUiEffect(this.draggingBlock_);
    this.draggingBlock_.setDragging(!0);
    this.draggingBlock_.moveToDragSurface();
    if (a = this.workspace_.getToolbox()) b = this.draggingBlock_.isDeletable() ? "blocklyToolboxDelete" : "blocklyToolboxGrab", a.addStyle(b)
};
Blockly.BlockDragger.prototype.fireDragStartEvent_ = function() {
    var a = new Blockly.Events.Ui(this.draggingBlock_, "dragStart", null, this.draggingBlock_.getDescendants(!1));
    Blockly.Events.fire(a)
};
Blockly.BlockDragger.prototype.dragBlock = function(a, b) {
    b = this.pixelsToWorkspaceUnits_(b);
    var c = Blockly.utils.Coordinate.sum(this.startXY_, b);
    this.draggingBlock_.moveDuringDrag(c);
    this.dragIcons_(b);
    this.deleteArea_ = this.workspace_.isDeleteArea(a);
    this.draggedConnectionManager_.update(b, this.deleteArea_);
    this.updateCursorDuringBlockDrag_()
};
Blockly.BlockDragger.prototype.endBlockDrag = function(a, b) {
    this.dragBlock(a, b);
    this.dragIconData_ = [];
    this.fireDragEndEvent_();
    Blockly.utils.dom.stopTextWidthCache();
    Blockly.blockAnimations.disconnectUiStop();
    a = this.pixelsToWorkspaceUnits_(b);
    b = Blockly.utils.Coordinate.sum(this.startXY_, a);
    this.draggingBlock_.moveOffDragSurface(b);
    this.maybeDeleteBlock_() || (this.draggingBlock_.moveConnections(a.x, a.y), this.draggingBlock_.setDragging(!1), this.fireMoveEvent_(), this.draggedConnectionManager_.wouldConnectBlock() ?
        this.draggedConnectionManager_.applyConnections() : this.draggingBlock_.render(), this.draggingBlock_.scheduleSnapAndBump());
    this.workspace_.setResizesEnabled(!0);
    if (a = this.workspace_.getToolbox()) b = this.draggingBlock_.isDeletable() ? "blocklyToolboxDelete" : "blocklyToolboxGrab", a.removeStyle(b);
    Blockly.Events.setGroup(!1)
};
Blockly.BlockDragger.prototype.fireDragEndEvent_ = function() {
    var a = new Blockly.Events.Ui(this.draggingBlock_, "dragStop", this.draggingBlock_.getDescendants(!1), null);
    Blockly.Events.fire(a)
};
Blockly.BlockDragger.prototype.fireMoveEvent_ = function() {
    var a = new Blockly.Events.BlockMove(this.draggingBlock_);
    a.oldCoordinate = this.startXY_;
    a.recordNew();
    Blockly.Events.fire(a)
};
Blockly.BlockDragger.prototype.maybeDeleteBlock_ = function() {
    var a = this.workspace_.trashcan;
    this.wouldDeleteBlock_ ? (a && setTimeout(a.close.bind(a), 100), this.fireMoveEvent_(), this.draggingBlock_.dispose(!1, !0), Blockly.draggingConnections = []) : a && a.close();
    return this.wouldDeleteBlock_
};
Blockly.BlockDragger.prototype.updateCursorDuringBlockDrag_ = function() {
    this.wouldDeleteBlock_ = this.draggedConnectionManager_.wouldDeleteBlock();
    var a = this.workspace_.trashcan;
    this.wouldDeleteBlock_ ? (this.draggingBlock_.setDeleteStyle(!0), this.deleteArea_ == Blockly.DELETE_AREA_TRASH && a && a.setOpen(!0)) : (this.draggingBlock_.setDeleteStyle(!1), a && a.setOpen(!1))
};
Blockly.BlockDragger.prototype.pixelsToWorkspaceUnits_ = function(a) {
    a = new Blockly.utils.Coordinate(a.x / this.workspace_.scale, a.y / this.workspace_.scale);
    this.workspace_.isMutator && a.scale(1 / this.workspace_.options.parentWorkspace.scale);
    return a
};
Blockly.BlockDragger.prototype.dragIcons_ = function(a) {
    for (var b = 0; b < this.dragIconData_.length; b++) {
        var c = this.dragIconData_[b];
        c.icon.setIconLocation(Blockly.utils.Coordinate.sum(c.location, a))
    }
};
Blockly.BlockDragger.prototype.getInsertionMarkers = function() { return this.draggedConnectionManager_ && this.draggedConnectionManager_.getInsertionMarkers ? this.draggedConnectionManager_.getInsertionMarkers() : [] };
Blockly.VariableMap = function(a) {
    this.variableMap_ = Object.create(null);
    this.workspace = a
};
Blockly.VariableMap.prototype.clear = function() { this.variableMap_ = Object.create(null) };
Blockly.VariableMap.prototype.renameVariable = function(a, b) {
    var c = this.getVariable(b, a.type),
        d = this.workspace.getAllBlocks(!1);
    Blockly.Events.setGroup(!0);
    try { c && c.getId() != a.getId() ? this.renameVariableWithConflict_(a, b, c, d) : this.renameVariableAndUses_(a, b, d) } finally { Blockly.Events.setGroup(!1) }
};
Blockly.VariableMap.prototype.renameVariableById = function(a, b) {
    var c = this.getVariableById(a);
    if (!c) throw Error("Tried to rename a variable that didn't exist. ID: " + a);
    this.renameVariable(c, b)
};
Blockly.VariableMap.prototype.renameVariableAndUses_ = function(a, b, c) {
    Blockly.Events.fire(new Blockly.Events.VarRename(a, b));
    a.name = b;
    for (b = 0; b < c.length; b++) c[b].updateVarName(a)
};
Blockly.VariableMap.prototype.renameVariableWithConflict_ = function(a, b, c, d) {
    var e = a.type;
    b != c.name && this.renameVariableAndUses_(c, b, d);
    for (b = 0; b < d.length; b++) d[b].renameVarById(a.getId(), c.getId());
    Blockly.Events.fire(new Blockly.Events.VarDelete(a));
    a = this.getVariablesOfType(e).indexOf(a);
    this.variableMap_[e].splice(a, 1)
};
Blockly.VariableMap.prototype.createVariable = function(a, b, c) {
    var d = this.getVariable(a, b);
    if (d) { if (c && d.getId() != c) throw Error('Variable "' + a + '" is already in use and its id is "' + d.getId() + '" which conflicts with the passed in id, "' + c + '".'); return d }
    if (c && this.getVariableById(c)) throw Error('Variable id, "' + c + '", is already in use.');
    d = c || Blockly.utils.genUid();
    b = b || "";
    d = new Blockly.VariableModel(this.workspace, a, b, d);
    a = this.variableMap_[b] || [];
    a.push(d);
    delete this.variableMap_[b];
    this.variableMap_[b] =
        a;
    return d
};
Blockly.VariableMap.prototype.deleteVariable = function(a) {
    for (var b = this.variableMap_[a.type], c = 0, d; d = b[c]; c++)
        if (d.getId() == a.getId()) {
            b.splice(c, 1);
            Blockly.Events.fire(new Blockly.Events.VarDelete(a));
            break
        }
};
Blockly.VariableMap.prototype.deleteVariableById = function(a) {
    var b = this.getVariableById(a);
    if (b) {
        var c = b.name,
            d = this.getVariableUsesById(a);
        a = 0;
        for (var e; e = d[a]; a++)
            if ("procedures_defnoreturn" == e.type || "procedures_defreturn" == e.type) {
                a = e.getFieldValue("NAME");
                c = Blockly.Msg.CANNOT_DELETE_VARIABLE_PROCEDURE.replace("%1", c).replace("%2", a);
                Blockly.alert(c);
                return
            }
        var f = this;
        1 < d.length ? (c = Blockly.Msg.DELETE_VARIABLE_CONFIRMATION.replace("%1", String(d.length)).replace("%2", c), Blockly.confirm(c, function(a) {
            a &&
                b && f.deleteVariableInternal(b, d)
        })) : f.deleteVariableInternal(b, d)
    } else console.warn("Can't delete non-existent variable: " + a)
};
Blockly.VariableMap.prototype.deleteVariableInternal = function(a, b) {
    var c = Blockly.Events.getGroup();
    c || Blockly.Events.setGroup(!0);
    try {
        for (var d = 0; d < b.length; d++) b[d].dispose(!0);
        this.deleteVariable(a)
    } finally { c || Blockly.Events.setGroup(!1) }
};
Blockly.VariableMap.prototype.getVariable = function(a, b) {
    if (b = this.variableMap_[b || ""])
        for (var c = 0, d; d = b[c]; c++)
            if (Blockly.Names.equals(d.name, a)) return d;
    return null
};
Blockly.VariableMap.prototype.getVariableById = function(a) {
    for (var b = Object.keys(this.variableMap_), c = 0; c < b.length; c++)
        for (var d = b[c], e = 0, f; f = this.variableMap_[d][e]; e++)
            if (f.getId() == a) return f;
    return null
};
Blockly.VariableMap.prototype.getVariablesOfType = function(a) { return (a = this.variableMap_[a || ""]) ? a.slice() : [] };
Blockly.VariableMap.prototype.getVariableTypes = function(a) {
    var b = {};
    Blockly.utils.object.mixin(b, this.variableMap_);
    a && a.getPotentialVariableMap() && Blockly.utils.object.mixin(b, a.getPotentialVariableMap().variableMap_);
    a = Object.keys(b);
    b = !1;
    for (var c = 0; c < a.length; c++) "" == a[c] && (b = !0);
    b || a.push("");
    return a
};
Blockly.VariableMap.prototype.getAllVariables = function() {
    var a = [],
        b;
    for (b in this.variableMap_) a = a.concat(this.variableMap_[b]);
    return a
};
Blockly.VariableMap.prototype.getAllVariableNames = function() {
    var a = [],
        b;
    for (b in this.variableMap_)
        for (var c = this.variableMap_[b], d = 0, e; e = c[d]; d++) a.push(e.name);
    return a
};
Blockly.VariableMap.prototype.getVariableUsesById = function(a) {
    for (var b = [], c = this.workspace.getAllBlocks(!1), d = 0; d < c.length; d++) {
        var e = c[d].getVarModels();
        if (e)
            for (var f = 0; f < e.length; f++) e[f].getId() == a && b.push(c[d])
    }
    return b
};
Blockly.Workspace = function(a) {
    this.id = Blockly.utils.genUid();
    Blockly.Workspace.WorkspaceDB_[this.id] = this;
    this.options = a || new Blockly.Options({});
    this.RTL = !!this.options.RTL;
    this.horizontalLayout = !!this.options.horizontalLayout;
    this.toolboxPosition = this.options.toolboxPosition;
    this.topBlocks_ = [];
    this.topComments_ = [];
    this.commentDB_ = Object.create(null);
    this.listeners_ = [];
    this.undoStack_ = [];
    this.redoStack_ = [];
    this.blockDB_ = Object.create(null);
    this.typedBlocksDB_ = Object.create(null);
    this.variableMap_ =
        new Blockly.VariableMap(this);
    this.potentialVariableMap_ = null
};
Blockly.Workspace.prototype.rendered = !1;
Blockly.Workspace.prototype.isClearing = !1;
Blockly.Workspace.prototype.MAX_UNDO = 1024;
Blockly.Workspace.prototype.connectionDBList = null;
Blockly.Workspace.prototype.dispose = function() {
    this.listeners_.length = 0;
    this.clear();
    delete Blockly.Workspace.WorkspaceDB_[this.id]
};
Blockly.Workspace.SCAN_ANGLE = 3;
Blockly.Workspace.prototype.sortObjects_ = function(a, b) {
    a = a.getRelativeToSurfaceXY();
    b = b.getRelativeToSurfaceXY();
    return a.y + Blockly.Workspace.prototype.sortObjects_.offset * a.x - (b.y + Blockly.Workspace.prototype.sortObjects_.offset * b.x)
};
Blockly.Workspace.prototype.addTopBlock = function(a) { this.topBlocks_.push(a) };
Blockly.Workspace.prototype.removeTopBlock = function(a) { if (!Blockly.utils.arrayRemove(this.topBlocks_, a)) throw Error("Block not present in workspace's list of top-most blocks."); };
Blockly.Workspace.prototype.getTopBlocks = function(a) {
    var b = [].concat(this.topBlocks_);
    a && 1 < b.length && (this.sortObjects_.offset = Math.sin(Blockly.utils.math.toRadians(Blockly.Workspace.SCAN_ANGLE)), this.RTL && (this.sortObjects_.offset *= -1), b.sort(this.sortObjects_));
    return b
};
Blockly.Workspace.prototype.addTypedBlock = function(a) {
    this.typedBlocksDB_[a.type] || (this.typedBlocksDB_[a.type] = []);
    this.typedBlocksDB_[a.type].push(a)
};
Blockly.Workspace.prototype.removeTypedBlock = function(a) {
    this.typedBlocksDB_[a.type].splice(this.typedBlocksDB_[a.type].indexOf(a), 1);
    this.typedBlocksDB_[a.type].length || delete this.typedBlocksDB_[a.type]
};
Blockly.Workspace.prototype.getBlocksByType = function(a, b) {
    if (!this.typedBlocksDB_[a]) return [];
    a = this.typedBlocksDB_[a].slice(0);
    b && 1 < a.length && (this.sortObjects_.offset = Math.sin(Blockly.utils.math.toRadians(Blockly.Workspace.SCAN_ANGLE)), this.RTL && (this.sortObjects_.offset *= -1), a.sort(this.sortObjects_));
    return a
};
Blockly.Workspace.prototype.addTopComment = function(a) {
    this.topComments_.push(a);
    this.commentDB_[a.id] && console.warn('Overriding an existing comment on this workspace, with id "' + a.id + '"');
    this.commentDB_[a.id] = a
};
Blockly.Workspace.prototype.removeTopComment = function(a) {
    if (!Blockly.utils.arrayRemove(this.topComments_, a)) throw Error("Comment not present in workspace's list of top-most comments.");
    delete this.commentDB_[a.id]
};
Blockly.Workspace.prototype.getTopComments = function(a) {
    var b = [].concat(this.topComments_);
    a && 1 < b.length && (this.sortObjects_.offset = Math.sin(Blockly.utils.math.toRadians(Blockly.Workspace.SCAN_ANGLE)), this.RTL && (this.sortObjects_.offset *= -1), b.sort(this.sortObjects_));
    return b
};
Blockly.Workspace.prototype.getAllBlocks = function(a) {
    if (a) { a = this.getTopBlocks(!0); for (var b = [], c = 0; c < a.length; c++) b.push.apply(b, a[c].getDescendants(!0)) } else
        for (b = this.getTopBlocks(!1), c = 0; c < b.length; c++) b.push.apply(b, b[c].getChildren(!1));
    return b.filter(function(a) { return !a.isInsertionMarker() })
};
Blockly.Workspace.prototype.clear = function() {
    this.isClearing = !0;
    try {
        var a = Blockly.Events.getGroup();
        for (a || Blockly.Events.setGroup(!0); this.topBlocks_.length;) this.topBlocks_[0].dispose(!1);
        for (; this.topComments_.length;) this.topComments_[this.topComments_.length - 1].dispose(!1);
        a || Blockly.Events.setGroup(!1);
        this.variableMap_.clear();
        this.potentialVariableMap_ && this.potentialVariableMap_.clear()
    } finally { this.isClearing = !1 }
};
Blockly.Workspace.prototype.renameVariableById = function(a, b) { this.variableMap_.renameVariableById(a, b) };
Blockly.Workspace.prototype.createVariable = function(a, b, c) { return this.variableMap_.createVariable(a, b, c) };
Blockly.Workspace.prototype.getVariableUsesById = function(a) { return this.variableMap_.getVariableUsesById(a) };
Blockly.Workspace.prototype.deleteVariableById = function(a) { this.variableMap_.deleteVariableById(a) };
Blockly.Workspace.prototype.deleteVariableInternal_ = function(a, b) { this.variableMap_.deleteVariableInternal(a, b) };
Blockly.Workspace.prototype.variableIndexOf = function(a) { console.warn("Deprecated call to Blockly.Workspace.prototype.variableIndexOf"); return -1 };
Blockly.Workspace.prototype.getVariable = function(a, b) { return this.variableMap_.getVariable(a, b) };
Blockly.Workspace.prototype.getVariableById = function(a) { return this.variableMap_.getVariableById(a) };
Blockly.Workspace.prototype.getVariablesOfType = function(a) { return this.variableMap_.getVariablesOfType(a) };
Blockly.Workspace.prototype.getVariableTypes = function() { return this.variableMap_.getVariableTypes(this) };
Blockly.Workspace.prototype.getAllVariables = function() { return this.variableMap_.getAllVariables() };
Blockly.Workspace.prototype.getAllVariableNames = function() { return this.variableMap_.getAllVariableNames() };
Blockly.Workspace.prototype.getWidth = function() { return 0 };
Blockly.Workspace.prototype.newBlock = function(a, b) { return new Blockly.Block(this, a, b) };
Blockly.Workspace.prototype.remainingCapacity = function() { return isNaN(this.options.maxBlocks) ? Infinity : this.options.maxBlocks - this.getAllBlocks(!1).length };
Blockly.Workspace.prototype.remainingCapacityOfType = function(a) { return this.options.maxInstances ? (this.options.maxInstances[a] || Infinity) - this.getBlocksByType(a, !1).length : Infinity };
Blockly.Workspace.prototype.isCapacityAvailable = function(a) {
    if (!this.hasBlockLimits()) return !0;
    var b = 0,
        c;
    for (c in a) {
        if (a[c] > this.remainingCapacityOfType(c)) return !1;
        b += a[c]
    }
    return b > this.remainingCapacity() ? !1 : !0
};
Blockly.Workspace.prototype.hasBlockLimits = function() { return Infinity != this.options.maxBlocks || !!this.options.maxInstances };
Blockly.Workspace.prototype.undo = function(a) {
    var b = a ? this.redoStack_ : this.undoStack_,
        c = a ? this.undoStack_ : this.redoStack_,
        d = b.pop();
    if (d) {
        for (var e = [d]; b.length && d.group && d.group == b[b.length - 1].group;) e.push(b.pop());
        for (b = 0; d = e[b]; b++) c.push(d);
        e = Blockly.Events.filter(e, a);
        Blockly.Events.recordUndo = !1;
        try { for (b = 0; d = e[b]; b++) d.run(a) } finally { Blockly.Events.recordUndo = !0 }
    }
};
Blockly.Workspace.prototype.clearUndo = function() {
    this.undoStack_.length = 0;
    this.redoStack_.length = 0;
    Blockly.Events.clearPendingUndo()
};
Blockly.Workspace.prototype.addChangeListener = function(a) { this.listeners_.push(a); return a };
Blockly.Workspace.prototype.removeChangeListener = function(a) { Blockly.utils.arrayRemove(this.listeners_, a) };
Blockly.Workspace.prototype.fireChangeListener = function(a) {
    if (a.recordUndo)
        for (this.undoStack_.push(a), this.redoStack_.length = 0; this.undoStack_.length > this.MAX_UNDO && 0 <= this.MAX_UNDO;) this.undoStack_.shift();
    for (var b = 0, c; c = this.listeners_[b]; b++) c(a)
};
Blockly.Workspace.prototype.getBlockById = function(a) { return this.blockDB_[a] || null };
Blockly.Workspace.prototype.setBlockById = function(a, b) { this.blockDB_[a] = b };
Blockly.Workspace.prototype.removeBlockById = function(a) { delete this.blockDB_[a] };
Blockly.Workspace.prototype.getCommentById = function(a) { return this.commentDB_[a] || null };
Blockly.Workspace.prototype.allInputsFilled = function(a) {
    for (var b = this.getTopBlocks(!1), c = 0, d; d = b[c]; c++)
        if (!d.allInputsFilled(a)) return !1;
    return !0
};
Blockly.Workspace.prototype.getPotentialVariableMap = function() { return this.potentialVariableMap_ };
Blockly.Workspace.prototype.createPotentialVariableMap = function() { this.potentialVariableMap_ = new Blockly.VariableMap(this) };
Blockly.Workspace.prototype.getVariableMap = function() { return this.variableMap_ };
Blockly.Workspace.prototype.setVariableMap = function(a) { this.variableMap_ = a };
Blockly.Workspace.WorkspaceDB_ = Object.create(null);
Blockly.Workspace.getById = function(a) { return Blockly.Workspace.WorkspaceDB_[a] || null };
Blockly.Workspace.getAll = function() {
    var a = [],
        b;
    for (b in Blockly.Workspace.WorkspaceDB_) a.push(Blockly.Workspace.WorkspaceDB_[b]);
    return a
};
Blockly.Bubble = function(a, b, c, d, e, f) {
    this.workspace_ = a;
    this.content_ = b;
    this.shape_ = c;
    this.onMouseDownResizeWrapper_ = this.onMouseDownBubbleWrapper_ = this.moveCallback_ = this.resizeCallback_ = null;
    this.disposed = !1;
    c = Blockly.Bubble.ARROW_ANGLE;
    this.workspace_.RTL && (c = -c);
    this.arrow_radians_ = Blockly.utils.math.toRadians(c);
    a.getBubbleCanvas().appendChild(this.createDom_(b, !(!e || !f)));
    this.setAnchorLocation(d);
    e && f || (a = this.content_.getBBox(), e = a.width + 2 * Blockly.Bubble.BORDER_WIDTH, f = a.height + 2 * Blockly.Bubble.BORDER_WIDTH);
    this.setBubbleSize(e, f);
    this.positionBubble_();
    this.renderArrow_();
    this.rendered_ = !0
};
Blockly.Bubble.BORDER_WIDTH = 6;
Blockly.Bubble.ARROW_THICKNESS = 5;
Blockly.Bubble.ARROW_ANGLE = 20;
Blockly.Bubble.ARROW_BEND = 4;
Blockly.Bubble.ANCHOR_RADIUS = 8;
Blockly.Bubble.onMouseUpWrapper_ = null;
Blockly.Bubble.onMouseMoveWrapper_ = null;
Blockly.Bubble.unbindDragEvents_ = function() {
    Blockly.Bubble.onMouseUpWrapper_ && (Blockly.unbindEvent_(Blockly.Bubble.onMouseUpWrapper_), Blockly.Bubble.onMouseUpWrapper_ = null);
    Blockly.Bubble.onMouseMoveWrapper_ && (Blockly.unbindEvent_(Blockly.Bubble.onMouseMoveWrapper_), Blockly.Bubble.onMouseMoveWrapper_ = null)
};
Blockly.Bubble.bubbleMouseUp_ = function(a) {
    Blockly.Touch.clearTouchIdentifier();
    Blockly.Bubble.unbindDragEvents_()
};
Blockly.Bubble.prototype.rendered_ = !1;
Blockly.Bubble.prototype.anchorXY_ = null;
Blockly.Bubble.prototype.relativeLeft_ = 0;
Blockly.Bubble.prototype.relativeTop_ = 0;
Blockly.Bubble.prototype.width_ = 0;
Blockly.Bubble.prototype.height_ = 0;
Blockly.Bubble.prototype.autoLayout_ = !0;
Blockly.Bubble.prototype.createDom_ = function(a, b) {
    this.bubbleGroup_ = Blockly.utils.dom.createSvgElement("g", {}, null);
    var c = { filter: "url(#" + this.workspace_.getRenderer().getConstants().embossFilterId + ")" };
    Blockly.utils.userAgent.JAVA_FX && (c = {});
    c = Blockly.utils.dom.createSvgElement("g", c, this.bubbleGroup_);
    this.bubbleArrow_ = Blockly.utils.dom.createSvgElement("path", {}, c);
    this.bubbleBack_ = Blockly.utils.dom.createSvgElement("rect", { "class": "blocklyDraggable", x: 0, y: 0, rx: Blockly.Bubble.BORDER_WIDTH, ry: Blockly.Bubble.BORDER_WIDTH },
        c);
    b ? (this.resizeGroup_ = Blockly.utils.dom.createSvgElement("g", { "class": this.workspace_.RTL ? "blocklyResizeSW" : "blocklyResizeSE" }, this.bubbleGroup_), b = 2 * Blockly.Bubble.BORDER_WIDTH, Blockly.utils.dom.createSvgElement("polygon", { points: "0,x x,x x,0".replace(/x/g, b.toString()) }, this.resizeGroup_), Blockly.utils.dom.createSvgElement("line", { "class": "blocklyResizeLine", x1: b / 3, y1: b - 1, x2: b - 1, y2: b / 3 }, this.resizeGroup_), Blockly.utils.dom.createSvgElement("line", {
        "class": "blocklyResizeLine",
        x1: 2 * b / 3,
        y1: b - 1,
        x2: b -
            1,
        y2: 2 * b / 3
    }, this.resizeGroup_)) : this.resizeGroup_ = null;
    this.workspace_.options.readOnly || (this.onMouseDownBubbleWrapper_ = Blockly.bindEventWithChecks_(this.bubbleBack_, "mousedown", this, this.bubbleMouseDown_), this.resizeGroup_ && (this.onMouseDownResizeWrapper_ = Blockly.bindEventWithChecks_(this.resizeGroup_, "mousedown", this, this.resizeMouseDown_)));
    this.bubbleGroup_.appendChild(a);
    return this.bubbleGroup_
};
Blockly.Bubble.prototype.getSvgRoot = function() { return this.bubbleGroup_ };
Blockly.Bubble.prototype.setSvgId = function(a) { this.bubbleGroup_.dataset && (this.bubbleGroup_.dataset.blockId = a) };
Blockly.Bubble.prototype.bubbleMouseDown_ = function(a) {
    var b = this.workspace_.getGesture(a);
    b && b.handleBubbleStart(a, this)
};
Blockly.Bubble.prototype.showContextMenu = function(a) {};
Blockly.Bubble.prototype.isDeletable = function() { return !1 };
Blockly.Bubble.prototype.resizeMouseDown_ = function(a) {
    this.promote();
    Blockly.Bubble.unbindDragEvents_();
    Blockly.utils.isRightButton(a) || (this.workspace_.startDrag(a, new Blockly.utils.Coordinate(this.workspace_.RTL ? -this.width_ : this.width_, this.height_)), Blockly.Bubble.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(document, "mouseup", this, Blockly.Bubble.bubbleMouseUp_), Blockly.Bubble.onMouseMoveWrapper_ = Blockly.bindEventWithChecks_(document, "mousemove", this, this.resizeMouseMove_), Blockly.hideChaff());
    a.stopPropagation()
};
Blockly.Bubble.prototype.resizeMouseMove_ = function(a) {
    this.autoLayout_ = !1;
    a = this.workspace_.moveDrag(a);
    this.setBubbleSize(this.workspace_.RTL ? -a.x : a.x, a.y);
    this.workspace_.RTL && this.positionBubble_()
};
Blockly.Bubble.prototype.registerResizeEvent = function(a) { this.resizeCallback_ = a };
Blockly.Bubble.prototype.registerMoveEvent = function(a) { this.moveCallback_ = a };
Blockly.Bubble.prototype.promote = function() { var a = this.bubbleGroup_.parentNode; return a.lastChild !== this.bubbleGroup_ ? (a.appendChild(this.bubbleGroup_), !0) : !1 };
Blockly.Bubble.prototype.setAnchorLocation = function(a) {
    this.anchorXY_ = a;
    this.rendered_ && this.positionBubble_()
};
Blockly.Bubble.prototype.layoutBubble_ = function() {
    var a = this.workspace_.getMetrics();
    a.viewLeft /= this.workspace_.scale;
    a.viewWidth /= this.workspace_.scale;
    a.viewTop /= this.workspace_.scale;
    a.viewHeight /= this.workspace_.scale;
    var b = this.getOptimalRelativeLeft_(a),
        c = this.getOptimalRelativeTop_(a),
        d = this.shape_.getBBox(),
        e = { x: b, y: -this.height_ - this.workspace_.getRenderer().getConstants().MIN_BLOCK_HEIGHT },
        f = { x: -this.width_ - 30, y: c };
    c = { x: d.width, y: c };
    var g = { x: b, y: d.height };
    b = d.width < d.height ? c : g;
    d = d.width <
        d.height ? g : c;
    c = this.getOverlap_(e, a);
    g = this.getOverlap_(f, a);
    var h = this.getOverlap_(b, a);
    a = this.getOverlap_(d, a);
    a = Math.max(c, g, h, a);
    c == a ? (this.relativeLeft_ = e.x, this.relativeTop_ = e.y) : g == a ? (this.relativeLeft_ = f.x, this.relativeTop_ = f.y) : h == a ? (this.relativeLeft_ = b.x, this.relativeTop_ = b.y) : (this.relativeLeft_ = d.x, this.relativeTop_ = d.y)
};
Blockly.Bubble.prototype.getOverlap_ = function(a, b) {
    var c = this.workspace_.RTL ? this.anchorXY_.x - a.x - this.width_ : a.x + this.anchorXY_.x;
    a = a.y + this.anchorXY_.y;
    return Math.max(0, Math.min(1, (Math.min(c + this.width_, b.viewLeft + b.viewWidth) - Math.max(c, b.viewLeft)) * (Math.min(a + this.height_, b.viewTop + b.viewHeight) - Math.max(a, b.viewTop)) / (this.width_ * this.height_)))
};
Blockly.Bubble.prototype.getOptimalRelativeLeft_ = function(a) {
    var b = -this.width_ / 4;
    if (this.width_ > a.viewWidth) return b;
    if (this.workspace_.RTL) var c = this.anchorXY_.x - b,
        d = c - this.width_,
        e = a.viewLeft + a.viewWidth,
        f = a.viewLeft + Blockly.Scrollbar.scrollbarThickness / this.workspace_.scale;
    else d = b + this.anchorXY_.x, c = d + this.width_, f = a.viewLeft, e = a.viewLeft + a.viewWidth - Blockly.Scrollbar.scrollbarThickness / this.workspace_.scale;
    this.workspace_.RTL ? d < f ? b = -(f - this.anchorXY_.x + this.width_) : c > e && (b = -(e - this.anchorXY_.x)) :
        d < f ? b = f - this.anchorXY_.x : c > e && (b = e - this.anchorXY_.x - this.width_);
    return b
};
Blockly.Bubble.prototype.getOptimalRelativeTop_ = function(a) {
    var b = -this.height_ / 4;
    if (this.height_ > a.viewHeight) return b;
    var c = this.anchorXY_.y + b,
        d = c + this.height_,
        e = a.viewTop;
    a = a.viewTop + a.viewHeight - Blockly.Scrollbar.scrollbarThickness / this.workspace_.scale;
    var f = this.anchorXY_.y;
    c < e ? b = e - f : d > a && (b = a - f - this.height_);
    return b
};
Blockly.Bubble.prototype.positionBubble_ = function() {
    var a = this.anchorXY_.x;
    a = this.workspace_.RTL ? a - (this.relativeLeft_ + this.width_) : a + this.relativeLeft_;
    this.moveTo(a, this.relativeTop_ + this.anchorXY_.y)
};
Blockly.Bubble.prototype.moveTo = function(a, b) { this.bubbleGroup_.setAttribute("transform", "translate(" + a + "," + b + ")") };
Blockly.Bubble.prototype.setDragging = function(a) {!a && this.moveCallback_ && this.moveCallback_() };
Blockly.Bubble.prototype.getBubbleSize = function() { return new Blockly.utils.Size(this.width_, this.height_) };
Blockly.Bubble.prototype.setBubbleSize = function(a, b) {
    var c = 2 * Blockly.Bubble.BORDER_WIDTH;
    a = Math.max(a, c + 45);
    b = Math.max(b, c + 20);
    this.width_ = a;
    this.height_ = b;
    this.bubbleBack_.setAttribute("width", a);
    this.bubbleBack_.setAttribute("height", b);
    this.resizeGroup_ && (this.workspace_.RTL ? this.resizeGroup_.setAttribute("transform", "translate(" + 2 * Blockly.Bubble.BORDER_WIDTH + "," + (b - c) + ") scale(-1 1)") : this.resizeGroup_.setAttribute("transform", "translate(" + (a - c) + "," + (b - c) + ")"));
    this.autoLayout_ && this.layoutBubble_();
    this.positionBubble_();
    this.renderArrow_();
    this.resizeCallback_ && this.resizeCallback_()
};
Blockly.Bubble.prototype.renderArrow_ = function() {
    var a = [],
        b = this.width_ / 2,
        c = this.height_ / 2,
        d = -this.relativeLeft_,
        e = -this.relativeTop_;
    if (b == d && c == e) a.push("M " + b + "," + c);
    else {
        e -= c;
        d -= b;
        this.workspace_.RTL && (d *= -1);
        var f = Math.sqrt(e * e + d * d),
            g = Math.acos(d / f);
        0 > e && (g = 2 * Math.PI - g);
        var h = g + Math.PI / 2;
        h > 2 * Math.PI && (h -= 2 * Math.PI);
        var k = Math.sin(h),
            l = Math.cos(h),
            m = this.getBubbleSize();
        h = (m.width + m.height) / Blockly.Bubble.ARROW_THICKNESS;
        h = Math.min(h, m.width, m.height) / 4;
        m = 1 - Blockly.Bubble.ANCHOR_RADIUS / f;
        d = b +
            m * d;
        e = c + m * e;
        m = b + h * l;
        var n = c + h * k;
        b -= h * l;
        c -= h * k;
        k = g + this.arrow_radians_;
        k > 2 * Math.PI && (k -= 2 * Math.PI);
        g = Math.sin(k) * f / Blockly.Bubble.ARROW_BEND;
        f = Math.cos(k) * f / Blockly.Bubble.ARROW_BEND;
        a.push("M" + m + "," + n);
        a.push("C" + (m + f) + "," + (n + g) + " " + d + "," + e + " " + d + "," + e);
        a.push("C" + d + "," + e + " " + (b + f) + "," + (c + g) + " " + b + "," + c)
    }
    a.push("z");
    this.bubbleArrow_.setAttribute("d", a.join(" "))
};
Blockly.Bubble.prototype.setColour = function(a) {
    this.bubbleBack_.setAttribute("fill", a);
    this.bubbleArrow_.setAttribute("fill", a)
};
Blockly.Bubble.prototype.dispose = function() {
    this.onMouseDownBubbleWrapper_ && Blockly.unbindEvent_(this.onMouseDownBubbleWrapper_);
    this.onMouseDownResizeWrapper_ && Blockly.unbindEvent_(this.onMouseDownResizeWrapper_);
    Blockly.Bubble.unbindDragEvents_();
    Blockly.utils.dom.removeNode(this.bubbleGroup_);
    this.disposed = !0
};
Blockly.Bubble.prototype.moveDuringDrag = function(a, b) {
    a ? a.translateSurface(b.x, b.y) : this.moveTo(b.x, b.y);
    this.relativeLeft_ = this.workspace_.RTL ? this.anchorXY_.x - b.x - this.width_ : b.x - this.anchorXY_.x;
    this.relativeTop_ = b.y - this.anchorXY_.y;
    this.renderArrow_()
};
Blockly.Bubble.prototype.getRelativeToSurfaceXY = function() { return new Blockly.utils.Coordinate(this.workspace_.RTL ? -this.relativeLeft_ + this.anchorXY_.x - this.width_ : this.anchorXY_.x + this.relativeLeft_, this.anchorXY_.y + this.relativeTop_) };
Blockly.Bubble.prototype.setAutoLayout = function(a) { this.autoLayout_ = a };
Blockly.Events.CommentBase = function(a) {
    this.commentId = a.id;
    this.workspaceId = a.workspace.id;
    this.group = Blockly.Events.getGroup();
    this.recordUndo = Blockly.Events.recordUndo
};
Blockly.utils.object.inherits(Blockly.Events.CommentBase, Blockly.Events.Abstract);
Blockly.Events.CommentBase.prototype.toJson = function() {
    var a = Blockly.Events.CommentBase.superClass_.toJson.call(this);
    this.commentId && (a.commentId = this.commentId);
    return a
};
Blockly.Events.CommentBase.prototype.fromJson = function(a) {
    Blockly.Events.CommentBase.superClass_.fromJson.call(this, a);
    this.commentId = a.commentId
};
Blockly.Events.CommentChange = function(a, b, c) { a && (Blockly.Events.CommentChange.superClass_.constructor.call(this, a), this.oldContents_ = b, this.newContents_ = c) };
Blockly.utils.object.inherits(Blockly.Events.CommentChange, Blockly.Events.CommentBase);
Blockly.Events.CommentChange.prototype.type = Blockly.Events.COMMENT_CHANGE;
Blockly.Events.CommentChange.prototype.toJson = function() {
    var a = Blockly.Events.CommentChange.superClass_.toJson.call(this);
    a.newContents = this.newContents_;
    return a
};
Blockly.Events.CommentChange.prototype.fromJson = function(a) {
    Blockly.Events.CommentChange.superClass_.fromJson.call(this, a);
    this.newContents_ = a.newValue
};
Blockly.Events.CommentChange.prototype.isNull = function() { return this.oldContents_ == this.newContents_ };
Blockly.Events.CommentChange.prototype.run = function(a) {
    var b = this.getEventWorkspace_().getCommentById(this.commentId);
    b ? b.setContent(a ? this.newContents_ : this.oldContents_) : console.warn("Can't change non-existent comment: " + this.commentId)
};
Blockly.Events.CommentCreate = function(a) { a && (Blockly.Events.CommentCreate.superClass_.constructor.call(this, a), this.xml = a.toXmlWithXY()) };
Blockly.utils.object.inherits(Blockly.Events.CommentCreate, Blockly.Events.CommentBase);
Blockly.Events.CommentCreate.prototype.type = Blockly.Events.COMMENT_CREATE;
Blockly.Events.CommentCreate.prototype.toJson = function() {
    var a = Blockly.Events.CommentCreate.superClass_.toJson.call(this);
    a.xml = Blockly.Xml.domToText(this.xml);
    return a
};
Blockly.Events.CommentCreate.prototype.fromJson = function(a) {
    Blockly.Events.CommentCreate.superClass_.fromJson.call(this, a);
    this.xml = Blockly.Xml.textToDom(a.xml)
};
Blockly.Events.CommentCreate.prototype.run = function(a) { Blockly.Events.CommentCreateDeleteHelper(this, a) };
Blockly.Events.CommentCreateDeleteHelper = function(a, b) {
    var c = a.getEventWorkspace_();
    b ? (b = Blockly.utils.xml.createElement("xml"), b.appendChild(a.xml), Blockly.Xml.domToWorkspace(b, c)) : (c = c.getCommentById(a.commentId)) ? c.dispose(!1, !1) : console.warn("Can't uncreate non-existent comment: " + a.commentId)
};
Blockly.Events.CommentDelete = function(a) { a && (Blockly.Events.CommentDelete.superClass_.constructor.call(this, a), this.xml = a.toXmlWithXY()) };
Blockly.utils.object.inherits(Blockly.Events.CommentDelete, Blockly.Events.CommentBase);
Blockly.Events.CommentDelete.prototype.type = Blockly.Events.COMMENT_DELETE;
Blockly.Events.CommentDelete.prototype.toJson = function() { return Blockly.Events.CommentDelete.superClass_.toJson.call(this) };
Blockly.Events.CommentDelete.prototype.fromJson = function(a) { Blockly.Events.CommentDelete.superClass_.fromJson.call(this, a) };
Blockly.Events.CommentDelete.prototype.run = function(a) { Blockly.Events.CommentCreateDeleteHelper(this, !a) };
Blockly.Events.CommentMove = function(a) { a && (Blockly.Events.CommentMove.superClass_.constructor.call(this, a), this.comment_ = a, this.oldCoordinate_ = a.getXY(), this.newCoordinate_ = null) };
Blockly.utils.object.inherits(Blockly.Events.CommentMove, Blockly.Events.CommentBase);
Blockly.Events.CommentMove.prototype.recordNew = function() {
    if (!this.comment_) throw Error("Tried to record the new position of a comment on the same event twice.");
    this.newCoordinate_ = this.comment_.getXY();
    this.comment_ = null
};
Blockly.Events.CommentMove.prototype.type = Blockly.Events.COMMENT_MOVE;
Blockly.Events.CommentMove.prototype.setOldCoordinate = function(a) { this.oldCoordinate_ = a };
Blockly.Events.CommentMove.prototype.toJson = function() {
    var a = Blockly.Events.CommentMove.superClass_.toJson.call(this);
    this.newCoordinate_ && (a.newCoordinate = Math.round(this.newCoordinate_.x) + "," + Math.round(this.newCoordinate_.y));
    return a
};
Blockly.Events.CommentMove.prototype.fromJson = function(a) {
    Blockly.Events.CommentMove.superClass_.fromJson.call(this, a);
    a.newCoordinate && (a = a.newCoordinate.split(","), this.newCoordinate_ = new Blockly.utils.Coordinate(Number(a[0]), Number(a[1])))
};
Blockly.Events.CommentMove.prototype.isNull = function() { return Blockly.utils.Coordinate.equals(this.oldCoordinate_, this.newCoordinate_) };
Blockly.Events.CommentMove.prototype.run = function(a) {
    var b = this.getEventWorkspace_().getCommentById(this.commentId);
    if (b) {
        a = a ? this.newCoordinate_ : this.oldCoordinate_;
        var c = b.getXY();
        b.moveBy(a.x - c.x, a.y - c.y)
    } else console.warn("Can't move non-existent comment: " + this.commentId)
};
Blockly.BubbleDragger = function(a, b) {
    this.draggingBubble_ = a;
    this.workspace_ = b;
    this.deleteArea_ = null;
    this.wouldDeleteBubble_ = !1;
    this.startXY_ = this.draggingBubble_.getRelativeToSurfaceXY();
    this.dragSurface_ = Blockly.utils.is3dSupported() && b.getBlockDragSurface() ? b.getBlockDragSurface() : null
};
Blockly.BubbleDragger.prototype.dispose = function() { this.dragSurface_ = this.workspace_ = this.draggingBubble_ = null };
Blockly.BubbleDragger.prototype.startBubbleDrag = function() {
    Blockly.Events.getGroup() || Blockly.Events.setGroup(!0);
    this.workspace_.setResizesEnabled(!1);
    this.draggingBubble_.setAutoLayout(!1);
    this.dragSurface_ && this.moveToDragSurface_();
    this.draggingBubble_.setDragging && this.draggingBubble_.setDragging(!0);
    var a = this.workspace_.getToolbox();
    if (a) {
        var b = this.draggingBubble_.isDeletable() ? "blocklyToolboxDelete" : "blocklyToolboxGrab";
        a.addStyle(b)
    }
};
Blockly.BubbleDragger.prototype.dragBubble = function(a, b) {
    b = this.pixelsToWorkspaceUnits_(b);
    b = Blockly.utils.Coordinate.sum(this.startXY_, b);
    this.draggingBubble_.moveDuringDrag(this.dragSurface_, b);
    this.draggingBubble_.isDeletable() && (this.deleteArea_ = this.workspace_.isDeleteArea(a), this.updateCursorDuringBubbleDrag_())
};
Blockly.BubbleDragger.prototype.maybeDeleteBubble_ = function() {
    var a = this.workspace_.trashcan;
    this.wouldDeleteBubble_ ? (a && setTimeout(a.close.bind(a), 100), this.fireMoveEvent_(), this.draggingBubble_.dispose(!1, !0)) : a && a.close();
    return this.wouldDeleteBubble_
};
Blockly.BubbleDragger.prototype.updateCursorDuringBubbleDrag_ = function() {
    this.wouldDeleteBubble_ = this.deleteArea_ != Blockly.DELETE_AREA_NONE;
    var a = this.workspace_.trashcan;
    this.wouldDeleteBubble_ ? (this.draggingBubble_.setDeleteStyle(!0), this.deleteArea_ == Blockly.DELETE_AREA_TRASH && a && a.setOpen(!0)) : (this.draggingBubble_.setDeleteStyle(!1), a && a.setOpen(!1))
};
Blockly.BubbleDragger.prototype.endBubbleDrag = function(a, b) {
    this.dragBubble(a, b);
    a = this.pixelsToWorkspaceUnits_(b);
    a = Blockly.utils.Coordinate.sum(this.startXY_, a);
    this.draggingBubble_.moveTo(a.x, a.y);
    this.maybeDeleteBubble_() || (this.dragSurface_ && this.dragSurface_.clearAndHide(this.workspace_.getBubbleCanvas()), this.draggingBubble_.setDragging && this.draggingBubble_.setDragging(!1), this.fireMoveEvent_());
    this.workspace_.setResizesEnabled(!0);
    this.workspace_.getToolbox() && (a = this.draggingBubble_.isDeletable() ?
        "blocklyToolboxDelete" : "blocklyToolboxGrab", this.workspace_.getToolbox().removeStyle(a));
    Blockly.Events.setGroup(!1)
};
Blockly.BubbleDragger.prototype.fireMoveEvent_ = function() {
    if (this.draggingBubble_.isComment) {
        var a = new Blockly.Events.CommentMove(this.draggingBubble_);
        a.setOldCoordinate(this.startXY_);
        a.recordNew();
        Blockly.Events.fire(a)
    }
};
Blockly.BubbleDragger.prototype.pixelsToWorkspaceUnits_ = function(a) {
    a = new Blockly.utils.Coordinate(a.x / this.workspace_.scale, a.y / this.workspace_.scale);
    this.workspace_.isMutator && a.scale(1 / this.workspace_.options.parentWorkspace.scale);
    return a
};
Blockly.BubbleDragger.prototype.moveToDragSurface_ = function() {
    this.draggingBubble_.moveTo(0, 0);
    this.dragSurface_.translateSurface(this.startXY_.x, this.startXY_.y);
    this.dragSurface_.setBlocksAndShow(this.draggingBubble_.getSvgRoot())
};
Blockly.WorkspaceDragger = function(a) {
    this.workspace_ = a;
    this.startScrollXY_ = new Blockly.utils.Coordinate(a.scrollX, a.scrollY)
};
Blockly.WorkspaceDragger.prototype.dispose = function() { this.workspace_ = null };
Blockly.WorkspaceDragger.prototype.startDrag = function() {
    Blockly.selected && Blockly.selected.unselect();
    this.workspace_.setupDragSurface()
};
Blockly.WorkspaceDragger.prototype.endDrag = function(a) {
    this.drag(a);
    this.workspace_.resetDragSurface()
};
Blockly.WorkspaceDragger.prototype.drag = function(a) {
    a = Blockly.utils.Coordinate.sum(this.startScrollXY_, a);
    this.workspace_.scroll(a.x, a.y)
};
Blockly.FlyoutDragger = function(a) {
    Blockly.FlyoutDragger.superClass_.constructor.call(this, a.getWorkspace());
    this.scrollbar_ = a.scrollbar_;
    this.horizontalLayout_ = a.horizontalLayout_
};
Blockly.utils.object.inherits(Blockly.FlyoutDragger, Blockly.WorkspaceDragger);
Blockly.FlyoutDragger.prototype.drag = function(a) {
    a = Blockly.utils.Coordinate.sum(this.startScrollXY_, a);
    this.horizontalLayout_ ? this.scrollbar_.set(-a.x) : this.scrollbar_.set(-a.y)
};
Blockly.Action = function(a, b) {
    this.name = a;
    this.desc = b
};
Blockly.navigation = {};
Blockly.navigation.loggingCallback = null;
Blockly.navigation.STATE_FLYOUT = 1;
Blockly.navigation.STATE_WS = 2;
Blockly.navigation.STATE_TOOLBOX = 3;
Blockly.navigation.WS_MOVE_DISTANCE = 40;
Blockly.navigation.currentState_ = Blockly.navigation.STATE_WS;
Blockly.navigation.actionNames = { PREVIOUS: "previous", NEXT: "next", IN: "in", OUT: "out", INSERT: "insert", MARK: "mark", DISCONNECT: "disconnect", TOOLBOX: "toolbox", EXIT: "exit", TOGGLE_KEYBOARD_NAV: "toggle_keyboard_nav", MOVE_WS_CURSOR_UP: "move workspace cursor up", MOVE_WS_CURSOR_DOWN: "move workspace cursor down", MOVE_WS_CURSOR_LEFT: "move workspace cursor left", MOVE_WS_CURSOR_RIGHT: "move workspace cursor right" };
Blockly.navigation.MARKER_NAME = "local_marker_1";
Blockly.navigation.getMarker = function() { return Blockly.getMainWorkspace().getMarker(Blockly.navigation.MARKER_NAME) };
Blockly.navigation.focusToolbox_ = function() {
    var a = Blockly.getMainWorkspace().getToolbox();
    a && (Blockly.navigation.currentState_ = Blockly.navigation.STATE_TOOLBOX, Blockly.navigation.resetFlyout_(!1), Blockly.navigation.getMarker().getCurNode() || Blockly.navigation.markAtCursor_(), a.selectFirstCategory())
};
Blockly.navigation.focusFlyout_ = function() {
    Blockly.navigation.currentState_ = Blockly.navigation.STATE_FLYOUT;
    var a = Blockly.getMainWorkspace();
    var b = a.getToolbox();
    a = b ? b.flyout_ : a.getFlyout();
    Blockly.navigation.getMarker().getCurNode() || Blockly.navigation.markAtCursor_();
    a && a.getWorkspace() && (a = a.getWorkspace().getTopBlocks(!0), 0 < a.length && (a = a[0], a = Blockly.ASTNode.createStackNode(a), Blockly.navigation.getFlyoutCursor_().setCurNode(a)))
};
Blockly.navigation.focusWorkspace_ = function() {
    Blockly.hideChaff();
    var a = Blockly.getMainWorkspace(),
        b = a.getCursor(),
        c = !!a.getToolbox(),
        d = a.getTopBlocks(!0);
    Blockly.navigation.resetFlyout_(c);
    Blockly.navigation.currentState_ = Blockly.navigation.STATE_WS;
    0 < d.length ? b.setCurNode(Blockly.navigation.getTopNode(d[0])) : (c = new Blockly.utils.Coordinate(100, 100), a = Blockly.ASTNode.createWorkspaceNode(a, c), b.setCurNode(a))
};
Blockly.navigation.getFlyoutCursor_ = function() {
    var a = Blockly.getMainWorkspace(),
        b = null;
    a.rendered && (b = (a = (b = a.getToolbox()) ? b.flyout_ : a.getFlyout()) ? a.workspace_.getCursor() : null);
    return b
};
Blockly.navigation.insertFromFlyout = function() {
    var a = Blockly.getMainWorkspace(),
        b = a.getFlyout();
    if (b && b.isVisible()) {
        var c = Blockly.navigation.getFlyoutCursor_().getCurNode().getLocation();
        c.isEnabled() ? (b = b.createBlock(c), b.render(), b.setConnectionTracking(!0), a.getCursor().setCurNode(Blockly.ASTNode.createBlockNode(b)), Blockly.navigation.modify_() || Blockly.navigation.warn_("Something went wrong while inserting a block from the flyout."), Blockly.navigation.focusWorkspace_(), a.getCursor().setCurNode(Blockly.navigation.getTopNode(b)),
            Blockly.navigation.removeMark_()) : Blockly.navigation.warn_("Can't insert a disabled block.")
    } else Blockly.navigation.warn_("Trying to insert from the flyout when the flyout does not  exist or is not visible")
};
Blockly.navigation.resetFlyout_ = function(a) { Blockly.navigation.getFlyoutCursor_() && (Blockly.navigation.getFlyoutCursor_().hide(), a && Blockly.getMainWorkspace().getFlyout().hide()) };
Blockly.navigation.modifyWarn_ = function() {
    var a = Blockly.navigation.getMarker().getCurNode(),
        b = Blockly.getMainWorkspace().getCursor().getCurNode();
    if (!a) return Blockly.navigation.warn_("Cannot insert with no marked node."), !1;
    if (!b) return Blockly.navigation.warn_("Cannot insert with no cursor node."), !1;
    a = a.getType();
    b = b.getType();
    return a == Blockly.ASTNode.types.FIELD ? (Blockly.navigation.warn_("Should not have been able to mark a field."), !1) : a == Blockly.ASTNode.types.BLOCK ? (Blockly.navigation.warn_("Should not have been able to mark a block."), !1) : a == Blockly.ASTNode.types.STACK ? (Blockly.navigation.warn_("Should not have been able to mark a stack."), !1) : b == Blockly.ASTNode.types.FIELD ? (Blockly.navigation.warn_("Cannot attach a field to anything else."), !1) : b == Blockly.ASTNode.types.WORKSPACE ? (Blockly.navigation.warn_("Cannot attach a workspace to anything else."), !1) : !0
};
Blockly.navigation.moveBlockToWorkspace_ = function(a, b) {
    if (!a) return !1;
    if (a.isShadow()) return Blockly.navigation.warn_("Cannot move a shadow block to the workspace."), !1;
    a.getParent() && a.unplug(!1);
    a.moveTo(b.getWsCoordinate());
    return !0
};
Blockly.navigation.modify_ = function() {
    var a = Blockly.navigation.getMarker().getCurNode(),
        b = Blockly.getMainWorkspace().getCursor().getCurNode();
    if (!Blockly.navigation.modifyWarn_()) return !1;
    var c = a.getType(),
        d = b.getType(),
        e = b.getLocation(),
        f = a.getLocation();
    if (a.isConnection() && b.isConnection()) return Blockly.navigation.connect_(e, f);
    if (a.isConnection() && (d == Blockly.ASTNode.types.BLOCK || d == Blockly.ASTNode.types.STACK)) return Blockly.navigation.insertBlock(e, f);
    if (c == Blockly.ASTNode.types.WORKSPACE) return b =
        b ? b.getSourceBlock() : null, Blockly.navigation.moveBlockToWorkspace_(b, a);
    Blockly.navigation.warn_("Unexpected state in Blockly.navigation.modify_.");
    return !1
};
Blockly.navigation.disconnectChild_ = function(a, b) {
    var c = a.getSourceBlock(),
        d = b.getSourceBlock();
    c.getRootBlock() == d.getRootBlock() && (-1 < c.getDescendants(!1).indexOf(d) ? Blockly.navigation.getInferiorConnection_(b).disconnect() : Blockly.navigation.getInferiorConnection_(a).disconnect())
};
Blockly.navigation.moveAndConnect_ = function(a, b) { if (!a || !b) return !1; var c = a.getSourceBlock(); return b.canConnectWithReason(a) == Blockly.Connection.CAN_CONNECT ? (Blockly.navigation.disconnectChild_(a, b), b.isSuperior() || c.getRootBlock().positionNearConnection(a, b), b.connect(a), !0) : !1 };
Blockly.navigation.getInferiorConnection_ = function(a) { var b = a.getSourceBlock(); return a.isSuperior() ? b.previousConnection ? b.previousConnection : b.outputConnection ? b.outputConnection : null : a };
Blockly.navigation.getSuperiorConnection_ = function(a) { return a.isSuperior() ? a : a.targetConnection ? a.targetConnection : null };
Blockly.navigation.connect_ = function(a, b) {
    if (!a || !b) return !1;
    var c = Blockly.navigation.getInferiorConnection_(a),
        d = Blockly.navigation.getSuperiorConnection_(b),
        e = Blockly.navigation.getSuperiorConnection_(a),
        f = Blockly.navigation.getInferiorConnection_(b);
    if (c && d && Blockly.navigation.moveAndConnect_(c, d) || e && f && Blockly.navigation.moveAndConnect_(e, f) || Blockly.navigation.moveAndConnect_(a, b)) return !0;
    try { b.checkConnection(a) } catch (g) { Blockly.navigation.warn_("Connection failed with error: " + g) }
    return !1
};
Blockly.navigation.insertBlock = function(a, b) {
    switch (b.type) {
        case Blockly.PREVIOUS_STATEMENT:
            if (Blockly.navigation.connect_(a.nextConnection, b)) return !0;
            break;
        case Blockly.NEXT_STATEMENT:
            if (Blockly.navigation.connect_(a.previousConnection, b)) return !0;
            break;
        case Blockly.INPUT_VALUE:
            if (Blockly.navigation.connect_(a.outputConnection, b)) return !0;
            break;
        case Blockly.OUTPUT_VALUE:
            for (var c = 0; c < a.inputList.length; c++) {
                var d = a.inputList[c].connection;
                if (d && d.type === Blockly.INPUT_VALUE && Blockly.navigation.connect_(d,
                        b)) return !0
            }
            if (a.outputConnection && Blockly.navigation.connect_(a.outputConnection, b)) return !0
    }
    Blockly.navigation.warn_("This block can not be inserted at the marked location.");
    return !1
};
Blockly.navigation.disconnectBlocks_ = function() {
    var a = Blockly.getMainWorkspace(),
        b = a.getCursor().getCurNode();
    if (b.isConnection()) {
        var c = b.getLocation();
        c.isConnected() ? (b = c.isSuperior() ? c : c.targetConnection, c = c.isSuperior() ? c.targetConnection : c, c.getSourceBlock().isShadow() ? Blockly.navigation.log_("Cannot disconnect a shadow block") : (b.disconnect(), c.bumpAwayFrom(b), b.getSourceBlock().getRootBlock().bringToFront(), b = Blockly.ASTNode.createConnectionNode(b), a.getCursor().setCurNode(b))) : Blockly.navigation.log_("Cannot disconnect unconnected connection")
    } else Blockly.navigation.log_("Cannot disconnect blocks when the cursor is not on a connection")
};
Blockly.navigation.markAtCursor_ = function() { Blockly.navigation.getMarker().setCurNode(Blockly.getMainWorkspace().getCursor().getCurNode()) };
Blockly.navigation.removeMark_ = function() {
    var a = Blockly.navigation.getMarker();
    a.setCurNode(null);
    a.hide()
};
Blockly.navigation.setState = function(a) { Blockly.navigation.currentState_ = a };
Blockly.navigation.getTopNode = function(a) { var b = a.previousConnection || a.outputConnection; return b ? Blockly.ASTNode.createConnectionNode(b) : Blockly.ASTNode.createBlockNode(a) };
Blockly.navigation.moveCursorOnBlockDelete = function(a) {
    var b = Blockly.getMainWorkspace();
    if (b && (b = b.getCursor())) {
        var c = b.getCurNode();
        c = c ? c.getSourceBlock() : null;
        c === a ? c.getParent() ? (a = c.previousConnection || c.outputConnection) && b.setCurNode(Blockly.ASTNode.createConnectionNode(a.targetConnection)) : b.setCurNode(Blockly.ASTNode.createWorkspaceNode(c.workspace, c.getRelativeToSurfaceXY())) : c && -1 < a.getChildren(!1).indexOf(c) && b.setCurNode(Blockly.ASTNode.createWorkspaceNode(c.workspace, c.getRelativeToSurfaceXY()))
    }
};
Blockly.navigation.moveCursorOnBlockMutation = function(a) {
    var b = Blockly.getMainWorkspace().getCursor();
    if (b) {
        var c = b.getCurNode();
        c = c ? c.getSourceBlock() : null;
        c === a && b.setCurNode(Blockly.ASTNode.createBlockNode(c))
    }
};
Blockly.navigation.enableKeyboardAccessibility = function() { Blockly.getMainWorkspace().keyboardAccessibilityMode || (Blockly.getMainWorkspace().keyboardAccessibilityMode = !0, Blockly.navigation.focusWorkspace_()) };
Blockly.navigation.disableKeyboardAccessibility = function() {
    if (Blockly.getMainWorkspace().keyboardAccessibilityMode) {
        var a = Blockly.getMainWorkspace();
        Blockly.getMainWorkspace().keyboardAccessibilityMode = !1;
        a.getCursor().hide();
        Blockly.navigation.getMarker().hide();
        Blockly.navigation.getFlyoutCursor_() && Blockly.navigation.getFlyoutCursor_().hide()
    }
};
Blockly.navigation.log_ = function(a) { Blockly.navigation.loggingCallback ? Blockly.navigation.loggingCallback("log", a) : console.log(a) };
Blockly.navigation.warn_ = function(a) { Blockly.navigation.loggingCallback ? Blockly.navigation.loggingCallback("warn", a) : console.warn(a) };
Blockly.navigation.error_ = function(a) { Blockly.navigation.loggingCallback ? Blockly.navigation.loggingCallback("error", a) : console.error(a) };
Blockly.navigation.onKeyPress = function(a) { a = Blockly.user.keyMap.serializeKeyEvent(a); return (a = Blockly.user.keyMap.getActionByKeyCode(a)) ? Blockly.navigation.onBlocklyAction(a) : !1 };
Blockly.navigation.onBlocklyAction = function(a) {
    var b = Blockly.getMainWorkspace().options.readOnly,
        c = !1;
    Blockly.getMainWorkspace().keyboardAccessibilityMode ? b ? -1 < Blockly.navigation.READONLY_ACTION_LIST.indexOf(a) && (c = Blockly.navigation.handleActions_(a)) : c = Blockly.navigation.handleActions_(a) : a.name === Blockly.navigation.actionNames.TOGGLE_KEYBOARD_NAV && (Blockly.navigation.enableKeyboardAccessibility(), c = !0);
    return c
};
Blockly.navigation.handleActions_ = function(a) {
    return a.name == Blockly.navigation.actionNames.TOOLBOX || Blockly.navigation.currentState_ == Blockly.navigation.STATE_TOOLBOX ? Blockly.navigation.toolboxOnAction_(a) : a.name == Blockly.navigation.actionNames.TOGGLE_KEYBOARD_NAV ? (Blockly.navigation.disableKeyboardAccessibility(), !0) : Blockly.navigation.currentState_ == Blockly.navigation.STATE_WS ? Blockly.navigation.workspaceOnAction_(a) : Blockly.navigation.currentState_ == Blockly.navigation.STATE_FLYOUT ? Blockly.navigation.flyoutOnAction_(a) :
        !1
};
Blockly.navigation.flyoutOnAction_ = function(a) {
    var b = Blockly.getMainWorkspace(),
        c = b.getToolbox();
    if ((b = c ? c.flyout_ : b.getFlyout()) && b.onBlocklyAction(a)) return !0;
    switch (a.name) {
        case Blockly.navigation.actionNames.OUT:
            return Blockly.navigation.focusToolbox_(), !0;
        case Blockly.navigation.actionNames.MARK:
            return Blockly.navigation.insertFromFlyout(), !0;
        case Blockly.navigation.actionNames.EXIT:
            return Blockly.navigation.focusWorkspace_(), !0;
        default:
            return !1
    }
};
Blockly.navigation.toolboxOnAction_ = function(a) {
    var b = Blockly.getMainWorkspace(),
        c = b.getToolbox();
    return c && c.onBlocklyAction(a) ? !0 : a.name === Blockly.navigation.actionNames.TOOLBOX ? (b.getToolbox() ? Blockly.navigation.focusToolbox_() : Blockly.navigation.focusFlyout_(), !0) : a.name === Blockly.navigation.actionNames.IN ? (Blockly.navigation.focusFlyout_(), !0) : a.name === Blockly.navigation.actionNames.EXIT ? (Blockly.navigation.focusWorkspace_(), !0) : !1
};
Blockly.navigation.moveWSCursor_ = function(a, b) {
    var c = Blockly.getMainWorkspace().getCursor(),
        d = Blockly.getMainWorkspace().getCursor().getCurNode();
    if (d.getType() !== Blockly.ASTNode.types.WORKSPACE) return !1;
    d = d.getWsCoordinate();
    a = a * Blockly.navigation.WS_MOVE_DISTANCE + d.x;
    b = b * Blockly.navigation.WS_MOVE_DISTANCE + d.y;
    c.setCurNode(Blockly.ASTNode.createWorkspaceNode(Blockly.getMainWorkspace(), new Blockly.utils.Coordinate(a, b)));
    return !0
};
Blockly.navigation.workspaceOnAction_ = function(a) {
    if (Blockly.getMainWorkspace().getCursor().onBlocklyAction(a)) return !0;
    switch (a.name) {
        case Blockly.navigation.actionNames.INSERT:
            return Blockly.navigation.modify_(), !0;
        case Blockly.navigation.actionNames.MARK:
            return Blockly.navigation.handleEnterForWS_(), !0;
        case Blockly.navigation.actionNames.DISCONNECT:
            return Blockly.navigation.disconnectBlocks_(), !0;
        case Blockly.navigation.actionNames.MOVE_WS_CURSOR_UP:
            return Blockly.navigation.moveWSCursor_(0, -1);
        case Blockly.navigation.actionNames.MOVE_WS_CURSOR_DOWN:
            return Blockly.navigation.moveWSCursor_(0, 1);
        case Blockly.navigation.actionNames.MOVE_WS_CURSOR_LEFT:
            return Blockly.navigation.moveWSCursor_(-1, 0);
        case Blockly.navigation.actionNames.MOVE_WS_CURSOR_RIGHT:
            return Blockly.navigation.moveWSCursor_(1, 0);
        default:
            return !1
    }
};
Blockly.navigation.handleEnterForWS_ = function() {
    var a = Blockly.getMainWorkspace().getCursor().getCurNode(),
        b = a.getType();
    b == Blockly.ASTNode.types.FIELD ? a.getLocation().showEditor() : a.isConnection() || b == Blockly.ASTNode.types.WORKSPACE ? Blockly.navigation.markAtCursor_() : b == Blockly.ASTNode.types.BLOCK ? Blockly.navigation.warn_("Cannot mark a block.") : b == Blockly.ASTNode.types.STACK && Blockly.navigation.warn_("Cannot mark a stack.")
};
Blockly.navigation.ACTION_PREVIOUS = new Blockly.Action(Blockly.navigation.actionNames.PREVIOUS, "Go to the previous location.");
Blockly.navigation.ACTION_OUT = new Blockly.Action(Blockly.navigation.actionNames.OUT, "Go to the parent of the current location.");
Blockly.navigation.ACTION_NEXT = new Blockly.Action(Blockly.navigation.actionNames.NEXT, "Go to the next location.");
Blockly.navigation.ACTION_IN = new Blockly.Action(Blockly.navigation.actionNames.IN, "Go to the first child of the current location.");
Blockly.navigation.ACTION_INSERT = new Blockly.Action(Blockly.navigation.actionNames.INSERT, "Connect the current location to the marked location.");
Blockly.navigation.ACTION_MARK = new Blockly.Action(Blockly.navigation.actionNames.MARK, "Mark the current location.");
Blockly.navigation.ACTION_DISCONNECT = new Blockly.Action(Blockly.navigation.actionNames.DISCONNECT, "Disconnect the block at the current location from its parent.");
Blockly.navigation.ACTION_TOOLBOX = new Blockly.Action(Blockly.navigation.actionNames.TOOLBOX, "Open the toolbox.");
Blockly.navigation.ACTION_EXIT = new Blockly.Action(Blockly.navigation.actionNames.EXIT, "Close the current modal, such as a toolbox or field editor.");
Blockly.navigation.ACTION_TOGGLE_KEYBOARD_NAV = new Blockly.Action(Blockly.navigation.actionNames.TOGGLE_KEYBOARD_NAV, "Turns on and off keyboard navigation.");
Blockly.navigation.ACTION_MOVE_WS_CURSOR_LEFT = new Blockly.Action(Blockly.navigation.actionNames.MOVE_WS_CURSOR_LEFT, "Move the workspace cursor to the lefts.");
Blockly.navigation.ACTION_MOVE_WS_CURSOR_RIGHT = new Blockly.Action(Blockly.navigation.actionNames.MOVE_WS_CURSOR_RIGHT, "Move the workspace cursor to the right.");
Blockly.navigation.ACTION_MOVE_WS_CURSOR_UP = new Blockly.Action(Blockly.navigation.actionNames.MOVE_WS_CURSOR_UP, "Move the workspace cursor up.");
Blockly.navigation.ACTION_MOVE_WS_CURSOR_DOWN = new Blockly.Action(Blockly.navigation.actionNames.MOVE_WS_CURSOR_DOWN, "Move the workspace cursor down.");
Blockly.navigation.READONLY_ACTION_LIST = [Blockly.navigation.ACTION_PREVIOUS, Blockly.navigation.ACTION_OUT, Blockly.navigation.ACTION_IN, Blockly.navigation.ACTION_NEXT, Blockly.navigation.ACTION_TOGGLE_KEYBOARD_NAV];
Blockly.Gesture = function(a, b) {
    this.mouseDownXY_ = null;
    this.currentDragDeltaXY_ = new Blockly.utils.Coordinate(0, 0);
    this.startWorkspace_ = this.targetBlock_ = this.startBlock_ = this.startField_ = this.startBubble_ = null;
    this.creatorWorkspace_ = b;
    this.isDraggingBubble_ = this.isDraggingBlock_ = this.isDraggingWorkspace_ = this.hasExceededDragRadius_ = !1;
    this.mostRecentEvent_ = a;
    this.flyout_ = this.workspaceDragger_ = this.blockDragger_ = this.bubbleDragger_ = this.onUpWrapper_ = this.onMoveWrapper_ = null;
    this.isEnding_ = this.hasStarted_ =
        this.calledUpdateIsDragging_ = !1;
    this.healStack_ = !Blockly.DRAG_STACK
};
Blockly.Gesture.prototype.dispose = function() {
    Blockly.Touch.clearTouchIdentifier();
    Blockly.Tooltip.unblock();
    this.creatorWorkspace_.clearGesture();
    this.onMoveWrapper_ && Blockly.unbindEvent_(this.onMoveWrapper_);
    this.onUpWrapper_ && Blockly.unbindEvent_(this.onUpWrapper_);
    this.blockDragger_ && this.blockDragger_.dispose();
    this.workspaceDragger_ && this.workspaceDragger_.dispose();
    this.bubbleDragger_ && this.bubbleDragger_.dispose()
};
Blockly.Gesture.prototype.updateFromEvent_ = function(a) {
    var b = new Blockly.utils.Coordinate(a.clientX, a.clientY);
    this.updateDragDelta_(b) && (this.updateIsDragging_(), Blockly.longStop_());
    this.mostRecentEvent_ = a
};
Blockly.Gesture.prototype.updateDragDelta_ = function(a) { this.currentDragDeltaXY_ = Blockly.utils.Coordinate.difference(a, this.mouseDownXY_); return this.hasExceededDragRadius_ ? !1 : this.hasExceededDragRadius_ = Blockly.utils.Coordinate.magnitude(this.currentDragDeltaXY_) > (this.flyout_ ? Blockly.FLYOUT_DRAG_RADIUS : Blockly.DRAG_RADIUS) };
Blockly.Gesture.prototype.updateIsDraggingFromFlyout_ = function() {
    return this.targetBlock_ && this.flyout_.isBlockCreatable_(this.targetBlock_) ? !this.flyout_.isScrollable() || this.flyout_.isDragTowardWorkspace(this.currentDragDeltaXY_) ? (this.startWorkspace_ = this.flyout_.targetWorkspace_, this.startWorkspace_.updateScreenCalculationsIfScrolled(), Blockly.Events.getGroup() || Blockly.Events.setGroup(!0), this.startBlock_ = null, this.targetBlock_ = this.flyout_.createBlock(this.targetBlock_), this.targetBlock_.select(), !0) : !1 : !1
};
Blockly.Gesture.prototype.updateIsDraggingBubble_ = function() {
    if (!this.startBubble_) return !1;
    this.isDraggingBubble_ = !0;
    this.startDraggingBubble_();
    return !0
};
Blockly.Gesture.prototype.updateIsDraggingBlock_ = function() {
    if (!this.targetBlock_) return !1;
    this.flyout_ ? this.isDraggingBlock_ = this.updateIsDraggingFromFlyout_() : this.targetBlock_.isMovable() && (this.isDraggingBlock_ = !0);
    return this.isDraggingBlock_ ? (this.startDraggingBlock_(), !0) : !1
};
Blockly.Gesture.prototype.updateIsDraggingWorkspace_ = function() { if (this.flyout_ ? this.flyout_.isScrollable() : this.startWorkspace_ && this.startWorkspace_.isDraggable()) this.workspaceDragger_ = this.flyout_ ? new Blockly.FlyoutDragger(this.flyout_) : new Blockly.WorkspaceDragger(this.startWorkspace_), this.isDraggingWorkspace_ = !0, this.workspaceDragger_.startDrag() };
Blockly.Gesture.prototype.updateIsDragging_ = function() {
    if (this.calledUpdateIsDragging_) throw Error("updateIsDragging_ should only be called once per gesture.");
    this.calledUpdateIsDragging_ = !0;
    this.updateIsDraggingBubble_() || this.updateIsDraggingBlock_() || this.updateIsDraggingWorkspace_()
};
Blockly.Gesture.prototype.startDraggingBlock_ = function() {
    this.blockDragger_ = new Blockly.BlockDragger(this.targetBlock_, this.startWorkspace_);
    this.blockDragger_.startBlockDrag(this.currentDragDeltaXY_, this.healStack_);
    this.blockDragger_.dragBlock(this.mostRecentEvent_, this.currentDragDeltaXY_)
};
Blockly.Gesture.prototype.startDraggingBubble_ = function() {
    this.bubbleDragger_ = new Blockly.BubbleDragger(this.startBubble_, this.startWorkspace_);
    this.bubbleDragger_.startBubbleDrag();
    this.bubbleDragger_.dragBubble(this.mostRecentEvent_, this.currentDragDeltaXY_)
};
Blockly.Gesture.prototype.doStart = function(a) {
    Blockly.utils.isTargetInput(a) ? this.cancel() : (this.hasStarted_ = !0, Blockly.blockAnimations.disconnectUiStop(), this.startWorkspace_.updateScreenCalculationsIfScrolled(), this.startWorkspace_.isMutator && this.startWorkspace_.resize(), Blockly.hideChaff(!!this.flyout_), this.startWorkspace_.markFocused(), this.mostRecentEvent_ = a, Blockly.Tooltip.block(), this.targetBlock_ && (!this.targetBlock_.isInFlyout && a.shiftKey && this.targetBlock_.workspace.keyboardAccessibilityMode ?
        this.creatorWorkspace_.getCursor().setCurNode(Blockly.navigation.getTopNode(this.targetBlock_)) : this.targetBlock_.select()), Blockly.utils.isRightButton(a) ? this.handleRightClick(a) : ("touchstart" != a.type.toLowerCase() && "pointerdown" != a.type.toLowerCase() || "mouse" == a.pointerType || Blockly.longStart(a, this), this.mouseDownXY_ = new Blockly.utils.Coordinate(a.clientX, a.clientY), this.healStack_ = a.altKey || a.ctrlKey || a.metaKey, this.bindMouseEvents(a)))
};
Blockly.Gesture.prototype.bindMouseEvents = function(a) {
    this.onMoveWrapper_ = Blockly.bindEventWithChecks_(document, "mousemove", null, this.handleMove.bind(this));
    this.onUpWrapper_ = Blockly.bindEventWithChecks_(document, "mouseup", null, this.handleUp.bind(this));
    a.preventDefault();
    a.stopPropagation()
};
Blockly.Gesture.prototype.handleMove = function(a) {
    this.updateFromEvent_(a);
    this.isDraggingWorkspace_ ? this.workspaceDragger_.drag(this.currentDragDeltaXY_) : this.isDraggingBlock_ ? this.blockDragger_.dragBlock(this.mostRecentEvent_, this.currentDragDeltaXY_) : this.isDraggingBubble_ && this.bubbleDragger_.dragBubble(this.mostRecentEvent_, this.currentDragDeltaXY_);
    a.preventDefault();
    a.stopPropagation()
};
Blockly.Gesture.prototype.handleUp = function(a) {
    this.updateFromEvent_(a);
    Blockly.longStop_();
    this.isEnding_ ? console.log("Trying to end a gesture recursively.") : (this.isEnding_ = !0, this.isDraggingBubble_ ? this.bubbleDragger_.endBubbleDrag(a, this.currentDragDeltaXY_) : this.isDraggingBlock_ ? this.blockDragger_.endBlockDrag(a, this.currentDragDeltaXY_) : this.isDraggingWorkspace_ ? this.workspaceDragger_.endDrag(this.currentDragDeltaXY_) : this.isBubbleClick_() ? this.doBubbleClick_() : this.isFieldClick_() ? this.doFieldClick_() :
        this.isBlockClick_() ? this.doBlockClick_() : this.isWorkspaceClick_() && this.doWorkspaceClick_(a), a.preventDefault(), a.stopPropagation(), this.dispose())
};
Blockly.Gesture.prototype.cancel = function() { this.isEnding_ || (Blockly.longStop_(), this.isDraggingBubble_ ? this.bubbleDragger_.endBubbleDrag(this.mostRecentEvent_, this.currentDragDeltaXY_) : this.isDraggingBlock_ ? this.blockDragger_.endBlockDrag(this.mostRecentEvent_, this.currentDragDeltaXY_) : this.isDraggingWorkspace_ && this.workspaceDragger_.endDrag(this.currentDragDeltaXY_), this.dispose()) };
Blockly.Gesture.prototype.handleRightClick = function(a) {
    this.targetBlock_ ? (this.bringBlockToFront_(), Blockly.hideChaff(!!this.flyout_), this.targetBlock_.showContextMenu(a)) : this.startBubble_ ? this.startBubble_.showContextMenu(a) : this.startWorkspace_ && !this.flyout_ && (Blockly.hideChaff(), this.startWorkspace_.showContextMenu(a));
    a.preventDefault();
    a.stopPropagation();
    this.dispose()
};
Blockly.Gesture.prototype.handleWsStart = function(a, b) {
    if (this.hasStarted_) throw Error("Tried to call gesture.handleWsStart, but the gesture had already been started.");
    this.setStartWorkspace_(b);
    this.mostRecentEvent_ = a;
    this.doStart(a);
    this.startWorkspace_.keyboardAccessibilityMode && Blockly.navigation.setState(Blockly.navigation.STATE_WS)
};
Blockly.Gesture.prototype.handleFlyoutStart = function(a, b) {
    if (this.hasStarted_) throw Error("Tried to call gesture.handleFlyoutStart, but the gesture had already been started.");
    this.setStartFlyout_(b);
    this.handleWsStart(a, b.getWorkspace())
};
Blockly.Gesture.prototype.handleBlockStart = function(a, b) {
    if (this.hasStarted_) throw Error("Tried to call gesture.handleBlockStart, but the gesture had already been started.");
    this.setStartBlock(b);
    this.mostRecentEvent_ = a
};
Blockly.Gesture.prototype.handleBubbleStart = function(a, b) {
    if (this.hasStarted_) throw Error("Tried to call gesture.handleBubbleStart, but the gesture had already been started.");
    this.setStartBubble(b);
    this.mostRecentEvent_ = a
};
Blockly.Gesture.prototype.doBubbleClick_ = function() {
    this.startBubble_.setFocus && this.startBubble_.setFocus();
    this.startBubble_.select && this.startBubble_.select()
};
Blockly.Gesture.prototype.doFieldClick_ = function() {
    this.startField_.showEditor(this.mostRecentEvent_);
    this.bringBlockToFront_()
};
Blockly.Gesture.prototype.doBlockClick_ = function() {
    this.flyout_ && this.flyout_.autoClose ? this.targetBlock_.isEnabled() && (Blockly.Events.getGroup() || Blockly.Events.setGroup(!0), this.flyout_.createBlock(this.targetBlock_).scheduleSnapAndBump()) : Blockly.Events.fire(new Blockly.Events.Ui(this.startBlock_, "click", void 0, void 0));
    this.bringBlockToFront_();
    Blockly.Events.setGroup(!1)
};
Blockly.Gesture.prototype.doWorkspaceClick_ = function(a) {
    var b = this.creatorWorkspace_;
    a.shiftKey && b.keyboardAccessibilityMode ? (a = new Blockly.utils.Coordinate(a.clientX, a.clientY), a = Blockly.utils.screenToWsCoordinates(b, a), a = Blockly.ASTNode.createWorkspaceNode(b, a), b.getCursor().setCurNode(a)) : Blockly.selected && Blockly.selected.unselect()
};
Blockly.Gesture.prototype.bringBlockToFront_ = function() { this.targetBlock_ && !this.flyout_ && this.targetBlock_.bringToFront() };
Blockly.Gesture.prototype.setStartField = function(a) {
    if (this.hasStarted_) throw Error("Tried to call gesture.setStartField, but the gesture had already been started.");
    this.startField_ || (this.startField_ = a)
};
Blockly.Gesture.prototype.setStartBubble = function(a) { this.startBubble_ || (this.startBubble_ = a) };
Blockly.Gesture.prototype.setStartBlock = function(a) { this.startBlock_ || this.startBubble_ || (this.startBlock_ = a, a.isInFlyout && a != a.getRootBlock() ? this.setTargetBlock_(a.getRootBlock()) : this.setTargetBlock_(a)) };
Blockly.Gesture.prototype.setTargetBlock_ = function(a) { a.isShadow() ? this.setTargetBlock_(a.getParent()) : this.targetBlock_ = a };
Blockly.Gesture.prototype.setStartWorkspace_ = function(a) { this.startWorkspace_ || (this.startWorkspace_ = a) };
Blockly.Gesture.prototype.setStartFlyout_ = function(a) { this.flyout_ || (this.flyout_ = a) };
Blockly.Gesture.prototype.isBubbleClick_ = function() { return !!this.startBubble_ && !this.hasExceededDragRadius_ };
Blockly.Gesture.prototype.isBlockClick_ = function() { return !!this.startBlock_ && !this.hasExceededDragRadius_ && !this.isFieldClick_() };
Blockly.Gesture.prototype.isFieldClick_ = function() { return (this.startField_ ? this.startField_.isClickable() : !1) && !this.hasExceededDragRadius_ && (!this.flyout_ || !this.flyout_.autoClose) };
Blockly.Gesture.prototype.isWorkspaceClick_ = function() { return !this.startBlock_ && !this.startBubble_ && !this.startField_ && !this.hasExceededDragRadius_ };
Blockly.Gesture.prototype.isDragging = function() { return this.isDraggingWorkspace_ || this.isDraggingBlock_ || this.isDraggingBubble_ };
Blockly.Gesture.prototype.hasStarted = function() { return this.hasStarted_ };
Blockly.Gesture.prototype.getInsertionMarkers = function() { return this.blockDragger_ ? this.blockDragger_.getInsertionMarkers() : [] };
Blockly.Gesture.inProgress = function() {
    for (var a = Blockly.Workspace.getAll(), b = 0, c; c = a[b]; b++)
        if (c.currentGesture_) return !0;
    return !1
};
Blockly.Field = function(a, b, c) {
    this.tooltip_ = this.validator_ = this.value_ = null;
    this.size_ = new Blockly.utils.Size(0, 0);
    this.constants_ = this.mouseDownWrapper_ = this.textContent_ = this.textElement_ = this.borderRect_ = this.fieldGroup_ = this.markerSvg_ = this.cursorSvg_ = null;
    c && this.configure_(c);
    this.setValue(a);
    b && this.setValidator(b)
};
Blockly.Field.prototype.name = void 0;
Blockly.Field.prototype.disposed = !1;
Blockly.Field.prototype.maxDisplayLength = 50;
Blockly.Field.prototype.sourceBlock_ = null;
Blockly.Field.prototype.isDirty_ = !0;
Blockly.Field.prototype.visible_ = !0;
Blockly.Field.prototype.clickTarget_ = null;
Blockly.Field.NBSP = "\u00a0";
Blockly.Field.prototype.EDITABLE = !0;
Blockly.Field.prototype.SERIALIZABLE = !1;
Blockly.Field.prototype.configure_ = function(a) {
    var b = a.tooltip;
    "string" == typeof b && (b = Blockly.utils.replaceMessageReferences(a.tooltip));
    b && this.setTooltip(b)
};
Blockly.Field.prototype.setSourceBlock = function(a) {
    if (this.sourceBlock_) throw Error("Field already bound to a block.");
    this.sourceBlock_ = a
};
Blockly.Field.prototype.getConstants = function() {!this.constants_ && this.sourceBlock_ && this.sourceBlock_.workspace && this.sourceBlock_.workspace.rendered && (this.constants_ = this.sourceBlock_.workspace.getRenderer().getConstants()); return this.constants_ };
Blockly.Field.prototype.getSourceBlock = function() { return this.sourceBlock_ };
Blockly.Field.prototype.init = function() { this.fieldGroup_ || (this.fieldGroup_ = Blockly.utils.dom.createSvgElement("g", {}, null), this.isVisible() || (this.fieldGroup_.style.display = "none"), this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_), this.initView(), this.updateEditable(), this.setTooltip(this.tooltip_), this.bindEvents_(), this.initModel()) };
Blockly.Field.prototype.initView = function() {
    this.createBorderRect_();
    this.createTextElement_()
};
Blockly.Field.prototype.initModel = function() {};
Blockly.Field.prototype.createBorderRect_ = function() { this.borderRect_ = Blockly.utils.dom.createSvgElement("rect", { rx: this.getConstants().FIELD_BORDER_RECT_RADIUS, ry: this.getConstants().FIELD_BORDER_RECT_RADIUS, x: 0, y: 0, height: this.size_.height, width: this.size_.width, "class": "blocklyFieldRect" }, this.fieldGroup_) };
Blockly.Field.prototype.createTextElement_ = function() {
    this.textElement_ = Blockly.utils.dom.createSvgElement("text", { "class": "blocklyText" }, this.fieldGroup_);
    this.getConstants().FIELD_TEXT_BASELINE_CENTER && this.textElement_.setAttribute("dominant-baseline", "central");
    this.textContent_ = document.createTextNode("");
    this.textElement_.appendChild(this.textContent_)
};
Blockly.Field.prototype.bindEvents_ = function() {
    Blockly.Tooltip.bindMouseEvents(this.getClickTarget_());
    this.mouseDownWrapper_ = Blockly.bindEventWithChecks_(this.getClickTarget_(), "mousedown", this, this.onMouseDown_)
};
Blockly.Field.prototype.fromXml = function(a) { this.setValue(a.textContent) };
Blockly.Field.prototype.toXml = function(a) { a.textContent = this.getValue(); return a };
Blockly.Field.prototype.dispose = function() {
    Blockly.DropDownDiv.hideIfOwner(this);
    Blockly.WidgetDiv.hideIfOwner(this);
    Blockly.Tooltip.unbindMouseEvents(this.getClickTarget_());
    this.mouseDownWrapper_ && Blockly.unbindEvent_(this.mouseDownWrapper_);
    Blockly.utils.dom.removeNode(this.fieldGroup_);
    this.disposed = !0
};
Blockly.Field.prototype.updateEditable = function() {
    var a = this.fieldGroup_;
    this.EDITABLE && a && (this.sourceBlock_.isEditable() ? (Blockly.utils.dom.addClass(a, "blocklyEditableText"), Blockly.utils.dom.removeClass(a, "blocklyNonEditableText"), a.style.cursor = this.CURSOR) : (Blockly.utils.dom.addClass(a, "blocklyNonEditableText"), Blockly.utils.dom.removeClass(a, "blocklyEditableText"), a.style.cursor = ""))
};
Blockly.Field.prototype.isClickable = function() { return !!this.sourceBlock_ && this.sourceBlock_.isEditable() && !!this.showEditor_ && "function" === typeof this.showEditor_ };
Blockly.Field.prototype.isCurrentlyEditable = function() { return this.EDITABLE && !!this.sourceBlock_ && this.sourceBlock_.isEditable() };
Blockly.Field.prototype.isSerializable = function() {
    var a = !1;
    this.name && (this.SERIALIZABLE ? a = !0 : this.EDITABLE && (console.warn("Detected an editable field that was not serializable. Please define SERIALIZABLE property as true on all editable custom fields. Proceeding with serialization."), a = !0));
    return a
};
Blockly.Field.prototype.isVisible = function() { return this.visible_ };
Blockly.Field.prototype.setVisible = function(a) {
    if (this.visible_ != a) {
        this.visible_ = a;
        var b = this.getSvgRoot();
        b && (b.style.display = a ? "block" : "none")
    }
};
Blockly.Field.prototype.setValidator = function(a) { this.validator_ = a };
Blockly.Field.prototype.getValidator = function() { return this.validator_ };
Blockly.Field.prototype.classValidator = function(a) { return a };
Blockly.Field.prototype.callValidator = function(a) {
    var b = this.classValidator(a);
    if (null === b) return null;
    void 0 !== b && (a = b);
    if (b = this.getValidator()) {
        b = b.call(this, a);
        if (null === b) return null;
        void 0 !== b && (a = b)
    }
    return a
};
Blockly.Field.prototype.getSvgRoot = function() { return this.fieldGroup_ };
Blockly.Field.prototype.applyColour = function() {};
Blockly.Field.prototype.render_ = function() {
    this.textContent_ && (this.textContent_.nodeValue = this.getDisplayText_());
    this.updateSize_()
};
Blockly.Field.prototype.showEditor = function(a) { this.isClickable() && this.showEditor_(a) };
Blockly.Field.prototype.updateWidth = function() {
    console.warn("Deprecated call to updateWidth, call Blockly.Field.updateSize_ to force an update to the size of the field, or Blockly.utils.dom.getTextWidth() to check the size of the field.");
    this.updateSize_()
};
Blockly.Field.prototype.updateSize_ = function(a) {
    var b = this.getConstants();
    a = void 0 != a ? a : this.borderRect_ ? this.getConstants().FIELD_BORDER_RECT_X_PADDING : 0;
    var c = 2 * a,
        d = b.FIELD_TEXT_HEIGHT,
        e = 0;
    this.textElement_ && (e = Blockly.utils.dom.getFastTextWidth(this.textElement_, b.FIELD_TEXT_FONTSIZE, b.FIELD_TEXT_FONTWEIGHT, b.FIELD_TEXT_FONTFAMILY), c += e);
    this.borderRect_ && (d = Math.max(d, b.FIELD_BORDER_RECT_HEIGHT));
    this.size_.height = d;
    this.size_.width = c;
    this.positionTextElement_(a, e);
    this.positionBorderRect_()
};
Blockly.Field.prototype.positionTextElement_ = function(a, b) {
    if (this.textElement_) {
        var c = this.getConstants(),
            d = this.size_.height / 2;
        this.textElement_.setAttribute("x", this.sourceBlock_.RTL ? this.size_.width - b - a : a);
        this.textElement_.setAttribute("y", c.FIELD_TEXT_BASELINE_CENTER ? d : d - c.FIELD_TEXT_HEIGHT / 2 + c.FIELD_TEXT_BASELINE)
    }
};
Blockly.Field.prototype.positionBorderRect_ = function() { this.borderRect_ && (this.borderRect_.setAttribute("width", this.size_.width), this.borderRect_.setAttribute("height", this.size_.height), this.borderRect_.setAttribute("rx", this.getConstants().FIELD_BORDER_RECT_RADIUS), this.borderRect_.setAttribute("ry", this.getConstants().FIELD_BORDER_RECT_RADIUS)) };
Blockly.Field.prototype.getSize = function() {
    if (!this.isVisible()) return new Blockly.utils.Size(0, 0);
    this.isDirty_ ? (this.render_(), this.isDirty_ = !1) : this.visible_ && 0 == this.size_.width && (console.warn("Deprecated use of setting size_.width to 0 to rerender a field. Set field.isDirty_ to true instead."), this.render_());
    return this.size_
};
Blockly.Field.prototype.getScaledBBox = function() {
    if (this.borderRect_) a = this.borderRect_.getBoundingClientRect(), c = Blockly.utils.style.getPageOffset(this.borderRect_), d = a.width, a = a.height;
    else {
        var a = this.sourceBlock_.getHeightWidth(),
            b = this.sourceBlock_.workspace.scale,
            c = this.getAbsoluteXY_(),
            d = a.width * b;
        a = a.height * b;
        Blockly.utils.userAgent.GECKO ? (c.x += 1.5 * b, c.y += 1.5 * b) : Blockly.utils.userAgent.EDGE || Blockly.utils.userAgent.IE || (c.x -= .5 * b, c.y -= .5 * b);
        d += 1 * b;
        a += 1 * b
    }
    return {
        top: c.y,
        bottom: c.y + a,
        left: c.x,
        right: c.x + d
    }
};
Blockly.Field.prototype.getDisplayText_ = function() {
    var a = this.getText();
    if (!a) return Blockly.Field.NBSP;
    a.length > this.maxDisplayLength && (a = a.substring(0, this.maxDisplayLength - 2) + "\u2026");
    a = a.replace(/\s/g, Blockly.Field.NBSP);
    this.sourceBlock_ && this.sourceBlock_.RTL && (a += "\u200f");
    return a
};
Blockly.Field.prototype.getText = function() { if (this.getText_) { var a = this.getText_.call(this); if (null !== a) return String(a) } return String(this.getValue()) };
Blockly.Field.prototype.setText = function(a) { throw Error("setText method is deprecated"); };
Blockly.Field.prototype.markDirty = function() {
    this.isDirty_ = !0;
    this.constants_ = null
};
Blockly.Field.prototype.forceRerender = function() {
    this.isDirty_ = !0;
    this.sourceBlock_ && this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours(), this.updateMarkers_())
};
Blockly.Field.prototype.setValue = function(a) {
    if (null !== a) {
        var b = this.doClassValidation_(a);
        a = this.processValidation_(a, b);
        if (!(a instanceof Error)) {
            if (b = this.getValidator())
                if (b = b.call(this, a), a = this.processValidation_(a, b), a instanceof Error) return;
            b = this.getValue();
            b !== a && (this.sourceBlock_ && Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.BlockChange(this.sourceBlock_, "field", this.name || null, b, a)), this.doValueUpdate_(a), this.isDirty_ && this.forceRerender())
        }
    }
};
Blockly.Field.prototype.processValidation_ = function(a, b) {
    if (null === b) return this.doValueInvalid_(a), this.isDirty_ && this.forceRerender(), Error();
    void 0 !== b && (a = b);
    return a
};
Blockly.Field.prototype.getValue = function() { return this.value_ };
Blockly.Field.prototype.doClassValidation_ = function(a) { return null === a || void 0 === a ? null : a = this.classValidator(a) };
Blockly.Field.prototype.doValueUpdate_ = function(a) {
    this.value_ = a;
    this.isDirty_ = !0
};
Blockly.Field.prototype.doValueInvalid_ = function(a) {};
Blockly.Field.prototype.onMouseDown_ = function(a) { this.sourceBlock_ && this.sourceBlock_.workspace && (a = this.sourceBlock_.workspace.getGesture(a)) && a.setStartField(this) };
Blockly.Field.prototype.setTooltip = function(a) {
    var b = this.getClickTarget_();
    b ? b.tooltip = a || "" === a ? a : this.sourceBlock_ : this.tooltip_ = a
};
Blockly.Field.prototype.getClickTarget_ = function() { return this.clickTarget_ || this.getSvgRoot() };
Blockly.Field.prototype.getAbsoluteXY_ = function() { return Blockly.utils.style.getPageOffset(this.getClickTarget_()) };
Blockly.Field.prototype.referencesVariables = function() { return !1 };
Blockly.Field.prototype.getParentInput = function() {
    for (var a = null, b = this.sourceBlock_, c = b.inputList, d = 0; d < b.inputList.length; d++)
        for (var e = c[d], f = e.fieldRow, g = 0; g < f.length; g++)
            if (f[g] === this) { a = e; break }
    return a
};
Blockly.Field.prototype.getFlipRtl = function() { return !1 };
Blockly.Field.prototype.isTabNavigable = function() { return !1 };
Blockly.Field.prototype.onBlocklyAction = function(a) { return !1 };
Blockly.Field.prototype.setCursorSvg = function(a) { a ? (this.fieldGroup_.appendChild(a), this.cursorSvg_ = a) : this.cursorSvg_ = null };
Blockly.Field.prototype.setMarkerSvg = function(a) { a ? (this.fieldGroup_.appendChild(a), this.markerSvg_ = a) : this.markerSvg_ = null };
Blockly.Field.prototype.updateMarkers_ = function() {
    var a = this.sourceBlock_.workspace;
    a.keyboardAccessibilityMode && this.cursorSvg_ && a.getCursor().draw();
    a.keyboardAccessibilityMode && this.markerSvg_ && a.getMarker(Blockly.navigation.MARKER_NAME).draw()
};
Blockly.FieldLabel = function(a, b, c) {
    this.class_ = null;
    null == a && (a = "");
    Blockly.FieldLabel.superClass_.constructor.call(this, a, null, c);
    c || (this.class_ = b || null)
};
Blockly.utils.object.inherits(Blockly.FieldLabel, Blockly.Field);
Blockly.FieldLabel.fromJson = function(a) { var b = Blockly.utils.replaceMessageReferences(a.text); return new Blockly.FieldLabel(b, void 0, a) };
Blockly.FieldLabel.prototype.EDITABLE = !1;
Blockly.FieldLabel.prototype.configure_ = function(a) {
    Blockly.FieldLabel.superClass_.configure_.call(this, a);
    this.class_ = a["class"]
};
Blockly.FieldLabel.prototype.initView = function() {
    this.createTextElement_();
    this.class_ && Blockly.utils.dom.addClass(this.textElement_, this.class_)
};
Blockly.FieldLabel.prototype.doClassValidation_ = function(a) { return null === a || void 0 === a ? null : String(a) };
Blockly.FieldLabel.prototype.setClass = function(a) {
    this.textElement_ && (this.class_ && Blockly.utils.dom.removeClass(this.textElement_, this.class_), a && Blockly.utils.dom.addClass(this.textElement_, a));
    this.class_ = a
};
Blockly.fieldRegistry.register("field_label", Blockly.FieldLabel);
Blockly.Input = function(a, b, c, d) {
    if (a != Blockly.DUMMY_INPUT && !b) throw Error("Value inputs and statement inputs must have non-empty name.");
    this.type = a;
    this.name = b;
    this.sourceBlock_ = c;
    this.connection = d;
    this.fieldRow = []
};
Blockly.Input.prototype.align = Blockly.ALIGN_LEFT;
Blockly.Input.prototype.visible_ = !0;
Blockly.Input.prototype.getSourceBlock = function() { return this.sourceBlock_ };
Blockly.Input.prototype.appendField = function(a, b) { this.insertFieldAt(this.fieldRow.length, a, b); return this };
Blockly.Input.prototype.insertFieldAt = function(a, b, c) {
    if (0 > a || a > this.fieldRow.length) throw Error("index " + a + " out of bounds.");
    if (!(b || "" == b && c)) return a;
    "string" == typeof b && (b = new Blockly.FieldLabel(b));
    b.setSourceBlock(this.sourceBlock_);
    this.sourceBlock_.rendered && b.init();
    b.name = c;
    b.prefixField && (a = this.insertFieldAt(a, b.prefixField));
    this.fieldRow.splice(a, 0, b);
    ++a;
    b.suffixField && (a = this.insertFieldAt(a, b.suffixField));
    this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours());
    return a
};
Blockly.Input.prototype.removeField = function(a) {
    for (var b = 0, c; c = this.fieldRow[b]; b++)
        if (c.name === a) {
            c.dispose();
            this.fieldRow.splice(b, 1);
            this.sourceBlock_.rendered && (this.sourceBlock_.render(), this.sourceBlock_.bumpNeighbours());
            return
        }
    throw Error('Field "%s" not found.', a);
};
Blockly.Input.prototype.isVisible = function() { return this.visible_ };
Blockly.Input.prototype.setVisible = function(a) {
    var b = [];
    if (this.visible_ == a) return b;
    for (var c = (this.visible_ = a) ? "block" : "none", d = 0, e; e = this.fieldRow[d]; d++) e.setVisible(a);
    this.connection && (a ? b = this.connection.startTrackingAll() : this.connection.stopTrackingAll(), d = this.connection.targetBlock()) && (d.getSvgRoot().style.display = c, a || (d.rendered = !1));
    return b
};
Blockly.Input.prototype.markDirty = function() { for (var a = 0, b; b = this.fieldRow[a]; a++) b.markDirty() };
Blockly.Input.prototype.setCheck = function(a) {
    if (!this.connection) throw Error("This input does not have a connection.");
    this.connection.setCheck(a);
    return this
};
Blockly.Input.prototype.setAlign = function(a) {
    this.align = a;
    this.sourceBlock_.rendered && this.sourceBlock_.render();
    return this
};
Blockly.Input.prototype.init = function() {
    if (this.sourceBlock_.workspace.rendered)
        for (var a = 0; a < this.fieldRow.length; a++) this.fieldRow[a].init()
};
Blockly.Input.prototype.dispose = function() {
    for (var a = 0, b; b = this.fieldRow[a]; a++) b.dispose();
    this.connection && this.connection.dispose();
    this.sourceBlock_ = null
};
Blockly.Block = function(a, b, c) {
    if (Blockly.Generator && "undefined" != typeof Blockly.Generator.prototype[b]) throw Error('Block prototypeName "' + b + '" conflicts with Blockly.Generator members.');
    this.id = c && !a.getBlockById(c) ? c : Blockly.utils.genUid();
    a.setBlockById(this.id, this);
    this.previousConnection = this.nextConnection = this.outputConnection = null;
    this.inputList = [];
    this.inputsInline = void 0;
    this.disabled = !1;
    this.tooltip = "";
    this.contextMenu = !0;
    this.parentBlock_ = null;
    this.childBlocks_ = [];
    this.editable_ = this.movable_ =
        this.deletable_ = !0;
    this.collapsed_ = this.isShadow_ = !1;
    this.comment = this.outputShape_ = null;
    this.commentModel = { text: null, pinned: !1, size: new Blockly.utils.Size(160, 80) };
    this.xy_ = new Blockly.utils.Coordinate(0, 0);
    this.workspace = a;
    this.isInFlyout = a.isFlyout;
    this.isInMutator = a.isMutator;
    this.RTL = a.RTL;
    this.isInsertionMarker_ = !1;
    this.hat = void 0;
    this.statementInputCount = 0;
    if (b) {
        this.type = b;
        c = Blockly.Blocks[b];
        if (!c || "object" != typeof c) throw TypeError("Unknown block type: " + b);
        Blockly.utils.object.mixin(this,
            c)
    }
    a.addTopBlock(this);
    a.addTypedBlock(this);
    "function" == typeof this.init && this.init();
    this.inputsInlineDefault = this.inputsInline;
    if (Blockly.Events.isEnabled()) {
        (a = Blockly.Events.getGroup()) || Blockly.Events.setGroup(!0);
        try { Blockly.Events.fire(new Blockly.Events.BlockCreate(this)) } finally { a || Blockly.Events.setGroup(!1) }
    }
    "function" == typeof this.onchange && this.setOnChange(this.onchange)
};
Blockly.Block.prototype.data = null;
Blockly.Block.prototype.disposed = !1;
Blockly.Block.prototype.hue_ = null;
Blockly.Block.prototype.colour_ = "#000000";
Blockly.Block.prototype.styleName_ = null;
Blockly.Block.prototype.dispose = function(a) {
    if (this.workspace) {
        this.onchangeWrapper_ && this.workspace.removeChangeListener(this.onchangeWrapper_);
        this.unplug(a);
        Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.BlockDelete(this));
        Blockly.Events.disable();
        try {
            this.workspace && (this.workspace.removeTopBlock(this), this.workspace.removeTypedBlock(this), this.workspace.removeBlockById(this.id), this.workspace = null);
            Blockly.selected == this && (Blockly.selected = null);
            for (var b = this.childBlocks_.length -
                    1; 0 <= b; b--) this.childBlocks_[b].dispose(!1);
            b = 0;
            for (var c; c = this.inputList[b]; b++) c.dispose();
            this.inputList.length = 0;
            var d = this.getConnections_(!0);
            b = 0;
            for (var e; e = d[b]; b++) e.dispose()
        } finally { Blockly.Events.enable(), this.disposed = !0 }
    }
};
Blockly.Block.prototype.initModel = function() {
    for (var a = 0, b; b = this.inputList[a]; a++)
        for (var c = 0, d; d = b.fieldRow[c]; c++) d.initModel && d.initModel()
};
Blockly.Block.prototype.unplug = function(a) { this.outputConnection ? this.unplugFromRow_(a) : this.previousConnection && this.unplugFromStack_(a) };
Blockly.Block.prototype.unplugFromRow_ = function(a) {
    var b = null;
    this.outputConnection.isConnected() && (b = this.outputConnection.targetConnection, this.outputConnection.disconnect());
    if (b && a && (a = this.getOnlyValueConnection_()) && a.isConnected() && !a.targetBlock().isShadow())
        if (a = a.targetConnection, a.disconnect(), a.checkType(b)) b.connect(a);
        else a.onFailedConnect(b)
};
Blockly.Block.prototype.getOnlyValueConnection_ = function() {
    for (var a = null, b = 0; b < this.inputList.length; b++) {
        var c = this.inputList[b].connection;
        if (c && c.type == Blockly.INPUT_VALUE && c.targetConnection) {
            if (a) return null;
            a = c
        }
    }
    return a
};
Blockly.Block.prototype.unplugFromStack_ = function(a) {
    var b = null;
    this.previousConnection.isConnected() && (b = this.previousConnection.targetConnection, this.previousConnection.disconnect());
    var c = this.getNextBlock();
    a && c && !c.isShadow() && (a = this.nextConnection.targetConnection, a.disconnect(), b && b.checkType(a) && b.connect(a))
};
Blockly.Block.prototype.getConnections_ = function(a) {
    a = [];
    this.outputConnection && a.push(this.outputConnection);
    this.previousConnection && a.push(this.previousConnection);
    this.nextConnection && a.push(this.nextConnection);
    for (var b = 0, c; c = this.inputList[b]; b++) c.connection && a.push(c.connection);
    return a
};
Blockly.Block.prototype.lastConnectionInStack = function() {
    for (var a = this.nextConnection; a;) {
        var b = a.targetBlock();
        if (!b) return a;
        a = b.nextConnection
    }
    return null
};
Blockly.Block.prototype.bumpNeighbours = function() { console.warn("Not expected to reach Block.bumpNeighbours function. BlockSvg.bumpNeighbours was expected to be called instead.") };
Blockly.Block.prototype.getParent = function() { return this.parentBlock_ };
Blockly.Block.prototype.getInputWithBlock = function(a) {
    for (var b = 0, c; c = this.inputList[b]; b++)
        if (c.connection && c.connection.targetBlock() == a) return c;
    return null
};
Blockly.Block.prototype.getSurroundParent = function() {
    var a = this;
    do {
        var b = a;
        a = a.getParent();
        if (!a) return null
    } while (a.getNextBlock() == b);
    return a
};
Blockly.Block.prototype.getNextBlock = function() { return this.nextConnection && this.nextConnection.targetBlock() };
Blockly.Block.prototype.getPreviousBlock = function() { return this.previousConnection && this.previousConnection.targetBlock() };
Blockly.Block.prototype.getFirstStatementConnection = function() {
    for (var a = 0, b; b = this.inputList[a]; a++)
        if (b.connection && b.connection.type == Blockly.NEXT_STATEMENT) return b.connection;
    return null
};
Blockly.Block.prototype.getRootBlock = function() {
    var a = this;
    do {
        var b = a;
        a = b.parentBlock_
    } while (a);
    return b
};
Blockly.Block.prototype.getTopStackBlock = function() {
    var a = this;
    do var b = a.getPreviousBlock(); while (b && b.getNextBlock() == a && (a = b));
    return a
};
Blockly.Block.prototype.getChildren = function(a) {
    if (!a) return this.childBlocks_;
    a = [];
    for (var b = 0, c; c = this.inputList[b]; b++) c.connection && (c = c.connection.targetBlock()) && a.push(c);
    (b = this.getNextBlock()) && a.push(b);
    return a
};
Blockly.Block.prototype.setParent = function(a) {
    if (a != this.parentBlock_) {
        if (this.parentBlock_) {
            Blockly.utils.arrayRemove(this.parentBlock_.childBlocks_, this);
            if (this.previousConnection && this.previousConnection.isConnected()) throw Error("Still connected to previous block.");
            if (this.outputConnection && this.outputConnection.isConnected()) throw Error("Still connected to parent block.");
            this.parentBlock_ = null
        } else this.workspace.removeTopBlock(this);
        (this.parentBlock_ = a) ? a.childBlocks_.push(this): this.workspace.addTopBlock(this)
    }
};
Blockly.Block.prototype.getDescendants = function(a) { for (var b = [this], c = this.getChildren(a), d, e = 0; d = c[e]; e++) b.push.apply(b, d.getDescendants(a)); return b };
Blockly.Block.prototype.isDeletable = function() { return this.deletable_ && !this.isShadow_ && !(this.workspace && this.workspace.options.readOnly) };
Blockly.Block.prototype.setDeletable = function(a) { this.deletable_ = a };
Blockly.Block.prototype.isMovable = function() { return this.movable_ && !this.isShadow_ && !(this.workspace && this.workspace.options.readOnly) };
Blockly.Block.prototype.setMovable = function(a) { this.movable_ = a };
Blockly.Block.prototype.isDuplicatable = function() { return this.workspace.hasBlockLimits() ? this.workspace.isCapacityAvailable(Blockly.utils.getBlockTypeCounts(this, !0)) : !0 };
Blockly.Block.prototype.isShadow = function() { return this.isShadow_ };
Blockly.Block.prototype.setShadow = function(a) { this.isShadow_ = a };
Blockly.Block.prototype.isInsertionMarker = function() { return this.isInsertionMarker_ };
Blockly.Block.prototype.setInsertionMarker = function(a) { this.isInsertionMarker_ = a };
Blockly.Block.prototype.isEditable = function() { return this.editable_ && !(this.workspace && this.workspace.options.readOnly) };
Blockly.Block.prototype.setEditable = function(a) {
    this.editable_ = a;
    a = 0;
    for (var b; b = this.inputList[a]; a++)
        for (var c = 0, d; d = b.fieldRow[c]; c++) d.updateEditable()
};
Blockly.Block.prototype.isDisposed = function() { return this.disposed };
Blockly.Block.prototype.getMatchingConnection = function(a, b) {
    var c = this.getConnections_(!0);
    a = a.getConnections_(!0);
    if (c.length != a.length) throw Error("Connection lists did not match in length.");
    for (var d = 0; d < a.length; d++)
        if (a[d] == b) return c[d];
    return null
};
Blockly.Block.prototype.setHelpUrl = function(a) { this.helpUrl = a };
Blockly.Block.prototype.setTooltip = function(a) { this.tooltip = a };
Blockly.Block.prototype.getColour = function() { return this.colour_ };
Blockly.Block.prototype.getStyleName = function() { return this.styleName_ };
Blockly.Block.prototype.getHue = function() { return this.hue_ };
Blockly.Block.prototype.setColour = function(a) {
    a = Blockly.utils.parseBlockColour(a);
    this.hue_ = a.hue;
    this.colour_ = a.hex
};
Blockly.Block.prototype.setStyle = function(a) { this.styleName_ = a };
Blockly.Block.prototype.setOnChange = function(a) {
    if (a && "function" != typeof a) throw Error("onchange must be a function.");
    this.onchangeWrapper_ && this.workspace.removeChangeListener(this.onchangeWrapper_);
    if (this.onchange = a) this.onchangeWrapper_ = a.bind(this), this.workspace.addChangeListener(this.onchangeWrapper_)
};
Blockly.Block.prototype.getField = function(a) {
    for (var b = 0, c; c = this.inputList[b]; b++)
        for (var d = 0, e; e = c.fieldRow[d]; d++)
            if (e.name == a) return e;
    return null
};
Blockly.Block.prototype.getVars = function() {
    for (var a = [], b = 0, c; c = this.inputList[b]; b++)
        for (var d = 0, e; e = c.fieldRow[d]; d++) e.referencesVariables() && a.push(e.getValue());
    return a
};
Blockly.Block.prototype.getVarModels = function() {
    for (var a = [], b = 0, c; c = this.inputList[b]; b++)
        for (var d = 0, e; e = c.fieldRow[d]; d++) e.referencesVariables() && (e = this.workspace.getVariableById(e.getValue())) && a.push(e);
    return a
};
Blockly.Block.prototype.updateVarName = function(a) {
    for (var b = 0, c; c = this.inputList[b]; b++)
        for (var d = 0, e; e = c.fieldRow[d]; d++) e.referencesVariables() && a.getId() == e.getValue() && e.refreshVariableName()
};
Blockly.Block.prototype.renameVarById = function(a, b) {
    for (var c = 0, d; d = this.inputList[c]; c++)
        for (var e = 0, f; f = d.fieldRow[e]; e++) f.referencesVariables() && a == f.getValue() && f.setValue(b)
};
Blockly.Block.prototype.getFieldValue = function(a) { return (a = this.getField(a)) ? a.getValue() : null };
Blockly.Block.prototype.setFieldValue = function(a, b) {
    var c = this.getField(b);
    if (!c) throw Error('Field "' + b + '" not found.');
    c.setValue(a)
};
Blockly.Block.prototype.setPreviousStatement = function(a, b) {
    if (a) {
        void 0 === b && (b = null);
        if (!this.previousConnection) {
            if (this.outputConnection) throw Error("Remove output connection prior to adding previous connection.");
            this.previousConnection = this.makeConnection_(Blockly.PREVIOUS_STATEMENT)
        }
        this.previousConnection.setCheck(b)
    } else if (this.previousConnection) {
        if (this.previousConnection.isConnected()) throw Error("Must disconnect previous statement before removing connection.");
        this.previousConnection.dispose();
        this.previousConnection = null
    }
};
Blockly.Block.prototype.setNextStatement = function(a, b) {
    if (a) void 0 === b && (b = null), this.nextConnection || (this.nextConnection = this.makeConnection_(Blockly.NEXT_STATEMENT)), this.nextConnection.setCheck(b);
    else if (this.nextConnection) {
        if (this.nextConnection.isConnected()) throw Error("Must disconnect next statement before removing connection.");
        this.nextConnection.dispose();
        this.nextConnection = null
    }
};
Blockly.Block.prototype.setOutput = function(a, b) {
    if (a) {
        void 0 === b && (b = null);
        if (!this.outputConnection) {
            if (this.previousConnection) throw Error("Remove previous connection prior to adding output connection.");
            this.outputConnection = this.makeConnection_(Blockly.OUTPUT_VALUE)
        }
        this.outputConnection.setCheck(b)
    } else if (this.outputConnection) {
        if (this.outputConnection.isConnected()) throw Error("Must disconnect output value before removing connection.");
        this.outputConnection.dispose();
        this.outputConnection =
            null
    }
};
Blockly.Block.prototype.setInputsInline = function(a) { this.inputsInline != a && (Blockly.Events.fire(new Blockly.Events.BlockChange(this, "inline", null, this.inputsInline, a)), this.inputsInline = a) };
Blockly.Block.prototype.getInputsInline = function() {
    if (void 0 != this.inputsInline) return this.inputsInline;
    for (var a = 1; a < this.inputList.length; a++)
        if (this.inputList[a - 1].type == Blockly.DUMMY_INPUT && this.inputList[a].type == Blockly.DUMMY_INPUT) return !1;
    for (a = 1; a < this.inputList.length; a++)
        if (this.inputList[a - 1].type == Blockly.INPUT_VALUE && this.inputList[a].type == Blockly.DUMMY_INPUT) return !0;
    return !1
};
Blockly.Block.prototype.setOutputShape = function(a) { this.outputShape_ = a };
Blockly.Block.prototype.getOutputShape = function() { return this.outputShape_ };
Blockly.Block.prototype.setDisabled = function(a) {
    console.warn("Deprecated call to Blockly.Block.prototype.setDisabled, use Blockly.Block.prototype.setEnabled instead.");
    this.setEnabled(!a)
};
Blockly.Block.prototype.isEnabled = function() { return !this.disabled };
Blockly.Block.prototype.setEnabled = function(a) { this.isEnabled() != a && (Blockly.Events.fire(new Blockly.Events.BlockChange(this, "disabled", null, this.disabled, !a)), this.disabled = !a) };
Blockly.Block.prototype.getInheritedDisabled = function() {
    for (var a = this.getSurroundParent(); a;) {
        if (a.disabled) return !0;
        a = a.getSurroundParent()
    }
    return !1
};
Blockly.Block.prototype.isCollapsed = function() { return this.collapsed_ };
Blockly.Block.prototype.setCollapsed = function(a) { this.collapsed_ != a && (Blockly.Events.fire(new Blockly.Events.BlockChange(this, "collapsed", null, this.collapsed_, a)), this.collapsed_ = a) };
Blockly.Block.prototype.toString = function(a, b) {
    var c = [],
        d = b || "?";
    if (this.collapsed_) c.push(this.getInput("_TEMP_COLLAPSED_INPUT").fieldRow[0].getText());
    else
        for (var e = 0, f; f = this.inputList[e]; e++) {
            for (var g = 0, h; h = f.fieldRow[g]; g++) c.push(h.getText());
            f.connection && ((f = f.connection.targetBlock()) ? c.push(f.toString(void 0, b)) : c.push(d))
        }
    c = c.join(" ").trim() || "???";
    a && c.length > a && (c = c.substring(0, a - 3) + "...");
    return c
};
Blockly.Block.prototype.appendValueInput = function(a) { return this.appendInput_(Blockly.INPUT_VALUE, a) };
Blockly.Block.prototype.appendStatementInput = function(a) { return this.appendInput_(Blockly.NEXT_STATEMENT, a) };
Blockly.Block.prototype.appendDummyInput = function(a) { return this.appendInput_(Blockly.DUMMY_INPUT, a || "") };
Blockly.Block.prototype.jsonInit = function(a) {
    var b = a.type ? 'Block "' + a.type + '": ' : "";
    if (a.output && a.previousStatement) throw Error(b + "Must not have both an output and a previousStatement.");
    a.style && a.style.hat && (this.hat = a.style.hat, a.style = null);
    if (a.style && a.colour) throw Error(b + "Must not have both a colour and a style.");
    a.style ? this.jsonInitStyle_(a, b) : this.jsonInitColour_(a, b);
    for (var c = 0; void 0 !== a["message" + c];) this.interpolate_(a["message" + c], a["args" + c] || [], a["lastDummyAlign" + c], b), c++;
    void 0 !==
        a.inputsInline && this.setInputsInline(a.inputsInline);
    void 0 !== a.output && this.setOutput(!0, a.output);
    void 0 !== a.outputShape && this.setOutputShape(a.outputShape);
    void 0 !== a.previousStatement && this.setPreviousStatement(!0, a.previousStatement);
    void 0 !== a.nextStatement && this.setNextStatement(!0, a.nextStatement);
    void 0 !== a.tooltip && (c = a.tooltip, c = Blockly.utils.replaceMessageReferences(c), this.setTooltip(c));
    void 0 !== a.enableContextMenu && (c = a.enableContextMenu, this.contextMenu = !!c);
    void 0 !== a.helpUrl && (c =
        a.helpUrl, c = Blockly.utils.replaceMessageReferences(c), this.setHelpUrl(c));
    "string" == typeof a.extensions && (console.warn(b + "JSON attribute 'extensions' should be an array of strings. Found raw string in JSON for '" + a.type + "' block."), a.extensions = [a.extensions]);
    void 0 !== a.mutator && Blockly.Extensions.apply(a.mutator, this, !0);
    if (Array.isArray(a.extensions))
        for (a = a.extensions, b = 0; b < a.length; ++b) Blockly.Extensions.apply(a[b], this, !1)
};
Blockly.Block.prototype.jsonInitColour_ = function(a, b) {
    if ("colour" in a)
        if (void 0 === a.colour) console.warn(b + "Undefined colour value.");
        else { a = a.colour; try { this.setColour(a) } catch (c) { console.warn(b + "Illegal colour value: ", a) } }
};
Blockly.Block.prototype.jsonInitStyle_ = function(a, b) { a = a.style; try { this.setStyle(a) } catch (c) { console.warn(b + "Style does not exist: ", a) } };
Blockly.Block.prototype.mixin = function(a, b) {
    if (void 0 !== b && "boolean" != typeof b) throw Error("opt_disableCheck must be a boolean if provided");
    if (!b) { b = []; for (var c in a) void 0 !== this[c] && b.push(c); if (b.length) throw Error("Mixin will overwrite block members: " + JSON.stringify(b)); }
    Blockly.utils.object.mixin(this, a)
};
Blockly.Block.prototype.interpolate_ = function(a, b, c, d) {
    var e = Blockly.utils.tokenizeInterpolation(a),
        f = [],
        g = 0;
    a = [];
    for (var h = 0; h < e.length; h++) {
        var k = e[h];
        if ("number" == typeof k) {
            if (0 >= k || k > b.length) throw Error('Block "' + this.type + '": Message index %' + k + " out of range.");
            if (f[k]) throw Error('Block "' + this.type + '": Message index %' + k + " duplicated.");
            f[k] = !0;
            g++;
            a.push(b[k - 1])
        } else(k = k.trim()) && a.push(k)
    }
    if (g != b.length) throw Error('Block "' + this.type + '": Message does not reference all ' + b.length + " arg(s).");
    a.length && ("string" == typeof a[a.length - 1] || Blockly.utils.string.startsWith(a[a.length - 1].type, "field_")) && (h = { type: "input_dummy" }, c && (h.align = c), a.push(h));
    c = { LEFT: Blockly.ALIGN_LEFT, RIGHT: Blockly.ALIGN_RIGHT, CENTRE: Blockly.ALIGN_CENTRE, CENTER: Blockly.ALIGN_CENTRE };
    b = [];
    for (h = 0; h < a.length; h++)
        if (f = a[h], "string" == typeof f) b.push([f, void 0]);
        else {
            e = g = null;
            do
                if (k = !1, "string" == typeof f) g = new Blockly.FieldLabel(f);
                else switch (f.type) {
                    case "input_value":
                        e = this.appendValueInput(f.name);
                        break;
                    case "input_statement":
                        e =
                            this.appendStatementInput(f.name);
                        break;
                    case "input_dummy":
                        e = this.appendDummyInput(f.name);
                        break;
                    default:
                        g = Blockly.fieldRegistry.fromJson(f), !g && f.alt && (f = f.alt, k = !0)
                }
            while (k);
            if (g) b.push([g, f.name]);
            else if (e) {
                f.check && e.setCheck(f.check);
                f.align && (g = c[f.align.toUpperCase()], void 0 === g ? console.warn(d + "Illegal align value: ", f.align) : e.setAlign(g));
                for (f = 0; f < b.length; f++) e.appendField(b[f][0], b[f][1]);
                b.length = 0
            }
        }
};
Blockly.Block.prototype.appendInput_ = function(a, b) {
    var c = null;
    if (a == Blockly.INPUT_VALUE || a == Blockly.NEXT_STATEMENT) c = this.makeConnection_(a);
    a == Blockly.NEXT_STATEMENT && this.statementInputCount++;
    a = new Blockly.Input(a, b, this, c);
    this.inputList.push(a);
    return a
};
Blockly.Block.prototype.moveInputBefore = function(a, b) {
    if (a != b) {
        for (var c = -1, d = b ? -1 : this.inputList.length, e = 0, f; f = this.inputList[e]; e++)
            if (f.name == a) { if (c = e, -1 != d) break } else if (b && f.name == b && (d = e, -1 != c)) break;
        if (-1 == c) throw Error('Named input "' + a + '" not found.');
        if (-1 == d) throw Error('Reference input "' + b + '" not found.');
        this.moveNumberedInputBefore(c, d)
    }
};
Blockly.Block.prototype.moveNumberedInputBefore = function(a, b) {
    if (a == b) throw Error("Can't move input to itself.");
    if (a >= this.inputList.length) throw RangeError("Input index " + a + " out of bounds.");
    if (b > this.inputList.length) throw RangeError("Reference input " + b + " out of bounds.");
    var c = this.inputList[a];
    this.inputList.splice(a, 1);
    a < b && b--;
    this.inputList.splice(b, 0, c)
};
Blockly.Block.prototype.removeInput = function(a, b) {
    for (var c = 0, d; d = this.inputList[c]; c++)
        if (d.name == a) {
            d.type == Blockly.NEXT_STATEMENT && this.statementInputCount--;
            d.dispose();
            this.inputList.splice(c, 1);
            return
        }
    if (!b) throw Error("Input not found: " + a);
};
Blockly.Block.prototype.getInput = function(a) {
    for (var b = 0, c; c = this.inputList[b]; b++)
        if (c.name == a) return c;
    return null
};
Blockly.Block.prototype.getInputTargetBlock = function(a) { return (a = this.getInput(a)) && a.connection && a.connection.targetBlock() };
Blockly.Block.prototype.getCommentText = function() { return this.commentModel.text };
Blockly.Block.prototype.setCommentText = function(a) { this.commentModel.text != a && (Blockly.Events.fire(new Blockly.Events.BlockChange(this, "comment", null, this.commentModel.text, a)), this.comment = this.commentModel.text = a) };
Blockly.Block.prototype.setWarningText = function(a, b) {};
Blockly.Block.prototype.setMutator = function(a) {};
Blockly.Block.prototype.getRelativeToSurfaceXY = function() { return this.xy_ };
Blockly.Block.prototype.moveBy = function(a, b) {
    if (this.parentBlock_) throw Error("Block has parent.");
    var c = new Blockly.Events.BlockMove(this);
    this.xy_.translate(a, b);
    c.recordNew();
    Blockly.Events.fire(c)
};
Blockly.Block.prototype.makeConnection_ = function(a) { return new Blockly.Connection(this, a) };
Blockly.Block.prototype.allInputsFilled = function(a) {
    void 0 === a && (a = !0);
    if (!a && this.isShadow()) return !1;
    for (var b = 0, c; c = this.inputList[b]; b++)
        if (c.connection && (c = c.connection.targetBlock(), !c || !c.allInputsFilled(a))) return !1;
    return (b = this.getNextBlock()) ? b.allInputsFilled(a) : !0
};
Blockly.Block.prototype.toDevString = function() {
    var a = this.type ? '"' + this.type + '" block' : "Block";
    this.id && (a += ' (id="' + this.id + '")');
    return a
};
Blockly.blockRendering = {};
Blockly.blockRendering.IPathObject = function(a, b) {};
Blockly.utils.aria = {};
Blockly.utils.aria.ARIA_PREFIX_ = "aria-";
Blockly.utils.aria.ROLE_ATTRIBUTE_ = "role";
Blockly.utils.aria.Role = { GRID: "grid", GRIDCELL: "gridcell", GROUP: "group", LISTBOX: "listbox", MENU: "menu", MENUITEM: "menuitem", MENUITEMCHECKBOX: "menuitemcheckbox", OPTION: "option", PRESENTATION: "presentation", ROW: "row", TREE: "tree", TREEITEM: "treeitem" };
Blockly.utils.aria.State = { ACTIVEDESCENDANT: "activedescendant", COLCOUNT: "colcount", EXPANDED: "expanded", INVALID: "invalid", LABEL: "label", LABELLEDBY: "labelledby", LEVEL: "level", ORIENTATION: "orientation", POSINSET: "posinset", ROWCOUNT: "rowcount", SELECTED: "selected", SETSIZE: "setsize", VALUEMAX: "valuemax", VALUEMIN: "valuemin" };
Blockly.utils.aria.setRole = function(a, b) { a.setAttribute(Blockly.utils.aria.ROLE_ATTRIBUTE_, b) };
Blockly.utils.aria.setState = function(a, b, c) {
    Array.isArray(c) && (c = c.join(" "));
    a.setAttribute(Blockly.utils.aria.ARIA_PREFIX_ + b, c)
};
Blockly.Menu = function() {
    Blockly.Component.call(this);
    this.openingCoords = null;
    this.highlightedIndex_ = -1;
    this.onKeyDownWrapper_ = this.mouseLeaveHandler_ = this.mouseEnterHandler_ = this.clickHandler_ = this.mouseOverHandler_ = null
};
Blockly.utils.object.inherits(Blockly.Menu, Blockly.Component);
Blockly.Menu.prototype.createDom = function() {
    var a = document.createElement("div");
    a.id = this.getId();
    this.setElementInternal(a);
    a.className = "goog-menu goog-menu-vertical blocklyNonSelectable";
    a.tabIndex = 0;
    Blockly.utils.aria.setRole(a, this.roleName_ || Blockly.utils.aria.Role.MENU)
};
Blockly.Menu.prototype.focus = function() {
    var a = this.getElement();
    a && (a.focus({ preventScroll: !0 }), Blockly.utils.dom.addClass(a, "focused"))
};
Blockly.Menu.prototype.blur = function() {
    var a = this.getElement();
    a && (a.blur(), Blockly.utils.dom.removeClass(a, "focused"))
};
Blockly.Menu.prototype.setRole = function(a) { this.roleName_ = a };
Blockly.Menu.prototype.enterDocument = function() {
    Blockly.Menu.superClass_.enterDocument.call(this);
    this.forEachChild(function(a) { a.isInDocument() && this.registerChildId_(a) }, this);
    this.attachEvents_()
};
Blockly.Menu.prototype.exitDocument = function() {
    this.setHighlightedIndex(-1);
    Blockly.Menu.superClass_.exitDocument.call(this)
};
Blockly.Menu.prototype.disposeInternal = function() {
    Blockly.Menu.superClass_.disposeInternal.call(this);
    this.detachEvents_()
};
Blockly.Menu.prototype.attachEvents_ = function() {
    var a = this.getElement();
    this.mouseOverHandler_ = Blockly.bindEventWithChecks_(a, "mouseover", this, this.handleMouseOver_, !0);
    this.clickHandler_ = Blockly.bindEventWithChecks_(a, "click", this, this.handleClick_, !0);
    this.mouseEnterHandler_ = Blockly.bindEventWithChecks_(a, "mouseenter", this, this.handleMouseEnter_, !0);
    this.mouseLeaveHandler_ = Blockly.bindEventWithChecks_(a, "mouseleave", this, this.handleMouseLeave_, !0);
    this.onKeyDownWrapper_ = Blockly.bindEventWithChecks_(a,
        "keydown", this, this.handleKeyEvent)
};
Blockly.Menu.prototype.detachEvents_ = function() {
    this.mouseOverHandler_ && (Blockly.unbindEvent_(this.mouseOverHandler_), this.mouseOverHandler_ = null);
    this.clickHandler_ && (Blockly.unbindEvent_(this.clickHandler_), this.clickHandler_ = null);
    this.mouseEnterHandler_ && (Blockly.unbindEvent_(this.mouseEnterHandler_), this.mouseEnterHandler_ = null);
    this.mouseLeaveHandler_ && (Blockly.unbindEvent_(this.mouseLeaveHandler_), this.mouseLeaveHandler_ = null);
    this.onKeyDownWrapper_ && (Blockly.unbindEvent_(this.onKeyDownWrapper_), this.onKeyDownWrapper_ =
        null)
};
Blockly.Menu.prototype.childElementIdMap_ = null;
Blockly.Menu.prototype.registerChildId_ = function(a) {
    var b = a.getElement();
    b = b.id || (b.id = a.getId());
    this.childElementIdMap_ || (this.childElementIdMap_ = {});
    this.childElementIdMap_[b] = a
};
Blockly.Menu.prototype.getMenuItem = function(a) {
    if (this.childElementIdMap_)
        for (var b = this.getElement(); a && a !== b;) {
            var c = a.id;
            if (c in this.childElementIdMap_) return this.childElementIdMap_[c];
            a = a.parentNode
        }
    return null
};
Blockly.Menu.prototype.unhighlightCurrent = function() {
    var a = this.getHighlighted();
    a && a.setHighlighted(!1)
};
Blockly.Menu.prototype.clearHighlighted = function() {
    this.unhighlightCurrent();
    this.setHighlightedIndex(-1)
};
Blockly.Menu.prototype.getHighlighted = function() { return this.getChildAt(this.highlightedIndex_) };
Blockly.Menu.prototype.setHighlightedIndex = function(a) {
    var b = this.getChildAt(a);
    b ? (b.setHighlighted(!0), this.highlightedIndex_ = a) : -1 < this.highlightedIndex_ && (this.getHighlighted().setHighlighted(!1), this.highlightedIndex_ = -1);
    b && Blockly.utils.style.scrollIntoContainerView(b.getElement(), this.getElement())
};
Blockly.Menu.prototype.setHighlighted = function(a) { this.setHighlightedIndex(this.indexOfChild(a)) };
Blockly.Menu.prototype.highlightNext = function() {
    this.unhighlightCurrent();
    this.highlightHelper(function(a, b) { return (a + 1) % b }, this.highlightedIndex_)
};
Blockly.Menu.prototype.highlightPrevious = function() {
    this.unhighlightCurrent();
    this.highlightHelper(function(a, b) { a--; return 0 > a ? b - 1 : a }, this.highlightedIndex_)
};
Blockly.Menu.prototype.highlightHelper = function(a, b) {
    b = 0 > b ? -1 : b;
    var c = this.getChildCount();
    b = a.call(this, b, c);
    for (var d = 0; d <= c;) {
        var e = this.getChildAt(b);
        if (e && this.canHighlightItem(e)) return this.setHighlightedIndex(b), !0;
        d++;
        b = a.call(this, b, c)
    }
    return !1
};
Blockly.Menu.prototype.canHighlightItem = function(a) { return a.isEnabled() };
Blockly.Menu.prototype.handleMouseOver_ = function(a) { if (a = this.getMenuItem(a.target)) a.isEnabled() ? this.getHighlighted() !== a && (this.unhighlightCurrent(), this.setHighlighted(a)) : this.unhighlightCurrent() };
Blockly.Menu.prototype.handleClick_ = function(a) {
    var b = this.openingCoords;
    this.openingCoords = null;
    if (b && "number" === typeof a.clientX) { var c = new Blockly.utils.Coordinate(a.clientX, a.clientY); if (1 > Blockly.utils.Coordinate.distance(b, c)) return }(b = this.getMenuItem(a.target)) && b.handleClick(a) && a.preventDefault()
};
Blockly.Menu.prototype.handleMouseEnter_ = function(a) { this.focus() };
Blockly.Menu.prototype.handleMouseLeave_ = function(a) { this.getElement() && (this.blur(), this.clearHighlighted()) };
Blockly.Menu.prototype.handleKeyEvent = function(a) { return 0 != this.getChildCount() && this.handleKeyEventInternal(a) ? (a.preventDefault(), a.stopPropagation(), !0) : !1 };
Blockly.Menu.prototype.handleKeyEventInternal = function(a) {
    var b = this.getHighlighted();
    if (b && "function" == typeof b.handleKeyEvent && b.handleKeyEvent(a)) return !0;
    if (a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) return !1;
    switch (a.keyCode) {
        case Blockly.utils.KeyCodes.ENTER:
            b && b.performActionInternal(a);
            break;
        case Blockly.utils.KeyCodes.UP:
            this.highlightPrevious();
            break;
        case Blockly.utils.KeyCodes.DOWN:
            this.highlightNext();
            break;
        default:
            return !1
    }
    return !0
};
Blockly.MenuItem = function(a, b) {
    Blockly.Component.call(this);
    this.setContentInternal(a);
    this.setValue(b);
    this.enabled_ = !0
};
Blockly.utils.object.inherits(Blockly.MenuItem, Blockly.Component);
Blockly.MenuItem.prototype.createDom = function() {
    var a = document.createElement("div");
    a.id = this.getId();
    this.setElementInternal(a);
    a.className = "goog-menuitem goog-option " + (this.enabled_ ? "" : "goog-menuitem-disabled ") + (this.checked_ ? "goog-option-selected " : "") + (this.rightToLeft_ ? "goog-menuitem-rtl " : "");
    var b = this.getContentWrapperDom();
    a.appendChild(b);
    var c = this.getCheckboxDom();
    c && b.appendChild(c);
    b.appendChild(this.getContentDom());
    Blockly.utils.aria.setRole(a, this.roleName_ || (this.checkable_ ? Blockly.utils.aria.Role.MENUITEMCHECKBOX :
        Blockly.utils.aria.Role.MENUITEM));
    Blockly.utils.aria.setState(a, Blockly.utils.aria.State.SELECTED, this.checkable_ && this.checked_ || !1)
};
Blockly.MenuItem.prototype.getCheckboxDom = function() {
    if (!this.checkable_) return null;
    var a = document.createElement("div");
    a.className = "goog-menuitem-checkbox";
    return a
};
Blockly.MenuItem.prototype.getContentDom = function() { var a = this.content_; "string" === typeof a && (a = document.createTextNode(a)); return a };
Blockly.MenuItem.prototype.getContentWrapperDom = function() {
    var a = document.createElement("div");
    a.className = "goog-menuitem-content";
    return a
};
Blockly.MenuItem.prototype.setContentInternal = function(a) { this.content_ = a };
Blockly.MenuItem.prototype.setValue = function(a) { this.value_ = a };
Blockly.MenuItem.prototype.getValue = function() { return this.value_ };
Blockly.MenuItem.prototype.setRole = function(a) { this.roleName_ = a };
Blockly.MenuItem.prototype.setCheckable = function(a) { this.checkable_ = a };
Blockly.MenuItem.prototype.setChecked = function(a) {
    if (this.checkable_) {
        this.checked_ = a;
        var b = this.getElement();
        b && this.isEnabled() && (a ? (Blockly.utils.dom.addClass(b, "goog-option-selected"), Blockly.utils.aria.setState(b, Blockly.utils.aria.State.SELECTED, !0)) : (Blockly.utils.dom.removeClass(b, "goog-option-selected"), Blockly.utils.aria.setState(b, Blockly.utils.aria.State.SELECTED, !1)))
    }
};
Blockly.MenuItem.prototype.setHighlighted = function(a) {
    this.highlight_ = a;
    var b = this.getElement();
    b && this.isEnabled() && (a ? Blockly.utils.dom.addClass(b, "goog-menuitem-highlight") : Blockly.utils.dom.removeClass(b, "goog-menuitem-highlight"))
};
Blockly.MenuItem.prototype.isEnabled = function() { return this.enabled_ };
Blockly.MenuItem.prototype.setEnabled = function(a) {
    this.enabled_ = a;
    (a = this.getElement()) && (this.enabled_ ? Blockly.utils.dom.removeClass(a, "goog-menuitem-disabled") : Blockly.utils.dom.addClass(a, "goog-menuitem-disabled"))
};
Blockly.MenuItem.prototype.handleClick = function(a) { this.isEnabled() && (this.setHighlighted(!0), this.performActionInternal()) };
Blockly.MenuItem.prototype.performActionInternal = function() {
    this.checkable_ && this.setChecked(!this.checked_);
    this.actionHandler_ && this.actionHandler_.call(this.actionHandlerObj_, this)
};
Blockly.MenuItem.prototype.onAction = function(a, b) {
    this.actionHandler_ = a;
    this.actionHandlerObj_ = b
};
Blockly.utils.uiMenu = {};
Blockly.utils.uiMenu.getSize = function(a) {
    a = a.getElement();
    var b = Blockly.utils.style.getSize(a);
    b.height = a.scrollHeight;
    return b
};
Blockly.utils.uiMenu.adjustBBoxesForRTL = function(a, b, c) {
    b.left += c.width;
    b.right += c.width;
    a.left += c.width;
    a.right += c.width
};
Blockly.ContextMenu = {};
Blockly.ContextMenu.currentBlock = null;
Blockly.ContextMenu.eventWrapper_ = null;
Blockly.ContextMenu.show = function(a, b, c) {
    Blockly.WidgetDiv.show(Blockly.ContextMenu, c, null);
    if (b.length) {
        var d = Blockly.ContextMenu.populate_(b, c);
        Blockly.ContextMenu.position_(d, a, c);
        setTimeout(function() { d.getElement().focus() }, 1);
        Blockly.ContextMenu.currentBlock = null
    } else Blockly.ContextMenu.hide()
};
Blockly.ContextMenu.populate_ = function(a, b) {
    var c = new Blockly.Menu;
    c.setRightToLeft(b);
    for (var d = 0, e; e = a[d]; d++) {
        var f = new Blockly.MenuItem(e.text);
        f.setRightToLeft(b);
        c.addChild(f, !0);
        f.setEnabled(e.enabled);
        if (e.enabled) f.onAction(function() {
            Blockly.ContextMenu.hide();
            this.callback()
        }, e)
    }
    return c
};
Blockly.ContextMenu.position_ = function(a, b, c) {
    var d = Blockly.utils.getViewportBBox();
    b = { top: b.clientY + d.top, bottom: b.clientY + d.top, left: b.clientX + d.left, right: b.clientX + d.left };
    Blockly.ContextMenu.createWidget_(a);
    var e = Blockly.utils.uiMenu.getSize(a);
    c && Blockly.utils.uiMenu.adjustBBoxesForRTL(d, b, e);
    Blockly.WidgetDiv.positionWithAnchor(d, b, e, c);
    a.getElement().focus()
};
Blockly.ContextMenu.createWidget_ = function(a) {
    a.render(Blockly.WidgetDiv.DIV);
    var b = a.getElement();
    Blockly.utils.dom.addClass(b, "blocklyContextMenu");
    Blockly.bindEventWithChecks_(b, "contextmenu", null, Blockly.utils.noEvent);
    a.focus()
};
Blockly.ContextMenu.hide = function() {
    Blockly.WidgetDiv.hideIfOwner(Blockly.ContextMenu);
    Blockly.ContextMenu.currentBlock = null;
    Blockly.ContextMenu.eventWrapper_ && (Blockly.unbindEvent_(Blockly.ContextMenu.eventWrapper_), Blockly.ContextMenu.eventWrapper_ = null)
};
Blockly.ContextMenu.callbackFactory = function(a, b) {
    return function() {
        Blockly.Events.disable();
        try {
            var c = Blockly.Xml.domToBlock(b, a.workspace),
                d = a.getRelativeToSurfaceXY();
            d.x = a.RTL ? d.x - Blockly.SNAP_RADIUS : d.x + Blockly.SNAP_RADIUS;
            d.y += 2 * Blockly.SNAP_RADIUS;
            c.moveBy(d.x, d.y)
        } finally { Blockly.Events.enable() }
        Blockly.Events.isEnabled() && !c.isShadow() && Blockly.Events.fire(new Blockly.Events.BlockCreate(c));
        c.select()
    }
};
Blockly.ContextMenu.blockDeleteOption = function(a) {
    var b = a.getDescendants(!1).length,
        c = a.getNextBlock();
    c && (b -= c.getDescendants(!1).length);
    return {
        text: 1 == b ? Blockly.Msg.DELETE_BLOCK : Blockly.Msg.DELETE_X_BLOCKS.replace("%1", String(b)),
        enabled: !0,
        callback: function() {
            Blockly.Events.setGroup(!0);
            a.dispose(!0, !0);
            Blockly.Events.setGroup(!1)
        }
    }
};
Blockly.ContextMenu.blockHelpOption = function(a) { return { enabled: !("function" == typeof a.helpUrl ? !a.helpUrl() : !a.helpUrl), text: Blockly.Msg.HELP, callback: function() { a.showHelp() } } };
Blockly.ContextMenu.blockDuplicateOption = function(a) { var b = a.isDuplicatable(); return { text: Blockly.Msg.DUPLICATE_BLOCK, enabled: b, callback: function() { Blockly.duplicate(a) } } };
Blockly.ContextMenu.blockCommentOption = function(a) {
    var b = { enabled: !Blockly.utils.userAgent.IE };
    a.getCommentIcon() ? (b.text = Blockly.Msg.REMOVE_COMMENT, b.callback = function() { a.setCommentText(null) }) : (b.text = Blockly.Msg.ADD_COMMENT, b.callback = function() { a.setCommentText("") });
    return b
};
Blockly.ContextMenu.commentDeleteOption = function(a) {
    return {
        text: Blockly.Msg.REMOVE_COMMENT,
        enabled: !0,
        callback: function() {
            Blockly.Events.setGroup(!0);
            a.dispose(!0, !0);
            Blockly.Events.setGroup(!1)
        }
    }
};
Blockly.ContextMenu.commentDuplicateOption = function(a) { return { text: Blockly.Msg.DUPLICATE_COMMENT, enabled: !0, callback: function() { Blockly.duplicate(a) } } };
Blockly.ContextMenu.workspaceCommentOption = function(a, b) {
    if (!Blockly.WorkspaceCommentSvg) throw Error("Missing require for Blockly.WorkspaceCommentSvg");
    var c = { enabled: !Blockly.utils.userAgent.IE };
    c.text = Blockly.Msg.ADD_COMMENT;
    c.callback = function() {
        var c = new Blockly.WorkspaceCommentSvg(a, Blockly.Msg.WORKSPACE_COMMENT_DEFAULT_TEXT, Blockly.WorkspaceCommentSvg.DEFAULT_SIZE, Blockly.WorkspaceCommentSvg.DEFAULT_SIZE),
            e = a.getInjectionDiv().getBoundingClientRect();
        e = new Blockly.utils.Coordinate(b.clientX -
            e.left, b.clientY - e.top);
        var f = a.getOriginOffsetInPixels();
        e = Blockly.utils.Coordinate.difference(e, f);
        e.scale(1 / a.scale);
        c.moveBy(e.x, e.y);
        a.rendered && (c.initSvg(), c.render(), c.select())
    };
    return c
};
Blockly.RenderedConnection = function(a, b) {
    Blockly.RenderedConnection.superClass_.constructor.call(this, a, b);
    this.db_ = a.workspace.connectionDBList[b];
    this.dbOpposite_ = a.workspace.connectionDBList[Blockly.OPPOSITE_TYPE[b]];
    this.offsetInBlock_ = new Blockly.utils.Coordinate(0, 0);
    this.trackedState_ = Blockly.RenderedConnection.TrackedState.WILL_TRACK
};
Blockly.utils.object.inherits(Blockly.RenderedConnection, Blockly.Connection);
Blockly.RenderedConnection.TrackedState = { WILL_TRACK: -1, UNTRACKED: 0, TRACKED: 1 };
Blockly.RenderedConnection.prototype.dispose = function() {
    Blockly.RenderedConnection.superClass_.dispose.call(this);
    this.trackedState_ == Blockly.RenderedConnection.TrackedState.TRACKED && this.db_.removeConnection(this, this.y)
};
Blockly.RenderedConnection.prototype.getSourceBlock = function() { return Blockly.RenderedConnection.superClass_.getSourceBlock.call(this) };
Blockly.RenderedConnection.prototype.targetBlock = function() { return Blockly.RenderedConnection.superClass_.targetBlock.call(this) };
Blockly.RenderedConnection.prototype.distanceFrom = function(a) {
    var b = this.x - a.x;
    a = this.y - a.y;
    return Math.sqrt(b * b + a * a)
};
Blockly.RenderedConnection.prototype.bumpAwayFrom = function(a) {
    if (!this.sourceBlock_.workspace.isDragging()) {
        var b = this.sourceBlock_.getRootBlock();
        if (!b.isInFlyout) {
            var c = !1;
            if (!b.isMovable()) {
                b = a.getSourceBlock().getRootBlock();
                if (!b.isMovable()) return;
                a = this;
                c = !0
            }
            var d = Blockly.selected == b;
            d || b.addSelect();
            var e = a.x + Blockly.SNAP_RADIUS + Math.floor(Math.random() * Blockly.BUMP_RANDOMNESS) - this.x,
                f = a.y + Blockly.SNAP_RADIUS + Math.floor(Math.random() * Blockly.BUMP_RANDOMNESS) - this.y;
            c && (f = -f);
            b.RTL && (e = a.x -
                Blockly.SNAP_RADIUS - Math.floor(Math.random() * Blockly.BUMP_RANDOMNESS) - this.x);
            b.moveBy(e, f);
            d || b.removeSelect()
        }
    }
};
Blockly.RenderedConnection.prototype.moveTo = function(a, b) {
    this.trackedState_ == Blockly.RenderedConnection.TrackedState.WILL_TRACK ? (this.db_.addConnection(this, b), this.trackedState_ = Blockly.RenderedConnection.TrackedState.TRACKED) : this.trackedState_ == Blockly.RenderedConnection.TrackedState.TRACKED && (this.db_.removeConnection(this, this.y), this.db_.addConnection(this, b));
    this.x = a;
    this.y = b
};
Blockly.RenderedConnection.prototype.moveBy = function(a, b) { this.moveTo(this.x + a, this.y + b) };
Blockly.RenderedConnection.prototype.moveToOffset = function(a) { this.moveTo(a.x + this.offsetInBlock_.x, a.y + this.offsetInBlock_.y) };
Blockly.RenderedConnection.prototype.setOffsetInBlock = function(a, b) {
    this.offsetInBlock_.x = a;
    this.offsetInBlock_.y = b
};
Blockly.RenderedConnection.prototype.getOffsetInBlock = function() { return this.offsetInBlock_ };
Blockly.RenderedConnection.prototype.tighten = function() {
    var a = this.targetConnection.x - this.x,
        b = this.targetConnection.y - this.y;
    if (0 != a || 0 != b) {
        var c = this.targetBlock(),
            d = c.getSvgRoot();
        if (!d) throw Error("block is not rendered.");
        d = Blockly.utils.getRelativeXY(d);
        c.getSvgRoot().setAttribute("transform", "translate(" + (d.x - a) + "," + (d.y - b) + ")");
        c.moveConnections(-a, -b)
    }
};
Blockly.RenderedConnection.prototype.closest = function(a, b) { return this.dbOpposite_.searchForClosest(this, a, b) };
Blockly.RenderedConnection.prototype.highlight = function() {
    var a = this.sourceBlock_.workspace.getRenderer().getConstants();
    var b = a.shapeFor(this);
    this.type == Blockly.INPUT_VALUE || this.type == Blockly.OUTPUT_VALUE ? (a = a.TAB_OFFSET_FROM_TOP, b = Blockly.utils.svgPaths.moveBy(0, -a) + Blockly.utils.svgPaths.lineOnAxis("v", a) + b.pathDown + Blockly.utils.svgPaths.lineOnAxis("v", a)) : (a = a.NOTCH_OFFSET_LEFT - a.CORNER_RADIUS, b = Blockly.utils.svgPaths.moveBy(-a, 0) + Blockly.utils.svgPaths.lineOnAxis("h", a) + b.pathLeft + Blockly.utils.svgPaths.lineOnAxis("h",
        a));
    a = this.sourceBlock_.getRelativeToSurfaceXY();
    Blockly.Connection.highlightedPath_ = Blockly.utils.dom.createSvgElement("path", { "class": "blocklyHighlightedConnectionPath", d: b, transform: "translate(" + (this.x - a.x) + "," + (this.y - a.y) + ")" + (this.sourceBlock_.RTL ? " scale(-1 1)" : "") }, this.sourceBlock_.getSvgRoot())
};
Blockly.RenderedConnection.prototype.unhighlight = function() {
    Blockly.utils.dom.removeNode(Blockly.Connection.highlightedPath_);
    delete Blockly.Connection.highlightedPath_
};
Blockly.RenderedConnection.prototype.setTracking = function(a) { a && this.trackedState_ == Blockly.RenderedConnection.TrackedState.TRACKED || !a && this.trackedState_ == Blockly.RenderedConnection.TrackedState.UNTRACKED || this.sourceBlock_.isInFlyout || (a ? (this.db_.addConnection(this, this.y), this.trackedState_ = Blockly.RenderedConnection.TrackedState.TRACKED) : (this.trackedState_ == Blockly.RenderedConnection.TrackedState.TRACKED && this.db_.removeConnection(this, this.y), this.trackedState_ = Blockly.RenderedConnection.TrackedState.UNTRACKED)) };
Blockly.RenderedConnection.prototype.stopTrackingAll = function() {
    this.setTracking(!1);
    if (this.targetConnection)
        for (var a = this.targetBlock().getDescendants(!1), b = 0; b < a.length; b++) {
            for (var c = a[b], d = c.getConnections_(!0), e = 0; e < d.length; e++) d[e].setTracking(!1);
            c = c.getIcons();
            for (e = 0; e < c.length; e++) c[e].setVisible(!1)
        }
};
Blockly.RenderedConnection.prototype.startTrackingAll = function() {
    this.setTracking(!0);
    var a = [];
    if (this.type != Blockly.INPUT_VALUE && this.type != Blockly.NEXT_STATEMENT) return a;
    var b = this.targetBlock();
    if (b) {
        if (b.isCollapsed()) {
            var c = [];
            b.outputConnection && c.push(b.outputConnection);
            b.nextConnection && c.push(b.nextConnection);
            b.previousConnection && c.push(b.previousConnection)
        } else c = b.getConnections_(!0);
        for (var d = 0; d < c.length; d++) a.push.apply(a, c[d].startTrackingAll());
        a.length || (a[0] = b)
    }
    return a
};
Blockly.RenderedConnection.prototype.isConnectionAllowed = function(a, b) { return this.distanceFrom(a) > b ? !1 : Blockly.RenderedConnection.superClass_.isConnectionAllowed.call(this, a) };
Blockly.RenderedConnection.prototype.onFailedConnect = function(a) { this.bumpAwayFrom(a) };
Blockly.RenderedConnection.prototype.disconnectInternal_ = function(a, b) {
    Blockly.RenderedConnection.superClass_.disconnectInternal_.call(this, a, b);
    a.rendered && a.render();
    b.rendered && (b.updateDisabled(), b.render())
};
Blockly.RenderedConnection.prototype.respawnShadow_ = function() {
    var a = this.getSourceBlock(),
        b = this.getShadowDom();
    if (a.workspace && b && Blockly.Events.recordUndo) {
        Blockly.RenderedConnection.superClass_.respawnShadow_.call(this);
        b = this.targetBlock();
        if (!b) throw Error("Couldn't respawn the shadow block that should exist here.");
        b.initSvg();
        b.render(!1);
        a.rendered && a.render()
    }
};
Blockly.RenderedConnection.prototype.neighbours = function(a) { return this.dbOpposite_.getNeighbours(this, a) };
Blockly.RenderedConnection.prototype.connect_ = function(a) {
    Blockly.RenderedConnection.superClass_.connect_.call(this, a);
    var b = this.getSourceBlock();
    a = a.getSourceBlock();
    b.rendered && b.updateDisabled();
    a.rendered && a.updateDisabled();
    b.rendered && a.rendered && (this.type == Blockly.NEXT_STATEMENT || this.type == Blockly.PREVIOUS_STATEMENT ? a.render() : b.render())
};
Blockly.RenderedConnection.prototype.onCheckChanged_ = function() {!this.isConnected() || this.targetConnection && this.checkType(this.targetConnection) || ((this.isSuperior() ? this.targetBlock() : this.sourceBlock_).unplug(), this.sourceBlock_.bumpNeighbours()) };
Blockly.Marker = function() {
    this.drawer_ = this.curNode_ = this.colour = null;
    this.type = "marker"
};
Blockly.Marker.prototype.setDrawer = function(a) { this.drawer_ = a };
Blockly.Marker.prototype.getDrawer = function() { return this.drawer_ };
Blockly.Marker.prototype.getCurNode = function() { return this.curNode_ };
Blockly.Marker.prototype.setCurNode = function(a) {
    var b = this.curNode_;
    this.curNode_ = a;
    this.drawer_ && this.drawer_.draw(b, this.curNode_)
};
Blockly.Marker.prototype.draw = function() { this.drawer_ && this.drawer_.draw(this.curNode_, this.curNode_) };
Blockly.Marker.prototype.hide = function() { this.drawer_ && this.drawer_.hide() };
Blockly.Marker.prototype.dispose = function() { this.getDrawer() && this.getDrawer().dispose() };
Blockly.Cursor = function() {
    Blockly.Cursor.superClass_.constructor.call(this);
    this.type = "cursor"
};
Blockly.utils.object.inherits(Blockly.Cursor, Blockly.Marker);
Blockly.Cursor.prototype.next = function() {
    var a = this.getCurNode();
    if (!a) return null;
    for (a = a.next(); a && a.next() && (a.getType() == Blockly.ASTNode.types.NEXT || a.getType() == Blockly.ASTNode.types.BLOCK);) a = a.next();
    a && this.setCurNode(a);
    return a
};
Blockly.Cursor.prototype.in = function() {
    var a = this.getCurNode();
    if (!a) return null;
    if (a.getType() == Blockly.ASTNode.types.PREVIOUS || a.getType() == Blockly.ASTNode.types.OUTPUT) a = a.next();
    (a = a.in()) && this.setCurNode(a);
    return a
};
Blockly.Cursor.prototype.prev = function() {
    var a = this.getCurNode();
    if (!a) return null;
    for (a = a.prev(); a && a.prev() && (a.getType() == Blockly.ASTNode.types.NEXT || a.getType() == Blockly.ASTNode.types.BLOCK);) a = a.prev();
    a && this.setCurNode(a);
    return a
};
Blockly.Cursor.prototype.out = function() {
    var a = this.getCurNode();
    if (!a) return null;
    (a = a.out()) && a.getType() == Blockly.ASTNode.types.BLOCK && (a = a.prev() || a);
    a && this.setCurNode(a);
    return a
};
Blockly.Cursor.prototype.onBlocklyAction = function(a) {
    if (this.getCurNode() && this.getCurNode().getType() === Blockly.ASTNode.types.FIELD && this.getCurNode().getLocation().onBlocklyAction(a)) return !0;
    switch (a.name) {
        case Blockly.navigation.actionNames.PREVIOUS:
            return this.prev(), !0;
        case Blockly.navigation.actionNames.OUT:
            return this.out(), !0;
        case Blockly.navigation.actionNames.NEXT:
            return this.next(), !0;
        case Blockly.navigation.actionNames.IN:
            return this.in(), !0;
        default:
            return !1
    }
};
Blockly.BasicCursor = function() { Blockly.BasicCursor.superClass_.constructor.call(this) };
Blockly.utils.object.inherits(Blockly.BasicCursor, Blockly.Cursor);
Blockly.BasicCursor.prototype.next = function() {
    var a = this.getCurNode();
    if (!a) return null;
    (a = this.getNextNode_(a, this.validNode_)) && this.setCurNode(a);
    return a
};
Blockly.BasicCursor.prototype.in = function() { return this.next() };
Blockly.BasicCursor.prototype.prev = function() {
    var a = this.getCurNode();
    if (!a) return null;
    (a = this.getPreviousNode_(a, this.validNode_)) && this.setCurNode(a);
    return a
};
Blockly.BasicCursor.prototype.out = function() { return this.prev() };
Blockly.BasicCursor.prototype.getNextNode_ = function(a, b) {
    if (!a) return null;
    var c = a.in() || a.next();
    if (b(c)) return c;
    if (c) return this.getNextNode_(c, b);
    a = this.findSiblingOrParent_(a.out());
    return b(a) ? a : a ? this.getNextNode_(a, b) : null
};
Blockly.BasicCursor.prototype.getPreviousNode_ = function(a, b) {
    if (!a) return null;
    var c = a.prev();
    c = c ? this.getRightMostChild_(c) : a.out();
    return b(c) ? c : c ? this.getPreviousNode_(c, b) : null
};
Blockly.BasicCursor.prototype.validNode_ = function(a) {
    var b = !1;
    a = a && a.getType();
    if (a == Blockly.ASTNode.types.OUTPUT || a == Blockly.ASTNode.types.INPUT || a == Blockly.ASTNode.types.FIELD || a == Blockly.ASTNode.types.NEXT || a == Blockly.ASTNode.types.PREVIOUS || a == Blockly.ASTNode.types.WORKSPACE) b = !0;
    return b
};
Blockly.BasicCursor.prototype.findSiblingOrParent_ = function(a) { if (!a) return null; var b = a.next(); return b ? b : this.findSiblingOrParent_(a.out()) };
Blockly.BasicCursor.prototype.getRightMostChild_ = function(a) { if (!a.in()) return a; for (a = a.in(); a.next();) a = a.next(); return this.getRightMostChild_(a) };
Blockly.TabNavigateCursor = function() { Blockly.TabNavigateCursor.superClass_.constructor.call(this) };
Blockly.utils.object.inherits(Blockly.TabNavigateCursor, Blockly.BasicCursor);
Blockly.TabNavigateCursor.prototype.validNode_ = function(a) {
    var b = !1,
        c = a && a.getType();
    a && (a = a.getLocation(), c == Blockly.ASTNode.types.FIELD && a && a.isTabNavigable() && a.isClickable() && (b = !0));
    return b
};
Blockly.utils.Rect = function(a, b, c, d) {
    this.top = a;
    this.bottom = b;
    this.left = c;
    this.right = d
};
Blockly.utils.Rect.prototype.contains = function(a, b) { return a >= this.left && a <= this.right && b >= this.top && b <= this.bottom };
Blockly.BlockSvg = function(a, b, c) {
    this.svgGroup_ = Blockly.utils.dom.createSvgElement("g", {}, null);
    this.svgGroup_.translate_ = "";
    this.style = a.getRenderer().getConstants().getBlockStyle(null);
    this.pathObject = a.getRenderer().makePathObject(this.svgGroup_, this.style);
    this.rendered = !1;
    this.workspace = a;
    this.previousConnection = this.nextConnection = this.outputConnection = null;
    this.useDragSurface_ = Blockly.utils.is3dSupported() && !!a.getBlockDragSurface();
    var d = this.pathObject.svgPath;
    d.tooltip = this;
    Blockly.Tooltip.bindMouseEvents(d);
    Blockly.BlockSvg.superClass_.constructor.call(this, a, b, c);
    this.svgGroup_.dataset && (this.svgGroup_.dataset.id = this.id)
};
Blockly.utils.object.inherits(Blockly.BlockSvg, Blockly.Block);
Blockly.BlockSvg.prototype.height = 0;
Blockly.BlockSvg.prototype.width = 0;
Blockly.BlockSvg.prototype.dragStartXY_ = null;
Blockly.BlockSvg.prototype.warningTextDb_ = null;
Blockly.BlockSvg.INLINE = -1;
Blockly.BlockSvg.COLLAPSED_WARNING_ID = "TEMP_COLLAPSED_WARNING_";
Blockly.BlockSvg.prototype.initSvg = function() {
    if (!this.workspace.rendered) throw TypeError("Workspace is headless.");
    for (var a = 0, b; b = this.inputList[a]; a++) b.init();
    b = this.getIcons();
    for (a = 0; a < b.length; a++) b[a].createIcon();
    this.applyColour();
    this.pathObject.updateMovable(this.isMovable());
    a = this.getSvgRoot();
    this.workspace.options.readOnly || this.eventsInit_ || !a || Blockly.bindEventWithChecks_(a, "mousedown", this, this.onMouseDown_);
    this.eventsInit_ = !0;
    a.parentNode || this.workspace.getCanvas().appendChild(a)
};
Blockly.BlockSvg.prototype.getColourSecondary = function() { return this.style.colourSecondary };
Blockly.BlockSvg.prototype.getColourTertiary = function() { return this.style.colourTertiary };
Blockly.BlockSvg.prototype.getColourShadow = function() { return this.getColourSecondary() };
Blockly.BlockSvg.prototype.getColourBorder = function() { return { colourBorder: this.getColourTertiary(), colourLight: null, colourDark: null } };
Blockly.BlockSvg.prototype.select = function() {
    if (this.isShadow() && this.getParent()) this.getParent().select();
    else if (Blockly.selected != this) {
        var a = null;
        if (Blockly.selected) {
            a = Blockly.selected.id;
            Blockly.Events.disable();
            try { Blockly.selected.unselect() } finally { Blockly.Events.enable() }
        }
        a = new Blockly.Events.Ui(null, "selected", a, this.id);
        a.workspaceId = this.workspace.id;
        Blockly.Events.fire(a);
        Blockly.selected = this;
        this.addSelect()
    }
};
Blockly.BlockSvg.prototype.unselect = function() {
    if (Blockly.selected == this) {
        var a = new Blockly.Events.Ui(null, "selected", this.id, null);
        a.workspaceId = this.workspace.id;
        Blockly.Events.fire(a);
        Blockly.selected = null;
        this.removeSelect()
    }
};
Blockly.BlockSvg.prototype.mutator = null;
Blockly.BlockSvg.prototype.comment = null;
Blockly.BlockSvg.prototype.commentIcon_ = null;
Blockly.BlockSvg.prototype.warning = null;
Blockly.BlockSvg.prototype.getIcons = function() {
    var a = [];
    this.mutator && a.push(this.mutator);
    this.commentIcon_ && a.push(this.commentIcon_);
    this.warning && a.push(this.warning);
    return a
};
Blockly.BlockSvg.prototype.setParent = function(a) {
    var b = this.parentBlock_;
    if (a != b) {
        Blockly.utils.dom.startTextWidthCache();
        Blockly.BlockSvg.superClass_.setParent.call(this, a);
        Blockly.utils.dom.stopTextWidthCache();
        var c = this.getSvgRoot();
        if (!this.workspace.isClearing && c) {
            var d = this.getRelativeToSurfaceXY();
            a ? (a.getSvgRoot().appendChild(c), a = this.getRelativeToSurfaceXY(), this.moveConnections(a.x - d.x, a.y - d.y)) : b && (this.workspace.getCanvas().appendChild(c), this.translate(d.x, d.y));
            this.applyColour()
        }
    }
};
Blockly.BlockSvg.prototype.getRelativeToSurfaceXY = function() {
    var a = 0,
        b = 0,
        c = this.useDragSurface_ ? this.workspace.getBlockDragSurface().getGroup() : null,
        d = this.getSvgRoot();
    if (d) {
        do {
            var e = Blockly.utils.getRelativeXY(d);
            a += e.x;
            b += e.y;
            this.useDragSurface_ && this.workspace.getBlockDragSurface().getCurrentBlock() == d && (e = this.workspace.getBlockDragSurface().getSurfaceTranslation(), a += e.x, b += e.y);
            d = d.parentNode
        } while (d && d != this.workspace.getCanvas() && d != c)
    }
    return new Blockly.utils.Coordinate(a, b)
};
Blockly.BlockSvg.prototype.moveBy = function(a, b) {
    if (this.parentBlock_) throw Error("Block has parent.");
    var c = Blockly.Events.isEnabled();
    if (c) var d = new Blockly.Events.BlockMove(this);
    var e = this.getRelativeToSurfaceXY();
    this.translate(e.x + a, e.y + b);
    this.moveConnections(a, b);
    c && (d.recordNew(), Blockly.Events.fire(d));
    this.workspace.resizeContents()
};
Blockly.BlockSvg.prototype.translate = function(a, b) { this.getSvgRoot().setAttribute("transform", "translate(" + a + "," + b + ")") };
Blockly.BlockSvg.prototype.moveToDragSurface = function() {
    if (this.useDragSurface_) {
        var a = this.getRelativeToSurfaceXY();
        this.clearTransformAttributes_();
        this.workspace.getBlockDragSurface().translateSurface(a.x, a.y);
        (a = this.getSvgRoot()) && this.workspace.getBlockDragSurface().setBlocksAndShow(a)
    }
};
Blockly.BlockSvg.prototype.moveTo = function(a) {
    var b = this.getRelativeToSurfaceXY();
    this.moveBy(a.x - b.x, a.y - b.y)
};
Blockly.BlockSvg.prototype.moveOffDragSurface = function(a) { this.useDragSurface_ && (this.translate(a.x, a.y), this.workspace.getBlockDragSurface().clearAndHide(this.workspace.getCanvas())) };
Blockly.BlockSvg.prototype.moveDuringDrag = function(a) { this.useDragSurface_ ? this.workspace.getBlockDragSurface().translateSurface(a.x, a.y) : (this.svgGroup_.translate_ = "translate(" + a.x + "," + a.y + ")", this.svgGroup_.setAttribute("transform", this.svgGroup_.translate_ + this.svgGroup_.skew_)) };
Blockly.BlockSvg.prototype.clearTransformAttributes_ = function() { this.getSvgRoot().removeAttribute("transform") };
Blockly.BlockSvg.prototype.snapToGrid = function() {
    if (this.workspace && !this.workspace.isDragging() && !this.getParent() && !this.isInFlyout) {
        var a = this.workspace.getGrid();
        if (a && a.shouldSnap()) {
            var b = a.getSpacing(),
                c = b / 2,
                d = this.getRelativeToSurfaceXY();
            a = Math.round((d.x - c) / b) * b + c - d.x;
            b = Math.round((d.y - c) / b) * b + c - d.y;
            a = Math.round(a);
            b = Math.round(b);
            0 == a && 0 == b || this.moveBy(a, b)
        }
    }
};
Blockly.BlockSvg.prototype.getBoundingRectangle = function() {
    var a = this.getRelativeToSurfaceXY(),
        b = this.getHeightWidth();
    if (this.RTL) { var c = a.x - b.width; var d = a.x } else c = a.x, d = a.x + b.width;
    return new Blockly.utils.Rect(a.y, a.y + b.height, c, d)
};
Blockly.BlockSvg.prototype.markDirty = function() { this.pathObject.constants = this.workspace.getRenderer().getConstants(); for (var a = 0, b; b = this.inputList[a]; a++) b.markDirty() };
Blockly.BlockSvg.prototype.setCollapsed = function(a) {
    if (this.collapsed_ != a) {
        for (var b = [], c = 0, d; d = this.inputList[c]; c++) b.push.apply(b, d.setVisible(!a));
        if (a) {
            d = this.getIcons();
            for (c = 0; c < d.length; c++) d[c].setVisible(!1);
            c = this.toString(Blockly.COLLAPSE_CHARS);
            this.appendDummyInput("_TEMP_COLLAPSED_INPUT").appendField(c).init();
            d = this.getDescendants(!0);
            if (c = this.getNextBlock()) c = d.indexOf(c), d.splice(c, d.length - c);
            c = 1;
            for (var e; e = d[c]; c++)
                if (e.warning) {
                    this.setWarningText(Blockly.Msg.COLLAPSED_WARNINGS_WARNING,
                        Blockly.BlockSvg.COLLAPSED_WARNING_ID);
                    break
                }
        } else this.removeInput("_TEMP_COLLAPSED_INPUT"), this.warning && (this.warning.setText("", Blockly.BlockSvg.COLLAPSED_WARNING_ID), Object.keys(this.warning.text_).length || this.setWarningText(null));
        Blockly.BlockSvg.superClass_.setCollapsed.call(this, a);
        b.length || (b[0] = this);
        if (this.rendered)
            for (c = 0; e = b[c]; c++) e.render()
    }
};
Blockly.BlockSvg.prototype.tab = function(a, b) {
    var c = new Blockly.TabNavigateCursor;
    c.setCurNode(Blockly.ASTNode.createFieldNode(a));
    a = c.getCurNode();
    c.onBlocklyAction(b ? Blockly.navigation.ACTION_NEXT : Blockly.navigation.ACTION_PREVIOUS);
    (b = c.getCurNode()) && b !== a && (b.getLocation().showEditor(), this.workspace.keyboardAccessibilityMode && this.workspace.getCursor().setCurNode(b))
};
Blockly.BlockSvg.prototype.onMouseDown_ = function(a) {
    var b = this.workspace && this.workspace.getGesture(a);
    b && b.handleBlockStart(a, this)
};
Blockly.BlockSvg.prototype.showHelp = function() {
    var a = "function" == typeof this.helpUrl ? this.helpUrl() : this.helpUrl;
    a && window.open(a)
};
Blockly.BlockSvg.prototype.generateContextMenu = function() {
    if (this.workspace.options.readOnly || !this.contextMenu) return null;
    var a = this,
        b = [];
    if (!this.isInFlyout) {
        this.isDeletable() && this.isMovable() && b.push(Blockly.ContextMenu.blockDuplicateOption(a));
        this.workspace.options.comments && !this.collapsed_ && this.isEditable() && b.push(Blockly.ContextMenu.blockCommentOption(a));
        if (this.isMovable())
            if (this.collapsed_) this.workspace.options.collapse && (c = { enabled: !0 }, c.text = Blockly.Msg.EXPAND_BLOCK, c.callback =
                function() { a.setCollapsed(!1) }, b.push(c));
            else {
                for (var c = 1; c < this.inputList.length; c++)
                    if (this.inputList[c - 1].type != Blockly.NEXT_STATEMENT && this.inputList[c].type != Blockly.NEXT_STATEMENT) {
                        c = { enabled: !0 };
                        var d = this.getInputsInline();
                        c.text = d ? Blockly.Msg.EXTERNAL_INPUTS : Blockly.Msg.INLINE_INPUTS;
                        c.callback = function() { a.setInputsInline(!d) };
                        b.push(c);
                        break
                    }
                this.workspace.options.collapse && (c = { enabled: !0 }, c.text = Blockly.Msg.COLLAPSE_BLOCK, c.callback = function() { a.setCollapsed(!0) }, b.push(c))
            }
        this.workspace.options.disable &&
            this.isEditable() && (c = {
                text: this.isEnabled() ? Blockly.Msg.DISABLE_BLOCK : Blockly.Msg.ENABLE_BLOCK,
                enabled: !this.getInheritedDisabled(),
                callback: function() {
                    var b = Blockly.Events.getGroup();
                    b || Blockly.Events.setGroup(!0);
                    a.setEnabled(!a.isEnabled());
                    b || Blockly.Events.setGroup(!1)
                }
            }, b.push(c));
        this.isDeletable() && b.push(Blockly.ContextMenu.blockDeleteOption(a))
    }
    b.push(Blockly.ContextMenu.blockHelpOption(a));
    this.customContextMenu && this.customContextMenu(b);
    return b
};
Blockly.BlockSvg.prototype.showContextMenu = function(a) {
    var b = this.generateContextMenu();
    b && b.length && (Blockly.ContextMenu.show(a, b, this.RTL), Blockly.ContextMenu.currentBlock = this)
};
Blockly.BlockSvg.prototype.moveConnections = function(a, b) {
    if (this.rendered) {
        for (var c = this.getConnections_(!1), d = 0; d < c.length; d++) c[d].moveBy(a, b);
        c = this.getIcons();
        for (d = 0; d < c.length; d++) c[d].computeIconLocation();
        for (d = 0; d < this.childBlocks_.length; d++) this.childBlocks_[d].moveConnections(a, b)
    }
};
Blockly.BlockSvg.prototype.setDragging = function(a) {
    if (a) {
        var b = this.getSvgRoot();
        b.translate_ = "";
        b.skew_ = "";
        Blockly.draggingConnections = Blockly.draggingConnections.concat(this.getConnections_(!0));
        Blockly.utils.dom.addClass(this.svgGroup_, "blocklyDragging")
    } else Blockly.draggingConnections = [], Blockly.utils.dom.removeClass(this.svgGroup_, "blocklyDragging");
    for (b = 0; b < this.childBlocks_.length; b++) this.childBlocks_[b].setDragging(a)
};
Blockly.BlockSvg.prototype.setMovable = function(a) {
    Blockly.BlockSvg.superClass_.setMovable.call(this, a);
    this.pathObject.updateMovable(a)
};
Blockly.BlockSvg.prototype.setEditable = function(a) {
    Blockly.BlockSvg.superClass_.setEditable.call(this, a);
    a = this.getIcons();
    for (var b = 0; b < a.length; b++) a[b].updateEditable()
};
Blockly.BlockSvg.prototype.setShadow = function(a) {
    Blockly.BlockSvg.superClass_.setShadow.call(this, a);
    this.applyColour()
};
Blockly.BlockSvg.prototype.setInsertionMarker = function(a) { this.isInsertionMarker_ != a && (this.isInsertionMarker_ = a) && (this.setColour(this.workspace.getRenderer().getConstants().INSERTION_MARKER_COLOUR), this.pathObject.updateInsertionMarker(!0)) };
Blockly.BlockSvg.prototype.getSvgRoot = function() { return this.svgGroup_ };
Blockly.BlockSvg.prototype.dispose = function(a, b) {
    if (this.workspace) {
        Blockly.Tooltip.dispose();
        Blockly.Tooltip.unbindMouseEvents(this.pathObject.svgPath);
        Blockly.utils.dom.startTextWidthCache();
        var c = this.workspace;
        Blockly.selected == this && (this.unselect(), this.workspace.cancelCurrentGesture());
        Blockly.ContextMenu.currentBlock == this && Blockly.ContextMenu.hide();
        this.workspace.keyboardAccessibilityMode && Blockly.navigation.moveCursorOnBlockDelete(this);
        b && this.rendered && (this.unplug(a), Blockly.blockAnimations.disposeUiEffect(this));
        this.rendered = !1;
        if (this.warningTextDb_) {
            for (var d in this.warningTextDb_) clearTimeout(this.warningTextDb_[d]);
            this.warningTextDb_ = null
        }
        b = this.getIcons();
        for (d = 0; d < b.length; d++) b[d].dispose();
        Blockly.BlockSvg.superClass_.dispose.call(this, !!a);
        Blockly.utils.dom.removeNode(this.svgGroup_);
        c.resizeContents();
        this.svgGroup_ = null;
        Blockly.utils.dom.stopTextWidthCache()
    }
};
Blockly.BlockSvg.prototype.applyColour = function() {
    this.pathObject.applyColour(this);
    for (var a = this.getIcons(), b = 0; b < a.length; b++) a[b].applyColour();
    for (a = 0; b = this.inputList[a]; a++)
        for (var c = 0, d; d = b.fieldRow[c]; c++) d.applyColour()
};
Blockly.BlockSvg.prototype.updateDisabled = function() {
    var a = this.getChildren(!1);
    this.applyColour();
    for (var b = 0, c; c = a[b]; b++) c.updateDisabled()
};
Blockly.BlockSvg.prototype.getCommentIcon = function() { return this.commentIcon_ };
Blockly.BlockSvg.prototype.setCommentText = function(a) {
    if (!Blockly.Comment) throw Error("Missing require for Blockly.Comment");
    this.commentModel.text != a && (Blockly.BlockSvg.superClass_.setCommentText.call(this, a), a = null != a, !!this.commentIcon_ == a ? this.commentIcon_.updateText() : (a ? this.comment = this.commentIcon_ = new Blockly.Comment(this) : (this.commentIcon_.dispose(), this.comment = this.commentIcon_ = null), this.rendered && (this.render(), this.bumpNeighbours())))
};
Blockly.BlockSvg.prototype.setWarningText = function(a, b) {
    if (!Blockly.Warning) throw Error("Missing require for Blockly.Warning");
    this.warningTextDb_ || (this.warningTextDb_ = Object.create(null));
    var c = b || "";
    if (c) this.warningTextDb_[c] && (clearTimeout(this.warningTextDb_[c]), delete this.warningTextDb_[c]);
    else
        for (var d in this.warningTextDb_) clearTimeout(this.warningTextDb_[d]), delete this.warningTextDb_[d];
    if (this.workspace.isDragging()) {
        var e = this;
        this.warningTextDb_[c] = setTimeout(function() {
            e.workspace &&
                (delete e.warningTextDb_[c], e.setWarningText(a, c))
        }, 100)
    } else {
        this.isInFlyout && (a = null);
        b = this.getSurroundParent();
        for (d = null; b;) b.isCollapsed() && (d = b), b = b.getSurroundParent();
        d && d.setWarningText(Blockly.Msg.COLLAPSED_WARNINGS_WARNING, Blockly.BlockSvg.COLLAPSED_WARNING_ID);
        b = !1;
        "string" == typeof a ? (this.warning || (this.warning = new Blockly.Warning(this), b = !0), this.warning.setText(a, c)) : this.warning && !c ? (this.warning.dispose(), b = !0) : this.warning && (b = this.warning.getText(), this.warning.setText("", c), (d =
            this.warning.getText()) || this.warning.dispose(), b = b != d);
        b && this.rendered && (this.render(), this.bumpNeighbours())
    }
};
Blockly.BlockSvg.prototype.setMutator = function(a) {
    this.mutator && this.mutator !== a && this.mutator.dispose();
    a && (a.setBlock(this), this.mutator = a, a.createIcon());
    this.rendered && (this.render(), this.bumpNeighbours())
};
Blockly.BlockSvg.prototype.setDisabled = function(a) {
    console.warn("Deprecated call to Blockly.BlockSvg.prototype.setDisabled, use Blockly.BlockSvg.prototype.setEnabled instead.");
    this.setEnabled(!a)
};
Blockly.BlockSvg.prototype.setEnabled = function(a) { this.isEnabled() != a && (Blockly.BlockSvg.superClass_.setEnabled.call(this, a), this.rendered && !this.getInheritedDisabled() && this.updateDisabled()) };
Blockly.BlockSvg.prototype.setHighlighted = function(a) { this.rendered && this.pathObject.updateHighlighted(a) };
Blockly.BlockSvg.prototype.addSelect = function() { this.pathObject.updateSelected(!0) };
Blockly.BlockSvg.prototype.removeSelect = function() { this.pathObject.updateSelected(!1) };
Blockly.BlockSvg.prototype.setDeleteStyle = function(a) { this.pathObject.updateDraggingDelete(a) };
Blockly.BlockSvg.prototype.getColour = function() { return this.style.colourPrimary };
Blockly.BlockSvg.prototype.setColour = function(a) {
    Blockly.BlockSvg.superClass_.setColour.call(this, a);
    a = this.workspace.getRenderer().getConstants().getBlockStyleForColour(this.colour_);
    this.pathObject.setStyle(a.style);
    this.style = a.style;
    this.styleName_ = a.name;
    this.applyColour()
};
Blockly.BlockSvg.prototype.setStyle = function(a) {
    var b = this.workspace.getRenderer().getConstants().getBlockStyle(a);
    this.styleName_ = a;
    if (b) this.hat = b.hat, this.pathObject.setStyle(b), this.colour_ = b.colourPrimary, this.style = b, this.applyColour();
    else throw Error("Invalid style name: " + a);
};
Blockly.BlockSvg.prototype.bringToFront = function() {
    var a = this;
    do {
        var b = a.getSvgRoot(),
            c = b.parentNode,
            d = c.childNodes;
        d[d.length - 1] !== b && c.appendChild(b);
        a = a.getParent()
    } while (a)
};
Blockly.BlockSvg.prototype.setPreviousStatement = function(a, b) {
    Blockly.BlockSvg.superClass_.setPreviousStatement.call(this, a, b);
    this.rendered && (this.render(), this.bumpNeighbours())
};
Blockly.BlockSvg.prototype.setNextStatement = function(a, b) {
    Blockly.BlockSvg.superClass_.setNextStatement.call(this, a, b);
    this.rendered && (this.render(), this.bumpNeighbours())
};
Blockly.BlockSvg.prototype.setOutput = function(a, b) {
    Blockly.BlockSvg.superClass_.setOutput.call(this, a, b);
    this.rendered && (this.render(), this.bumpNeighbours())
};
Blockly.BlockSvg.prototype.setInputsInline = function(a) {
    Blockly.BlockSvg.superClass_.setInputsInline.call(this, a);
    this.rendered && (this.render(), this.bumpNeighbours())
};
Blockly.BlockSvg.prototype.removeInput = function(a, b) {
    Blockly.BlockSvg.superClass_.removeInput.call(this, a, b);
    this.rendered && (this.render(), this.bumpNeighbours())
};
Blockly.BlockSvg.prototype.moveNumberedInputBefore = function(a, b) {
    Blockly.BlockSvg.superClass_.moveNumberedInputBefore.call(this, a, b);
    this.rendered && (this.render(), this.bumpNeighbours())
};
Blockly.BlockSvg.prototype.appendInput_ = function(a, b) {
    a = Blockly.BlockSvg.superClass_.appendInput_.call(this, a, b);
    this.rendered && (this.render(), this.bumpNeighbours());
    return a
};
Blockly.BlockSvg.prototype.setConnectionTracking = function(a) {
    this.previousConnection && this.previousConnection.setTracking(a);
    this.outputConnection && this.outputConnection.setTracking(a);
    if (this.nextConnection) {
        this.nextConnection.setTracking(a);
        var b = this.nextConnection.targetBlock();
        b && b.setConnectionTracking(a)
    }
    if (!this.collapsed_)
        for (b = 0; b < this.inputList.length; b++) {
            var c = this.inputList[b].connection;
            c && (c.setTracking(a), (c = c.targetBlock()) && c.setConnectionTracking(a))
        }
};
Blockly.BlockSvg.prototype.getConnections_ = function(a) {
    var b = [];
    if (a || this.rendered)
        if (this.outputConnection && b.push(this.outputConnection), this.previousConnection && b.push(this.previousConnection), this.nextConnection && b.push(this.nextConnection), a || !this.collapsed_) { a = 0; for (var c; c = this.inputList[a]; a++) c.connection && b.push(c.connection) }
    return b
};
Blockly.BlockSvg.prototype.lastConnectionInStack = function() { return Blockly.BlockSvg.superClass_.lastConnectionInStack.call(this) };
Blockly.BlockSvg.prototype.getMatchingConnection = function(a, b) { return Blockly.BlockSvg.superClass_.getMatchingConnection.call(this, a, b) };
Blockly.BlockSvg.prototype.makeConnection_ = function(a) { return new Blockly.RenderedConnection(this, a) };
Blockly.BlockSvg.prototype.bumpNeighbours = function() {
    if (this.workspace && !this.workspace.isDragging()) {
        var a = this.getRootBlock();
        if (!a.isInFlyout)
            for (var b = this.getConnections_(!1), c = 0, d; d = b[c]; c++) { d.isConnected() && d.isSuperior() && d.targetBlock().bumpNeighbours(); for (var e = d.neighbours(Blockly.SNAP_RADIUS), f = 0, g; g = e[f]; f++) d.isConnected() && g.isConnected() || g.getSourceBlock().getRootBlock() != a && (d.isSuperior() ? g.bumpAwayFrom(d) : d.bumpAwayFrom(g)) }
    }
};
Blockly.BlockSvg.prototype.scheduleSnapAndBump = function() {
    var a = this,
        b = Blockly.Events.getGroup();
    setTimeout(function() {
        Blockly.Events.setGroup(b);
        a.snapToGrid();
        Blockly.Events.setGroup(!1)
    }, Blockly.BUMP_DELAY / 2);
    setTimeout(function() {
        Blockly.Events.setGroup(b);
        a.bumpNeighbours();
        Blockly.Events.setGroup(!1)
    }, Blockly.BUMP_DELAY)
};
Blockly.BlockSvg.prototype.positionNearConnection = function(a, b) { a.type != Blockly.NEXT_STATEMENT && a.type != Blockly.INPUT_VALUE || this.moveBy(b.x - a.x, b.y - a.y) };
Blockly.BlockSvg.prototype.getParent = function() { return Blockly.BlockSvg.superClass_.getParent.call(this) };
Blockly.BlockSvg.prototype.getRootBlock = function() { return Blockly.BlockSvg.superClass_.getRootBlock.call(this) };
Blockly.BlockSvg.prototype.render = function(a) {
    Blockly.utils.dom.startTextWidthCache();
    this.rendered = !0;
    this.workspace.getRenderer().render(this);
    this.updateConnectionLocations_();
    !1 !== a && ((a = this.getParent()) ? a.render(!0) : this.workspace.resizeContents());
    Blockly.utils.dom.stopTextWidthCache();
    this.updateMarkers_()
};
Blockly.BlockSvg.prototype.updateMarkers_ = function() {
    this.workspace.keyboardAccessibilityMode && this.pathObject.cursorSvg && this.workspace.getCursor().draw();
    this.workspace.keyboardAccessibilityMode && this.pathObject.markerSvg && this.workspace.getMarker(Blockly.navigation.MARKER_NAME).draw()
};
Blockly.BlockSvg.prototype.updateConnectionLocations_ = function() {
    var a = this.getRelativeToSurfaceXY();
    this.previousConnection && this.previousConnection.moveToOffset(a);
    this.outputConnection && this.outputConnection.moveToOffset(a);
    for (var b = 0; b < this.inputList.length; b++) {
        var c = this.inputList[b].connection;
        c && (c.moveToOffset(a), c.isConnected() && c.tighten())
    }
    this.nextConnection && (this.nextConnection.moveToOffset(a), this.nextConnection.isConnected() && this.nextConnection.tighten())
};
Blockly.BlockSvg.prototype.setCursorSvg = function(a) { this.pathObject.setCursorSvg(a) };
Blockly.BlockSvg.prototype.setMarkerSvg = function(a) { this.pathObject.setMarkerSvg(a) };
Blockly.BlockSvg.prototype.getHeightWidth = function() {
    var a = this.height,
        b = this.width,
        c = this.getNextBlock();
    if (c) {
        c = c.getHeightWidth();
        var d = this.workspace.getRenderer().getConstants().NOTCH_HEIGHT;
        a += c.height - d;
        b = Math.max(b, c.width)
    }
    return { height: a, width: b }
};
Blockly.BlockSvg.prototype.fadeForReplacement = function(a) { this.pathObject.updateReplacementFade(a) };
Blockly.BlockSvg.prototype.highlightShapeForInput = function(a, b) { this.pathObject.updateShapeForInputHighlight(a, b) };
Blockly.blockRendering.rendererMap_ = {};
Blockly.blockRendering.useDebugger = !1;
Blockly.blockRendering.register = function(a, b) {
    if (Blockly.blockRendering.rendererMap_[a]) throw Error("Renderer has already been registered.");
    Blockly.blockRendering.rendererMap_[a] = b
};
Blockly.blockRendering.unregister = function(a) { Blockly.blockRendering.rendererMap_[a] ? delete Blockly.blockRendering.rendererMap_[a] : console.warn('No renderer mapping for name "' + a + '" found to unregister') };
Blockly.blockRendering.startDebugger = function() { Blockly.blockRendering.useDebugger = !0 };
Blockly.blockRendering.stopDebugger = function() { Blockly.blockRendering.useDebugger = !1 };
Blockly.blockRendering.init = function(a, b, c) {
    if (!Blockly.blockRendering.rendererMap_[a]) throw Error("Renderer not registered: ", a);
    a = new Blockly.blockRendering.rendererMap_[a](a);
    a.init(b, c);
    return a
};
Blockly.ConnectionDB = function() { this.connections_ = [] };
Blockly.ConnectionDB.prototype.addConnection = function(a, b) {
    b = this.calculateIndexForYPos_(b);
    this.connections_.splice(b, 0, a)
};
Blockly.ConnectionDB.prototype.findIndexOfConnection_ = function(a, b) {
    if (!this.connections_.length) return -1;
    var c = this.calculateIndexForYPos_(b);
    if (c >= this.connections_.length) return -1;
    b = a.y;
    for (var d = c; 0 <= d && this.connections_[d].y == b;) {
        if (this.connections_[d] == a) return d;
        d--
    }
    for (; c < this.connections_.length && this.connections_[c].y == b;) {
        if (this.connections_[c] == a) return c;
        c++
    }
    return -1
};
Blockly.ConnectionDB.prototype.calculateIndexForYPos_ = function(a) {
    if (!this.connections_.length) return 0;
    for (var b = 0, c = this.connections_.length; b < c;) {
        var d = Math.floor((b + c) / 2);
        if (this.connections_[d].y < a) b = d + 1;
        else if (this.connections_[d].y > a) c = d;
        else { b = d; break }
    }
    return b
};
Blockly.ConnectionDB.prototype.removeConnection = function(a, b) {
    a = this.findIndexOfConnection_(a, b);
    if (-1 == a) throw Error("Unable to find connection in connectionDB.");
    this.connections_.splice(a, 1)
};
Blockly.ConnectionDB.prototype.getNeighbours = function(a, b) {
    function c(a) {
        var c = e - d[a].x,
            g = f - d[a].y;
        Math.sqrt(c * c + g * g) <= b && k.push(d[a]);
        return g < b
    }
    var d = this.connections_,
        e = a.x,
        f = a.y;
    a = 0;
    for (var g = d.length - 2, h = g; a < h;) d[h].y < f ? a = h : g = h, h = Math.floor((a + g) / 2);
    var k = [];
    g = a = h;
    if (d.length) {
        for (; 0 <= a && c(a);) a--;
        do g++; while (g < d.length && c(g))
    }
    return k
};
Blockly.ConnectionDB.prototype.isInYRange_ = function(a, b, c) { return Math.abs(this.connections_[a].y - b) <= c };
Blockly.ConnectionDB.prototype.searchForClosest = function(a, b, c) {
    if (!this.connections_.length) return { connection: null, radius: b };
    var d = a.y,
        e = a.x;
    a.x = e + c.x;
    a.y = d + c.y;
    var f = this.calculateIndexForYPos_(a.y);
    c = null;
    for (var g = b, h, k = f - 1; 0 <= k && this.isInYRange_(k, a.y, b);) h = this.connections_[k], a.isConnectionAllowed(h, g) && (c = h, g = h.distanceFrom(a)), k--;
    for (; f < this.connections_.length && this.isInYRange_(f, a.y, b);) h = this.connections_[f], a.isConnectionAllowed(h, g) && (c = h, g = h.distanceFrom(a)), f++;
    a.x = e;
    a.y = d;
    return {
        connection: c,
        radius: g
    }
};
Blockly.ConnectionDB.init = function() {
    var a = [];
    a[Blockly.INPUT_VALUE] = new Blockly.ConnectionDB;
    a[Blockly.OUTPUT_VALUE] = new Blockly.ConnectionDB;
    a[Blockly.NEXT_STATEMENT] = new Blockly.ConnectionDB;
    a[Blockly.PREVIOUS_STATEMENT] = new Blockly.ConnectionDB;
    return a
};
Blockly.MarkerManager = function(a) {
    this.cursorSvg_ = this.cursor_ = null;
    this.markers_ = {};
    this.workspace_ = a
};
Blockly.MarkerManager.prototype.registerMarker = function(a, b) {
    this.markers_[a] && this.unregisterMarker(a);
    b.setDrawer(this.workspace_.getRenderer().makeMarkerDrawer(this.workspace_, b));
    this.setMarkerSvg(b.getDrawer().createDom());
    this.markers_[a] = b
};
Blockly.MarkerManager.prototype.unregisterMarker = function(a) {
    var b = this.markers_[a];
    if (b) b.dispose(), delete this.markers_[a];
    else throw Error("Marker with id " + a + " does not exist. Can only unregistermarkers that exist.");
};
Blockly.MarkerManager.prototype.getCursor = function() { return this.cursor_ };
Blockly.MarkerManager.prototype.getMarker = function(a) { return this.markers_[a] };
Blockly.MarkerManager.prototype.setCursor = function(a) { this.cursor_ && this.cursor_.getDrawer() && this.cursor_.getDrawer().dispose(); if (this.cursor_ = a) a = this.workspace_.getRenderer().makeMarkerDrawer(this.workspace_, this.cursor_), this.cursor_.setDrawer(a), this.setCursorSvg(this.cursor_.getDrawer().createDom()) };
Blockly.MarkerManager.prototype.setCursorSvg = function(a) { a ? (this.workspace_.getBlockCanvas().appendChild(a), this.cursorSvg_ = a) : this.cursorSvg_ = null };
Blockly.MarkerManager.prototype.setMarkerSvg = function(a) { a ? this.workspace_.getBlockCanvas() && (this.cursorSvg_ ? this.workspace_.getBlockCanvas().insertBefore(a, this.cursorSvg_) : this.workspace_.getBlockCanvas().appendChild(a)) : this.markerSvg_ = null };
Blockly.MarkerManager.prototype.updateMarkers = function() { this.workspace_.keyboardAccessibilityMode && this.cursorSvg_ && this.workspace_.getCursor().draw() };
Blockly.MarkerManager.prototype.dispose = function() {
    for (var a = Object.keys(this.markers_), b = 0, c; c = a[b]; b++) this.unregisterMarker(c);
    this.markers_ = null;
    this.cursor_.dispose();
    this.cursor_ = null
};
Blockly.ThemeManager = function(a, b) {
    this.workspace_ = a;
    this.theme_ = b;
    this.subscribedWorkspaces_ = [];
    this.componentDB_ = Object.create(null)
};
Blockly.ThemeManager.prototype.getTheme = function() { return this.theme_ };
Blockly.ThemeManager.prototype.setTheme = function(a) {
    var b = this.theme_;
    this.theme_ = a;
    if (a = this.workspace_.getInjectionDiv()) b && Blockly.utils.dom.removeClass(a, b.getClassName()), Blockly.utils.dom.addClass(a, this.theme_.getClassName());
    for (b = 0; a = this.subscribedWorkspaces_[b]; b++) a.refreshTheme();
    b = 0;
    a = Object.keys(this.componentDB_);
    for (var c; c = a[b]; b++)
        for (var d = 0, e; e = this.componentDB_[c][d]; d++) {
            var f = e.element;
            e = e.propertyName;
            var g = this.theme_ && this.theme_.getComponentStyle(c);
            f.style[e] = g || ""
        }
    Blockly.hideChaff()
};
Blockly.ThemeManager.prototype.subscribeWorkspace = function(a) { this.subscribedWorkspaces_.push(a) };
Blockly.ThemeManager.prototype.unsubscribeWorkspace = function(a) {
    a = this.subscribedWorkspaces_.indexOf(a);
    if (0 > a) throw Error("Cannot unsubscribe a workspace that hasn't been subscribed.");
    this.subscribedWorkspaces_.splice(a, 1)
};
Blockly.ThemeManager.prototype.subscribe = function(a, b, c) {
    this.componentDB_[b] || (this.componentDB_[b] = []);
    this.componentDB_[b].push({ element: a, propertyName: c });
    b = this.theme_ && this.theme_.getComponentStyle(b);
    a.style[c] = b || ""
};
Blockly.ThemeManager.prototype.unsubscribe = function(a) {
    if (a)
        for (var b = Object.keys(this.componentDB_), c = 0, d; d = b[c]; c++) {
            for (var e = this.componentDB_[d], f = e.length - 1; 0 <= f; f--) e[f].element === a && e.splice(f, 1);
            this.componentDB_[d].length || delete this.componentDB_[d]
        }
};
Blockly.ThemeManager.prototype.dispose = function() { this.componentDB_ = this.subscribedWorkspaces_ = this.theme_ = this.owner_ = null };
Blockly.TouchGesture = function(a, b) {
    Blockly.TouchGesture.superClass_.constructor.call(this, a, b);
    this.isMultiTouch_ = !1;
    this.cachedPoints_ = Object.create(null);
    this.startDistance_ = this.previousScale_ = 0;
    this.isPinchZoomEnabled_ = this.onStartWrapper_ = null
};
Blockly.utils.object.inherits(Blockly.TouchGesture, Blockly.Gesture);
Blockly.TouchGesture.ZOOM_IN_MULTIPLIER = 5;
Blockly.TouchGesture.ZOOM_OUT_MULTIPLIER = 6;
Blockly.TouchGesture.prototype.doStart = function(a) {
    this.isPinchZoomEnabled_ = this.startWorkspace_.options.zoomOptions && this.startWorkspace_.options.zoomOptions.pinch;
    Blockly.TouchGesture.superClass_.doStart.call(this, a);
    !this.isEnding_ && Blockly.Touch.isTouchEvent(a) && this.handleTouchStart(a)
};
Blockly.TouchGesture.prototype.bindMouseEvents = function(a) {
    this.onStartWrapper_ = Blockly.bindEventWithChecks_(document, "mousedown", null, this.handleStart.bind(this), !0);
    this.onMoveWrapper_ = Blockly.bindEventWithChecks_(document, "mousemove", null, this.handleMove.bind(this), !0);
    this.onUpWrapper_ = Blockly.bindEventWithChecks_(document, "mouseup", null, this.handleUp.bind(this), !0);
    a.preventDefault();
    a.stopPropagation()
};
Blockly.TouchGesture.prototype.handleStart = function(a) {!this.isDragging() && Blockly.Touch.isTouchEvent(a) && (this.handleTouchStart(a), this.isMultiTouch() && Blockly.longStop_()) };
Blockly.TouchGesture.prototype.handleMove = function(a) { this.isDragging() ? Blockly.Touch.shouldHandleEvent(a) && Blockly.TouchGesture.superClass_.handleMove.call(this, a) : this.isMultiTouch() ? (Blockly.Touch.isTouchEvent(a) && this.handleTouchMove(a), Blockly.longStop_()) : Blockly.TouchGesture.superClass_.handleMove.call(this, a) };
Blockly.TouchGesture.prototype.handleUp = function(a) { Blockly.Touch.isTouchEvent(a) && !this.isDragging() && this.handleTouchEnd(a);!this.isMultiTouch() || this.isDragging() ? Blockly.Touch.shouldHandleEvent(a) && Blockly.TouchGesture.superClass_.handleUp.call(this, a) : (a.preventDefault(), a.stopPropagation(), this.dispose()) };
Blockly.TouchGesture.prototype.isMultiTouch = function() { return this.isMultiTouch_ };
Blockly.TouchGesture.prototype.dispose = function() {
    Blockly.TouchGesture.superClass_.dispose.call(this);
    this.onStartWrapper_ && Blockly.unbindEvent_(this.onStartWrapper_)
};
Blockly.TouchGesture.prototype.handleTouchStart = function(a) {
    var b = Blockly.Touch.getTouchIdentifierFromEvent(a);
    this.cachedPoints_[b] = this.getTouchPoint(a);
    b = Object.keys(this.cachedPoints_);
    2 == b.length && (this.startDistance_ = Blockly.utils.Coordinate.distance(this.cachedPoints_[b[0]], this.cachedPoints_[b[1]]), this.isMultiTouch_ = !0, a.preventDefault())
};
Blockly.TouchGesture.prototype.handleTouchMove = function(a) {
    var b = Blockly.Touch.getTouchIdentifierFromEvent(a);
    this.cachedPoints_[b] = this.getTouchPoint(a);
    b = Object.keys(this.cachedPoints_);
    this.isPinchZoomEnabled_ && 2 === b.length ? this.handlePinch_(a) : Blockly.TouchGesture.superClass_.handleMove.call(this, a)
};
Blockly.TouchGesture.prototype.handlePinch_ = function(a) {
    var b = Object.keys(this.cachedPoints_);
    b = Blockly.utils.Coordinate.distance(this.cachedPoints_[b[0]], this.cachedPoints_[b[1]]) / this.startDistance_;
    if (0 < this.previousScale_ && Infinity > this.previousScale_) {
        var c = b - this.previousScale_;
        c = 0 < c ? c * Blockly.TouchGesture.ZOOM_IN_MULTIPLIER : c * Blockly.TouchGesture.ZOOM_OUT_MULTIPLIER;
        var d = this.startWorkspace_,
            e = Blockly.utils.mouseToSvg(a, d.getParentSvg(), d.getInverseScreenCTM());
        d.zoom(e.x, e.y, c)
    }
    this.previousScale_ =
        b;
    a.preventDefault()
};
Blockly.TouchGesture.prototype.handleTouchEnd = function(a) {
    a = Blockly.Touch.getTouchIdentifierFromEvent(a);
    this.cachedPoints_[a] && delete this.cachedPoints_[a];
    2 > Object.keys(this.cachedPoints_).length && (this.cachedPoints_ = Object.create(null), this.previousScale_ = 0)
};
Blockly.TouchGesture.prototype.getTouchPoint = function(a) { return this.startWorkspace_ ? new Blockly.utils.Coordinate(a.pageX ? a.pageX : a.changedTouches[0].pageX, a.pageY ? a.pageY : a.changedTouches[0].pageY) : null };
Blockly.WorkspaceAudio = function(a) {
    this.parentWorkspace_ = a;
    this.SOUNDS_ = Object.create(null)
};
Blockly.WorkspaceAudio.prototype.lastSound_ = null;
Blockly.WorkspaceAudio.prototype.dispose = function() { this.SOUNDS_ = this.parentWorkspace_ = null };
Blockly.WorkspaceAudio.prototype.load = function(a, b) {
    if (a.length) {
        try { var c = new Blockly.utils.global.Audio } catch (h) { return }
        for (var d, e = 0; e < a.length; e++) {
            var f = a[e],
                g = f.match(/\.(\w+)$/);
            if (g && c.canPlayType("audio/" + g[1])) { d = new Blockly.utils.global.Audio(f); break }
        }
        d && d.play && (this.SOUNDS_[b] = d)
    }
};
Blockly.WorkspaceAudio.prototype.preload = function() {
    for (var a in this.SOUNDS_) {
        var b = this.SOUNDS_[a];
        b.volume = .01;
        var c = b.play();
        void 0 !== c ? c.then(b.pause).catch(function() {}) : b.pause();
        if (Blockly.utils.userAgent.IPAD || Blockly.utils.userAgent.IPHONE) break
    }
};
Blockly.WorkspaceAudio.prototype.play = function(a, b) {
    var c = this.SOUNDS_[a];
    c ? (a = new Date, null != this.lastSound_ && a - this.lastSound_ < Blockly.SOUND_LIMIT || (this.lastSound_ = a, c = Blockly.utils.userAgent.IPAD || Blockly.utils.userAgent.ANDROID ? c : c.cloneNode(), c.volume = void 0 === b ? 1 : b, c.play())) : this.parentWorkspace_ && this.parentWorkspace_.getAudioManager().play(a, b)
};
Blockly.WorkspaceSvg = function(a, b, c) {
    Blockly.WorkspaceSvg.superClass_.constructor.call(this, a);
    this.getMetrics = a.getMetrics || Blockly.WorkspaceSvg.getTopLevelWorkspaceMetrics_;
    this.setMetrics = a.setMetrics || Blockly.WorkspaceSvg.setTopLevelWorkspaceMetrics_;
    this.connectionDBList = Blockly.ConnectionDB.init();
    b && (this.blockDragSurface_ = b);
    c && (this.workspaceDragSurface_ = c);
    this.useWorkspaceDragSurface_ = !!this.workspaceDragSurface_ && Blockly.utils.is3dSupported();
    this.highlightedBlocks_ = [];
    this.audioManager_ =
        new Blockly.WorkspaceAudio(a.parentWorkspace);
    this.grid_ = this.options.gridPattern ? new Blockly.Grid(a.gridPattern, a.gridOptions) : null;
    this.markerManager_ = new Blockly.MarkerManager(this);
    this.toolboxCategoryCallbacks_ = {};
    this.flyoutButtonCallbacks_ = {};
    Blockly.Variables && Blockly.Variables.flyoutCategory && this.registerToolboxCategoryCallback(Blockly.VARIABLE_CATEGORY_NAME, Blockly.Variables.flyoutCategory);
    Blockly.VariablesDynamic && Blockly.VariablesDynamic.flyoutCategory && this.registerToolboxCategoryCallback(Blockly.VARIABLE_DYNAMIC_CATEGORY_NAME,
        Blockly.VariablesDynamic.flyoutCategory);
    Blockly.Procedures && Blockly.Procedures.flyoutCategory && (this.registerToolboxCategoryCallback(Blockly.PROCEDURE_CATEGORY_NAME, Blockly.Procedures.flyoutCategory), this.addChangeListener(Blockly.Procedures.mutatorOpenListener));
    this.themeManager_ = this.options.parentWorkspace ? this.options.parentWorkspace.getThemeManager() : new Blockly.ThemeManager(this, this.options.theme || Blockly.Themes.Classic);
    this.themeManager_.subscribeWorkspace(this);
    this.renderer_ = Blockly.blockRendering.init(this.options.renderer ||
        "geras", this.getTheme(), this.options.rendererOverrides);
    this.cachedParentSvg_ = null;
    this.keyboardAccessibilityMode = !1
};
Blockly.utils.object.inherits(Blockly.WorkspaceSvg, Blockly.Workspace);
Blockly.WorkspaceSvg.prototype.resizeHandlerWrapper_ = null;
Blockly.WorkspaceSvg.prototype.rendered = !0;
Blockly.WorkspaceSvg.prototype.isVisible_ = !0;
Blockly.WorkspaceSvg.prototype.isFlyout = !1;
Blockly.WorkspaceSvg.prototype.isMutator = !1;
Blockly.WorkspaceSvg.prototype.resizesEnabled_ = !0;
Blockly.WorkspaceSvg.prototype.scrollX = 0;
Blockly.WorkspaceSvg.prototype.scrollY = 0;
Blockly.WorkspaceSvg.prototype.startScrollX = 0;
Blockly.WorkspaceSvg.prototype.startScrollY = 0;
Blockly.WorkspaceSvg.prototype.dragDeltaXY_ = null;
Blockly.WorkspaceSvg.prototype.scale = 1;
Blockly.WorkspaceSvg.prototype.trashcan = null;
Blockly.WorkspaceSvg.prototype.scrollbar = null;
Blockly.WorkspaceSvg.prototype.flyout_ = null;
Blockly.WorkspaceSvg.prototype.toolbox_ = null;
Blockly.WorkspaceSvg.prototype.currentGesture_ = null;
Blockly.WorkspaceSvg.prototype.blockDragSurface_ = null;
Blockly.WorkspaceSvg.prototype.workspaceDragSurface_ = null;
Blockly.WorkspaceSvg.prototype.useWorkspaceDragSurface_ = !1;
Blockly.WorkspaceSvg.prototype.isDragSurfaceActive_ = !1;
Blockly.WorkspaceSvg.prototype.injectionDiv_ = null;
Blockly.WorkspaceSvg.prototype.lastRecordedPageScroll_ = null;
Blockly.WorkspaceSvg.prototype.targetWorkspace = null;
Blockly.WorkspaceSvg.prototype.inverseScreenCTM_ = null;
Blockly.WorkspaceSvg.prototype.inverseScreenCTMDirty_ = !0;
Blockly.WorkspaceSvg.prototype.getMarkerManager = function() { return this.markerManager_ };
Blockly.WorkspaceSvg.prototype.setCursorSvg = function(a) { this.markerManager_.setCursorSvg(a) };
Blockly.WorkspaceSvg.prototype.setMarkerSvg = function(a) { this.markerManager_.setMarkerSvg(a) };
Blockly.WorkspaceSvg.prototype.getMarker = function(a) { return this.markerManager_ ? this.markerManager_.getMarker(a) : null };
Blockly.WorkspaceSvg.prototype.getCursor = function() { return this.markerManager_ ? this.markerManager_.getCursor() : null };
Blockly.WorkspaceSvg.prototype.getRenderer = function() { return this.renderer_ };
Blockly.WorkspaceSvg.prototype.getThemeManager = function() { return this.themeManager_ };
Blockly.WorkspaceSvg.prototype.getTheme = function() { return this.themeManager_.getTheme() };
Blockly.WorkspaceSvg.prototype.setTheme = function(a) {
    a || (a = Blockly.Themes.Classic);
    this.themeManager_.setTheme(a)
};
Blockly.WorkspaceSvg.prototype.refreshTheme = function() {
    this.svgGroup_ && this.renderer_.refreshDom(this.svgGroup_, this.getTheme());
    this.updateBlockStyles_(this.getAllBlocks(!1).filter(function(a) { return void 0 !== a.getStyleName() }));
    this.refreshToolboxSelection();
    this.toolbox_ && this.toolbox_.updateColourFromTheme();
    this.isVisible() && this.setVisible(!0);
    var a = new Blockly.Events.Ui(null, "theme", null, null);
    a.workspaceId = this.id;
    Blockly.Events.fire(a)
};
Blockly.WorkspaceSvg.prototype.updateBlockStyles_ = function(a) {
    for (var b = 0, c; c = a[b]; b++) {
        var d = c.getStyleName();
        d && (c.setStyle(d), c.mutator && c.mutator.updateBlockStyle())
    }
};
Blockly.WorkspaceSvg.prototype.getInverseScreenCTM = function() {
    if (this.inverseScreenCTMDirty_) {
        var a = this.getParentSvg().getScreenCTM();
        a && (this.inverseScreenCTM_ = a.inverse(), this.inverseScreenCTMDirty_ = !1)
    }
    return this.inverseScreenCTM_
};
Blockly.WorkspaceSvg.prototype.updateInverseScreenCTM = function() { this.inverseScreenCTMDirty_ = !0 };
Blockly.WorkspaceSvg.prototype.isVisible = function() { return this.isVisible_ };
Blockly.WorkspaceSvg.prototype.getSvgXY = function(a) {
    var b = 0,
        c = 0,
        d = 1;
    if (Blockly.utils.dom.containsNode(this.getCanvas(), a) || Blockly.utils.dom.containsNode(this.getBubbleCanvas(), a)) d = this.scale;
    do {
        var e = Blockly.utils.getRelativeXY(a);
        if (a == this.getCanvas() || a == this.getBubbleCanvas()) d = 1;
        b += e.x * d;
        c += e.y * d;
        a = a.parentNode
    } while (a && a != this.getParentSvg());
    return new Blockly.utils.Coordinate(b, c)
};
Blockly.WorkspaceSvg.prototype.getOriginOffsetInPixels = function() { return Blockly.utils.getInjectionDivXY_(this.getCanvas()) };
Blockly.WorkspaceSvg.prototype.getInjectionDiv = function() {
    if (!this.injectionDiv_)
        for (var a = this.svgGroup_; a;) {
            if (-1 != (" " + (a.getAttribute("class") || "") + " ").indexOf(" injectionDiv ")) { this.injectionDiv_ = a; break }
            a = a.parentNode
        }
    return this.injectionDiv_
};
Blockly.WorkspaceSvg.prototype.getBlockCanvas = function() { return this.svgBlockCanvas_ };
Blockly.WorkspaceSvg.prototype.setResizeHandlerWrapper = function(a) { this.resizeHandlerWrapper_ = a };
Blockly.WorkspaceSvg.prototype.createDom = function(a) {
    this.svgGroup_ = Blockly.utils.dom.createSvgElement("g", { "class": "blocklyWorkspace" }, null);
    a && (this.svgBackground_ = Blockly.utils.dom.createSvgElement("rect", { height: "100%", width: "100%", "class": a }, this.svgGroup_), "blocklyMainBackground" == a && this.grid_ ? this.svgBackground_.style.fill = "url(#" + this.grid_.getPatternId() + ")" : this.themeManager_.subscribe(this.svgBackground_, "workspaceBackgroundColour", "fill"));
    this.svgBlockCanvas_ = Blockly.utils.dom.createSvgElement("g", { "class": "blocklyBlockCanvas" }, this.svgGroup_);
    this.svgBubbleCanvas_ = Blockly.utils.dom.createSvgElement("g", { "class": "blocklyBubbleCanvas" }, this.svgGroup_);
    this.isFlyout || (Blockly.bindEventWithChecks_(this.svgGroup_, "mousedown", this, this.onMouseDown_, !1, !0), Blockly.bindEventWithChecks_(this.svgGroup_, "wheel", this, this.onMouseWheel_));
    if (this.options.hasCategories) {
        if (!Blockly.Toolbox) throw Error("Missing require for Blockly.Toolbox");
        this.toolbox_ = new Blockly.Toolbox(this)
    }
    this.grid_ && this.grid_.update(this.scale);
    this.recordDeleteAreas();
    this.markerManager_.setCursor(new Blockly.Cursor);
    this.markerManager_.registerMarker(Blockly.navigation.MARKER_NAME, new Blockly.Marker);
    this.renderer_.createDom(this.svgGroup_, this.getTheme());
    return this.svgGroup_
};
Blockly.WorkspaceSvg.prototype.dispose = function() {
    this.rendered = !1;
    this.currentGesture_ && this.currentGesture_.cancel();
    this.svgGroup_ && (Blockly.utils.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
    this.svgBubbleCanvas_ = this.svgBlockCanvas_ = null;
    this.toolbox_ && (this.toolbox_.dispose(), this.toolbox_ = null);
    this.flyout_ && (this.flyout_.dispose(), this.flyout_ = null);
    this.trashcan && (this.trashcan.dispose(), this.trashcan = null);
    this.scrollbar && (this.scrollbar.dispose(), this.scrollbar = null);
    this.zoomControls_ &&
        (this.zoomControls_.dispose(), this.zoomControls_ = null);
    this.audioManager_ && (this.audioManager_.dispose(), this.audioManager_ = null);
    this.grid_ && (this.grid_.dispose(), this.grid_ = null);
    this.renderer_.dispose();
    this.themeManager_ && (this.themeManager_.unsubscribeWorkspace(this), this.themeManager_.unsubscribe(this.svgBackground_), this.options.parentWorkspace || (this.themeManager_.dispose(), this.themeManager_ = null));
    this.markerManager_ && (this.markerManager_.dispose(), this.markerManager_ = null);
    Blockly.WorkspaceSvg.superClass_.dispose.call(this);
    this.flyoutButtonCallbacks_ = this.toolboxCategoryCallbacks_ = this.connectionDBList = null;
    if (!this.options.parentWorkspace) {
        var a = this.getParentSvg().parentNode;
        a && Blockly.utils.dom.removeNode(a)
    }
    this.resizeHandlerWrapper_ && (Blockly.unbindEvent_(this.resizeHandlerWrapper_), this.resizeHandlerWrapper_ = null)
};
Blockly.WorkspaceSvg.prototype.newBlock = function(a, b) { return new Blockly.BlockSvg(this, a, b) };
Blockly.WorkspaceSvg.prototype.addTrashcan = function() {
    if (!Blockly.Trashcan) throw Error("Missing require for Blockly.Trashcan");
    this.trashcan = new Blockly.Trashcan(this);
    var a = this.trashcan.createDom();
    this.svgGroup_.insertBefore(a, this.svgBlockCanvas_)
};
Blockly.WorkspaceSvg.prototype.addZoomControls = function() {
    if (!Blockly.ZoomControls) throw Error("Missing require for Blockly.ZoomControls");
    this.zoomControls_ = new Blockly.ZoomControls(this);
    var a = this.zoomControls_.createDom();
    this.svgGroup_.appendChild(a)
};
Blockly.WorkspaceSvg.prototype.addFlyout = function(a) {
    var b = new Blockly.Options({ parentWorkspace: this, rtl: this.RTL, oneBasedIndex: this.options.oneBasedIndex, horizontalLayout: this.horizontalLayout, renderer: this.options.renderer, rendererOverrides: this.options.rendererOverrides });
    b.toolboxPosition = this.options.toolboxPosition;
    if (this.horizontalLayout) {
        if (!Blockly.HorizontalFlyout) throw Error("Missing require for Blockly.HorizontalFlyout");
        this.flyout_ = new Blockly.HorizontalFlyout(b)
    } else {
        if (!Blockly.VerticalFlyout) throw Error("Missing require for Blockly.VerticalFlyout");
        this.flyout_ = new Blockly.VerticalFlyout(b)
    }
    this.flyout_.autoClose = !1;
    this.flyout_.getWorkspace().setVisible(!0);
    return this.flyout_.createDom(a)
};
Blockly.WorkspaceSvg.prototype.getFlyout = function(a) { return this.flyout_ || a ? this.flyout_ : this.toolbox_ ? this.toolbox_.getFlyout() : null };
Blockly.WorkspaceSvg.prototype.getToolbox = function() { return this.toolbox_ };
Blockly.WorkspaceSvg.prototype.updateScreenCalculations_ = function() {
    this.updateInverseScreenCTM();
    this.recordDeleteAreas()
};
Blockly.WorkspaceSvg.prototype.resizeContents = function() { this.resizesEnabled_ && this.rendered && (this.scrollbar && this.scrollbar.resize(), this.updateInverseScreenCTM()) };
Blockly.WorkspaceSvg.prototype.resize = function() {
    this.toolbox_ && this.toolbox_.position();
    this.flyout_ && this.flyout_.position();
    this.trashcan && this.trashcan.position();
    this.zoomControls_ && this.zoomControls_.position();
    this.scrollbar && this.scrollbar.resize();
    this.updateScreenCalculations_()
};
Blockly.WorkspaceSvg.prototype.updateScreenCalculationsIfScrolled = function() {
    var a = Blockly.utils.getDocumentScroll();
    Blockly.utils.Coordinate.equals(this.lastRecordedPageScroll_, a) || (this.lastRecordedPageScroll_ = a, this.updateScreenCalculations_())
};
Blockly.WorkspaceSvg.prototype.getCanvas = function() { return this.svgBlockCanvas_ };
Blockly.WorkspaceSvg.prototype.getBubbleCanvas = function() { return this.svgBubbleCanvas_ };
Blockly.WorkspaceSvg.prototype.getParentSvg = function() {
    if (!this.cachedParentSvg_)
        for (var a = this.svgGroup_; a;) {
            if ("svg" == a.tagName) { this.cachedParentSvg_ = a; break }
            a = a.parentNode
        }
    return this.cachedParentSvg_
};
Blockly.WorkspaceSvg.prototype.translate = function(a, b) {
    if (this.useWorkspaceDragSurface_ && this.isDragSurfaceActive_) this.workspaceDragSurface_.translateSurface(a, b);
    else {
        var c = "translate(" + a + "," + b + ") scale(" + this.scale + ")";
        this.svgBlockCanvas_.setAttribute("transform", c);
        this.svgBubbleCanvas_.setAttribute("transform", c)
    }
    this.blockDragSurface_ && this.blockDragSurface_.translateAndScaleGroup(a, b, this.scale);
    this.grid_ && this.grid_.moveTo(a, b)
};
Blockly.WorkspaceSvg.prototype.resetDragSurface = function() {
    if (this.useWorkspaceDragSurface_) {
        this.isDragSurfaceActive_ = !1;
        var a = this.workspaceDragSurface_.getSurfaceTranslation();
        this.workspaceDragSurface_.clearAndHide(this.svgGroup_);
        a = "translate(" + a.x + "," + a.y + ") scale(" + this.scale + ")";
        this.svgBlockCanvas_.setAttribute("transform", a);
        this.svgBubbleCanvas_.setAttribute("transform", a)
    }
};
Blockly.WorkspaceSvg.prototype.setupDragSurface = function() {
    if (this.useWorkspaceDragSurface_ && !this.isDragSurfaceActive_) {
        this.isDragSurfaceActive_ = !0;
        var a = this.svgBlockCanvas_.previousSibling,
            b = parseInt(this.getParentSvg().getAttribute("width"), 10),
            c = parseInt(this.getParentSvg().getAttribute("height"), 10),
            d = Blockly.utils.getRelativeXY(this.getCanvas());
        this.workspaceDragSurface_.setContentsAndShow(this.getCanvas(), this.getBubbleCanvas(), a, b, c, this.scale);
        this.workspaceDragSurface_.translateSurface(d.x,
            d.y)
    }
};
Blockly.WorkspaceSvg.prototype.getBlockDragSurface = function() { return this.blockDragSurface_ };
Blockly.WorkspaceSvg.prototype.getWidth = function() { var a = this.getMetrics(); return a ? a.viewWidth / this.scale : 0 };
Blockly.WorkspaceSvg.prototype.setVisible = function(a) {
    this.isVisible_ = a;
    if (this.svgGroup_)
        if (this.scrollbar && this.scrollbar.setContainerVisible(a), this.getFlyout() && this.getFlyout().setContainerVisible(a), this.getParentSvg().style.display = a ? "block" : "none", this.toolbox_ && (this.toolbox_.HtmlDiv.style.display = a ? "block" : "none"), a) {
            a = this.getAllBlocks(!1);
            for (var b = a.length - 1; 0 <= b; b--) a[b].markDirty();
            this.render();
            this.toolbox_ && this.toolbox_.position()
        } else Blockly.hideChaff(!0)
};
Blockly.WorkspaceSvg.prototype.render = function() {
    for (var a = this.getAllBlocks(!1), b = a.length - 1; 0 <= b; b--) a[b].render(!1);
    if (this.currentGesture_)
        for (a = this.currentGesture_.getInsertionMarkers(), b = 0; b < a.length; b++) a[b].render(!1);
    this.markerManager_.updateMarkers()
};
Blockly.WorkspaceSvg.prototype.traceOn = function() { console.warn("Deprecated call to traceOn, delete this.") };
Blockly.WorkspaceSvg.prototype.highlightBlock = function(a, b) {
    if (void 0 === b) {
        for (var c = 0, d; d = this.highlightedBlocks_[c]; c++) d.setHighlighted(!1);
        this.highlightedBlocks_.length = 0
    }
    if (d = a ? this.getBlockById(a) : null)(a = void 0 === b || b) ? -1 == this.highlightedBlocks_.indexOf(d) && this.highlightedBlocks_.push(d) : Blockly.utils.arrayRemove(this.highlightedBlocks_, d), d.setHighlighted(a)
};
Blockly.WorkspaceSvg.prototype.paste = function(a) {!this.rendered || a.getElementsByTagName("block").length >= this.remainingCapacity() || (this.currentGesture_ && this.currentGesture_.cancel(), "comment" == a.tagName.toLowerCase() ? this.pasteWorkspaceComment_(a) : this.pasteBlock_(a)) };
Blockly.WorkspaceSvg.prototype.pasteBlock_ = function(a) {
    Blockly.Events.disable();
    try {
        var b = Blockly.Xml.domToBlock(a, this),
            c = this.getMarker(Blockly.navigation.MARKER_NAME).getCurNode();
        if (this.keyboardAccessibilityMode && c && c.isConnection()) {
            var d = c.getLocation();
            Blockly.navigation.insertBlock(b, d);
            return
        }
        var e = parseInt(a.getAttribute("x"), 10),
            f = parseInt(a.getAttribute("y"), 10);
        if (!isNaN(e) && !isNaN(f)) {
            this.RTL && (e = -e);
            do {
                a = !1;
                var g = this.getAllBlocks(!1);
                c = 0;
                for (var h; h = g[c]; c++) {
                    var k = h.getRelativeToSurfaceXY();
                    if (1 >= Math.abs(e - k.x) && 1 >= Math.abs(f - k.y)) { a = !0; break }
                }
                if (!a) {
                    var l = b.getConnections_(!1);
                    c = 0;
                    for (var m; m = l[c]; c++)
                        if (m.closest(Blockly.SNAP_RADIUS, new Blockly.utils.Coordinate(e, f)).connection) { a = !0; break }
                }
                a && (e = this.RTL ? e - Blockly.SNAP_RADIUS : e + Blockly.SNAP_RADIUS, f += 2 * Blockly.SNAP_RADIUS)
            } while (a);
            b.moveBy(e, f)
        }
    } finally { Blockly.Events.enable() }
    Blockly.Events.isEnabled() && !b.isShadow() && Blockly.Events.fire(new Blockly.Events.BlockCreate(b));
    b.select()
};
Blockly.WorkspaceSvg.prototype.pasteWorkspaceComment_ = function(a) {
    Blockly.Events.disable();
    try {
        var b = Blockly.WorkspaceCommentSvg.fromXml(a, this),
            c = parseInt(a.getAttribute("x"), 10),
            d = parseInt(a.getAttribute("y"), 10);
        isNaN(c) || isNaN(d) || (this.RTL && (c = -c), b.moveBy(c + 50, d + 50))
    } finally { Blockly.Events.enable() }
    Blockly.Events.isEnabled();
    b.select()
};
Blockly.WorkspaceSvg.prototype.refreshToolboxSelection = function() {
    var a = this.isFlyout ? this.targetWorkspace : this;
    a && !a.currentGesture_ && a.toolbox_ && a.toolbox_.getFlyout() && a.toolbox_.refreshSelection()
};
Blockly.WorkspaceSvg.prototype.renameVariableById = function(a, b) {
    Blockly.WorkspaceSvg.superClass_.renameVariableById.call(this, a, b);
    this.refreshToolboxSelection()
};
Blockly.WorkspaceSvg.prototype.deleteVariableById = function(a) {
    Blockly.WorkspaceSvg.superClass_.deleteVariableById.call(this, a);
    this.refreshToolboxSelection()
};
Blockly.WorkspaceSvg.prototype.createVariable = function(a, b, c) {
    a = Blockly.WorkspaceSvg.superClass_.createVariable.call(this, a, b, c);
    this.refreshToolboxSelection();
    return a
};
Blockly.WorkspaceSvg.prototype.recordDeleteAreas = function() {
    this.deleteAreaTrash_ = this.trashcan && this.svgGroup_.parentNode ? this.trashcan.getClientRect() : null;
    this.deleteAreaToolbox_ = this.flyout_ ? this.flyout_.getClientRect() : this.toolbox_ ? this.toolbox_.getClientRect() : null
};
Blockly.WorkspaceSvg.prototype.isDeleteArea = function(a) { return this.deleteAreaTrash_ && this.deleteAreaTrash_.contains(a.clientX, a.clientY) ? Blockly.DELETE_AREA_TRASH : this.deleteAreaToolbox_ && this.deleteAreaToolbox_.contains(a.clientX, a.clientY) ? Blockly.DELETE_AREA_TOOLBOX : Blockly.DELETE_AREA_NONE };
Blockly.WorkspaceSvg.prototype.onMouseDown_ = function(a) {
    var b = this.getGesture(a);
    b && b.handleWsStart(a, this)
};
Blockly.WorkspaceSvg.prototype.startDrag = function(a, b) {
    a = Blockly.utils.mouseToSvg(a, this.getParentSvg(), this.getInverseScreenCTM());
    a.x /= this.scale;
    a.y /= this.scale;
    this.dragDeltaXY_ = Blockly.utils.Coordinate.difference(b, a)
};
Blockly.WorkspaceSvg.prototype.moveDrag = function(a) {
    a = Blockly.utils.mouseToSvg(a, this.getParentSvg(), this.getInverseScreenCTM());
    a.x /= this.scale;
    a.y /= this.scale;
    return Blockly.utils.Coordinate.sum(this.dragDeltaXY_, a)
};
Blockly.WorkspaceSvg.prototype.isDragging = function() { return null != this.currentGesture_ && this.currentGesture_.isDragging() };
Blockly.WorkspaceSvg.prototype.isDraggable = function() { return this.options.moveOptions && this.options.moveOptions.drag };
Blockly.WorkspaceSvg.prototype.isContentBounded = function() { return this.options.moveOptions && this.options.moveOptions.scrollbars || this.options.moveOptions && this.options.moveOptions.wheel || this.options.moveOptions && this.options.moveOptions.drag || this.options.zoomOptions && this.options.zoomOptions.controls || this.options.zoomOptions && this.options.zoomOptions.wheel || this.options.zoomOptions && this.options.zoomOptions.pinch };
Blockly.WorkspaceSvg.prototype.isMovable = function() { return this.options.moveOptions && this.options.moveOptions.scrollbars || this.options.moveOptions && this.options.moveOptions.wheel || this.options.moveOptions && this.options.moveOptions.drag || this.options.zoomOptions && this.options.zoomOptions.wheel || this.options.zoomOptions && this.options.zoomOptions.pinch };
Blockly.WorkspaceSvg.prototype.onMouseWheel_ = function(a) {
    if (Blockly.Gesture.inProgress()) a.preventDefault(), a.stopPropagation();
    else {
        var b = this.options.zoomOptions && this.options.zoomOptions.wheel,
            c = this.options.moveOptions && this.options.moveOptions.wheel;
        if (b || c) {
            var d = Blockly.utils.getScrollDeltaPixels(a);
            !b || !a.ctrlKey && c ? (b = this.scrollX - d.x, c = this.scrollY - d.y, a.shiftKey && !d.x && (b = this.scrollX - d.y, c = this.scrollY), this.scroll(b, c)) : (d = -d.y / 50, b = Blockly.utils.mouseToSvg(a, this.getParentSvg(), this.getInverseScreenCTM()),
                this.zoom(b.x, b.y, d));
            a.preventDefault()
        }
    }
};
Blockly.WorkspaceSvg.prototype.getBlocksBoundingBox = function() {
    var a = this.getTopBlocks(!1),
        b = this.getTopComments(!1);
    a = a.concat(b);
    if (!a.length) return new Blockly.utils.Rect(0, 0, 0, 0);
    b = a[0].getBoundingRectangle();
    for (var c = 1; c < a.length; c++) {
        var d = a[c].getBoundingRectangle();
        d.top < b.top && (b.top = d.top);
        d.bottom > b.bottom && (b.bottom = d.bottom);
        d.left < b.left && (b.left = d.left);
        d.right > b.right && (b.right = d.right)
    }
    return b
};
Blockly.WorkspaceSvg.prototype.cleanUp = function() {
    this.setResizesEnabled(!1);
    Blockly.Events.setGroup(!0);
    for (var a = this.getTopBlocks(!0), b = 0, c = 0, d; d = a[c]; c++)
        if (d.isMovable()) {
            var e = d.getRelativeToSurfaceXY();
            d.moveBy(-e.x, b - e.y);
            d.snapToGrid();
            b = d.getRelativeToSurfaceXY().y + d.getHeightWidth().height + this.renderer_.getConstants().MIN_BLOCK_HEIGHT
        }
    Blockly.Events.setGroup(!1);
    this.setResizesEnabled(!0)
};
Blockly.WorkspaceSvg.prototype.showContextMenu = function(a) {
    function b(a) {
        if (a.isDeletable()) p = p.concat(a.getDescendants(!1));
        else { a = a.getChildren(!1); for (var c = 0; c < a.length; c++) b(a[c]) }
    }

    function c() {
        Blockly.Events.setGroup(f);
        var a = p.shift();
        a && (a.workspace ? (a.dispose(!1, !0), setTimeout(c, 10)) : c());
        Blockly.Events.setGroup(!1)
    }
    if (!this.options.readOnly && !this.isFlyout) {
        var d = [],
            e = this.getTopBlocks(!0),
            f = Blockly.utils.genUid(),
            g = this,
            h = {};
        h.text = Blockly.Msg.UNDO;
        h.enabled = 0 < this.undoStack_.length;
        h.callback =
            this.undo.bind(this, !1);
        d.push(h);
        h = {};
        h.text = Blockly.Msg.REDO;
        h.enabled = 0 < this.redoStack_.length;
        h.callback = this.undo.bind(this, !0);
        d.push(h);
        this.isMovable() && (h = {}, h.text = Blockly.Msg.CLEAN_UP, h.enabled = 1 < e.length, h.callback = this.cleanUp.bind(this), d.push(h));
        if (this.options.collapse) {
            for (var k = h = !1, l = 0; l < e.length; l++)
                for (var m = e[l]; m;) m.isCollapsed() ? h = !0 : k = !0, m = m.getNextBlock();
            var n = function(a) {
                for (var b = 0, c = 0; c < e.length; c++)
                    for (var d = e[c]; d;) setTimeout(d.setCollapsed.bind(d, a), b), d = d.getNextBlock(),
                        b += 10
            };
            k = { enabled: k };
            k.text = Blockly.Msg.COLLAPSE_ALL;
            k.callback = function() { n(!0) };
            d.push(k);
            h = { enabled: h };
            h.text = Blockly.Msg.EXPAND_ALL;
            h.callback = function() { n(!1) };
            d.push(h)
        }
        var p = [];
        for (l = 0; l < e.length; l++) b(e[l]);
        h = {
            text: 1 == p.length ? Blockly.Msg.DELETE_BLOCK : Blockly.Msg.DELETE_X_BLOCKS.replace("%1", String(p.length)),
            enabled: 0 < p.length,
            callback: function() {
                g.currentGesture_ && g.currentGesture_.cancel();
                2 > p.length ? c() : Blockly.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace("%1", p.length), function(a) {
                    a &&
                        c()
                })
            }
        };
        d.push(h);
        this.configureContextMenu && this.configureContextMenu(d, a);
        Blockly.ContextMenu.show(a, d, this.RTL)
    }
};
Blockly.WorkspaceSvg.prototype.updateToolbox = function(a) {
    if (a = Blockly.Options.parseToolboxTree(a)) {
        if (!this.options.languageTree) throw Error("Existing toolbox is null.  Can't create new toolbox.");
        if (a.getElementsByTagName("category").length) {
            if (!this.toolbox_) throw Error("Existing toolbox has no categories.  Can't change mode.");
            this.options.languageTree = a;
            this.toolbox_.renderTree(a)
        } else {
            if (!this.flyout_) throw Error("Existing toolbox has categories.  Can't change mode.");
            this.options.languageTree =
                a;
            this.flyout_.show(a.childNodes)
        }
    } else if (this.options.languageTree) throw Error("Can't nullify an existing toolbox.");
};
Blockly.WorkspaceSvg.prototype.markFocused = function() { this.options.parentWorkspace ? this.options.parentWorkspace.markFocused() : (Blockly.mainWorkspace = this, this.setBrowserFocus()) };
Blockly.WorkspaceSvg.prototype.setBrowserFocus = function() { document.activeElement && document.activeElement.blur(); try { this.getParentSvg().focus({ preventScroll: !0 }) } catch (a) { try { this.getParentSvg().parentNode.setActive() } catch (b) { this.getParentSvg().parentNode.focus({ preventScroll: !0 }) } } };
Blockly.WorkspaceSvg.prototype.zoom = function(a, b, c) {
    c = Math.pow(this.options.zoomOptions.scaleSpeed, c);
    var d = this.scale * c;
    if (this.scale != d) {
        d > this.options.zoomOptions.maxScale ? c = this.options.zoomOptions.maxScale / this.scale : d < this.options.zoomOptions.minScale && (c = this.options.zoomOptions.minScale / this.scale);
        var e = this.getCanvas().getCTM(),
            f = this.getParentSvg().createSVGPoint();
        f.x = a;
        f.y = b;
        f = f.matrixTransform(e.inverse());
        a = f.x;
        b = f.y;
        e = e.translate(a * (1 - c), b * (1 - c)).scale(c);
        this.scrollX = e.e;
        this.scrollY =
            e.f;
        this.setScale(d)
    }
};
Blockly.WorkspaceSvg.prototype.zoomCenter = function(a) {
    var b = this.getMetrics();
    if (this.flyout_) {
        var c = b.svgWidth / 2;
        b = b.svgHeight / 2
    } else c = b.viewWidth / 2 + b.absoluteLeft, b = b.viewHeight / 2 + b.absoluteTop;
    this.zoom(c, b, a)
};
Blockly.WorkspaceSvg.prototype.zoomToFit = function() {
    if (this.isMovable()) {
        var a = this.getMetrics(),
            b = a.viewWidth;
        a = a.viewHeight;
        var c = this.getBlocksBoundingBox(),
            d = c.right - c.left;
        c = c.bottom - c.top;
        d && (this.flyout_ && (this.horizontalLayout ? (a += this.flyout_.getHeight(), c += this.flyout_.getHeight() / this.scale) : (b += this.flyout_.getWidth(), d += this.flyout_.getWidth() / this.scale)), this.setScale(Math.min(b / d, a / c)), this.scrollCenter())
    } else console.warn("Tried to move a non-movable workspace. This could result in blocks becoming inaccessible.")
};
Blockly.WorkspaceSvg.prototype.beginCanvasTransition = function() {
    Blockly.utils.dom.addClass(this.svgBlockCanvas_, "blocklyCanvasTransitioning");
    Blockly.utils.dom.addClass(this.svgBubbleCanvas_, "blocklyCanvasTransitioning")
};
Blockly.WorkspaceSvg.prototype.endCanvasTransition = function() {
    Blockly.utils.dom.removeClass(this.svgBlockCanvas_, "blocklyCanvasTransitioning");
    Blockly.utils.dom.removeClass(this.svgBubbleCanvas_, "blocklyCanvasTransitioning")
};
Blockly.WorkspaceSvg.prototype.scrollCenter = function() {
    if (this.isMovable()) {
        var a = this.getMetrics(),
            b = (a.contentWidth - a.viewWidth) / 2,
            c = (a.contentHeight - a.viewHeight) / 2;
        b = -b - a.contentLeft;
        c = -c - a.contentTop;
        this.scroll(b, c)
    } else console.warn("Tried to move a non-movable workspace. This could result in blocks becoming inaccessible.")
};
Blockly.WorkspaceSvg.prototype.centerOnBlock = function(a) {
    if (this.isMovable()) {
        if (a = a ? this.getBlockById(a) : null) {
            var b = a.getRelativeToSurfaceXY(),
                c = a.getHeightWidth(),
                d = this.scale;
            a = (b.x + (this.RTL ? -1 : 1) * c.width / 2) * d;
            b = (b.y + c.height / 2) * d;
            c = this.getMetrics();
            this.scroll(-(a - c.viewWidth / 2), -(b - c.viewHeight / 2))
        }
    } else console.warn("Tried to move a non-movable workspace. This could result in blocks becoming inaccessible.")
};
Blockly.WorkspaceSvg.prototype.setScale = function(a) {
    this.options.zoomOptions.maxScale && a > this.options.zoomOptions.maxScale ? a = this.options.zoomOptions.maxScale : this.options.zoomOptions.minScale && a < this.options.zoomOptions.minScale && (a = this.options.zoomOptions.minScale);
    this.scale = a;
    Blockly.hideChaff(!1);
    this.flyout_ && (this.flyout_.reflow(), this.recordDeleteAreas());
    this.grid_ && this.grid_.update(this.scale);
    a = this.getMetrics();
    this.scrollX -= a.absoluteLeft;
    this.scrollY -= a.absoluteTop;
    a.viewLeft += a.absoluteLeft;
    a.viewTop += a.absoluteTop;
    this.scroll(this.scrollX, this.scrollY);
    this.scrollbar && (this.flyout_ ? (this.scrollbar.hScroll.resizeViewHorizontal(a), this.scrollbar.vScroll.resizeViewVertical(a)) : (this.scrollbar.hScroll.resizeContentHorizontal(a), this.scrollbar.vScroll.resizeContentVertical(a)))
};
Blockly.WorkspaceSvg.prototype.getScale = function() { return this.options.parentWorkspace ? this.options.parentWorkspace.getScale() : this.scale };
Blockly.WorkspaceSvg.prototype.scroll = function(a, b) {
    Blockly.hideChaff(!0);
    var c = this.getMetrics(),
        d = c.contentWidth + c.contentLeft - c.viewWidth,
        e = c.contentHeight + c.contentTop - c.viewHeight;
    a = Math.min(a, -c.contentLeft);
    b = Math.min(b, -c.contentTop);
    a = Math.max(a, -d);
    b = Math.max(b, -e);
    this.scrollX = a;
    this.scrollY = b;
    this.scrollbar && (this.scrollbar.hScroll.setHandlePosition(-(a + c.contentLeft) * this.scrollbar.hScroll.ratio_), this.scrollbar.vScroll.setHandlePosition(-(b + c.contentTop) * this.scrollbar.vScroll.ratio_));
    a += c.absoluteLeft;
    b += c.absoluteTop;
    this.translate(a, b)
};
Blockly.WorkspaceSvg.getDimensionsPx_ = function(a) {
    var b = 0,
        c = 0;
    a && (b = a.getWidth(), c = a.getHeight());
    return { width: b, height: c }
};
Blockly.WorkspaceSvg.getContentDimensions_ = function(a, b) { return a.isContentBounded() ? Blockly.WorkspaceSvg.getContentDimensionsBounded_(a, b) : Blockly.WorkspaceSvg.getContentDimensionsExact_(a) };
Blockly.WorkspaceSvg.getContentDimensionsExact_ = function(a) {
    var b = a.getBlocksBoundingBox(),
        c = a.scale;
    a = b.top * c;
    var d = b.bottom * c,
        e = b.left * c;
    b = b.right * c;
    return { top: a, bottom: d, left: e, right: b, width: b - e, height: d - a }
};
Blockly.WorkspaceSvg.getContentDimensionsBounded_ = function(a, b) {
    a = Blockly.WorkspaceSvg.getContentDimensionsExact_(a);
    var c = b.width;
    b = b.height;
    var d = c / 2,
        e = b / 2,
        f = Math.min(a.left - d, a.right - c),
        g = Math.min(a.top - e, a.bottom - b);
    return { left: f, top: g, height: Math.max(a.bottom + e, a.top + b) - g, width: Math.max(a.right + d, a.left + c) - f }
};
Blockly.WorkspaceSvg.getTopLevelWorkspaceMetrics_ = function() {
    var a = Blockly.WorkspaceSvg.getDimensionsPx_(this.toolbox_),
        b = Blockly.WorkspaceSvg.getDimensionsPx_(this.flyout_),
        c = Blockly.svgSize(this.getParentSvg()),
        d = { height: c.height, width: c.width };
    if (this.toolbox_)
        if (this.toolboxPosition == Blockly.TOOLBOX_AT_TOP || this.toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM) d.height -= a.height;
        else { if (this.toolboxPosition == Blockly.TOOLBOX_AT_LEFT || this.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT) d.width -= a.width }
    else if (this.flyout_)
        if (this.toolboxPosition ==
            Blockly.TOOLBOX_AT_TOP || this.toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM) d.height -= b.height;
        else if (this.toolboxPosition == Blockly.TOOLBOX_AT_LEFT || this.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT) d.width -= b.width;
    var e = Blockly.WorkspaceSvg.getContentDimensions_(this, d),
        f = 0;
    this.toolbox_ && this.toolboxPosition == Blockly.TOOLBOX_AT_LEFT ? f = a.width : this.flyout_ && this.toolboxPosition == Blockly.TOOLBOX_AT_LEFT && (f = b.width);
    var g = 0;
    this.toolbox_ && this.toolboxPosition == Blockly.TOOLBOX_AT_TOP ? g = a.height : this.flyout_ &&
        this.toolboxPosition == Blockly.TOOLBOX_AT_TOP && (g = b.height);
    return { contentHeight: e.height, contentWidth: e.width, contentTop: e.top, contentLeft: e.left, viewHeight: d.height, viewWidth: d.width, viewTop: -this.scrollY, viewLeft: -this.scrollX, absoluteTop: g, absoluteLeft: f, svgHeight: c.height, svgWidth: c.width, toolboxWidth: a.width, toolboxHeight: a.height, flyoutWidth: b.width, flyoutHeight: b.height, toolboxPosition: this.toolboxPosition }
};
Blockly.WorkspaceSvg.setTopLevelWorkspaceMetrics_ = function(a) {
    var b = this.getMetrics();
    "number" == typeof a.x && (this.scrollX = -b.contentWidth * a.x - b.contentLeft);
    "number" == typeof a.y && (this.scrollY = -b.contentHeight * a.y - b.contentTop);
    this.translate(this.scrollX + b.absoluteLeft, this.scrollY + b.absoluteTop)
};
Blockly.WorkspaceSvg.prototype.getBlockById = function(a) { return Blockly.WorkspaceSvg.superClass_.getBlockById.call(this, a) };
Blockly.WorkspaceSvg.prototype.getTopBlocks = function(a) { return Blockly.WorkspaceSvg.superClass_.getTopBlocks.call(this, a) };
Blockly.WorkspaceSvg.prototype.setResizesEnabled = function(a) {
    var b = !this.resizesEnabled_ && a;
    this.resizesEnabled_ = a;
    b && this.resizeContents()
};
Blockly.WorkspaceSvg.prototype.clear = function() {
    this.setResizesEnabled(!1);
    Blockly.WorkspaceSvg.superClass_.clear.call(this);
    this.setResizesEnabled(!0)
};
Blockly.WorkspaceSvg.prototype.registerButtonCallback = function(a, b) {
    if ("function" != typeof b) throw TypeError("Button callbacks must be functions.");
    this.flyoutButtonCallbacks_[a] = b
};
Blockly.WorkspaceSvg.prototype.getButtonCallback = function(a) { return (a = this.flyoutButtonCallbacks_[a]) ? a : null };
Blockly.WorkspaceSvg.prototype.removeButtonCallback = function(a) { this.flyoutButtonCallbacks_[a] = null };
Blockly.WorkspaceSvg.prototype.registerToolboxCategoryCallback = function(a, b) {
    if ("function" != typeof b) throw TypeError("Toolbox category callbacks must be functions.");
    this.toolboxCategoryCallbacks_[a] = b
};
Blockly.WorkspaceSvg.prototype.getToolboxCategoryCallback = function(a) { return this.toolboxCategoryCallbacks_[a] || null };
Blockly.WorkspaceSvg.prototype.removeToolboxCategoryCallback = function(a) { this.toolboxCategoryCallbacks_[a] = null };
Blockly.WorkspaceSvg.prototype.getGesture = function(a) {
    var b = "mousedown" == a.type || "touchstart" == a.type || "pointerdown" == a.type,
        c = this.currentGesture_;
    return c ? b && c.hasStarted() ? (console.warn("Tried to start the same gesture twice."), c.cancel(), null) : c : b ? this.currentGesture_ = new Blockly.TouchGesture(a, this) : null
};
Blockly.WorkspaceSvg.prototype.clearGesture = function() { this.currentGesture_ = null };
Blockly.WorkspaceSvg.prototype.cancelCurrentGesture = function() { this.currentGesture_ && this.currentGesture_.cancel() };
Blockly.WorkspaceSvg.prototype.getAudioManager = function() { return this.audioManager_ };
Blockly.WorkspaceSvg.prototype.getGrid = function() { return this.grid_ };
Blockly.inject = function(a, b) {
    Blockly.checkBlockColourConstants();
    "string" == typeof a && (a = document.getElementById(a) || document.querySelector(a));
    if (!a || !Blockly.utils.dom.containsNode(document, a)) throw Error("Error: container is not in current document.");
    b = new Blockly.Options(b || {});
    var c = document.createElement("div");
    c.className = "injectionDiv";
    c.tabIndex = 0;
    Blockly.utils.aria.setState(c, Blockly.utils.aria.State.LABEL, Blockly.Msg.WORKSPACE_ARIA_LABEL);
    a.appendChild(c);
    a = Blockly.createDom_(c, b);
    var d =
        new Blockly.BlockDragSurfaceSvg(c),
        e = new Blockly.WorkspaceDragSurfaceSvg(c),
        f = Blockly.createMainWorkspace_(a, b, d, e);
    Blockly.user.keyMap.setKeyMap(b.keyMap);
    Blockly.init_(f);
    Blockly.mainWorkspace = f;
    Blockly.svgResize(f);
    c.addEventListener("focusin", function() { Blockly.mainWorkspace = f });
    return f
};
Blockly.createDom_ = function(a, b) {
    a.setAttribute("dir", "LTR");
    Blockly.Component.defaultRightToLeft = b.RTL;
    Blockly.Css.inject(b.hasCss, b.pathToMedia);
    a = Blockly.utils.dom.createSvgElement("svg", { xmlns: Blockly.utils.dom.SVG_NS, "xmlns:html": Blockly.utils.dom.HTML_NS, "xmlns:xlink": Blockly.utils.dom.XLINK_NS, version: "1.1", "class": "blocklySvg", tabindex: "0" }, a);
    var c = Blockly.utils.dom.createSvgElement("defs", {}, a),
        d = String(Math.random()).substring(2);
    b.gridPattern = Blockly.Grid.createDom(d, b.gridOptions, c);
    return a
};
Blockly.createMainWorkspace_ = function(a, b, c, d) {
    b.parentWorkspace = null;
    var e = new Blockly.WorkspaceSvg(b, c, d);
    b = e.options;
    e.scale = b.zoomOptions.startScale;
    a.appendChild(e.createDom("blocklyMainBackground"));
    Blockly.utils.dom.addClass(e.getInjectionDiv(), e.getRenderer().getClassName());
    Blockly.utils.dom.addClass(e.getInjectionDiv(), e.getTheme().getClassName());
    !b.hasCategories && b.languageTree && (c = e.addFlyout("svg"), Blockly.utils.dom.insertAfter(c, a));
    b.hasTrashcan && e.addTrashcan();
    b.zoomOptions && b.zoomOptions.controls &&
        e.addZoomControls();
    e.getThemeManager().subscribe(a, "workspaceBackgroundColour", "background-color");
    e.translate(0, 0);
    b.readOnly || e.isMovable() || e.addChangeListener(function(a) {
        if (!e.isDragging() && !e.isMovable() && -1 != Blockly.Events.BUMP_EVENTS.indexOf(a.type)) {
            var b = Object.create(null),
                c = e.getMetrics(),
                d = e.scale;
            b.RTL = e.RTL;
            b.viewLeft = c.viewLeft / d;
            b.viewTop = c.viewTop / d;
            b.viewRight = (c.viewLeft + c.viewWidth) / d;
            b.viewBottom = (c.viewTop + c.viewHeight) / d;
            e.isContentBounded() ? (c = e.getBlocksBoundingBox(), b.contentLeft =
                c.left, b.contentTop = c.top, b.contentRight = c.right, b.contentBottom = c.bottom) : (b.contentLeft = c.contentLeft / d, b.contentTop = c.contentTop / d, b.contentRight = (c.contentLeft + c.contentWidth) / d, b.contentBottom = (c.contentTop + c.contentHeight) / d);
            if (b.contentTop < b.viewTop || b.contentBottom > b.viewBottom || b.contentLeft < b.viewLeft || b.contentRight > b.viewRight) {
                c = null;
                a && (c = Blockly.Events.getGroup(), Blockly.Events.setGroup(a.group));
                switch (a.type) {
                    case Blockly.Events.BLOCK_CREATE:
                    case Blockly.Events.BLOCK_MOVE:
                        var f =
                            e.getBlockById(a.blockId);
                        f && (f = f.getRootBlock());
                        break;
                    case Blockly.Events.COMMENT_CREATE:
                    case Blockly.Events.COMMENT_MOVE:
                        f = e.getCommentById(a.commentId)
                }
                if (f) {
                    d = f.getBoundingRectangle();
                    d.height = d.bottom - d.top;
                    d.width = d.right - d.left;
                    var m = b.viewTop,
                        n = b.viewBottom - d.height;
                    n = Math.max(m, n);
                    m = Blockly.utils.math.clamp(m, d.top, n) - d.top;
                    n = b.viewLeft;
                    var p = b.viewRight - d.width;
                    b.RTL ? n = Math.min(p, n) : p = Math.max(n, p);
                    b = Blockly.utils.math.clamp(n, d.left, p) - d.left;
                    f.moveBy(b, m)
                }
                a && (!a.group && f && console.log("WARNING: Moved object in bounds but there was no event group. This may break undo."),
                    null !== c && Blockly.Events.setGroup(c))
            }
        }
    });
    Blockly.svgResize(e);
    Blockly.WidgetDiv.createDom();
    Blockly.DropDownDiv.createDom();
    Blockly.Tooltip.createDom();
    return e
};
Blockly.init_ = function(a) {
    var b = a.options,
        c = a.getParentSvg();
    Blockly.bindEventWithChecks_(c.parentNode, "contextmenu", null, function(a) { Blockly.utils.isTargetInput(a) || a.preventDefault() });
    c = Blockly.bindEventWithChecks_(window, "resize", null, function() {
        Blockly.hideChaff(!0);
        Blockly.svgResize(a)
    });
    a.setResizeHandlerWrapper(c);
    Blockly.inject.bindDocumentEvents_();
    if (b.languageTree) {
        c = a.getToolbox();
        var d = a.getFlyout(!0);
        c ? c.init() : d && (d.init(a), d.show(b.languageTree.childNodes), d.scrollToStart())
    }
    c = Blockly.Scrollbar.scrollbarThickness;
    b.hasTrashcan && (c = a.trashcan.init(c));
    b.zoomOptions && b.zoomOptions.controls && a.zoomControls_.init(c);
    b.moveOptions && b.moveOptions.scrollbars ? (a.scrollbar = new Blockly.ScrollbarPair(a), a.scrollbar.resize()) : a.setMetrics({ x: .5, y: .5 });
    b.hasSounds && Blockly.inject.loadSounds_(b.pathToMedia, a)
};
Blockly.inject.bindDocumentEvents_ = function() {
    Blockly.documentEventsBound_ || (Blockly.bindEventWithChecks_(document, "scroll", null, function() { for (var a = Blockly.Workspace.getAll(), b = 0, c; c = a[b]; b++) c.updateInverseScreenCTM && c.updateInverseScreenCTM() }), Blockly.bindEventWithChecks_(document, "keydown", null, Blockly.onKeyDown), Blockly.bindEvent_(document, "touchend", null, Blockly.longStop_), Blockly.bindEvent_(document, "touchcancel", null, Blockly.longStop_), Blockly.utils.userAgent.IPAD && Blockly.bindEventWithChecks_(window,
        "orientationchange", document,
        function() { Blockly.svgResize(Blockly.getMainWorkspace()) }));
    Blockly.documentEventsBound_ = !0
};
Blockly.inject.loadSounds_ = function(a, b) {
    var c = b.getAudioManager();
    var d = [];
    a = function() {
        for (; d.length;) Blockly.unbindEvent_(d.pop());
        c.preload()
    };
    d.push(Blockly.bindEventWithChecks_(document, "mousemove", null, a, !0));
    d.push(Blockly.bindEventWithChecks_(document, "touchstart", null, a, !0))
};
Blockly.Names = function(a, b) {
    this.variablePrefix_ = b || "";
    this.reservedDict_ = Object.create(null);
    if (a)
        for (a = a.split(","), b = 0; b < a.length; b++) this.reservedDict_[a[b]] = !0;
    this.reset()
};
Blockly.Names.DEVELOPER_VARIABLE_TYPE = "DEVELOPER_VARIABLE";
Blockly.Names.prototype.reset = function() {
    this.db_ = Object.create(null);
    this.dbReverse_ = Object.create(null);
    this.variableMap_ = null
};
Blockly.Names.prototype.setVariableMap = function(a) { this.variableMap_ = a };
Blockly.Names.prototype.getNameForUserVariable_ = function(a) { return this.variableMap_ ? (a = this.variableMap_.getVariableById(a)) ? a.name : null : (console.log("Deprecated call to Blockly.Names.prototype.getName without defining a variable map. To fix, add the following code in your generator's init() function:\nBlockly.YourGeneratorName.variableDB_.setVariableMap(workspace.getVariableMap());"), null) };
Blockly.Names.prototype.getName = function(a, b) {
    if (b == Blockly.VARIABLE_CATEGORY_NAME) {
        var c = this.getNameForUserVariable_(a);
        c && (a = c)
    }
    c = a.toLowerCase() + "_" + b;
    var d = b == Blockly.VARIABLE_CATEGORY_NAME || b == Blockly.Names.DEVELOPER_VARIABLE_TYPE ? this.variablePrefix_ : "";
    if (c in this.db_) return d + this.db_[c];
    a = this.getDistinctName(a, b);
    this.db_[c] = a.substr(d.length);
    return a
};
Blockly.Names.prototype.getDistinctName = function(a, b) {
    a = this.safeName_(a);
    for (var c = ""; this.dbReverse_[a + c] || a + c in this.reservedDict_;) c = c ? c + 1 : 2;
    a += c;
    this.dbReverse_[a] = !0;
    return (b == Blockly.VARIABLE_CATEGORY_NAME || b == Blockly.Names.DEVELOPER_VARIABLE_TYPE ? this.variablePrefix_ : "") + a
};
Blockly.Names.prototype.safeName_ = function(a) { a ? (a = encodeURI(a.replace(/ /g, "_")).replace(/[^\w]/g, "_"), -1 != "0123456789".indexOf(a[0]) && (a = "my_" + a)) : a = Blockly.Msg.UNNAMED_KEY || "unnamed"; return a };
Blockly.Names.equals = function(a, b) { return a.toLowerCase() == b.toLowerCase() };
Blockly.Procedures = {};
Blockly.Procedures.NAME_TYPE = Blockly.PROCEDURE_CATEGORY_NAME;
Blockly.Procedures.DEFAULT_ARG = "x";
Blockly.Procedures.allProcedures = function(a) {
    a = a.getAllBlocks(!1);
    for (var b = [], c = [], d = 0; d < a.length; d++)
        if (a[d].getProcedureDef) {
            var e = a[d].getProcedureDef();
            e && (e[2] ? b.push(e) : c.push(e))
        }
    c.sort(Blockly.Procedures.procTupleComparator_);
    b.sort(Blockly.Procedures.procTupleComparator_);
    return [c, b]
};
Blockly.Procedures.procTupleComparator_ = function(a, b) { return a[0].toLowerCase().localeCompare(b[0].toLowerCase()) };
Blockly.Procedures.findLegalName = function(a, b) {
    if (b.isInFlyout) return a;
    for (a = a || Blockly.Msg.UNNAMED_KEY || "unnamed"; !Blockly.Procedures.isLegalName_(a, b.workspace, b);) {
        var c = a.match(/^(.*?)(\d+)$/);
        a = c ? c[1] + (parseInt(c[2], 10) + 1) : a + "2"
    }
    return a
};
Blockly.Procedures.isLegalName_ = function(a, b, c) { return !Blockly.Procedures.isNameUsed(a, b, c) };
Blockly.Procedures.isNameUsed = function(a, b, c) {
    b = b.getAllBlocks(!1);
    for (var d = 0; d < b.length; d++)
        if (b[d] != c && b[d].getProcedureDef) { var e = b[d].getProcedureDef(); if (Blockly.Names.equals(e[0], a)) return !0 }
    return !1
};
Blockly.Procedures.rename = function(a) {
    a = a.trim();
    var b = Blockly.Procedures.findLegalName(a, this.getSourceBlock()),
        c = this.getValue();
    if (c != a && c != b) { a = this.getSourceBlock().workspace.getAllBlocks(!1); for (var d = 0; d < a.length; d++) a[d].renameProcedure && a[d].renameProcedure(c, b) }
    return b
};
Blockly.Procedures.flyoutCategory = function(a) {
    function b(a, b) {
        for (var d = 0; d < a.length; d++) {
            var e = a[d][0],
                f = a[d][1],
                g = Blockly.utils.xml.createElement("block");
            g.setAttribute("type", b);
            g.setAttribute("gap", 16);
            var n = Blockly.utils.xml.createElement("mutation");
            n.setAttribute("name", e);
            g.appendChild(n);
            for (e = 0; e < f.length; e++) {
                var p = Blockly.utils.xml.createElement("arg");
                p.setAttribute("name", f[e]);
                n.appendChild(p)
            }
            c.push(g)
        }
    }
    var c = [];
    if (Blockly.Blocks.procedures_defnoreturn) {
        var d = Blockly.utils.xml.createElement("block");
        d.setAttribute("type", "procedures_defnoreturn");
        d.setAttribute("gap", 16);
        var e = Blockly.utils.xml.createElement("field");
        e.setAttribute("name", "NAME");
        e.appendChild(Blockly.utils.xml.createTextNode(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE));
        d.appendChild(e);
        c.push(d)
    }
    Blockly.Blocks.procedures_defreturn && (d = Blockly.utils.xml.createElement("block"), d.setAttribute("type", "procedures_defreturn"), d.setAttribute("gap", 16), e = Blockly.utils.xml.createElement("field"), e.setAttribute("name", "NAME"), e.appendChild(Blockly.utils.xml.createTextNode(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE)),
        d.appendChild(e), c.push(d));
    Blockly.Blocks.procedures_ifreturn && (d = Blockly.utils.xml.createElement("block"), d.setAttribute("type", "procedures_ifreturn"), d.setAttribute("gap", 16), c.push(d));
    c.length && c[c.length - 1].setAttribute("gap", 24);
    a = Blockly.Procedures.allProcedures(a);
    b(a[0], "procedures_callnoreturn");
    b(a[1], "procedures_callreturn");
    return c
};
Blockly.Procedures.updateMutatorFlyout_ = function(a) {
    for (var b = [], c = a.getBlocksByType("procedures_mutatorarg", !1), d = 0, e; e = c[d]; d++) b.push(e.getFieldValue("NAME"));
    c = Blockly.utils.xml.createElement("xml");
    d = Blockly.utils.xml.createElement("block");
    d.setAttribute("type", "procedures_mutatorarg");
    e = Blockly.utils.xml.createElement("field");
    e.setAttribute("name", "NAME");
    b = Blockly.Variables.generateUniqueNameFromOptions(Blockly.Procedures.DEFAULT_ARG, b);
    b = Blockly.utils.xml.createTextNode(b);
    e.appendChild(b);
    d.appendChild(e);
    c.appendChild(d);
    a.updateToolbox(c)
};
Blockly.Procedures.mutatorOpenListener = function(a) { if (a.type == Blockly.Events.UI && "mutatorOpen" == a.element && a.newValue) { a = Blockly.Workspace.getById(a.workspaceId).getBlockById(a.blockId); var b = a.type; if ("procedures_defnoreturn" == b || "procedures_defreturn" == b) a = a.mutator.getWorkspace(), Blockly.Procedures.updateMutatorFlyout_(a), a.addChangeListener(Blockly.Procedures.mutatorChangeListener_) } };
Blockly.Procedures.mutatorChangeListener_ = function(a) { if (a.type == Blockly.Events.BLOCK_CREATE || a.type == Blockly.Events.BLOCK_DELETE || a.type == Blockly.Events.BLOCK_CHANGE) a = Blockly.Workspace.getById(a.workspaceId), Blockly.Procedures.updateMutatorFlyout_(a) };
Blockly.Procedures.getCallers = function(a, b) {
    var c = [];
    b = b.getAllBlocks(!1);
    for (var d = 0; d < b.length; d++)
        if (b[d].getProcedureCall) {
            var e = b[d].getProcedureCall();
            e && Blockly.Names.equals(e, a) && c.push(b[d])
        }
    return c
};
Blockly.Procedures.mutateCallers = function(a) {
    var b = Blockly.Events.recordUndo,
        c = a.getProcedureDef()[0],
        d = a.mutationToDom(!0);
    a = Blockly.Procedures.getCallers(c, a.workspace);
    c = 0;
    for (var e; e = a[c]; c++) {
        var f = e.mutationToDom();
        f = f && Blockly.Xml.domToText(f);
        e.domToMutation(d);
        var g = e.mutationToDom();
        g = g && Blockly.Xml.domToText(g);
        f != g && (Blockly.Events.recordUndo = !1, Blockly.Events.fire(new Blockly.Events.BlockChange(e, "mutation", null, f, g)), Blockly.Events.recordUndo = b)
    }
};
Blockly.Procedures.getDefinition = function(a, b) {
    b = b.getTopBlocks(!1);
    for (var c = 0; c < b.length; c++)
        if (b[c].getProcedureDef) { var d = b[c].getProcedureDef(); if (d && Blockly.Names.equals(d[0], a)) return b[c] }
    return null
};
Blockly.VariableModel = function(a, b, c, d) {
    this.workspace = a;
    this.name = b;
    this.type = c || "";
    this.id_ = d || Blockly.utils.genUid();
    Blockly.Events.fire(new Blockly.Events.VarCreate(this))
};
Blockly.VariableModel.prototype.getId = function() { return this.id_ };
Blockly.VariableModel.compareByName = function(a, b) {
    a = a.name.toLowerCase();
    b = b.name.toLowerCase();
    return a < b ? -1 : a == b ? 0 : 1
};
Blockly.Variables = {};
Blockly.Variables.NAME_TYPE = Blockly.VARIABLE_CATEGORY_NAME;
Blockly.Variables.allUsedVarModels = function(a) {
    var b = a.getAllBlocks(!1);
    a = Object.create(null);
    for (var c = 0; c < b.length; c++) {
        var d = b[c].getVarModels();
        if (d)
            for (var e = 0; e < d.length; e++) {
                var f = d[e],
                    g = f.getId();
                g && (a[g] = f)
            }
    }
    b = [];
    for (g in a) b.push(a[g]);
    return b
};
Blockly.Variables.allUsedVariables = function() { console.warn("Deprecated call to Blockly.Variables.allUsedVariables. Use Blockly.Variables.allUsedVarModels instead.\nIf this is a major issue please file a bug on GitHub.") };
Blockly.Variables.ALL_DEVELOPER_VARS_WARNINGS_BY_BLOCK_TYPE_ = {};
Blockly.Variables.allDeveloperVariables = function(a) {
    a = a.getAllBlocks(!1);
    for (var b = Object.create(null), c = 0, d; d = a[c]; c++) {
        var e = d.getDeveloperVariables;
        !e && d.getDeveloperVars && (e = d.getDeveloperVars, Blockly.Variables.ALL_DEVELOPER_VARS_WARNINGS_BY_BLOCK_TYPE_[d.type] || (console.warn("Function getDeveloperVars() deprecated. Use getDeveloperVariables() (block type '" + d.type + "')"), Blockly.Variables.ALL_DEVELOPER_VARS_WARNINGS_BY_BLOCK_TYPE_[d.type] = !0));
        if (e)
            for (d = e(), e = 0; e < d.length; e++) b[d[e]] = !0
    }
    return Object.keys(b)
};
Blockly.Variables.flyoutCategory = function(a) {
    var b = [],
        c = document.createElement("button");
    c.setAttribute("text", "%{BKY_NEW_VARIABLE}");
    c.setAttribute("callbackKey", "CREATE_VARIABLE");
    a.registerButtonCallback("CREATE_VARIABLE", function(a) { Blockly.Variables.createVariableButtonHandler(a.getTargetWorkspace()) });
    b.push(c);
    a = Blockly.Variables.flyoutCategoryBlocks(a);
    return b = b.concat(a)
};
Blockly.Variables.flyoutCategoryBlocks = function(a) {
    a = a.getVariablesOfType("");
    var b = [];
    if (0 < a.length) {
        var c = a[a.length - 1];
        if (Blockly.Blocks.variables_set) {
            var d = Blockly.utils.xml.createElement("block");
            d.setAttribute("type", "variables_set");
            d.setAttribute("gap", Blockly.Blocks.math_change ? 8 : 24);
            d.appendChild(Blockly.Variables.generateVariableFieldDom(c));
            b.push(d)
        }
        Blockly.Blocks.math_change && (d = Blockly.utils.xml.createElement("block"), d.setAttribute("type", "math_change"), d.setAttribute("gap", Blockly.Blocks.variables_get ?
            20 : 8), d.appendChild(Blockly.Variables.generateVariableFieldDom(c)), c = Blockly.Xml.textToDom('<value name="DELTA"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'), d.appendChild(c), b.push(d));
        if (Blockly.Blocks.variables_get) {
            a.sort(Blockly.VariableModel.compareByName);
            c = 0;
            for (var e; e = a[c]; c++) d = Blockly.utils.xml.createElement("block"), d.setAttribute("type", "variables_get"), d.setAttribute("gap", 8), d.appendChild(Blockly.Variables.generateVariableFieldDom(e)), b.push(d)
        }
    }
    return b
};
Blockly.Variables.VAR_LETTER_OPTIONS = "ijkmnopqrstuvwxyzabcdefgh";
Blockly.Variables.generateUniqueName = function(a) { return Blockly.Variables.generateUniqueNameFromOptions(Blockly.Variables.VAR_LETTER_OPTIONS.charAt(0), a.getAllVariableNames()) };
Blockly.Variables.generateUniqueNameFromOptions = function(a, b) {
    if (!b.length) return a;
    for (var c = Blockly.Variables.VAR_LETTER_OPTIONS, d = "", e = c.indexOf(a);;) {
        for (var f = !1, g = 0; g < b.length; g++)
            if (b[g].toLowerCase() == a) { f = !0; break }
        if (!f) return a;
        e++;
        e == c.length && (e = 0, d = Number(d) + 1);
        a = c.charAt(e) + d
    }
};
Blockly.Variables.createVariableButtonHandler = function(a, b, c) {
    var d = c || "",
        e = function(c) {
            Blockly.Variables.promptName(Blockly.Msg.NEW_VARIABLE_TITLE, c, function(c) {
                if (c) {
                    var f = Blockly.Variables.nameUsedWithAnyType_(c, a);
                    if (f) {
                        if (f.type == d) var g = Blockly.Msg.VARIABLE_ALREADY_EXISTS.replace("%1", f.name);
                        else g = Blockly.Msg.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE, g = g.replace("%1", f.name).replace("%2", f.type);
                        Blockly.alert(g, function() { e(c) })
                    } else a.createVariable(c, d), b && b(c)
                } else b && b(null)
            })
        };
    e("")
};
Blockly.Variables.createVariable = Blockly.Variables.createVariableButtonHandler;
Blockly.Variables.renameVariable = function(a, b, c) {
    var d = function(e) {
        var f = Blockly.Msg.RENAME_VARIABLE_TITLE.replace("%1", b.name);
        Blockly.Variables.promptName(f, e, function(e) {
            if (e) {
                var f = Blockly.Variables.nameUsedWithOtherType_(e, b.type, a);
                f ? (f = Blockly.Msg.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE.replace("%1", f.name).replace("%2", f.type), Blockly.alert(f, function() { d(e) })) : (a.renameVariableById(b.getId(), e), c && c(e))
            } else c && c(null)
        })
    };
    d("")
};
Blockly.Variables.promptName = function(a, b, c) {
    Blockly.prompt(a, b, function(a) {
        a && (a = a.replace(/[\s\xa0]+/g, " ").trim(), a == Blockly.Msg.RENAME_VARIABLE || a == Blockly.Msg.NEW_VARIABLE) && (a = null);
        c(a)
    })
};
Blockly.Variables.nameUsedWithOtherType_ = function(a, b, c) {
    c = c.getVariableMap().getAllVariables();
    a = a.toLowerCase();
    for (var d = 0, e; e = c[d]; d++)
        if (e.name.toLowerCase() == a && e.type != b) return e;
    return null
};
Blockly.Variables.nameUsedWithAnyType_ = function(a, b) {
    b = b.getVariableMap().getAllVariables();
    a = a.toLowerCase();
    for (var c = 0, d; d = b[c]; c++)
        if (d.name.toLowerCase() == a) return d;
    return null
};
Blockly.Variables.generateVariableFieldDom = function(a) {
    var b = Blockly.utils.xml.createElement("field");
    b.setAttribute("name", "VAR");
    b.setAttribute("id", a.getId());
    b.setAttribute("variabletype", a.type);
    a = Blockly.utils.xml.createTextNode(a.name);
    b.appendChild(a);
    return b
};
Blockly.Variables.getOrCreateVariablePackage = function(a, b, c, d) {
    var e = Blockly.Variables.getVariable(a, b, c, d);
    e || (e = Blockly.Variables.createVariable_(a, b, c, d));
    return e
};
Blockly.Variables.getVariable = function(a, b, c, d) {
    var e = a.getPotentialVariableMap(),
        f = null;
    if (b && (f = a.getVariableById(b), !f && e && (f = e.getVariableById(b)), f)) return f;
    if (c) {
        if (void 0 == d) throw Error("Tried to look up a variable by name without a type");
        f = a.getVariable(c, d);
        !f && e && (f = e.getVariable(c, d))
    }
    return f
};
Blockly.Variables.createVariable_ = function(a, b, c, d) {
    var e = a.getPotentialVariableMap();
    c || (c = Blockly.Variables.generateUniqueName(a.isFlyout ? a.targetWorkspace : a));
    return e ? e.createVariable(c, d, b) : a.createVariable(c, d, b)
};
Blockly.Variables.getAddedVariables = function(a, b) {
    a = a.getAllVariables();
    var c = [];
    if (b.length != a.length)
        for (var d = 0; d < a.length; d++) { var e = a[d]; - 1 == b.indexOf(e) && c.push(e) }
    return c
};
Blockly.WidgetDiv = {};
Blockly.WidgetDiv.owner_ = null;
Blockly.WidgetDiv.dispose_ = null;
Blockly.WidgetDiv.rendererClassName_ = "";
Blockly.WidgetDiv.themeClassName_ = "";
Blockly.WidgetDiv.createDom = function() { Blockly.WidgetDiv.DIV || (Blockly.WidgetDiv.DIV = document.createElement("div"), Blockly.WidgetDiv.DIV.className = "blocklyWidgetDiv", (Blockly.parentContainer || document.body).appendChild(Blockly.WidgetDiv.DIV)) };
Blockly.WidgetDiv.show = function(a, b, c) {
    Blockly.WidgetDiv.hide();
    Blockly.WidgetDiv.owner_ = a;
    Blockly.WidgetDiv.dispose_ = c;
    a = Blockly.WidgetDiv.DIV;
    a.style.direction = b ? "rtl" : "ltr";
    a.style.display = "block";
    Blockly.WidgetDiv.rendererClassName_ = Blockly.getMainWorkspace().getRenderer().getClassName();
    Blockly.WidgetDiv.themeClassName_ = Blockly.getMainWorkspace().getTheme().getClassName();
    Blockly.utils.dom.addClass(a, Blockly.WidgetDiv.rendererClassName_);
    Blockly.utils.dom.addClass(a, Blockly.WidgetDiv.themeClassName_)
};
Blockly.WidgetDiv.hide = function() {
    if (Blockly.WidgetDiv.isVisible()) {
        Blockly.WidgetDiv.owner_ = null;
        var a = Blockly.WidgetDiv.DIV;
        a.style.display = "none";
        a.style.left = "";
        a.style.top = "";
        Blockly.WidgetDiv.dispose_ && Blockly.WidgetDiv.dispose_();
        Blockly.WidgetDiv.dispose_ = null;
        a.textContent = "";
        Blockly.WidgetDiv.rendererClassName_ && (Blockly.utils.dom.removeClass(a, Blockly.WidgetDiv.rendererClassName_), Blockly.WidgetDiv.rendererClassName_ = "");
        Blockly.WidgetDiv.themeClassName_ && (Blockly.utils.dom.removeClass(a,
            Blockly.WidgetDiv.themeClassName_), Blockly.WidgetDiv.themeClassName_ = "");
        Blockly.getMainWorkspace().markFocused()
    }
};
Blockly.WidgetDiv.isVisible = function() { return !!Blockly.WidgetDiv.owner_ };
Blockly.WidgetDiv.hideIfOwner = function(a) { Blockly.WidgetDiv.owner_ == a && Blockly.WidgetDiv.hide() };
Blockly.WidgetDiv.positionInternal_ = function(a, b, c) {
    Blockly.WidgetDiv.DIV.style.left = a + "px";
    Blockly.WidgetDiv.DIV.style.top = b + "px";
    Blockly.WidgetDiv.DIV.style.height = c + "px"
};
Blockly.WidgetDiv.positionWithAnchor = function(a, b, c, d) {
    var e = Blockly.WidgetDiv.calculateY_(a, b, c);
    a = Blockly.WidgetDiv.calculateX_(a, b, c, d);
    0 > e ? Blockly.WidgetDiv.positionInternal_(a, 0, c.height + e) : Blockly.WidgetDiv.positionInternal_(a, e, c.height)
};
Blockly.WidgetDiv.calculateX_ = function(a, b, c, d) {
    if (d) return b = Math.max(b.right - c.width, a.left), Math.min(b, a.right - c.width);
    b = Math.min(b.left, a.right - c.width);
    return Math.max(b, a.left)
};
Blockly.WidgetDiv.calculateY_ = function(a, b, c) { return b.bottom + c.height >= a.bottom ? b.top - c.height : b.bottom };
Blockly.VERSION = "3.20200402.1";
Blockly.mainWorkspace = null;
Blockly.selected = null;
Blockly.draggingConnections = [];
Blockly.clipboardXml_ = null;
Blockly.clipboardSource_ = null;
Blockly.clipboardTypeCounts_ = null;
Blockly.cache3dSupported_ = null;
Blockly.parentContainer = null;
Blockly.svgSize = function(a) { return { width: a.cachedWidth_, height: a.cachedHeight_ } };
Blockly.resizeSvgContents = function(a) { a.resizeContents() };
Blockly.svgResize = function(a) {
    for (; a.options.parentWorkspace;) a = a.options.parentWorkspace;
    var b = a.getParentSvg(),
        c = b.parentNode;
    if (c) {
        var d = c.offsetWidth;
        c = c.offsetHeight;
        b.cachedWidth_ != d && (b.setAttribute("width", d + "px"), b.cachedWidth_ = d);
        b.cachedHeight_ != c && (b.setAttribute("height", c + "px"), b.cachedHeight_ = c);
        a.resize()
    }
};
Blockly.onKeyDown = function(a) {
    var b = Blockly.mainWorkspace;
    if (b && !(Blockly.utils.isTargetInput(a) || b.rendered && !b.isVisible()))
        if (b.options.readOnly) Blockly.navigation.onKeyPress(a);
        else {
            var c = !1;
            if (a.keyCode == Blockly.utils.KeyCodes.ESC) Blockly.hideChaff(), Blockly.navigation.onBlocklyAction(Blockly.navigation.ACTION_EXIT);
            else {
                if (Blockly.navigation.onKeyPress(a)) return;
                if (a.keyCode == Blockly.utils.KeyCodes.BACKSPACE || a.keyCode == Blockly.utils.KeyCodes.DELETE) {
                    a.preventDefault();
                    if (Blockly.Gesture.inProgress()) return;
                    Blockly.selected && Blockly.selected.isDeletable() && (c = !0)
                } else if (a.altKey || a.ctrlKey || a.metaKey) {
                    if (Blockly.Gesture.inProgress()) return;
                    Blockly.selected && Blockly.selected.isDeletable() && Blockly.selected.isMovable() && (a.keyCode == Blockly.utils.KeyCodes.C ? (Blockly.hideChaff(), Blockly.copy_(Blockly.selected)) : a.keyCode != Blockly.utils.KeyCodes.X || Blockly.selected.workspace.isFlyout || (Blockly.copy_(Blockly.selected), c = !0));
                    a.keyCode == Blockly.utils.KeyCodes.V ? Blockly.clipboardXml_ && (a = Blockly.clipboardSource_,
                        a.isFlyout && (a = a.targetWorkspace), Blockly.clipboardTypeCounts_ && a.isCapacityAvailable(Blockly.clipboardTypeCounts_) && (Blockly.Events.setGroup(!0), a.paste(Blockly.clipboardXml_), Blockly.Events.setGroup(!1))) : a.keyCode == Blockly.utils.KeyCodes.Z && (Blockly.hideChaff(), b.undo(a.shiftKey))
                }
            }
            c && !Blockly.selected.workspace.isFlyout && (Blockly.Events.setGroup(!0), Blockly.hideChaff(), Blockly.selected.dispose(!0, !0), Blockly.Events.setGroup(!1))
        }
};
Blockly.copy_ = function(a) {
    if (a.isComment) var b = a.toXmlWithXY();
    else {
        b = Blockly.Xml.blockToDom(a, !0);
        Blockly.Xml.deleteNext(b);
        var c = a.getRelativeToSurfaceXY();
        b.setAttribute("x", a.RTL ? -c.x : c.x);
        b.setAttribute("y", c.y)
    }
    Blockly.clipboardXml_ = b;
    Blockly.clipboardSource_ = a.workspace;
    Blockly.clipboardTypeCounts_ = a.isComment ? null : Blockly.utils.getBlockTypeCounts(a, !0)
};
Blockly.duplicate = function(a) {
    var b = Blockly.clipboardXml_,
        c = Blockly.clipboardSource_;
    Blockly.copy_(a);
    a.workspace.paste(Blockly.clipboardXml_);
    Blockly.clipboardXml_ = b;
    Blockly.clipboardSource_ = c
};
Blockly.onContextMenu_ = function(a) { Blockly.utils.isTargetInput(a) || a.preventDefault() };
Blockly.hideChaff = function(a) {
    Blockly.Tooltip.hide();
    Blockly.WidgetDiv.hide();
    Blockly.DropDownDiv.hideWithoutAnimation();
    a || (a = Blockly.getMainWorkspace(), a.trashcan && a.trashcan.flyout && a.trashcan.flyout.hide(), (a = a.getToolbox()) && a.getFlyout() && a.getFlyout().autoClose && a.clearSelection())
};
Blockly.getMainWorkspace = function() { return Blockly.mainWorkspace };
Blockly.alert = function(a, b) {
    alert(a);
    b && b()
};
Blockly.confirm = function(a, b) { b(confirm(a)) };
Blockly.prompt = function(a, b, c) { c(prompt(a, b)) };
Blockly.jsonInitFactory_ = function(a) { return function() { this.jsonInit(a) } };
Blockly.defineBlocksWithJsonArray = function(a) {
    for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if (c) {
            var d = c.type;
            null == d || "" === d ? console.warn("Block definition #" + b + " in JSON array is missing a type attribute. Skipping.") : (Blockly.Blocks[d] && console.warn("Block definition #" + b + ' in JSON array overwrites prior definition of "' + d + '".'), Blockly.Blocks[d] = { init: Blockly.jsonInitFactory_(c) })
        } else console.warn("Block definition #" + b + " in JSON array is " + c + ". Skipping.")
    }
};
Blockly.bindEventWithChecks_ = function(a, b, c, d, e, f) {
    var g = !1,
        h = function(a) {
            var b = !e;
            a = Blockly.Touch.splitEventByTouches(a);
            for (var f = 0, h; h = a[f]; f++)
                if (!b || Blockly.Touch.shouldHandleEvent(h)) Blockly.Touch.setClientFromTouch(h), c ? d.call(c, h) : d(h), g = !0
        },
        k = [];
    if (Blockly.utils.global.PointerEvent && b in Blockly.Touch.TOUCH_MAP)
        for (var l = 0, m; m = Blockly.Touch.TOUCH_MAP[b][l]; l++) a.addEventListener(m, h, !1), k.push([a, m, h]);
    else if (a.addEventListener(b, h, !1), k.push([a, b, h]), b in Blockly.Touch.TOUCH_MAP) {
        var n =
            function(a) {
                h(a);
                var b = !f;
                g && b && a.preventDefault()
            };
        for (l = 0; m = Blockly.Touch.TOUCH_MAP[b][l]; l++) a.addEventListener(m, n, !1), k.push([a, m, n])
    }
    return k
};
Blockly.bindEvent_ = function(a, b, c, d) {
    var e = function(a) { c ? d.call(c, a) : d(a) },
        f = [];
    if (Blockly.utils.global.PointerEvent && b in Blockly.Touch.TOUCH_MAP)
        for (var g = 0, h; h = Blockly.Touch.TOUCH_MAP[b][g]; g++) a.addEventListener(h, e, !1), f.push([a, h, e]);
    else if (a.addEventListener(b, e, !1), f.push([a, b, e]), b in Blockly.Touch.TOUCH_MAP) {
        var k = function(a) {
            if (a.changedTouches && 1 == a.changedTouches.length) {
                var b = a.changedTouches[0];
                a.clientX = b.clientX;
                a.clientY = b.clientY
            }
            e(a);
            a.preventDefault()
        };
        for (g = 0; h = Blockly.Touch.TOUCH_MAP[b][g]; g++) a.addEventListener(h,
            k, !1), f.push([a, h, k])
    }
    return f
};
Blockly.unbindEvent_ = function(a) {
    for (; a.length;) {
        var b = a.pop(),
            c = b[2];
        b[0].removeEventListener(b[1], c, !1)
    }
    return c
};
Blockly.isNumber = function(a) { return /^\s*-?\d+(\.\d+)?\s*$/.test(a) };
Blockly.hueToHex = function(a) { return Blockly.utils.colour.hsvToHex(a, Blockly.HSV_SATURATION, 355 * Blockly.HSV_VALUE) };
Blockly.checkBlockColourConstants = function() {
    Blockly.checkBlockColourConstant_("LOGIC_HUE", ["Blocks", "logic", "HUE"], void 0);
    Blockly.checkBlockColourConstant_("LOGIC_HUE", ["Constants", "Logic", "HUE"], 210);
    Blockly.checkBlockColourConstant_("LOOPS_HUE", ["Blocks", "loops", "HUE"], void 0);
    Blockly.checkBlockColourConstant_("LOOPS_HUE", ["Constants", "Loops", "HUE"], 120);
    Blockly.checkBlockColourConstant_("MATH_HUE", ["Blocks", "math", "HUE"], void 0);
    Blockly.checkBlockColourConstant_("MATH_HUE", ["Constants", "Math",
        "HUE"
    ], 230);
    Blockly.checkBlockColourConstant_("TEXTS_HUE", ["Blocks", "texts", "HUE"], void 0);
    Blockly.checkBlockColourConstant_("TEXTS_HUE", ["Constants", "Text", "HUE"], 160);
    Blockly.checkBlockColourConstant_("LISTS_HUE", ["Blocks", "lists", "HUE"], void 0);
    Blockly.checkBlockColourConstant_("LISTS_HUE", ["Constants", "Lists", "HUE"], 260);
    Blockly.checkBlockColourConstant_("COLOUR_HUE", ["Blocks", "colour", "HUE"], void 0);
    Blockly.checkBlockColourConstant_("COLOUR_HUE", ["Constants", "Colour", "HUE"], 20);
    Blockly.checkBlockColourConstant_("VARIABLES_HUE", ["Blocks", "variables", "HUE"], void 0);
    Blockly.checkBlockColourConstant_("VARIABLES_HUE", ["Constants", "Variables", "HUE"], 330);
    Blockly.checkBlockColourConstant_("VARIABLES_DYNAMIC_HUE", ["Constants", "VariablesDynamic", "HUE"], 310);
    Blockly.checkBlockColourConstant_("PROCEDURES_HUE", ["Blocks", "procedures", "HUE"], void 0)
};
Blockly.checkBlockColourConstant_ = function(a, b, c) {
    for (var d = "Blockly", e = Blockly, f = 0; f < b.length; ++f) d += "." + b[f], e && (e = e[b[f]]);
    e && e !== c && (a = (void 0 === c ? '%1 has been removed. Use Blockly.Msg["%2"].' : '%1 is deprecated and unused. Override Blockly.Msg["%2"].').replace("%1", d).replace("%2", a), console.warn(a))
};
Blockly.setParentContainer = function(a) { Blockly.parentContainer = a };
Blockly.Icon = function(a) { this.block_ = a };
Blockly.Icon.prototype.collapseHidden = !0;
Blockly.Icon.prototype.SIZE = 17;
Blockly.Icon.prototype.bubble_ = null;
Blockly.Icon.prototype.iconXY_ = null;
Blockly.Icon.prototype.createIcon = function() { this.iconGroup_ || (this.iconGroup_ = Blockly.utils.dom.createSvgElement("g", { "class": "blocklyIconGroup" }, null), this.block_.isInFlyout && Blockly.utils.dom.addClass(this.iconGroup_, "blocklyIconGroupReadonly"), this.drawIcon_(this.iconGroup_), this.block_.getSvgRoot().appendChild(this.iconGroup_), Blockly.bindEventWithChecks_(this.iconGroup_, "mouseup", this, this.iconClick_), this.updateEditable()) };
Blockly.Icon.prototype.dispose = function() {
    Blockly.utils.dom.removeNode(this.iconGroup_);
    this.iconGroup_ = null;
    this.setVisible(!1);
    this.block_ = null
};
Blockly.Icon.prototype.updateEditable = function() {};
Blockly.Icon.prototype.isVisible = function() { return !!this.bubble_ };
Blockly.Icon.prototype.iconClick_ = function(a) { this.block_.workspace.isDragging() || this.block_.isInFlyout || Blockly.utils.isRightButton(a) || this.setVisible(!this.isVisible()) };
Blockly.Icon.prototype.applyColour = function() { this.isVisible() && this.bubble_.setColour(this.block_.style.colourPrimary) };
Blockly.Icon.prototype.setIconLocation = function(a) {
    this.iconXY_ = a;
    this.isVisible() && this.bubble_.setAnchorLocation(a)
};
Blockly.Icon.prototype.computeIconLocation = function() {
    var a = this.block_.getRelativeToSurfaceXY(),
        b = Blockly.utils.getRelativeXY(this.iconGroup_);
    a = new Blockly.utils.Coordinate(a.x + b.x + this.SIZE / 2, a.y + b.y + this.SIZE / 2);
    Blockly.utils.Coordinate.equals(this.getIconLocation(), a) || this.setIconLocation(a)
};
Blockly.Icon.prototype.getIconLocation = function() { return this.iconXY_ };
Blockly.Icon.prototype.getCorrectedSize = function() { return new Blockly.utils.Size(Blockly.Icon.prototype.SIZE, Blockly.Icon.prototype.SIZE - 2) };
Blockly.Warning = function(a) {
    Blockly.Warning.superClass_.constructor.call(this, a);
    this.createIcon();
    this.text_ = {}
};
Blockly.utils.object.inherits(Blockly.Warning, Blockly.Icon);
Blockly.Warning.prototype.collapseHidden = !1;
Blockly.Warning.prototype.drawIcon_ = function(a) {
    Blockly.utils.dom.createSvgElement("path", { "class": "blocklyIconShape", d: "M2,15Q-1,15 0.5,12L6.5,1.7Q8,-1 9.5,1.7L15.5,12Q17,15 14,15z" }, a);
    Blockly.utils.dom.createSvgElement("path", { "class": "blocklyIconSymbol", d: "m7,4.8v3.16l0.27,2.27h1.46l0.27,-2.27v-3.16z" }, a);
    Blockly.utils.dom.createSvgElement("rect", { "class": "blocklyIconSymbol", x: "7", y: "11", height: "2", width: "2" }, a)
};
Blockly.Warning.textToDom_ = function(a) {
    var b = Blockly.utils.dom.createSvgElement("text", { "class": "blocklyText blocklyBubbleText blocklyNoPointerEvents", y: Blockly.Bubble.BORDER_WIDTH }, null);
    a = a.split("\n");
    for (var c = 0; c < a.length; c++) {
        var d = Blockly.utils.dom.createSvgElement("tspan", { dy: "1em", x: Blockly.Bubble.BORDER_WIDTH }, b),
            e = document.createTextNode(a[c]);
        d.appendChild(e)
    }
    return b
};
Blockly.Warning.prototype.setVisible = function(a) { a != this.isVisible() && (Blockly.Events.fire(new Blockly.Events.Ui(this.block_, "warningOpen", !a, a)), a ? this.createBubble() : this.disposeBubble()) };
Blockly.Warning.prototype.createBubble = function() {
    this.paragraphElement_ = Blockly.Warning.textToDom_(this.getText());
    this.bubble_ = new Blockly.Bubble(this.block_.workspace, this.paragraphElement_, this.block_.pathObject.svgPath, this.iconXY_, null, null);
    this.bubble_.setSvgId(this.block_.id);
    if (this.block_.RTL)
        for (var a = this.paragraphElement_.getBBox().width, b = 0, c; c = this.paragraphElement_.childNodes[b]; b++) c.setAttribute("text-anchor", "end"), c.setAttribute("x", a + Blockly.Bubble.BORDER_WIDTH);
    this.applyColour()
};
Blockly.Warning.prototype.disposeBubble = function() {
    this.bubble_.dispose();
    this.paragraphElement_ = this.body_ = this.bubble_ = null
};
Blockly.Warning.prototype.bodyFocus_ = function(a) { this.bubble_.promote() };
Blockly.Warning.prototype.setText = function(a, b) { this.text_[b] != a && (a ? this.text_[b] = a : delete this.text_[b], this.isVisible() && (this.setVisible(!1), this.setVisible(!0))) };
Blockly.Warning.prototype.getText = function() {
    var a = [],
        b;
    for (b in this.text_) a.push(this.text_[b]);
    return a.join("\n")
};
Blockly.Warning.prototype.dispose = function() {
    this.block_.warning = null;
    Blockly.Icon.prototype.dispose.call(this)
};
Blockly.Comment = function(a) {
    Blockly.Comment.superClass_.constructor.call(this, a);
    this.model_ = a.commentModel;
    this.model_.text = this.model_.text || "";
    this.cachedText_ = "";
    this.onInputWrapper_ = this.onChangeWrapper_ = this.onWheelWrapper_ = this.onMouseUpWrapper_ = null;
    this.createIcon()
};
Blockly.utils.object.inherits(Blockly.Comment, Blockly.Icon);
Blockly.Comment.prototype.drawIcon_ = function(a) {
    Blockly.utils.dom.createSvgElement("circle", { "class": "blocklyIconShape", r: "8", cx: "8", cy: "8" }, a);
    Blockly.utils.dom.createSvgElement("path", { "class": "blocklyIconSymbol", d: "m6.8,10h2c0.003,-0.617 0.271,-0.962 0.633,-1.266 2.875,-2.4050.607,-5.534 -3.765,-3.874v1.7c3.12,-1.657 3.698,0.118 2.336,1.25-1.201,0.998 -1.201,1.528 -1.204,2.19z" }, a);
    Blockly.utils.dom.createSvgElement("rect", { "class": "blocklyIconSymbol", x: "6.8", y: "10.78", height: "2", width: "2" }, a)
};
Blockly.Comment.prototype.createEditor_ = function() {
    this.foreignObject_ = Blockly.utils.dom.createSvgElement("foreignObject", { x: Blockly.Bubble.BORDER_WIDTH, y: Blockly.Bubble.BORDER_WIDTH }, null);
    var a = document.createElementNS(Blockly.utils.dom.HTML_NS, "body");
    a.setAttribute("xmlns", Blockly.utils.dom.HTML_NS);
    a.className = "blocklyMinimalBody";
    var b = this.textarea_ = document.createElementNS(Blockly.utils.dom.HTML_NS, "textarea");
    b.className = "blocklyCommentTextarea";
    b.setAttribute("dir", this.block_.RTL ? "RTL" :
        "LTR");
    b.value = this.model_.text;
    this.resizeTextarea_();
    a.appendChild(b);
    this.foreignObject_.appendChild(a);
    this.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(b, "mouseup", this, this.startEdit_, !0, !0);
    this.onWheelWrapper_ = Blockly.bindEventWithChecks_(b, "wheel", this, function(a) { a.stopPropagation() });
    this.onChangeWrapper_ = Blockly.bindEventWithChecks_(b, "change", this, function(a) {
        this.cachedText_ != this.model_.text && Blockly.Events.fire(new Blockly.Events.BlockChange(this.block_, "comment", null, this.cachedText_,
            this.model_.text))
    });
    this.onInputWrapper_ = Blockly.bindEventWithChecks_(b, "input", this, function(a) { this.model_.text = b.value });
    setTimeout(b.focus.bind(b), 0);
    return this.foreignObject_
};
Blockly.Comment.prototype.updateEditable = function() {
    Blockly.Comment.superClass_.updateEditable.call(this);
    this.isVisible() && (this.disposeBubble_(), this.createBubble_())
};
Blockly.Comment.prototype.onBubbleResize_ = function() { this.isVisible() && (this.model_.size = this.bubble_.getBubbleSize(), this.resizeTextarea_()) };
Blockly.Comment.prototype.resizeTextarea_ = function() {
    var a = this.model_.size,
        b = 2 * Blockly.Bubble.BORDER_WIDTH,
        c = a.width - b;
    a = a.height - b;
    this.foreignObject_.setAttribute("width", c);
    this.foreignObject_.setAttribute("height", a);
    this.textarea_.style.width = c - 4 + "px";
    this.textarea_.style.height = a - 4 + "px"
};
Blockly.Comment.prototype.setVisible = function(a) { a != this.isVisible() && (Blockly.Events.fire(new Blockly.Events.Ui(this.block_, "commentOpen", !a, a)), (this.model_.pinned = a) ? this.createBubble_() : this.disposeBubble_()) };
Blockly.Comment.prototype.createBubble_ = function() {!this.block_.isEditable() || Blockly.utils.userAgent.IE ? this.createNonEditableBubble_() : this.createEditableBubble_() };
Blockly.Comment.prototype.createEditableBubble_ = function() {
    this.bubble_ = new Blockly.Bubble(this.block_.workspace, this.createEditor_(), this.block_.pathObject.svgPath, this.iconXY_, this.model_.size.width, this.model_.size.height);
    this.bubble_.setSvgId(this.block_.id);
    this.bubble_.registerResizeEvent(this.onBubbleResize_.bind(this));
    this.applyColour()
};
Blockly.Comment.prototype.createNonEditableBubble_ = function() { Blockly.Warning.prototype.createBubble.call(this) };
Blockly.Comment.prototype.disposeBubble_ = function() {
    this.paragraphElement_ ? Blockly.Warning.prototype.disposeBubble.call(this) : (this.onMouseUpWrapper_ && (Blockly.unbindEvent_(this.onMouseUpWrapper_), this.onMouseUpWrapper_ = null), this.onWheelWrapper_ && (Blockly.unbindEvent_(this.onWheelWrapper_), this.onWheelWrapper_ = null), this.onChangeWrapper_ && (Blockly.unbindEvent_(this.onChangeWrapper_), this.onChangeWrapper_ = null), this.onInputWrapper_ && (Blockly.unbindEvent_(this.onInputWrapper_), this.onInputWrapper_ =
        null), this.bubble_.dispose(), this.foreignObject_ = this.textarea_ = this.bubble_ = null)
};
Blockly.Comment.prototype.startEdit_ = function(a) {
    this.bubble_.promote() && this.textarea_.focus();
    this.cachedText_ = this.model_.text
};
Blockly.Comment.prototype.getBubbleSize = function() { return this.model_.size };
Blockly.Comment.prototype.setBubbleSize = function(a, b) { this.bubble_ ? this.bubble_.setBubbleSize(a, b) : (this.model_.size.width = a, this.model_.size.height = b) };
Blockly.Comment.prototype.getText = function() { return this.model_.text || "" };
Blockly.Comment.prototype.setText = function(a) { this.model_.text != a && (this.model_.text = a, this.updateText()) };
Blockly.Comment.prototype.updateText = function() { this.textarea_ ? this.textarea_.value = this.model_.text : this.paragraphElement_ && (this.paragraphElement_.firstChild.textContent = this.model_.text) };
Blockly.Comment.prototype.dispose = function() {
    this.block_.comment = null;
    Blockly.Icon.prototype.dispose.call(this)
};
Blockly.Css.register(".blocklyCommentTextarea {,background-color: #f8f8f8;,border: 0;,outline: 0;,margin: 0;,padding: 3px;,resize: none;,display: block;,overflow: hidden;overflow:auto;,}".split(","));
Blockly.FlyoutCursor = function() { Blockly.FlyoutCursor.superClass_.constructor.call(this) };
Blockly.utils.object.inherits(Blockly.FlyoutCursor, Blockly.Cursor);
Blockly.FlyoutCursor.prototype.onBlocklyAction = function(a) {
    switch (a.name) {
        case Blockly.navigation.actionNames.PREVIOUS:
            return this.prev(), !0;
        case Blockly.navigation.actionNames.NEXT:
            return this.next(), !0;
        default:
            return !1
    }
};
Blockly.FlyoutCursor.prototype.next = function() {
    var a = this.getCurNode();
    if (!a) return null;
    (a = a.next()) && this.setCurNode(a);
    return a
};
Blockly.FlyoutCursor.prototype.in = function() { return null };
Blockly.FlyoutCursor.prototype.prev = function() {
    var a = this.getCurNode();
    if (!a) return null;
    (a = a.prev()) && this.setCurNode(a);
    return a
};
Blockly.FlyoutCursor.prototype.out = function() { return null };
Blockly.Flyout = function(a) {
    a.getMetrics = this.getMetrics_.bind(this);
    a.setMetrics = this.setMetrics_.bind(this);
    this.workspace_ = new Blockly.WorkspaceSvg(a);
    this.workspace_.isFlyout = !0;
    this.workspace_.setVisible(this.isVisible_);
    this.RTL = !!a.RTL;
    this.toolboxPosition_ = a.toolboxPosition;
    this.eventWrappers_ = [];
    this.mats_ = [];
    this.buttons_ = [];
    this.listeners_ = [];
    this.permanentlyDisabled_ = [];
    this.tabWidth_ = this.workspace_.getRenderer().getConstants().TAB_WIDTH
};
Blockly.Flyout.prototype.autoClose = !0;
Blockly.Flyout.prototype.isVisible_ = !1;
Blockly.Flyout.prototype.containerVisible_ = !0;
Blockly.Flyout.prototype.CORNER_RADIUS = 8;
Blockly.Flyout.prototype.MARGIN = Blockly.Flyout.prototype.CORNER_RADIUS;
Blockly.Flyout.prototype.GAP_X = 3 * Blockly.Flyout.prototype.MARGIN;
Blockly.Flyout.prototype.GAP_Y = 3 * Blockly.Flyout.prototype.MARGIN;
Blockly.Flyout.prototype.SCROLLBAR_PADDING = 2;
Blockly.Flyout.prototype.width_ = 0;
Blockly.Flyout.prototype.height_ = 0;
Blockly.Flyout.prototype.dragAngleRange_ = 70;
Blockly.Flyout.prototype.createDom = function(a) {
    this.svgGroup_ = Blockly.utils.dom.createSvgElement(a, { "class": "blocklyFlyout", style: "display: none" }, null);
    this.svgBackground_ = Blockly.utils.dom.createSvgElement("path", { "class": "blocklyFlyoutBackground" }, this.svgGroup_);
    this.svgGroup_.appendChild(this.workspace_.createDom());
    this.workspace_.getThemeManager().subscribe(this.svgBackground_, "flyoutBackgroundColour", "fill");
    this.workspace_.getThemeManager().subscribe(this.svgBackground_, "flyoutOpacity", "fill-opacity");
    this.workspace_.getMarkerManager().setCursor(new Blockly.FlyoutCursor);
    return this.svgGroup_
};
Blockly.Flyout.prototype.init = function(a) {
    this.targetWorkspace_ = a;
    this.workspace_.targetWorkspace = a;
    this.scrollbar_ = new Blockly.Scrollbar(this.workspace_, this.horizontalLayout_, !1, "blocklyFlyoutScrollbar");
    this.hide();
    Array.prototype.push.apply(this.eventWrappers_, Blockly.bindEventWithChecks_(this.svgGroup_, "wheel", this, this.wheel_));
    this.autoClose || (this.filterWrapper_ = this.filterForCapacity_.bind(this), this.targetWorkspace_.addChangeListener(this.filterWrapper_));
    Array.prototype.push.apply(this.eventWrappers_,
        Blockly.bindEventWithChecks_(this.svgBackground_, "mousedown", this, this.onMouseDown_));
    this.workspace_.getGesture = this.targetWorkspace_.getGesture.bind(this.targetWorkspace_);
    this.workspace_.setVariableMap(this.targetWorkspace_.getVariableMap());
    this.workspace_.createPotentialVariableMap()
};
Blockly.Flyout.prototype.dispose = function() {
    this.hide();
    Blockly.unbindEvent_(this.eventWrappers_);
    this.filterWrapper_ && (this.targetWorkspace_.removeChangeListener(this.filterWrapper_), this.filterWrapper_ = null);
    this.scrollbar_ && (this.scrollbar_.dispose(), this.scrollbar_ = null);
    this.workspace_ && (this.workspace_.getThemeManager().unsubscribe(this.svgBackground_), this.workspace_.targetWorkspace = null, this.workspace_.dispose(), this.workspace_ = null);
    this.svgGroup_ && (Blockly.utils.dom.removeNode(this.svgGroup_),
        this.svgGroup_ = null);
    this.targetWorkspace_ = this.svgBackground_ = null
};
Blockly.Flyout.prototype.getWidth = function() { return this.width_ };
Blockly.Flyout.prototype.getHeight = function() { return this.height_ };
Blockly.Flyout.prototype.getWorkspace = function() { return this.workspace_ };
Blockly.Flyout.prototype.isVisible = function() { return this.isVisible_ };
Blockly.Flyout.prototype.setVisible = function(a) {
    var b = a != this.isVisible();
    this.isVisible_ = a;
    b && this.updateDisplay_()
};
Blockly.Flyout.prototype.setContainerVisible = function(a) {
    var b = a != this.containerVisible_;
    this.containerVisible_ = a;
    b && this.updateDisplay_()
};
Blockly.Flyout.prototype.updateDisplay_ = function() {
    var a = this.containerVisible_ ? this.isVisible() : !1;
    this.svgGroup_.style.display = a ? "block" : "none";
    this.scrollbar_.setContainerVisible(a)
};
Blockly.Flyout.prototype.positionAt_ = function(a, b, c, d) {
    this.svgGroup_.setAttribute("width", a);
    this.svgGroup_.setAttribute("height", b);
    "svg" == this.svgGroup_.tagName ? Blockly.utils.dom.setCssTransform(this.svgGroup_, "translate(" + c + "px," + d + "px)") : this.svgGroup_.setAttribute("transform", "translate(" + c + "," + d + ")");
    this.scrollbar_ && (this.scrollbar_.setOrigin(c, d), this.scrollbar_.resize(), this.scrollbar_.setPosition_(this.scrollbar_.position_.x, this.scrollbar_.position_.y))
};
Blockly.Flyout.prototype.hide = function() {
    if (this.isVisible()) {
        this.setVisible(!1);
        for (var a = 0, b; b = this.listeners_[a]; a++) Blockly.unbindEvent_(b);
        this.listeners_.length = 0;
        this.reflowWrapper_ && (this.workspace_.removeChangeListener(this.reflowWrapper_), this.reflowWrapper_ = null)
    }
};
Blockly.Flyout.prototype.show = function(a) {
    this.workspace_.setResizesEnabled(!1);
    this.hide();
    this.clearOldBlocks_();
    if ("string" == typeof a) {
        a = this.workspace_.targetWorkspace.getToolboxCategoryCallback(a);
        if ("function" != typeof a) throw TypeError("Couldn't find a callback function when opening a toolbox category.");
        a = a(this.workspace_.targetWorkspace);
        if (!Array.isArray(a)) throw TypeError("Result of toolbox category callback must be an array.");
    }
    this.setVisible(!0);
    var b = [],
        c = [];
    this.permanentlyDisabled_.length =
        0;
    for (var d = this.horizontalLayout_ ? this.GAP_X : this.GAP_Y, e = 0, f; f = a[e]; e++)
        if (f.tagName) switch (f.tagName.toUpperCase()) {
            case "BLOCK":
                var g = Blockly.Xml.domToBlock(f, this.workspace_);
                g.isEnabled() || this.permanentlyDisabled_.push(g);
                b.push({ type: "block", block: g });
                f = parseInt(f.getAttribute("gap"), 10);
                c.push(isNaN(f) ? d : f);
                break;
            case "SEP":
                f = parseInt(f.getAttribute("gap"), 10);
                !isNaN(f) && 0 < c.length ? c[c.length - 1] = f : c.push(d);
                break;
            case "LABEL":
            case "BUTTON":
                g = "LABEL" == f.tagName.toUpperCase();
                if (!Blockly.FlyoutButton) throw Error("Missing require for Blockly.FlyoutButton");
                f = new Blockly.FlyoutButton(this.workspace_, this.targetWorkspace_, f, g);
                b.push({ type: "button", button: f });
                c.push(d)
        }
    this.layout_(b, c);
    this.listeners_.push(Blockly.bindEventWithChecks_(this.svgBackground_, "mouseover", this, function() { for (var a = this.workspace_.getTopBlocks(!1), b = 0, c; c = a[b]; b++) c.removeSelect() }));
    this.horizontalLayout_ ? this.height_ = 0 : this.width_ = 0;
    this.workspace_.setResizesEnabled(!0);
    this.reflow();
    this.filterForCapacity_();
    this.position();
    this.reflowWrapper_ = this.reflow.bind(this);
    this.workspace_.addChangeListener(this.reflowWrapper_)
};
Blockly.Flyout.prototype.clearOldBlocks_ = function() {
    for (var a = this.workspace_.getTopBlocks(!1), b = 0, c; c = a[b]; b++) c.workspace == this.workspace_ && c.dispose(!1, !1);
    for (b = 0; b < this.mats_.length; b++)
        if (a = this.mats_[b]) Blockly.Tooltip.unbindMouseEvents(a), Blockly.utils.dom.removeNode(a);
    for (b = this.mats_.length = 0; a = this.buttons_[b]; b++) a.dispose();
    this.buttons_.length = 0;
    this.workspace_.getPotentialVariableMap().clear()
};
Blockly.Flyout.prototype.addBlockListeners_ = function(a, b, c) {
    this.listeners_.push(Blockly.bindEventWithChecks_(a, "mousedown", null, this.blockMouseDown_(b)));
    this.listeners_.push(Blockly.bindEventWithChecks_(c, "mousedown", null, this.blockMouseDown_(b)));
    this.listeners_.push(Blockly.bindEvent_(a, "mouseenter", b, b.addSelect));
    this.listeners_.push(Blockly.bindEvent_(a, "mouseleave", b, b.removeSelect));
    this.listeners_.push(Blockly.bindEvent_(c, "mouseenter", b, b.addSelect));
    this.listeners_.push(Blockly.bindEvent_(c,
        "mouseleave", b, b.removeSelect))
};
Blockly.Flyout.prototype.blockMouseDown_ = function(a) {
    var b = this;
    return function(c) {
        var d = b.targetWorkspace_.getGesture(c);
        d && (d.setStartBlock(a), d.handleFlyoutStart(c, b))
    }
};
Blockly.Flyout.prototype.onMouseDown_ = function(a) {
    var b = this.targetWorkspace_.getGesture(a);
    b && b.handleFlyoutStart(a, this)
};
Blockly.Flyout.prototype.isBlockCreatable_ = function(a) { return a.isEnabled() };
Blockly.Flyout.prototype.createBlock = function(a) {
    var b = null;
    Blockly.Events.disable();
    var c = this.targetWorkspace_.getAllVariables();
    this.targetWorkspace_.setResizesEnabled(!1);
    try { b = this.placeNewBlock_(a), Blockly.hideChaff() } finally { Blockly.Events.enable() }
    a = Blockly.Variables.getAddedVariables(this.targetWorkspace_, c);
    if (Blockly.Events.isEnabled())
        for (Blockly.Events.setGroup(!0), Blockly.Events.fire(new Blockly.Events.Create(b)), c = 0; c < a.length; c++) Blockly.Events.fire(new Blockly.Events.VarCreate(a[c]));
    this.autoClose ? this.hide() : this.filterForCapacity_();
    return b
};
Blockly.Flyout.prototype.initFlyoutButton_ = function(a, b, c) {
    var d = a.createDom();
    a.moveTo(b, c);
    a.show();
    this.listeners_.push(Blockly.bindEventWithChecks_(d, "mousedown", this, this.onMouseDown_));
    this.buttons_.push(a)
};
Blockly.Flyout.prototype.createRect_ = function(a, b, c, d, e) {
    b = Blockly.utils.dom.createSvgElement("rect", { "fill-opacity": 0, x: b, y: c, height: d.height, width: d.width }, null);
    b.tooltip = a;
    Blockly.Tooltip.bindMouseEvents(b);
    this.workspace_.getCanvas().insertBefore(b, a.getSvgRoot());
    a.flyoutRect_ = b;
    return this.mats_[e] = b
};
Blockly.Flyout.prototype.moveRectToBlock_ = function(a, b) {
    var c = b.getHeightWidth();
    a.setAttribute("width", c.width);
    a.setAttribute("height", c.height);
    b = b.getRelativeToSurfaceXY();
    a.setAttribute("y", b.y);
    a.setAttribute("x", this.RTL ? b.x - c.width : b.x)
};
Blockly.Flyout.prototype.filterForCapacity_ = function() {
    for (var a = this.workspace_.getTopBlocks(!1), b = 0, c; c = a[b]; b++)
        if (-1 == this.permanentlyDisabled_.indexOf(c))
            for (var d = this.targetWorkspace_.isCapacityAvailable(Blockly.utils.getBlockTypeCounts(c)); c;) c.setEnabled(d), c = c.getNextBlock()
};
Blockly.Flyout.prototype.reflow = function() {
    this.reflowWrapper_ && this.workspace_.removeChangeListener(this.reflowWrapper_);
    this.reflowInternal_();
    this.reflowWrapper_ && this.workspace_.addChangeListener(this.reflowWrapper_)
};
Blockly.Flyout.prototype.isScrollable = function() { return this.scrollbar_ ? this.scrollbar_.isVisible() : !1 };
Blockly.Flyout.prototype.placeNewBlock_ = function(a) {
    var b = this.targetWorkspace_;
    if (!a.getSvgRoot()) throw Error("oldBlock is not rendered.");
    var c = Blockly.Xml.blockToDom(a, !0);
    b.setResizesEnabled(!1);
    c = Blockly.Xml.domToBlock(c, b);
    if (!c.getSvgRoot()) throw Error("block is not rendered.");
    var d = b.getOriginOffsetInPixels(),
        e = this.workspace_.getOriginOffsetInPixels();
    a = a.getRelativeToSurfaceXY();
    a.scale(this.workspace_.scale);
    a = Blockly.utils.Coordinate.sum(e, a);
    d = Blockly.utils.Coordinate.difference(a, d);
    d.scale(1 / b.scale);
    c.moveBy(d.x, d.y);
    return c
};
Blockly.Flyout.prototype.onBlocklyAction = function(a) { return this.workspace_.getCursor().onBlocklyAction(a) };
Blockly.HorizontalFlyout = function(a) {
    a.getMetrics = this.getMetrics_.bind(this);
    a.setMetrics = this.setMetrics_.bind(this);
    Blockly.HorizontalFlyout.superClass_.constructor.call(this, a);
    this.horizontalLayout_ = !0
};
Blockly.utils.object.inherits(Blockly.HorizontalFlyout, Blockly.Flyout);
Blockly.HorizontalFlyout.prototype.getMetrics_ = function() {
    if (!this.isVisible()) return null;
    try { var a = this.workspace_.getCanvas().getBBox() } catch (e) { a = { height: 0, y: 0, width: 0, x: 0 } }
    var b = this.SCROLLBAR_PADDING,
        c = this.SCROLLBAR_PADDING;
    this.toolboxPosition_ == Blockly.TOOLBOX_AT_BOTTOM && (b = 0);
    var d = this.height_;
    this.toolboxPosition_ == Blockly.TOOLBOX_AT_TOP && (d -= this.SCROLLBAR_PADDING);
    return {
        viewHeight: d,
        viewWidth: this.width_ - 2 * this.SCROLLBAR_PADDING,
        contentHeight: (a.height + 2 * this.MARGIN) * this.workspace_.scale,
        contentWidth: (a.width + 2 * this.MARGIN) * this.workspace_.scale,
        viewTop: -this.workspace_.scrollY,
        viewLeft: -this.workspace_.scrollX,
        contentTop: 0,
        contentLeft: 0,
        absoluteTop: b,
        absoluteLeft: c
    }
};
Blockly.HorizontalFlyout.prototype.setMetrics_ = function(a) {
    var b = this.getMetrics_();
    b && ("number" == typeof a.x && (this.workspace_.scrollX = -b.contentWidth * a.x), this.workspace_.translate(this.workspace_.scrollX + b.absoluteLeft, this.workspace_.scrollY + b.absoluteTop))
};
Blockly.HorizontalFlyout.prototype.position = function() {
    if (this.isVisible()) {
        var a = this.targetWorkspace_.getMetrics();
        a && (this.width_ = a.viewWidth, this.setBackgroundPath_(a.viewWidth - 2 * this.CORNER_RADIUS, this.height_ - this.CORNER_RADIUS), this.positionAt_(this.width_, this.height_, 0, this.targetWorkspace_.toolboxPosition == this.toolboxPosition_ ? a.toolboxHeight ? this.toolboxPosition_ == Blockly.TOOLBOX_AT_TOP ? a.toolboxHeight : a.viewHeight - this.height_ : this.toolboxPosition_ == Blockly.TOOLBOX_AT_TOP ? 0 : a.viewHeight :
            this.toolboxPosition_ == Blockly.TOOLBOX_AT_TOP ? 0 : a.viewHeight + a.absoluteTop - this.height_))
    }
};
Blockly.HorizontalFlyout.prototype.setBackgroundPath_ = function(a, b) {
    var c = this.toolboxPosition_ == Blockly.TOOLBOX_AT_TOP,
        d = ["M 0," + (c ? 0 : this.CORNER_RADIUS)];
    c ? (d.push("h", a + 2 * this.CORNER_RADIUS), d.push("v", b), d.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, 1, -this.CORNER_RADIUS, this.CORNER_RADIUS), d.push("h", -a), d.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, 1, -this.CORNER_RADIUS, -this.CORNER_RADIUS)) : (d.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, 1, this.CORNER_RADIUS, -this.CORNER_RADIUS),
        d.push("h", a), d.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, 1, this.CORNER_RADIUS, this.CORNER_RADIUS), d.push("v", b), d.push("h", -a - 2 * this.CORNER_RADIUS));
    d.push("z");
    this.svgBackground_.setAttribute("d", d.join(" "))
};
Blockly.HorizontalFlyout.prototype.scrollToStart = function() { this.scrollbar_.set(this.RTL ? Infinity : 0) };
Blockly.HorizontalFlyout.prototype.wheel_ = function(a) {
    var b = Blockly.utils.getScrollDeltaPixels(a),
        c = b.x || b.y;
    c && (b = this.getMetrics_(), c = b.viewLeft + c, c = Math.min(c, b.contentWidth - b.viewWidth), c = Math.max(c, 0), this.scrollbar_.set(c), Blockly.WidgetDiv.hide());
    a.preventDefault();
    a.stopPropagation()
};
Blockly.HorizontalFlyout.prototype.layout_ = function(a, b) {
    this.workspace_.scale = this.targetWorkspace_.scale;
    var c = this.MARGIN,
        d = c + this.tabWidth_;
    this.RTL && (a = a.reverse());
    for (var e = 0, f; f = a[e]; e++)
        if ("block" == f.type) {
            f = f.block;
            for (var g = f.getDescendants(!1), h = 0, k; k = g[h]; h++) k.isInFlyout = !0;
            f.render();
            g = f.getSvgRoot();
            h = f.getHeightWidth();
            k = f.outputConnection ? this.tabWidth_ : 0;
            k = this.RTL ? d + h.width : d - k;
            f.moveBy(k, c);
            k = this.createRect_(f, k, c, h, e);
            d += h.width + b[e];
            this.addBlockListeners_(g, f, k)
        } else "button" ==
            f.type && (this.initFlyoutButton_(f.button, d, c), d += f.button.width + b[e])
};
Blockly.HorizontalFlyout.prototype.isDragTowardWorkspace = function(a) { a = Math.atan2(a.y, a.x) / Math.PI * 180; var b = this.dragAngleRange_; return a < 90 + b && a > 90 - b || a > -90 - b && a < -90 + b ? !0 : !1 };
Blockly.HorizontalFlyout.prototype.getClientRect = function() {
    if (!this.svgGroup_) return null;
    var a = this.svgGroup_.getBoundingClientRect(),
        b = a.top;
    return this.toolboxPosition_ == Blockly.TOOLBOX_AT_TOP ? new Blockly.utils.Rect(-1E9, b + a.height, -1E9, 1E9) : new Blockly.utils.Rect(b, 1E9, -1E9, 1E9)
};
Blockly.HorizontalFlyout.prototype.reflowInternal_ = function() {
    this.workspace_.scale = this.targetWorkspace_.scale;
    for (var a = 0, b = this.workspace_.getTopBlocks(!1), c = 0, d; d = b[c]; c++) a = Math.max(a, d.getHeightWidth().height);
    a += 1.5 * this.MARGIN;
    a *= this.workspace_.scale;
    a += Blockly.Scrollbar.scrollbarThickness;
    if (this.height_ != a) {
        for (c = 0; d = b[c]; c++) d.flyoutRect_ && this.moveRectToBlock_(d.flyoutRect_, d);
        this.height_ = a;
        this.position()
    }
};
Blockly.VerticalFlyout = function(a) {
    a.getMetrics = this.getMetrics_.bind(this);
    a.setMetrics = this.setMetrics_.bind(this);
    Blockly.VerticalFlyout.superClass_.constructor.call(this, a);
    this.horizontalLayout_ = !1
};
Blockly.utils.object.inherits(Blockly.VerticalFlyout, Blockly.Flyout);
Blockly.VerticalFlyout.prototype.getMetrics_ = function() {
    if (!this.isVisible()) return null;
    try { var a = this.workspace_.getCanvas().getBBox() } catch (e) { a = { height: 0, y: 0, width: 0, x: 0 } }
    var b = this.SCROLLBAR_PADDING,
        c = this.height_ - 2 * this.SCROLLBAR_PADDING,
        d = this.width_;
    this.RTL || (d -= this.SCROLLBAR_PADDING);
    return {
        viewHeight: c,
        viewWidth: d,
        contentHeight: a.height * this.workspace_.scale + 2 * this.MARGIN,
        contentWidth: a.width * this.workspace_.scale + 2 * this.MARGIN,
        viewTop: -this.workspace_.scrollY + a.y,
        viewLeft: -this.workspace_.scrollX,
        contentTop: a.y,
        contentLeft: a.x,
        absoluteTop: b,
        absoluteLeft: 0
    }
};
Blockly.VerticalFlyout.prototype.setMetrics_ = function(a) {
    var b = this.getMetrics_();
    b && ("number" == typeof a.y && (this.workspace_.scrollY = -b.contentHeight * a.y), this.workspace_.translate(this.workspace_.scrollX + b.absoluteLeft, this.workspace_.scrollY + b.absoluteTop))
};
Blockly.VerticalFlyout.prototype.position = function() {
    if (this.isVisible()) {
        var a = this.targetWorkspace_.getMetrics();
        a && (this.height_ = a.viewHeight, this.setBackgroundPath_(this.width_ - this.CORNER_RADIUS, a.viewHeight - 2 * this.CORNER_RADIUS), this.positionAt_(this.width_, this.height_, this.targetWorkspace_.toolboxPosition == this.toolboxPosition_ ? a.toolboxWidth ? this.toolboxPosition_ == Blockly.TOOLBOX_AT_LEFT ? a.toolboxWidth : a.viewWidth - this.width_ : this.toolboxPosition_ == Blockly.TOOLBOX_AT_LEFT ? 0 : a.viewWidth : this.toolboxPosition_ ==
            Blockly.TOOLBOX_AT_LEFT ? 0 : a.viewWidth + a.absoluteLeft - this.width_, 0))
    }
};
Blockly.VerticalFlyout.prototype.setBackgroundPath_ = function(a, b) {
    var c = this.toolboxPosition_ == Blockly.TOOLBOX_AT_RIGHT,
        d = a + this.CORNER_RADIUS;
    d = ["M " + (c ? d : 0) + ",0"];
    d.push("h", c ? -a : a);
    d.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, c ? 0 : 1, c ? -this.CORNER_RADIUS : this.CORNER_RADIUS, this.CORNER_RADIUS);
    d.push("v", Math.max(0, b));
    d.push("a", this.CORNER_RADIUS, this.CORNER_RADIUS, 0, 0, c ? 0 : 1, c ? this.CORNER_RADIUS : -this.CORNER_RADIUS, this.CORNER_RADIUS);
    d.push("h", c ? a : -a);
    d.push("z");
    this.svgBackground_.setAttribute("d",
        d.join(" "))
};
Blockly.VerticalFlyout.prototype.scrollToStart = function() { this.scrollbar_.set(0) };
Blockly.VerticalFlyout.prototype.wheel_ = function(a) {
    var b = Blockly.utils.getScrollDeltaPixels(a);
    if (b.y) {
        var c = this.getMetrics_();
        b = c.viewTop - c.contentTop + b.y;
        b = Math.min(b, c.contentHeight - c.viewHeight);
        b = Math.max(b, 0);
        this.scrollbar_.set(b);
        Blockly.WidgetDiv.hide()
    }
    a.preventDefault();
    a.stopPropagation()
};
Blockly.VerticalFlyout.prototype.layout_ = function(a, b) {
    this.workspace_.scale = this.targetWorkspace_.scale;
    for (var c = this.MARGIN, d = this.RTL ? c : c + this.tabWidth_, e = 0, f; f = a[e]; e++)
        if ("block" == f.type) {
            f = f.block;
            for (var g = f.getDescendants(!1), h = 0, k; k = g[h]; h++) k.isInFlyout = !0;
            f.render();
            g = f.getSvgRoot();
            h = f.getHeightWidth();
            k = f.outputConnection ? d - this.tabWidth_ : d;
            f.moveBy(k, c);
            k = this.createRect_(f, this.RTL ? k - h.width : k, c, h, e);
            this.addBlockListeners_(g, f, k);
            c += h.height + b[e]
        } else "button" == f.type && (this.initFlyoutButton_(f.button,
            d, c), c += f.button.height + b[e])
};
Blockly.VerticalFlyout.prototype.isDragTowardWorkspace = function(a) { a = Math.atan2(a.y, a.x) / Math.PI * 180; var b = this.dragAngleRange_; return a < b && a > -b || a < -180 + b || a > 180 - b ? !0 : !1 };
Blockly.VerticalFlyout.prototype.getClientRect = function() {
    if (!this.svgGroup_) return null;
    var a = this.svgGroup_.getBoundingClientRect(),
        b = a.left;
    return this.toolboxPosition_ == Blockly.TOOLBOX_AT_LEFT ? new Blockly.utils.Rect(-1E9, 1E9, -1E9, b + a.width) : new Blockly.utils.Rect(-1E9, 1E9, b, 1E9)
};
Blockly.VerticalFlyout.prototype.reflowInternal_ = function() {
    this.workspace_.scale = this.targetWorkspace_.scale;
    for (var a = 0, b = this.workspace_.getTopBlocks(!1), c = 0, d; d = b[c]; c++) {
        var e = d.getHeightWidth().width;
        d.outputConnection && (e -= this.tabWidth_);
        a = Math.max(a, e)
    }
    for (c = 0; d = this.buttons_[c]; c++) a = Math.max(a, d.width);
    a += 1.5 * this.MARGIN + this.tabWidth_;
    a *= this.workspace_.scale;
    a += Blockly.Scrollbar.scrollbarThickness;
    if (this.width_ != a) {
        for (c = 0; d = b[c]; c++) {
            if (this.RTL) {
                e = d.getRelativeToSurfaceXY().x;
                var f =
                    a / this.workspace_.scale - this.MARGIN;
                d.outputConnection || (f -= this.tabWidth_);
                d.moveBy(f - e, 0)
            }
            d.flyoutRect_ && this.moveRectToBlock_(d.flyoutRect_, d)
        }
        if (this.RTL)
            for (c = 0; d = this.buttons_[c]; c++) b = d.getPosition().y, d.moveTo(a / this.workspace_.scale - d.width - this.MARGIN - this.tabWidth_, b);
        this.width_ = a;
        this.position()
    }
};
Blockly.FlyoutButton = function(a, b, c, d) {
    this.workspace_ = a;
    this.targetWorkspace_ = b;
    this.text_ = c.getAttribute("text");
    this.position_ = new Blockly.utils.Coordinate(0, 0);
    this.isLabel_ = d;
    this.callbackKey_ = c.getAttribute("callbackKey") || c.getAttribute("callbackkey");
    this.cssClass_ = c.getAttribute("web-class") || null;
    this.onMouseUpWrapper_ = null
};
Blockly.FlyoutButton.MARGIN_X = 5;
Blockly.FlyoutButton.MARGIN_Y = 2;
Blockly.FlyoutButton.prototype.width = 0;
Blockly.FlyoutButton.prototype.height = 0;
Blockly.FlyoutButton.prototype.createDom = function() {
    var a = this.isLabel_ ? "blocklyFlyoutLabel" : "blocklyFlyoutButton";
    this.cssClass_ && (a += " " + this.cssClass_);
    this.svgGroup_ = Blockly.utils.dom.createSvgElement("g", { "class": a }, this.workspace_.getCanvas());
    if (!this.isLabel_) var b = Blockly.utils.dom.createSvgElement("rect", { "class": "blocklyFlyoutButtonShadow", rx: 4, ry: 4, x: 1, y: 1 }, this.svgGroup_);
    a = Blockly.utils.dom.createSvgElement("rect", {
        "class": this.isLabel_ ? "blocklyFlyoutLabelBackground" : "blocklyFlyoutButtonBackground",
        rx: 4,
        ry: 4
    }, this.svgGroup_);
    var c = Blockly.utils.dom.createSvgElement("text", { "class": this.isLabel_ ? "blocklyFlyoutLabelText" : "blocklyText", x: 0, y: 0, "text-anchor": "middle" }, this.svgGroup_),
        d = Blockly.utils.replaceMessageReferences(this.text_);
    this.workspace_.RTL && (d += "\u200f");
    c.textContent = d;
    this.isLabel_ && (this.svgText_ = c, this.workspace_.getThemeManager().subscribe(this.svgText_, "flyoutForegroundColour", "fill"));
    var e = Blockly.utils.style.getComputedStyle(c, "fontSize"),
        f = Blockly.utils.style.getComputedStyle(c,
            "fontWeight"),
        g = Blockly.utils.style.getComputedStyle(c, "fontFamily");
    this.width = Blockly.utils.dom.getFastTextWidthWithSizeString(c, e, f, g);
    d = Blockly.utils.dom.measureFontMetrics(d, e, f, g);
    this.height = d.height;
    this.isLabel_ || (this.width += 2 * Blockly.FlyoutButton.MARGIN_X, this.height += 2 * Blockly.FlyoutButton.MARGIN_Y, b.setAttribute("width", this.width), b.setAttribute("height", this.height));
    a.setAttribute("width", this.width);
    a.setAttribute("height", this.height);
    c.setAttribute("x", this.width / 2);
    c.setAttribute("y",
        this.height / 2 - d.height / 2 + d.baseline);
    this.updateTransform_();
    this.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(this.svgGroup_, "mouseup", this, this.onMouseUp_);
    return this.svgGroup_
};
Blockly.FlyoutButton.prototype.show = function() {
    this.updateTransform_();
    this.svgGroup_.setAttribute("display", "block")
};
Blockly.FlyoutButton.prototype.updateTransform_ = function() { this.svgGroup_.setAttribute("transform", "translate(" + this.position_.x + "," + this.position_.y + ")") };
Blockly.FlyoutButton.prototype.moveTo = function(a, b) {
    this.position_.x = a;
    this.position_.y = b;
    this.updateTransform_()
};
Blockly.FlyoutButton.prototype.getPosition = function() { return this.position_ };
Blockly.FlyoutButton.prototype.getTargetWorkspace = function() { return this.targetWorkspace_ };
Blockly.FlyoutButton.prototype.dispose = function() {
    this.onMouseUpWrapper_ && Blockly.unbindEvent_(this.onMouseUpWrapper_);
    this.svgGroup_ && Blockly.utils.dom.removeNode(this.svgGroup_);
    this.svgText_ && this.workspace_.getThemeManager().unsubscribe(this.svgText_)
};
Blockly.FlyoutButton.prototype.onMouseUp_ = function(a) {
    (a = this.targetWorkspace_.getGesture(a)) && a.cancel();
    this.isLabel_ && this.callbackKey_ ? console.warn("Labels should not have callbacks. Label text: " + this.text_) : this.isLabel_ || this.callbackKey_ && this.targetWorkspace_.getButtonCallback(this.callbackKey_) ? this.isLabel_ || this.targetWorkspace_.getButtonCallback(this.callbackKey_)(this) : console.warn("Buttons should have callbacks. Button text: " + this.text_)
};
Blockly.Css.register(".blocklyFlyoutButton {,fill: #888;,cursor: default;,},.blocklyFlyoutButtonShadow {,fill: #666;,},.blocklyFlyoutButton:hover {,fill: #aaa;,},.blocklyFlyoutLabel {,cursor: default;,},.blocklyFlyoutLabelBackground {,opacity: 0;,}".split(","));
Blockly.Generator = function(a) {
    this.name_ = a;
    this.FUNCTION_NAME_PLACEHOLDER_REGEXP_ = new RegExp(this.FUNCTION_NAME_PLACEHOLDER_, "g")
};
Blockly.Generator.NAME_TYPE = "generated_function";
Blockly.Generator.prototype.INFINITE_LOOP_TRAP = null;
Blockly.Generator.prototype.STATEMENT_PREFIX = null;
Blockly.Generator.prototype.STATEMENT_SUFFIX = null;
Blockly.Generator.prototype.INDENT = "  ";
Blockly.Generator.prototype.COMMENT_WRAP = 60;
Blockly.Generator.prototype.ORDER_OVERRIDES = [];
Blockly.Generator.prototype.workspaceToCode = function(a) {
    a || (console.warn("No workspace specified in workspaceToCode call.  Guessing."), a = Blockly.getMainWorkspace());
    var b = [];
    this.init(a);
    a = a.getTopBlocks(!0);
    for (var c = 0, d; d = a[c]; c++) {
        var e = this.blockToCode(d);
        Array.isArray(e) && (e = e[0]);
        e && (d.outputConnection && (e = this.scrubNakedValue(e), this.STATEMENT_PREFIX && !d.suppressPrefixSuffix && (e = this.injectId(this.STATEMENT_PREFIX, d) + e), this.STATEMENT_SUFFIX && !d.suppressPrefixSuffix && (e += this.injectId(this.STATEMENT_SUFFIX,
            d))), b.push(e))
    }
    b = b.join("\n");
    b = this.finish(b);
    b = b.replace(/^\s+\n/, "");
    b = b.replace(/\n\s+$/, "\n");
    return b = b.replace(/[ \t]+\n/g, "\n")
};
Blockly.Generator.prototype.prefixLines = function(a, b) { return b + a.replace(/(?!\n$)\n/g, "\n" + b) };
Blockly.Generator.prototype.allNestedComments = function(a) {
    var b = [];
    a = a.getDescendants(!0);
    for (var c = 0; c < a.length; c++) {
        var d = a[c].getCommentText();
        d && b.push(d)
    }
    b.length && b.push("");
    return b.join("\n")
};
Blockly.Generator.prototype.blockToCode = function(a, b) {
    if (!a) return "";
    if (!a.isEnabled()) return b ? "" : this.blockToCode(a.getNextBlock());
    var c = this[a.type];
    if ("function" != typeof c) throw Error('Language "' + this.name_ + '" does not know how to generate  code for block type "' + a.type + '".');
    c = c.call(a, a);
    if (Array.isArray(c)) { if (!a.outputConnection) throw TypeError("Expecting string from statement block: " + a.type); return [this.scrub_(a, c[0], b), c[1]] }
    if ("string" == typeof c) return this.STATEMENT_PREFIX && !a.suppressPrefixSuffix &&
        (c = this.injectId(this.STATEMENT_PREFIX, a) + c), this.STATEMENT_SUFFIX && !a.suppressPrefixSuffix && (c += this.injectId(this.STATEMENT_SUFFIX, a)), this.scrub_(a, c, b);
    if (null === c) return "";
    throw SyntaxError("Invalid code generated: " + c);
};
Blockly.Generator.prototype.valueToCode = function(a, b, c) {
    if (isNaN(c)) throw TypeError("Expecting valid order from block: " + a.type);
    var d = a.getInputTargetBlock(b);
    if (!d) return "";
    b = this.blockToCode(d);
    if ("" === b) return "";
    if (!Array.isArray(b)) throw TypeError("Expecting tuple from value block: " + d.type);
    a = b[0];
    b = b[1];
    if (isNaN(b)) throw TypeError("Expecting valid order from value block: " + d.type);
    if (!a) return "";
    d = !1;
    var e = Math.floor(c),
        f = Math.floor(b);
    if (e <= f && (e != f || 0 != e && 99 != e))
        for (d = !0, e = 0; e < this.ORDER_OVERRIDES.length; e++)
            if (this.ORDER_OVERRIDES[e][0] ==
                c && this.ORDER_OVERRIDES[e][1] == b) { d = !1; break }
    d && (a = "(" + a + ")");
    return a
};
Blockly.Generator.prototype.statementToCode = function(a, b) {
    a = a.getInputTargetBlock(b);
    b = this.blockToCode(a);
    if ("string" != typeof b) throw TypeError("Expecting code from statement block: " + (a && a.type));
    b && (b = this.prefixLines(b, this.INDENT));
    return b
};
Blockly.Generator.prototype.addLoopTrap = function(a, b) {
    this.INFINITE_LOOP_TRAP && (a = this.prefixLines(this.injectId(this.INFINITE_LOOP_TRAP, b), this.INDENT) + a);
    this.STATEMENT_SUFFIX && !b.suppressPrefixSuffix && (a = this.prefixLines(this.injectId(this.STATEMENT_SUFFIX, b), this.INDENT) + a);
    this.STATEMENT_PREFIX && !b.suppressPrefixSuffix && (a += this.prefixLines(this.injectId(this.STATEMENT_PREFIX, b), this.INDENT));
    return a
};
Blockly.Generator.prototype.injectId = function(a, b) { b = b.id.replace(/\$/g, "$$$$"); return a.replace(/%1/g, "'" + b + "'") };
Blockly.Generator.prototype.RESERVED_WORDS_ = "";
Blockly.Generator.prototype.addReservedWords = function(a) { this.RESERVED_WORDS_ += a + "," };
Blockly.Generator.prototype.FUNCTION_NAME_PLACEHOLDER_ = "{leCUI8hutHZI4480Dc}";
Blockly.Generator.prototype.provideFunction_ = function(a, b) {
    if (!this.definitions_[a]) {
        var c = this.variableDB_.getDistinctName(a, Blockly.PROCEDURE_CATEGORY_NAME);
        this.functionNames_[a] = c;
        b = b.join("\n").replace(this.FUNCTION_NAME_PLACEHOLDER_REGEXP_, c);
        for (var d; d != b;) d = b, b = b.replace(/^(( {2})*) {2}/gm, "$1\x00");
        b = b.replace(/\0/g, this.INDENT);
        this.definitions_[a] = b
    }
    return this.functionNames_[a]
};
Blockly.Generator.prototype.init = function(a) {};
Blockly.Generator.prototype.scrub_ = function(a, b, c) { return b };
Blockly.Generator.prototype.finish = function(a) { return a };
Blockly.Generator.prototype.scrubNakedValue = function(a) { return a };
Blockly.tree = {};
Blockly.tree.BaseNode = function(a, b) {
    Blockly.Component.call(this);
    this.content = a;
    this.config_ = b;
    this.expanded_ = this.selected_ = !1;
    this.isUserCollapsible_ = !0;
    this.depth_ = -1
};
Blockly.utils.object.inherits(Blockly.tree.BaseNode, Blockly.Component);
Blockly.tree.BaseNode.allNodes = {};
Blockly.tree.BaseNode.prototype.disposeInternal = function() {
    Blockly.tree.BaseNode.superClass_.disposeInternal.call(this);
    this.tree && (this.tree = null);
    this.setElementInternal(null)
};
Blockly.tree.BaseNode.prototype.initAccessibility = function() {
    var a = this.getElement();
    if (a) {
        var b = this.getLabelElement();
        b && !b.id && (b.id = this.getId() + ".label");
        Blockly.utils.aria.setRole(a, Blockly.utils.aria.Role.TREEITEM);
        Blockly.utils.aria.setState(a, Blockly.utils.aria.State.SELECTED, !1);
        Blockly.utils.aria.setState(a, Blockly.utils.aria.State.LEVEL, this.getDepth());
        b && Blockly.utils.aria.setState(a, Blockly.utils.aria.State.LABELLEDBY, b.id);
        (b = this.getIconElement()) && Blockly.utils.aria.setRole(b, Blockly.utils.aria.Role.PRESENTATION);
        if (b = this.getChildrenElement())
            if (Blockly.utils.aria.setRole(b, Blockly.utils.aria.Role.GROUP), b.hasChildNodes())
                for (Blockly.utils.aria.setState(a, Blockly.utils.aria.State.EXPANDED, !1), a = this.getChildCount(), b = 1; b <= a; b++) {
                    var c = this.getChildAt(b - 1).getElement();
                    Blockly.utils.aria.setState(c, Blockly.utils.aria.State.SETSIZE, a);
                    Blockly.utils.aria.setState(c, Blockly.utils.aria.State.POSINSET, b)
                }
    }
};
Blockly.tree.BaseNode.prototype.createDom = function() {
    var a = document.createElement("div");
    a.appendChild(this.toDom());
    this.setElementInternal(a)
};
Blockly.tree.BaseNode.prototype.enterDocument = function() {
    Blockly.tree.BaseNode.superClass_.enterDocument.call(this);
    Blockly.tree.BaseNode.allNodes[this.getId()] = this;
    this.initAccessibility()
};
Blockly.tree.BaseNode.prototype.exitDocument = function() {
    Blockly.tree.BaseNode.superClass_.exitDocument.call(this);
    delete Blockly.tree.BaseNode.allNodes[this.getId()]
};
Blockly.tree.BaseNode.prototype.addChildAt = function(a, b) {
    var c = this.getChildAt(b - 1),
        d = this.getChildAt(b);
    Blockly.tree.BaseNode.superClass_.addChildAt.call(this, a, b);
    a.previousSibling_ = c;
    a.nextSibling_ = d;
    c && (c.nextSibling_ = a);
    d && (d.previousSibling_ = a);
    (b = this.getTree()) && a.setTreeInternal(b);
    a.setDepth_(this.getDepth() + 1);
    if (b = this.getElement())
        if (this.updateExpandIcon(), Blockly.utils.aria.setState(b, Blockly.utils.aria.State.EXPANDED, this.expanded_), this.expanded_) {
            b = this.getChildrenElement();
            a.getElement() ||
                a.createDom();
            var e = a.getElement(),
                f = d && d.getElement();
            b.insertBefore(e, f);
            this.isInDocument() && a.enterDocument();
            d || (c ? c.updateExpandIcon() : (Blockly.utils.style.setElementShown(b, !0), this.setExpanded(this.expanded_)))
        }
};
Blockly.tree.BaseNode.prototype.add = function(a) {
    if (a.getParent()) throw Error(Blockly.Component.Error.PARENT_UNABLE_TO_BE_SET);
    this.addChildAt(a, this.getChildCount())
};
Blockly.tree.BaseNode.prototype.getTree = function() { return null };
Blockly.tree.BaseNode.prototype.getDepth = function() {
    var a = this.depth_;
    0 > a && (a = (a = this.getParent()) ? a.getDepth() + 1 : 0, this.setDepth_(a));
    return a
};
Blockly.tree.BaseNode.prototype.setDepth_ = function(a) {
    if (a != this.depth_) {
        this.depth_ = a;
        var b = this.getRowElement();
        if (b) {
            var c = this.getPixelIndent_() + "px";
            this.rightToLeft_ ? b.style.paddingRight = c : b.style.paddingLeft = c
        }
        this.forEachChild(function(b) { b.setDepth_(a + 1) })
    }
};
Blockly.tree.BaseNode.prototype.contains = function(a) {
    for (; a;) {
        if (a == this) return !0;
        a = a.getParent()
    }
    return !1
};
Blockly.tree.BaseNode.prototype.getChildren = function() {
    var a = [];
    this.forEachChild(function(b) { a.push(b) });
    return a
};
Blockly.tree.BaseNode.prototype.getPreviousSibling = function() { return this.previousSibling_ };
Blockly.tree.BaseNode.prototype.getNextSibling = function() { return this.nextSibling_ };
Blockly.tree.BaseNode.prototype.isLastSibling = function() { return !this.nextSibling_ };
Blockly.tree.BaseNode.prototype.isSelected = function() { return this.selected_ };
Blockly.tree.BaseNode.prototype.select = function() {
    var a = this.getTree();
    a && a.setSelectedItem(this)
};
Blockly.tree.BaseNode.prototype.setSelected = function(a) {
    if (this.selected_ != a) {
        this.selected_ = a;
        this.updateRow();
        var b = this.getElement();
        b && (Blockly.utils.aria.setState(b, Blockly.utils.aria.State.SELECTED, a), a && (a = this.getTree().getElement(), Blockly.utils.aria.setState(a, Blockly.utils.aria.State.ACTIVEDESCENDANT, this.getId())))
    }
};
Blockly.tree.BaseNode.prototype.setExpanded = function(a) {
    var b = a != this.expanded_,
        c;
    this.expanded_ = a;
    var d = this.getTree(),
        e = this.getElement();
    if (this.hasChildren()) {
        if (!a && d && this.contains(d.getSelectedItem()) && this.select(), e) {
            if (c = this.getChildrenElement()) Blockly.utils.style.setElementShown(c, a), Blockly.utils.aria.setState(e, Blockly.utils.aria.State.EXPANDED, a), a && this.isInDocument() && !c.hasChildNodes() && (this.forEachChild(function(a) { c.appendChild(a.toDom()) }), this.forEachChild(function(a) { a.enterDocument() }));
            this.updateExpandIcon()
        }
    } else(c = this.getChildrenElement()) && Blockly.utils.style.setElementShown(c, !1);
    e && this.updateIcon_();
    b && (a ? this.doNodeExpanded() : this.doNodeCollapsed())
};
Blockly.tree.BaseNode.prototype.doNodeExpanded = function() {};
Blockly.tree.BaseNode.prototype.doNodeCollapsed = function() {};
Blockly.tree.BaseNode.prototype.toggle = function() { this.setExpanded(!this.expanded_) };
Blockly.tree.BaseNode.prototype.toDom = function() {
    var a = this.expanded_ && this.hasChildren(),
        b = document.createElement("div");
    b.style.backgroundPosition = this.getBackgroundPosition();
    a || (b.style.display = "none");
    a && this.forEachChild(function(a) { b.appendChild(a.toDom()) });
    a = document.createElement("div");
    a.id = this.getId();
    a.appendChild(this.getRowDom());
    a.appendChild(b);
    return a
};
Blockly.tree.BaseNode.prototype.getPixelIndent_ = function() { return Math.max(0, (this.getDepth() - 1) * this.config_.indentWidth) };
Blockly.tree.BaseNode.prototype.getRowDom = function() {
    var a = document.createElement("div");
    a.className = this.getRowClassName();
    a.style["padding-" + (this.rightToLeft_ ? "right" : "left")] = this.getPixelIndent_() + "px";
    a.appendChild(this.getIconDom());
    a.appendChild(this.getLabelDom());
    return a
};
Blockly.tree.BaseNode.prototype.getRowClassName = function() {
    var a = "";
    this.isSelected() && (a = " " + (this.config_.cssSelectedRow || ""));
    return this.config_.cssTreeRow + a
};
Blockly.tree.BaseNode.prototype.getLabelDom = function() {
    var a = document.createElement("span");
    a.className = this.config_.cssItemLabel || "";
    a.textContent = this.content;
    return a
};
Blockly.tree.BaseNode.prototype.getIconDom = function() {
    var a = document.createElement("span");
    a.style.display = "inline-block";
    a.className = this.getCalculatedIconClass();
    return a
};
Blockly.tree.BaseNode.prototype.getCalculatedIconClass = function() { throw Error("unimplemented abstract method"); };
Blockly.tree.BaseNode.prototype.getBackgroundPosition = function() { return (this.isLastSibling() ? "-100" : (this.getDepth() - 1) * this.config_.indentWidth) + "px 0" };
Blockly.tree.BaseNode.prototype.getElement = function() {
    var a = Blockly.tree.BaseNode.superClass_.getElement.call(this);
    a || (a = document.getElementById(this.getId()), this.setElementInternal(a));
    return a
};
Blockly.tree.BaseNode.prototype.getRowElement = function() { var a = this.getElement(); return a ? a.firstChild : null };
Blockly.tree.BaseNode.prototype.getIconElement = function() { var a = this.getRowElement(); return a ? a.firstChild : null };
Blockly.tree.BaseNode.prototype.getLabelElement = function() { var a = this.getRowElement(); return a && a.lastChild ? a.lastChild.previousSibling : null };
Blockly.tree.BaseNode.prototype.getChildrenElement = function() { var a = this.getElement(); return a ? a.lastChild : null };
Blockly.tree.BaseNode.prototype.updateRow = function() {
    var a = this.getRowElement();
    a && (a.className = this.getRowClassName())
};
Blockly.tree.BaseNode.prototype.updateExpandIcon = function() {
    var a = this.getChildrenElement();
    a && (a.style.backgroundPosition = this.getBackgroundPosition())
};
Blockly.tree.BaseNode.prototype.updateIcon_ = function() { this.getIconElement().className = this.getCalculatedIconClass() };
Blockly.tree.BaseNode.prototype.onMouseDown = function(a) { "expand" == a.target.getAttribute("type") && this.hasChildren() ? this.isUserCollapsible_ && this.toggle() : (this.select(), this.updateRow()) };
Blockly.tree.BaseNode.prototype.onClick_ = function(a) { a.preventDefault() };
Blockly.tree.BaseNode.prototype.onKeyDown = function(a) {
    var b = !0;
    switch (a.keyCode) {
        case Blockly.utils.KeyCodes.RIGHT:
            if (a.altKey) break;
            b = this.selectChild();
            break;
        case Blockly.utils.KeyCodes.LEFT:
            if (a.altKey) break;
            b = this.selectParent();
            break;
        case Blockly.utils.KeyCodes.DOWN:
            b = this.selectNext();
            break;
        case Blockly.utils.KeyCodes.UP:
            b = this.selectPrevious();
            break;
        default:
            b = !1
    }
    b && a.preventDefault();
    return b
};
Blockly.tree.BaseNode.prototype.selectNext = function() {
    var a = this.getNextShownNode();
    a && a.select();
    return !0
};
Blockly.tree.BaseNode.prototype.selectPrevious = function() {
    var a = this.getPreviousShownNode();
    a && a.select();
    return !0
};
Blockly.tree.BaseNode.prototype.selectParent = function() {
    if (this.hasChildren() && this.expanded_ && this.isUserCollapsible_) this.setExpanded(!1);
    else {
        var a = this.getParent(),
            b = this.getTree();
        a && a != b && a.select()
    }
    return !0
};
Blockly.tree.BaseNode.prototype.selectChild = function() { return this.hasChildren() ? (this.expanded_ ? this.getChildAt(0).select() : this.setExpanded(!0), !0) : !1 };
Blockly.tree.BaseNode.prototype.getLastShownDescendant = function() { return this.expanded_ && this.hasChildren() ? this.getChildAt(this.getChildCount() - 1).getLastShownDescendant() : this };
Blockly.tree.BaseNode.prototype.getNextShownNode = function() {
    if (this.hasChildren() && this.expanded_) return this.getChildAt(0);
    for (var a = this, b; a != this.getTree();) {
        b = a.getNextSibling();
        if (null != b) return b;
        a = a.getParent()
    }
    return null
};
Blockly.tree.BaseNode.prototype.getPreviousShownNode = function() {
    var a = this.getPreviousSibling();
    if (null != a) return a.getLastShownDescendant();
    a = this.getParent();
    var b = this.getTree();
    return a == b || this == b ? null : a
};
Blockly.tree.BaseNode.prototype.setTreeInternal = function(a) { this.tree != a && (this.tree = a, this.forEachChild(function(b) { b.setTreeInternal(a) })) };
Blockly.tree.TreeNode = function(a, b, c) {
    this.toolbox_ = a;
    Blockly.tree.BaseNode.call(this, b, c)
};
Blockly.utils.object.inherits(Blockly.tree.TreeNode, Blockly.tree.BaseNode);
Blockly.tree.TreeNode.prototype.getTree = function() { if (this.tree) return this.tree; var a = this.getParent(); return a && (a = a.getTree()) ? (this.setTreeInternal(a), a) : null };
Blockly.tree.TreeNode.prototype.getCalculatedIconClass = function() {
    var a = this.expanded_;
    if (a && this.expandedIconClass) return this.expandedIconClass;
    var b = this.iconClass;
    if (!a && b) return b;
    b = this.config_;
    if (this.hasChildren()) { if (a && b.cssExpandedFolderIcon) return b.cssTreeIcon + " " + b.cssExpandedFolderIcon; if (!a && b.cssCollapsedFolderIcon) return b.cssTreeIcon + " " + b.cssCollapsedFolderIcon } else if (b.cssFileIcon) return b.cssTreeIcon + " " + b.cssFileIcon;
    return ""
};
Blockly.tree.TreeNode.prototype.onClick_ = function(a) {
    this.hasChildren() && this.isUserCollapsible_ ? (this.toggle(), this.select()) : this.isSelected() ? this.getTree().setSelectedItem(null) : this.select();
    this.updateRow()
};
Blockly.tree.TreeNode.prototype.onMouseDown = function(a) {};
Blockly.tree.TreeNode.prototype.onKeyDown = function(a) {
    if (this.tree.toolbox_.horizontalLayout_) {
        var b = {},
            c = Blockly.utils.KeyCodes.DOWN,
            d = Blockly.utils.KeyCodes.UP;
        b[Blockly.utils.KeyCodes.RIGHT] = this.rightToLeft_ ? d : c;
        b[Blockly.utils.KeyCodes.LEFT] = this.rightToLeft_ ? c : d;
        b[Blockly.utils.KeyCodes.UP] = Blockly.utils.KeyCodes.LEFT;
        b[Blockly.utils.KeyCodes.DOWN] = Blockly.utils.KeyCodes.RIGHT;
        Object.defineProperties(a, { keyCode: { value: b[a.keyCode] || a.keyCode } })
    }
    return Blockly.tree.TreeNode.superClass_.onKeyDown.call(this,
        a)
};
Blockly.tree.TreeNode.prototype.onSizeChanged = function(a) { this.onSizeChanged_ = a };
Blockly.tree.TreeNode.prototype.resizeToolbox_ = function() { this.onSizeChanged_ && this.onSizeChanged_.call(this.toolbox_) };
Blockly.tree.TreeNode.prototype.doNodeExpanded = Blockly.tree.TreeNode.prototype.resizeToolbox_;
Blockly.tree.TreeNode.prototype.doNodeCollapsed = Blockly.tree.TreeNode.prototype.resizeToolbox_;
Blockly.tree.TreeControl = function(a, b) {
    this.toolbox_ = a;
    this.onKeydownWrapper_ = this.onClickWrapper_ = this.onBlurWrapper_ = this.onFocusWrapper_ = null;
    Blockly.tree.BaseNode.call(this, "", b);
    this.selected_ = this.expanded_ = !0;
    this.selectedItem_ = this
};
Blockly.utils.object.inherits(Blockly.tree.TreeControl, Blockly.tree.BaseNode);
Blockly.tree.TreeControl.prototype.getTree = function() { return this };
Blockly.tree.TreeControl.prototype.getToolbox = function() { return this.toolbox_ };
Blockly.tree.TreeControl.prototype.getDepth = function() { return 0 };
Blockly.tree.TreeControl.prototype.handleFocus_ = function(a) {
    this.focused_ = !0;
    a = this.getElement();
    Blockly.utils.dom.addClass(a, "focused");
    this.selectedItem_ && this.selectedItem_.select()
};
Blockly.tree.TreeControl.prototype.handleBlur_ = function(a) {
    this.focused_ = !1;
    a = this.getElement();
    Blockly.utils.dom.removeClass(a, "focused")
};
Blockly.tree.TreeControl.prototype.hasFocus = function() { return this.focused_ };
Blockly.tree.TreeControl.prototype.setExpanded = function(a) { this.expanded_ = a };
Blockly.tree.TreeControl.prototype.getIconElement = function() { var a = this.getRowElement(); return a ? a.firstChild : null };
Blockly.tree.TreeControl.prototype.updateExpandIcon = function() {};
Blockly.tree.TreeControl.prototype.getRowClassName = function() { return Blockly.tree.TreeControl.superClass_.getRowClassName.call(this) + " " + this.config_.cssHideRoot };
Blockly.tree.TreeControl.prototype.getCalculatedIconClass = function() { var a = this.expanded_; if (a && this.expandedIconClass) return this.expandedIconClass; var b = this.iconClass; return !a && b ? b : a && this.config_.cssExpandedRootIcon ? this.config_.cssTreeIcon + " " + this.config_.cssExpandedRootIcon : "" };
Blockly.tree.TreeControl.prototype.setSelectedItem = function(a) {
    if (a != this.selectedItem_ && (!this.onBeforeSelected_ || this.onBeforeSelected_.call(this.toolbox_, a))) {
        var b = this.getSelectedItem();
        this.selectedItem_ && this.selectedItem_.setSelected(!1);
        (this.selectedItem_ = a) && a.setSelected(!0);
        this.onAfterSelected_ && this.onAfterSelected_.call(this.toolbox_, b, a)
    }
};
Blockly.tree.TreeControl.prototype.onBeforeSelected = function(a) { this.onBeforeSelected_ = a };
Blockly.tree.TreeControl.prototype.onAfterSelected = function(a) { this.onAfterSelected_ = a };
Blockly.tree.TreeControl.prototype.getSelectedItem = function() { return this.selectedItem_ };
Blockly.tree.TreeControl.prototype.initAccessibility = function() {
    Blockly.tree.TreeControl.superClass_.initAccessibility.call(this);
    var a = this.getElement();
    Blockly.utils.aria.setRole(a, Blockly.utils.aria.Role.TREE);
    Blockly.utils.aria.setState(a, Blockly.utils.aria.State.LABELLEDBY, this.getLabelElement().id)
};
Blockly.tree.TreeControl.prototype.enterDocument = function() {
    Blockly.tree.TreeControl.superClass_.enterDocument.call(this);
    var a = this.getElement();
    a.className = this.config_.cssRoot;
    a.setAttribute("hideFocus", "true");
    this.attachEvents_();
    this.initAccessibility()
};
Blockly.tree.TreeControl.prototype.exitDocument = function() {
    Blockly.tree.TreeControl.superClass_.exitDocument.call(this);
    this.detachEvents_()
};
Blockly.tree.TreeControl.prototype.attachEvents_ = function() {
    var a = this.getElement();
    a.tabIndex = 0;
    this.onFocusWrapper_ = Blockly.bindEvent_(a, "focus", this, this.handleFocus_);
    this.onBlurWrapper_ = Blockly.bindEvent_(a, "blur", this, this.handleBlur_);
    this.onClickWrapper_ = Blockly.bindEventWithChecks_(a, "click", this, this.handleMouseEvent_);
    this.onKeydownWrapper_ = Blockly.bindEvent_(a, "keydown", this, this.handleKeyEvent_)
};
Blockly.tree.TreeControl.prototype.detachEvents_ = function() {
    this.onFocusWrapper_ && (Blockly.unbindEvent_(this.onFocusWrapper_), this.onFocusWrapper_ = null);
    this.onBlurWrapper_ && (Blockly.unbindEvent_(this.onBlurWrapper_), this.onBlurWrapper_ = null);
    this.onClickWrapper_ && (Blockly.unbindEvent_(this.onClickWrapper_), this.onClickWrapper_ = null);
    this.onKeydownWrapper_ && (Blockly.unbindEvent_(this.onKeydownWrapper_), this.onKeydownWrapper_ = null)
};
Blockly.tree.TreeControl.prototype.handleMouseEvent_ = function(a) {
    var b = this.getNodeFromEvent_(a);
    if (b) switch (a.type) {
        case "mousedown":
            b.onMouseDown(a);
            break;
        case "click":
            b.onClick_(a)
    }
};
Blockly.tree.TreeControl.prototype.handleKeyEvent_ = function(a) { var b = !1; if (b = this.selectedItem_ && this.selectedItem_.onKeyDown(a) || b) Blockly.utils.style.scrollIntoContainerView(this.selectedItem_.getElement(), this.getElement().parentNode), a.preventDefault(); return b };
Blockly.tree.TreeControl.prototype.getNodeFromEvent_ = function(a) {
    for (var b = a.target; null != b;) {
        if (a = Blockly.tree.BaseNode.allNodes[b.id]) return a;
        if (b == this.getElement()) break;
        if (b.getAttribute("role") == Blockly.utils.aria.Role.GROUP) break;
        b = b.parentNode
    }
    return null
};
Blockly.tree.TreeControl.prototype.createNode = function(a) { return new Blockly.tree.TreeNode(this.toolbox_, a || "", this.config_) };
Blockly.Toolbox = function(a) {
    this.workspace_ = a;
    this.RTL = a.options.RTL;
    this.horizontalLayout_ = a.options.horizontalLayout;
    this.toolboxPosition = a.options.toolboxPosition;
    this.config_ = { indentWidth: 19, cssRoot: "blocklyTreeRoot", cssHideRoot: "blocklyHidden", cssTreeRow: "blocklyTreeRow", cssItemLabel: "blocklyTreeLabel", cssTreeIcon: "blocklyTreeIcon", cssExpandedFolderIcon: "blocklyTreeIconOpen", cssFileIcon: "blocklyTreeIconNone", cssSelectedRow: "blocklyTreeSelected" };
    this.treeSeparatorConfig_ = { cssTreeRow: "blocklyTreeSeparator" };
    this.horizontalLayout_ && (this.config_.cssTreeRow += a.RTL ? " blocklyHorizontalTreeRtl" : " blocklyHorizontalTree", this.treeSeparatorConfig_.cssTreeRow = "blocklyTreeSeparatorHorizontal " + (a.RTL ? "blocklyHorizontalTreeRtl" : "blocklyHorizontalTree"), this.config_.cssTreeIcon = "");
    this.flyout_ = null
};
Blockly.Toolbox.prototype.width = 0;
Blockly.Toolbox.prototype.height = 0;
Blockly.Toolbox.prototype.selectedOption_ = null;
Blockly.Toolbox.prototype.lastCategory_ = null;
Blockly.Toolbox.prototype.init = function() {
    var a = this.workspace_,
        b = this.workspace_.getParentSvg();
    this.HtmlDiv = document.createElement("div");
    this.HtmlDiv.className = "blocklyToolboxDiv blocklyNonSelectable";
    this.HtmlDiv.setAttribute("dir", a.RTL ? "RTL" : "LTR");
    b.parentNode.insertBefore(this.HtmlDiv, b);
    var c = a.getThemeManager();
    c.subscribe(this.HtmlDiv, "toolboxBackgroundColour", "background-color");
    c.subscribe(this.HtmlDiv, "toolboxForegroundColour", "color");
    Blockly.bindEventWithChecks_(this.HtmlDiv, "mousedown",
        this,
        function(a) {
            Blockly.utils.isRightButton(a) || a.target == this.HtmlDiv ? Blockly.hideChaff(!1) : Blockly.hideChaff(!0);
            Blockly.Touch.clearTouchIdentifier()
        }, !1, !0);
    c = new Blockly.Options({ parentWorkspace: a, rtl: a.RTL, oneBasedIndex: a.options.oneBasedIndex, horizontalLayout: a.horizontalLayout, renderer: a.options.renderer, rendererOverrides: a.options.rendererOverrides });
    c.toolboxPosition = a.options.toolboxPosition;
    if (a.horizontalLayout) {
        if (!Blockly.HorizontalFlyout) throw Error("Missing require for Blockly.HorizontalFlyout");
        this.flyout_ = new Blockly.HorizontalFlyout(c)
    } else {
        if (!Blockly.VerticalFlyout) throw Error("Missing require for Blockly.VerticalFlyout");
        this.flyout_ = new Blockly.VerticalFlyout(c)
    }
    if (!this.flyout_) throw Error("One of Blockly.VerticalFlyout or Blockly.Horizontal must berequired.");
    Blockly.utils.dom.insertAfter(this.flyout_.createDom("svg"), b);
    this.flyout_.init(a);
    this.config_.cleardotPath = a.options.pathToMedia + "";
    this.config_.cssCollapsedFolderIcon = "blocklyTreeIconClosed" + (a.RTL ? "Rtl" : "Ltr");
    this.renderTree(a.options.languageTree)
};
Blockly.Toolbox.prototype.renderTree = function(a) {
    this.tree_ && (this.tree_.dispose(), this.lastCategory_ = null);
    var b = new Blockly.tree.TreeControl(this, this.config_);
    this.tree_ = b;
    b.setSelectedItem(null);
    b.onBeforeSelected(this.handleBeforeTreeSelected_);
    b.onAfterSelected(this.handleAfterTreeSelected_);
    var c = null;
    if (a) {
        this.tree_.blocks = [];
        this.hasColours_ = !1;
        c = this.syncTrees_(a, this.tree_, this.workspace_.options.pathToMedia);
        if (this.tree_.blocks.length) throw Error("Toolbox cannot have both blocks and categories in the root level.");
        this.workspace_.resizeContents()
    }
    b.render(this.HtmlDiv);
    c && b.setSelectedItem(c);
    this.addColour_();
    this.position();
    this.horizontalLayout_ && Blockly.utils.aria.setState(this.tree_.getElement(), Blockly.utils.aria.State.ORIENTATION, "horizontal")
};
Blockly.Toolbox.prototype.handleBeforeTreeSelected_ = function(a) {
    if (a == this.tree_) return !1;
    this.lastCategory_ && (this.lastCategory_.getRowElement().style.backgroundColor = "");
    if (a) {
        var b = a.hexColour || "#fff";
        a.getRowElement().style.backgroundColor = b;
        this.addColour_(a)
    }
    return !0
};
Blockly.Toolbox.prototype.handleAfterTreeSelected_ = function(a, b) {
    b && b.blocks && b.blocks.length ? (this.flyout_.show(b.blocks), this.lastCategory_ != b && this.flyout_.scrollToStart(), this.workspace_.keyboardAccessibilityMode && Blockly.navigation.setState(Blockly.navigation.STATE_TOOLBOX)) : (this.flyout_.hide(), !this.workspace_.keyboardAccessibilityMode || b instanceof Blockly.Toolbox.TreeSeparator || Blockly.navigation.setState(Blockly.navigation.STATE_WS));
    a != b && a != this && (a = new Blockly.Events.Ui(null, "category",
        a && a.content, b && b.content), a.workspaceId = this.workspace_.id, Blockly.Events.fire(a));
    b && (this.lastCategory_ = b)
};
Blockly.Toolbox.prototype.handleNodeSizeChanged_ = function() { Blockly.svgResize(this.workspace_) };
Blockly.Toolbox.prototype.onBlocklyAction = function(a) {
    var b = this.tree_.getSelectedItem();
    if (!b) return !1;
    switch (a.name) {
        case Blockly.navigation.actionNames.PREVIOUS:
            return b.selectPrevious();
        case Blockly.navigation.actionNames.OUT:
            return b.selectParent();
        case Blockly.navigation.actionNames.NEXT:
            return b.selectNext();
        case Blockly.navigation.actionNames.IN:
            return b.selectChild();
        default:
            return !1
    }
};
Blockly.Toolbox.prototype.dispose = function() {
    this.flyout_.dispose();
    this.tree_.dispose();
    this.workspace_.getThemeManager().unsubscribe(this.HtmlDiv);
    Blockly.utils.dom.removeNode(this.HtmlDiv);
    this.lastCategory_ = null
};
Blockly.Toolbox.prototype.getWidth = function() { return this.width };
Blockly.Toolbox.prototype.getHeight = function() { return this.height };
Blockly.Toolbox.prototype.getFlyout = function() { return this.flyout_ };
Blockly.Toolbox.prototype.position = function() {
    var a = this.HtmlDiv;
    if (a) {
        var b = Blockly.svgSize(this.workspace_.getParentSvg());
        this.horizontalLayout_ ? (a.style.left = "0", a.style.height = "auto", a.style.width = b.width + "px", this.height = a.offsetHeight, this.toolboxPosition == Blockly.TOOLBOX_AT_TOP ? a.style.top = "0" : a.style.bottom = "0") : (this.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT ? a.style.right = "0" : a.style.left = "0", a.style.height = b.height + "px", this.width = a.offsetWidth);
        this.flyout_.position()
    }
};
Blockly.Toolbox.prototype.syncTrees_ = function(a, b, c) {
    for (var d = null, e = null, f = 0, g; g = a.childNodes[f]; f++)
        if (g.tagName) switch (g.tagName.toUpperCase()) {
            case "CATEGORY":
                e = Blockly.utils.replaceMessageReferences(g.getAttribute("name"));
                var h = this.tree_.createNode(e);
                h.onSizeChanged(this.handleNodeSizeChanged_);
                h.blocks = [];
                b.add(h);
                var k = g.getAttribute("custom");
                k ? h.blocks = k : (k = this.syncTrees_(g, h, c)) && (d = k);
                k = g.getAttribute("categorystyle");
                var l = g.getAttribute("colour");
                l && k ? (h.hexColour = "", console.warn('Toolbox category "' +
                    e + '" can not have both a style and a colour')) : k ? this.setColourFromStyle_(k, h, e) : this.setColour_(l, h, e);
                "true" == g.getAttribute("expanded") ? (h.blocks.length && (d = h), h.setExpanded(!0)) : h.setExpanded(!1);
                e = g;
                break;
            case "SEP":
                if (e && "CATEGORY" == e.tagName.toUpperCase()) { b.add(new Blockly.Toolbox.TreeSeparator(this.treeSeparatorConfig_)); break }
            case "BLOCK":
            case "SHADOW":
            case "LABEL":
            case "BUTTON":
                b.blocks.push(g), e = g
        }
    return d
};
Blockly.Toolbox.prototype.setColour_ = function(a, b, c) {
    a = Blockly.utils.replaceMessageReferences(a);
    if (null === a || "" === a) b.hexColour = "";
    else {
        var d = Number(a);
        isNaN(d) ? (d = Blockly.utils.colour.parse(a)) ? (b.hexColour = d, this.hasColours_ = !0) : (b.hexColour = "", console.warn('Toolbox category "' + c + '" has unrecognized colour attribute: ' + a)) : (b.hexColour = Blockly.hueToHex(d), this.hasColours_ = !0)
    }
};
Blockly.Toolbox.prototype.setColourFromStyle_ = function(a, b, c) {
    b.styleName = a;
    var d = this.workspace_.getTheme();
    a && d && ((d = d.categoryStyles[a]) && d.colour ? this.setColour_(d.colour, b, c) : console.warn('Style "' + a + '" must exist and contain a colour value'))
};
Blockly.Toolbox.prototype.updateColourFromTheme_ = function(a) { if (a = a || this.tree_) { a = a.getChildren(!1); for (var b = 0, c; c = a[b]; b++) c.styleName && (this.setColourFromStyle_(c.styleName, c, ""), this.addColour_()), this.updateColourFromTheme_(c) } };
Blockly.Toolbox.prototype.updateColourFromTheme = function() {
    var a = this.tree_;
    a && (this.updateColourFromTheme_(a), this.updateSelectedItemColour_(a))
};
Blockly.Toolbox.prototype.updateSelectedItemColour_ = function(a) {
    if (a = a.getSelectedItem()) {
        var b = a.hexColour || "#fff";
        a.getRowElement().style.backgroundColor = b;
        this.addColour_(a)
    }
};
Blockly.Toolbox.prototype.addColour_ = function(a) {
    a = (a || this.tree_).getChildren(!1);
    for (var b = 0, c; c = a[b]; b++) {
        var d = c.getRowElement();
        if (d) {
            var e = this.hasColours_ ? "8px solid " + (c.hexColour || "#ddd") : "none";
            this.workspace_.RTL ? d.style.borderRight = e : d.style.borderLeft = e
        }
        this.addColour_(c)
    }
};
Blockly.Toolbox.prototype.clearSelection = function() { this.tree_.setSelectedItem(null) };
Blockly.Toolbox.prototype.addStyle = function(a) { Blockly.utils.dom.addClass(this.HtmlDiv, a) };
Blockly.Toolbox.prototype.removeStyle = function(a) { Blockly.utils.dom.removeClass(this.HtmlDiv, a) };
Blockly.Toolbox.prototype.getClientRect = function() {
    if (!this.HtmlDiv) return null;
    var a = this.HtmlDiv.getBoundingClientRect(),
        b = a.top,
        c = b + a.height,
        d = a.left;
    a = d + a.width;
    return this.toolboxPosition == Blockly.TOOLBOX_AT_TOP ? new Blockly.utils.Rect(-1E7, c, -1E7, 1E7) : this.toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM ? new Blockly.utils.Rect(b, 1E7, -1E7, 1E7) : this.toolboxPosition == Blockly.TOOLBOX_AT_LEFT ? new Blockly.utils.Rect(-1E7, 1E7, -1E7, a) : new Blockly.utils.Rect(-1E7, 1E7, d, 1E7)
};
Blockly.Toolbox.prototype.refreshSelection = function() {
    var a = this.tree_.getSelectedItem();
    a && a.blocks && this.flyout_.show(a.blocks)
};
Blockly.Toolbox.prototype.selectFirstCategory = function() { this.tree_.getSelectedItem() || this.tree_.selectChild() };
Blockly.Toolbox.TreeSeparator = function(a) { Blockly.tree.TreeNode.call(this, null, "", a) };
Blockly.utils.object.inherits(Blockly.Toolbox.TreeSeparator, Blockly.tree.TreeNode);
Blockly.Css.register([".blocklyToolboxDelete {", 'cursor: url("<<<PATH>>>/handdelete.cur"), auto;', "}", ".blocklyToolboxGrab {", 'cursor: url("<<<PATH>>>/handclosed.cur"), auto;', "cursor: grabbing;", "cursor: -webkit-grabbing;", "}", ".blocklyToolboxDiv {", "background-color:#fff", "overflow-x: visible;", "overflow-y: auto;", "position: absolute;", "z-index: 70;", "-webkit-tap-highlight-color: transparent;", "}", ".blocklyTreeRoot {", "padding: 7px 0;", "}", ".blocklyTreeRoot:focus {", "outline: none;", "}", ".blocklyTreeRow {",
    "height:30px;", "line-height: 22px;", "margin-bottom: 3px;", "padding-right: 8px;", "white-space: nowrap;", "}", ".blocklyHorizontalTree {", "float: left;", "margin: 1px 50px 8px 0;", "}", ".blocklyHorizontalTreeRtl {", "float: right;", "margin: 1px 0 8px 5px;", "}", '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {', "margin-left: 80px;", "}", ".blocklyTreeRow:not(.blocklyTreeSelected):hover {", "background-color: rgba(255, 255, 255, 0.2);", "}", ".blocklyTreeSeparator {", "border-bottom: solid #fff 1px;", "height: 0;",
    "margin: 5px 0;", "}", ".blocklyTreeSeparatorHorizontal {", "border-right: solid #000 1px;", "width: 0;", "padding: 5px 0;", "margin: 0 5px;", "}", ".blocklyTreeIcon {", "height: 16px;", "vertical-align: middle;", "width: 16px;", "}", ".blocklyTreeIconClosedLtr {", "background-position: -32px -1px;", "}", ".blocklyTreeIconClosedRtl {", "background-position: 0 -1px;", "}", ".blocklyTreeIconOpen {", "background-position: -16px -1px;", "}", ".blocklyTreeSelected>.blocklyTreeIconClosedLtr {",
    "background-position: -32px -17px;", "}", ".blocklyTreeSelected>.blocklyTreeIconClosedRtl {", "background-position: 0 -17px;", "}", ".blocklyTreeSelected>.blocklyTreeIconOpen {", "background-position: -16px -17px;", "}", ".blocklyTreeIconNone,", ".blocklyTreeSelected>.blocklyTreeIconNone {", "background-position: -48px -1px;", "}", ".blocklyTreeLabel {", "cursor: default;", "font-family: sans-serif;", "font-size: 16px;", "padding: 0 3px;", "vertical-align: middle;", "}", ".blocklyToolboxDelete .blocklyTreeLabel {",
    'cursor: url("<<<PATH>>>/handdelete.cur"), auto;', "}", ".blocklyTreeSelected .blocklyTreeLabel {", "color: #fff;", "}"
]);
Blockly.Trashcan = function(a) {
    this.workspace_ = a;
    this.contents_ = [];
    this.flyout = null;
    if (!(0 >= this.workspace_.options.maxTrashcanContents)) {
        a = new Blockly.Options({ scrollbars: !0, parentWorkspace: this.workspace_, rtl: this.workspace_.RTL, oneBasedIndex: this.workspace_.options.oneBasedIndex, renderer: this.workspace_.options.renderer, rendererOverrides: this.workspace_.options.rendererOverrides });
        if (this.workspace_.horizontalLayout) {
            a.toolboxPosition = this.workspace_.toolboxPosition == Blockly.TOOLBOX_AT_TOP ? Blockly.TOOLBOX_AT_BOTTOM :
                Blockly.TOOLBOX_AT_TOP;
            if (!Blockly.HorizontalFlyout) throw Error("Missing require for Blockly.HorizontalFlyout");
            this.flyout = new Blockly.HorizontalFlyout(a)
        } else {
            a.toolboxPosition = this.workspace_.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT ? Blockly.TOOLBOX_AT_LEFT : Blockly.TOOLBOX_AT_RIGHT;
            if (!Blockly.VerticalFlyout) throw Error("Missing require for Blockly.VerticalFlyout");
            this.flyout = new Blockly.VerticalFlyout(a)
        }
        this.workspace_.addChangeListener(this.onDelete_.bind(this))
    }
};
Blockly.Trashcan.prototype.WIDTH_ = 47;
Blockly.Trashcan.prototype.BODY_HEIGHT_ = 44;
Blockly.Trashcan.prototype.LID_HEIGHT_ = 16;
Blockly.Trashcan.prototype.MARGIN_BOTTOM_ = 20;
Blockly.Trashcan.prototype.MARGIN_SIDE_ = 20;
Blockly.Trashcan.prototype.MARGIN_HOTSPOT_ = 10;
Blockly.Trashcan.prototype.SPRITE_LEFT_ = 0;
Blockly.Trashcan.prototype.SPRITE_TOP_ = 32;
Blockly.Trashcan.prototype.HAS_BLOCKS_LID_ANGLE_ = .1;
Blockly.Trashcan.ANIMATION_LENGTH_ = 80;
Blockly.Trashcan.ANIMATION_FRAMES_ = 4;
Blockly.Trashcan.OPACITY_MIN_ = .4;
Blockly.Trashcan.OPACITY_MAX_ = .8;
Blockly.Trashcan.MAX_LID_ANGLE_ = 45;
Blockly.Trashcan.prototype.isOpen = !1;
Blockly.Trashcan.prototype.minOpenness_ = 0;
Blockly.Trashcan.prototype.svgGroup_ = null;
Blockly.Trashcan.prototype.svgLid_ = null;
Blockly.Trashcan.prototype.lidTask_ = 0;
Blockly.Trashcan.prototype.lidOpen_ = 0;
Blockly.Trashcan.prototype.left_ = 0;
Blockly.Trashcan.prototype.top_ = 0;
Blockly.Trashcan.prototype.createDom = function() {
    this.svgGroup_ = Blockly.utils.dom.createSvgElement("g", { "class": "blocklyTras" }, null);
    var a = String(Math.random()).substring(2);
    var c = Blockly.utils.dom.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        x: -50,
        height: Blockly.SPRITE.height,
        y: -100,
                "clip-path": "url(sprites.png)"
    }, this.svgGroup_);
    c.setAttributeNS(Blockly.utils.dom.XLINK_NS, "xlink:href", this.workspace_.options.pathToMedia + Blockly.SPRITE.url);
    b = Blockly.utils.dom.createSvgElement("clipPath", { id: "blocklyTrashLidClipPat" + a }, this.svgGroup_);
    Blockly.utils.dom.createSvgElement("rect", { width: this.WIDTH_, height: this.LID_HEIGHT_ }, b);
    this.svgLid_ = Blockly.utils.dom.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        x: -50,
        height: Blockly.SPRITE.height,
        y: -100,
               "clip-path": "url(sprites.png)"
    }, this.svgGroup_);
    this.svgLid_.setAttributeNS(Blockly.utils.dom.XLINK_NS, "xlink:href", this.workspace_.options.pathToMedia + Blockly.SPRITE.url);
    Blockly.bindEventWithChecks_(this.svgGroup_, "mouseup", this, this.click);
    Blockly.bindEvent_(c, "mouseover", this, this.mouseOver_);
    Blockly.bindEvent_(c, "mouseout", this, this.mouseOut_);
    this.animateLid_();
    return this.svgGroup_
};
Blockly.Trashcan.prototype.init = function(a) {
    0 < this.workspace_.options.maxTrashcanContents && (Blockly.utils.dom.insertAfter(this.flyout.createDom("svg"), this.workspace_.getParentSvg()), this.flyout.init(this.workspace_));
    this.verticalSpacing_ = this.MARGIN_BOTTOM_ + a;
    this.setOpen(!1);
    return this.verticalSpacing_ + this.BODY_HEIGHT_ + this.LID_HEIGHT_
};
Blockly.Trashcan.prototype.dispose = function() {
    this.svgGroup_ && (Blockly.utils.dom.removeNode(this.svgGroup_), this.svgGroup_ = null);
    this.workspace_ = this.svgLid_ = null;
    clearTimeout(this.lidTask_)
};
Blockly.Trashcan.prototype.contentsIsOpen = function() { return this.flyout.isVisible() };
Blockly.Trashcan.prototype.emptyContents = function() { this.contents_.length && (this.contents_.length = 0, this.setMinOpenness_(0), this.contentsIsOpen() && this.flyout.hide()) };
Blockly.Trashcan.prototype.position = function() {
    if (this.verticalSpacing_) {
        var a = this.workspace_.getMetrics();
        a && (this.left_ = a.toolboxPosition == Blockly.TOOLBOX_AT_LEFT || this.workspace_.horizontalLayout && !this.workspace_.RTL ? a.viewWidth + a.absoluteLeft - this.WIDTH_ - this.MARGIN_SIDE_ - Blockly.Scrollbar.scrollbarThickness : this.MARGIN_SIDE_ + Blockly.Scrollbar.scrollbarThickness, this.top_ = a.toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM ? this.verticalSpacing_ : a.viewHeight + a.absoluteTop - (this.BODY_HEIGHT_ + this.LID_HEIGHT_) -
            this.verticalSpacing_, this.svgGroup_.setAttribute("transform", "translate(" + this.left_ + "," + this.top_ + ")"))
    }
};
Blockly.Trashcan.prototype.getClientRect = function() {
    if (!this.svgGroup_) return null;
    var a = this.svgGroup_.getBoundingClientRect(),
        b = a.top + this.SPRITE_TOP_ - this.MARGIN_HOTSPOT_;
    a = a.left + this.SPRITE_LEFT_ - this.MARGIN_HOTSPOT_;
    return new Blockly.utils.Rect(b, b + this.LID_HEIGHT_ + this.BODY_HEIGHT_ + 2 * this.MARGIN_HOTSPOT_, a, a + this.WIDTH_ + 2 * this.MARGIN_HOTSPOT_)
};
Blockly.Trashcan.prototype.setOpen = function(a) { this.isOpen != a && (clearTimeout(this.lidTask_), this.isOpen = a, this.animateLid_()) };
Blockly.Trashcan.prototype.animateLid_ = function() {
    var a = Blockly.Trashcan.ANIMATION_FRAMES_,
        b = 1 / (a + 1);
    this.lidOpen_ += this.isOpen ? b : -b;
    this.lidOpen_ = Math.min(Math.max(this.lidOpen_, this.minOpenness_), 1);
    this.setLidAngle_(this.lidOpen_ * Blockly.Trashcan.MAX_LID_ANGLE_);
    b = Blockly.Trashcan.OPACITY_MIN_;
    this.svgGroup_.style.opacity = b + this.lidOpen_ * (Blockly.Trashcan.OPACITY_MAX_ - b);
    this.lidOpen_ > this.minOpenness_ && 1 > this.lidOpen_ && (this.lidTask_ = setTimeout(this.animateLid_.bind(this), Blockly.Trashcan.ANIMATION_LENGTH_ /
        a))
};
Blockly.Trashcan.prototype.setLidAngle_ = function(a) {
    var b = this.workspace_.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT || this.workspace_.horizontalLayout && this.workspace_.RTL;
    this.svgLid_.setAttribute("transform", "rotate(" + (b ? -a : a) + "," + (b ? 4 : this.WIDTH_ - 4) + "," + (this.LID_HEIGHT_ - 2) + ")")
};
Blockly.Trashcan.prototype.setMinOpenness_ = function(a) {
    this.minOpenness_ = a;
    this.isOpen || this.setLidAngle_(a * Blockly.Trashcan.MAX_LID_ANGLE_)
};
Blockly.Trashcan.prototype.close = function() { this.setOpen(!1) };
Blockly.Trashcan.prototype.click = function() {
    if (this.contents_.length) {
        for (var a = [], b = 0, c; c = this.contents_[b]; b++) a[b] = Blockly.Xml.textToDom(c);
        this.flyout.show(a)
    }
};
Blockly.Trashcan.prototype.mouseOver_ = function() { this.contents_.length && this.setOpen(!0) };
Blockly.Trashcan.prototype.mouseOut_ = function() { this.setOpen(!1) };
Blockly.Trashcan.prototype.onDelete_ = function(a) {
    if (!(0 >= this.workspace_.options.maxTrashcanContents) && a.type == Blockly.Events.BLOCK_DELETE && "shadow" != a.oldXml.tagName.toLowerCase() && (a = this.cleanBlockXML_(a.oldXml), -1 == this.contents_.indexOf(a))) {
        for (this.contents_.unshift(a); this.contents_.length > this.workspace_.options.maxTrashcanContents;) this.contents_.pop();
        this.setMinOpenness_(this.HAS_BLOCKS_LID_ANGLE_)
    }
};
Blockly.Trashcan.prototype.cleanBlockXML_ = function(a) {
    for (var b = a = a.cloneNode(!0); b;) {
        b.removeAttribute && (b.removeAttribute("x"), b.removeAttribute("y"), b.removeAttribute("id"), b.removeAttribute("disabled"), "comment" == b.nodeName && (b.removeAttribute("h"), b.removeAttribute("w"), b.removeAttribute("pinned")));
        var c = b.firstChild || b.nextSibling;
        if (!c)
            for (c = b.parentNode; c;) {
                if (c.nextSibling) { c = c.nextSibling; break }
                c = c.parentNode
            }
        b = c
    }
    return Blockly.Xml.domToText(a)
};
Blockly.VariablesDynamic = {};
Blockly.VariablesDynamic.onCreateVariableButtonClick_String = function(a) { Blockly.Variables.createVariableButtonHandler(a.getTargetWorkspace(), void 0, "String") };
Blockly.VariablesDynamic.onCreateVariableButtonClick_Number = function(a) { Blockly.Variables.createVariableButtonHandler(a.getTargetWorkspace(), void 0, "Number") };
Blockly.VariablesDynamic.onCreateVariableButtonClick_Colour = function(a) { Blockly.Variables.createVariableButtonHandler(a.getTargetWorkspace(), void 0, "Colour") };
Blockly.VariablesDynamic.flyoutCategory = function(a) {
    var b = [],
        c = document.createElement("button");
    c.setAttribute("text", Blockly.Msg.NEW_STRING_VARIABLE);
    c.setAttribute("callbackKey", "CREATE_VARIABLE_STRING");
    b.push(c);
    c = document.createElement("button");
    c.setAttribute("text", Blockly.Msg.NEW_NUMBER_VARIABLE);
    c.setAttribute("callbackKey", "CREATE_VARIABLE_NUMBER");
    b.push(c);
    c = document.createElement("button");
    c.setAttribute("text", Blockly.Msg.NEW_COLOUR_VARIABLE);
    c.setAttribute("callbackKey", "CREATE_VARIABLE_COLOUR");
    b.push(c);
    a.registerButtonCallback("CREATE_VARIABLE_STRING", Blockly.VariablesDynamic.onCreateVariableButtonClick_String);
    a.registerButtonCallback("CREATE_VARIABLE_NUMBER", Blockly.VariablesDynamic.onCreateVariableButtonClick_Number);
    a.registerButtonCallback("CREATE_VARIABLE_COLOUR", Blockly.VariablesDynamic.onCreateVariableButtonClick_Colour);
    a = Blockly.VariablesDynamic.flyoutCategoryBlocks(a);
    return b = b.concat(a)
};
Blockly.VariablesDynamic.flyoutCategoryBlocks = function(a) {
    a = a.getAllVariables();
    var b = [];
    if (0 < a.length) {
        if (Blockly.Blocks.variables_set_dynamic) {
            var c = a[a.length - 1],
                d = Blockly.utils.xml.createElement("block");
            d.setAttribute("type", "variables_set_dynamic");
            d.setAttribute("gap", 24);
            d.appendChild(Blockly.Variables.generateVariableFieldDom(c));
            b.push(d)
        }
        if (Blockly.Blocks.variables_get_dynamic) {
            a.sort(Blockly.VariableModel.compareByName);
            c = 0;
            for (var e; e = a[c]; c++) d = Blockly.utils.xml.createElement("block"),
                d.setAttribute("type", "variables_get_dynamic"), d.setAttribute("gap", 8), d.appendChild(Blockly.Variables.generateVariableFieldDom(e)), b.push(d)
        }
    }
    return b
};
Blockly.ZoomControls = function(a) { this.workspace_ = a };
Blockly.ZoomControls.prototype.WIDTH_ = 32;
Blockly.ZoomControls.prototype.HEIGHT_ = 110;
Blockly.ZoomControls.prototype.MARGIN_BOTTOM_ = 20;
Blockly.ZoomControls.prototype.MARGIN_SIDE_ = 20;
Blockly.ZoomControls.prototype.svgGroup_ = null;
Blockly.ZoomControls.prototype.left_ = 0;
Blockly.ZoomControls.prototype.top_ = 0;
Blockly.ZoomControls.prototype.createDom = function() {
    this.svgGroup_ = Blockly.utils.dom.createSvgElement("g", {}, null);
    var a = String(Math.random()).substring(2);
    this.createZoomOutSvg_(a);
    this.createZoomInSvg_(a);
    this.workspace_.isMovable() && this.createZoomResetSvg_(a);
    return this.svgGroup_
};
Blockly.ZoomControls.prototype.init = function(a) { this.verticalSpacing_ = this.MARGIN_BOTTOM_ + a; return this.verticalSpacing_ + this.HEIGHT_ };
Blockly.ZoomControls.prototype.dispose = function() { this.svgGroup_ && Blockly.utils.dom.removeNode(this.svgGroup_) };
Blockly.ZoomControls.prototype.position = function() {
    if (this.verticalSpacing_) {
        var a = this.workspace_.getMetrics();
        a && (this.left_ = a.toolboxPosition == Blockly.TOOLBOX_AT_LEFT || this.workspace_.horizontalLayout && !this.workspace_.RTL ? a.viewWidth + a.absoluteLeft - this.WIDTH_ - this.MARGIN_SIDE_ - Blockly.Scrollbar.scrollbarThickness : this.MARGIN_SIDE_ + Blockly.Scrollbar.scrollbarThickness, a.toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM ? (this.top_ = this.verticalSpacing_, this.zoomInGroup_.setAttribute("transform", "translate(0, 34)"),
            this.zoomResetGroup_ && this.zoomResetGroup_.setAttribute("transform", "translate(0, 77)")) : (this.top_ = a.viewHeight + a.absoluteTop - this.HEIGHT_ - this.verticalSpacing_, this.zoomInGroup_.setAttribute("transform", "translate(0, 43)"), this.zoomOutGroup_.setAttribute("transform", "translate(0, 77)")), this.svgGroup_.setAttribute("transform", "translate(" + this.left_ + "," + this.top_ + ")"))
    }
};
Blockly.ZoomControls.prototype.createZoomOutSvg_ = function(a) {
    var b = this.workspace_;
    this.zoomOutGroup_ = Blockly.utils.dom.createSvgElement("g", { "class": "blocklyZoom" }, this.svgGroup_);
    var c = Blockly.utils.dom.createSvgElement("clipPath", { id: "blocklyZoomoutClipPath" + a }, this.zoomOutGroup_);
    Blockly.utils.dom.createSvgElement("rect", { width: 32, height: 32 }, c);
    a = Blockly.utils.dom.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        x: -64,
        y: -92,
        "clip-path": "url(#blocklyZoomoutClipPath" +
            a + ")"
    }, this.zoomOutGroup_);
    a.setAttributeNS(Blockly.utils.dom.XLINK_NS, "xlink:href", b.options.pathToMedia + Blockly.SPRITE.url);
    Blockly.bindEventWithChecks_(a, "mousedown", null, function(a) {
        b.markFocused();
        b.zoomCenter(-1);
        Blockly.Touch.clearTouchIdentifier();
        a.stopPropagation();
        a.preventDefault()
    })
};
Blockly.ZoomControls.prototype.createZoomInSvg_ = function(a) {
    var b = this.workspace_;
    this.zoomInGroup_ = Blockly.utils.dom.createSvgElement("g", { "class": "blocklyZoom" }, this.svgGroup_);
    var c = Blockly.utils.dom.createSvgElement("clipPath", { id: "blocklyZoominClipPath" + a }, this.zoomInGroup_);
    Blockly.utils.dom.createSvgElement("rect", { width: 32, height: 32 }, c);
    a = Blockly.utils.dom.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        x: -32,
        y: -92,
        "clip-path": "url(#blocklyZoominClipPath" +
            a + ")"
    }, this.zoomInGroup_);
    a.setAttributeNS(Blockly.utils.dom.XLINK_NS, "xlink:href", b.options.pathToMedia + Blockly.SPRITE.url);
    Blockly.bindEventWithChecks_(a, "mousedown", null, function(a) {
        b.markFocused();
        b.zoomCenter(1);
        Blockly.Touch.clearTouchIdentifier();
        a.stopPropagation();
        a.preventDefault()
    })
};
Blockly.ZoomControls.prototype.createZoomResetSvg_ = function(a) {
    var b = this.workspace_;
    this.zoomResetGroup_ = Blockly.utils.dom.createSvgElement("g", { "class": "blocklyZoom" }, this.svgGroup_);
    var c = Blockly.utils.dom.createSvgElement("clipPath", { id: "blocklyZoomresetClipPath" + a }, this.zoomResetGroup_);
    Blockly.utils.dom.createSvgElement("rect", { width: 32, height: 32 }, c);
    a = Blockly.utils.dom.createSvgElement("image", {
        width: Blockly.SPRITE.width,
        height: Blockly.SPRITE.height,
        y: -92,
        "clip-path": "url(#blocklyZoomresetClipPath" +
            a + ")"
    }, this.zoomResetGroup_);
    a.setAttributeNS(Blockly.utils.dom.XLINK_NS, "xlink:href", b.options.pathToMedia + Blockly.SPRITE.url);
    Blockly.bindEventWithChecks_(a, "mousedown", null, function(a) {
        b.markFocused();
        b.setScale(b.options.zoomOptions.startScale);
        b.beginCanvasTransition();
        b.scrollCenter();
        setTimeout(b.endCanvasTransition.bind(b), 500);
        Blockly.Touch.clearTouchIdentifier();
        a.stopPropagation();
        a.preventDefault()
    })
};
Blockly.Css.register([".blocklyZoom>image, .blocklyZoom>svg>image {", "opacity: .4;", "}", ".blocklyZoom>image:hover, .blocklyZoom>svg>image:hover {", "opacity: .6;", "}", ".blocklyZoom>image:active, .blocklyZoom>svg>image:active {", "opacity: .8;", "}"]);
Blockly.Mutator = function(a) {
    Blockly.Mutator.superClass_.constructor.call(this, null);
    this.quarkNames_ = a
};
Blockly.utils.object.inherits(Blockly.Mutator, Blockly.Icon);
Blockly.Mutator.prototype.workspaceWidth_ = 0;
Blockly.Mutator.prototype.workspaceHeight_ = 0;
Blockly.Mutator.prototype.setBlock = function(a) { this.block_ = a };
Blockly.Mutator.prototype.getWorkspace = function() { return this.workspace_ };
Blockly.Mutator.prototype.drawIcon_ = function(a) {
    Blockly.utils.dom.createSvgElement("rect", { "class": "blocklyIconShape", rx: "4", ry: "4", height: "16", width: "16" }, a);
    Blockly.utils.dom.createSvgElement("path", { "class": "blocklyIconSymbol", d: "m4.203,7.296 0,1.368 -0.92,0.677 -0.11,0.41 0.9,1.559 0.41,0.11 1.043,-0.457 1.187,0.683 0.127,1.134 0.3,0.3 1.8,0 0.3,-0.299 0.127,-1.138 1.185,-0.682 1.046,0.458 0.409,-0.11 0.9,-1.559 -0.11,-0.41 -0.92,-0.677 0,-1.366 0.92,-0.677 0.11,-0.41 -0.9,-1.559 -0.409,-0.109 -1.046,0.458 -1.185,-0.682 -0.127,-1.138 -0.3,-0.299 -1.8,0 -0.3,0.3 -0.126,1.135 -1.187,0.682 -1.043,-0.457 -0.41,0.11 -0.899,1.559 0.108,0.409z" },
        a);
    Blockly.utils.dom.createSvgElement("circle", { "class": "blocklyIconShape", r: "2.7", cx: "8", cy: "8" }, a)
};
Blockly.Mutator.prototype.iconClick_ = function(a) { this.block_.isEditable() && Blockly.Icon.prototype.iconClick_.call(this, a) };
Blockly.Mutator.prototype.createEditor_ = function() {
    this.svgDialog_ = Blockly.utils.dom.createSvgElement("svg", { x: Blockly.Bubble.BORDER_WIDTH, y: Blockly.Bubble.BORDER_WIDTH }, null);
    if (this.quarkNames_.length)
        for (var a = Blockly.utils.xml.createElement("xml"), b = 0, c; c = this.quarkNames_[b]; b++) {
            var d = Blockly.utils.xml.createElement("block");
            d.setAttribute("type", c);
            a.appendChild(d)
        } else a = null;
    b = new Blockly.Options({
        disable: !1,
        parentWorkspace: this.block_.workspace,
        media: this.block_.workspace.options.pathToMedia,
        rtl: this.block_.RTL,
        horizontalLayout: !1,
        renderer: this.block_.workspace.options.renderer,
        rendererOverrides: this.block_.workspace.options.rendererOverrides
    });
    b.toolboxPosition = this.block_.RTL ? Blockly.TOOLBOX_AT_RIGHT : Blockly.TOOLBOX_AT_LEFT;
    b.languageTree = a;
    b.getMetrics = this.getFlyoutMetrics_.bind(this);
    this.workspace_ = new Blockly.WorkspaceSvg(b);
    this.workspace_.isMutator = !0;
    this.workspace_.addChangeListener(Blockly.Events.disableOrphans);
    a = this.workspace_.addFlyout("g");
    b = this.workspace_.createDom("blocklyMutatorBackground");
    b.insertBefore(a, this.workspace_.svgBlockCanvas_);
    this.svgDialog_.appendChild(b);
    return this.svgDialog_
};
Blockly.Mutator.prototype.updateEditable = function() {
    Blockly.Mutator.superClass_.updateEditable.call(this);
    this.block_.isInFlyout || (this.block_.isEditable() ? this.iconGroup_ && Blockly.utils.dom.removeClass(this.iconGroup_, "blocklyIconGroupReadonly") : (this.setVisible(!1), this.iconGroup_ && Blockly.utils.dom.addClass(this.iconGroup_, "blocklyIconGroupReadonly")))
};
Blockly.Mutator.prototype.resizeBubble_ = function() {
    var a = 2 * Blockly.Bubble.BORDER_WIDTH,
        b = this.workspace_.getCanvas().getBBox();
    var c = this.block_.RTL ? -b.x : b.width + b.x;
    b = b.height + 3 * a;
    var d = this.workspace_.getFlyout();
    d && (d = d.getMetrics_(), b = Math.max(b, d.contentHeight + 20));
    c += 3 * a;
    if (Math.abs(this.workspaceWidth_ - c) > a || Math.abs(this.workspaceHeight_ - b) > a) this.workspaceWidth_ = c, this.workspaceHeight_ = b, this.bubble_.setBubbleSize(c + a, b + a), this.svgDialog_.setAttribute("width", this.workspaceWidth_), this.svgDialog_.setAttribute("height",
        this.workspaceHeight_);
    this.block_.RTL && (a = "translate(" + this.workspaceWidth_ + ",0)", this.workspace_.getCanvas().setAttribute("transform", a));
    this.workspace_.resize()
};
Blockly.Mutator.prototype.onBubbleMove_ = function() { this.workspace_ && this.workspace_.recordDeleteAreas() };
Blockly.Mutator.prototype.setVisible = function(a) {
    if (a != this.isVisible())
        if (Blockly.Events.fire(new Blockly.Events.Ui(this.block_, "mutatorOpen", !a, a)), a) {
            this.bubble_ = new Blockly.Bubble(this.block_.workspace, this.createEditor_(), this.block_.pathObject.svgPath, this.iconXY_, null, null);
            this.bubble_.setSvgId(this.block_.id);
            this.bubble_.registerMoveEvent(this.onBubbleMove_.bind(this));
            var b = this.workspace_.options.languageTree;
            a = this.workspace_.getFlyout();
            b && (a.init(this.workspace_), a.show(b.childNodes));
            this.rootBlock_ = this.block_.decompose(this.workspace_);
            b = this.rootBlock_.getDescendants(!1);
            for (var c = 0, d; d = b[c]; c++) d.render();
            this.rootBlock_.setMovable(!1);
            this.rootBlock_.setDeletable(!1);
            a ? (b = 2 * a.CORNER_RADIUS, a = a.getWidth() + b) : a = b = 16;
            this.block_.RTL && (a = -a);
            this.rootBlock_.moveBy(a, b);
            if (this.block_.saveConnections) {
                var e = this,
                    f = this.block_;
                f.saveConnections(this.rootBlock_);
                this.sourceListener_ = function() { f.saveConnections(e.rootBlock_) };
                this.block_.workspace.addChangeListener(this.sourceListener_)
            }
            this.resizeBubble_();
            this.workspace_.addChangeListener(this.workspaceChanged_.bind(this));
            this.applyColour()
        } else this.svgDialog_ = null, this.workspace_.dispose(), this.rootBlock_ = this.workspace_ = null, this.bubble_.dispose(), this.bubble_ = null, this.workspaceHeight_ = this.workspaceWidth_ = 0, this.sourceListener_ && (this.block_.workspace.removeChangeListener(this.sourceListener_), this.sourceListener_ = null)
};
Blockly.Mutator.prototype.workspaceChanged_ = function(a) {
    if (a.type != Blockly.Events.UI && (a.type != Blockly.Events.CHANGE || "disabled" != a.element)) {
        if (!this.workspace_.isDragging()) {
            a = this.workspace_.getTopBlocks(!1);
            for (var b = 0, c; c = a[b]; b++) {
                var d = c.getRelativeToSurfaceXY(),
                    e = c.getHeightWidth();
                20 > d.y + e.height && c.moveBy(0, 20 - e.height - d.y)
            }
        }
        if (this.rootBlock_.workspace == this.workspace_) {
            Blockly.Events.setGroup(!0);
            c = this.block_;
            a = (a = c.mutationToDom()) && Blockly.Xml.domToText(a);
            c.compose(this.rootBlock_);
            c.initSvg();
            c.render();
            Blockly.getMainWorkspace().keyboardAccessibilityMode && Blockly.navigation.moveCursorOnBlockMutation(c);
            b = (b = c.mutationToDom()) && Blockly.Xml.domToText(b);
            if (a != b) {
                Blockly.Events.fire(new Blockly.Events.BlockChange(c, "mutation", null, a, b));
                var f = Blockly.Events.getGroup();
                setTimeout(function() {
                    Blockly.Events.setGroup(f);
                    c.bumpNeighbours();
                    Blockly.Events.setGroup(!1)
                }, Blockly.BUMP_DELAY)
            }
            this.workspace_.isDragging() || this.resizeBubble_();
            Blockly.Events.setGroup(!1)
        }
    }
};
Blockly.Mutator.prototype.getFlyoutMetrics_ = function() { return { viewHeight: this.workspaceHeight_, viewWidth: this.workspaceWidth_ - this.workspace_.getFlyout().getWidth(), absoluteTop: 0, absoluteLeft: this.workspace_.RTL ? 0 : this.workspace_.getFlyout().getWidth() } };
Blockly.Mutator.prototype.dispose = function() {
    this.block_.mutator = null;
    Blockly.Icon.prototype.dispose.call(this)
};
Blockly.Mutator.prototype.updateBlockStyle = function() {
    var a = this.workspace_;
    if (a && a.getAllBlocks(!1)) {
        for (var b = a.getAllBlocks(!1), c = 0; c < b.length; c++) {
            var d = b[c];
            d.setStyle(d.getStyleName())
        }
        a = a.getFlyout().workspace_.getAllBlocks(!1);
        for (c = 0; c < a.length; c++) d = a[c], d.setStyle(d.getStyleName())
    }
};
Blockly.Mutator.reconnect = function(a, b, c) {
    if (!a || !a.getSourceBlock().workspace) return !1;
    c = b.getInput(c).connection;
    var d = a.targetBlock();
    return d && d != b || c.targetConnection == a ? !1 : (c.isConnected() && c.disconnect(), c.connect(a), !0)
};
Blockly.Mutator.findParentWs = function(a) {
    var b = null;
    if (a && a.options) {
        var c = a.options.parentWorkspace;
        a.isFlyout ? c && c.options && (b = c.options.parentWorkspace) : c && (b = c)
    }
    return b
};
Blockly.FieldTextInput = function(a, b, c) {
    this.spellcheck_ = !0;
    null == a && (a = "");
    Blockly.FieldTextInput.superClass_.constructor.call(this, a, b, c);
    this.onKeyInputWrapper_ = this.onKeyDownWrapper_ = this.htmlInput_ = null;
    this.fullBlockClickTarget_ = !1
};
Blockly.utils.object.inherits(Blockly.FieldTextInput, Blockly.Field);
Blockly.FieldTextInput.fromJson = function(a) { var b = Blockly.utils.replaceMessageReferences(a.text); return new Blockly.FieldTextInput(b, void 0, a) };
Blockly.FieldTextInput.prototype.SERIALIZABLE = !0;
Blockly.FieldTextInput.BORDERRADIUS = 4;
Blockly.FieldTextInput.prototype.CURSOR = "text";
Blockly.FieldTextInput.prototype.configure_ = function(a) { Blockly.FieldTextInput.superClass_.configure_.call(this, a); "boolean" == typeof a.spellcheck && (this.spellcheck_ = a.spellcheck) };
Blockly.FieldTextInput.prototype.initView = function() {
    if (this.getConstants().FULL_BLOCK_FIELDS) {
        for (var a = 0, b = 0, c = 0, d; d = this.sourceBlock_.inputList[c]; c++) {
            for (var e = 0; d.fieldRow[e]; e++) a++;
            d.connection && b++
        }
        this.fullBlockClickTarget_ = 1 >= a && this.sourceBlock_.outputConnection && !b
    } else this.fullBlockClickTarget_ = !1;
    this.fullBlockClickTarget_ ? this.clickTarget_ = this.sourceBlock_.getSvgRoot() : this.createBorderRect_();
    this.createTextElement_()
};
Blockly.FieldTextInput.prototype.doClassValidation_ = function(a) { return null === a || void 0 === a ? null : String(a) };
Blockly.FieldTextInput.prototype.doValueInvalid_ = function(a) { this.isBeingEdited_ && (this.isTextValid_ = !1, a = this.value_, this.value_ = this.htmlInput_.untypedDefaultValue_, this.sourceBlock_ && Blockly.Events.isEnabled() && Blockly.Events.fire(new Blockly.Events.BlockChange(this.sourceBlock_, "field", this.name || null, a, this.value_))) };
Blockly.FieldTextInput.prototype.doValueUpdate_ = function(a) {
    this.isTextValid_ = !0;
    this.value_ = a;
    this.isBeingEdited_ || (this.isDirty_ = !0)
};
Blockly.FieldTextInput.prototype.applyColour = function() { this.sourceBlock_ && this.getConstants().FULL_BLOCK_FIELDS && (this.borderRect_ ? this.borderRect_.setAttribute("stroke", this.sourceBlock_.style.colourTertiary) : this.sourceBlock_.pathObject.svgPath.setAttribute("fill", this.getConstants().FIELD_BORDER_RECT_COLOUR)) };
Blockly.FieldTextInput.prototype.render_ = function() {
    Blockly.FieldTextInput.superClass_.render_.call(this);
    if (this.isBeingEdited_) {
        this.resizeEditor_();
        var a = this.htmlInput_;
        this.isTextValid_ ? (Blockly.utils.dom.removeClass(a, "blocklyInvalidInput"), Blockly.utils.aria.setState(a, Blockly.utils.aria.State.INVALID, !1)) : (Blockly.utils.dom.addClass(a, "blocklyInvalidInput"), Blockly.utils.aria.setState(a, Blockly.utils.aria.State.INVALID, !0))
    }
};
Blockly.FieldTextInput.prototype.setSpellcheck = function(a) { a != this.spellcheck_ && (this.spellcheck_ = a, this.htmlInput_ && this.htmlInput_.setAttribute("spellcheck", this.spellcheck_)) };
Blockly.FieldTextInput.prototype.showEditor_ = function(a, b) {
    this.workspace_ = this.sourceBlock_.workspace;
    a = b || !1;
    !a && (Blockly.utils.userAgent.MOBILE || Blockly.utils.userAgent.ANDROID || Blockly.utils.userAgent.IPAD) ? this.showPromptEditor_() : this.showInlineEditor_(a)
};
Blockly.FieldTextInput.prototype.showPromptEditor_ = function() {
    var a = this;
    Blockly.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.getText(), function(b) { a.setValue(b) })
};
Blockly.FieldTextInput.prototype.showInlineEditor_ = function(a) {
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_.bind(this));
    this.htmlInput_ = this.widgetCreate_();
    this.isBeingEdited_ = !0;
    a || (this.htmlInput_.focus({ preventScroll: !0 }), this.htmlInput_.select())
};
Blockly.FieldTextInput.prototype.widgetCreate_ = function() {
    var a = Blockly.WidgetDiv.DIV;
    Blockly.utils.dom.addClass(this.getClickTarget_(), "editing");
    var b = document.createElement("input");
    b.className = "blocklyHtmlInput";
    b.setAttribute("spellcheck", this.spellcheck_);
    var c = this.workspace_.getScale(),
        d = this.getConstants().FIELD_TEXT_FONTSIZE * c + "pt";
    a.style.fontSize = d;
    b.style.fontSize = d;
    d = Blockly.FieldTextInput.BORDERRADIUS * c + "px";
    if (this.fullBlockClickTarget_) {
        d = this.getScaledBBox();
        d = (d.bottom - d.top) / 2 +
            "px";
        var e = this.sourceBlock_.getParent() ? this.sourceBlock_.getParent().style.colourTertiary : this.sourceBlock_.style.colourTertiary;
        b.style.border = 1 * c + "px solid " + e;
        a.style.borderRadius = d;
        a.style.transition = "box-shadow 0.25s ease 0s";
        this.getConstants().FIELD_TEXTINPUT_BOX_SHADOW && (a.style.boxShadow = "rgba(255, 255, 255, 0.3) 0px 0px 0px " + 4 * c + "px")
    }
    b.style.borderRadius = d;
    a.appendChild(b);
    b.value = b.defaultValue = this.getEditorText_(this.value_);
    b.untypedDefaultValue_ = this.value_;
    b.oldValue_ = null;
    this.resizeEditor_();
    this.bindInputEvents_(b);
    return b
};
Blockly.FieldTextInput.prototype.widgetDispose_ = function() {
    this.isBeingEdited_ = !1;
    this.isTextValid_ = !0;
    this.forceRerender();
    if (this.onFinishEditing_) this.onFinishEditing_(this.value_);
    this.unbindInputEvents_();
    var a = Blockly.WidgetDiv.DIV.style;
    a.width = "auto";
    a.height = "auto";
    a.fontSize = "";
    a.transition = "";
    a.boxShadow = "";
    this.htmlInput_ = null;
    Blockly.utils.dom.removeClass(this.getClickTarget_(), "editing")
};
Blockly.FieldTextInput.prototype.bindInputEvents_ = function(a) {
    this.onKeyDownWrapper_ = Blockly.bindEventWithChecks_(a, "keydown", this, this.onHtmlInputKeyDown_);
    this.onKeyInputWrapper_ = Blockly.bindEventWithChecks_(a, "input", this, this.onHtmlInputChange_)
};
Blockly.FieldTextInput.prototype.unbindInputEvents_ = function() {
    this.onKeyDownWrapper_ && (Blockly.unbindEvent_(this.onKeyDownWrapper_), this.onKeyDownWrapper_ = null);
    this.onKeyInputWrapper_ && (Blockly.unbindEvent_(this.onKeyInputWrapper_), this.onKeyInputWrapper_ = null)
};
Blockly.FieldTextInput.prototype.onHtmlInputKeyDown_ = function(a) { a.keyCode == Blockly.utils.KeyCodes.ENTER ? (Blockly.WidgetDiv.hide(), Blockly.DropDownDiv.hideWithoutAnimation()) : a.keyCode == Blockly.utils.KeyCodes.ESC ? (this.htmlInput_.value = this.htmlInput_.defaultValue, Blockly.WidgetDiv.hide(), Blockly.DropDownDiv.hideWithoutAnimation()) : a.keyCode == Blockly.utils.KeyCodes.TAB && (Blockly.WidgetDiv.hide(), Blockly.DropDownDiv.hideWithoutAnimation(), this.sourceBlock_.tab(this, !a.shiftKey), a.preventDefault()) };
Blockly.FieldTextInput.prototype.onHtmlInputChange_ = function(a) {
    a = this.htmlInput_.value;
    a !== this.htmlInput_.oldValue_ && (this.htmlInput_.oldValue_ = a, Blockly.Events.setGroup(!0), a = this.getValueFromEditorText_(a), this.setValue(a), this.forceRerender(), this.resizeEditor_(), Blockly.Events.setGroup(!1))
};
Blockly.FieldTextInput.prototype.setEditorValue_ = function(a) {
    this.isDirty_ = !0;
    this.isBeingEdited_ && (this.htmlInput_.value = this.getEditorText_(a));
    this.setValue(a)
};
Blockly.FieldTextInput.prototype.resizeEditor_ = function() {
    var a = Blockly.WidgetDiv.DIV,
        b = this.getScaledBBox();
    a.style.width = b.right - b.left + "px";
    a.style.height = b.bottom - b.top + "px";
    b = new Blockly.utils.Coordinate(this.sourceBlock_.RTL ? b.right - a.offsetWidth : b.left, b.top);
    a.style.left = b.x + "px";
    a.style.top = b.y + "px"
};
Blockly.FieldTextInput.numberValidator = function(a) {
    console.warn("Blockly.FieldTextInput.numberValidator is deprecated. Use Blockly.FieldNumber instead.");
    if (null === a) return null;
    a = String(a);
    a = a.replace(/O/ig, "0");
    a = a.replace(/,/g, "");
    a = Number(a || 0);
    return isNaN(a) ? null : String(a)
};
Blockly.FieldTextInput.nonnegativeIntegerValidator = function(a) {
    (a = Blockly.FieldTextInput.numberValidator(a)) && (a = String(Math.max(0, Math.floor(a))));
    return a
};
Blockly.FieldTextInput.prototype.isTabNavigable = function() { return !0 };
Blockly.FieldTextInput.prototype.getText_ = function() { return this.isBeingEdited_ && this.htmlInput_ ? this.htmlInput_.value : null };
Blockly.FieldTextInput.prototype.getEditorText_ = function(a) { return String(a) };
Blockly.FieldTextInput.prototype.getValueFromEditorText_ = function(a) { return a };
Blockly.fieldRegistry.register("field_input", Blockly.FieldTextInput);
Blockly.FieldAngle = function(a, b, c) {
    this.clockwise_ = Blockly.FieldAngle.CLOCKWISE;
    this.offset_ = Blockly.FieldAngle.OFFSET;
    this.wrap_ = Blockly.FieldAngle.WRAP;
    this.round_ = Blockly.FieldAngle.ROUND;
    Blockly.FieldAngle.superClass_.constructor.call(this, a || 0, b, c);
    this.moveSurfaceWrapper_ = this.clickSurfaceWrapper_ = this.clickWrapper_ = this.line_ = this.gauge_ = null
};
Blockly.utils.object.inherits(Blockly.FieldAngle, Blockly.FieldTextInput);
Blockly.FieldAngle.fromJson = function(a) { return new Blockly.FieldAngle(a.angle, void 0, a) };
Blockly.FieldAngle.prototype.SERIALIZABLE = !0;
Blockly.FieldAngle.ROUND = 15;
Blockly.FieldAngle.HALF = 50;
Blockly.FieldAngle.CLOCKWISE = !1;
Blockly.FieldAngle.OFFSET = 0;
Blockly.FieldAngle.WRAP = 360;
Blockly.FieldAngle.RADIUS = Blockly.FieldAngle.HALF - 1;
Blockly.FieldAngle.prototype.configure_ = function(a) {
    Blockly.FieldAngle.superClass_.configure_.call(this, a);
    switch (a.mode) {
        case "compass":
            this.clockwise_ = !0;
            this.offset_ = 90;
            break;
        case "protractor":
            this.clockwise_ = !1, this.offset_ = 0
    }
    var b = a.clockwise;
    "boolean" == typeof b && (this.clockwise_ = b);
    b = a.offset;
    null != b && (b = Number(b), isNaN(b) || (this.offset_ = b));
    b = a.wrap;
    null != b && (b = Number(b), isNaN(b) || (this.wrap_ = b));
    a = a.round;
    null != a && (a = Number(a), isNaN(a) || (this.round_ = a))
};
Blockly.FieldAngle.prototype.initView = function() {
    Blockly.FieldAngle.superClass_.initView.call(this);
    this.symbol_ = Blockly.utils.dom.createSvgElement("tspan", {}, null);
    this.symbol_.appendChild(document.createTextNode("\u00b0"));
    this.textElement_.appendChild(this.symbol_)
};
Blockly.FieldAngle.prototype.render_ = function() {
    Blockly.FieldAngle.superClass_.render_.call(this);
    this.updateGraph_()
};
Blockly.FieldAngle.prototype.showEditor_ = function(a) {
    Blockly.FieldAngle.superClass_.showEditor_.call(this, a, Blockly.utils.userAgent.MOBILE || Blockly.utils.userAgent.ANDROID || Blockly.utils.userAgent.IPAD);
    a = this.dropdownCreate_();
    Blockly.DropDownDiv.getContentDiv().appendChild(a);
    Blockly.DropDownDiv.setColour(this.sourceBlock_.style.colourPrimary, this.sourceBlock_.style.colourTertiary);
    Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
    this.updateGraph_()
};
Blockly.FieldAngle.prototype.dropdownCreate_ = function() {
    var a = Blockly.utils.dom.createSvgElement("svg", { xmlns: Blockly.utils.dom.SVG_NS, "xmlns:html": Blockly.utils.dom.HTML_NS, "xmlns:xlink": Blockly.utils.dom.XLINK_NS, version: "1.1", height: 2 * Blockly.FieldAngle.HALF + "px", width: 2 * Blockly.FieldAngle.HALF + "px", style: "touch-action: none" }, null),
        b = Blockly.utils.dom.createSvgElement("circle", { cx: Blockly.FieldAngle.HALF, cy: Blockly.FieldAngle.HALF, r: Blockly.FieldAngle.RADIUS, "class": "blocklyAngleCircle" }, a);
    this.gauge_ =
        Blockly.utils.dom.createSvgElement("path", { "class": "blocklyAngleGauge" }, a);
    this.line_ = Blockly.utils.dom.createSvgElement("line", { x1: Blockly.FieldAngle.HALF, y1: Blockly.FieldAngle.HALF, "class": "blocklyAngleLine" }, a);
    for (var c = 0; 360 > c; c += 15) Blockly.utils.dom.createSvgElement("line", {
        x1: Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS,
        y1: Blockly.FieldAngle.HALF,
        x2: Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS - (0 == c % 45 ? 10 : 5),
        y2: Blockly.FieldAngle.HALF,
        "class": "blocklyAngleMarks",
        transform: "rotate(" +
            c + "," + Blockly.FieldAngle.HALF + "," + Blockly.FieldAngle.HALF + ")"
    }, a);
    this.clickWrapper_ = Blockly.bindEventWithChecks_(a, "click", this, this.hide_);
    this.clickSurfaceWrapper_ = Blockly.bindEventWithChecks_(b, "click", this, this.onMouseMove_, !0, !0);
    this.moveSurfaceWrapper_ = Blockly.bindEventWithChecks_(b, "mousemove", this, this.onMouseMove_, !0, !0);
    return a
};
Blockly.FieldAngle.prototype.dropdownDispose_ = function() {
    this.clickWrapper_ && (Blockly.unbindEvent_(this.clickWrapper_), this.clickWrapper_ = null);
    this.clickSurfaceWrapper_ && (Blockly.unbindEvent_(this.clickSurfaceWrapper_), this.clickSurfaceWrapper_ = null);
    this.moveSurfaceWrapper_ && (Blockly.unbindEvent_(this.moveSurfaceWrapper_), this.moveSurfaceWrapper_ = null);
    this.line_ = this.gauge_ = null
};
Blockly.FieldAngle.prototype.hide_ = function() {
    Blockly.DropDownDiv.hideIfOwner(this);
    Blockly.WidgetDiv.hide()
};
Blockly.FieldAngle.prototype.onMouseMove_ = function(a) {
    var b = this.gauge_.ownerSVGElement.getBoundingClientRect(),
        c = a.clientX - b.left - Blockly.FieldAngle.HALF;
    a = a.clientY - b.top - Blockly.FieldAngle.HALF;
    b = Math.atan(-a / c);
    isNaN(b) || (b = Blockly.utils.math.toDegrees(b), 0 > c ? b += 180 : 0 < a && (b += 360), b = this.clockwise_ ? this.offset_ + 360 - b : 360 - (this.offset_ - b), this.displayMouseOrKeyboardValue_(b))
};
Blockly.FieldAngle.prototype.displayMouseOrKeyboardValue_ = function(a) {
    this.round_ && (a = Math.round(a / this.round_) * this.round_);
    a = this.wrapValue_(a);
    a != this.value_ && this.setEditorValue_(a)
};
Blockly.FieldAngle.prototype.updateGraph_ = function() {
    if (this.gauge_) {
        var a = Number(this.getText()) + this.offset_,
            b = Blockly.utils.math.toRadians(a % 360);
        a = ["M ", Blockly.FieldAngle.HALF, ",", Blockly.FieldAngle.HALF];
        var c = Blockly.FieldAngle.HALF,
            d = Blockly.FieldAngle.HALF;
        if (!isNaN(b)) {
            var e = Number(this.clockwise_),
                f = Blockly.utils.math.toRadians(this.offset_),
                g = Math.cos(f) * Blockly.FieldAngle.RADIUS,
                h = Math.sin(f) * -Blockly.FieldAngle.RADIUS;
            e && (b = 2 * f - b);
            c += Math.cos(b) * Blockly.FieldAngle.RADIUS;
            d -= Math.sin(b) *
                Blockly.FieldAngle.RADIUS;
            b = Math.abs(Math.floor((b - f) / Math.PI) % 2);
            e && (b = 1 - b);
            a.push(" l ", g, ",", h, " A ", Blockly.FieldAngle.RADIUS, ",", Blockly.FieldAngle.RADIUS, " 0 ", b, " ", e, " ", c, ",", d, " z")
        }
        this.gauge_.setAttribute("d", a.join(""));
        this.line_.setAttribute("x2", c);
        this.line_.setAttribute("y2", d)
    }
};
Blockly.FieldAngle.prototype.onHtmlInputKeyDown_ = function(a) {
    Blockly.FieldAngle.superClass_.onHtmlInputKeyDown_.call(this, a);
    var b;
    a.keyCode === Blockly.utils.KeyCodes.LEFT ? b = this.sourceBlock_.RTL ? 1 : -1 : a.keyCode === Blockly.utils.KeyCodes.RIGHT ? b = this.sourceBlock_.RTL ? -1 : 1 : a.keyCode === Blockly.utils.KeyCodes.DOWN ? b = -1 : a.keyCode === Blockly.utils.KeyCodes.UP && (b = 1);
    if (b) {
        var c = this.getValue();
        this.displayMouseOrKeyboardValue_(c + b * this.round_);
        a.preventDefault();
        a.stopPropagation()
    }
};
Blockly.FieldAngle.prototype.doClassValidation_ = function(a) { a = Number(a); return isNaN(a) || !isFinite(a) ? null : this.wrapValue_(a) };
Blockly.FieldAngle.prototype.wrapValue_ = function(a) {
    a %= 360;
    0 > a && (a += 360);
    a > this.wrap_ && (a -= 360);
    return a
};
Blockly.Css.register(".blocklyAngleCircle {,stroke: #444;,stroke-width: 1;,fill: #ddd;,fill-opacity: .8;,},.blocklyAngleMarks {,stroke: #444;,stroke-width: 1;,},.blocklyAngleGauge {,fill: #f88;,fill-opacity: .8;,pointer-events: none;,},.blocklyAngleLine {,stroke: #f00;,stroke-width: 2;,stroke-linecap: round;,pointer-events: none;,}".split(","));
Blockly.fieldRegistry.register("field_angle", Blockly.FieldAngle);
Blockly.FieldCheckbox = function(a, b, c) {
    this.checkChar_ = null;
    null == a && (a = "FALSE");
    Blockly.FieldCheckbox.superClass_.constructor.call(this, a, b, c)
};
Blockly.utils.object.inherits(Blockly.FieldCheckbox, Blockly.Field);
Blockly.FieldCheckbox.fromJson = function(a) { return new Blockly.FieldCheckbox(a.checked, void 0, a) };
Blockly.FieldCheckbox.CHECK_CHAR = "\u2713";
Blockly.FieldCheckbox.prototype.SERIALIZABLE = !0;
Blockly.FieldCheckbox.prototype.CURSOR = "default";
Blockly.FieldCheckbox.prototype.configure_ = function(a) {
    Blockly.FieldCheckbox.superClass_.configure_.call(this, a);
    a.checkCharacter && (this.checkChar_ = a.checkCharacter)
};
Blockly.FieldCheckbox.prototype.initView = function() {
    Blockly.FieldCheckbox.superClass_.initView.call(this);
    Blockly.utils.dom.addClass(this.textElement_, "blocklyCheckbox");
    this.textElement_.style.display = this.value_ ? "block" : "none"
};
Blockly.FieldCheckbox.prototype.render_ = function() {
    this.textContent_ && (this.textContent_.nodeValue = this.getDisplayText_());
    this.updateSize_(this.getConstants().FIELD_CHECKBOX_X_OFFSET)
};
Blockly.FieldCheckbox.prototype.getDisplayText_ = function() { return this.checkChar_ || Blockly.FieldCheckbox.CHECK_CHAR };
Blockly.FieldCheckbox.prototype.setCheckCharacter = function(a) {
    this.checkChar_ = a;
    this.forceRerender()
};
Blockly.FieldCheckbox.prototype.showEditor_ = function() { this.setValue(!this.value_) };
Blockly.FieldCheckbox.prototype.doClassValidation_ = function(a) { return !0 === a || "TRUE" === a ? "TRUE" : !1 === a || "FALSE" === a ? "FALSE" : null };
Blockly.FieldCheckbox.prototype.doValueUpdate_ = function(a) {
    this.value_ = this.convertValueToBool_(a);
    this.textElement_ && (this.textElement_.style.display = this.value_ ? "block" : "none")
};
Blockly.FieldCheckbox.prototype.getValue = function() { return this.value_ ? "TRUE" : "FALSE" };
Blockly.FieldCheckbox.prototype.getValueBoolean = function() { return this.value_ };
Blockly.FieldCheckbox.prototype.getText = function() { return String(this.convertValueToBool_(this.value_)) };
Blockly.FieldCheckbox.prototype.convertValueToBool_ = function(a) { return "string" == typeof a ? "TRUE" == a : !!a };
Blockly.fieldRegistry.register("field_checkbox", Blockly.FieldCheckbox);
Blockly.FieldColour = function(a, b, c) {
    Blockly.FieldColour.superClass_.constructor.call(this, a || Blockly.FieldColour.COLOURS[0], b, c);
    this.onKeyDownWrapper_ = this.onMouseLeaveWrapper_ = this.onMouseEnterWrapper_ = this.onMouseMoveWrapper_ = this.onClickWrapper_ = this.highlightedIndex_ = this.picker_ = null
};
Blockly.utils.object.inherits(Blockly.FieldColour, Blockly.Field);
Blockly.FieldColour.fromJson = function(a) { return new Blockly.FieldColour(a.colour, void 0, a) };
Blockly.FieldColour.prototype.SERIALIZABLE = !0;
Blockly.FieldColour.prototype.CURSOR = "default";
Blockly.FieldColour.prototype.isDirty_ = !1;
Blockly.FieldColour.prototype.colours_ = null;
Blockly.FieldColour.prototype.titles_ = null;
Blockly.FieldColour.prototype.columns_ = 0;
Blockly.FieldColour.prototype.configure_ = function(a) {
    Blockly.FieldColour.superClass_.configure_.call(this, a);
    a.colourOptions && (this.colours_ = a.colourOptions, this.titles_ = a.colourTitles);
    a.columns && (this.columns_ = a.columns)
};
Blockly.FieldColour.prototype.initView = function() {
    this.size_ = new Blockly.utils.Size(this.getConstants().FIELD_COLOUR_DEFAULT_WIDTH, this.getConstants().FIELD_COLOUR_DEFAULT_HEIGHT);
    this.getConstants().FIELD_COLOUR_FULL_BLOCK ? this.clickTarget_ = this.sourceBlock_.getSvgRoot() : (this.createBorderRect_(), this.borderRect_.style.fillOpacity = "1")
};
Blockly.FieldColour.prototype.applyColour = function() { this.getConstants().FIELD_COLOUR_FULL_BLOCK ? (this.sourceBlock_.pathObject.svgPath.setAttribute("fill", this.getValue()), this.sourceBlock_.pathObject.svgPath.setAttribute("stroke", "#fff")) : this.borderRect_ && (this.borderRect_.style.fill = this.getValue()) };
Blockly.FieldColour.prototype.doClassValidation_ = function(a) { return "string" != typeof a ? null : Blockly.utils.colour.parse(a) };
Blockly.FieldColour.prototype.doValueUpdate_ = function(a) {
    this.value_ = a;
    this.borderRect_ ? this.borderRect_.style.fill = a : this.sourceBlock_ && this.sourceBlock_.rendered && (this.sourceBlock_.pathObject.svgPath.setAttribute("fill", a), this.sourceBlock_.pathObject.svgPath.setAttribute("stroke", "#fff"))
};
Blockly.FieldColour.prototype.getText = function() { var a = this.value_; /^#(.)\1(.)\2(.)\3$/.test(a) && (a = "#" + a[1] + a[3] + a[5]); return a };
Blockly.FieldColour.COLOURS = "#ffffff #cccccc #c0c0c0 #999999 #666666 #333333 #000000 #ffcccc #ff6666 #ff0000 #cc0000 #990000 #660000 #330000 #ffcc99 #ff9966 #ff9900 #ff6600 #cc6600 #993300 #663300 #ffff99 #ffff66 #ffcc66 #ffcc33 #cc9933 #996633 #663333 #ffffcc #ffff33 #ffff00 #ffcc00 #999900 #666600 #333300 #99ff99 #66ff99 #33ff33 #33cc00 #009900 #006600 #003300 #99ffff #33ffff #66cccc #00cccc #339999 #336666 #003333 #ccffff #66ffff #33ccff #3366ff #3333ff #000099 #000066 #ccccff #9999ff #6666cc #6633ff #6600cc #333399 #330099 #ffccff #ff99ff #cc66cc #cc33cc #993399 #663366 #330033".split(" ");
Blockly.FieldColour.TITLES = [];
Blockly.FieldColour.COLUMNS = 7;
Blockly.FieldColour.prototype.setColours = function(a, b) {
    this.colours_ = a;
    b && (this.titles_ = b);
    return this
};
Blockly.FieldColour.prototype.setColumns = function(a) { this.columns_ = a; return this };
Blockly.FieldColour.prototype.showEditor_ = function() {
    this.picker_ = this.dropdownCreate_();
    Blockly.DropDownDiv.getContentDiv().appendChild(this.picker_);
    Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
    this.picker_.focus({ preventScroll: !0 })
};
Blockly.FieldColour.prototype.onClick_ = function(a) {
    a = (a = a.target) && a.label;
    null !== a && (this.setValue(a), Blockly.DropDownDiv.hideIfOwner(this))
};
Blockly.FieldColour.prototype.onKeyDown_ = function(a) {
    var b = !1;
    if (a.keyCode === Blockly.utils.KeyCodes.UP) this.moveHighlightBy_(0, -1), b = !0;
    else if (a.keyCode === Blockly.utils.KeyCodes.DOWN) this.moveHighlightBy_(0, 1), b = !0;
    else if (a.keyCode === Blockly.utils.KeyCodes.LEFT) this.moveHighlightBy_(-1, 0), b = !0;
    else if (a.keyCode === Blockly.utils.KeyCodes.RIGHT) this.moveHighlightBy_(1, 0), b = !0;
    else if (a.keyCode === Blockly.utils.KeyCodes.ENTER) {
        if (b = this.getHighlighted_()) b = b && b.label, null !== b && this.setValue(b);
        Blockly.DropDownDiv.hideWithoutAnimation();
        b = !0
    }
    b && a.stopPropagation()
};
Blockly.FieldColour.prototype.onBlocklyAction = function(a) { if (this.picker_) { if (a === Blockly.navigation.ACTION_PREVIOUS) return this.moveHighlightBy_(0, -1), !0; if (a === Blockly.navigation.ACTION_NEXT) return this.moveHighlightBy_(0, 1), !0; if (a === Blockly.navigation.ACTION_OUT) return this.moveHighlightBy_(-1, 0), !0; if (a === Blockly.navigation.ACTION_IN) return this.moveHighlightBy_(1, 0), !0 } return Blockly.FieldColour.superClass_.onBlocklyAction.call(this, a) };
Blockly.FieldColour.prototype.moveHighlightBy_ = function(a, b) {
    var c = this.colours_ || Blockly.FieldColour.COLOURS,
        d = this.columns_ || Blockly.FieldColour.COLUMNS,
        e = this.highlightedIndex_ % d,
        f = Math.floor(this.highlightedIndex_ / d);
    e += a;
    f += b;
    0 > a ? 0 > e && 0 < f ? (e = d - 1, f--) : 0 > e && (e = 0) : 0 < a ? e > d - 1 && f < Math.floor(c.length / d) - 1 ? (e = 0, f++) : e > d - 1 && e-- : 0 > b ? 0 > f && (f = 0) : 0 < b && f > Math.floor(c.length / d) - 1 && (f = Math.floor(c.length / d) - 1);
    this.setHighlightedCell_(this.picker_.childNodes[f].childNodes[e], f * d + e)
};
Blockly.FieldColour.prototype.onMouseMove_ = function(a) {
    var b = (a = a.target) && Number(a.getAttribute("data-index"));
    null !== b && b !== this.highlightedIndex_ && this.setHighlightedCell_(a, b)
};
Blockly.FieldColour.prototype.onMouseEnter_ = function() { this.picker_.focus({ preventScroll: !0 }) };
Blockly.FieldColour.prototype.onMouseLeave_ = function() {
    this.picker_.blur();
    var a = this.getHighlighted_();
    a && Blockly.utils.dom.removeClass(a, "blocklyColourHighlighted")
};
Blockly.FieldColour.prototype.getHighlighted_ = function() {
    var a = this.columns_ || Blockly.FieldColour.COLUMNS,
        b = this.picker_.childNodes[Math.floor(this.highlightedIndex_ / a)];
    return b ? b.childNodes[this.highlightedIndex_ % a] : null
};
Blockly.FieldColour.prototype.setHighlightedCell_ = function(a, b) {
    var c = this.getHighlighted_();
    c && Blockly.utils.dom.removeClass(c, "blocklyColourHighlighted");
    Blockly.utils.dom.addClass(a, "blocklyColourHighlighted");
    this.highlightedIndex_ = b;
    Blockly.utils.aria.setState(this.picker_, Blockly.utils.aria.State.ACTIVEDESCENDANT, a.getAttribute("id"))
};
Blockly.FieldColour.prototype.dropdownCreate_ = function() {
    var a = this.columns_ || Blockly.FieldColour.COLUMNS,
        b = this.colours_ || Blockly.FieldColour.COLOURS,
        c = this.titles_ || Blockly.FieldColour.TITLES,
        d = this.getValue(),
        e = document.createElement("table");
    e.className = "blocklyColourTable";
    e.tabIndex = 0;
    e.dir = "ltr";
    Blockly.utils.aria.setRole(e, Blockly.utils.aria.Role.GRID);
    Blockly.utils.aria.setState(e, Blockly.utils.aria.State.EXPANDED, !0);
    Blockly.utils.aria.setState(e, Blockly.utils.aria.State.ROWCOUNT, Math.floor(b.length /
        a));
    Blockly.utils.aria.setState(e, Blockly.utils.aria.State.COLCOUNT, a);
    for (var f, g = 0; g < b.length; g++) {
        0 == g % a && (f = document.createElement("tr"), Blockly.utils.aria.setRole(f, Blockly.utils.aria.Role.ROW), e.appendChild(f));
        var h = document.createElement("td");
        f.appendChild(h);
        h.label = b[g];
        h.title = c[g] || b[g];
        h.id = Blockly.utils.IdGenerator.getNextUniqueId();
        h.setAttribute("data-index", g);
        Blockly.utils.aria.setRole(h, Blockly.utils.aria.Role.GRIDCELL);
        Blockly.utils.aria.setState(h, Blockly.utils.aria.State.LABEL,
            b[g]);
        Blockly.utils.aria.setState(h, Blockly.utils.aria.State.SELECTED, b[g] == d);
        h.style.backgroundColor = b[g];
        b[g] == d && (h.className = "blocklyColourSelected", this.highlightedIndex_ = g)
    }
    this.onClickWrapper_ = Blockly.bindEventWithChecks_(e, "click", this, this.onClick_, !0);
    this.onMouseMoveWrapper_ = Blockly.bindEventWithChecks_(e, "mousemove", this, this.onMouseMove_, !0);
    this.onMouseEnterWrapper_ = Blockly.bindEventWithChecks_(e, "mouseenter", this, this.onMouseEnter_, !0);
    this.onMouseLeaveWrapper_ = Blockly.bindEventWithChecks_(e,
        "mouseleave", this, this.onMouseLeave_, !0);
    this.onKeyDownWrapper_ = Blockly.bindEventWithChecks_(e, "keydown", this, this.onKeyDown_);
    return e
};
Blockly.FieldColour.prototype.dropdownDispose_ = function() {
    this.onClickWrapper_ && (Blockly.unbindEvent_(this.onClickWrapper_), this.onClickWrapper_ = null);
    this.onMouseMoveWrapper_ && (Blockly.unbindEvent_(this.onMouseMoveWrapper_), this.onMouseMoveWrapper_ = null);
    this.onMouseEnterWrapper_ && (Blockly.unbindEvent_(this.onMouseEnterWrapper_), this.onMouseEnterWrapper_ = null);
    this.onMouseLeaveWrapper_ && (Blockly.unbindEvent_(this.onMouseLeaveWrapper_), this.onMouseLeaveWrapper_ = null);
    this.onKeyDownWrapper_ && (Blockly.unbindEvent_(this.onKeyDownWrapper_),
        this.onKeyDownWrapper_ = null);
    this.highlightedIndex_ = this.picker_ = null
};
Blockly.Css.register([".blocklyColourTable {", "border-collapse: collapse;", "display: block;", "outline: none;", "padding: 1px;", "}", ".blocklyColourTable>tr>td {", "border: .5px solid #888;", "box-sizing: border-box;", "cursor: pointer;", "display: inline-block;", "height: 20px;", "padding: 0;", "width: 20px;", "}", ".blocklyColourTable>tr>td.blocklyColourHighlighted {", "border-color: #eee;", "box-shadow: 2px 2px 7px 2px rgba(0,0,0,.3);", "position: relative;", "}", ".blocklyColourSelected, .blocklyColourSelected:hover {",
    "border-color: #eee !important;", "outline: 1px solid #333;", "position: relative;", "}"
]);
Blockly.fieldRegistry.register("field_colour", Blockly.FieldColour);
Blockly.FieldDropdown = function(a, b, c) {
    "function" != typeof a && Blockly.FieldDropdown.validateOptions_(a);
    this.menuGenerator_ = a;
    this.generatedOptions_ = null;
    this.trimOptions_();
    this.selectedOption_ = this.getOptions(!1)[0];
    Blockly.FieldDropdown.superClass_.constructor.call(this, this.selectedOption_[1], b, c);
    this.svgArrow_ = this.arrow_ = this.imageElement_ = this.menu_ = this.selectedMenuItem_ = null
};
Blockly.utils.object.inherits(Blockly.FieldDropdown, Blockly.Field);
Blockly.FieldDropdown.fromJson = function(a) { return new Blockly.FieldDropdown(a.options, void 0, a) };
Blockly.FieldDropdown.prototype.SERIALIZABLE = !0;
Blockly.FieldDropdown.CHECKMARK_OVERHANG = 25;
Blockly.FieldDropdown.MAX_MENU_HEIGHT_VH = .45;
Blockly.FieldDropdown.IMAGE_Y_OFFSET = 5;
Blockly.FieldDropdown.IMAGE_Y_PADDING = 2 * Blockly.FieldDropdown.IMAGE_Y_OFFSET;
Blockly.FieldDropdown.ARROW_CHAR = Blockly.utils.userAgent.ANDROID ? "\u25bc" : "\u25be";
Blockly.FieldDropdown.prototype.CURSOR = "default";
Blockly.FieldDropdown.prototype.initView = function() {
    this.shouldAddBorderRect_() ? this.createBorderRect_() : this.clickTarget_ = this.sourceBlock_.getSvgRoot();
    this.createTextElement_();
    this.imageElement_ = Blockly.utils.dom.createSvgElement("image", {}, this.fieldGroup_);
    this.getConstants().FIELD_DROPDOWN_SVG_ARROW ? this.createSVGArrow_() : this.createTextArrow_();
    this.borderRect_ && Blockly.utils.dom.addClass(this.borderRect_, "blocklyDropdownRect")
};
Blockly.FieldDropdown.prototype.shouldAddBorderRect_ = function() { return !this.getConstants().FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW || this.getConstants().FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW && !this.sourceBlock_.isShadow() };
Blockly.FieldDropdown.prototype.createTextArrow_ = function() {
    this.arrow_ = Blockly.utils.dom.createSvgElement("tspan", {}, this.textElement_);
    this.arrow_.appendChild(document.createTextNode(this.sourceBlock_.RTL ? Blockly.FieldDropdown.ARROW_CHAR + " " : " " + Blockly.FieldDropdown.ARROW_CHAR));
    this.sourceBlock_.RTL ? this.textElement_.insertBefore(this.arrow_, this.textContent_) : this.textElement_.appendChild(this.arrow_)
};
Blockly.FieldDropdown.prototype.createSVGArrow_ = function() {
    this.svgArrow_ = Blockly.utils.dom.createSvgElement("image", { height: this.getConstants().FIELD_DROPDOWN_SVG_ARROW_SIZE + "px", width: this.getConstants().FIELD_DROPDOWN_SVG_ARROW_SIZE + "px" }, this.fieldGroup_);
    this.svgArrow_.setAttributeNS(Blockly.utils.dom.XLINK_NS, "xlink:href", this.getConstants().FIELD_DROPDOWN_SVG_ARROW_DATAURI)
};
Blockly.FieldDropdown.prototype.showEditor_ = function(a) {
    this.menu_ = this.dropdownCreate_();
    this.menu_.openingCoords = a && "number" === typeof a.clientX ? new Blockly.utils.Coordinate(a.clientX, a.clientY) : null;
    this.menu_.render(Blockly.DropDownDiv.getContentDiv());
    Blockly.utils.dom.addClass(this.menu_.getElement(), "blocklyDropdownMenu");
    if (this.getConstants().FIELD_DROPDOWN_COLOURED_DIV) {
        a = this.sourceBlock_.isShadow() ? this.sourceBlock_.getParent().getColour() : this.sourceBlock_.getColour();
        var b = this.sourceBlock_.isShadow() ?
            this.sourceBlock_.getParent().style.colourTertiary : this.sourceBlock_.style.colourTertiary;
        Blockly.DropDownDiv.setColour(a, b)
    }
    Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
    this.menu_.focus();
    this.selectedMenuItem_ && Blockly.utils.style.scrollIntoContainerView(this.selectedMenuItem_.getElement(), this.menu_.getElement());
    this.applyColour()
};
Blockly.FieldDropdown.prototype.dropdownCreate_ = function() {
    var a = new Blockly.Menu;
    a.setRightToLeft(this.sourceBlock_.RTL);
    a.setRole(Blockly.utils.aria.Role.LISTBOX);
    var b = this.getOptions(!1);
    this.selectedMenuItem_ = null;
    for (var c = 0; c < b.length; c++) {
        var d = b[c][0],
            e = b[c][1];
        if ("object" == typeof d) {
            var f = new Image(d.width, d.height);
            f.src = d.src;
            f.alt = d.alt || "";
            d = f
        }
        d = new Blockly.MenuItem(d);
        d.setRole(Blockly.utils.aria.Role.OPTION);
        d.setRightToLeft(this.sourceBlock_.RTL);
        d.setValue(e);
        d.setCheckable(!0);
        a.addChild(d, !0);
        d.setChecked(e == this.value_);
        e == this.value_ && (this.selectedMenuItem_ = d);
        d.onAction(this.handleMenuActionEvent_, this)
    }
    Blockly.utils.aria.setState(a.getElement(), Blockly.utils.aria.State.ACTIVEDESCENDANT, this.selectedMenuItem_ ? this.selectedMenuItem_.getId() : "");
    return a
};
Blockly.FieldDropdown.prototype.dropdownDispose_ = function() {
    this.menu_ && this.menu_.dispose();
    this.selectedMenuItem_ = this.menu_ = null;
    this.applyColour()
};
Blockly.FieldDropdown.prototype.handleMenuActionEvent_ = function(a) {
    Blockly.DropDownDiv.hideIfOwner(this, !0);
    this.onItemSelected_(this.menu_, a)
};
Blockly.FieldDropdown.prototype.onItemSelected_ = function(a, b) { this.setValue(b.getValue()) };
Blockly.FieldDropdown.prototype.trimOptions_ = function() {
    this.suffixField = this.prefixField = null;
    var a = this.menuGenerator_;
    if (Array.isArray(a)) {
        for (var b = !1, c = 0; c < a.length; c++) { var d = a[c][0]; "string" == typeof d ? a[c][0] = Blockly.utils.replaceMessageReferences(d) : (null != d.alt && (a[c][0].alt = Blockly.utils.replaceMessageReferences(d.alt)), b = !0) }
        if (!(b || 2 > a.length)) {
            b = [];
            for (c = 0; c < a.length; c++) b.push(a[c][0]);
            c = Blockly.utils.string.shortestStringLength(b);
            d = Blockly.utils.string.commonWordPrefix(b, c);
            var e =
                Blockly.utils.string.commonWordSuffix(b, c);
            !d && !e || c <= d + e || (d && (this.prefixField = b[0].substring(0, d - 1)), e && (this.suffixField = b[0].substr(1 - e)), this.menuGenerator_ = Blockly.FieldDropdown.applyTrim_(a, d, e))
        }
    }
};
Blockly.FieldDropdown.applyTrim_ = function(a, b, c) {
    for (var d = [], e = 0; e < a.length; e++) {
        var f = a[e][0],
            g = a[e][1];
        f = f.substring(b, f.length - c);
        d[e] = [f, g]
    }
    return d
};
Blockly.FieldDropdown.prototype.isOptionListDynamic = function() { return "function" == typeof this.menuGenerator_ };
Blockly.FieldDropdown.prototype.getOptions = function(a) { return this.isOptionListDynamic() ? (this.generatedOptions_ && a || (this.generatedOptions_ = this.menuGenerator_.call(this), Blockly.FieldDropdown.validateOptions_(this.generatedOptions_)), this.generatedOptions_) : this.menuGenerator_ };
Blockly.FieldDropdown.prototype.doClassValidation_ = function(a) {
    for (var b = !1, c = this.getOptions(!0), d = 0, e; e = c[d]; d++)
        if (e[1] == a) { b = !0; break }
    return b ? a : (this.sourceBlock_ && console.warn("Cannot set the dropdown's value to an unavailable option. Block type: " + this.sourceBlock_.type + ", Field name: " + this.name + ", Value: " + a), null)
};
Blockly.FieldDropdown.prototype.doValueUpdate_ = function(a) {
    Blockly.FieldDropdown.superClass_.doValueUpdate_.call(this, a);
    a = this.getOptions(!0);
    for (var b = 0, c; c = a[b]; b++) c[1] == this.value_ && (this.selectedOption_ = c)
};
Blockly.FieldDropdown.prototype.applyColour = function() {
    this.borderRect_ && (this.borderRect_.setAttribute("stroke", this.sourceBlock_.style.colourTertiary), this.menu_ ? this.borderRect_.setAttribute("fill", this.sourceBlock_.style.colourTertiary) : this.borderRect_.setAttribute("fill", "transparent"));
    this.sourceBlock_ && this.arrow_ && (this.sourceBlock_.isShadow() ? this.arrow_.style.fill = this.sourceBlock_.style.colourSecondary : this.arrow_.style.fill = this.sourceBlock_.style.colourPrimary)
};
Blockly.FieldDropdown.prototype.render_ = function() {
    this.textContent_.nodeValue = "";
    this.imageElement_.style.display = "none";
    var a = this.selectedOption_ && this.selectedOption_[0];
    a && "object" == typeof a ? this.renderSelectedImage_(a) : this.renderSelectedText_();
    this.positionBorderRect_()
};
Blockly.FieldDropdown.prototype.renderSelectedImage_ = function(a) {
    this.imageElement_.style.display = "";
    this.imageElement_.setAttributeNS(Blockly.utils.dom.XLINK_NS, "xlink:href", a.src);
    this.imageElement_.setAttribute("height", a.height);
    this.imageElement_.setAttribute("width", a.width);
    var b = Number(a.height);
    a = Number(a.width);
    var c = !!this.borderRect_,
        d = Math.max(c ? this.getConstants().FIELD_DROPDOWN_BORDER_RECT_HEIGHT : 0, b + Blockly.FieldDropdown.IMAGE_Y_PADDING);
    c = c ? this.getConstants().FIELD_BORDER_RECT_X_PADDING :
        0;
    var e = this.svgArrow_ ? this.positionSVGArrow_(a + c, d / 2 - this.getConstants().FIELD_DROPDOWN_SVG_ARROW_SIZE / 2) : Blockly.utils.dom.getFastTextWidth(this.arrow_, this.getConstants().FIELD_TEXT_FONTSIZE, this.getConstants().FIELD_TEXT_FONTWEIGHT, this.getConstants().FIELD_TEXT_FONTFAMILY);
    this.size_.width = a + e + 2 * c;
    this.size_.height = d;
    var f = 0;
    this.sourceBlock_.RTL ? this.imageElement_.setAttribute("x", c + e) : (f = a + e, this.textElement_.setAttribute("text-anchor", "end"), this.imageElement_.setAttribute("x", c));
    this.imageElement_.setAttribute("y",
        d / 2 - b / 2);
    this.positionTextElement_(f + c, a + e)
};
Blockly.FieldDropdown.prototype.renderSelectedText_ = function() {
    this.textContent_.nodeValue = this.getDisplayText_();
    Blockly.utils.dom.addClass(this.textElement_, "blocklyDropdownText");
    this.textElement_.setAttribute("text-anchor", "start");
    var a = !!this.borderRect_,
        b = Math.max(a ? this.getConstants().FIELD_DROPDOWN_BORDER_RECT_HEIGHT : 0, this.getConstants().FIELD_TEXT_HEIGHT),
        c = Blockly.utils.dom.getFastTextWidth(this.textElement_, this.getConstants().FIELD_TEXT_FONTSIZE, this.getConstants().FIELD_TEXT_FONTWEIGHT,
            this.getConstants().FIELD_TEXT_FONTFAMILY);
    a = a ? this.getConstants().FIELD_BORDER_RECT_X_PADDING : 0;
    var d = 0;
    this.svgArrow_ && (d = this.positionSVGArrow_(c + a, b / 2 - this.getConstants().FIELD_DROPDOWN_SVG_ARROW_SIZE / 2));
    this.size_.width = c + d + 2 * a;
    this.size_.height = b;
    this.positionTextElement_(a, c)
};
Blockly.FieldDropdown.prototype.positionSVGArrow_ = function(a, b) {
    if (!this.svgArrow_) return 0;
    var c = this.borderRect_ ? this.getConstants().FIELD_BORDER_RECT_X_PADDING : 0,
        d = this.getConstants().FIELD_DROPDOWN_SVG_ARROW_PADDING,
        e = this.getConstants().FIELD_DROPDOWN_SVG_ARROW_SIZE;
    this.svgArrow_.setAttribute("transform", "translate(" + (this.sourceBlock_.RTL ? c : a + d) + "," + b + ")");
    return e + d
};
Blockly.FieldDropdown.prototype.getText_ = function() { if (!this.selectedOption_) return null; var a = this.selectedOption_[0]; return "object" == typeof a ? a.alt : a };
Blockly.FieldDropdown.validateOptions_ = function(a) {
    if (!Array.isArray(a)) throw TypeError("FieldDropdown options must be an array.");
    if (!a.length) throw TypeError("FieldDropdown options must not be an empty array.");
    for (var b = !1, c = 0; c < a.length; ++c) {
        var d = a[c];
        Array.isArray(d) ? "string" != typeof d[1] ? (b = !0, console.error("Invalid option[" + c + "]: Each FieldDropdown option id must be a string. Found " + d[1] + " in: ", d)) : d[0] && "string" != typeof d[0] && "string" != typeof d[0].src && (b = !0, console.error("Invalid option[" +
            c + "]: Each FieldDropdown option must have a string label or image description. Found" + d[0] + " in: ", d)) : (b = !0, console.error("Invalid option[" + c + "]: Each FieldDropdown option must be an array. Found: ", d))
    }
    if (b) throw TypeError("Found invalid FieldDropdown options.");
};
Blockly.FieldDropdown.prototype.onBlocklyAction = function(a) { if (this.menu_) { if (a === Blockly.navigation.ACTION_PREVIOUS) return this.menu_.highlightPrevious(), !0; if (a === Blockly.navigation.ACTION_NEXT) return this.menu_.highlightNext(), !0 } return Blockly.FieldDropdown.superClass_.onBlocklyAction.call(this, a) };
Blockly.fieldRegistry.register("field_dropdown", Blockly.FieldDropdown);
Blockly.FieldLabelSerializable = function(a, b, c) { Blockly.FieldLabelSerializable.superClass_.constructor.call(this, a, b, c) };
Blockly.utils.object.inherits(Blockly.FieldLabelSerializable, Blockly.FieldLabel);
Blockly.FieldLabelSerializable.fromJson = function(a) { var b = Blockly.utils.replaceMessageReferences(a.text); return new Blockly.FieldLabelSerializable(b, void 0, a) };
Blockly.FieldLabelSerializable.prototype.EDITABLE = !1;
Blockly.FieldLabelSerializable.prototype.SERIALIZABLE = !0;
Blockly.fieldRegistry.register("field_label_serializable", Blockly.FieldLabelSerializable);
Blockly.FieldImage = function(a, b, c, d, e, f, g) {
    if (!a) throw Error("Src value of an image field is required");
    a = Blockly.utils.replaceMessageReferences(a);
    c = Number(Blockly.utils.replaceMessageReferences(c));
    b = Number(Blockly.utils.replaceMessageReferences(b));
    if (isNaN(c) || isNaN(b)) throw Error("Height and width values of an image field must cast to numbers.");
    if (0 >= c || 0 >= b) throw Error("Height and width values of an image field must be greater than 0.");
    this.flipRtl_ = !1;
    this.altText_ = "";
    Blockly.FieldImage.superClass_.constructor.call(this,
        a || "", null, g);
    g || (this.flipRtl_ = !!f, this.altText_ = Blockly.utils.replaceMessageReferences(d) || "");
    this.size_ = new Blockly.utils.Size(b, c + Blockly.FieldImage.Y_PADDING);
    this.imageHeight_ = c;
    this.clickHandler_ = null;
    "function" == typeof e && (this.clickHandler_ = e);
    this.imageElement_ = null
};
Blockly.utils.object.inherits(Blockly.FieldImage, Blockly.Field);
Blockly.FieldImage.fromJson = function(a) { return new Blockly.FieldImage(a.src, a.width, a.height, void 0, void 0, void 0, a) };
Blockly.FieldImage.Y_PADDING = 1;
Blockly.FieldImage.prototype.EDITABLE = !1;
Blockly.FieldImage.prototype.isDirty_ = !1;
Blockly.FieldImage.prototype.configure_ = function(a) {
    Blockly.FieldImage.superClass_.configure_.call(this, a);
    this.flipRtl_ = !!a.flipRtl;
    this.altText_ = Blockly.utils.replaceMessageReferences(a.alt) || ""
};
Blockly.FieldImage.prototype.initView = function() {
    this.imageElement_ = Blockly.utils.dom.createSvgElement("image", { height: this.imageHeight_ + "px", width: this.size_.width + "px", alt: this.altText_ }, this.fieldGroup_);
    this.imageElement_.setAttributeNS(Blockly.utils.dom.XLINK_NS, "xlink:href", this.value_);
    this.clickHandler_ && (this.imageElement_.style.cursor = "pointer")
};
Blockly.FieldImage.prototype.updateSize_ = function() {};
Blockly.FieldImage.prototype.doClassValidation_ = function(a) { return "string" != typeof a ? null : a };
Blockly.FieldImage.prototype.doValueUpdate_ = function(a) {
    this.value_ = a;
    this.imageElement_ && this.imageElement_.setAttributeNS(Blockly.utils.dom.XLINK_NS, "xlink:href", String(this.value_))
};
Blockly.FieldImage.prototype.getFlipRtl = function() { return this.flipRtl_ };
Blockly.FieldImage.prototype.setAlt = function(a) { a != this.altText_ && (this.altText_ = a || "", this.imageElement_ && this.imageElement_.setAttribute("alt", this.altText_)) };
Blockly.FieldImage.prototype.showEditor_ = function() { this.clickHandler_ && this.clickHandler_(this) };
Blockly.FieldImage.prototype.setOnClickHandler = function(a) { this.clickHandler_ = a };
Blockly.FieldImage.prototype.getText_ = function() { return this.altText_ };
Blockly.fieldRegistry.register("field_image", Blockly.FieldImage);
Blockly.FieldMultilineInput = function(a, b, c) {
    null == a && (a = "");
    Blockly.FieldMultilineInput.superClass_.constructor.call(this, a, b, c);
    this.textGroup_ = null
};
Blockly.utils.object.inherits(Blockly.FieldMultilineInput, Blockly.FieldTextInput);
Blockly.FieldMultilineInput.fromJson = function(a) { var b = Blockly.utils.replaceMessageReferences(a.text); return new Blockly.FieldMultilineInput(b, void 0, a) };
Blockly.FieldMultilineInput.prototype.initView = function() {
    this.createBorderRect_();
    this.textGroup_ = Blockly.utils.dom.createSvgElement("g", { "class": "blocklyEditableText" }, this.fieldGroup_)
};
Blockly.FieldMultilineInput.prototype.getDisplayText_ = function() {
    var a = this.value_;
    if (!a) return Blockly.Field.NBSP;
    var b = a.split("\n");
    a = "";
    for (var c = 0; c < b.length; c++) {
        var d = b[c];
        d.length > this.maxDisplayLength && (d = d.substring(0, this.maxDisplayLength - 4) + "...");
        d = d.replace(/\s/g, Blockly.Field.NBSP);
        a += d;
        c !== b.length - 1 && (a += "\n")
    }
    this.sourceBlock_.RTL && (a += "\u200f");
    return a
};
Blockly.FieldMultilineInput.prototype.render_ = function() {
    for (var a; a = this.textGroup_.firstChild;) this.textGroup_.removeChild(a);
    a = this.getDisplayText_().split("\n");
    for (var b = 0, c = 0; c < a.length; c++) {
        var d = this.getConstants().FIELD_TEXT_HEIGHT + this.getConstants().FIELD_BORDER_RECT_Y_PADDING;
        Blockly.utils.dom.createSvgElement("text", { "class": "blocklyText blocklyMultilineText", x: this.getConstants().FIELD_BORDER_RECT_X_PADDING, y: b + this.getConstants().FIELD_BORDER_RECT_Y_PADDING, dy: this.getConstants().FIELD_TEXT_BASELINE },
            this.textGroup_).appendChild(document.createTextNode(a[c]));
        b += d
    }
    this.updateSize_();
    this.isBeingEdited_ && (this.sourceBlock_.RTL ? setTimeout(this.resizeEditor_.bind(this), 0) : this.resizeEditor_(), a = this.htmlInput_, this.isTextValid_ ? (Blockly.utils.dom.removeClass(a, "blocklyInvalidInput"), Blockly.utils.aria.setState(a, Blockly.utils.aria.State.INVALID, !1)) : (Blockly.utils.dom.addClass(a, "blocklyInvalidInput"), Blockly.utils.aria.setState(a, Blockly.utils.aria.State.INVALID, !0)))
};
Blockly.FieldMultilineInput.prototype.updateSize_ = function() {
    for (var a = this.textGroup_.childNodes, b = 0, c = 0, d = 0; d < a.length; d++) {
        var e = Blockly.utils.dom.getTextWidth(a[d]);
        e > b && (b = e);
        c += this.getConstants().FIELD_TEXT_HEIGHT + (0 < d ? this.getConstants().FIELD_BORDER_RECT_Y_PADDING : 0)
    }
    this.borderRect_ && (c += 2 * this.getConstants().FIELD_BORDER_RECT_Y_PADDING, b += 2 * this.getConstants().FIELD_BORDER_RECT_X_PADDING, this.borderRect_.setAttribute("width", b), this.borderRect_.setAttribute("height", c));
    this.size_.width =
        b;
    this.size_.height = c;
    this.positionBorderRect_()
};
Blockly.FieldMultilineInput.prototype.widgetCreate_ = function() {
    var a = Blockly.WidgetDiv.DIV,
        b = this.workspace_.getScale(),
        c = document.createElement("textarea");
    c.className = "blocklyHtmlInput blocklyHtmlTextAreaInput";
    c.setAttribute("spellcheck", this.spellcheck_);
    var d = this.getConstants().FIELD_TEXT_FONTSIZE * b + "pt";
    a.style.fontSize = d;
    c.style.fontSize = d;
    c.style.borderRadius = Blockly.FieldTextInput.BORDERRADIUS * b + "px";
    d = this.getConstants().FIELD_BORDER_RECT_X_PADDING * b;
    var e = this.getConstants().FIELD_BORDER_RECT_Y_PADDING *
        b / 2;
    c.style.padding = e + "px " + d + "px " + e + "px " + d + "px";
    d = this.getConstants().FIELD_TEXT_HEIGHT + this.getConstants().FIELD_BORDER_RECT_Y_PADDING;
    c.style.lineHeight = d * b + "px";
    a.appendChild(c);
    c.value = c.defaultValue = this.getEditorText_(this.value_);
    c.untypedDefaultValue_ = this.value_;
    c.oldValue_ = null;
    Blockly.utils.userAgent.GECKO ? setTimeout(this.resizeEditor_.bind(this), 0) : this.resizeEditor_();
    this.bindInputEvents_(c);
    return c
};
Blockly.FieldMultilineInput.prototype.onHtmlInputKeyDown_ = function(a) { a.keyCode !== Blockly.utils.KeyCodes.ENTER && Blockly.FieldMultilineInput.superClass_.onHtmlInputKeyDown_.call(this, a) };
Blockly.Css.register(".blocklyHtmlTextAreaInput {,font-family: monospace;,resize: none;,overflow: hidden;,height: 100%;,text-align: left;,}".split(","));
Blockly.fieldRegistry.register("field_multilinetext", Blockly.FieldMultilineInput);
Blockly.FieldNumber = function(a, b, c, d, e, f) {
    this.min_ = -Infinity;
    this.max_ = Infinity;
    this.precision_ = 0;
    this.decimalPlaces_ = null;
    Blockly.FieldNumber.superClass_.constructor.call(this, a || 0, e, f);
    f || this.setConstraints(b, c, d)
};
Blockly.utils.object.inherits(Blockly.FieldNumber, Blockly.FieldTextInput);
Blockly.FieldNumber.fromJson = function(a) { return new Blockly.FieldNumber(a.value, void 0, void 0, void 0, void 0, a) };
Blockly.FieldNumber.prototype.SERIALIZABLE = !0;
Blockly.FieldNumber.prototype.configure_ = function(a) {
    Blockly.FieldNumber.superClass_.configure_.call(this, a);
    this.setMinInternal_(a.min);
    this.setMaxInternal_(a.max);
    this.setPrecisionInternal_(a.precision)
};
Blockly.FieldNumber.prototype.setConstraints = function(a, b, c) {
    this.setMinInternal_(a);
    this.setMaxInternal_(b);
    this.setPrecisionInternal_(c);
    this.setValue(this.getValue())
};
Blockly.FieldNumber.prototype.setMin = function(a) {
    this.setMinInternal_(a);
    this.setValue(this.getValue())
};
Blockly.FieldNumber.prototype.setMinInternal_ = function(a) { null == a ? this.min_ = -Infinity : (a = Number(a), isNaN(a) || (this.min_ = a)) };
Blockly.FieldNumber.prototype.getMin = function() { return this.min_ };
Blockly.FieldNumber.prototype.setMax = function(a) {
    this.setMaxInternal_(a);
    this.setValue(this.getValue())
};
Blockly.FieldNumber.prototype.setMaxInternal_ = function(a) { null == a ? this.max_ = Infinity : (a = Number(a), isNaN(a) || (this.max_ = a)) };
Blockly.FieldNumber.prototype.getMax = function() { return this.max_ };
Blockly.FieldNumber.prototype.setPrecision = function(a) {
    this.setPrecisionInternal_(a);
    this.setValue(this.getValue())
};
Blockly.FieldNumber.prototype.setPrecisionInternal_ = function(a) {
    null == a ? this.precision_ = 0 : (a = Number(a), isNaN(a) || (this.precision_ = a));
    var b = this.precision_.toString(),
        c = b.indexOf(".");
    this.decimalPlaces_ = -1 == c ? a ? 0 : null : b.length - c - 1
};
Blockly.FieldNumber.prototype.getPrecision = function() { return this.precision_ };
Blockly.FieldNumber.prototype.doClassValidation_ = function(a) {
    if (null === a) return null;
    a = String(a);
    a = a.replace(/O/ig, "0");
    a = a.replace(/,/g, "");
    a = a.replace(/infinity/i, "Infinity");
    a = Number(a || 0);
    if (isNaN(a)) return null;
    a = Math.min(Math.max(a, this.min_), this.max_);
    this.precision_ && isFinite(a) && (a = Math.round(a / this.precision_) * this.precision_);
    null != this.decimalPlaces_ && (a = Number(a.toFixed(this.decimalPlaces_)));
    return a
};
Blockly.FieldNumber.prototype.widgetCreate_ = function() {
    var a = Blockly.FieldNumber.superClass_.widgetCreate_.call(this); - Infinity < this.min_ && Blockly.utils.aria.setState(a, Blockly.utils.aria.State.VALUEMIN, this.min_);
    Infinity > this.max_ && Blockly.utils.aria.setState(a, Blockly.utils.aria.State.VALUEMAX, this.max_);
    return a
};
Blockly.fieldRegistry.register("field_number", Blockly.FieldNumber);
Blockly.FieldVariable = function(a, b, c, d, e) {
    this.menuGenerator_ = Blockly.FieldVariable.dropdownCreate;
    this.defaultVariableName = a || "";
    this.size_ = new Blockly.utils.Size(0, 0);
    e && this.configure_(e);
    b && this.setValidator(b);
    e || this.setTypes_(c, d)
};
Blockly.utils.object.inherits(Blockly.FieldVariable, Blockly.FieldDropdown);
Blockly.FieldVariable.fromJson = function(a) { var b = Blockly.utils.replaceMessageReferences(a.variable); return new Blockly.FieldVariable(b, void 0, void 0, void 0, a) };
Blockly.FieldVariable.prototype.workspace_ = null;
Blockly.FieldVariable.prototype.SERIALIZABLE = !0;
Blockly.FieldVariable.prototype.configure_ = function(a) {
    Blockly.FieldVariable.superClass_.configure_.call(this, a);
    this.setTypes_(a.variableTypes, a.defaultType)
};
Blockly.FieldVariable.prototype.initModel = function() {
    if (!this.variable_) {
        var a = Blockly.Variables.getOrCreateVariablePackage(this.sourceBlock_.workspace, null, this.defaultVariableName, this.defaultType_);
        this.doValueUpdate_(a.getId())
    }
};
Blockly.FieldVariable.prototype.shouldAddBorderRect_ = function() { return Blockly.FieldVariable.superClass_.shouldAddBorderRect_.call(this) && (!this.getConstants().FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW || "variables_get" != this.sourceBlock_.type) };
Blockly.FieldVariable.prototype.fromXml = function(a) {
    var b = a.getAttribute("id"),
        c = a.textContent,
        d = a.getAttribute("variabletype") || a.getAttribute("variableType") || "";
    b = Blockly.Variables.getOrCreateVariablePackage(this.sourceBlock_.workspace, b, c, d);
    if (null != d && d !== b.type) throw Error("Serialized variable type with id '" + b.getId() + "' had type " + b.type + ", and does not match variable field that references it: " + Blockly.Xml.domToText(a) + ".");
    this.setValue(b.getId())
};
Blockly.FieldVariable.prototype.toXml = function(a) {
    this.initModel();
    a.id = this.variable_.getId();
    a.textContent = this.variable_.name;
    this.variable_.type && a.setAttribute("variabletype", this.variable_.type);
    return a
};
Blockly.FieldVariable.prototype.setSourceBlock = function(a) {
    if (a.isShadow()) throw Error("Variable fields are not allowed to exist on shadow blocks.");
    Blockly.FieldVariable.superClass_.setSourceBlock.call(this, a)
};
Blockly.FieldVariable.prototype.getValue = function() { return this.variable_ ? this.variable_.getId() : null };
Blockly.FieldVariable.prototype.getText = function() { return this.variable_ ? this.variable_.name : "" };
Blockly.FieldVariable.prototype.getVariable = function() { return this.variable_ };
Blockly.FieldVariable.prototype.getValidator = function() { return this.variable_ ? this.validator_ : null };
Blockly.FieldVariable.prototype.doClassValidation_ = function(a) {
    if (null === a) return null;
    var b = Blockly.Variables.getVariable(this.sourceBlock_.workspace, a);
    if (!b) return console.warn("Variable id doesn't point to a real variable! ID was " + a), null;
    b = b.type;
    return this.typeIsAllowed_(b) ? a : (console.warn("Variable type doesn't match this field!  Type was " + b), null)
};
Blockly.FieldVariable.prototype.doValueUpdate_ = function(a) {
    this.variable_ = Blockly.Variables.getVariable(this.sourceBlock_.workspace, a);
    Blockly.FieldVariable.superClass_.doValueUpdate_.call(this, a)
};
Blockly.FieldVariable.prototype.typeIsAllowed_ = function(a) {
    var b = this.getVariableTypes_();
    if (!b) return !0;
    for (var c = 0; c < b.length; c++)
        if (a == b[c]) return !0;
    return !1
};
Blockly.FieldVariable.prototype.getVariableTypes_ = function() {
    var a = this.variableTypes;
    if (null === a && this.sourceBlock_ && this.sourceBlock_.workspace) return this.sourceBlock_.workspace.getVariableTypes();
    a = a || [""];
    if (0 == a.length) throw a = this.getText(), Error("'variableTypes' of field variable " + a + " was an empty list");
    return a
};
Blockly.FieldVariable.prototype.setTypes_ = function(a, b) {
    b = b || "";
    if (null == a || void 0 == a) a = null;
    else if (Array.isArray(a)) { for (var c = !1, d = 0; d < a.length; d++) a[d] == b && (c = !0); if (!c) throw Error("Invalid default type '" + b + "' in the definition of a FieldVariable"); } else throw Error("'variableTypes' was not an array in the definition of a FieldVariable");
    this.defaultType_ = b;
    this.variableTypes = a
};
Blockly.FieldVariable.prototype.refreshVariableName = function() { this.forceRerender() };
Blockly.FieldVariable.dropdownCreate = function() {
    if (!this.variable_) throw Error("Tried to call dropdownCreate on a variable field with no variable selected.");
    var a = this.getText(),
        b = [];
    if (this.sourceBlock_ && this.sourceBlock_.workspace)
        for (var c = this.getVariableTypes_(), d = 0; d < c.length; d++) {
            var e = this.sourceBlock_.workspace.getVariablesOfType(c[d]);
            b = b.concat(e)
        }
    b.sort(Blockly.VariableModel.compareByName);
    c = [];
    for (d = 0; d < b.length; d++) c[d] = [b[d].name, b[d].getId()];
    c.push([Blockly.Msg.RENAME_VARIABLE, Blockly.RENAME_VARIABLE_ID]);
    Blockly.Msg.DELETE_VARIABLE && c.push([Blockly.Msg.DELETE_VARIABLE.replace("%1", a), Blockly.DELETE_VARIABLE_ID]);
    return c
};
Blockly.FieldVariable.prototype.onItemSelected_ = function(a, b) {
    a = b.getValue();
    if (this.sourceBlock_ && this.sourceBlock_.workspace) { if (a == Blockly.RENAME_VARIABLE_ID) { Blockly.Variables.renameVariable(this.sourceBlock_.workspace, this.variable_); return } if (a == Blockly.DELETE_VARIABLE_ID) { this.sourceBlock_.workspace.deleteVariableById(this.variable_.getId()); return } }
    this.setValue(a)
};
Blockly.FieldVariable.prototype.referencesVariables = function() { return !0 };
Blockly.fieldRegistry.register("field_variable", Blockly.FieldVariable);
Blockly.utils.svgPaths = {};
Blockly.utils.svgPaths.point = function(a, b) { return " " + a + "," + b + " " };
Blockly.utils.svgPaths.curve = function(a, b) { return " " + a + b.join("") };
Blockly.utils.svgPaths.moveTo = function(a, b) { return " M " + a + "," + b + " " };
Blockly.utils.svgPaths.moveBy = function(a, b) { return " m " + a + "," + b + " " };
Blockly.utils.svgPaths.lineTo = function(a, b) { return " l " + a + "," + b + " " };
Blockly.utils.svgPaths.line = function(a) { return " l" + a.join("") };
Blockly.utils.svgPaths.lineOnAxis = function(a, b) { return " " + a + " " + b + " " };
Blockly.utils.svgPaths.arc = function(a, b, c, d) { return a + " " + c + " " + c + " " + b + d };
Blockly.blockRendering.ConstantProvider = function() {
	this.NOTCH_WIDTH = 0;
	this.NOTCH_HEIGHT =0;
	this.CORNER_RADIUS = 10;

	this.TAB_HEIGHT =20;
    this.NO_PADDING = 0;
    this.SMALL_PADDING = 3;
    this.MEDIUM_PADDING = 5;
    this.MEDIUM_LARGE_PADDING = 8;
    this.LARGE_PADDING = 10;
    this.TALL_INPUT_FIELD_OFFSET_Y = this.MEDIUM_PADDING;
    this.TAB_OFFSET_FROM_TOP = 5;
    this.TAB_VERTICAL_OVERLAP = 2.5;
    this.TAB_WIDTH = 0;
    this.MIN_BLOCK_WIDTH = 12;
    this.EMPTY_BLOCK_SPACER_HEIGHT = 16;
    this.DUMMY_INPUT_SHADOW_MIN_HEIGHT = this.DUMMY_INPUT_MIN_HEIGHT = this.TAB_HEIGHT;
    this.STATEMENT_INPUT_NOTCH_OFFSET = this.NOTCH_OFFSET_LEFT = 15;
    this.STATEMENT_BOTTOM_SPACER = 0;
    this.STATEMENT_INPUT_PADDING_LEFT = 20;
    this.BETWEEN_STATEMENT_PADDING_Y = 4;
    this.TOP_ROW_MIN_HEIGHT = this.MEDIUM_PADDING;
    this.TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT = this.LARGE_PADDING;
    this.BOTTOM_ROW_MIN_HEIGHT = this.MEDIUM_PADDING;
    this.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT = this.LARGE_PADDING;
    this.ADD_START_HATS = 1;
    this.START_HAT_HEIGHT = 15;
    this.START_HAT_WIDTH = 100;
    this.SPACER_DEFAULT_HEIGHT = 20;
    this.MIN_BLOCK_HEIGHT =24;
    this.EMPTY_INLINE_INPUT_PADDING = 0;
    this.EMPTY_INLINE_INPUT_HEIGHT = this.TAB_HEIGHT ;
    this.EXTERNAL_VALUE_INPUT_PADDING = 2;
    this.EMPTY_STATEMENT_INPUT_HEIGHT = this.MIN_BLOCK_HEIGHT;
    this.START_POINT = Blockly.utils.svgPaths.moveBy(0, 0);
    this.JAGGED_TEETH_HEIGHT = 12;
    this.JAGGED_TEETH_WIDTH = 6;
    this.FIELD_TEXT_FONTSIZE = 11;
    this.FIELD_TEXT_FONTWEIGHT = "normal";
    this.FIELD_TEXT_FONTFAMILY = "sans-serif";
    this.FIELD_TEXT_BASELINE = this.FIELD_TEXT_HEIGHT = -1;
    this.FIELD_BORDER_RECT_RADIUS = 4;
    this.FIELD_BORDER_RECT_HEIGHT =
        16;
    this.FIELD_BORDER_RECT_X_PADDING = 5;
    this.FIELD_BORDER_RECT_Y_PADDING = 3;
    this.FIELD_BORDER_RECT_COLOUR = "#fff";
    this.FIELD_TEXT_BASELINE_CENTER = !Blockly.utils.userAgent.IE && !Blockly.utils.userAgent.EDGE;
    this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = this.FIELD_BORDER_RECT_HEIGHT;
    this.FIELD_DROPDOWN_SVG_ARROW = this.FIELD_DROPDOWN_COLOURED_DIV = this.FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW = !1;
    this.FIELD_DROPDOWN_SVG_ARROW_PADDING = this.FIELD_BORDER_RECT_X_PADDING;
    this.FIELD_DROPDOWN_SVG_ARROW_SIZE = 12;
    this.FIELD_DROPDOWN_SVG_ARROW_DATAURI =
        "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43MSIgaGVpZ2h0PSI4Ljc5IiB2aWV3Qm94PSIwIDAgMTIuNzEgOC43OSI+PHRpdGxlPmRyb3Bkb3duLWFycm93PC90aXRsZT48ZyBvcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0xMi43MSwyLjQ0QTIuNDEsMi40MSwwLDAsMSwxMiw0LjE2TDguMDgsOC4wOGEyLjQ1LDIuNDUsMCwwLDEtMy40NSwwTDAuNzIsNC4xNkEyLjQyLDIuNDIsMCwwLDEsMCwyLjQ0LDIuNDgsMi40OCwwLDAsMSwuNzEuNzFDMSwwLjQ3LDEuNDMsMCw2LjM2LDBTMTEuNzUsMC40NiwxMiwuNzFBMi40NCwyLjQ0LDAsMCwxLDEyLjcxLDIuNDRaIiBmaWxsPSIjMjMxZjIwIi8+PC9nPjxwYXRoIGQ9Ik02LjM2LDcuNzlhMS40MywxLjQzLDAsMCwxLTEtLjQyTDEuNDIsMy40NWExLjQ0LDEuNDQsMCwwLDEsMC0yYzAuNTYtLjU2LDkuMzEtMC41Niw5Ljg3LDBhMS40NCwxLjQ0LDAsMCwxLDAsMkw3LjM3LDcuMzdBMS40MywxLjQzLDAsMCwxLDYuMzYsNy43OVoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=";
    this.FIELD_COLOUR_FULL_BLOCK = this.FIELD_TEXTINPUT_BOX_SHADOW = !1;
    this.FIELD_COLOUR_DEFAULT_WIDTH = 26;
    this.FIELD_COLOUR_DEFAULT_HEIGHT = this.FIELD_BORDER_RECT_HEIGHT;
    this.FIELD_CHECKBOX_X_OFFSET = this.FIELD_BORDER_RECT_X_PADDING - 3;
    this.randomIdentifier = String(Math.random()).substring(2);
    this.embossFilterId = "";
    this.embossFilter_ = null;
    this.disabledPatternId = "";
    this.disabledPattern_ = null;
    this.debugFilterId = "";
    this.cssNode_ = this.debugFilter_ = null;
    this.CURSOR_COLOUR = "#cc0a0a";
    this.MARKER_COLOUR = "#4286f4";
    this.CURSOR_WS_WIDTH =
        100;
    this.WS_CURSOR_HEIGHT = 5;
    this.CURSOR_STACK_PADDING = 10;
    this.CURSOR_BLOCK_PADDING = 2;
    this.CURSOR_STROKE_WIDTH = 4;
    this.FULL_BLOCK_FIELDS = !1;
    this.INSERTION_MARKER_COLOUR = "#000000";
    this.INSERTION_MARKER_OPACITY = .2;
    this.SHAPES = { PUZZLE: 1, NOTCH: 2 }
};
Blockly.blockRendering.ConstantProvider.prototype.init = function() {
    this.JAGGED_TEETH = this.makeJaggedTeeth();
    this.NOTCH = this.makeNotch();
    this.START_HAT = this.makeStartHat();
    this.PUZZLE_TAB = this.makePuzzleTab();
    this.INSIDE_CORNERS = this.makeInsideCorners();
    this.OUTSIDE_CORNERS = this.makeOutsideCorners()
};
Blockly.blockRendering.ConstantProvider.prototype.setTheme = function(a) {
    this.blockStyles = {};
    var b = a.blockStyles,
        c;
    for (c in b) this.blockStyles[c] = this.validatedBlockStyle_(b[c]);
    this.setDynamicProperties_(a)
};
Blockly.blockRendering.ConstantProvider.prototype.setDynamicProperties_ = function(a) {
    this.setFontConstants_(a);
    this.setComponentConstants_(a);
    this.ADD_START_HATS = null != a.startHats ? a.startHats : this.ADD_START_HATS
};
Blockly.blockRendering.ConstantProvider.prototype.setFontConstants_ = function(a) {
    this.FIELD_TEXT_FONTFAMILY = a.fontStyle && void 0 != a.fontStyle.family ? a.fontStyle.family : this.FIELD_TEXT_FONTFAMILY;
    this.FIELD_TEXT_FONTWEIGHT = a.fontStyle && void 0 != a.fontStyle.weight ? a.fontStyle.weight : this.FIELD_TEXT_FONTWEIGHT;
    this.FIELD_TEXT_FONTSIZE = a.fontStyle && void 0 != a.fontStyle.size ? a.fontStyle.size : this.FIELD_TEXT_FONTSIZE;
    a = Blockly.utils.dom.measureFontMetrics("Hg", this.FIELD_TEXT_FONTSIZE + "pt", this.FIELD_TEXT_FONTWEIGHT,
        this.FIELD_TEXT_FONTFAMILY);
    this.FIELD_TEXT_HEIGHT = a.height;
    this.FIELD_TEXT_BASELINE = a.baseline
};
Blockly.blockRendering.ConstantProvider.prototype.setComponentConstants_ = function(a) {
    this.CURSOR_COLOUR = a.getComponentStyle("cursorColour") || this.CURSOR_COLOUR;
    this.MARKER_COLOUR = a.getComponentStyle("markerColour") || this.MARKER_COLOUR;
    this.INSERTION_MARKER_COLOUR = a.getComponentStyle("insertionMarkerColour") || this.INSERTION_MARKER_COLOUR;
    this.INSERTION_MARKER_OPACITY = Number(a.getComponentStyle("insertionMarkerOpacity")) || this.INSERTION_MARKER_OPACITY
};
Blockly.blockRendering.ConstantProvider.prototype.getBlockStyleForColour = function(a) {
    var b = "auto_" + a;
    this.blockStyles[b] || (this.blockStyles[b] = this.createBlockStyle_(a));
    return { style: this.blockStyles[b], name: b }
};
Blockly.blockRendering.ConstantProvider.prototype.getBlockStyle = function(a) { return this.blockStyles[a || ""] || (a && 0 == a.indexOf("auto_") ? this.getBlockStyleForColour(a.substring(5)).style : this.createBlockStyle_("#000000")) };
Blockly.blockRendering.ConstantProvider.prototype.createBlockStyle_ = function(a) { return this.validatedBlockStyle_({ colourPrimary: a }) };
Blockly.blockRendering.ConstantProvider.prototype.validatedBlockStyle_ = function(a) {
    var b = {};
    a && Blockly.utils.object.mixin(b, a);
    a = Blockly.utils.parseBlockColour(b.colourPrimary || "#000");
    b.colourPrimary = a.hex;
    b.colourSecondary = b.colourSecondary ? Blockly.utils.parseBlockColour(b.colourSecondary).hex : this.generateSecondaryColour_(b.colourPrimary);
    b.colourTertiary = b.colourTertiary ? Blockly.utils.parseBlockColour(b.colourTertiary).hex : this.generateTertiaryColour_(b.colourPrimary);
    b.hat = b.hat || "";
    return b
};
Blockly.blockRendering.ConstantProvider.prototype.generateSecondaryColour_ = function(a) { return Blockly.utils.colour.blend("#fff", a, .6) || a };
Blockly.blockRendering.ConstantProvider.prototype.generateTertiaryColour_ = function(a) { return Blockly.utils.colour.blend("#fff", a, .3) || a };
Blockly.blockRendering.ConstantProvider.prototype.dispose = function() {
    this.embossFilter_ && Blockly.utils.dom.removeNode(this.embossFilter_);
    this.disabledPattern_ && Blockly.utils.dom.removeNode(this.disabledPattern_);
    this.debugFilter_ && Blockly.utils.dom.removeNode(this.debugFilter_);
    this.cssNode_ = null
};
Blockly.blockRendering.ConstantProvider.prototype.makeJaggedTeeth = function() {
    var a = this.JAGGED_TEETH_HEIGHT,
        b = this.JAGGED_TEETH_WIDTH,
        c = Blockly.utils.svgPaths.line([Blockly.utils.svgPaths.point(b, a / 4), Blockly.utils.svgPaths.point(2 * -b, a / 2), Blockly.utils.svgPaths.point(b, a / 4)]);
    return { height: a, width: b, path: c }
};
Blockly.blockRendering.ConstantProvider.prototype.makeStartHat = function() {
    var a = this.START_HAT_HEIGHT,
        b = this.START_HAT_WIDTH,
        c = Blockly.utils.svgPaths.curve("c", [Blockly.utils.svgPaths.point(30, -a), Blockly.utils.svgPaths.point(70, -a), Blockly.utils.svgPaths.point(b, 0)]);
    return { height: a, width: b, path: c }
};
Blockly.blockRendering.ConstantProvider.prototype.makePuzzleTab = function() {
    function a(a) {
        a = a ? -1 : 1;
        var d = -a,
            e = c / 2,
            f = e + 2.5,
            l = e + .5,
            m = Blockly.utils.svgPaths.point(-b, a * e);
        e = Blockly.utils.svgPaths.point(b, a * e);
        return Blockly.utils.svgPaths.curve("c", [Blockly.utils.svgPaths.point(0, a * f), Blockly.utils.svgPaths.point(-b, d * l), m]) + Blockly.utils.svgPaths.curve("s", [Blockly.utils.svgPaths.point(b, 2.5 * d), e])
    }
    var b = this.TAB_WIDTH,
        c = this.TAB_HEIGHT,
        d = a(!0),
        e = a(!1);
    return {
        type: this.SHAPES.PUZZLE,
        width: b,
        height: c,
        pathDown: e,
        pathUp: d
    }
};
Blockly.blockRendering.ConstantProvider.prototype.makeNotch = function() {
    function a(a) { return Blockly.utils.svgPaths.line([Blockly.utils.svgPaths.point(a * d, c), Blockly.utils.svgPaths.point(3 * a, 0), Blockly.utils.svgPaths.point(a * d, -c)]) }
    var b = this.NOTCH_WIDTH,
        c = this.NOTCH_HEIGHT,
        d = (b - 3) / 2,
        e = a(1),
        f = a(-1);
    return { type: this.SHAPES.NOTCH, width: b, height: c, pathLeft: e, pathRight: f }
};
Blockly.blockRendering.ConstantProvider.prototype.makeInsideCorners = function() {
    var a = this.CORNER_RADIUS,
        b = Blockly.utils.svgPaths.arc("a", "0 0,0", a, Blockly.utils.svgPaths.point(-a, a)),
        c = Blockly.utils.svgPaths.arc("a", "0 0,0", a, Blockly.utils.svgPaths.point(a, a));
    return { width: a, height: a, pathTop: b, pathBottom: c }
};
Blockly.blockRendering.ConstantProvider.prototype.makeOutsideCorners = function() {
    var a = this.CORNER_RADIUS,
        b = Blockly.utils.svgPaths.moveBy(0, a) + Blockly.utils.svgPaths.arc("a", "0 0,1", a, Blockly.utils.svgPaths.point(a, -a)),
        c = Blockly.utils.svgPaths.arc("a", "0 0,1", a, Blockly.utils.svgPaths.point(a, a)),
        d = Blockly.utils.svgPaths.arc("a", "0 0,1", a, Blockly.utils.svgPaths.point(-a, -a)),
        e = Blockly.utils.svgPaths.arc("a", "0 0,1", a, Blockly.utils.svgPaths.point(-a, a));
    return {
        topLeft: b,
        topRight: c,
        bottomRight: e,
        bottomLeft: d,
        rightHeight: a
    }
};
Blockly.blockRendering.ConstantProvider.prototype.shapeFor = function(a) {
    switch (a.type) {
        case Blockly.INPUT_VALUE:
        case Blockly.OUTPUT_VALUE:
            return this.PUZZLE_TAB;
        case Blockly.PREVIOUS_STATEMENT:
        case Blockly.NEXT_STATEMENT:
            return this.NOTCH;
        default:
            throw Error("Unknown connection type");
    }
};
Blockly.blockRendering.ConstantProvider.prototype.createDom = function(a, b, c) {
    this.injectCSS_(b, c);
    a = Blockly.utils.dom.createSvgElement("defs", {}, a);
    b = Blockly.utils.dom.createSvgElement("filter", { id: "blocklyEmbossFilter" + this.randomIdentifier }, a);
    Blockly.utils.dom.createSvgElement("feGaussianBlur", { "in": "SourceAlpha", stdDeviation: 1, result: "blur" }, b);
    c = Blockly.utils.dom.createSvgElement("feSpecularLighting", {
        "in": "blur",
        surfaceScale: 1,
        specularConstant: .5,
        specularExponent: 10,
        "lighting-color": "white",
        result: "specOut"
    }, b);
    Blockly.utils.dom.createSvgElement("fePointLight", { x: -5E3, y: -1E4, z: 2E4 }, c);
    Blockly.utils.dom.createSvgElement("feComposite", { "in": "specOut", in2: "SourceAlpha", operator: "in", result: "specOut" }, b);
    Blockly.utils.dom.createSvgElement("feComposite", { "in": "SourceGraphic", in2: "specOut", operator: "arithmetic", k1: 0, k2: 1, k3: 1, k4: 0 }, b);
    this.embossFilterId = b.id;
    this.embossFilter_ = b;
    b = Blockly.utils.dom.createSvgElement("pattern", {
        id: "blocklyDisabledPattern" + this.randomIdentifier,
        patternUnits: "userSpaceOnUse",
        width: 10,
        height: 10
    }, a);
    Blockly.utils.dom.createSvgElement("rect", { width: 10, height: 10, fill: "#aaa" }, b);
    Blockly.utils.dom.createSvgElement("path", { d: "M 0 0 L 10 10 M 10 0 L 0 10", stroke: "#cc0" }, b);
    this.disabledPatternId = b.id;
    this.disabledPattern_ = b;
    Blockly.blockRendering.Debug && (a = Blockly.utils.dom.createSvgElement("filter", { id: "blocklyDebugFilter" + this.randomIdentifier, height: "160%", width: "180%", y: "-30%", x: "-40%" }, a), b = Blockly.utils.dom.createSvgElement("feComponentTransfer", { result: "outBlur" }, a), Blockly.utils.dom.createSvgElement("feFuncA", { type: "table", tableValues: "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1" }, b), Blockly.utils.dom.createSvgElement("feFlood", { "flood-color": "#ff0000", "flood-opacity": .5, result: "outColor" }, a), Blockly.utils.dom.createSvgElement("feComposite", { "in": "outColor", in2: "outBlur", operator: "in", result: "outGlow" }, a), this.debugFilterId = a.id, this.debugFilter_ = a)
};
Blockly.blockRendering.ConstantProvider.prototype.injectCSS_ = function(a, b) {
    b = this.getCSS_(b);
    a = "blockly-renderer-style-" + a;
    this.cssNode_ = document.getElementById(a);
    var c = b.join("\n");
    this.cssNode_ ? this.cssNode_.firstChild.textContent = c : (b = document.createElement("style"), b.id = a, a = document.createTextNode(c), b.appendChild(a), document.head.insertBefore(b, document.head.firstChild), this.cssNode_ = b)
};
Blockly.blockRendering.ConstantProvider.prototype.getCSS_ = function(a) {
    return [a + " .blocklyText, ", a + " .blocklyFlyoutLabelText {", "font-family: " + this.FIELD_TEXT_FONTFAMILY + ";", "font-size: " + this.FIELD_TEXT_FONTSIZE + "pt;", "font-weight: " + this.FIELD_TEXT_FONTWEIGHT + ";", "}", a + " .blocklyText {", "fill: #fff;", "}", a + " .blocklyNonEditableText>rect,", a + " .blocklyEditableText>rect {", "fill: " + this.FIELD_BORDER_RECT_COLOUR + ";", "fill-opacity: .6;", "stroke: none;", "}", a + " .blocklyNonEditableText>text,", a + " .blocklyEditableText>text {",
        "fill: #000;", "}", a + " .blocklyFlyoutLabelText {", "fill: #000;", "}", a + " .blocklyText.blocklyBubbleText {", "fill: #000;", "}", a + " .blocklyEditableText:not(.editing):hover>rect {", "stroke: #fff;", "stroke-width: 2;", "}", a + " .blocklyHtmlInput {", "font-family: " + this.FIELD_TEXT_FONTFAMILY + ";", "font-weight: " + this.FIELD_TEXT_FONTWEIGHT + ";", "}", a + " .blocklySelected>.blocklyPath {", "stroke: #fc3;", "stroke-width: 3px;", "}", a + " .blocklyHighlightedConnectionPath {", "stroke: #fc3;", "}", a + " .blocklyReplaceable .blocklyPath {",
        "fill-opacity: .5;", "}", a + " .blocklyReplaceable .blocklyPathLight,", a + " .blocklyReplaceable .blocklyPathDark {", "display: none;", "}", a + " .blocklyInsertionMarker>.blocklyPath {", "fill-opacity: " + this.INSERTION_MARKER_OPACITY + ";", "stroke: none", "}"
    ]
};
Blockly.blockRendering.MarkerSvg = function(a, b, c) {
    this.workspace_ = a;
    this.marker_ = c;
    this.parent_ = null;
    this.constants_ = b;
    this.currentMarkerSvg = null;
    a = this.isCursor() ? this.constants_.CURSOR_COLOUR : this.constants_.MARKER_COLOUR;
    this.colour_ = c.colour || a
};
Blockly.blockRendering.MarkerSvg.CURSOR_CLASS = "blocklyCursor";
Blockly.blockRendering.MarkerSvg.MARKER_CLASS = "blocklyMarker";
Blockly.blockRendering.MarkerSvg.HEIGHT_MULTIPLIER = .75;
Blockly.blockRendering.MarkerSvg.prototype.getSvgRoot = function() { return this.svgGroup_ };
Blockly.blockRendering.MarkerSvg.prototype.isCursor = function() { return "cursor" == this.marker_.type };
Blockly.blockRendering.MarkerSvg.prototype.createDom = function() {
    var a = this.isCursor() ? Blockly.blockRendering.MarkerSvg.CURSOR_CLASS : Blockly.blockRendering.MarkerSvg.MARKER_CLASS;
    this.svgGroup_ = Blockly.utils.dom.createSvgElement("g", { "class": a }, null);
    this.createDomInternal_();
    this.applyColour_();
    return this.svgGroup_
};
Blockly.blockRendering.MarkerSvg.prototype.setParent_ = function(a) {
    this.isCursor() ? (this.parent_ && this.parent_.setCursorSvg(null), a.setCursorSvg(this.getSvgRoot())) : (this.parent_ && this.parent_.setMarkerSvg(null), a.setMarkerSvg(this.getSvgRoot()));
    this.parent_ = a
};
Blockly.blockRendering.MarkerSvg.prototype.showWithBlockPrevOutput_ = function(a) {
    if (a) {
        var b = a.width,
            c = a.height,
            d = c * Blockly.blockRendering.MarkerSvg.HEIGHT_MULTIPLIER,
            e = this.constants_.CURSOR_BLOCK_PADDING;
        if (a.previousConnection) {
            var f = this.constants_.shapeFor(a.previousConnection);
            this.positionPrevious_(b, e, d, f)
        } else a.outputConnection ? (f = this.constants_.shapeFor(a.outputConnection), this.positionOutput_(b, c, f)) : this.positionBlock_(b, e, d);
        this.setParent_(a);
        this.showCurrent_()
    }
};
Blockly.blockRendering.MarkerSvg.prototype.showWithCoordinates_ = function(a) {
    var b = a.getWsCoordinate();
    a = b.x;
    b = b.y;
    this.workspace_.RTL && (a -= this.constants_.CURSOR_WS_WIDTH);
    this.positionLine_(a, b, this.constants_.CURSOR_WS_WIDTH);
    this.setParent_(this.workspace_);
    this.showCurrent_()
};
Blockly.blockRendering.MarkerSvg.prototype.showWithField_ = function(a) {
    a = a.getLocation();
    var b = a.getSize().width,
        c = a.getSize().height;
    this.positionRect_(0, 0, b, c);
    this.setParent_(a);
    this.showCurrent_()
};
Blockly.blockRendering.MarkerSvg.prototype.showWithInput_ = function(a) {
    a = a.getLocation();
    var b = a.getSourceBlock();
    this.positionInput_(a);
    this.setParent_(b);
    this.showCurrent_()
};
Blockly.blockRendering.MarkerSvg.prototype.showWithNext_ = function(a) {
    var b = a.getLocation();
    a = b.getSourceBlock();
    var c = 0;
    b = b.getOffsetInBlock().y;
    var d = a.getHeightWidth().width;
    this.workspace_.RTL && (c = -d);
    this.positionLine_(c, b, d);
    this.setParent_(a);
    this.showCurrent_()
};
Blockly.blockRendering.MarkerSvg.prototype.showWithStack_ = function(a) {
    a = a.getLocation();
    var b = a.getHeightWidth(),
        c = b.width + this.constants_.CURSOR_STACK_PADDING;
    b = b.height + this.constants_.CURSOR_STACK_PADDING;
    var d = -this.constants_.CURSOR_STACK_PADDING / 2,
        e = -this.constants_.CURSOR_STACK_PADDING / 2,
        f = d;
    this.workspace_.RTL && (f = -(c + d));
    this.positionRect_(f, e, c, b);
    this.setParent_(a);
    this.showCurrent_()
};
Blockly.blockRendering.MarkerSvg.prototype.showCurrent_ = function() {
    this.hide();
    this.currentMarkerSvg.style.display = ""
};
Blockly.blockRendering.MarkerSvg.prototype.positionBlock_ = function(a, b, c) {
    a = Blockly.utils.svgPaths.moveBy(-b, c) + Blockly.utils.svgPaths.lineOnAxis("V", -b) + Blockly.utils.svgPaths.lineOnAxis("H", a + 2 * b) + Blockly.utils.svgPaths.lineOnAxis("V", c);
    this.markerBlock_.setAttribute("d", a);
    this.workspace_.RTL && this.flipRtl_(this.markerBlock_);
    this.currentMarkerSvg = this.markerBlock_
};
Blockly.blockRendering.MarkerSvg.prototype.positionInput_ = function(a) {
    var b = a.getOffsetInBlock().x,
        c = a.getOffsetInBlock().y;
    a = Blockly.utils.svgPaths.moveTo(0, 0) + this.constants_.shapeFor(a).pathDown;
    this.markerInput_.setAttribute("d", a);
    this.markerInput_.setAttribute("transform", "translate(" + b + "," + c + ")" + (this.workspace_.RTL ? " scale(-1 1)" : ""));
    this.currentMarkerSvg = this.markerInput_
};
Blockly.blockRendering.MarkerSvg.prototype.positionLine_ = function(a, b, c) {
    this.markerSvgLine_.setAttribute("x", a);
    this.markerSvgLine_.setAttribute("y", b);
    this.markerSvgLine_.setAttribute("width", c);
    this.currentMarkerSvg = this.markerSvgLine_
};
Blockly.blockRendering.MarkerSvg.prototype.positionOutput_ = function(a, b, c) {
    a = Blockly.utils.svgPaths.moveBy(a, 0) + Blockly.utils.svgPaths.lineOnAxis("h", -(a - c.width)) + Blockly.utils.svgPaths.lineOnAxis("v", this.constants_.TAB_OFFSET_FROM_TOP) + c.pathDown + Blockly.utils.svgPaths.lineOnAxis("V", b) + Blockly.utils.svgPaths.lineOnAxis("H", a);
    this.markerBlock_.setAttribute("d", a);
    this.workspace_.RTL && this.flipRtl_(this.markerBlock_);
    this.currentMarkerSvg = this.markerBlock_
};
Blockly.blockRendering.MarkerSvg.prototype.positionPrevious_ = function(a, b, c, d) {
    a = Blockly.utils.svgPaths.moveBy(-b, c) + Blockly.utils.svgPaths.lineOnAxis("V", -b) + Blockly.utils.svgPaths.lineOnAxis("H", this.constants_.NOTCH_OFFSET_LEFT) + d.pathLeft + Blockly.utils.svgPaths.lineOnAxis("H", a + 2 * b) + Blockly.utils.svgPaths.lineOnAxis("V", c);
    this.markerBlock_.setAttribute("d", a);
    this.workspace_.RTL && this.flipRtl_(this.markerBlock_);
    this.currentMarkerSvg = this.markerBlock_
};
Blockly.blockRendering.MarkerSvg.prototype.positionRect_ = function(a, b, c, d) {
    this.markerSvgRect_.setAttribute("x", a);
    this.markerSvgRect_.setAttribute("y", b);
    this.markerSvgRect_.setAttribute("width", c);
    this.markerSvgRect_.setAttribute("height", d);
    this.currentMarkerSvg = this.markerSvgRect_
};
Blockly.blockRendering.MarkerSvg.prototype.flipRtl_ = function(a) { a.setAttribute("transform", "scale(-1 1)") };
Blockly.blockRendering.MarkerSvg.prototype.hide = function() {
    this.markerSvgLine_.style.display = "none";
    this.markerSvgRect_.style.display = "none";
    this.markerInput_.style.display = "none";
    this.markerBlock_.style.display = "none"
};
Blockly.blockRendering.MarkerSvg.prototype.draw = function(a, b) {
    if (b) {
        this.constants_ = this.workspace_.getRenderer().getConstants();
        var c = this.isCursor() ? this.constants_.CURSOR_COLOUR : this.constants_.MARKER_COLOUR;
        this.colour_ = this.marker_.colour || c;
        this.applyColour_();
        this.showAtLocation_(b);
        this.firemarkerEvent_(a, b);
        a = this.currentMarkerSvg.childNodes[0];
        void 0 !== a && a.beginElement && a.beginElement()
    } else this.hide()
};
Blockly.blockRendering.MarkerSvg.prototype.showAtLocation_ = function(a) {
    a.getType() == Blockly.ASTNode.types.BLOCK ? (a = a.getLocation(), this.showWithBlockPrevOutput_(a)) : a.getType() == Blockly.ASTNode.types.OUTPUT ? (a = a.getLocation().getSourceBlock(), this.showWithBlockPrevOutput_(a)) : a.getLocation().type == Blockly.INPUT_VALUE ? this.showWithInput_(a) : a.getLocation().type == Blockly.NEXT_STATEMENT ? this.showWithNext_(a) : a.getType() == Blockly.ASTNode.types.PREVIOUS ? (a = a.getLocation().getSourceBlock(), this.showWithBlockPrevOutput_(a)) :
        a.getType() == Blockly.ASTNode.types.FIELD ? this.showWithField_(a) : a.getType() == Blockly.ASTNode.types.WORKSPACE ? this.showWithCoordinates_(a) : a.getType() == Blockly.ASTNode.types.STACK && this.showWithStack_(a)
};
Blockly.blockRendering.MarkerSvg.prototype.firemarkerEvent_ = function(a, b) {
    var c = b.getSourceBlock(),
        d = this.isCursor() ? "cursorMove" : "markerMove";
    a = new Blockly.Events.Ui(c, d, a, b);
    b.getType() == Blockly.ASTNode.types.WORKSPACE && (a.workspaceId = b.getLocation().id);
    Blockly.Events.fire(a)
};
Blockly.blockRendering.MarkerSvg.prototype.getBlinkProperties_ = function() { return { attributeType: "XML", attributeName: "fill", dur: "1s", values: this.colour_ + ";transparent;transparent;", repeatCount: "indefinite" } };
Blockly.blockRendering.MarkerSvg.prototype.createDomInternal_ = function() {
    this.markerSvg_ = Blockly.utils.dom.createSvgElement("g", { width: this.constants_.CURSOR_WS_WIDTH, height: this.constants_.WS_CURSOR_HEIGHT }, this.svgGroup_);
    this.markerSvgLine_ = Blockly.utils.dom.createSvgElement("rect", { width: this.constants_.CURSOR_WS_WIDTH, height: this.constants_.WS_CURSOR_HEIGHT, style: "display: none" }, this.markerSvg_);
    this.markerSvgRect_ = Blockly.utils.dom.createSvgElement("rect", {
        "class": "blocklyVerticalMarker",
        rx: 10,
        ry: 10,
        style: "display: none"
    }, this.markerSvg_);
    this.markerInput_ = Blockly.utils.dom.createSvgElement("path", { transform: "", style: "display: none" }, this.markerSvg_);
    this.markerBlock_ = Blockly.utils.dom.createSvgElement("path", { transform: "", style: "display: none", fill: "none", "stroke-width": this.constants_.CURSOR_STROKE_WIDTH }, this.markerSvg_);
    if (this.isCursor()) {
        var a = this.getBlinkProperties_();
        Blockly.utils.dom.createSvgElement("animate", a, this.markerSvgLine_);
        Blockly.utils.dom.createSvgElement("animate",
            a, this.markerInput_);
        a.attributeName = "stroke";
        Blockly.utils.dom.createSvgElement("animate", a, this.markerBlock_)
    }
    return this.markerSvg_
};
Blockly.blockRendering.MarkerSvg.prototype.applyColour_ = function() {
    this.markerSvgLine_.setAttribute("fill", this.colour_);
    this.markerSvgRect_.setAttribute("stroke", this.colour_);
    this.markerInput_.setAttribute("fill", this.colour_);
    this.markerBlock_.setAttribute("stroke", this.colour_);
    if (this.isCursor()) {
        var a = this.colour_ + ";transparent;transparent;";
        this.markerSvgLine_.firstChild.setAttribute("values", a);
        this.markerInput_.firstChild.setAttribute("values", a);
        this.markerBlock_.firstChild.setAttribute("values",
            a)
    }
};
Blockly.blockRendering.MarkerSvg.prototype.dispose = function() { this.svgGroup_ && Blockly.utils.dom.removeNode(this.svgGroup_) };
Blockly.blockRendering.Types = { NONE: 0, FIELD: 1, HAT: 2, ICON: 4, SPACER: 8, BETWEEN_ROW_SPACER: 16, IN_ROW_SPACER: 32, EXTERNAL_VALUE_INPUT: 64, INPUT: 128, INLINE_INPUT: 256, STATEMENT_INPUT: 512, CONNECTION: 1024, PREVIOUS_CONNECTION: 2048, NEXT_CONNECTION: 4096, OUTPUT_CONNECTION: 8192, CORNER: 16384, LEFT_SQUARE_CORNER: 32768, LEFT_ROUND_CORNER: 65536, RIGHT_SQUARE_CORNER: 131072, RIGHT_ROUND_CORNER: 262144, JAGGED_EDGE: 524288, ROW: 1048576, TOP_ROW: 2097152, BOTTOM_ROW: 4194304, INPUT_ROW: 8388608 };
Blockly.blockRendering.Types.LEFT_CORNER = Blockly.blockRendering.Types.LEFT_SQUARE_CORNER | Blockly.blockRendering.Types.LEFT_ROUND_CORNER;
Blockly.blockRendering.Types.RIGHT_CORNER = Blockly.blockRendering.Types.RIGHT_SQUARE_CORNER | Blockly.blockRendering.Types.RIGHT_ROUND_CORNER;
Blockly.blockRendering.Types.nextTypeValue_ = 16777216;
Blockly.blockRendering.Types.getType = function(a) { Blockly.blockRendering.Types.hasOwnProperty(a) || (Blockly.blockRendering.Types[a] = Blockly.blockRendering.Types.nextTypeValue_, Blockly.blockRendering.Types.nextTypeValue_ <<= 1); return Blockly.blockRendering.Types[a] };
Blockly.blockRendering.Types.isField = function(a) { return a.type & Blockly.blockRendering.Types.FIELD };
Blockly.blockRendering.Types.isHat = function(a) { return a.type & Blockly.blockRendering.Types.HAT };
Blockly.blockRendering.Types.isIcon = function(a) { return a.type & Blockly.blockRendering.Types.ICON };
Blockly.blockRendering.Types.isSpacer = function(a) { return a.type & Blockly.blockRendering.Types.SPACER };
Blockly.blockRendering.Types.isInRowSpacer = function(a) { return a.type & Blockly.blockRendering.Types.IN_ROW_SPACER };
Blockly.blockRendering.Types.isInput = function(a) { return a.type & Blockly.blockRendering.Types.INPUT };
Blockly.blockRendering.Types.isExternalInput = function(a) { return a.type & Blockly.blockRendering.Types.EXTERNAL_VALUE_INPUT };
Blockly.blockRendering.Types.isInlineInput = function(a) { return a.type & Blockly.blockRendering.Types.INLINE_INPUT };
Blockly.blockRendering.Types.isStatementInput = function(a) { return a.type & Blockly.blockRendering.Types.STATEMENT_INPUT };
Blockly.blockRendering.Types.isPreviousConnection = function(a) { return a.type & Blockly.blockRendering.Types.PREVIOUS_CONNECTION };
Blockly.blockRendering.Types.isNextConnection = function(a) { return a.type & Blockly.blockRendering.Types.NEXT_CONNECTION };
Blockly.blockRendering.Types.isPreviousOrNextConnection = function(a) { return a.type & (Blockly.blockRendering.Types.PREVIOUS_CONNECTION | Blockly.blockRendering.Types.NEXT_CONNECTION) };
Blockly.blockRendering.Types.isLeftRoundedCorner = function(a) { return a.type & Blockly.blockRendering.Types.LEFT_ROUND_CORNER };
Blockly.blockRendering.Types.isRightRoundedCorner = function(a) { return a.type & Blockly.blockRendering.Types.RIGHT_ROUND_CORNER };
Blockly.blockRendering.Types.isLeftSquareCorner = function(a) { return a.type & Blockly.blockRendering.Types.LEFT_SQUARE_CORNER };
Blockly.blockRendering.Types.isRightSquareCorner = function(a) { return a.type & Blockly.blockRendering.Types.RIGHT_SQUARE_CORNER };
Blockly.blockRendering.Types.isCorner = function(a) { return a.type & Blockly.blockRendering.Types.CORNER };
Blockly.blockRendering.Types.isJaggedEdge = function(a) { return a.type & Blockly.blockRendering.Types.JAGGED_EDGE };
Blockly.blockRendering.Types.isRow = function(a) { return a.type & Blockly.blockRendering.Types.ROW };
Blockly.blockRendering.Types.isBetweenRowSpacer = function(a) { return a.type & Blockly.blockRendering.Types.BETWEEN_ROW_SPACER };
Blockly.blockRendering.Types.isTopRow = function(a) { return a.type & Blockly.blockRendering.Types.TOP_ROW };
Blockly.blockRendering.Types.isBottomRow = function(a) { return a.type & Blockly.blockRendering.Types.BOTTOM_ROW };
Blockly.blockRendering.Types.isTopOrBottomRow = function(a) { return a.type & (Blockly.blockRendering.Types.TOP_ROW | Blockly.blockRendering.Types.BOTTOM_ROW) };
Blockly.blockRendering.Types.isInputRow = function(a) { return a.type & Blockly.blockRendering.Types.INPUT_ROW };
Blockly.blockRendering.Measurable = function(a) {
    this.height = this.width = 0;
    this.type = Blockly.blockRendering.Types.NONE;
    this.centerline = this.xPos = 0;
    this.constants_ = a;
    this.notchOffset = this.constants_.NOTCH_OFFSET_LEFT
};
Blockly.blockRendering.Connection = function(a, b) {
    Blockly.blockRendering.Connection.superClass_.constructor.call(this, a);
    this.connectionModel = b;
    this.shape = this.constants_.shapeFor(b);
    this.isDynamicShape = !!this.shape.isDynamic;
    this.type |= Blockly.blockRendering.Types.CONNECTION
};
Blockly.utils.object.inherits(Blockly.blockRendering.Connection, Blockly.blockRendering.Measurable);
Blockly.blockRendering.OutputConnection = function(a, b) {
    Blockly.blockRendering.OutputConnection.superClass_.constructor.call(this, a, b);
    this.type |= Blockly.blockRendering.Types.OUTPUT_CONNECTION;
    this.height = this.isDynamicShape ? 0 : this.shape.height;
    this.startX = this.width = this.isDynamicShape ? 0 : this.shape.width;
    this.connectionOffsetY = this.constants_.TAB_OFFSET_FROM_TOP;
    this.connectionOffsetX = 0
};
Blockly.utils.object.inherits(Blockly.blockRendering.OutputConnection, Blockly.blockRendering.Connection);
Blockly.blockRendering.PreviousConnection = function(a, b) {
    Blockly.blockRendering.PreviousConnection.superClass_.constructor.call(this, a, b);
    this.type |= Blockly.blockRendering.Types.PREVIOUS_CONNECTION;
    this.height = this.shape.height;
    this.width = this.shape.width
};
Blockly.utils.object.inherits(Blockly.blockRendering.PreviousConnection, Blockly.blockRendering.Connection);
Blockly.blockRendering.NextConnection = function(a, b) {
    Blockly.blockRendering.NextConnection.superClass_.constructor.call(this, a, b);
    this.type |= Blockly.blockRendering.Types.NEXT_CONNECTION;
    this.height = this.shape.height;
    this.width = this.shape.width
};
Blockly.utils.object.inherits(Blockly.blockRendering.NextConnection, Blockly.blockRendering.Connection);
Blockly.blockRendering.InputConnection = function(a, b) {
    Blockly.blockRendering.InputConnection.superClass_.constructor.call(this, a, b.connection);
    this.type |= Blockly.blockRendering.Types.INPUT;
    this.input = b;
    this.align = b.align;
    (this.connectedBlock = b.connection && b.connection.targetBlock() ? b.connection.targetBlock() : null) ? (a = this.connectedBlock.getHeightWidth(), this.connectedBlockWidth = a.width, this.connectedBlockHeight = a.height) : this.connectedBlockHeight = this.connectedBlockWidth = 0;
    this.connectionOffsetY = this.connectionOffsetX =
        0
};
Blockly.utils.object.inherits(Blockly.blockRendering.InputConnection, Blockly.blockRendering.Connection);
Blockly.blockRendering.InlineInput = function(a, b) {
    Blockly.blockRendering.InlineInput.superClass_.constructor.call(this, a, b);
    this.type |= Blockly.blockRendering.Types.INLINE_INPUT;
    this.connectedBlock ? (this.width = this.connectedBlockWidth, this.height = this.connectedBlockHeight) : (this.height = this.constants_.EMPTY_INLINE_INPUT_HEIGHT, this.width = this.constants_.EMPTY_INLINE_INPUT_PADDING);
    this.connectionHeight = this.isDynamicShape ? this.shape.height(this.height) : this.shape.height;
    this.connectionWidth = this.isDynamicShape ?
        this.shape.width(this.height) : this.shape.width;
    this.connectedBlock || (this.width += this.connectionWidth * (this.isDynamicShape ? 2 : 1));
    this.connectionOffsetY = this.isDynamicShape ? this.shape.connectionOffsetY(this.connectionHeight) : this.constants_.TAB_OFFSET_FROM_TOP;
    this.connectionOffsetX = this.isDynamicShape ? this.shape.connectionOffsetX(this.connectionWidth) : 0
};
Blockly.utils.object.inherits(Blockly.blockRendering.InlineInput, Blockly.blockRendering.InputConnection);
Blockly.blockRendering.StatementInput = function(a, b) {
    Blockly.blockRendering.StatementInput.superClass_.constructor.call(this, a, b);
    this.type |= Blockly.blockRendering.Types.STATEMENT_INPUT;
    this.height = this.connectedBlock ? this.connectedBlockHeight + this.constants_.STATEMENT_BOTTOM_SPACER : this.constants_.EMPTY_STATEMENT_INPUT_HEIGHT;
    this.width = this.constants_.STATEMENT_INPUT_NOTCH_OFFSET + this.shape.width
};
Blockly.utils.object.inherits(Blockly.blockRendering.StatementInput, Blockly.blockRendering.InputConnection);
Blockly.blockRendering.ExternalValueInput = function(a, b) {
    Blockly.blockRendering.ExternalValueInput.superClass_.constructor.call(this, a, b);
    this.type |= Blockly.blockRendering.Types.EXTERNAL_VALUE_INPUT;
    this.height = this.connectedBlock ? this.connectedBlockHeight - this.constants_.TAB_OFFSET_FROM_TOP - this.constants_.MEDIUM_PADDING : this.shape.height;
    this.width = this.shape.width + this.constants_.EXTERNAL_VALUE_INPUT_PADDING;
    this.connectionOffsetY = this.constants_.TAB_OFFSET_FROM_TOP;
    this.connectionHeight = this.shape.height;
    this.connectionWidth = this.shape.width
};
Blockly.utils.object.inherits(Blockly.blockRendering.ExternalValueInput, Blockly.blockRendering.InputConnection);
Blockly.blockRendering.Icon = function(a, b) {
    Blockly.blockRendering.Icon.superClass_.constructor.call(this, a);
    this.icon = b;
    this.isVisible = b.isVisible();
    this.type |= Blockly.blockRendering.Types.ICON;
    a = b.getCorrectedSize();
    this.height = a.height;
    this.width = a.width
};
Blockly.utils.object.inherits(Blockly.blockRendering.Icon, Blockly.blockRendering.Measurable);
Blockly.blockRendering.JaggedEdge = function(a) {
    Blockly.blockRendering.JaggedEdge.superClass_.constructor.call(this, a);
    this.type |= Blockly.blockRendering.Types.JAGGED_EDGE;
    this.height = this.constants_.JAGGED_TEETH.height;
    this.width = this.constants_.JAGGED_TEETH.width
};
Blockly.utils.object.inherits(Blockly.blockRendering.JaggedEdge, Blockly.blockRendering.Measurable);
Blockly.blockRendering.Field = function(a, b, c) {
    Blockly.blockRendering.Field.superClass_.constructor.call(this, a);
    this.field = b;
    this.isEditable = b.EDITABLE;
    this.flipRtl = b.getFlipRtl();
    this.type |= Blockly.blockRendering.Types.FIELD;
    a = this.field.getSize();
    this.height = a.height;
    this.width = a.width;
    this.parentInput = c
};
Blockly.utils.object.inherits(Blockly.blockRendering.Field, Blockly.blockRendering.Measurable);
Blockly.blockRendering.Hat = function(a) {
    Blockly.blockRendering.Hat.superClass_.constructor.call(this, a);
    this.type |= Blockly.blockRendering.Types.HAT;
    this.height = this.constants_.START_HAT.height;
    this.width = this.constants_.START_HAT.width;
    this.ascenderHeight = this.height
};
Blockly.utils.object.inherits(Blockly.blockRendering.Hat, Blockly.blockRendering.Measurable);
Blockly.blockRendering.SquareCorner = function(a, b) {
    Blockly.blockRendering.SquareCorner.superClass_.constructor.call(this, a);
    this.type = (b && "left" != b ? Blockly.blockRendering.Types.RIGHT_SQUARE_CORNER : Blockly.blockRendering.Types.LEFT_SQUARE_CORNER) | Blockly.blockRendering.Types.CORNER;
    this.width = this.height = this.constants_.NO_PADDING
};
Blockly.utils.object.inherits(Blockly.blockRendering.SquareCorner, Blockly.blockRendering.Measurable);
Blockly.blockRendering.RoundCorner = function(a, b) {
    Blockly.blockRendering.RoundCorner.superClass_.constructor.call(this, a);
    this.type = (b && "left" != b ? Blockly.blockRendering.Types.RIGHT_ROUND_CORNER : Blockly.blockRendering.Types.LEFT_ROUND_CORNER) | Blockly.blockRendering.Types.CORNER;
    this.width = this.constants_.CORNER_RADIUS;
    this.height = this.constants_.CORNER_RADIUS / 2
};
Blockly.utils.object.inherits(Blockly.blockRendering.RoundCorner, Blockly.blockRendering.Measurable);
Blockly.blockRendering.InRowSpacer = function(a, b) {
    Blockly.blockRendering.InRowSpacer.superClass_.constructor.call(this, a);
    this.type = this.type | Blockly.blockRendering.Types.SPACER | Blockly.blockRendering.Types.IN_ROW_SPACER;
    this.width = b;
    this.height = this.constants_.SPACER_DEFAULT_HEIGHT
};
Blockly.utils.object.inherits(Blockly.blockRendering.InRowSpacer, Blockly.blockRendering.Measurable);
Blockly.blockRendering.Row = function(a) {
    this.type = Blockly.blockRendering.Types.ROW;
    this.elements = [];
    this.xPos = this.yPos = this.widthWithConnectedBlocks = this.minWidth = this.minHeight = this.width = this.height = 0;
    this.hasJaggedEdge = this.hasDummyInput = this.hasInlineInput = this.hasStatement = this.hasExternalInput = !1;
    this.constants_ = a;
    this.notchOffset = this.constants_.NOTCH_OFFSET_LEFT;
    this.align = null
};
Blockly.blockRendering.Row.prototype.measure = function() { throw Error("Unexpected attempt to measure a base Row."); };
Blockly.blockRendering.Row.prototype.getLastInput = function() {
    for (var a = this.elements.length - 1, b; b = this.elements[a]; a--)
        if (Blockly.blockRendering.Types.isInput(b)) return b;
    return null
};
Blockly.blockRendering.Row.prototype.startsWithElemSpacer = function() { return !0 };
Blockly.blockRendering.Row.prototype.endsWithElemSpacer = function() { return !0 };
Blockly.blockRendering.Row.prototype.getFirstSpacer = function() {
    for (var a = 0, b; b = this.elements[a]; a++)
        if (Blockly.blockRendering.Types.isSpacer(b)) return b;
    return null
};
Blockly.blockRendering.Row.prototype.getLastSpacer = function() {
    for (var a = this.elements.length - 1, b; b = this.elements[a]; a--)
        if (Blockly.blockRendering.Types.isSpacer(b)) return b;
    return null
};
Blockly.blockRendering.TopRow = function(a) {
    Blockly.blockRendering.TopRow.superClass_.constructor.call(this, a);
    this.type |= Blockly.blockRendering.Types.TOP_ROW;
    this.ascenderHeight = this.capline = 0;
    this.hasPreviousConnection = !1;
    this.connection = null
};
Blockly.utils.object.inherits(Blockly.blockRendering.TopRow, Blockly.blockRendering.Row);
Blockly.blockRendering.TopRow.prototype.hasLeftSquareCorner = function(a) {
    var b = (a.hat ? "cap" === a.hat : this.constants_.ADD_START_HATS) && !a.outputConnection && !a.previousConnection,
        c = a.getPreviousBlock();
    return !!a.outputConnection || b || (c ? c.getNextBlock() == a : !1)
};
Blockly.blockRendering.TopRow.prototype.hasRightSquareCorner = function(a) { return !0 };
Blockly.blockRendering.TopRow.prototype.measure = function() {
    for (var a = 0, b = 0, c = 0, d = 0, e; e = this.elements[d]; d++) b += e.width, Blockly.blockRendering.Types.isSpacer(e) || (Blockly.blockRendering.Types.isHat(e) ? c = Math.max(c, e.ascenderHeight) : a = Math.max(a, e.height));
    this.width = Math.max(this.minWidth, b);
    this.height = Math.max(this.minHeight, a) + c;
    this.capline = this.ascenderHeight = c;
    this.widthWithConnectedBlocks = this.width
};
Blockly.blockRendering.TopRow.prototype.startsWithElemSpacer = function() { return !1 };
Blockly.blockRendering.TopRow.prototype.endsWithElemSpacer = function() { return !1 };
Blockly.blockRendering.BottomRow = function(a) {
    Blockly.blockRendering.BottomRow.superClass_.constructor.call(this, a);
    this.type |= Blockly.blockRendering.Types.BOTTOM_ROW;
    this.hasNextConnection = !1;
    this.connection = null;
    this.baseline = this.descenderHeight = 0
};
Blockly.utils.object.inherits(Blockly.blockRendering.BottomRow, Blockly.blockRendering.Row);
Blockly.blockRendering.BottomRow.prototype.hasLeftSquareCorner = function(a) { return !!a.outputConnection || !!a.getNextBlock() };
Blockly.blockRendering.BottomRow.prototype.hasRightSquareCorner = function(a) { return !0 };
Blockly.blockRendering.BottomRow.prototype.measure = function() {
    for (var a = 0, b = 0, c = 0, d = 0, e; e = this.elements[d]; d++) b += e.width, Blockly.blockRendering.Types.isSpacer(e) || (Blockly.blockRendering.Types.isNextConnection(e) ? c = Math.max(c, e.height) : a = Math.max(a, e.height));
    this.width = Math.max(this.minWidth, b);
    this.height = Math.max(this.minHeight, a) + c;
    this.descenderHeight = c;
    this.widthWithConnectedBlocks = this.width
};
Blockly.blockRendering.BottomRow.prototype.startsWithElemSpacer = function() { return !1 };
Blockly.blockRendering.BottomRow.prototype.endsWithElemSpacer = function() { return !1 };
Blockly.blockRendering.SpacerRow = function(a, b, c) {
    Blockly.blockRendering.SpacerRow.superClass_.constructor.call(this, a);
    this.type = this.type | Blockly.blockRendering.Types.SPACER | Blockly.blockRendering.Types.BETWEEN_ROW_SPACER;
    this.width = c;
    this.height = b;
    this.followsStatement = !1;
    this.widthWithConnectedBlocks = 0;
    this.elements = [new Blockly.blockRendering.InRowSpacer(this.constants_, c)]
};
Blockly.utils.object.inherits(Blockly.blockRendering.SpacerRow, Blockly.blockRendering.Row);
Blockly.blockRendering.SpacerRow.prototype.measure = function() {};
Blockly.blockRendering.InputRow = function(a) {
    Blockly.blockRendering.InputRow.superClass_.constructor.call(this, a);
    this.type |= Blockly.blockRendering.Types.INPUT_ROW;
    this.connectedBlockWidths = 0
};
Blockly.utils.object.inherits(Blockly.blockRendering.InputRow, Blockly.blockRendering.Row);
Blockly.blockRendering.InputRow.prototype.measure = function() {
    this.width = this.minWidth;
    this.height = this.minHeight;
    for (var a = 0, b = 0, c; c = this.elements[b]; b++) this.width += c.width, Blockly.blockRendering.Types.isInput(c) && (Blockly.blockRendering.Types.isStatementInput(c) ? a += c.connectedBlockWidth : Blockly.blockRendering.Types.isExternalInput(c) && 0 != c.connectedBlockWidth && (a += c.connectedBlockWidth - c.connectionWidth)), Blockly.blockRendering.Types.isSpacer(c) || (this.height = Math.max(this.height, c.height));
    this.connectedBlockWidths =
        a;
    this.widthWithConnectedBlocks = this.width + a
};
Blockly.blockRendering.InputRow.prototype.endsWithElemSpacer = function() { return !this.hasExternalInput && !this.hasStatement };
Blockly.blockRendering.RenderInfo = function(a, b) {
    this.block_ = b;
    this.renderer_ = a;
    this.constants_ = this.renderer_.getConstants();
    this.outputConnection = b.outputConnection ? new Blockly.blockRendering.OutputConnection(this.constants_, b.outputConnection) : null;
    this.isInline = b.getInputsInline() && !b.isCollapsed();
    this.isCollapsed = b.isCollapsed();
    this.isInsertionMarker = b.isInsertionMarker();
    this.RTL = b.RTL;
    this.statementEdge = this.width = this.widthWithChildren = this.height = 0;
    this.rows = [];
    this.inputRows = [];
    this.hiddenIcons = [];
    this.topRow = new Blockly.blockRendering.TopRow(this.constants_);
    this.bottomRow = new Blockly.blockRendering.BottomRow(this.constants_);
    this.startY = this.startX = 0
};
Blockly.blockRendering.RenderInfo.prototype.getRenderer = function() { return this.renderer_ };
Blockly.blockRendering.RenderInfo.prototype.measure = function() {
    this.createRows_();
    this.addElemSpacing_();
    this.addRowSpacing_();
    this.computeBounds_();
    this.alignRowElements_();
    this.finalize_()
};
Blockly.blockRendering.RenderInfo.prototype.createRows_ = function() {
    this.populateTopRow_();
    this.rows.push(this.topRow);
    var a = new Blockly.blockRendering.InputRow(this.constants_);
    this.inputRows.push(a);
    var b = this.block_.getIcons();
    if (b.length)
        for (var c = 0, d; d = b[c]; c++) {
            var e = new Blockly.blockRendering.Icon(this.constants_, d);
            this.isCollapsed && d.collapseHidden ? this.hiddenIcons.push(e) : a.elements.push(e)
        }
    d = null;
    for (c = 0; b = this.block_.inputList[c]; c++)
        if (b.isVisible()) {
            this.shouldStartNewRow_(b, d) && (this.rows.push(a),
                a = new Blockly.blockRendering.InputRow(this.constants_), this.inputRows.push(a));
            for (d = 0; e = b.fieldRow[d]; d++) a.elements.push(new Blockly.blockRendering.Field(this.constants_, e, b));
            this.addInput_(b, a);
            d = b
        }
    this.isCollapsed && (a.hasJaggedEdge = !0, a.elements.push(new Blockly.blockRendering.JaggedEdge(this.constants_)));
    (a.elements.length || a.hasDummyInput) && this.rows.push(a);
    this.populateBottomRow_();
    this.rows.push(this.bottomRow)
};
Blockly.blockRendering.RenderInfo.prototype.populateTopRow_ = function() {
    var a = !!this.block_.previousConnection,
        b = (this.block_.hat ? "cap" === this.block_.hat : this.constants_.ADD_START_HATS) && !this.outputConnection && !a;
    this.topRow.hasLeftSquareCorner(this.block_) ? this.topRow.elements.push(new Blockly.blockRendering.SquareCorner(this.constants_)) : this.topRow.elements.push(new Blockly.blockRendering.RoundCorner(this.constants_));
    b ? (a = new Blockly.blockRendering.Hat(this.constants_), this.topRow.elements.push(a),
        this.topRow.capline = a.ascenderHeight) : a && (this.topRow.hasPreviousConnection = !0, this.topRow.connection = new Blockly.blockRendering.PreviousConnection(this.constants_, this.block_.previousConnection), this.topRow.elements.push(this.topRow.connection));
    this.block_.inputList.length && this.block_.inputList[0].type == Blockly.NEXT_STATEMENT && !this.block_.isCollapsed() ? this.topRow.minHeight = this.constants_.TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT : this.topRow.minHeight = this.constants_.TOP_ROW_MIN_HEIGHT;
    this.topRow.hasRightSquareCorner(this.block_) ?
        this.topRow.elements.push(new Blockly.blockRendering.SquareCorner(this.constants_, "right")) : this.topRow.elements.push(new Blockly.blockRendering.RoundCorner(this.constants_, "right"))
};
Blockly.blockRendering.RenderInfo.prototype.populateBottomRow_ = function() {
    this.bottomRow.hasNextConnection = !!this.block_.nextConnection;
    this.bottomRow.minHeight = this.block_.inputList.length && this.block_.inputList[this.block_.inputList.length - 1].type == Blockly.NEXT_STATEMENT ? this.constants_.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT : this.constants_.BOTTOM_ROW_MIN_HEIGHT;
    this.bottomRow.hasLeftSquareCorner(this.block_) ? this.bottomRow.elements.push(new Blockly.blockRendering.SquareCorner(this.constants_)) :
        this.bottomRow.elements.push(new Blockly.blockRendering.RoundCorner(this.constants_));
    this.bottomRow.hasNextConnection && (this.bottomRow.connection = new Blockly.blockRendering.NextConnection(this.constants_, this.block_.nextConnection), this.bottomRow.elements.push(this.bottomRow.connection));
    this.bottomRow.hasRightSquareCorner(this.block_) ? this.bottomRow.elements.push(new Blockly.blockRendering.SquareCorner(this.constants_, "right")) : this.bottomRow.elements.push(new Blockly.blockRendering.RoundCorner(this.constants_,
        "right"))
};
Blockly.blockRendering.RenderInfo.prototype.addInput_ = function(a, b) {
    this.isInline && a.type == Blockly.INPUT_VALUE ? (b.elements.push(new Blockly.blockRendering.InlineInput(this.constants_, a)), b.hasInlineInput = !0) : a.type == Blockly.NEXT_STATEMENT ? (b.elements.push(new Blockly.blockRendering.StatementInput(this.constants_, a)), b.hasStatement = !0) : a.type == Blockly.INPUT_VALUE ? (b.elements.push(new Blockly.blockRendering.ExternalValueInput(this.constants_, a)), b.hasExternalInput = !0) : a.type == Blockly.DUMMY_INPUT && (b.minHeight =
        Math.max(b.minHeight, a.getSourceBlock() && a.getSourceBlock().isShadow() ? this.constants_.DUMMY_INPUT_SHADOW_MIN_HEIGHT : this.constants_.DUMMY_INPUT_MIN_HEIGHT), b.hasDummyInput = !0);
    null == b.align && (b.align = a.align)
};
Blockly.blockRendering.RenderInfo.prototype.shouldStartNewRow_ = function(a, b) { return b ? a.type == Blockly.NEXT_STATEMENT || b.type == Blockly.NEXT_STATEMENT ? !0 : a.type == Blockly.INPUT_VALUE || a.type == Blockly.DUMMY_INPUT ? !this.isInline : !1 : !1 };
Blockly.blockRendering.RenderInfo.prototype.addElemSpacing_ = function() {
    for (var a = 0, b; b = this.rows[a]; a++) {
        var c = b.elements;
        b.elements = [];
        b.startsWithElemSpacer() && b.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, this.getInRowSpacing_(null, c[0])));
        if (c.length) {
            for (var d = 0; d < c.length - 1; d++) {
                b.elements.push(c[d]);
                var e = this.getInRowSpacing_(c[d], c[d + 1]);
                b.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, e))
            }
            b.elements.push(c[c.length - 1]);
            b.endsWithElemSpacer() &&
                b.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, this.getInRowSpacing_(c[c.length - 1], null)))
        }
    }
};
Blockly.blockRendering.RenderInfo.prototype.getInRowSpacing_ = function(a, b) {
    if (!a && b && Blockly.blockRendering.Types.isStatementInput(b)) return this.constants_.STATEMENT_INPUT_PADDING_LEFT;
    if (a && Blockly.blockRendering.Types.isInput(a) && !b) { if (Blockly.blockRendering.Types.isExternalInput(a)) return this.constants_.NO_PADDING; if (Blockly.blockRendering.Types.isInlineInput(a)) return this.constants_.LARGE_PADDING; if (Blockly.blockRendering.Types.isStatementInput(a)) return this.constants_.NO_PADDING }
    return a &&
        Blockly.blockRendering.Types.isLeftSquareCorner(a) && b && (Blockly.blockRendering.Types.isPreviousConnection(b) || Blockly.blockRendering.Types.isNextConnection(b)) ? b.notchOffset : a && Blockly.blockRendering.Types.isLeftRoundedCorner(a) && b && (Blockly.blockRendering.Types.isPreviousConnection(b) || Blockly.blockRendering.Types.isNextConnection(b)) ? b.notchOffset - this.constants_.CORNER_RADIUS : this.constants_.MEDIUM_PADDING
};
Blockly.blockRendering.RenderInfo.prototype.computeBounds_ = function() {
    for (var a = 0, b = 0, c = 0, d = 0, e; e = this.rows[d]; d++) {
        e.measure();
        b = Math.max(b, e.width);
        if (e.hasStatement) {
            var f = e.getLastInput();
            a = Math.max(a, e.width - f.width)
        }
        c = Math.max(c, e.widthWithConnectedBlocks)
    }
    this.statementEdge = a;
    this.width = b;
    for (d = 0; e = this.rows[d]; d++) e.hasStatement && (e.statementEdge = this.statementEdge);
    this.widthWithChildren = Math.max(b, c);
    this.outputConnection && (this.startX = this.outputConnection.width, this.width += this.outputConnection.width,
        this.widthWithChildren += this.outputConnection.width)
};
Blockly.blockRendering.RenderInfo.prototype.alignRowElements_ = function() {
    for (var a = 0, b; b = this.rows[a]; a++)
        if (b.hasStatement) this.alignStatementRow_(b);
        else {
            var c = b.width;
            c = this.getDesiredRowWidth_(b) - c;
            0 < c && this.addAlignmentPadding_(b, c);
            Blockly.blockRendering.Types.isTopOrBottomRow(b) && (b.widthWithConnectedBlocks = b.width)
        }
};
Blockly.blockRendering.RenderInfo.prototype.getDesiredRowWidth_ = function(a) { return this.width - this.startX };
Blockly.blockRendering.RenderInfo.prototype.addAlignmentPadding_ = function(a, b) {
    var c = a.getFirstSpacer(),
        d = a.getLastSpacer();
    if (a.hasExternalInput || a.hasStatement) a.widthWithConnectedBlocks += b;
    a.align == Blockly.ALIGN_LEFT ? d.width += b : a.align == Blockly.ALIGN_CENTRE ? (c.width += b / 2, d.width += b / 2) : a.align == Blockly.ALIGN_RIGHT ? c.width += b : d.width += b;
    a.width += b
};
Blockly.blockRendering.RenderInfo.prototype.alignStatementRow_ = function(a) {
    var b = a.getLastInput(),
        c = a.width - b.width,
        d = this.statementEdge;
    c = d - c;
    0 < c && this.addAlignmentPadding_(a, c);
    c = a.width;
    d = this.getDesiredRowWidth_(a);
    b.width += d - c;
    b.height = Math.max(b.height, a.height);
    a.width += d - c;
    a.widthWithConnectedBlocks = Math.max(a.width, this.statementEdge + a.connectedBlockWidths)
};
Blockly.blockRendering.RenderInfo.prototype.addRowSpacing_ = function() {
    var a = this.rows;
    this.rows = [];
    for (var b = 0; b < a.length; b++) this.rows.push(a[b]), b != a.length - 1 && this.rows.push(this.makeSpacerRow_(a[b], a[b + 1]))
};
Blockly.blockRendering.RenderInfo.prototype.makeSpacerRow_ = function(a, b) {
    var c = this.getSpacerRowHeight_(a, b),
        d = this.getSpacerRowWidth_(a, b);
    c = new Blockly.blockRendering.SpacerRow(this.constants_, c, d);
    a.hasStatement && (c.followsStatement = !0);
    b.hasStatement && (c.precedesStatement = !0);
    return c
};
Blockly.blockRendering.RenderInfo.prototype.getSpacerRowWidth_ = function(a, b) { return this.width - this.startX };
Blockly.blockRendering.RenderInfo.prototype.getSpacerRowHeight_ = function(a, b) { return this.constants_.MEDIUM_PADDING };
Blockly.blockRendering.RenderInfo.prototype.getElemCenterline_ = function(a, b) { return Blockly.blockRendering.Types.isSpacer(b) ? a.yPos + b.height / 2 : Blockly.blockRendering.Types.isBottomRow(a) ? (a = a.yPos + a.height - a.descenderHeight, Blockly.blockRendering.Types.isNextConnection(b) ? a + b.height / 2 : a - b.height / 2) : Blockly.blockRendering.Types.isTopRow(a) ? Blockly.blockRendering.Types.isHat(b) ? a.capline - b.height / 2 : a.capline + b.height / 2 : a.yPos + a.height / 2 };
Blockly.blockRendering.RenderInfo.prototype.recordElemPositions_ = function(a) { for (var b = a.xPos, c = 0, d; d = a.elements[c]; c++) Blockly.blockRendering.Types.isSpacer(d) && (d.height = a.height), d.xPos = b, d.centerline = this.getElemCenterline_(a, d), b += d.width };
Blockly.blockRendering.RenderInfo.prototype.finalize_ = function() {
    for (var a = 0, b = 0, c = 0, d; d = this.rows[c]; c++) d.yPos = b, d.xPos = this.startX, b += d.height, a = Math.max(a, d.widthWithConnectedBlocks), this.recordElemPositions_(d);
    this.outputConnection && this.block_.nextConnection && this.block_.nextConnection.isConnected() && (a = Math.max(a, this.block_.nextConnection.targetBlock().getHeightWidth().width));
    this.widthWithChildren = a + this.startX;
    this.height = b;
    this.startY = this.topRow.capline;
    this.bottomRow.baseline = b - this.bottomRow.descenderHeight
};
Blockly.blockRendering.Drawer = function(a, b) {
    this.block_ = a;
    this.info_ = b;
    this.topLeft_ = a.getRelativeToSurfaceXY();
    this.inlinePath_ = this.outlinePath_ = "";
    this.constants_ = b.getRenderer().getConstants()
};
Blockly.blockRendering.Drawer.prototype.draw = function() {
    this.hideHiddenIcons_();
    this.drawOutline_();
    this.drawInternals_();
    this.block_.pathObject.setPath(this.outlinePath_ + "\n" + this.inlinePath_);
    this.info_.RTL && this.block_.pathObject.flipRTL();
    Blockly.blockRendering.useDebugger && this.block_.renderingDebugger.drawDebug(this.block_, this.info_);
    this.recordSizeOnBlock_()
};
Blockly.blockRendering.Drawer.prototype.recordSizeOnBlock_ = function() {
    this.block_.height = this.info_.height;
    this.block_.width = this.info_.widthWithChildren
};
Blockly.blockRendering.Drawer.prototype.hideHiddenIcons_ = function() { for (var a = 0, b; b = this.info_.hiddenIcons[a]; a++) b.icon.iconGroup_.setAttribute("display", "none") };
Blockly.blockRendering.Drawer.prototype.drawOutline_ = function() {
    this.drawTop_();
    for (var a = 1; a < this.info_.rows.length - 1; a++) {
        var b = this.info_.rows[a];
        b.hasJaggedEdge ? this.drawJaggedEdge_(b) : b.hasStatement ? this.drawStatementInput_(b) : b.hasExternalInput ? this.drawValueInput_(b) : this.drawRightSideRow_(b)
    }
    this.drawBottom_();
    this.drawLeft_()
};
Blockly.blockRendering.Drawer.prototype.drawTop_ = function() {
    var a = this.info_.topRow,
        b = a.elements;
    this.positionPreviousConnection_();
    this.outlinePath_ += Blockly.utils.svgPaths.moveBy(a.xPos, this.info_.startY);
    for (var c = 0, d; d = b[c]; c++) Blockly.blockRendering.Types.isLeftRoundedCorner(d) ? this.outlinePath_ += this.constants_.OUTSIDE_CORNERS.topLeft : Blockly.blockRendering.Types.isRightRoundedCorner(d) ? this.outlinePath_ += this.constants_.OUTSIDE_CORNERS.topRight : Blockly.blockRendering.Types.isPreviousConnection(d) ?
        this.outlinePath_ += d.shape.pathLeft : Blockly.blockRendering.Types.isHat(d) ? this.outlinePath_ += this.constants_.START_HAT.path : Blockly.blockRendering.Types.isSpacer(d) && (this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("h", d.width));
    this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("v", a.height)
};
Blockly.blockRendering.Drawer.prototype.drawJaggedEdge_ = function(a) { this.outlinePath_ += this.constants_.JAGGED_TEETH.path + Blockly.utils.svgPaths.lineOnAxis("v", a.height - this.constants_.JAGGED_TEETH.height) };
Blockly.blockRendering.Drawer.prototype.drawValueInput_ = function(a) {
    var b = a.getLastInput();
    this.positionExternalValueConnection_(a);
    var c = "function" == typeof b.shape.pathDown ? b.shape.pathDown(b.height) : b.shape.pathDown;
    this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("H", b.xPos + b.width) + c + Blockly.utils.svgPaths.lineOnAxis("v", a.height - b.connectionHeight)
};
Blockly.blockRendering.Drawer.prototype.drawStatementInput_ = function(a) {
    var b = a.getLastInput(),
        c = b.xPos + b.notchOffset + b.shape.width;
    b = b.shape.pathRight + Blockly.utils.svgPaths.lineOnAxis("h", -(b.notchOffset - this.constants_.INSIDE_CORNERS.width)) + this.constants_.INSIDE_CORNERS.pathTop;
    var d = a.height - 2 * this.constants_.INSIDE_CORNERS.height;
    this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("H", c) + b + Blockly.utils.svgPaths.lineOnAxis("v", d) + this.constants_.INSIDE_CORNERS.pathBottom + Blockly.utils.svgPaths.lineOnAxis("H",
        a.xPos + a.width);
    this.positionStatementInputConnection_(a)
};
Blockly.blockRendering.Drawer.prototype.drawRightSideRow_ = function(a) { this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("V", a.yPos + a.height) };
Blockly.blockRendering.Drawer.prototype.drawBottom_ = function() {
    var a = this.info_.bottomRow,
        b = a.elements;
    this.positionNextConnection_();
    for (var c = 0, d = "", e = b.length - 1, f; f = b[e]; e--) Blockly.blockRendering.Types.isNextConnection(f) ? d += f.shape.pathRight : Blockly.blockRendering.Types.isLeftSquareCorner(f) ? d += Blockly.utils.svgPaths.lineOnAxis("H", a.xPos) : Blockly.blockRendering.Types.isLeftRoundedCorner(f) ? d += this.constants_.OUTSIDE_CORNERS.bottomLeft : Blockly.blockRendering.Types.isRightRoundedCorner(f) ? (d +=
        this.constants_.OUTSIDE_CORNERS.bottomRight, c = this.constants_.OUTSIDE_CORNERS.rightHeight) : Blockly.blockRendering.Types.isSpacer(f) && (d += Blockly.utils.svgPaths.lineOnAxis("h", -1 * f.width));
    this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("V", a.baseline - c);
    this.outlinePath_ += d
};
Blockly.blockRendering.Drawer.prototype.drawLeft_ = function() {
    var a = this.info_.outputConnection;
    this.positionOutputConnection_();
    if (a) {
        var b = a.connectionOffsetY + a.height;
        a = "function" == typeof a.shape.pathUp ? a.shape.pathUp(a.height) : a.shape.pathUp;
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("V", b) + a
    }
    this.outlinePath_ += "z"
};
Blockly.blockRendering.Drawer.prototype.drawInternals_ = function() {
    for (var a = 0, b; b = this.info_.rows[a]; a++)
        for (var c = 0, d; d = b.elements[c]; c++) Blockly.blockRendering.Types.isInlineInput(d) ? this.drawInlineInput_(d) : (Blockly.blockRendering.Types.isIcon(d) || Blockly.blockRendering.Types.isField(d)) && this.layoutField_(d)
};
Blockly.blockRendering.Drawer.prototype.layoutField_ = function(a) {
    if (Blockly.blockRendering.Types.isField(a)) var b = a.field.getSvgRoot();
    else Blockly.blockRendering.Types.isIcon(a) && (b = a.icon.iconGroup_);
    var c = a.centerline - a.height / 2,
        d = a.xPos,
        e = "";
    this.info_.RTL && (d = -(d + a.width), a.flipRtl && (d += a.width, e = "scale(-1 1)"));
    Blockly.blockRendering.Types.isIcon(a) ? (b.setAttribute("display", "block"), b.setAttribute("transform", "translate(" + d + "," + c + ")"), a.icon.computeIconLocation()) : b.setAttribute("transform",
        "translate(" + d + "," + c + ")" + e);
    this.info_.isInsertionMarker && b.setAttribute("display", "none")
};
Blockly.blockRendering.Drawer.prototype.drawInlineInput_ = function(a) {
    var b = a.width,
        c = a.height,
        d = a.connectionOffsetY,
        e = a.connectionHeight + d;
    this.inlinePath_ += Blockly.utils.svgPaths.moveTo(a.xPos + a.connectionWidth, a.centerline - c / 2) + Blockly.utils.svgPaths.lineOnAxis("v", d) + a.shape.pathDown + Blockly.utils.svgPaths.lineOnAxis("v", c - e) + Blockly.utils.svgPaths.lineOnAxis("h", b - a.connectionWidth) + Blockly.utils.svgPaths.lineOnAxis("v", -c) + "z";
    this.positionInlineInputConnection_(a)
};
Blockly.blockRendering.Drawer.prototype.positionInlineInputConnection_ = function(a) {
    var b = a.centerline - a.height / 2;
    if (a.connectionModel) {
        var c = a.xPos + a.connectionWidth + a.connectionOffsetX;
        this.info_.RTL && (c *= -1);
        a.connectionModel.setOffsetInBlock(c, b + a.connectionOffsetY)
    }
};
Blockly.blockRendering.Drawer.prototype.positionStatementInputConnection_ = function(a) {
    var b = a.getLastInput();
    if (b.connectionModel) {
        var c = a.xPos + a.statementEdge + b.notchOffset;
        this.info_.RTL && (c *= -1);
        b.connectionModel.setOffsetInBlock(c, a.yPos)
    }
};
Blockly.blockRendering.Drawer.prototype.positionExternalValueConnection_ = function(a) {
    var b = a.getLastInput();
    if (b.connectionModel) {
        var c = a.xPos + a.width;
        this.info_.RTL && (c *= -1);
        b.connectionModel.setOffsetInBlock(c, a.yPos)
    }
};
Blockly.blockRendering.Drawer.prototype.positionPreviousConnection_ = function() {
    var a = this.info_.topRow;
    if (a.connection) {
        var b = a.xPos + a.notchOffset;
        a.connection.connectionModel.setOffsetInBlock(this.info_.RTL ? -b : b, 0)
    }
};
Blockly.blockRendering.Drawer.prototype.positionNextConnection_ = function() {
    var a = this.info_.bottomRow;
    if (a.connection) {
        var b = a.connection,
            c = b.xPos;
        b.connectionModel.setOffsetInBlock(this.info_.RTL ? -c : c, a.baseline)
    }
};
Blockly.blockRendering.Drawer.prototype.positionOutputConnection_ = function() {
    if (this.info_.outputConnection) {
        var a = this.info_.startX + this.info_.outputConnection.connectionOffsetX;
        this.block_.outputConnection.setOffsetInBlock(this.info_.RTL ? -a : a, this.info_.outputConnection.connectionOffsetY)
    }
};
Blockly.blockRendering.PathObject = function(a, b, c) {
    this.constants = c;
    this.svgRoot = a;
    this.svgPath = Blockly.utils.dom.createSvgElement("path", { "class": "blocklyPath" }, this.svgRoot);
    this.style = b;
    this.markerSvg = this.cursorSvg = null
};
Blockly.blockRendering.PathObject.prototype.setPath = function(a) { this.svgPath.setAttribute("d", a) };
Blockly.blockRendering.PathObject.prototype.flipRTL = function() { this.svgPath.setAttribute("transform", "scale(-1 1)") };
Blockly.blockRendering.PathObject.prototype.setCursorSvg = function(a) { a ? (this.svgRoot.appendChild(a), this.cursorSvg = a) : this.cursorSvg = null };
Blockly.blockRendering.PathObject.prototype.setMarkerSvg = function(a) { a ? (this.cursorSvg ? this.svgRoot.insertBefore(a, this.cursorSvg) : this.svgRoot.appendChild(a), this.markerSvg = a) : this.markerSvg = null };
Blockly.blockRendering.PathObject.prototype.applyColour = function(a) {
    this.svgPath.setAttribute("stroke", this.style.colourTertiary);
    this.svgPath.setAttribute("fill", this.style.colourPrimary);
    this.updateShadow_(a.isShadow());
    this.updateDisabled_(!a.isEnabled() || a.getInheritedDisabled())
};
Blockly.blockRendering.PathObject.prototype.setStyle = function(a) { this.style = a };
Blockly.blockRendering.PathObject.prototype.setClass_ = function(a, b) { b ? Blockly.utils.dom.addClass(this.svgRoot, a) : Blockly.utils.dom.removeClass(this.svgRoot, a) };
Blockly.blockRendering.PathObject.prototype.updateHighlighted = function(a) { a ? this.svgPath.setAttribute("filter", "url(#" + this.constants.embossFilterId + ")") : this.svgPath.setAttribute("filter", "none") };
Blockly.blockRendering.PathObject.prototype.updateShadow_ = function(a) { a && (this.svgPath.setAttribute("stroke", "none"), this.svgPath.setAttribute("fill", this.style.colourSecondary)) };
Blockly.blockRendering.PathObject.prototype.updateDisabled_ = function(a) {
    this.setClass_("blocklyDisabled", a);
    a && this.svgPath.setAttribute("fill", "url(#" + this.constants.disabledPatternId + ")")
};
Blockly.blockRendering.PathObject.prototype.updateSelected = function(a) { this.setClass_("blocklySelected", a) };
Blockly.blockRendering.PathObject.prototype.updateDraggingDelete = function(a) { this.setClass_("blocklyDraggingDelete", a) };
Blockly.blockRendering.PathObject.prototype.updateInsertionMarker = function(a) { this.setClass_("blocklyInsertionMarker", a) };
Blockly.blockRendering.PathObject.prototype.updateMovable = function(a) { this.setClass_("blocklyDraggable", a) };
Blockly.blockRendering.PathObject.prototype.updateReplacementFade = function(a) { this.setClass_("blocklyReplaceable", a) };
Blockly.blockRendering.PathObject.prototype.updateShapeForInputHighlight = function(a, b) {};
Blockly.blockRendering.Renderer = function(a) {
    this.name = a;
    this.overrides = this.constants_ = null
};
Blockly.blockRendering.Renderer.prototype.getClassName = function() { return this.name + "-renderer" };
Blockly.blockRendering.Renderer.prototype.init = function(a, b) {
    this.constants_ = this.makeConstants_();
    b && (this.overrides = b, Blockly.utils.object.mixin(this.constants_, b));
    this.constants_.setTheme(a);
    this.constants_.init()
};
Blockly.blockRendering.Renderer.prototype.createDom = function(a, b) { this.constants_.createDom(a, this.name + "-" + b.name, "." + this.getClassName() + "." + b.getClassName()) };
Blockly.blockRendering.Renderer.prototype.refreshDom = function(a, b) {
    var c = this.getConstants();
    c.dispose();
    this.constants_ = this.makeConstants_();
    this.overrides && Blockly.utils.object.mixin(this.constants_, this.overrides);
    this.constants_.randomIdentifier = c.randomIdentifier;
    this.constants_.setTheme(b);
    this.constants_.init();
    this.createDom(a, b)
};
Blockly.blockRendering.Renderer.prototype.dispose = function() { this.constants_ && this.constants_.dispose() };
Blockly.blockRendering.Renderer.prototype.makeConstants_ = function() { return new Blockly.blockRendering.ConstantProvider };
Blockly.blockRendering.Renderer.prototype.makeRenderInfo_ = function(a) { return new Blockly.blockRendering.RenderInfo(this, a) };
Blockly.blockRendering.Renderer.prototype.makeDrawer_ = function(a, b) { return new Blockly.blockRendering.Drawer(a, b) };
Blockly.blockRendering.Renderer.prototype.makeDebugger_ = function() { if (!Blockly.blockRendering.Debug) throw Error("Missing require for Blockly.blockRendering.Debug"); return new Blockly.blockRendering.Debug(this.getConstants()) };
Blockly.blockRendering.Renderer.prototype.makeMarkerDrawer = function(a, b) { return new Blockly.blockRendering.MarkerSvg(a, this.getConstants(), b) };
Blockly.blockRendering.Renderer.prototype.makePathObject = function(a, b) { return new Blockly.blockRendering.PathObject(a, b, this.constants_) };
Blockly.blockRendering.Renderer.prototype.getConstants = function() { return this.constants_ };
Blockly.blockRendering.Renderer.prototype.shouldHighlightConnection = function(a) { return !0 };
Blockly.blockRendering.Renderer.prototype.orphanCanConnectAtEnd = function(a, b, c) { c == Blockly.OUTPUT_VALUE ? (c = b.outputConnection, a = Blockly.Connection.lastConnectionInRow(a, b)) : (c = b.previousConnection, a = a.lastConnectionInStack()); return a ? c.checkType(a) : !1 };
Blockly.blockRendering.Renderer.prototype.getConnectionPreviewMethod = function(a, b, c) { return b.type == Blockly.OUTPUT_VALUE || b.type == Blockly.PREVIOUS_STATEMENT ? !a.isConnected() || this.orphanCanConnectAtEnd(c, a.targetBlock(), b.type) ? Blockly.InsertionMarkerManager.PREVIEW_TYPE.INSERTION_MARKER : Blockly.InsertionMarkerManager.PREVIEW_TYPE.REPLACEMENT_FADE : Blockly.InsertionMarkerManager.PREVIEW_TYPE.INSERTION_MARKER };
Blockly.blockRendering.Renderer.prototype.render = function(a) {
    Blockly.blockRendering.useDebugger && !a.renderingDebugger && (a.renderingDebugger = this.makeDebugger_());
    var b = this.makeRenderInfo_(a);
    b.measure();
    this.makeDrawer_(a, b).draw()
};
Blockly.geras = {};
Blockly.geras.ConstantProvider = function() {
    Blockly.geras.ConstantProvider.superClass_.constructor.call(this);
    this.FIELD_TEXT_BASELINE_CENTER = !1;
    this.DARK_PATH_OFFSET = 1;
    this.MAX_BOTTOM_WIDTH = 30
};
Blockly.utils.object.inherits(Blockly.geras.ConstantProvider, Blockly.blockRendering.ConstantProvider);
Blockly.geras.ConstantProvider.prototype.getCSS_ = function(a) { return Blockly.geras.ConstantProvider.superClass_.getCSS_.call(this, a).concat([a + " .blocklyInsertionMarker>.blocklyPathLight,", a + " .blocklyInsertionMarker>.blocklyPathDark {", "fill-opacity: " + this.INSERTION_MARKER_OPACITY + ";", "stroke: none", "}"]) };
Blockly.geras.Highlighter = function(a) {
    this.info_ = a;
    this.inlineSteps_ = this.steps_ = "";
    this.RTL_ = this.info_.RTL;
    a = a.getRenderer();
    this.constants_ = a.getConstants();
    this.highlightConstants_ = a.getHighlightConstants();
    this.highlightOffset_ = this.highlightConstants_.OFFSET;
    this.outsideCornerPaths_ = this.highlightConstants_.OUTSIDE_CORNER;
    this.insideCornerPaths_ = this.highlightConstants_.INSIDE_CORNER;
    this.puzzleTabPaths_ = this.highlightConstants_.PUZZLE_TAB;
    this.notchPaths_ = this.highlightConstants_.NOTCH;
    this.startPaths_ =
        this.highlightConstants_.START_HAT;
    this.jaggedTeethPaths_ = this.highlightConstants_.JAGGED_TEETH
};
Blockly.geras.Highlighter.prototype.getPath = function() { return this.steps_ + "\n" + this.inlineSteps_ };
Blockly.geras.Highlighter.prototype.drawTopCorner = function(a) {
    this.steps_ += Blockly.utils.svgPaths.moveBy(a.xPos, this.info_.startY);
    for (var b = 0, c; c = a.elements[b]; b++) Blockly.blockRendering.Types.isLeftSquareCorner(c) ? this.steps_ += this.highlightConstants_.START_POINT : Blockly.blockRendering.Types.isLeftRoundedCorner(c) ? this.steps_ += this.outsideCornerPaths_.topLeft(this.RTL_) : Blockly.blockRendering.Types.isPreviousConnection(c) ? this.steps_ += this.notchPaths_.pathLeft : Blockly.blockRendering.Types.isHat(c) ?
        this.steps_ += this.startPaths_.path(this.RTL_) : Blockly.blockRendering.Types.isSpacer(c) && 0 != c.width && (this.steps_ += Blockly.utils.svgPaths.lineOnAxis("H", c.xPos + c.width - this.highlightOffset_));
    this.steps_ += Blockly.utils.svgPaths.lineOnAxis("H", a.xPos + a.width - this.highlightOffset_)
};
Blockly.geras.Highlighter.prototype.drawJaggedEdge_ = function(a) { this.info_.RTL && (this.steps_ += this.jaggedTeethPaths_.pathLeft + Blockly.utils.svgPaths.lineOnAxis("v", a.height - this.jaggedTeethPaths_.height - this.highlightOffset_)) };
Blockly.geras.Highlighter.prototype.drawValueInput = function(a) {
    var b = a.getLastInput();
    if (this.RTL_) {
        var c = a.height - b.connectionHeight;
        this.steps_ += Blockly.utils.svgPaths.moveTo(b.xPos + b.width - this.highlightOffset_, a.yPos) + this.puzzleTabPaths_.pathDown(this.RTL_) + Blockly.utils.svgPaths.lineOnAxis("v", c)
    } else this.steps_ += Blockly.utils.svgPaths.moveTo(b.xPos + b.width, a.yPos) + this.puzzleTabPaths_.pathDown(this.RTL_)
};
Blockly.geras.Highlighter.prototype.drawStatementInput = function(a) {
    var b = a.getLastInput();
    if (this.RTL_) {
        var c = a.height - 2 * this.insideCornerPaths_.height;
        this.steps_ += Blockly.utils.svgPaths.moveTo(b.xPos, a.yPos) + this.insideCornerPaths_.pathTop(this.RTL_) + Blockly.utils.svgPaths.lineOnAxis("v", c) + this.insideCornerPaths_.pathBottom(this.RTL_) + Blockly.utils.svgPaths.lineTo(a.width - b.xPos - this.insideCornerPaths_.width, 0)
    } else this.steps_ += Blockly.utils.svgPaths.moveTo(b.xPos, a.yPos + a.height) + this.insideCornerPaths_.pathBottom(this.RTL_) +
        Blockly.utils.svgPaths.lineTo(a.width - b.xPos - this.insideCornerPaths_.width, 0)
};
Blockly.geras.Highlighter.prototype.drawRightSideRow = function(a) {
    var b = a.xPos + a.width - this.highlightOffset_;
    a.followsStatement && (this.steps_ += Blockly.utils.svgPaths.lineOnAxis("H", b));
    this.RTL_ && (this.steps_ += Blockly.utils.svgPaths.lineOnAxis("H", b), a.height > this.highlightOffset_ && (this.steps_ += Blockly.utils.svgPaths.lineOnAxis("V", a.yPos + a.height - this.highlightOffset_)))
};
Blockly.geras.Highlighter.prototype.drawBottomRow = function(a) {
    if (this.RTL_) this.steps_ += Blockly.utils.svgPaths.lineOnAxis("V", a.baseline - this.highlightOffset_);
    else {
        var b = this.info_.bottomRow.elements[0];
        Blockly.blockRendering.Types.isLeftSquareCorner(b) ? this.steps_ += Blockly.utils.svgPaths.moveTo(a.xPos + this.highlightOffset_, a.baseline - this.highlightOffset_) : Blockly.blockRendering.Types.isLeftRoundedCorner(b) && (this.steps_ += Blockly.utils.svgPaths.moveTo(a.xPos, a.baseline), this.steps_ += this.outsideCornerPaths_.bottomLeft())
    }
};
Blockly.geras.Highlighter.prototype.drawLeft = function() {
    var a = this.info_.outputConnection;
    a && (a = a.connectionOffsetY + a.height, this.RTL_ ? this.steps_ += Blockly.utils.svgPaths.moveTo(this.info_.startX, a) : (this.steps_ += Blockly.utils.svgPaths.moveTo(this.info_.startX + this.highlightOffset_, this.info_.bottomRow.baseline - this.highlightOffset_), this.steps_ += Blockly.utils.svgPaths.lineOnAxis("V", a)), this.steps_ += this.puzzleTabPaths_.pathUp(this.RTL_));
    this.RTL_ || (a = this.info_.topRow, Blockly.blockRendering.Types.isLeftRoundedCorner(a.elements[0]) ?
        this.steps_ += Blockly.utils.svgPaths.lineOnAxis("V", this.outsideCornerPaths_.height) : this.steps_ += Blockly.utils.svgPaths.lineOnAxis("V", a.capline + this.highlightOffset_))
};
Blockly.geras.Highlighter.prototype.drawInlineInput = function(a) {
    var b = this.highlightOffset_,
        c = a.xPos + a.connectionWidth,
        d = a.centerline - a.height / 2,
        e = a.width - a.connectionWidth,
        f = d + b;
    this.RTL_ ? (d = a.connectionOffsetY - b, a = a.height - (a.connectionOffsetY + a.connectionHeight) + b, this.inlineSteps_ += Blockly.utils.svgPaths.moveTo(c - b, f) + Blockly.utils.svgPaths.lineOnAxis("v", d) + this.puzzleTabPaths_.pathDown(this.RTL_) + Blockly.utils.svgPaths.lineOnAxis("v", a) + Blockly.utils.svgPaths.lineOnAxis("h", e)) : this.inlineSteps_ +=
        Blockly.utils.svgPaths.moveTo(a.xPos + a.width + b, f) + Blockly.utils.svgPaths.lineOnAxis("v", a.height) + Blockly.utils.svgPaths.lineOnAxis("h", -e) + Blockly.utils.svgPaths.moveTo(c, d + a.connectionOffsetY) + this.puzzleTabPaths_.pathDown(this.RTL_)
};
Blockly.geras.InlineInput = function(a, b) {
    Blockly.geras.InlineInput.superClass_.constructor.call(this, a, b);
    this.connectedBlock && (this.width += this.constants_.DARK_PATH_OFFSET, this.height += this.constants_.DARK_PATH_OFFSET)
};
Blockly.utils.object.inherits(Blockly.geras.InlineInput, Blockly.blockRendering.InlineInput);
Blockly.geras.StatementInput = function(a, b) {
    Blockly.geras.StatementInput.superClass_.constructor.call(this, a, b);
    this.connectedBlock && (this.height += this.constants_.DARK_PATH_OFFSET)
};
Blockly.utils.object.inherits(Blockly.geras.StatementInput, Blockly.blockRendering.StatementInput);
Blockly.geras.RenderInfo = function(a, b) { Blockly.geras.RenderInfo.superClass_.constructor.call(this, a, b) };
Blockly.utils.object.inherits(Blockly.geras.RenderInfo, Blockly.blockRendering.RenderInfo);
Blockly.geras.RenderInfo.prototype.getRenderer = function() { return this.renderer_ };
Blockly.geras.RenderInfo.prototype.populateBottomRow_ = function() {
    Blockly.geras.RenderInfo.superClass_.populateBottomRow_.call(this);
    this.block_.inputList.length && this.block_.inputList[this.block_.inputList.length - 1].type == Blockly.NEXT_STATEMENT || (this.bottomRow.minHeight = this.constants_.MEDIUM_PADDING - this.constants_.DARK_PATH_OFFSET)
};
Blockly.geras.RenderInfo.prototype.addInput_ = function(a, b) {
    this.isInline && a.type == Blockly.INPUT_VALUE ? (b.elements.push(new Blockly.geras.InlineInput(this.constants_, a)), b.hasInlineInput = !0) : a.type == Blockly.NEXT_STATEMENT ? (b.elements.push(new Blockly.geras.StatementInput(this.constants_, a)), b.hasStatement = !0) : a.type == Blockly.INPUT_VALUE ? (b.elements.push(new Blockly.blockRendering.ExternalValueInput(this.constants_, a)), b.hasExternalInput = !0) : a.type == Blockly.DUMMY_INPUT && (b.minHeight = Math.max(b.minHeight,
        this.constants_.DUMMY_INPUT_MIN_HEIGHT), b.hasDummyInput = !0);
    this.isInline || null != b.align || (b.align = a.align)
};
Blockly.geras.RenderInfo.prototype.addElemSpacing_ = function() {
    for (var a = !1, b = 0, c; c = this.rows[b]; b++) c.hasExternalInput && (a = !0);
    for (b = 0; c = this.rows[b]; b++) {
        var d = c.elements;
        c.elements = [];
        c.startsWithElemSpacer() && c.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, this.getInRowSpacing_(null, d[0])));
        if (d.length) {
            for (var e = 0; e < d.length - 1; e++) {
                c.elements.push(d[e]);
                var f = this.getInRowSpacing_(d[e], d[e + 1]);
                c.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, f))
            }
            c.elements.push(d[d.length -
                1]);
            c.endsWithElemSpacer() && (f = this.getInRowSpacing_(d[d.length - 1], null), a && c.hasDummyInput && (f += this.constants_.TAB_WIDTH), c.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, f)))
        }
    }
};
Blockly.geras.RenderInfo.prototype.getInRowSpacing_ = function(a, b) {
    if (!a) return b && Blockly.blockRendering.Types.isField(b) && b.isEditable ? this.constants_.MEDIUM_PADDING : b && Blockly.blockRendering.Types.isInlineInput(b) ? this.constants_.MEDIUM_LARGE_PADDING : b && Blockly.blockRendering.Types.isStatementInput(b) ? this.constants_.STATEMENT_INPUT_PADDING_LEFT : this.constants_.LARGE_PADDING;
    if (!Blockly.blockRendering.Types.isInput(a) && (!b || Blockly.blockRendering.Types.isStatementInput(b))) return Blockly.blockRendering.Types.isField(a) &&
        a.isEditable ? this.constants_.MEDIUM_PADDING : Blockly.blockRendering.Types.isIcon(a) ? 2 * this.constants_.LARGE_PADDING + 1 : Blockly.blockRendering.Types.isHat(a) ? this.constants_.NO_PADDING : Blockly.blockRendering.Types.isPreviousOrNextConnection(a) ? this.constants_.LARGE_PADDING : Blockly.blockRendering.Types.isLeftRoundedCorner(a) ? this.constants_.MIN_BLOCK_WIDTH : Blockly.blockRendering.Types.isJaggedEdge(a) ? this.constants_.NO_PADDING : this.constants_.LARGE_PADDING;
    if (Blockly.blockRendering.Types.isInput(a) &&
        !b) { if (Blockly.blockRendering.Types.isExternalInput(a)) return this.constants_.NO_PADDING; if (Blockly.blockRendering.Types.isInlineInput(a)) return this.constants_.LARGE_PADDING; if (Blockly.blockRendering.Types.isStatementInput(a)) return this.constants_.NO_PADDING }
    if (!Blockly.blockRendering.Types.isInput(a) && b && Blockly.blockRendering.Types.isInput(b)) {
        if (Blockly.blockRendering.Types.isField(a) && a.isEditable) { if (Blockly.blockRendering.Types.isInlineInput(b) || Blockly.blockRendering.Types.isExternalInput(b)) return this.constants_.SMALL_PADDING } else {
            if (Blockly.blockRendering.Types.isInlineInput(b) ||
                Blockly.blockRendering.Types.isExternalInput(b)) return this.constants_.MEDIUM_LARGE_PADDING;
            if (Blockly.blockRendering.Types.isStatementInput(b)) return this.constants_.LARGE_PADDING
        }
        return this.constants_.LARGE_PADDING - 1
    }
    if (Blockly.blockRendering.Types.isIcon(a) && b && !Blockly.blockRendering.Types.isInput(b)) return this.constants_.LARGE_PADDING;
    if (Blockly.blockRendering.Types.isInlineInput(a) && b && Blockly.blockRendering.Types.isField(b)) return b.isEditable ? this.constants_.MEDIUM_PADDING : this.constants_.LARGE_PADDING;
    if (Blockly.blockRendering.Types.isLeftSquareCorner(a) && b) { if (Blockly.blockRendering.Types.isHat(b)) return this.constants_.NO_PADDING; if (Blockly.blockRendering.Types.isPreviousConnection(b)) return b.notchOffset; if (Blockly.blockRendering.Types.isNextConnection(b)) return a = (this.RTL ? 1 : -1) * this.constants_.DARK_PATH_OFFSET / 2, b.notchOffset + a }
    if (Blockly.blockRendering.Types.isLeftRoundedCorner(a) && b) {
        if (Blockly.blockRendering.Types.isPreviousConnection(b)) return b.notchOffset - this.constants_.CORNER_RADIUS;
        if (Blockly.blockRendering.Types.isNextConnection(b)) return a = (this.RTL ? 1 : -1) * this.constants_.DARK_PATH_OFFSET / 2, b.notchOffset - this.constants_.CORNER_RADIUS + a
    }
    return Blockly.blockRendering.Types.isField(a) && b && Blockly.blockRendering.Types.isField(b) && a.isEditable == b.isEditable || b && Blockly.blockRendering.Types.isJaggedEdge(b) ? this.constants_.LARGE_PADDING : this.constants_.MEDIUM_PADDING
};
Blockly.geras.RenderInfo.prototype.getSpacerRowHeight_ = function(a, b) {
    return Blockly.blockRendering.Types.isTopRow(a) && Blockly.blockRendering.Types.isBottomRow(b) ? this.constants_.EMPTY_BLOCK_SPACER_HEIGHT : Blockly.blockRendering.Types.isTopRow(a) || Blockly.blockRendering.Types.isBottomRow(b) ? this.constants_.NO_PADDING : a.hasExternalInput && b.hasExternalInput ? this.constants_.LARGE_PADDING : !a.hasStatement && b.hasStatement ? this.constants_.BETWEEN_STATEMENT_PADDING_Y : a.hasStatement && b.hasStatement || !a.hasStatement &&
        b.hasDummyInput || a.hasDummyInput ? this.constants_.LARGE_PADDING : this.constants_.MEDIUM_PADDING
};
Blockly.geras.RenderInfo.prototype.getElemCenterline_ = function(a, b) {
    if (Blockly.blockRendering.Types.isSpacer(b)) return a.yPos + b.height / 2;
    if (Blockly.blockRendering.Types.isBottomRow(a)) return a = a.yPos + a.height - a.descenderHeight, Blockly.blockRendering.Types.isNextConnection(b) ? a + b.height / 2 : a - b.height / 2;
    if (Blockly.blockRendering.Types.isTopRow(a)) return Blockly.blockRendering.Types.isHat(b) ? a.capline - b.height / 2 : a.capline + b.height / 2;
    var c = a.yPos;
    Blockly.blockRendering.Types.isField(b) || Blockly.blockRendering.Types.isIcon(b) ?
        (c += b.height / 2, (a.hasInlineInput || a.hasStatement) && b.height + this.constants_.TALL_INPUT_FIELD_OFFSET_Y <= a.height && (c += this.constants_.TALL_INPUT_FIELD_OFFSET_Y)) : c = Blockly.blockRendering.Types.isInlineInput(b) ? c + b.height / 2 : c + a.height / 2;
    return c
};
Blockly.geras.RenderInfo.prototype.alignRowElements_ = function() {
    if (this.isInline) {
        for (var a = 0, b = null, c = this.rows.length - 1, d; d = this.rows[c]; c--) d.nextRightEdge = a, Blockly.blockRendering.Types.isInputRow(d) && (d.hasStatement && this.alignStatementRow_(d), b && b.hasStatement && d.width < b.width ? d.nextRightEdge = b.width : a = d.width, b = d);
        for (c = a = 0; d = this.rows[c]; c++) d.hasStatement ? a = this.getDesiredRowWidth_(d) : Blockly.blockRendering.Types.isSpacer(d) ? d.width = Math.max(a, d.nextRightEdge) : (a = Math.max(a, d.nextRightEdge) -
            d.width, 0 < a && this.addAlignmentPadding_(d, a), a = d.width)
    } else Blockly.geras.RenderInfo.superClass_.alignRowElements_.call(this)
};
Blockly.geras.RenderInfo.prototype.getDesiredRowWidth_ = function(a) { return this.isInline && a.hasStatement ? this.statementEdge + this.constants_.MAX_BOTTOM_WIDTH + this.startX : Blockly.geras.RenderInfo.superClass_.getDesiredRowWidth_.call(this, a) };
Blockly.geras.RenderInfo.prototype.finalize_ = function() {
    for (var a = 0, b = 0, c = 0, d; d = this.rows[c]; c++) {
        d.yPos = b;
        d.xPos = this.startX;
        b += d.height;
        a = Math.max(a, d.widthWithConnectedBlocks);
        var e = b - this.topRow.ascenderHeight;
        d == this.bottomRow && e < this.constants_.MIN_BLOCK_HEIGHT && (e = this.constants_.MIN_BLOCK_HEIGHT - e, this.bottomRow.height += e, b += e);
        this.recordElemPositions_(d)
    }
    this.outputConnection && this.block_.nextConnection && this.block_.nextConnection.isConnected() && (a = Math.max(a, this.block_.nextConnection.targetBlock().getHeightWidth().width -
        this.constants_.DARK_PATH_OFFSET));
    this.bottomRow.baseline = b - this.bottomRow.descenderHeight;
    this.widthWithChildren = a + this.startX + this.constants_.DARK_PATH_OFFSET;
    this.width += this.constants_.DARK_PATH_OFFSET;
    this.height = b + this.constants_.DARK_PATH_OFFSET;
    this.startY = this.topRow.capline
};
Blockly.geras.Drawer = function(a, b) {
    Blockly.geras.Drawer.superClass_.constructor.call(this, a, b);
    this.highlighter_ = new Blockly.geras.Highlighter(b)
};
Blockly.utils.object.inherits(Blockly.geras.Drawer, Blockly.blockRendering.Drawer);
Blockly.geras.Drawer.prototype.draw = function() {
    this.hideHiddenIcons_();
    this.drawOutline_();
    this.drawInternals_();
    var a = this.block_.pathObject;
    a.setPath(this.outlinePath_ + "\n" + this.inlinePath_);
    a.setHighlightPath(this.highlighter_.getPath());
    this.info_.RTL && a.flipRTL();
    Blockly.blockRendering.useDebugger && this.block_.renderingDebugger.drawDebug(this.block_, this.info_);
    this.recordSizeOnBlock_()
};
Blockly.geras.Drawer.prototype.drawTop_ = function() {
    this.highlighter_.drawTopCorner(this.info_.topRow);
    this.highlighter_.drawRightSideRow(this.info_.topRow);
    Blockly.geras.Drawer.superClass_.drawTop_.call(this)
};
Blockly.geras.Drawer.prototype.drawJaggedEdge_ = function(a) {
    this.highlighter_.drawJaggedEdge_(a);
    Blockly.geras.Drawer.superClass_.drawJaggedEdge_.call(this, a)
};
Blockly.geras.Drawer.prototype.drawValueInput_ = function(a) {
    this.highlighter_.drawValueInput(a);
    Blockly.geras.Drawer.superClass_.drawValueInput_.call(this, a)
};
Blockly.geras.Drawer.prototype.drawStatementInput_ = function(a) {
    this.highlighter_.drawStatementInput(a);
    Blockly.geras.Drawer.superClass_.drawStatementInput_.call(this, a)
};
Blockly.geras.Drawer.prototype.drawRightSideRow_ = function(a) {
    this.highlighter_.drawRightSideRow(a);
    this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("H", a.xPos + a.width) + Blockly.utils.svgPaths.lineOnAxis("V", a.yPos + a.height)
};
Blockly.geras.Drawer.prototype.drawBottom_ = function() {
    this.highlighter_.drawBottomRow(this.info_.bottomRow);
    Blockly.geras.Drawer.superClass_.drawBottom_.call(this)
};
Blockly.geras.Drawer.prototype.drawLeft_ = function() {
    this.highlighter_.drawLeft();
    Blockly.geras.Drawer.superClass_.drawLeft_.call(this)
};
Blockly.geras.Drawer.prototype.drawInlineInput_ = function(a) {
    this.highlighter_.drawInlineInput(a);
    Blockly.geras.Drawer.superClass_.drawInlineInput_.call(this, a)
};
Blockly.geras.Drawer.prototype.positionInlineInputConnection_ = function(a) {
    var b = a.centerline - a.height / 2;
    if (a.connectionModel) {
        var c = a.xPos + a.connectionWidth + this.constants_.DARK_PATH_OFFSET;
        this.info_.RTL && (c *= -1);
        a.connectionModel.setOffsetInBlock(c, b + a.connectionOffsetY + this.constants_.DARK_PATH_OFFSET)
    }
};
Blockly.geras.Drawer.prototype.positionStatementInputConnection_ = function(a) {
    var b = a.getLastInput();
    if (b.connectionModel) {
        var c = a.xPos + a.statementEdge + b.notchOffset;
        c = this.info_.RTL ? -1 * c : c + this.constants_.DARK_PATH_OFFSET;
        b.connectionModel.setOffsetInBlock(c, a.yPos + this.constants_.DARK_PATH_OFFSET)
    }
};
Blockly.geras.Drawer.prototype.positionExternalValueConnection_ = function(a) {
    var b = a.getLastInput();
    if (b.connectionModel) {
        var c = a.xPos + a.width + this.constants_.DARK_PATH_OFFSET;
        this.info_.RTL && (c *= -1);
        b.connectionModel.setOffsetInBlock(c, a.yPos)
    }
};
Blockly.geras.Drawer.prototype.positionNextConnection_ = function() {
    var a = this.info_.bottomRow;
    if (a.connection) {
        var b = a.connection,
            c = b.xPos;
        b.connectionModel.setOffsetInBlock((this.info_.RTL ? -c : c) + this.constants_.DARK_PATH_OFFSET / 2, a.baseline + this.constants_.DARK_PATH_OFFSET)
    }
};
Blockly.geras.HighlightConstantProvider = function(a) {
    this.constantProvider = a;
    this.OFFSET = .5;
    this.START_POINT = Blockly.utils.svgPaths.moveBy(this.OFFSET, this.OFFSET)
};
Blockly.geras.HighlightConstantProvider.prototype.init = function() {
    this.INSIDE_CORNER = this.makeInsideCorner();
    this.OUTSIDE_CORNER = this.makeOutsideCorner();
    this.PUZZLE_TAB = this.makePuzzleTab();
    this.NOTCH = this.makeNotch();
    this.JAGGED_TEETH = this.makeJaggedTeeth();
    this.START_HAT = this.makeStartHat()
};
Blockly.geras.HighlightConstantProvider.prototype.makeInsideCorner = function() {
    var a = this.constantProvider.CORNER_RADIUS,
        b = this.OFFSET,
        c = (1 - Math.SQRT1_2) * (a + b) - b,
        d = Blockly.utils.svgPaths.moveBy(c, c) + Blockly.utils.svgPaths.arc("a", "0 0,0", a, Blockly.utils.svgPaths.point(-c - b, a - c)),
        e = Blockly.utils.svgPaths.arc("a", "0 0,0", a + b, Blockly.utils.svgPaths.point(a + b, a + b)),
        f = Blockly.utils.svgPaths.moveBy(c, -c) + Blockly.utils.svgPaths.arc("a", "0 0,0", a + b, Blockly.utils.svgPaths.point(a - c, c + b));
    return {
        width: a + b,
        height: a,
        pathTop: function(a) { return a ? d : "" },
        pathBottom: function(a) { return a ? e : f }
    }
};
Blockly.geras.HighlightConstantProvider.prototype.makeOutsideCorner = function() {
    var a = this.constantProvider.CORNER_RADIUS,
        b = this.OFFSET,
        c = (1 - Math.SQRT1_2) * (a - b) + b,
        d = Blockly.utils.svgPaths.moveBy(c, c) + Blockly.utils.svgPaths.arc("a", "0 0,1", a - b, Blockly.utils.svgPaths.point(a - c, -c + b)),
        e = Blockly.utils.svgPaths.moveBy(b, a) + Blockly.utils.svgPaths.arc("a", "0 0,1", a - b, Blockly.utils.svgPaths.point(a, -a + b)),
        f = -c,
        g = Blockly.utils.svgPaths.moveBy(c, f) + Blockly.utils.svgPaths.arc("a", "0 0,1", a - b, Blockly.utils.svgPaths.point(-c +
            b, -f - a));
    return { height: a, topLeft: function(a) { return a ? d : e }, bottomLeft: function() { return g } }
};
Blockly.geras.HighlightConstantProvider.prototype.makePuzzleTab = function() {
    var a = this.constantProvider.TAB_WIDTH,
        b = this.constantProvider.TAB_HEIGHT,
        c = Blockly.utils.svgPaths.moveBy(-2, -b + 3.4) + Blockly.utils.svgPaths.lineTo(-.45 * a, -2.1),
        d = Blockly.utils.svgPaths.lineOnAxis("v", 2.5) + Blockly.utils.svgPaths.moveBy(.97 * -a, 2.5) + Blockly.utils.svgPaths.curve("q", [Blockly.utils.svgPaths.point(.05 * -a, 10), Blockly.utils.svgPaths.point(.3 * a, 9.5)]) + Blockly.utils.svgPaths.moveBy(.67 * a, -1.9) + Blockly.utils.svgPaths.lineOnAxis("v",
            2.5),
        e = Blockly.utils.svgPaths.lineOnAxis("v", -1.5) + Blockly.utils.svgPaths.moveBy(-.92 * a, -.5) + Blockly.utils.svgPaths.curve("q", [Blockly.utils.svgPaths.point(-.19 * a, -5.5), Blockly.utils.svgPaths.point(0, -11)]) + Blockly.utils.svgPaths.moveBy(.92 * a, 1),
        f = Blockly.utils.svgPaths.moveBy(-5, b - .7) + Blockly.utils.svgPaths.lineTo(.46 * a, -2.1);
    return { width: a, height: b, pathUp: function(a) { return a ? c : e }, pathDown: function(a) { return a ? d : f } }
};
Blockly.geras.HighlightConstantProvider.prototype.makeNotch = function() { return { pathLeft: Blockly.utils.svgPaths.lineOnAxis("h", this.OFFSET) + this.constantProvider.NOTCH.pathLeft } };
Blockly.geras.HighlightConstantProvider.prototype.makeJaggedTeeth = function() { return { pathLeft: Blockly.utils.svgPaths.lineTo(5.1, 2.6) + Blockly.utils.svgPaths.moveBy(-10.2, 6.8) + Blockly.utils.svgPaths.lineTo(5.1, 2.6), height: 12, width: 10.2 } };
Blockly.geras.HighlightConstantProvider.prototype.makeStartHat = function() {
    var a = this.constantProvider.START_HAT.height,
        b = Blockly.utils.svgPaths.moveBy(25, -8.7) + Blockly.utils.svgPaths.curve("c", [Blockly.utils.svgPaths.point(29.7, -6.2), Blockly.utils.svgPaths.point(57.2, -.5), Blockly.utils.svgPaths.point(75, 8.7)]),
        c = Blockly.utils.svgPaths.curve("c", [Blockly.utils.svgPaths.point(17.8, -9.2), Blockly.utils.svgPaths.point(45.3, -14.9), Blockly.utils.svgPaths.point(75, -8.7)]) + Blockly.utils.svgPaths.moveTo(100.5,
            a + .5);
    return { path: function(a) { return a ? b : c } }
};
Blockly.geras.PathObject = function(a, b, c) {
    this.constants = c;
    this.svgRoot = a;
    this.svgPathDark = Blockly.utils.dom.createSvgElement("path", { "class": "blocklyPathDark", transform: "translate(1,1)" }, this.svgRoot);
    this.svgPath = Blockly.utils.dom.createSvgElement("path", { "class": "blocklyPath" }, this.svgRoot);
    this.svgPathLight = Blockly.utils.dom.createSvgElement("path", { "class": "blocklyPathLight" }, this.svgRoot);
    this.colourDark = "#000000";
    this.style = b
};
Blockly.utils.object.inherits(Blockly.geras.PathObject, Blockly.blockRendering.PathObject);
Blockly.geras.PathObject.prototype.setPath = function(a) {
    this.svgPath.setAttribute("d", a);
    this.svgPathDark.setAttribute("d", a)
};
Blockly.geras.PathObject.prototype.setHighlightPath = function(a) { this.svgPathLight.setAttribute("d", a) };
Blockly.geras.PathObject.prototype.flipRTL = function() {
    this.svgPath.setAttribute("transform", "scale(-1 1)");
    this.svgPathLight.setAttribute("transform", "scale(-1 1)");
    this.svgPathDark.setAttribute("transform", "translate(1,1) scale(-1 1)")
};
Blockly.geras.PathObject.prototype.applyColour = function(a) {
    this.svgPathLight.style.display = "";
    this.svgPathDark.style.display = "";
    this.svgPathLight.setAttribute("stroke", this.style.colourTertiary);
    this.svgPathDark.setAttribute("fill", this.colourDark);
    Blockly.geras.PathObject.superClass_.applyColour.call(this, a);
    this.svgPath.setAttribute("stroke", "none")
};
Blockly.geras.PathObject.prototype.setStyle = function(a) {
    this.style = a;
    this.colourDark = Blockly.utils.colour.blend("#000", this.style.colourPrimary, .2) || this.colourDark
};
Blockly.geras.PathObject.prototype.updateHighlighted = function(a) { a ? (this.svgPath.setAttribute("filter", "url(#" + this.constants.embossFilterId + ")"), this.svgPathLight.style.display = "none") : (this.svgPath.setAttribute("filter", "none"), this.svgPathLight.style.display = "inline") };
Blockly.geras.PathObject.prototype.updateShadow_ = function(a) { a && (this.svgPathLight.style.display = "none", this.svgPathDark.setAttribute("fill", this.style.colourSecondary), this.svgPath.setAttribute("stroke", "none"), this.svgPath.setAttribute("fill", this.style.colourSecondary)) };
Blockly.geras.PathObject.prototype.updateDisabled_ = function(a) {
    Blockly.geras.PathObject.superClass_.updateDisabled_.call(this, a);
    a && this.svgPath.setAttribute("stroke", "none")
};
Blockly.geras.Renderer = function(a) {
    Blockly.geras.Renderer.superClass_.constructor.call(this, a);
    this.highlightConstants_ = null
};
Blockly.utils.object.inherits(Blockly.geras.Renderer, Blockly.blockRendering.Renderer);
Blockly.geras.Renderer.prototype.init = function(a, b) {
    Blockly.geras.Renderer.superClass_.init.call(this, a, b);
    this.highlightConstants_ = this.makeHighlightConstants_();
    this.highlightConstants_.init()
};
Blockly.geras.Renderer.prototype.refreshDom = function(a, b) {
    Blockly.geras.Renderer.superClass_.refreshDom.call(this, a, b);
    this.getHighlightConstants().init()
};
Blockly.geras.Renderer.prototype.makeConstants_ = function() { return new Blockly.geras.ConstantProvider };
Blockly.geras.Renderer.prototype.makeRenderInfo_ = function(a) { return new Blockly.geras.RenderInfo(this, a) };
Blockly.geras.Renderer.prototype.makeDrawer_ = function(a, b) { return new Blockly.geras.Drawer(a, b) };
Blockly.geras.Renderer.prototype.makePathObject = function(a, b) { return new Blockly.geras.PathObject(a, b, this.getConstants()) };
Blockly.geras.Renderer.prototype.makeHighlightConstants_ = function() { return new Blockly.geras.HighlightConstantProvider(this.getConstants()) };
Blockly.geras.Renderer.prototype.getHighlightConstants = function() { return this.highlightConstants_ };
Blockly.blockRendering.register("geras", Blockly.geras.Renderer);
Blockly.thrasos = {};
Blockly.thrasos.RenderInfo = function(a, b) { Blockly.thrasos.RenderInfo.superClass_.constructor.call(this, a, b) };
Blockly.utils.object.inherits(Blockly.thrasos.RenderInfo, Blockly.blockRendering.RenderInfo);
Blockly.thrasos.RenderInfo.prototype.getRenderer = function() { return this.renderer_ };
Blockly.thrasos.RenderInfo.prototype.addElemSpacing_ = function() {
    for (var a = !1, b = 0, c; c = this.rows[b]; b++) c.hasExternalInput && (a = !0);
    for (b = 0; c = this.rows[b]; b++) {
        var d = c.elements;
        c.elements = [];
        c.startsWithElemSpacer() && c.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, this.getInRowSpacing_(null, d[0])));
        for (var e = 0; e < d.length - 1; e++) {
            c.elements.push(d[e]);
            var f = this.getInRowSpacing_(d[e], d[e + 1]);
            c.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, f))
        }
        c.elements.push(d[d.length -
            1]);
        c.endsWithElemSpacer() && (f = this.getInRowSpacing_(d[d.length - 1], null), a && c.hasDummyInput && (f += this.constants_.TAB_WIDTH), c.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, f)))
    }
};
Blockly.thrasos.RenderInfo.prototype.getInRowSpacing_ = function(a, b) {
    if (!a) return b && Blockly.blockRendering.Types.isField(b) && b.isEditable ? this.constants_.MEDIUM_PADDING : b && Blockly.blockRendering.Types.isInlineInput(b) ? this.constants_.MEDIUM_LARGE_PADDING : b && Blockly.blockRendering.Types.isStatementInput(b) ? this.constants_.STATEMENT_INPUT_PADDING_LEFT : this.constants_.LARGE_PADDING;
    if (!Blockly.blockRendering.Types.isInput(a) && !b) return Blockly.blockRendering.Types.isField(a) && a.isEditable ? this.constants_.MEDIUM_PADDING :
        Blockly.blockRendering.Types.isIcon(a) ? 2 * this.constants_.LARGE_PADDING + 1 : Blockly.blockRendering.Types.isHat(a) ? this.constants_.NO_PADDING : Blockly.blockRendering.Types.isPreviousOrNextConnection(a) ? this.constants_.LARGE_PADDING : Blockly.blockRendering.Types.isLeftRoundedCorner(a) ? this.constants_.MIN_BLOCK_WIDTH : Blockly.blockRendering.Types.isJaggedEdge(a) ? this.constants_.NO_PADDING : this.constants_.LARGE_PADDING;
    if (Blockly.blockRendering.Types.isInput(a) && !b) {
        if (Blockly.blockRendering.Types.isExternalInput(a)) return this.constants_.NO_PADDING;
        if (Blockly.blockRendering.Types.isInlineInput(a)) return this.constants_.LARGE_PADDING;
        if (Blockly.blockRendering.Types.isStatementInput(a)) return this.constants_.NO_PADDING
    }
    if (!Blockly.blockRendering.Types.isInput(a) && b && Blockly.blockRendering.Types.isInput(b)) {
        if (Blockly.blockRendering.Types.isField(a) && a.isEditable) { if (Blockly.blockRendering.Types.isInlineInput(b) || Blockly.blockRendering.Types.isExternalInput(b)) return this.constants_.SMALL_PADDING } else {
            if (Blockly.blockRendering.Types.isInlineInput(b) ||
                Blockly.blockRendering.Types.isExternalInput(b)) return this.constants_.MEDIUM_LARGE_PADDING;
            if (Blockly.blockRendering.Types.isStatementInput(b)) return this.constants_.LARGE_PADDING
        }
        return this.constants_.LARGE_PADDING - 1
    }
    if (Blockly.blockRendering.Types.isIcon(a) && b && !Blockly.blockRendering.Types.isInput(b)) return this.constants_.LARGE_PADDING;
    if (Blockly.blockRendering.Types.isInlineInput(a) && b && Blockly.blockRendering.Types.isField(b)) return b.isEditable ? this.constants_.MEDIUM_PADDING : this.constants_.LARGE_PADDING;
    if (Blockly.blockRendering.Types.isLeftSquareCorner(a) && b) { if (Blockly.blockRendering.Types.isHat(b)) return this.constants_.NO_PADDING; if (Blockly.blockRendering.Types.isPreviousConnection(b) || Blockly.blockRendering.Types.isNextConnection(b)) return b.notchOffset }
    return Blockly.blockRendering.Types.isLeftRoundedCorner(a) && b ? b.notchOffset - this.constants_.CORNER_RADIUS : Blockly.blockRendering.Types.isField(a) && b && Blockly.blockRendering.Types.isField(b) && a.isEditable == b.isEditable || b && Blockly.blockRendering.Types.isJaggedEdge(b) ?
        this.constants_.LARGE_PADDING : this.constants_.MEDIUM_PADDING
};
Blockly.thrasos.RenderInfo.prototype.getSpacerRowHeight_ = function(a, b) {
    return Blockly.blockRendering.Types.isTopRow(a) && Blockly.blockRendering.Types.isBottomRow(b) ? this.constants_.EMPTY_BLOCK_SPACER_HEIGHT : Blockly.blockRendering.Types.isTopRow(a) || Blockly.blockRendering.Types.isBottomRow(b) ? this.constants_.NO_PADDING : a.hasExternalInput && b.hasExternalInput ? this.constants_.LARGE_PADDING : !a.hasStatement && b.hasStatement ? this.constants_.BETWEEN_STATEMENT_PADDING_Y : a.hasStatement && b.hasStatement || a.hasDummyInput ||
        b.hasDummyInput ? this.constants_.LARGE_PADDING : this.constants_.MEDIUM_PADDING
};
Blockly.thrasos.RenderInfo.prototype.getElemCenterline_ = function(a, b) {
    if (Blockly.blockRendering.Types.isSpacer(b)) return a.yPos + b.height / 2;
    if (Blockly.blockRendering.Types.isBottomRow(a)) return a = a.yPos + a.height - a.descenderHeight, Blockly.blockRendering.Types.isNextConnection(b) ? a + b.height / 2 : a - b.height / 2;
    if (Blockly.blockRendering.Types.isTopRow(a)) return Blockly.blockRendering.Types.isHat(b) ? a.capline - b.height / 2 : a.capline + b.height / 2;
    var c = a.yPos;
    return c = Blockly.blockRendering.Types.isField(b) && a.hasStatement ?
        c + (this.constants_.TALL_INPUT_FIELD_OFFSET_Y + b.height / 2) : c + a.height / 2
};
Blockly.thrasos.RenderInfo.prototype.finalize_ = function() {
    for (var a = 0, b = 0, c = 0, d; d = this.rows[c]; c++) {
        d.yPos = b;
        d.xPos = this.startX;
        b += d.height;
        a = Math.max(a, d.widthWithConnectedBlocks);
        var e = b - this.topRow.ascenderHeight;
        d == this.bottomRow && e < this.constants_.MIN_BLOCK_HEIGHT && (e = this.constants_.MIN_BLOCK_HEIGHT - e, this.bottomRow.height += e, b += e);
        this.recordElemPositions_(d)
    }
    this.outputConnection && this.block_.nextConnection && this.block_.nextConnection.isConnected() && (a = Math.max(a, this.block_.nextConnection.targetBlock().getHeightWidth().width));
    this.bottomRow.baseline = b - this.bottomRow.descenderHeight;
    this.widthWithChildren = a + this.startX;
    this.height = b;
    this.startY = this.topRow.capline
};
Blockly.thrasos.Renderer = function(a) { Blockly.thrasos.Renderer.superClass_.constructor.call(this, a) };
Blockly.utils.object.inherits(Blockly.thrasos.Renderer, Blockly.blockRendering.Renderer);
Blockly.thrasos.Renderer.prototype.makeRenderInfo_ = function(a) { return new Blockly.thrasos.RenderInfo(this, a) };
Blockly.blockRendering.register("thrasos", Blockly.thrasos.Renderer);
Blockly.zelos = {};
Blockly.zelos.ConstantProvider = function() {
    Blockly.zelos.ConstantProvider.superClass_.constructor.call(this);
    this.SMALL_PADDING = this.GRID_UNIT = 3.8;
    this.MEDIUM_PADDING = 2 * this.GRID_UNIT;
    this.MEDIUM_LARGE_PADDING = 3 * this.GRID_UNIT;
    this.LARGE_PADDING = 4 * this.GRID_UNIT;
    this.CORNER_RADIUS = 1 * this.GRID_UNIT;
    this.NOTCH_WIDTH = 9 * this.GRID_UNIT;
    this.NOTCH_HEIGHT = 2 * this.GRID_UNIT;
    this.STATEMENT_INPUT_NOTCH_OFFSET = this.NOTCH_OFFSET_LEFT = 3 * this.GRID_UNIT;
    this.MIN_BLOCK_WIDTH = 2 * this.GRID_UNIT;
    this.MIN_BLOCK_HEIGHT = 12 *
        this.GRID_UNIT;
    this.EMPTY_STATEMENT_INPUT_HEIGHT = 6 * this.GRID_UNIT;
    this.TAB_OFFSET_FROM_TOP = 0;
    this.TOP_ROW_MIN_HEIGHT = this.CORNER_RADIUS;
    this.TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT = this.LARGE_PADDING;
    this.BOTTOM_ROW_MIN_HEIGHT = this.CORNER_RADIUS;
    this.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT = 6 * this.GRID_UNIT;
    this.STATEMENT_BOTTOM_SPACER = -this.NOTCH_HEIGHT;
    this.STATEMENT_INPUT_SPACER_MIN_WIDTH = 40 * this.GRID_UNIT;
    this.STATEMENT_INPUT_PADDING_LEFT = 4 * this.GRID_UNIT;
    this.EMPTY_INLINE_INPUT_PADDING = 4 * this.GRID_UNIT;
    this.EMPTY_INLINE_INPUT_HEIGHT = 8 * this.GRID_UNIT;
    this.DUMMY_INPUT_MIN_HEIGHT = this.TAB_HEIGHT;
    this.DUMMY_INPUT_SHADOW_MIN_HEIGHT = this.TAB_HEIGHT;
    this.CURSOR_WS_WIDTH = 20 * this.GRID_UNIT;
    this.CURSOR_COLOUR = "#ffa200";
    this.CURSOR_RADIUS = 5;
    this.JAGGED_TEETH_WIDTH = this.JAGGED_TEETH_HEIGHT = 0;
    this.START_HAT_HEIGHT = 22;
    this.START_HAT_WIDTH = 96;
    this.SHAPES = { HEXAGONAL: 1, ROUND: 2, SQUARE: 3, PUZZLE: 4, NOTCH: 5 };
    this.SHAPE_IN_SHAPE_PADDING = {
        1: { 0: 5 * this.GRID_UNIT, 1: 2 * this.GRID_UNIT, 2: 5 * this.GRID_UNIT, 3: 5 * this.GRID_UNIT },
        2: { 0: 3 * this.GRID_UNIT, 1: 3 * this.GRID_UNIT, 2: 1 * this.GRID_UNIT, 3: 2 * this.GRID_UNIT },
        3: { 0: 2 * this.GRID_UNIT, 1: 2 * this.GRID_UNIT, 2: 2 * this.GRID_UNIT, 3: 2 * this.GRID_UNIT }
    };
    this.FULL_BLOCK_FIELDS = !0;
    this.FIELD_TEXT_FONTSIZE = 3 * this.GRID_UNIT;
    this.FIELD_TEXT_FONTWEIGHT = "bold";
    this.FIELD_TEXT_FONTFAMILY = '"Helvetica Neue", "Segoe UI", Helvetica, sans-serif';
    this.FIELD_BORDER_RECT_RADIUS = this.CORNER_RADIUS;
    this.FIELD_BORDER_RECT_X_PADDING = 2 * this.GRID_UNIT;
    this.FIELD_BORDER_RECT_Y_PADDING = 1.625 * this.GRID_UNIT;
    this.FIELD_BORDER_RECT_HEIGHT =
        8 * this.GRID_UNIT;
    this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = 8 * this.GRID_UNIT;
    this.FIELD_DROPDOWN_SVG_ARROW = this.FIELD_DROPDOWN_COLOURED_DIV = this.FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW = !0;
    this.FIELD_DROPDOWN_SVG_ARROW_PADDING = this.FIELD_BORDER_RECT_X_PADDING;
    this.FIELD_COLOUR_FULL_BLOCK = this.FIELD_TEXTINPUT_BOX_SHADOW = !0;
    this.FIELD_COLOUR_DEFAULT_WIDTH = 2 * this.GRID_UNIT;
    this.FIELD_COLOUR_DEFAULT_HEIGHT = 4 * this.GRID_UNIT;
    this.FIELD_CHECKBOX_X_OFFSET = 1 * this.GRID_UNIT;
    this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH =
        12 * this.GRID_UNIT;
    this.SELECTED_GLOW_COLOUR = "#fff200";
    this.SELECTED_GLOW_SIZE = .5;
    this.REPLACEMENT_GLOW_COLOUR = "#fff200";
    this.REPLACEMENT_GLOW_SIZE = 2;
    this.selectedGlowFilterId = "";
    this.selectedGlowFilter_ = null;
    this.replacementGlowFilterId = "";
    this.replacementGlowFilter_ = null
};
Blockly.utils.object.inherits(Blockly.zelos.ConstantProvider, Blockly.blockRendering.ConstantProvider);
Blockly.zelos.ConstantProvider.prototype.setFontConstants_ = function(a) {
    Blockly.zelos.ConstantProvider.superClass_.setFontConstants_.call(this, a);
    this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = this.FIELD_BORDER_RECT_HEIGHT = this.FIELD_TEXT_HEIGHT + 2 * this.FIELD_BORDER_RECT_Y_PADDING
};
Blockly.zelos.ConstantProvider.prototype.init = function() {
    Blockly.zelos.ConstantProvider.superClass_.init.call(this);
    this.HEXAGONAL = this.makeHexagonal();
    this.ROUNDED = this.makeRounded();
    this.SQUARED = this.makeSquared();
    this.STATEMENT_INPUT_NOTCH_OFFSET = this.NOTCH_OFFSET_LEFT + this.INSIDE_CORNERS.rightWidth
};
Blockly.zelos.ConstantProvider.prototype.setDynamicProperties_ = function(a) {
    Blockly.zelos.ConstantProvider.superClass_.setDynamicProperties_.call(this, a);
    this.SELECTED_GLOW_COLOUR = a.getComponentStyle("selectedGlowColour") || this.SELECTED_GLOW_COLOUR;
    var b = Number(a.getComponentStyle("selectedGlowSize"));
    this.SELECTED_GLOW_SIZE = b && !isNaN(b) ? b : this.SELECTED_GLOW_SIZE;
    this.REPLACEMENT_GLOW_COLOUR = a.getComponentStyle("replacementGlowColour") || this.REPLACEMENT_GLOW_COLOUR;
    this.REPLACEMENT_GLOW_SIZE = (a = Number(a.getComponentStyle("replacementGlowSize"))) &&
        !isNaN(a) ? a : this.REPLACEMENT_GLOW_SIZE
};
Blockly.zelos.ConstantProvider.prototype.dispose = function() {
    Blockly.zelos.ConstantProvider.superClass_.dispose.call(this);
    this.selectedGlowFilter_ && Blockly.utils.dom.removeNode(this.selectedGlowFilter_);
    this.replacementGlowFilter_ && Blockly.utils.dom.removeNode(this.replacementGlowFilter_)
};
Blockly.zelos.ConstantProvider.prototype.makeStartHat = function() {
    var a = this.START_HAT_HEIGHT,
        b = this.START_HAT_WIDTH,
        c = Blockly.utils.svgPaths.curve("c", [Blockly.utils.svgPaths.point(25, -a), Blockly.utils.svgPaths.point(71, -a), Blockly.utils.svgPaths.point(b, 0)]);
    return { height: a, width: b, path: c }
};
Blockly.zelos.ConstantProvider.prototype.makeHexagonal = function() {
    function a(a, d, e) {
        var c = a / 2;
        c = c > b ? b : c;
        e = e ? -1 : 1;
        a = (d ? -1 : 1) * a / 2;
        return Blockly.utils.svgPaths.lineTo(-e * c, a) + Blockly.utils.svgPaths.lineTo(e * c, a)
    }
    var b = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
    return {
        type: this.SHAPES.HEXAGONAL,
        isDynamic: !0,
        width: function(a) { a /= 2; return a > b ? b : a },
        height: function(a) { return a },
        connectionOffsetY: function(a) { return a / 2 },
        connectionOffsetX: function(a) { return -a },
        pathDown: function(b) { return a(b, !1, !1) },
        pathUp: function(b) {
            return a(b, !0, !1)
        },
        pathRightDown: function(b) { return a(b, !1, !0) },
        pathRightUp: function(b) { return a(b, !1, !0) }
    }
};
Blockly.zelos.ConstantProvider.prototype.makeRounded = function() {
    function a(a, b, f) {
        var d = a > c ? a - c : 0;
        a = (a > c ? c : a) / 2;
        return Blockly.utils.svgPaths.arc("a", "0 0,1", a, Blockly.utils.svgPaths.point((b ? -1 : 1) * a, (b ? -1 : 1) * a)) + Blockly.utils.svgPaths.lineOnAxis("v", (f ? 1 : -1) * d) + Blockly.utils.svgPaths.arc("a", "0 0,1", a, Blockly.utils.svgPaths.point((b ? 1 : -1) * a, (b ? -1 : 1) * a))
    }
    var b = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH,
        c = 2 * b;
    return {
        type: this.SHAPES.ROUND,
        isDynamic: !0,
        width: function(a) { a /= 2; return a > b ? b : a },
        height: function(a) { return a },
        connectionOffsetY: function(a) { return a / 2 },
        connectionOffsetX: function(a) { return -a },
        pathDown: function(b) { return a(b, !1, !1) },
        pathUp: function(b) { return a(b, !0, !1) },
        pathRightDown: function(b) { return a(b, !1, !0) },
        pathRightUp: function(b) { return a(b, !1, !0) }
    }
};
Blockly.zelos.ConstantProvider.prototype.makeSquared = function() {
    function a(a, d, e) { a -= 2 * b; return Blockly.utils.svgPaths.arc("a", "0 0,1", b, Blockly.utils.svgPaths.point((d ? -1 : 1) * b, (d ? -1 : 1) * b)) + Blockly.utils.svgPaths.lineOnAxis("v", (e ? 1 : -1) * a) + Blockly.utils.svgPaths.arc("a", "0 0,1", b, Blockly.utils.svgPaths.point((d ? 1 : -1) * b, (d ? -1 : 1) * b)) }
    var b = this.CORNER_RADIUS;
    return {
        type: this.SHAPES.SQUARE,
        isDynamic: !0,
        width: function(a) { return b },
        height: function(a) { return a },
        connectionOffsetY: function(a) { return a / 2 },
        connectionOffsetX: function(a) { return -a },
        pathDown: function(b) { return a(b, !1, !1) },
        pathUp: function(b) { return a(b, !0, !1) },
        pathRightDown: function(b) { return a(b, !1, !0) },
        pathRightUp: function(b) { return a(b, !1, !0) }
    }
};
Blockly.zelos.ConstantProvider.prototype.shapeFor = function(a) {
    var b = a.getCheck();
    !b && a.targetConnection && (b = a.targetConnection.getCheck());
    switch (a.type) {
        case Blockly.INPUT_VALUE:
        case Blockly.OUTPUT_VALUE:
            a = a.getSourceBlock().getOutputShape();
            if (null != a) switch (a) {
                case this.SHAPES.HEXAGONAL:
                    return this.HEXAGONAL;
                case this.SHAPES.ROUND:
                    return this.ROUNDED;
                case this.SHAPES.SQUARE:
                    return this.SQUARED
            }
            if (b && -1 != b.indexOf("Boolean")) return this.HEXAGONAL;
            if (b && -1 != b.indexOf("Number")) return this.ROUNDED;
            b && b.indexOf("String");
            return this.ROUNDED;
        case Blockly.PREVIOUS_STATEMENT:
        case Blockly.NEXT_STATEMENT:
            return this.NOTCH;
        default:
            throw Error("Unknown type");
    }
};
Blockly.zelos.ConstantProvider.prototype.makeNotch = function() {
    function a(a) {
        return Blockly.utils.svgPaths.curve("c", [Blockly.utils.svgPaths.point(a * e / 2, 0), Blockly.utils.svgPaths.point(a * e * 3 / 4, g / 2), Blockly.utils.svgPaths.point(a * e, g)]) + Blockly.utils.svgPaths.line([Blockly.utils.svgPaths.point(a * e, f)]) + Blockly.utils.svgPaths.curve("c", [Blockly.utils.svgPaths.point(a * e / 4, g / 2), Blockly.utils.svgPaths.point(a * e / 2, g), Blockly.utils.svgPaths.point(a * e, g)]) + Blockly.utils.svgPaths.lineOnAxis("h", a * d) + Blockly.utils.svgPaths.curve("c", [Blockly.utils.svgPaths.point(a * e / 2, 0), Blockly.utils.svgPaths.point(a * e * 3 / 4, -(g / 2)), Blockly.utils.svgPaths.point(a * e, -g)]) + Blockly.utils.svgPaths.line([Blockly.utils.svgPaths.point(a * e, -f)]) + Blockly.utils.svgPaths.curve("c", [Blockly.utils.svgPaths.point(a * e / 4, -(g / 2)), Blockly.utils.svgPaths.point(a * e / 2, -g), Blockly.utils.svgPaths.point(a * e, -g)])
    }
    var b = this.NOTCH_WIDTH,
        c = this.NOTCH_HEIGHT,
        d = b / 3,
        e = d / 3,
        f = c / 2,
        g = f / 2,
        h = a(1),
        k = a(-1);
    return { type: this.SHAPES.NOTCH, width: b, height: c, pathLeft: h, pathRight: k }
};
Blockly.zelos.ConstantProvider.prototype.makeInsideCorners = function() {
    var a = this.CORNER_RADIUS,
        b = Blockly.utils.svgPaths.arc("a", "0 0,0", a, Blockly.utils.svgPaths.point(-a, a)),
        c = Blockly.utils.svgPaths.arc("a", "0 0,1", a, Blockly.utils.svgPaths.point(-a, a)),
        d = Blockly.utils.svgPaths.arc("a", "0 0,0", a, Blockly.utils.svgPaths.point(a, a)),
        e = Blockly.utils.svgPaths.arc("a", "0 0,1", a, Blockly.utils.svgPaths.point(a, a));
    return { width: a, height: a, pathTop: b, pathBottom: d, rightWidth: a, rightHeight: a, pathTopRight: c, pathBottomRight: e }
};
Blockly.zelos.ConstantProvider.prototype.generateSecondaryColour_ = function(a) { return Blockly.utils.colour.blend("#000", a, .15) || a };
Blockly.zelos.ConstantProvider.prototype.generateTertiaryColour_ = function(a) { return Blockly.utils.colour.blend("#000", a, .25) || a };
Blockly.zelos.ConstantProvider.prototype.createDom = function(a, b, c) {
    Blockly.zelos.ConstantProvider.superClass_.createDom.call(this, a, b, c);
    a = Blockly.utils.dom.createSvgElement("defs", {}, a);
    b = Blockly.utils.dom.createSvgElement("filter", { id: "blocklySelectedGlowFilter" + this.randomIdentifier, height: "160%", width: "180%", y: "-30%", x: "-40%" }, a);
    Blockly.utils.dom.createSvgElement("feGaussianBlur", { "in": "SourceGraphic", stdDeviation: this.SELECTED_GLOW_SIZE }, b);
    c = Blockly.utils.dom.createSvgElement("feComponentTransfer", { result: "outBlur" }, b);
    Blockly.utils.dom.createSvgElement("feFuncA", { type: "table", tableValues: "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1" }, c);
    Blockly.utils.dom.createSvgElement("feFlood", { "flood-color": this.SELECTED_GLOW_COLOUR, "flood-opacity": 1, result: "outColor" }, b);
    Blockly.utils.dom.createSvgElement("feComposite", { "in": "outColor", in2: "outBlur", operator: "in", result: "outGlow" }, b);
    this.selectedGlowFilterId = b.id;
    this.selectedGlowFilter_ = b;
    a = Blockly.utils.dom.createSvgElement("filter", {
        id: "blocklyReplacementGlowFilter" +
            this.randomIdentifier,
        height: "160%",
        width: "180%",
        y: "-30%",
        x: "-40%"
    }, a);
    Blockly.utils.dom.createSvgElement("feGaussianBlur", { "in": "SourceGraphic", stdDeviation: this.REPLACEMENT_GLOW_SIZE }, a);
    b = Blockly.utils.dom.createSvgElement("feComponentTransfer", { result: "outBlur" }, a);
    Blockly.utils.dom.createSvgElement("feFuncA", { type: "table", tableValues: "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1" }, b);
    Blockly.utils.dom.createSvgElement("feFlood", { "flood-color": this.REPLACEMENT_GLOW_COLOUR, "flood-opacity": 1, result: "outColor" },
        a);
    Blockly.utils.dom.createSvgElement("feComposite", { "in": "outColor", in2: "outBlur", operator: "in", result: "outGlow" }, a);
    Blockly.utils.dom.createSvgElement("feComposite", { "in": "SourceGraphic", in2: "outGlow", operator: "over" }, a);
    this.replacementGlowFilterId = a.id;
    this.replacementGlowFilter_ = a
};
Blockly.zelos.ConstantProvider.prototype.getCSS_ = function(a) {
    return [a + " .blocklyText, ", a + " .blocklyFlyoutLabelText {", "font-family: " + this.FIELD_TEXT_FONTFAMILY + ";", "font-size: " + this.FIELD_TEXT_FONTSIZE + "pt;", "font-weight: " + this.FIELD_TEXT_FONTWEIGHT + ";", "}", a + " .blocklyText {", "fill: #fff;", "}", a + " .blocklyNonEditableText>rect:not(.blocklyDropdownRect),", a + " .blocklyEditableText>rect:not(.blocklyDropdownRect) {", "fill: " + this.FIELD_BORDER_RECT_COLOUR + ";", "}", a + " .blocklyNonEditableText>text,",
        a + " .blocklyEditableText>text,", a + " .blocklyNonEditableText>g>text,", a + " .blocklyEditableText>g>text {", "fill: #575E75;", "}", a + " .blocklyFlyoutLabelText {", "fill: #575E75;", "}", a + " .blocklyText.blocklyBubbleText {", "fill: #575E75;", "}", a + " .blocklyDraggable:not(.blocklyDisabled)", " .blocklyEditableText:not(.editing):hover>rect ,", a + " .blocklyDraggable:not(.blocklyDisabled)", " .blocklyEditableText:not(.editing):hover>.blocklyPath {", "stroke: #fff;", "stroke-width: 2;", "}", a + " .blocklyHtmlInput {", "font-family: " +
        this.FIELD_TEXT_FONTFAMILY + ";", "font-weight: " + this.FIELD_TEXT_FONTWEIGHT + ";", "color: #575E75;", "}", a + " .blocklyDropdownText {", "fill: #fff !important;", "}", a + ".blocklyWidgetDiv .goog-menuitem,", a + ".blocklyDropDownDiv .goog-menuitem {", "font-family: " + this.FIELD_TEXT_FONTFAMILY + ";", "}", a + ".blocklyDropDownDiv .goog-menuitem-content {", "color: #fff;", "}", a + " .blocklyHighlightedConnectionPath {", "stroke: " + this.SELECTED_GLOW_COLOUR + ";", "}", a + " .blocklyDisabled > .blocklyOutlinePath {", "fill: url(#blocklyDisabledPattern" +
        this.randomIdentifier + ")", "}", a + " .blocklyInsertionMarker>.blocklyPath {", "fill-opacity: " + this.INSERTION_MARKER_OPACITY + ";", "stroke: none", "}"
    ]
};
Blockly.zelos.TopRow = function(a) { Blockly.zelos.TopRow.superClass_.constructor.call(this, a) };
Blockly.utils.object.inherits(Blockly.zelos.TopRow, Blockly.blockRendering.TopRow);
Blockly.zelos.TopRow.prototype.endsWithElemSpacer = function() { return !1 };
Blockly.zelos.TopRow.prototype.hasLeftSquareCorner = function(a) { var b = (a.hat ? "cap" === a.hat : this.constants_.ADD_START_HATS) && !a.outputConnection && !a.previousConnection; return !!a.outputConnection || b };
Blockly.zelos.TopRow.prototype.hasRightSquareCorner = function(a) { return !!a.outputConnection && !a.statementInputCount && !a.nextConnection };
Blockly.zelos.BottomRow = function(a) { Blockly.zelos.BottomRow.superClass_.constructor.call(this, a) };
Blockly.utils.object.inherits(Blockly.zelos.BottomRow, Blockly.blockRendering.BottomRow);
Blockly.zelos.BottomRow.prototype.endsWithElemSpacer = function() { return !1 };
Blockly.zelos.BottomRow.prototype.hasLeftSquareCorner = function(a) { return !!a.outputConnection };
Blockly.zelos.BottomRow.prototype.hasRightSquareCorner = function(a) { return !!a.outputConnection && !a.statementInputCount && !a.nextConnection };
Blockly.zelos.RightConnectionShape = function(a) {
    Blockly.zelos.RightConnectionShape.superClass_.constructor.call(this, a);
    this.type |= Blockly.blockRendering.Types.getType("RIGHT_CONNECTION");
    this.width = this.height = 0
};
Blockly.utils.object.inherits(Blockly.zelos.RightConnectionShape, Blockly.blockRendering.Measurable);
Blockly.zelos.StatementInput = function(a, b) {
    Blockly.zelos.StatementInput.superClass_.constructor.call(this, a, b);
    if (this.connectedBlock) {
        for (a = this.connectedBlock; a.getNextBlock();) a = a.getNextBlock();
        a.nextConnection || (this.height = this.connectedBlockHeight, this.connectedBottomNextConnection = !0)
    }
};
Blockly.utils.object.inherits(Blockly.zelos.StatementInput, Blockly.blockRendering.StatementInput);
Blockly.zelos.RenderInfo = function(a, b) {
    Blockly.zelos.RenderInfo.superClass_.constructor.call(this, a, b);
    this.topRow = new Blockly.zelos.TopRow(this.constants_);
    this.bottomRow = new Blockly.zelos.BottomRow(this.constants_);
    this.isInline = !0;
    this.isMultiRow = !b.getInputsInline() || b.isCollapsed();
    this.hasStatementInput = 0 < b.statementInputCount;
    this.rightSide = this.outputConnection ? new Blockly.zelos.RightConnectionShape(this.constants_) : null
};
Blockly.utils.object.inherits(Blockly.zelos.RenderInfo, Blockly.blockRendering.RenderInfo);
Blockly.zelos.RenderInfo.prototype.getRenderer = function() { return this.renderer_ };
Blockly.zelos.RenderInfo.prototype.measure = function() {
    this.createRows_();
    this.addElemSpacing_();
    this.addRowSpacing_();
    this.adjustXPosition_();
    this.computeBounds_();
    this.alignRowElements_();
    this.finalize_()
};
Blockly.zelos.RenderInfo.prototype.shouldStartNewRow_ = function(a, b) { return b ? a.type == Blockly.NEXT_STATEMENT || b.type == Blockly.NEXT_STATEMENT ? !0 : a.type == Blockly.INPUT_VALUE || a.type == Blockly.DUMMY_INPUT ? !this.isInline || this.isMultiRow : !1 : !1 };
Blockly.zelos.RenderInfo.prototype.getDesiredRowWidth_ = function(a) { return a.hasStatement ? this.width - this.startX - (this.constants_.INSIDE_CORNERS.rightWidth || 0) : Blockly.zelos.RenderInfo.superClass_.getDesiredRowWidth_.call(this, a) };
Blockly.zelos.RenderInfo.prototype.getInRowSpacing_ = function(a, b) {
    return a && b || !this.outputConnection || !this.outputConnection.isDynamicShape || this.hasStatementInput || this.bottomRow.hasNextConnection ? !a && b && Blockly.blockRendering.Types.isStatementInput(b) ? this.constants_.STATEMENT_INPUT_PADDING_LEFT : a && Blockly.blockRendering.Types.isLeftRoundedCorner(a) && b && (Blockly.blockRendering.Types.isPreviousConnection(b) || Blockly.blockRendering.Types.isNextConnection(b)) ? b.notchOffset - this.constants_.CORNER_RADIUS :
        a && Blockly.blockRendering.Types.isLeftSquareCorner(a) && b && Blockly.blockRendering.Types.isHat(b) ? this.constants_.NO_PADDING : this.constants_.MEDIUM_PADDING : this.constants_.NO_PADDING
};
Blockly.zelos.RenderInfo.prototype.getSpacerRowHeight_ = function(a, b) {
    if (Blockly.blockRendering.Types.isTopRow(a) && Blockly.blockRendering.Types.isBottomRow(b)) return this.constants_.EMPTY_BLOCK_SPACER_HEIGHT;
    var c = Blockly.blockRendering.Types.isInputRow(a) && a.hasStatement,
        d = Blockly.blockRendering.Types.isInputRow(b) && b.hasStatement;
    return d || c ? (a = Math.max(this.constants_.NOTCH_HEIGHT, this.constants_.INSIDE_CORNERS.rightHeight || 0), d && c ? Math.max(a, this.constants_.DUMMY_INPUT_MIN_HEIGHT) : a) : Blockly.blockRendering.Types.isTopRow(a) ?
        a.hasPreviousConnection || this.outputConnection && !this.hasStatementInput ? this.constants_.NO_PADDING : Math.abs(this.constants_.NOTCH_HEIGHT - this.constants_.CORNER_RADIUS) : Blockly.blockRendering.Types.isBottomRow(b) ? this.outputConnection ? !b.hasNextConnection && this.hasStatementInput ? Math.abs(this.constants_.NOTCH_HEIGHT - this.constants_.CORNER_RADIUS) : this.constants_.NO_PADDING : Math.max(this.topRow.minHeight, Math.max(this.constants_.NOTCH_HEIGHT, this.constants_.CORNER_RADIUS)) - this.constants_.CORNER_RADIUS :
        this.constants_.MEDIUM_PADDING
};
Blockly.zelos.RenderInfo.prototype.getSpacerRowWidth_ = function(a, b) { var c = this.width - this.startX; return Blockly.blockRendering.Types.isInputRow(a) && a.hasStatement || Blockly.blockRendering.Types.isInputRow(b) && b.hasStatement ? Math.max(c, this.constants_.STATEMENT_INPUT_SPACER_MIN_WIDTH) : c };
Blockly.zelos.RenderInfo.prototype.getElemCenterline_ = function(a, b) { if (a.hasStatement && !Blockly.blockRendering.Types.isSpacer(b) && !Blockly.blockRendering.Types.isStatementInput(b)) return a.yPos + this.constants_.EMPTY_STATEMENT_INPUT_HEIGHT / 2; if (Blockly.blockRendering.Types.isInlineInput(b)) { var c = b.connectedBlock; if (c && c.outputConnection && c.nextConnection) return a.yPos + c.height / 2 } return Blockly.zelos.RenderInfo.superClass_.getElemCenterline_.call(this, a, b) };
Blockly.zelos.RenderInfo.prototype.addInput_ = function(a, b) {
    a.type == Blockly.DUMMY_INPUT && b.hasDummyInput && b.align == Blockly.ALIGN_LEFT && a.align == Blockly.ALIGN_RIGHT && (b.rightAlignedDummyInput = a);
    Blockly.zelos.RenderInfo.superClass_.addInput_.call(this, a, b)
};
Blockly.zelos.RenderInfo.prototype.addAlignmentPadding_ = function(a, b) {
    if (a.rightAlignedDummyInput) {
        for (var c, d = 0, e;
            (e = a.elements[d]) && (Blockly.blockRendering.Types.isSpacer(e) && (c = e), !Blockly.blockRendering.Types.isField(e) || e.parentInput != a.rightAlignedDummyInput); d++);
        if (c) {
            c.width += b;
            a.width += b;
            return
        }
    }
    Blockly.zelos.RenderInfo.superClass_.addAlignmentPadding_.call(this, a, b)
};
Blockly.zelos.RenderInfo.prototype.adjustXPosition_ = function() {
    for (var a = this.constants_.NOTCH_OFFSET_LEFT + this.constants_.NOTCH_WIDTH, b = a, c = 2; c < this.rows.length - 1; c += 2) {
        var d = this.rows[c - 1],
            e = this.rows[c],
            f = this.rows[c + 1];
        d = 2 == c ? !!this.topRow.hasPreviousConnection : !!d.followsStatement;
        f = c + 2 >= this.rows.length - 1 ? !!this.bottomRow.hasNextConnection : !!f.precedesStatement;
        if (Blockly.blockRendering.Types.isInputRow(e) && e.hasStatement) e.measure(), b = e.width - e.getLastInput().width + a;
        else if (d && (2 == c || f) &&
            Blockly.blockRendering.Types.isInputRow(e) && !e.hasStatement) {
            f = e.xPos;
            d = null;
            for (var g = 0, h; h = e.elements[g]; g++) Blockly.blockRendering.Types.isSpacer(h) && (d = h), !(d && (Blockly.blockRendering.Types.isField(h) || Blockly.blockRendering.Types.isInput(h)) && f < b) || Blockly.blockRendering.Types.isField(h) && (h.field instanceof Blockly.FieldLabel || h.field instanceof Blockly.FieldImage) || (d.width += b - f), f += h.width
        }
    }
};
Blockly.zelos.RenderInfo.prototype.finalizeOutputConnection_ = function() {
    if (this.outputConnection && this.outputConnection.isDynamicShape) {
        for (var a = 0, b = 0, c; c = this.rows[b]; b++) c.yPos = a, a += c.height;
        this.height = a;
        b = this.bottomRow.hasNextConnection ? this.height - this.bottomRow.descenderHeight : this.height;
        a = this.outputConnection.shape.height(b);
        b = this.outputConnection.shape.width(b);
        this.outputConnection.height = a;
        this.outputConnection.width = b;
        this.outputConnection.startX = b;
        this.outputConnection.connectionOffsetY =
            this.outputConnection.shape.connectionOffsetY(a);
        this.outputConnection.connectionOffsetX = this.outputConnection.shape.connectionOffsetX(b);
        c = 0;
        this.hasStatementInput || this.bottomRow.hasNextConnection || (c = b, this.rightSide.height = a, this.rightSide.width = c, this.rightSide.centerline = a / 2, this.rightSide.xPos = this.width + c);
        this.startX = b;
        this.width += b + c;
        this.widthWithChildren += b + c
    }
};
Blockly.zelos.RenderInfo.prototype.finalizeHorizontalAlignment_ = function() {
    if (this.outputConnection && !this.hasStatementInput && !this.bottomRow.hasNextConnection) {
        for (var a = 0, b = 0, c; c = this.rows[b]; b++)
            if (Blockly.blockRendering.Types.isInputRow(c)) {
                a = c.elements[c.elements.length - 2];
                var d = this.getNegativeSpacing_(c.elements[1]),
                    e = this.getNegativeSpacing_(a);
                a = d + e;
                var f = this.constants_.MIN_BLOCK_WIDTH + 2 * this.outputConnection.width;
                this.width - a < f && (a = this.width - f, d = a / 2, e = a / 2);
                c.elements.unshift(new Blockly.blockRendering.InRowSpacer(this.constants_, -d));
                c.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_, -e))
            }
        if (a)
            for (this.width -= a, this.widthWithChildren -= a, this.rightSide.xPos -= a, b = 0; c = this.rows[b]; b++) Blockly.blockRendering.Types.isTopOrBottomRow(c) && (c.elements[1].width -= a, c.elements[1].widthWithConnectedBlocks -= a), c.width -= a, c.widthWithConnectedBlocks -= a
    }
};
Blockly.zelos.RenderInfo.prototype.getNegativeSpacing_ = function(a) {
    if (!a) return 0;
    var b = this.outputConnection.width,
        c = this.outputConnection.shape.type,
        d = this.constants_;
    if (this.isMultiRow && 1 < this.inputRows.length) switch (c) {
        case d.SHAPES.ROUND:
            return c = this.constants_.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH, c = this.height / 2 > c ? c : this.height / 2, b - c * (1 - Math.sin(Math.acos((c - this.constants_.SMALL_PADDING) / c)));
        default:
            return 0
    }
    if (Blockly.blockRendering.Types.isInlineInput(a)) {
        var e = a.connectedBlock;
        a = e ? e.pathObject.outputShapeType :
            a.shape.type;
        return e && e.outputConnection && (e.statementInputCount || e.nextConnection) || c == d.SHAPES.HEXAGONAL && c != a ? 0 : b - this.constants_.SHAPE_IN_SHAPE_PADDING[c][a]
    }
    return Blockly.blockRendering.Types.isField(a) ? c == d.SHAPES.ROUND && a.field instanceof Blockly.FieldTextInput ? b - 2.75 * d.GRID_UNIT : b - this.constants_.SHAPE_IN_SHAPE_PADDING[c][0] : Blockly.blockRendering.Types.isIcon(a) ? this.constants_.SMALL_PADDING : 0
};
Blockly.zelos.RenderInfo.prototype.finalizeVerticalAlignment_ = function() {
    if (!this.outputConnection)
        for (var a = 2; a < this.rows.length - 1; a += 2) {
            var b = this.rows[a - 1],
                c = this.rows[a],
                d = this.rows[a + 1],
                e = 2 == a,
                f = a + 2 >= this.rows.length - 1 ? !!this.bottomRow.hasNextConnection : !!d.precedesStatement;
            if (e ? this.topRow.hasPreviousConnection : b.followsStatement) {
                var g = 3 == c.elements.length && (c.elements[1].field instanceof Blockly.FieldLabel || c.elements[1].field instanceof Blockly.FieldImage);
                if (!e && g) b.height -= this.constants_.SMALL_PADDING,
                    d.height -= this.constants_.SMALL_PADDING, c.height -= this.constants_.MEDIUM_PADDING;
                else if (!e && !f) b.height += this.constants_.SMALL_PADDING;
                else if (f) {
                    e = !1;
                    for (f = 0; g = c.elements[f]; f++)
                        if (Blockly.blockRendering.Types.isInlineInput(g) && g.connectedBlock && !g.connectedBlock.isShadow() && 40 <= g.connectedBlock.getHeightWidth().height) { e = !0; break }
                    e && (b.height -= this.constants_.SMALL_PADDING, d.height -= this.constants_.SMALL_PADDING)
                }
            }
        }
};
Blockly.zelos.RenderInfo.prototype.finalize_ = function() {
    this.finalizeOutputConnection_();
    this.finalizeHorizontalAlignment_();
    this.finalizeVerticalAlignment_();
    Blockly.zelos.RenderInfo.superClass_.finalize_.call(this);
    this.rightSide && (this.widthWithChildren += this.rightSide.width)
};
Blockly.zelos.Drawer = function(a, b) { Blockly.zelos.Drawer.superClass_.constructor.call(this, a, b) };
Blockly.utils.object.inherits(Blockly.zelos.Drawer, Blockly.blockRendering.Drawer);
Blockly.zelos.Drawer.prototype.draw = function() {
    var a = this.block_.pathObject;
    a.beginDrawing();
    this.hideHiddenIcons_();
    this.drawOutline_();
    this.drawInternals_();
    a.setPath(this.outlinePath_ + "\n" + this.inlinePath_);
    this.info_.RTL && a.flipRTL();
    Blockly.blockRendering.useDebugger && this.block_.renderingDebugger.drawDebug(this.block_, this.info_);
    this.recordSizeOnBlock_();
    this.info_.outputConnection && (a.outputShapeType = this.info_.outputConnection.shape.type);
    a.endDrawing()
};
Blockly.zelos.Drawer.prototype.drawOutline_ = function() { this.info_.outputConnection && this.info_.outputConnection.isDynamicShape && !this.info_.hasStatementInput && !this.info_.bottomRow.hasNextConnection ? (this.drawFlatTop_(), this.drawRightDynamicConnection_(), this.drawFlatBottom_(), this.drawLeftDynamicConnection_()) : Blockly.zelos.Drawer.superClass_.drawOutline_.call(this) };
Blockly.zelos.Drawer.prototype.drawLeft_ = function() { this.info_.outputConnection && this.info_.outputConnection.isDynamicShape ? this.drawLeftDynamicConnection_() : Blockly.zelos.Drawer.superClass_.drawLeft_.call(this) };
Blockly.zelos.Drawer.prototype.drawRightSideRow_ = function(a) {
    if (!(0 >= a.height))
        if (a.precedesStatement || a.followsStatement) {
            var b = this.constants_.INSIDE_CORNERS.rightHeight;
            b = a.height - (a.precedesStatement ? b : 0);
            this.outlinePath_ += (a.followsStatement ? this.constants_.INSIDE_CORNERS.pathBottomRight : "") + (0 < b ? Blockly.utils.svgPaths.lineOnAxis("V", a.yPos + b) : "") + (a.precedesStatement ? this.constants_.INSIDE_CORNERS.pathTopRight : "")
        } else this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("V", a.yPos + a.height)
};
Blockly.zelos.Drawer.prototype.drawRightDynamicConnection_ = function() { this.outlinePath_ += this.info_.outputConnection.shape.pathRightDown(this.info_.outputConnection.height) };
Blockly.zelos.Drawer.prototype.drawLeftDynamicConnection_ = function() {
    this.positionOutputConnection_();
    this.outlinePath_ += this.info_.outputConnection.shape.pathUp(this.info_.outputConnection.height);
    this.outlinePath_ += "z"
};
Blockly.zelos.Drawer.prototype.drawFlatTop_ = function() {
    var a = this.info_.topRow;
    this.positionPreviousConnection_();
    this.outlinePath_ += Blockly.utils.svgPaths.moveBy(a.xPos, this.info_.startY);
    this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("h", a.width)
};
Blockly.zelos.Drawer.prototype.drawFlatBottom_ = function() {
    var a = this.info_.bottomRow;
    this.positionNextConnection_();
    this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("V", a.baseline);
    this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("h", -a.width)
};
Blockly.zelos.Drawer.prototype.drawInlineInput_ = function(a) {
    this.positionInlineInputConnection_(a);
    var b = a.input.name;
    if (!a.connectedBlock && !this.info_.isInsertionMarker) {
        var c = a.width - 2 * a.connectionWidth;
        a = Blockly.utils.svgPaths.moveTo(a.xPos + a.connectionWidth, a.centerline - a.height / 2) + Blockly.utils.svgPaths.lineOnAxis("h", c) + a.shape.pathRightDown(a.height) + Blockly.utils.svgPaths.lineOnAxis("h", -c) + a.shape.pathUp(a.height) + "z";
        this.block_.pathObject.setOutlinePath(b, a)
    }
};
Blockly.zelos.Drawer.prototype.drawStatementInput_ = function(a) {
    var b = a.getLastInput(),
        c = b.xPos + b.notchOffset + b.shape.width,
        d = b.shape.pathRight + Blockly.utils.svgPaths.lineOnAxis("h", -(b.notchOffset - this.constants_.INSIDE_CORNERS.width)) + this.constants_.INSIDE_CORNERS.pathTop,
        e = a.height - 2 * this.constants_.INSIDE_CORNERS.height;
    b = this.constants_.INSIDE_CORNERS.pathBottom + Blockly.utils.svgPaths.lineOnAxis("h", b.notchOffset - this.constants_.INSIDE_CORNERS.width) + (b.connectedBottomNextConnection ? "" : b.shape.pathLeft);
    this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis("H", c) + d + Blockly.utils.svgPaths.lineOnAxis("v", e) + b + Blockly.utils.svgPaths.lineOnAxis("H", a.xPos + a.width);
    this.positionStatementInputConnection_(a)
};
Blockly.zelos.PathObject = function(a, b, c) {
    Blockly.zelos.PathObject.superClass_.constructor.call(this, a, b, c);
    this.constants = c;
    this.svgPathSelected_ = null;
    this.outlines_ = {};
    this.outputShapeType = this.remainingOutlines_ = null
};
Blockly.utils.object.inherits(Blockly.zelos.PathObject, Blockly.blockRendering.PathObject);
Blockly.zelos.PathObject.prototype.setPath = function(a) {
    Blockly.zelos.PathObject.superClass_.setPath.call(this, a);
    this.svgPathSelected_ && this.svgPathSelected_.setAttribute("d", a)
};
Blockly.zelos.PathObject.prototype.applyColour = function(a) {
    Blockly.zelos.PathObject.superClass_.applyColour.call(this, a);
    a.isShadow() && a.getParent() && this.svgPath.setAttribute("stroke", a.getParent().style.colourTertiary);
    a = 0;
    for (var b = Object.keys(this.outlines_), c; c = b[a]; a++) this.outlines_[c].setAttribute("fill", this.style.colourTertiary)
};
Blockly.zelos.PathObject.prototype.flipRTL = function() { Blockly.zelos.PathObject.superClass_.flipRTL.call(this); for (var a = 0, b = Object.keys(this.outlines_), c; c = b[a]; a++) this.outlines_[c].setAttribute("transform", "scale(-1 1)") };
Blockly.zelos.PathObject.prototype.updateSelected = function(a) {
    this.setClass_("blocklySelected", a);
    a ? this.svgPathSelected_ || (this.svgPathSelected_ = this.svgPath.cloneNode(!0), this.svgPathSelected_.setAttribute("fill", "none"), this.svgPathSelected_.setAttribute("filter", "url(#" + this.constants.selectedGlowFilterId + ")"), this.svgRoot.appendChild(this.svgPathSelected_)) : this.svgPathSelected_ && (this.svgRoot.removeChild(this.svgPathSelected_), this.svgPathSelected_ = null)
};
Blockly.zelos.PathObject.prototype.updateReplacementFade = function(a) {
    this.setClass_("blocklyReplaceable", a);
    a ? this.svgPath.setAttribute("filter", "url(#" + this.constants.replacementGlowFilterId + ")") : this.svgPath.removeAttribute("filter")
};
Blockly.zelos.PathObject.prototype.updateShapeForInputHighlight = function(a, b) {
    a = a.getParentInput().name;
    (a = this.getOutlinePath_(a)) && (b ? a.setAttribute("filter", "url(#" + this.constants.replacementGlowFilterId + ")") : a.removeAttribute("filter"))
};
Blockly.zelos.PathObject.prototype.beginDrawing = function() { this.remainingOutlines_ = {}; for (var a = 0, b = Object.keys(this.outlines_), c; c = b[a]; a++) this.remainingOutlines_[c] = 1 };
Blockly.zelos.PathObject.prototype.endDrawing = function() {
    if (this.remainingOutlines_)
        for (var a = 0, b = Object.keys(this.remainingOutlines_), c; c = b[a]; a++) this.removeOutlinePath_(c);
    this.remainingOutlines_ = null
};
Blockly.zelos.PathObject.prototype.setOutlinePath = function(a, b) {
    a = this.getOutlinePath_(a);
    a.setAttribute("d", b);
    a.setAttribute("fill", this.style.colourTertiary)
};
Blockly.zelos.PathObject.prototype.getOutlinePath_ = function(a) {
    this.outlines_[a] || (this.outlines_[a] = Blockly.utils.dom.createSvgElement("path", { "class": "blocklyOutlinePath", d: "" }, this.svgRoot));
    this.remainingOutlines_ && delete this.remainingOutlines_[a];
    return this.outlines_[a]
};
Blockly.zelos.PathObject.prototype.removeOutlinePath_ = function(a) {
    this.outlines_[a].parentNode.removeChild(this.outlines_[a]);
    delete this.outlines_[a]
};
Blockly.zelos.MarkerSvg = function(a, b, c) { Blockly.zelos.MarkerSvg.superClass_.constructor.call(this, a, b, c) };
Blockly.utils.object.inherits(Blockly.zelos.MarkerSvg, Blockly.blockRendering.MarkerSvg);
Blockly.zelos.MarkerSvg.prototype.showWithInput_ = function(a) {
    var b = a.getSourceBlock();
    a = a.getLocation().getOffsetInBlock();
    this.positionCircle_(a.x, a.y);
    this.setParent_(b);
    this.showCurrent_()
};
Blockly.zelos.MarkerSvg.prototype.showWithBlock_ = function(a) {
    a = a.getLocation();
    var b = a.getHeightWidth();
    this.positionRect_(0, 0, b.width, b.height);
    this.setParent_(a);
    this.showCurrent_()
};
Blockly.zelos.MarkerSvg.prototype.positionCircle_ = function(a, b) {
    this.markerCircle_.setAttribute("cx", a);
    this.markerCircle_.setAttribute("cy", b);
    this.currentMarkerSvg = this.markerCircle_
};
Blockly.zelos.MarkerSvg.prototype.showAtLocation_ = function(a) {
    var b = !1;
    a.getType() == Blockly.ASTNode.types.OUTPUT ? (this.showWithInput_(a), b = !0) : a.getType() == Blockly.ASTNode.types.BLOCK && (this.showWithBlock_(a), b = !0);
    b || Blockly.zelos.MarkerSvg.superClass_.showAtLocation_.call(this, a)
};
Blockly.zelos.MarkerSvg.prototype.hide = function() {
    Blockly.zelos.MarkerSvg.superClass_.hide.call(this);
    this.markerCircle_.style.display = "none"
};
Blockly.zelos.MarkerSvg.prototype.createDomInternal_ = function() {
    Blockly.zelos.MarkerSvg.superClass_.createDomInternal_.call(this);
    this.markerCircle_ = Blockly.utils.dom.createSvgElement("circle", { r: this.constants_.CURSOR_RADIUS, style: "display: none", "stroke-width": this.constants_.CURSOR_STROKE_WIDTH }, this.markerSvg_);
    if (this.isCursor()) {
        var a = this.getBlinkProperties_();
        Blockly.utils.dom.createSvgElement("animate", a, this.markerCircle_)
    }
    return this.markerSvg_
};
Blockly.zelos.MarkerSvg.prototype.applyColour_ = function() {
    Blockly.zelos.MarkerSvg.superClass_.applyColour_.call(this);
    this.markerCircle_.setAttribute("fill", this.colour_);
    this.markerCircle_.setAttribute("stroke", this.colour_);
    this.isCursor() && this.markerCircle_.firstChild.setAttribute("values", this.colour_ + ";transparent;transparent;")
};
Blockly.zelos.Renderer = function(a) { Blockly.zelos.Renderer.superClass_.constructor.call(this, a) };
Blockly.utils.object.inherits(Blockly.zelos.Renderer, Blockly.blockRendering.Renderer);
Blockly.zelos.Renderer.prototype.makeConstants_ = function() { return new Blockly.zelos.ConstantProvider };
Blockly.zelos.Renderer.prototype.makeRenderInfo_ = function(a) { return new Blockly.zelos.RenderInfo(this, a) };
Blockly.zelos.Renderer.prototype.makeDrawer_ = function(a, b) { return new Blockly.zelos.Drawer(a, b) };
Blockly.zelos.Renderer.prototype.makeMarkerDrawer = function(a, b) { return new Blockly.zelos.MarkerSvg(a, this.getConstants(), b) };
Blockly.zelos.Renderer.prototype.makePathObject = function(a, b) { return new Blockly.zelos.PathObject(a, b, this.getConstants()) };
Blockly.zelos.Renderer.prototype.shouldHighlightConnection = function(a) { return a.type != Blockly.INPUT_VALUE && a.type !== Blockly.OUTPUT_VALUE };
Blockly.zelos.Renderer.prototype.getConnectionPreviewMethod = function(a, b, c) { return b.type == Blockly.OUTPUT_VALUE ? a.isConnected() ? Blockly.InsertionMarkerManager.PREVIEW_TYPE.REPLACEMENT_FADE : Blockly.InsertionMarkerManager.PREVIEW_TYPE.INPUT_OUTLINE : Blockly.zelos.Renderer.superClass_.getConnectionPreviewMethod(a, b, c) };
Blockly.blockRendering.register("zelos", Blockly.zelos.Renderer);
Blockly.Themes.Dark = Blockly.Theme.defineTheme("dark", { base: Blockly.Themes.Classic, componentStyles: { workspaceBackgroundColour: "#fff", toolboxBackgroundColour: "#fff", toolboxForegroundColour: "#fff", flyoutBackgroundColour: "#fff", flyoutForegroundColour: "#fff", flyoutOpacity: 1, scrollbarColour: "#fff", insertionMarkerColour: "#fff", insertionMarkerOpacity: .3, scrollbarOpacity: .4, cursorColour: "#fff" } });
Blockly.Themes.Deuteranopia = {};
