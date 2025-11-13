import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((language, namespace, callback) => {
      import(`./locales/${language}/${namespace}.json`)
        .then(resources => {
          callback(null, resources.default);
        })
        .catch(error => {
          callback(error, null);
        });
    })
  )
  .init({
    fallbackLng: 'de',
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false,
    },
  });

export { i18next };
