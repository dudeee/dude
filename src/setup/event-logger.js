import util from 'util';

export default (bot, winston) => {
  const EventLogger = winston.transports.Event = function EventLogger(options = {}) {
    this.name = 'eventLogger';
    this.level = options.level || 'silly';
  };

  util.inherits(EventLogger, winston.Transport);

  EventLogger.prototype.log = function log(level, message, meta, next) {
    bot.emit('log', { level, message, meta });

    next(null, true);
  };
};
