import blessed from 'blessed';
import screen from '../screen';
import box from './styles/box';
import memory from './stats/memory';
import cpu from './stats/cpu';
import errors from './stats/errors';
import uptime from './stats/uptime';

const wrapper = blessed.box({
  ...box(),
  label: 'stats',
  focusable: true,
});

wrapper.append(memory);
wrapper.append(cpu);
wrapper.append(errors);
wrapper.append(uptime);

screen.on('route', route => {
  if (route === 'stats') {
    wrapper.show();
    wrapper.focus();
  } else {
    wrapper.hide();
  }
});

export default wrapper;
