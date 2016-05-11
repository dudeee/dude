import eventLogger from './event-logger';
import winston from 'winston';

export default bot => {
  bot.config.log = {
    file: true,
    console: !module.parent.parent.parent,

    ...bot.config.log
  };

  eventLogger(bot, winston);
  const transports = [new (winston.transports.Event)()];
  if (bot.config.log.file) transports.push(new (winston.transports.File)({ filename: 'dude.log' }));
  if (bot.config.log.console) transports.push(new (winston.transports.Console)());

  bot.log = new (winston.Logger)({ transports });

  // log level
  bot.log.level = bot.config.log.level || 'info';
};
