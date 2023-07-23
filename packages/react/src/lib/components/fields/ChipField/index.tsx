import { Chip, Typography } from '@mui/material'
import React from 'react'
import { ChipFieldProps, useRecordContext, useResourceDefinition, useTranslate } from 'react-admin'

export function ChipField(props: ChipFieldProps) {
  const { className, source = 'id', emptyText } = props

  const record = useRecordContext()
  const translate = useTranslate()
  let value = record?.[source]
  const { recordRepresentation } = useResourceDefinition()

  if (value == null && emptyText) {
    return (
      <Typography component='span' variant='body2' className={className}>
        {emptyText && translate(emptyText, { _: emptyText })}
      </Typography>
    )
  }

  if (typeof recordRepresentation === 'string') value = record[recordRepresentation]
  if (typeof recordRepresentation === 'function') value = recordRepresentation(record)
  if (React.isValidElement(recordRepresentation)) return recordRepresentation

  return <Chip label={value} sx={{ margin: '4px', cursor: 'inherit' }} />
}
