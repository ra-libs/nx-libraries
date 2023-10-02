# MaskedTextInput

MaskedTextInput component uses [react-imask](https://www.npmjs.com/package/react-imask) to render the text input with mask pattern

### Usage

```tsx
import { MaskedTextInput } from '@ra-libs/react';

<MaskedTextInput source="CPF" mask="000.000.000-00" fullWidth validate={[required()]} />;
```

### Props

| Prop | Required | Type   | Default | Description       |
| ---- | -------- | ------ | ------- | ----------------- |
| mask | true     | string | -       | the mask pattern. |

> It accepts react-admin TextInput props
