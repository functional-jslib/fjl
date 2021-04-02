export * from './arity';
export * from './data';
export * from './native';

// @todo clean this up and allow only one of these types
export interface ConstructableType {
    new(...args: any[]): any;
}

// @todo clean this up and allow only one of these types
export type Constructable = ConstructableType
export type TypeConstructor = ConstructableType;
export type TypeName = string;
export type TypeRef = TypeName | ConstructableType;
