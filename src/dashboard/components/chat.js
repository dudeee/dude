import blessed from 'blessed';
import box from './styles/box';
import input from './styles/input';
import screen from '../screen';
import { server, client } from '../messenger';

const chat = blessed.form({
  ...box(),
  label: 'chat',
  keys: false,
  vi: false,
});

const channels = blessed.list({
  ...box(),
  width: '20%-1',
  height: '100%-2',
  label: 'channels',
  top: 0,
  left: 0,
  scrollable: true,
  alwaysScroll: true,
});

const messages = blessed.list({
  ...box(),
  width: '80%-1',
  height: '100%-5',
  label: 'messages',
  top: 0,
  left: '20%',
  scrollable: true,
  alwaysScroll: true,
});

const messageinput = blessed.textbox({
  ...input(),
  bottom: 0,
  left: '20%',
  width: '80%-1',
});

const actions = blessed.form({
  ...box(),
  width: '80%-1',
  height: '100%-2',
  top: 0,
  left: '20%',
  label: 'actions',
});

const reaction = blessed.textbox({
  ...input(),
  top: 0,
  left: 0,
  label: 'reaction',
});

const fullText = blessed.box({
  ...box(),
  top: 3,
  left: 0,
  height: '100%-8',
  width: null,
  label: 'full text',
  scrollable: true,
  alwaysScroll: true,
});

const del = blessed.button({
  ...input(),
  bottom: 3,
  left: 0,
  content: 'delete',
  align: 'center',
});

const button = blessed.button({
  ...input(),
  bottom: 0,
  left: 0,
  content: 'apply',
  align: 'center',
});

actions.hide();
actions.append(reaction);
actions.append(fullText);
actions.append(del);
actions.append(button);

button.on('press', () => {
  actions.submit();
});

[chat, channels, messages].forEach(el => {
  el.key('tab', () => {
    chat.focusNext();
  });
  el.key('S-tab', () => {
    chat.focusPrevious();
  });
});

let channellist = [];
let messagelist = [];
let userlist = [];
let currentChannel = null;
let currentMessage = null;

del.on('press', () => {
  client.send('delete', currentMessage);
  actions.hide();
  messages.focus();
});

const showMessages = () => {
  const list = messagelist
                .filter(m => m.channel === currentChannel.id)
                .map(m => {
                  const user = userlist.find(a => a.id === m.user) || {};
                  return `<${m.ts}> ${m.username || user.name}: ${m.text}`;
                });
  messages.setItems(list);
  messages.scrollTo(messages.height);
  messages.select(list.length - 1);
};

actions.on('submit', () => {
  actions.hide();
  messages.focus();

  const reactions = reaction.content.split(',').map(a => a.trim());

  client.send('react', { message: currentMessage, emojis: reactions });
});

actions.key('escape', () => {
  actions.hide();
  messages.focus();
});

channels.on('select', (selected) => {
  const name = selected.content.slice(1);
  currentChannel = channellist.find(a => a.name === name || (a.user && a.user.name === name));
  if (selected.style.fg === 'red') selected.style.fg = null;

  client.request('history', { channel: currentChannel.id }, (data) => {
    data = data.map(m => ({ ...m, channel: currentChannel.id })).reverse();
    messagelist = messagelist.concat(data);
    showMessages();
  });

  client.send('exclude', name);

  showMessages();
});

messages.on('select', (selected) => {
  const ts = /<([^>]+)>/i.exec(selected.content)[1];
  currentMessage = messagelist.find(a => a.ts === ts);
  actions.show();
  actions.focus();
  fullText.content = currentMessage.text;
});

const INTERVAL = 5000;
const update = () => {
  client.request('users', {}, (data) => {
    if (data.error) return;

    userlist = data;

    client.request('channels', {}, (list) => {
      if (list.error) return;

      channellist = list.map(ch => {
        if (ch.isIM) {
          ch.user = userlist.filter(a => a).find(a => a.id === ch.user);
        }

        return ch;
      });
      const name = (ch) => (ch.isChannel ? `#${ch.name}` : `@${ch.user.name}`) + ` (${ch.id})`;
      const names = list.map(name);
      channels.setItems(names);
      if (!currentChannel) currentChannel = names[0];

      screen.render();
    });
  });
};

update();
setInterval(update, INTERVAL);

const DEFAULTS = {
  websocket: false,
  parse: 'full',
};

messageinput.key('enter', () => {
  client.send('message', [currentChannel.id, messageinput.value, DEFAULTS]);

  messageinput.clearValue();

  update();
});

server.on('message', (message, data) => {
  messagelist.push(data);
  if (currentChannel.id === data.channel) {
    const user = userlist.find(a => a.id === data.user);
    messages.add(`<${data.ts}> ${user.name}: ${data.text}`);
    messages.scroll(1);
  } else {
    const channel = channellist.findIndex(a => a.id === data.channel);
    const ch = channels.getItem(channel);
    if (ch) {
      ch.style.fg = 'red';
    }
  }

  screen.render();
});

screen.on('route', route => {
  if (route === 'chat') {
    chat.show();
    chat.focus();
  } else {
    chat.hide();
  }
});


chat.append(channels);
chat.append(messages);
chat.append(messageinput);
chat.append(actions);
export default chat;
