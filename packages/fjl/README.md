# fjl

Functional Javascript Library (inspired by Haskell's Prelude).

### Supported Platforms:

- Ecmascript 6+.
- NodeJs v12+

## Getting Started:

```javascript
import {partition, isEven} from 'fjl';

const numbers = Array(10).fill(0, 0, 10).map((_, i) => i),

  [even, odd] = partition(x => isEven(x), numbers);

console.log('Even numbers: ', even);
console.log('Odd numbers: ', odd);
```

### In Browser:

Reference one of the index.*.min.js files, from './dist' folder, or modules individually.

## Docs

@todo 

### About Currying:

- All methods have curried counterparts which are named with a leading '$' sign;  E.g., `foldl`'s curried version is `$foldl`.
- Methods that take only 'rest' parameters don't have curried counterparts `concat`, `append` etc..

#### Note: `iterate`, `repeat`, `replicate`, `cycle`

In javascript we do not have lazy lists, like in haskell, so `iterate`, `repeat`, `replicate`, and `cycle` take an integer as their first parameter in order to generate a list upto a given number of items;  E.g.,

In haskell: `take 3 $ iterate (a -> a * 2) [1..]` (`[1..]` is syntax for infinite/lazy list) will take the first `3` items of an infinite list of even numbers.

In javascript, we have no choice but to make our function call contain the `limit` information:

```
iterate(3, a => a * 2, range(1, 3)).join('') === [2, 4, 6].join('')
```

Here are what the types look like for the list generation methods:

```typescript
type Slice<T = any> = string | T[] /* | ... */;

type iterate<T> = (n: number, op: Unary<T>, x: T) => T[];
type repeat<T> = (n: number, x: T) => T[];
type replicate<T> = repeat<T>;
type cycle<T> = (n: number, xs: Slice<T>) => Slice<T>;
```

### Notable methods not added from the haskell prelude:

- Math/Integral/Num/etc. methods - These will arrive in a later release.

## Development:

- Sources are in './src'
  - './src/platform' are native platform specific method versions pulled out for use, in some places, where we didn't want to intermingle library methods with native ones.
- Distributions are in './dist'
- Docs are generated via typedoc to './docs' dir.
- Docs are written inline, in source using [jsdoc](http://usejsdoc.com), and tsdoc syntax.
- About non-conformity to full modularity (one-function-per-file) method layout - This approach is a work in progress and eventually all files will be standalone.

### Package scripts:

- `build` - Builds docs and distribution ('./dist').
- `test` - Runs unit tests.


### Unit testing:

We are using 'jest' for unit tests, but plan on migrating to 'deno'.

All tests can be, currently, found in './tests' dir.


## License:

BSD 3 Clause - Included in sub-package sources.

## Resources:

- Haskell docs search engine: https://www.haskell.org/hoogle/
- Haskell prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Prelude.html
- Haskell List Prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-List.html
- Docs format: http://usejsdoc.org/
- Typedocs format: https://typedoc.org/

## Change log

### 1.10.8 - 1.10.10

- Readme file updates, dev-dependencies update.

### 1.10.7

- Consolidated typescript type files into one types file.

### 1.10.6

- Made 'platform' module public.
- Added typescript types for all previously defined "public" modules."

### 1.10.3

- Added './types' dir for typescript type files (added in earlier commits though formerly announcing here).
- Added types file to package.json (at 'types' property).
- Refactored type definitions, a bit, (from what they were before - they were committed in earlier commits though their
  format wasn't finalized yet).
- Updated readme with note on typescript types file.
- Fixed typo in 'filter' type in list.d.ts - It's return value was marked as `void` updated to `any[]`.
- Added `warn` function to console module and to library.
- Regenerated docs, readme etc..

### 1.10.0

- Added some synonyms:
  - `isLoosely` for `isOfType`
  - `isStrictly` for `isType`
  - `isStrictlyOneOf` for `isOneOf`
- Cleaned up, tablelized, and optimized some tests ('./tests/test-object').
- Optimized some implementations (`src/object/is`)

#### New addition:

- `isLooselyOneOf` - For type checking with mix-match type refs (constructor names and constructors):

  ```javascript
  const someValue = 'someValue';
isLooselyOneOf(someValue, 'Undefined', Function, 'Map');
// `false` - Doesn't match any type.

isLooselyOneOf(someValue, 'Undefined', String, 'Map');
// `true` - Matches `String`

isLooselyOneOf(someValue, 'Undefined', 'String', 'Map');
// `true` - Matches 'String'
  ```

- `instanceOfOne` - `instanceOf` for one or more types:

  ```javascript
  const someValue = 'hello';
instanceOfOne(someValue, Function, String, Array)
// `true` matches - String
  ```

### 1.9.0

- Added `toFunction` (for functional composition of values that must pass as functions).

### 1.8.0

- Added `trampoline` method (for tail call elimination).

### 1.7.0

#### Deprecations

- Marked `hasOwnProperty` as deprecated (as property is not really in the haskell prelude and is a bit of an oddity when
  it comes to the functional mindset).

#### New additions

- Re-instantiated `flip3`, `flip4`, `flip5` - Turns out there was a use for these after-all (`fjl.native`).
- Added `native` which includes all the static methods that live on `Object` though flipped and curried.
- Added 'fjl-mutable' as part of source. All methods of 'fjl-mutable' now live directly on 'fjl' and are defined in '
  fjl/objects/defineProp' (or more directly in src at './src/objects/defineProp').

#### Development changes.

- Updated  'dev-deps' to use latest babel.
- Updated gulp version
- Updated .travis* file.
- Moved './gulpfile.js' to 'gulpfile.babel.js' in order to easily use es6 imports.

### 1.6.2

- String support for `takeWhile`, `group`, and `groupBy`, `dropWhileEnd`.
- Tablelized tests for `takeWhile`, `dropWhileEnd`, and `dropWhileEnd`.

### 1.6.0

- A few more functions now support strings:
  - `map`, `intersperse`, `append`, `reverse`, and `concat`.
- `range` function doc-block updated.
- `listUtil` functions updated and their docs unblocked from jsdocs.
- `listUtil` methods are now exported from 'src/list'.
- Tests overhaul stage 1 progress.
  - Converted some tests to table format (where implementations were touched and where the functional programming style
    was too extreme).
  - Removed some library functions from tests where said functions were not being tested (use native functions for tests
    only (no-library functions intermingle (in tests))).
- Cleaned up imports in some places to protect from cyclic dependency issues.

### 1.5.1, 1.5.2

- Added './types/index.ts' file.

### 1.5.0

#### Breaking changes

- `reduceRightUntil` changed to `reduceUntilRight`.
- `lengthsToSmallest` changed to `toShortest`.

##### Changes that affect development of the library:

- package.json.scripts - Removed unnecessary commands (cleaned up scripts section).
- Updated gulp to version 4.
- Updated gulpfile to use new `gulp 4` api.
- Removed unnecessary dev dependencies:
  - random-js
  - lazypipe
  - requirejs
  - gulp-fncallback

#### Other changes

- Cleaned up README.md to reflect latest changes.
- Curried functions (functions curried via `curry*` functions) now retain their arity property value (`length` value).

### 1.3.0

- Added `noop` (no-op (op as in operation)) method (useful as a placeholder for variables/properties that should always
  contain a function).
- Added test for `noop` addition.
- Updated './docs'.
- Added entry in 'docs' config to take into account upcoming logo for 'fjl'.

