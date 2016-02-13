import contrib from 'blessed-contrib';
import screen from '../../screen';
import box from '../styles/box';

const errors = contrib.line({
  ...box(),
  xLabelPadding: 3,
  xPadding: 5,
  showLegend: true,
  wholeNumbersOnly: true,
  label: 'errors',
  width: '50%-1',
  height: '50%-1',
  top: '50%-1'
});

const INTERVAL = 10 * 1000;
const exceptions = {
  title: 'exceptions',
  x: [0, 0, 0, 0, 0],
  y: [0, 0, 0, 0, 0],
  style: {
    line: 'red'
  },
  count: 0
};
const rejections = {
  title: 'rejections',
  x: [0, 0, 0, 0, 0],
  y: [0, 0, 0, 0, 0],
  style: {
    line: 'yellow'
  },
  count: 0
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

  errors.setData([exceptions, rejections]);

  exceptions.count = 0;
  rejections.count = 0;

  screen.render();
}, INTERVAL);

export default errors;
