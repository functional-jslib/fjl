(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './functionOps/apply_', './functionOps/call_', './functionOps/compose_', './functionOps/curry_', './functionOps/curry__', './functionOps/flip_', './functionOps/id_', './functionOps/negate_', './functionOps/until_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./functionOps/apply_'), require('./functionOps/call_'), require('./functionOps/compose_'), require('./functionOps/curry_'), require('./functionOps/curry__'), require('./functionOps/flip_'), require('./functionOps/id_'), require('./functionOps/negate_'), require('./functionOps/until_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.apply_, global.call_, global.compose_, global.curry_, global.curry__, global.flip_, global.id_, global.negate_, global.until_);
    global.functionOps_ = mod.exports;
  }
})(this, function (exports, _apply_, _call_, _compose_, _curry_, _curry__, _flip_, _id_, _negate_, _until_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_apply_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _apply_[key];
      }
    });
  });
  Object.keys(_call_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _call_[key];
      }
    });
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