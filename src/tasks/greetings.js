export default bot => {
  const answers = [0, 1, 2].map(n => bot.t(`dialogs.greetings.${n}`));

  const regex = bot.t('dialogs.greetings.input');
  bot.command(`^(${regex})`, message => {
    message.reply(bot.random(answers));
  });
};
