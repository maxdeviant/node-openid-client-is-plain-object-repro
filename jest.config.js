module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  resetMocks: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testRegex: '.jest.test.ts$',
  transform: { '^.+\\.ts$': ['ts-jest', { isolatedModules: true }] },
};
