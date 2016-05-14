export default bot => {
  const { numbers, emojify } = bot.utils;

  bot.ask = async (channel, question, options, params) => {
    if (options === Boolean) {
      const reply = `${question}\n` +
                    ':white_check_mark: Yes\n' +
                    ':negative_squared_cross_mark: No';

      const message = await bot.sendMessage(channel, reply, params);

      await message.react('white_check_mark');
      await message.react('negative_squared_cross_mark');

      return new Promise((resolve) => {
        message.on('reaction_added', response => {
          const { reaction } = response;
          if (reaction === 'white_check_mark') resolve(true);
          if (reaction === 'negative_squared_cross_mark') resolve(false);
        });
      });
    }

    const list = options.map((option, i) => {
      const num = emojify(numbers[i]);
      return `${num} ${option}`;
    }).join('\n');

    const reply = `${question}\n${list}`;

    const message = await bot.sendMessage(channel, reply, params);
    await Promise.all(options.map((o, i) => message.react(numbers[i])));

    return new Promise((resolve) => {
      message.on('reaction_added', response => {
        const index = numbers.indexOf(response.reaction);

        if (index < 0) {
          return;
        }

        resolve([index, options[index]]);
      });
    });
  };
};
