(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './_jsPlatform/_function', './_functionOps/_compose', './_functionOps/_curry', './_functionOps/__curry', './_functionOps/_flip', './_functionOps/_id', './_functionOps/_negate', './_functionOps/_until'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./_jsPlatform/_function'), require('./_functionOps/_compose'), require('./_functionOps/_curry'), require('./_functionOps/__curry'), require('./_functionOps/_flip'), require('./_functionOps/_id'), require('./_functionOps/_negate'), require('./_functionOps/_until'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._function, global._compose, global._curry, global.__curry, global._flip, global._id, global._negate, global._until);
    global._functionOps = mod.exports;
  }
})(this, function (exports, _function, _compose, _curry, _curry2, _flip, _id, _negate, _until) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'apply', {
    enumerable: true,
    get: function () {
      return _function.apply;
    }
  });
  Object.defineProperty(exports, 'call', {
    enumerable: true,
    get: function () {
      return _function.call;
    }
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