import messenger from 'messenger';
import dashboard from './dashboard/index';
import { get } from 'lodash';

export default bot => {
  const client = messenger.createSpeaker(get(bot.config, 'dashboard.cport') || 8081);
  const server = messenger.createListener(get(bot.config, 'dashboard.sport') || 8082);
  bot._dashboard = { client, server };

  dashboard(bot, { client, server });
};
