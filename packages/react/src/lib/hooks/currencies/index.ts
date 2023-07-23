import { useLocaleState } from 'react-admin'

import { CURRENCIES, CURRENCIES_PT_BR } from '../../config/common'

const CURRENCIES_LOCALE_MAP: any = {
  'pt-br': CURRENCIES_PT_BR,
}

export function useCurrencies() {
  const [locale] = useLocaleState()

  const lang = locale || 'pt-br'
  const currenciesByLocale = CURRENCIES_LOCALE_MAP[lang]

  const currencies = CURRENCIES.map((currency) => ({
    id: currency.id,
    name: `${currency.symbol} - ${currenciesByLocale[currency.id]}`,
  }))
  return currencies
}
