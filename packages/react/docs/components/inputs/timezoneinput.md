# TimezoneInput

TimezoneInput component that uses mui Autocomplete with IANA list.

### Usage

```tsx
import { TimezoneInput } from '@ra-libs/react';

<TimezoneInput source="startAtTimezone" label={'Timezone'} fullWidth validate={[required()]} />;
```

### Props

| Prop     | Required | Type    | Default | Description                                          |
| -------- | -------- | ------- | ------- | ---------------------------------------------------- |
| useLabel | false    | boolean | false   | whether to use react-admin Labeled component or not. |
| label    | false    | string  |         | the label to display.                                |
| source   | true     | string  |         | the field source to retrieve its value.              |
