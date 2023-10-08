import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  DateInputProps,
  useInput,
  useResourceContext,
  useTranslate,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import timezones from 'timezones.json';

interface OptionValue {
  label: string;
  value: string;
}

export function TimezoneInput(props: DateInputProps) {
  const autoCompletesTimezones: OptionValue[] = timezones.map((timezone) => {
    return { label: timezone.text, value: timezone.utc[0] };
  });

  const translate = useTranslate();
  const { setValue: setFormValue } = useFormContext();

  const { margin = 'dense', defaultValue = 'America/Sao_Paulo' } = props;

  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
    id,
  } = useInput({ source: props.source });

  const hasError = (isTouched || isSubmitted) && invalid;

  const resource = useResourceContext();
  const label = props.label
    ? props.label
    : translate(`resources.${resource}.fields.${field.name}`);

  const timezoneDefaultValue = autoCompletesTimezones.find(
    (timezone) => timezone.value === defaultValue,
  );

  const [optionValue, setOptionValue] = useState<OptionValue | undefined>(
    timezoneDefaultValue,
  );

  useEffect(() => {
    if (!field.value) {
      setFormValue(props.source, timezoneDefaultValue?.value, {
        shouldDirty: true,
      });
    }
  }, []);

  useEffect(() => {
    if (field.value) {
      const timezone = autoCompletesTimezones.find(
        (timezone) => timezone.value === field.value,
      );
      setOptionValue(timezone);
    }
  }, [field.value]);

  const handleValueChange = (
    _: React.SyntheticEvent,
    newOptionValue: OptionValue | null,
  ) => {
    setFormValue(props.source, newOptionValue?.value, {
      shouldDirty: true,
    });
  };

  return (
    <Autocomplete
      disablePortal
      id={id}
      options={autoCompletesTimezones}
      fullWidth
      selectOnFocus
      handleHomeEndKeys
      value={optionValue}
      onChange={handleValueChange}
      renderInput={(params) => (
        <TextField
          {...params}
          margin={margin}
          label={label}
          required={isRequired}
          error={hasError}
          helperText={hasError ? translate(error?.message || '') : ''}
        />
      )}
    />
  );
}
