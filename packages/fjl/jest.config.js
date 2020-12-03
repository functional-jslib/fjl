module.exports = {
    preset: 'ts-jest',
    testMatch: [
        '**/src/**/*@(.test|_test|.spec).ts',
        '**/tests/**/test-*.ts',
    ],
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.spec.json'
        }
    }
};
