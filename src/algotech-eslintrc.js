"use strict";

var fs = require('fs');
var path = require('path');

var extendedConfigFilesArray = [
  '../node_modules/algotech-eslint-rules/src/rules/index.js',
];

// find package.json and add the eslintrc-path file path if exists
var rootProjectPackageJsonPath = 'package.json';
var eslintrcPathField = 'custom-eslintrc-path';

if (fs.existsSync(rootProjectPackageJsonPath)) {
  var rootPackageString = fs.readFileSync(rootProjectPackageJsonPath);
  var rootPackageObject = JSON.parse(rootPackageString);
  var rootProjectEslintrcPath = rootPackageObject[eslintrcPathField];

  if (fs.existsSync(rootProjectEslintrcPath)) {
    var localEslintrcPath = path.join('..', rootProjectEslintrcPath);

    extendedConfigFilesArray.push(localEslintrcPath);
  }
}

module.exports = {
  'extends': extendedConfigFilesArray,
};
