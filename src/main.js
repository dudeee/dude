import Bot from 'slackbot-api';
import config from './config';
import loader from './loader';
import initialize from './initialize';
import pocket from './pocket';
import * as utils from './utils';
import Agenda from 'agenda';
import winston from 'winston';

let bot = new Bot(config);

initialize(bot);

bot.on('open', () => {
  bot.utils = utils;
  bot.data.help = [];

  bot.help = (name, description, long) => {
    bot.data.help[name] = {description, long};
  }

  bot.log = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'bolt.log' })
    ]
  });

  bot.log.level = process.env.BOLT_LOG_LEVEL || 'info';

  bot.log.info('Bolt is ready to work!');

  bot.agenda = new Agenda({
    db: {
      address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/agenda'
    }
  }, () => {
    bot.agenda.start();

    bot.log.verbose('[agenda] start job queue processing');

    ['start', 'complete', 'success', 'fail'].forEach(event => {
      bot.agenda.on(event, job => {
        bot.log.verbose('[agenda] job %s %s', job.attrs.name, event);
        bot.log.debug('[agenda] job %s, %s', job.attrs.name, event, job.attrs);
      })
    })
  });

  pocket(bot);
  loader(bot);
});
