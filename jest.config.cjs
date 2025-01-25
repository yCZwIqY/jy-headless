module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!your-package-to-transform).+\\.js$'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};
