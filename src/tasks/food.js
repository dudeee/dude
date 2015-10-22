export default bot => {
  bot.listen(/Food List/i, message => {
    message.reply('You are allowed');
  }, { permissions: 'admins' })
}
