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
- [ ] - Remove us of 'gulp-better-rollup' in favor of using rollup directly.
- [ ] - Re-instate the use of .travisci file when project is passed 'alpha' stage.'

