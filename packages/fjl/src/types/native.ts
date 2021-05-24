import {CurryOf2, CurryOf3} from "../function/curry";

export type DefinePropertyFunc<T> = CurryOf3<PropertyDescriptor, string, T, T>;

export type DefinePropertiesFunc<T> = CurryOf2<PropertyDescriptorMap, T, T>;

export type GetOwnPropertyDescriptorFunc = CurryOf2<string, any, PropertyDescriptor>;

export type CreateFunc = CurryOf2<PropertyDescriptorMap, any, any>;

export type IsFunc = CurryOf2<any, any, boolean>;

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
  is: IsFunc;
  isExtensible: (x: any) => boolean;
  isFrozen: (x: any) => boolean;
  isSealed: (x: any) => boolean;
  keys: (x: any) => string[];
  seal: <T>(x: T) => T;
  values: (x: any) => any[];
}
