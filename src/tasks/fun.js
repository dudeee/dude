export default bot => {
  bot.listen(/Hello|Hi|Yo|Hey|Hai/i, message => {
    message.reply('Hello!');
  }, {mention: true});

  bot.listen(/roll/, message => {
    let random = Math.round(Math.random() * 100);
    message.reply(`Rolling (0-100): ${random}`);
  }, {mention: true});
}
