import type { StaticImageData } from 'next/image';

export interface Designer {
  name: string;
  src: string | StaticImageData;
}
