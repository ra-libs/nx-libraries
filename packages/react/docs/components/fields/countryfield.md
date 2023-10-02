# CountryField

CountryField component uses react-admin SelectField with a pre-defined countries list.

### Usage

```tsx
import { CountryField } from '@ra-libs/react';

<CountryField useLabel fullWidth />;
```

### Props

| Prop     | Required | Type    | Default | Description                                          |
| -------- | -------- | ------- | ------- | ---------------------------------------------------- |
| useLabel | false    | boolean | false   | whether to use react-admin Labeled component or not. |
| source   | false    | string  | country | the field source to retrieve its value.              |
