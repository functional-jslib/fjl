declare namespace fjl {

    export function instanceOf(Constructor: Function, obj: any): boolean;

    export function hasOwnProperty(property: string, obj: any): boolean;

    export function keys(obj: any): string[];

    export function assign(obj0: any, ...objs: any[]): string[];

}
