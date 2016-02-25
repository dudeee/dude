import Agenda from 'agenda';

export default async bot => {
  await (new Promise(resolve =>
    bot.agenda = new Agenda({
      db: {
        address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/agenda'
      }
    }, resolve)
  ));

  bot.agenda.start();
  bot.agenda.purge(() => 0);

  bot.log.verbose('[agenda]', bot.t('agenda.start'));

  ['start', 'complete', 'success', 'fail'].forEach(event => {
    bot.agenda.on(event, job => {
      bot.log.debug('[agenda]', bot.t('agenda.job'), job.attrs.name, event, job.attrs);
    });
  });
};
