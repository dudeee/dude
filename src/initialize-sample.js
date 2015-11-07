export default bot => {
  bot.data = {
    permissions: {
      admin: ['someone', 'someone-else']
    },
    newrelic: {
      target: 'server-alert',
      key: process.env.NEWRELIC_KEY,
      threshold: {
        error: '>= 2',
        apdex: '<= 0.7'
      }
    }
  };
}
