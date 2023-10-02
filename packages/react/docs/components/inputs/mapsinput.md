# MapsInput

MapsInput component uses mui Autocomplete component to render places using Google Places API. You should provide the API Url.

### Usage

```tsx
import { MapsInput } from '@ra-libs/react';

<MapsInput source="<source>" mapType="establishment" useMainText API_URL={`${env.API_URL}/places`} />;
```

### Props

| Prop             | Required | Type    | Default  | Description                                                                                                                                                                    |
| ---------------- | -------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| API_URL          | true     | string  | -        | Your backend API that handles google maps requests.                                                                                                                            |
| API_SEARCH_FIELD | false    | string  | 'search' | Query param key to search user input.                                                                                                                                          |
| API_MAP_TYPE     | false    | string  | 'type'   | Query param key to set places type.                                                                                                                                            |
| mapType          | false    | string  | -        | <p>define places type. check google places type [documentation](https://developers.google.com/maps/documentation/places/web-service/supported_types) for more information.</p> |
| useMainText      | false    | boolean | false    | use Google Places api structured_formatting.main_text response.                                                                                                                |

> It accepts react-admin TextInput props
