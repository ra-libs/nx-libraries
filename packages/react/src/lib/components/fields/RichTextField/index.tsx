import React from 'react'
import { Labeled, RichTextField as RaRichTextField, RichTextFieldProps } from 'react-admin'

import { LabeledFieldProps } from '../../../config'

export function RichTextField(props: LabeledFieldProps<RichTextFieldProps>) {
  const { useLabel, ...rest } = props
  const field = <RaRichTextField {...rest} />
  return useLabel ? <Labeled>{field}</Labeled> : <>{field}</>
}
