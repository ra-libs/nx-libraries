import ptBrLocale from 'date-fns/locale/pt-BR'
import { useLocaleState } from 'react-admin'

const localeMap: any = {
  'pt-br': ptBrLocale,
}

export function useDateLocale() {
  const [locale] = useLocaleState()
  return localeMap[locale]
}
