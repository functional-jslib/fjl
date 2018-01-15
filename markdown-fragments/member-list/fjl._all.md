### fjl._all
Determines whether all elements of the list/foldable satisfy the given predicate (same as `[].every(fn)).
E.g.,
```
all(x => !x, [null, undefined, false, 0, '']) === true;

```

#### Parameters
- **fn {Function}** - Predicate (in the js form of predicates for array methods `(element, index, list) => Bool`). 
- **list {(Array|String|Foldable)}**
 
#### Returns
**{Boolean}**

#### Haskell Type
`all :: (Foldable t, Num index) => (a -> index -> t a -> Bool) -> t a -> Bool`

**Note:** Our predicate here uses the javascript predicate style for lists
which is `(element, indice, list) => Bool`

[Back to fjl members list.](#fjl-members-list)
