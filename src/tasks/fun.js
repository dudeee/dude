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

  // Say something in a channel
  bot.listen(/say (\S+) (.+)/i, message => {
    let [, channel, text] = message.match;

    bot.sendMessage(channel, text);
  }, { permissions: ['admin'] });

  // Yes / No answers
  bot.listen(/should we|do you think|do you agree|what do you say/i,message => {
    let a = ['Yes!', 'Why not.', 'I think yes.',
             'Nope.', 'Nah.', 'No ways!'];
    message.reply(bot.random(a));
  })

  // Like it or not
  bot.listen(/do you like/i, message => {
    let a = ['I like it!', 'Of course I do!', 'No!',
             'I like Internet Explorer more than that.'];
    message.reply(bot.random(a));
  })

  bot.help('roll', 'roll a number between 0-100');
}
