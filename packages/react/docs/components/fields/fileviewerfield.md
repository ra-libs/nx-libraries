# FileViewerField

Render PDF or Image files in material ui [Dialog](https://mui.com/material-ui/react-dialog/)

{% hint style="warning" %}
This component uses [PDFjs](https://mozilla.github.io/pdf.js/) make sure to download PDFjs files and add them to the public folder with the folder name **pdfjs** \
\
Make sure to update the **HOSTED_VIEWER_ORIGINS** variable in viewer.js to add your frontend domains
{% endhint %}

### Usage

```tsx
import { FileViewerField } from '@ra-libs/react';

<FileViewerField source="<source>" typeSource="mimeType" title="fileTitle" useLabel />;
```

it renders a button with the file title name

<figure><img src="../../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

### Props

| Prop       | Required | Type    | Default | Description                                                                                                                    |
| ---------- | -------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| useLabel   | false    | boolean | false   | whether to use react-admin Labeled component or not.                                                                           |
| typeSource | false    | string  | -       | the file mimeType source to find in record. if ommitted the component will render the default react-admin FileField component. |
| title      | false    | string  | file    | the file title/name.                                                                                                           |
