import express from 'express';
import dude from '../build/index';
import WebSocket from 'ws';
import bodyParser from 'body-parser';
import slack from './fixtures';

let instances;
export default async function initialize() {
  if (instances) return instances;
  const ws = new WebSocket.Server({ port: 9090 });
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const server = app.listen(9091);

  const bot = dude({
    log: {
      level: 'silly',
    },
    teamline: {
      actionsChannel: false,
      teamsChannels: false,
      uri: 'http://127.0.0.1:9091',
    },
  }, true);

  ws._events = {};

  let socket;
  ws.on('connection', s => {
    socket = s;

    s.on('message', message => {
      const msg = JSON.parse(message);

      s.send(JSON.stringify({
        ok: true,
        reply_to: msg.id,
      }));
    });
  });

  bot.connect('ws://127.0.0.1:9090');
  bot._api = 'http://127.0.0.1:9091/';

  const uri = bot._api.slice(0, -1);

  Object.assign(bot, slack);

  return new Promise(resolve => {
    bot.on('ready', () => {
      instances = {
        server, uri, bot, app, socket, ws,
      };
      resolve(instances);
    });
  });
};
