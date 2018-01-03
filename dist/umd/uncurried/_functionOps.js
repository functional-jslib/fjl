(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './jsPlatform/function_', './_functionOps/compose_', './_functionOps/curry_', './_functionOps/curry__', './_functionOps/flip_', './_functionOps/id_', './_functionOps/negate_', './_functionOps/until_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./jsPlatform/function_'), require('./_functionOps/compose_'), require('./_functionOps/curry_'), require('./_functionOps/curry__'), require('./_functionOps/flip_'), require('./_functionOps/id_'), require('./_functionOps/negate_'), require('./_functionOps/until_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.function_, global.compose_, global.curry_, global.curry__, global.flip_, global.id_, global.negate_, global.until_);
    global._functionOps = mod.exports;
  }
})(this, function (exports, _function_, _compose_, _curry_, _curry__, _flip_, _id_, _negate_, _until_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'apply', {
    enumerable: true,
    get: function () {
      return _function_.apply;
    }
  });
  Object.defineProperty(exports, 'call', {
    enumerable: true,
    get: function () {
      return _function_.call;
    }
  });
  Object.keys(_compose_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _compose_[key];
      }
    });
  });
  Object.keys(_curry_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _curry_[key];
      }
    });
  });
  Object.keys(_curry__).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _curry__[key];
      }
    });
  });
  Object.keys(_flip_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _flip_[key];
      }
    });
  });
  Object.keys(_id_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _id_[key];
      }
    });
  });
  Object.keys(_negate_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _negate_[key];
      }
    });
  });
  Object.keys(_until_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _until_[key];
      }
    });
  });
});