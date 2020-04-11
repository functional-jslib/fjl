module.exports = {
    preset: 'ts-jest',
    testMatch: [
        '**/tests/list/**/test-*.ts'
    ],
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json'
        }
    }
};
