const __viteBrowserExternal_url = new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "url" has been externalized for browser compatibility. Cannot access "url.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`)
  }
});

export { __viteBrowserExternal_url as default };
//# sourceMappingURL=__vite-browser-external_url-e92cf5fc.js.map
