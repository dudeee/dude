import { promisify } from '../utils';

export default bot => {
  bot.stop = async () => {
    await promisify(bot._fake.close, bot._fake)();
    delete bot._dashboard.client;
    delete bot._dashboard.server;
    bot._events = {};
    bot.destroy();
  };
};
