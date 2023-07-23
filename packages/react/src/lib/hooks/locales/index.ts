import { useLocaleState } from 'react-admin'
import ptBrLocale from 'date-fns/locale/pt-BR'

const localeMap: any = {
  'pt-br': ptBrLocale,
}

export function useDateLocale() {
  const [locale] = useLocaleState()
  return localeMap[locale]
}
