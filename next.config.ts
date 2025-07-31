import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev, isServer }) => {
    // Add code coverage instrumentation in development mode
    if (dev && !isServer && process.env.CYPRESS_COVERAGE) {
      config.module.rules.push({
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: ['istanbul'],
          },
        },
      });
    }
    return config;
  },
  devIndicators: false
};

export default nextConfig;
