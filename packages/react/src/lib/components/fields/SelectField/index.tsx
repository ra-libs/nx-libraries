import React from 'react'
import { Labeled, SelectField as RaSelectField,SelectFieldProps } from 'react-admin'

import { LabeledFieldProps } from '../../../config'

export function SelectField(props: LabeledFieldProps<SelectFieldProps>) {
  const { useLabel, ...rest } = props
  const field = <RaSelectField {...rest} />
  return useLabel ? <Labeled>{field}</Labeled> : <>{field}</>
}
