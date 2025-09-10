import jsdocDefault, {
  jsdoc,
} from '../src/index.js';
import {
  expect,
} from 'chai';

describe('jsdoc()', () => {
  it('Builds simple plugins config', () => {
    const cfg = jsdoc();
    expect(cfg.plugins?.jsdoc).to.equal(jsdocDefault);
    expect(cfg.settings).to.deep.equal({
      jsdoc: {},
    });
  });

  it('Builds config with additional plugin', () => {
    const pluginCfg = /** @type {Record<string, import('eslint').ESLint.Plugin>} */ ({
      something: {
        configs: {
          testConfig: {
            rules: {
              semi: 'off',
            },
          },
        },
      },
    });
    const cfg = jsdoc({
      plugins: pluginCfg,
    });
    expect(cfg.plugins?.jsdoc).to.equal(jsdocDefault);
    expect(cfg.plugins?.something).to.equal(pluginCfg.something);
    expect(cfg.settings).to.deep.equal({
      jsdoc: {},
    });
  });

  it('Builds config reflecting copied properties', () => {
    const expected = {
      basePath: 'aPath',
      files: [
        'someFiles',
      ],
      ignores: [
        'ignore1', 'dist',
      ],
      language: 'json/jsonc',
      languageOptions: {
        ecmaVersion: /** @type {const} */ (2_023),
      },
      linterOptions: {
        noInlineConfig: true,
      },
      name: 'test',
      processor: 'abc',
    };

    const config = structuredClone(expected);
    const cfg = jsdoc(config);
    expect(cfg.plugins?.jsdoc).to.equal(jsdocDefault);
    expect(cfg.settings).to.deep.equal({
      jsdoc: {},
    });
    for (const [
      prop,
      val,
    ] of Object.entries(expected)) {
      expect(cfg[
        /** @type {keyof import('eslint').Linter.Config} */ (prop)
      ]).to.deep.equal(val);
    }
  });

  it('Builds simple plugins config with rules', () => {
    /* eslint-disable jsdoc/valid-types -- Bug */
    const rules = /** @type {{[key in keyof import('../src/rules.d.ts').Rules]?: import('eslint').Linter.RuleEntry<import('../src/rules.d.ts').Rules[key]>}} */ ({
      /* eslint-enable jsdoc/valid-types -- Bug */
      'jsdoc/check-alignment': [
        'error',
        {
          innerIndent: 0,
        },
      ],
    });
    const cfg = jsdoc({
      rules,
    });
    expect(cfg.plugins?.jsdoc).to.equal(jsdocDefault);
    expect(cfg.settings).to.deep.equal({
      jsdoc: {},
    });
    expect(cfg.rules).to.deep.equal(rules);
  });

  it('Throws with bad config', () => {
    expect(() => {
      jsdoc({
        // @ts-expect-error Deliberately bad argument
        config: '__proto__',
      });
    }).to.throw(TypeError);
  });

  it('Builds supplied config', () => {
    const cfg = jsdoc({
      config: 'flat/recommended',
    });

    expect(cfg.settings).to.deep.equal({
      jsdoc: {
        structuredTags: {
          next: {
            required: [
              'type',
            ],
          },
          throws: {
            required: [
              'type',
            ],
          },
          yields: {
            required: [
              'type',
            ],
          },
        },
      },
    });
  });

  it('Builds supplied config with merged settings', () => {
    const cfg = jsdoc({
      config: 'flat/recommended',
      settings: {
        structuredTags: {
          see: {
            name: 'namepath-referencing',
            required: [
              'name',
            ],
          },
        },
      },
    });

    expect(cfg.settings).to.deep.equal({
      jsdoc: {
        structuredTags: {
          next: {
            required: [
              'type',
            ],
          },
          see: {
            name: 'namepath-referencing',
            required: [
              'name',
            ],
          },
          throws: {
            required: [
              'type',
            ],
          },
          yields: {
            required: [
              'type',
            ],
          },
        },
      },
    });
  });

  it('Builds supplied config with non-merged settings', () => {
    const cfg = jsdoc({
      config: 'flat/recommended',
      mergeSettings: false,
      settings: {
        structuredTags: {
          see: {
            name: 'namepath-referencing',
            required: [
              'name',
            ],
          },
        },
      },
    });

    expect(cfg.settings).to.deep.equal({
      jsdoc: {
        structuredTags: {
          see: {
            name: 'namepath-referencing',
            required: [
              'name',
            ],
          },
        },
      },
    });
  });
});
