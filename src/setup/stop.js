import { promisify } from '../utils';

export default bot => {
  bot.stop = async () => {
    await promisify(bot._fake.close, bot._fake)();
    await promisify(bot.pocket.mongoose.disconnect, bot.pocket.mongoose)();
    await promisify(bot.agenda.cancel, bot.agenda)({});
    await promisify(bot.agenda.stop, bot.agenda)();
    await promisify(bot.agenda._mdb.close, bot.agenda._mdb)();
    delete bot._dashboard.client;
    delete bot._dashboard.server;
    bot.destroy();
  };
};
