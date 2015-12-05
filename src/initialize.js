export default bot => {
  bot.data = {
    permissions: {
      admin: ['mahdi', 'milani'],
      server: ['milani', 'fattah']
    },
    newrelic: {
      target: 'server-alert',
      key: process.env.NEWRELIC_KEY,
      threshold: {
        error: '>= 2',
        apdex: '<= 0.7'
      },
      spike: {
        error: '>= 1',
        apdex: '<= -0.3'
      }
    },
    quote: {
      target: 'test-bolt',
      every: '30 9 * * *'
    },
    leecher: {
      server: 'http://178.252.151.74:8081/',
    }
  };
}
