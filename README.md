# coding-standards-javascript

Automatically adds linter rules into your project and checks the codings
standards on git hooks.

### Currently provides functionalities:

 - Automatically adds a best practices eslint config with the possibility to specify a local eslint config to overwrite existing rules.
 - Runs eslint in precommit, on staged files.

### How to install

`npm install --save-dev algotech/coding-standards-javascript`

_(Optionally)_ Specify the path of you local esliter config file relative to the
project root, in _package.json_ (_custom-eslintrc-path_ property).

#### What to know before installing

By installing this project the following modifications will be made
automatically to the project:
 - Will create an _algotech-eslintrc.js_ file into the project _/.git_
directory.
 - Will modify the `package.json` file with the following:
    - Will add a new script (if not already exists):
    ```js
      "scripts": {
        <other scripts>
        "precommit": "lint-staged"
      }
    ```
    - Will add a "lint-staged" config  (if not already exists):
    ```js
      "lint-staged": {
        "*.js": [
          "eslint --config .git/algotech-eslintrc.js"
        ]
      }
    ```
    - Will add a "custom-eslintrc-path" property (if not already exists):
    ```js
      "custom-eslintrc-path": ""
    ```

The __precommit__ script is called every time a _git precommit hook_ is
executed, which is every time you create a new commit or update an existing one.
In this case, _lint-staged is run_ on all the staged files.

The __lint-stage__ config specifies what to run for each type of staged file, in
order to check the coding standards.

The __custom-eslintrc-path__ is there __to be modified by you__. If you already
have an _eslint config file_ on the project and you want to keep that as _top
priority rules_, you must specify the name of the file here. If the config file
is not in the root directory, specify the relative path to the file, starting
from the project root.

#### What to know before uninstalling

By installing this project the following modifications will be made
automatically to the project:
 - Will delete the _./git/algotech-eslintrc.js_ config file.
 - Will modify the _package.json_ file with the following:
    - Will remove the _"precommit"_ script.
    - Will remove the _"lint-staged"_ configuration.
    - Will remove the _"custom-eslintrc-path"_ property.
