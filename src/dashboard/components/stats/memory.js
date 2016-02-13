import contrib from 'blessed-contrib';
import box from '../styles/box';
import screen from '../../screen';

const line = contrib.line({
  ...box(),
  xLabelPadding: 3,
  xPadding: 5,
  showLegend: true,
  wholeNumbersOnly: true,
  label: 'memory usage',
  width: '50%-1',
  height: '50%-1'
});

const INTERVAL = 500;
const data = {
  title: 'rss',
  x: [0, 0, 0, 0, 0],
  y: [0, 0, 0, 0, 0]
};
setInterval(() => {
  data.x.shift();
  const date = new Date();
  data.x.push(`${date.getMinutes()}:${date.getSeconds()}`);

  const mem = process.memoryUsage();
  data.y.shift();
  const readable = mem.rss / 1000000;
  data.y.push(readable);
  line.setData([data]);

  screen.render();
}, INTERVAL);

export default line;
