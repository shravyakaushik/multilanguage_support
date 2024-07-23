// i18n.js
const i18n = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

i18n
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        backend: {
            loadPath: __dirname + '/locales/{{lng}}/translation.json'
        },
        fallbackLng: 'en',
        preload: ['en', 'kn', 'hi', 'ko'],
        detection: {
            order: ['querystring', 'cookie'],
            caches: ['cookie']
        }
    });

module.exports = i18n;
