import _ from 'lodash';

export default bot => {
  bot.listen(/config list/, message => {
    const list = Object.keys(bot.config).map(key => {
      const stringified = JSON.stringify(bot.config[key], null, 2);
      return `${key}: ${stringified}`;
    }).join('\n');

    message.reply(`\`\`\` ${list} \`\`\``);
  });

  bot.listen(/config get (\S+)/, message => {
    const [key] = message.match;

    message.reply(_.get(bot.config, key));
  });

  bot.listen(/config set (\S+) (\S+)/, message => {
    const [key, value] = message.match;

    _.set(bot.config, key, value);
  });

  bot.listen(/config unset (\S+)/, message => {
    const [key] = message.match;

    _.set(bot.config, key, undefined);
  });

  bot.listen(/config add (\S+) (\S+)/, message => {
    const [key, value] = message.match;

    const current = _.get(bot.config, key);
    if (Array.isArray(current)) {
      current.push(value);
    }
  });

  bot.listen(/config remove (\S+) (\S+)/, message => {
    const [key, value] = message.match;

    const current = _.get(bot.config, key);
    if (Array.isArray(current)) {
      current.splice(value, 1);
    }
  });

  bot.help('config', 'Modify bot\'s current configuration, the changes will be lost upon restart',
`
config list
config get <key>
config set <key> <value>
config unset <key> <value>
config add <key> <value>
config remove <key> <value>
`);
};
