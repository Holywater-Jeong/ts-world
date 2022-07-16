const withTM = require('next-transpile-modules')(['@ts-world/components']);

module.exports = withTM({
  reactStrictMode: true,
});
