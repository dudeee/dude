import Bot from 'slackbot-api';
import config from './config';
import loader from './loader';
import initialize from './initialize';

let bot = new Bot(config);

initialize(bot);

bot.on('open', () => {
  loader(bot);
  console.log('Bolt is ready to work!');
});
