[![Build Status](https://travis-ci.org/functional-jslib/fjl.png)](https://travis-ci.org/functional-jslib/fjl)
[![GitHub version](https://badge.fury.io/gh/functional-jslib%2Ffjl.svg)](http://badge.fury.io/gh/functional-jslib%2Ffjl)
[![NPM version](https://badge.fury.io/js/fjl.svg)](http://badge.fury.io/js/fjl)
[![Dependencies](https://david-dm.org/functional-jslib/fjl.png)](https://david-dm.org/functional-jslib/fjl)
# fjl
Functional Javascript Library

## Motivations:
- Haskell and it's `Prelude`.
- Lambda Calculus.
- The need for a way to do strong, and loose, type checking in combination,
however necessary, in actual javascript code (not in typescript).
- The need to be able to write functional code very quickly and
easily in combination with the aforementioned.
- A functional library that takes advantage of the es6 features of the language
and is built from the ground up using functional concepts.
- A functional library that is exported to multiple formats
(umd, amd, commonjs, es6-modules, and iife).
- "" that has both curried and un-curried versions of included operations.  Et. al. `append`, `_append` (uncurrued)
- Etc. etc..

### Docs
Jsdocs here:
https://functional-jslib.github.io/fjl/

### Notable methods not added from the haskell prelude:
- Math/Integral/Num/etc. methods
- `scan*`, `permutations` and several others in the list's prelude (these are pending implementation)
- Few others from prelude.

### Included methods
Methods dealing with lists (strings/arrays etc.) and objects.
Full list coming soon.

### Needed
- [ ] - Implementations of the `scan*` methods?
- [ ] - "" of the Math methods?
- [ ] - A friendly function names module has to be built
for some of these functions as most javascript developers
will not be familiar with the function names and paradigms
used in haskell.
- [ ] - Also some of the utility functions used to create
the libraries functions should be exported with clear and meaningful
names (they haven't been reviewed for export yet).

## Reasoning for paradigms
### Use of for loops instead of built-ins:
- They are faster than iterating with functional array additions (`map`, `forEach` etc.)
as you can see from many performance tests online @todo add references here
(or writing your own @todo add references here).
- They perform faster than `while` and `do {} while {}` loops.
- They allow us to make our curried functional additions (`map`, `some` etc.)
more performant than just currying the built in ones.

## Sections in Readme:
- [Getting Started](#getting-started)
- [Unit Tests](#unit-tests)
- [Requirements](#requirements)
- [Supported Platforms](#supported-platforms)
- [License](#license)

## Getting Started:

### In Browser:
In the './dist' folder there are three distributed builds available for the
browser:

- './dist/iife' - Immediately Invoked Function Execution - (exports `fjl` as a global).
- './dist/cjs' - CommonJs module format.
- './dist/umd' - Universal module definition format.

### In NodeJs: 

#### Using CommonJs modules:
```
const fjl = require('fjl');
```

#### Using es2015 modules:
```
import {...} from 'fjl';
```

## Fjl Members List:
#### Members, Properties and Methods:

- [fjl.all](#fjlall)
- [fjl.alwaysFalse](#fjlalwaysfalse)
- [fjl.alwaysTrue](#fjlalwaystrue)
- [fjl.and](#fjland)
- [fjl.any](#fjlany)
- [fjl.append](#fjlappend)
- [fjl.appendMany](#fjlappendmany)
- [fjl.apply](#fjlapply)
- [fjl.assign](#fjlassign)
- [fjl.assignDeep](#fjlassigndeep)
- [fjl.at](#fjlat)
- [fjl.breakOnList](#fjlbreakonlist)
- [fjl.call](#fjlcall)
- [fjl.complement](#fjlcomplement)
- [fjl.compose](#fjlcompose)
- [fjl.concat](#fjlconcat)
- [fjl.concatMap](#fjlconcatmap)
- [fjl.curry](#fjlcurry)
- [fjl.curry2](#fjlcurry2)
- [fjl.curry2_](#fjlcurry2_)
- [fjl.curry3](#fjlcurry3)
- [fjl.curry3_](#fjlcurry3_)
- [fjl.curry4](#fjlcurry4)
- [fjl.curry4_](#fjlcurry4_)
- [fjl.curry5](#fjlcurry5)
- [fjl.curry5_](#fjlcurry5_)
- [fjl.curryN](#fjlcurryn)
- [fjl.curryN_](#fjlcurryn_)
- [fjl.curry_](#fjlcurry_)
- [fjl.cycle](#fjlcycle)
- [fjl.difference](#fjldifference)
- [fjl.drop](#fjldrop)
- [fjl.dropWhile](#fjldropwhile)
- [fjl.dropWhileEnd](#fjldropwhileend)
- [fjl.elem](#fjlelem)
- [fjl.elemIndex](#fjlelemindex)
- [fjl.elemIndices](#fjlelemindices)
- [fjl.filter](#fjlfilter)
- [fjl.find](#fjlfind)
- [fjl.findIndex](#fjlfindindex)
- [fjl.findIndices](#fjlfindindices)
- [fjl.flip](#fjlflip)
- [fjl.flip3](#fjlflip3)
- [fjl.flip4](#fjlflip4)
- [fjl.flip5](#fjlflip5)
- [fjl.flipN](#fjlflipn)
- [fjl.foldl](#fjlfoldl)
- [fjl.foldl1](#fjlfoldl1)
- [fjl.foldr](#fjlfoldr)
- [fjl.foldr1](#fjlfoldr1)
- [fjl.group](#fjlgroup)
- [fjl.groupBy](#fjlgroupby)
- [fjl.hasOwnProperty](#fjlhasownproperty)
- [fjl.head](#fjlhead)
- [fjl.id](#fjlid)
- [fjl.init](#fjlinit)
- [fjl.inits](#fjlinits)
- [fjl.insert](#fjlinsert)
- [fjl.insertBy](#fjlinsertby)
- [fjl.instanceOf](#fjlinstanceof)
- [fjl.intercalate](#fjlintercalate)
- [fjl.intersect](#fjlintersect)
- [fjl.intersectBy](#fjlintersectby)
- [fjl.intersperse](#fjlintersperse)
- [fjl.isArray](#fjlisarray)
- [fjl.isBoolean](#fjlisboolean)
- [fjl.isCallable](#fjliscallable)
- [fjl.isClass](#fjlisclass)
- [fjl.isEmpty](#fjlisempty)
- [fjl.isEmptyCollection](#fjlisemptycollection)
- [fjl.isEmptyList](#fjlisemptylist)
- [fjl.isEmptyObject](#fjlisemptyobject)
- [fjl.isFalsy](#fjlisfalsy)
- [fjl.isFunction](#fjlisfunction)
- [fjl.isInfixOf](#fjlisinfixof)
- [fjl.isMap](#fjlismap)
- [fjl.isNull](#fjlisnull)
- [fjl.isNumber](#fjlisnumber)
- [fjl.isObject](#fjlisobject)
- [fjl.isPrefixOf](#fjlisprefixof)
- [fjl.isSet](#fjlisset)
- [fjl.isString](#fjlisstring)
- [fjl.isSubsequenceOf](#fjlissubsequenceof)
- [fjl.isSuffixOf](#fjlissuffixof)
- [fjl.isSymbol](#fjlissymbol)
- [fjl.isTruthy](#fjlistruthy)
- [fjl.isType](#fjlistype)
- [fjl.isUndefined](#fjlisundefined)
- [fjl.isUsableImmutablePrimitive](#fjlisusableimmutableprimitive)
- [fjl.isWeakMap](#fjlisweakmap)
- [fjl.isWeakSet](#fjlisweakset)
- [fjl.isset](#fjlisset)
- [fjl.iterate](#fjliterate)
- [fjl.keys](#fjlkeys)
- [fjl.last](#fjllast)
- [fjl.length](#fjllength)
- [fjl.lines](#fjllines)
- [fjl.lookup](#fjllookup)
- [fjl.map](#fjlmap)
- [fjl.mapAccumL](#fjlmapaccuml)
- [fjl.mapAccumR](#fjlmapaccumr)
- [fjl.maximum](#fjlmaximum)
- [fjl.maximumBy](#fjlmaximumby)
- [fjl.minimum](#fjlminimum)
- [fjl.minimumBy](#fjlminimumby)
- [fjl.negateF](#fjlnegatef)
- [fjl.negateF3](#fjlnegatef3)
- [fjl.negateF4](#fjlnegatef4)
- [fjl.negateF5](#fjlnegatef5)
- [fjl.negateFMany](#fjlnegatefmany)
- [fjl.negateP](#fjlnegatep)
- [fjl.notElem](#fjlnotelem)
- [fjl.nub](#fjlnub)
- [fjl.nubBy](#fjlnubby)
- [fjl.objComplement](#fjlobjcomplement)
- [fjl.objDifference](#fjlobjdifference)
- [fjl.objIntersect](#fjlobjintersect)
- [fjl.objUnion](#fjlobjunion)
- [fjl.of](#fjlof)
- [fjl.or](#fjlor)
- [fjl.partition](#fjlpartition)
- [fjl.permutations](#fjlpermutations)
- [fjl.product](#fjlproduct)
- [fjl.prop](#fjlprop)
- [fjl.remove](#fjlremove)
- [fjl.removeBy](#fjlremoveby)
- [fjl.removeFirstsBy](#fjlremovefirstsby)
- [fjl.repeat](#fjlrepeat)
- [fjl.replicate](#fjlreplicate)
- [fjl.reverse](#fjlreverse)
- [fjl.scanl](#fjlscanl)
- [fjl.scanl1](#fjlscanl1)
- [fjl.scanr](#fjlscanr)
- [fjl.scanr1](#fjlscanr1)
- [fjl.sort](#fjlsort)
- [fjl.sortBy](#fjlsortby)
- [fjl.sortOn](#fjlsorton)
- [fjl.span](#fjlspan)
- [fjl.splitAt](#fjlsplitat)
- [fjl.stripPrefix](#fjlstripprefix)
- [fjl.subsequences](#fjlsubsequences)
- [fjl.sum](#fjlsum)
- [fjl.tail](#fjltail)
- [fjl.tails](#fjltails)
- [fjl.take](#fjltake)
- [fjl.takeWhile](#fjltakewhile)
- [fjl.transpose](#fjltranspose)
- [fjl.typeOf](#fjltypeof)
- [fjl.uncons](#fjluncons)
- [fjl.unfoldr](#fjlunfoldr)
- [fjl.union](#fjlunion)
- [fjl.unionBy](#fjlunionby)
- [fjl.unlines](#fjlunlines)
- [fjl.until](#fjluntil)
- [fjl.unwords](#fjlunwords)
- [fjl.unzip](#fjlunzip)
- [fjl.unzipN](#fjlunzipn)
- [fjl.version](#fjlversion)
- [fjl.words](#fjlwords)
- [fjl.zip](#fjlzip)
- [fjl.zipN](#fjlzipn)
- [fjl.zipWith](#fjlzipwith)
- [fjl.zipWith3](#fjlzipwith3)
- [fjl.zipWith4](#fjlzipwith4)
- [fjl.zipWith5](#fjlzipwith5)
- [fjl.zipWithN](#fjlzipwithn)
- [fjl.__](#fjl__)
- [fjl._all](#fjl_all)
- [fjl._any](#fjl_any)
- [fjl._append](#fjl_append)
- [fjl._appendMany](#fjl_appendmany)
- [fjl._apply](#fjl_apply)
- [fjl._assign](#fjl_assign)
- [fjl._assignDeep](#fjl_assigndeep)
- [fjl._at](#fjl_at)
- [fjl._breakOnList](#fjl_breakonlist)
- [fjl._call](#fjl_call)
- [fjl._complement](#fjl_complement)
- [fjl._concatMap](#fjl_concatmap)
- [fjl._cycle](#fjl_cycle)
- [fjl._difference](#fjl_difference)
- [fjl._drop](#fjl_drop)
- [fjl._dropWhile](#fjl_dropwhile)
- [fjl._dropWhileEnd](#fjl_dropwhileend)
- [fjl._elem](#fjl_elem)
- [fjl._elemIndex](#fjl_elemindex)
- [fjl._elemIndices](#fjl_elemindices)
- [fjl._filter](#fjl_filter)
- [fjl._find](#fjl_find)
- [fjl._findIndex](#fjl_findindex)
- [fjl._findIndices](#fjl_findindices)
- [fjl._flip](#fjl_flip)
- [fjl._flip3](#fjl_flip3)
- [fjl._flip4](#fjl_flip4)
- [fjl._flip5](#fjl_flip5)
- [fjl._flipN](#fjl_flipn)
- [fjl._foldl](#fjl_foldl)
- [fjl._foldl1](#fjl_foldl1)
- [fjl._foldr](#fjl_foldr)
- [fjl._foldr1](#fjl_foldr1)
- [fjl._groupBy](#fjl_groupby)
- [fjl._hasOwnProperty](#fjl_hasownproperty)
- [fjl._insert](#fjl_insert)
- [fjl._insertBy](#fjl_insertby)
- [fjl._instanceOf](#fjl_instanceof)
- [fjl._intercalate](#fjl_intercalate)
- [fjl._intersect](#fjl_intersect)
- [fjl._intersectBy](#fjl_intersectby)
- [fjl._intersperse](#fjl_intersperse)
- [fjl._isInfixOf](#fjl_isinfixof)
- [fjl._isPrefixOf](#fjl_isprefixof)
- [fjl._isSubsequenceOf](#fjl_issubsequenceof)
- [fjl._isSuffixOf](#fjl_issuffixof)
- [fjl._isType](#fjl_istype)
- [fjl._iterate](#fjl_iterate)
- [fjl._lookup](#fjl_lookup)
- [fjl._map](#fjl_map)
- [fjl._mapAccumL](#fjl_mapaccuml)
- [fjl._mapAccumR](#fjl_mapaccumr)
- [fjl._maximumBy](#fjl_maximumby)
- [fjl._minimumBy](#fjl_minimumby)
- [fjl._notElem](#fjl_notelem)
- [fjl._nubBy](#fjl_nubby)
- [fjl._objComplement](#fjl_objcomplement)
- [fjl._objDifference](#fjl_objdifference)
- [fjl._objIntersect](#fjl_objintersect)
- [fjl._objUnion](#fjl_objunion)
- [fjl._partition](#fjl_partition)
- [fjl._prop](#fjl_prop)
- [fjl._remove](#fjl_remove)
- [fjl._removeBy](#fjl_removeby)
- [fjl._removeFirstsBy](#fjl_removefirstsby)
- [fjl._repeat](#fjl_repeat)
- [fjl._replicate](#fjl_replicate)
- [fjl._sortBy](#fjl_sortby)
- [fjl._sortOn](#fjl_sorton)
- [fjl._span](#fjl_span)
- [fjl._splitAt](#fjl_splitat)
- [fjl._stripPrefix](#fjl_stripprefix)
- [fjl._take](#fjl_take)
- [fjl._takeWhile](#fjl_takewhile)
- [fjl._unfoldr](#fjl_unfoldr)
- [fjl._union](#fjl_union)
- [fjl._unionBy](#fjl_unionby)
- [fjl._until](#fjl_until)
- [fjl._zip](#fjl_zip)
- [fjl._zipN](#fjl_zipn)
- [fjl._zipWith](#fjl_zipwith)

### fjl.all
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.alwaysFalse
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.alwaysTrue
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.and
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.any
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.append
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.appendMany
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.apply
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.assign
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.assignDeep
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.at
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.breakOnList
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.call
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.complement
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.compose
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.concat
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.concatMap
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry2
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry2_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry3
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry3_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry4
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry4_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry5
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry5_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curryN
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curryN_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.cycle
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.difference
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.drop
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.dropWhile
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.dropWhileEnd
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.elem
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.elemIndex
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.elemIndices
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.filter
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.find
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.findIndex
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.findIndices
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.flip
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.flip3
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.flip4
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.flip5
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.flipN
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.foldl
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.foldl1
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.foldr
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.foldr1
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.group
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.groupBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.hasOwnProperty
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.head
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.id
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.init
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.inits
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.insert
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.insertBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.instanceOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.intercalate
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.intersect
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.intersectBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.intersperse
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isArray
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isBoolean
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isCallable
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isClass
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isEmpty
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isEmptyCollection
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isEmptyList
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isEmptyObject
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isFalsy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isFunction
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isInfixOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isMap
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isNull
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isNumber
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isObject
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isPrefixOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isSet
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isString
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isSubsequenceOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isSuffixOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isSymbol
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isTruthy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isType
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isUndefined
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isUsableImmutablePrimitive
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isWeakMap
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isWeakSet
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.iterate
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.keys
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.last
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.length
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.lines
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.lookup
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.map
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.mapAccumL
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.mapAccumR
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.maximum
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.maximumBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.minimum
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.minimumBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.negateF
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.negateF3
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.negateF4
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.negateF5
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.negateFMany
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.negateP
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.notElem
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.nub
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.nubBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.objComplement
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.objDifference
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.objIntersect
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.objUnion
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.of
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.or
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.partition
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.permutations
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.product
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.prop
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.remove
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.removeBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.removeFirstsBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.repeat
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.replicate
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.reverse
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.scanl
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.scanl1
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.scanr
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.scanr1
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.sort
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.sortBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.sortOn
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.span
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.splitAt
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.stripPrefix
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.subsequences
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.sum
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.tail
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.tails
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.take
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.takeWhile
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.transpose
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.typeOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.uncons
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.unfoldr
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.union
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.unionBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.unlines
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.until
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.unwords
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.unzip
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.unzipN
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.version
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.words
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.zip
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.zipN
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.zipWith
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.zipWith3
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.zipWith4
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.zipWith5
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.zipWithN
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._all
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._any
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._append
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._appendMany
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._apply
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._assign
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._assignDeep
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._at
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._breakOnList
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._call
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._complement
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._concatMap
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._cycle
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._difference
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._drop
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._dropWhile
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._dropWhileEnd
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._elem
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._elemIndex
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._elemIndices
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._filter
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._find
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._findIndex
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._findIndices
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._flip
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._flip3
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._flip4
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._flip5
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._flipN
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._foldl
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._foldl1
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._foldr
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._foldr1
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._groupBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._hasOwnProperty
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._insert
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._insertBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._instanceOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._intercalate
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._intersect
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._intersectBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._intersperse
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._isInfixOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._isPrefixOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._isSubsequenceOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._isSuffixOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._isType
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._iterate
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._lookup
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._map
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._mapAccumL
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._mapAccumR
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._maximumBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._minimumBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._notElem
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._nubBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._objComplement
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._objDifference
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._objIntersect
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._objUnion
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._partition
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._prop
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._remove
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._removeBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._removeFirstsBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._repeat
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._replicate
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._sortBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._sortOn
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._span
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._splitAt
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._stripPrefix
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._take
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._takeWhile
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._unfoldr
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._union
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._unionBy
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._until
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._zip
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._zipN
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl._zipWith
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.__
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

## Unit Tests:
To run unit tests:

1.)  First do an `npm install` in project root.

2.)  For running tests on './src' with node:
Run one of the following from your terminal (from repo root):
 - `$ npm test` 

## Requirements:
- Javascript versions Ecmascript 5+

## Supported Platforms:

### Browsers
- IE9+, and all other modern day browsers.

### NodeJs
- ~~4.0.0+~~
- 6.11.x+

## License:
[GPL v2+](http://www.gnu.org/licenses/gpl-2.0.html "http://www.gnu.org/licenses/gpl-2.0.html") AND
[MIT](http://opensource.org/licenses/MIT "http://opensource.org/licenses/MIT")

## Notes:
- './.babelrc' is used only for tests.  Babel configurations found in './gulpfileConfig.json' are the 
configurations used for building the project.

## Todos:
### MVP 1.0.0
- [X] - Rename `pureCurry` and `pureCurryN` to `curry` and `curryN` respectively.
- [X] - Rename old `curry{suffix}` functions to `curry{suffix}_` in lieu of previous change (also since 
these functions are overloaded and aren't pure curry functions due to their placeholder manipulation feature).
- [X] - ~~Remove functional operators (`zero`, `alt` etc.)  out into their own package (?) (tentative).~~
- [X] - ~~Make all functional members compatible with es6 classes.~~ No constructors included in library.
- [X] - Remove use of 'gulp-better-rollup' in favor of using rollup directly.
- [ ] - Re-instate the use of .travisci file when project is passed 'alpha' stage.'
- [X] - Consider renaming methods/members in the './src/uncurried' package with a prefixed '_'.
- [X] - Consider renaming './src/uncurried' file names with prefixed '_'.
- [ ] - Move remaining todos to 'issues' tracker.
