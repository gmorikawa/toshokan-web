# Troubleshooting

## Importing SVG files as icons in a React+Vite application

### Problem

When importing the file with a default import, even if the _linter_ does not detect any errors, when rendering the application it throws an error.

For reference, here follows the log displayed on the Google Chrome browser:

```log
Uncaught InvalidCharacterError: Failed to execute 'createElement' on 'Document': The tag name provided data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20aria-label='PDF'%20role='img'%20viewBox='0%200%20512%20512'%3e%3crect%20width='512'%20height='512'%20rx='15%25'%20fill='%23c80a0a'/%3e%3cpath%20fill='%23ffffff'%20d='M413%20302c-9-10-29-15-56-15-16%200-33%202-53%205a252%20252%200%200%201-52-69c10-30%2017-59%2017-81%200-17-6-44-30-44-7%200-13%204-17%2010-10%2018-6%2058%2013%20100a898%20898%200%200%201-50%20117c-53%2022-88%2046-91%2065-2%209%204%2024%2025%2024%2031%200%2065-45%2091-91a626%20626%200%200%201%2092-24c38%2033%2071%2038%2087%2038%2032%200%2035-23%2024-35zM227%20111c8-12%2026-8%2026%2016%200%2016-5%2042-15%2072-18-42-18-75-11-88zM100%20391c3-16%2033-38%2080-57-26%2044-52%2072-68%2072-10%200-13-9-12-15zm197-98a574%20574%200%200%200-83%2022%20453%20453%200%200%200%2036-84%20327%20327%200%200%200%2047%2062zm13%204c32-5%2059-4%2071-2%2029%206%2019%2041-13%2033-23-5-42-18-58-31z'/%3e%3c/svg%3e') is not a valid name.
    at completeWork (react-dom_client.js?v=b3bc59c3:9048:43)
    at runWithFiberInDEV (react-dom_client.js?v=b3bc59c3:997:72)
    at completeUnitOfWork (react-dom_client.js?v=b3bc59c3:12669:22)
    at performUnitOfWork (react-dom_client.js?v=b3bc59c3:12575:29)
    at workLoopSync (react-dom_client.js?v=b3bc59c3:12424:43)
    at renderRootSync (react-dom_client.js?v=b3bc59c3:12408:13)
    at performWorkOnRoot (react-dom_client.js?v=b3bc59c3:11827:37)
    at performWorkOnRootViaSchedulerTask (react-dom_client.js?v=b3bc59c3:13505:9)
    at MessagePort.performWorkUntilDeadline (react-dom_client.js?v=b3bc59c3:36:50)
```

### Solution

To import a SVG file in a _Vite_ application is necessary to install a separated plugin beforehand.

```sh
npm install --save-dev vite-plugin-svgr
```

Open the `vite.config.ts` file, import the `svgr` from the installed package, and then put it in the plugins properties of the vite configuration:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";

import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),

    svgr(),
  ],
});
```

With this step the configuration is complete. Now, to import a icon, there is just a another step that should be done. With the import path, is necessary to add a __?react__ at the end, or it will continue to give the same previous error.

```js
import PdfSvg from "@resources/pdf.svg?react";
```

### References

* [How Tо Use of SVG in React js](https://www.youtube.com/watch?v=UjssUy3EWOM) by _IFace_, accessed on 2026-02-03