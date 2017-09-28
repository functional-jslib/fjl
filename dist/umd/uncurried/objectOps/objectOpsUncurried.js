(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './assignDeep', '../jsPlatform/objectUncurried', './typeOf', './is', './of', './setTheoryOps', './prop'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./assignDeep'), require('../jsPlatform/objectUncurried'), require('./typeOf'), require('./is'), require('./of'), require('./setTheoryOps'), require('./prop'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.assignDeep, global.objectUncurried, global.typeOf, global.is, global.of, global.setTheoryOps, global.prop);
    global.objectOpsUncurried = mod.exports;
  }
})(this, function (exports, _assignDeep, _objectUncurried, _typeOf, _is, _of, _setTheoryOps, _prop) {
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
  Object.keys(_setTheoryOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _setTheoryOps[key];
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