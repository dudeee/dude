import config from './config';
import SlackBot from 'slackbots';
import { filterable } from './tools/filters';


export default class Bot extends SlackBot {
  /**
   * Takes slackbots config object containing token and name
   *
   * Emits different events for each event with 'got:' prefix, e.g. 'got:typing'
   * @param  {object} config slackbots configs, {token, name}
   */
  constructor(config) {
    super(config);

    this.on('start', () => {
      this.on('message', message => {
        this.emit(`got:${message.type}`, message);
      });
    })

    this.globals = {};
  }

  /**
   * Matches incoming messages against a regular expression using `RegExp.test`
   * @param  {RegExp}   regex regular expression to match messages against
   * @param  {Function} fn    the listener, invoked upon a matching message
   * @return {Bot}            Returns the bot itself
   */
  @filterable('bot_match')
  match(regex, fn) {
    this.on('got:message', message => {
      if (regex.test(message.text)) fn(message);
    })

    return this;
  }

  /**
   * Send a message to IM | Channel | Group
   * @param  {string} target  The target to send the message to
   * @param  {string} message Message's text content
   * @param  {object} params  Message's parameters
   *                          see https://api.slack.com/methods/chat.postMessage
   * @return {Promise}        A promise which resolves upon succes and fails
   *                            in case of errors
   */
  @filterable('bot_sendMessage')
  sendMessage(target, message, params) {
    let options = {...this.globals, ...params};
    return this.postTo(target, message, options);
  }

  /**
   * Set bot's icon, can be either an :emoji: or a url
   * @param  {string} icon The icon to use, must be formatted like :emoji: to be
   *                       set as an emoji, otherwise will be considered as URL.
   *                       Pass a falsy value to delete the property
   * @return {Bot}         Returns the bot itself
   */
  @filterable('bot_icon')
  icon(icon) {
    if (!icon) {
      delete this.globals.icon_emoji;
      delete this.globals.icon_url;
    }

    if (/:\w+:/.test(icon)) {
      this.globals.icon_emoji = icon;
    } else {
      this.globals.icon_url = icon;
    }

    return this;
  }
}
