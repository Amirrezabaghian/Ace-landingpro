'use client';

import Bg from '@assets/BG.png';
import BookMeetingButton from '@components/DesignedProjects/BookMeetingButton/BookMeetingButton';
import AppLoading from '@design/AppLoading/AppLoading';
import BlurBox from '@design/BlurBox/BlurBox';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation'; // اضافه شد

import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // تشخیص آدرس فعلی

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // چک کردن اینکه آیا در صفحه ادمین هستیم یا نه
  const isAdmin = pathname.startsWith('/admin');

  // اگر ادمین بودیم، فقط محتوا را بدون هدر و فوتر برگردان
  if (isAdmin) {
    return (
      <>
        <Toaster position="bottom-left" />
        <main>{children}</main>
      </>
    );
  }

  // ظاهر اصلی سایت برای بقیه صفحات
  return (
    <>
      <AppLoading />
      <Toaster
        gutter={8}
        reverseOrder={false}
        position="bottom-left"
        toastOptions={{
          style: {
            borderRadius: '22px',
          },
          success: {
            duration: 6000,
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
      </div>
      <BookMeetingButton />
    </>
  );
};

export default MainLayout;