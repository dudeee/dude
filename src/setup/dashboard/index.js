import path from 'path';
import fs from 'fs';

const files = fs.readdirSync(__dirname)
.filter(a => a !== 'index.js')
.map(file =>
  path.resolve(__dirname, file)
);

export default async (bot, messenger) => {
  for (const file of files) {
    try {
      const rq = require(file);

      const response = rq(bot, messenger);
      if (response && response.then) await response;
    } catch (e) {
      console.error('[setup] error %s: %s', file, e);
    }
  }
};
