'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assignDeep_ = require('./objectOps/assignDeep_');

Object.keys(_assignDeep_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _assignDeep_[key];
    }
  });
});

var _object_ = require('./jsPlatform/object_');

Object.keys(_object_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _object_[key];
    }
  });
});

var _typeOf_ = require('./objectOps/typeOf_');

Object.keys(_typeOf_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _typeOf_[key];
    }
  });
});

var _is_ = require('./objectOps/is_');

Object.keys(_is_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _is_[key];
    }
  });
});

var _of_ = require('./objectOps/of_');

Object.keys(_of_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _of_[key];
    }
  });
});

var _setTheory_ = require('./objectOps/setTheory_');

Object.keys(_setTheory_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _setTheory_[key];
    }
  });
});

var _prop_ = require('./objectOps/prop_');

Object.keys(_prop_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _prop_[key];
    }
  });
});