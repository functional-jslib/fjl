import {Runtime} from "inspector";

declare module fjl {

    export function instanceOf(Constructor: Function, obj: any): boolean;

    export function hasOwnProperty(property: string, obj: any): boolean;

    export function keys(obj: any): string[];

    export function assign(obj0: any, ...objs: any[]): string[];

    export module native {
        export function defineProperties<T>(properties: PropertyDescriptorMap, target: T): T

        export function defineProperty<T>(propertyDescriptor: PropertyDescriptor, propertyName: string, target: T): T

        export function assign(obj0: any, ...objs: Array<any>): any;

        // @todo add the rest of the methods here
    }

    export function lookup(key: string, obj: any): any;

    export function assign(obj0: any, ...objs: Array<any>): any;

    export function typeOf(x: any): string;

    export function copy(x: any): any;

    export function toTypeRef(x: string | Function | any): string | Function;

    export function toTypeRefName(x: string | Function | any): string;

    export function toTypeRefNames(...types: Array<string | Function | any>): Array<string>;

    export function isFunction(x: any): boolean;

    export function isType(type: string | Function, x: any): boolean;

    export function isStrictly (type: string | Function, x: any): boolean;

    export function isOfType (type: string | Function, x: any): boolean;

    export function isLoosely (type: string | Function, x: any): boolean;

    export function isClass (x: any): boolean;

    export function isCallable (x: any): boolean;

    export function isArray (x: any): boolean;

    export function isObject (x: any): boolean;

    export function isBoolean (x: any): boolean;

    export function isNumber (x: any): boolean;

    export function isString (x: any): boolean;

    export function isMap (x: any): boolean;

    export function isSet (x: any): boolean;

    export function isWeakMap (x: any): boolean;

    export function isWeakSet (x: any): boolean;

    export function isUndefined (x: any): boolean;

    export function isNull (x: any): boolean;

    export function isSymbol (x: any): boolean;

    export function isUsableImmutablePrimitive (x: any): boolean;

    export function isEmptyList (x: any): boolean;

    export function isEmptyObject (x: any): boolean;

    export function isEmptyCollection (x: any): boolean;

    export function isEmpty (x: any): boolean;

    export function isset (x: any): boolean;

    export function isStrictlyOneOf (x: any, ...types: Function[] | string[]): boolean;

    export function isLooselyOneOf (x: any, ...types: Function[] | string[]): boolean;

    export function instanceOfOne (x: any, ...types: Function[] | string[]): boolean;

    export function isFunctor (x: any, ...types: Function[] | string[]): boolean;

    export function of (x: any, ...args: any[]): any;

    export function searchObj (nsString: string, obj): any;

    export function assignDeep (obj0: any, ...objs: any[]): any;

    export function objUnion (obj1: object, obj2: object): object;

    export function objIntersect (obj1: object, obj2: object): object;

    export function objDifference(obj1: object, obj2: object): object;

    export function objComplement (obj0: object, ...objs: object[]): object;

    export function log (...xs: any[]): void;

    export function error (...xs: any[]): void;

    export function peek (...xs: any[]): void;

    export function warn (...xs: any[]): void;

    export function jsonClone (x: any): any;

    export function toArray (x: any): any[];

    export function toAssocList (x: any): Array<any[]>;

    export function toAssocListDeep (x: any): Array<any[]>;

    export function fromAssocList <T>(xs: Array<any[]>, OutType: Function): T;

    export function fromAssocListDeep <T>(xs: Array<any[]>, OutType: Function): T;

}
