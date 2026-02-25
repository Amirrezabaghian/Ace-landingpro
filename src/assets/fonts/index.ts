import localFont from 'next/font/local';

export const PP_MORI = localFont({
  src: [
    {
      path: './PPMori-Extralight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './PPMori-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './PPMori-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  preload: true,
  display: 'swap',
  variable: '--font-pp-mori',
});
