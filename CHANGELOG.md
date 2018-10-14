# Change log

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

