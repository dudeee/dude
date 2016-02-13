export default bot => {
  const { numbers, emojify } = bot.utils;

  bot.ask = async (channel, question, options, params) => {
    const list = options.map((option, i) => {
      const num = emojify(numbers[i]);
      return `${num} ${option}`;
    }).join('\n');

    const reply = `${question}\n${list}`;

    const message = await bot.sendMessage(channel, reply, params);

    return new Promise((resolve, reject) => {
      message.on('reaction_added', response => {
        const index = numbers.indexOf(response.reaction);

        if (index < 0) {
          reject(response.reaction);
          return;
        }

        resolve([index, options[index]]);
      });
    });
  };
};
