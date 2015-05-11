! function(t, e) {
    "use strict";

    function n(t) {
        return "object" == typeof Node ? t instanceof Node : t && "object" == typeof t && "number" == typeof t.nodeType
    }

    function o(t) {
        return "string" == typeof t
    }

    function i() {
        var t = [];
        return {
            watch: t.push.bind(t),
            trigger: function(e) {
                for (var n = !0, o = {
                        preventDefault: function() {
                            n = !1
                        }
                    }, i = 0; i < t.length; i++) t[i](e, o);
                return n
            }
        }
    }

    function r(t) {
        this.elem = t
    }

    function l(t, e) {
        return r.div().clazz("pico-overlay").clazz(t("overlayClass", "")).stylize({
            display: "block",
            position: "fixed",
            top: "0px",
            left: "0px",
            height: "100%",
            width: "100%",
            zIndex: 1e4,
            overflow: "auto"
        }).stylize(t("overlayStyles", {
            opacity: .5,
            background: "#000"
        })).onClick(function() {
            t("overlayClose", !0) && e()
        })
    }

    function c(t, e) {
        var n = t("width", "70%");
        "number" == typeof n && (n = "" + n + "px");
        var o = r.div().clazz("pico-content").clazz(t("modalClass", "")).stylize({
            display: "block",
            position: "fixed",
            zIndex: 10001,
            left: "50%",
            top: "23px",
            width: n,
            "-ms-transform": "translateX(-50%)",
            "-moz-transform": "translateX(-50%)",
            "-webkit-transform": "translateX(-50%)",
            "-o-transform": "translateX(-50%)",
            transform: "translateX(-50%)",
            height: "calc(100% - 30px)",
            overflow: "auto"
        }).stylize(t("modalStyles", {
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "13px"
        })).html(t("content")).attr("role", "dialog").onClick(function(t) {
            var n = new r(t.target).anyAncestor(function(t) {
                return /\bpico-close\b/.test(t.elem.className)
            });
            n && e()
        });
        return o
    }

    function s(t, e) {
        return e("closeButton", !0) ? t.child().html(e("closeHtml", "&#xD7;")).clazz("pico-close").clazz(e("closeClass")).stylize(e("closeStyles", {
            borderRadius: "2px",
            cursor: "pointer",
            height: "15px",
            width: "15px",
            position: "absolute",
            top: "5px",
            right: "5px",
            fontSize: "16px",
            textAlign: "center",
            lineHeight: "15px",
            background: "#CCC"
        })) : void 0
    }

    function a(t) {
        return function() {
            return t().elem
        }
    }

    function u(e) {
        function r(t, n) {
            var o = e[t];
            return "function" == typeof o && (o = o(n)), void 0 === o ? n : o
        }

        function u() {
            z().hide(), w().hide(), b.trigger(C)
        }

        function f() {
            g.trigger(C) && u()
        }

        function d(t) {
            return function() {
                return t.apply(this, arguments), C
            }
        }

        function h(t) {
            if (!p) {
                var e = c(r, f);
                p = {
                    modal: e,
                    overlay: l(r, f),
                    close: s(e, r)
                }, y.trigger(C)
            }
            return p[t]
        }(o(e) || n(e)) && (e = {
            content: e
        });
        var p, y = i(),
            m = i(),
            v = i(),
            g = i(),
            b = i(),
            w = h.bind(t, "modal"),
            z = h.bind(t, "overlay"),
            x = h.bind(t, "close"),
            C = {
                modalElem: a(w),
                closeElem: a(x),
                overlayElem: a(z),
                show: function() {
                    return m.trigger(C) && (z().show(), x(), w().show(), v.trigger(C)), this
                },
                close: d(f),
                forceClose: d(u),
                destroy: function() {
                    w = w().destroy(), z = z().destroy(), x = void 0
                },
                options: function(t) {
                    e = t
                },
                afterCreate: d(y.watch),
                beforeShow: d(m.watch),
                afterShow: d(v.watch),
                beforeClose: d(g.watch),
                afterClose: d(b.watch)
            };
        return C
    }
    r.div = function(t) {
        var n = e.createElement("div");
        return (t || e.body).appendChild(n), new r(n)
    }, r.prototype = {
        child: function() {
            return r.div(this.elem)
        },
        stylize: function(t) {
            t = t || {}, "undefined" != typeof t.opacity && (t.filter = "alpha(opacity=" + 100 * t.opacity + ")");
            for (var e in t) t.hasOwnProperty(e) && (this.elem.style[e] = t[e]);
            return this
        },
        clazz: function(t) {
            return this.elem.className += " " + t, this
        },
        html: function(t) {
            return n(t) ? this.elem.appendChild(t) : this.elem.innerHTML = t, this
        },
        onClick: function(t) {
            return this.elem.addEventListener("click", t), this
        },
        destroy: function() {
            e.body.removeChild(this.elem)
        },
        hide: function() {
            this.elem.style.display = "none"
        },
        show: function() {
            this.elem.style.display = "block"
        },
        attr: function(t, e) {
            return this.elem.setAttribute(t, e), this
        },
        anyAncestor: function(t) {
            for (var e = this.elem; e;) {
                if (t(new r(e))) return !0;
                e = e.parentNode
            }
            return !1
        }
    }, t.picoModal = u
}(window, document);