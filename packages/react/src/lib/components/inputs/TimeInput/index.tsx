import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React from 'react'

import { DateInputProps, useInput, useResourceContext, useTranslate } from 'react-admin'
import { useFormContext } from 'react-hook-form'
import { parseISO } from 'date-fns'
import { useDateLocale } from '../../../hooks'

interface TimeInputProps extends DateInputProps {
  dateSource?: string
}

export function TimeInput(props: TimeInputProps) {
  const translate = useTranslate()
  const { setValue: setFormValue } = useFormContext()

  const { margin = 'dense', dateSource } = props

  const adapterLocale = useDateLocale()
  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
    id,
  } = useInput({ source: props.source })

  const dateSourceInput = useInput({
    source: dateSource || props.source,
  })

  const hasError = (isTouched || isSubmitted) && invalid

  const resource = useResourceContext()
  const label = props.label ? props.label : translate(`resources.${resource}.fields.${field.name}`)

  const handleValueChange = (newValue: Date | null) => {
    if (dateSourceInput.id !== id) {
      const dateSourceValue = dateSourceInput.field.value as Date
      newValue?.setUTCFullYear(dateSourceValue.getUTCFullYear())
      newValue?.setUTCMonth(dateSourceValue.getUTCMonth())
      newValue?.setUTCDate(dateSourceValue.getUTCDate())
    }
    if (newValue) {
      setFormValue(props.source, newValue, { shouldDirty: true })
    }
  }

  const value = field.value && typeof field.value === 'string' ? parseISO(field.value) : field.value

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={adapterLocale}>
      <TimePicker
        {...field}
        value={value}
        label={label}
        onChange={handleValueChange}
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
