var t = require("react");
function e(e) {
  var n = e.buttonData,
    o = e.scrollPosition,
    i = e.content,
    r = e.onButtonClick,
    l = t.useState(null),
    c = l[0],
    s = l[1],
    u = t.useRef(null);
  return (
    t.useEffect(
      function() {
        u.current && s(u.current.offsetHeight);
      },
      [n.type]
    ),
    h(
      "div",
      {
        className: "button",
        onClick: r,
        ref: u,
        style: {
          left: n.position.left - o.scrollX,
          top: n.position.top - o.scrollY - c,
          position: "absolute",
          zIndex: 1,
          visibility: c ? "visible" : "hidden"
        }
      },
      i
    )
  );
}
function n(t) {
  var e = t.scrollPosition,
    n = t.hoverChange;
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
              n(t.id);
            },
            id: t.id,
            style: {
              position: "absolute",
              height: o.height,
              top: o.top - e.scrollY,
              left: o.left - e.scrollX,
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
              top: o.top - e.scrollY,
              left: o.left - e.scrollX,
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
var o = function(t) {
    return t.reduce(function(t, e) {
      return e.top < t.top && (t = e), { top: t.top, left: t.left };
    }, t[0]);
  },
  i = function(t, e) {
    var n = e.find(function(e) {
      return e.id == t;
    });
    return o(n.position);
  };
module.exports = function(r) {
  var l = r.src,
    c = r.srcDoc,
    s = r.height,
    u = r.width,
    a = r.highlightData,
    f = r.selectionPopup,
    d = r.hoverPopup,
    p = r.iframeTitle,
    v = t.useRef(null),
    g = t.useState(null),
    m = g[0],
    y = g[1],
    w = t.useState(null),
    b = w[0],
    D = w[1],
    C = t.useState(null),
    S = C[0],
    X = C[1],
    Y = t.useState({ scrollY: 0, scrollX: 0 }),
    k = Y[0],
    E = Y[1],
    P = function() {
      var t = v.current.contentWindow.getSelection(),
        e = t.toString();
      if (e) {
        var n = (function(t, e) {
          return Array.from(t).map(function(t) {
            return {
              left: t.left + e.scrollX,
              top: t.top + e.scrollY,
              height: t.height,
              width: t.width
            };
          });
        })(t.getRangeAt(0).getClientRects(), k);
        y({ position: n, selectionText: e }),
          X({ type: "select", position: o(n) });
      } else x();
    },
    L = function() {
      E({
        scrollY: v.current.contentWindow.scrollY,
        scrollX: v.current.contentWindow.scrollX
      });
    },
    x = function() {
      y(null), D(null), X(null);
    };
  return (
    t.useEffect(
      function() {
        return (
          v.current &&
            (v.current.contentDocument.addEventListener("scroll", L),
            v.current.contentDocument.addEventListener("mouseup", P)),
          function() {
            v.current.contentDocument.removeEventListener("scroll", L),
              v.current.contentDocument.removeEventListener("mouseup", P);
          }
        );
      },
      [k]
    ),
    h(
      "div",
      {
        onMouseLeave: x,
        style: { width: u, height: s, overflow: "hidden", position: "relative" }
      },
      h("iframe", { src: l, srcDoc: c, width: u, height: s, title: p, ref: v }),
      a.length &&
        h(n, {
          highlightData: a,
          scrollPosition: k,
          hoverChange: function(t) {
            t ? (D(t), X({ type: "hover", position: i(t, a) })) : x();
          }
        }),
      S &&
        h(e, {
          buttonData: S,
          scrollPosition: k,
          content:
            "select" === S.type ? f(m) : "hover" === S.type ? d(b) : void 0,
          onButtonClick: x
        })
    )
  );
};
//# sourceMappingURL=index.js.map
