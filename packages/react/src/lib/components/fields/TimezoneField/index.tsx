import React from 'react';
import {
  FunctionField,
  Labeled,
  TextFieldProps,
  useRecordContext,
  useResourceContext,
  useTranslate,
} from 'react-admin';
import timezones from 'timezones.json';

import { LabeledFieldProps } from '../../../config';

interface TimezoneFieldProps extends LabeledFieldProps<TextFieldProps> {
  source: string;
}

export function TimezoneField(props: TimezoneFieldProps) {
  const { useLabel, source } = props;

  const record = useRecordContext();

  const timezone = timezones.find(
    (timezone) => timezone.utc[0] === record?.[source],
  );

  const resource = useResourceContext();
  const translate = useTranslate();

  const label = props.label
    ? props.label
    : translate(`resources.${resource}.fields.${source}`);

  const field = <FunctionField label={label} render={() => timezone?.text} />;
  return useLabel ? <Labeled>{field}</Labeled> : <>{field}</>;
}
