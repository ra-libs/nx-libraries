import countries from 'i18n-iso-countries';
import ptCountries from 'i18n-iso-countries/langs/pt.json';
import enCountries from 'i18n-iso-countries/langs/en.json';
import { useLocaleState } from 'react-admin';

countries.registerLocale(enCountries);
countries.registerLocale(ptCountries);

const COUNTRIES_MAP: any = {
  'pt-br': 'pt',
};

export function useCountries() {
  const [locale] = useLocaleState();

  const lang = COUNTRIES_MAP[locale] || locale || 'pt-br';
  const countriesChoices = countries.getNames(lang);
  return Object.keys(countriesChoices).map((id) => ({
    id,
    name: countriesChoices[id],
  }));
}
