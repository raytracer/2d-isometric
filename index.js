(() => {
  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var r;
  var o = {};
  var f = [];
  var e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function c(n2, l2) {
    for (var u3 in l2)
      n2[u3] = l2[u3];
    return n2;
  }
  function s(n2) {
    var l2 = n2.parentNode;
    l2 && l2.removeChild(n2);
  }
  function a(n2, l2, u3) {
    var i3, t3, r3, o3 = arguments, f3 = {};
    for (r3 in l2)
      r3 == "key" ? i3 = l2[r3] : r3 == "ref" ? t3 = l2[r3] : f3[r3] = l2[r3];
    if (arguments.length > 3)
      for (u3 = [u3], r3 = 3; r3 < arguments.length; r3++)
        u3.push(o3[r3]);
    if (u3 != null && (f3.children = u3), typeof n2 == "function" && n2.defaultProps != null)
      for (r3 in n2.defaultProps)
        f3[r3] === void 0 && (f3[r3] = n2.defaultProps[r3]);
    return v(n2, f3, i3, t3, null);
  }
  function v(l2, u3, i3, t3, r3) {
    var o3 = {type: l2, props: u3, key: i3, ref: t3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: r3 == null ? ++n.__v : r3};
    return n.vnode != null && n.vnode(o3), o3;
  }
  function y(n2) {
    return n2.children;
  }
  function p(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function d(n2, l2) {
    if (l2 == null)
      return n2.__ ? d(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l2 < n2.__k.length; l2++)
      if ((u3 = n2.__k[l2]) != null && u3.__e != null)
        return u3.__e;
    return typeof n2.type == "function" ? d(n2) : null;
  }
  function _(n2) {
    var l2, u3;
    if ((n2 = n2.__) != null && n2.__c != null) {
      for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++)
        if ((u3 = n2.__k[l2]) != null && u3.__e != null) {
          n2.__e = n2.__c.base = u3.__e;
          break;
        }
      return _(n2);
    }
  }
  function k(l2) {
    (!l2.__d && (l2.__d = true) && u.push(l2) && !m.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(m);
  }
  function m() {
    for (var n2; m.__r = u.length; )
      n2 = u.sort(function(n3, l2) {
        return n3.__v.__b - l2.__v.__b;
      }), u = [], n2.some(function(n3) {
        var l2, u3, i3, t3, r3, o3;
        n3.__d && (r3 = (t3 = (l2 = n3).__v).__e, (o3 = l2.__P) && (u3 = [], (i3 = c({}, t3)).__v = t3.__v + 1, T(o3, t3, i3, l2.__n, o3.ownerSVGElement !== void 0, t3.__h != null ? [r3] : null, u3, r3 == null ? d(t3) : r3, t3.__h), j(u3, t3), t3.__e != r3 && _(t3)));
      });
  }
  function b(n2, l2, u3, i3, t3, r3, e3, c3, s4, a3) {
    var h, p2, _2, k3, m3, b3, w, A2 = i3 && i3.__k || f, P2 = A2.length;
    for (u3.__k = [], h = 0; h < l2.length; h++)
      if ((k3 = u3.__k[h] = (k3 = l2[h]) == null || typeof k3 == "boolean" ? null : typeof k3 == "string" || typeof k3 == "number" ? v(null, k3, null, null, k3) : Array.isArray(k3) ? v(y, {children: k3}, null, null, null) : k3.__b > 0 ? v(k3.type, k3.props, k3.key, null, k3.__v) : k3) != null) {
        if (k3.__ = u3, k3.__b = u3.__b + 1, (_2 = A2[h]) === null || _2 && k3.key == _2.key && k3.type === _2.type)
          A2[h] = void 0;
        else
          for (p2 = 0; p2 < P2; p2++) {
            if ((_2 = A2[p2]) && k3.key == _2.key && k3.type === _2.type) {
              A2[p2] = void 0;
              break;
            }
            _2 = null;
          }
        T(n2, k3, _2 = _2 || o, t3, r3, e3, c3, s4, a3), m3 = k3.__e, (p2 = k3.ref) && _2.ref != p2 && (w || (w = []), _2.ref && w.push(_2.ref, null, k3), w.push(p2, k3.__c || m3, k3)), m3 != null ? (b3 == null && (b3 = m3), typeof k3.type == "function" && k3.__k != null && k3.__k === _2.__k ? k3.__d = s4 = g(k3, s4, n2) : s4 = x(n2, k3, _2, A2, m3, s4), a3 || u3.type !== "option" ? typeof u3.type == "function" && (u3.__d = s4) : n2.value = "") : s4 && _2.__e == s4 && s4.parentNode != n2 && (s4 = d(_2));
      }
    for (u3.__e = b3, h = P2; h--; )
      A2[h] != null && (typeof u3.type == "function" && A2[h].__e != null && A2[h].__e == u3.__d && (u3.__d = d(i3, h + 1)), L(A2[h], A2[h]));
    if (w)
      for (h = 0; h < w.length; h++)
        I(w[h], w[++h], w[++h]);
  }
  function g(n2, l2, u3) {
    var i3, t3;
    for (i3 = 0; i3 < n2.__k.length; i3++)
      (t3 = n2.__k[i3]) && (t3.__ = n2, l2 = typeof t3.type == "function" ? g(t3, l2, u3) : x(u3, t3, t3, n2.__k, t3.__e, l2));
    return l2;
  }
  function x(n2, l2, u3, i3, t3, r3) {
    var o3, f3, e3;
    if (l2.__d !== void 0)
      o3 = l2.__d, l2.__d = void 0;
    else if (u3 == null || t3 != r3 || t3.parentNode == null)
      n:
        if (r3 == null || r3.parentNode !== n2)
          n2.appendChild(t3), o3 = null;
        else {
          for (f3 = r3, e3 = 0; (f3 = f3.nextSibling) && e3 < i3.length; e3 += 2)
            if (f3 == t3)
              break n;
          n2.insertBefore(t3, r3), o3 = r3;
        }
    return o3 !== void 0 ? o3 : t3.nextSibling;
  }
  function A(n2, l2, u3, i3, t3) {
    var r3;
    for (r3 in u3)
      r3 === "children" || r3 === "key" || r3 in l2 || C(n2, r3, null, u3[r3], i3);
    for (r3 in l2)
      t3 && typeof l2[r3] != "function" || r3 === "children" || r3 === "key" || r3 === "value" || r3 === "checked" || u3[r3] === l2[r3] || C(n2, r3, l2[r3], u3[r3], i3);
  }
  function P(n2, l2, u3) {
    l2[0] === "-" ? n2.setProperty(l2, u3) : n2[l2] = u3 == null ? "" : typeof u3 != "number" || e.test(l2) ? u3 : u3 + "px";
  }
  function C(n2, l2, u3, i3, t3) {
    var r3;
    n:
      if (l2 === "style")
        if (typeof u3 == "string")
          n2.style.cssText = u3;
        else {
          if (typeof i3 == "string" && (n2.style.cssText = i3 = ""), i3)
            for (l2 in i3)
              u3 && l2 in u3 || P(n2.style, l2, "");
          if (u3)
            for (l2 in u3)
              i3 && u3[l2] === i3[l2] || P(n2.style, l2, u3[l2]);
        }
      else if (l2[0] === "o" && l2[1] === "n")
        r3 = l2 !== (l2 = l2.replace(/Capture$/, "")), l2 = l2.toLowerCase() in n2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r3] = u3, u3 ? i3 || n2.addEventListener(l2, r3 ? H : $, r3) : n2.removeEventListener(l2, r3 ? H : $, r3);
      else if (l2 !== "dangerouslySetInnerHTML") {
        if (t3)
          l2 = l2.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if (l2 !== "href" && l2 !== "list" && l2 !== "form" && l2 !== "download" && l2 in n2)
          try {
            n2[l2] = u3 == null ? "" : u3;
            break n;
          } catch (n3) {
          }
        typeof u3 == "function" || (u3 != null && (u3 !== false || l2[0] === "a" && l2[1] === "r") ? n2.setAttribute(l2, u3) : n2.removeAttribute(l2));
      }
  }
  function $(l2) {
    this.l[l2.type + false](n.event ? n.event(l2) : l2);
  }
  function H(l2) {
    this.l[l2.type + true](n.event ? n.event(l2) : l2);
  }
  function T(l2, u3, i3, t3, r3, o3, f3, e3, s4) {
    var a3, v3, h, d3, _2, k3, m3, g3, w, x3, A2, P2 = u3.type;
    if (u3.constructor !== void 0)
      return null;
    i3.__h != null && (s4 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, o3 = [e3]), (a3 = n.__b) && a3(u3);
    try {
      n:
        if (typeof P2 == "function") {
          if (g3 = u3.props, w = (a3 = P2.contextType) && t3[a3.__c], x3 = a3 ? w ? w.props.value : a3.__ : t3, i3.__c ? m3 = (v3 = u3.__c = i3.__c).__ = v3.__E : ("prototype" in P2 && P2.prototype.render ? u3.__c = v3 = new P2(g3, x3) : (u3.__c = v3 = new p(g3, x3), v3.constructor = P2, v3.render = M), w && w.sub(v3), v3.props = g3, v3.state || (v3.state = {}), v3.context = x3, v3.__n = t3, h = v3.__d = true, v3.__h = []), v3.__s == null && (v3.__s = v3.state), P2.getDerivedStateFromProps != null && (v3.__s == v3.state && (v3.__s = c({}, v3.__s)), c(v3.__s, P2.getDerivedStateFromProps(g3, v3.__s))), d3 = v3.props, _2 = v3.state, h)
            P2.getDerivedStateFromProps == null && v3.componentWillMount != null && v3.componentWillMount(), v3.componentDidMount != null && v3.__h.push(v3.componentDidMount);
          else {
            if (P2.getDerivedStateFromProps == null && g3 !== d3 && v3.componentWillReceiveProps != null && v3.componentWillReceiveProps(g3, x3), !v3.__e && v3.shouldComponentUpdate != null && v3.shouldComponentUpdate(g3, v3.__s, x3) === false || u3.__v === i3.__v) {
              v3.props = g3, v3.state = v3.__s, u3.__v !== i3.__v && (v3.__d = false), v3.__v = u3, u3.__e = i3.__e, u3.__k = i3.__k, v3.__h.length && f3.push(v3);
              break n;
            }
            v3.componentWillUpdate != null && v3.componentWillUpdate(g3, v3.__s, x3), v3.componentDidUpdate != null && v3.__h.push(function() {
              v3.componentDidUpdate(d3, _2, k3);
            });
          }
          v3.context = x3, v3.props = g3, v3.state = v3.__s, (a3 = n.__r) && a3(u3), v3.__d = false, v3.__v = u3, v3.__P = l2, a3 = v3.render(v3.props, v3.state, v3.context), v3.state = v3.__s, v3.getChildContext != null && (t3 = c(c({}, t3), v3.getChildContext())), h || v3.getSnapshotBeforeUpdate == null || (k3 = v3.getSnapshotBeforeUpdate(d3, _2)), A2 = a3 != null && a3.type === y && a3.key == null ? a3.props.children : a3, b(l2, Array.isArray(A2) ? A2 : [A2], u3, i3, t3, r3, o3, f3, e3, s4), v3.base = u3.__e, u3.__h = null, v3.__h.length && f3.push(v3), m3 && (v3.__E = v3.__ = null), v3.__e = false;
        } else
          o3 == null && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = z(i3.__e, u3, i3, t3, r3, o3, f3, s4);
      (a3 = n.diffed) && a3(u3);
    } catch (l3) {
      u3.__v = null, (s4 || o3 != null) && (u3.__e = e3, u3.__h = !!s4, o3[o3.indexOf(e3)] = null), n.__e(l3, u3, i3);
    }
  }
  function j(l2, u3) {
    n.__c && n.__c(u3, l2), l2.some(function(u4) {
      try {
        l2 = u4.__h, u4.__h = [], l2.some(function(n2) {
          n2.call(u4);
        });
      } catch (l3) {
        n.__e(l3, u4.__v);
      }
    });
  }
  function z(n2, l2, u3, i3, t3, r3, e3, c3) {
    var a3, v3, h, y3, p2 = u3.props, d3 = l2.props, _2 = l2.type, k3 = 0;
    if (_2 === "svg" && (t3 = true), r3 != null) {
      for (; k3 < r3.length; k3++)
        if ((a3 = r3[k3]) && (a3 === n2 || (_2 ? a3.localName == _2 : a3.nodeType == 3))) {
          n2 = a3, r3[k3] = null;
          break;
        }
    }
    if (n2 == null) {
      if (_2 === null)
        return document.createTextNode(d3);
      n2 = t3 ? document.createElementNS("http://www.w3.org/2000/svg", _2) : document.createElement(_2, d3.is && d3), r3 = null, c3 = false;
    }
    if (_2 === null)
      p2 === d3 || c3 && n2.data === d3 || (n2.data = d3);
    else {
      if (r3 = r3 && f.slice.call(n2.childNodes), v3 = (p2 = u3.props || o).dangerouslySetInnerHTML, h = d3.dangerouslySetInnerHTML, !c3) {
        if (r3 != null)
          for (p2 = {}, y3 = 0; y3 < n2.attributes.length; y3++)
            p2[n2.attributes[y3].name] = n2.attributes[y3].value;
        (h || v3) && (h && (v3 && h.__html == v3.__html || h.__html === n2.innerHTML) || (n2.innerHTML = h && h.__html || ""));
      }
      if (A(n2, d3, p2, t3, c3), h)
        l2.__k = [];
      else if (k3 = l2.props.children, b(n2, Array.isArray(k3) ? k3 : [k3], l2, u3, i3, t3 && _2 !== "foreignObject", r3, e3, n2.firstChild, c3), r3 != null)
        for (k3 = r3.length; k3--; )
          r3[k3] != null && s(r3[k3]);
      c3 || ("value" in d3 && (k3 = d3.value) !== void 0 && (k3 !== n2.value || _2 === "progress" && !k3) && C(n2, "value", k3, p2.value, false), "checked" in d3 && (k3 = d3.checked) !== void 0 && k3 !== n2.checked && C(n2, "checked", k3, p2.checked, false));
    }
    return n2;
  }
  function I(l2, u3, i3) {
    try {
      typeof l2 == "function" ? l2(u3) : l2.current = u3;
    } catch (l3) {
      n.__e(l3, i3);
    }
  }
  function L(l2, u3, i3) {
    var t3, r3, o3;
    if (n.unmount && n.unmount(l2), (t3 = l2.ref) && (t3.current && t3.current !== l2.__e || I(t3, null, u3)), i3 || typeof l2.type == "function" || (i3 = (r3 = l2.__e) != null), l2.__e = l2.__d = void 0, (t3 = l2.__c) != null) {
      if (t3.componentWillUnmount)
        try {
          t3.componentWillUnmount();
        } catch (l3) {
          n.__e(l3, u3);
        }
      t3.base = t3.__P = null;
    }
    if (t3 = l2.__k)
      for (o3 = 0; o3 < t3.length; o3++)
        t3[o3] && L(t3[o3], u3, i3);
    r3 != null && s(r3);
  }
  function M(n2, l2, u3) {
    return this.constructor(n2, u3);
  }
  function N(l2, u3, i3) {
    var t3, r3, e3;
    n.__ && n.__(l2, u3), r3 = (t3 = typeof i3 == "function") ? null : i3 && i3.__k || u3.__k, e3 = [], T(u3, l2 = (!t3 && i3 || u3).__k = a(y, null, [l2]), r3 || o, o, u3.ownerSVGElement !== void 0, !t3 && i3 ? [i3] : r3 ? null : u3.firstChild ? f.slice.call(u3.childNodes) : null, e3, !t3 && i3 ? i3 : r3 ? r3.__e : u3.firstChild, t3), j(e3, l2);
  }
  n = {__e: function(n2, l2) {
    for (var u3, i3, t3; l2 = l2.__; )
      if ((u3 = l2.__c) && !u3.__)
        try {
          if ((i3 = u3.constructor) && i3.getDerivedStateFromError != null && (u3.setState(i3.getDerivedStateFromError(n2)), t3 = u3.__d), u3.componentDidCatch != null && (u3.componentDidCatch(n2), t3 = u3.__d), t3)
            return u3.__E = u3;
        } catch (l3) {
          n2 = l3;
        }
    throw n2;
  }, __v: 0}, l = function(n2) {
    return n2 != null && n2.constructor === void 0;
  }, p.prototype.setState = function(n2, l2) {
    var u3;
    u3 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), typeof n2 == "function" && (n2 = n2(c({}, u3), this.props)), n2 && c(u3, n2), n2 != null && this.__v && (l2 && this.__h.push(l2), k(this));
  }, p.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), k(this));
  }, p.prototype.render = y, u = [], i = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, m.__r = 0, r = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var u2;
  var r2;
  var o2 = 0;
  var i2 = [];
  var c2 = n.__b;
  var f2 = n.__r;
  var e2 = n.diffed;
  var a2 = n.__c;
  var v2 = n.unmount;
  function m2(t3, r3) {
    n.__h && n.__h(u2, t3, o2 || r3), o2 = 0;
    var i3 = u2.__H || (u2.__H = {__: [], __h: []});
    return t3 >= i3.__.length && i3.__.push({}), i3.__[t3];
  }
  function y2(r3, o3) {
    var i3 = m2(t2++, 3);
    !n.__s && k2(i3.__H, o3) && (i3.__ = r3, i3.__H = o3, u2.__H.__h.push(i3));
  }
  function s2(n2) {
    return o2 = 5, d2(function() {
      return {current: n2};
    }, []);
  }
  function d2(n2, u3) {
    var r3 = m2(t2++, 7);
    return k2(r3.__H, u3) && (r3.__ = n2(), r3.__H = u3, r3.__h = n2), r3.__;
  }
  function x2() {
    i2.forEach(function(t3) {
      if (t3.__P)
        try {
          t3.__H.__h.forEach(g2), t3.__H.__h.forEach(j2), t3.__H.__h = [];
        } catch (u3) {
          t3.__H.__h = [], n.__e(u3, t3.__v);
        }
    }), i2 = [];
  }
  n.__b = function(n2) {
    u2 = null, c2 && c2(n2);
  }, n.__r = function(n2) {
    f2 && f2(n2), t2 = 0;
    var r3 = (u2 = n2.__c).__H;
    r3 && (r3.__h.forEach(g2), r3.__h.forEach(j2), r3.__h = []);
  }, n.diffed = function(t3) {
    e2 && e2(t3);
    var o3 = t3.__c;
    o3 && o3.__H && o3.__H.__h.length && (i2.push(o3) !== 1 && r2 === n.requestAnimationFrame || ((r2 = n.requestAnimationFrame) || function(n2) {
      var t4, u3 = function() {
        clearTimeout(r3), b2 && cancelAnimationFrame(t4), setTimeout(n2);
      }, r3 = setTimeout(u3, 100);
      b2 && (t4 = requestAnimationFrame(u3));
    })(x2)), u2 = void 0;
  }, n.__c = function(t3, u3) {
    u3.some(function(t4) {
      try {
        t4.__h.forEach(g2), t4.__h = t4.__h.filter(function(n2) {
          return !n2.__ || j2(n2);
        });
      } catch (r3) {
        u3.some(function(n2) {
          n2.__h && (n2.__h = []);
        }), u3 = [], n.__e(r3, t4.__v);
      }
    }), a2 && a2(t3, u3);
  }, n.unmount = function(t3) {
    v2 && v2(t3);
    var u3 = t3.__c;
    if (u3 && u3.__H)
      try {
        u3.__H.__.forEach(g2);
      } catch (t4) {
        n.__e(t4, u3.__v);
      }
  };
  var b2 = typeof requestAnimationFrame == "function";
  function g2(n2) {
    var t3 = u2;
    typeof n2.__c == "function" && n2.__c(), u2 = t3;
  }
  function j2(n2) {
    var t3 = u2;
    n2.__c = n2.__(), u2 = t3;
  }
  function k2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, u3) {
      return t4 !== n2[u3];
    });
  }

  // util.ts
  var loadImage = (url) => {
    return new Promise((r3) => {
      let i3 = new Image();
      i3.onload = () => r3(i3);
      i3.src = url;
    });
  };
  var getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  // board.ts
  var generateBoard = (height, width, images) => {
    const result = [];
    for (let x3 = 0; x3 < width; x3++) {
      for (let y3 = 0; y3 < height; y3++) {
        const choose = getRandomInt(images.length);
        const direction = getRandomInt(4);
        const img = images[choose];
        result.push({
          x: x3,
          y: y3,
          z: 0,
          image: img,
          direction,
          alpha: 1
        });
      }
    }
    return result;
  };
  var getNextCursorAdjacentTile = (board, ss, s4) => {
    let ox = (-board.width * s4 - ss.offsetX - s4) / 2;
    let oy = (ss.offsetY - s4) / 2;
    let x3 = Math.floor((ss.cursorY / (2 * ss.scale) - oy) / (s4 / 2) + (-ss.cursorX / (ss.scale * 2) - ox) / s4);
    let y3 = Math.floor((ss.cursorY / (2 * ss.scale) - oy) / (s4 / 2) - (-ss.cursorX / (ss.scale * 2) - ox) / s4);
    x3 = Math.min(board.width - 1, Math.max(0, x3));
    y3 = Math.min(board.height - 1, Math.max(0, y3));
    return {
      x: x3,
      y: y3
    };
  };

  // building.ts
  var BuildingType;
  (function(BuildingType3) {
    BuildingType3[BuildingType3["house"] = 0] = "house";
    BuildingType3[BuildingType3["large_block"] = 1] = "large_block";
  })(BuildingType || (BuildingType = {}));
  var buildingTypes = [0, 1];
  var buildingDimensions = {
    [0]: {
      width: 1,
      height: 1
    },
    [1]: {
      width: 2,
      height: 2
    }
  };
  var getDrawableForBuilding = (building, image) => {
    return {
      x: building.x,
      y: building.y,
      z: 0,
      image,
      direction: 3,
      alpha: 1
    };
  };
  var buildingImagePaths = {
    [0]: "./house.png",
    [1]: "./house_large.png"
  };
  var loadBuildingImages = async () => {
    let result = {};
    for (const [key, value] of Object.entries(buildingImagePaths)) {
      result[key] = await loadImage(value);
    }
    return result;
  };
  var getBuildingOverlay = (board, ss, s4, image) => {
    const tile = getNextCursorAdjacentTile(board, ss, s4);
    const x3 = tile.x;
    const y3 = tile.y;
    return {
      x: x3,
      y: y3,
      z: 0,
      image,
      direction: 3,
      alpha: 0.8
    };
  };
  var build = (gameState, board, ss, s4, type) => {
    const tile = getNextCursorAdjacentTile(board, ss, s4);
    const x3 = tile.x;
    const y3 = tile.y;
    gameState.buildings.push({
      x: x3,
      y: y3,
      type
    });
  };

  // gamestate.ts
  function updateState(state, timeDelta) {
    return state;
  }

  // screen.ts
  var s3 = 78;
  var setUpCanvas = (canvas, ss) => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const interfaceRight = 200;
    const interfaceTop = 20;
    canvas.width = vw - interfaceRight;
    canvas.height = vh - interfaceTop;
    canvas.addEventListener("mousemove", (event) => {
      ss.moveX = 0;
      ss.moveY = 0;
      const speed = 10;
      const edge = 30;
      if (event.offsetX < edge) {
        ss.moveX = speed;
      }
      if (event.offsetY < edge) {
        ss.moveY = speed;
      }
      if (event.offsetX > canvas.width - edge) {
        ss.moveX = -speed;
      }
      if (event.offsetY > canvas.height - edge) {
        ss.moveY = -speed;
      }
    });
    canvas.addEventListener("mouseleave", (event) => {
      ss.moveX = 0;
      ss.moveY = 0;
    });
    canvas.addEventListener("mousemove", (event) => {
      ss.cursorX = event.offsetX;
      ss.cursorY = event.offsetY;
    });
    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "w":
          ss.scale = Math.min(ss.scale + 0.25, 1.5);
          console.log(ss.scale);
          break;
        case "s":
          ss.scale = Math.max(0.5, ss.scale - 0.25);
          break;
      }
    });
  };
  var draw = (ctx, x3, y3, board, ss, img, direction, alpha) => {
    const actualS = img.width / 4 - 4;
    const dx = (s3 * (board.width - x3 + y3) + ss.offsetX - (actualS - s3) / 2) * ss.scale;
    const dy = ((x3 + y3) * (s3 / 2) - img.height + ss.offsetY) * ss.scale;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, 2 + img.width / 4 * direction, 2, img.width / 4 - 4, img.height - 4, dx, dy, (img.width / 4 - 4) * ss.scale, (img.height - 4) * ss.scale);
    ctx.globalAlpha = 1;
  };

  // index.tsx
  var divider = window.navigator.platform.toLowerCase().indexOf("mac") === -1 ? window.devicePixelRatio : 1;
  var screenState = {
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    cursorX: 0,
    cursorY: 0,
    moveX: 0,
    moveY: 0,
    buildMode: null
  };
  var start = async () => {
    const images = [await loadImage("./grass.png"), await loadImage("./flowers.png"), await loadImage("./dirt.png")];
    const buildingImages = await loadBuildingImages();
    const width = 12;
    const height = 12;
    let board = {
      width,
      height,
      drawables: generateBoard(height, width, images)
    };
    function Isometric(props) {
      const canvasRef = s2(null);
      let gameState = {buildings: []};
      y2(() => {
        const canvas = canvasRef.current;
        let lastTime = null;
        if (canvas) {
          setUpCanvas(canvas, screenState);
          let animationFrameId;
          const drawBoard = (time) => {
            const timeFactor = lastTime === null ? 0 : (time - lastTime) / 10;
            lastTime = time;
            screenState.offsetX += timeFactor * screenState.moveX / divider / screenState.scale;
            screenState.offsetY += timeFactor * screenState.moveY / divider / screenState.scale;
            gameState = updateState(gameState, time - lastTime);
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              const buildingDrawables = gameState.buildings.map((b3) => getDrawableForBuilding(b3, buildingImages[b3.type]));
              const tileDrawables = [...board.drawables];
              const allDrawables = [...tileDrawables, ...buildingDrawables];
              if (screenState.buildMode !== null)
                allDrawables.push(getBuildingOverlay(board, screenState, s3, buildingImages[screenState.buildMode]));
              allDrawables.sort((a3, b3) => a3.x + a3.y < b3.x + b3.y ? -1 : 1).forEach((d3) => draw(ctx, d3.x, d3.y, board, screenState, d3.image, d3.direction, d3.alpha));
            }
            animationFrameId = requestAnimationFrame(drawBoard);
          };
          requestAnimationFrame(drawBoard);
          return () => {
            window.cancelAnimationFrame(animationFrameId);
          };
        }
      }, []);
      const renderBuildingButtons = () => {
        return buildingTypes.map((t3) => /* @__PURE__ */ a("div", {
          className: "building"
        }, /* @__PURE__ */ a("button", {
          onClick: () => {
            screenState.buildMode = t3;
          }
        }, /* @__PURE__ */ a("img", {
          src: buildingImagePaths[t3]
        }))));
      };
      return /* @__PURE__ */ a(y, null, /* @__PURE__ */ a("div", {
        className: "top"
      }, "top"), /* @__PURE__ */ a("div", {
        className: "main"
      }, /* @__PURE__ */ a("canvas", {
        onMouseUp: () => {
          if (screenState.buildMode !== null)
            build(gameState, board, screenState, s3, screenState.buildMode);
        },
        ref: canvasRef,
        id: "main-canvas",
        width: "1500",
        height: "1000"
      }), /* @__PURE__ */ a("div", {
        className: "right"
      }, /* @__PURE__ */ a("h2", null, "Buildings"), renderBuildingButtons())));
    }
    N(/* @__PURE__ */ a(Isometric, null), document.body);
  };
  start();
})();
//# sourceMappingURL=index.js.map
