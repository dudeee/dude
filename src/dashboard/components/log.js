import blessed from 'blessed';
import box from './styles/box';
import screen from '../screen';
import chalk from 'chalk';
import { server } from '../messenger';

const log = blessed.log({
  ...box(),
  label: 'logs',
  scrollable: true,
  alwaysScroll: true,
});

screen.on('route', route => {
  if (route === 'log') {
    log.show();
    log.focus();
  } else {
    log.hide();
  }
});

server.on('log', (message, event) => {
  let color;
  switch (event.level) {
    case 'error':
      color = 'red';
      break;
    case 'warn':
      color = 'orange';
      break;
    case 'debug':
      color = 'yellow';
      break;
    case 'info':
      color = 'blue';
      break;
    case 'verbose':
      color = 'white';
      break;
    case 'silly':
      color = 'gray';
      break;
    default:
      color = 'white';
      break;
  }


  log.add(`[${chalk[color](event.level)}] ${event.message}`);
});

export default log;
