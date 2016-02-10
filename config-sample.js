module.exports = {
  token: process.env.BOLT_SLACK_TOKEN,
  log: {
    level: process.env.BOLT_LOG_LEVEL,
    console: true,
    file: false
  }
};
