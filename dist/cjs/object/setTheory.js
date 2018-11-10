"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = void 0;

var _assignDeep = require("./assignDeep");

var _object = require("../jsPlatform/object");

var _utils = require("../list/utils");

var _curry = require("../function/curry");

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
exports.objComplement = objComplement;
exports.objDifference = objDifference;
exports.objIntersect = objIntersect;
exports.objUnion = objUnion;