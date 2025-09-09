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

  it('Builds simple plugins config with rules', () => {
    /* eslint-disable jsdoc/valid-types -- Bug */
    const rules = /** @type {{[key in keyof import('../src/rules.d.ts').Rules]?: ["error"|"warn"|"off", ...import('../src/rules.d.ts').Rules[key]]}} */ ({
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
