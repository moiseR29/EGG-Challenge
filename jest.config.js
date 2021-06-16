/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  //collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
  ],
  coverageDirectory: '<rootDir>/coverage/',
  testMatch: ['**/test/**/*.test.+(ts)'],
  //verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  forceExit: true,
  //testTimeout: 10000,
};
