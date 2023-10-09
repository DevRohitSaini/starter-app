/* eslint-disable prettier/prettier */
import i18next from 'i18next';
import english from './en.json';
import hindi from './hi.json';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    resources: {
        en: english,
        hi: hindi,
    },
    React: {
        useSuspence: false,
    },
});

export default i18next;
