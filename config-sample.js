module.exports = {
  token: process.env.dude_SLACK_TOKEN,
  log: {
    level: process.env.dude_LOG_LEVEL,
    console: true,
    file: false
  }
};
