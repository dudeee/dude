export default (bot, { server }) => {
  server.on('message', (message, data) => {
    bot.sendMessage(...data);
  });
};
