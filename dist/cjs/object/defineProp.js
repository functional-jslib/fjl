"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineProps = exports.defineEnumProps = exports.defineEnumProp = exports.defineProp = exports.toTargetDescriptorTuple = exports.toEnumerableDescriptor = exports.createTypedDescriptor = void 0;

var _curry = require("../function/curry");

var _function = require("../jsPlatform/function");

var _errorThrowing = require("../errorThrowing");

var _is = require("./is");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Creates `defineProps` and `defineEnumProps` methods based on `{enumerable}` param.
 * @param {{enumerable: Boolean}}
 * @returns {function(*, *)|PropsDefinerCall}
 * @private
 */
function createDefinePropsMethod(_ref) {
  var enumerable = _ref.enumerable;
  var operation = enumerable ? defineEnumProp : defineProp;
  return function (argTuples, target) {
    argTuples.forEach(function (argTuple) {
      var _argTuple = _slicedToArray(argTuple, 3),
          TypeRef = _argTuple[0],
          propName = _argTuple[1],
          defaultValue = _argTuple[2];

      (0, _function.apply)(operation, [TypeRef, target, propName, defaultValue]);
    });
    return target;
  };
}

var
/**
 * Creates a descriptor for a property which is settable but throws
 * errors when the `Type` is disobeyed.
 * @function module:object.createTypedDescriptor
 * @param Type {TypeRef} - {String|Function}
 * @param target {*}
 * @param propName {String}
 * @returns {Descriptor} - Property descriptor with just getter and setter.
 */
createTypedDescriptor = function createTypedDescriptor(Type, target, propName) {
  var _value;

  return {
    get: function get() {
      return _value;
    },
    set: function set(value) {
      _value = (0, _errorThrowing.errorIfNotType)(Type, propName, target, value);
    }
  };
},

/**
 * Returns a target-descriptor tuple whose 'descriptor' will be set to
 *  enumerable (`enumerable: true`).
 * @function module:object.toEnumerableDescriptor
 * @param {TargetDescriptorTuple} - [target, descriptor] tuple.
 * @returns {TargetDescriptorTuple} - Array of target and descriptor.
 */
toEnumerableDescriptor = function toEnumerableDescriptor(_ref2) {
  var _ref3 = _slicedToArray(_ref2, 2),
      target = _ref3[0],
      descriptor = _ref3[1];

  descriptor.enumerable = true;
  return [target, descriptor];
},

/**
 * Returns an target and descriptor tuple from given.
 * @function module:object.toTargetDescriptorTuple
 * @param targetOrTargetDescriptorTuple {(*|Array<*, *>)} - Target object or tuple of target and descriptor.
 * @returns {(Array<*>|Array<*,*>)}
 */
toTargetDescriptorTuple = function toTargetDescriptorTuple(targetOrTargetDescriptorTuple) {
  return (0, _is.isType)('Array', targetOrTargetDescriptorTuple) ? // Strict type check for array
  targetOrTargetDescriptorTuple : [targetOrTargetDescriptorTuple];
},

/**
 * Allows you to define a "typed" property on given `target`.
 * @function module:object.defineProp
 * @param Type {TypeRef} - {String|Function}
 * @param target {TargetDescriptorTuple} - Target or array of target and descriptor ([target, descriptor]).
 * @param propName {String}
 * @param [defaultValue=undefined] {*}
 * @returns {TargetDescriptorTuple}
 */
defineProp = function defineProp(Type, target, propName) {
  var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var _toTargetDescriptorTu = toTargetDescriptorTuple(target),
      _toTargetDescriptorTu2 = _slicedToArray(_toTargetDescriptorTu, 2),
      _target = _toTargetDescriptorTu2[0],
      _descriptor = _toTargetDescriptorTu2[1],
      descriptor = _descriptor || createTypedDescriptor(Type, _target, propName);

  Object.defineProperty(_target, propName, descriptor);

  if (!(0, _is.isUndefined)(defaultValue)) {
    _target[propName] = defaultValue;
  }

  return [_target, descriptor];
},

/**
 * Allows you to define a "typed", enumerated property on `target`.
 * @function module:object.defineEnumProp
 * @param Type {TypeRef} - {String|Function}
 * @param target {TargetDescriptorTuple} - Target or array of target and descriptor ([target, descriptor]).
 * @param propName {String}
 * @param [defaultValue=undefined] {*}
 * @returns {TargetDescriptorTuple}
 */
defineEnumProp = function defineEnumProp(Type, target, propName) {
  var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var _toTargetDescriptorTu3 = toTargetDescriptorTuple(target),
      _toTargetDescriptorTu4 = _slicedToArray(_toTargetDescriptorTu3, 2),
      _target = _toTargetDescriptorTu4[0],
      _descriptor = _toTargetDescriptorTu4[1],
      descriptor = _descriptor || createTypedDescriptor(Type, _target, propName);

  return defineProp(Type, toEnumerableDescriptor([_target, descriptor]), propName, defaultValue);
},

/**
 * Allows you to define multiple enum props at once on target.
 * @function module:object.defineEnumProps
 * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineEnumProp`.
 * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
 * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineEnumProp`.
 */
defineEnumProps = (0, _curry.curry)(createDefinePropsMethod({
  enumerable: true
})),

/**
 * Allows you to define multiple props at once on target.
 * @function module:object.defineProps
 * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineProp`.
 * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
 * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineProp`.
 * @curried
 */
defineProps = (0, _curry.curry)(createDefinePropsMethod({
  enumerable: false
}));
/** ============================================================= */

/** Type definitions:                                             */

/** ============================================================= */

/**
 * @typedef {*} Target
 */

/**
 * @typedef {Object} Descriptor
 */

/**
 * @typedef {Array<Target, Descriptor>} TargetDescriptorTuple
 */

/**
 * @typedef {Array.<TypeRef, TargetDescriptorTuple, String, *>}  DefinePropArgsTuple
 * @description Arguments list for `defineProp` and/or `defineEnumProp` (note: some
 *  parts of array/tuple are options (namely the last two args));  E.g.,
 *  ```
 *  [String, [someTarget], 'somePropName', 'someDefaultValue] // ...
 *  ```
 */

/**
 * @typedef {Function} PropsDefinerCall
 * @description Same type as `defineProp` and `defineEnumProp`
 * @param argsTuple {DefinePropArgsTuple}
 * @param target {Target}
 * @returns {Array.<TargetDescriptorTuple>}
 */


exports.defineProps = defineProps;
exports.defineEnumProps = defineEnumProps;
exports.defineEnumProp = defineEnumProp;
exports.defineProp = defineProp;
exports.toTargetDescriptorTuple = toTargetDescriptorTuple;
exports.toEnumerableDescriptor = toEnumerableDescriptor;
exports.createTypedDescriptor = createTypedDescriptor;