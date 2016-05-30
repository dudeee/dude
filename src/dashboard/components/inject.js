import blessed from 'blessed';
import box from './styles/box';
import screen from '../screen';
import input from './styles/input';
import { client } from '../messenger';

const form = blessed.form({
  ...box(),
  label: 'inject',
});

const event = blessed.textbox({
  ...input(),
  top: 0,
  left: 0,
  label: 'event',
});

const text = blessed.textarea({
  ...input(),
  top: event.height,
  left: 0,
  height: form.height - event.height - 5,
  width: '100%',
  label: 'content',
});

const button = blessed.button({
  ...input(),
  top: '100%-5',
  left: 0,
  content: 'inject',
  align: 'center',
});

form.append(event);
form.append(text);
form.append(button);

form.on('submit', () => {
  client.send('inject', [event.value, text.value]);
  text.clearValue();
  event.clearValue();
});

button.on('press', () => form.submit());

screen.on('route', route => {
  if (route === 'inject') {
    form.show();
    event.focus();
  } else {
    form.hide();
  }
});

export default form;
