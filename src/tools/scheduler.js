import schedule from 'node-schedule';

const DEFAULTS = {
  pattern: ['*', '*', '*', '*', '*', '*'],
  time: null,
  task: null
}

export default class Scheduler {
  constructor(options = {}) {
    Object.assign(this, DEFAULTS, options);

    // Define a chainable method for each value in pattern
    ['second', 'minute', 'hour', 'day', 'month', 'week'].forEach((name, i) => {
      this[name] = n => {
        this.pattern[i] = n;
        return this;
      }
    });

    this.job = null;
  }

  start() {
    if (this.job) this.stop();

    let date = this.time || this.pattern.join(' ');

    this.job = new schedule.scheduleJob(date, this.task);

    return this.job;
  }

  cancel() {
    schedule.cancelJob(this.job);

    return this;
  }
}
