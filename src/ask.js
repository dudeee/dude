export default bot => {
  const { numbers, emojify } = bot.utils;

  const questions = [];

  bot.ask = async (channel, question, options, params) => {
    let list = options.map((option, i) => {
      let num = emojify(numbers[i]);
      return `${num} ${option}`;
    }).join('\n');

    let reply = question + '\n' + list;

    let message = await bot.sendMessage(channel, reply, params);

    return new Promise((resolve, reject) => {
      message.on('reaction_added', response => {
        let index = numbers.indexOf(response.reaction);

        if (index < 0) {
          reject(response.reaction);
          return;
        }

        resolve([index, options[index]]);
      });
    });
  }
}
