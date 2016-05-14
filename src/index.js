if (!global._babelPolyfill) {
  require('babel/polyfill');
}
import Bot from 'slackbot-api';
import setup from './setup';
import loader from './loader';
import * as utils from './utils';

let bot;

const initialize = async (config = {}, manual, ...rest) => {
  bot = new Bot(config, manual, ...rest);
  bot.config = config;
  bot.utils = utils;

  try {
    // setup: internal configuration and initialization process
    await setup(bot);
    // load: external plugins and tasks in the `tasks` folder
    await loader(bot, manual);
  } catch (e) {
    console.error('[setup, loader] error', e, e.stack);
  }

  // works out of box on heroku-like servers
  if (process.env.PORT) {
    bot._fake = require('http').createServer().listen(process.env.PORT);
    bot._fake.on('error', () => {}); // eslint-disable-line
  }

  if (manual) {
    bot.emit('ready');
    bot.log.info(bot.t('main.ready'));

    return bot;
  }

  return new Promise(resolve => {
    bot.on('open', async () => {
      resolve(bot);
    });
  });
};


if (!module.parent) {
  initialize(require('../config'));
}

export default initialize;
