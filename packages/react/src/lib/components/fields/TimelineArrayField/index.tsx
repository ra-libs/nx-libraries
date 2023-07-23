import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab'
import React from 'react'

import { Labeled, useRecordContext, useResourceContext, useTranslate } from 'react-admin'
import { LabeledFieldProps } from '../../../config'

interface TimelineArrayFieldProps {
  source: string
}

export function TimelineArrayField(props: LabeledFieldProps<TimelineArrayFieldProps>) {
  const { source, useLabel } = props
  const translate = useTranslate()
  const resource = useResourceContext()
  const record = useRecordContext()

  const places = record?.[source] as string[]
  const label = translate(`resources.${resource}.fields.${source}`)

  const field = (
    <Timeline>
      {places.map((place, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent sx={{ display: 'none' }}></TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            {index + 1 < places.length && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>{place}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
  return useLabel ? <Labeled label={label}>{field}</Labeled> : <>{field}</>
}
