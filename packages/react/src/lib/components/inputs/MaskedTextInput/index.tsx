import { TextField } from '@mui/material'
import React from 'react'
import { TextInputProps, useInput, useResourceContext,useTranslate } from 'react-admin'
import { useFormContext } from 'react-hook-form'
import { useIMask } from 'react-imask'

interface MaskedTextInputProps extends TextInputProps {
  mask: string
}

export function MaskedTextInput(props: MaskedTextInputProps) {
  const { mask, margin = 'dense', ...propsRest } = props
  const translate = useTranslate()

  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
    id,
  } = useInput(propsRest)

  const form = useFormContext()

  const hasError = (isTouched || isSubmitted) && invalid

  const resource = useResourceContext()
  const label = props.label ? props.label : translate(`resources.${resource}.fields.${field.name}`)

  const maskInput = useIMask(
    { mask },
    {
      onAccept: (value) => {
        form.setValue(props.source, value, { shouldDirty: true })
      },
    },
  )

  return (
    <TextField
      {...field}
      {...propsRest}
      id={id}
      required={isRequired}
      inputRef={maskInput.ref}
      label={label}
      margin={margin}
      error={hasError}
      helperText={hasError ? translate(error?.message || '') : ''}
    />
  )
}
