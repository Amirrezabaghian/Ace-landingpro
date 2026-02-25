'use client';

import Bg from '@assets/BG.png';
import BookMeetingButton from '@components/DesignedProjects/BookMeetingButton/BookMeetingButton';
import AppLoading from '@design/AppLoading/AppLoading';
import BlurBox from '@design/BlurBox/BlurBox';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <AppLoading />
      <Toaster
        gutter={8}
        reverseOrder={false}
        // containerClassName="!top-10"
        containerStyle={{}}
        position="bottom-left"
        toastOptions={{
          // Define default options
          className: '',
          duration: 6000,
          removeDelay: 1000,
          style: {
            // background: '#363636',
            // color: '#fff',
            borderRadius: '22px',
          },

          // Default options for specific types
          success: {
            duration: 6000,
            // iconTheme: {
            //   primary: 'green',
            //   secondary: 'black',
            // },
          },
        }}
      />
      <ProgressBar
        height="4px"
        color="#252525"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <div
        className="w-full overflow-x-hidden"
        style={{
          background: `url(${Bg.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
        }}
      >
        <Header opened={false} toggleMenu={toggleMenu} />
        <main>{children}</main>
        <Footer />
        <BurgerMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <BlurBox />
      </div>{' '}
      <BookMeetingButton />
    </>
  );
};

export default MainLayout;
