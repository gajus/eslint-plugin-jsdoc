import iterateJsdoc, {getSettings, parseComment} from './iterateJsdoc.js';

const exp = {
  default: typeof iterateJsdoc,
  getSettings: typeof getSettings,
  parseComment: typeof parseComment
};

export = exp;
