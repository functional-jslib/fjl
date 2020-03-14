(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./assignDeep", "../jsPlatform/object", "../list/utils", "../function/curry"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./assignDeep"), require("../jsPlatform/object"), require("../list/utils"), require("../function/curry"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.assignDeep, global.object, global.utils, global.curry);
    global.setTheory = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _assignDeep, _object, _utils, _curry) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.objComplement = _exports.objDifference = _exports.objIntersect = _exports.objUnion = void 0;
  var objUnion = (0, _curry.curry)(function (obj1, obj2) {
    return (0, _assignDeep.assignDeep)(obj1, obj2);
  }),
      objIntersect = (0, _curry.curry)(function (obj1, obj2) {
    return (0, _utils.reduce)(function (agg, key) {
      if (obj2.hasOwnProperty(key)) {
        agg[key] = obj2[key];
      }

      return agg;
    }, {}, (0, _object.keys)(obj1));
  }),
      objDifference = (0, _curry.curry)(function (obj1, obj2) {
    return (0, _utils.reduce)(function (agg, key) {
      if (!obj2.hasOwnProperty(key)) {
        agg[key] = obj1[key];
      }

      return agg;
    }, {}, (0, _object.keys)(obj1));
  }),
      objComplement = (0, _curry.curry2)(function (obj0) {
    for (var _len = arguments.length, objs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      objs[_key - 1] = arguments[_key];
    }

    return (0, _utils.reduce)(function (agg, obj) {
      return (0, _assignDeep.assignDeep)(agg, objDifference(obj, obj0));
    }, {}, objs);
  });
  _exports.objComplement = objComplement;
  _exports.objDifference = objDifference;
  _exports.objIntersect = objIntersect;
  _exports.objUnion = objUnion;
});