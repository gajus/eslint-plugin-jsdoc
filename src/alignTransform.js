import {
  Markers,
} from 'comment-parser/lib/primitives';
import {
  rewireSource,
} from 'comment-parser/lib/util';

const zeroWidth = {
  name: 0,
  start: 0,
  tag: 0,
  type: 0,
};

const shouldAlign = (tags, index, source) => {
  const tag = source[index].tokens.tag.replace('@', '');
  const includesTag = tags.includes(tag);

  if (includesTag) {
    return true;
  }

  if (tag !== '') {
    return false;
  }

  for (let iterator = index; iterator >= 0; iterator--) {
    const previousTag = source[iterator].tokens.tag.replace('@', '');

    if (previousTag !== '') {
      if (tags.includes(previousTag)) {
        return true;
      }

      return false;
    }
  }

  return true;
};

const getWidth = (tags) => {
  return (width, {tokens}, index, source) => {
    if (!shouldAlign(tags, index, source)) {
      return width;
    }

    return {
      name: Math.max(width.name, tokens.name.length),
      start: tokens.delimiter === Markers.start ? tokens.start.length : width.start,
      tag: Math.max(width.tag, tokens.tag.length),
      type: Math.max(width.type, tokens.type.length),
    };
  };
};

const space = (len) => {
  return ''.padStart(len, ' ');
};

const alignTransform = (tags) => {
// function align(tags) {
  let intoTags = false;
  let w;

  const update = (line, index, source) => {
    const tokens = {...line.tokens};
    if (tokens.tag !== '') {
      intoTags = true;
    }

    const isEmpty =
      tokens.tag === '' &&
      tokens.name === '' &&
      tokens.type === '' &&
      tokens.description === '';

    // dangling '*/'
    if (tokens.end === Markers.end && isEmpty) {
      tokens.start = space(w.start + 1);

      return {
        ...line,
        tokens,
      };
    }

    /* eslint-disable indent */
    switch (tokens.delimiter) {
      case Markers.start:
        tokens.start = space(w.start);
        break;
      case Markers.delim:
        tokens.start = space(w.start + 1);
        break;
      default:
        tokens.delimiter = '';

        // compensate delimiter
        tokens.start = space(w.start + 2);
    }
    /* eslint-enable */

    if (!intoTags) {
      tokens.postDelimiter = tokens.description === '' ? '' : ' ';

      return {
        ...line,
        tokens,
      };
    }

    // Not align.
    if (!shouldAlign(tags, index, source)) {
      return {
        ...line,
        tokens,
      };
    }

    const nothingAfter = {
      delim: false,
      name: false,
      tag: false,
      type: false,
    };

    if (tokens.description === '') {
      nothingAfter.name = true;
      tokens.postName = '';

      if (tokens.name === '') {
        nothingAfter.type = true;
        tokens.postType = '';

        if (tokens.type === '') {
          nothingAfter.tag = true;
          tokens.postTag = '';

          if (tokens.tag === '') {
            nothingAfter.delim = true;
          }
        }
      }
    }

    tokens.postDelimiter = nothingAfter.delim ? '' : ' ';

    if (!nothingAfter.tag) {
      tokens.postTag = space(w.tag - tokens.tag.length + 1);
    }
    if (!nothingAfter.type) {
      tokens.postType = space(w.type - tokens.type.length + 1);
    }
    if (!nothingAfter.name) {
      tokens.postName = space(w.name - tokens.name.length + 1);
    }

    return {
      ...line,
      tokens,
    };
  };

  return ({source, ...fields}) => {
    w = source.reduce(getWidth(tags), {...zeroWidth});

    return rewireSource({
      ...fields,
      source: source.map(update),
    });
  };
};

export default alignTransform;
