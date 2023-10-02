# useCountries

Custom hook to return a list of countries translated using react-admin useLocaleState hook and [i18n-iso-countries](https://www.npmjs.com/package/i18n-iso-countries).

### Usage

```tsx
import { useCountries } from '@ra-libs/react';

const countries = useCountries();
```

### Example

```json
[
  {
    "id": "<id>",
    "name": "<translated-name>"
  },
  {
    "id": "BR",
    "name": "Brasil"
  }
]
```
