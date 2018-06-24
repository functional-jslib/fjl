(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './jsPlatform/function', './function/compose', './function/curry', './function/_curry', './function/flip', './function/id', './function/negate', './function/until'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./jsPlatform/function'), require('./function/compose'), require('./function/curry'), require('./function/_curry'), require('./function/flip'), require('./function/id'), require('./function/negate'), require('./function/until'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._function, global.compose, global.curry, global._curry, global.flip, global.id, global.negate, global.until);
    global._function = mod.exports;
  }
})(this, function (exports, _function, _compose, _curry, _curry2, _flip, _id, _negate, _until) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_function).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _function[key];
      }
    });
  });
  Object.keys(_compose).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _compose[key];
      }
    });
  });
  Object.keys(_curry).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _curry[key];
      }
    });
  });
  Object.keys(_curry2).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _curry2[key];
      }
    });
  });
  Object.keys(_flip).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _flip[key];
      }
    });
  });
  Object.keys(_id).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _id[key];
      }
    });
  });
  Object.keys(_negate).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _negate[key];
      }
    });
  });
  Object.keys(_until).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _until[key];
      }
    });
  });
});