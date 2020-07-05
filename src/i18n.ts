import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: '/gmr/rabbitmq-management-ui-prototype/locales/{{lng}}/{{ns}}.json '
        },
        fallbackLng: 'en',
        lng: 'en',
        debug: false,
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
