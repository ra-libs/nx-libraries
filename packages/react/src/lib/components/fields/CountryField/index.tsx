import React from 'react'
import { Labeled, SelectField, SelectFieldProps } from 'react-admin'

import { LabeledFieldProps } from '../../../config'
import { useCountries } from '../../../hooks/countries'

type CountryFieldProps = SelectFieldProps

export function CountryField(props: LabeledFieldProps<CountryFieldProps>) {
  const { source = 'country', useLabel, ...rest } = props

  const countries = useCountries()

  const field = <SelectField source={source} choices={countries} {...rest} />

  return useLabel ? <Labeled>{field}</Labeled> : <>{field}</>
}
