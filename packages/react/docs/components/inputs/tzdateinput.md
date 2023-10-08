# TzDateInput

TzDateInput component uses mui Date picker with Dayjs timezone.

### Usage

```tsx
import { TzDateInput } from '@ra-libs/react';

<TzDateInput source="endAt" timezoneSource="endAtTimezone" label={'label'} useLabel />;
```

### Props

| Prop           | Required | Type    | Default | Description                                          |
| -------------- | -------- | ------- | ------- | ---------------------------------------------------- |
| useLabel       | false    | boolean | false   | whether to use react-admin Labeled component or not. |
| source         | true     | string  |         | the field source to retrieve its value.              |
| timezoneSource | true     | string  |         | the timezone field source to retrieve its value.     |
