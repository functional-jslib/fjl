### Notes/method-requisites:
#### Note: `iterate`, `repeat`, `replicate`, `cycle`
In javascript we do not have lazy lists (infinite lists) like in haskell so 
the aforementioned methods take an integer as their first parameter;  E.g.,

In haskell, we can do the following: `take 3 $ iterate (a -> a * 2) [1..]` (`[1..]` is syntax for infinite list)
In javascript, we have no choice but to make our function call similar to:
```
iterate(3, a => a * 2, range(1, 10))
```

So, haskell definitions for our generator like methods:  
- `iterate :: (a -> a) -> [a]` 
- `repeat :: a -> [a]`
- `replicate :: Int -> a -> [a]`
- `cycle :: [a] -> [a]`
 
And our haskell signature for our javascript version methods become:
- `repeat :: Int -> a -> [a]`
- `replicate:: Int -> a -> [a]`
- `cycle :: Int -> [a] -> [a]`
- `iterate :: Int -> (a -> a) -> [a]`

**Note for haskell developers:**
- `split` in javascript is for strings.

### Utilities
#### Low level utilities
Turning regular methods into functional ones;  I.e., these 
take a `name` and return a function that take an-argument/arguments and a type value 
that has a method of `name` on it.  
The function returned takes arguments first and functor/member last.
```
fPureTakesOne, fPureTakes2, fPureTakes3, fPureTakes4, fPureTakes5,
fPureTakesOneOrMore, fPureTakesOne, fPureTakes2, fPureTakesOneOrMore
```

**Note:**
- `lastIndex` gives you the last index of a list.

### Notable methods not added from the haskell prelude:
- Math/Integral/Num/etc. methods

Jsdocs here:
https://functional-jslib.github.io/fjl/
