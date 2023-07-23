import React from 'react'
import { SelectInput, SelectInputProps } from 'react-admin'

import { useCountries } from '../../../hooks/countries'

type CountryInputProps = SelectInputProps

export function CountryInput(props: CountryInputProps) {
  const { source = 'country', defaultValue, ...rest } = props

  const countries = useCountries()

  return <SelectInput source={source} choices={countries} defaultValue={defaultValue || 'BR'} {...rest} />
}
