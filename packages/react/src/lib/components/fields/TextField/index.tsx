import React from 'react'
import { Labeled, TextField as RaTextField, TextFieldProps } from 'react-admin'
import { LabeledFieldProps } from '../../../config'

export function TextField(props: LabeledFieldProps<TextFieldProps>) {
  const { useLabel, ...rest } = props
  const field = <RaTextField {...rest} />
  return useLabel ? <Labeled>{field}</Labeled> : <>{field}</>
}
