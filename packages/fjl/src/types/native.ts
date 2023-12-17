export type DefinePropertyFunc<T> = (pd: PropertyDescriptor, propName: string, applicand: T) => T;

export type DefinePropertiesFunc<T> = (pdm: PropertyDescriptorMap, applicand: T) => T;

export type GetOwnPropertyDescriptorFunc = (propName: string, applicand: any) => PropertyDescriptor;

export type CreateFunc = (pdm: PropertyDescriptorMap, applicand: any) => any;

export type IsFunc = (Type: any, value: any) => boolean;

// @todo Need to add es > es6 methods below.
export interface ObjectStatics {
  assign: (...xs: any[]) => any;
  create: CreateFunc;
  defineProperties: DefinePropertiesFunc<any>;
  defineProperty: DefinePropertyFunc<any>;
  entries: (x: any) => Array<[string, any]>;
  freeze: <T>(x: T) => T;
  fromEntries: <T, O extends T>(x: T) => O;
  getOwnPropertyDescriptor: GetOwnPropertyDescriptorFunc;
  getOwnPropertyDescriptors: (x: any) => PropertyDescriptorMap;
  getOwnPropertyNames: (x: any) => string[];
  getOwnPropertySymbols: (x: any) => symbol[];
  getPrototypeOf: (x: any) => object | null;
  hasOwn: (propName: string | PropertyKey, x: any) => boolean;
  is: IsFunc;
  isExtensible: (x: any) => boolean;
  isFrozen: (x: any) => boolean;
  isSealed: (x: any) => boolean;
  keys: (x: any) => string[];
  seal: <T>(x: T) => T;
  values: (x: any) => any[];
}
