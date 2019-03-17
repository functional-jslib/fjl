module.exports = {
    preset: 'ts-jest',
    testMatch: [
        '**/tests/**/test-*.ts'
    ],
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json'
        }
    }
};
