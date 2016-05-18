export default (bot, { client }) => {
  const INTERVAL = 5000;

  // errors
  const exceptions = {
    title: 'exceptions',
    x: [0, 0, 0, 0, 0],
    y: [0, 0, 0, 0, 0],
    style: {
      line: 'red',
    },
    count: 0,
  };
  const rejections = {
    title: 'rejections',
    x: [0, 0, 0, 0, 0],
    y: [0, 0, 0, 0, 0],
    style: {
      line: 'yellow',
    },
    count: 0,
  };

  process.on('uncaughtException', () => exceptions.count++);
  process.on('uncaughtRejection', () => rejections.count++);
  setInterval(() => {
    exceptions.x.shift();
    rejections.x.shift();
    const date = new Date();
    exceptions.x.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    rejections.x.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

    exceptions.y.shift();
    rejections.y.shift();

    exceptions.y.push(exceptions.count);
    rejections.y.push(rejections.count);

    client.send('errors', [exceptions, rejections]);

    exceptions.count = 0;
    rejections.count = 0;
  }, INTERVAL);
};
