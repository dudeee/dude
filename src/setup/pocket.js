import levelup from 'levelup';
import _ from 'lodash';
import { promisify } from '../utils';

/**
 * Bot Pocket: a storage for plugins / bot
 * Pocket is based on Mongoose, for a more detailed documentation see mongoose's
 * documentation here: http://mongoosejs.com/docs/api.html
 */

export default bot => {
  const database = _.get(bot.config, 'database') || {};
  bot.pocket = levelup(database.name || './database', {
    valueEncoding: 'json',
    ...database
  });
  bot.pocket.get = promisify(bot.pocket.get, bot.pocket);
  bot.pocket.put = promisify(bot.pocket.put, bot.pocket);
  bot.pocket.del = promisify(bot.pocket.del, bot.pocket);
};
