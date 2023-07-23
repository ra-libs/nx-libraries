import React from 'react'

import {
  Labeled,
  ReferenceArrayField as RaReferenceArrayField,
  ReferenceArrayFieldProps as RnReferenceArrayFieldProps,
  SingleFieldList,
} from 'react-admin'
import { LabeledFieldProps } from '../../../config'
import { ChipField } from '../ChipField'

type ReferenceArrayFieldProps = LabeledFieldProps<RnReferenceArrayFieldProps> & {
  source: string
}

export function ReferenceArrayField(props: ReferenceArrayFieldProps) {
  const { children, useLabel, ...rest } = props

  const field = (
    <RaReferenceArrayField {...rest}>
      {children ? (
        children
      ) : (
        <SingleFieldList>
          <ChipField />
        </SingleFieldList>
      )}
    </RaReferenceArrayField>
  )

  return useLabel ? <Labeled>{field}</Labeled> : <>{field}</>
}
