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

BSD 3 Clause.

## Resources:

- Haskell docs search engine: https://www.haskell.org/hoogle/
- Haskell prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Prelude.html
- Haskell List Prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-List.html
- Docs format: http://usejsdoc.org/
- Typedocs format: https://typedoc.org/
