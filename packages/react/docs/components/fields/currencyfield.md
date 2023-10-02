# CurrencyField

CurrencyField component uses react-admin SelectField with a pre-defined currencies list.

### Usage

```tsx
import { CurrencyField } from '@ra-libs/react';

<CurrencyField fullWidth useLabel />;
```

### Props

| Prop     | Required | Type    | Default  | Description                                          |
| -------- | -------- | ------- | -------- | ---------------------------------------------------- |
| useLabel | false    | boolean | false    | whether to use react-admin Labeled component or not. |
| source   | false    | string  | currency | the field source to retrieve its value.              |
