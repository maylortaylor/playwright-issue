const __viteBrowserExternal_http = new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "http" has been externalized for browser compatibility. Cannot access "http.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`)
  }
});

export { __viteBrowserExternal_http as default };
//# sourceMappingURL=__vite-browser-external_http-342014aa.js.map
