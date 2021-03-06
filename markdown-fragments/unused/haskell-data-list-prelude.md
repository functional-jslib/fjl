#fjl - listOps
This package will contain all the functions from 
the haskell Data.List package (url here: http://hackage.haskell.org/package/base-4.10.0.0/docs/Data-List.html):

Implementations expected:
(**Note**: Some implementations will vary slightly from
their haskell counterparts mostly due to javascript's non-curried
nature;  E.g., predicates in javascript (for lists) will be of the form
`(element, index, list) => Boolean)` unless otherwise specified;
Operations that are passed in to functions as operations will 
receive multiple parameters (`until` and `iterate` for example)
to make them more useful in javascript.

- `(++) :: [a] -> [a] -> [a]` - `append` or `mappend` 
- `head :: [a] -> a`
- `last :: [a] -> a`
- `tail :: [a] -> [a]`
- `init :: [a] -> [a]`
- `uncons :: [a] -> Maybe (a, [a])`
- `null :: Foldable t => t a -> Bool`
- `length :: Foldable t => t a -> Int`
- `map :: (a -> b) -> [a] -> [b]`
- `reverse :: [a] -> [a]`
- `intersperse :: a -> [a] -> [a]`
- `intercalate :: [a] -> [[a]] -> [a]`
- `transpose :: [[a]] -> [[a]]`
- `subsequences :: [a] -> [[a]]`
- `permutations :: [a] -> [[a]]`
- `foldl :: Foldable t => (b -> a -> b) -> b -> t a -> b`
- `foldl' :: Foldable t => (b -> a -> b) -> b -> t a -> b`
- `foldl1 :: Foldable t => (a -> a -> a) -> t a -> a`
- `foldl1' :: (a -> a -> a) -> [a] -> a`
- `foldr :: Foldable t => (a -> b -> b) -> b -> t a -> b`
- `foldr1 :: Foldable t => (a -> a -> a) -> t a -> a`
- `concat :: Foldable t => t [a] -> [a]`
- `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
- `and :: Foldable t => t Bool -> Bool`
- `or :: Foldable t => t Bool -> Bool`
- `any :: Foldable t => (a -> Bool) -> t a -> Bool`
- `all :: Foldable t => (a -> Bool) -> t a -> Bool`
- `sum :: (Foldable t, Num a) => t a -> a`
- `product :: (Foldable t, Num a) => t a -> a`
- `maximum :: forall a. (Foldable t, Ord a) => t a -> a`
- `minimum :: forall a. (Foldable t, Ord a) => t a -> a`
- `scanl :: (b -> a -> b) -> b -> [a] -> [b]`
- `scanl' :: (b -> a -> b) -> b -> [a] -> [b]`
- `scanl1 :: (a -> a -> a) -> [a] -> [a]`
- `scanr :: (a -> b -> b) -> b -> [a] -> [b]`
- `scanr1 :: (a -> a -> a) -> [a] -> [a]`
- `mapAccumL :: Traversable t => (a -> b -> (a, c)) -> a -> t b -> (a, t c)`
- `mapAccumR :: Traversable t => (a -> b -> (a, c)) -> a -> t b -> (a, t c)`
- `iterate :: (a -> a) -> a -> [a]`
- `repeat :: a -> [a]`
- `replicate :: Int -> a -> [a]`
- `cycle :: [a] -> [a]`
- `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
- `take :: Int -> [a] -> [a]`
- `drop :: Int -> [a] -> [a]`
- `splitAt :: Int -> [a] -> ([a], [a])`
- `takeWhile :: (a -> Bool) -> [a] -> [a]`
- `dropWhile :: (a -> Bool) -> [a] -> [a]`
- `dropWhileEnd :: (a -> Bool) -> [a] -> [a]`
- `span :: (a -> Bool) -> [a] -> ([a], [a])`
- `break :: (a -> Bool) -> [a] -> ([a], [a])`
- `stripPrefix :: Eq a => [a] -> [a] -> Maybe [a]`
- `group :: Eq a => [a] -> [[a]]`
- `inits :: [a] -> [[a]]`
- `tails :: [a] -> [[a]]`
- `isPrefixOf :: Eq a => [a] -> [a] -> Bool`
- `isSuffixOf :: Eq a => [a] -> [a] -> Bool`
- `isInfixOf :: Eq a => [a] -> [a] -> Bool`
- `isSubsequenceOf :: Eq a => [a] -> [a] -> Bool`
- `elem :: (Foldable t, Eq a) => a -> t a -> Bool`
- `notElem :: (Foldable t, Eq a) => a -> t a -> Bool`
- `lookup :: Eq a => a -> [(a, b)] -> Maybe b`
- `find :: Foldable t => (a -> Bool) -> t a -> Maybe a`
- `filter :: (a -> Bool) -> [a] -> [a]`
- `partition :: (a -> Bool) -> [a] -> ([a], [a])`
- `(!!) :: [a] -> Int -> a` - Bracket access of properties; E.g. `a[prop]`
- `elemIndex :: Eq a => a -> [a] -> Maybe Int`
- `elemIndices :: Eq a => a -> [a] -> [Int]`
- `findIndex :: (a -> Bool) -> [a] -> Maybe Int`
- `findIndices :: (a -> Bool) -> [a] -> [Int]`
- `zip :: [a] -> [b] -> [(a, b)]`
- `zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]`
- `zip4 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
- `zip5 :: [a] -> [b] -> [c] -> [d] -> [e] -> [(a, b, c, d, e)]`
- `zip6 :: [a] -> [b] -> [c] -> [d] -> [e] -> [f] -> [(a, b, c, d, e, f)]`
- `zip7 :: [a] -> [b] -> [c] -> [d] -> [e] -> [f] -> [g] -> [(a, b, c, d, e, f, g)]`
- `zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]`
- `zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]`
- `zipWith4 :: (a -> b -> c -> d -> e) -> [a] -> [b] -> [c] -> [d] -> [e]`
- `zipWith5 :: (a -> b -> c -> d -> e -> f) -> [a] -> [b] -> [c] -> [d] -> [e] -> [f]`
- `zipWith6 :: (a -> b -> c -> d -> e -> f -> g) -> [a] -> [b] -> [c] -> [d] -> [e] -> [f] -> [g]`
- `zipWith7 :: (a -> b -> c -> d -> e -> f -> g -> h) -> [a] -> [b] -> [c] -> [d] -> [e] -> [f] -> [g] -> [h]`
- `unzip :: [(a, b)] -> ([a], [b])`
- `unzip3 :: [(a, b, c)] -> ([a], [b], [c])`
- `unzip4 :: [(a, b, c, d)] -> ([a], [b], [c], [d])`
- `unzip5 :: [(a, b, c, d, e)] -> ([a], [b], [c], [d], [e])`
- `unzip6 :: [(a, b, c, d, e, f)] -> ([a], [b], [c], [d], [e], [f])`
- `unzip7 :: [(a, b, c, d, e, f, g)] -> ([a], [b], [c], [d], [e], [f], [g])`
- `lines :: String -> [String]`
- `words :: String -> [String]`
- `unlines :: [String] -> String`
- `unwords :: [String] -> String`
- `nub :: Eq a => [a] -> [a]`
- `delete :: Eq a => a -> [a] -> [a]` - `remove`
- `(\\) :: Eq a => [a] -> [a] -> [a]` - `difference`
- `union :: Eq a => [a] -> [a] -> [a]`
- `intersect :: Eq a => [a] -> [a] -> [a]`
- `sort :: Ord a => [a] -> [a]`
- `sortOn :: Ord b => (a -> b) -> [a] -> [a]`
- `insert :: Ord a => a -> [a] -> [a]`
- `nubBy :: (a -> a -> Bool) -> [a] -> [a]`
- `deleteBy :: (a -> a -> Bool) -> a -> [a] -> [a]` - `removeBy`
- `deleteFirstsBy :: (a -> a -> Bool) -> [a] -> [a] -> [a]` - `removeFirstBy`
- `unionBy :: (a -> a -> Bool) -> [a] -> [a] -> [a]`
- `intersectBy :: (a -> a -> Bool) -> [a] -> [a] -> [a]`
- `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
- `sortBy :: (a -> a -> Ordering) -> [a] -> [a]`
- `insertBy :: (a -> a -> Ordering) -> a -> [a] -> [a]`
- `maximumBy :: Foldable t => (a -> a -> Ordering) -> t a -> a`
- `minimumBy :: Foldable t => (a -> a -> Ordering) -> t a -> a`

### Tentative additions 
May be to much complexity to introduce to javascript (but will
be kept here for possible future considerations).

- `genericLength :: Num i => [a] -> i`
- `genericTake :: Integral i => i -> [a] -> [a]`
- `genericDrop :: Integral i => i -> [a] -> [a]`
- `genericSplitAt :: Integral i => i -> [a] -> ([a], [a])`
- `genericIndex :: Integral i => [a] -> i -> a`
- `genericReplicate :: Integral i => i -> a -> [a]`


## Notes
