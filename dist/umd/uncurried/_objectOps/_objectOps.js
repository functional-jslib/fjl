(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_jsPlatform/_object', './_prop', './_typeOf', './_is', './_of', './_assignDeep', './_setTheory', './_console', './_errorThrowing', './_jsonClone', './_toArray', './_assocList'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_jsPlatform/_object'), require('./_prop'), require('./_typeOf'), require('./_is'), require('./_of'), require('./_assignDeep'), require('./_setTheory'), require('./_console'), require('./_errorThrowing'), require('./_jsonClone'), require('./_toArray'), require('./_assocList'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._object, global._prop, global._typeOf, global._is, global._of, global._assignDeep, global._setTheory, global._console, global._errorThrowing, global._jsonClone, global._toArray, global._assocList);
    global._objectOps = mod.exports;
  }
})(this, function (exports, _object, _prop, _typeOf, _is, _of, _assignDeep, _setTheory, _console, _errorThrowing, _jsonClone, _toArray, _assocList) {
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
  Object.keys(_console).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _console[key];
      }
    });
  });
  Object.keys(_errorThrowing).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _errorThrowing[key];
      }
    });
  });
  Object.keys(_jsonClone).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _jsonClone[key];
      }
    });
  });
  Object.keys(_toArray).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _toArray[key];
      }
    });
  });
  Object.keys(_assocList).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _assocList[key];
      }
    });
  });
});