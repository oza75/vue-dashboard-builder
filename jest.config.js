const { defaults } = require('jest-config');
module.exports = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testMatch: [...defaults.testMatch, '**/tests/unit/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
};
