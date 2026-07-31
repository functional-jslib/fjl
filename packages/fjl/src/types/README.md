## 'types/'

Shared type definitions for the library.

### Generic parameter naming

Two conventions live here, and which one applies depends on what the type
describes.

**Positional** — for types that describe an anonymous function *shape*, where a
generic stands for "the type of the nth argument" and has no domain meaning.
Use `A`, `B`, `C`, … for parameters in order, and `RetT` for the return type:

```ts
export type Ternary<A = any, B = any, C = any, RetT = any> = (a?: A, b?: B, c?: C) => RetT;
```

This is the convention used throughout `arity.ts`, and it is intentional — `A`
is the clearest available name for "first argument," so these types are exempt
from the naming rule below regardless of how many generics they take.

**Named** — for types that describe a specific operation, where each generic
has a role worth stating. Name every one of them; do not mix named generics
with leftover positional letters:

```ts
// Illustrative target shape — every generic states its role.
export type MapAccumOp<AccumT, ElementT, MappedT, IndexT, ElementsT> =
  (agg?: AccumT, x?: ElementT, i?: IndexT, xs?: ElementsT) => [AccumT, MappedT];
```

Suffix conventions in use: `*T` for a type (`RetT`, `ZeroT`, `AccumT`), `Ftr*`
for a functor, and `*Op` on the type name itself for operation callbacks passed
to list methods.

### Deprecations

Several types here are `@deprecated` with their replacement named in the doc
block — `ForEachOp` and `MapOp` → `Ternary`, `ReduceOp` → `Quaternary`,
`PredForSlice` → `TernaryPred`, `SliceConstructor` → direct type constructors,
`Lengthable` → `NumberIndexable`. Prefer the replacement in new code; don't
invest in refining a deprecated type.

@todo Document the remaining exported types.
