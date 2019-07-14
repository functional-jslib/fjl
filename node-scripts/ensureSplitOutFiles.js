const {ioFileExists, ioWriteFile} = require('./utils/ioUtils'),

    path = require('path'),

    {log, error} = console,

    peek = (...args) => {
        log(...args);
        return args.pop();
    },

    listMethods = [
        'map', 'slice', 'includes', 'indexOf', 'lastIndexOf', 'push', 'append', 'head', 'last',
        'tail', 'init', 'uncons', 'unconsr', 'concat', 'concatMap', 'reverse', 'intersperse',
        'intercalate', 'transpose', 'subsequences', 'swapped', 'permutations', 'foldl',
        'foldr', 'foldl1', 'foldr1', 'mapAccumL', 'mapAccumR', 'iterate', 'repeat', 'replicate',
        'cycle', 'unfoldr', 'findIndex', 'findIndices', 'elemIndex', 'elemIndices', 'take',
        'drop', 'splitAt', 'takeWhile', 'dropWhile', 'dropWhileEnd', 'span', 'breakOnList',
        'at', 'find', 'forEach', 'filter', 'partition', 'elem', 'notElem', 'isPrefixOf',
        'isSuffixOf', 'isInfixOf', 'isSubsequenceOf', 'group', 'groupBy', 'inits', 'tails',
        'stripPrefix', 'zip', 'zipN', 'zip3', 'zip4', 'zip5', 'zipWith', 'zipWithN', 'zipWith3',
        'zipWith4', 'zipWith5', 'unzip', 'unzipN', 'any', 'all', 'and', 'or', 'not', 'sum', 'product',
        'maximum', 'minimum', 'scanl', 'scanl1', 'scanr', 'scanr1', 'nub', 'remove', 'sort',
        'sortOn', 'sortBy', 'insert', 'insertBy', 'nubBy', 'removeBy', 'removeFirstsBy',
        'unionBy', 'union', 'intersect', 'intersectBy', 'difference', 'complement',
        'sliceFrom', 'sliceTo', 'sliceCopy', 'genericAscOrdering', 'lengths', 'toShortest',
        'reduceUntil', 'reduceUntilRight', 'reduce', 'reduceRight', 'lastIndex',
        'findIndexWhere', 'findIndexWhereRight', 'findIndicesWhere', 'findWhere',
        'aggregateArray', 'range'
    ],

    methodsNamesMap = {
        list: listMethods
    },

    {keys} = Object,

    run = () => Promise.all(
        keys(methodsNamesMap).flatMap(moduleName =>
            methodsNamesMap[moduleName].map(methodName => {
                const testFilePath = path.join(__dirname, '..', 'tests', moduleName, `test-${methodName}.ts`),
                    srcFilePath = path.join(__dirname, '..', 'src', moduleName, `${methodName}.ts`)
                ;

                log(`Running process for ${moduleName}.${methodName}`);

                return Promise.all([

                    // Test if exists 'tests/${moduleName}/${methodName}.ts'
                    ioFileExists(testFilePath)
                        //  if not create it
                        .catch(() => ioWriteFile(testFilePath, '\n').then(() => log(`${testFilePath} written successfully.`))),

                    // Test if exists 'src/${moduleName}/${methodName}.ts'
                    ioFileExists(srcFilePath)
                        //  if not create it
                        .catch(() =>
                            ioWriteFile(srcFilePath, '\n')
                                .then(() => log(`${srcFilePath} written successfully.`)))
                ]);
            })
        )
    )
        .then(
            () => {
                log('process completed successfully.');
                return 0;
            },
            error
        );

run();
