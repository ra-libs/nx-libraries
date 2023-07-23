import React from 'react'
import { BooleanField as RaBooleanField, BooleanFieldProps,Labeled } from 'react-admin'

import { LabeledFieldProps } from '../../../config'

export function BooleanField(props: LabeledFieldProps<BooleanFieldProps>) {
  const { useLabel, ...rest } = props
  const field = <RaBooleanField {...rest} />
  return useLabel ? <Labeled>{field}</Labeled> : <> {field}</>
}
