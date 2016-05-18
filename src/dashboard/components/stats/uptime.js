import blessed from 'blessed';
import screen from '../../screen';
import { server } from '../../messenger';

const uptime = blessed.box({
  bottom: 0,
  left: 0,
  height: 1,
  width: 'shrink',
  style: {
    fg: 'yellow',
  },
});

server.on('uptime', (message, data) => {
  uptime.setContent(`uptime: ${data}`);

  screen.render();
});

export default uptime;
