/* eslint-disable max-nested-callbacks */

import {
  expect
} from 'chai';
// eslint-disable-next-line import/no-named-default
import {parseComment, default as iterateJsdoc} from '../src/iterateJsdoc';

describe('iterateJsdoc', () => {
  describe('constructor', () => {
    context('options', () => {
      it('throws with missing options', () => {
        expect(() => {
          iterateJsdoc(() => {});
        }).to.throw(TypeError);
      });
    });
    context('meta', () => {
      context('Invalid arguments', () => {
        context('Invalid iterator', () => {
          it('throws with missing function', () => {
            expect(() => {
              iterateJsdoc(undefined, {meta: {type: 'suggestion'}});
            }).to.throw(TypeError);
          });
          it('throws with object missing `returns` method', () => {
            expect(() => {
              iterateJsdoc({}, {meta: {type: 'suggestion'}});
            }).to.throw(TypeError);
          });
        });
        context('Invalid options', () => {
          it('throws with missing meta', () => {
            expect(() => {
              iterateJsdoc(() => {}, {});
            }).to.throw(TypeError);
          });
          it('throws with empty meta', () => {
            expect(() => {
              iterateJsdoc(() => {}, {meta: {}});
            }).to.throw(TypeError);
          });
          it('throws with bad type', () => {
            expect(() => {
              iterateJsdoc(() => {}, {meta: {type: 'bad'}});
            }).to.throw(TypeError);
          });
        });
      });
      context('Valid arguments', () => {
        it('Does not throw with function and options', () => {
          expect(() => {
            iterateJsdoc(() => {}, {meta: {type: 'suggestion'}});
          }).to.not.throw();
        });
      });
    });
  });
  describe('parseComment', () => {
    context('Parses comments', () => {
      it('', () => {
        expect(parseComment({value: `* SomeDescription
          @param {MyType} name desc
        `}, '')).to.deep.equal({
          description: 'SomeDescription',
          line: 0,
          source: 'SomeDescription\n@param {MyType} name desc',
          tags: [
            {
              description: 'desc',
              line: 1,
              name: 'name',
              optional: false,
              source: '@param {MyType} name desc',
              tag: 'param',
              type: 'MyType'
            }
          ]
        });
      });
    });
  });
});
