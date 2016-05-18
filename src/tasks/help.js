export default bot => {
  bot.command('^help [char]', message => {
    const [command] = message.match;
    const cmd = bot.config.help[command];

    if (!cmd) {
      let all = Object.keys(bot.config.help).map(key => {
        const { description } = bot.config.help[key];
        return `${key} — ${description}`;
      }).join('\n');

      all += '\n' + bot.t('help.detailed', { syntax: '`help [command]`' }); // eslint-disable-line

      message.reply(all);
      return;
    }

    message.reply(cmd.long);
  });
};
