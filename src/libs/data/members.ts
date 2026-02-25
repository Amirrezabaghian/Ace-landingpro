import type { StaticImageData } from 'next/image';

import AhmadMusaviImg from '@assets/members/ahmad-musavi.jpg';
import AliMalekKhatabi from '@assets/members/ali-malek-khatabi.jpg';
import AmirBaghianImg from '@assets/members/amir-baghian.jpg';
import AliBokaImg from '@assets/members/boka.jpg';
import JahanImg from '@assets/members/jahan.jpg';
import MarinaImg from '@assets/members/marina-budarina.jpg';
import MimSaremiImg from '@assets/members/mim-sarem.jpg';
import SaramiImg from '@assets/members/mohammad-sarami.jpg';
import RezaBehiImg from '@assets/members/reza-behi.jpg';
import Sia7ashImg from '@assets/members/sia7ash.jpg';

type MemberID =
  | 'ali'
  | 'amir'
  | 'behi'
  | 'boka'
  | 'jahan'
  | 'marina'
  | 'mim'
  | 'rez'
  | 'sarami'
  | 'sia7ash';

export interface Member {
  name: string;
  img: string | StaticImageData;
  id: MemberID;
}

export const membersData: Member[] = [
  {
    name: 'Amirbaqian',
    img: AmirBaghianImg,
    id: 'amir',
  },
  {
    name: 'Mim Sarem',
    img: MimSaremiImg,
    id: 'mim',
  },
  {
    name: 'Marina Budarina',
    img: MarinaImg,
    id: 'marina',
  },
  {
    name: 'Jahan',
    img: JahanImg,
    id: 'jahan',
  },
  {
    name: 'Sia7ash',
    img: Sia7ashImg,
    id: 'sia7ash',
  },
  {
    name: 'Rez Musavi',
    img: AhmadMusaviImg,
    id: 'rez',
  },
  {
    name: 'Ali Maleki',
    img: AliMalekKhatabi,
    id: 'ali',
  },
  {
    name: 'Mohammad Sarami',
    img: SaramiImg,
    id: 'sarami',
  },
  {
    name: 'Reza Behi',
    img: RezaBehiImg,
    id: 'behi',
  },
  {
    name: 'Ali Boka',
    img: AliBokaImg,
    id: 'boka',
  },
];

export const getMembersByIds = (ids: MemberID[]) => {
  return membersData.filter(member => ids.includes(member.id));
};

export const getMemberById = (id: MemberID) => {
  return membersData.find(member => member.id === id);
};
