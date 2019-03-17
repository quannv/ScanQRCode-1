import I18n from 'react-native-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'
I18n.fallbacks = true;
I18n.defaultLocale = 'fr'
I18n.translations = {
    en,
    fr
}

export function lang(string){
   return I18n.t(string)
}
export default I18n;

