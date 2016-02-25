
export default (bot, { client }) => {
  const INTERVAL = 1000;

  // memory
  const memory = {
    title: 'rss',
    x: [0, 0, 0, 0, 0],
    y: [0, 0, 0, 0, 0]
  };
  setInterval(() => {
    memory.x.shift();
    const date = new Date();
    memory.x.push(`${date.getMinutes()}:${date.getSeconds()}`);

    const mem = process.memoryUsage();
    memory.y.shift();
    const readable = mem.rss / 1000000;
    memory.y.push(readable);

    client.send('memory', [memory]);
  }, INTERVAL);
};
