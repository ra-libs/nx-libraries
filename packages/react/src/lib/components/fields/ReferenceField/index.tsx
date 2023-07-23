import React from 'react'
import { Labeled, ReferenceField as RaReferenceField, ReferenceFieldProps } from 'react-admin'

import { LabeledFieldProps } from '../../../config'

export function ReferenceField(props: LabeledFieldProps<ReferenceFieldProps>) {
  const { useLabel, ...rest } = props
  const field = <RaReferenceField {...rest} />
  return useLabel ? <Labeled>{field}</Labeled> : <> {field}</>
}
