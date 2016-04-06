import schedule from 'node-schedule';

export default async bot => {
  bot.schedule = schedule;
};
