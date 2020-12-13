const path = require('path'),
  tsConfigFilePath = path.join(__dirname, 'tsconfig.spec.json')
;
module.exports = {
  preset: 'ts-jest',
  testMatch: [
    '**/tests/**/*@(.test|_test|.spec).ts',
    '**/tests/**/test-*.ts',
  ],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: tsConfigFilePath
    }
  }
};
