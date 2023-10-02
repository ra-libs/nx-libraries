# PhoneField

PhoneField component uses [mui-tel-input](https://viclafouch.github.io/mui-tel-input/) to render phone input with country code and flag img.

### Usage

```tsx
import { PhoneField } from '@ra-libs/react';

<PhoneField source="cellphone" fullWidth validate={[required()]} />;
```

### Props

| Prop     | Required | Type    | Default | Description                                          |
| -------- | -------- | ------- | ------- | ---------------------------------------------------- |
| useLabel | false    | boolean | false   | whether to use react-admin Labeled component or not. |

> check [mui-tel-input](https://viclafouch.github.io/mui-tel-input/) documentation for more info.
