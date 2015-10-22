export default bot => {
  bot.listen(/(?:Hello|Hi|Yo|Hey|Hai)\sbolt/i, message => {
    message.reply('Hello!');
  });
}
