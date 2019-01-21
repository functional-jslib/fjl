declare namespace fjl {
    export type Predicate = (a: any) => boolean;

    export function compose(...fn: Function[]): Function;

    export function curry(fn: Function, ...prelimArgs: any[]): Function;

    export function curry2(fn: Function): Function;

    export function curry3(fn: Function): Function;

    export function curry4(fn: Function): Function;

    export function curry5(fn: Function): Function;

    export function curryN(executeArity: number, fn: Function): Function;

    export function flip(fn: Function): Function;      // flips fn of `2`
    export function flipN(fn: Function): Function;     // flips fn of `2` or more (returns a variadic function (`(...rest) => ...`))
    export function fnOrError(fn: Function): Function; // Throws error if value is not a function
    export function id(x: any): any;                   // Identity function
    export function negateF(fn: Function): Function;   // Negate function of arity 1
    export function negateFN(fn: Function): Function;  // Negate function of variable arity
    export function noop(): void;                      // "No operation" function
    export function trampoline(fn: Function, fnNameRestrict?: string): any;

    export function until(fn: Predicate, operation: Function, startingPoint: any): any;
}
