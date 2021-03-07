/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  plugins: [
    "@snowpack/plugin-babel", "@snowpack/plugin-react-refresh"
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
    knownEntrypoints: ["react/jsx-runtime"],
  },
  devOptions: {
    /* ... */
    port: 3000
  },
  buildOptions: {
    /* ... */
  },
};
