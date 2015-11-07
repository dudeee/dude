export default bot => {
  bot.listen(/help\s*(\w+)?/i, message => {
    let [, command] = message.match;

    if (command) {
      let { long } = bot.data.help[command];

      message.reply(long);
    } else {
      let all = Object.keys(bot.data.help).map(key => {
        let { description } = bot.data.help[key];
        return key + ' — ' + description;
      }).join('\n');

      message.reply(all);
    }
  });
}
