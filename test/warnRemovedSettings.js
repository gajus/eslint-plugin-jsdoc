import {
  expect,
} from 'chai';
import warnRemovedSettings from '../src/warnRemovedSettings';

describe('warnRemovedSettings', () => {
  it('warnRemovedSettings should ignore rule without removed settings', () => {
    const context = {
      report () {
        throw new Error('Shouldn\'t reach here');
      },
      settings: {jsdoc: {}},
    };
    expect(() => {
      warnRemovedSettings(context, 'check-alignment');
    }).to.not.throw();
  });
});
