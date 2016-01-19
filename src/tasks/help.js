export default bot => {
  bot.listen(/help\s*(\w+)?/i, message => {
    let [command] = message.match;

    if (command) {
      let { long } = bot.config.help[command];

      message.reply(long);
    } else {
      let all = Object.keys(bot.config.help).map(key => {
        let { description } = bot.config.help[key];
        return key + ' — ' + description;
      }).join('\n');

      message.reply(all);
    }
  });
}
