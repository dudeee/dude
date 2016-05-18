import os from 'os';

export default (bot, { client }) => {
  const INTERVAL = 1000;

  // CPU STATS
  const data = {
    titles: [],
    data: [],
  };

  setInterval(() => {
    const cpus = os.cpus();

    data.titles = [];
    data.data = [];
    cpus.forEach((cpu, index) => {
      const { user, sys, idle } = cpu.times;
      const used = user + sys;
      const total = used + idle;

      const percentage = Math.round(total / used);

      data.titles.push(`cpu ${index}`);
      data.data.push(percentage);
    });

    client.send('cpu', data);
  }, INTERVAL);
};
