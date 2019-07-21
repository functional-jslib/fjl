/**
 * ListLike operations module.
 * @module list
 * @todo add tests for 'iterate' and 'repeat'
 */
import {length} from './jsPlatform/object';

// List methods
// ----
import {map} from './list/map';
import {append} from './list/append';
import {head} from './list/head';
import {last} from './list/last';
import {tail} from './list/tail';
import {init} from './list/init';
import {uncons} from './list/uncons';
import {unconsr} from './list/unconsr';
import {concat} from './list/concat';
import {concatMap} from './list/concatMap';
import {reverse} from './list/reverse';
import {intersperse} from './list/intersperse';
import {intercalate} from './list/intercalate';
import {transpose} from './list/transpose';
import {take} from './list/take';
import {filter} from './list/filter';
import {maximum} from './list/maximum';
import {sortBy} from './list/sortBy';
import {subsequences} from './list/subsequence';
import {permutations} from './list/permutations';
import {iterate} from './list/iterate';
import {repeat} from './list/repeat';
import {foldl} from './list/foldl';
import {foldl1} from './list/foldl1';
import {foldr} from './list/foldr';
import {foldr1} from './list/foldr1';
import {mapAccumL} from './list/mapAccumL';
import {mapAccumR} from './list/mapAccumR';
import {replicate} from './list/replicate';
import {cycle} from './list/cycle';
import {unfoldr} from './list/unfoldr';
import {findIndex} from './list/findIndex';
import {findIndices} from './list/findIndices';
import {elemIndex} from './list/elemIndex';
import {elemIndices} from './list/elemIndices';
import {drop} from './list/drop';
import {splitAt} from './list/splitAt';
import {takeWhile} from './list/takeWhile';
import {dropWhile} from './list/dropWhile';
import {dropWhileEnd} from './list/dropWhileEnd';
import {push} from './list/push';
import {pushMany} from './list/pushMany';
import {span} from './list/span';
import {breakOnList} from './list/breakOnList';
import {at} from './list/at';
import {find} from './list/find';
import {forEach} from './list/forEach';
import {partition} from './list/partition';
import {elem} from './list/elem';
import {notElem} from './list/notElem';
import {isPrefixOf} from './list/isPrefixOf';
import {isSuffixOf} from './list/isSuffixOf';
import {isInfixOf} from './list/isInfixOf';
import {isSubsequenceOf} from './list/isSubsequenceOf';
import {group} from './list/group';
import {groupBy} from './list/groupBy';
import {inits} from './list/inits';
import {tails} from './list/tails';
import {stripPrefix} from './list/stripPrefix';
import {zip} from './list/zip';
import {zipN} from './list/zipN';
import {zip3} from './list/zip3';
import {zip4} from './list/zip4';
import {zip5} from './list/zip5';
import {zipWith} from './list/zipWith';
import {zipWithN} from './list/zipWithN';
import {zipWith3} from './list/zipWith3';
import {zipWith4} from './list/zipWith4';
import {zipWith5} from './list/zipWith5';
import {unzip} from './list/unzip';
import {unzipN} from './list/unzipN';
import {any} from './list/any';
import {all} from './list/all';
import {and} from './list/and';
import {or} from './list/or';
import {not} from './list/not';
import {sum} from './list/sum';
import {product} from './list/product';
import {minimum} from './list/minimum';
import {scanl} from './list/scanl';
import {scanl1} from './list/scanl1';
import {scanr} from './list/scanr';
import {scanr1} from './list/scanr1';
import {nub} from './list/nub';
import {remove} from './list/remove';
import {sort} from './list/sort';
import {sortOn} from './list/sortOn';
import {insert} from './list/insert';
import {nubBy} from './list/nubBy';
import {insertBy} from './list/insertBy';
import {removeBy} from './list/removeBy';
import {removeFirstsBy} from './list/removeFirstsBy';
import {unionBy} from './list/unionBy';
import {union} from './list/union';
import {intersect} from './list/intersect';
import {intersectBy} from './list/intersectBy';
import {difference} from './list/difference';
import {complement} from './list/complement';

// List method exports
// ----
export {
    append, head, last, tail, init, uncons, unconsr,
    push, pushMany, concat, concatMap, length, map,
    reverse, intersperse, intercalate, transpose, filter,
    maximum, sortBy, take, subsequences, permutations,
    foldl, foldl1, foldr, foldr1, mapAccumL, mapAccumR,
    iterate, repeat, replicate, cycle, unfoldr,
    findIndex, findIndices, elemIndex, elemIndices,
    drop, splitAt, takeWhile, dropWhile, dropWhileEnd, span,
    breakOnList, at, find, forEach, partition, elem, notElem,
    isPrefixOf, isSuffixOf, isInfixOf, isSubsequenceOf, group,
    groupBy, inits, tails, stripPrefix, zip, zipN, zip3, zip4,
    zip5, zipWith, zipWithN, zipWith3, zipWith4, zipWith5,
    unzip, unzipN, any, all, and, or, not, sum, product, minimum,
    scanl, scanl1, scanr, scanr1, nub, remove, sort, sortOn, insert,
    insertBy, nubBy, removeBy, removeFirstsBy, unionBy, union,
    intersect, intersectBy, difference, complement,
};

export {slice, includes, indexOf, lastIndexOf} from './jsPlatform';
export * from './list/range';
export * from './list/utils';

