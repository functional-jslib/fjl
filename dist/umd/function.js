(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './jsPlatform/function', './function/compose', './function/curry', './function/flip', './function/id', './function/negate', './function/until', './function/fnOrError', './function/noop'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./jsPlatform/function'), require('./function/compose'), require('./function/curry'), require('./function/flip'), require('./function/id'), require('./function/negate'), require('./function/until'), require('./function/fnOrError'), require('./function/noop'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._function, global.compose, global.curry, global.flip, global.id, global.negate, global.until, global.fnOrError, global.noop);
    global._function = mod.exports;
  }
})(this, function (exports, _function, _compose, _curry, _flip, _id, _negate, _until, _fnOrError, _noop) {
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
  Object.keys(_fnOrError).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _fnOrError[key];
      }
    });
  });
  Object.keys(_noop).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _noop[key];
      }
    });
  });
});