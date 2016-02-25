export default (bot, { client }) => {
  const INTERVAL = 1000;

  // uptime
  setInterval(() => {
    client.send('uptime', process.uptime().toString());
  }, INTERVAL);
};
