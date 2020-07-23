const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  globals: {
    'ts-jest': {
      diagnostics: {
        // warnOnly: true
        // 6059, 18002, 18003 by default
        // 2341 - private properties
        ignoreCodes: [6059, 18002, 18003, 2341]
      }
    }
  },
};
