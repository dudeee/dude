import blessed from 'blessed';
import screen from '../screen';

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
      }
    },
    message: {
      keys: 'm',
      callback() {
        screen.emit('route', 'message');
      }
    },
    stats: {
      keys: 's',
      callback() {
        screen.emit('route', 'stats');
      }
    },
    quit: {
      keys: 'q',
      callback() {
        process.exit(0);
      }
    }
  }
});
