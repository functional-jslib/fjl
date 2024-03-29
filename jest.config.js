const path = require('path'),
  testMatch = [
    '**/tests/**/*@(.test|_test|.spec).@(ts|js)',
    '**/tests/**/test-*.@(ts|js)',
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
    // 'fjl-validator-recaptcha',
    'fjl-inputfilter'
  ]
    .map(packageName => {
      const tsConfigFilePath = path.join(__dirname, `packages/${packageName}/tsconfig.spec.json`),

        out = {
          displayName: packageName,
          rootDir: path.dirname(tsConfigFilePath),
          testMatch,
          transform
        };

      if (packageName.includes('recaptcha')) out.preset = 'jest-puppeteer';

      return out;
    }),
};
