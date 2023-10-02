# DataProvider

it uses ra-data-simple-rest provider and intercepts react-admin requests to transform to formData when it has any file in the request body.

```tsx
import { DataProvider } from '@ra-libs/react';

<Admin dataProvider={new DataProvider('<API_URL>')}>...</Admin>;
```
