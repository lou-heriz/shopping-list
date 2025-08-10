import type { NextConfig } from "next";
import { webpack } from "next/dist/compiled/webpack/webpack";

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
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(.nyc_output|coverage|cypress|test-results|playwright-report|blob-report)$/,
      })
    );
    return config;
  },
  devIndicators: false
};

export default nextConfig;
