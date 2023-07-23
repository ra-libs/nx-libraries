import React from 'react'
import { Labeled, SelectField, SelectFieldProps } from 'react-admin'
import { LabeledFieldProps } from '../../../config'
import { useCurrencies } from '../../../hooks/currencies'

type CurrencyFieldProps = SelectFieldProps

export function CurrencyField(props: LabeledFieldProps<CurrencyFieldProps>) {
  const { source = 'currency', useLabel, ...rest } = props
  const currencies = useCurrencies()

  const field = <SelectField source={source} choices={currencies} {...rest} />
  return useLabel ? <Labeled>{field}</Labeled> : <>{field}</>
}
