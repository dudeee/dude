import initialize from './initialize';
import { expect } from 'chai';


describe('help', function help() {
  const LONG_DELAY = 10000;
  this.timeout(LONG_DELAY);

  let bot;
  let socket;
  before(async () => {
    const initialized = await initialize();
    bot = initialized.bot;
    socket = initialized.socket;
  });

  it('should add the help record to `bot.config.help`', () => {
    bot.config.help = {};
    bot.help('hello', 'description', 'long');

    expect(Object.keys(bot.config.help).length).to.equal(1);
    const record = bot.config.help.hello;
    expect(record.description).to.equal('description');
    expect(record.long).to.equal('long');
  });

  it('should list all help records with description on `help`', done => {
    socket.on('message', message => {
      const msg = JSON.parse(message);

      for (const key of Object.keys(bot.config.help)) {
        expect(msg.text).to.include(key);
        expect(msg.text).to.include(bot.config.help[key].description);
      }

      socket._events.message.length -= 1;
      done();
    });

    bot.inject('message', {
      text: 'help',
      mention: true
    });
  });

  it('should show long description of help record using `help <command>`', done => {
    bot.help('yoyo', 'description', 'long');
    socket.on('message', message => {
      const msg = JSON.parse(message);

      expect(msg.text).to.equal('long');

      socket._events.message.length -= 1;
      done();
    });

    bot.inject('message', {
      text: 'help yoyo',
      mention: true
    });
  });
});
