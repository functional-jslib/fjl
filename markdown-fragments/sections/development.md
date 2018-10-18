## Development:
- Sources are in './src'
    - './src/jsPlatform' are native platform specific method versions
     pulled out for use (functionally), in some places, where we didn't want to
     intermingle library methods with native ones.
- Distributions are in './dist'
- Docs are generated via jsdoc to './docs' dir.
- Docs are written inline, in source using [jsdoc](http://usejsdoc.com) format.
- About non-conformity to full modularity (one-function-per-file):
    The library could have been written this way initially but was'nt, specifically 
    to make development on the library easier/faster (though it can 
    be argued that development is actually more difficult this way,
    the trade-off of being able to think of functions in groups/modules 
    and along with their relationships is easier than having to think 
    about functions as a big list of files numbering in the 10s to 100s.
      
### Package scripts:
- `build` - Builds docs and distribution ('./dist'). 
- `test-builds` - Tests' './dist'
- `test` - Runs unit tests.

### Dev notes:
- './.babelrc' is used only for tests.  Babel configurations found in './gulpfileConfig.json' are the
configurations used for building the project.

### Unit testing:
We are using 'jest' for testing.

Unit tests are grouped by exported module:
- 'tests/test-list.js' - Tests 'list' module.
- 'tests/test-object.js' - Tests 'object' module.
- 'tests/test-function.js' - Tests 'function' module.
- Et. al.

### Perf Tests:
Some performance tests were hosted at jsperf.com though that site currently broken so performance-tests/benchmarks will be added to repo at a later date (@todo).
