import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { parseISO } from 'date-fns'
import React from 'react'
import { DateInputProps, useInput, useResourceContext, useTranslate } from 'react-admin'
import { useFormContext } from 'react-hook-form'

import { useDateLocale } from '../../../hooks'

export function DateInput(props: DateInputProps) {
  const translate = useTranslate()

  const { setValue } = useFormContext()
  const adapterLocale = useDateLocale()

  const { margin = 'dense' } = props

  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
    id,
  } = useInput(props)

  const hasError = (isTouched || isSubmitted) && invalid

  const resource = useResourceContext()
  const label = props.label ? props.label : translate(`resources.${resource}.fields.${field.name}`)

  const value = field.value && typeof field.value === 'string' ? parseISO(field.value) : field.value

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={adapterLocale}>
      <DatePicker
        {...field}
        value={value}
        label={label}
        onChange={(newValue) => {
          setValue(props.source, newValue, { shouldDirty: true })
        }}
        slotProps={{
          textField: {
            id: id,
            required: isRequired,
            margin: margin,
            error: hasError,
            helperText: hasError ? translate(error?.message || '') : '',
            fullWidth: props.fullWidth,
          },
        }}
      />
    </LocalizationProvider>
  )
}
