import Bot from 'slackbot-api';
import config from './config';
import loader from './loader';
import initialize from './initialize';
import pocket from './pocket';
import * as utils from './utils';
import Agenda from 'agenda';

let bot = new Bot(config);

initialize(bot);

bot.on('open', () => {
  bot.utils = utils;
  bot.data.help = [];

  bot.help = (name, description, long) => {
    bot.data.help[name] = {description, long};
  }

  bot.agenda = new Agenda({
    db: {
      address: 'mongodb://127.0.0.1/agenda'
    }
  }, () => {
    bot.agenda.start();
  });


  pocket(bot);
  loader(bot);

  console.log('Bolt is ready to work!');
});
