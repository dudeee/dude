export default (bot, { client }) => {
  bot.on('log', log => {
    client.send('log', log);
  });
};
