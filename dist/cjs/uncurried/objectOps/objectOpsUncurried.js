'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assignDeep = require('./assignDeep');

Object.keys(_assignDeep).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _assignDeep[key];
    }
  });
});

var _objectUncurried = require('../jsPlatform/object_');

Object.keys(_objectUncurried).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _objectUncurried[key];
    }
  });
});

var _typeOf = require('./typeOf');

Object.keys(_typeOf).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _typeOf[key];
    }
  });
});

var _is = require('./is');

Object.keys(_is).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _is[key];
    }
  });
});

var _of = require('./of');

Object.keys(_of).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _of[key];
    }
  });
});

var _setTheory = require('./setTheory');

Object.keys(_setTheory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _setTheory[key];
    }
  });
});

var _prop = require('./prop');

Object.keys(_prop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _prop[key];
    }
  });
});