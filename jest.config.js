const path = require('path'),
  testMatch = [
    '**/tests/**/*@(.test|_test|.spec).ts',
    '**/tests/**/test-*.ts',
  ],
  transform = {
    '\\.ts$': 'ts-jest'
  }
;
module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  testEnvironment: 'node',
  projects: [
    'fjl',
    'fjl-validator',
    'fjl-inputfilter'
  ]
    .map(packageName => {
      const tsConfigFilePath = path.join(__dirname, `packages/${packageName}/tsconfig.spec.json`);
      return {
        displayName: packageName,
        rootDir: path.dirname(tsConfigFilePath),
        testMatch,
        transform,
        globals: {
          'ts-jest': {
            tsconfig: tsConfigFilePath
          }
        }
      };
    }),
};
