import {
  expect,
} from 'chai';
import {
  parseComment,
  // eslint-disable-next-line import/no-named-default
  default as iterateJsdoc,
} from '../src/iterateJsdoc';

describe('iterateJsdoc', () => {
  describe('constructor', () => {
    context('options', () => {
      it('throws with missing options', () => {
        expect(() => {
          // @ts-expect-error Bad arguments
          iterateJsdoc(() => {});
        }).to.throw(TypeError);
      });
    });
    context('meta', () => {
      context('Invalid arguments', () => {
        context('Invalid iterator', () => {
          it('throws with missing function', () => {
            expect(() => {
              // @ts-expect-error Bad argument
              iterateJsdoc(undefined, {
                meta: {
                  type: 'suggestion',
                },
              });
            }).to.throw(TypeError);
          });
          it('throws with object missing `returns` method', () => {
            expect(() => {
              // @ts-expect-error Bad argument
              iterateJsdoc({}, {
                meta: {
                  type: 'suggestion',
                },
              });
            }).to.throw(TypeError);
          });
        });
        context('Invalid options', () => {
          it('throws with missing meta', () => {
            expect(() => {
              // @ts-expect-error Bad argument
              iterateJsdoc(() => {}, {});
            }).to.throw(TypeError);
          });
          it('throws with empty meta', () => {
            expect(() => {
              iterateJsdoc(() => {}, {
                meta: {},
              });
            }).to.throw(TypeError);
          });
          it('throws with bad type', () => {
            expect(() => {
              iterateJsdoc(() => {}, {
                meta: {
                  type: 'bad',
                },
              });
            }).to.throw(TypeError);
          });
        });
      });
      context('Valid arguments', () => {
        it('Does not throw with function and options', () => {
          expect(() => {
            iterateJsdoc(() => {}, {
              meta: {
                type: 'suggestion',
              },
            });
          }).to.not.throw();
        });
      });
    });
  });
  describe('parseComment', () => {
    context('Parses comments', () => {
      it('parses a comment', () => {
        const tagSource = [
          {
            number: 1,
            source: '          @param {MyType} name desc',
            tokens: {
              delimiter: '',
              description: 'desc',
              end: '',
              lineEnd: '',
              name: 'name',
              postDelimiter: '',
              postName: ' ',
              postTag: ' ',
              postType: ' ',
              start: '          ',
              tag: '@param',
              type: '{MyType}',
            },
          },
          {
            number: 2,
            source: '        */',
            tokens: {
              delimiter: '',
              description: '',
              end: '*/',
              lineEnd: '',
              name: '',
              postDelimiter: '',
              postName: '',
              postTag: '',
              postType: '',
              start: '        ',
              tag: '',
              type: '',
            },
          },
        ];
        expect(parseComment({
          value: `* SomeDescription
          @param {MyType} name desc
        `,
        }, '')).to.deep.equal({
          description: 'SomeDescription',
          inlineTags: [],
          problems: [],
          source: [
            {
              number: 0,
              source: '/** SomeDescription',
              tokens: {
                delimiter: '/**',
                description: 'SomeDescription',
                end: '',
                lineEnd: '',
                name: '',
                postDelimiter: ' ',
                postName: '',
                postTag: '',
                postType: '',
                start: '',
                tag: '',
                type: '',
              },
            },
            ...tagSource,
          ],
          tags: [
            {
              description: '          desc',
              inlineTags: [],
              name: 'name',
              optional: false,
              problems: [],
              source: [
                ...tagSource,
              ],
              tag: 'param',
              type: 'MyType',
            },
          ],
        });
      });
    });
  });
});
