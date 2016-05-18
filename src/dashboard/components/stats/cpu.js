import contrib from 'blessed-contrib';
import screen from '../../screen';
import box from '../styles/box';
import { server } from '../../messenger';

const bar = contrib.bar({
  ...box(),
  label: 'cpus',
  height: '50%-1',
  width: '50%-1',
  left: '50%',
  maxHeight: 100,
});

server.on('cpu', (message, data) => {
  bar.setData(data);

  screen.render();
});

export default bar;
