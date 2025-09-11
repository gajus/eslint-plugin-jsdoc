import iterateJsdoc, {getSettings, parseComment, type JsdocVisitor, type RuleConfig} from './iterateJsdoc.js';

const exp = iterateJsdoc as ((iterator: JsdocVisitor, ruleConfig: RuleConfig) => import('eslint').Rule.RuleModule) & {
  getSettings: typeof getSettings,
  parseComment: typeof parseComment
};

exp.getSettings = getSettings;
exp.parseComment = parseComment;

export = exp;
