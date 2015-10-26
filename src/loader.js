import fs from 'fs';
import path from 'path';

let modulesPath = path.resolve(__dirname, '../node_modules');
let modules = fs.readdirSync(modulesPath)
.filter(module =>
  module.startsWith('bolt-')
).map(module =>
  path.resolve(modulesPath, module)
);

let tasksPath = path.resolve(__dirname, 'tasks');
let tasks = fs.readdirSync(tasksPath);
let files = modules.concat(tasks)
.map(module =>
  path.resolve(tasksPath, module)
);

export default bot => {
  for (let file of files) {
    require(file)(bot);
  }
}
