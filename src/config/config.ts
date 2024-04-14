const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? true
    : false;
const isDev = window.location.hostname === "dev.sweatsonic.com" ? true : false;
const isStaging =
  window.location.hostname === "staging.sweatsonic.com" ? true : false;

const config = {
  defaults: {
    namespace: "Application",
    api_url: isLocalhost
      ? "http://localhost:4000"
      : isDev
      ? "https://api.mvssive.net"
      : isStaging
      ? "https://api.mvssive.net"
      : "https://api.mvssive.net",
  },
  stripe_publish_key:
    "pk_test_51IEPFoKg2zMGhaBRelsrjcCAzpwiLn3RyLb4HIK7s0gLA0IzJKUowHLrqI0AqyqZWcESSU697CWAGIkaph6WV2RN00kZYzjRd0",
  plans: [
    {
      name: "Annually",
      price: 240,
    },
    {
      name: "6 Month",
      price: 210,
    },
    {
      name: "Monthly",
      price: 39.99,
    },
  ],
};

export default config;
