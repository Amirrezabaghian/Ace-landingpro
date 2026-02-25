import Logo from '@design/Logo/Logo';
import { translate } from '@libs/utils/translate';
import React from 'react';
import { Link } from 'react-scroll';

const footerLinks = [
  {
    title: translate('footer.ourWorks'),
    link: 'recent-works',
  },
  {
    title: translate('footer.ourTeam'),
    link: 'our-team',
  },
  {
    title: translate('footer.ourServices'),
    link: 'services',
  },
  {
    title: translate('footer.contactUs'),
    link: 'contact',
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center border-t border-black/5 py-[27px] text-gray-300">
      <div className="container w-full px-0 md:px-10 xl:!max-w-[1440px] 2xl:!max-w-[1440px]">
        <div className="flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
          <div className="order-2 flex items-center gap-8 max-md:hidden lg:order-1">
            {footerLinks.map(({ title, link }) => (
              <Link
                className="cursor-pointer text-sm !leading-[23px] text-black/60"
                key={title}
                duration={500}
                offset={-120}
                smooth
                to={link}
              >
                {title}
              </Link>
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <Logo variant="white" />
          </div>
          <div className="order-last max-w-[95%] text-center text-sm !leading-[20px] text-black/60">
            <span className="text-black">Ace</span> is a registered trademark ©
            All rights reserved 2024{' '}
          </div>{' '}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
