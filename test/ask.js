import initialize from './initialize';
import { expect } from 'chai';


describe('ask', function help() {
  const LONG_DELAY = 10000;
  this.timeout(LONG_DELAY);

  let bot;
  let app;
  let socket;
  before(async () => {
    const initialized = await initialize();
    bot = initialized.bot;
    app = initialized.app;
    socket = initialized.socket;
  });

  it('should add options as reactions to message', done => {
    const options = ['one', 'two', 'three'];

    socket.on('message', message => {
      const msg = JSON.parse(message);

      expect(msg.text).to.include('Hey');

      for (const option of options) {
        expect(msg.text).to.include(option);
      }

      socket._events.message.length -= 1;
    });

    let i = 0;
    app.get('/reactions.add', (request, response) => {
      expect(request.query.name).to.equal(bot.utils.numbers[i++]);

      response.json({
        ok: true,
        ...request.query,
      });

      if (i === options.length) {
        app._router.stack.length -= 1;
        done();
      }
    });

    bot.ask('general', 'Hey', options);
  });

  it('should add options as reactions to message (Boolean)', done => {
    const options = ['white_check_mark', 'negative_squared_cross_mark'];

    socket.on('message', message => {
      const msg = JSON.parse(message);

      expect(msg.text).to.include('Hey');

      for (const option of options) {
        expect(msg.text).to.include(option);
      }

      socket._events.message.length -= 1;
    });

    let i = 0;
    app.get('/reactions.add', (request, response) => {
      expect(request.query.name).to.equal(options[i++]);

      response.json({
        ok: true,
        ...request.query,
      });

      if (i === options.length) {
        app._router.stack.length -= 1;
        done();
      }
    });

    bot.ask('general', 'Hey', Boolean);
  });

  it('should return the answer index and emoji', async done => {
    const options = ['first', 'second', 'third'];

    let i = 0;
    app.get('/reactions.add', (request, response) => {
      expect(request.query.name).to.equal(bot.utils.numbers[i++]);

      response.json({
        ok: true,
        ...request.query,
      });

      if (i === options.length) {
        app._router.stack.length -= 1;
      }
    });


    app.get('/chat.postMessage', (request, response) => {
      expect(request.query.text).to.include('Hey');

      for (const option of options) {
        expect(request.query.text).to.include(option);
      }

      response.json({
        ok: true,
        ts: '123',
        ...request.query,
      });

      setTimeout(() => {
        bot.inject('reaction_added', {
          item: {
            ts: '123',
            channel: bot.find('general').id,
          },
          reaction: 'zero',
        });
      }, 10);

      app._router.stack.length -= 1;
    });

    const [index, answer] = await bot.ask('general', 'Hey', options, { websocket: false });

    expect(index).to.equal(0);
    expect(answer).to.equal(options[0]);
    done();
  });

  it('should return true/false (Boolean)', async () => {
    let i = 0;

    const answers = ['white_check_mark', 'negative_squared_cross_mark'];
    let j = 0;
    app.get('/reactions.add', (request, response) => {
      response.json({
        ok: true,
        ...request.query,
      });

      i++;
      if (i === answers.length) {
        i = 0;

        setTimeout(() => {
          bot.inject('reaction_added', {
            item: {
              ts: j,
              channel: bot.find('general').id,
            },
            reaction: answers[j++],
          });
        }, 10);

        if (j === answers.length) {
          app._router.stack.length -= 1;
        }
      }
    });


    app.get('/chat.postMessage', (request, response) => {
      expect(request.query.text).to.include('Hey');

      response.json({
        ok: true,
        ts: j,
        ...request.query,
      });

      if (j === answers.length) {
        app._router.stack.length -= 1;
      }
    });

    const answer = await bot.ask('general', 'Hey', Boolean, { websocket: false });
    expect(answer).to.equal(true);

    const answer2 = await bot.ask('general', 'Hey', Boolean, { websocket: false });
    expect(answer2).to.equal(false);
  });
});
