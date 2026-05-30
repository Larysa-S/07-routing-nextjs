import '@/app/globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

interface RootLayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode; // Додаємо слот для модальних вікон на рівні додатку
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />

          {/* Головний контент сайту */}
          {children}

          {/* Слот для перехоплених модальних маршрутів */}
          {modal}

          <Footer />
        </TanStackProvider>

        {/* Обов'язковий контейнер для createPortal вашої модалки */}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
