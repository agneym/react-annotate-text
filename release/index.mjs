import { useRef as t, useState as n, useEffect as e } from "react";
function o(o) {
  var i = o.buttonData,
    l = o.scrollPosition,
    r = o.content,
    c = o.onButtonClick,
    s = n(null),
    u = s[0],
    a = s[1],
    d = t(null);
  return (
    e(
      function() {
        d.current && a(d.current.offsetHeight);
      },
      [i.type]
    ),
    h(
      "div",
      {
        className: "button",
        onClick: c,
        ref: d,
        style: {
          left: i.position.left - l.scrollX,
          top: i.position.top - l.scrollY - u,
          position: "absolute",
          zIndex: 1,
          visibility: u ? "visible" : "hidden"
        }
      },
      r
    )
  );
}
function i(t) {
  var n = t.scrollPosition,
    e = t.hoverChange;
  return h(
    "div",
    { className: "annotations" },
    t.highlightData.map(function(t) {
      return t.position.map(function(o, i) {
        return h(
          "div",
          { key: t.id + "_" + i },
          h("div", {
            className: "rectangle-not-visible",
            onMouseOver: function() {
              e(t.id);
            },
            id: t.id,
            style: {
              position: "absolute",
              height: o.height,
              top: o.top - n.scrollY,
              left: o.left - n.scrollX,
              width: o.width,
              backgroundColor: "none",
              opacity: 1
            }
          }),
          h("div", {
            className: "rectangle-visible",
            id: t.id,
            style: {
              position: "absolute",
              height: o.height,
              top: o.top - n.scrollY,
              left: o.left - n.scrollX,
              width: o.width,
              backgroundColor: "yellow",
              opacity: 1,
              zIndex: -1
            }
          })
        );
      });
    })
  );
}
var l = function(t) {
    return t.reduce(function(t, n) {
      return n.top < t.top && (t = n), { top: t.top, left: t.left };
    }, t[0]);
  },
  r = function(t, n) {
    var e = n.find(function(n) {
      return n.id == t;
    });
    return l(e.position);
  };
export default function(c) {
  var s = c.src,
    u = c.srcDoc,
    a = c.height,
    d = c.width,
    f = c.highlightData,
    p = c.selectionPopup,
    v = c.hoverPopup,
    g = c.iframeTitle,
    m = t(null),
    y = n(null),
    w = y[0],
    b = y[1],
    D = n(null),
    C = D[0],
    X = D[1],
    Y = n(null),
    k = Y[0],
    P = Y[1],
    L = n({ scrollY: 0, scrollX: 0 }),
    x = L[0],
    E = L[1],
    N = function() {
      var t = m.current.contentWindow.getSelection(),
        n = t.toString();
      if (n) {
        var e = (function(t, n) {
          return Array.from(t).map(function(t) {
            return {
              left: t.left + n.scrollX,
              top: t.top + n.scrollY,
              height: t.height,
              width: t.width
            };
          });
        })(t.getRangeAt(0).getClientRects(), x);
        b({ position: e, selectionText: n }),
          P({ type: "select", position: l(e) });
      } else z();
    },
    W = function() {
      E({
        scrollY: m.current.contentWindow.scrollY,
        scrollX: m.current.contentWindow.scrollX
      });
    },
    z = function() {
      b(null), X(null), P(null);
    };
  return (
    e(
      function() {
        return (
          m.current &&
            (m.current.contentDocument.addEventListener("scroll", W),
            m.current.contentDocument.addEventListener("mouseup", N)),
          function() {
            m.current.contentDocument.removeEventListener("scroll", W),
              m.current.contentDocument.removeEventListener("mouseup", N);
          }
        );
      },
      [x]
    ),
    h(
      "div",
      {
        onMouseLeave: z,
        style: { width: d, height: a, overflow: "hidden", position: "relative" }
      },
      h("iframe", { src: s, srcDoc: u, width: d, height: a, title: g, ref: m }),
      f.length &&
        h(i, {
          highlightData: f,
          scrollPosition: x,
          hoverChange: function(t) {
            t ? (X(t), P({ type: "hover", position: r(t, f) })) : z();
          }
        }),
      k &&
        h(o, {
          buttonData: k,
          scrollPosition: x,
          content:
            "select" === k.type ? p(w) : "hover" === k.type ? v(C) : void 0,
          onButtonClick: z
        })
    )
  );
}
//# sourceMappingURL=index.mjs.map
