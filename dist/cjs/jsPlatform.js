"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _object = require("./jsPlatform/object");

Object.keys(_object).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _object[key];
    }
  });
});

var _array = require("./jsPlatform/array");

Object.keys(_array).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _array[key];
    }
  });
});

var _list = require("./jsPlatform/list");

Object.keys(_list).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _list[key];
    }
  });
});

var _string = require("./jsPlatform/string");

Object.keys(_string).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _string[key];
    }
  });
});

var _function = require("./jsPlatform/function");

Object.keys(_function).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _function[key];
    }
  });
});