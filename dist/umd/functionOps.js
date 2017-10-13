(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './functionOps/call', './functionOps/apply', './uncurried/functionOps/curry_', './uncurried/functionOps/curry__', './uncurried/functionOps/negate_', './uncurried/functionOps/id_', './uncurried/functionOps/compose_', './functionOps/flip', './functionOps/until'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./functionOps/call'), require('./functionOps/apply'), require('./uncurried/functionOps/curry_'), require('./uncurried/functionOps/curry__'), require('./uncurried/functionOps/negate_'), require('./uncurried/functionOps/id_'), require('./uncurried/functionOps/compose_'), require('./functionOps/flip'), require('./functionOps/until'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.call, global.apply, global.curry_, global.curry__, global.negate_, global.id_, global.compose_, global.flip, global.until);
    global.functionOps = mod.exports;
  }
})(this, function (exports, _call, _apply, _curry_, _curry__, _negate_, _id_, _compose_, _flip, _until) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_call).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _call[key];
      }
    });
  });
  Object.keys(_apply).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _apply[key];
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
  Object.keys(_negate_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _negate_[key];
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
  Object.keys(_compose_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _compose_[key];
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