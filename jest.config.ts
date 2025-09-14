import type { Config } from 'jest';

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["./src/tests"],
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
    moduleFileExtensions: ["ts", "js", "json", "node"],
};

export default config;