(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './objectOps/objectOps', './booleanOps/booleanOps', './functionOps/functionOps', './listOps/listOps', './numberOps/numberOps', './stringOps/stringOps', './compoundedOps/compoundedOps', '../generated-for-src/version'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./objectOps/objectOps'), require('./booleanOps/booleanOps'), require('./functionOps/functionOps'), require('./listOps/listOps'), require('./numberOps/numberOps'), require('./stringOps/stringOps'), require('./compoundedOps/compoundedOps'), require('../generated-for-src/version'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectOps, global.booleanOps, global.functionOps, global.listOps, global.numberOps, global.stringOps, global.compoundedOps, global.version);
    global.fjl = mod.exports;
  }
})(this, function (exports, _objectOps, _booleanOps, _functionOps, _listOps, _numberOps, _stringOps, _compoundedOps, _version) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_objectOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _objectOps[key];
      }
    });
  });
  Object.keys(_booleanOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _booleanOps[key];
      }
    });
  });
  Object.keys(_functionOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _functionOps[key];
      }
    });
  });
  Object.keys(_listOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _listOps[key];
      }
    });
  });
  Object.keys(_numberOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _numberOps[key];
      }
    });
  });
  Object.keys(_stringOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _stringOps[key];
      }
    });
  });
  Object.keys(_compoundedOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _compoundedOps[key];
      }
    });
  });
  Object.defineProperty(exports, 'version', {
    enumerable: true,
    get: function () {
      return _version.version;
    }
  });
});