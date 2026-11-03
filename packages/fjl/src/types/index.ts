export * from './arity';
export * from './data';
export * from './list';
export * from './native';
export * from './utility';

/**
 * Any `new`-able type.  `any` is required here - a constructor's parameters are contravariant,
 * so `unknown[]` would reject most constructors, and its instance type isn't known either.
 */
export interface ConstructableType {
  new(...args: any[]): any;
}

/**
 * @deprecated - Associated methods are deprecated, so these types are too -
 *  Use `ConstructableType` types instead.
 */
export type TypeName = string;

/**
 * @deprecated - Associated methods are deprecated, so these types are too -
 *  Use `ConstructableType` types instead.
 */
export type TypeRef = TypeName | ConstructableType;
