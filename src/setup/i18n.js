import i18next from 'i18next';
import Backend from 'i18next-node-fs-backend';
import path from 'path';
import fs from 'fs-promise';
import _ from 'lodash';

export default async bot =>
  new Promise((resolve, reject) => {
    i18next
      .use(Backend)
      .init({
        lng: bot.config.language || 'en',
        fallbackLng: 'en',
        backend: {
          loadPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
          addPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.missing.json'),
          jsonIndent: 2
        }
      }, (err) => {
        if (err) {
          reject(err);
          return;
        }

        const keys = /%([^%]+)%/gi;
        bot.t = (key, substitutions = {}) =>
          i18next.t(key).replace(keys, (match, name) => _.get(substitutions, name, ''));

        bot.i18n = i18next;
        bot.i18n.load = async localesPath => {
          const languages = await fs.readdir(localesPath);

          for (const lang of languages) {
            const langPath = path.join(localesPath, lang);
            const files = await fs.readdir(langPath);

            for (const file of files) {
              const ns = path.basename(file, '.json');
              const fullPath = path.join(langPath, file);
              bot.i18n.addResourceBundle(lang, ns, require(fullPath), true, true);
            }
          }
        };
        resolve(i18next);
      });
  });
