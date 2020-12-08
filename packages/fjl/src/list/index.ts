/**
 * ListLike operations module.
 * @module list
 * @todo add tests for 'iterate' and 'repeat'
 */
import {length} from '../platform/object';

// List methods
// ----
import {map} from './map';
import {append} from './append';
import {head} from './head';
import {last} from './last';
import {tail} from './tail';
import {init} from './init';
import {uncons} from './uncons';
import {unconsr} from './unconsr';
import {concat} from './concat';
import {concatMap} from './concatMap';
import {reverse} from './reverse';
import {intersperse} from './intersperse';
import {intercalate} from './intercalate';
import {transpose} from './transpose';
import {take} from './take';
import {filter} from './filter';
import {maximum} from './maximum';
import {sortBy} from './sortBy';
import {subsequences} from './subsequence';
import {permutations} from './permutations';
import {iterate} from './iterate';
import {repeat} from './repeat';
import {foldl} from './foldl';
import {foldl1} from './foldl1';
import {foldr} from './foldr';
import {foldr1} from './foldr1';
import {mapAccumL} from './mapAccumL';
import {mapAccumR} from './mapAccumR';
import {replicate} from './replicate';
import {cycle} from './cycle';
import {unfoldr} from './unfoldr';
import {findIndex} from './findIndex';
import {findIndices} from './findIndices';
import {elemIndex} from './elemIndex';
import {elemIndices} from './elemIndices';
import {drop} from './drop';
import {splitAt} from './splitAt';
import {takeWhile} from './takeWhile';
import {dropWhile} from './dropWhile';
import {dropWhileEnd} from './dropWhileEnd';
import {push} from './push';
import {pushMany} from './pushMany';
import {span} from './span';
import {breakOnList} from './breakOnList';
import {at} from './at';
import {find} from './find';
import {forEach} from './forEach';
import {partition} from './partition';
import {elem} from './elem';
import {notElem} from './notElem';
import {isPrefixOf} from './isPrefixOf';
import {isSuffixOf} from './isSuffixOf';
import {isInfixOf} from './isInfixOf';
import {isSubsequenceOf} from './isSubsequenceOf';
import {group} from './group';
import {groupBy} from './groupBy';
import {inits} from './inits';
import {tails} from './tails';
import {stripPrefix} from './stripPrefix';
import {zip} from './zip';
import {zipN} from './zipN';
import {zip3} from './zip3';
import {zipWith} from './zipWith';
import {zipWithN} from './zipWithN';
import {zipWith3} from './zipWith3';
import {unzip} from './unzip';
import {unzipN} from './unzipN';
import {any} from './any';
import {all} from './all';
import {and} from './and';
import {or} from './or';
import {not} from './not';
import {sum} from './sum';
import {product} from './product';
import {minimum} from './minimum';
import {scanl} from './scanl';
import {scanl1} from './scanl1';
import {scanr} from './scanr';
import {scanr1} from './scanr1';
import {nub} from './nub';
import {remove} from './remove';
import {sort} from './sort';
import {sortOn} from './sortOn';
import {insert} from './insert';
import {nubBy} from './nubBy';
import {insertBy} from './insertBy';
import {removeBy} from './removeBy';
import {removeFirstsBy} from './removeFirstsBy';
import {unionBy} from './unionBy';
import {union} from './union';
import {intersect} from './intersect';
import {intersectBy} from './intersectBy';
import {difference} from './difference';
import {complement} from './complement';

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
  groupBy, inits, tails, stripPrefix, zip, zipN, zip3,
  zipWith, zipWithN, zipWith3,
  unzip, unzipN, any, all, and, or, not, sum, product, minimum,
  scanl, scanl1, scanr, scanr1, nub, remove, sort, sortOn, insert,
  insertBy, nubBy, removeBy, removeFirstsBy, unionBy, union,
  intersect, intersectBy, difference, complement,
};

export {slice, includes, indexOf, lastIndexOf} from '../platform';
export * from './range';
export * from './utils';

