import 'babel/polyfill';
import Bot from 'slackbot-api';
import config from '../config';
import setup from './setup';
import loader from './loader';
import * as utils from './utils';

const bot = new Bot(config);

bot.on('open', async () => {
  bot.config = config;
  bot.utils = utils;

  try {
    await setup(bot);
    await loader(bot);
  } catch (e) {
    console.error('[setup] error', e, e.stack);
  }

  bot.log.info(bot.t('main.ready'));
});

if (process.env.PORT) {
  require('http').createServer().listen(process.env.PORT);
}

export default bot;
