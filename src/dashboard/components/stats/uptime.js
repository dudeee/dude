import blessed from 'blessed';
import screen from '../../screen';

const uptime = blessed.box({
  bottom: 0,
  left: 0,
  height: 1,
  width: 'shrink',
  style: {
    fg: 'yellow'
  }
});

const INTERVAL = 100;
setInterval(() => {
  uptime.setContent(`uptime: ${process.uptime().toString()}`);
  screen.render();
}, INTERVAL);

export default uptime;
