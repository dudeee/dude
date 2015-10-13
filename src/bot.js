import config from './config';
import SlackBot from 'slackbots';

export default class Bot extends SlackBot {
  constructor(config) {
    super(config);
  }

  start(fn) {
    this.on('start', fn);
  }

  sendMessage(text) {
    this.postMessageToChannel('test-bot', 'Hey');
  }.filter('send_message')
}
