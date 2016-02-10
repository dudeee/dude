import 'babel/polyfill';
import Bot from 'slackbot-api';
import config from '../config';
import loader from './loader';
import pocket from './pocket';
import ask from './ask';
import command from './command';
import * as utils from './utils';
import Agenda from 'agenda';
import winston from 'winston';
import dashboardLogger from './dashboard-logger';

const bot = new Bot(config);

bot.on('open', async () => {
  bot.config = config;
  bot.utils = utils;

  // .help method, used to define `help` records for a plugin/task
  bot.config.help = [];
  bot.help = (name, description, long) => {
    bot.config.help[name] = { description, long };
  };

  bot.config.log = {
    file: true,
    console: !module.parent,

    ...bot.config.log
  };

  dashboardLogger(bot, winston);
  const transports = [new (winston.transports.Dashboard)()];
  if (bot.config.log.file) transports.push(new (winston.transports.File)({ filename: 'bolt.log' }));
  if (bot.config.log.console) transports.push(new (winston.transports.Console)());

  bot.log = new (winston.Logger)({ transports });

  // log level
  bot.log.level = bot.config.log.level;

  await (new Promise(resolve =>
    bot.agenda = new Agenda({
      db: {
        address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/agenda'
      }
    }, resolve)
  ));

  bot.agenda.start();
  bot.agenda.purge(() => 0);

  bot.log.verbose('[agenda] start job queue processing');

  ['start', 'complete', 'success', 'fail'].forEach(event => {
    bot.agenda.on(event, job => {
      bot.log.debug('[agenda] job %s %s', job.attrs.name, event);
      bot.log.debug('[agenda] job %s, %s', job.attrs.name, event, job.attrs);
    });
  });

  await pocket(bot);
  await ask(bot);
  await command(bot);
  await loader(bot);

  bot.log.info('Bolt is ready to work!');
});

if (process.env.PORT) {
  require('http').createServer().listen(process.env.PORT);
}

export default bot;
