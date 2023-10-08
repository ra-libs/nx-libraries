import 'dayjs/locale/pt-br';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useEffect } from 'react';
import {
  DateInputProps,
  useInput,
  useResourceContext,
  useTranslate,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';

interface TzTimeInputProps extends DateInputProps {
  timezoneSource: string;
  adapterLocale: string;
}

dayjs.extend(utc);
dayjs.extend(timezone);

export function TzTimeInput(props: TzTimeInputProps) {
  const translate = useTranslate();
  const { setValue: setFormValue } = useFormContext();

  const { margin = 'dense', adapterLocale = 'pt-br' } = props;

  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
    id,
  } = useInput({ source: props.source });

  const timezoneSourceInput = useInput({
    source: props.timezoneSource,
  });

  const [value, setValue] = React.useState<Dayjs | null>();

  const hasError = (isTouched || isSubmitted) && invalid;

  const resource = useResourceContext();

  const label = props.label
    ? props.label
    : translate(`resources.${resource}.fields.${field.name}`);

  const handleValueChange = (newValue: Dayjs | null) => {
    setFormValue(field.name, newValue?.toISOString(), { shouldDirty: true });
  };

  useEffect(() => {
    if (field.value) {
      setValue(dayjs.tz(field.value, timezoneSourceInput.field.value));
    }
  }, [field.value]);

  console.table({
    component: 'TzTimeInput',
    name: field.name,
    fieldValue: field.value,
    timezoneSource: timezoneSourceInput?.field.value,
    value: value?.toISOString(),
  });

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={adapterLocale}
    >
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
  );
}
