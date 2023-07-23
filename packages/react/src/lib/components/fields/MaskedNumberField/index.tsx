import React from 'react'
import { Labeled, TextInputProps, useRecordContext, useResourceContext, useTranslate } from 'react-admin'
import { InputAttributes, NumericFormat, NumericFormatProps } from 'react-number-format'

import { LabeledFieldProps } from '../../../config'
import { MAPPED_CURRENCIES } from '../../../config/common'
interface MaskedNumberFieldProps extends TextInputProps {
  useCurrecyPrefix?: boolean
}

interface CustomProps {
  name: string
  prefix?: string
  value: any
}

function ReadOnlyNumericFormat(props: any) {
  return <span>{props.value}</span>
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps<InputAttributes>, CustomProps>(
  function NumericFormatCustom(props, ref) {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        thousandSeparator
        isNumericString
        fixedDecimalScale
        decimalScale={2}
        readOnly
        customInput={ReadOnlyNumericFormat}
      />
    )
  },
)

export function MaskedNumberField(props: LabeledFieldProps<MaskedNumberFieldProps>) {
  const { prefix, useLabel, label, useCurrecyPrefix } = props

  const resource = useResourceContext()
  const translate = useTranslate()

  const record = useRecordContext(props)
  const value = record[props.source]

  const labelToUse = translate(label ? (label as string) : `resources.${resource}.fields.${props.source}`)

  const useLabeledComponent = useLabel && label !== false

  let prefixToUse = prefix
  if (useCurrecyPrefix) prefixToUse = MAPPED_CURRENCIES?.[record.currency]?.symbol || ''

  const field = <NumericFormatCustom prefix={prefixToUse} value={value} name={props.source} />

  return useLabeledComponent ? <Labeled label={labelToUse}>{field}</Labeled> : field
}
