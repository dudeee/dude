import Bot from 'slackbot-api';
import config from './config';
import loader from './loader';
import pocket from './pocket';
import ask from './ask';
import * as utils from './utils';
import Agenda from 'agenda';
import winston from 'winston';

let bot = new Bot(config);

bot.on('open', () => {
	bot.config = config;
  bot.utils = utils;

	// .help method, used to define `help` records for a plugin/task
	bot.config.help = [];
	bot.help = (name, description, long) => {
		bot.config.help[name] = {description, long};
	}
  bot.log = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'bolt.log' })
    ]
  });

	// log level
  bot.log.level = process.env.BOLT_LOG_LEVEL || 'info';

  bot.agenda = new Agenda({
    db: {
      address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/agenda'
    }
  }, () => {
    bot.agenda.start();
		bot.agenda.purge(() => {});

    bot.log.verbose('[agenda] start job queue processing');

    ['start', 'complete', 'success', 'fail'].forEach(event => {
      bot.agenda.on(event, job => {
        bot.log.debug('[agenda] job %s %s', job.attrs.name, event);
        bot.log.debug('[agenda] job %s, %s', job.attrs.name, event, job.attrs);
      })
    })
  });

  pocket(bot);
	ask(bot);
  loader(bot);

  bot.log.info('Bolt is ready to work!');
});

if (process.env.PORT) {
  require('http').createServer().listen(process.env.PORT);
}
