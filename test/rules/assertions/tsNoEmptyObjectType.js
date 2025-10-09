export default {
  invalid: [
    {
      code: `
        /**
         * @param {{}} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'No empty object type.',
        },
      ],
    },
    {
      code: `
        /**
         * @param {(string|{})} someName
         */
      `,
      errors: [
        {
          line: 3,
          message: 'No empty object type.',
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        /**
         * @param {{a: string}} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {({a: string} & {b: number})} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {BadType<} someName
         */
      `,
    },
    {
      code: `
        /**
         * @param {{}} someName
         */
      `,
      settings: {
        jsdoc: {
          mode: 'jsdoc',
        },
      },
    },
  ],
};
