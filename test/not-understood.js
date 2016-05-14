// import initialize from './initialize';
// import { expect } from 'chai';
//
//
// describe('not-understood', function help() {
//   const LONG_DELAY = 10000;
//   this.timeout(LONG_DELAY);
//
//   let bot;
//   let app;
//   let socket;
//   before(async () => {
//     const initialized = await initialize();
//     bot = initialized.bot;
//     app = initialized.app;
//     socket = initialized.socket;
//   });
//
//   it('should answer with `not-understood` when a message doesn\'t match any listener', () => {
//     bot.config.help = {};
//     bot.help('hello', 'description', 'long');
//
//     expect(Object.keys(bot.config.help).length).to.equal(1);
//     const record = bot.config.help.hello;
//     expect(record.description).to.equal('description');
//     expect(record.long).to.equal('long');
//   });
// });
