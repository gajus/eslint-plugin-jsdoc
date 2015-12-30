/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import jsdocUtils from './../src/jsdocUtils';

describe('jsdocUtils', () => {
    describe('getPreferredTagName()', () => {
        context('no preferences', () => {
            context('alias name', () => {
                it('returns the primary tag name', () => {
                    expect(jsdocUtils.getPreferredTagName('return')).to.equal('returns');
                });
            });
            it('returns the primary tag name', () => {
                expect(jsdocUtils.getPreferredTagName('returns')).to.equal('returns');
            });
        });
        context('with preferences', () => {
            it('returns the preferred tag name', () => {
                expect(jsdocUtils.getPreferredTagName('return', {returns: 'return'})).to.equal('return');
            });
        });
    });
    describe('isValidTag()', () => {
        context('tag is invalid', () => {
            it('returns false', () => {
                expect(jsdocUtils.isValidTag('foo')).to.equal(false);
            });
        });
        context('tag is valid', () => {
            it('returns true', () => {
                expect(jsdocUtils.isValidTag('param')).to.equal(true);
            });
        });
        context('tag is valid alias', () => {
            it('returns true', () => {
                expect(jsdocUtils.isValidTag('arg')).to.equal(true);
            });
        });
    });
});
