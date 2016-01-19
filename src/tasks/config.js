import _ from 'lodash';

export default bot => {
	bot.listen(/config list/, message => {
		let list = Object.keys(bot.config).map(key => {
			return key + ': ' + JSON.stringify(bot.config[key], null, 2);
		}).join('\n');

		message.reply('```' + list + '```');
	});

	bot.listen(/config get (\S+)/, message => {
		let [key] = message.match;

		message.reply(_.get(bot.config, key));
	});

	bot.listen(/config set (\S+) (\S+)/, message => {
		let [key, value] = message.match;

		_.set(bot.config, key, value);
	});

	bot.listen(/config unset (\S+)/, message => {
		let [key] = message.match;

		_.set(bot.config, key, undefined);
	});

	bot.listen(/config add (\S+) (\S+)/, message => {
		let [key, value] = message.match;

		let current = _.get(bot.config, key);
		if (Array.isArray(current))
			current.push(value);
	});

	bot.listen(/config remove (\S+) (\S+)/, message => {
		let [key, value] = message.match;

		let current = _.get(bot.config, key);
		if (Array.isArray(current))
			current.splice(value, 1);
	});

	bot.help('config', 'Modify bot\'s current configuration, the changes will be lost upon restart',
`
config list
config get <key>
config set <key> <value>
config unset <key> <value>
config add <key> <value>
config remove <key> <value>
`)
}

const updateFile = () => {
	fs.writeFileSync(path.join(__dirname, '../config.json'), JSON.stringify(bot.config, null, 2))
}
