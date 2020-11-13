module.exports = {
    preset: 'ts-jest',
    testMatch: [
        '**/packages/**/*@(.test|_test|.spec).ts'
    ],
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.spec.json'
        }
    }
};
