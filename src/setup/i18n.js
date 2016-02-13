import i18next from 'i18next';
import Backend from 'i18next-node-fs-backend';
import path from 'path';

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
        if (err) return reject(err);

        bot.t = i18next.t.bind(i18next);
        bot.i18n = i18next;
        resolve(i18next);
      });
  });
