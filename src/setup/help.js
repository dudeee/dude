export default bot => {
  // .help method, used to define `help` records for a plugin/task
  bot.config.help = [];
  bot.help = (name, description, long) => {
    bot.config.help[name] = { description, long };
  };
};
