<template>
  <div>HELLO WORLD </div>
</template>

<script>

export default {
  computed: {
    /**
     *
     * @description TESTSTETSTST
     * @param {string} arg - lorem
     * @return {boolean} -  true if window.location.host starts by "dev-", false in every other case
     *
     * @param arg
     */
    isDevBackoffice(arg) {
      console.log(arg);
      return window.location.host.indexOf('dev-') === 0;
    },
  },
};
</script>
