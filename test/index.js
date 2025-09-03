import jsdoc from '../src/index.js';
import {
  expect,
} from 'chai';

describe('jsdoc()', () => {
  it('Builds simple plugins config', () => {
    const cfg = jsdoc();
    expect(cfg.plugins?.jsdoc).to.equal(jsdoc);
    expect(cfg.settings).to.deep.equal({
      jsdoc: {},
    });
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
