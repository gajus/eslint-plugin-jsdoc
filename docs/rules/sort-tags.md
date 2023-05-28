<a name="user-content-sort-tags"></a>
<a name="sort-tags"></a>
# <code>sort-tags</code>

* [Fixer](#user-content-sort-tags-fixer)
* [Options](#user-content-sort-tags-options)
    * [`tagSequence`](#user-content-sort-tags-options-tagsequence)
    * [`alphabetizeExtras`](#user-content-sort-tags-options-alphabetizeextras)
    * [`linesBetween`](#user-content-sort-tags-options-linesbetween)
    * [`reportTagGroupSpacing`](#user-content-sort-tags-options-reporttaggroupspacing)
    * [`reportIntraTagGroupSpacing`](#user-content-sort-tags-options-reportintrataggroupspacing)
* [Context and settings](#user-content-sort-tags-context-and-settings)
* [Failing examples](#user-content-sort-tags-failing-examples)
* [Passing examples](#user-content-sort-tags-passing-examples)


Sorts tags by a specified sequence according to tag name, optionally
adding line breaks between tag groups.

(Default order originally inspired by [`@homer0/prettier-plugin-jsdoc`](https://github.com/homer0/packages/tree/main/packages/public/prettier-plugin-jsdoc).)

Optionally allows adding line breaks between tag groups and/or between tags
within a tag group.

Please note: unless you are disabling reporting of line breaks, this rule
should not be used with the default "never" or "always" options of
`tag-lines` (a rule enabled by default with the recommended config) as
that rule adds its own line breaks after tags and may interfere with any
line break setting this rule will attempt to do when not disabled.

You may, however, safely set the "any" option in that rule along with
`startLines` and/or `endLines`.

<a name="user-content-sort-tags-fixer"></a>
<a name="sort-tags-fixer"></a>
## Fixer

(TODO)

<a name="user-content-sort-tags-options"></a>
<a name="sort-tags-options"></a>
## Options

<a name="user-content-sort-tags-options-tagsequence"></a>
<a name="sort-tags-options-tagsequence"></a>
### <code>tagSequence</code>

An array of tag group objects indicating the preferred sequence for sorting tags.

Each item in the array should be an object with a `tags` property set to an array
of tag names.

Tag names earlier in the list will be arranged first. The relative position of
tags of the same name will not be changed.

Earlier groups will also be arranged before later groups, but with the added
feature that additional line breaks may be added between (or before or after)
such groups (depending on the setting of `linesBetween`).

Tag names not in the list will be grouped together at the end. The pseudo-tag
`-other` can be used to place them anywhere else if desired. The tags will be
placed in their order of appearance, or alphabetized if `alphabetizeExtras`
is enabled, see more below about that option.

Defaults to the array below (noting that it is just a single tag group with
no lines between groups by default).

Please note that this order is still experimental, so if you want to retain
a fixed order that doesn't change into the future, supply your own
`tagSequence`.

```js
[{tags: [
  // Brief descriptions
  'summary',
  'typeSummary',

  // Module/file-level
  'module',
  'exports',
  'file',
  'fileoverview',
  'overview',

  // Identifying (name, type)
  'typedef',
  'interface',
  'record',
  'template',
  'name',
  'kind',
  'type',
  'alias',
  'external',
  'host',
  'callback',
  'func',
  'function',
  'method',
  'class',
  'constructor',

  // Relationships
  'modifies',
  'mixes',
  'mixin',
  'mixinClass',
  'mixinFunction',
  'namespace',
  'borrows',
  'constructs',
  'lends',
  'implements',
  'requires',

  // Long descriptions
  'desc',
  'description',
  'classdesc',
  'tutorial',
  'copyright',
  'license',

  // Simple annotations
  'const',
  'constant',
  'final',
  'global',
  'readonly',
  'abstract',
  'virtual',
  'var',
  'member',
  'memberof',
  'memberof!',
  'inner',
  'instance',
  'inheritdoc',
  'inheritDoc',
  'override',
  'hideconstructor',

  // Core function/object info
  'param',
  'arg',
  'argument',
  'prop',
  'property',
  'return',
  'returns',

  // Important behavior details
  'async',
  'generator',
  'default',
  'defaultvalue',
  'enum',
  'augments',
  'extends',
  'throws',
  'exception',
  'yield',
  'yields',
  'event',
  'fires',
  'emits',
  'listens',
  'this',

  // Access
  'static',
  'private',
  'protected',
  'public',
  'access',
  'package',

  '-other',

  // Supplementary descriptions
  'see',
  'example',

  // METADATA

  // Other Closure (undocumented) metadata
  'closurePrimitive',
  'customElement',
  'expose',
  'hidden',
  'idGenerator',
  'meaning',
  'ngInject',
  'owner',
  'wizaction',

  // Other Closure (documented) metadata
  'define',
  'dict',
  'export',
  'externs',
  'implicitCast',
  'noalias',
  'nocollapse',
  'nocompile',
  'noinline',
  'nosideeffects',
  'polymer',
  'polymerBehavior',
  'preserve',
  'struct',
  'suppress',
  'unrestricted',

  // @homer0/prettier-plugin-jsdoc metadata
  'category',

  // Non-Closure metadata
  'ignore',
  'author',
  'version',
  'variation',
  'since',
  'deprecated',
  'todo',
]}];
```

<a name="user-content-sort-tags-options-alphabetizeextras"></a>
<a name="sort-tags-options-alphabetizeextras"></a>
### <code>alphabetizeExtras</code>

Defaults to `false`. Alphabetizes any items not within `tagSequence` after any
items within `tagSequence` (or in place of the special `-other` pseudo-tag)
are sorted.

If you want all your tags alphabetized, you can supply an empty array for
`tagSequence` along with setting this option to `true`.

<a name="user-content-sort-tags-options-linesbetween"></a>
<a name="sort-tags-options-linesbetween"></a>
### <code>linesBetween</code>

Indicates the number of lines to be added between tag groups. Defaults to 1.
Do not set to 0 or 2+ if you are using `tag-lines` and `"always"` and do not
set to 1+ if you are using `tag-lines` and `"never"`.

<a name="user-content-sort-tags-options-reporttaggroupspacing"></a>
<a name="sort-tags-options-reporttaggroupspacing"></a>
### <code>reportTagGroupSpacing</code>

Whether to enable reporting and fixing of line breaks between tag groups
as set by `linesBetween`. Defaults to `true`. Note that the very last tag
will not have spacing applied regardless. For adding line breaks there, you
may wish to use the `endLines` option of the `tag-lines` rule.

<a name="user-content-sort-tags-options-reportintrataggroupspacing"></a>
<a name="sort-tags-options-reportintrataggroupspacing"></a>
### <code>reportIntraTagGroupSpacing</code>

Whether to enable reporting and fixing of line breaks within tags of a given
tag group. Defaults to `true` which will remove any line breaks at the end of
such tags. Do not use with `true` if you are using `tag-lines` and `always`.

<a name="user-content-sort-tags-context-and-settings"></a>
<a name="sort-tags-context-and-settings"></a>
## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|any|
|Recommended|false|
|Settings||
|Options|`alphabetizeExtras`, `linesBetween`, `reportIntraTagGroupSpacing`, `reportTagGroupSpacing`, `tagSequence`|

<a name="user-content-sort-tags-failing-examples"></a>
<a name="sort-tags-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````js
/**
 * @returns {string}
 * @param b
 * @param a
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, typedef, interface, record, template, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * Some description
 * @returns {string}
 * @param b
 * @param a
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, typedef, interface, record, template, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @returns {string}
 * @param b A long
 *   description
 * @param a
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, typedef, interface, record, template, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * Some description
 * @returns {string}
 * @param b A long
 *   description
 * @param a
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, typedef, interface, record, template, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @param b A long
 *   description
 * @returns {string}
 * @param a
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, typedef, interface, record, template, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @def
 * @xyz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"alphabetizeExtras":true}]
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, typedef, interface, record, template, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @xyz
 * @def
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["def","xyz","abc"]}]}]
// Message: Tags are not in the prescribed order: def, xyz, abc

/**
 * @xyz
 * @def
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["def","xyz"]},{"tags":["abc"]}]}]
// Message: Tags are not in the prescribed order: def, xyz, abc

/**
 * @returns {string}
 * @ignore
 * @param b A long
 *   description
 * @param a
 * @module
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, typedef, interface, record, template, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @xyz
 * @abc
 * @abc
 * @def
 * @xyz
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"alphabetizeExtras":true}]
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, typedef, interface, record, template, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @param b A long
 *   description
 * @module
 */
function quux () {}
// Message: Tags are not in the prescribed order: summary, typeSummary, module, exports, file, fileoverview, overview, typedef, interface, record, template, name, kind, type, alias, external, host, callback, func, function, method, class, constructor, modifies, mixes, mixin, mixinClass, mixinFunction, namespace, borrows, constructs, lends, implements, requires, desc, description, classdesc, tutorial, copyright, license, internal, overload, const, constant, final, global, readonly, abstract, virtual, var, member, memberof, memberof!, inner, instance, inheritdoc, inheritDoc, override, hideconstructor, param, arg, argument, prop, property, return, returns, async, generator, default, defaultvalue, enum, augments, extends, throws, exception, yield, yields, event, fires, emits, listens, this, satisfies, static, private, protected, public, access, package, -other, see, example, closurePrimitive, customElement, expose, hidden, idGenerator, meaning, ngInject, owner, wizaction, define, dict, export, externs, implicitCast, noalias, nocollapse, nocompile, noinline, nosideeffects, polymer, polymerBehavior, preserve, struct, suppress, unrestricted, category, ignore, author, version, variation, since, deprecated, todo

/**
 * @def
 * @xyz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":2,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]
// Message: Tag groups do not have the expected whitespace

/**
 * @def
 * @xyz
 *
 *
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":1,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]
// Message: Tag groups do not have the expected whitespace

/**
 * @def
 * @xyz A multiline
 * description
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":2,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]
// Message: Tag groups do not have the expected whitespace

/**
 * @def
 * @xyz
 * @xyz
 *
 *
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":1,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]
// Message: Tag groups do not have the expected whitespace

/**
 * Foo
 *
 * @param {(
 *  req: express.Request,
 *  done: (error: any, user?: any, info?: any) => void
 * ) => void} verify - callback to excute custom authentication logic
 * @see https://github.com/jaredhanson/passport/blob/v0.4.1/lib/middleware/authenticate.js#L217
 *
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["since","access"]},{"tags":["class","augments","mixes"]},{"tags":["alias","memberof"]},{"tags":["see","link","global"]},{"tags":["fires","listens"]},{"tags":["param"]},{"tags":["yields"]},{"tags":["returns"]}]}]
// Message: Tags are not in the prescribed order: since, access, class, augments, mixes, alias, memberof, see, link, global, fires, listens, param, yields, returns

/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 * @since      1.0.1
 * @access     private
 *
 * @class
 * @mixes    mixin
 *
 * @alias    realName
 * @memberof namespace
 *
 * @see  Function/class relied on
 * @global
 *
 * @tutorial Asd
 * @license MIT
 *
 * @fires   eventName
 * @fires   className#eventName
 * @listens event:eventName
 * @listens className~event:eventName
 *
 * @tutorial Asd
 * @license MIT
 *
 * @yields {string} Yielded value description.
 *
 * @param {string} var1 - Description.
 * @param {string} var2 - Description of optional variable.
 * @param {string} var3 - Description of optional variable with default variable.
 * @param {object} objectVar - Description.
 * @param {string} objectVar.key - Description of a key in the objectVar parameter.
 *
 * @returns {string} Return value description.
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["since","access"]},{"tags":["class","augments","mixes"]},{"tags":["alias","memberof"]},{"tags":["see","link","global"]},{"tags":["fires","listens"]},{"tags":["param"]},{"tags":["yields"]},{"tags":["returns"]}]}]
// Message: Tags are not in the prescribed order: since, access, class, augments, mixes, alias, memberof, see, link, global, fires, listens, param, yields, returns

/**
 * @def
 * @zzz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":1,"tagSequence":[{"tags":["qrs"]},{"tags":["def","-other","xyz"]},{"tags":["abc"]}]}]
// Message: Tag groups do not have the expected whitespace

/**
 * @xyz
 * @def
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"alphabetizeExtras":true,"tagSequence":[]}]
// Message: Tags are not in the prescribed order: (alphabetical)

/**
 * @example
 * enum Color { Red, Green, Blue }
 * faker.helpers.enumValue(Color) // 1 (Green)
 *
 * enum Direction { North = 'North', South = 'South'}
 * faker.helpers.enumValue(Direction) // 'South'
 *
 * enum HttpStatus { Ok = 200, Created = 201, BadRequest = 400, Unauthorized = 401 }
 * faker.helpers.enumValue(HttpStatus) // 200 (Ok)
 * @since 8.0.0
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["internal"]},{"tags":["template","param"]},{"tags":["returns"]},{"tags":["throws"]},{"tags":["see"]},{"tags":["example"]},{"tags":["since"]},{"tags":["deprecated"]}]}]
// Message: Tag groups do not have the expected whitespace
````



<a name="user-content-sort-tags-passing-examples"></a>
<a name="sort-tags-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````js
/**
 * @param b
 * @param a
 * @returns {string}
 */
function quux () {}

/**
 * @abc
 * @def
 * @xyz
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"alphabetizeExtras":true}]

/**
 * @def
 * @xyz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"alphabetizeExtras":false}]

/**
 * @def
 * @xyz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["def","xyz","abc"]}]}]

/** @def */
function quux () {}

/**
 * @def
 * @xyz
 *
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":1,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]

/**
 * @def
 * @xyz A multiline
 * description
 *
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":1,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]

/**
 * Foo
 *
 * @see https://github.com/jaredhanson/passport/blob/v0.4.1/lib/middleware/authenticate.js#L217
 *
 * @param {(
 *  req: express.Request,
 *  done: (error: any, user?: any, info?: any) => void
 * ) => void} verify - callback to excute custom authentication logic
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["since","access"]},{"tags":["class","augments","mixes"]},{"tags":["alias","memberof"]},{"tags":["see","link","global"]},{"tags":["fires","listens"]},{"tags":["param"]},{"tags":["yields"]},{"tags":["returns"]}]}]

/**
 * Constructor.
 *
 * @public
 *
 * @param {string} [message] - Error message.
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["since","access"]},{"tags":["class","augments","mixes"]},{"tags":["alias","memberof"]},{"tags":["public","protected","private","override"]},{"tags":["override","async"]},{"tags":["see","link","global"]},{"tags":["param"]},{"tags":["yields"]},{"tags":["returns"]},{"tags":["fires","-other","listens"]}]}]

/**
 * @param options.mode The mode to generate the birthdate. Supported modes are `'age'` and `'year'` .
 *
 * There are two modes available `'age'` and `'year'`:
 * - `'age'`: The min and max options define the age of the person (e.g. `18` - `42`).
 * - `'year'`: The min and max options define the range the birthdate may be in (e.g. `1900` - `2000`).
 *
 * Defaults to `year`.
 *
 * @example
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["internal"]},{"tags":["template","param"]},{"tags":["returns"]},{"tags":["throws"]},{"tags":["see"]},{"tags":["example"]},{"tags":["since"]},{"tags":["deprecated"]}]}]

/**
 * @example
 * enum Color { Red, Green, Blue }
 * faker.helpers.enumValue(Color) // 1 (Green)
 *
 * enum Direction { North = 'North', South = 'South'}
 * faker.helpers.enumValue(Direction) // 'South'
 *
 * enum HttpStatus { Ok = 200, Created = 201, BadRequest = 400, Unauthorized = 401 }
 * faker.helpers.enumValue(HttpStatus) // 200 (Ok)
 *
 * @since 8.0.0
 */
// "jsdoc/sort-tags": ["error"|"warn", {"tagSequence":[{"tags":["internal"]},{"tags":["template","param"]},{"tags":["returns"]},{"tags":["throws"]},{"tags":["see"]},{"tags":["example"]},{"tags":["since"]},{"tags":["deprecated"]}]}]

/**
 * @def
 * @xyz
 * @abc
 */
function quux () {}
// "jsdoc/sort-tags": ["error"|"warn", {"linesBetween":2,"reportTagGroupSpacing":false,"tagSequence":[{"tags":["qrs"]},{"tags":["def","xyz"]},{"tags":["abc"]}]}]
````

