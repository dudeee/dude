export default bot => {
  const answers = [0, 1, 2].map(n => bot.t(`dialogs.greetings.${n}`));

  bot.command('^(Hi|Hello|Hey|Hai|Yo)', message => {
    message.reply(bot.random(answers));
  });
};
