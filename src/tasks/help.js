export default bot => {
  bot.listen(/help/, message => {
    message.reply(`
      Greet me!
    `);
  }, { mention: true });
}
