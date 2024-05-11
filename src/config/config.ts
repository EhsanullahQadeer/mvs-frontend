const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? true
    : false;
const isDev = window.location.hostname === "admin-dev.mvssive.com" ? true : false;
const isStaging =
  window.location.hostname === "admin-staging.mvssive.com" ? true : false;

const config = {
  defaults: {
    namespace: "Application",
    api_url: isLocalhost
      ? "http://localhost:4000"
      : isDev
      ? "https://api.mvssive.net"
      : isStaging
      ? "https://staging-api.mvssive.net"
      : "https://api.mvssive.net",
  },
};

export default config;
