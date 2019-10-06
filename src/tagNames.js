const jsdocTagsUndocumented = {
  // Undocumented but present; see
  // https://github.com/jsdoc/jsdoc/issues/1283#issuecomment-516816802
  // https://github.com/jsdoc/jsdoc/blob/master/packages/jsdoc/lib/jsdoc/tag/dictionary/definitions.js#L594
  modifies: [],
};

const jsdocTags = {
  ...jsdocTagsUndocumented,
  abstract: [
    'virtual',
  ],
  access: [],
  alias: [],
  async: [],
  augments: [
    'extends',
  ],
  author: [],
  borrows: [],
  callback: [],
  class: [
    'constructor',
  ],
  classdesc: [],
  constant: [
    'const',
  ],
  constructs: [],
  copyright: [],
  default: [
    'defaultvalue',
  ],
  deprecated: [],
  description: [
    'desc',
  ],
  enum: [],
  event: [],
  example: [],
  exports: [],
  external: [
    'host',
  ],
  file: [
    'fileoverview',
    'overview',
  ],
  fires: [
    'emits',
  ],
  function: [
    'func',
    'method',
  ],
  generator: [],
  global: [],
  hideconstructor: [],
  ignore: [],
  implements: [],
  inheritdoc: [],
  inner: [],
  instance: [],
  interface: [],
  kind: [],
  lends: [],
  license: [],
  listens: [],
  member: [
    'var',
  ],
  memberof: [],
  'memberof!': [],
  mixes: [],
  mixin: [],

  module: [],
  name: [],
  namespace: [],
  override: [],
  package: [],
  param: [
    'arg',
    'argument',
  ],
  private: [],
  property: [
    'prop',
  ],
  protected: [],
  public: [],
  readonly: [],
  requires: [],
  returns: [
    'return',
  ],
  see: [],
  since: [],
  static: [],
  summary: [],

  this: [],
  throws: [
    'exception',
  ],
  todo: [],
  tutorial: [],
  type: [],
  typedef: [],
  variation: [],
  version: [],
  yields: [
    'yield',
  ],
};

const TypeScriptTags = {
  // `@template` is also in TypeScript per:
  //      https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc
  template: [],
};

const closureTags = {
  ...TypeScriptTags,

  // From https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler
  // These are all recognized in https://github.com/jsdoc/jsdoc/blob/master/packages/jsdoc/lib/jsdoc/tag/dictionary/definitions.js
  //   except for the experimental `noinline` and the casing differences noted below

  // Defined as a synonym of `const` in jsdoc `definitions.js`
  define: [],

  dict: [],
  export: [],
  externs: [],
  final: [],

  // With casing distinct from jsdoc `definitions.js`
  implicitCast: [],

  // With casing distinct from jsdoc `definitions.js`
  inheritDoc: [],

  noalias: [],
  nocollapse: [],
  nocompile: [],
  noinline: [],
  nosideeffects: [],
  polymer: [],
  polymerBehavior: [],
  preserve: [],
  struct: [],
  suppress: [],

  unrestricted: [],
};

export {jsdocTags, closureTags};
