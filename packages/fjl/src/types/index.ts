export * from './arity';
export * from './data';
export * from './list';
export * from './native';
export * from './utility';

// @todo clean this up and allow only one of these types
export interface ConstructableType {
  new(...args: any[]): any;
}

// @todo clean this up and allow only one of these types
export type Constructable = ConstructableType
export type TypeConstructor = ConstructableType;

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
