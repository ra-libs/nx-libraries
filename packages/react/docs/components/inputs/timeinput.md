# TimeInput

TimeInput component uses mui TimePicker component.

### Usage

```tsx
import { TimeInput } from '@ra-libs/react';

<TimeInput source="<source>" />;
```

### Props

| Prop       | Required | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ---------- | -------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dateSource | false    | string | -       | date input source, it might be useful to copy the date value from another field and completes the time using this component. ex: when you have startAt and endAt but only the startAt input set the date, so the dateSource should be startAt and the source endAt, this way will set the endAt date (not time) to be equal to startAt value. |

> It accepts react-admin DateInput props
