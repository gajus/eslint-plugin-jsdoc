import * as jsdocUtils from '../src/jsdocUtils.js';
import {
  expect,
} from 'chai';

/**
 * @typedef {any} BadArgument
 */

describe('jsdocUtils', () => {
  describe('getPreferredTagNameSimple()', () => {
    context('no preferences', () => {
      context('alias name', () => {
        it('returns the primary tag name', () => {
          expect(jsdocUtils.getPreferredTagNameSimple(/** @type {BadArgument} */ ({}), 'jsdoc', 'return')).to.equal('returns');
        });
        it('works with the constructor tag', () => {
          expect(jsdocUtils.getPreferredTagNameSimple(/** @type {BadArgument} */ ({}), 'jsdoc', 'constructor')).to.equal('class');
        });
      });
      it('works with tags that clash with prototype properties', () => {
        expect(jsdocUtils.getPreferredTagNameSimple(/** @type {BadArgument} */ ({}), 'jsdoc', 'toString')).to.equal('toString');
      });
      it('returns the primary tag name', () => {
        expect(jsdocUtils.getPreferredTagNameSimple(/** @type {BadArgument} */ ({}), 'jsdoc', 'returns')).to.equal('returns');
      });
    });
    context('with preferences', () => {
      it('returns the preferred tag name', () => {
        expect(jsdocUtils.getPreferredTagNameSimple(/** @type {BadArgument} */ ({}), 'jsdoc', 'return', /** @type {BadArgument} */ ({
          returns: 'return',
        }))).to.equal('return');
      });
    });
  });
  describe('isValidTag()', () => {
    context('tag is invalid', () => {
      it('returns false', () => {
        expect(jsdocUtils.isValidTag(/** @type {BadArgument} */ ({}), 'jsdoc', 'foo', [])).to.equal(false);
      });
    });
    context('tag is valid', () => {
      it('returns true', () => {
        expect(jsdocUtils.isValidTag(/** @type {BadArgument} */ ({}), 'jsdoc', 'param', [])).to.equal(true);
      });
    });
    context('tag is valid alias', () => {
      it('returns true', () => {
        expect(jsdocUtils.isValidTag(/** @type {BadArgument} */ ({}), 'jsdoc', 'arg', [])).to.equal(true);
      });
    });
    context('tag is valid and customized', () => {
      it('returns true', () => {
        expect(jsdocUtils.isValidTag(/** @type {BadArgument} */ ({}), 'jsdoc', 'foobar', [
          'foobar',
        ])).to.equal(true);
      });
    });
  });
  describe('getFunctionParameterNames()', () => {
    context('Unhandled param type', () => {
      it('should throw with an unknown param type', () => {
        expect(() => {
          jsdocUtils.getFunctionParameterNames(/** @type {BadArgument} */ ({
            params: [
              {
                type: 'AssignmentPattern',
              },
            ],
          }));
        }).to.throw('Unsupported function signature format: `AssignmentPattern`.');
      });
    });
  });
  describe('mayBeUndefinedTypeTag()', () => {
    context('Missing tag', () => {
      it('should return `false` with a missing tag', () => {
        expect(jsdocUtils.mayBeUndefinedTypeTag(null, 'permissive')).to.equal(true);
      });
    });
  });
  describe('flattenRoots()', () => {
    context('Provided root', () => {
      it('should prepend properties with provided root', () => {
        const roots = /** @type {import('../src/jsdocUtils.js').ParamInfo[]} */ ([
          [
            'data', [
              'last_modified',
            ],
          ], [
            'options', [
              'headers',
            ],
          ],
        ]);
        const expected = {
          hasPropertyRest: false,
          hasRestElement: false,
          names: [
            'base.data', 'base.data.last_modified', 'base.options', 'base.options.headers',
          ],
          rests: [
            false,
            false,
            false,
            false,
          ],
        };
        expect(jsdocUtils.flattenRoots(roots, 'base')).to.deep.equal(expected);
      });
    });

    context('Without root', () => {
      it('should prepend properties with provided root', () => {
        const roots = /** @type {import('../src/jsdocUtils.js').ParamInfo[]} */ ([
          [
            'data', [
              'last_modified',
            ],
          ], [
            'options', [
              'headers',
            ],
          ],
        ]);
        const expected = {
          hasPropertyRest: false,
          hasRestElement: false,
          names: [
            'data', 'data.last_modified', 'options', 'options.headers',
          ],
          rests: [
            false,
            false,
            false,
            false,
          ],
        };
        expect(jsdocUtils.flattenRoots(roots)).to.deep.equal(expected);
      });
    });
  });
});
