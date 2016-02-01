import _ from 'lodash';

export default bot => {
  bot.command('config list', message => {
    const list = Object.keys(bot.config).map(key => {
      const stringified = JSON.stringify(bot.config[key], null, 2);
      return `${key}: ${stringified}`;
    }).join('\n');

    message.reply(`\`\`\` ${list} \`\`\``);
  });

  bot.command('config get <char>', message => {
    const [key] = message.match;

    let value = _.get(bot.config, key);

    if (typeof value === 'object') {
      value = JSON.stringify(value, null, 2);
    }

    message.reply(`\`\`\`${value}\`\`\``);
  });

  bot.command('config set <char> <string>', message => {
    const key = message.match[0];
    let value = message.match[1];

    try {
      value = JSON.parse(value);
    } catch (e) {
      //
    }

    _.set(bot.config, key, value);
  });

  bot.command('config unset <char>', message => {
    const [key] = message.match;

    _.set(bot.config, key, undefined);
  });

  bot.command('config add <char> <string>', message => {
    const [key, value] = message.match;

    const current = _.get(bot.config, key);
    if (Array.isArray(current)) {
      current.push(value);
    }
  });

  bot.command('config remove <char> <string>', message => {
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
