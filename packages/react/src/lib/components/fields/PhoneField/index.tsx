import { styled, useTheme } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import React from 'react'
import { TextFieldProps, useLocaleState, useRecordContext, useResourceContext, useTranslate } from 'react-admin'

import { LabeledFieldProps } from '../../../config'

interface PhoneFieldProps extends TextFieldProps {
  source: string
}

export function PhoneField(props: LabeledFieldProps<PhoneFieldProps>) {
  const { source, useLabel } = props
  const record = useRecordContext()

  const [locale] = useLocaleState()
  const translate = useTranslate()

  const resource = useResourceContext()
  const value = record[source]
  const label = props.label ? props.label : translate(`resources.${resource}.fields.${source}`)

  const theme = useTheme()

  const MuiTelField = styled(MuiTelInput)`
    &.MuiTelInput-TextField {
      margin-top: 0 !important;
    }
    & .MuiInputBase-root {
      background-color: transparent !important;
      padding: 0;
    }

    & .MuiFormLabel-root {
      margin-left: -12px;
      &.Mui-disabled {
        color: ${theme.palette.text.secondary};
      }
    }

    & input {
      &.Mui-disabled {
        color: ${theme.palette.text.primary};
        -webkit-text-fill-color: ${theme.palette.text.primary};
      }
    }
    & .MuiFilledInput-root {
      &.Mui-disabled:before {
        border: none;
      }
    }
  `

  return <MuiTelField langOfCountryName={locale} label={useLabel ? label : null} value={value} disabled />
}
