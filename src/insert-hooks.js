(function insertHooks() {
  var fs = require('fs');
  var path = require('path');

  var rootProjectPackageJsonPath = '../../package.json';
  var localEslintrcPath = 'src/algotech-eslintrc.js';
  var rootProjectEslintFilePath = '../../.git/algotech-eslintrc.js';

  if (
    !validateFileExists(rootProjectPackageJsonPath, 'package.json') ||
    !validateFileExists(localEslintrcPath, 'src/algotech-eslintrc.js')
  ) {
    return;
  }

  var rootPackageJson = readFileToObject(rootProjectPackageJsonPath);
  var localEslintrcStr = fs.readFileSync(localEslintrcPath);

  updateRootPackageJson(rootPackageJson);

  var stringifiedRootPackage = JSON.stringify(rootPackageJson, null, 2);

  fs.writeFileSync(rootProjectPackageJsonPath, stringifiedRootPackage);
  fs.writeFileSync(rootProjectEslintFilePath, localEslintrcStr);

  function validateFileExists(path, filename) {
    var exists = fs.existsSync(path);

    if (!exists) {
      console.log(
        'ERR: Could not find root project',
        filename,
        'file.Tested path:',
        path
      );
    }

    return exists;
  }

  function updateRootPackageJson(rootPackageJson) {
    rootPackageJson.scripts = mergeObjects(
      rootPackageJson.scripts,
      {
        "precommit": "lint-staged"
      }
    );
    rootPackageJson['lint-staged'] = mergeObjects(
      rootPackageJson['lint-staged'],
      {
        "*.js": [
          "eslint --config .git/algotech-eslintrc.js"
        ]
      }
    );
    rootPackageJson['eslintrc-path'] =  rootPackageJson['eslintrc-path'] || '';
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
