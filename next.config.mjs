import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vsjwshkamdyqwikinuam.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
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
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg'),
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, 
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              dimensions: true, 
              svgProps: {
                className: 'svg-icon',
              },
            },
          },
        ],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default withNextIntl(nextConfig);