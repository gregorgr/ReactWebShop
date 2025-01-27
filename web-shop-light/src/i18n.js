import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import sl from './translations/sl.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sl: { translation: sl },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
