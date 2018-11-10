## Change log
### 1.7.0
#### Deprecations
- Marked `hasOwnProperty` as deprecated (as property
 is not really in the haskell prelude and is a bit
 of an oddity when it comes to the functional mindset).
 
#### New additions
- Re-instantiated `flip3`, `flip4`, `flip5` - Turns out there was a use for these after-all (`fjl.native`).
- Added `native` which includes all the 
static methods that live on `Object` though
flipped and curried.

#### Development changes.
- Updated  'dev-deps' to use latest babel.
- Updated gulp version
- Updated .travis* file.
- Moved './gulpfile.js' to 'gulpfile.babel.js'  in order to easily use es6 imports.

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
    - Converted some tests to table format (where implementations were touched and 
        where the functional programming style was too extreme).
    - Removed some library functions from tests where said functions were not being tested (use native functions for tests only (no-library functions intermingle (in tests))).
- Cleaned up imports in some places to protect from cyclic dependency issues.

### 1.5.1, 1.5.2
- Added './types/index.d.ts' file.

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
- Added `noop` (no-op (op as in operation)) method (useful as a placeholder for variables/properties that should always contain a function).
- Added test for `noop` addition.
- Updated './docs'.
- Added entry in 'docs' config to take into account upcoming logo for 'fjl'.

