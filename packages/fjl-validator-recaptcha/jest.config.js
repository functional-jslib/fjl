const path = require('path'),
  tsConfigFilePath = path.join(__dirname, 'tsconfig.spec.json')
;
module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  testMatch: [
    '**/tests/**/*@(.test|_test|.spec).ts',
    '**/tests/**/test-*.ts',
  ],
  testEnvironment: 'node',
  transform: {
    '\\.ts$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: tsConfigFilePath
    }
  }
};
