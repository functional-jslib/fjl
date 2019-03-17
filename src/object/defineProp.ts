/**
 * @module object
 * @note Custom jsdoc type definitions defined toward end of file.
 */
import {curry} from '../function/curry';
import {apply} from '../jsPlatform/function';
import {errorIfNotType} from '../errorThrowing';
import {isUndefined, isType} from './is';

export const
    /**
     * Creates a descriptor for a property which is settable but throws
     * errors when the `Type` is disobeyed.
     * @function module:object.createTypedDescriptor
     * @param Type {TypeRef} - {String|Function}
     * @param target {*}
     * @param propName {String}
     * @returns {Descriptor} - Property descriptor with just getter and setter.
     */
    createTypedDescriptor = (Type, target, propName) => {
        let _value;
        return {
            get: function () {
                return _value;
            },
            set: function (value) {
                _value = errorIfNotType(Type, propName, target, value);
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
    toEnumerableDescriptor = ([target, descriptor]) => {
        descriptor.enumerable = true;
        return [target, descriptor];
    },

    /**
     * Returns an target and descriptor tuple from given.
     * @function module:object.toTargetDescriptorTuple
     * @param targetOrTargetDescriptorTuple {(*|Array<*, *>)} - Target object or tuple of target and descriptor.
     * @returns {(Array<*>|Array<*,*>)}
     */
    toTargetDescriptorTuple = targetOrTargetDescriptorTuple =>
        isType('Array', targetOrTargetDescriptorTuple) ? // Strict type check for array
            targetOrTargetDescriptorTuple : [targetOrTargetDescriptorTuple],

    /**
     * Allows you to define a "typed" property on given `target`.
     * @function module:object.defineProp
     * @param Type {TypeRef} - {String|Function}
     * @param target {TargetDescriptorTuple} - Target or array of target and descriptor ([target, descriptor]).
     * @param propName {String}
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     */
    defineProp = (Type, target, propName, defaultValue = undefined) => {
        const [_target, _descriptor] = toTargetDescriptorTuple(target),
            descriptor = _descriptor || createTypedDescriptor(Type, _target, propName);
        Object.defineProperty(_target, propName, descriptor);
        if (!isUndefined(defaultValue)) {
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
    defineEnumProp = (Type, target, propName, defaultValue = undefined) => {
        const [_target, _descriptor] = toTargetDescriptorTuple(target),
            descriptor = _descriptor || createTypedDescriptor(Type, _target, propName);
        return defineProp(
            Type,
            toEnumerableDescriptor([_target, descriptor]),
            propName,
            defaultValue
        );
    },

    /**
     * Allows you to define multiple enum props at once on target.
     * @function module:object.defineEnumProps
     * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineEnumProp`.
     * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
     * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineEnumProp`.
     */
    defineEnumProps = curry(createDefinePropsMethod({enumerable: true})),

    /**
     * Allows you to define multiple props at once on target.
     * @function module:object.defineProps
     * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineProp`.
     * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
     * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineProp`.
     * @curried
     */
    defineProps = curry(createDefinePropsMethod({enumerable: false}))

;

/**
 * Creates `defineProps` and `defineEnumProps` methods based on `{enumerable}` param.
 * @param {{enumerable: Boolean}}
 * @returns {function(*, *)|PropsDefinerCall}
 * @private
 */
function createDefinePropsMethod ({enumerable}) {
    const operation = enumerable ? defineEnumProp : defineProp;
    return (argTuples, target) => {
        argTuples.forEach(argTuple => {
            const [TypeRef, propName, defaultValue] = argTuple;
            apply(operation, [TypeRef, target, propName, defaultValue]);
        });
        return target;
    };
}

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
