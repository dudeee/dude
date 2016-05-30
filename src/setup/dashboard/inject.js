export default (bot, { server }) => {
  server.on('inject', (message, [event, data]) => {
    try {
      bot.inject(event, JSON.parse(data));
    } catch (e) {
      console.error(e);
    }
  });
};
