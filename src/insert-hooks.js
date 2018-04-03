(function insertHooks() {
  'use strict';

  var fs = require('fs');
  var path = require('path');
  var config = require('./config.js');

  var paths = config.paths;

  if (
    !validateFileExists(paths.rootProject.packageJson, 'package.json') ||
    !validateFileExists(paths.localProject.eslintrc, 'algotech-eslintrc.js')
  ) {
    return;
  }

  var rootPackageJson = readFileToObject(paths.rootProject.packageJson);
  var localEslintrcStr = fs.readFileSync(paths.localProject.eslintrc);

  configurePrecommitHookInPackageJson(rootPackageJson);

  var stringifiedRootPackage = JSON.stringify(rootPackageJson, null, 2);

  fs.writeFileSync(paths.rootProject.packageJson, stringifiedRootPackage);
  fs.writeFileSync(paths.rootProject.eslintrc, localEslintrcStr);

  function validateFileExists(path, filename) {
    var exists = fs.existsSync(path);

    if (!exists) {
      console.log(
        'ERR: Could not find project file:',
        filename,
        'At path:',
        path
      );
    }

    return exists;
  }

  function configurePrecommitHookInPackageJson(rootPackageJson) {
    // add precommit script
    rootPackageJson.scripts = mergeObjects(
      rootPackageJson.scripts,
      {
        "precommit": "lint-staged"
      }
    );

    // add lint-staged config
    rootPackageJson['lint-staged'] = mergeObjects(
      rootPackageJson['lint-staged'],
      {
        "*.js": [
          "eslint --config .git/algotech-eslintrc.js"
        ]
      }
    );

    // add empty field for developer to specify his own .eslintrc
    rootPackageJson[config.fields.eslintrcPath] =
      rootPackageJson[config.fields.eslintrcPath] || '';
  }

  function readFileToObject(path) {
    var fileDataString = fs.readFileSync(path);
    var fileDataObject = JSON.parse(fileDataString);

    return fileDataObject;
  }

  function mergeObjects(initialConfig, newConfig, useAnd) {
    if (!initialConfig) {
      return Object.assign({}, newConfig);
    }
    if (!newConfig) {
      return Object.assign({}, initialConfig);
    }

    let mergeResult = Object.assign({}, initialConfig);

    Object.keys(newConfig).forEach(function(key) {
      if (!mergeResult[key]) {
        mergeResult[key] = newConfig[key];

        return;
      }
      if (!useAnd) {
        return;
      }

      if (mergeResult[key].includes(newConfig[key])) {
        return;
      }

      mergeResult[key] = mergeResult[key] + ' && ' + newConfig[key];
    });

    return mergeResult;
  }
})();
