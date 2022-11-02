import {errorIfNotType} from '../errorThrowing';
import {isUndefined} from './is';
import {ConstructableType, TypeRef} from "../types";

export type DefinePropsArgsTuple = [TypeRef, string, any?];

export const

  /**
   * Creates a descriptor for a property which is settable but throws
   * errors when the `Type` is disobeyed.
   */
  createTypedDescriptor = (Type: TypeRef, target: any, propName: string): PropertyDescriptor => {
    let _value;
    return {
      get: (): typeof Type => _value,
      set: (value: typeof Type): void => {
        _value = errorIfNotType(Type, target.constructor.name, propName, value);
      }
    };
  },

  /**
   * Returns a target-descriptor tuple whose 'descriptor' will be set to
   *  enumerable (`enumerable: true`).
   */
  toEnumerableDescriptor = <T>([target, descriptor]: [T, PropertyDescriptor]): [T, PropertyDescriptor] => {
    descriptor.enumerable = true;
    return [target, descriptor];
  },

  /**
   * Returns an target and descriptor tuple from given.
   */
  toTargetDescriptorTuple = <T>(targetOrTargetDescriptorTuple: T | [T, PropertyDescriptor?]): [T, PropertyDescriptor?] =>
    Array.isArray(targetOrTargetDescriptorTuple) ? targetOrTargetDescriptorTuple as [T, PropertyDescriptor?] :
      [targetOrTargetDescriptorTuple],

  /**
   * Allows you to define a "typed" property on given `target`.
   */
  defineProp = <T>(Type: TypeRef, target: T | [T, PropertyDescriptor?], propName: string, defaultValue?: any): [T, PropertyDescriptor] => {
    const [_target, _descriptor] = toTargetDescriptorTuple(target),
      descriptor = _descriptor || createTypedDescriptor(Type, _target, propName);
    Object.defineProperty(_target, propName, descriptor);
    if (!isUndefined(defaultValue)) {
      _target[propName] = defaultValue;
    }
    return [_target, descriptor];
  },

  $defineProp = <T>(Type: TypeRef) =>
    (target: T | [T, PropertyDescriptor?]) =>
      (propName: string, defaultValue?: any): [T, PropertyDescriptor] =>
        defineProp(Type, target, propName, defaultValue),

  /**
   * Allows you to define a "typed", enumerated property on `target`.
   */
  defineEnumProp = <T>(
    Type: TypeRef, target: T | [T, PropertyDescriptor?],
    propName: string,
    defaultValue?: any
  ): [T, PropertyDescriptor] => {
    const [_target, _descriptor] = toTargetDescriptorTuple(target),
      descriptor = _descriptor || createTypedDescriptor(Type, _target, propName);
    return defineProp(
      Type,
      toEnumerableDescriptor([_target, descriptor]),
      propName,
      defaultValue
    ) as unknown as [T, PropertyDescriptor];
  },

  $defineEnumProp = <T>(Type: TypeRef) =>
    (target: T | [T, PropertyDescriptor?]) =>
      (propName: string, defaultValue?: any): [T, PropertyDescriptor] =>
        defineEnumProp(Type, target, propName, defaultValue),

  /**
   * Allows you to define multiple enum props at once on target.
   */
  defineEnumProps = createDefinePropsMethod({enumerable: true}),

  $defineEnumProps = <T>(argsTuple: [TypeRef, string, any?][]) =>
    (target: T) =>
      defineEnumProps(argsTuple, target),

  /**
   * Allows you to define multiple props at once on target.
   */
  defineProps = createDefinePropsMethod({enumerable: false}),

  $defineProps = <T>(argsTuple: [TypeRef, string, any?][]) =>
    (target: T) =>
      defineProps(argsTuple, target)

;

export type PropsDefiner = <T>(argsTuple: [TypeRef, string, any?][], target: T) => T;

/**
 * Creates `defineProps` and `defineEnumProps` methods based on `{enumerable}` param.
 */
function createDefinePropsMethod({enumerable}: PropertyDescriptor): PropsDefiner {
  const operation = enumerable ? defineEnumProp : defineProp;
  return <T = any>(argsTuple: [TypeRef, string, any?][], target: T): T => {
    argsTuple.forEach(argTuple => {
      const [TypeRef, propName, defaultValue] = argTuple;
      operation.apply(null, [TypeRef, target, propName, defaultValue]);
    });
    return target;
  };
}
