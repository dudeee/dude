export default bot => {
  bot.listen(/^\b(?:Hello|Hi|Yo|Hey|Hai)\b/i, message => {
    message.reply('Heya! Anything I can help you with? Try `bolt help`');
  });
}
