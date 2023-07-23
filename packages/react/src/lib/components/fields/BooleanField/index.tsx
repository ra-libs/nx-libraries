import React from 'react'
import { Labeled, BooleanField as RaBooleanField, BooleanFieldProps } from 'react-admin'
import { LabeledFieldProps } from '../../../config'

export function BooleanField(props: LabeledFieldProps<BooleanFieldProps>) {
  const { useLabel, ...rest } = props
  const field = <RaBooleanField {...rest} />
  return useLabel ? <Labeled>{field}</Labeled> : <> {field}</>
}
