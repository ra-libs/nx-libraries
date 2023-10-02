# CountryInput

CountryInput component uses react-admin SelectInput with a pre-defined countries list.

### Usage

```tsx
import { CountryInput } from '@ra-libs/react';

<CountryInput fullWidth validate={[required()]} />;
```

### Props

| Prop   | Required | Type   | Default | Description                             |
| ------ | -------- | ------ | ------- | --------------------------------------- |
| source | false    | string | country | the field source to retrieve its value. |
