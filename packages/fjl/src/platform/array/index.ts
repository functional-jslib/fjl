import {toCurried2Method, toCurried3Method} from "../../utils";
import {Every, Filter, ForEach, Join, MapType, Push, Reduce, Some} from "./types";

export * from './types';

export const

    every = toCurried2Method('every') as Every<any, any[]>,

    filter = toCurried2Method('filter') as Filter<any, any[]>,

    forEach = toCurried2Method('forEach') as ForEach<any, any[]>,

    flatMap = toCurried2Method('forEach') as ForEach<any, any[]>,

    join = toCurried2Method('join') as Join<any, any[], any>,

    map = toCurried2Method('map') as MapType<any, any[], any, any[]>,

    push = toCurried2Method('push') as Push<any, any[]>,

    reduce = toCurried3Method('reduce') as Reduce<any, any[], any>,

    reduceRight = toCurried3Method('reduceRight') as Reduce<any, any[], any>,

    reverse = <T>(xs: T[]): T[] => xs.reverse(),

    some = toCurried2Method('some') as Some<any, any[]>



;
