! function () {
    var a;
    window.HistoryMaps ? a = window.HistoryMaps : (a = {}, window.HistoryMaps = a, a.themes = {}, a.maps = {}, a.inheriting = {}, a.charts = [], a.onReadyArray = [], a.useUTC = !1, a.updateRate = 60, a.uid = 0, a.lang = {}, a.translations = {}, a.mapTranslations = {}, a.windows = {}, a.initHandlers = [], a.amString = "am", a.pmString = "pm"), a.Class = function (b) {
        var c = function () {
            arguments[0] !== a.inheriting && (this.events = {}, this.construct.apply(this, arguments))
        };
        b.inherits ? (c.prototype = new b.inherits(a.inheriting), c.base = b.inherits.prototype, delete b.inherits) : (c.prototype.createEvents = function () {
            for (var a = 0; a < arguments.length; a++) this.events[arguments[a]] = []
        }, c.prototype.listenTo = function (a, b, c) {
            this.removeListener(a, b, c), a.events[b].push({
                handler: c,
                scope: this
            })
        }, c.prototype.addListener = function (a, b, c) {
            this.removeListener(this, a, b), a && this.events[a] && this.events[a].push({
                handler: b,
                scope: c
            })
        }, c.prototype.removeListener = function (a, b, c) {
            if (a && a.events && (a = a.events[b]))
                for (b = a.length - 1; 0 <= b; b--) a[b].handler === c && a.splice(b, 1)
        }, c.prototype.fire = function (a) {
            for (var b = this.events[a.type], c = 0; c < b.length; c++) {
                var d = b[c];
                d.handler.call(d.scope, a)
            }
        });
        for (var d in b) c.prototype[d] = b[d];
        return c
    }, a.addChart = function (b) {
        window.requestAnimationFrame ? a.animationRequested || (a.animationRequested = !0, window.requestAnimationFrame(a.update)) : a.updateInt || (a.updateInt = setInterval(function () {
            a.update()
        }, Math.round(1e3 / a.updateRate))), a.charts.push(b)
    }, a.removeChart = function (b) {
        for (var c = a.charts, d = c.length - 1; 0 <= d; d--) c[d] == b && c.splice(d, 1);
        0 === c.length && (a.requestAnimation && (window.cancelAnimationFrame(a.requestAnimation), a.animationRequested = !1), a.updateInt && (clearInterval(a.updateInt), a.updateInt = NaN))
    }, a.isModern = !0, a.getIEVersion = function () {
        var b, c, a = 0;
        return "Microsoft Internet Explorer" == navigator.appName && (b = navigator.userAgent, c = /MSIE ([0-9]{1,}[.0-9]{0,})/, null !== c.exec(b) && (a = parseFloat(RegExp.$1))), a
    }, a.applyLang = function (b, c) {
        var d = a.translations;
        c.dayNames = a.extend({}, a.dayNames), c.shortDayNames = a.extend({}, a.shortDayNames), c.monthNames = a.extend({}, a.monthNames), c.shortMonthNames = a.extend({}, a.shortMonthNames), c.amString = "am", c.pmString = "pm", d && (d = d[b]) && (a.lang = d, c.langObj = d, d.monthNames && (c.dayNames = a.extend({}, d.dayNames), c.shortDayNames = a.extend({}, d.shortDayNames), c.monthNames = a.extend({}, d.monthNames), c.shortMonthNames = a.extend({}, d.shortMonthNames)), d.am && (c.amString = d.am), d.pm && (c.pmString = d.pm)), a.amString = c.amString, a.pmString = c.pmString
    }, a.IEversion = a.getIEVersion(), 9 > a.IEversion && 0 < a.IEversion && (a.isModern = !1, a.isIE = !0), a.dx = 0, a.dy = 0, (document.addEventListener || window.opera) && (a.isNN = !0, a.isIE = !1, a.dx = .5, a.dy = .5), document.attachEvent && (a.isNN = !1, a.isIE = !0, a.isModern || (a.dx = 0, a.dy = 0)), window.chrome && (a.chrome = !0), a.handleMouseUp = function (b) {
        for (var c = a.charts, d = 0; d < c.length; d++) {
            var e = c[d];
            e && e.handleReleaseOutside && e.handleReleaseOutside(b)
        }
    }, a.handleMouseMove = function (b) {
        for (var c = a.charts, d = 0; d < c.length; d++) {
            var e = c[d];
            e && e.handleMouseMove && e.handleMouseMove(b)
        }
    }, a.handleWheel = function (b) {
        for (var c = a.charts, d = 0; d < c.length; d++) {
            var e = c[d];
            if (e && e.mouseIsOver) {
                (e.mouseWheelScrollEnabled || e.mouseWheelZoomEnabled) && e.handleWheel && e.handleWheel(b);
                break
            }
        }
    }, a.resetMouseOver = function () {
        for (var b = a.charts, c = 0; c < b.length; c++) {
            var d = b[c];
            d && (d.mouseIsOver = !1)
        }
    }, a.ready = function (b) {
        a.onReadyArray.push(b)
    }, a.handleLoad = function () {
        a.isReady = !0;
        for (var b = a.onReadyArray, c = 0; c < b.length; c++) {
            var d = b[c];
            isNaN(a.processDelay) ? d() : setTimeout(d, a.processDelay * c)
        }
    }, a.addInitHandler = function (b, c) {
        a.initHandlers.push({
            method: b,
            types: c
        })
    }, a.callInitHandler = function (b) {
        var c = a.initHandlers;
        if (a.initHandlers)
            for (var d = 0; d < c.length; d++) {
                var e = c[d];
                e.types ? a.isInArray(e.types, b.type) && e.method(b) : e.method(b)
            }
    }, a.getUniqueId = function () {
        return "HistoryMapsEl-" + ++a.uid
    }, a.isNN && (document.addEventListener("mousemove", a.handleMouseMove), document.addEventListener("mouseup", a.handleMouseUp, !0), window.addEventListener("load", a.handleLoad, !0), window.addEventListener("DOMMouseScroll", a.handleWheel, !0), document.addEventListener("mousewheel", a.handleWheel, !0)), a.isIE && (document.attachEvent("onmousemove", a.handleMouseMove), document.attachEvent("onmouseup", a.handleMouseUp), window.attachEvent("onload", a.handleLoad), document.attachEvent("onmousewheel", a.handleWheel)), a.clear = function () {
        var b = a.charts;
        if (b)
            for (var c = b.length - 1; 0 <= c; c--) b[c].clear();
        a.updateInt && clearInterval(a.updateInt), a.requestAnimation && window.cancelAnimationFrame(a.requestAnimation), a.charts = [], a.isNN && (document.removeEventListener("mousemove", a.handleMouseMove, !0), document.removeEventListener("mouseup", a.handleMouseUp, !0), window.removeEventListener("load", a.handleLoad, !0), window.removeEventListener("DOMMouseScroll", a.handleWheel, !0), document.removeEventListener("mousewheel", a.handleWheel, !0)), a.isIE && (document.detachEvent("onmousemove", a.handleMouseMove), document.detachEvent("onmouseup", a.handleMouseUp), window.detachEvent("onload", a.handleLoad))
    }, a.makeChart = function (b, c, d) {
        var e = c.type,
            f = c.theme;
        a.isString(f) && (f = a.themes[f], c.theme = f);
        var g;
        switch (e) {
            case "serial":
                g = new a.AmSerialChart(f);
                break;
            case "xy":
                g = new a.AmXYChart(f);
                break;
            case "pie":
                g = new a.AmPieChart(f);
                break;
            case "radar":
                g = new a.AmRadarChart(f);
                break;
            case "gauge":
                g = new a.AmAngularGauge(f);
                break;
            case "funnel":
                g = new a.AmFunnelChart(f);
                break;
            case "map":
                g = new a.HisMap(f);
                break;
            case "stock":
                g = new a.AmStockChart(f);
                break;
            case "gantt":
                g = new a.AmGanttChart(f)
        }
        return a.extend(g, c), a.isReady ? isNaN(d) ? g.write(b) : setTimeout(function () {
            a.realWrite(g, b)
        }, d) : a.ready(function () {
            isNaN(d) ? g.write(b) : setTimeout(function () {
                a.realWrite(g, b)
            }, d)
        }), g
    }, a.realWrite = function (a, b) {
        a.write(b)
    }, a.updateCount = 0, a.validateAt = Math.round(a.updateRate / 10), a.update = function () {
        var b = a.charts;
        a.updateCount++;
        var c = !1;
        if (a.updateCount == a.validateAt && (c = !0, a.updateCount = 0), b)
            for (var d = b.length - 1; 0 <= d; d--) b[d].update && b[d].update(), c && (b[d].autoResize ? b[d].validateSize && b[d].validateSize() : b[d].premeasure && b[d].premeasure());
        window.requestAnimationFrame && (a.requestAnimation = window.requestAnimationFrame(a.update))
    }, a.bezierX = 3, a.bezierY = 6, "complete" == document.readyState && a.handleLoad()
}(),
    function () {
        var a = window.HistoryMaps;
        a.toBoolean = function (a, b) {
            if (void 0 === a) return b;
            switch (String(a).toLowerCase()) {
                case "true":
                case "yes":
                case "1":
                    return !0;
                case "false":
                case "no":
                case "0":
                case null:
                    return !1;
                default:
                    return !!a
            }
        }, a.removeFromArray = function (a, b) {
            var c;
            if (void 0 !== b && void 0 !== a)
                for (c = a.length - 1; 0 <= c; c--) a[c] == b && a.splice(c, 1)
        }, a.getPath = function () {
            var a = document.getElementsByTagName("script");
            if (a)
                for (var b = 0; b < a.length; b++) {
                    var c = a[b].src;
                    if (-1 !== c.search(/\/(historymaps|historymap)\.js/)) return c.replace(/\/(historymaps|historymap)\.js.*/, "/")
                }
        }, a.normalizeUrl = function (a) {
            return "" !== a && -1 === a.search(/\/$/) ? a + "/" : a
        }, a.isAbsolute = function (a) {
            return 0 === a.search(/^http[s]?:|^\//)
        }, a.isInArray = function (a, b) {
            for (var c = 0; c < a.length; c++)
                if (a[c] == b) return !0;
            return !1
        }, a.getDecimals = function (a) {
            var b = 0;
            return isNaN(a) || (a = String(a), -1 != a.indexOf("e-") ? b = Number(a.split("-")[1]) : -1 != a.indexOf(".") && (b = a.split(".")[1].length)), b
        }, a.wordwrap = function (b, c, d, e) {
            var f, g, h, i;
            if (b += "", 1 > c) return b;
            for (f = -1, b = (i = b.split(/\r\n|\n|\r/)).length; ++f < b; i[f] += h) {
                for (h = i[f], i[f] = ""; h.length > c; i[f] += a.trim(h.slice(0, g)) + ((h = h.slice(g)).length ? d : "")) g = 2 == e || (g = h.slice(0, c + 1).match(/\S*(\s)?$/))[1] ? c : g.input.length - g[0].length || 1 == e && c || g.input.length + (g = h.slice(c).match(/^\S*/))[0].length;
                h = a.trim(h)
            }
            return i.join(d)
        }, a.trim = function (a) {
            return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        }, a.wrappedText = function (b, c, d, e, f, g, h, i) {
            var j = a.text(b, c, d, e, f, g, h);
            if (j) {
                var k = j.getBBox();
                if (k.width > i) {
                    var l = "\n";
                    a.isModern || (l = "<br>"), i = Math.floor(i / (k.width / c.length)), 2 < i && (i -= 2), c = a.wordwrap(c, i, l, !0), j.remove(), j = a.text(b, c, d, e, f, g, h)
                }
            }
            return j
        }, a.getStyle = function (a, b) {
            var c = "";
            if (document.defaultView && document.defaultView.getComputedStyle) try {
                c = document.defaultView.getComputedStyle(a, "").getPropertyValue(b)
            } catch (a) { } else a.currentStyle && (b = b.replace(/\-(\w)/g, function (a, b) {
                return b.toUpperCase()
            }), c = a.currentStyle[b]);
            return c
        }, a.removePx = function (a) {
            if (void 0 !== a) return Number(a.substring(0, a.length - 2))
        }, a.getURL = function (b, c) {
            if (b)
                if ("_self" != c && c)
                    if ("_top" == c && window.top) window.top.location.href = b;
                    else if ("_parent" == c && window.parent) window.parent.location.href = b;
                    else if ("_blank" == c) window.open(b);
                    else {
                        var d = document.getElementsByName(c)[0];
                        d ? d.src = b : (d = a.windows[c]) && d.opener && !d.opener.closed ? d.location.href = b : a.windows[c] = window.open(b)
                    } else window.location.href = b
        }, a.ifArray = function (a) {
            return !!(a && "object" == typeof a && 0 < a.length)
        }, a.callMethod = function (a, b) {
            var c;
            for (c = 0; c < b.length; c++) {
                var d = b[c];
                if (d) {
                    d[a] && d[a]();
                    var e = d.length;
                    if (0 < e) {
                        var f;
                        for (f = 0; f < e; f++) {
                            var g = d[f];
                            g && g[a] && g[a]()
                        }
                    }
                }
            }
        }, a.toNumber = function (a) {
            return "number" == typeof a ? a : Number(String(a).replace(/[^0-9\-.]+/g, ""))
        }, a.toColor = function (a) {
            if ("" !== a && void 0 !== a)
                if (-1 != a.indexOf(",")) {
                    a = a.split(",");
                    var b;
                    for (b = 0; b < a.length; b++) {
                        var c = a[b].substring(a[b].length - 6, a[b].length);
                        a[b] = "#" + c
                    }
                } else a = a.substring(a.length - 6, a.length), a = "#" + a;
            return a
        }, a.toCoordinate = function (a, b, c) {
            var d;
            return void 0 !== a && (a = String(a), c && c < b && (b = c), d = Number(a), -1 != a.indexOf("!") && (d = b - Number(a.substr(1))), -1 != a.indexOf("%") && (d = b * Number(a.substr(0, a.length - 1)) / 100)), d
        }, a.fitToBounds = function (a, b, c) {
            return a < b && (a = b), a > c && (a = c), a
        }, a.isDefined = function (a) {
            return void 0 !== a
        }, a.stripNumbers = function (a) {
            return a.replace(/[0-9]+/g, "")
        }, a.roundTo = function (a, b) {
            if (0 > b) return a;
            var c = Math.pow(10, b);
            return Math.round(a * c) / c
        }, a.toFixed = function (a, b) {
            var c = String(Math.round(a * Math.pow(10, b)));
            if (0 < b) {
                var d = c.length;
                if (d < b) {
                    var e;
                    for (e = 0; e < b - d; e++) c = "0" + c
                }
                return d = c.substring(0, c.length - b), "" === d && (d = 0), d + "." + c.substring(c.length - b, c.length)
            }
            return String(c)
        }, a.formatDuration = function (b, c, d, e, f, g) {
            var h = a.intervals,
                i = g.decimalSeparator;
            if (b >= h[c].contains) {
                var j = b - Math.floor(b / h[c].contains) * h[c].contains;
                return "ss" == c ? (j = a.formatNumber(j, g), 1 == j.split(i)[0].length && (j = "0" + j)) : j = a.roundTo(j, g.precision), ("mm" == c || "hh" == c) && 10 > j && (j = "0" + j), d = j + "" + e[c] + d, b = Math.floor(b / h[c].contains), c = h[c].nextInterval, a.formatDuration(b, c, d, e, f, g)
            }
            if ("ss" == c && (b = a.formatNumber(b, g), 1 == b.split(i)[0].length && (b = "0" + b)), ("mm" == c || "hh" == c) && 10 > b && (b = "0" + b), d = b + "" + e[c] + d, h[f].count > h[c].count)
                for (b = h[c].count; b < h[f].count; b++) c = h[c].nextInterval, "ss" == c || "mm" == c || "hh" == c ? d = "00" + e[c] + d : "DD" == c && (d = "0" + e[c] + d);
            return ":" == d.charAt(d.length - 1) && (d = d.substring(0, d.length - 1)), d
        }, a.formatNumber = function (b, c, d, e, f) {
            b = a.roundTo(b, c.precision), isNaN(d) && (d = c.precision);
            var g = c.decimalSeparator;
            c = c.thousandsSeparator;
            var h;
            h = 0 > b ? "-" : "", b = Math.abs(b);
            var i = String(b),
                j = !1; - 1 != i.indexOf("e") && (j = !0), 0 <= d && !j && (i = a.toFixed(b, d));
            var k = "";
            if (j) k = i;
            else {
                var l, i = i.split("."),
                    j = String(i[0]);
                for (l = j.length; 0 <= l; l -= 3) k = l != j.length ? 0 !== l ? j.substring(l - 3, l) + c + k : j.substring(l - 3, l) + k : j.substring(l - 3, l);
                void 0 !== i[1] && (k = k + g + i[1]), void 0 !== d && 0 < d && "0" != k && (k = a.addZeroes(k, g, d))
            }
            return k = h + k, "" === h && !0 === e && 0 !== b && (k = "+" + k), !0 === f && (k += "%"), k
        }, a.addZeroes = function (b, c, d) {
            return b = b.split(c), void 0 === b[1] && 0 < d && (b[1] = "0"), b[1].length < d ? (b[1] += "0", a.addZeroes(b[0] + c + b[1], c, d)) : void 0 !== b[1] ? b[0] + c + b[1] : b[0]
        }, a.scientificToNormal = function (a) {
            var b;
            a = String(a).split("e");
            var c;
            if ("-" == a[1].substr(0, 1)) {
                for (b = "0.", c = 0; c < Math.abs(Number(a[1])) - 1; c++) b += "0";
                b += a[0].split(".").join("")
            } else {
                var d = 0;
                for (b = a[0].split("."), b[1] && (d = b[1].length), b = a[0].split(".").join(""), c = 0; c < Math.abs(Number(a[1])) - d; c++) b += "0"
            }
            return b
        }, a.toScientific = function (a, b) {
            if (0 === a) return "0";
            var c = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E),
                d = String(d).split(".").join(b);
            return String(d) + "e" + c
        }, a.randomColor = function () {
            return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6)
        }, a.hitTest = function (b, c, d) {
            var e = !1,
                f = b.x,
                g = b.x + b.width,
                h = b.y,
                i = b.y + b.height,
                j = a.isInRectangle;
            return e || (e = j(f, h, c)), e || (e = j(f, i, c)), e || (e = j(g, h, c)), e || (e = j(g, i, c)), e || !0 === d || (e = a.hitTest(c, b, !0)), e
        }, a.isInRectangle = function (a, b, c) {
            return a >= c.x - 5 && a <= c.x + c.width + 5 && b >= c.y - 5 && b <= c.y + c.height + 5
        }, a.isPercents = function (a) {
            if (-1 != String(a).indexOf("%")) return !0
        }, a.formatValue = function (b, c, d, e, f, g, h, i) {
            if (c) {
                void 0 === f && (f = "");
                var j;
                for (j = 0; j < d.length; j++) {
                    var k = d[j],
                        l = c[k];
                    void 0 !== l && (l = g ? a.addPrefix(l, i, h, e) : a.formatNumber(l, e), b = b.replace(new RegExp("\\[\\[" + f + k + "\\]\\]", "g"), l))
                }
            }
            return b
        }, a.formatDataContextValue = function (a, b) {
            if (a) {
                var d, c = a.match(/\[\[.*?\]\]/g);
                for (d = 0; d < c.length; d++) {
                    var e = c[d],
                        e = e.substr(2, e.length - 4);
                    void 0 !== b[e] && (a = a.replace(new RegExp("\\[\\[" + e + "\\]\\]", "g"), b[e]))
                }
            }
            return a
        }, a.massReplace = function (a, b) {
            for (var c in b)
                if (b.hasOwnProperty(c)) {
                    var d = b[c];
                    void 0 === d && (d = ""), a = a.replace(c, d)
                }
            return a
        }, a.cleanFromEmpty = function (a) {
            return a.replace(/\[\[[^\]]*\]\]/g, "")
        }, a.addPrefix = function (b, c, d, e, f) {
            var i, j, k, g = a.formatNumber(b, e),
                h = "";
            if (0 === b) return "0";
            if (0 > b && (h = "-"), 1 < (b = Math.abs(b))) {
                for (i = c.length - 1; - 1 < i; i--)
                    if (b >= c[i].number && (j = b / c[i].number, k = Number(e.precision), 1 > k && (k = 1), d = a.roundTo(j, k), k = a.formatNumber(d, {
                        precision: -1,
                        decimalSeparator: e.decimalSeparator,
                        thousandsSeparator: e.thousandsSeparator
                    }), !f || j == d)) {
                        g = h + "" + k + c[i].prefix;
                        break
                    }
            } else
                for (i = 0; i < d.length; i++)
                    if (b <= d[i].number) {
                        j = b / d[i].number, k = Math.abs(Math.floor(Math.log(j) * Math.LOG10E)), j = a.roundTo(j, k), g = h + "" + j + d[i].prefix;
                        break
                    } return g
        }, a.remove = function (a) {
            a && a.remove()
        }, a.getEffect = function (a) {
            return ">" == a && (a = "easeOutSine"), "<" == a && (a = "easeInSine"), "elastic" == a && (a = "easeOutElastic"), a
        }, a.getObjById = function (a, b) {
            var c, d;
            for (d = 0; d < a.length; d++) {
                var e = a[d];
                if (e.id == b) {
                    c = e;
                    break
                }
            }
            return c
        }, a.applyTheme = function (b, c, d) {
            c || (c = a.theme);
            try {
                c = JSON.parse(JSON.stringify(c))
            } catch (a) { }
            c && c[d] && a.extend(b, c[d])
        }, a.isString = function (a) {
            return "string" == typeof a
        }, a.extend = function (a, b, c) {
            var d;
            a || (a = {});
            for (d in b) c ? a.hasOwnProperty(d) || (a[d] = b[d]) : a[d] = b[d];
            return a
        }, a.copyProperties = function (a, b) {
            for (var c in a) a.hasOwnProperty(c) && "events" != c && void 0 !== a[c] && "function" != typeof a[c] && "cname" != c && (b[c] = a[c])
        }, a.processObject = function (b, c, d, e) {
            if (!1 == b instanceof c && (b = e ? a.extend(new c(d), b) : a.extend(b, new c(d), !0), b.listeners))
                for (var f in b.listeners) c = b.listeners[f], b.addListener(c.event, c.method);
            return b
        }, a.fixNewLines = function (a) {
            var b = RegExp("\\n", "g");
            return a && (a = a.replace(b, "<br />")), a
        }, a.fixBrakes = function (b) {
            if (a.isModern) {
                var c = RegExp("<br>", "g");
                b && (b = b.replace(c, "\n"))
            } else b = a.fixNewLines(b);
            return b
        }, a.deleteObject = function (b, c) {
            if (b && (void 0 !== c && null !== c || (c = 20), 0 !== c))
                if ("[object Array]" === Object.prototype.toString.call(b))
                    for (var d = 0; d < b.length; d++) a.deleteObject(b[d], c - 1), b[d] = null;
                else if (b && !b.tagName) try {
                    for (d in b.theme = null, b) b[d] && ("object" == typeof b[d] && a.deleteObject(b[d], c - 1), "function" != typeof b[d] && (b[d] = null))
                } catch (a) { }
        }, a.bounce = function (a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
        }, a.easeInOutQuad = function (a, b, c, d, e) {
            return 1 > (b /= e / 2) ? d / 2 * b * b + c : (b-- , -d / 2 * (b * (b - 2) - 1) + c)
        }, a.easeInSine = function (a, b, c, d, e) {
            return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
        }, a.easeOutSine = function (a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c
        }, a.easeOutElastic = function (a, b, c, d, e) {
            a = 1.70158;
            var f = 0,
                g = d;
            return 0 === b ? c : 1 == (b /= e) ? c + d : (f || (f = .3 * e), g < Math.abs(d) ? (g = d, a = f / 4) : a = f / (2 * Math.PI) * Math.asin(d / g), g * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - a) * Math.PI / f) + d + c)
        }, a.fixStepE = function (b) {
            b = b.toExponential(0).split("e");
            var c = Number(b[1]);
            return 9 == Number(b[0]) && c++ , a.generateNumber(1, c)
        }, a.generateNumber = function (a, b) {
            var d, c = "";
            d = 0 > b ? Math.abs(b) - 1 : Math.abs(b);
            var e;
            for (e = 0; e < d; e++) c += "0";
            return 0 > b ? Number("0." + c + String(a)) : Number(String(a) + c)
        }, a.setCN = function (a, b, c, d) {
            if (a.addClassNames && b && (b = b.node) && c) {
                var e = b.getAttribute("class");
                a = a.classNamePrefix + "-", d && (a = ""), e ? b.setAttribute("class", e + " " + a + c) : b.setAttribute("class", a + c)
            }
        }, a.removeCN = function (a, b, c) {
            b && (b = b.node) && c && (b = b.classList) && b.remove(a.classNamePrefix + "-" + c)
        }, a.parseDefs = function (b, c) {
            for (var d in b) {
                var e = typeof b[d];
                if (0 < b[d].length && "object" == e)
                    for (var f = 0; f < b[d].length; f++) e = document.createElementNS(a.SVG_NS, d), c.appendChild(e), a.parseDefs(b[d][f], e);
                else "object" == e ? (e = document.createElementNS(a.SVG_NS, d), c.appendChild(e), a.parseDefs(b[d], e)) : c.setAttribute(d, b[d])
            }
        }
    }(),
    function () {
        var a = window.HistoryMaps;
        a.AmDraw = a.Class({
            construct: function (b, c, d, e) {
                a.SVG_NS = "http://www.w3.org/2000/svg", a.SVG_XLINK = "http://www.w3.org/1999/xlink", a.hasSVG = !!document.createElementNS && !!document.createElementNS(a.SVG_NS, "svg").createSVGRect, 1 > c && (c = 10), 1 > d && (d = 10), this.div = b, this.width = c, this.height = d, this.rBin = document.createElement("div"), a.hasSVG ? (a.SVG = !0, c = this.createSvgElement("svg"), b.appendChild(c), this.container = c, this.addDefs(e), this.R = new a.SVGRenderer(this)) : a.isIE && a.VMLRenderer && (a.VML = !0, a.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), 31 > document.styleSheets.length ? (c = document.createStyleSheet(), c.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), a.vmlStyleSheet = c) : document.styleSheets[0].addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true")), this.container = b, this.R = new a.VMLRenderer(this, e), this.R.disableSelection(b))
            },
            createSvgElement: function (b) {
                return document.createElementNS(a.SVG_NS, b)
            },
            circle: function (b, c, d, e) {
                var f = new a.AmDObject("circle", this);
                return f.attr({
                    r: d,
                    cx: b,
                    cy: c
                }), this.addToContainer(f.node, e), f
            },
            ellipse: function (b, c, d, e, f) {
                var g = new a.AmDObject("ellipse", this);
                return g.attr({
                    rx: d,
                    ry: e,
                    cx: b,
                    cy: c
                }), this.addToContainer(g.node, f), g
            },
            setSize: function (a, b) {
                0 < a && 0 < b && (this.container.style.width = a + "px", this.container.style.height = b + "px")
            },
            rect: function (b, c, d, e, f, g, h) {
                var i = new a.AmDObject("rect", this);
                return a.VML && (f = Math.round(100 * f / Math.min(d, e)), d += 2 * g, e += 2 * g, i.bw = g, i.node.style.marginLeft = -g, i.node.style.marginTop = -g), 1 > d && (d = 1), 1 > e && (e = 1), i.attr({
                    x: b,
                    y: c,
                    width: d,
                    height: e,
                    rx: f,
                    ry: f,
                    "stroke-width": g
                }), this.addToContainer(i.node, h), i
            },
            image: function (b, c, d, e, f, g) {
                var h = new a.AmDObject("image", this);
                return h.attr({
                    x: c,
                    y: d,
                    width: e,
                    height: f
                }), this.R.path(h, b), this.addToContainer(h.node, g), h
            },
            addToContainer: function (a, b) {
                b || (b = this.container), b.appendChild(a)
            },
            text: function (a, b, c) {
                return this.R.text(a, b, c)
            },
            path: function (b, c, d, e) {
                var f = new a.AmDObject("path", this);
                return e || (e = "100,100"), f.attr({
                    cs: e
                }), d ? f.attr({
                    dd: b
                }) : f.attr({
                    d: b
                }), this.addToContainer(f.node, c), f
            },
            set: function (a) {
                return this.R.set(a)
            },
            remove: function (a) {
                if (a) {
                    var b = this.rBin;
                    b.appendChild(a), b.innerHTML = ""
                }
            },
            renderFix: function () {
                var a = this.container,
                    b = a.style;
                b.top = "0px", b.left = "0px";
                try {
                    var c = a.getBoundingClientRect(),
                        d = c.left - Math.round(c.left),
                        e = c.top - Math.round(c.top);
                    d && (b.left = d + "px"), e && (b.top = e + "px")
                } catch (a) { }
            },
            update: function () {
                this.R.update()
            },
            addDefs: function (b) {
                if (a.hasSVG) {
                    var c = this.createSvgElement("desc"),
                        d = this.container;
                    if (d.setAttribute("version", "1.1"), d.style.position = "absolute", this.setSize(this.width, this.height), b.accessibleTitle) {
                        var e = this.createSvgElement("text");
                        d.appendChild(e), e.innerHTML = b.accessibleTitle, e.style.opacity = 0
                    }
                    a.rtl && (d.setAttribute("direction", "rtl"), d.style.left = "auto", d.style.right = "0px"), b && (b.addCodeCredits && c.appendChild(document.createTextNode("JavaScript chart by amCharts " + b.version)), d.appendChild(c), b.defs && (c = this.createSvgElement("defs"), d.appendChild(c), a.parseDefs(b.defs, c), this.defs = c))
                }
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.AmDObject = a.Class({
            construct: function (a, b) {
                this.D = b, this.R = b.R, this.node = this.R.create(this, a), this.y = this.x = 0, this.scale = 1
            },
            attr: function (a) {
                return this.R.attr(this, a), this
            },
            getAttr: function (a) {
                return this.node.getAttribute(a)
            },
            setAttr: function (a, b) {
                return this.R.setAttr(this, a, b), this
            },
            clipRect: function (a, b, c, d) {
                this.R.clipRect(this, a, b, c, d)
            },
            translate: function (a, b, c, d) {
                d || (a = Math.round(a), b = Math.round(b)), this.R.move(this, a, b, c), this.x = a, this.y = b, this.scale = c, this.angle && this.rotate(this.angle)
            },
            rotate: function (a, b) {
                this.R.rotate(this, a, b), this.angle = a
            },
            animate: function (b, c, d) {
                for (var e in b)
                    if (b.hasOwnProperty(e)) {
                        var f = e,
                            g = b[e];
                        d = a.getEffect(d), this.R.animate(this, f, g, c, d)
                    }
            },
            push: function (a) {
                if (a) {
                    var b = this.node;
                    b.appendChild(a.node);
                    var c = a.clipPath;
                    c && b.appendChild(c), (a = a.grad) && b.appendChild(a)
                }
            },
            text: function (a) {
                this.R.setText(this, a)
            },
            remove: function () {
                this.stop(), this.R.remove(this)
            },
            clear: function () {
                var a = this.node;
                if (a.hasChildNodes())
                    for (; 1 <= a.childNodes.length;) a.removeChild(a.firstChild)
            },
            hide: function () {
                this.setAttr("visibility", "hidden")
            },
            show: function () {
                this.setAttr("visibility", "visible")
            },
            getBBox: function () {
                return this.R.getBBox(this)
            },
            toFront: function () {
                var a = this.node;
                if (a) {
                    this.prevNextNode = a.nextSibling;
                    var b = a.parentNode;
                    b && b.appendChild(a)
                }
            },
            toPrevious: function () {
                var a = this.node;
                a && this.prevNextNode && (a = a.parentNode) && a.insertBefore(this.prevNextNode, null)
            },
            toBack: function () {
                var a = this.node;
                if (a) {
                    this.prevNextNode = a.nextSibling;
                    var b = a.parentNode;
                    if (b) {
                        var c = b.firstChild;
                        c && b.insertBefore(a, c)
                    }
                }
            },
            mouseover: function (a) {
                return this.R.addListener(this, "mouseover", a), this
            },
            mouseout: function (a) {
                return this.R.addListener(this, "mouseout", a), this
            },
            click: function (a) {
                return this.R.addListener(this, "click", a), this
            },
            dblclick: function (a) {
                return this.R.addListener(this, "dblclick", a), this
            },
            mousedown: function (a) {
                return this.R.addListener(this, "mousedown", a), this
            },
            mouseup: function (a) {
                return this.R.addListener(this, "mouseup", a), this
            },
            touchmove: function (a) {
                return this.R.addListener(this, "touchmove", a), this
            },
            touchstart: function (a) {
                return this.R.addListener(this, "touchstart", a), this
            },
            touchend: function (a) {
                return this.R.addListener(this, "touchend", a), this
            },
            keyup: function (a) {
                return this.R.addListener(this, "keyup", a), this
            },
            focus: function (a) {
                return this.R.addListener(this, "focus", a), this
            },
            blur: function (a) {
                return this.R.addListener(this, "blur", a), this
            },
            contextmenu: function (a) {
                return this.node.addEventListener ? this.node.addEventListener("contextmenu", a, !0) : this.R.addListener(this, "contextmenu", a), this
            },
            stop: function () {
                a.removeFromArray(this.R.animations, this.an_translate), a.removeFromArray(this.R.animations, this.an_y), a.removeFromArray(this.R.animations, this.an_x)
            },
            length: function () {
                return this.node.childNodes.length
            },
            gradient: function (a, b, c) {
                this.R.gradient(this, a, b, c)
            },
            pattern: function (a, b, c) {
                a && this.R.pattern(this, a, b, c)
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.SVGRenderer = a.Class({
            construct: function (a) {
                this.D = a, this.animations = []
            },
            create: function (b, c) {
                return document.createElementNS(a.SVG_NS, c)
            },
            attr: function (a, b) {
                for (var c in b) b.hasOwnProperty(c) && this.setAttr(a, c, b[c])
            },
            setAttr: function (a, b, c) {
                void 0 !== c && a.node.setAttribute(b, c)
            },
            animate: function (b, c, d, e, f) {
                b.animationFinished = !1;
                var g = b.node;
                b["an_" + c] && a.removeFromArray(this.animations, b["an_" + c]), "translate" == c ? (g = (g = g.getAttribute("transform")) ? String(g).substring(10, g.length - 1) : "0,0", g = g.split(", ").join(" "), 0 === (g = g.split(" ").join(",")) && (g = "0,0")) : g = Number(g.getAttribute(c)), d = {
                    obj: b,
                    frame: 0,
                    attribute: c,
                    from: g,
                    to: d,
                    time: e,
                    effect: f
                }, this.animations.push(d), b["an_" + c] = d
            },
            update: function () {
                var b, c = this.animations;
                for (b = c.length - 1; 0 <= b; b--) {
                    var i, j, k, d = c[b],
                        e = d.time * a.updateRate,
                        f = d.frame + 1,
                        g = d.obj,
                        h = d.attribute;
                    if (f <= e) {
                        if (d.frame++ , "translate" == h) {
                            if (i = d.from.split(","), h = Number(i[0]), i = Number(i[1]), isNaN(i) && (i = 0), j = d.to.split(","), k = Number(j[0]), j = Number(j[1]), k = 0 == k - h ? k : Math.round(a[d.effect](0, f, h, k - h, e)), d = 0 == j - i ? j : Math.round(a[d.effect](0, f, i, j - i, e)), h = "transform", isNaN(k) || isNaN(d)) continue;
                            d = "translate(" + k + "," + d + ")"
                        } else j = Number(d.from), i = Number(d.to), k = i - j, d = a[d.effect](0, f, j, k, e), isNaN(d) && (d = i), 0 === k && this.animations.splice(b, 1);
                        this.setAttr(g, h, d)
                    } else "translate" == h ? (j = d.to.split(","), k = Number(j[0]), j = Number(j[1]), g.translate(k, j)) : (i = Number(d.to), this.setAttr(g, h, i)), g.animationFinished = !0, this.animations.splice(b, 1)
                }
            },
            getBBox: function (a) {
                if (a = a.node) try {
                    return a.getBBox()
                } catch (a) { }
                return {
                    width: 0,
                    height: 0,
                    x: 0,
                    y: 0
                }
            },
            path: function (b, c) {
                b.node.setAttributeNS(a.SVG_XLINK, "xlink:href", c)
            },
            clipRect: function (b, c, d, e, f) {
                var g = b.node,
                    h = b.clipPath;
                h && this.D.remove(h);
                var i = g.parentNode;
                i && (g = document.createElementNS(a.SVG_NS, "clipPath"), h = a.getUniqueId(), g.setAttribute("id", h), this.D.rect(c, d, e, f, 0, 0, g), i.appendChild(g), c = "#", a.baseHref && !a.isIE && (c = this.removeTarget(window.location.href) + c), this.setAttr(b, "clip-path", "url(" + c + h + ")"), this.clipPathC++ , b.clipPath = g)
            },
            text: function (b, c, d) {
                var e = new a.AmDObject("text", this.D);
                b = String(b).split("\n");
                var g, f = a.removePx(c["font-size"]);
                for (g = 0; g < b.length; g++) {
                    var h = this.create(null, "tspan");
                    h.appendChild(document.createTextNode(b[g])), h.setAttribute("y", (f + 2) * g + Math.round(f / 2)), h.setAttribute("x", 0), e.node.appendChild(h)
                }
                return e.node.setAttribute("y", Math.round(f / 2)), this.attr(e, c), this.D.addToContainer(e.node, d), e
            },
            setText: function (a, b) {
                var c = a.node;
                c && (c.removeChild(c.firstChild), c.appendChild(document.createTextNode(b)))
            },
            move: function (a, b, c, d) {
                isNaN(b) && (b = 0), isNaN(c) && (c = 0), b = "translate(" + b + "," + c + ")", d && (b = b + " scale(" + d + ")"), this.setAttr(a, "transform", b)
            },
            rotate: function (a, b) {
                var c = a.node.getAttribute("transform"),
                    d = "rotate(" + b + ")";
                c && (d = c + " " + d), this.setAttr(a, "transform", d)
            },
            set: function (b) {
                var c = new a.AmDObject("g", this.D);
                if (this.D.container.appendChild(c.node), b) {
                    var d;
                    for (d = 0; d < b.length; d++) c.push(b[d])
                }
                return c
            },
            addListener: function (a, b, c) {
                a.node["on" + b] = c
            },
            gradient: function (b, c, d, e) {
                var f = b.node,
                    g = b.grad;
                if (g && this.D.remove(g), c = document.createElementNS(a.SVG_NS, c), g = a.getUniqueId(), c.setAttribute("id", g), !isNaN(e)) {
                    var h = 0,
                        i = 0,
                        j = 0,
                        k = 0;
                    90 == e ? j = 100 : 270 == e ? k = 100 : 180 == e ? h = 100 : 0 === e && (i = 100), c.setAttribute("x1", h + "%"), c.setAttribute("x2", i + "%"), c.setAttribute("y1", j + "%"), c.setAttribute("y2", k + "%")
                }
                for (e = 0; e < d.length; e++) h = document.createElementNS(a.SVG_NS, "stop"), i = 100 * e / (d.length - 1), 0 === e && (i = 0), h.setAttribute("offset", i + "%"), h.setAttribute("stop-color", d[e]), c.appendChild(h);
                f.parentNode.appendChild(c), d = "#", a.baseHref && !a.isIE && (d = this.removeTarget(window.location.href) + d), f.setAttribute("fill", "url(" + d + g + ")"), b.grad = c
            },
            removeTarget: function (a) {
                return a.split("#")[0]
            },
            pattern: function (b, c, d, e) {
                var f = b.node;
                isNaN(d) && (d = 1);
                var g = b.patternNode;
                g && this.D.remove(g);
                var g = document.createElementNS(a.SVG_NS, "pattern"),
                    h = a.getUniqueId(),
                    i = c;
                c.url && (i = c.url), a.isAbsolute(i) || -1 != i.indexOf("data:image") || (i = e + i), e = Number(c.width), isNaN(e) && (e = 4);
                var j = Number(c.height);
                isNaN(j) && (j = 4), e /= d, j /= d, d = c.x, isNaN(d) && (d = 0);
                var k = -Math.random() * Number(c.randomX);
                isNaN(k) || (d = k), k = c.y, isNaN(k) && (k = 0);
                var l = -Math.random() * Number(c.randomY);
                isNaN(l) || (k = l), g.setAttribute("id", h), g.setAttribute("width", e), g.setAttribute("height", j), g.setAttribute("patternUnits", "userSpaceOnUse"), g.setAttribute("xlink:href", i), c.color && (l = document.createElementNS(a.SVG_NS, "rect"), l.setAttributeNS(null, "height", e), l.setAttributeNS(null, "width", j), l.setAttributeNS(null, "fill", c.color), g.appendChild(l)), this.D.image(i, 0, 0, e, j, g).translate(d, k), i = "#", a.baseHref && !a.isIE && (i = this.removeTarget(window.location.href) + i), f.setAttribute("fill", "url(" + i + h + ")"), b.patternNode = g, f.parentNode.appendChild(g)
            },
            remove: function (a) {
                a.clipPath && this.D.remove(a.clipPath), a.grad && this.D.remove(a.grad), a.patternNode && this.D.remove(a.patternNode), this.D.remove(a.node)
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.HistoryMap = a.Class({
            construct: function (b) {
                this.svgIcons = this.tapToActivate = !0, this.theme = b, this.classNamePrefix = "historymaps", this.addClassNames = !1, this.version = "3.20.20", a.addChart(this), this.createEvents("buildStarted", "dataUpdated", "init", "rendered", "drawn", "failed", "resized", "animationFinished"), this.height = this.width = "100%", this.dataChanged = !0, this.chartCreated = !1, this.previousWidth = this.previousHeight = 0, this.backgroundColor = "#FFFFFF", this.borderAlpha = this.backgroundAlpha = 0, this.color = this.borderColor = "#000000", this.fontFamily = "Verdana", this.fontSize = 11, this.usePrefixes = !1, this.autoResize = !0, this.autoDisplay = !1, this.addCodeCredits = this.accessible = !0, this.touchStartTime = this.touchClickDuration = 0, this.precision = -1, this.percentPrecision = 2, this.decimalSeparator = ".", this.thousandsSeparator = ",", this.labels = [], this.allLabels = [], this.titles = [], this.marginRight = this.marginLeft = this.autoMarginOffset = 0, this.timeOuts = [], this.creditsPosition = "top-left";
                var c = document.createElement("div"),
                    d = c.style;
                d.overflow = "hidden", d.position = "relative", d.textAlign = "left", this.chartDiv = c, c = document.createElement("div"), d = c.style, d.overflow = "hidden", d.position = "relative", d.textAlign = "left", this.legendDiv = c, this.titleHeight = 0, this.hideBalloonTime = 150, this.handDrawScatter = 2, this.cssScale = this.handDrawThickness = 1, this.cssAngle = 0, this.prefixesOfBigNumbers = [{
                    number: 1e3,
                    prefix: "k"
                }, {
                    number: 1e6,
                    prefix: "M"
                }, {
                    number: 1e9,
                    prefix: "G"
                }, {
                    number: 1e12,
                    prefix: "T"
                }, {
                    number: 1e15,
                    prefix: "P"
                }, {
                    number: 1e18,
                    prefix: "E"
                }, {
                    number: 1e21,
                    prefix: "Z"
                }, {
                    number: 1e24,
                    prefix: "Y"
                }], this.prefixesOfSmallNumbers = [{
                    number: 1e-24,
                    prefix: "y"
                }, {
                    number: 1e-21,
                    prefix: "z"
                }, {
                    number: 1e-18,
                    prefix: "a"
                }, {
                    number: 1e-15,
                    prefix: "f"
                }, {
                    number: 1e-12,
                    prefix: "p"
                }, {
                    number: 1e-9,
                    prefix: "n"
                }, {
                    number: 1e-6,
                    prefix: "μ"
                }, {
                    number: .001,
                    prefix: "m"
                }], this.panEventsEnabled = !0, this.product = "historymaps", this.animations = [], this.balloon = new a.AmBalloon(this.theme), this.balloon.chart = this, this.processTimeout = 0, this.processCount = 1e3, this.animatable = [], this.langObj = {}, a.applyTheme(this, b, "HistoryMap")
            },
            drawChart: function () {
                0 < this.realWidth && 0 < this.realHeight && (this.drawBackground(), this.redrawLabels(), this.drawTitles(), this.brr(), this.renderFix(), this.chartDiv && (this.boundingRect = this.chartDiv.getBoundingClientRect()))
            },
            makeAccessible: function (a, b, c) {
                this.accessible && a && (c && a.setAttr("role", c), a.setAttr("aria-label", b), a.setAttr("class", "countryArea"))
            },
            drawBackground: function () {
                a.remove(this.background);
                var b = this.container,
                    c = this.backgroundColor,
                    d = this.backgroundAlpha,
                    e = this.set;
                a.isModern || 0 !== d || (d = .001);
                var f = this.updateWidth();
                this.realWidth = f;
                var g = this.updateHeight();
                this.realHeight = g, c = a.polygon(b, [0, f - 1, f - 1, 0], [0, 0, g - 1, g - 1], c, d, 1, this.borderColor, this.borderAlpha), a.setCN(this, c, "bg"), this.background = c, e.push(c), (c = this.backgroundImage) && (b = b.image(c, 0, 0, f, g), a.setCN(this, c, "bg-image"), this.bgImg = b, e.push(b))
            },
            drawTitles: function (b) {
                var c = this.titles;
                if (this.titleHeight = 0, a.ifArray(c)) {
                    var e, d = 20;
                    for (e = 0; e < c.length; e++) {
                        var f = c[e],
                            f = a.processObject(f, a.Title, this.theme);
                        if (!1 !== f.enabled) {
                            var g = f.color;
                            void 0 === g && (g = this.color);
                            var h = f.size;
                            isNaN(h) && (h = this.fontSize + 2), isNaN(f.alpha);
                            var i = this.marginLeft,
                                j = !0;
                            void 0 !== f.bold && (j = f.bold), g = a.wrappedText(this.container, f.text, g, this.fontFamily, h, "middle", j, this.realWidth - 35), g.translate(i + (this.realWidth - this.marginRight - i) / 2, d), g.node.style.pointerEvents = "none", f.sprite = g, void 0 !== f.tabIndex && g.setAttr("tabindex", f.tabIndex), a.setCN(this, g, "title"), f.id && a.setCN(this, g, "title-" + f.id), g.attr({
                                opacity: f.alpha
                            }), d += g.getBBox().height + 5, b ? g.remove() : this.freeLabelsSet.push(g)
                        }
                    }
                    this.titleHeight = d - 10
                }
            },
            write: function (a) {
                var b = this;
                if (b.listeners)
                    for (var c = 0; c < b.listeners.length; c++) {
                        var d = b.listeners[c];
                        b.addListener(d.event, d.method)
                    }
                b.fire({
                    type: "buildStarted",
                    chart: b
                }), b.afterWriteTO && clearTimeout(b.afterWriteTO), 0 < b.processTimeout ? b.afterWriteTO = setTimeout(function () {
                    b.afterWrite.call(b, a)
                }, b.processTimeout) : b.afterWrite(a)
            },
            afterWrite: function (b) {
                var c;
                if (c = "object" != typeof b ? document.getElementById(b) : b) {
                    for (; c.firstChild;) c.removeChild(c.firstChild);
                    this.div = c, c.style.overflow = "hidden", c.style.textAlign = "left", b = this.chartDiv;
                    var d = this.legendDiv,
                        e = this.legend,
                        f = d.style,
                        g = b.style;
                    this.measure(), this.previousHeight = this.divRealHeight, this.previousWidth = this.divRealWidth;
                    var h, i = document.createElement("div");
                    if (h = i.style, h.position = "relative", this.containerDiv = i, i.className = this.classNamePrefix + "-main-div", b.className = this.classNamePrefix + "-chart-div", c.appendChild(i), (c = this.exportConfig) && a.AmExport && !this.AmExport && (this.AmExport = new a.AmExport(this, c)), this.amExport && a.AmExport && (this.AmExport = a.extend(this.amExport, new a.AmExport(this), !0)), this.AmExport && this.AmExport.init && this.AmExport.init(), e) {
                        if (e = this.addLegend(e, e.divId), e.enabled) switch (f.left = null, f.top = null, f.right = null, g.left = null, g.right = null, g.top = null, f.position = "relative", g.position = "relative", h.width = "100%", h.height = "100%", e.position) {
                            case "bottom":
                                i.appendChild(b), i.appendChild(d);
                                break;
                            case "top":
                                i.appendChild(d), i.appendChild(b);
                                break;
                            case "absolute":
                                f.position = "absolute", g.position = "absolute", void 0 !== e.left && (f.left = e.left + "px"), void 0 !== e.right && (f.right = e.right + "px"), void 0 !== e.top && (f.top = e.top + "px"), void 0 !== e.bottom && (f.bottom = e.bottom + "px"), e.marginLeft = 0, e.marginRight = 0, i.appendChild(b), i.appendChild(d);
                                break;
                            case "right":
                                f.position = "relative", g.position = "absolute", i.appendChild(b), i.appendChild(d);
                                break;
                            case "left":
                                f.position = "absolute", g.position = "relative", i.appendChild(b), i.appendChild(d);
                                break;
                            case "outside":
                                i.appendChild(b)
                        } else i.appendChild(b);
                        this.prevLegendPosition = e.position
                    } else i.appendChild(b);
                    this.listenersAdded || (this.addListeners(), this.listenersAdded = !0), this.initChart()
                }
            },
            createLabelsSet: function () {
                a.remove(this.labelsSet), this.labelsSet = this.container.set(), this.freeLabelsSet.push(this.labelsSet)
            },
            initChart: function () {
                this.balloon = a.processObject(this.balloon, a.AmBalloon, this.theme), window.HistoryMaps_path && (this.path = window.HistoryMaps_path), void 0 === this.path && (this.path = a.getPath()), void 0 === this.path && (this.path = "historymaps/"), this.path = a.normalizeUrl(this.path), void 0 === this.pathToImages && (this.pathToImages = this.path + "images/"), this.initHC || (a.callInitHandler(this), this.initHC = !0), a.applyLang(this.language, this);
                var b = this.numberFormatter;
                b && (isNaN(b.precision) || (this.precision = b.precision), void 0 !== b.thousandsSeparator && (this.thousandsSeparator = b.thousandsSeparator), void 0 !== b.decimalSeparator && (this.decimalSeparator = b.decimalSeparator)), (b = this.percentFormatter) && !isNaN(b.precision) && (this.percentPrecision = b.precision), this.nf = {
                    precision: this.precision,
                    thousandsSeparator: this.thousandsSeparator,
                    decimalSeparator: this.decimalSeparator
                }, this.pf = {
                    precision: this.percentPrecision,
                    thousandsSeparator: this.thousandsSeparator,
                    decimalSeparator: this.decimalSeparator
                }, this.destroy(), (b = this.container) ? (b.container.innerHTML = "", b.width = this.realWidth, b.height = this.realHeight, b.addDefs(this), this.chartDiv.appendChild(b.container)) : b = new a.AmDraw(this.chartDiv, this.realWidth, this.realHeight, this), this.container = b, this.extension = ".png", this.svgIcons && a.SVG && (this.extension = ".svg"), this.checkDisplay(), this.checkTransform(this.div), b.chart = this, a.VML || a.SVG ? (b.handDrawn = this.handDrawn, b.handDrawScatter = this.handDrawScatter, b.handDrawThickness = this.handDrawThickness, a.remove(this.set), this.set = b.set(), a.remove(this.gridSet), this.gridSet = b.set(), a.remove(this.cursorLineSet), this.cursorLineSet = b.set(), a.remove(this.graphsBehindSet), this.graphsBehindSet = b.set(), a.remove(this.bulletBehindSet), this.bulletBehindSet = b.set(), a.remove(this.columnSet), this.columnSet = b.set(), a.remove(this.graphsSet), this.graphsSet = b.set(), a.remove(this.trendLinesSet), this.trendLinesSet = b.set(), a.remove(this.axesSet), this.axesSet = b.set(), a.remove(this.cursorSet), this.cursorSet = b.set(), a.remove(this.scrollbarsSet), this.scrollbarsSet = b.set(), a.remove(this.bulletSet), this.bulletSet = b.set(), a.remove(this.freeLabelsSet), this.freeLabelsSet = b.set(), a.remove(this.axesLabelsSet), this.axesLabelsSet = b.set(), a.remove(this.balloonsSet), this.balloonsSet = b.set(), a.remove(this.plotBalloonsSet), this.plotBalloonsSet = b.set(), a.remove(this.zoomButtonSet), this.zoomButtonSet = b.set(), a.remove(this.zbSet), this.zbSet = null, a.remove(this.linkSet), this.linkSet = b.set()) : this.fire({
                    type: "failed",
                    chart: this
                })
            },
            premeasure: function () {
                var a = this.div;
                if (a) {
                    try {
                        this.boundingRect = this.chartDiv.getBoundingClientRect()
                    } catch (a) { }
                    var b = a.offsetWidth,
                        c = a.offsetHeight;
                    a.clientHeight && (b = a.clientWidth, c = a.clientHeight), b == this.mw && c == this.mh || (this.mw = b, this.mh = c, this.measure())
                }
            },
            measure: function () {
                var b = this.div;
                if (b) {
                    var c = this.chartDiv,
                        d = b.offsetWidth,
                        e = b.offsetHeight,
                        f = this.container;
                    b.clientHeight && (d = b.clientWidth, e = b.clientHeight);
                    var e = Math.round(e),
                        d = Math.round(d),
                        b = Math.round(a.toCoordinate(this.width, d)),
                        g = Math.round(a.toCoordinate(this.height, e));
                    (d != this.previousWidth || e != this.previousHeight) && 0 < b && 0 < g && (c.style.width = b + "px", c.style.height = g + "px", c.style.padding = 0, f && f.setSize(b, g), this.balloon = a.processObject(this.balloon, a.AmBalloon, this.theme)), this.balloon && this.balloon.setBounds && this.balloon.setBounds(2, 2, b - 2, g), this.updateWidth(), this.balloon.chart = this, this.realWidth = b, this.realHeight = g, this.divRealWidth = d, this.divRealHeight = e
                }
            },
            checkDisplay: function () {
                if (this.autoDisplay && this.container) {
                    var b = a.rect(this.container, 10, 10),
                        c = b.getBBox();
                    0 === c.width && 0 === c.height && (this.divRealHeight = this.divRealWidth = this.realHeight = this.realWidth = 0, this.previousWidth = this.previousHeight = NaN), b.remove()
                }
            },
            checkTransform: function (a) {
                if (this.autoTransform && window.getComputedStyle && a) {
                    if (a.style) {
                        var b = window.getComputedStyle(a, null);
                        if (b && (b = b.getPropertyValue("-webkit-transform") || b.getPropertyValue("-moz-transform") || b.getPropertyValue("-ms-transform") || b.getPropertyValue("-o-transform") || b.getPropertyValue("transform")) && "none" !== b) {
                            var c = b.split("(")[1].split(")")[0].split(","),
                                b = c[0],
                                c = c[1],
                                b = Math.sqrt(b * b + c * c);
                            isNaN(b) || (this.cssScale *= b)
                        }
                    }
                    a.parentNode && this.checkTransform(a.parentNode)
                }
            },
            destroy: function () {
                this.chartDiv.innerHTML = "", this.clearTimeOuts(), this.legend && this.legend.destroy()
            },
            clearTimeOuts: function () {
                var a = this.timeOuts;
                if (a) {
                    var b;
                    for (b = 0; b < a.length; b++) clearTimeout(a[b])
                }
                this.timeOuts = []
            },
            clear: function (b) {
                try {
                    document.removeEventListener("touchstart", this.docfn1, !0), document.removeEventListener("touchend", this.docfn2, !0)
                } catch (a) { }
                if (a.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]), this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null, this.clearTimeOuts(), this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv)), b || a.removeChart(this), b = this.div)
                    for (; b.firstChild;) b.removeChild(b.firstChild);
                this.legend && this.legend.destroy(), this.AmExport && this.AmExport.clear && this.AmExport.clear()
            },
            setMouseCursor: function (b) {
                "auto" == b && a.isNN && (b = "default"), this.chartDiv.style.cursor = b, this.legendDiv.style.cursor = b
            },
            redrawLabels: function () {
                this.labels = [];
                var a = this.allLabels;
                this.createLabelsSet();
                var b;
                for (b = 0; b < a.length; b++) this.drawLabel(a[b])
            },
            drawLabel: function (b) {
                var c = this;
                if (c.container && !1 !== b.enabled) {
                    b = a.processObject(b, a.Label, c.theme);
                    var d = b.y,
                        e = b.text,
                        f = b.align,
                        g = b.size,
                        h = b.color,
                        i = b.rotation,
                        j = b.alpha,
                        k = b.bold,
                        l = a.toCoordinate(b.x, c.realWidth),
                        d = a.toCoordinate(d, c.realHeight);
                    l || (l = 0), d || (d = 0), void 0 === h && (h = c.color), isNaN(g) && (g = c.fontSize), f || (f = "start"), "left" == f && (f = "start"), "right" == f && (f = "end"), "center" == f && (f = "middle", i ? d = c.realHeight - d + d / 2 : l = c.realWidth / 2 - l), void 0 === j && (j = 1), void 0 === i && (i = 0), d += g / 2, e = a.text(c.container, e, h, c.fontFamily, g, f, k, j), e.translate(l, d), void 0 !== b.tabIndex && e.setAttr("tabindex", b.tabIndex), a.setCN(c, e, "label"), b.id && a.setCN(c, e, "label-" + b.id), 0 !== i && e.rotate(i), b.url ? (e.setAttr("cursor", "pointer"), e.click(function () {
                        a.getURL(b.url, c.urlTarget)
                    })) : e.node.style.pointerEvents = "none", c.labelsSet.push(e), c.labels.push(e)
                }
            },
            addLabel: function (a, b, c, d, e, f, g, h, i, j) {
                a = {
                    x: a,
                    y: b,
                    text: c,
                    align: d,
                    size: e,
                    color: f,
                    alpha: h,
                    rotation: g,
                    bold: i,
                    url: j,
                    enabled: !0
                }, this.container && this.drawLabel(a), this.allLabels.push(a)
            },
            clearLabels: function () {
                var b, a = this.labels;
                for (b = a.length - 1; 0 <= b; b--) a[b].remove();
                this.labels = [], this.allLabels = []
            },
            updateHeight: function () {
                var a = this.divRealHeight,
                    b = this.legend;
                if (b) {
                    var c = this.legendDiv.offsetHeight,
                        b = b.position;
                    "top" != b && "bottom" != b || (a -= c, (0 > a || isNaN(a)) && (a = 0), this.chartDiv.style.height = a + "px")
                }
                return a
            },
            updateWidth: function () {
                var a = this.divRealWidth,
                    b = this.divRealHeight,
                    c = this.legend;
                if (c) {
                    var d = this.legendDiv,
                        e = d.offsetWidth;
                    isNaN(c.width) || (e = c.width), c.ieW && (e = c.ieW);
                    var f = d.offsetHeight,
                        d = d.style,
                        g = this.chartDiv.style,
                        h = c.position;
                    "right" != h && "left" != h || void 0 !== c.divId || (a -= e, (0 > a || isNaN(a)) && (a = 0), g.width = a + "px", this.balloon.setBounds(2, 2, a - 2, this.realHeight), "left" == h ? (g.left = e + "px", d.left = "0px") : (g.left = "0px", d.left = a + "px"), b > f && (d.top = (b - f) / 2 + "px"))
                }
                return a
            },
            getTitleHeight: function () {
                return this.drawTitles(!0), this.titleHeight
            },
            addTitle: function (a, b, c, d, e) {
                return isNaN(b) && (b = this.fontSize + 2), a = {
                    text: a,
                    size: b,
                    color: c,
                    alpha: d,
                    bold: e,
                    enabled: !0
                }, this.titles.push(a), a
            },
            handleWheel: function (a) {
                var b = 0;
                a || (a = window.event), a.wheelDelta ? b = a.wheelDelta / 120 : a.detail && (b = -a.detail / 3), b && this.handleWheelReal(b, a.shiftKey), a.preventDefault && a.preventDefault()
            },
            handleWheelReal: function () { },
            handleDocTouchStart: function () {
                this.handleMouseMove(), this.tmx = this.mouseX, this.tmy = this.mouseY, this.touchStartTime = (new Date).getTime()
            },
            handleDocTouchEnd: function () {
                -.5 < this.tmx && this.tmx < this.divRealWidth + 1 && 0 < this.tmy && this.tmy < this.divRealHeight ? (this.handleMouseMove(), 4 > Math.abs(this.mouseX - this.tmx) && 4 > Math.abs(this.mouseY - this.tmy) ? (this.tapped = !0, this.panRequired && this.panEventsEnabled && this.chartDiv && (this.chartDiv.style.msTouchAction = "none", this.chartDiv.style.touchAction = "none")) : this.mouseIsOver || this.resetTouchStyle()) : (this.tapped = !1, this.resetTouchStyle())
            },
            resetTouchStyle: function () {
                this.panEventsEnabled && this.chartDiv && (this.chartDiv.style.msTouchAction = "auto", this.chartDiv.style.touchAction = "auto")
            },
            checkTouchDuration: function (a) {
                var b = this,
                    c = (new Date).getTime();
                if (a)
                    if (a.touches) b.isTouchEvent = !0;
                    else if (!b.isTouchEvent) return !0;
                if (c - b.touchStartTime > b.touchClickDuration) return !0;
                setTimeout(function () {
                    b.resetTouchDuration()
                }, 300)
            },
            resetTouchDuration: function () {
                this.isTouchEvent = !1
            },
            checkTouchMoved: function () {
                if (4 < Math.abs(this.mouseX - this.tmx) || 4 < Math.abs(this.mouseY - this.tmy)) return !0
            },
            addListeners: function () {
                var a = this,
                    b = a.chartDiv;
                document.addEventListener ? ("ontouchstart" in document.documentElement && (b.addEventListener("touchstart", function (b) {
                    a.handleTouchStart.call(a, b)
                }, !0), b.addEventListener("touchmove", function (b) {
                    a.handleMouseMove.call(a, b)
                }, !0), b.addEventListener("touchend", function (b) {
                    a.handleTouchEnd.call(a, b)
                }, !0), a.docfn1 = function (b) {
                    a.handleDocTouchStart.call(a, b)
                }, a.docfn2 = function (b) {
                    a.handleDocTouchEnd.call(a, b)
                }, document.addEventListener("touchstart", a.docfn1, !0), document.addEventListener("touchend", a.docfn2, !0)), b.addEventListener("mousedown", function (b) {
                    a.mouseIsOver = !0, a.handleMouseMove.call(a, b), a.handleMouseDown.call(a, b), a.handleDocTouchStart.call(a, b)
                }, !0), b.addEventListener("mouseover", function (b) {
                    a.handleMouseOver.call(a, b)
                }, !0), b.addEventListener("mouseout", function (b) {
                    a.handleMouseOut.call(a, b)
                }, !0), b.addEventListener("mouseup", function (b) {
                    a.handleDocTouchEnd.call(a, b)
                }, !0)) : (b.attachEvent("onmousedown", function (b) {
                    a.handleMouseDown.call(a, b)
                }), b.attachEvent("onmouseover", function (b) {
                    a.handleMouseOver.call(a, b)
                }), b.attachEvent("onmouseout", function (b) {
                    a.handleMouseOut.call(a, b)
                }))
            },
            dispDUpd: function () {
                this.skipEvents || (this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, this.fire({
                    type: "dataUpdated",
                    chart: this
                })), this.chartCreated || (this.chartCreated = !0, this.fire({
                    type: "init",
                    chart: this
                })), this.chartRendered || (this.fire({
                    type: "rendered",
                    chart: this
                }), this.chartRendered = !0), this.fire({
                    type: "drawn",
                    chart: this
                })), this.skipEvents = !1
            },
            validateSize: function () {
                var a = this;
                if (a.premeasure(), a.checkDisplay(), a.cssScale = 1, a.cssAngle = 0, a.checkTransform(a.div), a.divRealWidth != a.previousWidth || a.divRealHeight != a.previousHeight) {
                    var b = a.legend;
                    if (0 < a.realWidth && 0 < a.realHeight) {
                        if (a.sizeChanged = !0, b) {
                            a.legendInitTO && clearTimeout(a.legendInitTO);
                            var c = setTimeout(function () {
                                b.invalidateSize()
                            }, 10);
                            a.timeOuts.push(c), a.legendInitTO = c
                        }
                        a.marginsUpdated = !1, clearTimeout(a.initTO), c = setTimeout(function () {
                            a.initChart()
                        }, 10), a.timeOuts.push(c), a.initTO = c
                    }
                    a.renderFix(), b && b.renderFix && b.renderFix(), clearTimeout(a.resizedTO), a.resizedTO = setTimeout(function () {
                        a.fire({
                            type: "resized",
                            chart: a
                        })
                    }, 10), a.previousHeight = a.divRealHeight, a.previousWidth = a.divRealWidth
                }
            },
            invalidateSize: function () {
                this.previousHeight = this.previousWidth = NaN, this.invalidateSizeReal()
            },
            invalidateSizeReal: function () {
                var a = this;
                a.marginsUpdated = !1, clearTimeout(a.validateTO);
                var b = setTimeout(function () {
                    a.validateSize()
                }, 5);
                a.timeOuts.push(b), a.validateTO = b
            },
            validateData: function (a) {
                this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = !1, this.initChart(a))
            },
            validateNow: function (a, b) {
                this.initTO && clearTimeout(this.initTO), a && (this.dataChanged = !0, this.marginsUpdated = !1), this.skipEvents = b, this.chartRendered = !1;
                var c = this.legend;
                c && c.position != this.prevLegendPosition && (this.previousWidth = this.mw = 0, c.invalidateSize && (c.invalidateSize(), this.validateSize())), this.write(this.div)
            },
            showItem: function (a) {
                a.hidden = !1, this.initChart()
            },
            hideItem: function (a) {
                a.hidden = !0, this.initChart()
            },
            hideBalloon: function () {
                var a = this;
                clearTimeout(a.hoverInt), clearTimeout(a.balloonTO), a.hoverInt = setTimeout(function () {
                    a.hideBalloonReal.call(a)
                }, a.hideBalloonTime)
            },
            cleanChart: function () { },
            hideBalloonReal: function () {
                var a = this.balloon;
                a && a.hide && a.hide()
            },
            showBalloon: function (a, b, c, d, e) {
                var f = this;
                clearTimeout(f.balloonTO), clearTimeout(f.hoverInt), f.balloonTO = setTimeout(function () {
                    f.showBalloonReal.call(f, a, b, c, d, e)
                }, 1)
            },
            showBalloonReal: function (a, b, c, d, e) {
                this.handleMouseMove();
                var f = this.balloon;
                f.enabled && (f.followCursor(!1), f.changeColor(b), !c || f.fixedPosition ? (f.setPosition(d, e), isNaN(d) || isNaN(e) ? f.followCursor(!0) : f.followCursor(!1)) : f.followCursor(!0), a && f.showBalloon(a))
            },
            handleMouseOver: function () {
                this.outTO && clearTimeout(this.outTO), a.resetMouseOver(), this.mouseIsOver = !0
            },
            handleMouseOut: function () {
                var b = this;
                a.resetMouseOver(), b.outTO && clearTimeout(b.outTO), b.outTO = setTimeout(function () {
                    b.handleMouseOutReal()
                }, 10)
            },
            handleMouseOutReal: function () {
                this.mouseIsOver = !1
            },
            handleMouseMove: function (a) {
                a || (a = window.event), this.mouse2Y = this.mouse2X = NaN;
                var b, c, d, e;
                if (a) {
                    if (a.touches) {
                        var f = a.touches.item(1);
                        if (f && this.panEventsEnabled && this.boundingRect && (d = f.clientX - this.boundingRect.left, e = f.clientY - this.boundingRect.top), !(a = a.touches.item(0))) return
                    } else this.wasTouched = !1;
                    this.boundingRect && a.clientX && (b = a.clientX - this.boundingRect.left, c = a.clientY - this.boundingRect.top), isNaN(d) ? this.mouseX = b : (this.mouseX = Math.min(b, d), this.mouse2X = Math.max(b, d)), isNaN(e) ? this.mouseY = c : (this.mouseY = Math.min(c, e), this.mouse2Y = Math.max(c, e)), this.autoTransform && (this.mouseX /= this.cssScale, this.mouseY /= this.cssScale)
                }
            },
            handleTouchStart: function (a) {
                this.hideBalloonReal(), a && (a.touches && this.tapToActivate && !this.tapped || !this.panRequired) || (this.handleMouseMove(a), this.handleMouseDown(a))
            },
            handleTouchEnd: function (b) {
                this.wasTouched = !0, this.handleMouseMove(b), a.resetMouseOver(), this.handleReleaseOutside(b)
            },
            handleReleaseOutside: function () {
                this.handleDocTouchEnd.call(this)
            },
            handleMouseDown: function (b) {
                a.resetMouseOver(), this.mouseIsOver = !0, b && b.preventDefault && (this.panEventsEnabled ? b.preventDefault() : b.touches || b.preventDefault())
            },
            addLegend: function (b, c) {
                b = a.processObject(b, a.AmLegend, this.theme), b.divId = c, b.ieW = 0;
                var d;
                return d = "object" != typeof c && c ? document.getElementById(c) : c, this.legend = b, b.chart = this, d ? (b.div = d, b.position = "outside", b.autoMargins = !1) : b.div = this.legendDiv, b
            },
            removeLegend: function () {
                this.legend = void 0, this.previousWidth = 0, this.legendDiv.innerHTML = ""
            },
            handleResize: function () {
                (a.isPercents(this.width) || a.isPercents(this.height)) && this.invalidateSizeReal(), this.renderFix()
            },
            renderFix: function () {
                if (!a.VML) {
                    var b = this.container;
                    b && b.renderFix()
                }
            },
            getSVG: function () {
                if (a.hasSVG) return this.container
            },
            animate: function (b, c, d, e, f, g, h) {
                return b["an_" + c] && a.removeFromArray(this.animations, b["an_" + c]), d = {
                    obj: b,
                    frame: 0,
                    attribute: c,
                    from: d,
                    to: e,
                    time: f,
                    effect: g,
                    suffix: h
                }, b["an_" + c] = d, this.animations.push(d), d
            },
            setLegendData: function (a) {
                var b = this.legend;
                b && b.setData(a)
            },
            stopAnim: function (b) {
                a.removeFromArray(this.animations, b)
            },
            updateAnimations: function () {
                var b;
                if (this.container && this.container.update(), this.animations)
                    for (b = this.animations.length - 1; 0 <= b; b--) {
                        var c = this.animations[b],
                            d = a.updateRate * c.time,
                            e = c.frame + 1,
                            f = c.obj,
                            g = c.attribute;
                        if (e <= d) {
                            c.frame++;
                            var h = Number(c.from),
                                i = Number(c.to) - h,
                                d = a[c.effect](0, e, h, i, d);
                            0 === i ? (this.animations.splice(b, 1), f.node.style[g] = Number(c.to) + c.suffix) : f.node.style[g] = d + c.suffix
                        } else f.node.style[g] = Number(c.to) + c.suffix, f.animationFinished = !0, this.animations.splice(b, 1)
                    }
            },
            update: function () {
                this.updateAnimations();
                var a = this.animatable;
                if (0 < a.length) {
                    for (var b = !0, c = a.length - 1; 0 <= c; c--) {
                        var d = a[c];
                        d && (d.animationFinished ? a.splice(c, 1) : b = !1)
                    }
                    b && (this.fire({
                        type: "animationFinished",
                        chart: this
                    }), this.animatable = [])
                }
            },
            inIframe: function () {
                try {
                    return window.self !== window.top
                } catch (a) {
                    return !0
                }
            },
            brr: function () {
                if (!this.hideCredits) {
                    var c, a = "historymaps.com",
                        b = window.location.hostname.split(".");
                    if (2 <= b.length && (c = b[b.length - 2] + "." + b[b.length - 1]), this.amLink && (b = this.amLink.parentNode) && b.removeChild(this.amLink), b = this.creditsPosition, c != a || !0 === this.inIframe()) {
                        var a = "http://www." + a,
                            d = c = 0,
                            e = this.realWidth,
                            f = this.realHeight,
                            g = this.type;
                        "serial" != g && "xy" != g && "gantt" != g || (c = this.marginLeftReal, d = this.marginTopReal, e = c + this.plotAreaWidth, f = d + this.plotAreaHeight);
                        var g = a + "/2017/",
                            h = "",
                            i = "HistoryMap";
                        "historymap" == this.product && (g = a + "/Wold-HistoryMap/", h = "Interactive World Map", i = "HistoryMap Project 2017"), a = document.createElement("a"), i = document.createTextNode(i), a.target = "_blank", a.setAttribute("href", g), a.setAttribute("title", h), this.urlTarget && a.setAttribute("target", this.urlTarget), a.appendChild(i), this.chartDiv.appendChild(a), this.amLink = a, g = a.style, g.position = "absolute", g.textDecoration = "none", g.color = this.color, g.fontFamily = this.fontFamily, g.fontSize = "11px", g.opacity = .7, g.display = "block";
                        var h = a.offsetWidth,
                            a = a.offsetHeight,
                            i = 5 + c;
                        "bottom-left" == b && (i = 5 + c, f - a - 3), "bottom-right" == b && (i = e - h - 5, f - a - 3), "top-right" == b && (i = e - h - 5, d + 5), g.left = i + "px", g.bottom = i + "px"
                    }
                }
            }
        }), a.Slice = a.Class({
            construct: function () { }
        }), a.SerialDataItem = a.Class({
            construct: function () { }
        }), a.GraphDataItem = a.Class({
            construct: function () { }
        }), a.Guide = a.Class({
            construct: function (b) {
                this.cname = "Guide", a.applyTheme(this, b, this.cname)
            }
        }), a.Title = a.Class({
            construct: function (b) {
                this.cname = "Title", a.applyTheme(this, b, this.cname)
            }
        }), a.Label = a.Class({
            construct: function (b) {
                this.cname = "Label", a.applyTheme(this, b, this.cname)
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.AmBalloon = a.Class({
            construct: function (b) {
                this.cname = "AmBalloon", this.enabled = !0, this.fillColor = "#FFFFFF", this.fillAlpha = .8, this.borderThickness = 2, this.borderColor = "#FFFFFF", this.borderAlpha = 1, this.cornerRadius = 0, this.maxWidth = 220, this.horizontalPadding = 8, this.verticalPadding = 4, this.pointerWidth = 6, this.pointerOrientation = "V", this.color = "#000000", this.adjustBorderColor = !0, this.show = this.follow = this.showBullet = !1, this.bulletSize = 3, this.shadowAlpha = .4, this.shadowColor = "#000000", this.fadeOutDuration = this.animationDuration = .3, this.fixedPosition = !0, this.offsetY = 6, this.offsetX = 1, this.textAlign = "center", this.disableMouseEvents = !0, this.deltaSignX = this.deltaSignY = 1, a.isModern || (this.offsetY *= 1.5), this.sdy = this.sdx = 0, a.applyTheme(this, b, this.cname)
            },
            draw: function () {
                var b = this.pointToX,
                    c = this.pointToY;
                a.isModern || (this.drop = !1);
                var d = this.chart;
                if (a.VML && (this.fadeOutDuration = 0), this.xAnim && d.stopAnim(this.xAnim), this.yAnim && d.stopAnim(this.yAnim), this.sdy = this.sdx = 0, !isNaN(b)) {
                    var e = this.follow,
                        f = d.container,
                        g = this.set;
                    if (a.remove(g), this.removeDiv(), g = f.set(), g.node.style.pointerEvents = "none", this.set = g, this.mainSet ? (this.mainSet.push(this.set), this.sdx = this.mainSet.x, this.sdy = this.mainSet.y) : d.balloonsSet.push(g), this.show) {
                        var h = this.l,
                            i = this.t,
                            j = this.r,
                            k = this.b,
                            l = this.balloonColor,
                            m = this.fillColor,
                            n = this.borderColor,
                            o = m;
                        void 0 != l && (this.adjustBorderColor ? o = n = l : m = l);
                        var p = this.horizontalPadding,
                            q = this.verticalPadding,
                            r = this.pointerWidth,
                            s = this.pointerOrientation,
                            t = this.cornerRadius,
                            u = d.fontFamily,
                            v = this.fontSize;
                        void 0 == v && (v = d.fontSize);
                        var l = document.createElement("div"),
                            w = d.classNamePrefix;
                        l.className = w + "-balloon-div", this.className && (l.className = l.className + " " + w + "-balloon-div-" + this.className), w = l.style, this.disableMouseEvents && (w.pointerEvents = "none"), w.position = "absolute";
                        var x = this.minWidth,
                            y = "";
                        isNaN(x) || (y = "min-width:" + (x - 2 * p) + "px; "), l.innerHTML = '<div style="text-align:' + this.textAlign + "; " + y + "max-width:" + this.maxWidth + "px; font-size:" + v + "px; color:" + this.color + "; font-family:" + u + '">' + this.text + "</div>", d.chartDiv.appendChild(l), this.textDiv = l;
                        var z = l.offsetWidth,
                            A = l.offsetHeight;
                        l.clientHeight && (z = l.clientWidth, A = l.clientHeight), u = A + 2 * q, y = z + 2 * p, !isNaN(x) && y < x && (y = x), window.opera && (u += 2);
                        var B = !1,
                            v = this.offsetY;
                        d.handDrawn && (v += d.handDrawScatter + 2), "H" != s ? (x = b - y / 2, c < i + u + 10 && "down" != s ? (B = !0, e && (c += v), v = c + r, this.deltaSignY = -1) : (e && (c -= v), v = c - u - r, this.deltaSignY = 1)) : (2 * r > u && (r = u / 2), v = c - u / 2, b < h + (j - h) / 2 ? (x = b + r, this.deltaSignX = -1) : (x = b - y - r, this.deltaSignX = 1)), v + u >= k && (v = k - u), v < i && (v = i), x < h && (x = h), x + y > j && (x = j - y);
                        var F, i = v + q,
                            k = x + p,
                            C = this.shadowAlpha,
                            D = this.shadowColor,
                            p = this.borderThickness,
                            E = this.bulletSize,
                            q = this.fillAlpha,
                            G = this.borderAlpha;
                        this.showBullet && (F = a.circle(f, E, o, q), g.push(F)), this.drop ? (h = y / 1.6, j = 0, "V" == s && (s = "down"), "H" == s && (s = "left"), "down" == s && (x = b + 1, v = c - h - h / 3), "up" == s && (j = 180, x = b + 1, v = c + h + h / 3), "left" == s && (j = 270, x = b + h + h / 3 + 2, v = c), "right" == s && (j = 90, x = b - h - h / 3 + 2, v = c), i = v - A / 2 + 1, k = x - z / 2 - 1, m = a.drop(f, h, j, m, q, p, n, G)) : 0 < t || 0 === r ? (0 < C && (b = a.rect(f, y, u, m, 0, p + 1, D, C, t), a.isModern ? b.translate(1, 1) : b.translate(4, 4), g.push(b)), m = a.rect(f, y, u, m, q, p, n, G, t)) : (o = [], t = [], "H" != s ? (h = b - x, h > y - r && (h = y - r), h < r && (h = r), o = [0, h - r, b - x, h + r, y, y, 0, 0], t = B ? [0, 0, c - v, 0, 0, u, u, 0] : [u, u, c - v, u, u, 0, 0, u]) : (s = c - v, s > u - r && (s = u - r), s < r && (s = r), t = [0, s - r, c - v, s + r, u, u, 0, 0], o = b < h + (j - h) / 2 ? [0, 0, x < b ? 0 : b - x, 0, 0, y, y, 0] : [y, y, x + y > b ? y : b - x, y, y, 0, 0, y]), 0 < C && (b = a.polygon(f, o, t, m, 0, p, D, C), b.translate(1, 1), g.push(b)), m = a.polygon(f, o, t, m, q, p, n, G)), this.bg = m, g.push(m), m.toFront(), a.setCN(d, m, "balloon-bg"), this.className && a.setCN(d, m, "balloon-bg-" + this.className), f = 1 * this.deltaSignX, k += this.sdx, i += this.sdy, w.left = k + "px", w.top = i + "px", g.translate(x - f, v, 1, !0), m = m.getBBox(), this.bottom = v + u + 1, this.yPos = m.y + v, F && F.translate(this.pointToX - x + f, c - v), c = this.animationDuration, 0 < this.animationDuration && !e && !isNaN(this.prevX) && (g.translate(this.prevX, this.prevY, NaN, !0), g.animate({
                            translate: x - f + "," + v
                        }, c, "easeOutSine"), l && (w.left = this.prevTX + "px", w.top = this.prevTY + "px", this.xAnim = d.animate({
                            node: l
                        }, "left", this.prevTX, k, c, "easeOutSine", "px"), this.yAnim = d.animate({
                            node: l
                        }, "top", this.prevTY, i, c, "easeOutSine", "px"))), this.prevX = x - f, this.prevY = v, this.prevTX = k, this.prevTY = i
                    }
                }
            },
            fixPrevious: function () {
                this.rPrevX = this.prevX, this.rPrevY = this.prevY, this.rPrevTX = this.prevTX, this.rPrevTY = this.prevTY
            },
            restorePrevious: function () {
                this.prevX = this.rPrevX, this.prevY = this.rPrevY, this.prevTX = this.rPrevTX, this.prevTY = this.rPrevTY
            },
            followMouse: function () {
                if (this.follow && this.show) {
                    var a = this.chart.mouseX - this.offsetX * this.deltaSignX - this.sdx,
                        b = this.chart.mouseY - this.sdy;
                    if (this.pointToX = a, this.pointToY = b, a != this.previousX || b != this.previousY)
                        if (this.previousX = a, this.previousY = b, 0 === this.cornerRadius) this.draw();
                        else {
                            var c = this.set;
                            if (c) {
                                var d = c.getBBox(),
                                    a = a - d.width / 2,
                                    e = b - d.height - 10;
                                a < this.l && (a = this.l), a > this.r - d.width && (a = this.r - d.width), e < this.t && (e = b + 10), c.translate(a, e), b = this.textDiv.style, b.left = a + this.horizontalPadding + "px", b.top = e + this.verticalPadding + "px"
                            }
                        }
                }
            },
            changeColor: function (a) {
                this.balloonColor = a
            },
            setBounds: function (a, b, c, d) {
                this.l = a, this.t = b, this.r = c, this.b = d, this.destroyTO && clearTimeout(this.destroyTO)
            },
            showBalloon: function (a) {
                (this.text != a || this.positionChanged) && (this.text = a, this.isHiding = !1, this.show = !0, this.destroyTO && clearTimeout(this.destroyTO), a = this.chart, this.fadeAnim1 && a.stopAnim(this.fadeAnim1), this.fadeAnim2 && a.stopAnim(this.fadeAnim2), this.draw(), this.positionChanged = !1)
            },
            hide: function (a) {
                var b = this;
                b.text = void 0, isNaN(a) && (a = b.fadeOutDuration);
                var c = b.chart;
                if (0 < a && !b.isHiding) {
                    b.isHiding = !0, b.destroyTO && clearTimeout(b.destroyTO), b.destroyTO = setTimeout(function () {
                        b.destroy.call(b)
                    }, 1e3 * a), b.follow = !1, b.show = !1;
                    var d = b.set;
                    d && (d.setAttr("opacity", b.fillAlpha), b.fadeAnim1 = d.animate({
                        opacity: 0
                    }, a, "easeInSine")), b.textDiv && (b.fadeAnim2 = c.animate({
                        node: b.textDiv
                    }, "opacity", 1, 0, a, "easeInSine", ""))
                } else b.show = !1, b.follow = !1, b.destroy()
            },
            setPosition: function (a, b) {
                a == this.pointToX && b == this.pointToY || (this.previousX = this.pointToX, this.previousY = this.pointToY, this.pointToX = a, this.pointToY = b, this.positionChanged = !0)
            },
            followCursor: function (a) {
                var b = this;
                b.follow = a, clearInterval(b.interval);
                var c = b.chart.mouseX - b.sdx,
                    d = b.chart.mouseY - b.sdy;
                !isNaN(c) && a && (b.pointToX = c - b.offsetX * b.deltaSignX, b.pointToY = d, b.followMouse(), b.interval = setInterval(function () {
                    b.followMouse.call(b)
                }, 40))
            },
            removeDiv: function () {
                if (this.textDiv) {
                    var a = this.textDiv.parentNode;
                    a && a.removeChild(this.textDiv)
                }
            },
            destroy: function () {
                clearInterval(this.interval), a.remove(this.set), this.removeDiv(), this.set = null
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.circle = function (b, c, d, e, f, g, h, i, j) {
            return 0 >= c && (c = .001), void 0 != f && 0 !== f || (f = .01), void 0 === g && (g = "#000000"), void 0 === h && (h = 0), e = {
                fill: d,
                stroke: g,
                "fill-opacity": e,
                "stroke-width": f,
                "stroke-opacity": h
            }, b = isNaN(j) ? b.circle(0, 0, c).attr(e) : b.ellipse(0, 0, c, j).attr(e), i && b.gradient("radialGradient", [d, a.adjustLuminosity(d, -.6)]), b
        }, a.text = function (b, c, d, e, f, g, h, i) {
            return g || (g = "middle"), "right" == g && (g = "end"), "left" == g && (g = "start"), isNaN(i) && (i = 1), void 0 !== c && (c = String(c), a.isIE && !a.isModern && (c = c.replace("&amp;", "&"), c = c.replace("&", "&amp;"))), d = {
                fill: d,
                "font-family": e,
                "font-size": f + "px",
                opacity: i
            }, !0 === h && (d["font-weight"] = "bold"), d["text-anchor"] = g, b.text(c, d)
        }, a.polygon = function (b, c, d, e, f, g, h, i, j, k, l) {
            isNaN(g) && (g = .01), isNaN(i) && (i = f);
            var m = e,
                n = !1;
            "object" == typeof m && 1 < m.length && (n = !0, m = m[0]), void 0 === h && (h = m), f = {
                fill: m,
                stroke: h,
                "fill-opacity": f,
                "stroke-width": g,
                "stroke-opacity": i
            }, void 0 !== l && 0 < l && (f["stroke-dasharray"] = l), l = a.dx, g = a.dy, b.handDrawn && (d = a.makeHD(c, d, b.handDrawScatter), c = d[0], d = d[1]), h = Math.round, k && (c[o] = a.roundTo(c[o], 5), d[o] = a.roundTo(d[o], 5), h = Number), i = "M" + (h(c[0]) + l) + "," + (h(d[0]) + g);
            for (var o = 1; o < c.length; o++) k && (c[o] = a.roundTo(c[o], 5), d[o] = a.roundTo(d[o], 5)), i += " L" + (h(c[o]) + l) + "," + (h(d[o]) + g);
            return b = b.path(i + " Z").attr(f), n && b.gradient("linearGradient", e, j), b
        }, a.rect = function (b, c, d, e, f, g, h, i, j, k, l) {
            if (isNaN(c) || isNaN(d)) return b.set();
            isNaN(g) && (g = 0), void 0 === j && (j = 0), void 0 === k && (k = 270), isNaN(f) && (f = 0);
            var m = e,
                n = !1;
            "object" == typeof m && (m = m[0], n = !0), void 0 === h && (h = m), void 0 === i && (i = f), c = Math.round(c), d = Math.round(d);
            var o = 0,
                p = 0;
            return 0 > c && (c = Math.abs(c), o = -c), 0 > d && (d = Math.abs(d), p = -d), o += a.dx, p += a.dy, f = {
                fill: m,
                stroke: h,
                "fill-opacity": f,
                "stroke-opacity": i
            }, void 0 !== l && 0 < l && (f["stroke-dasharray"] = l), b = b.rect(o, p, c, d, j, g).attr(f), n && b.gradient("linearGradient", e, k), b
        }, a.bullet = function (b, c, d, e, f, g, h, i, j, k, l, m, n) {
            var o;
            switch ("circle" == c && (c = "round"), c) {
                case "round":
                    o = a.circle(b, d / 2, e, f, g, h, i);
                    break;
                case "square":
                    o = a.polygon(b, [-d / 2, d / 2, d / 2, -d / 2], [d / 2, d / 2, -d / 2, -d / 2], e, f, g, h, i, k - 180, void 0, n);
                    break;
                case "rectangle":
                    o = a.polygon(b, [-d, d, d, -d], [d / 2, d / 2, -d / 2, -d / 2], e, f, g, h, i, k - 180, void 0, n);
                    break;
                case "diamond":
                    o = a.polygon(b, [-d / 2, 0, d / 2, 0], [0, -d / 2, 0, d / 2], e, f, g, h, i);
                    break;
                case "triangleUp":
                    o = a.triangle(b, d, 0, e, f, g, h, i);
                    break;
                case "triangleDown":
                    o = a.triangle(b, d, 180, e, f, g, h, i);
                    break;
                case "triangleLeft":
                    o = a.triangle(b, d, 270, e, f, g, h, i);
                    break;
                case "triangleRight":
                    o = a.triangle(b, d, 90, e, f, g, h, i);
                    break;
                case "bubble":
                    o = a.circle(b, d / 2, e, f, g, h, i, !0);
                    break;
                case "line":
                    o = a.line(b, [-d / 2, d / 2], [0, 0], e, f, g, h, i);
                    break;
                case "yError":
                    o = b.set(), o.push(a.line(b, [0, 0], [-d / 2, d / 2], e, f, g)), o.push(a.line(b, [-j, j], [-d / 2, -d / 2], e, f, g)), o.push(a.line(b, [-j, j], [d / 2, d / 2], e, f, g));
                    break;
                case "xError":
                    o = b.set(), o.push(a.line(b, [-d / 2, d / 2], [0, 0], e, f, g)), o.push(a.line(b, [-d / 2, -d / 2], [-j, j], e, f, g)), o.push(a.line(b, [d / 2, d / 2], [-j, j], e, f, g))
            }
            return o && o.pattern(l, NaN, m), o
        }, a.triangle = function (a, b, c, d, e, f, g, h) {
            void 0 !== f && 0 !== f || (f = 1), void 0 === g && (g = "#000"), void 0 === h && (h = 0), d = {
                fill: d,
                stroke: g,
                "fill-opacity": e,
                "stroke-width": f,
                "stroke-opacity": h
            }, b /= 2;
            var i;
            return 0 === c && (i = " M" + -b + "," + b + " L0," + -b + " L" + b + "," + b + " Z"), 180 == c && (i = " M" + -b + "," + -b + " L0," + b + " L" + b + "," + -b + " Z"), 90 == c && (i = " M" + -b + "," + -b + " L" + b + ",0 L" + -b + "," + b + " Z"), 270 == c && (i = " M" + -b + ",0 L" + b + "," + b + " L" + b + "," + -b + " Z"), a.path(i).attr(d)
        }, a.line = function (b, c, d, e, f, g, h, i, j, k, l) {
            if (b.handDrawn && !l) return a.handDrawnLine(b, c, d, e, f, g, h, i, j, k, l);
            for (g = {
                fill: "none",
                "stroke-width": g
            }, void 0 !== h && 0 < h && (g["stroke-dasharray"] = h), isNaN(f) || (g["stroke-opacity"] = f), e && (g.stroke = e), e = Math.round, k && (e = Number, c[0] = a.roundTo(c[0], 5), d[0] = a.roundTo(d[0], 5)), k = a.dx, f = a.dy, h = "M" + (e(c[0]) + k) + "," + (e(d[0]) + f), i = 1; i < c.length; i++) c[i] = a.roundTo(c[i], 5), d[i] = a.roundTo(d[i], 5), h += " L" + (e(c[i]) + k) + "," + (e(d[i]) + f);
            return a.VML ? b.path(h, void 0, !0).attr(g) : (j && (h += " M0,0 L0,0"), b.path(h).attr(g))
        }, a.makeHD = function (a, b, c) {
            for (var d = [], e = [], f = 1; f < a.length; f++)
                for (var g = Number(a[f - 1]), h = Number(b[f - 1]), i = Number(a[f]), j = Number(b[f]), k = Math.round(Math.sqrt(Math.pow(i - g, 2) + Math.pow(j - h, 2)) / 50) + 1, i = (i - g) / k, j = (j - h) / k, l = 0; l <= k; l++) {
                    var m = h + l * j + Math.random() * c;
                    d.push(g + l * i + Math.random() * c), e.push(m)
                }
            return [d, e]
        }, a.handDrawnLine = function (b, c, d, e, f, g, h, i, j, k) {
            var l, m = b.set();
            for (l = 1; l < c.length; l++)
                for (var n = [c[l - 1], c[l]], o = [d[l - 1], d[l]], o = a.makeHD(n, o, b.handDrawScatter), n = o[0], o = o[1], p = 1; p < n.length; p++) m.push(a.line(b, [n[p - 1], n[p]], [o[p - 1], o[p]], e, f, g + Math.random() * b.handDrawThickness - b.handDrawThickness / 2, h, i, j, k, !0));
            return m
        }, a.doNothing = function (a) {
            return a
        }, a.drop = function (a, b, c, d, e, f, g, h) {
            var i = 1 / 180 * Math.PI,
                j = c - 20,
                k = Math.sin(j * i) * b,
                l = Math.cos(j * i) * b,
                m = Math.sin((j + 40) * i) * b,
                n = Math.cos((j + 40) * i) * b,
                o = .8 * b,
                p = -b / 3,
                q = b / 3;
            return 0 === c && (p = -p, q = 0), 180 == c && (q = 0), 90 == c && (p = 0), 270 == c && (p = 0, q = -q), c = {
                fill: d,
                stroke: g,
                "stroke-width": f,
                "stroke-opacity": h,
                "fill-opacity": e
            }, b = "M" + k + "," + l + " A" + b + "," + b + ",0,1,1," + m + "," + n + " A" + o + "," + o + ",0,0,0," + (Math.sin((j + 20) * i) * b + q) + "," + (Math.cos((j + 20) * i) * b + p), b += " A" + o + "," + o + ",0,0,0," + k + "," + l, a.path(b, void 0, void 0, "1000,1000").attr(c)
        }, a.wedge = function (b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
            var p = Math.round;
            g = p(g), h = p(h), i = p(i);
            var q = p(h / g * i),
                r = a.VML,
                s = 359.5 + g / 100;
            359.94 < s && (s = 359.94), f >= s && (f = s);
            var t = 1 / 180 * Math.PI,
                s = c + Math.sin(e * t) * i,
                u = d - Math.cos(e * t) * q,
                v = c + Math.sin(e * t) * g,
                w = d - Math.cos(e * t) * h,
                x = c + Math.sin((e + f) * t) * g,
                y = d - Math.cos((e + f) * t) * h,
                z = c + Math.sin((e + f) * t) * i,
                t = d - Math.cos((e + f) * t) * q,
                A = {
                    fill: a.adjustLuminosity(k.fill, -.2),
                    "stroke-opacity": 0,
                    "fill-opacity": k["fill-opacity"]
                },
                B = 0;
            180 < Math.abs(f) && (B = 1), e = b.set();
            var C;
            r && (s = p(10 * s), v = p(10 * v), x = p(10 * x), z = p(10 * z), u = p(10 * u), w = p(10 * w), y = p(10 * y), t = p(10 * t), c = p(10 * c), j = p(10 * j), d = p(10 * d), g *= 10, h *= 10, i *= 10, q *= 10, 1 > Math.abs(f) && 1 >= Math.abs(x - v) && 1 >= Math.abs(y - w) && (C = !0)), f = "";
            var D;
            if (m && (A["fill-opacity"] = 0, A["stroke-opacity"] = k["stroke-opacity"] / 2, A.stroke = k.stroke), 0 < j) {
                D = " M" + s + "," + (u + j) + " L" + v + "," + (w + j), r ? (C || (D += " A" + (c - g) + "," + (j + d - h) + "," + (c + g) + "," + (j + d + h) + "," + v + "," + (w + j) + "," + x + "," + (y + j)), D += " L" + z + "," + (t + j), 0 < i && (C || (D += " B" + (c - i) + "," + (j + d - q) + "," + (c + i) + "," + (j + d + q) + "," + z + "," + (j + t) + "," + s + "," + (j + u)))) : (D += " A" + g + "," + h + ",0," + B + ",1," + x + "," + (y + j) + " L" + z + "," + (t + j), 0 < i && (D += " A" + i + "," + q + ",0," + B + ",0," + s + "," + (u + j))), D += " Z";
                var E = j;
                r && (E /= 10);
                for (var F = 0; F < E; F += 10) {
                    var G = b.path(D, void 0, void 0, "1000,1000").attr(A);
                    e.push(G), G.translate(0, -F)
                }
                D = b.path(" M" + s + "," + u + " L" + s + "," + (u + j) + " L" + v + "," + (w + j) + " L" + v + "," + w + " L" + s + "," + u + " Z", void 0, void 0, "1000,1000").attr(A), j = b.path(" M" + x + "," + y + " L" + x + "," + (y + j) + " L" + z + "," + (t + j) + " L" + z + "," + t + " L" + x + "," + y + " Z", void 0, void 0, "1000,1000").attr(A), e.push(D), e.push(j)
            }
            if (r ? (C || (f = " A" + p(c - g) + "," + p(d - h) + "," + p(c + g) + "," + p(d + h) + "," + p(v) + "," + p(w) + "," + p(x) + "," + p(y)), h = " M" + p(s) + "," + p(u) + " L" + p(v) + "," + p(w) + f + " L" + p(z) + "," + p(t)) : h = " M" + s + "," + u + " L" + v + "," + w + " A" + g + "," + h + ",0," + B + ",1," + x + "," + y + " L" + z + "," + t, 0 < i && (r ? C || (h += " B" + (c - i) + "," + (d - q) + "," + (c + i) + "," + (d + q) + "," + z + "," + t + "," + s + "," + u) : h += " A" + i + "," + q + ",0," + B + ",0," + s + "," + u), b.handDrawn && (i = a.line(b, [s, v], [u, w], k.stroke, k.thickness * Math.random() * b.handDrawThickness, k["stroke-opacity"]), e.push(i)), b = b.path(h + " Z", void 0, void 0, "1000,1000").attr(k), l) {
                for (i = [], q = 0; q < l.length; q++) i.push(a.adjustLuminosity(k.fill, l[q]));
                "radial" != o || a.isModern || (i = []), 0 < i.length && b.gradient(o + "Gradient", i)
            }
            return a.isModern && "radial" == o && b.grad && (b.grad.setAttribute("gradientUnits", "userSpaceOnUse"), b.grad.setAttribute("r", g), b.grad.setAttribute("cx", c), b.grad.setAttribute("cy", d)), b.pattern(m, NaN, n), e.wedge = b, e.push(b), e
        }, a.rgb2hex = function (a) {
            return (a = a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === a.length ? "#" + ("0" + parseInt(a[1], 10).toString(16)).slice(-2) + ("0" + parseInt(a[2], 10).toString(16)).slice(-2) + ("0" + parseInt(a[3], 10).toString(16)).slice(-2) : ""
        }, a.adjustLuminosity = function (b, c) {
            b && -1 != b.indexOf("rgb") && (b = a.rgb2hex(b)), b = String(b).replace(/[^0-9a-f]/gi, ""), 6 > b.length && (b = String(b[0]) + String(b[0]) + String(b[1]) + String(b[1]) + String(b[2]) + String(b[2])), c = c || 0;
            var e, f, d = "#";
            for (f = 0; 3 > f; f++) e = parseInt(b.substr(2 * f, 2), 16), e = Math.round(Math.min(Math.max(0, e + e * c), 255)).toString(16), d += ("00" + e).substr(e.length);
            return d
        }
    }(),
    function () {
        var a = window.HistoryMaps;
        a.AmLegend = a.Class({
            construct: function (b) {
                this.enabled = !0, this.cname = "AmLegend", this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "clickLabel"), this.position = "bottom", this.borderColor = this.color = "#000000", this.borderAlpha = 0, this.markerLabelGap = 5, this.verticalGap = 10, this.align = "left", this.horizontalGap = 0, this.spacing = 10, this.markerDisabledColor = "#AAB3B3", this.markerType = "square", this.markerSize = 16, this.markerBorderThickness = this.markerBorderAlpha = 1, this.marginBottom = this.marginTop = 0, this.marginLeft = this.marginRight = 20, this.autoMargins = !0, this.valueWidth = 50, this.switchable = !0, this.switchType = "x", this.switchColor = "#FFFFFF", this.rollOverColor = "#CC0000", this.reversedOrder = !1, this.labelText = "[[title]]", this.valueText = "[[value]]", this.accessibleLabel = "[[title]]", this.useMarkerColorForLabels = !1, this.rollOverGraphAlpha = 1, this.textClickEnabled = !1, this.equalWidths = !0, this.backgroundColor = "#FFFFFF", this.backgroundAlpha = 0, this.useGraphSettings = !1, this.showEntries = !0, this.labelDx = 0, a.applyTheme(this, b, this.cname)
            },
            setData: function (a) {
                this.legendData = a, this.invalidateSize()
            },
            invalidateSize: function () {
                this.destroy(), this.entries = [], this.valueLabels = [];
                var b = this.legendData;
                this.enabled && (a.ifArray(b) || a.ifArray(this.data)) && this.drawLegend()
            },
            drawLegend: function () {
                var b = this.chart,
                    c = this.position,
                    d = this.width,
                    e = b.divRealWidth,
                    f = b.divRealHeight,
                    g = this.div,
                    h = this.legendData;
                if (this.data && (h = this.combineLegend ? this.legendData.concat(this.data) : this.data), isNaN(this.fontSize) && (this.fontSize = b.fontSize), this.maxColumnsReal = this.maxColumns, "right" == c || "left" == c) this.maxColumnsReal = 1, this.autoMargins && (this.marginLeft = this.marginRight = 10);
                else if (this.autoMargins) {
                    this.marginRight = b.marginRight, this.marginLeft = b.marginLeft;
                    var i = b.autoMarginOffset;
                    "bottom" == c ? (this.marginBottom = i, this.marginTop = 0) : (this.marginTop = i, this.marginBottom = 0)
                }
                if (d = void 0 !== d ? a.toCoordinate(d, e) : "right" != c && "left" != c ? b.realWidth : 0 < this.ieW ? this.ieW : b.realWidth, "outside" == c ? (d = g.offsetWidth, f = g.offsetHeight, g.clientHeight && (d = g.clientWidth, f = g.clientHeight)) : (isNaN(d) || (g.style.width = d + "px"), g.className = "amChartsLegend " + b.classNamePrefix + "-legend-div"), this.divWidth = d, (c = this.container) ? (c.container.innerHTML = "", g.appendChild(c.container), c.width = d, c.height = f, c.setSize(d, f), c.addDefs(b)) : c = new a.AmDraw(g, d, f, b), this.container = c, this.lx = 0, this.ly = 8, f = this.markerSize, f > this.fontSize && (this.ly = f / 2 - 1), 0 < f && (this.lx += f + this.markerLabelGap), this.titleWidth = 0, (f = this.title) && (f = a.text(this.container, f, this.color, b.fontFamily, this.fontSize, "start", !0), a.setCN(b, f, "legend-title"), f.translate(this.marginLeft, this.marginTop + this.verticalGap + this.ly + 1), b = f.getBBox(), this.titleWidth = b.width + 15, this.titleHeight = b.height + 6), this.index = this.maxLabelWidth = 0, this.showEntries) {
                    for (b = 0; b < h.length; b++) this.createEntry(h[b]);
                    for (b = this.index = 0; b < h.length; b++) this.createValue(h[b])
                }
                this.arrangeEntries(), this.updateValues()
            },
            arrangeEntries: function () {
                var b = this.position,
                    c = this.marginLeft + this.titleWidth,
                    d = this.marginRight,
                    e = this.marginTop,
                    f = this.marginBottom,
                    g = this.horizontalGap,
                    h = this.div,
                    i = this.divWidth,
                    j = this.maxColumnsReal,
                    k = this.verticalGap,
                    l = this.spacing,
                    m = i - d - c,
                    n = 0,
                    o = 0,
                    p = this.container;
                this.set && this.set.remove();
                var q = p.set();
                this.set = q;
                var r = p.set();
                q.push(r);
                var t, u, s = this.entries;
                for (u = 0; u < s.length; u++) {
                    t = s[u].getBBox();
                    var v = t.width;
                    v > n && (n = v), t = t.height, t > o && (o = t)
                }
                var v = o = 0,
                    w = g,
                    x = 0,
                    y = 0;
                for (u = 0; u < s.length; u++) {
                    var z = s[u];
                    this.reversedOrder && (z = s[s.length - u - 1]), t = z.getBBox();
                    var A;
                    this.equalWidths ? A = v * (n + l + this.markerLabelGap) : (A = w, w = w + t.width + g + l), A + t.width > m && 0 < u && 0 !== v && (o++ , A = v = 0, w = A + t.width + g + l, x = x + y + k, y = 0), t.height > y && (y = t.height), z.translate(A, x), v++ , !isNaN(j) && v >= j && (v = 0, o++ , x = x + y + k, w = g, y = 0), r.push(z)
                }
                t = r.getBBox(), j = t.height + 2 * k - 1, "left" == b || "right" == b ? (l = t.width + 2 * g, i = l + c + d, h.style.width = i + "px", this.ieW = i) : l = i - c - d - 1, d = a.polygon(this.container, [0, l, l, 0], [0, 0, j, j], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha), a.setCN(this.chart, d, "legend-bg"), q.push(d), q.translate(c, e), d.toBack(), c = g, "top" != b && "bottom" != b && "absolute" != b && "outside" != b || ("center" == this.align ? c = g + (l - t.width) / 2 : "right" == this.align && (c = g + l - t.width)), r.translate(c, k + 1), this.titleHeight > j && (j = this.titleHeight), e = j + e + f + 1, 0 > e && (e = 0), "absolute" != b && "outside" != b && e > this.chart.divRealHeight && (h.style.top = "0px"), h.style.height = Math.round(e) + "px", p.setSize(this.divWidth, e)
            },
            createEntry: function (b) {
                if (!1 !== b.visibleInLegend && !b.hideFromLegend) {
                    var c = this,
                        d = c.chart,
                        e = c.useGraphSettings,
                        f = b.markerType;
                    f && (e = !1), b.legendEntryWidth = c.markerSize, f || (f = c.markerType);
                    var g = b.color,
                        h = b.alpha;
                    b.legendKeyColor && (g = b.legendKeyColor()), b.legendKeyAlpha && (h = b.legendKeyAlpha());
                    var i;
                    !0 === b.hidden && (i = g = c.markerDisabledColor);
                    var k, j = b.pattern,
                        l = b.customMarker;
                    l || (l = c.customMarker);
                    var m = c.container,
                        n = c.markerSize,
                        o = 0,
                        p = 0,
                        q = n / 2;
                    if (e) e = b.type, c.switchType = void 0, "line" == e || "step" == e || "smoothedLine" == e || "ohlc" == e ? (k = m.set(), b.hidden || (g = b.lineColorR, i = b.bulletBorderColorR), o = a.line(m, [0, 2 * n], [n / 2, n / 2], g, b.lineAlpha, b.lineThickness, b.dashLength), a.setCN(d, o, "graph-stroke"), k.push(o), b.bullet && (b.hidden || (g = b.bulletColorR), o = a.bullet(m, b.bullet, b.bulletSize, g, b.bulletAlpha, b.bulletBorderThickness, i, b.bulletBorderAlpha)) && (a.setCN(d, o, "graph-bullet"), o.translate(n + 1, n / 2), k.push(o)), q = 0, o = n, p = n / 3) : (b.getGradRotation && 0 === (k = b.getGradRotation()) && (k = 180), o = b.fillColorsR, !0 === b.hidden && (o = g), (k = c.createMarker("rectangle", o, b.fillAlphas, b.lineThickness, g, b.lineAlpha, k, j, b.dashLength)) && (q = n, k.translate(q, n / 2)), o = n), a.setCN(d, k, "graph-" + e), a.setCN(d, k, "graph-" + b.id);
                    else if (l) k = m.image(l, 0, 0, n, n);
                    else {
                        var r;
                        isNaN(c.gradientRotation) || (r = 180 + c.gradientRotation), (k = c.createMarker(f, g, h, void 0, void 0, void 0, r, j)) && k.translate(n / 2, n / 2)
                    }
                    a.setCN(d, k, "legend-marker"), c.addListeners(k, b), m = m.set([k]), c.switchable && b.switchable && m.setAttr("cursor", "pointer"), void 0 !== b.id && a.setCN(d, m, "legend-item-" + b.id), a.setCN(d, m, b.className, !0), i = c.switchType;
                    var s;
                    i && "none" != i && 0 < n && ("x" == i ? (s = c.createX(), s.translate(n / 2, n / 2)) : s = c.createV(), s.dItem = b, !0 !== b.hidden ? "x" == i ? s.hide() : s.show() : "x" != i && s.hide(), c.switchable || s.hide(), c.addListeners(s, b), b.legendSwitch = s, m.push(s), a.setCN(d, s, "legend-switch")), i = c.color, b.showBalloon && c.textClickEnabled && void 0 !== c.selectedColor && (i = c.selectedColor), c.useMarkerColorForLabels && !j && (i = g), !0 === b.hidden && (i = c.markerDisabledColor), g = a.massReplace(c.labelText, {
                        "[[title]]": b.title
                    }), void 0 !== c.tabIndex && (m.setAttr("tabindex", c.tabIndex), m.setAttr("role", "menuitem"), m.keyup(function (a) {
                        13 == a.keyCode && c.clickMarker(b, a)
                    })), d.accessible && c.accessibleLabel && (j = a.massReplace(c.accessibleLabel, {
                        "[[title]]": b.title
                    }), d.makeAccessible(m, j)), j = c.fontSize, k && (n <= j && (n = n / 2 + c.ly - j / 2 + (j + 2 - n) / 2 - p, k.translate(q, n), s && s.translate(s.x, n)), b.legendEntryWidth = k.getBBox().width);
                    var t;
                    g && (g = a.fixBrakes(g), b.legendTextReal = g, t = c.labelWidth, t = isNaN(t) ? a.text(c.container, g, i, d.fontFamily, j, "start") : a.wrappedText(c.container, g, i, d.fontFamily, j, "start", !1, t, 0), a.setCN(d, t, "legend-label"), t.translate(c.lx + o, c.ly), m.push(t), c.labelDx = o, d = t.getBBox().width, c.maxLabelWidth < d && (c.maxLabelWidth = d)), c.entries[c.index] = m, b.legendEntry = c.entries[c.index], b.legendMarker = k, b.legendLabel = t, c.index++
                }
            },
            addListeners: function (a, b) {
                var c = this;
                a && a.mouseover(function (a) {
                    c.rollOverMarker(b, a)
                }).mouseout(function (a) {
                    c.rollOutMarker(b, a)
                }).click(function (a) {
                    c.clickMarker(b, a)
                })
            },
            rollOverMarker: function (a, b) {
                this.switchable && this.dispatch("rollOverMarker", a, b), this.dispatch("rollOverItem", a, b)
            },
            rollOutMarker: function (a, b) {
                this.switchable && this.dispatch("rollOutMarker", a, b), this.dispatch("rollOutItem", a, b)
            },
            clickMarker: function (a, b) {
                this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a, b) : this.dispatch("hideItem", a, b)), this.dispatch("clickMarker", a, b)
            },
            rollOverLabel: function (a, b) {
                a.hidden || this.textClickEnabled && a.legendLabel && a.legendLabel.attr({
                    fill: this.rollOverColor
                }), this.dispatch("rollOverItem", a, b)
            },
            rollOutLabel: function (a, b) {
                if (!a.hidden && this.textClickEnabled && a.legendLabel) {
                    var c = this.color;
                    void 0 !== this.selectedColor && a.showBalloon && (c = this.selectedColor), this.useMarkerColorForLabels && void 0 === (c = a.lineColor) && (c = a.color), a.legendLabel.attr({
                        fill: c
                    })
                }
                this.dispatch("rollOutItem", a, b)
            },
            clickLabel: function (a, b) {
                this.textClickEnabled ? a.hidden || this.dispatch("clickLabel", a, b) : this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a, b) : this.dispatch("hideItem", a, b))
            },
            dispatch: function (a, b, c) {
                a = {
                    type: a,
                    dataItem: b,
                    target: this,
                    event: c,
                    chart: this.chart
                }, this.chart && this.chart.handleLegendEvent(a), this.fire(a)
            },
            createValue: function (b) {
                var c = this,
                    d = c.fontSize,
                    e = c.chart;
                if (!1 !== b.visibleInLegend && !b.hideFromLegend) {
                    var f = c.maxLabelWidth;
                    c.forceWidth && (f = c.labelWidth), c.equalWidths || (c.valueAlign = "left"), "left" == c.valueAlign && b.legendLabel && (f = b.legendLabel.getBBox().width);
                    var g = f;
                    if (c.valueText && 0 < c.valueWidth) {
                        var h = c.color;
                        c.useMarkerColorForValues && (h = b.color, b.legendKeyColor && (h = b.legendKeyColor())), !0 === b.hidden && (h = c.markerDisabledColor);
                        var i = c.valueText,
                            f = f + c.lx + c.labelDx + c.markerLabelGap + c.valueWidth,
                            j = "end";
                        "left" == c.valueAlign && (f -= c.valueWidth, j = "start"), h = a.text(c.container, i, h, c.chart.fontFamily, d, j), a.setCN(e, h, "legend-value"), h.translate(f, c.ly), c.entries[c.index].push(h), g += c.valueWidth + 2 * c.markerLabelGap, h.dItem = b, c.valueLabels.push(h)
                    }
                    c.index++ , e = c.markerSize, e < d + 7 && (e = d + 7, a.VML && (e += 3)), d = c.container.rect(b.legendEntryWidth, 0, g, e, 0, 0).attr({
                        stroke: "none",
                        fill: "#fff",
                        "fill-opacity": .005
                    }), d.dItem = b, c.entries[c.index - 1].push(d), d.mouseover(function (a) {
                        c.rollOverLabel(b, a)
                    }).mouseout(function (a) {
                        c.rollOutLabel(b, a)
                    }).click(function (a) {
                        c.clickLabel(b, a)
                    })
                }
            },
            createV: function () {
                var b = this.markerSize;
                return a.polygon(this.container, [b / 5, b / 2, b - b / 5, b / 2], [b / 3, b - b / 5, b / 5, b / 1.7], this.switchColor)
            },
            createX: function () {
                var b = (this.markerSize - 4) / 2,
                    c = {
                        stroke: this.switchColor,
                        "stroke-width": 3
                    },
                    d = this.container,
                    e = a.line(d, [-b, b], [-b, b]).attr(c),
                    b = a.line(d, [-b, b], [b, -b]).attr(c);
                return this.container.set([e, b])
            },
            createMarker: function (b, c, d, e, f, g, h, i, j) {
                var k = this.markerSize,
                    l = this.container;
                return f || (f = this.markerBorderColor), f || (f = c), isNaN(e) && (e = this.markerBorderThickness), isNaN(g) && (g = this.markerBorderAlpha), a.bullet(l, b, k, c, d, e, f, g, k, h, i, this.chart.path, j)
            },
            validateNow: function () {
                this.invalidateSize()
            },
            updateValues: function () {
                var d, b = this.valueLabels,
                    c = this.chart,
                    e = this.data;
                if (b)
                    for (d = 0; d < b.length; d++) {
                        var f = b[d],
                            g = f.dItem;
                        g.periodDataItem = void 0, g.periodPercentDataItem = void 0;
                        var h = " ";
                        if (e) g.value ? f.text(g.value) : f.text("");
                        else {
                            var i = null;
                            if (void 0 !== g.type) {
                                var i = g.currentDataItem,
                                    j = this.periodValueText;
                                g.legendPeriodValueText && (j = g.legendPeriodValueText), i ? (h = this.valueText, g.legendValueText && (h = g.legendValueText), h = c.formatString(h, i)) : j && c.formatPeriodString && (j = a.massReplace(j, {
                                    "[[title]]": g.title
                                }), h = c.formatPeriodString(j, g))
                            } else h = c.formatString(this.valueText, g);
                            j = g, i && (j = i);
                            var k = this.valueFunction;
                            k && (h = k(j, h, c.periodDataItem));
                            var l;
                            this.useMarkerColorForLabels && !i && g.lastDataItem && (i = g.lastDataItem), i ? l = c.getBalloonColor(g, i) : g.legendKeyColor && (l = g.legendKeyColor()), g.legendColorFunction && (l = g.legendColorFunction(j, h, g.periodDataItem, g.periodPercentDataItem)), f.text(h), !g.pattern && (this.useMarkerColorForValues && f.setAttr("fill", l), this.useMarkerColorForLabels) && ((f = g.legendMarker) && (f.setAttr("fill", l), f.setAttr("stroke", l)), (g = g.legendLabel) && g.setAttr("fill", l))
                        }
                    }
            },
            renderFix: function () {
                if (!a.VML && this.enabled) {
                    var b = this.container;
                    b && b.renderFix()
                }
            },
            destroy: function () {
                this.div.innerHTML = "", a.remove(this.set)
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.HisMap = a.Class({
            inherits: a.HistoryMap,
            construct: function (b) {
                this.cname = "HisMap", this.type = "map", this.theme = b, this.svgNotSupported = "This browser doesn't support SVG. Use Chrome, Firefox, Internet Explorer 9 or later.", this.createEvents("rollOverMapObject", "rollOutMapObject", "clickMapObject", "mouseDownMapObject", "selectedObjectChanged", "homeButtonClicked", "zoomCompleted", "dragCompleted", "positionChanged", "writeDevInfo", "click", "descriptionClosed"), this.zoomDuration = .6, this.zoomControl = new a.ZoomControl(b), this.fitMapToContainer = !0, this.mouseWheelZoomEnabled = this.backgroundZoomsToTop = !1, this.allowClickOnSelectedObject = this.useHandCursorOnClickableOjects = this.showBalloonOnSelectedObject = !0, this.showObjectsAfterZoom = this.wheelBusy = !1, this.zoomOnDoubleClick = this.useObjectColorForBalloon = !0, this.allowMultipleDescriptionWindows = !1, this.dragMap = this.centerMap = this.linesAboveImages = !0, this.colorSteps = 5, this.forceNormalize = !1, this.showAreasInList = !0, this.showLinesInList = this.showImagesInList = !1, this.areasProcessor = new a.AreasProcessor(this), this.areasSettings = new a.AreasSettings(b), this.imagesProcessor = new a.ImagesProcessor(this), this.imagesSettings = new a.ImagesSettings(b), this.linesProcessor = new a.LinesProcessor(this), this.linesSettings = new a.LinesSettings(b), this.initialTouchZoom = 1, this.showDescriptionOnHover = !1, a.HisMap.base.construct.call(this, b), this.creditsPosition = "bottom-left", this.product = "historymap", this.areasClasses = {}, a.applyTheme(this, b, this.cname)
            },
            initChart: function () {
                this.zoomInstantly = !0;
                var b = this.container;
                if (this.panRequired = !0, this.sizeChanged && a.hasSVG && this.chartCreated) {
                    this.freeLabelsSet && this.freeLabelsSet.remove(), this.freeLabelsSet = b.set(), this.container.setSize(this.realWidth, this.realHeight), this.resizeMap(), this.drawBackground(), this.redrawLabels(), this.drawTitles(), this.processObjects(!0), this.rescaleObjects(), this.zoomControl.init(this, b), this.drawBg();
                    var c = this.smallMap;
                    c && c.init(this, b), (c = this.valueLegend) && c.init(this, b), this.sizeChanged = !1, this.zoomToLongLat(this.zLevelTemp, this.zLongTemp, this.zLatTemp, !0), this.previousWidth = this.realWidth, this.previousHeight = this.realHeight, this.updateSmallMap(), this.linkSet.toFront(), this.zoomControl.update && this.zoomControl.update()
                } else a.HisMap.base.initChart.call(this), a.hasSVG ? (this.dataChanged && (this.parseData(), this.dispatchDataUpdated = !0, this.dataChanged = !1, b = this.legend) && (b.position = "absolute", b.invalidateSize()), this.createDescriptionsDiv(), this.svgAreas = [], this.svgAreasById = {}, this.drawChart()) : (this.chartDiv.style.textAlign = "", this.chartDiv.setAttribute("class", "historymapAlert"), this.chartDiv.innerHTML = this.svgNotSupported, this.fire({
                    type: "failed",
                    chart: this
                }))
            },
            storeTemp: function () {
                if (a.hasSVG && 0 < this.realWidth && 0 < this.realHeight) {
                    var b = this.mapContainer.getBBox();
                    0 < b.width && 0 < b.height && (b = this.zoomLongitude(), isNaN(b) || (this.zLongTemp = b), b = this.zoomLatitude(), isNaN(b) || (this.zLatTemp = b), b = this.zoomLevel(), isNaN(b) || (this.zLevelTemp = b))
                }
            },
            invalidateSize: function () {
                this.storeTemp(), a.HisMap.base.invalidateSize.call(this)
            },
            validateSize: function () {
                this.storeTemp(), a.HisMap.base.validateSize.call(this)
            },
            handleWheelReal: function (b) {
                if (!this.wheelBusy) {
                    this.stopAnimation();
                    var c = this.zoomLevel(),
                        d = this.zoomControl,
                        e = d.zoomFactor;
                    this.wheelBusy = !0, b = a.fitToBounds(0 < b ? c * e : c / e, d.minZoomLevel, d.maxZoomLevel), e = this.mouseX / this.mapWidth, d = this.mouseY / this.mapHeight, e = (this.zoomX() - e) * (b / c) + e, c = (this.zoomY() - d) * (b / c) + d, this.zoomTo(b, e, c)
                }
            },
            addLegend: function (b, c) {
                return b.position = "absolute", b.autoMargins = !1, b.valueWidth = 0, b.switchable = !1, a.HisMap.base.addLegend.call(this, b, c), void 0 === b.enabled && (b.enabled = !0), b
            },
            handleLegendEvent: function () { },
            createDescriptionsDiv: function () {
                if (!this.descriptionsDiv) {
                    var a = document.createElement("div"),
                        b = a.style;
                    b.position = "absolute", b.left = "0px", b.top = "0px", this.descriptionsDiv = a
                }
                this.containerDiv.appendChild(this.descriptionsDiv)
            },
            drawChart: function () {
                a.HisMap.base.drawChart.call(this);
                var b = this.dataProvider;
                this.dataProvider = b = a.extend(b, new a.MapData, !0), this.areasSettings = a.processObject(this.areasSettings, a.AreasSettings, this.theme), this.imagesSettings = a.processObject(this.imagesSettings, a.ImagesSettings, this.theme), this.linesSettings = a.processObject(this.linesSettings, a.LinesSettings, this.theme);
                var c = this.container;
                this.mapContainer && this.mapContainer.remove(), this.mapContainer = c.set(), this.graphsSet.push(this.mapContainer);
                var d;
                b.map && (d = a.maps[b.map]), b.mapVar && (d = b.mapVar), d ? (this.svgData = d.svg, this.getBounds(), this.buildEverything()) : (b = b.mapURL) && this.loadXml(b), this.balloonsSet.toFront()
            },
            drawBg: function () {
                var a = this;
                a.background.click(function () {
                    a.handleBackgroundClick()
                }), a.background.mouseover(function () {
                    a.rollOutMapObject(a.previouslyHovered)
                })
            },
            buildEverything: function () {
                if (0 < this.realWidth && 0 < this.realHeight) {
                    var b = this.container,
                        c = this.dataProvider;
                    this.projection || (this.projection = c.projection, this.projection || (this.projection = "equirectangular"));
                    var d = this.projection;
                    d && (this.projectionFunction = a[d]), this.projectionFunction || (this.projectionFunction = a.equirectangular), this.dpProjectionFunction = a[c.projection], this.dpProjectionFunction || (this.dpProjectionFunction = a.equirectangular), this.zoomControl = a.processObject(this.zoomControl, a.ZoomControl, this.theme), this.zoomControl.init(this, b), this.drawBg(), this.buildSVGMap(), this.projectionFunction && d != c.projection || this.forceNormalize ? (this.normalizeMap(), this.changeProjection()) : this.fixMapPosition(), (d = this.smallMap) && (d = a.processObject(d, a.SmallMap, this.theme), d.init(this, b), this.smallMap = d), isNaN(c.zoomX) && isNaN(c.zoomY) && isNaN(c.zoomLatitude) && isNaN(c.zoomLongitude) && (this.centerMap ? (d = this.xyToCoordinates(this.mapWidth / 2, this.mapHeight / 2), c.zoomLongitudeC = d.longitude, c.zoomLatitudeC = d.latitude) : (c.zoomX = 0, c.zoomY = 0), this.zoomInstantly = !0), this.selectObject(this.dataProvider), this.processAreas(), (c = this.valueLegend) && (this.valueLegend = c = a.processObject(c, a.ValueLegend, this.theme), c.init(this, b)), this.objectList && (b = this.objectList = a.processObject(this.objectList, a.ObjectList)) && (this.clearObjectList(), b.init(this)), this.dispDUpd(), this.updateSmallMap(), this.linkSet.toFront()
                } else this.cleanChart()
            },
            hideGroup: function (a) {
                this.showHideGroup(a, !1)
            },
            showGroup: function (a) {
                this.showHideGroup(a, !0)
            },
            showHideGroup: function (a, b) {
                this.showHideReal(this.imagesProcessor.allObjects, a, b), this.showHideReal(this.areasProcessor.allObjects, a, b), this.showHideReal(this.linesProcessor.allObjects, a, b)
            },
            showHideReal: function (a, b, c) {
                var d;
                for (d = 0; d < a.length; d++) {
                    var e = a[d];
                    if (e.groupId == b) {
                        var f = e.displayObject;
                        f && (c ? (e.hidden = !1, f.show()) : (e.hidden = !0, f.hide()))
                    }
                }
            },
            makeObjectAccessible: function (a) {
                if (a.accessibleLabel) {
                    var b = this.formatString(a.accessibleLabel, a);
                    a.displayObject && this.makeAccessible(a.displayObject, b, "menuitem")
                }
            },
            update: function () {
                a.hasSVG && (a.HisMap.base.update.call(this), this.zoomControl && this.zoomControl.update && this.zoomControl.update())
            },
            animateMap: function () {
                var b = this;
                b.totalFrames = b.zoomDuration * a.updateRate, b.totalFrames += 1, b.frame = 0, b.tweenPercent = 0, b.balloon.hide(0), setTimeout(function () {
                    b.updateSize.call(b)
                }, 1e3 / a.updateRate)
            },
            updateSize: function () {
                var b = this,
                    c = b.totalFrames;
                b.preventHover = !0, b.frame <= c ? (b.frame++ , c = a.easeOutSine(0, b.frame, 0, 1, c), 1 <= c ? (c = 1, b.preventHover = !1, b.wheelBusy = !1) : window.requestAnimationFrame ? window.requestAnimationFrame(function () {
                    b.updateSize.call(b)
                }) : setTimeout(function () {
                    b.updateSize.call(b)
                }, 1e3 / a.updateRate), .8 < c && (b.preventHover = !1)) : (c = 1, b.preventHover = !1, b.wheelBusy = !1), b.tweenPercent = c, b.rescaleMapAndObjects()
            },
            rescaleMapAndObjects: function () {
                var a = this.initialScale,
                    b = this.initialX,
                    c = this.initialY,
                    d = this.tweenPercent,
                    a = a + (this.finalScale - a) * d;
                if (this.mapContainer.translate(b + (this.finalX - b) * d, c + (this.finalY - c) * d, a, !0), this.areasSettings.adjustOutlineThickness) {
                    for (var b = this.svgAreas, e = 0; e < b.length; e++)(c = b[e]) && c.setAttr("stroke-width", this.areasSettings.outlineThickness / a / this.mapScale);
                    if (b = this.dataProvider.areas)
                        for (e = 0; e < b.length; e++) {
                            var c = b[e],
                                f = c.displayObject;
                            f && f.setAttr("stroke-width", c.outlineThicknessReal / a / this.mapScale)
                        }
                }
                this.rescaleObjects(), this.positionChanged(), this.updateSmallMap(), 1 == d && this.fire({
                    type: "zoomCompleted",
                    chart: this
                })
            },
            updateSmallMap: function () {
                this.smallMap && this.smallMap.update()
            },
            rescaleObjects: function () {
                var c, a = this.mapContainer.scale,
                    b = this.imagesProcessor.objectsToResize;
                for (c = 0; c < b.length; c++) {
                    var d = b[c].image,
                        e = b[c].scale,
                        f = b[c].mapImage;
                    isNaN(f.selectedScaleReal) || f != this.selectedObject || (f.tempScale = e, e *= f.selectedScaleReal), d.translate(d.x, d.y, e / a, !0)
                }
                for (b = this.imagesProcessor.labelsToReposition, c = 0; c < b.length; c++) d = b[c], d.imageLabel && this.imagesProcessor.positionLabel(d.imageLabel, d, d.labelPositionReal);
                if (b = this.linesProcessor, d = b.linesToResize)
                    for (c = 0; c < d.length; c++) e = d[c], e.line.setAttr("stroke-width", e.thickness / a);
                for (b = b.objectsToResize, c = 0; c < b.length; c++) d = b[c], d.translate(d.x, d.y, 1 / a, !0)
            },
            handleTouchEnd: function (b) {
                this.initialDistance = NaN, this.mouseIsDown = this.isDragging = !1, a.HisMap.base.handleTouchEnd.call(this, b)
            },
            handleMouseDown: function (b) {
                if (a.resetMouseOver(), this.mouseIsDown = this.mouseIsOver = !0, this.balloon.hide(0), b && this.mouseIsOver && b.preventDefault && this.panEventsEnabled && b.preventDefault(), this.chartCreated && !this.preventHover && (this.initialTouchZoom = this.zoomLevel(), this.dragMap && (this.stopAnimation(), this.mapContainerClickX = this.mapContainer.x, this.mapContainerClickY = this.mapContainer.y), b || (b = window.event), b.shiftKey && !0 === this.developerMode && this.getDevInfo(), b && b.touches)) {
                    var c = this.mouseX,
                        d = this.mouseY,
                        e = b.touches.item(1);
                    e && this.panEventsEnabled && this.boundingRect && (b = e.clientX - this.boundingRect.left, e = e.clientY - this.boundingRect.top, this.middleXP = (c + (b - c) / 2) / this.realWidth, this.middleYP = (d + (e - d) / 2) / this.realHeight, this.initialDistance = Math.sqrt(Math.pow(b - c, 2) + Math.pow(e - d, 2)))
                }
            },
            stopDrag: function () {
                this.isDragging = !1
            },
            handleReleaseOutside: function () {
                if (a.isModern) {
                    var b = this;
                    if (a.HisMap.base.handleReleaseOutside.call(b), b.mouseIsDown = !1, setTimeout(function () {
                        b.resetPinch.call(b)
                    }, 100), !b.preventHover) {
                        b.stopDrag();
                        var c = b.zoomControl;
                        c && c.draggerUp && c.draggerUp(), b.mapWasDragged = !1;
                        var c = b.mapContainer,
                            d = b.mapContainerClickX,
                            e = b.mapContainerClickY;
                        isNaN(d) || isNaN(e) || !(3 < Math.abs(c.x - d) || 3 < Math.abs(c.y - e)) || (b.mapWasDragged = !0, c = {
                            type: "dragCompleted",
                            zoomX: b.zoomX(),
                            zoomY: b.zoomY(),
                            zoomLevel: b.zoomLevel(),
                            chart: b
                        }, b.fire(c)), (b.mouseIsOver && !b.mapWasDragged && !b.skipClick || b.wasTouched && 3 > Math.abs(b.mouseX - b.tmx) && 3 > Math.abs(b.mouseY - b.tmy)) && b.fire({
                            type: "click",
                            x: b.mouseX,
                            y: b.mouseY,
                            chart: b
                        }), b.mapContainerClickX = NaN, b.mapContainerClickY = NaN, b.objectWasClicked = !1, b.zoomOnDoubleClick && b.mouseIsOver && (c = (new Date).getTime(), 200 > c - b.previousClickTime && 40 < c - b.previousClickTime && b.doDoubleClickZoom(), b.previousClickTime = c)
                    }
                    b.wasTouched = !1
                }
            },
            resetPinch: function () {
                this.mapWasPinched = !1
            },
            handleMouseMove: function (b) {
                var c = this;
                if (a.HisMap.base.handleMouseMove.call(c, b), !b || !b.touches || !c.tapToActivate || c.tapped) {
                    c.panEventsEnabled && c.mouseIsOver && b && b.preventDefault && b.preventDefault();
                    var d = c.previuosMouseX,
                        e = c.previuosMouseY,
                        f = c.mouseX,
                        g = c.mouseY,
                        h = c.zoomControl;
                    if (isNaN(d) && (d = f), isNaN(e) && (e = g), c.mouse2X = NaN, c.mouse2Y = NaN, b && b.touches && (b = b.touches.item(1)) && c.panEventsEnabled && c.boundingRect && (c.mouse2X = b.clientX - c.boundingRect.left, c.mouse2Y = b.clientY - c.boundingRect.top), b = c.mapContainer) {
                        var i = c.mouse2X,
                            j = c.mouse2Y;
                        c.pinchTO && clearTimeout(c.pinchTO), c.pinchTO = setTimeout(function () {
                            c.resetPinch.call(c)
                        }, 1e3);
                        var k = c.realHeight,
                            l = c.realWidth,
                            m = c.mapWidth,
                            n = c.mapHeight;
                        if (c.mouseIsDown && c.dragMap && (3 < Math.abs(c.previuosMouseX - c.mouseX) || 3 < Math.abs(c.previuosMouseY - c.mouseY)) && (c.isDragging = !0), !isNaN(i)) {
                            c.stopDrag();
                            var o = Math.sqrt(Math.pow(i - f, 2) + Math.pow(j - g, 2)),
                                p = c.initialDistance;
                            if (isNaN(p) && (p = Math.sqrt(Math.pow(i - f, 2) + Math.pow(j - g, 2))), !isNaN(p)) {
                                var i = c.initialTouchZoom * o / p,
                                    i = a.fitToBounds(i, h.minZoomLevel, h.maxZoomLevel),
                                    h = c.zoomLevel(),
                                    p = c.middleXP,
                                    j = c.middleYP,
                                    o = k / n,
                                    q = l / m,
                                    p = (c.zoomX() - p * q) * (i / h) + p * q,
                                    j = (c.zoomY() - j * o) * (i / h) + j * o;
                                .1 < Math.abs(i - h) && (c.zoomTo(i, p, j, !0), c.mapWasPinched = !0, clearTimeout(c.pinchTO))
                            }
                        }
                        i = b.scale, c.isDragging && (c.balloon.hide(0), c.positionChanged(), d = b.x + (f - d), e = b.y + (g - e), c.preventDragOut && (n = -n * i + k / 2 - c.diffY * c.mapScale * i, k = k / 2 - c.diffY * c.mapScale * i, d = a.fitToBounds(d, -m * i + l / 2, l / 2), e = a.fitToBounds(e, n, k)), isNaN(d) || isNaN(e) || (b.translate(d, e, i, !0), c.updateSmallMap())), c.previuosMouseX = f, c.previuosMouseY = g
                    }
                }
            },
            selectObject: function (b, c) {
                var d = this;
                b || (b = d.dataProvider), b.isOver = !1;
                var e = b.linkToObject;
                a.isString(e) && (e = d.getObjectById(e)), b.useTargetsZoomValues && e && (b.zoomX = e.zoomX, b.zoomY = e.zoomY, b.zoomLatitude = e.zoomLatitude, b.zoomLongitude = e.zoomLongitude, b.zoomLevel = e.zoomLevel);
                var f = d.selectedObject;
                f && d.returnInitialColor(f), d.selectedObject = b;
                var h, i, g = !1;
                if ("MapArea" == b.objectType && (b.autoZoomReal && (g = !0), h = d.areasSettings.selectedOutlineColor, i = d.areasSettings.selectedOutlineThickness), e && !g && (a.isString(e) && (e = d.getObjectById(e)), isNaN(b.zoomLevel) && isNaN(b.zoomX) && isNaN(b.zoomY))) {
                    if (d.extendMapData(e)) return;
                    return void d.selectObject(e)
                }
                if (d.allowMultipleDescriptionWindows || d.closeAllDescriptions(), clearTimeout(d.selectedObjectTimeOut), clearTimeout(d.processObjectsTimeOut), e = d.zoomDuration, !g && isNaN(b.zoomLevel) && isNaN(b.zoomX) && isNaN(b.zoomY) ? (d.showDescriptionAndGetUrl(), c || d.processObjects()) : (d.selectedObjectTimeOut = setTimeout(function () {
                    d.showDescriptionAndGetUrl.call(d)
                }, 1e3 * e + 200), d.showObjectsAfterZoom ? c || (d.processObjectsTimeOut = setTimeout(function () {
                    d.processObjects.call(d)
                }, 1e3 * e + 200)) : c || d.processObjects()), e = b.displayObject, g = b.selectedColorReal, "MapImage" == b.objectType) {
                    h = d.imagesSettings.selectedOutlineColor, i = d.imagesSettings.selectedOutlineThickness;
                    var e = b.image,
                        j = b.selectedScaleReal;
                    if (!isNaN(j) && 1 != j) {
                        var k = b.scale;
                        isNaN(b.tempScale) || (k = b.tempScale), isNaN(k) && (k = 1), b.tempScale = k;
                        var l = b.displayObject;
                        l.translate(l.x, l.y, k * j, !0)
                    }
                }
                if (e ? (a.removeCN(d, e, "selected-object"), a.setCN(d, e, "selected-object"), b.bringForwardOnHover && b.displayObject.toFront(), d.outlinesToFront(), b.preserveOriginalAttributes || (e.setAttr("stroke", b.outlineColorReal), void 0 !== g && e.setAttr("fill", g), void 0 !== h && e.setAttr("stroke", h), void 0 !== i && e.setAttr("stroke-width", i), "MapLine" == b.objectType && ((j = b.lineSvg) && j.setAttr("stroke", g), j = b.arrowSvg) && (j.setAttr("fill", g), j.setAttr("stroke", g)), (j = b.imageLabel) && void 0 !== (k = b.selectedLabelColorReal) && j.setAttr("fill", k), b.selectable || (e.setAttr("cursor", "default"), j && j.setAttr("cursor", "default")))) : d.returnInitialColorReal(b), e = b.groupId)
                    for (j = b.groupArray, j || (j = d.getGroupById(e), b.groupArray = j), k = 0; k < j.length; k++)
                        if (l = j[k], l.isOver = !1, e = l.displayObject, "MapImage" == l.objectType && (e = l.image), e) {
                            var m = l.selectedColorReal;
                            void 0 !== m && e.setAttr("fill", m), void 0 !== h && e.setAttr("stroke", h), void 0 !== i && e.setAttr("stroke-width", i), "MapLine" == l.objectType && ((e = l.lineSvg) && e.setAttr("stroke", g), e = l.arrowSvg) && (e.setAttr("fill", g), e.setAttr("stroke", g))
                        }
                d.rescaleObjects(), d.zoomToSelectedObject(), f != b && d.fire({
                    type: "selectedObjectChanged",
                    chart: d
                })
            },
            returnInitialColor: function (a, b) {
                if (this.returnInitialColorReal(a), b && (a.isFirst = !1), this.selectedObject.bringForwardOnHover) {
                    var c = this.selectedObject.displayObject;
                    c && c.toFront()
                }
                if (c = a.groupId) {
                    var d, c = this.getGroupById(c);
                    for (d = 0; d < c.length; d++) this.returnInitialColorReal(c[d]), b && (c[d].isFirst = !1)
                }
                this.outlinesToFront()
            },
            outlinesToFront: function () {
                if (this.outlines)
                    for (var a = 0; a < this.outlines.length; a++) this.outlines[a].toFront()
            },
            closeAllDescriptions: function () {
                this.descriptionsDiv.innerHTML = ""
            },
            fireClosed: function () {
                this.fire({
                    type: "descriptionClosed",
                    chart: this
                })
            },
            returnInitialColorReal: function (b) {
                b.isOver = !1;
                var c = b.displayObject;
                if (c) {
                    if (a.removeCN(this, c, "selected-object"), c.toPrevious(), "MapImage" == b.objectType) {
                        var d = b.tempScale;
                        isNaN(d) || c.translate(c.x, c.y, d, !0), b.tempScale = NaN, c = b.image
                    }
                    if (d = b.colorReal, "MapLine" == b.objectType) {
                        var e = b.lineSvg;
                        if (e && e.setAttr("stroke", d), e = b.arrowSvg) {
                            var f = b.arrowColor;
                            void 0 == f && (f = d), e.setAttr("fill", f), e.setAttr("stroke", f)
                        }
                    }
                    var e = b.alphaReal,
                        f = b.outlineAlphaReal,
                        g = b.outlineThicknessReal,
                        h = b.outlineColorReal;
                    if (b.showAsSelected) {
                        var i, j, d = b.selectedColorReal;
                        "MapImage" == b.objectType && (i = this.imagesSettings.selectedOutlineColor, j = this.imagesSettings.selectedOutlineThickness), "MapArea" == b.objectType && (i = this.areasSettings.selectedOutlineColor, j = this.areasSettings.selectedOutlineThickness), void 0 !== i && (h = i), void 0 !== j && (g = j)
                    }
                    "bubble" == b.type && (d = void 0), void 0 !== d && c.setAttr("fill", d), (i = b.image) && (i.setAttr("fill", d), i.setAttr("stroke", h), i.setAttr("stroke-width", g), i.setAttr("fill-opacity", e), i.setAttr("stroke-opacity", f)), "MapArea" == b.objectType && (d = 1, this.areasSettings.adjustOutlineThickness && (d = this.zoomLevel() * this.mapScale), c.setAttr("stroke", h), c.setAttr("stroke-width", g / d), c.setAttr("fill-opacity", e), c.setAttr("stroke-opacity", f)), (d = b.pattern) && c.pattern(d, this.mapScale, this.path), (c = b.imageLabel) && !b.labelInactive && (b.showAsSelected && void 0 !== b.selectedLabelColor ? c.setAttr("fill", b.selectedLabelColor) : c.setAttr("fill", b.labelColorReal))
                }
            },
            zoomToRectangle: function (b, c, d, e) {
                var f = this.realWidth,
                    g = this.realHeight,
                    h = this.mapSet.scale,
                    i = this.zoomControl,
                    f = a.fitToBounds(d / f > e / g ? .8 * f / (d * h) : .8 * g / (e * h), i.minZoomLevel, i.maxZoomLevel);
                this.zoomToMapXY(f, (b + d / 2) * h, (c + e / 2) * h)
            },
            zoomToLatLongRectangle: function (b, c, d, e) {
                var f = this.dataProvider,
                    g = this.zoomControl,
                    h = Math.abs(d - b),
                    i = Math.abs(c - e),
                    j = Math.abs(f.rightLongitude - f.leftLongitude),
                    f = Math.abs(f.topLatitude - f.bottomLatitude),
                    g = a.fitToBounds(h / j > i / f ? .8 * j / h : .8 * f / i, g.minZoomLevel, g.maxZoomLevel);
                this.zoomToLongLat(g, b + (d - b) / 2, e + (c - e) / 2)
            },
            getGroupById: function (a) {
                var b = [];
                return this.getGroup(this.imagesProcessor.allObjects, a, b), this.getGroup(this.linesProcessor.allObjects, a, b), this.getGroup(this.areasProcessor.allObjects, a, b), b
            },
            zoomToGroup: function (a) {
                a = "object" == typeof a ? a : this.getGroupById(a);
                var b, c, d, e, f;
                for (f = 0; f < a.length; f++) {
                    var g = a[f].displayObject;
                    if (g) {
                        var h = g.getBBox(),
                            g = h.y,
                            i = h.y + h.height,
                            j = h.x,
                            h = h.x + h.width;
                        (g < b || isNaN(b)) && (b = g), (i > e || isNaN(e)) && (e = i), (j < c || isNaN(c)) && (c = j), (h > d || isNaN(d)) && (d = h)
                    }
                }
                c += this.diffX, d += this.diffX, e += this.diffY, b += this.diffY, this.zoomToRectangle(c, b, d - c, e - b)
            },
            getGroup: function (a, b, c) {
                if (a) {
                    var d;
                    for (d = 0; d < a.length; d++) {
                        var e = a[d];
                        e.groupId == b && c.push(e)
                    }
                }
            },
            zoomToStageXY: function (b, c, d, e) {
                if (!this.objectWasClicked) {
                    var f = this.zoomControl;
                    b = a.fitToBounds(b, f.minZoomLevel, f.maxZoomLevel);
                    var f = this.zoomLevel(),
                        g = this.mapSet.getBBox();
                    c = this.xyToCoordinates((c - this.mapContainer.x) / f - g.x * this.mapScale, (d - this.mapContainer.y) / f - g.y * this.mapScale), this.zoomToLongLat(b, c.longitude, c.latitude, e)
                }
            },
            zoomToLongLat: function (a, b, c, d) {
                b = this.coordinatesToXY(b, c), this.zoomToMapXY(a, b.x, b.y, d)
            },
            zoomToMapXY: function (a, b, c, d) {
                var e = this.mapWidth,
                    f = this.mapHeight;
                this.zoomTo(a, -b / e * a + this.realWidth / e / 2, -c / f * a + this.realHeight / f / 2, d)
            },
            zoomToObject: function (b) {
                if (b) {
                    var c = b.zoomLatitude,
                        d = b.zoomLongitude;
                    isNaN(b.zoomLatitudeC) || (c = b.zoomLatitudeC), isNaN(b.zoomLongitudeC) || (d = b.zoomLongitudeC);
                    var e = b.zoomLevel,
                        f = this.zoomInstantly,
                        g = b.zoomX,
                        h = b.zoomY,
                        i = this.realWidth,
                        j = this.realHeight;
                    isNaN(e) || (isNaN(c) || isNaN(d) ? this.zoomTo(e, g, h, f) : this.zoomToLongLat(e, d, c, f)), this.zoomInstantly = !1, "MapImage" == b.objectType && isNaN(b.zoomX) && isNaN(b.zoomY) && isNaN(b.zoomLatitude) && isNaN(b.zoomLongitude) && !isNaN(b.latitude) && !isNaN(b.longitude) && this.zoomToLongLat(b.zoomLevel, b.longitude, b.latitude), "MapArea" == b.objectType && (f = b.displayObject.getBBox(), g = this.mapScale, c = (f.x + this.diffX) * g, d = (f.y + this.diffY) * g, e = f.width * g, f = f.height * g, i = b.autoZoomReal && isNaN(b.zoomLevel) ? e / i > f / j ? .8 * i / e : .8 * j / f : b.zoomLevel, j = this.zoomControl, i = a.fitToBounds(i, j.minZoomLevel, j.maxZoomLevel), isNaN(b.zoomX) && isNaN(b.zoomY) && isNaN(b.zoomLatitude) && isNaN(b.zoomLongitude) && this.zoomToMapXY(i, c + e / 2, d + f / 2)), this.zoomControl.update()
                }
            },
            zoomToSelectedObject: function () {
                this.zoomToObject(this.selectedObject)
            },
            zoomTo: function (b, c, d, e) {
                var f = this.zoomControl;
                b = a.fitToBounds(b, f.minZoomLevel, f.maxZoomLevel), f = this.zoomLevel(), isNaN(c) && (c = this.realWidth / this.mapWidth, c = (this.zoomX() - .5 * c) * (b / f) + .5 * c), isNaN(d) && (d = this.realHeight / this.mapHeight, d = (this.zoomY() - .5 * d) * (b / f) + .5 * d), this.stopAnimation(), isNaN(b) || (f = this.mapContainer, this.initialX = f.x, this.initialY = f.y, this.initialScale = f.scale, this.finalX = this.mapWidth * c, this.finalY = this.mapHeight * d, this.finalScale = b, this.finalX != this.initialX || this.finalY != this.initialY || this.finalScale != this.initialScale ? e ? (this.tweenPercent = 1, this.rescaleMapAndObjects(), this.wheelBusy = !1) : this.animateMap() : this.wheelBusy = !1)
            },
            loadXml: function (a) {
                var b;
                window.XMLHttpRequest && (b = new XMLHttpRequest), b.overrideMimeType && b.overrideMimeType("text/xml"), b.open("GET", a, !1), b.send(), this.parseXMLObject(b.responseXML), this.svgData && this.buildEverything()
            },
            stopAnimation: function () {
                this.frame = this.totalFrames
            },
            processObjects: function (a) {
                var b = this.selectedObject;
                if (0 < b.images.length || 0 < b.areas.length || 0 < b.lines.length || b == this.dataProvider || a) {
                    a = this.container;
                    var c = this.stageImagesContainer;
                    c && c.remove(), this.stageImagesContainer = c = a.set(), this.trendLinesSet.push(c);
                    var d = this.stageLinesContainer;
                    d && d.remove(), this.stageLinesContainer = d = a.set(), this.trendLinesSet.push(d);
                    var e = this.mapImagesContainer;
                    e && e.remove(), this.mapImagesContainer = e = a.set(), this.mapContainer.push(e);
                    var f = this.mapLinesContainer;
                    f && f.remove(), this.mapLinesContainer = f = a.set(), this.mapContainer.push(f), this.linesAboveImages ? (e.toFront(), c.toFront(), f.toFront(), d.toFront()) : (f.toFront(), d.toFront(), e.toFront(), c.toFront()), b && (this.imagesProcessor.reset(), this.linesProcessor.reset(), this.linesAboveImages ? (this.imagesProcessor.process(b), this.linesProcessor.process(b)) : (this.linesProcessor.process(b), this.imagesProcessor.process(b))), this.rescaleObjects()
                }
            },
            processAreas: function () {
                this.areasProcessor.process(this.dataProvider)
            },
            buildSVGMap: function () {
                a.remove(this.mapSet);
                var b = this.svgData.g.path,
                    c = this.container,
                    d = c.set();
                this.svgAreas = [], this.svgAreasById = {}, void 0 === b.length && (b = [b]);
                var e;
                for (e = 0; e < b.length; e++) {
                    var f = b[e],
                        g = f.d,
                        h = f.title;
                    f.titleTr && (h = f.titleTr);
                    var i = c.path(g);
                    if (i.id = f.id, this.areasSettings.preserveOriginalAttributes) {
                        i.customAttr = {};
                        for (var j in f) "d" != j && "id" != j && "title" != j && (i.customAttr[j] = f[j])
                    }
                    f.outline && (i.outline = !0), i.path = g, this.svgAreasById[f.id] = {
                        area: i,
                        title: h,
                        className: f.class
                    }, this.svgAreas.push(i), d.push(i)
                }
                this.mapSet = d, this.mapContainer.push(d), this.resizeMap()
            },
            centerAlign: function () { },
            setProjection: function (a) {
                this.projection = a, this.chartCreated = !1, this.buildEverything()
            },
            addObjectEventListeners: function (a, b) {
                var c = this;
                a.mousedown(function (a) {
                    c.mouseDownMapObject(b, a)
                }).mouseup(function (a) {
                    c.clickMapObject(b, a)
                }).mouseover(function (a) {
                    c.balloonX = NaN, c.rollOverMapObject(b, !0, a)
                }).mouseout(function (a) {
                    c.balloonX = NaN, c.rollOutMapObject(b, a)
                }).touchend(function (a) {
                    4 > Math.abs(c.mouseX - c.tmx) && 4 > Math.abs(c.mouseY - c.tmy) && (c.tapped = !0), c.tapToActivate && !c.tapped || c.mapWasDragged || c.mapWasPinched || (c.balloonX = NaN, c.rollOverMapObject(b, !0, a), c.clickMapObject(b, a))
                }).touchstart(function (a) {
                    c.tmx = c.mouseX, c.tmy = c.mouseY, c.mouseDownMapObject(b, a)
                }).keyup(function (a) {
                    13 == a.keyCode && c.clickMapObject(b, a)
                })
            },
            checkIfSelected: function (a) {
                var b = this.selectedObject;
                if (b == a) return !0;
                if (b = b.groupId) {
                    var c, b = this.getGroupById(b);
                    for (c = 0; c < b.length; c++)
                        if (b[c] == a) return !0
                }
                return !1
            },
            clearMap: function () {
                this.chartDiv.innerHTML = "", this.clearObjectList()
            },
            clearObjectList: function () {
                var a = this.objectList;
                a && a.div && (a.div.innerHTML = "")
            },
            checkIfLast: function (a) {
                if (a) {
                    var b = a.parentNode;
                    if (b && b.lastChild == a) return !0
                }
                return !1
            },
            showAsRolledOver: function (b) {
                var c = b.displayObject;
                if (!b.showAsSelected && c && !b.isOver) {
                    c.node.onmouseout = function () { }, c.node.onmouseover = function () { }, c.node.onclick = function () { }, !b.isFirst && b.bringForwardOnHover && (c.toFront(), b.isFirst = !0);
                    var e, d = b.rollOverColorReal;
                    if (b.preserveOriginalAttributes && (d = void 0), "bubble" == b.type && (d = void 0), void 0 == d && (isNaN(b.rollOverBrightnessReal) || (d = a.adjustLuminosity(b.colorReal, b.rollOverBrightnessReal / 100))), void 0 != d && ("MapImage" == b.objectType ? (e = b.image) && e.setAttr("fill", d) : "MapLine" == b.objectType ? ((e = b.lineSvg) && e.setAttr("stroke", d), (e = b.arrowSvg) && (e.setAttr("fill", d), e.setAttr("stroke", d))) : c.setAttr("fill", d)), (d = b.imageLabel) && !b.labelInactive && void 0 != (e = b.labelRollOverColorReal) && d.setAttr("fill", e), d = b.rollOverOutlineColorReal, void 0 != d && ("MapImage" == b.objectType ? (e = b.image) && e.setAttr("stroke", d) : c.setAttr("stroke", d)), "MapImage" == b.objectType ? (d = this.imagesSettings.rollOverOutlineThickness, (e = b.image) && (isNaN(d) || e.setAttr("stroke-width", d))) : (d = this.areasSettings.rollOverOutlineThickness, isNaN(d) || c.setAttr("stroke-width", d)), "MapArea" == b.objectType) {
                        d = this.areasSettings, e = b.rollOverAlphaReal, isNaN(e) || c.setAttr("fill-opacity", e), e = d.rollOverOutlineAlpha, isNaN(e) || c.setAttr("stroke-opacity", e), e = 1, this.areasSettings.adjustOutlineThickness && (e = this.zoomLevel() * this.mapScale);
                        var f = d.rollOverOutlineThickness;
                        isNaN(f) || c.setAttr("stroke-width", f / e), (d = d.rollOverPattern) && c.pattern(d, this.mapScale, this.path)
                    }
                    "MapImage" == b.objectType && (d = b.rollOverScaleReal, isNaN(d) || 1 == d || (e = c.scale, isNaN(e) && (e = 1), b.tempScale = e, c.translate(c.x, c.y, e * d, !0))), this.useHandCursorOnClickableOjects && this.checkIfClickable(b) && c.setAttr("cursor", "pointer"), b.mouseEnabled && this.addObjectEventListeners(c, b), b.isOver = !0
                }
                this.outlinesToFront()
            },
            rollOverMapObject: function (a, b, c) {
                if (this.chartCreated) {
                    this.handleMouseMove();
                    var d = this.previouslyHovered;
                    if (d && d != a ? (!1 === this.checkIfSelected(d) && (this.returnInitialColor(d, !0), this.previouslyHovered = null), this.balloon.hide(0)) : clearTimeout(this.hoverInt), !this.preventHover) {
                        if (!1 === this.checkIfSelected(a)) {
                            if (d = a.groupId) {
                                var e, d = this.getGroupById(d);
                                for (e = 0; e < d.length; e++) d[e] != a && this.showAsRolledOver(d[e])
                            }
                            this.showAsRolledOver(a)
                        } else (d = a.displayObject) && (this.allowClickOnSelectedObject ? d.setAttr("cursor", "pointer") : d.setAttr("cursor", "default"));
                        this.showDescriptionOnHover ? this.showDescription(a) : !this.showBalloonOnSelectedObject && this.checkIfSelected(a) || !1 === b || (e = this.balloon, this.balloon.fixedPosition = !1, b = a.colorReal, d = "", void 0 !== b && this.useObjectColorForBalloon || (b = e.fillColor), (e = a.balloonTextReal) && (d = this.formatString(e, a)), this.balloonLabelFunction && (d = this.balloonLabelFunction(a, this)), d && "" !== d && this.showBalloon(d, b, !1, this.balloonX, this.balloonY)), this.fire({
                            type: "rollOverMapObject",
                            mapObject: a,
                            chart: this,
                            event: c
                        }), this.previouslyHovered = a
                    }
                }
            },
            longitudeToX: function (a) {
                return (this.longitudeToCoordinate(a) + this.diffX * this.mapScale) * this.zoomLevel() + this.mapContainer.x
            },
            latitudeToY: function (a) {
                return (this.latitudeToCoordinate(a) + this.diffY * this.mapScale) * this.zoomLevel() + this.mapContainer.y
            },
            latitudeToStageY: function (a) {
                return this.latitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.y + this.diffY * this.mapScale
            },
            longitudeToStageX: function (a) {
                return this.longitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.x + this.diffX * this.mapScale
            },
            stageXToLongitude: function (a) {
                return a = (a - this.mapContainer.x) / this.zoomLevel(), this.coordinateToLongitude(a)
            },
            stageYToLatitude: function (a) {
                return a = (a - this.mapContainer.y) / this.zoomLevel(), this.coordinateToLatitude(a)
            },
            rollOutMapObject: function (a, b) {
                this.hideBalloon(), a && this.chartCreated && a.isOver && (this.checkIfSelected(a) || this.returnInitialColor(a), this.fire({
                    type: "rollOutMapObject",
                    mapObject: a,
                    chart: this,
                    event: b
                }))
            },
            formatString: function (b, c) {
                var d = this.nf,
                    e = this.pf,
                    f = c.title;
                c.titleTr && (f = c.titleTr), void 0 == f && (f = "");
                var g = c.value,
                    g = isNaN(g) ? "" : a.formatNumber(g, d),
                    d = c.percents,
                    d = isNaN(d) ? "" : a.formatNumber(d, e),
                    e = c.description;
                void 0 == e && (e = "");
                var h = c.customData;
                return void 0 == h && (h = ""), b = a.massReplace(b, {
                    "[[title]]": f,
                    "[[value]]": g,
                    "[[percent]]": d,
                    "[[description]]": e,
                    "[[customData]]": h
                })
            },
            mouseDownMapObject: function (a, b) {
                this.fire({
                    type: "mouseDownMapObject",
                    mapObject: a,
                    chart: this,
                    event: b
                })
            },
            clickMapObject: function (a, b) {
                var c = this;
                if (b && (b.touches || isNaN(a.zoomLevel) && isNaN(a.zoomX) && isNaN(a.zoomY) || c.hideBalloon()), c.chartCreated && !c.preventHover && c.checkTouchDuration(b) && !c.mapWasDragged && c.checkIfClickable(a) && !c.mapWasPinched) {
                    c.selectObject(a);
                    var d = c.zoomLevel(),
                        e = c.mapSet.getBBox(),
                        d = c.xyToCoordinates((c.mouseX - c.mapContainer.x) / d - e.x * c.mapScale, (c.mouseY - c.mapContainer.y) / d - e.y * c.mapScale);
                    c.clickLatitude = d.latitude, c.clickLongitude = d.longitude, b && b.touches && setTimeout(function () {
                        c.showBalloonAfterZoom.call(c)
                    }, 1e3 * c.zoomDuration), c.fire({
                        type: "clickMapObject",
                        mapObject: a,
                        chart: c,
                        event: b
                    }), c.objectWasClicked = !0
                }
            },
            showBalloonAfterZoom: function () {
                var a = this.clickLongitude,
                    b = this.clickLatitude,
                    c = this.selectedObject;
                "MapImage" != c.objectType || isNaN(c.longitude) || (a = c.longitude, b = c.latitude), a = this.coordinatesToStageXY(a, b), this.balloonX = a.x, this.balloonY = a.y, this.rollOverMapObject(this.selectedObject, !0)
            },
            checkIfClickable: function (a) {
                var b = this.allowClickOnSelectedObject;
                return !(this.selectedObject != a || !b) || !(this.selectedObject == a && !b) && !(!(!0 === a.selectable || "MapArea" == a.objectType && a.autoZoomReal || a.url || a.linkToObject || 0 < a.images.length || 0 < a.lines.length) && isNaN(a.zoomLevel) && isNaN(a.zoomX) && isNaN(a.zoomY) && !a.description)
            },
            resizeMap: function () {
                var a = this.mapSet;
                if (a) {
                    var b = 1,
                        c = a.getBBox(),
                        d = this.realWidth,
                        e = this.realHeight,
                        f = c.width,
                        c = c.height;
                    0 < f && 0 < c && (this.fitMapToContainer && (b = f / d > c / e ? d / f : e / c), a.translate(0, 0, b, !0), this.mapScale = b, this.mapHeight = c * b, this.mapWidth = f * b)
                }
            },
            zoomIn: function () {
                var a = this.zoomLevel() * this.zoomControl.zoomFactor;
                this.zoomTo(a)
            },
            zoomOut: function () {
                var a = this.zoomLevel() / this.zoomControl.zoomFactor;
                this.zoomTo(a)
            },
            moveLeft: function () {
                var a = this.zoomX() + this.zoomControl.panStepSize;
                this.zoomTo(this.zoomLevel(), a, this.zoomY())
            },
            moveRight: function () {
                var a = this.zoomX() - this.zoomControl.panStepSize;
                this.zoomTo(this.zoomLevel(), a, this.zoomY())
            },
            moveUp: function () {
                var a = this.zoomY() + this.zoomControl.panStepSize;
                this.zoomTo(this.zoomLevel(), this.zoomX(), a)
            },
            moveDown: function () {
                var a = this.zoomY() - this.zoomControl.panStepSize;
                this.zoomTo(this.zoomLevel(), this.zoomX(), a)
            },
            zoomX: function () {
                return this.mapSet ? Math.round(1e4 * this.mapContainer.x / this.mapWidth) / 1e4 : NaN
            },
            zoomY: function () {
                return this.mapSet ? Math.round(1e4 * this.mapContainer.y / this.mapHeight) / 1e4 : NaN
            },
            goHome: function () {
                this.selectObject(this.dataProvider), this.fire({
                    type: "homeButtonClicked",
                    chart: this
                })
            },
            zoomLevel: function () {
                return Math.round(1e5 * this.mapContainer.scale) / 1e5
            },
            showDescriptionAndGetUrl: function () {
                var b = this.selectedObject;
                if (b) {
                    this.showDescription();
                    var c = b.url;
                    if (c) a.getURL(c, b.urlTarget);
                    else if (c = b.linkToObject) {
                        if (a.isString(c)) {
                            var d = this.getObjectById(c);
                            if (d) return void this.selectObject(d)
                        }
                        c && b.passZoomValuesToTarget && (c.zoomLatitude = this.zoomLatitude(), c.zoomLongitude = this.zoomLongitude(), c.zoomLevel = this.zoomLevel()), this.extendMapData(c) || this.selectObject(c)
                    }
                }
            },
            extendMapData: function (b) {
                var c = b.objectType;
                if ("MapImage" != c && "MapArea" != c && "MapLine" != c) return a.extend(b, new a.MapData, !0), this.dataProvider = b, this.zoomInstantly = !0, this.validateData(), !0
            },
            showDescription: function (b) {
                if (b || (b = this.selectedObject), this.allowMultipleDescriptionWindows || this.closeAllDescriptions(), b.description) {
                    var c = b.descriptionWindow;
                    c && c.close(), c = new a.DescriptionWindow, b.descriptionWindow = c;
                    var d = b.descriptionWindowWidth,
                        e = b.descriptionWindowHeight,
                        f = b.descriptionWindowLeft,
                        g = b.descriptionWindowTop,
                        h = b.descriptionWindowRight,
                        i = b.descriptionWindowBottom;
                    isNaN(h) || (f = this.realWidth - h), isNaN(i) || (g = this.realHeight - i);
                    var j = b.descriptionWindowX;
                    isNaN(j) || (f = j), j = b.descriptionWindowY, isNaN(j) || (g = j), isNaN(f) && (f = this.mouseX, f = f > this.realWidth / 2 ? f - d - 20 : f + 20), isNaN(g) && (g = this.mouseY), c.maxHeight = e, j = b.title, b.titleTr && (j = b.titleTr), c.show(this, this.descriptionsDiv, b.description, j), b = c.div.style, b.position = "absolute", b.width = d + "px", b.maxHeight = e + "px", isNaN(i) || (g -= c.div.offsetHeight), isNaN(h) || (f -= c.div.offsetWidth), b.left = f + "px", b.top = g + "px"
                }
            },
            parseXMLObject: function (a) {
                var b = {
                    root: {}
                };
                this.parseXMLNode(b, "root", a), this.svgData = b.root.svg, this.getBounds()
            },
            getBounds: function () {
                var a = this.dataProvider;
                try {
                    var b = this.svgData.defs["historymaps:historymap"];
                    a.leftLongitude = Number(b.leftLongitude), a.rightLongitude = Number(b.rightLongitude), a.topLatitude = Number(b.topLatitude), a.bottomLatitude = Number(b.bottomLatitude), a.projection = b.projection;
                    var c = b.wrappedLongitudes;
                    c && (a.rightLongitude += 360), a.wrappedLongitudes = c
                } catch (a) { }
            },
            recalcLongitude: function (a) {
                return this.dataProvider.wrappedLongitudes && a < this.dataProvider.leftLongitude ? Number(a) + 360 : a
            },
            latitudeToCoordinate: function (a) {
                var b, c = this.dataProvider;
                if (this.mapSet) {
                    b = c.topLatitude;
                    var d = c.bottomLatitude;
                    "mercator" == c.projection && (a = this.mercatorLatitudeToCoordinate(a), b = this.mercatorLatitudeToCoordinate(b), d = this.mercatorLatitudeToCoordinate(d)), b = (a - b) / (d - b) * this.mapHeight
                }
                return b
            },
            longitudeToCoordinate: function (a) {
                a = this.recalcLongitude(a);
                var b, c = this.dataProvider;
                return this.mapSet && (b = c.leftLongitude, b = (a - b) / (c.rightLongitude - b) * this.mapWidth), b
            },
            mercatorLatitudeToCoordinate: function (b) {
                return 89.5 < b && (b = 89.5), -89.5 > b && (b = -89.5), b = a.degreesToRadians(b), a.radiansToDegrees(.5 * Math.log((1 + Math.sin(b)) / (1 - Math.sin(b))) / 2)
            },
            zoomLatitude: function () {
                if (this.mapContainer) {
                    var a = this.mapSet.getBBox(),
                        b = (-this.mapContainer.x + this.previousWidth / 2) / this.zoomLevel() - a.x * this.mapScale,
                        a = (-this.mapContainer.y + this.previousHeight / 2) / this.zoomLevel() - a.y * this.mapScale;
                    return this.xyToCoordinates(b, a).latitude
                }
            },
            zoomLongitude: function () {
                if (this.mapContainer) {
                    var a = this.mapSet.getBBox(),
                        b = (-this.mapContainer.x + this.previousWidth / 2) / this.zoomLevel() - a.x * this.mapScale,
                        a = (-this.mapContainer.y + this.previousHeight / 2) / this.zoomLevel() - a.y * this.mapScale;
                    return this.xyToCoordinates(b, a).longitude
                }
            },
            getAreaCenterLatitude: function (a) {
                a = a.displayObject.getBBox();
                var b = this.mapScale,
                    c = this.mapSet.getBBox();
                return this.xyToCoordinates((a.x + a.width / 2 + this.diffX) * b - c.x * b, (a.y + a.height / 2 + this.diffY) * b - c.y * b).latitude
            },
            getAreaCenterLongitude: function (a) {
                a = a.displayObject.getBBox();
                var b = this.mapScale,
                    c = this.mapSet.getBBox();
                return this.xyToCoordinates((a.x + a.width / 2 + this.diffX) * b - c.x * b, (a.y + a.height / 2 + this.diffY) * b - c.y * b).longitude
            },
            milesToPixels: function (a) {
                var b = this.dataProvider;
                return this.mapWidth / (b.rightLongitude - b.leftLongitude) * a / 69.172
            },
            kilometersToPixels: function (a) {
                var b = this.dataProvider;
                return this.mapWidth / (b.rightLongitude - b.leftLongitude) * a / 111.325
            },
            handleBackgroundClick: function () {
                if (this.backgroundZoomsToTop && !this.mapWasDragged) {
                    var a = this.dataProvider;
                    if (this.checkIfClickable(a)) this.clickMapObject(a);
                    else {
                        var b = a.zoomX,
                            c = a.zoomY,
                            d = a.zoomLongitude,
                            e = a.zoomLatitude,
                            a = a.zoomLevel;
                        isNaN(b) || isNaN(c) || this.zoomTo(a, b, c), isNaN(d) || isNaN(e) || this.zoomToLongLat(a, d, e, !0)
                    }
                }
            },
            parseXMLNode: function (a, b, c, d) {
                void 0 === d && (d = "");
                var e, f, g;
                if (c) {
                    var h = c.childNodes.length;
                    for (e = 0; e < h; e++) {
                        f = c.childNodes[e];
                        var i = f.nodeName,
                            j = f.nodeValue ? this.trim(f.nodeValue) : "",
                            k = !1;
                        if (f.attributes && 0 < f.attributes.length && (k = !0), 0 !== f.childNodes.length || "" !== j || !1 !== k)
                            if (3 == f.nodeType || 4 == f.nodeType) {
                                if ("" !== j) {
                                    f = 0;
                                    for (g in a[b]) a[b].hasOwnProperty(g) && f++;
                                    f ? a[b]["#text"] = j : a[b] = j
                                }
                            } else if (1 == f.nodeType) {
                                var l;
                                if (void 0 !== a[b][i] ? void 0 === a[b][i].length ? (l = a[b][i], a[b][i] = [], a[b][i].push(l), a[b][i].push({}), l = a[b][i][1]) : "object" == typeof a[b][i] && (a[b][i].push({}), l = a[b][i][a[b][i].length - 1]) : (a[b][i] = {}, l = a[b][i]), f.attributes && f.attributes.length)
                                    for (j = 0; j < f.attributes.length; j++) l[f.attributes[j].name] = f.attributes[j].value;
                                void 0 !== a[b][i].length ? this.parseXMLNode(a[b][i], a[b][i].length - 1, f, d + "  ") : this.parseXMLNode(a[b], i, f, d + "  ")
                            }
                    }
                    f = 0, c = "";
                    for (g in a[b]) "#text" == g ? c = a[b][g] : f++;
                    0 === f && void 0 === a[b].length && (a[b] = c)
                }
            },
            doDoubleClickZoom: function () {
                if (!this.mapWasDragged) {
                    var a = this.zoomLevel() * this.zoomControl.zoomFactor;
                    this.zoomToStageXY(a, this.mouseX, this.mouseY)
                }
            },
            getDevInfo: function () {
                var a = this.zoomLevel(),
                    b = this.mapSet.getBBox(),
                    b = this.xyToCoordinates((this.mouseX - this.mapContainer.x) / a - b.x * this.mapScale, (this.mouseY - this.mapContainer.y) / a - b.y * this.mapScale),
                    a = {
                        chart: this,
                        type: "writeDevInfo",
                        zoomLevel: a,
                        zoomX: this.zoomX(),
                        zoomY: this.zoomY(),
                        zoomLatitude: this.zoomLatitude(),
                        zoomLongitude: this.zoomLongitude(),
                        latitude: b.latitude,
                        longitude: b.longitude,
                        left: this.mouseX,
                        top: this.mouseY,
                        right: this.realWidth - this.mouseX,
                        bottom: this.realHeight - this.mouseY,
                        percentLeft: Math.round(this.mouseX / this.realWidth * 100) + "%",
                        percentTop: Math.round(this.mouseY / this.realHeight * 100) + "%",
                        percentRight: Math.round((this.realWidth - this.mouseX) / this.realWidth * 100) + "%",
                        percentBottom: Math.round((this.realHeight - this.mouseY) / this.realHeight * 100) + "%"
                    },
                    b = "zoomLevel:" + a.zoomLevel + ", zoomLongitude:" + a.zoomLongitude + ", zoomLatitude:" + a.zoomLatitude + "\n",
                    b = b + "zoomX:" + a.zoomX + ", zoomY:" + a.zoomY + "\n",
                    b = b + "latitude:" + a.latitude + ", longitude:" + a.longitude + "\n",
                    b = b + "left:" + a.left + ", top:" + a.top + "\n",
                    b = b + "right:" + a.right + ", bottom:" + a.bottom + "\n",
                    b = b + "left:" + a.percentLeft + ", top:" + a.percentTop + "\n",
                    b = b + "right:" + a.percentRight + ", bottom:" + a.percentBottom + "\n";
                return a.str = b, this.fire(a), a
            },
            getXY: function (a, b, c) {
                return void 0 !== a && (-1 != String(a).indexOf("%") ? (a = Number(a.split("%").join("")), c && (a = 100 - a), a = Number(a) * b / 100) : c && (a = b - a)), a
            },
            getObjectById: function (a) {
                var b = this.dataProvider;
                if (b.areas) {
                    var c = this.getObject(a, b.areas);
                    if (c) return c
                }
                return (c = this.getObject(a, b.images)) ? c : (a = this.getObject(a, b.lines)) ? a : void 0
            },
            getObject: function (a, b) {
                if (b) {
                    var c;
                    for (c = 0; c < b.length; c++) {
                        var d = b[c];
                        if (d.id == a) return d;
                        if (d.areas) {
                            var e = this.getObject(a, d.areas);
                            if (e) return e
                        }
                        if (e = this.getObject(a, d.images)) return e;
                        if (d = this.getObject(a, d.lines)) return d
                    }
                }
            },
            parseData: function () {
                var a = this.dataProvider;
                this.processObject(a.areas, a, "area"), this.processObject(a.images, a, "image"), this.processObject(a.lines, a, "line")
            },
            processObject: function (b, c, d) {
                if (b) {
                    var e;
                    for (e = 0; e < b.length; e++) {
                        var f = b[e];
                        f.parentObject = c, "area" == d && a.extend(f, new a.MapArea(this.theme), !0), "image" == d && (f = a.extend(f, new a.MapImage(this.theme), !0)), "line" == d && (f = a.extend(f, new a.MapLine(this.theme), !0)), b[e] = f, f.areas && this.processObject(f.areas, f, "area"), f.images && this.processObject(f.images, f, "image"), f.lines && this.processObject(f.lines, f, "line")
                    }
                }
            },
            positionChanged: function () {
                var a = {
                    type: "positionChanged",
                    zoomX: this.zoomX(),
                    zoomY: this.zoomY(),
                    zoomLevel: this.zoomLevel(),
                    chart: this
                };
                this.fire(a)
            },
            getX: function (a, b) {
                return this.getXY(a, this.realWidth, b)
            },
            getY: function (a, b) {
                return this.getXY(a, this.realHeight, b)
            },
            trim: function (a) {
                if (a) {
                    var b;
                    for (b = 0; b < a.length; b++)
                        if (-1 === " \n\r\t\f\v            ​\u2028\u2029　".indexOf(a.charAt(b))) {
                            a = a.substring(b);
                            break
                        }
                    for (b = a.length - 1; 0 <= b; b--)
                        if (-1 === " \n\r\t\f\v            ​\u2028\u2029　".indexOf(a.charAt(b))) {
                            a = a.substring(0, b + 1);
                            break
                        }
                    return -1 === " \n\r\t\f\v            ​\u2028\u2029　".indexOf(a.charAt(0)) ? a : ""
                }
            },
            destroy: function () {
                a.HisMap.base.destroy.call(this)
            },
            x2c: function (a) {
                var b = this.dataProvider.leftLongitude;
                return Math.round(this.unscaledMapWidth * (a - b) / (this.dataProvider.rightLongitude - b) * 100) / 100
            },
            y2c: function (a) {
                var b = this.dataProvider.topLatitude;
                return Math.round(this.unscaledMapHeight * (a - b) / (this.dataProvider.bottomLatitude - b) * 100) / 100
            },
            normalize: function (b) {
                if (!b.pathsArray) {
                    var c;
                    if (b.normalized) c = b.normalized;
                    else {
                        var d = a.normalizePath(b.node);
                        c = b.node.getAttribute("d"), b.normalized = c, d.maxX > this.maxMapX && (this.maxMapX = d.maxX), d.minX < this.minMapX && (this.minMapX = d.minX), d.maxY > this.maxMapY && (this.maxMapY = d.maxY), d.minY < this.minMapY && (this.minMapY = d.minY)
                    }
                    b.node.setAttribute("d", c)
                }
            },
            redraw: function (a) {
                var b = a.normalized,
                    b = b.split(" Z").join(""),
                    b = b.split("M");
                a.pathsArray = [];
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    if (d) {
                        for (var d = d.split("L"), e = [], f = 0; f < d.length; f++)
                            if (d[f]) {
                                var g = d[f].split(" "),
                                    g = this.xyToCoordinates(Number(g[1]), Number(g[2]), this.dpProjectionFunction, this.sourceMapWidth, this.sourceMapHeight);
                                e.push([g.longitude, g.latitude])
                            }
                        a.pathsArray.push(e)
                    }
                }
                for (b = "", c = 0; c < a.pathsArray.length; c++) b += this.redrawArea(a.pathsArray[c]);
                a.node.setAttribute("d", b), a.path = b
            },
            redrawArea: function (b) {
                for (var c = !1, d = "", e = 0; e < b.length; e++) {
                    var f = b[e][0],
                        g = b[e][1],
                        h = a.degreesToRadians(b[e][0]),
                        i = a.degreesToRadians(b[e][1]),
                        i = this.projectionFunction(h, i),
                        h = a.roundTo(this.x2c(a.radiansToDegrees(i[0])), 3),
                        i = a.roundTo(this.y2c(a.radiansToDegrees(i[1])), 3);
                    h < this.minMapXX && (this.minMapXX = h, this.leftLongLat = {
                        longitude: f,
                        latitude: g
                    }), h > this.maxMapXX && (this.maxMapXX = h, this.rightLongLat = {
                        longitude: f,
                        latitude: g
                    }), i < this.minMapYY && (this.minMapYY = i, this.topLongLat = {
                        longitude: f,
                        latitude: g
                    }), i > this.maxMapYY && (this.maxMapYY = i, this.bottomLongLat = {
                        longitude: f,
                        latitude: g
                    }), c ? d += " L " : (d += " M ", c = !0), d += h + " " + i
                }
                return d + " Z "
            },
            normalizeMap: function () {
                var b = a.degreesToRadians(this.dataProvider.leftLongitude),
                    c = a.degreesToRadians(this.dataProvider.rightLongitude),
                    d = a.degreesToRadians(this.dataProvider.topLatitude),
                    e = a.degreesToRadians(this.dataProvider.bottomLatitude),
                    f = b + (c - b) / 2,
                    g = d + (e - d) / 2,
                    h = this.dpProjectionFunction(f, d)[1],
                    i = this.dpProjectionFunction(f, e)[1],
                    j = this.dpProjectionFunction(b, g)[0],
                    k = this.dpProjectionFunction(c, g)[0],
                    d = a.equirectangular(f, d),
                    e = a.equirectangular(f, e),
                    h = (d[1] - e[1]) / (h - i),
                    b = a.equirectangular(b, g),
                    c = a.equirectangular(c, g),
                    j = (b[0] - c[0]) / (j - k);
                for (this.minMapX = 1 / 0, this.maxMapX = -1 / 0, this.minMapY = 1 / 0, this.maxMapY = -1 / 0, k = 0; k < this.svgAreas.length; k++) this.normalize(this.svgAreas[k]);
                if (this.dataProvider.wrappedLongitudes)
                    for (k = 0; k < this.svgAreas.length; k++) this.svgAreas[k].translate(-this.minMapX, -this.minMapY);
                this.sourceMapHeight = Math.abs(this.maxMapY - this.minMapY), this.sourceMapWidth = Math.abs(this.maxMapX - this.minMapX), this.unscaledMapWidth = this.sourceMapWidth * j, this.unscaledMapHeight = this.sourceMapHeight * h, this.diffY = this.diffX = 0
            },
            fixMapPosition: function () {
                var b = a.degreesToRadians(this.dataProvider.leftLongitude),
                    c = a.degreesToRadians(this.dataProvider.rightLongitude),
                    d = a.degreesToRadians(this.dataProvider.topLatitude),
                    e = a.degreesToRadians(this.dataProvider.bottomLatitude),
                    f = b + (c - b) / 2,
                    g = d + (e - d) / 2,
                    h = this.dpProjectionFunction(f, d)[1],
                    i = this.dpProjectionFunction(f, e)[1],
                    j = this.dpProjectionFunction(b, g)[0],
                    k = this.dpProjectionFunction(c, g)[0];
                for (this.sourceMapHeight = this.mapHeight / this.mapScale, this.sourceMapWidth = this.mapWidth / this.mapScale, this.unscaledMapWidth = (b - c) / (j - k) * this.sourceMapWidth, this.unscaledMapHeight = (d - e) / (h - i) * this.sourceMapHeight, c = this.coordinatesToXY(a.radiansToDegrees(f), a.radiansToDegrees(d)), b = this.coordinatesToXY(a.radiansToDegrees(b), a.radiansToDegrees(g)), d = g = 1 / 0, e = 0; e < this.svgAreas.length; e++) f = this.svgAreas[e].getBBox(), f.y < g && (g = f.y), f.x < d && (d = f.x);
                for (this.diffY = c.y / this.mapScale - g, this.diffX = b.x / this.mapScale - d, e = 0; e < this.svgAreas.length; e++) this.svgAreas[e].translate(this.diffX, this.diffY)
            },
            changeProjection: function () {
                this.minMapXX = 1 / 0, this.maxMapXX = -1 / 0, this.minMapYY = 1 / 0, this.maxMapYY = -1 / 0, this.projectionChanged = !1;
                for (var a = 0; a < this.svgAreas.length; a++) this.redraw(this.svgAreas[a]);
                this.projectionChanged = !0, this.resizeMap()
            },
            coordinatesToXY: function (b, c) {
                var d, e;
                return d = !1, this.dataProvider && (d = this.dataProvider.wrappedLongitudes) && (b = this.recalcLongitude(b)), this.projectionFunction ? (e = this.projectionFunction(a.degreesToRadians(b), a.degreesToRadians(c)), d = this.mapScale * a.roundTo(this.x2c(a.radiansToDegrees(e[0])), 3), e = this.mapScale * a.roundTo(this.y2c(a.radiansToDegrees(e[1])), 3)) : (d = this.longitudeToCoordinate(b), e = this.latitudeToCoordinate(c)), {
                    x: d,
                    y: e
                }
            },
            coordinatesToStageXY: function (a, b) {
                var c = this.coordinatesToXY(a, b),
                    d = c.x * this.zoomLevel() + this.mapContainer.x,
                    c = c.y * this.zoomLevel() + this.mapContainer.y;
                return {
                    x: d,
                    y: c
                }
            },
            stageXYToCoordinates: function (a, b) {
                var c = this.mapSet.getBBox(),
                    d = (a - this.mapContainer.x) / this.zoomLevel() - c.x * this.mapScale,
                    c = (b - this.mapContainer.y) / this.zoomLevel() - c.y * this.mapScale;
                return this.xyToCoordinates(d, c)
            },
            xyToCoordinates: function (b, c, d, e, f) {
                var g;
                if (isNaN(e) && (e = this.mapWidth), isNaN(f) && (f = this.mapHeight), d || (d = this.projectionFunction), g = d.invert) {
                    var h = this.dataProvider.leftLongitude,
                        i = this.dataProvider.rightLongitude,
                        j = this.dataProvider.topLatitude,
                        k = this.dataProvider.bottomLatitude,
                        l = h + (i - h) / 2,
                        m = j + (k - j) / 2,
                        j = a.radiansToDegrees(d(a.degreesToRadians(l), a.degreesToRadians(j))[1]),
                        k = a.radiansToDegrees(d(a.degreesToRadians(l), a.degreesToRadians(k))[1]),
                        h = a.radiansToDegrees(d(a.degreesToRadians(h), a.degreesToRadians(m))[0]),
                        i = a.radiansToDegrees(d(a.degreesToRadians(i), a.degreesToRadians(m))[0]);
                    this.projectionChanged && (j = a.radiansToDegrees(d(a.degreesToRadians(this.topLongLat.longitude), a.degreesToRadians(this.topLongLat.latitude))[1]), k = a.radiansToDegrees(d(a.degreesToRadians(this.bottomLongLat.longitude), a.degreesToRadians(this.bottomLongLat.latitude))[1]), h = a.radiansToDegrees(d(a.degreesToRadians(this.leftLongLat.longitude), a.degreesToRadians(this.leftLongLat.latitude))[0]), i = a.radiansToDegrees(d(a.degreesToRadians(this.rightLongLat.longitude), a.degreesToRadians(this.rightLongLat.latitude))[0])), b = a.degreesToRadians(b / e * (i - h) + h), c = a.degreesToRadians(c / f * (k - j) + j), c = g(b, c), g = a.radiansToDegrees(c[0]), c = a.radiansToDegrees(c[1])
                } else g = this.coordinateToLongitude(b), c = this.coordinateToLatitude(c);
                return {
                    longitude: a.roundTo(g, 4),
                    latitude: a.roundTo(c, 4)
                }
            },
            coordinateToLatitude: function (b, c) {
                var d;
                if (void 0 === c && (c = this.mapHeight), this.mapSet) {
                    var e = this.dataProvider,
                        f = e.bottomLatitude;
                    d = e.topLatitude, "mercator" == e.projection ? (e = this.mercatorLatitudeToCoordinate(f), d = this.mercatorLatitudeToCoordinate(d), d = 2 * a.degreesToRadians(b * (e - d) / c + d), d = a.radiansToDegrees(2 * Math.atan(Math.exp(d)) - .5 * Math.PI)) : d = b / c * (f - d) + d
                }
                return Math.round(1e6 * d) / 1e6
            },
            coordinateToLongitude: function (a, b) {
                var c, d = this.dataProvider;
                return void 0 === b && (b = this.mapWidth), this.mapSet && (c = a / b * (d.rightLongitude - d.leftLongitude) + d.leftLongitude), Math.round(1e6 * c) / 1e6
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.ZoomControl = a.Class({
            construct: function (b) {
                this.cname = "ZoomControl", this.panStepSize = .1, this.zoomFactor = 2, this.maxZoomLevel = 64, this.minZoomLevel = 1, this.panControlEnabled = !1, this.zoomControlEnabled = !0, this.buttonRollOverColor = "#DADADA", this.buttonFillColor = "#FFFFFF", this.buttonFillAlpha = 1, this.buttonBorderColor = "#000000", this.buttonBorderAlpha = .1, this.buttonIconAlpha = this.buttonBorderThickness = 1, this.gridColor = this.buttonIconColor = "#000000", this.homeIconFile = "homeIcon.gif", this.gridBackgroundColor = "#000000", this.draggerAlpha = this.gridAlpha = this.gridBackgroundAlpha = 0, this.draggerSize = this.buttonSize = 31, this.iconSize = 11, this.homeButtonEnabled = !0, this.buttonCornerRadius = 2, this.gridHeight = 5, this.roundButtons = !0, this.top = this.left = 10, a.applyTheme(this, b, this.cname)
            },
            init: function (b, c) {
                var d = this;
                d.chart = b, a.remove(d.set);
                var e = c.set();
                a.setCN(b, e, "zoom-control");
                var f = d.buttonSize,
                    g = d.zoomControlEnabled,
                    h = d.panControlEnabled,
                    i = d.buttonFillColor,
                    j = d.buttonFillAlpha,
                    k = d.buttonBorderThickness,
                    l = d.buttonBorderColor,
                    m = d.buttonBorderAlpha,
                    n = d.buttonCornerRadius,
                    o = d.buttonRollOverColor,
                    p = d.gridHeight,
                    q = d.zoomFactor,
                    r = d.minZoomLevel,
                    s = d.maxZoomLevel,
                    t = d.buttonIconAlpha,
                    u = d.buttonIconColor,
                    v = d.roundButtons,
                    w = b.svgIcons,
                    x = b.getX(d.left),
                    y = b.getY(d.top);
                isNaN(d.right) || (x = b.getX(d.right, !0), x = h ? x - 3 * f : x - f), isNaN(d.bottom) || (y = b.getY(d.bottom, !0), g && (y -= p + 3 * f), y = h ? y - 3 * f : d.homeButtonEnabled ? y - .5 * f : y + f), e.translate(x, y), d.previousDY = NaN;
                var z, x = f / 4 - 1;
                if (g) {
                    z = c.set(), a.setCN(b, z, "zoom-control-zoom"), e.push(z), d.set = e, d.zoomSet = z, 5 < p && (g = a.rect(c, f + 6, p + 2 * f + 6, d.gridBackgroundColor, d.gridBackgroundAlpha, 0, "#000000", 0, 4), a.setCN(b, g, "zoom-bg"), g.translate(-3, -3), g.mouseup(function () {
                        d.handleBgUp()
                    }).touchend(function () {
                        d.handleBgUp()
                    }), z.push(g));
                    var A = f;
                    v && (A = f / 1.5), d.draggerSize = A;
                    var B = Math.log(s / r) / Math.log(q) + 1;
                    1e3 < B && (B = 1e3);
                    var C, g = p / B,
                        D = c.set();
                    for (D.translate((f - A) / 2 + 1, 1, NaN, !0), z.push(D), C = 1; C < B; C++) y = f + C * g, y = a.line(c, [1, A - 2], [y, y], d.gridColor, d.gridAlpha, 1), a.setCN(b, y, "zoom-grid"), D.push(y);
                    y = new a.SimpleButton, y.setDownHandler(d.draggerDown, d), y.setClickHandler(d.draggerUp, d), y.init(c, A, g, i, j, k, l, m, n, o), a.setCN(b, y.set, "zoom-dragger"), z.push(y.set), y.set.setAttr("opacity", d.draggerAlpha), d.dragger = y.set, d.previousY = NaN, y = new a.SimpleButton, w ? (A = c.set(), B = a.line(c, [-x, x], [0, 0], u, t, 1), C = a.line(c, [0, 0], [-x, x], u, t, 1), A.push(B), A.push(C), y.svgIcon = A) : y.setIcon(b.pathToImages + "plus.gif", d.iconSize), y.setClickHandler(b.zoomIn, b), y.init(c, f, f, i, j, k, l, m, n, o, t, u, v), a.setCN(b, y.set, "zoom-in"), z.push(y.set), y = new a.SimpleButton, w ? y.svgIcon = a.line(c, [-x, x], [0, 0], u, t, 1) : y.setIcon(b.pathToImages + "minus.gif", d.iconSize), y.setClickHandler(b.zoomOut, b), y.init(c, f, f, i, j, k, l, m, n, o, t, u, v), y.set.translate(0, p + f), a.setCN(b, y.set, "zoom-out"), z.push(y.set), p -= g, s = Math.log(s / 100) / Math.log(q), d.realStepSize = p / (s - Math.log(r / 100) / Math.log(q)), d.realGridHeight = p, d.stepMax = s
                }
                h && (h = c.set(), a.setCN(b, h, "zoom-control-pan"), e.push(h), z && z.translate(f, 4 * f), q = new a.SimpleButton, w ? q.svgIcon = a.line(c, [x / 5, x / 5 - x, x / 5], [-x, 0, x], u, t, 1) : q.setIcon(b.pathToImages + "panLeft.gif", d.iconSize), q.setClickHandler(b.moveLeft, b), q.init(c, f, f, i, j, k, l, m, n, o, t, u, v), q.set.translate(0, f), a.setCN(b, q.set, "pan-left"), h.push(q.set), q = new a.SimpleButton, w ? q.svgIcon = a.line(c, [-x / 5, x - x / 5, -x / 5], [-x, 0, x], u, t, 1) : q.setIcon(b.pathToImages + "panRight.gif", d.iconSize), q.setClickHandler(b.moveRight, b), q.init(c, f, f, i, j, k, l, m, n, o, t, u, v), q.set.translate(2 * f, f), a.setCN(b, q.set, "pan-right"), h.push(q.set), q = new a.SimpleButton, w ? q.svgIcon = a.line(c, [-x, 0, x], [x / 5, x / 5 - x, x / 5], u, t, 1) : q.setIcon(b.pathToImages + "panUp.gif", d.iconSize), q.setClickHandler(b.moveUp, b), q.init(c, f, f, i, j, k, l, m, n, o, t, u, v), q.set.translate(f, 0), a.setCN(b, q.set, "pan-up"), h.push(q.set), q = new a.SimpleButton, w ? q.svgIcon = a.line(c, [-x, 0, x], [-x / 5, x - x / 5, -x / 5], u, t, 1) : q.setIcon(b.pathToImages + "panDown.gif", d.iconSize), q.setClickHandler(b.moveDown, b), q.init(c, f, f, i, j, k, l, m, n, o, t, u, v), q.set.translate(f, 2 * f), a.setCN(b, q.set, "pan-down"), h.push(q.set), e.push(h)), d.homeButtonEnabled && (h = new a.SimpleButton, w ? h.svgIcon = a.polygon(c, [-x, 0, x, x - 1, x - 1, 2, 2, -2, -2, 1 - x, 1 - x], [0, -x, 0, 0, x - 1, x - 1, 2, 2, x - 1, x - 1, 0], u, t, 1, u, t) : h.setIcon(b.pathToImages + d.homeIconFile, d.iconSize), h.setClickHandler(b.goHome, b), d.panControlEnabled && (m = j = 0), h.init(c, f, f, i, j, k, l, m, n, o, t, u, v), d.panControlEnabled ? h.set.translate(f, f) : z && z.translate(0, 1.5 * f), a.setCN(b, h.set, "pan-home"), e.push(h.set)), d.update()
            },
            draggerDown: function () {
                this.chart.stopDrag(), this.isDragging = !0
            },
            draggerUp: function () {
                this.isDragging = !1
            },
            handleBgUp: function () {
                var a = this.chart;
                a.zoomTo(100 * Math.pow(this.zoomFactor, this.stepMax - (a.mouseY - this.zoomSet.y - this.set.y - this.buttonSize - this.realStepSize / 2) / this.realStepSize))
            },
            update: function () {
                var b;
                b = this.zoomFactor;
                var g, c = this.realStepSize,
                    d = this.stepMax,
                    e = this.dragger,
                    f = this.buttonSize,
                    h = this.chart;
                h && (this.isDragging ? (h.stopDrag(), g = e.y + (h.mouseY - this.previousY), g = a.fitToBounds(g, f, this.realGridHeight + f), h.zoomTo(100 * Math.pow(b, d - (g - f) / c), NaN, NaN, !0)) : (b = Math.log(h.zoomLevel() / 100) / Math.log(b), g = (d - b) * c + f), this.previousY = h.mouseY, this.previousDY != g && e && (e.translate((this.buttonSize - this.draggerSize) / 2, g), this.previousDY = g))
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.SimpleButton = a.Class({
            construct: function () { },
            init: function (b, c, d, e, f, g, h, i, j, k, l, m, n) {
                var o = this;
                o.rollOverColor = k, o.color = e, o.container = b, k = b.set(), o.set = k, n ? (c /= 2, e = a.circle(b, c, e, f, g, h, i), e.translate(c, c)) : e = a.rect(b, c, d, e, f, g, h, i, j), k.push(e), f = o.iconPath;
                var p;
                f && (p = o.iconSize, g = (c - p) / 2, n && (g = (2 * c - p) / 2), p = b.image(f, g, (d - p) / 2, p, p)), o.svgIcon && (p = o.svgIcon, n ? p.translate(c, c) : p.translate(c / 2, c / 2)), k.setAttr("cursor", "pointer"), p && (k.push(p), p.setAttr("opacity", l), p.node.style.pointerEvents = "none"), e.mousedown(function () {
                    o.handleDown()
                }).touchstart(function () {
                    o.handleDown()
                }).mouseup(function () {
                    o.handleUp()
                }).touchend(function () {
                    o.handleUp()
                }).mouseover(function () {
                    o.handleOver()
                }).mouseout(function () {
                    o.handleOut()
                }), o.bg = e
            },
            setIcon: function (a, b) {
                this.iconPath = a, this.iconSize = b
            },
            setClickHandler: function (a, b) {
                this.clickHandler = a, this.scope = b
            },
            setDownHandler: function (a, b) {
                this.downHandler = a, this.scope = b
            },
            handleUp: function () {
                var a = this.clickHandler;
                a && a.call(this.scope)
            },
            handleDown: function () {
                var a = this.downHandler;
                a && a.call(this.scope)
            },
            handleOver: function () {
                this.container.chart.skipClick = !0, this.bg.setAttr("fill", this.rollOverColor)
            },
            handleOut: function () {
                this.container.chart.skipClick = !1, this.bg.setAttr("fill", this.color)
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.SmallMap = a.Class({
            construct: function (b) {
                this.cname = "SmallMap", this.mapColor = "#e6e6e6", this.rectangleColor = "#FFFFFF", this.top = this.right = 10, this.minimizeButtonWidth = 23, this.backgroundColor = "#9A9A9A", this.backgroundAlpha = 1, this.borderColor = "#FFFFFF", this.iconColor = "#000000", this.borderThickness = 3, this.borderAlpha = 1, this.size = .2, this.enabled = !0, a.applyTheme(this, b, this.cname)
            },
            init: function (b, c) {
                var d = this;
                if (d.enabled) {
                    d.chart = b, d.container = c, d.width = b.realWidth * d.size, d.height = b.realHeight * d.size, a.remove(d.mapSet), a.remove(d.allSet), a.remove(d.set);
                    var e = c.set();
                    d.set = e, a.setCN(b, e, "small-map");
                    var f = c.set();
                    d.allSet = f, e.push(f), d.buildSVGMap();
                    var g = d.borderThickness,
                        h = d.borderColor,
                        i = a.rect(c, d.width + g, d.height + g, d.backgroundColor, d.backgroundAlpha, g, h, d.borderAlpha);
                    a.setCN(b, i, "small-map-bg"), i.translate(-g / 2, -g / 2), f.push(i), i.toBack();
                    var j, k, i = d.minimizeButtonWidth,
                        l = new a.SimpleButton,
                        m = i / 2;
                    b.svgIcons ? l.svgIcon = a.line(c, [-m / 2, 0, m / 2], [-m / 4, m / 4, -m / 4], d.iconColor, 1, 1) : l.setIcon(b.pathToImages + "arrowDown.gif", i), l.setClickHandler(d.minimize, d), l.init(c, i, i, h, 1, 1, h, 1), a.setCN(b, l.set, "small-map-down"), l = l.set, d.downButtonSet = l, e.push(l);
                    var n = new a.SimpleButton;
                    b.svgIcons ? n.svgIcon = a.line(c, [-m / 2, 0, m / 2], [m / 4, -m / 4, m / 4], d.iconColor, 1, 1) : n.setIcon(b.pathToImages + "arrowUp.gif", i), n.setClickHandler(d.maximize, d), n.init(c, i, i, h, 1, 1, h, 1), a.setCN(b, n.set, "small-map-up"), h = n.set, d.upButtonSet = h, h.hide(), e.push(h);
                    var o, p;
                    isNaN(d.top) || (j = b.getY(d.top) + g, p = 0), isNaN(d.bottom) || (j = b.getY(d.bottom, !0) - d.height - g, p = d.height - i + g / 2), isNaN(d.left) || (k = b.getX(d.left) + g, o = -g / 2), isNaN(d.right) || (k = b.getX(d.right, !0) - d.width - g, o = d.width - i + g / 2), g = c.set(), g.clipRect(1, 1, d.width, d.height), f.push(g), d.rectangleC = g, e.translate(k, j), l.translate(o, p), h.translate(o, p), f.mouseup(function () {
                        d.handleMouseUp()
                    }), d.drawRectangle()
                } else a.remove(d.allSet), a.remove(d.downButtonSet), a.remove(d.upButtonSet)
            },
            minimize: function () {
                this.downButtonSet.hide(), this.upButtonSet.show(), this.allSet.hide()
            },
            maximize: function () {
                this.downButtonSet.show(), this.upButtonSet.hide(), this.allSet.show()
            },
            buildSVGMap: function () {
                var b = this.chart,
                    c = {
                        fill: this.mapColor,
                        stroke: this.mapColor,
                        "stroke-opacity": 1
                    },
                    d = this.container,
                    e = d.set();
                a.setCN(b, e, "small-map-image");
                var f;
                for (f = 0; f < b.svgAreas.length; f++) {
                    var g = d.path(b.svgAreas[f].path).attr(c);
                    e.push(g)
                }
                this.allSet.push(e), c = e.getBBox(), d = this.size * b.mapScale, f = -c.x * d;
                var g = -c.y * d,
                    h = 0,
                    i = 0;
                b.centerMap && (h = (this.width - c.width * d) / 2, i = (this.height - c.height * d) / 2), this.mapWidth = c.width * d, this.mapHeight = c.height * d, f += h, g += i, this.dx = h, this.dy = i, e.translate(f, g, d), this.mapSet = e, this.mapX = f, this.mapY = g
            },
            update: function () {
                var a = this.chart;
                if (a) {
                    var b = a.zoomLevel(),
                        c = this.width,
                        d = this.height,
                        e = c / (a.realWidth * b),
                        f = a.mapContainer.getBBox(),
                        c = c / b,
                        d = d / b,
                        g = this.rectangle;
                    g.translate(-(a.mapContainer.x + f.x * b) * e + this.dx, -(a.mapContainer.y + f.y * b) * e + this.dy), 0 < c && 0 < d && (g.setAttr("width", Math.ceil(c + 1)), g.setAttr("height", Math.ceil(d + 1))), this.rWidth = c, this.rHeight = d
                }
            },
            drawRectangle: function () {
                var b = this.rectangle;
                a.remove(b), b = a.rect(this.container, 10, 10, "#000", 0, 1, this.rectangleColor, 1), a.setCN(this.chart, b, "small-map-rectangle"), this.rectangleC.push(b), this.rectangle = b
            },
            handleMouseUp: function () {
                var a = this.chart,
                    b = a.zoomLevel();
                a.zoomToMapXY(b, (a.mouseX - this.set.x - this.mapX) / this.size + a.diffX * a.mapScale, (a.mouseY - this.set.y - this.mapY) / this.size + a.diffY * a.mapScale)
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.AreasProcessor = a.Class({
            construct: function (a) {
                this.chart = a
            },
            process: function (a) {
                this.updateAllAreas(), this.allObjects = [], a = a.areas;
                var b = this.chart;
                b.outlines = [];
                var d, e, c = a.length,
                    f = 0,
                    g = !1,
                    h = !1,
                    i = 0;
                for (d = 0; d < c; d++) e = a[d], e = e.value, isNaN(e) || ((!1 === g || g < e) && (g = e), (!1 === h || h > e) && (h = e), f += Math.abs(e), i++);
                for (this.minValue = h, this.maxValue = g, isNaN(b.minValue) || (this.minValue = b.minValue), isNaN(b.maxValue) || (this.maxValue = b.maxValue), b.maxValueReal = g, b.minValueReal = h, d = 0; d < c; d++) e = a[d], isNaN(e.value) ? e.percents = void 0 : (e.percents = (e.value - h) / f * 100, h == g && (e.percents = 100));
                for (d = 0; d < c; d++) e = a[d], this.createArea(e);
                b.outlinesToFront()
            },
            updateAllAreas: function () {
                var l, b = this.chart,
                    c = b.areasSettings,
                    d = c.unlistedAreasColor,
                    e = c.unlistedAreasAlpha,
                    f = c.unlistedAreasOutlineColor,
                    g = c.unlistedAreasOutlineAlpha,
                    h = b.svgAreas,
                    i = b.dataProvider,
                    j = i.areas,
                    k = {};
                for (l = 0; l < j.length; l++) k[j[l].id] = j[l];
                for (l = 0; l < h.length; l++) {
                    if (j = h[l], c.preserveOriginalAttributes) {
                        if (j.customAttr)
                            for (var m in j.customAttr) j.setAttr(m, j.customAttr[m])
                    } else {
                        void 0 != d && j.setAttr("fill", d), isNaN(e) || j.setAttr("fill-opacity", e), void 0 != f && j.setAttr("stroke", f), isNaN(g) || j.setAttr("stroke-opacity", g);
                        var n = c.outlineThickness;
                        c.adjustOutlineThickness && (n = n / b.zoomLevel() / b.mapScale), j.setAttr("stroke-width", n)
                    }
                    a.setCN(b, j, "map-area-unlisted"), i.getAreasFromMap && !k[j.id] && (n = new a.MapArea(b.theme), n.parentObject = i, n.id = j.id, n.outline = j.outline, i.areas.push(n))
                }
            },
            createArea: function (b) {
                var c = this.chart,
                    d = c.svgAreasById[b.id],
                    e = c.areasSettings;
                if (d && d.className) {
                    var f = c.areasClasses[d.className];
                    f && (e = a.processObject(f, a.AreasSettings, c.theme))
                }
                var g = e.color,
                    h = e.alpha,
                    i = e.outlineThickness,
                    j = e.rollOverColor,
                    k = e.selectedColor,
                    l = e.rollOverAlpha,
                    m = e.rollOverBrightness,
                    n = e.outlineColor,
                    o = e.outlineAlpha,
                    p = e.balloonText,
                    q = e.selectable,
                    r = e.pattern,
                    s = e.rollOverOutlineColor,
                    t = e.bringForwardOnHover,
                    u = e.preserveOriginalAttributes;
                this.allObjects.push(b), b.chart = c, b.baseSettings = e, b.autoZoomReal = void 0 == b.autoZoom ? e.autoZoom : b.autoZoom, void 0 == (f = b.color) && (f = g);
                var v = b.alpha;
                if (isNaN(v) && (v = h), h = b.rollOverAlpha, isNaN(h) && (h = l), isNaN(h) && (h = v), l = b.rollOverColor, void 0 == l && (l = j), j = b.pattern, void 0 == j && (j = r), r = b.selectedColor, void 0 == r && (r = k), k = b.balloonText, void 0 === k && (k = p), void 0 == e.colorSolid || isNaN(b.value) || (p = Math.floor((b.value - this.minValue) / ((this.maxValue - this.minValue) / c.colorSteps)), p == c.colorSteps && p-- , p *= 1 / (c.colorSteps - 1), this.maxValue == this.minValue && (p = 1), b.colorReal = a.getColorFade(f, e.colorSolid, p)), void 0 != b.color && (b.colorReal = b.color), void 0 == b.selectable && (b.selectable = q), void 0 == b.colorReal && (b.colorReal = g), g = b.outlineColor, void 0 == g && (g = n), n = b.outlineAlpha, isNaN(n) && (n = o), o = b.outlineThickness, isNaN(o) && (o = i), i = b.rollOverOutlineColor, void 0 == i && (i = s), s = b.rollOverBrightness, void 0 == s && (s = m), void 0 == b.bringForwardOnHover && (b.bringForwardOnHover = t), void 0 == b.preserveOriginalAttributes && (b.preserveOriginalAttributes = u), isNaN(e.selectedBrightness) || (r = a.adjustLuminosity(b.colorReal, e.selectedBrightness / 100)), b.alphaReal = v, b.rollOverColorReal = l, b.rollOverAlphaReal = h, b.balloonTextReal = k, b.selectedColorReal = r, b.outlineColorReal = g, b.outlineAlphaReal = n, b.rollOverOutlineColorReal = i, b.outlineThicknessReal = o, b.patternReal = j, b.rollOverBrightnessReal = s, b.accessibleLabel || (b.accessibleLabel = e.accessibleLabel), a.processDescriptionWindow(e, b), d && (m = d.area, t = d.title, b.enTitle = d.title, t && !b.title && (b.title = t), (d = c.language) ? (t = a.mapTranslations) && (d = t[d]) && d[b.enTitle] && (b.titleTr = d[b.enTitle]) : b.titleTr = void 0, m)) {
                    d = b.tabIndex, void 0 === d && (d = e.tabIndex), void 0 !== d && m.setAttr("tabindex", d), b.displayObject = m, b.outline && (v = 0, b.alphaReal = 0, b.rollOverAlphaReal = 0, b.mouseEnabled = !1, c.outlines.push(m), m.node.setAttribute("pointer-events", "none")), b.mouseEnabled && c.addObjectEventListeners(m, b);
                    var w;
                    void 0 != f && (w = f), void 0 != b.colorReal && (w = b.showAsSelected || c.selectedObject == b ? b.selectedColorReal : b.colorReal), m.node.setAttribute("class", ""), a.setCN(c, m, "map-area"), a.setCN(c, m, "map-area-" + m.id), e.adjustOutlineThickness && (o = o / c.zoomLevel() / c.mapScale), b.preserveOriginalAttributes || (m.setAttr("fill", w), m.setAttr("stroke", g), m.setAttr("stroke-opacity", n), m.setAttr("stroke-width", o), m.setAttr("fill-opacity", v)), c.makeObjectAccessible(b), j && m.pattern(j, c.mapScale, c.path), b.hidden && m.hide()
                }
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.AreasSettings = a.Class({
            construct: function (b) {
                this.cname = "AreasSettings", this.alpha = 1, this.autoZoom = !1, this.balloonText = "[[title]]", this.color = "#FFCC00", this.colorSolid = "#990000", this.unlistedAreasAlpha = 1, this.unlistedAreasColor = "#DDDDDD", this.outlineColor = "#FFFFFF", this.outlineThickness = this.outlineAlpha = 1, this.selectedColor = this.rollOverOutlineColor = "#CC0000", this.unlistedAreasOutlineColor = "#FFFFFF", this.unlistedAreasOutlineAlpha = 1, this.descriptionWindowWidth = 250, this.bringForwardOnHover = this.adjustOutlineThickness = !0, this.accessibleLabel = "[[title]] [[value]] [[description]]", a.applyTheme(this, b, this.cname)
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.ImagesProcessor = a.Class({
            construct: function (a) {
                this.chart = a, this.reset()
            },
            process: function (a) {
                var c, b = a.images;
                for (c = 0; c < b.length; c++) {
                    var d = b[c];
                    this.createImage(d, c), d.parentArray = b
                }
                this.counter = c, a.parentObject && a.remainVisible && this.process(a.parentObject)
            },
            createImage: function (b, c) {
                b = a.processObject(b, a.MapImage), isNaN(c) && (this.counter++ , c = this.counter);
                var d = this.chart,
                    e = d.container,
                    f = d.mapImagesContainer,
                    g = d.stageImagesContainer,
                    h = d.imagesSettings;
                b.remove && b.remove();
                var i = h.color,
                    j = h.alpha,
                    k = h.rollOverColor,
                    l = h.rollOverOutlineColor,
                    m = h.selectedColor,
                    n = h.balloonText,
                    o = h.outlineColor,
                    p = h.outlineAlpha,
                    q = h.outlineThickness,
                    r = h.selectedScale,
                    s = h.rollOverScale,
                    t = h.selectable,
                    u = h.labelPosition,
                    v = h.labelColor,
                    w = h.labelFontSize,
                    x = h.bringForwardOnHover,
                    y = h.labelRollOverColor,
                    z = h.rollOverBrightness,
                    A = h.selectedLabelColor;
                b.index = c, b.chart = d, b.baseSettings = d.imagesSettings;
                var B = e.set();
                b.displayObject = B;
                var C = b.color;
                void 0 == C && (C = i), i = b.alpha, isNaN(i) && (i = j), void 0 == b.bringForwardOnHover && (b.bringForwardOnHover = x), j = b.outlineAlpha, isNaN(j) && (j = p), p = b.rollOverColor, void 0 == p && (p = k), k = b.selectedColor, void 0 == k && (k = m), m = b.balloonText, void 0 === m && (m = n), n = b.outlineColor, void 0 == n && (n = o), b.outlineColorReal = n, o = b.outlineThickness, isNaN(o) && (o = q), (q = b.labelPosition) || (q = u), u = b.labelColor, void 0 == u && (u = v), v = b.labelRollOverColor, void 0 == v && (v = y), y = b.selectedLabelColor, void 0 == y && (y = A), A = b.labelFontSize, isNaN(A) && (A = w), w = b.selectedScale, isNaN(w) && (w = r), r = b.rollOverScale, isNaN(r) && (r = s), s = b.rollOverBrightness, void 0 == s && (s = z), void 0 == b.selectable && (b.selectable = t), b.colorReal = C, isNaN(h.selectedBrightness) || (k = a.adjustLuminosity(b.colorReal, h.selectedBrightness / 100)), b.alphaReal = i, b.rollOverColorReal = p, b.balloonTextReal = m, b.selectedColorReal = k, b.labelColorReal = u, b.labelRollOverColorReal = v, b.selectedLabelColorReal = y, b.labelFontSizeReal = A, b.labelPositionReal = q, b.selectedScaleReal = w, b.rollOverScaleReal = r, b.rollOverOutlineColorReal = l, b.rollOverBrightnessReal = s, b.accessibleLabel || (b.accessibleLabel = h.accessibleLabel), a.processDescriptionWindow(h, b), b.centeredReal = void 0 == b.centered ? h.centered : b.centered, l = b.type, s = b.imageURL, r = b.svgPath, w = b.width, A = b.height, t = b.scale, isNaN(b.percentWidth) || (w = b.percentWidth / 100 * d.realWidth), isNaN(b.percentHeight) || (A = b.percentHeight / 100 * d.realHeight);
                var D;
                return s || l || r || (l = "circle", w = 1, j = i = 0), p = z = 0, h = b.selectedColorReal, l ? (isNaN(w) && (w = 10), isNaN(A) && (A = 10), "kilometers" == b.widthAndHeightUnits && (w = d.kilometersToPixels(b.width), A = d.kilometersToPixels(b.height)), "miles" == b.widthAndHeightUnits && (w = d.milesToPixels(b.width), A = d.milesToPixels(b.height)), "circle" != l && "bubble" != l || (A = w), D = this.createPredefinedImage(C, n, o, l, w, A), p = z = 0, b.centeredReal ? (isNaN(b.right) || (z = w * t), isNaN(b.bottom) || (p = A * t)) : (z = w * t / 2, p = A * t / 2), D.translate(z, p, t, !0)) : s ? (isNaN(w) && (w = 10), isNaN(A) && (A = 10), D = e.image(s, 0, 0, w, A), D.node.setAttribute("preserveAspectRatio", "none"), D.setAttr("opacity", i), b.centeredReal && (z = isNaN(b.right) ? -w / 2 : w / 2, p = isNaN(b.bottom) ? -A / 2 : A / 2, D.translate(z, p, NaN, !0))) : r && (D = e.path(r), s = D.getBBox(), b.centeredReal ? (z = -s.x * t - s.width * t / 2, isNaN(b.right) || (z = -z), p = -s.y * t - s.height * t / 2, isNaN(b.bottom) || (p = -p)) : z = p = 0, D.translate(z, p, t, !0), D.x = z, D.y = p), D && (B.push(D), b.image = D, D.setAttr("stroke-opacity", j), D.setAttr("stroke-width", o), D.setAttr("stroke", n), D.setAttr("fill-opacity", i), "bubble" != l && D.setAttr("fill", C), a.setCN(d, D, "map-image"), void 0 != b.id && a.setCN(d, D, "map-image-" + b.id)), C = b.labelColorReal, !b.showAsSelected && d.selectedObject != b || void 0 == h || (D.setAttr("fill", h), C = b.selectedLabelColorReal), D = null, void 0 !== b.label && (D = a.text(e, b.label, C, d.fontFamily, b.labelFontSizeReal, b.labelAlign), a.setCN(d, D, "map-image-label"), void 0 !== b.id && a.setCN(d, D, "map-image-label-" + b.id), C = b.labelBackgroundAlpha, (i = b.labelBackgroundColor) && 0 < C && (j = D.getBBox(), e = a.rect(e, j.width + 16, j.height + 10, i, C), a.setCN(d, e, "map-image-label-background"), void 0 != b.id && a.setCN(d, e, "map-image-label-background-" + b.id), B.push(e), b.labelBG = e), b.imageLabel = D, B.push(D), a.setCN(d, B, "map-image-container"), void 0 != b.id && a.setCN(d, B, "map-image-container-" + b.id)), e = !(!isNaN(b.latitude) && !isNaN(b.longitude)), b.lineId && (D = this.chart.getObjectById(b.lineId)) && 0 < D.longitudes.length && (e = !1), e ? g.push(B) : f.push(B), B && (B.rotation = b.rotation, isNaN(b.rotation) || B.rotate(b.rotation)), this.updateSizeAndPosition(b), b.mouseEnabled && d.addObjectEventListeners(B, b), b.hidden && B.hide(), b.animateAlongLine && setTimeout(function () {
                    b.animateAlong.call(b)
                }, 100), b
            },
            updateSizeAndPosition: function (b) {
                var g, c = this.chart,
                    d = b.displayObject,
                    e = c.getX(b.left),
                    f = c.getY(b.top),
                    h = b.image.getBBox();
                isNaN(b.right) || (e = c.getX(b.right, !0) - h.width * b.scale), isNaN(b.bottom) || (f = c.getY(b.bottom, !0) - h.height * b.scale);
                var i = b.longitude,
                    j = b.latitude,
                    k = b.positionOnLine,
                    h = this.objectsToResize;
                this.allSvgObjects.push(d), this.allObjects.push(b), b.arrays.push({
                    arr: this.allSvgObjects,
                    el: d
                }), b.arrays.push({
                    arr: this.allObjects,
                    el: b
                });
                var n, o, l = b.imageLabel,
                    m = this.chart.zoomLevel();
                b.lineId && (b.line = this.chart.getObjectById(b.lineId)), c.makeObjectAccessible(b);
                var p = b.tabIndex;
                void 0 === p && (p = c.imagesSettings.tabIndex), void 0 !== p && d.setAttr("tabindex", p), b.line && b.line.getCoordinates && (b.line.chart = c, p = b.line.getCoordinates(k, b.lineSegment)) && (i = c.coordinateToLongitude(p.x), j = c.coordinateToLatitude(p.y), n = p.x, o = p.y, b.animateAngle && (g = a.radiansToDegrees(p.angle))), isNaN(g) || d.rotate(g + b.extraAngle), isNaN(e) || isNaN(f) ? isNaN(j) || isNaN(i) || (f = c.coordinatesToXY(i, j), e = f.x, f = f.y, isNaN(n) || (e = n), isNaN(o) || (f = o), b.fixedSize ? (n = b.positionScale, isNaN(n) ? n = 0 : (--n, n *= 1 - 2 * Math.abs(k - .5)), k = {
                    image: d,
                    scale: 1 + n,
                    mapImage: b
                }, h.push(k), b.arrays.push({
                    arr: h,
                    el: k
                }), d.translate(e, f, 1 / m + n, !0)) : (d.translate(e, f, NaN, !0), l && (this.labelsToReposition.push(b), b.arrays.push({
                    arr: this.labelsToReposition,
                    el: b
                })))) : d.translate(e, f, NaN, !0), this.positionLabel(l, b, b.labelPositionReal)
            },
            positionLabel: function (a, b, c) {
                if (a) {
                    var d = b.image,
                        e = 0,
                        f = 0,
                        g = 0,
                        h = 0;
                    d && (h = d.getBBox(), f = d.y + h.y, e = d.x + h.x, g = h.width, h = h.height, b.svgPath && (g *= b.scale, h *= b.scale));
                    var d = a.getBBox(),
                        i = d.width,
                        j = d.height;
                    "right" == c && (e += g + i / 2 + 5, f += h / 2 - 2), "left" == c && (e += -i / 2 - 5, f += h / 2 - 2), "top" == c && (f -= j / 2 + 3, e += g / 2), "bottom" == c && (f += h + j / 2, e += g / 2), "middle" == c && (e += g / 2, f += h / 2), a.translate(e + b.labelShiftX, f + b.labelShiftY, NaN, !0), a = b.labelFontSizeReal, b.labelBG && b.labelBG.translate(e - d.width / 2 + b.labelShiftX - 9, f - a / 2 + b.labelShiftY - 4, NaN, !0)
                }
            },
            createPredefinedImage: function (b, c, d, e, f, g) {
                var i, h = this.chart.container;
                switch (e) {
                    case "circle":
                        i = a.circle(h, f / 2, b, 1, d, c, 1);
                        break;
                    case "rectangle":
                        i = a.polygon(h, [-f / 2, f / 2, f / 2, -f / 2], [g / 2, g / 2, -g / 2, -g / 2], b, 1, d, c, 1, 0, !0);
                        break;
                    case "bubble":
                        i = a.circle(h, f / 2, b, 1, d, c, 1, !0);
                        break;
                    case "hexagon":
                        f /= Math.sqrt(3), i = a.polygon(h, [.866 * f, 0 * f, -.866 * f, -.866 * f, 0 * f, .866 * f], [.5 * f, 1 * f, .5 * f, -.5 * f, -1 * f, -.5 * f], b, 1, d, c, 1)
                }
                return i
            },
            reset: function () {
                this.objectsToResize = [], this.allSvgObjects = [], this.allObjects = [], this.allLabels = [], this.labelsToReposition = []
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.ImagesSettings = a.Class({
            construct: function (b) {
                this.cname = "ImagesSettings", this.balloonText = "[[title]]", this.alpha = 1, this.borderAlpha = 0, this.borderThickness = 1, this.labelPosition = "right", this.labelColor = "#000000", this.labelFontSize = 11, this.color = "#000000", this.labelRollOverColor = "#00CC00", this.centered = !0, this.rollOverScale = this.selectedScale = 1, this.descriptionWindowWidth = 250, this.bringForwardOnHover = !0, this.outlineColor = "transparent", this.adjustAnimationSpeed = !1, this.baseAnimationDistance = 500, this.pauseDuration = 0, this.easingFunction = a.easeInOutQuad, this.animationDuration = 3, this.positionScale = 1, this.accessibleLabel = "[[title]] [[description]]", a.applyTheme(this, b, this.cname)
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.LinesProcessor = a.Class({
            construct: function (a) {
                this.chart = a, this.reset()
            },
            process: function (a) {
                var c, b = a.lines;
                for (c = 0; c < b.length; c++) {
                    var d = b[c];
                    this.createLine(d, c), d.parentArray = b
                }
                this.counter = c, a.parentObject && a.remainVisible && this.process(a.parentObject)
            },
            createLine: function (b, c) {
                b = a.processObject(b, a.MapLine), isNaN(c) && (this.counter++ , c = this.counter), b.index = c, b.remove && b.remove();
                var d = this.chart,
                    e = d.linesSettings,
                    f = this.objectsToResize,
                    g = d.mapLinesContainer,
                    h = d.stageLinesContainer,
                    i = e.thickness,
                    j = e.dashLength,
                    k = e.arrow,
                    l = e.arrowSize,
                    m = e.arrowColor,
                    n = e.arrowAlpha,
                    o = e.color,
                    p = e.alpha,
                    q = e.rollOverColor,
                    r = e.selectedColor,
                    s = e.rollOverAlpha,
                    t = e.balloonText,
                    u = e.bringForwardOnHover,
                    v = e.arc,
                    w = e.rollOverBrightness,
                    x = d.container;
                b.chart = d, b.baseSettings = e;
                var y = x.set();
                b.displayObject = y;
                var z = b.tabIndex;
                if (void 0 === z && (z = e.tabIndex), void 0 !== z && y.setAttr("tabindex", z), this.allSvgObjects.push(y), b.arrays.push({
                    arr: this.allSvgObjects,
                    el: y
                }), this.allObjects.push(b), b.arrays.push({
                    arr: this.allObjects,
                    el: b
                }), b.mouseEnabled && d.addObjectEventListeners(y, b), b.remainVisible || d.selectedObject == b.parentObject) {
                    if (z = b.thickness, isNaN(z) && (z = i), i = b.dashLength, isNaN(i) && (i = j), j = b.color, void 0 == j && (j = o), o = b.alpha, isNaN(o) && (o = p), p = b.rollOverAlpha, isNaN(p) && (p = s), isNaN(p) && (p = o), s = b.rollOverColor, void 0 == s && (s = q), q = b.selectedColor, void 0 == q && (q = r), r = b.balloonText, void 0 === r && (r = t), t = b.arc, isNaN(t) && (t = v), v = b.arrow, (!v || "none" == v && "none" != k) && (v = k), k = b.arrowColor, void 0 == k && (k = m), void 0 == k && (k = j), m = b.arrowAlpha, isNaN(m) && (m = n), isNaN(m) && (m = o), n = b.arrowSize, isNaN(n) && (n = l), l = b.rollOverBrightness, void 0 == l && (l = w), b.colorReal = j, b.arrowColor = k, isNaN(e.selectedBrightness) || (q = a.adjustLuminosity(b.colorReal, e.selectedBrightness / 100)), b.alphaReal = o, b.rollOverColorReal = s, b.rollOverAlphaReal = p, b.balloonTextReal = r, b.selectedColorReal = q, b.thicknessReal = z, b.rollOverBrightnessReal = l, b.accessibleLabel || (b.accessibleLabel = e.accessibleLabel), void 0 === b.shiftArrow && (b.shiftArrow = e.shiftArrow), void 0 == b.bringForwardOnHover && (b.bringForwardOnHover = u), a.processDescriptionWindow(e, b), u = this.processCoordinates(b.x, d.realWidth), w = this.processCoordinates(b.y, d.realHeight), l = b.longitudes, e = b.latitudes, 0 < (p = l.length))
                        for (u = [], w = [], s = 0; s < p; s++) r = d.coordinatesToXY(l[s], e[s]), u.push(r.x), w.push(r.y);
                    if (0 < u.length) {
                        b.segments = u.length, a.dx = 0, a.dy = 0;
                        var A, B, C, p = 10 * (1 - Math.abs(t));
                        if (10 <= p && (p = NaN), 1 > p && (p = 1), b.arcRadius = [], b.distances = [], l = d.mapContainer.scale, isNaN(p)) {
                            for (p = 0; p < u.length - 1; p++) B = Math.sqrt(Math.pow(u[p + 1] - u[p], 2) + Math.pow(w[p + 1] - w[p], 2)), b.distances[p] = B;
                            p = a.line(x, u, w, j, 1, z / l, i, !1, !1, !0), j = a.line(x, u, w, j, .001, 5 / l, i, !1, !1, !0), p.setAttr("stroke-linecap", "round")
                        } else {
                            s = 1, 0 > t && (s = 0), r = {
                                fill: "none",
                                stroke: j,
                                "stroke-opacity": 1,
                                "stroke-width": z / l,
                                "fill-opacity": 0,
                                "stroke-linecap": "round"
                            }, void 0 !== i && 0 < i && (r["stroke-dasharray"] = i);
                            for (var i = "", D = 0; D < u.length - 1; D++) {
                                var E = u[D],
                                    F = u[D + 1],
                                    G = w[D],
                                    H = w[D + 1];
                                if (B = Math.sqrt(Math.pow(F - E, 2) + Math.pow(H - G, 2)), C = B / 2 * p, A = 270 + 180 * Math.acos(B / 2 / C) / Math.PI, isNaN(A) && (A = 270), E < F) {
                                    var I = E,
                                        E = F,
                                        F = I,
                                        I = G,
                                        G = H,
                                        H = I;
                                    A = -A
                                }
                                0 < t && (A = -A), i += "M" + E + "," + G + "A" + C + "," + C + ",0,0," + s + "," + F + "," + H, b.arcRadius[D] = C, b.distances[D] = B
                            }
                            p = x.path(i).attr(r), j = x.path(i).attr({
                                "fill-opacity": 0,
                                stroke: j,
                                "stroke-width": 5 / l,
                                "stroke-opacity": .001,
                                fill: "none"
                            })
                        }
                        if (a.setCN(d, p, "map-line"), void 0 != b.id && a.setCN(d, p, "map-line-" + b.id), a.dx = .5, a.dy = .5, y.push(p), y.push(j), p.setAttr("opacity", o), "none" != v) {
                            var J, K, L;
                            "end" != v && "both" != v || (s = u[u.length - 1], D = w[w.length - 1], 1 < u.length ? (r = u[u.length - 2], J = w[w.length - 2]) : (r = s, J = D), J = 180 * Math.atan((D - J) / (s - r)) / Math.PI, isNaN(A) || (J += A), K = s, L = D, J = 0 > s - r ? J - 90 : J + 90), o = [-n / 2 - .5, -.5, n / 2 - .5], i = [n, -.5, n], b.shiftArrow && "middle" != v && (i = [0, 1.2 * -n, 0]), "both" == v && (n = a.polygon(x, o, i, k, m, 1, k, m, void 0, !0), y.push(n), n.translate(K, L, 1 / l, !0), isNaN(J) || n.rotate(J), a.setCN(d, p, "map-line-arrow"), void 0 != b.id && a.setCN(d, p, "map-line-arrow-" + b.id), b.fixedSize && f.push(n)), "start" != v && "both" != v || (n = u[0], L = w[0], 1 < u.length ? (s = u[1], K = w[1]) : (s = n, K = L), J = 180 * Math.atan((L - K) / (n - s)) / Math.PI, isNaN(A) || (J -= A), K = n, J = 0 > n - s ? J - 90 : J + 90), "middle" == v && (s = u[u.length - 1], D = w[w.length - 1], 1 < u.length ? (r = u[u.length - 2], J = w[w.length - 2]) : (r = s, J = D), K = r + (s - r) / 2, L = J + (D - J) / 2, J = 180 * Math.atan((D - J) / (s - r)) / Math.PI, isNaN(A) || (A = B / 2, C -= Math.sqrt(C * C - A * A), 0 > t && (C = -C), A = Math.sin(J / 180 * Math.PI), -1 == A && (A = 1), K -= A * C, L += Math.cos(J / 180 * Math.PI) * C), J = 0 > s - r ? J - 90 : J + 90), n = a.polygon(x, o, i, k, m, 1, k, m, void 0, !0), a.setCN(d, p, "map-line-arrow"), void 0 != b.id && a.setCN(d, p, "map-line-arrow-" + b.id), y.push(n), n.translate(K, L, 1 / l, !0), isNaN(J) || n.rotate(J), b.fixedSize && (f.push(n), b.arrays.push({
                                arr: f,
                                el: n
                            })), b.arrowSvg = n
                        }
                        b.fixedSize && p && (f = {
                            line: p,
                            thickness: z
                        }, this.linesToResize.push(f), b.arrays.push({
                            arr: this.linesToResize,
                            el: f
                        }), f = {
                            line: j,
                            thickness: 5
                        }, this.linesToResize.push(f), b.arrays.push({
                            arr: this.linesToResize,
                            el: f
                        })), b.lineSvg = p, b.showAsSelected && !isNaN(q) && p.setAttr("stroke", q), 0 < e.length ? g.push(y) : h.push(y), b.hidden && y.hide(), d.makeObjectAccessible(b)
                    }
                }
            },
            processCoordinates: function (a, b) {
                var d, c = [];
                for (d = 0; d < a.length; d++) {
                    var e = a[d],
                        f = Number(e);
                    isNaN(f) && (f = Number(e.replace("%", "")) * b / 100), isNaN(f) || c.push(f)
                }
                return c
            },
            reset: function () {
                this.objectsToResize = [], this.allSvgObjects = [], this.allObjects = [], this.linesToResize = []
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.LinesSettings = a.Class({
            construct: function (b) {
                this.cname = "LinesSettings", this.balloonText = "[[title]]", this.thickness = 1, this.dashLength = 0, this.arrowSize = 10, this.arrowAlpha = 1, this.arrow = "none", this.color = "#990000", this.descriptionWindowWidth = 250, this.bringForwardOnHover = !0, a.applyTheme(this, b, this.cname)
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.MapObject = a.Class({
            construct: function (b) {
                this.fixedSize = this.mouseEnabled = !0, this.images = [], this.lines = [], this.areas = [], this.remainVisible = !0, this.passZoomValuesToTarget = !1, this.objectType = this.cname, a.applyTheme(this, b, "MapObject"), this.arrays = []
            },
            deleteObject: function () {
                if (this.remove(), this.parentArray && a.removeFromArray(this.parentArray, this), this.arrays)
                    for (var b = 0; b < this.arrays.length; b++) a.removeFromArray(this.arrays[b].arr, this.arrays[b].el);
                this.arrays = []
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.MapArea = a.Class({
            inherits: a.MapObject,
            construct: function (b) {
                this.cname = "MapArea", a.MapArea.base.construct.call(this, b), a.applyTheme(this, b, this.cname)
            },
            validate: function () {
                this.chart.areasProcessor.createArea(this)
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.MapLine = a.Class({
            inherits: a.MapObject,
            construct: function (b) {
                this.cname = "MapLine", this.longitudes = [], this.latitudes = [], this.x = [], this.y = [], this.segments = 0, this.arrow = "none", a.MapLine.base.construct.call(this, b), a.applyTheme(this, b, this.cname)
            },
            validate: function () {
                this.chart.linesProcessor.createLine(this)
            },
            remove: function () {
                var a = this.displayObject;
                a && a.remove()
            },
            getCoordinates: function (b, c) {
                if (isNaN(c) && (c = 0), isNaN(this.arc) || this.validate(), !isNaN(b)) {
                    var d, e, f, g, h, i;
                    if (1 < this.longitudes.length) {
                        e = this.chart.coordinatesToXY(this.longitudes[c], this.latitudes[c]);
                        var j = this.chart.coordinatesToXY(this.longitudes[c + 1], this.latitudes[c + 1]);
                        d = e.x, f = j.x, e = e.y, g = j.y
                    } else 1 < this.x.length && (d = this.x[c], f = this.x[c + 1], e = this.y[c], g = this.y[c + 1]);
                    j = Math.sqrt(Math.pow(f - d, 2) + Math.pow(g - e, 2)), d < f && !isNaN(this.arc) && 0 !== this.arc && (b = 1 - b), h = d + (f - d) * b, i = e + (g - e) * b;
                    var k = Math.atan2(g - e, f - d);
                    if (!isNaN(this.arc) && 0 !== this.arc && this.arcRadius) {
                        var l = 0;
                        d < f && (l = d, d = f, f = l, l = e, e = g, g = l, l = Math.PI), i = this.arcRadius[c], 0 > this.arc && (j = -j), h = d + (f - d) / 2 + Math.sqrt(i * i - j / 2 * (j / 2)) * (e - g) / j;
                        var m = e + (g - e) / 2 + Math.sqrt(i * i - j / 2 * (j / 2)) * (f - d) / j;
                        d = 180 * Math.atan2(e - m, d - h) / Math.PI, f = 180 * Math.atan2(g - m, f - h) / Math.PI, 180 < f - d && (f -= 360), k = a.degreesToRadians(d + (f - d) * b), h += i * Math.cos(k), i = m + i * Math.sin(k), k = 0 < this.arc ? k + Math.PI / 2 : k - Math.PI / 2, k += l
                    }
                    return this.distance = j, {
                        x: h,
                        y: i,
                        angle: k
                    }
                }
            },
            fixToStage: function () {
                if (0 < this.latitudes.length) {
                    this.y = [];
                    for (var a = 0; a < this.latitudes.length; a++) {
                        var b = this.chart.coordinatesToStageXY(this.longitudes[a], this.latitudes[a]);
                        this.y.push(b.y), this.x.push(b.x)
                    }
                    this.latitudes = [], this.longitudes = []
                }
                this.validate()
            },
            fixToMap: function () {
                if (0 < this.y.length) {
                    this.latitudes = [];
                    for (var a = 0; a < this.y.length; a++) {
                        var b = this.chart.stageXYToCoordinates(this.x[a], this.y[a]);
                        this.latitudes.push(b.latitude), this.longitudes.push(b.longitude)
                    }
                    this.y = [], this.x = []
                }
                this.validate()
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.MapImage = a.Class({
            inherits: a.MapObject,
            construct: function (b) {
                this.cname = "MapImage", this.scale = 1, this.widthAndHeightUnits = "pixels", this.labelShiftY = this.labelShiftX = 0, this.positionOnLine = .5, this.direction = 1, this.lineSegment = this.extraAngle = 0, this.animateAngle = !0, this.createEvents("animationStart", "animationEnd"), a.MapImage.base.construct.call(this, b), a.applyTheme(this, b, this.cname)
            },
            validate: function () {
                this.chart.imagesProcessor.createImage(this)
            },
            updatePosition: function () {
                this.chart.imagesProcessor.updateSizeAndPosition(this)
            },
            remove: function () {
                var a = this.displayObject;
                a && a.remove(), (a = this.imageLabel) && a.remove()
            },
            animateTo: function (a, b, c, d) {
                isNaN(c) || (this.animationDuration = c), d && (this.easingFunction = d), this.finalX = a, this.finalY = b, isNaN(this.longitude) || (this.initialX = this.longitude), isNaN(this.left) || (this.initialX = this.left), isNaN(this.right) || (this.initialX = this.right), isNaN(this.latitude) || (this.initialY = this.latitude), isNaN(this.top) || (this.initialY = this.top), isNaN(this.bottom) || (this.initialY = this.bottom), this.animatingAlong = !1, this.animate()
            },
            animateAlong: function (a, b, c) {
                1 == this.positionOnLine && this.flipDirection && (this.direction = -1, this.extraAngle = 180), isNaN(b) || (this.animationDuration = b), c && (this.easingFunction = c), a && (this.line = this.chart.getObjectById(a)), this.animateAlongLine = this.line, this.animatingAlong = !0, this.animate()
            },
            animate: function () {
                var b = this,
                    c = b.chart.imagesSettings,
                    d = b.animationDuration;
                isNaN(d) && (d = c.animationDuration), b.totalFrames = d * a.updateRate, d = 1, b.line && c.adjustAnimationSpeed && (b.line.distances && (d = b.line.distances[b.lineSegment] * b.chart.zoomLevel(), d = Math.abs(d / c.baseAnimationDistance)), b.totalFrames = Math.round(d * b.totalFrames)), b.frame = 0, b.clearTO(), b.timeOut = setTimeout(function () {
                    b.update.call(b)
                }, 1e3 / a.updateRate), b.fire({
                    type: "animationStart",
                    chart: b.chart,
                    image: this,
                    lineSegment: b.lineSegment,
                    direction: b.direction
                })
            },
            clearTO: function () {
                this.timeOut && clearTimeout(this.timeOut)
            },
            update: function () {
                var b = this;
                b.updatePosition();
                var c = Math.round(1e3 / a.updateRate),
                    d = b.chart.imagesSettings,
                    e = b.easingFunction;
                e || (e = d.easingFunction), b.frame++ , d = b.totalFrames, b.frame <= d ? (e = e(0, b.frame, 0, 1, d), -1 == b.direction && (e = 1 - e), b.animatingAlong ? b.positionOnLine = e : (d = b.initialX + (b.finalX - b.initialX) * e, isNaN(b.longitude) || (b.longitude = d), isNaN(b.left) || (b.left = d), isNaN(b.right) || (b.right = d), e = b.initialY + (b.finalY - b.initialY) * e, isNaN(b.latitude) || (b.latitude = e), isNaN(b.top) || (b.top = e), isNaN(b.bottom) || (b.bottom = e)), b.clearTO(), window.requestAnimationFrame ? window.requestAnimationFrame(function () {
                    b.update.call(b)
                }) : b.timeOut = setTimeout(function () {
                    b.update.call(b)
                }, c)) : (b.fire({
                    type: "animationEnd",
                    chart: b.chart,
                    image: this,
                    lineSegment: b.lineSegment,
                    direction: b.direction
                }), b.line && b.animatingAlong && (1 == b.direction ? b.lineSegment < b.line.segments - 2 ? (b.lineSegment++ , b.delayAnimateAlong(), b.positionOnLine = 0) : b.flipDirection ? (b.direction = -1, b.extraAngle = 180, b.delayAnimateAlong()) : b.loop && (b.delayAnimateAlong(), b.lineSegment = 0) : 0 < b.lineSegment ? (b.lineSegment-- , b.delayAnimateAlong(), b.positionOnLine = 0) : b.loop && b.flipDirection ? (b.direction = 1, b.extraAngle = 0, b.delayAnimateAlong()) : b.loop && b.delayAnimateAlong()))
            },
            delayAnimateAlong: function () {
                var a = this;
                a.clearTO(), a.animateAlongLine && (a.timeOut = setTimeout(function () {
                    a.animateAlong.call(a)
                }, 1e3 * a.chart.imagesSettings.pauseDuration))
            },
            fixToStage: function () {
                if (!isNaN(this.longitude)) {
                    var a = this.chart.coordinatesToStageXY(this.longitude, this.latitude);
                    this.left = a.x, this.top = a.y, this.latitude = this.longitude = void 0
                }
                this.validate()
            },
            fixToMap: function () {
                if (!isNaN(this.left)) {
                    var a = this.chart.stageXYToCoordinates(this.left, this.top);
                    this.longitude = a.longitude, this.latitude = a.latitude, this.top = this.left = void 0
                }
                this.validate()
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.degreesToRadians = function (a) {
            return a / 180 * Math.PI
        }, a.radiansToDegrees = function (a) {
            return a / Math.PI * 180
        }, a.getColorFade = function (b, c, d) {
            var e = a.hex2RGB(c);
            c = e[0];
            var f = e[1],
                e = e[2],
                g = a.hex2RGB(b);
            b = g[0];
            var h = g[1],
                g = g[2];
            return b += Math.round((c - b) * d), h += Math.round((f - h) * d), g += Math.round((e - g) * d), "rgb(" + b + "," + h + "," + g + ")"
        }, a.hex2RGB = function (a) {
            return [parseInt(a.substring(1, 3), 16), parseInt(a.substring(3, 5), 16), parseInt(a.substring(5, 7), 16)]
        }, a.processDescriptionWindow = function (a, b) {
            isNaN(b.descriptionWindowX) && (b.descriptionWindowX = a.descriptionWindowX), isNaN(b.descriptionWindowY) && (b.descriptionWindowY = a.descriptionWindowY), isNaN(b.descriptionWindowLeft) && (b.descriptionWindowLeft = a.descriptionWindowLeft), isNaN(b.descriptionWindowRight) && (b.descriptionWindowRight = a.descriptionWindowRight), isNaN(b.descriptionWindowTop) && (b.descriptionWindowTop = a.descriptionWindowTop), isNaN(b.descriptionWindowBottom) && (b.descriptionWindowBottom = a.descriptionWindowBottom), isNaN(b.descriptionWindowWidth) && (b.descriptionWindowWidth = a.descriptionWindowWidth), isNaN(b.descriptionWindowHeight) && (b.descriptionWindowHeight = a.descriptionWindowHeight)
        }, a.normalizePath = function (b) {
            for (var e, f, c = "", d = a.parsePath(b.getAttribute("d")), g = 1 / 0, h = -1 / 0, i = 1 / 0, j = -1 / 0, k = 0; k < d.length; k++) {
                var l = d[k],
                    m = l.letter,
                    n = l.x,
                    l = l.y;
                "h" == m && (m = "L", n += e, l = f), "H" == m && (m = "L", l = f), "v" == m && (m = "L", n = e, l += f), "V" == m && (m = "L", n = e), "m" !== m && "l" !== m || (m = m.toUpperCase(), n += e, l += f), n = a.roundTo(n, 3), l = a.roundTo(l, 3), e = n, f = l, n > h && (h = n), n < g && (g = n), l > j && (j = l), l < i && (i = l), c = "z" == m.toLowerCase() ? c + "Z " : c + (m + " ") + n + " " + l + " "
            }
            return b.setAttribute("d", c), {
                minX: g,
                maxX: h,
                minY: i,
                maxY: j
            }
        }, a.mercatorLatitudeToRadians = function (b) {
            return Math.log(Math.tan(Math.PI / 4 + a.degreesToRadians(b) / 2))
        }, a.parsePath = function (a) {
            a = a.match(/([MmLlHhVvZz]{1}[0-9.,\-\s]*)/g);
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a[c].match(/([MmLlHhVvZz]{1})|([0-9.\-]+)/g),
                    e = {
                        letter: d[0]
                    };
                switch (d[0]) {
                    case "Z":
                    case "Z":
                    case "z":
                        break;
                    case "V":
                    case "v":
                        e.y = Number(d[1]);
                        break;
                    case "H":
                    case "h":
                        e.x = Number(d[1]);
                        break;
                    default:
                        e.x = Number(d[1]), e.y = Number(d[2])
                }
                b.push(e)
            }
            return b
        }, a.acos = function (a) {
            return 1 < a ? 0 : -1 > a ? Math.PI : Math.acos(a)
        }, a.asin = function (a) {
            return 1 < a ? Math.PI / 2 : -1 > a ? -Math.PI / 2 : Math.asin(a)
        }, a.sinci = function (a) {
            return a ? a / Math.sin(a) : 1
        }, a.asqrt = function (a) {
            return 0 < a ? Math.sqrt(a) : 0
        }, a.winkel3 = function (b, c) {
            var d = a.aitoff(b, c);
            return [(d[0] + b / Math.PI * 2) / 2, (d[1] + c) / 2]
        }, a.winkel3.invert = function (b, c) {
            var d = b,
                e = c,
                f = 25,
                g = Math.PI / 2;
            do {
                var s, h = Math.cos(e),
                    i = Math.sin(e),
                    j = Math.sin(2 * e),
                    k = i * i,
                    l = h * h,
                    m = Math.sin(d),
                    n = Math.cos(d / 2),
                    o = Math.sin(d / 2),
                    p = o * o,
                    q = 1 - l * n * n,
                    r = q ? a.acos(h * n) * Math.sqrt(s = 1 / q) : s = 0,
                    q = .5 * (2 * r * h * o + d / g) - b,
                    t = .5 * (r * i + e) - c,
                    u = .5 * s * (l * p + r * h * n * k) + .5 / g,
                    v = s * (m * j / 4 - r * i * o),
                    i = .125 * s * (j * o - r * i * l * m),
                    k = .5 * s * (k * n + r * p * h) + .5,
                    h = v * i - k * u,
                    v = (t * v - q * k) / h,
                    q = (q * i - t * u) / h,
                    d = d - v,
                    e = e - q
            } while ((1e-6 < Math.abs(v) || 1e-6 < Math.abs(q)) && 0 < --f);
            return [d, e]
        }, a.aitoff = function (b, c) {
            var d = Math.cos(c),
                e = a.sinci(a.acos(d * Math.cos(b /= 2)));
            return [2 * d * Math.sin(b) * e, Math.sin(c) * e]
        }, a.orthographic = function (a, b) {
            return [Math.cos(b) * Math.sin(a), Math.sin(b)]
        }, a.equirectangular = function (a, b) {
            return [a, b]
        }, a.equirectangular.invert = function (a, b) {
            return [a, b]
        }, a.eckert5 = function (a, b) {
            var c = Math.PI;
            return [a * (1 + Math.cos(b)) / Math.sqrt(2 + c), 2 * b / Math.sqrt(2 + c)]
        }, a.eckert5.invert = function (a, b) {
            var c = Math.sqrt(2 + Math.PI),
                d = b * c / 2;
            return [c * a / (1 + Math.cos(d)), d]
        }, a.eckert6 = function (a, b) {
            for (var c = Math.PI, d = (1 + c / 2) * Math.sin(b), e = 0, f = 1 / 0; 10 > e && 1e-5 < Math.abs(f); e++) b -= f = (b + Math.sin(b) - d) / (1 + Math.cos(b));
            return d = Math.sqrt(2 + c), [a * (1 + Math.cos(b)) / d, 2 * b / d]
        }, a.eckert6.invert = function (b, c) {
            var d = 1 + Math.PI / 2,
                e = Math.sqrt(d / 2);
            return [2 * b * e / (1 + Math.cos(c *= e)), a.asin((c + Math.sin(c)) / d)]
        }, a.mercator = function (a, b) {
            return b >= Math.PI / 2 - .02 && (b = Math.PI / 2 - .02), b <= -Math.PI / 2 + .02 && (b = -Math.PI / 2 + .02), [a, Math.log(Math.tan(Math.PI / 4 + b / 2))]
        }, a.mercator.invert = function (a, b) {
            return [a, 2 * Math.atan(Math.exp(b)) - Math.PI / 2]
        }, a.miller = function (a, b) {
            return [a, 1.25 * Math.log(Math.tan(Math.PI / 4 + .4 * b))]
        }, a.miller.invert = function (a, b) {
            return [a, 2.5 * Math.atan(Math.exp(.8 * b)) - .625 * Math.PI]
        }, a.eckert3 = function (a, b) {
            var c = Math.PI,
                d = Math.sqrt(c * (4 + c));
            return [2 / d * a * (1 + Math.sqrt(1 - 4 * b * b / (c * c))), 4 / d * b]
        }, a.eckert3.invert = function (b, c) {
            var d = Math.PI,
                e = Math.sqrt(d * (4 + d)) / 2;
            return [b * e / (1 + a.asqrt(1 - c * c * (4 + d) / (4 * d))), c * e / 2]
        }
    }(),
    function () {
        var a = window.HistoryMaps;
        a.MapData = a.Class({
            inherits: a.MapObject,
            construct: function () {
                this.cname = "MapData", a.MapData.base.construct.call(this), this.projection = "mercator", this.topLatitude = 90, this.bottomLatitude = -90, this.leftLongitude = -180, this.rightLongitude = 180, this.zoomLevel = 1, this.getAreasFromMap = !1
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.DescriptionWindow = a.Class({
            construct: function () { },
            show: function (a, b, c, d) {
                var e = this;
                e.chart = a;
                var f = document.createElement("div");
                f.style.position = "absolute";
                var g = a.classNamePrefix + "-description-";
                f.className = "historymapDescriptionWindow " + g + "div", e.div = f, b.appendChild(f);
                var h = ".gif";
                a.svgIcons && (h = ".svg");
                var i = document.createElement("img");
                i.className = "historymapDescriptionWindowCloseButton " + g + "close-img", i.src = a.pathToImages + "xIcon" + h, i.style.cssFloat = "right", i.style.cursor = "pointer", i.onclick = function () {
                    e.close()
                }, i.onmouseover = function () {
                    i.src = a.pathToImages + "xIconH" + h
                }, i.onmouseout = function () {
                    i.src = a.pathToImages + "xIcon" + h
                }, f.appendChild(i), b = document.createElement("div"), b.className = "historymapDescriptionTitle " + g + "title-div", b.onmousedown = function () {
                    e.div.style.zIndex = 1e3
                }, f.appendChild(b), b.innerHTML = d, d = b.offsetHeight, b = document.createElement("div"), b.className = "historymapDescriptionText " + g + "text-div", b.style.maxHeight = e.maxHeight - d - 20 + "px", f.appendChild(b), b.innerHTML = c
            },
            close: function () {
                try {
                    this.div.parentNode.removeChild(this.div), this.chart.fireClosed()
                } catch (a) { }
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.ValueLegend = a.Class({
            construct: function (b) {
                this.cname = "ValueLegend", this.enabled = !0, this.showAsGradient = !1, this.minValue = 0, this.height = 12, this.width = 200, this.bottom = this.left = 10, this.borderColor = "#FFFFFF", this.borderAlpha = this.borderThickness = 1, this.color = "#000000", this.fontSize = 11, a.applyTheme(this, b, this.cname)
            },
            init: function (b, c) {
                if (this.enabled) {
                    var d = b.areasSettings.color,
                        e = b.areasSettings.colorSolid,
                        f = b.colorSteps;
                    a.remove(this.set);
                    var g = c.set();
                    this.set = g, a.setCN(b, g, "value-legend");
                    var h = 0,
                        i = this.minValue,
                        j = this.fontSize,
                        k = b.fontFamily,
                        l = this.color,
                        m = {
                            precision: b.precision,
                            decimalSeparator: b.decimalSeparator,
                            thousandsSeparator: b.thousandsSeparator
                        };
                    if (void 0 == i && (i = a.formatNumber(b.minValueReal, m)), void 0 !== i && (h = a.text(c, i, l, k, j, "left"), h.translate(0, j / 2 - 1), a.setCN(b, h, "value-legend-min-label"), g.push(h), h = h.getBBox().height), i = this.maxValue, void 0 === i && (i = a.formatNumber(b.maxValueReal, m)), void 0 !== i && (h = a.text(c, i, l, k, j, "right"), h.translate(this.width, j / 2 - 1), a.setCN(b, h, "value-legend-max-label"), g.push(h), h = h.getBBox().height), this.showAsGradient) d = a.rect(c, this.width, this.height, [d, e], 1, this.borderThickness, this.borderColor, 1, 0, 0), a.setCN(b, d, "value-legend-gradient"), d.translate(0, h), g.push(d);
                    else
                        for (j = this.width / f, k = 0; k < f; k++) l = a.getColorFade(d, e, 1 * k / (f - 1)), l = a.rect(c, j, this.height, l, 1, this.borderThickness, this.borderColor, 1), a.setCN(b, l, "value-legend-color"), a.setCN(b, l, "value-legend-color-" + k), l.translate(j * k, h), g.push(l);
                    e = d = 0, f = g.getBBox(), h = b.getY(this.bottom, !0), j = b.getY(this.top), k = b.getX(this.right, !0), l = b.getX(this.left), isNaN(j) || (d = j), isNaN(h) || (d = h - f.height), isNaN(l) || (e = l), isNaN(k) || (e = k - f.width), g.translate(e, d)
                } else a.remove(this.set)
            }
        })
    }(),
    function () {
        var a = window.HistoryMaps;
        a.ObjectList = a.Class({
            construct: function (a) {
                this.divId = a
            },
            init: function (a) {
                this.chart = a;
                var b = this.divId;
                this.container && (b = this.container), this.div = "object" != typeof b ? document.getElementById(b) : b, b = document.createElement("div"), b.className = "historymapObjectList " + a.classNamePrefix + "-object-list-div", this.div.appendChild(b), this.addObjects(a.dataProvider, b)
            },
            addObjects: function (a, b) {
                var c = this.chart,
                    d = document.createElement("ul");
                d.className = c.classNamePrefix + "-object-list-ul";
                var e;
                if (a.areas)
                    for (e = 0; e < a.areas.length; e++) {
                        var f = a.areas[e];
                        void 0 === f.showInList && (f.showInList = c.showAreasInList), this.addObject(f, d)
                    }
                if (a.images)
                    for (e = 0; e < a.images.length; e++) f = a.images[e], void 0 === f.showInList && (f.showInList = c.showImagesInList), this.addObject(f, d);
                if (a.lines)
                    for (e = 0; e < a.lines.length; e++) f = a.lines[e], void 0 === f.showInList && (f.showInList = c.showLinesInList), this.addObject(f, d);
                0 < d.childNodes.length && b.appendChild(d)
            },
            addObject: function (a, b) {
                var c = this;
                if (a.showInList && void 0 !== a.title) {
                    var d = c.chart,
                        e = document.createElement("li");
                    e.className = d.classNamePrefix + "-object-list-li";
                    var f = a.titleTr;
                    f || (f = a.title);
                    var f = document.createTextNode(f),
                        g = document.createElement("a");
                    g.className = d.classNamePrefix + "-object-list-a", g.appendChild(f), e.appendChild(g), b.appendChild(e), this.addObjects(a, e), g.onmouseover = function () {
                        c.chart.rollOverMapObject(a, !1)
                    }, g.onmouseout = function () {
                        c.chart.rollOutMapObject(a)
                    }, g.onclick = function () {
                        c.chart.clickMapObject(a)
                    }
                }
            }
        })
    }(), HistoryMaps.themes.black = {
        themeName: "black",
        HistoryMap: {
            color: "#e7e7e7",
            backgroundColor: "#222222"
        },
        AmCoordinateChart: {
            colors: ["#de4c4f", "#d8854f", "#eea638", "#a7a737", "#86a965", "#8aabb0", "#69c8ff", "#cfd27e", "#9d9888", "#916b8a", "#724887", "#7256bc"]
        },
        AmStockChart: {
            colors: ["#de4c4f", "#d8854f", "#eea638", "#a7a737", "#86a965", "#8aabb0", "#69c8ff", "#cfd27e", "#9d9888", "#916b8a", "#724887", "#7256bc"]
        },
        AmSlicedChart: {
            outlineAlpha: 1,
            outlineThickness: 2,
            labelTickColor: "#FFFFFF",
            labelTickAlpha: .3,
            colors: ["#de4c4f", "#d8854f", "#eea638", "#a7a737", "#86a965", "#8aabb0", "#69c8ff", "#cfd27e", "#9d9888", "#916b8a", "#724887", "#7256bc"]
        },
        AmRectangularChart: {
            zoomOutButtonColor: "#FFFFFF",
            zoomOutButtonRollOverAlpha: .15,
            zoomOutButtonImage: "lensWhite"
        },
        AxisBase: {
            axisColor: "#FFFFFF",
            axisAlpha: .3,
            gridAlpha: .1,
            gridColor: "#FFFFFF",
            dashLength: 3
        },
        ChartScrollbar: {
            backgroundColor: "#000000",
            backgroundAlpha: .2,
            graphFillAlpha: .2,
            graphLineAlpha: 0,
            graphFillColor: "#FFFFFF",
            selectedGraphFillColor: "#FFFFFF",
            selectedGraphFillAlpha: .4,
            selectedGraphLineColor: "#FFFFFF",
            selectedBackgroundColor: "#FFFFFF",
            selectedBackgroundAlpha: .09,
            gridAlpha: .15
        },
        ChartCursor: {
            cursorColor: "#FFFFFF",
            color: "#000000",
            cursorAlpha: .5
        },
        AmLegend: {
            color: "#e7e7e7"
        },
        AmGraph: {
            lineAlpha: .9
        },
        GaugeArrow: {
            color: "#FFFFFF",
            alpha: .8,
            nailAlpha: 0,
            innerRadius: "40%",
            nailRadius: 15,
            startWidth: 15,
            borderAlpha: .8,
            nailBorderAlpha: 0
        },
        GaugeAxis: {
            tickColor: "#FFFFFF",
            tickAlpha: 1,
            tickLength: 15,
            minorTickLength: 8,
            axisThickness: 3,
            axisColor: "#FFFFFF",
            axisAlpha: 1,
            bandAlpha: .8
        },
        TrendLine: {
            lineColor: "#c03246",
            lineAlpha: .8
        },
        AreasSettings: {
            alpha: .8,
            color: "#666666",
            colorSolid: "#000000",
            unlistedAreasAlpha: .4,
            unlistedAreasColor: "#555555",
            outlineColor: "#000000",
            outlineAlpha: .5,
            outlineThickness: .5,
            rollOverBrightness: 30,
            slectedBrightness: 50,
            rollOverOutlineColor: "#000000",
            selectedOutlineColor: "#000000",
            unlistedAreasOutlineColor: "#000000",
            unlistedAreasOutlineAlpha: .5
        },
        LinesSettings: {
            color: "#555555",
            alpha: .8
        },
        ImagesSettings: {
            alpha: .8,
            labelColor: "#FFFFFF",
            color: "#FFFFFF",
            labelRollOverColor: "#3c5bdc"
        },
        ZoomControl: {
            buttonFillAlpha: .4
        },
        SmallMap: {
            mapColor: "#444444",
            rectangleColor: "#666666",
            backgroundColor: "#000000",
            backgroundAlpha: .5,
            borderColor: "#555555",
            borderThickness: 1,
            borderAlpha: .8
        },
        PeriodSelector: {
            color: "#e7e7e7"
        },
        PeriodButton: {
            color: "#e7e7e7",
            background: "transparent",
            opacity: .7,
            border: "1px solid rgba(255, 255, 255, .15)",
            MozBorderRadius: "5px",
            borderRadius: "5px",
            margin: "1px",
            outline: "none",
            boxSizing: "border-box"
        },
        PeriodButtonSelected: {
            color: "#e7e7e7",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, .3)",
            MozBorderRadius: "5px",
            borderRadius: "5px",
            margin: "1px",
            outline: "none",
            opacity: 1,
            boxSizing: "border-box"
        },
        PeriodInputField: {
            color: "#e7e7e7",
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, .15)",
            outline: "none"
        },
        DataSetSelector: {
            color: "#e7e7e7",
            selectedBackgroundColor: "rgba(255, 255, 255, .25)",
            rollOverBackgroundColor: "rgba(255, 255, 255, .15)"
        },
        DataSetCompareList: {
            color: "#e7e7e7",
            lineHeight: "100%",
            boxSizing: "initial",
            webkitBoxSizing: "initial",
            border: "1px solid rgba(255, 255, 255, .15)"
        },
        DataSetSelect: {
            border: "1px solid rgba(255, 255, 255, .15)",
            outline: "none"
        }
    };