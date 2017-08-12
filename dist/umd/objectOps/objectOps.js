(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './instanceOf', './typeOf', './is', './of', './setTheoryOps'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./instanceOf'), require('./typeOf'), require('./is'), require('./of'), require('./setTheoryOps'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.instanceOf, global.typeOf, global.is, global.of, global.setTheoryOps);
    global.objectOps = mod.exports;
  }
})(this, function (exports, _instanceOf, _typeOf, _is, _of, _setTheoryOps) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_instanceOf).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _instanceOf[key];
      }
    });
  });
  Object.keys(_typeOf).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _typeOf[key];
      }
    });
  });
  Object.keys(_is).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _is[key];
      }
    });
  });
  Object.keys(_of).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _of[key];
      }
    });
  });
  Object.keys(_setTheoryOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _setTheoryOps[key];
      }
    });
  });
});