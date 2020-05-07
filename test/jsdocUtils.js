/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import jsdocUtils from '../src/jsdocUtils';

describe('jsdocUtils', () => {
  describe('getPreferredTagName()', () => {
    context('no preferences', () => {
      context('alias name', () => {
        it('returns the primary tag name', () => {
          expect(jsdocUtils.getPreferredTagName({}, 'jsdoc', 'return')).to.equal('returns');
        });
      });
      it('returns the primary tag name', () => {
        expect(jsdocUtils.getPreferredTagName({}, 'jsdoc', 'returns')).to.equal('returns');
      });
    });
    context('with preferences', () => {
      it('returns the preferred tag name', () => {
        expect(jsdocUtils.getPreferredTagName({}, 'jsdoc', 'return', {returns: 'return'})).to.equal('return');
      });
    });
  });
  describe('isValidTag()', () => {
    context('tag is invalid', () => {
      it('returns false', () => {
        expect(jsdocUtils.isValidTag({}, 'jsdoc', 'foo', [])).to.equal(false);
      });
    });
    context('tag is valid', () => {
      it('returns true', () => {
        expect(jsdocUtils.isValidTag({}, 'jsdoc', 'param', [])).to.equal(true);
      });
    });
    context('tag is valid alias', () => {
      it('returns true', () => {
        expect(jsdocUtils.isValidTag({}, 'jsdoc', 'arg', [])).to.equal(true);
      });
    });
    context('tag is valid and customized', () => {
      it('returns true', () => {
        expect(jsdocUtils.isValidTag({}, 'jsdoc', 'foobar', ['foobar'])).to.equal(true);
      });
    });
  });
  describe('getFunctionParameterNames()', () => {
    context('Unhandled param type', () => {
      it('should throw with an unknown param type', () => {
        expect(() => {
          jsdocUtils.getFunctionParameterNames({params: [
            {
              type: 'AssignmentPattern',
            },
          ]});
        }).to.throw('Unsupported function signature format.');
      });
    });
  });
  describe('hasDefinedTypeReturnTag()', () => {
    context('Missing tag', () => {
      it('should return `false` with a missing tag', () => {
        expect(jsdocUtils.hasDefinedTypeReturnTag(null)).to.equal(false);
      });
    });
  });
  describe('flattenRoots()', () => {
    context('Provided root', () => {
      it('should prepend properties with provided root', () => {
        const roots = [['data', ['last_modified']], ['options', ['headers']]];
        const expected = {
          hasRestElement: false,
          names: ['base.data', 'base.data.last_modified', 'base.options', 'base.options.headers'],
        };
        expect(jsdocUtils.flattenRoots(roots, 'base')).to.deep.equal(expected);
      });
    });

    context('Without root', () => {
      it('should prepend properties with provided root', () => {
        const roots = [['data', ['last_modified']], ['options', ['headers']]];
        const expected = {
          hasRestElement: false,
          names: ['data', 'data.last_modified', 'options', 'options.headers'],
        };
        expect(jsdocUtils.flattenRoots(roots)).to.deep.equal(expected);
      });
    });
  });
});
