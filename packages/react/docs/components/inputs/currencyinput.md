# CurrencyInput

CurrencyInput component uses react-admin SelectField with a pre-defined currencies list.

### Usage

```tsx
import { CurrencyInput } from '@ra-libs/react';

<CurrencyInput fullWidth validate={[required()]} />;
```

### Props

| Prop   | Required | Type   | Default  | Description                             |
| ------ | -------- | ------ | -------- | --------------------------------------- |
| source | false    | string | currency | the field source to retrieve its value. |
