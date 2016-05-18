import blessed from 'blessed';
import screen from '../screen';
import { client } from '../messenger';

const height = 1;
export default blessed.listbar({
  top: screen.height - height,
  left: 0,
  width: '100%',
  height,
  items: {
    logs: {
      keys: 'l',
      callback() {
        screen.emit('route', 'log');
      },
    },
    stats: {
      keys: 's',
      callback() {
        screen.emit('route', 'stats');
      },
    },
    message: {
      keys: 'm',
      callback() {
        screen.emit('route', 'message');
      },
    },
    chat: {
      keys: 'c',
      callback() {
        screen.emit('route', 'chat');
      },
    },
    quit: {
      keys: 'q',
      callback() {
        client.request('quit', {}, () => {
          process.exit(0);
        });
      },
    },
  },
});
