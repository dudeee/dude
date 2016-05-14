module.exports = {
  token: process.env.DUDE_SLACK_TOKEN,
  log: {
    level: process.env.DUDE_LOG_LEVEL,
    console: true,
    file: false
  }
};
