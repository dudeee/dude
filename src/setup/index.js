import path from 'path';

const files = ['i18n', 'log', 'messenger', 'help', 'schedule', 'pocket', 'ask', 'command', 'stop']
.map(file =>
  path.resolve(__dirname, `${file}.js`)
);

export default async bot => {
  for (const file of files) {
    try {
      const rq = require(file);

      const response = rq(bot);
      if (response && response.then) await response;
    } catch (e) {
      console.error('[setup] error %s: %s', file, e);
    }
  }
};
