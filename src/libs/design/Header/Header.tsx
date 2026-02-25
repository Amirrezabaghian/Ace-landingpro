'use client';

import HederLine from '@assets/header/header-line-vector.svg?url';
import BackButton from '@design/BackButton/BackButton';
import BlurBox from '@design/BlurBox/BlurBox';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { HamburgerIcon, HederLineVector } from '@icons';
import cn from '@libs/utils/cn';
import { translate } from '@libs/utils/translate';
import { useTranslations } from 'next-intl';
import { useRouter as useNpRouter } from 'next-nprogress-bar';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';

import Button from '../Button/Button';
import ContainerLayout from '../Container/ContainerLayout';
import Dot from '../Dot/Dot';
import Logo from '../Logo/Logo';
import HeaderLink from './HeaderLink';

interface Props {
  opened: boolean;
  toggleMenu: VoidFunction;
}

export const headerRoutes = [
  { path: '#home', label: translate('header.home') },
  { path: '#recent-works', label: translate('header.projects') },
  { path: '#services', label: translate('header.services') },
  { path: '#testimonials', label: translate('header.testimonials') },
  { path: '#our-team', label: translate('header.ourTeam') },
];

const Header = ({ toggleMenu }: Props) => {
  const t = useTranslations('header');
  const pathname = usePathname();
  const npRouter = useNpRouter();
  const router = useRouter();

  const [scrollData, setScrollData] = useState({
    y: 0,
    lastY: 0,
    isScrolled: false,
  });
  const [isNavbarHidden, setHideNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollData(lastState => ({
        y: window.scrollY,
        lastY: lastState.y,
        isScrolled: window.scrollY > 0,
      }));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollData.y > 100 && scrollData.y - scrollData.lastY > 0) {
      setHideNavbar(true);
    } else {
      setHideNavbar(false);
    }
  }, [scrollData]);

  return (
    <>
      <div
        className={cn(
          'fixed left-0 top-0 z-[100] flex w-full items-center justify-center pt-12 text-black transition-all duration-300',
          {
            '-translate-y-full': isNavbarHidden,
            'py-4': scrollData.isScrolled,
          },
        )}
      >
        <MotionDiv className="flex w-full items-center justify-center">
          <ContainerLayout
            className="z-[100] px-6 sm:px-6 lg:px-12 xl:px-[80px]"
            style={{
              backgroundImage: `url(${HederLine})`,
            }}
          >
            <div className=" flex items-center justify-between">
              <div className="md:w-[100px] lg:w-[150px] xl:w-[250px] ">
                <Logo />
              </div>
              <div className="relative">
                {scrollData.y < 1 ? (
                  <HederLineVector className="absolute -left-32 -top-12 h-[77px] w-[190px] max-lg:hidden xl:-left-48" />
                ) : null}
                {pathname === '/' ? (
                  <div
                    className="z-10 hidden items-center gap-2.5 rounded-full bg-[#5E5E5E] px-6 py-4 md:flex mlg:ml-9 lg:gap-3.5 lg:px-12"
                    style={{
                      boxShadow:
                        '0px -1px 0px 0px #535353, 0px 1px 0px 0px #535353, 0px 17px 27.5px -8px rgba(0, 0, 0, 0.27)',
                      border: '0.7px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {headerRoutes.map((route, index) => (
                      <React.Fragment key={route.path}>
                        <HeaderLink className="text-white" to={route.path}>
                          {route.label}
                        </HeaderLink>
                        {index !== headerRoutes.length - 1 ? (
                          <div className="size-[1px] rounded-full bg-[#D9D9D9] opacity-40" />
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <BackButton />
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Button
                  className="max-md:hidden"
                  containerClass="bg-[#eee]"
                  onClick={() => npRouter.push('/recent')}
                  secondary
                >
                  {t('works')}
                </Button>
                <Button
                  primary
                  className="flex items-center gap-2"
                  onClick={() => {
                    router.replace('#request');
                    scroller.scrollTo('contact', {
                      duration: 800,
                      delay: 200,
                      // offset: -30,
                      smooth: 'easeInOutQuart',
                    });
                  }}
                >
                  <Dot animated size={10} color="#82D49F" />
                  {t('openForWork')}
                </Button>
                <HamburgerIcon
                  className="size-6 cursor-pointer md:hidden"
                  onClick={toggleMenu}
                />
              </div>
            </div>
          </ContainerLayout>
        </MotionDiv>
      </div>
      {!isNavbarHidden && <BlurBox position="top" />}
    </>
  );
};

export default Header;
