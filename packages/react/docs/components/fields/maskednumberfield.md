# MaskedNumberField

MaskedNumberField component uses [react-number-format](https://www.npmjs.com/package/react-number-format) to render the number field with a fixed decimal scale

### Usage

```tsx
import { MaskedNumberField } from '@ra-libs/react';

<MaskedNumberField source="totalValue" fullWidth useLabel />;
```

### Props

| Prop     | Required | Type    | Default | Description                                          |
| -------- | -------- | ------- | ------- | ---------------------------------------------------- |
| useLabel | false    | boolean | false   | whether to use react-admin Labeled component or not. |
