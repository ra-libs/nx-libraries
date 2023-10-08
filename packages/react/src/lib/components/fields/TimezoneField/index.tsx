import React from 'react';
import {
  FunctionField,
  Labeled,
  TextFieldProps,
  useRecordContext,
} from 'react-admin';
import timezones from 'timezones.json';

import { LabeledFieldProps } from '../../../config';

interface TimezoneFieldProps extends LabeledFieldProps<TextFieldProps> {
  source: string;
}

export function TimezoneField(props: TimezoneFieldProps) {
  const { useLabel, ...rest } = props;

  const record = useRecordContext();

  const timezone = timezones.find(
    (timezone) => timezone.utc[0] === record?.[rest.source],
  );

  const field = (
    <FunctionField label={rest.label} render={() => timezone?.text} />
  );
  return useLabel ? <Labeled>{field}</Labeled> : <>{field}</>;
}
