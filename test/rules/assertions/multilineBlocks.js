export default {
  invalid: [
    {
      code: `
        /** Reported up here
         * because the rest is multiline
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Should have no text on the "0th" line (after the `/**`).',
        },
      ],
      output: `
        /**
         * Reported up here
         * because the rest is multiline
         */
      `,
    },
    {
      code: `
        /** Reported up here
         * because the rest is multiline
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Should have no text on the "0th" line (after the `/**`).',
        },
      ],
      options: [
        {
          noZeroLineText: true,
        },
      ],
      output: `
        /**
         * Reported up here
         * because the rest is multiline
         */
      `,
    },
    {
      code: `
        /** @abc {aType} aName Reported up here
         * because the rest is multiline
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Should have no text on the "0th" line (after the `/**`).',
        },
      ],
      options: [
        {
          noZeroLineText: true,
        },
      ],
      output: `
        /**
         * @abc {aType} aName Reported up here
         * because the rest is multiline
         */
      `,
    },
    {
      code: `
        /** @tag */
      `,
      errors: [
        {
          line: 2,
          message: 'Single line blocks are not permitted by your configuration.',
        },
      ],
      options: [
        {
          noSingleLineBlocks: true,
        },
      ],
      output: `
        /**
         * @tag
         */
      `,
    },
    {
      code: `
        /** @tag {someType} */
      `,
      errors: [
        {
          line: 2,
          message: 'Single line blocks are not permitted by your configuration.',
        },
      ],
      options: [
        {
          noSingleLineBlocks: true,
        },
      ],
      output: `
        /**
         * @tag {someType}
         */
      `,
    },
    {
      code: `
        /** @tag {someType} aName */
      `,
      errors: [
        {
          line: 2,
          message: 'Single line blocks are not permitted by your configuration.',
        },
      ],
      options: [
        {
          noSingleLineBlocks: true,
        },
      ],
      output: `
        /**
         * @tag {someType} aName
         */
      `,
    },
    {
      code: `
        /** @tag */
      `,
      errors: [
        {
          line: 2,
          message: 'Single line blocks are not permitted by your configuration.',
        },
      ],
      options: [
        {
          noSingleLineBlocks: true,
          singleLineTags: [
            'someOtherTag',
          ],
        },
      ],
      output: `
        /**
         * @tag
         */
      `,
    },
    {
      code: `
        /** desc */
      `,
      errors: [
        {
          line: 2,
          message: 'Single line blocks are not permitted by your configuration.',
        },
      ],
      options: [
        {
          noSingleLineBlocks: true,
          singleLineTags: [
            '*',
          ],
        },
      ],
      output: `
        /**
         * desc
         */
      `,
    },
    {
      code: `
        /**
         * Desc.
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration.',
        },
      ],
      options: [
        {
          noMultilineBlocks: true,
        },
      ],
      output: `
        /** Desc. */
      `,
    },
    {
      code: `
        /** desc
         *
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration.',
        },
      ],
      options: [
        {
          noMultilineBlocks: true,
        },
      ],
      output: `
        /** desc */
      `,
    },
    {
      code: `
        /** desc
         *
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration but fixing would result in a single ' +
                  'line block which you have prohibited with ' +
                  '`noSingleLineBlocks`.',
        },
      ],
      options: [
        {
          noMultilineBlocks: true,
          noSingleLineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         *
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration.',
        },
      ],
      options: [
        {
          noMultilineBlocks: true,
        },
      ],
      output: `
        /** */
      `,
    },
    {
      code: `
        /**
         * This is not long enough to be permitted.
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration.',
        },
      ],
      options: [
        {
          minimumLengthForMultiline: 100,
          noMultilineBlocks: true,
        },
      ],
      output: `
        /** This is not long enough to be permitted. */
      `,
    },
    {
      code: `
        /**
         * This is not long enough to be permitted.
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration.',
        },
      ],
      options: [
        {
          allowMultipleTags: true,
          minimumLengthForMultiline: 100,
          noMultilineBlocks: true,
        },
      ],
      output: `
        /** This is not long enough to be permitted. */
      `,
    },
    {
      code: `
        /**
         * This has the wrong tags so is not permitted.
         * @notTheRightTag
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by your ' +
          'configuration but the block has a description with a tag.',
        },
      ],
      options: [
        {
          allowMultipleTags: false,
          multilineTags: [
            'onlyThisIsExempted',
          ],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This has too many tags so cannot be fixed ot a single line.
         * @oneTag
         * @anotherTag
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration but the block has multiple tags.',
        },
      ],
      options: [
        {
          allowMultipleTags: false,
          multilineTags: [],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This has a tag and description so cannot be fixed ot a single line.
         * @oneTag
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by your ' +
          'configuration but the block has a description with a tag.',
        },
      ],
      options: [
        {
          allowMultipleTags: false,
          multilineTags: [],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This has no tags so is not permitted.
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration.',
        },
      ],
      options: [
        {
          multilineTags: [
            '*',
          ],
          noMultilineBlocks: true,
        },
      ],
      output: `
        /** This has no tags so is not permitted. */
      `,
    },
    {
      code: `
        /**
         * This has the wrong tags so is not permitted.
         * @notTheRightTag
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by your ' +
          'configuration but the block has a description with a tag.',
        },
      ],
      options: [
        {
          allowMultipleTags: false,
          minimumLengthForMultiline: 500,
          multilineTags: [
            'onlyThisIsExempted',
          ],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * @lends This can be safely fixed to a single line.
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration.',
        },
      ],
      options: [
        {
          multilineTags: [],
          noMultilineBlocks: true,
          noSingleLineBlocks: true,
        },
      ],
      output: `
        /** @lends This can be safely fixed to a single line. */
      `,
    },
    {
      code: `
        /**
         * @type {aType} This can be safely fixed to a single line.
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration.',
        },
      ],
      options: [
        {
          multilineTags: [],
          noMultilineBlocks: true,
          noSingleLineBlocks: true,
        },
      ],
      output: `
        /** @type {aType} This can be safely fixed to a single line. */
      `,
    },
    {
      code: `
        /**
         * @aTag
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration.',
        },
      ],
      options: [
        {
          multilineTags: [],
          noMultilineBlocks: true,
        },
      ],
      output: `
        /** @aTag */
      `,
    },
    {
      code: `
        /**
         * This is a problem when single and multiline are blocked.
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration but fixing would result in a single ' +
                  'line block which you have prohibited with ' +
                  '`noSingleLineBlocks`.',
        },
      ],
      options: [
        {
          noMultilineBlocks: true,
          noSingleLineBlocks: true,
        },
      ],
    },
    {
      code: `
        /** This comment is bad
         * It should not have text on line zero
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Should have no text on the "0th" line (after the `/**`).',
        },
      ],
      options: [
        {
          minimumLengthForMultiline: 50,
          noMultilineBlocks: true,
          noZeroLineText: true,
        },
      ],
      output: `
        /**
         * This comment is bad
         * It should not have text on line zero
         */
      `,
    },
    {
      code: `
        /**
         * @lends This can be safely fixed
         * to a single
         * line. */
      `,
      errors: [
        {
          line: 2,
          message: 'Multiline jsdoc blocks are prohibited by ' +
                  'your configuration.',
        },
      ],
      options: [
        {
          multilineTags: [],
          noMultilineBlocks: true,
        },
      ],
      output: `
        /** @lends This can be safely fixed to a single line. */
      `,
    },
    {
      code: `
        /**
         * @someTag {aType} with Description */
      `,
      errors: [
        {
          line: 2,
          message: 'Should have no text on the final line (before the `*/`).',
        },
      ],
      options: [
        {
          noFinalLineBlocks: true,
        },
      ],
      output: `
        /**
         * @someTag {aType} with Description
         */
      `,
    },
    {
      code: `
        /**
         * Description */
      `,
      errors: [
        {
          line: 2,
          message: 'Should have no text on the final line (before the `*/`).',
        },
      ],
      options: [
        {
          noFinalLineBlocks: true,
        },
      ],
      output: `
        /**
         * Description
         */
      `,
    },
  ],
  valid: [
    {
      code: `
        /** Not reported */
      `,
    },
    {
      code: `
        /**
         *  Not reported
         */
      `,
    },
    {
      code: `
        /** Reported up here
         * because the rest is multiline
         */
      `,
      options: [
        {
          noZeroLineText: false,
        },
      ],
    },
    {
      code: `
        /** @tag */
      `,
    },
    {
      code: `
        /** @lends */
      `,
      options: [
        {
          noSingleLineBlocks: true,
        },
      ],
    },
    {
      code: `
        /** @tag */
      `,
      options: [
        {
          noSingleLineBlocks: true,
          singleLineTags: [
            'tag',
          ],
        },
      ],
    },
    {
      code: `
        /** @tag */
      `,
      options: [
        {
          noSingleLineBlocks: true,
          singleLineTags: [
            '*',
          ],
        },
      ],
    },
    {
      code: `
        /**
         *
         */
      `,
    },
    {
      code: `
        /**
         *
         */
      `,
      options: [
        {
          noMultilineBlocks: false,
        },
      ],
    },
    {
      code: `
        /** Test */
      `,
      options: [
        {
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This is long enough to be permitted by our config.
         */
      `,
      options: [
        {
          minimumLengthForMultiline: 25,
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This is long enough to be permitted by our config.
         */
      `,
      options: [
        {
          minimumLengthForMultiline: 50,
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This has the right tag so is permitted.
         * @theRightTag
         */
      `,
      options: [
        {
          multilineTags: [
            'theRightTag',
          ],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /** This has no tags but is single line so is not permitted. */
      `,
      options: [
        {
          multilineTags: [
            '*',
          ],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This has the wrong tags so is not permitted.
         * @notTheRightTag
         */
      `,
      options: [
        {
          minimumLengthForMultiline: 10,
          multilineTags: [
            'onlyThisIsExempted',
          ],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This has the wrong tags so is not permitted.
         * @theRightTag
         */
      `,
      options: [
        {
          minimumLengthForMultiline: 500,
          multilineTags: [
            'theRightTag',
          ],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
      /** tag */
      `,
    },
    {
      code: `
        /**
         * @lends This is ok per multiline
         */
      `,
      options: [
        {
          noMultilineBlocks: true,
          noSingleLineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This has too many tags so cannot be fixed ot a single line.
         * @oneTag
         * @anotherTag
         */
      `,
      options: [
        {
          multilineTags: [],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This has too many tags so cannot be fixed ot a single line.
         * @oneTag
         * @anotherTag
         */
      `,
      options: [
        {
          allowMultipleTags: true,
          multilineTags: [],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This has a tag and description so cannot be fixed ot a single line.
         * @oneTag
         */
      `,
      options: [
        {
          allowMultipleTags: true,
          multilineTags: [],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /**
         * This has a tag and description so cannot be fixed ot a single line.
         * @oneTag
         */
      `,
      options: [
        {
          allowMultipleTags: false,
          multilineTags: [
            'oneTag',
          ],
          noMultilineBlocks: true,
        },
      ],
    },
    {
      code: `
        /** @someTag with Description */
      `,
      options: [
        {
          noFinalLineBlocks: true,
        },
      ],
    },
  ],
};
