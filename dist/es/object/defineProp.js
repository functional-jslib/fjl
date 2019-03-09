"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../function/curry");
const function_1 = require("../jsPlatform/function");
const errorThrowing_1 = require("../errorThrowing");
const is_1 = require("./is");
function createDefinePropsMethod({ enumerable }) {
    const operation = enumerable ? exports.defineEnumProp : exports.defineProp;
    return (argTuples, target) => {
        argTuples.forEach(argTuple => {
            const [TypeRef, propName, defaultValue] = argTuple;
            function_1.apply(operation, [TypeRef, target, propName, defaultValue]);
        });
        return target;
    };
}
exports.createTypedDescriptor = (Type, target, propName) => {
    let _value;
    return {
        get: function () {
            return _value;
        },
        set: function (value) {
            _value = errorThrowing_1.errorIfNotType(Type, propName, target, value);
        }
    };
}, exports.toEnumerableDescriptor = ([target, descriptor]) => {
    descriptor.enumerable = true;
    return [target, descriptor];
}, exports.toTargetDescriptorTuple = targetOrTargetDescriptorTuple => is_1.isType('Array', targetOrTargetDescriptorTuple) ?
    targetOrTargetDescriptorTuple : [targetOrTargetDescriptorTuple], exports.defineProp = (Type, target, propName, defaultValue = undefined) => {
    const [_target, _descriptor] = exports.toTargetDescriptorTuple(target), descriptor = _descriptor || exports.createTypedDescriptor(Type, _target, propName);
    Object.defineProperty(_target, propName, descriptor);
    if (!is_1.isUndefined(defaultValue)) {
        _target[propName] = defaultValue;
    }
    return [_target, descriptor];
}, exports.defineEnumProp = (Type, target, propName, defaultValue = undefined) => {
    const [_target, _descriptor] = exports.toTargetDescriptorTuple(target), descriptor = _descriptor || exports.createTypedDescriptor(Type, _target, propName);
    return exports.defineProp(Type, exports.toEnumerableDescriptor([_target, descriptor]), propName, defaultValue);
}, exports.defineEnumProps = curry_1.curry(createDefinePropsMethod({ enumerable: true })), exports.defineProps = curry_1.curry(createDefinePropsMethod({ enumerable: false }));
//# sourceMappingURL=defineProp.js.map