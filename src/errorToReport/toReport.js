const toReport = {

  /**
   * @description TESTSTETSTST
   * @param {string} arg - lorem
   * @returns {boolean} -  true if window.location.host starts by "dev-", false in every other case
   */
  isDevBackoffice (arg) {
    // eslint-disable-next-line no-console
    console.log(arg);
  },

  /**
   * @description Abstraction of Bootstrap Vue Toast notification
   * @see https://bootstrap-vue.org/docs/components/toast
   * @param {object} config - The config object
   * @param {object} config.vue - The Vue instance
   * @param {string} config.msg - the message that will be displayed in BO
   * @param {string} [config.variant=null] - Can be one of those [primary,secondary,success,info,warning,danger]
   * @param {string} [config.title='BO - Notification'] - The toast title
   */
  toastNotification ({vue, msg, variant, title}) {
    // eslint-disable-next-line no-console
    console.log(vue, msg, variant, title);
  },
};

export default toReport;
