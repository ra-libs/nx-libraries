# LocalSession

a customized sessionStorage class that uses cookies when sessionStorage is not available.

```tsx
import { LocalSession } from '@ra-libs/react';

// Set session key-value
LocalSession.set('key', 'value');

// Get session key
LocalSession.get('key');

// Check if the key exists
LocalSession.check('key');
```
