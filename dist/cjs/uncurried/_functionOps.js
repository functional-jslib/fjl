'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _function_ = require('./_jsPlatform/function_');

Object.defineProperty(exports, 'apply', {
  enumerable: true,
  get: function get() {
    return _function_.apply;
  }
});
Object.defineProperty(exports, 'call', {
  enumerable: true,
  get: function get() {
    return _function_.call;
  }
});

var _compose = require('./_functionOps/_compose');

Object.keys(_compose).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _compose[key];
    }
  });
});

var _curry = require('./_functionOps/_curry');

Object.keys(_curry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _curry[key];
    }
  });
});

var _curry2 = require('./_functionOps/__curry');

Object.keys(_curry2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _curry2[key];
    }
  });
});

var _flip = require('./_functionOps/_flip');

Object.keys(_flip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _flip[key];
    }
  });
});

var _id = require('./_functionOps/_id');

Object.keys(_id).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _id[key];
    }
  });
});

var _negate = require('./_functionOps/_negate');

Object.keys(_negate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _negate[key];
    }
  });
});

var _until = require('./_functionOps/_until');

Object.keys(_until).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _until[key];
    }
  });
});