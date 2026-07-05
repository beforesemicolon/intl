module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
  ],
  testRegex: './src/.*\\.(test|spec)?\\.(js|ts)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ["<rootDir>/scripts/set-tests-up.cjs"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 98,
      lines: 98,
      statements: 98,
    },
  },
};
