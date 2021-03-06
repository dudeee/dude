Dude
====
![Dude's Avatar](https://raw.githubusercontent.com/dudeee/dude/master/avatar.png)

Your team's friendly assistant.

Setup a slack bot in seconds, use plugins to extend it's functionality without any hassle.

#Setup
```
git clone git@github.com:dudeee/dude
git clone https://github.com/dudeee/dude
```

Set environment variables
```
// grab a token from your team's slack page -> services -> custom integrations -> bots
export dude_SLACK_TOKEN='YOUR_SLACK_API_TOKEN';
```

#Start
```
npm start
```

#Plugins
Plugins are easily installed using npm:

```
npm install dude-permissions
```

Find more plugins at the organization's repository: https://github.com/dudeee

#Configure
Logging:
```
export dude_LOG_LEVEL='verbose'; // silly, debug, verbose, info, warn, error
```

Configure plugins, initialize, etc.

Copy `config-sample.js` to `config.js`.
```javascript
// config.js

export default {
  permissions: {
    admin: ['mahdi', 'milani'],
    server: ['milani', 'fattah']
  }
}
```

#Write tasks / plugins
Tasks are just like plugins, but they are not separate modules, that's how you
customize your bot. Of course you can create plugins and use them, too.

Create a file in `tasks` directory and use this scheme:

```javascript
export default bot => {
  // Greetings
  bot.listen(/\b(?:Hello|Hi|Yo|Hey|Hai)\b/i, message => {
    message.reply('Heya! Anything I can help you with?');
  });

  // Roll a number
  bot.listen(/roll/i, message => {
    let random = Math.round(Math.random() * 100);
    message.reply(`Rolling (0-100): ${random}`);
  });

  bot.help('roll', 'roll a number between 0-100');
}
```

In order to create plugins as separate modules, create a module with a name prefix
of `dude-`, e.g. `dude-permission`.

#API
See [slackbot-api](https://github.com/mdibaiee/slackbot-api) for more information
on the API (methods, events, etc).
