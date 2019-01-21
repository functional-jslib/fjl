import {Runtime} from "inspector";
declare namespace fjl {

    export function instanceOf(Constructor: Function, obj: any): boolean;

    export function hasOwnProperty(property: string, obj: any): boolean;

    export function keys(obj: any): string[];

    export function assign(obj0: any, ...objs: any[]): string[];

    export namespace native {
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
}
