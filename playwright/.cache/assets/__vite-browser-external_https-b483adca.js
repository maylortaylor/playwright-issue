const __viteBrowserExternal_https = new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "https" has been externalized for browser compatibility. Cannot access "https.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`)
  }
});

export { __viteBrowserExternal_https as default };
//# sourceMappingURL=__vite-browser-external_https-b483adca.js.map
