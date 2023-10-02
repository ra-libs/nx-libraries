# minYear

custom validation method to use with DateInput to validate min accepted year

### Usage

```tsx
import { DateInput, minYear } from '@ra-libs/react';

<DateInput source="<source>" validate={[minYear(new Date().getFullYear())]} />;
```

This will set the min acceptable year to the current year.

### Translation

Make sure to add the translation key to your i18n provider as follow:

```json
{
  "validation": {
    "minYear": "min acceptable year is %{year}"
  }
}
```
