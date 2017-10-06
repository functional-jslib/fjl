'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _call = require('./functionOps/call');

Object.defineProperty(exports, 'call', {
  enumerable: true,
  get: function get() {
    return _call.call;
  }
});

var _apply = require('./functionOps/apply');

Object.defineProperty(exports, 'apply', {
  enumerable: true,
  get: function get() {
    return _apply.apply;
  }
});

var _compose = require('./functionOps/compose');

Object.defineProperty(exports, 'compose', {
  enumerable: true,
  get: function get() {
    return _compose.compose;
  }
});

var _curry = require('./functionOps/curry');

Object.defineProperty(exports, 'curry', {
  enumerable: true,
  get: function get() {
    return _curry.curry;
  }
});
Object.defineProperty(exports, 'curryN', {
  enumerable: true,
  get: function get() {
    return _curry.curryN;
  }
});
Object.defineProperty(exports, 'curry2', {
  enumerable: true,
  get: function get() {
    return _curry.curry2;
  }
});
Object.defineProperty(exports, 'curry3', {
  enumerable: true,
  get: function get() {
    return _curry.curry3;
  }
});
Object.defineProperty(exports, 'curry4', {
  enumerable: true,
  get: function get() {
    return _curry.curry4;
  }
});
Object.defineProperty(exports, 'curry5', {
  enumerable: true,
  get: function get() {
    return _curry.curry5;
  }
});
Object.defineProperty(exports, '__', {
  enumerable: true,
  get: function get() {
    return _curry.__;
  }
});
Object.defineProperty(exports, 'curry_', {
  enumerable: true,
  get: function get() {
    return _curry.curry_;
  }
});
Object.defineProperty(exports, 'curryN_', {
  enumerable: true,
  get: function get() {
    return _curry.curryN_;
  }
});
Object.defineProperty(exports, 'curry2_', {
  enumerable: true,
  get: function get() {
    return _curry.curry2_;
  }
});
Object.defineProperty(exports, 'curry3_', {
  enumerable: true,
  get: function get() {
    return _curry.curry3_;
  }
});
Object.defineProperty(exports, 'curry4_', {
  enumerable: true,
  get: function get() {
    return _curry.curry4_;
  }
});
Object.defineProperty(exports, 'curry5_', {
  enumerable: true,
  get: function get() {
    return _curry.curry5_;
  }
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

var _id = require('./functionOps/id');

Object.defineProperty(exports, 'id', {
  enumerable: true,
  get: function get() {
    return _id.id;
  }
});

var _flip = require('./functionOps/flip');

Object.defineProperty(exports, 'flip', {
  enumerable: true,
  get: function get() {
    return _flip.flip;
  }
});
Object.defineProperty(exports, 'flipN', {
  enumerable: true,
  get: function get() {
    return _flip.flipN;
  }
});

var _until = require('./functionOps/until');

Object.defineProperty(exports, 'until', {
  enumerable: true,
  get: function get() {
    return _until.until;
  }
});