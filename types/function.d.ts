declare type Predicate = (a: any) => boolean;
declare function compose (...fn: Function[]): Function;
declare function curry (fn: Function, ...prelimArgs: any[]): Function;
declare function curry2 (fn: Function): Function;
declare function curry3 (fn: Function): Function;
declare function curry4 (fn: Function): Function;
declare function curry5 (fn: Function): Function;
declare function curryN (executeArity: number, fn: Function): Function;
declare function flip (fn: Function): Function; // flips fn of `2`
declare function flipN (fn: Function): Function; // flips fn of `2` or more
declare function fnOrError (fn: Function): Function;
declare function id (x: any): any;
declare function negateF (fn: Function): Function;
declare function negateFN (fn: Function): Function;
declare function noop (): void;
declare function trampoline (fn: Function, fnNameRestrict?: string): any;
declare function until (fn: Predicate, operation: Function, startingPoint: any): any;
