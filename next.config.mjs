import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_EMAIL_JS_SERVICE_ID:
      process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID,
    NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID:
      process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID,
    NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY,
    NEXT_PUBLIC_CAL_CURRENT_EVENT: process.env.NEXT_PUBLIC_CAL_CURRENT_EVENT,
    NEXT_PUBLIC_CAL_USERNAME: process.env.NEXT_PUBLIC_CAL_USERNAME,
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg'),
    );
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        // use: [{ loader: "@svgr/webpack", options: { icon: true } }],
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              // svgoConfig: {
              //   plugins: [
              //     { removeViewBox: false }, // Keep the viewBox attribute
              //   ],
              // },
              dimensions: true, // Disable SVGR's dimension attributes
              // Set your default width and height here
              svgProps: {
                className: 'svg-icon',
              },
            },
          },
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  // output: 'standalone',
};

export default withNextIntl(nextConfig);
