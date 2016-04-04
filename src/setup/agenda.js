import Agenda from 'agenda';
import _ from 'lodash';

export default async bot => {
  await (new Promise((resolve, reject) => {
    bot.agenda = new Agenda({
      mongo: _.get(bot.config, 'agenda.mongo'),
      db: {
        address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/agenda'
      }
    }, resolve);

    bot.agenda.on('error', e => {
      console.error('agenda error', e);
      reject(e);
    });
  }));

  bot.agenda.start();
  bot.agenda.purge(() => 0);

  bot.log.verbose('[agenda]', bot.t('agenda.start'));

  ['start', 'complete', 'success', 'fail'].forEach(event => {
    bot.agenda.on(event, job => {
      bot.log.debug('[agenda]', bot.t('agenda.job'), job.attrs.name, event, job.attrs);
    });
  });
};
