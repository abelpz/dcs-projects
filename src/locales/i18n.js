import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_global from './en/global.json'
import es419_global from './es-419/global.json'
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    global: en_global
  },
  'es-419': {
    global: es419_global
  }
};

// export const i18next = (lng) => {
//   console.log('i18n init')
//   return i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//     .init({
//     ns: 'global',
//     resources,
//     lng, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
//     // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
//     // if you're using a language detector, do not define the lng option
//     defaultNS: 'global',
//     interpolation: {
//       escapeValue: false // react already safes from xss
//     }
//   })
// }

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    ns: 'global',
    defaultNS: 'global',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  }).then( ()=>{console.log('i18n init')})

  
export default i18n