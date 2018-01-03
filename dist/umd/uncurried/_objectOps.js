(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './jsPlatform/object_', './objectOps/prop_', './objectOps/typeOf_', './objectOps/is_', './objectOps/of_', './objectOps/assignDeep_', './objectOps/setTheory_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./jsPlatform/object_'), require('./objectOps/prop_'), require('./objectOps/typeOf_'), require('./objectOps/is_'), require('./objectOps/of_'), require('./objectOps/assignDeep_'), require('./objectOps/setTheory_'));
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