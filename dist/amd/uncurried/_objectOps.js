define(['exports', './_jsPlatform/object_', './_objectOps/prop_', './_objectOps/typeOf_', './_objectOps/is_', './_objectOps/of_', './_objectOps/assignDeep_', './_objectOps/setTheory_'], function (exports, _object_, _prop_, _typeOf_, _is_, _of_, _assignDeep_, _setTheory_) {
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