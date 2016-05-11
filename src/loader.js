import fs from 'fs';
import path from 'path';

const modulesPath = path.resolve(__dirname, '../node_modules');
const modules = fs.readdirSync(modulesPath)
.filter(module =>
  module.startsWith('dude-')
).map(module =>
  path.resolve(modulesPath, module)
);

const tasksPath = path.resolve(__dirname, 'tasks');
const tasks = fs.readdirSync(tasksPath);
const files = modules.concat(tasks)
.map(module =>
  path.resolve(tasksPath, module)
);

export default async bot => {
  for (const file of files) {
    try {
      const rq = require(file);

      bot.log.debug('[loader] require(%s)(bot)', file);
      rq(bot);
    } catch (e) {
      bot.log.error('[loader]', bot.t('loader.error'), '%s: %s', file, e);
    }
  }
};
