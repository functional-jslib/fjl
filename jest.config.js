module.exports = {
    preset: 'ts-jest',
    testMatch: [
        '**/packages/**/*.test.ts'
    ],
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json'
        }
    }
};
