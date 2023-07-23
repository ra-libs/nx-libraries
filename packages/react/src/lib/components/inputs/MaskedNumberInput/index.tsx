import { TextField } from '@mui/material'
import React from 'react'
import { TextInputProps, useInput, useResourceContext, useTranslate } from 'react-admin'
import { InputAttributes, NumericFormat, NumericFormatProps } from 'react-number-format'

interface MaskedNumberInputProps extends TextInputProps {
  mask?: string
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  mask: any
  prefix?: string
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps<InputAttributes>, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          })
        }}
        thousandSeparator
        valueIsNumericString
        fixedDecimalScale
        decimalScale={2}
      />
    )
  },
)

export function MaskedNumberInput(props: MaskedNumberInputProps) {
  const { mask, margin = 'dense', fullWidth, ...propsRest } = props
  const translate = useTranslate()

  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
    id,
  } = useInput(propsRest)

  const hasError = (isTouched || isSubmitted) && invalid

  const resource = useResourceContext()
  const label = props.label ? props.label : translate(`resources.${resource}.fields.${field.name}`)

  return (
    <TextField
      {...field}
      {...propsRest}
      id={id}
      required={isRequired}
      label={label}
      margin={margin}
      fullWidth={fullWidth}
      error={hasError}
      helperText={hasError ? translate(error?.message || '') : ''}
      InputProps={{
        inputComponent: NumericFormatCustom as any,
        inputProps: {
          mask,
        },
      }}
    />
  )
}
