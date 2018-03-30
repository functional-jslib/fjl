define(['exports', '../_jsPlatform/_function', './_compose', './_curry', './__curry', './_flip', './_id', './_negate', './_until'], function (exports, _function, _compose, _curry, _curry2, _flip, _id, _negate, _until) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'apply', {
    enumerable: true,
    get: function () {
      return _function.apply;
    }
  });
  Object.defineProperty(exports, 'call', {
    enumerable: true,
    get: function () {
      return _function.call;
    }
  });
  Object.keys(_compose).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _compose[key];
      }
    });
  });
  Object.keys(_curry).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _curry[key];
      }
    });
  });
  Object.keys(_curry2).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _curry2[key];
      }
    });
  });
  Object.keys(_flip).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _flip[key];
      }
    });
  });
  Object.keys(_id).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _id[key];
      }
    });
  });
  Object.keys(_negate).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _negate[key];
      }
    });
  });
  Object.keys(_until).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _until[key];
      }
    });
  });
});