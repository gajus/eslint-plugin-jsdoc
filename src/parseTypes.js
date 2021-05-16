import { Parser } from 'jsdoc-type-pratt-parser';

const parsers = {
  'jsdoc': new Parser({ mode: 'jsdoc' }),
  'closure': new Parser({ mode: 'closure' }),
  'typescript': new Parser({ mode: 'typescript' })
};

export function parseType(type, mode) {
  if (mode === 'permissive') {
    try {
      return parsers.jsdoc.parse(type);
    }
    catch {
      try {
        return parsers.closure.parse(type);
      }
      catch {
        return parsers.typescript.parse(type);
      }
    }
  } else {
    return parsers[mode].parse(type);
  }
}
