'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assignDeep = require('./objectOps/assignDeep');

Object.keys(_assignDeep).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _assignDeep[key];
    }
  });
});

var _objectUncurried = require('./jsPlatform/objectUncurried');

Object.keys(_objectUncurried).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _objectUncurried[key];
    }
  });
});

var _typeOf = require('./objectOps/typeOf');

Object.keys(_typeOf).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _typeOf[key];
    }
  });
});

var _is = require('./objectOps/is');

Object.keys(_is).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _is[key];
    }
  });
});

var _of = require('./objectOps/of');

Object.keys(_of).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _of[key];
    }
  });
});

var _setTheory = require('./objectOps/setTheory');

Object.keys(_setTheory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _setTheory[key];
    }
  });
});

var _prop = require('./objectOps/prop');

Object.keys(_prop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _prop[key];
    }
  });
});