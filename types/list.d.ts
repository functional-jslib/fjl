declare type ListPredicate = (x: any, index: number, list: (any[] | string)) => boolean;

declare type ListMapOperation = (x: any, index: number, list: (any[] | string)) => any;

declare type ListFoldOperation = (agg: any, item: any, index: number, list: (any[] | string)) => any;

declare type ListForEachOperation = (agg: any, item: any, index: number, list: (any[] | string)) => void;

declare type OrderingFunction = (a: any, b: any) => number;

declare interface List {
    concat(...fs: Array<Array<any> | string>): Array<any> | string;

    slice(startInd: number, endInd: number, list: Array<any> | string): Array<any> | string;

    includes(x: any, xs: (any[] | string | any)): boolean;

    indexOf(x: any, xs: (any[] | string | any)): number;

    lastIndexOf(x: any, xs: (any[] | string | any)): number;
}

declare function append(...args: Array<any[] | string>): any[] | string;

declare function head(list: any[] | string): any | string | undefined;

declare function tail(list: any[] | string): any[] | string | undefined;

declare function init(list: any[] | string): any[] | string | undefined;

declare function uncons(list: any[] | string): any[] | string | undefined;

declare function unconsr(list: any[] | string): any[] | string | undefined;

declare function concat(list: any[] | string[]): any[] | string;

declare function concatMap(fn: ListPredicate, list: any[] | string[]): any[] | string;

declare function reverse(list: any[] | string): any[] | string;

declare function intersperse<T>(between: T, arr: T[] | T): T[] | T;

declare function intercalate<T>(xs: T[] | T, xss: T[] | T): T[] | T;

declare function transpose(xss: Array<any[] | string>): any[] | string[];

declare function subsequences(xs: Array<any> | string): any[] | string[];

declare function permutations(xs: Array<any> | string): any[] | string[];

// @todo Continue types review here.

declare function foldl(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

declare function foldl1(fn: ListFoldOperation, xs: any [] | string): any;

declare function foldr(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

declare function foldr1(fn: ListFoldOperation, xs: any [] | string): any;

declare function mapAccumL(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

declare function mapAccumR(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

declare function iterate(limit: number, op: ListMapOperation, zero: any): any;

declare function cycle(limit: number, xs: any[]): any[];

declare function findIndex(pred: ListPredicate, xs: any[]): number;

declare function findIndices(pred: ListPredicate, xs: any[]): number[] | undefined;

declare function elemIndex(x: any, xs: any[]): number | undefined;

declare function elemIndices(pred: ListPredicate, xs: any[]): number[] | undefined;

declare function take(n: number, xs: any[]): any[];

declare function drop(n: number, xs: any[]): any[];

declare function splitAt(n: number, xs: any[]): Array<any[]>;

declare function takeWhile(fn: ListPredicate, xs: any[]): any[];

declare function dropWhile(fn: ListPredicate, xs: any[]): any[];

declare function dropWhileEnd(fn: ListPredicate, xs: any[]): any[];

declare function span(fn: ListPredicate, xs: any[]): Array<any[]>;

declare function breakOnList(fn: ListPredicate, xs: any[]): Array<any[]>;

declare function at(index: number): any;

declare function find(fn: ListPredicate, xs: any[]): any | undefined;

declare function map(fn: ListMapOperation, list: any[]): any[];

declare function forEach(fn: ListForEachOperation, xs: any[]): void;

declare function filter(fn: ListPredicate, xs: any[]): any[];

declare function partition(fn: ListPredicate, xs: any[]): Array<any[]>;

declare function elem(x: any, xs: any[]): boolean;

declare function notElem(x: any, xs: any[]): boolean;

declare function isPrefixOf(xs1: any[], xs2: any[]): boolean;

declare function isSuffixOf(xs1: any[], xs2: any[]): boolean;

declare function isInfixOf(xs1: any[], xs2: any[]): boolean;

declare function isSubsequenceOf(xs1: any[], xs2: any[]): boolean;

declare function group(xs: any[]): Array<any[]>;

declare function inits(xs: any[]): Array<any[]>;

declare function tails(xs: any[]): Array<any[]>;

declare function stripPrefix(prefix: any, xs: any[]): any[] | string;

declare function zip(xs1: any[], xs2: any[]): Array<any[]>;

declare function zipN(...lists: any[]): Array<any[]>;

declare function zip3(xs1: any[], xs2: any[], xs3: any[]): Array<any[]>;

declare function zip4(xs1: any[], xs2: any[], xs3: any[], xs4: any[]): Array<any[]>;

declare function zip5(xs1: any[], xs2: any[], xs3: any[], xs4: any[], xs5: any[]): Array<any[]>;

declare function zipWith(op: (a, b) => any[], xsA: any[], xsB: any[]): Array<any[]>;

declare function zipWithN(op: (a, b) => any[], ...lists: any[]): Array<any[]>;

declare function zipWith3(op: (a, b, c) => any[], xsA: any[], xsB: any[], xsC: any[]): Array<any[]>;

declare function zipWith4(op: (a, b, c, d) => any[], xsA: any[], xsB: any[], xsC: any[], xsD: any[]): Array<any[]>;

declare function zipWith5(op: (a, b, c, d) => any[], xsA: any[], xsB: any[], xsC: any[], xsD: any[], xsE: any[]): Array<any[]>;

declare function unzip(zippedList: Array<any[]>): Array<any[]>;

declare function unzipN(...zippedList: Array<any[]>): Array<any[]>;

declare function any(fn: ListPredicate, xs: any[]): boolean;

declare function all(fn: ListPredicate, xs: any[]): boolean;

declare function and(xs: any[]): boolean;

declare function or(xs: any[]): boolean;

declare function not(xs: any[]): boolean;

declare function sum(xs: any[]): number;

declare function product(xs: any[]): number;

declare function maximum(xs: any[]): number;

declare function minimum(xs: any[]): number;

declare function scanl(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

declare function scanl1(fn: ListFoldOperation, xs: any [] | string): any;

declare function scanr(fn: ListFoldOperation, zero: any, xs: any [] | string): any;

declare function scanr1(fn: ListFoldOperation, xs: any [] | string): any;

declare function nub(xs: any [] | string): any[];

declare function sort(xs: any [] | string): any[];

declare function sortOn(fn: (x: any) => any, xs: any [] | string): any[];

declare function sortBy(fn: OrderingFunction, xs: any [] | string): any[];

declare function insert(x: any, xs: any[]): any[];

declare function insertBy(fn: OrderingFunction, x: any, xs: any[]): any[];

declare function nubBy(fn: ListPredicate, x: any, xs: any[]): any[];

declare function removeBy(fn: ListPredicate, x: any, xs: any[]): any[];

declare function removeFirstBy(fn: ListPredicate, x: any, xs: any[]): any[];

declare function unionBy(fn: ListPredicate, xs1: any[], xs2: any[]): any[];

declare function union(xs1: any[], xs2: any[]): any[];

declare function intersect(xs1: any[], xs2: any[]): any[];

declare function intersectBy(fn: ListPredicate, xs1: any[], xs2: any[]): any[];

declare function difference(xs1: any[], xs2: any[]): any[];

declare function complement(xs1: any[], ...xs2: any[]): any[];
