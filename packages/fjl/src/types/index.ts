export * from './arity';
export * from './data';

// @todo clean this up and allow only one of these types
export interface ConstructableType {
    new(...args: any[]): any;
}

// @todo clean this up and allow only one of these types
export type Constructable = ConstructableType
export type TypeConstructor = ConstructableType;
export type TypeName = string;
export type TypeRef = TypeName | ConstructableType;

// @todo List types should not be defined in this file (they should be alongside slice/array types).
export type ListPredicate = <T>(x: T, index?: number, xs?: (T[] | string)) => boolean;

export type ListMapOperation = (x: any, index: number, list: (any[] | string)) => any;

export type ListFoldOperation = (agg: any, item: any, index: number, list: (any[] | string)) => any;

export type ListForEachOperation = (agg: any, item: any, index: number, list: (any[] | string)) => void;

export type OrderingFunction = (a: any, b: any) => number;
