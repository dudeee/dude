// import initialize from './initialize';
// import { expect } from 'chai';
// import messenger from 'messenger';

// describe('dashboard', () => {
  // let bot;
  // let client;
  // let server;
  // before(async () => {
  //   const instances = await initialize();
  //   bot = instances.bot;
  //
  //   client = messenger.createSpeaker(8081);
  //   server = messenger.createListener(8082);
  // });

  // FIXME: Messenger.js doesn't have an `.off` method to remove listener!
  // it('should send a `message` on `hear`', done => {
  //   server.on('message', message => {
  //     expect(message.data.text).to.equal('hello');
  //
  //     done();
  //   });
  //
  //   setTimeout(() => {
  //     bot.inject('message', { text: 'hello' });
  //   }, 1000);
  // });
  //
  // it('should reply `channels` request with IMs and channels', done => {
  //   client.request('channels', {}, list => {
  //     const channels = bot.channels.map(a => ({ ...a, isChannel: true }));
  //     const ims = bot.ims.map(a => ({ ...a, isIM: true }));
  //
  //     expect(list).to.eql(channels.concat(ims));
  //
  //     done();
  //   });
  // });
// });
