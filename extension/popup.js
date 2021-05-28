(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e3) {
          reject(e3);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e3) {
          reject(e3);
        }
      };
      var step = (x3) => x3.done ? resolve(x3.value) : Promise.resolve(x3.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var o;
  var r = {};
  var f = [];
  var e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function c(n2, l3) {
    for (var u3 in l3)
      n2[u3] = l3[u3];
    return n2;
  }
  function s(n2) {
    var l3 = n2.parentNode;
    l3 && l3.removeChild(n2);
  }
  function a(n2, l3, u3) {
    var i3, t3, o3, r3 = arguments, f3 = {};
    for (o3 in l3)
      o3 == "key" ? i3 = l3[o3] : o3 == "ref" ? t3 = l3[o3] : f3[o3] = l3[o3];
    if (arguments.length > 3)
      for (u3 = [u3], o3 = 3; o3 < arguments.length; o3++)
        u3.push(r3[o3]);
    if (u3 != null && (f3.children = u3), typeof n2 == "function" && n2.defaultProps != null)
      for (o3 in n2.defaultProps)
        f3[o3] === void 0 && (f3[o3] = n2.defaultProps[o3]);
    return v(n2, f3, i3, t3, null);
  }
  function v(l3, u3, i3, t3, o3) {
    var r3 = { type: l3, props: u3, key: i3, ref: t3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: o3 == null ? ++n.__v : o3 };
    return n.vnode != null && n.vnode(r3), r3;
  }
  function y(n2) {
    return n2.children;
  }
  function p(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function d(n2, l3) {
    if (l3 == null)
      return n2.__ ? d(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++)
      if ((u3 = n2.__k[l3]) != null && u3.__e != null)
        return u3.__e;
    return typeof n2.type == "function" ? d(n2) : null;
  }
  function _(n2) {
    var l3, u3;
    if ((n2 = n2.__) != null && n2.__c != null) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++)
        if ((u3 = n2.__k[l3]) != null && u3.__e != null) {
          n2.__e = n2.__c.base = u3.__e;
          break;
        }
      return _(n2);
    }
  }
  function k(l3) {
    (!l3.__d && (l3.__d = true) && u.push(l3) && !b.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(b);
  }
  function b() {
    for (var n2; b.__r = u.length; )
      n2 = u.sort(function(n3, l3) {
        return n3.__v.__b - l3.__v.__b;
      }), u = [], n2.some(function(n3) {
        var l3, u3, i3, t3, o3, r3;
        n3.__d && (o3 = (t3 = (l3 = n3).__v).__e, (r3 = l3.__P) && (u3 = [], (i3 = c({}, t3)).__v = t3.__v + 1, I(r3, t3, i3, l3.__n, r3.ownerSVGElement !== void 0, t3.__h != null ? [o3] : null, u3, o3 == null ? d(t3) : o3, t3.__h), T(u3, t3), t3.__e != o3 && _(t3)));
      });
  }
  function m(n2, l3, u3, i3, t3, o3, e3, c3, s2, a3) {
    var h, p3, _2, k2, b3, m3, w2, A2 = i3 && i3.__k || f, P2 = A2.length;
    for (u3.__k = [], h = 0; h < l3.length; h++)
      if ((k2 = u3.__k[h] = (k2 = l3[h]) == null || typeof k2 == "boolean" ? null : typeof k2 == "string" || typeof k2 == "number" || typeof k2 == "bigint" ? v(null, k2, null, null, k2) : Array.isArray(k2) ? v(y, { children: k2 }, null, null, null) : k2.__b > 0 ? v(k2.type, k2.props, k2.key, null, k2.__v) : k2) != null) {
        if (k2.__ = u3, k2.__b = u3.__b + 1, (_2 = A2[h]) === null || _2 && k2.key == _2.key && k2.type === _2.type)
          A2[h] = void 0;
        else
          for (p3 = 0; p3 < P2; p3++) {
            if ((_2 = A2[p3]) && k2.key == _2.key && k2.type === _2.type) {
              A2[p3] = void 0;
              break;
            }
            _2 = null;
          }
        I(n2, k2, _2 = _2 || r, t3, o3, e3, c3, s2, a3), b3 = k2.__e, (p3 = k2.ref) && _2.ref != p3 && (w2 || (w2 = []), _2.ref && w2.push(_2.ref, null, k2), w2.push(p3, k2.__c || b3, k2)), b3 != null ? (m3 == null && (m3 = b3), typeof k2.type == "function" && k2.__k != null && k2.__k === _2.__k ? k2.__d = s2 = g(k2, s2, n2) : s2 = x(n2, k2, _2, A2, b3, s2), a3 || u3.type !== "option" ? typeof u3.type == "function" && (u3.__d = s2) : n2.value = "") : s2 && _2.__e == s2 && s2.parentNode != n2 && (s2 = d(_2));
      }
    for (u3.__e = m3, h = P2; h--; )
      A2[h] != null && (typeof u3.type == "function" && A2[h].__e != null && A2[h].__e == u3.__d && (u3.__d = d(i3, h + 1)), L(A2[h], A2[h]));
    if (w2)
      for (h = 0; h < w2.length; h++)
        z(w2[h], w2[++h], w2[++h]);
  }
  function g(n2, l3, u3) {
    var i3, t3;
    for (i3 = 0; i3 < n2.__k.length; i3++)
      (t3 = n2.__k[i3]) && (t3.__ = n2, l3 = typeof t3.type == "function" ? g(t3, l3, u3) : x(u3, t3, t3, n2.__k, t3.__e, l3));
    return l3;
  }
  function x(n2, l3, u3, i3, t3, o3) {
    var r3, f3, e3;
    if (l3.__d !== void 0)
      r3 = l3.__d, l3.__d = void 0;
    else if (u3 == null || t3 != o3 || t3.parentNode == null)
      n:
        if (o3 == null || o3.parentNode !== n2)
          n2.appendChild(t3), r3 = null;
        else {
          for (f3 = o3, e3 = 0; (f3 = f3.nextSibling) && e3 < i3.length; e3 += 2)
            if (f3 == t3)
              break n;
          n2.insertBefore(t3, o3), r3 = o3;
        }
    return r3 !== void 0 ? r3 : t3.nextSibling;
  }
  function A(n2, l3, u3, i3, t3) {
    var o3;
    for (o3 in u3)
      o3 === "children" || o3 === "key" || o3 in l3 || C(n2, o3, null, u3[o3], i3);
    for (o3 in l3)
      t3 && typeof l3[o3] != "function" || o3 === "children" || o3 === "key" || o3 === "value" || o3 === "checked" || u3[o3] === l3[o3] || C(n2, o3, l3[o3], u3[o3], i3);
  }
  function P(n2, l3, u3) {
    l3[0] === "-" ? n2.setProperty(l3, u3) : n2[l3] = u3 == null ? "" : typeof u3 != "number" || e.test(l3) ? u3 : u3 + "px";
  }
  function C(n2, l3, u3, i3, t3) {
    var o3;
    n:
      if (l3 === "style")
        if (typeof u3 == "string")
          n2.style.cssText = u3;
        else {
          if (typeof i3 == "string" && (n2.style.cssText = i3 = ""), i3)
            for (l3 in i3)
              u3 && l3 in u3 || P(n2.style, l3, "");
          if (u3)
            for (l3 in u3)
              i3 && u3[l3] === i3[l3] || P(n2.style, l3, u3[l3]);
        }
      else if (l3[0] === "o" && l3[1] === "n")
        o3 = l3 !== (l3 = l3.replace(/Capture$/, "")), l3 = l3.toLowerCase() in n2 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + o3] = u3, u3 ? i3 || n2.addEventListener(l3, o3 ? H : $, o3) : n2.removeEventListener(l3, o3 ? H : $, o3);
      else if (l3 !== "dangerouslySetInnerHTML") {
        if (t3)
          l3 = l3.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if (l3 !== "href" && l3 !== "list" && l3 !== "form" && l3 !== "tabIndex" && l3 !== "download" && l3 in n2)
          try {
            n2[l3] = u3 == null ? "" : u3;
            break n;
          } catch (n3) {
          }
        typeof u3 == "function" || (u3 != null && (u3 !== false || l3[0] === "a" && l3[1] === "r") ? n2.setAttribute(l3, u3) : n2.removeAttribute(l3));
      }
  }
  function $(l3) {
    this.l[l3.type + false](n.event ? n.event(l3) : l3);
  }
  function H(l3) {
    this.l[l3.type + true](n.event ? n.event(l3) : l3);
  }
  function I(l3, u3, i3, t3, o3, r3, f3, e3, s2) {
    var a3, v3, h, d2, _2, k2, b3, g3, w2, x3, A2, P2 = u3.type;
    if (u3.constructor !== void 0)
      return null;
    i3.__h != null && (s2 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, r3 = [e3]), (a3 = n.__b) && a3(u3);
    try {
      n:
        if (typeof P2 == "function") {
          if (g3 = u3.props, w2 = (a3 = P2.contextType) && t3[a3.__c], x3 = a3 ? w2 ? w2.props.value : a3.__ : t3, i3.__c ? b3 = (v3 = u3.__c = i3.__c).__ = v3.__E : ("prototype" in P2 && P2.prototype.render ? u3.__c = v3 = new P2(g3, x3) : (u3.__c = v3 = new p(g3, x3), v3.constructor = P2, v3.render = M), w2 && w2.sub(v3), v3.props = g3, v3.state || (v3.state = {}), v3.context = x3, v3.__n = t3, h = v3.__d = true, v3.__h = []), v3.__s == null && (v3.__s = v3.state), P2.getDerivedStateFromProps != null && (v3.__s == v3.state && (v3.__s = c({}, v3.__s)), c(v3.__s, P2.getDerivedStateFromProps(g3, v3.__s))), d2 = v3.props, _2 = v3.state, h)
            P2.getDerivedStateFromProps == null && v3.componentWillMount != null && v3.componentWillMount(), v3.componentDidMount != null && v3.__h.push(v3.componentDidMount);
          else {
            if (P2.getDerivedStateFromProps == null && g3 !== d2 && v3.componentWillReceiveProps != null && v3.componentWillReceiveProps(g3, x3), !v3.__e && v3.shouldComponentUpdate != null && v3.shouldComponentUpdate(g3, v3.__s, x3) === false || u3.__v === i3.__v) {
              v3.props = g3, v3.state = v3.__s, u3.__v !== i3.__v && (v3.__d = false), v3.__v = u3, u3.__e = i3.__e, u3.__k = i3.__k, u3.__k.forEach(function(n2) {
                n2 && (n2.__ = u3);
              }), v3.__h.length && f3.push(v3);
              break n;
            }
            v3.componentWillUpdate != null && v3.componentWillUpdate(g3, v3.__s, x3), v3.componentDidUpdate != null && v3.__h.push(function() {
              v3.componentDidUpdate(d2, _2, k2);
            });
          }
          v3.context = x3, v3.props = g3, v3.state = v3.__s, (a3 = n.__r) && a3(u3), v3.__d = false, v3.__v = u3, v3.__P = l3, a3 = v3.render(v3.props, v3.state, v3.context), v3.state = v3.__s, v3.getChildContext != null && (t3 = c(c({}, t3), v3.getChildContext())), h || v3.getSnapshotBeforeUpdate == null || (k2 = v3.getSnapshotBeforeUpdate(d2, _2)), A2 = a3 != null && a3.type === y && a3.key == null ? a3.props.children : a3, m(l3, Array.isArray(A2) ? A2 : [A2], u3, i3, t3, o3, r3, f3, e3, s2), v3.base = u3.__e, u3.__h = null, v3.__h.length && f3.push(v3), b3 && (v3.__E = v3.__ = null), v3.__e = false;
        } else
          r3 == null && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = j(i3.__e, u3, i3, t3, o3, r3, f3, s2);
      (a3 = n.diffed) && a3(u3);
    } catch (l4) {
      u3.__v = null, (s2 || r3 != null) && (u3.__e = e3, u3.__h = !!s2, r3[r3.indexOf(e3)] = null), n.__e(l4, u3, i3);
    }
  }
  function T(l3, u3) {
    n.__c && n.__c(u3, l3), l3.some(function(u4) {
      try {
        l3 = u4.__h, u4.__h = [], l3.some(function(n2) {
          n2.call(u4);
        });
      } catch (l4) {
        n.__e(l4, u4.__v);
      }
    });
  }
  function j(n2, l3, u3, i3, t3, o3, e3, c3) {
    var a3, v3, h, y2, p3 = u3.props, d2 = l3.props, _2 = l3.type, k2 = 0;
    if (_2 === "svg" && (t3 = true), o3 != null) {
      for (; k2 < o3.length; k2++)
        if ((a3 = o3[k2]) && (a3 === n2 || (_2 ? a3.localName == _2 : a3.nodeType == 3))) {
          n2 = a3, o3[k2] = null;
          break;
        }
    }
    if (n2 == null) {
      if (_2 === null)
        return document.createTextNode(d2);
      n2 = t3 ? document.createElementNS("http://www.w3.org/2000/svg", _2) : document.createElement(_2, d2.is && d2), o3 = null, c3 = false;
    }
    if (_2 === null)
      p3 === d2 || c3 && n2.data === d2 || (n2.data = d2);
    else {
      if (o3 = o3 && f.slice.call(n2.childNodes), v3 = (p3 = u3.props || r).dangerouslySetInnerHTML, h = d2.dangerouslySetInnerHTML, !c3) {
        if (o3 != null)
          for (p3 = {}, y2 = 0; y2 < n2.attributes.length; y2++)
            p3[n2.attributes[y2].name] = n2.attributes[y2].value;
        (h || v3) && (h && (v3 && h.__html == v3.__html || h.__html === n2.innerHTML) || (n2.innerHTML = h && h.__html || ""));
      }
      if (A(n2, d2, p3, t3, c3), h)
        l3.__k = [];
      else if (k2 = l3.props.children, m(n2, Array.isArray(k2) ? k2 : [k2], l3, u3, i3, t3 && _2 !== "foreignObject", o3, e3, n2.firstChild, c3), o3 != null)
        for (k2 = o3.length; k2--; )
          o3[k2] != null && s(o3[k2]);
      c3 || ("value" in d2 && (k2 = d2.value) !== void 0 && (k2 !== n2.value || _2 === "progress" && !k2) && C(n2, "value", k2, p3.value, false), "checked" in d2 && (k2 = d2.checked) !== void 0 && k2 !== n2.checked && C(n2, "checked", k2, p3.checked, false));
    }
    return n2;
  }
  function z(l3, u3, i3) {
    try {
      typeof l3 == "function" ? l3(u3) : l3.current = u3;
    } catch (l4) {
      n.__e(l4, i3);
    }
  }
  function L(l3, u3, i3) {
    var t3, o3, r3;
    if (n.unmount && n.unmount(l3), (t3 = l3.ref) && (t3.current && t3.current !== l3.__e || z(t3, null, u3)), i3 || typeof l3.type == "function" || (i3 = (o3 = l3.__e) != null), l3.__e = l3.__d = void 0, (t3 = l3.__c) != null) {
      if (t3.componentWillUnmount)
        try {
          t3.componentWillUnmount();
        } catch (l4) {
          n.__e(l4, u3);
        }
      t3.base = t3.__P = null;
    }
    if (t3 = l3.__k)
      for (r3 = 0; r3 < t3.length; r3++)
        t3[r3] && L(t3[r3], u3, i3);
    o3 != null && s(o3);
  }
  function M(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function N(l3, u3, i3) {
    var t3, o3, e3;
    n.__ && n.__(l3, u3), o3 = (t3 = typeof i3 == "function") ? null : i3 && i3.__k || u3.__k, e3 = [], I(u3, l3 = (!t3 && i3 || u3).__k = a(y, null, [l3]), o3 || r, r, u3.ownerSVGElement !== void 0, !t3 && i3 ? [i3] : o3 ? null : u3.firstChild ? f.slice.call(u3.childNodes) : null, e3, !t3 && i3 ? i3 : o3 ? o3.__e : u3.firstChild, t3), T(e3, l3);
  }
  n = { __e: function(n2, l3) {
    for (var u3, i3, t3; l3 = l3.__; )
      if ((u3 = l3.__c) && !u3.__)
        try {
          if ((i3 = u3.constructor) && i3.getDerivedStateFromError != null && (u3.setState(i3.getDerivedStateFromError(n2)), t3 = u3.__d), u3.componentDidCatch != null && (u3.componentDidCatch(n2), t3 = u3.__d), t3)
            return u3.__E = u3;
        } catch (l4) {
          n2 = l4;
        }
    throw n2;
  }, __v: 0 }, l = function(n2) {
    return n2 != null && n2.constructor === void 0;
  }, p.prototype.setState = function(n2, l3) {
    var u3;
    u3 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), typeof n2 == "function" && (n2 = n2(c({}, u3), this.props)), n2 && c(u3, n2), n2 != null && this.__v && (l3 && this.__h.push(l3), k(this));
  }, p.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), k(this));
  }, p.prototype.render = y, u = [], i = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, o = 0;

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
    var i3 = u2.__H || (u2.__H = { __: [], __h: [] });
    return t3 >= i3.__.length && i3.__.push({}), i3.__[t3];
  }
  function l2(n2) {
    return o2 = 1, p2(w, n2);
  }
  function p2(n2, r3, o3) {
    var i3 = m2(t2++, 2);
    return i3.t = n2, i3.__c || (i3.__ = [o3 ? o3(r3) : w(void 0, r3), function(n3) {
      var t3 = i3.t(i3.__[0], n3);
      i3.__[0] !== t3 && (i3.__ = [t3, i3.__[1]], i3.__c.setState({}));
    }], i3.__c = u2), i3.__;
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
  function w(n2, t3) {
    return typeof t3 == "function" ? t3(n2) : t3;
  }

  // src/popup/app.tsx
  function App() {
    const [count, setCount] = l2(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount((currentCount) => currentCount - 1);
    return /* @__PURE__ */ a("div", null, /* @__PURE__ */ a("p", null, "Count: ", count), /* @__PURE__ */ a("button", {
      onClick: increment
    }, "Increment"), /* @__PURE__ */ a("button", {
      onClick: decrement
    }, "Decrement"));
  }

  // src/popup/index.tsx
  N(/* @__PURE__ */ a(App, null), document.getElementById("app"));
  var changeColor = document.getElementById("changeColor");
  chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
  });
  changeColor.addEventListener("click", () => __async(void 0, null, function* () {
    let [tab] = yield chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor
    });
  }));
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = "red";
    });
  }
})();
