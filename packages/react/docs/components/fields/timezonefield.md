# TimezoneField

TimezoneField component that map IANA timezone to text with Labeled component.

### Usage

```tsx
import { TimezoneField } from '@ra-libs/react';

<TimezoneField source="startAtTimezone" label={'Timezone'} />;
```

### Props

| Prop     | Required | Type    | Default | Description                                          |
| -------- | -------- | ------- | ------- | ---------------------------------------------------- |
| useLabel | false    | boolean | false   | whether to use react-admin Labeled component or not. |
| label    | false    | string  |         | the label to display.                                |
| source   | true     | string  |         | the field source to retrieve its value.              |
