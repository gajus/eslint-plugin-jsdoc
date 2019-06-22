# CONTRIBUTING to eslint-plugin-jsdoc

## Testing changes locally

You might try a TDD approach and add tests within the `test` directory,
to try different configs, you may find it easier to try out changes in
a separate local directory.

You can run [`npm link`](https://docs.npmjs.com/cli/link) for this purpose,
pointing from your project to this project. For example, while in your project
root and with `eslint-plugin-jsdoc` as a sibling, run:

```shell
npm link ../eslint-plugin-jsdoc
```

## Building the project

After running `npm install` to get the latest dependencies and devDependencies,
you can run the following command to update the `dist` files, with `dist/index.js`
being the `main` entrance point from `package.json`:

```shell
npm run build
```

## Coding standards

The project follows ESLint rules from [`canonical`](https://www.npmjs.com/package/eslint-config-canonical)
and testing follows its subconfig, `canonical/mocha`.

## Testing

Tests are expected. Each rule file should be in CamelCase (despite the rule names themselves being hyphenated) and should be added within `test/assertions` and then imported/required by
`test/rules/index.js`.

Each rule file should be an ESM default export of an object which has `valid` and `invalid` array properties containing the tests. Tests of each type should be provided.

`parserOptions` will be `ecmaVersion: 6` by default, but tests can override `parserOptions`
with their own.

See ESLint's [RuleTester](https://eslint.org/docs/developer-guide/nodejs-api#ruletester)
for more on the allowable properties (e.g., `code`, `errors` (for invalid rules),
`options`, `settings`, etc.).

Note that besides `npm test`, there is `npm run test-cov` which shows more detailed
information on coverage. Coverage should be maintained at 100%, and if there are
a few guards in place for future use, the code block in question can be ignored
by being preceded by `/* istanbul ignore next */`.

## Requirements for PRs

PRs should be mergeable, [rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)
first against the latest `master`.

The number of commits will ideally be limited in number, unless extra commits
can better show a progression of features.

Commit messages should be worded clearly and the reason for any PR made clear
by linking to an issue or giving a full description of what it achieves.
