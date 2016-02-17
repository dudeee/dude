export default bot => {
  bot.on('notfound', message => {
    if (!message.mention) return;
    message.reply(bot.t('dialogs.not-understood'));
  });
};
