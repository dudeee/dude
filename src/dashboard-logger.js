import util from 'util';

export default (bot, winston) => {
  const DashboardLogger = winston.transports.Dashboard = function DashboardLogger(options = {}) {
    this.name = 'dashboardLogger';
    this.level = options.level || 'silly';
  };

  util.inherits(DashboardLogger, winston.Transport);

  DashboardLogger.prototype.log = function log(level, message, meta, next) {
    bot.emit('log', { level, message, meta });

    next(null, true);
  };
};
