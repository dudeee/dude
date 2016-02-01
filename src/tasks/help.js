export default bot => {
  bot.listen(/help\s*(\w+)?/i, message => {
    const [command] = message.match;
    const cmd = bot.config.help[command];

    if (!cmd) {
      let all = Object.keys(bot.config.help).map(key => {
        const { description } = bot.config.help[key];
        return `${key} — ${description}`;
      }).join('\n');

      all += '\nFor detailed information about each command, try `help [command]`';

      message.reply(all);
      return;
    }

    message.reply(cmd.long);
  });
};
