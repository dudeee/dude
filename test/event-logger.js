import initialize from './initialize';
import { expect } from 'chai';

describe('event-logger', () => {
  let bot;
  before(async () => {
    const instances = await initialize();
    bot = instances.bot;
  });

  it('should emit `log` event when logging', done => {
    const expected = [{
      level: 'info',
      message: 'hi',
      meta: {},
    }, {
      level: 'error',
      message: 'hey',
      meta: { test: 1 },
    }];

    let i = 0;
    bot.on('log', log => {
      expect(log).to.eql(expected[i++]);

      if (i === expected.length) done();
    });

    bot.log.info('hi');
    bot.log.error('hey', { test: 1 });
  });
});
