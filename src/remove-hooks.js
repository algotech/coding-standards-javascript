(function() {
  'use strict';

  var fs = require('fs');

  var config = require('./config.js');

  var paths = config.paths;

  // delete the eslint .js config file from .git directory
  if (fs.existsSync(paths.rootProject.eslintrc)) {
    fs.unlinkSync(paths.rootProject.eslintrc);
  }

  if (fs.existsSync(paths.rootProject.packageJson)) {
    let packageJsonStr = fs.readFileSync(paths.rootProject.packageJson);
    let packageJsonObj = JSON.parse(packageJsonStr);

    // remove lint-staged config from package.json
    if (
      packageJsonObj.hasOwnProperty('lint-staged') &&
      typeof packageJsonObj['lint-staged'] === 'object'
    ) {
      if (packageJsonObj['lint-staged'].hasOwnProperty('*.js')) {
        delete packageJsonObj['lint-staged']['*.js'];
      }
      if (Object.keys(packageJsonObj['lint-staged']).length === 0) {
        delete packageJsonObj['lint-staged'];
      }
    }

    if (packageJsonObj.hasOwnProperty(config.fields.eslintrcPath)) {
      delete packageJsonObj[config.fields.eslintrcPath];
    }

    // remove precommit script from package.json
    if (
      packageJsonObj.hasOwnProperty('scripts') &&
      typeof packageJsonObj['scripts']
    ) {
      if (packageJsonObj.scripts.hasOwnProperty('precommit')) {
        delete packageJsonObj.scripts.precommit;
      }
      if (Object.keys(packageJsonObj.scripts).length === 0) {
        delete packageJsonObj.scripts;
      }
    }

    // overwrite package.json
    packageJsonStr = JSON.stringify(packageJsonObj, null, 2);
    fs.writeFileSync(paths.rootProject.packageJson, packageJsonStr);
  }
})();
