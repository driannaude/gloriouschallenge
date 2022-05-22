/* eslint-disable */
const esModules = ['@cennznet', '@polkadot', '@babel'].join('|');

export default {
  displayName: 'ui',
  preset: '../../jest.preset.js',
  transform: {
    [`(${esModules}).+\\.js$`]: 'babel-jest',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/ui',
};
