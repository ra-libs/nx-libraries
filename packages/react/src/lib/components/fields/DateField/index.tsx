import React from 'react'
import { DateFieldProps, Labeled, DateField as RaDateField } from 'react-admin'
import { LabeledFieldProps } from '../../../config'

export function DateField(props: LabeledFieldProps<DateFieldProps>) {
  const { useLabel, ...rest } = props
  const field = <RaDateField {...rest} />
  return useLabel ? <Labeled>{field}</Labeled> : <>{field}</>
}
