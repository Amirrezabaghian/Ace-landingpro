'use client';

import type { HTMLAttributes } from 'react';

import MotionDiv from '@design/MotionDiv/MotionDiv';
import {
  BinanceLogo,
  FtxExchangeLogo,
  IconSaxHoverLogo,
  IconSaxLogo,
  LinkkifyLogo,
  MahamLogo,
  PassengerLogo,
  RedoCompanyLogo,
  TrustWalletHoverLogo,
  TrustWalletLogo,
  VueSaxLogo,
} from '@icons';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import React from 'react';

import OurFriendItem from './OurFriendItem';

const ourFriendsData = [
  {
    name: 'Maham Company',
    position: 'Product Design',
    logo: <MahamLogo className="h-[27px] w-[35px]" />,
    link: 'https://maham.io',
  },
  {
    name: 'Trust Wallet',
    position: '3D Design',
    logo: <TrustWalletLogo className="h-[32px] w-[37px]" />,
    hoverLogo: <TrustWalletHoverLogo className="h-[32px] w-[37px]" />,
    link: 'https://trustwallet.com',
  },
  {
    name: 'Redo Company',
    position: 'UI Design',
    logo: <RedoCompanyLogo className="h-[38px] w-[13px]" />,
    link: 'https://getredo.com',
  },
  {
    name: 'Linkkify',
    position: 'UI, 3D Design',
    logo: <LinkkifyLogo className="h-[36px] w-[35px]" />,
    link: 'https://linkkify.codixel.tech',
  },
  {
    name: 'FTX Exchange',
    position: '3D Design',
    logo: <FtxExchangeLogo className="h-[38px] w-[33px]" />,
    link: 'https://claims.ftx.com',
  },
  {
    name: 'Iconsax',
    position: 'Icon Design',
    logo: <IconSaxLogo className="h-[27px] w-[35px]" />,
    hoverLogo: <IconSaxHoverLogo className="h-[27px] w-[35px]" />,
    link: 'https://iconsax.io',
  },
  {
    name: 'Vuesax',
    position: 'Illustration',
    logo: <VueSaxLogo className="h-[35px] w-[32px]" />,
    link: 'https://vuesax.com',
  },
  {
    name: 'Passsenger',
    position: '3D Design',
    logo: <PassengerLogo className="size-[41px]" />,
    link: 'https://opensea.io/collection/passengersgenesis',
  },
  {
    name: 'Binance',
    position: 'NFT Collection',
    logo: <BinanceLogo className="size-[38px]" />,
    link: 'https://binance.com',
  },
];

interface Props {
  className?: HTMLAttributes<HTMLDivElement>['className'];
}
const OurFriends = ({ className }: Props) => {
  const t = useTranslations('landing.ourFriends');
  return (
    <MotionDiv
      className={cn('mt-[50px] flex flex-col items-center gap-10', className)}
    >
      <h2 className="text-xs opacity-40">{t('title')}</h2>
      <div className="grid w-fit grid-cols-3 gap-[14px] lg:grid-cols-9">
        {ourFriendsData.map(friend => (
          <OurFriendItem key={friend.name} {...friend} />
        ))}{' '}
      </div>
    </MotionDiv>
  );
};

export default OurFriends;
