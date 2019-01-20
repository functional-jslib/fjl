declare type Predicate = (a: any) => boolean;
declare function compose (...fn: Function[]): Function;
declare function curry (fn: Function, ...prelimArgs: any[]): Function;
declare function curry2 (fn: Function): Function;
declare function curry3 (fn: Function): Function;
declare function curry4 (fn: Function): Function;
declare function curry5 (fn: Function): Function;
declare function curryN (executeArity: number, fn: Function): Function;
declare function flip (fn: Function): Function;      // flips fn of `2`
declare function flipN (fn: Function): Function;     // flips fn of `2` or more (returns a variadic function (`(...rest) => ...`))
declare function fnOrError (fn: Function): Function; // Throws error if value is not a function
declare function id (x: any): any;                   // Identity function
declare function negateF (fn: Function): Function;   // Negate function of arity 1
declare function negateFN (fn: Function): Function;  // Negate function of variable arity
declare function noop (): void;                      // "No operation" function
declare function trampoline (fn: Function, fnNameRestrict?: string): any;
declare function until (fn: Predicate, operation: Function, startingPoint: any): any;
