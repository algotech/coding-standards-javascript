module.exports = {
  paths: {
    rootProject: {
      // All paths should be relative to this package folder inside node_modules
      packageJson: '../../package.json',
      eslintrc: '../../.git/algotech-eslintrc.js',
    },
    localProject: {
      // All paths should be relative to this projects root directory
      eslintrc: 'src/algotech-eslintrc.js',
    },
  },
  fields: {
    // If you update this value, please also field value in algotech-eslintrc.js
    eslintrcPath: 'custom-eslintrc-path',
  },
}
