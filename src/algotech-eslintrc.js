'use strict';

var fs = require('fs');
var path = require('path');

var extendedConfigFilesArray = [
  '../node_modules/algotech-eslint-rules/src/rules/index.js',
];

var packageJsonPath = 'package.json';
var eslintrcPathField = 'custom-eslintrc-path';

/*
  Finds package.json and adds the eslintrcPathField referenced file to the
  config.
 */
if (fs.existsSync(packageJsonPath)) {
  var packageJsonString = fs.readFileSync(packageJsonPath);
  var packageJsonObject = JSON.parse(packageJsonString);
  var rootProjectEslintrcPath = packageJsonObject[eslintrcPathField];

  if (fs.existsSync(rootProjectEslintrcPath)) {
    var localEslintrcPath = path.join('..', rootProjectEslintrcPath);

    extendedConfigFilesArray.push(localEslintrcPath);
  }
}

module.exports = {
  'extends': extendedConfigFilesArray,
};
