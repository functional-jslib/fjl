## Unit Tests:
To run unit tests:

1.)  First do an `npm install` in project root.

2.)  For running tests on './src' with node:
Run one of the following from your terminal:
 - `$ gulp tests`, 
 - `$ npm tests` 
 - `mocha tests/ --harmony --compilers js:babel-core/register`

3.)  For running tests on './dist/cjs' with node:
 - `mocha tests/for-cjs --harmony`
