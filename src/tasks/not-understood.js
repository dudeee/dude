import _ from 'lodash';

export default bot => {
  bot.on('notfound', message => {
    if (bot.config.notfound === false) return;
    if (!message.mention) return;

    const exclude = _.get(bot.config, 'notfound.exclude') || [];
    const ch = bot.find(message.channel);
    const user = bot.find(message.user);
    if ((ch.name && exclude.includes(ch.name)) ||
        (user.name && exclude.includes(user.name))) {
      return;
    }

    message.reply(bot.t('dialogs.not-understood'));
  });
};
