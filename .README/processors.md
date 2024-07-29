## Processors

Normally JavaScript content inside JSDoc tags is not discoverable by ESLint.
`eslint-plugin-jsdoc` offers a processor which allows ESLint to parse `@example`
and other tag text for JavaScript so that it can be linted.

The approach below works in ESLint 9. For ESLint 7, please see our [`check-examples`](./rules/check-examples.md#readme) rule.

The approach requires that we first indicate the JavaScript files that will be checked for `@example` tags.

```js
import getJsdocProcessorPlugin from 'eslint-plugin-jsdoc/getJsdocProcessorPlugin.js';

export default [
  {
    files: ['**/*.js'],
    plugins: {
      examples: getJsdocProcessorPlugin({
        // Enable these options if you want the `someDefault` inside of the
        //   following to be checked in addition to `@example`:
        //     1. `@default someDefault`
        //     2. `@param [val=someDefault]`,
        //     3. `@property [val=someDefault]`
        // checkDefaults: true,
        // checkParams: true,
        // checkProperties: true
      })
    },
    processor: 'examples/examples'
  },
],
```

Now you can target the JavaScript inside these `@example` or default blocks
by the following:

```js
  // Since `@example` JavaScript often follows the same rules as JavaScript in
  //  Markdown, we use the `.md` extension as the parent by default:
  {
    files: ['**/*.md/*.js'],
    rules: {
      // Enable or disable rules for `@example` JavaScript here
    }
  },
  {
    files: ['**/*.jsdoc-defaults', '**/*.jsdoc-params', '**/*.jsdoc-properties'],
    rules: {
      // Enable or disable rules for `@default`, `@param`, or `@property`
      //    JavaScript here
    }
  }
```

Alternatively you can just use our built-in configs which do the above for you:

```js
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  ...index.configs.examples

  // Or for @default, @param and @property default expression processing
  // ...index.configs['default-expressions']

  // Or for both, use:
  // ...jsdoc.configs['examples-and-default-expressions'],
];
```

These configs also disable certain rules which are rarely useful in an
`@example` or default context. For example both kinds disable the rule
`no-unused-vars` since it is common for short demos to show how to declare
a variable, but not how to use it.

Default expressions are usually even more strict as they are typically not
going to form a whole statement, but just an expression. With the following:

```js
/**
 * @param [abc=someDefault]
 */
function quux (abc) {}
```

...`someDefault` can be checked as JavaScript, but we don't want rules like
`no-unused-expressions` firing, since we're not going to use the expression
here.

For defaults, a couple rules are enabled which are usually useful:

- `quotes` - Set to `double`. It is more common within this
  context for double quotes to be used.
- `semi` - Set to 'never' since a semi-colon is not desirable in this context.

### Options

#### `checkDefaults`

Whether to check `@default` tags. Defaults to `false`.

#### `checkExamples`

Whether to check `@example` tags. Defaults to `true`.

#### `checkParams`

Whether to check `@param [name=someDefaultValue]` content. Defaults to `false`.

#### `checkProperties`

Whether to check `@property [name=someDefaultValue]` content. Defaults to `false`.

#### `captionRequired`

Whether to require the JSDoc `<caption></caption>` content inside the `@example`
tag. Defaults to `false`.

#### `paddedIndent`

The number of spaces to assume at the beginning of each line. Defaults to 0. Should
only have an effect on whitespace-based rules.

#### `matchingFileName`
#### `matchingFileNameDefaults`
#### `matchingFileNameParams`
#### `matchingFileNameProperties`

See the [`check-examples`](./rules/check-examples.md#readme) option of the
same name.

#### `exampleCodeRegex` and `rejectExampleCodeRegex`

See the [`check-examples`](./rules/check-examples.md#readme) option of the
same name.

#### `sourceType`

Whether to use "script" or "module" with the parser. Defaults to `"module"`.

#### `parser`

An alternative parser which has a `parseForESLint` method and returns the AST
on the `ast` property (like `typescript-eslint`). Defaults to using ESLint's
Espree parser.
