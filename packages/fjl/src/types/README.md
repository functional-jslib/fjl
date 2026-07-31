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
export type MapAccumOp<
  AccumT = any,
  ElementT = any,
  MappedT = any,
  IndexT = number | string,
  ElementsT extends NumberIndexable<ElementT> = ElementT[]
> =
  (agg?: AccumT, x?: ElementT, i?: IndexT, xs?: ElementsT) => [AccumT, MappedT];
```

Suffix conventions in use: `*T` for a type (`RetT`, `ZeroT`, `AccumT`), `Ftr*`
for a functor, and `*Op` on the type name itself for operation callbacks passed
to list methods.

### Generic defaults

Method/operation types keep a default on **every** generic parameter, e.g.
`<T = any>`, and where a generic is itself parameterised by another declared
generic the default is written in terms of it (`ElementsT ... = ElementT[]`).

There is no inherent performance or flexibility cost to doing so, and it buys
two things: callers can name only the generics they care about (`MapAccumOp<number>`
rather than spelling out all five), and the surrounding method types stay easy
to reshape while v2.0 is in flight. Applies to `arity.ts`, `MapAccumOp`,
`NumberIndexable`, `native.ts`'s `Define*Func` types, and the `*Op`/`*Func`
types declared next to the list methods themselves (`ScanlOp`, `ScanrOp`,
`ZipWith3Op`, `TuplizeOp`, `OrderingFunc`).

### Removed types

The `@deprecated` generics that used to live in `data.ts`/`list.ts` are gone as
of v2.0. Use the replacement named below:

| Removed | Use instead |
| --- | --- |
| `ForEachOp` | `Ternary` |
| `MapOp` | `Ternary` |
| `ReduceOp` | `Quaternary` |
| `PredForSlice` | `TernaryPred` |
| `SliceConstructor` | `StringConstructor` / `ArrayConstructor` directly |
| `Lengthable` | `NumberIndexable` |
| `Nameable` | your own type, or a native one (`{readonly name: string}`) |
| `ArrayType` | the array constructor types directly (`ArrayTypeConstructor`) |
| `Slice` | `NumberIndexable<T>`, or `string \| T[]` — see below |

`Slice` was an interface standing in for exactly one thing: the built-in
`string | T[]` union. It also leaked `any` (`[index: number]: any`, `at(i): any`),
erasing the element type it was parameterised on. It has no single successor;
pick based on what the code actually does:

- reads only `length` and numeric indices → `NumberIndexable<T>`;
- calls `slice`/`concat`/`at` → `string | T[]`, as a generic constraint
  (`TS extends string | T[]`) when the same container type must come back out.

`Iterable<T>` is the right type for the iteration-oriented API surface (see
#43), but not for these — it provides none of `slice`, `concat`, `at`, or
numeric indexing.

@todo Document the remaining exported types.
