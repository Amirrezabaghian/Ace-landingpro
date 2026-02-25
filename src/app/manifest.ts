import type { MetadataRoute } from 'next';

import favIconX192 from '@assets/logo/android-chrome-192x192.png';
import favIconX512 from '@assets/logo/android-chrome-512x512.png';
import appFavIcon from '@assets/logo/apple-touch-icon.png';
import favIconX16 from '@assets/logo/favicon-16x16.png';
import favIconX32 from '@assets/logo/favicon-32x32.png';
import favIcon from '@assets/logo/favicon.ico';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ace studio',
    short_name: 'Ace',
    description: `'Ace studio – Your creative powerhouse for standout design`,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: favIcon.src,
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: favIconX192.src,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: favIconX512.src,
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: favIconX32.src,
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: favIconX16.src,
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: appFavIcon.src,
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
