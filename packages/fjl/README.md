# fjl

Functional Javascript Library (inspired by Haskell's Prelude).

### Supported Platforms:

- Ecmascript 6+.
- NodeJs v20+

## Getting Started:

```javascript
import {partition, isEven} from 'fjl';

const numbers = Array(10).fill(0, 0, 10).map((_, i) => i),

  [even, odd] = partition(x => isEven(x), numbers);

console.log('Even numbers: ', even);
console.log('Odd numbers: ', odd);
```

### In Browser:

Reference 'dist/index.*.min.js', and/or 'dist/(esm/cjs)/index*' directly (or use something like https://esm.sh/), etc.

## Docs

- [Migrating to 2.0](https://github.com/functional-jslib/fjl/blob/main/md/MIGRATION_V2.md)
- API docs: run `pnpm run docs` from the repository root to generate them with TypeDoc.

### About Currying:

- All methods, with arity greater than one, have curried counterparts, which start with a leading `$` symbol;  E.g., `foldl`'s curried version is `$foldl`.
- Methods that take only 'rest' parameters don't have curried counterparts `concat`, `append` etc.

### Notable methods not added from the haskell prelude:

- Math/Integral/Num/etc. methods - These will arrive in a later release.

## Development:

- Sources are in './src'
  - './src/_platform' are native platform specific method versions pulled out for use, in some places, where we didn't want to intermingle library methods with native ones.
- Distributions are in '**/dist'
- Docs are generated via typedoc to './docs'.
- Docs are written inline, in source using [jsdoc](http://usejsdoc.com), and tsdoc syntax.

### Package scripts:

- `build` - Builds docs and distribution ('./dist').
- `test` - Runs unit tests.
- ... See 'package.json.scripts' for more.

### Unit testing:

We are using 'jest' for unit tests, currently, but plan on migrating to 'deno', for development, linting, testing, etc.

All tests currently found in './tests'.

## License:

BSD 3 Clause.

## Resources:

- Haskell docs search engine: https://www.haskell.org/hoogle/
- Haskell prelude: https://hackage-content.haskell.org/package/base-4.22.0.0/docs/Prelude.html
- Haskell List Prelude: https://hackage-content.haskell.org/package/base-4.22.0.0/docs/Data-List.html
- Docs format: http://usejsdoc.org/
- Typedocs format: https://typedoc.org/
