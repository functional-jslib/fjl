(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './_jsPlatform/object_', './_objectOps/prop_', './_objectOps/typeOf_', './_objectOps/is_', './_objectOps/of_', './_objectOps/assignDeep_', './_objectOps/setTheory_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./_jsPlatform/object_'), require('./_objectOps/prop_'), require('./_objectOps/typeOf_'), require('./_objectOps/is_'), require('./_objectOps/of_'), require('./_objectOps/assignDeep_'), require('./_objectOps/setTheory_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.object_, global.prop_, global.typeOf_, global.is_, global.of_, global.assignDeep_, global.setTheory_);
    global._objectOps = mod.exports;
  }
})(this, function (exports, _object_, _prop_, _typeOf_, _is_, _of_, _assignDeep_, _setTheory_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_object_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _object_[key];
      }
    });
  });
  Object.keys(_prop_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _prop_[key];
      }
    });
  });
  Object.keys(_typeOf_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _typeOf_[key];
      }
    });
  });
  Object.keys(_is_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _is_[key];
      }
    });
  });
  Object.keys(_of_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _of_[key];
      }
    });
  });
  Object.keys(_assignDeep_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _assignDeep_[key];
      }
    });
  });
  Object.keys(_setTheory_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _setTheory_[key];
      }
    });
  });
});