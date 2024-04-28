const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? true
    : false;
const isDev = window.location.hostname === "dev.mvssive.com" ? true : false;
const isStaging =
  window.location.hostname === "staging.mvssive.com" ? true : false;

const config = {
  defaults: {
    namespace: "Application",
    api_url: isLocalhost
      ? "https://api.mvssive.net"
      : isDev
      ? "https://api.mvssive.net"
      : isStaging
      ? "https://api.mvssive.net"
      : "https://api.mvssive.net",
  },
};

export default config;
