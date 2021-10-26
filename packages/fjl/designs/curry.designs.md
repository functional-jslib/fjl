
## Why "unidiomatic" curry is difficult (in typescript):

### Reason 1: 
Types for the following (etc.) are required:

#### `curry2`
```
(a, b) -> c
a -> b -> c
```

#### `curry3`
```
(a, b, c) -> d
(a, b) -> c -> d
a -> b -> c -> d
a -> (b, c) -> d
```

#### `curry4`:

```
(a, b, c, d) -> e
(a, b, c) -> d -> e
(a, b) -> c -> d -> e
a -> b -> c -> d -> e
a -> b -> (c, d) -> e
a -> (b, c, d) -> e
(a, b) -> (c, d) -> e
```

#### `curry5`:

```
(a, b, c, d, e) -> f
(a, b, c, d) -> e -> f
(a, b, c) -> d -> e -> f
(a, b) -> c -> d -> e -> f
a -> b -> c -> d -> e -> f
a -> b -> c -> (d, e) -> f
a -> b -> (c, d, e) -> f
a -> (b, c, d, e) -> f
(a, b) -> (c, d, e) -> f
(a, b, c) -> (d, e) -> f
```
