'use client';

import { headerRoutes } from '@design/Header/Header';
import HeaderLink from '@design/Header/HeaderLink';
import Logo from '@design/Logo/Logo';
import { CloseIcon } from '@icons';
import cn from '@libs/utils/cn';
import React, { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const BurgerMenu: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    //? lock scroll
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <aside
      className={cn(
        'fixed inset-0 z-[200] overflow-hidden bg-gray-900/25 backdrop-blur-md ease-in-out',
        {
          'transition-opacity opacity-100 duration-500 translate-x-0  ': isOpen,
          'transition-all delay-500 opacity-0 translate-x-full  ': !isOpen,
        },
      )}
    >
      <section
        className={cn(
          'absolute right-0 flex size-full max-w-lg flex-col gap-8 bg-white px-4 pt-10 shadow-xl transition-all delay-300 duration-500 ease-in-out',
          {
            'translate-x-0 ': isOpen,
            'translate-x-full ': !isOpen,
          },
        )}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button onClick={() => setIsOpen(false)}>
            <CloseIcon className="size-8" />
          </button>
        </div>
        <div className="flex flex-col gap-5 pl-3 text-black">
          {headerRoutes.map(route => (
            <HeaderLink
              className="text-2xl"
              key={route.path}
              onClick={() => setIsOpen(false)}
              to={route.path}
            >
              {route.label}
            </HeaderLink>
          ))}
        </div>
      </section>
      <section
        aria-label="Close menu"
        className=" h-full w-screen cursor-pointer"
        tabIndex={0}
        onClick={() => {
          setIsOpen(false);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
      ></section>
    </aside>
  );
};

export default BurgerMenu;
