import React, { useEffect, useState } from 'react'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { TextInputProps, useInput, useLocaleState, useResourceContext, useTranslate } from 'react-admin'
import { useFormContext } from 'react-hook-form'

type PhoneInputProps = TextInputProps

export function PhoneInput(props: PhoneInputProps) {
  const [locale] = useLocaleState()
  const translate = useTranslate()
  const { setValue: setFormValue } = useFormContext()
  const [value, setValue] = useState('')

  const { margin = 'dense', ...propsRest } = props

  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
  } = useInput(props)

  const hasError = (isTouched || isSubmitted) && invalid

  const resource = useResourceContext()
  const label = props.label ? props.label : translate(`resources.${resource}.fields.${field.name}`)

  const handleChange = (newPhone: string) => {
    setValue(newPhone)
    if (matchIsValidTel(newPhone)) setFormValue(props.source, newPhone, { shouldDirty: true })
    else setFormValue(props.source, null, { shouldDirty: true })
  }

  useEffect(() => {
    handleChange(field.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MuiTelInput
      {...propsRest}
      {...field}
      value={value}
      onChange={handleChange}
      preferredCountries={['BR']}
      langOfCountryName={locale}
      defaultCountry={props.defaultValue || 'BR'}
      label={label}
      required={isRequired}
      margin={margin}
      error={hasError}
      helperText={hasError ? translate(error?.message || '') : ''}
    />
  )
}
