import { omit } from 'lodash';

export default bot => {
  bot.listen(message => {
    const methods = ['reply', 'react', 'update', 'delete', 'on', 'off'];
    bot.log.silly(`[message]`, omit(message, ...methods));
  });
};
