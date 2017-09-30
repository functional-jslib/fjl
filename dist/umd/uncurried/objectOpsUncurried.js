(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './objectOps/assignDeep', './jsPlatform/objectUncurried', './objectOps/typeOf', './objectOps/is', './objectOps/of', './objectOps/setTheory', './objectOps/prop'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./objectOps/assignDeep'), require('./jsPlatform/objectUncurried'), require('./objectOps/typeOf'), require('./objectOps/is'), require('./objectOps/of'), require('./objectOps/setTheory'), require('./objectOps/prop'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.assignDeep, global.objectUncurried, global.typeOf, global.is, global.of, global.setTheory, global.prop);
    global.objectOpsUncurried = mod.exports;
  }
})(this, function (exports, _assignDeep, _objectUncurried, _typeOf, _is, _of, _setTheory, _prop) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
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
  Object.keys(_objectUncurried).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _objectUncurried[key];
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
  Object.keys(_setTheory).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _setTheory[key];
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
});