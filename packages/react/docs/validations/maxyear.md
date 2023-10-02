# maxYear

custom validation method to use with DateInput to validate max accepted year

### Usage

```tsx
import { DateInput, maxYear } from '@ra-libs/react';

<DateInput source="<source>" validate={[maxYear(new Date().getFullYear())]} />;
```

This will set the max acceptable year to the current year.

### Translation

Make sure to add the translation key to your i18n provider as follow:

```json
{
  "validation": {
    "maxYear": "max acceptable year is %{year}"
  }
}
```
