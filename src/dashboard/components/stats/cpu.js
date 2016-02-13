import contrib from 'blessed-contrib';
import screen from '../../screen';
import box from '../styles/box';
import os from 'os';

const bar = contrib.bar({
  ...box(),
  label: 'cpus',
  height: '50%-1',
  width: '50%-1',
  left: '50%',
  maxHeight: 100
});

const data = {
  titles: [],
  data: []
};
const INTERVAL = 1000;
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

  bar.setData(data);
  screen.render();
}, INTERVAL);

export default bar;
