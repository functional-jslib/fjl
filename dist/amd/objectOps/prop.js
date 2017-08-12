define(['exports', '../functionOps/curry'], function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.prop = undefined;
  const prop = exports.prop = (0, _curry.curry)((name, obj) => obj[name]); /**
                                                                            *
                                                                            */
});