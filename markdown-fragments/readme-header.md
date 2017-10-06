[![Build Status](https://travis-ci.org/elycruz/fjl.png)](https://travis-ci.org/elycruz/fjl) 
[![GitHub version](https://badge.fury.io/gh/elycruz%2Ffjl.svg)](http://badge.fury.io/gh/elycruz%2Ffjl) 
[![NPM version](https://badge.fury.io/js/fjl.svg)](http://badge.fury.io/js/fjl)
[![Dependencies](https://david-dm.org/elycruz/fjl.png)](https://david-dm.org/elycruz/fjl)
# fjl
Functional Javascript Library

## This branch is in Alpha

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
- "" that has both curried and un-curried versions of included operations.
- Etc. etc..

### Needed
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
