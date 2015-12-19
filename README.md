Bolt
====

Your team's friendly assistant.

Setup a slack bot in seconds, use plugins to extend it's functionality without any hassle.

#Setup
```
git clone git@github.com:slack-bolt/bolt
git clone https://github.com/slack-bolt/bolt
```

Set environment variables
```
// grab a token from your team's slack page -> services -> custom integrations -> bots
export BOLT_SLACK_TOKEN='YOUR_SLACK_API_TOKEN';
```

#Start
```
npm start
```

#Plugins
Plugins are easily installed using npm:

```
npm install bolt-permissions
```

Find more plugins at the organization's repository: https://github.com/slack-bolt

#Configure
Logging:
```
export BOLT_LOG_LEVEL='verbose'; // silly, debug, verbose, info, warn, error
```

Configure plugins, initialize, etc.

Copy `initialize-sample.js` to `initialize.js`.
```javascript
// initialize.js

export default bot => {
  bot.data = {
    permissions: {
      admin: ['mahdi', 'milani'],
      server: ['milani', 'fattah']
    }
  };
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

#API
See [slackbot-api](https://github.com/mdibaiee/slackbot-api) for more information
on the API (methods, events, etc).

#Modifiers
In order to create advanced plugins/tasks, you might need to modify *behaviour* of a function, in order
to do that, bolt provides you _modifiers_.

There are three types of modifiers:

###preprocess
Used to modify arguments of a function:

```javascript
// Allow string patterns
bot.modifiers.preprocess('listen', (pattern, fn) => {
  if (typeof pattern === 'string') {
    let regex = new RegExp(pattern);
    return [regex, fn];
  }

  return [pattern, fn];
});
```

###postprocess
Used to modify return value of a function:

```javascript
bot.modifiers.postproess('listen', (bot) => {
  return 'Hey, I\'m listen and I\'m returning this!');
})
```

###middleware
Used to decide whether a function's main action should be called or not:

```javascript
bot.modifiers.middleware('hear', context => {
  // Our bot must be polite!
  if (context.message.indexOf(BAD_WORD) > -1)
    return Promise.reject();

  return Promise.resolve();
});
```
