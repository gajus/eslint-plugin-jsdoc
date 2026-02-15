import {
  getFilename,
  getSourceCode,
} from '../../src/utils/eslintVersionCompat.js';
import {
  expect,
} from 'chai';

/**
 * @typedef {import('eslint').Rule.RuleContext} RuleContext
 */
describe('eslintVersionCmpat', () => {
  describe('getFilename', () => {
    it('when ESLint > 7 uses filename property', () => {
      const contextMock = /** @type {RuleContext & { getFilename: () => string }} */ (
        /** @type { unknown } */ ({
          filename: /** @type {string} */ ('foo.js'),
          getFilename: () => {
            return 'bar.js';
          },
        })
      );
      expect(getFilename(contextMock)).to.eq('foo.js');
    });
    it('when ESLint == 7 uses getFilename()', () => {
      const contextMock = /** @type {RuleContext & { getFilename: () => string }} */ (
        /** @type { unknown } */ ({
          getFilename: () => {
            return 'bar.js';
          },
        })
      );
      expect(getFilename(contextMock)).to.eq('bar.js');
    });
  });
  describe('getSourceCode', () => {
    it('when ESLint > 7 uses sourceCode property', () => {
      const contextMock = /** @type {RuleContext & { getFilename: () => string }} */ (
        /** @type { unknown } */ ({
          getSourceCode: () => {
            return {
              text: 'bar();',
            };
          },
          sourceCode: {
            text: 'foo();',
          },
        })
      );
      expect(getSourceCode(contextMock).text).to.eq('foo();');
    });
    it('when ESLint == 7 uses getSourceCode()', () => {
      const contextMock = /** @type {RuleContext & { getFilename: () => string }} */ (
        /** @type { unknown } */ ({
          getSourceCode: () => {
            return {
              text: 'bar();',
            };
          },
        })
      );
      expect(getSourceCode(contextMock).text).to.eq('bar();');
    });
  });
});
