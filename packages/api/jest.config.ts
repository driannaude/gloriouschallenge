/* eslint-disable */

const esModules = ['@cennznet', '@polkadot', '@babel'].join('|');

export default {
  displayName: 'api',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    [`(${esModules}).+\\.js$`]: 'babel-jest',
    '^.+\\.[tj]s$': 'ts-jest',
  },
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/api',
};
