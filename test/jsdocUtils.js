import * as jsdocUtils from '../src/jsdocUtils.js';
import {
  expect,
} from 'chai';

/* eslint-disable jsdoc/reject-any-type -- Deliberate error */
/**
 * @typedef {any} BadArgument
 */
/* eslint-enable jsdoc/reject-any-type -- Deliberate error */

describe('jsdocUtils', () => {
  describe('getPreferredTagName()', () => {
    context('report', () => {
      jsdocUtils.getPreferredTagName({
        tags: [
          // @ts-expect-error Just a skeleton
          {
            tag: 'example',
          },
        ],
      }, {
        tagName: 'example',
        tagNamePreference: {
          example: false,
        },
      });
    });
  });
  describe('getPreferredTagNameSimple()', () => {
    context('no preferences', () => {
      context('alias name', () => {
        it('returns the primary tag name', () => {
          expect(jsdocUtils.getPreferredTagNameSimple(
            'return', 'jsdoc',
          )).to.equal('returns');
        });
        it('works with the constructor tag', () => {
          expect(jsdocUtils.getPreferredTagNameSimple('constructor', 'jsdoc')).to.equal('class');
        });
      });
      it('works with tags that clash with prototype properties', () => {
        expect(jsdocUtils.getPreferredTagNameSimple('toString', 'jsdoc')).to.equal('toString');
      });
      it('returns the primary tag name', () => {
        expect(jsdocUtils.getPreferredTagNameSimple('returns', 'jsdoc')).to.equal('returns');
      });
    });
    context('with preferences', () => {
      it('returns the preferred tag name', () => {
        expect(jsdocUtils.getPreferredTagNameSimple('return', 'jsdoc', {
          returns: 'return',
        })).to.equal('return');
      });
    });

    context('with context', () => {
      it('returns the preferred tag name', () => {
        expect(jsdocUtils.getPreferredTagNameSimple('returns', /** @type {BadArgument} */ ('badArg'))).to.equal('returns');
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
  describe('parseClosureTemplateTag()', () => {
    it('splits multiple template names on top-level commas', () => {
      expect(jsdocUtils.parseClosureTemplateTag({
        name: 'S, T',
      })).to.deep.equal([
        'S', 'T',
      ]);
    });
    it('returns a single template name', () => {
      expect(jsdocUtils.parseClosureTemplateTag({
        name: 'T',
      })).to.deep.equal([
        'T',
      ]);
    });
    it('splits multiple defaulted names within the optional wrapper', () => {
      expect(jsdocUtils.parseClosureTemplateTag({
        name: '[T=string, U=number]',
      })).to.deep.equal([
        'T', 'U',
      ]);
    });
    it('keeps commas inside a generic-type default', () => {
      expect(jsdocUtils.parseClosureTemplateTag({
        name: '[T=Record<string, unknown>]',
      })).to.deep.equal([
        'T',
      ]);
    });
    it('keeps commas inside an object-type default', () => {
      expect(jsdocUtils.parseClosureTemplateTag({
        name: '[T={a: string, b: number}]',
      })).to.deep.equal([
        'T',
      ]);
    });
    it('keeps commas inside a function-type default', () => {
      expect(jsdocUtils.parseClosureTemplateTag({
        name: '[T=(a: string, b: number) => void]',
      })).to.deep.equal([
        'T',
      ]);
    });
    it('does not let an unbalanced closer push depth below zero', () => {
      expect(jsdocUtils.parseClosureTemplateTag({
        name: 'A>, B',
      })).to.deep.equal([
        'A>', 'B',
      ]);
    });
  });
});
