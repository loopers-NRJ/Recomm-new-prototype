/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 60 * 1000, // 1000ms = 1 second
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
