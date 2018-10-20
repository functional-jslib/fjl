
## Docs

**JSDocs** [https://functional-jslib.github.io/fjl]

The docs are divided into modules though, note, all methods live on `fjl` (top level export).

### About library's usage of currying.
- All methods that take 2 or more arguments are curried.
- Methods that take rest params "only" are curried in some cases and not curried in others (see: `compose`, `peek` et. al.).
- Methods that require one argument and rest params are curried at up to 2 parameters.

**Note**: As a side-effect of the way currying was defined in the library curried functions retain their arity/remaining-arity lengths.

### Library methods:
