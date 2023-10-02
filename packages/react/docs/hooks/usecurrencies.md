# useCurrencies

Custom hook to return a list of currencies translated using react-admin useLocaleState hook.

### Usage

```tsx
import { useCurrencies } from '@ra-libs/react';

const currencies = useCurrencies();
```

### Example

```json
[
  {
    "id": "<id>",
    "name": "<symbol> - <translated-name>"
  },
  {
    "id": "BRL",
    "name": "R$ - moeda brasileira"
  }
]
```
