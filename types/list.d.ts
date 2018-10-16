declare type ListPredicate = (x: any, index: number, list: (any[] | string)) => boolean;

declare interface List {
    concat (...fs: Array<any>[]): Array<any>;
    slice (startInd: number, endInd: number, list: Array<any>): Array<any>;
    includes (x: any, xs: (any[] | string | any)): boolean;
    indexOf (x: any, xs: (any[] | string | any)): number;
    lastIndexOf (x: any, xs: (any[] | string | any)): number;
}

declare function append (...args: any[]): any[];
declare function head (list: any[]): any|undefined;
declare function tail (list: any[]): any[];
declare function init (list: any[]): any[];
declare function uncons (list: any[]): any[]|undefined;
declare function unconsr (list: any[]): any[]|undefined;
declare function concat (list: any[]): any[];
declare function concatMap (fn: ListPredicate, list: any[]): any[];
declare function reverse (list: any[]): any[];
declare function intersperse (between: any[], arr: any[]): any[];
declare function intercalate (xs: any[], xss: any[]): any[];
declare function transpose (xss: Array<(Array<any>|string)>): any[];

declare function map (fn: ListPredicate, list: any[]): any[];
declare function filter (fn: ListPredicate, list: any[]): any[];
