'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _function = require('./jsPlatform/function');

Object.keys(_function).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _function[key];
    }
  });
});

var _compose = require('./function/compose');

Object.keys(_compose).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _compose[key];
    }
  });
});

var _curry = require('./function/curry');

Object.keys(_curry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _curry[key];
    }
  });
});

var _flip = require('./function/flip');

Object.keys(_flip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _flip[key];
    }
  });
});

var _id = require('./function/id');

Object.keys(_id).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _id[key];
    }
  });
});

var _negate = require('./function/negate');

Object.keys(_negate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _negate[key];
    }
  });
});

var _until = require('./function/until');

Object.keys(_until).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _until[key];
    }
  });
});

var _fnOrError = require('./function/fnOrError');

Object.keys(_fnOrError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fnOrError[key];
    }
  });
});

var _noop = require('./function/noop');

Object.keys(_noop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _noop[key];
    }
  });
});