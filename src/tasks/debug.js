export default bot => {
  bot.listen(message => {
    bot.log.silly(`[message]`, message);
  });
};
