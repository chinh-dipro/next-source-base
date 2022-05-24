const { createSecureHeaders } = require("next-secure-headers");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  async headers() {
    return [{ source: "/(.*)", headers: createSecureHeaders() }];
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["vercel.com"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: "src/statics/templates",
              to: "./templates",
            },
          ],
        })
      );
    }

    return config;
  },
};
