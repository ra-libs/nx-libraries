import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import {
  DateField as RaDateField,
  DateFieldProps,
  Labeled,
  useRecordContext,
} from 'react-admin';

import { LabeledFieldProps } from '../../../config';

dayjs.extend(utc);
dayjs.extend(timezone);

interface TzDateFieldProps extends LabeledFieldProps<DateFieldProps> {
  timezoneSource: string;
  source: string;
}

export function TzDateField(props: TzDateFieldProps) {
  const { useLabel, timezoneSource, ...rest } = props;

  const record = useRecordContext();

  const timezone = record?.[timezoneSource];
  const date = record?.[rest.source];
  const value = dayjs.tz(date, timezone);

  const field = (
    <RaDateField
      {...rest}
      showDate
      showTime={false}
      transform={() => value.toDate()}
    />
  );
  return useLabel ? <Labeled>{field}</Labeled> : <>{field}</>;
}
