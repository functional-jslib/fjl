## Motivations:
- Haskell and it's `Prelude` (Functional programming).
- Lambda Calculus.
- The need for: 
    - functional 'combinators' in javascript (without requiring typescript) (index.d.ts being developed for typescript users).
    - the ability to write functional code quickly and easily (using the likes of `curry`, `isset`, `compose` etc.).
    - a library written from the ground up using es6 and functional concepts.
    - a library that is exported to multiple formats (umd, amd, commonjs, es6-modules, and iife).
    - a library that should be easy to update by functional programmers.
    - Et. al..

### Reasoning for library design choices
#### Use of while-and-for-loops instead of built-ins:
- They are faster than iterating with es5 functional array additions (`map`, `forEach` etc.)
 (do search for `foreach vs for loop` and/or similar on the web).
- Native array functional methods are used in some places in the library (due to functional composition and cyclic redundancy of includes (which could be partially mitigated by separating every function into it's own file *but more on that later).

#### Currying
In order to make library easier to use for functional code/programmers the library's
methods are curried with the exception/rules listed in the section further above 
["About library's usage of currying."](#about-librarys-usage-of-currying)
