declare namespace fjl {

    export type ListPredicate = (x: any, index: number, list: (any[] | string)) => boolean;

    export type ListMapOperation = (x: any, index: number, list: (any[] | string)) => any;

    export type ListFoldOperation = (agg: any, item: any, index: number, list: (any[] | string)) => any;

    export type ListForEachOperation = (agg: any, item: any, index: number, list: (any[] | string)) => void;

    export type OrderingFunction = (a: any, b: any) => number;

    export interface List {
        concat(...fs: Array<Array<any> | string>): Array<any> | string;

        slice(startInd: number, endInd: number, list: Array<any> | string): Array<any> | string;

        includes(x: any, xs: (any[] | string | any)): boolean;

        indexOf(x: any, xs: (any[] | string | any)): number;

        lastIndexOf(x: any, xs: (any[] | string | any)): number;
    }

    export function slice(startInd: number, endInd: number, list: Array<any> | string): Array<any> | string;

    export function includes(x: any, xs: (any[] | string | any)): boolean;

    export function indexOf(x: any, xs: (any[] | string | any)): number;

    export function lastIndexOf(x: any, xs: (any[] | string | any)): number;

    export function append(...args: Array<any[] | string>): any[] | string;

    export function head(list: any[] | string): any | string | undefined;

    export function tail(list: any[] | string): any[] | string | undefined;

    export function last(list: any[] | string): any | string | undefined;

    export function init(list: any[] | string): any[] | string | undefined;

    export function uncons(list: any[] | string): any[] | string | undefined;

    export function unconsr(list: any[] | string): any[] | string | undefined;

    export function concat(list: any[] | string[]): any[] | string;

    export function concatMap(fn: ListPredicate, list: any[] | string[]): any[] | string;

    export function reverse(list: any[] | string): any[] | string;

    export function intersperse<T>(between: T, arr: T[] | T): T[] | T;

    export function intercalate<T>(xs: T[] | T, xss: T[] | T): T[] | T;

    export function transpose(xss: Array<any[] | string>): any[] | string[];

    export function subsequences(xs: Array<any> | string): any[] | string[];

    export function permutations(xs: Array<any> | string): any[] | string[];

    export function foldl(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

    export function foldl1(fn: ListFoldOperation, xs: any [] | string): any;

    export function foldr(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

    export function foldr1(fn: ListFoldOperation, xs: any [] | string): any;

    export function mapAccumL(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

    export function mapAccumR(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

    export function iterate(limit: number, op: ListMapOperation, zero: any): any[];

    export function cycle(limit: number, xs: any[]): any[];

    export function findIndex(pred: ListPredicate, xs: any[]): number;

    export function findIndices(pred: ListPredicate, xs: any[]): number[] | undefined;

    export function elemIndex(x: any, xs: any[]): number | undefined;

    export function elemIndices(pred: ListPredicate, xs: any[]): number[] | undefined;

    export function take(n: number, xs: any[]): any[];

    export function drop(n: number, xs: any[]): any[];

    export function splitAt(n: number, xs: any[]): Array<any[]>;

    export function takeWhile(fn: ListPredicate, xs: any[]): any[];

    export function dropWhile(fn: ListPredicate, xs: any[]): any[];

    export function dropWhileEnd(fn: ListPredicate, xs: any[]): any[];

    export function span(fn: ListPredicate, xs: any[]): Array<any[]>;

    export function breakOnList(fn: ListPredicate, xs: any[]): Array<any[]>;

    export function at(index: number): any;

    export function find(fn: ListPredicate, xs: any[]): any | undefined;

    export function map(fn: ListMapOperation, list: any[]): any[];

    export function forEach(fn: ListForEachOperation, xs: any[]): void;

    export function filter(fn: ListPredicate, xs: any[]): any[];

    export function partition(fn: ListPredicate, xs: any[]): Array<any[]>;

    export function elem(x: any, xs: any[]): boolean;

    export function notElem(x: any, xs: any[]): boolean;

    export function isPrefixOf(xs1: any[], xs2: any[]): boolean;

    export function isSuffixOf(xs1: any[], xs2: any[]): boolean;

    export function isInfixOf(xs1: any[], xs2: any[]): boolean;

    export function isSubsequenceOf(xs1: any[], xs2: any[]): boolean;

    export function group(xs: any[]): Array<any[]>;

    export function inits(xs: any[]): Array<any[]>;

    export function tails(xs: any[]): Array<any[]>;

    export function stripPrefix(prefix: any, xs: any[]): any[] | string;

    export function zip(xs1: any[], xs2: any[]): Array<any[]>;

    export function zipN(...lists: any[]): Array<any[]>;

    export function zip3(xs1: any[], xs2: any[], xs3: any[]): Array<any[]>;

    export function zip4(xs1: any[], xs2: any[], xs3: any[], xs4: any[]): Array<any[]>;

    export function zip5(xs1: any[], xs2: any[], xs3: any[], xs4: any[], xs5: any[]): Array<any[]>;

    export function zipWith(op: (a, b) => any[], xsA: any[], xsB: any[]): Array<any[]>;

    export function zipWithN(op: (a, b) => any[], ...lists: any[]): Array<any[]>;

    export function zipWith3(op: (a, b, c) => any[], xsA: any[], xsB: any[], xsC: any[]): Array<any[]>;

    export function zipWith4(op: (a, b, c, d) => any[], xsA: any[], xsB: any[], xsC: any[], xsD: any[]): Array<any[]>;

    export function zipWith5(op: (a, b, c, d) => any[], xsA: any[], xsB: any[], xsC: any[], xsD: any[], xsE: any[]): Array<any[]>;

    export function unzip(zippedList: Array<any[]>): Array<any[]>;

    export function unzipN(...zippedList: Array<any[]>): Array<any[]>;

    export function any(fn: ListPredicate, xs: any[]): boolean;

    export function all(fn: ListPredicate, xs: any[]): boolean;

    export function and(xs: any[]): boolean;

    export function or(xs: any[]): boolean;

    export function not(xs: any[]): boolean;

    export function sum(xs: any[]): number;

    export function product(xs: any[]): number;

    export function maximum(xs: any[]): number;

    export function minimum(xs: any[]): number;

    export function scanl(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

    export function scanl1(fn: ListFoldOperation, xs: any [] | string): any;

    export function scanr(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

    export function scanr1(fn: ListFoldOperation, xs: any [] | string): any;

    export function nub(xs: any [] | string): any[];

    export function sort(xs: any [] | string): any[];

    export function sortOn(fn: (x: any) => any, xs: any [] | string): any[];

    export function sortBy(fn: OrderingFunction, xs: any [] | string): any[];

    export function insert(x: any, xs: any[]): any[];

    export function insertBy(fn: OrderingFunction, x: any, xs: any[]): any[];

    export function nubBy(fn: ListPredicate, x: any, xs: any[]): any[];

    export function removeBy(fn: ListPredicate, x: any, xs: any[]): any[];

    export function removeFirstBy(fn: ListPredicate, x: any, xs: any[]): any[];

    export function unionBy(fn: ListPredicate, xs1: any[], xs2: any[]): any[];

    export function union(xs1: any[], xs2: any[]): any[];

    export function intersect(xs1: any[], xs2: any[]): any[];

    export function intersectBy(fn: ListPredicate, xs1: any[], xs2: any[]): any[];

    export function difference(xs1: any[], xs2: any[]): any[];

    export function complement(xs1: any[], ...xs2: any[]): any[];

    export function range(min: number, max: number, step?: number): number[];

    export function sliceFrom(startInd: number, xs: List): List;

    export function sliceTo(endInd: number, xs: List): List;

    export function sliceCopy(xs: List): List;

    export function genericAscOrdering(a: any, b: any): number;

    export function lengths(...xs: Array<any[]>): Array<number>;

    export function toShortest(...xs: Array<any[]>): Array<any[]>;

    export function reduceUntil(pred: ListPredicate, op: ListFoldOperation, agg: any, xs: Array<any> | string | any): any;

    export function reduceUntilRight(pred: ListPredicate, op: ListFoldOperation, agg: any, xs: Array<any> | string | any): any;

    export function reduce(pred: ListPredicate, op: ListFoldOperation, agg: any, xs: Array<any> | string | any): any;

    export function reduceRight(pred: ListPredicate, op: ListFoldOperation, agg: any, xs: Array<any> | string | any): any;

    export function lastIndex(x: any): number;

    export function findIndexWhere(pred: ListPredicate, xs: Array<any> | string): number;

    export function findIndexWhereRight(pred: ListPredicate, xs: Array<any> | string): number;

    export function findIndicesWhere(pred: ListPredicate, xs: Array<any> | string): Array<number> | undefined;

    export function findWhere(pred: ListPredicate, xs: Array<any> | string): any | undefined;

}
