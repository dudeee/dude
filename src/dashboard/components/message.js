import blessed from 'blessed';
import input from './styles/input';
import box from './styles/box';
import screen from '../screen';
import { client } from '../messenger';

const form = blessed.form({
  ...box(),
  label: 'message',
});

const channel = blessed.textbox({
  ...input(),
  top: 0,
  left: 0,
  label: 'channel',
});

const text = blessed.textarea({
  ...input(),
  top: channel.height,
  left: 0,
  height: form.height - channel.height - 5,
  width: '80%',
  label: 'content',
});

const options = blessed.textarea({
  ...input(),
  top: channel.height,
  left: '80%',
  height: form.height - channel.height - 5,
  width: '20%-1',
  label: 'options',
});

const button = blessed.button({
  ...input(),
  top: channel.height + text.height,
  left: 0,
  content: 'send',
  align: 'center',
});

form.append(channel);
form.append(text);
form.append(options);
form.append(button);

const DEFAULTS = {
  websocket: false,
  parse: 'full',
  link_names: true,
};

form.on('submit', () => {
  let opts;
  try {
    opts = JSON.parse(options.value);
  } catch (e) {
    opts = {};
  }

  opts = { ...DEFAULTS, ...opts };
  client.send('message', [channel.value, text.value, opts]);
  channel.clearValue();
  text.clearValue();
  options.clearValue();
});

button.on('press', () => form.submit());

screen.on('route', route => {
  if (route === 'message') {
    form.show();
    channel.focus();
  } else {
    form.hide();
  }
});

export default form;
