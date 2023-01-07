module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  // TODO replace when adding the integration testing
  // testEnvironment: 'jsdom',
  testEnvironment: 'node',
  moduleDirectories: ['src', 'node_modules'],
  rootDir: './',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(css|scss)$': 'identity-obj-proxy',
    'src/(.*)': '<rootDir>/src/$1',
  },
//  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
