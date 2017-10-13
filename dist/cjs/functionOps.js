'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _call = require('./functionOps/call');

Object.keys(_call).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _call[key];
    }
  });
});

var _apply = require('./functionOps/apply');

Object.keys(_apply).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _apply[key];
    }
  });
});

var _curry_ = require('./uncurried/functionOps/curry_');

Object.keys(_curry_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _curry_[key];
    }
  });
});

var _curry__ = require('./uncurried/functionOps/curry__');

Object.keys(_curry__).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _curry__[key];
    }
  });
});

var _negate_ = require('./uncurried/functionOps/negate_');

Object.keys(_negate_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _negate_[key];
    }
  });
});

var _id_ = require('./uncurried/functionOps/id_');

Object.keys(_id_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _id_[key];
    }
  });
});

var _compose_ = require('./uncurried/functionOps/compose_');

Object.keys(_compose_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _compose_[key];
    }
  });
});

var _flip = require('./functionOps/flip');

Object.keys(_flip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _flip[key];
    }
  });
});

var _until = require('./functionOps/until');

Object.keys(_until).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _until[key];
    }
  });
});