'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _function = require('../_jsPlatform/_function');

Object.defineProperty(exports, 'apply', {
  enumerable: true,
  get: function get() {
    return _function.apply;
  }
});
Object.defineProperty(exports, 'call', {
  enumerable: true,
  get: function get() {
    return _function.call;
  }
});

var _compose = require('./_compose');

Object.keys(_compose).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _compose[key];
    }
  });
});

var _curry = require('./_curry');

Object.keys(_curry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _curry[key];
    }
  });
});

var _curry2 = require('./__curry');

Object.keys(_curry2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _curry2[key];
    }
  });
});

var _flip = require('./_flip');

Object.keys(_flip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _flip[key];
    }
  });
});

var _id = require('./_id');

Object.keys(_id).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _id[key];
    }
  });
});

var _negate = require('./_negate');

Object.keys(_negate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _negate[key];
    }
  });
});

var _until = require('./_until');

Object.keys(_until).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _until[key];
    }
  });
});