import messenger from 'messenger';
import dashboard from './dashboard/index';

export default bot => {
  const client = messenger.createSpeaker(bot.config.dashboard.sport);
  const server = messenger.createListener(bot.config.dashboard.cport);

  dashboard(bot, { client, server });
};
