import Bot from 'sbot';
import config from './config';
import loader from './loader';
import initialize from './initialize';

let bot = new Bot(config.name, config);

initialize(bot);

bot.on('open', () => {
  loader(bot);
});
