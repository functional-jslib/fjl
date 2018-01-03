(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './_jsPlatform/_object', './_objectOps/_prop', './_objectOps/_typeOf', './_objectOps/_is', './_objectOps/_of', './_objectOps/_assignDeep', './_objectOps/_setTheory'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./_jsPlatform/_object'), require('./_objectOps/_prop'), require('./_objectOps/_typeOf'), require('./_objectOps/_is'), require('./_objectOps/_of'), require('./_objectOps/_assignDeep'), require('./_objectOps/_setTheory'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._object, global._prop, global._typeOf, global._is, global._of, global._assignDeep, global._setTheory);
    global._objectOps = mod.exports;
  }
})(this, function (exports, _object, _prop, _typeOf, _is, _of, _assignDeep, _setTheory) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_object).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _object[key];
      }
    });
  });
  Object.keys(_prop).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _prop[key];
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
  Object.keys(_assignDeep).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _assignDeep[key];
      }
    });
  });
  Object.keys(_setTheory).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _setTheory[key];
      }
    });
  });
});